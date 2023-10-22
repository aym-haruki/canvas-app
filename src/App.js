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
import image9 from "./images/IMG_4012.PNG";
import image10 from "./images/IMG_4368.PNG";
import image11 from "./images/IMG_4369.PNG";
import image12 from "./images/IMG_4370.PNG";
import image13 from "./images/IMG_4371.PNG";
import bgImg from "./images/bg/bg-org.png";

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
      "altName": 'Draggable Image 9',
      "image": image9,
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
    console.log('selectedImage', selectedImage);
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      // 要素の位置とサイズを取得
      const rect = e.target.getBoundingClientRect();
      console.log(rect);

      setImages(prevImages => {
        // 既存の配列内で選択された画像と一致するものがあるかを検索
        const existingImageIndex = prevImages.findIndex(item => item.img.src === img.src);
        
        const scale = rect.width / e.target.naturalWidth;

        // 一致する画像が見つかった場合
        if (existingImageIndex !== -1) {
          // 一致する画像の情報を上書き
          const updatedImages = [...prevImages];
          updatedImages[existingImageIndex] = {
            img,
            x: e.clientX,
            y: e.clientY,
            top: rect.top,
            left: rect.left,
            scaleWidth: rect.width,
            scaleHeight: rect.height,
            scale: scale,
            rect: rect
          };
          return updatedImages;
        } else {
          // 一致する画像がない場合、新しい画像情報を配列の末尾に追加
          return [...prevImages, {
            img,
            x: e.clientX,
            y: e.clientY,
            top: rect.top,
            left: rect.left,
            scaleWidth: rect.width,
            scaleHeight: rect.height,
            scale: scale,
            rect: rect
          }];
        }
      });
    };
    console.log('img', img);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // // 1. 背景画像をロード
    const bgImage = new Image();
    bgImage.src = bgImg;
    bgImage.onload = () => {
      var pattern = ctx.createPattern(bgImage, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
  }, []); // 注意: 依存配列は空です

  const handleExportClick = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();

    // リセット 背景まで消えるので一旦コメントアウト
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // すべての画像をキャンバスに描画
    images.forEach((image) => {
      // // ドロップした画像サイズを計算
      const width = image.img.width * image.scale;
      const height = image.img.height * image.scale;

      // `ctx.drawImage(image, dx, dy, dWidth, dHeight): 画像を指定されたサイズにスケールして指定された位置に描画します。
      ctx.drawImage(image.img, image.left - rect.left, image.top - rect.top, width, height);
    });

    const currentDateTime = new Date().toLocaleString();
    ctx.font = "30pt Arial";
    // テキストの幅を取得
    const textWidth = ctx.measureText(`${currentDateTime}`).width;
    ctx.fillStyle = 'white';
    ctx.fillText(`${currentDateTime}`, ((canvasWidth - textWidth) / 2), canvasHeight / 2);

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

      <div className='btn-container'>
        <button onClick={handleExportClick} className="button">Export as Image</button>
      </div>

      <div className="image-container bg-image-container">
        {imageItems}
      </div>
    </div>
  );
}

export default CanvasComponent;

