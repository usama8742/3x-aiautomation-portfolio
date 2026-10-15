import React, { useEffect, useRef } from 'react';
import { animate, scroll } from 'motion';
export default function ScrollProgress() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!progressBarRef.current) return;

    // Use motion's scroll() and animate() to smoothly bind page scroll to progress bar width
    const controls = scroll(
      animate(progressBarRef.current, { scaleX: [0, 1] }, { ease: "linear" })
    );

    return () => {
      controls();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left">
      <div 
        ref={progressBarRef}
        className="h-full w-full bg-gradient-to-r from-[#FE330A] via-[#FF7A4D] to-[#D62705] shadow-[0_0_10px_rgba(254,51,10,0.5)] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
