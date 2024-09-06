import { useTexture } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { Select } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useCameraStore } from '../helper/CameraStore';
import TextureMaterial from './textures/TextureMaterial';
extend({ TextureMaterial });

// The DispItem component handles the display items in the 3D scene
const DispItem = React.memo(({ toggle, nodes }) => {
    // Refs for display items to apply animations and materials
    const dispItem = useRef(); // Main display item
    const desktopdisp = useRef(); // Desktop display
    const musicdisp = useRef(); // Music display
    const homedisp = useRef(); // Home display
    const smartphonedisp = useRef(); // Smartphone display
    const tvdisp = useRef(); // TV display

    // Animate the 'NightMix' property of each texture material based on 'toggle' state
    useEffect(() => {
        const animateMaterial = (ref) => {
            gsap.to(ref.current.uniforms.NightMix, {
                value: toggle ? 1 : 0,
                duration: 1
            });
        };

        // Apply the animation to all display items
        animateMaterial(dispItem);
        animateMaterial(desktopdisp);
        animateMaterial(musicdisp);
        animateMaterial(homedisp);
        animateMaterial(smartphonedisp);
        animateMaterial(tvdisp);
    }, [toggle]);

    // Load textures for different displays
    const dBakeddisp = useTexture('./assets/boardBakedDcmp.webp');
    dBakeddisp.flipY = false; // Correct orientation for textures
    dBakeddisp.magFilter = THREE.LinearFilter; // Texture filter for magnification
    dBakeddisp.minFilter = THREE.NearestFilter; // Texture filter for minification
    dBakeddisp.generateMipmaps = false; // Disable mipmap generation to save resources

    const nBakeddisp = useTexture('./assets/boardBakedNcmp.webp');
    nBakeddisp.flipY = false;
    nBakeddisp.magFilter = THREE.LinearFilter;
    nBakeddisp.minFilter = THREE.NearestFilter;
    nBakeddisp.generateMipmaps = false;

    const lightMapdisp = useTexture('./assets/boardBakedLMAPcmp.webp');
    lightMapdisp.flipY = false;
    lightMapdisp.magFilter = THREE.LinearFilter;
    lightMapdisp.minFilter = THREE.NearestFilter;
    lightMapdisp.generateMipmaps = false;

    // Define the initial properties for the texture materials
    const TextureMaterialDisps = {
        dbakedm: dBakeddisp, // Diffuse baked texture
        nbakedm: nBakeddisp, // Normal baked texture
        lightMapm: lightMapdisp, // Light map texture
        NightMix: 0, // Default mix value for night mode
        lightBoardColor: '#fff', // Color for light board
        lightBoardStrength: 0, // Strength of light on board
        lightPcColor: '#fff', // Color for PC light
        lightPcStrength: 0, // Strength of PC light
        lightDeskColor: '#fff', // Color for desk light
        lightDeskStrength: 0 // Strength of desk light
    };

    // State hooks to manage hover effects and selected display
    const [hovered, setHover] = useState(false); // General hover state
    const [hoveredMonitor, setHoveredMonitor] = useState(null); // Hover state for monitor
    const [hoveredLaptop, setHoveredLaptop] = useState(null); // Hover state for laptop
    const [hoveredTv, setHoveredTv] = useState(null); // Hover state for TV
    const [hoveredSmartphone, setHoveredSmartphone] = useState(null); // Hover state for smartphone
    const [hoveredHome, setHoveredHome] = useState(null); // Hover state for home display

    // Update the cursor style based on hover state
    useEffect(
        () => {
            document.body.style.cursor = hovered ? 'pointer' : 'auto';
        },
        [hovered]
    );

    // Callbacks to handle hover events
    const onPointerOver = useCallback(() => setHover(true), []);
    const onPointerOut = useCallback(() => setHover(false), []);

    // Retrieve camera states from the store to handle interactions
    const cameraState = useCameraStore((state) => state.cameraState);
    const defaultState = useCameraStore((state) => state.default);
    const desktopState = useCameraStore((state) => state.desktop);
    const laptopState = useCameraStore((state) => state.laptop);
    const tvState = useCameraStore((state) => state.tv);
    const smartphoneState = useCameraStore((state) => state.smartphone);

    return (
        <>
            {/* Main display item */}
            <mesh
                geometry={nodes.dispItem.geometry} // Geometry for the main display
                position={nodes.dispItem.position} // Position of the main display
                rotation={nodes.dispItem.rotation} // Rotation of the main display
                onPointerOver={
                    cameraState === 'displayBoard' ? onPointerOut : null
                }
                onPointerOut={
                    cameraState === 'displayBoard' ? onPointerOut : null
                }
                onClick={
                    cameraState === 'displayBoard' ? defaultState : undefined
                }
            >
                <textureMaterial {...TextureMaterialDisps} ref={dispItem} />
            </mesh>

            {/* Rope mesh */}
            <mesh
                geometry={nodes.rope.geometry} // Geometry for the rope
                position={nodes.rope.position} // Position of the rope
                rotation={nodes.rope.rotation} // Rotation of the rope
            >
                <meshBasicMaterial color={'#160000'} /> {/* Basic material for the rope */}
            </mesh>

            {/* Desktop display */}
            <Select enabled={hoveredMonitor}>
                <mesh
                    geometry={nodes.desktop.geometry} // Geometry for the desktop display
                    position={nodes.desktop.position} // Position of the desktop display
                    rotation={nodes.desktop.rotation} // Rotation of the desktop display
                    onClick={
                        cameraState === 'displayBoard'
                            ? () => {
                                  desktopState(); // Switch to desktop view
                                  setHoveredMonitor(false); // Reset hover state
                                  onPointerOut(); // Reset cursor
                              }
                            : undefined
                    }
                    onPointerOver={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredMonitor(true); // Set hover state
                              }
                            : null
                    }
                    onPointerOut={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredMonitor(false); // Reset hover state
                              }
                            : null
                    }
                >
                    <textureMaterial
                        {...TextureMaterialDisps}
                        ref={desktopdisp}
                    />
                </mesh>
            </Select>

            {/* Music display */}
            <Select enabled={hoveredLaptop}>
                <mesh
                    geometry={nodes.music.geometry} // Geometry for the music display
                    position={nodes.music.position} // Position of the music display
                    rotation={nodes.music.rotation} // Rotation of the music display
                    onClick={
                        cameraState === 'displayBoard'
                            ? cameraState === 'laptop'
                                ? undefined
                                : () => {
                                      laptopState(); // Switch to laptop view
                                      setHoveredLaptop(false); // Reset hover state
                                      onPointerOut(); // Reset cursor
                                  }
                            : null
                    }
                    onPointerOver={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredLaptop(true); // Set hover state
                              }
                            : null
                    }
                    onPointerOut={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredLaptop(false); // Reset hover state
                              }
                            : null
                    }
                >
                    <textureMaterial
                        {...TextureMaterialDisps}
                        ref={musicdisp}
                    />
                </mesh>
            </Select>

            {/* Home display */}
            <Select enabled={hoveredHome}>
                <mesh
                    geometry={nodes.home.geometry} // Geometry for the home display
                    position={nodes.home.position} // Position of the home display
                    rotation={nodes.home.rotation} // Rotation of the home display
                    onClick={
                        cameraState === 'displayBoard'
                            ? cameraState === 'default'
                                ? undefined
                                : () => {
                                      defaultState(); // Switch to default view
                                      setHoveredHome(false); // Reset hover state
                                      onPointerOut(); // Reset cursor
                                  }
                            : null
                    }
                    onPointerOver={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredHome(true); // Set hover state
                              }
                            : null
                    }
                    onPointerOut={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredHome(false); // Reset hover state
                              }
                            : null
                    }
                >
                    <textureMaterial {...TextureMaterialDisps} ref={homedisp} />
                </mesh>
            </Select>

            {/* Smartphone display */}
            <Select enabled={hoveredSmartphone}>
                <mesh
                    geometry={nodes.smartphone.geometry} // Geometry for the smartphone display
                    position={nodes.smartphone.position} // Position of the smartphone display
                    rotation={nodes.smartphone.rotation} // Rotation of the smartphone display
                    onClick={
                        cameraState === 'displayBoard'
                            ? cameraState === 'smartphone'
                                ? undefined
                                : () => {
                                      smartphoneState(); // Switch to smartphone view
                                      setHoveredSmartphone(false); // Reset hover state
                                      onPointerOut(); // Reset cursor
                                  }
                            : null
                    }
                    onPointerOver={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredSmartphone(true); // Set hover state
                              }
                            : null
                    }
                    onPointerOut={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredSmartphone(false); // Reset hover state
                              }
                            : null
                    }
                >
                    <textureMaterial
                        {...TextureMaterialDisps}
                        ref={smartphonedisp}
                    />
                </mesh>
            </Select>

            {/* TV display */}
            <Select enabled={hoveredTv}>
                <mesh
                    geometry={nodes.tv.geometry} // Geometry for the TV display
                    position={nodes.tv.position} // Position of the TV display
                    rotation={nodes.tv.rotation} // Rotation of the TV display
                    onClick={
                        cameraState === 'displayBoard'
                            ? cameraState === 'tv'
                                ? undefined
                                : () => {
                                      tvState(); // Switch to TV view
                                      setHoveredTv(false); // Reset hover state
                                      onPointerOut(); // Reset cursor
                                  }
                            : null
                    }
                    onPointerOver={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredTv(true); // Set hover state
                              }
                            : null
                    }
                    onPointerOut={
                        cameraState === 'displayBoard'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredTv(false); // Reset hover state
                              }
                            : null
                    }
                >
                    <textureMaterial {...TextureMaterialDisps} ref={tvdisp} />
                </mesh>
            </Select>
        </>
    );
});

export default DispItem;

// Preload textures to improve performance by avoiding runtime loading
useTexture.preload('./assets/boardBakedDcmp.webp');
useTexture.preload('./assets/boardBakedNcmp.webp');
useTexture.preload('./assets/boardBakedLMAPcmp.webp');
