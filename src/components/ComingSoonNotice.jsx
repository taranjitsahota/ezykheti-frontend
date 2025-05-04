// src/components/ComingSoonNotice.jsx
import { useState } from "react";

const ComingSoonNotice = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[90%] sm:w-80 bg-yellow-100 text-yellow-900 border border-yellow-300 shadow-lg p-4 rounded-xl z-50">
      <div className="flex justify-between items-start space-x-2">
        <div className="text-sm sm:text-base">
          <p className="font-semibold text-base sm:text-lg">🚧 Coming Soon!</p>
          <p className="text-sm">
            We’re working on something awesome. This website is under development. Starting the services very soon.
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-yellow-900 hover:text-yellow-700 text-lg"
          aria-label="Close"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default ComingSoonNotice;
