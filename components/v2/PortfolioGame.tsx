"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import { districts, type DistrictId } from "@/lib/v2/world-config";
import { portfolioContent as content } from "@/lib/v2/content";
import { type DriveInput } from "@/lib/v2/physics";
import { InputController } from "@/lib/v2/input";
import type { RideHandle, SceneStatus } from "./WorldScene";

const WorldScene = dynamic(() => import("./WorldScene"), { ssr: false });
class SceneGuard extends Component<{children:React.ReactNode;onError:()=>void},{failed:boolean}>{
  state={failed:false};
  componentDidCatch(){this.setState({failed:true});this.props.onError();}
  render(){return this.state.failed?null:this.props.children;}
}
type Panel = DistrictId | "map" | "help" | null;
const projectCount = content.projectGroups.reduce((n,g)=>n+g.projects.length,0);

function External({ href, children }: {href:string;children:React.ReactNode}) {
  const external = /^https?:/.test(href);
  return <a href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined}>{children} <span aria-hidden>↗</span></a>;
}

function Content({ id }: {id:DistrictId}) {
  switch(id){
    case "projects": return <>
      <p className="v2-lead">{projectCount} projects across four collections. Every claim and link comes from the classic portfolio.</p>
      {content.projectGroups.map((group)=><section key={group.title} className="v2-content-section">
        <h3>{group.title} <small>{group.projects.length}</small></h3>
        <div className="v2-project-grid">{group.projects.map(p=><article className="v2-content-card" key={p.slug}>
          <div className="v2-card-top"><span className="v2-eyebrow">{p.category}</span>{p.badge && <strong className="v2-badge">{p.badge}</strong>}{p.isPrototype && <strong className="v2-badge">Prototype</strong>}</div>
          <h4>{p.title}</h4><p>{p.summary}</p><p className="v2-highlight">{p.highlight}</p>
          {p.honestNote && <p className="v2-honest">{p.honestNote}</p>}
          <div className="v2-tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
          <div className="v2-links">{p.repoUrl && <External href={p.repoUrl}>Source</External>}{p.demoUrl && <External href={p.demoUrl}>{p.linkLabel??"Demo"}</External>}</div>
        </article>)}</div>
      </section>)}
    </>;
    case "experience": return <><p className="v2-lead">Roles, teams, and work that shaped the practice.</p>{content.experiences.map((e,i)=><article className="v2-content-card" key={i}><span className="v2-eyebrow">{e.dates}</span><h3>{e.role}</h3><h4>{e.org}</h4><ul>{e.bullets.map(b=><li key={b}>{b}</li>)}</ul><div className="v2-tags">{e.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</>;
    case "contacts": return <><p className="v2-lead">Say hello, see the work, or open the current resume.</p><div className="v2-contact-grid">{content.contactLinks.map(c=><External key={c.label} href={c.href}>{c.label}</External>)}</div></>;
    case "about": return <><p className="v2-lead">{content.site.about}</p><div className="v2-tags">{content.site.focusTags.map(t=><span key={t}>{t}</span>)}</div><section className="v2-content-section"><h3>Skills</h3><div className="v2-project-grid">{content.skillGroups.map(g=><article className="v2-content-card" key={g.label}><h4>{g.label}</h4><div className="v2-tags">{g.skills.map(s=><span key={s}>{s}</span>)}</div></article>)}</div></section><section className="v2-content-section"><h3>Leadership</h3>{content.leadership.map((l,i)=><article className="v2-content-card" key={i}><h4>{l.title}</h4><span className="v2-eyebrow">{l.org}{l.period?` · ${l.period}`:""}</span><p>{l.description}</p>{l.tags && <div className="v2-tags">{l.tags.map(t=><span key={t}>{t}</span>)}</div>}</article>)}</section></>;
    case "education": return <><p className="v2-lead">A foundation in computer science and applied systems.</p>{content.education.map((e,i)=><article className="v2-content-card" key={i}><span className="v2-eyebrow">{e.period}</span><h3>{e.school}</h3><h4>{e.degree}</h4><p>{e.honor} · GPA {e.gpa}</p>{e.note && <p>{e.note}</p>}</article>)}</>;
    case "resume": return <><p className="v2-lead">A concise record of engineering, research, and product work.</p><div className="v2-resume"><span aria-hidden>▤</span><h3>{content.site.name}</h3><p>{content.site.title}</p><External href={content.site.resume}>Open resume PDF</External></div></>;
  }
}

function MapPanel({ openContent, travel }: {openContent:(id:DistrictId)=>void;travel:(id:DistrictId)=>void}) {
  return <><p className="v2-lead">Choose a destination. Open its content directly or travel to the road nearby.</p><div className="v2-map-grid">{districts.map((d,i)=><article className="v2-map-card" key={d.id}><span className="v2-map-number">0{i+1}</span><h3>{d.name}</h3><p>{d.subtitle}</p><div><button onClick={()=>openContent(d.id)}>Browse</button><button onClick={()=>travel(d.id)}>Fast travel</button></div></article>)}</div></>;
}

function HelpPanel(){return <><p className="v2-lead">Ride the loop to discover each landmark, or use the map to browse all six areas directly.</p><div className="v2-help-grid"><section><h3>Keyboard</h3><p><kbd>W</kbd>/<kbd>↑</kbd> accelerate · <kbd>S</kbd>/<kbd>↓</kbd> reverse · <kbd>A</kbd>/<kbd>←</kbd> and <kbd>D</kbd>/<kbd>→</kbd> steer</p><p><kbd>Space</kbd> brake · <kbd>E</kbd>/<kbd>Enter</kbd> open nearby place · <kbd>M</kbd> map · <kbd>R</kbd> respawn · <kbd>Esc</kbd> close</p></section><section><h3>Phone</h3><p>Hold the forward control and a steering control at the same time. Use reverse to back away from landmarks. Tap a nearby place to open it.</p></section><section><h3>Recovery</h3><p>Map fast travel puts you on the road near any destination. Respawn returns to your last destination checkpoint.</p></section></div></>}

const blankStatus:SceneStatus={speed:0,near:null,x:0,z:0,fps:0};
function MiniMap({status}:{status:SceneStatus}){
  const xy=(x:number,z:number)=>({x:50+x*1.35,y:50-z*1.35});
  const bike=xy(status.x,status.z);
  return <svg className="v2-minimap" viewBox="0 0 100 100" role="img" aria-label="Map showing your position and six districts">
    <circle cx="50" cy="50" r="48" fill="#e9ebee" stroke="#fff" strokeWidth="2"/>
    <circle cx="50" cy="50" r="12.5" fill="#b9bec6"/>
    <circle cx="50" cy="50" r="23.6" fill="none" stroke="#fff" strokeWidth="4"/>
    {districts.map((d,i)=>{const p=xy(d.x,d.z),r=xy(Math.sin(d.heading)*17.5,Math.cos(d.heading)*17.5);return <g key={d.id}><line x1={r.x} y1={r.y} x2={p.x} y2={p.y} stroke="white" strokeWidth="3"/><circle cx={p.x} cy={p.y} r="4.2" fill="#262a30"/><text x={p.x} y={p.y+1.7} fontSize="4.3" textAnchor="middle" fill="white" fontWeight="bold">{i+1}</text></g>;})}
    <circle cx={bike.x} cy={bike.y} r="3.1" fill="#e6e9ef" stroke="#161616" strokeWidth="1.7"/>
  </svg>;
}

export default function PortfolioGame(){
  const controls=useRef(new InputController()), input=useRef(controls.current.input), ride=useRef<RideHandle|null>(null), dialog=useRef<HTMLDivElement>(null), opener=useRef<HTMLElement|null>(null);
  const [panel,setPanel]=useState<Panel>(null),[intro,setIntro]=useState(true),[status,setStatus]=useState<SceneStatus>(blankStatus);
  const [quality,setQuality]=useState<"Auto"|"Low"|"High">("Auto"),[audio,setAudio]=useState(false),[ready,setReady]=useState(false),[webgl,setWebgl]=useState(true),[hidden,setHidden]=useState(false);
  const audioCtx=useRef<AudioContext|null>(null), oscillator=useRef<OscillatorNode|null>(null), gain=useRef<GainNode|null>(null);
  const clearInputs=useCallback(()=>controls.current.clear(),[]);
  const close=useCallback(()=>{setPanel(null);clearInputs();opener.current?.focus();},[clearInputs]);
  const open=useCallback((next:Panel)=>{opener.current=document.activeElement as HTMLElement;clearInputs();setIntro(false);setPanel(next);},[clearInputs]);
  const travel=useCallback((id:DistrictId)=>{ride.current?.reset(id);close();},[close]);
  const onStatus=useCallback((s:SceneStatus)=>setStatus(s),[]);
  const onReady=useCallback(()=>setReady(true),[]);
  const onError=useCallback(()=>{setWebgl(false);setIntro(false);},[]);

  useEffect(()=>{
    const c=document.createElement("canvas");
    if(!(c.getContext("webgl2")||c.getContext("webgl"))){setWebgl(false);setIntro(false);}
    const blur=()=>clearInputs();
    const visibility=()=>{setHidden(document.hidden);if(document.hidden)clearInputs();};
    window.addEventListener("blur",blur);document.addEventListener("visibilitychange",visibility);
    return ()=>{window.removeEventListener("blur",blur);document.removeEventListener("visibilitychange",visibility);};
  },[clearInputs]);
  useEffect(()=>{
    const down=(e:KeyboardEvent)=>{
      const target=e.target;
      if(e.key==="Escape"){if(panel)close();return;}
      if(target instanceof HTMLElement && target.closest("input,textarea,select,button,a,[role='button'],[contenteditable='true']"))return;
      if(panel||intro||!webgl)return;
      if(controls.current.pressKey(e.key)){e.preventDefault();return;}
      if(e.repeat)return;
      if(e.key.toLowerCase()==="m"){e.preventDefault();open("map");}
      if(e.key.toLowerCase()==="r"){e.preventDefault();ride.current?.reset();}
      if((e.key.toLowerCase()==="e"||e.key==="Enter")&&status.near){e.preventDefault();open(status.near);}
    };
    const up=(e:KeyboardEvent)=>{if(controls.current.releaseKey(e.key)&&!panel&&!intro)e.preventDefault();};
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    return()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);};
  },[panel,intro,webgl,status.near,close,open]);
  useEffect(()=>{if(panel){dialog.current?.focus();clearInputs();}},[panel,clearInputs]);
  useEffect(()=>{if(!audio){gain.current?.gain.setTargetAtTime(0,audioCtx.current?.currentTime??0,.08);return;}
    if(!audioCtx.current){const ctx=new AudioContext();const osc=ctx.createOscillator();const g=ctx.createGain();osc.type="triangle";g.gain.value=0;osc.connect(g).connect(ctx.destination);osc.start();audioCtx.current=ctx;oscillator.current=osc;gain.current=g;}
    audioCtx.current.resume();return()=>{};
  },[audio]);
  useEffect(()=>{if(!audioCtx.current||!oscillator.current||!gain.current)return;
    const ctx=audioCtx.current;oscillator.current.frequency.setTargetAtTime(58+Math.abs(status.speed)*8,ctx.currentTime,.1);
    gain.current.gain.setTargetAtTime(audio&&!panel&&!hidden&&!intro&&Math.abs(status.speed)>.2?.015:0,ctx.currentTime,.12);
  },[status.speed,audio,panel,hidden,intro]);
  useEffect(()=>()=>{oscillator.current?.stop();audioCtx.current?.close();},[]);
  const setPointer=(e:React.PointerEvent<HTMLButtonElement>,action:keyof DriveInput,pressed:boolean)=>{
    if(pressed){e.currentTarget.setPointerCapture(e.pointerId);controls.current.pressPointer(e.pointerId,action);}
    else controls.current.releasePointer(e.pointerId);
  };
  const district=status.near?districts.find(d=>d.id===status.near):null;
  const paused=!!panel||intro||hidden||!webgl;
  return <main className="v2-app" aria-label="Playable portfolio">
    <header className="v2-topbar"><a className="v2-skip" href="/">Skip game · View classic portfolio</a><span className="v2-brand">B.T. <span>/ world 02</span></span><nav aria-label="Game controls"><button onClick={()=>open("map")}>Map</button><button onClick={()=>open("help")}>Help</button></nav></header>
    {webgl?<SceneGuard onError={onError}><WorldScene input={input} ride={ride} paused={paused} overview={intro} quality={quality} onStatus={onStatus} onReady={onReady} onError={onError}/></SceneGuard>:<div className="v2-fallback"><h1>Explore Bijay’s portfolio</h1><p>3D is unavailable in this browser. Every destination remains available below.</p><button onClick={()=>open("map")}>Browse all destinations</button></div>}
    {!ready&&webgl&&<div className="v2-loading" aria-live="polite"><span className="v2-spinner"/><p>Building the world…</p></div>}
    {intro&&<section className="v2-intro" aria-label="Welcome"><span className="v2-eyebrow">AN INTERACTIVE PORTFOLIO</span><h1>Take the long way<br/><em>through the work.</em></h1><p>Six destinations. One small world. Ride the motorcycle or explore every place from the map.</p><div className="v2-intro-actions"><button className="v2-primary" onClick={()=>{setIntro(false);clearInputs();}}>Start riding</button><button onClick={()=>open("map")}>Browse without driving</button></div><p className="v2-intro-hint">WASD / arrows to ride · M for map · touch controls on phone</p></section>}
    {!intro&&webgl&&<><div className="v2-hud" aria-live="polite"><div><span className="v2-eyebrow">NOW RIDING</span><strong>{district?.name??"Open road"}</strong><small>{Math.round(Math.abs(status.speed)*3.6)} km/h {quality==="High"?`· ${status.fps} FPS`:""}</small></div><MiniMap status={status}/><button onClick={()=>ride.current?.reset()}>↺ Respawn</button></div>{district&&!panel&&<button className="v2-interact" onClick={()=>open(district.id)}>Explore {district.name} <span>E / Enter</span></button>}
      <div className="v2-settings"><button onClick={()=>setAudio(v=>!v)} aria-pressed={audio}>{audio?"Sound on":"Sound off"}</button><label>Quality <select value={quality} onChange={e=>setQuality(e.target.value as typeof quality)}><option>Auto</option><option>Low</option><option>High</option></select></label></div>
      {!panel&&<div className="v2-touch" aria-label="Touch driving controls"><div className="v2-touch-steer">{[["left","◀"],["right","▶"]].map(([action,label])=><button key={action} aria-label={`Steer ${action}`} onPointerDown={e=>setPointer(e,action as keyof DriveInput,true)} onPointerUp={e=>setPointer(e,action as keyof DriveInput,false)} onPointerCancel={e=>setPointer(e,action as keyof DriveInput,false)} onLostPointerCapture={e=>setPointer(e,action as keyof DriveInput,false)}>{label}</button>)}</div><div className="v2-touch-drive">{[["reverse","REV"],["brake","BRAKE"],["forward","GO"]].map(([action,label])=><button key={action} aria-label={action} onPointerDown={e=>setPointer(e,action as keyof DriveInput,true)} onPointerUp={e=>setPointer(e,action as keyof DriveInput,false)} onPointerCancel={e=>setPointer(e,action as keyof DriveInput,false)} onLostPointerCapture={e=>setPointer(e,action as keyof DriveInput,false)}>{label}</button>)}</div></div>}
    </>}
    {panel&&<div className="v2-overlay" onPointerDown={e=>{if(e.target===e.currentTarget)close();}}><div className="v2-panel" role="dialog" aria-modal="true" aria-label={panel==="map"?"World map":panel==="help"?"Help":districts.find(d=>d.id===panel)?.name} tabIndex={-1} ref={dialog} onKeyDown={e=>{if(e.key==="Tab"){const focusable=Array.from(e.currentTarget.querySelectorAll<HTMLElement>("button,a,select,[tabindex]:not([tabindex='-1'])"));if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===dialog.current)){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}}>
      <div className="v2-panel-head"><div><span className="v2-eyebrow">{panel==="map"?"WAYFINDING":panel==="help"?"FIELD GUIDE":"DESTINATION"}</span><h2>{panel==="map"?"World map":panel==="help"?"How to explore":districts.find(d=>d.id===panel)?.name}</h2></div><button onClick={close} aria-label="Close panel">✕</button></div>
      <div className="v2-panel-body">{panel==="map"?<MapPanel openContent={open} travel={travel}/>:panel==="help"?<HelpPanel/>:<Content id={panel}/>}</div>
    </div></div>}
  </main>;
}
