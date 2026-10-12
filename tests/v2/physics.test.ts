import { strict as assert } from "node:assert";
import { test } from "node:test";
import { InputController } from "../../lib/v2/input";
import { emptyInput, initialBike, resetBike, stepBike, teleportBike } from "../../lib/v2/physics";
import { districts } from "../../lib/v2/world-config";

test("throttle, coast, brake, and reverse have distinct responses",()=>{
  const s=initialBike(), input=emptyInput();
  input.forward=true;for(let i=0;i<60;i++)stepBike(s,input,1/60);
  assert.ok(s.speed>5);const forward=s.speed;
  input.forward=false;for(let i=0;i<30;i++)stepBike(s,input,1/60);
  assert.ok(s.speed<forward&&s.speed>0);
  input.brake=true;for(let i=0;i<30;i++)stepBike(s,input,1/60);
  assert.ok(s.speed<.2);
  input.brake=false;input.reverse=true;for(let i=0;i<50;i++)stepBike(s,input,1/60);
  assert.ok(s.speed<-.5);
});

test("steering follows travel direction in forward and reverse",()=>{
  const f=initialBike(),r=initialBike();f.speed=6;r.speed=-3;
  const input=emptyInput();input.left=true;
  stepBike(f,input,1/60);stepBike(r,input,1/60);
  assert.ok(f.heading<0);assert.ok(r.heading>0);
});

test("districts, lagoon, and world edge block the bike",()=>{
  const d=districts[0],s=initialBike(),input=emptyInput();
  s.x=d.x;s.z=d.z-d.radius-.8;s.heading=0;s.speed=13;
  stepBike(s,input,1/60);
  assert.ok(Math.hypot(s.x-d.x,s.z-d.z)>=d.radius+.78-.001);
  s.x=0;s.z=-9.35;s.heading=0;s.speed=13;
  stepBike(s,input,1/60);assert.ok(Math.hypot(s.x,s.z)>=9.2-.001);
  s.x=0;s.z=-34.05;s.heading=Math.PI;s.speed=13;
  stepBike(s,input,1/60);assert.ok(Math.hypot(s.x,s.z)<=34.1);
});

test("checkpoint respawn clears speed and returns heading",()=>{
  const s=initialBike();s.checkpoint={x:4,z:-18,heading:1.2};s.x=8;s.z=8;s.speed=12;
  resetBike(s);assert.equal(s.x,4);assert.equal(s.z,-18);assert.equal(s.heading,1.2);assert.equal(s.speed,0);
});

test("fast travel lands on an approach road and updates checkpoint",()=>{
  const s=initialBike();s.speed=8;teleportBike(s,"contacts");
  const d=districts.find(x=>x.id==="contacts")!;
  assert.ok(Math.hypot(s.x-d.x,s.z-d.z)>d.radius+.78);
  assert.equal(s.heading,d.heading);assert.equal(s.speed,0);
  s.x=0;s.z=-31;resetBike(s);assert.equal(s.x,s.checkpoint.x);
});

test("keyboard and multi-touch holds release independently and clear on blur",()=>{
  const c=new InputController();
  c.pressKey("w");c.pressKey("ArrowUp");c.releaseKey("w");assert.equal(c.input.forward,true);
  c.pressPointer(1,"forward");c.pressPointer(2,"left");assert.equal(c.input.left,true);
  c.releaseKey("ArrowUp");assert.equal(c.input.forward,true);
  c.releasePointer(1);assert.equal(c.input.forward,false);assert.equal(c.input.left,true);
  c.clear();assert.deepEqual(c.input,emptyInput());
});
