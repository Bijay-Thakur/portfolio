"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import { districts, PARK_SPEED, roadPoints, type DistrictId } from "@/lib/v2/world-config";
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
  return <><p className="v2-lead">Choose a destination. Open its content directly or travel to the road nearby.</p><div className="v2-map-layout"><WorldMap/><div className="v2-map-grid">{districts.map((d,i)=><article className="v2-map-card" key={d.id}><span className="v2-map-number">0{i+1}</span><h3>{d.name}</h3><p>{d.caption} · {d.subtitle}</p><div><button onClick={()=>openContent(d.id)}>Browse</button><button onClick={()=>travel(d.id)}>Fast travel</button></div></article>)}</div></div></>;
}

function HelpPanel(){return <><p className="v2-lead">Follow the bridges around the lake. Each city has a painted PARK bay beside the road.</p><div className="v2-help-grid"><section><h3>Keyboard</h3><p><kbd>W</kbd>/<kbd>↑</kbd> accelerate · <kbd>S</kbd>/<kbd>↓</kbd> reverse · <kbd>A</kbd>/<kbd>←</kbd> and <kbd>D</kbd>/<kbd>→</kbd> steer</p><p><kbd>Space</kbd> brake · <kbd>E</kbd>/<kbd>Enter</kbd> park when stopped in a bay · <kbd>M</kbd> map · <kbd>R</kbd> respawn · <kbd>Esc</kbd> close</p></section><section><h3>Phone</h3><p>Hold GO and a steering control together. Release them independently. Slow down inside a PARK bay, then tap Park.</p></section><section><h3>Recovery</h3><p>Map fast travel puts you on the road near a destination. Respawn returns to the last safe checkpoint.</p></section></div></>}

const blankStatus:SceneStatus={speed:0,near:null,bay:null,x:0,z:0,fps:0};
const mapXY=(x:number,z:number)=>({x:50+x*.88,y:50+z*.88});
const routeLine=roadPoints.map(p=>{const q=mapXY(p[0],p[1]);return q.x+","+q.y;}).join(" ");
function WorldMap(){
  return <svg className="v2-world-map" viewBox="0 0 100 100" role="img" aria-label="Six cliff islands joined by a road around a lake; P marks parking">
    <rect width="100" height="100" rx="9" fill="#839198"/>
    {districts.map(d=>{const p=mapXY(d.x,d.z);return <circle key={d.id} cx={p.x} cy={p.y} r="12.8" fill="#8b8d89" stroke="#d9d5ce" strokeWidth="1.2"/>;})}
    <polyline points={routeLine} fill="none" stroke="#c9c7c0" strokeWidth="6" strokeLinejoin="round"/>
    <polyline points={routeLine} fill="none" stroke="#34383b" strokeWidth="4.5" strokeLinejoin="round"/>
    {districts.map((d,i)=>{const p=mapXY(d.x,d.z),bay=mapXY(d.park[0],d.park[1]);return <g key={d.id}>
      <circle cx={p.x} cy={p.y} r="2.2" fill="#202226"/><text x={p.x} y={p.y+.8} fontSize="2.3" textAnchor="middle" fill="white" fontWeight="bold">{i+1}</text>
      <circle cx={bay.x} cy={bay.y} r="1.7" fill="#8fa99a"/><text x={bay.x} y={bay.y+.55} fontSize="1.5" textAnchor="middle" fill="#151c19" fontWeight="bold">P</text>
    </g>;})}
  </svg>;
}
function MiniMap({status}:{status:SceneStatus}){
  const bike=mapXY(status.x,status.z);
  return <svg className="v2-minimap" viewBox="0 0 100 100" role="img" aria-label="Map showing your position and six districts">
    <rect width="100" height="100" rx="15" fill="#839198"/>
    {districts.map(d=>{const p=mapXY(d.x,d.z);return <circle key={d.id} cx={p.x} cy={p.y} r="12.4" fill="#a2a39f"/>;})}
    <polyline points={routeLine} fill="none" stroke="#34383b" strokeWidth="5"/>
    {districts.map((d,i)=>{const p=mapXY(d.x,d.z);return <g key={d.id}><circle cx={p.x} cy={p.y} r="3.1" fill="#202226"/><text x={p.x} y={p.y+1.3} fontSize="3.5" textAnchor="middle" fill="white" fontWeight="bold">{i+1}</text></g>;})}
    <circle cx={bike.x} cy={bike.y} r="3.2" fill="#e6e9ef" stroke="#161616" strokeWidth="1.5"/>
  </svg>;
}

export default function PortfolioGame(){
  const controls=useRef(new InputController()), input=useRef(controls.current.input), ride=useRef<RideHandle|null>(null), dialog=useRef<HTMLDivElement>(null), opener=useRef<HTMLElement|null>(null);
  const [panel,setPanel]=useState<Panel>(null),[intro,setIntro]=useState(true),[status,setStatus]=useState<SceneStatus>(blankStatus);
  const [quality,setQuality]=useState<"Auto"|"Low"|"High">("Auto"),[audio,setAudio]=useState(false),[volume,setVolume]=useState(.45),[ready,setReady]=useState(false),[webgl,setWebgl]=useState(true),[hidden,setHidden]=useState(false);
  const audioCtx=useRef<AudioContext|null>(null), oscillator=useRef<OscillatorNode|null>(null), gain=useRef<GainNode|null>(null), roll=useRef<OscillatorNode|null>(null), rollGain=useRef<GainNode|null>(null),wind=useRef<AudioBufferSourceNode|null>(null),windGain=useRef<GainNode|null>(null);
  const clearInputs=useCallback(()=>controls.current.clear(),[]);
  const close=useCallback(()=>{setPanel(null);clearInputs();opener.current?.focus();},[clearInputs]);
  const open=useCallback((next:Panel)=>{opener.current=document.activeElement as HTMLElement;clearInputs();setIntro(false);setPanel(next);},[clearInputs]);
  const travel=useCallback((id:DistrictId)=>{ride.current?.reset(id);close();},[close]);
  const cue=useCallback((frequency:number)=>{
    const ctx=audioCtx.current;if(!ctx||!audio)return;
    const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.setValueAtTime(frequency,ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(frequency*1.35,ctx.currentTime+.14);
    g.gain.setValueAtTime(0,ctx.currentTime);g.gain.linearRampToValueAtTime(.05*volume,ctx.currentTime+.02);
    g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.22);o.connect(g).connect(ctx.destination);o.start();o.stop(ctx.currentTime+.23);
  },[audio,volume]);
  const tryPark=useCallback((id:DistrictId|null)=>{
    if(!id||!ride.current?.park(id))return;
    cue(520);open(id);
  },[cue,open]);
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
      if((e.key.toLowerCase()==="e"||e.key==="Enter")&&status.bay){e.preventDefault();tryPark(status.bay);}
    };
    const up=(e:KeyboardEvent)=>{if(controls.current.releaseKey(e.key)&&!panel&&!intro)e.preventDefault();};
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    return()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);};
  },[panel,intro,webgl,status.bay,close,open,tryPark]);
  useEffect(()=>{if(panel){dialog.current?.focus();clearInputs();}},[panel,clearInputs]);
  useEffect(()=>{const saved=Number(localStorage.getItem("portfolio-v2-volume"));if(Number.isFinite(saved)&&saved>=0&&saved<=1)setVolume(saved);},[]);
  const toggleAudio=()=>{
    if(typeof AudioContext==="undefined")return;
    if(!audioCtx.current){
      const ctx=new AudioContext(),engine=ctx.createOscillator(),g=ctx.createGain(),tire=ctx.createOscillator(),tg=ctx.createGain();
      const noise=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),samples=noise.getChannelData(0);
      let seed=17;for(let i=0;i<samples.length;i++){seed=(seed*1664525+1013904223)>>>0;samples[i]=(seed/4294967295)*2-1;}
      const breeze=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),wg=ctx.createGain();
      breeze.buffer=noise;breeze.loop=true;filter.type="lowpass";filter.frequency.value=350;wg.gain.value=0;
      engine.type="triangle";tire.type="sine";g.gain.value=0;tg.gain.value=0;
      engine.connect(g).connect(ctx.destination);tire.connect(tg).connect(ctx.destination);breeze.connect(filter).connect(wg).connect(ctx.destination);
      engine.start();tire.start();breeze.start();
      audioCtx.current=ctx;oscillator.current=engine;gain.current=g;roll.current=tire;rollGain.current=tg;wind.current=breeze;windGain.current=wg;
    }
    audioCtx.current?.resume().catch(()=>{});
    setAudio(v=>!v);
  };
  useEffect(()=>{
    const ctx=audioCtx.current;if(!ctx||!oscillator.current||!gain.current||!roll.current||!rollGain.current)return;
    const moving=Math.abs(status.speed),active=audio&&!panel&&!hidden&&!intro;
    oscillator.current.frequency.setTargetAtTime(55+moving*8+(input.current.forward?24:0),ctx.currentTime,.11);
    roll.current.frequency.setTargetAtTime(85+moving*15,ctx.currentTime,.15);
    gain.current.gain.setTargetAtTime(active?(.008+Math.min(moving/12,1)*.022)*volume:0,ctx.currentTime,.12);
    rollGain.current.gain.setTargetAtTime(active?(Math.min(moving/12,1)*.008+(input.current.brake&&moving>1?.004:0))*volume:0,ctx.currentTime,.12);
    windGain.current?.gain.setTargetAtTime(active?(.002+Math.min(moving/12,1)*.004)*volume:0,ctx.currentTime,.2);
    if(hidden)ctx.suspend().catch(()=>{});else if(audio)ctx.resume().catch(()=>{});
  },[status.speed,audio,volume,panel,hidden,intro,input]);
  useEffect(()=>()=>{oscillator.current?.stop();roll.current?.stop();wind.current?.stop();audioCtx.current?.close();},[]);
  const setPointer=(e:React.PointerEvent<HTMLButtonElement>,action:keyof DriveInput,pressed:boolean)=>{
    if(pressed){e.currentTarget.setPointerCapture(e.pointerId);controls.current.pressPointer(e.pointerId,action);}
    else controls.current.releasePointer(e.pointerId);
  };
  const district=status.near?districts.find(d=>d.id===status.near):null;
  const paused=!!panel||intro||hidden||!webgl;
  return <main className="v2-app" aria-label="Playable portfolio">
    <header className="v2-topbar"><a className="v2-skip" href="/">Skip game · View classic portfolio</a><span className="v2-brand">B.T. <span>/ world 02</span></span><nav aria-label="Game controls"><button onClick={()=>{cue(390);open("map");}}>Map</button><button onClick={()=>{cue(390);open("help");}}>Help</button></nav></header>
    {webgl?<SceneGuard onError={onError}><WorldScene input={input} ride={ride} paused={paused} overview={intro} quality={quality} onStatus={onStatus} onReady={onReady} onError={onError}/></SceneGuard>:<div className="v2-fallback"><h1>Explore Bijay’s portfolio</h1><p>3D is unavailable in this browser. Every destination remains available below.</p><button onClick={()=>open("map")}>Browse all destinations</button></div>}
    {!ready&&webgl&&<div className="v2-loading" aria-live="polite"><span className="v2-spinner"/><p>Building the world…</p></div>}
    {intro&&<section className="v2-intro" aria-label="Welcome"><span className="v2-eyebrow">AN INTERACTIVE PORTFOLIO</span><h1>Take the long way<br/><em>through the work.</em></h1><p>Six destinations. One small world. Ride the motorcycle or explore every place from the map.</p><div className="v2-intro-actions"><button className="v2-primary" onClick={()=>{setIntro(false);clearInputs();}}>Start riding</button><button onClick={()=>open("map")}>Browse without driving</button></div><p className="v2-intro-hint">WASD / arrows to ride · M for map · touch controls on phone</p></section>}
    {!intro&&webgl&&<><div className="v2-hud" aria-live="polite"><div><span className="v2-eyebrow">NOW RIDING</span><strong>{district?.name??"Open road"}</strong><small>{district?.caption??"Explore the islands"} · {Math.round(Math.abs(status.speed)*3.6)} km/h {quality==="High"?`· ${status.fps} FPS`:""}</small></div><MiniMap status={status}/><button onClick={()=>ride.current?.reset()}>↺ Respawn</button></div>{district&&!panel&&<button className="v2-interact" disabled={!status.bay||Math.abs(status.speed)>PARK_SPEED} onClick={()=>tryPark(status.bay)}>{status.bay?(Math.abs(status.speed)>PARK_SPEED?"Slow down to park":"Park at "+district.name):"PARK bay ahead"} <span>{status.bay&&Math.abs(status.speed)<=PARK_SPEED?"E / Enter":""}</span></button>}
      <div className="v2-settings"><button onClick={toggleAudio} aria-pressed={audio}>{audio?"Sound on":"Sound off"}</button><label className="v2-volume">Volume <input aria-label="Sound volume" type="range" min="0" max="1" step=".05" value={volume} onChange={e=>{const value=Number(e.target.value);setVolume(value);localStorage.setItem("portfolio-v2-volume",String(value));}}/></label><label>Quality <select value={quality} onChange={e=>setQuality(e.target.value as typeof quality)}><option>Auto</option><option>Low</option><option>High</option></select></label></div>
      {!panel&&<div className="v2-touch" aria-label="Touch driving controls"><div className="v2-touch-steer">{[["left","◀"],["right","▶"]].map(([action,label])=><button key={action} aria-label={`Steer ${action}`} onPointerDown={e=>setPointer(e,action as keyof DriveInput,true)} onPointerUp={e=>setPointer(e,action as keyof DriveInput,false)} onPointerCancel={e=>setPointer(e,action as keyof DriveInput,false)} onLostPointerCapture={e=>setPointer(e,action as keyof DriveInput,false)}>{label}</button>)}</div><div className="v2-touch-drive">{[["reverse","REV"],["brake","BRAKE"],["forward","GO"]].map(([action,label])=><button key={action} aria-label={action} onPointerDown={e=>setPointer(e,action as keyof DriveInput,true)} onPointerUp={e=>setPointer(e,action as keyof DriveInput,false)} onPointerCancel={e=>setPointer(e,action as keyof DriveInput,false)} onLostPointerCapture={e=>setPointer(e,action as keyof DriveInput,false)}>{label}</button>)}</div></div>}
    </>}
    {panel&&<div className="v2-overlay" onPointerDown={e=>{if(e.target===e.currentTarget)close();}}><div className="v2-panel" role="dialog" aria-modal="true" aria-label={panel==="map"?"World map":panel==="help"?"Help":districts.find(d=>d.id===panel)?.name} tabIndex={-1} ref={dialog} onKeyDown={e=>{if(e.key==="Tab"){const focusable=Array.from(e.currentTarget.querySelectorAll<HTMLElement>("button,a,select,[tabindex]:not([tabindex='-1'])"));if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===dialog.current)){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}}>
      <div className="v2-panel-head"><div><span className="v2-eyebrow">{panel==="map"?"WAYFINDING":panel==="help"?"FIELD GUIDE":"DESTINATION"}</span><h2>{panel==="map"?"World map":panel==="help"?"How to explore":districts.find(d=>d.id===panel)?.name}</h2></div><button onClick={close} aria-label="Close panel">✕</button></div>
      <div className="v2-panel-body">{panel==="map"?<MapPanel openContent={open} travel={travel}/>:panel==="help"?<HelpPanel/>:<Content id={panel}/>}</div>
    </div></div>}
  </main>;
}
