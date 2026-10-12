import { START, WORLD_RADIUS, districts, isChannel, landmarkColliders, propColliders, signPositions, terrainHeight, treePositions, welcomeSign, type DistrictId } from "./world-config";

export type DriveInput = { forward: boolean; reverse: boolean; left: boolean; right: boolean; brake: boolean };
export type BikeState = { x: number; z: number; y: number; heading: number; speed: number; lean: number; wheelAngle: number; checkpoint: { x: number; z: number; heading: number } };
export const emptyInput = (): DriveInput => ({ forward: false, reverse: false, left: false, right: false, brake: false });
export const initialBike = (): BikeState => ({ ...START, y: 0, speed: 0, lean: 0, wheelAngle: 0, checkpoint: { ...START } });
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const colliders = [...landmarkColliders,...treePositions.map(p=>({x:p.x,z:p.z,radius:.46*p.scale})),...signPositions.map(p=>({x:p.x,z:p.z,radius:.18})),{...welcomeSign,radius:.18},...propColliders];

export function resetBike(s: BikeState, target = s.checkpoint) {
  s.x = target.x; s.z = target.z; s.heading = target.heading; s.y = terrainHeight(s.x, s.z);
  s.speed = 0; s.lean = 0;
}

export function teleportBike(s:BikeState,id:DistrictId){
  const d=districts.find(item=>item.id===id)!;
  const target={x:d.x-Math.sin(d.heading)*6.3,z:d.z-Math.cos(d.heading)*6.3,heading:d.heading};
  s.checkpoint=target;resetBike(s,target);
}

export function stepBike(s: BikeState, input: DriveInput, dt: number) {
  const d = clamp(dt, 0, 1 / 30);
  const gas = Number(input.forward) - Number(input.reverse);
  if (gas !== 0) s.speed += gas * (s.speed * gas < 0 ? 16 : 10) * d;
  else s.speed *= Math.exp(-2.2 * d);
  if (input.brake) s.speed *= Math.exp(-12 * d);
  s.speed = clamp(s.speed, -5, 13);
  if (Math.abs(s.speed) < 0.025 && gas === 0) s.speed = 0;

  const steer = Number(input.right) - Number(input.left);
  const grip = clamp(Math.abs(s.speed) / 3, 0, 1);
  s.heading += steer * Math.sign(s.speed) * (0.5 + 1.5 * grip) * d;
  s.lean += ((-steer * grip * 0.18) - s.lean) * Math.min(1, d * 7);
  s.wheelAngle += s.speed * d / 0.42;

  const oldX = s.x, oldZ = s.z;
  s.x += Math.sin(s.heading) * s.speed * d;
  s.z += Math.cos(s.heading) * s.speed * d;
  const limit = WORLD_RADIUS - 0.9;
  const distance = Math.hypot(s.x, s.z);
  if (distance > limit) { s.x *= limit / distance; s.z *= limit / distance; s.speed *= -0.2; }
  const lake = 9.2;
  if (distance < lake) { const scale=lake/Math.max(distance,.001);s.x*=scale;s.z*=scale;s.speed*=-.2; }
  if (isChannel(s.x,s.z) && Math.abs(distance-17.5)>2.1) {s.x=oldX;s.z=oldZ;s.speed*=-.2;}
  for (const c of colliders) {
    const dx = s.x - c.x, dz = s.z - c.z, dist = Math.hypot(dx, dz), minDist = c.radius + 0.78;
    if (dist < minDist) {
      const nx = dist > 0.001 ? dx / dist : Math.sin(s.heading + Math.PI);
      const nz = dist > 0.001 ? dz / dist : Math.cos(s.heading + Math.PI);
      s.x = c.x + nx * minDist; s.z = c.z + nz * minDist;
      s.speed = Math.abs(s.speed) > 1 ? -s.speed * 0.16 : 0;
    }
  }
  // Swept movement is bounded by a 1/60 simulation step, keeping collision response stable.
  if (!Number.isFinite(s.x + s.z + s.speed) || Math.hypot(s.x - oldX, s.z - oldZ) > 2) resetBike(s);
  s.y = terrainHeight(s.x, s.z);
  return s;
}
