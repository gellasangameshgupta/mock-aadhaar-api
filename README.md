# 🚀 Mock Aadhaar API

> **A serverless REST API built with Netlify Functions that returns mock user data for testing and development purposes.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://mock-aadhaar-api.netlify.app/api/getUserData?aadhaar=123456789012)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/mock-aadhaar-api/deploys)

## 🎯 Features

- ✅ **50+ Mock User Profiles** with diverse Indian names and addresses
- ✅ **REST API** with proper HTTP status codes and error handling
- ✅ **Input Validation** for 12-digit Aadhaar number format
- ✅ **CORS Enabled** for cross-origin requests
- ✅ **Serverless Architecture** using Netlify Functions
- ✅ **JSON Response Format** with structured data

## 🌐 Live API Endpoint

```
https://mock-aadhaar-api.netlify.app/api/getUserData?aadhaar=AADHAAR_NUMBER
```

## 📊 Sample Mock Aadhaar Numbers (12 digits)

- `123456789012` - Rajesh Kumar (Bangalore, Karnataka)
- `234567890123` - Priya Sharma (Mumbai, Maharashtra)
- `345678901234` - Amit Singh (Gurgaon, Haryana)
- `456789012345` - Sneha Patel (Ahmedabad, Gujarat)
- `567890123456` - Vikram Reddy (Hyderabad, Telangana)

*[View all 50 users in the data file]*

## 🔍 Quick Test

**Try it now:**
```bash
curl "https://mock-aadhaar-api.netlify.app/api/getUserData?aadhaar=123456789012"
```

**Or click this link:** [Test API →](https://mock-aadhaar-api.netlify.app/api/getUserData?aadhaar=123456789012)

## Example Response

```json
{
  "success": true,
  "data": {
    "name": "Rajesh Kumar",
    "gender": "Male",
    "dateOfBirth": "1985-06-15",
    "age": 39,
    "address": {
      "street1": "123 MG Road",
      "street2": "Near City Mall",
      "city": "Bangalore",
      "postalCode": "560001",
      "state": "Karnataka"
    }
  }
}
```

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Platform:** Netlify Functions (Serverless)
- **Architecture:** JAMstack
- **Data:** Static JSON mock data
- **Validation:** RegEx pattern matching

## 📋 API Documentation

### Request Format
```
GET /api/getUserData?aadhaar={12-digit-number}
```

### Response Format
```json
{
  "success": true,
  "data": {
    "name": "string",
    "gender": "Male|Female",
    "dateOfBirth": "YYYY-MM-DD",
    "age": number,
    "address": {
      "street1": "string",
      "street2": "string", 
      "city": "string",
      "postalCode": "string",
      "state": "string"
    }
  }
}
```

### Error Responses

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Invalid format | Aadhaar number must be exactly 12 digits |
| 404 | Not found | No data found for the provided Aadhaar number |
| 405 | Method not allowed | Only GET requests are supported |

## 🚀 Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mock-aadhaar-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run locally**
   ```bash
   netlify dev
   ```

4. **Test the API**
   ```bash
   curl "http://localhost:8888/api/getUserData?aadhaar=123456789012"
   ```

## 📦 Deployment

Deploy to Netlify with one command:
```bash
netlify deploy --prod
```

## 👨‍💻 Author

**Sangamesh Gella**
- Portfolio: [linktr.ee/sangameshgella](https://linktr.ee/sangameshgella)
- GitHub: [@sangameshgella](https://github.com/sangameshgella)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repo if you found it useful!**