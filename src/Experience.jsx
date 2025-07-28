import React, { useState, useEffect, Suspense, useRef } from 'react'; // Import useRef and useEffect for outside click detection
import { Loader } from '@react-three/drei'; // Loader for displaying loading state
import { Canvas } from '@react-three/fiber'; // Canvas component for rendering the 3D scene
import {
    Bloom,
    EffectComposer,
    Outline,
    Selection
} from '@react-three/postprocessing'; // Post-processing effects
import './style.css'; // Importing CSS for styling
import { CameraManager } from './CameraManager/CameraManager'; // Camera management component
import RoomModel from './RoomModel/RoomModel.jsx'; // 3D room model component - fixed extension

const Experience = React.memo(() => {
    const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility
    const menuRef = useRef(null); // Reference to the menu div

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu visibility
    };

    // Close the menu if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false); // Close menu if click is outside
            }
        };

        // Attach the event listener when the menu is open
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener when the menu is closed
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]); // The effect depends on the menuOpen state

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

            {/* Right-side menu with help text */}
            <div
                ref={menuRef} // Attach the menu div to the menuRef
                className={`right-side-menu ${menuOpen ? 'open' : ''}`}
            >
                <p className="help-text">
                    Welcome to geekzahra's 3D room experience!<br />
                    - Use your mouse or touchpad to rotate the view.<br />
                    - Scroll to zoom in and out.<br />
                    - Click on objects to interact with them.<br />
                    Enjoy exploring the room!
                </p>

                {/* Close Button inside the menu */}
                <button className="close-button" onClick={toggleMenu}>
                    Got it!
                </button>

                {/* Sticky Button to open the menu */}
            <button className="sticky-menu-button" onClick={toggleMenu}>
                How to Explore?
            </button>
            </div>
        </>
    );
});

export default Experience;
