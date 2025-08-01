# Mock Aadhaar API

A simple REST API that returns mock user data based on Aadhaar number lookup.

## API Endpoint

Once deployed, your API will be available at:
```
https://your-site-name.netlify.app/api/getUserData?aadhaar=AADHAAR_NUMBER
```

## Sample Mock Aadhaar Numbers

- `1234567890123` - Rajesh Kumar
- `2345678901234` - Priya Sharma  
- `3456789012345` - Amit Singh
- `4567890123456` - Sneha Patel
- `5678901234567` - Vikram Reddy

## Example Request

```bash
curl "https://your-site-name.netlify.app/api/getUserData?aadhaar=1234567890123"
```

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

## Deployment to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

4. Deploy:
   ```bash
   netlify deploy --prod
   ```

## Error Responses

- **400 Bad Request**: Missing or invalid Aadhaar number
- **404 Not Found**: No data found for the provided Aadhaar number
- **405 Method Not Allowed**: Only GET requests are supported