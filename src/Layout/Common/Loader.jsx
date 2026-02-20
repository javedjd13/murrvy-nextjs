import React, { useEffect, useState } from "react";

const StarterLoader = ({ gif = "/assets/images/gif/340 (1).gif", duration = 1000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [show, duration]);

  return (
    <>
      {show && (
        <div
          className="gif-loader"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            zIndex: 9999,
          }}
        >
          <img src={gif} alt="loading..." style={{ width: 120, height: 120 }} />
        </div>
      )}
    </>
  );
};

export default StarterLoader;
