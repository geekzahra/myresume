import React from 'react';

// Memoized functional component to render windows with color change based on 'toggle' prop
const Windows = React.memo(({ toggle, nodes }) => {
    // Determine window color based on the 'toggle' state
    let color = !toggle ? [2, 0.8, 0.5] : [0.6, 0.8, 3];

    return (
        <>
            {/* Render the window mesh with the appropriate color */}
            <mesh
                geometry={nodes.window.geometry} // Mesh geometry for the window
                position={nodes.window.position} // Position of the window
                rotation={nodes.window.rotation} // Rotation of the window
            >
                {/* Basic material for the window with color and no tone mapping */}
                <meshBasicMaterial toneMapped={false} color={color} />
            </mesh>
        </>
    );
});

export default Windows;
