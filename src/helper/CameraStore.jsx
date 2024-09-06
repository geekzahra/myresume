import { create } from 'zustand'; // Import Zustand for state management

// Create a Zustand store to manage camera settings and state
export const useCameraStore = create((set) => ({
    // Initial camera state
    cameraState: 'default', // Default state for the camera

    // Functions to switch between different camera states
    default: () => {
        // Switch camera to 'default' state
        set((state) => ({
            cameraState: (state.cameraState = 'default')
        }));
    },
    desktop: () => {
        // Switch camera to 'desktop' state
        set((state) => ({
            cameraState: (state.cameraState = 'desktop')
        }));
    },
    laptop: () => {
        // Switch camera to 'laptop' state
        set((state) => ({
            cameraState: (state.cameraState = 'laptop')
        }));
    },
    tv: () => {
        // Switch camera to 'tv' state
        set((state) => ({
            cameraState: (state.cameraState = 'tv')
        }));
    },
    smartphone: () => {
        // Switch camera to 'smartphone' state
        set((state) => ({
            cameraState: (state.cameraState = 'smartphone')
        }));
    },
    displayBoard: () => {
        // Switch camera to 'displayBoard' state
        set((state) => ({
            cameraState: (state.cameraState = 'displayBoard')
        }));
    },

    // Camera properties for various settings
    maxDistance: 25, // Maximum distance the camera can move away
    minDistance: 2,  // Minimum distance the camera can move closer
    maxAzimuthAngle: Math.PI, // Maximum horizontal rotation angle (azimuth)
    minAzimuthAngle: Math.PI * 0.5, // Minimum horizontal rotation angle (azimuth)
    minPolarAngle: Math.PI * 0.1, // Minimum vertical rotation angle (polar)
    maxPolarAngle: Math.PI * 0.45, // Maximum vertical rotation angle (polar)
    truckSpeed: 0.5, // Speed of camera panning (truck movement)
    dollyToCursor: true, // Enable or disable dolly (zoom) to cursor
    enable: true // Toggle to enable or disable camera controls
}));
