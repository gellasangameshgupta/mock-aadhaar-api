# Mock Aadhaar API

A mock API that provides fake Aadhaar (Indian national ID) data for testing purposes. This API contains **1,000,050** unique mock records with realistic Indian names, addresses, and demographic information.

## 🌟 Features

- **1M+ Records**: Over 1 million unique mock Aadhaar entries
- **Realistic Data**: Indian names, cities, states, and postal codes
- **Diverse Demographics**: Balanced gender distribution and age ranges (19-75 years)
- **Geographic Coverage**: Data from all major Indian states and 50+ cities
- **RESTful API**: Simple GET endpoint for data retrieval
- **CORS Enabled**: Ready for web application integration
- **Utility Tools**: Built-in data management and search utilities

## 📊 Dataset Statistics

- **Total Records**: 1,000,050
- **Gender Distribution**: ~50% Male, ~50% Female
- **Age Range**: 19-75 years (Average: 47 years)
- **Geographic Coverage**: 29+ states and 50+ cities across India
- **File Size**: 285MB

## 🚀 API Usage

### Endpoint
```
GET /.netlify/functions/getUserData?aadhaar=<12-digit-number>
```

### Example Request
```bash
curl "https://your-api-url/.netlify/functions/getUserData?aadhaar=123456789012"
```

### Example Response
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

### Error Responses

**Missing Aadhaar Parameter (400)**
```json
{
  "error": "Missing parameter",
  "message": "Aadhaar number is required as query parameter"
}
```

**Invalid Format (400)**
```json
{
  "error": "Invalid format",
  "message": "Aadhaar number must be exactly 12 digits"
}
```

**Record Not Found (404)**
```json
{
  "error": "Not found",
  "message": "No data found for the provided Aadhaar number"
}
```

## 🛠️ Data Management Utilities

The project includes a comprehensive utility script for managing and exploring the dataset:

### View Dataset Statistics
```bash
node dataUtils.js stats
```

### Get Random Records
```bash
node dataUtils.js random 5
```

### Search by Name
```bash
node dataUtils.js search "Rajesh"
```

### Lookup Specific Aadhaar
```bash
node dataUtils.js lookup 123456789012
```

### List Available States
```bash
node dataUtils.js states
```

### List Available Cities
```bash
node dataUtils.js cities
```

## 🏗️ Development

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally with Netlify CLI: `netlify dev`

### Regenerating Data
To regenerate or expand the dataset:
```bash
node generateMockData.js
```

## 📁 Project Structure

```
├── data/
│   └── mockData.js          # 1M+ mock Aadhaar records (285MB)
├── netlify/
│   └── functions/
│       └── getUserData.js   # API endpoint function
├── dataUtils.js             # Data management utilities
├── generateMockData.js      # Data generation script
├── netlify.toml            # Netlify configuration
└── package.json            # Project dependencies
```

## 🎯 Use Cases

- **API Testing**: Test applications that integrate with Aadhaar-like systems
- **Load Testing**: Stress test systems with large datasets
- **UI Development**: Populate interfaces with realistic Indian demographic data
- **Data Analytics**: Practice data analysis with realistic population data
- **Educational Projects**: Learn about Indian demographics and data structures

## ⚠️ Important Notes

- **Mock Data Only**: All data is completely fake and generated programmatically
- **No Real Aadhaar Numbers**: Does not contain any actual government-issued Aadhaar numbers
- **For Testing Only**: Intended solely for development and testing purposes
- **Privacy Compliant**: No real personal information is stored or used

## 🌐 Deployment

This API is designed to be deployed on Netlify Functions, but can be adapted for other serverless platforms:

1. Deploy to Netlify
2. The function will be available at `/.netlify/functions/getUserData`
3. Add your custom domain if needed

## 📝 License

This project is open source and available under the MIT License.

---

⭐ **Star this repo if you found it useful!**
