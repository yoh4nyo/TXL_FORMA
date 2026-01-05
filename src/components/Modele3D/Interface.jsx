import React, { useState } from 'react';
import './Modele3D.css';

const Interface = ({ onSwitchCamera, onToggleAnimation }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleLightToggle = () => {
        setIsDarkMode(!isDarkMode);
        onToggleAnimation('LightONOFF');
    };

    return (
        <div className="interface-overlay" id="interface">
            {/* 1. Bouton Caméra */}
            <button className="icon-btn" onClick={onSwitchCamera} data-tooltip="Changer Vue">
                <svg viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            </button>

            {/* 2. Bouton PC */}
            <button className="icon-btn" onClick={() => onToggleAnimation('Cube')} data-tooltip="PC">
                <svg viewBox="0 0 24 24">
                    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                </svg>
            </button>

            {/* 3. Bouton Lumière */}
            <button
                id="btn-light"
                className={`icon-btn ${isDarkMode ? 'dark-mode' : ''}`}
                onClick={handleLightToggle}
                data-tooltip="Ambiance"
            >
                {/* Soleil */}
                <svg className="sun" viewBox="0 0 24 24">
                    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
                </svg>
                {/* Lune */}
                <svg className="moon" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
                </svg>
            </button>
        </div>
    );
};

export default Interface;
