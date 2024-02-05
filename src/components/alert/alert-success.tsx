import React from 'react';

interface SuccessAlertProps {
    msg: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ msg }) => {
  return (
    <div className="from-lime-700 to-lime-900 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10">
      {msg}
    </div>
  );
};

export default SuccessAlert;
