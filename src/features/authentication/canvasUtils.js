// canvasUtils.js
export default function getCroppedImg(imageSrc, pixelCrop) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const cropX = pixelCrop.x * scaleX;
      const cropY = pixelCrop.y * scaleY;
      const cropWidth = pixelCrop.width * scaleX;
      const cropHeight = pixelCrop.height * scaleY;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight,
      );

      canvas.toDataURL('image/jpeg', (dataUrl) => {
        resolve(dataUrl);
      });
    };
    image.onerror = (error) => reject(error);
  });
}
