
import React from 'react';
import { useSpring, animated } from 'react-spring';

const Welcome = () => {
  const notebookAnimation = useSpring({
    from: { transform: 'translateX(-100px) rotate(0deg)', opacity: 0 },
    to: { transform: 'translateX(0) rotate(360deg)', opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div className="container welcome-container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card welcome-content">
            <div className="card-body text-center">
            <h2 className="card-title">Welcome to Our Appointment Scheduling Page</h2>
              <p className="card-text welcome-message">
                Book your appointments easily and conveniently. Explore our services and find the
                perfect time that suits you.
              </p>
              <animated.img
                src="https://imgs.search.brave.com/c67nBEsp2xWy0jwjaCgJ7-l2MBiQ7dN2GY-RvtiUj1M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MDc5MjU5MjE5NTgt/OGE2MmYzZDFhNTBk/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRaOGZH/NXZkR1Z3WVdSOFpX/NThNSHg4TUh4OGZE/QT0"// Replace with your image URL
                alt="Welcome Illustration"
                className="img-fluid welcome-image"
                style={notebookAnimation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

