const mockData = require('../../data/mockData');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed',
        message: 'Only GET requests are supported'
      })
    };
  }

  const aadhaarNumber = event.queryStringParameters?.aadhaar;

  if (!aadhaarNumber) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Missing parameter',
        message: 'Aadhaar number is required as query parameter'
      })
    };
  }

  if (!/^\d{12}$/.test(aadhaarNumber)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Invalid format',
        message: 'Aadhaar number must be exactly 12 digits'
      })
    };
  }

  const userData = mockData[aadhaarNumber];

  if (!userData) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: 'Not found',
        message: 'No data found for the provided Aadhaar number'
      })
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      data: userData
    })
  };
};