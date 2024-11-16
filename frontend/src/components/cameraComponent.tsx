import React, {useEffect, useRef, useState} from 'react';
import "./cameraComponent.css";
import switchCameraImage from "../assets/switch-camera.svg";
import backButtonImage from "../assets/back.svg";
import {useNavigate} from "react-router-dom";

const CameraComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentCamera, setCurrentCamera] = useState<'user' | 'environment'>('user');
  const navigate = useNavigate();

  const startCamera = async (cameraType: 'user' | 'environment' = 'user') => {
    const stream = await navigator.mediaDevices.getUserMedia({video: { facingMode: cameraType }});
    if (videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      video.srcObject = stream;
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const image = canvas.toDataURL('image/png');
        console.log(image);
      }
    }
  };

  const switchCamera = () => {
    setCurrentCamera(prevCamera => prevCamera === 'user' ? 'environment' : 'user');
  };

  const goBack = () => {
    navigate('/tasks')
  }

  useEffect(() => {
    startCamera(currentCamera);
  }, [currentCamera]);

  return (
    <div className="cameraComponent">
      <button onClick={switchCamera} className="cameraComponent__switch_button">
        <img src={switchCameraImage} alt="Switch Camera" className="cameraComponent__switch_button__image"/>
      </button>

      <button onClick={goBack} className="cameraComponent__back_button">
        <img src={backButtonImage} alt="Switch Camera"
             className="cameraComponent__back_button__image"/>
      </button>

      <video ref={videoRef} autoPlay className="cameraComponent__video"/>
      <button onClick={takePhoto} className="cameraComponent__capture_button"></button>
    </div>
  );
};

export default CameraComponent;
