import React, { useState, useEffect } from "react";
import "./App.css";

const Thumbnail = ({ imageUrl, onClick }) => (
  <div className="thumbnail-container">
    <img
      src={imageUrl}
      alt="Thumbnail"
      className="thumbnail"
      onClick={onClick}
    />
  </div>
);

const NavigationBar = ({ onPrevious, onNext }) => (
  <div className="navigation-bar">
    <button className="nav-button" onClick={onPrevious}>
      Previous
    </button>
    <button className="nav-button" onClick={onNext}>
      Next
    </button>
  </div>
);

function App() {
  const [imageCount, setImageCount] = useState(1);
  const [loadedImages, setLoadedImages] = useState(30); 
  const [fullViewVisible, setFullViewVisible] = useState(false);

  const openFullView = (imageNumber) => {
    setImageCount(imageNumber);
    setFullViewVisible(true);
  };

  const closeFullView = () => {
    setFullViewVisible(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft") {
      setImageCount(Math.max(1, imageCount - 1));
    } else if (event.key === "ArrowRight") {
      setImageCount(Math.min(loadedImages, imageCount + 1));
    }
  };

  const fullViewImage = (
    <img
      src={`http://via.placeholder.com/2000x2000?text=${imageCount}`}
      alt="Full View"
      className="full-view-image"
    />
  );

  const fullViewContent = (
    <div className="full-view-content" onKeyDown={handleKeyPress}>
      <div
        className="thumbnail-arrow full-view-arrow left"
        onClick={() => setImageCount(Math.max(1, imageCount - 1))}
      >
        &lt;
      </div>
      {fullViewImage}
      <div
        className="thumbnail-arrow full-view-arrow right"
        onClick={() => setImageCount(Math.min(loadedImages, imageCount + 1))}
      >
        &gt;
      </div>
      <div
        className="download-button"
        onClick={() =>
          window.open(`http://via.placeholder.com/3900x3900?text=${imageCount}`)
        }
      >
        Download
      </div>
    </div>
  );

  const thumbnails = [];
  for (let i = 1; i <= loadedImages; i++) {
    const thumbnailUrl = `http://via.placeholder.com/200x200?text=${i}`;
    thumbnails.push(
      <Thumbnail
        key={i}
        imageUrl={thumbnailUrl}
        onClick={() => openFullView(i)}
      />
    );
  }

  const loadMoreImages = () => {
    if (loadedImages <= 30) {
      setLoadedImages(loadedImages + 30); 
    } else {
      
      setTimeout(() => {
        setLoadedImages(loadedImages + 10);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMoreImages();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadedImages]);

  return (
    <div className="App">
      <NavigationBar
        onPrevious={() => setImageCount(Math.max(1, imageCount - 1))}
        onNext={() => setImageCount(Math.min(loadedImages, imageCount + 1))}
      />
      <div className="grid-container">{thumbnails}</div>
      {fullViewVisible && (
        <div className="full-view" onClick={closeFullView} tabIndex={0}>
          {fullViewContent}
        </div>
      )}
    </div>
  );
}

export default App;
