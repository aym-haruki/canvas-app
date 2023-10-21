import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import image1 from "./images/IMG_4351.PNG";
import image2 from "./images/IMG_4352.PNG";
import image3 from "./images/IMG_4353.PNG";
import image4 from "./images/IMG_4354.PNG";
import image5 from "./images/IMG_4355.PNG";
import image6 from "./images/IMG_4356.PNG";
import image7 from "./images/IMG_4021.PNG";
import image8 from "./images/IMG_4012.PNG";

function CanvasComponent() {
  const canvasRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const canvasWidth = 800;
  const canvasHeight = 600;
  const imageList = [
    {
      "altName": 'Draggable Image 1s',
      "image": image1
    },
    {
      "altName": 'Draggable Image 2',
      "image": image2
    },
    {
      "altName": 'Draggable Image 3',
      "image": image3
    },
    {
      "altName": 'Draggable Image 4',
      "image": image4
    },
    {
      "altName": 'Draggable Image 5',
      "image": image5
    },
    {
      "altName": 'Draggable Image 6',
      "image": image6
    },
    {
      "altName": 'Draggable Image 7',
      "image": image7
    },
    {
      "altName": 'Draggable Image 8',
      "image": image8
    },
    {
      "altName": 'Draggable Image 10',
      "image": image6
    }
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      setImages(prevImages => [...prevImages, {img, x: e.clientX, y: e.clientY, scale: 1}]);
    };
    setSelectedImage(null);
  };

  const imageItems = imageList.map(item => {
    return (
      <Draggable
        onStart={() => setSelectedImage(item.image)}
        onStop={handleDrop}
      >
        <div class="image-wrapper">
          <img src={item.image} alt={item.altName} width={100} />
        </div>
      </Draggable>
    );
  });

  return (
    <div>
      <div className="container">
        <div className="left">
          {imageItems}
        </div>
        
        <div classname="right">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            onDrop={handleDrop}
            className="canvas-border canvas-background"
            ></canvas>
        </div>
      </div>

    </div>
  );
}

export default CanvasComponent;

