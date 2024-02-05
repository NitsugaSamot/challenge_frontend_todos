import React from 'react';

interface AlertProps {
    msg: string;
    error: boolean;
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-lime-700 to-lime-900'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}>
      {alert.msg}
    </div>
  );
};

export default Alert;
