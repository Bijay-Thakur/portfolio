"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { MutableRefObject } from "react";
import { channelAngles, districts, isChannel, landmarkColliders, signPositions, terrainHeight, treePositions, welcomeSign, type DistrictId } from "@/lib/v2/world-config";
import { initialBike, stepBike, teleportBike, resetBike, type BikeState, type DriveInput } from "@/lib/v2/physics";

export type RideHandle = { reset: (id?: DistrictId) => void; state: BikeState };
export type SceneStatus = { speed: number; near: DistrictId | null; x: number; z: number; fps: number };
type Props = { input: MutableRefObject<DriveInput>; ride: MutableRefObject<RideHandle | null>; paused: boolean; overview: boolean; quality: "Auto" | "Low" | "High"; onStatus: (status: SceneStatus) => void; onReady: () => void; onError: () => void };

const MODEL_ROOT = "/v2/models/";
const modelIds = ["motorcycle", "projects", "experience", "contacts", "about", "education", "resume", "props", "tree"];
modelIds.forEach((id) => useGLTF.preload(MODEL_ROOT + id + ".glb"));

function Model({ modelId, ...props }: { modelId: string } & ThreeElements["group"]) {
  const { scene } = useGLTF(MODEL_ROOT + modelId + ".glb");
  const copy = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => { copy.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } }); }, [copy]);
  return <group {...props}><primitive object={copy} /></group>;
}

function Road({ from, to, width = 2.7 }: { from: [number, number]; to: [number, number]; width?: number }) {
  const dx = to[0] - from[0], dz = to[1] - from[1], len = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  const x = (from[0] + to[0]) / 2, z = (from[1] + to[1]) / 2;
  const marks=Math.max(1,Math.floor(len/2.2));
  return <group position={[x, .035, z]} rotation={[0, angle, 0]}>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[width + .4, len + .4]} /><meshStandardMaterial color="#d5d9df" roughness={1} /></mesh>
    <mesh receiveShadow position={[0, .013, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[width, len]} /><meshStandardMaterial color="#f8f9fa" roughness={1} /></mesh>
    {Array.from({ length: marks }, (_, i) => <mesh key={i} position={[0, .023, -len / 2 + (i+.5)*len/marks]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[.07, Math.min(.9,len*.5)]} /><meshBasicMaterial color="#aeb5be" /></mesh>)}
  </group>;
}

function Roads() {
  const ring = Array.from({ length: 72 }, (_, i) => { const a = i * Math.PI * 2 / 72; return [Math.sin(a) * 17.5, Math.cos(a) * 17.5] as [number, number]; });
  return <>
    {ring.map((p, i) => <Road key={i} from={p} to={ring[(i + 1) % ring.length]} width={3.1} />)}
    {districts.map((d) => <Road key={d.id} from={[Math.sin(d.heading) * 17.5, Math.cos(d.heading) * 17.5]} to={[d.x * .82, d.z * .82]} width={2.8} />)}
    <Road from={[8,-30]} to={[8,-15.57]} width={3.2}/>
    {channelAngles.map((a,i)=><Bridge key={i} angle={a}/>)}
  </>;
}

function Bridge({angle}:{angle:number}){
  const x=Math.sin(angle)*17.5,z=Math.cos(angle)*17.5;
  // The deck follows the tangent of the ring road over a water channel.
  return <group position={[x,0,z]} rotation={[0,angle+Math.PI/2,0]}>
    <mesh position={[0,-.13,0]} castShadow receiveShadow><boxGeometry args={[3.7,.24,5.9]}/><meshStandardMaterial color="#c8cdd4"/></mesh>
    {[-1,1].map(side=><group key={side} position={[side*1.91,0,0]}>
      <mesh position={[0,.48,0]} castShadow><boxGeometry args={[.1,.09,6]}/><meshStandardMaterial color="#555b63"/></mesh>
      {[-2.7,-1.4,0,1.4,2.7].map(t=><mesh key={t} position={[0,.24,t]} castShadow><boxGeometry args={[.08,.55,.08]}/><meshStandardMaterial color="#777e87"/></mesh>)}
    </group>)}
    {[-1.7,1.7].map(t=><mesh key={t} position={[0,-1.23,t]} castShadow><cylinderGeometry args={[.36,.47,2.15,8]}/><meshStandardMaterial color="#a7adb6"/></mesh>)}
  </group>;
}

function radialMesh(type:"top"|"outer"|"inner",steps:number){
  const vertices:number[]=[];
  const add=(a:number,r:number,y:number)=>vertices.push(Math.sin(a)*r,y,Math.cos(a)*r);
  const quad=(a0:number,a1:number,r0:number,r1:number,y0:number,y1:number)=>{
    add(a0,r0,y0);add(a1,r0,y0);add(a1,r1,y1);
    add(a0,r0,y0);add(a1,r1,y1);add(a0,r1,y1);
  };
  for(let i=0;i<steps;i++){
    const a0=i*Math.PI*2/steps,a1=(i+1)*Math.PI*2/steps,mid=(a0+a1)/2;
    if(isChannel(Math.sin(mid)*17.5,Math.cos(mid)*17.5))continue;
    const wave=Math.sin(i*2.4)*.19+Math.sin(i*.87)*.11;
    if(type==="top"){
      const rings=[9.2,10.2,13,20,27,32,35];
      for(let j=0;j<rings.length-1;j++){
        const r0=rings[j],r1=rings[j+1];
        quad(a0,a1,r0,r1,terrainHeight(Math.sin(mid)*r0,Math.cos(mid)*r0)-.04,terrainHeight(Math.sin(mid)*r1,Math.cos(mid)*r1)+wave*(r1/35)-.04);
      }
    }else if(type==="outer")quad(a0,a1,35,35.7,wave-.04,-4.3+wave*.6);
    else quad(a0,a1,9.2,9.1,-.04,-2.2);
  }
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));g.computeVertexNormals();return g;
}

function bankMesh(){
  const vertices:number[]=[];
  const p=(a:number,r:number,y:number)=>vertices.push(Math.sin(a)*r,y,Math.cos(a)*r);
  for(const c of channelAngles)for(const side of [-1,1])for(let j=0;j<13;j++){
    const a=c+side*.11,r0=9.2+j*2,r1=r0+2;
    const y0=terrainHeight(Math.sin(a)*r0,Math.cos(a)*r0)-.04;
    const y1=terrainHeight(Math.sin(a)*r1,Math.cos(a)*r1)-.04;
    p(a,r0,y0);p(a,r1,y1);p(a,r1,-2.25);
    p(a,r0,y0);p(a,r1,-2.25);p(a,r0,-2.25);
  }
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));g.computeVertexNormals();return g;
}

function Terrain({ quality }: { quality: Props["quality"] }) {
  const steps=quality==="Low"?96:144;
  const top=useMemo(()=>radialMesh("top",steps),[steps]);
  const outer=useMemo(()=>radialMesh("outer",steps),[steps]);
  const inner=useMemo(()=>radialMesh("inner",steps),[steps]);
  const banks=useMemo(()=>bankMesh(),[]);
  useEffect(()=>()=>{top.dispose();outer.dispose();inner.dispose();banks.dispose();},[top,outer,inner,banks]);
  return <>
    <mesh geometry={top} receiveShadow><meshStandardMaterial color="#d9dce0" roughness={1} side={THREE.DoubleSide}/></mesh>
    <mesh geometry={outer} castShadow receiveShadow><meshStandardMaterial color="#7f858e" roughness={1} side={THREE.DoubleSide} flatShading/></mesh>
    <mesh geometry={inner} castShadow receiveShadow><meshStandardMaterial color="#969ca5" roughness={1} side={THREE.DoubleSide} flatShading/></mesh>
    <mesh geometry={banks} castShadow receiveShadow><meshStandardMaterial color="#8c929b" roughness={1} side={THREE.DoubleSide} flatShading/></mesh>
    <mesh position={[0,-2.36,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[37,96]}/><meshStandardMaterial color="#737a83" metalness={.45} roughness={.26}/></mesh>
    {[4.5,6.5,8].map((r,i)=><mesh key={i} position={[0,-2.33+i*.006,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[r,r+.025,80]}/><meshBasicMaterial color="#c2c7ce" transparent opacity={.45}/></mesh>)}
  </>;
}

function Plaza() {
  return <group position={[8,0,-30]}>
    <mesh position={[0, .025, 0]} receiveShadow><cylinderGeometry args={[3.2, 3.35, .18, 32]} /><meshStandardMaterial color="#f9fafb" /></mesh>
    <mesh position={[0, .13, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[2.65, 2.73, 48]} /><meshStandardMaterial color="#9097a1" side={THREE.DoubleSide} /></mesh>
    {Array.from({ length: 12 }, (_, i) => { const a=i*Math.PI*2/12; return <mesh key={i} position={[Math.sin(a)*2.3,.14,Math.cos(a)*2.3]} rotation={[-Math.PI/2,0,a]}><planeGeometry args={[.05,.3]} /><meshBasicMaterial color="#8f969f" side={THREE.DoubleSide}/></mesh>; })}
  </group>;
}

function Sign({ name, number, position }: { name: string; number?:number; position: [number, number, number] }) {
  return <group position={position}>
    <mesh position={[0,1.46,0]} castShadow><cylinderGeometry args={[.065,.085,2.9,8]}/><meshStandardMaterial color="#656b74" /></mesh>
    <mesh position={[0,3.08,0]} castShadow><boxGeometry args={[3.1,.78,.12]}/><meshStandardMaterial color="#202329" /></mesh>
    <group position={[0,3.08,.067]}><HtmlSign name={number?`${number}. ${name}`:name}/></group>
  </group>;
}

// CanvasTexture keeps directional signs attached to their 3D posts without HTML projection jitter.
function HtmlSign({ name }: { name: string }) {
  const texture = useMemo(() => {
    const c=document.createElement("canvas"); c.width=768; c.height=192;
    const ctx=c.getContext("2d")!; ctx.fillStyle="#202329"; ctx.fillRect(0,0,768,192);
    ctx.fillStyle="#ffffff"; ctx.font="bold 61px Arial"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(name,384,98,730);
    const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; return t;
  },[name]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh><planeGeometry args={[2.96,.67]}/><meshBasicMaterial map={texture} transparent /></mesh>;
}

function Mountain({x,z,height,width,shade}:{x:number;z:number;height:number;width:number;shade:string}){
  const geo=useMemo(()=>{
    const verts:number[]=[];
    for(let i=0;i<9;i++){
      const a=i*Math.PI*2/9,b=(i+1)*Math.PI*2/9;
      const r0=width*(.78+.17*Math.sin(i*3.1)),r1=width*(.78+.17*Math.sin((i+1)*3.1));
      verts.push(Math.sin(a)*r0,0,Math.cos(a)*r0, Math.sin(b)*r1,0,Math.cos(b)*r1, Math.sin(a+.18)*width*.12,height*(.78+.2*Math.sin(i*1.7)),Math.cos(a+.18)*width*.12);
    }
    const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(verts,3));g.computeVertexNormals();return g;
  },[height,width]);
  useEffect(()=>()=>geo.dispose(),[geo]);
  return <mesh geometry={geo} position={[x,-4,z]} castShadow><meshStandardMaterial color={shade} flatShading side={THREE.DoubleSide}/></mesh>;
}

function World({ input, ride, paused, overview, quality, onStatus, onReady }: Omit<Props,"onError">) {
  const bike = useRef<THREE.Group>(null);
  const visual = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_ROOT + "motorcycle.glb");
  const bikeModel = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const wheels = useMemo(() => {
    const found: THREE.Object3D[]=[]; bikeModel.traverse((o)=>{ if(o.name==="FrontWheelRig" || o.name==="RearWheelRig") found.push(o); }); return found;
  },[bikeModel]);
  const state = useRef(initialBike());
  const acc=useRef(0), report=useRef(0), frames=useRef(0), frameTime=useRef(0);
  const { camera }=useThree();
  const target=useMemo(()=>new THREE.Vector3(),[]), desired=useMemo(()=>new THREE.Vector3(),[]);
  useEffect(() => {
    ride.current={ state:state.current, reset:(id) => {
      const s=state.current;
      if(id) teleportBike(s,id); else resetBike(s);
      camera.position.set(s.x-Math.sin(s.heading)*7,s.y+4.3,s.z-Math.cos(s.heading)*7);
    }};
    camera.position.set(0,45,-65);
    onReady();
    return () => {ride.current=null;};
  },[ride,camera,onReady]);
  useFrame((_, delta) => {
    const s=state.current;
    if(!paused) {
      acc.current=Math.min(acc.current+Math.min(delta,.1),.2);
      while(acc.current>=1/60){stepBike(s,input.current,1/60);acc.current-=1/60;}
    } else acc.current=0;
    if(bike.current){bike.current.position.set(s.x,s.y,s.z);bike.current.rotation.y=s.heading;}
    if(visual.current) visual.current.rotation.z=s.lean;
    wheels.forEach(w => {w.rotation.x=-s.wheelAngle;});
    target.set(s.x,s.y+1.2,s.z);
    desired.set(s.x-Math.sin(s.heading)*7,s.y+4.5,s.z-Math.cos(s.heading)*7);
    // Shorten the follow arm before a landmark can obscure the rider.
    for(const c of landmarkColliders){
      const a=new THREE.Vector2(target.x-c.x,target.z-c.z), b=new THREE.Vector2(desired.x-target.x,desired.z-target.z);
      const t=THREE.MathUtils.clamp(-a.dot(b)/Math.max(.001,b.lengthSq()),0,1);
      if(a.clone().addScaledVector(b,t).length()<c.radius+.9) desired.lerp(target,1-Math.max(.28,t-.08));
    }
    if(overview){desired.set(0,45,-65);target.set(0,0,0);}
    camera.position.lerp(desired,Math.min(1,delta*(overview?2.5:4))); camera.lookAt(target);
    report.current+=delta; frames.current++; frameTime.current+=delta;
    if(report.current>.12){
      const near=districts.find(d=>Math.hypot(s.x-d.x,s.z-d.z)<d.radius+3.6);
      onStatus({speed:s.speed,near:near?.id??null,x:s.x,z:s.z,fps:Math.round(frames.current/Math.max(.001,frameTime.current))});
      report.current=0; if(frameTime.current>.9){frames.current=0;frameTime.current=0;}
    }
  });
  return <>
    <color attach="background" args={["#eef0f3"]}/>
    <fog attach="fog" args={["#eef0f3",55,155]}/>
    <ambientLight intensity={2.1}/>
    <hemisphereLight args={["#ffffff","#bac0c9",1.7]}/>
    <directionalLight position={[12,23,13]} intensity={2.6} castShadow={quality!=="Low"} shadow-mapSize={[quality==="High"?2048:1024,quality==="High"?2048:1024]} shadow-camera-left={-35} shadow-camera-right={35} shadow-camera-top={35} shadow-camera-bottom={-35}/>
    <Terrain quality={quality}/><Roads/><Plaza/>
    {districts.map((d)=><group key={d.id} position={[d.x,terrainHeight(d.x,d.z),d.z]} rotation={[0,d.heading+Math.PI,0]} scale={1.35}>
      <Model modelId={d.id}/>
    </group>)}
    {districts.map((d,i)=> <group key={d.id} rotation={[0,d.heading+Math.PI,0]} position={[signPositions[i].x,0,signPositions[i].z]}><Sign number={i+1} name={d.name} position={[0,0,0]} /></group>)}
    <group rotation={[0,Math.PI,0]}><Sign name="EXPLORE MY WORLD →" position={[welcomeSign.x,0,welcomeSign.z]}/></group>
    {treePositions.map((p,i)=><Model key={i} modelId="tree" position={[p.x,terrainHeight(p.x,p.z),p.z]} scale={p.scale}/>)}
    <Model modelId="props" position={[-14,0,-27]}/>
    <Model modelId="props" position={[-28,0,0]} rotation={[0,Math.PI/2,0]}/>
    {[[-30,44,18,13,"#aeb3bb"],[-12,49,24,16,"#9298a1"],[9,51,29,17,"#8b929c"],[28,45,20,13,"#b4b8bf"]].map(([x,z,h,w,c],i)=><Mountain key={i} x={x as number} z={z as number} height={h as number} width={w as number} shade={c as string}/>)}
    <group ref={bike}><group ref={visual}><primitive object={bikeModel}/></group></group>
  </>;
}

export default function WorldScene(props: Props) {
  return <Canvas className="v2-canvas" shadows={props.quality!=="Low"} dpr={props.quality==="Low"?[1,1]:props.quality==="High"?[1.5,2]:[1,1.5]} camera={{fov:56,near:.1,far:220,position:[0,45,-65]}} onCreated={({gl})=>{
    gl.domElement.addEventListener("webglcontextlost",props.onError,{once:true});
  }}>
    <Suspense fallback={null}><World {...props}/></Suspense>
  </Canvas>;
}
