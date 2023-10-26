// Define the common URL prefix and suffix format
const urlPrefix = 'https://example.com/image';
const urlSuffixFormat = '00000';

// Arrays to store the fetched data
const imageDataArray = [];
const data1Array = [];
const data2Array = [];

// Function to fetch an individual type of data
function fetchData(url, dataArray) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); // Adjust based on the type of data (text, JSON, etc.)
    })
    .then(data => {
      dataArray.push(data);
      if (dataArray.length === 999999) {
        // All data has been fetched
        // Display data in UI
        displayDataInUI(imageDataArray, data1Array, data2Array);
      } 
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Loop through the range of numerical values and fetch all types of data
for (let i = 0; i <= 999999; i++) {
  const urlSuffix = urlSuffixFormat + i.toString().padStart(5, '0');
  const imageUrl = urlPrefix + urlSuffix;
  const data1Url = 'https://example.com/data1/' + urlSuffix;
  const data2Url = 'https://example.com/data2/' + urlSuffix;

  fetchData(imageUrl, imageDataArray);
  fetchData(data1Url, data1Array);
  fetchData(data2Url, data2Array);
}

function createImageElement(imageData) {
    const imageElement = document.createElement('img');
    const blob = new Blob([imageData], { type: 'image/jpeg' }); // Adjust the MIME type if needed
    const imageUrl = URL.createObjectURL(blob);
    imageElement.src = imageUrl;
    return imageElement;
  }

// Function to display the data in the UI
function displayDataInUI(images, data1, data2) {
  const imageContainer = document.getElementById('image-container'); // Replace with your container element ID
  const data1Container = document.getElementById('data1-container'); // Replace with your container element ID
  const data2Container = document.getElementById('data2-container'); // Replace with your container element ID

  // Display images
  images.forEach(imageData => {
    const imageElement = createImageElement(imageData);
    imageContainer.appendChild(imageElement);
  });

  // Display data1 and data2
  data1.forEach(data => {
    const data1Element = document.createElement('div');
    data1Element.textContent = data;
    data1Container.appendChild(data1Element);
  });

  data2.forEach(data => {
    const data2Element = document.createElement('div');
    data2Element.textContent = data;
    data2Container.appendChild(data2Element);
  }
}