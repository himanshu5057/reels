import React from 'react'
import './video.css'
function Videos(props) {
    const handleMute=(e)=>{
        e.preventDefault();
        e.target.muted= !e.target.muted;
    }
    return (
        <>
            <video className="video-styles" onClick={handleMute} controls muted="muted" type="video/mp4" src={props.source}>
                <source src={props.source}></source>
            </video>
        </>
    )
}

export default Videos
