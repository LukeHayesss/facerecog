import { useEffect } from "react";
import { useRef } from "react";
import * as faceapi from "face-api.js";
import { useState } from "react";

const NewPost = ({image}) => {
    const {url, width, height} = image;
    const [faces, setFaces] = useState([]);
    const [friends, setFriends] = useState([]);
    const imgRef = useRef();
    const canvasRef = useRef();

    const handleImage = async () => {
    const detections = await faceapi
    .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
    setFaces(detections.map(d => Object.values(d.box)));
  };

//when mouse enters image, show the boxes around the faces
const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "yellow";
    faces.map(face => ctx.strokeRect(...face))
};

  useEffect(() => {
     const loadModels = () => {
       Promise.all([
         faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
         faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
         faceapi.nets.faceExpressionNet.loadFromUri("/models"),
       ])
       .then(handleImage)
       .catch((e) => console.log(e));
     };
     imgRef.current && loadModels();
  }, []);

//add the friends info
  const addFriend = (e) => {
     setFriends(prev => ({...prev, [e.target.name] : 
     e.target.value}))
  };


    return (
        <div className="container">
            <div className="left" style={{width, height}}>
                <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />

                <canvas 
                onMouseEnter={enter} 
                ref={canvasRef} 
                width={width} 
                height={height} 
                />
                {faces.map((face, index) => (
                    <input 
                    name={`input${index}`}
                    style={{left: face[0], top: face[1] + face[3] + 6}}
                    placeholder="Tag Your Friend" 
                    key={index}
                    className="friendInput" 
                    onChange={addFriend}
                    />
                ))}
            </div>
            <div className="right">
                <h1>Share Your Post</h1>
                <input
                type="text"
                placeholder="Whatcha Thinking?"
                className="rightInput"
                />
                {friends && (
                    <span className="friends">
                       with <span className="name">{Object.values(friends) + " "}</span></span>
                )}
                <button className="rightButton">Post</button>
            </div>
        </div>
    )
}
export default NewPost;