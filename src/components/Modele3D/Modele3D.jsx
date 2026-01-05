import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import Interface from './Interface';
import './Modele3D.css';

const Modele3D = () => {
    const [cameraIndex, setCameraIndex] = useState(0);
    const [animationTrigger, setAnimationTrigger] = useState(null);

    const handleSwitchCamera = () => {
        setCameraIndex((prev) => (prev + 1) % 3);
    };

    const handleToggleAnimation = (name) => {
        setAnimationTrigger({ name, timestamp: Date.now() });
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>

            <Interface
                onSwitchCamera={handleSwitchCamera}
                onToggleAnimation={handleToggleAnimation}
            />

            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    toneMappingExposure: 1.5,
                    alpha: true
                }}
            >
                <Suspense fallback={null}>
                    <Experience
                        cameraIndex={cameraIndex}
                        animationTrigger={animationTrigger}
                    />
                </Suspense>
            </Canvas>

            <div className="loader-overlay" style={{ pointerEvents: 'none' }}>
                <Suspense fallback={<div className="loader-container"><div className="loader-spinner"></div><p>Chargement de la salle...</p></div>}>
                    {/* Chargé */}
                </Suspense>
            </div>
        </div>
    );
};

export default Modele3D;
