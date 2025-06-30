import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-md shadow-sm bg-white">
      <div className={`w-3 h-3 ${color} rounded-full`} />
      
      <div>
        <p className="text-xs md:text-[14px] text-gray-500">
          {label}
        </p>
        <span className="text-sm md:text-[15px] text-black font-semibold">
          {value}
        </span>
      </div>

      <div className="text-xl md:text-2xl text-gray-600 ml-auto">
        {icon}
      </div>
    </div>
  );
};

export default InfoCard;
