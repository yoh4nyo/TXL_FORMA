import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Configuration des caméras
const CAMERAS_CONFIG = [
    { position: [19.79, 1.32, 9.72], target: [-23.0, -10, -50.0] },
    { position: [-22.74, 1.34, 9.74], target: [20.0, -10, -50.0] },
    { position: [-19.94, 0.7, -35.0], target: [28.27, -6, 13.88] },
];

const Experience = ({ cameraIndex, animationTrigger }) => {
    const { scene, animations } = useGLTF('/models/SCENECLASSETHREEJS.glb');
    const { actions, mixer } = useAnimations(animations, scene);
    const { gl, scene: threeScene } = useThree();

    const camRef1 = useRef();
    const camRef2 = useRef();
    const camRef3 = useRef();
    const ambientLightRef = useRef();

    const [lightsOn, setLightsOn] = useState(true);
    const [lightMaterials, setLightMaterials] = useState([]);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // Trouver les matériaux "Material.040"
                if (child.material && child.material.name.includes('Material.040')) {
                    if (child.material.emissive.getHex() === 0) {
                        child.material.emissive.set(0xffffff);
                    }
                    setLightMaterials(prev => [...prev, child.material]);
                }
            }
        });

        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.5;

        threeScene.background = null;

    }, [scene, gl, threeScene]);

    // Gestion des animations déclenchées par l'interface
    useEffect(() => {
        if (!animationTrigger) return;

        const { name, timestamp } = animationTrigger;

        // CAS LUMIÈRES
        if (name === 'LightONOFF') {
            const newLightsOn = !lightsOn;
            setLightsOn(newLightsOn);

            // 1. Jouer Animation GLB
            const actionName = Object.keys(actions).find(key => key.includes('LightONOFF'));
            if (actionName && actions[actionName]) {
                mixer.stopAllAction(); // Empêche les conflits (flickering)
                const action = actions[actionName];
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
                action.paused = false;

                if (newLightsOn) {
                    action.timeScale = 1;
                } else {
                    action.timeScale = -1;
                    if (action.time === 0) {
                        if (!action.isRunning()) action.time = action.getClip().duration;
                    }
                }
                action.play();
            }

            // 2. Material Emissive
            const targetIntensity = newLightsOn ? 50 : 0;
            lightMaterials.forEach(mat => {
                mat.emissiveIntensity = targetIntensity;
            });

            // 3. Ambiance & Background
            if (newLightsOn) {
                gl.toneMappingExposure = 1.5;
                if (ambientLightRef.current) ambientLightRef.current.intensity = 0.5;
                threeScene.background = null;
            } else {
                gl.toneMappingExposure = 1.0;
                if (ambientLightRef.current) ambientLightRef.current.intensity = 0.2;
                threeScene.background = null;
            }
        }
        // CAS STANDARD (ex: Cube)
        else {
            // Cherche animation contenant le nom
            const actionName = Object.keys(actions).find(key => key.includes(name));
            if (actionName && actions[actionName]) {
                const action = actions[actionName];
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
                action.paused = false;
                // Logique de toggle simple : si fini on inverse, sinon on joue
                if (action.time === 0 || (action.timeScale === -1 && !action.isRunning())) {
                    action.timeScale = 1;
                } else {
                    action.timeScale = -1;
                    if (action.time === 0 && !action.isRunning()) action.time = action.getClip().duration;
                }
                action.play();
            }
        }
    }, [animationTrigger, actions, lightMaterials, gl, threeScene]);

    // Animation Caméra Panorama (Cam 1)
    useFrame(({ clock }) => {
        if (cameraIndex === 0 && camRef1.current) {
            const time = clock.getElapsedTime() * 0.5;
            const sway = Math.sin(time) * 4;
            const target = CAMERAS_CONFIG[0].target;
            camRef1.current.lookAt(target[0] + sway, target[1], target[2]);
        }
        if (cameraIndex === 1 && camRef2.current) {
            camRef2.current.lookAt(...CAMERAS_CONFIG[1].target);
        }
        if (cameraIndex === 2 && camRef3.current) {
            camRef3.current.lookAt(...CAMERAS_CONFIG[2].target);
        }
    });

    return (
        <>
            <ambientLight ref={ambientLightRef} intensity={0.5} />

            <primitive object={scene} />

            <PerspectiveCamera
                makeDefault={cameraIndex === 0}
                ref={camRef1}
                position={CAMERAS_CONFIG[0].position}
                fov={45}
                near={0.1}
                far={1000}
            />
            <PerspectiveCamera
                makeDefault={cameraIndex === 1}
                ref={camRef2}
                position={CAMERAS_CONFIG[1].position}
                fov={45}
                near={0.1}
                far={1000}
            />
            <PerspectiveCamera
                makeDefault={cameraIndex === 2}
                ref={camRef3}
                position={CAMERAS_CONFIG[2].position}
                fov={45}
                near={0.1}
                far={1000}
            />
            <PerspectiveCamera
                makeDefault={cameraIndex === 3}
                position={[-15, 10, 20]}
                fov={50}
                near={0.1}
                far={1000}
            />

            <OrbitControls
                enabled={cameraIndex === 3}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                target={[0, -5, 0]}
            />
        </>
    );
};

export default Experience;
