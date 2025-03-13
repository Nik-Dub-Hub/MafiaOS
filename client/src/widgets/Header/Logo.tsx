import React from 'react';
import './Logo.css';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={`mafia-logo ${className || ''}`}>
            <span>Mafia<span className="os">Os</span></span>
        </div>
    );
};

export default Logo;