# Portfolio V2 redesign review

The redesigned world is on the local `v2` branch at `/v2`. The classic portfolio and its content source remain at `/` and `data/portfolio.ts`. Nothing has been pushed, merged, or deployed.

## Preview

```powershell
npm ci
npm run build
npm run start -- -p 3002
```

Open http://localhost:3002/v2 on this computer. The permanent Skip link opens the classic portfolio. A private remote preview has not been created; the local build has not been deployed.

## What changed

- Six separate cliff islands surround a lake in the reference arrangement: Project, Experience, Contacts above; About, Education, Resume below. Smooth asphalt, six supported arched bridges, parking terraces on the islands, pine groves, mountain silhouettes and waterfalls replace the old pale circular board.
- Each Blender landmark has a distinct silhouette and a large numbered dark sign with its exact subtitle. The intro uses an aerial view; riding uses a closer chase view. The map shows the route, destinations and parking markers.
- The bike can park only inside a painted bay while moving below the parking threshold. Passing near a city does not open content. Browse opens a panel directly; fast travel places the bike on an approach road. Closing a parked panel leaves the bike stopped at its checkpoint.
- The fixed 60 Hz simulation has a continuous route boundary, cliff/landmark/tree collision, coast, brake, reverse, speed sensitive steering and checkpoint recovery. Keyboard and touch inputs retain independent holds and clear on release, cancel, blur, and hidden tab.
- Optional procedural audio has engine, rolling/braking feedback, a quiet wind bed, parking and menu cues. It starts from a user gesture, starts muted on every visit, has a stored volume setting and fades while hidden or in panels. No audio files or third party sound assets are used.

## Verification on October 12, 2026

- `npm run build` and `npm run test:v2` passed. Eight focused tests cover route continuity, a complete simulated lap, all six reachable parking turnouts, parking eligibility, driving response, collision, respawn and independent input release.
- Headless Chromium with software WebGL loaded the production `/v2` page at 1440×900, 390×844 and 844×390. Review captures are in [review](./review/): desktop intro, chase, moving, map and content; phone portrait intro and chase; phone landscape chase.
- A browser keyboard press accelerated the bike to 25 km/h; two simultaneous emulated touch holds accelerated it to 31 km/h. Map Browse opened each of the six correct panels. The classic `/` route returned HTTP 200, and the Skip link points to it. The headless browser reported WebGL available and the loading overlay dismissed.
- The nine Blender GLBs total 1,329,120 bytes and contain no external textures. See [asset ledger](./assets.md).

The supplied images are concept art. The runtime renders original geometry rather than an image backdrop. The separate `image.png` described in the attached plan as a before screenshot was not supplied, so there is no pixel accurate before comparison.

## Remaining review

The simulated route and browser checks do not replace a person riding a complete lap and parking at every bay on a laptop and phone. Real device frame rate, true multi touch feel, audio balance, sign readability at distance, WebGL fallback and link destinations still need a device review. The design is intentionally stylized and simpler than the reference renders, especially in cliff detail, bridges and foliage.
