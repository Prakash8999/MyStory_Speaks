import React from 'react';

const CircularProgressBar = ({ size = 50, progress, strokeWidth = 8, circleOneStroke = "lightgrey", circleTwoStroke = "bg-textBlue" }) => {
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  // How much of the circle should be filled
  const progressStroke = ((100 - progress) / 100) * circumference;

  return (
    <div className='relative'>
      <svg width={size} height={size} className="circular-progress-bar">
        <circle
          className="progress-bar-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          fill="transparent"
        />
        <circle
          className="progress-bar stroke-textBlue"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          strokeDasharray={circumference}
          strokeDashoffset={progressStroke}
          fill="transparent"
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xs font-medium'>{progress}%</p>
    </div>
  );
};

export default CircularProgressBar;
