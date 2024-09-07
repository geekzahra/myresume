import { useTexture } from '@react-three/drei';
import { Howl } from 'howler';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCameraStore } from '../helper/CameraStore';

// The LaptopDisp component displays and manages interactive laptop display elements
const LaptopDisp = React.memo(({ nodes }) => {
    // Refs for each laptop display mesh
    const autumn = useRef();
    const christmas = useRef();
    const clarity = useRef();
    const comeAndGet = useRef();
    const sunflower = useRef();

    // Load textures for different states (paused and playing) for each display
    const AutumnPause = useTexture('./assets/images/AutumnPaus.jpg');
    const AutumnPlay = useTexture('./assets/images/AutumnPlay.jpg');
    const christmasPause = useTexture('./assets/images/christmasLightPaus.jpg');
    const christmasPlay = useTexture('./assets/images/christmasLightPlay.jpg');
    const clarityPause = useTexture('./assets/images/clarityPaus.jpg');
    const clarityPlay = useTexture('./assets/images/clarityPlay.jpg');
    const comeAndGetPause = useTexture('./assets/images/comeAndGetYourLovePause.jpg');
    const comeAndGetPlay = useTexture('./assets/images/comeAndGetYourLovePlay.jpg');
    const sunflowerPause = useTexture('./assets/images/sunflowerPaus.jpg');
    const sunflowerPlay = useTexture('./assets/images/sunflowerPlay.jpg');

    // State to manage hover effects
    const [hovered, setHover] = useState(false);
    // State to manage the currently playing display
    const [playingMesh, setPlayingMesh] = useState(null);

    // Ref for Howl instances for audio management
    const sounds = useRef({});
    // Object holding the paths to audio files
    const audioFiles = useRef({
        Autumn: './assets/audio/AutumnLeavesCover.mp3',
        Christmas: './assets/audio/ChristmasLights.mp3',
        Clarity: './assets/audio/Clarity.mp3',
        ComeAndGet: './assets/audio/ComeAndGetYourLove.mp3',
        Sunflower: './assets/audio/Sunflower.mp3'
    }).current;

    // Initialize Howl instances for audio files
    useEffect(() => {
        sounds.current = {
            Autumn: new Howl({ src: [audioFiles.Autumn] }),
            Christmas: new Howl({ src: [audioFiles.Christmas] }),
            Clarity: new Howl({ src: [audioFiles.Clarity] }),
            ComeAndGet: new Howl({ src: [audioFiles.ComeAndGet] }),
            Sunflower: new Howl({ src: [audioFiles.Sunflower] })
        };

        // Cleanup Howl instances on component unmount
        return () => {
            Object.values(sounds.current).forEach((sound) => sound.unload());
        };
    }, [audioFiles]);

    // Update cursor style based on hover state
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    // Callbacks for handling pointer events
    const onPointerOver = useCallback(() => setHover(true), []);
    const onPointerOut = useCallback(() => setHover(false), []);

    // Retrieve current camera state from the camera store
    const cameraState = useCameraStore((state) => state.cameraState);

    // Handle mesh click events: play or stop sounds and update display textures
    const handleMeshClick = (mesh) => {
        // Stop all sounds
        Object.values(sounds.current).forEach((sound) => sound.stop());

        // Toggle play state for the clicked mesh
        if (playingMesh !== mesh) {
            // Play the selected sound
            sounds.current[mesh].play();
            setPlayingMesh(mesh);
        } else {
            // If the same mesh is clicked again, stop the sound
            setPlayingMesh(null);
        }
    };

    return (
        <>
            {/* Autumn display */}
            <mesh
                geometry={nodes.music1.geometry} // Geometry for the autumn display
                position={nodes.music1.position} // Position of the autumn display
                rotation={nodes.music1.rotation} // Rotation of the autumn display
                scale={nodes.music1.scale} // Scale of the autumn display
                ref={autumn} // Reference to the autumn display mesh
                onPointerOver={cameraState === 'laptop' ? onPointerOver : null} // Set hover effect if camera state is 'laptop'
                onPointerOut={cameraState === 'laptop' ? onPointerOut : null} // Remove hover effect if camera state is 'laptop'
                onClick={() => handleMeshClick('Autumn')} // Handle click event for autumn display
            >
                <meshBasicMaterial
                    map={playingMesh === 'Autumn' ? AutumnPlay : AutumnPause} // Set texture based on play state
                    toneMapped={false} // Disable tone mapping
                />
            </mesh>

            {/* Christmas display */}
            <mesh
                geometry={nodes.music2.geometry} // Geometry for the Christmas display
                position={nodes.music2.position} // Position of the Christmas display
                rotation={nodes.music2.rotation} // Rotation of the Christmas display
                scale={nodes.music2.scale} // Scale of the Christmas display
                ref={christmas} // Reference to the Christmas display mesh
                onPointerOver={cameraState === 'laptop' ? onPointerOver : null} // Set hover effect if camera state is 'laptop'
                onPointerOut={cameraState === 'laptop' ? onPointerOut : null} // Remove hover effect if camera state is 'laptop'
                onClick={() => handleMeshClick('Christmas')} // Handle click event for Christmas display
            >
                <meshBasicMaterial
                    map={playingMesh === 'Christmas' ? christmasPlay : christmasPause} // Set texture based on play state
                    toneMapped={false} // Disable tone mapping
                />
            </mesh>

            {/* Clarity display */}
            <mesh
                geometry={nodes.music3.geometry} // Geometry for the Clarity display
                position={nodes.music3.position} // Position of the Clarity display
                rotation={nodes.music3.rotation} // Rotation of the Clarity display
                scale={nodes.music3.scale} // Scale of the Clarity display
                ref={clarity} // Reference to the Clarity display mesh
                onPointerOver={cameraState === 'laptop' ? onPointerOver : null} // Set hover effect if camera state is 'laptop'
                onPointerOut={cameraState === 'laptop' ? onPointerOut : null} // Remove hover effect if camera state is 'laptop'
                onClick={() => handleMeshClick('Clarity')} // Handle click event for Clarity display
            >
                <meshBasicMaterial
                    map={playingMesh === 'Clarity' ? clarityPlay : clarityPause} // Set texture based on play state
                    toneMapped={false} // Disable tone mapping
                />
            </mesh>

            {/* Come and Get display */}
            <mesh
                geometry={nodes.music4.geometry} // Geometry for the Come and Get display
                position={nodes.music4.position} // Position of the Come and Get display
                rotation={nodes.music4.rotation} // Rotation of the Come and Get display
                scale={nodes.music4.scale} // Scale of the Come and Get display
                ref={comeAndGet} // Reference to the Come and Get display mesh
                onPointerOver={cameraState === 'laptop' ? onPointerOver : null} // Set hover effect if camera state is 'laptop'
                onPointerOut={cameraState === 'laptop' ? onPointerOut : null} // Remove hover effect if camera state is 'laptop'
                onClick={() => handleMeshClick('ComeAndGet')} // Handle click event for Come and Get display
            >
                <meshBasicMaterial
                    map={playingMesh === 'ComeAndGet' ? comeAndGetPlay : comeAndGetPause} // Set texture based on play state
                    toneMapped={false} // Disable tone mapping
                />
            </mesh>

            {/* Sunflower display */}
            <mesh
                geometry={nodes.music5.geometry} // Geometry for the Sunflower display
                position={nodes.music5.position} // Position of the Sunflower display
                rotation={nodes.music5.rotation} // Rotation of the Sunflower display
                scale={nodes.music5.scale} // Scale of the Sunflower display
                ref={sunflower} // Reference to the Sunflower display mesh
                onPointerOver={cameraState === 'laptop' ? onPointerOver : null} // Set hover effect if camera state is 'laptop'
                onPointerOut={cameraState === 'laptop' ? onPointerOut : null} // Remove hover effect if camera state is 'laptop'
                onClick={() => handleMeshClick('Sunflower')} // Handle click event for Sunflower display
            >
                <meshBasicMaterial
                    map={playingMesh === 'Sunflower' ? sunflowerPlay : sunflowerPause} // Set texture based on play state
                    toneMapped={false} // Disable tone mapping
                />
            </mesh>
        </>
    );
});

export default LaptopDisp;

// Preload textures to improve performance by avoiding runtime loading
useTexture.preload('./assets/images/AutumnPaus.jpg');
useTexture.preload('./assets/images/AutumnPlay.jpg');
useTexture.preload('./assets/images/christmasLightPaus.jpg');
useTexture.preload('./assets/images/christmasLightPlay.jpg');
useTexture.preload('./assets/images/clarityPaus.jpg');
useTexture.preload('./assets/images/clarityPlay.jpg');
useTexture.preload('./assets/images/comeAndGetYourLovePause.jpg');
useTexture.preload('./assets/images/comeAndGetYourLovePlay.jpg');
useTexture.preload('./assets/images/sunflowerPaus.jpg');
useTexture.preload('./assets/images/sunflowerPlay.jpg');
