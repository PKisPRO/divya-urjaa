"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 *  The flame is the emblem's central shape, made volumetric: a teardrop
 *  field that narrows as it rises, dragged around by fractal noise so the
 *  silhouette never repeats. Palette is the brand's own — teal at the base,
 *  saffron through the body, soft gold in the core.
 * ------------------------------------------------------------------ */

const flameVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const flameFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3  uDeep;
  uniform vec3  uSaffron;
  uniform vec3  uGold;
  uniform vec3  uSoft;

  vec2 hash2(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gnoise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
          dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
          dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
  }

  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * gnoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float h = uv.y;

    // noise rises faster than the body, which is what makes fire read as fire
    float n1 = fbm(vec2(uv.x * 3.4, h * 2.2 - uTime * 0.62));
    float n2 = fbm(vec2(uv.x * 7.0 + 4.0, h * 3.6 - uTime * 1.05));

    // lateral sway, stronger the higher you go
    float sway = sin(uTime * 0.85 + h * 3.1) * 0.028 * h;
    float x = (uv.x - 0.5) + n1 * 0.105 * pow(h, 1.4) + sway;

    // teardrop: shoulders low and wide, pinched to a tip
    float w = mix(0.155, 0.006, pow(h, 0.52)) + 0.004;
    float d = abs(x) / w;

    // gaussian across the width — a flame has no flat core, it falls off
    // continuously from the centre outward
    float body = exp(-d * d * 1.5);
    body *= smoothstep(0.0, 0.13, h);                    // gather at the base
    body *= 1.0 - smoothstep(0.46, 0.9, h + n2 * 0.22);  // dissolve at the tip
    body = clamp(body * uIntensity, 0.0, 1.0);

    float core = pow(body, 3.4);
    float edge = pow(body, 0.9);

    // warm all the way out — a cool base colour would simply vanish into the
    // teal ground under additive blending
    vec3 col = mix(uSaffron, uGold, smoothstep(0.12, 0.5, edge));
    col = mix(col, uSoft, core);
    col = mix(uDeep * 1.6, col, smoothstep(0.0, 0.14, body));

    // brightness travelling up the body
    float spark = smoothstep(0.6, 1.0, fbm(vec2(uv.x * 9.0, h * 5.0 - uTime * 1.9)));
    col += uSoft * spark * body * 0.3;

    // additive: let the intensity itself carry the falloff
    gl_FragColor = vec4(col * body, clamp(body, 0.0, 1.0));
  }
`;

function Flame({ intensity = 1 }: { intensity?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uDeep: { value: new THREE.Color("#15374d") },
      uSaffron: { value: new THREE.Color("#e69236") },
      uGold: { value: new THREE.Color("#dba655") },
      uSoft: { value: new THREE.Color("#f6de9b") },
    }),
    [intensity],
  );

  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });

  return (
    <mesh position={[0, -0.35, 0]}>
      <planeGeometry args={[3.2, 4.4, 1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={flameVertex}
        fragmentShader={flameFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 *  Embers — sparse, slow, and drifting on a curl-ish path. Count scales
 *  down hard on small screens.
 * ------------------------------------------------------------------ */

const emberVertex = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uSpread;
  varying float vLife;

  void main(){
    vec3 p = position;
    float t = fract(uTime * 0.055 + aSeed);
    vLife = t;

    p.y = mix(-2.0, 3.4, t);
    p.x += sin(uTime * 0.55 + aSeed * 32.0) * 0.34 * uSpread * t;
    p.z += cos(uTime * 0.42 + aSeed * 19.0) * 0.28 * uSpread * t;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // deliberately tiny: these are sparks off a wick, not floating spheres
    gl_PointSize = aSize * (1.0 - t * 0.6) * (26.0 / -mv.z);
  }
`;

const emberFragment = /* glsl */ `
  precision mediump float;
  varying float vLife;
  uniform vec3 uColor;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = 1.0 - smoothstep(0.05, 0.5, d);
    float fade = smoothstep(0.0, 0.1, vLife) * (1.0 - smoothstep(0.45, 1.0, vLife));
    gl_FragColor = vec4(uColor, soft * fade * 0.55);
  }
`;

function Embers({ count = 140 }: { count?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      seeds[i] = Math.random();
      sizes[i] = 0.9 + Math.random() * 1.6;
    }
    return { positions, seeds, sizes };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpread: { value: 1 },
      uColor: { value: new THREE.Color("#f0b46a") },
    }),
    [],
  );

  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={emberVertex}
        fragmentShader={emberFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function FlameScene({ intensity = 1 }: { intensity?: number }) {
  const { size } = useThree();
  const small = size.width < 768;

  return (
    <>
      <Flame intensity={intensity} />
      <Embers count={small ? 40 : 110} />
    </>
  );
}
