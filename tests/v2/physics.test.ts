import { strict as assert } from "node:assert";
import { test } from "node:test";
import { InputController } from "../../lib/v2/input";
import { emptyInput, initialBike, parkBike, resetBike, stepBike, teleportBike } from "../../lib/v2/physics";
import { districts, distanceToRoad, isDrivable, onIsland, parkingAt, roadPoints } from "../../lib/v2/world-config";

test("every sampled route section is continuous and rideable",()=>{
  assert.ok(roadPoints.length>100);
  for(let i=0;i<roadPoints.length;i++){
    const a=roadPoints[i],b=roadPoints[(i+1)%roadPoints.length];
    assert.ok(Math.hypot(a[0]-b[0],a[1]-b[1])<2,"road gap at "+i);
    assert.equal(isDrivable(a[0],a[1]),true);
  }
  for(const d of districts){
    assert.equal(isDrivable(d.road[0],d.road[1]),true,d.id+" approach");
    assert.equal(isDrivable(d.park[0],d.park[1]),true,d.id+" bay");
    assert.equal(onIsland(d.park[0],d.park[1],3.1),true,d.id+" turnout must sit on its island");
    assert.ok(Math.hypot(d.park[0]-d.x,d.park[1]-d.z)>d.radius+3.1,d.id+" bay overlaps landmark");
    assert.equal(parkingAt(d.park[0],d.park[1]),d.id);
    assert.ok(distanceToRoad(d.park[0],d.park[1]).distance<7);
    assert.equal(parkingAt(d.road[0],d.road[1]),null,d.id+" route is outside the bay");
  }
});
test("a steering controller can ride a complete bridge-to-bridge lap",()=>{
  const s=initialBike(),input=emptyInput(),n=roadPoints.length;
  const nearest=()=>roadPoints.reduce((best,p,i)=>Math.hypot(s.x-p[0],s.z-p[1])<Math.hypot(s.x-roadPoints[best][0],s.z-roadPoints[best][1])?i:best,0);
  let previous=nearest(),progress=0,minRoad=Infinity;
  for(let tick=0;tick<24000&&progress<n;tick++){
    const i=nearest(),ahead=roadPoints[(i+8)%n],desired=Math.atan2(ahead[0]-s.x,ahead[1]-s.z);
    const error=Math.atan2(Math.sin(desired-s.heading),Math.cos(desired-s.heading));
    input.left=error<-.055;input.right=error>.055;
    input.forward=s.speed<5.2;input.brake=s.speed>6.3||Math.abs(error)>.75&&s.speed>3.6;
    stepBike(s,input,1/60);
    const next=nearest(),delta=(next-previous+n)%n;if(delta<8)progress+=delta;previous=next;
    minRoad=Math.min(minRoad,distanceToRoad(s.x,s.z).distance);
  }
  assert.ok(progress>=n,"the rider reached "+progress+" of "+n+" route samples");
  assert.ok(minRoad<1);
});
test("acceleration, coast, brake, reverse and no turn in place",()=>{
  const s=initialBike(),input=emptyInput();
  input.left=true;stepBike(s,input,1/60);assert.equal(s.heading,initialBike().heading);
  input.left=false;input.forward=true;for(let i=0;i<55;i++)stepBike(s,input,1/60);
  assert.ok(s.speed>4);const peak=s.speed;
  input.forward=false;for(let i=0;i<25;i++)stepBike(s,input,1/60);
  assert.ok(s.speed<peak&&s.speed>0);
  input.brake=true;for(let i=0;i<30;i++)stepBike(s,input,1/60);
  assert.ok(Math.abs(s.speed)<.2);
  input.brake=false;input.reverse=true;for(let i=0;i<35;i++)stepBike(s,input,1/60);
  assert.ok(s.speed<-.5);
});
test("parking requires the bay and low speed; Browse has no parking side effect",()=>{
  const s=initialBike();
  for(const d of districts){
    teleportBike(s,d.id);assert.equal(parkBike(s,d.id),false);
    s.x=d.park[0];s.z=d.park[1];s.speed=4;
    assert.equal(parkBike(s,d.id),false);
    s.speed=.6;assert.equal(parkBike(s,d.id),true);
    assert.equal(s.speed,0);assert.equal(s.checkpoint.x,s.x);
  }
});
test("each parking turnout can be entered from its road approach",()=>{
  for(const d of districts){
    const s=initialBike(),input=emptyInput();
    s.x=d.road[0];s.z=d.road[1];s.heading=Math.atan2(d.park[0]-s.x,d.park[1]-s.z);
    assert.equal(parkingAt(s.x,s.z),null);
    let parked=false;
    for(let i=0;i<360;i++){
      const remaining=Math.hypot(s.x-d.park[0],s.z-d.park[1]);
      input.forward=remaining>1.4&&s.speed<2.4;input.brake=remaining<2.9;
      stepBike(s,input,1/60);
      if(parkBike(s,d.id)){parked=true;break;}
    }
    assert.equal(parked,true,d.id+" cannot enter and park");
  }
});
test("cliffs, lake, landmarks and scenery contain the bike",()=>{
  const s=initialBike(),input=emptyInput();
  s.x=0;s.z=0;s.heading=0;s.speed=9;
  const before=[s.x,s.z];stepBike(s,input,1/60);assert.deepEqual([s.x,s.z],before);
  const d=districts[0];s.x=d.x;s.z=d.z-d.radius-1;s.heading=0;s.speed=10;
  stepBike(s,input,1/60);assert.ok(Math.hypot(s.x-d.x,s.z-d.z)>=d.radius+.67);
  s.x=62;s.z=54;s.speed=8;stepBike(s,input,1/60);assert.equal(s.x,62);
});
test("checkpoint reset and fast travel stop the bike on a road",()=>{
  const s=initialBike();s.speed=8;teleportBike(s,"contacts");
  assert.ok(isDrivable(s.x,s.z));assert.equal(s.speed,0);
  const checkpoint={...s.checkpoint};s.x=1;s.z=2;s.speed=10;resetBike(s);
  assert.equal(s.x,checkpoint.x);assert.equal(s.z,checkpoint.z);assert.equal(s.heading,checkpoint.heading);
});
test("keyboard and two simultaneous touch holds release independently",()=>{
  const c=new InputController();
  c.pressKey("w");c.pressKey("ArrowUp");c.releaseKey("w");assert.equal(c.input.forward,true);
  c.pressPointer(1,"forward");c.pressPointer(2,"left");assert.equal(c.input.left,true);
  c.releaseKey("ArrowUp");assert.equal(c.input.forward,true);
  c.releasePointer(1);assert.equal(c.input.forward,false);assert.equal(c.input.left,true);
  c.clear();assert.deepEqual(c.input,emptyInput());
});
