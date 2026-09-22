import { useRef, useState, useEffect } from 'react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg', 0.7);
    setCapturedImage(imageData);

    stopCamera();
    onCapture(imageData);
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full max-w-sm">
      {!capturedImage ? (
        <>
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-900">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={captureSelfie}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Capture Selfie
          </button>
        </>
      ) : (
        <>
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={retake}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
          >
            Retake
          </button>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;