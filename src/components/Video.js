import React from 'react'
import './Posts.css';
import ReactDOM from 'react-dom';

function Video(props) {
    const handleMute=(e)=>{
        e.preventDefault();
        e.target.muted=!e.target.muted;
    }
    const handleAutoScroll= (e)=>{
        try{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        console.log(2);
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
            <video onEnded={handleAutoScroll} src={props.source} className="video-styles" controls onClick={handleMute} muted="muted" type="videos/mp4" ></video>
        </>
    )
}

export default Video