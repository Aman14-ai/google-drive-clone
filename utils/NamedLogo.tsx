'use client'
import React from 'react';

const NamedLogo = () => {
  return (
    <div className='flex justify-center items-center -mt-5 mb-3'>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 500 150" 
        className="aman-logo"
        aria-label="Aman"
        style={{ width: '180px', height: 'auto' }}
      >
        <style jsx>{`
          .aman-logo {
            font-family: 'Arial', sans-serif;
            overflow: visible;
          }
          
          .letter-a {
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: draw 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          }
          
          .letter-m {
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 250;
            stroke-dashoffset: 250;
            animation: draw 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.4s;
          }
          
          .letter-a2 {
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: draw 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.8s;
          }
          
          .letter-n {
            fill: none;
            stroke: #ffffff;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 180;
            stroke-dashoffset: 180;
            animation: draw 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards 1.2s;
          }
          
          .dot {
            fill: #ff6b9d;
            opacity: 0;
            transform-origin: center;
            filter: drop-shadow(0 0 5px rgba(255,107,157,0.7));
            animation: 
              fadeIn 0.6s ease-out forwards 2.4s,
              pulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1) 3s;
          }
          
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.15);
              opacity: 0.8;
            }
          }
        `}</style>
        
        {/* Background rectangle for better contrast */}
        <rect width="500" height="150" fill="transparent" />
        
        {/* Letter A */}
        <path 
          className="letter-a" 
          d="M50,110 V50 L90,10 L130,50 V110 M90,50 V80"
        />
        
        {/* Letter M */}
        <path 
          className="letter-m" 
          d="M150,110 V50 L190,80 L230,50 V110"
        />
        
        {/* Letter A */}
        <path 
          className="letter-a2" 
          d="M250,110 V50 L290,10 L330,50 V110 M290,50 V80"
        />
        
        {/* Letter N */}
        <path 
          className="letter-n" 
          d="M350,110 V50 L390,110 M390,110 V50"
        />
        
        {/* Animated Dot */}
        <circle 
          className="dot" 
          cx="440" 
          cy="80" 
          r="12"
        />
      </svg>
    </div>
  );
};

export default NamedLogo;