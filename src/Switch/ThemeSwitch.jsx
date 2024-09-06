import { a } from '@react-spring/three';
import { meshBounds } from '@react-three/drei';
import { useCallback, useEffect, useState } from 'react';

// Component for switching themes
export default function ThemeSwitch({ x, set, nodes }) {
    const [hovered, setHover] = useState(false); // State to track hover status

    // Update cursor style based on hover status
    useEffect(
        () => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'),
        [hovered]
    );

    // Toggle the theme when the switch is clicked
    const onClick = useCallback(() => set((toggle) => Number(!toggle)), [set]);

    // Handle pointer events
    const onPointerOver = useCallback(() => setHover(true), []);
    const onPointerOut = useCallback(() => setHover(false), []);

    // Animation properties based on 'x' value
    const pZ = x.to([0, 1], [0.1, 0.6]); // z-position animation
    const rX = x.to([0, 1], [0, Math.PI * 1.3]); // x-rotation animation

    return (
        <>
            {/* Animated group for the theme switch */}
            <a.group position-z={pZ}>
                {/* Animated mesh for the switch */}
                <a.mesh
                    geometry={nodes.Sphere.geometry} // Mesh geometry
                    position={nodes.Sphere.position} // Position of the mesh
                    rotation={nodes.Sphere.rotation} // Rotation of the mesh
                    raycast={meshBounds} // Use mesh bounds for raycasting
                    onClick={onClick} // Handle click event
                    rotation-x={rX} // Animation for x-rotation
                    onPointerOver={onPointerOver} // Handle pointer over event
                    onPointerOut={onPointerOut} // Handle pointer out event
                    castShadow={true} // Enable shadow casting
                    receiveShadow={true} // Enable shadow receiving
                >
                    <meshBasicMaterial color={'#e8f8ff'} /> {/* Material for the mesh */}
                </a.mesh>
            </a.group>

            {/* Static mesh for the switch bounds */}
            <mesh
                geometry={nodes.switchBound.geometry} // Mesh geometry
                position={nodes.switchBound.position} // Position of the mesh
                rotation={nodes.switchBound.rotation} // Rotation of the mesh
                castShadow={true} // Enable shadow casting
                receiveShadow={true} // Enable shadow receiving
            >
                <meshBasicMaterial color={'#131313'} /> {/* Material for the mesh */}
            </mesh>
        </>
    );
}
