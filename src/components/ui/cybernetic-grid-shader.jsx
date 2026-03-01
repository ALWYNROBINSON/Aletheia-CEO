import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CyberneticGridShader = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1) Renderer, Scene, Camera, Clock
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const clock = new THREE.Clock();

        // 2) GLSL Shaders
        const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

        const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))
                     * 43758.5453123);
      }

      void main() {
        // normalize coords around center
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy)
                     / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy)
                     / iResolution.y;

        float t         = iTime * 0.2;
        float mouseDist = length(uv - mouse);

        // warp effect around mouse
        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
        warp *= smoothstep(0.4, 0.0, mouseDist);
        uv += warp;

        // grid lines — neon pink / purple palette
        vec2 gridUv = abs(fract(uv * 10.0) - 0.5);
        float line  = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

        // base grid color: neon pink (#FF2D8F)
        vec3 gridColor = vec3(1.0, 0.176, 0.561);
        vec3 color     = gridColor
                       * line
                       * (0.4 + sin(t * 2.0) * 0.15);

        // energetic pulses along grid — purple accent (#7A5CFF)
        float energy = sin(uv.x * 20.0 + t * 5.0)
                     * sin(uv.y * 20.0 + t * 3.0);
        energy = smoothstep(0.8, 1.0, energy);
        color += vec3(0.478, 0.361, 1.0) * energy * line;

        // glow around mouse — soft white-pink
        float glow = smoothstep(0.12, 0.0, mouseDist);
        color += vec3(1.0, 0.4, 0.7) * glow * 0.6;

        // subtle noise
        color += random(uv + t * 0.1) * 0.04;

        gl_FragColor = vec4(color, 0.85);
      }
    `;

        // 3) Uniforms, Material, Mesh
        const dpr = window.devicePixelRatio || 1;
        const uniforms = {
            iTime: { value: 0 },
            iResolution: {
                value: new THREE.Vector2(
                    window.innerWidth * dpr,
                    window.innerHeight * dpr
                )
            },
            iMouse: {
                value: new THREE.Vector2(
                    (window.innerWidth / 2) * dpr,
                    (window.innerHeight / 2) * dpr
                )
            }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // 4) Resize handler — use actual canvas framebuffer dimensions
        const onResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            // renderer.domElement.width/height are already DPR-scaled
            uniforms.iResolution.value.set(
                renderer.domElement.width,
                renderer.domElement.height
            );
        };
        window.addEventListener('resize', onResize);
        onResize();

        // 5) Mouse handler — scale CSS coords to match framebuffer space
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const scaleX = renderer.domElement.width / rect.width;
            const scaleY = renderer.domElement.height / rect.height;
            uniforms.iMouse.value.set(
                (e.clientX - rect.left) * scaleX,
                // WebGL y=0 is at bottom, so flip
                (rect.height - (e.clientY - rect.top)) * scaleY
            );
        };
        window.addEventListener('mousemove', onMouseMove);

        // 6) Animation loop
        renderer.setAnimationLoop(() => {
            uniforms.iTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        });

        // 7) Cleanup on unmount
        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            renderer.setAnimationLoop(null);
            const canvas = renderer.domElement;
            if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
            material.dispose();
            geometry.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            aria-label="Cybernetic Grid animated background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default CyberneticGridShader;
