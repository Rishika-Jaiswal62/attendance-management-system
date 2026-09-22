import { useState } from 'react';
import CameraCapture from '../../attendance/CameraCapture';
import useGeolocation from '../../hooks/useGeolocation';
import { usePunchInMutation } from '../../features/attendance/attendanceApiSlice';

const PunchInPage = () => {
  const [selfie, setSelfie] = useState(null);
  const { locationError, loadingLocation, getLocation } = useGeolocation();
  const [punchIn, { isLoading }] = usePunchInMutation();

  const handleCapture = (imageData) => {
    setSelfie(imageData);
  };

  const handlePunchIn = async () => {
    if (!selfie) {
      alert('Please capture selfie first');
      return;
    }

    try {
      const coords = await getLocation();

      const result = await punchIn({
        selfie,
        latitude: coords.latitude,
        longitude: coords.longitude
      }).unwrap();

      alert('Punched in successfully!');
      console.log(result);
    } catch (err) {
      alert(err?.data?.message || 'Punch in failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Punch In</h2>

      <CameraCapture onCapture={handleCapture} />

      {locationError && <p className="text-red-600 text-sm mt-3">{locationError}</p>}

      {selfie && (
        <button
          type="button"
          onClick={handlePunchIn}
          disabled={isLoading || loadingLocation}
          className="mt-4 w-full max-w-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {loadingLocation ? 'Fetching location...' : isLoading ? 'Submitting...' : 'Submit Punch In'}
        </button>
      )}
    </div>
  );
};

export default PunchInPage;