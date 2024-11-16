import React, {useEffect, useRef} from 'react';
import "./cameraComponent.css"
import switchCameraImage from "../assets/switch_camera.png"

const CameraComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({video: true});
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
        console.log(image)
      }
    }
  };

  useEffect(() => {
    startCamera();
  }, [])

  return (
    <div className="cameraComponent">
      <video ref={videoRef} autoPlay className="cameraComponent__video"/>

      <button onClick={takePhoto} className="cameraComponent__capture_button"></button>
    </div>
  );
};

export default CameraComponent;
