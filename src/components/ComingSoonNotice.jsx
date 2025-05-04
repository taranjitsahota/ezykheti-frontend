// src/components/ComingSoonNotice.jsx
import { useState } from "react";

const ComingSoonNotice = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed bottom-140 right-4 max-w-xs bg-yellow-100 text-yellow-900 border border-yellow-300 shadow-lg p-4 rounded-xl z-50">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">🚧 Coming Soon!</p>
          <p className="text-sm">We’re working on something awesome. This website is under development. Starting the Services Very soon.</p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-yellow-900 hover:text-yellow-700 ml-2"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default ComingSoonNotice;
