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
  // Load models
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.ageGenderNet.loadFromUri('./models'),
  ]);

  console.log("Models loaded");

  const fetchReferenceFaces = async (): Promise<ReferenceFace[]> => {
    const response = await fetch('http://localhost:8080/api/users/profilepic');
    const data = await response.json();
    console.log("Reference faces fetched:", data);
    return data.links;
  };

  const referenceFaces = await fetchReferenceFaces();
  console.log("Reference faces:", referenceFaces);

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

  // Match canvas dimensions to the video
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  faceapi.matchDimensions(canvasElement, { width: videoElement.videoWidth, height: videoElement.videoHeight });

  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

  const detectFaces = async () => {
    const facesToCheckAiData = await faceapi
      .detectAllFaces(videoElement)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedResults = faceapi.resizeResults(facesToCheckAiData, { width: videoElement.videoWidth, height: videoElement.videoHeight });

    const context = canvasElement.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear canvas
    }

    resizedResults.forEach((face) => {
      const { detection, descriptor } = face;
      const label = faceMatcher.findBestMatch(descriptor).toString();

      const drawBox = new faceapi.draw.DrawBox(detection.box, { label });
      drawBox.draw(canvasElement);
    });

    requestAnimationFrame(detectFaces); // Continue detecting in a loop
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

            // Wait for the video to load metadata before starting facial recognition
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
        } flex flex-col items-center space-y-4 relative`}
      >
        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md border border-gray-300 rounded-lg shadow-md"
        />

        {/* Overlay Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full border border-gray-300 rounded-lg shadow-md pointer-events-none"
        />
      </div>
    </div>
  );
};

export default CameraPage;