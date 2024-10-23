import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(300); // Change to imageWidth for better clarity
  const [imageHeight, setImageHeight] = useState(200); // Adding imageHeight to control both width and height
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalImages = 10;
  const baseURL = 'https://picsum.photos/';

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay((prevAutoPlay) => !prevAutoPlay);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prevFullscreen) => !prevFullscreen);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'ArrowLeft') {
      prevImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const changeTo300x200 = () => {
    setImageWidth(300);
    setImageHeight(200);
  };

  const changeTo400x200 = () => {
    setImageWidth(400);
    setImageHeight(200);
  };

  return (
    <div className={isFullscreen ? 'fullscreen' : 'container'}>
      <img
        src={`${baseURL}${imageWidth}/?image=${currentIndex}`}
        alt={`Slide ${currentIndex}`}
        style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
      />
      <p>{`Image: ${currentIndex + 1} / ${totalImages}`}</p>
      <div>
        <button onClick={prevImage} className="button-pink">Previous</button>
        <button onClick={nextImage} className="button-pink">Next</button>
        <button onClick={() => setCurrentIndex(0)} className="button-pink">Back to Start</button>
        <button onClick={() => setCurrentIndex(Math.floor(Math.random() * totalImages))} className="button-pink">Random Image</button>
        <button onClick={toggleAutoPlay} className="button-pink">
          {isAutoPlay ? 'Pause Slideshow' : 'Start Slideshow'}
        </button>
        <button onClick={toggleFullscreen} className="button-pink">
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
        <button onClick={changeTo300x200} className="button-pink">300x200</button>
        <button onClick={changeTo400x200} className="button-pink">400x200</button>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${((currentIndex + 1) / totalImages) * 100}%` }}></div>

      <div className="thumbnail">
        <img
          src={`${baseURL}${imageWidth}/?image=${(currentIndex - 1 + totalImages) % totalImages}`}
          alt="Previous Thumbnail"
          style={{ width: '50px', height: '33px' }}
          onClick={prevImage}
        />
        <img
          src={`${baseURL}${imageWidth}/?image=${(currentIndex + 1) % totalImages}`}
          alt="Next Thumbnail"
          style={{ width: '50px', height: '33px' }}
          onClick={nextImage}
        />
      </div>
    </div>
  );
};

export default Slideshow;
