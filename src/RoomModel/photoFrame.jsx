import { useTexture } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { gsap } from 'gsap';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import TextureMaterial from './textures/TextureMaterial';

// Extend @react-three/fiber to use custom materials like TextureMaterial
extend({ TextureMaterial });

const PhotoFrame = React.memo(({ toggle, nodes }) => {
    // Ref for the PhotoFrame material
    const frame = useRef();

    // Load textures for different frame states
    const dayFrame = useTexture('./assets/textures/bakeFrameDaycmp.webp');
    const nightFrame = useTexture('./assets/textures/bakeFrameNightcmp.webp');
    const lightMapFrame = useTexture('./assets/textures/bakeFrameLightMapcmp.webp');

    // Memoize texture properties to avoid unnecessary recalculations
    const textureProps = useMemo(() => {
        // Configure day frame texture properties
        dayFrame.flipY = false; // Prevent vertical flipping
        dayFrame.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
        dayFrame.minFilter = THREE.NearestFilter; // Use nearest filtering for minification
        dayFrame.generateMipmaps = false; // Disable mipmaps for this texture

        // Configure night frame texture properties
        nightFrame.flipY = false; // Prevent vertical flipping
        nightFrame.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
        nightFrame.minFilter = THREE.NearestFilter; // Use nearest filtering for minification
        nightFrame.generateMipmaps = false; // Disable mipmaps for this texture

        // Configure light map frame texture properties
        lightMapFrame.flipY = false; // Prevent vertical flipping
        lightMapFrame.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
        lightMapFrame.minFilter = THREE.NearestFilter; // Use nearest filtering for minification
        lightMapFrame.generateMipmaps = false; // Disable mipmaps for this texture

        // Return texture properties to be used in the material
        return {
            dbakedm: dayFrame,
            nbakedm: nightFrame,
            lightMapm: lightMapFrame,
            NightMix: 0 // Initial value for night mix
        };
    }, [dayFrame, nightFrame, lightMapFrame]);

    // Animate the NightMix property based on the toggle state
    useEffect(() => {
        gsap.to(frame.current.uniforms.NightMix, {
            value: toggle ? 1 : 0, // Set NightMix based on the toggle value
            duration: 1 // Duration of the animation in seconds
        });
    }, [toggle]);

    return (
        <mesh
            geometry={nodes.frame.geometry} // Geometry for the frame
            position={nodes.frame.position} // Position of the frame
            rotation={nodes.frame.rotation} // Rotation of the frame
        >
            {/* Use TextureMaterial with memoized texture properties */}
            <textureMaterial {...textureProps} ref={frame} />
        </mesh>
    );
});

export default PhotoFrame;

// Preload textures to improve performance by avoiding runtime loading
useTexture.preload('./assets/textures/bakeFrameDaycmp.webp');
useTexture.preload('./assets/textures/bakeFrameNightcmp.webp');
useTexture.preload('./assets/textures/bakeFrameLightMapcmp.webp');
