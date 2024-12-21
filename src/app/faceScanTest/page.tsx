'use client';

import { useRef, useState, useEffect } from 'react';

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
