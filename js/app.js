var nm=Object.create;var Yh=Object.defineProperty;var im=Object.getOwnPropertyDescriptor;var sm=Object.getOwnPropertyNames;var rm=Object.getPrototypeOf,om=Object.prototype.hasOwnProperty;var ps=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var am=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of sm(e))!om.call(i,s)&&s!==t&&Yh(i,s,{get:()=>e[s],enumerable:!(n=im(e,s))||n.enumerable});return i};var cm=(i,e,t)=>(t=i!=null?nm(rm(i)):{},am(e||!i||!i.__esModule?Yh(t,"default",{value:i,enumerable:!0}):t,i));var Ou=ps(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.loop=Ni.conditional=Ni.parse=void 0;var Zy=function i(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:n;if(Array.isArray(t))t.forEach(function(o){return i(e,o,n,s)});else if(typeof t=="function")t(e,n,s,i);else{var r=Object.keys(t)[0];Array.isArray(t[r])?(s[r]={},i(e,t[r],n,s[r])):s[r]=t[r](e,n,s,i)}return n};Ni.parse=Zy;var $y=function(e,t){return function(n,s,r,o){t(n,s,r)&&o(n,e,s,r)}};Ni.conditional=$y;var Ky=function(e,t){return function(n,s,r,o){for(var a=[],c=n.pos;t(n,s,r);){var l={};if(o(n,e,s,l),n.pos===c)break;c=n.pos,a.push(l)}return a}};Ni.loop=Ky});var Bu=ps(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});Pt.readBits=Pt.readArray=Pt.readUnsigned=Pt.readString=Pt.peekBytes=Pt.readBytes=Pt.peekByte=Pt.readByte=Pt.buildStream=void 0;var jy=function(e){return{data:e,pos:0}};Pt.buildStream=jy;var ap=function(){return function(e){return e.data[e.pos++]}};Pt.readByte=ap;var Jy=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return function(t){return t.data[t.pos+e]}};Pt.peekByte=Jy;var Za=function(e){return function(t){return t.data.subarray(t.pos,t.pos+=e)}};Pt.readBytes=Za;var Qy=function(e){return function(t){return t.data.subarray(t.pos,t.pos+e)}};Pt.peekBytes=Qy;var eM=function(e){return function(t){return Array.from(Za(e)(t)).map(function(n){return String.fromCharCode(n)}).join("")}};Pt.readString=eM;var tM=function(e){return function(t){var n=Za(2)(t);return e?(n[1]<<8)+n[0]:(n[0]<<8)+n[1]}};Pt.readUnsigned=tM;var nM=function(e,t){return function(n,s,r){for(var o=typeof t=="function"?t(n,s,r):t,a=Za(e),c=new Array(o),l=0;l<o;l++)c[l]=a(n);return c}};Pt.readArray=nM;var iM=function(e,t,n){for(var s=0,r=0;r<n;r++)s+=e[t+r]&&Math.pow(2,n-r-1);return s},sM=function(e){return function(t){for(var n=ap()(t),s=new Array(8),r=0;r<8;r++)s[7-r]=!!(n&1<<r);return Object.keys(e).reduce(function(o,a){var c=e[a];return c.length?o[a]=iM(s,c.index,c.length):o[a]=s[c.index],o},{})}};Pt.readBits=sM});var cp=ps(Ka=>{"use strict";Object.defineProperty(Ka,"__esModule",{value:!0});Ka.default=void 0;var Fi=Ou(),Ke=Bu(),$a={blocks:function(e){for(var t=0,n=[],s=e.data.length,r=0,o=(0,Ke.readByte)()(e);o!==t&&o;o=(0,Ke.readByte)()(e)){if(e.pos+o>=s){var a=s-e.pos;n.push((0,Ke.readBytes)(a)(e)),r+=a;break}n.push((0,Ke.readBytes)(o)(e)),r+=o}for(var c=new Uint8Array(r),l=0,u=0;u<n.length;u++)c.set(n[u],l),l+=n[u].length;return c}},rM=(0,Fi.conditional)({gce:[{codes:(0,Ke.readBytes)(2)},{byteSize:(0,Ke.readByte)()},{extras:(0,Ke.readBits)({future:{index:0,length:3},disposal:{index:3,length:3},userInput:{index:6},transparentColorGiven:{index:7}})},{delay:(0,Ke.readUnsigned)(!0)},{transparentColorIndex:(0,Ke.readByte)()},{terminator:(0,Ke.readByte)()}]},function(i){var e=(0,Ke.peekBytes)(2)(i);return e[0]===33&&e[1]===249}),oM=(0,Fi.conditional)({image:[{code:(0,Ke.readByte)()},{descriptor:[{left:(0,Ke.readUnsigned)(!0)},{top:(0,Ke.readUnsigned)(!0)},{width:(0,Ke.readUnsigned)(!0)},{height:(0,Ke.readUnsigned)(!0)},{lct:(0,Ke.readBits)({exists:{index:0},interlaced:{index:1},sort:{index:2},future:{index:3,length:2},size:{index:5,length:3}})}]},(0,Fi.conditional)({lct:(0,Ke.readArray)(3,function(i,e,t){return Math.pow(2,t.descriptor.lct.size+1)})},function(i,e,t){return t.descriptor.lct.exists}),{data:[{minCodeSize:(0,Ke.readByte)()},$a]}]},function(i){return(0,Ke.peekByte)()(i)===44}),aM=(0,Fi.conditional)({text:[{codes:(0,Ke.readBytes)(2)},{blockSize:(0,Ke.readByte)()},{preData:function(e,t,n){return(0,Ke.readBytes)(n.text.blockSize)(e)}},$a]},function(i){var e=(0,Ke.peekBytes)(2)(i);return e[0]===33&&e[1]===1}),cM=(0,Fi.conditional)({application:[{codes:(0,Ke.readBytes)(2)},{blockSize:(0,Ke.readByte)()},{id:function(e,t,n){return(0,Ke.readString)(n.blockSize)(e)}},$a]},function(i){var e=(0,Ke.peekBytes)(2)(i);return e[0]===33&&e[1]===255}),lM=(0,Fi.conditional)({comment:[{codes:(0,Ke.readBytes)(2)},$a]},function(i){var e=(0,Ke.peekBytes)(2)(i);return e[0]===33&&e[1]===254}),uM=[{header:[{signature:(0,Ke.readString)(3)},{version:(0,Ke.readString)(3)}]},{lsd:[{width:(0,Ke.readUnsigned)(!0)},{height:(0,Ke.readUnsigned)(!0)},{gct:(0,Ke.readBits)({exists:{index:0},resolution:{index:1,length:3},sort:{index:4},size:{index:5,length:3}})},{backgroundColorIndex:(0,Ke.readByte)()},{pixelAspectRatio:(0,Ke.readByte)()}]},(0,Fi.conditional)({gct:(0,Ke.readArray)(3,function(i,e){return Math.pow(2,e.lsd.gct.size+1)})},function(i,e){return e.lsd.gct.exists}),{frames:(0,Fi.loop)([rM,cM,lM,oM,aM],function(i){var e=(0,Ke.peekByte)()(i);return e===33||e===44})}],hM=uM;Ka.default=hM});var lp=ps(ja=>{"use strict";Object.defineProperty(ja,"__esModule",{value:!0});ja.deinterlace=void 0;var dM=function(e,t){for(var n=new Array(e.length),s=e.length/t,r=function(d,f){var g=e.slice(f*t,(f+1)*t);n.splice.apply(n,[d*t,t].concat(g))},o=[0,4,2,1],a=[8,8,4,2],c=0,l=0;l<4;l++)for(var u=o[l];u<s;u+=a[l])r(u,c),c++;return n};ja.deinterlace=dM});var up=ps(Ja=>{"use strict";Object.defineProperty(Ja,"__esModule",{value:!0});Ja.lzw=void 0;var fM=function(e,t,n){var s=4096,r=-1,o=n,a,c,l,u,h,d,f,w,g,x,L,m,P,E,I,M,p=new Array(n),S=new Array(s),y=new Array(s),_=new Array(s+1);for(m=e,c=1<<m,h=c+1,a=c+2,f=r,u=m+1,l=(1<<u)-1,g=0;g<c;g++)S[g]=0,y[g]=g;var L,w,R,P,E,M,I;for(L=w=R=P=E=M=I=0,x=0;x<o;){if(E===0){if(w<u){L+=t[I]<<w,w+=8,I++;continue}if(g=L&l,L>>=u,w-=u,g>a||g==h)break;if(g==c){u=m+1,l=(1<<u)-1,a=c+2,f=r;continue}if(f==r){_[E++]=y[g],f=g,P=g;continue}for(d=g,g==a&&(_[E++]=P,g=f);g>c;)_[E++]=y[g],g=S[g];P=y[g]&255,_[E++]=P,a<s&&(S[a]=f,y[a]=P,a++,!(a&l)&&a<s&&(u++,l+=a)),f=d}E--,p[M++]=_[E],x++}for(x=M;x<o;x++)p[x]=0;return p};Ja.lzw=fM});var dp=ps(Oi=>{"use strict";Object.defineProperty(Oi,"__esModule",{value:!0});Oi.decompressFrames=Oi.decompressFrame=Oi.parseGIF=void 0;var pM=vM(cp()),mM=Ou(),gM=Bu(),xM=lp(),_M=up();function vM(i){return i&&i.__esModule?i:{default:i}}var yM=function(e){var t=new Uint8Array(e);return(0,mM.parse)((0,gM.buildStream)(t),pM.default)};Oi.parseGIF=yM;var MM=function(e){for(var t=e.pixels.length,n=new Uint8ClampedArray(t*4),s=0;s<t;s++){var r=s*4,o=e.pixels[s],a=e.colorTable[o]||[0,0,0];n[r]=a[0],n[r+1]=a[1],n[r+2]=a[2],n[r+3]=o!==e.transparentIndex?255:0}return n},hp=function(e,t,n){if(!e.image){console.warn("gif frame does not have associated image.");return}var s=e.image,r=s.descriptor.width*s.descriptor.height,o=(0,_M.lzw)(s.data.minCodeSize,s.data.blocks,r);s.descriptor.lct.interlaced&&(o=(0,xM.deinterlace)(o,s.descriptor.width));var a={pixels:o,dims:{top:e.image.descriptor.top,left:e.image.descriptor.left,width:e.image.descriptor.width,height:e.image.descriptor.height}};return s.descriptor.lct&&s.descriptor.lct.exists?a.colorTable=s.lct:a.colorTable=t,e.gce&&(a.delay=(e.gce.delay||10)*10,a.disposalType=e.gce.extras.disposal,e.gce.extras.transparentColorGiven&&(a.transparentIndex=e.gce.transparentColorIndex)),n&&(a.patch=MM(a)),a};Oi.decompressFrame=hp;var SM=function(e,t){return e.frames.filter(function(n){return n.image}).map(function(n){return hp(n,e.gct,t)})};Oi.decompressFrames=SM});var fu="170";var lm=0,Zh=1,um=2;var Sf=1,pu=2,Jn=3,On=0,tn=1,$t=2,Fn=0,Os=1,ii=2,$h=3,Kh=4,hm=5,Qi=100,dm=101,fm=102,pm=103,mm=104,gm=200,xm=201,_m=202,vm=203,qc=204,Yc=205,ym=206,Mm=207,Sm=208,bm=209,Em=210,Tm=211,wm=212,Am=213,Rm=214,Zc=0,$c=1,Kc=2,ks=3,jc=4,Jc=5,Qc=6,el=7,bf=0,Cm=1,Im=2,bi=0,mu=1,gu=2,xu=3,io=4,Pm=5,_u=6,vu=7,jh="attached",Lm="detached",Ef=300,Vs=301,Gs=302,Vr=303,tl=304,Oa=306,ln=1e3,ei=1001,Gr=1002,Gt=1003,yu=1004;var Us=1005;var en=1006,Fr=1007;var Nn=1008;var si=1009,Tf=1010,wf=1011,Wr=1012,Mu=1013,ts=1014,Cn=1015,In=1016,Su=1017,bu=1018,Ws=1020,Af=35902,Rf=1021,Cf=1022,gn=1023,If=1024,Pf=1025,Bs=1026,Xs=1027,Eu=1028,Tu=1029,Lf=1030,wu=1031;var Au=1033,ta=33776,na=33777,ia=33778,sa=33779,nl=35840,il=35841,sl=35842,rl=35843,ol=36196,al=37492,cl=37496,ll=37808,ul=37809,hl=37810,dl=37811,fl=37812,pl=37813,ml=37814,gl=37815,xl=37816,_l=37817,vl=37818,yl=37819,Ml=37820,Sl=37821,ra=36492,bl=36494,El=36495,Df=36283,Tl=36284,wl=36285,Al=36286;var qs=2300,Ys=2301,uc=2302,Jh=2400,Qh=2401,ed=2402,Dm=2500;var Uf=0,Ba=1,so=2,Um=3200,Nm=3201;var Nf=0,Fm=1,Un="",mt="srgb",Xt="srgb-linear",za="linear",dt="srgb";var ms=7680;var td=519,Om=512,Bm=513,zm=514,Ff=515,Hm=516,km=517,Vm=518,Gm=519,Rl=35044;var nd="300 es",ti=2e3,oa=2001,Ti=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],id=1234567,Or=Math.PI/180,Zs=180/Math.PI;function xn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function Lt(i,e,t){return Math.max(e,Math.min(t,i))}function Ru(i,e){return(i%e+e)%e}function Wm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Xm(i,e,t){return i!==e?(t-i)/(e-i):0}function Br(i,e,t){return(1-t)*i+t*e}function qm(i,e,t,n){return Br(i,e,1-Math.exp(-t*n))}function Ym(i,e=1){return e-Math.abs(Ru(i,e*2)-e)}function Zm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function $m(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Km(i,e){return i+Math.floor(Math.random()*(e-i+1))}function jm(i,e){return i+Math.random()*(e-i)}function Jm(i){return i*(.5-Math.random())}function Qm(i){i!==void 0&&(id=i);let e=id+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function e0(i){return i*Or}function t0(i){return i*Zs}function n0(i){return(i&i-1)===0&&i!==0}function i0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function s0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function r0(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*h,c*d,a*l);break;case"YZY":i.set(c*d,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*d,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Rn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Of={DEG2RAD:Or,RAD2DEG:Zs,generateUUID:xn,clamp:Lt,euclideanModulo:Ru,mapLinear:Wm,inverseLerp:Xm,lerp:Br,damp:qm,pingpong:Ym,smoothstep:Zm,smootherstep:$m,randInt:Km,randFloat:jm,randFloatSpread:Jm,seededRandom:Qm,degToRad:e0,radToDeg:t0,isPowerOfTwo:n0,ceilPowerOfTwo:i0,floorPowerOfTwo:s0,setQuaternionFromProperEuler:r0,normalize:pt,denormalize:Rn},ee=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ze=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],S=s[1],y=s[4],_=s[7],L=s[2],w=s[5],R=s[8];return r[0]=o*x+a*S+c*L,r[3]=o*m+a*y+c*w,r[6]=o*p+a*_+c*R,r[1]=l*x+u*S+h*L,r[4]=l*m+u*y+h*w,r[7]=l*p+u*_+h*R,r[2]=d*x+f*S+g*L,r[5]=d*m+f*y+g*w,r[8]=d*p+f*_+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,d=a*c-u*r,f=l*r-o*c,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=h*x,e[1]=(s*l-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=d*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(hc.makeScale(e,t)),this}rotate(e){return this.premultiply(hc.makeRotation(-e)),this}translate(e,t){return this.premultiply(hc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},hc=new Ze;function Bf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function o0(){let i=Xr("canvas");return i.style.display="block",i}var sd={};function Ur(i){i in sd||(sd[i]=!0,console.warn(i))}function a0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function c0(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function l0(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var je={enabled:!0,workingColorSpace:Xt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===dt&&(i.r=ni(i.r),i.g=ni(i.g),i.b=ni(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===dt&&(i.r=zs(i.r),i.g=zs(i.g),i.b=zs(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Un?za:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var rd=[.64,.33,.3,.6,.15,.06],od=[.2126,.7152,.0722],ad=[.3127,.329],cd=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ld=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);je.define({[Xt]:{primaries:rd,whitePoint:ad,transfer:za,toXYZ:cd,fromXYZ:ld,luminanceCoefficients:od,workingColorSpaceConfig:{unpackColorSpace:mt},outputColorSpaceConfig:{drawingBufferColorSpace:mt}},[mt]:{primaries:rd,whitePoint:ad,transfer:dt,toXYZ:cd,fromXYZ:ld,luminanceCoefficients:od,outputColorSpaceConfig:{drawingBufferColorSpace:mt}}});var gs,Cl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gs===void 0&&(gs=Xr("canvas")),gs.width=e.width,gs.height=e.height;let n=gs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Xr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ni(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},u0=0,aa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=xn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(dc(s[o].image)):r.push(dc(s[o]))}else r=dc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function dc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Cl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var h0=0,Bt=class i extends Ti{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ei,s=ei,r=en,o=Nn,a=gn,c=si,l=i.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=xn(),this.name="",this.source=new aa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ef)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ln:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case Gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ln:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case Gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=Ef;Bt.DEFAULT_ANISOTROPY=1;var lt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,_=(f+1)/2,L=(p+1)/2,w=(u+d)/4,R=(h+x)/4,P=(g+m)/4;return y>_&&y>L?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=R/n):_>L?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=P/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=R/r,s=P/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-x)/S,this.z=(d-u)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Il=class extends Ti{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Bt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new aa(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kt=class extends Il{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ca=class extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Pl=class extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var un=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(h!==x||c!==d||l!==f||u!==g){let m=1-a,p=c*d+l*f+u*g+h*x,S=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let L=Math.sqrt(y),w=Math.atan2(L,p*S);m=Math.sin(m*w)/L,a=Math.sin(a*w)/L}let _=a*S;if(c=c*m+d*_,l=l*m+f*_,u=u*m+g*_,h=h*m+x*_,m===1-a){let L=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=L,l*=L,u*=L,h*=L}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*f-l*d,e[t+1]=c*g+u*d+l*h-a*f,e[t+2]=l*g+u*f+a*d-c*h,e[t+3]=u*g-a*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ud.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fc.copy(this).projectOnVector(e),this.sub(fc)}reflect(e){return this.sub(fc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},fc=new C,ud=new un,nn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),So.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),So.copy(n.boundingBox)),So.applyMatrix4(e.matrixWorld),this.union(So)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),bo.subVectors(this.max,br),xs.subVectors(e.a,br),_s.subVectors(e.b,br),vs.subVectors(e.c,br),mi.subVectors(_s,xs),gi.subVectors(vs,_s),qi.subVectors(xs,vs);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-qi.z,qi.y,mi.z,0,-mi.x,gi.z,0,-gi.x,qi.z,0,-qi.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-qi.y,qi.x,0];return!pc(t,xs,_s,vs,bo)||(t=[1,0,0,0,1,0,0,0,1],!pc(t,xs,_s,vs,bo))?!1:(Eo.crossVectors(mi,gi),t=[Eo.x,Eo.y,Eo.z],pc(t,xs,_s,vs,bo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},qn=[new C,new C,new C,new C,new C,new C,new C,new C],Tn=new C,So=new nn,xs=new C,_s=new C,vs=new C,mi=new C,gi=new C,qi=new C,br=new C,bo=new C,Eo=new C,Yi=new C;function pc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Yi.fromArray(i,r);let a=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),c=e.dot(Yi),l=t.dot(Yi),u=n.dot(Yi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var d0=new nn,Er=new C,mc=new C,hn=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):d0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Er,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(mc)),this.expandByPoint(Er.copy(e.center).sub(mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Yn=new C,gc=new C,To=new C,xi=new C,xc=new C,wo=new C,_c=new C,ns=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){gc.copy(e).add(t).multiplyScalar(.5),To.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(gc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(To),a=xi.dot(this.direction),c=-xi.dot(To),l=xi.lengthSq(),u=Math.abs(1-o*o),h,d,f,g;if(u>0)if(h=o*c-a,d=o*a-c,g=r*u,h>=0)if(d>=-g)if(d<=g){let x=1/u;h*=x,d*=x,f=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(gc).addScaledVector(To,d),f}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);let n=Yn.dot(this.direction),s=Yn.dot(Yn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,n,s,r){xc.subVectors(t,e),wo.subVectors(n,e),_c.crossVectors(xc,wo);let o=this.direction.dot(_c),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,e);let c=a*this.direction.dot(wo.crossVectors(xi,wo));if(c<0)return null;let l=a*this.direction.dot(xc.cross(xi));if(l<0||c+l>o)return null;let u=-a*xi.dot(_c);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ke=class i{constructor(e,t,n,s,r,o,a,c,l,u,h,d,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,d,f,g,x,m)}set(e,t,n,s,r,o,a,c,l,u,h,d,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ys.setFromMatrixColumn(e,0).length(),r=1/ys.setFromMatrixColumn(e,1).length(),o=1/ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=o*u,f=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=d-x*l,t[9]=-a*c,t[2]=x-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*u,f=c*h,g=l*u,x=l*h;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*u,f=c*h,g=l*u,x=l*h;t[0]=d-x*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=x-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*u,f=o*h,g=a*u,x=a*h;t[0]=c*u,t[4]=g*l-f,t[8]=d*l+x,t[1]=c*h,t[5]=x*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-d*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*h+g,t[10]=d-x*h}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+x,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(f0,e,p0)}lookAt(e,t,n){let s=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),_i.crossVectors(n,an),_i.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),_i.crossVectors(n,an)),_i.normalize(),Ao.crossVectors(an,_i),s[0]=_i.x,s[4]=Ao.x,s[8]=an.x,s[1]=_i.y,s[5]=Ao.y,s[9]=an.y,s[2]=_i.z,s[6]=Ao.z,s[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],S=n[3],y=n[7],_=n[11],L=n[15],w=s[0],R=s[4],P=s[8],E=s[12],M=s[1],I=s[5],U=s[9],B=s[13],k=s[2],$=s[6],V=s[10],se=s[14],X=s[3],le=s[7],fe=s[11],Ee=s[15];return r[0]=o*w+a*M+c*k+l*X,r[4]=o*R+a*I+c*$+l*le,r[8]=o*P+a*U+c*V+l*fe,r[12]=o*E+a*B+c*se+l*Ee,r[1]=u*w+h*M+d*k+f*X,r[5]=u*R+h*I+d*$+f*le,r[9]=u*P+h*U+d*V+f*fe,r[13]=u*E+h*B+d*se+f*Ee,r[2]=g*w+x*M+m*k+p*X,r[6]=g*R+x*I+m*$+p*le,r[10]=g*P+x*U+m*V+p*fe,r[14]=g*E+x*B+m*se+p*Ee,r[3]=S*w+y*M+_*k+L*X,r[7]=S*R+y*I+_*$+L*le,r[11]=S*P+y*U+_*V+L*fe,r[15]=S*E+y*B+_*se+L*Ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*c*h-s*l*h-r*a*d+n*l*d+s*a*f-n*c*f)+x*(+t*c*f-t*l*d+r*o*d-s*o*f+s*l*u-r*c*u)+m*(+t*l*h-t*a*f-r*o*h+n*o*f+r*a*u-n*l*u)+p*(-s*a*u-t*c*h+t*a*d+s*o*h-n*o*d+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],S=h*m*l-x*d*l+x*c*f-a*m*f-h*c*p+a*d*p,y=g*d*l-u*m*l-g*c*f+o*m*f+u*c*p-o*d*p,_=u*x*l-g*h*l+g*a*f-o*x*f-u*a*p+o*h*p,L=g*h*c-u*x*c-g*a*d+o*x*d+u*a*m-o*h*m,w=t*S+n*y+s*_+r*L;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/w;return e[0]=S*R,e[1]=(x*d*r-h*m*r-x*s*f+n*m*f+h*s*p-n*d*p)*R,e[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*R,e[3]=(h*c*r-a*d*r-h*s*l+n*d*l+a*s*f-n*c*f)*R,e[4]=y*R,e[5]=(u*m*r-g*d*r+g*s*f-t*m*f-u*s*p+t*d*p)*R,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*R,e[7]=(o*d*r-u*c*r+u*s*l-t*d*l-o*s*f+t*c*f)*R,e[8]=_*R,e[9]=(g*h*r-u*x*r-g*n*f+t*x*f+u*n*p-t*h*p)*R,e[10]=(o*x*r-g*a*r+g*n*l-t*x*l-o*n*p+t*a*p)*R,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*f-t*a*f)*R,e[12]=L*R,e[13]=(u*x*s-g*h*s+g*n*d-t*x*d-u*n*m+t*h*m)*R,e[14]=(g*a*s-o*x*s-g*n*c+t*x*c+o*n*m-t*a*m)*R,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*d+t*a*d)*R,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,d=r*l,f=r*u,g=r*h,x=o*u,m=o*h,p=a*h,S=c*l,y=c*u,_=c*h,L=n.x,w=n.y,R=n.z;return s[0]=(1-(x+p))*L,s[1]=(f+_)*L,s[2]=(g-y)*L,s[3]=0,s[4]=(f-_)*w,s[5]=(1-(d+p))*w,s[6]=(m+S)*w,s[7]=0,s[8]=(g+y)*R,s[9]=(m-S)*R,s[10]=(1-(d+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ys.set(s[0],s[1],s[2]).length(),o=ys.set(s[4],s[5],s[6]).length(),a=ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],wn.copy(this);let l=1/r,u=1/o,h=1/a;return wn.elements[0]*=l,wn.elements[1]*=l,wn.elements[2]*=l,wn.elements[4]*=u,wn.elements[5]*=u,wn.elements[6]*=u,wn.elements[8]*=h,wn.elements[9]*=h,wn.elements[10]*=h,t.setFromRotationMatrix(wn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ti){let c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s),f,g;if(a===ti)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===oa)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ti){let c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(o-r),d=(t+e)*l,f=(n+s)*u,g,x;if(a===ti)g=(o+r)*h,x=-2*h;else if(a===oa)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ys=new C,wn=new ke,f0=new C(0,0,0),p0=new C(1,1,1),_i=new C,Ao=new C,an=new C,hd=new ke,dd=new un,Bn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dd.setFromEuler(this),this.setFromQuaternion(dd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Bn.DEFAULT_ORDER="XYZ";var qr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},m0=0,fd=new C,Ms=new un,Zn=new ke,Ro=new C,Tr=new C,g0=new C,x0=new un,pd=new C(1,0,0),md=new C(0,1,0),gd=new C(0,0,1),xd={type:"added"},_0={type:"removed"},Ss={type:"childadded",child:null},vc={type:"childremoved",child:null},yt=class i extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new Bn,n=new un,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ke},normalMatrix:{value:new Ze}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(pd,e)}rotateY(e){return this.rotateOnAxis(md,e)}rotateZ(e){return this.rotateOnAxis(gd,e)}translateOnAxis(e,t){return fd.copy(e).applyQuaternion(this.quaternion),this.position.add(fd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pd,e)}translateY(e){return this.translateOnAxis(md,e)}translateZ(e){return this.translateOnAxis(gd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ro.copy(e):Ro.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Tr,Ro,this.up):Zn.lookAt(Ro,Tr,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),Ms.setFromRotationMatrix(Zn),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xd),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_0),vc.child=e,this.dispatchEvent(vc),vc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xd),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,e,g0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,x0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};yt.DEFAULT_UP=new C(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var An=new C,$n=new C,yc=new C,Kn=new C,bs=new C,Es=new C,_d=new C,Mc=new C,Sc=new C,bc=new C,Ec=new lt,Tc=new lt,wc=new lt,Mi=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),An.subVectors(e,t),s.cross(An);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){An.subVectors(s,t),$n.subVectors(n,t),yc.subVectors(e,t);let o=An.dot(An),a=An.dot($n),c=An.dot(yc),l=$n.dot($n),u=$n.dot(yc),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(l*c-a*u)*d,g=(o*u-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Kn.x),c.addScaledVector(o,Kn.y),c.addScaledVector(a,Kn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ec.setScalar(0),Tc.setScalar(0),wc.setScalar(0),Ec.fromBufferAttribute(e,t),Tc.fromBufferAttribute(e,n),wc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ec,r.x),o.addScaledVector(Tc,r.y),o.addScaledVector(wc,r.z),o}static isFrontFacing(e,t,n,s){return An.subVectors(n,t),$n.subVectors(e,t),An.cross($n).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),An.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;bs.subVectors(s,n),Es.subVectors(r,n),Mc.subVectors(e,n);let c=bs.dot(Mc),l=Es.dot(Mc);if(c<=0&&l<=0)return t.copy(n);Sc.subVectors(e,s);let u=bs.dot(Sc),h=Es.dot(Sc);if(u>=0&&h<=u)return t.copy(s);let d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(bs,o);bc.subVectors(e,r);let f=bs.dot(bc),g=Es.dot(bc);if(g>=0&&f<=g)return t.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Es,a);let m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return _d.subVectors(r,s),a=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(_d,a);let p=1/(m+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(bs,o).addScaledVector(Es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Co={h:0,s:0,l:0};function Ac(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Re=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=je.workingColorSpace){if(e=Ru(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ac(o,r,e+1/3),this.g=Ac(o,r,e),this.b=Ac(o,r,e-1/3)}return je.toWorkingColorSpace(this,s),this}setStyle(e,t=mt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mt){let n=zf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=zs(e.r),this.g=zs(e.g),this.b=zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mt){return je.fromWorkingColorSpace(Vt.copy(this),e),Math.round(Lt(Vt.r*255,0,255))*65536+Math.round(Lt(Vt.g*255,0,255))*256+Math.round(Lt(Vt.b*255,0,255))}getHexString(e=mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(Vt.copy(this),t);let n=Vt.r,s=Vt.g,r=Vt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=mt){je.fromWorkingColorSpace(Vt.copy(this),e);let t=Vt.r,n=Vt.g,s=Vt.b;return e!==mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(Co);let n=Br(vi.h,Co.h,t),s=Br(vi.s,Co.s,t),r=Br(vi.l,Co.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Vt=new Re;Re.NAMES=zf;var v0=0,sn=class extends Ti{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:v0++}),this.uuid=xn(),this.name="",this.blending=Os,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qc,this.blendDst=Yc,this.blendEquation=Qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=td,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Os&&(n.blending=this.blending),this.side!==On&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qc&&(n.blendSrc=this.blendSrc),this.blendDst!==Yc&&(n.blendDst=this.blendDst),this.blendEquation!==Qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==td&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Rt=class extends sn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=bf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var It=new C,Io=new ee,Et=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rl,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Io.fromBufferAttribute(this,t),Io.applyMatrix3(e),this.setXY(t,Io.x,Io.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rl&&(e.usage=this.usage),e}};var la=class extends Et{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ua=class extends Et{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var it=class extends Et{constructor(e,t,n){super(new Float32Array(e),t,n)}},y0=0,mn=new ke,Rc=new yt,Ts=new C,cn=new nn,wr=new nn,Ot=new C,Mt=class i extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bf(e)?ua:la)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return Rc.lookAt(e),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new it(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];wr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(cn.min,wr.min),cn.expandByPoint(Ot),Ot.addVectors(cn.max,wr.max),cn.expandByPoint(Ot)):(cn.expandByPoint(wr.min),cn.expandByPoint(wr.max))}cn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ot.fromBufferAttribute(a,l),c&&(Ts.fromBufferAttribute(e,l),Ot.add(Ts)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Et(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new C,c[P]=new C;let l=new C,u=new C,h=new C,d=new ee,f=new ee,g=new ee,x=new C,m=new C;function p(P,E,M){l.fromBufferAttribute(n,P),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,M),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,M),u.sub(l),h.sub(l),f.sub(d),g.sub(d);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(I),a[P].add(x),a[E].add(x),a[M].add(x),c[P].add(m),c[E].add(m),c[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let P=0,E=S.length;P<E;++P){let M=S[P],I=M.start,U=M.count;for(let B=I,k=I+U;B<k;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let y=new C,_=new C,L=new C,w=new C;function R(P){L.fromBufferAttribute(s,P),w.copy(L);let E=a[P];y.copy(E),y.sub(L.multiplyScalar(L.dot(E))).normalize(),_.crossVectors(w,E);let I=_.dot(c[P])<0?-1:1;o.setXYZW(P,y.x,y.y,y.z,I)}for(let P=0,E=S.length;P<E;++P){let M=S[P],I=M.start,U=M.count;for(let B=I,k=I+U;B<k;B+=3)R(e.getX(B+0)),R(e.getX(B+1)),R(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Et(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new C,r=new C,o=new C,a=new C,c=new C,l=new C,u=new C,h=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new Et(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){let f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},vd=new ke,Zi=new ns,Po=new hn,yd=new C,Lo=new C,Do=new C,Uo=new C,Cc=new C,No=new C,Md=new C,Fo=new C,ye=class extends yt{constructor(e=new Mt,t=new Rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){No.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(Cc.fromBufferAttribute(h,e),o?No.addScaledVector(Cc,u):No.addScaledVector(Cc.sub(t),u))}t.add(No)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Po.copy(n.boundingSphere),Po.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(Po.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(Po,yd)===null||Zi.origin.distanceToSquared(yd)>(e.far-e.near)**2))&&(vd.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(vd),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=S,L=y;_<L;_+=3){let w=a.getX(_),R=a.getX(_+1),P=a.getX(_+2);s=Oo(this,p,e,n,l,u,h,w,R,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let S=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=Oo(this,o,e,n,l,u,h,S,y,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=S,L=y;_<L;_+=3){let w=_,R=_+1,P=_+2;s=Oo(this,p,e,n,l,u,h,w,R,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let S=m,y=m+1,_=m+2;s=Oo(this,o,e,n,l,u,h,S,y,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function M0(i,e,t,n,s,r,o,a){let c;if(e.side===tn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===On,a),c===null)return null;Fo.copy(a),Fo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Fo);return l<t.near||l>t.far?null:{distance:l,point:Fo.clone(),object:i}}function Oo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Lo),i.getVertexPosition(c,Do),i.getVertexPosition(l,Uo);let u=M0(i,e,t,n,Lo,Do,Uo,Md);if(u){let h=new C;Mi.getBarycoord(Md,Lo,Do,Uo,h),s&&(u.uv=Mi.getInterpolatedAttribute(s,a,c,l,h,new ee)),r&&(u.uv1=Mi.getInterpolatedAttribute(r,a,c,l,h,new ee)),o&&(u.normal=Mi.getInterpolatedAttribute(o,a,c,l,h,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new C,materialIndex:0};Mi.getNormal(Lo,Do,Uo,d.normal),u.face=d,u.barycoord=h}return u}var et=class i extends Mt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(h,2));function g(x,m,p,S,y,_,L,w,R,P,E){let M=_/R,I=L/P,U=_/2,B=L/2,k=w/2,$=R+1,V=P+1,se=0,X=0,le=new C;for(let fe=0;fe<V;fe++){let Ee=fe*I-B;for(let Ge=0;Ge<$;Ge++){let rt=Ge*M-U;le[x]=rt*S,le[m]=Ee*y,le[p]=k,l.push(le.x,le.y,le.z),le[x]=0,le[m]=0,le[p]=w>0?1:-1,u.push(le.x,le.y,le.z),h.push(Ge/R),h.push(1-fe/P),se+=1}}for(let fe=0;fe<P;fe++)for(let Ee=0;Ee<R;Ee++){let Ge=d+Ee+$*fe,rt=d+Ee+$*(fe+1),j=d+(Ee+1)+$*(fe+1),ce=d+(Ee+1)+$*fe;c.push(Ge,rt,ce),c.push(rt,j,ce),X+=6}a.addGroup(f,X,E),f+=X,d+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function $s(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Zt(i){let e={};for(let t=0;t<i.length;t++){let n=$s(i[t]);for(let s in n)e[s]=n[s]}return e}function S0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Hf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}var Di={clone:$s,merge:Zt},b0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,E0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ut=class extends sn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=b0,this.fragmentShader=E0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=S0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ha=class extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=ti}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},yi=new C,Sd=new ee,bd=new ee,Dt=class extends ha{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Sd,bd),t.subVectors(bd,Sd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Or*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ws=-90,As=1,Ll=class extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Dt(ws,As,e,t);s.layers=this.layers,this.add(s);let r=new Dt(ws,As,e,t);r.layers=this.layers,this.add(r);let o=new Dt(ws,As,e,t);o.layers=this.layers,this.add(o);let a=new Dt(ws,As,e,t);a.layers=this.layers,this.add(a);let c=new Dt(ws,As,e,t);c.layers=this.layers,this.add(c);let l=new Dt(ws,As,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===ti)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===oa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},da=class extends Bt{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Vs,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dl=class extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new da(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new et(5,5,5),r=new Ut({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Fn});r.uniforms.tEquirect.value=t;let o=new ye(s,r),a=t.minFilter;return t.minFilter===Nn&&(t.minFilter=en),new Ll(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Ic=new C,T0=new C,w0=new Ze,Qn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Ic.subVectors(n,t).cross(T0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ic),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||w0.getNormalMatrix(e),s=this.coplanarPoint(Ic).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},$i=new hn,Bo=new C,Yr=class{constructor(e=new Qn,t=new Qn,n=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ti){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],S=s[13],y=s[14],_=s[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+o,d+u,m+g,_+S).normalize(),n[3].setComponents(c-o,d-u,m-g,_-S).normalize(),n[4].setComponents(c-a,d-h,m-x,_-y).normalize(),t===ti)n[5].setComponents(c+a,d+h,m+x,_+y).normalize();else if(t===oa)n[5].setComponents(a,h,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Bo.x=s.normal.x>0?e.max.x:e.min.x,Bo.y=s.normal.y>0?e.max.y:e.min.y,Bo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Bo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function kf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function A0(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){let g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){let x=h[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Wt=class i extends Mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,d=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){let S=p*d-o;for(let y=0;y<l;y++){let _=y*h-r;g.push(_,-S,0),x.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){let y=S+l*p,_=S+l*(p+1),L=S+1+l*(p+1),w=S+1+l*p;f.push(y,_,w),f.push(_,L,w)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},R0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,C0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,I0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,P0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,L0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,D0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,U0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,N0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,F0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,O0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,B0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,z0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,H0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,k0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,V0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Y0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Z0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,K0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,j0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,J0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Q0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,eg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ng=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ig=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sg="gl_FragColor = linearToOutputTexel( gl_FragColor );",rg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,og=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ag=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ug=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Mg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ag=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ig=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ug=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ng=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Og=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$g=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ex=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ox=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ax=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ux=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,px=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_x=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ax=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ix=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ux=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$x=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,n_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,r_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:R0,alphahash_pars_fragment:C0,alphamap_fragment:I0,alphamap_pars_fragment:P0,alphatest_fragment:L0,alphatest_pars_fragment:D0,aomap_fragment:U0,aomap_pars_fragment:N0,batching_pars_vertex:F0,batching_vertex:O0,begin_vertex:B0,beginnormal_vertex:z0,bsdfs:H0,iridescence_fragment:k0,bumpmap_pars_fragment:V0,clipping_planes_fragment:G0,clipping_planes_pars_fragment:W0,clipping_planes_pars_vertex:X0,clipping_planes_vertex:q0,color_fragment:Y0,color_pars_fragment:Z0,color_pars_vertex:$0,color_vertex:K0,common:j0,cube_uv_reflection_fragment:J0,defaultnormal_vertex:Q0,displacementmap_pars_vertex:eg,displacementmap_vertex:tg,emissivemap_fragment:ng,emissivemap_pars_fragment:ig,colorspace_fragment:sg,colorspace_pars_fragment:rg,envmap_fragment:og,envmap_common_pars_fragment:ag,envmap_pars_fragment:cg,envmap_pars_vertex:lg,envmap_physical_pars_fragment:yg,envmap_vertex:ug,fog_vertex:hg,fog_pars_vertex:dg,fog_fragment:fg,fog_pars_fragment:pg,gradientmap_pars_fragment:mg,lightmap_pars_fragment:gg,lights_lambert_fragment:xg,lights_lambert_pars_fragment:_g,lights_pars_begin:vg,lights_toon_fragment:Mg,lights_toon_pars_fragment:Sg,lights_phong_fragment:bg,lights_phong_pars_fragment:Eg,lights_physical_fragment:Tg,lights_physical_pars_fragment:wg,lights_fragment_begin:Ag,lights_fragment_maps:Rg,lights_fragment_end:Cg,logdepthbuf_fragment:Ig,logdepthbuf_pars_fragment:Pg,logdepthbuf_pars_vertex:Lg,logdepthbuf_vertex:Dg,map_fragment:Ug,map_pars_fragment:Ng,map_particle_fragment:Fg,map_particle_pars_fragment:Og,metalnessmap_fragment:Bg,metalnessmap_pars_fragment:zg,morphinstance_vertex:Hg,morphcolor_vertex:kg,morphnormal_vertex:Vg,morphtarget_pars_vertex:Gg,morphtarget_vertex:Wg,normal_fragment_begin:Xg,normal_fragment_maps:qg,normal_pars_fragment:Yg,normal_pars_vertex:Zg,normal_vertex:$g,normalmap_pars_fragment:Kg,clearcoat_normal_fragment_begin:jg,clearcoat_normal_fragment_maps:Jg,clearcoat_pars_fragment:Qg,iridescence_pars_fragment:ex,opaque_fragment:tx,packing:nx,premultiplied_alpha_fragment:ix,project_vertex:sx,dithering_fragment:rx,dithering_pars_fragment:ox,roughnessmap_fragment:ax,roughnessmap_pars_fragment:cx,shadowmap_pars_fragment:lx,shadowmap_pars_vertex:ux,shadowmap_vertex:hx,shadowmask_pars_fragment:dx,skinbase_vertex:fx,skinning_pars_vertex:px,skinning_vertex:mx,skinnormal_vertex:gx,specularmap_fragment:xx,specularmap_pars_fragment:_x,tonemapping_fragment:vx,tonemapping_pars_fragment:yx,transmission_fragment:Mx,transmission_pars_fragment:Sx,uv_pars_fragment:bx,uv_pars_vertex:Ex,uv_vertex:Tx,worldpos_vertex:wx,background_vert:Ax,background_frag:Rx,backgroundCube_vert:Cx,backgroundCube_frag:Ix,cube_vert:Px,cube_frag:Lx,depth_vert:Dx,depth_frag:Ux,distanceRGBA_vert:Nx,distanceRGBA_frag:Fx,equirect_vert:Ox,equirect_frag:Bx,linedashed_vert:zx,linedashed_frag:Hx,meshbasic_vert:kx,meshbasic_frag:Vx,meshlambert_vert:Gx,meshlambert_frag:Wx,meshmatcap_vert:Xx,meshmatcap_frag:qx,meshnormal_vert:Yx,meshnormal_frag:Zx,meshphong_vert:$x,meshphong_frag:Kx,meshphysical_vert:jx,meshphysical_frag:Jx,meshtoon_vert:Qx,meshtoon_frag:e_,points_vert:t_,points_frag:n_,shadow_vert:i_,shadow_frag:s_,sprite_vert:r_,sprite_frag:o_},_e={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Dn={basic:{uniforms:Zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Re(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Zt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Zt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Re(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Zt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Zt([_e.points,_e.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Zt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Zt([_e.common,_e.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Zt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Zt([_e.sprite,_e.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:Zt([_e.common,_e.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:Zt([_e.lights,_e.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Dn.physical={uniforms:Zt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};var zo={r:0,b:0,g:0},Ki=new Bn,a_=new ke;function c_(i,e,t,n,s,r,o){let a=new Re(0),c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(S){let y=S.isScene===!0?S.background:null;return y&&y.isTexture&&(y=(S.backgroundBlurriness>0?t:e).get(y)),y}function x(S){let y=!1,_=g(S);_===null?p(a,c):_&&_.isColor&&(p(_,1),y=!0);let L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,y){let _=g(y);_&&(_.isCubeTexture||_.mapping===Oa)?(u===void 0&&(u=new ye(new et(1,1,1),new Ut({name:"BackgroundCubeMaterial",uniforms:$s(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ki.copy(y.backgroundRotation),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(a_.makeRotationFromEuler(Ki)),u.material.toneMapped=je.getTransfer(_.colorSpace)!==dt,(h!==_||d!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ye(new Wt(2,2),new Ut({name:"BackgroundMaterial",uniforms:$s(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=je.getTransfer(_.colorSpace)!==dt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,y){S.getRGB(zo,Hf(i)),n.buffers.color.setClear(zo.r,zo.g,zo.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(S,y=1){a.set(S),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:x,addToRenderList:m}}function l_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(M,I,U,B,k){let $=!1,V=h(B,U,I);r!==V&&(r=V,l(r.object)),$=f(M,B,U,k),$&&g(M,B,U,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,_(M,I,U,B),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function h(M,I,U){let B=U.wireframe===!0,k=n[M.id];k===void 0&&(k={},n[M.id]=k);let $=k[I.id];$===void 0&&($={},k[I.id]=$);let V=$[B];return V===void 0&&(V=d(c()),$[B]=V),V}function d(M){let I=[],U=[],B=[];for(let k=0;k<t;k++)I[k]=0,U[k]=0,B[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:B,object:M,attributes:{},index:null}}function f(M,I,U,B){let k=r.attributes,$=I.attributes,V=0,se=U.getAttributes();for(let X in se)if(se[X].location>=0){let fe=k[X],Ee=$[X];if(Ee===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(Ee=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(Ee=M.instanceColor)),fe===void 0||fe.attribute!==Ee||Ee&&fe.data!==Ee.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function g(M,I,U,B){let k={},$=I.attributes,V=0,se=U.getAttributes();for(let X in se)if(se[X].location>=0){let fe=$[X];fe===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor));let Ee={};Ee.attribute=fe,fe&&fe.data&&(Ee.data=fe.data),k[X]=Ee,V++}r.attributes=k,r.attributesNum=V,r.index=B}function x(){let M=r.newAttributes;for(let I=0,U=M.length;I<U;I++)M[I]=0}function m(M){p(M,0)}function p(M,I){let U=r.newAttributes,B=r.enabledAttributes,k=r.attributeDivisors;U[M]=1,B[M]===0&&(i.enableVertexAttribArray(M),B[M]=1),k[M]!==I&&(i.vertexAttribDivisor(M,I),k[M]=I)}function S(){let M=r.newAttributes,I=r.enabledAttributes;for(let U=0,B=I.length;U<B;U++)I[U]!==M[U]&&(i.disableVertexAttribArray(U),I[U]=0)}function y(M,I,U,B,k,$,V){V===!0?i.vertexAttribIPointer(M,I,U,k,$):i.vertexAttribPointer(M,I,U,B,k,$)}function _(M,I,U,B){x();let k=B.attributes,$=U.getAttributes(),V=I.defaultAttributeValues;for(let se in $){let X=$[se];if(X.location>=0){let le=k[se];if(le===void 0&&(se==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),se==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),le!==void 0){let fe=le.normalized,Ee=le.itemSize,Ge=e.get(le);if(Ge===void 0)continue;let rt=Ge.buffer,j=Ge.type,ce=Ge.bytesPerElement,Te=j===i.INT||j===i.UNSIGNED_INT||le.gpuType===Mu;if(le.isInterleavedBufferAttribute){let ue=le.data,Fe=ue.stride,Ve=le.offset;if(ue.isInstancedInterleavedBuffer){for(let Be=0;Be<X.locationSize;Be++)p(X.location+Be,ue.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Be=0;Be<X.locationSize;Be++)m(X.location+Be);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let Be=0;Be<X.locationSize;Be++)y(X.location+Be,Ee/X.locationSize,j,fe,Fe*ce,(Ve+Ee/X.locationSize*Be)*ce,Te)}else{if(le.isInstancedBufferAttribute){for(let ue=0;ue<X.locationSize;ue++)p(X.location+ue,le.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ue=0;ue<X.locationSize;ue++)m(X.location+ue);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let ue=0;ue<X.locationSize;ue++)y(X.location+ue,Ee/X.locationSize,j,fe,Ee*ce,Ee/X.locationSize*ue*ce,Te)}}else if(V!==void 0){let fe=V[se];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(X.location,fe);break;case 3:i.vertexAttrib3fv(X.location,fe);break;case 4:i.vertexAttrib4fv(X.location,fe);break;default:i.vertexAttrib1fv(X.location,fe)}}}}S()}function L(){P();for(let M in n){let I=n[M];for(let U in I){let B=I[U];for(let k in B)u(B[k].object),delete B[k];delete I[U]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let I=n[M.id];for(let U in I){let B=I[U];for(let k in B)u(B[k].object),delete B[k];delete I[U]}delete n[M.id]}function R(M){for(let I in n){let U=n[I];if(U[M.id]===void 0)continue;let B=U[M.id];for(let k in B)u(B[k].object),delete B[k];delete U[M.id]}}function P(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function u_(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function c(l,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*d[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function h_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==gn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let P=R===In&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==si&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Cn&&!P)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:L,maxSamples:w}}function d_(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Qn,a=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{let S=r?0:n,y=S*4,_=p.clippingState||null;c.value=_,_=u(g,d,y,f);for(let L=0;L!==y;++L)_[L]=t[L];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){let x=h!==null?h.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=f;y!==x;++y,_+=4)o.copy(h[y]).applyMatrix4(S,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function f_(i){let e=new WeakMap;function t(o,a){return a===Vr?o.mapping=Vs:a===tl&&(o.mapping=Gs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Vr||a===tl)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Dl(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var wi=class extends ha{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ns=4,Ed=[.125,.215,.35,.446,.526,.582],es=20,Pc=new wi,Td=new Re,Lc=null,Dc=0,Uc=0,Nc=!1,Ji=(1+Math.sqrt(5))/2,Rs=1/Ji,wd=[new C(-Ji,Rs,0),new C(Ji,Rs,0),new C(-Rs,0,Ji),new C(Rs,0,Ji),new C(0,Ji,-Rs),new C(0,Ji,Rs),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],Ks=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Lc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lc,Dc,Uc),this._renderer.xr.enabled=Nc,e.scissorTest=!1,Ho(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vs||e.mapping===Gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:In,format:gn,colorSpace:Xt,depthBuffer:!1},s=Ad(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ad(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=p_(r)),this._blurMaterial=m_(r,e,t)}return s}_compileMaterial(e){let t=new ye(this._lodPlanes[0],e);this._renderer.compile(t,Pc)}_sceneToCubeUV(e,t,n,s){let a=new Dt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Td),u.toneMapping=bi,u.autoClear=!1;let f=new Rt({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new ye(new et,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(Td),x=!0);for(let p=0;p<6;p++){let S=p%3;S===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):S===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let y=this._cubeSize;Ho(s,S*y,p>2?y:0,y,y),u.setRenderTarget(s),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Vs||e.mapping===Gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ye(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Ho(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Pc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=wd[(s-r-1)%wd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new ye(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*es-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):es;m>es&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${es}`);let p=[],S=0;for(let R=0;R<es;++R){let P=R/x,E=Math.exp(-P*P/2);p.push(E),R===0?S+=E:R<m&&(S+=2*E)}for(let R=0;R<p.length;R++)p[R]=p[R]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let _=this._sizeLods[s],L=3*_*(s>y-Ns?s-y+Ns:0),w=4*(this._cubeSize-_);Ho(t,L,w,3*_,2*_),c.setRenderTarget(t),c.render(h,Pc)}};function p_(i){let e=[],t=[],n=[],s=i,r=i-Ns+1+Ed.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Ns?c=Ed[o-i+Ns-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,p=1,S=new Float32Array(x*g*f),y=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let w=0;w<f;w++){let R=w%3*2/3-1,P=w>2?0:-1,E=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];S.set(E,x*g*w),y.set(d,m*g*w);let M=[w,w,w,w,w,w];_.set(M,p*g*w)}let L=new Mt;L.setAttribute("position",new Et(S,x)),L.setAttribute("uv",new Et(y,m)),L.setAttribute("faceIndex",new Et(_,p)),e.push(L),s>Ns&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ad(i,e,t){let n=new Kt(i,e,t);return n.texture.mapping=Oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ho(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function m_(i,e,t){let n=new Float32Array(es),s=new C(0,1,0);return new Ut({name:"SphericalGaussianBlur",defines:{n:es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Rd(){return new Ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Cd(){return new Ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Cu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function g_(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Vr||c===tl,u=c===Vs||c===Gs;if(l||u){let h=e.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ks(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return l&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Ks(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function x_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ur("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function __(i,e,t,n){let s={},r=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(h){let d=h.attributes;for(let g in d)e.update(d[g],i.ARRAY_BUFFER);let f=h.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(h){let d=[],f=h.index,g=h.attributes.position,x=0;if(f!==null){let S=f.array;x=f.version;for(let y=0,_=S.length;y<_;y+=3){let L=S[y+0],w=S[y+1],R=S[y+2];d.push(L,w,w,R,R,L)}}else if(g!==void 0){let S=g.array;x=g.version;for(let y=0,_=S.length/3-1;y<_;y+=3){let L=y+0,w=y+1,R=y+2;d.push(L,w,w,R,R,L)}}else return;let m=new(Bf(d)?ua:la)(d,1);m.version=x;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function v_(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*x[S];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function y_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function M_(i,e,t){let n=new WeakMap,s=new lt;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let E=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,L=1;_>e.maxTextureSize&&(L=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let w=new Float32Array(_*L*4*h),R=new ca(w,_,L,h);R.type=Cn,R.needsUpdate=!0;let P=y*4;for(let M=0;M<h;M++){let I=m[M],U=p[M],B=S[M],k=_*L*4*M;for(let $=0;$<I.count;$++){let V=$*P;f===!0&&(s.fromBufferAttribute(I,$),w[k+V+0]=s.x,w[k+V+1]=s.y,w[k+V+2]=s.z,w[k+V+3]=0),g===!0&&(s.fromBufferAttribute(U,$),w[k+V+4]=s.x,w[k+V+5]=s.y,w[k+V+6]=s.z,w[k+V+7]=0),x===!0&&(s.fromBufferAttribute(B,$),w[k+V+8]=s.x,w[k+V+9]=s.y,w[k+V+10]=s.z,w[k+V+11]=B.itemSize===4?s.w:1)}}d={count:h,texture:R,size:new ee(_,L)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function S_(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var fa=class extends Bt{constructor(e,t,n,s,r,o,a,c,l,u=Bs){if(u!==Bs&&u!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Bs&&(n=ts),n===void 0&&u===Xs&&(n=Ws),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Gt,this.minFilter=c!==void 0?c:Gt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Vf=new Bt,Id=new fa(1,1),Gf=new ca,Wf=new Pl,Xf=new da,Pd=[],Ld=[],Dd=new Float32Array(16),Ud=new Float32Array(9),Nd=new Float32Array(4);function cr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Pd[s];if(r===void 0&&(r=new Float32Array(s),Pd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Nt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ft(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ha(i,e){let t=Ld[e];t===void 0&&(t=new Int32Array(e),Ld[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function b_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function E_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2fv(this.addr,e),Ft(t,e)}}function T_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;i.uniform3fv(this.addr,e),Ft(t,e)}}function w_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4fv(this.addr,e),Ft(t,e)}}function A_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,n))return;Nd.set(n),i.uniformMatrix2fv(this.addr,!1,Nd),Ft(t,n)}}function R_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,n))return;Ud.set(n),i.uniformMatrix3fv(this.addr,!1,Ud),Ft(t,n)}}function C_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,n))return;Dd.set(n),i.uniformMatrix4fv(this.addr,!1,Dd),Ft(t,n)}}function I_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function P_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2iv(this.addr,e),Ft(t,e)}}function L_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3iv(this.addr,e),Ft(t,e)}}function D_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4iv(this.addr,e),Ft(t,e)}}function U_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function N_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2uiv(this.addr,e),Ft(t,e)}}function F_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3uiv(this.addr,e),Ft(t,e)}}function O_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4uiv(this.addr,e),Ft(t,e)}}function B_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Id.compareFunction=Ff,r=Id):r=Vf,t.setTexture2D(e||r,s)}function z_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Wf,s)}function H_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Xf,s)}function k_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Gf,s)}function V_(i){switch(i){case 5126:return b_;case 35664:return E_;case 35665:return T_;case 35666:return w_;case 35674:return A_;case 35675:return R_;case 35676:return C_;case 5124:case 35670:return I_;case 35667:case 35671:return P_;case 35668:case 35672:return L_;case 35669:case 35673:return D_;case 5125:return U_;case 36294:return N_;case 36295:return F_;case 36296:return O_;case 35678:case 36198:case 36298:case 36306:case 35682:return B_;case 35679:case 36299:case 36307:return z_;case 35680:case 36300:case 36308:case 36293:return H_;case 36289:case 36303:case 36311:case 36292:return k_}}function G_(i,e){i.uniform1fv(this.addr,e)}function W_(i,e){let t=cr(e,this.size,2);i.uniform2fv(this.addr,t)}function X_(i,e){let t=cr(e,this.size,3);i.uniform3fv(this.addr,t)}function q_(i,e){let t=cr(e,this.size,4);i.uniform4fv(this.addr,t)}function Y_(i,e){let t=cr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Z_(i,e){let t=cr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function $_(i,e){let t=cr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function K_(i,e){i.uniform1iv(this.addr,e)}function j_(i,e){i.uniform2iv(this.addr,e)}function J_(i,e){i.uniform3iv(this.addr,e)}function Q_(i,e){i.uniform4iv(this.addr,e)}function ev(i,e){i.uniform1uiv(this.addr,e)}function tv(i,e){i.uniform2uiv(this.addr,e)}function nv(i,e){i.uniform3uiv(this.addr,e)}function iv(i,e){i.uniform4uiv(this.addr,e)}function sv(i,e,t){let n=this.cache,s=e.length,r=Ha(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Vf,r[o])}function rv(i,e,t){let n=this.cache,s=e.length,r=Ha(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Wf,r[o])}function ov(i,e,t){let n=this.cache,s=e.length,r=Ha(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Xf,r[o])}function av(i,e,t){let n=this.cache,s=e.length,r=Ha(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Gf,r[o])}function cv(i){switch(i){case 5126:return G_;case 35664:return W_;case 35665:return X_;case 35666:return q_;case 35674:return Y_;case 35675:return Z_;case 35676:return $_;case 5124:case 35670:return K_;case 35667:case 35671:return j_;case 35668:case 35672:return J_;case 35669:case 35673:return Q_;case 5125:return ev;case 36294:return tv;case 36295:return nv;case 36296:return iv;case 35678:case 36198:case 36298:case 36306:case 35682:return sv;case 35679:case 36299:case 36307:return rv;case 35680:case 36300:case 36308:case 36293:return ov;case 36289:case 36303:case 36311:case 36292:return av}}var Ul=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=V_(t.type)}},Nl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cv(t.type)}},Fl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Fc=/(\w+)(\])?(\[|\.)?/g;function Fd(i,e){i.seq.push(e),i.map[e.id]=e}function lv(i,e,t){let n=i.name,s=n.length;for(Fc.lastIndex=0;;){let r=Fc.exec(n),o=Fc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Fd(t,l===void 0?new Ul(a,i,e):new Nl(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Fl(a),Fd(t,h)),t=h}}}var Hs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);lv(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Od(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var uv=37297,hv=0;function dv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Bd=new Ze;function fv(i){je._getMatrix(Bd,je.workingColorSpace,i);let e=`mat3( ${Bd.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case za:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function zd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+dv(i.getShaderSource(e),o)}else return s}function pv(i,e){let t=fv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function mv(i,e){let t;switch(e){case mu:t="Linear";break;case gu:t="Reinhard";break;case xu:t="Cineon";break;case io:t="ACESFilmic";break;case _u:t="AgX";break;case vu:t="Neutral";break;case Pm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ko=new C;function gv(){je.getLuminanceCoefficients(ko);let i=ko.x.toFixed(4),e=ko.y.toFixed(4),t=ko.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Nr).join(`
`)}function _v(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Nr(i){return i!==""}function Hd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ol(i){return i.replace(yv,Sv)}var Mv=new Map;function Sv(i,e){let t=$e[e];if(t===void 0){let n=Mv.get(e);if(n!==void 0)t=$e[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ol(t)}var bv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vd(i){return i.replace(bv,Ev)}function Ev(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Gd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Tv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Sf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===pu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function wv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Vs:case Gs:e="ENVMAP_TYPE_CUBE";break;case Oa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Av(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Gs:e="ENVMAP_MODE_REFRACTION";break}return e}function Rv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case bf:e="ENVMAP_BLENDING_MULTIPLY";break;case Cm:e="ENVMAP_BLENDING_MIX";break;case Im:e="ENVMAP_BLENDING_ADD";break}return e}function Cv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Iv(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Tv(t),l=wv(t),u=Av(t),h=Rv(t),d=Cv(t),f=xv(t),g=_v(r),x=s.createProgram(),m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Nr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Nr).join(`
`),p.length>0&&(p+=`
`)):(m=[Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Nr).join(`
`),p=[Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?$e.tonemapping_pars_fragment:"",t.toneMapping!==bi?mv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,pv("linearToOutputTexel",t.outputColorSpace),gv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Nr).join(`
`)),o=Ol(o),o=Hd(o,t),o=kd(o,t),a=Ol(a),a=Hd(a,t),a=kd(a,t),o=Vd(o),a=Vd(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===nd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=S+m+o,_=S+p+a,L=Od(s,s.VERTEX_SHADER,y),w=Od(s,s.FRAGMENT_SHADER,_);s.attachShader(x,L),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(I){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(x).trim(),B=s.getShaderInfoLog(L).trim(),k=s.getShaderInfoLog(w).trim(),$=!0,V=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,L,w);else{let se=zd(s,L,"vertex"),X=zd(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+se+`
`+X)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(B===""||k==="")&&(V=!1);V&&(I.diagnostics={runnable:$,programLog:U,vertexShader:{log:B,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(L),s.deleteShader(w),P=new Hs(s,x),E=vv(s,x)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,uv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=w,this}var Pv=0,Bl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new zl(e),t.set(e,n)),n}},zl=class{constructor(e){this.id=Pv++,this.code=e,this.usedTimes=0}};function Lv(i,e,t,n,s,r,o){let a=new qr,c=new Bl,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,M,I,U,B){let k=U.fog,$=B.geometry,V=E.isMeshStandardMaterial?U.environment:null,se=(E.isMeshStandardMaterial?t:e).get(E.envMap||V),X=se&&se.mapping===Oa?se.image.height:null,le=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let fe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ee=fe!==void 0?fe.length:0,Ge=0;$.morphAttributes.position!==void 0&&(Ge=1),$.morphAttributes.normal!==void 0&&(Ge=2),$.morphAttributes.color!==void 0&&(Ge=3);let rt,j,ce,Te;if(le){let ft=Dn[le];rt=ft.vertexShader,j=ft.fragmentShader}else rt=E.vertexShader,j=E.fragmentShader,c.update(E),ce=c.getVertexShaderID(E),Te=c.getFragmentShaderID(E);let ue=i.getRenderTarget(),Fe=i.state.buffers.depth.getReversed(),Ve=B.isInstancedMesh===!0,Be=B.isBatchedMesh===!0,Qe=!!E.map,te=!!E.matcap,oe=!!se,A=!!E.aoMap,Ae=!!E.lightMap,re=!!E.bumpMap,be=!!E.normalMap,de=!!E.displacementMap,Oe=!!E.emissiveMap,Se=!!E.metalnessMap,T=!!E.roughnessMap,v=E.anisotropy>0,H=E.clearcoat>0,Z=E.dispersion>0,ie=E.iridescence>0,K=E.sheen>0,we=E.transmission>0,ge=v&&!!E.anisotropyMap,F=H&&!!E.clearcoatMap,J=H&&!!E.clearcoatNormalMap,z=H&&!!E.clearcoatRoughnessMap,Y=ie&&!!E.iridescenceMap,ne=ie&&!!E.iridescenceThicknessMap,me=K&&!!E.sheenColorMap,ae=K&&!!E.sheenRoughnessMap,ze=!!E.specularMap,He=!!E.specularColorMap,Xe=!!E.specularIntensityMap,D=we&&!!E.transmissionMap,pe=we&&!!E.thicknessMap,q=!!E.gradientMap,Q=!!E.alphaMap,xe=E.alphaTest>0,ve=!!E.alphaHash,qe=!!E.extensions,At=bi;E.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(At=i.toneMapping);let Ht={shaderID:le,shaderType:E.type,shaderName:E.name,vertexShader:rt,fragmentShader:j,defines:E.defines,customVertexShaderID:ce,customFragmentShaderID:Te,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Be,batchingColor:Be&&B._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&B.instanceColor!==null,instancingMorph:Ve&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Xt,alphaToCoverage:!!E.alphaToCoverage,map:Qe,matcap:te,envMap:oe,envMapMode:oe&&se.mapping,envMapCubeUVHeight:X,aoMap:A,lightMap:Ae,bumpMap:re,normalMap:be,displacementMap:d&&de,emissiveMap:Oe,normalMapObjectSpace:be&&E.normalMapType===Fm,normalMapTangentSpace:be&&E.normalMapType===Nf,metalnessMap:Se,roughnessMap:T,anisotropy:v,anisotropyMap:ge,clearcoat:H,clearcoatMap:F,clearcoatNormalMap:J,clearcoatRoughnessMap:z,dispersion:Z,iridescence:ie,iridescenceMap:Y,iridescenceThicknessMap:ne,sheen:K,sheenColorMap:me,sheenRoughnessMap:ae,specularMap:ze,specularColorMap:He,specularIntensityMap:Xe,transmission:we,transmissionMap:D,thicknessMap:pe,gradientMap:q,opaque:E.transparent===!1&&E.blending===Os&&E.alphaToCoverage===!1,alphaMap:Q,alphaTest:xe,alphaHash:ve,combine:E.combine,mapUv:Qe&&x(E.map.channel),aoMapUv:A&&x(E.aoMap.channel),lightMapUv:Ae&&x(E.lightMap.channel),bumpMapUv:re&&x(E.bumpMap.channel),normalMapUv:be&&x(E.normalMap.channel),displacementMapUv:de&&x(E.displacementMap.channel),emissiveMapUv:Oe&&x(E.emissiveMap.channel),metalnessMapUv:Se&&x(E.metalnessMap.channel),roughnessMapUv:T&&x(E.roughnessMap.channel),anisotropyMapUv:ge&&x(E.anisotropyMap.channel),clearcoatMapUv:F&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:J&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:me&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:ae&&x(E.sheenRoughnessMap.channel),specularMapUv:ze&&x(E.specularMap.channel),specularColorMapUv:He&&x(E.specularColorMap.channel),specularIntensityMapUv:Xe&&x(E.specularIntensityMap.channel),transmissionMapUv:D&&x(E.transmissionMap.channel),thicknessMapUv:pe&&x(E.thicknessMap.channel),alphaMapUv:Q&&x(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(be||v),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!$.attributes.uv&&(Qe||Q),fog:!!k,useFog:E.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Fe,skinning:B.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ge,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:At,decodeVideoTexture:Qe&&E.map.isVideoTexture===!0&&je.getTransfer(E.map.colorSpace)===dt,decodeVideoTextureEmissive:Oe&&E.emissiveMap.isVideoTexture===!0&&je.getTransfer(E.emissiveMap.colorSpace)===dt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===$t,flipSided:E.side===tn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:qe&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&E.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ht.vertexUv1s=l.has(1),Ht.vertexUv2s=l.has(2),Ht.vertexUv3s=l.has(3),l.clear(),Ht}function p(E){let M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(let I in E.defines)M.push(I),M.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(S(M,E),y(M,E),M.push(i.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function S(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function y(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){let M=g[E.type],I;if(M){let U=Dn[M];I=Di.clone(U.uniforms)}else I=E.uniforms;return I}function L(E,M){let I;for(let U=0,B=u.length;U<B;U++){let k=u[U];if(k.cacheKey===M){I=k,++I.usedTimes;break}}return I===void 0&&(I=new Iv(i,M,E,r),u.push(I)),I}function w(E){if(--E.usedTimes===0){let M=u.indexOf(E);u[M]=u[u.length-1],u.pop(),E.destroy()}}function R(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:L,releaseProgram:w,releaseShaderCache:R,programs:u,dispose:P}}function Dv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Uv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Wd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Xd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,d,f,g,x,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),e++,p}function a(h,d,f,g,x,m){let p=o(h,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(h,d,f,g,x,m){let p=o(h,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||Uv),n.length>1&&n.sort(d||Wd),s.length>1&&s.sort(d||Wd)}function u(){for(let h=e,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function Nv(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Xd,i.set(n,[o])):s>=r.length?(o=new Xd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Fv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Re};break;case"SpotLight":t={position:new C,direction:new C,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function Ov(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Bv=0;function zv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Hv(i){let e=new Fv,t=Ov(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);let s=new C,r=new ke,o=new ke;function a(l){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,S=0,y=0,_=0,L=0,w=0,R=0;l.sort(zv);for(let E=0,M=l.length;E<M;E++){let I=l[E],U=I.color,B=I.intensity,k=I.distance,$=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=U.r*B,h+=U.g*B,d+=U.b*B;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],B);R++}else if(I.isDirectionalLight){let V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let se=I.shadow,X=t.get(I);X.shadowIntensity=se.intensity,X.shadowBias=se.bias,X.shadowNormalBias=se.normalBias,X.shadowRadius=se.radius,X.shadowMapSize=se.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=I.shadow.matrix,S++}n.directional[f]=V,f++}else if(I.isSpotLight){let V=e.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(U).multiplyScalar(B),V.distance=k,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[x]=V;let se=I.shadow;if(I.map&&(n.spotLightMap[L]=I.map,L++,se.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[x]=se.matrix,I.castShadow){let X=t.get(I);X.shadowIntensity=se.intensity,X.shadowBias=se.bias,X.shadowNormalBias=se.normalBias,X.shadowRadius=se.radius,X.shadowMapSize=se.mapSize,n.spotShadow[x]=X,n.spotShadowMap[x]=$,_++}x++}else if(I.isRectAreaLight){let V=e.get(I);V.color.copy(U).multiplyScalar(B),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=V,m++}else if(I.isPointLight){let V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){let se=I.shadow,X=t.get(I);X.shadowIntensity=se.intensity,X.shadowBias=se.bias,X.shadowNormalBias=se.normalBias,X.shadowRadius=se.radius,X.shadowMapSize=se.mapSize,X.shadowCameraNear=se.camera.near,X.shadowCameraFar=se.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=V,g++}else if(I.isHemisphereLight){let V=e.get(I);V.skyColor.copy(I.color).multiplyScalar(B),V.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==x||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==S||P.numPointShadows!==y||P.numSpotShadows!==_||P.numSpotMaps!==L||P.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+L-w,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,P.directionalLength=f,P.pointLength=g,P.spotLength=x,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=S,P.numPointShadows=y,P.numSpotShadows=_,P.numSpotMaps=L,P.numLightProbes=R,n.version=Bv++)}function c(l,u){let h=0,d=0,f=0,g=0,x=0,m=u.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){let y=l[p];if(y.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(y.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function qd(i){let e=new Hv(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function kv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new qd(i),e.set(s,[a])):r>=o.length?(a=new qd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Hl=class extends sn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Um,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},kl=class extends sn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Vv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Wv(i,e,t){let n=new Yr,s=new ee,r=new ee,o=new lt,a=new Hl({depthPacking:Nm}),c=new kl,l={},u=t.maxTextureSize,h={[On]:tn,[tn]:On,[$t]:$t},d=new Ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:Vv,fragmentShader:Gv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Mt;g.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ye(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sf;let p=this.type;this.render=function(w,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let E=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Fn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let B=p!==Jn&&this.type===Jn,k=p===Jn&&this.type!==Jn;for(let $=0,V=w.length;$<V;$++){let se=w[$],X=se.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",se,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let le=X.getFrameExtents();if(s.multiply(le),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/le.x),s.x=r.x*le.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/le.y),s.y=r.y*le.y,X.mapSize.y=r.y)),X.map===null||B===!0||k===!0){let Ee=this.type!==Jn?{minFilter:Gt,magFilter:Gt}:{};X.map!==null&&X.map.dispose(),X.map=new Kt(s.x,s.y,Ee),X.map.texture.name=se.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let fe=X.getViewportCount();for(let Ee=0;Ee<fe;Ee++){let Ge=X.getViewport(Ee);o.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),U.viewport(o),X.updateMatrices(se,Ee),n=X.getFrustum(),_(R,P,X.camera,se,this.type)}X.isPointLightShadow!==!0&&this.type===Jn&&S(X,P),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,M,I)};function S(w,R){let P=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Kt(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,P,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,P,f,x,null)}function y(w,R,P,E){let M=null,I=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let U=M.uuid,B=R.uuid,k=l[U];k===void 0&&(k={},l[U]=k);let $=k[B];$===void 0&&($=M.clone(),k[B]=$,R.addEventListener("dispose",L)),M=$}if(M.visible=R.visible,M.wireframe=R.wireframe,E===Jn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let U=i.properties.get(M);U.light=P}return M}function _(w,R,P,E,M){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===Jn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);let B=e.update(w),k=w.material;if(Array.isArray(k)){let $=B.groups;for(let V=0,se=$.length;V<se;V++){let X=$[V],le=k[X.materialIndex];if(le&&le.visible){let fe=y(w,le,E,M);w.onBeforeShadow(i,w,R,P,B,fe,X),i.renderBufferDirect(P,null,B,fe,w,X),w.onAfterShadow(i,w,R,P,B,fe,X)}}}else if(k.visible){let $=y(w,k,E,M);w.onBeforeShadow(i,w,R,P,B,$,null),i.renderBufferDirect(P,null,B,$,w,null),w.onAfterShadow(i,w,R,P,B,$,null)}}let U=w.children;for(let B=0,k=U.length;B<k;B++)_(U[B],R,P,E,M)}function L(w){w.target.removeEventListener("dispose",L);for(let P in l){let E=l[P],M=w.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}var Xv={[Zc]:$c,[Kc]:Qc,[jc]:el,[ks]:Jc,[$c]:Zc,[Qc]:Kc,[el]:jc,[Jc]:ks};function qv(i,e){function t(){let D=!1,pe=new lt,q=null,Q=new lt(0,0,0,0);return{setMask:function(xe){q!==xe&&!D&&(i.colorMask(xe,xe,xe,xe),q=xe)},setLocked:function(xe){D=xe},setClear:function(xe,ve,qe,At,Ht){Ht===!0&&(xe*=At,ve*=At,qe*=At),pe.set(xe,ve,qe,At),Q.equals(pe)===!1&&(i.clearColor(xe,ve,qe,At),Q.copy(pe))},reset:function(){D=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let D=!1,pe=!1,q=null,Q=null,xe=null;return{setReversed:function(ve){if(pe!==ve){let qe=e.get("EXT_clip_control");pe?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);let At=xe;xe=null,this.setClear(At)}pe=ve},getReversed:function(){return pe},setTest:function(ve){ve?ue(i.DEPTH_TEST):Fe(i.DEPTH_TEST)},setMask:function(ve){q!==ve&&!D&&(i.depthMask(ve),q=ve)},setFunc:function(ve){if(pe&&(ve=Xv[ve]),Q!==ve){switch(ve){case Zc:i.depthFunc(i.NEVER);break;case $c:i.depthFunc(i.ALWAYS);break;case Kc:i.depthFunc(i.LESS);break;case ks:i.depthFunc(i.LEQUAL);break;case jc:i.depthFunc(i.EQUAL);break;case Jc:i.depthFunc(i.GEQUAL);break;case Qc:i.depthFunc(i.GREATER);break;case el:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ve}},setLocked:function(ve){D=ve},setClear:function(ve){xe!==ve&&(pe&&(ve=1-ve),i.clearDepth(ve),xe=ve)},reset:function(){D=!1,q=null,Q=null,xe=null,pe=!1}}}function s(){let D=!1,pe=null,q=null,Q=null,xe=null,ve=null,qe=null,At=null,Ht=null;return{setTest:function(ft){D||(ft?ue(i.STENCIL_TEST):Fe(i.STENCIL_TEST))},setMask:function(ft){pe!==ft&&!D&&(i.stencilMask(ft),pe=ft)},setFunc:function(ft,bn,Wn){(q!==ft||Q!==bn||xe!==Wn)&&(i.stencilFunc(ft,bn,Wn),q=ft,Q=bn,xe=Wn)},setOp:function(ft,bn,Wn){(ve!==ft||qe!==bn||At!==Wn)&&(i.stencilOp(ft,bn,Wn),ve=ft,qe=bn,At=Wn)},setLocked:function(ft){D=ft},setClear:function(ft){Ht!==ft&&(i.clearStencil(ft),Ht=ft)},reset:function(){D=!1,pe=null,q=null,Q=null,xe=null,ve=null,qe=null,At=null,Ht=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,S=null,y=null,_=null,L=null,w=null,R=new Re(0,0,0),P=0,E=!1,M=null,I=null,U=null,B=null,k=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,se=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(X)[1]),V=se>=1):X.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),V=se>=2);let le=null,fe={},Ee=i.getParameter(i.SCISSOR_BOX),Ge=i.getParameter(i.VIEWPORT),rt=new lt().fromArray(Ee),j=new lt().fromArray(Ge);function ce(D,pe,q,Q){let xe=new Uint8Array(4),ve=i.createTexture();i.bindTexture(D,ve),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<q;qe++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(pe+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return ve}let Te={};Te[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),Te[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Te[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Te[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(i.DEPTH_TEST),o.setFunc(ks),re(!1),be(Zh),ue(i.CULL_FACE),A(Fn);function ue(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function Fe(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Ve(D,pe){return h[D]!==pe?(i.bindFramebuffer(D,pe),h[D]=pe,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=pe),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function Be(D,pe){let q=f,Q=!1;if(D){q=d.get(pe),q===void 0&&(q=[],d.set(pe,q));let xe=D.textures;if(q.length!==xe.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,qe=xe.length;ve<qe;ve++)q[ve]=i.COLOR_ATTACHMENT0+ve;q.length=xe.length,Q=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Q=!0);Q&&i.drawBuffers(q)}function Qe(D){return g!==D?(i.useProgram(D),g=D,!0):!1}let te={[Qi]:i.FUNC_ADD,[dm]:i.FUNC_SUBTRACT,[fm]:i.FUNC_REVERSE_SUBTRACT};te[pm]=i.MIN,te[mm]=i.MAX;let oe={[gm]:i.ZERO,[xm]:i.ONE,[_m]:i.SRC_COLOR,[qc]:i.SRC_ALPHA,[Em]:i.SRC_ALPHA_SATURATE,[Sm]:i.DST_COLOR,[ym]:i.DST_ALPHA,[vm]:i.ONE_MINUS_SRC_COLOR,[Yc]:i.ONE_MINUS_SRC_ALPHA,[bm]:i.ONE_MINUS_DST_COLOR,[Mm]:i.ONE_MINUS_DST_ALPHA,[Tm]:i.CONSTANT_COLOR,[wm]:i.ONE_MINUS_CONSTANT_COLOR,[Am]:i.CONSTANT_ALPHA,[Rm]:i.ONE_MINUS_CONSTANT_ALPHA};function A(D,pe,q,Q,xe,ve,qe,At,Ht,ft){if(D===Fn){x===!0&&(Fe(i.BLEND),x=!1);return}if(x===!1&&(ue(i.BLEND),x=!0),D!==hm){if(D!==m||ft!==E){if((p!==Qi||_!==Qi)&&(i.blendEquation(i.FUNC_ADD),p=Qi,_=Qi),ft)switch(D){case Os:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ii:i.blendFunc(i.ONE,i.ONE);break;case $h:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Os:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ii:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case $h:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,y=null,L=null,w=null,R.set(0,0,0),P=0,m=D,E=ft}return}xe=xe||pe,ve=ve||q,qe=qe||Q,(pe!==p||xe!==_)&&(i.blendEquationSeparate(te[pe],te[xe]),p=pe,_=xe),(q!==S||Q!==y||ve!==L||qe!==w)&&(i.blendFuncSeparate(oe[q],oe[Q],oe[ve],oe[qe]),S=q,y=Q,L=ve,w=qe),(At.equals(R)===!1||Ht!==P)&&(i.blendColor(At.r,At.g,At.b,Ht),R.copy(At),P=Ht),m=D,E=!1}function Ae(D,pe){D.side===$t?Fe(i.CULL_FACE):ue(i.CULL_FACE);let q=D.side===tn;pe&&(q=!q),re(q),D.blending===Os&&D.transparent===!1?A(Fn):A(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let Q=D.stencilWrite;a.setTest(Q),Q&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Oe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):Fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function re(D){M!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),M=D)}function be(D){D!==lm?(ue(i.CULL_FACE),D!==I&&(D===Zh?i.cullFace(i.BACK):D===um?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Fe(i.CULL_FACE),I=D}function de(D){D!==U&&(V&&i.lineWidth(D),U=D)}function Oe(D,pe,q){D?(ue(i.POLYGON_OFFSET_FILL),(B!==pe||k!==q)&&(i.polygonOffset(pe,q),B=pe,k=q)):Fe(i.POLYGON_OFFSET_FILL)}function Se(D){D?ue(i.SCISSOR_TEST):Fe(i.SCISSOR_TEST)}function T(D){D===void 0&&(D=i.TEXTURE0+$-1),le!==D&&(i.activeTexture(D),le=D)}function v(D,pe,q){q===void 0&&(le===null?q=i.TEXTURE0+$-1:q=le);let Q=fe[q];Q===void 0&&(Q={type:void 0,texture:void 0},fe[q]=Q),(Q.type!==D||Q.texture!==pe)&&(le!==q&&(i.activeTexture(q),le=q),i.bindTexture(D,pe||Te[D]),Q.type=D,Q.texture=pe)}function H(){let D=fe[le];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function we(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Y(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(D){rt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),rt.copy(D))}function ae(D){j.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),j.copy(D))}function ze(D,pe){let q=l.get(pe);q===void 0&&(q=new WeakMap,l.set(pe,q));let Q=q.get(D);Q===void 0&&(Q=i.getUniformBlockIndex(pe,D.name),q.set(D,Q))}function He(D,pe){let Q=l.get(pe).get(D);c.get(pe)!==Q&&(i.uniformBlockBinding(pe,Q,D.__bindingPointIndex),c.set(pe,Q))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},le=null,fe={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,S=null,y=null,_=null,L=null,w=null,R=new Re(0,0,0),P=0,E=!1,M=null,I=null,U=null,B=null,k=null,rt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ue,disable:Fe,bindFramebuffer:Ve,drawBuffers:Be,useProgram:Qe,setBlending:A,setMaterial:Ae,setFlipSided:re,setCullFace:be,setLineWidth:de,setPolygonOffset:Oe,setScissorTest:Se,activeTexture:T,bindTexture:v,unbindTexture:H,compressedTexImage2D:Z,compressedTexImage3D:ie,texImage2D:Y,texImage3D:ne,updateUBOMapping:ze,uniformBlockBinding:He,texStorage2D:J,texStorage3D:z,texSubImage2D:K,texSubImage3D:we,compressedTexSubImage2D:ge,compressedTexSubImage3D:F,scissor:me,viewport:ae,reset:Xe}}function Yd(i,e,t,n){let s=Yv(n);switch(t){case Rf:return i*e;case If:return i*e;case Pf:return i*e*2;case Eu:return i*e/s.components*s.byteLength;case Tu:return i*e/s.components*s.byteLength;case Lf:return i*e*2/s.components*s.byteLength;case wu:return i*e*2/s.components*s.byteLength;case Cf:return i*e*3/s.components*s.byteLength;case gn:return i*e*4/s.components*s.byteLength;case Au:return i*e*4/s.components*s.byteLength;case ta:case na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ia:case sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case il:case rl:return Math.max(i,16)*Math.max(e,8)/4;case nl:case sl:return Math.max(i,8)*Math.max(e,8)/2;case ol:case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case dl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ra:case bl:case El:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Df:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case wl:case Al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yv(i){switch(i){case si:case Tf:return{byteLength:1,components:1};case Wr:case wf:case In:return{byteLength:2,components:1};case Su:case bu:return{byteLength:2,components:4};case ts:case Mu:case Cn:return{byteLength:4,components:1};case Af:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Zv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ee,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return f?new OffscreenCanvas(T,v):Xr("canvas")}function x(T,v,H){let Z=1,ie=Se(T);if((ie.width>H||ie.height>H)&&(Z=H/Math.max(ie.width,ie.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let K=Math.floor(Z*ie.width),we=Math.floor(Z*ie.height);h===void 0&&(h=g(K,we));let ge=v?g(K,we):h;return ge.width=K,ge.height=we,ge.getContext("2d").drawImage(T,0,0,K,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+K+"x"+we+")."),ge}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(T,v,H,Z,ie=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=v;if(v===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8)),v===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),v===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8)),v===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),v===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGB8UI),H===i.UNSIGNED_SHORT&&(K=i.RGB16UI),H===i.UNSIGNED_INT&&(K=i.RGB32UI),H===i.BYTE&&(K=i.RGB8I),H===i.SHORT&&(K=i.RGB16I),H===i.INT&&(K=i.RGB32I)),v===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),H===i.UNSIGNED_INT&&(K=i.RGBA32UI),H===i.BYTE&&(K=i.RGBA8I),H===i.SHORT&&(K=i.RGBA16I),H===i.INT&&(K=i.RGBA32I)),v===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),v===i.RGBA){let we=ie?za:je.getTransfer(Z);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=we===dt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function _(T,v){let H;return T?v===null||v===ts||v===Ws?H=i.DEPTH24_STENCIL8:v===Cn?H=i.DEPTH32F_STENCIL8:v===Wr&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ts||v===Ws?H=i.DEPTH_COMPONENT24:v===Cn?H=i.DEPTH_COMPONENT32F:v===Wr&&(H=i.DEPTH_COMPONENT16),H}function L(T,v){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Gt&&T.minFilter!==en?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function w(T){let v=T.target;v.removeEventListener("dispose",w),P(v),v.isVideoTexture&&u.delete(v)}function R(T){let v=T.target;v.removeEventListener("dispose",R),M(v)}function P(T){let v=n.get(T);if(v.__webglInit===void 0)return;let H=T.source,Z=d.get(H);if(Z){let ie=Z[v.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&E(T),Object.keys(Z).length===0&&d.delete(H)}n.remove(T)}function E(T){let v=n.get(T);i.deleteTexture(v.__webglTexture);let H=T.source,Z=d.get(H);delete Z[v.__cacheKey],o.memory.textures--}function M(T){let v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let ie=0;ie<v.__webglFramebuffer[Z].length;ie++)i.deleteFramebuffer(v.__webglFramebuffer[Z][ie]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let H=T.textures;for(let Z=0,ie=H.length;Z<ie;Z++){let K=n.get(H[Z]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(H[Z])}n.remove(T)}let I=0;function U(){I=0}function B(){let T=I;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),I+=1,T}function k(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function $(T,v){let H=n.get(T);if(T.isVideoTexture&&de(T),T.isRenderTargetTexture===!1&&T.version>0&&H.__version!==T.version){let Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(H,T,v);return}}t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+v)}function V(T,v){let H=n.get(T);if(T.version>0&&H.__version!==T.version){j(H,T,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+v)}function se(T,v){let H=n.get(T);if(T.version>0&&H.__version!==T.version){j(H,T,v);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+v)}function X(T,v){let H=n.get(T);if(T.version>0&&H.__version!==T.version){ce(H,T,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+v)}let le={[ln]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[Gr]:i.MIRRORED_REPEAT},fe={[Gt]:i.NEAREST,[yu]:i.NEAREST_MIPMAP_NEAREST,[Us]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[Fr]:i.LINEAR_MIPMAP_NEAREST,[Nn]:i.LINEAR_MIPMAP_LINEAR},Ee={[Om]:i.NEVER,[Gm]:i.ALWAYS,[Bm]:i.LESS,[Ff]:i.LEQUAL,[zm]:i.EQUAL,[Vm]:i.GEQUAL,[Hm]:i.GREATER,[km]:i.NOTEQUAL};function Ge(T,v){if(v.type===Cn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===en||v.magFilter===Fr||v.magFilter===Us||v.magFilter===Nn||v.minFilter===en||v.minFilter===Fr||v.minFilter===Us||v.minFilter===Nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,le[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,le[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,le[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,fe[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,fe[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Ee[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Gt||v.minFilter!==Us&&v.minFilter!==Nn||v.type===Cn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function rt(T,v){let H=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",w));let Z=v.source,ie=d.get(Z);ie===void 0&&(ie={},d.set(Z,ie));let K=k(v);if(K!==T.__cacheKey){ie[K]===void 0&&(ie[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ie[K].usedTimes++;let we=ie[T.__cacheKey];we!==void 0&&(ie[T.__cacheKey].usedTimes--,we.usedTimes===0&&E(v)),T.__cacheKey=K,T.__webglTexture=ie[K].texture}return H}function j(T,v,H){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);let ie=rt(T,v),K=v.source;t.bindTexture(Z,T.__webglTexture,i.TEXTURE0+H);let we=n.get(K);if(K.version!==we.__version||ie===!0){t.activeTexture(i.TEXTURE0+H);let ge=je.getPrimaries(je.workingColorSpace),F=v.colorSpace===Un?null:je.getPrimaries(v.colorSpace),J=v.colorSpace===Un||ge===F?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let z=x(v.image,!1,s.maxTextureSize);z=Oe(v,z);let Y=r.convert(v.format,v.colorSpace),ne=r.convert(v.type),me=y(v.internalFormat,Y,ne,v.colorSpace,v.isVideoTexture);Ge(Z,v);let ae,ze=v.mipmaps,He=v.isVideoTexture!==!0,Xe=we.__version===void 0||ie===!0,D=K.dataReady,pe=L(v,z);if(v.isDepthTexture)me=_(v.format===Xs,v.type),Xe&&(He?t.texStorage2D(i.TEXTURE_2D,1,me,z.width,z.height):t.texImage2D(i.TEXTURE_2D,0,me,z.width,z.height,0,Y,ne,null));else if(v.isDataTexture)if(ze.length>0){He&&Xe&&t.texStorage2D(i.TEXTURE_2D,pe,me,ze[0].width,ze[0].height);for(let q=0,Q=ze.length;q<Q;q++)ae=ze[q],He?D&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ae.width,ae.height,Y,ne,ae.data):t.texImage2D(i.TEXTURE_2D,q,me,ae.width,ae.height,0,Y,ne,ae.data);v.generateMipmaps=!1}else He?(Xe&&t.texStorage2D(i.TEXTURE_2D,pe,me,z.width,z.height),D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,z.width,z.height,Y,ne,z.data)):t.texImage2D(i.TEXTURE_2D,0,me,z.width,z.height,0,Y,ne,z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){He&&Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,me,ze[0].width,ze[0].height,z.depth);for(let q=0,Q=ze.length;q<Q;q++)if(ae=ze[q],v.format!==gn)if(Y!==null)if(He){if(D)if(v.layerUpdates.size>0){let xe=Yd(ae.width,ae.height,v.format,v.type);for(let ve of v.layerUpdates){let qe=ae.data.subarray(ve*xe/ae.data.BYTES_PER_ELEMENT,(ve+1)*xe/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ve,ae.width,ae.height,1,Y,qe)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ae.width,ae.height,z.depth,Y,ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,me,ae.width,ae.height,z.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ae.width,ae.height,z.depth,Y,ne,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,me,ae.width,ae.height,z.depth,0,Y,ne,ae.data)}else{He&&Xe&&t.texStorage2D(i.TEXTURE_2D,pe,me,ze[0].width,ze[0].height);for(let q=0,Q=ze.length;q<Q;q++)ae=ze[q],v.format!==gn?Y!==null?He?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ae.width,ae.height,Y,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,q,me,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?D&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ae.width,ae.height,Y,ne,ae.data):t.texImage2D(i.TEXTURE_2D,q,me,ae.width,ae.height,0,Y,ne,ae.data)}else if(v.isDataArrayTexture)if(He){if(Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,me,z.width,z.height,z.depth),D)if(v.layerUpdates.size>0){let q=Yd(z.width,z.height,v.format,v.type);for(let Q of v.layerUpdates){let xe=z.data.subarray(Q*q/z.data.BYTES_PER_ELEMENT,(Q+1)*q/z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,z.width,z.height,1,Y,ne,xe)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,z.width,z.height,z.depth,Y,ne,z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,z.width,z.height,z.depth,0,Y,ne,z.data);else if(v.isData3DTexture)He?(Xe&&t.texStorage3D(i.TEXTURE_3D,pe,me,z.width,z.height,z.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,z.width,z.height,z.depth,Y,ne,z.data)):t.texImage3D(i.TEXTURE_3D,0,me,z.width,z.height,z.depth,0,Y,ne,z.data);else if(v.isFramebufferTexture){if(Xe)if(He)t.texStorage2D(i.TEXTURE_2D,pe,me,z.width,z.height);else{let q=z.width,Q=z.height;for(let xe=0;xe<pe;xe++)t.texImage2D(i.TEXTURE_2D,xe,me,q,Q,0,Y,ne,null),q>>=1,Q>>=1}}else if(ze.length>0){if(He&&Xe){let q=Se(ze[0]);t.texStorage2D(i.TEXTURE_2D,pe,me,q.width,q.height)}for(let q=0,Q=ze.length;q<Q;q++)ae=ze[q],He?D&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,Y,ne,ae):t.texImage2D(i.TEXTURE_2D,q,me,Y,ne,ae);v.generateMipmaps=!1}else if(He){if(Xe){let q=Se(z);t.texStorage2D(i.TEXTURE_2D,pe,me,q.width,q.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Y,ne,z)}else t.texImage2D(i.TEXTURE_2D,0,me,Y,ne,z);m(v)&&p(Z),we.__version=K.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ce(T,v,H){if(v.image.length!==6)return;let Z=rt(T,v),ie=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+H);let K=n.get(ie);if(ie.version!==K.__version||Z===!0){t.activeTexture(i.TEXTURE0+H);let we=je.getPrimaries(je.workingColorSpace),ge=v.colorSpace===Un?null:je.getPrimaries(v.colorSpace),F=v.colorSpace===Un||we===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);let J=v.isCompressedTexture||v.image[0].isCompressedTexture,z=v.image[0]&&v.image[0].isDataTexture,Y=[];for(let Q=0;Q<6;Q++)!J&&!z?Y[Q]=x(v.image[Q],!0,s.maxCubemapSize):Y[Q]=z?v.image[Q].image:v.image[Q],Y[Q]=Oe(v,Y[Q]);let ne=Y[0],me=r.convert(v.format,v.colorSpace),ae=r.convert(v.type),ze=y(v.internalFormat,me,ae,v.colorSpace),He=v.isVideoTexture!==!0,Xe=K.__version===void 0||Z===!0,D=ie.dataReady,pe=L(v,ne);Ge(i.TEXTURE_CUBE_MAP,v);let q;if(J){He&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,ze,ne.width,ne.height);for(let Q=0;Q<6;Q++){q=Y[Q].mipmaps;for(let xe=0;xe<q.length;xe++){let ve=q[xe];v.format!==gn?me!==null?He?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,0,0,ve.width,ve.height,me,ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,ze,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,0,0,ve.width,ve.height,me,ae,ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,ze,ve.width,ve.height,0,me,ae,ve.data)}}}else{if(q=v.mipmaps,He&&Xe){q.length>0&&pe++;let Q=Se(Y[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,ze,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(z){He?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Y[Q].width,Y[Q].height,me,ae,Y[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ze,Y[Q].width,Y[Q].height,0,me,ae,Y[Q].data);for(let xe=0;xe<q.length;xe++){let qe=q[xe].image[Q].image;He?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,0,0,qe.width,qe.height,me,ae,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,ze,qe.width,qe.height,0,me,ae,qe.data)}}else{He?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,me,ae,Y[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ze,me,ae,Y[Q]);for(let xe=0;xe<q.length;xe++){let ve=q[xe];He?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,0,0,me,ae,ve.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,ze,me,ae,ve.image[Q])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),K.__version=ie.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Te(T,v,H,Z,ie,K){let we=r.convert(H.format,H.colorSpace),ge=r.convert(H.type),F=y(H.internalFormat,we,ge,H.colorSpace),J=n.get(v),z=n.get(H);if(z.__renderTarget=v,!J.__hasExternalTextures){let Y=Math.max(1,v.width>>K),ne=Math.max(1,v.height>>K);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,K,F,Y,ne,v.depth,0,we,ge,null):t.texImage2D(ie,K,F,Y,ne,0,we,ge,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),be(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ie,z.__webglTexture,0,re(v)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ie,z.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(T,v,H){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){let Z=v.depthTexture,ie=Z&&Z.isDepthTexture?Z.type:null,K=_(v.stencilBuffer,ie),we=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=re(v);be(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge,K,v.width,v.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,K,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,K,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,T)}else{let Z=v.textures;for(let ie=0;ie<Z.length;ie++){let K=Z[ie],we=r.convert(K.format,K.colorSpace),ge=r.convert(K.type),F=y(K.internalFormat,we,ge,K.colorSpace),J=re(v);H&&be(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,F,v.width,v.height):be(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,F,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,F,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=n.get(v.depthTexture);Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),$(v.depthTexture,0);let ie=Z.__webglTexture,K=re(v);if(v.depthTexture.format===Bs)be(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(v.depthTexture.format===Xs)be(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ve(T){let v=n.get(T),H=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let Z=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){let ie=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",ie)};Z.addEventListener("dispose",ie),v.__depthDisposeCallback=ie}v.__boundDepthTexture=Z}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Fe(v.__webglFramebuffer,T)}else if(H){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),ue(v.__webglDepthbuffer[Z],T,!1);else{let ie=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,K)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ue(v.__webglDepthbuffer,T,!1);else{let Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ie)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(T,v,H){let Z=n.get(T);v!==void 0&&Te(Z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ve(T)}function Qe(T){let v=T.texture,H=n.get(T),Z=n.get(v);T.addEventListener("dispose",R);let ie=T.textures,K=T.isWebGLCubeRenderTarget===!0,we=ie.length>1;if(we||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,o.memory.textures++),K){H.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(v.mipmaps&&v.mipmaps.length>0){H.__webglFramebuffer[ge]=[];for(let F=0;F<v.mipmaps.length;F++)H.__webglFramebuffer[ge][F]=i.createFramebuffer()}else H.__webglFramebuffer[ge]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){H.__webglFramebuffer=[];for(let ge=0;ge<v.mipmaps.length;ge++)H.__webglFramebuffer[ge]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(we)for(let ge=0,F=ie.length;ge<F;ge++){let J=n.get(ie[ge]);J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&be(T)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ge=0;ge<ie.length;ge++){let F=ie[ge];H.__webglColorRenderbuffer[ge]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ge]);let J=r.convert(F.format,F.colorSpace),z=r.convert(F.type),Y=y(F.internalFormat,J,z,F.colorSpace,T.isXRRenderTarget===!0),ne=re(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,Y,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,H.__webglColorRenderbuffer[ge])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(H.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ge(i.TEXTURE_CUBE_MAP,v);for(let ge=0;ge<6;ge++)if(v.mipmaps&&v.mipmaps.length>0)for(let F=0;F<v.mipmaps.length;F++)Te(H.__webglFramebuffer[ge][F],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,F);else Te(H.__webglFramebuffer[ge],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(v)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let ge=0,F=ie.length;ge<F;ge++){let J=ie[ge],z=n.get(J);t.bindTexture(i.TEXTURE_2D,z.__webglTexture),Ge(i.TEXTURE_2D,J),Te(H.__webglFramebuffer,T,J,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,0),m(J)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ge=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ge=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Z.__webglTexture),Ge(ge,v),v.mipmaps&&v.mipmaps.length>0)for(let F=0;F<v.mipmaps.length;F++)Te(H.__webglFramebuffer[F],T,v,i.COLOR_ATTACHMENT0,ge,F);else Te(H.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,ge,0);m(v)&&p(ge),t.unbindTexture()}T.depthBuffer&&Ve(T)}function te(T){let v=T.textures;for(let H=0,Z=v.length;H<Z;H++){let ie=v[H];if(m(ie)){let K=S(T),we=n.get(ie).__webglTexture;t.bindTexture(K,we),p(K),t.unbindTexture()}}}let oe=[],A=[];function Ae(T){if(T.samples>0){if(be(T)===!1){let v=T.textures,H=T.width,Z=T.height,ie=i.COLOR_BUFFER_BIT,K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(T),ge=v.length>1;if(ge)for(let F=0;F<v.length;F++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let F=0;F<v.length;F++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),ge){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[F]);let J=n.get(v[F]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,H,Z,0,0,H,Z,ie,i.NEAREST),c===!0&&(oe.length=0,A.length=0,oe.push(i.COLOR_ATTACHMENT0+F),T.depthBuffer&&T.resolveDepthBuffer===!1&&(oe.push(K),A.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,A)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ge)for(let F=0;F<v.length;F++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.RENDERBUFFER,we.__webglColorRenderbuffer[F]);let J=n.get(v[F]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function re(T){return Math.min(s.maxSamples,T.samples)}function be(T){let v=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function de(T){let v=o.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function Oe(T,v){let H=T.colorSpace,Z=T.format,ie=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||H!==Xt&&H!==Un&&(je.getTransfer(H)===dt?(Z!==gn||ie!==si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),v}function Se(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=$,this.setTexture2DArray=V,this.setTexture3D=se,this.setTextureCube=X,this.rebindTextures=Be,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=be}function $v(i,e){function t(n,s=Un){let r,o=je.getTransfer(s);if(n===si)return i.UNSIGNED_BYTE;if(n===Su)return i.UNSIGNED_SHORT_4_4_4_4;if(n===bu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Af)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Tf)return i.BYTE;if(n===wf)return i.SHORT;if(n===Wr)return i.UNSIGNED_SHORT;if(n===Mu)return i.INT;if(n===ts)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===In)return i.HALF_FLOAT;if(n===Rf)return i.ALPHA;if(n===Cf)return i.RGB;if(n===gn)return i.RGBA;if(n===If)return i.LUMINANCE;if(n===Pf)return i.LUMINANCE_ALPHA;if(n===Bs)return i.DEPTH_COMPONENT;if(n===Xs)return i.DEPTH_STENCIL;if(n===Eu)return i.RED;if(n===Tu)return i.RED_INTEGER;if(n===Lf)return i.RG;if(n===wu)return i.RG_INTEGER;if(n===Au)return i.RGBA_INTEGER;if(n===ta||n===na||n===ia||n===sa)if(o===dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nl||n===il||n===sl||n===rl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===nl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===il)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ol||n===al||n===cl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ol||n===al)return o===dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===cl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ll||n===ul||n===hl||n===dl||n===fl||n===pl||n===ml||n===gl||n===xl||n===_l||n===vl||n===yl||n===Ml||n===Sl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ll)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ul)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===dl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ml)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_l)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ml)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sl)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ra||n===bl||n===El)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ra)return o===dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===El)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Df||n===Tl||n===wl||n===Al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ra)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Vl=class extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},xt=class extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Kv={type:"move"},zr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Kv)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new xt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},jv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Gl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new Bt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ut({vertexShader:jv,fragmentShader:Jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ye(new Wt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wl=class extends Ti{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null,x=new Gl,m=t.getContextAttributes(),p=null,S=null,y=[],_=[],L=new ee,w=null,R=new Dt;R.viewport=new lt;let P=new Dt;P.viewport=new lt;let E=[R,P],M=new Vl,I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ce=y[j];return ce===void 0&&(ce=new zr,y[j]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(j){let ce=y[j];return ce===void 0&&(ce=new zr,y[j]=ce),ce.getGripSpace()},this.getHand=function(j){let ce=y[j];return ce===void 0&&(ce=new zr,y[j]=ce),ce.getHandSpace()};function B(j){let ce=_.indexOf(j.inputSource);if(ce===-1)return;let Te=y[ce];Te!==void 0&&(Te.update(j.inputSource,j.frame,l||o),Te.dispatchEvent({type:j.type,data:j.inputSource}))}function k(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",$);for(let j=0;j<y.length;j++){let ce=_[j];ce!==null&&(_[j]=null,y[j].disconnect(ce))}I=null,U=null,x.reset(),e.setRenderTarget(p),f=null,d=null,h=null,s=null,S=null,rt.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",k),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(L),s.renderState.layers===void 0){let ce={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Kt(f.framebufferWidth,f.framebufferHeight,{format:gn,type:si,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ce=null,Te=null,ue=null;m.depth&&(ue=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=m.stencil?Xs:Bs,Te=m.stencil?Ws:ts);let Fe={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Fe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Kt(d.textureWidth,d.textureHeight,{format:gn,type:si,depthTexture:new fa(d.textureWidth,d.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),rt.setContext(s),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function $(j){for(let ce=0;ce<j.removed.length;ce++){let Te=j.removed[ce],ue=_.indexOf(Te);ue>=0&&(_[ue]=null,y[ue].disconnect(Te))}for(let ce=0;ce<j.added.length;ce++){let Te=j.added[ce],ue=_.indexOf(Te);if(ue===-1){for(let Ve=0;Ve<y.length;Ve++)if(Ve>=_.length){_.push(Te),ue=Ve;break}else if(_[Ve]===null){_[Ve]=Te,ue=Ve;break}if(ue===-1)break}let Fe=y[ue];Fe&&Fe.connect(Te)}}let V=new C,se=new C;function X(j,ce,Te){V.setFromMatrixPosition(ce.matrixWorld),se.setFromMatrixPosition(Te.matrixWorld);let ue=V.distanceTo(se),Fe=ce.projectionMatrix.elements,Ve=Te.projectionMatrix.elements,Be=Fe[14]/(Fe[10]-1),Qe=Fe[14]/(Fe[10]+1),te=(Fe[9]+1)/Fe[5],oe=(Fe[9]-1)/Fe[5],A=(Fe[8]-1)/Fe[0],Ae=(Ve[8]+1)/Ve[0],re=Be*A,be=Be*Ae,de=ue/(-A+Ae),Oe=de*-A;if(ce.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Oe),j.translateZ(de),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Fe[10]===-1)j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{let Se=Be+de,T=Qe+de,v=re-Oe,H=be+(ue-Oe),Z=te*Qe/T*Se,ie=oe*Qe/T*Se;j.projectionMatrix.makePerspective(v,H,Z,ie,Se,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function le(j,ce){ce===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ce.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ce=j.near,Te=j.far;x.texture!==null&&(x.depthNear>0&&(ce=x.depthNear),x.depthFar>0&&(Te=x.depthFar)),M.near=P.near=R.near=ce,M.far=P.far=R.far=Te,(I!==M.near||U!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,U=M.far),R.layers.mask=j.layers.mask|2,P.layers.mask=j.layers.mask|4,M.layers.mask=R.layers.mask|P.layers.mask;let ue=j.parent,Fe=M.cameras;le(M,ue);for(let Ve=0;Ve<Fe.length;Ve++)le(Fe[Ve],ue);Fe.length===2?X(M,R,P):M.projectionMatrix.copy(R.projectionMatrix),fe(j,M,ue)};function fe(j,ce,Te){Te===null?j.matrix.copy(ce.matrixWorld):(j.matrix.copy(Te.matrixWorld),j.matrix.invert(),j.matrix.multiply(ce.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ce.projectionMatrix),j.projectionMatrixInverse.copy(ce.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Zs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let Ee=null;function Ge(j,ce){if(u=ce.getViewerPose(l||o),g=ce,u!==null){let Te=u.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let ue=!1;Te.length!==M.cameras.length&&(M.cameras.length=0,ue=!0);for(let Ve=0;Ve<Te.length;Ve++){let Be=Te[Ve],Qe=null;if(f!==null)Qe=f.getViewport(Be);else{let oe=h.getViewSubImage(d,Be);Qe=oe.viewport,Ve===0&&(e.setRenderTargetTextures(S,oe.colorTexture,d.ignoreDepthValues?void 0:oe.depthStencilTexture),e.setRenderTarget(S))}let te=E[Ve];te===void 0&&(te=new Dt,te.layers.enable(Ve),te.viewport=new lt,E[Ve]=te),te.matrix.fromArray(Be.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Be.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Ve===0&&(M.matrix.copy(te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ue===!0&&M.cameras.push(te)}let Fe=s.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")){let Ve=h.getDepthInformation(Te[0]);Ve&&Ve.isValid&&Ve.texture&&x.init(e,Ve,s.renderState)}}for(let Te=0;Te<y.length;Te++){let ue=_[Te],Fe=y[Te];ue!==null&&Fe!==void 0&&Fe.update(ue,ce,l||o)}Ee&&Ee(j,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),g=null}let rt=new kf;rt.setAnimationLoop(Ge),this.setAnimationLoop=function(j){Ee=j},this.dispose=function(){}}},ji=new Bn,Qv=new ke;function ey(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Hf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,S,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=e.get(p),y=S.envMap,_=S.envMapRotation;y&&(m.envMap.value=y,ji.copy(_),ji.x*=-1,ji.y*=-1,ji.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),m.envMapRotation.value.setFromMatrix4(Qv.makeRotationFromEuler(ji)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ty(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,y){let _=y.program;n.uniformBlockBinding(S,_)}function l(S,y){let _=s[S.id];_===void 0&&(g(S),_=u(S),s[S.id]=_,S.addEventListener("dispose",m));let L=y.program;n.updateUBOMapping(S,L);let w=e.render.frame;r[S.id]!==w&&(d(S),r[S.id]=w)}function u(S){let y=h();S.__bindingPointIndex=y;let _=i.createBuffer(),L=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,L,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let y=s[S.id],_=S.uniforms,L=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,R=_.length;w<R;w++){let P=Array.isArray(_[w])?_[w]:[_[w]];for(let E=0,M=P.length;E<M;E++){let I=P[E];if(f(I,w,E,L)===!0){let U=I.__offset,B=Array.isArray(I.value)?I.value:[I.value],k=0;for(let $=0;$<B.length;$++){let V=B[$],se=x(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,U+k,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,k),k+=se.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,y,_,L){let w=S.value,R=y+"_"+_;if(L[R]===void 0)return typeof w=="number"||typeof w=="boolean"?L[R]=w:L[R]=w.clone(),!0;{let P=L[R];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return L[R]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(S){let y=S.uniforms,_=0,L=16;for(let R=0,P=y.length;R<P;R++){let E=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,I=E.length;M<I;M++){let U=E[M],B=Array.isArray(U.value)?U.value:[U.value];for(let k=0,$=B.length;k<$;k++){let V=B[k],se=x(V),X=_%L,le=X%se.boundary,fe=X+le;_+=le,fe!==0&&L-fe<se.storage&&(_+=L-fe),U.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=se.storage}}}let w=_%L;return w>0&&(_+=L-w),S.__size=_,S.__cache={},this}function x(S){let y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){let y=S.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var pa=class{constructor(e={}){let{canvas:t=o0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,S=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=mt,this.toneMapping=bi,this.toneMappingExposure=1;let _=this,L=!1,w=0,R=0,P=null,E=-1,M=null,I=new lt,U=new lt,B=null,k=new Re(0),$=0,V=t.width,se=t.height,X=1,le=null,fe=null,Ee=new lt(0,0,V,se),Ge=new lt(0,0,V,se),rt=!1,j=new Yr,ce=!1,Te=!1,ue=new ke,Fe=new ke,Ve=new C,Be=new lt,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},te=!1;function oe(){return P===null?X:1}let A=n;function Ae(b,N){return t.getContext(b,N)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${fu}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",ve,!1),A===null){let N="webgl2";if(A=Ae(N,b),A===null)throw Ae(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let re,be,de,Oe,Se,T,v,H,Z,ie,K,we,ge,F,J,z,Y,ne,me,ae,ze,He,Xe,D;function pe(){re=new x_(A),re.init(),He=new $v(A,re),be=new h_(A,re,e,He),de=new qv(A,re),be.reverseDepthBuffer&&d&&de.buffers.depth.setReversed(!0),Oe=new y_(A),Se=new Dv,T=new Zv(A,re,de,Se,be,He,Oe),v=new f_(_),H=new g_(_),Z=new A0(A),Xe=new l_(A,Z),ie=new __(A,Z,Oe,Xe),K=new S_(A,ie,Z,Oe),me=new M_(A,be,T),z=new d_(Se),we=new Lv(_,v,H,re,be,Xe,z),ge=new ey(_,Se),F=new Nv,J=new kv(re),ne=new c_(_,v,H,de,K,f,c),Y=new Wv(_,K,be),D=new ty(A,Oe,be,de),ae=new u_(A,re,Oe),ze=new v_(A,re,Oe),Oe.programs=we.programs,_.capabilities=be,_.extensions=re,_.properties=Se,_.renderLists=F,_.shadowMap=Y,_.state=de,_.info=Oe}pe();let q=new Wl(_,A);this.xr=q,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let b=re.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=re.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(b){b!==void 0&&(X=b,this.setSize(V,se,!1))},this.getSize=function(b){return b.set(V,se)},this.setSize=function(b,N,G=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,se=N,t.width=Math.floor(b*X),t.height=Math.floor(N*X),G===!0&&(t.style.width=b+"px",t.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(V*X,se*X).floor()},this.setDrawingBufferSize=function(b,N,G){V=b,se=N,X=G,t.width=Math.floor(b*G),t.height=Math.floor(N*G),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(Ee)},this.setViewport=function(b,N,G,W){b.isVector4?Ee.set(b.x,b.y,b.z,b.w):Ee.set(b,N,G,W),de.viewport(I.copy(Ee).multiplyScalar(X).round())},this.getScissor=function(b){return b.copy(Ge)},this.setScissor=function(b,N,G,W){b.isVector4?Ge.set(b.x,b.y,b.z,b.w):Ge.set(b,N,G,W),de.scissor(U.copy(Ge).multiplyScalar(X).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(b){de.setScissorTest(rt=b)},this.setOpaqueSort=function(b){le=b},this.setTransparentSort=function(b){fe=b},this.getClearColor=function(b){return b.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor.apply(ne,arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha.apply(ne,arguments)},this.clear=function(b=!0,N=!0,G=!0){let W=0;if(b){let O=!1;if(P!==null){let he=P.texture.format;O=he===Au||he===wu||he===Tu}if(O){let he=P.texture.type,Me=he===si||he===ts||he===Wr||he===Ws||he===Su||he===bu,Ce=ne.getClearColor(),Ie=ne.getClearAlpha(),We=Ce.r,Ye=Ce.g,Pe=Ce.b;Me?(g[0]=We,g[1]=Ye,g[2]=Pe,g[3]=Ie,A.clearBufferuiv(A.COLOR,0,g)):(x[0]=We,x[1]=Ye,x[2]=Pe,x[3]=Ie,A.clearBufferiv(A.COLOR,0,x))}else W|=A.COLOR_BUFFER_BIT}N&&(W|=A.DEPTH_BUFFER_BIT),G&&(W|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),F.dispose(),J.dispose(),Se.dispose(),v.dispose(),H.dispose(),K.dispose(),Xe.dispose(),D.dispose(),we.dispose(),q.dispose(),q.removeEventListener("sessionstart",zh),q.removeEventListener("sessionend",Hh),Xi.stop()};function Q(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;let b=Oe.autoReset,N=Y.enabled,G=Y.autoUpdate,W=Y.needsUpdate,O=Y.type;pe(),Oe.autoReset=b,Y.enabled=N,Y.autoUpdate=G,Y.needsUpdate=W,Y.type=O}function ve(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function qe(b){let N=b.target;N.removeEventListener("dispose",qe),At(N)}function At(b){Ht(b),Se.remove(b)}function Ht(b){let N=Se.get(b).programs;N!==void 0&&(N.forEach(function(G){we.releaseProgram(G)}),b.isShaderMaterial&&we.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,G,W,O,he){N===null&&(N=Qe);let Me=O.isMesh&&O.matrixWorld.determinant()<0,Ce=Qp(b,N,G,W,O);de.setMaterial(W,Me);let Ie=G.index,We=1;if(W.wireframe===!0){if(Ie=ie.getWireframeAttribute(G),Ie===void 0)return;We=2}let Ye=G.drawRange,Pe=G.attributes.position,at=Ye.start*We,_t=(Ye.start+Ye.count)*We;he!==null&&(at=Math.max(at,he.start*We),_t=Math.min(_t,(he.start+he.count)*We)),Ie!==null?(at=Math.max(at,0),_t=Math.min(_t,Ie.count)):Pe!=null&&(at=Math.max(at,0),_t=Math.min(_t,Pe.count));let St=_t-at;if(St<0||St===1/0)return;Xe.setup(O,W,Ce,G,Ie);let Qt,ut=ae;if(Ie!==null&&(Qt=Z.get(Ie),ut=ze,ut.setIndex(Qt)),O.isMesh)W.wireframe===!0?(de.setLineWidth(W.wireframeLinewidth*oe()),ut.setMode(A.LINES)):ut.setMode(A.TRIANGLES);else if(O.isLine){let Ue=W.linewidth;Ue===void 0&&(Ue=1),de.setLineWidth(Ue*oe()),O.isLineSegments?ut.setMode(A.LINES):O.isLineLoop?ut.setMode(A.LINE_LOOP):ut.setMode(A.LINE_STRIP)}else O.isPoints?ut.setMode(A.POINTS):O.isSprite&&ut.setMode(A.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ut.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(re.get("WEBGL_multi_draw"))ut.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Ue=O._multiDrawStarts,Xn=O._multiDrawCounts,ht=O._multiDrawCount,En=Ie?Z.get(Ie).bytesPerElement:1,fs=Se.get(W).currentProgram.getUniforms();for(let on=0;on<ht;on++)fs.setValue(A,"_gl_DrawID",on),ut.render(Ue[on]/En,Xn[on])}else if(O.isInstancedMesh)ut.renderInstances(at,St,O.count);else if(G.isInstancedBufferGeometry){let Ue=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Xn=Math.min(G.instanceCount,Ue);ut.renderInstances(at,St,Xn)}else ut.render(at,St)};function ft(b,N,G){b.transparent===!0&&b.side===$t&&b.forceSinglePass===!1?(b.side=tn,b.needsUpdate=!0,Mo(b,N,G),b.side=On,b.needsUpdate=!0,Mo(b,N,G),b.side=$t):Mo(b,N,G)}this.compile=function(b,N,G=null){G===null&&(G=b),p=J.get(G),p.init(N),y.push(p),G.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),b!==G&&b.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();let W=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let he=O.material;if(he)if(Array.isArray(he))for(let Me=0;Me<he.length;Me++){let Ce=he[Me];ft(Ce,G,O),W.add(Ce)}else ft(he,G,O),W.add(he)}),y.pop(),p=null,W},this.compileAsync=function(b,N,G=null){let W=this.compile(b,N,G);return new Promise(O=>{function he(){if(W.forEach(function(Me){Se.get(Me).currentProgram.isReady()&&W.delete(Me)}),W.size===0){O(b);return}setTimeout(he,10)}re.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let bn=null;function Wn(b){bn&&bn(b)}function zh(){Xi.stop()}function Hh(){Xi.start()}let Xi=new kf;Xi.setAnimationLoop(Wn),typeof self<"u"&&Xi.setContext(self),this.setAnimationLoop=function(b){bn=b,q.setAnimationLoop(b),b===null?Xi.stop():Xi.start()},q.addEventListener("sessionstart",zh),q.addEventListener("sessionend",Hh),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(N),N=q.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,N,P),p=J.get(b,y.length),p.init(N),y.push(p),Fe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),j.setFromProjectionMatrix(Fe),Te=this.localClippingEnabled,ce=z.init(this.clippingPlanes,Te),m=F.get(b,S.length),m.init(),S.push(m),q.enabled===!0&&q.isPresenting===!0){let he=_.xr.getDepthSensingMesh();he!==null&&lc(he,N,-1/0,_.sortObjects)}lc(b,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(le,fe),te=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,te&&ne.addToRenderList(m,b),this.info.render.frame++,ce===!0&&z.beginShadows();let G=p.state.shadowsArray;Y.render(G,b,N),ce===!0&&z.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,O=m.transmissive;if(p.setupLights(),N.isArrayCamera){let he=N.cameras;if(O.length>0)for(let Me=0,Ce=he.length;Me<Ce;Me++){let Ie=he[Me];Vh(W,O,b,Ie)}te&&ne.render(b);for(let Me=0,Ce=he.length;Me<Ce;Me++){let Ie=he[Me];kh(m,b,Ie,Ie.viewport)}}else O.length>0&&Vh(W,O,b,N),te&&ne.render(b),kh(m,b,N);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(_,b,N),Xe.resetDefaultState(),E=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],ce===!0&&z.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function lc(b,N,G,W){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||j.intersectsSprite(b)){W&&Be.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Fe);let Me=K.update(b),Ce=b.material;Ce.visible&&m.push(b,Me,Ce,G,Be.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||j.intersectsObject(b))){let Me=K.update(b),Ce=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Be.copy(b.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Be.copy(Me.boundingSphere.center)),Be.applyMatrix4(b.matrixWorld).applyMatrix4(Fe)),Array.isArray(Ce)){let Ie=Me.groups;for(let We=0,Ye=Ie.length;We<Ye;We++){let Pe=Ie[We],at=Ce[Pe.materialIndex];at&&at.visible&&m.push(b,Me,at,G,Be.z,Pe)}}else Ce.visible&&m.push(b,Me,Ce,G,Be.z,null)}}let he=b.children;for(let Me=0,Ce=he.length;Me<Ce;Me++)lc(he[Me],N,G,W)}function kh(b,N,G,W){let O=b.opaque,he=b.transmissive,Me=b.transparent;p.setupLightsView(G),ce===!0&&z.setGlobalState(_.clippingPlanes,G),W&&de.viewport(I.copy(W)),O.length>0&&yo(O,N,G),he.length>0&&yo(he,N,G),Me.length>0&&yo(Me,N,G),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Vh(b,N,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Kt(1,1,{generateMipmaps:!0,type:re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float")?In:si,minFilter:Nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));let he=p.state.transmissionRenderTarget[W.id],Me=W.viewport||I;he.setSize(Me.z,Me.w);let Ce=_.getRenderTarget();_.setRenderTarget(he),_.getClearColor(k),$=_.getClearAlpha(),$<1&&_.setClearColor(16777215,.5),_.clear(),te&&ne.render(G);let Ie=_.toneMapping;_.toneMapping=bi;let We=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),ce===!0&&z.setGlobalState(_.clippingPlanes,W),yo(b,G,W),T.updateMultisampleRenderTarget(he),T.updateRenderTargetMipmap(he),re.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let Pe=0,at=N.length;Pe<at;Pe++){let _t=N[Pe],St=_t.object,Qt=_t.geometry,ut=_t.material,Ue=_t.group;if(ut.side===$t&&St.layers.test(W.layers)){let Xn=ut.side;ut.side=tn,ut.needsUpdate=!0,Gh(St,G,W,Qt,ut,Ue),ut.side=Xn,ut.needsUpdate=!0,Ye=!0}}Ye===!0&&(T.updateMultisampleRenderTarget(he),T.updateRenderTargetMipmap(he))}_.setRenderTarget(Ce),_.setClearColor(k,$),We!==void 0&&(W.viewport=We),_.toneMapping=Ie}function yo(b,N,G){let W=N.isScene===!0?N.overrideMaterial:null;for(let O=0,he=b.length;O<he;O++){let Me=b[O],Ce=Me.object,Ie=Me.geometry,We=W===null?Me.material:W,Ye=Me.group;Ce.layers.test(G.layers)&&Gh(Ce,N,G,Ie,We,Ye)}}function Gh(b,N,G,W,O,he){b.onBeforeRender(_,N,G,W,O,he),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(_,N,G,W,b,he),O.transparent===!0&&O.side===$t&&O.forceSinglePass===!1?(O.side=tn,O.needsUpdate=!0,_.renderBufferDirect(G,N,W,O,b,he),O.side=On,O.needsUpdate=!0,_.renderBufferDirect(G,N,W,O,b,he),O.side=$t):_.renderBufferDirect(G,N,W,O,b,he),b.onAfterRender(_,N,G,W,O,he)}function Mo(b,N,G){N.isScene!==!0&&(N=Qe);let W=Se.get(b),O=p.state.lights,he=p.state.shadowsArray,Me=O.state.version,Ce=we.getParameters(b,O.state,he,N,G),Ie=we.getProgramCacheKey(Ce),We=W.programs;W.environment=b.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(b.isMeshStandardMaterial?H:v).get(b.envMap||W.environment),W.envMapRotation=W.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,We===void 0&&(b.addEventListener("dispose",qe),We=new Map,W.programs=We);let Ye=We.get(Ie);if(Ye!==void 0){if(W.currentProgram===Ye&&W.lightsStateVersion===Me)return Xh(b,Ce),Ye}else Ce.uniforms=we.getUniforms(b),b.onBeforeCompile(Ce,_),Ye=we.acquireProgram(Ce,Ie),We.set(Ie,Ye),W.uniforms=Ce.uniforms;let Pe=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pe.clippingPlanes=z.uniform),Xh(b,Ce),W.needsLights=tm(b),W.lightsStateVersion=Me,W.needsLights&&(Pe.ambientLightColor.value=O.state.ambient,Pe.lightProbe.value=O.state.probe,Pe.directionalLights.value=O.state.directional,Pe.directionalLightShadows.value=O.state.directionalShadow,Pe.spotLights.value=O.state.spot,Pe.spotLightShadows.value=O.state.spotShadow,Pe.rectAreaLights.value=O.state.rectArea,Pe.ltc_1.value=O.state.rectAreaLTC1,Pe.ltc_2.value=O.state.rectAreaLTC2,Pe.pointLights.value=O.state.point,Pe.pointLightShadows.value=O.state.pointShadow,Pe.hemisphereLights.value=O.state.hemi,Pe.directionalShadowMap.value=O.state.directionalShadowMap,Pe.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Pe.spotShadowMap.value=O.state.spotShadowMap,Pe.spotLightMatrix.value=O.state.spotLightMatrix,Pe.spotLightMap.value=O.state.spotLightMap,Pe.pointShadowMap.value=O.state.pointShadowMap,Pe.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=Ye,W.uniformsList=null,Ye}function Wh(b){if(b.uniformsList===null){let N=b.currentProgram.getUniforms();b.uniformsList=Hs.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function Xh(b,N){let G=Se.get(b);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function Qp(b,N,G,W,O){N.isScene!==!0&&(N=Qe),T.resetTextureUnits();let he=N.fog,Me=W.isMeshStandardMaterial?N.environment:null,Ce=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Xt,Ie=(W.isMeshStandardMaterial?H:v).get(W.envMap||Me),We=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ye=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pe=!!G.morphAttributes.position,at=!!G.morphAttributes.normal,_t=!!G.morphAttributes.color,St=bi;W.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(St=_.toneMapping);let Qt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=Qt!==void 0?Qt.length:0,Ue=Se.get(W),Xn=p.state.lights;if(ce===!0&&(Te===!0||b!==M)){let pn=b===M&&W.id===E;z.setState(W,b,pn)}let ht=!1;W.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Xn.state.version||Ue.outputColorSpace!==Ce||O.isBatchedMesh&&Ue.batching===!1||!O.isBatchedMesh&&Ue.batching===!0||O.isBatchedMesh&&Ue.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ue.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ue.instancing===!1||!O.isInstancedMesh&&Ue.instancing===!0||O.isSkinnedMesh&&Ue.skinning===!1||!O.isSkinnedMesh&&Ue.skinning===!0||O.isInstancedMesh&&Ue.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ue.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ue.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ue.instancingMorph===!1&&O.morphTexture!==null||Ue.envMap!==Ie||W.fog===!0&&Ue.fog!==he||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==z.numPlanes||Ue.numIntersection!==z.numIntersection)||Ue.vertexAlphas!==We||Ue.vertexTangents!==Ye||Ue.morphTargets!==Pe||Ue.morphNormals!==at||Ue.morphColors!==_t||Ue.toneMapping!==St||Ue.morphTargetsCount!==ut)&&(ht=!0):(ht=!0,Ue.__version=W.version);let En=Ue.currentProgram;ht===!0&&(En=Mo(W,N,O));let fs=!1,on=!1,Mr=!1,bt=En.getUniforms(),Ln=Ue.uniforms;if(de.useProgram(En.program)&&(fs=!0,on=!0,Mr=!0),W.id!==E&&(E=W.id,on=!0),fs||M!==b){de.buffers.depth.getReversed()?(ue.copy(b.projectionMatrix),c0(ue),l0(ue),bt.setValue(A,"projectionMatrix",ue)):bt.setValue(A,"projectionMatrix",b.projectionMatrix),bt.setValue(A,"viewMatrix",b.matrixWorldInverse);let fi=bt.map.cameraPosition;fi!==void 0&&fi.setValue(A,Ve.setFromMatrixPosition(b.matrixWorld)),be.logarithmicDepthBuffer&&bt.setValue(A,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&bt.setValue(A,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,on=!0,Mr=!0)}if(O.isSkinnedMesh){bt.setOptional(A,O,"bindMatrix"),bt.setOptional(A,O,"bindMatrixInverse");let pn=O.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),bt.setValue(A,"boneTexture",pn.boneTexture,T))}O.isBatchedMesh&&(bt.setOptional(A,O,"batchingTexture"),bt.setValue(A,"batchingTexture",O._matricesTexture,T),bt.setOptional(A,O,"batchingIdTexture"),bt.setValue(A,"batchingIdTexture",O._indirectTexture,T),bt.setOptional(A,O,"batchingColorTexture"),O._colorsTexture!==null&&bt.setValue(A,"batchingColorTexture",O._colorsTexture,T));let Sr=G.morphAttributes;if((Sr.position!==void 0||Sr.normal!==void 0||Sr.color!==void 0)&&me.update(O,G,En),(on||Ue.receiveShadow!==O.receiveShadow)&&(Ue.receiveShadow=O.receiveShadow,bt.setValue(A,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ln.envMap.value=Ie,Ln.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&N.environment!==null&&(Ln.envMapIntensity.value=N.environmentIntensity),on&&(bt.setValue(A,"toneMappingExposure",_.toneMappingExposure),Ue.needsLights&&em(Ln,Mr),he&&W.fog===!0&&ge.refreshFogUniforms(Ln,he),ge.refreshMaterialUniforms(Ln,W,X,se,p.state.transmissionRenderTarget[b.id]),Hs.upload(A,Wh(Ue),Ln,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Hs.upload(A,Wh(Ue),Ln,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&bt.setValue(A,"center",O.center),bt.setValue(A,"modelViewMatrix",O.modelViewMatrix),bt.setValue(A,"normalMatrix",O.normalMatrix),bt.setValue(A,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let pn=W.uniformsGroups;for(let fi=0,pi=pn.length;fi<pi;fi++){let qh=pn[fi];D.update(qh,En),D.bind(qh,En)}}return En}function em(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function tm(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,N,G){Se.get(b.texture).__webglTexture=N,Se.get(b.depthTexture).__webglTexture=G;let W=Se.get(b);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,N){let G=Se.get(b);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,G=0){P=b,w=N,R=G;let W=!0,O=null,he=!1,Me=!1;if(b){let Ie=Se.get(b);if(Ie.__useDefaultFramebuffer!==void 0)de.bindFramebuffer(A.FRAMEBUFFER,null),W=!1;else if(Ie.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(Ie.__hasExternalTextures)T.rebindTextures(b,Se.get(b.texture).__webglTexture,Se.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Pe=b.depthTexture;if(Ie.__boundDepthTexture!==Pe){if(Pe!==null&&Se.has(Pe)&&(b.width!==Pe.image.width||b.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}let We=b.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Me=!0);let Ye=Se.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ye[N])?O=Ye[N][G]:O=Ye[N],he=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?O=Se.get(b).__webglMultisampledFramebuffer:Array.isArray(Ye)?O=Ye[G]:O=Ye,I.copy(b.viewport),U.copy(b.scissor),B=b.scissorTest}else I.copy(Ee).multiplyScalar(X).floor(),U.copy(Ge).multiplyScalar(X).floor(),B=rt;if(de.bindFramebuffer(A.FRAMEBUFFER,O)&&W&&de.drawBuffers(b,O),de.viewport(I),de.scissor(U),de.setScissorTest(B),he){let Ie=Se.get(b.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ie.__webglTexture,G)}else if(Me){let Ie=Se.get(b.texture),We=N||0;A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,Ie.__webglTexture,G||0,We)}E=-1},this.readRenderTargetPixels=function(b,N,G,W,O,he,Me){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Se.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){de.bindFramebuffer(A.FRAMEBUFFER,Ce);try{let Ie=b.texture,We=Ie.format,Ye=Ie.type;if(!be.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!be.textureTypeReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-W&&G>=0&&G<=b.height-O&&A.readPixels(N,G,W,O,He.convert(We),He.convert(Ye),he)}finally{let Ie=P!==null?Se.get(P).__webglFramebuffer:null;de.bindFramebuffer(A.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(b,N,G,W,O,he,Me){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Se.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){let Ie=b.texture,We=Ie.format,Ye=Ie.type;if(!be.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!be.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=b.width-W&&G>=0&&G<=b.height-O){de.bindFramebuffer(A.FRAMEBUFFER,Ce);let Pe=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Pe),A.bufferData(A.PIXEL_PACK_BUFFER,he.byteLength,A.STREAM_READ),A.readPixels(N,G,W,O,He.convert(We),He.convert(Ye),0);let at=P!==null?Se.get(P).__webglFramebuffer:null;de.bindFramebuffer(A.FRAMEBUFFER,at);let _t=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await a0(A,_t,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Pe),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,he),A.deleteBuffer(Pe),A.deleteSync(_t),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,N=null,G=0){b.isTexture!==!0&&(Ur("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,b=arguments[1]);let W=Math.pow(2,-G),O=Math.floor(b.image.width*W),he=Math.floor(b.image.height*W),Me=N!==null?N.x:0,Ce=N!==null?N.y:0;T.setTexture2D(b,0),A.copyTexSubImage2D(A.TEXTURE_2D,G,0,0,Me,Ce,O,he),de.unbindTexture()},this.copyTextureToTexture=function(b,N,G=null,W=null,O=0){b.isTexture!==!0&&(Ur("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,b=arguments[1],N=arguments[2],O=arguments[3]||0,G=null);let he,Me,Ce,Ie,We,Ye,Pe,at,_t,St=b.isCompressedTexture?b.mipmaps[O]:b.image;G!==null?(he=G.max.x-G.min.x,Me=G.max.y-G.min.y,Ce=G.isBox3?G.max.z-G.min.z:1,Ie=G.min.x,We=G.min.y,Ye=G.isBox3?G.min.z:0):(he=St.width,Me=St.height,Ce=St.depth||1,Ie=0,We=0,Ye=0),W!==null?(Pe=W.x,at=W.y,_t=W.z):(Pe=0,at=0,_t=0);let Qt=He.convert(N.format),ut=He.convert(N.type),Ue;N.isData3DTexture?(T.setTexture3D(N,0),Ue=A.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Ue=A.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Ue=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,N.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,N.unpackAlignment);let Xn=A.getParameter(A.UNPACK_ROW_LENGTH),ht=A.getParameter(A.UNPACK_IMAGE_HEIGHT),En=A.getParameter(A.UNPACK_SKIP_PIXELS),fs=A.getParameter(A.UNPACK_SKIP_ROWS),on=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,St.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,St.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ie),A.pixelStorei(A.UNPACK_SKIP_ROWS,We),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ye);let Mr=b.isDataArrayTexture||b.isData3DTexture,bt=N.isDataArrayTexture||N.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let Ln=Se.get(b),Sr=Se.get(N),pn=Se.get(Ln.__renderTarget),fi=Se.get(Sr.__renderTarget);de.bindFramebuffer(A.READ_FRAMEBUFFER,pn.__webglFramebuffer),de.bindFramebuffer(A.DRAW_FRAMEBUFFER,fi.__webglFramebuffer);for(let pi=0;pi<Ce;pi++)Mr&&A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Se.get(b).__webglTexture,O,Ye+pi),b.isDepthTexture?(bt&&A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Se.get(N).__webglTexture,O,_t+pi),A.blitFramebuffer(Ie,We,he,Me,Pe,at,he,Me,A.DEPTH_BUFFER_BIT,A.NEAREST)):bt?A.copyTexSubImage3D(Ue,O,Pe,at,_t+pi,Ie,We,he,Me):A.copyTexSubImage2D(Ue,O,Pe,at,_t+pi,Ie,We,he,Me);de.bindFramebuffer(A.READ_FRAMEBUFFER,null),de.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else bt?b.isDataTexture||b.isData3DTexture?A.texSubImage3D(Ue,O,Pe,at,_t,he,Me,Ce,Qt,ut,St.data):N.isCompressedArrayTexture?A.compressedTexSubImage3D(Ue,O,Pe,at,_t,he,Me,Ce,Qt,St.data):A.texSubImage3D(Ue,O,Pe,at,_t,he,Me,Ce,Qt,ut,St):b.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,O,Pe,at,he,Me,Qt,ut,St.data):b.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,O,Pe,at,St.width,St.height,Qt,St.data):A.texSubImage2D(A.TEXTURE_2D,O,Pe,at,he,Me,Qt,ut,St);A.pixelStorei(A.UNPACK_ROW_LENGTH,Xn),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,ht),A.pixelStorei(A.UNPACK_SKIP_PIXELS,En),A.pixelStorei(A.UNPACK_SKIP_ROWS,fs),A.pixelStorei(A.UNPACK_SKIP_IMAGES,on),O===0&&N.generateMipmaps&&A.generateMipmap(Ue),de.unbindTexture()},this.copyTextureToTexture3D=function(b,N,G=null,W=null,O=0){return b.isTexture!==!0&&(Ur("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,b=arguments[2],N=arguments[3],O=arguments[4]||0),Ur('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,N,G,W,O)},this.initRenderTarget=function(b){Se.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),de.unbindTexture()},this.resetState=function(){w=0,R=0,P=null,de.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}};var ma=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Re(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ga=class extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},js=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rl,this.updateRanges=[],this.version=0,this.uuid=xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Yt=new C,is=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Rn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Et(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Js=class extends sn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Cs,Ar=new C,Is=new C,Ps=new C,Ls=new ee,Rr=new ee,qf=new ke,Vo=new C,Cr=new C,Go=new C,Zd=new ee,Oc=new ee,$d=new ee,Zr=class extends yt{constructor(e=new Js){if(super(),this.isSprite=!0,this.type="Sprite",Cs===void 0){Cs=new Mt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new js(t,5);Cs.setIndex([0,1,2,0,2,3]),Cs.setAttribute("position",new is(n,3,0,!1)),Cs.setAttribute("uv",new is(n,2,3,!1))}this.geometry=Cs,this.material=e,this.center=new ee(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Is.setFromMatrixScale(this.matrixWorld),qf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Is.multiplyScalar(-Ps.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Wo(Vo.set(-.5,-.5,0),Ps,o,Is,s,r),Wo(Cr.set(.5,-.5,0),Ps,o,Is,s,r),Wo(Go.set(.5,.5,0),Ps,o,Is,s,r),Zd.set(0,0),Oc.set(1,0),$d.set(1,1);let a=e.ray.intersectTriangle(Vo,Cr,Go,!1,Ar);if(a===null&&(Wo(Cr.set(-.5,.5,0),Ps,o,Is,s,r),Oc.set(0,1),a=e.ray.intersectTriangle(Vo,Go,Cr,!1,Ar),a===null))return;let c=e.ray.origin.distanceTo(Ar);c<e.near||c>e.far||t.push({distance:c,point:Ar.clone(),uv:Mi.getInterpolation(Ar,Vo,Cr,Go,Zd,Oc,$d,new ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Wo(i,e,t,n,s,r){Ls.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Rr.x=r*Ls.x-s*Ls.y,Rr.y=s*Ls.x+r*Ls.y):Rr.copy(Ls),i.copy(e),i.x+=Rr.x,i.y+=Rr.y,i.applyMatrix4(qf)}var Kd=new C,jd=new lt,Jd=new lt,ny=new C,Qd=new ke,Xo=new C,Bc=new hn,ef=new ke,zc=new ns,xa=class extends ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jh,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new nn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xo),this.boundingBox.expandByPoint(Xo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xo),this.boundingSphere.expandByPoint(Xo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bc.copy(this.boundingSphere),Bc.applyMatrix4(s),e.ray.intersectsSphere(Bc)!==!1&&(ef.copy(s).invert(),zc.copy(e.ray).applyMatrix4(ef),!(this.boundingBox!==null&&zc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,zc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Lm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;jd.fromBufferAttribute(s.attributes.skinIndex,e),Jd.fromBufferAttribute(s.attributes.skinWeight,e),Kd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Jd.getComponent(r);if(o!==0){let a=jd.getComponent(r);Qd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(ny.copy(Kd).applyMatrix4(Qd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},$r=class extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}},_a=class extends Bt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Gt,u=Gt,h,d){super(null,o,a,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},tf=new ke,iy=new ke,va=class i{constructor(e=[],t=[]){this.uuid=xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:iy;tf.multiplyMatrices(a,t[r]),tf.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new _a(t,e,e,gn,Cn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new $r),this.bones.push(o),this.boneInverses.push(new ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},ss=class extends Et{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ds=new ke,nf=new ke,qo=[],sf=new nn,sy=new ke,Ir=new ye,Pr=new hn,Qs=class extends ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ss(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,sy)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),sf.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(sf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),Pr.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(Pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Ir.geometry=this.geometry,Ir.material=this.material,Ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pr.copy(this.boundingSphere),Pr.applyMatrix4(n),e.ray.intersectsSphere(Pr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ds),nf.multiplyMatrices(n,Ds),Ir.matrixWorld=nf,Ir.raycast(e,qo);for(let o=0,a=qo.length;o<a;o++){let c=qo[o];c.instanceId=r,c.object=this,t.push(c)}qo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ss(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new _a(new Float32Array(s*this.count),s,this.count,Eu,Cn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Kr=class extends sn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ya=new C,Ma=new C,rf=new ke,Lr=new ns,Yo=new hn,Hc=new C,of=new C,er=class extends yt{constructor(e=new Mt,t=new Kr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ya.fromBufferAttribute(t,s-1),Ma.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ya.distanceTo(Ma);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(s),Yo.radius+=r,e.ray.intersectsSphere(Yo)===!1)return;rf.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(rf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=u.getX(x),S=u.getX(x+1),y=Zo(this,e,Lr,c,p,S);y&&t.push(y)}if(this.isLineLoop){let x=u.getX(g-1),m=u.getX(f),p=Zo(this,e,Lr,c,x,m);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=Zo(this,e,Lr,c,x,x+1);p&&t.push(p)}if(this.isLineLoop){let x=Zo(this,e,Lr,c,g-1,f);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Zo(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(ya.fromBufferAttribute(o,s),Ma.fromBufferAttribute(o,r),t.distanceSqToSegment(ya,Ma,Hc,of)>n)return;Hc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Hc);if(!(c<e.near||c>e.far))return{distance:c,point:of.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var af=new C,cf=new C,Sa=class extends er{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)af.fromBufferAttribute(t,s),cf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+af.distanceTo(cf);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ba=class extends er{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ai=class extends sn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},lf=new ke,Xl=new ns,$o=new hn,Ko=new C,rs=class extends yt{constructor(e=new Mt,t=new Ai){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$o.copy(n.boundingSphere),$o.applyMatrix4(s),$o.radius+=r,e.ray.intersectsSphere($o)===!1)return;lf.copy(s).invert(),Xl.copy(e.ray).applyMatrix4(lf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=l.getX(g);Ko.fromBufferAttribute(h,m),uf(Ko,m,c,s,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=d,x=f;g<x;g++)Ko.fromBufferAttribute(h,g),uf(Ko,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function uf(i,e,t,n,s,r,o){let a=Xl.distanceSqToPoint(i);if(a<t){let c=new C;Xl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var zn=class extends Bt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},_n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let u=n[s],d=n[s+1]-u,f=(o-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ee:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new C,s=[],r=[],o=[],a=new C,c=new ke;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Lt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Lt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},jr=class extends _n{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ee){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ql=class extends jr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Iu(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let d=(o-r)/l-(a-r)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+h)+(c-a)/h;d*=u,f*=u,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var jo=new C,kc=new Iu,Vc=new Iu,Gc=new Iu,Yl=class extends _n{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(jo.subVectors(s[0],s[1]).add(s[0]),l=jo);let h=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(jo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=jo),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),kc.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,x,m),Vc.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,x,m),Gc.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(kc.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Vc.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Gc.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(kc.calc(c),Vc.calc(c),Gc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function hf(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function ry(i,e){let t=1-i;return t*t*e}function oy(i,e){return 2*(1-i)*i*e}function ay(i,e){return i*i*e}function Hr(i,e,t,n){return ry(i,e)+oy(i,t)+ay(i,n)}function cy(i,e){let t=1-i;return t*t*t*e}function ly(i,e){let t=1-i;return 3*t*t*i*e}function uy(i,e){return 3*(1-i)*i*i*e}function hy(i,e){return i*i*i*e}function kr(i,e,t,n,s){return cy(i,e)+ly(i,t)+uy(i,n)+hy(i,s)}var Ea=class extends _n{constructor(e=new ee,t=new ee,n=new ee,s=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ee){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,s.x,r.x,o.x,a.x),kr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Zl=class extends _n{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(e,s.x,r.x,o.x,a.x),kr(e,s.y,r.y,o.y,a.y),kr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ta=class extends _n{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$l=class extends _n{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wa=class extends _n{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Hr(e,s.x,r.x,o.x),Hr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Kl=class extends _n{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Hr(e,s.x,r.x,o.x),Hr(e,s.y,r.y,o.y),Hr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Aa=class extends _n{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(hf(a,c.x,l.x,u.x,h.x),hf(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ee().fromArray(s))}return this}},jl=Object.freeze({__proto__:null,ArcCurve:ql,CatmullRomCurve3:Yl,CubicBezierCurve:Ea,CubicBezierCurve3:Zl,EllipseCurve:jr,LineCurve:Ta,LineCurve3:$l,QuadraticBezierCurve:wa,QuadraticBezierCurve3:Kl,SplineCurve:Aa}),Jl=class extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new jl[s.type]().fromJSON(s))}return this}},Ra=class extends Jl{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ta(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new wa(this.currentPoint.clone(),new ee(e,t),new ee(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new Ea(this.currentPoint.clone(),new ee(e,t),new ee(n,s),new ee(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Aa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new jr(e,t,n,s,r,o,a,c);if(this.curves.length>0){let h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},tr=class i extends Mt{constructor(e=[new ee(0,-.5),new ee(.5,0),new ee(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Lt(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],u=1/t,h=new C,d=new ee,f=new C,g=new C,x=new C,m=0,p=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:m=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:m=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let S=0;S<=t;S++){let y=n+S*u*s,_=Math.sin(y),L=Math.cos(y);for(let w=0;w<=e.length-1;w++){h.x=e[w].x*_,h.y=e[w].y,h.z=e[w].x*L,o.push(h.x,h.y,h.z),d.x=S/t,d.y=w/(e.length-1),a.push(d.x,d.y);let R=c[3*w+0]*_,P=c[3*w+1],E=c[3*w+0]*L;l.push(R,P,E)}}for(let S=0;S<t;S++)for(let y=0;y<e.length-1;y++){let _=y+S*e.length,L=_,w=_+e.length,R=_+e.length+1,P=_+1;r.push(L,w,P),r.push(R,P,w)}this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("uv",new it(a,2)),this.setAttribute("normal",new it(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}};var Ca=class i extends Mt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new C,u=new ee;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){let f=n+h/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(a,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},st=class i extends Mt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],d=[],f=[],g=0,x=[],m=n/2,p=0;S(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new it(h,3)),this.setAttribute("normal",new it(d,3)),this.setAttribute("uv",new it(f,2));function S(){let _=new C,L=new C,w=0,R=(t-e)/n;for(let P=0;P<=r;P++){let E=[],M=P/r,I=M*(t-e)+e;for(let U=0;U<=s;U++){let B=U/s,k=B*c+a,$=Math.sin(k),V=Math.cos(k);L.x=I*$,L.y=-M*n+m,L.z=I*V,h.push(L.x,L.y,L.z),_.set($,R,V).normalize(),d.push(_.x,_.y,_.z),f.push(B,1-M),E.push(g++)}x.push(E)}for(let P=0;P<s;P++)for(let E=0;E<r;E++){let M=x[E][P],I=x[E+1][P],U=x[E+1][P+1],B=x[E][P+1];(e>0||E!==0)&&(u.push(M,I,B),w+=3),(t>0||E!==r-1)&&(u.push(I,U,B),w+=3)}l.addGroup(p,w,0),p+=w}function y(_){let L=g,w=new ee,R=new C,P=0,E=_===!0?e:t,M=_===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;let I=g;for(let U=0;U<=s;U++){let k=U/s*c+a,$=Math.cos(k),V=Math.sin(k);R.x=E*V,R.y=m*M,R.z=E*$,h.push(R.x,R.y,R.z),d.push(0,M,0),w.x=$*.5+.5,w.y=V*.5*M+.5,f.push(w.x,w.y),g++}for(let U=0;U<s;U++){let B=L+U,k=I+U;_===!0?u.push(k,k+1,B):u.push(k+1,k,B),P+=3}l.addGroup(p,P,_===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},vn=class i extends st{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Hn=class extends Ra{constructor(e){super(e),this.uuid=xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Ra().fromJSON(s))}return this}},dy={triangulate:function(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Yf(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,h,d,f;if(n&&(r=xy(i,e,r,t)),i.length>80*t){a=l=i[0],c=u=i[1];for(let g=t;g<s;g+=t)h=i[g],d=i[g+1],h<a&&(a=h),d<c&&(c=d),h>l&&(l=h),d>u&&(u=d);f=Math.max(l-a,u-c),f=f!==0?32767/f:0}return Jr(r,o,t,a,c,f,0),o}};function Yf(i,e,t,n,s){let r,o;if(s===Ry(i,e,t,n)>0)for(r=e;r<t;r+=n)o=df(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=df(r,i[r],i[r+1],o);return o&&ka(o,o.next)&&(eo(o),o=o.next),o}function os(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ka(t,t.next)||Tt(t.prev,t,t.next)===0)){if(eo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Jr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Sy(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?py(i,n,s,r):fy(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),eo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=my(os(i),e,t),Jr(i,e,t,n,s,r,2)):o===2&&gy(i,e,t,n,s,r):Jr(os(i),e,t,n,s,r,1);break}}}function fy(i){let e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=s<r?s<o?s:o:r<o?r:o,h=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&Fs(s,a,r,c,o,l,g.x,g.y)&&Tt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function py(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Tt(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,u=s.y,h=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=u<h?u<d?u:d:h<d?h:d,x=a>c?a>l?a:l:c>l?c:l,m=u>h?u>d?u:d:h>d?h:d,p=Ql(f,g,e,t,n),S=Ql(x,m,e,t,n),y=i.prevZ,_=i.nextZ;for(;y&&y.z>=p&&_&&_.z<=S;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Fs(a,u,c,h,l,d,y.x,y.y)&&Tt(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Fs(a,u,c,h,l,d,_.x,_.y)&&Tt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Fs(a,u,c,h,l,d,y.x,y.y)&&Tt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=S;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Fs(a,u,c,h,l,d,_.x,_.y)&&Tt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function my(i,e,t){let n=i;do{let s=n.prev,r=n.next.next;!ka(s,r)&&Zf(s,n,n.next,r)&&Qr(s,r)&&Qr(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),eo(n),eo(n.next),n=i=r),n=n.next}while(n!==i);return os(n)}function gy(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Ty(o,a)){let c=$f(o,a);o=os(o,o.next),c=os(c,c.next),Jr(o,e,t,n,s,r,0),Jr(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function xy(i,e,t,n){let s=[],r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Yf(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Ey(l));for(s.sort(_y),r=0;r<s.length;r++)t=vy(s[r],t);return t}function _y(i,e){return i.x-e.x}function vy(i,e){let t=yy(i,e);if(!t)return e;let n=$f(t,i);return os(n,n.next),os(t,t.next)}function yy(i,e){let t=e,n=-1/0,s,r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){let d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;let a=s,c=s.x,l=s.y,u=1/0,h;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Fs(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(r-t.x),Qr(t,i)&&(h<u||h===u&&(t.x>s.x||t.x===s.x&&My(s,t)))&&(s=t,u=h)),t=t.next;while(t!==a);return s}function My(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function Sy(i,e,t,n){let s=i;do s.z===0&&(s.z=Ql(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,by(s)}function by(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function Ql(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Ey(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Fs(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Ty(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!wy(i,e)&&(Qr(i,e)&&Qr(e,i)&&Ay(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||ka(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ka(i,e){return i.x===e.x&&i.y===e.y}function Zf(i,e,t,n){let s=Qo(Tt(i,e,t)),r=Qo(Tt(i,e,n)),o=Qo(Tt(t,n,i)),a=Qo(Tt(t,n,e));return!!(s!==r&&o!==a||s===0&&Jo(i,t,e)||r===0&&Jo(i,n,e)||o===0&&Jo(t,i,n)||a===0&&Jo(t,e,n))}function Jo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Qo(i){return i>0?1:i<0?-1:0}function wy(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Zf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Qr(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function Ay(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function $f(i,e){let t=new eu(i.i,i.x,i.y),n=new eu(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function df(i,e,t,n){let s=new eu(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function eo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function eu(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Ry(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Ei=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];ff(e),pf(n,e);let o=e.length;t.forEach(ff);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,pf(n,t[c]);let a=dy.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function ff(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function pf(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var nr=class i extends Mt{constructor(e=new Hn([new ee(.5,.5),new ee(-.5,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new it(s,3)),this.setAttribute("uv",new it(r,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:Cy,y,_=!1,L,w,R,P;p&&(y=p.getSpacedPoints(u),_=!0,d=!1,L=p.computeFrenetFrames(u,!1),w=new C,R=new C,P=new C),d||(m=0,f=0,g=0,x=0);let E=a.extractPoints(l),M=E.shape,I=E.holes;if(!Ei.isClockWise(M)){M=M.reverse();for(let te=0,oe=I.length;te<oe;te++){let A=I[te];Ei.isClockWise(A)&&(I[te]=A.reverse())}}let B=Ei.triangulateShape(M,I),k=M;for(let te=0,oe=I.length;te<oe;te++){let A=I[te];M=M.concat(A)}function $(te,oe,A){return oe||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(oe,A)}let V=M.length,se=B.length;function X(te,oe,A){let Ae,re,be,de=te.x-oe.x,Oe=te.y-oe.y,Se=A.x-te.x,T=A.y-te.y,v=de*de+Oe*Oe,H=de*T-Oe*Se;if(Math.abs(H)>Number.EPSILON){let Z=Math.sqrt(v),ie=Math.sqrt(Se*Se+T*T),K=oe.x-Oe/Z,we=oe.y+de/Z,ge=A.x-T/ie,F=A.y+Se/ie,J=((ge-K)*T-(F-we)*Se)/(de*T-Oe*Se);Ae=K+de*J-te.x,re=we+Oe*J-te.y;let z=Ae*Ae+re*re;if(z<=2)return new ee(Ae,re);be=Math.sqrt(z/2)}else{let Z=!1;de>Number.EPSILON?Se>Number.EPSILON&&(Z=!0):de<-Number.EPSILON?Se<-Number.EPSILON&&(Z=!0):Math.sign(Oe)===Math.sign(T)&&(Z=!0),Z?(Ae=-Oe,re=de,be=Math.sqrt(v)):(Ae=de,re=Oe,be=Math.sqrt(v/2))}return new ee(Ae/be,re/be)}let le=[];for(let te=0,oe=k.length,A=oe-1,Ae=te+1;te<oe;te++,A++,Ae++)A===oe&&(A=0),Ae===oe&&(Ae=0),le[te]=X(k[te],k[A],k[Ae]);let fe=[],Ee,Ge=le.concat();for(let te=0,oe=I.length;te<oe;te++){let A=I[te];Ee=[];for(let Ae=0,re=A.length,be=re-1,de=Ae+1;Ae<re;Ae++,be++,de++)be===re&&(be=0),de===re&&(de=0),Ee[Ae]=X(A[Ae],A[be],A[de]);fe.push(Ee),Ge=Ge.concat(Ee)}for(let te=0;te<m;te++){let oe=te/m,A=f*Math.cos(oe*Math.PI/2),Ae=g*Math.sin(oe*Math.PI/2)+x;for(let re=0,be=k.length;re<be;re++){let de=$(k[re],le[re],Ae);ue(de.x,de.y,-A)}for(let re=0,be=I.length;re<be;re++){let de=I[re];Ee=fe[re];for(let Oe=0,Se=de.length;Oe<Se;Oe++){let T=$(de[Oe],Ee[Oe],Ae);ue(T.x,T.y,-A)}}}let rt=g+x;for(let te=0;te<V;te++){let oe=d?$(M[te],Ge[te],rt):M[te];_?(R.copy(L.normals[0]).multiplyScalar(oe.x),w.copy(L.binormals[0]).multiplyScalar(oe.y),P.copy(y[0]).add(R).add(w),ue(P.x,P.y,P.z)):ue(oe.x,oe.y,0)}for(let te=1;te<=u;te++)for(let oe=0;oe<V;oe++){let A=d?$(M[oe],Ge[oe],rt):M[oe];_?(R.copy(L.normals[te]).multiplyScalar(A.x),w.copy(L.binormals[te]).multiplyScalar(A.y),P.copy(y[te]).add(R).add(w),ue(P.x,P.y,P.z)):ue(A.x,A.y,h/u*te)}for(let te=m-1;te>=0;te--){let oe=te/m,A=f*Math.cos(oe*Math.PI/2),Ae=g*Math.sin(oe*Math.PI/2)+x;for(let re=0,be=k.length;re<be;re++){let de=$(k[re],le[re],Ae);ue(de.x,de.y,h+A)}for(let re=0,be=I.length;re<be;re++){let de=I[re];Ee=fe[re];for(let Oe=0,Se=de.length;Oe<Se;Oe++){let T=$(de[Oe],Ee[Oe],Ae);_?ue(T.x,T.y+y[u-1].y,y[u-1].x+A):ue(T.x,T.y,h+A)}}}j(),ce();function j(){let te=s.length/3;if(d){let oe=0,A=V*oe;for(let Ae=0;Ae<se;Ae++){let re=B[Ae];Fe(re[2]+A,re[1]+A,re[0]+A)}oe=u+m*2,A=V*oe;for(let Ae=0;Ae<se;Ae++){let re=B[Ae];Fe(re[0]+A,re[1]+A,re[2]+A)}}else{for(let oe=0;oe<se;oe++){let A=B[oe];Fe(A[2],A[1],A[0])}for(let oe=0;oe<se;oe++){let A=B[oe];Fe(A[0]+V*u,A[1]+V*u,A[2]+V*u)}}n.addGroup(te,s.length/3-te,0)}function ce(){let te=s.length/3,oe=0;Te(k,oe),oe+=k.length;for(let A=0,Ae=I.length;A<Ae;A++){let re=I[A];Te(re,oe),oe+=re.length}n.addGroup(te,s.length/3-te,1)}function Te(te,oe){let A=te.length;for(;--A>=0;){let Ae=A,re=A-1;re<0&&(re=te.length-1);for(let be=0,de=u+m*2;be<de;be++){let Oe=V*be,Se=V*(be+1),T=oe+Ae+Oe,v=oe+re+Oe,H=oe+re+Se,Z=oe+Ae+Se;Ve(T,v,H,Z)}}}function ue(te,oe,A){c.push(te),c.push(oe),c.push(A)}function Fe(te,oe,A){Be(te),Be(oe),Be(A);let Ae=s.length/3,re=S.generateTopUV(n,s,Ae-3,Ae-2,Ae-1);Qe(re[0]),Qe(re[1]),Qe(re[2])}function Ve(te,oe,A,Ae){Be(te),Be(oe),Be(Ae),Be(oe),Be(A),Be(Ae);let re=s.length/3,be=S.generateSideWallUV(n,s,re-6,re-3,re-2,re-1);Qe(be[0]),Qe(be[1]),Qe(be[3]),Qe(be[1]),Qe(be[2]),Qe(be[3])}function Be(te){s.push(c[te*3+0]),s.push(c[te*3+1]),s.push(c[te*3+2])}function Qe(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Iy(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new jl[s.type]().fromJSON(s)),new i(n,e.options)}},Cy={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new ee(r,o),new ee(a,c),new ee(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],x=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new ee(o,1-c),new ee(l,1-h),new ee(d,1-g),new ee(x,1-p)]:[new ee(a,1-c),new ee(u,1-h),new ee(f,1-g),new ee(m,1-p)]}};function Iy(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ir=class i extends Mt{constructor(e=new Hn([new ee(0,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new it(s,3)),this.setAttribute("normal",new it(r,3)),this.setAttribute("uv",new it(o,2));function l(u){let h=s.length/3,d=u.extractPoints(t),f=d.shape,g=d.holes;Ei.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){let S=g[m];Ei.isClockWise(S)===!0&&(g[m]=S.reverse())}let x=Ei.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){let S=g[m];f=f.concat(S)}for(let m=0,p=f.length;m<p;m++){let S=f[m];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let m=0,p=x.length;m<p;m++){let S=x[m],y=S[0]+h,_=S[1]+h,L=S[2]+h;n.push(y,_,L),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Py(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};function Py(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var Ct=class i extends Mt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],h=new C,d=new C,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let S=[],y=p/n,_=0;p===0&&o===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let L=0;L<=t;L++){let w=L/t;h.x=-e*Math.cos(s+w*r)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(s+w*r)*Math.sin(o+y*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(w+_,1-y),S.push(l++)}u.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){let y=u[p][S+1],_=u[p][S],L=u[p+1][S],w=u[p+1][S+1];(p!==0||o>0)&&f.push(y,_,w),(p!==n-1||c<Math.PI)&&f.push(_,L,w)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var kn=class i extends Mt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],u=new C,h=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,S=(s+1)*f+g;o.push(x,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ia=class extends Ut{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}},tt=class extends sn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nf,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dn=class extends tt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function ea(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ly(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Dy(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function mf(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Kf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Ri=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},tu=class extends Ri{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jh,endingEnd:Jh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Qh:r=e,a=2*t-n;break;case ed:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Qh:o=e,c=2*n-t;break;case ed:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,S=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let L=0;L!==a;++L)r[L]=p*o[u+L]+S*o[l+L]+y*o[c+L]+_*o[h+L];return r}},nu=class extends Ri{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==a;++d)r[d]=o[l+d]*h+o[c+d]*u;return r}},iu=class extends Ri{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},yn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ea(t,this.TimeBufferType),this.values=ea(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ea(e.times,Array),values:ea(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new iu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new nu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new tu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case qs:t=this.InterpolantFactoryMethodDiscrete;break;case Ys:t=this.InterpolantFactoryMethodLinear;break;case uc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qs;case this.InterpolantFactoryMethodLinear:return Ys;case this.InterpolantFactoryMethodSmooth:return uc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Ly(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===uc,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{let h=a*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let x=t[h+g];if(x!==t[d+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=Ys;var Ci=class extends yn{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="bool";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=qs;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Pa=class extends yn{};Pa.prototype.ValueTypeName="color";var ri=class extends yn{};ri.prototype.ValueTypeName="number";var su=class extends Ri{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let u=l+a;l!==u;l+=4)un.slerpFlat(r,0,o,l-a,o,l,c);return r}},oi=class extends yn{InterpolantFactoryMethodLinear(e){return new su(this.times,this.values,this.getValueSize(),e)}};oi.prototype.ValueTypeName="quaternion";oi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends yn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=qs;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var ai=class extends yn{};ai.prototype.ValueTypeName="vector";var La=class{constructor(e="",t=-1,n=[],s=Dm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=xn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Ny(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(yn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=Dy(c);c=mf(c,1,u),l=mf(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ri(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],d=s[h];d||(s[h]=d=[]),d.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,g,x){if(f.length!==0){let m=[],p=[];Kf(f,m,p,g),m.length!==0&&x.push(new h(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(let x in f){let m=[],p=[];for(let S=0;S!==d[g].morphTargets.length;++S){let y=d[g];m.push(y.time),p.push(y.morphTarget===x?1:0)}s.push(new ri(".morphTargetInfluence["+x+"]",m,p))}c=f.length*o}else{let f=".bones["+t[h].name+"]";n(ai,f+".position",d,"pos",s),n(oi,f+".quaternion",d,"rot",s),n(ai,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Uy(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ri;case"vector":case"vector2":case"vector3":case"vector4":return ai;case"color":return Pa;case"quaternion":return oi;case"bool":case"boolean":return Ci;case"string":return Ii}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Ny(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Uy(i.type);if(i.times===void 0){let t=[],n=[];Kf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Si={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},ru=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){let f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},Fy=new ru,ci=class{constructor(e){this.manager=e!==void 0?e:Fy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ci.DEFAULT_MATERIAL_NAME="__DEFAULT";var jn={},ou=class extends Error{constructor(e,t){super(e),this.response=t}},to=class extends ci{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Si.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(jn[e]!==void 0){jn[e].push({onLoad:t,onProgress:n,onError:s});return}jn[e]=[],jn[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=jn[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,m=new ReadableStream({start(p){S();function S(){h.read().then(({done:y,value:_})=>{if(y)p.close();else{x+=_.byteLength;let L=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let w=0,R=u.length;w<R;w++){let P=u[w];P.onProgress&&P.onProgress(L)}p.enqueue(_),S()}},y=>{p.error(y)})}}});return new Response(m)}else throw new ou(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Si.add(e,l);let u=jn[e];delete jn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{let u=jn[e];if(u===void 0)throw this.manager.itemError(e),l;delete jn[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var au=class extends ci{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Si.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Xr("img");function c(){u(),Si.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var sr=class extends ci{constructor(e){super(e)}load(e,t,n,s){let r=new Bt,o=new au(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},rr=class extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Da=class extends rr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Wc=new ke,gf=new C,xf=new C,no=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yr,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;gf.setFromMatrixPosition(e.matrixWorld),t.position.copy(gf),xf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xf),t.updateMatrixWorld(),Wc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},cu=class extends no{constructor(){super(new Dt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Zs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},or=class extends rr{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new cu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},_f=new ke,Dr=new C,Xc=new C,lu=class extends no{constructor(){super(new Dt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ee(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Dr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Dr),Xc.copy(n.position),Xc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Xc),n.updateMatrixWorld(),s.makeTranslation(-Dr.x,-Dr.y,-Dr.z),_f.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_f)}},Pi=class extends rr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new lu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},uu=class extends no{constructor(){super(new wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ua=class extends rr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new uu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Li=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Na=class extends ci{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Si.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Si.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Si.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Si.add(e,c),r.manager.itemStart(e)}};var ar=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=vf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=vf();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function vf(){return performance.now()}var Pu="\\[\\]\\.:\\/",Oy=new RegExp("["+Pu+"]","g"),Lu="[^"+Pu+"]",By="[^"+Pu.replace("\\.","")+"]",zy=/((?:WC+[\/:])*)/.source.replace("WC",Lu),Hy=/(WCOD+)?/.source.replace("WCOD",By),ky=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lu),Vy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lu),Gy=new RegExp("^"+zy+Hy+ky+Vy+"$"),Wy=["material","materials","bones","map"],hu=class{constructor(e,t,n){let s=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Oy,"")}static parseTrackName(e){let t=Gy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Wy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};vt.Composite=hu;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var yS=new Float32Array(1);var yf=new ke,Fa=class{constructor(e,t,n=0,s=1/0){this.ray=new ns(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new qr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yf),this}intersectObject(e,t=!0,n=[]){return du(e,this,n,t),n.sort(Mf),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)du(e[s],this,n,t);return n.sort(Mf),n}};function Mf(i,e){return i.distance-e.distance}function du(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)du(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fu);var Va={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var fn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Xy=new wi(-1,1,1,-1,0,1),Du=class extends Mt{constructor(){super(),this.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new it([0,2,0,0,2,0],2))}},qy=new Du,Ui=class{constructor(e){this._mesh=new ye(qy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Xy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var lr=class extends fn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Di.clone(e.uniforms),this.material=new Ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ui(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var ro=class extends fn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Ga=class extends fn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Wa=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ee);this._width=n.width,this._height=n.height,t=new Kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:In}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new lr(Va),this.copyPass.material.blending=Fn,this.clock=new ar}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ro!==void 0&&(o instanceof ro?n=!0:o instanceof Ga&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Xa=class extends fn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Re}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}};var jf={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Re(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var ur=class i extends fn{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ee(e.x,e.y):new ee(256,256),this.clearColor=new Re(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Kt(r,o,{type:In}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new Kt(r,o,{type:In});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new Kt(r,o,{type:In});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}let a=jf;this.highPassUniforms=Di.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ut({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ee(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let u=Va;this.copyUniforms=Di.clone(u.uniforms),this.blendMaterial=new Ut({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:ii,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Re,this.oldClearAlpha=1,this.basic=new Rt,this.fsQuad=new Ui(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ee(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ut({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ee(.5,.5)},direction:{value:new ee(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Ut({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};ur.BlurDirectionX=new ee(1,0);ur.BlurDirectionY=new ee(0,1);var Jf={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var qa=class extends fn{constructor(){super();let e=Jf;this.uniforms=Di.clone(e.uniforms),this.material=new Ia({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Ui(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},je.getTransfer(this._outputColorSpace)===dt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===mu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===gu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===xu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===io?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===_u?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===vu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Uu='"Uncial Antiqua", "Cormorant Garamond", Georgia, serif',Ya='"Cormorant Garamond", Georgia, serif';function hr(i=7){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function li(i,e){let t=document.createElement("canvas");return t.width=i,t.height=e,[t,t.getContext("2d")]}function ui(i,{repeat:e=[1,1],srgb:t=!0}={}){let n=new zn(i);return t&&(n.colorSpace=mt),(e[0]!==1||e[1]!==1)&&(n.wrapS=n.wrapT=ln,n.repeat.set(e[0],e[1])),n.anisotropy=4,n}function Nu(i,e,t,n,s=4e3,r=.06){for(let o=0;o<s;o++){let a=n()<.5?0:255;i.fillStyle=`rgba(${a},${a},${a},${r*n()})`,i.fillRect(n()*e,n()*t,1+n()*2,1+n()*2)}}function Yy(i,e,t){let n=(e()-.5)*t;return`rgb(${i.map(s=>Math.max(0,Math.min(255,Math.round(s+n)))).join(",")})`}function ep(i=0){let[n,s]=li(256,640),r=["#7a1418","#1d2f5c","#7a1418"];s.fillStyle=r[i%r.length],s.beginPath(),s.moveTo(0,0),s.lineTo(256,0),s.lineTo(256,570),s.lineTo(256/2,640),s.lineTo(0,570),s.closePath(),s.fill();for(let c=0;c<256;c+=32){let l=s.createLinearGradient(c,0,c+32,0);l.addColorStop(0,"rgba(0,0,0,0.22)"),l.addColorStop(.5,"rgba(255,255,255,0.06)"),l.addColorStop(1,"rgba(0,0,0,0.22)"),s.fillStyle=l,s.fillRect(c,0,32,640)}s.strokeStyle="#d4a845",s.lineWidth=10,s.beginPath(),s.moveTo(14,0),s.lineTo(14,564),s.lineTo(256/2,626),s.lineTo(242,564),s.lineTo(242,0),s.stroke(),s.fillStyle="#e2b74e";let o=230;return s.beginPath(),s.moveTo(60,o+40),s.lineTo(60,o-10),s.lineTo(90,o+15),s.lineTo(256/2,o-35),s.lineTo(166,o+15),s.lineTo(196,o-10),s.lineTo(196,o+40),s.closePath(),s.fill(),s.fillRect(56,o+40,144,16),s.fillRect(256/2-6,o+80,12,230),s.fillRect(256/2-50,o+100,100,12),s.beginPath(),s.arc(256/2,o+80,12,0,7),s.fill(),s.beginPath(),s.moveTo(256/2-6,o+310),s.lineTo(256/2,o+340),s.lineTo(256/2+6,o+310),s.fill(),ui(n)}var Qf=[["#8c1a1a","#d4a845"],["#1d3a78","#e8e1cf"],["#1f5a32","#d4a845"],["#20201f","#d4a845"],["#8c1a1a","#e8e1cf"],["#1d3a78","#d4a845"],["#5b2a6e","#e8e1cf"]];function cs(i,{W:e=512,H:t=256,taille:n=38,titre:s="",sceau:r=!1}={}){let o=hr(i.join("").length+3),[a,c]=li(e,t),l=c.createRadialGradient(e/2,t/2,10,e/2,t/2,e*.7);l.addColorStop(0,"#efe0bd"),l.addColorStop(1,"#c9ab76"),c.fillStyle=l,c.fillRect(0,0,e,t),Nu(c,e,t,o,5e3,.08),c.strokeStyle="rgba(90,55,20,0.55)",c.lineWidth=3,c.strokeRect(12,12,e-24,t-24),c.fillStyle="#3b2410",c.textAlign="center",c.textBaseline="middle";let u=t/2;s&&(c.font=`${Math.round(n*.7)}px ${Uu}`,c.fillStyle="#7a1418",c.fillText(s,e/2,46),c.fillStyle="#3b2410",u=t/2+18),c.font=`italic ${n}px ${Ya}`;let h=[];for(let g of i){let x=g.split(" "),m="";for(let p of x){let S=m?m+" "+p:p;c.measureText(S).width>e-70&&m?(h.push(m),m=p):m=S}m&&h.push(m)}let d=n;for(;h.length*d*1.15>t-(s?110:60)&&d>16;)d-=2;c.font=`italic ${d}px ${Ya}`;let f=h.length*d*1.15;return h.forEach((g,x)=>{let m=x===h.length-1&&g.startsWith("\u2014");c.font=m?`${Math.round(d*.8)}px ${Ya}`:`italic ${d}px ${Ya}`,c.fillText(g,e/2,u-f/2+d*.58+x*d*1.15)}),r&&(c.fillStyle="#8c1a1a",c.beginPath(),c.arc(e-60,t-56,30,0,7),c.fill(),c.fillStyle="#b8322c",c.beginPath(),c.arc(e-63,t-59,21,0,7),c.fill()),ui(a)}function tp(){let i=hr(9),e=256,t=512,[n,s]=li(e,t),r=5,o=e/r;for(let a=0;a<r;a++){s.fillStyle=Yy([84,52,28],i,22),s.fillRect(a*o,0,o,t);for(let c=0;c<30;c++){s.strokeStyle=`rgba(20,10,0,${.06+i()*.12})`,s.beginPath();let l=a*o+i()*o;s.moveTo(l,0),s.lineTo(l+(i()-.5)*6,t),s.stroke()}s.fillStyle="rgba(0,0,0,0.5)",s.fillRect(a*o,0,3,t)}s.fillStyle="#2a2622";for(let a of[90,300,440]){s.fillRect(0,a,e,20);for(let c=14;c<e;c+=34)s.fillStyle="#4a4540",s.beginPath(),s.arc(c,a+10,5,0,7),s.fill(),s.fillStyle="#2a2622"}return ui(n)}function oo(){let[e,t]=li(128,128),n=t.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);return n.addColorStop(0,"rgba(255,240,200,1)"),n.addColorStop(.25,"rgba(255,180,80,0.8)"),n.addColorStop(1,"rgba(255,120,20,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),ui(e)}function np(i){let e=hr(i*13+1),t=512,n=376,[s,r]=li(t,n),[o,a]=Qf[i%Qf.length];for(let c=0;c<8;c++){r.fillStyle=o,r.fillRect(c*64,0,64,n),r.fillStyle=`rgba(${e()<.5?"0,0,0":"255,240,220"},${.05+e()*.08})`,r.fillRect(c*64,0,64,n),r.fillStyle="rgba(0,0,0,0.35)",r.fillRect(c*64,0,3,n);for(let l=0;l<14;l++){r.strokeStyle=`rgba(0,0,0,${.05+e()*.1})`,r.lineWidth=1,r.beginPath();let u=c*64+e()*64;r.moveTo(u,0),r.lineTo(u+(e()-.5)*4,n),r.stroke()}}Nu(r,t,n,e,5e3,.08);for(let c of[0,t/2])r.strokeStyle=a,r.lineWidth=12,r.strokeRect(c+14,14,t/2-28,n-28),r.strokeStyle="rgba(0,0,0,0.35)",r.lineWidth=2,r.strokeRect(c+22,22,t/2-44,n-44);r.fillStyle="#2a2622";for(let c of[70,n-84])r.fillRect(0,c,120,14),r.fillRect(t-120,c,120,14);return r.fillStyle="rgba(15,10,5,0.6)",r.beginPath(),r.arc(t/2,n/2,112,0,7),r.fill(),r.strokeStyle="#d4a845",r.lineWidth=8,r.stroke(),r.fillStyle="#f6e7c1",r.font=`150px ${Uu}`,r.textAlign="center",r.textBaseline="middle",r.shadowColor="rgba(0,0,0,0.6)",r.shadowBlur=10,r.fillText(String(i),t/2,n/2+6),ui(s)}function ip(){let[t,n]=li(512,376),s=n.createRadialGradient(512/2,376/2,10,512/2,376/2,512*.62);s.addColorStop(0,"#fff3cf"),s.addColorStop(.35,"#ffc867"),s.addColorStop(1,"#6b2a0c"),n.fillStyle=s,n.fillRect(0,0,512,376);let r=hr(77);for(let o=0;o<60;o++)n.fillStyle=`rgba(255,255,240,${.3+r()*.6})`,n.beginPath(),n.arc(r()*512,r()*376,.8+r()*2.2,0,7),n.fill();return ui(t)}function sp(){let[t,n]=li(256,512);n.fillStyle="#f2e3b0",n.fillRect(0,0,256,512);let s=["#b3221d","#e2a93a","#1d3f8a","#b3221d","#f4e7c0"],r=64;for(let o=-1;o<512/(r/2)+1;o++)for(let a=-1;a<256/r+1;a++){let c=a*r+(o%2?r/2:0),l=o*r/2;n.fillStyle=s[(a*3+o*7+50)%s.length],n.beginPath(),n.moveTo(c,l-r/2),n.lineTo(c+r/2,l),n.lineTo(c,l+r/2),n.lineTo(c-r/2,l),n.closePath(),n.fill(),n.fillStyle="rgba(255,255,255,0.18)",n.beginPath(),n.moveTo(c,l-r/4),n.lineTo(c+r/4,l),n.lineTo(c,l+r/4),n.lineTo(c-r/4,l),n.closePath(),n.fill()}n.strokeStyle="#1c1a18",n.lineWidth=5;for(let o=-512;o<768;o+=r)n.beginPath(),n.moveTo(o,0),n.lineTo(o+512,512),n.stroke(),n.beginPath(),n.moveTo(o,512),n.lineTo(o+512,0),n.stroke();return n.lineWidth=14,n.strokeRect(0,0,256,512),ui(t)}function rp(){let i=hr(5),e=512,t=352,[n,s]=li(e,t),r=s.createLinearGradient(0,0,e,0);r.addColorStop(0,"#d9c393"),r.addColorStop(.47,"#efe2bf"),r.addColorStop(.5,"#b59a68"),r.addColorStop(.53,"#efe2bf"),r.addColorStop(1,"#d9c393"),s.fillStyle=r,s.fillRect(0,0,e,t),Nu(s,e,t,i,3e3,.06),s.fillStyle="#7a1418",s.font=`44px ${Uu}`,s.textAlign="center",s.fillText("Bienvenue",e*.25,70),s.fillStyle="rgba(59,36,16,0.75)";for(let o of[30,e/2+26])for(let a=o<100?110:50;a<t-30;a+=22){let c=o;for(;c<o+e/2-70;){let l=12+i()*40;s.fillRect(c,a,l,4),c+=l+8}}return ui(n)}function op(){let[t,n]=li(256,512);n.fillStyle="#0c0705",n.fillRect(0,0,256,512);let s=n.createRadialGradient(256/2,512*.62,10,256/2,512*.62,512*.6);s.addColorStop(0,"rgba(255,236,190,1)"),s.addColorStop(.25,"rgba(255,190,110,0.85)"),s.addColorStop(.7,"rgba(120,60,20,0.35)"),s.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=s,n.fillRect(0,0,256,512);let r=hr(31);for(let o=0;o<18;o++)n.fillStyle=`rgba(255,230,200,${.04+r()*.06})`,n.beginPath(),n.ellipse(r()*256,512*(.45+r()*.5),40+r()*80,10+r()*25,0,0,7),n.fill();return ui(t)}var Qa=cm(dp());async function fp(i){let e=await fetch(i);if(!e.ok)throw new Error("GIF introuvable : "+i);let t=(0,Qa.parseGIF)(await e.arrayBuffer()),n=(0,Qa.decompressFrames)(t,!0);if(!n.length)throw new Error("GIF vide");let s=t.lsd.width,r=t.lsd.height,o=document.createElement("canvas");o.width=s,o.height=r;let a=o.getContext("2d"),c=document.createElement("canvas"),l=c.getContext("2d"),u=new zn(o);u.colorSpace=mt;let h=0,d=0,f=null;function g(x){if(f&&f.disposalType===2){let S=f.dims;a.clearRect(S.left,S.top,S.width,S.height)}let m=x.dims;c.width=m.width,c.height=m.height;let p=l.createImageData(m.width,m.height);p.data.set(x.patch),l.putImageData(p,0,0),a.drawImage(c,m.left,m.top),f=x,u.needsUpdate=!0}return g(n[0]),{texture:u,ratio:s/r,avancer(x){d+=x;let m=Math.max(n[h].delay||100,20);d<m||(d=0,h=(h+1)%n.length,h===0&&(a.clearRect(0,0,s,r),f=null),g(n[h]))}}}function mp(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Mt,l=0;for(let u=0;u<i.length;++u){let h=i[u],d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in h.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0,h=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(let u in r){let h=pp(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(let u in o){let h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){let f=[];for(let x=0;x<o[u].length;++x)f.push(o[u][x][d]);let g=pp(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function pp(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let o=new e(r),a=new Et(o,t,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let h=c/t;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<t;g++){let x=u.getComponent(d,g);a.setComponent(d+h,g,x)}}else o.set(u.array,c);c+=u.count*t}return s!==void 0&&(a.gpuType=s),a}function zu(i,e){if(e===Uf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===so||e===Ba){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===so)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var ec=class extends ci{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new qu(t)}),this.register(function(t){return new Yu(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new $u(t)}),this.register(function(t){return new Ku(t)}),this.register(function(t){return new ju(t)}),this.register(function(t){return new Ju(t)}),this.register(function(t){return new Xu(t)}),this.register(function(t){return new Qu(t)}),this.register(function(t){return new Zu(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new Gu(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Li.extractUrlBase(e);o=Li.resolveURL(l,this.path)}else o=Li.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new to(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===yp){try{o[nt.KHR_BINARY_GLTF]=new ah(e)}catch(h){s&&s(h);return}r=JSON.parse(o[nt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ph(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case nt.KHR_MATERIALS_UNLIT:o[h]=new Wu;break;case nt.KHR_DRACO_MESH_COMPRESSION:o[h]=new ch(r,this.dracoLoader);break;case nt.KHR_TEXTURE_TRANSFORM:o[h]=new lh;break;case nt.KHR_MESH_QUANTIZATION:o[h]=new uh;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function bM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var nt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Gu=class{constructor(e){this.parser=e,this.name=nt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Re(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Xt);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ua(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Pi(u),l.distance=h;break;case"spot":l=new or(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,hi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Wu=class{constructor(){this.name=nt.KHR_MATERIALS_UNLIT}getMaterialType(){return Rt}extendParams(e,t,n){let s=[];e.color=new Re(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Xt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,mt))}return Promise.all(s)}},Xu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},qu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ee(a,a)}return Promise.all(r)}},Yu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Zu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},$u=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Re(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Xt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,mt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Ku=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},ju=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Re().setRGB(a[0],a[1],a[2],Xt),Promise.all(r)}},Ju=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Qu=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Re().setRGB(a[0],a[1],a[2],Xt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,mt)),Promise.all(r)}},eh=class{constructor(e){this.parser=e,this.name=nt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},th=class{constructor(e){this.parser=e,this.name=nt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},nh=class{constructor(e){this.parser=e,this.name=nt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},ih=class{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},sh=class{constructor(e){this.parser=e,this.name=nt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},rh=class{constructor(e){this.name=nt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}},oh=class{constructor(e){this.name=nt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Mn.TRIANGLES&&l.mode!==Mn.TRIANGLE_STRIP&&l.mode!==Mn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,f=[];for(let g of h){let x=new ke,m=new C,p=new un,S=new C(1,1,1),y=new Qs(g.geometry,g.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&S.fromBufferAttribute(c.SCALE,_),y.setMatrixAt(_,x.compose(m,p,S));for(let _ in c)if(_==="_COLOR_0"){let L=c[_];y.instanceColor=new ss(L.array,L.itemSize,L.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);yt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},yp="glTF",ao=12,gp={JSON:1313821514,BIN:5130562},ah=class{constructor(e){this.name=nt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ao),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==yp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ao,r=new DataView(e,ao),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===gp.JSON){let l=new Uint8Array(e,ao+o,a);this.content=n.decode(l)}else if(c===gp.BIN){let l=ao+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ch=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=nt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=dh[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=dh[u]||u.toLowerCase();if(o[u]!==void 0){let d=n.accessors[e.attributes[u]],f=dr[d.componentType];l[h]=f.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(let g in f.attributes){let x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}h(f)},a,l,Xt,d)})})}},lh=class{constructor(){this.name=nt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},uh=class{constructor(){this.name=nt.KHR_MESH_QUANTIZATION}},tc=class extends Ri{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,g=e*l,x=g-l,m=-2*f+3*d,p=f-d,S=1-m,y=p-d+h;for(let _=0;_!==a;_++){let L=o[x+_+a],w=o[x+_+c]*u,R=o[g+_+a],P=o[g+_]*u;r[_]=S*L+y*w+m*R+p*P}return r}},EM=new un,hh=class extends tc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return EM.fromArray(r).normalize().toArray(r),r}},Mn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},dr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},xp={9728:Gt,9729:en,9984:yu,9985:Fr,9986:Us,9987:Nn},_p={33071:ei,33648:Gr,10497:ln},Hu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},dh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Bi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},TM={CUBICSPLINE:void 0,LINEAR:Ys,STEP:qs},ku={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function wM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new tt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:On})),i.DefaultMaterial}function ls(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function hi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function AM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(d)}if(s){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(d)}if(r){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function RM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function CM(i){let e,t=i.extensions&&i.extensions[nt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Vu(t.attributes):e=i.indices+":"+Vu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Vu(i.targets[n]);return e}function Vu(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function fh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function IM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var PM=new ke,ph=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new bM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new sr(this.options.manager):this.textureLoader=new Na(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new to(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ls(r,a,s),hi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[nt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Li.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Hu[s.type],a=dr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Et(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Hu[s.type],l=dr[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(f&&f!==h){let p=Math.floor(d/f),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,y=t.cache.get(S);y||(x=new l(a,p*f,s.count*f/u),y=new js(x,f/u),t.cache.add(S,y)),m=new is(y,c,d%f/u,g)}else a===null?x=new l(s.count*c):x=new l(a,d,s.count*c),m=new Et(x,c,g);if(s.sparse!==void 0){let p=Hu.SCALAR,S=dr[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,L=new S(o[1],y,s.sparse.count*p),w=new l(o[2],_,s.sparse.count*c);a!==null&&(m=new Et(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,P=L.length;R<P;R++){let E=L[R];if(m.setX(E,w[R*c]),c>=2&&m.setY(E,w[R*c+1]),c>=3&&m.setZ(E,w[R*c+2]),c>=4&&m.setW(E,w[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return u.magFilter=xp[d.magFilter]||en,u.minFilter=xp[d.minFilter]||Nn,u.wrapS=_p[d.wrapS]||ln,u.wrapT=_p[d.wrapT]||ln,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Gt&&u.minFilter!==en,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let d=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let m=new Bt(x);m.needsUpdate=!0,d(m)}),t.load(Li.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),hi(h,o),h.userData.mimeType=o.mimeType||IM(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[nt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[nt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[nt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ai,sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Kr,sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return tt}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[nt.KHR_MATERIALS_UNLIT]){let h=s[nt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new Re(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Xt),a.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,mt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=$t);let u=r.alphaMode||ku.OPAQUE;if(u===ku.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ku.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Rt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ee(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Rt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Rt){let h=r.emissiveFactor;a.emissive=new Re().setRGB(h[0],h[1],h[2],Xt)}return r.emissiveTexture!==void 0&&o!==Rt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,mt)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),hi(h,r),t.associations.set(h,{materials:e}),r.extensions&&ls(s,h,r),h})}createUniqueName(e){let t=vt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[nt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return vp(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=CM(l),h=s[u];if(h)o.push(h.promise);else{let d;l.extensions&&l.extensions[nt.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=vp(new Mt,l,t),s[u]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?wM(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let f=0,g=u.length;f<g;f++){let x=u[f],m=o[f],p,S=l[f];if(m.mode===Mn.TRIANGLES||m.mode===Mn.TRIANGLE_STRIP||m.mode===Mn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new xa(x,S):new ye(x,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Mn.TRIANGLE_STRIP?p.geometry=zu(p.geometry,Ba):m.mode===Mn.TRIANGLE_FAN&&(p.geometry=zu(p.geometry,so));else if(m.mode===Mn.LINES)p=new Sa(x,S);else if(m.mode===Mn.LINE_STRIP)p=new er(x,S);else if(m.mode===Mn.LINE_LOOP)p=new ba(x,S);else if(m.mode===Mn.POINTS)p=new rs(x,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&RM(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),hi(p,r),m.extensions&&ls(s,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&ls(s,h[0],r),h[0];let d=new xt;r.extensions&&ls(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Dt(Of.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new wi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),hi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let d=new ke;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new va(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){let f=s.channels[h],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,S=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",S)),l.push(g),u.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],g=h[2],x=h[3],m=h[4],p=[];for(let S=0,y=d.length;S<y;S++){let _=d[S],L=f[S],w=g[S],R=x[S],P=m[S];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let E=n._createAnimationTracks(_,L,w,R,P);if(E)for(let M=0;M<E.length;M++)p.push(E[M])}return new La(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,PM)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new $r:l.length>1?u=new xt:l.length===1?u=l[0]:u=new yt,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),hi(u,r),r.extensions&&ls(n,u,r),r.matrix!==void 0){let h=new ke;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new xt;n.name&&(r.name=s.createUniqueName(n.name)),hi(r,n),n.extensions&&ls(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[d,f]of s.associations)(d instanceof sn||d instanceof Bt)&&h.set(d,f);return u.traverse(d=>{let f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];Bi[r.path]===Bi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Bi[r.path]){case Bi.weights:l=ri;break;case Bi.rotation:l=oi;break;case Bi.position:case Bi.scale:l=ai;break;default:switch(n.itemSize){case 1:l=ri;break;case 2:case 3:default:l=ai;break}break}let u=s.interpolation!==void 0?TM[s.interpolation]:Ys,h=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){let g=new l(c[d]+"."+Bi[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=fh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof oi?hh:tc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function LM(i,e,t){let n=e.attributes,s=new nn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new C(c[0],c[1],c[2]),new C(l[0],l[1],l[2])),a.normalized){let u=fh(dr[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new C,c=new C;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=fh(dr[d.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new hn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function vp(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=dh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return je.workingColorSpace!==Xt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${je.workingColorSpace}" not supported.`),hi(i,e),LM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?AM(i,e.targets,t):i})}var mh=new Map,gh=new Map,DM=new sr,UM=new ec;function Mp(i,e){return mh.has(i)||mh.set(i,new Promise(t=>{DM.load(i,n=>{n.colorSpace=e?mt:Un,n.wrapS=n.wrapT=ln,n.anisotropy=4,t(n)},void 0,()=>t(null))})),mh.get(i)}function NM(i){return gh.has(i)||gh.set(i,new Promise(e=>{UM.load(i,t=>e(t.scene),void 0,()=>e(null))})),gh.get(i)}async function Sp(i,e){let t=[],n={},s={},r=0,o=()=>e?.(++r/t.length);for(let a of i.textures||[])t.push(Mp(`textures/${a}.jpg`,!0).then(c=>{n[a]=c,o()})),t.push(Mp(`textures/${a}-normal.jpg`,!1).then(c=>{n[a+"-normal"]=c,o()}));for(let[a,c]of Object.entries(i.modeles||{}))t.push(NM(c).then(l=>{s[a]=l,o()}));return await Promise.all(t),{materiau(a,c=1,l=1,u={}){let{relief:h=1,...d}=u,f=n[a],g=n[a+"-normal"],x=new tt({roughness:.9,...d});return f&&(x.map=f.clone(),x.map.repeat.set(c,l),x.map.needsUpdate=!0),g&&(x.normalMap=g.clone(),x.normalMap.repeat.set(c,l),x.normalMap.needsUpdate=!0,x.normalScale.set(h,h)),x},modele(a,c){let l=s[a];if(!l)return null;let u=l.clone(!0),h=new nn().setFromObject(u),d=h.max.y-h.min.y||1,f=c/d;u.scale.setScalar(f),u.position.y=-h.min.y*f;let g=new xt;return g.add(u),g}}}var bp=new tt({color:13146940,metalness:.85,roughness:.35}),Ep=new tt({color:2828326,metalness:.7,roughness:.55}),zi=null;function xh(i){return new C(Math.sin(i),0,Math.cos(i))}var Vn=new tt({color:4861464,roughness:.85});function Tp(i,e,t,n,{hauteur:s=2,recul:r=1.7}={}){let o=new xt;o.position.set(e,0,t),o.rotation.y=n;let a=1.3,c=.95,l=s,u=new ye(new Wt(a,c),new Rt({map:ip()}));u.position.set(0,l,.02),o.add(u);let h=new tt({color:9404780,roughness:.95}),d=.14;for(let[U,B,k,$]of[[a+2*d,d,0,c/2+d/2],[a+2*d,d*1.4,0,-c/2-d*.7],[d,c,a/2+d/2,0],[d,c,-a/2-d/2,0]]){let V=new ye(new et(U,B,.22),h);V.position.set(k,l+$,.09),o.add(V)}let f=new ye(new kn(.06,.02,6,16),bp);f.position.set(0,l+c/2+d+.05,.12),o.add(f);let g=np(i),x=g.clone();x.repeat.set(.5,1),x.offset.set(0,0),x.needsUpdate=!0;let m=g.clone();m.repeat.set(.5,1),m.offset.set(.5,0),m.needsUpdate=!0;let p=new tt({map:x,roughness:.8,emissive:16762976,emissiveIntensity:0}),S=new tt({map:m,roughness:.8,emissive:16762976,emissiveIntensity:0}),y=new et(a/2,c,.04),_=new xt;_.position.set(-a/2,l,.06);let L=new ye(y,[Vn,Vn,Vn,Vn,p,Vn]);L.position.x=a/4,_.add(L);let w=new xt;w.position.set(a/2,l,.06);let R=new ye(y,[Vn,Vn,Vn,Vn,S,Vn]);R.position.x=-a/4,w.add(R),o.add(_,w),zi??(zi=oo());let P=new Zr(new Js({map:zi,blending:ii,depthWrite:!1,transparent:!0,opacity:0}));P.position.set(0,l,.25),P.scale.setScalar(2.2),o.add(P);let E=new ye(new Wt(1.25,.46),new tt({map:cs([`${i} d\xE9cembre`],{taille:52}),roughness:.9}));E.position.set(0,l-c/2-.5,.04),o.add(E);let M={type:"case",jour:i};for(let U of[u,L,R,E])U.userData.action=M;let I=xh(n);return{groupe:o,ecran:u,plaque:E,halo:P,jour:i,action:M,volets:[_,w],matsVolets:[p,S],ouverture:0,cible:0,lumiere:0,lumiereCible:0,position:new C(e,l,t).addScaledVector(I,.05),normale:I,arret:{x:e+I.x*r,z:t+I.z*r,yaw:n,pitch:Math.atan2(l-1.65,r)},cadreRatio:a/c,coins(){return o.updateMatrixWorld(!0),[[-a/2,c/2],[a/2,c/2],[-a/2,-c/2],[a/2,-c/2]].map(([U,B])=>u.localToWorld(new C(U,B,0)))}}}function wp(i,e,t,n="",s="porte"){let r=new xt;r.position.set(i,0,e),r.rotation.y=t;let o=new tt({map:tp(),roughness:.85,side:$t}),a=new Hn;a.moveTo(-.95,0),a.lineTo(.95,0),a.lineTo(.95,2.5),a.absarc(0,2.5,.95,0,Math.PI,!1),a.lineTo(-.95,0);let c=new ir(a,20),l=c.attributes.uv,u=c.attributes.position;for(let w=0;w<l.count;w++)l.setXY(w,(u.getX(w)+.95)/1.9,u.getY(w)/3.45);let h=new Rt({map:op(),transparent:!0,opacity:0,depthWrite:!1}),d=new ye(c,h);d.position.z=.015,r.add(d);let f=new ye(c,new Rt({color:525572}));f.position.z=.01,r.add(f);let g=new xt;g.position.set(-.95,0,.06);let x=new ye(new et(1.9,2.5,.08),o);x.position.set(.95,1.25,0);let m=new ye(new st(.95,.95,.08,24,1,!1,-Math.PI/2,Math.PI),o);m.rotation.x=-Math.PI/2,m.position.set(.95,2.5,0);let p=new ye(new kn(.1,.022,8,20),Ep);p.position.set(1.5,1.2,.07),g.add(x,m,p),r.add(g);let S=new tt({color:9075300,roughness:.95});for(let w of[-1,1]){let R=new ye(new et(.26,2.5,.3),S);R.position.set(w*1.08,1.25,.08),r.add(R)}let y=new ye(new kn(1.08,.14,8,24,Math.PI),S);y.position.set(0,2.5,.08),r.add(y);let _={type:s};for(let w of[x,m])w.userData.action=_;if(n){let w=new ye(new Wt(1.7,.6),new tt({map:cs([n],{taille:40,W:640,H:224}),roughness:.9}));w.position.set(0,3.95,.06),w.userData.action=_,r.add(w)}let L=xh(t);return{groupe:r,action:_,battant:g,passage:d,ouverture:0,cible:0,arret:{x:i+L.x*2.4,z:e+L.z*2.4,yaw:t,pitch:.05},traversee:{x:i-L.x*1.2,z:e-L.z*1.2,yaw:t,pitch:.02},animer(w){this.ouverture+=(this.cible-this.ouverture)*Math.min(1,w*1.6),g.rotation.y=-this.ouverture*1.75,h.opacity=Math.min(1,this.ouverture*1.6)}}}function Ap(i,e,t,n=70){zi??(zi=oo());let s=new Float32Array(n*3),r=[],o=[],a=(u,h)=>{s[u*3]=i+(Math.random()-.5)*1.4,s[u*3+1]=e+Math.random()*.3,s[u*3+2]=t+(Math.random()-.5)*.5,r[u]=[(Math.random()-.5)*.25,.5+Math.random()*.9,.15+Math.random()*.25],o[u]=h?Math.random()*3:0};for(let u=0;u<n;u++)a(u,!0);let c=new Mt;c.setAttribute("position",new Et(s,3));let l=new rs(c,new Ai({map:zi,color:16752709,size:.07,transparent:!0,depthWrite:!1,blending:ii}));return l.userData.ignorerOmbre=!0,{objet:l,animer(u,h){for(let d=0;d<n;d++){if(o[d]+=u,o[d]>2.2+d%5*.3||s[d*3+1]>e+3.2){a(d,!1);continue}let f=r[d];s[d*3]+=(f[0]+Math.sin(h*3+d)*.12)*u,s[d*3+1]+=f[1]*u,s[d*3+2]+=f[2]*u}c.attributes.position.needsUpdate=!0}}}function Rp(i,e=220){zi??(zi=oo());let t=new Float32Array(e*3),n=[];for(let o=0;o<e;o++)n.push([i.minX+Math.random()*(i.maxX-i.minX),i.minY+Math.random()*(i.maxY-i.minY),i.minZ+Math.random()*(i.maxZ-i.minZ),Math.random()*10]);let s=new Mt;s.setAttribute("position",new Et(t,3));let r=new rs(s,new Ai({map:zi,color:16770752,size:.035,transparent:!0,opacity:.45,depthWrite:!1,blending:ii}));return r.userData.ignorerOmbre=!0,{objet:r,animer(o,a){for(let c=0;c<e;c++){let[l,u,h,d]=n[c];t[c*3]=l+Math.sin(a*.13+d)*.35,t[c*3+1]=u+Math.sin(a*.09+d*2)*.25,t[c*3+2]=h+Math.cos(a*.11+d)*.35}s.attributes.position.needsUpdate=!0}}}function Cp(i,e,t,n,s,r){let o=[s];r&&o.push("\u2014 "+r);let a=new ye(new Wt(1.3,.86),new tt({map:cs(o,{W:512,H:340,taille:34}),roughness:.9}));return a.position.set(i,e,t),a.rotation.y=n,a.position.addScaledVector(xh(n),.04),a}function co(i=.25){zi??(zi=oo());let e=new Zr(new Js({map:zi,blending:ii,depthWrite:!1,transparent:!0}));return e.scale.setScalar(i),e.userData.base=i,e.userData.phase=Math.random()*10,e}function Ip(i,e){for(let t of i){let n=t.userData.phase,s=1+.12*Math.sin(e*9+n)+.08*Math.sin(e*23+n*2);t.scale.set(t.userData.base*s,t.userData.base*s*1.25,1)}}var _h={OR:bp,FER:Ep};var qt=(i,e,t)=>new C(i,e,t),FM=qt(0,1,0);function OM(){let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d");e.fillStyle="#2a2a2a",e.fillRect(0,0,128,128),e.lineWidth=2.2;for(let n=0;n<16;n++)for(let s=-1;s<17;s++){let r=s*8+(n%2?4:0),o=n*8+4,a=150+(n*7+s*13)%5*14;e.strokeStyle=`rgb(${a},${a},${a-6})`,e.beginPath(),e.ellipse(r,o,4.2,3.4,0,0,Math.PI*2),e.stroke()}let t=new zn(i);return t.wrapS=t.wrapT=ln,t.repeat.set(4,4),t.colorSpace=mt,t.anisotropy=4,t}var nc=null;function BM(){return nc||(nc={acier:new tt({color:12895944,metalness:.9,roughness:.3}),maille:new tt({color:11842736,map:OM(),metalness:.75,roughness:.5}),tissu:new tt({vertexColors:!0,roughness:.92}),cuir:new tt({color:4861468,roughness:.8}),or:new tt({color:13146940,metalness:.85,roughness:.35}),sombre:new Rt({color:723208})},nc)}var lo=new yt;function Ne(i,e,t,n,s=0,r=0,o=0,a=1,c=1,l=1){return lo.position.set(e,t,n),lo.rotation.set(s,r,o),lo.scale.set(a,c,l),lo.updateMatrix(),i.applyMatrix4(lo.matrix),i}function fr(i,e,t,n,s=10){let r=e.clone().sub(i),o=r.length(),a=new st(n,t,o,s),c=new ke().compose(i.clone().add(e).multiplyScalar(.5),new un().setFromUnitVectors(FM,r.normalize()),qt(1,1,1));return a.applyMatrix4(c)}var ic=class{constructor(){this.p={}}ajouter(e,t,n){var r;let s=t.index?t.toNonIndexed():t;if(s.clearGroups(),e==="tissu"){let o=new Re(n),a=s.attributes.position.count,c=new Float32Array(a*3);for(let l=0;l<a;l++)c[l*3]=o.r,c[l*3+1]=o.g,c[l*3+2]=o.b;s.setAttribute("color",new Et(c,3))}for(let o of Object.keys(s.attributes))["position","normal","uv","color"].includes(o)||s.deleteAttribute(o);((r=this.p)[e]||(r[e]=[])).push(s)}vers(e){let t=BM();for(let[n,s]of Object.entries(this.p))e.add(new ye(mp(s),t[n]))}};function Pp(i,e){i.ajouter("maille",Ne(new Ct(.128,16,12),e.x,e.y-.01,e.z,0,0,0,1,1.12,1)),i.ajouter("sombre",Ne(new Ct(.1,14,10),e.x,e.y-.03,e.z-.085,0,0,0,.7,.85,.5))}var zM={heaume(i,e){i.ajouter("acier",Ne(new st(.13,.142,.3,20),e.x,e.y,e.z)),i.ajouter("acier",Ne(new Ct(.13,20,8,0,Math.PI*2,0,Math.PI/2),e.x,e.y+.15,e.z,0,0,0,1,.35,1)),i.ajouter("acier",Ne(new st(.147,.147,.03,20),e.x,e.y-.135,e.z));for(let t of[-1,1])i.ajouter("sombre",Ne(new et(.085,.016,.02),e.x+t*.055,e.y+.045,e.z-.134,0,t*.35,0));i.ajouter("acier",Ne(new et(.026,.27,.016),e.x,e.y-.005,e.z-.14));for(let[t,n]of[[.05,-.04],[.075,-.04],[.1,-.04],[.05,-.075],[.075,-.075],[.1,-.075]])i.ajouter("sombre",Ne(new Ct(.008,5,4),e.x+t,e.y+n,e.z-Math.sqrt(.139**2-t*t)));return .195},bec(i,e,t){let n=[[.13,-.12],[.136,0],[.125,.08],[.09,.15],[.04,.19],[.001,.205]].map(([s,r])=>new ee(s,r));i.ajouter("acier",Ne(new tr(n,20),e.x,e.y,e.z)),i.ajouter("acier",Ne(new vn(.105,.17,16),e.x,e.y-.01,e.z-.15,-Math.PI/2,0,0,1,1,.85));for(let s of[-1,1])i.ajouter("sombre",Ne(new et(.05,.014,.05),e.x+s*.042,e.y+.04,e.z-.115,0,0,-s*.5)),i.ajouter("or",Ne(new Ct(.016,8,6),e.x+s*.133,e.y,e.z-.02));for(let[s,r]of[[0,-.07],[.03,-.065],[-.03,-.065]])i.ajouter("sombre",Ne(new Ct(.007,5,4),e.x+s,e.y+r,e.z-.15));return i.ajouter("maille",Ne(new st(.128,.2*t,.17,18),e.x,e.y-.2,e.z,0,0,0,1,1,.85)),.205},conique(i,e){return Pp(i,e),i.ajouter("acier",Ne(new vn(.14,.22,20),e.x,e.y+.15,e.z)),i.ajouter("acier",Ne(new st(.144,.144,.035,20),e.x,e.y+.045,e.z)),i.ajouter("acier",Ne(new et(.03,.17,.016),e.x,e.y-.035,e.z-.143)),.26},chapel(i,e){return Pp(i,e),i.ajouter("acier",Ne(new Ct(.138,20,8,0,Math.PI*2,0,Math.PI/2),e.x,e.y+.045,e.z,0,0,0,1,.92,1)),i.ajouter("acier",Ne(new st(.145,.25,.045,24),e.x,e.y+.03,e.z)),i.ajouter("acier",Ne(new et(.014,.03,.24),e.x,e.y+.17,e.z)),.18},barbute(i,e){let t=[[.136,-.17],[.143,-.05],[.14,.05],[.12,.13],[.07,.18],[.001,.195]].map(([n,s])=>new ee(n,s));return i.ajouter("acier",Ne(new tr(t,20),e.x,e.y,e.z)),i.ajouter("sombre",Ne(new et(.05,.15,.03),e.x,e.y-.075,e.z-.132)),i.ajouter("sombre",Ne(new et(.15,.045,.03),e.x,e.y+.02,e.z-.126)),i.ajouter("acier",Ne(new et(.014,.035,.2),e.x,e.y+.19,e.z)),.2},salade(i,e){let t=[[.132,-.06],[.142,.03],[.122,.12],[.06,.17],[.001,.18]].map(([n,s])=>new ee(n,s));return i.ajouter("acier",Ne(new tr(t,20),e.x,e.y,e.z)),i.ajouter("acier",Ne(new et(.24,.018,.17),e.x,e.y-.09,e.z+.15,-.55,0,0)),i.ajouter("sombre",Ne(new et(.17,.018,.03),e.x,e.y+.025,e.z-.128)),i.ajouter("sombre",Ne(new Ct(.1,12,8),e.x,e.y-.03,e.z-.02,0,0,0,1,.8,1)),i.ajouter("acier",Ne(new st(.125,.16,.16,16,1,!1,Math.PI/2,Math.PI),e.x,e.y-.13,e.z)),i.ajouter("or",Ne(new Ct(.014,8,6),e.x,e.y-.07,e.z-.14)),.18}},HM={couronne(i,e,t){i.ajouter("or",Ne(new st(.135,.138,.05,20),e.x,e.y+t-.045,e.z));for(let n=0;n<8;n++){let s=n/8*Math.PI*2;i.ajouter("or",Ne(new vn(.022,.07,6),e.x+Math.sin(s)*.13,e.y+t+.01,e.z+Math.cos(s)*.13)),i.ajouter("or",Ne(new Ct(.012,6,4),e.x+Math.sin(s)*.13,e.y+t+.05,e.z+Math.cos(s)*.13))}},plumet(i,e,t,n){for(let s=-2;s<=2;s++)i.ajouter("tissu",Ne(new vn(.028,.32,6),e.x+s*.02,e.y+t+.12,e.z+.06,.45+Math.abs(s)*.08,0,-s*.18,1,1,.6),n);i.ajouter("or",Ne(new st(.02,.026,.05,8),e.x,e.y+t,e.z+.02))},ailes(i,e,t,n){for(let s of[-1,1])i.ajouter("tissu",Ne(new Ct(1,12,8),e.x+s*.07,e.y+t+.07,e.z+.02,0,0,s*.35,.012,.14,.11),n)},cornes(i,e,t,n){for(let s of[-1,1])i.ajouter("tissu",Ne(new kn(.11,.019,6,14,Math.PI*.5),e.x+s*.245,e.y+t-.09,e.z,0,s<0?Math.PI:0,Math.PI/2),n),i.ajouter("tissu",Ne(new vn(.019,.05,6),e.x+s*.245,e.y+t+.04,e.z),n)},boule(i,e,t){i.ajouter("acier",Ne(new st(.012,.018,.06,6),e.x,e.y+t+.02,e.z)),i.ajouter("or",Ne(new Ct(.035,12,8),e.x,e.y+t+.07,e.z))}},kM={table:i=>[qt(i*.3,.9,-.3),qt(i*.17,.93,-.6)],cuisse:i=>[qt(i*.3,.82,0),qt(i*.2,.71,-.26)],croise:i=>[qt(i*.27,.87+(i>0?.01:0),-.06),qt(-i*.06,.93+(i>0?.04:0),-.17)],coupe:i=>[qt(i*.33,.98,-.22),qt(i*.27,1.25,-.36)]},VM={table:{penche:-.15,g:"table",d:"table"},adosse:{penche:.1,g:"cuisse",d:"cuisse"},croise:{penche:.02,g:"croise",d:"croise"},coupe:{penche:-.12,g:"table",d:"coupe"},poing:{penche:-.05,g:"table",d:"cuisse"}};function Lp({couleur:i,couleur2:e=i,motif:t="uni",casque:n="heaume",cimier:s=null,couleurCimier:r=e,pose:o="table",carrure:a=1,phase:c=0}){let l=new xt,u=a,h=VM[o],d=new ic;for(let U of[-1,1]){let B=qt(U*.11,.6,.04),k=qt(U*.13,.6,-.4),$=qt(U*.14,.1,-.44);d.ajouter("maille",fr(B,k,.082,.07,10)),d.ajouter("acier",Ne(new Ct(.066,10,8),k.x,k.y+.01,k.z-.01)),d.ajouter("acier",fr(k,$,.057,.047,10)),d.ajouter("acier",Ne(new et(.1,.07,.25),U*.14,.035,-.5)),d.ajouter("tissu",Ne(new et(.2,.03,.42),U*.11,.69,-.15),t==="parti"&&U>0?e:i)}d.ajouter("tissu",Ne(new et(.2,.3,.025),0,.53,-.37),i),d.vers(l);let f=new xt;f.position.set(0,.6,.04),f.rotation.x=h.penche,l.add(f),f.updateMatrix();let g=f.matrix.clone().invert(),x=U=>U.clone().applyMatrix4(g),m=new ic,p=.185*u,S=.21*u,y=.02,_=.58,L=.64,w=U=>p+(S-p)*(U-y)/(_-y),R=(U,B,k,$,V,se=0)=>m.ajouter("tissu",Ne(new st(w(B)+se,w(U)+se,B-U,20,1,!1,k,$),0,(U+B)/2,0,0,0,0,1,1,L),V);t==="parti"?(R(y,_,0,Math.PI,e),R(y,_,Math.PI,Math.PI,i)):R(y,_,0,Math.PI*2,i);let P=.006;t==="croix"&&(R(.16,.54,Math.PI-.2,.4,e,P),R(.34,.41,Math.PI-.8,1.6,e,P)),t==="fasce"&&R(.27,.39,0,Math.PI*2,e,P),t==="pal"&&R(y,_,Math.PI-.32,.64,e,P),m.ajouter("cuir",Ne(new st(w(.14)+.012,w(.1)+.012,.05,20),0,.12,0,0,0,0,1,1,L)),m.ajouter("or",Ne(new et(.05,.045,.015),0,.12,-(w(.12)+.012)*L-.006)),m.ajouter("maille",Ne(new st(.085,.215*u,.13,18),0,.6,0,0,0,0,1,1,.78)),m.ajouter("maille",Ne(new st(.072,.08,.12,12),0,.68,0));for(let U of[-1,1])m.ajouter("acier",Ne(new Ct(.1,14,8,0,Math.PI*2,0,Math.PI/2),U*.205*u,.5,0,0,0,U*.25,1.1,.85,1)),m.ajouter("acier",Ne(new st(.104,.112,.045,14),U*.21*u,.475,0,0,0,U*.25,1.1,1,1));for(let U of[-1,1]){let[B,k]=kM[U<0?h.g:h.d](U),$=qt(U*.21*u,.47,0),V=x(B),se=x(k);m.ajouter("maille",fr($,V,.058,.052,10)),m.ajouter("acier",Ne(new Ct(.06,10,8),V.x,V.y,V.z)),m.ajouter("acier",fr(V,se,.05,.043,10));let X=se.clone().sub(V).normalize();m.ajouter("acier",fr(se.clone().addScaledVector(X,-.01),se.clone().addScaledVector(X,.035),.056,.058,10));let le=se.clone().addScaledVector(X,.115);if(m.ajouter("acier",fr(se,le,.046,.04,8)),m.ajouter("acier",Ne(new Ct(.04,8,6),le.x,le.y,le.z)),(U<0?h.g:h.d)==="coupe"){let fe=le.clone().add(qt(0,.02,0));m.ajouter("or",Ne(new st(.008,.008,.07,6),fe.x,fe.y+.02,fe.z)),m.ajouter("or",Ne(new st(.03,.03,.008,12),fe.x,fe.y-.015,fe.z)),m.ajouter("or",Ne(new st(.048,.026,.08,14),fe.x,fe.y+.09,fe.z))}}let E=qt(0,.81,0),M=zM[n](m,E,u);s&&HM[s](m,E,M,r),m.vers(f);let I=h.penche;return{groupe:l,animer(U){f.rotation.x=I+.012*Math.sin(U*1.25+c),f.rotation.y=.05*Math.sin(U*.23+c*2.1)+.025*Math.sin(U*.61+c),f.rotation.z=.015*Math.sin(U*.37+c*1.3),f.scale.set(1+.006*Math.sin(U*1.25+c),1,1+.01*Math.sin(U*1.25+c))}}}var wt={gueules:9313051,azur:2047866,sinople:3104050,sable:1973017,or:12095535,argent:14210248,pourpre:5909077,tanne:10115618};var gt=9,ct=7,Hi=6.5,Dp={textures:["mur","sol","bois","bois-sombre","cuir"],modeles:{bouclier:"modeles/kite_shield/modele.json",coupes:"modeles/brass_goblets/modele.json"}};function Up({decor:i=[],res:e}){let t=new xt,n=[],s=F=>(t.add(F),F),r=(F,J,z,Y,ne,me,ae,ze=0)=>{let He=new ye(new et(F,J,z),Y);return He.position.set(ne,me,ae),He.rotation.y=ze,s(He)},o=(F,J,z=13221294)=>e.materiau("mur",F,J,{color:z,roughness:.95,relief:1.4}),a=e.materiau("bois",1,1,{color:10121810,roughness:.8}),c=e.materiau("bois-sombre",1,1,{color:7227958,roughness:.75}),l=_h.FER;s(new Da(16771535,2761241,.85));let u=s(new or(16769724,38,14,.8,.95,1.2));u.position.set(0,6.2,.8),u.target.position.set(0,.8,-.3),s(u.target),u.castShadow=!0,u.shadow.mapSize.set(1024,1024),u.shadow.bias=-4e-4,u.shadow.normalBias=.02,u.shadow.camera.near=1,u.shadow.camera.far=12;let h=s(new Pi(16751180,52,17,1.5));h.position.set(0,.9,-ct+1.1),h.castShadow=!0,h.shadow.mapSize.set(512,512),h.shadow.bias=-.002,h.shadow.normalBias=.03,h.shadow.camera.near=.3,h.shadow.camera.far=16;let d=[],f=(F,J,z)=>{let Y=s(new Pi(16763016,16,11,1.5));Y.position.set(F,J,z),d.push(Y)},g=new ye(new Wt(2*gt,2*ct),e.materiau("sol",2*gt/3.2,2*ct/3.2,{color:9735040,roughness:1,relief:.8}));g.rotation.x=-Math.PI/2,g.userData.sol=!0,s(g);let x=(F,J,z,Y)=>{let ne=new ye(new Wt(F,Hi),o(F/3.4,Hi/3.4));ne.position.set(J,Hi/2,z),ne.rotation.y=Y,ne.userData.mur=!0,s(ne)};x(2*gt,0,-ct,0),x(2*gt,0,ct,Math.PI),x(2*ct,-gt,0,Math.PI/2),x(2*ct,gt,0,-Math.PI/2);let m=new ye(new Wt(2*gt,2*ct),e.materiau("bois-sombre",4,3,{color:3811356}));m.rotation.x=Math.PI/2,m.position.y=Hi,m.userData.mur=!0,s(m);let p=e.materiau("bois",1,4,{color:5914672});for(let F=-gt+1.5;F<gt;F+=3)r(.4,.5,2*ct,p,F,Hi-.25,0);let S=o(.25,1.1,13482398);for(let F of[-7.55,-2.45,2.45,7.55])r(.6,3.4,.32,S,F,1.7,-ct+.16),r(.82,.24,.46,S,F,3.52,-ct+.23);for(let F of[-5,5]){let J=new Hn;J.moveTo(-2.25,0),J.lineTo(2.25,0),J.lineTo(2.25,3.4),J.absarc(0,3.4,2.25,0,Math.PI,!1),J.lineTo(-2.25,0);let z=new ye(new ir(J,24),o(1/3.4,1/3.4,9272425));z.position.set(F,0,-ct+.01),s(z);let Y=new Hn;Y.absarc(0,0,2.6,0,Math.PI,!1),Y.lineTo(-2.25,0),Y.absarc(0,0,2.25,Math.PI,0,!0),Y.lineTo(2.6,0);let ne=new ye(new nr(Y,{depth:.3,bevelEnabled:!1,curveSegments:24}),o(1/1.6,1/1.6,13482398));ne.position.set(F,3.4,-ct),s(ne)}let y=-ct;r(.6,2.1,.85,o(.2,.7,12890262),-1.75,1.05,y+.42),r(.6,2.1,.85,o(.2,.7,12890262),1.75,1.05,y+.42);let _=new ye(new Wt(2.9,2.1),new tt({color:1708299,roughness:1}));_.position.set(0,1.05,y+.02),s(_),r(4.6,.55,.95,c,0,2.375,y+.47),r(4.9,.1,1.12,c,0,2.7,y+.56),r(4,Hi-2.75,.6,o(1.2,1.1,13219226),0,2.75+(Hi-2.75)/2,y+.3),r(3.4,.08,1.5,o(1,.45,9206892),0,.04,y+1);for(let F of[-.45,0,.45]){let J=new ye(new st(.1,.11,1,8),c);J.rotation.z=Math.PI/2,J.rotation.y=F*.6,J.position.set(F*.3,.2+Math.abs(F)*.05,y+.6),s(J)}for(let F of[-.7,.7])r(.05,.45,.6,l,F,.25,y+.6);for(let[F,J,z]of[[0,1.2,.55],[-.45,.85,.45],[.45,.9,.45],[.15,.6,.9],[-.2,.5,.8]]){let Y=co(J);Y.position.set(F,z,y+.6),s(Y),n.push(Y)}let L=new tt({color:15786690,roughness:.6,emissive:2759176}),w=(F,J,z,Y=.22)=>{let ne=new ye(new st(.03,.07,.12,10),l);ne.position.set(F,J+.06,z),s(ne);let me=new ye(new st(.035,.035,Y,10),L);me.position.set(F,J+.12+Y/2,z),s(me);let ae=co(.22);ae.position.set(F,J+.12+Y+.07,z),s(ae),n.push(ae)};for(let F of[-2.1,-1.6,2])w(F,2.75,y+.6,.18+Math.abs(F)*.03);let R=(F,J,z,Y)=>{let ne=new xt;ne.position.set(F,J,z),ne.rotation.y=Y;let me=new ye(new et(.06,.06,.42),l);me.position.set(0,-.25,.2),ne.add(me);let ae=new ye(new st(.03,.03,.4,6),l);ae.position.set(0,-.1,.42),ne.add(ae);for(let q=0;q<7;q++){let Q=q/7*Math.PI*2,xe=new ye(new st(.012,.012,.5,4),l);xe.position.set(Math.cos(Q)*.12,.3,.42+Math.sin(Q)*.12),xe.rotation.set(Math.sin(Q)*.28,0,-Math.cos(Q)*.28),ne.add(xe)}let ze=new ye(new kn(.2,.015,6,20),l);ze.rotation.x=Math.PI/2,ze.position.set(0,.52,.42),ne.add(ze);let He=new ye(new Ct(.1,8,6),new Rt({color:16747050}));He.position.set(0,.22,.42),ne.add(He);let Xe=co(.75);Xe.position.set(0,.5,.42),ne.add(Xe),n.push(Xe);let D=co(.45);D.position.set(.03,.72,.42),ne.add(D),n.push(D),s(ne);let pe=new C(Math.sin(Y),0,Math.cos(Y));f(F+pe.x*.6,J+.5,z+pe.z*.6)};R(-7.55,3,-ct+.32,0),R(7.55,3,-ct+.32,0),R(-5,3.1,ct,Math.PI),R(5,3.1,ct,Math.PI);for(let F of[-1,1]){let J=F*3.25,z=-ct+.85,Y=new ye(new st(.03,.03,1.55,6),l);Y.position.set(J,.78,z),s(Y);for(let ne=0;ne<3;ne++){let me=ne/3*Math.PI*2,ae=new ye(new et(.04,.04,.4),l);ae.position.set(J+Math.cos(me)*.15,.08,z+Math.sin(me)*.15),ae.rotation.y=-me+Math.PI/2,s(ae)}r(.7,.04,.05,l,J,1.55,z);for(let ne of[-.3,-.1,.1,.3])w(J+ne,1.55,z,.2+Math.abs(ne)*.2)}let P=e.materiau("bois",.2,2,{color:8018496}),E=new tt({color:12106944,metalness:.85,roughness:.35});r(.12,.1,1.9,c,-gt+.12,2.5,-5.4),r(.12,.1,1.9,c,-gt+.12,.45,-5.4),[-6.1,-5.65,-5.2,-4.75].forEach((F,J)=>{let z=new ye(new st(.025,.025,2.9,6),P);if(z.position.set(-gt+.26,1.5,F),s(z),J%2){let ne=new ye(new et(.02,.3,.26),E);ne.position.set(-gt+.26,2.75,F+.12),s(ne)}let Y=new ye(new vn(.05,.35,4),E);Y.position.set(-gt+.26,3.12,F),s(Y)});let M=ep(0),I=(F,J,z,Y)=>{let ne=new ye(new Wt(1.1,2.75),new tt({map:M,roughness:.95,transparent:!0,alphaTest:.5,side:$t}));if(ne.position.set(F,3.9,J),ne.rotation.y=z,ne.position.addScaledVector(new C(Math.sin(z),0,Math.cos(z)),.05),s(ne),Y){let me=e.modele("bouclier",.95);me&&(me.position.set(F,3.25,J),me.rotation.y=z,me.position.addScaledVector(new C(Math.sin(z),0,Math.cos(z)),.16),s(me))}};I(gt,-5.6,-Math.PI/2,!0),I(7.2,ct,Math.PI,!0),I(-7,ct,Math.PI,!1);let U=3,B=.84,k=e.materiau("cuir",2,2,{color:15251850,roughness:.7,relief:.8}),$=new ye(new st(U,U,.08,96),[c,k,c]);$.position.y=B,$.userData.sol=!0,s($);let V=new ye(new st(U+.03,U-.05,.16,96,1,!0),c);V.position.y=B-.1,s(V);let se=new tt({color:3810324,roughness:.9}),X=new tt({color:9073752,metalness:.7,roughness:.4}),le=[];for(let F=0;F<8;F++){let J=F/8*Math.PI*2+Math.PI/8,z=new ye(new et(.018,.006,U-.4),se);z.position.set(Math.sin(J)*(U/2+.2),B+.042,Math.cos(J)*(U/2+.2)),z.rotation.y=J,s(z);for(let Y=.5;Y<U-.1;Y+=.22)le.push([Math.sin(J)*Y,Math.cos(J)*Y])}for(let F=0;F<120;F++){let J=F/120*Math.PI*2;le.push([Math.sin(J)*(U-.08),Math.cos(J)*(U-.08)])}let fe=new ye(new et(.62,.01,.62),new tt({color:7033398,metalness:.5,roughness:.5}));fe.position.y=B+.045,fe.rotation.y=Math.PI/4,s(fe);for(let F=0;F<4;F++){let J=F/4*Math.PI*2;le.push([Math.sin(J)*.4,Math.cos(J)*.4])}let Ee=new Ct(.014,6,4),Ge=new Qs(Ee,X,le.length),rt=new ke;le.forEach(([F,J],z)=>{rt.makeTranslation(F,B+.045,J),Ge.setMatrixAt(z,rt)}),s(Ge);for(let F=0;F<6;F++){let J=F/6*Math.PI*2;r(.18,B-.08,.18,c,Math.sin(J)*2.1,(B-.08)/2,Math.cos(J)*2.1);let z=J+Math.PI/6,Y=Math.sin(z)*1.82,ne=Math.cos(z)*1.82;r(.1,.12,2.1,c,Y,.18,ne,z+Math.PI/2)}let j=e.modele("coupes",.22);j&&(j.position.set(.55,B+.04,.35),s(j));let ce=e.materiau("bois",1,1,{color:10120780,roughness:.8}),Te=(F,J)=>{let z=new Hn;return z.moveTo(-F/2,0),z.lineTo(F/2,0),z.lineTo(0,J),z.closePath(),new nr(z,{depth:.08,bevelEnabled:!1})},ue=U+.6;for(let F=0;F<12;F++){if(F===6)continue;let J=F===0,z=F/12*Math.PI*2+Math.PI,Y=new xt;Y.position.set(Math.sin(z)*ue,0,Math.cos(z)*ue),Y.rotation.y=z;let ne=J?.78:.66,me=J?1.75:1.3,ae=.5,ze=(Xe,D,pe,q,Q,xe)=>{let ve=new ye(new et(Xe,D,pe),ce);ve.position.set(q,Q,xe),Y.add(ve)};ze(ne,.07,.58,0,ae,0),ze(ne-.08,me,.06,0,ae+me/2,.27);for(let Xe of[-1,1]){ze(.08,ae+me+.05,.08,Xe*ne/2,(ae+me+.05)/2,.27),ze(.07,ae,.07,Xe*(ne/2-.03),ae/2,-.25),ze(.06,.06,.55,Xe*ne/2,ae+.3,0),ze(.06,.3,.06,Xe*ne/2,ae+.15,-.25);let D=new ye(new vn(.06,.14,4),ce);D.position.set(Xe*ne/2,ae+me+.12,.27),D.rotation.y=Math.PI/4,Y.add(D)}let He=new ye(Te(ne+.04,J?.42:.3),ce);if(He.position.set(0,ae+me,.23),Y.add(He),J){let Xe=new ye(Te(.4,.22),ce);Xe.position.set(0,ae+me+.38,.23),Y.add(Xe);for(let D of[-1,1]){let pe=new ye(new et(.05,me-.2,.02),_h.OR);pe.position.set(D*.22,ae+me/2,.235),Y.add(pe)}}s(Y)}let Fe={0:{couleur:wt.gueules,couleur2:wt.or,motif:"croix",casque:"heaume",cimier:"couronne",pose:"table",carrure:1.08},1:{couleur:wt.azur,couleur2:wt.argent,motif:"parti",casque:"bec",cimier:"plumet",couleurCimier:15525592,pose:"croise",carrure:1},2:{couleur:wt.sinople,couleur2:wt.or,motif:"fasce",casque:"conique",pose:"table",carrure:.95},3:{couleur:wt.tanne,couleur2:wt.sable,motif:"pal",casque:"chapel",pose:"adosse",carrure:1.12},4:{couleur:wt.pourpre,couleur2:wt.argent,motif:"croix",casque:"barbute",cimier:"boule",pose:"coupe",carrure:.98},5:{couleur:wt.sable,couleur2:wt.or,motif:"parti",casque:"salade",pose:"table",carrure:1.02},7:{couleur:wt.argent,couleur2:wt.gueules,motif:"croix",casque:"heaume",cimier:"cornes",couleurCimier:15129796,pose:"poing",carrure:1.1},8:{couleur:wt.sinople,couleur2:wt.argent,motif:"fasce",casque:"bec",pose:"table",carrure:.94},9:{couleur:wt.azur,couleur2:wt.or,motif:"croix",casque:"conique",cimier:"ailes",couleurCimier:wt.or,pose:"adosse",carrure:1},10:{couleur:11887914,casque:"barbute",cimier:"plumet",couleurCimier:wt.gueules,pose:"croise",carrure:1.05},11:{couleur:wt.gueules,couleur2:wt.azur,motif:"parti",casque:"chapel",pose:"table",carrure:.97}},Ve=[];for(let[F,J]of Object.entries(Fe)){let z=F/12*Math.PI*2+Math.PI,Y=Lp({...J,phase:F*1.7});Y.groupe.position.set(Math.sin(z)*ue,0,Math.cos(z)*ue),Y.groupe.rotation.y=z,s(Y.groupe),Ve.push(Y)}let Be=new ye(new Wt(1.1,1.9),new Rt({map:sp()}));Be.position.set(-gt+.03,2.6,4.6),Be.rotation.y=Math.PI/2,s(Be);let Qe=new ye(new Ca(.55,24,0,Math.PI),new Rt({color:11739677}));Qe.position.set(-gt+.03,3.55,4.6),Qe.rotation.y=Math.PI/2,s(Qe),s(new Pi(16763034,4,4,2)).position.set(-gt+.8,2.6,4.6);let oe=new xt;oe.position.set(-7.2,0,4.6),oe.rotation.y=-Math.PI/2;let A=(F,J,z,Y,ne,me,ae=c)=>{let ze=new ye(new et(F,J,z),ae);return ze.position.set(Y,ne,me),oe.add(ze),ze};A(.12,1.05,.12,0,.525,0),A(.6,.08,.1,0,.04,0),A(.1,.08,.6,0,.04,0);let Ae=A(.72,.04,.5,0,1.12,.02);Ae.rotation.x=.42;let re=new xt;re.position.set(0,1.16,.03),re.rotation.x=.42,oe.add(re);let be=new ye(new et(.62,.025,.44),new tt({color:5902354,roughness:.7}));re.add(be);let de=new ye(new et(.58,.035,.4),[L,L,new tt({map:rp(),roughness:.9}),L,L,L]);de.position.y=.028,re.add(de);let Oe=new ye(new vn(.02,.32,4),new tt({color:15262420,roughness:.9}));Oe.position.set(.3,.07,.12),Oe.rotation.set(Math.PI/2,0,.9),re.add(Oe),s(oe);let Se=new C(-7.2,0,4.6);w(Se.x+.05,1.05,Se.z-.42,.2);let T={type:"livre"};for(let F of[be,de,Ae])F.userData.action=T;let v={},H=[[1,-5,-ct,0],[4,5,-ct,0],[5,-gt,-2.2,Math.PI/2],[2,-gt,1.2,Math.PI/2],[6,gt,-3,-Math.PI/2],[3,gt,3,-Math.PI/2],[7,-2.6,ct,Math.PI]];for(let[F,J,z,Y]of H){let ne=Tp(F,J,z,Y);s(ne.groupe),v[F]=ne}let Z=wp(gt,0,-Math.PI/2);s(Z.groupe);let ie=[[gt,1.9,5.4,-Math.PI/2],[2.2,1.9,ct,Math.PI]];i.slice(0,ie.length).forEach((F,J)=>{let[z,Y,ne,me]=ie[J];s(Cp(z,Y,ne,me,F.replique,F.personnage))});let K=Ap(0,.5,y+.6,70);s(K.objet);let we=Rp({minX:-gt+1,maxX:gt-1,minY:.4,maxY:Hi-1,minZ:-ct+1,maxZ:ct-1},220);s(we.objet),t.traverse(F=>{if(!F.isMesh||F.userData.ignorerOmbre)return;F.receiveShadow=!0;let J=[].concat(F.material).every(z=>z.isMeshBasicMaterial);F.castShadow=!F.userData.mur&&!F.userData.sol&&!J&&F!==m}),g.castShadow=!1;let ge=0;return{groupe:t,cases:v,porte:Z,sol:g,lumieresOmbre:{fortes:[h],legeres:[u]},limites:{minX:-gt+.8,maxX:gt-.8,minZ:-ct+.8,maxZ:ct-.8},obstacles:[{x:0,z:0,r:ue+.5},{x:0,z:-ct+.9,r:1.6},{x:-7.2,z:4.6,r:.7},{x:-3.25,z:-ct+.85,r:.45},{x:3.25,z:-ct+.85,r:.45}],depart:{x:0,z:5.5,yaw:0,pitch:.02},vueLivre:{x:-8.15,z:4.6,yaw:-Math.PI/2,pitch:-.42},brouillard:919813,animer(F){let J=Math.min(.05,Math.max(0,F-ge));ge=F,Ip(n,F);for(let z of Ve)z.animer(F);K.animer(J,F),we.animer(J,F),h.intensity=52+10*Math.sin(F*11.7)+6*Math.sin(F*5.3),d.forEach((z,Y)=>{z.intensity=16+2.5*Math.sin(F*(8+Y)+Y*2)+1.5*Math.sin(F*19+Y)})}}}var Jt=window.CALENDRIER||{annee:2026,salles:[],cases:[],decor:[]},hs={"table-ronde":{construire:Up,ressources:Dp}},De=i=>document.querySelector(i),Ih=/apercu/.test(location.hash)||/apercu/.test(location.search),Ph="kaamelott-avent-vus-"+Jt.annee,kp="kaamelott-avent-apercu-jour",Lh="kaamelott-avent-salle-vue-",xr=1.65,Wi=matchMedia("(prefers-reduced-motion: reduce)").matches,Sh=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),fo=(i,e,t)=>Math.max(e,Math.min(t,i)),po=0;if(Ih)try{po=+localStorage.getItem(kp)||1}catch{po=1}var Vp=i=>new Date(Jt.annee,11,i);function _o(){if(po)return po;let i=new Date;return i<Vp(1)?+Jt.avantPremiere||0:i.getFullYear()===Jt.annee&&i.getMonth()===11?Math.min(i.getDate(),25):25}var Vi=i=>i<=_o(),Dh=i=>i<_o(),vo=i=>Jt.cases.find(e=>e.jour===i)||{jour:i};function WM(i){if(!i)return"";let e=String(i).match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);return e?e[1]:/^[\w-]{11}$/.test(i)?i:""}function Uh(i){return Array.isArray(i.repliques)&&i.repliques.length?i.repliques.map(e=>({texte:e.texte||e.replique||"",personnage:e.personnage||"",gif:e.gif||"",mp3:e.mp3||"",mp4:e.mp4||""})):[{texte:i.replique||"",personnage:i.personnage||"",gif:i.gif||"",mp3:i.mp3||"",mp4:i.mp4||""}]}var bh=i=>i.texte?`\xAB ${i.texte} \xBB`:"R\xE9plique \xE0 renseigner",Gp=i=>Uh(i).map(e=>e.mp3).filter(Boolean),_r=new Set;try{_r=new Set(JSON.parse(localStorage.getItem(Ph)||"[]"))}catch{}function XM(i){_r.add(i);try{localStorage.setItem(Ph,JSON.stringify([..._r]))}catch{}}var Np=0;function mo(i){let e=De("#toast");e.textContent=i,e.hidden=!1,clearTimeout(Np),Np=setTimeout(()=>{e.hidden=!0},2800)}var Pn=null,pr=!0,Eh=[],Fp=new Map,ho=new Set;function cc(){if(!Pn)try{Pn=new(window.AudioContext||window.webkitAudioContext),Pn.resume()}catch{Pn=null}}async function qM(i){let e=Fp.get(i);if(!e){let t=await fetch(i);e=await Pn.decodeAudioData(await t.arrayBuffer()),Fp.set(i,e)}return e}function Nh(){for(let i of Eh)try{i.stop()}catch{}Eh=[]}async function Th(i){let e=[].concat(i).filter(Boolean);if(!(!Pn||!pr||!e.length))try{Pn.state==="suspended"&&await Pn.resume();let t=await Promise.all(e.map(qM));Nh();let n=Pn.currentTime+.02;for(let s of t){let r=Pn.createBufferSource();r.buffer=s,r.connect(Pn.destination),r.start(n),Eh.push(r),n+=s.duration+.6}}catch{}}var wh=!1;function Wp(){let i=document.documentElement;document.fullscreenElement||!i.requestFullscreen||i.requestFullscreen().then(()=>{wh=!0}).catch(()=>{})}function YM(){wh&&document.fullscreenElement&&document.exitFullscreen().catch(()=>{}),wh=!1}var ds=De("#scene"),zt=null;try{zt=new pa({canvas:ds,antialias:!0,powerPreference:"high-performance"})}catch{zt=null}var ki=new ga,ot=new Dt(70,1,.05,60);ot.rotation.order="YXZ";var ZM=matchMedia("(pointer: coarse)").matches,$M=(navigator.hardwareConcurrency||4)<=4||(navigator.deviceMemory||4)<=3,Gi=$M?"basse":ZM?"moyenne":"haute",Op=()=>Gi==="haute"?1.75:Gi==="moyenne"?1.5:1.25,KM={uniforms:{tDiffuse:{value:null},temps:{value:0},resolution:{value:new ee(1,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float temps; uniform vec2 resolution; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(vec3(l), c, 0.82);
      vec3 ombres = vec3(0.90, 0.97, 1.05), hautes = vec3(1.07, 1.0, 0.86);
      c *= mix(ombres, hautes, smoothstep(0.05, 0.75, l));
      c = mix(c, c * c * (3.0 - 2.0 * c), 0.22);
      c = c * 0.96 + 0.015;
      float d = distance(vUv, vec2(0.5));
      c *= mix(1.0, 0.5, smoothstep(0.32, 0.86, d));
      float n = fract(sin(dot(vUv * resolution + temps * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
      c += (n - 0.5) * 0.03;
      gl_FragColor = vec4(c, 1.0);
    }`},Gn=null,gr=null,sc=null;function jM(){zt.shadowMap.enabled=!0,zt.shadowMap.type=pu,Gn=new Wa(zt),Gn.addPass(new Xa(ki,ot)),gr=new ur(new ee(innerWidth/2,innerHeight/2),.55,.55,.88),gr.enabled=Gi!=="basse",Gn.addPass(gr),Gn.addPass(new qa),sc=new lr(KM),Gn.addPass(sc),rc()}function Ah(i=0){Gn?(sc.uniforms.temps.value=i%100,Gn.render()):zt.render(ki,ot)}function Xp(){if(Le?.lumieresOmbre){for(let i of Le.lumieresOmbre.fortes)i.castShadow=Gi!=="basse";for(let i of Le.lumieresOmbre.legeres)i.shadow.mapSize.set(Gi==="basse"?512:1024,Gi==="basse"?512:1024)}}var us={n:0,somme:0,fait:!1};function JM(i){us.fait||Gi==="basse"||(us.n++,us.somme+=i,!(us.n<90)&&(us.fait=!0,us.somme/us.n>.04&&(Gi="basse",gr&&(gr.enabled=!1),Xp(),rc())))}function rc(){if(!zt)return;let i=innerWidth,e=innerHeight;zt.setPixelRatio(Math.min(devicePixelRatio,Op())),zt.setSize(i,e,!1),Gn&&(Gn.setPixelRatio(Math.min(devicePixelRatio,Op())),Gn.setSize(i,e),gr?.resolution.set(i/2,e/2),sc?.uniforms.resolution.value.set(i,e)),ot.aspect=i/e,ot.fov=i<e?78:64,ot.updateProjectionMatrix()}zt&&(zt.toneMapping=io,zt.toneMappingExposure=1.25,addEventListener("resize",rc),rc());var Le=null,Bp=(i,e)=>{let t=Jt.salles.findIndex(n=>n.id===i);return t<0?null:Jt.salles[t+e]||null},Rh=i=>i?.jours?.length?Math.min(...i.jours):25,Je={yaw:0,pitch:-.04,cible:null,glisse:null},mr=new Map,go=!1,rn=!1;function QM(i){i.traverse(e=>{e.geometry?.dispose();for(let t of[].concat(e.material||[])){for(let n of["map","normalMap"])t[n]&&!t[n].userData?.gif&&t[n].dispose();t.dispose()}})}function eS(){let i=document.createElement("canvas");i.width=256,i.height=128;let e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,128);t.addColorStop(0,"#120b06"),t.addColorStop(.45,"#5e4430"),t.addColorStop(.55,"#b08860"),t.addColorStop(1,"#1a120c"),e.fillStyle=t,e.fillRect(0,0,256,128);let n=new zn(i);n.mapping=Vr,n.colorSpace=mt;let s=new Ks(zt),r=s.fromEquirectangular(n).texture;return s.dispose(),n.dispose(),r}async function qp(i,e){let t=hs[i],n=await Sp(t.ressources,e);Le&&(ki.remove(Le.groupe),QM(Le.groupe),mr.clear()),Le=t.construire({decor:Jt.decor||[],res:n}),Le.id=i;let s=Bp(i,1),r=Bp(i,-1);Le.porte&&(Le.porte.versSalle=s?.id||"",Le.porte.jour=Rh(s)),Le.porteRetour&&(Le.porteRetour.versSalle=r?.id||""),Xp(),ki.add(Le.groupe),ki.background=new Re(Le.brouillard),ki.fog=new ma(Le.brouillard,14,34),ot.position.set(Le.depart.x,xr,Le.depart.z),Je.yaw=Le.depart.yaw,Je.pitch=(Le.depart.pitch??0)+(innerWidth<innerHeight?.06:0),Je.cible=null,Je.glisse=null,De("#nomSalle").textContent=Jt.salles.find(o=>o.id===i)?.nom||"",ho.clear();for(let o of Object.keys(Le.cases).map(Number)){tS(o);let a=Le.cases[o];a.ouverture=a.cible,Yp(o)<3.2&&ho.add(o)}}function Yp(i){let e=Le.cases[i];return Math.hypot(ot.position.x-e.position.x,ot.position.z-e.position.z)}function vh(i,e){i.map&&i.map!==e&&!i.map.userData?.gif&&i.map.dispose(),i.map=e,i.color.setScalar(1),i.needsUpdate=!0}function Zp(i,e,t){let n=i.cadreRatio;e>n?(t.repeat.set(n/e,1),t.offset.set((1-n/e)/2,0)):(t.repeat.set(1,e/n),t.offset.set(0,0))}function tS(i){let e=Le?.cases[i];if(!e)return;let t=Vi(i),n=Dh(i),s=vo(i);for(let u of e.matsVolets)u.color.setScalar(t?1:.45);if(e.pulse=t&&!n,e.cible=n?1:0,e.lumiereCible=0,!n)return;let r=Uh(s),o=r.map(bh),a=[...new Set(r.map(u=>u.personnage).filter(Boolean))];a.length===1&&o.push("\u2014 "+a[0]),vh(e.plaque.material,cs(o,{taille:40}));let c=()=>vh(e.ecran.material,cs(r.map(bh),{W:512,H:376,taille:40,titre:s.episode||""})),l=r.map(u=>u.gif).filter(Boolean);l.length&&!mr.has(i)?(mr.set(i,null),Promise.all(l.map(fp)).then(u=>{for(let h of u)h.texture.userData.gif=!0;mr.set(i,{liste:u,i:0,t:0,c:e}),Zp(e,u[0].ratio,u[0].texture),vh(e.ecran.material,u[0].texture)}).catch(()=>{mr.delete(i),c()})):l.length||c()}function oc(i,e){let t=Le.limites;for(let n=0;n<2;n++){i=fo(i,t.minX,t.maxX),e=fo(e,t.minZ,t.maxZ);for(let s of Le.obstacles){let r=i-s.x,o=e-s.z,a=Math.hypot(r,o);if(a<s.r){let c=s.r/(a||.001);i=s.x+r*c,e=s.z+o*c}}}return{x:i,z:e}}var zp=new Fa;function $p(i,e){let t=new ee(i/innerWidth*2-1,-(e/innerHeight)*2+1);zp.setFromCamera(t,ot);for(let n of zp.intersectObject(Le.groupe,!0))if(!n.object.isSprite&&(n.object.userData.action||n.object.userData.sol||n.object.userData.mur))return n;return null}function di(i,e,t=.35){let n=oc(i.x,i.z),s={x:ot.position.x,z:ot.position.z},r=null,o=n.x-s.x,a=n.z-s.z,c=o*o+a*a;if(c>1e-4)for(let u of Le.obstacles){let h=fo(((u.x-s.x)*o+(u.z-s.z)*a)/c,0,1),d=s.x+o*h,f=s.z+a*h,g=Math.hypot(d-u.x,f-u.z);if(g<u.r&&h>.05&&h<.95){let x=d-u.x,m=f-u.z;g<.001&&(x=-a,m=o);let p=(u.r+.6)/Math.hypot(x,m),S={x:u.x+x*p,z:u.z+m*p};r={x:2*S.x-(s.x+n.x)/2,z:2*S.z-(s.z+n.z)/2};break}}let l=r?(Math.hypot(r.x-s.x,r.z-s.z)+Math.hypot(n.x-r.x,n.z-r.z))*.8:Math.sqrt(c);Je.cible=null,Je.glisse={de:{x:s.x,z:s.z,yaw:Je.yaw,pitch:Je.pitch},vers:{x:n.x,z:n.z,yaw:i.yaw,pitch:i.pitch??-.02},ctrl:r,t:0,dur:fo(l/3.4,t,2.4),fin:e}}function nS(i,e){if(rn)return;let t=$p(i,e);if(!t)return;let n=t.object.userData.action;n?.type==="case"?sS(n.jour):n?.type==="porte"?rS():n?.type==="retour"?Fh(-1):n?.type==="livre"?pS():t.object.userData.sol&&(Je.glisse=null,Je.cible=oc(t.point.x,t.point.z))}function iS(i){let e=i.coins().map(o=>o.project(ot)),t=e.map(o=>(o.x+1)/2*innerWidth),n=e.map(o=>(1-o.y)/2*innerHeight),s=Math.min(...t),r=Math.min(...n);return{left:s,top:r,width:Math.max(...t)-s,height:Math.max(...n)-r}}function sS(i){if(!Vi(i)){mo(`Patience ! Cette case s'ouvre le ${i} d\xE9cembre.`);return}let e=Le.cases[i];Wp(),rn=!0;let t=innerWidth<innerHeight?2.7:1.8,n={x:e.position.x+e.normale.x*t,z:e.position.z+e.normale.z*t,yaw:e.arret.yaw,pitch:Math.atan2(e.position.y-xr,t)};di(n,()=>{let s=e.ouverture>.9;e.cible=1,e.lumiereCible=1,setTimeout(()=>{rn=!1,jp(i,iS(e))},Wi||s?150:900)},.6)}function rS(){let i=Le.porte;if(!i.versSalle){di(i.arret),mo("Cette porte ne m\xE8ne nulle part\u2026 pour l'instant.");return}if(!Vi(i.jour)){di(i.arret),mo(`Cette porte s'ouvrira le ${i.jour} d\xE9cembre.`);return}Fh(1)}function yh(i,e){let t=i.groupe,n=t.rotation.y;return{x:t.position.x+Math.sin(n)*e,z:t.position.z+Math.cos(n)*e,yaw:n+Math.PI,pitch:.02}}async function Kp(i,e){try{localStorage.setItem(Lh+i,"1")}catch{}await qp(i);let t=e==="avant"?Le.porteRetour:e==="arriere"?Le.porte:null,n=e==="avant"?Le.entree||t&&yh(t,2.2):t?yh(t,2.2):null;if(n)if(t&&!Wi){let s=yh(t,.9);ot.position.set(s.x,xr,s.z),Je.yaw=n.yaw,Je.pitch=n.pitch??0,t.ouverture=1,t.cible=1,di(n,()=>{t.cible=0},1.3)}else ot.position.set(n.x,xr,n.z),Je.yaw=n.yaw,Je.pitch=n.pitch??0}function Fh(i=1){let e=i>0?Le.porte:Le.porteRetour;if(!(!e||rn)){if(!e.versSalle){di(e.arret);return}rn=!0,di(e.arret,()=>{e.cible=1,setTimeout(()=>{if(!hs[e.versSalle]){mo("La suite du ch\xE2teau se pr\xE9pare\u2026 Revenez bient\xF4t !"),setTimeout(()=>{e.cible=0,rn=!1},2200);return}di(e.traversee,null,1.6);let t=De("#fondu");setTimeout(()=>t.classList.add("actif"),700),setTimeout(async()=>{await Kp(e.versSalle,i>0?"avant":"arriere"),t.classList.remove("actif"),rn=!1},1500)},Wi?300:1700)},.8)}}async function oS(i){if(rn||!hs[i]||!Le||i===Le.id)return;rn=!0;let e=De("#fondu");e.classList.add("actif"),await new Promise(n=>setTimeout(n,Wi?50:800));let t=Jt.salles.findIndex(n=>n.id===i)>Jt.salles.findIndex(n=>n.id===Le.id);await Kp(i,t?"avant":"arriere"),e.classList.remove("actif"),rn=!1}var jt=null;ds.addEventListener("pointerdown",i=>{i.pointerType==="mouse"&&i.button!==0||(jt={id:i.pointerId,x:i.clientX,y:i.clientY,t:performance.now(),bouge:0},ds.setPointerCapture?.(i.pointerId))});ds.addEventListener("pointermove",i=>{if(jt&&i.pointerId===jt.id){let e=i.clientX-jt.x,t=i.clientY-jt.y;if(jt.x=i.clientX,jt.y=i.clientY,jt.bouge+=Math.abs(e)+Math.abs(t),jt.bouge>8&&!rn){let n=i.pointerType==="touch"?.006:.004;Je.yaw+=e*n,Je.pitch=fo(Je.pitch+t*n,-.7,.6),Je.glisse=null}}else if(i.pointerType==="mouse"&&Le){let e=$p(i.clientX,i.clientY);ds.style.cursor=e?.object.userData.action?"pointer":"grab"}});ds.addEventListener("pointerup",i=>{if(!jt||i.pointerId!==jt.id)return;let e=jt.bouge<=8&&performance.now()-jt.t<500;jt=null,e&&Le&&nS(i.clientX,i.clientY)});ds.addEventListener("pointercancel",()=>{jt=null});var Sn=new Set;addEventListener("keydown",i=>{if(i.key==="Escape"){go?Jp():De("#grille").hidden=!0;return}go||xo||rn||i.target.closest?.("input, textarea, select")||["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d","z","q"].includes(i.key)&&(Sn.add(i.key),Je.cible=null,Je.glisse=null,i.preventDefault())});addEventListener("keyup",i=>Sn.delete(i.key));var ac=new ar,aS=i=>i*i*(3-2*i);function cS(i,e,t){let n=((e-i+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;return i+n*t}function lS(){let i=ac.getDelta(),e=Math.min(i,.05),t=ac.elapsedTime;if(!Le||go||xo){Le&&xo&&(Le.animer(t),Ah(t));return}JM(i);let n=(Sn.has("ArrowUp")||Sn.has("w")||Sn.has("z"))-(Sn.has("ArrowDown")||Sn.has("s")),s=(Sn.has("ArrowLeft")||Sn.has("a")||Sn.has("q"))-(Sn.has("ArrowRight")||Sn.has("d"));if(Je.yaw+=s*1.8*e,n){let o=oc(ot.position.x-Math.sin(Je.yaw)*n*2.6*e,ot.position.z-Math.cos(Je.yaw)*n*2.6*e);ot.position.x=o.x,ot.position.z=o.z}if(Je.cible){let o=Je.cible.x-ot.position.x,a=Je.cible.z-ot.position.z,c=Math.hypot(o,a);if(c<.04)Je.cible=null;else{let l=Math.min(c,2.6*e),u=oc(ot.position.x+o/c*l,ot.position.z+a/c*l);ot.position.x=u.x,ot.position.z=u.z}}if(Je.glisse){let o=Je.glisse;o.t=Math.min(1,o.t+e/o.dur);let a=aS(o.t);if(o.ctrl){let c=1-a;ot.position.x=c*c*o.de.x+2*c*a*o.ctrl.x+a*a*o.vers.x,ot.position.z=c*c*o.de.z+2*c*a*o.ctrl.z+a*a*o.vers.z}else ot.position.x=o.de.x+(o.vers.x-o.de.x)*a,ot.position.z=o.de.z+(o.vers.z-o.de.z)*a;Je.yaw=cS(o.de.yaw,o.vers.yaw,a),Je.pitch=o.de.pitch+(o.vers.pitch-o.de.pitch)*a,o.t>=1&&(Je.glisse=null,o.fin?.())}ot.position.y=xr,ot.rotation.set(Je.pitch,Je.yaw,0),Le.animer(t),Le.porte?.animer(e),Le.porteRetour?.animer(e);let r=_o();for(let o of Object.values(Le.cases)){let a=Wi?1:Math.min(1,e*3.2);o.ouverture+=(o.cible-o.ouverture)*a;let c=o.ouverture*1.95;o.volets[0].rotation.y=-c,o.volets[1].rotation.y=c,o.lumiere+=(o.lumiereCible-o.lumiere)*Math.min(1,e*4),o.halo.material.opacity=o.lumiere*.9,o.halo.scale.setScalar(1.6+o.lumiere*1.6);let l=o.pulse&&o.jour===r?.18+.16*Math.sin(t*3):0;for(let u of o.matsVolets)u.emissiveIntensity=l}for(let o of mr.values())if(o&&(o.liste[o.i].avancer(e*1e3),o.t+=e,o.liste.length>1&&o.t>6)){o.t=0,o.i=(o.i+1)%o.liste.length;let a=o.liste[o.i];Zp(o.c,a.ratio,a.texture),o.c.ecran.material.map=a.texture,o.c.ecran.material.needsUpdate=!0}for(let o of Object.keys(Le.cases).map(Number)){let a=Gp(vo(o));if(!Dh(o)||!a.length)continue;let c=Yp(o);c<2.8&&!ho.has(o)?(ho.add(o),Th(a)):c>4&&ho.delete(o)}Ah(t)}var vr=null,yr=null,uo=null;function uS(){return window.YT?.Player?Promise.resolve():uo||(uo=new Promise((i,e)=>{window.onYouTubeIframeAPIReady=()=>i();let t=document.createElement("script");t.src="https://www.youtube.com/iframe_api",t.onerror=()=>e(new Error("API YouTube indisponible")),document.head.appendChild(t),setTimeout(()=>e(new Error("d\xE9lai d\xE9pass\xE9")),8e3)}).catch(i=>{throw uo=null,i}),uo)}function Mh(i,e){let t=De("#mLecteur");t.innerHTML=i?`<div class="vide"><p>Le lecteur ne peut pas s'afficher ici.</p><a class="btn" href="https://www.youtube.com/watch?v=${Sh(i)}${e?"&t="+ +e+"s":""}" target="_blank" rel="noopener">Regarder l'\xE9pisode sur YouTube</a></div>`:`<div class="vide"><p>L'\xE9pisode de ce jour n'est pas encore renseign\xE9.</p></div>`,De("#mFini").hidden=!1}function hS(i,e){let t=De("#ouverture");if(!i||Wi){e();return}t.style.transition="none",Object.assign(t.style,{left:i.left+"px",top:i.top+"px",width:i.width+"px",height:i.height+"px",opacity:"1"}),t.hidden=!1,t.offsetWidth,t.style.transition="",t.classList.add("plein");let n=!1,s=()=>{n||(n=!0,e(),t.classList.add("fondu"),setTimeout(()=>{t.hidden=!0,t.classList.remove("plein","fondu")},450))};t.addEventListener("transitionend",s,{once:!0}),setTimeout(s,900)}function jp(i,e){let t=vo(i);yr=i,hS(e,()=>{go=!0,De("#mJour").textContent=`${i} d\xE9cembre`,De("#mEpisode").textContent=t.episode||"\xC9pisode \xE0 renseigner",De("#mRevel").hidden=!0,De("#mFini").hidden=!0,De("#mPasser").hidden=!1,De("#mPasser").textContent=_r.has(i)?"Voir les r\xE9pliques":"Passer directement \xE0 la r\xE9plique";let n=De("#mLecteur");n.innerHTML='<div id="yt"></div>';let s=WM(t.youtube);s?uS().then(()=>{yr===i&&(vr=new YT.Player("yt",{videoId:s,width:"100%",height:"100%",playerVars:{autoplay:1,start:+t.debut||0,...+t.fin?{end:+t.fin}:{},rel:0,playsinline:1,fs:1},events:{onReady:r=>{try{r.target.playVideo()}catch{}},onStateChange:r=>{r.data===0&&Oh()},onError:()=>Mh(s,t.debut)}}))}).catch(()=>Mh(s,t.debut)):Mh("",0),De("#modale").hidden=!1,De("#modale .fermer").focus({preventScroll:!0})})}function Oh(){let i=yr;if(i==null)return;let e=vo(i),t=Uh(e);De("#mSurTitre").textContent=t.length>1?"Les r\xE9pliques du jour":"La r\xE9plique du jour";let n=De("#mListe");n.innerHTML="";let s=(r,o,a)=>{let c=document.createElement("a");return c.className="btn",c.href=r,c.setAttribute("download",o),c.textContent=a,c};t.forEach((r,o)=>{let a=document.createElement("div");a.className="replique";let c=document.createElement("blockquote");if(c.textContent=bh(r),a.append(c),r.personnage){let h=document.createElement("p");h.className="perso",h.textContent="\u2014 "+r.personnage,a.append(h)}let l=document.createElement("div");l.className="actions";let u=`kaamelott-${String(i).padStart(2,"0")}${t.length>1?"-"+(o+1):""}`;if(r.mp3){let h=document.createElement("button");h.className="btn",h.textContent="\xC9couter",h.addEventListener("click",()=>{cc(),Th(r.mp3)}),l.append(h)}r.gif&&l.append(s(r.gif,u+".gif","T\xE9l\xE9charger le GIF")),r.mp3&&l.append(s(r.mp3,u+".mp3","T\xE9l\xE9charger l'audio")),r.mp4&&l.append(s(r.mp4,u+".mp4","T\xE9l\xE9charger la vid\xE9o")),l.children.length&&a.append(l),n.append(a)}),De("#mSansFichiers").hidden=t.some(r=>r.gif||r.mp3||r.mp4),De("#mRevel").hidden=!1,De("#mRevel").scrollTop=0,De("#mPasser").hidden=!0,De("#mFini").hidden=!0,_r.has(i)||(XM(i),Bh());try{vr?.pauseVideo()}catch{}Th(Gp(e))}function dS(){let i=vo(yr);De("#mRevel").hidden=!0,De("#mPasser").hidden=!1,De("#mPasser").textContent="Voir les r\xE9pliques";try{vr?.seekTo(+i.debut||0,!0),vr?.playVideo()}catch{}}function Jp(){try{vr?.destroy()}catch{}let i=yr;vr=null,yr=null,De("#mLecteur").innerHTML="",De("#modale").hidden=!0,go=!1,Nh(),YM(),ac.getDelta();let e=Le?.cases[i];e&&(e.lumiereCible=0,Dh(i)||(e.cible=0))}De("#modale .fermer").addEventListener("click",Jp);De("#mPasser").addEventListener("click",()=>Oh());De("#mFini").addEventListener("click",()=>Oh());De("#mRevoir").addEventListener("click",dS);function Bh(){let i=_o(),e=s=>{let r=Vi(s),o=_r.has(s),a=r?o?"vue":"ouverte":"fermee",c=r?o?"vue":"\xE0 ouvrir":`le ${s} d\xE9c.`;return`<button class="case ${a}${s===i?" aujourdhui":""}" data-jour="${s}"><span class="num">${s}</span><span class="etat">${c}</span></button>`},t=Jt.salles.filter(s=>Vi(Rh(s))),n=Jt.salles.filter(s=>!Vi(Rh(s))).flatMap(s=>s.jours);De("#gContenu").innerHTML=t.map(s=>{let r=Le&&s.id===Le.id,o=zt&&Le&&!r&&hs[s.id],a=r?' <span class="ici">vous \xEAtes ici</span>':o?` <button class="lien aller" data-salle="${Sh(s.id)}">aller dans cette salle</button>`:"";return`
    <section>
      <h3>${Sh(s.nom)}${a}</h3>
      <div class="cases">${s.jours.map(e).join("")}</div>
    </section>`}).join("")+(n.length?`
    <section>
      <h3>La suite\u2026 surprise !</h3>
      <div class="cases">${n.map(e).join("")}</div>
    </section>`:"")}De("#gContenu").addEventListener("click",i=>{let e=i.target.closest(".aller");if(e){De("#grille").hidden=!0,oS(e.dataset.salle);return}let t=i.target.closest(".case");if(!t)return;let n=+t.dataset.jour;if(!Vi(n)){mo(`Patience ! Cette case s'ouvre le ${n} d\xE9cembre.`);return}cc(),Wp(),jp(n,t.getBoundingClientRect())});De("#btnGrille").addEventListener("click",()=>{Bh(),De("#grille").hidden=!1});De("#gFermer").addEventListener("click",()=>{zt&&(De("#grille").hidden=!0)});De("#btnSon").addEventListener("click",()=>{pr=!pr,De("#btnSon").setAttribute("aria-pressed",String(pr)),De("#btnSon .lib").textContent=pr?"Son activ\xE9":"Son coup\xE9",pr||Nh()});var xo=!0,Ch=!1,Hp=!0;function fS(){let i=Le.vueLivre;ot.position.set(i.x,xr,i.z),Je.yaw=i.yaw,Je.pitch=i.pitch,ot.rotation.set(Je.pitch,Je.yaw,0)}function pS(){Le.vueLivre&&(rn=!0,di(Le.vueLivre,()=>{rn=!1,xo=!0,De("#hud").hidden=!0;let i=De("#livre");i.classList.remove("ferme","parti"),i.hidden=!1}))}function mS(){cc();let i=De("#livre");i.classList.add("ferme"),setTimeout(()=>{i.classList.add("parti"),xo=!1,ac.getDelta(),De("#hud").hidden=!1,Ch&&Le.porte?(Ch=!1,Fh()):di(Le.depart,null,1.4),Hp&&(Hp=!1,De("#aide").hidden=!1,setTimeout(()=>De("#aide").classList.add("estompe"),6e3))},Wi?50:750),setTimeout(()=>{i.hidden=!0},Wi?100:1300)}function gS(){let i=_o();if(Ih)return`Aper\xE7u : on fait comme si on \xE9tait le ${i>=25?"25":i} d\xE9cembre.`;if(i===0){let e=Math.ceil((Vp(1)-new Date)/864e5);return e<=1?"La premi\xE8re case s'ouvre demain !":`La premi\xE8re case s'ouvre dans ${e} jours.`}return i>=25?"Joyeux No\xEBl ! Toutes les cases sont ouvertes.":`Aujourd'hui, la case ${i} vous attend.`}function xS(){if(!Ih)return;let i=De("#apJour");i.innerHTML=Array.from({length:25},(e,t)=>t+1).map(e=>`<option value="${e}"${e===po?" selected":""}>${e===25?"No\xEBl":e+" d\xE9c."}</option>`).join(""),i.addEventListener("change",()=>{try{localStorage.setItem(kp,i.value)}catch{}location.reload()}),De("#apReset").addEventListener("click",()=>{try{localStorage.removeItem(Ph);for(let e of Object.keys(localStorage))e.startsWith(Lh)&&localStorage.removeItem(e)}catch{}location.reload()}),De("#apercu").hidden=!1}async function _S(){De("#statut").textContent=gS(),xS();let i=De("#entrer");try{await Promise.race([Promise.all([document.fonts.load('64px "Uncial Antiqua"'),document.fonts.load('italic 40px "Cormorant Garamond"'),document.fonts.load('40px "Cormorant Garamond"')]),new Promise(r=>setTimeout(r,3e3))])}catch{}if(!zt){i.disabled=!1,i.textContent="Voir les cases",i.addEventListener("click",()=>{cc(),De("#livre").hidden=!0,Bh(),De("#grille").hidden=!1});return}jM(),ki.environment=eS(),ki.environmentIntensity=.3;let e=Jt.salles.map(r=>r.id).filter(r=>hs[r]),t=e[0]||Object.keys(hs)[0];for(let r of Jt.salles)hs[r.id]&&Vi(r.jours[0])&&(t=r.id);let n=!1;try{n=!!localStorage.getItem(Lh+t)}catch{n=!0}let s=e.indexOf(t);s>0&&!n&&(Ch=!0,t=e[s-1]),await qp(t,r=>{i.textContent=`Le ch\xE2teau se pr\xE9pare\u2026 ${Math.round(r*100)} %`}),Le.vueLivre&&fS(),Ah(),zt.setAnimationLoop(lS),i.disabled=!1,i.textContent="Fermer le livre",i.addEventListener("click",mS)}_S();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
