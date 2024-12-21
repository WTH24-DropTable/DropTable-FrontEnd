'use client';

import { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const runFacialRecognition = async (canvasElement: HTMLCanvasElement) => {
  // Load models
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.ageGenderNet.loadFromUri('./models'),
  ]);

  const referenceFaces = [
    { name: 'Hervin', imagePath: '/images/Hervin.jpg' },
    { name: 'Ethan', imagePath: '/images/Ethan.png' },
  ];
  
  const labeledFaceDescriptors = await Promise.all(
    referenceFaces.map(async (refFace) => {
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

  if (!canvasElement) {
    console.error('Canvas element not found');
    return;
  }

  // Detect faces in the canvas
  const facesToCheckAiData = await faceapi
    .detectAllFaces(canvasElement)
    .withFaceLandmarks()
    .withFaceDescriptors();

  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  const resizedResults = faceapi.resizeResults(facesToCheckAiData, canvasElement);

  resizedResults.forEach((face) => {
    const { detection, descriptor } = face;
    const label = faceMatcher.findBestMatch(descriptor).toString();

    if (label.includes('unknown')) return;

    const drawBox = new faceapi.draw.DrawBox(detection.box, { label });
    drawBox.draw(canvasElement);
  });
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

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        runFacialRecognition(canvas); // Call the function directly after capturing the photo
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Camera Page</h1>

      <button
        onClick={() => setIsCameraOn((prev) => !prev)}
        className={`px-6 py-2 text-white rounded-md shadow-md transition-all ${
          isCameraOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </button>

      <div
        className={`mt-8 ${
          isCameraOn ? 'block' : 'hidden'
        } flex flex-col items-center space-y-4`}
      >
        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md border border-gray-300 rounded-lg shadow-md"
        />

        {/* Capture Photo Button */}
        <button
          onClick={capturePhoto}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
        >
          Capture Photo
        </button>

        {/* Canvas to Display Captured Photo */}
        <canvas
            id='canvas'
            ref={canvasRef}
            width={640}
            height={480}
            className="w-full max-w-md border border-gray-300 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default CameraPage;