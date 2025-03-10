// Background.js
import React from "react";

const Background = () => {
  return (
    <>
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] bg-blue-200 rounded-full w-40 h-40 opacity-50 blur-md"></div>
      <div className="absolute bottom-[-10%] right-[-10%] bg-red-200 rounded-full w-40 h-40 opacity-50 blur-md"></div>
      <div className="absolute top-[10%] right-[10%] bg-green-200 rounded-full w-20 h-20 opacity-50 blur-md"></div>
      <div className="absolute bottom-[10%] left-[10%] bg-yellow-200 rounded-full w-20 h-20 opacity-50 blur-md"></div>

      {/* Medical-Themed Random Background Elements */}
      {Array.from({ length: 60 }).map((_, index) => {
        const symbols = ["😰", "🧑‍⚕️", "💪", "🧠", "🫁", "🫀", "🗣️", "🩺", "⏱"]; // Medical symbols
        const randomSymbol =
          symbols[Math.floor(Math.random() * symbols.length)];
        const fixedSize = "text-5xl"; // Fixed size for symbols
        const fixedOpacity = "opacity-10"; // Fixed transparency level
        const randomRotation = Math.floor(Math.random() * 360); // Rotation between 0 and 360 degrees
        const randomTop = Math.random() * 100; // Top position (percentage)
        const randomLeft = Math.random() * 100; // Left position (percentage)
        const randomColor = ["text-blue-500", "text-green-500", "text-red-500"][Math.floor(Math.random() * 3)]; // Random color

        return (
          <div
            key={index}
            className={`absolute ${randomColor} ${fixedSize} ${fixedOpacity} transform`}
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
              transform: `rotate(${randomRotation}deg)`,
            }}
          >
            {randomSymbol}
          </div>
        );
      })}
    </>
  );
};

export default Background;
