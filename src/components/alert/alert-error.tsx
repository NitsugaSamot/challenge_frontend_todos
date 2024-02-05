import React from 'react';

interface ErrorAlertProps {
    msg: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ msg }) => {
  return (
    <div className="from-red-400 to-red-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10">
      {msg}
    </div>
  );
};

export default ErrorAlert;
