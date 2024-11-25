import React, {useEffect, useRef, useState} from 'react';
import "./cameraComponent.css";
import switchCameraImage from "../assets/switch-camera.svg";
import backButtonImage from "../assets/back.svg";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const CameraComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const isSwitchingCamera = useRef<boolean>(false);
  const streamCamera = useRef<string | null>(null);
  const [currentCamera, setCurrentCamera] = useState<'user' | 'environment'>('user');
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {taskId} = useParams()

  const startCamera = async (facingMode: string) => {
    if (isSwitchingCamera.current) {
      return;
    }

    if (facingMode !== streamCamera.current) {
      isSwitchingCamera.current = true;
      streamCamera.current = facingMode;
      if (stream.current) {
        stream.current?.getTracks().forEach(track => track.stop());
      }

      navigator.mediaDevices.getUserMedia({video: {facingMode: facingMode}}).then((_stream) => {
        stream.current = _stream;

        if (videoRef.current) {
          const video = videoRef.current as HTMLVideoElement;
          video.srcObject = _stream;
        }
      }).catch((error) => {
        toast("Error accessing camera: " + error.message, {
          type: "error"
        })
      }).finally(() => {
        isSwitchingCamera.current = false;
      })
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

        setIsUploading(true)

        // TODO send image to server
        const uploadPromise = fetch("/api/classify", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "imageDataUrl": image,
            "taskId": taskId
          })
        }).then(async response => {
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            navigate('/', {state: {data}})
          } else {
            const error = await response.json();
            toast("Error: " + error.message, {
              type: "error"
            })

            navigate('/')
          }
        }).catch(error => {
          toast("Error: " + error.message, {
            type: "error"
          })

          navigate('/')
        }).finally(() => {
          setIsUploading(false)
        })

        toast.promise(uploadPromise, {
          success: "Image uploaded successfully!",
          pending: "Uploading image...",
        })
      }
    }
  };

  const switchCamera = () => {
    setCurrentCamera(prevCamera => prevCamera === 'user' ? 'environment' : 'user');
  };

  const goBack = () => {
    navigate('/')
  }

  useEffect(() => {
    startCamera(currentCamera === 'user' ? 'user' : 'environment');

    return () => {
      if (stream.current) {
        stream.current?.getTracks().forEach(track => track.stop());
      }
    }
  }, [currentCamera]);

  return (
    <div className="cameraComponent">
      <button onClick={switchCamera} className="cameraComponent__switch_button">
        <img src={switchCameraImage} alt="Switch Camera"
             className="cameraComponent__switch_button__image"/>
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
