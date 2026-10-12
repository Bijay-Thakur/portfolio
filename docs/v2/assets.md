# V2 asset and sound ledger

The motorcycle, six landmarks, pine and roadside props are original Blender 5.2 models authored with [make_assets.py](../../assets/v2/blender/make_assets.py). The editable source is [portfolio_v2_assets.blend](../../assets/v2/blender/portfolio_v2_assets.blend). The source images provided by Bijay guided the layout and palette; they are not bundled at runtime. No external textures or models were used. Cliffs, road, bridge spans, water, mountains, signs and parking terraces are original procedural meshes in the scene code.

| GLB | Purpose | Bytes | Triangles | Textures |
| --- | --- | ---: | ---: | ---: |
| `motorcycle.glb` | Dark bike, rider, wheels, frame and details | 230,808 | 2,812 | 0 |
| `projects.glb` | Glazed code pavilion | 258,220 | 5,457 | 0 |
| `experience.glb` | Tiered offices and career markers | 134,536 | 2,136 | 0 |
| `contacts.glb` | Trussed signal and dish tower | 245,936 | 4,068 | 0 |
| `about.glb` | Cottage with pitched solid roof | 137,896 | 2,264 | 0 |
| `education.glb` | Clock turret and domed campus | 151,764 | 2,692 | 0 |
| `resume.glb` | Stacked page and archive tower | 137,936 | 2,436 | 0 |
| `props.glb` | Pine, bench and lamp kit | 20,768 | 204 | 0 |
| `tree.glb` | Repeated evergreen | 11,256 | 132 | 0 |
| **Total** | | **1,329,120** | **22,201** | **0** |

Triangle counts were read from each GLB's mesh index accessors. Runtime mesh count is higher because pine models are instanced throughout the scene. The procedural world meshes are additional and are tuned separately by the Low quality setting.

Sound is synthesized with Web Audio in [PortfolioGame.tsx](../../components/v2/PortfolioGame.tsx): oscillators for engine and tire tone, deterministic filtered noise for wind, and short oscillators for cues. There are no audio files or third party sound licenses.

The existing Cormorant Garamond and Nunito fonts are served from local WOFF2 files in `app/fonts/`. Both are under the [SIL Open Font License](https://openfontlicense.org/). Font families and V1 typography remain the same.
