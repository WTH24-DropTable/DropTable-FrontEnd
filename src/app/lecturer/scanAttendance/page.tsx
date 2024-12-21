'use client';

import { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

interface ReferenceFace {
  name: string;
  imagePath: string;
}

const runFacialRecognition = async (
  videoElement: HTMLVideoElement,
  canvasElement: HTMLCanvasElement
) => {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    faceapi.nets.ageGenderNet.loadFromUri('../models'),
  ]);

  const fetchReferenceFaces = async (): Promise<ReferenceFace[]> => {
    const response = await fetch('http://localhost:8080/api/users/profilepic');
    const data = await response.json();
    return data.links;
  };

  const referenceFaces = await fetchReferenceFaces();

  const labeledFaceDescriptors = await Promise.all(
    referenceFaces.map(async (refFace: ReferenceFace) => {
      const img = await faceapi.fetchImage(refFace.imagePath);
      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();
      return new faceapi.LabeledFaceDescriptors(
        refFace.name,
        detections.map((d) => d.descriptor)
      );
    })
  );

  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  faceapi.matchDimensions(canvasElement, {
    width: videoElement.videoWidth,
    height: videoElement.videoHeight,
  });

  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

  const detectFaces = async () => {
    const facesToCheckAiData = await faceapi
      .detectAllFaces(videoElement)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedResults = faceapi.resizeResults(facesToCheckAiData, {
      width: videoElement.videoWidth,
      height: videoElement.videoHeight,
    });

    const context = canvasElement.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }

    resizedResults.forEach((face) => {
      const { detection, descriptor } = face;
      const bestMatch = faceMatcher.findBestMatch(descriptor);
      const label = bestMatch.toString();
      const distance = bestMatch.distance;

      if (distance <= 0.40) {
        const drawBox = new faceapi.draw.DrawBox(detection.box, { label });
        console.log(label)
        drawBox.draw(canvasElement);
      }
    });

    requestAnimationFrame(detectFaces);
  };

  detectFaces();
};

const CameraPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    if (isCameraOn) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;

            videoRef.current.onloadedmetadata = () => {
              if (videoRef.current && canvasRef.current) {
                runFacialRecognition(videoRef.current, canvasRef.current);
              }
            };
          }
        } catch (err) {
          console.error('Error accessing the camera:', err);
        }
      };

      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream)?.getTracks();
        tracks.forEach((track: MediaStreamTrack) => track.stop());
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream)?.getTracks();
        tracks.forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }, [isCameraOn]);

  return (
    <div className="relative w-full h-screen font-barlow">
      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-white text-2xl text-center mt-4">Align your face within the circle</p>
      </div>

      {/* Darkened and Blurred Background */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div
          className="relative rounded-full z-10 h-[75vh] w-[75vh]"
          style={{ outline: '10000px solid rgba(0,0,0,0.8)' }}
        >
        </div>

      </div>

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={() => setIsCameraOn((prev) => !prev)}
          className={`px-6 py-3 text-white font-bold rounded-md shadow-md transition-all ${
            isCameraOn ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow hover:bg-feb041'
          }`}
        >
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
      </div>
    </div>
  );
};

export default CameraPage;
