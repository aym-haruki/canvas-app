import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import image1 from "./images/IMG_4351.PNG";
import image2 from "./images/IMG_4352.PNG";
import image3 from "./images/IMG_4353.PNG";
import image4 from "./images/IMG_4354.PNG";
import image5 from "./images/IMG_4355.PNG";
import image6 from "./images/IMG_4356.PNG";
import image7 from "./images/IMG_4021.PNG";
import image8 from "./images/IMG_4367.PNG";
import image10 from "./images/IMG_4368.PNG";
import image11 from "./images/IMG_4369.PNG";
import image12 from "./images/IMG_4370.PNG";
import image13 from "./images/IMG_4371.PNG";

function CanvasComponent() {
  const canvasRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const canvasWidth = 810;
  const canvasHeight = 570;
  const imageList = [
    {
      "altName": 'Draggable Image 12',
      "image": image12,
      "width": 300
    },
    {
      "altName": 'Draggable Image 13',
      "image": image13,
      "width": 200
    },
    {
      "altName": 'Draggable Image 1s',
      "image": image1,
      "width": 100
    },
    {
      "altName": 'Draggable Image 2',
      "image": image2,
      "width": 100
    },
    {
      "altName": 'Draggable Image 3',
      "image": image3,
      "width": 200
    },
    {
      "altName": 'Draggable Image 4',
      "image": image4,
      "width": 100
    },
    {
      "altName": 'Draggable Image 5',
      "image": image5,
      "width": 100
    },
    {
      "altName": 'Draggable Image 6',
      "image": image6,
      "width": 100
    },
    {
      "altName": 'Draggable Image 7',
      "image": image7,
      "width": 200
    },
    {
      "altName": 'Draggable Image 8',
      "image": image8,
      "width": 300
    },
    {
      "altName": 'Draggable Image 10',
      "image": image10,
      "width": 100
    },
    {
      "altName": 'Draggable Image 11',
      "image": image11,
      "width": 100
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
          <img src={item.image} alt={item.altName} width={item.width} className="image" />
      </Draggable>
    );
  });

  const handleExportClick = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // すべての画像をキャンバスに描画
    images.forEach((image) => {
      ctx.drawImage(image.img, image.x, image.y);
    });

    // キャンバスの内容をエクスポート
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'exported_image.png';
    a.click();
};

  return (
    <div className="container">
      <div className="canvas-section">
        <canvas 
          ref={canvasRef} 
          width={canvasWidth} 
          height={canvasHeight} 
          onDrop={handleDrop}
          className="canvas canvas-background canvas-border"
          ></canvas>
      </div>

      <button onClick={handleExportClick}>Export as Image</button>

      <div className="image-container bg-image-container">
        {imageItems}
      </div>
    </div>
  );
}

export default CanvasComponent;

