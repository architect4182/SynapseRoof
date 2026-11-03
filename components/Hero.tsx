'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Logo from './Logo';

interface HeroProps {
  onOpenQuote?: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<'morning' | 'night'>('night');

  // Interactive control refs
  const stateRef = useRef({
    night: 1,
    target: 1,
    from: 1,
    start: -1e9,
    queued: null as number | null,
    swapped: true,
    k: 1,
    surge: 0,
    animating: false,
    clock: 0,
  });

  const setMRef = useRef<HTMLDivElement>(null);
  const setNRef = useRef<HTMLDivElement>(null);

  const showHouse = useCallback((n: number) => {
    if (setMRef.current && setNRef.current) {
      if (n === 0) {
        setMRef.current.classList.add('is-on');
        setNRef.current.classList.remove('is-on');
      } else {
        setMRef.current.classList.remove('is-on');
        setNRef.current.classList.add('is-on');
      }
    }
  }, []);

  const beginTransition = useCallback((n: number, now: number) => {
    const s = stateRef.current;
    s.target = n;
    s.from = s.k;
    s.start = now;
    s.swapped = false;
    s.animating = true;
    setActiveMode(n === 0 ? 'morning' : 'night');
  }, []);

  const pickMode = useCallback((n: number) => {
    const s = stateRef.current;
    if (n === s.target && s.queued === null) return;
    const calm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (calm) {
      s.target = s.night = n;
      s.k = n;
      showHouse(n);
      setActiveMode(n === 0 ? 'morning' : 'night');
      const root = containerRef.current?.style;
      if (root) {
        root.setProperty('--k', n.toString());
        root.setProperty('--k2', n.toString());
        root.setProperty('--sink', '0px');
        root.setProperty('--dip', '0');
      }
      return;
    }
    if (s.animating) {
      s.queued = n;
    } else {
      beginTransition(n, s.clock);
    }
  }, [beginTransition, showHouse]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    const U: Record<string, WebGLUniformLocation | null> = {};

    if (gl) {
      const vs = `#version 300 es
      void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0,1);}`;
      const fs = `#version 300 es
      precision highp float;
      uniform vec2 R;uniform float T,S,K;out vec4 O;
      float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float a=.5,s=0.;mat2 m=mat2(1.6,1.2,-1.2,1.6);p=mat2(.8,.6,-.6,.8)*p+5.3;for(int i=0;i<5;i++){s+=a*n(p);p=m*p;a*=.5;}return s;}
      void main(){
        vec2 uv=gl_FragCoord.xy/R;uv.y=1.-uv.y;
        float asp=R.x/R.y;vec2 p=vec2(uv.x*asp,uv.y);
        float t=T*.05;
        vec2 w=vec2(fbm(p*1.3+vec2(t,-t*.6)),fbm(p*1.3+vec2(-t*.8,t)+7.));
        float d=fbm(p*1.9+w*1.7+vec2(t*1.6,-t*1.1+S*.5));
        float e=fbm(p*.9-w+vec2(-t,t*.5)+3.);
        float low=smoothstep(.70,1.04,uv.y+(d-.5)*.34);
        float side=smoothstep(.2,.0,uv.x+(e-.5)*.28)+smoothstep(.8,1.,uv.x+(e-.5)*.28);
        side*=smoothstep(.25,.6,uv.y)*.2;
        float wisps=smoothstep(.5,.78,d)*smoothstep(.22,.5,uv.y)*smoothstep(.86,.6,uv.y)*.18;
        float rest=clamp(low+side+wisps,0.,1.);
        float front=1.02-S*.68;
        float rise=smoothstep(front-.02,front+.26,uv.y+(d-.5)*.5);
        float haze=S*(.3+.46*d);
        float a=clamp(max(rest,max(rise*.97,haze)),0.,1.);
        vec3 dayA=vec3(.97,.93,.84),dayB=vec3(.79,.78,.71);
        vec3 nitA=vec3(.40,.45,.57),nitB=vec3(.15,.19,.29);
        vec3 c=mix(mix(dayB,dayA,d*1.15),mix(nitB,nitA,d*1.1),K);
        float porch=exp(-dot((uv-vec2(.72,.74))*vec2(1.7,2.6),(uv-vec2(.72,.74))*vec2(1.7,2.6))*3.2);
        c=mix(c,vec3(.86,.55,.27),K*porch*.42*(1.-S));
        O=vec4(c*a,a);
      }`;

      const sh = (type: number, src: string) => {
        const o = gl.createShader(type);
        if (!o) return null;
        gl.shaderSource(o, src);
        gl.compileShader(o);
        if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(o));
        }
        return o;
      };

      const vsShader = sh(gl.VERTEX_SHADER, vs);
      const fsShader = sh(gl.FRAGMENT_SHADER, fs);
      if (vsShader && fsShader) {
        const pr = gl.createProgram();
        if (pr) {
          gl.attachShader(pr, vsShader);
          gl.attachShader(pr, fsShader);
          gl.linkProgram(pr);
          gl.useProgram(pr);
          for (const u of ['R', 'T', 'S', 'K']) {
            U[u] = gl.getUniformLocation(pr, u);
          }
        }
      }
    }

    const resize = () => {
      if (!gl || !cv) return;
      const w = Math.round(Math.min(window.innerWidth, 960));
      const h = Math.round((w * window.innerHeight) / window.innerWidth);
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const SINK = 240;
    const RISE = 820;
    const DEPTH = 0.27;
    const clampVal = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const smoothVal = (a: number, b: number, x: number) => {
      const v = clampVal((x - a) / (b - a));
      return v * v * (3 - 2 * v);
    };

    let animId: number;

    const frame = (now: number) => {
      const s = stateRef.current;
      s.clock = now;
      const d = now - s.start;
      let y = 0;
      let surge = 0;
      let dip = 0;
      let k2 = s.k;

      if (s.animating) {
        if (d < SINK) {
          const x = d / SINK;
          y = x * x * (3 - 2 * x) * DEPTH;
        } else {
          if (!s.swapped) {
            s.swapped = true;
            s.night = s.target;
            showHouse(s.target);
          }
          const x = clampVal((d - SINK) / RISE);
          y = Math.pow(1 - x, 3.4) * DEPTH;
        }

        surge = smoothVal(0, SINK * 0.92, d) * (1 - smoothVal(SINK + 70, SINK + RISE * 0.92, d));
        dip = smoothVal(30, 190, d) * (1 - smoothVal(330, 720, d));
        s.k = s.from + (s.target - s.from) * smoothVal(120, 520, d);
        k2 = s.from + (s.target - s.from) * smoothVal(340, 760, d);

        if (d >= SINK + RISE) {
          s.animating = false;
          s.k = s.target;
          k2 = s.target;
          y = 0;
          surge = 0;
          dip = 0;
          if (s.queued !== null && s.queued !== s.target) {
            const q = s.queued;
            s.queued = null;
            beginTransition(q, now);
          } else {
            s.queued = null;
          }
        }
      }

      const root = containerRef.current?.style;
      if (root) {
        root.setProperty('--sink', `${(y * window.innerHeight).toFixed(1)}px`);
        root.setProperty('--k', s.k.toFixed(3));
        root.setProperty('--k2', k2.toFixed(3));
        root.setProperty('--dip', dip.toFixed(3));
      }

      if (gl && cv && U.R) {
        gl.uniform2f(U.R, cv.width, cv.height);
        gl.uniform1f(U.T, now / 1000);
        gl.uniform1f(U.S, surge);
        gl.uniform1f(U.K, s.k);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [beginTransition, showHouse]);

  return (
    <div
      ref={containerRef}
      className="hero-container relative h-[100svh] min-h-[520px] overflow-hidden isolate bg-[#0b1426] select-none"
      style={
        {
          '--u': 'min(calc(100vw/1600),calc(100vh/900))',
          '--k': '1',
          '--k2': '1',
          '--dip': '0',
          '--ink': 'color-mix(in srgb, #14202f calc((1 - var(--k)) * 100%), #ffffff)',
          '--nav': 'color-mix(in srgb, #1b2736 calc((1 - var(--k)) * 100%), #eef1f6)',
          '--soft': 'color-mix(in srgb, #1b2736 calc((1 - var(--k)) * 100%), #dfe5ee)',
        } as React.CSSProperties
      }
    >
      <style jsx global>{`
        .hero-container {
          --u: min(calc(100vw / 1600), calc(100vh / 900));
        }
        @media (max-width: 820px) {
          .hero-container {
            --u: 1px;
          }
        }
        .sky-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 62%;
          filter: blur(calc(7 * var(--u)));
          transform: scale(1.05);
        }
        .home-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
          transform: translate3d(0, var(--sink, 0px), 0);
        }
        .home-layer .set {
          position: absolute;
          inset: 0;
          visibility: hidden;
        }
        .home-layer .set.is-on {
          visibility: visible;
        }
        .ground-mask {
          position: absolute;
          inset: 0;
          -webkit-mask-image: linear-gradient(transparent 54%, #000 64%);
          mask-image: linear-gradient(transparent 54%, #000 64%);
        }
        .ground-mask img,
        .home-cut {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 62%;
        }
        @media (max-width: 820px) {
          .sky-img,
          .ground-mask img,
          .home-cut {
            object-position: 72% 62% !important;
          }
        }
        .tilt-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          -webkit-backdrop-filter: blur(calc(9 * var(--u)));
          backdrop-filter: blur(calc(9 * var(--u)));
          -webkit-mask-image: linear-gradient(transparent 70%, #000 92%);
          mask-image: linear-gradient(transparent 70%, #000 92%);
        }
        .hero-ui {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }
        .hero-ui a,
        .hero-ui button {
          pointer-events: auto;
        }
        .hero-bar {
          width: 100%;
          display: flex;
          align-items: center;
          padding: calc(22 * var(--u)) calc(38 * var(--u)) 0;
          color: var(--nav);
        }
        .hero-logo {
          display: flex;
          align-items: center;
          gap: calc(9 * var(--u));
          font-size: calc(25 * var(--u));
          font-weight: 500;
          letter-spacing: -0.025em;
          color: var(--ink);
          flex: 1 1 0;
        }
        .hero-links {
          display: flex;
          gap: calc(42 * var(--u));
          list-style: none;
          font-size: calc(16.5 * var(--u));
          font-weight: 500;
          opacity: calc(1 - var(--dip) * 0.82);
        }
        .hero-side {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: calc(40 * var(--u));
          font-size: calc(16.5 * var(--u));
          font-weight: 500;
        }
        .hero-side > a:first-child {
          opacity: calc(1 - var(--dip) * 0.82);
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          height: calc(46 * var(--u));
          padding: 0 calc(26 * var(--u));
          border-radius: 99px;
          background: color-mix(in srgb, #0d1117 calc((1 - var(--k)) * 100%), #ffffff);
          color: color-mix(in srgb, #ffffff calc((1 - var(--k)) * 100%), #0d1117);
          opacity: calc(1 - var(--dip) * 0.62);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .hero-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }
        .hero-h1 {
          margin-top: calc(58 * var(--u));
          text-align: center;
          font-size: calc(64 * var(--u));
          line-height: 1.09;
          font-weight: 500;
          letter-spacing: -0.022em;
          color: var(--ink);
        }
        .hero-h1 span {
          display: block;
        }
        .hero-h1 .l1,
        .hero-h1 .y {
          opacity: calc(1 - var(--dip) * 0.8);
        }
        .hero-h1 i {
          font-style: normal;
          color: color-mix(in srgb, #14202f calc((1 - var(--k2)) * 42%), color-mix(in srgb, #ffffff calc(var(--k2) * 100%), #7c8794));
        }
        .hero-h1 .y {
          display: inline;
        }
        .hero-dock {
          margin-top: auto;
          padding-bottom: calc(40 * var(--u));
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-toggle {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: calc(524 * var(--u));
          height: calc(86 * var(--u));
          padding: calc(2 * var(--u));
          border-radius: calc(16 * var(--u));
          overflow: hidden;
          background: rgba(120, 132, 140, 0.34);
          border: 1px solid rgba(255, 255, 255, 0.2);
          -webkit-backdrop-filter: blur(calc(14 * var(--u)));
          backdrop-filter: blur(calc(14 * var(--u)));
        }
        .hero-toggle button {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: calc(3 * var(--u));
          border-radius: calc(13 * var(--u));
          color: #ffffff;
          overflow: hidden;
          cursor: pointer;
        }
        .hero-toggle button:before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(160deg, #f7f8dc, #e2ee9f 90%);
          box-shadow: inset 0 0 calc(18 * var(--u)) rgba(255, 255, 255, 0.65);
          opacity: var(--on);
          transition: opacity 0.2s ease;
        }
        .hero-toggle b,
        .hero-toggle small {
          position: relative;
          color: color-mix(in srgb, #1c2316 calc(var(--on) * 100%), #ffffff);
        }
        .hero-toggle b {
          font-size: calc(23 * var(--u));
          font-weight: 500;
          letter-spacing: -0.012em;
        }
        .hero-toggle small {
          font-size: calc(15 * var(--u));
          opacity: 0.72;
        }
        .hero-toggle button:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: -4px;
        }
        #btn-morning {
          --on: calc(1 - var(--k));
        }
        #btn-night {
          --on: var(--k);
        }
        .hero-cap {
          margin-top: calc(22 * var(--u));
          text-align: center;
          font-size: calc(16.4 * var(--u));
          line-height: 1.3;
          color: var(--soft);
        }
        @media (max-width: 820px) {
          .hero-bar {
            padding: 16px 16px 0;
          }
          .hero-logo {
            font-size: 21px;
          }
          .hero-links,
          .hero-side > a:first-child {
            display: none;
          }
          .hero-cta {
            height: 40px;
            padding: 0 16px;
            font-size: 14px;
          }
          .hero-h1 {
            margin-top: 34px;
            padding: 0 16px;
            font-size: clamp(34px, 10.4vw, 56px);
          }
          .hero-dock {
            width: 100%;
            padding: 0 16px 24px;
          }
          .hero-toggle {
            width: 100%;
            max-width: 440px;
            height: 74px;
          }
          .hero-toggle b {
            font-size: 19px;
          }
          .hero-toggle small {
            font-size: 13px;
          }
          .hero-cap {
            font-size: 14px;
            max-width: 360px;
          }
          .hero-cap br {
            display: none;
          }
        }
      `}</style>

      {/* Layer 1: Blurred Sky (Morning + Night blend) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          id="skyM"
          alt=""
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040343_a73684b4-3f71-4613-a843-c8be80fb1211.png&w=1600&q=80"
          className="sky-img"
        />
        <img
          id="skyN"
          alt=""
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040308_f31964ab-ed8e-4ea4-90eb-3226c0859936.png&w=1600&q=80"
          className="sky-img"
          style={{ opacity: 'var(--k)' }}
        />
      </div>

      {/* Layer 2: House and Garden (Vertical Sink & Rise) */}
      <div className="home-layer">
        {/* Morning Set */}
        <div ref={setMRef} className="set" id="setM">
          <div className="ground-mask">
            <img
              alt=""
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040259_1be34093-835e-4de4-b3a8-f875e6a74591.png&w=2560&q=85"
            />
          </div>
          <img
            className="home-cut"
            alt="A charcoal farmhouse with solar panels in soft morning light"
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040416_e3b05fa4-cc80-4a43-afde-8a0a053933e9.png&w=2560&q=85"
          />
        </div>

        {/* Night Set (Active by Default) */}
        <div ref={setNRef} className="set is-on" id="setN">
          <div className="ground-mask">
            <img
              alt=""
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040211_c8fd4865-285e-4c1f-8a37-4bfe0771357b.png&w=2560&q=85"
            />
          </div>
          <img
            className="home-cut"
            alt="The same farmhouse at dusk with warm amber windows"
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_040415_2ab95096-8c39-449f-b36c-17c2813815a4.png&w=2560&q=85"
          />
        </div>
      </div>

      {/* Layer 3: Tilt-shift foreground blur */}
      <div className="tilt-layer" />

      {/* Layer 4: Procedural WebGL2 Fog Shader */}
      <canvas ref={canvasRef} id="fog" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Layer 5: UI Layer */}
      <div className="hero-ui">
        {/* Navigation Bar */}
        <header className="hero-bar">
          <a href="#" className="hero-logo" aria-label="Synapse Roof Home">
            <svg
              viewBox="0 0 40 40"
              className="flex-none w-[calc(38*var(--u))] h-[calc(38*var(--u))]"
              aria-hidden="true"
            >
              <g fill="color-mix(in srgb, #6d8f2a calc((1 - var(--k)) * 100%), #d8ee8e)">
                <circle cx="20" cy="20" r="0" />
                <path id="hero-sun-ray" d="M18.3 3.5h3.4l.9 8.4h-5.2Z" />
                <use href="#hero-sun-ray" transform="rotate(30 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(60 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(90 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(120 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(150 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(180 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(210 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(240 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(270 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(300 20 20)" />
                <use href="#hero-sun-ray" transform="rotate(330 20 20)" />
              </g>
            </svg>
            Synapse Roof
          </a>

          <ul className="hero-links">
            <li>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#architecture" className="hover:text-white transition-colors">
                Architecture
              </a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-white transition-colors">
                Savings Calculator
              </a>
            </li>
            <li>
              <a href="#cases" className="hover:text-white transition-colors">
                Verified Cases
              </a>
            </li>
            <li>
              <a href="#specs" className="hover:text-white transition-colors">
                Specifications
              </a>
            </li>
            <li>
              <a href="#guarantee" className="hover:text-white transition-colors">
                Guarantee
              </a>
            </li>
          </ul>

          <div className="hero-side">
            <a href="#cases" className="hover:text-white transition-colors">
              Customers
            </a>
            <button
              onClick={onOpenQuote}
              className="hero-cta cursor-pointer"
            >
              Get an Instant Quote
            </button>
          </div>
        </header>

        {/* Dynamic Centered Headline */}
        <h1 className="hero-h1">
          <span className="l1">$0 Electricity Bills</span>
          <span>
            <i>for the next</i> <span className="y">7 Years</span>
          </span>
        </h1>

        {/* Glass Morning / Night Toggle and Subtitle Dock */}
        <div className="hero-dock">
          <div className="hero-toggle" role="group" aria-label="Time of day toggle">
            <button
              id="btn-morning"
              aria-pressed={activeMode === 'morning'}
              onClick={() => pickMode(0)}
            >
              <b>Morning</b>
              <small>$0 for Electricity</small>
            </button>
            <button
              id="btn-night"
              aria-pressed={activeMode === 'night'}
              onClick={() => pickMode(1)}
            >
              <b>Night</b>
              <small>$0 for Electricity</small>
            </button>
          </div>
          <p className="hero-cap">
            Forget the energy market, weather conditions and seasons. Our Smart
            <br />
            Controller guarantees you get no electricity bill for seven years.
          </p>

          <a
            href="#how-it-works"
            className="mt-6 flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 hover:text-white transition-all transform hover:translate-y-0.5"
            aria-label="Scroll to learn how it works"
          >
            <span>Explore The System</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

