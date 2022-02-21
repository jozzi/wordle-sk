import { RefreshIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';

export const UpdateChecker = () => {
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    const onUpdateReady = () => setMessageVisible(true);

    window.addEventListener('updateready', onUpdateReady);

    return () => {
      window.removeEventListener('updateready', onUpdateReady);
    };
  }, []);

  const refreshPage = () => window.location.reload();

  return (
    <div
      className={`w-full px-4 cursor-pointer text-center relative box-border overflow-hidden  ${
        messageVisible ? 'top-0 h-10' : '-top-20 h-0'
      } transition-top-height duration-300`}
      style={{
        backgroundColor: '#23EDE8',
      }}
      onClick={refreshPage}
    >
      <span className="text-sm text-black inline-block my-2">
        Nová verzia je dostupná. Stlačením ju spustíte.
        <RefreshIcon className="h-6 w-6 ml-2 cursor-pointer inline" />
      </span>
    </div>
  );
};
