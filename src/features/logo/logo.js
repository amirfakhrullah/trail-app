import React from 'react';
import './logo.css';
import trailicon from '../../t.png';

export default function Logo() {
    return (
        <div className="logoFeature">
            <div className="logoFeatureContainer">
                <img src={trailicon} alt='logo' />
            </div>
        </div>
    )
}
