const video = document.getElementById('video');
const openCameraButton = document.getElementById('open-camera');
const captureButton = document.getElementById('capture');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const showImagesButton = document.getElementById('show-images');
const photosContainer = document.getElementById('photos-container');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

let capturedImages = [];

// Function to open the camera
function openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.style.display = 'block';
            captureButton.style.display = 'block';
            openCameraButton.style.display = 'none';
            showImagesButton.style.display = 'block';
        })
        .catch(err => {
            console.error("Error accessing webcam: ", err);
        });
}

// Access the device camera and stream to video element
openCameraButton.addEventListener('click', openCamera);

// Capture photo
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to data URL
    const dataURL = canvas.toDataURL('image/png');
    capturedImages.push(dataURL);
    console.log("Captured Images: ", capturedImages);
});

// Show captured images
showImagesButton.addEventListener('click', () => {
    photosContainer.innerHTML = ''; // Clear previous images
    capturedImages.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        photosContainer.appendChild(img);
    });
});

// Toggle navigation menu for mobile view
burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});
