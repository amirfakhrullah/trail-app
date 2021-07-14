/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './loading.css';
import trailicon from '../../t.png';

export default function Loading() {
    return (
        <div className="loadingPage">
            <div className="icon-container">
                <img src={trailicon} />
            </div>
        </div>
    )
}
