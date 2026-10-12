export const districts = [
  { id: "projects", name: "Project City", subtitle: "A workshop of shipped and experimental work", x: 0, z: 24, heading: 0, radius: 4.4 },
  { id: "experience", name: "Experience City", subtitle: "A walk through real roles", x: 20.8, z: 12, heading: 1.05, radius: 4.1 },
  { id: "contacts", name: "Contacts City", subtitle: "The signal tower", x: 20.8, z: -12, heading: 2.1, radius: 3.9 },
  { id: "about", name: "About City", subtitle: "The studio, skills, and leadership", x: 0, z: -24, heading: Math.PI, radius: 4.2 },
  { id: "education", name: "Education City", subtitle: "The learning courtyard", x: -20.8, z: -12, heading: 4.2, radius: 4.2 },
  { id: "resume", name: "Resume City", subtitle: "A document pavilion", x: -20.8, z: 12, heading: 5.25, radius: 4.0 },
] as const;

export type DistrictId = (typeof districts)[number]["id"];
export const WORLD_RADIUS = 35;
export const START = { x: 8, z: -30, heading: 0 };
export const landmarkColliders = districts.map(({ x, z, radius }) => ({ x, z, radius }));
export const channelAngles = [Math.PI/6, Math.PI*5/6, Math.PI*3/2];
export function isChannel(x:number,z:number){
  const a=Math.atan2(x,z), r=Math.hypot(x,z);
  return r>9 && r<34 && channelAngles.some(c=>Math.abs(Math.atan2(Math.sin(a-c),Math.cos(a-c)))<.11);
}
export const treePositions = [11.5,27.8,31.5].flatMap((r,ring)=>
  Array.from({length:ring===0?18:ring===1?30:36},(_,i)=>{
    const a=(i+(ring*.37))*Math.PI*2/(ring===0?18:ring===1?30:36);
    const rr=r+Math.sin(i*2.47+ring)*.95;
    return {x:Math.sin(a)*rr,z:Math.cos(a)*rr,scale:.72+(i%5)*.09};
  })
).filter(p=>!isChannel(p.x,p.z)&&districts.every(d=>Math.hypot(p.x-d.x,p.z-d.z)>5.8)&&Math.abs(Math.hypot(p.x,p.z)-17.5)>2.5&&!(Math.abs(p.x-8)<2.7&&p.z< -14));
export const signPositions=districts.map(d=>({x:d.x-Math.sin(d.heading)*6+Math.cos(d.heading)*2.7,z:d.z-Math.cos(d.heading)*6-Math.sin(d.heading)*2.7}));
export const welcomeSign={x:11,z:-29};
export const propColliders=[
  {x:-14,z:-27,radius:.48},{x:-10,z:-27,radius:.76},{x:-6,z:-27,radius:.22},
  {x:-28,z:0,radius:.48},{x:-28,z:-4,radius:.76},{x:-28,z:-8,radius:.22},
];

export function terrainHeight(x: number, z: number) {
  const d = Math.hypot(x, z);
  return Math.max(0, Math.min(1, (d - 7) / 12)) * (0.12 * Math.sin(x * 0.22) * Math.cos(z * 0.17));
}
