import { spawn } from "node:child_process";
import { writeFile, mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert/strict";

const root=process.cwd(),out=join(root,"docs","v2","review");
const browserRoot=join(process.env.LOCALAPPDATA??"", "ms-playwright");
const installed=(await readdir(browserRoot)).find(name=>name.startsWith("chromium_headless_shell-"));
if(!installed)throw new Error("A local Chromium headless shell is needed for visual review");
const edge=process.env.V2_BROWSER??join(browserRoot,installed,"chrome-headless-shell-win64","chrome-headless-shell.exe");
await mkdir(out,{recursive:true});
const proc=spawn(edge,[
  "--no-sandbox","--enable-webgl","--use-gl=angle","--use-angle=swiftshader",
  "--enable-unsafe-swiftshader","--remote-debugging-port=9223","--remote-allow-origins=*","--no-first-run",
  "--user-data-dir="+join(root,".next","v2-browser"),"http://localhost:3002/"
],{stdio:"ignore",windowsHide:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let tab;
for(let i=0;i<40;i++){try{
  const pages=await (await fetch("http://localhost:9223/json")).json();
  tab=pages.find(p=>p.type==="page"&&new URL(p.url).pathname==="/");
  if(tab)break;
}catch{}await sleep(250);}
if(!tab){proc.kill();throw new Error("Headless Edge did not expose the local page");}
const ws=new WebSocket(tab.webSocketDebuggerUrl),pending=new Map();let id=0;
ws.addEventListener("message",event=>{
  const m=JSON.parse(event.data);
  if(m.id&&pending.has(m.id)){const {resolve,reject}=pending.get(m.id);pending.delete(m.id);m.error?reject(Error(m.error.message)):resolve(m.result);}
  if(m.method==="Runtime.exceptionThrown")console.error("Browser exception:",m.params.exceptionDetails.text);
});
await new Promise((resolve,reject)=>{ws.addEventListener("open",resolve,{once:true});ws.addEventListener("error",reject,{once:true});});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>(await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true})).result.value;
const shot=async name=>{const result=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});await writeFile(join(out,name+".png"),Buffer.from(result.data,"base64"));};
await send("Page.enable");await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await send("Page.reload",{ignoreCache:true});await sleep(4500);
const ready=await evaluate("({title:document.title,canvas:!!document.querySelector('canvas'),loading:!!document.querySelector('.v2-loading'),intro:!!document.querySelector('.v2-intro'),webgl:(()=>{try{return !!document.createElement('canvas').getContext('webgl2')}catch{return false}})()})");
console.log("ready",ready);
assert.equal(ready.canvas,true);assert.equal(ready.loading,false);assert.equal(ready.intro,true);assert.equal(ready.webgl,true);
await shot("desktop-intro");
await evaluate("document.querySelector('.v2-intro .v2-primary')?.click()");await sleep(2600);
await shot("desktop-chase");
console.log("chase",await evaluate("({speed:document.querySelector('.v2-hud small')?.textContent,sign:document.querySelector('.v2-hud strong')?.textContent,park:document.querySelector('.v2-interact')?.textContent})"));
await send("Input.dispatchKeyEvent",{type:"keyDown",key:"w",code:"KeyW",windowsVirtualKeyCode:87,nativeVirtualKeyCode:87});
await sleep(900);
const keyboardSpeed=await evaluate("document.querySelector('.v2-hud small')?.textContent");
assert.match(keyboardSpeed,/[1-9][0-9]* km\/h/);console.log("keyboard ride",keyboardSpeed);
await shot("desktop-moving");
await send("Input.dispatchKeyEvent",{type:"keyUp",key:"w",code:"KeyW",windowsVirtualKeyCode:87,nativeVirtualKeyCode:87});
await evaluate("document.querySelector('.v2-topbar button')?.click()");await sleep(600);await shot("desktop-map");
const cities=["Project City","Experience City","Contacts City","About City","Education City","Resume City"];
for(let i=0;i<cities.length;i++){
  await evaluate("document.querySelectorAll('.v2-map-card')["+i+"].querySelector('button')?.click()");
  await sleep(180);
  const title=await evaluate("document.querySelector('.v2-panel-head h2')?.textContent");
  assert.equal(title,cities[i]);console.log("browse",title);
  if(i===0)await shot("desktop-panel");
  await evaluate("document.querySelector('.v2-panel-head button')?.click()");await sleep(100);
  await evaluate("document.querySelector('.v2-topbar button')?.click()");await sleep(100);
}
await evaluate("document.querySelector('.v2-panel-head button')?.click()");
await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:true});
await send("Emulation.setTouchEmulationEnabled",{enabled:true,maxTouchPoints:5});
await send("Page.reload",{ignoreCache:true});await sleep(4000);await shot("phone-intro");
await evaluate("document.querySelector('.v2-intro .v2-primary')?.click()");await sleep(2000);await shot("phone-chase");
await send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:344,y:670,id:1}]});
await send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:344,y:670,id:1},{x:111,y:799,id:2}]});
await sleep(950);
const touchSpeed=await evaluate("document.querySelector('.v2-hud small')?.textContent");
assert.match(touchSpeed,/[1-9][0-9]* km\/h/);console.log("touch ride",touchSpeed);
await send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});await sleep(350);
await send("Emulation.setDeviceMetricsOverride",{width:844,height:390,deviceScaleFactor:1,mobile:true});
await send("Page.reload",{ignoreCache:true});await sleep(4000);
await evaluate("document.querySelector('.v2-intro .v2-primary')?.click()");await sleep(1500);await shot("phone-landscape");
console.log("screenshots",out);
const classicResponse=await fetch("http://localhost:3002/classic");
const classicStatus=classicResponse.status;
const skip=await evaluate("document.querySelector('.v2-skip')?.getAttribute('href')");
assert.equal(classicStatus,200);assert.equal(skip,"/classic");
assert.match(await classicResponse.text(),/Classic Portfolio/);
assert.equal((await fetch("http://localhost:3002/v2")).status,200);
for(const section of ["about","projects","experience","contact"]){
  const response=await fetch("http://localhost:3002/"+section,{redirect:"manual"});
  assert.equal(response.status,307);
  assert.equal(response.headers.get("location"),"/classic#"+section);
}
console.log("classic",classicStatus,"skip",skip);
await send("Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await send("Page.navigate",{url:"http://localhost:3002/classic"});await sleep(1800);
const classicPage=await evaluate("({title:document.title,hero:!!document.querySelector('#hero'),projects:!!document.querySelector('#projects'),contact:!!document.querySelector('#contact')})");
assert.equal(classicPage.hero,true);assert.equal(classicPage.projects,true);assert.equal(classicPage.contact,true);
console.log("classic page",classicPage);await shot("classic-home");
ws.close();proc.kill();
