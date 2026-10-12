import { START, districts, isDrivable, landmarkColliders, PARK_SPEED, parkingAt, roadPoints, signPositions, terrainHeight, treePositions, type DistrictId } from "./world-config";
export type DriveInput={forward:boolean;reverse:boolean;left:boolean;right:boolean;brake:boolean};
export type BikeState={x:number;z:number;y:number;heading:number;speed:number;steer:number;lean:number;wheelAngle:number;checkpoint:{x:number;z:number;heading:number}};
export const emptyInput=():DriveInput=>({forward:false,reverse:false,left:false,right:false,brake:false});
export const initialBike=():BikeState=>({...START,y:0,speed:0,steer:0,lean:0,wheelAngle:0,checkpoint:{...START}});
const clamp=(v:number,a:number,b:number)=>Math.min(b,Math.max(a,v));
const colliders=[...landmarkColliders,...treePositions.map(p=>({x:p.x,z:p.z,radius:.43*p.scale})),...signPositions.map(p=>({...p,radius:.25}))];
export function resetBike(s:BikeState,target=s.checkpoint){
  s.x=target.x;s.z=target.z;s.heading=target.heading;s.y=terrainHeight(s.x,s.z);
  s.speed=0;s.steer=0;s.lean=0;
}
export function teleportBike(s:BikeState,id:DistrictId){
  const d=districts.find(item=>item.id===id)!;
  let nearest=0,best=Infinity;
  roadPoints.forEach((p,i)=>{const distance=Math.hypot(p[0]-d.road[0],p[1]-d.road[1]);if(distance<best){best=distance;nearest=i;}});
  const index=(nearest-7+roadPoints.length)%roadPoints.length,p=roadPoints[index],next=roadPoints[(index+1)%roadPoints.length];
  const target={x:p[0],z:p[1],heading:Math.atan2(next[0]-p[0],next[1]-p[1])};
  s.checkpoint=target;resetBike(s,target);
}
export function parkBike(s:BikeState,id:DistrictId){
  if(parkingAt(s.x,s.z)!==id||Math.abs(s.speed)>PARK_SPEED)return false;
  s.speed=0;s.steer=0;s.lean=0;
  s.checkpoint={x:s.x,z:s.z,heading:s.heading};
  return true;
}
export function stepBike(s:BikeState,input:DriveInput,dt:number){
  const d=clamp(dt,0,1/30), gas=Number(input.forward)-Number(input.reverse);
  if(gas!==0)s.speed+=gas*(s.speed*gas<0?17:9.5)*d;
  else s.speed*=Math.exp(-3*d);
  if(input.brake)s.speed*=Math.exp(-13*d);
  s.speed=clamp(s.speed,-4.2,11.5);
  if(Math.abs(s.speed)<.03&&gas===0)s.speed=0;
  const turn=Number(input.right)-Number(input.left);
  s.steer+=(turn-s.steer)*Math.min(1,d*9);
  const speed=Math.abs(s.speed),yaw=speed<.08?0:(.54+1.05*Math.min(speed/7,1));
  s.heading+=s.steer*Math.sign(s.speed)*yaw*d;
  s.lean+=(-s.steer*Math.min(speed/8,1)*.16-s.lean)*Math.min(1,d*6);
  s.wheelAngle+=s.speed*d/.42;
  const oldX=s.x,oldZ=s.z;
  const nx=s.x+Math.sin(s.heading)*s.speed*d,nz=s.z+Math.cos(s.heading)*s.speed*d;
  if(isDrivable(nx,nz)){
    s.x=nx;s.z=nz;
    for(const c of colliders){
      const dx=s.x-c.x,dz=s.z-c.z,dist=Math.hypot(dx,dz),limit=c.radius+.68;
      if(dist<limit){
        const inv=1/Math.max(dist,.001);s.x=c.x+dx*inv*limit;s.z=c.z+dz*inv*limit;
        s.speed*=-.12;
      }
    }
    if(!isDrivable(s.x,s.z)){s.x=oldX;s.z=oldZ;s.speed=0;}
  }else{s.x=oldX;s.z=oldZ;s.speed*=-.1;}
  if(!Number.isFinite(s.x+s.z+s.speed))resetBike(s);
  s.y=terrainHeight(s.x,s.z);
  return s;
}
