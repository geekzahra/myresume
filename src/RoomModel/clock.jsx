import { useGLTF } from '@react-three/drei'; // Import GLTF loader hook from drei for 3D model loading
import { useFrame } from '@react-three/fiber'; // Import useFrame hook to run updates on each frame
import React, { useRef } from 'react'; // Import React for component and useRef for references
import * as THREE from 'three'; // Import core THREE.js utilities

// Memoized component to optimize rendering
const Clock = React.memo(() => {
    // Load the GLTF model of the clock using useGLTF hook
    const { nodes } = useGLTF('./assets/models/clock.glb');

    // Create references for the clock's hour, minute, and second hands
    const hourRef = useRef();
    const minuteRef = useRef();
    const secondRef = useRef();

    // useFrame runs on every frame to update the clock hands in real-time
    useFrame(() => {
        // Get the current time
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();

        // Calculate smooth seconds and minutes by adding fractions of milliseconds
        const smoothSeconds = seconds + milliseconds / 1000;
        const smoothMinutes = minutes + smoothSeconds / 60;
        const smoothHours = hours + smoothMinutes / 60;

        // Rotate the second hand based on the smooth second value
        if (secondRef.current) {
            secondRef.current.rotation.z = THREE.MathUtils.degToRad(
                6 * smoothSeconds // 6 degrees per second
            );
        }

        // Rotate the minute hand based on the smooth minute value
        if (minuteRef.current) {
            minuteRef.current.rotation.z = THREE.MathUtils.degToRad(
                6 * smoothMinutes // 6 degrees per minute
            );
        }

        // Rotate the hour hand based on the smooth hour value
        if (hourRef.current) {
            hourRef.current.rotation.z = THREE.MathUtils.degToRad(
                30 * smoothHours // 30 degrees per hour
            );
        }
    });

    // Render the clock hands as 3D mesh objects, with references for rotation
    return (
        <>
            {/* Minute hand */}
            <mesh
                geometry={nodes.clockMinute.geometry} // Geometry for the minute hand
                position={nodes.clockMinute.position} // Position for the minute hand
                rotation={[0, 0, 0]} // Initial rotation
                ref={minuteRef} // Reference to manipulate the rotation in useFrame
            >
                <meshBasicMaterial color={'#000000'} /> {/* Material for the minute hand */}
            </mesh>

            {/* Second hand */}
            <mesh
                geometry={nodes.clockSecond.geometry} // Geometry for the second hand
                position={nodes.clockSecond.position} // Position for the second hand
                rotation={[0, 0, 0]} // Initial rotation
                ref={secondRef} // Reference to manipulate the rotation in useFrame
            >
                <meshBasicMaterial color={'#000000'} /> {/* Material for the second hand */}
            </mesh>

            {/* Hour hand */}
            <mesh
                geometry={nodes.clockHour.geometry} // Geometry for the hour hand
                position={nodes.clockHour.position} // Position for the hour hand
                rotation={[0, 0, 0]} // Initial rotation
                ref={hourRef} // Reference to manipulate the rotation in useFrame
            >
                <meshBasicMaterial color={'#000000'} /> {/* Material for the hour hand */}
            </mesh>
        </>
    );
});

export default Clock;

// Preload the clock GLTF model to improve performance
useGLTF.preload('./assets/models/clock.glb');
