(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ee=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),te=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ne=/-\w/g,T=te(e=>e.replace(ne,e=>e.slice(1).toUpperCase())),re=/\B([A-Z])/g,ie=te(e=>e.replace(re,`-$1`).toLowerCase()),ae=te(e=>e.charAt(0).toUpperCase()+e.slice(1)),oe=te(e=>e?`on${ae(e)}`:``),se=(e,t)=>!Object.is(e,t),ce=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},E=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},le=e=>{let t=parseFloat(e);return isNaN(t)?e:t},ue=e=>{let t=g(e)?Number(e):NaN;return isNaN(t)?e:t},de,fe=()=>de||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function pe(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?_e(r):pe(r);if(i)for(let e in i)t[e]=i[e]}return t}if(g(e)||v(e))return e}var me=/;(?![^(]*\))/g,he=/:([^]+)/,ge=/\/\*[^]*?\*\//g;function _e(e){let t={};return e.replace(ge,``).split(me).forEach(e=>{if(e){let n=e.split(he);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function D(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=D(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var ve=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,ye=e(ve);ve+``;function be(e){return!!e||e===``}function xe(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Ce(e[r],t[r]);return n}function Se(e,t){if(e.size!==t.size)return!1;let n=Array.from(t),r=new Uint8Array(n.length);for(let t of e){let e=-1;for(let i=0;i<n.length;i++)if(!r[i]&&Ce(t,n[i])){e=i;break}if(e<0)return!1;r[e]=1}return!0}function Ce(e,t){if(e===t)return!0;let n=m(e),r=m(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=_(e),r=_(t),n||r)return e===t;if(n=d(e),r=d(t),n||r)return n&&r?xe(e,t):!1;if(n=v(e),r=v(t),n||r){if(!n||!r)return!1;if(n=f(e),r=f(t),n||r||(n=p(e),r=p(t),n||r))return n&&r?Se(e,t):!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!Ce(e[n],t[n]))return!1}}return String(e)===String(t)}var we=e=>!!(e&&e.__v_isRef===!0),O=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?we(e)?O(e.value):JSON.stringify(e,Te,2):String(e),Te=(e,t)=>we(t)?Te(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Ee(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ee(e))}:_(t)?Ee(t):v(t)&&!d(t)&&!C(t)?String(t):t,Ee=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,k,De=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&k&&(k.active?(this.parent=k,this.index=(k.scopes||(k.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}let n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){let t=k;try{return k=this,e()}finally{k=t}}}on(){++this._on===1&&(this.prevScope=k,k=this)}off(){if(this._on>0&&--this._on===0){if(k===this)k=this.prevScope;else{let e=k;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){let e=this.scopes.slice();for(t=0,n=e.length;t<n;t++)e[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Oe(){return k}var A,ke=new WeakSet,Ae=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,k&&(k.active?k.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ke.has(this)&&(ke.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Pe(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,qe(this),Le(this);let e=A,t=Ue;A=this,Ue=!0;try{return this.fn()}finally{Re(this),A=e,Ue=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ve(e);this.deps=this.depsTail=void 0,qe(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ke.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ze(this)&&this.run()}get dirty(){return ze(this)}},je=0,Me,Ne;function Pe(e,t=!1){if(e.flags|=8,t){e.next=Ne,Ne=e;return}e.next=Me,Me=e}function Fe(){je++}function Ie(){if(--je>0)return;if(Ne){let e=Ne;for(Ne=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;Me;){let t=Me;for(Me=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Le(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Re(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Ve(r),He(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function ze(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Be(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Be(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Je)||(e.globalVersion=Je,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!ze(e))))return;e.flags|=2;let t=e.dep,n=A,r=Ue;A=e,Ue=!0;try{Le(e);let n=e.fn(e._value);(t.version===0||se(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{A=n,Ue=r,Re(e),e.flags&=-3}}function Ve(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Ve(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function He(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var Ue=!0,We=[];function Ge(){We.push(Ue),Ue=!1}function Ke(){let e=We.pop();Ue=e===void 0||e}function qe(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=A;A=void 0;try{t()}finally{A=e}}}var Je=0,Ye=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Xe=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!A||!Ue||A===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==A)t=this.activeLink=new Ye(A,this),A.deps?(t.prevDep=A.depsTail,A.depsTail.nextDep=t,A.depsTail=t):A.deps=A.depsTail=t,Ze(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=A.depsTail,t.nextDep=void 0,A.depsTail.nextDep=t,A.depsTail=t,A.deps===t&&(A.deps=e)}return t}trigger(e){this.version++,Je++,this.notify(e)}notify(e){Fe();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ie()}}};function Ze(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ze(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Qe=new WeakMap,$e=Symbol(``),et=Symbol(``),tt=Symbol(``);function j(e,t,n){if(Ue&&A){let t=Qe.get(e);t||Qe.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new Xe),r.map=t,r.key=n),r.track()}}function nt(e,t,n,r,i,a){let o=Qe.get(e);if(!o){Je++;return}let s=e=>{e&&e.trigger()};if(Fe(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===tt||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(tt)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get($e)),f(e)&&s(o.get(et)));break;case`delete`:i||(s(o.get($e)),f(e)&&s(o.get(et)));break;case`set`:f(e)&&s(o.get($e))}}Ie()}function rt(e,t){let n=Qe.get(e);return n&&n.get(t)}function it(e){let t=M(e);return t===e?t:(j(t,`iterate`,tt),Ut(e)?t:t.map(Kt))}function at(e){return j(e=M(e),`iterate`,tt),e}function ot(e,t){return Ht(e)?qt(Vt(e)?Kt(t):t):Kt(t)}var st={__proto__:null,[Symbol.iterator](){return ct(this,Symbol.iterator,e=>ot(this,e))},concat(...e){return it(this).concat(...e.map(e=>d(e)?it(e):e))},entries(){return ct(this,`entries`,e=>(e[1]=ot(this,e[1]),e))},every(e,t){return ut(this,`every`,e,t,void 0,arguments)},filter(e,t){return ut(this,`filter`,e,t,e=>e.map(e=>ot(this,e)),arguments)},find(e,t){return ut(this,`find`,e,t,e=>ot(this,e),arguments)},findIndex(e,t){return ut(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return ut(this,`findLast`,e,t,e=>ot(this,e),arguments)},findLastIndex(e,t){return ut(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return ut(this,`forEach`,e,t,void 0,arguments)},includes(...e){return ft(this,`includes`,e)},indexOf(...e){return ft(this,`indexOf`,e)},join(e){return it(this).join(e)},lastIndexOf(...e){return ft(this,`lastIndexOf`,e)},map(e,t){return ut(this,`map`,e,t,void 0,arguments)},pop(){return pt(this,`pop`)},push(...e){return pt(this,`push`,e)},reduce(e,...t){return dt(this,`reduce`,e,t)},reduceRight(e,...t){return dt(this,`reduceRight`,e,t)},shift(){return pt(this,`shift`)},some(e,t){return ut(this,`some`,e,t,void 0,arguments)},splice(...e){return pt(this,`splice`,e)},toReversed(){return it(this).toReversed()},toSorted(e){return it(this).toSorted(e)},toSpliced(...e){return it(this).toSpliced(...e)},unshift(...e){return pt(this,`unshift`,e)},values(){return ct(this,`values`,e=>ot(this,e))}};function ct(e,t,n){let r=at(e),i=r[t]();return r!==e&&!Ut(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var lt=Array.prototype;function ut(e,t,n,r,i,a){let o=at(e),s=o!==e&&!Ut(e),c=o[t];if(c!==lt[t]){let t=c.apply(e,a);return s?Kt(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,ot(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function dt(e,t,n,r){let i=at(e),a=i!==e&&!Ut(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=ot(e,t)),n.call(this,t,ot(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?ot(e,c):c}function ft(e,t,n){let r=M(e);j(r,`iterate`,tt);let i=r[t](...n);return(i===-1||i===!1)&&Wt(n[0])?(n[0]=M(n[0]),r[t](...n)):i}function pt(e,t,n=[]){Ge(),Fe();let r=M(e)[t].apply(e,n);return Ie(),Ke(),r}var mt=e(`__proto__,__v_isRef,__isVue`),ht=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function gt(e){_(e)||(e=String(e));let t=M(this);return j(t,`has`,e),t.hasOwnProperty(e)}var _t=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Ft:Pt:i?Nt:Mt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=st[t]))return e;if(t===`hasOwnProperty`)return gt}let o=Reflect.get(e,t,N(e)?e:n);if((_(t)?ht.has(t):mt(t))||(r||j(e,`get`,t),i))return o;if(N(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?zt(e):e}return v(o)?r?zt(o):Lt(o):o}},vt=class extends _t{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=Ht(i);if(!Ut(n)&&!Ht(n)&&(i=M(i),n=M(n)),!a&&N(i)&&!N(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,N(e)?e:r);return e===M(r)&&s&&(o?se(n,i)&&nt(e,`set`,t,n,i):nt(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&nt(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!ht.has(t))&&j(e,`has`,t),n}ownKeys(e){return j(e,`iterate`,d(e)?`length`:$e),Reflect.ownKeys(e)}},yt=class extends _t{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},bt=new vt,xt=new yt,St=new vt(!0),Ct=e=>e,wt=e=>Reflect.getPrototypeOf(e);function Tt(e,t,n){return function(...r){let i=this.__v_raw,a=M(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?Ct:t?qt:Kt;return!t&&j(a,`iterate`,l?et:$e),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function Et(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function Dt(e,t){let n={get(n){let r=this.__v_raw,i=M(r),a=M(n);e||(se(n,a)&&j(i,`get`,n),j(i,`get`,a));let{has:o}=wt(i),s=t?Ct:e?qt:Kt;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&j(M(t),`iterate`,$e),t.size},has(t){let n=this.__v_raw,r=M(n),i=M(t);return e||(se(t,i)&&j(r,`has`,t),j(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=M(a),s=t?Ct:e?qt:Kt;return!e&&j(o,`iterate`,$e),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:Et(`add`),set:Et(`set`),delete:Et(`delete`),clear:Et(`clear`)}:{add(e){let n=M(this),r=wt(n),i=M(e),a=!t&&!Ut(e)&&!Ht(e)?i:e;return r.has.call(n,a)||se(e,a)&&r.has.call(n,e)||se(i,a)&&r.has.call(n,i)||(n.add(a),nt(n,`add`,a,a)),this},set(e,n){!t&&!Ut(n)&&!Ht(n)&&(n=M(n));let r=M(this),{has:i,get:a}=wt(r),o=i.call(r,e);o||=(e=M(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?se(n,s)&&nt(r,`set`,e,n,s):nt(r,`add`,e,n),this},delete(e){let t=M(this),{has:n,get:r}=wt(t),i=n.call(t,e);i||=(e=M(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&nt(t,`delete`,e,void 0,a),o},clear(){let e=M(this),t=e.size!==0,n=e.clear();return t&&nt(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=Tt(r,e,t)}),n}function Ot(e,t){let n=Dt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var kt={get:Ot(!1,!1)},At={get:Ot(!1,!0)},jt={get:Ot(!0,!1)},Mt=new WeakMap,Nt=new WeakMap,Pt=new WeakMap,Ft=new WeakMap;function It(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Lt(e){return Ht(e)?e:Bt(e,!1,bt,kt,Mt)}function Rt(e){return Bt(e,!1,St,At,Nt)}function zt(e){return Bt(e,!0,xt,jt,Pt)}function Bt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=It(S(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function Vt(e){return Ht(e)?Vt(e.__v_raw):!!(e&&e.__v_isReactive)}function Ht(e){return!!(e&&e.__v_isReadonly)}function Ut(e){return!!(e&&e.__v_isShallow)}function Wt(e){return e?!!e.__v_raw:!1}function M(e){let t=e&&e.__v_raw;return t?M(t):e}function Gt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&E(e,`__v_skip`,!0),e}var Kt=e=>v(e)?Lt(e):e,qt=e=>v(e)?zt(e):e;function N(e){return e?e.__v_isRef===!0:!1}function Jt(e){return Yt(e,!1)}function Yt(e,t){return N(e)?e:new Xt(e,t)}var Xt=class{constructor(e,t){this.dep=new Xe,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:M(e),this._value=t?e:Kt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||Ut(e)||Ht(e);e=n?e:M(e),se(e,t)&&(this._rawValue=e,this._value=n?e:Kt(e),this.dep.trigger())}};function P(e){return N(e)?e.value:e}var Zt={get:(e,t,n)=>t===`__v_raw`?e:P(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return N(i)&&!N(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Qt(e){return Vt(e)?e:new Proxy(e,Zt)}function $t(e){let t=d(e)?Array(e.length):{};for(let n in e)t[n]=tn(e,n);return t}var en=class{constructor(e,t,n){this._object=e,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0,this._key=_(t)?t:String(t),this._raw=M(e);let r=!0,i=e;if(!d(e)||_(this._key)||!w(this._key))do r=!Wt(i)||Ut(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=P(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&N(this._raw[this._key])){let t=this._object[this._key];if(N(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return rt(this._raw,this._key)}};function tn(e,t,n){return new en(e,t,n)}var nn=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Xe(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Je-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&A!==this)return Pe(this,!0),!0}get value(){let e=this.dep.track();return Be(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function rn(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new nn(r,i,n)}var an={},on=new WeakMap,sn=void 0;function cn(e,t=!1,n=sn){if(n){let t=on.get(n);t||on.set(n,t=[]),t.push(e)}}function ln(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:Ut(e)||o===!1||o===0?un(e,1):un(e),m,g,_,v,y=!1,b=!1;if(N(e)?(g=()=>e.value,y=Ut(e)):Vt(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Vt(e)||Ut(e)),g=()=>e.map(e=>{if(N(e))return e.value;if(Vt(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){Ge();try{_()}finally{Ke()}}let t=sn;sn=m;try{return f?f(e,3,[v]):e(v)}finally{sn=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>un(e(),t)}let x=Oe(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{let n=e(...t);return S(),n}}let C=b?Array(e.length).fill(an):an,w=e=>{if(!(!(m.flags&1)||!m.dirty&&!e)){if(n){let t=m.run();if(e||o||y||(b?t.some((e,t)=>se(e,C[t])):se(t,C))){_&&_();let e=sn;sn=m;try{let e=[t,C===an?void 0:b&&C[0]===an?[]:C,v];C=t,f?f(n,3,e):n(...e)}finally{sn=e}}}else m.run()}};return u&&u(w),m=new Ae(g),m.scheduler=l?()=>l(w,!1):w,v=e=>cn(e,!1,m),_=m.onStop=()=>{let e=on.get(m);if(e){if(f)f(e,4);else for(let t of e)t();on.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function un(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,N(e))un(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)un(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{un(e,t,n)});else if(C(e)){for(let r in e)un(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&un(e[r],t,n)}return e}function dn(e,t,n,r){try{return r?e(...r):e()}catch(e){pn(e,t,n)}}function fn(e,t,n,r){if(h(e)){let i=dn(e,t,n,r);return i&&y(i)&&i.catch(e=>{pn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(fn(e[a],t,n,r));return i}}function pn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){Ge(),dn(o,null,10,[e,i,a]),Ke();return}}mn(e,r,a,i,s)}function mn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var F=[],hn=-1,gn=[],_n=null,vn=0,yn=Promise.resolve(),bn=null;function xn(e){let t=bn||yn;return e?t.then(this?e.bind(this):e):t}function Sn(e){let t=hn+1,n=F.length;for(;t<n;){let r=t+n>>>1,i=F[r],a=On(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function Cn(e){if(!(e.flags&1)){let t=On(e),n=F[F.length-1];!n||!(e.flags&2)&&t>=On(n)?F.push(e):F.splice(Sn(t),0,e),e.flags|=1,wn()}}function wn(){bn||=yn.then(kn)}function Tn(e){if(!d(e))_n&&e.id===-1?_n.splice(vn+1,0,e):e.flags&1||(gn.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)gn.push(e[t]);wn()}function En(e,t,n=hn+1){for(;n<F.length;n++){let t=F[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;F.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function Dn(e){if(gn.length){let e=[...new Set(gn)].sort((e,t)=>On(e)-On(t));if(gn.length=0,_n){for(let t=0;t<e.length;t++)_n.push(e[t]);return}for(_n=e,vn=0;vn<_n.length;vn++){let e=_n[vn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}_n=null,vn=0}}var On=e=>e.id==null?e.flags&2?-1:1/0:e.id;function kn(e){try{for(hn=0;hn<F.length;hn++){let e=F[hn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),dn(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;hn<F.length;hn++){let e=F[hn];e&&(e.flags&=-2)}hn=-1,F.length=0,Dn(e),bn=null,(F.length||gn.length)&&kn(e)}}var An=null,jn=null;function Mn(e){let t=An;return An=e,jn=e&&e.type.__scopeId||null,t}function Nn(e,t=An,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Ji(-1);let i=Mn(t),a=Wi.length,o;try{o=e(...n)}finally{for(let e=Wi.length;e>a;e--)Ki();Mn(i),r._d&&Ji(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Pn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(Ge(),fn(c,n,8,[e.el,s,e,t]),Ke())}}function Fn(e,t){if(K){let n=K.provides,r=K.parent&&K.parent.provides;r===n&&(n=K.provides=Object.create(r)),n[e]=t}}function In(e,t,n=!1){let r=pa();if(r||$r){let i=$r?$r._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var Ln=Symbol.for(`v-scx`),Rn=()=>In(Ln);function zn(e,t,n){return Bn(e,t,n)}function Bn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(ya){if(c===`sync`){let e=Rn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=K;u.call=(e,t,n)=>fn(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{R(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():Cn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=ln(e,n,u);return ya&&(f?f.push(h):d&&h()),h}function Vn(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?Hn(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=ga(this),s=Bn(i,a.bind(r),n);return o(),s}function Hn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var Un=Symbol(`_vte`),Wn=e=>e.__isTeleport,Gn=Symbol(`_leaveCb`),Kn=Symbol(`_enterCb`);function qn(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return xr(()=>{e.isMounted=!0}),wr(()=>{e.isUnmounting=!0}),e}var Jn=[Function,Array],Yn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Jn,onEnter:Jn,onAfterEnter:Jn,onEnterCancelled:Jn,onBeforeLeave:Jn,onLeave:Jn,onAfterLeave:Jn,onLeaveCancelled:Jn,onBeforeAppear:Jn,onAppear:Jn,onAfterAppear:Jn,onAppearCancelled:Jn},Xn=e=>{let t=e.subTree;return t.component?Xn(t.component):t},Zn={name:`BaseTransition`,props:Yn,setup(e,{slots:t}){let n=pa(),r=qn();return()=>{let i=t.default&&ar(t.default(),!0),a=i&&i.length?Qn(i):n.subTree?G():void 0;if(!a)return;let o=M(e),{mode:s}=o;if(r.isLeaving)return nr(a);let c=rr(a);if(!c)return nr(a);let l=tr(c,o,r,n,e=>l=e);c.type!==B&&ir(c,l);let u=n.subTree&&rr(n.subTree);if(u&&u.type!==B&&!Qi(u,c)&&Xn(n).type!==B){let e=tr(u,o,r,n);if(ir(u,e),s===`out-in`&&c.type!==B)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,n.job.flags&8||n.update(),delete e.afterLeave,u=void 0},nr(a);s===`in-out`&&c.type!==B?e.delayLeave=(e,t,n)=>{let i=er(r,u);i[String(u.key)]=u,e[Gn]=()=>{t(),e[Gn]=void 0,delete l.delayedLeave,u=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,u=void 0}}:u=void 0}else u&&=void 0;return a}}};function Qn(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==B){t=n;break}}return t}var $n=Zn;function er(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function tr(e,t,n,r,i){let{appear:a,mode:o,persisted:s=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:p,onLeave:m,onAfterLeave:h,onLeaveCancelled:g,onBeforeAppear:_,onAppear:v,onAfterAppear:y,onAppearCancelled:b}=t,x=String(e.key),S=er(n,e),C=(e,t)=>{e&&fn(e,r,9,t)},w=(e,t)=>{let n=t[1];C(e,t),d(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n()},ee={mode:o,persisted:s,beforeEnter(t){let r=c;if(!n.isMounted){if(a)r=_||c;else return}t[Gn]&&t[Gn](!0);let i=S[x];i&&Qi(e,i)&&i.el[Gn]&&i.el[Gn](),C(r,[t])},enter(t){if(S[x]===e)return;let r=l,i=u,o=f;if(!n.isMounted){if(a)r=v||l,i=y||u,o=b||f;else return}let s=!1;t[Kn]=e=>{s||(s=!0,C(e?o:i,[t]),ee.delayedLeave&&ee.delayedLeave(),t[Kn]=void 0)};let c=t[Kn].bind(null,!1);r?w(r,[t,c]):c()},leave(t,r){let i=String(e.key);if(t[Kn]&&t[Kn](!0),n.isUnmounting)return r();C(p,[t]);let a=!1;t[Gn]=n=>{a||(a=!0,r(),C(n?g:h,[t]),t[Gn]=void 0,S[i]===e&&delete S[i])};let o=t[Gn].bind(null,!1);S[i]=e,m?w(m,[t,o]):o()},clone(e){let a=tr(e,t,n,r,i);return i&&i(a),a}};return ee}function nr(e){if(pr(e))return e=ra(e),e.children=null,e}function rr(e){if(!pr(e))return Wn(e.type)&&e.children?Qn(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&h(n.default))return n.default()}}function ir(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;ir(Wn(n.type)&&rr(n)||n,t)}else e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ar(e,t=!1,n){let r=[],i=0;for(let a=0;a<e.length;a++){let o=e[a],s=n==null?o.key:String(n)+String(o.key==null?a:o.key);o.type===z?(o.patchFlag&128&&i++,r=r.concat(ar(o.children,t,s))):(t||o.type!==B)&&r.push(s==null?o:ra(o,{key:s}))}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}function or(e,t){return h(e)?s({name:e.name},t,{setup:e}):e}function sr(e){e.ids=[e.ids[0]+e.ids[2]+++`-`,0,0]}function cr(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var lr=new WeakMap;function ur(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>ur(e,n&&(d(n)?n[t]:n),r,a,o));return}if(fr(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&ur(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?Ea(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=M(v),b=v===t?i:e=>!cr(_,e)&&u(y,e),x=(e,t)=>!(t&&cr(_,t));if(m!=null&&m!==p){if(dr(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(N(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))dn(p,f,12,[l,_]);else{let t=g(p),n=N(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),lr.delete(e)};t.id=-1,lr.set(e,t),R(t,r)}else dr(e),i()}}}function dr(e){let t=lr.get(e);t&&(t.flags|=8,lr.delete(e))}fe().requestIdleCallback,fe().cancelIdleCallback;var fr=e=>!!e.type.__asyncLoader,pr=e=>e.type.__isKeepAlive;function mr(e,t){gr(e,`a`,t)}function hr(e,t){gr(e,`da`,t)}function gr(e,t,n=K){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(vr(t,r,n),n){let e=n.parent;for(;e&&e.parent;)pr(e.parent.vnode)&&_r(r,t,n,e),e=e.parent}}function _r(e,t,n,r){let i=vr(t,e,r,!0);Tr(()=>{c(r[t],i)},n)}function vr(e,t,n=K,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{Ge();let i=ga(n),a=fn(t,n,e,r);return i(),Ke(),a};return r?i.unshift(a):i.push(a),a}}var yr=e=>(t,n=K)=>{(!ya||e===`sp`)&&vr(e,(...e)=>t(...e),n)},br=yr(`bm`),xr=yr(`m`),Sr=yr(`bu`),Cr=yr(`u`),wr=yr(`bum`),Tr=yr(`um`),Er=yr(`sp`),Dr=yr(`rtg`),Or=yr(`rtc`);function kr(e,t=K){vr(`ec`,e,t)}var Ar=Symbol.for(`v-ndc`);function I(e,t,n,r){let i,a=n&&n[r],o=d(e);if(o||g(e)){let n=o&&Vt(e),r=!1,s=!1;n&&(r=!Ut(e),s=Ht(e),e=at(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?qt(Kt(e[n])):Kt(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}else if(v(e)){if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}}else i=[];return n&&(n[r]=i),i}var jr=e=>e?va(e)?Ea(e):jr(e.parent):null,Mr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>jr(e.parent),$root:e=>jr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Vr(e),$forceUpdate:e=>e.f||=()=>{Cn(e.update)},$nextTick:e=>e.n||=xn.bind(e.proxy),$watch:e=>Vn.bind(e)}),Nr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),Pr={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(Nr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else Ir&&(s[n]=0)}let d=Mr[n],f,p;if(d)return n===`$attrs`&&j(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return Nr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||Nr(n,c)||u(o,c)||u(i,c)||u(Mr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function Fr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var Ir=!0;function Lr(e){let t=Vr(e),n=e.proxy,i=e.ctx;Ir=!1,t.beforeCreate&&zr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:ee,renderTracked:te,renderTriggered:ne,errorCaptured:T,serverPrefetch:re,expose:ie,inheritAttrs:ae,components:oe,directives:se,filters:ce}=t;if(u&&Rr(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=Lt(t))}if(Ir=!0,o)for(let e in o){let t=o[e],a=q({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)Br(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Fn(t,e[t])})}f&&zr(f,e,`c`);function E(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(E(br,p),E(xr,m),E(Sr,g),E(Cr,_),E(mr,y),E(hr,b),E(kr,T),E(Or,te),E(Dr,ne),E(wr,S),E(Tr,w),E(Er,re),d(ie)){if(ie.length){let t=e.exposed||={};ie.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={}}ee&&e.render===r&&(e.render=ee),ae!=null&&(e.inheritAttrs=ae),oe&&(e.components=oe),se&&(e.directives=se),re&&sr(e)}function Rr(e,t,n=r){d(e)&&(e=Kr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?In(r.from||n,r.default,!0):In(r.from||n):In(r),N(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function zr(e,t,n){fn(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Br(e,t,n,r){let i=r.includes(`.`)?Hn(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&zn(i,n)}else if(h(e))zn(i,e.bind(n));else if(v(e)){if(d(e))e.forEach(e=>Br(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&zn(i,r,e)}}}function Vr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>Hr(c,e,o,!0)),Hr(c,t,o)),v(t)&&a.set(t,c),c}function Hr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&Hr(e,a,n,!0),i&&i.forEach(t=>Hr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Ur[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Ur={data:Wr,props:Jr,emits:Jr,methods:qr,computed:qr,beforeCreate:L,created:L,beforeMount:L,mounted:L,beforeUpdate:L,updated:L,beforeDestroy:L,beforeUnmount:L,destroyed:L,unmounted:L,activated:L,deactivated:L,errorCaptured:L,serverPrefetch:L,components:qr,directives:qr,watch:Yr,provide:Wr,inject:Gr};function Wr(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function Gr(e,t){return qr(Kr(e),Kr(t))}function Kr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function L(e,t){return e?[...new Set([].concat(e,t))]:t}function qr(e,t){return e?s(Object.create(null),e,t):t}function Jr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),Fr(e),Fr(t??{})):t}function Yr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=L(e[r],t[r]);return n}function Xr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Zr=0;function Qr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Xr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Zr++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:ka,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||W(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,Ea(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(fn(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=$r;$r=l;try{return e()}finally{$r=t}}};return l}}var $r=null,ei=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${T(t)}Modifiers`]||e[`${ie(t)}Modifiers`];function ti(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&ei(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=a.map(le)));let c,l=i[c=oe(n)]||i[c=oe(T(n))];!l&&o&&(l=i[c=oe(ie(n))]),l&&fn(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,fn(u,e,6,a)}}var ni=new WeakMap;function ri(e,t,n=!1){let r=n?ni:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=ri(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function ii(e,t){return!e||!a(t)?!1:(t=t.slice(2),t=t===`Once`?t:t.replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,ie(t))||u(e,t))}function ai(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=Mn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=aa(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=aa(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:oi(c)}}catch(t){Wi.length=0,pn(t,e,1),v=W(B)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=si(y,a)),b=ra(b,y,!1,!0))}return n.dirs&&(b=ra(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&ir(Wn(b.type)&&rr(b)||b,n.transition),v=b,Mn(_),v}var oi=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},si=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function ci(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?li(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(ui(o,r,n)&&!ii(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?!o||li(r,o,l):!!o;return!1}function li(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(ui(t,e,a)&&!ii(n,a))return!0}return!1}function ui(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!Ce(r,i):r!==i}function di({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var fi={},pi=()=>Object.create(fi),mi=e=>Object.getPrototypeOf(e)===fi;function hi(e,t,n,r=!1){let i={},a=pi();e.propsDefaults=Object.create(null),_i(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);e.props=n?r?i:Rt(i):e.type.props?i:a,e.attrs=a}function gi(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=M(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(ii(e.emitsOptions,o))continue;let d=t[o];if(c){if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=T(o);i[t]=vi(c,s,t,d,e,!1)}}else d!==a[o]&&(a[o]=d,l=!0)}}}else{_i(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=ie(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=vi(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&nt(e.attrs,`set`,``)}function _i(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(ee(t))continue;let l=n[t],d;a&&u(a,d=T(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:ii(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=M(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=vi(a,n,s,i[s],e,!u(i,s))}}return s}function vi(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=ga(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===ie(n))&&(r=!0))}return r}var yi=new WeakMap;function bi(e,r,i=!1){let a=i?yi:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=bi(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=T(c[e]);xi(n)&&(l[n]=t)}else if(c)for(let e in c){let t=T(e);if(xi(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function xi(e){return e[0]!==`$`&&!ee(e)}var Si=e=>e===`_`||e===`_ctx`||e===`$stable`,Ci=e=>d(e)?e.map(aa):[aa(e)],wi=(e,t,n)=>{if(t._n)return t;let r=Nn((...e)=>Ci(t(...e)),n);return r._c=!1,r},Ti=(e,t,n)=>{let r=e._ctx;for(let n in e){if(Si(n))continue;let i=e[n];if(h(i))t[n]=wi(n,i,r);else if(i!=null){let e=Ci(i);t[n]=()=>e}}},Ei=(e,t)=>{let n=Ci(t);e.slots.default=()=>n},Di=(e,t,n)=>{for(let r in t)(n||!Si(r))&&(e[r]=t[r])},Oi=(e,t,n)=>{let r=e.slots=pi();if(e.vnode.shapeFlag&32){let e=t._;e?(Di(r,t,n),n&&E(r,`_`,e,!0)):Ti(t,r)}else t&&Ei(e,t)},ki=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:Di(a,n,r):(o=!n.$stable,Ti(n,a)),s=n}else n&&(Ei(e,n),s={default:1});if(o)for(let e in a)!Si(e)&&s[e]==null&&delete a[e]},R=Vi;function Ai(e){return ji(e)}function ji(e,i){let a=fe();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,s=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Qi(e,t)&&(r=xe(e),_e(e,i,a,!0),e=null),t.patchFlag===-2&&(c=!1,t.dynamicChildren=null);let{type:l,ref:u,shapeFlag:d}=t;switch(l){case Hi:y(e,t,n,r);break;case B:b(e,t,n,r);break;case Ui:e??x(t,n,r,o);break;case z:oe(e,t,n,r,i,a,o,s,c);break;default:d&1?w(e,t,n,r,i,a,o,s,c):d&6?se(e,t,n,r,i,a,o,s,c):(d&64||d&128)&&l.process(e,t,n,r,i,a,o,s,c,we)}u!=null&&i?ur(u,e&&e.ref,a,t||e,!t):u==null&&e&&e.ref!=null&&ur(e.ref,null,a,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)te(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),re(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},te=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&T(e.children,d,null,r,i,Mi(e,a),s,u),_&&Pn(e,null,r,`created`),ne(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!ee(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&la(f,r,e)}_&&Pn(e,null,r,`beforeMount`);let v=Pi(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&R(()=>{try{f&&la(f,r,e),v&&g.enter(d),_&&Pn(e,null,r,`mounted`)}finally{}},i)},ne=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||Bi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;ne(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},T=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++){let c=e[l]=s?oa(e[l]):aa(e[l]);v(null,c,t,n,r,i,a,o,s)}},re=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&Ni(r,!1),(g=h.onVnodeBeforeUpdate)&&la(g,r,n,e),f&&Pn(n,e,r,`beforeUpdate`),r&&Ni(r,!0),d&&(!e.dynamicChildren||e.dynamicChildren.length!==d.length)&&(u=0,s=!1,d=null),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?ie(e.dynamicChildren,d,l,r,i,Mi(n,a),o):s||pe(e,n,l,null,r,i,Mi(n,a),o,!1),u>0){if(u&16)ae(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else!s&&d==null&&ae(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&R(()=>{g&&la(g,r,n,e),f&&Pn(n,e,r,`updated`)},i)},ie=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s],u=c.el&&(c.type===z||!Qi(c,l)||c.shapeFlag&198)?m(c.el):n;v(c,l,u,null,r,i,a,o,!0)}},ae=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!ee(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(ee(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},oe=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),T(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(ie(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&Fi(e,t,!0)):pe(e,t,n,f,i,a,s,c,l)},se=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):E(t,n,r,i,a,o,c):le(e,t,c)},E=(e,t,n,r,i,a,o)=>{let s=e.component=fa(e,r,i);if(pr(e)&&(s.ctx.renderer=we),ba(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,ue,o),!e.el){let r=s.subTree=W(B);b(null,r,t,n),e.placeholder=r.el}}else ue(s,e,t,n,i,a,o)},le=(e,t,n)=>{let r=t.component=e.component;if(ci(e,t,n)){if(r.asyncDep&&!r.asyncResolved){de(r,t,n);return}r.next=t,r.update()}else t.el=e.el,r.vnode=t},ue=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=Li(e);if(n){t&&(t.el=c.el,de(e,t,o)),n.asyncDep.then(()=>{R(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;Ni(e,!1),t?(t.el=c.el,de(e,t,o)):t=c,n&&ce(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&la(d,s,t,c),Ni(e,!0);let f=ai(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),xe(p),e,i,a),t.el=f.el,u===null&&di(e,f.el),r&&R(r,i),(d=t.props&&t.props.onVnodeUpdated)&&R(()=>la(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=fr(t);if(Ni(e,!1),l&&ce(l),!m&&(o=c&&c.onVnodeBeforeMount)&&la(o,d,t),Ni(e,!0),s&&Te){let t=()=>{e.subTree=ai(e),Te(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=ai(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&R(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;R(()=>la(o,d,e),i)}(t.shapeFlag&256||d&&fr(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&R(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new Ae(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>Cn(u),Ni(e,!0),l()},de=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,gi(e,t.props,r,n),ki(e,t.children,n),Ge(),En(e),Ke()},pe=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){he(l,d,n,r,i,a,o,s,c);return}if(f&256){me(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&be(l,i,a),d!==l&&p(n,d)):u&16?m&16?he(l,d,n,r,i,a,o,s,c):be(l,i,a,!0):(u&8&&p(n,``),m&16&&T(d,n,r,i,a,o,s,c))},me=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p;for(p=0;p<f;p++){let n=t[p]=l?oa(t[p]):aa(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?be(e,a,o,!0,!1,f):T(t,r,i,a,o,s,c,l,f)},he=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?oa(t[u]):aa(t[u]);if(Qi(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?oa(t[p]):aa(t[p]);if(Qi(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?oa(t[u]):aa(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)_e(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?oa(t[u]):aa(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){_e(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Qi(n,t[_])){i=_;break}i===void 0?_e(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?Ii(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||zi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?ge(n,r,p,2):_--)}}},ge=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){ge(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,we);return}if(c===z){o(a,t,n);for(let e=0;e<u.length;e++)ge(u[e],t,n,r);o(e.anchor,t,n);return}if(c===Ui){S(e,t,n);return}if(r!==2&&d&1&&l){if(r===0)l.persisted&&!a[Gn]?o(a,t,n):(l.beforeEnter(a),o(a,t,n),R(()=>l.enter(a),i));else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{let e=a._isLeaving||!!a[Gn];a._isLeaving&&a[Gn](!0),l.persisted&&!e?u():r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}}else o(a,t,n)},_e=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if(d===-2&&(i=!1),s!=null&&(Ge(),ur(s,null,n,e,!0),Ke()),p!=null&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!fr(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&la(_,t,e),u&6)ye(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Pn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,we,r):l&&!l.hasOnce&&(a!==z||d>0&&d&64)?be(l,t,n,!1,!0):(a===z&&d&384||!i&&u&16)&&be(c,t,n),r&&D(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&R(()=>{_&&la(_,t,e),h&&Pn(e,null,t,`unmounted`),v&&(e.el=null)},n)},D=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===z){ve(n,r);return}if(t===Ui){C(e);return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},ve=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},ye=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;Ri(c),Ri(l),r&&ce(r),i.stop(),a&&(a.flags|=8,_e(o,e,t,n)),s&&R(s,t),R(()=>{e.isUnmounted=!0},t)},be=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)_e(e[o],t,n,r,i)},xe=e=>{if(e.shapeFlag&6)return xe(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[Un];return n?h(n):t},Se=!1,Ce=(e,t,n)=>{let r;e==null?t._vnode&&(_e(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,Se||=(Se=!0,En(r),Dn(),!1)},we={p:v,um:_e,m:ge,r:D,mt:E,mc:T,pc:pe,pbc:ie,n:xe,o:e},O,Te;return i&&([O,Te]=i(we)),{render:Ce,hydrate:O,createApp:Qr(Ce,O)}}function Mi({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function Ni({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Pi(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Fi(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=oa(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&Fi(t,a)),a.type===Hi&&(a.patchFlag===-1&&(a=i[e]=oa(a)),a.el=t.el),a.type===B&&!a.el&&(a.el=t.el)}}function Ii(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-->0;)n[a]=o,o=t[o];return n}function Li(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Li(t)}function Ri(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function zi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?zi(t.subTree):null}var Bi=e=>e.__isSuspense;function Vi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):Tn(e)}var z=Symbol.for(`v-fgt`),Hi=Symbol.for(`v-txt`),B=Symbol.for(`v-cmt`),Ui=Symbol.for(`v-stc`),Wi=[],Gi=null;function V(e=!1){Wi.push(Gi=e?null:[])}function Ki(){Wi.pop(),Gi=Wi[Wi.length-1]||null}var qi=1;function Ji(e,t=!1){qi+=e,e<0&&Gi&&t&&(Gi.hasOnce=!0)}function Yi(e){return e.dynamicChildren=qi>0?Gi||n:null,Ki(),qi>0&&Gi&&Gi.push(e),e}function H(e,t,n,r,i,a){return Yi(U(e,t,n,r,i,a,!0))}function Xi(e,t,n,r,i){return Yi(W(e,t,n,r,i,!0))}function Zi(e){return e?e.__v_isVNode===!0:!1}function Qi(e,t){return e.type===t.type&&e.key===t.key}var $i=({key:e})=>e??null,ea=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||N(e)||h(e)?{i:An,r:e,k:t,f:!!n}:e);function U(e,t=null,n=null,r=0,i=null,a=e===z?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&$i(t),ref:t&&ea(t),scopeId:jn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:An};return s?(sa(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),qi>0&&!o&&Gi&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Gi.push(c),c}var W=ta;function ta(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===Ar)&&(e=B),Zi(e)){let r=ra(e,t,!0);return n&&sa(r,n),qi>0&&!a&&Gi&&(r.shapeFlag&6?Gi[Gi.indexOf(e)]=r:Gi.push(r)),r.patchFlag=-2,r}if(Da(e)&&(e=e.__vccOpts),t){t=na(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=D(e)),v(n)&&(Wt(n)&&!d(n)&&(n=s({},n)),t.style=pe(n))}let o=g(e)?1:Bi(e)?128:Wn(e)?64:v(e)?4:h(e)?2:0;return U(e,t,n,r,i,o,a,!0)}function na(e){return e?Wt(e)||mi(e)?s({},e):e:null}function ra(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?ca(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&$i(l),ref:t&&t.ref?n&&a?d(a)?a.concat(ea(t)):[a,ea(t)]:ea(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==z?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ra(e.ssContent),ssFallback:e.ssFallback&&ra(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&ir(u,c.clone(u)),u}function ia(e=` `,t=0){return W(Hi,null,e,t)}function G(e=``,t=!1){return t?(V(),Xi(B,null,e)):W(B,null,e)}function aa(e){return e==null||typeof e==`boolean`?W(B):d(e)?W(z,null,e.slice()):Zi(e)?oa(e):W(Hi,null,String(e))}function oa(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:ra(e)}function sa(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`){if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),sa(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;!r&&!mi(t)?t._ctx=An:r===3&&An&&(An.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}}else if(h(t)){if(r&65){sa(e,{default:t});return}t={default:t,_ctx:An},n=32}else t=String(t),r&64?(n=16,t=[ia(t)]):n=8;e.children=t,e.shapeFlag|=n}function ca(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=D([t.class,r.class]));else if(e===`style`)t.style=pe([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function la(e,t,n,r=null){fn(e,t,7,[n,r])}var ua=Xr(),da=0;function fa(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||ua,o={uid:da++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new De(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:bi(i,a),emitsOptions:ri(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=ti.bind(null,o),e.ce&&e.ce(o),o}var K=null,pa=()=>K||An,ma,ha;{let e=fe(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};ma=t(`__VUE_INSTANCE_SETTERS__`,e=>K=e),ha=t(`__VUE_SSR_SETTERS__`,e=>ya=e)}var ga=e=>{let t=K;return ma(e),e.scope.on(),()=>{e.scope.off(),ma(t)}},_a=()=>{K&&K.scope.off(),ma(null)};function va(e){return e.vnode.shapeFlag&4}var ya=!1;function ba(e,t=!1,n=!1){t&&ha(t);let{props:r,children:i}=e.vnode,a=va(e);hi(e,r,a,t),Oi(e,i,n||t);let o=a?xa(e,t):void 0;return t&&ha(!1),o}function xa(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Pr);let{setup:r}=n;if(r){Ge();let n=e.setupContext=r.length>1?Ta(e):null,i=ga(e),a=dn(r,e,0,[e.props,n]),o=y(a);if(Ke(),i(),(o||e.sp)&&!fr(e)&&sr(e),o){if(a.then(_a,_a),t)return a.then(n=>{ha(!0);try{Sa(e,n,t)}finally{ha(!1)}}).catch(t=>{pn(t,e,0)});e.asyncDep=a}else Sa(e,a,t)}else Ca(e,t)}function Sa(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Qt(t)),Ca(e,n)}function Ca(e,t,n){let i=e.type;e.render||=i.render||r;{let t=ga(e);Ge();try{Lr(e)}finally{Ke(),t()}}}var wa={get(e,t){return j(e,`get`,``),e[t]}};function Ta(e){return{attrs:new Proxy(e.attrs,wa),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function Ea(e){return e.exposed?e.exposeProxy||=new Proxy(Qt(Gt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Mr)return Mr[n](e)},has(e,t){return t in e||t in Mr}}):e.proxy}function Da(e){return h(e)&&`__vccOpts`in e}var q=(e,t)=>rn(e,t,ya);function Oa(e,t,n){try{Ji(-1);let r=arguments.length;return r===2?v(t)&&!d(t)?Zi(t)?W(e,null,[t]):W(e,t):W(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Zi(n)&&(n=[n]),W(e,t,n))}finally{Ji(1)}}var ka=`3.5.42`,Aa=void 0,ja=typeof window<`u`&&window.trustedTypes;if(ja)try{Aa=ja.createPolicy(`vue`,{createHTML:e=>e})}catch{}var Ma=Aa?e=>Aa.createHTML(e):e=>e,Na=`http://www.w3.org/2000/svg`,Pa=`http://www.w3.org/1998/Math/MathML`,Fa=typeof document<`u`?document:null,Ia=Fa&&Fa.createElement(`template`),La={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?Fa.createElementNS(Na,e):t===`mathml`?Fa.createElementNS(Pa,e):n?Fa.createElement(e,{is:n}):Fa.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>Fa.createTextNode(e),createComment:e=>Fa.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Fa.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===a||!(i=i.nextSibling)););else{Ia.innerHTML=Ma(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=Ia.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ra=`transition`,za=`animation`,Ba=Symbol(`_vtc`),Va={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ha=s({},Yn,Va),Ua=(e=>(e.displayName=`Transition`,e.props=Ha,e))((e,{slots:t})=>Oa($n,Ka(e),t)),Wa=(e,t=[])=>{d(e)?e.forEach(e=>e(...t)):e&&e(...t)},Ga=e=>e?d(e)?e.some(e=>e.length>1):e.length>1:!1;function Ka(e){let t={};for(let n in e)n in Va||(t[n]=e[n]);if(e.css===!1)return t;let{name:n=`v`,type:r,duration:i,enterFromClass:a=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:l=a,appearActiveClass:u=o,appearToClass:d=c,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:m=`${n}-leave-to`}=e,h=qa(i),g=h&&h[0],_=h&&h[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:b,onLeave:x,onLeaveCancelled:S,onBeforeAppear:C=v,onAppear:w=y,onAppearCancelled:ee=b}=t,te=(e,t,n,r)=>{e._enterCancelled=r,Xa(e,t?d:c),Xa(e,t?u:o),n&&n()},ne=(e,t)=>{e._isLeaving=!1,Xa(e,f),Xa(e,m),Xa(e,p),t&&t()},T=e=>(t,n)=>{let i=e?w:y,o=()=>te(t,e,n);Wa(i,[t,o]),Za(()=>{Xa(t,e?l:a),Ya(t,e?d:c),Ga(i)||$a(t,r,g,o)})};return s(t,{onBeforeEnter(e){Wa(v,[e]),Ya(e,a),Ya(e,o)},onBeforeAppear(e){Wa(C,[e]),Ya(e,l),Ya(e,u)},onEnter:T(!1),onAppear:T(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>ne(e,t);Ya(e,f),e._enterCancelled?(Ya(e,p),ro(e)):(ro(e),Ya(e,p)),Za(()=>{e._isLeaving&&(Xa(e,f),Ya(e,m),Ga(x)||$a(e,r,_,n))}),Wa(x,[e,n])},onEnterCancelled(e){te(e,!1,void 0,!0),Wa(b,[e])},onAppearCancelled(e){te(e,!0,void 0,!0),Wa(ee,[e])},onLeaveCancelled(e){ne(e),Wa(S,[e])}})}function qa(e){if(e==null)return null;if(v(e))return[Ja(e.enter),Ja(e.leave)];{let t=Ja(e);return[t,t]}}function Ja(e){return ue(e)}function Ya(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[Ba]||(e[Ba]=new Set)).add(t)}function Xa(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[Ba];n&&(n.delete(t),n.size||(e[Ba]=void 0))}function Za(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var Qa=0;function $a(e,t,n,r){let i=e._endId=++Qa,a=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(a,n);let{type:o,timeout:s,propCount:c}=eo(e,t);if(!o)return r();let l=o+`end`,u=0,d=()=>{e.removeEventListener(l,f),a()},f=t=>{t.target===e&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},s+1),e.addEventListener(l,f)}function eo(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||``).split(`, `),i=r(`${Ra}Delay`),a=r(`${Ra}Duration`),o=to(i,a),s=r(`${za}Delay`),c=r(`${za}Duration`),l=to(s,c),u=null,d=0,f=0;t===Ra?o>0&&(u=Ra,d=o,f=a.length):t===za?l>0&&(u=za,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?Ra:za:null,f=u?u===Ra?a.length:c.length:0);let p=u===Ra&&/\b(?:transform|all)(?:,|$)/.test(r(`${Ra}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:p}}function to(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>no(t)+no(e[n])))}function no(e){return e===`auto`?0:Number(e.slice(0,-1).replace(`,`,`.`))*1e3}function ro(e){return(e?e.ownerDocument:document).body.offsetHeight}function io(e,t,n){let r=e[Ba];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var ao=Symbol(`_vod`),oo=Symbol(`_vsh`),so=Symbol(``),co=/(?:^|;)\s*display\s*:/;function lo(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t){if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??fo(r,t,``)}else for(let e in t)n[e]??fo(r,e,``)}for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?fo(r,i,``):go(e,i,!g(t)&&t?t[i]:void 0,o)||fo(r,i,o)}}else if(i){if(t!==n){let e=r[so];e&&(n+=`;`+e),r.cssText=n,a=co.test(n)}}else t&&e.removeAttribute(`style`);ao in e&&(e[ao]=a?r.display:``,e[oo]&&(r.display=`none`))}var uo=/\s*!important$/;function fo(e,t,n){if(d(n))n.forEach(n=>fo(e,t,n));else if(n??=``,t.startsWith(`--`))uo.test(n)?e.setProperty(t,n.replace(uo,``),`important`):e.setProperty(t,n);else{let r=ho(e,t);uo.test(n)?e.setProperty(ie(r),n.replace(uo,``),`important`):e[r]=n}}var po=[`Webkit`,`Moz`,`ms`],mo={};function ho(e,t){let n=mo[t];if(n)return n;let r=T(t);if(r!==`filter`&&r in e)return mo[t]=r;r=ae(r);for(let n=0;n<po.length;n++){let i=po[n]+r;if(i in e)return mo[t]=i}return t}function go(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&g(r)&&n===r}var _o=`http://www.w3.org/1999/xlink`;function vo(e,t,n,r,i,a=ye(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(_o,t.slice(6,t.length)):e.setAttributeNS(_o,t,n):n==null||a&&!be(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function yo(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?Ma(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=be(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function bo(e,t,n,r){e.addEventListener(t,n,r)}function xo(e,t,n,r){e.removeEventListener(t,n,r)}var So=Symbol(`_vei`);function Co(e,t,n,r,i=null){let a=e[So]||(e[So]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Eo(t);r?bo(e,n,a[t]=Ao(r,i),s):o&&(xo(e,n,o,s),a[t]=void 0)}}var wo=/(Once|Passive|Capture)$/,To=/^on:?(?:Once|Passive|Capture)$/;function Eo(e){let t,n;for(;(n=e.match(wo))&&!To.test(e);)t||={},e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===`:`?e.slice(3):ie(e.slice(2)),t]}var Do=0,Oo=Promise.resolve(),ko=()=>Do||=(Oo.then(()=>Do=0),Date.now());function Ao(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(d(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&fn(e,t,5,a)}}else fn(r,t,5,[e])};return n.value=e,n.attached=ko(),n}var jo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Mo=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?io(e,r,c):t===`style`?lo(e,n,r):a(t)?o(t)||Co(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),!0):t[0]===`^`?(t=t.slice(1),!1):No(e,t,r,c))?(yo(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&vo(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Po(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?yo(e,T(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),vo(e,t,r,c))};function No(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&jo(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return jo(t)&&g(n)?!1:t in e}function Po(e,t){let n=e._def.props;if(!n)return!1;let r=T(t);return Array.isArray(n)?n.some(e=>T(e)===r):Object.keys(n).some(e=>T(e)===r)}var Fo=[`ctrl`,`shift`,`alt`,`meta`],Io={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>Fo.some(n=>e[`${n}Key`]&&!t.includes(n))},Lo=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=Io[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},Ro=s({patchProp:Mo},La),zo;function Bo(){return zo||=Ai(Ro)}var Vo=((...e)=>{let t=Bo().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=Uo(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,Ho(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function Ho(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function Uo(e){return g(e)?document.querySelector(e):e}var J;(function(e){e.TECHNOLOGY=`technology`,e.CULTIVATION=`cultivation`,e.GENERAL=`general`})(J||={});var Wo=[{id:`weapon_master`,name:`武器大师`,description:`精通各类武器制作和使用`,branch:J.TECHNOLOGY,maxLevel:3,cost:1,effects:[{level:1,bonuses:{combat_damage:.1},description:`武器伤害 +10%`},{level:2,bonuses:{combat_damage:.2,unlock_blueprints:!0},description:`武器伤害 +20%，解锁高级武器图纸`},{level:3,bonuses:{combat_damage:.3,durability_reduction:.5},description:`武器伤害 +30%，耐久消耗 -50%`}]},{id:`building_expert`,name:`建筑专家`,description:`提升建筑效率和质量`,branch:J.TECHNOLOGY,maxLevel:3,cost:1,prerequisites:[`weapon_master`],effects:[{level:1,bonuses:{building_cost_reduction:.1},description:`建筑成本 -10%`},{level:2,bonuses:{building_cost_reduction:.2,automation_unlock:!0},description:`建筑成本 -20%，解锁自动化生产`},{level:3,bonuses:{building_cost_reduction:.3,building_speed:1},description:`建筑成本 -30%，建筑速度 +100%`}]},{id:`trade_magnate`,name:`交易大亨`,description:`掌控市场，垄断贸易`,branch:J.TECHNOLOGY,maxLevel:3,cost:2,prerequisites:[`building_expert`],requiresSpecialization:!0,effects:[{level:1,bonuses:{trade_fee_reduction:.2},description:`交易手续费 -20%`},{level:2,bonuses:{trade_fee_reduction:.4,market_pricing:!0},description:`交易手续费 -40%，解锁市场定价权`},{level:3,bonuses:{trade_fee_reduction:.6,custom_currency:!0},description:`交易手续费 -60%，可发行自定义货币`}]},{id:`automation_engineer`,name:`自动化工程师`,description:`实现全自动生产链`,branch:J.TECHNOLOGY,maxLevel:3,cost:2,prerequisites:[`building_expert`],effects:[{level:1,bonuses:{auto_production:.2},description:`自动生产效率 +20%`},{level:2,bonuses:{auto_production:.5,multi_thread:!0},description:`自动生产效率 +50%，支持多线程生产`},{level:3,bonuses:{auto_production:1,ai_optimization:!0},description:`自动生产效率 +100%，AI优化资源配置`}]}],Go=[{id:`talisman_maker`,name:`符箓师`,description:`制作各种增益符箓`,branch:J.CULTIVATION,maxLevel:3,cost:1,effects:[{level:1,bonuses:{talisman_unlock:`basic`,talisman_effectiveness:1.2},description:`解锁基础符箓制作，效果+20%`},{level:2,bonuses:{talisman_effectiveness:1.5,advanced_talismans:!0},description:`符箓效果 +50%，解锁高级符箓`},{level:3,bonuses:{talisman_effectiveness:2,legendary_talismans:!0},description:`符箓效果 +100%，解锁传说符箓`}]},{id:`spirit_cultivation`,name:`灵力修炼`,description:`提升灵力上限和恢复速度`,branch:J.CULTIVATION,maxLevel:3,cost:1,prerequisites:[`talisman_maker`],effects:[{level:1,bonuses:{max_spirit:100,spirit_recovery:1.2},description:`最大灵力 +100，恢复速度 +20%`},{level:2,bonuses:{max_spirit:200,spirit_recovery:1.5},description:`最大灵力 +200，恢复速度 +50%`},{level:3,bonuses:{max_spirit:500,spirit_recovery:2,spell_combat:!0},description:`最大灵力 +500，恢复速度 +100%，解锁法术战斗`}]},{id:`artifact_forger`,name:`炼器师`,description:`强化和附魔装备`,branch:J.CULTIVATION,maxLevel:3,cost:2,prerequisites:[`spirit_cultivation`],requiresSpecialization:!0,effects:[{level:1,bonuses:{enchant_success_rate:.2},description:`装备强化成功率 +20%`},{level:2,bonuses:{enchant_success_rate:.4,enchant_slots:2},description:`装备强化成功率 +40%，附魔槽位+2`},{level:3,bonuses:{enchant_success_rate:.7,enchant_slots:3,auto_upgrade:!0},description:`装备强化成功率 +70%，附魔槽位+3，装备品质自动提升`}]},{id:`formation_master`,name:`阵法大师`,description:`布置各种阵法增强基地`,branch:J.CULTIVATION,maxLevel:3,cost:2,prerequisites:[`spirit_cultivation`],effects:[{level:1,bonuses:{formation_defense:1.2},description:`阵法防御力 +20%`},{level:2,bonuses:{formation_defense:1.5,formation_types:3},description:`阵法防御力 +50%，解锁3种新阵法`},{level:3,bonuses:{formation_defense:2,formation_types:6,auto_activate:!0},description:`阵法防御力 +100%，解锁6种阵法，自动激活`}]}],Ko=[{id:`explorer`,name:`探索者`,description:`提升探索效率和发现能力`,branch:J.GENERAL,maxLevel:3,cost:1,effects:[{level:1,bonuses:{fog_disperse_range:2,movement_speed:.2},description:`迷雾驱散范围 +2米，移动速度 +20%`},{level:2,bonuses:{fog_disperse_range:4,movement_speed:.4,hidden_chest_chance:.05},description:`迷雾驱散范围 +4米，移动速度 +40%，发现隐藏宝箱概率 +5%`},{level:3,bonuses:{fog_disperse_range:6,movement_speed:.6,hidden_chest_chance:.1,map_reveal:!0},description:`迷雾驱散范围 +6米，移动速度 +60%，发现隐藏宝箱概率 +10%，可透视小地图`}]},{id:`survival_expert`,name:`生存专家`,description:`降低资源消耗，提升自然恢复`,branch:J.GENERAL,maxLevel:3,cost:1,effects:[{level:1,bonuses:{resource_consumption:.9},description:`资源消耗 -10%`},{level:2,bonuses:{resource_consumption:.8,natural_recovery:1.3},description:`资源消耗 -20%，自然恢复速度 +30%`},{level:3,bonuses:{resource_consumption:.7,natural_recovery:1.5,immunity_to_debuffs:!0},description:`资源消耗 -30%，自然恢复速度 +50%，免疫负面环境影响`}]},{id:`lucky_one`,name:`幸运儿`,description:`提升幸运值，增加稀有掉落`,branch:J.GENERAL,maxLevel:3,cost:1,effects:[{level:1,bonuses:{luck:5,crit_chance:.1},description:`幸运值 +5，暴击率 +10%`},{level:2,bonuses:{luck:10,crit_chance:.2,rare_drop_bonus:.1},description:`幸运值 +10，暴击率 +20%，稀有掉落概率 +10%`},{level:3,bonuses:{luck:20,crit_chance:.3,rare_drop_bonus:.15,legendary_drop:!0},description:`幸运值 +20，暴击率 +30%，稀有掉落概率 +15%，有几率获得传说物品`}]},{id:`diplomat`,name:`外交官`,description:`改善与其他幸存者的关系`,branch:J.GENERAL,maxLevel:3,cost:2,effects:[{level:1,bonuses:{npc_favor_gain:1.2},description:`NPC好感度获取 +20%`},{level:2,bonuses:{npc_favor_gain:1.5,alliance_discount:.1},description:`NPC好感度获取 +50%，联盟交易折扣 -10%`},{level:3,bonuses:{npc_favor_gain:2,alliance_discount:.2,recruit_bonus:!0},description:`NPC好感度获取 +100%，联盟交易折扣 -20%，招募成功率提升`}]}],qo=[...Wo,...Go,...Ko],Jo=Object.fromEntries(qo.map(e=>[e.id,e]));function Yo(){return{points:0,totalPoints:0,skills:{},canChooseSpecialization:!1}}function Xo(e,t){e.skills.points+=t,e.skills.totalPoints+=t,e.skills.totalPoints>=30&&!e.skills.specialization&&(e.skills.canChooseSpecialization=!0)}function Zo(e,t){return e.skills.canChooseSpecialization?e.skills.specialization?{success:!1,message:`已经选择了${ts(e.skills.specialization)}专精，无法更改`}:(e.skills.specialization=t,e.skills.canChooseSpecialization=!1,{success:!0,message:`成功选择${ts(t)}专精！现在可以学习该分支的专属技能。`,branch:t}):{success:!1,message:`还未达到选择专精的条件（需要累计30技能点）`}}function Qo(e,t){let n=Jo[t];if(!n)return{success:!1,message:`未知的技能`};let r=e.skills.skills[t],i=r?.level??0;if(i>=n.maxLevel)return{success:!1,message:`${n.name}已达到最高等级`};if(e.skills.points<n.cost)return{success:!1,message:`技能点不足！需要${n.cost}点，当前只有${e.skills.points}点`};if(n.prerequisites)for(let t of n.prerequisites){let n=e.skills.skills[t];if(!n||n.level===0)return{success:!1,message:`需要先解锁${Jo[t]?.name||t}`}}if(n.requiresSpecialization){if(!e.skills.specialization)return{success:!1,message:`需要先选择专精才能学习此技能`};if(n.branch!==e.skills.specialization)return{success:!1,message:`这是${ts(n.branch)}专精的技能，你选择的是${ts(e.skills.specialization)}`}}e.skills.points-=n.cost,r?r.level+=1:e.skills.skills[t]={id:t,level:1,unlocked:!0};let a=e.skills.skills[t].level,o=n.effects.find(e=>e.level===a);return{success:!0,message:`${n.name} ${i===0?`解锁`:`升级`}至 Lv.${a}！${o?.description||``}`,skill:n,newLevel:a}}function $o(e){let t={combat:{damageMultiplier:1,defenseBonus:0,critChance:0},survival:{resourceConsumptionReduction:0,recoveryBonus:0,explorationSpeed:0},economy:{tradeDiscount:0,productionBonus:0,craftingSpeed:0},special:{}};for(let[n,r]of Object.entries(e.skills.skills)){if(!r.unlocked||r.level===0)continue;let e=Jo[n];if(!e)continue;let i=e.effects.find(e=>e.level===r.level);if(i)for(let[e,n]of Object.entries(i.bonuses))es(t,e,n)}return t}function es(e,t,n){switch(t){case`combat_damage`:e.combat.damageMultiplier+=n;break;case`crit_chance`:e.combat.critChance+=n;break;case`resource_consumption`:e.survival.resourceConsumptionReduction+=1-n;break;case`natural_recovery`:e.survival.recoveryBonus+=n-1;break;case`fog_disperse_range`:case`movement_speed`:e.survival.explorationSpeed+=n;break;case`trade_fee_reduction`:e.economy.tradeDiscount+=n;break;case`auto_production`:case`building_speed`:e.economy.productionBonus+=n;break;default:e.special[t]=n}}function ts(e){return{[J.TECHNOLOGY]:`科技`,[J.CULTIVATION]:`修仙`,[J.GENERAL]:`通用`}[e]}var Y={wood:{id:`wood`,name:`木材`,description:`基础建筑材料`,category:`resource`,basePrice:5,stackable:!0,maxStack:999},stone:{id:`stone`,name:`石材`,description:`坚固的建筑石料`,category:`resource`,basePrice:8,stackable:!0,maxStack:999},metal:{id:`metal`,name:`金属`,description:`用于制作工具和武器`,category:`resource`,basePrice:15,stackable:!0,maxStack:999},food:{id:`food`,name:`食物`,description:`维持生存必需品`,category:`consumable`,basePrice:10,stackable:!0,maxStack:500},water:{id:`water`,name:`水`,description:`生命之源`,category:`consumable`,basePrice:8,stackable:!0,maxStack:500},mutant_fang:{id:`mutant_fang`,name:`变异獠牙`,description:`可用于制作高级武器`,category:`material`,basePrice:30,stackable:!0,maxStack:100},beast_core:{id:`beast_core`,name:`野兽核心`,description:`蕴含能量的晶体`,category:`material`,basePrice:50,stackable:!0,maxStack:50},mysterious_crystal:{id:`mysterious_crystal`,name:`神秘结晶`,description:`未知的紫色晶体，散发能量波动`,category:`special`,basePrice:200,stackable:!0,maxStack:20},purple_crystal:{id:`purple_crystal`,name:`紫色结晶`,description:`蕴含灵力的紫色晶体，可引导融合`,category:`material`,basePrice:80,stackable:!0,maxStack:50},red_crystal:{id:`red_crystal`,name:`赤红结晶`,description:`灼热的赤色晶体，能量暴烈`,category:`material`,basePrice:120,stackable:!0,maxStack:50},blue_crystal:{id:`blue_crystal`,name:`湛蓝结晶`,description:`冰凉的蓝色晶体，能安抚心神`,category:`material`,basePrice:100,stackable:!0,maxStack:50},golden_crystal:{id:`golden_crystal`,name:`鎏金结晶`,description:`稀有的金色晶体，结晶融合的钥匙`,category:`special`,basePrice:300,stackable:!0,maxStack:10},mutant_core:{id:`mutant_core`,name:`变异核心`,description:`进化怪物体内的能量核心`,category:`material`,basePrice:60,stackable:!0,maxStack:50},research_data:{id:`research_data`,name:`研究资料`,description:`研究所遗留的实验记录`,category:`special`,basePrice:40,stackable:!0,maxStack:20},alliance_badge:{id:`alliance_badge`,name:`联盟徽章`,description:`幸存者联盟的信物`,category:`special`,basePrice:150,stackable:!0,maxStack:5},ancient_scroll:{id:`ancient_scroll`,name:`上古卷轴`,description:`记载迷雾世界真相的古旧文书`,category:`special`,basePrice:250,stackable:!0,maxStack:10},wooden_spear:{id:`wooden_spear`,name:`木矛`,description:`简易武器，攻击力+10`,category:`equipment`,basePrice:40,stackable:!1,attack:10},iron_sword:{id:`iron_sword`,name:`铁剑`,description:`精制武器，攻击力+25`,category:`equipment`,basePrice:120,stackable:!1,attack:25},radio_parts:{id:`radio_parts`,name:`无线电零件`,description:`从废墟中找到的电子元件，集齐3个可修理无线电`,category:`material`,basePrice:25,stackable:!0,maxStack:20},signal_flare:{id:`signal_flare`,name:`信号弹`,description:`关键时刻可发射求救信号，撕裂浓雾`,category:`special`,basePrice:100,stackable:!0,maxStack:5},gunpowder:{id:`gunpowder`,name:`火药`,description:`从废墟中找到的火药，可制作信号弹或武器`,category:`material`,basePrice:30,stackable:!0,maxStack:50},herb:{id:`herb`,name:`草药`,description:`迷雾中生长的草药，有治疗效果`,category:`consumable`,basePrice:15,stackable:!0,maxStack:50},bandage:{id:`bandage`,name:`绷带`,description:`简易医疗用品，可恢复生命值`,category:`consumable`,basePrice:20,stackable:!0,maxStack:30}},ns={wandering_trader:{id:`wandering_trader`,name:`流浪商人`,location:`随机出现`,inventory:{food:50,water:50,wooden_spear:3},buyMultiplier:.6,sellMultiplier:1.3,refreshDays:3,lastRefresh:0},weaponsmith:{id:`weaponsmith`,name:`铁匠老王`,location:`联盟集市`,inventory:{iron_sword:2,metal:100},buyMultiplier:.7,sellMultiplier:1.4,refreshDays:5,lastRefresh:0},alchemist:{id:`alchemist`,name:`炼金术士`,location:`迷雾边缘`,inventory:{mysterious_crystal:5,beast_core:10},buyMultiplier:.5,sellMultiplier:1.5,refreshDays:7,lastRefresh:0}};function rs(){return{currency:0,customAmount:0,tradeHistory:[],marketPrices:{},unlockedMerchants:[`wandering_trader`]}}function is(e,t,n){let r=.5+t*.5,i=1.5-n*.5;return Math.floor(e.basePrice*r*i)}function as(e,t){for(let[n,r]of Object.entries(Y)){let i=.8+Math.random()*.4,a=.8+Math.random()*.4,o=is(r,i,a);if(!e.economy.marketPrices[n])e.economy.marketPrices[n]={itemId:n,currentPrice:o,basePrice:r.basePrice,demand:i,supply:a,lastUpdated:t,priceHistory:[o]};else{let r=e.economy.marketPrices[n];r.currentPrice=o,r.demand=i,r.supply=a,r.lastUpdated=t,r.priceHistory.push(o),r.priceHistory.length>7&&r.priceHistory.shift()}}}function os(e,t,n,r){let i=ns[t];if(!i)return{success:!1,message:`商人不存在`};let a=Y[n];if(!a)return{success:!1,message:`物品不存在`};let o=i.inventory[n]??0;if(o<r)return{success:!1,message:`库存不足！只有${o}个`};let s=e.economy.marketPrices[n]?.currentPrice??a.basePrice,c=Math.floor(s*i.sellMultiplier),l=c*r;if(e.economy.currency<l)return{success:!1,message:`积分不足！需要${l}，当前只有${e.economy.currency}`};e.economy.currency-=l,i.inventory[n]-=r,e.inventory[n]=(e.inventory[n]??0)+r;let u={id:`trade_${Date.now()}`,day:e.day,type:`buy`,itemId:n,quantity:r,unitPrice:c,totalPrice:l,trader:i.name};return e.economy.tradeHistory.push(u),{success:!0,message:`成功购买 ${a.name} x${r}，花费${l}积分`,cost:l}}function ss(e,t,n,r){let i=ns[t];if(!i)return{success:!1,message:`商人不存在`};let a=Y[n];if(!a)return{success:!1,message:`物品不存在`};let o=e.inventory[n]??0;if(o<r)return{success:!1,message:`库存不足！只有${o}个`};let s=e.economy.marketPrices[n]?.currentPrice??a.basePrice,c=e.itemLevels?.[n]?.level??1,l=e.flags?.companion_rat?1.1:1,u=Math.floor(s*i.buyMultiplier*(1+.1*(c-1))*l),d=u*r;e.economy.currency+=d,e.inventory[n]-=r,i.inventory[n]=(i.inventory[n]??0)+r;let f={id:`trade_${Date.now()}`,day:e.day,type:`sell`,itemId:n,quantity:r,unitPrice:u,totalPrice:d,trader:i.name};return e.economy.tradeHistory.push(f),{success:!0,message:`成功出售 ${a.name} x${r}，获得${d}积分`,earnings:d}}var cs;(function(e){e.HUT=`hut`,e.WOODEN_HOUSE=`wooden_house`,e.STONE_HOUSE=`stone_house`,e.FORTRESS=`fortress`,e.VALLEY_BASE=`valley_base`})(cs||={});var X;(function(e){e.FARM=`farm`,e.WORKSHOP=`workshop`,e.MINE=`mine`,e.LOGGING_CAMP=`logging_camp`,e.WOODEN_SPIKE=`wooden_spike`,e.FENCE=`fence`,e.BALLISTA_TOWER=`ballista_tower`,e.WALL=`wall`,e.WATCHTOWER=`watchtower`,e.STORAGE=`storage`,e.WELL=`well`,e.FIRE_PIT=`fire_pit`,e.MEDICAL_TENT=`medical_tent`})(X||={});var ls={1:{type:cs.HUT,name:`茅草屋`,maxStructures:3,maxStorage:50,maxDefense:0,cost:{},unlocks:[`basic_shelter`]},2:{type:cs.WOODEN_HOUSE,name:`木屋`,maxStructures:6,maxStorage:100,maxDefense:50,cost:{wood:200,stone:50},unlocks:[`wooden_spike`,`simple_fence`,`fire_pit`]},3:{type:cs.STONE_HOUSE,name:`石屋`,maxStructures:10,maxStorage:200,maxDefense:150,cost:{stone:500,metal:100,wood:300},unlocks:[`ballista_tower`,`watchtower`,`well`,`storage`]},4:{type:cs.FORTRESS,name:`堡垒`,maxStructures:15,maxStorage:500,maxDefense:300,cost:{stone:600,metal:150,wood:500},unlocks:[`wall`,`farm`,`workshop`,`mine`]},5:{type:cs.VALLEY_BASE,name:`山谷基地`,maxStructures:999,maxStorage:9999,maxDefense:999,cost:{stone:2e3,metal:800,wood:1500},unlocks:[`all_structures`,`automation`,`trade_center`]}},us={farm:{id:`farm`,name:`农田`,description:`种植作物，每日自动生产食物`,type:X.FARM,cost:{wood:50,stone:20},space:2,minBaseLevel:4,effects:[{type:`production`,target:`food`,value:20,description:`每日生产20食物`}],maintenanceCost:{water:5}},workshop:{id:`workshop`,name:`工坊`,description:`制作工具和武器`,type:X.WORKSHOP,cost:{wood:100,stone:50,metal:30},space:2,minBaseLevel:4,effects:[{type:`unlock`,target:`crafting_tier2`,value:1,description:`解锁二级制作配方`},{type:`buff`,target:`crafting_speed`,value:.5,description:`制作速度+50%`}]},mine:{id:`mine`,name:`矿场`,description:`开采矿石和石材`,type:X.MINE,cost:{wood:80,stone:30},space:2,minBaseLevel:4,effects:[{type:`production`,target:`stone`,value:15,description:`每日生产15石材`},{type:`production`,target:`metal`,value:5,description:`每日生产5金属`}]},logging_camp:{id:`logging_camp`,name:`伐木场`,description:`自动采集木材`,type:X.LOGGING_CAMP,cost:{wood:60},space:1,minBaseLevel:3,effects:[{type:`production`,target:`wood`,value:25,description:`每日生产25木材`}]},wooden_spike:{id:`wooden_spike`,name:`木刺陷阱`,description:`对入侵的野兽造成伤害`,type:X.WOODEN_SPIKE,cost:{wood:30},space:1,minBaseLevel:2,effects:[{type:`defense`,target:`trap_damage`,value:10,description:`提供10点防御力`}]},fence:{id:`fence`,name:`简易栅栏`,description:`阻挡小型野兽`,type:X.FENCE,cost:{wood:50},space:1,minBaseLevel:2,effects:[{type:`defense`,target:`barrier`,value:15,description:`提供15点防御力`}]},ballista_tower:{id:`ballista_tower`,name:`连弩塔楼`,description:`远程攻击来袭的野兽`,type:X.BALLISTA_TOWER,cost:{wood:100,metal:30,stone:50},space:2,minBaseLevel:3,effects:[{type:`defense`,target:`ranged_damage`,value:30,description:`提供30点远程防御力`}]},wall:{id:`wall`,name:`城墙`,description:`坚固的防御工事`,type:X.WALL,cost:{stone:200,metal:50},space:3,minBaseLevel:4,effects:[{type:`defense`,target:`wall_defense`,value:50,description:`提供50点防御力`}]},watchtower:{id:`watchtower`,name:`预警塔`,description:`提前发现危险`,type:X.WATCHTOWER,cost:{wood:80,stone:30},space:1,minBaseLevel:3,effects:[{type:`buff`,target:`warning_range`,value:2,description:`预警范围+2格`}]},storage:{id:`storage`,name:`仓库`,description:`增加存储空间`,type:X.STORAGE,cost:{wood:100,stone:50},space:2,minBaseLevel:3,effects:[{type:`capacity`,target:`storage`,value:100,description:`存储空间+100`}]},well:{id:`well`,name:`水井`,description:`提供稳定的水源`,type:X.WELL,cost:{stone:80,wood:30},space:1,minBaseLevel:3,effects:[{type:`production`,target:`water`,value:30,description:`每日生产30水`}]},fire_pit:{id:`fire_pit`,name:`火堆`,description:`提供温暖和照明`,type:X.FIRE_PIT,cost:{wood:20,stone:10},space:1,minBaseLevel:2,effects:[{type:`buff`,target:`warmth_recovery`,value:10,description:`温暖度恢复+10/天`},{type:`buff`,target:`sanity_protection`,value:5,description:`理智值保护+5`}]},medical_tent:{id:`medical_tent`,name:`医疗帐篷`,description:`加速生命恢复`,type:X.MEDICAL_TENT,cost:{wood:60,cloth:20},space:1,minBaseLevel:3,effects:[{type:`buff`,target:`health_recovery`,value:5,description:`生命值恢复+5/天`}]}};function ds(){return{level:1,type:cs.HUT,structures:[],defenses:[],storage:{},capacity:{maxStructures:3,maxStorage:50,maxPopulation:1},totalDefense:0}}function fs(e){let t=e.base.level,n=t+1;if(!ls[n])return{success:!1,message:`基地已达到最高等级！`};let r=ls[n];for(let[t,n]of Object.entries(r.cost)){let r=e.inventory[t]??0;if(r<n)return{success:!1,message:`资源不足！需要 ${t} x${n}，当前只有 x${r}`}}for(let[t,n]of Object.entries(r.cost))e.inventory[t]-=n;return e.base.level=n,e.base.type=r.type,e.base.capacity.maxStructures=r.maxStructures,e.base.capacity.maxStorage=r.maxStorage,{success:!0,message:`基地升级为${r.name}！解锁新建筑和功能。`,oldLevel:t,newLevel:n,cost:r.cost}}function ps(e,t,n){let r=us[t];if(!r)return{success:!1,message:`未知的建筑类型`};if(e.base.level<r.minBaseLevel)return{success:!1,message:`基地等级不足！需要${r.minBaseLevel}级`};if(r.prerequisites){for(let t of r.prerequisites)if(!e.base.structures.some(e=>e.structureId===t))return{success:!1,message:`需要先建造${us[t]?.name||t}`}}if(e.base.structures.reduce((e,t)=>e+(us[t.structureId]?.space??1),0)+r.space>e.base.capacity.maxStructures)return{success:!1,message:`空间不足！无法放置更多建筑`};for(let[t,n]of Object.entries(r.cost))if((e.inventory[t]??0)<n)return{success:!1,message:`资源不足！需要 ${t} x${n}`};for(let[t,n]of Object.entries(r.cost))e.inventory[t]-=n;let i={id:`struct_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,structureId:t,level:1,position:n,hp:100,maxHp:100,lastProductionDay:e.day};return e.base.structures.push(i),gs(e.base),{success:!0,message:`成功建造${r.name}！`,structure:i}}function ms(e){let t={},n=[];for(let n of e.base.structures){let r=us[n.structureId];if(!r)continue;let i=r.effects.filter(e=>e.type===`production`);for(let r of i)r.target&&r.value>0&&(Is.includes(r.target)&&e.resources[r.target]?Z(e.resources[r.target],r.value):e.inventory[r.target]=(e.inventory[r.target]??0)+r.value,t[r.target]=(t[r.target]??0)+r.value,n.lastProductionDay=e.day)}for(let[e,r]of Object.entries(t))n.push(`${e} +${r}`);return{produced:t,messages:n}}function hs(e){gs(e)}function gs(e){let t=0;for(let n of e.structures){let e=us[n.structureId];if(!e)continue;let r=e.effects.filter(e=>e.type===`defense`);for(let e of r)t+=e.value}e.totalDefense=t}var _s=[{id:`duoduo`,name:`朵朵`,recruitFavor:30,defense:10,rankBonus:5,joinText:`朵朵把她的布娃娃摆在了窗台上——这里现在是「我们家」了。`,daily:e=>(Z(e.resources.sanity,2),`朵朵给你讲了便利店时代的冷笑话（理智+2）`)},{id:`laok`,name:`老K`,recruitFavor:30,defense:30,rankBonus:5,joinText:`老K检查了一遍你的木刺，没说话，但把他的备用匕首留在了桌上。`,daily:e=>(Z(e.resources.energy,3),`老K包揽了后半夜的守夜（体力+3）`)},{id:`doc`,name:`林医生`,recruitFavor:30,defense:5,rankBonus:5,joinText:`林医生把药箱锁进了木屋的柜子：「以后换药按时来。」`,daily:e=>(Z(e.resources.health,3),`林医生查了房，处理了你的旧伤（生命+3）`)},{id:`rat`,name:`鼠王`,recruitFavor:30,defense:0,rankBonus:10,joinText:`鼠王收起了他的王冠（一个瓶盖），把下水道的门钥匙留给了你。`},{id:`rescue`,name:`救援队`,recruitFavor:30,defense:20,rankBonus:15,joinText:`7号避难所的三个人扛着器械住了进来。电台里，你的呼号变成了「前哨站」。`},{id:`crystal`,name:`结晶之声`,recruitFavor:30,defense:15,rankBonus:5,joinText:`结晶悬浮在你枕边，像一盏不灭的灯。雾从此绕着你的木屋走。`,daily:e=>(Z(e.resources.sanity,3),`结晶之夜：低哼的频率抚平了你的梦（理智+3）`)}];function vs(e,t){return!!e.flags[`companion_${t}`]}function ys(e){return _s.filter(t=>vs(e,t.id)).reduce((e,t)=>e+t.defense,0)}function bs(e){return _s.filter(t=>vs(e,t.id)).reduce((e,t)=>e+t.rankBonus,0)}function xs(e,t,n){let r=_s.find(e=>e.id===t);return!r||vs(e,t)||n<r.recruitFavor?null:(e.flags[`companion_${t}`]=!0,`【同伴】${r.joinText}`)}function Ss(e){let t=[];for(let n of _s){if(!vs(e,n.id)||!n.daily)continue;let r=n.daily(e);r&&t.push(`【同伴】${r}`)}return t}var Cs=[{triggerDay:1,name:`迷雾初现`,description:`世界被迷雾笼罩，你从一个小木屋开始求生之旅。`,difficultyMultiplier:1,unlocks:[`basic_exploration`,`simple_crafting`]},{triggerDay:7,name:`迷雾加深`,description:`迷雾变得更加浓重，怪物开始进化，危险等级提升。`,difficultyMultiplier:1.5,unlocks:[`advanced_monsters`,`rare_resources`,`skill_tree_unlock`],forcedEvent:`first_beast_wave_warning`},{triggerDay:15,name:`兽潮前夕`,description:`远处传来野兽的咆哮声，大规模兽潮即将来临。`,difficultyMultiplier:2,unlocks:[`defense_structures`,`alliance_system`,`trade_market`],forcedEvent:`beast_wave_preparation`},{triggerDay:30,name:`力量觉醒`,description:`迷雾中蕴含的神秘力量开始显现，你可以选择科技或修仙之路。`,difficultyMultiplier:3,unlocks:[`specialization_choice`,`magic_items`,`advanced_crafting`],forcedEvent:`power_awakening`},{triggerDay:50,name:`真相浮现`,description:`古老的遗迹被发现，迷雾世界的真相逐渐揭开。`,difficultyMultiplier:4,unlocks:[`ancient_ruins`,`truth_quests`,`ending_paths`],forcedEvent:`ancient_ruins_discovery`},{triggerDay:80,name:`终极考验`,description:`迷雾之主即将苏醒，最后的决战即将到来。`,difficultyMultiplier:5,unlocks:[`final_battle`,`true_endings`],forcedEvent:`final_countdown`}],ws=[{id:`beast_wave_tier1`,triggerDay:10,warningDays:3,name:`初级兽潮`,description:`成群的野兽从迷雾中涌出，袭击所有幸存者基地。`,type:`beast_wave`,duration:1,severity:3,requirements:{minBaseLevel:2,minDefense:50},successRewards:{xp:200,items:{beast_core:3,rare_material:2},unlock:`beast_hunting_technique`},failurePenalties:{resourceLoss:{food:50,wood:30},structureDamage:30,healthDamage:20}},{id:`extreme_cold`,triggerDay:20,warningDays:5,name:`极寒来袭`,description:`气温骤降，温暖度消耗加倍，露天活动变得极其危险。`,type:`extreme_weather`,duration:5,severity:5,requirements:{minBaseLevel:3,requiredResources:{fuel:100,warm_clothing:2}},successRewards:{xp:300,unlock:`cold_resistance`},failurePenalties:{healthDamage:50,resourceLoss:{fuel:80}}},{id:`beast_wave_tier2`,triggerDay:35,warningDays:5,name:`中级兽潮`,description:`进化的野兽群出现，拥有特殊能力，普通防御难以抵挡。`,type:`beast_wave`,duration:2,severity:6,requirements:{minBaseLevel:4,minDefense:150},successRewards:{xp:500,items:{evolved_beast_core:5,magic_crystal:3},unlock:`advanced_defense_blueprints`},failurePenalties:{resourceLoss:{food:100,stone:50,metal:30},structureDamage:60,healthDamage:40}},{id:`fog_expansion`,triggerDay:45,warningDays:7,name:`迷雾扩张`,description:`迷雾范围扩大，已探索区域重新被覆盖，需要重新驱散。`,type:`fog_expansion`,duration:3,severity:7,requirements:{minBaseLevel:4},successRewards:{xp:400,unlock:`fog_compass`},failurePenalties:{}},{id:`beast_wave_tier3`,triggerDay:60,warningDays:7,name:`高级兽潮`,description:`兽王率领的精英兽群来袭，这是生死存亡的关键一战。`,type:`beast_wave`,duration:3,severity:9,requirements:{minBaseLevel:5,minDefense:300},successRewards:{xp:1e3,items:{beast_king_core:1,legendary_material:5},unlock:`beast_taming`},failurePenalties:{resourceLoss:{food:200,wood:100,stone:100,metal:50},structureDamage:100,healthDamage:80}}],Ts=[{id:`mysterious_signal`,condition:{minDay:10,maxDay:20},questId:`rescue_line`,onceOnly:!0,priority:10},{id:`alliance_invitation`,condition:{minBaseLevel:3,minDay:15},questId:`alliance_line`,onceOnly:!0,priority:9},{id:`crystal_discovery`,condition:{minDay:20,flags:[`explored_deep_forest`]},questId:`crystal_line`,onceOnly:!0,priority:8},{id:`survivor_encounter`,condition:{minDay:5,maxDay:15,notFlags:[`met_other_survivors`]},questId:`survivor_story`,onceOnly:!0,priority:7},{id:`ancient_ruins_hint`,condition:{minDay:30,minBaseLevel:4,completedTriggers:[`crystal_discovery`]},questId:`ruins_exploration`,onceOnly:!0,priority:6}];function Es(){return{currentWorldTier:1,triggeredTiers:[1],upcomingCatastrophes:[],occurredCatastrophes:[],triggeredStories:[],resourceDepletion:{},daysToNextTier:6,daysToNextCatastrophe:7}}function Ds(e,t){let n={messages:[]},{progression:r}=e,i=Os(e);i&&(n.tierUpgrade=i,n.messages.push(`【世界升级】${i.tierInfo.name}！${i.tierInfo.description}`),i.tierInfo.forcedEvent&&t.randomEvents.some(e=>e.id===i.tierInfo.forcedEvent)&&e.pendingEvents.push(i.tierInfo.forcedEvent));let a=ks(e);a.warning&&(n.catastropheWarning=a.warning,n.messages.push(`【天灾预警】${a.warning.name}将在${a.warning.warningDays}天后降临！`)),a.trigger&&(n.catastropheTrigger=a.trigger,n.messages.push(`【天灾降临】${a.trigger.name}！${a.trigger.description}`),e.pendingEvents.push(`catastrophe_${a.trigger.id}`));let o=As(e);o&&(n.storyTrigger=o,n.messages.push(`【剧情触发】新的任务线已开启！`),e.eventStack.push(e.currentScene));let s=Ms(e);return s&&(n.resourceDepletion=s,n.messages.push(s.message)),Ns(r),n}function Os(e){let{progression:t,day:n}=e;for(let e of Cs)if(n>=e.triggerDay&&!t.triggeredTiers.includes(e.triggerDay)){let n=t.currentWorldTier,r=Cs.indexOf(e)+1;return t.currentWorldTier=r,t.triggeredTiers.push(e.triggerDay),{oldTier:n,newTier:r,tierInfo:e}}return null}function ks(e){let{progression:t,day:n}=e,r={};for(let e of ws)t.occurredCatastrophes.includes(e.id)||(n===e.triggerDay-e.warningDays&&(r.warning=e,t.upcomingCatastrophes.push(e)),n===e.triggerDay&&(r.trigger=e,t.occurredCatastrophes.push(e.id),t.upcomingCatastrophes=t.upcomingCatastrophes.filter(t=>t.id!==e.id)));return r}function As(e){let{progression:t}=e,n=[...Ts].sort((e,t)=>t.priority-e.priority);for(let r of n)if(!(r.onceOnly&&t.triggeredStories.includes(r.id))&&js(r.condition,e))return t.triggeredStories.push(r.id),r;return null}function js(e,t){if(e.minDay&&t.day<e.minDay||e.maxDay&&t.day>e.maxDay||e.flags&&!e.flags.every(e=>t.flags[e])||e.notFlags&&e.notFlags.some(e=>t.flags[e])||e.minBaseLevel&&(t.base?.level??1)<e.minBaseLevel)return!1;if(e.minSkillLevel){let n=t.skills;if(!n)return!1;for(let[t,r]of Object.entries(e.minSkillLevel))if((n.levels?.[t]??0)<r)return!1}if(e.completedTriggers){let{progression:n}=t;if(!e.completedTriggers.every(e=>n.triggeredStories.includes(e)))return!1}return!0}function Ms(e){let t=e.exploration?.currentArea??`starter_area`;return!e.progression.resourceDepletion[t]&&e.visitedScenes.filter(e=>e.startsWith(t)).length>20?(e.progression.resourceDepletion[t]=!0,{areaId:t,message:`【资源枯竭】${t}的资源已经耗尽，你需要前往更远的区域探索。`}):null}function Ns(e){let t=Cs.find(t=>t.triggerDay>e.triggeredTiers[e.triggeredTiers.length-1]);e.daysToNextTier=t?t.triggerDay-e.triggeredTiers.at(-1):0;let n=ws.find(t=>!e.occurredCatastrophes.includes(t.id));e.daysToNextCatastrophe=n?n.triggerDay-(e.triggeredTiers.at(-1)||1):0}function Ps(e,t){let n=[],r=!0,i=t.requirements??{};i.minBaseLevel&&e.base.level<i.minBaseLevel&&(r=!1,n.push(`基地等级不足（需要 ${i.minBaseLevel} 级）`));let a=(e.base.totalDefense??0)+ys(e);i.minDefense!=null&&a<i.minDefense&&(r=!1,n.push(`防御工事不足（需要 ${i.minDefense}，当前 ${a}）`));for(let[t,a]of Object.entries(i.requiredResources??{}))Y[t]&&(e.inventory[t]??0)<a&&(r=!1,n.push(`缺少 ${Y[t].name}×${a}`));return r&&n.push(`你做足了准备——工事的轮廓在雾里沉默地站着。`),{success:r,messages:n}}function Fs(e,t,n){let r=[];if(n){if(r.push(`你成功抵御了${t.name}！`),t.successRewards.xp){let n=Math.floor(t.successRewards.xp/100);n>0&&Xo(e,n),r.push(`获得 ${t.successRewards.xp} 点经验值${n>0?`（转化为 ${n} 技能点）`:``}`)}if(t.successRewards.items)for(let[n,i]of Object.entries(t.successRewards.items))e.inventory[n]=(e.inventory[n]??0)+i,r.push(`获得 ${n} x${i}`);t.successRewards.unlock&&(e.flags[`unlocked_${t.successRewards.unlock}`]=!0,r.push(`解锁新内容：${t.successRewards.unlock}`))}else{if(r.push(`你未能完全抵御${t.name}，遭受了损失...`),t.failurePenalties.resourceLoss)for(let[n,i]of Object.entries(t.failurePenalties.resourceLoss)){let t=n;e.resources[t]?(e.resources[t].current=Math.max(0,e.resources[t].current-i),r.push(`${n} 损失 ${i}`)):Y[n]&&(e.inventory[n]=Math.max(0,(e.inventory[n]??0)-i),r.push(`${Y[n].name} 损失 ${i}`))}if(t.failurePenalties.healthDamage&&(e.resources.health.current=Math.max(0,e.resources.health.current-t.failurePenalties.healthDamage),r.push(`生命值损失 ${t.failurePenalties.healthDamage}`)),t.failurePenalties.structureDamage){for(let n of e.base.structures)n.hp=Math.max(0,n.hp-t.failurePenalties.structureDamage);let n=e.base.structures.length;e.base.structures=e.base.structures.filter(e=>e.hp>0),hs(e.base);let i=n-e.base.structures.length;r.push(i>0?`建筑受损，${i} 座设施被摧毁`:`建筑受损（设施硬撑了下来）`)}}return{messages:r}}var Is=[`food`,`water`,`health`,`sanity`,`energy`,`warmth`],Ls={food:100,water:100,health:100,sanity:100,energy:100,warmth:100},Rs={food:`食物`,water:`水`,health:`生命`,sanity:`理智`,energy:`体力`,warmth:`温暖`};function zs(e){let t={};for(let n of Is){let r=e?.[n],i=r?.max??Ls[n];t[n]={current:Bs(r?.current??i,0,i),accumulated:0,max:i}}return t}function Bs(e,t,n){return Math.max(t,Math.min(n,e))}function Z(e,t){t>0?(e.current=Bs(e.current+t,0,e.max),e.accumulated+=t):e.current=Bs(e.current+t,0,e.max)}function Vs(e,t){let n=[],r=!1;for(let i of t){let t=e.resources[i.resource];Z(t,i.delta),t.current<=0&&(i.resource===`health`?(r=!0,n.push(`生命耗尽，你倒在了迷雾之中。`)):n.push(`${Rs[i.resource]}耗尽了。`))}return{dead:r,messages:n}}function Hs(e){let t=[],n=e.resources.food,r=e.resources.water;return n.current<=0&&(Z(e.resources.health,-5),t.push(`没有食物，饥饿侵蚀着你的身体（生命-5）。`)),r.current<=0&&(Z(e.resources.health,-8),t.push(`没有水，干渴让你痛苦不堪（生命-8）。`)),t}var Us={food:10,water:8,sanity:3,energy:3};function Ws(e){let t=1.1**(e-1);return{food:Us.food*t,water:Us.water*t,sanity:Us.sanity*t,energy:Us.energy*t}}function Gs(e){let t=[],n=e.progression?.currentWorldTier??1,r=Ws(n),i=Cs[n-1]?.name??`T${n}`,a=e.skills?Math.min(.5,Math.max(0,$o(e).survival.resourceConsumptionReduction)):0,o={food:e.flags.talent_iron_stomach?.85:1,water:e.flags.talent_iron_stomach?.85:1,sanity:e.flags.talent_calm_mind?.7:1,energy:e.flags.talent_night_runner?.75:1},s=n=>{let s=r[n]*o[n]*(1-a);Z(e.resources[n],-s),t.push(`${Rs[n]}-${Math.round(s)}（${i}级压力）`)};return s(`food`),s(`water`),s(`sanity`),s(`energy`),t}function Ks(e,t,n=0){let r=Math.floor(e()*100)+1,i=Math.max(1,Math.min(100,r+n)),a=i>=100-t,o;return o=a?i>=95?`crit_success`:`success`:i<=10?`crit_fail`:`fail`,{roll:i,tier:o,success:a}}var qs=class{state;constructor(e){this.state=e??Math.random()*2**32>>>0}next(){let e=this.state+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}int(e,t){return Math.floor(this.next()*(t-e+1))+e}weighted(e,t){if(e.length===0)return null;let n=e.reduce((e,n)=>e+Math.max(0,t(n)),0);if(n<=0)return null;let r=this.next()*n;for(let n of e)if(r-=Math.max(0,t(n)),r<=0)return n;return e[e.length-1]}},Js=[{id:`scavenge_master`,name:`搜刮大师`,tier:`S`,description:`你对物资的嗅觉近乎超自然：开局食物+40、水+30，幸运+5。`,apply:e=>(e.resources.food.current=Math.min(e.resources.food.max,e.resources.food.current+40),e.resources.water.current=Math.min(e.resources.water.max,e.resources.water.current+30),e.attributes.luck+=5,[`搜刮大师生效：开局物资与幸运大幅提升。`])},{id:`item_boost`,name:`强化万物`,tier:`S`,description:`你触碰过的物品都在悄悄变强：物品熟练度获取速度翻倍。`,apply:e=>(e.flags.talent_item_xp_boost=!0,[`强化万物生效：物品每次使用获得双倍熟练度。`])},{id:`fog_prophet`,name:`雾中先知`,tier:`S`,description:`雾对你低语真相：智力+4，开局获得研究资料与神秘结晶各1。`,apply:e=>(e.attributes.intelligence+=4,e.inventory.research_data=(e.inventory.research_data??0)+1,e.inventory.mysterious_crystal=(e.inventory.mysterious_crystal??0)+1,[`雾中先知生效：智力提升，背包多了两件来历不明的东西。`])},{id:`iron_stomach`,name:`铁胃`,tier:`A`,description:`你吃什么都顶饱：食物与水的每日消耗降低15%。`,apply:e=>(e.flags.talent_iron_stomach=!0,[`铁胃生效：每日食物与水消耗降低15%。`])},{id:`calm_mind`,name:`心如止水`,tier:`A`,description:`恐惧无法撼动你：理智每日消耗降低30%，开局理智+10。`,apply:e=>(e.flags.talent_calm_mind=!0,e.resources.sanity.current=Math.min(e.resources.sanity.max,e.resources.sanity.current+10),[`心如止水生效：理智更耐消耗。`])},{id:`craftsman`,name:`工匠之手`,tier:`A`,description:`你是天生的 builder：开局获得木矛×1、木材×25、石材×10。`,apply:e=>(e.inventory.wooden_spear=(e.inventory.wooden_spear??0)+1,e.inventory.wood=(e.inventory.wood??0)+25,e.inventory.stone=(e.inventory.stone??0)+10,[`工匠之手生效：开局自带一套基础工具和建材。`])},{id:`strong_body`,name:`强健体魄`,tier:`A`,description:`末日磨不掉你的筋骨：生命上限+20，力量+3。`,apply:e=>(e.resources.health.max+=20,e.resources.health.current+=20,e.attributes.strength+=3,[`强健体魄生效：生命上限提升至`+e.resources.health.max+`。`])},{id:`lucky_star`,name:`幸运星`,tier:`B`,description:`命运偶尔偏心：幸运+5。`,apply:e=>(e.attributes.luck+=5,[`幸运星生效：幸运+5。`])},{id:`night_runner`,name:`夜行者`,tier:`B`,description:`你在黑暗中如鱼得水：体力每日消耗降低25%。`,apply:e=>(e.flags.talent_night_runner=!0,[`夜行者生效：每日体力消耗降低25%。`])}];function Ys(e){let t=[...Js],n=[];for(;n.length<3&&t.length>0;){let r=t.map(e=>e.tier===`S`?1:e.tier===`A`?2:3),i=r.reduce((e,t)=>e+t,0),a=e.next()*i,o=0;for(;o<t.length&&(a-=r[o],!(a<=0));o++);o>=t.length&&(o=t.length-1),n.push(t[o]),t.splice(o,1)}return n}function Xs(e,t){if(e.flags.talent_chosen)return[];let n=Js.find(e=>e.id===t);if(!n)return[];e.flags.talent_chosen=!0;let r=n.apply(e);return[`【天赋觉醒·${n.tier}级】${n.name}：${n.description}`,...r]}var Zs=[`隔壁老王`,`雾都小白`,`独狼阿杰`,`囤货狂魔`,`种田老陈`,`夜猫子琳`,`铁壁大叔`,`捡漏达人`,`山间隐士`,`渔夫老赵`,`修道者云`,`枪械师凯`,`医生苏`,`鼠王之影`,`机械师诺`,`拾荒少女`,`猎人老周`,`诗人阿盲`];function Qs(e){let t=Math.max(0,e.day-1),n=Math.floor(t*.6),r=81-((e.base?.level??1)*10+Math.max(0,(e.progression?.currentWorldTier??1)-1)*15+Math.floor((e.attributes?.luck??0)/2)+Math.min(15,Object.keys(e.inventory??{}).length)+bs(e))+n;return Math.min(162,Math.max(1,r))}function $s(e){if(e.day%3!=0)return null;let t=Qs(e),n=t-2,r=Zs[Math.abs(n)%Zs.length];return t<=3?`【排行榜】你已杀入前三！当前排名 #${t} / 162。雾海之上，所有人都在看你的直播。`:`【排行榜】当前排名 #${t} / 162。你前面是「${r}」，他昨天刚升了 2 级基地。`}var ec={1:{text:`木材×10`,apply:e=>{e.inventory.wood=(e.inventory.wood??0)+10}},2:{text:`食物×8`,apply:e=>{e.inventory.food=(e.inventory.food??0)+8}},3:{text:`水×8、理智+5`,apply:e=>{e.inventory.water=(e.inventory.water??0)+8,Z(e.resources.sanity,5)}},4:{text:`石材×8`,apply:e=>{e.inventory.stone=(e.inventory.stone??0)+8}},5:{text:`金属×5`,apply:e=>{e.inventory.metal=(e.inventory.metal??0)+5}},6:{text:`理智+8、体力+8`,apply:e=>{Z(e.resources.sanity,8),Z(e.resources.energy,8)}},0:{text:`周大奖：木矛×1、食物×15`,apply:e=>{e.inventory.wooden_spear=(e.inventory.wooden_spear??0)+1,e.inventory.food=(e.inventory.food??0)+15}}};function tc(e){e.runStats.signinStreak=(e.runStats.signinStreak??0)+1;let t=e.runStats.signinStreak,n=ec[t%7];return n.apply(e),`【签到】连续签到第 ${t} 天：获得 ${n.text}。`}var nc={wild_dog:{id:`wild_dog`,name:`野狗`,description:`被迷雾感染的变异野狗，眼中闪烁着红光`,level:1,hp:30,attack:15,defense:5,agility:20,lootTable:[{itemId:`mutant_fang`,minCount:1,maxCount:2,dropChance:.6},{itemId:`dog_meat`,minCount:1,maxCount:3,dropChance:.8},{itemId:`fur`,minCount:1,maxCount:2,dropChance:.5}],xpReward:20},mutated_rat:{id:`mutated_rat`,name:`变异鼠`,description:`体型如猫般大小的老鼠，携带致命病菌`,level:1,hp:20,attack:10,defense:3,agility:30,lootTable:[{itemId:`rat_tail`,minCount:1,maxCount:1,dropChance:.7},{itemId:`herb`,minCount:1,maxCount:2,dropChance:.4}],xpReward:15},shadow_wolf:{id:`shadow_wolf`,name:`影狼`,description:`能在迷雾中隐身的狼型怪物，行动迅捷`,level:3,hp:60,attack:25,defense:12,agility:35,lootTable:[{itemId:`shadow_claw`,minCount:1,maxCount:2,dropChance:.5,isRare:!0},{itemId:`wolf_pelt`,minCount:1,maxCount:2,dropChance:.7},{itemId:`meat`,minCount:2,maxCount:4,dropChance:.9}],xpReward:50,specialAbilities:[`stealth_attack`]},rock_golem:{id:`rock_golem`,name:`岩石傀儡`,description:`由岩石和迷雾凝聚而成的元素生物`,level:4,hp:120,attack:30,defense:25,agility:5,lootTable:[{itemId:`stone_core`,minCount:1,maxCount:1,dropChance:.4,isRare:!0},{itemId:`stone`,minCount:10,maxCount:20,dropChance:1},{itemId:`metal`,minCount:3,maxCount:8,dropChance:.6}],xpReward:80},fog_stalker:{id:`fog_stalker`,name:`迷雾追踪者`,description:`迷雾中的顶级掠食者，拥有智慧`,level:6,hp:150,attack:45,defense:20,agility:40,lootTable:[{itemId:`fog_essence`,minCount:1,maxCount:2,dropChance:.3,isRare:!0},{itemId:`crystal_shard`,minCount:1,maxCount:3,dropChance:.5},{itemId:`advanced_blueprint`,minCount:1,maxCount:1,dropChance:.2,isRare:!0}],xpReward:150,specialAbilities:[`fog_manipulation`,`pack_tactics`]},beast_king:{id:`beast_king`,name:`兽王`,description:`统领所有变异野兽的王者，体型如山`,level:10,hp:500,attack:80,defense:40,agility:25,lootTable:[{itemId:`beast_king_core`,minCount:1,maxCount:1,dropChance:1,isRare:!0},{itemId:`legendary_material`,minCount:3,maxCount:5,dropChance:.8},{itemId:`ancient_blueprint`,minCount:1,maxCount:1,dropChance:.5,isRare:!0}],xpReward:500,specialAbilities:[`roar`,`charge`,`summon_minions`]}};function rc(e,t){let n=nc[t];if(!n)throw Error(`Unknown monster: ${t}`);return{enemyId:t,enemyHp:n.hp,enemyMaxHp:n.hp,round:1,log:[`遭遇${n.name}！战斗开始！`]}}function ic(e,t,n,r){let i=nc[t.enemyId],a=[],o=$o(e),s=0;if(e.equipment&&e.equipment.weapon){let t=Y[e.equipment.weapon];t&&t.attack&&(s=t.attack)}let c=(e.attributes.strength*1.2+s)*o.combat.damageMultiplier,l=e.attributes.agility*.5,u=o.combat.critChance,d=0,f=0;switch(n){case`attack`:if(Ks(()=>r.next(),50+e.attributes.agility-i.agility).success){let e=r.next()<u,n=c*(e?2:1),o=Math.max(1,Math.floor(n-i.defense*.5));t.enemyHp-=o,d=o,a.push(`你攻击了${i.name}，造成${o}点伤害${e?`（暴击！）`:``}`)}else a.push(`你的攻击被${i.name}闪避了！`);break;case`defend`:a.push(`你采取防御姿态，准备抵挡攻击`);break;case`flee`:if(Ks(()=>r.next(),40+e.attributes.agility).success)return a.push(`你成功逃脱了！`),{session:t,ended:!0,result:{victory:!1,playerHpRemaining:e.resources.health.current,damageDealt:0,damageTaken:0,loot:{},xpGained:0,log:a}};a.push(`逃跑失败！`);break;case`use_item`:a.push(`使用了道具（待实现）`)}if(t.enemyHp<=0){let n=oc(i,e.attributes.luck+o.special.luck||0,r),s=i.xpReward;for(let[t,r]of Object.entries(n))e.inventory[t]=(e.inventory[t]??0)+r;let c=Math.floor(s/100);c>0&&(Xo(e,c),a.push(`战斗经验转化为 ${c} 点技能点`)),e.runStats.kills=(e.runStats?.kills??0)+1;let l=e.economy;l&&(l.currency+=s,a.push(`获得 ${s} 积分`)),a.push(`击败了${i.name}！获得${s}XP`);for(let[e,t]of Object.entries(n))a.push(`获得 ${Y[e]?.name??e} ×${t}`);return e.combat=void 0,{session:t,ended:!0,result:{victory:!0,playerHpRemaining:e.resources.health.current,damageDealt:d,damageTaken:f,loot:n,xpGained:s,log:a}}}switch(ac(i,t,r)){case`attack`:if(Ks(()=>r.next(),50+i.agility-e.attributes.agility).success){let t=Math.max(1,Math.floor(i.attack-l));n===`defend`&&(t=Math.floor(t*.5)),e.resources.health.current-=t,f=t,a.push(`${i.name}攻击了你，造成${t}点伤害${n===`defend`?`（已格挡部分）`:``}`)}else a.push(`${i.name}的攻击被你闪避了！`);break;case`special`:if(i.specialAbilities&&i.specialAbilities.length>0){let t=i.specialAbilities[r.int(0,i.specialAbilities.length-1)];if(t===`stealth_attack`){let t=Math.max(1,Math.floor(i.attack*.5));e.resources.health.current=Math.max(0,e.resources.health.current-t),a.push(`${i.name}从雾影中突袭！无法格挡，造成${t}点伤害`)}else if(t===`charge`){let t=Math.max(1,Math.floor(i.attack*.7-l*.5));e.resources.health.current=Math.max(0,e.resources.health.current-t),a.push(`${i.name}蓄力冲撞，造成${t}点伤害`)}else if(t===`pack_tactics`){let t=Math.max(1,Math.floor(i.attack*.4));e.resources.health.current=Math.max(0,e.resources.health.current-t),a.push(`${i.name}的族群从两翼包抄，造成${t}点伤害`)}else t===`fog_manipulation`?(e.resources.sanity.current=Math.max(0,e.resources.sanity.current-6),a.push(`${i.name}搅动浓雾，低语钻进你的脑海（理智-6）`)):t===`roar`?(e.resources.sanity.current=Math.max(0,e.resources.sanity.current-5),a.push(`${i.name}发出震耳咆哮（理智-5）`)):(e.resources.sanity.current=Math.max(0,e.resources.sanity.current-4),a.push(`${i.name}使出了神秘能力（理智-4）`))}}return e.resources.health.current<=0?(a.push(`你被击败了...`),e.combat=void 0,{session:t,ended:!0,result:{victory:!1,playerHpRemaining:0,damageDealt:d,damageTaken:f,loot:{},xpGained:0,log:a}}):(t.round+=1,t.log.push(...a),{session:t,ended:!1})}function ac(e,t,n){return t.enemyHp/t.enemyMaxHp<.3&&e.specialAbilities&&n.next()<.4?`special`:`attack`}function oc(e,t,n){let r={};for(let i of e.lootTable){let e=Math.min(1,i.dropChance*(1+t*.05));if(n.next()<e){let e=n.int(i.minCount,i.maxCount);r[i.itemId]=(r[i.itemId]??0)+e}}return r}function sc(e){return e<=7?[nc.wild_dog,nc.mutated_rat]:e<=20?[nc.shadow_wolf,nc.rock_golem]:e<=40?[nc.fog_stalker]:[nc.beast_king]}function cc(e,t){if(e.combat)return null;let n=e.day??1;if(n<3)return null;let r=e.progression?.currentWorldTier??1,i=Cs[r-1]?.difficultyMultiplier??1,a=Math.min(.6,(.15+r*.05)*Math.sqrt(i));if(t.next()>=a)return null;let o=sc(n).filter(e=>!!e);if(!o.length)return null;let s=o[t.int(0,o.length-1)];return e.combat=rc(e,s.id),`【遭遇】一头${s.name}从雾里扑了出来！战斗开始。`}var lc=[{id:`first_talent`,name:`天赋觉醒`,desc:`完成第一次开局天赋选择`,check:e=>!!e.flags.talent_chosen},{id:`survivor_7`,name:`迷雾七日`,desc:`存活到第 7 天`,check:e=>e.day>=7},{id:`survivor_30`,name:`雾海一月`,desc:`存活到第 30 天`,check:e=>e.day>=30},{id:`survivor_60`,name:`雾海老兵`,desc:`存活到第 60 天`,check:e=>e.day>=60},{id:`base_3`,name:`山谷堡垒`,desc:`基地达到 3 级`,check:e=>(e.base?.level??0)>=3},{id:`spec_first`,name:`专精之路`,desc:`完成技能专精选择`,check:e=>!!e.skills?.specialization},{id:`item_lv3`,name:`大师之作`,desc:`任一物品熟练度达到 Lv.3`,check:e=>Object.values(e.itemLevels??{}).some(e=>e.level>=3)},{id:`first_kill`,name:`初次见血`,desc:`击杀第一只迷雾野兽`,check:e=>(e.runStats?.kills??0)>=1},{id:`kills_20`,name:`雾海猎王`,desc:`累计击杀 20 只野兽`,check:e=>(e.runStats?.kills??0)>=20},{id:`rank_10`,name:`崭露头角`,desc:`幸存者排行榜进入前十`,check:e=>Qs(e)<=10},{id:`first_ending`,name:`结局收藏家`,desc:`解锁第一个结局`,check:e=>(e.meta?.unlockedEndings?.length??0)>=1},{id:`truth_seeker`,name:`真相窥视者`,desc:`抄录古代石碑的碑文`,check:e=>!!e.flags.ruins_truth_1}];function uc(e){e.meta.unlockedAchievements||(e.meta.unlockedAchievements=[]);let t=new Set(e.meta.unlockedAchievements),n=[];for(let r of lc)t.has(r.id)||r.check(e)&&(e.meta.unlockedAchievements.push(r.id),n.push(r));return n}var dc=[{id:1,name:`独居期`,dayRange:[1,7],scale:`1人`,theme:`茫然、恐惧、基础生存`,description:`你独自在迷雾中醒来，一切都是未知。找到食物、水和庇护所是当务之急。迷雾中似乎有什么东西在窥视着你。`,coreGoal:`建立庇护所，活过第一次兽潮`,resourceConsumptionMultiplier:1,monsterStrengthMultiplier:.8,eventRateMultiplier:.7,npcInteractionRate:.1,unlocks:[`基础行动`,`基础物品`,`序章剧情`,`每日面板`,`隐藏提示`],majorEvent:{day:7,name:`第一次兽潮`,description:`第七天夜里，迷雾中的野兽被某种力量驱使，向你的庇护所发起冲锋。这是你第一次面对真正的生死考验。`,difficultyThresholds:[{level:`easy`,name:`有备无患`,description:`你有武器、有防御、体力充沛，兽潮不过是一场狩猎。`,conditions:{minStrength:12,hasWeapon:!0,baseLevel:1},outcome:{survivalChance:.95,rewardMultiplier:1.5,penaltyDescription:`无`}},{level:`normal`,name:`艰难防守`,description:`你有基本准备，但兽潮的规模超出预期，需要拼命才能活下来。`,conditions:{minStrength:8,hasWeapon:!0},outcome:{survivalChance:.7,rewardMultiplier:1,penaltyDescription:`受伤，损失部分资源`}},{level:`hard`,name:`生死一线`,description:`你几乎没有准备，只能靠运气和本能求生。每一秒都可能是最后一秒。`,conditions:{minStrength:5},outcome:{survivalChance:.35,rewardMultiplier:.5,penaltyDescription:`重伤，庇护所被毁，失去大量资源`}},{level:`deadly`,name:`无力回天`,description:`你手无寸铁，身虚体弱，兽潮面前你不过是一块肉。`,conditions:{},outcome:{survivalChance:.05,rewardMultiplier:0,penaltyDescription:`死亡概率极高`}}]},transitionCondition:{type:`survive`,description:`存活过第一次兽潮`}},{id:2,name:`互助组`,dayRange:[8,14],scale:`2-3人`,theme:`警惕、试探、信任建立`,description:`你遇到了其他幸存者。在这个迷雾世界里，人既是最大的依靠，也是最大的危险。信任还是背叛？合作还是独行？`,coreGoal:`建立可信的小团体，通过第一次团体危机`,resourceConsumptionMultiplier:1.1,monsterStrengthMultiplier:1,eventRateMultiplier:1,npcInteractionRate:.5,unlocks:[`同伴系统`,`交易系统`,`NPC个人剧情`,`老K线`,`朵朵线`],majorEvent:{day:14,name:`团体危机`,description:`物资短缺、外部威胁、内部矛盾同时爆发。你的团体是分崩离析，还是浴火重生？`,difficultyThresholds:[{level:`easy`,name:`众志成城`,description:`团体信任度高，物资充足，外部威胁被轻松化解。`,conditions:{allyCount:2,resourceStockpile:50},outcome:{survivalChance:.9,rewardMultiplier:1.5,penaltyDescription:`无，团体凝聚力提升`}},{level:`normal`,name:`有惊无险`,description:`虽然有矛盾和损失，但团体挺了过来。`,conditions:{allyCount:1},outcome:{survivalChance:.7,rewardMultiplier:1,penaltyDescription:`可能失去一名同伴`}},{level:`hard`,name:`分崩离析`,description:`内部矛盾爆发，外部威胁压境，团体摇摇欲坠。`,conditions:{},outcome:{survivalChance:.4,rewardMultiplier:.5,penaltyDescription:`团体解散，失去同伴和资源`}},{level:`deadly`,name:`众叛亲离`,description:`你被同伴背叛，陷入绝境。`,conditions:{},outcome:{survivalChance:.1,rewardMultiplier:0,penaltyDescription:`被背叛，重伤，失去一切`}}]},transitionCondition:{type:`survive`,description:`团体存活并保持凝聚力`}},{id:3,name:`小队`,dayRange:[15,21],scale:`5-10人`,theme:`分工、训练、防御建设`,description:`你的团体开始壮大。职业分化、训练体系、防御工事——你不再是一群乌合之众，而是一支有组织的小队。`,coreGoal:`建立职业分工和防御体系，击退精英怪物`,resourceConsumptionMultiplier:1.15,monsterStrengthMultiplier:1.1,eventRateMultiplier:1.1,npcInteractionRate:.6,unlocks:[`职业系统`,`技能树`,`装备强化`,`基地建设`,`医生线`],majorEvent:{day:21,name:`精英怪物袭击`,description:`一只从未见过的精英怪物出现在基地附近。它比你遇到的任何野兽都强大、狡猾。这是对你的小队战斗力的真正检验。`,difficultyThresholds:[{level:`easy`,name:`围猎成功`,description:`小队配合默契，战术得当，精英怪物成为战利品。`,conditions:{minStrength:15,allyCount:3,hasWeapon:!0},outcome:{survivalChance:.9,rewardMultiplier:2,penaltyDescription:`无，获得稀有材料`}},{level:`normal`,name:`惨胜`,description:`付出了代价，但最终击杀了怪物。`,conditions:{minStrength:12,allyCount:2},outcome:{survivalChance:.65,rewardMultiplier:1,penaltyDescription:`1-2人重伤，消耗大量资源`}},{level:`hard`,name:`溃败`,description:`小队无法对抗精英怪物，只能撤退。`,conditions:{minStrength:8},outcome:{survivalChance:.4,rewardMultiplier:.3,penaltyDescription:`基地受损，人员伤亡`}},{level:`deadly`,name:`屠杀`,description:`精英怪物如入无人之境，你的小队不堪一击。`,conditions:{},outcome:{survivalChance:.1,rewardMultiplier:0,penaltyDescription:`小队覆灭，大量死亡`}}]},transitionCondition:{type:`combat`,description:`击杀或击退精英怪物`}},{id:4,name:`车队`,dayRange:[22,30],scale:`10-20人`,theme:`机动、掠夺、遭遇`,description:`你找到了载具，小队变成了车队。机动性带来了更多资源和机会，也让你遭遇了其他车队。迷雾中的道路，弱肉强食。`,coreGoal:`建立机动能力，在与其他车队的遭遇中存活`,resourceConsumptionMultiplier:1.2,monsterStrengthMultiplier:1.2,eventRateMultiplier:1.2,npcInteractionRate:.7,unlocks:[`载具系统`,`车队管理`,`遭遇战`,`贸易路线`,`军方残部线`],majorEvent:{day:30,name:`车队遭遇战`,description:`你在迷雾中的公路上遭遇了另一支车队。他们人数更多，装备更好。谈判、战斗、还是逃跑？你的决定将决定整个车队的命运。`,difficultyThresholds:[{level:`easy`,name:`强势谈判`,description:`你的实力让对方不敢轻举妄动，最终达成有利的交易。`,conditions:{minStrength:18,allyCount:5,resourceStockpile:100},outcome:{survivalChance:.95,rewardMultiplier:2,penaltyDescription:`无，获得大量资源和情报`}},{level:`normal`,name:`势均力敌`,description:`双方都有顾虑，最终达成脆弱的和平。`,conditions:{minStrength:14,allyCount:3},outcome:{survivalChance:.7,rewardMultiplier:1,penaltyDescription:`付出部分资源换取和平`}},{level:`hard`,name:`血战突围`,description:`谈判破裂，你必须战斗才能活下去。`,conditions:{minStrength:10},outcome:{survivalChance:.4,rewardMultiplier:.5,penaltyDescription:`大量伤亡，载具受损`}},{level:`deadly`,name:`被吞并`,description:`你的车队不堪一击，被对方吞并或消灭。`,conditions:{},outcome:{survivalChance:.1,rewardMultiplier:0,penaltyDescription:`车队覆灭，被俘或死亡`}}]},transitionCondition:{type:`diplomacy`,description:`在遭遇战中存活并保持独立性`}},{id:5,name:`据点`,dayRange:[31,45],scale:`20-50人`,theme:`固定、产业、防御`,description:`你找到了一个易守难攻的地点，建立了固定据点。城墙、农田、工坊——你开始重建文明的雏形。但树大招风，更大的威胁正在逼近。`,coreGoal:`建立完善的据点防御和产业，抵御大型兽潮`,resourceConsumptionMultiplier:1.25,monsterStrengthMultiplier:1.3,eventRateMultiplier:1.3,npcInteractionRate:.8,unlocks:[`据点建设`,`产业系统`,`农业生产`,`工坊制造`,`城墙防御`,`神秘组织线`],majorEvent:{day:45,name:`大型兽潮`,description:`迷雾深处传来低沉的咆哮。前所未有的兽潮正在向你的据点涌来。这不是几十只野兽，而是成百上千只。你的城墙能守住吗？`,difficultyThresholds:[{level:`easy`,name:`固若金汤`,description:`你的防御工事完善，守军训练有素，兽潮不过是送材料。`,conditions:{baseLevel:3,allyCount:10,minStrength:20},outcome:{survivalChance:.95,rewardMultiplier:2.5,penaltyDescription:`无，获得大量晶核和材料`}},{level:`normal`,name:`艰苦守城`,description:`兽潮的规模超出预期，但你的守军拼死抵抗。`,conditions:{baseLevel:2,allyCount:6},outcome:{survivalChance:.65,rewardMultiplier:1,penaltyDescription:`城墙受损，人员伤亡，消耗大量资源`}},{level:`hard`,name:`城破人亡`,description:`城墙被攻破，你只能巷战求生。`,conditions:{baseLevel:1},outcome:{survivalChance:.35,rewardMultiplier:.3,penaltyDescription:`据点被毁，大量人员死亡`}},{level:`deadly`,name:`人间地狱`,description:`兽潮如潮水般涌入，你的据点不堪一击。`,conditions:{},outcome:{survivalChance:.05,rewardMultiplier:0,penaltyDescription:`据点覆灭，几乎无人生还`}}]},transitionCondition:{type:`survive`,description:`守住据点，击退大型兽潮`}},{id:6,name:`基地`,dayRange:[46,65],scale:`50-200人`,theme:`制度、军工、势力`,description:`你的据点发展成了基地。军规、生产、贸易、训练——你建立了一套完整的制度。但其他势力也在崛起，迷雾中的地盘就这么大，战争不可避免。`,coreGoal:`建立完善的基地制度和军工生产，赢得势力战争`,resourceConsumptionMultiplier:1.3,monsterStrengthMultiplier:1.4,eventRateMultiplier:1.4,npcInteractionRate:.9,unlocks:[`军事制度`,`军工生产`,`贸易网络`,`外交系统`,`情报系统`,`觉醒者线`],majorEvent:{day:65,name:`势力战争`,description:`邻近的势力向你宣战。这不是小团体的冲突，而是两支军队的对决。战术、后勤、士气——每一个环节都可能决定胜负。`,difficultyThresholds:[{level:`easy`,name:`横扫千军`,description:`你的军队训练有素，装备精良，战术得当，敌军不堪一击。`,conditions:{baseLevel:4,allyCount:30,minStrength:25},outcome:{survivalChance:.95,rewardMultiplier:3,penaltyDescription:`无，吞并敌方势力，获得大量资源和人口`}},{level:`normal`,name:`惨胜`,description:`双方都付出了惨重代价，但你最终赢得了战争。`,conditions:{baseLevel:3,allyCount:15},outcome:{survivalChance:.65,rewardMultiplier:1.5,penaltyDescription:`大量伤亡，资源消耗巨大`}},{level:`hard`,name:`战败`,description:`你的军队被击败，基地沦陷。`,conditions:{baseLevel:2},outcome:{survivalChance:.3,rewardMultiplier:.3,penaltyDescription:`基地被占领，大量人员被俘或死亡`}},{level:`deadly`,name:`灭顶之灾`,description:`你的势力被彻底消灭，无人生还。`,conditions:{},outcome:{survivalChance:.05,rewardMultiplier:0,penaltyDescription:`势力覆灭，全部死亡`}}]},transitionCondition:{type:`combat`,description:`赢得势力战争，吞并或击败敌方`}},{id:7,name:`城镇`,dayRange:[66,90],scale:`200-500人`,theme:`贸易、文化、重建`,description:`你的基地发展成了城镇。市场、学校、医院、剧场——文明正在废墟上重生。但繁荣背后是暗流涌动，内部的矛盾和外部的威胁同时发酵。`,coreGoal:`建立繁荣的城镇，平息内部叛乱`,resourceConsumptionMultiplier:1.35,monsterStrengthMultiplier:1.5,eventRateMultiplier:1.5,npcInteractionRate:1,unlocks:[`城镇管理`,`文化建设`,`教育系统`,`宗教系统`,`贵族系统`,`真相线深入`],majorEvent:{day:90,name:`内部叛乱`,description:`城镇中的反对派发动了叛乱。他们可能是被压迫的平民、野心勃勃的军官、或是被外部势力收买的内奸。你的城镇是浴火重生，还是分崩离析？`,difficultyThresholds:[{level:`easy`,name:`民心所向`,description:`你的统治深得民心，叛乱不得人心，迅速被平息。`,conditions:{minIntelligence:25,allyCount:50,resourceStockpile:300},outcome:{survivalChance:.95,rewardMultiplier:2,penaltyDescription:`无，城镇凝聚力提升，获得叛乱者的资源`}},{level:`normal`,name:`艰难平叛`,description:`叛乱持续了一段时间，但你最终控制了局面。`,conditions:{minIntelligence:18,allyCount:25},outcome:{survivalChance:.65,rewardMultiplier:1,penaltyDescription:`城镇受损，部分人员死亡，经济衰退`}},{level:`hard`,name:`城镇分裂`,description:`叛乱无法平息，城镇分裂成两派，内战爆发。`,conditions:{minIntelligence:12},outcome:{survivalChance:.35,rewardMultiplier:.3,penaltyDescription:`城镇分裂，大量人员死亡，经济崩溃`}},{level:`deadly`,name:`众叛亲离`,description:`你被所有人抛弃，叛乱者占领了城镇。`,conditions:{},outcome:{survivalChance:.1,rewardMultiplier:0,penaltyDescription:`被推翻，被俘或死亡`}}]},transitionCondition:{type:`diplomacy`,description:`平息叛乱，保持城镇统一`}},{id:8,name:`联盟`,dayRange:[91,120],scale:`500-2000人`,theme:`外交、联盟、博弈`,description:`你的城镇与其他势力结盟，形成了联盟。外交、间谍、暗杀、联姻——联盟内部的博弈比外部战争更复杂。迷雾中的格局正在重新洗牌。`,coreGoal:`建立强大的联盟，赢得联盟战争`,resourceConsumptionMultiplier:1.4,monsterStrengthMultiplier:1.6,eventRateMultiplier:1.6,npcInteractionRate:1,unlocks:[`联盟外交`,`间谍系统`,`联姻系统`,`联合军事`,`跨区域贸易`,`迷雾真相核心`],majorEvent:{day:120,name:`联盟战争`,description:`两大联盟的决战爆发了。这是迷雾世界有史以来最大规模的战争。数千人在迷雾中厮杀，你的每一个决策都可能改变战局。`,difficultyThresholds:[{level:`easy`,name:`联盟霸主`,description:`你的联盟实力强大，战术得当，敌方联盟迅速崩溃。`,conditions:{minIntelligence:30,allyCount:100,resourceStockpile:500},outcome:{survivalChance:.95,rewardMultiplier:3,penaltyDescription:`无，成为联盟霸主，获得大量资源和领土`}},{level:`normal`,name:`惨胜`,description:`战争异常惨烈，但你的联盟最终赢得了胜利。`,conditions:{minIntelligence:22,allyCount:50},outcome:{survivalChance:.6,rewardMultiplier:1.5,penaltyDescription:`大量伤亡，资源消耗巨大，联盟内部矛盾加剧`}},{level:`hard`,name:`战败`,description:`你的联盟被击败，成员纷纷倒戈。`,conditions:{minIntelligence:15},outcome:{survivalChance:.3,rewardMultiplier:.3,penaltyDescription:`联盟瓦解，大量人员死亡，领土被占领`}},{level:`deadly`,name:`全军覆没`,description:`你的联盟被彻底消灭，无人生还。`,conditions:{},outcome:{survivalChance:.05,rewardMultiplier:0,penaltyDescription:`联盟覆灭，全部死亡`}}]},transitionCondition:{type:`combat`,description:`赢得联盟战争，成为霸主`}},{id:9,name:`战区`,dayRange:[121,150],scale:`2000-10000人`,theme:`军事、战略、决战`,description:`你的联盟发展成了战区军事组织。正规军、参谋部、后勤体系、战略规划——你已经是迷雾世界最强大的势力之一。但迷雾的真相正在浮出水面，最终的威胁正在逼近。`,coreGoal:`建立强大的军事力量，击败最终BOSS`,resourceConsumptionMultiplier:1.45,monsterStrengthMultiplier:1.8,eventRateMultiplier:1.7,npcInteractionRate:1,unlocks:[`正规军编制`,`参谋部`,`战略规划`,`重型武器`,`超凡者部队`,`迷雾源头线索`],majorEvent:{day:150,name:`最终BOSS`,description:`迷雾的源头出现了——一个超越人类理解的存在。它是迷雾的创造者，还是迷雾的化身？这是人类与迷雾的最终决战。`,difficultyThresholds:[{level:`easy`,name:`人类之光`,description:`你的军队强大，超凡者众多，你找到了BOSS的弱点，最终将其击败。`,conditions:{minStrength:35,minIntelligence:35,allyCount:200,specialItem:`mist_core`},outcome:{survivalChance:.9,rewardMultiplier:5,penaltyDescription:`无，迷雾开始消散，人类看到了希望`}},{level:`normal`,name:`惨胜`,description:`你付出了巨大的代价，但最终击败了BOSS。`,conditions:{minStrength:25,minIntelligence:25,allyCount:100},outcome:{survivalChance:.5,rewardMultiplier:2,penaltyDescription:`大量伤亡，包括核心成员，迷雾部分消散`}},{level:`hard`,name:`溃败`,description:`BOSS的力量超出想象，你的军队无法对抗。`,conditions:{minStrength:18},outcome:{survivalChance:.2,rewardMultiplier:.5,penaltyDescription:`军队覆灭，大量死亡，迷雾加剧`}},{level:`deadly`,name:`人类末日`,description:`BOSS轻易摧毁了你的军队，人类的希望破灭。`,conditions:{},outcome:{survivalChance:.02,rewardMultiplier:0,penaltyDescription:`全军覆没，人类文明终结`}}]},transitionCondition:{type:`special`,description:`击败最终BOSS，或找到其他解决方案`}},{id:10,name:`联邦`,dayRange:[151,200],scale:`10000+人`,theme:`文明、重建、世界命运`,description:`迷雾开始消散，你领导建立了人类联邦。重建文明、恢复秩序、探索未知——但迷雾的遗产仍在，新的威胁和机遇并存。人类的未来，在你手中。`,coreGoal:`重建人类文明，决定世界的最终命运`,resourceConsumptionMultiplier:1.5,monsterStrengthMultiplier:2,eventRateMultiplier:1.8,npcInteractionRate:1,unlocks:[`联邦政府`,`文明重建`,`科技恢复`,`探索未知`,`多结局分支`],majorEvent:{day:200,name:`世界命运`,description:`迷雾完全消散了。但世界已经改变。你是建立一个新的文明，还是成为新的独裁者？是恢复旧世界的科技，还是走出一条新的道路？人类的命运，在你手中。`,difficultyThresholds:[{level:`easy`,name:`文明领袖`,description:`你领导人类重建了文明，建立了公正繁荣的联邦。`,conditions:{minIntelligence:40,minLuck:20,resourceStockpile:1e3},outcome:{survivalChance:1,rewardMultiplier:10,penaltyDescription:`无，好结局：文明重生`}},{level:`normal`,name:`艰难重建`,description:`虽然困难重重，但你最终建立了稳定的联邦。`,conditions:{minIntelligence:30,allyCount:300},outcome:{survivalChance:.8,rewardMultiplier:3,penaltyDescription:`部分地区仍不稳定，发展缓慢`}},{level:`hard`,name:`动荡不安`,description:`联邦内部矛盾重重，外部威胁不断，你勉强维持着统一。`,conditions:{minIntelligence:20},outcome:{survivalChance:.5,rewardMultiplier:1,penaltyDescription:`联邦动荡，随时可能分裂`}},{level:`deadly`,name:`文明崩溃`,description:`联邦分崩离析，人类再次陷入混乱。`,conditions:{},outcome:{survivalChance:.2,rewardMultiplier:0,penaltyDescription:`联邦崩溃，人类文明再次陷入黑暗`}}]},transitionCondition:{type:`special`,description:`完成游戏，进入多结局`}}];function fc(e){for(let t of dc)if(e>=t.dayRange[0]&&e<=t.dayRange[1])return t;return dc[dc.length-1]}var pc={thin:{name:`稀薄`,visibility:50,sanityDrainPerHour:.1,monsterSpawnRate:.1,specialEventChance:.05},normal:{name:`正常`,visibility:20,sanityDrainPerHour:.3,monsterSpawnRate:.2,specialEventChance:.1},thick:{name:`浓厚`,visibility:8,sanityDrainPerHour:.6,monsterSpawnRate:.4,specialEventChance:.2},impenetrable:{name:`伸手不见五指`,visibility:2,sanityDrainPerHour:1.2,monsterSpawnRate:.7,specialEventChance:.4}};function mc(e,t){let n=fc(e),r=t(),i=.05+n.id*.02,a=e%7==0?.3:.02,o=.03+n.id*.01;return r<a?`bloody_moon`:r<a+o?`mist_tide`:r<a+o+i?`stormy`:r<a+o+i+.2?`rainy`:r<a+o+i+.2+.5?`foggy`:`clear`}function hc(e,t){let n=fc(e),r=`normal`;if(r=n.id<=2?`thin`:n.id<=5?`normal`:n.id<=8?`thick`:`impenetrable`,t===`clear`){if(r===`impenetrable`)return`thick`;if(r===`thick`)return`normal`;if(r===`normal`)return`thin`}if(t===`stormy`||t===`bloody_moon`||t===`mist_tide`){if(r===`thin`)return`normal`;if(r===`normal`)return`thick`;if(r===`thick`)return`impenetrable`}return r}function gc(e,t,n){let r=fc(e).id*.5;return r+=pc[t].sanityDrainPerHour*2,n===`bloody_moon`&&(r+=3),n===`stormy`&&(r+=1.5),n===`mist_tide`&&(r+=2),r<2?`safe`:r<4?`low`:r<6?`moderate`:r<8?`high`:`extreme`}var _c=[{id:`safe_house`,name:`庇护所`,type:`safe`,description:`你建立的庇护所，相对安全。可以休息、制作、存储物资。`,unlockDay:1,effects:{sanityDrainMultiplier:.3,monsterSpawnRate:.05,resourceGatherMultiplier:0,specialEventChance:.02},lootTable:[],dangerLevel:`safe`},{id:`nearby_ruins`,name:`附近废墟`,type:`normal`,description:`庇护所附近的废弃建筑，可能找到一些基础物资。`,unlockDay:1,effects:{sanityDrainMultiplier:.8,monsterSpawnRate:.15,resourceGatherMultiplier:1,specialEventChance:.1},lootTable:[`food`,`water`,`wood`,`cloth`,`metal_scrap`],dangerLevel:`low`},{id:`deep_ruins`,name:`深入废墟`,type:`dangerous`,description:`更远的废墟区域，物资更丰富，但危险也更大。`,unlockDay:3,effects:{sanityDrainMultiplier:1.2,monsterSpawnRate:.35,resourceGatherMultiplier:1.5,specialEventChance:.2},lootTable:[`food`,`water`,`metal`,`weapon_parts`,`medicine`,`radio_parts`],dangerLevel:`moderate`},{id:`forest_edge`,name:`森林边缘`,type:`resource`,description:`迷雾森林的边缘，可以采集木材、草药，偶尔能猎到小动物。`,unlockDay:2,effects:{sanityDrainMultiplier:1,monsterSpawnRate:.25,resourceGatherMultiplier:1.3,specialEventChance:.15},lootTable:[`wood`,`herb`,`meat`,`leather`,`berry`],dangerLevel:`low`},{id:`deep_forest`,name:`迷雾森林深处`,type:`dangerous`,description:`森林深处，迷雾更浓，野兽更强大。但稀有资源也更多。`,unlockDay:8,effects:{sanityDrainMultiplier:1.5,monsterSpawnRate:.5,resourceGatherMultiplier:2,specialEventChance:.3},lootTable:[`rare_herb`,`beast_core`,`rare_metal`,`mushroom`,`special_wood`],dangerLevel:`high`},{id:`water_source`,name:`水源地`,type:`resource`,description:`一条地下河的出口，干净的水源。但也是野兽常来的地方。`,unlockDay:2,effects:{sanityDrainMultiplier:.9,monsterSpawnRate:.3,resourceGatherMultiplier:1.5,specialEventChance:.1},lootTable:[`water`,`fish`,`clay`,`aquatic_plant`],dangerLevel:`moderate`},{id:`mist_altar`,name:`迷雾祭坛`,type:`altar`,description:`一座古老的石制祭坛，迷雾在这里特别浓厚。祭坛上刻着无法辨认的符文，似乎有某种力量。`,unlockDay:15,effects:{sanityDrainMultiplier:2,monsterSpawnRate:.4,resourceGatherMultiplier:0,specialEventChance:.5},lootTable:[`mist_crystal`,`ancient_rune`,`sacrificial_item`],dangerLevel:`extreme`},{id:`anomaly_zone`,name:`异常区域`,type:`anomaly`,description:`迷雾在这里扭曲了空间和时间，你会看到不可能的景象。理智在这里流失得特别快。`,unlockDay:20,effects:{sanityDrainMultiplier:3,monsterSpawnRate:.2,resourceGatherMultiplier:.5,specialEventChance:.6},lootTable:[`mist_crystal`,`time_fragment`,`space_shard`,`memory_crystal`],dangerLevel:`extreme`},{id:`research_lab`,name:`废弃研究所`,type:`ruins`,description:`一座被迷雾吞噬的研究所，里面可能有关于迷雾真相的线索。但防御系统还在运转。`,unlockDay:30,effects:{sanityDrainMultiplier:1.5,monsterSpawnRate:.3,resourceGatherMultiplier:1,specialEventChance:.4},lootTable:[`research_notes`,`high_tech_parts`,`medicine`,`mist_sample`,`truth_clue`],dangerLevel:`high`},{id:`military_base`,name:`军方基地`,type:`ruins`,description:`废弃的军方基地，可能有大量武器弹药。但也可能有更危险的东西。`,unlockDay:25,effects:{sanityDrainMultiplier:1.2,monsterSpawnRate:.4,resourceGatherMultiplier:1.5,specialEventChance:.3},lootTable:[`firearm`,`ammo`,`body_armor`,`military_ration`,`radio`],dangerLevel:`high`},{id:`mist_core`,name:`迷雾核心`,type:`anomaly`,description:`迷雾的最深处，一切的源头。只有最强大的幸存者才能到达这里。`,unlockDay:120,effects:{sanityDrainMultiplier:5,monsterSpawnRate:.8,resourceGatherMultiplier:0,specialEventChance:.8},lootTable:[`mist_core`,`god_fragment`,`truth_complete`],dangerLevel:`extreme`}];function vc(e){return _c.filter(t=>t.unlockDay<=e)}var yc=[{id:`starvation_health_decline`,cause:{type:`state`,description:`食物连续3天不足`},effect:{type:`attribute_change`,description:`力量下降，健康恶化`,delay:1,probability:1,parameters:{strength:-1,health:-10}}},{id:`dehydration_sanity_decline`,cause:{type:`state`,description:`水连续2天不足`},effect:{type:`attribute_change`,description:`理智快速下降，出现幻觉`,delay:1,probability:1,parameters:{sanity:-15,intelligence:-1}}},{id:`overexertion_injury`,cause:{type:`action`,description:`体力耗尽时继续进行高强度行动`},effect:{type:`state_change`,description:`受伤，健康下降`,probability:.7,parameters:{health:-15,status:`injured`}},chain:[`infection_risk`]},{id:`infection_risk`,cause:{type:`state`,description:`受伤后未及时处理`},effect:{type:`state_change`,description:`伤口感染，健康持续下降`,delay:2,probability:.5,parameters:{health:-20,status:`infected`}}},{id:`npc_betrayal_trigger`,cause:{type:`state`,description:`NPC好感度低于20，且资源短缺`},effect:{type:`event_trigger`,description:`NPC可能背叛，偷走物资或攻击玩家`,delay:1,probability:.3,parameters:{event:`npc_betrayal`}}},{id:`npc_loyalty_sacrifice`,cause:{type:`state`,description:`NPC好感度高于80，玩家处于致命危险`},effect:{type:`event_trigger`,description:`NPC可能牺牲自己保护玩家`,probability:.6,parameters:{event:`npc_sacrifice`}}},{id:`deep_explore_danger`,cause:{type:`action`,description:`在高危险区域长时间探索`},effect:{type:`event_trigger`,description:`遭遇强力怪物或异常事件`,probability:.6,parameters:{event:`deep_zone_danger`}},chain:[`combat_injury_risk`]},{id:`combat_injury_risk`,cause:{type:`event`,description:`战斗中受伤`},effect:{type:`state_change`,description:`健康下降，可能影响后续行动`,probability:1,parameters:{health:-10}}},{id:`long_mist_exposure_sanity`,cause:{type:`state`,description:`连续在浓厚迷雾中暴露超过3天`},effect:{type:`attribute_change`,description:`理智持续下降，可能出现幻觉和幻听`,delay:1,probability:.8,parameters:{sanity:-20}},chain:[`hallucination_event`]},{id:`hallucination_event`,cause:{type:`state`,description:`理智低于30`},effect:{type:`event_trigger`,description:`出现幻觉，可能做出危险行为`,probability:.5,parameters:{event:`hallucination`}}},{id:`weak_defense_breach`,cause:{type:`state`,description:`基地防御等级低于兽潮难度`},effect:{type:`event_trigger`,description:`兽潮中基地被攻破`,probability:.7,parameters:{event:`base_breach`}}},{id:`strong_defense_reputation`,cause:{type:`state`,description:`基地防御等级高，成功抵御多次兽潮`},effect:{type:`npc_relation`,description:`吸引更多幸存者加入，声望提升`,delay:3,probability:.8,parameters:{reputation:20,npc_influx:!0}}},{id:`saved_duoduo_father_repay`,cause:{type:`choice`,description:`救了朵朵`},effect:{type:`npc_relation`,description:`朵朵父亲杜建国后来在关键时刻报恩，提供重要帮助`,delay:50,probability:.9,parameters:{npc:`du_jianguo`,affection:50}},chain:[`dujianguo_joins`]},{id:`abandoned_duoduo_consequence`,cause:{type:`choice`,description:`抛弃了朵朵`},effect:{type:`state_change`,description:`内心受到谴责，理智持续下降，可能在夜晚听到朵朵的哭声`,delay:3,probability:.7,parameters:{sanity:-10,status:`guilty`}},chain:[`hallucination_event`]},{id:`saved_oldk_loyalty`,cause:{type:`choice`,description:`救了老K或帮助老K复仇`},effect:{type:`npc_relation`,description:`老K成为最忠诚的战友，在关键时刻不惜牺牲自己保护玩家`,delay:10,probability:.95,parameters:{npc:`old_k`,affection:80,loyalty:`absolute`}}},{id:`betrayed_oldk_consequence`,cause:{type:`choice`,description:`背叛了老K`},effect:{type:`event_trigger`,description:`老K成为敌人，在后续事件中找玩家复仇`,delay:15,probability:.8,parameters:{event:`oldk_revenge`}}},{id:`helped_zhang_trade_benefit`,cause:{type:`choice`,description:`帮助了商人老张`},effect:{type:`resource_change`,description:`老张提供稀有商品和重要情报，交易价格优惠`,delay:5,probability:.9,parameters:{trade_discount:.3,rare_items:!0}}},{id:`cheated_zhang_consequence`,cause:{type:`choice`,description:`欺骗了商人老张`},effect:{type:`npc_relation`,description:`老张断绝贸易关系，其他商人也对玩家提高警惕`,delay:3,probability:.85,parameters:{trade_penalty:.5,reputation:-20}}},{id:`treated_doctor_well_research`,cause:{type:`choice`,description:`善待陈静医生，支持她的研究`},effect:{type:`unlock`,description:`陈静研究出治疗迷雾感染的方法，解锁医疗科技`,delay:20,probability:.8,parameters:{unlock:`mist_cure`,tech:`medicine`}}},{id:`ignored_doctor_consequence`,cause:{type:`choice`,description:`忽视陈静医生的警告`},effect:{type:`state_change`,description:`迷雾感染扩散，基地成员健康下降`,delay:10,probability:.7,parameters:{health:-15,infection_rate:.3}}},{id:`trained_with_zhou_skills`,cause:{type:`action`,description:`和老周一起狩猎训练`},effect:{type:`attribute_change`,description:`学习老周的狩猎技巧，敏捷和力量提升`,delay:0,probability:1,parameters:{agility:1,strength:1,skill:`hunting`}}},{id:`helped_yang_invention`,cause:{type:`choice`,description:`支持小杨的发明研究`},effect:{type:`unlock`,description:`小杨发明出战车和迷雾驱散装置，解锁工程科技`,delay:30,probability:.85,parameters:{unlock:`battle_vehicle`,tech:`engineering`}}},{id:`saved_xiaoyu_trust`,cause:{type:`choice`,description:`救了林小雨或帮助她`},effect:{type:`npc_relation`,description:`林小雨成为坚定盟友，希望号安全区提供军事支持`,delay:10,probability:.9,parameters:{npc:`lin_xiaoyu`,affection:60,military_support:!0}}},{id:`respected_zhao_alliance`,cause:{type:`choice`,description:`尊重赵明，与希望号建立平等联盟`},effect:{type:`npc_relation`,description:`赵明深度信任，希望号与玩家势力合并，人口和资源大幅增加`,delay:40,probability:.8,parameters:{npc:`zhao_ming`,affection:70,merge:!0}}},{id:`disrespected_zhao_conflict`,cause:{type:`choice`,description:`轻视赵明或试图吞并希望号`},effect:{type:`event_trigger`,description:`希望号与玩家势力敌对，爆发冲突战争`,delay:20,probability:.75,parameters:{event:`hope_ship_war`}}},{id:`befriended_tieshan_brother`,cause:{type:`choice`,description:`与铁山建立兄弟关系`},effect:{type:`npc_relation`,description:`铁山带领钢铁兄弟会全力支持，军事力量大幅增强`,delay:15,probability:.9,parameters:{npc:`tie_shan`,affection:80,military_boost:.5}}},{id:`defeated_tieshan_submit`,cause:{type:`action`,description:`在战斗中击败铁山`},effect:{type:`npc_relation`,description:`铁山臣服，钢铁兄弟会成为附庸势力`,delay:0,probability:.85,parameters:{npc:`tie_shan`,affection:40,submit:!0}}},{id:`allied_with_linying_power`,cause:{type:`choice`,description:`与林鹰的自由联盟建立深度联盟`},effect:{type:`npc_relation`,description:`自由联盟提供强大军事支持，成为迷雾世界最强大的联盟`,delay:20,probability:.85,parameters:{npc:`lin_ying`,affection:60,super_alliance:!0}}},{id:`trusted_laohuli_intel`,cause:{type:`choice`,description:`信任老狐狸，与他建立长期合作`},effect:{type:`unlock`,description:`老狐狸提供关键情报和稀有物资，在关键时刻预警危险`,delay:10,probability:.9,parameters:{intel:!0,rare_supply:!0,early_warning:!0}}},{id:`converted_blackcrow_ally`,cause:{type:`choice`,description:`感化黑鸦，让进化者残余成为盟友`},effect:{type:`npc_relation`,description:`黑鸦带领超能力者加入，超能力战力大幅增强`,delay:15,probability:.85,parameters:{npc:`black_crow`,affection:60,superpower_boost:.5}}},{id:`killed_blackcrow_chaos`,cause:{type:`action`,description:`杀死黑鸦，消灭进化者残余`},effect:{type:`state_change`,description:`进化者残余四散，部分成为流寇，部分被其他势力收编`,delay:5,probability:.8,parameters:{chaos:!0,remnant_scatter:!0}}},{id:`negotiated_prophet_peace`,cause:{type:`choice`,description:`与先知谈判，和平解决`},effect:{type:`unlock`,description:`先知成为顾问，提供全部知识和技术，解锁隐藏结局`,delay:0,probability:.9,parameters:{advisor:!0,all_knowledge:!0,hidden_ending:`love_evolution`}}},{id:`destroyed_prophet_freedom`,cause:{type:`action`,description:`消灭先知的核心意识`},effect:{type:`state_change`,description:`迷雾开始消散，人类获得自由，但失去了先知的知识`,delay:10,probability:.95,parameters:{mist_dispersal:!0,freedom:!0,lost_knowledge:!0}}},{id:`inherited_prophet_power`,cause:{type:`choice`,description:`继承先知的力量和意志`},effect:{type:`unlock`,description:`成为新的迷雾之主，获得强大力量，但承担巨大责任`,delay:0,probability:.9,parameters:{mist_lord:!0,great_power:!0,great_responsibility:!0,ending:`E16`}}},{id:`built_farm_food_surplus`,cause:{type:`action`,description:`建造并升级农田`},effect:{type:`resource_change`,description:`食物充足，NPC好感度提升，吸引更多幸存者加入`,delay:5,probability:.9,parameters:{food_surplus:!0,npc_affection:10,population_growth:!0}}},{id:`built_infirmary_health_improve`,cause:{type:`action`,description:`建造并升级医疗室`},effect:{type:`state_change`,description:`伤病恢复速度提升，疾病死亡率下降，NPC存活率提高`,delay:3,probability:.95,parameters:{healing_speed:1.5,disease_death_rate:-.5,npc_survival:!0}}},{id:`built_workshop_tech_progress`,cause:{type:`action`,description:`建造并升级工坊`},effect:{type:`unlock`,description:`解锁更多制造配方，武器装备品质提升，迷雾积分收入增加`,delay:5,probability:.9,parameters:{crafting_unlock:!0,weapon_quality:1,points_income:!0}}},{id:`built_wall_defense_strong`,cause:{type:`action`,description:`建造并升级围墙`},effect:{type:`state_change`,description:`基地防御力大幅提升，兽潮伤亡减少，声望提升`,delay:3,probability:.95,parameters:{defense:2,beast_wave_casualties:-.5,reputation:10}}},{id:`built_library_research_boost`,cause:{type:`action`,description:`建造并升级图书室`},effect:{type:`attribute_change`,description:`研究速度提升，智力属性增长加快，解锁更多科技`,delay:7,probability:.85,parameters:{research_speed:1.5,intelligence_growth:1,tech_unlock:!0}}},{id:`built_barracks_military_strong`,cause:{type:`action`,description:`建造并升级兵营`},effect:{type:`state_change`,description:`战士战斗力提升，训练速度加快，军事力量增强`,delay:5,probability:.9,parameters:{combat_power:1.3,training_speed:1.5,military_strength:!0}}},{id:`built_altar_awakening`,cause:{type:`action`,description:`建造迷雾祭坛室`},effect:{type:`unlock`,description:`觉醒进度加速，可能觉醒超能力，但理智流失加快`,delay:10,probability:.8,parameters:{awakening_speed:2,superpower:!0,sanity_drain:1.5}}},{id:`neglect_base_decay`,cause:{type:`state`,description:`长期不维护基地设施`},effect:{type:`state_change`,description:`基地设施老化损坏，防御力下降，NPC不满情绪增加`,delay:15,probability:.7,parameters:{facility_decay:!0,defense:-1,npc_dissatisfaction:!0}}},{id:`explored_ruins_loot`,cause:{type:`action`,description:`探索废墟区域`},effect:{type:`resource_change`,description:`发现物资和物品，可能找到有价值的东西`,delay:0,probability:.8,parameters:{loot:!0,random_items:!0}}},{id:`explored_deep_forest_danger`,cause:{type:`action`,description:`深入迷雾森林`},effect:{type:`event_trigger`,description:`遭遇强大野兽或变异生物，可能获得稀有材料`,delay:0,probability:.7,parameters:{event:`deep_forest_danger`,rare_materials:!0}}},{id:`explored_research_lab_truth`,cause:{type:`action`,description:`探索废弃研究所`},effect:{type:`unlock`,description:`发现迷雾真相的线索，解锁研究资料和科技`,delay:0,probability:.85,parameters:{truth_clue:!0,research_data:!0,tech_unlock:!0}}},{id:`explored_military_base_weapons`,cause:{type:`action`,description:`探索军方基地`},effect:{type:`resource_change`,description:`发现武器弹药和军事装备，大幅提升战斗力`,delay:0,probability:.8,parameters:{weapons:!0,ammo:!0,military_gear:!0,combat_boost:.3}}},{id:`explored_mist_altar_power`,cause:{type:`action`,description:`探索迷雾祭坛`},effect:{type:`unlock`,description:`获得迷雾晶石和神秘力量，可能觉醒或强化超能力，但理智流失`,delay:0,probability:.75,parameters:{mist_crystal:!0,mystic_power:!0,awakening:!0,sanity_drain:!0}}},{id:`explored_anomaly_insanity`,cause:{type:`action`,description:`探索异常区域`},effect:{type:`state_change`,description:`看到不可能的景象，理智大幅流失，可能获得特殊能力或物品`,delay:0,probability:.7,parameters:{sanity:-20,special_ability:!0,rare_items:!0}},chain:[`hallucination_event`]},{id:`explored_mist_core_truth_complete`,cause:{type:`action`,description:`到达迷雾核心`},effect:{type:`unlock`,description:`发现迷雾的完整真相，解锁最终结局分支`,delay:0,probability:.95,parameters:{complete_truth:!0,final_ending:!0,special_item:`mist_core`}}},{id:`reckless_exploration_death`,cause:{type:`action`,description:`在低血量或低理智时深入危险区域`},effect:{type:`state_change`,description:`遭遇致命危险，可能重伤或死亡`,delay:0,probability:.6,parameters:{health:-30,death_risk:!0}}},{id:`helped_stranger_reputation`,cause:{type:`choice`,description:`无私帮助陌生幸存者`},effect:{type:`npc_relation`,description:`声望提升，更多幸存者愿意加入，NPC好感度普遍提升`,delay:3,probability:.9,parameters:{reputation:15,population_growth:!0,npc_affection:5}}},{id:`robbed_stranger_infamy`,cause:{type:`choice`,description:`抢劫或伤害无辜幸存者`},effect:{type:`npc_relation`,description:`恶名传播，幸存者避而远之，NPC好感度下降，可能被追杀`,delay:5,probability:.85,parameters:{infamy:20,population_decline:!0,npc_affection:-15,bounty:!0}}},{id:`shared_food_loyalty`,cause:{type:`choice`,description:`在资源短缺时分享食物给同伴`},effect:{type:`npc_relation`,description:`同伴忠诚度大幅提升，在关键时刻愿意牺牲自己保护玩家`,delay:0,probability:.95,parameters:{loyalty:30,sacrifice_willingness:!0}}},{id:`hoarded_food_betrayal`,cause:{type:`choice`,description:`在资源短缺时囤积食物，不顾同伴死活`},effect:{type:`event_trigger`,description:`同伴不满，可能背叛或离开，团队凝聚力下降`,delay:3,probability:.75,parameters:{event:`npc_betrayal`,team_cohesion:-30}}},{id:`kept_promise_trust`,cause:{type:`choice`,description:`信守承诺，完成对NPC的承诺`},effect:{type:`npc_relation`,description:`NPC信任度大幅提升，愿意分享更多秘密和资源`,delay:0,probability:.9,parameters:{trust:25,secrets:!0,resources:!0}}},{id:`broke_promise_distrust`,cause:{type:`choice`,description:`违背承诺，欺骗NPC`},effect:{type:`npc_relation`,description:`NPC信任度大幅下降，可能报复或散布负面消息`,delay:3,probability:.85,parameters:{trust:-30,revenge:!0,negative_rumor:!0}}},{id:`spared_enemy_mercy`,cause:{type:`choice`,description:`放过投降的敌人`},effect:{type:`npc_relation`,description:`仁慈之名传播，部分敌人可能归降，声望提升`,delay:5,probability:.7,parameters:{mercy_reputation:15,enemy_surrender:!0,population_growth:!0}}},{id:`executed_enemy_fear`,cause:{type:`choice`,description:`处决投降的敌人`},effect:{type:`npc_relation`,description:`恐惧之名传播，敌人战斗更加顽强，部分幸存者恐惧离开`,delay:3,probability:.8,parameters:{fear_reputation:20,enemy_morale:.3,population_decline:!0}}},{id:`overtrained_injury`,cause:{type:`action`,description:`体力耗尽时继续高强度训练或战斗`},effect:{type:`state_change`,description:`过度疲劳导致受伤，健康下降，可能留下后遗症`,delay:0,probability:.7,parameters:{health:-15,status:`injured`,fatigue:!0}},chain:[`infection_risk`]},{id:`ignored_injury_infection`,cause:{type:`state`,description:`受伤后不及时治疗`},effect:{type:`state_change`,description:`伤口感染，健康持续下降，可能导致死亡`,delay:3,probability:.6,parameters:{health:-25,status:`infected`,death_risk:!0}}},{id:`low_sanity_hallucination`,cause:{type:`state`,description:`理智长期低于30`},effect:{type:`event_trigger`,description:`出现幻觉和幻听，可能做出危险行为，甚至走进迷雾深处`,delay:1,probability:.6,parameters:{event:`hallucination`,dangerous_behavior:!0,death_risk:!0}}},{id:`good_rest_recovery`,cause:{type:`action`,description:`在安全的庇护所充分休息`},effect:{type:`state_change`,description:`健康和体力快速恢复，理智恢复，状态提升`,delay:0,probability:.95,parameters:{health:15,energy:30,sanity:10,status:`rested`}}},{id:`balanced_diet_health`,cause:{type:`state`,description:`长期保持食物和水的充足供应`},effect:{type:`attribute_change`,description:`身体素质提升，力量和耐力增长，疾病抵抗力增强`,delay:10,probability:.8,parameters:{strength:1,endurance:1,disease_resistance:.3}}},{id:`starvation_decline`,cause:{type:`state`,description:`长期食物不足`},effect:{type:`attribute_change`,description:`身体素质下降，力量和耐力减少，疾病抵抗力降低`,delay:7,probability:.85,parameters:{strength:-1,endurance:-1,disease_resistance:-.3,health:-10}}},{id:`dehydration_decline`,cause:{type:`state`,description:`长期饮水不足`},effect:{type:`attribute_change`,description:`身体机能下降，理智和敏捷减少，可能出现幻觉`,delay:3,probability:.9,parameters:{sanity:-15,agility:-1,hallucination:!0,health:-10}}},{id:`wealthy_trade_opportunities`,cause:{type:`state`,description:`积累大量迷雾积分和物资`},effect:{type:`unlock`,description:`解锁高级贸易和特殊商品，商人主动来访，获得稀有物品`,delay:5,probability:.8,parameters:{advanced_trade:!0,special_goods:!0,merchant_visit:!0,rare_items:!0}}},{id:`poverty_vulnerability`,cause:{type:`state`,description:`长期资源匮乏，积分不足`},effect:{type:`state_change`,description:`无法购买关键物资，在危机中更加脆弱，NPC可能离开`,delay:10,probability:.7,parameters:{vulnerability:!0,npc_leaving:!0,crisis_risk:!0}}}],bc={strengthDamageMultiplier:1.5,weaponDamageMultiplier:1,maxDodgeChance:.5,dodgePerAgility:.02,baseHitChance:.7,hitPerAgility:.01,checkPerIntelligence:.005,baseCritChance:.05,critPerLuck:.01,dropPerLuck:.02,sanityDrainPerIntelligence:.05,healthPerStrength:5,energyPerAgility:3};function xc(e){return 1+e*bc.dropPerLuck}var Sc={baseExp:100,expGrowth:1.5,maxLevel:50,healthPerLevel:10,attributePointsPerLevel:1,skillPointsPerLevel:1};function Cc(e){return Math.floor(Sc.baseExp*e**+Sc.expGrowth)}function wc(e,t){return Math.floor(t?e*20+10:e*5)}var Tc={combatRewardBase:10,combatRewardPerLevel:5,exploreRewardBase:3,questRewardBase:50,buyMultiplier:1.3,sellMultiplier:.6,baseUpgradeCostMultiplier:2,crystalDropChance:.3,crystalValueBase:20};function Ec(e,t){let n=Tc.combatRewardBase+e*Tc.combatRewardPerLevel;return Math.floor(n*xc(t))}var Dc={maxLevel:10,upgradeResourceBase:{wood:20,stone:10,metal:5},upgradeGrowth:2,restHealthPerLevel:2,restEnergyPerLevel:3,storagePerLevel:50,defensePerLevel:10,productionPerLevel:5,buildings:[{id:`wall`,name:`围墙`,description:`保护基地免受野兽侵袭`,maxLevel:5,cost:{wood:30,stone:20},effects:{defense:20},unlockPhase:1},{id:`farm`,name:`农田`,description:`种植食物，实现自给自足`,maxLevel:5,cost:{wood:20,water:10},effects:{food_production:5},unlockPhase:2},{id:`workshop`,name:`工坊`,description:`制作武器和工具`,maxLevel:5,cost:{wood:40,metal:20},effects:{crafting:1},unlockPhase:2},{id:`infirmary`,name:`医疗室`,description:`治疗伤病，恢复健康`,maxLevel:5,cost:{wood:30,medicine:10},effects:{healing:10},unlockPhase:3},{id:`watchtower`,name:`瞭望塔`,description:`提前发现危险，增加警戒范围`,maxLevel:3,cost:{wood:50,stone:30},effects:{detection:1},unlockPhase:3},{id:`library`,name:`图书室`,description:`研究迷雾和技术，提升智力`,maxLevel:3,cost:{wood:40,paper:20},effects:{research:1},unlockPhase:4},{id:`barracks`,name:`兵营`,description:`训练战斗人员，提升战斗力`,maxLevel:5,cost:{wood:60,metal:30},effects:{training:1},unlockPhase:5},{id:`altar_room`,name:`迷雾祭坛室`,description:`研究迷雾的力量，可能觉醒能力`,maxLevel:3,cost:{stone:50,mist_crystal:5},effects:{mystic_research:1},unlockPhase:6}]};function Oc(e,t){let n=e*Dc.defensePerLevel;for(let[e,r]of Object.entries(t)){let t=Dc.buildings.find(t=>t.id===e);t?.effects.defense&&(n+=t.effects.defense*r)}return n}var kc=[{id:`first_blood`,name:`初次见血`,description:`击杀第一只迷雾野兽`,unlockCondition:{type:`combat`,value:1},bonuses:{strength:1,damageMultiplier:.05},rarity:`common`},{id:`fog_seven_days`,name:`迷雾七日`,description:`存活到第7天`,unlockCondition:{type:`day`,value:7},bonuses:{health:10},rarity:`common`},{id:`beast_slayer`,name:`屠兽者`,description:`累计击杀10只野兽`,unlockCondition:{type:`combat`,value:10},bonuses:{strength:3,damageMultiplier:.1},rarity:`rare`},{id:`explorer`,name:`探索者`,description:`访问10个不同场景`,unlockCondition:{type:`explore`,value:10},bonuses:{agility:2,luck:2},rarity:`common`},{id:`fog_thirty_days`,name:`雾海一月`,description:`存活到第30天`,unlockCondition:{type:`day`,value:30},bonuses:{health:20,damageMultiplier:.15,defenseMultiplier:.15},rarity:`rare`},{id:`beast_wave_survivor`,name:`兽潮征服者`,description:`成功防御第一次兽潮`,unlockCondition:{type:`special`,value:`beast_wave_1`},bonuses:{defenseMultiplier:.2,health:15},rarity:`rare`},{id:`truth_seeker`,name:`真相追寻者`,description:`发现迷雾真相`,unlockCondition:{type:`special`,value:`truth_seen`},bonuses:{intelligence:5,luck:3},rarity:`epic`},{id:`solo_survivor`,name:`独行者`,description:`独自存活14天`,unlockCondition:{type:`day`,value:14},bonuses:{agility:3,luck:2,sanityRegen:1},rarity:`common`},{id:`leader`,name:`领导者`,description:`拥有5名以上同伴`,unlockCondition:{type:`npc`,value:5},bonuses:{intelligence:3,health:15},rarity:`rare`},{id:`builder_master`,name:`建筑大师`,description:`基地达到5级`,unlockCondition:{type:`special`,value:`base_level_5`},bonuses:{defenseMultiplier:.3,health:20},rarity:`epic`},{id:`awakened`,name:`觉醒者`,description:`觉醒特殊能力`,unlockCondition:{type:`special`,value:`awakened`},bonuses:{intelligence:5,damageMultiplier:.2,sanityRegen:2},rarity:`epic`},{id:`fog_hundred_days`,name:`百日迷雾`,description:`存活到第100天`,unlockCondition:{type:`day`,value:100},bonuses:{health:50,damageMultiplier:.3,defenseMultiplier:.3,sanityRegen:3},rarity:`legendary`},{id:`beast_king`,name:`兽王`,description:`累计击杀100只野兽`,unlockCondition:{type:`combat`,value:100},bonuses:{strength:10,damageMultiplier:.3},rarity:`legendary`},{id:`faction_leader`,name:`势力之主`,description:`建立自己的势力`,unlockCondition:{type:`phase`,value:6},bonuses:{intelligence:8,health:30,defenseMultiplier:.2},rarity:`epic`},{id:`mist_lord`,name:`迷雾之主`,description:`到达迷雾核心`,unlockCondition:{type:`special`,value:`mist_core_reached`},bonuses:{intelligence:10,luck:10,damageMultiplier:.5,sanityRegen:5},rarity:`legendary`},{id:`humanity_savior`,name:`人类救星`,description:`击败最终BOSS，拯救人类`,unlockCondition:{type:`special`,value:`final_boss_defeated`},bonuses:{health:100,damageMultiplier:.5,defenseMultiplier:.5,sanityRegen:10},rarity:`legendary`}];function Ac(e,t,n){let r=e.storyline.initialScene,i={version:e.version,day:1,resources:zs(e.startingResources),flags:{},inventory:{},currentScene:r,visitedScenes:[r],pendingEvents:[],triggeredEvents:[],eventStack:[],outcome:null,runStats:{survivalDays:0,eventsTriggered:0,kills:0,signinStreak:0,resources:{}},meta:{runs:0,unlockedEndings:[],bestDays:0,unlockedAchievements:[],...t},base:ds(),skills:Yo(),progression:Es(),economy:rs(),itemLevels:{},ap:3,equipment:{},attributes:{strength:10,agility:10,intelligence:10,luck:10},level:1,exp:0,expToNext:Cc(1),attributePoints:0,skillPoints:0,titles:[],activeTitle:null,combatKills:0,currentPhase:1,mistPoints:0,dailyPanel:{weather:`foggy`,mistDensity:`normal`,dangerLevel:`low`,specialHint:null,dayOfPhase:1},npcRelations:{},causalTracker:{triggeredCauses:[],pendingEffects:[],consequenceLog:[]},growthPath:{primary:null,scores:{},lastAssessmentDay:0},majorEvents:{},buildings:{},awakening:{isAwakened:!1,abilityType:null,abilityLevel:0,awakeningProgress:0},reputation:{overall:0,amongSurvivors:0,amongFactions:0,fame:0,infamy:0},unlockedZones:[`safe_house`,`nearby_ruins`],gameVersion:`1.0.0`};return n&&Xs(i,n),i}function jc(e,t){if(e.storyline.scenes[t])return e.storyline.scenes[t];for(let n of e.lines??[])if(n.scenes[t])return n.scenes[t];return null}function Mc(e,t){if(e.storyline.endings[t])return e.storyline.endings[t];for(let n of e.lines??[])if(n.endings?.[t])return n.endings[t];return null}function Nc(e,t){return e.randomEvents.find(e=>e.id===t)??null}function Pc(e,t){if(!e)return!0;if(e.flags){for(let n of e.flags)if(!t.flags[n])return!1}if(e.items){for(let[n,r]of Object.entries(e.items))if((t.inventory[n]??0)<r)return!1}if(e.resources){for(let[n,r]of Object.entries(e.resources))if(t.resources[n].current<r)return!1}if(e.attributes){for(let[n,r]of Object.entries(e.attributes))if((t.attributes[n]??0)<r)return!1}return!0}function Fc(e,t){return e.filter(e=>Pc(e.requires,t))}function Ic(e,t){let n=[];switch(t.kind){case`resource`:t.resource&&Z(e.resources[t.resource],t.delta??0);break;case`flag`:e.flags[t.flag??``]=t.flagValue??!0;break;case`item`:{let r=t.item??``,i=e.inventory[r]??0;e.inventory[r]=Math.max(0,i+(t.amount??0)),(t.amount??0)<0&&Bc(e,r,n);break}}return n}function Lc(e,t,n){if(e.combat)return null;let r=t.monster??Rc(e,n);return r?(e.combat=rc(e,r),`【遭遇】雾的深处传来低吼——战斗开始！`):null}function Rc(e,t){let n=sc(e.day??1).filter(e=>!!e);return n.length?n[t.int(0,n.length-1)].id:null}function zc(e){let t=[],n=(n,r,i,a)=>{e.resources[n].current<30&&(e.inventory[r]??0)>0&&(--e.inventory[r],Z(e.resources[n],i),t.push(`【系统】你从背包里拿出${Y[r]?.name??r}${a}了下来（+${i}）。`))};return n(`food`,`food`,30,`吃`),n(`water`,`water`,30,`喝`),t}function Bc(e,t,n){if(!t)return;let r=e.itemLevels[t]??{uses:0,level:1};r.uses+=e.flags.talent_item_xp_boost?2:1;let i=r.level*10;for(;r.uses>=i;){r.uses-=i,r.level+=1,i=r.level*10;let e=Y[t]?.name??t;n.push(`【系统】叮！「${e}」熟练度突破了，升到 Lv.${r.level}！（交易价值提升）`)}e.itemLevels[t]=r}function Vc(e,t,n,r){let i=n.next,a=n.result,o=[];n.apCost&&(t.ap=Math.max(0,t.ap-n.apCost));for(let e of n.effects)if(e.kind===`roll`){let n=Ks(r.next.bind(r),e.difficulty??50);if(n.success){if(i=e.onSuccess??i,e.successEffects)for(let n of e.successEffects)if(n.kind===`combat`){let e=Lc(t,n,r);e&&o.push(e)}else o.push(...Ic(t,n))}else if(i=e.onFail??i,e.lethal&&n.tier===`crit_fail`&&(t.resources.health.current=0),e.failEffects)for(let n of e.failEffects)o.push(...Ic(t,n))}else if(e.kind===`jump`)i=e.target??i;else if(e.kind===`combat`){let n=Lc(t,e,r);n&&o.push(n)}else o.push(...Ic(t,e));let s;if(i&&Mc(e,i)){let n=Mc(e,i);s={type:`ending`,id:n.id,title:n.title,desc:n.desc},t.outcome=s,t.meta.unlockedEndings=Array.from(new Set([...t.meta.unlockedEndings,n.id]))}else i===`__return__`&&t.eventStack.length?t.currentScene=t.eventStack.pop():i&&i!==`__return__`&&(t.currentScene=i,t.visitedScenes.includes(i)||t.visitedScenes.push(i));return ll(t,n),{state:t,resultText:a,outcome:s,next:i,systemMessages:o}}function Hc(e,t,n,r){let i=t.currentScene,a=t.eventStack.slice(),o=Vc(e,t,n,r);n.next===`__return__`&&!o.outcome&&(t.currentScene=i,t.eventStack=a);let s=t.pendingEvents.shift();return s&&t.triggeredEvents.push(s),o}function Uc(e,t,n){let r=e.randomEvents.filter(e=>e.weight<=0||t.day<e.minDay?!1:e.maxTriggers<0||t.triggeredEvents.filter(t=>t===e.id).length<e.maxTriggers);return r.length?n.weighted(r,e=>e.weight):null}function Wc(e,t){if(!t.eventStack.length)for(let n of e.lines??[]){if(t.flags[`line_done_${n.id}`])continue;let e=n.trigger;if(!(e.dayMin&&t.day<e.dayMin)&&!(e.flags&&!e.flags.every(e=>t.flags[e]))&&!(e.notFlags&&e.notFlags.some(e=>t.flags[e]))){t.eventStack.push(t.currentScene),t.currentScene=n.initialScene,t.flags[`line_done_${n.id}`]=!0;break}}}function Gc(e,t){let n=[],r=e.day,i=mc(r,()=>t.next()),a=hc(r,i),o=gc(r,a,i),s=r-fc(r).dayRange[0]+1,c=null;if(t.next()<.3){let e=[`附近废墟中有物资`,`今天适合外出探索`,`注意保存体力`,`水源地附近有野兽出没`,`迷雾浓度正在上升`,`庇护所的防御需要加固`,`今天可能会遇到幸存者`,`深处的废墟有稀有物品`];c=e[Math.floor(t.next()*e.length)]}return e.dailyPanel={weather:i,mistDensity:a,dangerLevel:o,specialHint:c,dayOfPhase:s},n.push(`【第${r}天】天气：${{clear:`晴朗`,foggy:`浓雾`,rainy:`阴雨`,stormy:`暴风`,bloody_moon:`血月`,mist_tide:`迷雾潮汐`}[i]||i}，迷雾浓度：${{thin:`稀薄`,normal:`正常`,thick:`浓厚`,impenetrable:`伸手不见五指`}[a]||a}，危险等级：${{safe:`安全`,low:`低`,moderate:`中等`,high:`高`,extreme:`极高`}[o]||o}`),c&&n.push(`【隐藏提示】${c}`),i===`bloody_moon`&&n.push(`【警告】血月降临！迷雾中的生物变得异常狂暴，今晚极度危险！`),i===`stormy`&&n.push(`【警告】暴风天气！户外行动极其危险，建议待在庇护所。`),a===`impenetrable`&&n.push(`【警告】迷雾浓度极高！能见度不足两米，外出可能迷失方向。`),n}function Kc(e){let t=vc(e.day).filter(t=>!e.unlockedZones.includes(t.id));for(let n of t)e.unlockedZones.push(n.id);return t.map(e=>e.name)}function qc(e){let t=[],n=e.causalTracker.pendingEffects.filter(t=>t.triggerDay<=e.day);for(let r of n)Math.random()<r.probability&&(t.push(`【因果报应】${r.effectDescription}`),e.causalTracker.consequenceLog.push({day:e.day,cause:r.causalId,effect:r.effectDescription}));return e.causalTracker.pendingEffects=e.causalTracker.pendingEffects.filter(t=>t.triggerDay>e.day),t}function Jc(e,t,n,r=0,i=1){e.causalTracker.triggeredCauses.includes(t)||e.causalTracker.triggeredCauses.push(t),(r>0||i<1)&&e.causalTracker.pendingEffects.push({causalId:t,effectDescription:n,triggerDay:e.day+r,probability:i})}function Yc(e,t,n){let r=[];r.push(...Gc(t,n)),r.push(...qc(t)),r.push(...il(t,e));let i=Kc(t);i.length>0&&r.push(`【新区域解锁】${i.join(`、`)}`),r.push(tc(t));let a=ms(t);r.push(...a.messages.map(e=>`[生产] ${e}`)),r.push(...rl(t)),r.push(...zc(t)),r.push(...Ss(t)),t.eventStack.length>0&&(Z(t.resources.food,8),Z(t.resources.water,6),r.push(`【间隙】日子再难也要过——你趁着剧情的空当搜刮了一圈（食物+8、水+6）。`));let o=Gs(t);r.push(...o.map(e=>`[每日消耗] ${e}`));let s=Vs(t,e.income);if(r.push(...s.messages),s.dead){let n=`health`;return t.resources.water.current<=0?n=`thirst`:t.resources.food.current<=0&&(n=`hunger`),el(t,e,n),{dead:!0,messages:r,event:null}}let c=Hs(t);if(r.push(...c),t.resources.sanity.current<=0&&(Z(t.resources.health,-8),r.push(`理智彻底耗尽——迷雾中的低语钻进了你的骨头，你开始分不清现实和幻觉（生命-8）。`)),t.resources.health.current<=0){let n=`health`;return t.resources.sanity.current<=0?n=`sanity`:t.resources.food.current<=0?n=`hunger`:t.resources.water.current<=0&&(n=`thirst`),el(t,e,n),{dead:!0,messages:r,event:null}}if(t.day+=1,t.ap=3,t.runStats.survivalDays=t.day,Xo(t,1),Wc(e,t),!t.combat){let e=cc(t,n);e&&r.push(e)}let l=null;t.eventStack.length||(l=Uc(e,t,n),l&&(t.pendingEvents.push(l.id),t.runStats.eventsTriggered+=1));let u=Ds(t,e);if(r.push(...u.messages),u.catastropheTrigger){let e=u.catastropheTrigger,n=Ps(t,e),i=Fs(t,e,n.success);r.push(...n.messages,...i.messages)}let d=$s(t);d&&r.push(d);for(let e of uc(t))r.push(`【成就达成】${e.name}：${e.desc}`);let f=t.currentPhase;if($c(t),t.currentPhase!==f){let e=fc(t.day);r.push(`【阶段进入】${e.name}：${e.description}`)}let p=Qc(t);for(let e of p)r.push(`【称号解锁】${e}`);as(t,t.day);let m=tl(t,e);return m?(r.push(`【结局达成】${m.title}`),{dead:!0,messages:r,event:null}):{dead:!1,messages:r,event:l,progression:u}}function Xc(e,t){e.exp+=t;let n=!1;for(;e.exp>=e.expToNext&&e.level<30;)e.exp-=e.expToNext,e.level+=1,e.expToNext=Cc(e.level),e.attributePoints+=1,e.skillPoints+=1,e.resources.health.max+=10,e.resources.health.current=Math.min(e.resources.health.max,e.resources.health.current+10),n=!0;return{leveledUp:n,newLevel:e.level}}function Zc(e,t){e.mistPoints+=t}function Qc(e){let t=[];for(let n of kc){if(e.titles.includes(n.id))continue;let r=!1;switch(n.unlockCondition.type){case`day`:r=e.day>=n.unlockCondition.value;break;case`combat`:r=e.combatKills>=n.unlockCondition.value;break;case`explore`:r=e.visitedScenes.length>=n.unlockCondition.value;break;case`special`:r=!!e.flags[n.unlockCondition.value];break;case`npc`:r=Object.keys(e.npcRelations).filter(t=>e.npcRelations[t].isAlive&&e.npcRelations[t].affection>=n.unlockCondition.value).length>=n.unlockCondition.value;break;case`phase`:r=e.currentPhase>=n.unlockCondition.value;break;case`achievement`:r=(e.meta.unlockedAchievements??[]).includes(n.unlockCondition.value)}r&&(e.titles.push(n.id),t.push(n.name),e.activeTitle||=n.id)}return t}function $c(e){let t=fc(e.day);t.id!==e.currentPhase&&(e.currentPhase=t.id)}function el(e,t,n){let r=Object.values(t.storyline.endings).filter(e=>e.category===`death`),i=r.find(e=>e.id===`E10`)??r[0]??{id:`death`,title:`死亡`,desc:`你在迷雾中倒下。`,category:`death`};n===`sanity`?i=r.find(e=>e.id===`E07`)??i:n===`thirst`?i=r.find(e=>e.id===`E08`)??i:n===`hunger`?i=r.find(e=>e.id===`E09`)??i:n===`combat`?i=r.find(e=>e.id===`E11`)??i:n===`beast_wave`&&(i=r.find(e=>e.id===`E12`)??i),e.outcome={type:`death`,id:i.id,title:i.title,desc:i.desc},e.meta.bestDays=Math.max(e.meta.bestDays,e.day)}function tl(e,t){let n=e.day,r=e.flags,i=e.inventory;if(n>=150){if(r.final_battle_failed)return Q(t,e,`E18`);if(r.civilization_rebuilt&&r.mist_dispelled)return Q(t,e,`E15`);if(r.mist_lord_ending)return Q(t,e,`E16`);if(r.dictator_ending)return Q(t,e,`E17`);if(r.love_evolution_ending)return Q(t,e,`E05`)}if(n>=60&&n<150&&r.mist_naturally_dispelled)return Q(t,e,`E04`);if(n>=30&&n<60){if((i.purple_crystal??0)>=1&&(i.red_crystal??0)>=1&&(i.blue_crystal??0)>=1)return Q(t,e,`E05`);if(r.radio_fixed)return Q(t,e,`E01`);if((i.signal_flare??0)>0)return Q(t,e,`E02`);if(r.laok_ally&&r.laok_trust)return Q(t,e,`E06`);if(r.kid_saved)return Q(t,e,`E14`);if(e.visitedScenes.length>=15)return Q(t,e,`E13`);if(e.resources.warmth.current>=50)return Q(t,e,`E03`);if(n>=50)return Q(t,e,`E04`)}return null}function Q(e,t,n){let r=Mc(e,n);if(!r)return null;let i={type:`ending`,id:r.id,title:r.title,desc:r.desc};return t.outcome=i,t.meta.unlockedEndings=Array.from(new Set([...t.meta.unlockedEndings,r.id])),t.meta.bestDays=Math.max(t.meta.bestDays,t.day),i}function nl(e){let t={};for(let[n,r]of Object.entries(e.buildings)){if(r<=0)continue;let e=Dc.buildings.find(e=>e.id===n);if(e)for(let[n,i]of Object.entries(e.effects))t[n]=(t[n]??0)+i*r}return t}function rl(e){let t=[],n=nl(e);if(n.food_production&&n.food_production>0){let r=n.food_production;Z(e.resources.food,r),t.push(`【农田产出】收获了${r}单位食物`)}if(n.healing&&n.healing>0){let r=n.healing;e.resources.health.current<e.resources.health.max&&(Z(e.resources.health,r),t.push(`【医疗室】恢复了${r}点生命值`))}if(n.crafting&&n.crafting>0){let r=n.crafting*2;e.mistPoints+=r,t.push(`【工坊产出】制作了物品，获得${r}迷雾积分`)}if(n.detection&&n.detection>0){let r=n.detection;Z(e.resources.sanity,r),t.push(`【瞭望塔】提前发现危险，减少了恐慌（理智+${r}）`)}if(n.research&&n.research>0){let r=n.research*3;Xc(e,r),t.push(`【图书室】研究获得了${r}点经验`)}if(n.training&&n.training>0&&t.push(`【兵营】战士们进行了日常训练`),n.mystic_research&&n.mystic_research>0&&!e.awakening.isAwakened){let r=n.mystic_research*2;if(e.awakening.awakeningProgress=Math.min(100,e.awakening.awakeningProgress+r),t.push(`【迷雾祭坛室】研究迷雾，觉醒进度+${r}（当前：${e.awakening.awakeningProgress}%）`),e.awakening.awakeningProgress>=100&&!e.awakening.isAwakened){e.awakening.isAwakened=!0,e.awakening.abilityLevel=1;let n=[`strength`,`speed`,`energy`,`perception`,`regeneration`];e.awakening.abilityType=n[Math.floor(Math.random()*n.length)],t.push(`【觉醒！】你感受到了迷雾的力量，觉醒了超能力：${e.awakening.abilityType}！`),e.flags.awakened=!0}}if(n.defense&&n.defense>0){let n=Oc(e.base?.level??1,e.buildings);t.push(`【基地防御】当前防御力：${n}`)}return t}function il(e,t){let n=[],r=[];for(let i of yc){if(e.causalTracker.triggeredCauses.includes(i.id)&&i.effect.delay===0&&i.effect.probability===1)continue;let a=!1;switch(i.cause.type){case`state`:a=al(e,i.cause.description);break;case`action`:case`choice`:a=ol(e,i.cause.description);break;case`npc_action`:a=sl(e,i.cause.description)}if(a&&!r.includes(i.id)){let a=i.effect.probability??1;if(Math.random()<a){let a=cl(e,i,t);a&&(n.push(a),r.push(i.id))}}}return n}function al(e,t){if(t.includes(`食物`)&&t.includes(`不足`))return e.resources.food.current<20;if(t.includes(`水`)&&t.includes(`不足`))return e.resources.water.current<20;if(t.includes(`体力耗尽`))return e.resources.energy.current<=0;if(t.includes(`受伤`))return e.resources.health.current<50;if(t.includes(`理智`)&&(t.includes(`低`)||t.includes(`低于`)))return e.resources.sanity.current<30;if(t.includes(`浓厚迷雾`))return e.dailyPanel.mistDensity===`thick`||e.dailyPanel.mistDensity===`impenetrable`;if(t.includes(`基地防御`)){let n=Oc(e.base?.level??1,e.buildings);if(t.includes(`高`))return n>30;if(t.includes(`低`))return n<10}return t.includes(`资源匮乏`)||t.includes(`资源短缺`)?e.resources.food.current+e.resources.water.current<50:t.includes(`不维护基地`)?Object.keys(e.buildings).length>0&&e.day>30&&!e.flags.base_maintained:t.includes(`食物充足`)||t.includes(`食物和水的充足`)?e.resources.food.current>50&&e.resources.water.current>50:t.includes(`大量迷雾积分`)||t.includes(`积累大量`)?e.mistPoints>500:t.includes(`积分不足`)||t.includes(`资源匮乏`)?e.mistPoints<50:t.includes(`NPC好感度低于`)?Object.values(e.npcRelations).filter(e=>e.affection<20).length>0:t.includes(`NPC好感度高于`)?Object.values(e.npcRelations).filter(e=>e.affection>80).length>0:!1}function ol(e,t){for(let[n,r]of Object.entries({救了朵朵:`kid_saved`,抛弃了朵朵:`kid_abandoned`,救了老K:`laok_saved`,帮助老K复仇:`laok_revenge_helped`,背叛了老K:`laok_betrayed`,帮助了商人老张:`zhang_helped`,欺骗了商人老张:`zhang_cheated`,善待陈静医生:`doctor_trusted`,忽视陈静医生:`doctor_ignored`,支持小杨的发明:`yang_supported`,救了林小雨:`xiaoyu_saved`,尊重赵明:`zhao_respected`,轻视赵明:`zhao_disrespected`,与铁山建立兄弟关系:`tieshan_brother`,与林鹰建立深度联盟:`linying_allied`,信任老狐狸:`laohuli_trusted`,感化黑鸦:`blackcrow_converted`,杀死黑鸦:`blackcrow_killed`,与先知谈判:`prophet_negotiated`,消灭先知:`prophet_destroyed`,继承先知:`prophet_inherited`,无私帮助陌生幸存者:`helped_stranger`,抢劫或伤害无辜幸存者:`robbed_stranger`,分享食物给同伴:`shared_food`,囤积食物:`hoarded_food`,信守承诺:`kept_promise`,违背承诺:`broke_promise`,放过投降的敌人:`spared_enemy`,处决投降的敌人:`executed_enemy`,建造并升级农田:`farm_built`,建造并升级医疗室:`infirmary_built`,建造并升级工坊:`workshop_built`,建造并升级围墙:`wall_built`,建造并升级图书室:`library_built`,建造并升级兵营:`barracks_built`,建造迷雾祭坛室:`altar_built`}))if(t.includes(n))return!!e.flags[r];return!1}function sl(e,t){return t.includes(`玩家处于致命危险`)?e.resources.health.current<20:!1}function cl(e,t,n){let r=t.effect,i=`【因果报应】${r.description}`;switch(e.causalTracker.triggeredCauses.includes(t.id)||e.causalTracker.triggeredCauses.push(t.id),e.causalTracker.consequenceLog.push({day:e.day,cause:t.cause.description,effect:r.description}),r.type){case`attribute_change`:r.parameters&&(r.parameters.strength&&(e.attributes.strength+=r.parameters.strength),r.parameters.agility&&(e.attributes.agility+=r.parameters.agility),r.parameters.intelligence&&(e.attributes.intelligence+=r.parameters.intelligence),r.parameters.luck&&(e.attributes.luck+=r.parameters.luck));break;case`resource_change`:r.parameters&&(r.parameters.health&&Z(e.resources.health,r.parameters.health),r.parameters.sanity&&Z(e.resources.sanity,r.parameters.sanity),r.parameters.energy&&Z(e.resources.energy,r.parameters.energy),r.parameters.food&&Z(e.resources.food,r.parameters.food),r.parameters.water&&Z(e.resources.water,r.parameters.water));break;case`state_change`:r.parameters&&(r.parameters.status&&(e.flags[r.parameters.status]=!0),r.parameters.mist_dispersal&&(e.flags.mist_dispelled=!0),r.parameters.awakening&&(e.flags.awakened=!0),r.parameters.hallucination&&(e.flags.hallucinating=!0));break;case`npc_relation`:if(r.parameters){if(r.parameters.npc_affection)for(let t of Object.keys(e.npcRelations))e.npcRelations[t].affection=Math.min(100,e.npcRelations[t].affection+r.parameters.npc_affection);r.parameters.reputation&&(e.reputation.overall+=r.parameters.reputation,r.parameters.reputation>0?e.reputation.fame+=r.parameters.reputation:e.reputation.infamy+=Math.abs(r.parameters.reputation))}break;case`unlock`:r.parameters&&(r.parameters.tech_unlock&&(e.flags.tech_unlocked=!0),r.parameters.crafting_unlock&&(e.flags.crafting_unlocked=!0),r.parameters.hidden_ending&&(e.flags[r.parameters.hidden_ending]=!0),r.parameters.ending&&(e.flags[`ending_${r.parameters.ending}`]=!0),r.parameters.special_item&&(e.inventory[r.parameters.special_item]=1));break;case`event_trigger`:r.parameters&&r.parameters.event&&(Nc(n,r.parameters.event)?(e.pendingEvents.push(r.parameters.event),i+=`（触发事件：${r.parameters.event}）`):i+=`（事件 ${r.parameters.event} 未收录，已跳过）`)}return i}function ll(e,t){for(let n of t.effects)if(n.kind===`flag`&&n.flag){for(let t of yc)if((t.cause.type===`choice`||t.cause.type===`action`)&&!e.causalTracker.triggeredCauses.includes(t.id)){for(let[r,i]of Object.entries({kid_saved:[`救了朵朵`,`救了女孩`],laok_saved:[`救了老K`,`帮助老K`],zhang_helped:[`帮助了商人老张`,`帮助老张`],doctor_trusted:[`善待陈静医生`,`信任医生`],yang_supported:[`支持小杨的发明`,`支持小杨`],helped_stranger:[`无私帮助陌生幸存者`,`帮助陌生人`],shared_food:[`分享食物给同伴`,`分享食物`],kept_promise:[`信守承诺`,`遵守承诺`],spared_enemy:[`放过投降的敌人`,`放过敌人`],farm_built:[`建造并升级农田`,`建造农田`],infirmary_built:[`建造并升级医疗室`,`建造医疗室`]}))if(n.flag===r){for(let n of i)if(t.cause.description.includes(n)){t.effect.delay&&t.effect.delay>0?Jc(e,t.id,t.effect.description,t.effect.delay,t.effect.probability??1):e.causalTracker.triggeredCauses.push(t.id);break}}}}}var ul=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let e=0;e<8;e++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function dl(e){let t=4294967295;for(let n=0;n<e.length;n++)t=ul[(t^e.charCodeAt(n))&255]^t>>>8;return(t^4294967295)>>>0}function fl(e){return JSON.stringify(e)}function pl(e){return JSON.parse(e)}function ml(e){let t=fl(e);return`${btoa(unescape(encodeURIComponent(t)))}:${dl(t).toString(16).padStart(8,`0`)}`}function hl(e){let t=e.lastIndexOf(`:`);if(t<0)return null;let n=e.slice(0,t),r=e.slice(t+1);if(!/^[0-9a-f]{8}$/.test(r))return null;let i;try{i=decodeURIComponent(escape(atob(n)))}catch{return null}if(dl(i).toString(16).padStart(8,`0`)!==r)return null;try{let e=JSON.parse(i);return typeof e!=`object`||!e||!e.resources||!e.currentScene||!e.meta||!e.runStats?null:(e.itemLevels||={},e.ap??=3,e.runStats.kills??(e.runStats.kills=0),e.runStats.signinStreak??(e.runStats.signinStreak=0),e.meta.unlockedAchievements||(e.meta.unlockedAchievements=[]),e.economy||={currency:0,customAmount:0,tradeHistory:[],marketPrices:{},unlockedMerchants:[`wandering_trader`]},typeof e.runStats.kills!=`number`&&(e.runStats.kills=0),typeof e.runStats.signinStreak!=`number`&&(e.runStats.signinStreak=0),e.meta.unlockedAchievements||(e.meta.unlockedAchievements=[]),e.base||=ds(),e)}catch{return null}}var gl={ch1_mist_rule:{id:`ch1_mist_rule`,text:`你在便利店的角落里找到了一本日记。

封面已经被雨水泡得发软，但里面的字迹还能辨认。日记的主人似乎是一个比你早来几天的幸存者。

"第1天：雾来了。我看不见任何东西，只能听到声音。"
"第2天：我发现了一个规律——雾里的东西是靠声音捕猎的。你越安静，它越找不到你。"
"第3天：我看到了它。不是野兽，是某种……更巨大的东西。它在雾里移动，像一座山。"
"第4天：我听到了广播。有人在说'安全区'。但我不确定那是不是陷阱。"
"第5天：我快死了。如果有人看到这本日记，记住——不要在雾里大喊。不要在凌晨三点外出。不要相信你在雾里看到的任何人。"

日记到这里就断了。最后一页有一个暗红色的手印。

你把日记揣进兜里。雾里的低语声还在，但你现在知道了——它们是靠声音捕猎的。`,choices:[{id:`keep_quiet`,text:`记住这个规则，以后行动尽量安静`,hint:`获得'迷雾规则'知识。未来探索时遭遇怪物概率降低。`,effects:[{kind:`flag`,flag:`knows_mist_rule`},{kind:`resource`,resource:`sanity`,delta:-3}],next:`ch1_shelter`,result:`你把日记里的规则牢牢记在心里。雾里的东西靠声音捕猎——这意味着你以后行动时必须更加小心。

但这也意味着，如果你足够安静，你可以在雾里自由移动。`},{id:`test_rule`,text:`大声喊叫，测试这个规则是不是真的`,hint:`危险！可能吸引怪物。但如果规则是真的，你会获得更深刻的理解。`,effects:[{kind:`flag`,flag:`tested_mist_rule`},{kind:`resource`,resource:`sanity`,delta:-10}],next:`ch1_shelter`,result:`你深吸一口气，然后大喊了一声。

声音在雾里回荡，然后……安静了。

三秒后，你听到了。雾的深处传来了什么东西移动的声音。很慢，很沉重，像是一座山在走。它在朝你这边来。

你吓得捂住嘴，蹲在货架后面，一动不动。

那个声音在便利店门口停了很久。你能感觉到它在"看"你，即使你看不见它。

最终，它走了。

你瘫在地上，浑身是汗。规则是真的。雾里的东西靠声音捕猎。而你刚才，差点把它引过来。

【获得成就：迷雾规则的验证者】"`},{id:`ignore_diary`,text:`这可能是陷阱，不相信日记的内容`,hint:`不获得迷雾规则知识。但保留了怀疑精神。`,effects:[{kind:`flag`,flag:`distrusts_diary`},{kind:`resource`,resource:`sanity`,delta:2}],next:`ch1_shelter`,result:`你把日记扔回角落。谁知道这是不是什么东西设下的陷阱？在这个鬼地方，相信陌生人的话才是最蠢的。

但你走出便利店的时候，还是下意识地放轻了脚步。`}]},ch1_shelter:{id:`ch1_shelter`,text:`你沿着小路继续走，雾渐渐稀薄了一些。

在一片小树林的边缘，你发现了一座小木屋。比你醒来的那间更结实，门是关着的，窗户上钉着木板。

你推开门，里面空荡荡的，但很干净。角落里有一堆干柴，墙上挂着一把生锈的斧头。

这是一个可以住的地方。

你走到窗边，透过木板的缝隙往外看。雾还在，但这里的雾似乎比其他地方淡一些。你能听到远处有鸟叫——至少这里还有活物。

太阳开始下山了。你必须在天黑之前做好准备。`,choices:[{id:`secure_door`,text:`先用东西把门顶住，确保安全`,effects:[{kind:`item`,item:`wood`,amount:2},{kind:`flag`,flag:`shelter_secured`}],next:`start`,result:`你把屋里的一张破桌子推到门后，又用几根木柴卡住门缝。虽然不能挡住什么厉害的东西，但至少普通的野兽撞不开。

你靠在墙上，松了一口气。至少今晚，你有一个相对安全的地方了。

【序章结束。你正式开始了在迷雾世界的生存。】`},{id:`collect_firewood`,text:`先去捡些柴火，今晚要生火`,effects:[{kind:`item`,item:`wood`,amount:5},{kind:`resource`,resource:`energy`,delta:-10}],next:`start`,result:`你在小屋周围捡了一些干柴，又用斧头砍了几根枯枝。天快黑了，你必须在完全黑下来之前回去。

你抱着柴火回到小屋，用打火机（你在便利店找到的）生了一堆火。

火光跳动着，驱散了一些寒意。你看着火，感觉自己终于有了一点活着的实感。

【序章结束。你正式开始了在迷雾世界的生存。】`},{id:`explore_more`,text:`趁天还没黑，再探索一下周围`,hint:`可能找到更多物资，但也可能遇到危险。`,effects:[{kind:`resource`,resource:`energy`,delta:-15},{kind:`resource`,resource:`sanity`,delta:-5}],next:`start`,result:`你决定再探索一下周围。

你在小屋后面发现了一个小菜园——虽然已经荒芜了，但还能看到一些耐寒的蔬菜。你拔了几根胡萝卜，又在菜园角落发现了一把生锈的铁锹。

但就在你准备回去的时候，你听到了什么。

不是雾里的低语，是……脚步声。人的脚步声。

你蹲在菜园的篱笆后面，屏住呼吸。

一个人影从雾里走出来。是个男人，身材魁梧，手里拿着一把砍刀。他走到小屋门口，停了一下，然后推开门走了进去。

你的心跳加速了。有人在你的小屋里。

你蹲在篱笆后面，思考着该怎么办。进去？还是等他出来？

最终，你决定先观察。你蹲在那里，直到天完全黑下来。那个男人没有出来。

你只能绕到小屋后面，从窗户翻了进去。

屋里没人。火已经生好了，桌上放着一些干粮。

那个男人……不见了。

你打了个寒颤。这地方，比你想象的更奇怪。

【序章结束。你正式开始了在迷雾世界的生存。】

【伏笔：神秘的男人。他是谁？为什么会出现在这里？】`}]},old_k_meet:{id:`old_k_meet`,text:`你在探索废墟的时候，听到了一声闷响。

像是有人在砸什么东西。

你循着声音走过去，在一栋半塌的建筑里，看到了一个男人。

他大约四十多岁，身材魁梧，满脸胡茬，左臂上有一道长长的旧伤疤。他正用一把砍刀砍着一扇卡住的铁门，每一下都很用力，但很有节奏。

他穿着一件破旧的工装，腰间别着一把匕首，背上背着一个鼓鼓囊囊的背包。看起来像是一个在这鬼地方活了很久的人。

你不小心踩碎了一块玻璃。

男人猛地转过身，砍刀指向你。他的眼神很警惕，像是一只被惊扰的野兽。

"谁？"他的声音沙哑，像是很久没跟人说过话了。

你举起手，表示自己没有恶意。

男人盯着你看了很久，然后慢慢放下砍刀。"活人。"他嘟囔了一句，"我还以为这附近只有我一个了。"

他转过身，继续砸那扇铁门。"你要是想活，就别站在那儿。过来帮忙。"`,choices:[{id:`help_him`,text:`过去帮忙砸门`,hint:`获得老K的初步信任。可能找到物资。`,effects:[{kind:`flag`,flag:`helped_old_k`},{kind:`resource`,resource:`energy`,delta:-15}],next:`old_k_after_help`,result:`你走过去，捡起地上的一根钢筋，和他一起砸那扇铁门。

他看了你一眼，没说话，但动作慢了一些，像是在给你留力。

砸了大约十分钟，铁门终于开了。里面是一个小仓库，堆着一些罐头和瓶装水。

男人吹了声口哨。"运气不错。"他转身看着你，"你叫什么？"

你告诉他你的名字。

"老K。"他指了指自己，"别人都这么叫我。"

他从仓库里拿出两罐罐头，扔给你一罐。"分你一半。算是帮忙的报酬。"

你接过罐头，注意到他的手在微微发抖。不是因为冷，是因为……某种压抑的情绪。

"你一个人？"老K问。

你点点头。

老K沉默了一会儿，然后说："这附近不太安全。晚上有东西出来。你要是没地方去，可以到我那儿凑合一晚。"

他顿了顿，又补充道："别误会，我不是什么好人。只是……一个人待久了，有点烦。"`},{id:`keep_distance`,text:`保持距离，观察他`,hint:`不获得信任，但更安全。可以观察他的行为。`,effects:[{kind:`flag`,flag:`observed_old_k`},{kind:`resource`,resource:`sanity`,delta:-3}],next:`old_k_observe`,result:`你靠在墙上，看着他砸门。

他砸了一会儿，停下来，回头看你。"你不打算帮忙？"

你摇摇头。

老K嗤笑了一声。"行，有警惕心是好事。在这鬼地方，太热心的人死得快。"

他继续砸门，你继续观察。

你注意到，他砸门的时候，左臂的动作有些僵硬——那道旧伤疤可能影响了他的活动。而且，他每隔几分钟就会下意识地摸一下腰间的匕首，像是在确认它还在。

这是一个在危险中活了很久的人的习惯。

铁门开了。老K走进去，拿了一些罐头和水，然后走出来。

他看了你一眼，扔给你一罐罐头。"拿着。虽然你没帮忙，但我不喜欢欠人情——你刚才没有趁我砸门的时候偷袭我，这就够了。"

你接过罐头。

老K背起背包，准备离开。"我叫老K。这附近不太安全，你要是晚上听到什么动静，别出来看。"

他走了几步，又停下来。"对了，如果你想找个伴儿，明天这个时候，我还会来这儿。"

他没等你回答，就走进了雾里。"`},{id:`leave_quietly`,text:`悄悄离开，不跟他接触`,hint:`最安全的选择。但错过老K这个NPC。`,effects:[{kind:`flag`,flag:`avoided_old_k`},{kind:`resource`,resource:`sanity`,delta:2}],next:`start`,result:`你悄悄退了回去。

在这个鬼地方，跟陌生人接触是最危险的事。你不知道他是不是好人，也不知道他会不会在你背后捅刀子。

你绕了一大圈，回到了自己的小屋。

但那天晚上，你躺在冰冷的地板上，听着外面雾里的低语声，突然觉得有点孤独。

那个男人……应该也是一个人吧。

你摇了摇头，把这个念头赶出脑海。在迷雾世界里，活着才是最重要的。其他的，都不重要。`}]},old_k_after_help:{id:`old_k_after_help`,text:`你跟着老K来到了他的住处。

那是一个地下室，入口藏在一堆废墟下面。里面很暗，但很干燥，角落里堆着一些木柴和干粮。

老K点了一盏煤油灯，昏黄的光照亮了整个地下室。

你注意到，墙上贴着一张地图，上面用红笔圈了几个地方。旁边写着一些字："水源"、"危险"、"不要去"、"她可能在这儿"。

"她"是谁？

老K注意到你的视线，走过去把地图翻了过去。"别看了。"他的声音有些低沉，"一些过去的事。"

他从背包里拿出一些干粮，放在地上。"吃吧。明天天亮你就走。"

你坐下来，吃着罐头。老K坐在对面，看着煤油灯的火焰发呆。

"你有家人吗？"你问。

老K的手顿了一下。"有过。"他说，"迷雾来的时候，我和她们走散了。"

他沉默了一会儿，又说："我女儿叫小雨。那年她七岁。迷雾来的前一天，她还跟我说，爸爸，明天我们去游乐园好不好？"

他的声音开始发抖。"我说好。但第二天，迷雾就来了。"

地下室里很安静，只有煤油灯燃烧的噼啪声。

"我找了她三年。"老K说，"找遍了这附近所有的地方。但我没找到她。"

他抬起头，看着你。他的眼睛红了，但没有流泪。"你说，她会不会还活着？"

这是一个你无法回答的问题。`,choices:[{id:`comfort_him`,text:`安慰他，说她一定还活着`,hint:`老K好感度大幅提升。但这可能是一个谎言。`,effects:[{kind:`flag`,flag:`comforted_old_k`},{kind:`resource`,resource:`sanity`,delta:-5}],next:`start`,result:`你看着他的眼睛，说："她一定还活着。在这鬼地方，只要活着，就有希望。"

老K盯着你看了很久，然后露出了一个很勉强的笑容。"谢谢你。"他说，"我知道你可能只是在安慰我。但……谢谢你。"

那天晚上，老K跟你说了很多。他说他以前是个建筑工人，没什么文化，但他女儿很聪明，总是问他一些他答不上来的问题。

"她说她长大要当科学家。"老K说，"研究这雾到底是什么。"

你躺在地下室的角落里，听着老K的鼾声，看着天花板。

你不知道他女儿是不是还活着。但你知道，从今天起，这个沉默的男人，把你当成了可以信任的人。

【老K关系：战友。他会在你遇到危险的时候帮助你。】"`},{id:`be_honest`,text:`诚实地说，你不知道`,hint:`老K好感度小幅提升。他会欣赏你的诚实。`,effects:[{kind:`flag`,flag:`honest_to_old_k`},{kind:`resource`,resource:`sanity`,delta:-3}],next:`start`,result:`你沉默了一会儿，然后说："我不知道。但在这鬼地方，什么都有可能。"

老K愣了一下，然后笑了。这一次，他的笑容真实了一些。"你是个诚实的人。"他说，"在这鬼地方，诚实的人不多。"

他从口袋里掏出一张照片，递给你。照片上是一个小女孩，扎着两个小辫子，笑得很开心。

"这是小雨。"老K说，"如果你以后看到她，或者听到她的消息……告诉我。"

你接过照片，点了点头。

那天晚上，你躺在地下室的角落里，看着老K的背影。他坐在煤油灯旁边，一遍又一遍地抚摸着那张照片。

你突然觉得，在这个迷雾世界里，每个人都有自己的故事。每个人都在失去，每个人都在寻找。

【老K关系：可信赖的同伴。他会在你遇到危险的时候帮助你。】

【获得任务：寻找小雨。老K的女儿，七岁，扎着两个小辫子。】"`},{id:`ask_about_map`,text:`问他地图上圈的地方是什么`,hint:`可能获得重要情报。但可能触及他的隐私。`,effects:[{kind:`flag`,flag:`asked_about_map`},{kind:`resource`,resource:`sanity`,delta:-8}],next:`start`,result:`你指了指墙上的地图，问："那些圈出来的地方是什么？"

老K的脸色变了。"我说了，别看。"他的声音有些冷。

你没有退缩。"那些地方有什么？"你追问，"是不是跟你女儿有关？"

老K猛地站起来，走到你面前。他比你高一个头，居高临下地看着你。"你话太多了。"他说。

你看着他的眼睛，没有退缩。

老K和你对视了很久，然后叹了口气，坐了回去。

"那些地方，"他说，"是我找到过她痕迹的地方。"

他指着地图上最北边的一个圈。"这儿，我找到了她的一只鞋。"

他又指着东边的一个圈。"这儿，我找到了她画的一幅画。画的是我们一家三口。"

他的声音开始发抖。"但每次我赶到的时候，她都已经走了。像是有人在带着她移动。"

"有人？"你问。

老K抬起头，看着你。他的眼睛里有一种你看不懂的情绪。"我不确定。"他说，"但我总觉得，有什么东西在雾里。它……在看着我们。"

你打了个寒颤。

"所以，"老K说，"如果你想活，就别去那些圈出来的地方。至少，别一个人去。"

那天晚上，你躺在地下室的角落里，怎么也睡不着。

你一直在想老K说的话。有什么东西在雾里？它在看着我们？

【获得重要情报：迷雾中可能有某种智慧存在。】

【获得地图标记：老K找到女儿痕迹的地方。】

【老K关系：复杂。他信任你，但也对你的追问有些警惕。】"`}]},old_k_observe:{id:`old_k_observe`,text:`你决定第二天再去那个地方看看。

第二天，你在约定的时间到了那栋建筑。老K已经在那儿了，正在整理他的背包。

"你来了。"他看了你一眼，"我还以为你不会来。"

你走过去，帮他整理背包。

"你一个人活了多久？"你问。

老K想了想。"三年。"他说，"迷雾来的那天起，我就一个人。"

他顿了顿，又说："其实也不是完全一个人。中间遇到过几个人。但……都没活下来。"

他的声音很平静，像是在说一件很普通的事。但你注意到，他说"都没活下来"的时候，手紧紧地攥成了拳头。

"你呢？"他问，"你一个人活了多久？"

你告诉他你的情况。

老K点点头。"能活下来的，都不是普通人。"他说，"在这鬼地方，要么够强，要么够聪明，要么……够狠。"

他看着你。"你是哪一种？"

这是一个试探。`,choices:[{id:`say_strong`,text:`说自己够强`,hint:`老K会欣赏你的自信。但可能会考验你。`,effects:[{kind:`flag`,flag:`claimed_strong`},{kind:`resource`,resource:`sanity`,delta:-2}],next:`start`,result:`你挺直了腰板，说："我够强。"

老K盯着你看了一会儿，然后笑了。"好。"他说，"那我就看看你有多强。"

他从背包里拿出一把砍刀，扔给你。"明天，跟我去一个地方。那儿有不少物资，但也有不少'东西'。"

他指了指地图上的一个圈。"敢不敢去？"

你接过砍刀，点了点头。

老K笑了。"好。我就喜欢有胆子的人。"

【老K关系：初步信任。他会带你去危险的地方找物资。】

【获得任务：和老K一起去探索危险区域。】"`},{id:`say_smart`,text:`说自己够聪明`,hint:`老K会欣赏你的智慧。可能会跟你分享情报。`,effects:[{kind:`flag`,flag:`claimed_smart`},{kind:`resource`,resource:`sanity`,delta:-2}],next:`start`,result:`你想了想，说："我够聪明。"

老K挑了挑眉。"哦？"他说，"那我问你一个问题。"

他指了指地图。"如果你要在这鬼地方长期生存，你会选哪儿当据点？"

你看着地图，思考了一会儿。

"这儿。"你指了指地图中间的一个地方，"靠近水源，地势高，易守难攻。而且周围有废墟，可以找物资。"

老K盯着你指的地方，沉默了很久。

"你知道吗？"他说，"我选的据点，也是这儿。"

他抬起头，看着你。"你确实够聪明。"他说，"在这鬼地方，聪明比强壮更重要。"

他从背包里拿出一张纸，递给你。上面画着更详细的地图，标注了水源、危险区域、和一些你看不懂的符号。

"这是我三年来收集的情报。"老K说，"本来我不会给任何人看。但你……值得信任。"

【老K关系：深度信任。他会跟你分享重要情报。】

【获得物品：老K的详细地图。】"`},{id:`say_neither`,text:`说自己既不够强也不够聪明，只是运气好`,hint:`老K会觉得你很诚实。可能会产生共鸣。`,effects:[{kind:`flag`,flag:`claimed_lucky`},{kind:`resource`,resource:`sanity`,delta:3}],next:`start`,result:`你苦笑了一下，说："我既不够强，也不够聪明。我只是……运气好。"

老K愣了一下，然后哈哈大笑。这是你第一次看到他笑得这么开心。

"运气好？"他说，"在这鬼地方，运气好就是最大的本事。"

他拍了拍你的肩膀。"我跟你说，我见过太多自以为是的人。他们觉得自己够强，够聪明，结果呢？都死了。"

他指了指外面的雾。"这鬼地方，不看你有多强，也不看你有多聪明。它看的是……你能不能活到明天。"

他从背包里拿出一罐罐头，扔给你。"拿着。运气好的人，应该多吃点。"

你接过罐头，看着老K。他的眼神里有一种你看不懂的情绪——像是羡慕，又像是……释然。

"我女儿也说过类似的话。"老K说，"她说，爸爸，我们运气真好，总能找到好吃的。"

他的声音有些哽咽。"那时候我还不信运气。现在……我信了。"

【老K关系：情感共鸣。他把你当成了可以倾诉的人。】

【获得伏笔：老K的女儿小雨。】"`}]},beast_wave_1_warning:{id:`beast_wave_1_warning`,text:`第六天的晚上，你听到了不对劲的声音。

不是雾里的低语，而是……某种更原始的声音。

像是很多只野兽在嚎叫。

你走到窗边，透过木板的缝隙往外看。雾比平时更浓了，而且……在流动。

像是有什么东西在雾里移动，很多东西。

你听到了脚步声。不是一个，是很多个。从四面八方传来，越来越近。

你的心跳加速了。

你想起了老K说过的话——"这附近不太安全。晚上有东西出来。"

但这不是"有东西出来"这么简单。这是……兽潮。

你只有一晚上的时间准备。明天天亮的时候，它们就会到。`,choices:[{id:`fortify_shelter`,text:`加固庇护所，准备防守`,hint:`提升防御。需要木材和工具。`,effects:[{kind:`flag`,flag:`fortified_for_beast_wave`},{kind:`resource`,resource:`energy`,delta:-20}],next:`beast_wave_1_prep`,result:`你开始疯狂地加固庇护所。

你用木柴卡住门缝，用桌子顶住门，又用斧头把窗户钉得更结实。你在门口挖了一个简单的陷阱，又在屋里准备了一些可以当武器的东西。

忙了一整夜，你累得几乎站不住。但看着加固后的庇护所，你感觉安心了一些。

至少，你不是毫无准备。`},{id:`find_old_k`,text:`去找老K，跟他一起防守`,hint:`需要老K关系达到一定程度。两个人一起防守更容易。`,effects:[{kind:`flag`,flag:`asked_old_k_for_help`},{kind:`resource`,resource:`energy`,delta:-15}],next:`beast_wave_1_prep`,result:`你冲出小屋，朝老K的住处跑去。

雾很浓，你几乎看不见路。但你记住了方向，一路跌跌撞撞地跑到了老K的地下室入口。

你敲了敲门。

老K打开门，看到是你，皱了皱眉。"怎么了？"

"兽潮。"你说，"明天就到。"

老K的脸色变了。他一把把你拉进地下室，然后关上门。

"你确定？"他问。

你点点头。"我听到了。很多只。"

老K沉默了一会儿，然后开始收拾东西。"行。"他说，"我们一起守。"

他从角落里拿出一把长矛，又拿出几把砍刀。"你的据点在哪儿？"

你告诉他位置。

老K想了想。"那儿地势不错。"他说，"易守难攻。我们去那儿。"

他背起背包，又拿起一盏煤油灯。"走。趁它们还没到。"

你们在雾里穿行，花了大约半个小时才回到你的小屋。

老K看了一眼你的小屋，摇了摇头。"太简陋了。"他说，"来，我们加固一下。"

那一晚，你们两个一起加固了庇护所。老K很有经验，他教你怎么设置陷阱，怎么利用地形，怎么节省体力。

"记住，"他说，"兽潮的时候，不要想着杀光它们。你只要守住，等它们退走就行。"

你点点头。

【老K加入防守。兽潮难度降低。】"`},{id:`run_away`,text:`放弃庇护所，逃跑`,hint:`最危险的选择。在雾里逃跑可能遇到更多危险。`,effects:[{kind:`flag`,flag:`ran_from_beast_wave`},{kind:`resource`,resource:`sanity`,delta:-15},{kind:`resource`,resource:`energy`,delta:-25}],next:`beast_wave_1_run`,result:`你决定逃跑。

你收拾了一些必需品，然后冲出小屋，朝雾里跑去。

但你不知道该往哪儿跑。雾太浓了，你根本看不见路。

你跑了大约半个小时，然后听到了什么。

不是兽潮的声音。是……某种更大的东西。

你停下来，屏住呼吸。

那个声音越来越近。像是一座山在移动。

你想起了便利店日记里写的话——"我看到了它。不是野兽，是某种更巨大的东西。"

它来了。

你蹲在一棵大树后面，浑身发抖。

那个东西从你面前走过。你看不见它的全貌，只能看到……一条腿。一条比树还粗的腿。

它走了很久，才完全过去。

你瘫在地上，大口喘着气。

你活下来了。但你的庇护所没了，你的物资没了。你一无所有。

而且，你不知道那个东西还会不会回来。

【兽潮事件结束。你活下来了，但失去了庇护所和大部分物资。】

【获得创伤：迷雾巨兽的阴影。理智上限永久降低5点。】"`}]},beast_wave_1_prep:{id:`beast_wave_1_prep`,text:`天亮了。

雾比平时更浓，你几乎看不见五米外的东西。

但你能听到。

脚步声，嚎叫声，还有某种东西刮擦地面的声音。

它们来了。

你握紧了手里的武器。老K站在你旁边（如果他在的话），表情严肃。

"记住，"老K说（如果他在的话），"不要冲出去。守住门口就行。它们不会一直攻的，等它们累了，就会退走。"

你点点头。

然后，你看到了第一只。

那是一只……你不知道该怎么形容。它看起来像是一只狼，但比狼大两倍，皮肤是灰白色的，眼睛在雾里发着红光。

它看到了你，发出一声嚎叫，然后冲了过来。

兽潮，开始了。`,choices:[{id:`fight_at_door`,text:`守在门口，一只一只地打`,hint:`最稳妥的战术。利用门口的狭窄地形。`,effects:[{kind:`flag`,flag:`fought_at_door`},{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`energy`,delta:-30}],next:`beast_wave_1_result`,result:`你守在门口，利用狭窄的地形，一只一只地打。

第一只冲过来，你一刀砍在它的头上。它发出一声惨叫，倒在地上。

第二只，第三只，第四只……

你不知道砍了多少只。你的手臂酸得几乎抬不起来，你的刀已经卷了刃，你的身上全是血——有它们的，也有你的。

但你没有退。

老K在你旁边（如果他在的话），帮你挡住了从侧面冲过来的野兽。他的刀法很稳，每一刀都砍在要害上。

"坚持住！"他喊，"它们快退了！"

你咬着牙，继续砍。

终于，在你几乎要虚脱的时候，嚎叫声渐渐远了。

它们退了。

你靠在墙上，大口喘着气。你活下来了。

地上躺着十几只野兽的尸体。你的庇护所虽然到处都是血，但还在。

【兽潮事件结束。你成功防守！】"`},{id:`use_traps`,text:`利用陷阱，先消耗它们的数量`,hint:`需要提前设置陷阱。减少正面战斗的压力。`,effects:[{kind:`flag`,flag:`used_traps`},{kind:`resource`,resource:`health`,delta:-8},{kind:`resource`,resource:`energy`,delta:-20}],next:`beast_wave_1_result`,result:`你躲在屋里，听着外面的动静。

第一只野兽踩到了你设的陷阱，发出一声惨叫。

第二只，第三只……

你设的陷阱不多，但足够让它们混乱一阵子。

等它们终于冲到门口的时候，数量已经少了一半。

你冲出去，对着受伤的野兽一阵砍杀。

战斗比你想象的轻松。大部分野兽都受了伤，行动不便，你几乎没费什么力气就解决了它们。

但最后一只，是一只特别大的。它没有踩到陷阱，直接冲到了门口。

你和它缠斗了很久，最终在老K的帮助下（如果他在的话），才把它杀死。

你靠在墙上，看着满地的野兽尸体。

你活下来了。而且，因为用了陷阱，你受的伤比预想的轻很多。

【兽潮事件结束。你成功防守！陷阱战术有效！】`},{id:`burn_them`,text:`用火攻，把它们挡在外面`,hint:`需要火源和易燃物。可能会烧毁庇护所。`,effects:[{kind:`flag`,flag:`used_fire`},{kind:`resource`,resource:`health`,delta:-5},{kind:`resource`,resource:`energy`,delta:-15}],next:`beast_wave_1_result`,result:`你把屋里的木柴都搬了出来，在门口点了一堆火。

火焰在雾里跳动着，驱散了一些寒意。

第一只野兽冲到门口，被火焰吓了一跳，退了回去。

第二只，第三只……

它们在火外面徘徊，嚎叫着，但不敢冲过来。

你靠在墙上，看着火焰，松了一口气。

但火很快就小了。你的木柴不够多。

就在火焰快要熄灭的时候，一只特别大的野兽冲了过来。它不怕火，直接从火焰上踩了过去。

你吓得跳起来，拿起武器就砍。

那只野兽很强，你和它缠斗了很久，最终在老K的帮助下（如果他在的话），才把它杀死。

战斗结束后，你看着门口的一片狼藉。火灭了，但大部分野兽也退了。

你活下来了。但你的门口被烧得漆黑，屋里到处都是烟味。

【兽潮事件结束。你成功防守！火攻战术有效！】`}]},beast_wave_1_result:{id:`beast_wave_1_result`,text:`兽潮退了。

你靠在墙上，大口喘着气。你的身上全是血，你的手臂酸得几乎抬不起来，但你活下来了。

老K（如果他在的话）坐在你旁边，也在喘气。"行啊，"他说，"你比我想象的能打。"

你勉强笑了笑。

你看着满地的野兽尸体。这些东西……是什么？它们看起来像是狼，但又不完全是。它们的皮肤是灰白色的，眼睛在雾里发着红光。

你蹲下来，仔细看了看其中一只。它的嘴里有两排牙齿，像是鲨鱼一样。它的爪子很长，很锋利，能轻易撕开皮肉。

"这些东西，"老K说（如果他在的话），"不是普通的野兽。它们是……被雾改变的东西。"

你抬起头，看着他。

"我见过很多次了。"老K说，"迷雾来的第一年，它们还只是普通的野兽。但第二年，它们就开始变了。变得更大，更凶，更……不像活物。"

他指了指那些野兽的眼睛。"看到了吗？它们的眼睛是红的。普通野兽的眼睛不是这样的。"

你打了个寒颤。

"但它们也有弱点。"老K说，"它们怕火，怕声音，怕……某种东西。我还没搞清楚那是什么。"

他站起来，拍了拍身上的灰。"行了，别想了。先把这些尸体处理掉。不然会引来更多的东西。"

你点点头，开始帮忙处理尸体。

但你心里一直在想老K说的话。

被雾改变的东西。

这雾……到底是什么？`,choices:[{id:`collect_materials`,text:`收集野兽的材料（皮、牙、爪）`,hint:`获得珍贵材料。可以用来制作装备。`,effects:[{kind:`item`,item:`beast_pelt`,amount:5},{kind:`item`,item:`beast_claw`,amount:10},{kind:`item`,item:`beast_tooth`,amount:8}],next:`start`,result:`你花了几个小时，把野兽的皮、牙、爪都剥了下来。

这些东西很有用。兽皮可以做护甲，兽爪可以做武器，兽牙可以做装饰品或者交易。

你把它们收好，然后继续处理尸体。

【获得材料：兽皮×5、兽爪×10、兽牙×8】

【第一次兽潮事件圆满结束！】`},{id:`ask_old_k_more`,text:`问老K更多关于迷雾的事`,hint:`需要老K在场。获得更多关于迷雾的情报。`,effects:[{kind:`flag`,flag:`asked_about_mist`},{kind:`resource`,resource:`sanity`,delta:-5}],next:`start`,result:`你走到老K旁边，问他："你说这些野兽是被雾改变的。那……人呢？人会不会也被雾改变？"

老K沉默了很久。

"会。"他说，"我见过。"

他的声音很低。"迷雾来的第二年，我遇到了一个人。他说他是从一个安全区逃出来的。他说，安全区里的人，开始变了。"

"变成什么样？"你问。

老K看着你。"他们的眼睛开始变红。他们开始变得……暴躁。他们开始吃生肉。"

你打了个寒颤。

"后来呢？"你问。

"后来，"老K说，"那个安全区的人，都变成了和这些野兽一样的东西。"

他指了指地上的野兽尸体。"或者说，比这些更可怕。"

你沉默了很久。

"那我们……会不会也变？"你问。

老K看着你，眼神很复杂。"我不知道。"他说，"但我知道，在这鬼地方待得越久，就越不像人。"

他站起来，拍了拍你的肩膀。"别想太多。先活下来再说。"

你点点头，但你心里一直在想他说的话。

在这鬼地方待得越久，就越不像人。

那你……还能算人吗？

【获得重要情报：迷雾会改变人类。长期暴露在迷雾中可能导致变异。】

【获得伏笔：安全区的变异。老K提到的安全区在哪儿？】

【第一次兽潮事件结束！】"`},{id:`rest_and_recover`,text:`先休息，恢复体力`,hint:`恢复体力和健康。但可能错过收集材料的机会。`,effects:[{kind:`resource`,resource:`health`,delta:10},{kind:`resource`,resource:`energy`,delta:30},{kind:`resource`,resource:`sanity`,delta:5}],next:`start`,result:`你靠在墙上，闭上眼睛。

你太累了。战斗了一整夜，你的身体几乎到了极限。

老K（如果他在的话）给你倒了一杯水，然后坐在旁边守着。

你睡了大约四个小时。醒来的时候，感觉好多了。

但你注意到，那些野兽的尸体已经开始发臭了。你必须尽快处理掉它们，不然会引来更多的东西。

你站起来，伸了个懒腰。

至少，你活过了第一次兽潮。

【恢复：健康+10、体力+30、理智+5】

【第一次兽潮事件结束！】`}]},beast_wave_1_run:{id:`beast_wave_1_run`,text:`你在雾里跑了很久。

你不知道自己跑到了哪儿。雾太浓了，你根本看不见路。

但你能听到。兽潮的声音渐渐远了。你安全了。

你靠在一棵树上，大口喘着气。你的腿很酸，你的肺很痛，但你活下来了。

你环顾四周。这里是一片你从没来过的树林。树木很高，很密，雾在树林里流动着，像是某种活物。

你必须找到回去的路。或者，找到一个新的庇护所。

你在树林里走了大约一个小时，然后发现了一个山洞。

洞口很小，刚好能容一个人爬进去。里面很暗，但很干燥。你爬进去，发现里面比你想象的大。

这是一个可以暂时藏身的地方。

你靠在洞壁上，闭上眼睛。

你活下来了。但你失去了庇护所，失去了大部分物资。你一无所有。

而且，你不知道明天会怎么样。`,choices:[{id:`stay_in_cave`,text:`暂时待在山洞里，恢复体力`,hint:`安全的选择。但物资短缺。`,effects:[{kind:`flag`,flag:`stayed_in_cave`},{kind:`resource`,resource:`energy`,delta:20},{kind:`resource`,resource:`sanity`,delta:-5}],next:`start`,result:`你在山洞里待了一天。

你吃了最后一点干粮，喝了最后一点水。然后你躺在洞壁上，看着洞口的雾。

你不知道自己还能撑多久。但至少，你还活着。

【兽潮事件结束。你活下来了，但失去了庇护所和大部分物资。】

【新庇护所：山洞。条件简陋，但暂时安全。】`},{id:`try_find_way_back`,text:`尝试找到回去的路`,hint:`危险的选择。可能迷路，可能遇到危险。`,effects:[{kind:`flag`,flag:`tried_find_way_back`},{kind:`resource`,resource:`energy`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-10}],next:`start`,result:`你爬出山洞，开始寻找回去的路。

但雾太浓了，你根本分不清方向。你走了很久，越走越远。

你开始慌了。你不知道自己在哪儿，也不知道该往哪儿走。

就在你几乎要绝望的时候，你看到了一个熟悉的东西。

是你小屋门口的那棵树。

你找到了回去的路！

你跑回小屋，发现它还在。虽然到处都是野兽的脚印，但没有被破坏。

你推开门，走进去，瘫在地上。

你活下来了。而且，你找回了你的庇护所。

但你知道，下一次兽潮来的时候，你不能再跑了。你必须学会防守。

【兽潮事件结束。你活下来了，并且找回了庇护所。】

【获得教训：逃跑不是长久之计。下次兽潮，你必须防守。】`}]}},_l=[{id:`phase1_strange_sound`,text:`奇怪的声音`,minDay:2,weight:10,maxTriggers:1,choices:[{id:`investigate`,text:`循着声音去看看`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],result:`你循着声音走了过去。

声音越来越近，越来越清晰。那确实是歌声，但歌词你听不懂。像是某种古老的语言，又像是……某种你不该听到的东西。

你走到一片空地，声音停了。

空地上什么都没有。只有一棵枯树，和树下的一堆石头。

你蹲下来，仔细看了看那些石头。它们被摆成了某种图案，像是……一个祭坛。

你打了个寒颤，赶紧离开了。

【获得发现：迷雾中的神秘祭坛。】

【理智-8】`,next:`__return__`},{id:`ignore`,text:`不去管它，继续探索`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],result:`你摇了摇头，继续探索。

但那声音一直在你耳边回响，挥之不去。

你不知道那是什么，但你知道，在这鬼地方，好奇心是会害死猫的。

【理智-2】`,next:`__return__`}]},{id:`phase1_abandoned_camp`,text:`废弃的营地`,minDay:3,weight:8,maxTriggers:1,choices:[{id:`search_camp`,text:`搜索营地，看看有没有物资`,effects:[{kind:`item`,item:`food`,amount:8},{kind:`item`,item:`water`,amount:6},{kind:`resource`,resource:`sanity`,delta:-5}],result:`你在营地里搜索了一番。

你找到了一些罐头和瓶装水，还有一把生锈的匕首。

但你也发现了一些不对劲的地方。帐篷里的东西很整齐，不像是匆忙离开的样子。火堆旁边有两个杯子，里面的水还没喝完。

就像是……他们只是出去了一下，马上就会回来。

但你知道，他们不会回来了。

你打了个寒颤，拿着物资赶紧离开了。

【获得物资：食物×8、水×6、匕首×1】

【理智-5】`,next:`__return__`},{id:`leave_quickly`,text:`这地方不对劲，赶紧离开`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],result:`你看了一眼营地，决定离开。

这地方太不对劲了。在这鬼地方，无缘无故消失的人，比死掉的人更可怕。

你快步离开了营地，心里暗暗发誓，以后再也不来这个地方了。

【理智+2】`,next:`__return__`}]},{id:`phase1_radio_signal`,text:`无线电信号`,minDay:4,weight:5,maxTriggers:1,choices:[{id:`listen`,text:`仔细听无线电里的内容`,effects:[{kind:`flag`,flag:`heard_radio_signal`},{kind:`resource`,resource:`sanity`,delta:-10}],result:`你把无线电凑到耳边，仔细听。

……安全区……坐标……北纬……东经……

声音断断续续的，你只听清了几个词。

……不要相信……红眼睛的人……他们已经……

然后，无线电就没声了。

你握着无线电，手心全是汗。

安全区。坐标。红眼睛的人。

这些词是什么意思？

你想起了老K说过的话——"安全区里的人，开始变了。他们的眼睛开始变红。"

你打了个寒颤。

【获得重要情报：有一个安全区。坐标在北纬和东经的某个地方。但那里的人……可能已经变异了。】

【获得物品：破旧的无线电】

【理智-10】"`,next:`__return__`},{id:`destroy_radio`,text:`这东西太邪门了，砸了它`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],result:`你看着无线电，越想越害怕。

在这鬼地方，能收到信号的无线电，本身就是一件很邪门的事。

你举起石头，把无线电砸了个粉碎。

碎片散落一地。你感觉心里舒服了一些。

但你不知道，你刚才砸掉的，可能是你离开这鬼地方的唯一希望。

【理智+3】`,next:`__return__`}]},{id:`phase1_injured_animal`,text:`受伤的小动物`,minDay:2,weight:7,maxTriggers:1,choices:[{id:`help_animal`,text:`帮它包扎伤口`,effects:[{kind:`flag`,flag:`helped_animal`},{kind:`resource`,resource:`sanity`,delta:5}],result:`你蹲下来，仔细看了看那只小动物。

它的腿受了伤，流了很多血。但它没有攻击你，只是用可怜巴巴的眼神看着你。

你从背包里拿出一些布条，帮它包扎了伤口。

它舔了舔你的手，然后一瘸一拐地走了。

你看着它的背影，心里暖暖的。

在这鬼地方，还有活着的、不攻击你的东西。这让你觉得，这个世界还没有完全坏掉。

【理智+5】

【伏笔：那只小动物。它还会再出现吗？】`,next:`__return__`},{id:`kill_animal`,text:`杀了它，当食物`,effects:[{kind:`item`,item:`meat`,amount:3},{kind:`resource`,resource:`sanity`,delta:-8}],result:`你看着那只小动物，咽了口唾沫。

你已经好几天没吃过肉了。

你拿起石头，砸了下去。

小动物发出一声惨叫，然后不动了。

你坐在地上，看着它的尸体，心里很不是滋味。

但你知道，在这鬼地方，心软是会饿死的。

你把它的肉割下来，收好。

【获得食物：肉×3】

【理智-8】

【伏笔：你杀了一只可能无害的小动物。这会有什么后果吗？】`,next:`__return__`},{id:`ignore_animal`,text:`不去管它，继续探索`,effects:[],result:`你看了一眼那只小动物，然后转身离开了。

在这鬼地方，你连自己都顾不过来，哪有心思管别人。

你走了几步，回头看了一眼。那只小动物还在原地，用可怜巴巴的眼神看着你。

你咬了咬牙，继续往前走。

【无特殊效果】`,next:`__return__`}]},{id:`phase1_mist_whisper`,text:`迷雾中的低语`,minDay:3,weight:6,maxTriggers:1,choices:[{id:`follow_voice`,text:`循着声音走过去`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`resource`,resource:`health`,delta:-10}],result:`你循着声音走了过去。

声音越来越近，越来越清晰。那是你妈妈的声音。她在叫你回家吃饭。

但你妈妈已经去世三年了。

你知道这是陷阱。但你的脚不听使唤，还是往前走。

你走到一片空地，声音停了。

空地上什么都没有。只有雾，和你自己的心跳声。

你突然感到一阵剧烈的头痛，然后倒在了地上。

你昏迷了很久，醒来的时候，天已经黑了。

你挣扎着站起来，跌跌撞撞地往回走。

【理智-15】

【健康-10】

【获得警告：迷雾会利用你的记忆。不要相信你在雾里听到的任何声音。】`,next:`__return__`},{id:`cover_ears`,text:`捂住耳朵，不要听`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你捂住耳朵，蹲在地上，拼命摇头。

不要听，不要听，不要听。你在心里默念。

声音渐渐远了。

你松开手，大口喘着气。

你知道，那不是真的。在这鬼地方，雾会利用你的记忆，引诱你走向死亡。

你必须保持清醒。

【理智-3】

【获得抗性：迷雾低语。下次再遇到类似情况，理智损失减半。】`,next:`__return__`}]}],vl={duoduo_hear_cry:{id:`duoduo_hear_cry`,text:`你在探索废墟的时候，听到了一个声音。

不是雾里的低语，不是野兽的嚎叫。

是哭声。

一个小女孩的哭声，断断续续的，从废墟的深处传来。

你停下脚步，屏住呼吸。

哭声还在继续，带着压抑的抽噎，像是在拼命忍住，但忍不住。

你看了看周围的雾。雾很浓，能见度不到五米。废墟里可能有什么东西在等着。

但那是一个孩子。

你该怎么办？`,choices:[{id:`follow_cry`,text:`循着哭声走过去`,hint:`可能找到一个需要帮助的孩子，但也可能是陷阱。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`energy`,delta:-10}],next:`duoduo_find_girl`,result:`你深吸一口气，循着哭声走了过去。

雾越来越浓，哭声越来越近。你的心跳加速，手紧紧握着武器。

转过一个拐角，你看到了她。`},{id:`shout_back`,text:`大声喊："有人吗？"`,hint:`危险！迷雾中的东西靠声音捕猎。但可能会让孩子找到你。`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`shouted_in_mist`}],next:`duoduo_shout_consequence`,result:`你深吸一口气，大喊了一声："有人吗？"

声音在雾里回荡，然后……安静了。

哭声停了。

三秒后，你听到了。不是孩子的声音，是……某种更大的东西。它在朝你这边移动。

你吓得转身就跑，一路跌跌撞撞地跑回了庇护所。

你靠在门上，大口喘着气。

那个孩子的哭声，你再也没有听到过。

【获得创伤：迷雾中的呼喊。理智上限永久降低3点。】

【伏笔：那个孩子怎么样了？她还活着吗？】`},{id:`ignore_cry`,text:`转身离开，假装没听到`,hint:`最安全的选择。但你可能会一辈子记得这个哭声。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`ignored_duoduo_cry`}],next:`start`,result:`你转过身，快步离开了。

哭声在你身后渐渐远去，最终消失在雾里。

你回到庇护所，靠在墙上，闭上眼睛。

但那个声音一直在你脑海里回响。一个小女孩的哭声，断断续续的，带着压抑的抽噎。

你不知道她怎么样了。你甚至不知道她是不是真的存在。

但你知道，你这辈子都不会忘记这个声音。

【理智-5】

【伏笔：被忽视的哭声。这会在未来的某个时刻回来找你吗？】`}]},duoduo_shout_consequence:{id:`duoduo_shout_consequence`,text:`你靠在庇护所的门上，大口喘着气。

你的心脏跳得很快，像是要从嗓子眼里跳出来。

刚才那个声音……你这辈子都不会忘记。

不是孩子的声音，是某种更大的东西。它在朝你这边移动，你能听到它的脚步声，沉重的，缓慢的，每一步都让地面微微震动。

你跑得很快，很用力，不敢回头。

你不知道那个东西是什么，但你知道，如果你刚才没有跑，你现在可能已经死了。

你滑坐在地上，用手捂住脸。

那个孩子的哭声，你再也没有听到过。

你不知道她怎么样了。她可能还活着，也可能……

你不愿意想下去。

在这个鬼地方，有些事情，不知道比知道好。

但你知道，你这辈子都不会忘记那个声音。

一个小女孩的哭声，断断续续的，带着压抑的抽噎。

还有，你大喊之后，那个从雾里传来的，沉重的脚步声。

【获得永久创伤：迷雾中的呼喊。理智上限永久降低3点。每次在雾里大喊，理智-10。】

【伏笔：那个孩子怎么样了？她还活着吗？那个从雾里来的"更大的东西"，又是什么？】`,choices:[{id:`rest_after_shout`,text:`休息一下，平复心情`,effects:[{kind:`resource`,resource:`energy`,delta:-10},{kind:`resource`,resource:`sanity`,delta:-3}],next:`start`,result:`你靠在墙上，闭上眼睛，深深地吸了几口气。

过了很久，你的心跳才慢慢平静下来。

但你的手还在发抖。

你知道，这个创伤会跟着你一辈子。

在这个鬼地方，有些错误，是不能犯的。

【体力-10，理智-3】`}]},duoduo_find_girl:{id:`duoduo_find_girl`,text:`你转过一个拐角，看到了她。

一个小女孩，大约八九岁的样子，瘦小得像一根豆芽菜。她穿着一件过大的成人外套，袖子卷了好几圈，下摆拖到了膝盖。

她蹲在一堆废墟后面，怀里紧紧抱着一只破旧的毛绒兔子。兔子的一只耳朵已经掉了，用线缝着，针脚很粗糙。

她在哭。

不是嚎啕大哭，是压抑的、拼命忍住的抽噎。她用手捂着嘴，肩膀一抖一抖的，眼泪从指缝里渗出来。

她没有看到你。

你注意到，她的腿在流血。一道长长的伤口，从膝盖一直划到脚踝，血浸透了裤腿，在地上积了一小滩。

她受伤了。而且伤得不轻。

雾里传来了什么声音。像是爪子刮擦地面的声音，越来越近。

有什么东西在朝这边来。

你该怎么办？`,choices:[{id:`rescue_girl`,text:`冲过去，抱起她就跑`,hint:`需要足够的敏捷和体力。可能会吸引怪物的注意。`,effects:[{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`rescued_duoduo`}],next:`duoduo_escape`,result:`你没有犹豫。

你冲过去，一把抱起她，转身就跑。

小女孩吓了一跳，尖叫了一声，然后紧紧抱住你的脖子。她的身体在发抖，很冷，像一块冰。

你听到身后传来了一声咆哮。那东西发现你们了。

你跑得更快了。雾在你身边飞速后退，你的肺像要炸开一样。

终于，你看到了庇护所的门。

你冲进去，用背顶住门，大口喘着气。

小女孩在你怀里，还在发抖，但她没有哭了。她抬起头，用一双大大的、湿漉漉的眼睛看着你。

"谢谢哥哥/姐姐。"她小声说，声音还带着哭腔。

你看着她，心里涌起了一种奇怪的感觉。

在这个鬼地方，你居然救了一个人。

【朵朵加入了你的队伍。】`},{id:`distract_monster`,text:`先扔个东西引开怪物，再带她走`,hint:`更聪明的做法。需要有可以扔的东西。`,effects:[{kind:`resource`,resource:`energy`,delta:-15},{kind:`item`,item:`wood`,amount:-2},{kind:`flag`,flag:`rescued_duoduo_smart`}],next:`duoduo_escape`,result:`你蹲下来，从地上捡起一块石头，又从背包里拿出两根木柴。

你深吸一口气，然后用力把石头扔向了左边。

石头在雾里飞出了一段距离，然后砸在了什么东西上，发出了一声闷响。

爪子刮擦地面的声音停了一下，然后转向了左边。

就是现在。

你冲过去，一把抱起小女孩，转身朝右边跑。

小女孩吓了一跳，但她很乖，没有叫出声，只是紧紧抱住你的脖子。

你跑得很快，但很安静。你知道，在这个鬼地方，声音就是死亡。

几分钟后，你回到了庇护所。

你关上门，靠在墙上，大口喘着气。

小女孩从你怀里滑下来，站在地上，抬头看着你。

"你好厉害。"她说，眼睛里闪着光，"你用石头把那个怪物引走了。"

你看着她，心里涌起了一种自豪感。

在这个鬼地方，你不仅活了下来，还能用脑子救人。

【朵朵加入了你的队伍。】

【获得称号：机智的救援者。智力+1，幸运+1。】`},{id:`hide_and_observe`,text:`先躲起来，看看是什么怪物`,hint:`最谨慎的做法。但可能会错过最佳救援时机。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`observed_duoduo_monster`}],next:`duoduo_hide_consequence`,result:`你蹲在一堵断墙后面，屏住呼吸。

爪子刮擦地面的声音越来越近。然后，你看到了它。

那是一只……你不知道该怎么形容。它看起来像是一只狼，但比普通的狼大两倍，皮肤是灰白色的，像是被什么东西漂白了。它的眼睛在雾里发着红光，嘴里流着涎水。

它走到小女孩藏身的废墟旁边，停了下来。

它闻到了她的气味。

小女孩也发现了它。她停止了哭泣，用手紧紧捂住嘴，身体缩成了一团。

怪物低下头，鼻子在废墟上嗅着，越来越近。

你知道，再不动手，就来不及了。

你该怎么办？`}]},duoduo_hide_consequence:{id:`duoduo_hide_consequence`,text:`怪物离小女孩只有一步之遥了。

它的鼻子几乎要碰到她的外套了。

小女孩紧紧闭着眼睛，眼泪从指缝里流出来，但她没有发出一点声音。

你知道，她很勇敢。但勇敢救不了她。

你必须做出选择。`,choices:[{id:`attack_monster`,text:`冲出去，从背后攻击怪物`,hint:`危险！可能会受伤。但可以救下小女孩。`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`energy`,delta:-25},{kind:`flag`,flag:`fought_monster_for_duoduo`}],next:`duoduo_after_fight`,result:`你握紧武器，从断墙后面冲了出去。

怪物听到了声音，猛地转过身。

但你已经到了它面前。你用尽全身力气，把武器砍向了它的脖子。

武器砍进了它的皮肉，黑色的血喷了出来。怪物发出了一声凄厉的惨叫，用爪子朝你挥了过来。

你来不及躲闪，爪子在你的胸口划了一道长长的口子。你痛得闷哼了一声，但没有松手。

你把武器拔出来，又砍了下去。

怪物挣扎了几下，然后倒在了地上，不动了。

你靠在墙上，大口喘着气。胸口的伤口在流血，痛得你几乎站不稳。

小女孩从废墟后面走出来，看着地上的怪物尸体，又看着你，眼睛里充满了恐惧和敬佩。

"你受伤了。"她小声说，然后从口袋里掏出一块脏兮兮的布条，"我帮你包扎。"

你看着她认真的样子，心里涌起了一股暖流。

在这个鬼地方，你居然为了一个陌生的小女孩，跟一只怪物拼命。

而且你活下来了。

【健康-15，体力-25】

【朵朵加入了你的队伍。】

【获得称号：怪物杀手。力量+2，伤害+10%。】`},{id:`throw_object`,text:`扔个东西砸怪物，引开它的注意`,hint:`需要有可以扔的东西。比直接攻击安全。`,effects:[{kind:`resource`,resource:`energy`,delta:-15},{kind:`item`,item:`wood`,amount:-3},{kind:`flag`,flag:`distracted_monster_for_duoduo`}],next:`duoduo_escape`,result:`你从背包里拿出三根木柴，深吸一口气。

然后，你用力把木柴扔向了右边。

木柴在空中飞了一段距离，然后砸在了地上，发出了几声响亮的撞击声。

怪物猛地转过头，朝右边看去。

就是现在。

你冲过去，一把抱起小女孩，转身朝左边跑。

小女孩吓了一跳，但她很乖，紧紧抱住你的脖子，没有发出声音。

你跑得很快，很安静。你能听到怪物在右边咆哮，但它没有追过来。

几分钟后，你回到了庇护所。

你关上门，靠在墙上，大口喘着气。

小女孩从你怀里滑下来，抬头看着你。

"你好聪明。"她说，眼睛里闪着光，"你用木柴把那个怪物引走了。"

你看着她，心里涌起了一种自豪感。

在这个鬼地方，你不仅活了下来，还能用脑子救人。

【朵朵加入了你的队伍。】

【获得称号：机智的救援者。智力+1，幸运+1。】`},{id:`run_away`,text:`趁怪物没发现你，偷偷溜走`,hint:`最安全的选择。但那个小女孩……`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`abandoned_duoduo`}],next:`start`,result:`你慢慢退了回去。

你转过身，蹑手蹑脚地离开了。

你没有回头。

你不敢回头。

因为你知道，如果你回头看了，你就会忍不住冲出去。

而冲出去，你可能会死。

你回到庇护所，关上门，靠在墙上。

你的手在发抖。

你听到远处传来了一声尖叫。然后是怪物的咆哮。然后是……安静。

你滑坐在地上，用手捂住脸。

你活下来了。

但那个小女孩没有。

你这辈子都不会忘记她的样子。瘦小的身体，过大的外套，破旧的毛绒兔子，还有那双大大的、湿漉漉的眼睛。

她到死都不知道，有一个人就在不远处，看着她死去。

【理智-15】

【获得永久创伤：被遗弃的小女孩。每次听到孩子的声音，理智-5。】

【伏笔：这个创伤会在未来的某个时刻回来找你吗？】`}]},duoduo_escape:{id:`duoduo_escape`,text:`你把小女孩放在地上，然后靠在墙上，大口喘着气。

庇护所里很安静，只有你们两个人的呼吸声。

小女孩站在你面前，低着头，手指绞着外套的衣角。她的腿还在流血，但她没有喊疼。

"你叫什么名字？"你问。

她抬起头，看了你一眼，又低下头。"朵朵。"她小声说。

"朵朵。"你重复了一遍，"很好听的名字。你多大了？"

"九岁。"她说，然后又补充了一句，"快十岁了。"

你看着她。九岁，快十岁了。在这个鬼地方，一个九岁的小女孩，居然一个人活了这么久。

"你的爸爸妈妈呢？"你问。

朵朵的身体抖了一下。她紧紧抱住怀里的毛绒兔子，眼泪在眼眶里打转。

"迷雾来的时候，我们在超市里。"她说，声音很小，"人很多，很挤。妈妈牵着我的手，爸爸在前面开路。然后……然后雾就进来了。"

她停了一下，吸了吸鼻子。

"大家都在跑，都在叫。我摔倒了，妈妈的手就松开了。等我爬起来的时候，周围就没有人了。只有雾，和……和那些东西。"

她的眼泪终于掉了下来。

"我找了他们好久。"她说，"我喊他们的名字，但是没有人回答。我不知道他们是不是还活着。"

你看着她，心里涌起了一股酸涩。

在这个鬼地方，每个人都有自己的故事。每个人都在失去，每个人都在寻找。

你该怎么回应她？`,choices:[{id:`comfort_duoduo`,text:`安慰她，说她的父母一定还活着`,hint:`温暖的选择。朵朵会信任你。但这可能是一个谎言。`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`comforted_duoduo`}],next:`start`,result:`你蹲下来，看着朵朵的眼睛。

"他们一定还活着。"你说，声音很温柔，"在这个鬼地方，只要活着，就有希望。你找了他们这么久都没有放弃，他们也一定在找你。"

朵朵看着你，眼泪流得更凶了。但她的眼睛里，有了一点光。

"真的吗？"她问。

"真的。"你说，虽然你不知道这是不是真的。

朵朵扑进你怀里，放声大哭。你轻轻拍着她的背，心里涌起了一种奇怪的感觉。

在这个鬼地方，你居然成了别人的依靠。

"以后，"你说，"我帮你找他们。"

朵朵抬起头，看着你，眼睛里充满了信任。

"谢谢哥哥/姐姐。"她说。

【朵朵好感度+30】

【获得任务：帮助朵朵寻找父母。】

【理智+3】`},{id:`be_honest_duoduo`,text:`诚实地说，你不知道他们是不是还活着`,hint:`诚实的选择。朵朵会难过，但会更尊重你。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`honest_to_duoduo`}],next:`start`,result:`你沉默了一会儿。

"我不知道。"你说，声音很轻，"在这个鬼地方，什么都有可能。他们可能还活着，也可能……"

你没有说下去。

朵朵的眼泪掉了下来。但她没有哭出声，只是静静地流着泪。

过了很久，她抬起头，看着你。

"我知道。"她说，声音很平静，"我只是……不愿意相信。"

你看着她，心里涌起了一股敬佩。

一个九岁的小女孩，在这个鬼地方，居然能这么平静地接受这种可能性。

"但是，"朵朵又说，眼睛里闪过了一丝坚定，"只要没有看到他们的尸体，我就不会放弃。"

你看着她，点了点头。

"好。"你说，"我帮你找。"

朵朵看着你，露出了一个很小的笑容。

"谢谢。"她说。

【朵朵好感度+20】

【获得任务：帮助朵朵寻找父母。】

【获得称号：诚实的人。智力+1，NPC信任度+10%。】`},{id:`ask_more_details`,text:`问她更多关于她父母的细节，方便以后寻找`,hint:`务实的选择。获得更多情报，方便后续任务。`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`asked_duoduo_parents`}],next:`start`,result:`你蹲下来，看着朵朵的眼睛。

"告诉我更多关于你父母的事情。"你说，"他们长什么样？叫什么名字？最后在哪里分开的？"

朵朵擦了擦眼泪，认真地想了想。

"我爸爸叫杜建国，妈妈叫李梅。"她说，"爸爸很高，有点胖，戴眼镜。妈妈很瘦，长头发，笑起来有酒窝。"

她停了一下，又说："我们在城东的大润发超市分开的。那天是周末，人很多。爸爸说要去买米，让妈妈牵着我在门口等。然后雾就进来了。"

"你爸爸穿什么衣服？"你问。

"蓝色的夹克，牛仔裤。"朵朵说，"妈妈穿红色的毛衣，黑色的裤子。"

你把这些信息牢牢记在心里。

城东的大润发超市。蓝色夹克的男人，红色毛衣的女人。

"还有，"朵朵又说，从口袋里掏出一张照片，"这是我们的全家福。"

你接过照片。照片上，一个高大的男人，一个瘦小的女人，中间是一个笑得很开心的小女孩。

"这是去年冬天拍的。"朵朵说，眼睛里闪着光，"那天我们去公园玩，爸爸给我买了一个棉花糖。"

你看着照片，又看着朵朵，心里涌起了一股坚定。

"放心。"你说，"我一定会帮你找到他们。"

朵朵看着你，用力点了点头。

【获得重要情报：朵朵父母的信息。杜建国（蓝色夹克，戴眼镜），李梅（红色毛衣，长头发）。最后在城东大润发超市分开。】

【获得物品：朵朵的全家福照片。】

【朵朵好感度+15】`}]},duoduo_after_fight:{id:`duoduo_after_fight`,text:`朵朵用那块脏兮兮的布条，认真地帮你包扎着胸口的伤口。

她的手很小，很轻，但动作很熟练。

"你经常帮人包扎吗？"你问。

朵朵点了点头。"妈妈是护士。"她说，"她教过我一些。她说，在外面，受伤了要及时处理，不然会感染。"

她的手顿了一下，然后又继续包扎。

"以前都是妈妈帮我包扎。"她说，声音很小，"我摔倒了，妈妈就会吹一吹，然后说，朵朵最勇敢了。"

你看着她认真的样子，心里涌起了一股酸涩。

"包扎好了。"朵朵说，抬起头，看着你，"可能有点丑，但是应该能止血。"

你低头看了看。确实包得有点歪，但是很结实。

"很好。"你说，"谢谢你。"

朵朵露出了一个很小的笑容。然后，她的肚子叫了一声。

她的脸一下子红了，用手捂住肚子，低下了头。

你笑了笑，从背包里拿出一些食物，递给她。

"吃吧。"你说。

朵朵抬起头，看着你，眼睛里闪着光。

"真的可以吗？"她问。

"当然。"你说。

朵朵接过食物，小口小口地吃了起来。她吃得很认真，像是在品尝什么美味佳肴。

你看着她，心里涌起了一种奇怪的感觉。

在这个鬼地方，你居然有了一个需要你照顾的人。

而且，你居然觉得，这种感觉还不错。`,choices:[{id:`ask_about_her_mother`,text:`问她更多关于她妈妈的事情`,hint:`获得更多关于朵朵母亲的情报。`,effects:[{kind:`flag`,flag:`asked_about_duoduo_mother`}],next:`start`,result:`"你妈妈是护士？"你问。

朵朵点了点头。"嗯，在市第一人民医院工作。"她说，"她很厉害的，会打针，会包扎，还会给小朋友讲故事。"

她的眼睛里闪着光。

"妈妈说，她以后要教我当护士。"她说，"但是我想当科学家，研究这雾到底是什么。"

你看着她，心里涌起了一股敬佩。

一个九岁的小女孩，在这个鬼地方，居然还想着要当科学家，研究迷雾。

"你妈妈叫什么名字？"你问。

"李梅。"朵朵说，"木子李，梅花的梅。"

你把这个名字牢牢记在心里。

市第一人民医院的护士，李梅。

【获得重要情报：朵朵的母亲李梅，市第一人民医院护士。】

【朵朵好感度+10】`},{id:`promise_to_protect`,text:`告诉她，以后你会保护她`,hint:`温暖的选择。朵朵会非常信任你。`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`promised_to_protect_duoduo`}],next:`start`,result:`你看着朵朵，认真地说："以后，我会保护你。"

朵朵抬起头，看着你，眼睛里充满了惊讶。

"真的吗？"她问。

"真的。"你说，"只要我活着，就不会让你受到伤害。"

朵朵看着你，眼泪一下子就涌了出来。但她没有哭，只是用力地点了点头。

"嗯！"她说，声音带着哭腔，但很坚定，"我也会保护哥哥/姐姐的！"

你笑了笑，摸了摸她的头。

在这个鬼地方，你居然有了一个想要保护的人。

而且，你居然觉得，为了她，你可以变得更强。

【朵朵好感度+50】

【获得称号：守护者。力量+2，防御+10%。当朵朵在场时，战斗伤害+20%。】

【理智+5】`},{id:`teach_survival`,text:`教她一些基本的生存技巧`,hint:`务实的选择。朵朵会变得更独立，减少你的负担。`,effects:[{kind:`resource`,resource:`energy`,delta:-10},{kind:`flag`,flag:`taught_duoduo_survival`}],next:`start`,result:`你看着朵朵，认真地说："在这个鬼地方，你不能只靠别人保护。你要学会自己保护自己。"

朵朵抬起头，看着你，眼睛里充满了好奇。

"我教你一些基本的生存技巧。"你说，"怎么找食物，怎么找水，怎么躲避怪物，怎么处理伤口。"

朵朵用力点了点头。

接下来的几个小时，你教了她很多东西。怎么辨认可以吃的植物，怎么收集干净的水，怎么在雾里安静地移动，怎么用简单的材料包扎伤口。

朵朵学得很认真，很聪明。很多东西，你教一遍她就会了。

"你好厉害。"你说。

朵朵露出了一个骄傲的笑容。"妈妈说我很聪明的。"她说。

你看着她，心里涌起了一股欣慰。

在这个鬼地方，你不仅救了一个人，还教会了她怎么活下去。

【朵朵学会了基本生存技巧。以后她可以自己找食物和水，减少你的资源消耗。】

【朵朵好感度+20】

【体力-10】`}]},trader_zhang_meet:{id:`trader_zhang_meet`,text:`你在探索废墟的时候，闻到了一股味道。

不是腐臭，不是血腥。

是烟味。

有人在抽烟。

你停下脚步，屏住呼吸，循着烟味走了过去。

在一栋半塌的建筑里，你看到了一个男人。

他大约五十多岁，瘦瘦的，穿着一件洗得发白的中山装，戴着一顶旧毡帽。他坐在一堆废墟上，手里拿着一根烟，慢慢地抽着。

他的身边放着一个大背包，背包敞开着，里面装满了各种东西。罐头、瓶装水、药品、武器、工具……应有尽有。

他看到了你，没有惊讶，也没有紧张。

他只是抬起手，把烟从嘴里拿出来，吐了一个烟圈。

"要买东西吗？"他说，声音沙哑，像是很久没跟人说过话了，"价格公道，童叟无欺。"

你看着他，心里涌起了一股惊讶。

在这个鬼地方，居然还有人在做生意。`,choices:[{id:`browse_goods`,text:`看看他有什么东西卖`,hint:`可以交易。但价格可能不便宜。`,effects:[{kind:`flag`,flag:`met_trader_zhang`}],next:`trader_zhang_shop`,result:`你走过去，看了看他的背包。

东西真的很多。罐头、瓶装水、面包、饼干、药品、绷带、武器、工具、甚至还有几包烟。

"怎么样？"老张说，"有看上的吗？"

"你怎么会有这么多东西？"你问。

老张笑了笑，露出了一口黄牙。"做买卖的，自然有进货的渠道。"他说，"你放心，东西都是干净的，没有问题。"

你看着他，心里涌起了一股怀疑。

在这个鬼地方，一个人，居然有这么多东西。他是从哪里弄来的？

但你没有问。在这个鬼地方，有些事情，不知道比知道好。

【你可以和老张交易了。】`},{id:`ask_about_himself`,text:`问他是谁，从哪里来`,hint:`获得更多关于这个神秘商人的情报。`,effects:[{kind:`flag`,flag:`asked_trader_zhang_background`}],next:`start`,result:`你看着他，问："你是谁？从哪里来？"

老张笑了笑，把烟掐灭在废墟上。

"我叫老张。"他说，"以前是做小买卖的，在菜市场摆摊。迷雾来的时候，我正在进货。然后……就变成现在这样了。"

他指了指身边的大背包。

"做买卖的，走到哪儿都不能丢了本行。"他说，"在这个鬼地方，东西比钱管用。我用我不需要的东西，换我需要的东西。大家各取所需，挺好。"

"你一个人吗？"你问。

老张点了点头。"一个人。"他说，"做买卖的，一个人方便。带着人，反而麻烦。"

他看着你，眼睛里闪过了一丝精明。

"不过，"他说，"如果你有什么好东西要卖，我可以给你一个好价钱。"

你看着他，心里涌起了一股复杂的感觉。

在这个鬼地方，每个人都在为了活下去而努力。有的人战斗，有的人探索，而有的人，做买卖。

【获得情报：商人老张，以前是菜市场摊主，独自一人在迷雾中做买卖。】

【老张好感度+10】`},{id:`be_cautious`,text:`保持警惕，不靠近他`,hint:`最安全的选择。但可能错过交易机会。`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`cautious_of_trader_zhang`}],next:`start`,result:`你站在原地，没有靠近他。

老张看着你，笑了笑。

"不用紧张。"他说，"我只是个做买卖的，不会害人。在这个鬼地方，害人对我没有好处。"

你看着他，没有说话。

老张又抽出一根烟，点上，慢慢地抽着。

"行吧。"他说，"你要是想买东西，随时来找我。我一般在这附近活动。"

你点了点头，然后转身离开了。

走了一段距离，你回头看了一眼。

老张还坐在那里，抽着烟，像是在等下一个顾客。

你心里涌起了一股复杂的感觉。

在这个鬼地方，居然还有人在过着「正常」的生活。

【理智-2】

【伏笔：神秘的商人老张。他的东西是从哪里来的？他真的只是一个普通的商人吗？】`}]},trader_zhang_shop:{id:`trader_zhang_shop`,text:`老张把背包里的东西一样一样拿出来，摆在废墟上。

"你看看，有什么需要的。"他说，"价格都好商量。"

你看了看他摆出来的东西。

食物：罐头、面包、饼干、方便面……
水：瓶装水、矿泉水……
药品：绷带、止痛药、抗生素……
武器：砍刀、匕首、弓箭……
工具：斧头、锤子、绳子、打火机……
其他：烟、酒、地图、电池……

"这些东西，你想要什么？"老张问，"用东西换也行，用……其他的东西换也行。"

他说「其他的东西」的时候，眼睛里闪过了一丝不明意味的光。

你该怎么办？`,choices:[{id:`buy_food`,text:`用物资换一些食物和水`,hint:`最实用的选择。但价格可能不便宜。`,effects:[{kind:`item`,item:`food`,amount:15},{kind:`item`,item:`water`,amount:12},{kind:`item`,item:`metal`,amount:-5}],next:`start`,result:`你指了指罐头和瓶装水。

"这些怎么换？"你问。

老张看了看，说："一罐罐头换两块金属，一瓶水换一块金属。怎么样？"

你想了想，点了点头。

你用五块金属，换了五罐罐头和五瓶水。

老张把金属收起来，放进背包里。

"好嘞。"他说，"以后有需要，随时来找我。"

你点了点头，拿着食物和水，离开了。

走了一段距离，你回头看了一眼。

老张正在把剩下的东西收起来，动作很熟练。

你心里涌起了一股奇怪的感觉。

在这个鬼地方，居然还能做买卖。

【获得食物+15，水+12，金属-5】`},{id:`buy_weapon`,text:`用物资换一把更好的武器`,hint:`提升战斗力。但需要足够的物资。`,effects:[{kind:`item`,item:`machete`,amount:1},{kind:`item`,item:`metal`,amount:-10},{kind:`item`,item:`wood`,amount:-5}],next:`start`,result:`你指了指那把砍刀。

"这把怎么换？"你问。

老张拿起砍刀，在手里掂了掂。

"好东西。"他说，"精钢打造，锋利得很。在这个鬼地方，一把好武器比什么都管用。"

他看了看你，说："十块金属，五块木头。怎么样？"

你想了想，点了点头。

你用十块金属和五块木头，换了那把砍刀。

老张把金属和木头收起来，放进背包里。

"好眼力。"他说，"这把刀，在这个鬼地方，能救你好几次命。"

你接过砍刀，在手里掂了掂。

确实很沉，很锋利。

你点了点头，拿着砍刀，离开了。

【获得武器：精钢砍刀。攻击力+20。】

【金属-10，木头-5】`},{id:`ask_about_special_goods`,text:`问他有没有什么「特殊」的东西`,hint:`可能会触发隐藏剧情。但也可能有危险。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`asked_about_special_goods`}],next:`start`,result:`你看着老张，问："你有没有什么……特殊的东西？"

老张的手顿了一下。

他抬起头，看着你，眼睛里闪过了一丝警惕。

"什么叫特殊的东西？"他问。

"就是……"你想了想，"从迷雾里来的东西。或者……不应该存在的东西。"

老张沉默了很久。

然后，他笑了笑，把烟掐灭了。

"年轻人。"他说，"有些东西，不知道比知道好。有些东西，碰了，就再也回不了头了。"

他看着你，眼睛里闪过了一丝复杂的情绪。

"我确实有一些特殊的东西。"他说，"但是，我不建议你买。那些东西……不是给普通人用的。"

"是什么？"你问。

老张摇了摇头。

"等你准备好了，再来找我吧。"他说，"现在，你还太弱了。"

他站起来，把背包背在身上。

"好了，今天就到这里吧。"他说，"我要走了。以后有需要，随时来找我。"

他转身走进了雾里，很快就消失了。

你站在原地，心里涌起了一股复杂的感觉。

特殊的东西？从迷雾里来的东西？

老张到底是什么人？他的那些「特殊的东西」，又是什么？

【理智-5】

【获得重要伏笔：商人老张的特殊商品。等你足够强了，他会给你看一些「不应该存在的东西」。】`}]}},yl=[{id:`phase2_abandoned_clinic`,text:`你发现了一个废弃的医疗站。

门开着，里面一片狼藉。药架倒了，药品撒了一地。但看起来，还有一些能用的东西。

你走进去，开始搜索。

然后，你听到了什么。

里屋传来了微弱的呼吸声。

有人在里面。

你该怎么办？`,minDay:8,maxTriggers:1,weight:8,choices:[{id:`check_inner_room`,text:`去里屋看看`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你握紧武器，蹑手蹑脚地走到里屋门口。

门虚掩着。你推开门，看到了一个人。

一个老人，躺在地上，脸色苍白，呼吸微弱。他的腿上缠着绷带，绷带已经被血浸透了。

他听到了声音，睁开眼睛，看到了你。

"水……"他虚弱地说，"给我点水……"

你看着他，心里涌起了一股复杂的感觉。

在这个鬼地方，救一个陌生人，可能会给自己带来麻烦。但不救，他肯定会死。

【你发现了一个受伤的老人。给他水，他可能会活下来。不给他，他会死。】`,next:`__return__`},{id:`grab_medicine_leave`,text:`拿了药品就走，不管里屋的人`,effects:[{kind:`item`,item:`medicine`,amount:5},{kind:`resource`,resource:`sanity`,delta:-8}],result:`你没有去里屋。

你快速地把地上能用的药品捡起来，放进背包里。

然后，你转身离开了。

走了一段距离，你回头看了一眼。

医疗站的门还开着，里屋的呼吸声还在继续。

你知道，那个老人可能活不过今天。

但你也知道，在这个鬼地方，你救不了所有人。

【获得药品+5】

【理智-8】

【伏笔：被遗弃的老人。他会活下来吗？如果他活下来了，他会记得你吗？】`,next:`__return__`}]},{id:`phase2_mist_merchant`,text:`你在雾里走着，突然听到了一个声音。

"要买东西吗？"

你停下脚步，环顾四周。

雾很浓，你什么都看不见。

"我在这里。"那个声音又说，"在你左边。"

你转过头，看到了一个模糊的人影。

那个人影站在雾里，像是从雾里长出来的一样。他的身边放着一个大箱子，箱子敞开着，里面装满了各种东西。

"我是个商人。"那个人影说，"你可以叫我……雾商。我这里有很多好东西，价格公道。"

你看着他，心里涌起了一股警惕。

在这个鬼地方，一个从雾里冒出来的商人，怎么看都不正常。

你该怎么办？`,minDay:9,maxTriggers:1,weight:5,choices:[{id:`trade_with_mist_merchant`,text:`看看他有什么东西卖`,effects:[{kind:`resource`,resource:`sanity`,delta:-10}],result:`你走过去，看了看箱子里的东西。

东西真的很多。食物、水、药品、武器、工具……应有尽有。而且，还有一些你从来没见过的东西。

发光的石头，奇怪的药水，刻着符文的金属片……

"这些是什么？"你指着那些奇怪的东西问。

雾商笑了笑。"好东西。"他说，"从迷雾深处来的好东西。用了，你会变得更强。但是，也可能会有一些……副作用。"

你看着那些发光的石头，心里涌起了一股强烈的好奇心。

"怎么换？"你问。

雾商看了看你，说："用你的记忆。"

你愣住了。

"记忆？"你问。

"对。"雾商说，"一段记忆，换一样东西。你最珍贵的记忆，换最好的东西。"

你看着他，心里涌起了一股寒意。

用记忆换东西？

这怎么看都像是一个陷阱。

【理智-10】

【获得重要伏笔：雾商。一个从迷雾深处来的神秘商人，用记忆交易奇怪的物品。他到底是什么人？那些"从迷雾深处来的东西"，又是什么？】`,next:`__return__`},{id:`refuse_and_leave`,text:`拒绝交易，转身离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你摇了摇头。

"不用了。"你说，"我不需要。"

雾商看着你，笑了笑。

"没关系。"他说，"以后有需要，随时来找我。我一直在雾里。"

你转身离开了。

走了一段距离，你回头看了一眼。

雾商还站在那里，像是在等下一个顾客。然后，他的身影渐渐变淡，最终消失在了雾里。

你打了个寒颤。

在这个鬼地方，什么奇怪的东西都有。

【理智-3】

【伏笔：雾商。他说他"一直在雾里"。他到底是什么？是人类吗？还是……迷雾本身？】`,next:`__return__`}]},{id:`phase2_survivor_help`,text:`你在探索的时候，听到了一个声音。

"救命！有人吗？救命！"

是一个男人的声音，带着哭腔，从废墟的深处传来。

你停下脚步，屏住呼吸。

声音还在继续，越来越虚弱。

"求求你们，救救我……我的腿断了……"

你看了看周围的雾。雾很浓，能见度不到五米。废墟里可能有什么东西在等着。

但那是一个人。一个活生生的人，在求救。

你该怎么办？`,minDay:10,maxTriggers:1,weight:7,choices:[{id:`go_help`,text:`循着声音去救人`,effects:[{kind:`resource`,resource:`energy`,delta:-15},{kind:`resource`,resource:`sanity`,delta:-5}],result:`你深吸一口气，循着声音走了过去。

雾越来越浓，声音越来越近。你的心跳加速，手紧紧握着武器。

转过一个拐角，你看到了他。

一个男人，大约三十多岁，穿着一件破旧的夹克。他的右腿以一个奇怪的角度扭曲着，显然是断了。他躺在地上，脸色苍白，额头上全是冷汗。

他看到了你，眼睛里闪过了一丝希望。

"救救我……"他虚弱地说，"我的腿断了……求你了……"

你蹲下来，检查了一下他的腿。

确实断了，而且是开放性骨折，骨头都露出来了。如果不及时处理，他可能会感染，然后死掉。

"你叫什么名字？"你问。

"王强……"他说，"我叫王强……谢谢你……谢谢你救我……"

你看着他，心里涌起了一股复杂的感觉。

在这个鬼地方，救一个陌生人，可能会给自己带来很多麻烦。但不救，他肯定会死。

【你发现了一个受伤的幸存者王强。他的腿断了，需要及时治疗。你可以选择带他回庇护所，也可以选择给他一些物资然后离开。】`,next:`__return__`},{id:`shout_directions`,text:`大声告诉他怎么走，但不过去`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],result:`你深吸一口气，大声喊："你往左边走！左边有一个庇护所！"

声音在雾里回荡。

然后，你听到了王强的声音。

"左边？"他说，"哪边是左边？我分不清方向……"

你愣住了。

在这个鬼地方，雾这么浓，一个腿断了的人，怎么可能分得清方向？

你张了张嘴，想说什么，但最终什么都没说。

你转身离开了。

走了一段距离，你听到了王强的哭声。

"求求你们，救救我……求求你们……"

声音越来越远，最终消失在了雾里。

你靠在墙上，闭上眼睛。

你知道，那个人可能活不过今天。

但你也知道，在这个鬼地方，你救不了所有人。

【理智-8】

【伏笔：被遗弃的王强。他会活下来吗？如果他活下来了，他会记得你吗？】`,next:`__return__`},{id:`ignore_and_leave`,text:`假装没听到，转身离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-10}],result:`你转过身，快步离开了。

你没有回头。

你不敢回头。

因为你知道，如果你回头看了，你就会忍不住冲出去。

而冲出去，你可能会死。

你回到庇护所，关上门，靠在墙上。

你的手在发抖。

你听到远处传来了王强的哭声，然后是……安静。

你滑坐在地上，用手捂住脸。

你活下来了。

但那个叫王强的男人，没有。

你这辈子都不会忘记他的声音。带着哭腔的，虚弱的，求救的声音。

【理智-10】

【获得永久创伤：被遗弃的求救。每次听到有人求救，理智-5。】`,next:`__return__`}]},{id:`phase2_mist_song`,text:`你在雾里走着，突然听到了一个声音。

是歌声。

一个女人的歌声，悠扬，婉转，带着一种说不出的悲伤。

歌声从雾的深处传来，像是在召唤你。

你停下脚步，屏住呼吸。

歌声还在继续，越来越清晰。

你听不懂歌词，但你能感受到歌声里的情感。悲伤，孤独，还有……一种说不出的诱惑。

你的脚不自觉地朝歌声的方向迈了一步。

然后，你猛地回过神来。

在这个鬼地方，从雾里传来的歌声，怎么看都不正常。

你该怎么办？`,minDay:11,maxTriggers:1,weight:6,choices:[{id:`follow_song`,text:`循着歌声走过去`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`resource`,resource:`health`,delta:-10}],result:`你深吸一口气，循着歌声走了过去。

雾越来越浓，歌声越来越清晰。你的心跳加速，手紧紧握着武器。

不知道走了多久，你来到了一片空地。

空地的中央，有一个女人。

她穿着一件白色的长裙，长发披肩，背对着你，正在唱歌。

她的歌声很动听，带着一种说不出的悲伤。

你停下脚步，屏住呼吸。

然后，女人停止了唱歌。

她慢慢地转过身来。

你看到了她的脸。

那是一张很漂亮的脸，但是……没有眼睛。

她的眼睛的位置，是两个黑洞，正在往外流着黑色的液体。

"你来了。"她说，声音和歌声一样动听，"我等你很久了。"

你吓得转身就跑。

你跑得很快，很用力，肺像要炸开一样。

不知道跑了多久，你终于回到了庇护所。

你关上门，靠在墙上，大口喘着气。

你的心脏跳得很快，像是要从嗓子眼里跳出来。

你这辈子都不会忘记那张脸。

没有眼睛的，流着黑色液体的，漂亮的脸。

【理智-15，健康-10】

【获得重要伏笔：迷雾中的歌姬。一个没有眼睛的女人，在雾里唱歌。她是什么？她在等谁？】`,next:`__return__`},{id:`cover_ears_leave`,text:`捂住耳朵，赶紧离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你用手紧紧捂住耳朵，转身就跑。

你跑得很快，很用力，不敢回头。

不知道跑了多久，歌声终于消失了。

你停下来，靠在墙上，大口喘着气。

你的手还在发抖。

你不知道那个歌声是什么，但你知道，在这个鬼地方，好奇心是会害死猫的。

【理智-5】

【伏笔：迷雾中的歌声。你没有去看它的真面目。它还会再出现吗？】`,next:`__return__`}]},{id:`phase2_abandoned_vehicle`,text:`你在路边发现了一辆废弃的汽车。

是一辆黑色的SUV，车门开着，车窗碎了。车身上有很多划痕，像是被什么东西抓过。

你走过去，往车里看了看。

驾驶座上有一个人。

不，是一具尸体。

尸体已经开始腐烂了，散发着一股难闻的气味。他的手紧紧握着方向盘，指节发白。他的眼睛睁得很大，像是看到了什么可怕的东西。

你忍住恶心，开始搜索车辆。

后备箱里有一些东西。几瓶水，几罐罐头，还有一个工具箱。

然后，你在副驾驶座的储物格里，发现了一个东西。

是一本日记。

你该怎么办？`,minDay:8,maxTriggers:1,weight:9,choices:[{id:`read_diary`,text:`翻看那本日记`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],result:`你拿起日记，翻开了第一页。

日记的主人叫李明，是一个普通的上班族。

"第1天：雾来了。我开车回家，但是雾太大了，我迷路了。手机没有信号，导航也用不了。我只能把车停在路边，等雾散。"

"第3天：雾还没有散。食物和水快用完了。我听到外面有什么东西在抓车，很可怕。"

"第5天：我看到了它。不是野兽，是某种……更巨大的东西。它在雾里移动，像一座山。它看到了我的车，朝我走过来。我吓得不敢动。然后，它走了。"

"第7天：我快疯了。雾里有声音，在叫我的名字。我知道那不是真的，但我控制不住自己。我想出去，想跟着那个声音走。"

"第10天：我撑不住了。我要出去了。如果有人看到这本日记，记住——不要相信雾里的任何声音。不要看雾里的任何东西。不要……"

日记到这里就断了。最后一页有一个暗红色的手印。

你合上日记，手在发抖。

你看了看驾驶座上的尸体。

他最终还是出去了。然后，他死了。

【理智-8】

【获得重要情报：迷雾中的声音会叫人的名字。不要相信，不要看，不要跟着走。】

【获得物品：李明的日记。】`,next:`__return__`},{id:`take_supplies_leave`,text:`拿了物资就走，不看日记`,effects:[{kind:`item`,item:`water`,amount:5},{kind:`item`,item:`food`,amount:5},{kind:`resource`,resource:`sanity`,delta:-3}],result:`你没有看日记。

你快速地把后备箱里的水和罐头捡起来，放进背包里。

然后，你转身离开了。

走了一段距离，你回头看了一眼。

那辆黑色的SUV还停在那里，车门开着，驾驶座上的尸体还在。

你打了个寒颤，加快了脚步。

在这个鬼地方，到处都是死人。到处都是故事。但你没有时间，也没有精力，去一一了解。

你只要活下去。

【获得水+5，食物+5】

【理智-3】`,next:`__return__`}]},{id:`phase2_mysterious_footprints`,text:`你在探索的时候，发现了一串脚印。

不是你的脚印。

脚印很大，很深，像是一个很重的人踩出来的。而且，脚印的形状很奇怪，不像是普通的鞋子。

你蹲下来，仔细看了看。

脚印有五个脚趾，像是赤脚踩出来的。但每个脚趾都很长，很尖，像是爪子。

你顺着脚印的方向看了看。

脚印一直延伸到雾里，消失在了浓雾中。

你站起来，心里涌起了一股寒意。

在这个鬼地方，有什么东西，长着爪子一样的脚，在雾里走来走去。

而且，它可能就在附近。

你该怎么办？`,minDay:10,maxTriggers:1,weight:7,choices:[{id:`follow_footprints`,text:`循着脚印走过去看看`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`resource`,resource:`energy`,delta:-15}],result:`你深吸一口气，循着脚印走了过去。

雾越来越浓，脚印越来越清晰。你的心跳加速，手紧紧握着武器。

不知道走了多久，你来到了一个洞穴前。

脚印一直延伸到洞穴里。

你站在洞口，屏住呼吸，往里看了看。

洞穴里很黑，你什么都看不见。但你能听到，里面有什么东西在呼吸。

沉重的，缓慢的呼吸声。

然后，你闻到了一股味道。

是血腥味。很浓的血腥味。

你猛地后退了一步。

就在这时，洞穴里的呼吸声停了。

然后，你听到了一个声音。

是爪子刮擦地面的声音。从洞穴里传来，越来越近。

你吓得转身就跑。

你跑得很快，很用力，不敢回头。

不知道跑了多久，你终于回到了庇护所。

你关上门，靠在墙上，大口喘着气。

你的心脏跳得很快，像是要从嗓子眼里跳出来。

你不知道那个洞穴里是什么，但你知道，它很危险。

【理智-12，体力-15】

【获得重要伏笔：迷雾中的洞穴。里面住着一个长着爪子的生物。它是什么？它会出来吗？】`,next:`__return__`},{id:`mark_location_leave`,text:`记住这个位置，然后离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`marked_creature_location`}],result:`你没有跟着脚印走过去。

你仔细看了看脚印的方向，把这个位置牢牢记在心里。

然后，你转身离开了。

走了一段距离，你回头看了一眼。

雾还在，脚印还在。但你没有看到任何东西。

你打了个寒颤，加快了脚步。

在这个鬼地方，知道什么地方危险，也是一种生存技能。

【理智-3】

【你记住了那个危险区域的位置。以后，你可以选择避开它，或者……等你足够强了，再回来探索。】`,next:`__return__`}]},{id:`phase2_rainy_night_visitor`,text:`晚上，外面下起了雨。

冰冷的雨水敲打着屋顶，发出噼里啪啦的声音。

你靠在墙上，听着雨声，感觉有点困了。

然后，你听到了一个声音。

是敲门声。

很轻，很有节奏，三下，停一下，再三下。

你猛地睁开眼睛，握紧了武器。

在这个鬼地方，晚上敲门的，不一定是人。

"有人吗？"一个声音从门外传来，很轻，很虚弱，"求求你，让我进去躲躲雨……"

是一个女人的声音。

你站起来，走到门口，屏住呼吸，从门缝里往外看。

雨很大，雾很浓，你什么都看不见。只能看到一个模糊的人影，站在门外，浑身湿透了。

你该怎么办？`,minDay:12,maxTriggers:1,weight:6,choices:[{id:`open_door`,text:`开门让她进来`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`let_visitor_in`}],result:`你深吸一口气，打开了门。

一个女人跌了进来。

她大约二十多岁，穿着一件湿透的外套，头发贴在脸上，浑身发抖。她的脸色苍白，嘴唇发紫，显然是冻坏了。

"谢谢你……"她虚弱地说，"谢谢你……"

你关上门，把她扶到火堆旁边。

她伸出手，烤着火，身体还在发抖。

"你叫什么名字？"你问。

"刘雪……"她说，"我叫刘雪……谢谢你救我……"

"你从哪里来？"你问。

刘雪沉默了一会儿，然后说："从一个安全区来的。"

你愣住了。

"安全区？"你问，"什么安全区？"

刘雪抬起头，看着你，眼睛里闪过了一丝恐惧。

"城东的体育馆。"她说，"那里有一个安全区，有几百人。但是……"

她停了一下，声音开始发抖。

"但是那里的人，开始变了。"她说，"他们的眼睛开始变红，他们开始变得暴躁，他们开始……吃人。"

你看着她，心里涌起了一股寒意。

安全区。红眼睛的人。吃人。

这和你从无线电里听到的，一模一样。

【理智-5】

【获得重要情报：城东体育馆有一个安全区，但那里的人开始变异了。红眼睛，暴躁，吃人。】

【刘雪加入了你的庇护所。她是谁？她真的只是一个普通的幸存者吗？】`,next:`__return__`},{id:`talk_through_door`,text:`隔着门跟她说话，不开门`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你没有开门。

你走到门口，隔着门问："你是谁？从哪里来？"

"我叫刘雪……"门外的女人说，声音很虚弱，"从城东的体育馆来的……那里有一个安全区……但是那里的人开始变了……他们的眼睛变红了……他们开始吃人……我逃出来了……"

你愣住了。

安全区。红眼睛的人。吃人。

这和你从无线电里听到的，一模一样。

"你为什么会到这里来？"你问。

"我迷路了……"刘雪说，"我在雾里走了好几天……又冷又饿……求求你，让我进去躲躲雨……我不会伤害你的……"

你沉默了一会儿。

在这个鬼地方，一个从「安全区」逃出来的女人，怎么看都不简单。

但她在外面，又冷又饿，可能会死。

【理智-3】

【获得重要情报：城东体育馆有一个安全区，但那里的人开始变异了。】

【你没有让刘雪进来。她会活下来吗？如果她活下来了，她会记得你吗？】`,next:`__return__`},{id:`refuse_and_warn`,text:`拒绝她，让她离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],result:`你没有开门。

"你走吧。"你说，"我这里不欢迎陌生人。"

门外沉默了一会儿。

然后，你听到了刘雪的声音。

"求求你……"她说，声音带着哭腔，"外面很冷……我会死的……"

"那是你的事。"你说，声音很冷，"在这个鬼地方，每个人都只能靠自己。"

门外又沉默了一会儿。

然后，你听到了脚步声。刘雪走了。

你靠在门上，滑坐在地上。

你的手在发抖。

你知道，那个女人可能活不过今晚。

但你也知道，在这个鬼地方，心软是会害死自己的。

【理智-8】

【伏笔：被拒绝的刘雪。她会活下来吗？如果她活下来了，她会记得你吗？她会报复你吗？】`,next:`__return__`}]},{id:`phase2_abandoned_church`,text:`你发现了一座废弃的教堂。

教堂的门开着，里面一片漆黑。彩色玻璃窗碎了大半，阳光透过碎玻璃照进来，在地上投下斑驳的光影。

你走进去，开始搜索。

教堂里很安静，只有你的脚步声在回荡。

然后，你听到了什么。

是祈祷声。

很轻，很微弱，从教堂的深处传来。

你停下脚步，屏住呼吸。

祈祷声还在继续，用的是一种你听不懂的语言。

你该怎么办？`,minDay:11,maxTriggers:1,weight:6,choices:[{id:`investigate_church`,text:`循着祈祷声走过去`,effects:[{kind:`resource`,resource:`sanity`,delta:-10}],result:`你深吸一口气，循着祈祷声走了过去。

教堂的深处，有一个小房间。

门虚掩着。你推开门，看到了一个人。

一个老人，穿着一件破旧的神父袍，跪在地上，双手合十，正在祈祷。

他的面前，有一个祭坛。祭坛上，放着一个东西。

是一个头骨。

人类的头骨。

头骨上刻着一些奇怪的符文，正在发出微弱的红光。

你吓得后退了一步。

老人停止了祈祷，慢慢地转过身来。

他看到了你，没有惊讶，也没有紧张。

"你好。"他说，声音很平静，"你是来祈祷的吗？"

你看着他，又看了看那个发光的头骨，心里涌起了一股强烈的不安。

"你是谁？"你问，"那个是什么？"

老人笑了笑。

"我是这里的神父。"他说，"那个……是神的使者。"

他指了指那个头骨。

"它会指引我们，在这个迷雾中，找到救赎。"他说，"你愿意加入我们吗？"

你看着他，又看了看那个发光的头骨，心里涌起了一股寒意。

神的使者？救赎？

这怎么看都像是一个邪教。

【理智-10】

【获得重要伏笔：废弃教堂的神父。一个崇拜"神的使者"（一个发光的人类头骨）的神秘神父。他的"救赎"是什么？那个头骨又是什么？】`,next:`__return__`},{id:`leave_church_quietly`,text:`悄悄离开，不打扰他`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你没有走过去。

你悄悄地退了回去，转身离开了教堂。

走了一段距离，你回头看了一眼。

教堂的门还开着，祈祷声还在继续。

你打了个寒颤，加快了脚步。

在这个鬼地方，什么奇怪的东西都有。

【理智-3】

【伏笔：废弃的教堂。里面有一个神秘的神父，在祈祷。他在祈祷什么？他崇拜的是什么？】`,next:`__return__`}]},{id:`phase2_mist_reflection`,text:`你在一个水洼旁边停了下来。

水洼很清，能看到底。你弯下腰，想喝点水。

然后，你看到了自己的倒影。

但是，倒影不对。

你的倒影在笑。

你没有笑。但你的倒影在笑，笑得很诡异，嘴角咧到了耳朵根。

你吓得后退了一步。

倒影也跟着后退了一步，但它还在笑。

然后，倒影说话了。

"你好。"它说，声音和你一模一样，"我们终于见面了。"

你看着水洼里的倒影，心里涌起了一股强烈的恐惧。

在这个鬼地方，连你的倒影都不正常。

你该怎么办？`,minDay:13,maxTriggers:1,weight:5,choices:[{id:`talk_to_reflection`,text:`跟倒影说话，问它是谁`,effects:[{kind:`resource`,resource:`sanity`,delta:-15}],result:`你深吸一口气，蹲下来，看着水洼里的倒影。

"你是谁？"你问。

倒影笑了笑。

"我是你。"它说，"或者说，我是你的另一面。被你压抑的，被你遗忘的，真正的你。"

你愣住了。

"什么意思？"你问。

倒影的笑容变得更诡异了。

"在这个迷雾里，每个人都有另一面。"它说，"你的另一面，就是我。我比你更强，比你更聪明，比你更适合在这个鬼地方活下去。"

它顿了顿，然后说："你想变强吗？你想活下去吗？只要你让我出来，我可以帮你。"

你看着它，心里涌起了一股强烈的不安。

让它出来？

这怎么看都像是一个陷阱。

"让你出来，会怎么样？"你问。

倒影笑了笑。

"很简单。"它说，"我们交换。你到水洼里来，我到外面去。我会用你的身体，活下去。而你……就永远待在水洼里吧。"

你吓得后退了一步。

倒影也跟着后退了一步，但它还在笑。

"怎么样？"它说，"考虑一下？"

你站起来，转身就跑。

你跑得很快，很用力，不敢回头。

不知道跑了多久，你终于停下来，靠在墙上，大口喘着气。

你的心脏跳得很快，像是要从嗓子眼里跳出来。

你这辈子都不会忘记那个笑容。

诡异的，嘴角咧到耳朵根的，你的笑容。

【理智-15】

【获得重要伏笔：迷雾中的倒影。每个人在迷雾里都有另一面。它想和你交换身体。它会再出现吗？】`,next:`__return__`},{id:`destroy_puddle`,text:`把水洼搅浑，破坏倒影`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`energy`,delta:-5}],result:`你没有跟倒影说话。

你捡起一块石头，用力砸向了水洼。

水花四溅，水洼变得浑浊不堪。

倒影消失了。

你站在那里，大口喘着气，手还在发抖。

过了一会儿，水洼慢慢恢复了平静。

你小心翼翼地凑过去看了看。

倒影回来了。

但是，它不再笑了。它只是静静地看着你，面无表情。

就像一个正常的倒影。

但你知道，它还在。它只是暂时隐藏了起来。

你站起来，后退了几步。

"别再出来了。"你说，声音在发抖，"我不会让你出来的。"

倒影没有说话。它只是静静地看着你。

然后，你转身离开了。

走了一段距离，你回头看了一眼。

水洼还在那里，平静无波。

但你知道，那个诡异的倒影，还在水洼里，等着你。

【理智-5，体力-5】

【伏笔：被搅浑的倒影。它暂时隐藏了起来，但它还在。它会再出现吗？你能永远压制住它吗？】`,next:`__return__`}]},{id:`phase2_survivor_camp`,text:`你在探索的时候，发现了一个营地。

营地不大，有几个帐篷，一堆篝火，还有几个人在忙碌。

他们看到了你，停下了手里的活，警惕地看着你。

一个高大的男人走了过来，手里拿着一根铁棍。

"你是谁？"他问，声音很粗，"从哪里来的？"

你看着他，又看了看他身后的几个人。

他们大约有五六个人，有男有女，看起来都很疲惫，但很警惕。

在这个鬼地方，遇到一群幸存者，可能是好事，也可能是坏事。

你该怎么办？`,minDay:12,maxTriggers:1,weight:8,choices:[{id:`introduce_peacefully`,text:`友好地介绍自己，表示没有恶意`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`met_survivor_camp`}],result:`你举起手，表示没有恶意。

"我叫……"你说了一个名字，"我一个人在雾里活了十几天。我没有恶意，只是路过。"

高大的男人看了你很久，然后放下了铁棍。

"我叫赵刚。"他说，"我们也是一群幸存者，在这里扎营。"

他指了指身后的几个人。

"我们有六个人。"他说，"都是从不同的地方逃过来的。"

一个女人走了过来，看着你。

"你一个人？"她问，"在这个鬼地方，一个人能活十几天，很厉害。"

你笑了笑，没有说话。

赵刚看了看你，然后说："要不要加入我们？人多，活下去的几率大一些。"

你看着他，又看了看他身后的几个人。

在这个鬼地方，加入一个团体，可能是好事，也可能是坏事。

【你遇到了一个幸存者营地，首领叫赵刚。他们邀请你加入。你可以选择加入，也可以选择离开。】

【赵刚营地好感度+10】`,next:`__return__`},{id:`be_cautious`,text:`保持警惕，不靠近他们`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你没有靠近他们。

你站在原地，举起手，表示没有恶意。

"我只是路过。"你说，"我不会打扰你们。"

赵刚看了你很久，然后点了点头。

"行。"他说，"那你走吧。"

你点了点头，转身离开了。

走了一段距离，你回头看了一眼。

赵刚还站在那里，看着你。他的眼神很复杂，有警惕，也有……某种你看不懂的情绪。

你打了个寒颤，加快了脚步。

在这个鬼地方，遇到一群幸存者，不一定是好事。

【理智-5】

【伏笔：赵刚的幸存者营地。他们是什么人？他们会对你有恶意吗？】`,next:`__return__`}]},{id:`phase2_mist_letter`,text:`你在探索的时候，发现了一封信。

信被压在一块石头下面，信封已经泛黄了，但还能看清上面的字。

你捡起来，看了看。

信封上写着："给我的爱人。"

没有署名，没有地址。

你打开信封，拿出了里面的信纸。

信纸很薄，上面写满了字，字迹很娟秀，像是一个女人写的。

你开始读。

"亲爱的：

当你看到这封信的时候，我可能已经不在了。

迷雾来的那天，我和你走散了。我找了你很久，但是没有找到。

我知道，你可能还活着，也可能已经……

但我不愿意相信你已经死了。我相信，你还在某个地方，等着我。

我会继续找你。直到找到你，或者……直到我死。

如果我死了，请不要难过。因为，在这个鬼地方，死亡可能是一种解脱。

记住，不要相信雾里的任何声音。不要看雾里的任何东西。不要跟着任何你不认识的人走。

活下去。

这是我对你唯一的期望。

永远爱你的，
小敏"

你读完信，心里涌起了一股酸涩。

在这个鬼地方，每个人都有自己的故事。每个人都在失去，每个人都在寻找。

你该怎么办？`,minDay:9,maxTriggers:1,weight:7,choices:[{id:`take_letter`,text:`把信收起来，以后可能会遇到它的主人`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`took_mist_letter`}],result:`你把信折好，放进了口袋里。

你不知道小敏是谁，也不知道她的爱人是谁。但你知道，如果有一天，你遇到了她的爱人，你会把这封信交给他。

在这个鬼地方，一点希望，可能就是一个人活下去的全部动力。

你站起来，拍了拍身上的灰，继续前进。

【理智-3】

【获得物品：小敏的信。如果以后遇到她的爱人，把信交给他，可能会触发特殊剧情。】`,next:`__return__`},{id:`leave_letter`,text:`把信放回原处，不带走它`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你把信折好，放回了信封里。

然后，你把信放回了石头下面，压好。

你不知道小敏是谁，也不知道她的爱人是谁。但你知道，这封信是她的遗物，应该留在它该在的地方。

你站起来，拍了拍身上的灰，继续前进。

走了一段距离，你回头看了一眼。

那块石头还在那里，静静地压着那封信。

你打了个寒颤，加快了脚步。

在这个鬼地方，到处都是死人。到处都是故事。但你没有时间，也没有精力，去一一了解。

你只要活下去。

【理智-5】`,next:`__return__`}]},{id:`phase2_abandoned_lab`,text:`你发现了一个废弃的实验室。

门开着，里面一片狼藉。实验仪器碎了一地，化学试剂的瓶子倒了，散发着刺鼻的气味。

你走进去，开始搜索。

实验室很大，有很多房间。你一间一间地搜过去。

然后，你在最里面的一个房间里，发现了一个东西。

是一个巨大的玻璃罐。

罐子里面，浸泡着什么东西。

你走过去，仔细看了看。

然后，你吓得后退了一步。

罐子里面，浸泡着一个人。

不，不是一个人。是一个……你不知道该怎么形容。

它看起来像是一个人，但它的皮肤是灰白色的，它的眼睛是红色的，它的手上长着爪子，它的背上长着……翅膀？

它被浸泡在一种绿色的液体里，一动不动。

罐子的前面，有一个标签。

标签上写着："实验体#007。状态：稳定。注：迷雾浓度达到临界值时，实验体表现出异常活跃。"

你看着那个标签，又看了看罐子里的东西，心里涌起了一股强烈的恐惧。

这个实验室，在做什么实验？

这个"实验体#007"，又是什么？

迷雾，和这些实验，有什么关系？`,minDay:13,maxTriggers:1,weight:5,choices:[{id:`search_lab_more`,text:`继续搜索实验室，寻找更多线索`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`resource`,resource:`energy`,delta:-10}],result:`你深吸一口气，继续搜索实验室。

你在一个办公室里，找到了一些文件。

文件上写着：

"项目代号：迷雾。
目标：研究迷雾对人类基因的影响。
进展：实验体#001-#006均已失败。实验体#007状态稳定，表现出超常的力量和恢复能力。
结论：迷雾可以改变人类基因，使其进化。但进化的方向不可控。
警告：实验体#007具有攻击性，需保持迷雾浓度在临界值以下。"

你看完文件，手在发抖。

迷雾。实验。基因改造。

这一切，都联系起来了。

迷雾不是自然灾害。迷雾是人为的。

有人，在做实验，用迷雾，改造人类。

你继续搜索，在一个抽屉里，找到了一张照片。

照片上，有一群人，穿着白大褂，站在实验室里。他们的中间，是那个玻璃罐，罐子里是实验体#007。

照片的背面，写着一行字：

"项目组成员。愿我们的努力，能为人类带来新的未来。"

你看着照片，又看了看罐子里的实验体，心里涌起了一股寒意。

新的未来？

这就是他们所谓的新的未来吗？

把人变成怪物？

【理智-12，体力-10】

【获得重要情报：迷雾是人为的！有人在做实验，用迷雾改造人类基因。实验体#007是第一个成功的实验体。】

【获得物品：项目文件和项目组照片。】

【重要伏笔：迷雾的真相。谁在做这个实验？他们的目的是什么？实验体#007还活着吗？】`,next:`__return__`},{id:`leave_lab_quickly`,text:`赶紧离开这个地方`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],result:`你没有继续搜索。

你转身就跑，一路跌跌撞撞地跑出了实验室。

你靠在实验室外面的墙上，大口喘着气。

你的手还在发抖。

那个罐子里的东西，那个标签，那个"实验体#007"，一直在你脑海里回荡。

你不知道那个实验室在做什么实验，但你知道，那不是什么好事。

在这个鬼地方，有些事情，不知道比知道好。

【理智-8】

【伏笔：废弃的实验室。里面有一个叫"实验体#007"的东西。它是什么？它还活着吗？那个实验室在做什么实验？】`,next:`__return__`}]},{id:`phase2_mist_child`,text:`你在雾里走着，突然听到了一个声音。

是一个孩子的笑声。

很清脆，很天真，从雾的深处传来。

你停下脚步，环顾四周。

雾很浓，你什么都看不见。

"来追我呀~"那个声音又说，带着笑意。

你愣住了。

在这个鬼地方，怎么会有孩子的笑声？

而且，这个声音……你好像在哪里听过。

你想了想，然后，你想起来了。

这个声音，和朵朵的声音，一模一样。

但是，朵朵在你的庇护所里。她不可能在这里。

那么，这个声音是谁？

你该怎么办？`,minDay:14,maxTriggers:1,weight:5,choices:[{id:`follow_child_voice`,text:`循着声音走过去看看`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`resource`,resource:`health`,delta:-10}],result:`你深吸一口气，循着声音走了过去。

雾越来越浓，笑声越来越近。你的心跳加速，手紧紧握着武器。

不知道走了多久，你来到了一片空地。

空地的中央，有一个孩子。

是朵朵。

不，不是朵朵。她看起来和朵朵一模一样，穿着一样的衣服，抱着一样的毛绒兔子。但是，她的眼睛是红色的。

她看到了你，笑了。

"来追我呀~"她说，声音和朵朵一模一样。

然后，她转身就跑，跑进了雾里。

你站在原地，浑身发冷。

那不是朵朵。

那是什么？

它为什么长得和朵朵一模一样？

它想把你引到哪里去？

你转身就跑。

你跑得很快，很用力，不敢回头。

不知道跑了多久，你终于回到了庇护所。

你关上门，靠在墙上，大口喘着气。

朵朵看到你，跑了过来。

"哥哥/姐姐，你怎么了？"她问，"你的脸色好白。"

你看着她，看着她正常的、黑色的眼睛，心里涌起了一股强烈的恐惧。

刚才那个"朵朵"，是谁？

【理智-15，健康-10】

【获得重要伏笔：迷雾中的假朵朵。一个长得和朵朵一模一样，但眼睛是红色的存在。它是什么？它想干什么？它和迷雾有什么关系？】`,next:`__return__`},{id:`return_to_shelter`,text:`赶紧回庇护所，确认朵朵还在`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`energy`,delta:-15}],result:`你没有跟着声音走过去。

你转身就跑，一路跌跌撞撞地跑回了庇护所。

你推开门，看到了朵朵。

她正坐在火堆旁边，抱着她的毛绒兔子，在发呆。

她听到声音，抬起头，看到了你。

"哥哥/姐姐，你回来了。"她说，"你怎么这么快就回来了？"

你看着她，看着她正常的、黑色的眼睛，松了一口气。

"我没事。"你说，声音还在发抖，"只是……有点累。"

朵朵看着你，眼睛里充满了担心。

"你是不是遇到什么了？"她问。

你沉默了一会儿，然后摇了摇头。

"没有。"你说，"什么都没有。"

你没有告诉她。

你不知道该怎么告诉她。

在这个鬼地方，有一个东西，长得和她一模一样，但眼睛是红色的。

【理智-5，体力-15】

【伏笔：迷雾中的假朵朵。你没有去追它，但它还在雾里。它会再出现吗？它会对朵朵做什么吗？】`,next:`__return__`}]},{id:`phase2_rainy_night_monster`,text:`晚上，外面下起了雨。

冰冷的雨水敲打着屋顶，发出噼里啪啦的声音。

你靠在墙上，听着雨声，感觉有点困了。

然后，你听到了一个声音。

是爪子刮擦墙壁的声音。

很轻，很有节奏，一下，一下，从外面传来。

你猛地睁开眼睛，握紧了武器。

在这个鬼地方，晚上抓墙的，不一定是猫。

你站起来，走到门口，屏住呼吸，从门缝里往外看。

雨很大，雾很浓，你什么都看不见。但你能听到，爪子刮擦墙壁的声音，越来越近了。

然后，声音停了。

你屏住呼吸，一动不动。

几秒钟后，你听到了一个声音。

是呼吸声。

沉重的，缓慢的呼吸声，就在门外。

有什么东西，就在门外，在呼吸。

你该怎么办？`,minDay:10,maxTriggers:1,weight:8,choices:[{id:`hold_breath_wait`,text:`屏住呼吸，等它离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],result:`你屏住呼吸，一动不动。

时间一分一秒地过去。

门外的呼吸声还在继续，沉重的，缓慢的。

你能听到，它在嗅门，像是在闻里面的气味。

你的心跳得很快，像是要从嗓子眼里跳出来。但你不敢动，不敢发出一点声音。

不知道过了多久，呼吸声停了。

然后，你听到了脚步声。

它走了。

你靠在墙上，滑坐在地上，大口喘着气。

你的衣服已经被冷汗湿透了。

你不知道门外的是什么，但你知道，如果你刚才发出了一点声音，你可能就死了。

【理智-8】

【伏笔：雨夜的访客。一个在门外呼吸的东西。它是什么？它会再回来吗？】`,next:`__return__`},{id:`attack_through_door`,text:`隔着门攻击它`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`energy`,delta:-20}],result:`你握紧武器，猛地冲向门，用武器狠狠地刺了过去。

武器刺穿了木门，刺进了什么东西里。

你听到了一声凄厉的惨叫。

然后，你听到了疯狂的爪子刮擦墙壁的声音。它在攻击门！

你吓得后退了一步，握紧武器，准备战斗。

门被抓得木屑乱飞，眼看就要破了。

然后，声音停了。

你屏住呼吸，一动不动。

几秒钟后，你听到了脚步声。

它走了。

你靠在墙上，滑坐在地上，大口喘着气。

你的手还在发抖。

你不知道门外的是什么，但你知道，你刚才差点死了。

你看了看门上的洞，洞外面，有一些黑色的血。

它受伤了。

但它还会回来吗？

【健康-15，体力-20】

【伏笔：被刺伤的访客。你刺伤了那个在门外呼吸的东西。它会回来报复吗？它是什么？】`,next:`__return__`},{id:`make_loud_noise`,text:`制造很大的声音，把它吓跑`,effects:[{kind:`resource`,resource:`sanity`,delta:-10}],result:`你拿起一个铁锅，用力地敲了起来。

"铛！铛！铛！"

巨大的声音在庇护所里回荡。

然后，你听到了门外的反应。

是一声惊叫。

然后，是慌乱的脚步声。

它跑了。

你停止了敲锅，靠在墙上，大口喘着气。

你的手还在发抖。

你不知道门外的是什么，但你知道，它怕声音。

或者说，它怕很大的声音。

你打了个寒颤。

在这个鬼地方，连怪物都有弱点。

【理智-10】

【获得情报：迷雾中的某些生物怕很大的声音。】

【伏笔：被吓跑的访客。你用很大的声音吓跑了它。它会再回来吗？它会带着更多的同类回来吗？】`,next:`__return__`}]},{id:`phase2_mist_signpost`,text:`你在探索的时候，发现了一个路标。

路标是用木头做的，插在路边，上面刻着字。

你走过去，看了看。

路标上有三个箭头，分别指向三个方向。

左边的箭头写着："安全区 ←"
中间的箭头写着："真相 ↑"
右边的箭头写着："死亡 →"

你看着路标，心里涌起了一股复杂的感觉。

在这个鬼地方，居然有路标。而且，路标上的字，怎么看都像是一个陷阱。

安全区？真相？死亡？

你该相信哪个？

或者，你该哪个都不信？

你该怎么办？`,minDay:12,maxTriggers:1,weight:6,choices:[{id:`go_safe_zone`,text:`往左边走，去安全区`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`went_to_safe_zone_direction`}],result:`你决定往左边走，去安全区。

你沿着左边的路，走了大约一个小时。

然后，你看到了它。

是一个体育馆。体育馆的大门紧闭，门口有几个人在站岗。

他们看到了你，举起了武器。

"什么人？"其中一个人喊，"从哪里来的？"

你举起手，表示没有恶意。

"我是一个幸存者。"你说，"我听说这里有一个安全区，所以过来看看。"

那几个人对视了一眼，然后其中一个人说："在这里等着。"

他转身跑进了体育馆。

几分钟后，他回来了，带着一个高大的男人。

高大的男人看了你很久，然后说："跟我来。"

你跟着他，走进了体育馆。

体育馆里有很多人，大约有几百个。他们有的在睡觉，有的在吃东西，有的在聊天。

看起来，这里确实是一个安全区。

但是，你注意到，这里的人，眼睛都有点红。

不是很明显，但仔细看，能看出来。

你心里涌起了一股不安。

【理智-5】

【你来到了城东体育馆安全区。这里有几百人，但他们的眼睛都有点红。这是怎么回事？】

【重要伏笔：安全区的真相。这里的人，开始变异了吗？】`,next:`__return__`},{id:`go_truth`,text:`往中间走，去寻找真相`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`resource`,resource:`energy`,delta:-15}],result:`你决定往中间走，去寻找真相。

你沿着中间的路，走了大约两个小时。

路越来越难走，雾越来越浓。

然后，你看到了它。

是一个废弃的实验室。

实验室的门开着，里面一片漆黑。

你走进去，打开手电筒，开始搜索。

实验室很大，有很多房间。你一间一间地搜过去。

然后，你在最里面的一个房间里，发现了一个东西。

是一个巨大的机器。

机器的中央，有一个玻璃罐。罐子里面，是一团浓雾。

浓雾在罐子里翻滚，像是活的一样。

机器的前面，有一个控制面板。面板上，有很多按钮和显示屏。

你走过去，看了看显示屏。

显示屏上，写着：

"迷雾发生器。状态：运行中。浓度：正常。范围：全城。"

你看着显示屏，手在发抖。

迷雾是人为的。

这个机器，就是迷雾的源头。

有人，用这个机器，制造了迷雾，笼罩了整座城市。

为什么？

他们为什么要这么做？

【理智-10，体力-15】

【获得重要情报：迷雾是人为的！这个废弃实验室里的"迷雾发生器"，就是迷雾的源头。】

【重要伏笔：迷雾的真相。谁制造了迷雾？他们的目的是什么？这个机器还能关掉吗？关掉迷雾，世界会恢复正常吗？】`,next:`__return__`},{id:`ignore_signpost`,text:`不相信路标，继续走自己的路`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你没有相信路标。

在这个鬼地方，一个莫名其妙的路标，怎么看都像是一个陷阱。

你转身，继续走自己的路。

走了一段距离，你回头看了一眼。

路标还在那里，静静地立在雾里。

三个箭头，分别指向三个方向。

安全区。真相。死亡。

你打了个寒颤，加快了脚步。

在这个鬼地方，好奇心是会害死猫的。

【理智-3】

【伏笔：迷雾中的路标。你没有相信它。但它说的是真的吗？安全区真的存在吗？真相真的在那个方向吗？死亡又是什么？】`,next:`__return__`}]}],bl={doctor_chen_find:{id:`doctor_chen_find`,text:`你在探索一栋废弃的医院时，听到了一个声音。

是咳嗽声。

很剧烈的咳嗽，从医院的深处传来。

你停下脚步，屏住呼吸，循着咳嗽声走了过去。

在一间急诊室里，你看到了一个女人。

她大约三十多岁，穿着一件破旧的白大褂，上面沾满了血迹和污渍。她躺在一张病床上，脸色苍白，额头上全是冷汗。

她的左臂缠着绷带，绷带已经被血浸透了。她的呼吸很急促，每一次呼吸都伴随着剧烈的咳嗽。

她听到了脚步声，睁开眼睛，看到了你。

"你是谁？"她虚弱地问，声音沙哑，"这里不安全……快走……"

你看着她，心里涌起了一股复杂的感觉。

在这个鬼地方，一个受伤的医生，可能是最宝贵的资源。但她也可能是一个负担。

你该怎么办？`,choices:[{id:`help_doctor`,text:`帮她处理伤口，带她回庇护所`,hint:`需要药品和绷带。医生是宝贵的资源，但她可能会拖累你。`,effects:[{kind:`item`,item:`medicine`,amount:-3},{kind:`item`,item:`bandage`,amount:-2},{kind:`resource`,resource:`energy`,delta:-15},{kind:`flag`,flag:`rescued_doctor_chen`}],next:`doctor_chen_treatment`,result:`你走过去，检查了一下她的伤口。

左臂被什么东西划了一道很深的口子，已经开始发炎了。她的体温很高，显然是在发烧。

"你是医生？"你问。

她点了点头。"陈静……市第一人民医院的外科医生……"她说，声音很虚弱，"迷雾来的时候，我正在做手术……病人死了……同事们也都……"

她的眼睛红了，但没有哭。

"别说了。"你说，"我先帮你处理伤口。"

你从背包里拿出药品和绷带，仔细地帮她清理伤口，消毒，包扎。

陈静很坚强，整个过程中，她只是咬着牙，没有叫出声。

"好了。"你说，"你能走吗？"

陈静试着坐起来，但是身体太虚弱了，又倒了下去。

"我……我走不动……"她说，声音很小。

你看着她，心里涌起了一股复杂的感觉。

在这个鬼地方，带着一个走不动的人，是很危险的。

但她是一个医生。在这个鬼地方，一个医生，可能比一百个战士都宝贵。

【使用药品-3，绷带-2，体力-15】`},{id:`ask_about_hospital`,text:`先问她医院里还有什么，再决定`,hint:`务实的选择。医院里可能有宝贵的药品和设备。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`asked_about_hospital`}],next:`doctor_chen_hospital_info`,result:`你没有立刻帮她。

"医院里还有什么？"你问，"药品？设备？还有其他人吗？"

陈静看着你，眼睛里闪过了一丝失望。但她还是回答了。

"药品……药房里还有很多……"她说，"但是药房在三楼，三楼有……有那些东西……"

她的身体抖了一下。

"什么东西？"你问。

"病人……"她说，声音在发抖，"那些被感染的病人……他们变了……眼睛变红了，变得很暴躁……他们吃人……"

你看着她，心里涌起了一股寒意。

红眼睛的人。吃人。

这和你从刘雪那里听到的，一模一样。

"三楼有多少这样的病人？"你问。

"不知道……"陈静说，"至少有几十个……我逃出来的时候，他们还在药房附近……"

你沉默了一会儿。

几十个红眼睛的感染者。药房里有很多药品。

这是一个机会，也是一个危险。

【理智-3】

【获得重要情报：市第一人民医院三楼药房有大量药品，但有几十个红眼睛感染者把守。】`},{id:`leave_doctor`,text:`她太虚弱了，带不走，给她留点物资就走`,hint:`最安全的选择。但你可能会失去一个宝贵的医生。`,effects:[{kind:`item`,item:`food`,amount:-3},{kind:`item`,item:`water`,amount:-2},{kind:`resource`,resource:`sanity`,delta:-8}],next:`start`,result:`你看着她，心里很矛盾。

她太虚弱了，走不动。带着她，你可能会死。

你从背包里拿出一些食物和水，放在她的床边。

"这些给你。"你说，"我……我走了。"

陈静看着你，没有说话。她的眼睛里没有怨恨，只有一种平静的绝望。

"没关系。"她说，声音很轻，"在这个鬼地方，每个人都只能靠自己。"

你转身离开了。

走了一段距离，你回头看了一眼。

医院的大门还开着，陈静还躺在那张病床上。

你不知道她能不能活下来。

但你知道，在这个鬼地方，你救不了所有人。

【食物-3，水-2，理智-8】

【伏笔：被遗弃的医生陈静。她会活下来吗？如果她活下来了，她会记得你吗？】`}]},doctor_chen_treatment:{id:`doctor_chen_treatment`,text:`你把陈静背回了庇护所。

她很轻，比你想象的要轻得多。也许是因为这些天她没怎么吃东西。

你把她放在火堆旁边，给她盖了一件外套。

朵朵看到她，跑了过来。

"她是谁？"朵朵问，"她受伤了吗？"

"她是医生。"你说，"她受伤了，需要休息。"

朵朵点了点头，然后从口袋里掏出一块饼干，递给陈静。

"给你。"朵朵说，"吃了就不疼了。"

陈静看着朵朵，眼睛里闪过了一丝温柔。

"谢谢你。"她说，接过饼干，小口小口地吃了起来。

你看着她们，心里涌起了一股奇怪的感觉。

在这个鬼地方，你居然有了一个小小的团体。

你，朵朵，现在又多了一个医生。

也许，你们真的能活下去。

陈静吃完饼干，靠在墙上，闭上眼睛休息。

过了一会儿，她睁开眼睛，看着你。

"谢谢你。"她说，"如果不是你，我今天可能就死在那个医院里了。"

你该怎么回应她？`,choices:[{id:`welcome_doctor`,text:`欢迎她加入，说以后大家一起活下去`,hint:`温暖的选择。陈静会非常信任你。`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`welcomed_doctor_chen`}],next:`start`,result:`你看着她，认真地说："以后，大家一起活下去。"

陈静看着你，眼睛里闪过了一丝感动。

"好。"她说，声音很轻，但很坚定，"一起活下去。"

你看着她，又看了看朵朵，心里涌起了一股温暖。

在这个鬼地方，你不再是一个人了。

你有了同伴。

【陈静加入了你的队伍。】

【陈静好感度+30】

【获得能力：医疗支援。陈静在场时，治疗效果+50%，每日自动恢复健康+3。】

【理智+5】`},{id:`ask_about_medical_skills`,text:`问她会什么，能帮上什么忙`,hint:`务实的选择。了解她的能力，方便后续分工。`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`asked_doctor_skills`}],next:`start`,result:`你看着她，问："你是外科医生？具体会什么？"

陈静点了点头。

"普外科。"她说，"会做手术，会处理外伤，会用药。在医院的时候，我一个人能管二十张病床。"

她顿了顿，又说："但是在这里，没有手术室，没有设备，很多事情我做不了。我只能处理一些简单的外伤，开一些常用药。"

"那也很厉害了。"你说。

陈静笑了笑，那是你第一次看到她笑。

"在这个鬼地方，能处理外伤，能开药，已经能救很多人的命了。"她说。

你看着她，点了点头。

在这个鬼地方，一个医生，确实是最宝贵的资源。

【陈静加入了你的队伍。】

【陈静好感度+15】

【获得能力：医疗支援。陈静在场时，治疗效果+50%，每日自动恢复健康+3。】

【理智+2】`},{id:`ask_about_infection`,text:`问她关于「感染」的事情，红眼睛的人是怎么回事`,hint:`重要情报。了解迷雾感染的真相。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`asked_about_infection`}],next:`start`,result:`你看着她，问："你刚才说，医院里的病人变了，眼睛变红了，吃人。这到底是怎么回事？"

陈静的脸色变了。

她沉默了很久，然后说："我不知道。"

"迷雾来的那天，医院里收了很多病人。"她说，"都是被雾里的东西抓伤的。一开始，他们只是发烧，咳嗽。然后……然后他们的眼睛开始变红，变得很暴躁，很有攻击性。"

她的身体抖了一下。

"我亲眼看到，一个被感染的护士，咬死了三个病人。"她说，声音在发抖，"她的力气变得很大，几个男医生都按不住她。"

"那之后呢？"你问。

"之后……医院就乱了。"陈静说，"被感染的人越来越多，没被感染的人都在跑。我和几个同事逃到了急诊室，但是……但是他们都死了。只有我一个人活了下来。"

她的眼泪掉了下来。

"我不知道这是什么病。"她说，"我不知道它是怎么传播的。我只知道，被雾里的东西抓伤，就有可能被感染。一旦被感染，就……就再也变不回来了。"

你看着她，心里涌起了一股强烈的不安。

被雾里的东西抓伤，就会被感染。眼睛变红，变得暴躁，吃人。

这不是普通的病。这是……某种更可怕的东西。

【理智-5】

【获得重要情报：迷雾感染。被雾里的生物抓伤会被感染，症状是眼睛变红、暴躁、有攻击性、吃人。一旦感染，无法治愈。】

【陈静加入了你的队伍。】

【陈静好感度+10】

【获得能力：医疗支援。陈静在场时，治疗效果+50%，每日自动恢复健康+3。】`}]},doctor_chen_hospital_info:{id:`doctor_chen_hospital_info`,text:`陈静告诉你，医院三楼的药房里有大量药品，但有几十个红眼睛的感染者把守。

你看着她，心里在盘算。

几十个感染者。大量药品。

如果能拿到那些药品，你们的生存几率会大大提高。但如果失败了，你们可能都会死。

你该怎么办？`,choices:[{id:`plan_hospital_raid`,text:`计划去医院药房拿药品，但需要更多准备`,hint:`明智的选择。先准备，再行动。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`planned_hospital_raid`}],next:`start`,result:`你看着陈静，认真地说："那些药品，我们必须拿到。但是现在不行，我们需要更多准备。"

陈静点了点头。

"你说得对。"她说，"三楼的感染者太多了，硬闯肯定不行。我们需要想个办法，把他们引开，或者……或者找到其他通道。"

"医院有其他通道吗？"你问。

陈静想了想，然后说："有。医院的太平间在地下一层，有一个通道可以直接通到三楼的药房后面。但是……那个通道很窄，而且很黑，不知道里面有没有感染者。"

你看着她，点了点头。

"好。"你说，"我们先准备，等准备好了，就从那个通道进去。"

陈静看着你，眼睛里闪过了一丝敬佩。

"你很冷静。"她说，"在这个鬼地方，能这么冷静的人，不多。"

你笑了笑，没有说话。

在这个鬼地方，不冷静的人，都死了。

【理智-3】

【获得任务：医院药房突袭。准备好后，从地下太平间的通道进入三楼药房，获取大量药品。】

【获得重要情报：市第一人民医院地下太平间有一条秘密通道，可以直通三楼药房后面。】`},{id:`abandon_hospital`,text:`太危险了，放弃医院的药品`,hint:`安全的选择。但会失去大量药品。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],next:`start`,result:`你摇了摇头。

"太危险了。"你说，"几十个感染者，我们这点人，硬闯就是送死。"

陈静看着你，眼睛里闪过了一丝失望。但她还是点了点头。

"你说得对。"她说，"是太危险了。"

你看着她，心里涌起了一股愧疚。

你知道，那些药品可能能救很多人的命。但是，你也知道，在这个鬼地方，活着比什么都重要。

"走吧。"你说，"我们先回去。"

陈静点了点头，撑着墙，慢慢站了起来。

她的身体还很虚弱，但她能走了。

你扶着她，一起走出了医院。

走了一段距离，你回头看了一眼。

医院的大门还开着，像是一张巨兽的嘴，在等待着下一个猎物。

你打了个寒颤，加快了脚步。

【理智-5】

【陈静加入了你的队伍。（她自己走回来了）】

【陈静好感度+5】`},{id:`go_now_careful`,text:`现在就去，但走秘密通道，小心行事`,hint:`冒险的选择。可能拿到大量药品，也可能死。`,effects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`resource`,resource:`energy`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`hospital_raid_now`}],next:`start`,result:`你看着陈静，认真地说："现在就去。走那个秘密通道。"

陈静愣住了。

"现在？"她说，"你确定？我们还没有准备……"

"来不及准备了。"你说，"那些药品，早一天拿到，我们就早一天安全。"

陈静看着你，沉默了一会儿，然后点了点头。

"好。"她说，"我带你去。"

你跟着陈静，来到了医院的地下一层。

太平间的门开着，里面一片漆黑，散发着一股浓重的福尔马林和腐臭的混合气味。

你捂住鼻子，跟着陈静走了进去。

太平间里很冷，比外面冷得多。你的呼吸在空气中凝成了白雾。

陈静走到一个停尸柜前面，用力拉开。

柜子后面，是一个狭窄的通道。

"就是这里。"陈静说，"从这里上去，就是药房的后面。"

你深吸一口气，钻进了通道。

通道很窄，很暗，你只能用手摸着墙壁前进。墙壁很潮湿，长满了青苔。

不知道走了多久，你终于看到了前面的光。

通道的尽头，是一个小门。

你推开门，走了进去。

是药房。

药房里很安静，没有感染者。

你看着满架子的药品，心里涌起了一股狂喜。

抗生素、止痛药、消炎药、绷带、消毒液……应有尽有。

你快速地把药品装进背包里。

就在这时，你听到了外面传来了脚步声。

感染者发现你们了！

你背起背包，跟着陈静，从通道里跑了出去。

你们跑得很快，很用力，不敢回头。

不知道跑了多久，你们终于跑出了医院。

你靠在墙上，大口喘着气。

你的手臂被通道里的石头划了一道口子，在流血。但你不在乎。

你看着背包里满满的药品，笑了。

这一趟，值了。

【健康-20，体力-30，理智-10】

【获得大量药品：药品+30，绷带+20，消毒液+10】

【获得称号：无畏的探险者。力量+2，敏捷+2，幸运+1。】

【陈静好感度+25】`}]},hunter_zhou_meet:{id:`hunter_zhou_meet`,text:`你在一片树林边缘探索时，听到了一个声音。

是枪声。

很响，很清脆，从树林的深处传来。

你停下脚步，屏住呼吸。

在这个鬼地方，有枪的人，可能是朋友，也可能是敌人。

你该怎么办？`,choices:[{id:`investigate_gunshot`,text:`循着枪声走过去看看`,hint:`可能遇到一个有枪的幸存者。也可能遇到危险。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`energy`,delta:-10}],next:`hunter_zhou_find`,result:`你深吸一口气，循着枪声走了过去。

树林里很暗，雾气很重。你小心翼翼地走着，手紧紧握着武器。

走了大约十分钟，你看到了他。

一个老人，大约五十多岁，穿着一件破旧的迷彩服，手里拿着一把猎枪。他站在一棵大树旁边，正在给猎枪装子弹。

他的脚边，躺着一只死兔子。

他听到了脚步声，猛地抬起头，把猎枪对准了你。

"什么人？"他喊，声音很粗，"别动！再动我开枪了！"

你举起手，表示没有恶意。

"我是幸存者。"你说，"我没有恶意。"

老人看着你，看了很久，然后慢慢放下了猎枪。

"幸存者？"他说，"你一个人？"

"不是。"你说，"我还有几个同伴。"

老人点了点头，然后指了指脚边的兔子。

"要不要一起吃？"他说，"我刚打的，很新鲜。"

你看着他，又看了看那只兔子，心里涌起了一股复杂的感觉。

在这个鬼地方，一个有猎枪的老猎人，可能是最宝贵的战友。

【理智-5，体力-10】`},{id:`hide_and_observe_hunter`,text:`先躲起来，看看是什么人`,hint:`谨慎的选择。先观察，再决定。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`observed_hunter_zhou`}],next:`hunter_zhou_find`,result:`你没有直接走过去。

你蹲在一丛灌木后面，屏住呼吸，观察着。

过了一会儿，你看到了他。

一个老人，大约五十多岁，穿着一件破旧的迷彩服，手里拿着一把猎枪。他从树林里走出来，脚边跟着一只死兔子。

他走到一棵大树旁边，放下猎枪，开始处理那只兔子。

他的动作很熟练，很快就把兔子皮剥了，然后架起一堆火，开始烤兔子。

你看着他，心里在盘算。

一个有猎枪的老猎人。在这个鬼地方，这样的人，要么是最好的战友，要么是最危险的敌人。

你观察了很久，发现他没有恶意。他只是一个普通的老人，在这个鬼地方，努力地活下去。

你深吸一口气，从灌木后面走了出来。

老人听到了脚步声，猛地抬起头，把猎枪对准了你。

"什么人？"他喊，"别动！"

你举起手，表示没有恶意。

"我是幸存者。"你说，"我观察你很久了，你没有恶意。我也没有恶意。"

老人看着你，看了很久，然后慢慢放下了猎枪。

"你很谨慎。"他说，"在这个鬼地方，谨慎的人才能活下去。"

他指了指火堆上的兔子。

"要不要一起吃？"他说，"刚打的，很新鲜。"

【理智-3】`},{id:`leave_hunter_area`,text:`有枪的人太危险，赶紧离开`,hint:`最安全的选择。但可能错过一个宝贵的战友。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`start`,result:`你没有走过去。

在这个鬼地方，有枪的人，太危险了。

你转身，悄悄地离开了。

走了一段距离，你回头看了一眼。

树林还在那里，枪声没有再响起。

你不知道那个老人是谁，也不知道他是好是坏。

但你知道，在这个鬼地方，小心驶得万年船。

【理智-3】

【伏笔：树林里的老猎人。他是谁？他还在那里吗？】`}]},hunter_zhou_find:{id:`hunter_zhou_find`,text:`你和老周坐在火堆旁边，一起吃着烤兔子。

兔子很肥，烤得很香。这是你这些天来，吃过的最好的一顿饭。

老周吃得很快，很熟练，一看就是经常在野外生存的人。

"你叫什么名字？"你问。

"周建国。"他说，"大家都叫我老周。以前是山里的猎人，后来禁猎了，就当了护林员。迷雾来的时候，我正在山里巡逻。"

他咬了一口兔子肉，又说："我在山里活了大半辈子，什么野兽没见过？但是这雾里的东西……我从来没见过。"

他的脸色变得凝重。

"那东西，不怕枪。"他说，"我打过好几只，只有打脑袋才能打死。打身体，根本没用。"

你看着他，心里涌起了一股敬佩。

一个老猎人，在山里活了大半辈子。在这个鬼地方，他的经验，比任何武器都宝贵。

你该怎么邀请他加入？`,choices:[{id:`invite_hunter_directly`,text:`直接邀请他加入，说人多活下去的几率大`,hint:`直接的选择。老周可能会同意，也可能会拒绝。`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`invited_hunter_zhou`}],next:`start`,result:`你看着老周，认真地说："加入我们吧。人多，活下去的几率大。"

老周看着你，沉默了很久。

然后，他摇了摇头。

"我习惯了一个人。"他说，"在山里，我一个人活了大半辈子。带着人，反而麻烦。"

你看着他，没有放弃。

"但是这不是山里。"你说，"这是迷雾。这里的东西，你一个人对付不了。"

老周沉默了。

他看着火堆，看了很久，然后说："你说得对。"

他抬起头，看着你。

"好。"他说，"我加入你们。但是，我有一个条件。"

"什么条件？"你问。

"打猎的事情，归我管。"他说，"我知道什么地方有猎物，什么地方危险。你们听我的，就能吃饱饭，就能活下去。"

你看着他，笑了。

"好。"你说，"打猎的事情，归你管。"

老周也笑了。那是你第一次看到他笑，笑得很憨厚，像一个孩子。

【老周加入了你的队伍。】

【老周好感度+20】

【获得能力：狩猎专家。老周在场时，探索获得食物+100%，遭遇野兽时伤害+30%。】

【获得物品：老周的猎枪（攻击力+50，但需要子弹）。子弹+10】

【理智+3】`},{id:`show_value_first`,text:`先展示你们的实力和资源，再邀请他`,hint:`聪明的选择。让他看到加入的好处。`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`showed_value_to_hunter`}],next:`start`,result:`你没有直接邀请他。

你先跟他聊了聊你们的情况。

"我们有一个庇护所，很安全。"你说，"有医生，有药品，有食物，有水。还有一个小女孩。"

老周看着你，眼睛里闪过了一丝惊讶。

"医生？"他说，"你们还有医生？"

"对。"你说，"市第一人民医院的外科医生。"

老周沉默了一会儿，然后说："在这个鬼地方，有医生，有药品，有安全的庇护所……你们这日子，过得比我好多了。"

他看着你，认真地说："你们缺什么？"

"缺一个会打猎的人。"你说，"缺一个熟悉野外的人。缺一个有枪的人。"

老周看着你，看了很久，然后笑了。

"你这小子，很会说话。"他说，"行，我加入你们。"

他拿起猎枪，站了起来。

"走吧。"他说，"带我去看看你们的庇护所。"

你看着他，心里涌起了一股喜悦。

在这个鬼地方，一个有猎枪的老猎人，是最宝贵的战友。

【老周加入了你的队伍。】

【老周好感度+30】

【获得能力：狩猎专家。老周在场时，探索获得食物+100%，遭遇野兽时伤害+30%。】

【获得物品：老周的猎枪（攻击力+50，但需要子弹）。子弹+15】

【获得称号：出色的谈判者。智力+2，魅力+2，NPC好感度获取+20%。】

【理智+5】`},{id:`ask_about_hunting_grounds`,text:`先问他哪里有猎物，哪里危险，建立合作关系`,hint:`务实的选择。先获取情报，再决定是否邀请。`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`asked_hunting_grounds`}],next:`start`,result:`你没有直接邀请他。

"你对这一带熟悉吗？"你问，"哪里有猎物？哪里危险？"

老周看了你一眼，然后说："你这小子，很务实。"

他指了指东边。

"东边有一条河，河边有很多兔子和野鸡。"他说，"但是河边也危险，雾里的东西经常在河边喝水。去那里打猎，最好是中午，雾最淡的时候。"

他又指了指北边。

"北边有一片树林，树林里有野猪。"他说，"野猪肉多，但是野猪很凶，一个人对付不了。至少要两个人，一个人引开，一个人开枪。"

他又指了指西边。

"西边不要去。"他说，声音变得凝重，"西边有一个很大的洞穴，里面住着一只……很大的东西。我见过它的脚印，比我的手掌还大。那东西，不是我们能对付的。"

你看着他，点了点头。

这些情报，很宝贵。

"谢谢你。"你说，"这些情报，能救我们的命。"

老周摆了摆手。

"在这个鬼地方，信息就是生命。"他说，"你要是愿意，以后我们可以一起打猎。人多，安全。"

你看着他，笑了。

这正是你想要的。

【老周加入了你的队伍。（以合作伙伴的身份）】

【老周好感度+15】

【获得能力：狩猎专家。老周在场时，探索获得食物+100%，遭遇野兽时伤害+30%。】

【获得重要情报：东边河边有猎物但危险，北边树林有野猪需要两人合作，西边有巨大生物的洞穴不要去。】

【获得物品：老周的猎枪（攻击力+50，但需要子弹）。子弹+10】

【理智+2】`}]},group_conflict_food:{id:`group_conflict_food`,text:`晚上，你们围坐在火堆旁边，吃着晚饭。

今天的食物不多，每个人只分到了一小块面包和半瓶水。

老周看着手里的面包，皱起了眉头。

"就这么点？"他说，"我打了一天猎，就吃这么点？"

陈静抬起头，看着他。

"食物不多了。"她说，"我们必须节省。"

"节省？"老周说，声音变大了，"我今天打了两只兔子，全给你们了。结果我就吃这么点？这公平吗？"

朵朵吓得缩了缩脖子，躲到了你身后。

你看着他们，心里涌起了一股不安。

人多了，矛盾就来了。

食物分配，是最容易引发冲突的问题。

你该怎么办？`,choices:[{id:`support_hunter`,text:`支持老周，说打猎的人应该多吃`,hint:`公平的选择。但陈静和朵朵可能会不满。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`supported_hunter_in_conflict`}],next:`start`,result:`你看着老周，认真地说："他说得对。打猎的人，消耗大，应该多吃。"

陈静看着你，眼睛里闪过了一丝不满。

"那我们呢？"她说，"我处理伤口，照顾病人，消耗也不小。朵朵还是个孩子，正在长身体。"

你看着她，想了想，然后说："这样吧。打猎的人，多吃半份。其他人，按正常分量。朵朵，多吃四分之一份，因为她是孩子。"

老周点了点头，表示满意。

陈静想了想，也点了点头。

"行。"她说，"这样还算公平。"

朵朵从你身后探出头，看着你，眼睛里闪着光。

"谢谢哥哥/姐姐。"她说。

你看着她们，心里松了一口气。

这场冲突，总算解决了。

但是你知道，这只是开始。以后，还会有更多的矛盾。

【老周好感度+15】

【陈静好感度-5】

【朵朵好感度+5】

【理智-3】

【获得规则：食物分配制度。打猎者多吃半份，孩子多吃四分之一份。】`},{id:`support_doctor`,text:`支持陈静，说每个人都应该平等`,hint:`平等的选择。但老周可能会不满。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`supported_doctor_in_conflict`}],next:`start`,result:`你看着老周，认真地说："在这个鬼地方，每个人都在为活下去努力。没有谁比谁更重要。食物，应该平分。"

老周看着你，眼睛里闪过了一丝不满。

"平分？"他说，"我打了一天猎，你们在庇护所里待着，结果我们吃一样多？这叫公平？"

"老周。"陈静说，"我也在工作。我处理伤口，我照顾病人，我管理药品。这些都是工作。"

"那她呢？"老周指着朵朵，"她一个小孩子，什么都不干，也跟我们吃一样多？"

朵朵吓得又缩了缩脖子。

你看着老周，认真地说："她是孩子。在这个鬼地方，保护孩子，是我们的责任。"

老周看着你，看了很久，然后叹了口气。

"行。"他说，"你是头儿，你说了算。"

他拿起面包，大口大口地吃了起来，不再说话。

你看着他，心里涌起了一股愧疚。

你知道，他心里不舒服。但是，你也知道，在这个鬼地方，平等，是维持团体稳定的基础。

【陈静好感度+10】

【朵朵好感度+10】

【老周好感度-15】

【理智-5】

【获得规则：食物分配制度。所有人平分食物。】`},{id:`compromise_solution`,text:`提出折中方案：按贡献分配，但设最低保障`,hint:`聪明的选择。平衡各方利益。`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`compromise_in_conflict`}],next:`start`,result:`你看着他们，认真地说："我有一个方案。"

"按贡献分配。"你说，"贡献大的人，多吃。贡献小的人，少吃。但是，每个人都有最低保障，不会饿肚子。"

老周看着你，问："怎么算贡献？"

"打猎的，按打到的猎物重量算。"你说，"处理伤口的，按处理的伤口数量算。管理物资的，按管理的物资数量算。探索的，按探索的范围算。"

你顿了顿，又说："朵朵是孩子，不算贡献，但是她的最低保障是成年人的四分之三。因为她正在长身体。"

陈静看着你，点了点头。

"这个方案，还算合理。"她说。

老周想了想，也点了点头。

"行。"他说，"按贡献分配，公平。"

你看着他们，心里松了一口气。

这场冲突，总算圆满解决了。

而且，你还建立了一套分配制度。以后，再遇到类似的问题，就有章可循了。

【老周好感度+10】

【陈静好感度+10】

【朵朵好感度+5】

【理智+2】

【获得规则：贡献分配制度。按贡献分配食物，但每个人都有最低保障。孩子的最低保障是成年人的四分之三。】

【获得称号：公正的领导者。魅力+3，NPC好感度获取+15%，团体冲突概率-30%。】`}]},beast_wave_warning:{id:`beast_wave_warning`,text:`第20天的晚上，老周从外面打猎回来，脸色很凝重。

"不对劲。"他说，"今天林子里太安静了。一只猎物都没有。而且，鸟都飞走了。"

你看着他，心里涌起了一股不安。

"什么意思？"你问。

"动物比人敏感。"老周说，"它们能感觉到危险。林子里的动物都跑了，说明……有什么大的东西，要来了。"

就在这时，你听到了远处传来了声音。

是嚎叫声。

很多野兽的嚎叫声，从四面八方传来，越来越近。

你跑到庇护所的门口，往外看。

雾里，有很多红色的眼睛，在闪烁。

越来越近。

越来越多。

你数了数，至少有几十只。

不，可能有上百只。

这是兽潮。

第一次大型兽潮。

你该怎么办？`,choices:[{id:`defend_shelter`,text:`坚守庇护所，加固防御，迎战兽潮`,hint:`需要足够的武器和物资。守住了，你们就安全了。守不住，你们都会死。`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`defended_beast_wave`}],next:`beast_wave_battle`,result:`你看着大家，认真地说："坚守庇护所。我们加固防御，迎战兽潮。"

老周点了点头。

"好。"他说，"我来布置防线。"

陈静也点了点头。

"我来准备药品和绷带。"她说，"万一有人受伤，我能及时处理。"

朵朵看着你们，紧紧抱着她的毛绒兔子。

"我能做什么？"她问。

你看着她，想了想，然后说："你躲在最里面，不要出声。如果我们输了……你就从后门跑。"

朵朵的眼睛红了，但她还是点了点头。

"嗯。"她说，"我会的。"

你们开始忙碌起来。

老周用木头和石头，在庇护所门口加固了一道防线。

陈静把药品和绷带整理好，放在手边。

你检查了所有的武器，把能找到的武器都分发给大家。

一切准备就绪。

兽潮，来了。

【理智-10】

【大事件：第一次大型兽潮。上百只迷雾野兽围攻庇护所。】`},{id:`abandon_shelter_flee`,text:`放弃庇护所，趁兽潮还没合围，赶紧逃跑`,hint:`安全的选择。但会失去庇护所和所有物资。`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`resource`,resource:`energy`,delta:-30},{kind:`flag`,flag:`fled_beast_wave`}],next:`start`,result:`你看着雾里越来越多的红色眼睛，心里做出了决定。

"走。"你说，"我们放弃庇护所，赶紧跑。"

老周看着你，眼睛里闪过了一丝不满。

"跑？"他说，"我们辛辛苦苦建立的庇护所，就这么放弃了？"

"留得青山在，不怕没柴烧。"你说，"上百只野兽，我们守不住的。跑，还有活路。守，就是死。"

陈静点了点头。

"他说得对。"她说，"我们跑。"

老周看着你们，沉默了一会儿，然后叹了口气。

"行。"他说，"跑。"

你们快速地收拾了一些必要的物资，然后从后门跑了出去。

你们跑得很快，很用力，不敢回头。

身后，传来了野兽的嚎叫声，还有庇护所被破坏的声音。

你知道，你们的家，没了。

不知道跑了多久，你们终于停下来，靠在一棵树上，大口喘着气。

朵朵的眼泪掉了下来。

"我们的家……"她说，"没了……"

你看着她，心里涌起了一股愧疚。

但是你知道，你们活下来了。

在这个鬼地方，活着，比什么都重要。

【理智-15，体力-30】

【失去庇护所和大部分物资。】

【获得状态：无家可归。需要寻找新的庇护所。】

【老周好感度-10】

【伏笔：被兽潮摧毁的庇护所。你们还能回去吗？那里还有什么？】`},{id:`split_up_distract`,text:`分开行动，一部分人引开兽群，一部分人留守`,hint:`冒险的选择。引开兽群的人很危险。但可能能保住庇护所。`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`resource`,resource:`health`,delta:-25},{kind:`flag`,flag:`split_up_beast_wave`}],next:`start`,result:`你看着雾里越来越多的红色眼睛，心里做出了一个大胆的决定。

"分开行动。"你说，"老周，你跟我一起，去引开兽群。陈静，你带着朵朵，留守庇护所。"

老周看着你，眼睛里闪过了一丝敬佩。

"好。"他说，"我跟你一起。"

陈静看着你，眼睛里充满了担心。

"你们小心。"她说。

你点了点头，然后拿起武器，跟老周一起，从后门跑了出去。

你们绕到兽群的侧面，然后老周举起猎枪，对着天空，开了一枪。

"砰！"

枪声在雾里回荡。

兽群被惊动了，所有的红色眼睛，都转向了你们。

"跑！"你喊。

你们转身就跑，兽群在后面追。

你们跑得很快，很用力，不敢回头。

但是，兽群跑得更快。

你能听到，它们的脚步声，越来越近。

就在这时，老周突然停下脚步，转过身，对着兽群，又开了一枪。

"砰！"

最前面的一只野兽，被打中了脑袋，倒了下去。

但是，更多的野兽，涌了上来。

"走！"老周喊，"我来断后！"

你看着他，心里涌起了一股感动。

"一起走！"你喊。

你跑回去，拉住老周，一起跑。

不知道跑了多久，你们终于甩掉了兽群，回到了庇护所。

庇护所还在。陈静和朵朵，都安全。

你靠在墙上，大口喘着气。

你的手臂被野兽的爪子划了一道口子，在流血。但你不在乎。

你们赢了。

【理智-12，健康-25】

【庇护所保住了。】

【老周好感度+30】

【陈静好感度+10】

【获得称号：无畏的领导者。力量+3，敏捷+2，魅力+3，NPC好感度获取+25%。】

【获得成就：第一次兽潮的胜利。】`}]},beast_wave_battle:{id:`beast_wave_battle`,text:`兽潮来了。

第一波，是十几只狼形野兽。它们速度很快，一下子就冲到了庇护所门口。

"打！"老周喊，举起猎枪，对着最前面的一只，开了一枪。

"砰！"

那只野兽被打中了脑袋，倒了下去。

但是，更多的野兽，涌了上来。

你握紧武器，冲了上去。

战斗，开始了。

这是一场惨烈的战斗。

野兽一波接一波地冲上来，你们拼命地抵抗。

老周的猎枪，子弹打完了，他就用枪托砸。

你的武器，砍卷了刃，你就用石头砸。

陈静在后面，给受伤的人包扎。

朵朵躲在最里面，紧紧抱着她的毛绒兔子，不敢出声。

不知道打了多久，野兽的攻势，终于慢了下来。

你靠在墙上，大口喘着气。

你的身上，有好几道伤口，在流血。

老周的肩膀，也被野兽咬了一口，在流血。

但是，你们守住了。

兽潮，退了。

雾里的红色眼睛，渐渐消失了。

你们赢了。

但是，代价是惨重的。`,choices:[{id:`check_casualties`,text:`检查伤亡情况，处理伤口`,hint:`必要的步骤。看看大家的情况。`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`medicine`,amount:-5},{kind:`item`,item:`bandage`,amount:-5}],next:`start`,result:`你看着大家，认真地说："检查伤亡，处理伤口。"

陈静点了点头，开始给大家检查。

你的身上，有三道伤口，都不深，但是流了很多血。

老周的肩膀，被野兽咬了一口，伤口很深，需要缝合。

陈静的手臂，也被划了一道口子。

朵朵没有受伤，但是她吓得浑身发抖。

陈静仔细地给每个人处理伤口，消毒，包扎。

老周的伤口，需要缝合。没有麻药，他就咬着一根木头，让陈静缝。

整个过程中，他没有叫出声，只是额头上全是冷汗。

你看着他，心里涌起了一股敬佩。

这是一个真正的硬汉。

处理完伤口，你们靠在墙上，大口喘着气。

庇护所的门口，堆满了野兽的尸体。至少有三十多只。

你们赢了。

但是，你们也付出了惨重的代价。

【健康-15，理智-8】

【使用药品-5，绷带-5】

【获得战利品：野兽肉+20，野兽皮+10，野兽骨头+5】

【老周好感度+20】

【陈静好感度+10】

【朵朵好感度+10】

【获得称号：兽潮的幸存者。力量+2，耐力+2，意志力+2。】

【获得成就：第一次兽潮的胜利。】

【重要伏笔：兽潮退了，但它们还会再来。下一次，可能会更多，更凶猛。你们需要更强的防御，更多的人，更好的武器。】`}]}},xl=[{id:`phase3_abandoned_armory`,text:`你在探索的时候，发现了一个废弃的军火库。

门是铁门，锁着。但是锁已经生锈了，很容易就能砸开。

你砸开锁，推开门，走了进去。

军火库里很暗，但是你能看到，架子上摆满了武器。

步枪、手枪、子弹、手榴弹……应有尽有。

你的心脏跳得很快。

在这个鬼地方，这些武器，能让你们的战斗力提升十倍。

但是，你也注意到，军火库的角落里，有一些红色的眼睛，在闪烁。

有东西在这里。

你该怎么办？`,minDay:15,maxTriggers:1,weight:5,choices:[{id:`grab_and_run`,text:`快速拿一些武器和子弹，然后赶紧跑`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`energy`,delta:-20}],result:`你没有犹豫。

你快速地冲到架子前面，拿起几把步枪和几箱子弹，塞进背包里。

就在这时，角落里的红色眼睛，动了。

是几只被感染的士兵。他们的眼睛通红，皮肤灰白，嘴里流着涎水。

他们朝你冲了过来。

你转身就跑，一路跌跌撞撞地跑出了军火库。

你靠在墙上，大口喘着气。

你的手臂被门划了一道口子，在流血。但你不在乎。

你看着背包里的武器，笑了。

这一趟，值了。

【健康-10，体力-20】

【获得武器：步枪x3，手枪x2，子弹x100，手榴弹x5】

【获得称号：军火掠夺者。攻击力+30%，武器熟练度+20%。】`,next:`__return__`},{id:`clear_and_loot`,text:`先清理感染者，再慢慢搜刮`,effects:[{kind:`resource`,resource:`health`,delta:-25},{kind:`resource`,resource:`energy`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-10}],result:`你握紧武器，冲了进去。

战斗很惨烈。

那些被感染的士兵，比普通的感染者更强，更快。他们穿着军装，有的还拿着武器。

你拼了命，才把他们全部解决。

你的身上，多了好几道伤口。你的体力，也几乎耗尽了。

但是，你赢了。

你靠在墙上，大口喘了一会儿气，然后开始慢慢搜刮。

步枪、手枪、子弹、手榴弹、防弹衣、头盔……你把能拿的，都拿了。

背包装满了，你就用绳子绑在身上。

当你走出军火库的时候，你整个人，就像一个移动的军火库。

你看着自己，笑了。

有了这些武器，你们再也不用怕那些野兽了。

【健康-25，体力-30，理智-10】

【获得大量武器：步枪x10，手枪x5，子弹x500，手榴弹x20，防弹衣x3，头盔x3，军用匕首x5】

【获得称号：军火库的征服者。力量+3，敏捷+2，攻击力+40%。】

【获得成就：清理废弃军火库。】`,next:`__return__`},{id:`leave_armory`,text:`太危险了，放弃，赶紧离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你看着角落里的红色眼睛，心里做出了决定。

太危险了。

你转身，悄悄地离开了。

走了一段距离，你回头看了一眼。

军火库的门还开着，像是一张巨兽的嘴，在等待着下一个猎物。

你打了个寒颤，加快了脚步。

在这个鬼地方，有些东西，不是你能碰的。

【理智-5】

【伏笔：废弃的军火库。里面有大量武器，但也有被感染的士兵。等你们足够强了，可以再回来。】`,next:`__return__`}]},{id:`phase3_military_remnant`,text:`你在探索的时候，遇到了一群人。

他们穿着军装，拿着步枪，看起来是军方的人。

大约有十几个人，为首的是一个中年男人，肩膀上有上尉的军衔。

他们看到你，举起了枪。

"什么人？"上尉喊，"举起手来！"

你举起手，表示没有恶意。

"我是幸存者。"你说，"我没有恶意。"

上尉看着你，看了很久，然后慢慢放下了枪。

"幸存者？"他说，"你一个人？"

"不是。"你说，"我还有几个同伴。我们有一个庇护所。"

上尉点了点头，然后说："我是李伟，解放军某部上尉。我们是最后一批留守的军人。迷雾来的时候，我们的部队被打散了，只剩下我们这些人。"

他指了指身后的士兵。

"我们在找其他的幸存者。"他说，"也在找一个安全的地方，建立一个据点。"

你看着他们，心里涌起了一股复杂的感觉。

军方的人。有武器，有训练。在这个鬼地方，他们可能是最强大的力量。

但是，他们也可能是最危险的。

你该怎么办？`,minDay:16,maxTriggers:1,weight:5,choices:[{id:`invite_military`,text:`邀请他们加入你们，合并力量`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`invited_military`}],result:`你看着李伟，认真地说："加入我们吧。我们有庇护所，有医生，有物资。你们有武器，有训练。我们合并在一起，活下去的几率更大。"

李伟看着你，沉默了很久。

然后，他摇了摇头。

"不行。"他说，"我们是军人，我们有我们的任务。我们不能加入一个平民的团体。"

"但是，"他又说，"我们可以合作。我们可以共享情报，共享物资，互相支援。"

你看着他，点了点头。

"好。"你说，"我们合作。"

李伟笑了笑，伸出手。

"合作愉快。"他说。

你握住他的手，也笑了。

在这个鬼地方，有军方的人做盟友，是一件很有安全感的事情。

【理智-5】

【建立合作关系：军方残余部队。首领李伟上尉，十几名士兵，有重武器。】

【获得支援：军方会定期提供武器和子弹。你们需要提供食物和药品。】

【获得重要情报：军方知道一些关于迷雾的秘密。他们说，迷雾不是自然灾害，是人为的。】`,next:`__return__`},{id:`trade_with_military`,text:`跟他们交易，用物资换武器`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你看着李伟，说："我们做笔交易吧。我们有食物和药品，你们有武器和子弹。我们交换，各取所需。"

李伟看着你，想了想，然后点了点头。

"可以。"他说，"怎么换？"

你们讨价还价了一会儿，最终达成了协议。

你用十份食物和五份药品，换了两把步枪和五十发子弹。

李伟看着你，笑了笑。

"你很会做生意。"他说，"以后有需要，随时来找我们。我们一般在城东的军营附近活动。"

你点了点头，拿着武器，离开了。

走了一段距离，你回头看了一眼。

那些军人还站在那里，像是一座移动的堡垒。

你心里涌起了一股安全感。

在这个鬼地方，有武器，就有安全感。

【理智-3】

【获得武器：步枪x2，子弹x50】

【失去物资：食物-10，药品-5】

【建立贸易关系：军方残余部队。可以用食物和药品交换武器和子弹。】`,next:`__return__`},{id:`be_cautious_military`,text:`保持警惕，不跟他们深交，赶紧离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你看着那些军人，心里涌起了一股警惕。

在这个鬼地方，有武器的人，不一定是朋友。

"我还有事，先走了。"你说，"以后有机会，再聊。"

李伟看着你，点了点头。

"行。"他说，"小心点。"

你转身，快步离开了。

走了一段距离，你回头看了一眼。

那些军人还站在那里，但是他们的目光，一直跟着你。

你打了个寒颤，加快了脚步。

在这个鬼地方，小心驶得万年船。

【理智-5】

【伏笔：军方残余部队。他们是谁？他们的任务是什么？他们说的"关于迷雾的秘密"，又是什么？】`,next:`__return__`}]},{id:`phase3_infected_neighbor`,text:`你在庇护所附近，遇到了一个人。

是一个中年男人，穿着睡衣，光着脚，看起来很虚弱。

他看到你，朝你走了过来。

"救救我……"他说，声音很虚弱，"我被那些东西抓伤了……我不想变成那样……"

你看着他，心里涌起了一股寒意。

他的手臂上，有一道很深的伤口，已经开始发黑了。

他的眼睛，也开始变红了。

他被感染了。

而且，已经开始变异了。

你该怎么办？`,minDay:17,maxTriggers:1,weight:7,choices:[{id:`mercy_kill`,text:`给他一个痛快，结束他的痛苦`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`mercy_killed_infected`}],result:`你看着他，心里做出了决定。

他已经被感染了，而且已经开始变异了。

没有救了。

你握紧武器，走到他面前。

"对不起。"你说。

然后，你用力，把武器刺进了他的心脏。

他的身体抖了一下，然后倒了下去，不动了。

你站在那里，看着他的尸体，手在发抖。

这是你第一次杀人。

虽然他已经不是人了。

但是，你还是觉得，你的手上，沾满了血。

你靠在墙上，大口喘着气。

在这个鬼地方，有些事情，你必须做。

哪怕你不愿意。

【理智-10】

【获得称号：仁慈的杀手。意志力+3，理智上限+5。】

【伏笔：被感染的邻居。他说"我不想变成那样"。那些被感染的人，还有意识吗？他们还能感受到痛苦吗？】`,next:`__return__`},{id:`give_medicine_hope`,text:`给他一些药品，也许还有救`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`item`,item:`medicine`,amount:-5}],result:`你看着他，心里涌起了一丝希望。

也许，还有救。

你从背包里拿出药品，递给他。

"这些给你。"你说，"也许能治好你。"

他看着你，眼睛里闪过了一丝希望。

"真的吗？"他说，"真的能治好吗？"

"我不知道。"你说，"但是，试试吧。"

他接过药品，快速地吃了下去。

然后，他坐在地上，等待着。

你站在旁边，也在等待着。

过了一会儿，他的身体，开始发抖。

然后，他的眼睛，变得更红了。

他的皮肤，开始变灰。

他的嘴里，开始流涎水。

"不……"他说，声音在发抖，"不……我不想……"

他的身体，开始扭曲。

然后，他猛地抬起头，看着你。

他的眼睛，已经完全变红了。

他朝你扑了过来。

你吓得转身就跑。

你跑得很快，很用力，不敢回头。

不知道跑了多久，你终于停下来，靠在墙上，大口喘着气。

你的手在发抖。

你知道，你刚才差点死了。

而且，你也知道，那个男人，已经不在了。

剩下的，只是一个被感染的怪物。

【理智-15】

【使用药品-5】

【获得重要情报：迷雾感染无法用普通药品治愈。一旦感染，就会变异。】

【伏笔：那个被感染的邻居，现在在哪里？他还会再遇到你吗？】`,next:`__return__`},{id:`run_away_infected`,text:`他已经被感染了，赶紧跑，不要管他`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],result:`你看着他，心里做出了决定。

他已经被感染了，而且已经开始变异了。

没有救了。

你转身，快步离开了。

"别走……"他在后面喊，声音越来越虚弱，"求求你……别走……"

你没有回头。

你不敢回头。

因为你知道，如果你回头看了，你可能会忍不住帮他。

而帮他，你可能会死。

你跑回庇护所，关上门，靠在墙上，大口喘着气。

你的手在发抖。

你知道，那个男人，可能活不过今天。

但是，你也知道，在这个鬼地方，你救不了所有人。

【理智-8】

【伏笔：被遗弃的感染者。他会变成什么？他还会再遇到你吗？】`,next:`__return__`}]},{id:`phase3_mysterious_broadcast`,text:`你在修理无线电的时候，突然收到了一个信号。

是一个广播。

很清晰，很稳定。

"这里是希望号广播站。"一个女人的声音说，"如果你能听到这个广播，说明你还活着。恭喜你。"

"我们在城北的山顶上，建立了一个安全区。那里有食物，有水，有药品，有武器。我们欢迎所有的幸存者。"

"但是，我们有一个条件。"

"你必须证明，你没有被感染。"

"如果你愿意来，请在每天中午12点，用这个频率回复我们。我们会告诉你具体的路线。"

广播重复了三遍，然后消失了。

你看着无线电，心里涌起了一股复杂的感觉。

城北的山顶。安全区。

这可能是你们的希望。

但是，也可能是一个陷阱。

你该怎么办？`,minDay:18,maxTriggers:1,weight:5,choices:[{id:`reply_broadcast`,text:`中午12点回复他们，询问详细情况`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`replied_broadcast`}],result:`你决定，中午12点，回复他们。

时间到了，你打开无线电，按下了通话键。

"我听到了你们的广播。"你说，"我是幸存者，我没有被感染。我想知道更多关于你们安全区的情况。"

过了一会儿，无线电里传来了那个女人的声音。

"你好，幸存者。"她说，"我是希望号广播站的站长，我叫林小雨。"

"我们的安全区，在城北的山顶上。那里有五百多个幸存者，有军队保护，有充足的物资。"

"但是，我们的安全区，不是什么人都收。"她说，"你必须通过我们的检测，证明你没有被感染。而且，你必须遵守我们的规则。"

"什么规则？"你问。

"第一，服从管理。"她说，"第二，贡献你的技能和劳动力。第三，不能私藏物资。"

你看着无线电，心里涌起了一股复杂的感觉。

五百多个幸存者。军队保护。充足的物资。

这听起来，像是一个天堂。

但是，那些规则，又让你觉得，像是一个监狱。

【理智-5】

【建立联系：希望号广播站。站长林小雨，城北山顶安全区，五百多个幸存者。】

【获得任务：前往城北山顶安全区。需要通过感染检测，遵守三条规则。】

【重要伏笔：希望号安全区。它真的是天堂吗？还是一个陷阱？那些规则背后，隐藏着什么？】`,next:`__return__`},{id:`ignore_broadcast`,text:`可能是陷阱，不要相信，继续自己活下去`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你看着无线电，心里做出了决定。

在这个鬼地方，天上不会掉馅饼。

一个有五百多个幸存者，有军队保护，有充足物资的安全区？

听起来太美好了，美好得不像是真的。

你关掉无线电，把它收了起来。

你决定，不相信这个广播。

你要靠自己，活下去。

【理智-3】

【伏笔：希望号广播站。它真的存在吗？如果是真的，你会后悔吗？】`,next:`__return__`},{id:`investigate_broadcast`,text:`先去城北附近看看，确认一下是不是真的`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`energy`,delta:-25}],result:`你决定，先去城北附近看看，确认一下是不是真的。

你收拾了一些物资，然后出发了。

城北很远，你走了整整一天，才到达城北的山脚下。

你抬头看了看山顶。

山顶上，有一些建筑。你能看到，有一些人在活动。

而且，你能听到，山顶上传来了广播的声音。

是真的。

那个安全区，是真的。

你心里涌起了一股喜悦。

但是，你也注意到，山脚下，有一些帐篷。

帐篷里，住着一些人。

他们看起来，像是被拒绝进入安全区的幸存者。

你走过去，问其中一个人。

"这里是怎么回事？"你问，"你们为什么不上去？"

那个人看了你一眼，苦笑了一下。

"上去？"他说，"他们不让我们上去。他们说，我们的检测不合格，可能被感染了。"

"但是，"他又说，"我们根本没有被感染。我们只是……没有技能，没有劳动力。他们只收有用的人。"

你看着他，心里涌起了一股寒意。

只收有用的人。

那个安全区，不是天堂。

是一个优胜劣汰的丛林。

【理智-8，体力-25】

【获得重要情报：希望号安全区确实存在，但只收"有用的人"。没有技能和劳动力的人，会被拒绝。】

【伏笔：希望号安全区。它的真相是什么？那些被拒绝的人，最后怎么样了？】`,next:`__return__`}]},{id:`phase3_childrens_toys`,text:`你在探索一栋废弃的幼儿园时，发现了一些东西。

是一些玩具。

布娃娃、积木、小汽车、图画书……散落在地上，覆盖着一层厚厚的灰尘。

你看着这些玩具，心里涌起了一股酸涩。

迷雾来的时候，这些孩子，应该正在幼儿园里玩耍吧。

然后，雾就来了。

他们，怎么样了？

你蹲下来，捡起一个布娃娃。

布娃娃很旧了，一只眼睛已经掉了，用线缝着。

你看着它，想起了朵朵。

她也有一个这样的毛绒玩具。

你该怎么办？`,minDay:15,maxTriggers:1,weight:6,choices:[{id:`take_toys_for_duoduo`,text:`把这些玩具带回去，给朵朵`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`took_toys_for_duoduo`}],result:`你把这些玩具，一个一个地捡起来，放进背包里。

布娃娃、积木、小汽车、图画书……你把能拿的，都拿了。

然后，你回到了庇护所。

朵朵看到你背包里的玩具，眼睛一下子就亮了。

"这是……给我的吗？"她问，声音在发抖。

"对。"你说，"给你的。"

朵朵扑过来，抱住那些玩具，眼泪一下子就掉了下来。

"谢谢……"她说，"谢谢哥哥/姐姐……"

她拿起那个布娃娃，紧紧抱在怀里。

"这是我最喜欢的那种。"她说，"以前，我也有一个一模一样的。但是，迷雾来的时候，我弄丢了。"

你看着她，心里涌起了一股温暖。

在这个鬼地方，能让一个孩子开心，是一件很不容易的事情。

【理智+5】

【朵朵好感度+30】

【获得称号：温柔的守护者。魅力+3，NPC好感度获取+20%，儿童NPC好感度获取+50%。】

【朵朵获得新玩具：布娃娃、积木、小汽车、图画书。每日理智恢复+2。】`,next:`__return__`},{id:`leave_toys_there`,text:`不拿，这些是属于那些孩子的`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你看着这些玩具，摇了摇头。

这些是属于那些孩子的。

你不应该拿。

你站起来，转身离开了。

走了一段距离，你回头看了一眼。

幼儿园的门还开着，那些玩具，还散落在地上。

你不知道，那些孩子，还会不会回来。

但是，你知道，你应该尊重他们。

【理智-3】

【伏笔：废弃的幼儿园。那些孩子，怎么样了？他们还活着吗？】`,next:`__return__`},{id:`search_for_children`,text:`在幼儿园里搜索，看看有没有孩子还活着`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`resource`,resource:`energy`,delta:-15}],result:`你决定，在幼儿园里搜索一下，看看有没有孩子还活着。

你一间教室一间教室地搜过去。

教室里很安静，只有你的脚步声在回荡。

桌子和椅子，倒了一地。黑板上，还写着今天的课程。

但是，没有孩子。

你搜遍了整个幼儿园，都没有找到一个活着的孩子。

但是，在最后一间教室里，你找到了一些东西。

是一些涂鸦。

用蜡笔画的，画在墙上。

画的是，一群孩子，手牵着手，站在阳光下。

画的旁边，写着一行字：

"我们要永远在一起。"

你看着那行字，眼泪一下子就掉了下来。

你知道，那些孩子，已经不在了。

但是，他们的画，还在这里。

他们的希望，还在这里。

【理智-10，体力-15】

【获得物品：孩子们的涂鸦。（可以挂在庇护所里，每日理智恢复+1）】

【获得称号：记忆的守护者。理智上限+10，每日理智恢复+1。】

【伏笔：废弃的幼儿园。那些孩子，是怎么死的？他们的画，为什么还在这里？】`,next:`__return__`}]},{id:`phase3_trader_returns`,text:`你在探索的时候，又遇到了老张。

他还是那身打扮，中山装，旧毡帽，背着一个大背包。

他看到你，笑了笑。

"又见面了。"他说，"最近怎么样？"

"还活着。"你说。

老张笑了笑，然后把背包放下来，打开。

"这次，我有一些好东西。"他说，"你看看，有没有需要的。"

你看了看他的背包。

食物、水、药品、武器……应有尽有。

而且，你注意到，他的背包角落里，有一个东西，在发光。

是一块石头。

发着微弱的蓝光。

你看着那块石头，心里涌起了一股奇怪的感觉。

那块石头，不简单。

你该怎么办？`,minDay:17,maxTriggers:1,weight:5,requires:{flags:[`met_trader_zhang`]},choices:[{id:`ask_about_glowing_stone`,text:`问他那块发光的石头是什么`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`asked_about_glowing_stone`}],result:`你指着那块发光的石头，问："那是什么？"

老张的手顿了一下。

他看了看那块石头，又看了看你，然后笑了笑。

"你眼力不错。"他说，"这是好东西。"

"从迷雾深处来的？"你问。

老张点了点头。

"对。"他说，"这叫雾晶石。是迷雾凝结而成的结晶。"

"它有什么用？"你问。

老张看着你，认真地说："它能让人变强。"

"但是，"他又说，"它也有副作用。用多了，人会变。变得……不像人。"

你看着那块发光的石头，心里涌起了一股强烈的好奇。

能让人变强。

但是，会变得不像人。

这是一个诱惑，也是一个陷阱。

"怎么卖？"你问。

老张看了你一眼，然后说："现在还不能卖给你。"

"为什么？"你问。

"因为你还太弱了。"老张说，"雾晶石的力量，不是现在的你能承受的。等你足够强了，我再卖给你。"

他把背包拉上，站了起来。

"好了，今天就到这里吧。"他说，"以后有需要，随时来找我。"

他转身走进了雾里，很快就消失了。

你站在原地，心里涌起了一股复杂的感觉。

雾晶石。

能让人变强，但会变得不像人。

这到底是什么东西？

【理智-8】

【获得重要情报：雾晶石。迷雾凝结而成的结晶，能让人变强，但有副作用，用多了会变得不像人。】

【重要伏笔：老张的雾晶石。等你足够强了，他会卖给你。你会买吗？】`,next:`__return__`},{id:`buy_normal_goods`,text:`不问那个，买一些正常的物资`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],result:`你没有问那块发光的石头。

在这个鬼地方，有些东西，不知道比知道好。

你跟老张买了一些食物和药品，然后离开了。

走了一段距离，你回头看了一眼。

老张还站在那里，像是在等下一个顾客。

你打了个寒颤，加快了脚步。

在这个鬼地方，什么奇怪的东西都有。

【理智-2】

【获得物资：食物+10，药品+5】

【失去物资：金属-10】`,next:`__return__`},{id:`ask_about_mist_truth`,text:`问他关于迷雾的真相，他知道多少`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`asked_mist_truth`}],result:`你看着老张，认真地问："你到底是谁？你知道多少关于迷雾的事情？"

老张看着你，沉默了很久。

然后，他笑了笑。

"你这小子，很聪明。"他说，"你猜得没错，我确实知道一些事情。"

他蹲下来，在地上画了一个圈。

"迷雾，不是自然灾害。"他说，"是人为的。"

"是谁？"你问。

老张摇了摇头。

"我不能告诉你。"他说，"我只能告诉你，迷雾，是一个实验。一个很大的实验。"

"实验？什么实验？"你问。

"进化。"老张说，"他们想通过迷雾，让人类进化。变得更强，更快，更聪明。"

"但是，"他又说，"进化的方向，不可控。大部分人，变成了怪物。只有少数人，能真正进化。"

你看着他，心里涌起了一股强烈的不安。

进化。

实验。

人为的迷雾。

这一切，都太可怕了。

"那你呢？"你问，"你是谁？你也是实验的一部分吗？"

老张看着你，笑了笑。

"我？"他说，"我只是一个做买卖的。"

他站起来，背起背包。

"好了，今天就到这里吧。"他说，"以后有机会，再聊。"

他转身走进了雾里，很快就消失了。

你站在原地，心里涌起了一股寒意。

迷雾是人为的。

是一个进化实验。

那你呢？

你也是实验的一部分吗？

【理智-10】

【获得重要情报：迷雾是人为的，是一个进化实验。目的是让人类进化，但大部分人变成了怪物，只有少数人能真正进化。】

【重要伏笔：老张的真实身份。他说他"只是一个做买卖的"，但他知道这么多秘密。他到底是谁？】`,next:`__return__`}]},{id:`phase3_abandoned_school`,text:`你在探索的时候，发现了一所废弃的学校。

学校的大门开着，里面一片狼藉。

你走进去，开始搜索。

教室里，桌子和椅子倒了一地。黑板上，还写着今天的课程。

但是，没有人。

你搜了一间又一间教室，都没有找到任何有用的东西。

直到，你来到了学校的图书馆。

图书馆里，书架倒了，书散了一地。

但是，在图书馆的角落里，你发现了一个人。

是一个老人，穿着一件破旧的西装，戴着一副眼镜。他坐在地上，手里拿着一本书，正在认真地读。

他听到了脚步声，抬起头，看到了你。

"你好。"他说，声音很平静，"你也是来借书的吗？"

你看着他，心里涌起了一股奇怪的感觉。

在这个鬼地方，一个老人，在废弃的图书馆里，认真地读书。

这太不正常了。

你该怎么办？`,minDay:16,maxTriggers:1,weight:5,choices:[{id:`talk_to_librarian`,text:`跟他聊聊，看看他是什么人`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`talked_to_librarian`}],result:`你走过去，在他对面坐了下来。

"你好。"你说，"你是谁？为什么在这里？"

老人看了你一眼，然后笑了笑。

"我是这里的图书管理员。"他说，"我叫王建国。大家都叫我王老师。"

"迷雾来的时候，我正在图书馆里整理书籍。"他说，"然后，雾就来了。学生们都跑了，老师们也跑了。只有我，留了下来。"

"为什么留下来？"你问。

王老师看了看手里的书，然后说："因为这些书，需要有人照顾。"

你看着他，心里涌起了一股复杂的感觉。

在这个鬼地方，一个老人，为了照顾一些书，留了下来。

这太疯狂了。

但是，也很伟大。

"你不害怕吗？"你问，"那些怪物，那些感染者？"

王老师笑了笑。

"害怕。"他说，"但是，比起害怕，我更害怕这些书被毁掉。这些书，是人类文明的结晶。只要这些书还在，人类就还有希望。"

你看着他，心里涌起了一股敬佩。

在这个鬼地方，还有这样的人。

为了守护人类文明的结晶，宁愿留在最危险的地方。

【理智-5】

【获得重要NPC：图书管理员王老师。守护着学校图书馆里的书籍。】

【获得能力：知识的力量。你可以在王老师那里学习各种知识，提升属性。】

【王老师好感度+20】

【重要伏笔：王老师的图书馆。那里有多少书？那些书里，有没有关于迷雾真相的记载？】`,next:`__return__`},{id:`take_books_leave`,text:`拿一些有用的书，然后离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你没有跟他多聊。

你快速地在图书馆里搜索，找了一些有用的书。

医学百科、野外生存指南、植物图鉴、机械维修……你把能拿的，都拿了。

然后，你转身离开了。

走了一段距离，你回头看了一眼。

王老师还坐在那里，认真地读着书。

你打了个寒颤，加快了脚步。

在这个鬼地方，什么奇怪的人都有。

【理智-3】

【获得书籍：医学百科、野外生存指南、植物图鉴、机械维修。（可以阅读，提升对应技能）】`,next:`__return__`},{id:`invite_librarian`,text:`邀请他跟你一起走，去你的庇护所`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`invited_librarian`}],result:`你看着王老师，认真地说："跟我一起走吧。去我的庇护所，那里安全。"

王老师看着你，摇了摇头。

"不行。"他说，"我不能离开这些书。"

"但是，"你说，"在这里，你会死的。"

王老师笑了笑。

"死？"他说，"人总有一死。但是，这些书，如果没有人照顾，就会毁掉。这些书，比我的命，更重要。"

你看着他，心里涌起了一股敬佩。

在这个鬼地方，还有这样的人。

为了守护人类文明的结晶，宁愿牺牲自己的生命。

"那，"你说，"我以后经常来看你。给你带食物和水。"

王老师看着你，笑了笑。

"谢谢你。"他说，"你是一个好人。"

你站起来，跟他告别，然后离开了。

走了一段距离，你回头看了一眼。

王老师还坐在那里，认真地读着书。

你心里涌起了一股温暖。

在这个鬼地方，还有希望。

【理智+3】

【建立联系：图书管理员王老师。他守护着学校图书馆。你可以定期给他送食物和水，他会教你知识。】

【王老师好感度+15】

【获得称号：文明的守护者。智力+3，智慧+3，学习速度+30%。】`,next:`__return__`}]},{id:`phase3_mist_lighthouse`,text:`你在探索的时候，远远地看到了一个东西。

是一座灯塔。

在城北的海边，一座古老的灯塔，矗立在雾里。

而且，灯塔的顶端，有光。

很微弱，但是很稳定的光。

在这个鬼地方，一座有光的灯塔，意味着什么？

意味着，那里有人。

或者，那里有什么东西，在吸引着什么。

你该怎么办？`,minDay:19,maxTriggers:1,weight:4,choices:[{id:`go_to_lighthouse`,text:`去灯塔看看，那里可能有幸存者`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`resource`,resource:`energy`,delta:-25},{kind:`flag`,flag:`went_to_lighthouse`}],result:`你决定，去灯塔看看。

你走了整整一天，才到达灯塔。

灯塔很古老，墙壁上长满了青苔。门是铁门，虚掩着。

你推开门，走了进去。

灯塔里很暗，但是你能看到，有一道楼梯，盘旋着向上。

你沿着楼梯，一步一步地往上走。

不知道走了多久，你终于到达了灯塔的顶端。

顶端，有一个房间。

房间里，有一个人。

是一个老人，穿着一件破旧的水手服，正在维护着灯塔的灯。

他听到了脚步声，转过身，看到了你。

"你好。"他说，声音很洪亮，"你是第一个到达这里的幸存者。"

"你是谁？"你问，"为什么在这里？"

老人笑了笑。

"我是这里的守塔人。"他说，"我叫张海。大家都叫我老张。"

"迷雾来的时候，我正在灯塔里值班。"他说，"然后，雾就来了。我下不去，也没有人上来。我就一直在这里，守着这盏灯。"

"为什么守着这盏灯？"你问。

老张看了看那盏灯，然后说："因为，这盏灯，是希望。"

"在这个鬼地方，只要这盏灯还亮着，就说明，还有人在坚持。还有人，没有放弃。"

你看着他，心里涌起了一股敬佩。

在这个鬼地方，一个老人，在一座孤岛上的灯塔里，守着一盏灯，守着希望。

这太伟大了。

【理智-10，体力-25】

【获得重要NPC：守塔人张海。守护着城北海边灯塔的灯。】

【获得能力：灯塔的指引。灯塔的光，可以在雾里指引方向。你可以在雾里看到灯塔的光，不会迷路。】

【张海好感度+20】

【重要伏笔：灯塔的秘密。这盏灯，为什么能在雾里发光？它除了指引方向，还有什么作用？】`,next:`__return__`},{id:`observe_lighthouse`,text:`远远地观察一下，不靠近`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你没有靠近灯塔。

在这个鬼地方，一座有光的灯塔，太可疑了。

你远远地观察了一会儿。

灯塔的光，很稳定，一直在亮着。

而且，你注意到，有一些鸟，在灯塔周围盘旋。

这说明，灯塔周围，可能没有危险。

但是，你还是不敢靠近。

你观察了一会儿，然后转身离开了。

【理智-5】

【获得情报：城北海边有一座灯塔，灯塔的光一直在亮着。可能有幸存者在那里。】

【伏笔：迷雾中的灯塔。那里有人吗？那盏灯，为什么能在雾里发光？】`,next:`__return__`},{id:`ignore_lighthouse`,text:`太可疑了，不要管它，继续探索`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你看着那座灯塔，摇了摇头。

太可疑了。

在这个鬼地方，一座有光的灯塔，怎么看都像是一个陷阱。

你转身，继续探索。

走了一段距离，你回头看了一眼。

灯塔的光，还在亮着。

在浓雾里，那一点光，显得格外刺眼。

你打了个寒颤，加快了脚步。

在这个鬼地方，好奇心是会害死猫的。

【理智-3】

【伏笔：迷雾中的灯塔。你没有去看它。它还会在那里吗？那盏灯，会一直亮着吗？】`,next:`__return__`}]},{id:`phase3_food_shortage`,text:`第18天的晚上，你们发现，食物不够了。

只剩下三天的口粮。

老周今天打猎，什么都没打到。林子里的动物，好像都跑光了。

陈静检查了一下物资，脸色很凝重。

"食物最多还能撑三天。"她说，"如果再找不到食物，我们就要饿肚子了。"

朵朵看着你们，紧紧抱着她的毛绒兔子，不敢说话。

你看着大家，心里涌起了一股不安。

食物短缺，是团体最大的危机。

如果处理不好，团体可能会崩溃。

你该怎么办？`,minDay:18,maxTriggers:1,weight:7,choices:[{id:`organize_hunting_party`,text:`组织狩猎队，去更远的地方打猎`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`energy`,delta:-25},{kind:`flag`,flag:`organized_hunting_party`}],result:`你看着大家，认真地说："明天，我跟老周一起，去更远的地方打猎。陈静，你带着朵朵，留守庇护所。"

老周点了点头。

"好。"他说，"我知道一个地方，在东边的河边，那里应该还有猎物。"

第二天一早，你跟老周就出发了。

你们走了很远，才到达东边的河边。

果然，那里还有猎物。

老周很厉害，他用猎枪，打到了两只兔子和一只野鸡。

你们正准备回去，突然，从雾里冲出来了几只狼形野兽。

战斗很惨烈。

你们拼了命，才把那些野兽解决。

你的手臂被野兽的爪子划了一道口子，在流血。

但是，你们赢了。

你们带着猎物，回到了庇护所。

朵朵看到你们回来，高兴地跳了起来。

陈静帮你处理了伤口。

那天晚上，你们吃了一顿丰盛的晚餐。

食物危机，暂时解决了。

【健康-10，体力-25】

【获得食物：兔子肉+10，野鸡肉+5】

【老周好感度+15】

【获得称号：狩猎队的一员。力量+2，敏捷+2，狩猎成功率+20%。】`,next:`__return__`},{id:`ration_food`,text:`实行配给制，减少每人的食物分量，撑过这段时间`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`health`,delta:-5}],result:`你看着大家，认真地说："从今天开始，实行配给制。每人每天的食物分量，减少三分之一。我们要撑过这段时间。"

老周看着你，皱起了眉头。

"减少三分之一？"他说，"我每天打猎，消耗那么大，吃这么点，怎么行？"

"大家都一样。"你说，"在这个鬼地方，没有人能搞特殊。"

老周看着你，看了很久，然后叹了口气。

"行。"他说，"你是头儿，你说了算。"

接下来的几天，你们都在饥饿中度过。

每个人都很饿，但是没有人抱怨。

因为，你们知道，这是为了活下去。

第五天，老周终于打到了猎物。

食物危机，过去了。

但是，你们每个人，都瘦了一圈。

【理智-8，健康-5】

【获得规则：紧急配给制。食物短缺时，每人减少三分之一食物分量。】

【老周好感度-5】

【陈静好感度+5】

【朵朵好感度+5】`,next:`__return__`},{id:`trade_for_food`,text:`用其他物资，跟商人或其他幸存者交换食物`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你看着大家，认真地说："我们用其他物资，去换食物。"

第二天，你带着一些金属和药品，去找老张。

老张看着你带来的物资，想了想，然后说："行，我跟你换。"

你用十块金属和五份药品，换了二十份食物。

虽然亏了，但是，至少解决了燃眉之急。

你带着食物，回到了庇护所。

大家看到食物，都松了一口气。

那天晚上，你们吃了一顿饱饭。

食物危机，暂时解决了。

但是，你知道，这不是长久之计。

你们必须找到稳定的食物来源。

【理智-5】

【获得食物：+20】

【失去物资：金属-10，药品-5】

【建立贸易关系：可以用金属和药品跟老张交换食物。】`,next:`__return__`}]},{id:`phase3_mist_whispers_upgraded`,text:`晚上，你又听到了那个声音。

是迷雾中的低语。

比以前更清晰，更响亮。

"来……来我这里……"

"你想知道真相吗？"

"你想变强吗？"

"来……来迷雾的深处……"

你捂住耳朵，但是那个声音，还是能听到。

它像是直接在你的脑海里说话。

你该怎么办？`,minDay:19,maxTriggers:1,weight:5,choices:[{id:`resist_whispers`,text:`抵抗诱惑，不去管它`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`resisted_whispers_upgraded`}],result:`你紧紧捂住耳朵，闭上眼睛，拼命地抵抗着那个声音。

"滚……"你喃喃地说，"滚出我的脑袋……"

那个声音，越来越响，越来越清晰。

"来……来我这里……"

"你想知道真相吗？"

"你想变强吗？"

你咬着牙，拼命地抵抗着。

不知道过了多久，那个声音，终于慢慢消失了。

你松开手，大口喘着气。

你的衣服，已经被冷汗湿透了。

你赢了。

但是，你知道，那个声音，还会再来。

而且，下一次，可能会更强烈。

【理智-8】

【获得称号：意志坚定者。意志力+5，理智上限+10，迷雾低语影响-50%。】

【伏笔：迷雾中的低语。它是谁？它为什么要引诱你？迷雾的深处，有什么？】`,next:`__return__`},{id:`listen_to_whispers`,text:`听听它说什么，也许能获得一些情报`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`listened_to_whispers_upgraded`}],result:`你松开手，决定，听听它说什么。

那个声音，立刻变得更清晰了。

"你想知道真相吗？"它说，"迷雾的真相。"

"想。"你说。

"那你就来迷雾的深处。"它说，"在那里，你会知道一切。"

"迷雾的深处，在哪里？"你问。

"在城北。"它说，"在那座灯塔的下面。"

灯塔？

你心里涌起了一股惊讶。

那座有光的灯塔，下面，有什么？

"灯塔下面，有什么？"你问。

"有真相。"那个声音说，"有你想要的一切。"

"但是，"它又说，"你要小心。那里，也有危险。"

"什么危险？"你问。

但是，那个声音，没有回答。

它慢慢消失了。

你站在原地，大口喘着气。

你的头很痛，像是要裂开一样。

但是，你获得了重要的情报。

迷雾的真相，在城北灯塔的下面。

【理智-15】

【获得重要情报：迷雾的真相，在城北灯塔的下面。】

【获得状态：迷雾的呼唤。你被迷雾深处的存在注意到了。它会不断地引诱你。】

【重要伏笔：城北灯塔的秘密。灯塔下面，有什么？迷雾的真相，又是什么？】`,next:`__return__`},{id:`ask_companions`,text:`问问其他同伴，他们有没有听到这个声音`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你走到老周和陈静面前，问："你们有没有听到一个声音？在迷雾里，在你们的脑海里？"

老周和陈静对视了一眼，然后都点了点头。

"听到了。"老周说，"每天晚上都能听到。它让我去迷雾的深处。"

"我也听到了。"陈静说，"它说，它能治好我的病。"

你看着他们，心里涌起了一股不安。

原来，不是只有你一个人听到了这个声音。

所有人，都听到了。

"你们有没有想过，去看看？"你问。

老周摇了摇头。

"没有。"他说，"在山里，我见过很多这样的事情。那些声音，都是诱惑。跟着它们走，只会死。"

陈静也摇了摇头。

"我也没有。"她说，"我是医生，我知道，那些声音，可能是我们的幻觉。在极度压力下，人会产生幻觉。"

你看着他们，点了点头。

还好，他们都很清醒。

没有被那个声音，引诱走。

【理智-5】

【获得重要情报：所有人都能听到迷雾中的低语。它会根据每个人的欲望，说不同的话。】

【老周好感度+5】

【陈静好感度+5】

【朵朵好感度+5】（朵朵也听到了，但是她害怕，没有说）`,next:`__return__`}]},{id:`phase3_abandoned_supermarket`,text:`你在探索的时候，发现了一家废弃的超市。

是城东的大润发超市。

朵朵说，她就是在这里，跟她的父母失散的。

超市的门开着，里面一片狼藉。

货架倒了，商品散了一地。

但是，你能看到，还有一些食物，散落在地上。

你走进去，开始搜索。

超市里很安静，只有你的脚步声在回荡。

你搜了一间又一间，都没有找到什么有用的东西。

直到，你来到了超市的仓库。

仓库里，有很多箱子。

你打开一个箱子，里面是罐头。

你又打开一个箱子，里面是饼干。

你的心脏跳得很快。

这里，有大量的食物。

但是，你也注意到，仓库的角落里，有一些红色的眼睛，在闪烁。

有东西在这里。

你该怎么办？`,minDay:17,maxTriggers:1,weight:6,choices:[{id:`grab_food_run`,text:`快速拿一些食物，然后赶紧跑`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`energy`,delta:-20}],result:`你没有犹豫。

你快速地打开几个箱子，把食物塞进背包里。

就在这时，角落里的红色眼睛，动了。

是几只被感染的人。他们的眼睛通红，皮肤灰白，嘴里流着涎水。

他们朝你冲了过来。

你转身就跑，一路跌跌撞撞地跑出了超市。

你靠在墙上，大口喘着气。

你的手臂被门划了一道口子，在流血。但你不在乎。

你看着背包里的食物，笑了。

这一趟，值了。

【健康-10，体力-20】

【获得大量食物：罐头+20，饼干+15，方便面+10】

【朵朵好感度+10】（这是她跟父母失散的地方，你帮她找到了食物）

【伏笔：城东大润发超市的仓库。里面有大量食物，但也有被感染的人。等你们足够强了，可以再回来。】`,next:`__return__`},{id:`search_for_duoduos_parents`,text:`在超市里搜索，看看有没有朵朵父母的线索`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`resource`,resource:`energy`,delta:-15},{kind:`flag`,flag:`searched_duoduos_parents`}],result:`你决定，在超市里搜索一下，看看有没有朵朵父母的线索。

你一间一间地搜过去。

在超市的办公室里，你找到了一些东西。

是一些员工的名牌。

你翻了翻，没有找到杜建国或者李梅的名字。

但是，在办公室的抽屉里，你找到了一本日记。

是超市经理的日记。

你翻开日记，开始读。

"第1天：雾来了。超市里挤满了人。大家都在抢食物。我让员工维持秩序，但是根本没用。"

"第3天：食物快被抢光了。有人开始打架。我看到，有一个穿蓝色夹克的男人，在找他的女儿。他说，他的女儿叫朵朵，九岁。"

"第5天：超市里的人，开始变了。眼睛变红，变得暴躁。那个穿蓝色夹克的男人，也被感染了。他……他咬死了三个人。"

"第7天：我撑不住了。我要走了。如果有人看到这本日记，记住——不要相信任何被感染的人。他们已经不是人了。"

日记到这里就断了。

你合上日记，手在发抖。

穿蓝色夹克的男人。

找他的女儿，叫朵朵。

那是朵朵的爸爸，杜建国。

他被感染了。

他咬死了三个人。

你不知道，该怎么告诉朵朵。

【理智-10，体力-15】

【获得重要情报：朵朵的父亲杜建国，在城东大润发超市被感染了。他咬死了三个人。他的母亲李梅，下落不明。】

【获得物品：超市经理的日记。】

【重要伏笔：朵朵的父亲。他被感染了，变成了怪物。如果朵朵知道了，她会怎么样？你们还会再遇到他吗？】`,next:`__return__`},{id:`leave_supermarket`,text:`太危险了，赶紧离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`你看着角落里的红色眼睛，心里做出了决定。

太危险了。

你转身，快步离开了。

走了一段距离，你回头看了一眼。

超市的门还开着，像是一张巨兽的嘴，在等待着下一个猎物。

你打了个寒颤，加快了脚步。

在这个鬼地方，有些东西，不是你能碰的。

【理智-5】

【伏笔：城东大润发超市。里面有大量食物，但也有被感染的人。朵朵的父母，就是在这里失散的。】`,next:`__return__`}]},{id:`phase3_leadership_challenge`,text:`第19天的晚上，老周突然提出了一个问题。

"我们这个团体，谁是头儿？"他问。

你看着他，心里涌起了一股不安。

"我是。"你说。

老周看着你，摇了摇头。

"你？"他说，"你太年轻了。在这个鬼地方，年轻，就是经验不足。"

"我打猎打了三十年。"他说，"我知道什么地方危险，什么地方安全。我知道怎么找食物，怎么对付野兽。你呢？你会什么？"

你看着他，心里涌起了一股愤怒。

但是，你也知道，他说的有道理。

在这个鬼地方，经验，确实很重要。

陈静看着你们，没有说话。

朵朵吓得缩在角落里，不敢出声。

你该怎么办？`,minDay:19,maxTriggers:1,weight:5,choices:[{id:`challenge_to_duel`,text:`跟他决斗，赢的人当头儿`,effects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`dueled_for_leadership`}],result:`你看着老周，认真地说："好。我们决斗。赢的人，当头儿。"

老周看着你，笑了笑。

"好。"他说，"我接受你的挑战。"

你们走到庇护所外面，找了一块空地。

"不用武器。"老周说，"赤手空拳。点到为止。"

"好。"你说。

战斗开始了。

老周虽然年纪大了，但是他的经验很丰富。他的每一招，都很稳，很准。

你虽然年轻，力气大，但是你的经验不足。

你们打了很久，都没有分出胜负。

最后，你抓住了一个机会，把老周摔倒在地。

你压在他身上，说："我赢了。"

老周看着你，看了很久，然后笑了。

"好。"他说，"你赢了。你是头儿。"

他站起来，拍了拍身上的灰。

"你比我想象的，要厉害。"他说，"我服了。"

你看着他，也笑了。

这场决斗，不仅解决了领导权的问题，还让你们之间，多了一份尊重。

【健康-20，理智-5】

【老周好感度+20】

【获得称号：决斗的胜利者。力量+3，敏捷+2，领导力+3。】

【团体稳定度+30】`,next:`__return__`},{id:`propose_council`,text:`提议成立委员会，大家一起决策，不是一个人说了算`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`proposed_council`}],result:`你看着老周，认真地说："我不认为，这个团体，应该由一个人说了算。"

"我们成立一个委员会吧。"你说，"每个人，都有发言权。重大决策，大家一起讨论，一起投票。"

老周看着你，愣住了。

"委员会？"他说，"那谁是头儿？"

"没有头儿。"你说，"或者说，我们都是头儿。每个人，都负责自己擅长的领域。你负责打猎和安全，陈静负责医疗和物资，我负责探索和外交。朵朵……朵朵负责开心。"

朵朵听到这里，噗嗤一声笑了出来。

老周看着你，看了很久，然后笑了。

"你这小子，很聪明。"他说，"行，我同意。委员会就委员会。"

陈静也点了点头。

"我也同意。"她说，"这样，更民主，更公平。"

你看着他们，笑了。

这场领导权之争，就这样，圆满解决了。

而且，你们还建立了一套民主决策制度。

以后，再遇到类似的问题，就有章可循了。

【理智+5】

【获得制度：委员会制度。重大决策，大家一起讨论，一起投票。每个人负责自己擅长的领域。】

【老周好感度+15】

【陈静好感度+15】

【朵朵好感度+10】

【获得称号：民主的领导者。魅力+5，智慧+3，NPC好感度获取+25%，团体冲突概率-50%。】

【团体稳定度+50】`,next:`__return__`},{id:`step_down_let_him_lead`,text:`退让，让老周当头儿，你做他的副手`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`stepped_down_leadership`}],result:`你看着老周，认真地说："你说得对。你经验丰富，你当头儿，更合适。"

老周看着你，愣住了。

"你……你愿意退让？"他问。

"对。"你说，"在这个鬼地方，能活下去，才是最重要的。谁当头儿，不重要。"

老周看着你，看了很久，然后叹了口气。

"你这小子，"他说，"比我想象的，要成熟。"

他拍了拍你的肩膀。

"行。"他说，"我当头儿，你做我的副手。我们一起，带大家活下去。"

你看着他，点了点头。

这场领导权之争，就这样，和平解决了。

虽然你失去了领导权，但是，你赢得了老周的尊重。

而且，团体没有分裂。

这，才是最重要的。

【理智-8】

【老周成为团体首领。你成为副手。】

【老周好感度+25】

【陈静好感度+5】

【获得称号：明智的副手。智慧+3，魅力+3，NPC好感度获取+20%。】

【团体稳定度+20】`,next:`__return__`}]}],Sl={mechanic_find_garage:{id:`mechanic_find_garage`,text:`你在探索的时候，发现了一个废弃的修车厂。

修车厂的大门开着，里面停着几辆报废的汽车。

你走进去，开始搜索。

修车厂里有很多工具和零件，还有一些汽油桶。

你的心脏跳得很快。

在这个鬼地方，车辆和燃料，意味着 mobility，意味着你们可以离开这个地方，去更远的地方。

但是，你也注意到，修车厂的角落里，有一个人。

是一个年轻人，大约二十多岁，穿着一件油腻的工装，手里拿着一把扳手。

他看到你，举起了扳手。

"别过来！"他喊，声音在发抖，"这是我的地方！"

你看着他，心里涌起了一股复杂的感觉。

在这个鬼地方，一个会修车的年轻人，可能是最宝贵的资源。

你该怎么办？`,choices:[{id:`peaceful_approach`,text:`放下武器，表示没有恶意，跟他聊聊`,hint:`友好的选择。他可能会信任你。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`peaceful_mechanic`}],next:`mechanic_talk`,result:`你放下武器，举起手，表示没有恶意。

"别紧张。"你说，"我没有恶意。我只是路过，想找点东西。"

年轻人看着你，看了很久，然后慢慢放下了扳手。

"你……你真的没有恶意？"他问，声音还在发抖。

"真的。"你说，"我叫……我是一个幸存者。我还有几个同伴，我们有一个庇护所。"

年轻人看着你，沉默了一会儿，然后说："我叫杨明。大家都叫我小杨。我是一个修车工。迷雾来的时候，我正在修车厂加班。然后……然后就变成现在这样了。"

他指了指周围的汽车和零件。

"这些都是我的。"他说，"我在这里守了二十多天了。"

你看着他，心里涌起了一股喜悦。

一个修车工。

在这个鬼地方，一个会修车的人，比一百个战士都宝贵。

【理智-3】`},{id:`offer_food`,text:`给他一些食物，表示善意`,hint:`务实的选择。用食物建立信任。`,effects:[{kind:`item`,item:`food`,amount:-5},{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`offered_food_mechanic`}],next:`mechanic_talk`,result:`你从背包里拿出一些食物，递给他。

"给你。"你说，"我看你好像很久没吃东西了。"

年轻人看着你递过来的食物，愣住了。

他的眼睛红了，手在发抖。

"你……你真的要给我？"他问，声音在发抖。

"对。"你说，"拿着吧。"

年轻人接过食物，大口大口地吃了起来。他吃得很急，像是饿了很久。

过了一会儿，他吃完了，用袖子擦了擦嘴。

"谢谢。"他说，声音还在发抖，"我已经三天没吃东西了。"

他看着你，眼睛里充满了感激。

"我叫杨明。"他说，"大家都叫我小杨。我是一个修车工。你呢？"

"我是一个幸存者。"你说，"我还有几个同伴，我们有一个庇护所。"

小杨看着你，认真地说："谢谢你的食物。如果有什么我能帮忙的，尽管说。修车、修机械，我都行。"

你看着他，心里涌起了一股喜悦。

一个修车工。

而且，他已经信任你了。

【食物-5，理智-2】`},{id:`be_cautious_mechanic`,text:`保持警惕，不靠近他，拿了东西就走`,hint:`安全的选择。但可能错过一个宝贵的人才。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],next:`start`,result:`你没有靠近他。

你快速地在修车厂里搜索，拿了一些工具和零件，然后转身离开了。

走了一段距离，你回头看了一眼。

小杨还站在那里，看着你离开的方向。

你打了个寒颤，加快了脚步。

在这个鬼地方，小心驶得万年船。

但是，你心里也知道，你可能错过了一个宝贵的人才。

【理智-5】

【获得物资：工具+5，零件+10】

【伏笔：修车厂的小杨。他还在那里吗？他会活下来吗？】`}]},mechanic_talk:{id:`mechanic_talk`,text:`你和小杨坐在修车厂的办公室里，聊了起来。

小杨告诉你，他今年24岁，是一个修车工，在这家修车厂工作了三年。

迷雾来的时候，他正在加班修一辆卡车。然后，雾就来了。

他的同事们都跑了，只有他，留了下来，守着这家修车厂。

"这些车，还能修吗？"你问，指了指外面的汽车。

小杨看了看外面，然后说："有几辆能修。那辆皮卡，发动机没问题，只是轮胎爆了。那辆面包车，电路有问题，但是能修。"

他顿了顿，又说："但是，我需要零件和工具。这里的零件不够。"

"燃料呢？"你问。

"有一些。"小杨说，"那几个汽油桶里，还有大约半桶汽油。但是，不够跑远路。"

你看着他，心里涌起了一股强烈的兴奋。

车辆。燃料。

如果你们有了车，你们就可以离开这个地方，去更远的地方。

去城北的灯塔。去希望号安全区。去任何你们想去的地方。

你该怎么邀请他加入？`,choices:[{id:`invite_mechanic_directly`,text:`直接邀请他加入，说你们需要一个修车工`,hint:`直接的选择。他可能会同意，也可能会拒绝。`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`invited_mechanic`}],next:`start`,result:`你看着小杨，认真地说："加入我们吧。我们需要一个修车工。有了你，我们就能修车，就能离开这个地方。"

小杨看着你，沉默了很久。

然后，他摇了摇头。

"不行。"他说，"我不能离开这里。这家修车厂，是我的全部。"

"但是，"你说，"在这里，你只能守着这些废铁。跟我们一起，你才能真正发挥你的价值。"

小杨看着你，看了很久，然后叹了口气。

"你说得对。"他说，"在这里，我只能等死。跟你们一起，也许还有希望。"

他站起来，拍了拍身上的灰。

"行。"他说，"我加入你们。但是，我有一个条件。"

"什么条件？"你问。

"这些车和零件，都归我管。"他说，"我负责修车，你们负责找燃料和零件。"

你看着他，笑了。

"好。"你说，"车辆和机械，都归你管。"

小杨也笑了。那是你第一次看到他笑，笑得很憨厚，像一个孩子。

【小杨加入了你的队伍。】

【小杨好感度+20】

【获得能力：机械专家。小杨在场时，可以修理车辆和机械，车辆故障概率-80%。】

【获得物资：可修复车辆x2（皮卡、面包车），汽油+20，工具+10，零件+20】

【理智+3】`},{id:`show_vehicle_value`,text:`先展示你们的实力和资源，再邀请他`,hint:`聪明的选择。让他看到加入的好处。`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`showed_value_mechanic`}],next:`start`,result:`你没有直接邀请他。

你先跟他聊了聊你们的情况。

"我们有一个庇护所，很安全。"你说，"有医生，有猎人，有食物，有水，有药品。还有一个小女孩。"

小杨看着你，眼睛里闪过了一丝惊讶。

"医生？猎人？"他说，"你们还有这些人？"

"对。"你说，"陈静是市第一人民医院的外科医生。老周是山里的猎人，有猎枪。"

小杨沉默了一会儿，然后说："你们这日子，过得比我好多了。"

他看着你，认真地说："你们缺什么？"

"缺一个会修车的人。"你说，"缺车辆，缺燃料。我们想离开这个地方，去更远的地方。"

小杨看着你，看了很久，然后笑了。

"你这小子，很会说话。"他说，"行，我加入你们。"

他站起来，拍了拍身上的灰。

"走吧。"他说，"带我去看看你们的庇护所。然后，我们开始修车。"

你看着他，心里涌起了一股喜悦。

在这个鬼地方，一个会修车的人，是最宝贵的战友。

【小杨加入了你的队伍。】

【小杨好感度+30】

【获得能力：机械专家。小杨在场时，可以修理车辆和机械，车辆故障概率-80%。】

【获得物资：可修复车辆x2（皮卡、面包车），汽油+30，工具+15，零件+30】

【获得称号：出色的招募者。魅力+3，智力+2，NPC好感度获取+20%。】

【理智+5】`},{id:`ask_about_vehicles`,text:`先问他哪些车能修，需要什么零件，建立合作关系`,hint:`务实的选择。先获取情报，再决定是否邀请。`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`asked_vehicles_mechanic`}],next:`start`,result:`你没有直接邀请他。

"哪些车能修？"你问，"需要什么零件？"

小杨看了你一眼，然后说："你这小子，很务实。"

他指了指外面的汽车。

"那辆皮卡，能修。"他说，"发动机没问题，只是轮胎爆了，刹车有点问题。需要四个新轮胎，一些刹车片。"

"那辆面包车，也能修。"他说，"电路有问题，发动机有点漏油。需要一些电线和密封胶。"

"那辆轿车，修不了了。"他说，"发动机都碎了。只能拆零件用。"

"燃料呢？"你问。

"那几个汽油桶里，还有大约半桶汽油。"小杨说，"大概能跑一百多公里。但是，不够跑远路。"

你看着他，点了点头。

这些情报，很宝贵。

"谢谢你。"你说，"这些情报，能帮我们很多。"

小杨摆了摆手。

"在这个鬼地方，信息就是生命。"他说，"你要是愿意，以后我们可以合作。你找零件和燃料，我负责修车。"

你看着他，笑了。

这正是你想要的。

【小杨加入了你的队伍。（以合作伙伴的身份）】

【小杨好感度+15】

【获得能力：机械专家。小杨在场时，可以修理车辆和机械，车辆故障概率-80%。】

【获得重要情报：皮卡和面包车可以修复，需要轮胎、刹车片、电线、密封胶。现有汽油能跑100多公里。】

【获得物资：可修复车辆x2（皮卡、面包车），汽油+20，工具+10，零件+20】

【理智+2】`}]},fuel_search_mission:{id:`fuel_search_mission`,text:`小杨告诉你们，要修复车辆，还需要更多的零件和燃料。

"轮胎、刹车片、电线、密封胶，这些都需要。"他说，"还有汽油，至少需要两桶，才能跑远路。"

你看着老周，问："你知道哪里有这些东西吗？"

老周想了想，然后说："城南有一个加油站，那里应该有汽油。但是，加油站可能很危险。"

"零件的话，"小杨说，"城东有一个汽配城，那里应该有我们需要的所有零件。但是，汽配城很大，可能有很多感染者。"

你看着他们，心里在盘算。

加油站。汽配城。

这两个地方，都很危险。

但是，为了车辆，为了离开这个地方，你们必须去。

你该先去哪里？`,choices:[{id:`go_gas_station_first`,text:`先去城南加油站找汽油`,hint:`燃料是关键。但加油站可能很危险。`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`went_gas_station`}],next:`gas_station_encounter`,result:`你决定，先去城南加油站找汽油。

第二天一早，你跟老周、小杨一起，出发了。

城南很远，你们走了大半天，才到达加油站。

加油站看起来很安静，没有什么动静。

但是，你们都知道，在这个鬼地方，安静，往往意味着危险。

"我去看看。"老周说，举起猎枪，小心翼翼地走了进去。

你和小杨跟在后面。

加油站里很安静，便利店的门开着，里面一片狼藉。

你们搜了一会儿，在加油站的仓库里，找到了几个汽油桶。

"有汽油！"小杨兴奋地说，"至少有三桶！"

就在这时，你听到了什么声音。

是脚步声。

很多人的脚步声，从加油站的外面传来。

你们被包围了。

【理智-8，体力-20】`},{id:`go_auto_parts_first`,text:`先去城东汽配城找零件`,hint:`零件是修车的关键。但汽配城可能有很多感染者。`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`resource`,resource:`energy`,delta:-25},{kind:`flag`,flag:`went_auto_parts`}],next:`auto_parts_encounter`,result:`你决定，先去城东汽配城找零件。

第二天一早，你跟老周、小杨一起，出发了。

城东汽配城很大，有几十家店铺。

你们走进去，开始搜索。

汽配城里很安静，但是你们能闻到，一股浓重的腐臭味。

"小心。"老周说，举起猎枪，"这里可能有很多感染者。"

你们小心翼翼地搜索着，一家店铺一家店铺地找过去。

小杨很厉害，他很快就找到了你们需要的所有零件。

"轮胎、刹车片、电线、密封胶，都有了！"他兴奋地说。

就在这时，你听到了什么声音。

是咆哮声。

很多感染者的咆哮声，从汽配城的深处传来。

你们被发现了。

"跑！"老周喊。

你们拿起零件，转身就跑。

身后，传来了感染者的咆哮声和脚步声，越来越近。

【理智-10，体力-25】`},{id:`split_up_search`,text:`分开行动，一组去加油站，一组去汽配城`,hint:`高效的选择。但分开行动，风险更大。`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`resource`,resource:`health`,delta:-15},{kind:`flag`,flag:`split_up_search`}],next:`start`,result:`你决定，分开行动。

"老周，你跟小杨去汽配城找零件。"你说，"我去加油站找汽油。"

老周看着你，皱起了眉头。

"分开行动，太危险了。"他说。

"但是，这样更快。"你说，"我们时间不多了。"

老周看着你，看了很久，然后叹了口气。

"行。"他说，"你小心点。"

你们分开了。

你一个人，去了城南加油站。

加油站很安静，你很快就找到了三桶汽油。

但是，就在你准备离开的时候，你遇到了一群感染者。

战斗很惨烈。

你拼了命，才把那些感染者解决。

你的身上，多了好几道伤口。

但是，你拿到了汽油。

你带着汽油，回到了约定的地点。

老周和小杨已经在那里等你了。他们也拿到了所有的零件。

"你受伤了。"老周说，看着你身上的伤口。

"没事。"你说，"都拿到了吗？"

"都拿到了。"小杨说，兴奋地举起手里的零件。

你看着他们，笑了。

虽然受了伤，但是，你们拿到了所有需要的东西。

很快，你们就能有车了。

【理智-12，健康-15】

【获得物资：汽油+60，轮胎x4，刹车片x2，电线x10，密封胶x5】

【小杨好感度+15】

【老周好感度+10】

【获得称号：无畏的独行者。力量+3，敏捷+3，意志力+3。】`}]},gas_station_encounter:{id:`gas_station_encounter`,text:`你们被包围了。

一群人，从加油站的外面走了进来。

大约有十几个人，手里拿着武器，看起来是一群强盗。

为首的是一个高大的男人，脸上有一道长长的伤疤，从额头一直划到下巴。

"把东西放下。"伤疤男说，声音很粗，"然后，滚。"

你看着他们，心里涌起了一股愤怒。

但是，你也知道，你们只有三个人，而他们有十几个。

硬拼，你们肯定赢不了。

你该怎么办？`,choices:[{id:`negotiate_with_bandits`,text:`跟他们谈判，分一部分汽油给他们`,hint:`务实的选择。用一部分汽油换平安。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`negotiated_bandits`}],next:`start`,result:`你看着伤疤男，认真地说："我们可以分一部分汽油给你们。但是，我们需要留一部分。"

伤疤男看着你，看了很久，然后笑了。

"你这小子，很聪明。"他说，"行，分一半。"

你看着他，心里在盘算。

一半，就是一桶半。

虽然亏了，但是，至少你们还能拿到一桶半。

而且，你们不用拼命。

"好。"你说，"分一半。"

伤疤男笑了笑，挥了挥手。

他的手下走过来，拿走了一桶半汽油。

"走吧。"伤疤男说，"以后，在城南，报我的名字，刀疤刘。没人会动你们。"

你看着他们，点了点头。

然后，你们带着剩下的汽油，离开了。

走了一段距离，你回头看了一眼。

刀疤刘还站在加油站门口，看着你们离开的方向。

你打了个寒颤，加快了脚步。

在这个鬼地方，什么人都有。

【理智-5】

【获得物资：汽油+45】

【建立关系：刀疤刘的强盗团。城南的势力，报他的名字可以保平安。】

【重要伏笔：刀疤刘。他是谁？他的强盗团有多少人？他以后会成为朋友还是敌人？】`},{id:`fight_bandits`,text:`跟他们拼了，老周有猎枪，你们不一定输`,hint:`冒险的选择。赢了可以拿到所有汽油，输了可能会死。`,effects:[{kind:`resource`,resource:`health`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`fought_bandits`}],next:`start`,result:`你看着老周，使了个眼色。

老周明白了，他举起猎枪，对着刀疤刘，开了一枪。

"砰！"

刀疤刘吓得躲到了一辆汽车后面。

"打！"你喊。

战斗开始了。

这是一场惨烈的战斗。

强盗们人多，但是你们有猎枪，而且你们的位置更好。

老周的猎枪，一枪一个，弹无虚发。

小杨虽然不会打架，但是他很聪明，他用汽油瓶做了几个燃烧弹，扔向了强盗们。

你握紧武器，冲了上去。

战斗持续了大约十分钟。

最后，强盗们撑不住了，他们丢下几具尸体，逃跑了。

刀疤刘也跑了，他跑的时候，回头看了你一眼，眼睛里充满了怨恨。

"我会回来的！"他喊，"我会杀了你们的！"

你靠在墙上，大口喘着气。

你的身上，有好几道伤口，在流血。

但是，你们赢了。

你们拿到了所有的汽油。

【健康-30，理智-10】

【获得物资：汽油+60，武器+5，子弹+30】

【获得战利品：强盗的物资（食物+20，水+15，药品+5）】

【老周好感度+20】

【小杨好感度+20】

【获得称号：以少胜多的勇士。力量+3，敏捷+2，领导力+3。】

【重要伏笔：刀疤刘的仇恨。他跑了，他说他会回来的。他以后会成为你们的敌人。】`},{id:`sneak_away_bandits`,text:`趁他们不注意，偷偷溜走，放弃汽油`,hint:`安全的选择。但会失去汽油。`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],next:`start`,result:`你看着老周和小杨，使了个眼色。

然后，你们慢慢地，悄悄地，往后退。

强盗们没有注意到你们，他们还在盯着加油站的仓库。

你们退到了加油站的后面，然后转身就跑。

你们跑得很快，很用力，不敢回头。

不知道跑了多久，你们终于停下来，靠在一棵树上，大口喘着气。

"汽油……没拿到。"小杨说，喘着气。

"没关系。"你说，"活着，比什么都重要。"

老周点了点头。

"你说得对。"他说，"那些强盗，人太多了，硬拼肯定不行。"

你看着他们，心里涌起了一股愧疚。

你们白跑了一趟。

但是，你们都活着。

在这个鬼地方，活着，比什么都重要。

【理智-8】

【没有获得汽油。】

【伏笔：城南的强盗团。刀疤刘。他们占据了加油站。你们以后还能拿到汽油吗？】`}]},auto_parts_encounter:{id:`auto_parts_encounter`,text:`你们被感染者发现了。

很多感染者，从汽配城的深处涌了出来。

至少有几十个。

"跑！"老周喊，举起猎枪，对着最前面的感染者，开了一枪。

"砰！"

那个感染者倒了下去。

但是，更多的感染者，涌了上来。

你们拿起零件，转身就跑。

身后，传来了感染者的咆哮声和脚步声，越来越近。

你们跑出了汽配城，但是，感染者还在追。

你们跑了很久，才甩掉了他们。

你们靠在一棵树上，大口喘着气。

"零件……都拿到了吗？"你问。

小杨举起手里的袋子，点了点头。

"都拿到了。"他说，喘着气，"轮胎、刹车片、电线、密封胶，都有了。"

你看着他，笑了。

虽然很危险，但是，你们拿到了所有需要的零件。

很快，你们就能有车了。`,choices:[{id:`check_injuries_parts`,text:`检查伤亡情况，整理零件`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`sanity`,delta:-5}],next:`start`,result:`你看着大家，认真地说："检查一下，有没有人受伤。"

老周摇了摇头。

"我没事。"他说。

小杨看了看自己的手臂。

"我这里被划了一道口子。"他说，"但是不深。"

你从背包里拿出药品和绷带，帮小杨处理了伤口。

然后，你们整理了一下拿到的零件。

轮胎四个，刹车片两副，电线十卷，密封胶五管。

都齐了。

"太好了。"小杨说，兴奋地看着这些零件，"有了这些，我就能把那两辆车都修好。"

你看着他，也笑了。

很快，你们就能有车了。

有了车，你们就能离开这个地方，去更远的地方。

【健康-10，理智-5】

【获得物资：轮胎x4，刹车片x2，电线x10，密封胶x5】

【小杨好感度+15】

【老周好感度+10】

【获得称号：汽配城的幸存者。敏捷+3，意志力+3。】`}]},vehicle_repair_complete:{id:`vehicle_repair_complete`,text:`经过两天的努力，小杨终于把两辆车都修好了。

一辆皮卡，一辆面包车。

皮卡很结实，适合在烂路上行驶。面包车很大，可以装很多人和物资。

小杨把两辆车都检查了一遍，然后拍了拍皮卡的车门。

"好了。"他说，脸上带着自豪的笑容，"都修好了。发动机没问题，刹车没问题，电路没问题。"

"能跑多远？"你问。

"皮卡的油箱大，加满油能跑五百公里。"小杨说，"面包车能跑四百公里。我们现在的汽油，两辆车都加满，还能剩一些。"

你看着这两辆车，心里涌起了一股强烈的兴奋。

车辆。

在这个鬼地方，车辆，意味着自由。

意味着你们可以离开这个地方，去任何你们想去的地方。

去城北的灯塔。去希望号安全区。去寻找迷雾的真相。

"我们什么时候出发？"老周问，他也很兴奋。

你看着大家，心里在盘算。

出发，意味着离开这个你们经营了二十多天的庇护所。

意味着未知的危险和机遇。

但是，你们必须走。

在这里，你们只能苟且偷生。

只有走出去，你们才能找到希望。

你该什么时候出发？`,choices:[{id:`depart_immediately`,text:`明天就出发，去城北灯塔`,hint:`果断的选择。早走早好，但准备可能不充分。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`depart_immediately`}],next:`caravan_departure`,result:`你看着大家，认真地说："明天就出发。去城北灯塔。"

大家看着你，都点了点头。

"好。"老周说，"我去准备武器和弹药。"

"我去准备食物和水。"陈静说。

"我去检查车辆。"小杨说。

朵朵看着你们，紧紧抱着她的毛绒兔子。

"我们要走了吗？"她问。

"对。"你说，摸了摸她的头，"我们要去一个新的地方。"

朵朵点了点头，没有说话。

那天晚上，你们忙碌了很久，准备出发的物资。

第二天一早，你们装上了所有的东西，坐上了车。

小杨发动了皮卡，发动机发出了一声低沉的轰鸣。

"走吧。"你说。

小杨踩下油门，两辆车，缓缓地驶离了庇护所。

你们回头看了一眼。

那个你们经营了二十多天的庇护所，渐渐消失在了雾里。

你们的新生活，开始了。

【理智-5】

【获得状态：车队。拥有皮卡和面包车两辆车辆，活动范围大幅扩大。】

【离开原庇护所，开始迁移。】

【重要事件：车队出发。前往城北灯塔。】`},{id:`prepare_more`,text:`再准备几天，收集更多物资再出发`,hint:`谨慎的选择。准备充分再走，但可能会错过时机。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`prepare_more`}],next:`start`,result:`你看着大家，认真地说："再准备几天。我们需要收集更多的物资，确保路上不会出问题。"

大家看着你，都点了点头。

"好。"老周说，"我去多打一些猎物。"

"我去多找一些药品。"陈静说。

"我去再检查一遍车辆，确保万无一失。"小杨说。

接下来的几天，你们忙碌了起来。

老周打到了很多猎物，食物储备增加了不少。

陈静找到了很多药品，医疗物资也充足了。

小杨把两辆车都仔细检查了一遍，还做了一些改装，比如在车身上加装了防护板。

朵朵也没有闲着，她帮着整理物资，还画了一幅画，画的是你们一家人，坐在车上，驶向远方。

你看着那幅画，心里涌起了一股温暖。

三天后，你们准备就绪。

食物、水、药品、武器、燃料，都充足了。

车辆也检查完毕，万无一失。

"可以出发了。"小杨说。

你看着大家，点了点头。

"明天一早，出发。"你说，"去城北灯塔。"

【理智-3】

【获得物资：食物+30，水+25，药品+10，子弹+50】

【车辆改装：加装防护板，防御力+30%。】

【获得状态：车队。拥有皮卡和面包车两辆车辆，活动范围大幅扩大。】

【朵朵的画：每日理智恢复+1。】

【准备充分：迁移途中遭遇危险的概率-30%。】`},{id:`send_scout_first`,text:`先派一个人去探路，确认路线安全再出发`,hint:`聪明的选择。先探路，再出发，更安全。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`send_scout_first`}],next:`start`,result:`你看着大家，认真地说："先派一个人去探路，确认路线安全，我们再出发。"

"我去。"老周说，"我熟悉野外，我去探路最合适。"

你看着他，点了点头。

"好。"你说，"小心点。"

老周带上猎枪和一些物资，出发了。

他去了两天。

第三天，他回来了。

"路线基本安全。"他说，喘着气，"从这里到城北，大约有一百五十公里。路上有几个危险区域，但是都可以绕过去。"

"有什么危险？"你问。

"中途有一个小镇，里面有很多感染者。"老周说，"但是可以绕过去，走旁边的小路。"

"还有，"他又说，"离城北大约三十公里的地方，有一个检查站。看起来是军方的人，但是不知道他们是不是还在。"

你看着他，点了点头。

这些情报，很宝贵。

"辛苦了。"你说，"休息一下，我们明天出发。"

老周点了点头，去休息了。

你看着地图，心里在盘算。

一百五十公里。

以你们的车速，大约需要半天。

但是，路上有危险。

你们必须小心。

【理智-5，体力-20】

【获得重要情报：从庇护所到城北灯塔约150公里，中途有感染小镇可绕行，离城北30公里有军方检查站。】

【获得状态：车队。拥有皮卡和面包车两辆车辆，活动范围大幅扩大。】

【路线已探明：迁移途中遭遇危险的概率-50%。】

【老周好感度+15】`}]},caravan_departure:{id:`caravan_departure`,text:`车队出发了。

皮卡在前，面包车在后，缓缓地驶离了你们经营了二十多天的庇护所。

你坐在皮卡的副驾驶座上，看着窗外的风景。

雾还是那么浓，但是，有了车，你们的速度快了很多。

老周坐在后座，手里拿着猎枪，警惕地看着窗外。

小杨开着车，脸上带着兴奋的笑容。

面包车里，陈静和朵朵坐在一起。朵朵靠在陈静的肩膀上，看着窗外，眼睛里充满了好奇。

"我们要去哪里？"朵朵问。

"去城北。"陈静说，"去一个有光的地方。"

"有光的地方？"朵朵问，"那里安全吗？"

"不知道。"陈静说，"但是，我们必须去看看。"

你看着窗外，心里也在想同样的问题。

城北灯塔。

那里，有什么？

是希望？还是危险？

你不知道。

但是，你知道，你们必须去。

因为，只有走出去，你们才能找到答案。

车队在雾里行驶着，驶向未知的远方。

你们的新生活，开始了。`,choices:[{id:`continue_journey`,text:`继续前进，注意观察周围`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`energy`,delta:-10}],next:`road_encounter_1`,result:`你看着小杨，认真地说："继续前进。注意观察周围。"

小杨点了点头，继续开车。

车队在雾里行驶着。

你看着窗外，警惕地观察着周围。

雾很浓，能见度不到五十米。

但是，有了车，你们的安全感增加了不少。

大约行驶了一个小时，你们来到了一个十字路口。

路牌上写着：左边是城南，右边是城东，直走是城北。

"直走。"你说。

小杨点了点头，继续直走。

就在这时，你听到了什么声音。

是发动机的声音。

从你们的后面传来。

有车在追你们。

【理智-3，体力-10】`}]},road_encounter_1:{id:`road_encounter_1`,text:`有车在追你们。

你从后视镜里看了看。

雾里，有两辆车，正在加速追赶你们。

一辆黑色的轿车，一辆白色的面包车。

"他们是什么人？"老周问，举起了猎枪。

"不知道。"你说，"但是，看起来不像是好人。"

"怎么办？"小杨问，声音有点紧张，"要加速吗？"

你看着后视镜，心里在盘算。

那两辆车，速度比你们快。

如果加速，你们可能跑不过他们。

如果停下来，你们可能会有危险。

你该怎么办？`,choices:[{id:`speed_up_escape`,text:`加速，甩掉他们`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`energy`,delta:-15},{kind:`flag`,flag:`speed_up_escape`}],next:`start`,result:`"加速！"你喊。

小杨踩下油门，皮卡发出了一声轰鸣，速度一下子提了上来。

面包车也跟着加速。

但是，后面的两辆车，速度更快。

他们越来越近。

"他们有枪！"老周喊，"他们在朝我们开枪！"

你回头看了一眼。

果然，黑色轿车的车窗里，伸出了几把枪，正在朝你们射击。

"趴下！"你喊。

子弹打在了车身上，发出了叮叮当当的声音。

小杨拼命地踩着油门，皮卡的速度已经提到了极限。

但是，后面的车，还是紧追不舍。

就在这时，你看到了前面的一个岔路口。

"小杨，左转！"你喊。

小杨猛地打方向盘，皮卡拐进了左边的小路。

面包车也跟着拐了进去。

小路很窄，两边都是树。

后面的两辆车，速度太快，来不及拐弯，冲过了岔路口。

你们甩掉了他们。

你靠在座位上，大口喘着气。

你的心脏跳得很快，像是要从嗓子眼里跳出来。

"他们是什么人？"小杨问，喘着气。

"不知道。"你说，"但是，在这个鬼地方，有车有枪的，肯定不是好人。"

老周点了点头。

"我们要小心。"他说，"他们可能还会再遇到我们。"

【理智-8，体力-15】

【车辆轻微受损：防弹玻璃出现裂纹。】

【重要伏笔：路上的不明车辆。他们是什么人？为什么要追你们？他们还会再出现吗？】`},{id:`stop_and_confront`,text:`停下来，跟他们对峙，看看他们是什么人`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`stop_and_confront`}],next:`road_encounter_confrontation`,result:`"停下来。"你说。

小杨看着你，愣住了。

"停下来？"他问，"他们有枪！"

"停下来。"你重复道，"我们跑不过他们。不如停下来，看看他们是什么人。"

小杨看着你，看了很久，然后点了点头。

他踩下刹车，两辆车，缓缓地停在了路边。

后面的两辆车，也停了下来。

黑色轿车的门开了，走下来一个人。

是一个女人，大约三十多岁，穿着一身黑色的皮衣，手里拿着一把手枪。

她走到你们的车前面，敲了敲车窗。

"下车。"她说，声音很冷，"我们不会伤害你们。"

你看着她，心里在盘算。

她看起来，不像是普通的强盗。

她的气质，更像是……军人。

你该怎么办？

【理智-10】`},{id:`fight_back`,text:`反击，老周有猎枪，我们不一定输`,effects:[{kind:`resource`,resource:`health`,delta:-25},{kind:`resource`,resource:`sanity`,delta:-12},{kind:`flag`,flag:`fight_back_car`}],next:`start`,result:`"老周，开枪！"你喊。

老周举起猎枪，对着后面的黑色轿车，开了一枪。

"砰！"

子弹打在了黑色轿车的挡风玻璃上，玻璃碎了。

黑色轿车猛地刹车，停了下来。

白色面包车也停了下来。

"打！"你喊。

战斗开始了。

这是一场公路枪战。

对方有枪，但是你们有猎枪，而且你们的位置更好。

老周的猎枪，一枪一个，弹无虚发。

你也拿起武器，朝对方射击。

小杨虽然不会打架，但是他很聪明，他开着车，不断地移动，让对方打不到你们。

战斗持续了大约五分钟。

最后，对方撑不住了，他们丢下两具尸体，开车逃跑了。

你靠在座位上，大口喘着气。

你的手臂被子弹擦伤了，在流血。

但是，你们赢了。

"他们是什么人？"小杨问，喘着气。

"不知道。"你说，"但是，他们的武器很专业，不像是普通的强盗。"

老周点了点头。

"他们可能是军方的人。"他说，"或者，是某个大势力的人。"

你看着他们逃跑的方向，心里涌起了一股不安。

在这个鬼地方，有车有枪的大势力。

你们以后，可能还会遇到他们。

【健康-25，理智-12】

【获得战利品：武器+3，子弹+50，食物+10，水+8】

【车辆受损：挡风玻璃碎裂，需要修复。】

【老周好感度+20】

【小杨好感度+15】

【获得称号：公路枪战的胜利者。力量+3，敏捷+3，领导力+3。】

【重要伏笔：路上的不明势力。他们是什么人？为什么要攻击你们？他们还会再出现吗？】`}]},road_encounter_confrontation:{id:`road_encounter_confrontation`,text:`你看着那个女人，心里做出了决定。

你推开车门，走了下去。

老周也跟着走了下去，手里拿着猎枪，警惕地看着对方。

女人看着你们，笑了笑。

"别紧张。"她说，"我们不是坏人。"

"那你们是什么人？"你问，"为什么要追我们？"

女人看着你，认真地说："我们是希望号安全区的巡逻队。我叫林小雨，是安全区的巡逻队长。"

希望号安全区。

你心里涌起了一股惊讶。

就是那个广播里的安全区。

城北山顶，五百个幸存者。

"你们为什么要追我们？"你问，"我们没有恶意。"

林小雨笑了笑。

"我们看到有车，就想过来看看。"她说，"在这个鬼地方，有车的人，不多。我们想确认一下，你们是不是感染者。"

她指了指你的眼睛。

"你的眼睛很正常。"她说，"没有变红。你们没有被感染。"

你看着她，心里在盘算。

希望号安全区的巡逻队。

这意味着，你们离安全区不远了。

"你们要去哪里？"林小雨问。

"城北。"你说，"去灯塔。"

林小雨看着你，眼睛里闪过了一丝惊讶。

"灯塔？"她说，"你们去灯塔干什么？那里很危险。"

"危险？"你问，"为什么？"

林小雨沉默了一会儿，然后说："灯塔下面，有东西。"

"什么东西？"你问。

林小雨摇了摇头。

"我不知道。"她说，"但是，我们的人，去过灯塔，但是，没有人回来过。"

你看着她，心里涌起了一股寒意。

灯塔下面，有东西。

去过的人，都没有回来。

那迷雾低语说的，是真的吗？

迷雾的真相，在灯塔下面。

你该怎么办？`,choices:[{id:`go_to_safe_zone_first`,text:`先去希望号安全区，休整一下再去灯塔`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`go_to_safe_zone_first`}],next:`start`,result:`你看着林小雨，认真地说："我们先去希望号安全区，休整一下，再去灯塔。"

林小雨看着你，点了点头。

"好。"她说，"跟我来。我带你们去安全区。"

她转身上车，两辆车，在前面带路。

你们跟在后面，驶向希望号安全区。

大约行驶了半个小时，你们来到了城北的山脚下。

山顶上，有一片建筑群。

那就是希望号安全区。

你们沿着山路，开上了山顶。

安全区的大门，是用铁栅栏做的，门口有几个持枪的守卫。

林小雨跟他们说了几句话，然后，大门开了。

你们开车，进入了安全区。

安全区里，有很多人。

他们有的在干活，有的在聊天，有的在照顾孩子。

看起来，这里真的是一个安全的地方。

你看着这一切，心里涌起了一股温暖。

在这个鬼地方，居然还有这样的地方。

【理智+3】

【到达希望号安全区。城北山顶，500幸存者。】

【建立关系：林小雨，希望号安全区巡逻队长。】

【获得状态：安全区休整。可以在安全区交易、休息、获取情报。】

【重要伏笔：灯塔的秘密。灯塔下面有东西，去过的人都没有回来。迷雾的真相，真的在那里吗？】`},{id:`go_to_lighthouse_now`,text:`不去安全区，直接去灯塔，寻找真相`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`go_to_lighthouse_now`}],next:`start`,result:`你看着林小雨，认真地说："不去安全区了。我们直接去灯塔。"

林小雨看着你，愣住了。

"直接去灯塔？"她说，"你疯了吗？那里很危险！去过的人，都没有回来过！"

"我知道。"你说，"但是，我们必须去。迷雾的真相，可能就在那里。"

林小雨看着你，看了很久，然后叹了口气。

"你这小子，很勇敢。"她说，"但是，也很愚蠢。"

她从口袋里掏出一个对讲机，递给你。

"拿着。"她说，"如果遇到危险，就呼叫我。我会带人来救你们。"

你接过对讲机，点了点头。

"谢谢。"你说。

林小雨摇了摇头。

"别谢我。"她说，"希望你们能活着回来。"

她转身上车，两辆车，开走了。

你看着他们离开的方向，然后转过身，看着远处的灯塔。

灯塔在雾里，若隐若现。

顶端的光，还在亮着。

"走吧。"你说。

小杨点了点头，发动了车。

两辆车，驶向灯塔。

你的心脏跳得很快。

因为你知道，你们即将面对的，可能是迷雾的真相。

也可能，是死亡。

【理智-10】

【获得物品：林小雨的对讲机。遇到危险可以呼叫救援。】

【前往城北灯塔。寻找迷雾的真相。】

【重要事件：灯塔探索。迷雾的真相，就在那里。】

【重要伏笔：灯塔的秘密。灯塔下面有东西，去过的人都没有回来。你们会成为第一个回来的人吗？】`},{id:`ask_more_about_lighthouse`,text:`先问她更多关于灯塔的事情，再做决定`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`asked_more_lighthouse`}],next:`start`,result:`你看着林小雨，认真地说："在做决定之前，我想知道更多关于灯塔的事情。"

林小雨看着你，沉默了一会儿，然后点了点头。

"好。"她说，"我告诉你。"

"灯塔，在城北的海边。"她说，"迷雾来之前，那是一个普通的灯塔，用来给船只导航。"

"迷雾来之后，灯塔就变了。"她说，"首先，是灯塔的光，变得很奇怪。那光，不是普通的光，它……它像是活的一样。"

"然后，是灯塔下面。"她说，"我们的人，发现灯塔下面，有一个地下室。地下室里，有很多奇怪的设备。还有……一些奇怪的生物。"

"奇怪的生物？"你问。

林小雨的身体抖了一下。

"对。"她说，"那些生物，看起来像是人，但是，它们的皮肤是透明的，能看到里面的器官。它们的眼睛，是纯白色的，没有瞳孔。"

"它们……它们会说话。"她说，声音在发抖，"它们会叫你的名字。它们会告诉你，你内心最深处的秘密。"

你看着她，心里涌起了一股强烈的不安。

透明的皮肤。纯白色的眼睛。会叫你的名字。会告诉你内心的秘密。

这是什么东西？

"我们的人，去了三批。"林小雨说，"第一批，五个人，没有回来。第二批，十个人，也没有回来。第三批，二十个人，还是没有回来。"

"从那以后，我们就再也不敢去灯塔了。"她说，"那里，是禁区。"

你看着她，心里在盘算。

三批人，三十五个人，都没有回来。

那里，到底有什么？

迷雾的真相，真的在那里吗？

【理智-5】

【获得重要情报：灯塔下面有地下室，里面有奇怪的设备和生物。那些生物皮肤透明、眼睛纯白、会叫名字、会说内心秘密。三批人共35人去了都没有回来。】

【林小雨好感度+10】

【重要伏笔：灯塔的秘密。那些生物是什么？它们和迷雾有什么关系？迷雾的真相，真的在那里吗？】`}]}},Cl=[{id:`phase4_abandoned_gas_station`,text:`你在路边发现了一个废弃的加油站。

加油站看起来很安静，没有什么动静。

但是，在这个鬼地方，安静，往往意味着危险。

你该怎么办？`,minDay:22,maxTriggers:1,weight:8,choices:[{id:`search_gas_station`,text:`进去搜索，看看有没有汽油和物资`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`sanity`,delta:-5}],result:`你小心翼翼地走进了加油站。

加油站里很安静，便利店的门开着，里面一片狼藉。

你搜了一会儿，在加油站的仓库里，找到了几个汽油桶。

还有一些食物和水。

就在你准备离开的时候，你听到了什么声音。

是咆哮声。

从加油站的后面传来。

你回头看了一眼。

是几只感染者，从后面走了出来。

你拿起东西，转身就跑。

你跑得很快，很用力，不敢回头。

不知道跑了多久，你终于甩掉了他们。

你靠在一棵树上，大口喘着气。

你的手臂被门划了一道口子，在流血。

但是，你拿到了汽油和物资。

这一趟，值了。

【健康-10，理智-5】

【获得物资：汽油+40，食物+10，水+8，零食+5】`,next:`__return__`},{id:`leave_gas_station`,text:`太危险了，不进去，继续赶路`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你看着加油站，摇了摇头。

在这个鬼地方，小心驶得万年船。

你没有进去，继续赶路。

走了一段距离，你回头看了一眼。

加油站还在那里，静静地立在雾里。

你打了个寒颤，加快了脚步。

【理智-3】`,next:`__return__`}]},{id:`phase4_abandoned_vehicles`,text:`你在路边发现了一排废弃的车辆。

大约有十几辆，轿车、SUV、卡车，都有。

看起来，像是一个车队，被遗弃在了这里。

你该怎么办？`,minDay:23,maxTriggers:1,weight:7,choices:[{id:`search_vehicles`,text:`搜索这些车辆，看看有没有有用的东西`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`energy`,delta:-15}],result:`你走过去，开始搜索这些车辆。

大部分车辆里，都没有什么有用的东西。

但是，在一辆卡车的车厢里，你找到了一些物资。

食物、水、药品、工具、零件……应有尽有。

看起来，这是一个运输物资的车队。

你把有用的东西，都搬了出来。

就在这时，你在一辆轿车的后座上，发现了一个人。

不，是一具尸体。

尸体已经开始腐烂了，但是，你能看到，他的手里，紧紧握着一个东西。

是一个笔记本。

你小心翼翼地把笔记本从他手里拿出来，翻开看了看。

笔记本上，记录着这个车队的行程。

他们是从城南出发的，要去城北的希望号安全区。

但是，在路上，他们遇到了袭击。

是一群不明身份的武装人员。

他们抢走了大部分物资，还杀了很多人。

笔记本的最后一页，写着一行字：

"小心路上的武装人员。他们不是军方，他们是……"

字到这里就断了。

你合上笔记本，心里涌起了一股不安。

路上的武装人员。

他们是谁？

他们为什么要袭击这个车队？

【理智-5，体力-15】

【获得物资：食物+20，水+15，药品+8，工具+5，零件+10】

【获得物品：车队的笔记本。记录了被武装人员袭击的经过。】

【重要伏笔：路上的不明武装人员。他们是谁？他们为什么要袭击幸存者车队？】`,next:`__return__`},{id:`siphon_gas`,text:`只抽汽油，不搜索其他东西`,effects:[{kind:`resource`,resource:`energy`,delta:-10}],result:`你没有搜索其他东西。

你拿出油管，开始从这些车辆的油箱里抽汽油。

一辆一辆地抽，你抽了大约半个小时。

总共抽到了大约两桶汽油。

你把汽油桶搬上车，然后离开了。

虽然没有找到其他物资，但是，汽油也很宝贵。

有了这些汽油，你们就能跑得更远。

【体力-10】

【获得物资：汽油+50】`,next:`__return__`}]},{id:`phase4_road_survivor`,text:`你在路边发现了一个人。

是一个年轻女人，大约二十多岁，躺在路边，身上有很多伤口。

她看到你，虚弱地挥了挥手。

"救救我……"她说，"求求你，救救我……"

你该怎么办？`,minDay:24,maxTriggers:1,weight:7,choices:[{id:`help_road_survivor`,text:`救她，带她上车，给她处理伤口`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`item`,item:`medicine`,amount:-3},{kind:`item`,item:`bandage`,amount:-2}],result:`你走过去，蹲下来，检查了一下她的伤口。

她的身上，有好几道伤口，都在流血。

但是，都不深，没有生命危险。

你从背包里拿出药品和绷带，帮她处理了伤口。

然后，你把她扶上车，让她躺在后座上休息。

"谢谢你……"她说，声音很虚弱，"我叫王芳……我是一个大学生……迷雾来的时候，我正在学校里……"

她的眼睛红了。

"我的同学……都死了……只有我一个人，逃了出来……"

你看着她，心里涌起了一股同情。

在这个鬼地方，每个人都有自己的故事。

每个人都在失去，每个人都在寻找。

"你要去哪里？"你问。

"城北。"她说，"我听说，城北有一个安全区……我想去那里……"

你看着她，点了点头。

"我们也要去城北。"你说，"你跟我们一起吧。"

王芳看着你，眼泪掉了下来。

"谢谢……"她说，"谢谢你们……"

【理智-3】

【使用药品-3，绷带-2】

【王芳加入了你的队伍。】

【王芳好感度+30】

【获得能力：大学生的知识。王芳是大学生，懂电脑、懂通讯、懂英语。可以帮助修理电子设备和翻译。】`,next:`__return__`},{id:`give_supplies_leave`,text:`给她一些物资，但是不带她走`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`food`,amount:-3},{kind:`item`,item:`water`,amount:-2}],result:`你看着她，心里很矛盾。

她受伤了，带着她，可能会拖累你们。

你从背包里拿出一些食物和水，递给她。

"这些给你。"你说，"我们还有事，不能带你走。"

王芳看着你，眼睛里闪过了一丝失望。

但是，她还是接过了食物和水。

"谢谢。"她说，声音很轻。

你转身上车，离开了。

走了一段距离，你回头看了一眼。

王芳还躺在路边，看着你们离开的方向。

你打了个寒颤，加快了车速。

在这个鬼地方，你救不了所有人。

【理智-8】

【食物-3，水-2】

【伏笔：路边的王芳。她会活下来吗？她会到达安全区吗？如果她活下来了，她会记得你吗？】`,next:`__return__`},{id:`ignore_road_survivor`,text:`不停车，继续赶路`,effects:[{kind:`resource`,resource:`sanity`,delta:-10}],result:`你没有停车。

你踩下油门，继续赶路。

从后视镜里，你能看到，王芳还在路边，虚弱地挥着手。

但是，你没有回头。

你不敢回头。

因为你知道，如果你回头看了，你就会忍不住停车。

而停车，你可能会给自己带来麻烦。

你靠在座位上，闭上眼睛。

你的手在发抖。

你知道，那个女人，可能活不过今天。

但是，你也知道，在这个鬼地方，你救不了所有人。

【理智-10】

【获得永久创伤：路边的求救。每次看到有人求救，理智-5。】

【伏笔：被忽视的王芳。她会活下来吗？如果她活下来了，她会恨你吗？】`,next:`__return__`}]},{id:`phase4_roadblock`,text:`前面的路，被堵住了。

是一个路障，用废弃的车辆和石头堆成的。

路障的后面，站着几个人，手里拿着武器。

看起来，是一群强盗，在这里设卡收费。

为首的是一个矮胖的男人，脸上带着贪婪的笑容。

"要想从这里过，留下买路财！"他喊，"食物、水、汽油，都行！"

你该怎么办？`,minDay:25,maxTriggers:1,weight:7,choices:[{id:`pay_toll`,text:`给他们一些物资，买路通过`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`item`,item:`food`,amount:-10},{kind:`item`,item:`water`,amount:-8}],result:`你看着矮胖男人，想了想，然后说："好，我们给你们物资。但是，你们要让我们安全通过。"

矮胖男人笑了笑。

"好说，好说。"他说，"我们是讲道理的人。"

你从车上拿下一些食物和水，递给了他。

矮胖男人检查了一下，然后挥了挥手。

"放行！"他喊。

他的手下搬开了路障，让你们通过。

你踩下油门，两辆车，缓缓地通过了路障。

走了一段距离，你回头看了一眼。

矮胖男人还站在那里，数着你们给的物资，脸上带着贪婪的笑容。

你打了个寒颤，加快了车速。

在这个鬼地方，什么人都有。

【理智-5】

【食物-10，水-8】

【通过路障，继续前进。】

【伏笔：路上的强盗路障。矮胖男人。他以后还会再遇到你们吗？】`,next:`__return__`},{id:`force_through`,text:`硬冲过去，撞开路障`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`sanity`,delta:-8}],result:`"坐稳了！"你喊。

小杨踩下油门，皮卡发出了一声轰鸣，朝路障冲了过去。

"砰！"

皮卡撞上了路障，废弃的车辆和石头，被撞飞了。

路障后面的强盗们，吓得四散奔逃。

矮胖男人吓得摔倒在地，连滚带爬地跑了。

你没有停车，继续踩油门，冲了过去。

面包车也跟着冲了过去。

你们冲过了路障，继续前进。

走了一段距离，你检查了一下车辆。

皮卡的车头，撞坏了，但是还能开。

你的额头，撞到了挡风玻璃上，起了一个包。

但是，你们没有给他们物资，也没有受伤。

这一趟，值了。

【健康-15，理智-8】

【车辆受损：车头撞坏，需要修复。】

【通过路障，继续前进。】

【获得称号：勇敢的冲锋者。力量+3，敏捷+2，意志力+3。】

【重要伏笔：被冲撞的强盗路障。矮胖男人。他会报复你们吗？】`,next:`__return__`},{id:`find_alternate_route`,text:`绕路，找其他路通过`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`energy`,delta:-20}],result:`你看着路障，想了想，然后说："绕路。我们找其他路通过。"

小杨点了点头，调转车头，开始找其他路。

你们在附近转了很久，终于找到了一条小路。

小路很窄，两边都是树，但是，能通车。

你们沿着小路，慢慢地开了过去。

小路很颠簸，车速很慢。

但是，至少，你们不用给强盗物资，也不用冒险硬冲。

大约开了一个小时，你们终于绕开了路障，回到了主路上。

你靠在座位上，松了一口气。

虽然绕了远路，浪费了时间和汽油，但是，你们安全地通过了。

【理智-3，体力-20】

【消耗额外汽油+10。】

【绕开路障，继续前进。】`,next:`__return__`}]},{id:`phase4_military_checkpoint`,text:`你们来到了一个军事检查站。

检查站的路障还在，但是，没有人。

看起来，这里的军人，已经撤离了，或者……已经死了。

检查站里，有一些废弃的军车和帐篷。

你该怎么办？`,minDay:26,maxTriggers:1,weight:6,choices:[{id:`search_checkpoint`,text:`搜索检查站，看看有没有军用物资`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`energy`,delta:-15}],result:`你走下车，开始搜索检查站。

检查站里，有几个帐篷和几辆废弃的军车。

你搜了一会儿，在一个帐篷里，找到了一些军用物资。

武器、子弹、防弹衣、头盔、军用食品、军用药品……应有尽有。

你的心脏跳得很快。

这些军用物资，能让你们的战斗力提升好几倍。

就在你准备把物资搬上车的时候，你在另一个帐篷里，发现了一些文件。

是军方的文件。

你翻开看了看。

文件上，记录着迷雾的一些信息。

"迷雾，不是自然灾害。"文件上写着，"是人为的。是某个组织，进行的基因实验。"

"实验的目的，是让人类进化。但是，实验失败了。大部分实验体，变成了怪物。只有少数人，能真正进化。"

"迷雾的源头，在城北灯塔的下面。那里，有一个地下实验室。"

"我们的任务，是封锁灯塔，防止任何人进入。但是，我们的部队，已经损失了大半。我们撑不住了。"

文件的最后，有一行手写的字：

"如果有人看到这份文件，请记住——不要进入灯塔。那里，有你想象不到的恐怖。"

你合上文件，手在发抖。

迷雾是人为的。

是基因实验。

迷雾的源头，在城北灯塔的下面。

那里，有一个地下实验室。

你看着远处的灯塔，心里涌起了一股强烈的不安。

迷雾的真相，就在那里。

但是，那里，也有你想象不到的恐怖。

【理智-8，体力-15】

【获得军用物资：步枪x5，手枪x3，子弹x200，防弹衣x3，头盔x3，军用食品+30，军用药品+15】

【获得重要文件：军方的迷雾调查报告。迷雾是人为的基因实验，源头在城北灯塔地下实验室。】

【获得重要情报：迷雾的源头在城北灯塔下面，那里有一个地下实验室。不要进入，那里有想象不到的恐怖。】

【重要伏笔：灯塔的秘密。地下实验室。基因实验。迷雾的真相。你会进入灯塔吗？】`,next:`__return__`},{id:`take_weapons_leave`,text:`只拿武器和子弹，不看其他东西`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你没有搜索其他东西。

你只拿了一些武器和子弹，然后就离开了。

虽然没有找到其他物资，但是，武器和子弹也很宝贵。

有了这些武器，你们的战斗力提升了不少。

你靠在座位上，看着窗外的风景。

雾还是那么浓。

但是，有了这些武器，你们的安全感增加了不少。

【理智-3】

【获得物资：步枪x3，手枪x2，子弹x100】`,next:`__return__`}]},{id:`phase4_mist_caravan`,text:`你们在雾里行驶的时候，突然看到了前面有灯光。

是车队的灯光。

至少有十几辆车，排成一列，在雾里行驶。

看起来，是一个大型的幸存者车队。

你该怎么办？`,minDay:27,maxTriggers:1,weight:5,choices:[{id:`follow_caravan`,text:`跟在他们后面，看看他们要去哪里`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`followed_caravan`}],result:`你看着小杨，说："跟在他们后面，看看他们要去哪里。"

小杨点了点头，放慢了车速，跟在了车队的后面。

车队的速度不快，大约每小时三十公里。

你们跟在后面，保持着一定的距离。

大约跟了一个小时，车队来到了一个小镇。

小镇的入口，有一个大门，门口有几个持枪的守卫。

车队停了下来，守卫检查了一下，然后放行了。

你看着那个小镇，心里涌起了一股惊讶。

那里，看起来是一个大型的幸存者据点。

至少有几百人。

"我们要进去吗？"小杨问。

你看着那个小镇，心里在盘算。

一个大型的幸存者据点。

那里，可能有物资，有情报，有盟友。

但是，也可能有危险。

【理智-5】

【发现大型幸存者据点：雾中镇。至少几百人，有围墙和守卫。】

【重要伏笔：雾中镇。这是什么人的据点？他们是友好的还是敌对的？】`,next:`__return__`},{id:`overtake_caravan`,text:`超过他们，继续赶路`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你看着小杨，说："超过他们，继续赶路。"

小杨点了点头，踩下油门，从车队的旁边超了过去。

超过车队的时候，你看了一眼旁边的车辆。

车里的人，也在看你。

他们的眼神，很复杂。

有警惕，有好奇，也有……某种你看不懂的情绪。

你没有停车，继续赶路。

走了一段距离，你回头看了一眼。

车队还在后面，继续在雾里行驶。

你打了个寒颤，加快了车速。

在这个鬼地方，什么人都有。

【理智-3】`,next:`__return__`},{id:`wave_at_caravan`,text:`跟他们打招呼，看看能不能交流`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`waved_at_caravan`}],result:`你摇下车窗，朝旁边的车辆挥了挥手。

旁边车辆的司机，看到了你，也挥了挥手。

然后，他按了一下喇叭。

车队的速度，慢了下来。

最后，车队停了下来。

第一辆车的门开了，走下来一个人。

是一个中年男人，穿着一件军大衣，看起来很有气质。

他走到你的车旁边，敲了敲车窗。

"你好。"他说，声音很沉稳，"你们是从哪里来的？"

"城南。"你说，"我们要去城北。"

中年男人点了点头。

"城北？"他说，"去灯塔？"

你看着他，心里涌起了一股惊讶。

他知道灯塔。

"你是谁？"你问，"你们是什么人？"

中年男人笑了笑。

"我叫赵建国。"他说，"我们是雾中镇的人。我们的镇子，就在前面。你们要不要进去歇歇脚？"

你看着他，心里在盘算。

雾中镇。

赵建国。

一个大型的幸存者据点。

他们是友好的吗？

【理智-5】

【建立联系：赵建国，雾中镇的首领。邀请你们进入雾中镇休整。】

【发现大型幸存者据点：雾中镇。至少几百人，有围墙和守卫。】

【重要伏笔：雾中镇。赵建国。他们是什么人？他们知道灯塔的秘密吗？】`,next:`__return__`}]},{id:`phase4_vehicle_breakdown`,text:`车辆突然发出了一声奇怪的响声，然后，熄火了。

小杨尝试重新发动，但是，发动机只是发出了几声干咳，然后就没有反应了。

"坏了。"小杨说，皱着眉头，"发动机出问题了。"

你看着他，问："能修吗？"

"能修。"小杨说，"但是需要时间，而且需要零件。"

你看了看周围。

雾很浓，周围什么都看不见。

在这里修车，很危险。

你该怎么办？`,minDay:25,maxTriggers:1,weight:7,choices:[{id:`repair_on_spot`,text:`就在这里修，小杨修车，其他人警戒`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`energy`,delta:-20},{kind:`item`,item:`metal`,amount:-3}],result:`"就在这里修。"你说，"小杨修车，其他人警戒。"

小杨点了点头，打开车头盖，开始检查发动机。

老周拿着猎枪，警惕地看着周围。

陈静和朵朵，待在车里，不敢出声。

你也拿起武器，在周围巡逻。

雾很浓，能见度不到五十米。

你能听到，雾里有什么东西在移动。

但是，你看不到。

你的心脏跳得很快。

大约过了一个小时，小杨终于修好了。

"好了。"他说，擦了擦手上的油，"发动机修好了。但是，只是临时修复，跑不远。我们需要找个地方，彻底检修一下。"

你点了点头，松了一口气。

"上车。"你说，"我们走。"

你们上了车，小杨发动了发动机。

发动机发出了一声低沉的轰鸣，然后，车开动了。

你靠在座位上，松了一口气。

虽然很危险，但是，你们修好了车，继续前进。

【理智-8，体力-20】

【使用金属-3。】

【车辆临时修复，可以继续行驶，但是需要彻底检修。】`,next:`__return__`},{id:`abandon_vehicle_walk`,text:`放弃车辆，步行前进`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`resource`,resource:`energy`,delta:-30}],result:`"修不好了。"你说，"我们放弃车辆，步行前进。"

大家看着你，都愣住了。

"放弃车辆？"老周说，"那我们的物资怎么办？"

"能带的都带上。"你说，"带不走的，就放弃。"

大家看着你，看了很久，然后都点了点头。

你们开始收拾物资，把能带上的，都背上了。

然后，你们锁上车，步行前进。

没有了车，你们的速度慢了很多。

而且，背着沉重的物资，你们的体力消耗也很大。

但是，至少，你们还在前进。

你们走了很久，才走了十几公里。

天快黑了，你们找了一个废弃的房子，准备在那里过夜。

你靠在墙上，大口喘着气。

你的腿很酸，背很痛。

但是，你知道，你们必须继续前进。

因为，只有走出去，你们才能找到希望。

【理智-10，体力-30】

【放弃车辆，步行前进。】

【失去大部分物资。】

【获得状态：步行者。没有车辆，移动速度大幅降低，但是更灵活。】

【伏笔：被遗弃的车辆。你们还会回来找它吗？它还在那里吗？】`,next:`__return__`},{id:`tow_with_other_car`,text:`用另一辆车拖着坏车走，找个安全的地方再修`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`energy`,delta:-15}],result:`"用另一辆车拖着走。"你说，"找个安全的地方再修。"

小杨点了点头，从车上拿出绳子，把两辆车连在了一起。

皮卡在前面拖，面包车在后面被拖。

车速很慢，但是，至少，你们不用放弃车辆。

你们开了大约半个小时，找到了一个废弃的加油站。

加油站看起来很安全，没有什么动静。

你们把车停在加油站里，然后，小杨开始修车。

老周拿着猎枪，在周围警戒。

你也帮忙，给小杨递工具。

大约修了两个小时，小杨终于修好了。

"好了。"他说，擦了擦手上的油，"彻底修好了。这次，能跑很远了。"

你点了点头，松了一口气。

虽然花了一些时间，但是，你们修好了车，而且，找到了一个安全的地方休息。

【理智-5，体力-15】

【车辆彻底修复，可以正常行驶。】

【在废弃加油站休息一晚，恢复体力。】`,next:`__return__`}]},{id:`phase4_mist_song_again`,text:`你们在雾里行驶的时候，突然听到了一个声音。

是歌声。

一个女人的歌声，悠扬，婉转，带着一种说不出的悲伤。

歌声从雾的深处传来，像是在召唤你们。

"停车。"你说。

小杨踩下刹车，车停了下来。

你们静静地听着那个歌声。

歌声很动听，但是，也很诡异。

你记得这个歌声。

之前，你在雾里听到过。

那个没有眼睛的女人。

她又来了。

你该怎么办？`,minDay:26,maxTriggers:1,weight:5,choices:[{id:`drive_away_song`,text:`开车离开，不要听那个歌声`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`"开车走。"你说，"不要听那个歌声。"

小杨点了点头，踩下油门，车开动了。

你们开得很快，很用力，想要远离那个歌声。

但是，那个歌声，像是有魔力一样，一直在你们的耳边回响。

不知道开了多久，那个歌声，终于慢慢消失了。

你靠在座位上，大口喘着气。

你的衣服，已经被冷汗湿透了。

"那是什么？"小杨问，声音在发抖。

"不知道。"你说，"但是，在这个鬼地方，有些东西，不要碰。"

老周点了点头。

"你说得对。"他说，"那个歌声，不对劲。"

你看着窗外的雾，心里涌起了一股不安。

那个没有眼睛的女人。

她还会再出现吗？

【理智-5】

【伏笔：迷雾中的歌姬。她又来了。她是什么？她为什么要跟着你们？】`,next:`__return__`},{id:`investigate_song`,text:`停车，去看看那个歌声的来源`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`resource`,resource:`health`,delta:-10}],result:`"停车。"你说，"我去看看。"

小杨踩下刹车，车停了下来。

你推开车门，走了下去。

老周也跟着走了下去，手里拿着猎枪。

你们循着歌声，走了过去。

雾越来越浓，歌声越来越清晰。

不知道走了多久，你们来到了一片空地。

空地的中央，有一个女人。

她穿着一件白色的长裙，长发披肩，背对着你们，正在唱歌。

就是她。

那个没有眼睛的女人。

"别过去。"老周说，声音在发抖，"那东西，不对劲。"

但是，你像是被什么东西控制了一样，不由自主地朝她走了过去。

"别过去！"老周喊。

但是，你停不下来。

你走到了她的面前。

她停止了唱歌，慢慢地转过身来。

你看到了她的脸。

那是一张很漂亮的脸，但是，没有眼睛。

她的眼睛的位置，是两个黑洞，正在往外流着黑色的液体。

"你来了。"她说，声音和歌声一样动听，"我等你很久了。"

她伸出手，朝你的脸摸了过来。

就在这时，老周开了一枪。

"砰！"

子弹打在了她的身上。

她发出了一声凄厉的尖叫，然后，身体开始融化，变成了一滩黑色的液体。

你猛地回过神来，发现自己站在一滩黑色液体的前面。

"你没事吧？"老周跑过来，扶住你。

你看着那滩黑色液体，手在发抖。

"我……我没事。"你说，声音在发抖。

你们转身，快速地回到了车上。

"开车。"你说，"快开车。"

小杨踩下油门，车开动了。

你靠在座位上，大口喘着气。

你的心脏跳得很快，像是要从嗓子眼里跳出来。

你这辈子都不会忘记那张脸。

没有眼睛的，流着黑色液体的，漂亮的脸。

【理智-15，健康-10】

【老周好感度+20】

【获得重要情报：迷雾中的歌姬，没有眼睛，流黑色液体，能用歌声控制人。被枪击后会融化成黑色液体。】

【获得称号：歌姬的幸存者。意志力+5，理智上限+10，精神攻击抗性+50%。】

【重要伏笔：迷雾中的歌姬。她是什么？她为什么要等你？她还会再出现吗？】`,next:`__return__`}]},{id:`phase4_road_trading_post`,text:`你们在路边发现了一个交易站。

是一个用帐篷和木板搭成的小市场，有几个摊位。

摊位后面，坐着几个商人，在卖各种东西。

食物、水、药品、武器、弹药、零件、汽油……应有尽有。

看起来，这是一个幸存者的交易市场。

你该怎么办？`,minDay:27,maxTriggers:1,weight:6,choices:[{id:`trade_at_post`,text:`停下来，交易一些需要的物资`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`你让小杨停了车，然后走了下去。

交易站里，有几个商人，在卖各种东西。

你逛了一圈，发现这里的东西，价格都很贵。

但是，有些东西，是你们急需的。

你跟一个商人讨价还价了一会儿，最终，用一些金属和零件，换了一些汽油和药品。

虽然亏了，但是，至少，你们补充了急需的物资。

交易完成后，你跟商人聊了聊。

"这里经常有人来吗？"你问。

"经常。"商人说，"从城南到城北的路上，很多幸存者车队都会在这里歇脚、交易。"

"城北那边，怎么样？"你问。

商人的脸色变了。

"城北？"他说，"你要去城北？我劝你，不要去。"

"为什么？"你问。

"灯塔。"商人说，声音压得很低，"城北灯塔，那里有东西。去过的人，都没有回来。"

你看着他，心里涌起了一股不安。

又是灯塔。

那里，到底有什么？

【理智-3】

【交易：用金属-10，零件-5，换得汽油+30，药品+10。】

【获得重要情报：路边交易站是城南到城北路上的重要补给点。城北灯塔很危险，去过的人都没有回来。】

【建立关系：路边交易站的商人。以后可以在这里交易。】`,next:`__return__`},{id:`just_rest`,text:`只休息一下，不交易`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`resource`,resource:`energy`,delta:10}],result:`你让小杨停了车，但是，你没有下去交易。

你们只是在车里，休息了一下。

喝了点水，吃了点东西，活动了一下身体。

大约休息了半个小时，你们继续前进。

虽然没有交易，但是，休息了一下，你们的精神好多了。

【理智+2，体力+10】`,next:`__return__`}]},{id:`phase4_arrive_north_city`,text:`经过几天的行驶，你们终于到达了城北。

城北的雾，比城南更浓。

而且，你能感觉到，这里的雾，有一种说不出的压迫感。

像是有什么东西，在注视着你们。

远处，灯塔的光，还在亮着。

在浓雾里，那一点光，显得格外刺眼。

"我们到了。"小杨说，声音有点紧张。

你看着远处的灯塔，心里也很紧张。

迷雾的真相，就在那里。

但是，那里，也有你想象不到的恐怖。

你该怎么办？`,minDay:29,maxTriggers:1,weight:5,choices:[{id:`find_safe_place_first`,text:`先找个安全的地方住下来，再做打算`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`find_safe_place_north`}],result:`"先找个安全的地方住下来。"你说，"我们刚到，不了解情况，不能贸然行动。"

大家都点了点头。

你们在城北找了很久，终于找到了一个废弃的警察局。

警察局很结实，有围墙，有铁门，看起来很安全。

你们把车开进警察局的院子里，然后，开始清理。

警察局里，有一些废弃的办公设备，还有一些拘留室。

你们把拘留室清理干净，作为休息的地方。

老周在周围布置了警戒。

小杨检查了车辆，确保车辆没有问题。

陈静整理了医疗物资。

朵朵帮着打扫卫生。

你站在警察局的屋顶上，看着远处的灯塔。

灯塔的光，还在亮着。

在浓雾里，那一点光，显得格外神秘。

你知道，你们迟早要去那里。

但是，不是现在。

现在，你们需要休息，需要准备，需要了解城北的情况。

【理智-3】

【在城北建立临时据点：废弃警察局。有围墙，有铁门，很安全。】

【获得状态：城北据点。可以在城北休整、交易、获取情报。】

【重要伏笔：灯塔的秘密。迷雾的真相，就在那里。你们准备好了吗？】`,next:`__return__`},{id:`go_lighthouse_immediately`,text:`直接去灯塔，寻找迷雾的真相`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`go_lighthouse_immediately`}],result:`"直接去灯塔。"你说，"我们来这里，就是为了寻找迷雾的真相。"

大家看着你，都愣住了。

"直接去？"老周说，"我们刚到，不了解情况，太冒险了。"

"我知道。"你说，"但是，我们已经准备好了。武器、弹药、药品，都充足。而且，我们人多。"

你看着他们，认真地说："迷雾的真相，就在那里。我们迟早要去。晚去，不如早去。"

大家看着你，看了很久，然后都点了点头。

"好。"老周说，"我跟你一起去。"

"我也去。"小杨说。

"我也去。"陈静说。

朵朵看着你们，紧紧抱着她的毛绒兔子。

"我也去。"她说，声音很小，但是很坚定。

你看着他们，心里涌起了一股感动。

"好。"你说，"我们一起去。"

你们上了车，小杨发动了发动机。

两辆车，驶向灯塔。

你的心脏跳得很快。

因为你知道，你们即将面对的，可能是迷雾的真相。

也可能，是死亡。

【理智-15】

【前往城北灯塔。寻找迷雾的真相。】

【重要事件：灯塔探索。迷雾的真相，就在那里。】

【重要伏笔：灯塔的秘密。地下实验室。基因实验。你们会成为第一个活着回来的人吗？】`,next:`__return__`},{id:`go_safe_zone_first`,text:`先去希望号安全区，休整一下，获取情报`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`go_safe_zone_north`}],result:`"先去希望号安全区。"你说，"我们需要休整一下，也需要获取更多关于灯塔的情报。"

大家都点了点头。

你们开车，驶向希望号安全区。

希望号安全区，在城北的山顶上。

你们沿着山路，开了大约半个小时，终于到达了安全区。

安全区的大门，是用铁栅栏做的，门口有几个持枪的守卫。

你们停下车，守卫走了过来，检查了一下。

"你们是幸存者？"守卫问。

"对。"你说，"我们从城南来，想在安全区休整一下。"

守卫点了点头，然后，打开了大门。

你们开车，进入了安全区。

安全区里，有很多人。

他们有的在干活，有的在聊天，有的在照顾孩子。

看起来，这里真的是一个安全的地方。

你看着这一切，心里涌起了一股温暖。

在这个鬼地方，居然还有这样的地方。

【理智+3】

【到达希望号安全区。城北山顶，500幸存者。】

【获得状态：安全区休整。可以在安全区交易、休息、获取情报。】

【重要伏笔：灯塔的秘密。安全区的人，知道更多关于灯塔的事情。他们会告诉你吗？】`,next:`__return__`}]}],wl={settlement_choose_location:{id:`settlement_choose_location`,text:`到达城北后，你们需要找一个地方，建立自己的据点。

老周勘察了周围的地形，提出了几个候选地点：

1. 城北警察局 — 有围墙，有铁门，很坚固。但是面积不大，最多能住二十人。
2. 城北小学 — 面积大，有操场，有教室。但是围墙不高，容易被攻破。
3. 城北超市 — 有大量物资，有地下室。但是位置太显眼，容易被强盗盯上。
4. 希望号安全区附近 — 可以借助安全区的保护。但是需要服从安全区的管理。

你看着这几个地点，心里在盘算。

建立据点，是你们在这个鬼地方立足的第一步。

选对了，你们就能安全地发展壮大。

选错了，你们可能会面临灭顶之灾。

你该选哪个？`,choices:[{id:`choose_police_station`,text:`选择城北警察局，安全第一`,hint:`最安全的选择。但是发展空间有限。`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`settlement_police_station`}],next:`settlement_establish`,result:`你看着大家，认真地说："选城北警察局。安全第一。"

老周点了点头。

"好。"他说，"警察局有围墙，有铁门，易守难攻。虽然面积不大，但是我们人也不多，够用了。"

你们来到了城北警察局。

警察局看起来很结实，围墙有三米高，铁门是钢制的。院子里有几辆废弃的警车，还有一个车库。

你们走进去，开始清理。

警察局里，有一些废弃的办公设备，还有几个拘留室。

你们把拘留室清理干净，作为休息的地方。

老周在围墙上布置了警戒。

小杨检查了车库里的警车，发现有一辆还能修。

陈静整理了医疗室。

朵朵帮着打扫卫生。

你站在警察局的屋顶上，看着周围的风景。

雾还是那么浓。

但是，你心里涌起了一股踏实的感觉。

你们终于有了一个家。

一个真正的家。

【理智+3】

【建立据点：城北警察局。有围墙，有铁门，易守难攻。可容纳20人。】

【获得状态：定居者。拥有自己的据点，可以进行基地建设。】

【获得建筑：拘留室（住所）、车库、医疗室、警戒塔。】`},{id:`choose_school`,text:`选择城北小学，发展空间大`,hint:`发展空间最大的选择。但是防御较弱。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`settlement_school`}],next:`settlement_establish`,result:`你看着大家，认真地说："选城北小学。发展空间大。"

老周皱了皱眉头。

"小学的围墙不高。"他说，"容易被攻破。"

"但是面积大。"你说，"有操场，有教室，能住很多人。而且，我们可以加固围墙。"

老周想了想，然后点了点头。

"行。"他说，"你是头儿，你说了算。但是，我们必须尽快加固围墙。"

你们来到了城北小学。

小学很大，有教学楼，有操场，有食堂，有宿舍。

围墙只有两米高，而且有些地方已经破损了。

你们走进去，开始清理。

教学楼里，有很多教室，还有办公室。

你们把教室清理干净，作为休息的地方。

老周开始加固围墙。

小杨检查了食堂的厨房设备。

陈静整理了医务室。

朵朵帮着打扫卫生，还在黑板上画了一幅画。

你站在教学楼的屋顶上，看着周围的风景。

雾还是那么浓。

但是，你心里涌起了一股期待的感觉。

这个地方，很大，很有发展空间。

也许，有一天，这里会成为一个大型的幸存者据点。

【理智-3】

【建立据点：城北小学。面积大，可容纳100人。但是围墙不高，需要加固。】

【获得状态：定居者。拥有自己的据点，可以进行基地建设。】

【获得建筑：教室（住所）、食堂、操场、医务室、仓库。】`},{id:`choose_supermarket`,text:`选择城北超市，物资丰富`,hint:`物资最丰富的选择。但是位置太显眼。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`settlement_supermarket`}],next:`settlement_establish`,result:`你看着大家，认真地说："选城北超市。物资丰富。"

老周皱了皱眉头。

"超市的位置太显眼了。"他说，"容易被强盗盯上。"

"但是物资多。"你说，"有食物，有水，有日用品。而且有地下室，可以作为避难所。"

老周想了想，然后点了点头。

"行。"他说，"但是，我们必须做好防御准备。强盗肯定会来的。"

你们来到了城北超市。

超市很大，有两层，还有一个地下室。

货架上，还有很多物资。食物、水、日用品、药品……应有尽有。

你们走进去，开始清理。

你们把二楼的办公室清理干净，作为休息的地方。

老周在超市的入口布置了防御工事。

小杨检查了超市的发电设备。

陈静整理了医药区。

朵朵帮着整理物资，还发现了一个玩具区。

你站在超市的屋顶上，看着周围的风景。

雾还是那么浓。

但是，你心里涌起了一股满足的感觉。

这里有这么多物资，你们至少不用担心饿肚子了。

【理智-5】

【建立据点：城北超市。物资丰富，有地下室。但是位置显眼，容易被强盗盯上。】

【获得状态：定居者。拥有自己的据点，可以进行基地建设。】

【获得大量物资：食物+100，水+80，药品+30，日用品+50】

【获得建筑：办公室（住所）、仓库、医药室、地下室（避难所）。】`},{id:`choose_near_safe_zone`,text:`选择希望号安全区附近，借助保护`,hint:`最安全的选择。但是需要服从安全区的管理。`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`settlement_near_safe_zone`}],next:`settlement_establish`,result:`你看着大家，认真地说："选希望号安全区附近。借助他们的保护。"

老周点了点头。

"好。"他说，"安全区附近，肯定安全。而且，我们可以跟他们交易，获取情报。"

你们来到了希望号安全区附近。

安全区在山顶上，你们在山脚下找了一个废弃的度假村。

度假村有几栋别墅，有一个游泳池，还有一个餐厅。

围墙不高，但是，因为离安全区近，一般不会有强盗敢来。

你们走进去，开始清理。

别墅里，有很多房间，还有家具。

你们把房间清理干净，作为休息的地方。

老周在周围布置了警戒。

小杨检查了度假村的发电设备。

陈静整理了医疗室。

朵朵帮着打扫卫生，还在花园里发现了一些花。

你站在别墅的屋顶上，看着山顶上的安全区。

安全区的灯光，在雾里若隐若现。

你心里涌起了一股安全感。

在这里，你们至少不用担心被强盗袭击了。

【理智+5】

【建立据点：山脚下度假村。离希望号安全区近，安全。有几栋别墅，可容纳30人。】

【获得状态：定居者。拥有自己的据点，可以进行基地建设。】

【建立关系：希望号安全区。可以定期交易，获取情报。】

【获得建筑：别墅（住所）、餐厅、游泳池、花园、车库。】`}]},settlement_establish:{id:`settlement_establish`,text:`经过几天的努力，你们的据点，终于建立完成了。

你们给它起了一个名字——新希望据点。

老周站在据点的门口，看着你们的劳动成果，脸上露出了满意的笑容。

"不错。"他说，"有个家的样子了。"

小杨也很兴奋。

"车库里的那辆警车，我修好了。"他说，"以后，我们就有三辆车了。"

陈静整理了医疗室，里面有了基本的医疗设备和药品。

朵朵在据点里跑来跑去，看起来很开心。

你看着这一切，心里涌起了一股温暖的感觉。

在这个鬼地方，你们终于有了一个真正的家。

但是，你也知道，这只是开始。

你们需要发展，需要壮大，需要更多的人，更多的物资，更强的防御。

而且，你们还需要揭开迷雾的真相。

城北灯塔。

那里，有你们想要的答案。

你该先做什么？`,choices:[{id:`strengthen_defense`,text:`先加强防御，确保据点安全`,hint:`安全第一。加强围墙，布置陷阱，增加警戒。`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`strengthened_defense`}],next:`start`,result:`你看着大家，认真地说："先加强防御。确保据点安全。"

老周点了点头。

"好。"他说，"我来布置。"

接下来的几天，你们忙碌了起来。

老周加固了围墙，在围墙上加装了铁丝网。

他还在据点的入口处，布置了陷阱——尖刺坑、绊索、警报器。

小杨修好了据点的发电设备，让据点有了电力。

他还在围墙上安装了探照灯，晚上可以照亮周围。

陈静在医疗室里，准备了大量的药品和绷带。

你也帮忙，搬运物资，修建防御工事。

朵朵也没有闲着，她帮着做饭，打扫卫生。

几天后，据点的防御，大大加强了。

围墙更高了，更坚固了。

陷阱更多了，更隐蔽了。

探照灯亮了，警报器响了。

现在，就算有强盗来袭击，你们也有信心守住。

你站在据点的屋顶上，看着周围的防御工事，心里涌起了一股安全感。

【理智+3，体力-20】

【据点防御等级提升：从1级提升到3级。】

【获得建筑：加固围墙、陷阱区、探照灯、警报器。】

【获得状态：坚固的据点。遭遇袭击时，防御成功率+50%。】

【老周好感度+15】`},{id:`recruit_survivors`,text:`先招募更多的幸存者，壮大力量`,hint:`人多力量大。但是人多了，消耗也大了。`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`recruited_survivors`}],next:`start`,result:`你看着大家，认真地说："先招募更多的幸存者。壮大力量。"

老周点了点头。

"好。"他说，"人多力量大。但是，人多了，消耗也大了。我们需要确保有足够的食物和水。"

"我知道。"你说，"但是，没有人，我们什么都做不了。"

接下来的几天，你们开始在周围搜索，寻找幸存者。

你们在附近的废墟里，找到了几个幸存者。

一个是中年男人，叫李刚，以前是建筑工人，会盖房子。

一个是年轻女人，叫王芳，就是你们在路上遇到的那个大学生，她后来也到了城北。

一个是老人，叫张大爷，以前是农民，会种地。

还有一对夫妻，带着一个孩子。

你们把他们都带回了据点。

现在，据点里，有十个人了。

人多了，热闹了，但是，消耗也大了。

食物和水的消耗，比以前快了很多。

但是，你们也有了更多的劳动力。

李刚会盖房子，可以帮你们修建更多的建筑。

张大爷会种地，可以帮你们开辟菜园。

王芳是大学生，懂电脑，懂通讯，可以帮你们修理电子设备。

那对夫妻，可以帮着做饭，打扫卫生，照顾孩子。

你看着据点里忙碌的人们，心里涌起了一股期待的感觉。

也许，有一天，这里会成为一个大型的幸存者社区。

【理智-3】

【招募幸存者：李刚（建筑工）、王芳（大学生）、张大爷（农民）、刘氏夫妻+孩子。】

【据点人口：从6人增加到11人。】

【获得能力：建筑（李刚）、农业（张大爷）、电子/通讯（王芳）。】

【食物和水消耗增加50%。】

【获得状态：小型社区。拥有10人以上的据点，可以进行更复杂的基地建设。】`},{id:`explore_lighthouse`,text:`先探索灯塔，揭开迷雾的真相`,hint:`最冒险的选择。灯塔很危险，去过的人都没有回来。`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`explored_lighthouse_phase5`}],next:`lighthouse_first_attempt`,result:`你看着大家，认真地说："先探索灯塔。揭开迷雾的真相。"

老周皱了皱眉头。

"灯塔太危险了。"他说，"去过的人，都没有回来。"

"我知道。"你说，"但是，迷雾的真相，就在那里。我们必须知道，我们面对的是什么。"

老周看着你，看了很久，然后叹了口气。

"行。"他说，"我跟你一起去。"

"我也去。"小杨说。

"我也去。"陈静说。

你看着他们，心里涌起了一股感动。

"好。"你说，"我们一起去。"

你们带上了武器、弹药、药品、手电筒，然后出发了。

灯塔，在城北的海边。

你们开车，大约半个小时，就到达了灯塔。

灯塔很古老，墙壁上长满了青苔。

顶端的光，还在亮着。

在浓雾里，那一点光，显得格外神秘。

你们下了车，小心翼翼地朝灯塔走去。

灯塔的门，是铁门，虚掩着。

你推开门，走了进去。

灯塔里，很暗，很潮湿。

墙壁上，有很多奇怪的符号。

你看不懂那些符号，但是，你能感觉到，那些符号，有一种说不出的诡异。

你们沿着楼梯，一步一步地往上走。

楼梯很窄，很陡，每走一步，都会发出吱呀的声音。

不知道走了多久，你们终于到达了灯塔的顶端。

顶端，有一个房间。

房间里，有一个巨大的灯。

那盏灯，正在发出微弱的蓝光。

那不是普通的光。

那光，像是活的一样，在缓缓地流动。

你看着那盏灯，心里涌起了一股强烈的不安。

这盏灯，是什么？

它为什么能在雾里发光？

它和迷雾，有什么关系？

【理智-10】

【第一次进入灯塔。到达灯塔顶端，发现了发光的灯。】

【重要伏笔：灯塔的灯。发出蓝光，像是活的一样。它是什么？它和迷雾有什么关系？】`}]},lighthouse_first_attempt:{id:`lighthouse_first_attempt`,text:`你们站在灯塔的顶端，看着那盏发出蓝光的灯。

那光，很柔和，但是，也很诡异。

它像是活的一样，在缓缓地流动，在缓缓地呼吸。

你伸出手，想触摸那盏灯。

"别碰！"老周喊，一把拉住了你。

你回过头，看着老周。

老周的脸色很苍白，眼睛里充满了恐惧。

"那东西，不对劲。"他说，声音在发抖。

你看着那盏灯，心里也涌起了一股恐惧。

但是，你也很好奇。

这盏灯，到底是什么？

就在这时，你听到了什么声音。

是脚步声。

从灯塔的下面传来。

很轻，很缓慢，一步一步地，朝上走来。

你们屏住呼吸，警惕地看着楼梯口。

脚步声，越来越近。

然后，一个人影，从楼梯口走了出来。

是一个人。

不，不是一个人。

那东西，看起来像是人，但是，它的皮肤是透明的，能看到里面的器官。

它的眼睛，是纯白色的，没有瞳孔。

它看到了你们，然后，笑了。

它的嘴，咧到了耳朵根，露出了一口尖锐的牙齿。

"欢迎。"它说，声音很轻柔，像是一个女人的声音，"欢迎来到灯塔。"

你们吓得后退了一步。

老周举起猎枪，对着那个东西。

"你是什么东西？"他喊，声音在发抖。

那个东西，笑了笑。

"我？"它说，"我是灯塔的守护者。"

它指了指那盏发光的灯。

"我守护着这盏灯。"它说，"已经……很久很久了。"

你看着它，心里涌起了一股强烈的不安。

灯塔的守护者。

透明的皮肤。纯白色的眼睛。

这是什么东西？

你该怎么办？`,choices:[{id:`talk_to_guardian`,text:`跟它聊聊，问问它灯塔和迷雾的真相`,hint:`冒险的选择。它可能会告诉你真相，也可能会攻击你们。`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`talked_to_guardian`}],next:`start`,result:`你看着那个东西，深吸一口气，然后说："我们没有恶意。我们只是想知道，灯塔和迷雾的真相。"

那个东西，看着你，看了很久。

然后，它笑了笑。

"你很勇敢。"它说，"很久没有人，敢跟我说话了。"

它指了指旁边的台阶。

"坐吧。"它说，"我告诉你们，真相。"

你们犹豫了一下，然后，坐了下来。

那个东西，也坐了下来。

"你们想知道什么？"它问。

"迷雾。"你说，"迷雾是什么？它是怎么来的？"

那个东西，沉默了一会儿，然后说："迷雾，不是自然现象。它是人为的。"

"是谁？"你问。

"一个组织。"它说，"他们叫自己——进化者。"

"进化者？"你问。

"对。"它说，"他们相信，人类需要进化。他们用迷雾，作为催化剂，来加速人类的进化。"

"但是，进化失败了？"你问。

那个东西，点了点头。

"对。"它说，"大部分人，无法承受进化的力量，变成了怪物。只有少数人，能真正进化。"

"那你呢？"你问，"你是进化者吗？"

那个东西，笑了笑。

"我？"它说，"我是第一个成功的进化者。"

它指了指自己透明的皮肤。

"这就是进化的代价。"它说，"我获得了力量，获得了永生，但是，我失去了人类的外表。"

你看着它，心里涌起了一股复杂的感觉。

第一个成功的进化者。

永生。

但是，失去了人类的外表。

"那这盏灯呢？"你问，"它是什么？"

那个东西，指了指那盏发光的灯。

"这盏灯，是迷雾的核心。"它说，"迷雾，就是从这盏灯里散发出来的。"

"只要关掉这盏灯，迷雾就会消失？"你问。

那个东西，点了点头，然后，又摇了摇头。

"理论上，是的。"它说，"但是，关掉这盏灯，会有很严重的后果。"

"什么后果？"你问。

那个东西，看着你，认真地说："关掉这盏灯，所有被迷雾感染的生物，都会死亡。包括那些，还有人类意识的感染者。"

你愣住了。

所有被感染的生物，都会死亡。

包括那些，还有人类意识的感染者。

这意味着，如果你关掉这盏灯，你可能会杀死很多，还没有完全变成怪物的人。

包括，朵朵的父亲。

你看着那盏灯，心里涌起了一股强烈的不安。

迷雾的真相，你知道了。

但是，你也知道了，关掉迷雾，需要付出的代价。

【理智-15】

【获得重要情报：迷雾是进化者组织的基因实验，第一个成功的进化者是灯塔守护者，迷雾的核心是灯塔的灯，关掉灯会杀死所有被感染的生物。】

【重要伏笔：进化者组织。他们是谁？他们在哪里？他们还有什么计划？】

【重要抉择：是否关掉灯塔的灯？关掉，迷雾消失，但是所有被感染者都会死亡。不关，迷雾继续，但是感染者还有希望。】`},{id:`attack_guardian`,text:`攻击它，老周开枪`,hint:`危险的选择。它可能很强，你们可能打不过。`,effects:[{kind:`resource`,resource:`health`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-20},{kind:`flag`,flag:`attacked_guardian`}],next:`start`,result:`"开枪！"你喊。

老周举起猎枪，对着那个东西，开了一枪。

"砰！"

子弹打在了那个东西的身上。

但是，子弹，像是打在了水里一样，直接穿了过去。

那个东西，毫发无伤。

它看着你们，笑了笑。

"愚蠢。"它说，声音变得很冷，"你们以为，普通的武器，能伤害到我吗？"

它伸出手，朝你们一挥。

一股强大的力量，朝你们涌了过来。

你们像是被一辆卡车撞到了一样，飞了出去，重重地摔在了地上。

你的胸口，痛得像是要裂开一样。

老周的猎枪，也飞了出去，掉在了地上。

那个东西，慢慢地朝你们走了过来。

"我给过你们机会。"它说，声音很冷，"但是，你们不珍惜。"

它蹲下来，看着你。

"现在，你们要付出代价了。"它说。

你看着它，心里涌起了一股绝望。

你知道，你们打不过它。

就在这时，你听到了什么声音。

是警报声。

从灯塔的下面传来。

那个东西，听到了警报声，脸色变了。

"不好。"它说，"有人来了。"

它站起来，看了你们一眼。

"这次，饶了你们。"它说，"下次，不要再让我看到你们。"

然后，它的身体，开始变得透明，最终，消失在了空气里。

你们躺在地上，大口喘着气。

你的胸口，痛得厉害。

但是，你们还活着。

老周爬过来，扶起了你。

"我们走。"他说，声音在发抖，"这里太危险了。"

你们捡起武器，一瘸一拐地，离开了灯塔。

回到据点后，陈静帮你们处理了伤口。

你的胸口，断了两根肋骨。

老周的手臂，也受了伤。

但是，你们还活着。

而且，你们知道了，灯塔的守护者，很强。

普通的武器，根本伤害不了它。

【健康-30，理智-20】

【灯塔守护者：很强，普通武器无法伤害，能使用超自然力量。】

【重要伏笔：灯塔的警报。是谁来了？守护者为什么那么害怕？】

【获得状态：灯塔的敌人。守护者记住了你们，下次再去，它不会留情。】`},{id:`retreat_lighthouse`,text:`撤退，这里太危险了，以后再来`,hint:`安全的选择。但是，你们会错过了解真相的机会。`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`retreated_lighthouse`}],next:`start`,result:`"我们走。"你说，"这里太危险了。"

老周点了点头。

"好。"他说，"我们以后再来。"

你们小心翼翼地，退到了楼梯口。

那个东西，看着你们，没有阻止。

"你们很聪明。"它说，"知道什么时候该退。"

你们没有说话，快速地，沿着楼梯，朝下走去。

不知道走了多久，你们终于走出了灯塔。

外面的雾，还是那么浓。

你们靠在灯塔的墙上，大口喘着气。

你的心脏，跳得很快。

刚才，太危险了。

如果那个东西，想攻击你们，你们根本跑不掉。

"我们以后再来。"老周说，"等我们准备好了，再来。"

你点了点头。

你知道，你们迟早还要回来。

因为，迷雾的真相，就在这里。

但是，不是现在。

现在，你们太弱了。

你们需要变得更强，需要更多的人，需要更好的武器。

然后，你们再回来。

揭开迷雾的真相。

【理智-8】

【从灯塔撤退。没有获得更多情报。】

【获得状态：灯塔的探索者。你们进入过灯塔，知道灯塔里有守护者。】

【重要伏笔：灯塔的守护者。它是什么？它为什么要守护灯塔？】`}]},diplomacy_visit_safe_zone:{id:`diplomacy_visit_safe_zone`,text:`据点建立后，你们需要跟周围的势力，建立关系。

城北，有三个主要的势力：

1. 希望号安全区 — 在城北山顶，有500多人，首领是一个叫赵明的中年人。他们有武器，有物资，是城北最强大的势力。
2. 雾中镇 — 在城北东边，有300多人，首领是赵建国。他们比较封闭，不太跟外界接触。
3. 军方残余 — 在城北西边，有几十人，首领是李伟上尉。他们有重武器，但是人数不多。

你们的据点，在这三个势力的中间。

你们需要跟他们，建立友好的关系。

否则，你们可能会被他们吞并，或者消灭。

你决定，先去拜访希望号安全区。

因为，他们是最强大的。

跟他们建立好关系，你们的安全，就有了保障。

你带着老周和一些礼物，出发了。

希望号安全区，在城北山顶。

你们开车，大约半个小时，就到达了。

安全区的大门，是用铁栅栏做的，门口有几个持枪的守卫。

你们停下车，守卫走了过来。

"你们是什么人？"守卫问。

"我们是山脚下新希望据点的。"你说，"我们想拜访你们的首领，赵明。"

守卫看了看你们，然后说："在这里等着。"

他转身，走进了安全区。

几分钟后，他回来了，带着一个人。

是林小雨。

"是你们。"林小雨说，脸上露出了笑容，"你们真的在城北建立了据点？"

"对。"你说，"我们想拜访你们的首领。"

林小雨点了点头。

"跟我来。"她说，"我带你们去见赵首领。"

你们跟着林小雨，走进了安全区。

安全区里，很热闹。

有很多人，在干活，在聊天，在照顾孩子。

看起来，这里真的是一个安全的地方。

林小雨带着你们，来到了安全区中央的一栋大楼前。

"赵首领就在里面。"她说，"你们进去吧。"

你看着那栋大楼，深吸了一口气。

然后，走了进去。`,choices:[{id:`meet_zhao_ming`,text:`进去见赵明，建立外交关系`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`met_zhao_ming`}],next:`start`,result:`你走进了大楼。

大楼里，很宽敞，很明亮。

大厅里，有几个人，在忙碌着。

林小雨带着你，来到了二楼的一个办公室前。

"赵首领就在里面。"她说，然后敲了敲门。

"进来。"一个低沉的声音，从里面传来。

林小雨推开门，带着你，走了进去。

办公室里，有一个男人，坐在办公桌后面。

他大约四十多岁，穿着一件军装，身材高大，面容坚毅。

他就是赵明，希望号安全区的首领。

"你就是新希望据点的首领？"赵明问，看着你。

"对。"你说，"我叫……"

你说了你的名字。

赵明点了点头，然后指了指对面的椅子。

"坐吧。"他说，"你们来找我，有什么事？"

你坐了下来，然后说："我们想跟希望号安全区，建立友好的关系。我们可以交易，可以合作，可以互相支援。"

赵明看着你，看了很久。

然后，他笑了笑。

"你们很有诚意。"他说，"但是，我为什么要跟你们合作？你们只有十几个人，而我们，有五百多人。你们能给我们什么？"

你看着他，认真地说："我们有机械师，有医生，有猎人，有建筑工。我们可以帮你们修理车辆，治疗伤员，打猎，建造。而且，我们的据点，在山脚下，可以作为你们的前哨站。如果有危险，我们可以提前预警。"

赵明看着你，眼睛里闪过了一丝赞赏。

"你很会说话。"他说，"而且，你说的，确实有道理。"

他想了想，然后说："好。我同意，跟你们建立友好关系。我们可以交易，可以合作，可以互相支援。"

他站起来，伸出手。

"合作愉快。"他说。

你站起来，握住了他的手。

"合作愉快。"你说。

你心里涌起了一股喜悦。

你们跟希望号安全区，建立了友好关系。

这意味着，你们的安全，有了保障。

而且，你们可以跟他们交易，获取更多的物资和情报。

【理智-5】

【建立外交关系：希望号安全区。首领赵明。可以交易，可以合作，可以互相支援。】

【获得贸易权：可以跟希望号安全区交易，获取武器、弹药、物资、情报。】

【获得支援承诺：如果据点遭遇危险，希望号安全区会派兵支援。】

【赵明好感度+20】

【林小雨好感度+15】`}]}},Tl=[{id:`phase5_safe_zone_trade`,text:`希望号安全区的人，来到了你们的据点。

是林小雨，带着几个士兵，还有一些物资。

"赵首领让我来的。"林小雨说，"他想跟你们做一笔交易。"

她指了指带来的物资。

"我们有武器、弹药、药品、食物。"她说，"我们想要，你们的机械师，帮我们修理车辆。还有，你们的医生，帮我们治疗伤员。"

你看着那些物资，心里在盘算。

这是一个好机会。

跟希望号安全区交易，你们可以获得很多急需的物资。

但是，你们也需要付出劳动力。

你该怎么办？`,minDay:32,maxTriggers:1,weight:7,choices:[{id:`accept_trade`,text:`接受交易，派小杨和陈静去帮忙`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],result:`"好。"你说，"我们接受交易。"

林小雨笑了笑。

"很好。"她说，"那我们什么时候开始？"

"明天。"你说，"我让小杨和陈静，跟你们一起去。"

第二天，小杨和陈静，跟着林小雨，去了希望号安全区。

他们去了三天。

三天后，他们回来了。

小杨帮希望号安全区，修好了五辆汽车，还有两辆卡车。

陈静帮希望号安全区，治疗了二十多个伤员，还做了三台手术。

他们带回来了很多物资。

武器、弹药、药品、食物、水……应有尽有。

而且，他们还带回来了一些情报。

希望号安全区，最近在跟雾中镇，发生了一些摩擦。

两边的人，在边界上，发生了几次冲突。

你看着那些物资，心里涌起了一股喜悦。

这笔交易，很划算。

【理智+3】

【获得物资：步枪x5，手枪x3，子弹x200，药品+20，食物+30，水+25】

【获得情报：希望号安全区与雾中镇发生摩擦，边界冲突。】

【小杨好感度+10】

【陈静好感度+10】

【林小雨好感度+15】`,next:`__return__`},{id:`negotiate_better_terms`,text:`谈判，要求更好的条件`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`"我们可以接受交易。"你说，"但是，我们需要更好的条件。"

林小雨看着你，皱了皱眉头。

"什么条件？"她问。

"第一，"你说，"除了物资，我们还需要情报。希望号安全区，掌握的所有关于迷雾、关于灯塔、关于其他势力的情报。"

"第二，"你说，"我们需要技术支持。希望号安全区，有工程师，有科学家。我们需要他们，帮我们升级据点的防御，帮我们开发新的武器。"

"第三，"你说，"我们需要安全保障。如果我们的据点，遭遇危险，希望号安全区，必须派兵支援。"

林小雨看着你，看了很久。

然后，她笑了笑。

"你很会谈判。"她说，"我需要回去，跟赵首领商量一下。"

"好。"你说，"我等你的消息。"

林小雨带着人，离开了。

三天后，她回来了。

"赵首领同意了。"她说，"你的三个条件，他都同意了。但是，他也有一个条件。"

"什么条件？"你问。

"如果希望号安全区，遭遇危险，"林小雨说，"你们的据点，也必须派兵支援。"

你想了想，然后点了点头。

"好。"你说，"我同意。"

你们达成了协议。

这是一个双赢的协议。

你们获得了物资、情报、技术支持、安全保障。

希望号安全区，获得了你们的劳动力，还有一个前哨站。

【理智-3】

【获得物资：步枪x8，手枪x5，子弹x300，药品+30，食物+50，水+40】

【获得情报：希望号安全区的所有情报（迷雾、灯塔、其他势力）。】

【获得技术支持：希望号安全区派工程师和科学家，帮你们升级防御，开发新武器。】

【建立互助条约：双方遭遇危险时，必须互相支援。】

【林小雨好感度+20】

【赵明好感度+15】`,next:`__return__`},{id:`refuse_trade`,text:`拒绝交易，保持独立`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`"对不起。"你说，"我们不能接受这个交易。"

林小雨看着你，愣住了。

"为什么？"她问，"这对你们，有好处。"

"我们知道。"你说，"但是，我们想保持独立。我们不想，成为希望号安全区的附属。"

林小雨看着你，看了很久。

然后，她叹了口气。

"你很有骨气。"她说，"但是，在这个鬼地方，骨气，不能当饭吃。"

"我知道。"你说，"但是，我们宁愿自己努力，也不想依附别人。"

林小雨摇了摇头。

"好吧。"她说，"如果你们改变主意，随时可以来找我。"

她带着人，离开了。

你看着他们离开的方向，心里涌起了一股复杂的感觉。

你知道，你拒绝了一个好机会。

但是，你也知道，保持独立，对你们来说，很重要。

你们要靠自己，活下去。

【理智-5】

【拒绝了希望号安全区的交易。】

【保持独立。】

【伏笔：希望号安全区的交易邀请。你们以后还会接受吗？】`,next:`__return__`}]},{id:`phase5_mist_town_ambassador`,text:`一个陌生人，来到了你们的据点。

是一个年轻男人，穿着一件灰色的长袍，手里拿着一封信。

"我是雾中镇的使者。"他说，"我们的首领赵建国，让我给你们带一封信。"

他把信，递给了你。

你打开信，看了看。

信上写着：

"新希望据点的首领：

你好。我是雾中镇的首领，赵建国。

听说，你们在城北，建立了新的据点。

我代表雾中镇，向你们，表示欢迎。

但是，我也必须提醒你们。

城北，是我们雾中镇的势力范围。

你们在这里建立据点，需要得到我们的许可。

如果你们愿意，臣服于雾中镇，我们可以保护你们，给你们提供物资和安全。

如果你们不愿意，那么，请你们离开城北。

否则，我们将采取必要的措施。

期待你的回复。

雾中镇首领 赵建国"

你看完信，心里涌起了一股愤怒。

臣服？

离开？

这个赵建国，也太霸道了。

但是，你也知道，雾中镇，有300多人。

而你们，只有十几个人。

如果真的打起来，你们肯定打不过。

你该怎么办？`,minDay:34,maxTriggers:1,weight:6,choices:[{id:`reject_demand`,text:`拒绝，我们不会臣服，也不会离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`rejected_mist_town`}],result:`"你回去告诉赵建国。"你说，声音很冷，"我们不会臣服，也不会离开。城北，不是他一个人的。"

使者看着你，愣住了。

"你确定？"他问，"你知道，跟雾中镇作对，是什么后果吗？"

"我知道。"你说，"但是，我们不怕。"

使者看着你，看了很久。

然后，他摇了摇头。

"好吧。"他说，"我会把你的话，带回去。但是，你会后悔的。"

他转身，离开了。

你看着他离开的方向，心里涌起了一股不安。

你知道，你拒绝了雾中镇。

这意味着，你们可能会跟雾中镇，发生冲突。

但是，你也知道，你们不能屈服。

如果屈服了，你们就失去了自由。

你们要靠自己，活下去。

老周走过来，拍了拍你的肩膀。

"你做得对。"他说，"我们不能屈服。"

你点了点头。

但是，你心里，还是很不安。

雾中镇，有300多人。

而你们，只有十几个人。

如果真的打起来，你们能守住吗？

【理智-10】

【拒绝了雾中镇的臣服要求。】

【获得状态：雾中镇的敌人。赵建国可能会采取行动。】

【重要伏笔：雾中镇的威胁。赵建国会采取什么措施？你们能守住吗？】`,next:`__return__`},{id:`seek_alliance_safe_zone`,text:`寻求希望号安全区的帮助，共同对抗雾中镇`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`sought_alliance_against_mist_town`}],result:`"我们需要帮助。"你说，"雾中镇，太强大了。我们一个人，对付不了。"

老周点了点头。

"对。"他说，"我们可以找希望号安全区。他们跟雾中镇，本来就有摩擦。"

第二天，你带着老周，去了希望号安全区。

你见到了赵明，把雾中镇的信，给了他看。

赵明看完信，脸色变得很难看。

"赵建国，太霸道了。"他说，"城北，不是他一个人的。"

"所以，"你说，"我想跟你们，结成联盟。共同对抗雾中镇。"

赵明看着你，看了很久。

然后，他点了点头。

"好。"他说，"我同意，跟你们结成联盟。共同对抗雾中镇。"

他站起来，伸出手。

"合作愉快。"他说。

你站起来，握住了他的手。

"合作愉快。"你说。

你心里涌起了一股喜悦。

你们跟希望号安全区，结成了联盟。

这意味着，雾中镇，如果敢攻击你们，就要同时面对，你们和希望号安全区。

他们，肯定不敢轻举妄动。

【理智-5】

【结成联盟：新希望据点 + 希望号安全区，共同对抗雾中镇。】

【获得安全保障：雾中镇如果攻击你们，希望号安全区会派兵支援。】

【获得物资支援：希望号安全区，提供武器、弹药、物资。】

【赵明好感度+25】

【重要伏笔：三方势力博弈。新希望据点、希望号安全区、雾中镇。城北的局势，会怎么发展？】`,next:`__return__`},{id:`negotiate_autonomy`,text:`谈判，保持自治，但承认雾中镇的势力范围`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`negotiated_autonomy`}],result:`"我们可以谈判。"你说，"我们可以承认，城北是雾中镇的势力范围。但是，我们的据点，必须保持自治。"

使者看着你，想了想。

"我需要回去，跟赵首领商量一下。"他说。

"好。"你说，"我等你的消息。"

使者带着信，离开了。

三天后，他回来了。

"赵首领同意了。"他说，"你们的据点，可以保持自治。但是，你们必须承认，城北是雾中镇的势力范围。而且，你们每年，需要向雾中镇，进贡一定的物资。"

"多少？"你问。

"每年，食物100份，水100份，药品10份。"使者说。

你想了想，然后点了点头。

"好。"你说，"我同意。"

你们达成了协议。

你们的据点，保持自治。

但是，你们需要承认，城北是雾中镇的势力范围。

而且，每年，需要向雾中镇，进贡一定的物资。

虽然，这有点屈辱。

但是，至少，你们避免了战争。

你们可以安心地，发展壮大。

【理智-3】

【达成协议：新希望据点保持自治，但承认雾中镇的势力范围，每年进贡物资。】

【避免了战争。】

【获得状态：雾中镇的附庸。每年需要进贡物资。】

【赵建国好感度+10】

【伏笔：附庸的命运。你们以后，会一直臣服于雾中镇吗？还是会，反抗？】`,next:`__return__`}]},{id:`phase5_military_cooperation`,text:`李伟上尉，带着几个士兵，来到了你们的据点。

"我们需要合作。"李伟说，开门见山。

"合作？"你问，"什么合作？"

李伟看了看周围，然后压低了声音。

"我们知道，迷雾的真相。"他说，"迷雾，是人为的。是一个叫进化者的组织，搞的鬼。"

你看着他，心里涌起了一股惊讶。

军方，也知道迷雾的真相？

"我们的任务，"李伟继续说，"就是调查进化者组织，找到迷雾的源头，关掉它。"

"但是，我们的人，太少了。"他说，"只有几十个人。我们需要更多的人，更多的物资，更多的支持。"

"所以，我们想跟你们，合作。"他说，"你们出人，出物资。我们出技术，出情报。我们一起，找到迷雾的源头，关掉它。"

你看着他，心里在盘算。

这是一个大计划。

关掉迷雾。

如果成功了，世界，就会恢复正常。

但是，如果失败了，你们可能都会死。

而且，进化者组织，听起来，很强大。

你们，能对付得了吗？

你该怎么办？`,minDay:36,maxTriggers:1,weight:5,choices:[{id:`accept_military_cooperation`,text:`接受合作，一起调查进化者组织，关掉迷雾`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`accepted_military_cooperation`}],result:`"好。"你说，"我接受合作。我们一起，调查进化者组织，关掉迷雾。"

李伟看着你，脸上露出了笑容。

"很好。"他说，"你做了一个正确的决定。"

他从背包里，拿出了一些文件。

"这些，是我们收集的，关于进化者组织的情报。"他说，"你看看。"

你接过文件，看了看。

文件上，记录着进化者组织的一些信息。

进化者组织，是一个秘密组织。

他们相信，人类需要进化。

他们用迷雾，作为催化剂，来加速人类的进化。

他们的总部，在城北灯塔的地下。

他们的首领，叫"先知"。

没有人，见过先知的真面目。

但是，据说，先知，是第一个成功的进化者。

他拥有，超自然的力量。

你看完文件，心里涌起了一股强烈的不安。

进化者组织。

先知。

第一个成功的进化者。

这一切，都太可怕了。

"我们的计划，"李伟说，"是先收集更多的情报，然后，组织一支队伍，攻入灯塔的地下，找到先知，关掉迷雾的核心。"

"但是，"他说，"这需要时间，需要准备。我们现在，还太弱了。"

你看着他，点了点头。

"我知道。"你说，"我们会帮你们。我们会出人，出物资。我们一起，变强。然后，关掉迷雾。"

李伟看着你，认真地点了点头。

"好。"他说，"合作愉快。"

你心里涌起了一股坚定的感觉。

你们，要跟进化者组织，战斗。

你们，要关掉迷雾。

你们，要让世界，恢复正常。

这是一场，艰苦的战斗。

但是，你们，必须赢。

【理智-8】

【接受军方合作。共同调查进化者组织，关掉迷雾。】

【获得重要情报：进化者组织的总部在城北灯塔地下，首领叫"先知"，是第一个成功的进化者，拥有超自然力量。】

【获得任务：攻入灯塔地下，找到先知，关掉迷雾核心。】

【建立合作关系：军方残余部队。首领李伟上尉。提供技术、情报、重武器。】

【李伟好感度+25】

【重要伏笔：进化者组织。先知。灯塔地下。你们，能成功吗？】`,next:`__return__`},{id:`delay_decision`,text:`拖延，需要更多时间考虑`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`"这个计划，太大了。"你说，"我需要更多时间，考虑一下。"

李伟看着你，点了点头。

"好。"他说，"我理解。这确实，是一个重大的决定。"

他站起来，准备离开。

"但是，"他说，走到门口，又回过头，"时间，不多了。进化者组织，正在变得越来越强。如果我们不尽快行动，可能就，来不及了。"

然后，他带着人，离开了。

你看着他们离开的方向，心里涌起了一股复杂的感觉。

关掉迷雾。

这是一个，多么诱人的目标。

但是，也是一个，多么危险的目标。

进化者组织。

先知。

第一个成功的进化者。

你们，能对付得了吗？

你不知道。

但是，你知道，你需要时间，考虑清楚。

这是一个，关乎所有人命运的决定。

你不能，草率地，做出决定。

【理智-3】

【拖延了军方的合作邀请。】

【获得状态：重大抉择。是否跟军方合作，关掉迷雾？】

【伏笔：军方的合作邀请。你们以后，会接受吗？】`,next:`__return__`},{id:`refuse_military_cooperation`,text:`拒绝，太危险了，我们只想活下去`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`"对不起。"你说，"这个计划，太危险了。我们，只想活下去。"

李伟看着你，愣住了。

"只想活下去？"他说，声音变得很冷，"如果不关掉迷雾，你们，能活多久？一年？两年？五年？"

"迷雾，会越来越浓。"他说，"怪物，会越来越强。进化者组织，会越来越壮大。到最后，你们，连活下去的机会，都没有。"

你看着他，没有说话。

你知道，他说的，有道理。

但是，你也知道，跟进化者组织战斗，太危险了。

你们，可能都会死。

"我理解你的想法。"李伟说，叹了口气，"但是，我还是希望，你能再考虑考虑。"

他站起来，准备离开。

"如果，你改变主意了。"他说，走到门口，又回过头，"随时，可以来找我。"

然后，他带着人，离开了。

你看着他们离开的方向，心里涌起了一股复杂的感觉。

你拒绝了，一个可能拯救世界的机会。

但是，你也保护了，你的同伴。

你们，只想活下去。

这有错吗？

你不知道。

但是，你知道，你做出了，你的选择。

【理智-5】

【拒绝了军方的合作邀请。】

【获得状态：旁观者。你们，选择了，不参与，关掉迷雾的战斗。】

【伏笔：军方的合作邀请。你们以后，会后悔吗？】`,next:`__return__`}]},{id:`phase5_build_farm`,text:`张大爷，找到了你。

"首领。"他说，"我看了看，我们据点的院子，很大。可以开辟一个农场。"

"农场？"你问。

"对。"张大爷说，"我以前，是农民。我会种地。我们可以种一些蔬菜，粮食。这样，我们就不用，天天出去找食物了。"

你看着他，心里涌起了一股喜悦。

农场。

如果，你们有了自己的农场。

你们，就有了，稳定的食物来源。

这对据点的发展，太重要了。

"但是，"张大爷说，"我们需要种子，需要工具，需要肥料。这些，我们都没有。"

你想了想，然后说："种子和工具，我们可以去找。肥料，我们可以用，人和动物的粪便。"

张大爷点了点头。

"好。"他说，"那我们，就开始，开辟农场。"

你该怎么办？`,minDay:33,maxTriggers:1,weight:6,choices:[{id:`start_farm_project`,text:`启动农场项目，派人去找种子和工具`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`started_farm`}],result:`"好。"你说，"我们启动农场项目。"

你派老周，带着几个人，出去找种子和工具。

他们去了三天。

三天后，他们回来了。

他们找到了，很多种子。

蔬菜种子：白菜、萝卜、土豆、西红柿、黄瓜……

粮食种子：小麦、玉米、水稻……

还有，一些果树苗。

他们还找到了，很多农具。

锄头、铲子、犁、耙子、水桶……

张大爷看着这些种子和工具，脸上露出了笑容。

"太好了。"他说，"有了这些，我们就可以，开辟农场了。"

接下来的几天，你们忙碌了起来。

张大爷，带着几个人，在据点的院子里，开辟了一块地。

他们翻土，施肥，播种，浇水。

你也帮忙，搬运东西，修建灌溉系统。

小杨，还修了一个，简易的抽水机。

几天后，农场，开辟完成了。

虽然，现在，还只是一片空地。

但是，你知道，过不了多久，这里，就会长出，绿油油的庄稼。

你们，就有了，稳定的食物来源。

【理智+3，体力-20】

【建立农场：可种植蔬菜、粮食、果树。】

【获得种子：蔬菜种子x20，粮食种子x15，果树苗x5。】

【获得农具：锄头、铲子、犁、耙子、水桶等。】

【获得建筑：农场、灌溉系统、抽水机。】

【获得状态：自给自足。30天后，农场开始产出食物。每日食物产出+10。】

【张大爷好感度+20】`,next:`__return__`},{id:`postpone_farm`,text:`暂时不搞农场，先解决其他更紧急的问题`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`"农场的事情，暂时放一放。"你说，"我们现在，还有更紧急的问题，需要解决。"

张大爷看着你，有点失望。

"好吧。"他说，"那农场的事情，以后再说。"

他转身，离开了。

你看着他离开的方向，心里涌起了一股愧疚。

你知道，农场，对据点的发展，很重要。

但是，你也知道，现在，你们还有更紧急的问题。

防御，人口，物资，势力关系……

这些，都比农场，更紧急。

农场，只能，以后再说了。

【理智-3】

【暂时推迟了农场项目。】

【张大爷好感度-5】

【伏笔：农场项目。你们以后，会启动吗？】`,next:`__return__`}]},{id:`phase5_upgrade_wall`,text:`李刚，找到了你。

"首领。"他说，"我看了看，我们据点的围墙，太矮了，也太不结实了。如果，有强盗来袭击，我们，可能守不住。"

"那怎么办？"你问。

"我们可以，升级围墙。"李刚说，"我以前，是建筑工人。我会盖房子，会修围墙。我们可以，把围墙，加高，加厚，加固。"

"但是，"他说，"我们需要材料。石头，水泥，钢筋，木材。这些，我们都不够。"

你想了想，然后说："材料，我们可以去找。城北，有很多废弃的建筑工地。那里，应该有，我们需要的材料。"

李刚点了点头。

"好。"他说，"那我们，就开始，升级围墙。"

你该怎么办？`,minDay:34,maxTriggers:1,weight:6,choices:[{id:`start_wall_upgrade`,text:`启动围墙升级项目，派人去找建筑材料`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`resource`,resource:`energy`,delta:-25},{kind:`flag`,flag:`upgraded_wall`}],result:`"好。"你说，"我们启动围墙升级项目。"

你派老周，带着几个人，出去找建筑材料。

他们去了四天。

四天后，他们回来了。

他们找到了，很多建筑材料。

石头、水泥、钢筋、木材、砖块、玻璃……

应有尽有。

李刚看着这些材料，脸上露出了笑容。

"太好了。"他说，"有了这些，我们就可以，把围墙，升级得，固若金汤。"

接下来的几天，你们忙碌了起来。

李刚，带着几个人，开始升级围墙。

他们把围墙，从两米高，加高到了四米。

他们把围墙，加厚了一倍。

他们在围墙上，加装了铁丝网，尖刺，瞭望塔。

他们在围墙的入口，修建了，一个坚固的铁门。

你也帮忙，搬运材料，搅拌水泥。

小杨，还在围墙上，安装了，探照灯，警报器，监控摄像头。

几天后，围墙升级，完成了。

现在的围墙，又高，又厚，又坚固。

而且，还有铁丝网，尖刺，瞭望塔，探照灯，警报器，监控摄像头。

现在，就算有一百个强盗，来袭击，你们，也有信心，守住。

【理智+3，体力-25】

【围墙升级完成：从2米加高到4米，加厚一倍，加装铁丝网、尖刺、瞭望塔、铁门、探照灯、警报器、监控摄像头。】

【据点防御等级：从3级提升到5级。】

【获得状态：固若金汤。遭遇袭击时，防御成功率+80%。】

【李刚好感度+20】

【小杨好感度+15】`,next:`__return__`},{id:`postpone_wall`,text:`暂时不升级围墙，先解决其他更紧急的问题`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`"围墙升级的事情，暂时放一放。"你说，"我们现在，还有更紧急的问题，需要解决。"

李刚看着你，有点失望。

"好吧。"他说，"那围墙升级的事情，以后再说。"

他转身，离开了。

你看着他离开的方向，心里涌起了一股愧疚。

你知道，围墙升级，对据点的安全，很重要。

但是，你也知道，现在，你们还有更紧急的问题。

人口，物资，势力关系，迷雾真相……

这些，都比围墙升级，更紧急。

围墙升级，只能，以后再说了。

【理智-3】

【暂时推迟了围墙升级项目。】

【李刚好感度-5】

【伏笔：围墙升级项目。你们以后，会启动吗？】`,next:`__return__`}]},{id:`phase5_engineer_join`,text:`老周，带着一个陌生人，回到了据点。

"首领。"老周说，"我在外面，找到了这个人。他说，他是工程师。"

你看着那个陌生人。

他大约三十多岁，穿着一件破旧的西装，戴着一副眼镜，看起来很斯文。

"你好。"他说，推了推眼镜，"我叫王工。我以前，是机械工程师。迷雾来的时候，我正在工厂里，调试设备。"

"我在外面，流浪了一个多月。"他说，"我听说，这里有一个据点，所以，我就来了。我希望，能加入你们。"

你看着他，心里在盘算。

机械工程师。

这是一个，很宝贵的人才。

有了他，你们可以，修理更复杂的机械，开发新的设备，甚至，制造武器。

但是，人多了，消耗也大了。

而且，你不知道，这个人，是不是可靠。

你该怎么办？`,minDay:35,maxTriggers:1,weight:5,choices:[{id:`accept_engineer`,text:`接受他，让他加入据点`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`accepted_engineer`}],result:`"好。"你说，"欢迎你，加入我们。"

王工看着你，脸上露出了笑容。

"谢谢。"他说，"谢谢你们，收留我。"

你让人，给他安排了住处，还有食物和水。

王工，很感激。

第二天，他就开始工作了。

他先检查了，据点里的所有设备。

发电设备，抽水设备，通讯设备，车辆……

然后，他提出了，很多改进建议。

"这个发电设备，效率太低了。"他说，"我可以，改造一下，让它的效率，提高一倍。"

"这个抽水设备，太老旧了。"他说，"我可以，修一下，让它的出水量，增加两倍。"

"这些车辆，保养得不好。"他说，"我可以，全面检修一下，让它们的性能，提升很多。"

你看着他，心里涌起了一股喜悦。

这个王工，真的，很厉害。

有了他，你们的据点，会发展得，更快。

接下来的几天，王工，忙碌了起来。

他改造了发电设备，让它的效率，提高了一倍。

他修好了抽水设备，让它的出水量，增加了两倍。

他全面检修了，所有的车辆，让它们的性能，提升了很多。

他还，开发了一个，简易的通讯设备。

现在，你们可以，在几公里内，互相通讯。

你看着这些改进，心里涌起了一股强烈的喜悦。

这个王工，真的，是一个宝贝。

【理智+3】

【王工加入了据点。机械工程师。】

【据点人口：从11人增加到12人。】

【获得能力：高级机械。可以修理复杂机械，开发新设备，制造武器。】

【设备升级：发电设备效率+100%，抽水设备出水量+200%，车辆性能+50%。】

【获得新设备：简易通讯设备。可在几公里内互相通讯。】

【王工好感度+20】`,next:`__return__`},{id:`test_engineer`,text:`先考验他一下，看看他是不是真的有本事`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`tested_engineer`}],result:`"在你加入之前，"你说，"我想，先考验你一下。"

王工看着你，点了点头。

"好。"他说，"你想，怎么考验我？"

你想了想，然后说："我们据点的发电设备，坏了。你能，修好它吗？"

其实，发电设备，没有坏。

你只是，想考验他一下。

王工，点了点头。

"好。"他说，"我去看看。"

他来到发电设备前，开始检查。

他检查得，很仔细。

每一个零件，每一条线路，他都，认真地检查。

然后，他站起来，看着你。

"这个发电设备，没有坏。"他说，"它只是，需要保养了。火花塞，有点脏了。机油，也该换了。"

你看着他，心里涌起了一股惊讶。

他居然，看出来了，发电设备，没有坏。

而且，他还，准确地，指出了，问题所在。

这个人，真的，有本事。

"好。"你说，"你通过了考验。欢迎你，加入我们。"

王工看着你，笑了笑。

"谢谢。"他说，"我就知道，你是在考验我。"

你看着他，也笑了。

这个人，不仅有本事，还很聪明。

【理智-3】

【王工加入了据点。机械工程师。通过了考验。】

【据点人口：从11人增加到12人。】

【获得能力：高级机械。可以修理复杂机械，开发新设备，制造武器。】

【王工好感度+15】`,next:`__return__`},{id:`refuse_engineer`,text:`拒绝他，据点人已经够多了`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`"对不起。"你说，"我们据点的人，已经够多了。我们，不能再，收留更多的人了。"

王工看着你，脸上露出了失望的表情。

"这样啊。"他说，"那，好吧。"

他转身，准备离开。

"等等。"你说，"虽然，你不能加入我们。但是，我们可以，合作。你帮我们，修理设备，开发新设备。我们，给你提供，食物和水。"

王工，回过头，看着你。

"合作？"他问。

"对。"你说，"你不需要，住在我们的据点。你可以，住在外面。但是，你需要，定期，来帮我们，工作。我们，会给你，报酬。"

王工，想了想，然后点了点头。

"好。"他说，"我同意，合作。"

你们达成了，合作协议。

虽然，王工，没有加入你们。

但是，他会，定期，来帮你们，修理设备，开发新设备。

你们，会给他，提供食物和水，作为报酬。

这也，算是，一个不错的结果。

【理智-5】

【拒绝了王工加入。但是，达成了合作协议。】

【获得合作关系：王工。机械工程师。定期来帮你们修理设备，开发新设备。】

【需要支付报酬：每月食物+10，水+10。】

【伏笔：王工。你们以后，会让他加入吗？】`,next:`__return__`}]},{id:`phase5_bandit_attack`,text:`一天晚上，警报器，突然响了。

是老周，在瞭望塔上，发出的警报。

"有情况！"老周喊，"有很多人，朝我们的据点，过来了！"

你赶紧，跑到瞭望塔上，拿起望远镜，看了看。

雾里，有很多人影，在移动。

至少，有二三十个人。

他们手里，拿着武器。

刀，棍，甚至，还有几把枪。

是强盗。

他们来袭击，你们的据点了。

你看着他们，心里涌起了一股紧张。

二三十个强盗。

而你们，只有十几个人。

虽然，你们的围墙，很坚固。

但是，人数差距，太大了。

你该怎么办？`,minDay:38,maxTriggers:1,weight:6,choices:[{id:`defend_bravely`,text:`坚守据点，英勇抵抗`,effects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`defended_bandit_attack`}],result:`"所有人，各就各位！"你喊，"坚守据点！"

你的同伴们，赶紧，拿起武器，各就各位。

老周，在瞭望塔上，用猎枪，狙击敌人。

李刚，带着几个人，守在围墙边，用石头，砸敌人。

王工，操作着，你之前让他做的，简易投石机，发射石头。

陈静，在医疗室里，准备救治伤员。

小杨，操作着，探照灯，照亮敌人。

朵朵，躲在地下室里，不敢出声。

你，在围墙边，指挥战斗。

强盗们，冲到了围墙下。

他们开始，攀爬围墙。

但是，围墙，太高了，太滑了。

他们爬不上来。

然后，他们开始，用木头，撞门。

但是，铁门，太坚固了。

他们撞不开。

老周的猎枪，一枪一个，弹无虚发。

王工的投石机，一石头，砸倒好几个。

李刚他们的石头，也砸倒了，很多强盗。

战斗，持续了，大约一个小时。

最后，强盗们，撑不住了。

他们丢下了，七八具尸体，逃跑了。

你们，赢了。

你靠在围墙上，大口喘着气。

你的手臂，被流弹擦伤了，在流血。

但是，你不在乎。

你们，守住了据点。

【健康-20，理智-10】

【成功抵御强盗袭击。击杀强盗8人，击伤10余人。】

【我方伤亡：轻伤3人，无人死亡。】

【获得战利品：武器+10，弹药+50，食物+20，水+15。】

【据点防御等级+1。】

【获得称号：据点的守护者。力量+3，敏捷+2，领导力+3，防御成功率+20%。】

【老周好感度+20】

【李刚好感度+15】

【王工好感度+15】`,next:`__return__`},{id:`call_for_backup`,text:`呼叫希望号安全区支援`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`called_backup`}],result:`"快！"你喊，"用通讯设备，呼叫希望号安全区，请求支援！"

小杨，赶紧，拿起通讯设备，呼叫希望号安全区。

"这里是新希望据点！"小杨喊，"我们遭遇强盗袭击！请求支援！请求支援！"

通讯设备里，传来了林小雨的声音。

"收到！"她说，"我们马上，派兵支援！你们，一定要，守住！"

你心里，涌起了一股希望。

希望号安全区，会派兵支援。

你们，只要，守住一段时间，就可以了。

"所有人，坚守据点！"你喊，"支援，马上就到！"

你的同伴们，听到支援，马上就到，士气，大振。

他们，更加英勇地，抵抗强盗。

老周的猎枪，一枪一个。

王工的投石机，一石头，砸倒好几个。

李刚他们的石头，也砸倒了，很多强盗。

战斗，持续了，大约半个小时。

然后，你们听到了，发动机的声音。

是希望号安全区的支援部队，到了。

三辆卡车，载着，几十个士兵，冲了过来。

林小雨，站在第一辆卡车上，手里拿着一把步枪。

"冲啊！"林小雨喊，"消灭这些强盗！"

希望号安全区的士兵们，冲下卡车，朝强盗们，冲了过去。

强盗们，看到支援部队，到了，吓得，魂飞魄散。

他们，丢下武器，转身就跑。

但是，已经，来不及了。

希望号安全区的士兵们，追上了他们，把他们，全部消灭了。

战斗，结束了。

你们，赢了。

你靠在围墙上，大口喘着气。

你的心脏，跳得很快。

刚才，太危险了。

如果，支援部队，晚到十分钟，你们，可能就，守不住了。

【理智-5】

【成功抵御强盗袭击。希望号安全区支援部队，消灭了所有强盗。】

【我方伤亡：轻伤1人，无人死亡。】

【获得战利品：武器+15，弹药+80，食物+30，水+20。】

【希望号安全区，损失：轻伤3人。】

【林小雨好感度+25】

【赵明好感度+20】

【获得状态：可靠的盟友。希望号安全区，会在你们遭遇危险时，派兵支援。】`,next:`__return__`},{id:`negotiate_surrender`,text:`谈判，给他们一些物资，让他们离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`negotiated_surrender`}],result:`"停火！"你喊，"我们谈判！"

你让同伴们，停止射击。

然后，你站在围墙上，朝强盗们，喊。

"你们要什么？"你喊，"我们可以谈！"

强盗们，停止了攻击。

一个，看起来像是首领的人，走了出来。

他大约四十多岁，脸上有一道疤，手里拿着一把砍刀。

"我们要什么？"他说，"我们要，食物，水，药品，武器。你们，把这些东西，交出来，我们就，离开。"

你看着他，心里在盘算。

如果，给他们物资，他们就离开。

虽然，损失了一些物资。

但是，避免了，战斗。

你们，没有人，会受伤，或者死亡。

这，也算是，一个不错的结果。

"好。"你说，"我给你们，食物30份，水30份，药品5份，武器3把。你们，拿到东西，就离开。"

强盗首领，想了想，然后点了点头。

"好。"他说，"成交。"

你让人，把物资，从围墙上，递了下去。

强盗首领，检查了一下物资，然后，朝他的手下，挥了挥手。

"我们走。"他说。

强盗们，拿着物资，离开了。

你看着他们离开的方向，心里涌起了一股复杂的感觉。

你们，避免了战斗。

但是，你们也，损失了，很多物资。

而且，这些强盗，以后，可能还会，再来。

【理智-8】

【通过谈判，避免了战斗。强盗们，拿到物资，离开了。】

【损失物资：食物-30，水-30，药品-5，武器-3。】

【我方伤亡：无。】

【获得状态：破财消灾。通过支付物资，避免了战斗。但是，强盗们，可能还会再来。】

【伏笔：强盗首领。他叫什么名字？他以后，还会再来吗？】`,next:`__return__`}]},{id:`phase5_mist_density_increase`,text:`最近几天，你发现，迷雾，变得越来越浓了。

以前，中午的时候，雾会淡一些，能看到，几十米外的东西。

但是现在，就算是中午，雾也很浓，能见度，不到十米。

而且，你还发现，雾里的怪物，变得越来越多，越来越强了。

以前，一天，最多遇到，一两只怪物。

但是现在，一天，能遇到，五六只，甚至，更多。

而且，这些怪物，比以前，更强壮，更凶猛。

老周，找到了你。

"首领。"他说，脸色很凝重，"不对劲。迷雾，变得越来越浓了。怪物，也变得越来越多，越来越强了。"

"我知道。"你说，"我也，发现了。"

"这意味着，什么？"老周问。

你想了想，然后说："这意味着，进化者组织，可能在，加强迷雾的浓度。他们，在加速，进化的过程。"

老周，看着你，脸色变得，更难看了。

"那我们，怎么办？"他问。

你该怎么办？`,minDay:40,maxTriggers:1,weight:5,choices:[{id:`accelerate_preparations`,text:`加速准备，尽快攻入灯塔，关掉迷雾`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`accelerated_preparations`}],result:`"我们必须，加速准备。"你说，"尽快，攻入灯塔，关掉迷雾。"

老周，点了点头。

"好。"他说，"我去，组织人，加强训练。"

接下来的几天，你们，加速了准备。

老周，带着所有人，加强了战斗训练。

每天，他们都要，训练好几个小时。

射击，格斗，战术，配合……

每个人，都变得，更强了。

李刚，带着人，加固了据点的防御。

他们，把围墙，再加高了一米。

他们，在围墙外，挖了，一道壕沟。

他们，在据点里，修建了，更多的防御工事。

王工，带着人，开发了，新的武器。

他，制造了，简易的手榴弹。

他，改造了，猎枪，让它的威力，更大了。

他，还，开发了，一个，简易的火焰喷射器。

陈静，带着人，准备了，大量的药品和医疗设备。

她，还，培训了，几个急救员。

小杨，带着人，检修了，所有的车辆和设备。

他，还，在车辆上，加装了，装甲和武器。

你，也没有闲着。

你，跟李伟，一起，制定了，攻入灯塔的计划。

你们，研究了，灯塔的地形。

你们，分析了，进化者组织的，可能的防御。

你们，制定了，详细的，作战计划。

几天后，所有的准备，都完成了。

你们，已经，准备好了。

随时，可以，攻入灯塔，关掉迷雾。

【理智-8】

【加速准备完成。所有人，战斗力+30%。】

【据点防御等级+1。】

【获得新武器：简易手榴弹、改装猎枪、简易火焰喷射器。】

【车辆升级：加装装甲和武器。】

【获得计划：攻入灯塔的详细作战计划。】

【获得状态：万事俱备。随时，可以攻入灯塔，关掉迷雾。】

【老周好感度+15】

【李刚好感度+10】

【王工好感度+15】

【李伟好感度+20】`,next:`__return__`},{id:`strengthen_defense_only`,text:`先加强防御，守住据点，静观其变`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`strengthened_defense_only`}],result:`"我们先，加强防御。"你说，"守住据点，静观其变。"

老周，点了点头。

"好。"他说，"我去，组织人，加强防御。"

接下来的几天，你们，加强了据点的防御。

李刚，带着人，把围墙，再加高了一米，加厚了半米。

他们，在围墙外，挖了，两道壕沟。

他们，在壕沟里，插满了，尖刺。

他们，在围墙上，加装了，更多的铁丝网和尖刺。

他们，在据点的入口，修建了，一道，更坚固的铁门。

王工，带着人，在围墙上，安装了，更多的探照灯和警报器。

他，还，开发了，几个，简易的陷阱。

有，尖刺坑，绊索，落石，火焰陷阱……

老周，带着人，加强了，警戒和巡逻。

他们，在据点周围，设立了，几个，暗哨。

他们，每天，都要，巡逻好几次。

陈静，带着人，准备了，更多的药品和医疗设备。

小杨，带着人，检修了，所有的设备。

几天后，据点的防御，大大加强了。

现在，就算有，一百个强盗，或者，几十只怪物，来袭击，你们，也有信心，守住。

但是，迷雾，还在，变得越来越浓。

怪物，还在，变得越来越多，越来越强。

你们，守住了据点。

但是，你们，能守多久呢？

【理智-5】

【据点防御等级：从5级提升到7级。】

【获得建筑：加高加厚围墙、两道壕沟、尖刺区、更坚固的铁门、更多探照灯和警报器。】

【获得陷阱：尖刺坑、绊索、落石、火焰陷阱。】

【获得状态：铜墙铁壁。遭遇袭击时，防御成功率+90%。】

【李刚好感度+15】

【王工好感度+10】

【老周好感度+10】`,next:`__return__`},{id:`investigate_cause`,text:`派人调查，迷雾浓度增加的原因`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`investigated_mist_cause`}],result:`"我们需要，搞清楚，迷雾浓度，为什么，会增加。"你说，"派人，去调查。"

老周，点了点头。

"我去。"他说，"我带着，几个人，去灯塔附近，调查一下。"

第二天，老周，带着两个人，出发了。

他们去了，三天。

三天后，他们回来了。

老周的脸色，很难看。

"怎么样？"你问，"查到了，什么？"

老周，喝了一口水，然后说："我们，在灯塔附近，发现了，很多，进化者组织的人。"

"他们，在干什么？"你问。

"他们，在往灯塔的地下，运送，很多设备和材料。"老周说，"而且，我们还发现，灯塔的顶端，那盏发光的灯，变得，比以前，更亮了。"

"更亮了？"你问。

"对。"老周说，"以前，那盏灯，只是，发出微弱的蓝光。但是现在，它的光，变得，很亮，很刺眼。而且，它的光，还在，不断地，闪烁，脉动。"

"这意味着，什么？"你问。

老周，看着你，认真地说："这意味着，进化者组织，在加强，迷雾核心的功率。他们，在加速，迷雾的扩散，和进化的过程。"

"而且，"他又说，"我们还发现，灯塔的地下，有很多，动静。好像，他们在，建造什么东西。"

你听完，心里涌起了，一股强烈的不安。

进化者组织，在加强迷雾的浓度。

他们，在加速进化的过程。

他们，还在灯塔的地下，建造什么东西。

他们，到底，想干什么？

【理智-10】

【调查结果：进化者组织在加强迷雾核心功率，加速迷雾扩散和进化过程。他们还在灯塔地下建造什么东西。】

【获得重要情报：灯塔顶端的灯变得更亮了，在闪烁脉动。灯塔地下有很多动静，进化者组织在建造什么。】

【获得状态：迫在眉睫。进化者组织在加速计划，你们必须尽快行动。】

【老周好感度+10】

【重要伏笔：进化者组织的计划。他们在建造什么？他们的最终目的，是什么？】`,next:`__return__`}]},{id:`phase5_cure_discovery`,text:`陈静，找到了你。

"首领。"她说，脸色很兴奋，"我有一个，重大发现。"

"什么发现？"你问。

"我，在研究，被迷雾感染的人的，血液样本。"陈静说，"我发现了，一种，抗体。"

"抗体？"你问。

"对。"陈静说，"有一些，被感染的人，他们的体内，会产生，一种，特殊的抗体。这种抗体，可以，抵抗迷雾的感染，甚至，逆转，感染的过程。"

"你的意思是？"你问，心里涌起了，一股强烈的期待。

"我的意思是，"陈静说，"迷雾感染，可能，是可以治愈的。"

你愣住了。

迷雾感染，可以治愈？

这意味着，那些，被感染的人，还有希望。

包括，朵朵的父亲。

"但是，"陈静又说，"这种抗体，很罕见。一百个，被感染的人里，可能，只有一两个，能产生，这种抗体。而且，我还需要，更多的研究，才能，制造出，治愈的药物。"

"你需要，什么？"你问。

"我需要，更多的，被感染的人的，血液样本。"陈静说，"还有，一个，更好的实验室。还有，一些，特殊的设备和材料。"

你看着她，心里在盘算。

如果，能制造出，治愈迷雾感染的药物。

那将是，一个，伟大的发现。

它，可以，拯救，很多人的生命。

包括，朵朵的父亲。

但是，这需要，很多的研究，很多的材料，很多的时间。

而且，还很危险。

因为，要获取，被感染的人的血液样本，就必须，接近，那些，被感染的人。

你该怎么办？`,minDay:42,maxTriggers:1,weight:4,choices:[{id:`support_cure_research`,text:`全力支持，帮助陈静，研究治愈药物`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`supported_cure_research`}],result:`"好。"你说，"我全力支持你。我们一起，研究出，治愈迷雾感染的药物。"

陈静，看着你，脸上露出了，兴奋的笑容。

"谢谢。"她说，"谢谢你，相信我。"

接下来的几天，你们，全力投入了，治愈药物的研究。

你派老周，带着人，出去，获取，被感染的人的血液样本。

他们，冒着生命危险，接近，那些，被感染的人，获取了，很多血液样本。

李刚，带着人，在据点里，修建了，一个，简易的实验室。

王工，帮陈静，制造了，一些，简易的实验设备。

小杨，帮陈静，收集了，很多，关于医学和生物学的书籍。

陈静，带着几个，助手，日夜不停地，研究。

你也，经常，去实验室，帮忙。

虽然，你不懂医学。

但是，你可以，帮忙，整理数据，清洗设备，准备材料。

研究的过程，很艰难。

很多次，实验，都失败了。

但是，陈静，没有放弃。

她，一次又一次地，调整方案，重新实验。

终于，在第十天，有了，重大突破。

陈静，成功地，从抗体中，提取出了，有效的成分。

她，制造出了，第一支，治愈迷雾感染的，试验性药物。

虽然，这只是，试验性的。

还需要，更多的测试，才能，确认它的安全性和有效性。

但是，这已经，是一个，伟大的突破了。

你看着，那支，小小的试管，心里涌起了，一股强烈的喜悦。

也许，用不了多久，你们，就能，制造出，真正的，治愈药物。

也许，用不了多久，那些，被感染的人，就能，被治愈。

包括，朵朵的父亲。

【理智-5，体力-20】

【重大突破：成功提取出抗体的有效成分，制造出第一支试验性治愈药物。】

【获得物品：试验性治愈药物x1。（还需要更多测试）】

【获得建筑：简易实验室。】

【获得状态：治愈的希望。迷雾感染，可能是可以治愈的。】

【陈静好感度+30】

【老周好感度+15】

【李刚好感度+10】

【王工好感度+10】

【重要伏笔：治愈药物。它能，真正治愈，迷雾感染吗？朵朵的父亲，能被治愈吗？】`,next:`__return__`},{id:`postpone_cure_research`,text:`暂时搁置，先解决更紧急的问题`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`"这个研究，太重要了。"你说，"但是，我们现在，还有更紧急的问题，需要解决。迷雾浓度，在增加。怪物，在变得更强。我们必须，先解决，这些问题。治愈药物的研究，暂时，搁置一下。"

陈静，看着你，有点失望。

"好吧。"她说，"那治愈药物的研究，以后再说。"

她转身，离开了。

你看着她离开的方向，心里涌起了，一股愧疚。

你知道，治愈药物的研究，很重要。

它，可以，拯救，很多人的生命。

但是，你也知道，现在，你们还有更紧急的问题。

迷雾浓度增加，怪物变强，进化者组织的威胁……

这些，都比治愈药物的研究，更紧急。

治愈药物的研究，只能，以后再说了。

【理智-3】

【暂时搁置了治愈药物的研究。】

【陈静好感度-10】

【伏笔：治愈药物的研究。你们以后，会继续吗？】`,next:`__return__`}]},{id:`phase5_end_prepare_assault`,weight:3,minDay:44,maxTriggers:1,text:`第45天，到了。

你们的据点，已经，发展得，很壮大了。

人口，从最初的，几个人，发展到了，二十多人。

防御，从最初的，简陋的围墙，发展到了，固若金汤的堡垒。

物资，从最初的，捉襟见肘，发展到了，充足丰富。

你们，还跟希望号安全区，结成了联盟。

你们，还跟军方残余部队，建立了合作。

你们，还发现了，迷雾的真相。

迷雾，是进化者组织，搞的鬼。

他们的总部，在城北灯塔的地下。

他们的首领，叫"先知"。

是第一个，成功的进化者。

拥有，超自然的力量。

你们，还发现了，治愈迷雾感染的，可能性。

陈静，已经，制造出了，第一支，试验性治愈药物。

现在，你们，已经，准备好了。

是时候，攻入灯塔，找到先知，关掉迷雾的核心了。

你站在据点的屋顶上，看着远处的灯塔。

灯塔的光，在雾里，若隐若现。

你知道，那里，有你们想要的答案。

那里，也有，你们想象不到的危险。

但是，你们，必须去。

因为，只有关掉迷雾，世界，才能恢复正常。

只有关掉迷雾，你们，才能，真正地，活下去。

你深吸一口气，然后，转过身，看着你的同伴们。

他们，都站在你身后。

老周，陈静，小杨，朵朵，李刚，张大爷，王工，王芳……

他们，都看着你。

他们的眼睛里，有紧张，有恐惧，但是，更多的，是坚定。

你知道，他们，都愿意，跟你一起，攻入灯塔。

你该，怎么做最后的准备？`,choices:[{id:`final_preparations_assault`,text:`做最后的准备，然后，攻入灯塔`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`final_preparations_assault`}],result:`"好。"你说，"我们做最后的准备。然后，攻入灯塔。"

接下来的几天，你们，做了，最后的准备。

老周，带着所有人，进行了，最后的，战斗训练。

他们，演练了，攻入灯塔的，战术和配合。

李刚，带着人，准备了，大量的，攻城设备。

云梯，撞锤，盾牌，绳索……

王工，带着人，准备了，大量的，武器和弹药。

步枪，手枪，猎枪，手榴弹，火焰喷射器……

陈静，带着人，准备了，大量的，药品和医疗设备。

她，还，培训了，几个，战地急救员。

小杨，带着人，检修了，所有的车辆和设备。

他，还，在车辆上，加装了，更多的装甲和武器。

李伟，也带着，他的军方残余部队，加入了你们。

他们，有重武器，有专业的，作战经验。

希望号安全区，也派了，一支精锐部队，支援你们。

由林小雨，亲自率领。

现在，你们，有了，一支，强大的，联合部队。

总人数，超过了，一百人。

有步枪，手枪，猎枪，手榴弹，火焰喷射器，甚至，还有几挺，机关枪。

有车辆，有装甲，有攻城设备。

有专业的，指挥官和士兵。

你们，已经，准备好了。

随时，可以，攻入灯塔。

第50天，早上。

你们，集结了，所有的部队。

你站在，队伍的最前面。

你看着，你的同伴们，你的战友们。

他们，都看着你。

他们的眼睛里，有紧张，有恐惧，但是，更多的，是坚定。

你深吸一口气，然后，大声说：

"兄弟们！今天，我们要攻入灯塔！我们要，找到先知！我们要，关掉迷雾！我们要，让世界，恢复正常！"

"你们，准备好了吗？"

所有人，都大声喊：

"准备好了！"

你满意地点了点头。

然后，你转过身，指着远处的灯塔。

"出发！"你喊。

联合部队，出发了。

一百多个人，十几辆车，朝灯塔，进发。

你们的，最终决战，开始了。

【理智-10】

【最终决战准备完成。联合部队，超过100人，装备精良。】

【获得状态：最终决战。随时，可以攻入灯塔，进行最终决战。】

【第五阶段结束。进入第六阶段：最终决战。】

【老周好感度+20】

【陈静好感度+20】

【小杨好感度+20】

【李刚好感度+15】

【王工好感度+15】

【李伟好感度+25】

【林小雨好感度+25】

【赵明好感度+20】

【重要伏笔：最终决战。攻入灯塔，找到先知，关掉迷雾。你们，能成功吗？先知，有多强？灯塔的地下，有什么？】`,next:`__return__`}]}],El={final_assault_begin:{id:`final_assault_begin`,text:`第46天，黎明。

你们的联合部队，在灯塔外，集结完毕。

一百多个人，十几辆车。

有希望号安全区的精锐部队，由林小雨率领。
有军方残余部队，由李伟上尉率领。
有你们新希望据点的所有人。

老周，站在你身边，手里拿着猎枪，检查着弹药。
陈静，在后方，组织着医疗队，准备救治伤员。
小杨，在检查着车辆，确保撤退路线畅通。
朵朵，躲在一辆装甲车后面，紧紧抱着她的毛绒兔子。
李刚，带着人，准备着攻城设备。
王工，在检查着他制造的简易火焰喷射器。
李伟，在跟他的士兵，做着最后的动员。
林小雨，在跟她的部队，分配着任务。

你站在，队伍的最前面。

你看着远处的灯塔。

灯塔，在晨雾中，若隐若现。

顶端的光，还在亮着。

发出诡异的蓝光。

你深吸一口气，然后，转过身，看着所有人。

"兄弟们！"你大声说，"今天，我们要攻入灯塔！我们要，找到先知！我们要，关掉迷雾！我们要，让世界，恢复正常！"

"你们，准备好了吗？"

所有人，都大声喊：

"准备好了！"

声音，在晨雾中，回荡。

你满意地点了点头。

然后，你转过身，指着灯塔。

"出发！"你喊。

联合部队，出发了。

一百多个人，十几辆车，朝灯塔，进发。

最终决战，开始了。`,choices:[{id:`frontal_assault`,text:`正面强攻，用火力压制`,hint:`最直接的战术。但伤亡可能会很大。`,effects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`frontal_assault`}],next:`lighthouse_outer_defense`,result:`"正面强攻！"你喊，"用火力压制！"

林小雨，举起步枪，朝天空，开了一枪。

"开火！"她喊。

所有的步枪，手枪，猎枪，机关枪，同时开火。

子弹，像雨点一样，朝灯塔，射了过去。

灯塔的外墙，被打得，火星四溅。

"冲啊！"李伟喊，带着他的士兵，朝灯塔，冲了过去。

你也，带着老周，李刚，王工，朝灯塔，冲了过去。

但是，灯塔的防御，比你们想象的，要强得多。

从灯塔的窗户里，射出来了，很多子弹。

是进化者组织的守卫。

他们，穿着黑色的制服，拿着步枪，在灯塔里，朝你们射击。

"趴下！"你喊，扑倒在地。

子弹，从你头顶，飞了过去。

几个士兵，中弹了，倒在了地上。

陈静，带着医疗队，赶紧冲上去，救治伤员。

"火力压制！"林小雨喊，"别停！"

你们的火力，继续压制着灯塔。

李伟，带着几个士兵，绕到了灯塔的侧面。

他们，用手榴弹，炸开了灯塔的一扇侧门。

"冲进去！"李伟喊。

你带着人，跟着李伟，冲进了灯塔。

灯塔里，很暗，很潮湿。

墙壁上，有很多奇怪的符号，在发出微弱的蓝光。

进化者组织的守卫，在楼梯口，组成了防线。

一场激烈的，近距离战斗，开始了。

【健康-20，理智-10】

【正面强攻开始。我方伤亡：轻伤5人，重伤2人。】

【攻入灯塔外围。】`},{id:`stealth_infiltration`,text:`潜入作战，先派小队秘密潜入`,hint:`更聪明的战术。但风险也很大。`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`stealth_infiltration`}],next:`lighthouse_outer_defense`,result:`"先派小队，秘密潜入。"你说，"从灯塔的排水系统，进去。"

老周，点了点头。

"好。"他说，"我带几个人，先潜进去。"

老周，带着李刚，王工，还有两个军方的士兵，从灯塔后面的排水系统，潜了进去。

你带着大部队，在灯塔正面，佯攻，吸引守卫的注意力。

"开火！"林小雨喊。

所有的武器，同时开火。

子弹，朝灯塔，射了过去。

灯塔的守卫，果然，被吸引到了正面。

他们，在正面的窗户里，朝你们射击。

而老周的小队，已经从排水系统，潜入了灯塔内部。

过了大约十分钟，你听到了，灯塔内部，传来了爆炸声。

是王工，用他制造的简易炸弹，炸开了守卫的防线。

"就是现在！"你喊，"冲进去！"

大部队，朝灯塔，冲了过去。

李伟，带着士兵，用手榴弹，炸开了正门。

你们，冲进了灯塔。

灯塔里，很暗，很潮湿。

老周的小队，已经解决了，大部分的守卫。

但是，还有一些守卫，在楼梯口，负隅顽抗。

一场激烈的，近距离战斗，开始了。

【理智-8，体力-20】

【潜入作战成功。我方伤亡：轻伤2人，无人重伤。】

【攻入灯塔外围。】`},{id:`negotiate_first`,text:`先尝试谈判，看看能不能和平解决`,hint:`最理想的结果。但可能性很小。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`negotiate_first`}],next:`lighthouse_outer_defense`,result:`"先尝试谈判。"你说，"看看能不能，和平解决。"

你让大部队，停在灯塔外，不要进攻。

然后，你拿起一个扩音器，朝灯塔，喊。

"里面的人听着！"你喊，"我们是幸存者联合部队！我们不想，伤害任何人！我们只是想，跟你们的首领，先知，谈谈！"

灯塔里，安静了一会儿。

然后，一个声音，从灯塔里，传了出来。

那个声音，很轻柔，很平和，但是，有一种说不出的，压迫感。

"你们想谈？"那个声音说，"好啊。你们的首领，一个人，进来谈。"

你愣住了。

一个人，进去谈？

这太危险了。

"不行！"老周说，"太危险了！"

"对。"李伟说，"这可能是陷阱。"

你看着灯塔，心里在盘算。

一个人，进去谈。

如果，能和平解决，那最好。

但是，如果是陷阱，你可能，就出不来了。

你该怎么办？

你想了想，然后说："好。我一个人，进去谈。"

"不行！"所有人，都反对。

"我必须去。"你说，"如果，能和平解决，就能避免，很多人的伤亡。"

你看着老周，说："如果，我一个小时，没有出来，你们就，强攻。"

老周，看着你，看了很久，然后，点了点头。

"好。"他说，"你小心。"

你深吸一口气，然后，朝灯塔，走了过去。

灯塔的门，自动开了。

你走了进去。

灯塔里，很暗，很潮湿。

墙壁上，有很多奇怪的符号，在发出微弱的蓝光。

你沿着楼梯，一步一步地，往上走。

不知道走了多久，你终于到达了，灯塔的顶端。

顶端，有一个房间。

房间里，有一个人，背对着你，站在那盏发光的灯前面。

他，穿着一件白色的长袍，长发披肩。

"你来了。"他说，声音很轻柔，很平和。

他慢慢地，转过身来。

你看到了他的脸。

那是一张，很年轻，很英俊的脸。

但是，他的眼睛，是纯白色的，没有瞳孔。

他就是，先知。

第一个，成功的进化者。

【理智-5】

【谈判开始。你一个人，进入了灯塔，见到了先知。】

【重要NPC：先知。第一个成功的进化者，纯白色眼睛，拥有超自然力量。】`}]},lighthouse_outer_defense:{id:`lighthouse_outer_defense`,text:`你们冲进了灯塔。

灯塔里，很暗，很潮湿。

墙壁上，有很多奇怪的符号，在发出微弱的蓝光。

进化者组织的守卫，在楼梯口，组成了防线。

他们，穿着黑色的制服，拿着步枪，朝你们射击。

"火力压制！"林小雨喊。

你们的部队，朝楼梯口，射击。

子弹，在狭窄的楼梯间里，横飞。

几个守卫，中弹了，倒在了地上。

但是，更多的守卫，从楼梯上面，冲了下来。

而且，你注意到，这些守卫，跟普通人不一样。

他们的眼睛，是淡淡的红色。

他们的动作，很快，很敏捷。

他们，好像，感觉不到疼痛。

即使，中了枪，他们也只是，顿了一下，然后，继续朝你们冲过来。

"他们，被强化了！"李伟喊，"打脑袋！只有打脑袋，才能杀死他们！"

你们，赶紧，瞄准他们的脑袋，射击。

果然，打中脑袋后，他们就，倒在了地上，不动了。

战斗，很惨烈。

楼梯间里，到处都是尸体。

有守卫的，也有你们的人的。

陈静，带着医疗队，在后方，紧张地，救治着伤员。

终于，你们，突破了，守卫的防线。

你们，沿着楼梯，往上冲。

楼梯，很长，很陡。

不知道走了多久，你们终于到达了，灯塔的顶端。

顶端，有一扇巨大的铁门。

铁门上，刻着很多奇怪的符号。

那些符号，在发出，刺眼的蓝光。

"这后面，就是，先知的房间。"李伟说，"也是，迷雾核心的所在地。"

你看着那扇铁门，心里涌起了，一股强烈的不安。

门后面，有什么？

先知，有多强？

你们，能赢吗？

你深吸一口气，然后，说："准备，破门。"

李刚，带着人，拿出了，破门锤。

王工，拿出了，他制造的，简易炸药。

你们，准备，破门而入。

最终决战的，最后阶段，即将开始。`,choices:[{id:`blast_door`,text:`用炸药破门，然后冲进去`,hint:`最直接的方法。但可能会惊动先知。`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`blast_door`}],next:`prophet_confrontation`,result:`"用炸药，破门！"你喊。

王工，把简易炸药，贴在了铁门上。

"所有人，趴下！"他喊。

所有人，都趴下了。

王工，按下了，引爆器。

"轰！"

一声巨响。

铁门，被炸开了一个大洞。

浓烟，从洞里，冒了出来。

"冲进去！"你喊。

你第一个，冲进了洞里。

老周，李伟，林小雨，跟着你，冲了进去。

房间里，很大，很明亮。

房间的中央，是那盏，巨大的，发光的灯。

那盏灯，发出，刺眼的蓝光。

在灯的前面，站着一个人。

他，穿着一件白色的长袍，长发披肩。

他，慢慢地，转过身来。

你看到了他的脸。

那是一张，很年轻，很英俊的脸。

但是，他的眼睛，是纯白色的，没有瞳孔。

他就是，先知。

第一个，成功的进化者。

"你们，终于来了。"先知说，声音很轻柔，很平和。

他看着你们，脸上，带着一丝微笑。

"我等你们，很久了。"他说。

你握紧武器，警惕地，看着他。

"你就是，先知？"你问。

先知，点了点头。

"对。"他说，"我就是，先知。进化者组织的，创始人。也是，第一个，成功的进化者。"

他指了指，那盏发光的灯。

"这就是，迷雾核心。"他说，"整个世界的迷雾，都是从这里，散发出去的。"

"你为什么，要这么做？"你问，"你为什么，要制造迷雾？为什么，要让那么多人，变成怪物？"

先知，看着你，脸上的微笑，消失了。

"因为，人类，需要进化。"他说，声音变得，很严肃，"人类，已经，停滞不前，太久了。你们，需要一个，推动力。迷雾，就是那个推动力。"

"但是，大部分人，都变成了怪物！"你喊，"他们死了！他们，痛苦地，死去了！"

"牺牲，是必要的。"先知说，"没有牺牲，就没有进化。那些，变成怪物的人，是失败者。而你们，活下来的人，是成功者。你们，已经，开始进化了。"

你看着他，心里涌起了，一股愤怒。

"你疯了！"你喊，"你把，那么多人的生命，当成了，进化的代价？"

先知，看着你，摇了摇头。

"你不明白。"他说，"总有一天，你会明白的。进化，是唯一的出路。"

他伸出手，朝那盏发光的灯，指了指。

"现在，"他说，"你们有两个选择。第一，关掉迷雾核心，让世界，恢复正常。但是，所有被感染的生物，都会死亡。包括，那些，还有人类意识的感染者。"

"第二，"他继续说，"不关掉迷雾核心，让进化，继续进行。最终，所有的人类，都会，完成进化。世界，会进入，一个新的时代。"

你看着他，又看了看，那盏发光的灯。

两个选择。

关掉迷雾，杀死所有被感染者。

或者，不关迷雾，让进化继续。

你该，怎么选？

【健康-10，理智-8】

【见到先知。了解了迷雾的完整真相。】

【重要抉择：是否关掉迷雾核心？】

【先知好感度+0（中立）】`},{id:`talk_through_door`,text:`先隔着门，跟里面的人谈谈`,hint:`更谨慎的方法。但可能会浪费时间。`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`talk_through_door`}],next:`prophet_confrontation`,result:`"先谈谈。"你说，隔着铁门，朝里面喊，"里面的人，听着！我们是幸存者联合部队！我们不想，伤害任何人！我们只是想，跟你们的首领，谈谈！"

铁门后面，安静了一会儿。

然后，一个声音，从门后面，传了出来。

那个声音，很轻柔，很平和，但是，有一种说不出的，压迫感。

"你们想谈？"那个声音说，"好啊。你们的首领，一个人，进来谈。"

你愣住了。

一个人，进去谈？

这太危险了。

"不行！"老周说，"太危险了！"

"对。"李伟说，"这可能是陷阱。"

你看着铁门，心里在盘算。

一个人，进去谈。

如果，能和平解决，那最好。

但是，如果是陷阱，你可能，就出不来了。

你想了想，然后说："好。我一个人，进去谈。"

"不行！"所有人，都反对。

"我必须去。"你说，"如果，能和平解决，就能避免，很多人的伤亡。"

你看着老周，说："如果，我一个小时，没有出来，你们就，强攻。"

老周，看着你，看了很久，然后，点了点头。

"好。"他说，"你小心。"

铁门，慢慢地，开了。

你深吸一口气，然后，走了进去。

房间里，很大，很明亮。

房间的中央，是那盏，巨大的，发光的灯。

那盏灯，发出，刺眼的蓝光。

在灯的前面，站着一个人。

他，穿着一件白色的长袍，长发披肩。

他，慢慢地，转过身来。

你看到了他的脸。

那是一张，很年轻，很英俊的脸。

但是，他的眼睛，是纯白色的，没有瞳孔。

他就是，先知。

第一个，成功的进化者。

"你来了。"先知说，声音很轻柔，很平和。

他看着你，脸上，带着一丝微笑。

"我等你，很久了。"他说。

你握紧武器，警惕地，看着他。

"你就是，先知？"你问。

先知，点了点头。

"对。"他说，"我就是，先知。进化者组织的，创始人。也是，第一个，成功的进化者。"

他指了指，那盏发光的灯。

"这就是，迷雾核心。"他说，"整个世界的迷雾，都是从这里，散发出去的。"

"你为什么，要这么做？"你问，"你为什么，要制造迷雾？为什么，要让那么多人，变成怪物？"

先知，看着你，脸上的微笑，消失了。

"因为，人类，需要进化。"他说，声音变得，很严肃，"人类，已经，停滞不前，太久了。你们，需要一个，推动力。迷雾，就是那个推动力。"

"但是，大部分人，都变成了怪物！"你喊，"他们死了！他们，痛苦地，死去了！"

"牺牲，是必要的。"先知说，"没有牺牲，就没有进化。那些，变成怪物的人，是失败者。而你们，活下来的人，是成功者。你们，已经，开始进化了。"

你看着他，心里涌起了，一股愤怒。

"你疯了！"你喊，"你把，那么多人的生命，当成了，进化的代价？"

先知，看着你，摇了摇头。

"你不明白。"他说，"总有一天，你会明白的。进化，是唯一的出路。"

他伸出手，朝那盏发光的灯，指了指。

"现在，"他说，"你有两个选择。第一，关掉迷雾核心，让世界，恢复正常。但是，所有被感染的生物，都会死亡。包括，那些，还有人类意识的感染者。"

"第二，"他继续说，"不关掉迷雾核心，让进化，继续进行。最终，所有的人类，都会，完成进化。世界，会进入，一个新的时代。"

你看着他，又看了看，那盏发光的灯。

两个选择。

关掉迷雾，杀死所有被感染者。

或者，不关迷雾，让进化继续。

你该，怎么选？

【理智-5】

【见到先知。了解了迷雾的完整真相。】

【重要抉择：是否关掉迷雾核心？】`}]},prophet_confrontation:{id:`prophet_confrontation`,text:`你看着先知，又看了看那盏发光的灯。

两个选择。

关掉迷雾，杀死所有被感染者。

或者，不关迷雾，让进化继续。

你想了很久。

然后，你做出了决定。

"我，两个都不选。"你说。

先知，看着你，愣住了。

"什么？"他问。

"我说，我两个都不选。"你说，"我不会，关掉迷雾，杀死所有被感染者。我也不会，让进化继续，让更多的人，变成怪物。"

"我会，找到第三种方法。"你说，"一种，既能关掉迷雾，又能，拯救被感染者的方法。"

先知，看着你，看了很久。

然后，他笑了。

"第三种方法？"他说，"你以为，你是谁？你以为，你能，找到，我找了几十年，都没有找到的方法？"

"我不知道。"你说，"但是，我会，尽力去试。"

先知，摇了摇头。

"太天真了。"他说，"看来，你，跟那些普通人，一样。你们，都不明白，进化的意义。"

他伸出手，朝你，挥了一下。

一股强大的力量，朝你，涌了过来。

你像是，被一辆卡车撞到了一样，飞了出去，重重地，摔在了地上。

你的胸口，痛得像是，要裂开一样。

"既然，你不明白。"先知说，声音变得，很冷，"那我就，让你，永远地，闭嘴。"

他抬起手，准备，再次攻击。

你挣扎着，从地上，爬了起来。

你握紧武器，看着先知。

你知道，你打不过他。

他是，第一个成功的进化者。

他拥有，超自然的力量。

但是，你也知道，你不能，放弃。

因为，你的身后，是你的同伴，是所有的幸存者。

你必须，挡住他。

哪怕，付出生命的代价。

"来吧。"你说，声音在发抖，但是，很坚定，"让我看看，进化者的力量，到底有多强。"

先知，看着你，眼睛里，闪过了一丝赞赏。

"你很勇敢。"他说，"但是，勇敢，救不了你。"

他再次，抬起手。

战斗，开始了。

这是一场，不公平的战斗。

先知，拥有超自然的力量。

他可以，用意念，移动物体。

他可以，发射能量弹。

他可以，制造幻觉。

而你，只有，一把武器，和，不屈的意志。

你被，一次又一次地，打倒。

但是，你又，一次又一次地，爬了起来。

你的身上，到处都是伤。

你的血，染红了，地面。

但是，你没有，放弃。

因为，你知道，你的同伴们，正在外面，等着你。

因为，你知道，所有的幸存者，都在等着你，拯救他们。

终于，你找到了，一个机会。

先知，在发射了，一次强大的能量弹后，身体，顿了一下。

他的力量，好像，不是无限的。

他也会，疲惫。

就是现在！

你用尽全身力气，朝先知，冲了过去。

你把武器，狠狠地，刺向了，先知的心脏。

武器，刺进了，先知的身体。

黑色的血，从伤口，喷了出来。

先知，看着你，眼睛里，充满了，不可置信。

"你……"他说，声音很虚弱，"你居然……伤到了我……"

他的身体，开始变得，透明。

他的力量，开始，消散。

"不……"他说，"我还不能……死……进化……还没有……完成……"

他的身体，越来越透明。

最后，他，完全消失了。

只留下了，一件白色的长袍，和，一个，闪闪发光的晶体。

你靠在墙上，大口喘着气。

你赢了。

你，打败了，先知。

但是，你也，付出了，惨重的代价。

你的身上，到处都是伤。

你差点，就死了。

但是，你活下来了。

而且，你打败了，先知。

现在，迷雾核心，就在你的面前。

你可以，关掉它了。

但是，你还记得，先知说的话。

关掉迷雾核心，所有被感染的生物，都会死亡。

包括，那些，还有人类意识的感染者。

你该，怎么办？`,choices:[{id:`shut_down_mist`,text:`关掉迷雾核心，让世界恢复正常`,hint:`最直接的选择。但是，所有被感染者都会死亡。`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`shut_down_mist`}],next:`mist_dissipated`,result:`你看着，那盏发光的灯。

你想了很久。

然后，你做出了决定。

"对不起。"你说，声音在发抖，"我必须，这么做。"

你伸出手，朝那盏发光的灯，按了下去。

灯，闪烁了几下。

然后，慢慢地，熄灭了。

房间里，变得，很暗。

你能听到，远处，传来了，很多惨叫声。

你知道，那些，被感染的生物，正在，死去。

包括，那些，还有人类意识的感染者。

包括，朵朵的父亲。

你靠在墙上，滑坐在地上。

你的眼泪，掉了下来。

你拯救了，世界。

但是，你也，杀死了，很多人。

这就是，代价。

【理智-15】

【迷雾核心已关闭。迷雾开始消散。】

【所有被感染的生物，都已死亡。】

【获得永久创伤：迷雾的代价。每次想到被感染者的死亡，理智-3。】

【重要伏笔：关掉迷雾的代价。你杀死了，很多还有人类意识的感染者。你能，原谅自己吗？】`},{id:`keep_mist_running`,text:`不关掉迷雾，先寻找第三种方法`,hint:`更理想的选择。但是，迷雾会继续，更多的人会被感染。`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`keep_mist_running`}],next:`mist_continues`,result:`你看着，那盏发光的灯。

你想了很久。

然后，你做出了决定。

"不。"你说，"我不能，这么做。我不能，杀死，那些还有人类意识的感染者。"

你收回了手。

"我会，找到第三种方法。"你说，"一种，既能关掉迷雾，又能，拯救被感染者的方法。"

你捡起了，先知留下的，那个闪闪发光的晶体。

这个晶体，可能，就是，找到第三种方法的关键。

你把晶体，放进了口袋里。

然后，你走出了房间。

你的同伴们，看到你出来了，都松了一口气。

"你没事吧？"老周问，跑了过来。

"我没事。"你说，"先知，已经被我，打败了。"

所有人，都欢呼了起来。

但是，你没有，欢呼。

因为，你知道，战斗，还没有结束。

迷雾，还在。

被感染者，还在。

你还需要，找到第三种方法。

一种，既能关掉迷雾，又能，拯救被感染者的方法。

你看着，口袋里的晶体。

你知道，这会是，一个，漫长而艰难的旅程。

但是，你不会，放弃。

因为，你要，拯救，所有人。

包括，那些，被感染的人。

【理智-10】

【先知已被打败。但是，迷雾核心，没有关闭。】

【获得物品：先知的晶体。可能是找到第三种方法的关键。】

【获得任务：寻找第三种方法。既能关掉迷雾，又能拯救被感染者。】

【重要伏笔：第三种方法。它，真的存在吗？你能，找到它吗？】`},{id:`destroy_core_completely`,text:`彻底摧毁迷雾核心，一了百了`,hint:`最极端的选择。可能会有，不可预知的后果。`,effects:[{kind:`resource`,resource:`health`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-20},{kind:`flag`,flag:`destroy_core_completely`}],next:`core_destroyed`,result:`你看着，那盏发光的灯。

你想了很久。

然后，你做出了决定。

"不管，有什么后果。"你说，"我都要，彻底摧毁它。"

你拿起武器，朝那盏发光的灯，狠狠地，砸了下去。

"砰！"

灯，碎了。

然后，一道，巨大的能量波，从灯里，爆发了出来。

你被，能量波，击中了，飞了出去，重重地，摔在了墙上。

你的胸口，痛得像是，要裂开一样。

你的眼睛，暂时失明了。

你的耳朵，暂时失聪了。

你不知道，过了多久。

你才，慢慢地，恢复了，视觉和听觉。

你看到，房间里，一片狼藉。

那盏灯，已经，完全碎了。

碎片，散落了一地。

你能听到，远处，传来了，很多惨叫声。

你知道，那些，被感染的生物，正在，死去。

但是，你也能感觉到，迷雾，正在，消散。

你挣扎着，从地上，爬了起来。

你走到，灯塔的窗户边，往外看。

你看到，迷雾，正在，慢慢地，消散。

阳光，透过迷雾，照了下来。

这是，几十天来，你第一次，看到阳光。

你看着，那缕阳光，眼泪，掉了下来。

你做到了。

你，摧毁了迷雾核心。

迷雾，正在消散。

世界，即将，恢复正常。

但是，你也，付出了，惨重的代价。

你的身体，受了重伤。

你的精神，受到了，巨大的冲击。

而且，你还，杀死了，所有被感染的生物。

包括，那些，还有人类意识的感染者。

这就是，代价。

【健康-30，理智-20】

【迷雾核心已被彻底摧毁。迷雾正在快速消散。】

【所有被感染的生物，都已死亡。】

【获得永久创伤：核心的爆发。每次想到被感染者的死亡，理智-5。】

【获得称号：迷雾的终结者。力量+5，意志力+5，所有属性+3。】

【重要伏笔：摧毁迷雾核心的后果。世界，真的能，恢复正常吗？】`}]},mist_dissipated:{id:`mist_dissipated`,text:`迷雾，消散了。

你站在灯塔的顶端，看着下面的世界。

阳光，照在了大地上。

这是，几十天来，世界，第一次，见到阳光。

你能看到，远处的城市，远处的山，远处的海。

你能看到，绿色的树，彩色的花，蓝色的天。

世界，恢复了，原来的样子。

但是，你也能看到，地上，到处都是尸体。

有被感染的怪物的尸体。

也有，被感染的人类的尸体。

他们，在迷雾消散的那一刻，都死了。

你看着那些尸体，心里涌起了，一股强烈的愧疚。

是你，杀死了他们。

虽然，你是为了，拯救世界。

但是，你还是，杀死了他们。

你的同伴们，也来到了，灯塔的顶端。

他们看着，下面的世界，都愣住了。

"迷雾……消散了……"林小雨说，声音在发抖。

"我们……成功了……"李伟说，眼睛里，含着泪。

老周，走到你身边，拍了拍你的肩膀。

"你做到了。"他说，"你拯救了，世界。"

你看着他，摇了摇头。

"不。"你说，"我没有，拯救所有人。我杀死了，很多人。"

老周，看着你，沉默了一会儿。

然后，他说："你已经，尽力了。在这个鬼地方，没有人，能做到完美。你拯救了，活下来的人。这就够了。"

你看着他，又看了看，下面的世界。

你知道，他说得对。

你已经，尽力了。

你拯救了，活下来的人。

这就够了。

但是，你也知道，那些，死去的人，会永远，留在你的心里。

他们，会提醒你，这个世界，有多么残酷。

也会提醒你，生命，有多么珍贵。

迷雾消散了。

但是，你们的故事，还没有结束。

新的世界，正在，等待着你们。

新的挑战，正在，等待着你们。

你们，需要，重建这个世界。

你们，需要，建立一个，更美好的未来。

而这，只是，一个开始。`,choices:[{id:`return_to_settlement`,text:`回到据点，开始重建`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`return_to_settlement`}],next:`start`,result:`"我们回去吧。"你说，"回到据点，开始重建。"

所有人，都点了点头。

你们，走下灯塔，回到了，你们的车上。

然后，你们，开车，回到了，你们的据点。

据点，还在。

虽然，有些破损，但是，主体结构，还完好。

你们，开始了，重建工作。

李刚，带着人，修复了，破损的围墙和建筑。

张大爷，带着人，开辟了，更多的农田。

王工，带着人，修复了，发电设备和抽水设备。

陈静，带着人，建立了，一个，更大的医疗室。

小杨，带着人，修复了，所有的车辆。

老周，带着人，建立了，巡逻队和警戒系统。

林小雨，带着希望号安全区的人，回到了，希望号安全区，开始了，他们的重建。

李伟，带着军方残余部队，开始了，清理城市，和，建立秩序的工作。

而你，作为，联合部队的首领，开始了，协调各方，和，规划未来的工作。

迷雾消散了。

但是，你们的工作，才刚刚开始。

你们，需要，重建这个世界。

你们，需要，建立一个，更美好的未来。

而你，会带领着，所有人，走向，那个未来。

【理智+5】

【回到据点，开始重建。】

【据点升级为基地。人口增加到50+人。】

【获得建筑：修复的围墙、更多的农田、更大的医疗室、修复的发电设备、巡逻队。】

【获得状态：新世界的建造者。迷雾已消散，世界正在恢复。】

【老周好感度+10】

【陈静好感度+10】

【小杨好感度+10】

【李刚好感度+10】

【王工好感度+10】

【张大爷好感度+10】

【林小雨好感度+15】

【李伟好感度+15】

【重要伏笔：重建世界。你们，能建立一个，更美好的未来吗？】`}]},mist_continues:{id:`mist_continues`,text:`迷雾，还在继续。

你站在灯塔的顶端，看着下面的世界。

迷雾，还是那么浓。

但是，你知道，先知，已经被你打败了。

进化者组织，已经，群龙无首。

而且，你还有，先知留下的晶体。

那个晶体，可能，就是，找到第三种方法的关键。

你的同伴们，也来到了，灯塔的顶端。

他们看着你，都很疑惑。

"迷雾……还在？"林小雨问。

"对。"你说，"我没有，关掉迷雾核心。"

"为什么？"李伟问，"我们，不是，来关掉迷雾的吗？"

你看着他们，认真地说："因为，关掉迷雾核心，所有被感染的生物，都会死亡。包括，那些，还有人类意识的感染者。"

"我不能，杀死他们。"你说，"我要，找到第三种方法。一种，既能关掉迷雾，又能，拯救被感染者的方法。"

所有人，都看着你，沉默了。

然后，老周，点了点头。

"我支持你。"他说，"你说得对。我们不能，放弃，那些被感染的人。"

"我也支持你。"陈静说，"作为一个医生，我更不能，放弃，任何一个，还有救的病人。"

"我也支持你。"小杨说，"我们一起，找第三种方法。"

所有人，都表示，支持你。

你看着他们，心里涌起了，一股感动。

有他们在，你相信，你一定，能找到第三种方法。

你拿出了，先知留下的晶体。

晶体，在你的手里，发出，微弱的蓝光。

你看着它，心里涌起了，一股期待。

这个晶体，可能，就是，关键。

"我们回去吧。"你说，"回到据点，开始研究，这个晶体。我们一定要，找到第三种方法。"

所有人，都点了点头。

你们，走下灯塔，回到了，你们的车上。

然后，你们，开车，回到了，你们的据点。

迷雾，还在继续。

但是，你们，已经，看到了希望。

第三种方法，一定，存在。

而你们，一定会，找到它。`,choices:[{id:`research_crystal`,text:`回到据点，开始研究先知的晶体`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`research_crystal`}],next:`start`,result:`你们，回到了据点。

你把，先知留下的晶体，交给了，陈静和王工。

"你们，研究一下这个晶体。"你说，"它可能，就是，找到第三种方法的关键。"

陈静和王工，接过晶体，开始了，研究。

他们，用了，各种方法，分析这个晶体。

他们，检测了，它的成分。

他们，分析了，它的能量。

他们，尝试了，各种方法，激活它。

研究的过程，很艰难。

这个晶体，太神秘了。

它的成分，不是，地球上，任何已知的物质。

它的能量，很奇怪，像是，活的一样。

但是，陈静和王工，没有放弃。

他们，夜以继日地，研究着。

终于，在第七天，他们有了，重大发现。

"首领！"陈静，找到了你，兴奋地说，"我们发现了！这个晶体，里面，储存着，进化者组织的，所有研究资料！"

"真的？"你问，也很兴奋。

"对！"王工说，"我们，已经，破解了，一部分资料。里面，有关于迷雾的，完整的研究数据。还有，关于，治愈感染的，研究方向！"

你看着他们，心里涌起了，一股强烈的喜悦。

治愈感染的，研究方向！

这意味着，第三种方法，真的，存在！

"太好了！"你说，"你们，能研究出，治愈感染的方法吗？"

"应该可以。"陈静说，"但是，需要时间。而且，还需要，一些特殊的材料和设备。"

"需要什么？"你问，"我们，去找。"

陈静，列出了，一个清单。

上面，有很多，特殊的材料和设备。

有些，在废弃的医院和实验室里，能找到。

有些，需要，从进化者组织的，其他据点里，获取。

你看着清单，点了点头。

"好。"你说，"我们，分头去找。一定要，找到，所有需要的材料和设备。"

你组织了，几支搜索队，分头行动。

老周，带着一队人，去废弃的医院和实验室，找材料。

李伟，带着一队人，去进化者组织的，其他据点，找设备。

林小雨，带着希望号安全区的人，也加入了，搜索行动。

而你，留在据点，协调各方，和，等待结果。

搜索的过程，很艰难。

但是，你们，没有放弃。

终于，在第十五条，所有的材料和设备，都找齐了。

陈静和王工，开始了，最后的研究。

他们，根据，晶体里的资料，和，找到的材料和设备，开始了，制造治愈感染的药物。

制造的过程，很艰难。

失败了，一次又一次。

但是，他们，没有放弃。

终于，在第三十天，他们，成功了。

他们，制造出了，第一支，治愈迷雾感染的药物。

"首领！"陈静，找到了你，兴奋地说，"我们成功了！我们，制造出了，治愈感染的药物！"

你看着，她手里的，那支小小的试管，心里涌起了，一股强烈的喜悦。

你们，做到了。

你们，找到了，第三种方法。

一种，既能关掉迷雾，又能，拯救被感染者的方法。

现在，你们，可以，拯救，所有被感染的人了。

【理智+3】

【重大突破：成功制造出治愈迷雾感染的药物。】

【获得物品：治愈药物x10。（可以治愈迷雾感染）】

【获得任务：用治愈药物，拯救被感染者，然后关掉迷雾。】

【陈静好感度+30】

【王工好感度+30】

【老周好感度+15】

【李伟好感度+15】

【林小雨好感度+15】

【重要伏笔：治愈药物。它，真的能，治愈所有被感染者吗？你们，能，拯救所有人吗？】`}]},core_destroyed:{id:`core_destroyed`,text:`迷雾核心，被彻底摧毁了。

你站在灯塔的顶端，看着下面的世界。

迷雾，正在，快速地消散。

阳光，透过迷雾，照了下来。

这是，几十天来，世界，第一次，见到阳光。

但是，你也能看到，地上，到处都是尸体。

有被感染的怪物的尸体。

也有，被感染的人类的尸体。

他们，在核心被摧毁的那一刻，都死了。

而且，你还能感觉到，空气中，弥漫着，一股，奇怪的能量。

那是，核心被摧毁时，爆发出来的能量。

那股能量，正在，影响着，周围的一切。

你不知道，那股能量，会带来，什么后果。

你的同伴们，也来到了，灯塔的顶端。

他们看着，下面的世界，都愣住了。

"迷雾……消散了……"林小雨说，声音在发抖。

"但是……"李伟说，皱着眉头，"这股能量，不对劲。"

你也，感觉到了。

这股能量，很奇怪。

它，像是，在改变着，什么。

你看着，口袋里的，一块核心的碎片。

碎片，还在，发出，微弱的光。

你突然，有一种，不好的预感。

彻底摧毁核心，可能，不是，一个好主意。

可能，会有，不可预知的后果。

但是，现在，说什么，都晚了。

核心，已经，被摧毁了。

迷雾，正在消散。

世界，正在，恢复。

但是，那股奇怪的能量，也在，扩散。

你不知道，未来，会发生什么。

你只知道，你们，必须，面对，即将到来的，一切。

迷雾消散了。

但是，你们的故事，还没有结束。

新的世界，新的挑战，正在，等待着你们。`,choices:[{id:`face_new_world`,text:`面对新世界，准备迎接新的挑战`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`face_new_world`}],next:`start`,result:`"不管，未来，会发生什么。"你说，"我们，都要，面对它。"

你看着，你的同伴们。

"我们，已经，经历了，太多的苦难。"你说，"但是，我们，都活下来了。未来，不管，有什么挑战，我们，都能，一起面对。"

所有人，都点了点头。

你们，走下灯塔，回到了，你们的车上。

然后，你们，开车，回到了，你们的据点。

据点，还在。

虽然，有些破损，但是，主体结构，还完好。

你们，开始了，重建工作。

但是，你们很快，就发现了，一些，奇怪的事情。

首先，是那些，被核心能量，影响到的动物。

它们，变得，很奇怪。

有些，变得，很大。

有些，变得，很凶猛。

有些，甚至，拥有了，特殊的能力。

然后，是那些，幸存下来的人类。

他们中，有些人，也发生了，变化。

有些人，变得，更强壮。

有些人，变得，更聪明。

有些人，甚至，拥有了，超自然的能力。

你意识到，核心被摧毁时，爆发出来的能量，改变了，这个世界。

它，让一些动物，发生了变异。

它，让一些人类，获得了，超能力。

这个世界，已经，不是，原来的世界了。

它，变成了，一个，全新的世界。

一个，有变异动物，有超能力者的世界。

你看着，这个，全新的世界，心里涌起了，一股，复杂的感觉。

你摧毁了迷雾。

但是，你也，改变了世界。

这个世界，现在，充满了，新的机遇，和，新的挑战。

而你们，需要，在这个，全新的世界里，活下去。

并且，建立一个，更美好的未来。

【理智-5】

【核心被摧毁。迷雾消散。但是，核心能量改变了世界。】

【世界变化：一些动物发生了变异，一些人类获得了超能力。】

【据点升级为基地。人口增加到50+人。】

【获得状态：新世界的探索者。世界已经改变，充满了新的机遇和挑战。】

【获得称号：世界的改变者。所有属性+5，超能力潜力+100%。】

【重要伏笔：新世界。变异动物，超能力者。你们，能在这个，全新的世界里，建立一个，更美好的未来吗？】`}]}},Dl=[{id:`phase6_evolutionist_remnants`,text:`你们在搜索的时候，遇到了一群人。

他们，穿着黑色的制服，手里拿着武器。

是进化者组织的残余。

大约，有十几个人。

为首的，是一个年轻的女人，大约二十多岁，穿着黑色的制服，手里拿着一把步枪。

她看到你们，举起了武器。

"你们是什么人？"她问，声音很冷。

"我们是幸存者联合部队。"你说，"先知，已经被我们打败了。进化者组织，已经，完了。"

那个女人，看着你，愣住了。

"先知……死了？"她问，声音在发抖。

"对。"你说，"他死了。"

那个女人，沉默了很久。

然后，她放下了武器。

"既然，先知死了。"她说，"那我们，也没有，继续战斗的理由了。"

她看着你，认真地说："我们，投降。我们，愿意，加入你们。"

你看着她，心里在盘算。

进化者组织的残余。

他们，可能，有很多，关于进化者组织的情报。

而且，他们，都是，经过强化的。

他们，比普通人，更强壮，更敏捷。

如果，他们，真的，愿意，加入你们。

那对你们，会是，很大的帮助。

但是，你也，不能，完全相信他们。

毕竟，他们，曾经是，进化者组织的人。

你该，怎么办？`,minDay:48,maxTriggers:1,weight:6,choices:[{id:`accept_remnants`,text:`接受他们的投降，让他们加入`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`accepted_remnants`}],result:`"好。"你说，"我们接受，你们的投降。但是，你们必须，遵守我们的规则。而且，你们必须，接受，我们的监视。"

那个女人，点了点头。

"好。"她说，"我们，愿意，接受，你们的规则和监视。"

她转过身，对她的手下说："放下武器。从今天起，我们，就是，他们的人了。"

她的手下，都放下了武器。

你看着他们，点了点头。

"跟我们走吧。"你说，"我带你们，回我们的据点。"

他们，跟着你们，回到了，据点。

你给他们，安排了住处，和食物。

但是，你也，安排了人，监视着他们。

那个女人，找到了你。

"我叫，黑鸦。"她说，"我以前，是进化者组织的，一个小队长。"

"黑鸦？"你问。

"对。"她说，"这是，我的代号。在进化者组织里，我们，都不用，真名。"

她看着你，认真地说："我知道，你们，不信任我们。但是，我可以，向你们证明，我们的忠诚。"

"而且，"她又说，"我知道，很多，关于进化者组织的情报。包括，他们的，其他据点，和，研究资料。"

你看着她，心里涌起了，一股喜悦。

进化者组织的，其他据点，和，研究资料。

这对你们，太重要了。

"好。"你说，"我相信你。但是，你必须，用行动，证明，你的忠诚。"

黑鸦，点了点头。

"我会的。"她说。

【理智-5】

【进化者组织残余，加入了你们。共12人。首领：黑鸦。】

【据点人口：增加到30+人。】

【获得情报：进化者组织的其他据点位置，和研究资料存放地点。】

【获得能力：强化战士。黑鸦和她的手下，都是经过强化的，比普通人更强壮，更敏捷。】

【黑鸦好感度+20】

【重要伏笔：进化者组织残余。他们，真的，会忠诚吗？他们，会给你们，带来，什么？】`,next:`__return__`},{id:`reject_remnants`,text:`拒绝他们，让他们离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`"对不起。"你说，"我们，不能，接受，你们的投降。你们，走吧。"

黑鸦，看着你，愣住了。

"为什么？"她问，"我们，已经，放下武器了。我们，愿意，加入你们。"

"因为，我们，不能，完全相信你们。"你说，"毕竟，你们，曾经是，进化者组织的人。我们，不能，冒险。"

黑鸦，看着你，沉默了很久。

然后，她点了点头。

"好。"她说，"我理解，你们的顾虑。"

她转过身，对她的手下说："我们走。"

她的手下，都跟着她，离开了。

你看着，他们离开的方向，心里涌起了，一股复杂的感觉。

你拒绝了，他们。

你不知道，你的决定，是对，还是错。

但是，你知道，在这个鬼地方，小心，总是，没错的。

【理智-3】

【拒绝了进化者组织残余。他们，离开了。】

【伏笔：黑鸦和她的手下。他们，会去哪里？他们，会成为，你们的朋友，还是，敌人？】`,next:`__return__`},{id:`test_remnants`,text:`先考验他们一下，看看他们是不是真的投降`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`tested_remnants`}],result:`"在你们，正式加入之前。"你说，"我想，先考验，你们一下。"

黑鸦，看着你，点了点头。

"好。"她说，"你想，怎么考验我们？"

你想了想，然后说："我们，有一个，危险的任务。需要，有人，去进化者组织的，一个据点，偷取，一些，重要的资料。我想，让你们，去做这个任务。"

黑鸦，看着你，沉默了一会儿。

然后，她点了点头。

"好。"她说，"我们，去。"

她带着，她的手下，出发了。

你安排了，老周，带着人，在后面，暗中监视。

如果，黑鸦他们，有什么，不轨的举动。

老周，就会，立刻，采取行动。

黑鸦他们，去了三天。

第三天，他们，回来了。

而且，他们，真的，偷回了，那些，重要的资料。

老周，也回来了。

他告诉你，黑鸦他们，在整个任务过程中，都很忠诚。

他们，没有，任何，不轨的举动。

而且，他们，在任务中，表现得，很勇敢，很专业。

你看着，黑鸦，和，她带回来的资料，心里涌起了，一股喜悦。

他们，通过了考验。

他们，是真的，愿意，投降。

"好。"你说，"你们，通过了考验。从今天起，你们，就是，我们的人了。"

黑鸦，看着你，点了点头。

"谢谢。"她说，"我们，不会，让你失望的。"

【理智-8】

【进化者组织残余，通过了考验，正式加入。共12人。首领：黑鸦。】

【据点人口：增加到30+人。】

【获得重要资料：进化者组织的研究资料。】

【获得能力：强化战士。黑鸦和她的手下，都是经过强化的。】

【黑鸦好感度+30】

【老周好感度+10】

【重要伏笔：进化者组织的研究资料。里面，有什么？它，能帮助你们，什么？】`,next:`__return__`}]},{id:`phase6_scientist_join`,text:`李伟，带着一个陌生人，回到了据点。

"首领。"李伟说，"我在搜索的时候，找到了这个人。他说，他是一个科学家。"

你看着那个陌生人。

他大约五十多岁，穿着一件破旧的白大褂，戴着一副眼镜，头发很乱，看起来很憔悴。

但是，他的眼睛，很亮，很有神。

"你好。"他说，推了推眼镜，"我叫，陈博士。我以前，是一个，生物学家。迷雾来的时候，我正在，实验室里，做研究。"

"我在实验室里，躲了，几十天。"他说，"直到，你们的人，找到了我。"

你看着他，心里涌起了，一股喜悦。

生物学家。

这是一个，很宝贵的人才。

有了他，你们，就能，更好地，研究迷雾，和，治愈感染。

"你愿意，加入我们吗？"你问。

陈博士，看着你，点了点头。

"当然愿意。"他说，"我已经，一个人，待了，几十天了。我很想，加入，一个团体。而且，我也，很想，为，对抗迷雾，贡献，我的力量。"

你看着他，笑了。

"欢迎你，加入我们。"你说。

陈博士，也笑了。

然后，他像是，突然想起了什么。

"对了。"他说，"我在实验室里，做了，一些，关于迷雾的研究。我有，一些，很重要的发现。"

"什么发现？"你问，很感兴趣。

陈博士，看着你，认真地说："我发现，迷雾，不是，自然现象。它，是一种，人造的，基因病毒。它，会改变，人类的基因。大部分人，无法承受，基因改变的痛苦，就变成了，怪物。但是，少数人，能承受，基因改变，就会，获得，超能力。"

你看着他，心里涌起了，一股惊讶。

人造的，基因病毒。

改变人类的基因。

这和，先知说的，差不多。

但是，陈博士，说得，更详细。

"而且，"陈博士又说，"我还发现，这种基因病毒，是可以，被中和的。只要，找到，正确的抗体，就能，中和，这种病毒，让被感染的人，恢复正常。"

你看着他，心里涌起了，一股强烈的喜悦。

中和病毒的抗体。

这意味着，被感染的人，是可以，被治愈的！

"你能，制造出，这种抗体吗？"你问，很兴奋。

"应该可以。"陈博士说，"但是，需要时间，和，合适的实验室，和，材料。"

"没问题。"你说，"你需要什么，我们，都给你找。"

陈博士，看着你，点了点头。

"好。"他说，"那我们，开始吧。"`,minDay:50,maxTriggers:1,weight:5,choices:[{id:`support_scientist`,text:`全力支持陈博士的研究`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`supported_scientist`}],result:`"好。"你说，"我们，全力支持，你的研究。"

你给陈博士，安排了，一个，专门的实验室。

你让王工，帮他，制造了，一些，实验设备。

你让老周，带着人，出去，找他需要的，材料。

你让陈静，给他，当助手。

你自己，也经常，去实验室，帮忙。

陈博士，很感动。

"谢谢你们。"他说，"我一定，不会，让你们失望的。"

接下来的日子里，陈博士，夜以继日地，研究着。

他，分析了，迷雾的成分。

他，研究了，被感染者的，基因变化。

他，尝试了，各种方法，制造抗体。

研究的过程，很艰难。

失败了，一次又一次。

但是，陈博士，没有放弃。

终于，在第二十天，他，成功了。

他，制造出了，第一支，能中和迷雾病毒的抗体。

"首领！"陈博士，找到了你，兴奋地说，"我成功了！我，制造出了，抗体！"

你看着，他手里的，那支小小的试管，心里涌起了，一股强烈的喜悦。

你们，做到了。

你们，制造出了，能治愈迷雾感染的抗体。

现在，你们，可以，拯救，所有被感染的人了。

"太好了！"你说，"我们，赶紧，测试一下，它的效果。"

你们，找了一个，被感染的动物，做了测试。

结果，很成功。

那个，被感染的动物，在注射了抗体后，慢慢地，恢复了正常。

它的眼睛，从红色，变回了，正常的颜色。

它的行为，从狂暴，变回了，正常的状态。

抗体，真的，有效！

你们，成功了！

【理智+3，体力-20】

【重大突破：陈博士成功制造出能中和迷雾病毒的抗体。】

【获得物品：治愈抗体x10。（可以治愈迷雾感染）】

【获得任务：用治愈抗体，拯救被感染者，然后关掉迷雾。】

【陈博士好感度+30】

【陈静好感度+20】

【王工好感度+15】

【老周好感度+10】

【获得称号：科学的拯救者。智力+5，智慧+5，所有研究速度+50%。】

【重要伏笔：治愈抗体。它，真的能，治愈所有被感染者吗？你们，能，拯救所有人吗？】`,next:`__return__`}]},{id:`phase6_massive_beast_wave`,text:`一天晚上，老周，急匆匆地，找到了你。

"首领！"他说，脸色很难看，"不好了！大规模的兽潮，来了！"

你赶紧，跑到瞭望塔上，拿起望远镜，看了看。

然后，你愣住了。

远处，密密麻麻的，全是，被感染的怪物。

至少，有几百只。

不，可能，有上千只。

它们，朝你们的据点，冲了过来。

这是，你们见过的，最大规模的兽潮。

"这是，怎么回事？"你问，"为什么，突然，来了，这么多怪物？"

"我不知道。"老周说，"但是，我猜，可能，跟灯塔有关。先知被打败了，迷雾核心，不稳定了。这些怪物，可能，感觉到了，危险，所以，疯狂地，进攻。"

你看着，那些，越来越近的怪物，心里涌起了，一股强烈的紧张。

上千只怪物。

而你们，只有，几十个人。

虽然，你们的据点，很坚固。

但是，面对，上千只怪物，你们，能守住吗？

你深吸一口气，然后，说："所有人，各就各位！准备，战斗！"

所有人，都行动了起来。

老周，带着巡逻队，在围墙上，布置防线。

李刚，带着人，加固了，围墙和大门。

王工，准备好了，他的火焰喷射器，和，投石机。

陈静，带着医疗队，在后方，准备救治伤员。

小杨，准备好了，车辆，作为，最后的撤退手段。

黑鸦，带着她的手下，也加入了，战斗。

他们，都是，经过强化的。

他们，比普通人，更强壮，更敏捷。

他们，将是，这场战斗的，主力。

你站在，围墙的最高处，看着，那些，越来越近的怪物。

你握紧了武器。

这场战斗，将是，你们，经历过的，最艰难的战斗。

但是，你们，不能输。

因为，你们的身后，是你们的家，是你们的同伴。

你们，必须，守住。

兽潮，到了。

战斗，开始了。`,minDay:52,maxTriggers:1,weight:5,choices:[{id:`defend_to_death`,text:`死守据点，战斗到最后一刻`,effects:[{kind:`resource`,resource:`health`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`defend_to_death`}],result:`"死守据点！"你喊，"战斗到，最后一刻！"

兽潮，撞上了，你们的围墙。

"开火！"你喊。

所有的武器，同时开火。

步枪，手枪，猎枪，机关枪，火焰喷射器，投石机。

子弹，火焰，石头，像雨点一样，朝怪物，射了过去。

最前面的怪物，纷纷倒下。

但是，后面的怪物，继续，冲了上来。

它们，开始，攀爬围墙。

它们，开始，撞击大门。

"打脑袋！只有打脑袋，才能杀死它们！"老周喊。

你们，赶紧，瞄准它们的脑袋，射击。

果然，打中脑袋后，它们就，倒在了地上，不动了。

战斗，很惨烈。

围墙下，到处都是，怪物的尸体。

但是，怪物，太多了。

它们，前赴后继，不停地，进攻。

终于，有一只怪物，爬上了围墙。

它朝你，扑了过来。

你握紧武器，朝它的脑袋，狠狠地，砸了下去。

它的脑袋，被砸碎了。

它，倒在了地上。

但是，更多的怪物，爬上了围墙。

黑鸦，带着她的手下，冲了上来。

他们，都是，经过强化的。

他们，比普通人，更强壮，更敏捷。

他们，用近战武器，跟怪物，搏斗。

他们，很勇猛。

但是，怪物，太多了。

你们，渐渐，撑不住了。

就在，最危急的时刻，你听到了，发动机的声音。

是援军！

林小雨，带着希望号安全区的援军，到了。

李伟，带着军方残余部队，也到了。

他们，从怪物的后方，发起了，进攻。

怪物，被前后夹击了。

它们，开始，混乱了。

你们，趁机，发起了，反攻。

终于，在黎明时分，最后一只怪物，被杀死了。

战斗，结束了。

你们，赢了。

但是，你们，也付出了，惨重的代价。

你们的人，轻伤了，十几个。

重伤了，五个。

牺牲了，三个。

围墙，也被破坏了，好几处。

但是，你们，守住了。

你们，打败了，大规模的兽潮。

【健康-30，理智-15】

【成功抵御大规模兽潮。击杀怪物800+只。】

【我方伤亡：轻伤12人，重伤5人，牺牲3人。】

【围墙多处受损，需要修复。】

【获得战利品：怪物材料x100（可以用来制造武器和装备）。】

【获得称号：兽潮的征服者。力量+5，耐力+5，意志力+5，所有战斗属性+3。】

【老周好感度+20】

【黑鸦好感度+30】

【林小雨好感度+25】

【李伟好感度+25】

【重要伏笔：大规模兽潮。它，为什么，突然，来了？跟灯塔，有关系吗？】`,next:`__return__`},{id:`retreat_and_regroup`,text:`暂时撤退，保存实力，再图反攻`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`retreat_and_regroup`}],result:`"撤！"你喊，"暂时撤退，保存实力！"

你让小杨，准备好了车辆。

然后，你让所有人，有序地，撤退。

老周，带着人，在后面，掩护。

黑鸦，带着她的手下，也在后面，掩护。

你们，边打边退。

终于，你们，成功地，撤出了据点。

你们，开车，朝希望号安全区，驶去。

林小雨，已经，接到了，你们的求救。

她，在安全区的门口，等着你们。

"快进来！"她喊，"我已经，准备好了，住处和食物。"

你们，开车，进入了，希望号安全区。

你们，暂时，在希望号安全区，安顿了下来。

你看着，远处的，你们的据点。

那里，已经，被怪物，占领了。

你的心里，涌起了，一股，强烈的不甘。

但是，你也知道，你们，做了，正确的选择。

如果，你们，死守据点。

你们，可能，都会死。

而现在，你们，保存了实力。

你们，还可以，再图反攻。

"首领。"老周，走到你身边，说，"我们，什么时候，反攻？"

你看着，远处的据点，想了想，然后说："等我们，休整好了，等援军，到齐了。我们，就反攻。"

老周，点了点头。

"好。"他说，"我等着，那一天。"

接下来的几天，你们，在希望号安全区，休整。

林小雨，给你们，提供了，食物和住处。

陈静，带着医疗队，救治了，伤员。

李伟，也带着军方残余部队，赶到了，希望号安全区。

你们，集结了，所有的力量。

然后，你们，发起了，反攻。

你们，兵分三路，朝据点，发起了，进攻。

怪物，没有想到，你们，会这么快，反攻。

它们，被打了，一个措手不及。

经过，一天的战斗，你们，成功地，夺回了，据点。

你们，赢了。

【理智-10】

【暂时撤退，保存了实力。在希望号安全区，休整了几天。】

【集结了所有力量，发起反攻，成功夺回据点。】

【我方伤亡：轻伤5人，重伤2人，无人牺牲。】

【据点被怪物破坏，需要大量修复。】

【获得战利品：怪物材料x50。】

【老周好感度+15】

【林小雨好感度+20】

【李伟好感度+20】

【重要伏笔：暂时撤退。你们，保存了实力，成功反攻。但是，据点，被破坏了。】`,next:`__return__`}]},{id:`phase6_lighthouse_underground_lab`,text:`你们在灯塔里，搜索的时候，发现了一个秘密。

在灯塔的地下室，有一个，隐藏的入口。

入口后面，是一个，巨大的地下实验室。

你们，走了进去。

实验室里，很大，很明亮。

有很多，先进的实验设备。

有很多，培养皿，和，试管。

还有，很多，被关在笼子里的，实验体。

那些实验体，有动物，也有，人类。

他们，都被，迷雾病毒，感染了。

他们，都在，痛苦地，挣扎着。

你看着他们，心里涌起了，一股强烈的愤怒和悲伤。

进化者组织，居然，用活人，做实验。

这太，残忍了。

陈静，也很愤怒。

"这些人，太，残忍了。"她说，"他们，居然，用活人，做实验。"

陈博士，看着，那些实验设备，和，实验记录，很兴奋。

"这些，都是，宝贵的资料。"他说，"有了这些资料，我们，就能，更快地，制造出，治愈抗体。"

你看着他，点了点头。

"好。"你说，"你，和陈静，王工，一起，把这些资料，和设备，都搬回去。"

然后，你看着，那些，被关在笼子里的实验体。

"这些人，怎么办？"你问。

陈静，看着他们，想了想，然后说："如果，我们，已经，制造出了，治愈抗体。我们，可以，试试，给他们，注射。如果，有效，他们，就能，恢复正常。"

你看着，那些，痛苦的实验体，点了点头。

"好。"你说，"我们，试试。"`,minDay:55,maxTriggers:1,weight:5,choices:[{id:`rescue_experiments`,text:`用治愈抗体，拯救这些实验体`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`rescue_experiments`}],result:`"好。"你说，"我们，用治愈抗体，拯救，这些实验体。"

陈静，拿出了，治愈抗体。

她，先给，一个，被感染的动物，注射了，抗体。

然后，你们，静静地，等待着。

过了，大约一个小时。

那个，被感染的动物，慢慢地，恢复了正常。

它的眼睛，从红色，变回了，正常的颜色。

它的行为，从狂暴，变回了，正常的状态。

抗体，有效！

你们，都很兴奋。

然后，你们，开始，给所有的实验体，注射抗体。

动物，很快，就恢复了正常。

人类，恢复得，慢一些。

但是，过了，几个小时，他们，也都，慢慢地，恢复了正常。

他们，睁开眼睛，看着，周围的一切，都很迷茫。

"我……我在哪里？"一个，年轻的男人，问。

"你们，在灯塔的地下实验室。"你说，"你们，被进化者组织，抓来，做实验。但是，现在，你们，自由了。"

那个男人，看着你，眼睛里，充满了，感激。

"谢谢……"他说，"谢谢你，救了我们。"

其他的实验体，也都，纷纷，向你们，道谢。

你看着他们，心里涌起了，一股温暖。

你们，拯救了，他们。

这比，任何胜利，都更，有意义。

这些实验体，一共有，二十多个人。

他们，都愿意，加入你们。

他们中，有科学家，有医生，有工程师，有士兵。

他们，都是，很宝贵的人才。

你们的力量，大大地，增强了。

【理智+5】

【成功拯救了所有实验体。共20+人。】

【据点人口：增加到70+人。】

【获得大量人才：科学家、医生、工程师、士兵。】

【获得重要资料：进化者组织的完整研究资料。】

【获得大量设备：先进的实验设备。】

【陈静好感度+20】

【陈博士好感度+20】

【获得称号：生命的拯救者。魅力+5，智慧+5，所有NPC好感度获取+30%。】

【重要伏笔：被拯救的实验体。他们，会给你们，带来，什么？】`,next:`__return__`},{id:`only_take_equipment`,text:`只带走资料和设备，不拯救实验体`,effects:[{kind:`resource`,resource:`sanity`,delta:-10}],result:`"我们，只带走，资料和设备。"你说，"这些实验体，已经，没救了。"

陈静，看着你，愣住了。

"但是，他们，还活着。"她说，"我们，不能，放弃他们。"

"我们，没有，治愈抗体。"你说，"我们，救不了他们。而且，带着他们，也是，累赘。"

陈静，看着你，眼睛里，充满了，失望。

"我没想到，你是，这样的人。"她说，然后，转身，离开了。

你看着她离开的方向，心里涌起了，一股愧疚。

但是，你也知道，你说的，是事实。

你们，没有，治愈抗体。

你们，救不了，这些实验体。

你们，只能，带走，资料和设备。

你让王工，带着人，把资料和设备，都搬上了车。

然后，你们，离开了，地下实验室。

走的时候，你回头看了一眼。

那些实验体，还在，笼子里，痛苦地，挣扎着。

你打了个寒颤，加快了脚步。

你知道，你做了，一个，残酷的决定。

但是，在这个鬼地方，有时候，你必须，做出，残酷的决定。

【理智-10】

【带走了进化者组织的完整研究资料，和，先进的实验设备。】

【没有拯救实验体。他们，还在笼子里。】

【陈静好感度-20】

【获得永久创伤：被遗弃的实验体。每次想到他们，理智-3。】

【伏笔：被遗弃的实验体。他们，会活下来吗？如果，他们活下来了，他们，会恨你吗？】`,next:`__return__`}]},{id:`phase6_unite_government`,text:`迷雾消散后（或者，先知被打败后），世界，进入了，一个新的时代。

但是，混乱，也随之而来。

各个幸存者团体，各自为政。

有些，甚至，为了，争夺资源和地盘，发生了，冲突。

你意识到，必须，建立一个，统一的秩序。

否则，世界，会陷入，更大的混乱。

你，召集了，所有主要幸存者团体的首领。

希望号安全区的，赵明。
雾中镇的，赵建国。
军方残余的，李伟。
还有，其他，一些，小团体的首领。

你们，在你们的据点，召开了，一次会议。

会议的主题，是：建立联合政府，统一秩序，重建世界。

会议，开了，三天。

争论，很激烈。

各个团体，都有，自己的利益，和，诉求。

但是，最终，你们，还是，达成了，协议。

你们，决定，建立，一个联合政府。

联合政府，由，各个团体的代表，组成。

重大决策，由，联合政府，集体讨论，投票决定。

各个团体，保持，一定的自治权。

但是，必须，遵守，联合政府，制定的，统一规则。

而你，因为，在对抗迷雾的战斗中，立下了，最大的功劳。

被，所有人，一致推举为，联合政府的，第一任，最高领袖。

你看着，所有人，信任的目光。

你知道，你的肩上，担子，更重了。

你，不仅，要带领，你的团体。

你还要，带领，所有的幸存者，重建这个世界。

这是，一个，艰巨的任务。

但是，你相信，你能，做到。

因为，你不是，一个人。

你的身边，有，很多，可靠的同伴。

还有，所有，渴望和平，渴望重建的，幸存者。

你们，一定，能，建立一个，更美好的世界。`,minDay:58,maxTriggers:1,weight:4,choices:[{id:`accept_leadership`,text:`接受推举，担任联合政府最高领袖`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`accept_leadership`}],result:`"好。"你说，"我接受，大家的推举。我愿意，担任，联合政府的，第一任，最高领袖。"

所有人，都鼓起掌来。

你站起来，看着，所有人，认真地说：

"我知道，这个担子，很重。但是，我相信，只要，我们，团结一心，我们，就一定，能，重建这个世界，建立一个，更美好的未来。"

"我承诺，我会，尽我最大的努力，为，所有的幸存者，服务。我会，公平，公正，地，处理，所有的事情。我会，带领大家，走向，一个，更光明的，未来。"

所有人，都，再次，鼓起掌来。

他们的眼睛里，充满了，信任，和，期待。

联合政府，正式成立了。

你，成为了，第一任，最高领袖。

接下来的日子里，你，带领着，联合政府，开始了，重建世界的，工作。

你们，制定了，统一的规则，和，法律。

你们，建立了，统一的，货币，和，贸易体系。

你们，组织了，巡逻队，和，警察，维护秩序。

你们，组织了，施工队，重建城市，和，基础设施。

你们，组织了，医疗队，救治伤员，和，病人。

你们，组织了，科研队，研究，治愈感染的方法，和，新的技术。

世界，在，慢慢地，恢复。

人们，的脸上，也开始，有了，笑容。

你看着，这个，正在，恢复的世界，心里涌起了，一股，强烈的成就感。

你，做到了。

你，带领着，所有人，走出了，迷雾。

你，带领着，所有人，开始了，新的生活。

【理智+3】

【联合政府正式成立。你担任第一任最高领袖。】

【获得称号：新世界的领袖。魅力+10，智慧+10，领导力+10，所有属性+5。】

【获得状态：联合政府最高领袖。可以调动所有幸存者团体的资源和人力。】

【所有NPC好感度+20】

【重要伏笔：新世界的秩序。你们，能，建立一个，更美好的世界吗？】`,next:`__return__`},{id:`nominate_someone_else`,text:`推举其他人担任，你只做顾问`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`nominate_someone_else`}],result:`"谢谢大家的信任。"你说，"但是，我认为，我不适合，担任，最高领袖。我，更适合，做一个，顾问，和，执行者。"

所有人，都愣住了。

"那，你认为，谁，适合？"赵明问。

你想了想，然后说："我认为，赵明首领，最适合。他，有，丰富的，管理经验。他，把希望号安全区，管理得，很好。我相信，他，也能，把联合政府，管理得，很好。"

赵明，看着你，愣住了。

"我？"他问。

"对。"你说，"你，有经验，有能力，有声望。你，是，最合适的人选。"

其他人，也都，纷纷，表示，同意。

赵明，看着大家，想了想，然后，点了点头。

"好。"他说，"既然，大家，都信任我。那我，就，担任，联合政府的，第一任，最高领袖。"

所有人，都鼓起掌来。

赵明，站起来，看着，所有人，认真地说：

"谢谢大家的信任。我会，尽我最大的努力，为，所有的幸存者，服务。我会，带领大家，重建这个世界，建立一个，更美好的未来。"

然后，他看着你，说："但是，我需要，你的帮助。你，是，对抗迷雾的，最大功臣。你，有，丰富的，战斗，和，探索经验。我希望，你能，担任，联合政府的，军事顾问，和，特别行动队队长。"

你看着他，点了点头。

"好。"你说，"我愿意。"

联合政府，正式成立了。

赵明，担任，第一任，最高领袖。

你，担任，军事顾问，和，特别行动队队长。

接下来的日子里，你们，一起，带领着，联合政府，开始了，重建世界的，工作。

世界，在，慢慢地，恢复。

你看着，这个，正在，恢复的世界，心里涌起了，一股，轻松，和，成就感。

你，不用，承担，最大的责任。

但是，你，依然，在，为，重建世界，贡献，你的力量。

这，也许，是，最好的，结果。

【理智+5】

【联合政府正式成立。赵明担任第一任最高领袖。你担任军事顾问和特别行动队队长。】

【获得称号：新世界的元勋。力量+5，敏捷+5，所有战斗属性+5。】

【获得状态：联合政府军事顾问。可以参与重大决策，指挥特别行动队。】

【赵明好感度+30】

【所有NPC好感度+15】

【重要伏笔：新世界的秩序。你们，能，建立一个，更美好的世界吗？】`,next:`__return__`}]},{id:`phase6_save_duoduos_father`,text:`陈静（或者陈博士），成功制造出了治愈抗体。

你拿着抗体，找到了朵朵。

"朵朵。"你说，"我们，有了，治愈迷雾感染的抗体。我们，可以，去救，你的爸爸了。"

朵朵，看着你，眼睛里，充满了，惊讶，和，喜悦。

"真的吗？"她问，声音在发抖，"我们，真的，能，救爸爸吗？"

"真的。"你说，"但是，我们，需要，先找到，他。"

朵朵，用力，点了点头。

"我知道，他在哪里。"她说，"他，在城东的，大润发超市，附近。我，能感觉到，他。"

你看着她，点了点头。

"好。"你说，"我们，现在，就去。"

你组织了，一支小队。

有你，老周，陈静，黑鸦，还有，几个士兵。

朵朵，也坚持，要去。

你，本来，不想，让她去。

但是，她，坚持要去。

她说，她要，亲眼，看到，爸爸，恢复正常。

你，最终，还是，同意了。

你们，开车，来到了，城东的，大润发超市。

超市里，很安静。

但是，你们，能感觉到，有什么东西，在里面。

你们，小心翼翼地，走了进去。

然后，你们，看到了他。

一个，高大的男人，穿着，一件，破旧的蓝色夹克。

他，就是，朵朵的爸爸，杜建国。

但是，他，已经，被感染了。

他的眼睛，是红色的。

他的皮肤，是灰白色的。

他的行为，是狂暴的。

他，看到你们，咆哮了一声，朝你们，冲了过来。

"爸爸！"朵朵，喊，眼泪，掉了下来。

杜建国，听到了，朵朵的声音。

他，顿了一下。

他的红色眼睛里，闪过了，一丝，人性。

但是，很快，那丝人性，就消失了。

他，继续，朝你们，冲了过来。

"准备抗体！"你喊。

陈静，拿出了，装着抗体的注射器。

你们，需要，先控制住他，然后，给他，注射抗体。

但是，他，很强壮，很狂暴。

你们，费了，很大的力气，才，控制住他。

然后，陈静，给他，注射了，抗体。

然后，你们，静静地，等待着。

过了，大约一个小时。

杜建国，的身体，开始，发抖。

然后，他的眼睛，从红色，慢慢地，变回了，正常的颜色。

他的皮肤，从灰白色，慢慢地，变回了，正常的颜色。

他的行为，从狂暴，慢慢地，变回了，正常的状态。

他，恢复了，正常。

他，睁开眼睛，看着，周围的一切，很迷茫。

然后，他看到了，朵朵。

"朵朵？"他问，声音在发抖，"是你吗？"

朵朵，看着他，眼泪，掉得，更凶了。

"爸爸！"她喊，扑进了，他的怀里。

杜建国，抱住了，朵朵，眼泪，也掉了下来。

"朵朵……"他说，"爸爸，终于，又见到你了……"

你看着，他们父女，团聚的场景，心里涌起了，一股，强烈的感动。

你们，做到了。

你们，拯救了，朵朵的爸爸。

这比，任何胜利，都更，有意义。`,minDay:60,maxTriggers:1,weight:4,choices:[{id:`reunite_father_daughter`,text:`让他们父女团聚，带他们回据点`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`reunite_father_daughter`}],result:`"我们，带他们，回据点吧。"你说。

杜建国，抱着朵朵，点了点头。

"谢谢你们。"他说，声音，还在发抖，"谢谢你们，救了我。谢谢你们，照顾了，朵朵。"

"不用谢。"你说，"朵朵，是个，好孩子。她，一直，很想你。"

杜建国，看着，怀里的朵朵，眼睛里，充满了，疼爱，和，愧疚。

"对不起，朵朵。"他说，"爸爸，没有，保护好你。爸爸，还，差点，伤害了你。"

朵朵，抬起头，看着他，摇了摇头。

"没关系，爸爸。"她说，"你，现在，回来了。这就，够了。"

杜建国，看着她，眼泪，又掉了下来。

你们，带着，杜建国，回到了，据点。

陈静，给他，做了，全面的检查。

检查结果，很好。

他的身体，已经，完全，恢复了正常。

而且，因为，他，曾经，被感染过，又，被治愈了。

他的身体，比，普通人，更强壮，更敏捷。

他，获得了，超能力。

杜建国，以前，是，一个，建筑工人。

他，很会，盖房子，和，修理东西。

而且，他，很强壮，很能打。

他，加入了，你们的据点。

他，成为了，你们的，重要成员。

朵朵，也很开心。

她，终于，和爸爸，团聚了。

她的脸上，每天，都带着，笑容。

你看着，他们父女，开心的样子，心里涌起了，一股，温暖。

你们，拯救了，一个家庭。

这比，任何胜利，都更，有意义。

【理智+10】

【成功拯救了朵朵的爸爸，杜建国。】

【杜建国加入了据点。他是建筑工人，很强壮，很能打，还获得了超能力。】

【据点人口：增加1人。】

【获得能力：强化建筑工。杜建国，比普通人更强壮，更敏捷，还会盖房子和修理东西。】

【朵朵好感度+50】

【杜建国好感度+50】

【获得称号：家庭的拯救者。魅力+5，智慧+5，所有NPC好感度获取+20%。】

【重要伏笔：杜建国。他，会给你们，带来，什么？】`,next:`__return__`}]},{id:`phase6_mutant_creatures`,text:`迷雾消散后（或者，核心被摧毁后），世界，并没有，完全，恢复正常。

因为，迷雾病毒，已经，改变了，很多生物。

有些动物，发生了，变异。

它们，变得，更大，更强壮，更凶猛。

而且，有些，甚至，拥有了，特殊的能力。

这些变异生物，成为了，新世界的，新威胁。

一天，老周，急匆匆地，找到了你。

"首领！"他说，脸色很难看，"不好了！我们的巡逻队，在据点附近，遇到了，变异生物！"

"什么变异生物？"你问。

"是一只，巨大的，变异狼。"老周说，"它，有，普通狼的，两倍大。它的皮肤，很硬，普通的子弹，都打不穿。而且，它，还能，发射，能量弹。"

"我们的巡逻队，有两个人，受伤了。"他说，"如果，不是，他们，跑得快，可能，就，回不来了。"

你看着他，心里涌起了，一股，强烈的不安。

变异生物。

巨大的变异狼。

皮肤很硬，普通子弹打不穿。

还能发射能量弹。

这，比，迷雾中的怪物，还要，可怕。

"它，现在，在哪里？"你问。

"在据点，东边，大约，五公里的，一片树林里。"老周说，"它，好像，把那里，当成了，它的领地。"

你想了想，然后说："组织一支小队，我们，去，消灭它。"

老周，点了点头。

"好。"他说，"我，这就，去准备。"

你组织了，一支精锐小队。

有你，老周，黑鸦，杜建国，还有，几个，精锐士兵。

你们，带上了，最好的武器，和，装备。

然后，你们，出发了。

你们，来到了，那片树林。

树林里，很安静。

但是，你们，能感觉到，有什么东西，在，监视着，你们。

突然，一声，巨大的狼嚎，从树林深处，传来。

然后，一只，巨大的，变异狼，从树林里，冲了出来。

它，真的，有，普通狼的，两倍大。

它的皮肤，是，深灰色的，看起来，很坚硬。

它的眼睛，是，深红色的，充满了，野性，和，凶残。

它，看着你们，咆哮了一声。

然后，它，朝你们，冲了过来。

战斗，开始了。`,minDay:62,maxTriggers:1,weight:5,choices:[{id:`fight_mutant_wolf`,text:`与变异狼战斗，消灭它`,effects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`fight_mutant_wolf`}],result:`"开火！"你喊。

所有的武器，同时开火。

子弹，朝变异狼，射了过去。

但是，正如，老周所说，它的皮肤，很硬。

普通的子弹，打在它的身上，只能，留下，一道，白印。

根本，伤不了它。

变异狼，咆哮了一声，然后，它的嘴里，开始，聚集，能量。

然后，一道，能量弹，从它的嘴里，射了出来。

"躲开！"你喊。

你们，赶紧，躲开了。

能量弹，打在了，你们身后的，一棵大树上。

那棵大树，直接，被，炸成了，碎片。

你看着，那棵，被炸碎的大树，心里涌起了，一股，强烈的震惊。

这只变异狼，太强了。

普通的武器，根本，伤不了它。

而且，它的能量弹，威力，巨大。

你们，必须，想个，办法。

"打它的眼睛！"老周喊，"它的眼睛，是，弱点！"

你看着，变异狼的，深红色的眼睛。

然后，你，拿起了，一把，狙击枪。

你，瞄准了，它的左眼。

然后，你，扣动了，扳机。

"砰！"

子弹，准确地，打中了，变异狼的左眼。

变异狼，发出了，一声，凄厉的惨叫。

它的左眼，被打瞎了。

它，变得，更加，狂暴了。

它，疯狂地，朝你们，冲了过来。

"继续，打它的眼睛！"你喊。

你们，都，瞄准了，它的右眼，射击。

终于，又一颗子弹，打中了，它的右眼。

变异狼，的两只眼睛，都被打瞎了。

它，失去了，视力。

它，疯狂地，到处乱撞。

但是，它，已经，威胁不到，你们了。

你，拿起了，一颗，手榴弹。

然后，你，拉开了，保险环。

然后，你，用力，把它，扔进了，变异狼，张开的，嘴里。

"轰！"

一声，巨响。

变异狼的，脑袋，直接，被炸碎了。

它，倒在了地上，不动了。

你们，赢了。

你，靠在，一棵树上，大口喘着气。

你的身上，有，好几道，被变异狼的爪子，划的伤口。

但是，你，不在乎。

你们，消灭了，变异狼。

而且，你们，还，获得了，它的尸体。

它的皮肤，可以，用来，制造，防弹衣。

它的能量器官，可以，用来，研究，新的武器。

这，是，一个，宝贵的，收获。

【健康-20，理智-8】

【成功消灭了变异狼。】

【我方伤亡：轻伤3人，无人重伤，无人牺牲。】

【获得战利品：变异狼的尸体。（皮肤可以制造防弹衣，能量器官可以研究新武器）】

【获得称号：变异生物的猎人。力量+3，敏捷+3，所有战斗属性+2。】

【老周好感度+15】

【黑鸦好感度+15】

【杜建国好感度+15】

【重要伏笔：变异生物。这只变异狼，只是，一个开始。以后，还会有，更多，更强的变异生物。】`,next:`__return__`},{id:`retreat_from_mutant`,text:`暂时撤退，以后再来消灭它`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`"撤！"你喊，"这只变异狼，太强了。我们，暂时，不是，它的对手。"

你们，赶紧，撤退了。

变异狼，在后面，追了，一段距离。

但是，它，没有，追太远。

它，回到了，它的领地。

你们，成功地，撤回了，据点。

你，靠在，围墙上，大口喘着气。

你的心脏，跳得，很快。

刚才，太危险了。

如果，不是，你们，撤退得，及时。

你们，可能，就，有人，会牺牲。

"首领。"老周，走到你身边，说，"那只变异狼，太强了。我们，需要，更好的武器，和，装备，才能，消灭它。"

你，点了点头。

"我知道。"你说，"我们，需要，研究，新的武器。而且，我们，也需要，更多，更强的人。"

你，找到了，王工，和，陈博士。

"我们，需要，更强的武器。"你说，"你们，能，研究出来吗？"

王工，想了想，然后说："如果，我们，能，得到，那只变异狼的，能量器官。我们，就可以，研究出，能量武器。那种武器，应该，能，打穿，它的皮肤。"

陈博士，也点了点头。

"而且，"他说，"我们，还可以，研究，强化药剂。那种药剂，可以，让人，变得，更强壮，更敏捷。这样，我们的人，就能，跟变异生物，近战了。"

你，看着他们，点了点头。

"好。"你说，"你们，开始研究吧。需要什么，跟我说。"

接下来的日子里，王工，和，陈博士，开始了，研究。

他们，需要，变异生物的，样本。

所以，你们，组织了，几支，搜索队，去，寻找，其他的，变异生物。

你们，找到了，一些，比较弱的，变异生物。

你们，消灭了，它们，获取了，它们的，样本。

然后，王工，和，陈博士，用这些样本，开始了，研究。

终于，在第十五天，他们，成功了。

王工，制造出了，第一把，能量步枪。

陈博士，制造出了，第一支，强化药剂。

你们，终于，有了，能，对抗变异生物的，武器，和，能力。

【理智-5】

【暂时撤退，避免了，重大伤亡。】

【获得新武器：能量步枪。（能打穿变异生物的皮肤）】

【获得新药剂：强化药剂。（能让人变得更强壮，更敏捷）】

【王工好感度+20】

【陈博士好感度+20】

【老周好感度+10】

【重要伏笔：变异狼。它，还在，那片树林里。你们，现在，有了，新武器，和，新能力。你们，会，回去，消灭它吗？】`,next:`__return__`}]},{id:`phase6_truth_revealed`,text:`你们，在灯塔的地下实验室里，找到了，进化者组织的，完整档案。

档案里，记录了，进化者组织的，全部历史，和，计划。

你，和，陈博士，一起，仔细地，阅读了，这些档案。

然后，你们，终于，了解了，进化者组织的，全貌。

进化者组织，成立于，迷雾来临前，十年。

创始人，就是，先知。

先知，本来，是一个，天才的，生物学家。

他，发现了，人类基因里的，潜在能力。

他相信，人类，已经，停止进化了。

他相信，如果，人类，不能，继续进化，最终，会，被自然淘汰。

所以，他，创立了，进化者组织。

他，招募了，很多，志同道合的，科学家。

他们，开始了，秘密的，研究。

他们，研究了，十年。

终于，他们，制造出了，迷雾病毒。

迷雾病毒，是一种，基因病毒。

它，会，改变，人类的基因。

大部分人，无法承受，基因改变的痛苦，就变成了，怪物。

但是，少数人，能承受，基因改变，就会，获得，超能力。

先知，把，这少数人，称为，"新人类"。

他相信，"新人类"，是，人类的，未来。

他，计划，用迷雾病毒，感染，全世界的人。

然后，让，"新人类"，取代，旧人类。

建立一个，由，"新人类"，统治的，新世界。

为了，这个计划，他，甚至，用活人，做实验。

他，抓了，很多，无辜的人。

他，把他们，关在，实验室里。

他，给他们，注射，迷雾病毒。

他，观察，他们的，变化。

大部分人，变成了，怪物，被，他，处理掉了。

少数人，变成了，"新人类"，被，他，吸收，进了，进化者组织。

而，先知，自己，是，第一个，成功的，实验体。

他，给自己，注射了，迷雾病毒。

他，成功地，进化了。

他，获得了，强大的，超能力。

但是，他，也，失去了，人类的，外表。

他的眼睛，变成了，纯白色。

他的皮肤，变成了，半透明。

他，已经，不再是，一个，普通人了。

但是，他，不在乎。

他相信，他，是，人类的，救世主。

他相信，他，正在，带领人类，走向，一个，新的时代。

你，看完了，这些档案，心里涌起了，一股，强烈的，复杂的感觉。

先知，是一个，天才。

但是，他，也是一个，疯子。

他，为了，他的，理想，牺牲了，无数，无辜的人。

他，把，整个世界，都，拖入了，地狱。

但是，你，也，不得不，承认。

他的，研究，确实，改变了，人类。

迷雾，虽然，带来了，灾难。

但是，它，也，让，一些人，获得了，超能力。

这些超能力者，可能，真的，是，人类的，未来。

你，看着，档案里，先知的，照片。

照片里的，先知，还，没有，被感染。

他，是一个，很年轻，很英俊的，男人。

他的眼睛里，充满了，智慧，和，理想。

你，很难想象，这样一个，看起来，很阳光的，年轻人，会，变成，后来，那个，冷酷的，疯子。

也许，理想，和，疯狂，只有，一线之隔。

也许，先知，本来，是想，拯救人类。

但是，他，用错了，方法。

他，为了，一个，伟大的，目标，牺牲了，太多，无辜的人。

最终，他，变成了，他，最想，消灭的，那种人。

这，也许，就是，最大的，悲剧。`,minDay:63,maxTriggers:1,weight:3,choices:[{id:`reflect_on_truth`,text:`反思真相，决定如何面对新世界`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`reflect_on_truth`}],result:`你，看完了，这些档案，沉默了，很久。

然后，你，召集了，所有的，核心成员。

你，把，进化者组织的，真相，告诉了，他们。

所有人，都，沉默了。

他们，都，没想到，迷雾的背后，竟然，是，这样的，真相。

"先知，是一个，疯子。"老周，说，"他，为了，他的，理想，牺牲了，无数，无辜的人。"

"但是，他的，研究，也，确实，改变了，人类。"陈博士，说，"那些，超能力者，可能，真的，是，人类的，未来。"

你，看着，他们，想了想，然后说：

"不管，先知，是对，是错。"你说，"迷雾，已经，发生了。世界，已经，改变了。我们，不能，回到，过去了。我们，只能，面对，这个，新世界。"

"先知，用错了，方法。"你说，"但是，他的，理想，也许，是对的。人类，确实，需要，进化。但是，进化，不应该，以，牺牲，无辜的人，为代价。"

"我们，要，建立一个，新的世界。"你说，"在这个，新世界里，普通人，和，超能力者，都能，和平共处。我们，要，用，正确的，方法，引导，人类的，进化。"

所有人，都，点了点头。

"你说得对。"赵明，说，"我们，要，建立一个，更美好的，新世界。"

你，看着，所有人，点了点头。

"好。"你说，"从今天起，我们，不再，纠结于，过去。我们，要，向前看。我们，要，带领，所有的幸存者，建立一个，更美好的，未来。"

所有人，都，鼓起掌来。

你，看着，他们，心里涌起了，一股，坚定的，感觉。

你，已经，找到了，前进的，方向。

你，要，带领，所有人，建立一个，更美好的，新世界。

这，就是，你的，使命。

【理智+5】

【了解了进化者组织的完整真相。】

【获得重要情报：先知的生平，进化者组织的历史，迷雾病毒的全貌。】

【获得称号：真相的洞悉者。智慧+5，智力+5，所有研究速度+30%。】

【所有核心成员好感度+10】

【重要伏笔：新世界的方向。普通人，和，超能力者，如何，和平共处？人类，如何，正确地，进化？】`,next:`__return__`}]},{id:`phase6_end_new_beginning`,text:`第65天，到了。

迷雾，已经，消散了。

或者，先知，已经，被打败了。

世界，进入了，一个，新的时代。

阳光，照在了，大地上。

天空，是，蓝色的。

云，是，白色的。

世界，恢复了，原来的，样子。

但是，世界，也，已经，不一样了。

因为，迷雾，改变了，很多东西。

有些人，获得了，超能力。

有些动物，发生了，变异。

旧的秩序，已经，崩溃了。

新的秩序，正在，建立。

你，站在，据点的，最高处，看着，下面的，世界。

据点里，很热闹。

人们，在，忙碌着。

有些人，在，重建房屋。

有些人，在，种植庄稼。

有些人，在，训练战斗。

有些人，在，研究科学。

孩子们，在，空地上，玩耍。

他们的笑声，在，空气中，回荡。

你，看着，这一切，心里涌起了，一股，强烈的，成就感。

你，做到了。

你，带领着，所有人，走出了，迷雾。

你，带领着，所有人，开始了，新的生活。

老周，走到，你身边，递给你，一杯水。

"在想什么？"他问。

"我在想，"你说，"我们，终于，走出来了。"

老周，笑了笑。

"是啊。"他说，"我们，走出来了。"

你，看着，远处的，城市。

城市，还，很破败。

但是，已经，有，很多人，在，那里，重建了。

你，相信，用不了，多久，城市，就会，恢复，原来的，繁华。

甚至，会，比，原来，更，繁华。

因为，这个，新世界，充满了，无限的，可能。

超能力者，变异生物，新的科技，新的秩序。

这一切，都会，让，这个，世界，变得，更加，精彩。

你，深吸一口气。

空气，很清新。

没有，迷雾的，味道。

你，笑了。

新的世界，已经，到来。

新的冒险，正在，等待着，你们。

而你，会，继续，带领着，你的同伴们，在这个，新世界里，创造，属于，你们的，传奇。

这，不是，结束。

这，只是，一个，新的，开始。`,minDay:65,maxTriggers:1,weight:3,choices:[{id:`embrace_new_world`,text:`拥抱新世界，开始新的冒险`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`embrace_new_world`}],result:`"新的世界，已经，到来。"你说，"新的冒险，正在，等待着，我们。"

你，转过身，看着，你的同伴们。

老周，陈静，小杨，朵朵，杜建国，李刚，张大爷，王工，陈博士，黑鸦，林小雨，李伟，赵明……

他们，都，看着你。

他们的眼睛里，充满了，信任，和，期待。

"兄弟们！"你大声说，"迷雾，已经，消散了。世界，已经，恢复了。但是，这，不是，结束。这，只是，一个，新的，开始！"

"在这个，新世界里，还有，很多，未知的，东西，等待着，我们，去，探索。还有，很多，挑战，等待着，我们，去，面对。还有，很多，可能，等待着，我们，去，创造！"

"我，会，继续，带领着，你们。我们，会，一起，在这个，新世界里，创造，属于，我们的，传奇！"

所有人，都，鼓起掌来。

他们，大声欢呼着。

他们的声音，在，空气中，回荡。

你，看着，他们，也，笑了。

新的世界，新的冒险。

你，已经，准备好了。

你，会，继续，前进。

直到，你，到达，那个，更美好的，未来。

【理智+10】

【第六阶段结束。迷雾消散，新世界到来。】

【获得称号：新世界的开拓者。所有属性+10，魅力+10，领导力+10。】

【获得状态：新的开始。游戏进入新阶段。更多的冒险，等待着你。】

【所有NPC好感度+20】

【重要伏笔：新世界。超能力者，变异生物，新的科技，新的秩序。这个，世界，会，变成，什么样子？】

【游戏，进入，第七阶段：基地（第66-90天）。更多的内容，等待着，你，去，探索。】`,next:`__return__`}]}],Ol={phase7_base_upgrade_ceremony:{id:`phase7_base_upgrade_ceremony`,text:`第66天，清晨。

你们的据点，经过了，十几天的重建和扩建。

现在，它已经，不再是，一个简单的据点了。

它，是一个，真正的基地。

围墙，从原来的，三米高，扩建到了，五米高。
而且，围墙上，还，加装了，铁丝网，和，瞭望塔。

大门，从原来的，木门，换成了，厚重的铁门。
而且，大门上，还，加装了，机关，和，锁。

建筑，从原来的，几栋破旧的房子，扩建到了，二十多栋，崭新的房子。
有，宿舍，食堂，医疗室，实验室，工坊，仓库，训练室，会议室……

农田，从原来的，几亩地，扩建到了，几十亩地。
而且，还，修建了，灌溉系统，和，温室大棚。

发电设备，从原来的，一台破旧的发电机，升级到了，三台，大型发电机。
而且，还，加装了，太阳能板，和，风力发电机。

你们的基地，现在，可以，容纳，两百多人。
而且，还，可以，自给自足，生产，食物，水，电力，武器，药品……

今天，是基地升级的，典礼日。

所有的人，都聚集在，基地的中央广场上。

你站在，广场的高台上，看着，下面的，所有人。

有，老周，陈静，小杨，朵朵，杜建国，李刚，张大爷，王工，陈博士，黑鸦……
有，希望号安全区的，林小雨，和，她的手下。
有，军方残余的，李伟，和，他的士兵。
有，被拯救的实验体们。
有，进化者组织的残余们。
还有，很多，其他的幸存者。

总共，有，一百五十多人。

你看着他们，心里涌起了，一股，强烈的成就感。

你，做到了。

你，带领着，这些人，从，迷雾中，走了出来。

你，带领着，这些人，建立了，这个，基地。

你深吸一口气，然后，开始了，你的演讲。

"兄弟们！"你大声说，"今天，是我们基地升级的，典礼日！"

"从今天起，我们的据点，正式升级为，新希望基地！"

所有人，都欢呼了起来。

你等他们，安静下来，然后，继续说：

"在过去的，六十六天里，我们，经历了，太多的苦难。我们，失去了，很多的同伴。但是，我们，也，活了下来。我们，也，建立了，这个，家。"

"但是，这，不是，结束。这，只是，一个，新的开始。"

"在未来的日子里，我们，还要，继续，建设我们的基地。我们，还要，继续，研究新的科技。我们，还要，继续，培养我们的战士。我们，还要，继续，探索这个，新世界。"

"我相信，只要，我们，团结一心，我们，就一定，能，建立一个，更美好的未来！"

所有人，都，再次，欢呼了起来。

他们的声音，在，基地里，回荡。

你看着他们，也，笑了。

新希望基地，正式成立了。

新的冒险，正在，等待着，你们。`,choices:[{id:`announce_base_name`,text:`宣布基地名称为「新希望基地」`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`base_named`}],next:`start`,result:`"从今天起，我们的基地，就叫，新希望基地！"你大声宣布。

所有人，都欢呼了起来。

"新希望基地！新希望基地！"他们，大声喊着。

你看着他们，心里涌起了，一股，强烈的感动。

新希望基地。

这个名字，代表着，你们，对未来的，希望。

你相信，这个名字，会，带领着，你们，走向，一个，更光明的，未来。

典礼结束后，你，召集了，所有的，核心成员，召开了，第一次，基地管理会议。

在会议上，你们，讨论了，基地的，发展方向。

你们，决定，建立，完整的，基地管理系统。

包括：
- 建筑系统：可以建造和升级，各种建筑
- 科技系统：可以研究，各种新科技
- 人口系统：管理基地的人口
- 经济系统：管理基地的资源和货币
- 军事系统：训练和管理，基地的军队
- 外交系统：与其他势力的关系管理

你，作为，基地的首领，负责，整体的，规划和决策。

老周，负责，军事和安全。

陈静，负责，医疗和健康。

王工，负责，建筑和工程。

陈博士，负责，科技和研究。

黑鸦，负责，情报和特别行动。

李刚，负责，后勤和物资。

张大爷，负责，农业和食物。

小杨，负责，交通和通讯。

杜建国，负责，建设和维修。

每个人，都有，自己的，职责。

基地的管理，开始，走上了，正轨。

【理智+5】

【基地正式命名为：新希望基地。】

【基地升级：从据点升级为基地。人口容量：200人。】

【获得建筑：围墙（5米高）、铁门、宿舍、食堂、医疗室、实验室、工坊、仓库、训练室、会议室、农田（50亩）、灌溉系统、温室大棚、发电站（3台发电机+太阳能+风力）。】

【获得系统：建筑系统、科技系统、人口系统、经济系统、军事系统、外交系统。】

【所有NPC好感度+10】

【重要伏笔：新希望基地。它，会，发展成，什么样子？】`}]},phase7_tech_tree_unlock:{id:`phase7_tech_tree_unlock`,text:`基地升级后的，第三天。

陈博士，找到了你。

"首领。"他说，"我们的实验室，已经，建好了。而且，我们，也，收集了，很多的，研究资料和样本。我认为，我们，可以，开始，系统性的，科技研究了。"

你看着他，点了点头。

"好。"你说，"你，有什么，计划？"

陈博士，拿出了，一张，大纸。

纸上，画着，一棵，巨大的，科技树。

"这是，我设计的，科技研究树。"他说，"我们，可以，按照，这棵树，来，进行研究。"

你看着，那棵科技树，心里涌起了，一股，惊讶。

它，太，庞大了。

它，分为，几个大的分支：

1. 生物科技：研究，基因改造，治愈抗体，超能力培养，变异生物驯化……
2. 工程科技：研究，建筑升级，武器制造，车辆改装，能源系统……
3. 农业科技：研究，作物改良，温室技术，水产养殖，食物加工……
4. 医疗科技：研究，药品制造，手术技术，义肢制造，生命延长……
5. 军事科技：研究，战术训练，武器升级，装甲制造，无人机……
6. 信息科技：研究，通讯系统，雷达系统，计算机，人工智能……

每个大分支，又，分为，很多，小的分支。

每个小分支，又，有，很多，具体的，研究项目。

总共，有，几百个，研究项目。

"这……"你说，"这，太多了吧？"

"不多。"陈博士说，"这，只是，基础的，科技树。随着，我们的研究，深入，我们，还会，解锁，更多的，研究项目。"

"而且，"他又说，"这些研究，不是，孤立的。它们，之间，有，很多的，关联。比如，研究了，基因改造，就能，解锁，超能力培养。研究了，超能力培养，就能，解锁，变异生物驯化。"

你看着，那棵科技树，想了想，然后说：

"好。我们，就，按照，这棵科技树，来，进行研究。但是，我们，要，有重点地，研究。不能，盲目地，什么都研究。"

"你说得对。"陈博士说，"那么，我们，首先，研究，什么？"

你看着，科技树，想了想。

你们，现在，最需要的，是什么？

是，更强的武器？
是，更好的医疗？
是，更多的食物？
是，更强的战士？

你该，怎么选？`,choices:[{id:`focus_biotech`,text:`优先研究生物科技（超能力培养、治愈抗体）`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`focus_biotech`}],next:`start`,result:`"我们，优先研究，生物科技。"你说，"特别是，超能力培养，和，治愈抗体。"

陈博士，点了点头。

"好。"他说，"生物科技，确实，是，最有潜力的，方向。如果，我们，能，培养出，更多的超能力者，我们的实力，就会，大大增强。而且，如果，我们，能，改进治愈抗体，我们，就能，拯救，更多的被感染者。"

接下来的日子里，陈博士，带着，他的研究团队，开始了，生物科技的研究。

他们，首先，研究了，超能力的，原理。

他们，发现，超能力，来源于，基因的，改变。

迷雾病毒，会，改变，人类的基因。

大部分人，无法承受，基因改变的痛苦，就变成了，怪物。

但是，少数人，能承受，基因改变，就会，获得，超能力。

而且，超能力的，类型，和，强度，取决于，基因改变的，方式，和，程度。

陈博士，根据，这个发现，研究出了，超能力培养的，方法。

通过，注射，稀释后的迷雾病毒，和，特殊的，催化剂，可以，安全地，激活，人类的，潜在超能力。

当然，这个过程，还是，有风险的。

成功率，大约，是，30%。

而且，即使，成功了，获得的超能力，也，可能，很弱。

但是，这，已经，是，一个，重大的突破了。

陈博士，还，改进了，治愈抗体。

新的治愈抗体，效果，更好，副作用，更小，而且，制造，更容易。

你们，终于，有了，稳定的，治愈抗体，供应。

【理智+3】

【科技研究开启。优先方向：生物科技。】

【获得科技：超能力培养（成功率30%）、改进型治愈抗体（效果+50%，副作用-50%）。】

【获得能力：可以培养超能力者。可以制造改进型治愈抗体。】

【陈博士好感度+20】

【重要伏笔：超能力培养。它，会，给你们，带来，什么？】`},{id:`focus_engineering`,text:`优先研究工程科技（建筑升级、武器制造）`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`focus_engineering`}],next:`start`,result:`"我们，优先研究，工程科技。"你说，"特别是，建筑升级，和，武器制造。"

王工，点了点头。

"好。"他说，"工程科技，确实，是，最实用的，方向。如果，我们，能，升级我们的建筑，我们的基地，就会，更安全，更舒适。而且，如果，我们，能，制造更好的武器，我们的战士，就会，更强。"

接下来的日子里，王工，带着，他的工程团队，开始了，工程科技的研究。

他们，首先，研究了，建筑技术。

他们，发明了，新的，建筑材料。

这种材料，比，普通的，混凝土，更坚固，更轻便，而且，还，有，一定的，防弹能力。

用这种材料，建造的建筑，不仅，更坚固，而且，还，能，抵御，变异生物的攻击。

王工，还，设计了，新的，防御工事。

包括，自动炮塔，地雷阵，陷阱，电网……

有了这些防御工事，你们的基地，就，更安全了。

然后，他们，研究了，武器制造。

他们，改进了，现有的，武器。

他们，制造出了，更精准的，步枪，更强大的，狙击枪，更轻便的，机枪……

而且，他们，还，制造出了，新的，武器。

包括，火焰喷射器，榴弹发射器，能量步枪……

特别是，能量步枪。

它，是，用，变异生物的，能量器官，制造的。

它，发射的，能量弹，能，打穿，变异生物的，坚硬皮肤。

有了这些武器，你们的战士，就，更强了。

【理智+3】

【科技研究开启。优先方向：工程科技。】

【获得科技：新型建筑材料（坚固+50%，轻便+30%，防弹）、自动炮塔、地雷阵、改进型武器（精准+30%，威力+20%）、能量步枪（能打穿变异生物皮肤）。】

【获得能力：可以建造新型建筑。可以制造改进型武器和能量步枪。】

【王工好感度+20】

【重要伏笔：工程科技。它，会，给你们，带来，什么？】`},{id:`focus_military`,text:`优先研究军事科技（战术训练、装甲制造）`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`focus_military`}],next:`start`,result:`"我们，优先研究，军事科技。"你说，"特别是，战术训练，和，装甲制造。"

老周，点了点头。

"好。"他说，"军事科技，确实，是，最重要的，方向。在这个，危险的，新世界里，只有，拥有，强大的军队，我们，才能，保护自己。"

接下来的日子里，老周，带着，他的军事团队，开始了，军事科技的研究。

他们，首先，研究了，战术训练。

他们，总结了，过去，几十天的，战斗经验。

他们，制定了，新的，训练大纲。

包括，体能训练，格斗训练，射击训练，战术训练，生存训练……

而且，他们，还，制定了，新的，战术。

包括，小队战术，伏击战术，防御战术，突击战术……

有了这些训练和战术，你们的战士，就，更专业，更强大了。

然后，他们，研究了，装甲制造。

他们，用，变异生物的，皮肤，制造出了，新型的，防弹衣。

这种防弹衣，比，普通的，防弹衣，更轻便，更坚固，而且，还，能，抵御，变异生物的，爪子和牙齿。

而且，他们，还，制造出了，更重型的，装甲。

包括，防弹头盔，防弹盾牌，甚至，简易的，动力装甲……

特别是，动力装甲。

它，是，用，变异生物的，肌肉组织，和，机械装置，制造的。

穿上它，人的力量，会，增强，十倍。

而且，它，还，能，抵御，大部分的，攻击。

有了这些装甲，你们的战士，就，更安全，更强大了。

【理智+3】

【科技研究开启。优先方向：军事科技。】

【获得科技：新型训练大纲（战士能力+30%）、新型战术（战斗效率+40%）、变异生物防弹衣（轻便+50%，坚固+50%）、动力装甲（力量+1000%，防御+200%）。】

【获得能力：可以训练专业战士。可以制造防弹衣和动力装甲。】

【老周好感度+20】

【重要伏笔：军事科技。它，会，给你们，带来，什么？】`}]},phase7_awakening_ceremony:{id:`phase7_awakening_ceremony`,text:`科技研究进行了，十天后。

陈博士，找到了你。

"首领。"他说，"超能力培养的，技术，已经，成熟了。我们，现在，可以，开始，培养超能力者了。"

你看着他，点了点头。

"好。"你说，"有，多少人，愿意，尝试？"

"目前，有，二十个人，报名了。"陈博士说，"他们，都是，自愿的。他们，都，知道，风险。"

你想了想，然后说：

"好。我们，就，从，这二十个人，开始。但是，我们，要，确保，他们的，安全。"

"我会的。"陈博士说，"我已经，准备好了，所有的，设备和药品。而且，我，还，让陈静，带着医疗队，在旁边，待命。"

第二天，超能力觉醒仪式，正式开始。

二十个志愿者，站在，实验室的，中央。

他们，都，很紧张，但是，也，很期待。

你站在，实验室的，观察室里，看着，他们。

陈博士，站在，控制台前，开始了，操作。

"准备，注射。"他说。

二十个护士，分别，给，二十个志愿者，注射了，稀释后的迷雾病毒，和，催化剂。

注射完成后，志愿者们，开始，有了，反应。

他们的身体，开始，发抖。
他们的皮肤，开始，变红。
他们的眼睛，开始，发光。

"第一个阶段，开始了。"陈博士说，"基因，正在，改变。"

这个过程，持续了，大约，一个小时。

然后，志愿者们，开始，进入，第二个阶段。

他们的身体，开始，剧烈地，疼痛。
他们，开始，惨叫。
有些人，甚至，开始，抽搐。

"第二个阶段，开始了。"陈博士说，"这是，最危险的，阶段。如果，他们，能，挺过去，他们，就，会，获得超能力。如果，挺不过去，他们，就，会，变成怪物。"

你看着，那些，痛苦的志愿者，心里涌起了，一股，紧张。

你，真的，希望，他们，都能，挺过去。

但是，你也知道，这，是，不可能的。

成功率，只有，30%。

二十个人，最多，只有，六个人，能，成功。

其他的人，要么，失败，变成怪物。
要么，虽然，活下来了，但是，没有，获得超能力。

你，只能，祈祷。

第二个阶段，持续了，两个小时。

然后，终于，结束了。

二十个志愿者，都，倒在了地上。

其中，有，六个人，慢慢地，爬了起来。

他们的眼睛里，闪烁着，奇异的光芒。

他们，成功了。

他们，获得了超能力。

而，其他的，十四个人。

有，八个人，虽然，活下来了，但是，没有，获得超能力。
有，六个人，失败了，变成了怪物。

那些，变成怪物的人，被，早有准备的，战士们，杀死了。

你看着，那六个，成功的，超能力者，心里涌起了，一股，复杂的感觉。

你们，成功了。

你们，培养出了，超能力者。

但是，你们，也，付出了，代价。

六个人，死了。

这，就是，超能力的，代价。`,choices:[{id:`celebrate_success`,text:`庆祝成功，安慰失败者`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`awakening_success`}],next:`start`,result:`你走进了，实验室。

你看着，那六个，成功的，超能力者，点了点头。

"恭喜你们。"你说，"你们，成功了。"

然后，你看着，那八个，失败了，但是，活下来的人。

"你们，也，很勇敢。"你说，"虽然，你们，没有，获得超能力，但是，你们，敢于，尝试，这，就，已经，很了不起了。"

那八个人，看着你，眼睛里，充满了，失落，但是，也，有，感激。

"谢谢，首领。"其中一个人说，"虽然，我，失败了，但是，我，不后悔。"

你看着，那六个，死去的人的，尸体，心里涌起了，一股，悲伤。

"他们，是，英雄。"你说，"他们，为了，我们的未来，献出了，生命。我们，会，永远，记住他们。"

你让，李刚，安排了，隆重的，葬礼。

那六个，死去的人，被，安葬在了，基地的，烈士墓地里。

所有的人，都，参加了，葬礼。

他们，都，很悲伤。

但是，他们，也，都，知道，这，是，必要的，牺牲。

葬礼结束后，你，召集了，那六个，成功的，超能力者。

"你们，现在，有了，超能力。"你说，"但是，这，不是，结束。这，只是，一个，开始。你们，需要，学会，控制，你们的超能力。你们，需要，学会，用，你们的超能力，来，保护，这个基地，保护，这些人。"

"你们，愿意吗？"你问。

六个超能力者，都，点了点头。

"我们愿意。"他们说。

你看着他们，点了点头。

"好。"你说，"从今天起，你们，就是，基地的，超能力小队。老周，会，负责，训练你们。黑鸦，会，负责，指导你们，使用超能力。"

老周，和，黑鸦，都，点了点头。

接下来的日子里，六个超能力者，开始了，艰苦的训练。

他们，学会了，控制，自己的超能力。

他们，学会了，用，超能力，来，战斗。

他们，成为了，基地的，一支，强大的，力量。

【理智-5】

【超能力觉醒成功。成功：6人。失败但存活：8人。死亡：6人。】

【获得单位：超能力小队（6人）。】

【超能力类型：力量型2人，速度型2人，能量型1人，感知型1人。】

【获得建筑：烈士墓地。】

【老周好感度+10】

【黑鸦好感度+15】

【获得称号：超能力的开拓者。智慧+5，勇气+5，所有超能力者忠诚度+30%。】

【重要伏笔：超能力小队。他们，会，给你们，带来，什么？】`}]},phase7_new_faction_visit:{id:`phase7_new_faction_visit`,text:`第75天，下午。

瞭望塔上的，哨兵，突然，发出了，警报。

"首领！"哨兵，通过对讲机，喊，"有，一支车队，朝我们的基地，过来了！"

你赶紧，跑到了，瞭望塔上。

你拿起望远镜，看了看。

然后，你愣住了。

远处，有，一支，庞大的车队。

至少，有，二十多辆车。

有，卡车，有，装甲车，有，改装过的越野车。

而且，每辆车上，都，插着，一面，旗帜。

旗帜上，画着，一个，齿轮，和，一把，剑。

"这是，什么人？"老周，问，他也，跑到了，瞭望塔上。

"我不知道。"你说，"但是，看起来，他们，很有组织，很有实力。"

"要不要，警戒？"老周问。

"先，警戒。"你说，"但是，不要，先动手。看看，他们，想，干什么。"

老周，点了点头，然后，通过对讲机，下达了，警戒的命令。

基地里，所有的战士，都，进入了，战斗位置。

围墙上的，自动炮塔，也，都，启动了。

超能力小队，也，都，准备好了。

那支车队，慢慢地，开到了，基地的，大门前。

然后，停了下来。

从，最前面的，一辆装甲车上，下来了，一个人。

那是一个，高大的，男人。

大约，四十多岁。

穿着，一身，黑色的，装甲。

装甲上，有，很多的，划痕，和，弹孔。

看起来，他，经历了，很多的战斗。

他的脸上，有，一道，长长的，伤疤。

从，左眼，一直，延伸到，下巴。

但是，他的眼睛，很亮，很有神。

他，走到了，大门前，然后，朝上面，喊：

"里面的人，听着！我是，钢铁兄弟会的，会长，铁山！我们，没有恶意！我们，只是，想，跟你们的首领，谈谈！"

你看着他，心里涌起了，一股，惊讶。

钢铁兄弟会？

这是，一个，你，从来没有，听说过的，势力。

但是，从，他们的，装备，和，规模来看，他们，绝对，不是，一个，小势力。

你该，怎么办？

是，跟他们，谈谈？
还是，拒绝他们？
还是，警惕地，观察？`,choices:[{id:`invite_them_in`,text:`邀请他们进来谈判`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`met_iron_brotherhood`}],next:`start`,result:`"打开大门。"你说，"邀请他们，进来，谈谈。"

"但是，首领……"老周，犹豫地说，"这，太危险了。"

"没关系。"你说，"他们，如果，想，打我们，早就，打了。他们，既然，想，谈，那我们，就，跟他们，谈谈。"

老周，想了想，然后，点了点头。

"好。"他说，"但是，我们，要，保持警戒。"

大门，慢慢地，打开了。

铁山，带着，四个，保镖，走了进来。

你，带着，老周，黑鸦，和，两个超能力者，在，大门里，等着他们。

铁山，看到你，上下打量了，你一番。

"你，就是，这个基地的，首领？"他问。

"对。"你说，"我是。"

铁山，点了点头。

"不错。"他说，"这么年轻，就能，建立，这么大的，一个基地。你，很了不起。"

"谢谢。"你说，"请问，你们，来这里，有什么事？"

铁山，看着你，认真地说：

"我们，是，钢铁兄弟会的。我们的基地，在，城北的，工业区。我们，有，五百多人。我们，主要，靠，收集和修理，机械设备，为生。"

"我们，听说了，你们的基地。我们，也，听说了，你们，打败了，进化者组织，关掉了迷雾。我们，很佩服你们。"

"所以，我们，想，跟你们，建立，友好关系。我们，想，跟你们，进行贸易。我们，有，很多的，机械设备，和，零件。我们，想，用这些，跟你们，交换，食物，药品，和，治愈抗体。"

你看着他，心里涌起了，一股，喜悦。

钢铁兄弟会。

五百多人。

有，很多的，机械设备，和，零件。

如果，能，跟他们，建立，友好关系，进行贸易。

那对你们，会是，很大的，帮助。

"好。"你说，"我们，愿意，跟你们，建立，友好关系，进行贸易。"

铁山，看着你，笑了。

"太好了。"他说，"我就知道，你，是，一个，聪明人。"

接下来，你们，进行了，详细的，谈判。

你们，达成了，贸易协议。

钢铁兄弟会，会，定期，给你们，运送，机械设备，和，零件。

你们，会，定期，给他们，运送，食物，药品，和，治愈抗体。

而且，你们，还，达成了，互助协议。

如果，任何一方，遭到了，攻击，另一方，会，提供，援助。

铁山，很满意。

"好。"他说，"我们，以后，就是，朋友了。"

他，伸出手，跟你，握了握。

然后，他，带着，他的人，离开了。

你看着，他们离开的方向，心里涌起了，一股，期待。

钢铁兄弟会。

这是，你们，在这个，新世界里，结交的，第一个，大势力。

而且，看起来，他们，是，可以，信任的。

【理智-3】

【结识新势力：钢铁兄弟会。首领：铁山。人口：500+人。基地：城北工业区。】

【达成协议：贸易协议（机械设备和零件 ↔ 食物、药品、治愈抗体）、互助协议（遭到攻击时互相援助）。】

【钢铁兄弟会关系：友好（+30）。】

【获得资源：机械设备x10，零件x50。】

【铁山好感度+20】

【重要伏笔：钢铁兄弟会。他们，会，给你们，带来，什么？】`},{id:`refuse_them`,text:`拒绝他们，让他们离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`"对不起。"你说，"我们，不欢迎，陌生人。你们，走吧。"

铁山，看着你，愣住了。

"什么？"他问，"你，拒绝了？"

"对。"你说，"我们，不需要，跟你们，建立关系。我们，也，不需要，跟你们，贸易。"

铁山，看着你，沉默了，一会儿。

然后，他，冷笑了一声。

"好。"他说，"我，本来，是，抱着，诚意，来的。但是，既然，你们，不欢迎，那我们，就，走了。"

他，转过身，带着，他的人，回到了，车上。

然后，那支车队，掉头，离开了。

你看着，他们离开的方向，心里涌起了，一股，复杂的感觉。

你，拒绝了，他们。

你不知道，你的决定，是对，还是错。

但是，你知道，在这个，危险的，新世界里，小心，总是，没错的。

老周，走到你身边，说：

"首领，你，真的，决定，不跟他们，来往？"

"对。"你说，"我们，还，不了解他们。我们，不能，冒险。"

老周，点了点头。

"你说得对。"他说，"小心，总是，没错的。"

但是，你，心里，还是，有，一些，不安。

你，总觉得，你，可能，错过了，什么。

钢铁兄弟会。

他们，会，成为，你们的朋友？

还是，会，成为，你们的敌人？

【理智-5】

【拒绝了钢铁兄弟会。他们，离开了。】

【钢铁兄弟会关系：中立（0）。】

【伏笔：钢铁兄弟会。他们，会，去哪里？他们，会，成为，你们的朋友，还是，敌人？】`,next:`__return__`}]},phase7_internal_conflict:{id:`phase7_internal_conflict`,text:`第80天，基地里，发生了，一件，不愉快的事情。

两个小组，因为，资源分配的问题，发生了，冲突。

一个小组，是，战斗组。
他们，负责，外出搜索，和，战斗。
他们，觉得，他们，最危险，最辛苦，所以，应该，分配到，更多的，食物，和，更好的，装备。

另一个小组，是，生产组。
他们，负责，种植，制造，和，建设。
他们，觉得，他们，最累，最忙，所以，应该，分配到，更多的，食物，和，更好的，住处。

两个小组，各执一词，互不相让。

最后，他们，甚至，动起了手。

虽然，没有，造成，严重的伤亡。
但是，有，几个人，受了伤。

而且，这件事，在，基地里，造成了，很坏的影响。

很多人，都，开始，议论纷纷。

有些人，支持，战斗组。
有些人，支持，生产组。
还有些人，觉得，两边，都，有问题。

基地里，出现了，分裂的，迹象。

你，作为，基地的首领，必须，处理，这件事。

你，召集了，两个小组的，组长，和，一些，代表，召开了，一次，会议。

在会议上，两边，又，吵了起来。

战斗组的组长，是，一个，叫，大壮的，男人。
他，以前，是，一个，拳击手。
他，很强壮，很能打。
他，觉得，战斗组，最危险，最辛苦，所以，应该，得到，更多的，资源。

生产组的组长，是，一个，叫，巧姐的，女人。
她，以前，是，一个，工厂的，车间主任。
她，很能干，很会管理。
她，觉得，生产组，最累，最忙，所以，应该，得到，更多的，资源。

两个人，在会议上，吵得，面红耳赤。

你，看着他们，心里涌起了，一股，头疼。

这，不是，一个，简单的，资源分配问题。

这，是，一个，关于，公平，和，正义的，问题。

你，必须，找到，一个，让，两边，都，能，接受的，解决方案。

否则，基地，就，会，分裂。

你该，怎么办？`,choices:[{id:`establish_fair_system`,text:`建立公平的积分系统，按贡献分配资源`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`fair_system_established`}],next:`start`,result:`"都，别吵了。"你说，声音，不大，但是，很有威严。

两边，都，安静了下来。

你看着他们，认真地说：

"你们，说的，都，有道理。战斗组，确实，很危险，很辛苦。生产组，确实，很累，很忙。"

"但是，资源分配，不能，只看，危险，或者，辛苦。资源分配，应该，看，贡献。"

"谁的贡献大，谁，就，应该，得到，更多的，资源。"

大壮，和，巧姐，都，看着你，若有所思。

"所以，"你继续说，"我决定，建立一个，积分系统。每个人，每天的工作，都会，被，记录，和，评分。根据，积分，来，分配，资源。"

"战斗组，外出搜索，和，战斗，会，根据，危险程度，和，收获，来，评分。"

"生产组，种植，制造，和，建设，会，根据，工作量，和，质量，来，评分。"

"其他的，工作，也，都会，有，相应的，评分标准。"

"这样，谁的贡献大，谁，就，会，得到，更多的，积分，也就，会，得到，更多的，资源。这，才是，真正的，公平。"

大壮，想了想，然后，点了点头。

"这个办法，不错。"他说，"只要，评分标准，公平，我，就，同意。"

巧姐，也，点了点头。

"我也同意。"她说，"只要，能，体现，我们生产组的，价值，我，就，没意见。"

你看着他们，点了点头。

"好。"你说，"那，我们，就，这么定了。接下来，我，会，让李刚，和，黑鸦，一起，制定，详细的，评分标准。你们，两边，都，可以，派代表，参与，制定。"

大壮，和，巧姐，都，点了点头。

接下来的几天里，李刚，和，黑鸦，带着，两边的代表，制定了，详细的，评分标准。

评分标准，很详细，很公平。

它，考虑了，各种，工作的，危险程度，辛苦程度，工作量，和，质量。

而且，它，还，有，一个，申诉机制。

如果，有人，觉得，自己的评分，不公平，可以，申诉。

申诉，会，由，一个，中立的，委员会，来，审理。

积分系统，正式，实施了。

实施后，基地里的，矛盾，大大地，减少了。

因为，每个人，都，知道，自己的，贡献，会，被，认可，和，回报。

而且，每个人，都，有了，努力工作的，动力。

因为，努力工作，就，能，得到，更多的积分，也就，能，得到，更多的，资源。

基地里的，气氛，变得，越来越好了。

【理智+3】

【建立了公平的积分系统。按贡献分配资源。】

【获得系统：积分系统。每个人的工作都会被记录和评分，根据积分分配资源。】

【基地矛盾：大大减少。】

【基地士气：大大提升。】

【大壮好感度+15】

【巧姐好感度+15】

【李刚好感度+10】

【黑鸦好感度+10】

【获得称号：公平的裁决者。魅力+5，智慧+5，所有NPC满意度+20%。】

【重要伏笔：积分系统。它，会，给基地，带来，什么？】`},{id:`punish_both_sides`,text:`惩罚两边闹事的人，杀鸡儆猴`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`punished_both_sides`}],next:`start`,result:`"够了！"你大声说，"都，给我，闭嘴！"

两边，都，被，你的气势，吓到了，安静了下来。

你看着他们，冷冷地说：

"你们，因为，一点，资源分配的问题，就，动手打架？你们，知道，这，造成了，多坏的，影响吗？"

"在这个，危险的，新世界里，我们，应该，团结一心，共同对外。而不是，在这里，内斗！"

"所以，我决定，两边，闹事的人，都，要，受到，惩罚！"

大壮，和，巧姐，都，愣住了。

"什么？"大壮说，"首领，我们……"

"别，废话。"你说，"大壮，你，作为，战斗组的组长，没有，管好，你的人，反而，带头闹事。罚你，一个月的，积分，减半。而且，罚你，带领，战斗组，完成，三次，最危险的，搜索任务。"

大壮，看着你，张了张嘴，但是，最终，还是，什么都，没说。

他，知道，你，说的，是对的。

然后，你看着，巧姐。

"巧姐，你，作为，生产组的组长，也，没有，管好，你的人，反而，跟，战斗组，对着干。罚你，一个月的，积分，减半。而且，罚你，带领，生产组，完成，三次，最繁重的，建设任务。"

巧姐，看着你，也，点了点头。

"我，接受惩罚。"她说。

然后，你看着，所有的人。

"还有，其他，参与打架的人，都，罚，半个月的，积分，减半。而且，都，要，写，检讨。"

所有人，都，低下了头。

"我，希望，这是，最后一次。"你说，"如果，再有，下次，惩罚，会，更重。明白了吗？"

"明白了。"所有人，都，小声说。

你看着他们，点了点头。

"好。散会。"

会议结束后，惩罚，正式，执行了。

基地里的，人，都，被，震慑住了。

他们，都，知道，你，是，说一不二的。

他们，都，不敢，再，闹事了。

但是，你，也，能，感觉到，有些人，对你，有了，一些，不满。

特别是，大壮，和，巧姐。

他们，虽然，表面上，接受了惩罚。

但是，你，能，感觉到，他们，心里，还是，有，一些，不服气。

你，知道，你的做法，虽然，暂时，解决了问题。

但是，并没有，从根本上，解决，资源分配的，矛盾。

这个矛盾，以后，可能，还会，爆发。

【理智-8】

【惩罚了两边闹事的人。杀鸡儆猴。】

【基地矛盾：暂时压制。但是，根本问题，没有解决。】

【基地士气：略有下降。】

【大壮好感度-10】

【巧姐好感度-10】

【获得称号：铁面无私的首领。威严+5，但是，部分NPC满意度-10%。】

【伏笔：资源分配的矛盾。它，以后，还会，爆发吗？】`}]}},kl=[{id:`phase7_mutant_swarm`,text:`一天清晨，瞭望塔上的哨兵，发出了紧急警报。

"首领！不好了！有一大群变异生物，朝我们的基地过来了！"

你赶紧跑到瞭望塔上，拿起望远镜看了看。

然后，你倒吸了一口凉气。

远处，密密麻麻的，全是变异生物。

有变异狼，变异熊，变异野猪，还有很多你叫不出名字的变异生物。

至少有几百只。

而且，它们的体型，都比普通的动物大很多。

它们的皮肤，都很坚硬。

它们的眼睛，都闪烁着红色的光芒。

它们，朝你们的基地，冲了过来。

"这是，怎么回事？"老周问，他也跑到了瞭望塔上。

"我不知道。"你说，"但是，看起来，它们是被什么东西吸引过来的。"

"会不会，是因为，我们的基地，有食物的味道？"黑鸦说。

"有可能。"你说，"不管怎样，我们必须，守住基地。"

你深吸一口气，然后下达了命令：

"所有人，各就各位！准备战斗！"

基地里，所有的战士，都进入了战斗位置。

围墙上的自动炮塔，都启动了。

超能力小队，也都准备好了。

变异生物群，到了。

战斗，开始了。`,minDay:68,maxTriggers:1,weight:6,choices:[{id:`defend_base`,text:`死守基地，用防御工事消耗它们`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`defended_mutant_swarm`}],result:`"死守基地！"你喊，"用防御工事，消耗它们！"

变异生物群，撞上了你们的围墙。

"开火！"你喊。

所有的武器，同时开火。

步枪，机枪，狙击枪，火焰喷射器，自动炮塔……

子弹，火焰，能量弹，像雨点一样，朝变异生物，射了过去。

最前面的变异生物，纷纷倒下。

但是，后面的变异生物，继续冲了上来。

它们，开始攀爬围墙。

它们，开始撞击大门。

"打眼睛！打眼睛是弱点！"老周喊。

你们，赶紧瞄准它们的眼睛，射击。

果然，打中眼睛后，它们就倒在了地上，不动了。

战斗，很惨烈。

围墙下，到处都是变异生物的尸体。

但是，变异生物，太多了。

它们，前赴后继，不停地进攻。

终于，有一只变异熊，爬上了围墙。

它朝你，扑了过来。

你握紧武器，朝它的眼睛，狠狠地刺了下去。

武器，刺进了它的眼睛。

它发出了一声凄厉的惨叫，然后倒在了地上。

但是，更多的变异生物，爬上了围墙。

超能力小队，冲了上来。

力量型的超能力者，用巨大的力量，把变异生物，扔了下去。

速度型的超能力者，用超快的速度，在变异生物之间，穿梭，攻击它们的眼睛。

能量型的超能力者，发射能量弹，轰炸变异生物群。

感知型的超能力者，感知变异生物的弱点，指挥其他人攻击。

有了超能力小队的加入，你们的防线，终于稳定了下来。

战斗，持续了整整一天。

终于，在黄昏时分，最后一只变异生物，被杀死了。

战斗，结束了。

你们，赢了。

但是，你们，也付出了惨重的代价。

你们的人，轻伤了二十几个。

重伤了五个。

牺牲了两个。

围墙，也被破坏了好几处。

但是，你们，守住了。

你们，打败了变异生物群。

【健康-15，理智-10】

【成功抵御变异生物群。击杀变异生物500+只。】

【我方伤亡：轻伤22人，重伤5人，牺牲2人。】

【围墙多处受损，需要修复。】

【获得战利品：变异生物材料x200（可以用来制造武器、装备和药品）。】

【获得称号：变异生物的克星。力量+3，耐力+3，所有战斗属性+2。】

【老周好感度+15】

【黑鸦好感度+15】

【超能力小队忠诚度+20】

【重要伏笔：变异生物群。它们，为什么，会突然来袭？是被什么东西吸引的？】`,next:`__return__`},{id:`use_superpower_squad`,text:`派超能力小队主动出击，打乱它们的阵型`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`used_superpower_squad`}],result:`"超能力小队，听令！"你喊，"主动出击，打乱它们的阵型！"

六个超能力者，点了点头。

然后，他们，冲出了基地。

力量型的超能力者，冲到变异生物群的最前面，用巨大的力量，把变异生物，一只一只地，扔了出去。

速度型的超能力者，在变异生物群之间，飞快地穿梭，攻击它们的眼睛。

能量型的超能力者，站在远处，发射能量弹，轰炸变异生物群的密集处。

感知型的超能力者，站在围墙上，感知变异生物的弱点和动向，指挥其他人攻击。

超能力小队的主动出击，果然打乱了变异生物群的阵型。

它们，开始混乱了。

它们，不知道该攻击谁了。

"就是现在！"你喊，"所有人，开火！"

围墙上的所有武器，同时开火。

子弹，火焰，能量弹，像雨点一样，朝混乱的变异生物群，射了过去。

变异生物，成片成片地倒下。

但是，它们，毕竟太多了。

虽然，阵型被打乱了。

但是，它们，还是，继续朝你们的基地，冲了过来。

战斗，依然很惨烈。

超能力小队，在变异生物群里，杀得七进七出。

他们，杀死了很多变异生物。

但是，他们，也受了伤。

力量型的超能力者，被一只变异熊，抓伤了手臂。

速度型的超能力者，被一只变异狼，咬伤了腿。

但是，他们，没有退缩。

他们，继续战斗。

终于，在黄昏时分，最后一只变异生物，被杀死了。

战斗，结束了。

你们，赢了。

而且，因为超能力小队的主动出击，你们的伤亡，比预期的要小。

你们的人，轻伤了十几个。

重伤了三个。

没有人牺牲。

围墙，也只被破坏了一两处。

但是，超能力小队，都受了伤。

他们，需要休息和治疗。

【理智-8】

【超能力小队主动出击，成功打乱变异生物群的阵型。】

【成功抵御变异生物群。击杀变异生物500+只。】

【我方伤亡：轻伤15人，重伤3人，无人牺牲。】

【超能力小队：全部受伤，需要休息和治疗。】

【围墙轻微受损。】

【获得战利品：变异生物材料x200。】

【获得称号：超能力的指挥官。智慧+3，领导力+3，超能力小队战斗力+10%。】

【老周好感度+10】

【黑鸦好感度+15】

【超能力小队忠诚度+30】

【重要伏笔：超能力小队。他们，越来越强了。但是，他们，也越来越危险了。】`,next:`__return__`}]},{id:`phase7_explore_ruins`,text:`基地稳定后，你决定组织一支探索队，去探索附近的废弃城市。

那个城市，在迷雾来临前，是一个繁华的大城市。

但是，迷雾来临后，那里的人，要么变成了怪物，要么逃走了。

现在，那里，是一座空城。

但是，空城里，可能有很多有用的东西。

食物，药品，武器，设备，资料……

而且，可能还有一些幸存者，躲在那里。

你组织了一支探索队。

有你，老周，黑鸦，两个超能力者，还有十个精锐战士。

你们，开着三辆改装过的越野车，出发了。

废弃城市，离你们的基地，大约有三十公里。

你们，开了大约一个小时，就到了。

城市里，很安静。

安静得让人害怕。

街道上，到处都是废弃的车辆，和散落的杂物。

建筑物上，爬满了藤蔓。

看起来，这里已经很久没有人来过了。

"小心点。"老周说，"这里可能有变异生物，也可能有其他的危险。"

你点了点头。

"大家，保持警惕。两人一组，不要单独行动。"

你们，开始探索。

你们，首先探索了一个大型超市。

超市里，还有很多食物。

虽然，有些已经过期了。

但是，还有很多罐头和压缩食品，是可以吃的。

你们，收集了很多食物。

然后，你们，探索了一个药店。

药店里，还有很多药品。

你们，也收集了很多药品。

然后，你们，探索了一个武器店。

武器店里，还有很多武器和弹药。

你们，也收集了很多武器和弹药。

收获，很丰富。

但是，就在你们，准备离开的时候。

感知型的超能力者，突然说：

"等等！我感觉到，有什么东西，在附近！"

你赶紧，让大家，停下来。

"在哪里？"你问。

"在那边。"超能力者，指着一个方向，"在那栋大楼里。有很多……生命反应。"

你看着那栋大楼，心里涌起了一股紧张。

那栋大楼，是城市的中心大厦。

有五十多层高。

里面，有什么？

是变异生物？
还是幸存者？
还是其他的什么？

你该怎么办？`,minDay:70,maxTriggers:1,weight:5,choices:[{id:`investigate_building`,text:`进入大楼调查`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`investigated_ruins_building`}],result:`"走，进去看看。"你说。

你带着探索队，走进了大楼。

大楼里，很暗，很潮湿。

墙壁上，爬满了藤蔓。

地上，散落着很多杂物。

你们，小心翼翼地，往上走。

感知型的超能力者，在前面带路。

"生命反应，越来越强了。"他说，"就在上面。"

你们，走到了第十层。

然后，你们，看到了。

在第十层的大厅里，有一群人。

大约有三十多个人。

他们，穿着破旧的衣服，看起来很憔悴。

但是，他们，都是活人。

是幸存者。

他们，看到你们，也很惊讶。

然后，一个中年男人，站了出来。

"你们……是什么人？"他问，声音在发抖。

"我们是新希望基地的人。"你说，"我们是来探索的。你们，是幸存者？"

那个中年男人，点了点头。

"对。"他说，"我们是幸存者。迷雾来的时候，我们躲在了这栋大楼里。我们，已经在这里，躲了几十天了。"

"你们，有多少人？"你问。

"三十多个人。"他说，"有老人，有孩子，有女人，也有男人。我们，靠大楼里的自动售货机，和储藏室里的食物，活到了现在。但是，食物，已经快吃完了。"

你看着他们，心里涌起了一股同情。

三十多个人，在这栋黑暗的大楼里，躲了几十天。

这太不容易了。

"你们，愿意跟我们走吗？"你问，"我们的基地，有食物，有水，有安全的住所。你们，可以加入我们。"

那个中年男人，看着你，眼睛里充满了希望。

"真的吗？"他问，"你们，真的愿意，收留我们？"

"当然。"你说，"我们都是幸存者。我们应该互相帮助。"

那个中年男人，转过身，对其他人说：

"大家，听到了吗？他们，愿意收留我们！我们，终于，可以离开这个鬼地方了！"

所有人，都欢呼了起来。

他们的眼睛里，都充满了泪水和希望。

你看着他们，也笑了。

你们，带着这三十多个幸存者，回到了基地。

基地里的人，都很欢迎他们。

李刚，给他们安排了住处和食物。

陈静，给他们做了体检。

他们，终于，安全了。

【理智-5】

【在废弃城市的中心大厦里，找到了30+个幸存者。】

【幸存者加入基地。基地人口：增加到180+人。】

【获得资源：食物x100，药品x50，武器x30，弹药x500。】

【获得称号：幸存者的救星。魅力+5，所有幸存者忠诚度+20%。】

【所有幸存者好感度+30】

【重要伏笔：废弃城市。那里，还有更多的秘密，和更多的幸存者，等待着你们去发现。】`,next:`__return__`},{id:`retreat_from_building`,text:`不进去，先撤退，以后再来`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],result:`"不进去了。"你说，"我们，先撤退。以后，再来。"

"为什么？"老周问，"里面，可能有幸存者，也可能有有用的东西。"

"但是，也可能有危险。"你说，"我们，不知道里面有什么。如果，里面有一大群变异生物，我们，可能会有很大的伤亡。我们，现在的主要任务，是把收集到的东西，带回基地。等以后，我们准备好了，再来探索这栋大楼。"

老周，想了想，然后点了点头。

"你说得对。"他说，"小心，总是没错的。"

你们，带着收集到的东西，撤退了。

你们，安全地回到了基地。

但是，你心里，总是惦记着那栋大楼。

里面，到底有什么？

是幸存者？

还是变异生物？

还是其他的什么？

你不知道。

但是，你知道，总有一天，你会回去的。

你会探索那栋大楼。

你会发现里面的秘密。

【理智-3】

【从废弃城市撤退。没有进入中心大厦。】

【获得资源：食物x80，药品x40，武器x20，弹药x300。】

【伏笔：中心大厦。里面，到底有什么？你，会回去探索吗？】`,next:`__return__`}]},{id:`phase7_superpower_out_of_control`,text:`一天晚上，基地里，突然传来了一声巨响。

你赶紧，跑了出去。

然后，你看到了。

训练室里，一片狼藉。

墙壁上，有一个巨大的洞。

地上，到处都是碎石和杂物。

而在训练室的中央，站着一个人。

是力量型的超能力者，大壮。

他的眼睛里，闪烁着红色的光芒。

他的身体，在发抖。

他的周围，有一股强大的气场，在不断地波动。

"大壮！"你喊，"你怎么了？"

大壮，转过头，看着你。

他的眼睛里，充满了痛苦和疯狂。

"首领……"他说，声音在发抖，"我……我控制不住……我的力量……它……它在……膨胀……"

说完，他突然，大吼了一声。

然后，一股强大的能量波，从他的身体里，爆发了出来。

训练室的墙壁，直接被震碎了。

附近的几个人，被震飞了出去。

"不好！"老周喊，"他的超能力，失控了！"

你看着大壮，心里涌起了一股紧张。

超能力失控。

这是你最担心的事情。

超能力，虽然强大。

但是，它也很危险。

如果，超能力者，不能控制自己的超能力。

那么，超能力，就会反过来，控制超能力者。

最终，超能力者，会变成一个没有理智的怪物。

就像那些被迷雾感染的人一样。

"怎么办？"黑鸦问，"要不要，杀了他？"

"不！"你说，"不能杀他！他是我们的同伴！我们，必须救他！"

"但是，他现在，很危险。"黑鸦说，"如果，我们不控制住他，他，可能会毁掉整个基地！"

你看着大壮，心里在盘算。

你该怎么办？

是，强行控制住他？
还是，尝试跟他沟通，让他自己恢复控制？
还是，用其他的方法？`,minDay:72,maxTriggers:1,weight:5,choices:[{id:`calm_him_down`,text:`尝试跟他沟通，让他冷静下来`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`calmed_superpower`}],result:`"大壮！"你大声喊，"听我说！你能听到我说话吗？"

大壮，看着你，眼睛里的红色光芒，闪烁了几下。

"首……领……"他说，声音很痛苦，"我……我……"

"大壮，你听我说。"你说，声音很平静，很温和，"你的力量，不是你的敌人。它，是你的一部分。你，不需要害怕它。你，也不需要对抗它。你，只需要，接受它，然后，控制它。"

"就像，你控制你的手臂一样。你，不需要用力去对抗它。你，只需要，想着，让它做什么，它，就会做什么。"

大壮，看着你，眼睛里的红色光芒，慢慢地，减弱了。

"接受……它……"他喃喃地说，"控制……它……"

"对。"你说，"深呼吸。慢慢地，深呼吸。想象你的力量，是一条河流。你，是河流的堤坝。你，不需要堵住河流。你，只需要，引导河流，让它，流向你想要的方向。"

大壮，慢慢地，开始深呼吸。

他的身体，慢慢地，停止了发抖。

他周围的气场，慢慢地，稳定了下来。

他眼睛里的红色光芒，慢慢地，消失了。

终于，他，恢复了正常。

他，瘫坐在地上，大口喘着气。

"首领……"他说，声音很虚弱，"谢谢你……"

你走到他身边，拍了拍他的肩膀。

"没事了。"你说，"都过去了。"

然后，你转过头，对陈静说：

"带他去医疗室，好好检查一下。"

陈静，点了点头，带着几个护士，把大壮，扶走了。

你看着训练室里的一片狼藉，心里涌起了一股后怕。

刚才，太危险了。

如果，大壮没有恢复控制。

后果，不堪设想。

但是，你也知道，这只是一个开始。

以后，还会有更多的超能力者，遇到同样的问题。

你，必须找到一个方法，帮助超能力者，更好地控制自己的超能力。

否则，超能力，会成为你们最大的威胁。

【理智-8】

【成功帮助大壮恢复控制。超能力失控危机解除。】

【大壮恢复正常。但是，需要休息和心理辅导。】

【训练室严重受损，需要修复。】

【获得经验：超能力控制方法。可以帮助其他超能力者，更好地控制自己的超能力。】

【大壮好感度+30】

【陈静好感度+10】

【超能力小队忠诚度+20】

【获得称号：超能力的引导者。智慧+5，魅力+5，所有超能力者控制能力+20%。】

【重要伏笔：超能力失控。这只是一个开始。以后，还会有更多的超能力者，遇到同样的问题。】`,next:`__return__`},{id:`forcefully_subdue`,text:`强行制服他，用镇静剂让他昏迷`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`subdued_superpower`}],result:`"上！强行制服他！"你喊，"陈静，准备镇静剂！"

老周，黑鸦，和其他几个超能力者，一起冲了上去。

力量型的超能力者，从正面，抱住了大壮。

速度型的超能力者，从侧面，攻击大壮的关节，让他失去平衡。

能量型的超能力者，用能量弹，限制大壮的行动。

老周和黑鸦，用绳子，试图绑住大壮。

但是，大壮的力量，太大了。

他，大吼了一声，然后，用力一挣。

抱住他的力量型超能力者，直接被甩飞了出去。

速度型的超能力者，被他一拳打中，飞了出去。

老周和黑鸦，也被震飞了。

"该死！"你骂了一句。

然后，你，拿起了一把狙击枪。

你，瞄准了大壮的腿。

然后，你，扣动了扳机。

"砰！"

子弹，打中了大壮的腿。

大壮，发出了一声惨叫，然后，单膝跪在了地上。

"就是现在！"你喊。

陈静，带着几个护士，冲了上去。

她，拿出了一支镇静剂，然后，用力地，扎进了大壮的脖子里。

镇静剂，很快就起作用了。

大壮的身体，慢慢地，软了下来。

他眼睛里的红色光芒，慢慢地，消失了。

终于，他，昏迷了过去。

你，靠在墙上，大口喘着气。

你的身上，有好几处伤。

刚才，太危险了。

如果，没有陈静的镇静剂。

后果，不堪设想。

"把他，带到医疗室。"你说，"好好看着他。等他醒了，第一时间通知我。"

陈静，点了点头，带着人，把大壮，抬走了。

你看着训练室里的一片狼藉，心里涌起了一股复杂的感觉。

你，强行制服了大壮。

但是，你也，打伤了他。

而且，你知道，这只是一个临时的解决方案。

等大壮醒了，他，可能还会失控。

你，必须找到一个根本的方法，帮助超能力者，控制自己的超能力。

否则，超能力，会成为你们最大的威胁。

【健康-10，理智-5】

【强行制服了大壮。用镇静剂让他昏迷。】

【大壮腿部中弹，需要治疗。而且，心理上，可能会有阴影。】

【训练室严重受损，需要修复。】

【我方伤亡：轻伤5人（包括2个超能力者）。】

【大壮好感度-10（他可能会对你有怨言）】

【陈静好感度+10】

【超能力小队忠诚度-5（他们可能会觉得，你太冷酷了）】

【伏笔：超能力失控。大壮醒了之后，会怎么样？他，会原谅你吗？他，还会失控吗？】`,next:`__return__`}]},{id:`phase7_refugee_wave`,text:`第80天，清晨。
瞭望塔上的哨兵，突然发出了警报。
"首领！有一大群人，朝我们的基地过来了！"
你赶紧跑到瞭望塔上，拿起望远镜看了看。
然后，你愣住了。
远处，有一大群人，正慢慢地朝你们的基地走来。
至少有一百多人。
有老人，有孩子，有女人，也有男人。
他们都穿着破旧的衣服，看起来很憔悴。
很多人都受了伤，或者生了病。
他们的脸上，充满了绝望和疲惫。
"这是……流民？"老周问，他也跑到了瞭望塔上。
"看起来是。"你说，"他们应该是从其他地方逃过来的。"
"怎么办？"老周问，"要不要让他们进来？"
你看着那些流民，心里涌起了一股复杂的感觉。
如果让他们进来，你们的基地，会增加一百多口人。
食物，水，住所，都会变得紧张。
而且，你们不知道这些人里面，有没有坏人，有没有病人，有没有间谍。
但是，如果不让他们进来。
他们，很可能会死在外面。
在这个危险的新世界里，没有庇护所的人，是活不了多久的。
你该怎么办？`,minDay:78,maxTriggers:1,weight:5,choices:[{id:`accept_refugees`,text:`接受所有流民，尽最大努力帮助他们`,effects:[{kind:`resource`,resource:`food`,delta:-50},{kind:`resource`,resource:`water`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`accepted_refugees`}],result:`"打开大门！"你说，"让他们都进来！"

"但是，首领……"李刚犹豫地说，"我们的食物和水，可能不够……"

"不够，我们就想办法。"你说，"他们都是人，都是幸存者。我们不能见死不救。"

李刚，想了想，然后点了点头。

"好。"他说，"我这就去安排。"

大门，慢慢地打开了。

一百多个流民，慢慢地走了进来。

他们看到你们的基地，眼睛里都充满了惊讶和感激。

"谢谢……谢谢你们……"一个老人，颤抖着说，"我们……我们走了好几天了……我们以为……我们会死在外面……"

你看着他们，心里涌起了一股酸楚。

"没事了。"你说，"你们安全了。"

你让李刚，给他们安排了临时的住所。

你让张大爷，给他们准备了食物和水。

你让陈静，给他们做了体检和治疗。

忙了整整一天，终于把所有的流民都安顿好了。

虽然，你们的物资，消耗了很多。

虽然，你们的基地，变得拥挤了。

但是，你知道，你做了正确的选择。

这些流民里面，有很多有用的人。

有医生，有工程师，有农民，有战士……

他们，会成为你们基地的新力量。

而且，你的善举，会传遍整个迷雾世界。

更多的幸存者，会愿意加入你们。

更多的势力，会愿意跟你们交朋友。

【食物-50，水-30，理智-5】

【接受了100+个流民。基地人口：增加到280+人。】

【流民中有各种专业人才：医生3人，工程师5人，农民10人，战士15人，其他各种专业人士20+人。】

【获得声望：仁慈之名。所有幸存者好感度+20。】

【获得称号：流民的庇护者。魅力+5，人口增长速度+30%。】

【所有NPC好感度+10】

【重要伏笔：流民潮。这只是一个开始。以后，还会有更多的流民，来到你们的基地。你们，能容纳多少人？】`,next:`__return__`},{id:`selective_accept`,text:`只接受有技能的青壮年，老人孩子拒绝`,effects:[{kind:`resource`,resource:`food`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`selective_accept`}],result:`"打开大门，但是只让有技能的青壮年进来。"你说，"老人和孩子……我们实在是养不起。"

老周，看了你一眼，眼神有些复杂。

"好。"他说，"我这就去安排。"

大门，打开了一条缝。

老周，带着几个战士，走了出去。

他们，开始筛选流民。

"有技能的，青壮年，进来。"老周说，"其他人……对不起，我们养不起。"

流民们，听到这话，都炸开了锅。

"什么？你们怎么能这样？"一个女人，抱着孩子，哭着说，"我的孩子……他才三岁……你们不能不管他啊……"

"我们……我们也能干活啊……"一个老人，颤抖着说，"求求你们……收留我们吧……"

但是，老周，摇了摇头。

"对不起。"他说，"我们真的养不起这么多人。"

最后，只有三十多个有技能的青壮年，被允许进入基地。

其他的七十多个人，被留在了外面。

他们，看着关闭的大门，眼睛里充满了绝望和怨恨。

"你们会遭报应的……"一个老人，诅咒着说，"你们这些冷血的家伙……你们会遭报应的……"

你站在瞭望塔上，看着他们离开的背影，心里涌起了一股愧疚。

你知道，你做了一个务实的选择。

但是，你也知道，你抛弃了那些无辜的老人和孩子。

他们，很可能会死在外面。

而这，都是你的选择。

【食物-20，理智-10】

【选择性接受了30+个有技能的青壮年。基地人口：增加到210+人。】

【获得声望：务实之名。部分幸存者好感度-10。】

【获得称号：冷血的决策者。智慧+3，但是魅力-3。】

【部分NPC好感度-5（他们可能会觉得，你太冷酷了）】

【重要伏笔：被拒绝的流民。他们，会去哪里？他们，会恨你们吗？他们，会成为你们的敌人吗？】`,next:`__return__`},{id:`refuse_all`,text:`拒绝所有流民，关闭大门`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`refused_refugees`}],result:`"关闭大门！"你说，"不让任何人进来！"

"但是，首领……"老周犹豫地说，"他们……他们看起来很可怜……"

"可怜？"你说，"我们自己都快养不活了！如果让他们进来，我们所有人都得饿死！"

老周，看了你一眼，眼神有些失望。

但是，他还是点了点头。

"好。"他说，"我这就去关闭大门。"

大门，重重地关上了。

流民们，看到关闭的大门，都炸开了锅。

"开门！求求你们开门！"他们，拍打着大门，哭喊着，"我们……我们只是想找个地方活下去啊……"

但是，大门，紧紧地关着。

没有人，给他们开门。

流民们，在大门外，哭了整整一天。

最后，他们，绝望地离开了。

你站在瞭望塔上，看着他们离开的背影，心里涌起了一股强烈的愧疚。

你知道，你做了一个自私的选择。

你为了保护自己的人，抛弃了那些无辜的流民。

他们，很可能会死在外面。

而这，都是你的选择。

而且，你的恶名，会传遍整个迷雾世界。

更多的幸存者，会害怕你们，憎恨你们。

更多的势力，会把你们当成敌人。

【理智-15】

【拒绝了所有流民。基地人口不变。】

【获得恶名：冷血之名。所有幸存者好感度-30。】

【获得称号：铁石心肠。领导力+3，但是魅力-10。】

【部分NPC好感度-15（他们可能会对你非常失望）】

【重要伏笔：被拒绝的流民。他们，会去哪里？他们，会恨你们吗？他们，会联合起来，对付你们吗？】`,next:`__return__`}]},{id:`phase7_merchant_visit`,text:`第82天，下午。
瞭望塔上的哨兵，突然发出了警报。
"首领！有一支商队，朝我们的基地过来了！"
你赶紧跑到瞭望塔上，拿起望远镜看了看。
然后，你笑了。
远处，有一支商队，正慢慢地朝你们的基地走来。
有五辆大卡车，还有十几个骑马的护卫。
每辆卡车上，都插着一面旗帜。
旗帜上，画着一个铜钱。
"是老狐狸的商队。"黑鸦说，他也跑到了瞭望塔上，"看来，他是来跟我们做生意的。"
你点了点头。
老狐狸。
流浪者商队的队长。
一个神秘的商人。
据说，他什么都能买到，什么都能卖掉。
而且，他的消息很灵通。
整个迷雾世界，没有他不知道的事情。
"打开大门。"你说，"邀请他们进来。"
大门，慢慢地打开了。
老狐狸的商队，慢慢地开了进来。
从最前面的一辆卡车上，下来了一个人。
那是一个干瘦的老头。
大约六十多岁。
穿着一身华丽的长袍。
脸上，带着狡猾的笑容。
他的眼睛，很亮，很有神。
看起来，就像一只老狐狸。
"哈哈哈！"他大笑着，朝你走了过来，"你就是新希望基地的首领吧？久仰久仰！我是老狐狸，流浪者商队的队长。"
你看着他，也笑了。
"你好。"你说，"欢迎来到新希望基地。请问，你这次来，是想做什么生意？"
老狐狸，嘿嘿一笑。
"我这次来，是带了很多好东西。"他说，"有食物，有药品，有武器，有弹药，有机械设备，有稀有材料，还有……一些特别的东西。"
"特别的东西？"你问。
"对。"老狐狸，神秘地笑了笑，"比如，情报。比如，超能力觉醒的方法。比如，迷雾的真相。比如……其他势力的秘密。"
你看着他，心里涌起了一股兴趣。
这个老狐狸，果然不简单。
"好。"你说，"我们看看你的货。"
老狐狸，拍了拍手。
他的手下，开始从卡车上搬货。
各种各样的货物，摆满了整个广场。
你看着这些货物，眼睛都亮了。
这些东西，对你们来说，都很有用。
但是，你也知道，老狐狸的东西，不便宜。
你该买什么？
你该怎么跟他讨价还价？`,minDay:80,maxTriggers:1,weight:5,choices:[{id:`buy_food_and_medicine`,text:`购买食物和药品（最急需的物资）`,effects:[{kind:`resource`,resource:`food`,delta:80},{kind:`resource`,resource:`water`,delta:50},{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`bought_from_merchant`}],result:`"我要买食物和药品。"你说，"我们现在最缺的，就是这些。"

老狐狸，嘿嘿一笑。

"好说，好说。"他说，"食物，我这里有一百单位。药品，我这里有五十单位。都是好东西。"

"多少钱？"你问。

"食物，一单位，五个迷雾积分。药品，一单位，十个迷雾积分。"老狐狸说，"总共，一千迷雾积分。"

"太贵了。"你说，"八百，怎么样？"

老狐狸，皱了皱眉头。

"八百？太低了吧？"他说，"这些东西，在别的地方，可不止这个价。"

"但是，我们是长期合作。"你说，"以后，我们还会跟你买很多东西。而且，我们基地，也有很多东西，可以卖给你。比如，变异生物材料，比如，治愈抗体，比如，我们自己制造的武器。"

老狐狸，想了想，然后笑了。

"好！"他说，"八百就八百！交个朋友！以后，我们就是长期合作伙伴了！"

你，也笑了。

"好。"你说，"合作愉快。"

你们，达成了交易。

你用八百迷雾积分，买了一百单位食物，五十单位药品。

这些物资，大大缓解了你们的压力。

而且，你还跟老狐狸，建立了长期合作关系。

以后，他会定期来跟你们做生意。

而且，他还会给你们提供情报。

【食物+80，水+50，理智+3】

【购买了食物100单位，药品50单位。花费：800迷雾积分。】

【与老狐狸建立长期合作关系。他会定期来做生意，并提供情报。】

【老狐狸好感度+20】

【获得情报：迷雾世界的大致地图。各个主要势力的位置和实力。】

【重要伏笔：老狐狸。他，到底是什么人？他，为什么什么都知道？他，会给你们带来什么？】`,next:`__return__`},{id:`buy_intelligence`,text:`购买情报（迷雾的真相，其他势力的秘密）`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`bought_intelligence`}],result:`"我要买情报。"你说，"我想知道，迷雾的真相，还有其他势力的秘密。"

老狐狸，眼睛一亮。

"哦？"他说，"你对这些感兴趣？这些东西，可不便宜啊。"

"多少钱？"你问。

"迷雾的真相，五百迷雾积分。"老狐狸说，"其他势力的秘密，一个势力，一百迷雾积分。你想买哪个？"

"我都要。"你说，"迷雾的真相，还有所有主要势力的秘密。"

老狐狸，惊讶地看着你。

"都要？"他说，"那可是……一千五百迷雾积分。你确定？"

"确定。"你说，"这些情报，对我们来说，很重要。"

老狐狸，想了想，然后点了点头。

"好。"他说，"一千五就一千五。不过，我得提醒你，有些真相，知道了，未必是好事。"

"我知道。"你说，"但是，我必须知道。"

老狐狸，叹了口气。

"好吧。"他说，"那我就告诉你。"

他，凑近你的耳朵，小声地，把迷雾的真相，告诉了你。

你听完之后，愣住了。

迷雾的真相，比你想象的，还要复杂，还要可怕。

然后，他又把各个主要势力的秘密，告诉了你。

钢铁兄弟会的秘密。

自由联盟的秘密。

进化者组织残余的秘密。

希望号安全区的秘密。

还有……先知的秘密。

你听完之后，心里涌起了一股强烈的震撼。

原来，这个世界，比你想象的，还要复杂，还要危险。

原来，每个势力，都有自己的秘密，自己的阴谋。

原来，你之前的很多认知，都是错的。

【理智-5】

【购买了迷雾的真相，以及所有主要势力的秘密。花费：1500迷雾积分。】

【获得关键情报：迷雾的真正来源。先知的真实身份。各个势力的弱点和阴谋。】

【老狐狸好感度+10】

【获得称号：真相的追寻者。智慧+5，所有情报获取速度+50%。】

【重要伏笔：迷雾的真相。知道了真相的你，会怎么做？你，能改变这个世界吗？】`,next:`__return__`},{id:`buy_rare_materials`,text:`购买稀有材料和特殊物品`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`bought_rare_materials`}],result:`"我要买稀有材料和特殊物品。"你说，"我们的研究和制造，需要这些东西。"

老狐狸，嘿嘿一笑。

"好说，好说。"他说，"我这里，可有不少好东西。变异生物的核心，迷雾晶石，古代科技的零件，还有……一些你想象不到的东西。"

他，从卡车里，搬出了几个大箱子。

打开一看，你愣住了。

箱子里，装满了各种稀有材料。

有发光的迷雾晶石。

有跳动的变异生物核心。

有精密的古代科技零件。

还有……一些你从来没见过的东西。

"这些……"你惊讶地说，"你是从哪里弄来的？"

"嘿嘿，商业机密。"老狐狸，神秘地笑了笑，"怎么样？这些东西，你要吗？"

"要。"你说，"多少钱？"

"这一箱，迷雾晶石，五百迷雾积分。"老狐狸说，"这一箱，变异生物核心，八百迷雾积分。这一箱，古代科技零件，一千迷雾积分。还有这一箱……特殊物品，两千迷雾积分。"

"特殊物品？"你问，"是什么？"

老狐狸，打开了最后一个箱子。

里面，有一本古老的书。

有一个奇怪的装置。

还有……一瓶发光的液体。

"这本书，是迷雾来临前，一个神秘学者写的。"老狐狸说，"里面，记载了很多关于超能力的秘密。这个装置，是古代科技的产物，可以增强超能力者的力量。这瓶液体……是我从一个神秘的地方弄来的。据说，喝了它，可以直接觉醒超能力。"

你看着这些东西，眼睛都亮了。

这些东西，对你们来说，太重要了。

"好。"你说，"我都要了。"

老狐狸，笑了。

"好！"他说，"总共，四千三百迷雾积分。给你打个折，四千。"

你，点了点头。

"好。"你说，"成交。"

你们，达成了交易。

你用四千迷雾积分，买了所有的稀有材料和特殊物品。

这些东西，会大大加速你们的研究和发展。

特别是那瓶发光的液体。

如果它真的能让人直接觉醒超能力……

那对你们来说，意义重大。

【理智+2】

【购买了稀有材料和特殊物品。花费：4000迷雾积分。】

【获得物品：迷雾晶石x50，变异生物核心x30，古代科技零件x20，神秘书籍x1，超能力增强装置x1，觉醒药剂x1。】

【陈博士好感度+30（他对这些研究材料非常感兴趣）】

【黑鸦好感度+20（他对超能力相关的东西很感兴趣）】

【老狐狸好感度+15】

【重要伏笔：觉醒药剂。它，真的能让人直接觉醒超能力吗？它，有什么副作用？你，会用它吗？】`,next:`__return__`}]}],Al={phase8_population_boom:{id:`phase8_population_boom`,text:`第91天，清晨。

李刚，急匆匆地，找到了你。

"首领！"他说，脸上带着兴奋，"我们的人口，突破200了！"

你愣住了。

200人？

你记得，上个月，你们的人口，才150人。

这才，一个月，就增加了50人？

"怎么，这么快？"你问。

"最近，有很多幸存者，听说了我们的基地。"李刚说，"他们，都，慕名而来。有，从附近城市来的，有，从其他幸存者团体来的，还有，从很远的地方来的。"

"而且，"他又说，"我们的医生，陈静，最近，接生了，好几个新生儿。我们的基地，第一次，有了，新出生的孩子。"

你看着他，心里涌起了，一股，复杂的感觉。

200人。

这意味着，你们的基地，已经，不再是，一个，简单的幸存者据点了。

它，已经，成为了，一个，真正的，小型社区。

但是，这也意味着，更大的责任。

200人，需要，更多的食物，更多的水，更多的住所，更多的医疗，更多的安全保障。

你们的基地，现在，能，承受得住吗？

"首领，"李刚说，"我们的宿舍，已经，不够住了。很多新来的人，只能，暂时，住在帐篷里。而且，我们的食堂，也，不够大了。很多人，只能，分批吃饭。"

"还有，"他又说，"我们的农田，产量，虽然，不错，但是，要养活200人，还是，有点，紧张。我们，需要，开辟，更多的农田。"

你看着他，点了点头。

"我知道了。"你说，"我们，必须，扩建基地。"

你，召集了，所有的核心成员，召开了，一次，紧急会议。

在会议上，你们，讨论了，基地扩建的，方案。

王工，提出了，一个，详细的，扩建计划。

包括，新建，更多的宿舍，食堂，医疗室，实验室，工坊，仓库，训练室。

还有，扩建，农田，灌溉系统，温室大棚。

还有，升级，发电设备，供水系统，防御工事。

整个计划，需要，大量的，材料，和，人力。

而且，需要，至少，一个月的时间，才能，完成。

但是，你们，现在，有200人。

其中，有，很多，能干的，工人，农民，医生，科学家，士兵。

你们，有，足够的，人力，来，完成，这个计划。

问题是，材料。

你们，需要，大量的，木材，石材，金属，水泥，玻璃，电线，管道……

这些材料，从哪里来？

你，该，怎么办？`,choices:[{id:`scavenge_materials`,text:`派人去废弃城市收集材料`,effects:[{kind:`resource`,resource:`energy`,delta:-20},{kind:`flag`,flag:`scavenged_materials`}],next:`start`,result:`"派人，去废弃城市，收集材料。"你说，"我们，需要，大量的材料，来扩建基地。废弃城市里，应该，有很多，我们需要的东西。"

老周，点了点头。

"好。"他说，"我，带一支搜索队，去废弃城市，收集材料。"

你，组织了，一支，大型搜索队。

有，老周，黑鸦，杜建国，还有，二十个，精锐战士。

你们，开着，五辆，改装过的，卡车，出发了。

废弃城市，离你们的基地，大约，五十公里。

你们，开了，大约，两个小时，就到了。

城市里，很安静。

但是，你们，能感觉到，有，很多，变异生物，在，城市里，游荡。

"小心点。"老周说，"这里，可能，有，很多，危险。"

你们，开始，收集材料。

你们，首先，去了，一个，大型建材市场。

市场里，有，很多，木材，石材，金属，水泥，玻璃，电线，管道……

你们，收集了，很多，材料。

然后，你们，去了，一个，大型五金店。

店里，有，很多，工具，零件，设备……

你们，也，收集了，很多。

然后，你们，去了，一个，大型超市。

超市里，有，很多，食物，药品，日用品……

你们，也，收集了，很多。

但是，就在你们，准备，离开的时候。

感知型的超能力者，突然，说：

"等等！我感觉到，有，一大群，变异生物，朝我们，过来了！"

你赶紧，让大家，停下来。

"有多少？"你问。

"至少，有，一百多只。"超能力者说，"而且，里面，有，几只，很强的。"

你看着，远处，心里涌起了，一股，紧张。

一百多只变异生物。

而且，里面，有，几只，很强的。

你们，现在，有，二十多个人。

而且，你们，收集了，很多，材料，卡车，都，装满了。

如果，跟变异生物，战斗，你们，可能，会，有，伤亡。

而且，你们，收集的材料，也，可能，会，损失。

但是，如果，不战斗，你们，就，只能，放弃，这些材料。

你，该，怎么办？

"战斗！"老周说，"我们，不能，放弃，这些材料！这些材料，对我们的基地扩建，太重要了！"

黑鸦，也，点了点头。

"对。"她说，"我们，有，超能力者，有，能量武器，我们，不一定，会输。"

你看着，他们，又看了看，远处，越来越近的，变异生物群。

然后，你，做出了，决定。

"好。"你说，"战斗！但是，我们，要，聪明地，战斗。我们，不能，硬拼。"

你，制定了，一个，战术。

你，让，杜建国，带着，几个工人，把，卡车，开到，一个，狭窄的，街道里。

然后，你，让，老周，带着，战士们，在，街道的，两端，布置，防线。

然后，你，让，黑鸦，带着，超能力者，在，街道旁边的，建筑物里，埋伏。

你们，准备，打一个，伏击战。

变异生物群，很快，就到了。

它们，冲进了，那条，狭窄的街道。

"开火！"你喊。

所有的武器，同时开火。

步枪，机枪，狙击枪，火焰喷射器，能量步枪……

子弹，火焰，能量弹，像雨点一样，朝变异生物，射了过去。

变异生物，纷纷倒下。

但是，它们，太多了。

后面的变异生物，继续，冲了上来。

而且，有，几只，很强的变异生物，普通的武器，根本，伤不了它们。

"超能力者，上！"你喊。

黑鸦，带着，超能力者，从，建筑物里，冲了出来。

力量型的超能力者，用，巨大的力量，把，变异生物，一只一只地，扔了出去。

速度型的超能力者，在，变异生物群之间，飞快地穿梭，攻击它们的眼睛。

能量型的超能力者，发射，能量弹，轰炸，变异生物群的，密集处。

感知型的超能力者，感知，变异生物的弱点，指挥，其他人，攻击。

有了，超能力者的，加入，你们的攻势，大大地，增强了。

终于，经过，一个小时的，激烈战斗。

最后一只变异生物，被，杀死了。

战斗，结束了。

你们，赢了。

但是，你们，也，付出了，代价。

你们的人，轻伤了，五个。

重伤了，一个。

没有人牺牲。

而且，你们，收集的材料，都，完好无损。

你们，带着，满满的，五卡车材料，回到了，基地。

基地里的人，看到，你们，带回来了，这么多材料，都，欢呼了起来。

王工，带着，工人们，开始了，基地扩建的，工作。

【体力-20】

【成功收集了大量材料。五卡车，满载而归。】

【击杀变异生物100+只。】

【我方伤亡：轻伤5人，重伤1人，无人牺牲。】

【基地扩建开始。预计一个月完成。】

【获得建筑：新宿舍（可容纳100人）、新食堂（可容纳200人同时就餐）、新医疗室、新实验室、新工坊、新仓库、新训练室。】

【获得建筑：扩建农田（新增30亩）、新灌溉系统、新温室大棚。】

【获得升级：发电站升级（发电量+50%）、供水系统升级（供水量+50%）、防御工事升级（围墙加高加厚，新增自动炮塔）。】

【老周好感度+15】

【黑鸦好感度+15】

【杜建国好感度+15】

【获得称号：材料的征服者。力量+3，耐力+3，所有建设速度+20%。】

【重要伏笔：基地扩建。200人的基地，会，发展成，什么样子？】`},{id:`trade_for_materials`,text:`跟钢铁兄弟会贸易，换取材料`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`traded_for_materials`}],next:`start`,result:`"跟钢铁兄弟会，贸易，换取材料。"你说，"他们，有，很多，机械设备，和，零件。他们，应该，也，有，很多，建筑材料。"

你，派人，去了，钢铁兄弟会的，基地。

你们，带了，很多，食物，药品，和，治愈抗体。

这些，都是，钢铁兄弟会，需要的东西。

铁山，看到，你们，带来了，这么多，东西，很，高兴。

"你们，需要，什么？"他问。

"我们，需要，建筑材料。"你说，"我们的人口，突破200了。我们，需要，扩建基地。我们，需要，木材，石材，金属，水泥，玻璃，电线，管道……"

铁山，想了想，然后，点了点头。

"这些东西，我们，有。"他说，"我们的基地，在，工业区。那里，有，很多，工厂，和，仓库。里面，有，很多，建筑材料。"

"而且，"他又说，"我们，还有，很多，工人。他们，很会，盖房子。如果，你们，需要，我们，可以，派，一些工人，去，帮你们，扩建基地。"

你看着他，心里涌起了，一股，喜悦。

钢铁兄弟会，不仅，能，提供，材料。

还能，提供，工人。

这，对你们的基地扩建，太有帮助了。

"好。"你说，"我们，跟你们，贸易。我们，用，食物，药品，和，治愈抗体，换取，你们的，建筑材料，和，工人。"

铁山，笑了。

"好。"他说，"我们，成交。"

接下来，你们，进行了，详细的，谈判。

你们，达成了，一个，长期的，贸易协议。

钢铁兄弟会，会，定期，给你们，运送，建筑材料。

而且，会，派，二十个，工人，去，帮你们，扩建基地。

作为，回报，你们，会，定期，给钢铁兄弟会，运送，食物，药品，和，治愈抗体。

而且，你们，还，会，给，钢铁兄弟会，提供，医疗支持。

陈静，会，定期，去，钢铁兄弟会，给他们的人，看病。

贸易协议，达成了。

铁山，很，高兴。

"太好了。"他说，"我们，以后，就是，真正的，盟友了。"

你，也，笑了。

"对。"你说，"我们，是，盟友。"

你们，带着，满满的，五卡车建筑材料，和，二十个工人，回到了，基地。

基地里的人，看到，你们，带回来了，这么多材料，和，工人，都，欢呼了起来。

王工，带着，工人们，和，钢铁兄弟会的工人，一起，开始了，基地扩建的，工作。

有了，足够的材料，和，足够的工人。

基地扩建的，速度，大大地，加快了。

原本，需要，一个月，才能，完成的，扩建工程。

现在，只需要，半个月，就能，完成。

【理智+3】

【与钢铁兄弟会达成长期贸易协议。】

【获得建筑材料：五卡车，满载而归。】

【获得工人：钢铁兄弟会派来20个熟练工人。】

【基地扩建开始。预计半个月完成。】

【钢铁兄弟会关系：友好+20（现在是+50）。】

【铁山好感度+20】

【陈静好感度+10】

【王工好感度+10】

【获得称号：贸易的大师。魅力+3，智慧+3，所有贸易收益+20%。】

【重要伏笔：钢铁兄弟会。你们的关系，越来越好了。以后，会，发展成，什么样子？】`}]},phase8_new_faction_free_alliance:{id:`phase8_new_faction_free_alliance`,text:`第100天，下午。

瞭望塔上的，哨兵，突然，发出了，警报。

"首领！"哨兵，通过对讲机，喊，"有，一支，车队，朝我们的基地，过来了！"

你赶紧，跑到了，瞭望塔上。

你拿起望远镜，看了看。

然后，你愣住了。

远处，有，一支，庞大的车队。

至少，有，三十多辆车。

有，卡车，有，装甲车，有，改装过的越野车，还有，几辆，大巴车。

而且，每辆车上，都，插着，一面，旗帜。

旗帜上，画着，一只，展翅的，雄鹰。

"这是，什么人？"老周，问，他也，跑到了，瞭望塔上。

"我不知道。"你说，"但是，看起来，他们，很有组织，很有实力。"

"比，钢铁兄弟会，还，强？"老周问。

"可能。"你说，"他们的车队，比，钢铁兄弟会的，还，大。"

那支车队，慢慢地，开到了，基地的，大门前。

然后，停了下来。

从，最前面的，一辆装甲车上，下来了，一个人。

那是一个，女人。

大约，三十多岁。

穿着，一身，迷彩服。

手里，拿着，一把，步枪。

她的头发，很短，很利落。

她的脸上，有，一道，浅浅的，伤疤。

但是，她的眼睛，很亮，很有神。

她，走到了，大门前，然后，朝上面，喊：

"里面的人，听着！我是，自由联盟的，盟主，林鹰！我们，没有恶意！我们，只是，想，跟你们的首领，谈谈！"

你看着她，心里涌起了，一股，惊讶。

自由联盟？

盟主，林鹰？

这是，一个，你，从来没有，听说过的，势力。

但是，从，他们的，装备，和，规模来看。

他们，绝对，不是，一个，小势力。

而且，他们的盟主，竟然，是，一个，女人。

这，在，这个，末世里，很，少见。

你，该，怎么办？

是，跟他们，谈谈？
还是，拒绝他们？
还是，警惕地，观察？`,choices:[{id:`invite_free_alliance`,text:`邀请他们进来谈判`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`met_free_alliance`}],next:`start`,result:`"打开大门。"你说，"邀请他们，进来，谈谈。"

老周，犹豫了一下。

"首领，"他说，"这，太危险了。他们，有，三十多辆车。如果，他们，有，恶意，我们，可能，会，很，被动。"

"没关系。"你说，"他们，如果，想，打我们，早就，打了。他们，既然，想，谈，那我们，就，跟他们，谈谈。而且，我们，也，需要，了解，这个，自由联盟，是，什么来头。"

老周，想了想，然后，点了点头。

"好。"他说，"但是，我们，要，保持，警戒。"

大门，慢慢地，打开了。

林鹰，带着，四个，保镖，走了进来。

你，带着，老周，黑鸦，和，两个超能力者，在，大门里，等着他们。

林鹰，看到你，上下打量了，你一番。

"你，就是，这个基地的，首领？"她问。

"对。"你说，"我是。"

林鹰，点了点头。

"不错。"她说，"这么年轻，就能，建立，这么大的，一个基地。你，很了不起。"

"谢谢。"你说，"请问，你们，来这里，有，什么事？"

林鹰，看着你，认真地说：

"我们，是，自由联盟的。我们的基地，在，城南的，大学城。我们，有，一千多人。我们，主要，由，前军人，警察，和，大学生，组成。"

"一千多人？"你问，很，惊讶。

"对。"林鹰说，"一千多人。而且，我们，有，很，强大的，军事力量。我们，有，前军人，组成的，正规军。我们，有，装甲车，有，重机枪，有，迫击炮。"

你看着她，心里涌起了，一股，震惊。

一千多人。

正规军。

装甲车，重机枪，迫击炮。

这个，自由联盟，太强了。

"你们，来这里，到底，想，干什么？"你问，语气，变得，有些，警惕。

林鹰，看着你，笑了笑。

"别紧张。"她说，"我们，没有恶意。我们，只是，想，跟你们，建立，友好关系。"

"我们，听说了，你们的基地。我们，也，听说了，你们，打败了，进化者组织，关掉了迷雾。我们，很，佩服你们。"

"而且，"她又说，"我们，还，听说了，你们，跟，钢铁兄弟会，建立了，贸易关系。我们，也，想，跟你们，建立，贸易关系。"

"我们，有，很多，武器，弹药，和，军事装备。我们，想，用这些，跟你们，交换，食物，药品，和，治愈抗体。"

你看着她，心里在，盘算。

自由联盟。

一千多人。

强大的军事力量。

如果，能，跟他们，建立，友好关系，进行贸易。

那对你们，会是，很大的，帮助。

但是，他们，太强了。

如果，他们，有，恶意，你们，可能，会，很，危险。

你，该，怎么办？

"好。"你说，"我们，愿意，跟你们，建立，友好关系，进行贸易。"

林鹰，看着你，笑了。

"太好了。"她说，"我就知道，你，是，一个，聪明人。"

接下来，你们，进行了，详细的，谈判。

你们，达成了，贸易协议。

自由联盟，会，定期，给你们，运送，武器，弹药，和，军事装备。

作为，回报，你们，会，定期，给自由联盟，运送，食物，药品，和，治愈抗体。

而且，你们，还，达成了，互助协议。

如果，任何一方，遭到了，攻击，另一方，会，提供，援助。

林鹰，很，满意。

"好。"她说，"我们，以后，就是，盟友了。"

她，伸出手，跟你，握了握。

然后，她，带着，她的人，离开了。

你看着，他们离开的方向，心里涌起了，一股，复杂的感觉。

自由联盟。

一千多人。

强大的军事力量。

他们，会，成为，你们的，朋友？

还是，会，成为，你们的，敌人？

你，不知道。

但是，你知道，在，这个，末世里，多一个朋友，总比，多一个敌人，好。

【理智-3】

【结识新势力：自由联盟。盟主：林鹰。人口：1000+人。基地：城南大学城。军事力量：强大（正规军、装甲车、重机枪、迫击炮）。】

【达成协议：贸易协议（武器弹药军事装备 ↔ 食物药品治愈抗体）、互助协议（遭到攻击时互相援助）。】

【自由联盟关系：友好（+20）。】

【获得资源：武器x50，弹药x1000，军事装备x20。】

【林鹰好感度+20】

【老周好感度+10】

【黑鸦好感度+10】

【重要伏笔：自由联盟。他们，太强了。他们，会，成为，你们的朋友，还是，敌人？】`},{id:`refuse_free_alliance`,text:`拒绝他们，保持警惕`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],result:`"对不起。"你说，"我们，不跟，陌生人，贸易。你们，走吧。"

林鹰，看着你，愣住了。

"什么？"她问，"你，拒绝了？"

"对。"你说，"我们，还，不了解，你们。我们，不能，冒险。"

林鹰，看着你，沉默了，一会儿。

然后，她，冷笑了一声。

"好。"她说，"我，本来，是，抱着，诚意，来的。但是，既然，你们，不欢迎，那我们，就，走了。"

"但是，我，提醒，你一句。"她又说，"在，这个，末世里，孤立无援，是，很，危险的。你们，好自为之。"

她，转过身，带着，她的人，回到了，车上。

然后，那支车队，掉头，离开了。

你看着，他们离开的方向，心里涌起了，一股，复杂的感觉。

你，拒绝了，他们。

你不知道，你的决定，是对，还是错。

但是，你知道，在，这个，危险的，末世里，小心，总是，没错的。

老周，走到你身边，说：

"首领，你，真的，决定，不跟他们，来往？"

"对。"你说，"他们，太强了。我们，还，不了解，他们。我们，不能，冒险。"

老周，点了点头。

"你说得对。"他说，"小心，总是，没错的。"

但是，你，心里，还是，有，一些，不安。

你，总觉得，你，可能，错过了，什么。

自由联盟。

一千多人。

强大的军事力量。

他们，会，去哪里？

他们，会，成为，你们的朋友？

还是，会，成为，你们的敌人？

【理智-5】

【拒绝了自由联盟。他们，离开了。】

【自由联盟关系：中立（0），但是，可能，有，一些，不满。】

【伏笔：自由联盟。他们，会，去哪里？他们，会，成为，你们的朋友，还是，敌人？】`,next:`__return__`}]}},jl=[{id:`phase8_superpower_evolution`,text:`一天，陈博士，急匆匆地，找到了你。

"首领！"他说，脸上带着兴奋，"重大发现！我们的超能力者，他们的超能力，在，进化！"

你愣住了。

超能力，进化？

"什么意思？"你问。

"我的意思是，"陈博士说，"我们的超能力者，他们的超能力，在，不断地，变强。而且，有些超能力者，还，觉醒了，新的，超能力！"

"比如，力量型的超能力者，大壮，他的力量，比，以前，强了，一倍。而且，他，还，觉醒了，皮肤硬化的能力。现在，普通的子弹，都，打不穿，他的皮肤。"

"还有，速度型的超能力者，小风，他的速度，比，以前，快了，一倍。而且，他，还，觉醒了，短暂飞行的能力。现在，他，可以，在空中，短暂地，飞行。"

"还有，能量型的超能力者，小雷，他的能量弹，威力，比，以前，大了，一倍。而且，他，还，觉醒了，能量护盾的能力。现在，他，可以，制造，一个，能量护盾，保护，自己，和，周围的人。"

"还有，感知型的超能力者，小灵，她的感知范围，比，以前，大了，一倍。而且，她，还，觉醒了，预知未来的能力。现在，她，可以，短暂地，预知，几秒钟后的，未来。"

你看着他，心里涌起了，一股，震惊。

超能力，在，进化。

而且，进化的，速度，很快。

这，意味着，什么？

意味着，超能力者，会，越来越强。

最终，他们，会，变成，什么样子？

"这，是，好事，还是，坏事？"你问。

陈博士，想了想，然后说：

"这，既是，好事，也是，坏事。"他说，"好事是，我们的超能力者，越来越强，我们的基地，也，越来越安全。坏事是，超能力者，越来越强，他们，可能，会，变得，越来越，难以控制。而且，他们，可能，会，变得，越来越，不像，普通人。"

"而且，"他又说，"我，还，发现，超能力者的，进化，似乎，跟，迷雾病毒，有关。迷雾病毒，虽然，被，关掉了，但是，它，已经，改变了，超能力者的，基因。而且，这种，基因改变，还，在，继续。"

"我，担心，"他说，"有一天，超能力者，会，进化到，一个，我们，无法，想象的，程度。到，那个时候，他们，还，会，是，人类吗？"

你看着他，心里涌起了，一股，不安。

超能力者，在，进化。

最终，他们，会，变成，什么样子？

他们，还，会，是，人类吗？

你，不知道。

但是，你知道，你，必须，关注，这个，问题。

否则，有一天，超能力者，可能，会，变成，你们，最大的，威胁。`,minDay:95,maxTriggers:1,weight:5,choices:[{id:`study_evolution`,text:`让陈博士深入研究超能力进化`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`studied_evolution`}],result:`"让陈博士，深入研究，超能力进化。"你说，"我们，必须，了解，超能力进化的，原理，和，趋势。否则，我们，可能，会，遇到，大麻烦。"

陈博士，点了点头。

"好。"他说，"我，会，深入研究，这个问题。"

接下来的日子里，陈博士，带着，他的研究团队，开始了，超能力进化的，深入研究。

他们，研究了，超能力者的，基因变化。

他们，研究了，超能力者的，大脑活动。

他们，研究了，超能力者的，身体机能。

他们，还，研究了，超能力者的，超能力，使用情况。

经过，半个月的，研究。

陈博士，终于，有了，重大发现。

"首领！"他，找到了你，兴奋地说，"我，发现了！超能力进化的，原理！"

"什么原理？"你问。

"超能力进化，跟，超能力的，使用，有关。"陈博士说，"超能力者，使用，超能力，越多，他们的，超能力，就，进化得，越快。而且，使用，超能力，的方式，也，会，影响，进化的，方向。"

"比如，经常，用力量，战斗的，超能力者，会，进化出，更强的力量，和，更强的，防御。经常，用速度，逃跑的，超能力者，会，进化出，更快的速度，和，更强的，感知。"

"而且，"他又说，"我，还，发现，超能力进化，是，有，极限的。当，超能力者，进化到，一定程度，他们的，进化，就，会，停止。这个，极限，取决于，超能力者的，基因，和，意志力。"

"大部分超能力者，进化到，一定程度，就，会，停止。但是，少数，基因优秀，意志力强大的，超能力者，可能，会，继续，进化，直到，达到，一个，很高的，程度。"

你看着他，心里涌起了，一股，复杂的感觉。

超能力进化，跟，使用，有关。

使用得越多，进化得越快。

这，意味着，超能力者，会，越来越强。

但是，进化，有，极限。

大部分超能力者，不会，无限地，进化。

这，让你，稍微，放心了，一些。

"那，超能力者，进化到，最后，会，变成，什么样子？"你问。

陈博士，想了想，然后说：

"根据，我的研究，"他说，"超能力者，进化到，最后，会，变成，一种，新的，人类。他们，拥有，超能力，拥有，更强的身体，和，更强的大脑。但是，他们，依然，是，人类。他们，依然，有，人类的，情感，和，理智。"

"除非，"他又说，"他们，过度地，使用，超能力，导致，理智，丧失。那样的话，他们，就，会，变成，没有理智的，怪物。"

你看着他，点了点头。

"我知道了。"你说，"我们，必须，控制，超能力者的，超能力，使用。不能，让他们，过度地，使用，超能力。"

"对。"陈博士说，"而且，我们，还，必须，关注，超能力者的，心理状态。确保，他们，不会，因为，超能力，而，失去，理智。"

你，召集了，所有的超能力者，召开了，一次，会议。

在会议上，你，告诉了，他们，超能力进化的，研究结果。

你，告诉了，他们，过度使用超能力的，危险。

你，制定了，超能力使用的，规则。

超能力者，每天，使用超能力的，时间，不能，超过，一定的，限制。

而且，超能力者，必须，定期，接受，心理检查。

如果，有超能力者，出现了，理智丧失的，迹象，就，必须，立即，停止，使用超能力，接受，治疗。

所有的超能力者，都，同意了，这些规则。

他们，都，知道，超能力，虽然，强大，但是，也，很，危险。

他们，都，不想，变成，没有理智的，怪物。

【理智+3】

【超能力进化研究完成。了解了超能力进化的原理和趋势。】

【获得知识：超能力进化原理（使用越多进化越快，进化有极限，过度使用会丧失理智）。】

【建立规则：超能力使用规则（每天使用时间限制，定期心理检查，理智丧失迹象立即停止使用）。】

【超能力小队：全部进化了一次。能力+30%。部分超能力者觉醒了新能力。】

【陈博士好感度+20】

【超能力小队忠诚度+20】

【获得称号：超能力的引导者。智慧+5，魅力+5，所有超能力者控制能力+30%。】

【重要伏笔：超能力进化。超能力者，会，进化到，什么程度？他们，会，变成，新人类，还是，怪物？】`,next:`__return__`}]},{id:`phase8_trade_caravan`,text:`一天，李刚，找到了你。

"首领，"他说，"有，一支，大型贸易商队，路过，我们的基地。他们，想，跟我们，进行贸易。"

"贸易商队？"你问，"什么贸易商队？"

"是，一个，叫，'流浪者商队'的，商队。"李刚说，"他们，有，二十多辆车，有，一百多个人。他们，在，各个幸存者基地之间，进行贸易。他们，有，很多，稀奇古怪的，东西。"

"而且，"他又说，"他们的，商队队长，是，一个，叫，老狐狸的，男人。据说，他，很，精明，很，会做生意。"

你看着他，心里涌起了，一股，兴趣。

流浪者商队。

在各个幸存者基地之间，进行贸易。

有，很多，稀奇古怪的，东西。

这，可能，是，一个，好机会。

你们，可以，从他们那里，买到，一些，你们，需要的，东西。

也可以，把你们，多余的，东西，卖给他们。

"好。"你说，"我们，去，看看。"

你，带着，李刚，和，几个战士，来到了，基地的，大门外。

贸易商队，已经，在，大门外，搭起了，帐篷。

他们，把，各种商品，摆了出来。

有，食物，药品，武器，弹药，工具，设备，书籍，地图，纪念品……

甚至，还有，一些，你，从来没有，见过的，东西。

一个，中年男人，看到，你们，走了过来。

他，穿着，一身，破旧的，商人服装。

戴着，一顶，宽边帽。

脸上，带着，精明的，笑容。

他，就是，老狐狸。

"欢迎，欢迎！"他说，"我是，流浪者商队的，队长，老狐狸。你们，就是，新希望基地的，人吧？"

"对。"你说，"我是，新希望基地的，首领。"

老狐狸，上下打量了，你一番。

"不错，不错。"他说，"这么年轻，就能，建立，这么大的，一个基地。你，很了不起。"

"谢谢。"你说，"你们，这里，都，有，什么东西？"

老狐狸，笑了笑。

"我们，这里，什么都有。"他说，"食物，药品，武器，弹药，工具，设备，书籍，地图，纪念品……只要，你，能，想到的，我们，这里，都，有。"

"而且，"他又说，"我们，这里，还有，一些，很，特别的，东西。比如，进化者组织的，研究资料。比如，军方的，秘密文件。比如，一些，神秘的，古董。"

你看着他，心里涌起了，一股，兴趣。

进化者组织的，研究资料。

军方的，秘密文件。

这些，都是，很，有价值的，东西。

"你们，这里，有，进化者组织的，研究资料？"你问。

"当然。"老狐狸说，"我们，从，进化者组织的，一个，废弃据点里，找到了，很多，研究资料。这些资料，很，有价值。如果，你们，想要，我，可以，便宜，卖给你们。"

"多少钱？"你问。

老狐狸，想了想，然后说：

"这样吧。"他说，"我，看，你们，是，诚实的，人。我，给你们，一个，优惠价。一百斤食物，或者，十支治愈抗体，怎么样？"

你看着他，心里在，盘算。

一百斤食物，或者，十支治愈抗体。

这个价格，不算，贵。

进化者组织的，研究资料，可能，会，给你们，带来，很大的，帮助。

但是，你，也，不知道，这些资料，到底，有，多少，价值。

你，该，怎么办？`,minDay:100,maxTriggers:1,weight:5,choices:[{id:`buy_research_data`,text:`购买进化者组织的研究资料`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`bought_research_data`}],result:`"好。"你说，"我们，买，进化者组织的，研究资料。"

你，让李刚，拿来了，一百斤食物。

老狐狸，接过食物，检查了一下。

"不错，不错。"他说，"都是，好东西。"

然后，他，从，一辆卡车里，拿出了，一个，大箱子。

"这里面，就是，进化者组织的，研究资料。"他说，"有，纸质的，文件，也有，电子的，数据。你们，慢慢，看。"

你，接过箱子，打开看了看。

里面，确实，有，很多，文件，和，数据硬盘。

你，让李刚，把箱子，搬回了，基地。

然后，你，把，这些资料，交给了，陈博士。

陈博士，看到，这些资料，很，兴奋。

"太好了！"他说，"这些资料，太，有价值了！"

接下来的日子里，陈博士，带着，他的研究团队，开始了，这些资料的，研究。

他们，发现，这些资料，包含了，进化者组织的，很多，核心研究。

包括，迷雾病毒的，完整基因序列。

包括，超能力的，觉醒原理。

包括，进化者组织的，超能力者，培养计划。

包括，进化者组织的，终极目标——创造，新人类。

而且，他们，还，发现了，一些，很，重要的，信息。

比如，进化者组织，在，世界各地，都，有，据点。

比如，进化者组织，还有，很多，成员，没有，被，消灭。

比如，进化者组织的，创始人，先知，可能，还，没有，真正地，死去。

你，看着，这些信息，心里涌起了，一股，不安。

进化者组织，还有，很多，成员，没有，被，消灭。

先知，可能，还，没有，真正地，死去。

这，意味着，什么？

意味着，进化者组织，可能，还，会，卷土重来。

你们，还，没有，真正地，安全。

"首领，"陈博士说，"这些资料，太，重要了。我们，必须，继续，深入研究。而且，我们，必须，做好，准备。如果，进化者组织，真的，卷土重来，我们，必须，有，能力，应对。"

你，点了点头。

"你说得对。"你说，"我们，必须，做好，准备。"

你，召集了，所有的核心成员，召开了，一次，紧急会议。

在会议上，你，告诉了，他们，这些资料的，内容。

所有人，都，很，震惊。

进化者组织，还，没有，被，完全消灭。

先知，可能，还，活着。

这，太，可怕了。

"我们，必须，加强，防御。"老周说，"我们，必须，让，我们的基地，更，安全。"

"对。"黑鸦说，"而且，我们，必须，加强，情报收集。我们，必须，知道，进化者组织的，残余，在哪里，在，干什么。"

"还有，"陈博士说，"我们，必须，继续，研究，进化者组织的，资料。我们，必须，了解，他们的，计划，和，弱点。"

你，看着，他们，点了点头。

"好。"你说，"我们，就，这么做。"

接下来的日子里，你们，加强了，基地的，防御。

你们，加强了，情报收集。

你们，继续，研究，进化者组织的，资料。

你们，做好了，应对，进化者组织，卷土重来的，准备。

【理智+3】

【购买了进化者组织的研究资料。】

【获得重要情报：迷雾病毒完整基因序列、超能力觉醒原理、进化者组织超能力者培养计划、进化者组织终极目标（创造新人类）。】

【获得重要情报：进化者组织在世界各地都有据点、还有很多成员没有被消灭、先知可能还没有真正死去。】

【基地防御：加强。】

【情报收集：加强。】

【陈博士好感度+20】

【老周好感度+10】

【黑鸦好感度+15】

【获得称号：真相的追寻者。智慧+5，感知+5，所有研究速度+20%。】

【重要伏笔：进化者组织残余。他们，在哪里？他们，在，干什么？先知，真的，还，活着吗？】`,next:`__return__`},{id:`trade_for_weapons`,text:`跟他们贸易，购买武器和装备`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`traded_for_weapons`}],result:`"我们，跟他们，贸易，购买，武器和装备。"你说，"我们的基地，需要，更多的，武器，和，装备。"

你，在，贸易商队里，逛了，一圈。

你，发现，他们，有，很多，武器，和，装备。

有，步枪，手枪，猎枪，狙击枪，机枪……

有，子弹，手榴弹，炸药……

有，防弹衣，头盔，盾牌……

有，望远镜，对讲机，夜视仪……

甚至，还有，几把，能量武器。

你，挑选了，很多，武器，和，装备。

然后，你，跟老狐狸，进行了，讨价还价。

最终，你们，用，五百斤食物，和，二十支治愈抗体，换取了，大量的，武器，和，装备。

包括，五十支步枪，十支狙击枪，五挺机枪，一万发子弹，一百颗手榴弹，二十件防弹衣，二十个头盔，十个望远镜，二十个对讲机，五个夜视仪，还有，两把，能量步枪。

老狐狸，看着，你们，搬走了，这么多，武器，和，装备，笑了笑。

"不错，不错。"他说，"你们，很，会，买东西。"

你，也，笑了笑。

"谢谢。"你说，"希望，我们，以后，还能，继续，贸易。"

"当然。"老狐狸说，"我们，流浪者商队，会，定期，路过，这里。下次，我们，还，会，来。"

你，带着，大量的，武器，和，装备，回到了，基地。

基地里的，战士们，看到，这么多，新武器，和，新装备，都，欢呼了起来。

老周，看着，这些武器，和，装备，很，高兴。

"太好了！"他说，"有了，这些武器，和，装备，我们的，战斗力，会，大大地，提升。"

接下来的日子里，老周，带着，战士们，开始了，新武器，和，新装备的，训练。

你们的，战斗力，大大地，提升了。

【理智+2】

【与流浪者商队进行了贸易。购买了大量武器和装备。】

【获得武器：步枪x50、狙击枪x10、机枪x5、能量步枪x2。】

【获得弹药：子弹x10000、手榴弹x100。】

【获得装备：防弹衣x20、头盔x20、盾牌x10、望远镜x10、对讲机x20、夜视仪x5。】

【基地战斗力：+30%。】

【老周好感度+15】

【李刚好感度+10】

【获得称号：军备的大师。力量+3，军事+3，所有战士战斗力+10%。】

【重要伏笔：流浪者商队。他们，还会，来。下次，他们，会，带来，什么？】`,next:`__return__`}]},{id:`phase8_free_alliance_invitation`,text:`第100天，上午。
瞭望塔上的哨兵，突然发出了警报。
"首领！有一支队伍，朝我们的基地过来了！他们举着白旗！"
你赶紧跑到瞭望塔上，拿起望远镜看了看。
然后，你愣住了。
远处，有一支队伍，正慢慢地朝你们的基地走来。
大约有二十多个人。
他们都穿着整齐的制服。
而且，他们都举着白旗。
走在最前面的，是一个高大的男人。
大约三十多岁。
穿着一身蓝色的军装。
他的肩上，扛着一面旗帜。
旗帜上，画着一只展翅的雄鹰。
"这是……自由联盟的人？"黑鸦说，她也跑到了瞭望塔上，"那面旗帜，是自由联盟的标志。"
自由联盟。
你听说过这个势力。
据说，他们是由一群前军人和警察组成的。
他们的首领，叫林鹰。
一个传奇人物。
据说，他曾经是特种部队的队长。
迷雾来临后，他带领着一群人，建立了自由联盟。
他们的理念，是恢复秩序，重建文明。
而且，他们的实力很强。
据说，他们有一千多人。
而且，他们有很多武器和装备。
"打开大门。"你说，"邀请他们进来。"
大门，慢慢地打开了。
自由联盟的队伍，慢慢地走了进来。
那个高大的男人，走到你面前，然后，敬了一个标准的军礼。
"你好。"他说，声音很洪亮，"我是自由联盟的副盟主，赵刚。我们的盟主林鹰，派我来，给你送一封信。"
他，从怀里，掏出了一封信，递给了你。
你接过信，打开看了看。
信是林鹰写的。
他在信里，表达了对你的敬意。
他说，他听说了你的事迹。
他说，你建立了新希望基地，拯救了很多幸存者。
他说，你是一个真正的领袖。
然后，他在信里，提出了一个邀请。
他邀请你，参加一个会议。
一个，所有大势力的会议。
会议的时间，是一个月后。
会议的地点，是在自由联盟的基地。
会议的目的，是讨论，如何在这个迷雾世界里，建立新的秩序。
如何，共同对抗迷雾的威胁。
如何，重建人类文明。
参加会议的，有自由联盟，有钢铁兄弟会，有希望号安全区，有进化者组织残余，还有……你，新希望基地。
你看完信，心里涌起了一股复杂的感觉。
所有大势力的会议。
这意味着，你已经被公认为，迷雾世界的主要势力之一了。
但是，这也意味着，你将卷入，更大的政治漩涡。
你该怎么办？
是，接受邀请，参加会议？
还是，拒绝邀请，保持中立？
还是，提出其他的条件？`,minDay:98,maxTriggers:1,weight:5,choices:[{id:`accept_invitation`,text:`接受邀请，参加会议`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`accepted_alliance_meeting`}],result:`"好。"你说，"我接受邀请。我会参加这个会议。"

赵刚，看着你，笑了。

"好。"他说，"我们盟主，一定会很高兴。他说，你是一个有远见的人。他相信，你一定会做出正确的选择。"

你，也笑了。

"谢谢。"你说，"我也很期待，与你们盟主见面。"

接下来，你和赵刚，进行了详细的交谈。

他告诉了你很多关于自由联盟的事情。

自由联盟，有一千二百多人。

其中，有三百多战士。

他们的基地，在城东的军事基地里。

那里，有坚固的防御工事，有大量的武器弹药，还有完整的军事设施。

他们的盟主林鹰，是一个很有魅力的人。

他不仅战斗力强，而且很有智慧，很有远见。

很多人，都愿意追随他。

赵刚还告诉了你，关于其他势力的情况。

钢铁兄弟会，有五百多人，主要靠工业和制造为生。

希望号安全区，有八百多人，主要靠农业和贸易为生。

进化者组织残余，有三百多人，主要靠超能力和掠夺为生。

还有一些小势力，散落在各个地方。

整个迷雾世界，大约有五千多幸存者。

而迷雾，还在不断地扩张。

如果，人类不能团结起来。

那么，用不了多久，人类就会彻底灭亡。

所以，林鹰才提议，召开这个会议。

他希望，所有的势力，能够团结起来，共同对抗迷雾的威胁。

你听完之后，心里涌起了一股强烈的震撼。

原来，这个世界，比你想象的，还要大，还要复杂。

原来，你所做的一切，只是这个大故事的一小部分。

但是，你也知道，你已经成为了这个故事的重要角色。

你的选择，将会影响，整个人类的命运。

【理智+3】

【接受了自由联盟的邀请。将参加一个月后的大势力会议。】

【结识了自由联盟副盟主赵刚。】

【获得情报：自由联盟的详细情况。其他主要势力的详细情况。整个迷雾世界的幸存者数量。】

【自由联盟关系：友好（+20）。】

【赵刚好感度+15】

【获得称号：大势力的领袖。领导力+5，魅力+5，所有势力初始关系+10。】

【重要伏笔：大势力会议。一个月后，你将参加这个会议。在那里，你会遇到什么？你会做出什么选择？人类的命运，将会如何？】`,next:`__return__`},{id:`refuse_invitation`,text:`拒绝邀请，保持中立`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`refused_alliance_meeting`}],result:`"对不起。"你说，"我不能接受邀请。我们的基地，还有很多事情要处理。我走不开。"

赵刚，看着你，眼神有些失望。

"真的吗？"他说，"我们盟主，真的很希望你能参加。他说，你是一个很重要的人。你的参与，对会议的成功，至关重要。"

"我很抱歉。"你说，"但是，我真的走不开。我们的基地，正在扩建。而且，我们还有很多内部问题要解决。"

赵刚，想了想，然后叹了口气。

"好吧。"他说，"我理解。但是，我希望你能再考虑考虑。会议，是一个月后。在这一个月里，你随时可以改变主意。"

"而且，"他又说，"即使你不参加会议，我们自由联盟，也愿意跟你们新希望基地，保持友好关系。我们希望，我们能成为朋友。"

你，点了点头。

"好。"你说，"我们也愿意，跟你们保持友好关系。"

赵刚，笑了笑。

"那好。"他说，"我就先回去了。如果，你改变了主意，随时可以联系我们。"

说完，他带着他的人，离开了。

你站在大门前，看着他们离开的背影，心里涌起了一股复杂的感觉。

你拒绝了邀请。

你选择了，保持中立。

但是，你知道，这可能是一个错误的选择。

在这个危险的新世界里，单打独斗，是很难生存的。

而且，你错过了，一个影响人类命运的机会。

但是，你也知道，你有你的苦衷。

你的基地，还不够强大。

你的内部，还有很多问题。

你需要时间，来发展，来巩固。

也许，等你足够强大了，你再参与这些政治斗争，也不迟。

【理智-3】

【拒绝了自由联盟的邀请。将不参加大势力会议。】

【自由联盟关系：中立（+0）。】

【赵刚好感度+5（他理解你的选择）】

【获得称号：中立的守护者。智慧+3，但是领导力-3。】

【重要伏笔：大势力会议。你没有参加。那么，会议上，会发生什么？其他势力，会怎么看待你？你，会后悔吗？】`,next:`__return__`},{id:`propose_conditions`,text:`接受邀请，但提出条件（要求其他势力承认你的领地和主权）`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`conditional_accept`}],result:`"好。"你说，"我接受邀请。但是，我有一个条件。"

赵刚，看着你，眼睛一亮。

"什么条件？"他问，"你说。只要是合理的，我们盟主，一定会考虑。"

"我要求，"你说，声音很坚定，"在会议上，所有势力，必须承认，新希望基地的领地和主权。我们基地周围，五十公里以内的区域，都是我们的领土。任何势力，不得侵犯。"

赵刚，愣住了。

他没想到，你会提出这样的条件。

"这……"他犹豫地说，"这个条件，有点……我需要，回去跟我们盟主商量。"

"没关系。"你说，"你可以回去商量。但是，这是我的底线。如果，其他势力，不承认我们的领地和主权。那么，我就不参加会议。"

赵刚，想了想，然后点了点头。

"好。"他说，"我明白了。我会把你的条件，带给我们盟主。我相信，他会认真考虑的。"

"而且，"他又说，"说实话，我很佩服你。你是一个真正的领袖。你知道，你要什么。你知道，怎么为你的人争取利益。"

你，笑了笑。

"谢谢。"你说，"我只是，在做我应该做的事情。"

接下来，你和赵刚，又进行了详细的交谈。

他告诉了你很多关于自由联盟和其他势力的事情。

你也告诉了他，很多关于新希望基地的事情。

你们，互相了解了很多。

最后，赵刚，带着他的人，离开了。

你站在大门前，看着他们离开的背影，心里涌起了一股期待。

你提出了条件。

你要求，其他势力，承认你的领地和主权。

这是一个大胆的要求。

但是，你知道，这是必要的。

在这个混乱的新世界里，你必须，为你的人，争取一个安全的家园。

而且，你相信，你的实力，配得上这个要求。

新希望基地，已经是迷雾世界的主要势力之一了。

你的声音，应该被听到。

你的利益，应该被尊重。

【理智+5】

【有条件地接受了邀请。要求其他势力承认新希望基地的领地和主权。】

【结识了自由联盟副盟主赵刚。他对你评价很高。】

【获得情报：自由联盟的详细情况。其他主要势力的详细情况。】

【自由联盟关系：友好（+30）。】

【赵刚好感度+25】

【获得称号：主权的捍卫者。领导力+5，智慧+5，所有势力对你的尊重度+20。】

【重要伏笔：大势力会议。一个月后，你将参加这个会议。你的条件，会被接受吗？在会议上，你会遇到什么？你会做出什么选择？】`,next:`__return__`}]},{id:`phase8_evolution_crisis`,text:`第105天，深夜。
基地里，突然传来了一声巨响。
然后，整个基地，都开始震动。
你赶紧，跑了出去。
然后，你看到了。
训练室的方向，发出了，强烈的光芒。
那光芒，是蓝色的。
而且，那光芒，在不断地，增强。
"怎么回事？"你问，"发生什么了？"
"是超能力者！"一个战士，跑过来，气喘吁吁地说，"是……是速度型的超能力者，小风！他……他的超能力，突然，进化了！"
你愣住了。
超能力进化？
你赶紧，跑到了训练室。
然后，你看到了。
训练室里，一片狼藉。
墙壁上，有很多洞。
地上，到处都是碎石。
而在训练室的中央，站着一个人。
是小风。
速度型的超能力者。
他的身体，被蓝色的光芒，包围着。
他的眼睛里，闪烁着蓝色的光芒。
他的周围，有一股强大的气场，在不断地波动。
而且，他的身体，在不断地，颤抖。
看起来，他很痛苦。
"小风！"你喊，"你怎么了？"
小风，转过头，看着你。
他的眼睛里，充满了痛苦和疯狂。
"首领……"他说，声音在发抖，"我……我感觉到……我的力量……它……它在……进化……它……它变得……越来越强……我……我控制不住……"
说完，他突然，大吼了一声。
然后，他的身体，消失了。
不，不是消失了。
是他的速度，太快了。
快到，你的眼睛，根本跟不上。
你只看到，一道道蓝色的残影，在训练室里，飞快地穿梭。
然后，训练室的墙壁上，又多了很多洞。
"不好！"黑鸦喊，她也跑了过来，"他的超能力，进化了！他的速度，比以前快了十倍！但是，他控制不住！如果，他继续这样下去，他会毁掉整个基地！"
你看着，那些飞快穿梭的蓝色残影，心里涌起了一股紧张。
超能力进化。
这是你最担心的事情。
超能力，虽然强大。
但是，它也很危险。
如果，超能力者，不能控制自己的超能力。
那么，超能力，就会反过来，控制超能力者。
最终，超能力者，会变成一个没有理智的怪物。
"怎么办？"老周问，"要不要，杀了他？"
"不！"你说，"不能杀他！他是我们的同伴！我们，必须救他！"
"但是，他现在，很危险。"老周说，"如果，我们不控制住他，他，可能会毁掉整个基地！而且，他可能会伤到其他人！"
你看着，那些飞快穿梭的蓝色残影，心里在盘算。
你该怎么办？
是，强行控制住他？
还是，尝试跟他沟通，让他自己恢复控制？
还是，用其他的方法？`,minDay:103,maxTriggers:1,weight:5,choices:[{id:`help_him_evolve`,text:`帮助他控制进化后的力量，引导他完成进化`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`helped_evolution`}],result:`"小风！"你大声喊，"听我说！你能听到我说话吗？"

那些蓝色的残影，突然，停了下来。

小风，出现在你的面前。

他的眼睛里，还是充满了痛苦和疯狂。

"首……领……"他说，声音很痛苦，"我……我……"

"小风，你听我说。"你说，声音很平静，很温和，"你的力量，不是你的敌人。它，是你的一部分。它在进化，这是好事。这说明，你在变强。"

"但是，你不需要害怕它。你，也不需要对抗它。你，只需要，接受它，然后，控制它。"

"就像，你控制你的手臂一样。你，不需要用力去对抗它。你，只需要，想着，让它做什么，它，就会做什么。"

小风，看着你，眼睛里的蓝色光芒，闪烁了几下。

"接受……它……"他喃喃地说，"控制……它……"

"对。"你说，"深呼吸。慢慢地，深呼吸。想象你的力量，是一条河流。你，是河流的堤坝。你，不需要堵住河流。你，只需要，引导河流，让它，流向你想要的方向。"

"现在，你的力量，进化了。它，变得更强大了。就像，河流，变成了大江。但是，原理是一样的。你，只需要，引导它。"

小风，慢慢地，开始深呼吸。

他的身体，慢慢地，停止了发抖。

他周围的蓝色光芒，慢慢地，稳定了下来。

他眼睛里的蓝色光芒，慢慢地，变得清澈了。

终于，他，恢复了正常。

他，瘫坐在地上，大口喘着气。

但是，他的身体周围，还是有一层淡淡的蓝色光芒。

而且，他的眼睛里，还是有一丝蓝色的光芒。

他的超能力，已经完成了进化。

而且，他成功地，控制住了进化后的力量。

"首领……"他说，声音很虚弱，"谢谢你……我……我做到了……"

你走到他身边，拍了拍他的肩膀。

"没事了。"你说，"都过去了。你做得很好。"

然后，你转过头，对陈静说：

"带他去医疗室，好好检查一下。"

陈静，点了点头，带着几个护士，把小风，扶走了。

你看着训练室里的一片狼藉，心里涌起了一股复杂的感觉。

小风的超能力，进化了。

他的速度，比以前快了十倍。

而且，他成功地，控制住了进化后的力量。

这意味着，你们的超能力小队，又变强了。

但是，你也知道，这只是一个开始。

以后，还会有更多的超能力者，遇到同样的问题。

而且，超能力进化，也会带来，更多的危险。

你，必须找到一个方法，帮助超能力者，更好地控制自己的超能力。

否则，超能力，会成为你们最大的威胁。

【理智-10】

【成功帮助小风完成超能力进化。他的速度提升了十倍。】

【小风恢复正常。超能力进化完成。】

【训练室严重受损，需要修复。】

【获得经验：超能力进化的引导方法。可以帮助其他超能力者，完成进化。】

【小风好感度+40】

【陈静好感度+10】

【超能力小队忠诚度+30】

【获得称号：超能力进化的引导者。智慧+5，魅力+5，所有超能力者进化成功率+30%。】

【重要伏笔：超能力进化。这只是一个开始。以后，还会有更多的超能力者，完成进化。他们，会变得多强？超能力的极限，在哪里？】`,next:`__return__`},{id:`forcefully_stop_him`,text:`强行阻止他，用镇静剂让他昏迷，等他自己稳定`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`stopped_evolution`}],result:`"上！强行阻止他！"你喊，"陈静，准备镇静剂！"

老周，黑鸦，和其他几个超能力者，一起冲了上去。

但是，小风的速度，太快了。

他们，根本碰不到他。

小风，在他们之间，飞快地穿梭。

每一次穿梭，都会留下一道蓝色的残影。

而且，每一次穿梭，都会有人被打伤。

"该死！"你骂了一句。

然后，你，拿起了一把狙击枪。

你，瞄准了小风的腿。

但是，他的速度，太快了。

你，根本瞄准不了。

"感知型的超能力者！"你喊，"帮我预测他的位置！"

感知型的超能力者，点了点头。

他，闭上眼睛，开始感知。

"他会在……三秒钟后，出现在你的左前方！"他喊。

你，立刻，瞄准了左前方。

三秒钟后。

小风，果然，出现在了那里。

你，扣动了扳机。

"砰！"

子弹，打中了小风的腿。

小风，发出了一声惨叫，然后，摔倒在了地上。

"就是现在！"你喊。

陈静，带着几个护士，冲了上去。

她，拿出了一支大剂量的镇静剂，然后，用力地，扎进了小风的脖子里。

镇静剂，很快就起作用了。

小风的身体，慢慢地，软了下来。

他眼睛里的蓝色光芒，慢慢地，消失了。

他周围的蓝色光芒，慢慢地，消散了。

终于，他，昏迷了过去。

但是，他的超能力进化，被打断了。

他，没有完成进化。

你，靠在墙上，大口喘着气。

你的身上，有好几处伤。

刚才，太危险了。

如果，没有感知型超能力者的帮助。

你，根本打不中小风。

后果，不堪设想。

"把他，带到医疗室。"你说，"好好看着他。等他醒了，第一时间通知我。"

陈静，点了点头，带着人，把小风，抬走了。

你看着训练室里的一片狼藉，心里涌起了一股复杂的感觉。

你，强行阻止了小风。

但是，你也，打断了他的超能力进化。

而且，你打伤了他。

你不知道，他醒了之后，会怎么样。

他，会原谅你吗？

他，还能完成进化吗？

而且，你知道，这只是一个临时的解决方案。

以后，还会有更多的超能力者，遇到同样的问题。

你，必须找到一个根本的方法，帮助超能力者，控制自己的超能力。

否则，超能力，会成为你们最大的威胁。

【健康-15，理智-8】

【强行阻止了小风。用大剂量镇静剂让他昏迷。】

【小风腿部中弹，需要治疗。超能力进化被打断。他，可能永远无法完成进化了。】

【训练室严重受损，需要修复。】

【我方伤亡：轻伤8人（包括3个超能力者）。】

【小风好感度-20（他可能会对你有怨言，觉得你不相信他）】

【陈静好感度+10】

【超能力小队忠诚度-10（他们可能会觉得，你太冷酷了）】

【获得称号：果断的指挥官。领导力+3，但是魅力-3。】

【重要伏笔：超能力进化。小风的进化，被打断了。他，醒了之后，会怎么样？他，还能完成进化吗？他，会恨你吗？】`,next:`__return__`}]}],Ml={phase9_evolutionists_return:{id:`phase9_evolutionists_return`,text:`第121天，凌晨。

一声，巨大的爆炸声，把，所有人，都，惊醒了。

你，赶紧，穿上衣服，跑了出去。

然后，你，看到了。

基地的，东墙，被，炸开了，一个，巨大的，缺口。

围墙外面，有，一大群，人。

他们，穿着，黑色的制服。

他们的眼睛，都，闪烁着，红色的，光芒。

他们，是，进化者组织的，残余！

"进化者组织！"老周，喊，"他们，卷土重来了！"

你，看着，那群人，心里涌起了，一股，强烈的，紧张。

进化者组织的，残余。

他们，居然，还，有，这么多，人。

而且，他们，居然，敢，主动，进攻，你们的基地。

"所有人，各就各位！"你喊，"准备，战斗！"

基地里的，所有战士，都，行动了起来。

老周，带着，战斗组，在，缺口处，布置防线。

黑鸦，带着，超能力小队，准备，迎战。

杜建国，带着，工人，开始，修复，缺口。

陈静，带着，医疗队，在，后方，准备，救治伤员。

进化者组织的，残余，开始，进攻了。

他们，朝，缺口，冲了过来。

"开火！"老周，喊。

所有的武器，同时，开火。

步枪，机枪，狙击枪，火焰喷射器，能量步枪……

子弹，火焰，能量弹，像雨点一样，朝，进化者组织的，残余，射了过去。

最前面的，几个人，倒下了。

但是，后面的人，继续，冲了上来。

而且，你，注意到，这些人，跟，普通的，进化者组织成员，不一样。

他们，更强壮，更敏捷。

他们的眼睛，红色的光芒，更亮。

他们，好像，拥有，超能力。

"小心！"黑鸦，喊，"他们，有，超能力者！"

话音刚落，一个，进化者组织的，超能力者，朝，你们，发射了，一道，能量弹。

能量弹，打在了，围墙上，把，围墙，炸开了，一个，更大的，缺口。

"该死！"老周，骂，"他们，有，能量型的，超能力者！"

"超能力小队，上！"你喊。

黑鸦，带着，超能力小队，冲了上去。

力量型的，超能力者，大壮，朝，对方的，力量型超能力者，冲了过去。

速度型的，超能力者，小风，在，对方的，阵营里，飞快地穿梭，攻击，他们的弱点。

能量型的，超能力者，小雷，朝，对方的，能量型超能力者，发射，能量弹。

感知型的，超能力者，小灵，感知，对方的，动向，指挥，其他人，攻击。

一场，超能力者之间的，大战，开始了。

这是，你们，第一次，遇到，拥有，超能力的，敌人。

而且，对方的，超能力者，看起来，比，你们的，更强。

因为，他们，是，进化者组织，专门，培养的，超能力战士。

他们，经过了，更严格的，训练，和，更深入的，改造。

你们的，超能力小队，渐渐，落入了，下风。

大壮，被，对方的，力量型超能力者，打伤了。

小风，被，对方的，速度型超能力者，追上了，差点，被，杀死。

小雷，的，能量弹，被，对方的，能量型超能力者，挡住了。

"撤退！"你喊，"先，撤退，保存实力！"

黑鸦，带着，超能力小队，撤退了。

进化者组织的，残余，趁机，冲进了，基地。

"所有人，撤退到，内城！"你喊，"我们，在，内城，继续，抵抗！"

你们，撤退到了，内城。

进化者组织的，残余，占领了，外城。

战斗，暂时，停止了。

你，靠在，内城的，围墙上，大口喘着气。

你的身上，有，好几道，伤口。

但是，你，不在乎。

你，在乎的是，进化者组织的，残余，居然，这么强。

而且，他们，居然，敢，主动，进攻，你们的基地。

这，意味着，什么？

意味着，进化者组织的，残余，已经，恢复了，实力。

意味着，他们，有，信心，消灭，你们。

意味着，真正的，战斗，才，刚刚，开始。

"首领，"老周，走到你身边，说，"我们，现在，怎么办？"

你，看着，外城的，方向，心里在，盘算。

进化者组织的，残余，占领了，外城。

他们，有，超能力者。

他们，比，你们，强。

你们，现在，处于，劣势。

你，该，怎么办？

是，死守内城，等待，援军？
还是，主动出击，夺回外城？
还是，跟，他们，谈判？`,choices:[{id:`defend_and_wait`,text:`死守内城，向钢铁兄弟会和自由联盟求援`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`defended_and_waited`}],next:`start`,result:`"死守内城！"你说，"向，钢铁兄弟会，和，自由联盟，求援！"

你，赶紧，派人，去，钢铁兄弟会，和，自由联盟，求援。

然后，你，带着，所有人，死守，内城。

进化者组织的，残余，很快，就，开始，进攻，内城了。

"所有人，各就各位！"你喊，"准备，战斗！"

内城的，保卫战，开始了。

进化者组织的，残余，一次，又一次地，朝，内城，发起，进攻。

你们，一次，又一次地，打退了，他们。

战斗，很惨烈。

内城的，围墙，被，炸开了，好几个，缺口。

你们的人，伤亡，很大。

但是，你们，没有，放弃。

因为，你们，知道，援军，正在，赶来。

终于，在，第三天，援军，到了。

钢铁兄弟会的，铁山，带着，两百个，战士，赶到了。

自由联盟的，林鹰，带着，三百个，正规军，赶到了。

"我们，来，支援，你们！"铁山，喊。

"进化者组织，是，我们，共同的，敌人！"林鹰，喊。

三方联军，朝，进化者组织的，残余，发起了，反攻。

进化者组织的，残余，没有，想到，你们，会，有，这么多，援军。

他们，被，打了，一个，措手不及。

经过，一天的，激烈战斗。

你们，终于，夺回了，外城。

进化者组织的，残余，撤退了。

但是，他们，没有，被，完全消灭。

他们，带着，剩下的人，撤退到了，城外。

"他们，还会，回来的。"老周，说，"这次，他们，只是，试探。下次，他们，会，带，更多的，人，来。"

你，点了点头。

"我知道。"你说，"所以，我们，必须，做好，准备。"

你，召集了，铁山，林鹰，和，所有的，核心成员，召开了，一次，紧急会议。

在会议上，你们，讨论了，进化者组织的，威胁。

你们，决定，建立，一个，三方联盟。

共同，对抗，进化者组织。

你们，还，决定，加强，各自的，防御。

并且，定期，交换，情报。

"进化者组织，是，我们，共同的，敌人。"林鹰，说，"我们，必须，团结一心，才能，打败，他们。"

"对。"铁山，说，"我们，钢铁兄弟会，会，全力，支持，联盟。"

你，看着，他们，点了点头。

"好。"你说，"从今天起，我们，就是，盟友了。"

三方联盟，正式，成立了。

你们，做好了，应对，进化者组织，再次进攻的，准备。

【健康-10，理智-5】

【进化者组织卷土重来，进攻了基地。占领了外城。】

【三方联军反攻，夺回了外城。进化者组织残余撤退。】

【我方伤亡：轻伤30人，重伤10人，牺牲5人。】

【钢铁兄弟会伤亡：轻伤10人，重伤3人，牺牲1人。】

【自由联盟伤亡：轻伤15人，重伤5人，牺牲2人。】

【进化者组织残余：伤亡约50人，剩余约100人。】

【建立三方联盟：新希望基地、钢铁兄弟会、自由联盟。共同对抗进化者组织。】

【基地外城：严重受损，需要修复。】

【铁山好感度+20】

【林鹰好感度+20】

【老周好感度+15】

【黑鸦好感度+15】

【获得称号：联盟的缔造者。魅力+5，领导力+5，所有盟友战斗力+10%。】

【重要伏笔：进化者组织残余。他们，还会，回来的。下次，他们，会，带，更多的，人。】`},{id:`counterattack`,text:`主动出击，趁他们立足未稳夺回外城`,effects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`counterattacked`}],next:`start`,result:`"主动出击！"你说，"趁，他们，立足未稳，夺回，外城！"

老周，看着你，愣住了。

"首领，"他说，"这，太，冒险了。他们，比，我们，强。我们，主动出击，可能，会，有，很大的，伤亡。"

"但是，如果，我们，不，主动出击。"你说，"他们，就会，巩固，外城的，防御。到，那个时候，我们，就，更难，夺回，外城了。"

老周，想了想，然后，点了点头。

"你说得对。"他说，"我们，必须，趁，他们，立足未稳，主动出击。"

你，召集了，所有的，精锐战士，和，超能力小队。

"兄弟们！"你说，"进化者组织，占领了，我们的，外城。我们，必须，把，它，夺回来！"

"我们，趁，他们，立足未稳，主动出击！"

"你们，准备好了吗？"

所有人，都，大声喊：

"准备好了！"

你，点了点头。

"出发！"你喊。

你，带着，精锐战士，和，超能力小队，从，内城的，一个，秘密通道，潜入了，外城。

进化者组织的，残余，没有，想到，你们，会，主动出击。

他们，正在，外城，休息，和，整理，战利品。

"就是现在！"你喊，"进攻！"

你们，朝，进化者组织的，残余，发起了，突然袭击。

进化者组织的，残余，被，打了，一个，措手不及。

他们，混乱了。

但是，他们，很快，就，反应了过来。

他们，开始，组织，反击。

一场，激烈的，巷战，开始了。

外城的，街道上，到处，都是，战斗。

你们，利用，熟悉的，地形，跟，进化者组织的，残余，周旋。

超能力小队，在，战斗中，发挥了，巨大的，作用。

大壮，用，巨大的，力量，把，敌人，一只一只地，扔了出去。

小风，在，敌人的，阵营里，飞快地穿梭，攻击，他们的弱点。

小雷，发射，能量弹，轰炸，敌人的，密集处。

小灵，感知，敌人的，动向，指挥，其他人，攻击。

但是，进化者组织的，超能力者，也，很强。

他们，跟，你们的，超能力小队，打得，难解难分。

战斗，持续了，整整，一天。

终于，在，黄昏时分，你们，打败了，进化者组织的，残余。

他们，带着，剩下的人，撤退了。

你们，夺回了，外城。

但是，你们，也，付出了，惨重的，代价。

你们的，精锐战士，伤亡，很大。

超能力小队，也，都，受了伤。

你，自己，也，受了，重伤。

但是，你们，赢了。

你们，夺回了，外城。

你们，打败了，进化者组织的，残余。

"首领，"老周，走到你身边，说，"我们，赢了。"

你，靠在，墙上，大口喘着气。

"对。"你说，"我们，赢了。"

"但是，"你又说，"他们，还会，回来的。这次，他们，只是，试探。下次，他们，会，带，更多的，人。"

老周，点了点头。

"我知道。"他说，"所以，我们，必须，做好，准备。"

你，召集了，所有的，核心成员，召开了，一次，紧急会议。

在会议上，你们，讨论了，进化者组织的，威胁。

你们，决定，加强，基地的，防御。

并且，派人，去，钢铁兄弟会，和，自由联盟，寻求，联盟。

"进化者组织，是，我们，共同的，敌人。"你说，"我们，必须，跟，其他势力，联合起来，才能，打败，他们。"

所有人，都，点了点头。

你，派人，去了，钢铁兄弟会，和，自由联盟。

铁山，和，林鹰，都，同意，跟，你们，建立，联盟。

三方联盟，正式，成立了。

你们，做好了，应对，进化者组织，再次进攻的，准备。

【健康-20，理智-10】

【主动出击，趁进化者组织立足未稳，夺回了外城。】

【我方伤亡：轻伤20人，重伤8人，牺牲3人。】

【超能力小队：全部受伤。】

【进化者组织残余：伤亡约80人，剩余约70人。】

【建立三方联盟：新希望基地、钢铁兄弟会、自由联盟。】

【基地外城：受损，需要修复。】

【老周好感度+20】

【黑鸦好感度+20】

【超能力小队忠诚度+30】

【获得称号：勇猛的反击者。力量+5，勇气+5，所有战士士气+20%。】

【重要伏笔：进化者组织残余。他们，还会，回来的。下次，他们，会，带，更多的，人。】`}]}},Nl=[{id:`phase9_prophet_truth`,text:`一天，陈博士，急匆匆地，找到了你。

"首领！"他说，脸上带着，震惊，"重大发现！我，破解了，进化者组织的，核心数据！"

你，看着他，心里涌起了，一股，紧张。

"什么发现？"你问。

"先知的，真相。"陈博士说，"我，知道了，先知，到底，是谁。"

你，愣住了。

先知的，真相？

先知，到底，是谁？

"快说！"你说。

陈博士，深吸一口气，然后，说：

"先知，不是，一个人。"他说，"先知，是，一个，意识体。"

"意识体？"你问，很，困惑。

"对。"陈博士说，"先知，原本，是，一个，人类。他，叫，林教授。他，是，一个，天才的，生物学家，和，计算机科学家。"

"他，在，迷雾来临前，十年，就，开始了，进化者组织的，研究。他，想要，创造，新人类。"

"但是，他，发现，人类的，身体，太，脆弱了。即使，经过了，基因改造，人类的，身体，还是，有，极限。"

"所以，他，做了，一个，大胆的，决定。他，把，自己的，意识，上传到了，计算机里。他，变成了，一个，意识体。"

"作为，意识体，他，没有，身体的，极限。他，可以，无限地，思考，无限地，计算。他，可以，同时，控制，成千上万个，实验体。"

"而且，他，还，可以，把，自己的，意识，下载到，任何，一个，经过改造的，身体里。所以，你，之前，在，灯塔里，看到的，先知，只是，他的，一个，分身。"

"真正的，先知，他的，核心意识，还，在，某个，地方，活着。"

你，看着，陈博士，心里涌起了，一股，强烈的，震惊。

先知，是，一个，意识体。

你，在，灯塔里，打败的，只是，他的，一个，分身。

真正的，先知，还，活着。

这，太，可怕了。

"那，他的，核心意识，在哪里？"你问，声音，在，发抖。

陈博士，摇了摇头。

"我不知道。"他说，"进化者组织的，数据里，没有，记录，他的，核心意识，在哪里。但是，我，猜测，他的，核心意识，应该，在，一个，很，安全的，地方。可能，在，地下，可能，在，海底，也，可能，在，太空中。"

"而且，"他又说，"他，可能，已经，准备好了，很多，分身。只要，他的，核心意识，还，在，他，就，可以，无限地，制造，分身。"

你，靠在，墙上，心里涌起了，一股，无力感。

先知，是，一个，意识体。

他，不会，真正地，死去。

只要，他的，核心意识，还，在，他，就，可以，无限地，卷土重来。

这，意味着，你们，跟，进化者组织的，战斗，可能，永远，不会，结束。

除非，你们，能，找到，他的，核心意识，并且，彻底，消灭，它。

但是，你们，甚至，不知道，他的，核心意识，在哪里。

"首领，"陈博士，说，"我们，必须，找到，他的，核心意识。否则，我们，永远，无法，真正地，打败，进化者组织。"

你，点了点头。

"我知道。"你说，"但是，我们，甚至，不知道，从，哪里，开始，找。"

"我，有，一个，想法。"陈博士说，"进化者组织的，残余，应该，知道，先知的，核心意识，在哪里。我们，可以，抓，一个，进化者组织的，高层，然后，审问，他。"

你，看着，他，想了想。

这，可能，是，一个，办法。

但是，进化者组织的，高层，肯定，很难，抓。

而且，即使，抓到了，他，也，不一定，会，说。

你，该，怎么办？`,minDay:130,maxTriggers:1,weight:5,choices:[{id:`hunt_evolutionist_leader`,text:`派人抓捕进化者组织的高层，审问先知核心意识的位置`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`hunted_evolutionist_leader`}],result:`"好。"你说，"我们，派人，抓捕，进化者组织的，高层，审问，先知核心意识的，位置。"

你，召集了，黑鸦，和，超能力小队。

"我，需要，你们，去，抓，一个，进化者组织的，高层。"你说，"我们，需要，知道，先知的，核心意识，在哪里。"

黑鸦，点了点头。

"好。"她说，"我，带，超能力小队，去。"

黑鸦，带着，超能力小队，出发了。

他们，根据，情报，找到了，进化者组织残余的，一个，据点。

然后，他们，潜入了，据点。

经过，一场，激烈的，战斗。

他们，成功地，抓到了，一个，进化者组织的，高层。

那个，高层，是，一个，中年男人。

他，叫，张博士。

他，以前，是，进化者组织的，首席科学家。

他，应该，知道，很多，进化者组织的，秘密。

黑鸦，把，张博士，带回了，基地。

你，亲自，审问了，他。

"先知的，核心意识，在哪里？"你问。

张博士，看着你，冷笑了一声。

"你，以为，我，会，告诉，你？"他说，"先知，是，伟大的。他，会，带领，人类，进入，新的，时代。你们，这些，旧人类，是，无法，阻挡，他的。"

"我，再问，一遍。"你说，声音，很，冷，"先知的，核心意识，在哪里？"

张博士，转过头，不说话了。

你，看着，他，心里涌起了，一股，愤怒。

但是，你，知道，愤怒，没有用。

你，需要，想，一个，办法，让，他，开口。

"首领，"陈静，走到你身边，小声说，"我，有，一个，办法。我，可以，用，药物，让，他，说真话。但是，这种，药物，有，副作用。可能，会，损伤，他的，大脑。"

你，看着，陈静，又，看了看，张博士。

然后，你，做出了，决定。

"用。"你说，"不管，用，什么，办法，我，都，要，知道，先知的，核心意识，在哪里。"

陈静，点了点头。

然后，她，给，张博士，注射了，真话药物。

过了，一会儿，张博士，的，眼神，开始，变得，迷茫。

"先知的，核心意识，在哪里？"你问。

"在……"张博士，说，声音，很，虚弱，"在……城北……地下……实验室……"

"城北地下实验室？"你问，"具体，在，哪里？"

"在……城北……旧，军事基地……地下……三层……"张博士，说，"先知的，核心意识，就，在，那里……"

"而且……"他又说，"那里，还有，很多，进化者组织的，精锐……还有，很多，超能力者……还有，先知的，很多，分身……"

"你们，去了，就是，送死……"

说完，张博士，晕了过去。

你，看着，他，心里涌起了，一股，复杂的，感觉。

你，终于，知道了，先知的，核心意识，在哪里。

在，城北，旧军事基地，地下三层。

但是，那里，有，很多，进化者组织的，精锐。

有，很多，超能力者。

有，先知的，很多，分身。

你们，去了，就是，送死。

但是，你们，必须，去。

因为，只有，消灭，先知的，核心意识，你们，才能，真正地，打败，进化者组织。

才能，真正地，安全。

"首领，"老周，说，"我们，怎么办？"

你，看着，他，想了想，然后，说：

"我们，需要，更多的，力量。"你说，"我们，需要，钢铁兄弟会，和，自由联盟的，帮助。我们，需要，三方，联合，一起，进攻，城北地下实验室。"

老周，点了点头。

"好。"他说，"我，这就，去，联系，铁山，和，林鹰。"

你，召集了，所有的，核心成员，召开了，一次，紧急会议。

在会议上，你，告诉了，他们，先知的，真相，和，核心意识的，位置。

所有人，都，很，震惊。

但是，他们，也，都，同意，必须，进攻，城北地下实验室，消灭，先知的，核心意识。

你们，开始了，进攻的，准备。

【理智-5】

【成功抓捕了进化者组织高层张博士。】

【用真话药物审问出了先知核心意识的位置：城北旧军事基地地下三层。】

【获得情报：城北地下实验室有很多进化者组织精锐、超能力者、先知的分身。】

【张博士：大脑受损，昏迷不醒。】

【开始准备进攻城北地下实验室。】

【联系钢铁兄弟会和自由联盟，寻求联合进攻。】

【黑鸦好感度+20】

【超能力小队忠诚度+20】

【陈静好感度+10】

【获得称号：真相的挖掘者。智慧+5，勇气+5，所有情报获取+20%。】

【重要伏笔：城北地下实验室。先知的核心意识，就在那里。你们，能，消灭，它吗？】`,next:`__return__`}]},{id:`phase9_prophet_herald`,text:`第130天，上午。
瞭望塔上的哨兵，突然发出了警报。
"首领！有一个人，朝我们的基地走过来了！他举着白旗！而且……而且他的眼睛，在发光！"
你赶紧跑到瞭望塔上，拿起望远镜看了看。
然后，你愣住了。
远处，有一个人，正慢慢地朝你们的基地走来。
那是一个年轻的男人。
大约二十多岁。
穿着一身白色的长袍。
他的眼睛里，闪烁着淡淡的蓝色光芒。
而且，他的周围，有一股奇怪的气场。
那气场，让你感到，很不舒服。
就像，有什么东西，在窥视你的内心。
"这是……什么人？"老周问，他也跑到了瞭望塔上。
"我不知道。"你说，"但是，他看起来，不简单。"
"要不要，警戒？"老周问。
"先，警戒。"你说，"但是，不要，先动手。看看，他，想，干什么。"
老周，点了点头，然后，通过对讲机，下达了，警戒的命令。
基地里，所有的战士，都，进入了，战斗位置。
超能力小队，也，都，准备好了。
那个年轻人，慢慢地，走到了，基地的，大门前。
然后，他，停了下来。
他，抬起头，看着，瞭望塔上的你。
然后，他，笑了。
那个笑容，很奇怪。
既，不是，友好的笑。
也，不是，恶意的笑。
而是，一种，看透了一切的，淡然的笑。
"你好。"他说，声音很平静，但是，却清晰地，传到了，你的耳朵里，"我是，先知的使者。我叫，白。"
"先知，派我来，给你，带一封信。"
你愣住了。
先知的使者？
先知？
那个，传说中的，迷雾世界的，幕后黑手？
那个，进化者组织的，真正领袖？
他，居然，派了使者，来，见你？
"他，想，干什么？"你问。
"先知，想，跟你，谈谈。"白说，"他说，他，很欣赏你。他说，你，是一个，真正的，天才。他说，你，不应该，死在这里。"
"他，邀请你，去，见他。"
"他说，他，可以，给你，你想要的一切。"
"力量，财富，权力，永生……"
"只要，你，愿意，加入，他。"
你看着，白，心里涌起了，一股，复杂的感觉。
先知，邀请你，去，见他？
他，想，让你，加入，他？
这，是，一个，陷阱？
还是，一个，机会？
你，该，怎么办？
是，接受邀请，去，见先知？
还是，拒绝邀请，杀死，这个使者？
还是，先，把他，抓起来，审问？`,minDay:128,maxTriggers:1,weight:5,choices:[{id:`accept_prophet_invitation`,text:`接受邀请，去见先知（深入虎穴）`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`met_prophet`}],result:`"好。"你说，"我，接受邀请。我，去，见先知。"

老周，看着你，愣住了。

"首领！"他说，"这，太危险了！先知，是，我们的敌人！你，去，见他，可能，会，有去无回！"

"我知道。"你说，"但是，我，必须，去。我，必须，知道，先知，到底，是什么人。我，必须，知道，迷雾的，真相。"

"而且，"你又说，"如果，我，能，说服，先知，放弃，他的计划。那么，我们，就，不用，再，战斗了。这，对，所有人，都，好。"

老周，想了想，然后，叹了口气。

"好吧。"他说，"但是，你，必须，小心。而且，我们，会，在外面，等你。如果，你，遇到了，危险，我们，会，冲进去，救你。"

你，点了点头。

"好。"你说，"我，会，小心的。"

然后，你，看着，白，说：

"带我，去，见先知。"

白，笑了。

"好。"他说，"请，跟我来。"

你，跟着，白，出发了。

你们，走了，大约，两个小时。

然后，你们，来到了，城北的，一个，废弃的，地下实验室。

实验室的，入口，很隐蔽。

在，一个，废弃的，工厂的，地下。

白，带着你，走进了，实验室。

实验室里，很暗，很潮湿。

墙壁上，爬满了，藤蔓。

地上，到处，都是，废弃的，设备，和，散落的，文件。

而且，你，能感觉到，有，一股，强大的，能量，在，实验室的，深处，波动。

"先知，就在，里面。"白说，"请，跟我来。"

你，跟着，白，继续，往里走。

终于，你们，来到了，实验室的，最深处。

那是，一个，巨大的，大厅。

大厅的，中央，有，一个，巨大的，玻璃罐。

玻璃罐里，装满了，蓝色的，液体。

而，在，液体里，浸泡着，一个，大脑。

一个，人类的，大脑。

而且，那个大脑，在，发出，淡淡的，蓝色的，光芒。

你，看着，那个大脑，愣住了。

"这……这是……"你喃喃地说。

"这，就是，先知。"白说，"或者说，这，是，先知的，本体。"

"先知，原名，林教授。他，曾经，是，一个，伟大的，科学家。他，研究的，是，人类的，意识，和，基因。"

"迷雾来临的，前一天，他，发现了，一个，惊人的，秘密。他，发现了，如何，把，人类的，意识，从，身体里，分离出来。"

"于是，他，把，自己的，意识，分离了出来，放进了，这个，玻璃罐里。"

"然后，迷雾，来临了。"

"他，利用，迷雾的，能量，不断地，强化，自己的，意识。"

"现在，他，已经，不再是，一个，普通的，人类了。"

"他，是，一个，意识体。"

"他，可以，控制，迷雾。"

"他，可以，控制，变异生物。"

"他，可以，控制，超能力者。"

"他，甚至，可以，控制，人类的，思想。"

你，看着，那个，发光的，大脑，心里涌起了，一股，强烈的，震撼。

原来，先知，是，这样的，存在。

原来，迷雾的，真相，是，这样的。

"你好。"突然，一个，声音，在，你的，脑海里，响起，"我，是，林教授。或者，你，可以，叫我，先知。"

"我，等你，很久了。"

你，愣住了。

那个声音，直接，在，你的，脑海里，响起。

就像，有人，在，你的，脑子里，说话。

"你……你……"你结结巴巴地说。

"不要害怕。"那个声音说，"我，不会，伤害你。我，只是，想，跟你，谈谈。"

"我，很欣赏你。"那个声音说，"你，是一个，真正的，天才。你，在，这么短的，时间里，建立了，这么大的，一个，势力。你，拯救了，这么多的，人。"

"你，比，我，想象的，还要，优秀。"

"所以，我，想，邀请你，加入，我。"

"我，可以，给你，你想要的，一切。"

"力量，财富，权力，永生……"

"只要，你，愿意，跟我，一起，建立，一个，新的，世界。"

你，看着，那个，发光的，大脑，心里涌起了，一股，复杂的感觉。

先知，邀请你，加入，他。

他，可以，给你，一切。

但是，你，知道，他，是，一个，疯子。

他，为了，自己的，研究，牺牲了，无数的，人。

他，制造了，迷雾。

他，制造了，变异生物。

他，制造了，超能力者。

他，把，整个世界，都，变成了，他的，实验室。

你，能，加入，他吗？

你，该，怎么办？

【理智-10】

【见到了先知。他的本体，是一个，浸泡在，玻璃罐里的，大脑。他，是，一个，意识体。】

【获得关键情报：先知的真实身份（林教授）。迷雾的真相。先知的能力。先知的基地位置（城北地下实验室）。】

【先知邀请你加入他。他可以给你力量、财富、权力、永生。】

【你，需要，做出，选择。是，加入，先知？还是，反对，他？还是，利用，他？】

【获得称号：真相的见证者。智慧+10，所有情报获取速度+100%。】

【重要伏笔：先知。他，是，一个，意识体。他，邀请你，加入，他。你，会，怎么选？】`,next:`__return__`},{id:`capture_herald`,text:`抓住使者，审问他，获取情报`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`captured_herald`}],result:`"抓住他！"你喊，"别让他跑了！"

老周，带着，几个战士，冲了出去。

白，看着，你们，没有，反抗。

他，只是，笑了笑。

"你们，以为，抓住了我，就能，知道，先知的，秘密吗？"他说，"你们，太天真了。"

但是，他，还是，被，你们，抓住了。

你们，把他，关进了，基地的，监狱里。

然后，你，亲自，审问了他。

"说！"你说，"先知，到底，是什么人？他，在哪里？他，想，干什么？"

白，看着你，笑了。

"你，想知道？"他说，"好，我，告诉你。"

"先知，原名，林教授。他，曾经，是，一个，伟大的，科学家。"

"迷雾来临的，前一天，他，发现了，如何，把，人类的，意识，从，身体里，分离出来。"

"于是，他，把，自己的，意识，分离了出来，放进了，一个，玻璃罐里。"

"现在，他，是，一个，意识体。他，可以，控制，迷雾。他，可以，控制，变异生物。他，可以，控制，超能力者。"

"他的，基地，在，城北的，一个，废弃的，地下实验室里。"

"他，想，干什么？"你问。

"他，想，进化。"白说，"他，想，让，所有的，人类，都，进化，成，像，他，一样的，意识体。他，认为，这，是，人类的，未来。"

"他，认为，肉体，是，人类的，枷锁。只有，摆脱了，肉体，人类，才能，真正地，自由。"

"所以，他，制造了，迷雾。所以，他，制造了，变异生物。所以，他，制造了，超能力者。"

"这一切，都是，他的，实验。他，在，寻找，人类进化的，方法。"

你，听完之后，愣住了。

原来，迷雾的，真相，是，这样的。

原来，先知，是，这样的，一个，疯子。

他，为了，自己的，研究，牺牲了，整个世界。

"你，为什么，要，告诉，我们，这些？"你问，"你，不是，先知的，使者吗？"

白，笑了。

"因为，我，也，想，知道，你的，选择。"他说，"先知，说，你，是一个，天才。他说，你，会，做出，正确的，选择。"

"但是，我，不，这么认为。"

"我，认为，你，会，反对，先知。"

"因为，你，是一个，善良的，人。"

"你，不会，允许，先知，继续，牺牲，无辜的，人。"

你，看着，白，心里涌起了，一股，复杂的感觉。

这个，白，到底，是什么人？

他，是，先知的，使者？

还是，一个，卧底？

还是，一个，有，自己，想法的，人？

你，不知道。

但是，你，知道，你，已经，获得了，足够的，情报。

你，知道了，先知的，真实身份。

你，知道了，迷雾的，真相。

你，知道了，先知的，基地位置。

现在，你，可以，制定，计划，了。

你，可以，进攻，城北地下实验室。

你，可以，消灭，先知。

你，可以，结束，这一切。

【理智-5】

【抓住了先知的使者，白。审问了他。】

【获得关键情报：先知的真实身份（林教授）。迷雾的真相。先知的能力。先知的基地位置（城北地下实验室）。先知的目的（让人类进化成意识体）。】

【白，被关在监狱里。他，似乎，有自己的想法。】

【获得称号：情报的征服者。智慧+5，所有审问成功率+50%。】

【重要伏笔：白。他，到底，是什么人？他，为什么，要，告诉，你们，这些？他，会，成为，你们的，盟友吗？】`,next:`__return__`},{id:`kill_herald`,text:`杀死使者，向先知宣战`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`killed_herald`}],result:`"杀死他！"你说，"向，先知，宣战！"

老周，看着你，愣住了。

"首领，"他说，"我们，是不是，应该，先，审问，他？"

"不用。"你说，"先知，派他，来，招降，我们。这，是，对，我们的，侮辱。"

"我们，要，让，先知，知道，我们，不是，好惹的。"

"我们，要，让，他，知道，我们，会，战斗，到底。"

老周，想了想，然后，点了点头。

"好。"他说，"我，明白了。"

然后，他，拿出了，一把刀。

白，看着，你们，没有，害怕。

他，只是，笑了笑。

"你们，会，后悔的。"他说，"先知，是，不可战胜的。你们，反对，他，只会，自取灭亡。"

"但是，"他又说，"我，还是，很佩服，你们。你们，有，勇气。"

说完，他，闭上眼睛，等待，死亡。

老周，手起刀落。

白，死了。

你，看着，白的，尸体，心里涌起了，一股，复杂的感觉。

你，杀死了，先知的，使者。

你，向，先知，宣战了。

这，意味着，你们，和，先知，之间，再也，没有，缓和的，余地了。

这，意味着，一场，你死我活的，战斗，即将，开始。

但是，你，不后悔。

因为，你，知道，先知，是，一个，疯子。

他，为了，自己的，研究，牺牲了，整个世界。

你，不能，让，他，继续，这样，下去。

你，必须，阻止，他。

你，必须，消灭，他。

"把他的尸体，挂在大门外。"你说，"让，先知，知道，我们的，决心。"

老周，点了点头，然后，让人，把，白的，尸体，挂在了，大门外。

然后，你，召集了，所有的，核心成员，召开了，一次，紧急会议。

在会议上，你，宣布了，向，先知，宣战。

你，说，你们，必须，做好，准备，迎接，先知的，进攻。

你，说，你们，必须，找到，先知的，基地，然后，进攻，他。

所有人，都，支持，你的，决定。

"我们，会，战斗，到底！"他们，大声喊。

你，看着，他们，点了点头。

"好。"你说，"从今天起，我们，和，先知，不共戴天！"

【理智-8】

【杀死了先知的使者，白。向先知宣战。】

【白的尸体，被挂在大门外，作为对先知的警告。】

【获得称号：战争的宣言者。勇气+5，领导力+5，所有战士士气+20%。】

【所有NPC好感度+10（他们佩服你的勇气）】

【重要伏笔：向先知宣战。先知，会，怎么，报复？你们，能，打败，他吗？】`,next:`__return__`}]}],Pl={phase10_final_battle:{id:`phase10_final_battle`,text:`第151天，黎明。

三方联军，在城北旧军事基地外，集结完毕。

新希望基地的，一百个战士。
钢铁兄弟会的，两百个战士。
自由联盟的，三百个战士。

总共，六百个战士。

还有，超能力小队，和，各种重型武器。

你，站在，队伍的，最前面。

你的身边，是，老周，黑鸦，铁山，林鹰。

你们，看着，远处的，旧军事基地。

基地，已经，被，进化者组织，改造成了，一个，堡垒。

围墙，很高，很厚。
围墙上，有，很多，自动炮塔。
大门，是，厚重的，钢铁大门。

而且，基地里，还有，很多，进化者组织的，精锐，和，超能力者。

"这，将是，我们，最后的，战斗。"你说，"打败了，进化者组织，消灭了，先知的，核心意识，我们，就，真正地，安全了。"

"你们，准备好了吗？"

所有人，都，大声喊：

"准备好了！"

声音，在，黎明的，空气中，回荡。

你，深吸一口气，然后，指着，基地。

"进攻！"你喊。

三方联军，朝，基地，发起了，进攻。

最终决战，开始了。

战斗，很惨烈。

进化者组织的，防御，很强。

围墙上的，自动炮塔，朝，你们，发射，密集的，子弹。

进化者组织的，精锐，在，围墙上，朝，你们，射击。

进化者组织的，超能力者，朝，你们，发射，能量弹。

你们，伤亡，很大。

但是，你们，没有，退缩。

因为，你们，知道，这，是，最后的，战斗。

"用，迫击炮！"林鹰，喊。

自由联盟的，迫击炮，朝，围墙，发射了，炮弹。

"轰！轰！轰！"

围墙，被，炸开了，几个，缺口。

"冲啊！"铁山，喊。

钢铁兄弟会的，战士，朝，缺口，冲了过去。

"超能力小队，上！"你喊。

黑鸦，带着，超能力小队，冲了上去。

大壮，用，巨大的，力量，把，缺口，扩大。
小风，在，敌人的，阵营里，飞快地穿梭。
小雷，发射，能量弹，轰炸，敌人。
小灵，感知，敌人的，动向，指挥，进攻。

经过，一个小时的，激烈战斗。

你们，终于，突破了，围墙。

你们，冲进了，基地。

基地里，进化者组织的，残余，继续，抵抗。

你们，一层，一层地，清理。

终于，你们，到达了，地下实验室的，入口。

入口，是，一扇，巨大的，钢铁大门。

大门上，刻着，很多，奇怪的，符号。

"这，就是，地下实验室的，入口。"陈博士，说，他，也，跟着，来了，"先知的，核心意识，就在，地下三层。"

你，看着，那扇，大门，心里涌起了，一股，紧张。

门后面，有什么？

先知的，核心意识，有多强？

你们，能，打败，它吗？

"打开大门。"你说。

王工，带着，工程师，用，炸药，炸开了，大门。

大门，轰然，倒下。

门后面，是，一个，巨大的，电梯。

电梯，可以，通往，地下三层。

"我们，下去。"你说。

你，带着，老周，黑鸦，超能力小队，和，二十个，精锐战士，走进了，电梯。

铁山，和，林鹰，留在，上面，继续，清理，基地里的，残余。

电梯，开始，下降。

你，看着，电梯的，楼层指示器，心里，越来越紧张。

一层。
两层。
三层。

电梯，停了。

门，开了。

你，看到了，地下三层。

那是，一个，巨大的，空间。

空间里，有，很多，计算机，和，服务器。

空间的，中央，有，一个，巨大的，玻璃容器。

容器里，有，一个，大脑。

一个，巨大的，人类的，大脑。

大脑，连接着，无数的，电线，和，管道。

大脑，在，发出，微弱的，蓝光。

"那，就是，先知的，核心意识。"陈博士，说，声音，在，发抖，"他，把，自己的，大脑，取了出来，连接到了，计算机里。他，的，意识，就，存在，这个，大脑，和，这些，计算机里。"

你，看着，那个，大脑，心里涌起了，一股，强烈的，复杂的感觉。

先知。

这个，制造了，迷雾，杀死了，无数人的，疯子。

他，的，核心意识，就在，你的面前。

只是，一个，大脑。

但是，你，知道，这个，大脑，拥有，可怕的，力量。

"我们，必须，消灭，它。"老周，说，"否则，它，还会，卷土重来。"

你，点了点头。

"但是，怎么，消灭，它？"你问。

陈博士，想了想，然后，说：

"我们，可以，切断，它的，电源。"他说，"没有，电源，它的，大脑，就，会，死亡。它的，意识，就，会，消失。"

"但是，"他又说，"切断电源，可能，会，触发，它的，防御系统。它，可能，会，反抗。"

你，看着，那个，大脑，心里在，盘算。

切断电源，消灭，先知的，核心意识。

这，应该，是，最简单的，方法。

但是，可能，会，有，危险。

你，该，怎么办？`,choices:[{id:`cut_power`,text:`切断电源，消灭先知的核心意识`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`cut_power`}],next:`phase10_new_world`,result:`"切断电源。"你说，"消灭，先知的，核心意识。"

陈博士，点了点头。

"好。"他说，"我，去，切断电源。"

陈博士，走到，控制室，开始，操作，计算机。

但是，就在，他，要，按下，切断电源的，按钮时。

突然，整个，地下实验室，的，灯，都，灭了。

然后，一个，声音，在，整个，空间里，回荡。

"你们，以为，这么，容易，就能，消灭，我吗？"那个声音说，"我，是，先知。我，是，新人类的，创造者。我，是，不会，这么，容易，被，消灭的。"

你，看着，中央的，玻璃容器。

容器里的，大脑，开始，发出，刺眼的，蓝光。

然后，从，容器里，伸出了，很多，机械臂。

机械臂，朝，你们，攻击了过来。

"小心！"老周，喊。

你们，赶紧，躲开了。

机械臂，打在了，地上，把，地面，砸出了，一个，大坑。

"开火！"你喊。

所有的武器，同时，开火。

子弹，朝，机械臂，射了过去。

但是，机械臂，很，坚硬。

普通的子弹，根本，伤不了，它。

"超能力小队，上！"你喊。

黑鸦，带着，超能力小队，冲了上去。

大壮，用，巨大的，力量，抓住了，一根，机械臂，把，它，折断了。

小风，在，机械臂之间，飞快地穿梭，攻击，它们的，连接处。

小雷，发射，能量弹，轰炸，机械臂。

但是，机械臂，太多了。

而且，它们，还在，不断地，从，容器里，伸出来。

"这样，下去，不是，办法！"老周，喊，"我们，必须，直接，攻击，那个，大脑！"

你，看着，中央的，玻璃容器。

容器里的，大脑，还在，发出，刺眼的，蓝光。

"好！"你说，"我们，直接，攻击，大脑！"

你，拿起了，一颗，手榴弹。

然后，你，朝，玻璃容器，扔了过去。

"轰！"

手榴弹，在，玻璃容器上，爆炸了。

玻璃容器，被，炸开了，一个，洞。

"就是现在！"你喊，"小雷，朝，洞里，发射，能量弹！"

小雷，点了点头。

然后，他，朝，洞里，发射了，一道，强大的，能量弹。

能量弹，打中了，大脑。

大脑，发出了，一声，刺耳的，尖叫。

然后，它，开始，发出，刺眼的，白光。

"不……"先知的，声音，在，空间里，回荡，"我，不能，死……我，还要，创造，新人类……"

"你们，这些，旧人类……你们，会，后悔的……"

"没有，我，你们，永远，无法，进化……"

"你们，会，被，自然，淘汰的……"

声音，越来越弱。

然后，大脑，的，光，熄灭了。

机械臂，都，停了下来。

整个，地下实验室，变得，很，安静。

你，靠在，墙上，大口喘着气。

你的身上，有，好几道，伤口。

但是，你，不在乎。

因为，你，做到了。

你，消灭了，先知的，核心意识。

进化者组织，彻底地，被，消灭了。

世界，终于，真正地，安全了。

"首领，"老周，走到你身边，说，"我们，赢了。"

你，看着，他，点了点头。

"对。"你说，"我们，赢了。"

【健康-15，理智-10】

【最终决战胜利。三方联军攻破了城北地下实验室。】

【消灭了先知的核心意识。进化者组织彻底被消灭。】

【我方伤亡：轻伤50人，重伤20人，牺牲10人。】

【超能力小队：全部受伤，但是，都，活了下来。】

【进化者组织：彻底被消灭。所有成员，要么，被，杀死，要么，被，俘虏。】

【获得战利品：进化者组织的，全部研究资料，和，设备。】

【老周好感度+20】

【黑鸦好感度+20】

【超能力小队忠诚度+30】

【铁山好感度+20】

【林鹰好感度+20】

【获得称号：进化者的终结者。力量+5，勇气+5，意志力+5，所有属性+3。】

【重要伏笔：先知的最后遗言。没有了先知，人类，真的，能，继续，进化吗？还是，会，被，自然，淘汰？】`},{id:`negotiate_with_prophet`,text:`尝试跟先知谈判，看看能不能和平解决`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`negotiated_with_prophet`}],next:`phase10_new_world`,result:`"等等。"你说，"我们，先，试试，跟，先知，谈判。看看，能不能，和平，解决。"

老周，看着你，愣住了。

"谈判？"他问，"跟，先知，谈判？"

"对。"你说，"先知，虽然，做了，很多，坏事。但是，他，的，初衷，可能，是，好的。他，只是，用错了，方法。也许，我们，可以，跟，他，谈谈。也许，我们，可以，找到，一个，和平的，解决方案。"

老周，想了想，然后，点了点头。

"好。"他说，"我们，试试。"

你，走到，中央的，玻璃容器前。

"先知。"你说，"我，知道，你，能，听到，我，说话。"

"我们，来，这里，不是，为了，杀死，你。"你说，"我们，只是，想，跟，你，谈谈。"

容器里的，大脑，闪烁了，几下。

然后，一个，声音，在，空间里，回荡。

"谈谈？"先知的，声音说，"你们，想，跟，我，谈，什么？"

"我们，想，跟，你，谈，和平。"你说，"我们，知道，你，的，初衷，是，好的。你，想，让，人类，进化。但是，你，用错了，方法。你，杀死了，太多，无辜的人。"

"我们，希望，你，能，停止，你的，计划。"你说，"我们，可以，一起，找到，一个，更好的，方法，让，人类，进化。一个，不需要，牺牲，无辜的人的，方法。"

先知，沉默了，很久。

然后，他，说：

"你们，真的，以为，有，更好的，方法吗？"他说，"人类，已经，停滞不前，太久了。没有，强大的，推动力，人类，永远，无法，进化。"

"迷雾，就是，那个，推动力。"他说，"虽然，它，杀死了，很多人。但是，它，也，让，一些人，获得了，超能力。那些，超能力者，就是，新人类的，雏形。"

"如果，没有，迷雾。"他说，"人类，永远，无法，进化。最终，会，被，自然，淘汰。"

你，看着，他，想了想，然后，说：

"也许，你，说得对。"你说，"人类，确实，需要，进化。但是，进化，不应该，以，牺牲，无辜的人，为代价。"

"我们，可以，用，更温和的，方法。"你说，"比如，基因治疗，比如，教育，比如，科技进步。这些，方法，虽然，慢，但是，它们，不需要，牺牲，无辜的人。"

"而且，"你又说，"超能力者，已经，存在了。他们，就是，人类，进化的，证明。我们，可以，研究，他们，找到，安全的，超能力，觉醒方法。让，更多的人，能，安全地，获得，超能力。"

先知，又，沉默了，很久。

然后，他，说：

"你，说得，有道理。"他说，"也许，我，确实，太，极端了。"

"我，老了。"他说，"我的，意识，在，这个，大脑里，存在了，太久了。我，已经，忘记了，人类的，情感。我，只，记得，我的，目标。"

"也许，是时候，让，年轻人，来，接管了。"他说，"你，比，我，更，适合，带领，人类，走向，未来。"

"我，愿意，停止，我的，计划。"他说，"我，愿意，把，我，的，所有，研究资料，和，知识，都，交给，你们。"

"但是，我，有，一个，条件。"他说。

"什么条件？"你问。

"让，我，继续，存在。"他说，"不要，消灭，我，的，意识。让，我，作为，一个，顾问，继续，存在。我，可以，帮助，你们，研究，超能力，帮助，你们，引导，人类的，进化。"

你，看着，他，心里在，盘算。

让，先知，继续，存在。

这，很，危险。

因为，他，可能，会，再次，背叛，你们。

但是，他，的，知识，和，研究资料，对，你们，很，有价值。

而且，如果，他，真的，愿意，改变，那，他，可能，会，成为，你们的，强大的，盟友。

你，该，怎么办？

"好。"你说，"我，同意，你的，条件。你，可以，继续，存在。但是，你，必须，接受，我们的，监视。而且，你，必须，遵守，我们的，规则。"

先知，笑了。

"好。"他说，"我，同意。"

"从今天起，我，就是，你们的，顾问。"他说，"我，会，帮助，你们，研究，超能力，帮助，你们，引导，人类的，进化。"

"我，相信，在，你的，带领下，人类，会，有，一个，更美好的，未来。"

你，看着，他，点了点头。

"好。"你说，"我们，一起，努力。"

最终决战，以，和平的，方式，结束了。

先知，投降了。

进化者组织，解散了。

世界，终于，真正地，安全了。

而且，你们，还，获得了，先知，这个，强大的，盟友。

【理智-5】

【最终决战以和平方式结束。先知投降，进化者组织解散。】

【先知成为了你们的顾问。他会帮助你们研究超能力，引导人类的进化。】

【获得战利品：进化者组织的全部研究资料和知识。】

【我方伤亡：轻伤20人，重伤5人，牺牲2人。】

【先知好感度+30（新盟友）】

【老周好感度+15】

【黑鸦好感度+15】

【铁山好感度+15】

【林鹰好感度+15】

【获得称号：和平的缔造者。魅力+5，智慧+5，所有NPC好感度获取+30%。】

【重要伏笔：先知成为了你们的顾问。他，真的，改变了吗？还是，他，有，其他的，计划？】`}]},phase10_new_world:{id:`phase10_new_world`,text:`第200天，清晨。

阳光，照在了，大地上。

迷雾，已经，完全，消散了。

进化者组织，已经，被，消灭了。

世界，终于，真正地，和平了。

你，站在，新希望基地的，最高处，看着，下面的，世界。

基地里，很，热闹。

人们，在，忙碌着。

有些人，在，重建房屋。
有些人，在，种植庄稼。
有些人，在，训练战斗。
有些人，在，研究科学。

孩子们，在，空地上，玩耍。

他们的笑声，在，空气中，回荡。

你，看着，这一切，心里涌起了，一股，强烈的，成就感。

你，做到了。

你，带领着，这些人，走出了，迷雾。

你，带领着，这些人，打败了，进化者组织。

你，带领着，这些人，建立了，一个，新的，世界。

老周，走到，你身边，递给你，一杯水。

"在想什么？"他问。

"我在想，"你说，"我们，终于，走出来了。"

老周，笑了笑。

"是啊。"他说，"我们，走出来了。"

你，看着，远处的，城市。

城市，还，很，破败。

但是，已经，有，很多，人，在，那里，重建了。

你，相信，用不了，多久，城市，就会，恢复，原来的，繁华。

甚至，会，比，原来，更，繁华。

因为，这个，新世界，充满了，无限的，可能。

超能力者，变异生物，新的科技，新的秩序。

这一切，都会，让，这个，世界，变得，更加，精彩。

你，深吸一口气。

空气，很，清新。

没有，迷雾的，味道。

你，笑了。

新的世界，已经，到来。

新的冒险，正在，等待着，你们。

而你，会，继续，带领着，你的同伴们，在这个，新世界里，创造，属于，你们的，传奇。

这，不是，结束。

这，只是，一个，新的，开始。

——迷雾求生，完——`,choices:[{id:`embrace_new_world_final`,text:`拥抱新世界，开始新的冒险`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`game_complete`}],next:`start`,result:`"新的世界，已经，到来。"你说，"新的冒险，正在，等待着，我们。"

你，转过身，看着，你的同伴们。

老周，陈静，小杨，朵朵，杜建国，李刚，张大爷，王工，陈博士，黑鸦，林小雨，李伟，赵明，铁山，林鹰……

还有，所有的，幸存者。

他们，都，看着你。

他们的眼睛里，充满了，信任，和，期待。

"兄弟们！"你大声说，"迷雾，已经，消散了。进化者组织，已经，被，消灭了。世界，已经，和平了。"

"但是，这，不是，结束。这，只是，一个，新的，开始！"

"在这个，新世界里，还有，很多，未知的，东西，等待着，我们，去，探索。还有，很多，挑战，等待着，我们，去，面对。还有，很多，可能，等待着，我们，去，创造！"

"我，会，继续，带领着，你们。我们，会，一起，在这个，新世界里，创造，属于，我们的，传奇！"

所有人，都，鼓起掌来。

他们，大声欢呼着。

他们的声音，在，空气中，回荡。

你，看着，他们，也，笑了。

新的世界，新的冒险。

你，已经，准备好了。

你，会，继续，前进。

直到，你，到达，那个，更美好的，未来。

【游戏完成】

【恭喜你，完成了迷雾求生！】

【你，带领着，幸存者们，走出了迷雾，打败了进化者组织，建立了，一个，新的，世界。】

【你的名字，会，永远，被，铭记。】

【你，是，真正的，传奇。】

【理智+10】

【游戏完成。感谢游玩！】

【获得称号：新世界的开拓者。所有属性+10，魅力+10，领导力+10。】

【获得状态：传奇。你，已经，成为了，一个，传奇。】

【所有NPC好感度+30】

【——迷雾求生，完——】

【感谢，你的，游玩！】`}]}},Fl=[{id:`phase10_postwar_reconstruction`,text:`最终决战结束后，你们开始了战后重建工作。

整个世界，都在，慢慢地，恢复。

城市，在，重建。
农田，在，开垦。
工厂，在，复工。
学校，在，开学。

人们，的脸上，开始，有了，笑容。

孩子们，终于，可以，安心地，上学了。

老人们，终于，可以，安心地，养老了。

年轻人，终于，可以，安心地，工作，和，恋爱了。

世界，正在，变得，越来越，美好。

你，作为，三方联盟的，最高领袖，每天，都，很忙。

你，需要，协调，三方的，关系。
你，需要，规划，重建的，进度。
你，需要，处理，各种，突发事件。
你，需要，接见，各种，来访者。

虽然，很忙，但是，你，很，充实。

因为，你，知道，你，做的，每一件事，都是，在，为，这个，世界，的，未来，做，贡献。

一天，陈博士，找到了你。

"首领，"他说，脸上带着，兴奋，"重大突破！我们，研究出了，安全的，超能力，觉醒方法！"

你，看着他，心里涌起了，一股，喜悦。

安全的，超能力，觉醒方法。

这，意味着，更多的人，可以，安全地，获得，超能力。

这，意味着，人类，的，进化，进入了，一个，新的，时代。

"真的吗？"你问，很，兴奋。

"真的。"陈博士说，"我们，根据，进化者组织的，研究资料，结合，我们，自己的，研究，终于，研究出了，安全的，超能力，觉醒方法。"

"这种方法，成功率，有，80%。"他说，"而且，即使，失败了，也，不会，有，生命危险。最多，只是，无法，获得，超能力。"

"而且，"他又说，"我们，还，研究出了，超能力，的，训练方法。通过，训练，超能力者，可以，更好地，控制，自己的，超能力，而且，还能，让，超能力，变得，更强。"

你，看着他，心里涌起了，一股，强烈的，喜悦。

安全的，超能力，觉醒方法。

超能力，的，训练方法。

这，太，重要了。

这，意味着，人类，的，进化，进入了，一个，新的，时代。

"太好了！"你说，"我们，立刻，开始，推广，这种方法。"

接下来的日子里，你们，开始，推广，安全的，超能力，觉醒方法。

很多，人，都，自愿，接受了，超能力，觉醒。

越来越多的人，获得了，超能力。

超能力者，不再，是，少数的，特殊人群。

他们，成为了，社会的，一部分。

世界，进入了，一个，新的，时代。

一个，超能力者，和，普通人，和平共处的，时代。

一个，人类，不断，进化的，时代。

你，看着，这个，正在，变化的，世界，心里涌起了，一股，强烈的，成就感。

你，做到了。

你，不仅，带领着，人们，走出了，迷雾。

你，还，带领着，人们，进入了，一个，新的，时代。

【理智+5】

【战后重建开始。世界正在慢慢地恢复。】

【重大突破：研究出了安全的超能力觉醒方法（成功率80%，无生命危险）。】

【研究出了超能力的训练方法。】

【开始推广安全的超能力觉醒方法。越来越多的人获得了超能力。】

【世界进入了新时代：超能力者和普通人和平共处，人类不断进化。】

【陈博士好感度+30】

【获得称号：新时代的开启者。智慧+5，魅力+5，所有研究速度+30%。】

【重要伏笔：超能力时代。人类，会，进化成，什么样子？这个，新世界，会，变成，什么样子？】`,minDay:180,maxTriggers:1,weight:5,choices:[{id:`promote_superpower`,text:`大力推广超能力觉醒，让更多人获得超能力`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`promoted_superpower`}],result:`"大力推广，超能力觉醒。"你说，"让，更多的人，获得，超能力。"

你，下令，在，所有的，幸存者基地，推广，安全的，超能力，觉醒方法。

很多，人，都，自愿，接受了，超能力，觉醒。

越来越多的人，获得了，超能力。

超能力者，的数量，在，快速地，增加。

一个月后，超能力者，的数量，已经，达到了，总人口的，30%。

而且，这个，比例，还在，不断地，增加。

超能力者，不再，是，少数的，特殊人群。

他们，成为了，社会的，一部分。

他们，在，各个，行业，发挥着，重要的，作用。

力量型的，超能力者，在，建筑行业，发挥着，重要的，作用。
速度型的，超能力者，在，物流行业，发挥着，重要的，作用。
能量型的，超能力者，在，能源行业，发挥着，重要的，作用。
感知型的，超能力者，在，医疗行业，发挥着，重要的，作用。

世界，正在，快速地，发展。

超能力，的，普及，大大地，提高了，社会的，生产力。

城市的，重建，速度，大大地，加快了。

农田的，产量，大大地，提高了。

工厂的，效率，大大地，提高了。

人们的，生活水平，大大地，提高了。

你，看着，这个，正在，快速发展的，世界，心里涌起了，一股，强烈的，成就感。

你，做到了。

你，带领着，人们，进入了，一个，新的，时代。

【理智+5】

【大力推广超能力觉醒。超能力者数量达到总人口的30%。】

【超能力者在各个行业发挥着重要作用。社会生产力大大提高。】

【城市重建速度大大加快。农田产量大大提高。工厂效率大大提高。】

【人们的生活水平大大提高。】

【陈博士好感度+20】

【获得称号：超能力的推广者。魅力+5，智慧+5，所有超能力者忠诚度+20%。】

【重要伏笔：超能力普及。超能力者，和，普通人，能，永远，和平共处吗？】`,next:`__return__`}]},{id:`phase10_new_world_ending`,text:`第200天，清晨。
距离最终决战，已经过去了，四十九天。
距离迷雾来临，已经过去了，两百天。
整个世界，已经，完全，不同了。
进化者组织，被，消灭了。
先知的，核心意识，被，摧毁了。
迷雾，开始，慢慢地，消散了。
虽然，迷雾，还，没有，完全，消失。
但是，它，已经，不再，是，致命的，了。
人们，可以，在，迷雾中，自由地，行动了。
变异生物，也，不再，那么，狂暴了。
它们，开始，慢慢地，退化，了。
整个世界，开始，慢慢地，恢复，了。
而，你们的，新希望基地，已经，发展，成了，一个，巨大的，城市。
人口，突破了，一千人。
建筑，林立。
农田，广阔。
工厂，轰鸣。
学校，书声琅琅。
医院，救死扶伤。
整个城市，充满了，生机，和，活力。
今天，是，第200天。
一个，特殊的，日子。
你，站在，城市的，最高处，——新希望塔，的，顶端。
你，看着，下面的，城市。
看着，来来往往的，人们。
看着，孩子们，在，广场上，玩耍。
看着，老人们，在，公园里，下棋。
看着，工人们，在，工厂里，忙碌。
看着，农民们，在，农田里，劳作。
你，的，身边，站着，所有的，核心成员。
老周，黑鸦，陈静，小杨，朵朵，杜建国，李刚，张大爷，王工，陈博士，铁山，林鹰，赵明……
还有，超能力小队，的，成员们。
大壮，小风，小雷，小灵……
他们，都，站在，你的，身边。
他们，都，看着，你。
"首领。"老周，说，"今天，是，第200天。我们，活下来了。"
你，点了点头。
"对。"你说，"我们，活下来了。"
"而且，"黑鸦，说，"我们，还，建立了，这个，城市。我们，还，拯救了，这么多的，人。"
"这，都是，你的，功劳。"陈静，说，"如果，没有，你，我们，都，死了。"
你，摇了摇头。
"不。"你说，"这，不是，我，一个人的，功劳。这，是，我们，所有人，的，功劳。"
"如果，没有，你们，的，支持，和，帮助，我，什么，都，做，不了。"
你，看着，他们，然后，又，看着，下面的，城市。
"两百天前，我们，都是，普通人。我们，都，在，为了，生存，而，挣扎。"
"但是，今天，我们，建立了，这个，城市。我们，拯救了，这么多的，人。我们，还，给，人类，带来了，希望。"
"这，说明，什么？"
"这，说明，只要，我们，团结一心，只要，我们，不放弃，我们，就，能，做到，任何，事情。"
"迷雾，会，消散的。"
"变异生物，会，被，消灭的。"
"人类，会，重建，文明的。"
"因为，我们，有，希望。"
你，的，声音，在，空气中，回荡。
所有人，都，静静地，听着。
然后，他们，都，鼓起了，掌。
掌声，越来越大。
最后，整个，城市，的，人，都，鼓起了，掌。
掌声，在，整个，城市，的，上空，回荡。
你，看着，他们，笑了。
然后，你，抬起头，看着，天空。
天空中，迷雾，正在，慢慢地，消散。
阳光，透过，迷雾，照了，下来。
照在，你的，脸上。
照在，整个，城市，上。
你，知道，这，只是，一个，开始。
未来，还有，很多的，挑战，在，等待着，你们。
但是，你，也，知道，你们，一定，能，克服，所有的，挑战。
因为，你们，有，希望。
因为，你们，团结一心。
因为，你们，是，新希望。
新的，世界，正在，到来。
而，你们，将，是，这个，新世界，的，创造者。
（全剧终）`,minDay:198,maxTriggers:1,weight:10,choices:[{id:`civilization_reborn`,text:`选择「文明重生」结局——带领人类重建文明，成为新世界的领袖`,effects:[{kind:`resource`,resource:`sanity`,delta:20},{kind:`flag`,flag:`ending_civilization_reborn`}],result:`"我，选择，带领，人类，重建，文明。"你说，"我们，要，建立，一个，更美好的，世界。"

你，的，声音，很，坚定。

所有人，都，看着，你，眼睛里，充满了，希望。

"我们，支持，你！"他们，大声喊。

从，那天，起，你，带领着，人们，开始了，重建，文明，的，伟大，事业。

你，建立了，新的，政府。

你，制定了，新的，法律。

你，建立了，新的，教育，体系。

你，建立了，新的，医疗，体系。

你，建立了，新的，经济，体系。

你，建立了，新的，军事，体系。

整个，世界，在，你的，带领下，快速地，发展。

一年后，迷雾，完全，消散了。

两年后，变异生物，被，完全，消灭了。

三年后，人类的，人口，恢复到了，迷雾来临前的，水平。

五年后，人类的，科技，超过了，迷雾来临前的，水平。

十年后，人类，开始，探索，太空。

你，成为了，人类历史上，最伟大的，领袖。

你，的，名字，被，刻在了，人类历史的，丰碑上。

你，的，事迹，被，人们，代代，传颂。

你，建立的，新希望城，成为了，人类的，首都。

你，建立的，文明，被，称为，"新希望文明"。

人类，进入了，一个，新的，黄金时代。

而，这，一切，都，始于，两百天前，的，那个，普通的，幸存者。

那个，在，迷雾中，没有，放弃，的，人。

那个，带领着，人们，走出了，黑暗，的，人。

那个，给，人类，带来了，希望，的，人。

你。

【理智+20】

【达成结局：E15 文明重生。】

【你，成为了，人类历史上，最伟大的，领袖。】

【你，建立了，"新希望文明"。人类，进入了，新的，黄金时代。】

【所有NPC好感度+100】

【获得称号：文明的缔造者。全属性+20。人类永远的领袖。】

【游戏结束。感谢你的游玩！】

【全剧终】`,next:`__return__`},{id:`mist_lord`,text:`选择「迷雾之主」结局——继承先知的力量，成为新的迷雾之主`,effects:[{kind:`resource`,resource:`sanity`,delta:-20},{kind:`flag`,flag:`ending_mist_lord`}],result:`"我，选择，继承，先知的，力量。"你说，声音，很，平静，"我，要，成为，新的，迷雾之主。"

所有人，都，愣住了。

他们，不敢相信，自己的，耳朵。

"首领……你……"老周，结结巴巴地说。

"我，知道，我，在，做，什么。"你说，"先知，虽然，做了，很多，坏事。但是，他，的，力量，是，真实的。"

"如果，我，继承了，他，的，力量，我，就，能，控制，迷雾。我，就，能，保护，人类。我，就，能，让，人类，不再，受到，迷雾的，威胁。"

"但是，这，需要，代价。"

"我，会，失去，人类的，身份。我，会，变成，像，先知，一样的，存在。"

"但是，为了，人类，我，愿意，付出，这个，代价。"

你，看着，他们，然后，笑了。

"再见了，我的朋友们。"

然后，你，转身，走进了，城北地下实验室。

你，走到了，先知的，核心意识，面前。

你，伸出手，触摸了，那个，发光的，大脑。

然后，一股，强大的，能量，涌入了，你的，身体。

你，的，意识，开始，和，先知的，意识，融合。

你，的，身体，开始，发光。

你，的，眼睛，变成了，蓝色。

你，的，周围，开始，出现，迷雾。

最后，你，的，身体，消失了。

你，变成了，一个，意识体。

你，成为了，新的，迷雾之主。

从，那天，起，迷雾，开始，慢慢地，消散。

因为，你，在，控制，它。

变异生物，开始，慢慢地，退化。

因为，你，在，压制，它们。

人类，开始，慢慢地，恢复。

因为，你，在，保护，他们。

但是，没有人，知道，这，一切，都是，因为，你。

没有人，知道，你，为了，人类，付出了，什么，代价。

没有人，知道，你，还，存在。

你，只是，默默地，在，迷雾中，守护着，人类。

就像，一个，看不见的，守护神。

偶尔，会，有人，说，他们，在，迷雾中，看到了，一个，人影。

但是，没有人，相信，他们。

因为，那个人影，只是，一闪，而逝。

就像，一个，幻觉。

但是，你，知道，那，不是，幻觉。

那，是，你。

你，在，迷雾中，守护着，人类。

永远。

【理智-20】

【达成结局：E16 迷雾之主。】

【你，继承了，先知的，力量，成为了，新的，迷雾之主。】

【你，控制了，迷雾，保护了，人类。但是，你，失去了，人类的，身份。】

【没有人，知道，你，还，存在。你，只是，默默地，在，迷雾中，守护着，人类。】

【获得称号：迷雾之主。全属性+50。迷雾的绝对掌控者。人类的，看不见的，守护神。】

【游戏结束。感谢你的游玩！】

【全剧终】`,next:`__return__`},{id:`dictator`,text:`选择「独裁者」结局——用铁腕统治世界，建立独裁政权`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`ending_dictator`}],result:`"我，选择，用，铁腕，统治，世界。"你说，声音，很，冷酷，"只有，强大的，政权，才能，给，人类，带来，秩序，和，和平。"

所有人，都，愣住了。

他们，不敢相信，自己的，耳朵。

"首领……你……"老周，结结巴巴地说。

"我，知道，我，在，做，什么。"你说，"民主，太，软弱了。在，这个，危险的，世界里，只有，独裁，才能，生存。"

"我，会，建立，一个，强大的，独裁政权。我，会，用，铁腕，统治，世界。"

"任何，反对，我的，人，都，会，被，消灭。"

"但是，我，也，会，给，人们，带来，秩序，和，和平。我，会，让，人们，过上，安稳的，生活。"

"这，就是，我的，选择。"

你，看着，他们，眼睛里，没有，一丝，感情。

"你们，支持，我，吗？"

所有人，都，沉默了。

然后，老周，第一个，开口了。

"我，支持，你。"他说，"无论，你，做，什么，选择，我，都，支持，你。"

"我，也，支持，你。"黑鸦，说。

"我，也，支持，你。"其他人，纷纷，说。

你，点了点头。

"好。"你说，"从，今天，起，新希望帝国，正式，成立。"

"我，是，第一任，皇帝。"

从，那天，起，你，建立了，新希望帝国。

你，用，铁腕，统治，着，世界。

你，消灭了，所有，反对，你的，势力。

你，建立了，强大的，军队。

你，建立了，严密的，情报，系统。

你，建立了，严格的，法律。

任何，违反，法律，的，人，都，会，被，严厉，惩罚。

但是，你，也，给，人们，带来了，秩序，和，和平。

在，你的，统治，下，没有，战争。

没有，犯罪。

没有，混乱。

人们，过上了，安稳的，生活。

虽然，他们，没有，自由。

虽然，他们，没有，民主。

但是，他们，有，秩序。

他们，有，和平。

他们，有，安稳的，生活。

十年后，人类的，人口，恢复到了，迷雾来临前的，水平。

二十年后，人类的，科技，超过了，迷雾来临前的，水平。

五十年后，人类，开始，探索，太空。

你，统治了，世界，五十年。

在，这，五十年里，世界，和平，稳定。

人们，过上了，安稳的，生活。

但是，也，有，很多人，在，暗中，反对，你。

他们，称，你，为，"独裁者"。

他们，称，你的，政权，为，"暴政"。

但是，他们，不敢，公开，反对，你。

因为，你，太，强大了。

五十年后，你，去世了。

你，去世的，那天，整个，世界，都，在，哀悼。

有人，是，真心，哀悼，你。

因为，你，给，他们，带来了，秩序，和，和平。

有人，是，假意，哀悼，你。

因为，他们，终于，摆脱了，你的，统治。

你，去世后，新希望帝国，很快，就，崩溃了。

世界，又，陷入了，混乱。

但是，人们，永远，不会，忘记，你。

有人，说，你，是，伟大的，领袖。

有人，说，你，是，残暴的，独裁者。

但是，无论，如何，你，都，在，人类历史上，留下了，深深的，印记。

【理智-10】

【达成结局：E17 独裁者。】

【你，建立了，新希望帝国，用，铁腕，统治，世界，五十年。】

【在，你的，统治，下，世界，和平，稳定。但是，人们，没有，自由，和，民主。】

【你，去世后，帝国，崩溃了。世界，又，陷入了，混乱。】

【人们，对你，的，评价，褒贬不一。有人，说，你，是，伟大的，领袖。有人，说，你，是，残暴的，独裁者。】

【获得称号：铁腕的独裁者。力量+20，领导力+20。人类历史上，最具争议的，统治者。】

【游戏结束。感谢你的游玩！】

【全剧终】`,next:`__return__`},{id:`humanity_end`,text:`选择「人类末日」结局——发现迷雾无法消散，人类最终走向灭亡`,effects:[{kind:`resource`,resource:`sanity`,delta:-30},{kind:`flag`,flag:`ending_humanity_end`}],result:`"我，发现了，一个，可怕的，真相。"你说，声音，很，沉重，"迷雾，是，无法，消散的。"

所有人，都，愣住了。

"什么？"老周，问，"这，怎么，可能？"

"是，真的。"你说，"我，研究了，先知的，所有，资料。我，发现，迷雾，不是，自然，现象。它，是，一个，巨大的，实验。"

"而，这个，实验，已经，无法，停止了。"

"迷雾，会，越来越，浓。"

"变异生物，会，越来越，强。"

"最终，人类，会，被，完全，消灭。"

"这，就是，人类的，末日。"

所有人，都，沉默了。

他们，不敢相信，自己的，耳朵。

"那……那，我们，该，怎么办？"陈静，问，声音，在，发抖。

"没有，办法。"你说，"我们，只能，等待，末日的，到来。"

"但是，在，末日，到来，之前，我们，可以，做，一些，事情。"

"我们，可以，让，最后的，日子，过得，更，有，意义。"

"我们，可以，保护，尽可能多的，人。"

"我们，可以，留下，人类，存在过的，证据。"

"这样，即使，人类，灭亡了，也，会，有，其他的，文明，知道，我们，曾经，存在过。"

你，看着，他们，然后，笑了。

那个，笑容，很，悲伤。

"来吧，我的朋友们。让，我们，一起，度过，人类，最后的，日子。"

从，那天，起，你，带领着，人们，开始了，最后的，挣扎。

你，建立了，避难所。

你，保护了，尽可能多的，人。

你，留下了，人类，的，所有，知识，和，文化。

你，把，这些，知识，和，文化，刻在了，石头上，埋在了，地下。

这样，即使，人类，灭亡了，这些，知识，和，文化，也，会，保存，下来。

迷雾，越来越，浓。

变异生物，越来越，强。

人类的，数量，越来越，少。

一年后，人类的，数量，只剩下，一百人。

两年后，人类的，数量，只剩下，十个人。

三年后，人类的，数量，只剩下，你，一个人。

你，站在，新希望塔，的，顶端。

你，看着，下面的，废墟。

你，看着，浓浓的，迷雾。

你，知道，这，是，人类的，最后一天。

你，笑了。

那个，笑容，很，平静。

"人类，曾经，存在过。"你，喃喃地说，"人类，曾经，创造过，辉煌的，文明。"

"虽然，我们，最终，灭亡了。"

"但是，我们，曾经，努力过。"

"我们，曾经，奋斗过。"

"我们，曾经，爱过。"

"这，就，够了。"

然后，你，闭上了，眼睛。

迷雾，吞没了，你。

人类，正式，灭亡。

但是，在，地下，深处，那些，刻在，石头上的，知识，和，文化，还，在。

它们，在，等待着，下一个，文明，的，到来。

它们，在，告诉，下一个，文明：

"人类，曾经，存在过。"

【理智-30】

【达成结局：E18 人类末日。】

【你，发现了，可怕的，真相：迷雾，无法，消散。人类，最终，会，灭亡。】

【你，带领着，人们，度过了，最后的，日子。你，留下了，人类，的，所有，知识，和，文化。】

【三年后，人类，正式，灭亡。你，是，最后一个，人类。】

【但是，人类，的，知识，和，文化，被，保存，了，下来。它们，在，等待着，下一个，文明。】

【获得称号：最后的人类。全属性+30。人类文明的，最后守护者。】

【游戏结束。感谢你的游玩！】

【全剧终】`,next:`__return__`}]}],Il=[{id:`npc_betrayal`,text:`深夜，你被一阵轻微的响动惊醒。

营地边缘，一个熟悉的身影正蹑手蹑脚地翻动着公共物资箱。火把的光很暗，但你看得很清楚——那是这几天一直和你并肩的人。

他把几罐食物和一小卷布料塞进了自己的包里，动作很熟练，显然不是第一次。

你的手按在了武器上。

在这个世界里，信任比食物还贵。`,minDay:10,maxTriggers:1,weight:0,choices:[{id:`confront`,text:`当面对质`,hint:`把事情摆到明面上`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`item`,item:`food_canned`,amount:3}],result:`你站了出来，声音不大，但足够让所有人听见。

他僵在原地，包里的罐头滚落出来。营地里一片死寂。

最后，他没有辩解，把东西交了回来，收拾了自己的东西。天亮之前，他消失在雾里。

物资追回来了，但营地里少了一个人，也少了一些说不清的东西。

【你追回了物资，但也失去了一个同伴。】`,next:`__return__`},{id:`pretend_asleep`,text:`假装没看见，暗中提防`,hint:`留他在身边，但不再信任`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`flag`,flag:`watched_betrayal`}],result:`你闭上了眼睛，呼吸放得很平稳。

脚步声远去，你的心却一直悬着。

从今晚起，你睡觉时会握着刀，值夜时会把最重要的物资藏在自己身边。你没有撕破脸——多一个人，就多一分活下去的力气。

但你比谁都清楚，这份信任已经死了。

【你选择隐忍，从此夜里再难安眠。】`,next:`__return__`},{id:`expel_him`,text:`立刻驱逐，绝不留情`,hint:`背叛没有第二次`,effects:[{kind:`resource`,resource:`energy`,delta:-5},{kind:`flag`,flag:`expelled_traitor`}],result:`你把所有人叫醒，当众宣布了他的所作所为。

他求你给他一次机会，说迷雾里的独行活不过三天。你没说话，只是指了指雾的深处。

他走的时候没有回头。

营地安静了，你却整夜没有合眼。规矩立住了，人心也冷了半截。

【立了规矩，寒了人心。】`,next:`__return__`}]},{id:`npc_sacrifice`,text:`兽吼就在耳边。

一头变异的野兽撞开了临时路障，直冲着你扑过来。你脚下一滑，躲闪已经来不及了。

就在这时，一个身影从侧面撞了上来，把你推向一边。

是你身边的人。

他举着撬棍和野兽缠斗在一起，肩膀已经被撕开了一道口子，血溅在了墙上。

机会只有一瞬。`,minDay:8,maxTriggers:1,weight:0,choices:[{id:`fight_back`,text:`趁隙反击，救下他`,hint:`赌一把`,effects:[{kind:`resource`,resource:`health`,delta:-12},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`debt_of_life`}],result:`你没有逃。

撬棍、石块、撕心裂肺的吼声——当你反应过来的时候，野兽已经倒在了血泊里。

他还活着，肩膀的伤口很深，但止住了血。他看着你，咧嘴笑了笑，说值了。

你们互相搀扶着回到营地。从今天起，这条命不再只属于你一个人。

【欠下一条命的重量，比伤更疼。】`,next:`__return__`},{id:`accept_cover`,text:`抓住机会先撤，拖他出来`,hint:`先保住能保住的`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`companion_sacrificed`}],result:`你的身体比意志先动了——你退了出去。

等野兽的咆哮停下，你回到原地。他还有呼吸，但伤得很重，以后可能再也提不动武器了。

他躺在担架上，断断续续地说：不怪你。

可你夜夜都会听见那声兽吼，看见自己后退的那半步。

【活下来的人，要背着走开的那一步活下去。】`,next:`__return__`}]},{id:`deep_zone_danger`,text:`你已经深入了危险区腹地。

这里的雾浓得像浆糊，能见度不到十步。地上的植物呈现出不正常的暗紫色，空气里有股铁锈味。

然后你听见了——沉重的、不规律的脚步声，正从雾的深处逼近。

雾里透出一个巨大的轮廓。它还没发现你，但风向随时会变。

这是一片连经验最丰富的拾荒者都不愿踏足的地方。`,minDay:12,maxTriggers:2,weight:0,choices:[{id:`sneak_away`,text:`屏住呼吸，慢慢退出去`,hint:`稳，但一无所获`,effects:[{kind:`resource`,resource:`energy`,delta:-8},{kind:`resource`,resource:`sanity`,delta:-4}],result:`你贴着墙根，一步一步向后挪。

脚步声在三十步外停顿了一次——你的心脏几乎停跳——然后转向了另一个方向。

等你退回安全区，后背已经被冷汗浸透了。

什么都没拿到，但命还在。有时候，空手而归就是最好的收获。

【全身而退，也是一种胜利。】`,next:`__return__`},{id:`push_through`,text:`趁它没发现，冲过去`,hint:`危险区核心有价值的东西`,effects:[{kind:`resource`,resource:`health`,delta:-22},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`key_mist_crystal`,amount:1}],result:`你压低身形，在废墟的阴影里狂奔。

爪风擦着你的后背扫过，一堵半塌的墙替你挡住了追击。你钻进一道裂缝，摸到了你要找的东西——一块拳头大小的雾晶，在黑暗里泛着幽幽的光。

代价是后背三道血痕，和一路狂奔后几乎炸开的肺。

值不值？活着回来的人才有资格说。

【冒着生命危险，带回了稀有的雾晶。】`,next:`__return__`},{id:`stand_and_fight`,text:`占据高地，和它硬碰硬`,hint:`极度危险`,effects:[{kind:`resource`,resource:`health`,delta:-32},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`item`,item:`mat_scrap_metal`,amount:4}],result:`你抢占了断墙的制高点，在它扑上来的瞬间全力一击。

搏斗持续了整整一分钟，像一整年那么久。

当它终于不再动弹，你瘫坐在血泊和碎石里，几乎握不住武器。你从它巢穴里翻出了不少能用的金属。

这一战你赢了，但你也清楚——再来一次，你可能就回不来了。

【险胜。你的传说又多了一笔，你的骨头也少了几分完好。】`,next:`__return__`}]},{id:`hallucination`,text:`你的视野开始扭曲。

墙壁的纹路在蠕动，空气里飘出了烤肉的香味——你已经很多天没闻过这个味道了。

角落里，你看见了已经死去的人，在朝你招手，说你找到出口了，就在门外。

你明知道精神已经绷到了极限，可那扇"门"看起来那么真实，香气那么真实。

理智正在一分一分地流失。`,minDay:6,maxTriggers:3,weight:0,choices:[{id:`bite_wake`,text:`咬破手指，用疼痛保持清醒`,hint:`以痛制幻`,effects:[{kind:`resource`,resource:`health`,delta:-6},{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`resisted_hallucination`}],result:`你狠狠咬了下去。

铁锈味在嘴里弥漫，剧痛像一盆冰水浇在头上。招手的人影碎了，烤肉的香气散了，"门"变成了斑驳的墙。

你靠着墙滑坐到地上，大口喘气，然后笑出了声——有点疯，但你还是你。

痛觉是清醒的代价，这买卖划算。

【用一点伤，换回了神志。】`,next:`__return__`},{id:`follow_vision`,text:`顺着幻觉走过去看看`,hint:`也许……是真的呢`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`resource`,resource:`health`,delta:-10}],result:`你一步一步走向那扇"门"。

手指触到墙壁的瞬间，幻觉如潮水般退去——你站在断墙的边缘，脚下一半已经悬空，再走半步就是两层楼的落差。

你手脚并用地爬了回来，吐得昏天黑地。

没有出口。从来就没有。你把额头抵在冰凉的地上，第一次认真地想：自己是不是正在变成雾的一部分。

【差点用命验证了幻觉。】`,next:`__return__`},{id:`count_breath`,text:`原地坐下，闭眼默数呼吸`,hint:`等它过去`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`resource`,resource:`energy`,delta:5}],result:`你盘腿坐下，闭眼，数呼吸。

一，二，三……幻觉的低语在耳边嗡嗡作响，你只是数数。数到第两百下，声音淡了；数到第四百下，世界重新有了轮廓。

你再睁眼时，天已经蒙蒙亮。什么都没发生，这本身就是最好的结果。

【熬过去了。熬，也是一种本事。】`,next:`__return__`}]},{id:`base_breach`,text:`警报声撕破了夜空。

兽潮撞上了围墙——第一道防线已经碎了，木栅栏在巨兽面前像纸一样被撕开。

几只变异兽已经冲进了外围区，物资棚的方向传来坍塌声。

核心区的大门在震动。留给你做决定的时间不多了。`,minDay:15,maxTriggers:2,weight:0,choices:[{id:`defend_core`,text:`死守核心区`,hint:`保住命，弃掉外围`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`item`,item:`food_canned`,amount:-6},{kind:`flag`,flag:`base_breach_survived`}],result:`你把所有人撤进核心区，用一切能搬动的东西堵死了门。

一整夜，撞击声没有停过。有人哭，有人吐，你握着武器站在最前面，天亮时手还在抖。

兽潮退了。外围全毁了，物资棚被啃掉了一半，但人都活着，核心区还在。

墙可以重建，人没了就没了。

【惨烈的胜利。人还在，就有明天。】`,next:`__return__`},{id:`evacuate`,text:`放弃基地，趁乱撤进迷雾`,hint:`断尾求生`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`energy`,delta:-12},{kind:`flag`,flag:`base_evacuated`}],result:`你下达了撤退的命令。

所有人背着能背动的东西钻进了浓雾，身后是基地方向冲天的火光和兽吼。

你们在雾里走了一夜。有人回头看了很多次，你一次都没有。

家没了，但队伍还在。找块新地方，墙还能再砌起来——只要人活着。

【失去了一切，除了最重要的东西。】`,next:`__return__`},{id:`counterattack`,text:`组织反击，把兽潮打回去`,hint:`最疯狂的决定`,effects:[{kind:`resource`,resource:`health`,delta:-25},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`item`,item:`mat_scrap_metal`,amount:5},{kind:`flag`,flag:`repelled_beast_tide`}],result:`你吼出了反击的命令，火把和武器一起涌向外围。

那是一场绞肉机。但人数、地形和背水一战的狠劲站在你们这边——黎明前，最后一只变异兽倒在了大门前。

你们守住了基地，几乎完整的基地。兽尸拆出了大量可用的甲片和金属。

这一夜会被记住很多年。

【用血换来的完胜。基地的传说，从今晚开始。】`,next:`__return__`}]},{id:`oldk_revenge`,text:`一个流浪者带来了消息：老K在找你。

当年闹翻的时候，你拿走了属于他的东西。他记着，一天都没忘过。

今天傍晚，你在集市废墟的入口看见了他。三个月的迷雾把那个曾经圆滑的商人磨成了一头困兽，他身后站着两个拿武器的手下。

"东西，"他说，"或者别的什么。"

雾在他们身后涌动，像在等一场好戏。`,minDay:20,maxTriggers:1,weight:0,choices:[{id:`negotiate`,text:`交出物资，换他撤手`,hint:`花钱消灾`,effects:[{kind:`item`,item:`food_canned`,amount:-5},{kind:`item`,item:`med_first_aid`,amount:-2},{kind:`flag`,flag:`oldk_peace`}],result:`你把物资放在了两人中间的地上。

老K盯着你看了很久，久到雾都换了一个方向。最后他挥了挥手，手下把东西收了。

"算你识相。"他说，"这买卖，两清了。"

他们消失在雾里。你盯着自己空掉的背包，心里憋着一团火，但火没烧起来。

活人的尊严能折价，死人的不能。

【亏了物资，买回了太平。】`,next:`__return__`},{id:`ambush`,text:`将计就计，提前设伏`,hint:`他不会只来这一次`,effects:[{kind:`resource`,resource:`health`,delta:-12},{kind:`item`,item:`mat_scrap_metal`,amount:3},{kind:`flag`,flag:`oldk_resolved`}],result:`你比他预想的更快。

集市废墟的三面早就埋好了绊索和油桶，你站在他唯一的退路上等他。

打斗很短，也很脏。他的两个手下扔下武器跑了，老K躺在断墙下，看着你，像看着另一个自己。

"拿去吧，"他喘着气，"这鬼地方，你比我更适合活着。"

你收缴了他的全部家当，留了他一条命。

【恩怨了结。有些账，只能用这种方式清。】`,next:`__return__`},{id:`stand_fight`,text:`当面硬拼，决一死战`,hint:`血债血偿`,effects:[{kind:`resource`,resource:`health`,delta:-30},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`oldk_defeated`}],result:`你没有废话，直接动了手。

三打一。你用一场几乎送命的混战证明了一件事：你不想死的时候，谁也收不走你的命。

老K的手下折了一个，剩下的人抬着他退了。你没有追——你的左臂已经抬不起来了。

从今往后，雾里的流浪者提起你，语气都会变一变。

【你赢了，赢得只剩半条命。但这条命，从此没人敢惦记。】`,next:`__return__`}]},{id:`hope_ship_war`,text:`"希望号"的广播响彻了整片区域，这是它第一次不用礼貌的措辞。

"缓冲区居民注意：你们非法占有的物资属于全人类。限四十八小时内移交，否则我们将采取必要行动。"

然后你看见了他们的人：武装齐整，沿河布哨，探照灯夜夜扫过你们的住区。

战争没有宣战书。它只是来了。

你手里握着的，是这片雾里最后的自主权。`,minDay:25,maxTriggers:1,weight:0,choices:[{id:`first_strike`,text:`先发制人，夜袭他们的哨站`,hint:`不给对方集结的时间`,effects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`item`,item:`key_battery`,amount:2},{kind:`flag`,flag:`hope_ship_hostile`}],result:`雨夜，你带着人摸掉了河边最关键的一个哨站。

交火比预想的短。当他们反应过来时，你们已经带着电台、电池和整个哨站的补给消失在雾里。

"希望号"的广播骂了整整一夜，但探照灯从此不敢再过河。

你把钢笔一样的电台零件攥在手里——现在，规则是他们定的还是你们定的，得再谈。

【狭路相逢，先出拳的活着。】`,next:`__return__`},{id:`hold_and_talk`,text:`据守待变，谈判周旋`,hint:`用时间换筹码`,effects:[{kind:`item`,item:`food_canned`,amount:-8},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`hope_ship_truce`}],result:`你拒绝了移交，也拒绝了开枪。

谈判进行了三轮，桌上推过去的除了物资清单，还有你绘制的兽潮活动图——那是他们花多大代价都买不到的东西。

第四轮，双方的哨位都后撤了五十米。

停战不是信任，只是谁都需要时间。但至少，今夜的探照灯不会再扫过孩子们的窗户。

【退了一步，换来喘息。外交是另一种战斗。】`,next:`__return__`},{id:`vanish_mist`,text:`举队遁入迷雾深处`,hint:`让他们找不到人`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`resource`,resource:`energy`,delta:-12},{kind:`flag`,flag:`mist_hidden`}],result:`你们拆掉了能带走的全部设施，整个营地像被雾吞掉了一样消失了。

雾深处的日子很苦：水要一口一口省着喝，夜里的声音近得可怕。但"希望号"的搜索队三次从你们头顶走过，一次都没有发现。

一个月后，他们的广播换回了礼貌的语气。

自由有时候不是打赢来的，是藏出来的。

【迷雾收留了你们，也藏起了你们。】`,next:`__return__`}]},{id:`deep_forest_danger`,text:`深林里的雾会"呼吸"。

你循着足迹追了三公里，本该追到猎物——但你追到的，是一片被彻底压平的林地，和地上一串斗一样大的爪印。

灌木丛深处传来低沉的呼吸声，每一口都像风箱。几根缠着浓雾的藤蔓无风自动，露出了后面的东西：一只你从未见过的变异体，正护着巢穴里亮晶晶的一堆东西。

退路还有。但那堆东西，随便一件都够你换半个月的粮。`,minDay:14,maxTriggers:2,weight:0,choices:[{id:`hunt_it`,text:`猎杀它，拿下巢穴`,hint:`富贵险中求`,effects:[{kind:`resource`,resource:`health`,delta:-28},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`flag`,flag:`sl_variant_predator`}],result:`这一战没有任何花哨可言。

你用地形、陷阱和一整个下午，把这场猎杀变成了一门消耗课。当它终于倒下时，你已经数不清自己流了多少血。

巢穴里躺着你要的东西：一枚上好的雾晶，还有嵌在它甲壳缝隙里的旧世界金属。

你背着战利品走出深林时，太阳正好落山。

【深林承认了新的猎手。】`,next:`__return__`},{id:`scavenge_edge`,text:`只捡外围的碎料，绝不靠近巢穴`,hint:`见好就收`,effects:[{kind:`item`,item:`mat_cloth`,amount:2},{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`health`,delta:-8}],result:`你压着心跳，只在外围活动。

碎布、石料、半卷旧铁丝——都是它巢穴边上散落的东西，不够耀眼，但足够实在。

低沉的呼吸声一直没停，你也一直没有靠近。退出深林的时候，你的后背全湿了，收获袋却不空。

克制不是懦弱。空手回去才是。

【稳当的收获，完整的命。】`,next:`__return__`},{id:`retreat`,text:`原路撤退，不冒这个险`,hint:`来日方长`,effects:[{kind:`resource`,resource:`energy`,delta:-5}],result:`你盯着那堆微光看了十秒钟，然后转身，原路退出了深林。

十秒钟里你想了很多：自己的伤、营地的粮、还有上次那头野兽留下的疤。

三公里夜路，你走得很稳。回到火堆边时，同伴问有什么收获，你摊了摊手。

什么都没有——包括伤口。

【有些险，不值得冒第二次。】`,next:`__return__`}]}],$={version:1,storyline:{id:`main`,title:`迷雾降临`,desc:`生存主循环（合成骨架，旧 6 条线作为触发式支线保留）`,initialScene:`start`,scenes:{start:{id:`start`,text:`木屋。火光摇曳。

迷雾已经笼罩了不知道多少天。你靠着墙，听着外面雾里传来的窸窣声。每一天都是生存，但你知道，不能一直这样下去——要么找到出路，要么死在这雾里。

【提示】合理分配行动力。低血量/低体力时做危险的事会真的死掉。`,choices:[{id:`prologue`,text:`📖 序章：迷雾初临 [回顾开场剧情]`,hint:`不消耗行动点。回顾你是如何来到这迷雾世界的。`,apCost:0,effects:[],next:`ch1_wake`,result:``},{id:`story_progress`,text:`▶ 推进剧情 [查看当前故事]`,hint:`查看当前章节和可触发的剧情事件`,apCost:0,effects:[],next:`story_hub`,result:``},{id:`search`,text:`出门搜寻物资 [食物+12] [水+10]`,hint:`消耗1行动点。体力低于20时有受伤风险。`,apCost:1,effects:[{kind:`resource`,resource:`food`,delta:12},{kind:`resource`,resource:`water`,delta:10},{kind:`resource`,resource:`energy`,delta:-5}],next:`start`,result:`你在雾里翻了三处废墟。灰尘呛得你直咳嗽，但收获够撑一天。`},{id:`explore_ruins`,text:`探索附近废墟 [可能找到零件/物资]`,hint:`消耗1行动点。危险！低血量时可能遭遇不测。`,apCost:1,effects:[{kind:`roll`,difficulty:40,successEffects:[{kind:`item`,item:`radio_parts`,amount:1},{kind:`item`,item:`metal`,amount:2},{kind:`resource`,resource:`food`,delta:8}],failEffects:[{kind:`resource`,resource:`health`,delta:-5},{kind:`resource`,resource:`energy`,delta:-5}]}],next:`start`,result:`你走向那栋半塌的建筑。雾里的影子晃了晃，你握紧了手里的棍子……`},{id:`rest`,text:`在屋里休整 [体力+15] [理智+3] [生命+5]`,hint:`消耗1行动点。安全的恢复手段。`,apCost:1,effects:[{kind:`resource`,resource:`energy`,delta:15},{kind:`resource`,resource:`sanity`,delta:3},{kind:`resource`,resource:`health`,delta:5}],next:`start`,result:`你靠着墙打了个盹。梦里没有雾，只有阳光。伤口好像也没那么疼了。`},{id:`craft_fire`,text:`生火取暖 [温暖+25] [理智+5]`,hint:`消耗1行动点，需要木材×3。夜晚前生火更安全。`,apCost:1,requires:{items:{wood:3}},effects:[{kind:`item`,item:`wood`,amount:-3},{kind:`resource`,resource:`warmth`,delta:25},{kind:`resource`,resource:`sanity`,delta:5},{kind:`resource`,resource:`health`,delta:3}],next:`start`,result:`火堆噼啪作响。橘色的光把阴影逼到墙角。你伸出手，感觉指节慢慢活了过来。`},{id:`gather_wood`,text:`砍伐木材 [木材+5]`,hint:`消耗1行动点。体力低于15时会受伤。`,apCost:1,effects:[{kind:`item`,item:`wood`,amount:5},{kind:`resource`,resource:`energy`,delta:-8}],next:`start`,result:`你找到几棵枯死的树，抡起斧头砍了半天。木材堆在墙角，心里踏实了不少。`},{id:`meditate`,text:`静坐冥想 [理智+10] [生命+3]`,hint:`消耗1行动点。平复心神，对抗迷雾侵蚀。`,apCost:1,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`resource`,resource:`energy`,delta:-3},{kind:`resource`,resource:`health`,delta:3}],next:`start`,result:`你闭上眼睛，试着忽略雾里的低语。呼吸慢慢平稳下来，那些幻觉也退散了。`},{id:`use_bandage`,text:`使用绷带包扎 [生命+20]`,hint:`消耗1行动点，需要绷带×1。重伤时的救命稻草。`,apCost:1,requires:{items:{bandage:1}},effects:[{kind:`item`,item:`bandage`,amount:-1},{kind:`resource`,resource:`health`,delta:20}],next:`start`,result:`你咬着牙把绷带缠在伤口上。疼得直冒冷汗，但血总算止住了。`},{id:`use_herb`,text:`熬制草药 [生命+12] [理智+3]`,hint:`消耗1行动点，需要草药×2。缓慢恢复，还能平复心神。`,apCost:1,requires:{items:{herb:2}},effects:[{kind:`item`,item:`herb`,amount:-2},{kind:`resource`,resource:`health`,delta:12},{kind:`resource`,resource:`sanity`,delta:3}],next:`start`,result:`你把草药扔进铁罐里熬煮。苦涩的味道弥漫开来，但喝下去后，身体确实暖和了一些。`},{id:`hunt`,text:`夜巡狩猎 [危险！可能遭遇野兽]`,hint:`消耗1行动点。血量低于30时不要去，真的会死。`,apCost:1,effects:[{kind:`roll`,difficulty:55,successEffects:[{kind:`combat`}],failEffects:[{kind:`resource`,resource:`energy`,delta:-5}]}],next:`start`,result:`你握紧木矛走进雾里。黑暗深处，有什么东西也在找你。`},{id:`repair_radio`,text:`修理无线电 [需要零件×3]`,hint:`消耗1行动点。修好后可发送求救信号，触发好结局。`,apCost:1,requires:{items:{radio_parts:3}},effects:[{kind:`item`,item:`radio_parts`,amount:-3},{kind:`flag`,flag:`radio_fixed`}],next:`start`,result:`你把最后一个零件焊上去，拧开旋钮——刺啦刺啦的电流声里，似乎有人类的声音。无线电修好了！`},{id:`train`,text:`锻炼身体 [力量+1] [体力-8]`,hint:`消耗1行动点。永久提升力量，战斗伤害更高。`,apCost:1,effects:[{kind:`resource`,resource:`energy`,delta:-8}],next:`start`,result:`你用碎石做了个简易哑铃，对着晨光练了一组。胳膊酸得发抖，但你知道这会有用的。`},{id:`study`,text:`研究地图和线索 [智力+1] [理智+2]`,hint:`消耗1行动点。永久提升智力，检定成功率更高。`,apCost:1,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`start`,result:`你把搜来的残破地图摊在地上，用炭笔标出已探索的区域。迷雾的轮廓似乎清晰了一些。`}]},story_hub:{id:`story_hub`,text:`你翻出那本残破的笔记本，上面记录着你来到这迷雾世界后的每一天。

有些记忆已经模糊了，但有些事，你永远不会忘。`,choices:[{id:`back`,text:`← 回到木屋`,effects:[],next:`start`,result:``}]},ch1_wake:{id:`ch1_wake`,text:`你是被冷醒的。

不是冬天那种冷，是一种渗进骨头里的、带着潮湿气息的冷。你睁开眼，发现自己躺在一间陌生的木屋里。天花板的木板在滴水，空气里弥漫着腐叶和铁锈的味道。

窗外是一片浓得化不开的白雾。你什么都看不见，只能听见雾里传来的、若有若无的低语声。

你不记得自己是怎么来到这里的。最后一段记忆，是下班路上的一场大雨，然后……就没有然后了。

你的口袋里有一部没电的手机，一串钥匙，和半包没拆的烟。除此之外，一无所有。`,choices:[{id:`look_around`,text:`仔细查看木屋`,effects:[{kind:`item`,item:`wood`,amount:3},{kind:`resource`,resource:`sanity`,delta:-3}],next:`ch1_first_explore`,result:`你扶着墙站起来，腿有点软。木屋里空荡荡的，只有一张破床、一个锈迹斑斑的铁炉，和角落里堆着的几根木柴。你把木柴收起来——至少今晚不会冻死了。

但你注意到，木屋的门是从外面被闩上的。有人，或者有什么东西，把你关在了这里。`},{id:`panic`,text:`冲出门去`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`health`,delta:-5}],next:`ch1_first_explore`,result:`你猛地冲向门口，用肩膀撞开了那扇破旧的木门。雾扑面而来，你踉跄着跑了几步，然后被什么东西绊倒了。

你趴在地上，大口喘着气。雾里的低语声更近了，像是有人贴着你的耳朵在说话。你听不清内容，但那声音让你头皮发麻。

你花了好一会儿才冷静下来。跑是没用的——你根本不知道自己在往哪跑。`},{id:`calm`,text:`深呼吸，冷静下来`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`ch1_first_explore`,result:`你闭上眼睛，做了几次深呼吸。 panic 解决不了问题。你告诉自己：不管这是什么地方，先活下来再说。

你睁开眼，感觉冷静了一些。雾还在，低语还在，但你已经不再那么害怕了。`}]},ch1_first_explore:{id:`ch1_first_explore`,text:`你走出木屋。

雾比你想象的更浓。能见度不到五米，你只能看到脚下的碎石路和路边模糊的树影。空气潮湿阴冷，每一口呼吸都像是在喝冰水。

你沿着小路走了大约十分钟，发现了一栋半塌的建筑。看起来像是个便利店——玻璃碎了一地，货架倒了大半，但里面可能还有些能用的东西。

雾里传来了什么声音。像是脚步声，又像是拖拽什么东西的声音。你不确定。`,choices:[{id:`enter_store`,text:`进入便利店搜索`,effects:[{kind:`resource`,resource:`energy`,delta:-5},{kind:`roll`,difficulty:35,successEffects:[{kind:`resource`,resource:`food`,delta:20},{kind:`resource`,resource:`water`,delta:15},{kind:`item`,item:`bandage`,amount:2}],failEffects:[{kind:`resource`,resource:`health`,delta:-12},{kind:`resource`,resource:`sanity`,delta:-5}]}],next:`ch1_night`,result:`你小心翼翼地走进便利店。地上有碎玻璃，你踮着脚走过去。货架上还剩些东西——几包过期的饼干、半瓶矿泉水、还有一卷绷带。

你把东西塞进包里，正准备离开，突然听到身后传来一声低沉的嘶吼。你猛地回头——雾里站着一个人影，不，那不是人。它的四肢扭曲成不正常的角度，皮肤是灰白色的，眼睛里没有瞳孔。

你转身就跑。身后的嘶吼声越来越近，但你不敢回头。你一直跑，直到看到木屋的轮廓，才敢停下来。

你靠在门上，大口喘着气。那东西没有追过来。但你知道，它还在雾里。`},{id:`avoid_store`,text:`绕开便利店，继续探索`,effects:[{kind:`resource`,resource:`energy`,delta:-8},{kind:`resource`,resource:`food`,delta:5},{kind:`resource`,resource:`water`,delta:5}],next:`ch1_night`,result:`你决定不冒险。便利店看起来太危险了，你绕开它，继续沿着小路走。

你在路边找到了一些野果——不确定能不能吃，但你太饿了，还是摘了几个。你还在一个破桶里接到了一些雨水。

天色渐渐暗了下来。你意识到，必须在天黑前回到木屋。夜晚的雾，看起来比白天更浓了。`},{id:`investigate_sound`,text:`调查那个声音`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`roll`,difficulty:50,successEffects:[{kind:`item`,item:`metal`,amount:3},{kind:`resource`,resource:`sanity`,delta:-5}],failEffects:[{kind:`resource`,resource:`health`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-15}]}],next:`ch1_night`,result:`你握紧拳头，朝声音传来的方向走去。雾里的影子晃了晃，你看到了——那是一只野狗，不，比野狗大得多。它的皮毛是灰白色的，嘴里滴着涎水，正盯着你看。

你和它对峙了几秒。然后，它扑了过来。

你不知道自己是怎么活下来的。你只记得自己用一根铁棍拼命地挥打，然后那东西哀嚎着跑了。你瘫坐在地上，浑身是伤，手里还攥着那根铁棍。

你活下来了。但你知道，下一次，可能就没这么幸运了。`}]},ch1_night:{id:`ch1_night`,text:`夜幕降临。

你回到木屋，用木柴生了一堆火。火光在墙上跳动，把你的影子拉得很长。外面的雾更浓了，低语声也更清晰了——你甚至能听出那是一个女人的声音，在反复念着什么。

你听不懂，但那声音让你头皮发麻。

你靠在火边，感觉稍微暖和了一些。但你知道，这只是第一个夜晚。在这迷雾里，还有无数个夜晚在等着你。

你必须想办法活下去。`,choices:[{id:`sleep`,text:`睡觉，保存体力`,effects:[{kind:`resource`,resource:`energy`,delta:20},{kind:`resource`,resource:`sanity`,delta:-3}],next:`start`,result:`你裹着那件破外套，在火边躺了下来。你告诉自己不要睡太死，但疲惫很快就战胜了恐惧。

你做了一个梦。梦里你回到了家，坐在沙发上看电视。一切都很正常，没有雾，没有低语。然后电视突然变成了雪花，屏幕里传出那个女人的声音——

你猛地惊醒。火快灭了，外面的天已经蒙蒙亮。你活过了第一个夜晚。`},{id:`watch`,text:`守夜，保持警惕`,effects:[{kind:`resource`,resource:`energy`,delta:-10},{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`ch1_survived_night`}],next:`start`,result:`你决定不睡。你往火里添了根木柴，然后靠在门边，听着外面的动静。

夜很长。雾里的低语声时断时续，有时候像是在叫你的名字。你好几次差点冲出去看看，但都忍住了。

大约凌晨三点的时候，你听到了脚步声——不是一个，是好几个。它们在木屋外面转了一圈，然后离开了。你屏住呼吸，直到脚步声完全消失，才敢大口喘气。

天亮了。你活过了第一个夜晚。而且你知道了一件事——夜里，雾里有东西在游荡。`},{id:`investigate_whisper`,text:`循着低语声走出去`,effects:[{kind:`resource`,resource:`sanity`,delta:-20},{kind:`roll`,difficulty:60,successEffects:[{kind:`item`,item:`radio_parts`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10}],failEffects:[{kind:`resource`,resource:`health`,delta:-25},{kind:`resource`,resource:`sanity`,delta:-20}]}],next:`start`,result:`你鬼使神差地推开了门。雾扑面而来，你循着那个女人的声音走去。

雾越来越浓，你已经看不到木屋了。低语声越来越近，你甚至能听出她在念的是一串数字——像是某种坐标。

然后你看到了她。她站在雾里，背对着你，穿着一件白色的连衣裙。她的头发很长，垂到腰际。你想喊她，但发不出声音。

她慢慢地转过身来。你看到了她的脸——没有脸，只有一片空白。

你尖叫着转身就跑。你不知道自己跑了多久，直到你撞到了木屋的门。你瘫在地上，浑身发抖。

但你注意到，你的手里攥着什么东西——是一个电子元件，像是从什么设备上拆下来的。`}]}},endings:{E01:{id:`E01`,title:`直升机的轰鸣`,desc:`无线电里传来沙哑的人声：「收到你的信号了，坚持住！」三天后，螺旋桨的轰鸣撕开了浓雾。`,category:`good`},E02:{id:`E02`,title:`冲天信号弹`,desc:`红色的光划破迷雾。你瘫坐在地，看着那道光像火种一样，点燃了整个灰白的世界。`,category:`good`},E03:{id:`E03`,title:`篝火长明`,desc:`救援队说，是那堆烧了十五天的篝火让他们找到了方向。灰烬还温热着。`,category:`good`},E04:{id:`E04`,title:`平凡的等待`,desc:`第15天，雾散了一角。你听见远处传来发动机声——他们来了。没有鲜花与掌声，但你活下来了。`,category:`good`},E05:{id:`E05`,title:`迷雾之眼`,desc:`三块结晶在掌心共鸣，浓雾向两侧退开。你看见了这个世界最后的真相……（隐藏结局）`,category:`hidden`},E06:{id:`E06`,title:`同行者`,desc:`直升机上多了一个人。老K把旧照片塞回口袋，第一次笑了。（隐藏结局）`,category:`hidden`},E07:{id:`E07`,title:`走进雾里`,desc:`你听见有人在雾里喊你的名字。你放下一切，朝着那个声音走了过去。`,category:`death`},E08:{id:`E08`,title:`干渴`,desc:`喉咙里的灼烧感最终盖过了一切。迷雾很大，但水比雾更重要——这个道理来得太晚了。`,category:`death`},E09:{id:`E09`,title:`饥饿`,desc:`胃早已不再抗议。你在梦里吃了一顿很饱很饱的饭。`,category:`death`},E10:{id:`E10`,title:`病榻`,desc:`高烧中，木屋的天花板慢慢变成医院的白色。你没能等到退烧的那天。`,category:`death`},E11:{id:`E11`,title:`夜访者`,desc:`门闩没能挡住它。那一夜之后，木屋里再也没有亮起过火光。`,category:`death`},E12:{id:`E12`,title:`兽潮之夜`,desc:`兽潮过境，像一场黑色的洪水。你的木屋没能成为孤岛。`,category:`death`},E13:{id:`E13`,title:`守望者的日记`,desc:`直升机轰鸣着降落时，救援队员在你桌上发现了一摞日记。十几个日夜的记录：天气、物资、每一个帮助过你的人。队长读完沉默了很久，说：'这才是我们找的人。'你的日记被收进了灾后档案馆。`,category:`hidden`},E14:{id:`E14`,title:`不散的篝火`,desc:`你把最后一块巧克力掰成两半。小女孩靠着你睡着了，手里还攥着那只布偶熊。篝火烧到天亮，直升机的探照灯落下时，你们谁都没有醒。有些家，不是等来的，是两个人一起守出来的。`,category:`hidden`}}},lines:[{id:`duoduo_s1_meet`,title:`朵朵 · 一`,desc:``,trigger:{dayMin:3,notFlags:[`kid_met`,`kid_repelled`,`kid_lost`]},initialScene:`duoduo_s1_meet__gate`,scenes:{duoduo_s1_meet__gate:{id:`duoduo_s1_meet__gate`,text:`第三天清晨，你去查看陷阱时发现了她。
六七岁的小女孩抱着膝盖蹲在你家篱笆外，穿一件明显大了两号的脏毛衣，嘴唇干得裂开了皮。她不哭也不闹，一双眼睛越过歪斜的木栅栏，死死钉在你手里那罐罐头上——准确地说，是钉在罐头商标上那个鲜红的番茄图案上。
雾从她身后的村道漫过来，白茫茫的，把一切都泡得发胀。她就一动不动地坐在雾的边缘，像一只不敢靠近火堆、又实在饿极了的小兽。`,choices:[{id:`c_0`,text:`分她一个罐头`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`kid_met`},{kind:`item`,item:`food_canned`,amount:-1}],next:`duoduo_s1_meet__name`,requires:{items:{food_canned:1}},result:`你蹲下来，把罐头从篱笆缝里递了过去。她扑上来抓过就开，拉环都差点拽断，吃得狼吞虎咽，噎住了也不肯停，直到最后一勺刮干净才停下来喘气。
然后她站起来，郑重其事地掸掸裤子，朝你鞠了一躬：「我叫朵朵。哥哥你叫什么？」
【叮！好感度提升：朵朵 +20】`},{id:`c_1`,text:`给她水喝`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`kid_met`},{kind:`item`,item:`water_clean`,amount:-1}],next:`duoduo_s1_meet__name`,requires:{items:{water_clean:1}},result:`你拧开水壶递过去。她小口小口地抿，喉结一下一下地滚，像在品尝什么失传已久的珍宝。「妈妈说不能大口喝，会呛。」她说这话时眼神很平静，平静得让你心里发堵——她妈妈在哪儿呢？
你没敢问。
【叮！好感度提升：朵朵 +15】`},{id:`c_2`,text:`挥手赶走她`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`kid_repelled`}],next:`duoduo_s1_meet__name`,result:`「走吧，这儿不留人。」你压低声音说。
她没有哭，也没有闹，只是安安静静地站起来拍了拍裤子上的土，一步三回头地走进了雾里。走到第三回头的时候，她的身影彻底融进了白色里。
那天晚上你梦见很白很白的东西，醒来时天还没亮，窗板上全是抓挠般的划痕。
【叮！好感度下降：朵朵 -15】`},{id:`c_3`,text:`隔着篱笆把罐头推过去，不靠太近`,effects:[],next:`duoduo_s1_meet__name`},{id:`c_4`,text:`先观察她：有没有伤，身后有没有跟着东西`,effects:[],next:`__return__`}]},duoduo_s1_meet__name:{id:`duoduo_s1_meet__name`,text:`朵朵擦擦嘴，忽然凑近了半步，两只手背在身后，压低声音，像在跟你交换什么天大的机密：「哥哥，你的名字呢？妈妈说过，知道名字的人，才能算真正的朋友。」
雾贴着篱笆缓缓流过，把她小小的影子衬得忽浓忽淡。远处不知名的方向传来一声悠长的、不属于任何已知动物的鸣叫，她却连头都没回——从刚才到现在，她的眼睛一直亮得不合时宜。在这样的世界里，还敢这么亮地看着一个陌生人的眼睛的人，要么还没吃过苦头，要么已经决定把吃苦头这件事往后排一排。`,choices:[{id:`c_0`,text:`把名字告诉她`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`「哦——」她把这个名字在舌尖上滚了三遍，像收糖果一样郑重地收进了口袋，「我记性好着呢。妈妈说我三岁就能背出全家人的电话号码。」她顿了顿，声音低下去一点，「所以我永远不会忘。」
不知道为什么，这句孩子气的话让你心里踏实了不少。在这个连名字都可能被雾偷走的世界里，有人记住了你。`},{id:`c_1`,text:`「名字会被雾听走，叫我哥哥就行」`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`她愣了一下，随即用力点头，一副「原来如此」的表情：「好！那我也不告诉别人我的名字——只告诉你一个人。这是秘密哦！」
你们之间有了第一个秘密。在末世里，一个只属于两个人的秘密，比一箱罐头还金贵。`},{id:`c_2`,text:`反问她：「那你叫什么？总得公平交易」`,effects:[],next:`__return__`},{id:`c_3`,text:`报一半留一半：「叫我小木就行」`,effects:[],next:`__return__`}]},duoduo_s1_meet__promise:{id:`duoduo_s1_meet__promise`,text:`临走前，朵朵站在雾的边缘回过头来，逆着灰白的光，看不清表情，只有声音清清楚楚地穿过篱笆：「哥哥，明天我还来。我有力气了就帮你干活，你可别赶我走。」
她顿了顿，又飞快地补了一句：「我说到做到，我从来不骗人。」
【叮！世界频道新增词条：「东边村子似乎有个小孩」】
从这天起，你的木屋多了一个惦记你的人——白天行动区出现了新的选择。`,choices:[{id:`c_0`,text:`目送她走进雾里`,effects:[{kind:`item`,item:`food_berry`,amount:2}],next:`__return__`,result:`小小的身影三转两转就没进了白雾，快得让你怀疑刚才是不是一场幻觉。
直到你低头，才发现手里不知何时被塞了一把野浆果，用狗尾巴草整整齐齐扎成一束——不知道她在哪片荆棘丛里采了多久。`},{id:`c_1`,text:`把旧外套披到她肩上，再看她走进雾里`,effects:[],next:`__return__`,requires:{items:{mat_cloth:1}}},{id:`c_2`,text:`教她一句暗号：「夜枭叫两声，就是我」`,effects:[],next:`__return__`}]},duoduo_s1_meet__repent:{id:`duoduo_s1_meet__repent`,text:`夜里风撞在窗板上，一下，又一下，节奏很轻很轻，像很小的一只手在外面敲。
你翻了个身，用被子蒙住头，对自己说：末世就是这样，先顾活人，顾不了那么多。这话没毛病，谁听了都得点头。
可脑子里翻来覆去的，全是那双盯着番茄图案的眼睛。那不是馋的眼睛，是饿了很多天的眼睛。而你在她转身之前，就已经数清楚了背包里还剩几个罐头。`,choices:[{id:`c_0`,text:`……但愿她能遇到别人`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`天亮时，窗台上多了一颗小石子，摆得端端正正，圆的那面朝上，像是某个孩子路过时留下的记号。
你隔着玻璃盯着那颗石子看了很久很久，最后还是没有开门。`},{id:`c_1`,text:`天不亮就把双份食物放上石阶`,effects:[],next:`__return__`}]}}},{id:`duoduo_s2_frog`,title:`朵朵 · 二`,desc:``,trigger:{dayMin:4,flags:[`kid_met`]},initialScene:`duoduo_s2_frog__gift`,scenes:{duoduo_s2_frog__gift:{id:`duoduo_s2_frog__gift`,text:`清晨推门，门槛的石阶上放着一只歪歪扭扭的纸青蛙和一小把浆果，摆得整整齐齐，浆果上还挂着露水——采下来不超过半个时辰。
纸青蛙折得实在算不上好看：一边翅膀大一边翅膀小，屁股那里还破了个洞，用一小截草茎仔细地缝上了。
篱笆外的雾里传来一阵憋不住的咯咯笑声。她躲在老地方那丛枯灌木后面看你呢，两只小脚丫在雾气里一晃一晃的，藏得一点也不用心的样子。`,choices:[{id:`c_0`,text:`朝雾里喊：谢谢朵朵！`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`「哇——被发现了啦！」笑声炸开了。小小的身影从灌木后蹦出来，冲你用力挥了两下手，又嗖地一声缩回雾里，只剩下一串踩着水洼远去的脚步声。
从这天起她隔三差五就来蹭饭，你的木屋成了她在末世里的游乐场。`},{id:`c_1`,text:`把纸青蛙摆在窗台最显眼的地方`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`你没有喊破，只是把纸青蛙摆在窗台正中央，朝着雾的方向。
第二天，纸青蛙旁边多了一只纸船。第三天是一朵蔫了一半的野花。第四天是一颗磨圆的玻璃珠。
你们谁都没提这件事，窗台却渐渐变成了一个小小的博物馆。`},{id:`c_2`,text:`削一支炭笔挂在篱笆尖上`,effects:[],next:`__return__`}]},duoduo_s2_frog__tea:{id:`duoduo_s2_frog__tea`,text:`这天她没跑，蹭在门槛上晃着两条够不着地的小腿，忽然没头没尾地问了一句：「哥哥，以前的……就是雾还没有的时候，外面的世界是什么样子的呀？」
她的语气认真得不像个孩子，像在问一个能决定后半辈子怎么活的问题。
雾在她身后缓慢地涨落，一起一伏，像某种庞大生物的呼吸。你忽然想起频道里有人说过，夜里十一点整，雾会变薄一线。你看了看天色，快了。`,choices:[{id:`c_0`,text:`讲学校、公交车和糖炒栗子`,effects:[{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`你讲了整整一个下午。讲到学校门口的糖炒栗子摊时，她咽了好大一口口水；讲到公交车，她追问「铁盒子怎么会自己跑」；讲到下课铃，她说「我们幼儿园也有，是海豚叫的」。
最后她拍拍手宣布：「我都记住啦。等雾散了，我要挨个去看一遍。」
有些东西，在被讲出来的那一刻，就重新存在了一次。`},{id:`c_1`,text:`反问她：妈妈去哪儿了？`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`晃着的小腿停住了。
「妈妈去找爸爸了，让我在这儿等。」她说得很快，眼睛看着自己的鞋尖，然后又飞快地补了一句，像是在说服自己，「他们说好会回来接我的。他们从来不骗人。」
那之后很久很久，她都没有再提过这件事。`},{id:`c_2`,text:`举起纸青蛙：「这补丁缝得比我的手艺强」`,effects:[],next:`__return__`}]},duoduo_s2_frog__close:{id:`duoduo_s2_frog__close`,text:`傍晚她走后，你在频道上刷到一条消息：「东边村子好像有个小孩，一个人！谁家走丢的？在线等，挺急的。」
下面跟了一排问号。然后是更长的沉默。九千人的频道，没有一个人接话。发消息的人最后自己回了一句「当我没说」，头像从此再没亮过。
你关掉频道，往石阶上放了一块黑面包，想了想，又压了块石头防猫。做完这一切，你听见自己的心跳，稳得有点陌生。`,choices:[{id:`c_0`,text:`睡前检查了一遍门闩`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`面包在第二天清晨消失了。石阶上留着两个并排的小膝盖印，还有一小圈深色的水渍——不知道是清晨的露水，还是别的什么。
你把那圈痕迹看了很久，最后默默把石头留在了原地。`},{id:`c_1`,text:`在频道匿名回一句：「孩子没事，有人照应」`,effects:[],next:`__return__`}]}}},{id:`duoduo_s3_letters`,title:`朵朵 · 三`,desc:``,trigger:{dayMin:5,flags:[`kid_met`],notFlags:[`kid_letters`,`kid_snaregirl`]},initialScene:`duoduo_s3_letters__book`,scenes:{duoduo_s3_letters__book:{id:`duoduo_s3_letters__book`,text:`朵朵今天背了个比她整个人还大的破布包，走一步晃三晃。到了跟前，她献宝似的从包里掏出半本识字课本——烧掉了整整一角，剩下的纸页黄脆得像枯叶。
「废墟里捡的！」她得意地扬起下巴，随即又蔫下去，「可是……好多字我不认识。」她翻开书页，指尖小心翼翼地避开焦边，像在碰什么随时会碎的东西，「哥哥，你能教我吗？妈妈以前说，认字的人才不会被人骗。」`,choices:[{id:`c_0`,text:`撕两块布做字卡，从「人」「口」「手」教起`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`kid_letters`},{kind:`item`,item:`mat_cloth`,amount:-2}],next:`duoduo_s3_letters__read`,requires:{items:{mat_cloth:2}},result:`你把布裁成巴掌大的卡片，烧过的炭条写上字，一天教三个。她学得飞快，第二天就追着你要新的，睡觉都要把字卡攥在手心里，攥出一圈汗印子。
【叮！朵朵学会了识字】——也许有一天，这些字会派上意想不到的用场。`},{id:`c_1`,text:`字先放放，教她看脚印、辨野果、下套子`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`kid_snaregirl`},{kind:`item`,item:`food_berry`,amount:2}],next:`duoduo_s3_letters__read`,result:`「这个是野兔的脚印，前浅后深说明它在跑；这个果子皮上有白霜的不能吃，吃了肚子会疼得打滚；下套子要卡在它回家的路上，不能卡在出门的路上……」
她蹲在地上听得眼睛发亮，捡了根树枝在小本本上画得密密麻麻。
【叮！朵朵学会了看踪迹】——这孩子在雾里活下去的本事，又多了一层。`},{id:`c_2`,text:`「别乱跑了，太危险」——把她劝回去`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`duoduo_s3_letters__read`,result:`她的肩膀肉眼可见地垮了下来。抱着那半本书慢慢往外走，走了三步又停下，回过头来把书放在了你家门口的柴堆上。
「那……书放你这儿。」她的声音很小，「你想看了就看看。」
书在你桌上放了很多天。你一个字也没看进去。`},{id:`c_3`,text:`拿浆果当奖品，认对一个给一颗`,effects:[],next:`__return__`,requires:{items:{food_berry:3}}}]},duoduo_s3_letters__read:{id:`duoduo_s3_letters__read`,text:`黄昏的光从雾层里滤下来，灰扑扑的，落在泛黄的课本上，竟有了一点旧金色的意思。
她头抵着头和你挤在一起，握笔的手势笨拙得像握一把小锄头，却一笔一划写得极认真，写两笔就要停下来吹吹手指头，舌头都不自觉地伸出了嘴角。
火堆偶尔噼啪响一声，她就抬头看一眼火，再低头接着写。整个屋子安静得只剩下炭笔划过布面的沙沙声。`,choices:[{id:`c_0`,text:`教她写自己的名字：朵朵`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`「朵」字她总写成两个「几」。练到第十几遍，纸上终于站出了一个端正的「朵朵」。
她盯着那两个字看了好久好久，久到你以为她睡着了。然后她忽然说：「原来我的名字写出来是这样的啊。」她又看了一眼，「真好看。」`},{id:`c_1`,text:`教她写你的名字`,effects:[{kind:`resource`,resource:`sanity`,delta:10}],next:`__return__`,result:`「这是你！」她举着卡片向你宣布，语气骄傲得像刚铸出一把宝剑。然后她把卡片揣进贴身的口袋，隔着布料拍了拍。
「这样你就不会丢了。」她一本正经地说，「丢了我也能把你找回来。」
雾这么大，这话本来是不该信的。可你还是信了。`},{id:`c_2`,text:`故意写错一个字让她来抓`,effects:[],next:`__return__`}]},duoduo_s3_letters__dusk:{id:`duoduo_s3_letters__dusk`,text:`收拾课本的时候，最后一页夹着的纸片飘了出来，打着旋落在地上。
那是从一张旧地图上撕下来的角，边缘磨出了毛边，印着密密的等高线，还有一小段蜿蜒的海岸线——在这片被浓雾封死的世界里，「海」这个字本身就带着一种不真实的意味。角落里有一行铅印的小字，被水渍晕开了一半。
「这个字念什么呀？」她指着那行字问你。`,choices:[{id:`c_0`,text:`念给她听：「月牙湾……沉船……」`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`sea_chart_seen`}],next:`__return__`,result:`「海！」她一下子蹦了起来，「我没见过海！哥哥，海是什么味道的？是不是也像雾一样，咸咸的？」
你说不上来。但你把那张残页小心地抚平、收好——雾里捡到的东西没有一件是白捡的，说不定哪天真用得上。`},{id:`c_1`,text:`把残页夹回课本：「等你认全字，自己念」`,effects:[],next:`__return__`},{id:`c_2`,text:`把残页凑近火光，辨认水渍下晕开的字`,effects:[],next:`__return__`}]},duoduo_s3_letters__sad:{id:`duoduo_s3_letters__sad`,text:`那之后的几天，篱笆外再也没有出现过小小的身影。
石阶空着。窗台的纸青蛙蒙了一层薄灰，你伸手想擦，又缩了回来——擦干净了，像是就把人家给忘了。
频道上那条「谁家走丢的孩子」沉到了信息流的最底端，问号后面跟着的，是九千个人的沉默。这世上大多数告别都是这样的：没有葬礼，没有讣告，只有一个不再更新的头像。`,choices:[{id:`c_0`,text:`在石阶上留一罐水，天天换`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`water_clean`,amount:-1}],next:`__return__`,result:`第一天，水没动。第二天，水没动。第三天，水面漂了一片落叶。
第五天清晨，水罐旁边多了一只新折的纸青蛙。
还是歪歪扭扭的，还是朝着你家门的方向。`},{id:`c_1`,text:`沿篱笆外找一圈，看她脚印的去向`,effects:[],next:`__return__`}]}}},{id:`duoduo_s4_bear`,title:`朵朵 · 四`,desc:``,trigger:{dayMin:6,flags:[`kid_met`],notFlags:[`bear_given`]},initialScene:`duoduo_s4_bear__dream`,scenes:{duoduo_s4_bear__dream:{id:`duoduo_s4_bear__dream`,text:`朵朵今天没笑。
她坐在门槛上晃着两条够不着地的小腿，声音闷闷的：「我梦见妈妈了。梦里她低头看着我，怀里抱着个软软的东西，黄色的，耳朵一边高一边低……我想不起来那是什么了。」
她说想不起来，可她一直搓着手指——拇指反复摩挲着其余四指的指腹，一遍又一遍，好像掌心里还残留着那个触感，只是名字丢了。
末世里的大人丢东西会哭，孩子丢东西，连哭都不知道该朝哪儿哭。`,choices:[{id:`c_0`,text:`把布偶熊送给她`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`bear_given`},{kind:`item`,item:`toy_bear`,amount:-1}],next:`__return__`,requires:{items:{toy_bear:1}},result:`你转身进屋，把那只从废墟货架第二层翻出来的布偶熊递到她面前。
她整个人僵住了。抱着熊愣了足足五秒钟，然后猛地抬起头看你，眼睛亮得像星星全掉了进去：「这是妈妈！我就知道是妈妈！它一直在找我！」
你转过身假装添柴，抹了一把脸。火光真烫啊。`},{id:`c_1`,text:`「我帮你留意，一定给你找一个」`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`bear_promised`}],next:`__return__`,result:`「真的吗？！拉钩！」她伸出小拇指，郑重其事地和你拉了勾，再用两个大拇指盖上印章，「盖了章就不许反悔，骗人的是小狗！」
从此每次探索废墟，你都会下意识地多看一眼货架的第二层——那里总是放玩具。`},{id:`c_2`,text:`哄她：「梦里的东西，去梦里找才找得到」`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`她似懂非懂地点点头，抱住膝盖把脸埋了进去，肩膀塌成了小小的弧形。
有些东西终究要自己去寻，哪怕要穿过一整个梦。这个道理，大人说出来是安慰，孩子听起来，却是任务。`}]},duoduo_s4_bear__hug:{id:`duoduo_s4_bear__hug`,text:`那天傍晚她赖在你家不肯走了，抱着熊坐在火堆边，一样一样地给它介绍这个新家：「这是火堆，晚上要添柴的；这是锅，会做好吃的；这是碗，缺了个口但是好用；这是水，要烧开了才能喝……」
介绍到最后，她卡了一下壳，偷偷看了你一眼，然后理直气壮地补上了：「这是我哥哥。」
熊用那只缺了的扣子眼睛看着她。
你没有纠正她。`,choices:[{id:`c_0`,text:`往锅里多添了一勺水`,effects:[{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`晚饭多做了一份。她吃得肚皮溜圆，抱着熊靠在草垫上，絮絮叨叨给熊讲你的事迹——讲你「一个人打跑了影子」，讲你「认识所有的野果」，越讲越离谱。
讲到一半她自己睡着了，嘴角还挂着一粒米。
火光把一大一小两个影子投在墙上，挨得很近。`},{id:`c_1`,text:`往她碗里也拨了半勺热的`,effects:[],next:`__return__`},{id:`c_2`,text:`郑重其事地给熊也安排岗位：「它管看家」`,effects:[],next:`__return__`}]},duoduo_s4_bear__late:{id:`duoduo_s4_bear__late`,text:`夜里你翻来覆去睡不着，索性爬起来整理白天搜来的物资。木柴码三摞，罐头归一格，药材单独包好——这些动作你已经做过几十个夜晚，熟得不用过脑子。
所以脑子就空出来了。空出来的地方，全是她搓手指的样子。那个想不起来的软软的东西，那个一边高一边低的耳朵。
有些东西丢了，疼的不是丢的人，是记得的人。`,choices:[{id:`c_0`,text:`把这事记在了心里`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`【叮！日记新增一行：欠朵朵一个「软软的东西」】
有些债不是欠别人的，是欠自己良心的。而良心这种东西，末世里比罐头还稀缺，你得省着点用，但绝不能一点都不剩。`},{id:`c_1`,text:`把搜来的半截红毛线单独收进内袋`,effects:[],next:`__return__`}]}}},{id:`duoduo_s5_play`,title:`朵朵 · 五`,desc:``,trigger:{dayMin:7,flags:[`kid_met`],notFlags:[`kid_mistwise`]},initialScene:`duoduo_s5_play__knock`,scenes:{duoduo_s5_play__knock:{id:`duoduo_s5_play__knock`,text:`雨天下午，篱笆上传来咚咚咚的敲门声——不用看也知道是谁，整片雾里只有一个人会用这种理直气壮的节奏敲门，仿佛全世界都欠着她一场捉迷藏。
朵朵站在雨里，半边袖子都湿透了，头发贴在脸侧，还咧着嘴笑：「哥哥！陪我玩捉迷藏嘛！就在你家院子附近，绝不出篱笆！我肯定藏得你可找不到！」
雨丝斜斜地飘。远处林子那头的雾气压得很低，正在慢慢地、慢慢地漫过来。`,choices:[{id:`c_0_0`,text:`陪她玩一局（消耗 1 行动点）`,effects:[],next:`duoduo_s5_play__after`},{id:`c_2_1`,text:`陪她玩一局（消耗 1 行动点）`,effects:[],next:`duoduo_s5_play__after`},{id:`c_2`,text:`塞给她一块饼干，让她雨大就回家`,effects:[{kind:`resource`,resource:`sanity`,delta:1},{kind:`item`,item:`food_biscuit`,amount:-1}],next:`duoduo_s5_play__after`,requires:{items:{food_biscuit:1}},result:`「好吧……」她咬着饼干含糊不清地应了，一步三回头地走进雨幕，走到篱笆口还不死心地扯着嗓子喊，「下次！下次你一定要陪我玩！拉过钩的事不许赖！」
雨一直下到天黑。屋里安静得能听见火堆里柴芯断裂的声音。`},{id:`c_3`,text:`改玩室内捉迷藏，输的人洗碗`,effects:[],next:`__return__`}]},duoduo_s5_play__after:{id:`duoduo_s5_play__after`,text:`晚上她赖着看完你做饭才肯走，理由是「一个人走夜路害怕」，可出门的时候蹦蹦跳跳，比谁都精神。
到了门口她忽然想起什么似的，凑回来，用气声说：「哥哥，告诉你一个秘密哦——雾每天半夜会变薄一点点，就一小会儿。我跟你说过了，你不许告诉别人，这是我们两个人的秘密。」
【叮！获得情报伙伴：朵朵懂得迷雾的习性】——某些关键时刻，她会派上用场。`,choices:[{id:`c_0`,text:`拉钩保密`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`「拉钩上吊，一百年不许变。」
一大一小两根手指在火光里勾在一起。她盖印章的时候盖得格外用力，仿佛这样契约就会永远生效。
那一瞬间你觉得，这个末世好像也没有那么冷。`},{id:`c_1`,text:`把这个秘密写进日记，锁进抽屉`,effects:[],next:`__return__`}]}}},{id:`duoduo_s6_crisis`,title:`朵朵 · 六`,desc:``,trigger:{dayMin:8,flags:[`kid_met`],notFlags:[`kid_saved`,`kid_lost`]},initialScene:`duoduo_s6_crisis__wake`,scenes:{duoduo_s6_crisis__wake:{id:`duoduo_s6_crisis__wake`,text:`凌晨，撕心裂肺的哭喊划破了浓雾。
是朵朵的声音。
从村西的方向传来，一声比一声弱，一声比一声远，像一只看不见的手正在把这个声音从世界上一点点抹掉。你从床上弹起来的时候撞翻了凳子，抓起门边的武器——手在抖，血却一下子全冲上了头顶。
雾里的规矩第一条：天黑别应声。八十亿人用命验证过的铁律。
可这一次，在雾里喊的是她。`,choices:[{id:`c_0`,text:`抄起火把冲进雾里（需要火把 HP≥40）`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`duoduo_s6_crisis__barn`,requires:{items:{tool_torch:1}},result:`火折子抖了三次才点着。火把撕开一条光的通道，雾在光前面退，又在光后面无声地合拢，像一头巨大的、耐心的兽。
你循着哭声狂奔，心跳声盖过了自己的脚步声。村西的路你白天走过无数遍，此刻却陌生得像另一个世界。
【状态：轻伤】`},{id:`c_1_0`,text:`只带柴刀，抄近路穿林子（HP≥60）`,effects:[],next:`duoduo_s6_crisis__barn`},{id:`c_3_1`,text:`只带柴刀，抄近路穿林子（HP≥60）`,effects:[],next:`duoduo_s6_crisis__barn`},{id:`c_3_0`,text:`隔着窗大喊：朝有灯的地方跑！`,effects:[],next:`duoduo_s6_crisis__saved_end`},{id:`c_5_1`,text:`隔着窗大喊：朝有灯的地方跑！`,effects:[],next:`duoduo_s6_crisis__lost_end`},{id:`c_5`,text:`锁死门窗，装作没听见`,effects:[{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`kid_ignored`}],next:`__return__`,result:`你退回到床角，用被子蒙住头。
哭声还在继续，一声，又一声。你开始数数，数到一百的时候哭声弱了，数到五百的时候哭声断了，数到一千的时候，天边泛起了灰白色。
你睁着眼躺到天明，被子里的空气又闷又冷。
【好感度暴跌：朵朵 -40】【状态：恐慌】`}]},duoduo_s6_crisis__barn:{id:`duoduo_s6_crisis__barn`,text:`哭声来自废弃谷仓。
仓门的合页锈死了，门缝里黑得像泼了墨，一股陈年的干草味混着别的什么味道从缝隙里渗出来。里面传来桌倒柜翻的动静，木头碎裂声，还有一个孩子压抑着的、抽抽噎噎的呜咽——她在拼命不让自己哭出声，因为她隐约知道，哭声会招来更可怕的东西。
雾在你身后无声地合拢了。退路，已经看不见了。`,choices:[{id:`c_0_0`,text:`绕去后墙的狗洞，悄声把她引过来`,effects:[],next:`duoduo_s6_crisis__shadow`},{id:`c_2_1`,text:`绕去后墙的狗洞，悄声把她引过来`,effects:[],next:`duoduo_s6_crisis__shadow`},{id:`c_2_0`,text:`一脚踹开正门，光明正大地进去`,effects:[],next:`duoduo_s6_crisis__shadow`},{id:`c_4_1`,text:`一脚踹开正门，光明正大地进去`,effects:[],next:`duoduo_s6_crisis__shadow`},{id:`c_4_0`,text:`学一声夜枭叫——你们约好的暗号`,effects:[],next:`duoduo_s6_crisis__shadow`,requires:{flags:[`dd_signal`]}},{id:`c_6_1`,text:`学一声夜枭叫——你们约好的暗号`,effects:[],next:`duoduo_s6_crisis__shadow`,requires:{flags:[`dd_signal`]}},{id:`c_6_0`,text:`踢翻空油桶，让它滚向村东`,effects:[],next:`duoduo_s6_crisis__shadow`},{id:`c_8_1`,text:`踢翻空油桶，让它滚向村东`,effects:[],next:`duoduo_s6_crisis__shadow`},{id:`c_8`,text:`贴墙屏息，数它的脚步找出规律`,effects:[],next:`__return__`}]},duoduo_s6_crisis__shadow:{id:`duoduo_s6_crisis__shadow`,text:`它在火光照不到的地方站着。
轮廓像人，比例不对——手臂太长，脖颈的角度不对，关节弯曲的方向让眼睛拒绝理解。它歪着头「看」你们，那种姿态不像在打量猎物，倒像在辨认什么，像在回忆自己上一次站在屋顶烟囱下是什么时候。
朵朵的小手死死攥着你的衣角，抖得像风里的叶子，但她咬着嘴唇，一声都不敢哭出来。
它迈出了第一步。地面没有声音，它太轻了。`,choices:[{id:`c_0_0`,text:`举起火把逼它后退`,effects:[],next:`duoduo_s6_crisis__saved_end`,requires:{items:{tool_torch:1}}},{id:`c_2_1`,text:`举起火把逼它后退`,effects:[],next:`duoduo_s6_crisis__saved_end`,requires:{items:{tool_torch:1}}},{id:`c_2_0`,text:`背起她，全速狂奔`,effects:[],next:`duoduo_s6_crisis__saved_end`},{id:`c_4_1`,text:`背起她，全速狂奔`,effects:[],next:`duoduo_s6_crisis__saved_end`},{id:`c_4`,text:`放下她，转身把它引向远处`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`kid_saved`}],next:`duoduo_s6_crisis__saved_end`,result:`「躲进粮柜，听到我的声音再出来。无论听见什么，都不要出来。」
你把她塞进空粮柜，合上柜门之前，看见她拼命点头，眼泪糊了一脸。
然后你转身朝雾的反方向狂奔，用尽全力弄出声响——踢罐头、砸窗户、大喊大叫。它跟上来了。你带着它在雾里兜了一整夜，靠着白天侦察记住的地形甩脱了它。
天亮回到家，双腿抖得像筛糠。粮柜的门开了一条缝，她真的听话地在里面躲了一夜，一声没吭。`},{id:`c_5`,text:`拉她躲进阁楼，捂住嘴憋到天亮（朵朵懂雾的习性）`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`kid_saved`}],next:`duoduo_s6_crisis__saved_end`,requires:{flags:[`kid_mistwise`]},result:`你想起她说的：这些东西靠声音找人。
你拉着她爬上谷仓阁楼，两人挤进草料堆最深处。她立刻明白了你的意思，双手捂住自己的嘴，把哭声咽了回去。
它在下面站了整整一夜。木梯吱呀作响了四次，每一次你们都屏住呼吸。天亮时分，随着雾一起，它退了。
她从头到尾没有发出一点声音。这孩子的镇定救了你们两个人。`},{id:`c_6_0`,text:`数着拍子——第三步它必停顿，就是现在`,effects:[],next:`duoduo_s6_crisis__saved_end`,requires:{flags:[`barn_pattern`]}},{id:`c_8_1`,text:`数着拍子——第三步它必停顿，就是现在`,effects:[],next:`duoduo_s6_crisis__saved_end`,requires:{flags:[`barn_pattern`]}},{id:`c_8`,text:`它的注意力还在村东——低声：走`,effects:[],next:`__return__`,requires:{flags:[`barn_distracted`]}}]},duoduo_s6_crisis__saved_end:{id:`duoduo_s6_crisis__saved_end`,text:`后半夜，火堆烧得旺旺的。
朵朵裹着你唯一的毯子在火边睡着了，睫毛上还挂着没干的泪，一只手抓着你的衣角，睡熟了都没松开——好像松开一点点，梦就会把她送回那个谷仓。
你靠着墙坐着，听着屋外渐弱的雾声，忽然明白了一件事：在这片吞掉了八十亿人的迷雾里，你第一次有了非活下去不可的理由。
理由现在就睡在你的毯子里，呼吸均匀，眉头渐渐舒展。`,choices:[{id:`c_0`,text:`守着她到天亮`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`【叮！朵朵得救了】——从今往后，她会在关键时刻帮助你。而第十五天的结局，或许也会因此不同。
晨光透过雾层渗进来的时候，她在睡梦里轻轻喊了一声「妈妈」，然后翻了个身，把怀里的旧毯子搂得更紧了些。
你往火堆里又添了一根柴。`},{id:`c_1`,text:`把她汗湿的头发拢到耳后，什么都不问`,effects:[],next:`__return__`}]},duoduo_s6_crisis__lost_end:{id:`duoduo_s6_crisis__lost_end`,text:`后来的很多天，你再也没见过她。
石阶上的水罐你换了三天，第四天忘了，第五天想起来的时候，罐子还在原处，水一滴没少。你把那罐水端进屋里，从此再也没有往石阶上放过东西。
世界频道那条「谁家走丢的孩子」，最终沉进了信息流的最底端，无人应答。只有那串停在半路的湿脚印，偶尔会在深夜里从记忆的背面浮上来，一步一步，踩过你的梦境。`,choices:[{id:`c_0`,text:`关掉频道`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`你告诉自己：你已经喊过了。你已经做了能做的。雾那么大，谁也怨不了。
……已经做了能做的。
这句话你在心里重复了很多遍。第一遍像解释，第十遍像谎言。`},{id:`c_1`,text:`把那罐水，倒在她脚印消失的地方`,effects:[],next:`__return__`}]},duoduo_s6_crisis__ignore_end:{id:`duoduo_s6_crisis__ignore_end`,text:`第二天，村西方向飘来的雾比往常浓了一些。
你在院子里劈柴。斧头起落的节奏乱了又乱，有一斧头劈偏了，刃口啃进泥地里，震得虎口发麻。频道里有人聊起昨夜的哭声，猜是猫，猜是风，猜是哪个疯子在装神弄鬼。你划走了那条消息，指尖是僵的。
雾从村西漫过来，漫过篱笆，在你门口停住了，像在等什么人开门。`,choices:[{id:`c_0`,text:`继续劈柴`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`木屑纷飞。每一声斧刃入木的闷响，都像是在替谁回答一个问题。
这个问题你不敢想，也永远绕不开。它只是安静地待在那里，等着某个深夜，等你闭上眼。`},{id:`c_1`,text:`那一斧劈下去，卡在木头里拔不出来`,effects:[],next:`__return__`}]}}},{id:`duoduo_s7_shelter`,title:`朵朵 · 七`,desc:``,trigger:{dayMin:11,flags:[`kid_saved`]},initialScene:`duoduo_s7_shelter__eve`,scenes:{duoduo_s7_shelter__eve:{id:`duoduo_s7_shelter__eve`,text:`频道里关于「兽潮」的讨论越来越密。有人说西边的林子整夜整夜地在移动，有人说溪谷的水连续三天是浑的，还有人只发了一个字：「跑」。然后就再也没上线。
朵朵来的时候没有像往常那样蹦蹦跳跳。她绞着衣角站在门口，声音小得几乎听不见：「哥哥，今晚上……我能睡你家吗？就一晚上。我一个人害怕。」
【预警】兽潮将在两天后过境。`,choices:[{id:`c_0`,text:`让她住进屋里（庇护所 Lv.2 以上）`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`kid_harbored`}],next:`duoduo_s7_shelter__map`,result:`「当然能。」你把最好的位置腾给她——离火堆最近、离门最远的那块地板。
她高兴坏了，转头就跑去把自己那份家当搬了过来：半袋浆果、一只缺口的碗、叠得方方正正的小被子，还有那只一边耳朵高的布偶熊。东西不多，码得整整齐齐，像一座小小的城。
【叮！朵朵入住庇护所】`},{id:`c_1`,text:`把屋后的工具房收拾出来给她住`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`kid_harbored`}],next:`duoduo_s7_shelter__map`,result:`工具房狭小，但胜在结实，门板是整块的厚木。你把门闩拆下来修了两遍，又给她塞了个小火盆。
她趴在门口研究了半天那个新门闩，然后学着你的样子拉开、插上、再拉开——确认自己一个人也能打开之后，才安心地笑了：「这样半夜我要是想尿尿，就不用喊你了。」
……行吧，这确实很重要。`},{id:`c_2`,text:`劝她：「跟着人群去南边更安全」`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`duoduo_s7_shelter__map`,result:`她低下头「嗯」了一声，没有争辩，也没有像平时那样讨价还价。
她转过身走进暮色里，背影小小的，背包一颠一颠的。走出十几步，她停下来回头看了一眼——就一眼——然后接着往前走了。
那晚兽潮的嘶吼声传过来的时候，你盯着天花板，一夜没有合眼。`},{id:`c_3`,text:`把唯一的床让出来，自己抱被子睡灶边`,effects:[],next:`__return__`}]},duoduo_s7_shelter__map:{id:`duoduo_s7_shelter__map`,text:`安顿下来后，她神神秘秘地把门关严实，回头确认了两遍，才从怀里掏出一卷皱巴巴的纸，双手捧着递给你——那架势像在捧传国玉玺。
「哥哥，我在西边的破车里捡到这个！上面的字，我认识好几个！」
那是半张航海图的残页，边缘磨得起了毛，上面印着密密的等高线，还有一段月牙形的海岸线。雾降之后，「海」这个字，本身就是一种传说。`,choices:[{id:`c_0`,text:`让她把认识的字都读出来`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`item`,item:`key_map_fragment`,amount:1}],next:`__return__`,requires:{flags:[`kid_letters`]},result:`「月、牙、湾……还有这个，三点水的，是『海』！老师教过的！」她一个字一个字地指给你看，小手指戳得纸面咚咚响。残页角落那行被水渍晕开的铅印小字，被她逐字拼了出来。
你照着她念的内容比对白天侦察记下的方位——沉船湾的位置，一下子清晰了起来。
【叮！获得线索：地图碎片 ×1】`},{id:`c_1`,text:`让她讲讲这张图是在哪儿捡到的`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`item`,item:`food_raw_meat`,amount:2}],next:`__return__`,requires:{flags:[`kid_snaregirl`]},result:`她把捡到图的方位、周围的大小脚印、当天的风向讲得清清楚楚，连「地上有拖痕，不是人走的，我绕着走的」这种细节都没漏掉。
你顺着她的描述在脑子里把地形走了一遍——顺着她标记的那条有水源的小道走，去南边能省出整整半天的路程，还能顺路下套。
【叮！朵朵标记的安全猎道：生肉 ×2】`},{id:`c_2`,text:`把图收好，先一起吃点东西`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`图纸上的墨迹晕得太厉害，油灯的光又暗，一时半会儿看不出所以然。你把它压平收进枕头底下，先给她热了一碗杂烩。
她捧着碗小口吹气的样子，让你暂时忘掉了外面越来越近的嘶吼声。
有些账，可以明天再算。`}]},duoduo_s7_shelter__watch:{id:`duoduo_s7_shelter__watch`,text:`后半夜，远处的林子里传来了第一声长嚎。
悠长，低沉，尾音打着颤，像是从大地底下渗出来的。她的手一下子抓住你的袖子，指节都发了白。
「哥哥，」她的声音在抖，但每个字都说得很清楚，「等直升飞机来了，你带我一起坐好不好？我很轻的，真的，不占地方的。」
火光在她的眼睛里跳。你在那双一眨不眨的眼睛里，看见了你自己的倒影。`,choices:[{id:`c_0`,text:`「一言为定。带上你那只熊。」`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`「嗯！！」
她重重点头，把手伸了出来。两只手指在火光里勾在一起，盖上大拇指的印章。
那一夜，兽潮的嚎叫声始终没能真正靠近你们的火光。后来你才知道，那一晚整片村子的灯火，只剩下你们这一盏还亮着。`},{id:`c_1`,text:`握住那只发白的小手：「不止直升机，还有明天」`,effects:[],next:`__return__`},{id:`c_2`,text:`搓了一根草绳圈成环，套在她手腕上`,effects:[],next:`__return__`}]},duoduo_s7_shelter__alone:{id:`duoduo_s7_shelter__alone`,text:`兽潮过境的夜里，村西的方向火光冲天。
你缩在门后，数着嘶吼声一波一波地从屋顶碾过去，像黑色的洪水从头顶淌过。不知道第几波的时候，你忽然想起她离开时的背影——也是朝着村西的方向去的，背着那个比她还大的小背包。
第二天清晨，你去了南边的岔路口。路上空空的，只有雾。雾里什么都有，唯独没有人。`,choices:[{id:`c_0`,text:`在岔路口插了一根树枝`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`要是她回来，要是她还认路，一眼就能看见这儿有人等过。
你把树枝插得很深，底下压了石头，风吹不走，野兽碰不倒。
做完这些你站了一会儿，转身回家。雾在你身后把岔路口合拢了。`},{id:`c_1`,text:`把那根树枝削平，刻上两个字：「向东」`,effects:[],next:`__return__`}]}}},{id:`duoduo_s8_dawn`,title:`朵朵 · 八`,desc:``,trigger:{dayMin:14,flags:[`kid_saved`]},initialScene:`duoduo_s8_dawn__crane`,scenes:{duoduo_s8_dawn__crane:{id:`duoduo_s8_dawn__crane`,text:`第十四天的清晨，雾比以往任何一天都薄。薄得能看见远处山脊的轮廓，薄得能听见天上远远滚过的引擎轰鸣——一阵，停一下，又一阵，确凿无疑，像大地的心跳正在恢复。
朵朵天不亮就来了。她献宝似的摊开手掌：一只纸鹤，用的是你写过日记的纸页背面，炭笔字迹透过纸背隐隐透出来，正反两面都是你的日子。
「哥哥你看！我用你教的方法折的！一个角都没折歪！」`,choices:[{id:`c_0`,text:`收下，放进胸口口袋`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`kid_crane`}],next:`__return__`,result:`纸鹤的翅膀上还留着她的炭笔小字，歪歪扭扭的两个字：「平安」。
你把纸鹤放进胸口的口袋，隔着布料按了按。心脏在那个位置跳，一下，一下，很稳。
十五天了。你第一次觉得，活着这件事有了重量——因为有人把它折成了纸鹤，交到你手上。`},{id:`c_1`,text:`「再折一只，凑一对」`,effects:[{kind:`resource`,resource:`sanity`,delta:14},{kind:`flag`,flag:`kid_crane`}],next:`__return__`,result:`你们头碰着头折了整整一个上午。她的手小，折得慢，但每一条折痕都用指甲反复压实。
第二只她坚持要用红色的糖纸——「这只代表我，那只代表你」。两只纸鹤被细绳拴在一处，挂在窗前。风一吹，它们就轻轻碰一下头。
像在说悄悄话。像在说：还在呢，还在呢。`},{id:`c_2`,text:`问她：「纸鹤要飞去哪儿呀」`,effects:[],next:`__return__`}]},duoduo_s8_dawn__oath:{id:`duoduo_s8_dawn__oath`,text:`轰鸣声越来越近了。
她把自己的小背包拖出来摆在脚边，里面装得满满当当：半袋浆果、那只缺口的碗、叠得方方正正的小被子、一边耳朵高的布偶熊——如果当初你教过她识字的话，还有那张她已经能读出名字的海图。每一样都码得整整齐齐，随时可以拎起来就走。
「我都收拾好啦，」她仰起脸看你，眼睛亮晶晶的，「随时可以出发！」
【叮！距离救援编队过境还有 1 天】`,choices:[{id:`c_0`,text:`握住她的手：一起等到那一天`,effects:[{kind:`resource`,resource:`sanity`,delta:10}],next:`__return__`,result:`小小的手心全是汗，但抓得特别紧，像是要把你手掌上的纹路都记下来。
雾散开的这一角天空下，一堆篝火，两个人，等着同一阵风。
十五天前的你不会相信——有些家，不是等来的，是两个人一起守出来的。`},{id:`c_1`,text:`翻开她的小背包，把水壶灌满塞在最上层`,effects:[],next:`__return__`,requires:{items:{water_clean:1}}}]}}},{id:`laok_s1_pact`,title:`老K · 一`,desc:``,trigger:{},initialScene:`laok_s1_pact__pact`,scenes:{laok_s1_pact__pact:{id:`laok_s1_pact__pact`,text:`当夜，老K把火堆拨到最旺，在你对面盘腿坐下。三样东西一字排开：一把磨得发亮的柴刀，一卷鱼线，半块没用过的肥皂——都是他全部家当里最像样的三样。
「搭伙可以，先说好三条。」他竖起手指，一根一根扳，「一，天黑不进雾；二，水必烧开；三，我的过去你别打听，想说我自然会说。」
窗外雾气翻涌，屋里火光稳定。他等着，像在等一个签约的仪式。你知道这三条背后，每一句都写着死过人的教训。`,choices:[{id:`c_0`,text:`「三条都记下了。睡吧。」`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`laok_s1_pact__fire`,result:`他盯着你看了两秒，点点头，把柴刀挪到自己那一侧——这是把你当自己人的放法。
那一夜你睡得出奇地沉。屋里多了一个人呼吸的声音，风声好像都被压小了。
【叮！好感度提升：老K +5】`},{id:`c_1_0`,text:`「凭什么听你的？」`,effects:[],next:`laok_s1_pact__fire`},{id:`c_3_1`,text:`「凭什么听你的？」`,effects:[],next:`laok_s1_pact__fire`},{id:`c_3`,text:`逐条追问：每条规矩，背后是什么事`,effects:[],next:`laok_s1_pact__fire`},{id:`c_4`,text:`加第四条：「谁病了，另一个管到底」`,effects:[],next:`laok_s1_pact__fire`},{id:`c_5`,text:`伸出三根手指逐一碰回去，像击掌那样`,effects:[],next:`__return__`}]},laok_s1_pact__fire:{id:`laok_s1_pact__fire`,text:`后半夜他被噩梦惊醒过一次，手按在刀柄上坐了很久，呼吸缓了半天才平下来。见你也醒着，他自嘲地笑笑：「习惯了。以前带队，睡前得把明天的路在心里走一遍，哪段有落石，哪里能扎营，全过一遍才睡得着。」
他顿了顿，声音低下去：「要是……我是说要是有雾散的那天。」话没说完，他自己先摆了摆手，「算了，睡觉。明天还要早起。」
黑暗里，你听见他翻身的声音，很久才停。`,choices:[{id:`c_0`,text:`「雾散了，你第一件事做什么？」`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`他沉默了很久，久到你以为他睡着了。
「给我闺女打个电话。」他背对着你说，「就说爸不是故意的。」
火堆里一根柴烧断了，火星腾起来又灭掉。`},{id:`c_1`,text:`默默把水袋递过去`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`他在黑暗里接了，喝了一大口，喉咙滚动了两下。「谢了。」
有些问题不用问出口。递过去的水，和递过去的道理是一样的。`},{id:`c_2`,text:`装睡，把翻身的动静留给他体面`,effects:[],next:`__return__`}]},laok_s1_pact__dawn:{id:`laok_s1_pact__dawn`,text:`清晨你醒来时，他已经劈好了一垛柴，码得棱角分明像用尺子量过。他正蹲在门口研究你的陷阱绳结，眉头拧着：「你这结打得不对，兔子一挣就脱，等于白送。」
他三两下重打了一个，绳子在他手里听话得像有生命。「跟我学，这叫活扣，山里的老猎人传下来的，传到我这是第四代。」
【叮！获得同伴：老K】——白天行动区新增「♟ 下棋」「派老K外出」，每晚他会自动吃一份食物。`,choices:[{id:`c_0`,text:`跟他学那个活扣`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`你的手指笨得像五根胡萝卜，学了七遍才打出来。他难得地笑出了声，笑完又板起脸：「行，孺子可教。明天教你下套。」
绳子在他手里听话得像有生命。你忽然意识到：这个雾里的世界，终于有了一个「我们」。`},{id:`c_1`,text:`把自己打的绳结全拆掉，让他重教一遍`,effects:[],next:`__return__`}]}}},{id:`laok_s2_gift`,title:`老K · 二`,desc:``,trigger:{dayMin:4,flags:[`laok_ally`],notFlags:[`laok_betrayed`,`laok_trust`]},initialScene:`laok_s2_gift__wrap`,scenes:{laok_s2_gift__wrap:{id:`laok_s2_gift__wrap`,text:`清晨醒来，门口放着一个巴掌大的小布包，布角打着标准的军用结——那种一拉就开、越挣越紧的专业打法。
老K在院子里劈柴，斧头起落的节奏刻意弄得很响，头也不回：「拿着吧。绷带、消炎药、还有一瓶净水。我以前干野外向导的，这点东西够你应急。」
他说得云淡风轻。可你知道，那瓶净水是市面上早就绝迹的东西，他一定藏了很久，藏得比自己用的那份还仔细。`,choices:[{id:`c_0`,text:`收下并郑重道谢`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`laok_trust`},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_antibiotic`,amount:1},{kind:`item`,item:`water_clean`,amount:1}],next:`laok_s2_gift__guide`,result:`你解开军用结——手法很讲究，一看就是救过命的包法。绷带卷得整整齐齐，抗生素的铝箔板用油纸包了两层防潮。
这个满脸胡茬的男人，比看起来可靠得多。
【叮！获得物资；老K对你的信任 +1 级】`},{id:`c_1_0`,text:`原样塞回他怀里：「留着，你比我更需要」`,effects:[],next:`laok_s2_gift__guide`},{id:`c_3_1`,text:`原样塞回他怀里：「留着，你比我更需要」`,effects:[],next:`laok_s2_gift__guide`},{id:`c_3`,text:`用两块布料换（不白拿他的东西）`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`laok_trust`},{kind:`item`,item:`mat_cloth`,amount:-2},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_antibiotic`,amount:1}],next:`__return__`,requires:{items:{mat_cloth:2}},result:`你把两块布塞进他手里：「等价交换，谁也不欠谁。」
他低头看了看布，忽然笑了：「行啊，还学会跟商人谈生意了。成交。」
这一次，两人都收得心安理得。`}]},laok_s2_gift__guide:{id:`laok_s2_gift__guide`,text:`收了东西的当天下午，他就拉着你「上课」，教得毫无保留：怎么从雾的走向辨明日风向，怎么用三根木棍搭一个把雨水引进锅里的导向槽，怎么把背包带打成能单手解开的活结。
「这些玩意儿平时看着没用，」他用指节敲敲你的脑门，「但救命的时候，一次就够。我这条命，就是被这些『没用』的东西救回来的。」`,choices:[{id:`c_0`,text:`认认真真学完全部三样`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`雨水导向槽你搭歪了两次，第三次终于让水流进了锅里。老K抱着膀子看了半天，点了根不知道从哪摸出来的烟：「行。照这么学下去，你小子能活得比我久。」
黄昏的光穿过薄雾，落在那缕青烟上。`},{id:`c_1`,text:`边学边夸：「你这十年队没白带」`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`「少来这套。」他嘴上嫌弃，手里的演示却越来越起劲，连压箱底的「狼烟求救码」都掏出来教了你。
男人这种生物，吃软不吃硬，尤其吃这一套。`},{id:`c_2`,text:`掏出本子，把三样技巧连图带注记下来`,effects:[],next:`__return__`}]},laok_s2_gift__tip:{id:`laok_s2_gift__tip`,text:`晚上熄火前，他往火堆上撒了一把湿草，青烟腾起，他盯着烟的方向看了足足十秒。
「记住，」他说，「烟直走，明天晴；烟趴地，雾要涨；烟打转——」他停了一下，声音沉了沉，「别出门。打转的烟底下，走出来的东西不一定还是人。」
四句口诀，前两句关于天气，后两句关于保命。你把它们记在了心里最重要的位置。`,choices:[{id:`c_0`,text:`记下这四句口诀`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`【叮！获得生存知识：观烟辨天】
从今往后，每天清晨抬头看看烟，成了你们的默契。像一句只有两个人懂的暗号。`},{id:`c_1`,text:`问他：「烟打转的时候，该往哪儿跑」`,effects:[],next:`__return__`},{id:`c_2`,text:`抓一把湿草，学着他的样子撒上去`,effects:[],next:`__return__`}]}}},{id:`laok_s3_photo`,title:`老K · 三`,desc:``,trigger:{dayMin:5,notFlags:[`laok_photo_done`]},initialScene:`laok_s3_photo__glance`,scenes:{laok_s3_photo__glance:{id:`laok_s3_photo__glance`,text:`晚饭后你整理杂物，一张旧照片从本子里滑出来，飘落在地。老K的目光扫过来，突然僵住了——擦刀的手停在半空，刀刃上的油都顾不上擦。
「这照片……」他的声音有点哑，「你从哪儿弄来的？」
照片背面朝上，隐约透出一行褪色的钢笔字。他的喉结上下滚了两下，那双见惯了生死的眼里，翻起了一点不该有的东西。`,choices:[{id:`c_0_0`,text:`如实相告，反问照片背后的故事`,effects:[],next:`rescue_s5_split__split`},{id:`c_2_1`,text:`如实相告，反问照片背后的故事`,effects:[],next:`rescue_s5_split__split`},{id:`c_2`,text:`打趣他：「咋，你失散的兄弟？」`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`rescue_s5_split__split`,result:`他愣了一秒，然后「呸」了一声笑骂：「滚！我兄弟长得比我俊多了！」
骂完他把自己的口粮分了你一半，动作粗鲁，理由敷衍：「看你瘦的，丢我的人。」
眼角的湿意被他用大笑盖了过去。`},{id:`c_3`,text:`把照片翻过去，只让他看背面那行字`,effects:[],next:`__return__`}]},laok_s3_photo__split:{id:`laok_s3_photo__split`,text:`第二天清晨，你发现桌上摆着两份早餐——他用仅剩的面粉烙了两张饼，一边一张，摆得对称极了，连饼上的焦花都差不多。
「吃。」他坐在对面啃着自己那张，含糊不清地说，「从今天起，粮食对半分。谁也别饿着，谁也别多占。」
这是他定的第四条规矩。前三条保命，这一条，像是想把「家」这个字重新拼起来。`,choices:[{id:`c_0`,text:`把自己那张掰一半推回去`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`「规矩是你定的，」你把饼推过去，「但饭是大家一起吃的。我今天胃口小。」
他瞪着你瞪了半天，最后把那半块饼撕成两份，一份又塞回你手里。两个固执的人，一顿早饭吃了半小时。`},{id:`c_1`,text:`收下，认真吃完`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`你吃得干干净净，连渣都拍起来吃了。他看着你的吃相满意地点点头：「这就对了。浪费粮食的，山里有的是教训。」
两张饼，两个人，一顿像样的早饭。末世里的奢侈，不过如此。`},{id:`c_2`,text:`把饼对半掰开，两块半换着吃`,effects:[],next:`__return__`}]},laok_s3_photo__names:{id:`laok_s3_photo__names`,text:`那天下午，他把照片翻过来倒过去看了好几遍，忽然没头没脑地问：「你家呢？雾来之前，家里还有什么人？」
这是他第一次主动问起你的事。火堆上的水壶咕嘟咕嘟地响，蒸汽把两个人的轮廓都熏得模糊了。窗外的雾白得没有边界，屋里的这一点烟火气，显得格外不真实。`,choices:[{id:`c_0`,text:`讲给他们听——每一个人的名字`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`laok_s3_photo__watch`,result:`你讲了很久。讲到后来嗓子有点哑，他就默默往你手里塞了个烤热的面饼。
「记下了。」他拍拍自己的脑袋，「我记性好。你家里人，从今往后也算我半个熟人。」
在这片吞掉名字的雾里，多一个人记住你的来处，就多一分走不丢的底气。`},{id:`c_1`,text:`只说了四个字：「都在等你」`,effects:[],next:`laok_s3_photo__watch`},{id:`c_2`,text:`讲完后轻声问：「你弟弟……叫什么？」`,effects:[],next:`__return__`}]},laok_s3_photo__watch:{id:`laok_s3_photo__watch`,text:`入夜前，他捡了两块石子在桌上摆开：「以后夜里轮着守。你上半夜，我下半夜，换班喊一声。守夜的别贪睡，睡觉的不许装醒——两条都得守，守夜是保命，睡觉也是保命。」
他把其中一块石子推给你。一块被磨得光滑的灰石头，边角圆润，不知在他口袋里躺了多少年。
「这算什么？」
「信物。」他说得一本正经，「拿着它站岗的，才算这个家的哨兵。」`,choices:[{id:`c_0`,text:`收下石子，敬了个不伦不类的礼`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`laok_photo_done`}],next:`__return__`,result:`他绷着脸憋笑，最后还是没憋住，笑声撞在屋顶上弹回来。
【叮！守夜同盟成立】——从此你们的夜晚有了秩序：一半属于你的警觉，一半属于他的鼾声。`},{id:`c_1`,text:`把石子揣进贴胸的口袋`,effects:[],next:`__return__`}]}}},{id:`laok_s4_past`,title:`老K · 四`,desc:``,trigger:{dayMin:7,flags:[`laok_ally`,`laok_trust`],notFlags:[`laok_deep`]},initialScene:`laok_s4_past__ember`,scenes:{laok_s4_past__ember:{id:`laok_s4_past__ember`,text:`晚饭后，老K摩挲着一张皱巴巴的画——蜡笔涂的，三个歪歪扭扭的小人手拉着手，太阳画在左上角，比房子还大。
「我闺女画的。」他的声音很轻，「今年该上初中了。穿越那天她在外婆家……我这辈子最后悔的，就是那天没去接她放学。」
火光在他脸上跳动，把那些沟壑照得忽深忽浅。他破天荒地开了口，像是把心口的石头一块块往外搬。`,choices:[{id:`c_0`,text:`「雾散了就去接她。我陪你走一趟。」`,effects:[{kind:`resource`,resource:`sanity`,delta:14}],next:`laok_s4_past__lesson`,result:`老K愣了很久很久，突然笑了——眼睛亮得像换了一个人：「对，雾散了就去接她！到时候你得来喝满月酒——不对，升学酒！」
那一晚你们聊到很晚。聊她小时候怕打雷，聊她考砸了藏卷子的地方。你多了一个战友，他多了一个证人——证明他不是孤身一人。`},{id:`c_1`,text:`安静地陪他坐一会儿`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`laok_s4_past__lesson`,result:`有些话不需要回应。你只是往火堆里添了一根柴，让火烧得更稳一些。
他看着火，你看着他。两个人的影子在墙上靠得很近，中间隔着的那点距离，叫作体面。`},{id:`c_2`,text:`接过画，仔细抚平折角再递还给他`,effects:[],next:`laok_s4_past__lesson`},{id:`c_3`,text:`往火里添了根柴，让火烧得更稳些`,effects:[],next:`__return__`}]},laok_s4_past__lesson:{id:`laok_s4_past__lesson`,text:`「睡不着就出来。」半夜，他忽然敲门，把你拽到院子里。
今晚的雾薄得罕见，头顶竟有几颗星子透了下来，微弱，但确凿。他仰着头，用下巴指了指天上：「看见那个勺子形状的没有？北斗。勺口两颗星连线，往外延长五倍，亮的那颗就是北极星。找到它，就找到了北。」
他的声音在夜里格外沉稳：「向导的第一课：迷路不可怕，可怕的是忘了抬头。」`,choices:[{id:`c_0`,text:`顺着他的手臂找那颗星`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`star_wise`}],next:`__return__`,result:`你顺着他粗糙的手指望上去——找到了。北极星很小，很静，挂在那里千万年不动。
「记住了？」
「记住了。」
「那就行。」他拍拍你的肩，「以后不管谁走散了，往北走，就能走回这儿。」
这儿。他说这个词的时候，指的是你的木屋。`},{id:`c_1`,text:`指着另一颗星问：「那颗呢？也叫得出吗」`,effects:[],next:`__return__`},{id:`c_2`,text:`借着星光，把北斗的形状描进本子里`,effects:[],next:`__return__`}]},laok_s4_past__promise:{id:`laok_s4_past__promise`,text:`临睡前，他又补了一句，语气轻描淡写，内容却重若千钧：「到时候你得来喝满月酒——不对，升学酒。我闺女学习好，老师说她肯定能考上高中。」
他望着熄灭的火堆，补上了后半句：「你要不来，酒就不开坛。」
一个在末世里许诺未来的男人，比任何口号都有力量。`,choices:[{id:`c_0`,text:`「一言为定。礼金我先记账上。」`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`laok_deep`}],next:`__return__`,result:`他哈哈大笑，笑声惊得墙外的什么东西窸窣逃窜。
【叮！解锁剧情线：老K的身世与约定】——他开始把更重要的东西托付给你了。`},{id:`c_1`,text:`认真地问：「闺女叫什么名字」`,effects:[],next:`__return__`}]}}},{id:`laok_s5_patrol`,title:`老K · 五`,desc:``,trigger:{dayMin:8},initialScene:`laok_s5_patrol__offer`,scenes:{laok_s5_patrol__offer:{id:`laok_s5_patrol__offer`,text:`清晨，老K把背包甩上肩，动作利落得不像个中年人：「今天我出去转一圈。东边超市的货架第二层可能还有漏网之鱼，西边溪谷的水位我三天没看了，心里没底。」
他活动着手腕关节，噼啪作响，眼神是猎人的那种平静锐利。「你在家里看着火，别乱跑。放心，我死不了——答应过闺女的酒还没喝呢，阎王爷不敢收。」
白天行动区的「派老K外出」，从此有了更重的分量。`,choices:[{id:`c_0_0`,text:`「带上哨子，天黑前必须回来」`,effects:[],next:`laok_s5_patrol__debrief`},{id:`c_2_1`,text:`「带上哨子，天黑前必须回来」`,effects:[],next:`laok_s5_patrol__debrief`},{id:`c_2`,text:`「今天雾太毒，谁都别动」`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`laok_s5_patrol__debrief`,result:`他探头看了看天，点头：「听你的。雾趴着走的时候，山里的老手都得掂量。」
那一天你们哪儿也没去。他修好了吱呀作响的门轴，你补了屋顶的漏洞。傍晚时分，远处传来一声若有若无的嚎叫——你们对视一眼，都从对方眼里看到了庆幸。`},{id:`c_3`,text:`把你的火把塞进他背包侧袋`,effects:[],next:`__return__`,requires:{items:{tool_torch:1}}}]},laok_s5_patrol__debrief:{id:`laok_s5_patrol__debrief`,text:`晚上，他就着火光用炭条在一块木板背面画地图——哪里的水位变了，哪里的泥地上出现了不属于野兽的爪印，哪条路的雾「闻起来不对」。
「记下来。」他把木板推到你面前，指尖点着其中三处，「我一个人看得再多，也是一双眼睛。你加上我，是两双。两双眼睛看到的世界，比一双完整得多。」
【叮！联合侦察：雾压 -3】`,choices:[{id:`c_0`,text:`把情报誊抄进自己的日记`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`两双眼睛看到的世界，果然比一双完整得多。
你忽然明白了他为什么非要出门：他不是在搜刮物资，他是在替你们两个人，把这个世界的底细一点点摸清。`},{id:`c_1`,text:`在木板地图上补上你见过的那道车辙`,effects:[],next:`__return__`,requires:{flags:[`scout_spotted`]}},{id:`c_2`,text:`把爪印的位置用炭条圈了个圈`,effects:[],next:`__return__`}]}}},{id:`laok_s6_secret`,title:`老K · 六`,desc:``,trigger:{dayMin:10,flags:[`laok_trust`],notFlags:[`laok_secret_done`]},initialScene:`laok_s6_secret__key`,scenes:{laok_s6_secret__key:{id:`laok_s6_secret__key`,text:`老K把你叫到屋后，左右看了看——确认连风都没有偷听的方向——才从贴身的口袋里摸出一把黄铜钥匙，塞进你手心。钥匙冰凉，却又带着一点体温，是他焐了一路的温度。
「矿洞，工具房，第三排。」他的眼神是你从未见过的凝重，像两口深不见底的井，「里面有我留的东西……如果我没能自己回去取的话。」
他没解释「没能」是什么意思。有些词，说出来就不吉利了；有些嘱托，托付出去就再也收不回。`,choices:[{id:`c_0`,text:`「我现在就去取回来」（HP≥50）`,effects:[],next:`__return__`,result:`他抓了一下你的手腕，力道很大：「路上小心。矿洞的支撑木朽了好几根，别在下面逗留。」
你点头，把钥匙攥紧，出发。`},{id:`c_1`,text:`把钥匙推回去：「你自己去，我在外面接应」`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`laok_bond`},{kind:`flag`,flag:`laok_secret_done`},{kind:`item`,item:`med_bandage`,amount:1}],next:`__return__`,result:`他愣住了，捏着钥匙看了很久很久，像是在看一件失而复得的东西。
「……好。」他重重点头，把钥匙重新收好，声音有点哑，「当晚我就去。这条命，往后跟你混了。」
【叮！好感度大幅提升：老K +25】`},{id:`c_2`,text:`问：「如果我回不来呢？」`,effects:[],next:`__return__`},{id:`c_3`,text:`把钥匙在掌心焐热了才还给他看：「记下了」`,effects:[],next:`__return__`}]},laok_s6_secret__trek:{id:`laok_s6_secret__trek`,text:`矿洞在半山腰，两条路可选：大路平缓开阔，但整个人暴露在雾里；排水沟又低又黑，贴着岩壁钻过去，隐蔽却难走，据说沟里有蛇。
洞口的支撑木上，你认出了一个记号——一个缩小的绳结刻痕，活扣的打法。是老K的手笔。他早就把退路和记号都安排好了，只等有一天，有人替他走进去。`,choices:[{id:`c_0_0`,text:`走大路，稳扎稳打`,effects:[],next:`laok_s6_secret__room`},{id:`c_2_1`,text:`走大路，稳扎稳打`,effects:[],next:`laok_s6_secret__room`},{id:`c_2`,text:`走排水沟，举火把贴壁疾行（需要火把）`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1}],next:`laok_s6_secret__room`,requires:{items:{tool_torch:1}},result:`火光贴着湿滑的沟壁前进，头顶是废弃的运矿轨道，锈迹斑斑。你按他说的数着步子走——两百一十七步，正好是沟渠尽头。
洞口的记号出现在眼前时，你长出了一口气。顺便在沟底捡了一截废铁。`},{id:`c_3`,text:`进洞前，在支撑木上补刻一个活扣记号`,effects:[],next:`__return__`}]},laok_s6_secret__room:{id:`laok_s6_secret__room`,text:`工具房的锁很涩，钥匙捅进去转了三次才咔哒一声弹开，声音在空旷的矿洞里荡出回音。
手电扫过去：铁架、油桶、蒙尘的工作台，一切都覆着厚厚的灰——以及角落里一只用防水布裹了三层的箱子。箱子上压着一块石头，石头下面压着一张字条，只有三个字：
「弟，勿念。」
字条上的称呼，不是写给你的。`,choices:[{id:`c_0_0`,text:`打开箱子`,effects:[],next:`laok_s6_secret__letter`},{id:`c_2_1`,text:`打开箱子`,effects:[],next:`laok_s6_secret__quiet_end`},{id:`c_2`,text:`合掌默立三秒，再动手开箱`,effects:[],next:`laok_s6_secret__letter`},{id:`c_3`,text:`先查看箱子四周有没有布设机关`,effects:[],next:`__return__`}]},laok_s6_secret__letter:{id:`laok_s6_secret__letter`,text:`回程的路上你一直在想那封信。想他写到「拉你一把」的时候，握笔的手会不会也在抖；想那个水渍糊住的地方，到底是雨水还是别的什么。
到家时老K迎上来，嘴唇动了动，终究没敢问。你把药箱递给他，然后把看到的一切原原本本告诉了他。
他背过身去，肩膀抖了很久。再转回来时眼眶通红，却笑了：「谢谢你，替我看了一眼。」`,choices:[{id:`c_0`,text:`「下次一起去。信，当面念给他听。」`,effects:[{kind:`resource`,resource:`sanity`,delta:10}],next:`__return__`,result:`他用力点头，用力到整个上半身都在晃。
那天晚上他破例喝了自己存着的半瓶药酒，絮絮叨叨讲了很多弟弟的事——讲到最后，说的是：「雾散了，先去找他。找得到找不得到的，都去。」
【叮！老K与你结为生死之交】`},{id:`c_1`,text:`把信按原折痕放回去：有些话该他自己读`,effects:[],next:`__return__`},{id:`c_2`,text:`替他读出声——只读到抬头两个字就停下`,effects:[],next:`__return__`}]},laok_s6_secret__quiet_end:{id:`laok_s6_secret__quiet_end`,text:`回到家，你对他说一切安好，东西都在，只是太重没拿回来。
他盯着你看了很久很久——久到墙上的影子都换了角度，久到你几乎要绷不住。然后他没有戳穿，只是点点头：「辛苦。」两个字，千钧重。
有些谎话说出口，是因为真话太锋利。他知道你撒谎的理由，就像你知道他拜托你的理由一样——都是为了让对方，还能背着包袱往前走。`,choices:[{id:`c_0`,text:`把这件事埋进肚子里`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`那一夜你听见他在院子里坐到很晚。
第二天清晨，他在你门口放了那把黄铜钥匙——现在它属于你了。连同它背后的所有秘密一起。`},{id:`c_1`,text:`夜里把工具房钥匙擦亮，挂上门后的钉子`,effects:[],next:`__return__`}]},laok_s6_secret__trust_end:{id:`laok_s6_secret__trust_end`,text:`当晚他独自出了门。你按约定在村口的高地上举着火把接应——火光是他的路标，也是约定的信号：平安就三短一长，出事就不停地摇。
后半夜，哨音由远及近。三短，一长。
他回来了，脚步很轻，肩上的袋子却很沉。「拿到了。」他对你说，也像是对自己说，「该拿的，都拿到了。」`,choices:[{id:`c_0`,text:`接过袋子，什么都不问`,effects:[{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`袋子里有药，有一封封着口的信，还有一小瓶他家乡的土——不知道什么时候备下的。
他没解释，你没问。信任这个东西，一半是交出去，另一半是不追问。
【叮！老K与你结为生死之交】`},{id:`c_1`,text:`烧一锅热水，等他回来烫脚`,effects:[],next:`__return__`}]}}},{id:`laok_s7_plan`,title:`老K · 七`,desc:``,trigger:{dayMin:11,flags:[`laok_ally`,`laok_deep`],notFlags:[`laok_plan_done`]},initialScene:`laok_s7_plan__proposal`,scenes:{laok_s7_plan__proposal:{id:`laok_s7_plan__proposal`,text:`「听我说。」老K摊开一张皱巴巴的手绘地图，上面用炭条标满了大小记号，密密麻麻像星图。「第十三天，兽潮。它们循着气味走河谷，硬拼是下策中的下策。」
他的手指划过一条蜿蜒的线：「旧河道绕高地，居高临下，它们的冲锋队形会散。但得提前两天备木栅栏，一天设伏、一天加固——」他抬眼看你，目光灼灼，「信我一次？」
【预警】兽潮将在两天后过境。`,choices:[{id:`c_0_0`,text:`「全听你的。人手物料你调。」`,effects:[],next:`rescue_s7_eve__eve`},{id:`c_2_1`,text:`「全听你的。人手物料你调。」`,effects:[],next:`rescue_s7_eve__eve`},{id:`c_2`,text:`「按我的法子来，加固门窗就行」`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`rescue_s7_eve__eve`,result:`老K没争辩，只是默默收起了地图。那晚之后他话少了很多。
也许向导也有向导的骄傲——他把命押在专业上的骄傲。你选择了另一条路，就得独自面对它的重量。`},{id:`c_3`,text:`指着高地缺口问：「第一波冲这里怎么办」`,effects:[],next:`__return__`}]},laok_s7_plan__eve:{id:`laok_s7_plan__eve`,text:`两天时间，你们把院子改造成了一个小小的堡垒：三层交叉的木栅栏、削尖的斜置拒马、灌了沙的陶罐压在冲锋的必经路口。
干活间隙，老K不知疲倦，嘴里哼着一支不成调的歌。你问他唱的什么，他手上不停：「山里人开工都唱歌。唱了，山神爷就知道咱们是正经干活，不是来捣乱的——再说，」他咧嘴一笑，「哼着歌干活，不觉得累。」
【叮！防御工事完工】`,choices:[{id:`c_0`,text:`跟着他一起哼`,effects:[{kind:`resource`,resource:`sanity`,delta:6}],next:`laok_s7_plan__night`,result:`两个大男人，一边钉栅栏一边哼着跑调的山歌，惊飞了篱笆上的两只乌鸦。
荒唐吗？有一点。安心吗？非常。`},{id:`c_1`,text:`往陶罐的沙里掺石灰粉`,effects:[],next:`__return__`}]},laok_s7_plan__night:{id:`laok_s7_plan__night`,text:`第十三夜，兽潮如期而至。
大地先是低频地震颤，碗里的水纹丝成圈；然后是黑压压的洪流从河谷方向涌来——它们真的循着河道来了，一头撞在栅栏阵上，锋线散乱。你和老K背靠背站在高地缺口处，火把、柴刀、削尖的拒马各司其职，配合得像演练过一百遍。
嘶吼声中，他忽然冲你咧嘴一笑。你居然也笑了。`,choices:[{id:`c_0`,text:`守住缺口，撑到天亮`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`laok_plan_done`}],next:`__return__`,result:`东方泛白时，兽潮退了，像一场黑色的洪水撤出了河道。
栅栏上全是撞击的痕迹，但它们都扛住了。你们瘫坐在地上，相视大笑，笑得直不起腰——专业的事交给专业的人，再加上一个信他的你，这就是全部的秘诀。
【叮！计划圆满成功】`},{id:`c_1`,text:`背靠背时数他的呼吸给自己定拍`,effects:[],next:`__return__`},{id:`c_2_0`,text:`朝着兽群吼一嗓子，替自己壮胆`,effects:[],next:`__return__`},{id:`c_4_1`,text:`朝着兽群吼一嗓子，替自己壮胆`,effects:[],next:`__return__`}]},laok_s7_plan__stubborn:{id:`laok_s7_plan__stubborn`,text:`兽潮之夜，你把自己焊在门后：门闩顶死、桌椅堆门、柴刀在手，呼吸压到最轻。
外面的世界天崩地裂，撞击声、嘶吼声、木头断裂声混成一片。而走廊尽头，老K默默守着后窗——他没有走，也没有多话，只是提前把你的斧头磨利了，放在你伸手可得的地方。
各守各的位置。这也是一种并肩。`,choices:[{id:`c_0`,text:`握紧柴刀，熬到天亮`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`laok_plan_done`}],next:`__return__`,result:`门闩顶住了。院墙被撞裂了一角，但屋子保住了，人也都在。
清晨清点，老K看着墙上那道裂缝说：「下次，听听专业人士的？」
你喘着气回嘴：「下次再说。」他哼了一声，嘴角却翘了起来。`},{id:`c_1`,text:`给斧头柄缠上一圈防滑布条`,effects:[],next:`__return__`,requires:{items:{mat_cloth:1}}},{id:`c_2`,text:`在心里默数呼吸，从一数到一千`,effects:[],next:`__return__`}]}}},{id:`laok_s8_oath`,title:`老K · 八`,desc:``,trigger:{dayMin:13},initialScene:`laok_s8_oath__repair`,scenes:{laok_s8_oath__repair:{id:`laok_s8_oath__repair`,text:`兽潮过境的第一个清晨，你们合力修缮栅栏。阳光难得地穿透雾层，照得汗珠一闪一闪，锯末的气味混着晨雾的湿冷，竟有种踏实的生活气息。
「一根、两根、三根……」老K一边钉钉子一边数着什么。你问他数什么，他头也不抬：「数咱们还剩多少钉子。数完了物资，」他抬眼看看渐渐变薄的雾，「就该数日子了。救援队快到了吧？」
【叮！距离救援编队过境还有不到 2 天】`,choices:[{id:`c_0`,text:`递给他水壶，让他歇口气`,effects:[],next:`laok_s8_oath__compass`,result:`他咕咚咕咚灌了大半壶，用手背抹嘴：「行了，缓过来了。接着干——干完这票，咱们的窝就算齐活了。」
他说「咱们的窝」的时候，语气自然得就像说「今天的天气」。`},{id:`c_1`,text:`把最后一把完好的钉子留给他收着`,effects:[],next:`laok_s8_oath__compass`},{id:`c_2`,text:`提议把缺口栅栏改成可拆卸的活扣结构`,effects:[],next:`__return__`}]},laok_s8_oath__compass:{id:`laok_s8_oath__compass`,text:`傍晚收工，他忽然把一个东西按进你掌心：一只黄铜指南针，盖面被摩挲得发亮，边缘有一道深深的砍痕——那是某个故事留下的伤疤。
「我认路靠脑子就够了，这玩意儿留给你。」他不容拒绝地合拢你的手指，「当年在山里，它替我挡过一刀。刀是冲我心口来的。」
指针在夕阳下微微颤动，最后稳稳指向北方——像一句无声的承诺：路，永远有方向。`,choices:[{id:`c_0`,text:`郑重收下，贴身放好`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`laok_compass`}],next:`__return__`,result:`【叮！获得信物：老K的黄铜指南针】
这不是一件装备，这是一段命的托付。从今天起，你的口袋里除了纸鹤和石子，又多了一份重量——活着走出去的重量。`},{id:`c_1`,text:`问他砍痕的来历`,effects:[],next:`__return__`}]},laok_s8_oath__school:{id:`laok_s8_oath__school`,text:`夜里最后一班岗，他难得主动开了腔，眼睛望着火堆：「雾散之后，我先去闺女学校门口等着。她放学要是看不见我，该着急了。」
他顿了顿，转头看你：「你呢？雾散了你干什么去？」
这个问题他在心里显然盘算了一整天。火堆噼啪响了一声，火星升起来，像在替你计时。`,choices:[{id:`c_0`,text:`「送你们父女俩回家」`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`laok_s8_oath__oath`,result:`他怔了一下，随即重重锤了下你的肩膀，力道大得差点把你捶进火堆里。
「好小子。」他别过头去，声音有点闷，「行。那你得喝那坛升学酒——双份。」`},{id:`c_1`,text:`「想去看海。听说海是咸的。」`,effects:[{kind:`resource`,resource:`sanity`,delta:10}],next:`laok_s8_oath__oath`,result:`「海？」他挑了挑眉，忽然笑了，「巧了。我弟以前总嚷嚷要去海边。行，送完闺女，我陪你去——顺路把我弟那份也看了。」
两个约定，一条路线。雾散之后的日子，忽然就有了盼头。`},{id:`c_2`,text:`「教你孙子下棋。让你尝尝连输五把的滋味」`,effects:[],next:`__return__`}]},laok_s8_oath__oath:{id:`laok_s8_oath__oath`,text:`换岗前，他站起来伸出手——成年男人的仪式，不需要语言，简单，直接。
「丑话说前头，」他握住你的手，力道极大，「最后这两天，谁也不许逞英雄，谁也不许死在前面。活着上直升机，一样不少地出去。做得到吗？」
【叮！距离救援编队过境还有 1 天】`,choices:[{id:`c_0`,text:`「做得到。击掌为誓。」`,effects:[{kind:`resource`,resource:`sanity`,delta:10}],next:`__return__`,result:`手掌相击的一声脆响，在夜里传出很远。
【叮！与老K立下同归之誓】——只要第十五天的夜里他还活着、还在身边，直升机的舱门就会为他多开一人位。
雾散倒计时，开始了。`},{id:`c_1`,text:`击掌之后补一句：「信我留着，出去那天还你」`,effects:[],next:`__return__`,requires:{flags:[`lk_letter_unread`]}}]}}},{id:`doc_s1_housecall`,title:`老医生·上门问诊`,desc:``,trigger:{dayMin:4,flags:[`doc_met`],notFlags:[`doc_plan`]},initialScene:`doc_s1_housecall__q`,scenes:{doc_s1_housecall__q:{id:`doc_s1_housecall__q`,text:`老医生站在你门口，手里攥着一瓶碘伏。
「有个事儿想跟你商量。」他推了推眼镜，「我那儿的药品快见底了，但诊所还能撑。你要是愿意搭把手——」
他看了一眼你手里的绷带。`,choices:[{id:`c_0`,text:`分他一些草药（-2herb_green +10sanity）`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`item`,item:`herb_green`,amount:-2},{kind:`item`,item:`med_bandage`,amount:1}],next:`__return__`,requires:{items:{herb_green:2}},result:`你掏出两把晒干的草药递过去。他愣了一下，然后郑重其事地揣进怀里。
「行，我记着。」他从兜里摸出一瓶碘伏塞给你，「拿着，擦伤了别感染。」
【好感+15 获得碘伏×1】`},{id:`c_1`,text:`问他怎么认识这么多草药`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`doc_trust1`}],next:`__return__`,result:`「社区医院干了二十年，什么没见过。」他笑了笑，「可惜现在没设备了，只能靠经验。你要想学，我可以教。」
他从口袋里摸出一本翻烂的《野外急救手册》递给你。
【获得「野外急救手册」】
【好感+10】`},{id:`c_2`,text:`婉拒`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`「行，不勉强。」他转身要走，又回头，「不过要是哪天改主意了，我在诊所等你。」
他走了几步又折回来，「对了，溪谷那边最近不太平，别去太深。」`}]},doc_s1_housecall__end:{id:`doc_s1_housecall__end`,text:`老医生的背影消失在雾中。他的白大褂已经洗得发黄，但补丁补得整整齐齐。`,choices:[{id:`c_0`,text:`记下他的话`,effects:[{kind:`flag`,flag:`doc_trust1`}],next:`__return__`,result:`你在日记本上写下：「老医生——社区医院，懂草药，人不坏。」`},{id:`c_1`,text:`随他去吧`,effects:[],next:`__return__`,result:`你关上门。每个人都有自己的路。`}]}}},{id:`doc_s2_shortage`,title:`老医生·药箱见底`,desc:``,trigger:{dayMin:6,flags:[`doc_met`],notFlags:[`doc_plan`]},initialScene:`doc_s2_shortage__q`,scenes:{doc_s2_shortage__q:{id:`doc_s2_shortage__q`,text:`你推开诊所的门时，老医生正对着空药箱发呆。
「来了？」他没抬头，「药用完了。抗生素、退烧药、碘伏——都没了。」
他指了指墙角的纸箱，「就剩这些。」
箱子里躺着两卷绷带和一瓶过期三个月的止咳糖浆。`,choices:[{id:`c_0`,text:`提议一起去找药`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`doc_plan`}],next:`__return__`,result:`「你认真的？」他抬头看你，眼里闪过一点光，「……行。明天一早去废弃超市，我知道药房在哪。」
他从抽屉里摸出一把生锈的钥匙，「这是药房仓库的钥匙。之前一直没敢去。」
【获得「药房仓库钥匙」】`},{id:`c_1`,text:`帮他整理库存`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`你帮他把有限的药品分类整理，标注保质期和用途。他看着你熟练的动作，点了点头。
「你学过医？」你摇了摇头。他笑了，「那比我聪明。」
【knowledge+10】`},{id:`c_2`,text:`建议他去求别人帮忙`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`「求人不如求己。」他摆摆手，「我再想想办法。」
他关上药箱，声音闷闷的。`}]}}},{id:`doc_s3_expedition`,title:`老医生·出诊深雾`,desc:``,trigger:{dayMin:8,flags:[`doc_plan`],notFlags:[`doc_clinic`]},initialScene:`doc_s3_expedition__q`,scenes:{doc_s3_expedition__q:{id:`doc_s3_expedition__q`,text:`清晨，老医生背着空药箱站在你门前。
「走吧，」他低声说，「超市药房在二楼，听说没被搜过。」
雾气很浓。他递给你一根布条，「系在手腕上，别走散了。」`,choices:[{id:`c_0`,text:`跟他一起去`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`doc_clinic`}],next:`__return__`,result:`你们穿过两片废墟，终于摸到了超市后门。
药房的门锁着，但锁已经锈了。老医生撬了两下，锁就断了。
「运气不错。」他推开门，「里面可能有老鼠，小心点。」
他回头看了你一眼，「要是遇到危险，你先跑。我老了，跑不动。」
【解锁链入场景：诊所之夜】`},{id:`c_1`,text:`问他为什么愿意冒险`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`doc_plan_deep`}],next:`__return__`,result:`他沉默了一会儿。
「我女儿今年二十二。」他说，「也在某个迷雾里。」
「我救不了所有人。但能救一个是一个。」
他推了推眼镜，「走吧。天亮了雾会更浓。」
【好感+20】`}]}}},{id:`doc_s4_clinic`,title:`老医生·诊所之夜`,desc:``,trigger:{flags:[`doc_clinic`],notFlags:[`doc_night_done`]},initialScene:`doc_s4_clinic__q`,scenes:{doc_s4_clinic__q:{id:`doc_s4_clinic__q`,text:`你们在药房里翻了两个小时。抗生素找到了三盒，退烧药两瓶，还有一些纱布。
正要离开时，老医生突然停下脚步。
「等等——」他侧耳听了听，「外面有声音。」
雾里传来脚步声。不止一个人。`,choices:[{id:`c_0`,text:`躲起来观察`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`doc_night_done`}],next:`__return__`,result:`你们蹲在货架后面。三个穿着黑色冲锋衣的人走进药房，手电筒扫过货架。
「就这些了？」其中一个人翻了翻，「搜干净了，走。」
他们拿走了剩下的所有药品。
等他们走远，老医生长出一口气。
「还好我们先到了。」他拍了拍你的肩膀，「走，回诊所。」`},{id:`c_1`,text:`假装路过`,effects:[{kind:`flag`,flag:`doc_night_done`}],next:`__return__`,result:`你站起来，举起双手。「我们也是来拿药的。」
三个人对视一眼。领头的冷笑：「药房是公共的？」
老医生挡在你前面：「我们先到的。」
对方犹豫了一下，转身走了。「下次注意点。」
老医生的手在发抖，但他没表现出来。
【好感+10】`}]}}},{id:`doc_s5_fever`,title:`老医生·发热病人`,desc:``,trigger:{dayMin:11,flags:[`doc_met`],notFlags:[`doc_fin`]},initialScene:`doc_s5_fever__q`,scenes:{doc_s5_fever__q:{id:`doc_s5_fever__q`,text:`诊所的门被撞开，一个女人抱着孩子冲进来。
「医生！救救孩子！」
老医生摸了摸孩子的额头，脸色变了。
「高烧。」他转身翻药箱，「退烧药……只剩最后一瓶了。」
他看了看孩子，又看了看你。
「半瓶能退烧，但今晚可能反复。全瓶一次退干净，但药就没了。」`,choices:[{id:`c_0`,text:`「全用吧，孩子要紧。」`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`item`,item:`med_bandage`,amount:-1}],next:`__return__`,requires:{items:{med_bandage:1}},result:`老医生点点头，把整瓶退烧药灌进孩子嘴里。
十分钟后，孩子的呼吸平稳了。女人跪下来磕头，被老医生扶起来。
「别跪，」他说，「我们是医生。」
他收拾药箱时，你看到他偷偷叹了口气。
【好感+15】`},{id:`c_1`,text:`「留半瓶备用。」`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`doc_prudent`}],next:`__return__`,result:`老医生犹豫了一下，还是听了你的。半瓶灌下去，孩子退烧了，但速度慢一些。
「今晚可能会反复。」他对女人说，「你守着，有任何情况来找我。」
女人千恩万谢地走了。
老医生坐下来，揉了揉太阳穴。
「你说得对。我太冲动了。」`},{id:`c_2`,text:`「还有别的办法吗？」`,effects:[{kind:`resource`,resource:`sanity`,delta:15}],next:`__return__`,result:`你翻出那本《野外急救手册》，找到了物理降温的方法。
你用溪水浸湿毛巾敷在孩子额头，老医生在旁边指导。
半小时后，孩子退烧了。药没用。
老医生看着你，眼里有光。
「你比我强。」他说这话时，语气里没有嫉妒，只有欣慰。
【knowledge+15 好感+20】`}]}}},{id:`doc_s6_flag`,title:`老医生·白旗`,desc:``,trigger:{dayMin:13,flags:[`doc_met`],notFlags:[`doc_fin`]},initialScene:`doc_s6_flag__q`,scenes:{doc_s6_flag__q:{id:`doc_s6_flag__q`,text:`诊所门口挂起了一面白旗。
老医生站在门口，看着来来往往的人。
「从今天起，」他大声说，「这里免费看诊。有病的来，没病的也来坐坐。」
他回头看了你一眼，笑了笑。
「你教我的——能救一个是一个。」`,choices:[{id:`c_0`,text:`留下帮忙`,effects:[{kind:`resource`,resource:`sanity`,delta:18},{kind:`flag`,flag:`doc_fin`},{kind:`item`,item:`med_first_aid`,amount:1}],next:`__return__`,result:`你帮老医生整理了最后的药品，给每一个来诊所的人量了体温。
他从柜子里摸出一瓶藏了很久的酒，倒了两杯。
「敬你。」他举杯，「敬所有活着的人。」
杯底碰在一起，发出清脆的响声。
【老医生路线完结 — 诊所重开为区域救援点】`},{id:`c_1`,text:`默默离开`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`doc_fin`}],next:`__return__`,result:`你没有打扰他。有些人注定要在末日里点亮一盏灯。
你回头看了一眼诊所的白旗。它在风中轻轻飘着。
【老医生路线完结】`}]}}},{id:`rat_s1_return`,title:`鼠王·回礼`,desc:``,trigger:{dayMin:5,flags:[`ratking_met`],notFlags:[`rat_deal`]},initialScene:`rat_s1_return__q`,scenes:{rat_s1_return__q:{id:`rat_s1_return__q`,text:`你循着上次的路线找到了那个下水道入口。
铁栅栏后面，一双发亮的眼睛正盯着你。
「又来了？」鼠王的声音在管道里回荡，「这次带了什么？」
他从栅栏缝里伸出一只枯瘦的手。`,choices:[{id:`c_0`,text:`递给他两块饼干（-2food_biscuit）`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`rat_deal`},{kind:`item`,item:`food_biscuit`,amount:-2},{kind:`item`,item:`key_map_fragment`,amount:1}],next:`__return__`,requires:{items:{food_biscuit:2}},result:`他一把抓过饼干，塞进嘴里嚼了两口，眼睛突然亮了。
「好东西。」他吞下去，「作为交换——」
他从身后拖出一个布包，里面是一张皱巴巴的纸。
「北边那片雾里有条暗河。顺着走能到沉船湾。很多人不知道。」
【获得「暗河路线图」解锁沉船湾】`},{id:`c_1`,text:`问他为什么住在下水道`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`rat_story`}],next:`__return__`,result:`他沉默了很久。
「上面太亮了。」他说，「我习惯了黑。」
他从怀里掏出一只小铁盒，里面装着几颗发霉的糖。
「她给我的。」他说了一个名字，你没听清。
「后来她走了。我就下来了。」
【好感+12】`},{id:`c_2`,text:`给他一块石头（什么都没有）`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`他接过石头看了看，又看了看你。
「……有意思。」他把石头揣进兜里，「你很有趣。下次带点吃的来。」
他没有生气。`}]}}},{id:`rat_s2_price`,title:`鼠王·情报价目`,desc:``,trigger:{dayMin:7,flags:[`ratking_met`],notFlags:[`rat_invite`]},initialScene:`rat_s2_price__q`,scenes:{rat_s2_price__q:{id:`rat_s2_price__q`,text:`鼠王今天看起来心情不错。
他蹲在铁栅栏后面，面前摆着一张纸，上面用铅笔歪歪扭扭地写着：

「情报价目表」
① 兽潮路线——3食物
② 诊所仓库位置——1金属件
③ 其他幸存者位置——2食物
④ 特殊情报（面议）——看你给什么`,choices:[{id:`c_0`,text:`买兽潮路线情报（-3food_berry）`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`rat_intel_beast`},{kind:`item`,item:`food_berry`,amount:-3}],next:`__return__`,requires:{items:{food_berry:3}},result:`他接过浆果，指了指西边。
「兽潮从西边来，沿河跑。你在河东边建东西挡，或者干脆在河西边蹲着——它们不回头。」
他舔了舔手指，「别告诉别人。」
【兽潮情报·有用】`},{id:`c_1`,text:`买诊所仓库位置（-1mat_scrap_metal）`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`rat_intel_clinic`},{kind:`flag`,flag:`doc_plan`},{kind:`item`,item:`mat_scrap_metal`,amount:-1}],next:`__return__`,requires:{items:{mat_scrap_metal:1}},result:`他接过金属件，在纸上画了个圈。
「超市二楼，左转第三个门。没被搜过。」
他顿了顿，「老医生可能知道。但他不敢去。」
【获得「仓库位置标记」】`},{id:`c_2`,text:`买其他幸存者位置（-2food_berry）`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`rat_intel_neighbors`},{kind:`item`,item:`food_berry`,amount:-2}],next:`__return__`,requires:{items:{food_berry:2}},result:`他掰着手指头数：
「东边铁蛋杂货铺——有钱人。三楼老猫——怪人。南墙根老周——一家四口。北边有个直播的——小姑娘。」
他眨眨眼，「还有你。你住在——」他指了指你的方向，「对吧？」
你知道的，他什么都知道。`},{id:`c_3`,text:`问特殊情报`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`他凑近栅栏，压低声音：
「沉船湾下面有个密室。很多人不知道。里面的东西——」
他伸出五根手指，「值五条命。」
「但你得先拿到地图碎片。」他看了看你，「你有吗？」`}]}}},{id:`rat_s3_invite`,title:`鼠王·地下请柬`,desc:``,trigger:{dayMin:9,flags:[`rat_deal`],notFlags:[`rat_kingdom`]},initialScene:`rat_s3_invite__q`,scenes:{rat_s3_invite__q:{id:`rat_s3_invite__q`,text:`你再次来到下水道入口时，发现铁栅栏被打开了。
地上放着一张用锡纸做的「请柬」，上面歪歪扭扭地写着：

「诚邀阁下参观鼠王国。入口：铁栅栏后左转50米。注意脚下。」
下面画了一只戴皇冠的老鼠。`,choices:[{id:`c_0`,text:`走进去看看`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`rat_kingdom`}],next:`__return__`,result:`你弯着腰走进下水道。管道比你想象的宽敞。
走了五十米，你看到了——
一盏油灯照亮了一个圆形的空间。地上铺着捡来的纸板，墙上挂着几张照片（看不清内容）。
鼠王坐在一块石头上，面前摆着三只死老鼠。
「欢迎来到鼠王国。」他站起来，「它们是我的臣民。」
他指了指那三只死老鼠，「它们死了。我埋了它们。」
他看着你，「你想看看我的王国吗？」
【解锁链入场景：下水道王座】`},{id:`c_1`,text:`太脏了，不进去`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`你站在入口犹豫了一会儿，转身离开了。
身后传来鼠王的声音：「胆小鬼。」
但语气里没有嘲讽，只有失望。`}]}}},{id:`rat_s4_throne`,title:`鼠王·下水道王座`,desc:``,trigger:{flags:[`rat_kingdom`],notFlags:[`rat_throne_done`]},initialScene:`rat_s4_throne__q`,scenes:{rat_s4_throne__q:{id:`rat_s4_throne__q`,text:`鼠王带你参观了整个「王国」。

一只瘸腿的老鼠在角落里啃木头——「它是宰相。」
一堆发霉的面包——「这是国库。」
墙上用粉笔画的地图——「这是疆域。」

他站在最中间，伸开双臂。
「这就是我的王国。」他回头看你，「很小，但都是我的。」
他的眼睛在油灯下亮晶晶的。`,choices:[{id:`c_0`,text:`「很了不起。」`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`rat_throne_done`}],next:`__return__`,result:`他愣了一下。然后咧嘴笑了，露出几颗黄牙。
「你是第一个这么说的人。」
他从「国库」里拿出一块面包递给你。
「吃。国王请客。」
面包已经发霉了，但你还是吃了。
因为它很甜。`},{id:`c_1`,text:`问他为什么要把王国给你看`,effects:[{kind:`resource`,resource:`sanity`,delta:15},{kind:`flag`,flag:`rat_throne_done`}],next:`__return__`,result:`他沉默了一会儿。
「因为你是第一个给我饼干的人。」他说，「也是第一个没有笑我的人。」
他坐回石头上，「我以前在上面有个家。后来没了。」
「现在我有王国了。虽然只有三只死老鼠和一堆发霉面包。」
他看着你，「你会告诉别人吗？」
你摇了摇头。
他笑了。
【好感+20】`}]}}},{id:`rat_s5_queen`,title:`鼠王·鼠后之乱`,desc:``,trigger:{dayMin:11,flags:[`rat_kingdom`],notFlags:[`rat_fin`]},initialScene:`rat_s5_queen__q`,scenes:{rat_s5_queen__q:{id:`rat_s5_queen__q`,text:`你来找鼠王时，发现他蹲在角落里发抖。
「她来了。」他声音发颤。
「谁？」
「鼠后。」他指了指管道深处，「她要抢我的王国。」
远处传来窸窸窣窣的声音，像无数只爪子在水泥上爬。`,choices:[{id:`c_0`,text:`帮他守住王国`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`rat_queen_defeated`}],next:`__return__`,result:`你和鼠王一起守在管道口。
一群黑色的老鼠涌过来，领头的那只比猫还大。
你用棍子挡在前面，鼠王在后面扔石头。
打了一个小时，鼠群退了。
鼠王瘫坐在地上，大口喘气。
「谢谢你。」他说，「你是我的骑士。」
他的王国保住了。`},{id:`c_1`,text:`建议他谈判`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`rat_peace`}],next:`__return__`,result:`你让鼠王对着管道喊话：「我们可以共享领地！」
对面安静了一会儿。
然后一只老鼠叼着一块布走出来，放在鼠王面前。
「她同意了。」鼠王难以置信，「她居然同意了。」
布上绣着一朵花。是鼠后的嫁妆。
「以后她管西边，我管东边。」鼠王把布叠好揣进兜里，「和平了。」
【social+15 好感+15】`},{id:`c_2`,text:`不想管，离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`rat_abandoned`}],next:`__return__`,result:`你转身走了。身后传来鼠王的喊声：「别走！！」
你没有回头。
第二天你来找他时，他蜷在角落里，身上多了几道抓痕。
「没事。」他说，「它们走了。」
但他的眼神变了。`}]}}},{id:`rat_s6_farewell`,title:`鼠王·别礼`,desc:``,trigger:{dayMin:13,flags:[`rat_kingdom`],notFlags:[`rat_fin`]},initialScene:`rat_s6_farewell__q`,scenes:{rat_s6_farewell__q:{id:`rat_s6_farewell__q`,text:`鼠王今天没有蹲在铁栅栏后面。
他站在入口处，背对着你。
「你要走了？」你问。
他转过身，手里攥着一块发光的石头。
「王国要搬家了。」他说，「雾越来越浓，下面不安全了。」
他把石头递给你。
「拿着。这是沉船湾的密室钥匙。」`,choices:[{id:`c_0`,text:`收下钥匙`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`rat_fin`},{kind:`item`,item:`key_map_fragment`,amount:1}],next:`__return__`,result:`你接过石头。它在掌心微微发热。
「沉船湾下面有个密室。」他说，「里面的东西够你活很久。」
他从兜里掏出那块绣花布，看了看，又揣回去。
「替我跟铁蛋说一声，他欠我三块饼干。」
他转身走进雾里。
「别想我！」他头也不回地喊。
你没有回答。
【鼠王路线完结 — 解锁沉船湾密室】`},{id:`c_1`,text:`给他一些食物作饯别礼（-2food_canned）`,effects:[{kind:`resource`,resource:`sanity`,delta:18},{kind:`flag`,flag:`rat_fin`},{kind:`item`,item:`food_canned`,amount:-2},{kind:`item`,item:`key_map_fragment`,amount:1}],next:`__return__`,requires:{items:{food_canned:2}},result:`他接过罐头，愣了一下。
「你人不错。」他说，「比我认识的大多数人都好。」
他把石头塞进你手里，又从兜里掏出那块绣花布。
「这个也给你。」他说，「万一你遇到她——鼠后——替我说声谢谢。」
他笑了。然后转身走进雾里。
你看着他的背影消失在迷雾中。
【鼠王路线完结 — 解锁沉船湾密室 + 绣花布（特殊物品）】`},{id:`c_2`,text:`不给，直接拿钥匙`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`rat_fin`},{kind:`item`,item:`key_map_fragment`,amount:1}],next:`__return__`,result:`他看了看你，又看了看手里的石头。
「算了。」他把石头递给你，「拿去吧。反正我也用不上了。」
他转身走了。没有回头。
你手里攥着石头，站在原地。
【鼠王路线完结】`}]}}},{id:`rescue_s1_wreck`,title:`救援 · 一`,desc:``,trigger:{dayMin:4,notFlags:[`rescue_met`,`rescue_lost`]},initialScene:`rescue_s1_wreck__gate`,scenes:{rescue_s1_wreck__gate:{id:`rescue_s1_wreck__gate`,text:`第四天夜里，无线电的杂音第一次有了人声的形状。
你循声推开门，雾里伏着一个穿橙色救援服的人，头盔滚在一边，胸口还有起伏，但血已经从护具缝里渗出来，在泥地上洇成暗色。他腰间挂着一个摔裂的方形盒子——电台。
风把远处的雾吹薄了一瞬，你看见他攥着半截天线的手，指节发白。`,choices:[{id:`c_0`,text:`把他拖进屋`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`rescue_met`}],next:`__return__`,result:`你架起他往屋里拖，血蹭了一路。把他搁在火堆边时，他睫毛动了动，没醒。
你守了一夜。天快亮时他喉咙里发出含糊的音节，像在喊谁的名字。
【好感度提升：救援队 +10】`},{id:`c_1`,text:`先给他草药止血`,effects:[{kind:`flag`,flag:`rescue_met`},{kind:`item`,item:`med_herbal`,amount:-1}],next:`__return__`,requires:{items:{med_herbal:1}},result:`你撕开他护具，把草药按在伤口上。血慢慢止住，他的呼吸平了些。
他迷迷糊糊睁开眼，看见你，费力地抬了抬手，又垂下去。
【好感度提升：救援队 +15】`},{id:`c_2`,text:`搜他的背包`,effects:[{kind:`flag`,flag:`rescue_met`},{kind:`flag`,flag:`rescue_looted`},{kind:`item`,item:`key_radio_parts`,amount:1},{kind:`item`,item:`food_canned`,amount:1}],next:`__return__`,result:`你翻开他的包——半块压缩饼干，一份防水地图，还有那个摔裂电台里掉出来的零件。
你把它们收进自己兜里。他好像动了动，但你不敢确定。
【道德 -5，好感度下降：救援队 -20】`},{id:`c_3`,text:`关上门，装没看见`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`rescue_lost`}],next:`__return__`,result:`你退回去，把门闩上。雾里那点人声形状的杂音，被你用被子捂了一夜。
第二天清晨，门口只剩一滩暗色的痕迹，和半截折断的天线。
【好感度下降：救援队 -30】`}]}}},{id:`rescue_s2_awake`,title:`救援 · 二`,desc:``,trigger:{dayMin:6,flags:[`rescue_met`],notFlags:[`rescue_lost`]},initialScene:`rescue_s2_awake__talk`,scenes:{rescue_s2_awake__talk:{id:`rescue_s2_awake__talk`,text:`他醒了。是个年轻通讯兵，脸上有煤灰和冻伤，自我介绍时先咳了两声。
「我是东三区救援点的。」他指了指腰间那个摔裂的盒子，「电台在来的路上被兽群撞了。要是它还在，外面的人就知道这片雾里还有活人。」
他看你眼神里没有太多防备，反而有点局促，像是太久没跟活人说话。`,choices:[{id:`c_0`,text:`分他一个罐头`,effects:[{kind:`flag`,flag:`rescue_talked`},{kind:`flag`,flag:`word_rescue_point`},{kind:`item`,item:`food_canned`,amount:-1}],next:`__return__`,requires:{items:{food_canned:1}},result:`他接过去，没客气，三两口吃完，把空罐捏扁塞回你手里：「留着，这铁皮能换东西。」
「东三区救援点。」他又说了一遍，「记住这个坐标。」
【好感度提升：救援队 +10】`},{id:`c_1`,text:`让他把外面的情况讲完`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`rescue_talked`},{kind:`flag`,flag:`word_rescue_point`}],next:`__return__`,result:`他说雾起的那天，所有频段同时哑了，只有救援点还在循环播报。后来连他们也快要撑不住。
「但直升机还在飞。」他最后说，「只要有人回应，他们就还会来。」
你心里那点熄灭的希望，又被他拨亮了一格。
【好感度提升：救援队 +5，精神 +3】`},{id:`c_2`,text:`问他雾是怎么来的`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`rescue_talked`}],next:`__return__`,result:`他摇头：「我们也不清楚。只知道雾来之前，天上掉过一阵蓝色的雨。」
他没再多说，只是看着窗外的白，眼神很远。
【好感度提升：救援队 +3】`}]}}},{id:`rescue_s3_radio`,title:`救援 · 三`,desc:``,trigger:{dayMin:8,flags:[`rescue_talked`]},initialScene:`rescue_s3_radio__fix`,scenes:{rescue_s3_radio__fix:{id:`rescue_s3_radio__fix`,text:`他撑着墙站起来，指着那个摔裂的电台：「核心板没坏，就差一个耦合零件。你这儿要是有类似的金属件……」
他从兜里掏出那块从摔裂盒子里掉出来的零件——和你之前见过的某种制式一模一样。
「这东西，能拼回去。」他把零件放在掌心，递向你。`,choices:[{id:`c_0`,text:`把电台零件给他拼上`,effects:[{kind:`flag`,flag:`rescue_radio_help`},{kind:`item`,item:`key_radio_parts`,amount:-1}],next:`__return__`,requires:{items:{key_radio_parts:1}},result:`你们蹲在火堆边，就着一点光，把耦合零件卡回槽位。指示灯闪了两下，亮了。
他长出一口气，拍了拍电台：「成了。这下外面能听见我们了。」
【好感度提升：救援队 +15，手艺经验 +8】`},{id:`c_1`,text:`陪他去废墟里翻零件`,effects:[{kind:`flag`,flag:`rescue_radio_help`},{kind:`item`,item:`key_radio_parts`,amount:1}],next:`__return__`,result:`你们摸黑翻了近处的倒塌房屋，在一具冻僵的通讯车残骸里，找到了完好的耦合件。
回来时他手都在抖，但眼睛亮得不行。
【好感度提升：救援队 +10】`},{id:`c_2`,text:`「这东西修不好，别费劲了」`,effects:[{kind:`flag`,flag:`rescue_no_radio`}],next:`__return__`,result:`他沉默了很久，把零件收回兜里。
「也是。」他说，「能活到现在，已经算运气了。」
但你看得出，他眼底那点火，暗了一截。
【好感度下降：救援队 -5】`}]}}},{id:`rescue_s4_coord`,title:`救援 · 四`,desc:``,trigger:{dayMin:10,flags:[`rescue_radio_help`]},initialScene:`rescue_s4_coord__coord`,scenes:{rescue_s4_coord__coord:{id:`rescue_s4_coord__coord`,text:`电台吱吱呀呀吐出断续的人声：「……东三区……坐标确认……有回应请……」
他猛地抓住你的胳膊：「是救援点！他们收到残信号了。现在只要你敢报坐标，他们就能定位这片雾，派直升机来。」
他顿了顿，又压低声音：「但信号一出去，雾里别的东西也会听见你。」`,choices:[{id:`c_0`,text:`报坐标，让救援队来找你`,effects:[{kind:`flag`,flag:`rescue_coord`},{kind:`flag`,flag:`rescue_signaled`}],next:`__return__`,result:`你对着话筒报出木屋的位置。那一头静了两秒，爆出一句「收到」，然后是一串你听不懂的调度代码。
他松开手，笑了。雾好像也退了半步。
【道德 +5，雾压 +3（你暴露了位置）】`},{id:`c_1`,text:`只听情报，不报坐标`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`rescue_coord`}],next:`__return__`,result:`你摇头。他没勉强，只是把坐标又念了一遍，让你记牢。
「也好。」他说，「活着比被找到重要。」
【好感度提升：救援队 +2，精神 +2】`},{id:`c_2`,text:`「别信任何坐标，包括这个」`,effects:[{kind:`flag`,flag:`rescue_coord`},{kind:`flag`,flag:`rescue_cautious`}],next:`__return__`,result:`他愣了一下，随即苦笑：「你比我谨慎。」
他把电台关小了音量，但没关掉。你们谁都没再提坐标的事。
【好感度提升：救援队 +3】`}]}}},{id:`rescue_s5_split`,title:`救援 · 五`,desc:``,trigger:{dayMin:11,flags:[`rescue_coord`]},initialScene:`rescue_s5_split__split`,scenes:{rescue_s5_split__split:{id:`rescue_s5_split__split`,text:`电台另一端，另一个声音插了进来——是个急躁的男的，主张立刻调直升机把你接走。
通讯兵把话筒捂住，看向你：「他性子急。但带一个人走，就意味着少带一个伤员。你说呢？」
火光映在他脸上，你第一次看清他眼睛里有犹豫，也有期待。`,choices:[{id:`c_0`,text:`「跟他走，别耽误」`,effects:[{kind:`flag`,flag:`rescue_chosen`},{kind:`flag`,flag:`rescue_will_leave`}],next:`__return__`,result:`他点头，对着话筒说了句「接人」，那边应了。
他回头看你，眼神里有点释然：「总算有个人能出去了。」
【好感度提升：救援队 +10】`},{id:`c_1`,text:`「我留下，让伤员先走」`,effects:[{kind:`flag`,flag:`rescue_chosen`},{kind:`flag`,flag:`rescue_stay`}],next:`__return__`,result:`他怔住，随即重重拍了下你肩膀：「你这人……」
他对着话筒改了口。那一头骂了句什么，但也认了。
【道德 +3，好感度提升：救援队 +5】`},{id:`c_2`,text:`沉默，让他说了算`,effects:[{kind:`flag`,flag:`rescue_chosen`}],next:`__return__`,result:`你没吭声。他盯着你看了几秒，自己拿了个折中的主意。
「行吧。」他嘟囔，「两边都不得罪。」
【好感度下降：救援队 -2】`}]}}},{id:`rescue_s6_tide`,title:`救援 · 六`,desc:``,trigger:{dayMin:13,flags:[`rescue_chosen`]},initialScene:`rescue_s6_tide__tide`,scenes:{rescue_s6_tide__tide:{id:`rescue_s6_tide__tide`,text:`第十三天的夜，雾里传来密集的蹄声——兽潮。
通讯兵一把抄起撬棍站到你身侧：「白天你救过我，今晚我替你扛一阵。」
木屋在撞击下吱呀作响，火堆的光被扑得忽明忽暗。`,choices:[{id:`c_0`,text:`把火把塞给他`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`rescue_ally`},{kind:`item`,item:`mat_wood`,amount:-1}],next:`__return__`,requires:{items:{mat_wood:1}},result:`你点燃一根木柴递过去。他挥舞着火把，把扑门的影子逼退了半步又半步。
天亮时，门口堆了三层黑影，他还站着。
【好感度提升：救援队 +15，精神 +5】`},{id:`c_1`,text:`并肩作战`,effects:[{kind:`flag`,flag:`rescue_ally`}],next:`__return__`,result:`你们背靠背，把每一次扑上来的黑影都捅回去。他的撬棍和你手里的家伙，节奏居然合上了。
兽潮退时，你肋下挨了一下，但他把你护在了墙角。
【好感度提升：救援队 +20，体力 -5】`},{id:`c_2`,text:`拉他躲进地窖`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`rescue_ally`}],next:`__return__`,result:`你拽着他滚进地窖。撞击声在头顶炸了整整一夜。
天亮时上面安静了。他拍了拍你：「谢了。换我，未必拉得动你。」
【好感度提升：救援队 +10，精神 -3】`}]}}},{id:`rescue_s7_eve`,title:`救援 · 七`,desc:``,trigger:{dayMin:15,flags:[`rescue_ally`]},initialScene:`rescue_s7_eve__eve`,scenes:{rescue_s7_eve__eve:{id:`rescue_s7_eve__eve`,text:`直升机的事定了。撤离前夜，他把自己那点家当摊在桌上，挑挑拣拣，最后推过来一份。
「拿着。」他说，「我走得轻，你还得在这儿撑几天。」
桌上的罐头和水，在火光里泛着温吞的光。`,choices:[{id:`c_0`,text:`收下`,effects:[{kind:`flag`,flag:`rescue_eve`},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`water_clean`,amount:2}],next:`__return__`,result:`你没推辞。他咧嘴一笑，把剩下的也往你这边挪了挪。
「别客气，命要紧。」
【获得：罐头×2，净水×2】`},{id:`c_1`,text:`回赠他食物`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`rescue_eve`},{kind:`item`,item:`food_canned`,amount:-2}],next:`__return__`,requires:{items:{food_canned:2}},result:`你反倒塞给他两个罐头：「你路上用得上。」
他推了两下，还是收了，眼眶有点红：「我这辈子，欠人情记得特别清。」
【好感度提升：救援队 +15，精神 +3】`},{id:`c_2`,text:`问他为什么帮到底`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`rescue_eve`},{kind:`flag`,flag:`rescue_backstory`}],next:`__return__`,result:`他沉默了一会儿：「我家人也在雾里失了联。帮着你，就像帮着当初的他们。」
他没再往下说。火光里，你看见他手指在抖。
【好感度提升：救援队 +12，精神 -2】`}]}}},{id:`rescue_s8_leave`,title:`救援 · 八`,desc:``,trigger:{dayMin:16,flags:[`rescue_ally`]},initialScene:`rescue_s8_leave__leave`,scenes:{rescue_s8_leave__leave:{id:`rescue_s8_leave__leave`,text:`第十六天清晨，雾薄得能看见天。远处传来确凿的、越来越近的轰鸣——直升机。
开阔地上，一个橙色光点正在降落。他背好那个修好的电台，回头看你。
「该走了。」他说。风把他的衣角吹得猎猎作响。`,choices:[{id:`c_0`,text:`目送他登机`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`rescue_saved`}],next:`__return__`,result:`他踏上舷梯，在舱门边回头，冲你比了个手势——是你教朵朵的那种暗号。
螺旋桨的风卷起满地落叶。飞机拔高，消失在灰白里。
你站着，直到声浪彻底远去。
【救援线完结 — 好感度提升：救援队 +20，精神 +8，道德 +5】`},{id:`c_1`,text:`跟他一起走`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`rescue_saved`},{kind:`flag`,flag:`rescue_left`}],next:`__return__`,result:`你跟着他冲上开阔地。他回头看见你，眼睛一下子亮了：「还以为你不肯走！」
舱门合拢前，他把电台塞进你怀里：「这个，归你了。」
引擎盖过了所有声音。雾，在脚下退成一片白海。
【救援线完结 — 好感度提升：救援队 +25，精神 +10】`},{id:`c_2`,text:`只是挥手，不说话`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`rescue_saved`}],next:`__return__`,result:`你站在篱笆边，抬了抬手。他也抬手，没说什么。
飞机起飞时，你忽然想起他说的那句「活着比被找到重要」。
也许他是对的。
【救援线完结 — 好感度提升：救援队 +5，精神 +3】`}]}}},{id:`crystal_s1_vein`,title:`结晶 · 一`,desc:``,trigger:{dayMin:5,notFlags:[`crystal_met`]},initialScene:`crystal_s1_vein__vein`,scenes:{crystal_s1_vein__vein:{id:`crystal_s1_vein__vein`,text:`第五天，你在雾最淡的缝隙里看见一道微光——岩壁上嵌着几块半透明的结晶体，蓝光一跳一跳，像有心跳。
凑近了，你听见极轻的、不属于风的声音，从晶体内部传来。
雾贴着晶体边缘，竟悄悄退开了一圈。`,choices:[{id:`c_0`,text:`采下一块`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`crystal_met`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`你用小刀撬下一块。晶体入手冰凉，蓝光顺着手腕往上爬了一寸，又缩回去。
口袋里多了一块沉甸甸的、会呼吸的石头。
【获得：迷雾结晶×1，雾压 +2】`},{id:`c_1`,text:`先观察它的规律`,effects:[{kind:`flag`,flag:`crystal_met`},{kind:`flag`,flag:`crystal_observed`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`你蹲了半晌，看出门道：蓝光随雾的浓淡呼吸，雾越浓它越亮。
「它在吃雾。」你对自己说。这发现让你后背发凉，也让你多了一分底气。
【获得：迷雾结晶×1，知识经验 +6】`},{id:`c_2`,text:`不碰，绕开`,effects:[{kind:`resource`,resource:`sanity`,delta:1},{kind:`flag`,flag:`crystal_met`}],next:`__return__`,result:`你怕那蓝光。绕开时，晶体里的声音似乎叹了口气。
但你记下了它的位置——也许以后用得上。
【精神 +1】`}]}}},{id:`crystal_s2_laok`,title:`结晶 · 二`,desc:``,trigger:{dayMin:7,flags:[`crystal_met`]},initialScene:`crystal_s2_laok__laok`,scenes:{crystal_s2_laok__laok:{id:`crystal_s2_laok__laok`,text:`你把晶体亮给老K看。他脸色一下变了，伸手又缩回，像怕烫。
「这玩意儿……」他压低声音，「战前我听人说过。说是某种气候装置的种子，失控了，才变成这满天的雾。」
他盯着蓝光，眼神复杂，像在看一个老相识。`,choices:[{id:`c_0`,text:`听他把传闻讲完`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`crystal_hint`}],next:`__return__`,result:`他说那装置本是用来治理沙尘的，某天核心过载，吐出的不是清水而是雾，越积越厚，把整片陆地捂进了冬天。
「结晶，就是它的种子。」他最后说。
【好感度提升：老K +8，精神 +2】`},{id:`c_1`,text:`「你怎么知道这些？」`,effects:[{kind:`flag`,flag:`crystal_hint`},{kind:`flag`,flag:`laok_knows`}],next:`__return__`,result:`他沉默良久：「我以前……在那项目里打过工。打扫卫生的那种。」
他苦笑，「所以雾起来的那天，我跑得比谁都快。」
【好感度提升：老K +5，道德 +2，线索：老K知情】`},{id:`c_2`,text:`「我不信」`,effects:[{kind:`flag`,flag:`crystal_hint`}],next:`__return__`,result:`老K耸肩：「不信也好。信了，晚上睡不着。」
但他看晶体的眼神，分明是信的。
【好感度下降：老K -3，线索：雾的传闻】`}]}}},{id:`crystal_s3_resonate`,title:`结晶 · 三`,desc:``,trigger:{dayMin:9,flags:[`crystal_hint`]},initialScene:`crystal_s3_resonate__res`,scenes:{crystal_s3_resonate__res:{id:`crystal_s3_resonate__res`,text:`第九天夜里，三块晶体——你的一块，加上远处若有若无的呼应——在你掌心同时亮起。
雾像被无形的手推开，木屋周围清出一圈空白。你能听见自己的心跳，格外清楚。`,choices:[{id:`c_0`,text:`握紧晶体`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`crystal_resonate`}],next:`__return__`,result:`蓝光从指缝溢出，把你的影子映在雾墙上，轮廓分明。
那圈空白维持了很久，久到你几乎忘了雾的存在。
【精神 +5，雾压 -3】`},{id:`c_1`,text:`放在窗台当灯`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`crystal_resonate`},{kind:`flag`,flag:`crystal_on_window`}],next:`__return__`,result:`你把晶体搁在窗台。它替火堆值了夜，蓝光一夜没灭。
清晨你醒来，发现窗外那圈空白还在。
【精神 +3，雾压 -2，线索：晶体镇雾】`},{id:`c_2`,text:`害怕，扔到门外`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`crystal_resonate`}],next:`__return__`,result:`你把它丢出篱笆。蓝光在雾里滚了两圈，灭了。
空白塌缩回去，雾重新合拢。你松了口气，又有点空。
【精神 -3，线索：共鸣现象】`}]}}},{id:`crystal_s4_doc`,title:`结晶 · 四`,desc:``,trigger:{dayMin:11,flags:[`crystal_resonate`]},initialScene:`crystal_s4_doc__doc`,scenes:{crystal_s4_doc__doc:{id:`crystal_s4_doc__doc`,text:`老医生看见晶体，二话不说把它请进了他那台吱呀作响的显微镜。
半小时后他直起身，脸色比晶体还白：「这东西里头……有细胞。雾是活的。」
他指着载玻片上一团缓缓蠕动的蓝光：「它在呼吸，在找同类。」`,choices:[{id:`c_0`,text:`让他继续化验`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`crystal_scan`}],next:`__return__`,requires:{items:{key_mist_crystal:1}},result:`他取样、染色、比对，忙到深夜。结论是：晶体是雾的「胚胎」，三块共鸣会唤醒母体。
「要么集齐唤醒它，要么永远别让三块碰头。」他警告。
【好感度提升：老医生 +10，线索：结晶是雾的胚胎】`},{id:`c_1`,text:`只听结论`,effects:[{kind:`resource`,resource:`sanity`,delta:-1},{kind:`flag`,flag:`crystal_scan`}],next:`__return__`,result:`你没把晶体交出去，只听他讲完。
「活的。」这两个字在你脑子里转了一夜。
【好感度提升：老医生 +5，线索：雾是活的】`},{id:`c_2`,text:`「我不想知道细节」`,effects:[{kind:`flag`,flag:`crystal_scan`}],next:`__return__`,result:`老医生叹气，把显微镜盖上了：「行。无知者长寿。」
但你看见他偷偷在笔记本上画下了晶体的样子。
【好感度下降：老医生 -2，线索：雾是活的】`}]}}},{id:`crystal_s5_second`,title:`结晶 · 五`,desc:``,trigger:{dayMin:12,flags:[`crystal_scan`]},initialScene:`crystal_s5_second__second`,scenes:{crystal_s5_second__second:{id:`crystal_s5_second__second`,text:`老医生说，唤醒母体需要三块。你只有一块。
「鼠王那伙人，在沉船湾密室里囤了不少稀奇东西。」老K插话，「说不定有第二块。」
雾里，似乎到处都藏着这种会呼吸的石头。`,choices:[{id:`c_0`,text:`用罐头向鼠王换`,effects:[{kind:`flag`,flag:`crystal_second`},{kind:`item`,item:`food_canned`,amount:-2},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,requires:{items:{food_canned:2}},result:`鼠王眯着眼打量你，然后从兜里掏出一块蓝光莹莹的石头：「早就捡着玩了，臭显摆。」
他换走你的罐头，心满意足。
【获得：迷雾结晶×1】`},{id:`c_1`,text:`深入雾中探寻`,effects:[{kind:`flag`,flag:`crystal_second`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`你循着微光，在塌了一半的钟楼尖顶上，抠出一块被藤蔓缠住的晶体。
下来时划破了手，但值。
【获得：迷雾结晶×1，体力 -3】`},{id:`c_2`,text:`问老K讨`,effects:[{kind:`flag`,flag:`crystal_second`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`老K挠挠头，从怀里摸出一块：「本来留着压箱底的……给你吧，你比我会用。」
他递过来时，手有点抖。
【获得：迷雾结晶×1，好感度下降：老K -5】`}]}}},{id:`crystal_s6_third`,title:`结晶 · 六`,desc:``,trigger:{dayMin:14,flags:[`crystal_second`]},initialScene:`crystal_s6_third__third`,scenes:{crystal_s6_third__third:{id:`crystal_s6_third__third`,text:`第三块线索指向雾最浓的腹地——据说那里立着一座没塌的信号塔，塔基嵌着母体本尊。
老医生的话在耳边：「集齐唤醒它，或上交组织。两条路，两种结局。」
你攥着两块晶体，蓝光隔着口袋互相呼应。`,choices:[{id:`c_0`,text:`集齐三块，召唤真相`,effects:[{kind:`flag`,flag:`crystal_third`},{kind:`flag`,flag:`crystal_seek_truth`}],next:`__return__`,result:`你下定决心：要看见，就不要半途而废。
你朝信号塔走去，两块晶体在掌心烫得发亮。
【道德 +3，线索：追寻真相】`},{id:`c_1`,text:`上交救援组织`,effects:[{kind:`flag`,flag:`crystal_third`},{kind:`flag`,flag:`crystal_hand_in`},{kind:`item`,item:`key_mist_crystal`,amount:-2}],next:`__return__`,requires:{items:{key_mist_crystal:2}},result:`你通过电台，把两块晶体交给了路过接应的救援队。
他们郑重收下，说会送进实验室。
「也许能造出解药。」那声音说。
【失去：迷雾结晶×2，道德 -2】`},{id:`c_2`,text:`暂且留着，再想想`,effects:[{kind:`flag`,flag:`crystal_third`}],next:`__return__`,result:`你把晶体收好。真相可以等，命不能等。
但那点蓝光，从此在你梦里亮着。
【线索：第三块未决】`}]}}},{id:`crystal_s7_crack`,title:`结晶 · 七`,desc:``,trigger:{dayMin:16,flags:[`crystal_third`]},initialScene:`crystal_s7_crack__crack`,scenes:{crystal_s7_crack__crack:{id:`crystal_s7_crack__crack`,text:`第十六天，雾毫无预兆地裂开一道缝。
缝的那边，你看见久违的、灰蓝色的天，和远处一栋没塌的楼的轮廓。风从缝里灌进来，是干净的、带着土腥味的风。
晶体在你怀里剧烈跳动，像要挣出去。`,choices:[{id:`c_0`,text:`走向那道缝`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`crystal_crack`}],next:`__return__`,result:`你踏进空白。风灌满肺，你第一次觉得呼吸是件痛快事。
缝在身后缓缓合拢，但你已看见过天了。
【精神 +6，雾压 -5】`},{id:`c_1`,text:`记录这一现象`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`crystal_crack`},{kind:`flag`,flag:`journal_bonus`}],next:`__return__`,result:`你掏出日记，把裂缝的位置、风向、晶体的反应全记下来。
也许有一天，这页纸能救别人。
【精神 +3，知识经验 +5，线索：裂缝记录】`},{id:`c_2`,text:`拉住老K一起看`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`crystal_crack`}],next:`__return__`,result:`你拽住老K，把他拖到缝前。他呆了半晌，突然红了眼：「原来天还在。」
你们并肩站着，谁都没说话。
【好感度提升：老K +5，精神 +4】`}]}}},{id:`crystal_s8_truth`,title:`结晶 · 八`,desc:``,trigger:{dayMin:18,flags:[`crystal_crack`]},initialScene:`crystal_s8_truth__truth`,scenes:{crystal_s8_truth__truth:{id:`crystal_s8_truth__truth`,text:`第十八天，三块晶体终于在你掌心聚齐。
蓝光炸开的瞬间，雾退到天地尽头，你看见了世界的最后真相——那座信号塔就是母体，而它，本是人类想用来拯救气候的手。
它失败了，但从未停止呼吸。
晶体在你手里轻轻发烫，像在问：你要把我唤醒，还是让我安睡？`,choices:[{id:`c_0`,text:`集齐三块，让它们共鸣`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`crystal_truth_seen`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`三块晶体贴合的刹那，蓝光贯通全身。雾在远方翻涌，却不再逼近。
你听见一个很轻很轻的声音，像是世界在叹气，也像是谢谢。
【获得：迷雾结晶×1（凑齐三块），精神 +12，雾压 -5，线索：真相揭晓】`},{id:`c_1`,text:`把真相告诉老K`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`crystal_truth_seen`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`你拉住老K，把掌心的蓝光递给他看。他看完，长长舒了口气：「原来如此。原来我们没做错什么，也没做对什么。」
你们在蓝光里坐着，像两个终于放学的小孩。
【好感度提升：老K +10，精神 +8，线索：真相揭晓】`},{id:`c_2`,text:`什么也不说，收好晶体`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`crystal_truth_seen`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`你把晶体揣回口袋。真相太重，你选择自己扛着。
但你知道，从今往后，你看雾的眼神不一样了。
【精神 +4，线索：真相揭晓】`}]}}}],randomEvents:[{id:`evt_airdrop`,weight:9,minDay:3,maxTriggers:3,text:`【系统播报】检测到未知飞行物掠过雾层上空——一只补给空投箱摇摇晃晃地坠落在东边两百米的灌木丛里，降落伞缠在了树枝上。`,choices:[{id:`o_0`,text:`冒险冲过去抢空投`,hint:`可能空手而归`,effects:[{kind:`roll`,difficulty:55,successEffects:[{kind:`item`,item:`food`,amount:15},{kind:`item`,item:`metal`,amount:5}]}],next:`__return__`,result:`你在雾里狂奔……灌木丛里的箱子还剩多少，全看运气。`},{id:`o_1`,text:`谨慎观察半小时再靠近`,effects:[{kind:`resource`,resource:`energy`,delta:-5},{kind:`item`,item:`food`,amount:8}],next:`__return__`,result:`你等到雾稍散了些才摸过去，箱子被别人先撬开了一半，剩下的也够吃两天。`},{id:`o_2`,text:`无视它——太显眼的地方太危险`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`入夜后，东边传来几声争抢的尖叫。你裹紧毯子，庆幸自己没去。`}]},{id:`evt_caravan`,weight:7,minDay:5,maxTriggers:2,text:`【系统播报】一辆挂着铜铃的三轮车碾过雾气停在你门口。车夫裹得只露出一双眼睛：「以物易物，童叟无欺——今日特价，木材换罐头。」`,choices:[{id:`o_0`,text:`用木材×20换罐头（食物+12）`,effects:[{kind:`item`,item:`wood`,amount:-20},{kind:`item`,item:`food`,amount:12}],next:`__return__`,result:`铜铃叮当作响，你用一捆木头换回了救命的热量。`},{id:`o_1`,text:`用石材×10换金属×6`,effects:[{kind:`item`,item:`stone`,amount:-10},{kind:`item`,item:`metal`,amount:6}],next:`__return__`,result:`「石头换铁？你这买卖做得过。」车夫咧嘴，铜铃又响了一声。`},{id:`o_2`,text:`什么都不换，只打听外面的消息`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`heard_caravan_rumor`,flagValue:!0}],next:`__return__`,result:`「西边的雾上周吃掉了一个村子。」车夫压低声音，「给钱也不换那种死法。」`}]},{id:`evt_ch1_market`,weight:0,minDay:1,maxTriggers:1,text:`第三天夜里，世界频道的画风突变。刷屏的求救和哭嚎退下去了，取而代之的是一行行报价：'木柴换罐头''盐换布''童叟无欺'。
有人开始做生意了。在末世里，这比任何救援信号都让人安心——说明还有人打算活下去。`,choices:[{id:`o_0`,text:`明天去看看行情`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`market_mindset`}],next:`__return__`,result:`你把可交易物资列了张清单。规则正在雾里重建，而你要成为规则的一部分，而不是猎物。`},{id:`o_1`,text:`嗤之以鼻：都是投机分子`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`market_mindset`},{kind:`flag`,flag:`market_skeptic`}],next:`__return__`,result:`你关掉频道。但半夜你还是忍不住又打开看了一遍行情——真香。`}]},{id:`evt_ch2_breath`,weight:0,minDay:1,maxTriggers:1,text:`连续三晚，你都注意到同一件事：浓雾会在深夜十一点整变薄一线，凌晨三点再涨回来。
涨、落、涨、落——像某种庞大生物的呼吸。你不是唯一发现的人，频道里有人管它叫'换气'。`,choices:[{id:`o_0`,text:`记录规律（换气时外出更安全？）`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`breath_known`}],next:`__return__`,result:`你在墙上画满了时间表。如果雾有呼吸，它就有心跳；有心跳，就有弱点。`},{id:`o_1`,text:`别研究它，装作没看见`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`saw_retreat`}],next:`__return__`,result:`有些规律知道了反而睡不着。你把这一页从日记里撕掉了。
但规律自己找上门来：那晚你失眠，亲眼看见雾的'落潮'里，有什么东西跟着一起退了出去。`}]},{id:`evt_ch3_silence`,weight:0,minDay:1,maxTriggers:1,text:`世界频道的在线人数从四万七千跌到了九千。
没有人组织告别，那些头像就那样一个个灰下去。今晚，一个叫'等风来'的账号发了最后一条消息：'我妈做的面。好想吃。'
然后他也灰了。`,choices:[{id:`o_0`,text:`为陌生人们守一夜灵`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`mourned_strangers`},{kind:`item`,item:`mat_wood`,amount:-1}],next:`__return__`,result:`你在窗台点了一排小火苗，替所有再也没上线的人。火光很小，但足够证明：有人记得他们来过。`},{id:`o_1`,text:`麻木地划过名单`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`flag`,flag:`numb_witness`},{kind:`resource`,resource:`sanity`,delta:-9},{kind:`flag`,flag:`numb_witness`}],next:`__return__`,result:`你已经学会了不去数死亡。这是活下来的本事之一——也是最疼的那一种。
划到一个熟悉的名字时你的手指停住了：'隔壁老王'。他昨天还在跟你讨论腌萝卜配方。`}]},{id:`evt_ch4_whisper`,weight:0,minDay:1,maxTriggers:1,text:`入夜后，雾贴着窗户喊你的名字。
第一声是奶奶的嗓音，第二声是初中同桌的，第三声——是你自己的，但你此刻明明坐在屋里。`,choices:[{id:`o_0`,text:`回应：我在这里`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`answered_fog`},{kind:`resource`,resource:`sanity`,delta:-14},{kind:`flag`,flag:`answered_fog`}],next:`__return__`,result:`'找到了。'无数声音同时松了口气，然后温柔下来。整夜，雾都安静地陪着你，像一场迟到多年的探亲。
'找到了。'语气瞬间变得饥饿。它们撞了一夜窗户，天亮才散。你在门后攥着菜刀坐到日出。`},{id:`o_1`,text:`咬住舌头不出声`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`kept_name`},{kind:`resource`,resource:`sanity`,delta:-9},{kind:`flag`,flag:`kept_name`}],next:`__return__`,result:`老规矩是对的：雾来了，别应声。名字被叫破之前，你还是你。
它们换了策略，开始用记忆里的声音说话——说小时候的事，说只有你知道的承诺。你把耳朵压在胳膊下，听到了天亮。`}]},{id:`evt_ch5_final`,weight:0,minDay:1,maxTriggers:1,text:`所有频段同时响起，官方的声音带着电流的颤抖：
'救援编队已进入大雾区边缘。重复：已进入。各幸存者保持信号畅通，准备撤离。'
三天。倒计时开始了。频道里的九千人同时沸腾，然后陷入更深的沉默——每个人都在算同一道题：我，能等到吗？`,choices:[{id:`o_0`,text:`清点家当，写完最后一篇日记`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`final_prep`}],next:`__return__`,result:`你把日子掰开了过：什么能带走，什么必须留下，什么要留给后来的人。写完抬头，天边竟有一线极淡的金色。`},{id:`o_1`,text:`把消息告诉每一个还活着的人`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`final_herald`}],next:`__return__`,result:`你敲遍了能敲的门，喊哑了嗓子。有人哭着道谢，有人已经听不懂人话了。但你把'三天'两个字，种进了每一双眼睛里。`}]},{id:`evt_crisis_dehydration`,weight:20,minDay:1,maxTriggers:1,text:`你的视线开始扭曲，喉咙像塞满了烧红的沙子。远处似乎有一汪清泉在雾里闪光……不，那不是水。`,choices:[{id:`o_0`,text:`喝下仅剩的脏水（需要脏水）`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`item`,item:`water_dirty`,amount:-1}],next:`__return__`,result:`你颤抖着拧开瓶盖。至少，还活着。`},{id:`o_1`,text:`咬破手指用血润喉`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`咸腥的味道让你清醒了一点。这不是办法，但今晚先活过去。`}]},{id:`evt_crisis_starving`,weight:20,minDay:1,maxTriggers:1,text:`饥饿像一只手从里面攥住你的胃。你盯着自己消瘦的手背发呆，突然觉得——树皮也许也能吃？`,choices:[{id:`o_0`,text:`啃桦树皮充饥`,effects:[],next:`__return__`,result:`又苦又涩，但胃里的绞痛缓解了些。`},{id:`o_1`,text:`强忍着睡过去`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`你在半梦半醒间熬过这一夜。梦里全是食物。`}]},{id:`evt_crisis_hallucination_friend`,weight:18,minDay:1,maxTriggers:1,text:`「嘿，好久不见。」门口站着你大学最好的朋友，笑着朝你挥手，就像你们上周才刚见过面。可你的这位朋友，在穿越那天就再也没上过线。`,choices:[{id:`o_0`,text:`陪他坐一会儿`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`你们聊了很多，聊到太阳落山。他走的时候说：「替我好好活。」你低头擦了擦脸，再抬头时门口只有雾。但胸口那块石头轻了一些。
聊到一半，他的脖子开始以不可能的角度转动。你尖叫着后退，撞翻了水罐。雾散了，屋里只剩你一个人和满地狼藉。`},{id:`o_1`,text:`闭眼默念：不是真的`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`等你睁开眼，门口空无一人。你在原地站了很久很久。`}]},{id:`evt_crisis_infection`,weight:20,minDay:1,maxTriggers:1,text:`伤口周围的皮肤又红又肿，一跳一跳地疼，边缘摸上去发烫。一道红线正顺着血管慢慢向上爬。这不是普通的伤。`,choices:[{id:`o_0`,text:`咬牙处理伤口（挤出脓血）`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`剧痛之后是一种奇异的轻松。红线的势头被遏制住了。
脓血混着脏水溅了一地，伤口反而更深了。但至少，该排的都排出来了。`},{id:`o_1`,text:`用抗生素（需要）`,effects:[{kind:`item`,item:`med_antibiotic`,amount:-1}],next:`__return__`,result:`药片下肚，烧很快退了。现代医学万岁——哪怕只是一片过期药。`}]},{id:`evt_crisis_sleepless`,weight:15,minDay:1,maxTriggers:1,text:`你已经两夜没合眼了。每次闭上眼，眼皮后面就有画面：雾、门缝、慢半拍的倒影。你的太阳穴突突直跳，眼前的世界开始轻微地扭曲。`,choices:[{id:`o_0`,text:`吃一片镇静剂（需要）`,effects:[{kind:`resource`,resource:`sanity`,delta:20},{kind:`item`,item:`med_sedative`,amount:-1}],next:`__return__`,result:`药物把你按进了无梦的深眠。醒来时晨光正好，世界暂时安静了。`},{id:`o_1`,text:`数呼吸：吸，一；呼，二……`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`数到四百多的时候，天亮了。虽然疲惫，但你守住了自己的意识。
数到两百时你忘了数到哪了。重新开始。又忘。窗外似乎有什么笑了一声。`}]},{id:`evt_crisis_give_up`,weight:12,minDay:1,maxTriggers:1,text:`你坐在门槛上看着雾。一个念头毫无预兆地浮上来：「就这么躺着不动，会怎么样呢？」它很轻，很温和，像一句劝慰。`,choices:[{id:`o_0`,text:`掐自己一把，站起来`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`疼是真的疼。疼说明你还活着。你骂骂咧咧地站起来继续干活——骂人也是活人的特权。
你在门槛上又坐了很久，直到腿麻得失去知觉才勉强起身。今天什么都没干成。`},{id:`o_1`,text:`看看门框上刻的日子`,effects:[{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`那些刻痕里有一道是你的。「第X天」——不管X是几，它还没结束。你深吸一口气，把雾关在了门外。`}]},{id:`evt_crisis_body_limit`,weight:15,minDay:1,maxTriggers:1,text:`一阵眩晕袭来，你扶住墙才没有倒下。视野边缘发黑，耳朵里全是自己的心跳声。你的身体在用最后的方式警告你：再这样下去，就要出人命了。`,choices:[{id:`o_0`,text:`吞掉所有能吃的，先活过今天`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`你翻出背包里所有能入口的东西一扫而空。胃里有了东西，眼前的黑雾终于散开了一点。`},{id:`o_1`,text:`使用急救包（需要）`,effects:[{kind:`item`,item:`med_first_aid`,amount:-1}],next:`__return__`,result:`绷带、药剂、夹板……专业的力量。做完全套处理后，你感觉自己又能打十个。`},{id:`o_2`,text:`今天彻底休息`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`rested_today`}],next:`__return__`,result:`你破例把宝贵的行动点全用来躺着。身体是革命的本钱——这句话现在听着格外有道理。`}]},{id:`evt_crisis_poison_worse`,weight:25,minDay:1,maxTriggers:1,text:`腹部的绞痛突然加剧，一波强过一波。你扶着墙滑坐在地，冷汗浸透了后背——毒素正在和你的身体赛跑。`,choices:[{id:`o_0`,text:`灌大量水冲淡毒素`,effects:[],next:`__return__`,result:`你几乎喝光了手头所有的水。反复的呕吐之后，绞痛终于轻了一些。`}]},{id:`evt_c_fog_seep`,weight:12,minDay:1,maxTriggers:1,text:`寒流把雾气压得很低，白色的丝线正从窗缝、门缝、地板裂隙里往屋里渗。温度计的读数在肉眼可见地下滑。`,choices:[{id:`o_0`,text:`堵缝！布条加泥浆全用上`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`item`,item:`mat_cloth`,amount:-1},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`mat_cloth`,amount:-1}],next:`__return__`,result:`你把每一条缝都塞得严严实实。屋里的空气终于不再流动，体温保住了。
堵住了窗户，雾却从地板下面顶了上来，像有生命一样绕开你的补丁。`},{id:`o_1`,text:`生火驱雾`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`mat_wood`,amount:-2},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`热浪逼退白丝。火光映墙上，你们对峙到天明。
柴太湿，烟先把你熏出了眼泪。雾在你咳嗽声里继续推进。`},{id:`o_2`,text:`裹紧所有衣物硬扛`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`你把自己裹成一个茧。冷意还是钻进了骨头缝，但至少呼吸是自己的。`}]},{id:`evt_c_acid_drip`,weight:11,minDay:1,maxTriggers:1,text:`酸雨找到了屋顶的薄弱点，一滴、一滴落在你的床边，木板冒起细小的白烟。`,choices:[{id:`o_0`,text:`挪床+接水两不误`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`你用铁锅接住滴液，既保住地板又攒了一碗'化学试剂'——至少能腐蚀门锁。
半夜翻身时胳膊肘扫翻了锅。灼热的液体溅上手背。`},{id:`o_1`,text:`冲上房顶补漏`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`雨衣+油布+三分钟作业。补丁扛住了整场酸雨。
一颗雨点精准地落进你的衣领。那种疼，一辈子忘不掉。`}]},{id:`evt_c_beast_scratch`,weight:12,minDay:8,maxTriggers:1,text:`兽潮的爪子已经搭上了你的墙板。一下一下的抓挠从四面八方响起，像在挑选最薄的那面。`,choices:[{id:`o_0`,text:`举火把守在最薄的一面墙后`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`item`,item:`tool_torch`,amount:-1},{kind:`flag`,flag:`fought_beast`},{kind:`item`,item:`tool_torch`,amount:-1}],next:`__return__`,result:`火光让大多数爪子犹豫着收了回去。整夜你与一双反光的眼睛对峙。
有个胆大的探进头来。你一火把抡过去，它哀嚎着带倒了半面墙板。`},{id:`o_1`,text:`死守门口不出声`,effects:[{kind:`resource`,resource:`sanity`,delta:-7},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`你顶着门闩听它们巡视了一夜。天亮时门闩弯了，但门还在。
某个瞬间所有声音同时停止。这种安静比抓挠可怕一百倍。`}]},{id:`evt_c_thick_fog_knock`,weight:13,minDay:1,maxTriggers:1,text:`大白天，浓雾里传来礼貌的三下敲门声。门外站着一个白得近乎透明的人影，它隔着门问：'可以借个火吗？'`,choices:[{id:`o_0`,text:`隔着门递出打火机`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`lent_fire`},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`tool_lighter`,amount:-1}],next:`__return__`,result:`门缝里伸出的手接过打火机，又还回来——还带着余温，和一句'好人有好报'。雾散了，人没了。
打火机递出去就再也没回来。门外安静了很久很久。`},{id:`o_1`,text:`一言不发等它离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-9},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`fire_curse`}],next:`__return__`,result:`它问了十七遍'可以借个火吗'。每一遍的音调完全一致。你数完了全部十七遍。
它等到日头偏西才走。走前留下一句话：'你会需要火的，很快。'当晚你的火堆被风浇灭了。`}]},{id:`evt_daily_dew`,weight:10,minDay:1,maxTriggers:-1,text:`清晨，木屋外的草叶上凝满了露水。这是迷雾世界少有的馈赠。`,choices:[{id:`o_0`,text:`收集露水`,effects:[{kind:`item`,item:`water_clean`,amount:1}],next:`__return__`,result:`一壶清凉的露水。虽然不多，但干净。`}]},{id:`evt_daily_radio_news`,weight:8,minDay:10,maxTriggers:-1,text:`你摆弄着捡来的旧收音机。刺啦刺啦的杂音里，隐约夹着断续的人声广播。`,choices:[{id:`o_0`,text:`仔细辨认内容`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`heard_rescue_news`},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`「……救援船将于近期抵达东部海岸线……请幸存者……」你把频道记了下来。
只有杂音。也许只是风声。`}]},{id:`evt_daily_rat`,weight:10,minDay:1,maxTriggers:-1,text:`一只硕大的灰白老鼠大摇大摆地穿过你的木屋，嘴里还叼着什么。`,choices:[{id:`o_0`,text:`追打它`,effects:[{kind:`item`,item:`food_raw_meat`,amount:1},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`雾鼠丢下赃物逃了。你夺回了一块肉干——虽然已经脏了。
它钻进墙缝消失了。你的储备又少了一点。`},{id:`o_1`,text:`随它去`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`只要它别再带朋友来就行。`}]},{id:`evt_daily_birds`,weight:8,minDay:1,maxTriggers:-1,text:`一大群鸟突然从林子方向炸开般飞起，盘旋着不肯落下。它们在怕什么？`,choices:[{id:`o_0`,text:`记下方位，今天避开那边`,effects:[{kind:`resource`,resource:`sanity`,delta:-1},{kind:`flag`,flag:`birds_warned`}],next:`__return__`,result:`直觉救过很多次命了。你把那个方向刻在了门框上。`},{id:`o_1`,text:`鸟都跑了说明没危险？照常探索`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`一整天你都感觉背后有视线。晚上回想起来，还是后颈发凉。`}]},{id:`evt_daily_smoke`,weight:8,minDay:1,maxTriggers:-1,text:`透过雾隙，你看见远处升起一道笔直的烟柱——有人在你附近生火。而且那烟烧得又直又旺，像是在刻意打招呼。`,choices:[{id:`o_0`,text:`也生一堆烟回应（消耗木材）`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`item`,item:`mat_wood`,amount:-1},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`对面的烟柱欢快地扭了一下，随后熄灭——像是完成了任务。世界频道上多了一句：「东边的朋友你好呀」。你笑了。
你的烟刚起来，对面瞬间熄灭了。之后那里再没有升起过烟。`},{id:`o_1`,text:`保持隐蔽，观察一天`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`你趴在窗口看了一整天。烟柱的主人很谨慎，你们谁也没找到谁。`}]},{id:`evt_daily_carving`,weight:7,minDay:1,maxTriggers:-1,text:`你整理木屋时发现门框内侧刻着密密麻麻的正字，最下面一行小字：「第9天 我还活着 你们也要活下去」。最后几刀明显没了力气。`,choices:[{id:`o_0`,text:`在旁边刻上自己的正字`,effects:[{kind:`resource`,resource:`sanity`,delta:7}],next:`__return__`,result:`一刀一刀，你把「第一天」刻得很深。从今天起，这间屋子的门框上有两个人的日子。`}]},{id:`evt_daily_dream_family`,weight:8,minDay:1,maxTriggers:-1,text:`夜里你梦见了家：厨房的灯、沙发的凹陷、阳台上晾着没干的衣服。醒来时枕头湿了一片，屋里冷得像冰窖。`,choices:[{id:`o_0`,text:`把梦里的细节写在墙上`,effects:[{kind:`resource`,resource:`sanity`,delta:9}],next:`__return__`,result:`「厨房灯是暖黄色的。」写下来的瞬间，那些东西就永远不会丢了。你要活着回去核对每一个细节。`},{id:`o_1`,text:`不敢回想，立刻起身干活`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`item`,item:`mat_wood`,amount:1}],next:`__return__`,result:`麻木是很好的止痛药。你劈了一上午柴，手掌磨出了血泡也没觉得疼。`}]},{id:`evt_daily_tooth`,weight:6,minDay:1,maxTriggers:-1,text:`早上啃黑面包时，一颗牙晃了。你对着水洼照了照——牙龈苍白，嘴唇也裂着。你的身体开始抗议了。`,choices:[{id:`o_0`,text:`省着点吃，把好的留给明天`,effects:[{kind:`resource`,resource:`sanity`,delta:-1}],next:`__return__`,result:`细水长流。虽然还是饿，但至少不用和自己的牙较劲。`},{id:`o_1`,text:`该吃吃！身体是撑出来的`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`你狠狠嚼完了双份口粮。牙齿的问题……以后再说吧。`}]},{id:`evt_daily_rain_mushroom`,weight:7,minDay:1,maxTriggers:-1,text:`昨夜下过雨，屋后的腐木上冒出了一片嫩菌子。迷雾世界的菌子长得格外快，也格外……随机。`,choices:[{id:`o_0`,text:`挑小的采`,effects:[{kind:`item`,item:`food_berry`,amount:2}],next:`__return__`,result:`小菌子最安全，这是老饕的常识。今晚加菜！
还是有两条漏网之鱼混进锅里了……半夜你抱着肚子在屋里转圈。`},{id:`o_1`,text:`全采全晒，存起来`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`item`,item:`mat_charcoal`,amount:1}],next:`__return__`,result:`晒干后能放很久。万一哪天断粮，这些干菌子就是救命稻草。`}]},{id:`evt_daily_knock_help`,weight:8,minDay:1,maxTriggers:-1,text:`世界频道上，一个坐标离你不远的幸存者发消息：「谁有多余的水 我三天没喝干净水了 好心人有吗」。`,choices:[{id:`o_0`,text:`送他一份净水`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`item`,item:`water_clean`,amount:-1},{kind:`item`,item:`food_berry`,amount:1}],next:`__return__`,result:`你把水放在了约定的石头下。傍晚路过时，石头上多了一把野蜂蜜。「谢谢。活下去。」——人心在雾里也能传热。`},{id:`o_1`,text:`送一份脏水（也是心意）`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`water_dirty`,amount:-1}],next:`__return__`,result:`「谢了 聊胜于无」。频道那头的语气听不出喜怒。但至少你出手了。`},{id:`o_2`,text:`自己也快断了，装没看见`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`那条求助消息后来没有更新了。你告诉自己：先活下来的人才有资格谈善良。`}]},{id:`evt_daily_exercise`,weight:7,minDay:1,maxTriggers:-1,text:`难得的晴朗间隙。你在木屋前伸了个懒腰，决定活动一下僵硬的身体——毕竟在这个世界，身体是唯一的本钱。`,choices:[{id:`o_0`,text:`做一套广播体操（第七套）`,effects:[{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`熟悉的口号让肌肉都记起了学生时代。微微出汗，浑身舒畅。`},{id:`o_1`,text:`算了，多睡十分钟`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`被窝是人类最伟大的发明。虽然起来时更冷了，但精神确实好了些。`}]},{id:`evt_daily_channel_fight`,weight:8,minDay:1,maxTriggers:-1,text:`世界频道上两个人吵起来了：「你凭什么拿走我藏的箱子！」「迷雾里的东西没有主人！」几百人在围观，还有人开了赌盘猜谁赢。`,choices:[{id:`o_0`,text:`围观吃瓜`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`吵了整整一上午，最后两人约在雾里单挑。频道安静了一小时后，有人发了句「人没了」。全场沉默。你默默关掉了面板。`},{id:`o_1`,text:`发一句：都少说两句 囤货要紧`,effects:[{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`你的发言被顶到了热评第一。争吵不了了之。理性的人还是比想象中多一点。`}]},{id:`evt_daily_old_news`,weight:6,minDay:1,maxTriggers:-1,text:`你在柜子底层翻出一叠穿越前的旧报纸。头条日期是灾难前一天：「本市明日有雾 出行请注意安全」。命运开了一个巨大的玩笑。`,choices:[{id:`o_0`,text:`仔细读一遍这些新闻`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`菜价、球赛、明星八卦……这些琐碎到可笑的日常，现在读来字字珍贵。你把报纸仔细收好：这是文明存在过的证据。`},{id:`o_1`,text:`拿来引火`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`mat_charcoal`,amount:1}],next:`__return__`,result:`头版头条烧得最快。火焰里有油墨的味道，像是在替那个世界说最后的告别。`}]},{id:`evt_d_stray_cat`,weight:9,minDay:1,maxTriggers:-1,text:`一只瘦骨嶙峋的三花猫蹲在你的柴堆上，用一种'本喵考察过了，这里能活'的眼神看着你。`,choices:[{id:`o_0`,text:`分它一点吃的`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`item`,item:`food_berry`,amount:-1}],next:`__return__`,result:`它吃得很慢很斯文，吃完在你门口蹭了蹭。从此你的屋檐下多了一位编外居民。`},{id:`o_1`,text:`装作没看见`,effects:[{kind:`resource`,resource:`sanity`,delta:-1},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`它盯了你三秒，跳下柴堆走了。尾巴尖甩了甩，像在说'行吧'。
当晚你听见它在屋顶上叫了一整夜。声音像小孩哭。`}]},{id:`evt_d_postman`,weight:6,minDay:1,maxTriggers:-1,text:`一个背着巨大邮包的人影从雾里走出来，制服笔挺，皮鞋锃亮。'您的信。'他把一封空信封递给你，然后转身离开。`,choices:[{id:`o_0`,text:`追上去问是谁寄的`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`postman_met`},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`postman_met`}],next:`__return__`,result:`'寄件人是未来的您。'他没有回头，'他说这封信很重要——所以是空的，内容要您自己写。'
你追进了雾里，直到看不见任何东西。回家后你在信封内衬摸到一行凸起的字：'别回头。'`},{id:`o_1`,text:`收下信封不追问`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`有些问题不适合问穿制服的人。你把空信封压在枕头下。`}]},{id:`evt_d_mirrors`,weight:7,minDay:1,maxTriggers:-1,text:`你在碎裂的后视镜前洗手。水声停了以后，镜子里的你还保持着洗手的动作。`,choices:[{id:`o_0`,text:`直视它`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`你们对峙了很久。最后它先眨了眼——然后你发现自己一直闭着眼。
你冲它做了个鬼脸。它做了一个更丑的。不知为何你想笑，恐惧就这样散了。`},{id:`o_1`,text:`用布把镜子蒙上`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`眼不见为净。但你知道它在布后面看着你吃饭、睡觉、呼吸。`}]},{id:`evt_d_rainbow`,weight:6,minDay:1,maxTriggers:-1,text:`两场浓雾之间居然出现了彩虹，一头扎进雾海深处，像通往另一个世界的桥。`,choices:[{id:`o_0`,text:`对着彩虹发一会呆`,effects:[{kind:`resource`,resource:`sanity`,delta:10}],next:`__return__`,result:`七种颜色在灰白世界里亮得刺眼。你想起小时候也这样看过天。`},{id:`o_1`,text:`朝彩虹尽头走一段`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`当然没有宝藏。但你采到了一大捧被雨水催开的野花，插在窗边的罐头瓶里。
你越走越远，回头的路标全被雾吞了。凭记忆摸索了两小时才回来，又累又饿。`}]},{id:`evt_d_sneeze`,weight:8,minDay:1,maxTriggers:-1,text:`今天喷嚏打个不停，鼻音重得像另一个人在说话。`,choices:[{id:`o_0`,text:`多喝热水硬扛`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`热流滚过喉咙，好受了一点。
热水从鼻子里呛了出来。狼狈，没用。`},{id:`o_1`,text:`吃点好的增强抵抗力`,effects:[{kind:`item`,item:`food_canned`,amount:-1},{kind:`item`,item:`food_canned`,amount:-1}],next:`__return__`,result:`一整罐罐头下肚，身体有了打仗的本钱。
吃完就吐了。病中肠胃根本受不了油腻。`}]},{id:`evt_d_ants`,weight:7,minDay:1,maxTriggers:-1,text:`门前的蚂蚁排成一条黑线，衔着白色卵粒向高处迁移。老话讲，这是大雨的预告。`,choices:[{id:`o_0`,text:`相信蚂蚁，加固屋顶`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`roof_fixed`}],next:`__return__`,result:`你抢在大雨前补好了漏点。夜里雨声如鼓，屋里滴雨未落。
白忙一场，一夜无雨。但至少劳动让人睡得香。`},{id:`o_1`,text:`观察蚁群路线找它们的粮仓`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-1}],next:`__return__`,result:`顺藤摸瓜挖出一小堆草籽。炒一炒能顶一顿。
你趴在地上看了半小时，膝盖印都留在了地上。什么也没捞着。`}]},{id:`evt_d_radio_static`,weight:8,minDay:10,maxTriggers:-1,text:`深夜没开机，收音机却自己响起细弱的电流声，像有人隔着频段在犹豫要不要说话。`,choices:[{id:`o_0`,text:`凑近听清楚`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`rescue_hint`},{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`'……第七区的幸存者请注意……'断断续续的坐标信息！你抄了下来。
杂音里渐渐分辨出一段哼唱——是哄孩子睡觉的调子。你默默听了很久。`},{id:`o_1`,text:`拔掉电池`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`radio_silenced`}],next:`__return__`,result:`有些频道不该通。你把电池收进铁盒，压在箱底。`}]},{id:`evt_d_old_news`,weight:8,minDay:1,maxTriggers:-1,text:`风把一张旧报纸糊在你的窗户上，日期正是迷雾降临那天。头版标题只有半截：'全球性浓雾……请市民勿要……'`,choices:[{id:`o_0`,text:`读完每一个字`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`后半截被人撕走了，撕口很整齐——是故意不让你看的。
角落里有一则寻人启事：寻找走失老人，特征：会说梦话，内容为天气预报。`},{id:`o_1`,text:`留着引火`,effects:[{kind:`item`,item:`mat_charcoal`,amount:1}],next:`__return__`,result:`纸是好纸，火是真火。过去的事就该烧掉取暖。`}]},{id:`evt_d_dandelion`,weight:7,minDay:1,maxTriggers:-1,text:`墙角钻出一株蒲公英，绒球完好无损。在这个连灰尘都带着湿气的世界里，它干净得不像话。`,choices:[{id:`o_0`,text:`吹散它许个愿`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`种子乘着无风的空气飞出很远很远。你许的愿是'明天也想看见太阳'。
你一吹，绒毛全粘在了自己脸上。愿望没许成，倒把自己逗笑了。`},{id:`o_1`,text:`连根移栽到窗台`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`window_garden`}],next:`__return__`,result:`罐头盒、溪泥、蒲公英。你的窗台有了第一个住客。`}]},{id:`evt_d_caravan`,weight:6,minDay:1,maxTriggers:-1,text:`远处传来铃铛声和拖长的叫卖：'盐——火柴——针线——拿粮食来换嘞——'一支小商队正沿着雾墙边缘移动。`,choices:[{id:`o_0`,text:`拿物资去换盐`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`item`,item:`mat_wood`,amount:-3},{kind:`item`,item:`salt`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`三捆木柴换了小半袋粗盐。商人临走多塞给你一颗水果糖：'看你面善。'
交易到一半起了雾风，商队突然加速离开，你追出去百米无功而返。`},{id:`o_1`,text:`躲在屋里观察他们`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`caravan_passed`},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`商队共五人两车。他们经过你家时敲了敲门：'有人吗？我们不留货。'你没应。
你注意到队尾的人走路姿势很怪，像是脚不沾地。铃声远了以后，你才发现自己在发抖。`}]},{id:`evt_d_photo_memory`,weight:6,minDay:1,maxTriggers:-1,text:`你又拿出那张旧照片。这次你没有看背面，而是盯着正面的海滩看了很久很久。`,choices:[{id:`o_0`,text:`回忆和老K的相识`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`照片上的年轻人笑得一嘴白牙。那时候谁都以为明天会更好。你想给他讲讲后来发生的事。`},{id:`o_1`,text:`把照片朝下扣在桌上`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`有些记忆需要扣一会儿，等心里那块地翻松了再翻开看。`}]},{id:`evt_d_fogbell`,weight:5,minDay:1,maxTriggers:-1,text:`正午十二点整，浓雾深处传来了钟声。一下，一下，不多不少敲了十二下。这个世界没有钟楼。`,choices:[{id:`o_0`,text:`跟着数完整`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`十二下，分毫不差。数完的瞬间你莫名安心：至少还有什么东西在守时。
第十二下之后，隔了很久，又有极轻的第十三下。你假装没听见。`},{id:`o_1`,text:`捂住耳朵干活`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:1}],next:`__return__`,result:`你劈了一下午柴。斧头声和钟声混在一起，反而踏实。`}]},{id:`evt_edge_driftwood`,weight:10,minDay:1,maxTriggers:1,text:`雾气在脚下流淌。你在一截倒伏的巨木旁停下——木头深处似乎嵌着什么东西，泛着微弱的反光。`,choices:[{id:`o_0`,text:`费力撬出来`,effects:[{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`是一把还算完好的手电筒！电池居然还有电。
只是个空罐头盒。白费力气。`},{id:`o_1`,text:`先劈开木头当柴火`,effects:[{kind:`resource`,resource:`sanity`,delta:1},{kind:`item`,item:`mat_wood`,amount:2}],next:`__return__`,result:`干燥的木柴，今晚的火有着落了。`}]},{id:`evt_edge_bottle`,weight:6,minDay:1,maxTriggers:1,text:`浓雾边缘，一只玻璃瓶卡在礁石缝里，瓶中卷着一张纸条：「如果你也看到这张纸——你不是一个人。」`,choices:[{id:`o_0`,text:`把纸条小心收好`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`知道有人在同一片迷雾里挣扎着，心里竟然踏实了一些。`}]},{id:`evt_edge_ashes`,weight:9,minDay:1,maxTriggers:1,text:`一圈石头围着一堆灰烬——有人在这里过夜。灰烬中央似乎还有没烧尽的东西。`,choices:[{id:`o_0`,text:`翻找灰烬`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`tool_lighter`,amount:1}],next:`__return__`,result:`半截烧焦的布料还能用。主人应该走得不远……
只有灰。但灰是温的——就在刚才，还有人坐在这里。
灰下埋着一个打火机！主人大概是忘了它。`},{id:`o_1`,text:`别碰，赶紧离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`在迷雾里，其他幸存者未必是朋友。`}]},{id:`evt_edge_mire`,weight:8,minDay:1,maxTriggers:1,text:`退潮后的滩涂上，泥沼里陷着半个箱子，在雾里若隐若现。泥沼看起来不深——大概。`,choices:[{id:`o_0`,text:`卷起裤腿下去挖`,effects:[{kind:`item`,item:`food_canned`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`箱子里是几罐保存完好的罐头！泥浆也算不了什么。
箱子是空的。而你的一只鞋永远留在了泥沼里，脚也被硬物划伤了。`},{id:`o_1`,text:`用树枝够一够`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`够到了！一小卷绳索从箱缝里滑了出来。
树枝断了，箱子纹丝不动。`}]},{id:`evt_forest_boar`,weight:12,minDay:1,maxTriggers:1,text:`灌木丛猛地一颤——一头獠牙发黑的野猪正低头拱土，距离你不到十步。它还没发现你。`,choices:[{id:`o_0`,text:`握紧武器冲上去（战斗）`,effects:[{kind:`item`,item:`food_raw_meat`,amount:2},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`搏斗中你被撞翻在地，但最终结果了它。一大块鲜肉！
你灵活地爬上了树。野猪撞了几下树干，悻悻离去。
野猪的獠牙擦过你的大腿！你连滚带爬才逃开。`},{id:`o_1`,text:`悄悄绕开`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`你屏住呼吸退进树影。它哼了一声，走远了。
脚下枯枝一声脆响！野猪抬头直视你的方向……你狂奔逃命。`},{id:`o_2`,text:`【猎手】算好风向，从上风口接近`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`food_raw_meat`,amount:3}],next:`__return__`,result:`一击毙命。猎手的直觉从不出错。`}]},{id:`evt_forest_mushroom`,weight:10,minDay:1,maxTriggers:1,text:`一棵朽木下长着一片蘑菇，肥厚饱满。其中几朵伞盖泛着不自然的紫色。`,choices:[{id:`o_0`,text:`只采白色的`,effects:[{kind:`item`,item:`food_berry`,amount:2}],next:`__return__`,result:`安全第一。晚饭有着落了。
晚上吃完就开始头晕……好像混进去毒蘑菇！`},{id:`o_1`,text:`紫色的也许能卖钱？全采了`,effects:[{kind:`item`,item:`med_sedative`,amount:1},{kind:`item`,item:`food_berry`,amount:1}],next:`__return__`,result:`你赌赢了——这种「雾菇」晒干后是很好的安神药引。
当晚你就上吐下泻。教训惨痛。`}]},{id:`evt_forest_old_trap`,weight:9,minDay:1,maxTriggers:1,text:`锈迹斑斑的捕兽夹半埋在落叶里，弹簧还绷得紧紧的。夹子上挂着几缕灰白色的毛——不是任何你认识的动物。`,choices:[{id:`o_0`,text:`小心拆解它`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`item`,item:`mat_rope`,amount:1}],next:`__return__`,result:`咔哒一声，夹子松开了。弹簧和铁片都是好材料。
咔嚓——夹子猛地弹合，咬住了你的手指！`},{id:`o_1`,text:`把它整个搬回去当武器`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2}],next:`__return__`,result:`沉是沉了点，但这玩意儿既能防身又能再利用。
搬运途中夹子突然弹开，划破了你的小臂。`}]},{id:`evt_forest_sap`,weight:8,minDay:1,maxTriggers:1,text:`一棵粗壮的白桦树干上有道旧的切口，树汁正顺着痕迹缓缓渗出，在树下积成一个小水洼。`,choices:[{id:`o_0`,text:`切开树皮接树汁`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`food_berry`,amount:1},{kind:`item`,item:`water_dirty`,amount:1}],next:`__return__`,result:`清甜微凉的树汁，带着桦树的清香。这是迷雾里少见的温柔。
切口流出的汁液发苦发浊——这棵树病了。`},{id:`o_1`,text:`砍下带切口的树皮引火`,effects:[{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`item`,item:`mat_wood`,amount:1}],next:`__return__`,result:`桦树皮是最好的火引子，一点就着。`}]},{id:`evt_market_pharmacy`,weight:11,minDay:1,maxTriggers:1,text:`超市角落的药店柜台玻璃碎了一地，处方药被搜刮了大半。柜台最里面有个带锁的抽屉，锁扣已经松动。`,choices:[{id:`o_0`,text:`撬开抽屉`,effects:[{kind:`item`,item:`med_antibiotic`,amount:1},{kind:`item`,item:`med_painkiller`,amount:1},{kind:`resource`,resource:`sanity`,delta:-2},{kind:`item`,item:`med_painkiller`,amount:1}],next:`__return__`,result:`抗生素、止痛药——这一抽屉能救命！
只有一堆过期维生素和一本药品说明书。
抽屉里盘着一条冬眠的蛇！它受惊咬了你一口就窜走了。`},{id:`o_1`,text:`太吵容易招人，放弃`,effects:[{kind:`resource`,resource:`sanity`,delta:-1}],next:`__return__`,result:`谨慎点好。你退出了药店区。`}]},{id:`evt_market_freezer`,weight:10,minDay:1,maxTriggers:1,text:`生鲜区的冷冻库门虚掩着，冷气还在往外冒——这里居然还通着电？货架上的冻肉让你的胃狠狠抽搐了一下。`,choices:[{id:`o_0`,text:`冲进去能拿多少拿多少`,effects:[{kind:`item`,item:`food_raw_meat`,amount:2},{kind:`item`,item:`food_raw_meat`,amount:1}],next:`__return__`,result:`两大块冻肉抱在怀里，透心凉，心里美！
地面的冰霜滑得像陷阱。你摔了个结实，怀里的肉也掉了一半。`},{id:`o_1`,text:`研究一下为什么还有电`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`found_generator`}],next:`__return__`,result:`你顺着电线摸过去，发现一台柴油发电机还在低吼。油箱里的存油……被抽走了大半，只留下一层底油和一股汽油味。`}]},{id:`evt_creek_fishing`,weight:10,minDay:1,maxTriggers:1,text:`溪水清澈见底，几条肥美的鱼在卵石间游弋。这里难得没有浓雾。`,choices:[{id:`o_0`,text:`下竿垂钓`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`浮漂一顿——两条鱼！今晚加餐。
一下午只有一条小鱼咬钩。
鱼没钓到，倒是脚底滑进溪水里，浑身湿透。`},{id:`o_1`,text:`顺便灌满水壶`,effects:[{kind:`item`,item:`water_clean`,amount:2}],next:`__return__`,result:`上游的水很干净，直接喝也没大碍。`}]},{id:`evt_creek_upstream`,weight:9,minDay:1,maxTriggers:1,text:`上游漂下来一个鼓鼓囊囊的防水包，卡在了两块岩石之间。包身写着一行褪色的字：户外用品店·促销。`,choices:[{id:`o_0`,text:`下水去捞`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`item`,item:`water_dirty`,amount:1}],next:`__return__`,result:`包里是一条崭新的鱼线和一把多功能刀片！今天运气不错。
水流比看上去急得多！你呛了好几口水才爬上岸，包也漂走了。`},{id:`o_1`,text:`用鱼竿把包勾过来`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`item`,item:`mat_rope`,amount:1},{kind:`item`,item:`mat_cloth`,amount:1}],next:`__return__`,result:`工具用对了地方。包里的东西一件不少。`}]},{id:`evt_creek_reflection`,weight:8,minDay:1,maxTriggers:1,text:`你在溪边蹲下想洗把脸。水面平静下来的那一刻，倒影里的「你」比你慢了半拍才抬手。`,choices:[{id:`o_0`,text:`死死盯住它，看谁先眨眼`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`faced_reflection`},{kind:`resource`,resource:`sanity`,delta:-14}],next:`__return__`,result:`对峙了不知多久，「它」先散开了。溪水依旧清澈。你忽然觉得没那么怕了——连自己的影子都吓不住你。
倒影突然咧嘴笑了。你踉跄着后退，溅起的水花打碎了那张脸。`},{id:`o_1`,text:`立刻转身离开，不再看水`,effects:[{kind:`resource`,resource:`sanity`,delta:-7}],next:`__return__`,result:`眼不见为净。但那一整天，你都在回想那慢掉的半拍。`}]},{id:`evt_village_cellar`,weight:11,minDay:1,maxTriggers:1,text:`一间半塌的农舍后面，一扇木门斜嵌在地里——地窖。门轴锈死了，门缝里飘出陈腐的气息，以及……若有若无的食物味。`,choices:[{id:`o_0`,text:`打开手电筒下去`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_biscuit`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1}],next:`__return__`,result:`光柱扫过：整整齐齐两排储物架！罐头、腊肠、腌菜……这家人走得一定很匆忙。
架子上的食物早就烂透了。但角落里有只完好的急救箱。`},{id:`o_1`,text:`摸黑下去`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`你凭着触觉摸到了几个罐头，赶紧逃出了黑暗。
第三级台阶是空的！你重重摔进黑暗里，有什么液体淋了一头。你连滚带爬冲向门口的光亮。`},{id:`o_2`,text:`做个记号，改日再来`,effects:[],next:`__return__`,result:`工欲善其事，必先利其器。至少要等有光源再说。`}]},{id:`evt_village_well`,weight:9,minDay:1,maxTriggers:1,text:`村子中央有一口古井。你朝井底扔了颗石子——很久很久之后，传来一声轻响。不对，井没那么深。而且刚才那声音……像是被什么软东西接住的。`,choices:[{id:`o_0`,text:`吊着绳子下去看看`,effects:[{kind:`item`,item:`mat_rope`,amount:-1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`item`,item:`mat_rope`,amount:-1},{kind:`item`,item:`key_map_fragment`,amount:1},{kind:`item`,item:`med_painkiller`,amount:1}],next:`__return__`,result:`井底的「软东西」是一个前人留下的背包！里面的物资保存完好。
背包旁边靠着一具白骨，手里攥着半张地图。你礼貌地道了歉，取走了地图和背包里的药。`},{id:`o_1`,text:`对着井口大喊一声`,effects:[{kind:`resource`,resource:`sanity`,delta:-9}],next:`__return__`,result:`「喂——」回声散尽后，井底传来极轻极轻的一声回应。你决定不去细听那是回声还是别的什么。`}]},{id:`evt_mine_cart`,weight:10,minDay:1,maxTriggers:1,text:`锈蚀的铁轨伸进矿洞深处。一辆还算完整的矿车停在岔口，轨道上方的指示牌歪歪斜斜：「3号矿脉 →」。`,choices:[{id:`o_0`,text:`推着矿车沿轨道深入`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`mat_stone`,amount:3},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`吱嘎声里，矿车把你送到了一处富矿断面！石料和金属管够。
半路一根枕木断裂，矿车脱轨侧翻！你被甩进了积水里。`},{id:`o_1`,text:`只在岔口附近敲敲打打`,effects:[{kind:`item`,item:`mat_stone`,amount:2}],next:`__return__`,result:`稳妥起见。你捡到了些散落的矿石。`}]},{id:`evt_miner_helmet`,weight:9,minDay:1,maxTriggers:1,text:`巷道尽头靠着墙坐着一位矿工——或者说，曾经是矿工的人。他头上的安全帽矿灯竟然还亮着一点幽光，膝盖上摊着一个笔记本。`,choices:[{id:`o_0`,text:`取下矿灯，合上本子`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`read_miner_note`},{kind:`item`,item:`tool_flashlight`,amount:1}],next:`__return__`,result:`矿灯还能用！本子最后一页写着：「雾会听。别在洞里说想家。」你把这句话记住了，也把他的双手交叠好了。`},{id:`o_1`,text:`读完笔记本的每一页`,effects:[{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`read_miner_note`},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`med_sedative`,amount:1}],next:`__return__`,result:`整整四十页，记录的都是同一件事：他在雾里听见了他女儿的声音，一天比一天近。「明天我就去找她」。最后一页是空白。你默默取下了矿灯。`}]},{id:`evt_deepfog_wall`,weight:15,minDay:1,maxTriggers:1,text:`火把的光推开浓雾，照出一面光滑如镜的岩壁。贴近了才发现——岩壁里封着无数张一闪即逝的脸。它们在同时低语，说的都是你熟悉的话。`,choices:[{id:`o_0`,text:`凑近去听清楚一句`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`flag`,flag:`whisper_hint`},{kind:`resource`,resource:`sanity`,delta:-16}],next:`__return__`,result:`千百个声音里，你捕捉到了一句：「……第七天，向北……」。你不知道这意味着什么，但你记住了。
所有声音在同一瞬间叫出了你的名字。你捂着耳朵跌坐在地，火把差点熄灭。`},{id:`o_1`,text:`捂住耳朵快步通过`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`不看，不听。低语声在身后渐渐远去，像潮水退出沙滩。`}]},{id:`evt_signal_plane`,weight:7,minDay:10,maxTriggers:1,text:`头顶的浓雾忽然震颤起来——那是引擎的轰鸣！有什么飞机正在雾层上方飞过。信号枪在你怀里烫得像一块炭。`,choices:[{id:`o_0`,text:`朝天发射信号弹！`,effects:[{kind:`resource`,resource:`sanity`,delta:20},{kind:`flag`,flag:`flare_used`},{kind:`item`,item:`key_signal_gun`,amount:-1},{kind:`resource`,resource:`sanity`,delta:-18},{kind:`item`,item:`key_signal_gun`,amount:-1}],next:`__return__`,result:`红色的光柱刺穿了浓雾！轰鸣声盘旋了两圈，似乎……注意到了什么。雾层恢复了平静，但你知道他们看见了。
信号弹哑火了。你看着手里这坨废铁，第一次在迷雾里哭出了声。`},{id:`o_1`,text:`留着，也许该在最后一天用`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`轰鸣声远去了。你盯着自己的手看了很久。这个决定是对是错，没人知道。`}]},{id:`evt_edge_sign`,weight:7,minDay:1,maxTriggers:1,text:`一块歪斜的金属警示牌立在雾中：「前方区域 浓度异常 禁止入内」。落款处被人用马克笔加了一行字：「别信牌子 那边箱子多」。`,choices:[{id:`o_0`,text:`听后半句的`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`food_biscuit`,amount:1},{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`牌子后面果然是个小型补给点！留言的好人，祝你平安。
你在浓得化不开的雾里摸到了一个箱子——然后被里面窜出的东西咬了！你退回来时手里只抓着半张网。`},{id:`o_1`,text:`听牌子的`,effects:[{kind:`resource`,resource:`sanity`,delta:1}],next:`__return__`,result:`官方的牌子总不会害人。你绕开了那片区域。也许错过了箱子，但保住了命。`}]},{id:`evt_edge_dog`,weight:7,minDay:1,maxTriggers:1,text:`「汪！汪汪！」狗叫声从雾里传来，声音里带着急切。有人养着狗？在这个世界里，一条狗比一把刀更稀罕。`,choices:[{id:`o_0`,text:`循声找过去`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`是一条被铁链缠住的老猎犬！你帮它解开缠结，它舔了舔你的手，叼来了一截绳子——像是回礼。
叫声停了。你找了半小时一无所获，倒是被荆棘划了一腿的口子。`},{id:`o_1`,text:`学两声狗叫逗逗它`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`远处的狗叫兴奋地回应了你，一声接一声。虽然幼稚，但你笑了——穿越以来第一次。
你的模仿太烂了，对面的叫声突然变得低沉凶狠。你明智地撤退了。`}]},{id:`evt_forest_watchtower`,weight:8,minDay:1,maxTriggers:1,text:`一座消防瞭望塔立在林间空地上，梯子锈蚀但还算结实。塔顶视野应该能穿透一部分迷雾——如果上面安全的话。`,choices:[{id:`o_0`,text:`爬上塔顶眺望`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`climbed_tower`},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`从高处看，雾海像一片灰白色的海洋缓缓起伏。你辨认出了超市和矿洞的方向！这一眼值回票价。
半路一根横档断裂！你挂在高空晃了半分钟才爬回去。心脏差点从嗓子眼里跳出来。`},{id:`o_1`,text:`搜查塔底的值班室`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`item`,item:`food_berry`,amount:1}],next:`__return__`,result:`值班室里有一床毛毯、半瓶驱蚊水和一本翻烂的扑克。你带走了能带的。`}]},{id:`evt_forest_hive`,weight:7,minDay:20,maxTriggers:1,text:`低矮的灌木上挂着一个野蜂巢，个头不小。蜂蜜是迷雾里的顶级奢侈品——如果操作得当的话。`,choices:[{id:`o_0`,text:`用湿布蒙面摘取`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`item`,item:`mat_cloth`,amount:-1},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`med_painkiller`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`item`,item:`mat_cloth`,amount:-1}],next:`__return__`,result:`收获满满一大块蜜脾！甜到发齁的幸福。
布没蒙严实。你顶着三个大包狼狈逃窜，蜂蜜也没敢要了。`},{id:`o_1`,text:`太危险，放弃`,effects:[],next:`__return__`,result:`你和蜜蜂井水不犯河水。走远些还能听见嗡嗡声。`}]},{id:`evt_market_lockers`,weight:8,minDay:1,maxTriggers:1,text:`员工休息室的一排储物柜，大部分敞开着被掏空了。只剩三扇柜门还锁着——里面会是什么？`,choices:[{id:`o_0`,text:`逐个撬开`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`sanity`,delta:4},{kind:`item`,item:`mat_cloth`,amount:2}],next:`__return__`,result:`第一格：半包烟。第二格：换洗衣服。第三格：一把多功能小刀！这波不亏。
三格全被撬过了，只剩一张全家福照片掉在地上。你把它摆正了才走。
第三格里蹿出一只受惊的橘猫，撞翻了整排柜子！混乱中你捞到了它窝里垫着的旧外套。`},{id:`o_1`,text:`只拿走明面上的东西`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:1}],next:`__return__`,result:`休息室的沙发垫下摸出了几颗糖。甜味让今天好过了一点。`}]},{id:`evt_market_backdoor`,weight:9,minDay:1,maxTriggers:1,text:`货架区早就被搬空了，但收银台后面的仓库卷帘门只拉开了一半——下面压着一个轮胎。里面黑漆漆的，深不见底。`,choices:[{id:`o_0`,text:`用轮胎垫着钻进去`,effects:[{kind:`item`,item:`food_biscuit`,amount:2},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`仓库深处还有整托盘的货！你扛了两箱压缩饼干出来，累得够呛。
里面的味道不对劲。你的手电照到了角落里一堆白骨——是老鼠的。数不清的老鼠骨头。你退出得比进去快十倍。`},{id:`o_1`,text:`在门口喊两嗓子试试动静`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`回声散尽，毫无动静。看来是安全的……但你也喊来了别的什么注意。
黑暗里有东西回应了你——不是语言，是一阵密集的、窸窣的移动声。你默默把卷帘门又压低了一点。`}]},{id:`evt_creek_glint`,weight:8,minDay:1,maxTriggers:1,text:`阳光难得地刺破雾层，溪水深处有什么东西反了一下光——就在最深的那个水湾里。`,choices:[{id:`o_0`,text:`深吸一口气潜下去`,effects:[{kind:`item`,item:`tool_iron_axe`,amount:1},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`是一把沉在河底的铁斧！斧刃还泛着新磨的光。谁把它扔在这的？
你摸到了冰凉的东西，浮上来才发现只是块亮片石头。顺带呛了半肚子水。`},{id:`o_1`,text:`用鱼竿的线钩它`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`三钩两钩，钩上来一顶金属安全帽——帽檐下卡着一小块碎晶石。`}]},{id:`evt_creek_waterwheel`,weight:8,minDay:1,maxTriggers:1,text:`溪流上游立着一架废弃的老水车，轮叶上挂满了青苔。它还在缓缓转动，吱呀、吱呀，像这个世界残存的一口气。`,choices:[{id:`o_0`,text:`检查水车后的蓄水池`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`food_raw_fish`,amount:1}],next:`__return__`,result:`池子里积着经过沉淀的清水，还有几条被困住的鱼！水车替你干了半天的活。`},{id:`o_1`,text:`拆一块轮叶当木材`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`item`,item:`mat_wood`,amount:2}],next:`__return__`,result:`老水车吱呀了两声，像是在抗议。你取走了一块腐朽的轮叶，心里有点过意不去。`}]},{id:`evt_village_school`,weight:9,minDay:1,maxTriggers:1,text:`「希望小学」的门牌斜挂在锈蚀的大门上。黑板上还留着最后一课的板书：「同学们，明天我们学习《春天来了》。」教室里桌椅东倒西歪，值日表上的名字已经褪色。`,choices:[{id:`o_0`,text:`翻找教师的讲台柜`,effects:[{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`tool_radio`,amount:1},{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`food_biscuit`,amount:1}],next:`__return__`,result:`教师们的抽屉里翻出了急救包和一台收音机！知识就是力量， literal意思。
粉笔、教案、一面小红旗。你在讲台抽屉最里面摸到了半包压缩饼干——某个老师留下的应急粮。`},{id:`o_1`,text:`在黑板上写点什么`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`你拿起粉笔，在《春天来了》下面写上：「第X天，我还活着。」然后对着空教室上了一堂只有自己学生的课。心情竟然好了不少。`}]},{id:`evt_village_scarecrow`,weight:8,minDay:1,maxTriggers:1,text:`晒谷场中央立着一个稻草人。你发誓刚才路过时它的脸朝向左边——现在，它正对着你。破草帽下的黑洞洞的脸，说不清是错觉还是别的。`,choices:[{id:`o_0`,text:`走过去把它推倒`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`item`,item:`mat_cloth`,amount:1},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`就是个普通稻草人，木杆加稻草。你拆了它的「衣服」（其实是块不错的油布）扬长而去。战胜恐惧最好的方式就是拆了它。
你的手刚碰到它，整具稻草人突然瘫软倒下——里面的木架子早就朽断了。但你被吓得连退五步，摔进了谷堆里。`},{id:`o_1`,text:`朝它鞠一躬再绕行`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`入乡随俗，礼多鬼不怪。你郑重地鞠了一躬，从晒谷场边缘绕了过去。身后似乎传来一声轻笑，也可能是风。`}]},{id:`evt_mine_pool`,weight:9,minDay:1,maxTriggers:1,text:`巷道尽头是一片墨绿色的地下积水潭，水面平静得像镜面。潭边的岩壁上有敲凿的痕迹——这里曾经被人开采到水下。`,choices:[{id:`o_0`,text:`潜水探一探矿壁`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-10}],next:`__return__`,result:`水下岩缝里嵌着发亮的矿脉！你憋着气撬下了好几块。
水下比想象的深。你的手碰到了什么软绵绵的东西，吓得一口气冲出水面——撞上了洞顶的钟乳石。`},{id:`o_1`,text:`只灌一瓶潭边渗出的清水`,effects:[{kind:`item`,item:`water_clean`,amount:1}],next:`__return__`,result:`岩石过滤过的地下水，清凉甘冽。不冒险也有不冒险的收获。`}]},{id:`evt_mine_creak`,weight:10,minDay:1,maxTriggers:1,text:`头顶的支撑木发出一声悠长的吱嘎声，细碎的尘土簌簌落下。这片巷道随时可能塌方——但缝隙里能看到未采掘的矿脉在闪光。`,choices:[{id:`o_0`,text:`快进快出，赌一把`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`item`,item:`mat_stone`,amount:2},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10}],next:`__return__`,result:`你在尘土飞扬中狂凿了几块富矿冲了出来！身后的支撑木在你跨出瞬间轰然倒塌。
塌方来得比预想更快！一块巨石擦着你的肩膀砸下来，把你掀翻在地。你拖着腿爬出来的时候天都黑了。`},{id:`o_1`,text:`用木料加固后再挖`,effects:[{kind:`item`,item:`mat_wood`,amount:-2},{kind:`item`,item:`mat_stone`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1}],next:`__return__`,result:`花了两根木料做支撑，挖掘变得安心许多。稳稳当当满载而归——工程学万岁。`}]},{id:`evt_deepfog_tree`,weight:12,minDay:1,maxTriggers:1,text:`浓雾里悬着一棵树——不是长在地上，而是根须朝天，枝丫垂向地面，整个倒悬浮在半空中，随着你的呼吸轻轻摇晃。树上结着拳头大小的、发光的果实。`,choices:[{id:`o_0`,text:`摘一颗果子`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`touched_hanging_fruit`}],next:`__return__`,result:`果实在掌心化成了一汪清凉的光，顺着喉咙流下去。疲惫一扫而空，连雾气都变得可以原谅了。
果实在你合拢手指的瞬间炸成一蓬冷光。你打了个寒战，感觉有什么东西顺着光钻进了你的记忆深处。`},{id:`o_1`,text:`绕开这棵不讲道理的树`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`物理学家看了会沉默。你选择尊重常识，绕行了三米远。`}]},{id:`evt_village_photo`,weight:12,minDay:1,maxTriggers:1,text:`废弃村庄的一间农舍里，灶台居然是温的。墙角蜷着一个满脸胡茬的男人，见你进来，缓缓举起双手：「别紧张……我叫老K。」桌上摆着一张旧照片。`,choices:[{id:`o_0`,text:`和他搭伙`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`laok_ally`},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`laok_betrayed`},{kind:`item`,item:`food_canned`,amount:-1}],next:`__return__`,result:`老K会修东西，还懂草药。他说等雾散了一起去找救援队。你多了个同伴。
当晚老K不见了，带走了你半个背包。照片还留在桌上。`},{id:`o_1`,text:`拿起照片看看`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`laok_photo_seen`},{kind:`item`,item:`key_old_photo`,amount:1}],next:`__return__`,result:`照片背面写着：老K，勿念。男人的眼圈红了。「这是我闺女画的。」他声音沙哑。气氛缓和了不少。`},{id:`o_2`,text:`转身就走`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`你退出农舍。身后传来一声轻轻的叹息。`}]},{id:`evt_deepfog_altar`,weight:20,minDay:12,maxTriggers:1,text:`火把的光只能推开半米浓雾。雾中忽然浮现出一座石台，台上凹槽的形状——和你口袋里的结晶一模一样。`,choices:[{id:`o_0`,text:`放入迷雾结晶`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`altar_used`},{kind:`item`,item:`key_mist_crystal`,amount:-1},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`item`,item:`key_mist_crystal`,amount:-1}],next:`__return__`,result:`石台嗡鸣，浓雾短暂地退开一线。你瞥见了远处沉船湾的轮廓，还有一块新的结晶躺在凹槽旁。
结晶碎裂，一股寒意钻进你的骨髓。石台拒绝了这份供品。`},{id:`o_1`,text:`放入全部三块结晶（需要三块）`,effects:[],next:`__return__`,result:`三道光同时亮起——`},{id:`o_2`,text:`记下位置，速速离开`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`好奇心会害死人。你标记了方位，原路撤回。`}]},{id:`evt_ex_mailbox`,weight:10,minDay:1,maxTriggers:1,text:`迷雾边缘立着一只绿色邮筒，铁皮锈得厉害，投递口却被人擦得发亮。里面塞满了寄不出去的信。`,choices:[{id:`o_0`,text:`取走有价值的邮票和信纸`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`mail_seen`}],next:`__return__`,result:`你抽出一沓信纸和几枚纪念邮票。物资归你，故事留给邮筒。
最底下一封信的收件人写着你的名字。你没敢拆，塞回了深处。`},{id:`o_1`,text:`把一封写给自己家人的信念出来`,effects:[{kind:`resource`,resource:`sanity`,delta:10}],next:`__return__`,result:`你借着邮筒盖写了一封短信投进去。做完这一切，胸口那块石头轻了一点。`}]},{id:`evt_ex_kite`,weight:9,minDay:1,maxTriggers:1,text:`树杈上挂着半截风筝，骨架完好，蒙皮撕了一半。线上还系着一个迷你金属扣。`,choices:[{id:`o_0`,text:`拆下骨架和线`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`item`,item:`mat_rope`,amount:1}],next:`__return__`,result:`竹篾和结实的线都是好材料。
拆的时候线轴崩开，划伤了手背。`},{id:`o_1`,text:`把风筝放起来`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`风筝在浓雾里飞得很高，看不见了。你盯着线的方向笑了很久。
线放尽时，另一头传来极轻的一下回拉——像有什么把它接住了。`}]},{id:`evt_ex_footprint`,weight:8,minDay:1,maxTriggers:1,text:`泥地上一串脚印，赤足，间距很大，从雾里来又回雾里去。脚印中心被烧出一个个焦黑的小坑。`,choices:[{id:`o_0`,text:`沿脚印追一段`,effects:[{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10}],next:`__return__`,result:`脚印尽头是一小堆还温热的灰烬，里面埋着半罐没开封的罐头。
你跟丢了。回头时发现自己的来时路上多出一行新的赤足印。`},{id:`o_1`,text:`绕开，别惹麻烦`,effects:[{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`你退回小路。有些好奇心会要命。`}]},{id:`evt_ex_birch_carve`,weight:10,minDay:1,maxTriggers:1,text:`一棵白桦树上刻满名字和日期，最深的一行是：'等雾散了就回家'。刻痕很新。`,choices:[{id:`o_0`,text:`在下面也刻一个名字`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`你刻下自己的名字。像是在对这个世界说：我还在。
刻到一半，树皮渗出的汁液是暗红色的。你换了棵树刻完了后半截。`},{id:`o_1`,text:`检查刻痕附近有没有藏物`,effects:[{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`mat_rope`,amount:1},{kind:`item`,item:`mat_scrap_metal`,amount:1}],next:`__return__`,result:`'回家'下方三指处有个油布包：几颗盐和一小卷绳。
只有一枚生锈的铁盒，空空如也。`}]},{id:`evt_ex_beehive`,weight:9,minDay:1,maxTriggers:1,text:`低矮的枝桠上吊着一个野蜂巢，蜂群在冷雾里不太活跃。巢里应该有蜜。`,choices:[{id:`o_0`,text:`用火把熏蜂取蜜`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`item`,item:`tool_torch`,amount:-1}],next:`__return__`,result:`浓烟驱散蜂群。你收获了大块蜜脾，甜到发昏。
还是有几只倔蜂追着你蛰。脸肿了一天，但蜜是真甜。`},{id:`o_1`,text:`直接伸手掏`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`手快有！掏出一块蜜脾撒腿就跑。
蜂群瞬间炸营。你顶着满头包逃出白桦林。`}]},{id:`evt_ex_mushroom_ring`,weight:10,minDay:1,maxTriggers:1,text:`林间空地上长着一圈整齐的蘑菇，圆得像用圆规画出来的。老人们说这种圈进不得。`,choices:[{id:`o_0`,text:`采外圈的`,effects:[{kind:`item`,item:`food_mushroom`,amount:2},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`food_mushroom`,amount:2}],next:`__return__`,result:`外圈是无毒的杨树菇，今晚加餐。
采着采着你发现自己站在圈子正中央——不记得走过来的。`},{id:`o_1`,text:`采内圈的（更肥嫩）`,effects:[{kind:`item`,item:`food_mushroom`,amount:3}],next:`__return__`,result:`内圈菌肉厚实，赚了。
这些颜色艳得不正常。当晚你上吐下泻。`},{id:`o_2`,text:`绕开这个鬼地方`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`你退出去时数了数，圈里一共站着几个影子——你不敢确认是不是零。`}]},{id:`evt_ex_birdcage`,weight:8,minDay:1,maxTriggers:1,text:`一只黄铜鸟笼挂在枝头，笼门开着，里面却铺着新鲜草叶——像是有人最近还在喂。`,choices:[{id:`o_0`,text:`取走铜笼`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`mat_scrap_metal`,amount:2}],next:`__return__`,result:`黄铜是好东西，能换能熔。
提起来才发现笼底压着一撮羽毛和一张字条：'它先走了'。`},{id:`o_1`,text:`留下食物再走`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`item`,item:`food_berry`,amount:-1}],next:`__return__`,result:`你在笼边摆了几颗浆果。第二天路过时，浆果不见了，笼门关上了。`}]},{id:`evt_ex_freezer`,weight:11,minDay:1,maxTriggers:1,text:`超市断电已久，但最里侧一台冷藏柜的柜门反常地关着，上面压着重物。拉开的瞬间寒气扑面。`,choices:[{id:`o_0`,text:`忍着恶臭翻到底`,effects:[{kind:`item`,item:`food_biscuit`,amount:2},{kind:`item`,item:`food_raw_meat`,amount:1},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`item`,item:`food_biscuit`,amount:1}],next:`__return__`,result:`冻了三个月的速冻水饺和牛肉粒。煮开就没问题！
翻出一袋冻豆子和一股挥之不去的腐味。你在货架间干呕了十分钟。`},{id:`o_1`,text:`只拿柜顶的东西就走`,effects:[{kind:`item`,item:`mat_cloth`,amount:1}],next:`__return__`,result:`柜顶塞着两提卫生纸和一把塑料勺。聊胜于无。`}]},{id:`evt_ex_shelffall`,weight:9,minDay:1,maxTriggers:1,text:`一声呻吟般的金属扭曲声——头顶整排货架正朝你倾塌下来。`,choices:[{id:`o_0`,text:`向侧前方扑滚`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`food_canned`,amount:1}],next:`__return__`,result:`货架砸在你身后半米。扬尘里你顺手摸了两件货。
还是被边缘扫中肩膀。疼，但命在。`},{id:`o_1`,text:`撑住货架争取时间`,effects:[{kind:`item`,item:`food_canned`,amount:3}],next:`__return__`,result:`你硬生生扛住倾斜的角钢，倒身抽出三罐头。力量就是物资。
角钢太沉，你被压住小腿挣了很久才脱身。`}]},{id:`evt_ex_office`,weight:7,minDay:1,maxTriggers:1,text:`办公室的门虚掩着。桌上一本破损账本压着一份供货点名单，抽屉没锁。`,choices:[{id:`o_0`,text:`带走账本仔细研究`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`ledger_read`},{kind:`item`,item:`key_ledger`,amount:1}],next:`__return__`,result:`账本最后一页用红笔圈了几处'应急库房'。其中一处，似乎就在……沉船方向？`},{id:`o_1`,text:`只翻抽屉`,effects:[{kind:`item`,item:`med_painkiller`,amount:1},{kind:`item`,item:`lux_choco`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`半瓶止痛药和一块融化又凝固的巧克力。
抽屉夹层弹出一封辞呈，日期是迷雾降临前一天。他到底走成了没有？`}]},{id:`evt_ex_sample`,weight:8,minDay:1,maxTriggers:1,text:`促销试吃摊的小桌居然还立着，牙签筒、纸杯一应俱全，仿佛昨夜还有人营业。`,choices:[{id:`o_0`,text:`打扫战场，能吃的都收走`,effects:[{kind:`item`,item:`food_black_bread`,amount:2},{kind:`resource`,resource:`sanity`,delta:-7}],next:`__return__`,result:`几包未拆封的饼干和小面包。过期三天，问题不大。
拆开的一包肉脯上爬满白色小蠕虫。你连牙签筒都没敢碰。`},{id:`o_1`,text:`坐在摊位后扮一回店员`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`你对空气喊了一声'试吃啦'。回音散去时，你听见很远处有个孩子笑了一下。
你笑着笑着就哭了，哭了很久才想起来自己为什么笑。`}]},{id:`evt_ex_cartgrave`,weight:8,minDay:1,maxTriggers:1,text:`几十辆购物车在停车场叠成一座歪斜的高塔，风穿过车轮缝发出呜咽般的声音。`,choices:[{id:`o_0`,text:`攀上去拆车筐`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1}],next:`__return__`,result:`拆下的金属网格是万能建材。
车塔在你脚下移位滑动！你摔下来时被车筐刮了个满怀。`},{id:`o_1`,text:`逐辆翻车内遗落物`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`item`,item:`mat_cloth`,amount:2},{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`第三辆车里躺着婴儿提篮，篮底垫着一件完好的毛衣和半包奶粉。
除了硬币什么都没有。你收集了一把硬币——万一世界恢复了呢。`}]},{id:`evt_ex_creek_glitter`,weight:11,minDay:1,maxTriggers:1,text:`浅滩的水底有什么东西在阳光下闪闪发亮。水凉得刺骨。`,choices:[{id:`o_0`,text:`脱鞋下水摸`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-9}],next:`__return__`,result:`是一枚掉落的银戒指和一把沉底的螺丝刀。
摸了半天只捞起一把淤泥——以及泥里一只惨白的、不属于任何活人的手模型。`},{id:`o_1`,text:`用鱼竿试探深度顺便钓鱼`,effects:[{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`挂底的钩拽上来一串小鱼。一举两得。
钓上来一只湿透的旧怀表，指针停在 4:44。`}]},{id:`evt_ex_creek_foam`,weight:9,minDay:1,maxTriggers:1,text:`溪水上游漂来成片白色泡沫，带着若有若无的甜味。水质明显不对劲。`,choices:[{id:`o_0`,text:`取样观察`,effects:[{kind:`item`,item:`water_dirty`,amount:2},{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`creek_suspect`}],next:`__return__`,result:`泡沫是上游某处倾倒的洗涤剂残留，无毒。你放心地在下游灌了水。
甜味来源不明。你决定连下游的水都暂时不喝了——谨慎总没错。`},{id:`o_1`,text:`逆流而上查源头`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`lux_choco`,amount:1},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`源头是一辆翻倒的清洁车。你在驾驶室里找到一瓶未开封苏打水。
你看到泡沫尽头泡着一个人形轮廓。你没有靠近的勇气，狂奔而回。`}]},{id:`evt_ex_wet_prints`,weight:8,minDay:1,maxTriggers:1,text:`溪边的鹅卵石上有两行刚踩出来的湿脚印，一行大一行小，并排走向密林。`,choices:[{id:`o_0`,text:`跟着脚印走`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10}],next:`__return__`,result:`脚印尽头是一件晾在树枝上的小孩外套，口袋里有半块饼干。
你听到林子深处有大人和孩子的笑声，此起彼伏。可这座村子早就没人了。`},{id:`o_1`,text:`折返，今天不再靠近水边`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`你回到岸上晒太阳。安全感的味道和阳光一样。`}]},{id:`evt_ex_village_well`,weight:10,minDay:1,maxTriggers:1,text:`村口的辘轳井边放着两只铁桶，井绳绷得笔直——桶好像还在井里，很沉。`,choices:[{id:`o_0`,text:`摇辘轳拉上来`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`water_clean`,amount:1}],next:`__return__`,result:`满满一桶井水，冰凉甘冽。另一桶里是有人存好的腌菜。
第二只桶出水时，你在桶底看到了一只睁着的眼睛——是画上去的，画得很逼真。`},{id:`o_1`,text:`往井里丢块石头听听回声`,effects:[{kind:`resource`,resource:`sanity`,delta:0},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`well_sos`}],next:`__return__`,result:`很久很久才有水声。这井深得不像话。
石头落地前，井底传来了敲击回应——三短，三长，三短。`}]},{id:`evt_ex_clothesline`,weight:9,minDay:1,maxTriggers:1,text:`两户人家之间的晒衣绳还晾着几件衣服，被雨水洗得发白，却叠得整整齐齐地别着夹子。`,choices:[{id:`o_0`,text:`全部收走`,effects:[{kind:`item`,item:`mat_cloth`,amount:3},{kind:`resource`,resource:`sanity`,delta:4},{kind:`item`,item:`mat_cloth`,amount:1}],next:`__return__`,result:`布料就是资源。你朝空屋子道了声谢。
收到最后一件，你发现每件衣服的口袋里都装着一张全家福。你把它们原样放了回去。`},{id:`o_1`,text:`只拿一双靴子`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`一双合脚的胶靴。走远路再也不磨脚了。
靴子里盘着一条正在蜕皮的蛇。你和它互相吓了一大跳。`}]},{id:`evt_ex_granary`,weight:8,minDay:1,maxTriggers:1,text:`村仓的地窖门用木杠闩着，缝隙里飘出发霉谷物和另一种说不清的味道。`,choices:[{id:`o_0`,text:`撬开门杠下去`,effects:[{kind:`item`,item:`food_black_bread`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`food_black_bread`,amount:1}],next:`__return__`,result:`半窖受潮但还能吃的陈麦，还有一缸密封完好的腌萝卜。
窖里的陈粮早被什么东西搬空了，只剩墙角堆着整齐的骨头。家畜的——你反复告诉自己。`},{id:`o_1`,text:`在门口撒一圈石灰粉再来`,effects:[{kind:`item`,item:`food_mushroom`,amount:2}],next:`__return__`,result:`没有石灰，你用灶灰代替。至少蛇虫不爱跨过灰线。下去快取快撤。`}]},{id:`evt_ex_slogan`,weight:7,minDay:10,maxTriggers:1,text:`土墙上用红漆刷着大字：'守好家门，等待救援'。漆迹下隐约还有一层更旧的字。`,choices:[{id:`o_0`,text:`辨认下面那层旧字`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`know_rule`},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`旧标语写着：'雾来了，别应声。'两代人守的是同一个村子的规矩。
旧字被新漆彻底盖死，什么都认不出来。这份沉默比字更瘆人。`},{id:`o_1`,text:`补上一句自己的话`,effects:[{kind:`resource`,resource:`sanity`,delta:7}],next:`__return__`,result:`你蘸着锅底灰在旁边写：'第__天，我还活着。'写完数字的那一栏，你填得很用力。`}]},{id:`evt_ex_minelamp`,weight:10,minDay:1,maxTriggers:1,text:`矿洞口的工具架上排着几盏老式矿灯，其中一盏竟然还能亮，光柱稳稳打在前方黑暗里。`,choices:[{id:`o_0`,text:`带走能亮的矿灯`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`item`,item:`key_battery`,amount:1}],next:`__return__`,result:`灯壳结实，电池还有余量。夜里多一分光就多一分胆。
灯亮了三步路就熄了。你摸黑撞上工具架，头上挨了一下。`},{id:`o_1`,text:`把所有电池都拆走`,effects:[{kind:`item`,item:`key_battery`,amount:2}],next:`__return__`,result:`大小电池七拼八凑凑出五节。电台和手电都有救了。`}]},{id:`evt_ex_cart_push`,weight:9,minDay:1,maxTriggers:1,text:`巷道深处停着一辆装满矿石的推车，轨道向前延伸进一片死寂的黑。头顶不时落下碎石。`,choices:[{id:`o_0`,text:`推着车深入`,effects:[{kind:`item`,item:`mat_stone`,amount:4},{kind:`item`,item:`mat_scrap_metal`,amount:1}],next:`__return__`,result:`推车挡落了塌方的碎石，你捡回两条命外加满满一车好石头。
轨道尽头是断崖。你刹不住车，连人带车冲进黑暗——醒来时躺在洞口，浑身是伤。`},{id:`o_1`,text:`只在巷道口捡漏`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_stone`,amount:2}],next:`__return__`,result:`散落的矿石和一只工牌。你把工牌立在洞口，算是某种纪念。`}]},{id:`evt_ex_water_sound`,weight:8,minDay:1,maxTriggers:1,text:`黑暗尽头传来规律的滴水声，还有一丝流动的风——矿洞深处可能有暗河和出口。`,choices:[{id:`o_0`,text:`循声探进去`,effects:[{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-14}],next:`__return__`,result:`暗河！你灌满所有容器，还在河滩上捡到一颗被打磨过的发光晶体。
暗河边坐着一圈'矿工'，背对着你，一动不动。你踮着脚退出去了，水也没敢灌。`},{id:`o_1`,text:`记下位置改日再来`,effects:[{kind:`resource`,resource:`sanity`,delta:1}],next:`__return__`,result:`你用石块在巷道壁上做了个箭头记号。有备而来总比莽撞强。`}]},{id:`evt_ex_miner_note`,weight:8,minDay:1,maxTriggers:1,text:`休息室的黑板上是潦草的粉笔字：'别挖穿东壁。雾从那边进来。我们错了。'`,choices:[{id:`o_0`,text:`按留言所说避开东壁采西巷`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`heeded_warning`},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`mat_stone`,amount:2}],next:`__return__`,result:`西巷平安无事，你还发现前人藏起的一小袋盐。
西巷塌了半边。留言的人大概也没料到。你抄近路狼狈撤出。`},{id:`o_1`,text:`偏要看看东壁后面是什么`,effects:[{kind:`resource`,resource:`sanity`,delta:-13},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`mat_scrap_metal`,amount:2}],next:`__return__`,result:`东壁裂隙里吹出浓稠的白雾，雾里有一面镜子。镜子里你没有脸。你跑得比任何时候都快。
东壁后是一条被雾灌满的死巷，你抢在塌方前退出，顺走了架上的铁镐头。`}]},{id:`evt_ex_crystal_cluster`,weight:11,minDay:12,maxTriggers:1,text:`岩壁上生长着一片迷雾结晶，每一颗都在以心跳般的频率明明灭灭。你数了数，频率和你完全同步。`,choices:[{id:`o_0`,text:`敲下最大的一颗`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`crystal_taken`},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`fog_silent`},{kind:`item`,item:`key_mist_crystal`,amount:1}],next:`__return__`,result:`结晶入手温热，光随之熄灭。掌心像捂着一颗小小的太阳。
结晶碎裂的瞬间，整片雾安静下来——所有的虫鸣、风声，全没了。`},{id:`o_1`,text:`只是看着它们呼吸`,effects:[{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`你们对视了很久。离开时，有一瞬间你觉得它们在替你保守某个秘密。`}]},{id:`evt_ex_whisperer`,weight:9,minDay:1,maxTriggers:1,text:`一个由雾构成的人形坐在岩石上，对着掌心絮絮低语。它的声音像很多人在同时说话。`,choices:[{id:`o_0`,text:`凑近听它在说什么`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`flag`,flag:`heard_list`}],next:`__return__`,result:`它在重复你三天前说过的一句话，一字不差。然后它转头看你，用你自己的声音说：'该回家了。'
它在念一份长长的名单。最后一个名字念出来时，你浑身冰凉——那是你认识的人。`},{id:`o_1`,text:`保持距离绕过去`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`你贴着岩壁挪了过去。低语声在你身后停了很久，又缓缓继续。`}]},{id:`evt_ex_glow_hand`,weight:8,minDay:1,maxTriggers:1,text:`雾气凝结的岩面上印着一个巨大的五指手印，指尖泛着微光。尺寸不是人类能达到的比例。`,choices:[{id:`o_0`,text:`把手掌覆上去比对`,effects:[{kind:`resource`,resource:`sanity`,delta:0},{kind:`flag`,flag:`hand_matched`},{kind:`resource`,resource:`sanity`,delta:15}],next:`__return__`,result:`你的手印与它完美重叠——只是小了一号。岩面下传来一声悠长的叹息。
触感意外地温暖。光芒顺着手臂爬上来，你看见雾的另一面：无数木屋的灯火。幻象消失了，但你记得那份暖意。`},{id:`o_1`,text:`拓下手印图案`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`hand_rubbing`}],next:`__return__`,result:`你用炭粉拓了一份手印。也许哪天能用得上——或者只是留个念想。`}]},{id:`evt_ex_faceless`,weight:7,minDay:1,maxTriggers:1,text:`十步之外站着一个穿雨衣的身影。它没有脸，却让你确凿地感觉到它在看你。`,choices:[{id:`o_0`,text:`挥手打招呼`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`waved_back`},{kind:`resource`,resource:`sanity`,delta:-15}],next:`__return__`,result:`它缓缓抬起手，用一模一样的动作向你挥了挥，然后转身走进雾里。不知为何你想哭。
它开始模仿你每一个动作，越来越快，直到你们的动作重叠成一个。`},{id:`o_1`,text:`举起武器对峙`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`你握紧手里的东西。人影静止片刻，慢慢后退，融进白色里。勇气有时候就是武器。`}]},{id:`evt_ex_generator`,weight:11,minDay:1,maxTriggers:1,text:`塔底的配电房里躺着一台柴油发电机。油箱见底，但机身保养得很好——最近有人在维护它。`,choices:[{id:`o_0`,text:`搜刮机油和零件`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`item`,item:`key_battery`,amount:1}],next:`__return__`,result:`滤芯、皮带、半桶柴油。机械师看了都会流口水。
你刚拧下一颗螺栓，整层楼道的灯忽然全亮了——发电机自启了。你夺门而出。`},{id:`o_1`,text:`试着发动它给电台供电`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`tower_aligned`},{kind:`item`,item:`key_battery`,amount:-1},{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`key_battery`,amount:-1}],next:`__return__`,result:`轰鸣声中，整套天线阵列缓缓转向东南方。它收到了什么指令。
发动机咳了几声就熄火了。但你注意到电表读数跳过一格——电从哪来的？`}]},{id:`evt_ex_dutylog`,weight:10,minDay:10,maxTriggers:1,text:`值班台上摊着日志本。最后一页的字迹潦草：'D-3。他们回复了。不是救援频道。别回话。千万别回话。'`,choices:[{id:`o_0`,text:`按日志警告执行静默`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`kept_silent`},{kind:`item`,item:`key_battery`,amount:1}],next:`__return__`,result:`你把发射机保险丝拔了揣兜里。有些信号，不听比听活得久。`},{id:`o_1`,text:`好奇害死猫：按下回话键`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`answered_call`},{kind:`flag`,flag:`rescue_hint`},{kind:`resource`,resource:`sanity`,delta:-12},{kind:`flag`,flag:`answered_call`}],next:`__return__`,result:`电流声里传来清晰的回答：'收到。坚持住。'是个温暖的女声。你选择相信。
回答你的声音逐字复读了你的话，然后开始复读你此刻的心跳声。你扯断了电源线。`}]},{id:`evt_ex_flag_antenna`,weight:8,minDay:1,maxTriggers:1,text:`百米天线的拉索上缠着一面褪色旗帜，旗面画着一个笑脸——有人爬上去挂的，为了给幸存者指路。`,choices:[{id:`o_0`,text:`爬上去取旗`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`item`,item:`mat_cloth`,amount:2},{kind:`item`,item:`mat_cloth`,amount:1}],next:`__return__`,result:`布料结实防水，正好做屋顶补丁。旗杆顶端的视野让你看清了雾海的全貌。
爬到一半，固定索松了。你抱着旗杆滑下来的姿势要多狼狈有多狼狈。`},{id:`o_1`,text:`在旗下埋个时间胶囊`,effects:[{kind:`resource`,resource:`sanity`,delta:8}],next:`__return__`,result:`你埋下一张字条和一枚硬币。如果有一天有人找到它，请告诉他：这里有人认真地活过。`}]},{id:`evt_ex_flooded_hull`,weight:11,minDay:1,maxTriggers:1,text:`搁浅的渔船半个船身浸在海湾里，舱室随潮汐一起一伏，发出鲸息般的声响。`,choices:[{id:`o_0`,text:`趁退潮钻进货舱`,effects:[{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`salt`,amount:2},{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`food_canned`,amount:1}],next:`__return__`,result:`货舱里码着没泡水的物资箱：罐头、淡水、还有一大袋盐。
潮水回来得比你预计的快。你抱着抢到的箱子从舱口游了出来。`},{id:`o_1`,text:`搜船长室`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`captain_log`},{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`航海日志与一把黄铜钥匙。日志提到'湾北的集装箱是老周的'。
船长室墙上钉着一张全家福，相框擦得一尘不染——这艘船上不止你一个人来过。`}]},{id:`evt_ex_chartroom`,weight:9,minDay:1,maxTriggers:1,text:`海图桌上摊开着海湾全域图，有人用红铅笔标注了七处叉叉，其中一个画了圈。`,choices:[{id:`o_0`,text:`研究标记点`,effects:[{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`map_arrow`}],next:`__return__`,result:`画圈的叉对应一处补给暗仓。按图索骥，你在礁石缝里摸出防水盒。
七个叉连起来是一个箭头，指向陆地深处。指向哪里，图上没有画完。`},{id:`o_1`,text:`揭走整张海图当加固布`,effects:[{kind:`item`,item:`mat_cloth`,amount:2}],next:`__return__`,result:`厚实的海图纸防潮性能一流。至于秘密嘛，已经糊在屋顶上了。`}]},{id:`evt_ex_drift_bottle`,weight:8,minDay:1,maxTriggers:1,text:`浪花把一只玻璃漂流瓶推到你脚边。软木塞封得很紧，瓶身裹着防潮油布——这是认真准备的。`,choices:[{id:`o_0`,text:`打开看信`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`bottle_warn`},{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`'如果你捡到这瓶，说明湾里还能走。别信穿救生衣的。'落款日期是上周。
'今天是我们女儿的五岁生日。蛋糕她爸做了三次都塌了。'信纸上有泪痕晕开的地图。`},{id:`o_1`,text:`留着瓶子装淡水`,effects:[{kind:`item`,item:`water_clean`,amount:1}],next:`__return__`,result:`玻璃瓶是储水神器。信你原样塞了回去——有些话属于大海。`}]},{id:`evt_ex_container`,weight:9,minDay:1,maxTriggers:1,text:`半埋进沙里的集装箱，门轴锈死，但侧面被人切割过一个仅容一人通过的方洞。`,choices:[{id:`o_0`,text:`钻进去`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`item`,item:`food_biscuit`,amount:2},{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`mat_cloth`,amount:2}],next:`__return__`,result:`箱内堆着压缩干粮和成捆帆布。你在黑暗里撞翻了什么，随后听见抓挠声从货物深处逼近。
箱子里用粉笔画满了正字计数，角落蜷着一床叠好的毯子。有人在这里等过很久很久。`},{id:`o_1`,text:`先扔块石头探动静`,effects:[{kind:`item`,item:`mat_cloth`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`石头滚了半天停下，没有动静。你安心地搬空了门口的帆布捆。
石头扔进去，里面传来石头回应——准确地扔回了你脚边。力度刚刚好。`}]},{id:`evt_g_fog_edge_100`,weight:5,minDay:1,maxTriggers:1,text:`歪斜的公交站牌。站牌下有个坐垫。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_101`,weight:5,minDay:1,maxTriggers:1,text:`翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_102`,weight:5,minDay:1,maxTriggers:1,text:`挂在校门口的横幅。"欢迎新同学"被撕去了一半。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_103`,weight:5,minDay:1,maxTriggers:1,text:`半埋的行李箱。锁扣锈死，箱角被什么咬开过。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_104`,weight:5,minDay:1,maxTriggers:1,text:`一只跑丢的拖鞋。旁边还有另一只的脚印。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_105`,weight:5,minDay:1,maxTriggers:1,text:`散落一地的传单。纸上的字已经晕成一片蓝。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_106`,weight:5,minDay:1,maxTriggers:1,text:`一辆没油的小轿车。后备箱虚掩着。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_107`,weight:5,minDay:1,maxTriggers:1,text:`缠满雾水的广告牌。上面印着"家的味道"。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_108`,weight:5,minDay:1,maxTriggers:1,text:`半埋的行李箱。锁扣锈死，箱角被什么咬开过。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_bandage`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_109`,weight:5,minDay:1,maxTriggers:1,text:`翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_110`,weight:5,minDay:1,maxTriggers:1,text:`翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_111`,weight:5,minDay:1,maxTriggers:1,text:`歪斜的公交站牌。站牌下有个坐垫。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_112`,weight:5,minDay:1,maxTriggers:1,text:`半埋的行李箱。锁扣锈死，箱角被什么咬开过。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_113`,weight:5,minDay:1,maxTriggers:1,text:`翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_114`,weight:5,minDay:1,maxTriggers:1,text:`歪斜的公交站牌。站牌下有个坐垫。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_115`,weight:5,minDay:1,maxTriggers:1,text:`半埋的行李箱。锁扣锈死，箱角被什么咬开过。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_116`,weight:5,minDay:1,maxTriggers:1,text:`一只跑丢的拖鞋。旁边还有另一只的脚印。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_117`,weight:5,minDay:1,maxTriggers:1,text:`一辆没油的小轿车。后备箱虚掩着。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_bandage`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_118`,weight:5,minDay:1,maxTriggers:1,text:`缠满雾水的广告牌。上面印着"家的味道"。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_bandage`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_119`,weight:5,minDay:1,maxTriggers:1,text:`半埋的行李箱。锁扣锈死，箱角被什么咬开过。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_berry`,amount:2},{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_120`,weight:5,minDay:1,maxTriggers:1,text:`翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_bandage`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_121`,weight:5,minDay:1,maxTriggers:1,text:`翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_bandage`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_122`,weight:5,minDay:1,maxTriggers:1,text:`一只跑丢的拖鞋。旁边还有另一只的脚印。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_bandage`,amount:1},{kind:`item`,item:`med_bandage`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_fog_edge_123`,weight:5,minDay:1,maxTriggers:1,text:`散落一地的传单。纸上的字已经晕成一片蓝。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:2},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_124`,weight:5,minDay:1,maxTriggers:1,text:`树杈间的吊床。绳结打得相当专业。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_125`,weight:5,minDay:1,maxTriggers:1,text:`挂在枝头的布条阵。每隔几步一条，像路标又像封印。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_126`,weight:5,minDay:1,maxTriggers:1,text:`苔藓覆盖的石堆。石头的摆放方式不太自然。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_127`,weight:5,minDay:1,maxTriggers:1,text:`系在树上的秋千。木板还在轻轻晃。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_128`,weight:5,minDay:1,maxTriggers:1,text:`一截焦黑的树桩。雷劈的？还是别的火。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_129`,weight:5,minDay:1,maxTriggers:1,text:`树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_130`,weight:5,minDay:1,maxTriggers:1,text:`倒伏的白桦。树干笔直得像标枪。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_131`,weight:5,minDay:1,maxTriggers:1,text:`一圈新鲜的刨花。附近有人砍过柴。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_132`,weight:5,minDay:1,maxTriggers:1,text:`挂在枝头的布条阵。每隔几步一条，像路标又像封印。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_133`,weight:5,minDay:1,maxTriggers:1,text:`树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_134`,weight:5,minDay:1,maxTriggers:1,text:`树杈间的吊床。绳结打得相当专业。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_135`,weight:5,minDay:1,maxTriggers:1,text:`一圈新鲜的刨花。附近有人砍过柴。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_136`,weight:5,minDay:1,maxTriggers:1,text:`挂在枝头的布条阵。每隔几步一条，像路标又像封印。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_137`,weight:5,minDay:1,maxTriggers:1,text:`一圈新鲜的刨花。附近有人砍过柴。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_138`,weight:5,minDay:1,maxTriggers:1,text:`树杈间的吊床。绳结打得相当专业。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_wood`,amount:3},{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_139`,weight:5,minDay:1,maxTriggers:1,text:`树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_140`,weight:5,minDay:1,maxTriggers:1,text:`树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_141`,weight:5,minDay:1,maxTriggers:1,text:`苔藓覆盖的石堆。石头的摆放方式不太自然。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_142`,weight:5,minDay:1,maxTriggers:1,text:`系在树上的秋千。木板还在轻轻晃。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_143`,weight:5,minDay:1,maxTriggers:1,text:`系在树上的秋千。木板还在轻轻晃。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_144`,weight:5,minDay:1,maxTriggers:1,text:`苔藓覆盖的石堆。石头的摆放方式不太自然。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_145`,weight:5,minDay:1,maxTriggers:1,text:`树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_146`,weight:5,minDay:1,maxTriggers:1,text:`系在树上的秋千。木板还在轻轻晃。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`item`,item:`mat_charcoal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_birch_forest_147`,weight:5,minDay:1,maxTriggers:1,text:`一截焦黑的树桩。雷劈的？还是别的火。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_mushroom`,amount:2},{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_148`,weight:5,minDay:1,maxTriggers:1,text:`货架深处的进口食品区。标签全是看不懂的外文。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_149`,weight:5,minDay:1,maxTriggers:1,text:`卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_150`,weight:5,minDay:1,maxTriggers:1,text:`促销堆头残骸。方便面箱子踩扁了一地。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_151`,weight:5,minDay:1,maxTriggers:1,text:`员工储物柜。三排柜子，只有一个是上着的。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_152`,weight:5,minDay:1,maxTriggers:1,text:`仓库卷帘门前。门后传来滴水声。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`lux_choco`,amount:1},{kind:`item`,item:`lux_choco`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_153`,weight:5,minDay:1,maxTriggers:1,text:`服务台的失物招领盒。里面躺着几把钥匙和一枚婚戒。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_154`,weight:5,minDay:1,maxTriggers:1,text:`化妆品区的大镜子。镜面碎成了蛛网。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_155`,weight:5,minDay:1,maxTriggers:1,text:`生鲜区的冰柜。断电已久，门却关得很严。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_156`,weight:5,minDay:1,maxTriggers:1,text:`卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_157`,weight:5,minDay:1,maxTriggers:1,text:`卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_158`,weight:5,minDay:1,maxTriggers:1,text:`服务台的失物招领盒。里面躺着几把钥匙和一枚婚戒。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_159`,weight:5,minDay:1,maxTriggers:1,text:`生鲜区的冰柜。断电已久，门却关得很严。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`lux_choco`,amount:1},{kind:`item`,item:`lux_choco`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_160`,weight:5,minDay:1,maxTriggers:1,text:`生鲜区的冰柜。断电已久，门却关得很严。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`lux_choco`,amount:1},{kind:`item`,item:`lux_choco`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_161`,weight:5,minDay:1,maxTriggers:1,text:`促销堆头残骸。方便面箱子踩扁了一地。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`lux_choco`,amount:1},{kind:`item`,item:`lux_choco`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_162`,weight:5,minDay:1,maxTriggers:1,text:`卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_163`,weight:5,minDay:1,maxTriggers:1,text:`化妆品区的大镜子。镜面碎成了蛛网。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_164`,weight:5,minDay:1,maxTriggers:1,text:`仓库卷帘门前。门后传来滴水声。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_165`,weight:5,minDay:1,maxTriggers:1,text:`货架深处的进口食品区。标签全是看不懂的外文。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_166`,weight:5,minDay:1,maxTriggers:1,text:`员工储物柜。三排柜子，只有一个是上着的。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_167`,weight:5,minDay:1,maxTriggers:1,text:`员工储物柜。三排柜子，只有一个是上着的。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_168`,weight:5,minDay:1,maxTriggers:1,text:`生鲜区的冰柜。断电已久，门却关得很严。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_169`,weight:5,minDay:1,maxTriggers:1,text:`卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_170`,weight:5,minDay:1,maxTriggers:1,text:`仓库卷帘门前。门后传来滴水声。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_cloth`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_supermarket_171`,weight:5,minDay:1,maxTriggers:1,text:`员工储物柜。三排柜子，只有一个是上着的。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:1},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_172`,weight:5,minDay:1,maxTriggers:1,text:`卡在石头缝里的鱼群。退水后它们回不去了。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_173`,weight:5,minDay:1,maxTriggers:1,text:`溪边平整的大石板。有人在这儿野餐过。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_174`,weight:5,minDay:1,maxTriggers:1,text:`湿滑的青苔岩壁。岩缝里有反光的东西。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_175`,weight:5,minDay:1,maxTriggers:1,text:`溪水拐弯处的漩涡。漩涡中心沉着个背包。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_176`,weight:5,minDay:1,maxTriggers:1,text:`沙洲上一串鹅卵石塔。叠了七层，稳稳当当。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_177`,weight:5,minDay:1,maxTriggers:1,text:`上游漂来的野花。花瓣还带着露水。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_178`,weight:5,minDay:1,maxTriggers:1,text:`废弃的取水竹槽。槽身长满了青苔但结构完好。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_179`,weight:5,minDay:1,maxTriggers:1,text:`对岸的野莓丛。红得发黑，够不着。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_180`,weight:5,minDay:1,maxTriggers:1,text:`卡在石头缝里的鱼群。退水后它们回不去了。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_181`,weight:5,minDay:1,maxTriggers:1,text:`湿滑的青苔岩壁。岩缝里有反光的东西。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_182`,weight:5,minDay:1,maxTriggers:1,text:`溪水拐弯处的漩涡。漩涡中心沉着个背包。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_183`,weight:5,minDay:1,maxTriggers:1,text:`废弃的取水竹槽。槽身长满了青苔但结构完好。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_184`,weight:5,minDay:1,maxTriggers:1,text:`沙洲上一串鹅卵石塔。叠了七层，稳稳当当。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_185`,weight:5,minDay:1,maxTriggers:1,text:`沙洲上一串鹅卵石塔。叠了七层，稳稳当当。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_186`,weight:5,minDay:1,maxTriggers:1,text:`上游漂来的野花。花瓣还带着露水。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_187`,weight:5,minDay:1,maxTriggers:1,text:`溪水拐弯处的漩涡。漩涡中心沉着个背包。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_188`,weight:5,minDay:1,maxTriggers:1,text:`上游漂来的野花。花瓣还带着露水。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_189`,weight:5,minDay:1,maxTriggers:1,text:`对岸的野莓丛。红得发黑，够不着。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_190`,weight:5,minDay:1,maxTriggers:1,text:`溪边平整的大石板。有人在这儿野餐过。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_191`,weight:5,minDay:1,maxTriggers:1,text:`对岸的野莓丛。红得发黑，够不着。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_raw_fish`,amount:2},{kind:`item`,item:`food_raw_fish`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_192`,weight:5,minDay:1,maxTriggers:1,text:`溪水拐弯处的漩涡。漩涡中心沉着个背包。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_193`,weight:5,minDay:1,maxTriggers:1,text:`对岸的野莓丛。红得发黑，够不着。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_berry`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_194`,weight:5,minDay:1,maxTriggers:1,text:`废弃的取水竹槽。槽身长满了青苔但结构完好。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_creek_valley_195`,weight:5,minDay:1,maxTriggers:1,text:`沙洲上一串鹅卵石塔。叠了七层，稳稳当当。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`herb_green`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`water_clean`,amount:3},{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_196`,weight:5,minDay:1,maxTriggers:1,text:`墙根的一排陶罐。罐口都用纱布蒙着。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_197`,weight:5,minDay:1,maxTriggers:1,text:`贴着福门的农舍。门缝里塞着褪色的春联。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_black_bread`,amount:2},{kind:`item`,item:`food_black_bread`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_198`,weight:5,minDay:1,maxTriggers:1,text:`半塌的灶房。灶膛里的灰是温的。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_199`,weight:5,minDay:1,maxTriggers:1,text:`村委会的黑板报。粉笔字写着防汛值班表。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_200`,weight:5,minDay:1,maxTriggers:1,text:`压水井。井把子上缠着防滑布。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_201`,weight:5,minDay:1,maxTriggers:1,text:`鸡窝。稻草窝里居然还有一颗蛋。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_202`,weight:5,minDay:1,maxTriggers:1,text:`院里晒着的辣椒串。红得刺眼，像还在等主人回来。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_203`,weight:5,minDay:1,maxTriggers:1,text:`晾在中庭的中药渣。药味还没散尽。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_204`,weight:5,minDay:1,maxTriggers:1,text:`晾在中庭的中药渣。药味还没散尽。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_205`,weight:5,minDay:1,maxTriggers:1,text:`贴着福门的农舍。门缝里塞着褪色的春联。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_206`,weight:5,minDay:1,maxTriggers:1,text:`鸡窝。稻草窝里居然还有一颗蛋。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_207`,weight:5,minDay:1,maxTriggers:1,text:`村委会的黑板报。粉笔字写着防汛值班表。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_208`,weight:5,minDay:1,maxTriggers:1,text:`贴着福门的农舍。门缝里塞着褪色的春联。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_black_bread`,amount:2},{kind:`item`,item:`food_black_bread`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_209`,weight:5,minDay:1,maxTriggers:1,text:`贴着福门的农舍。门缝里塞着褪色的春联。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_210`,weight:5,minDay:1,maxTriggers:1,text:`半塌的灶房。灶膛里的灰是温的。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_black_bread`,amount:2},{kind:`item`,item:`food_black_bread`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_211`,weight:5,minDay:1,maxTriggers:1,text:`贴着福门的农舍。门缝里塞着褪色的春联。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_212`,weight:5,minDay:1,maxTriggers:1,text:`贴着福门的农舍。门缝里塞着褪色的春联。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_black_bread`,amount:2},{kind:`item`,item:`food_black_bread`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_213`,weight:5,minDay:1,maxTriggers:1,text:`贴着福门的农舍。门缝里塞着褪色的春联。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_wood`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_214`,weight:5,minDay:1,maxTriggers:1,text:`半塌的灶房。灶膛里的灰是温的。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_215`,weight:5,minDay:1,maxTriggers:1,text:`晾在中庭的中药渣。药味还没散尽。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_black_bread`,amount:2},{kind:`item`,item:`food_black_bread`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_216`,weight:5,minDay:1,maxTriggers:1,text:`晾在中庭的中药渣。药味还没散尽。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`food_mushroom`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_black_bread`,amount:2},{kind:`item`,item:`food_black_bread`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_217`,weight:5,minDay:1,maxTriggers:1,text:`晾在中庭的中药渣。药味还没散尽。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_218`,weight:5,minDay:1,maxTriggers:1,text:`晾在中庭的中药渣。药味还没散尽。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_abandoned_village_219`,weight:5,minDay:1,maxTriggers:1,text:`墙根的一排陶罐。罐口都用纱布蒙着。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_herbal`,amount:1},{kind:`item`,item:`med_herbal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_220`,weight:5,minDay:1,maxTriggers:1,text:`刻着名字的工具架。每个挂钩下面都有一行小字。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_221`,weight:5,minDay:1,maxTriggers:1,text:`墙上悬挂的矿工帽。帽灯的玻璃裂了。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_222`,weight:5,minDay:1,maxTriggers:1,text:`通风管裂口。管子里吹出细细的凉风。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_223`,weight:5,minDay:1,maxTriggers:1,text:`角落的铁皮柜。柜门上画着一个笑脸。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_224`,weight:5,minDay:1,maxTriggers:1,text:`积水的水泵房。水面浮着一层油花。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_stone`,amount:4},{kind:`item`,item:`mat_stone`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_225`,weight:5,minDay:1,maxTriggers:1,text:`支木密布的主巷道。头顶偶尔掉渣。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_stone`,amount:4},{kind:`item`,item:`mat_stone`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_226`,weight:5,minDay:1,maxTriggers:1,text:`轨道尽头的手推车。车轮上缠满了铁丝。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_227`,weight:5,minDay:1,maxTriggers:1,text:`一箱未开封的炸药。受潮结块，碰不得。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_stone`,amount:4},{kind:`item`,item:`mat_stone`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_228`,weight:5,minDay:1,maxTriggers:1,text:`通风管裂口。管子里吹出细细的凉风。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_229`,weight:5,minDay:1,maxTriggers:1,text:`积水的水泵房。水面浮着一层油花。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_stone`,amount:4},{kind:`item`,item:`mat_stone`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_230`,weight:5,minDay:1,maxTriggers:1,text:`一箱未开封的炸药。受潮结块，碰不得。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_231`,weight:5,minDay:1,maxTriggers:1,text:`刻着名字的工具架。每个挂钩下面都有一行小字。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_stone`,amount:4},{kind:`item`,item:`mat_stone`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_232`,weight:5,minDay:1,maxTriggers:1,text:`支木密布的主巷道。头顶偶尔掉渣。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_233`,weight:5,minDay:1,maxTriggers:1,text:`积水的水泵房。水面浮着一层油花。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_stone`,amount:4},{kind:`item`,item:`mat_stone`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_234`,weight:5,minDay:1,maxTriggers:1,text:`角落的铁皮柜。柜门上画着一个笑脸。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_235`,weight:5,minDay:1,maxTriggers:1,text:`积水的水泵房。水面浮着一层油花。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_236`,weight:5,minDay:1,maxTriggers:1,text:`轨道尽头的手推车。车轮上缠满了铁丝。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_237`,weight:5,minDay:1,maxTriggers:1,text:`角落的铁皮柜。柜门上画着一个笑脸。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_238`,weight:5,minDay:1,maxTriggers:1,text:`一箱未开封的炸药。受潮结块，碰不得。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_239`,weight:5,minDay:1,maxTriggers:1,text:`刻着名字的工具架。每个挂钩下面都有一行小字。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_240`,weight:5,minDay:1,maxTriggers:1,text:`支木密布的主巷道。头顶偶尔掉渣。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_241`,weight:5,minDay:1,maxTriggers:1,text:`轨道尽头的手推车。车轮上缠满了铁丝。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_242`,weight:5,minDay:1,maxTriggers:1,text:`墙上悬挂的矿工帽。帽灯的玻璃裂了。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_mine_243`,weight:5,minDay:1,maxTriggers:1,text:`轨道尽头的手推车。车轮上缠满了铁丝。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_stone`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_244`,weight:5,minDay:1,maxTriggers:1,text:`一排朝同一方向的脚印。所有脚尖都对准雾最浓处。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_245`,weight:5,minDay:1,maxTriggers:1,text:`悬停在耳边的低语。凑近了听，又散开了。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_246`,weight:5,minDay:1,maxTriggers:1,text:`悬浮在半空的光尘。伸手一搅就四散，又缓缓聚拢。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_247`,weight:5,minDay:1,maxTriggers:1,text:`一座无火的篝火堆。灰烬排列成一个完美的圆。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_248`,weight:5,minDay:1,maxTriggers:1,text:`缠绕整棵枯树的灯串。不通电却在明明灭灭。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_249`,weight:5,minDay:1,maxTriggers:1,text:`一面立着的穿衣镜。镜框上缠着干枯的花。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_250`,weight:5,minDay:1,maxTriggers:1,text:`倒插在地上的雨伞。伞面朝上，接了一伞清亮的雾水。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_251`,weight:5,minDay:1,maxTriggers:1,text:`石桌上摆好的两副碗筷。像是有人在等人。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_252`,weight:5,minDay:1,maxTriggers:1,text:`石桌上摆好的两副碗筷。像是有人在等人。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_253`,weight:5,minDay:1,maxTriggers:1,text:`悬浮在半空的光尘。伸手一搅就四散，又缓缓聚拢。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_254`,weight:5,minDay:1,maxTriggers:1,text:`一排朝同一方向的脚印。所有脚尖都对准雾最浓处。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_255`,weight:5,minDay:1,maxTriggers:1,text:`倒插在地上的雨伞。伞面朝上，接了一伞清亮的雾水。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_256`,weight:5,minDay:1,maxTriggers:1,text:`一座无火的篝火堆。灰烬排列成一个完美的圆。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_257`,weight:5,minDay:1,maxTriggers:1,text:`一座无火的篝火堆。灰烬排列成一个完美的圆。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_258`,weight:5,minDay:1,maxTriggers:1,text:`石桌上摆好的两副碗筷。像是有人在等人。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_259`,weight:5,minDay:1,maxTriggers:1,text:`悬浮在半空的光尘。伸手一搅就四散，又缓缓聚拢。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_clean`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_260`,weight:5,minDay:1,maxTriggers:1,text:`一排朝同一方向的脚印。所有脚尖都对准雾最浓处。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_deep_fog_261`,weight:5,minDay:1,maxTriggers:1,text:`一排朝同一方向的脚印。所有脚尖都对准雾最浓处。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_mist_crystal`,amount:2},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_262`,weight:5,minDay:10,maxTriggers:1,text:`一本翻烂的《莫尔斯电码手册》。页边写满了翻译练习。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_263`,weight:5,minDay:10,maxTriggers:1,text:`贴满便签的操作台。每张便签都是一个频段参数。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_264`,weight:5,minDay:10,maxTriggers:1,text:`屋顶避雷针。针尖熔了一个瘤。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_radio_parts`,amount:2},{kind:`item`,item:`key_radio_parts`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_265`,weight:5,minDay:10,maxTriggers:1,text:`天线基座的工具箱。扳手齐全，少了一把螺丝刀。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_266`,weight:5,minDay:10,maxTriggers:1,text:`墙上的信号覆盖图。用红笔圈了三个盲区。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_radio_parts`,amount:2},{kind:`item`,item:`key_radio_parts`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_267`,weight:5,minDay:10,maxTriggers:1,text:`备用发电机房。机油味呛人。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_268`,weight:5,minDay:10,maxTriggers:1,text:`成捆的同轴电缆。铜芯在断口处闪闪发亮。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_269`,weight:5,minDay:10,maxTriggers:1,text:`值班室的行军床。被子叠成了豆腐块。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_270`,weight:5,minDay:10,maxTriggers:1,text:`屋顶避雷针。针尖熔了一个瘤。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_271`,weight:5,minDay:10,maxTriggers:1,text:`贴满便签的操作台。每张便签都是一个频段参数。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_272`,weight:5,minDay:10,maxTriggers:1,text:`墙上的信号覆盖图。用红笔圈了三个盲区。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_273`,weight:5,minDay:10,maxTriggers:1,text:`贴满便签的操作台。每张便签都是一个频段参数。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_274`,weight:5,minDay:10,maxTriggers:1,text:`墙上的信号覆盖图。用红笔圈了三个盲区。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_275`,weight:5,minDay:10,maxTriggers:1,text:`值班室的行军床。被子叠成了豆腐块。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_radio_parts`,amount:2},{kind:`item`,item:`key_radio_parts`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_276`,weight:5,minDay:10,maxTriggers:1,text:`天线基座的工具箱。扳手齐全，少了一把螺丝刀。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_277`,weight:5,minDay:10,maxTriggers:1,text:`屋顶避雷针。针尖熔了一个瘤。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_278`,weight:5,minDay:10,maxTriggers:1,text:`值班室的行军床。被子叠成了豆腐块。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_scrap_metal`,amount:2},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`key_battery`,amount:2},{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_radio_tower_279`,weight:5,minDay:10,maxTriggers:1,text:`成捆的同轴电缆。铜芯在断口处闪闪发亮。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`key_battery`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`item`,item:`tool_flashlight`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_280`,weight:5,minDay:1,maxTriggers:1,text:`半沉的帆船桅杆。帆布还能扯下来。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_281`,weight:5,minDay:1,maxTriggers:1,text:`潮池。一小片被困住的海。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_282`,weight:5,minDay:1,maxTriggers:1,text:`沙滩上的集装箱门。被海浪打磨得没了锐角。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_283`,weight:5,minDay:1,maxTriggers:1,text:`冲上岸的救生圈。圈绳上系着哨子。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_284`,weight:5,minDay:1,maxTriggers:1,text:`礁石缝里的酒瓶。瓶身贴着手写的价签。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_285`,weight:5,minDay:1,maxTriggers:1,text:`渔网缠成的球。网眼里挂着贝壳和浮子。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。
四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_286`,weight:5,minDay:1,maxTriggers:1,text:`一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_287`,weight:5,minDay:1,maxTriggers:1,text:`倾覆的皮划艇。艇底用马克笔写着"别放弃"。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_288`,weight:5,minDay:1,maxTriggers:1,text:`倾覆的皮划艇。艇底用马克笔写着"别放弃"。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_289`,weight:5,minDay:1,maxTriggers:1,text:`倾覆的皮划艇。艇底用马克笔写着"别放弃"。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_290`,weight:5,minDay:1,maxTriggers:1,text:`一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_291`,weight:5,minDay:1,maxTriggers:1,text:`渔网缠成的球。网眼里挂着贝壳和浮子。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_292`,weight:5,minDay:1,maxTriggers:1,text:`冲上岸的救生圈。圈绳上系着哨子。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_293`,weight:5,minDay:1,maxTriggers:1,text:`半沉的帆船桅杆。帆布还能扯下来。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。
刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_294`,weight:5,minDay:1,maxTriggers:1,text:`倾覆的皮划艇。艇底用马克笔写着"别放弃"。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_295`,weight:5,minDay:1,maxTriggers:1,text:`一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_296`,weight:5,minDay:1,maxTriggers:1,text:`潮池。一小片被困住的海。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_297`,weight:5,minDay:1,maxTriggers:1,text:`倾覆的皮划艇。艇底用马克笔写着"别放弃"。`,choices:[{id:`o_0`,text:`小心地只拿走最外面的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_298`,weight:5,minDay:1,maxTriggers:1,text:`一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。`,choices:[{id:`o_0`,text:`快速判断后取走了一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`冒险把整堆都扒了出来`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_299`,weight:5,minDay:1,maxTriggers:1,text:`冲上岸的救生圈。圈绳上系着哨子。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_300`,weight:5,minDay:1,maxTriggers:1,text:`沙滩上的集装箱门。被海浪打磨得没了锐角。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`salt`,amount:2},{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_301`,weight:5,minDay:1,maxTriggers:1,text:`渔网缠成的球。网眼里挂着贝壳和浮子。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`water_dirty`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。`},{id:`o_1`,text:`赌一把全部打包`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。
手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_302`,weight:5,minDay:1,maxTriggers:1,text:`冲上岸的救生圈。圈绳上系着哨子。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`mat_rope`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`item`,item:`med_first_aid`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。
草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_g_shipwreck_bay_303`,weight:5,minDay:1,maxTriggers:1,text:`冲上岸的救生圈。圈绳上系着哨子。`,choices:[{id:`o_0`,text:`挑拣出完好的一部分`,effects:[{kind:`item`,item:`salt`,amount:1},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`细水长流。你拿到了东西，也没惊动任何东西。
还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。`},{id:`o_1`,text:`贪心地把能搬的都搬上`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`item`,item:`food_canned`,amount:2},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。
一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。
一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。`}]},{id:`evt_nb_tiedan_deal`,weight:0,minDay:1,maxTriggers:-1,text:`「铁蛋杂货铺」在频道发来私信：

兄弟 我这儿有批好货 需要的话拿木头来换 2木=1罐头 怎么样？`,choices:[{id:`o_0`,text:`交易（-2木 +1罐头 +5sanity）`,effects:[],next:`__return__`,result:`铁蛋秒回：「爽快！下次有好货先找你。」你们的关系加深了。`},{id:`o_1`,text:`婉拒`,effects:[],next:`__return__`,result:`铁蛋：「行 需要再找我。」`}]},{id:`evt_nb_laomao_feed`,weight:0,minDay:1,maxTriggers:-1,text:`「三楼老猫」在频道喊：

谁有多余的鱼 我家三只猫断粮了 我可以用东西换`,choices:[{id:`o_0`,text:`给他一条鱼（-1鱼 +cat_bless flag）`,effects:[],next:`__return__`,result:`老猫：「救命了！！小花二花大花都谢谢你们！！
猫们的名字你记住了。`},{id:`o_1`,text:`表示同情但无能为力`,effects:[],next:`__return__`,result:`老猫：「……没事 我再想想办法。」`}]},{id:`evt_nb_laomei_signal`,weight:0,minDay:1,maxTriggers:-1,text:`「直播达人小美」发来私信：

我家电池快没电了 这是我直播的命 我愿意用医疗包换 有人有电池吗`,choices:[{id:`o_0`,text:`送她一节电池（-1电池 +key_amulet）`,effects:[],next:`__return__`,result:`小美：「家人们！！好心人！！我用急救包换！！
她在直播间举起急救包对着镜头挥手。`},{id:`o_1`,text:`自己也需要电池`,effects:[],next:`__return__`,result:`你没有回复。小美还在频道喊。`}]},{id:`evt_nb_laomao_dead`,weight:40,minDay:1,maxTriggers:1,text:`【频道讣告】

「三楼老猫」已36小时未发言。
最后一条消息是：「二花也没回来。」

你私聊了他，没有回复。

三楼的门虚掩着。里面有猫叫声，但没有人。`,choices:[{id:`o_0`,text:`前往三楼查看（解锁废墟）`,effects:[],next:`__return__`,result:`你推开三楼的门。

三只猫围着空碗转圈。桌上留着半袋猫粮和一张纸条：
「如果我不在了，帮我照顾它们。——老猫」

你解锁了废墟探索地点。`},{id:`o_1`,text:`在频道默哀`,effects:[],next:`__return__`,result:`你在频道打了三个句号。`}]},{id:`evt_nb_laomei_hunt`,weight:30,minDay:10,maxTriggers:1,text:`频道突然炸了——

「直播达人小美」：有人在外面！！不是好人！！他们在砸门！！

然后信号断了。

频道里一片混乱。有人说听到了尖叫声。`,choices:[{id:`o_0`,text:`赶去救援（需要武器 -6hp）`,effects:[],next:`__return__`,result:`你赶到时，小美正用椅子顶着门。门外两个人见你有武器，骂骂咧咧跑了。

小美：「谢谢你……我把镜头对准你了 家人们记住这个英雄！」`},{id:`o_1`,text:`太危险了`,effects:[],next:`__return__`,result:`你在频道里听了一夜。
第二天，小美的账号再也没有亮起来。`}]},{id:`evt_nb_laozhou_dead`,weight:35,minDay:1,maxTriggers:1,text:`【频道消息】

有人在南墙根老周家门口发现了拖拽痕迹。
棚子里只剩下孩子的玩具和半碗冷粥。

老周一家四口，全部失联。`,choices:[{id:`o_0`,text:`留下一张字条（+sanity）`,effects:[],next:`__return__`,result:`你写了张纸条：「如果你回来了，我们在东区。」压在枕头下面。

你解锁了老周家遗址。`},{id:`o_1`,text:`沉默离开`,effects:[],next:`__return__`,result:`你没有停留。你解锁了老周家遗址。`}]},{id:`evt_nb_mei_finale_safe`,weight:0,minDay:1,maxTriggers:1,text:`「直播达人小美」在频道发了一段话：

「家人们 我数了一下 我一共直播了14天。
从第1天对着空房间说话，到现在镜头里还有你们。

明天救援来的话 我会把所有录像公开。
最后一场直播——」

她把镜头转向你的木屋方向，挥手。`,choices:[{id:`o_0`,text:`挥手回应`,effects:[],next:`__return__`,result:`你在镜头里挥了挥手。小美笑了。

频道里有人刷：「活着真好。」`}]},{id:`evt_nb_mei_finale_gone`,weight:0,minDay:1,maxTriggers:1,text:`频道里有一条未读消息，来自两天前的「直播达人小美」：

「最后一场直播。镜头对着窗外的雾。
谢谢你们看了我14天。」

录像只有37秒。最后一帧是黑屏。`,choices:[{id:`o_0`,text:`保存录像`,effects:[],next:`__return__`,result:`你把录像保存了。有些东西值得被记住。`}]},{id:`evt_nb_reputation`,weight:0,minDay:1,maxTriggers:-1,text:`一条私信弹了出来——

「你好 我是等风来。听说你在迷雾边缘帮了那个孩子……谢谢你。」

附件：干净的水×1`,choices:[{id:`o_0`,text:`收下`,effects:[],next:`__return__`,result:`你收下了水。善意是会传递的。`}]},{id:`evt_night_footsteps`,weight:12,minDay:1,maxTriggers:1,text:`深夜，你被头顶细碎的脚步声惊醒。那声音很轻、很慢，像是有什么东西正围着烟囱踱步……`,choices:[{id:`o_0`,text:`抄起武器冲出去`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`sanity`,delta:-14}],next:`__return__`,result:`一只灰白的野猫窜过屋脊。虚惊一场。
一团黑影扑面而来！你挥舞着击退了它，手臂却被抓伤了。
你什么都没看清。之后整夜，脚步声都在你耳边打转。`},{id:`o_1`,text:`裹紧被子装睡`,effects:[{kind:`resource`,resource:`sanity`,delta:-7},{kind:`resource`,resource:`sanity`,delta:-9},{kind:`item`,item:`food_canned`,amount:-1}],next:`__return__`,result:`不知过了多久，声音消失了。你又活过了一夜。
天亮时你发现储备的罐头少了一个……它进过屋里。`}]},{id:`evt_night_knock`,weight:10,minDay:1,maxTriggers:1,text:`笃、笃、笃。三声不紧不慢的敲门声。现在是凌晨两点。「有人吗……救救我……」门外的声音很虚弱。`,choices:[{id:`o_0`,text:`开门`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-16},{kind:`resource`,resource:`sanity`,delta:-10}],next:`__return__`,result:`是个浑身湿透的女人。她吃了你的食物，天亮前离开了，留下一把铜钥匙作为报答。
门外空无一人。只有门板上五道深深的爪痕。
「救救我」的东西猛地扑进门框！你用尽全力才把它抵出去。`},{id:`o_1`,text:`死死顶住门不出声`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`sanity`,delta:-13}],next:`__return__`,result:`敲门声持续到凌晨三点，戛然而止。
门板在震颤中裂了一道缝。有什么东西窥视了你很久才离开。`}]},{id:`evt_night_rat_steal`,weight:8,minDay:1,maxTriggers:1,text:`悉悉索索的声音从房梁上传来。一群雾鼠正在搬运你的储备粮。`,choices:[{id:`o_0`,text:`点火把驱赶`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`火光冲天而起，鼠群四散奔逃。保住了物资。`},{id:`o_1`,text:`扔东西砸`,effects:[{kind:`item`,item:`food_berry`,amount:-1},{kind:`resource`,resource:`sanity`,delta:-5},{kind:`item`,item:`food_biscuit`,amount:-1}],next:`__return__`,result:`砸中了！鼠群哄散。但你的储备也遭了殃。
全砸空了。它们拖着战利品扬长而去。`}]},{id:`evt_night_whisper`,weight:15,minDay:1,maxTriggers:1,text:`「回家吧……」一个熟悉的声音贴着你的耳朵响起。是妈妈？可妈妈明明远在千里之外。窗外的浓雾里，有个轮廓正缓缓成形。`,choices:[{id:`o_0`,text:`跟着声音走出去`,effects:[{kind:`resource`,resource:`sanity`,delta:-18},{kind:`resource`,resource:`sanity`,delta:-10}],next:`__return__`,result:`你走到院子中央，寒意让你猛然惊醒——那个「妈妈」的轮廓在你面前三步处凝固了，然后无声地散开。你连滚带爬回到屋里。
你越走越深。第二天清晨，救援队在木屋外的雾里找到了昏迷的你——离屋子三百米，赤着脚。`},{id:`o_1`,text:`捂住耳朵默数到一百`,effects:[{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`数到六十七的时候，声音消失了。天亮后你发现自己指甲抠进了掌心。`}]},{id:`evt_night_fire_out`,weight:12,minDay:1,maxTriggers:1,text:`半夜你被冷意惊醒——火堆只剩一层将熄的红光，像随时会断气的萤火虫。柴架上的木柴已经见底。`,choices:[{id:`o_0`,text:`摸黑起来添柴（消耗木材）`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`item`,item:`mat_wood`,amount:-1}],next:`__return__`,result:`火星子噼啪一声重新窜起。你裹着毯子看着火苗发呆，竟觉得无比安心。`},{id:`o_1`,text:`拆一把椅子救急`,effects:[{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`那把从超市搬回来的椅子完成了它最后的使命。
湿椅子烧出满屋浓烟，你呛得眼泪直流也没能救回火。`},{id:`o_2`,text:`裹紧所有衣物硬扛`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`这一夜格外漫长。你的牙齿咯咯响到天明，指尖冻得发紫。`}]},{id:`evt_night_handprint`,weight:11,minDay:1,maxTriggers:1,text:`清晨前的最后一波睡意里，你听见窗外「啪」的一声轻响——像是手掌按在玻璃上的声音。这扇窗户，昨天刚钉好木板。`,choices:[{id:`o_0`,text:`掀开木板看一眼`,effects:[{kind:`resource`,resource:`sanity`,delta:-13},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`玻璃上是一个清晰的手印，五指细长得不合比例，正缓缓向下滑落，像它的主人顺着窗户滑了下去。
什么都没有。只有你自己的哈气在玻璃上凝成雾圈。`},{id:`o_1`,text:`把柜子推过去堵住窗户`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`重物压地板的吱呀声里，你居然又睡着了。人类的心理防线有时候就这么朴实无华。`}]},{id:`evt_night_crying`,weight:10,minDay:1,maxTriggers:1,text:`呜……呜……哭声从迷雾深处传来，忽远忽近。是个女人，或者声音像女人的什么东西。它听起来很伤心，伤心得让人心里发毛。`,choices:[{id:`o_0`,text:`循着哭声走过去`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`flag`,flag:`helped_crying_woman`},{kind:`item`,item:`mat_cloth`,amount:-1},{kind:`item`,item:`water_clean`,amount:2},{kind:`resource`,resource:`sanity`,delta:-14}],next:`__return__`,result:`你在一片空地上找到了蜷缩的她——一个真实的、冻得发抖的幸存者。你把备用毛毯给了她。她指了给你看一处水源作为回报。
哭声在你靠近时突然停止了。四周安静得能听见自己的心跳。你转身狂奔，身后的脚步声追了你一百米才消失。`},{id:`o_1`,text:`堵住耳朵，在心里道歉`,effects:[{kind:`resource`,resource:`sanity`,delta:-9}],next:`__return__`,result:`哭声一直持续到凌晨三点，然后戛然而止。那种突然的寂静比哭声更可怕。`}]},{id:`evt_night_rat_king`,weight:8,minDay:1,maxTriggers:1,text:`厨房传来一阵窸窸窣窣。你举起火把一照——十几只雾鼠整齐地蹲在储物箱前，为首那只足有猫大，额前长着一撮白毛。它们齐刷刷地看着你，不逃也不动。`,choices:[{id:`o_0`,text:`供奉一块食物`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`rat_king_pact`},{kind:`item`,item:`food_canned`,amount:-1}],next:`__return__`,result:`白毛鼠王叼起食物，鼠群鱼贯而出，临走前它回头看了你一眼。之后你的屋子再没闹过耗子——它们认下了你这个邻居。`},{id:`o_1`,text:`抄起扫帚全灭了他`,effects:[{kind:`resource`,resource:`sanity`,delta:-4},{kind:`item`,item:`food_biscuit`,amount:1},{kind:`resource`,resource:`sanity`,delta:-10},{kind:`item`,item:`food_biscuit`,amount:-1}],next:`__return__`,result:`一场大战！你浑身是灰地站在这群强盗的尸体中间，夺回了储备粮。
鼠王一声尖啸，鼠群如黑色潮水般扑来！你且战且退，最后是火把救了你——但储物区已被洗劫一空。`}]},{id:`evt_night_dawn_bell`,weight:6,minDay:1,maxTriggers:1,text:`凌晨四点四十四分，远处传来了钟声。当——当——当。一共响了七下。这个世界没有教堂，也没有钟楼。世界频道的消息停在了三分钟前。`,choices:[{id:`o_0`,text:`跟着钟声数：一、二、三……`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`heard_bells`},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`heard_eighth_bell`}],next:`__return__`,result:`七下。不多不少。钟声停后，整个世界的呼吸仿佛都顺畅了些。你说不上为什么，但你觉得这是个好兆头。
第七下之后，还有极轻的第八下——像是故意藏起来的。那一整天你都在琢磨：八下意味着什么？`}]},{id:`evt_night_dream_warning`,weight:7,minDay:1,maxTriggers:1,text:`梦里你站在自家门口，门上贴着一张纸条，上面的字迹模糊不清，只看清了开头两个字：「明天」。你想凑近去看，梦却醒了。`,choices:[{id:`o_0`,text:`醒来后把梦记下来，处处当心`,effects:[{kind:`resource`,resource:`sanity`,delta:2},{kind:`flag`,flag:`dream_caution`}],next:`__return__`,result:`小心使得万年船。这一天你避开了所有的冒险选择——也许纸条写的就是这个意思？`},{id:`o_1`,text:`梦就是梦，翻个身继续睡`,effects:[{kind:`resource`,resource:`sanity`,delta:3}],next:`__return__`,result:`一夜无梦到天亮。挺好。`}]},{id:`evt_night_breathing`,weight:9,minDay:1,maxTriggers:1,text:`万籁俱寂中，你听见了——门外有呼吸声。很慢、很深、很有耐心。它就站在那里，隔着木板和你一起呼吸着这个夜晚。`,choices:[{id:`o_0`,text:`对着门说：我看见你了`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`呼吸声停了一拍，然后渐渐远去。虚张声势有时真的有用——对它们，也对你自己。
呼吸声停了。然后，门板上传来「咚」的一声轻响，像是它把额头抵在了门上。你僵在原地直到天亮。`},{id:`o_1`,text:`屏住呼吸和它比耐力`,effects:[{kind:`resource`,resource:`sanity`,delta:-7}],next:`__return__`,result:`你憋到眼前发黑也没出声。天亮时门外空无一物，只有地上一小片比别处更浓的湿雾。`}]},{id:`evt_night_moonlight`,weight:5,minDay:1,maxTriggers:1,text:`后半夜，浓雾忽然裂开了一道口子——真正的月光倾泻进来，落在你的床沿。那是穿越以来你见到的第一缕直接来自天空的光。`,choices:[{id:`o_0`,text:`走到光里站一会儿`,effects:[{kind:`resource`,resource:`sanity`,delta:15}],next:`__return__`,result:`银白色的光凉凉的，像一只手轻轻按在你头顶。你仰起脸，透过那道雾隙看见了三颗星星。「还在。」你说，「都还在。」`}]},{id:`evt_n2_sleepwalk`,weight:8,minDay:1,maxTriggers:1,text:`刺骨的凉意把你惊醒——你正站在屋子中央，赤着脚，右手紧紧攥着什么。睁开手：一把菜刀。`,choices:[{id:`o_0`,text:`把刀放回厨房锁进柜子`,effects:[{kind:`resource`,resource:`sanity`,delta:-6}],next:`__return__`,result:`你摸黑完成了一切，然后坐在床沿等到天亮。至少这次你是自己醒的。`},{id:`o_1`,text:`检查门是否关好`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`门闩完好。你是从梦里自己走出来的，不是被叫出去的。谢天谢地。
门开着一条缝。门外泥地上有一圈脚印围着你的房子转了整整一周。`}]},{id:`evt_n2_closet_breath`,weight:9,minDay:1,maxTriggers:1,text:`半夜你被一阵极轻的、绵长的呼吸声惊醒。声音来自壁橱。节奏和你的一模一样——你屏住，它也停了。`,choices:[{id:`o_0`,text:`猛地拉开橱门`,effects:[{kind:`resource`,resource:`sanity`,delta:-7},{kind:`resource`,resource:`sanity`,delta:-13}],next:`__return__`,result:`里面只挂着你的旧外套。可外套的口袋是翻出来的，拉链全拉开了。
一团黑影像被倒出的水一样泻在地上，从门缝里流走了。你的外套再也没找到过。`},{id:`o_1`,text:`对着壁橱说：我知道你在`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`resource`,resource:`sanity`,delta:-10}],next:`__return__`,result:`呼吸声停了几秒，然后极轻地叹了口气，从此消失。承认它的存在反而让它退场。
里面传出一个用你的声音说的话：'我也知道你在。'那一夜你们谁都没有先眨眼。`}]},{id:`evt_n2_queue_outside`,weight:7,minDay:1,maxTriggers:1,text:`月光把窗棂投在墙上。你数了数影子：窗棂只有四格，墙上的影子却有五条。多出来的那条在缓缓移动。`,choices:[{id:`o_0`,text:`数清楚它移动的规律`,effects:[{kind:`resource`,resource:`sanity`,delta:-9},{kind:`flag`,flag:`queue_seen`},{kind:`resource`,resource:`sanity`,delta:4}],next:`__return__`,result:`它每七秒挪动一格，像在排队等着进入什么。天亮时它排到了门口的位置。
你盯着看了半夜，终于确认：那是云。只是云。你为这个答案长出一口气。`},{id:`o_1`,text:`拉上窗帘睡觉`,effects:[{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`眼不见心不烦。半夜你听见玻璃上很轻的一声叩击，像道别。`}]},{id:`evt_n2_moon_figure`,weight:7,minDay:1,maxTriggers:1,text:`薄雾裂开的间隙里，院子里立着一个笔直的人形。它没有动作，月光穿过它时也没有影子。`,choices:[{id:`o_0`,text:`开窗问它要什么`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`asked_figure`},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`'借一步说话。'它的声音像很多人叠在一起。你没有去。它点点头消散了——竟像是如释重负。
它缓缓转头。那张脸是你自己的，只是表情是你从未有过的绝望。`},{id:`o_1`,text:`熄灯装睡到天明`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`你听着自己的心跳熬到鸡叫。晨光里院子里空无一物，只有一圈焦黑的印子。
半梦半醒间，有人替你掖了掖被角。手法温柔得熟悉。`}]},{id:`evt_n2_furniture_drag`,weight:8,minDay:1,maxTriggers:1,text:`楼下传来沉重的摩擦声——有什么东西正在拖动你的桌子，一下，一下，往门口的方向挪。`,choices:[{id:`o_0`,text:`冲下去阻止`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`resource`,resource:`sanity`,delta:-14},{kind:`flag`,flag:`cellar_sealed`}],next:`__return__`,result:`灯亮的瞬间一切归位。只有桌腿上多了五道新鲜的刮痕，方向朝着门。
你看见桌子自己立起来，用四条腿飞快地爬进了黑暗的地窖口。你把地窖钉死了。`},{id:`o_1`,text:`在楼上敲地板三下`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`knock_pact`},{kind:`resource`,resource:`sanity`,delta:-11}],next:`__return__`,result:`楼下安静了。过了一会儿，下面回敲了两下。像某种约定达成了。
楼下回敲了十七下。为什么是十七下？你数了三遍。就是十七下。`}]},{id:`evt_n2_humming`,weight:8,minDay:1,maxTriggers:1,text:`雾夜静得能听见露水凝结。这时窗外飘来一段哼唱，温柔的摇篮曲，一遍又一遍，永远差最后一句没唱完。`,choices:[{id:`o_0`,text:`轻声接上最后一句`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`song_completed`},{kind:`resource`,resource:`sanity`,delta:-12}],next:`__return__`,result:`你唱完了那句尾音。外面安静了几秒，然后一个苍老的声音说：'谢谢你，孩子。她找这首歌找了好久了。'
你的声音刚落，摇篮曲戛然而止。所有虫鸣也停了。你意识到自己唱错了一个音。`},{id:`o_1`,text:`用被子蒙住头`,effects:[{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`曲子在黎明前终于唱完了最后一句。你不知道该庆幸还是难过。`}]},{id:`evt_n2_fire_sparks`,weight:7,minDay:1,maxTriggers:1,text:`火堆里一颗松果爆出满堂金星。飞舞的火星在夜里划出金线，像一场微型的流星雨。`,choices:[{id:`o_0`,text:`往火里再丢颗松果看更大的`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`resource`,resource:`sanity`,delta:-1}],next:`__return__`,result:`轰！火星冲起一人高。你笑得像个孩子，暂时忘了门外是世界末日。
第二颗松果是湿的，炸出一股呛人的白烟，你咳出了眼泪。`},{id:`o_1`,text:`借着火光修补衣物`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`item`,item:`mat_cloth`,amount:-2},{kind:`item`,item:`med_bandage`,amount:1}],next:`__return__`,result:`针脚歪歪扭扭但结实。劳动和火光是最好的安眠药。`}]},{id:`evt_n2_frost_mirror`,weight:7,minDay:1,maxTriggers:1,text:`寒夜，水缸边的镜子结满了霜花。霜层上被人用指尖画了一个笑脸——霜是从内侧开始结的。`,choices:[{id:`o_0`,text:`擦掉笑脸`,effects:[{kind:`resource`,resource:`sanity`,delta:-12},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`擦干净的那一刻，你在镜中看见身后站着人。转身，无人。再看镜子，笑脸又回来了。
你把它改成哭脸。第二天霜化了，镜面干干净净，像什么都没发生过。`},{id:`o_1`,text:`在旁边画一张自己的脸`,effects:[{kind:`resource`,resource:`sanity`,delta:6},{kind:`flag`,flag:`frost_friend`}],next:`__return__`,result:`两张笑脸并排挂着。你退后看看，觉得这面镜子总算有点人气了。`}]},{id:`evt_n2_flashlight_signal`,weight:8,minDay:10,maxTriggers:1,text:`浓雾深处，一束手电光规律地闪烁：三短，三长，三短。然后是长久的等待，又开始重复。有人在求救。`,choices:[{id:`o_0`,text:`用手电回应`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`responded_sos`},{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`sos_approach`}],next:`__return__`,result:`对面的光乱了片刻，随即打出两个字的方向：'别来'。然后彻底熄灭。
对面回以急促的三闪，随后光点开始向你的方向移动！你抄起了门闩。`},{id:`o_1`,text:`记下方位明天白天去找`,effects:[{kind:`resource`,resource:`sanity`,delta:-2},{kind:`flag`,flag:`sos_marked`}],next:`__return__`,result:`你在地图上做了标记。白天的雾林总归安全些——大概。`}]},{id:`evt_n2_radio_selfon`,weight:7,minDay:10,maxTriggers:1,text:`收音机在深夜自己亮起了指示灯。旋钮纹丝未动，喇叭里的女声清晰得可怕：'……检测到幸存者生命体征……编号114……'`,choices:[{id:`o_0`,text:`对着话筒回答：我是114号`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`numbered_114`},{kind:`resource`,resource:`sanity`,delta:-15}],next:`__return__`,result:`'114号，记录：仍然活着。'电流声顿了顿，'请继续保持。'指示灯温柔地灭了。不知为何你睡得很沉。
'114号，更正：已于昨日注销。'女声毫无起伏。指示灯灭掉的瞬间你听见自己牙齿打颤的声音。`},{id:`o_1`,text:`拔电源砸机器`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`radio_smashed`},{kind:`item`,item:`tool_radio`,amount:-1}],next:`__return__`,result:`你抡起它砸在墙上，塑料壳裂成两半。指示灯又亮了三秒才不甘心地熄灭。`}]},{id:`evt_exp_crystal_1`,weight:25,minDay:12,maxTriggers:1,text:`洞壁上嵌满了淡蓝色结晶，手指触碰时微微发热。
你小心翼翼撬下一块。`,choices:[{id:`o_0`,text:`仔细采集`,effects:[],next:`__return__`,result:`你获得了两块结晶。`},{id:`o_1`,text:`只取一块就走`,effects:[],next:`__return__`,result:`一块足够了。贪心在迷雾中不是好品质。`}]},{id:`evt_exp_crystal_2`,weight:25,minDay:12,maxTriggers:1,text:`洞穴深处传来低沉的嗡鸣声。结晶在黑暗中发出微弱的脉动。
空气中有股奇怪的甜味。`,choices:[{id:`o_0`,text:`深入探索（风险）`,effects:[],next:`__return__`,result:`你冒险深入，收获了三块结晶。但嗡鸣声让你头痛欲裂。`},{id:`o_1`,text:`在外围采集`,effects:[],next:`__return__`,result:`外围的结晶品质一般，但至少安全。`}]},{id:`evt_exp_crystal_3`,weight:20,minDay:12,maxTriggers:1,text:`洞穴角落有一具骸骨，手中紧握着一块特别大的结晶。
旁边散落着一本笔记。`,choices:[{id:`o_0`,text:`取走结晶（-3sanity）`,effects:[],next:`__return__`,result:`你掰开骸骨的手指，取走了那块拳头大的结晶。
笔记上写着：「结晶会唱歌 但不要听太久」`},{id:`o_1`,text:`不打扰逝者`,effects:[],next:`__return__`,result:`你鞠了一躬，转身离开。有些东西不该拿。`}]},{id:`evt_exp_laomao_1`,weight:25,minDay:1,maxTriggers:1,text:`三楼一片狼藉。但猫砂盆整齐排列，碗里的猫粮已经发霉。
窗台上有个猫窝，里面窝着一只橘猫。`,choices:[{id:`o_0`,text:`喂猫（-1food）`,effects:[],next:`__return__`,result:`橘猫警惕地闻了闻，然后大口吃起来。它没有跑。`},{id:`o_1`,text:`搜索物资`,effects:[],next:`__return__`,result:`你在柜子里找到了绷带和布料。老猫的存货。`}]},{id:`evt_exp_laomao_2`,weight:25,minDay:1,maxTriggers:1,text:`三只猫围了上来——小花、二花、大花。
它们认出了你。那只喂过它们鱼的人。

二花蹭了蹭你的腿，叼来一个东西放在你脚边。`,choices:[{id:`o_0`,text:`捡起来`,effects:[],next:`__return__`,result:`是一盒急救包。老猫藏的。

纸条上写着：「给帮过我们的人。——猫们」`}]},{id:`evt_exp_laomao_3`,weight:20,minDay:1,maxTriggers:1,text:`墙上贴满了猫的照片。每只都有名字。
最中间一张全家福：三只猫和一个人。
背面写着：「小花 二花 大花 和我 我们是一家人」`,choices:[{id:`o_0`,text:`拍照留念`,effects:[],next:`__return__`,result:`你拍下了这张全家福。有些温暖值得被记住。`},{id:`o_1`,text:`拿走照片`,effects:[],next:`__return__`,result:`你把照片收进口袋。`}]},{id:`evt_exp_laozhou_1`,weight:25,minDay:1,maxTriggers:1,text:`棚子里散落着孩子的玩具：积木、小汽车、一只缺了耳朵的布熊。
墙上用粉笔画着一家四口手牵手。`,choices:[{id:`o_0`,text:`检查柜子`,effects:[],next:`__return__`,result:`柜子里还有木柴和罐头。老周攒的。`},{id:`o_1`,text:`带走布熊`,effects:[],next:`__return__`,result:`你捡起那只缺耳朵的布熊。它很轻。`}]},{id:`evt_exp_laozhou_2`,weight:25,minDay:1,maxTriggers:1,text:`地上有一张纸条，是孩子的字迹：

「爸爸说等雾散了 带我们去看海」`,choices:[{id:`o_0`,text:`收好纸条`,effects:[],next:`__return__`,result:`你把纸条叠好放进口袋。有些承诺在末日里依然闪闪发光。`},{id:`o_1`,text:`放回原处`,effects:[],next:`__return__`,result:`有些话属于这里。`}]},{id:`evt_exp_laozhou_3`,weight:20,minDay:1,maxTriggers:1,text:`棚子后面有个小菜园，几棵白菜还在长。
有人用塑料布搭了个简易温室。`,choices:[{id:`o_0`,text:`采摘白菜`,effects:[],next:`__return__`,result:`白菜还有些营养。你采了三棵。`},{id:`o_1`,text:`给菜园浇水`,effects:[],next:`__return__`,result:`你用水壶给菜园浇了水。也许还会有人回来吃。`}]},{id:`evt_story_eye_of_mist`,weight:0,minDay:1,maxTriggers:1,text:`三块结晶在石台上悬浮起来，缓缓咬合成一只眼睛的形状。浓雾以石台为圆心向四面八方退开——你看见了天空、远山、以及雾下真实的世界。一只巨大的、由纯粹光构成的瞳孔在你面前缓缓睁开。`,choices:[{id:`o_0`,text:`直视它`,effects:[],next:`__return__`,result:`瞳孔里没有审判，只有注视——像整个世界第一次认真看见了你。无数信息涌入脑海：雾的来历、游戏的规则、回家的路。当你再睁开眼时，掌心多了一枚发光的印记。救援直升机会找到你的。它必须找到你。`},{id:`o_1`,text:`闭上眼，转身逃走`,effects:[{kind:`resource`,resource:`sanity`,delta:-15}],next:`__return__`,result:`身后传来一声悠长的叹息。等你回头，一切如初：石台空着，结晶碎了，雾合拢了。有些门只开一次。`}]},{id:`evt_echo_woman_gift`,weight:6,minDay:1,maxTriggers:1,text:`清晨开门，门槛上放着一小捆草药，压着张字条：「上次多谢你的毯子。我往南走了。你也保重。——一个被你救过的人」`,choices:[{id:`o_0`,text:`收下这份心意`,effects:[{kind:`resource`,resource:`sanity`,delta:14},{kind:`item`,item:`med_antibiotic`,amount:1},{kind:`item`,item:`water_clean`,amount:1}],next:`__return__`,result:`抗生素和一壶净水。原来善意在迷雾里是会流动的。`}]},{id:`evt_echo_looter_revenge`,weight:7,minDay:1,maxTriggers:1,text:`黄昏归途，一道黑影从废墟后闪出堵住去路——是超市那个铁管男。「找到你了。」他活动着手腕，眼神阴沉。`,choices:[{id:`o_0`,text:`抄家伙干他`,effects:[{kind:`flag`,flag:`looter_done`},{kind:`item`,item:`mat_scrap_metal`,amount:1},{kind:`item`,item:`food_canned`,amount:1},{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`looter_done`},{kind:`item`,item:`food_canned`,amount:-1}],next:`__return__`,result:`几回合交锋后他丢下铁管跑了。你捡起他的「武器」，顺手搜了他的口袋。
你败了。他抢走一个罐头，撂下狠话消失在雾里。`},{id:`o_1`,text:`递上一个罐头赔罪`,effects:[{kind:`resource`,resource:`sanity`,delta:5},{kind:`flag`,flag:`looter_done`},{kind:`item`,item:`food_canned`,amount:-1}],next:`__return__`,result:`他盯着罐头看了半天，忽然泄了气似的接过去：「……算了。那天是我先动的手。」恩怨两清。`},{id:`o_2`,text:`转身就跑`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`looter_done`}],next:`__return__`,result:`你在废墟间七拐八绕甩掉了追踪。但从此每次外出都感觉背后有视线。`}]},{id:`evt_echo_rats_gift`,weight:5,minDay:1,maxTriggers:1,text:`清晨，门口整整齐齐摆着一样东西——白毛鼠王带着两只小鼠蹲在三步外看着你。它把那东西往前拱了拱。`,choices:[{id:`o_0`,text:`收下`,effects:[{kind:`resource`,resource:`sanity`,delta:12},{kind:`item`,item:`key_radio_parts`,amount:1}],next:`__return__`,result:`是一个无线电零件！上面还有细小的齿印。「……你们从哪翻出来的？」鼠王满意地眯起眼，带着手下钻进墙缝。你和鼠邦签订了永久和平条约。`}]},{id:`evt_story_shipwreck_gate`,weight:6,minDay:1,maxTriggers:1,text:`三块地图碎片严丝合缝地拼在一起，指向浓雾深处的一线海崖。你循着指引穿过最后一道雾墙——眼前豁然开朗：一艘搁浅的巨轮斜插在月牙形的海湾里，船身斑驳，却完好得不可思议。`,choices:[{id:`o_0`,text:`登上沉船探索`,effects:[{kind:`item`,item:`key_signal_gun`,amount:1},{kind:`item`,item:`food_canned`,amount:2}],next:`__return__`,result:`船长室里，航海日志停在穿越那一天。而保险柜里静静躺着：信号枪、药品、罐头山——还有一台崭新的卫星电话。你在甲板上燃起信号堆，这一次，烟柱笔直得像一根通天柱。（隐藏结局）`}]},{id:`evt_s_rescue_start`,weight:13,minDay:10,maxTriggers:1,text:`收音机里忽然插进一条清晰的讯息：'东经xxx，北纬xx，安全区开放。重复，安全区开放。'坐标就在三十公里外的山那头。`,choices:[{id:`o_0`,text:`记下坐标并开始准备行囊`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`rescue_plan`}],next:`__return__`,result:`你把坐标刻在门框上。三十公里，穿过最浓的雾——但那是一个方向，一个盼头。`}]},{id:`evt_s_rescue_team`,weight:0,minDay:1,maxTriggers:1,text:`轰鸣声穿透浓雾由远及近！一架直升机贴着雾顶盘旋，探照灯的光柱扫过你的屋顶——他们真的来了。`,choices:[{id:`o_0`,text:`点燃信号堆`,effects:[{kind:`resource`,resource:`sanity`,delta:15},{kind:`flag`,flag:`rescue_done`},{kind:`flag`,flag:`flare_used`},{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`rescue_missed`}],next:`__return__`,result:`浓烟笔直地升起。光柱停在你家上空，扩音器里传出人声：'坚持住！我们放下吊索！'
柴太潮，烟起得断断续续。光柱悬停良久，最终缓缓移向了别处。你在原地站到天黑。`},{id:`o_1`,text:`挥舞床单大声呼喊`,effects:[{kind:`resource`,resource:`sanity`,delta:15},{kind:`flag`,flag:`rescue_done`},{kind:`flag`,flag:`flare_used`},{kind:`resource`,resource:`sanity`,delta:-12},{kind:`flag`,flag:`rescue_missed`}],next:`__return__`,result:`白色床单在探照灯下格外显眼。直升机降低高度，风压吹倒了半面篱笆——但谁在乎呢！他们看见你了！
雾太厚，光柱三次掠过又移开。你追着轰鸣声跑了整个山坡，直到双腿发软。`}]},{id:`evt_s_crystal_dream`,weight:11,minDay:12,maxTriggers:1,text:`你做了一个过分清醒的梦。梦里所有的结晶连成一张网，网的中心悬浮着一句话：'我们不是雾。我们是记得。'`,choices:[{id:`o_0`,text:`在梦里问：记得什么？`,effects:[{kind:`resource`,resource:`sanity`,delta:-8},{kind:`flag`,flag:`crystal_truth`},{kind:`flag`,flag:`crystal_dream_done`},{kind:`resource`,resource:`sanity`,delta:-12},{kind:`flag`,flag:`hand_matched`},{kind:`flag`,flag:`crystal_dream_done`}],next:`__return__`,result:`无数画面涌来：这里曾是座热闹的镇子。雾降下那晚，所有人都还在——只是换了一种存在方式。
网收紧了。你在窒息中惊醒，掌心的结晶烫得像烙铁。它烙下一个图案：那只发光的手印。`},{id:`o_1`,text:`拒绝这个梦，醒来`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`crystal_dream_done`},{kind:`item`,item:`key_mist_crystal`,amount:-1}],next:`__return__`,result:`你猛地坐起，把结晶扔出了窗外。窗外传来一声很轻的、像是叹息的落地声。`}]},{id:`evt_s_crystal_call`,weight:0,minDay:1,maxTriggers:1,text:`今夜的雾与以往不同——它在你的门前让开了一条笔直的路，路的尽头有光。所有低语汇成一句：'来看看我们。'`,choices:[{id:`o_0`,text:`走上那条路`,effects:[{kind:`resource`,resource:`sanity`,delta:20},{kind:`flag`,flag:`fog_eye_done`},{kind:`item`,item:`key_mist_crystal`,amount:1},{kind:`resource`,resource:`sanity`,delta:-15},{kind:`flag`,flag:`fog_eye_done`}],next:`__return__`,result:`路的尽头，你终于看清了雾的真容：千万张温柔的脸，守着一座沉睡的小镇。它们等你很久了。你伸出手——然后你在自家床上醒来，晨光满屋，掌心多了一颗温热的结晶。
你越走越深，四周的脸渐渐变得饥饿。最后关头你咬破舌尖，剧痛让你转身狂奔——身后，无数声音在齐声喊你的名字。`},{id:`o_1`,text:`关门，上闩，点灯`,effects:[{kind:`resource`,resource:`sanity`,delta:-5},{kind:`flag`,flag:`fog_eye_refused`},{kind:`flag`,flag:`fog_eye_done`}],next:`__return__`,result:`你在灯下坐到天明。门外的小路上，雾久久没有合拢——像一道敞开的门，和一个没有被赴约的约定。`}]},{id:`evt_s_doc_visit`,weight:12,minDay:1,maxTriggers:1,text:`敲门声响起，门外站着背包袱的老医生：'路过，讨口水。顺便看看——你这有没有伤病需要处理？收费公道。'`,choices:[{id:`o_0`,text:`请他治疗（付草药或布料）`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`item`,item:`herb_green`,amount:-2},{kind:`resource`,resource:`sanity`,delta:8},{kind:`item`,item:`herb_green`,amount:-2}],next:`__return__`,result:`老人手艺精湛，三下五除二处理好你的伤口，还教了你一套土方。
他治好了伤，却盯着你的气色皱眉：'年轻人，心病比身病难医。'这句话你琢磨了一整天。`},{id:`o_1`,text:`请他喝茶聊天`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`item`,item:`tea_herb`,amount:-1},{kind:`item`,item:`med_antibiotic`,amount:1}],next:`__return__`,result:`一壶茶的时间，他讲了雾降那天医院里的故事。临走留下半盒抗生素：'用不上就当存着。'`},{id:`o_2`,text:`婉拒，但送他一段路`,effects:[{kind:`resource`,resource:`sanity`,delta:5}],next:`__return__`,result:`你陪他走到雾墙边。分别时他拍拍你的肩：活着的人，别亏待自己。这句话比药管用。`}]},{id:`evt_s_ratking_offer`,weight:0,minDay:1,maxTriggers:1,text:`清晨，门槛外整整齐齐码着几样东西：一颗纽扣电池、一枚亮闪闪的硬币、还有一朵不知从哪摘的野花。不远处，白毛鼠王带着族群静静看着你。`,choices:[{id:`o_0`,text:`收下礼物，回赠一块饼干`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`ratking_gift`},{kind:`item`,item:`food_biscuit`,amount:-1},{kind:`item`,item:`key_battery`,amount:1}],next:`__return__`,result:`饼干被最小的那只鼠小心翼翼地拖走了。从此你的储物间再也没丢过一粒粮。`},{id:`o_1`,text:`只收礼物不回礼`,effects:[{kind:`resource`,resource:`sanity`,delta:-3},{kind:`flag`,flag:`ratking_gift`},{kind:`item`,item:`key_battery`,amount:1}],next:`__return__`,result:`你收下了东西。鼠王看了你很久，转身离去。那之后，夜里偶尔仍有窸窣声绕着粮仓转。`}]},{id:`evt_v110_patch`,weight:0,minDay:1,maxTriggers:1,text:`【世界公告】迷雾纪元 v1.1 补丁已部署——

■ 「区域排行榜」上线：生存者按庇护所、技能、存活天数排名
■ 你已被分配至「东七区」。请为你的据点命名，称号将同步至全区域频道。

⚠ 迷雾浓度上升：夜行生物变得更活跃，请加固庇护所。`,choices:[{id:`o_0`,text:`命名为「灯塔小筑」`,effects:[],next:`__return__`,result:`【据点命名成功】灯塔小筑——愿它成为迷雾中的坐标。`},{id:`o_1`,text:`命名为「野猫窝」`,effects:[],next:`__return__`,result:`【据点命名成功】野猫窝——你取的，你开心就好。`},{id:`o_2`,text:`命名为「铁皮屋」`,effects:[],next:`__return__`,result:`【据点命名成功】铁皮屋——朴实无华，但很结实。`}]},{id:`evt_rank_d4`,weight:0,minDay:1,maxTriggers:1,text:`【排行榜速报】东七区第1期排名出炉——

你当前排位：#7 / 187人
当前榜首「咸鱼翻身」庇护所Lv3 + 采集满级。

提示：提升庇护所等级和技能可快速升榜。排名影响每周补给箱品质。`,choices:[{id:`o_0`,text:`继续努力`,effects:[],next:`__return__`,result:`排名中游，不急不躁。`},{id:`o_1`,text:`争取前十`,effects:[],next:`__return__`,result:`前十在望，差一点。`},{id:`o_2`,text:`无所谓排名`,effects:[],next:`__return__`,result:`你关掉了排行榜。活命要紧。`}]},{id:`evt_v115_patch`,weight:0,minDay:1,maxTriggers:1,text:`【世界公告】迷雾纪元 v1.5 补丁已部署——

■ 「雾潮协议」生效：迷雾浓度周期性波动，今夜将出现第1次雾潮
■ 结晶矿脉在浓雾区被探测到（解锁新区域：结晶洞）

⚠ 夜间需火光或门闩抵御雾潮侵袭。`,choices:[{id:`o_0`,text:`上报你的联合地图（+knowledge）`,effects:[],next:`__return__`,result:`你将联合勘测地图上传至区域频道。系统奖励knowledge经验+25。`},{id:`o_1`,text:`仔细阅读协议条款`,effects:[],next:`__return__`,result:`你逐条阅读了雾潮协议。knowledge经验+10。`},{id:`o_2`,text:`关掉公告`,effects:[],next:`__return__`,result:`你看了一眼就关掉了。`}]},{id:`evt_v120_patch`,weight:0,minDay:1,maxTriggers:1,text:`【世界公告】迷雾纪元 v2.0 补丁已部署——

■ 「灵潮复苏」：结晶能量开始渗透迷雾，技能经验获取效率+50%（持续至第15天）
■ 新配方解锁：晶石提灯（结晶×1 + 木×1 → 晶石提灯）
■ 区域频道扩容：支持跨区通讯

⚠ 大型雾潮将在今夜来袭。`,choices:[{id:`o_0`,text:`研究灵潮现象`,effects:[],next:`__return__`,result:`灵潮的能量波纹在你指尖跃动。knowledge+20 survival+10。`},{id:`o_1`,text:`赶制晶石提灯`,effects:[],next:`__return__`,result:`你立即动手制作提灯。craft+15。`}]},{id:`evt_rank_d8_high`,weight:0,minDay:1,maxTriggers:1,text:`【排行榜速报】第2期——你排位 #3 / 179人（存活率下降中）

「铁蛋杂货铺」私聊你：大佬 你那庇护所怎么升的 教教呗？`,choices:[{id:`o_0`,text:`分享经验`,effects:[],next:`__return__`,result:`你热心回复了铁蛋。分享让人快乐。`},{id:`o_1`,text:`保持神秘`,effects:[],next:`__return__`,result:`你已读不回。排行榜上的人都很忙。`}]},{id:`evt_rank_d8_mid`,weight:0,minDay:1,maxTriggers:1,text:`【排行榜速报】第2期——你排位 #9 / 179人

距前十差1名。有人在频道说：「前十全是肝帝」。`,choices:[{id:`o_0`,text:`今晚加把劲`,effects:[],next:`__return__`,result:`你决定今晚多守一会儿。`},{id:`o_1`,text:`佛系随缘`,effects:[],next:`__return__`,result:`生死面前，排名算什么。`}]},{id:`evt_rank_d8_low`,weight:0,minDay:1,maxTriggers:1,text:`【排行榜速报】第2期——你排位 #34 / 179人

有人在频道说：「不上榜的反而活得好 别卷了」。`,choices:[{id:`o_0`,text:`有道理`,effects:[],next:`__return__`,result:`不上榜也有不上榜的活法。`},{id:`o_1`,text:`下周冲榜`,effects:[],next:`__return__`,result:`你暗自握拳。`}]},{id:`evt_rank_d12_high`,weight:0,minDay:1,maxTriggers:1,text:`【排行榜终报】最终排名 #3 / 162人（已25人离线）

系统提示：你的高排名解锁了特殊补给——急救包×2 + 信号弹×1。`,choices:[{id:`o_0`,text:`收下补给`,effects:[],next:`__return__`,result:`高级补给箱空投至你的庇护所。`}]},{id:`evt_rank_d12_mid`,weight:0,minDay:1,maxTriggers:1,text:`【排行榜终报】最终排名 #11 / 162人

中游成绩，补给普通：绷带×2 + 干粮×1。`,choices:[{id:`o_0`,text:`收下补给`,effects:[],next:`__return__`,result:`普通补给箱送到。`}]},{id:`evt_rank_d12_low`,weight:0,minDay:1,maxTriggers:1,text:`【排行榜终报】最终排名 #41 / 162人

末位补给：浆果×2。但你还活着，这就够了。`,choices:[{id:`o_0`,text:`活着就好`,effects:[],next:`__return__`,result:`你拿到了最基本的补给。`}]},{id:`first_beast_wave_warning`,weight:0,minDay:7,maxTriggers:1,text:`【世界预警·迷雾加深】

后半夜，木屋外的雾墙亮起一阵不祥的微光。远处传来第一声真正的兽吼——不再是狼，是某种更重、更大的东西。

雾在进化。兽群也在进化。留给你的时间不多了。`,choices:[{id:`o_0`,text:`连夜加固木屋外围（消耗木材×20）`,effects:[{kind:`item`,item:`wood`,amount:-20},{kind:`resource`,resource:`sanity`,delta:-2}],next:`__return__`,result:`你连夜把木刺削尖钉进门框。天亮时，泥地上多了几串陌生的爪印。`},{id:`o_1`,text:`磨一根像样的木矛`,hint:`获得木矛`,effects:[{kind:`item`,item:`wooden_spear`,amount:1},{kind:`resource`,resource:`energy`,delta:-10}],next:`__return__`,result:`你花了一整夜打磨矛尖。手在抖，但矛比手稳。`},{id:`o_2`,text:`留在暗处观察兽群动向`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`flag`,flag:`beast_wave_observed`,flagValue:!0}],next:`__return__`,result:`你记下了吼声的方位和间隔。恐惧还在，但你至少知道它们从哪来。`}]},{id:`beast_wave_preparation`,weight:0,minDay:15,maxTriggers:1,text:`【世界预警·兽潮前夕】

地平线传来持续的震动，雾海深处的嚎叫连成了一片。兽潮将在数日内抵达——这一次不是几只野兽，是一股潮水。`,choices:[{id:`o_0`,text:`储备木石，闭门死守（消耗木材×30、石头×10）`,effects:[{kind:`item`,item:`wood`,amount:-30},{kind:`item`,item:`stone`,amount:-10},{kind:`flag`,flag:`beast_wave_ready`,flagValue:!0}],next:`__return__`,result:`栅栏加高了两层，壕沟里插满削尖的木桩。它们想进来，就得先付出代价。`},{id:`o_1`,text:`主动出击，猎杀落单的先头兽`,hint:`有风险，缴获兽核`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`resource`,resource:`energy`,delta:-20},{kind:`item`,item:`beast_core`,amount:1}],next:`__return__`,result:`你拖着伤回到屋里，手里的兽核还带着体温。`},{id:`o_2`,text:`用电台联络附近的幸存者`,effects:[{kind:`resource`,resource:`sanity`,delta:4},{kind:`flag`,flag:`alliance_contact`,flagValue:!0}],next:`__return__`,result:`无线电里传来三声短促的回应。你不是一个人在守。`}]},{id:`power_awakening`,weight:0,minDay:30,maxTriggers:1,text:`【世界异变·力量觉醒】

今夜，雾海深处浮起万千光点，像倒悬的星河。你的指尖开始发光——有什么东西正顺着血液爬升，在心脏处轰然炸开。

雾海开始认可你了。选择你的道路。`,choices:[{id:`o_0`,text:`走科技之路：理解它，然后利用它`,effects:[{kind:`flag`,flag:`path_tech`,flagValue:!0},{kind:`resource`,resource:`sanity`,delta:2}],next:`__return__`,result:`你拆开收音机的最后一枚零件，公式在脑中清晰起来——力量不必来自雾，可以来自理解。`},{id:`o_1`,text:`走修行之路：顺应它，与雾共鸣`,effects:[{kind:`flag`,flag:`path_cultivation`,flagValue:!0},{kind:`resource`,resource:`energy`,delta:5}],next:`__return__`,result:`你盘膝坐下，跟随光点的节奏吐纳。一缕暖流沉入小腹——雾不是灾，是灵气。`},{id:`o_2`,text:`拒绝力量，保持凡人之躯`,effects:[{kind:`flag`,flag:`path_mortal`,flagValue:!0},{kind:`resource`,resource:`sanity`,delta:6}],next:`__return__`,result:`你握紧拳头，把光芒按回皮肤之下。有些东西一旦拿起，就再也放不下了。`}]},{id:`ancient_ruins_discovery`,weight:0,minDay:50,maxTriggers:1,text:`【世界发现·真相浮现】

浓雾散开了一角。雾墙之后矗立着一座不属于这个时代的黑色石碑，碑文在发光，像是在等待能够读懂它的人。

碑文的第一行只有一句话：观察者，你终于来了。`,choices:[{id:`o_0`,text:`抄录碑文，仔细研究`,effects:[{kind:`flag`,flag:`ruins_truth_1`,flagValue:!0},{kind:`resource`,resource:`sanity`,delta:-4}],next:`__return__`,result:`你抄下三十七个符号。夜里它们在梦中重排成句：这不是天灾，是一次筛选。`},{id:`o_1`,text:`带走碑文旁的神秘结晶`,hint:`获得神秘结晶`,effects:[{kind:`item`,item:`mysterious_crystal`,amount:1},{kind:`resource`,resource:`health`,delta:-10}],next:`__return__`,result:`结晶入手的瞬间，雾海发出一声悠长的叹息。有什么东西，注意到你了。`},{id:`o_2`,text:`摧毁石碑，假装什么都没看见`,effects:[{kind:`resource`,resource:`sanity`,delta:8},{kind:`flag`,flag:`ruins_destroyed`,flagValue:!0}],next:`__return__`,result:`石碑碎裂时发出无声的悲鸣。你转身回屋，把那一角重新用雾封死。`}]},{id:`final_countdown`,weight:0,minDay:80,maxTriggers:1,text:`【世界终局·终极考验】

雾海开始退潮。地平线上，一座由雾构成的巨影缓缓站起——迷雾之主苏醒了。

所有幸存者的无线电同时响起同一句话：倒数七日。`,choices:[{id:`o_0`,text:`燃烧储备，武装到牙齿（消耗食物30、金属×20）`,effects:[{kind:`resource`,resource:`food`,delta:-30},{kind:`item`,item:`metal`,amount:-20},{kind:`flag`,flag:`final_battle_ready`,flagValue:!0}],next:`__return__`,result:`你把最后的存粮烤成干粮，把废铁淬成刀锋。七天后，要么死，要么走出去。`},{id:`o_1`,text:`静坐调息，直面终局`,effects:[{kind:`resource`,resource:`sanity`,delta:10},{kind:`flag`,flag:`final_battle_ready`,flagValue:!0}],next:`__return__`,result:`你安静地擦净那把陪你走过八十天的木矛。来吧。`},{id:`o_2`,text:`深挖地窖，赌一把苟活`,effects:[{kind:`resource`,resource:`energy`,delta:-15},{kind:`flag`,flag:`final_hideout`,flagValue:!0}],next:`__return__`,result:`你把地窖挖深了三米，用木板封住头顶。雾声从缝隙里渗进来，像某种叹息。`}]},{id:`catastrophe_beast_wave_tier1`,weight:0,minDay:10,maxTriggers:1,text:`【天灾降临·初级兽潮】

黎明前，雾墙像被撕开了一样，数十头低阶野兽嚎叫着冲向你的木屋。它们眼里没有兽性，只有饥饿。`,choices:[{id:`o_0`,text:`依托工事死守`,effects:[{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`木栅栏被撞得吱呀作响，但它们没能进来。天亮时，院子里留下了七具尸体。`},{id:`o_1`,text:`爬上屋顶反击`,hint:`有受伤风险`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`item`,item:`mutant_fang`,amount:2}],next:`__return__`,result:`你用木矛从屋顶一次次捅下去，最后两匹野兽拖着伤逃进了雾里。`},{id:`o_2`,text:`弃屋躲入地窖`,effects:[{kind:`resource`,resource:`energy`,delta:-15},{kind:`resource`,resource:`food`,delta:-10}],next:`__return__`,result:`你在黑暗里听着头顶的撕咬声直到黄昏。木屋损失惨重，但人没事。`}]},{id:`catastrophe_extreme_cold`,weight:0,minDay:20,maxTriggers:1,text:`【天灾降临·极寒来袭】

气温在一夜之间跌到了零下四十度。雾冻结成了霜壳，敲在墙上像石头。火堆成了你唯一的心跳。`,choices:[{id:`o_0`,text:`烧掉备用木料取暖（消耗木材×25）`,effects:[{kind:`item`,item:`wood`,amount:-25}],next:`__return__`,result:`炉火烧了整整五天。木料没了，但骨头是暖的。`},{id:`o_1`,text:`裹紧所有衣物，减少外出`,effects:[{kind:`resource`,resource:`energy`,delta:-10},{kind:`resource`,resource:`sanity`,delta:-3}],next:`__return__`,result:`你把自己裹成一个茧，靠数屋顶的冰裂声打发时间。`},{id:`o_2`,text:`冒雪外出搜集燃料`,hint:`有冻伤风险`,effects:[{kind:`resource`,resource:`health`,delta:-15},{kind:`item`,item:`wood`,amount:15}],next:`__return__`,result:`你拖回一捆湿柴，指尖冻得发黑。这一趟，值，也不值。`}]},{id:`catastrophe_beast_wave_tier2`,weight:0,minDay:35,maxTriggers:1,text:`【天灾降临·中级兽潮】

这一次的兽群不一样：它们的甲壳泛着金属光泽，吼声里带着令理智震颤的音节。进化的怪物，学会了战术。`,choices:[{id:`o_0`,text:`消耗物资，全面死守（木材×40、石材×20）`,effects:[{kind:`item`,item:`wood`,amount:-40},{kind:`item`,item:`stone`,amount:-20},{kind:`resource`,resource:`sanity`,delta:-5}],next:`__return__`,result:`三道防线被撕碎了两道。黎明时分，兽潮退了，你的手还在抖。`},{id:`o_1`,text:`利用地形与兽群周旋`,effects:[{kind:`resource`,resource:`energy`,delta:-20},{kind:`item`,item:`beast_core`,amount:2}],next:`__return__`,result:`你把兽群引进了沼泽，收割了两个核心。雾海在为你让路。`},{id:`o_2`,text:`释放信号弹向盟友求援`,effects:[{kind:`resource`,resource:`sanity`,delta:3},{kind:`flag`,flag:`alliance_aid_received`,flagValue:!0}],next:`__return__`,result:`远处亮起了回应的火光。有人和你在同一场噩梦里并肩。`}]},{id:`catastrophe_fog_expansion`,weight:0,minDay:45,maxTriggers:1,text:`【天灾降临·迷雾扩张】

你开垦的每一寸土地都在被浓雾重新吞没。边界上的木桩一节节消失在灰白里，像被什么东西吃掉了。`,choices:[{id:`o_0`,text:`举火把重新驱散领地`,effects:[{kind:`resource`,resource:`energy`,delta:-25}],next:`__return__`,result:`你举着火把走了一整天，雾退回了界碑之外。`},{id:`o_1`,text:`放弃外围田地，收缩防线`,effects:[{kind:`resource`,resource:`sanity`,delta:-6},{kind:`resource`,resource:`food`,delta:-15}],next:`__return__`,result:`你看着半年的耕作沉入灰白。活着，比什么都重要。`},{id:`o_2`,text:`深入新雾区侦察`,hint:`危险，可能有发现`,effects:[{kind:`resource`,resource:`health`,delta:-10},{kind:`flag`,flag:`explored_new_fog`,flagValue:!0}],next:`__return__`,result:`新雾区的雾是活的——你亲眼看见雾墙在你身后合拢。你记下了里面的路标。`}]},{id:`catastrophe_beast_wave_tier3`,weight:0,minDay:60,maxTriggers:1,text:`【天灾降临·高级兽潮】

大地在颤抖。雾海尽头，一头山岳般的巨兽缓缓走来，它的每一次呼吸都让雾浪翻滚。兽王来了——这是生死存亡的一战。`,choices:[{id:`o_0`,text:`倾尽全力，与兽王决战`,hint:`九死一生`,effects:[{kind:`resource`,resource:`health`,delta:-30},{kind:`resource`,resource:`energy`,delta:-30},{kind:`flag`,flag:`beast_king_slain`,flagValue:!0}],next:`__return__`,result:`你亲手斩下了兽王的獠牙。那一夜，整个雾海安静得像在默哀。`},{id:`o_1`,text:`退入基地核心，凭工事死守（木材×50、石材×30）`,effects:[{kind:`item`,item:`wood`,amount:-50},{kind:`item`,item:`stone`,amount:-30},{kind:`resource`,resource:`sanity`,delta:-8}],next:`__return__`,result:`城墙在兽王的冲撞下呻吟了三天。第四天清晨，它转身离开了。`},{id:`o_2`,text:`携带轻装撤离，放弃基地`,effects:[{kind:`resource`,resource:`energy`,delta:-20},{kind:`resource`,resource:`sanity`,delta:-12},{kind:`flag`,flag:`abandoned_base`,flagValue:!0}],next:`__return__`,result:`你回头看了一眼燃烧的木屋，转身走进雾里。活着，就还有下一次。`}]}],income:[{resource:`warmth`,delta:-1}],startingResources:{food:{current:80,max:100},water:{current:80,max:100},health:{current:100,max:100},sanity:{current:100,max:100},energy:{current:100,max:100},warmth:{current:100,max:100}}};$.storyline.scenes={...$.storyline.scenes,...gl,...vl,...bl,...Sl,...wl,...El,...Ol,...Al,...Ml,...Pl},$.randomEvents||=[],$.randomEvents=[...$.randomEvents,..._l,...yl,...xl,...Cl,...Tl,...Dl,...kl,...jl,...Nl,...Fl],$.randomEvents=[...$.randomEvents,...Il];var Ll=[{id:`duoduo`,name:`朵朵`,title:`邻家的妹妹`,linePrefix:`duoduo_`,entryScene:`duoduo_s1_meet`,description:`在便利店废墟里遇到的女孩，把你的木屋当成了全世界的安全岛。`},{id:`laok`,name:`老K`,title:`沉默的巡逻者`,linePrefix:`laok_`,entryScene:`laok_s1_pact`,description:`前特种兵，话少枪稳。他守夜的时候，你能睡个整觉。`},{id:`doc`,name:`林医生`,title:`雾中的医者`,linePrefix:`doc_`,entryScene:`doc_s1_housecall`,description:`背着药箱挨家问诊的执拗人。在雾海里，一板抗生素比黄金贵。`},{id:`rat`,name:`鼠王`,title:`下水道的君主`,linePrefix:`rat_`,entryScene:`rat_s1_return`,description:`地下的情报贩子与规则制定者。他认识每一个人，包括不该认识的人。`},{id:`rescue`,name:`救援队`,title:`无线电那头的声音`,linePrefix:`rescue_`,entryScene:`rescue_s1_wreck`,description:`7 号避难所的幸存者们。信号接通的那一刻，雾海不再只有你一个人。`},{id:`crystal`,name:`结晶之声`,title:`矿脉的低语`,linePrefix:`crystal_`,entryScene:`crystal_s1_vein`,description:`紫色结晶里的存在。它自称朋友——雾里的东西都这么说。`}],Rl=[{min:80,name:`生死之交`},{min:55,name:`挚友`},{min:30,name:`信赖`},{min:10,name:`相识`},{min:0,name:`陌生`}];function zl(e){let t=new Set(e.visitedScenes??[]);return Ll.map(n=>{let r=0;for(let e of t)e.startsWith(n.linePrefix)&&(r+=12);let i=!!e.flags[`line_done_${n.entryScene}`];i&&(r+=10),r=Math.min(100,r);let a=Rl.find(e=>r>=e.min)?.name??`陌生`;return{...n,favor:r,levelName:a,lineDone:i}})}var Bl=`qs_saves_v1`,Vl=`qs_meta_v1`;function Hl(){return Array.from({length:3},()=>({state:null,info:null}))}function Ul(){try{let e=localStorage.getItem(Bl);if(!e)return Hl();let t=JSON.parse(e);return!Array.isArray(t)||t.length!==3?Hl():t.map(e=>{if(!e.json)return{state:null,info:e.info??null};try{return{state:pl(e.json),info:e.info??null}}catch{return{state:null,info:null}}})}catch{return Hl()}}function Wl(e){let t=e.map(e=>({json:e.state?fl(e.state):null,info:e.info}));localStorage.setItem(Bl,JSON.stringify(t))}function Gl(e,t){let n=Ul(),r=t.outcome?{type:t.outcome.type,title:t.outcome.title}:null;return n[e]={state:t,info:{day:t.day,updatedAt:new Date().toISOString(),outcome:r}},Wl(n),n}function Kl(e){let t=Ul();return t[e]={state:null,info:null},Wl(t),t}function ql(){try{let e=localStorage.getItem(Vl);if(!e)return{runs:0,unlockedEndings:[],bestDays:0};let t=JSON.parse(e);return{runs:t.runs??0,unlockedEndings:Array.isArray(t.unlockedEndings)?t.unlockedEndings:[],bestDays:t.bestDays??0}}catch{return{runs:0,unlockedEndings:[],bestDays:0}}}function Jl(e){localStorage.setItem(Vl,JSON.stringify(e))}var Yl=null;function Xl(){return Yl||=Zl(),Yl}function Zl(){let e=Lt({screen:`menu`,state:null,slots:Ul(),activeSlot:0,log:[],toast:``}),t=new qs,n=q(()=>{if(!e.state)return{text:``,choices:[],inEvent:!1,eventText:``};let t=e.state;if(t.pendingEvents.length>0){let e=Nc($,t.pendingEvents[0]);if(e)return{text:e.text,choices:Fc(e.choices,t),inEvent:!0,eventText:e.text}}let n=jc($,t.currentScene);return{text:n?.text??`（场景缺失：`+t.currentScene+`）`,choices:n?Fc(n.choices,t):[],inEvent:!1,eventText:``}});function r(t,n){if(n===`scene`){for(let n=e.log.length-1;n>=0;n--)if(e.log[n].kind===`scene`){if(e.log[n].text===t)return;break}}e.log.push({text:t,kind:n})}function i(){e.state&&(e.slots=Gl(e.activeSlot,e.state))}function a(t){e.toast=t,setTimeout(()=>{e.toast=``},2600)}function o(){if(!e.state)return;let t=ql();t.runs+=1;let n=e.state.outcome;n&&n.type===`ending`&&(t.unlockedEndings=Array.from(new Set([...t.unlockedEndings,n.id]))),t.bestDays=Math.max(t.bestDays,e.state.day),Jl(t),i()}function s(n,o){let s=Ac($,ql(),o);e.state=s,e.activeSlot=n,e.log=[],t=new qs;let c=jc($,s.currentScene);c&&r(c.text,`scene`),o&&r(`【天赋觉醒】你携带着与生俱来的天赋踏入迷雾。`,`system`),i(),e.screen=`game`,a(`新的一局开始了，第 1 天`)}function c(n){let i=e.slots[n];if(!i.state)return;e.state=i.state,e.activeSlot=n,e.log=[],t=new qs,e.screen=`game`;let o=jc($,i.state.currentScene);o&&r(o.text,`scene`),a(`已读取存档`)}function l(n){if(!e.state)return;let a=e.state,s=a.pendingEvents.length>0?Hc($,a,n,t):Vc($,a,n,t);s.resultText&&r(s.resultText,`result`);for(let e of s.systemMessages??[])r(e,`system`);if(a.outcome)o(),r(`【${a.outcome.title}】${a.outcome.desc}`,`system`);else if(a.pendingEvents.length===0){let t=jc($,a.currentScene);t&&t.text!==e.log[e.log.length-1]?.text&&r(t.text,`scene`)}i()}function u(){if(!e.state)return;let n=e.state;if(n.pendingEvents.length>0){a(`先处理完眼前的事件`);return}let s=Yc($,n,t);for(let e of s.messages)r(e,`daily`);if(s.dead){o(),r(`【${n.outcome?.title??`死亡`}】${n.outcome?.desc??``}`,`system`),i();return}if(r(`—— 第 ${n.day} 天 ——`,`daily`),s.event)r(s.event.text,`scene`);else{let e=jc($,n.currentScene);e&&r(e.text,`scene`)}i()}function d(){e.screen=`menu`,e.slots=Ul(),e.state=null}function f(){return e.state?ml(e.state):``}function p(t,n){let r=hl(t);return r?(e.slots=Gl(n,r),a(`导入成功`),!0):!1}function m(t){e.slots=Kl(t)}function h(){if(!e.state)return;let t=fs(e.state);t.success?(a(t.message),r(t.message,`system`),i()):a(t.message)}function g(t){if(!e.state)return;let n={x:e.state.base.structures.length,y:0},o=ps(e.state,t,n);if(a(o.message),r(o.message,`system`),o.success){let e=us[t];e&&r(`【基地】${e.name}落成。${e.description}。`,`system`),i()}}function _(t){if(!e.state)return;let n=zl(e.state).find(e=>e.id===t);if(!n)return;let o=xs(e.state,t,n.favor);o?(a(`${n.name}加入了你的木屋`),r(o,`system`),i()):a(n.favor<30?`羁绊还不够深（需要信赖 30）`:`已在队伍中`)}function v(t){if(!e.state)return;let n=Qo(e.state,t);n.success?(a(n.message),r(n.message,`system`),i()):a(n.message)}function y(t){if(!e.state)return;let n=Zo(e.state,t);n.success?(a(n.message),r(n.message,`system`),i()):a(n.message)}function b(t,n){if(!e.state)return;let o=os(e.state,n,t,1);a(o.message),o.success&&(r(o.message,`result`),i())}function x(t){if(!e.state)return;let n=ss(e.state,`wandering_trader`,t,1);a(n.message),n.success&&(r(n.message,`result`),i())}function S(t){e.state&&(e.state.flags[`story_${t}_started`]=!0,a(`开始探索${t}剧情线`),r(`你决定探索${t}的剧情线...`,`system`),i())}function C(n){if(!e.state||!e.state.combat)return;let o=ic(e.state,e.state.combat,n,t);e.state.combat=o.session;for(let e of o.session.log.slice(-3))r(e,`result`);if(o.ended&&o.result){if(o.result.victory){a(`战斗胜利！`),r(`击败了敌人！获得战利品。`,`system`);let t=e.state.combat?e.state.combat.enemyLevel??1:1,n=wc(t,!0),i=Ec(t,e.state.attributes.luck),s=Xc(e.state,n);if(Zc(e.state,i),e.state.combatKills+=1,e.state.runStats.kills+=1,o.result.loot){for(let[t,n]of Object.entries(o.result.loot))e.state.inventory[t]=(e.state.inventory[t]??0)+n;let t=Object.entries(o.result.loot).map(([e,t])=>`${e}×${t}`).join(`, `);t&&r(`掉落：${t}`,`result`)}r(`获得经验 +${n}，迷雾积分 +${i}`,`system`),s.leveledUp&&(r(`【升级】等级提升到 ${s.newLevel}！获得1属性点+1技能点，生命上限+10`,`system`),a(`升级！Lv.${s.newLevel}`));let c=Qc(e.state);for(let e of c)r(`【称号解锁】${e}`,`system`)}else a(`战斗失败！`),r(`你在战斗中落败...`,`system`),Xc(e.state,wc(1,!1));delete e.state.combat}i()}return Lt({...$t(e),viewText:q(()=>n.value.text),viewChoices:q(()=>n.value.choices),inEvent:q(()=>n.value.inEvent),eventText:q(()=>n.value.eventText),newGame:s,continueGame:c,choose:l,endDay:u,backToMenu:d,exportSave:f,importSave:p,deleteSlot:m,upgradeBase:h,build:g,recruit:_,upgradeSkill:v,chooseSpecialization:y,buyFromMarket:b,sellToMarket:x,startStory:S,combatAction:C})}var Ql={class:`menu`},$l={class:`slots`},eu={class:`slot-head`},tu={class:`slot-name`},nu={key:0,class:`slot-day`},ru={key:0,class:`slot-meta`},iu={key:0},au={key:1},ou={key:1,class:`slot-meta empty`},su={class:`slot-actions`},cu=[`onClick`],lu=[`onClick`],uu=[`onClick`],du=[`onClick`],fu=[`onClick`],pu={class:`dex`},mu={class:`dex-title`},hu={class:`dex-grid`},gu={class:`talent-modal`},_u={class:`talent-cards`},vu=[`onClick`],yu={class:`talent-tier`},bu={class:`talent-name`},xu={class:`talent-desc`},Su=or({__name:`MainMenu`,setup(e){let t=Xl(),n=Object.values($.storyline.endings),r=ql().unlockedEndings,i=n.map(e=>({id:e.id,title:r.includes(e.id)?e.title:`？？？`,unlocked:r.includes(e.id),category:e.category})),a=Jt(null),o=Jt([]),s={S:`SSS·传说`,A:`SR·稀有`,B:`R·普通`};function c(e){o.value=Ys({next:Math.random}),a.value=e}function l(e){a.value!==null&&(t.newGame(a.value,e.id),a.value=null)}function u(e){if(!e)return``;let t=new Date(e);return`${t.getMonth()+1}/${t.getDate()} ${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}function d(e){return`存档 ${e+1}`}async function f(e){let n=document.createElement(`input`);n.type=`file`,n.accept=`.qssave,.txt,application/json,text/plain`,n.onchange=async()=>{let r=n.files?.[0];if(!r)return;let i=await r.text();t.importSave(i.trim(),e)},n.click()}function p(){let e=t.exportSave();if(!e)return;let n=new Blob([e],{type:`text/plain;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`迷雾降临_存档${t.activeSlot+1}.qssave`,i.click(),URL.revokeObjectURL(r)}return(e,m)=>(V(),H(`div`,Ql,[m[5]||=U(`div`,{class:`menu-title`},[U(`h1`,null,`雾海生存`),U(`p`,{class:`sub`},`迷雾降临`),U(`p`,{class:`desc`},`雾起之后，你成了这座小镇最后的活人。活下去，撑到救援来临。`)],-1),U(`div`,$l,[(V(!0),H(z,null,I(P(3),e=>(V(),H(`div`,{key:e,class:D([`slot`,{filled:P(t).slots[e-1].state}])},[U(`div`,eu,[U(`span`,tu,O(d(e-1)),1),P(t).slots[e-1].state?(V(),H(`span`,nu,`第 `+O(P(t).slots[e-1].info?.day??`?`)+` 天`,1)):G(``,!0)]),P(t).slots[e-1].state?(V(),H(`p`,ru,[P(t).slots[e-1].info?.outcome?(V(),H(`span`,iu,O(P(t).slots[e-1].info.outcome.title)+`（已结束）`,1)):(V(),H(`span`,au,`进行中`)),m[2]||=U(`span`,{class:`dot`},`·`,-1),U(`span`,null,O(u(P(t).slots[e-1].info?.updatedAt)),1)])):(V(),H(`p`,ou,`空存档`)),U(`div`,su,[P(t).slots[e-1].state&&!P(t).slots[e-1].info?.outcome?(V(),H(`button`,{key:0,class:`btn primary`,onClick:n=>P(t).continueGame(e-1)},`继续`,8,cu)):P(t).slots[e-1].state?(V(),H(`button`,{key:1,class:`btn primary`,onClick:t=>c(e-1)},`重开`,8,lu)):(V(),H(`button`,{key:2,class:`btn primary`,onClick:t=>c(e-1)},`新游戏`,8,uu)),P(t).slots[e-1].state?(V(),H(`button`,{key:3,class:`btn ghost`,onClick:p},`导出`)):G(``,!0),P(t).slots[e-1].state?(V(),H(`button`,{key:4,class:`btn danger`,onClick:n=>P(t).deleteSlot(e-1)},`清空`,8,du)):G(``,!0),U(`button`,{class:`btn ghost`,onClick:t=>f(e-1)},`导入`,8,fu)])],2))),128))]),m[6]||=U(`p`,{class:`hint`},`存档保存在本机浏览器。导出后可分享给他人继续游玩。`,-1),U(`div`,pu,[U(`h3`,mu,`结局图鉴（`+O(P(r).length)+` / `+O(P(n).length)+`）`,1),U(`div`,hu,[(V(!0),H(z,null,I(P(i),e=>(V(),H(`span`,{key:e.id,class:D([`dex-chip`,{unlocked:e.unlocked,good:e.unlocked&&e.category===`good`,true:e.unlocked&&e.category===`true`}])},O(e.title),3))),128))])]),a.value===null?G(``,!0):(V(),H(`div`,{key:0,class:`talent-mask`,onClick:m[1]||=Lo(e=>a.value=null,[`self`])},[U(`div`,gu,[m[3]||=U(`h2`,{class:`talent-title`},`天赋觉醒`,-1),m[4]||=U(`p`,{class:`talent-sub`},`雾海听见了你的名字。三选一，选定后不可更改。`,-1),U(`div`,_u,[(V(!0),H(z,null,I(o.value,e=>(V(),H(`button`,{key:e.id,class:D([`talent-card`,`tier-`+e.tier]),onClick:t=>l(e)},[U(`span`,yu,O(s[e.tier]),1),U(`span`,bu,O(e.name),1),U(`span`,xu,O(e.description),1)],10,vu))),128))]),U(`button`,{class:`btn ghost reroll`,onClick:m[0]||=e=>c(a.value)},`换一批`)])]))]))}}),Cu=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},wu=Cu(Su,[[`__scopeId`,`data-v-17539d2f`]]),Tu={class:`resbar`},Eu={class:`resbar-head`},Du={class:`day`},Ou={class:`best`},ku={key:0,class:`progression-info`},Au={class:`info-row`},ju={class:`value tier`},Mu={class:`info-row`},Nu={class:`value points`},Pu={class:`info-row`},Fu={class:`value`},Iu={class:`info-row`},Lu={class:`value points`},Ru={key:0,class:`info-row`},zu={class:`value spec`},Bu={class:`res-label`},Vu={class:`val`},Hu={class:`track`},Uu={key:1,class:`attributes-panel`},Wu={class:`attr-grid`},Gu={class:`attr-item`},Ku={class:`attr-value`},qu={class:`attr-item`},Ju={class:`attr-value`},Yu={class:`attr-item`},Xu={class:`attr-value`},Zu={class:`attr-item`},Qu={class:`attr-value`},$u=Cu(or({__name:`ResourceBar`,setup(e){let t=Xl(),n=[`food`,`water`,`energy`,`sanity`,`health`],r=q(()=>{let e=t.state;return e?n.map(t=>({key:t,label:Rs[t],current:e.resources[t].current,max:e.resources[t].max,pct:Math.round(e.resources[t].current/e.resources[t].max*100)})):[]}),i=q(()=>{let e=t.state;return!e||!e.attributes?null:e.attributes}),a=q(()=>{let e=t.state;return!e||!e.progression?null:{worldTier:e.progression.currentWorldTier,nextTierDay:e.day+e.progression.daysToNextTier,skillPoints:e.skills?.totalPoints||0,baseLevel:e.base?.level||0,specialization:e.skills?.specialization||null,rank:Qs(e),rankTotal:162}});function o(e){return e<=20?`critical`:e<=50?`low`:`ok`}function s(e){return[`普通`,`困难`,`噩梦`,`地狱`,`深渊`][e-1]||`T${e}`}function c(e){return[`简陋小屋`,`木屋`,`石屋`,`堡垒`,`山谷基地`][e-1]||`Lv.${e}`}return(e,n)=>(V(),H(`div`,Tu,[U(`div`,Eu,[U(`span`,Du,`第 `+O(P(t).state?.day??1)+` 天`,1),U(`span`,{class:D([`ap`,{out:(P(t).state?.ap??3)<=0}])},`行动点 `+O(P(t).state?.ap??3)+`/3`,3),U(`span`,Ou,`历史最佳 `+O(P(t).state?.meta.bestDays??0)+` 天`,1)]),a.value?(V(),H(`div`,ku,[U(`div`,Au,[n[0]||=U(`span`,{class:`label`},`世界等级:`,-1),U(`span`,ju,O(s(a.value.worldTier)),1)]),U(`div`,Mu,[n[1]||=U(`span`,{class:`label`},`幸存者排名:`,-1),U(`span`,Nu,`#`+O(a.value.rank)+` / `+O(a.value.rankTotal),1)]),U(`div`,Pu,[n[2]||=U(`span`,{class:`label`},`基地等级:`,-1),U(`span`,Fu,O(c(a.value.baseLevel)),1)]),U(`div`,Iu,[n[3]||=U(`span`,{class:`label`},`技能点:`,-1),U(`span`,Lu,O(a.value.skillPoints),1)]),a.value.specialization?(V(),H(`div`,Ru,[n[4]||=U(`span`,{class:`label`},`专精:`,-1),U(`span`,zu,O(a.value.specialization===`technology`?`科技`:a.value.specialization===`cultivation`?`修炼`:`通用`),1)])):G(``,!0)])):G(``,!0),(V(!0),H(z,null,I(r.value,e=>(V(),H(`div`,{key:e.key,class:`res`},[U(`div`,Bu,[U(`span`,null,O(e.label),1),U(`span`,Vu,O(e.current)+`/`+O(e.max),1)]),U(`div`,Hu,[U(`div`,{class:D([`fill`,o(e.pct)]),style:pe({width:e.pct+`%`})},null,6)])]))),128)),i.value?(V(),H(`div`,Uu,[n[9]||=U(`h4`,{class:`attr-title`},`属性`,-1),U(`div`,Wu,[U(`div`,Gu,[n[5]||=U(`span`,{class:`attr-label`},`力量`,-1),U(`span`,Ku,O(i.value.strength),1)]),U(`div`,qu,[n[6]||=U(`span`,{class:`attr-label`},`敏捷`,-1),U(`span`,Ju,O(i.value.agility),1)]),U(`div`,Yu,[n[7]||=U(`span`,{class:`attr-label`},`智力`,-1),U(`span`,Xu,O(i.value.intelligence),1)]),U(`div`,Zu,[n[8]||=U(`span`,{class:`attr-label`},`幸运`,-1),U(`span`,Qu,O(i.value.luck),1)])])])):G(``,!0)]))}}),[[`__scopeId`,`data-v-a74c533a`]]),ed={class:`scene`},td={key:0,class:`actions`},nd=[`disabled`,`onClick`],rd={class:`ct`},id={key:0,class:`ap-chip`},ad={key:0,class:`ch`},od={key:1,class:`no-ap`},sd={key:0,class:`none`},cd={key:1,class:`end-panel`},ld={class:`end-desc`},ud={class:`end-stats`},dd={class:`end-actions`},fd=Cu(or({__name:`SceneView`,setup(e){let t=Xl(),n=Jt(null),r=q(()=>!!t.state?.outcome);zn(()=>t.log.length,async()=>{await xn(),n.value?.scrollTo({top:n.value.scrollHeight,behavior:`smooth`})});function i(e){return!!e.apCost&&(t.state?.ap??3)<=0}function a(e){i(e)||t.choose(e)}return(e,o)=>(V(),H(`div`,ed,[U(`div`,{ref_key:`logBox`,ref:n,class:`log`},[(V(!0),H(z,null,I(P(t).log,(e,t)=>(V(),H(`p`,{key:t,class:D([`line`,`k-`+e.kind])},O(e.text),3))),128))],512),r.value?(V(),H(`div`,cd,[U(`h2`,null,O(P(t).state?.outcome?.title),1),U(`p`,ld,O(P(t).state?.outcome?.desc),1),U(`div`,ud,[U(`span`,null,`存活 `+O(P(t).state?.day)+` 天`,1),U(`span`,null,`触发事件 `+O(P(t).state?.runStats.eventsTriggered)+` 次`,1),U(`span`,null,`已解锁结局 `+O(P(t).state?.meta.unlockedEndings.length)+` 个`,1)]),U(`div`,dd,[U(`button`,{class:`btn primary`,onClick:o[0]||=e=>P(t).newGame(P(t).activeSlot)},`再来一局`),U(`button`,{class:`btn ghost`,onClick:o[1]||=(...e)=>P(t).backToMenu&&P(t).backToMenu(...e)},`返回主菜单`)])])):(V(),H(`div`,td,[(V(!0),H(z,null,I(P(t).viewChoices,(e,t)=>(V(),H(`button`,{key:t,class:D([`choice`,{blocked:i(e)}]),disabled:i(e),onClick:t=>a(e)},[U(`span`,rd,[ia(O(e.text),1),e.apCost?(V(),H(`span`,id,`AP -`+O(e.apCost),1)):G(``,!0)]),e.hint?(V(),H(`span`,ad,O(e.hint),1)):G(``,!0),i(e)?(V(),H(`span`,od,`行动点已用完，结束今天吧`)):G(``,!0)],10,nd))),128)),P(t).viewChoices.length===0?(V(),H(`p`,sd,`眼前没有可做的事，等待明天的到来。`)):G(``,!0)]))]))}}),[[`__scopeId`,`data-v-af1afc26`]]),pd={key:0,class:`base-panel`},md={class:`base-header`},hd={class:`base-level`},gd={class:`value`},_d={class:`base-defense`},vd={class:`value`},yd={key:0,class:`buildings`},bd={key:0,class:`building-category`},xd={class:`building-list`},Sd={class:`building-name`},Cd={class:`building-count`},wd={key:1,class:`building-category`},Td={class:`building-list`},Ed={class:`building-name`},Dd={class:`building-count`},Od={key:2,class:`building-category`},kd={class:`building-list`},Ad={class:`building-name`},jd={class:`building-count`},Md={key:1,class:`production-info`},Nd={class:`production-grid`},Pd={class:`resource-label`},Fd={class:`resource-amount`},Id={key:2,class:`cap-row`},Ld={key:3,class:`build-section`},Rd={class:`build-list`},zd={class:`build-head`},Bd={class:`build-name`},Vd={class:`build-cost`},Hd={class:`build-desc`},Ud={class:`build-foot`},Wd={key:0,class:`build-req`},Gd={key:1,class:`build-req`},Kd={key:2,class:`build-req`},qd=[`onClick`],Jd={class:`base-actions`},Yd=Cu(or({__name:`BasePanel`,setup(e){let t=Xl(),n=q(()=>t.state?.base??null),r=q(()=>{let e=n.value;if(!e)return null;let t=[],r=[],i=[],a=new Map;for(let t of e.structures??[])a.set(t.structureId,(a.get(t.structureId)??0)+1);for(let[e,n]of a){let a={id:e,label:us[e]?.name??e,count:n};us[e]?.effects?.some(e=>e.type===`production`)?t.push(a):[`wooden_spike`,`fence`,`ballista_tower`,`wall`,`watchtower`].includes(e)?r.push(a):i.push(a)}let o={};for(let t of e.structures??[])for(let e of us[t.structureId]?.effects??[])e.type===`production`&&e.target&&(o[e.target]=(o[e.target]??0)+e.value);return{production:t,defense:r,utility:i,daily:o}}),i=q(()=>{let e=n.value,r=t.state;if(!e||!r)return[];let i=ls[e.level]?.maxStructures??0;return Object.values(us).map(t=>{let n=e.level>=t.minBaseLevel,a=e.structures.length+t.space<=i,o=Object.entries(t.cost).filter(([e,t])=>(r.inventory?.[e]??0)<t).length===0;return{id:t.id,name:t.name,desc:t.description,costText:Object.entries(t.cost).map(([e,t])=>`${Y[e]?.name??e}×${t}`).join(`、`),levelOk:n,spaceOk:a,affordable:o,buildable:n&&a&&o,minBaseLevel:t.minBaseLevel}})}),a=q(()=>{let e=n.value;if(!e)return null;let t=ls[e.level]?.maxStructures??0;return{used:e.structures.length,cap:t,defense:e.totalDefense}});function o(e){return[`简陋小屋`,`木屋`,`石屋`,`堡垒`,`山谷基地`][e-1]||`Lv.${e}`}function s(){return n.value?[`简陋小屋`,`木屋`,`石屋`,`堡垒`,`山谷基地`][n.value.level+1-1]||`已满级`:``}return(e,c)=>n.value?(V(),H(`div`,pd,[c[8]||=U(`h3`,{class:`panel-title`},`基地建设`,-1),U(`div`,md,[U(`div`,hd,[c[1]||=U(`span`,{class:`label`},`当前等级:`,-1),U(`span`,gd,O(o(n.value.level)),1)]),U(`div`,_d,[c[2]||=U(`span`,{class:`label`},`防御值:`,-1),U(`span`,vd,O(n.value.totalDefense),1)])]),r.value?(V(),H(`div`,yd,[r.value.production.length>0?(V(),H(`div`,bd,[c[3]||=U(`h4`,{class:`category-title`},`生产设施`,-1),U(`div`,xd,[(V(!0),H(z,null,I(r.value.production,e=>(V(),H(`div`,{key:e.id,class:`building-item`},[U(`span`,Sd,O(e.label),1),U(`span`,Cd,`×`+O(e.count),1)]))),128))])])):G(``,!0),r.value.defense.length>0?(V(),H(`div`,wd,[c[4]||=U(`h4`,{class:`category-title`},`防御设施`,-1),U(`div`,Td,[(V(!0),H(z,null,I(r.value.defense,e=>(V(),H(`div`,{key:e.id,class:`building-item`},[U(`span`,Ed,O(e.label),1),U(`span`,Dd,`×`+O(e.count),1)]))),128))])])):G(``,!0),r.value.utility.length>0?(V(),H(`div`,Od,[c[5]||=U(`h4`,{class:`category-title`},`功能设施`,-1),U(`div`,kd,[(V(!0),H(z,null,I(r.value.utility,e=>(V(),H(`div`,{key:e.id,class:`building-item`},[U(`span`,Ad,O(e.label),1),U(`span`,jd,`×`+O(e.count),1)]))),128))])])):G(``,!0)])):G(``,!0),r.value&&Object.keys(r.value.daily).length>0?(V(),H(`div`,Md,[c[6]||=U(`h4`,{class:`section-title`},`每日产出`,-1),U(`div`,Nd,[(V(!0),H(z,null,I(r.value.daily,(e,t)=>(V(),H(`div`,{key:t,class:`production-item`},[U(`span`,Pd,O(t),1),U(`span`,Fd,`+`+O(e),1)]))),128))])])):G(``,!0),a.value?(V(),H(`div`,Id,[U(`span`,null,`设施 `+O(a.value.used)+`/`+O(a.value.cap),1),U(`span`,null,`防御工事 `+O(a.value.defense),1)])):G(``,!0),i.value.length>0?(V(),H(`div`,Ld,[c[7]||=U(`h4`,{class:`section-title`},`建造清单`,-1),U(`div`,Rd,[(V(!0),H(z,null,I(i.value,e=>(V(),H(`div`,{key:e.id,class:D([`build-card`,{ok:e.buildable}])},[U(`div`,zd,[U(`span`,Bd,O(e.name),1),U(`span`,Vd,O(e.costText||`免费`),1)]),U(`p`,Hd,O(e.desc),1),U(`div`,Ud,[e.levelOk?e.spaceOk?e.affordable?(V(),H(`button`,{key:3,class:`build-btn`,onClick:n=>P(t).build?.(e.id)},`建造`,8,qd)):(V(),H(`span`,Kd,`材料不足`)):(V(),H(`span`,Gd,`设施空间不足`)):(V(),H(`span`,Wd,`需要基地 `+O(e.minBaseLevel)+` 级`,1))])],2))),128))])])):G(``,!0),U(`div`,Jd,[U(`button`,{class:`btn upgrade`,onClick:c[0]||=e=>P(t).upgradeBase?.()},` 升级基地 → `+O(s()),1)])])):G(``,!0)}}),[[`__scopeId`,`data-v-08e4a730`]]),Xd={key:0,class:`skill-panel`},Zd={class:`skill-header`},Qd={class:`points-info`},$d={class:`value`},ef={class:`available-points`},tf={class:`value highlight`},nf={key:0,class:`specialization-choice`},rf={class:`spec-options`},af=[`onClick`],of={key:1,class:`current-spec`},sf={class:`value`},cf={key:2,class:`skill-categories`},lf={key:0,class:`skill-category`},uf={class:`skill-list`},df={class:`skill-header-row`},ff={class:`skill-name`},pf={class:`skill-level`},mf={class:`skill-desc`},hf=[`onClick`],gf={key:1,class:`maxed`},_f={key:1,class:`skill-category`},vf={class:`skill-list`},yf={class:`skill-header-row`},bf={class:`skill-name`},xf={class:`skill-level`},Sf={class:`skill-desc`},Cf=[`onClick`],wf={key:1,class:`maxed`},Tf={key:2,class:`skill-category`},Ef={class:`skill-list`},Df={class:`skill-header-row`},Of={class:`skill-name`},kf={class:`skill-level`},Af={class:`skill-desc`},jf=[`onClick`],Mf={key:1,class:`maxed`},Nf=Cu(or({__name:`SkillTreePanel`,setup(e){let t=Xl(),n=q(()=>{let e=t.state;return!e||!e.skills?null:{totalPoints:e.skills.totalPoints,availablePoints:e.skills.points,skills:e.skills.skills,specialization:e.skills.specialization,canChooseSpecialization:e.skills.canChooseSpecialization}}),r={technology:`科技`,cultivation:`修炼`,general:`通用`},i=q(()=>{if(!n.value)return null;let e=[],t=[],r=[];for(let[i,a]of Object.entries(n.value.skills)){let n=a;n.branch===`technology`?e.push({id:i,...n}):n.branch===`cultivation`?t.push({id:i,...n}):r.push({id:i,...n})}return{tech:e,cultivation:t,general:r}});function a(e){if(!n.value)return 0;let t=n.value.skills[e];return t?t.level:0}function o(e){if(!n.value)return 3;let t=n.value.skills[e];return t?t.maxLevel:3}function s(e){if(!n.value)return``;let t=n.value.skills[e];return t?t.description:``}function c(e){return n.value?a(e)<o(e)&&n.value.availablePoints>0:!1}function l(e){t.upgradeSkill?.(e)}function u(e){t.chooseSpecialization?.(e)}return(e,t)=>n.value?(V(),H(`div`,Xd,[t[7]||=U(`h3`,{class:`panel-title`},`技能树`,-1),U(`div`,Zd,[U(`div`,Qd,[t[0]||=U(`span`,{class:`label`},`总技能点:`,-1),U(`span`,$d,O(n.value.totalPoints),1)]),U(`div`,ef,[t[1]||=U(`span`,{class:`label`},`可用点数:`,-1),U(`span`,tf,O(n.value.availablePoints),1)])]),n.value.canChooseSpecialization&&!n.value.specialization?(V(),H(`div`,nf,[t[2]||=U(`h4`,{class:`section-title`},`选择专精方向（不可更改）`,-1),U(`div`,rf,[(V(),H(z,null,I([`technology`,`cultivation`,`general`],e=>U(`button`,{key:e,class:`spec-btn`,onClick:t=>u(e)},O(r[e]),9,af)),64))])])):G(``,!0),n.value.specialization?(V(),H(`div`,of,[t[3]||=U(`span`,{class:`label`},`当前专精:`,-1),U(`span`,sf,O(r[n.value.specialization]),1)])):G(``,!0),i.value?(V(),H(`div`,cf,[i.value.tech.length>0?(V(),H(`div`,lf,[t[4]||=U(`h4`,{class:`category-title`},`🔬 科技系`,-1),U(`div`,uf,[(V(!0),H(z,null,I(i.value.tech,e=>(V(),H(`div`,{key:e.id,class:`skill-item`},[U(`div`,df,[U(`span`,ff,O(e.name),1),U(`span`,pf,`Lv.`+O(a(e.id))+`/`+O(o(e.id)),1)]),U(`p`,mf,O(s(e.id)),1),c(e.id)?(V(),H(`button`,{key:0,class:`upgrade-btn`,onClick:t=>l(e.id)},` 升级 (-1点) `,8,hf)):a(e.id)>=o(e.id)?(V(),H(`div`,gf,` 已达满级 `)):G(``,!0)]))),128))])])):G(``,!0),i.value.cultivation.length>0?(V(),H(`div`,_f,[t[5]||=U(`h4`,{class:`category-title`},`✨ 修炼系`,-1),U(`div`,vf,[(V(!0),H(z,null,I(i.value.cultivation,e=>(V(),H(`div`,{key:e.id,class:`skill-item`},[U(`div`,yf,[U(`span`,bf,O(e.name),1),U(`span`,xf,`Lv.`+O(a(e.id))+`/`+O(o(e.id)),1)]),U(`p`,Sf,O(s(e.id)),1),c(e.id)?(V(),H(`button`,{key:0,class:`upgrade-btn`,onClick:t=>l(e.id)},` 升级 (-1点) `,8,Cf)):a(e.id)>=o(e.id)?(V(),H(`div`,wf,` 已达满级 `)):G(``,!0)]))),128))])])):G(``,!0),i.value.general.length>0?(V(),H(`div`,Tf,[t[6]||=U(`h4`,{class:`category-title`},`⚔️ 通用系`,-1),U(`div`,Ef,[(V(!0),H(z,null,I(i.value.general,e=>(V(),H(`div`,{key:e.id,class:`skill-item`},[U(`div`,Df,[U(`span`,Of,O(e.name),1),U(`span`,kf,`Lv.`+O(a(e.id))+`/`+O(o(e.id)),1)]),U(`p`,Af,O(s(e.id)),1),c(e.id)?(V(),H(`button`,{key:0,class:`upgrade-btn`,onClick:t=>l(e.id)},` 升级 (-1点) `,8,jf)):a(e.id)>=o(e.id)?(V(),H(`div`,Mf,` 已达满级 `)):G(``,!0)]))),128))])])):G(``,!0)])):G(``,!0)])):G(``,!0)}}),[[`__scopeId`,`data-v-a87e25da`]]),Pf={key:0,class:`combat-screen`},Ff={class:`monster-panel`},If={class:`monster-header`},Lf={class:`monster-name`},Rf={class:`monster-level`},zf={class:`hp-bar-container`},Bf={class:`hp-label`},Vf={class:`hp-track`},Hf={key:0,class:`monster-desc`},Uf={class:`player-hp`},Wf={class:`hp-label`},Gf={class:`hp-track`},Kf={class:`combat-log`},qf={class:`log-content`},Jf={class:`turn-indicator`},Yf=Cu(or({__name:`CombatScreen`,setup(e){let t=Xl(),n=q(()=>{let e=t.state;return!e||!e.combat?null:{monster:nc[e.combat.enemyId]??null,playerHp:e.resources.health.current,playerMaxHp:e.resources.health.max,monsterHp:e.combat.enemyHp,monsterMaxHp:e.combat.enemyMaxHp,round:e.combat.round,log:e.combat.log||[]}});function r(e,t){return Math.round(e/t*100)}function i(e){return e<=25?`#c0504d`:e<=50?`#c98a3d`:`#4f9d6f`}function a(){t.combatAction?.(`attack`)}function o(){t.combatAction?.(`defend`)}function s(){t.combatAction?.(`use_item`)}function c(){t.combatAction?.(`flee`)}return(e,t)=>n.value?(V(),H(`div`,Pf,[t[3]||=U(`h3`,{class:`combat-title`},`战斗进行中`,-1),U(`div`,Ff,[U(`div`,If,[U(`span`,Lf,O(n.value.monster?.name||`未知怪物`),1),U(`span`,Rf,`Lv.`+O(n.value.monster?.level||1),1)]),U(`div`,zf,[U(`div`,Bf,[t[0]||=U(`span`,null,`生命值`,-1),U(`span`,null,O(n.value.monsterHp)+`/`+O(n.value.monsterMaxHp),1)]),U(`div`,Vf,[U(`div`,{class:`hp-fill enemy`,style:pe({width:r(n.value.monsterHp,n.value.monsterMaxHp)+`%`,background:i(r(n.value.monsterHp,n.value.monsterMaxHp))})},null,4)])]),n.value.monster?.description?(V(),H(`div`,Hf,O(n.value.monster.description),1)):G(``,!0)]),U(`div`,Uf,[U(`div`,Wf,[t[1]||=U(`span`,null,`你的生命`,-1),U(`span`,null,O(n.value.playerHp)+`/`+O(n.value.playerMaxHp),1)]),U(`div`,Gf,[U(`div`,{class:`hp-fill player`,style:pe({width:r(n.value.playerHp,n.value.playerMaxHp)+`%`,background:i(r(n.value.playerHp,n.value.playerMaxHp))})},null,4)])]),U(`div`,Kf,[t[2]||=U(`h4`,{class:`log-title`},`战斗记录`,-1),U(`div`,qf,[(V(!0),H(z,null,I(n.value.log.slice(-8),(e,t)=>(V(),H(`p`,{key:t,class:`log-entry`},O(e),1))),128))])]),U(`div`,{class:`combat-actions`},[U(`button`,{class:`action-btn attack`,onClick:a},` ⚔️ 攻击 `),U(`button`,{class:`action-btn defend`,onClick:o},` 🛡️ 防御 `),U(`button`,{class:`action-btn skill`,onClick:s},` ✨ 技能 `),U(`button`,{class:`action-btn flee`,onClick:c},` 🏃 逃跑 `)]),U(`div`,Jf,` 第 `+O(n.value.round)+` 回合 `,1)])):G(``,!0)}}),[[`__scopeId`,`data-v-59d667ec`]]),Xf={key:0,class:`market-panel`},Zf={class:`gold-info`},Qf={class:`value`},$f={key:0,class:`merchants-section`},ep={class:`merchant-list`},tp={class:`merchant-header`},np={class:`merchant-name`},rp={class:`merchant-type`},ip={key:0,class:`inventory`},ap={class:`item-grid`},op={class:`item-name`},sp={key:0,class:`item-qty`},cp={class:`item-price`},lp=[`onClick`,`disabled`],up={key:1,class:`prices-section`},dp={class:`price-list`},fp={class:`item-label`},pp={class:`sell-group`},mp={class:`price-value`},hp=[`onClick`],gp={key:2,class:`prices-section`},_p={class:`price-list`},vp={class:`item-label`},yp={class:`price-value`},bp={key:3,class:`empty-state`},xp=Cu(or({__name:`MarketPanel`,setup(e){let t=Xl();function n(e,t,n){let r=e.economy?.marketPrices?.[t];return Math.round((r?.currentPrice??Y[t]?.basePrice??0)*n)}let r=q(()=>{let e=t.state;if(!e||!e.economy)return null;let r=(e.economy.unlockedMerchants??[]).map(e=>ns[e]).filter(e=>!!e).map(t=>({id:t.id,name:t.name,location:t.location,items:Object.entries(t.inventory??{}).filter(([e])=>!!Y[e]).map(([r,i])=>({itemId:r,name:Y[r].name,price:n(e,r,t.sellMultiplier),qty:i}))})),i=Object.entries(e.inventory??{}).filter(([e,t])=>(t??0)>0&&!!Y[e]).map(([t,n])=>({itemId:t,name:Y[t].name,count:n,price:Math.round((e.economy?.marketPrices?.[t]?.currentPrice??Y[t]?.basePrice??0)*.6)}));return{currency:e.economy.currency,merchants:r,prices:e.economy.marketPrices??{},inventory:i}});function i(e,n){t.buyFromMarket?.(e,n)}function a(e){t.sellToMarket?.(e)}return(e,t)=>r.value?(V(),H(`div`,Xf,[t[5]||=U(`h3`,{class:`panel-title`},`交易市场`,-1),U(`div`,Zf,[t[0]||=U(`span`,{class:`label`},`持有积分:`,-1),U(`span`,Qf,O(r.value.currency),1)]),r.value.merchants.length>0?(V(),H(`div`,$f,[t[2]||=U(`h4`,{class:`section-title`},`商人`,-1),U(`div`,ep,[(V(!0),H(z,null,I(r.value.merchants,e=>(V(),H(`div`,{key:e.id,class:`merchant-card`},[U(`div`,tp,[U(`span`,np,O(e.name),1),U(`span`,rp,O(e.location),1)]),e.items.length>0?(V(),H(`div`,ip,[t[1]||=U(`h5`,{class:`inventory-title`},`出售物品`,-1),U(`div`,ap,[(V(!0),H(z,null,I(e.items,t=>(V(),H(`div`,{key:t.itemId,class:`item-card`},[U(`div`,op,[ia(O(t.name)+` `,1),t.qty>1?(V(),H(`span`,sp,`×`+O(t.qty),1)):G(``,!0)]),U(`div`,cp,`💰 `+O(t.price),1),U(`button`,{class:`buy-btn`,onClick:n=>i(t.itemId,e.id),disabled:r.value.currency<t.price},` 购买 `,8,lp)]))),128))])])):G(``,!0)]))),128))])])):G(``,!0),r.value.inventory.length>0?(V(),H(`div`,up,[t[3]||=U(`h4`,{class:`section-title`},`出售背包物品`,-1),U(`div`,dp,[(V(!0),H(z,null,I(r.value.inventory,e=>(V(),H(`div`,{key:e.itemId,class:`price-item`},[U(`span`,fp,O(e.name)+` ×`+O(e.count),1),U(`span`,pp,[U(`span`,mp,O(e.price)+` 积分`,1),U(`button`,{class:`buy-btn`,onClick:t=>a(e.itemId)},`出售`,8,hp)])]))),128))])])):G(``,!0),Object.keys(r.value.prices).length>0?(V(),H(`div`,gp,[t[4]||=U(`h4`,{class:`section-title`},`市场参考价`,-1),U(`div`,_p,[(V(!0),H(z,null,I(r.value.prices,(e,t)=>(V(),H(`div`,{key:t,class:`price-item`},[U(`span`,vp,O(P(Y)[t]?.name||t),1),U(`span`,yp,O(e.currentPrice)+` 积分`,1)]))),128))])])):G(``,!0),r.value.merchants.length===0?(V(),H(`div`,bp,` 当前没有商人，探索时可能会遇到行商。 `)):G(``,!0)])):G(``,!0)}}),[[`__scopeId`,`data-v-4c20c8ba`]]),Sp={key:0,class:`progression-indicator`},Cp={class:`tier-countdown`},wp={class:`countdown-header`},Tp={class:`label`},Ep={class:`days`},Dp={class:`countdown-bar`},Op={key:0,class:`catastrophe-warning`},kp={class:`warning-content`},Ap={class:`warning-desc`},jp={key:1,class:`depletion-warnings`},Mp={class:`depletion-list`},Np={class:`area-name`},Pp={class:`exploration-count`},Fp={key:2,class:`story-triggers`},Ip={class:`trigger-list`},Lp={class:`trigger-name`},Rp=[`onClick`],zp={class:`story-triggers`},Bp={class:`trigger-section-title`},Vp={class:`trigger-list`},Hp={class:`trigger-name`},Up={class:`ach-desc`},Wp=Cu(or({__name:`ProgressionIndicator`,setup(e){let t=Xl(),n={mysterious_signal:`神秘信号`,alliance_invitation:`联盟邀请`,crystal_discovery:`结晶发现`,survivor_encounter:`幸存者遭遇`,ancient_ruins_hint:`远古遗迹线索`},r=q(()=>{let e=t.state;if(!e||!e.progression)return null;let r=Cs.find(t=>t.triggerDay>(e.day??1))??null,i=e.progression.upcomingCatastrophes??[],a=i.length>0?i[i.length-1]:null;return{worldTier:e.progression.currentWorldTier,worldTierName:Cs[e.progression.currentWorldTier-1]?.name??``,nextTierDay:r?.triggerDay??null,nextTierName:r?.name??``,catastrophe:a,resourceDepletion:e.progression.resourceDepletion??{},storyTriggers:(e.progression.triggeredStories??[]).filter(t=>!e.flags[`story_${t}_started`]).map(e=>({id:e,name:n[e]??e}))}});function i(){let e=r.value;return!e||!e.nextTierDay?0:Math.max(0,e.nextTierDay-(t.state?.day||1))}function a(){let e=r.value;return!e||!e.catastrophe?0:Math.max(0,(e.catastrophe.triggerDay??0)-(t.state?.day||1))}function o(e){return e?{beast_wave:`兽潮来袭`,extreme_weather:`极寒降临`,fog_expansion:`迷雾扩张`,acid_rain:`酸雨降临`,earthquake:`大地震颤`,plague:`瘟疫蔓延`,meteor_shower:`流星雨`}[e]||e:``}let s=q(()=>{let e=t.state;if(!e)return[];let n=new Set(e.meta?.unlockedAchievements??[]);return lc.map(e=>({...e,unlocked:n.has(e.id)}))}),c=q(()=>s.value.filter(e=>e.unlocked).length);return(e,n)=>r.value?(V(),H(`div`,Sp,[n[4]||=U(`h3`,{class:`panel-title`},`世界状态`,-1),U(`div`,Cp,[U(`div`,wp,[U(`span`,Tp,`当前: `+O(r.value.worldTierName),1),U(`span`,Ep,O(i()>0?`距「${r.value.nextTierName}」还有 ${i()} 天`:`已至最终等级`),1)]),U(`div`,Dp,[U(`div`,{class:`countdown-fill`,style:pe({width:Math.min(100,(P(t).state?.day||1)/(r.value.nextTierDay||1)*100)+`%`})},null,4)])]),r.value.catastrophe?(V(),H(`div`,Op,[n[1]||=U(`div`,{class:`warning-icon`},`⚠️`,-1),U(`div`,kp,[n[0]||=U(`div`,{class:`warning-title`},`灾难预警`,-1),U(`div`,Ap,O(o(r.value.catastrophe.type))+` 将在 `+O(a())+` 天后降临 `,1)])])):G(``,!0),Object.keys(r.value.resourceDepletion).length>0?(V(),H(`div`,jp,[n[2]||=U(`h4`,{class:`warning-section-title`},`资源枯竭区域`,-1),U(`div`,Mp,[(V(!0),H(z,null,I(r.value.resourceDepletion,(e,t)=>(V(),H(`div`,{key:t,class:`depletion-item`},[U(`span`,Np,O(t),1),U(`span`,Pp,O(e?`已枯竭`:`开发中`),1)]))),128))])])):G(``,!0),r.value.storyTriggers.length>0?(V(),H(`div`,Fp,[n[3]||=U(`h4`,{class:`trigger-section-title`},`可探索剧情`,-1),U(`div`,Ip,[(V(!0),H(z,null,I(r.value.storyTriggers,e=>(V(),H(`div`,{key:e.id,class:`trigger-item`},[U(`span`,Lp,O(e.name),1),U(`button`,{class:`trigger-btn`,onClick:n=>P(t).startStory?.(e.id)},` 开始 `,8,Rp)]))),128))])])):G(``,!0),U(`div`,zp,[U(`h4`,Bp,`成就（`+O(c.value)+` / `+O(s.value.length)+`）`,1),U(`div`,Vp,[(V(!0),H(z,null,I(s.value,e=>(V(),H(`div`,{key:e.id,class:D([`trigger-item ach-item`,{locked:!e.unlocked}])},[U(`span`,Hp,O(e.unlocked?`🏆`:`🔒`)+` `+O(e.name),1),U(`span`,Up,O(e.desc),1)],2))),128))])])])):G(``,!0)}}),[[`__scopeId`,`data-v-95f400ae`]]),Gp={class:`inv-panel`},Kp={key:0,class:`empty`},qp={key:1,class:`item-list`},Jp={class:`item-head`},Yp={class:`item-name`},Xp={class:`item-count`},Zp={class:`lv-row`},Qp={class:`xp-track`},$p={class:`xp-text`},em={class:`item-desc`},tm=Cu(or({__name:`InventoryPanel`,setup(e){let t=Xl(),n=q(()=>{let e=t.state;return e?Object.entries(e.inventory??{}).filter(([,e])=>(e??0)>0).map(([t,n])=>{let r=e.itemLevels?.[t],i=r?.level??1,a=r?.uses??0;return{id:t,name:Y[t]?.name??t,desc:Y[t]?.description??``,count:n,level:i,uses:a,need:i*10,pct:Math.min(100,Math.round(a/(i*10)*100))}}).sort((e,t)=>t.count-e.count):[]});return(e,t)=>(V(),H(`div`,Gp,[t[0]||=U(`h3`,{class:`panel-title`},`背包`,-1),n.value.length===0?(V(),H(`div`,Kp,` 背包空空如也。外出搜寻，或去市场淘点物资吧。 `)):(V(),H(`div`,qp,[(V(!0),H(z,null,I(n.value,e=>(V(),H(`div`,{key:e.id,class:`item-card`},[U(`div`,Jp,[U(`span`,Yp,O(e.name),1),U(`span`,Xp,`×`+O(e.count),1)]),U(`div`,Zp,[U(`span`,{class:D([`lv-badge`,{maxed:e.level>=5}])},`Lv.`+O(e.level),3),U(`div`,Qp,[U(`div`,{class:`xp-fill`,style:pe({width:e.pct+`%`})},null,4)]),U(`span`,$p,O(e.uses)+`/`+O(e.need),1)]),U(`p`,em,O(e.desc),1)]))),128))])),t[1]||=U(`p`,{class:`tip`},`物品每次使用都会累积熟练度；满级后交易价值更高。`,-1)]))}}),[[`__scopeId`,`data-v-e90051e5`]]),nm={class:`npc-panel`},rm={class:`panel-note`},im={class:`npc-list`},am={class:`npc-head`},om={class:`npc-name`},sm={class:`npc-title`},cm={class:`favor-row`},lm={class:`favor-track`},um={class:`favor-num`},dm={class:`npc-desc`},fm={class:`npc-foot`},pm={key:0,class:`joined-badge`},mm=[`onClick`],hm={key:2,class:`hint-badge`},gm={key:3,class:`done-badge`},_m=Cu(or({__name:`NpcPanel`,setup(e){let t=Xl(),n=q(()=>{let e=t.state;return e?zl(e).map(t=>{let n=_s.find(e=>e.id===t.id);return{...t,recruited:vs(e,t.id),defense:n?.defense??0,rankBonus:n?.rankBonus??0}}):[]}),r=q(()=>{let e=t.state;return e?{count:zl(e).filter(t=>vs(e,t.id)).length,defense:ys(e),rank:bs(e)}:{count:0,defense:0,rank:0}});function i(e,t){return!t&&e>=30}function a(e){t.recruit?.(e)}return(e,t)=>(V(),H(`div`,nm,[t[0]||=U(`h3`,{class:`panel-title`},`同伴羁绊`,-1),U(`p`,rm,`在支线中与他们同行，羁绊会随共同经历加深。羁绊达到「信赖」即可邀请入队——同伴提供每日帮助，并在兽潮时协防（当前队伍：`+O(r.value.count)+` 人 · 协防 `+O(r.value.defense)+` · 声望 +`+O(r.value.rank)+`）。`,1),U(`div`,im,[(V(!0),H(z,null,I(n.value,e=>(V(),H(`div`,{key:e.id,class:D([`npc-card`,{done:e.lineDone}])},[U(`div`,am,[U(`span`,om,O(e.name),1),U(`span`,sm,O(e.title),1),U(`span`,{class:D([`npc-level`,{max:e.favor>=80}])},O(e.levelName),3)]),U(`div`,cm,[U(`div`,lm,[U(`div`,{class:`favor-fill`,style:pe({width:e.favor+`%`})},null,4)]),U(`span`,um,O(e.favor),1)]),U(`p`,dm,O(e.description),1),U(`div`,fm,[e.recruited?(V(),H(`span`,pm,`✓ 已入队（协防 `+O(e.defense)+` · 声望 +`+O(e.rankBonus)+`）`,1)):i(e.favor,e.recruited)?(V(),H(`button`,{key:1,class:`recruit-btn`,onClick:t=>a(e.id)},`邀请加入（协防 `+O(e.defense)+`）`,9,mm)):(V(),H(`span`,hm,`好感达 30 可邀请`)),e.lineDone?(V(),H(`span`,gm,`✓ 支线已完结`)):G(``,!0)])],2))),128))])]))}}),[[`__scopeId`,`data-v-206e6e7d`]]),vm={class:`layout`},ym={class:`panel left`},bm={class:`sys`},xm={class:`panel main`},Sm={class:`tab-nav`},Cm=[`onClick`],wm={class:`content-area`},Tm={key:6,class:`empty-view`},Em={class:`footer`},Dm=Cu(or({__name:`GameScreen`,setup(e){let t=Xl(),n=Jt(`story`),r=q(()=>t.state?.combat!==void 0);zn(r,e=>{e&&(n.value=`combat`)});function i(){let e=t.exportSave();if(!e)return;let n=new Blob([e],{type:`text/plain;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`迷雾降临_存档${t.activeSlot+1}.qssave`,i.click(),URL.revokeObjectURL(r)}let a={story:`📖 剧情`,base:`🏠 基地`,inventory:`🎒 背包`,npc:`👥 同伴`,skills:`⚡ 技能`,combat:`⚔️ 战斗`,market:`💰 市场`,progression:`🌍 推进`};return(e,o)=>(V(),H(`div`,vm,[U(`aside`,ym,[W($u),U(`div`,bm,[U(`button`,{class:`btn ghost`,onClick:i},`导出存档`),U(`button`,{class:`btn ghost`,onClick:o[0]||=(...e)=>P(t).backToMenu&&P(t).backToMenu(...e)},`主菜单`)])]),U(`main`,xm,[U(`div`,Sm,[(V(),H(z,null,I(a,(e,t)=>U(`button`,{key:t,class:D([`tab-btn`,{active:n.value===t}]),onClick:e=>n.value=t},O(e),11,Cm)),64))]),U(`div`,wm,[n.value===`story`?(V(),Xi(fd,{key:0})):n.value===`base`?(V(),Xi(Yd,{key:1})):n.value===`inventory`?(V(),Xi(tm,{key:2})):n.value===`npc`?(V(),Xi(_m,{key:3})):n.value===`skills`?(V(),Xi(Nf,{key:4})):n.value===`combat`&&r.value?(V(),Xi(Yf,{key:5})):n.value===`combat`&&!r.value?(V(),H(`div`,Tm,[...o[3]||=[U(`p`,null,`当前没有战斗，探索时可能会遭遇怪物。`,-1)]])):n.value===`market`?(V(),Xi(xp,{key:7})):n.value===`progression`?(V(),Xi(Wp,{key:8})):G(``,!0)]),U(`div`,Em,[P(t).state?.outcome?(V(),H(`button`,{key:1,class:`btn ghost wide`,onClick:o[2]||=(...e)=>P(t).backToMenu&&P(t).backToMenu(...e)},`返回主菜单`)):(V(),H(`button`,{key:0,class:`btn primary wide`,onClick:o[1]||=(...e)=>P(t).endDay&&P(t).endDay(...e)},` 结束今日，进入下一天 `))])]),o[4]||=U(`aside`,{class:`panel right`},[U(`h3`,{class:`aside-title`},`生存日志`),U(`p`,{class:`aside-note`},`跟随迷雾中的线索，撑过每一天。`)],-1)]))}}),[[`__scopeId`,`data-v-4c6abbb5`]]),Om={class:`app`},km={key:0,class:`toast`};Vo(or({__name:`App`,setup(e){let t=Xl();return(e,n)=>(V(),H(`div`,Om,[P(t).screen===`menu`?(V(),Xi(wu,{key:0})):(V(),Xi(Dm,{key:1})),W(Ua,{name:`toast`},{default:Nn(()=>[P(t).toast?(V(),H(`div`,km,O(P(t).toast),1)):G(``,!0)]),_:1})]))}})).mount(`#app`);