import { useSpring } from '@react-spring/core';
import { Center, useGLTF, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useControls } from 'leva';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import { useCameraStore } from '../helper/CameraStore';
import ThemeSwitch from '../Switch/ThemeSwitch';
import Clock from './Clock';
import DispFrame from './DisplayFrame';
import DispItem from './DisplayItem';
import PhotoFrame from './PhotoFrame';
import TextureMaterial from './textures/TextureMaterial';
import Windows from './Windows';

// Extend @react-three/fiber to use custom materials like TextureMaterial
extend({ TextureMaterial });

const RoomModel = React.memo(() => {
    // Refs for texture materials in the room
    const chairTop = useRef();
    const textureMatFur = useRef();
    const textureMatDes = useRef();
    const textureMatChaorTop = useRef();

    // State to toggle between day and night modes
    const [toggle, setToggle] = useState(0);

    // Update texture materials based on the toggle state using GSAP animations
    useEffect(() => {
        const nightMix = toggle ? 1 : 0;
        gsap.to(textureMatFur.current.uniforms.NightMix, {
            value: nightMix,
            duration: 1
        });
        gsap.to(textureMatDes.current.uniforms.NightMix, {
            value: nightMix,
            duration: 1
        });
        gsap.to(textureMatChaorTop.current.uniforms.NightMix, {
            value: nightMix,
            duration: 1
        });
    }, [toggle]);

    // Spring animation for smooth transitions based on the toggle state
    const [{ x }] = useSpring(
        {
            x: toggle,
            config: { mass: 4, tension: 800, friction: 35, precision: 0.001 }
        },
        [toggle]
    );

    // Update chair rotation based on the elapsed time from the clock
    useFrame(({ clock }) => {
        if (chairTop.current) {
            chairTop.current.rotation.y = Math.sin(
                clock.getElapsedTime() * 0.3
            );
        }
    });

    // Controls for adjusting various room settings
    const controls = useControls({
        boardColor: { value: '#ff2d88', label: 'Board Color' },
        boardStrength: { value: 1.35, min: 0, max: 3, step: 0.01 },
        pcColor: { value: '#4b7eff', label: 'PC-Color' },
        pcColorStrength: { value: 1.2, min: 0, max: 3, step: 0.01 },
        deskColors: { value: '#ff7236', label: 'Desk Color' },
        deskColorStrngth: { value: 1.55, min: 0, max: 3, step: 0.01 }
    });

    // Load GLTF models for the room and chair
    const roomModel = useGLTF('./assets/models/RoomModel.glb');
    const chair = useGLTF('./assets/models/chairtopDraco.glb');

    // Load and configure textures for the room
    const dBaked = useTexture('./assets/textures/bakedTextureDaycmp.webp');
    dBaked.flipY = false; // Prevent vertical flipping
    dBaked.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
    dBaked.minFilter = THREE.NearestFilter; // Use nearest filtering for minification
    dBaked.generateMipmaps = false; // Disable mipmaps for this texture

    const nBaked = useTexture('./assets/textures/roomTextureNightcmp.webp');
    nBaked.flipY = false; // Prevent vertical flipping
    nBaked.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
    nBaked.minFilter = THREE.NearestFilter; // Use nearest filtering for minification
    nBaked.generateMipmaps = false; // Disable mipmaps for this texture

    const lightMap = useTexture('./assets/textures/roomTextureLightMapcmp.webp');
    lightMap.flipY = false; // Prevent vertical flipping
    lightMap.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
    lightMap.minFilter = THREE.NearestFilter; // Use nearest filtering for minification
    lightMap.generateMipmaps = false; // Disable mipmaps for this texture

    // Memoize texture properties to optimize rendering performance
    const textureMaterialProps = useMemo(
        () => ({
            dbakedm: dBaked,
            nbakedm: nBaked,
            lightMapm: lightMap,
            NightMix: 0, // Initial value for night mix
            lightBoardColor: controls.boardColor,
            lightBoardStrength: controls.boardStrength,
            lightPcColor: controls.pcColor,
            lightPcStrength: controls.pcColorStrength,
            lightDeskColor: controls.deskColors,
            lightDeskStrength: controls.deskColorStrngth
        }),
        [dBaked, nBaked, lightMap, controls]
    );

    // Camera state management from a custom store
    const cameraState = useCameraStore((state) => state.cameraState);
    const defaultState = useCameraStore((state) => state.default);

    return (
        <group>
            <Center>
                {/* Main furniture mesh with texture material */}
                <mesh
                    geometry={roomModel.nodes.roomFurniture.geometry}
                    position={roomModel.nodes.roomFurniture.position}
                    rotation={roomModel.nodes.roomFurniture.rotation}
                    onClick={
                        cameraState === 'default'
                            ? undefined
                            : cameraState === 'displayBoard'
                              ? undefined
                              : cameraState === 'laptop'
                                ? undefined
                                : defaultState
                    }
                >
                    <textureMaterial
                        {...textureMaterialProps}
                        ref={textureMatFur}
                    />
                </mesh>

                {/* Desk shelf mesh with texture material */}
                <mesh
                    geometry={roomModel.nodes.deskShelfStuf.geometry}
                    position={roomModel.nodes.deskShelfStuf.position}
                    rotation={roomModel.nodes.deskShelfStuf.rotation}
                    onClick={
                        cameraState === 'default' ? undefined : defaultState
                    }
                >
                    <textureMaterial
                        {...textureMaterialProps}
                        ref={textureMatDes}
                    />
                </mesh>

                {/* Chair top mesh with texture material */}
                <mesh
                    ref={chairTop}
                    geometry={chair.nodes.chairTop.geometry}
                    position={chair.nodes.chairTop.position}
                    rotation={chair.nodes.chairTop.rotation}
                    onClick={
                        cameraState === 'default' ? undefined : defaultState
                    }
                >
                    <textureMaterial
                        {...textureMaterialProps}
                        ref={textureMatChaorTop}
                    />
                </mesh>

                {/* Additional components in the room */}
                <PhotoFrame toggle={toggle} nodes={roomModel.nodes} />
                <DispFrame nodes={roomModel.nodes} />
                <DispItem toggle={toggle} nodes={roomModel.nodes} />
                <Clock />
                <Windows toggle={toggle} nodes={roomModel.nodes} />
                <ThemeSwitch x={x} set={setToggle} nodes={roomModel.nodes} />
            </Center>
        </group>
    );
});

export default RoomModel;

// Preload models and textures to improve performance by avoiding runtime loading
useGLTF.preload('./assets/models/RoomModel.glb');
useGLTF.preload('./assets/models/chairtopDraco.glb');
useTexture.preload('./assets/textures/bakedTextureDaycmp.webp');
useTexture.preload('./assets/textures/roomTextureNightcmp.webp');
useTexture.preload('./assets/textures/roomTextureLightMapcmp.webp');
