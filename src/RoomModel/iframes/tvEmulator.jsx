import { Html } from '@react-three/drei'; // Import Html for embedding HTML elements in a 3D scene
import React, { useMemo } from 'react'; // Import necessary React hooks
import { EmulatorJS } from 'react-emulatorjs'; // Import EmulatorJS component for running emulated games

import { useCameraStore } from '../../helper/CameraStore'; // Import Zustand store for camera state management

// Memoized TvEmulator component for better performance
const TvEmulator = React.memo(() => {
    const rom = './assets/SuperMarioAdvance4.gba'; // Path to the ROM file for the emulator

    const cameraState = useCameraStore((state) => state.cameraState); // Access current camera state from the store
    const isTv = useMemo(() => cameraState === 'tv', [cameraState]); // Memoized check if camera state is 'tv'

    return (
        <group>
            {isTv && ( // Render the emulator only if camera state is 'tv'
                <Html
                    transform // Apply transformations to the embedded HTML content
                    wrapperClass="htmlScreen" // Class for styling the iframe container
                    distanceFactor={0.925} // Adjusts the size based on distance
                    occlude="blending" // Blend the HTML with the 3D scene
                    position={[2.28, 2.72, -3.6]} // Set position of the emulator in 3D space
                    zIndexRange={[2, 1]} // Define z-index range for rendering order
                >
                    {/* EmulatorJS component to run a Game Boy Advance (GBA) game */}
                    <EmulatorJS
                        width={1610} // Width of the emulator window
                        height={852} // Height of the emulator window
                        EJS_core="gba" // Specify the emulation core (GBA in this case)
                        EJS_gameUrl={rom} // Path to the ROM file
                        EJS_startOnLoaded={true} // Start the emulator as soon as it is loaded
                        EJS_Buttons={{ fullscreen: false }} // Disable fullscreen button in the emulator
                    />
                </Html>
            )}
        </group>
    );
});

export default TvEmulator; // Export the component as the default export
