import { shaderMaterial } from '@react-three/drei'; // Import shaderMaterial utility from drei for easier shader handling
import * as THREE from 'three'; // Import core THREE.js library for 3D elements

import fragmentShader from '../shaders/Room/fragment.glsl'; // Import custom fragment shader
import vertexShader from '../shaders/Room/vertex.glsl'; // Import custom vertex shader

// Define a custom shader material using shaderMaterial from drei
const TextureMaterial = shaderMaterial(
    {
        // Uniforms (data passed into the shaders)

        nbakedm: new THREE.Texture(), // Texture for baked normal map
        dbakedm: new THREE.Texture(), // Texture for baked diffuse map
        lightMapm: new THREE.Texture(), // Lightmap texture for simulating lighting

        NightMix: 0, // Control to blend between day and night (used in shaders)

        // Light properties for various objects in the room
        lightBoardColor: new THREE.Color('#ff2d88'), // Color of the light for the board
        lightBoardStrength: 1.35, // Intensity of the board light

        lightPcColor: new THREE.Color('#4b7eff'), // Color of the light for the PC
        lightPcStrength: 1.2, // Intensity of the PC light

        lightDeskColor: new THREE.Color('#ff7236'), // Color of the light for the desk
        lightDeskStrength: 1.55 // Intensity of the desk light
    },
    vertexShader, // Vertex shader that manipulates vertices
    fragmentShader // Fragment shader that controls the final pixel color
);

export default TextureMaterial; // Export the custom shader material
