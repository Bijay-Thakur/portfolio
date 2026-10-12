"""Original monochrome portfolio assets. Run in Blender 5.x via MCP."""
import bpy, math, os
from mathutils import Vector

ROOT = r"D:\Projects\Portfolio\portfolio"
OUT = os.path.join(ROOT, "public", "v2", "models")
os.makedirs(OUT, exist_ok=True)
scene = bpy.data.scenes.new("Portfolio V2 Assets")
bpy.context.window.scene = scene
for old in list(bpy.data.scenes):
    if old != scene and old.name.startswith("Portfolio V2 Assets"):
        bpy.data.scenes.remove(old)
for datablocks in (bpy.data.collections, bpy.data.objects, bpy.data.meshes, bpy.data.curves, bpy.data.materials):
    for old in list(datablocks):
        if old.users == 0:
            datablocks.remove(old)

def mat(name, hex_color, metallic=0, roughness=.7):
    rgb = tuple(int(hex_color[i:i+2], 16)/255 for i in (0, 2, 4))
    m = bpy.data.materials.new(name); m.diffuse_color = (*rgb, 1); m.use_nodes = True
    bsdf = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    bsdf.inputs['Base Color'].default_value = (*rgb, 1)
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    return m

chalk=mat('porcelain chalk','F7F8FA'); pearl=mat('warm white','E6E8ED')
stone=mat('light stone','C9CDD4'); steel=mat('satin graphite','565B64',.65,.35)
ink=mat('deep ink','24272D',.28,.45); tire=mat('rubber','303238')
silver=mat('brushed metal','B4BAC3',.8,.29); glass=mat('frosted glass','D8DDE5',.18,.22)

def part(obj, name, material, group):
    obj.name = name; obj.data.materials.append(material)
    for c in list(obj.users_collection): c.objects.unlink(obj)
    group.objects.link(obj)
    return obj

def cube(g,n,loc,scale,m,bevel=.06):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o=part(bpy.context.object,n,m,g); o.dimensions=scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod=o.modifiers.new('crafted edges','BEVEL'); mod.width=bevel; mod.segments=2
        o.modifiers.new('weighted normals','WEIGHTED_NORMAL')
    return o

def cyl(g,n,loc,r,depth,m,vertices=16,rot=(0,0,0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=r, depth=depth, location=loc, rotation=rot)
    return part(bpy.context.object,n,m,g)

def torus(g,n,loc,major,minor,m,rot=(0,0,0)):
    bpy.ops.mesh.primitive_torus_add(major_segments=24, minor_segments=8, location=loc, rotation=rot,
        major_radius=major, minor_radius=minor)
    return part(bpy.context.object,n,m,g)

def beam(g,n,a,b,width,m):
    mid=(Vector(a)+Vector(b))/2; direction=Vector(b)-Vector(a)
    o=cube(g,n,mid,(width,width,direction.length),m,width*.18)
    o.rotation_euler=direction.to_track_quat('Z','Y').to_euler()
    return o

def label(g,n,text,loc,size,m,rotation=(math.pi/2,0,0)):
    bpy.ops.object.text_add(location=loc,rotation=rotation)
    o=bpy.context.object; o.data.body=text; o.data.size=size; o.data.extrude=.006
    bpy.ops.object.convert(target='MESH'); return part(bpy.context.object,n,m,g)

def collection(name): return bpy.data.collections.new(name)
def finish(g,name):
    scene.collection.children.link(g)
    bpy.ops.object.select_all(action='DESELECT')
    for o in g.objects: o.select_set(True)
    bpy.context.view_layer.objects.active=next(iter(g.objects))
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,name+'.glb'), export_format='GLB', use_selection=True,
        export_apply=False, export_materials='EXPORT', export_cameras=False, export_lights=False)
    print(name, len(g.objects), os.path.getsize(os.path.join(OUT,name+'.glb')))

# Motorcycle: independent wheel meshes, tank, frame, forks, saddle, controls, rider silhouette.
g=collection('Motorcycle')
for n,y in [('FrontWheel',-.88),('RearWheel',.79)]:
    torus(g,n,(0,y,.43),.39,.1,tire,(0,math.pi/2,0))
    cyl(g,n+'Hub',(0,y,.43),.14,.2,silver,24,(0,math.pi/2,0))
    for k in range(8):
        a=k*math.tau/8
        beam(g,n+'Spoke'+str(k),(0,y,.43),(0,y+math.sin(a)*.28,.43+math.cos(a)*.28),.025,silver)
    rig=bpy.data.objects.new(n+'Rig',None); g.objects.link(rig); rig.location=(0,y,.43)
    for o in list(g.objects):
        if o != rig and o.name.startswith(n):
            o.location -= Vector((0,y,.43)); o.parent=rig
beam(g,'UpperFrame',(0,-.52,.78),(0,.47,.78),.09,steel)
beam(g,'LowerFrameA',(0,-.52,.72),(0,.16,.48),.08,steel)
beam(g,'LowerFrameB',(0,.16,.48),(0,.62,.72),.08,steel)
for x in [-.18,.18]:
    beam(g,'Fork',(x,-.88,.45),(x,-.72,1.13),.055,silver)
    beam(g,'RearSpring',(x,.7,.48),(x,.48,.82),.06,silver)
cube(g,'SculptedTank',(0,-.26,1.04),(.62,.8,.38),chalk,.16)
cube(g,'TankInlay',(0,-.27,1.236),(.36,.42,.018),steel,.08)
cube(g,'Saddle',(0,.53,1.02),(.55,.7,.12),ink,.06)
cube(g,'SaddleStitch',(0,.54,1.086),(.4,.51,.009),silver,.04)
cube(g,'Engine',(0,.12,.65),(.43,.46,.39),steel,.09)
for i in range(4): cube(g,'EngineFin'+str(i),(0,.13,.51+i*.085),(.49,.49,.015),silver,.003)
beam(g,'Handlebar',(-.45,-.89,1.27),(.45,-.89,1.27),.045,ink)
beam(g,'HandleStem',(0,-.77,1.02),(0,-.89,1.27),.065,steel)
cyl(g,'Headlamp',(0,-1.01,1.0),.18,.08,glass,24,(math.pi/2,0,0))
cube(g,'RearLight',(0,1.0,.8),(.25,.07,.1),pearl,.03)
cube(g,'FrontFender',(0,-.88,.87),(.36,.69,.06),chalk,.06)
cube(g,'RearFender',(0,.8,.87),(.36,.63,.06),chalk,.06)
for x in [-.36,.36]:
    cyl(g,'Mirror',(x,-.88,1.42),.11,.025,glass,16,(math.pi/2,0,0))
    beam(g,'MirrorStem',(x*.82,-.88,1.27),(x,-.88,1.42),.025,steel)
# Rider torso, helmet, arms and legs: purposely stylized silhouette.
cube(g,'RiderTorso',(0,.40,1.54),(.48,.29,.63),ink,.13)
bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=8, radius=.24, location=(0,.30,2.07))
part(bpy.context.object,'Helmet',chalk,g)
cube(g,'Visor',(0,.115,2.06),(.33,.07,.13),steel,.045)
for x in [-.23,.23]:
    beam(g,'RiderArm',(x,.30,1.73),(x*.95,-.78,1.27),.095,ink)
    beam(g,'RiderLeg',(x,.5,1.35),(x*.9,.33,.79),.13,steel)
finish(g,'motorcycle')

# Shared crafted plinths and individual landmarks. Each has a unique silhouette.
def plinth(g,name,extent=5.2):
    cyl(g,name+' foundation',(0,0,.12),extent/2,.24,pearl,32)
    torus(g,name+' curb',(0,0,.15),extent/2-.15,.07,stone)

g=collection('Project City'); plinth(g,'Project',6)
for x,t in [(-1.7,'01'),(-.55,'02'),(.55,'03'),(1.7,'04')]:
    cube(g,'Gallery pod '+t,(x,0,1.17),(.93,1.9,1.9),chalk,.16)
    cube(g,'Gallery recess '+t,(x,-.99,1.23),(.68,.06,1.38),steel,.045)
    cube(g,'Exhibit '+t,(x,-1.04,1.17),(.44,.03,.55),glass,.035)
    label(g,'Pod numeral '+t,t,(x-.19,-1.09,1.45),.34,ink)
beam(g,'Arched roof left',(-2.3,0,2.1),(0,0,2.86),.16,silver)
beam(g,'Arched roof right',(0,0,2.86),(2.3,0,2.1),.16,silver)
cube(g,'Project lintel',(0,.88,2.36),(5.0,.22,.22),stone,.06)
label(g,'PROJECTS','PROJECTS',(-1.15,-1.25,2.43),.42,ink)
for x in [-2.25,2.25]:
    beam(g,'Gallery spire',(x,.7,2.2),(x,.7,4.8 if x<0 else 3.9),.15,steel)
beam(g,'Glass atrium ridge',(-1.1,-.2,2.5),(0,.5,4.15),.095,silver)
beam(g,'Glass atrium ridge',(0,.5,4.15),(1.1,-.2,2.5),.095,silver)
beam(g,'Glass atrium eave',(-1.1,-.2,2.5),(1.1,-.2,2.5),.075,silver)
cube(g,'Code facade',(-2.15,-.4,2.36),(.48,.08,.55),ink,.035)
label(g,'Code mark','</>',(-2.36,-.47,2.3),.21,chalk)
finish(g,'projects')

g=collection('Experience City'); plinth(g,'Experience',5.7)
for i,(x,h) in enumerate([(-1.7,1.15),(-.85,1.7),(0,2.25),(.85,2.8),(1.7,3.35)]):
    cube(g,'Career milestone '+str(i),(x,.45,h/2+.24),(.54,.66,h),[stone,pearl,glass,silver,chalk][i],.09)
    cube(g,'Milestone plaque '+str(i),(x,.08,.6),(.42,.035,.34),ink,.025)
    beam(g,'Timeline rail '+str(i),(x,.03,.36),(x,.03,h+.22),.027,steel)
beam(g,'Career arc',(-1.8,-.55,1.15),(1.8,-.55,3.38),.07,silver)
for x,h in [(-1.48,4.1),(.4,4.75),(1.35,4.25)]:
    cube(g,'Office tower',(x,1.23,h/2+.15),(.58,.65,h),chalk,.08)
    for row in range(4):
        cube(g,'Office window',(x,.87,.8+row*.65),(.36,.025,.29),steel,.008)
label(g,'EXPERIENCE','EXPERIENCE',(-1.4,-1.05,.32),.34,ink)
finish(g,'experience')

g=collection('Contacts City'); plinth(g,'Contacts',5.3)
cyl(g,'Tower tapered base',(0,.5,1.15),.72,1.9,chalk,12)
for i,r in enumerate([.6,.43,.28]):
    cyl(g,'Signal tier '+str(i),(0,.5,2.2+i*.55),r,.15,steel,16)
    torus(g,'Signal halo '+str(i),(0,.5,2.22+i*.55),r+.12,.035,silver)
beam(g,'Antenna',(0,.5,2.9),(0,.5,4.6),.1,ink)
for side,z in [(-1,3.15),(1,3.78)]:
    torus(g,'Directional dish',(side*.49,.5,z),.38,.055,chalk,(0,math.pi/2,0))
    beam(g,'Dish support',(0,.5,z-.22),(side*.49,.5,z),.055,steel)
for a in range(3):
    beam(g,'Tower truss',(.45*math.sin(a*math.tau/3),.5+.45*math.cos(a*math.tau/3),.4),(0,.5,4.4),.055,steel)
for s in [-1,1]:
    cube(g,'Post wing',(s*1.18,.65,.9),(1.05,1.4,1.3),pearl,.12)
    cube(g,'Message slot',(s*1.18,-.08,1.02),(.55,.04,.09),steel,.025)
label(g,'CONTACT','CONTACT',(-.99,-1.44,.32),.34,ink)
finish(g,'contacts')

g=collection('About City'); plinth(g,'About',5.8)
cube(g,'Studio floor',(0,.2,.38),(4.4,3.7,.23),chalk,.12)
for x in [-1.8,1.8]:
    for y in [-1.2,1.4]: cyl(g,'Studio column',(x,y,1.45),.13,2.0,silver,12)
cube(g,'Cantilever roof',(0,.2,2.56),(4.8,3.9,.24),pearl,.13)
beam(g,'Home roof left',(-2.24,.2,2.6),(0,.2,3.8),.15,ink)
beam(g,'Home roof right',(0,.2,3.8),(2.24,.2,2.6),.15,ink)
for y in [-1.4,1.7]:
    beam(g,'Home gable',(-2.24,y,2.58),(0,y,3.8),.1,steel)
    beam(g,'Home gable',(0,y,3.8),(2.24,y,2.58),.1,steel)
cube(g,'Studio screen',(0,-1.1,1.32),(2.65,.14,1.25),glass,.08)
for x in [-1.2,-.6,0,.6,1.2]: cyl(g,'Ideas sculpture',(x,-1.43,.8),.11,.35+abs(x)*.14,steel,10)
label(g,'ABOUT','ABOUT',(-.79,-1.4,2.67),.38,ink)
finish(g,'about')

g=collection('Education City'); plinth(g,'Education',5.9)
for x in [-1.48,1.48]:
    cyl(g,'Courtyard pillar',(x,.35,1.3),.2,1.9,chalk,12)
    cyl(g,'Pillar cap',(x,.35,2.32),.3,.16,stone,12)
cube(g,'Library span',(0,.35,2.53),(3.7,.6,.25),stone,.08)
cyl(g,'Observatory drum',(0,.4,2.95),.8,.62,chalk,24)
bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=.83,location=(0,.4,3.24))
o=part(bpy.context.object,'Learning dome',stone,g);o.scale.z=.5
cyl(g,'Clock turret',(-1.65,.35,3.33),.33,1.45,chalk,12)
cyl(g,'Clock face',(-1.65,-.01,3.5),.23,.035,ink,24,(math.pi/2,0,0))
beam(g,'Clock hand',(-1.65,-.04,3.5),(-1.65,-.04,3.63),.018,chalk)
for i in range(5):
    cube(g,'Book slab '+str(i),(-.84+i*.42,-.2,.72+i*.12),(.35,1.1,.82+i*.18),[steel,pearl,silver,chalk,stone][i],.04)
cube(g,'Courtyard bench',(0,1.13,.56),(2.4,.5,.15),ink,.05)
label(g,'EDUCATION','EDUCATION',(-1.35,-1.25,.3),.33,ink)
finish(g,'education')

g=collection('Resume City'); plinth(g,'Resume',5.5)
for i in range(4):
    o=cube(g,'Floating page '+str(i),(-.4+i*.18,.35+i*.08,1.35+i*.2),(2.1,.11,2.55),chalk,.12)
    o.rotation_euler[1]=-.07+i*.045
for i in range(5):
    cube(g,'Document line '+str(i),(-.15,-.04,2.22-i*.32),(1.35-i*.13,.025,.045),steel,.015)
torus(g,'Resume portal',(0,.4,1.35),2.08,.09,silver,(math.pi/2,0,0))
cube(g,'Archive tower',(1.28,1.05,2.25),(1.25,1.1,3.9),pearl,.11)
cube(g,'Archive inset',(1.28,.46,2.65),(.74,.06,1.14),ink,.06)
label(g,'Archive glyph','[ ]',(.99,.41,2.51),.3,chalk)
cyl(g,'Archive beacon',(1.28,1.05,4.34),.23,.38,steel,12)
label(g,'RESUME','RESUME',(-.94,-1.26,.32),.36,ink)
finish(g,'resume')

# Reusable trees and roadside furniture, all original source geometry.
g=collection('Street Props')
cyl(g,'Tree trunk',(0,0,.72),.12,1.25,steel,10)
for i,(r,z) in enumerate([(.74,1.32),(.62,1.77),(.42,2.17)]):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1,radius=r,location=(0,0,z))
    part(bpy.context.object,'Faceted canopy '+str(i),[pearl,stone,chalk][i],g)
cube(g,'Bench seat',(4,0,.52),(1.35,.48,.13),chalk,.05)
for x in [3.54,4.46]: cube(g,'Bench leg',(x,0,.3),(.1,.39,.42),steel,.025)
beam(g,'Lamp mast',(8,0,.12),(8,0,2.72),.09,steel)
beam(g,'Lamp arm',(8,0,2.72),(8,.56,2.72),.07,steel)
cube(g,'Lamp shade',(8,.64,2.67),(.35,.35,.12),chalk,.05)
finish(g,'props')

g=collection('Single Tree')
cyl(g,'Tree trunk',(0,0,.72),.12,1.25,steel,10)
for i,(r,z) in enumerate([(.74,1.32),(.62,1.77),(.42,2.17)]):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1,radius=r,location=(0,0,z))
    part(bpy.context.object,'Faceted canopy '+str(i),[pearl,stone,chalk][i],g)
finish(g,'tree')

# Arrange the editable source as an asset gallery after all origin-centered GLBs export.
for i,g in enumerate(scene.collection.children):
    offset=Vector((((i%3)-1)*9, (i//3)*9, 0))
    for o in g.objects:
        if o.parent is None: o.location += offset

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,'assets','v2','blender','portfolio_v2_assets.blend'))
print('Saved authored source')
