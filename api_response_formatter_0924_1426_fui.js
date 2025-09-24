// 代码生成时间: 2025-09-24 14:26:47
// Import the necessary modules
const axios = require('axios'); // Axios for making HTTP requests
const chalk = require('chalk'); // Chalk for styling the console output

// Define the API endpoint URL
const API_URL = 'https://api.example.com/data';

/**
 * Formats the API response into a readable and structured format.
 *
 * @param {Object} response - The API response object.
 * @returns {Object} The formatted response object.
 */
function formatApiResponse(response) {
  // Check if the response is valid
  if (!response || !response.data) {
    throw new Error('Invalid API response');
  }

  // Extract the necessary data from the response
  const { data, status, statusText } = response;

  // Format the response data
  const formattedData = {
    status,
    statusText,
    data: JSON.stringify(data, null, 2),
  };

  return formattedData;
}

/**
 * Fetches data from the API and formats the response.
 *
 * @returns {Promise<Object>} A promise that resolves with the formatted response.
 */
async function fetchData() {
  try {
    // Make an HTTP GET request to the API endpoint
    const response = await axios.get(API_URL);

    // Format the API response
    const formattedResponse = formatApiResponse(response);

    // Log the formatted response to the console
    console.log(chalk.green('Formatted API Response:'));
    console.log(JSON.stringify(formattedResponse, null, 2));

    return formattedResponse;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(chalk.red('Error fetching data from API:'), error.message);
  }
}

// Call the fetchData function to fetch and format API data
fetchData();