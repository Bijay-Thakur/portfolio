/** The overview looks north (negative z): the six stops match the reference layout. */
export const districts = [
  { id: "projects", name: "Project City", caption: "MY WORK", subtitle: "A workshop of shipped and experimental work", x: -32, z: -20, road: [-24, -14], park: [-23, -17], radius: 5.8 },
  { id: "experience", name: "Experience City", caption: "MY JOURNEY", subtitle: "A walk through real roles", x: 0, z: -30, road: [0, -22], park: [9, -26], radius: 5.8 },
  { id: "contacts", name: "Contacts City", caption: "LET'S CONNECT", subtitle: "The signal tower", x: 32, z: -20, road: [24, -14], park: [23, -17], radius: 5.4 },
  { id: "about", name: "About City", caption: "WHO I AM", subtitle: "The studio, skills, and leadership", x: -32, z: 20, road: [-24, 14], park: [-23, 17], radius: 5.7 },
  { id: "education", name: "Education City", caption: "MY LEARNING", subtitle: "The learning courtyard", x: 0, z: 30, road: [0, 22], park: [9, 26], radius: 5.8 },
  { id: "resume", name: "Resume City", caption: "MY PROFILE", subtitle: "A document pavilion", x: 32, z: 20, road: [24, 14], park: [23, 17], radius: 5.5 },
] as const;
export type DistrictId = (typeof districts)[number]["id"];
export const ISLAND_RADIUS = 14.6;
export const ROAD_WIDTH = 5.2;
export const PARK_RADIUS = 3.1;
export const PARK_SPEED = 1.35;
export const START = { x: 15, z: 21, heading: -Math.PI / 2 };
// In route order. Intermediate bends keep the highway from reading as a hexagon.
export const routeKnots: readonly [number, number][] = [
  [-24,-14],[-13,-21],[0,-22],[13,-21],[24,-14],[27,0],
  [24,14],[13,21],[0,22],[-13,21],[-24,14],[-27,0],
];
function catmull(p0:number,p1:number,p2:number,p3:number,t:number){
  return .5*((2*p1)+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t*t*t);
}
export const roadPoints: readonly [number,number][] = routeKnots.flatMap((_,i)=>
  Array.from({length:12},(_,j)=>{
    const n=routeKnots.length,t=j/12;
    return [catmull(routeKnots[(i+n-1)%n][0],routeKnots[i][0],routeKnots[(i+1)%n][0],routeKnots[(i+2)%n][0],t),
      catmull(routeKnots[(i+n-1)%n][1],routeKnots[i][1],routeKnots[(i+1)%n][1],routeKnots[(i+2)%n][1],t)] as [number,number];
  })
);
export function distanceToRoad(x:number,z:number){
  let best=Infinity,nearest:[number,number]=[0,0],heading=0;
  for(let i=0;i<roadPoints.length;i++){
    const a=roadPoints[i],b=roadPoints[(i+1)%roadPoints.length],dx=b[0]-a[0],dz=b[1]-a[1];
    const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1)));
    const px=a[0]+t*dx,pz=a[1]+t*dz,d=Math.hypot(x-px,z-pz);
    if(d<best){best=d;nearest=[px,pz];heading=Math.atan2(dx,dz);}
  }
  return {distance:best,nearest,heading};
}
export function onIsland(x:number,z:number,margin=0){
  return districts.some(d=>Math.hypot(x-d.x,z-d.z)<ISLAND_RADIUS-margin);
}
export function isDrivable(x:number,z:number){
  return onIsland(x,z,.75)||distanceToRoad(x,z).distance<ROAD_WIDTH/2-.12||
    districts.some(d=>Math.hypot(x-d.park[0],z-d.park[1])<4.35);
}
export const landmarkColliders=districts.map(d=>({x:d.x,z:d.z,radius:d.radius}));
export const signPositions=districts.map(d=>({x:d.x,z:d.z+(d.z<0?-5.4:5.4)}));
export const treePositions=districts.flatMap((d,index)=>Array.from({length:24},(_,i)=>{
  const a=i*Math.PI*2/24+index*.36,r=8.4+(i%4)*1.45;
  return {x:d.x+Math.sin(a)*r,z:d.z+Math.cos(a)*r,scale:.84+(i%5)*.1};
})).filter(p=>distanceToRoad(p.x,p.z).distance>4.1&&districts.every(d=>Math.hypot(p.x-d.park[0],p.z-d.park[1])>5));
export function parkingAt(x:number,z:number){
  return districts.find(d=>Math.hypot(x-d.park[0],z-d.park[1])<=PARK_RADIUS)?.id??null;
}
export function terrainHeight(_x:number,_z:number){return 0;}
