import { Html } from '@react-three/drei'; // Import Html from drei for embedding HTML in 3D space
import React, { useMemo, useRef } from 'react'; // Import necessary hooks from React

import { useCameraStore } from '../../helper/CameraStore'; // Import Zustand store for camera state

// Memoized DesktopiFrame component for better performance
const DesktopiFrame = React.memo(() => {
    const cameraState = useCameraStore((state) => state.cameraState); // Get current camera state from the store
    const iframeRef = useRef(null); // Reference to the iframe element

    // useMemo hook to determine if the current camera state is 'desktop'
    const isDesktop = useMemo(() => cameraState === 'desktop', [cameraState]);

    return (
        <group>
            {isDesktop && ( // Render the iframe only if the camera is in 'desktop' state
                <Html
                    rotation-y={Math.PI} // Rotate the iframe along the Y-axis
                    transform // Apply transformation
                    wrapperClass="htmlScreen" // Class for styling the iframe container
                    distanceFactor={0.52} // Adjusts the scale based on the distance
                    occlude="blending" // Blend HTML with the 3D scene
                    position={[2.125, 3.03, 3.69]} // Position of the iframe in the 3D space
                    zIndexRange={[2, 1]} // Defines the z-index range for rendering
                >
                    <iframe
                        width={1511} // Set the iframe width
                        height={852} // Set the iframe height
                        title="embed" // Title for accessibility
                        src="https://borhan.site/geekzahra/" // The URL to embed
                        style={{ border: 'none' }} // Style to remove the border
                        ref={iframeRef} // Reference to the iframe element
                    />
                </Html>
            )}
        </group>
    );
});

export default DesktopiFrame; // Export the component as default
