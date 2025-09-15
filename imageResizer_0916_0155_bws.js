// 代码生成时间: 2025-09-16 01:55:15
// Import the necessary modules
const { Loader, Texture } = require('three');

class ImageResizer {

  constructor() {
    // Initialize loader
    this.loader = new Loader();
  }

  /**
   * Load an image and return a promise that resolves to the HTMLImageElement
   * @param {string} url - The URL of the image to load
   * @return {Promise<HTMLImageElement>}
   */
  loadTexture(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, (texture) => {
        const image = texture.image;
        resolve(image);
      }, undefined, reject);
    });
  }

  /**
   * Resize an image to the specified dimensions
   * @param {HTMLImageElement} image - The image to resize
   * @param {number} width - The new width of the image
   * @param {number} height - The new height of the image
   * @return {HTMLImageElement} - The resized image
   */
  resizeImage(image, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    return canvas;
  }

  /**
   * Resize multiple images and returns a promise that resolves to an array of resized images
   * @param {Array<string>} imageUrls - URLs of images to be resized
   * @param {number} width - The new width of the images
   * @param {number} height - The new height of the images
   * @return {Promise<Array<HTMLImageElement>>}
   */
  resizeMultipleImages(imageUrls, width, height) {
    return Promise.all(imageUrls.map(url => this.loadTexture(url)
      .then(image => this.resizeImage(image, width, height))
      .catch(error => {
        console.error('Error resizing image:', error);
        return null; // Return null for failed images
      })));
  }
}

// Example usage:
const resizer = new ImageResizer();
const imageUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
const newWidth = 100;
const newHeight = 100;

resizer.resizeMultipleImages(imageUrls, newWidth, newHeight)
  .then(resizedImages => {
    resizedImages.forEach((resizedImage, index) => {
      if (resizedImage) {
        const imgElement = document.createElement('img');
        imgElement.src = resizedImage.toDataURL();
        document.body.appendChild(imgElement);
      }
    });
  })
  .catch(error => {
    console.error('Error resizing images:', error);
  });