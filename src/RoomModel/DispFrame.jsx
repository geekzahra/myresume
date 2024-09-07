import { useTexture, useVideoTexture } from '@react-three/drei';
import { Select } from '@react-three/postprocessing';
import React, { useCallback, useEffect, useState } from 'react';

import { useCameraStore } from '../helper/CameraStore';
import DesktopiFrame from './iframes/desktopiFrame';
import SmartphoneiFrame from './iframes/smartphoneiFrame';
import TvEmulator from './iframes/tvEmulator';
import LaptopDisp from './laptopDisp';

const DispFrame = React.memo(({ nodes }) => {
    // Access camera state and display states from the camera store
    const cameraState = useCameraStore((state) => state.cameraState);
    const desktopState = useCameraStore((state) => state.desktop);
    const laptopState = useCameraStore((state) => state.laptop);
    const tvState = useCameraStore((state) => state.tv);
    const smartphoneState = useCameraStore((state) => state.smartphone);
    const displayBoardState = useCameraStore((state) => state.displayBoard);

    // State hooks to manage hover effects for different display components
    const [hovered, setHover] = useState(false);
    const [hoveredMonitor, setHoveredMonitor] = useState(null);
    const [hoveredLaptop, setHoveredLaptop] = useState(null);
    const [hoveredTv, setHoveredTv] = useState(null);
    const [hoveredSmartphone, setHoveredSmartphone] = useState(null);
    const [hoveredDisplayBoard, setHoveredDisplayBoard] = useState(null);

    // Update cursor style based on overall hover state
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    // Callbacks to set hover state when user interacts with the components
    const onPointerOver = useCallback(() => setHover(true), []);
    const onPointerOut = useCallback(() => setHover(false), []);

    // Load video textures for desktop and TV displays, and image textures for smartphone and background
    const desktopWallpaper = useVideoTexture('./assets/videos/desktopWallpaper.mp4');
    const tvWallpaper = useVideoTexture('./assets/videos/marioWallpaper.mp4');
    const smartphoneWallpaper = useTexture('./assets/images/smartphoneWallpaper.webp');
    const musicBg = useTexture('./assets/images/SpotifyClone.webp');

    return (
        <>
            {/* Render the display components (iFrames) */}
            <LaptopDisp nodes={nodes} />
            <SmartphoneiFrame />
            <DesktopiFrame />
            <TvEmulator />

            {/* Desktop monitor mesh */}
            <Select enabled={hoveredMonitor}>
                <mesh
                    geometry={nodes.monitor.geometry} // Monitor geometry
                    position={nodes.monitor.position} // Monitor position
                    rotation={nodes.monitor.rotation} // Monitor rotation
                    onClick={
                        cameraState !== 'desktop'
                            ? () => {
                                  desktopState(); // Switch to desktop view
                                  setHoveredMonitor(false); // Reset hover state
                                  onPointerOut(); // Reset cursor
                              }
                            : undefined
                    }
                    onPointerOver={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredMonitor(true); // Set hover state
                              }
                            : undefined
                    }
                    onPointerOut={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredMonitor(false); // Reset hover state
                              }
                            : undefined
                    }
                >
                    <meshBasicMaterial
                        map={desktopWallpaper} // Apply video texture
                        toneMapped={false} // Disable tone mapping
                    />
                </mesh>
            </Select>

            {/* Laptop display mesh */}
            <Select enabled={hoveredLaptop}>
                <mesh
                    geometry={nodes.laptop.geometry} // Laptop geometry
                    position={nodes.laptop.position} // Laptop position
                    rotation={nodes.laptop.rotation} // Laptop rotation
                    onClick={
                        cameraState !== 'laptop'
                            ? () => {
                                  laptopState(); // Switch to laptop view
                                  setHoveredLaptop(false); // Reset hover state
                                  onPointerOut(); // Reset cursor
                              }
                            : undefined
                    }
                    onPointerOver={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredLaptop(true); // Set hover state
                              }
                            : undefined
                    }
                    onPointerOut={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredLaptop(false); // Reset hover state
                              }
                            : undefined
                    }
                >
                    <meshBasicMaterial map={musicBg} toneMapped={false} />
                </mesh>
            </Select>

            {/* TV display mesh */}
            <Select enabled={hoveredTv}>
                <mesh
                    geometry={nodes.tvdisplay.geometry} // TV display geometry
                    position={nodes.tvdisplay.position} // TV display position
                    rotation={nodes.tvdisplay.rotation} // TV display rotation
                    onClick={
                        cameraState !== 'tv'
                            ? () => {
                                  tvState(); // Switch to TV view
                                  setHoveredTv(false); // Reset hover state
                                  onPointerOut(); // Reset cursor
                              }
                            : undefined
                    }
                    onPointerOver={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredTv(true); // Set hover state
                              }
                            : undefined
                    }
                    onPointerOut={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredTv(false); // Reset hover state
                              }
                            : undefined
                    }
                >
                    <meshBasicMaterial map={tvWallpaper} toneMapped={false} />
                </mesh>
            </Select>

            {/* Smartphone display mesh */}
            <Select enabled={hoveredSmartphone}>
                <mesh
                    geometry={nodes.smartphoneDisp.geometry} // Smartphone geometry
                    position={nodes.smartphoneDisp.position} // Smartphone position
                    rotation={nodes.smartphoneDisp.rotation} // Smartphone rotation
                    onClick={
                        cameraState !== 'smartphone'
                            ? () => {
                                  smartphoneState(); // Switch to smartphone view
                                  setHoveredSmartphone(false); // Reset hover state
                                  onPointerOut(); // Reset cursor
                              }
                            : undefined
                    }
                    onPointerOver={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredSmartphone(true); // Set hover state
                              }
                            : undefined
                    }
                    onPointerOut={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredSmartphone(false); // Reset hover state
                              }
                            : undefined
                    }
                >
                    <meshBasicMaterial map={smartphoneWallpaper} />
                </mesh>
            </Select>

            {/* Display board mesh */}
            <Select enabled={hoveredDisplayBoard}>
                <mesh
                    position={[-5.2, 2.95, -1.95]} // Position of the display board
                    rotation={[0, Math.PI / 2, 0]} // Rotation of the display board
                    scale={[2.8, 1.6, 1]} // Scale of the display board
                    onClick={
                        cameraState === 'displayBoard'
                            ? undefined
                            : () => {
                                  displayBoardState(); // Switch to display board view
                                  setHoveredDisplayBoard(false); // Reset hover state
                                  onPointerOut(); // Reset cursor
                              }
                    }
                    onPointerOver={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOver(); // Set cursor to pointer
                                  setHoveredDisplayBoard(true); // Set hover state
                              }
                            : undefined
                    }
                    onPointerOut={
                        cameraState === 'default'
                            ? () => {
                                  onPointerOut(); // Reset cursor
                                  setHoveredDisplayBoard(false); // Reset hover state
                              }
                            : undefined
                    }
                >
                    <meshBasicMaterial
                        transparent={true} // Make material transparent
                        opacity={0} // Set opacity
                        color={'#d9d9d9'} // Set color
                    />
                    <planeGeometry />
                    {/* Plane geometry for the display board */}
                </mesh>
            </Select>
        </>
    );
});

export default DispFrame;

// Preload textures to improve performance during runtime
useTexture.preload('./assets/images/smartphoneWallpaper.webp');
useTexture.preload('./assets/images/SpotifyClone.webp');
