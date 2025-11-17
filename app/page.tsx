'use client';
import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import ConsoleBox from "./Components/ConsoleBox";
import Buckets from './Components/Buckets';

export default function Home() {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const generateCode = () => {
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters[Math.floor(Math.random() * characters.length)];
    }
    return code;
  };

  const randomCode1 = generateCode();
  const randomCode2 = generateCode();

  useEffect(() => {
    // Try to autoplay immediately
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setHasInteracted(true))
        .catch(error => {
          console.log("Autoplay prevented, waiting for user interaction");
        });
    }

    // Play on any user interaction
    const handleInteraction = () => {
      if (audioRef.current && !hasInteracted) {
        audioRef.current.play()
          .then(() => setHasInteracted(true))
          .catch(err => console.log("Play failed:", err));
      }
    };

    // Listen for various interaction events
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  return (
    <div className="relative min-h-screen font-sans w-full crt-container">
      {/* Enhanced CRT Effects CSS */}
      <style jsx>{`
        @keyframes flicker {
          0% { opacity: 0.27861; }
          5% { opacity: 0.34769; }
          10% { opacity: 0.23604; }
          15% { opacity: 0.90626; }
          20% { opacity: 0.18128; }
          25% { opacity: 0.83891; }
          30% { opacity: 0.65583; }
          35% { opacity: 0.67807; }
          40% { opacity: 0.26559; }
          45% { opacity: 0.84693; }
          50% { opacity: 0.96019; }
          55% { opacity: 0.08594; }
          60% { opacity: 0.20313; }
          65% { opacity: 0.71988; }
          70% { opacity: 0.53455; }
          75% { opacity: 0.37288; }
          80% { opacity: 0.71428; }
          85% { opacity: 0.70419; }
          90% { opacity: 0.7003; }
          95% { opacity: 0.36108; }
          100% { opacity: 0.24387; }
        }

        @keyframes textShadow {
          0% {
            text-shadow: 
              0.4389924193300864px 0 1px rgba(0,30,255,0.5),
              -0.4389924193300864px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          5% {
            text-shadow: 
              2.7928974010788217px 0 1px rgba(0,30,255,0.5),
              -2.7928974010788217px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          10% {
            text-shadow: 
              0.02956275843481219px 0 1px rgba(0,30,255,0.5),
              -0.02956275843481219px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          15% {
            text-shadow: 
              0.40218538552878136px 0 1px rgba(0,30,255,0.5),
              -0.40218538552878136px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          20% {
            text-shadow: 
              3.4794037899852017px 0 1px rgba(0,30,255,0.5),
              -3.4794037899852017px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          25% {
            text-shadow: 
              1.6125630401149584px 0 1px rgba(0,30,255,0.5),
              -1.6125630401149584px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          30% {
            text-shadow: 
              0.7015590085143956px 0 1px rgba(0,30,255,0.5),
              -0.7015590085143956px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          35% {
            text-shadow: 
              3.896914047650351px 0 1px rgba(0,30,255,0.5),
              -3.896914047650351px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          40% {
            text-shadow: 
              3.870905614848819px 0 1px rgba(0,30,255,0.5),
              -3.870905614848819px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          45% {
            text-shadow: 
              2.231056963361899px 0 1px rgba(0,30,255,0.5),
              -2.231056963361899px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          50% {
            text-shadow: 
              0.08084290417898504px 0 1px rgba(0,30,255,0.5),
              -0.08084290417898504px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          55% {
            text-shadow: 
              2.3758461067427543px 0 1px rgba(0,30,255,0.5),
              -2.3758461067427543px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          60% {
            text-shadow: 
              2.202193051050636px 0 1px rgba(0,30,255,0.5),
              -2.202193051050636px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          65% {
            text-shadow: 
              2.8638780614874975px 0 1px rgba(0,30,255,0.5),
              -2.8638780614874975px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          70% {
            text-shadow: 
              0.48874025155497314px 0 1px rgba(0,30,255,0.5),
              -0.48874025155497314px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          75% {
            text-shadow: 
              1.8948491305757957px 0 1px rgba(0,30,255,0.5),
              -1.8948491305757957px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          80% {
            text-shadow: 
              0.0833037308038857px 0 1px rgba(0,30,255,0.5),
              -0.0833037308038857px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          85% {
            text-shadow: 
              0.09769827255241735px 0 1px rgba(0,30,255,0.5),
              -0.09769827255241735px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          90% {
            text-shadow: 
              3.443339761481782px 0 1px rgba(0,30,255,0.5),
              -3.443339761481782px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          95% {
            text-shadow: 
              2.1841838852799786px 0 1px rgba(0,30,255,0.5),
              -2.1841838852799786px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
          100% {
            text-shadow: 
              2.6208764473832513px 0 1px rgba(0,30,255,0.5),
              -2.6208764473832513px 0 1px rgba(255,0,80,0.3),
              0 0 3px;
          }
        }

        /* Apply chromatic aberration to all text */
        .crt-container * {
          animation: textShadow 1.6s infinite;
        }

        .crt-overlay {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
        }

        /* Scanlines - horizontal lines only */
        .crt-overlay::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: flicker 0.15s infinite;
        }

        /* RGB Pixel grid overlay */
        .crt-pixels {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9998;
          background: 
            repeating-linear-gradient(
              90deg,
              rgba(255, 0, 0, 0.03),
              rgba(255, 0, 0, 0.03) 1px,
              rgba(0, 255, 0, 0.02) 1px,
              rgba(0, 255, 0, 0.02) 2px,
              rgba(0, 0, 255, 0.03) 2px,
              rgba(0, 0, 255, 0.03) 3px
            );
        }

        /* Screen curvature and vignette */
        .crt-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9997;
          box-shadow: 
            inset 0 0 150px rgba(0, 0, 0, 0.8),
            inset 0 0 50px rgba(0, 0, 0, 0.5);
          border-radius: 2%;
        }

        /* Stronger glow */
        .crt-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9996;
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(12, 236, 247, 0.05) 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }

        /* Slight screen distortion */
        .crt-container {
          position: relative;
        }

        .crt-container::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9995;
          background: 
            radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%);
        }
      `}</style>

      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/audio/musicofwellness.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/background.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top section */}
      <div className="w-full flex flex-row justify-between items-center px-4 mt-2">
        {/* Left: Logo + Title + Line + Complete */}
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-4">
            <img src="/images/logo.svg" alt="Lumon logo" className="w-20 h-20" />
            <h1 className="text-[#0CECF7] font-semibold">Dranesville</h1>
          </div>
          {/* line + complete box */}
          <div className="flex flex-row items-end mt-[-20px]">
            <div className="w-3/12 h-[1px] bg-[#0CECF7] rounded-full"></div>
            <div className="w-30 h-8 rounded-full flex items-center justify-center border-[1px] border-[#0CECF7] ml-[-15px]">
              <p className="text-[13px] text-[#0CECF7]">33% Complete</p>
            </div>
          </div>
        </div>

        {/* Right: random codes */}
        <div className="flex flex-row items-center gap-2">
          <p className="text-[#0CECF7] text-[12px]">{randomCode1}</p>
          <p className="text-[#BBE9C7] text-[12px]">{randomCode2}</p>
        </div>
      </div>

      {/* console */}
      <div className="mt-10 px-4 ">
        <ConsoleBox />
      </div>

      {/* buckets */}
      <div className="flex justify-center w-full mt-10 ">
        <Buckets />
      </div>

      {/* CRT Effects - rendered last so they're on top */}
      <div className="crt-glow"></div>
      <div className="crt-screen"></div>
      <div className="crt-pixels"></div>
      <div className="crt-overlay"></div>
    </div>
  );
}