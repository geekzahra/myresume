// imports
import { CameraControls } from '@react-three/drei';
import { useRef } from 'react';
import { useEffect } from 'react';

import { useCameraStore } from '../helper/CameraStore';

export const CameraManager = () => {
    const cameraControle = useRef(); // Create a reference to control the camera

    // Retrieve camera state and various settings from the custom store
    const cameraState = useCameraStore((state) => state.cameraState);
    const maxDistance = useCameraStore((state) => state.maxDistance);
    const minDistance = useCameraStore((state) => state.minDistance);
    const maxAzimuthAngle = useCameraStore((state) => state.maxAzimuthAngle);
    const minAzimuthAngle = useCameraStore((state) => state.minAzimuthAngle);
    const minPolarAngle = useCameraStore((state) => state.minPolarAngle);
    const maxPolarAngle = useCameraStore((state) => state.maxPolarAngle);
    const truckSpeed = useCameraStore((state) => state.truckSpeed);
    const dollyToCursor = useCameraStore((state) => state.dollyToCursor);
    const enable = useCameraStore((state) => state.enable);

    // useEffect hook to update camera settings based on the current camera state
    useEffect(() => {
        if (cameraState === 'default') {
            // Default camera settings
            useCameraStore.setState({ truckSpeed: 0.5 });
            useCameraStore.setState({ dollyToCursor: true });
            useCameraStore.setState({ minDistance: 2 });
            useCameraStore.setState({ maxDistance: 25 });
            useCameraStore.setState({ minPolarAngle: Math.PI * 0.1 });
            useCameraStore.setState({ maxPolarAngle: Math.PI * 0.45 });
            useCameraStore.setState({ minAzimuthAngle: Math.PI * 0.5 });
            useCameraStore.setState({ maxAzimuthAngle: Math.PI });
            cameraControle.current.setLookAt(14, 10, -14, 0, -1, 0, true);
        }

        if (cameraState === 'desktop') {
            // Settings for desktop view
            useCameraStore.setState({ truckSpeed: 0 });
            useCameraStore.setState({ dollyToCursor: false });
            useCameraStore.setState({ minDistance: 5.65 });
            useCameraStore.setState({ maxDistance: 7.1 });
            useCameraStore.setState({ minPolarAngle: Math.PI * 0.5 });
            useCameraStore.setState({ maxPolarAngle: Math.PI * 0.5 });
            useCameraStore.setState({ minAzimuthAngle: Math.PI });
            useCameraStore.setState({ maxAzimuthAngle: Math.PI });
            cameraControle.current.setLookAt(2.1, 0.3, 2, 2.1, 0.3, 8, true);
        }

        if (cameraState === 'laptop') {
            // Settings for laptop view
            useCameraStore.setState({ truckSpeed: 0 });
            useCameraStore.setState({ dollyToCursor: false });
            useCameraStore.setState({ minDistance: 4.2 });
            useCameraStore.setState({ maxDistance: 6 });
            useCameraStore.setState({ minPolarAngle: Math.PI * 0.435 });
            useCameraStore.setState({ maxPolarAngle: Math.PI * 0.435 });
            useCameraStore.setState({ minAzimuthAngle: Math.PI * 0.689 });
            useCameraStore.setState({ maxAzimuthAngle: Math.PI * 0.689 });
            cameraControle.current.setLookAt(2, 0, 2.5, -2, -1, 5.2, true);
        }

        if (cameraState === 'tv') {
            // Settings for TV view
            useCameraStore.setState({ truckSpeed: 0 });
            useCameraStore.setState({ dollyToCursor: false });
            useCameraStore.setState({ minDistance: 5.6 });
            useCameraStore.setState({ maxDistance: 6.5 });
            useCameraStore.setState({ minPolarAngle: Math.PI * 0.5 });
            useCameraStore.setState({ maxPolarAngle: Math.PI * 0.5 });
            useCameraStore.setState({ minAzimuthAngle: 0 });
            useCameraStore.setState({ maxAzimuthAngle: 0 });
            cameraControle.current.setLookAt(2.5, -0.1, 1, 2.5, -0.1, -5, true);
        }

        if (cameraState === 'smartphone') {
            // Settings for smartphone view
            useCameraStore.setState({ truckSpeed: 0 });
            useCameraStore.setState({ dollyToCursor: false });
            useCameraStore.setState({ minDistance: 8.8 });
            useCameraStore.setState({ maxDistance: 9.2 });
            useCameraStore.setState({ minPolarAngle: Math.PI * 0.03 });
            useCameraStore.setState({ maxPolarAngle: Math.PI * 0.036 });
            useCameraStore.setState({ minAzimuthAngle: Math.PI * 0.83 });
            useCameraStore.setState({ maxAzimuthAngle: Math.PI * 0.845 });
            cameraControle.current.setLookAt(
                1.7,
                -0.3,
                -0.85,
                1.25,
                -9,
                -0.1,
                true
            );
        }

        if (cameraState === 'displayBoard') {
            // Settings for display board view
            useCameraStore.setState({ truckSpeed: 0 });
            useCameraStore.setState({ dollyToCursor: true });
            useCameraStore.setState({ minDistance: 4 });
            useCameraStore.setState({ maxDistance: 8 });
            useCameraStore.setState({ minPolarAngle: Math.PI * 0.4999 });
            useCameraStore.setState({ maxPolarAngle: Math.PI * 0.5 });
            useCameraStore.setState({ minAzimuthAngle: Math.PI * 0.5 });
            useCameraStore.setState({ maxAzimuthAngle: Math.PI * 0.50001 });
            cameraControle.current.setLookAt(
                -2,
                0.12,
                -1.5,
                -8,
                0.12,
                -1.5,
                true
            );
        }
    });

    // Render the CameraControls component with the current settings
    return (
        <CameraControls
            makeDefault={true} // Make this the default camera control
            ref={cameraControle} // Reference to access the camera control programmatically
            dollyToCursor={dollyToCursor} // Enable/disable dolly to cursor behavior
            dollySpeed={1.2} // Set dolly speed
            truckSpeed={truckSpeed} // Set truck speed (panning speed)
            minDistance={minDistance} // Set minimum camera distance
            maxDistance={maxDistance} // Set maximum camera distance
            smoothTime={0.8} // Set smoothing time for transitions
            maxAzimuthAngle={maxAzimuthAngle} // Set max horizontal rotation angle
            minAzimuthAngle={minAzimuthAngle} // Set min horizontal rotation angle
            minPolarAngle={minPolarAngle} // Set min vertical rotation angle
            maxPolarAngle={maxPolarAngle} // Set max vertical rotation angle
            polarRotateSpeed={0.3} // Set rotation speed for vertical axis
            azimuthRotateSpeed={0.3} // Set rotation speed for horizontal axis
            maxSpeed={20} // Set maximum speed for movement
            enableTransition={true} // Enable smooth transitions
            boundaryFriction={0} // Disable boundary friction
            boundaryEnclosesCamera={true} // Allow the camera to be enclosed by boundaries
            interactiveArea={[0.5, 0.5, 1, 1]} // Set interactive area on the screen
            enabled={enable} // Toggle camera controls on or off
        />
    );
};
