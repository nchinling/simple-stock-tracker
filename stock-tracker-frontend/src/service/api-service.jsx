const API_BASE_URL = 'http://localhost:5000'; 

const getLatestClosingPrice = async (symbol= 'IBM') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/data?symbol=${symbol}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


const communicateWithServer = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/communicate`);
    if (!response.ok) {
      throw new Error('Error communicating with the server');
    }
    const message = await response.text(); // Since the response is plain text, use .text()
    return message;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export {getLatestClosingPrice, communicateWithServer}
