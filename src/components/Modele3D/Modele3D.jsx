import { useProgress, Html } from '@react-three/drei';

function Loader() {
    const { active, progress } = useProgress();
    if (!active) return null;
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
            <p>Chargement... {progress.toFixed(0)}%</p>
        </div>
    );
}

const Modele3D = () => {
    const [cameraIndex, setCameraIndex] = useState(0);
    const [animationTrigger, setAnimationTrigger] = useState(null);

    const handleSwitchCamera = (mode) => {
        if (mode === 'free') {
            setCameraIndex(3);
        } else {
            // Cycle only through 0, 1, 2 (Preserve logic for main button if used without args)
            setCameraIndex((prev) => (prev === 3 ? 0 : (prev + 1) % 3));
        }
    };

    const handleToggleAnimation = (name) => {
        setAnimationTrigger({ name, timestamp: Date.now() });
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Loader />

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
        </div>
    );
};

export default Modele3D;
