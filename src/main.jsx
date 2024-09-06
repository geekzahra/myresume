import './style.css'; // CSS for global styling

import { Leva } from 'leva'; // Leva for UI controls
import ReactDOM from 'react-dom/client'; // ReactDOM for rendering the React application

import Experience from './Experience.jsx'; // Main experience component

const root = ReactDOM.createRoot(document.querySelector('#root')); // Create a root for React to render into

root.render(
    <>
        <Experience /> {/* Render the main experience component */}
        <Leva collapsed /> {/* Render Leva UI controls, collapsed by default */}
    </>
);
