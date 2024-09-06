import { Loader } from '@react-three/drei'; // Loader for displaying loading state
import { Canvas } from '@react-three/fiber'; // Canvas component for rendering the 3D scene
import {
    Bloom,
    EffectComposer,
    Outline,
    Selection
} from '@react-three/postprocessing'; // Post-processing effects
import React, { Suspense } from 'react'; // React and Suspense for lazy loading
import './style.css'; // Importing CSS for styling

import { CameraManager } from './CameraManager/CameraManager'; // Camera management component
import RoomModel from './RoomModel/roomModel'; // 3D room model component

const Experience = React.memo(() => {
    return (
        <>
            {/* Intro text */}
            <div className="intro-text">
                <p>Welcome to geekzahra's room :)</p>
            </div>

            <Canvas
                camera={{
                    fov: 35, // Field of view
                    near: 0.1, // Near clipping plane
                    far: 200, // Far clipping plane
                    position: [24, 15, -24] // Initial camera position
                }}
                gl={{
                    antialias: true, // Enable antialiasing for smoother edges
                    alpha: true, // Enable transparency
                    powerPreference: 'high-performance' // Prefer high-performance graphics
                }}
            >
                <Suspense fallback={null}>
                    <Selection>
                        <EffectComposer autoClear={false}>
                            {/* Post-processing effects */}
                            <Outline
                                blur
                                visibleEdgeColor="white"
                                edgeStrength={60}
                                width={2000}
                            />
                            <Bloom mipmapBlur intensity={0.9} />
                        </EffectComposer>
                        <CameraManager /> {/* Manages the camera */}
                        <RoomModel /> {/* The main 3D room model */}
                    </Selection>
                </Suspense>
            </Canvas>
            <Loader /> {/* Loader component for displaying loading state */}
        </>
    );
});

export default Experience;
