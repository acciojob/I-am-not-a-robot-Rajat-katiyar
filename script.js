//your code here
const images = ['img1', 'img2', 'img3', 'img4', 'img5'];  
let selectedImages = [];  
let identicalImageClass = '';  
const imageContainer = document.getElementById('image-container');  
const resetButton = document.getElementById('reset');  
const verifyButton = document.getElementById('verify');  
const messagePara = document.getElementById('para');  

function generateImages() {  
    imageContainer.innerHTML = '';  
    const randomIndex = Math.floor(Math.random() * images.length);  
    identicalImageClass = images[randomIndex];  

    const usedImages = [...images];  
    const identicalImage = identicalImageClass;  

    // Add the identical image  
    usedImages.splice(randomIndex, 1);  
    usedImages.splice(Math.floor(Math.random() * 5), 0, identicalImage);  

    for (let imgClass of usedImages) {  
        const img = document.createElement('img');  
        img.className = imgClass;  
        img.addEventListener('click', handleImageClick);  
        imageContainer.appendChild(img);  
    }  
}  

function handleImageClick(event) {  
    const imgClass = event.target.className;  

    // Prevent double-clicking the same image  
    if (selectedImages.includes(imgClass)) return;  

    selectedImages.push(imgClass);  
    event.target.classList.add('selected');  

    resetButton.style.display = 'inline';  

    if (selectedImages.length === 2) {  
        verifyButton.style.display = 'inline';  
    }  
}  

resetButton.addEventListener('click', () => {  
    selectedImages = [];  
    resetButton.style.display = 'none';  
    verifyButton.style.display = 'none';  
    messagePara.textContent = '';  
    const selectedImagesElements = document.querySelectorAll('.selected');  
    selectedImagesElements.forEach(img => img.classList.remove('selected'));  
    generateImages();  
});  

verifyButton.addEventListener('click', () => {  
    const [first, second] = selectedImages;  
    if (first === second) {  
        messagePara.textContent = 'You are a human. Congratulations!';  
    } else {  
        messagePara.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';  
    }  
    verifyButton.style.display = 'none';  
});  

window.onload = generateImages;