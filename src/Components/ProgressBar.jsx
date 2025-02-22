import React, { useState } from "react";
import { useEffect } from "react";

// import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ data }) => {
  const [prgress, setProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setProgress(data);
    }, 100);
  }, [data]);
  return (
    <div className="text-center">
      <div className=" m-1 border  border-black rounded-md overflow-hidden">
        <div
          className="bg-purple-500 transition-all duration-500 ease-in"
          style={{ width: `${prgress}%` }}
          role="progressbar"
          aria-valuenow={ProgressBar}
          aria-valuemax={100}
          aria-valuemin={0}
        >
          {data}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
