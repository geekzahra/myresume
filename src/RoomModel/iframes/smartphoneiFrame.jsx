import { Html } from '@react-three/drei'; // Import Html for embedding HTML elements in a 3D scene
import React, { useMemo, useRef } from 'react'; // Import necessary hooks from React

import { useCameraStore } from '../../helper/CameraStore'; // Import Zustand store for camera state management

// Memoized SmartphoneiFrame component for better performance
const SmartphoneiFrame = React.memo(() => {
    const cameraState = useCameraStore((state) => state.cameraState); // Access current camera state from the store
    const iframeRef = useRef(null); // Reference for the iframe element

    // Memoized value to check if the current camera state is 'smartphone'
    const isSmartphone = useMemo(
        () => cameraState === 'smartphone',
        [cameraState] // Recalculate only when cameraState changes
    );

    return (
        <group>
            {isSmartphone && ( // Render the iframe only if camera state is 'smartphone'
                <Html
                    occlude="blending" // Blends the iframe with the 3D scene
                    rotation-y={Math.PI} // Rotate the iframe along Y-axis (180 degrees)
                    rotation-x={Math.PI / 2} // Rotate the iframe along X-axis (90 degrees)
                    rotation-z={-Math.PI / 6} // Rotate the iframe along Z-axis (-30 degrees)
                    transform // Apply transformations to the iframe
                    wrapperClass="htmlPhoneScreen" // Class for styling the iframe container
                    distanceFactor={0.285} // Adjusts the size based on distance
                    position={[1.6395, 1.125, -1.373]} // Set position of the iframe in 3D space
                    zIndexRange={[2, 1]} // Define z-index range for rendering order
                >
                    <iframe
                        width={392} // Width of the iframe (simulates smartphone screen)
                        height={809} // Height of the iframe (simulates smartphone screen)
                        title="embed" // Title for accessibility
                        src="https://borhan.site/geekzahra/" // URL to embed within the iframe
                        style={{ border: 'none', borderRadius: '22px' }} // Remove border and add rounded corners for a smartphone-like look
                        ref={iframeRef} // Reference to the iframe element
                    />
                </Html>
            )}
        </group>
    );
});

export default SmartphoneiFrame; // Export the component as the default export
