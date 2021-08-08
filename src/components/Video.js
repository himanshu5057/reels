import React from 'react'
import './Posts.css';
import ReactDOM from 'react-dom';

function Video(props) {
    let play=false;
    const handleMute=(e)=>{
        e.preventDefault();
        
        if(e.target.paused)
            e.target.play();
        else{
            e.target.pause();
        }
        // e.target.muted=!e.target.muted;
    }
    const handleAutoScroll= (e)=>{
        try{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next)
        {
            next.scrollIntoView({behaviour:'smooth'});
            e.target.muted = true;
        }}
        catch(e){
            console.log(e);
        }
    }
    return (
        <>
            <video onEnded={handleAutoScroll} src={props.source} className="video-styles" id={props.id} onClick={handleMute} muted="muted" type="videos/mp4" ></video>
        </>
    )
}

export default Video