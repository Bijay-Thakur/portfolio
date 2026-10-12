"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { MutableRefObject } from "react";
import { districts, distanceToRoad, ISLAND_RADIUS, parkingAt, ROAD_WIDTH, roadPoints, signPositions, treePositions, type DistrictId } from "@/lib/v2/world-config";
import { initialBike, parkBike, resetBike, stepBike, teleportBike, type BikeState, type DriveInput } from "@/lib/v2/physics";

export type RideHandle={reset:(id?:DistrictId)=>void;park:(id:DistrictId)=>boolean;state:BikeState};
export type SceneStatus={speed:number;near:DistrictId|null;bay:DistrictId|null;x:number;z:number;fps:number};
type Props={input:MutableRefObject<DriveInput>;ride:MutableRefObject<RideHandle|null>;paused:boolean;overview:boolean;quality:"Auto"|"Low"|"High";onStatus:(s:SceneStatus)=>void;onReady:()=>void;onError:()=>void};
const ROOT="/v2/models/";
["motorcycle","projects","experience","contacts","about","education","resume","tree"].forEach(id=>useGLTF.preload(ROOT+id+".glb"));
const paint={
  asphalt:"#35383b", shoulder:"#aaaba9", stripe:"#e4ded3", stone:"#aaa9a6",
  rock:"#686865",water:"#7b8990",pine:"#252e2d",mist:"#d8d7d5",accent:"#819a91"
};
const pineMaterial=new THREE.MeshStandardMaterial({color:paint.pine,roughness:1,flatShading:true});
const barkMaterial=new THREE.MeshStandardMaterial({color:"#55514b",roughness:1,flatShading:true});

function Model({modelId,...props}:{modelId:string}&ThreeElements["group"]){
  const {scene}=useGLTF(ROOT+modelId+".glb");
  const copy=useMemo(()=>{
    const c=scene.clone(true);
    c.traverse(o=>{if(o instanceof THREE.Mesh){
      o.castShadow=true;o.receiveShadow=true;
      if(modelId==="tree"){
        o.material=o.name.toLowerCase().includes("canopy")?pineMaterial:barkMaterial;
      }
    }});
    return c;
  },[scene,modelId]);
  return <group {...props}><primitive object={copy}/></group>;
}

function ribbon(points:readonly (readonly [number,number])[],width:number,y:number){
  const verts:number[]=[];
  const edges=points.map((p,i)=>{
    const a=points[(i+points.length-1)%points.length],b=points[(i+1)%points.length];
    const dx=b[0]-a[0],dz=b[1]-a[1],m=Math.hypot(dx,dz)||1;
    return [dz/m*width/2,-dx/m*width/2] as const;
  });
  for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length];
    const [ax,az]=edges[i],[bx,bz]=edges[(i+1)%points.length];
    verts.push(a[0]-ax,y,a[1]-az,b[0]-bx,y,b[1]-bz,b[0]+bx,y,b[1]+bz,
      a[0]-ax,y,a[1]-az,b[0]+bx,y,b[1]+bz,a[0]+ax,y,a[1]+az);
  }
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(verts,3));g.computeVertexNormals();return g;
}

function RoadNetwork(){
  const shoulder=useMemo(()=>ribbon(roadPoints,ROAD_WIDTH+.9,.065),[]);
  const asphalt=useMemo(()=>ribbon(roadPoints,ROAD_WIDTH,.105),[]);
  useEffect(()=>()=>{shoulder.dispose();asphalt.dispose();},[shoulder,asphalt]);
  return <>
    <mesh geometry={shoulder} receiveShadow><meshStandardMaterial color={paint.shoulder} side={THREE.DoubleSide} roughness={1}/></mesh>
    <mesh geometry={asphalt} receiveShadow><meshStandardMaterial color={paint.asphalt} side={THREE.DoubleSide} roughness={.94}/></mesh>
    {roadPoints.filter((_,i)=>i%5===0).map((p,i)=>{
      const b=roadPoints[(i*5+2)%roadPoints.length],a=Math.atan2(b[0]-p[0],b[1]-p[1]);
      return <mesh key={i} position={[p[0],.13,p[1]]} rotation={[0,a,0]}><boxGeometry args={[.085,.012,1.5]}/><meshBasicMaterial color={paint.stripe}/></mesh>;
    })}
    {[[-15,-21,9],[15,-21,9],[27,0,15],[15,21,9],[-15,21,9],[-27,0,15]].map(([x,z,length],i)=>
      <Bridge key={i} x={x} z={z} length={length}/>)}
  </>;
}

function Bridge({x,z,length}:{x:number;z:number;length:number}){
  const heading=distanceToRoad(x,z).heading;
  const archPieces=Array.from({length:17},(_,i)=>{
    const u=i/16,theta=Math.PI*(1-u),zz=(u-.5)*(length/2-.7);
    return {z:zz,y:-2.95+Math.sin(theta)*1.55,rot:Math.PI/2-theta};
  });
  return <group position={[x,0,z]} rotation={[0,heading,0]}>
    <mesh position={[0,-.2,0]} castShadow receiveShadow><boxGeometry args={[ROAD_WIDTH+.9,.43,length]}/><meshStandardMaterial color="#777977" roughness={1}/></mesh>
    {[-1,1].map(side=><group key={side} position={[side*(ROAD_WIDTH/2+.36),0,0]}>
      <mesh position={[0,.66,0]} castShadow><boxGeometry args={[.13,.16,length]}/><meshStandardMaterial color="#bbb9b3"/></mesh>
      {Array.from({length:Math.ceil(length/1.7)+1},(_,i)=><mesh key={i} position={[0,.3,-length/2+i*length/Math.ceil(length/1.7)]} castShadow><boxGeometry args={[.14,.72,.15]}/><meshStandardMaterial color="#a9aaa6"/></mesh>)}
      {[-1,0,1].map((t)=><mesh key={t} position={[0,-1.65,t*(length/2-1.1)]} castShadow><boxGeometry args={[.56,3.1,.68]}/><meshStandardMaterial color="#8c8d8a"/></mesh>)}
      {[-1,1].flatMap((half)=>archPieces.map((p,i)=><mesh key={half+":"+i} position={[0,p.y,half*length/4+p.z]} rotation={[p.rot,0,0]} castShadow><boxGeometry args={[.5,.34,(length/2-.7)/16+.13]}/><meshStandardMaterial color="#989a97"/></mesh>))}
    </group>)}
  </group>;
}

function islandGeometry(index:number,side:boolean){
  const d=districts[index],n=48,verts:number[]=[],colors:number[]=[];
  const c1=new THREE.Color(paint.rock),c2=new THREE.Color("#898a87"),c3=new THREE.Color("#555653");
  const point=(a:number,r:number,y:number,shade:number)=>{
    verts.push(d.x+Math.sin(a)*r,y,d.z+Math.cos(a)*r);
    const col=c1.clone().lerp(shade>0?c2:c3,Math.abs(shade));colors.push(col.r,col.g,col.b);
  };
  const radius=(a:number)=>ISLAND_RADIUS+.42*Math.sin(a*5+index)+.34*Math.sin(a*9-index*.9);
  for(let i=0;i<n;i++){
    const a=i*Math.PI*2/n,b=(i+1)*Math.PI*2/n,ra=radius(a),rb=radius(b);
    if(!side){point(a,0,-.055,.62);point(a,ra,-.055,.62);point(b,rb,-.055,.62);}
    else{
      const layers=[[-.06,1],[-1.8,1.07],[-3.7,.93],[-5.5,.82]];
      for(let j=0;j<layers.length-1;j++){
        const [y0,k0]=layers[j],[y1,k1]=layers[j+1],s=Math.sin(i*2.3+j*3.7)*.45;
        point(a,ra*k0,y0,s);point(a,ra*k1,y1,-.25+s);point(b,rb*k1,y1,.22+s);
        point(a,ra*k0,y0,s);point(b,rb*k1,y1,.22+s);point(b,rb*k0,y0,.14-s);
      }
    }
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute("position",new THREE.Float32BufferAttribute(verts,3));
  g.setAttribute("color",new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;
}
function Island({index}:{index:number}){
  const top=useMemo(()=>islandGeometry(index,false),[index]),side=useMemo(()=>islandGeometry(index,true),[index]);
  useEffect(()=>()=>{top.dispose();side.dispose();},[top,side]);
  const d=districts[index];
  return <>
    <mesh geometry={top} receiveShadow><meshStandardMaterial color="#b7b4af" vertexColors side={THREE.DoubleSide} roughness={1}/></mesh>
    <mesh geometry={side} castShadow receiveShadow><meshStandardMaterial vertexColors side={THREE.DoubleSide} flatShading roughness={1}/></mesh>
    {[0,1,2].map(i=>{
      const a=(i*2.35+index*.8),r=ISLAND_RADIUS+.4;
      return <mesh key={i} position={[d.x+Math.sin(a)*r,-4.5,d.z+Math.cos(a)*r]} rotation={[0,a,0]} castShadow>
        <icosahedronGeometry args={[1.9+i*.35,0]}/><meshStandardMaterial color={i===1?"#646663":"#777874"} flatShading roughness={1}/></mesh>;
    })}
  </>;
}

function Waterfall({x,z,angle=0}:{x:number;z:number;angle?:number}){
  return <group position={[x,-2.25,z]} rotation={[0,angle,0]}>
    <mesh><planeGeometry args={[2.9,4.5,8,8]}/><meshBasicMaterial color="#e3e8e7" transparent opacity={.57} side={THREE.DoubleSide} depthWrite={false}/></mesh>
    {[-.85,0,.85].map((a,i)=><mesh key={i} position={[a,-2.3,.1]} rotation={[-Math.PI/2,0,0]}>
      <circleGeometry args={[.47+i*.1,16]}/><meshBasicMaterial color="#f1f4f1" transparent opacity={.3} depthWrite={false}/></mesh>)}
  </group>;
}

function Terrain(){
  return <>
    <mesh position={[0,-5.52,0]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[250,250]}/><meshStandardMaterial color={paint.water} metalness={.18} roughness={.37}/></mesh>
    {districts.map((_,i)=><Island key={i} index={i}/>)}
    <Waterfall x={-43} z={22} angle={-.6}/><Waterfall x={3} z={44}/><Waterfall x={42} z={19} angle={.5}/>
    {[[-55,-53,17,12],[-33,-65,24,15],[0,-70,32,20],[27,-67,23,14],[55,-55,16,12]].map(([x,z,h,w],i)=>
      <Mountain key={i} x={x} z={z} height={h} width={w}/>)}
    {[-1,1].map(s=><mesh key={s} position={[s*64,12,-47]} scale={[16,2.7,5]}><sphereGeometry args={[1,12,8]}/><meshBasicMaterial color="#f1f0ef" transparent opacity={.2} depthWrite={false}/></mesh>)}
  </>;
}
function Mountain({x,z,height,width}:{x:number;z:number;height:number;width:number}){
  const geo=useMemo(()=>{
    const v:number[]=[];for(let i=0;i<11;i++){
      const a=i*Math.PI*2/11,b=(i+1)*Math.PI*2/11;
      v.push(Math.sin(a)*width,-5,Math.cos(a)*width,Math.sin(b)*width,-5,Math.cos(b)*width,
        Math.sin(i*2.3)*width*.1,height-5+Math.sin(i*3.1)*height*.1,Math.cos(i*1.7)*width*.1);
    }
    const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(v,3));g.computeVertexNormals();return g;
  },[height,width]);
  useEffect(()=>()=>geo.dispose(),[geo]);
  return <mesh geometry={geo} position={[x,0,z]} castShadow><meshStandardMaterial color="#8e908e" flatShading side={THREE.DoubleSide}/></mesh>;
}

function ParkingBay({d}:{d:(typeof districts)[number]}){
  const texture=useMemo(()=>{
    const c=document.createElement("canvas");c.width=512;c.height=512;
    const ctx=c.getContext("2d")!;ctx.fillStyle="#3e4846";ctx.fillRect(0,0,512,512);
    ctx.strokeStyle="#c0cec5";ctx.lineWidth=19;ctx.strokeRect(22,22,468,468);
    ctx.fillStyle="#e8eee9";ctx.textAlign="center";ctx.textBaseline="middle";ctx.font="bold 115px Arial";ctx.fillText("PARK",256,255);
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
  },[]);
  useEffect(()=>()=>texture.dispose(),[texture]);
  return <group position={[d.park[0],.16,d.park[1]]}>
    <mesh position={[0,-2.905,0]} castShadow receiveShadow><cylinderGeometry args={[4.15,4.5,5.65,12]}/><meshStandardMaterial color="#70716d" flatShading roughness={1}/></mesh>
    <mesh rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[6.4,6.4]}/><meshStandardMaterial map={texture} roughness={1}/></mesh>
    <mesh position={[-3.7,.56,3.4]} castShadow><boxGeometry args={[.12,1.1,.12]}/><meshStandardMaterial color="#49534f"/></mesh>
    <mesh position={[-3.7,1.27,3.4]} castShadow><boxGeometry args={[.8,.46,.12]}/><meshStandardMaterial color={paint.accent}/></mesh>
  </group>;
}
function Sign({d,index}:{d:(typeof districts)[number];index:number}){
  const tex=useMemo(()=>{
    const c=document.createElement("canvas");c.width=1024;c.height=360;
    const ctx=c.getContext("2d")!;ctx.fillStyle="#202226";ctx.fillRect(0,0,1024,360);
    ctx.strokeStyle="#898e8b";ctx.lineWidth=8;ctx.strokeRect(8,8,1008,344);
    ctx.fillStyle="#fff";ctx.textAlign="center";ctx.textBaseline="middle";
    ctx.font="bold 78px Arial";ctx.fillText((index+1)+". "+d.name,512,147,940);
    ctx.font="bold 42px Arial";ctx.fillText(d.caption,512,259,920);
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;
  },[d,index]);
  useEffect(()=>()=>tex.dispose(),[tex]);
  const p=signPositions[index];
  return <group position={[p.x,0,p.z]}>
    {[-4.2,4.2].map(x=><mesh key={x} position={[x,6.4,0]} castShadow><cylinderGeometry args={[.1,.13,12.8,8]}/><meshStandardMaterial color="#525653"/></mesh>)}
    <mesh position={[0,12.3,0]} castShadow><boxGeometry args={[10.3,3.5,.24]}/><meshStandardMaterial color="#202226"/></mesh>
    {[0,Math.PI].map(a=><mesh key={a} position={[0,12.3,a?-.135:.135]} rotation={[0,a,0]}>
      <planeGeometry args={[10.05,3.25]}/><meshBasicMaterial map={tex} side={THREE.FrontSide}/></mesh>)}
  </group>;
}
function GroveAndDetails({quality}:{quality:Props["quality"]}){
  const trees=quality==="Low"?treePositions.filter((_,i)=>i%2===0):treePositions;
  return <>
    {trees.map((p,i)=><Model key={i} modelId="tree" position={[p.x,0,p.z]} scale={p.scale*1.15}/>)}
    {districts.flatMap((d,idx)=>[0,1,2,3].map(i=>{
      const a=i*Math.PI/2+idx*.3,r=11.8,x=d.x+Math.sin(a)*r,z=d.z+Math.cos(a)*r;
      if(distanceToRoad(x,z).distance<3.9)return null;
      return <group key={idx+":"+i} position={[x,0,z]}>
        <mesh position={[0,1.35,0]} castShadow><cylinderGeometry args={[.055,.075,2.7,7]}/><meshStandardMaterial color="#454743"/></mesh>
        <mesh position={[0,2.75,0]}><sphereGeometry args={[.16,8,6]}/><meshStandardMaterial color="#f8e8c9" emissive="#e6bd82" emissiveIntensity={.6}/></mesh>
      </group>;
    }))}
  </>;
}

function World({input,ride,paused,overview,quality,onStatus,onReady}:Omit<Props,"onError">){
  const bike=useRef<THREE.Group>(null),visual=useRef<THREE.Group>(null);
  const {scene}=useGLTF(ROOT+"motorcycle.glb");
  const bikeModel=useMemo(()=>scene.clone(true),[scene]);
  const wheels=useMemo(()=>{const found:THREE.Object3D[]=[];bikeModel.traverse(o=>{if(o.name==="FrontWheelRig"||o.name==="RearWheelRig")found.push(o);});return found;},[bikeModel]);
  const state=useRef(initialBike()),last=useRef({x:state.current.x,z:state.current.z,heading:state.current.heading});
  const acc=useRef(0),report=useRef(0),frames=useRef(0),frameTime=useRef(0);
  const {camera,size}=useThree();
  const look=useMemo(()=>new THREE.Vector3(0,0,0),[]),desired=useMemo(()=>new THREE.Vector3(),[]);
  useEffect(()=>{
    ride.current={state:state.current,reset:id=>{const s=state.current;if(id)teleportBike(s,id);else resetBike(s);
      camera.position.set(s.x-Math.sin(s.heading)*9.5,s.y+5.4,s.z-Math.cos(s.heading)*9.5);
      last.current={x:s.x,z:s.z,heading:s.heading};
    },park:id=>parkBike(state.current,id)};
    camera.position.set(0,75,104);onReady();
    return()=>{ride.current=null;};
  },[ride,camera,onReady]);
  useFrame((_,delta)=>{
    const s=state.current,dt=Math.min(delta,.08);
    if(!paused){acc.current=Math.min(acc.current+dt,.2);while(acc.current>=1/60){
      last.current={x:s.x,z:s.z,heading:s.heading};stepBike(s,input.current,1/60);acc.current-=1/60;
    }}else acc.current=0;
    const alpha=paused?1:acc.current*60,x=THREE.MathUtils.lerp(last.current.x,s.x,alpha),z=THREE.MathUtils.lerp(last.current.z,s.z,alpha);
    if(bike.current){bike.current.position.set(x,s.y+.11,z);bike.current.rotation.y=s.heading;}
    if(visual.current){visual.current.rotation.z=s.lean;visual.current.position.y=Math.sin(performance.now()*.003)*.012;}
    wheels.forEach(w=>{w.rotation.x=-s.wheelAngle;if(w.name==="FrontWheelRig")w.rotation.y=s.steer*.22;});
    const narrow=size.width<720||size.height<500;
    if(overview){desired.set(narrow?0:-12,narrow?96:70,narrow?118:95);look.set(narrow?0:-12,0,0);}
    else{
      const arm=narrow?11:9.5;
      desired.set(x-Math.sin(s.heading)*arm,s.y+(narrow?6:5.4),z-Math.cos(s.heading)*arm);
      const ahead=size.width<600&&size.height>size.width?2.8:narrow?6:9;
      const targetX=x+Math.sin(s.heading)*ahead,targetZ=z+Math.cos(s.heading)*ahead;
      look.lerp(new THREE.Vector3(targetX,1.4,targetZ),Math.min(1,dt*5));
      for(const c of [...districts,...treePositions]){
        const dx=desired.x-c.x,dz=desired.z-c.z,rr="radius" in c?c.radius+1:1.1;
        if(Math.hypot(dx,dz)<rr)desired.lerp(new THREE.Vector3(x,3.4,z),.65);
      }
      desired.y=Math.max(4.5,desired.y);
    }
    camera.position.lerp(desired,Math.min(1,dt*(overview?2.5:5)));
    camera.lookAt(look);
    report.current+=dt;frames.current++;frameTime.current+=dt;
    if(report.current>.14){
      const nearest=districts.reduce<{id:DistrictId|null;distance:number}>((best,d)=>{
        const distance=Math.hypot(s.x-d.park[0],s.z-d.park[1]);return distance<best.distance?{id:d.id,distance}:best;
      },{id:null,distance:Infinity});
      onStatus({speed:s.speed,near:nearest.distance<10?nearest.id:null,bay:parkingAt(s.x,s.z),x:s.x,z:s.z,fps:Math.round(frames.current/Math.max(frameTime.current,.001))});
      report.current=0;if(frameTime.current>.9){frames.current=0;frameTime.current=0;}
    }
  });
  return <>
    <color attach="background" args={["#c4c6c5"]}/><fog attach="fog" args={["#c4c6c5",90,210]}/>
    <ambientLight intensity={.5}/><hemisphereLight args={["#f8f4ef","#626d72",.9]}/>
    <directionalLight position={[-24,48,33]} intensity={1.55} castShadow={quality!=="Low"} shadow-mapSize={[quality==="High"?2048:1024,quality==="High"?2048:1024]} shadow-camera-left={-65} shadow-camera-right={65} shadow-camera-top={65} shadow-camera-bottom={-65}/>
    <Terrain/><RoadNetwork/>
    {districts.map((d,i)=><group key={d.id}>
      <group position={[d.x,0,d.z]} rotation={[0,Math.PI,0]} scale={2.05}><Model modelId={d.id}/></group>
      <ParkingBay d={d}/><Sign d={d} index={i}/>
    </group>)}
    <GroveAndDetails quality={quality}/>
    <group ref={bike} scale={1.18}><group ref={visual}><primitive object={bikeModel}/></group></group>
  </>;
}
export default function WorldScene(props:Props){
  return <Canvas className="v2-canvas" shadows={props.quality!=="Low"} dpr={props.quality==="Low"?[1,1]:props.quality==="High"?[1.5,2]:[1,1.5]} camera={{fov:55,near:.1,far:260,position:[0,75,104]}} onCreated={({gl})=>gl.domElement.addEventListener("webglcontextlost",props.onError,{once:true})}>
    <Suspense fallback={null}><World {...props}/></Suspense>
  </Canvas>;
}
