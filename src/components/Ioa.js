import React,{useEffect,useState} from 'react'
import vid1 from "../videos/1.mp4";
import vid2 from "../videos/2.mp4";
import vid3 from "../videos/3.mp4";
import Videos from './Videos';
import './video.css';
import Navbar from './Navbar';
function Ioa() {
    const callback=entries=>{
        entries.forEach(element => {
            // console.log(element);
            let vidElement=element.target.childNodes[0];
            console.log(vidElement);
            vidElement.play().then(()=>{
                if(!vidElement.paused && !element.isIntersecting){
                    vidElement.pause();
                }
            })
        });
    }
    const[sources,setVid]=useState([{url:vid1},{url:vid2},{url:vid3}])
    const observer= new IntersectionObserver(callback,{
        threshold:0.9
    })
    useEffect(()=>{
        let data=document.querySelectorAll(".video-container");
        data.forEach((e)=>{
            observer.observe(e);
        })
    },[])
    return (
        <>
        {
            sources.map(function(e) {
                return <div key={e.url} className="video-container">
                    <Videos source={e.url}></Videos>
                </div> 
            })
        }
        </>
        )
}

export default Ioa
