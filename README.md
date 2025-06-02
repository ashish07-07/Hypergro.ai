# Hypergro.ai Backend API Documentation

## Technologies Used


- **Backend Stack**: Node.js, Express.js,
- **Languages**: Javascript,Typescript
- **Database**:MongoDB
- **Caching **: Redis

## API Endpoints

1. User Registration
   ```bash
   POST https://hypergro-ai-ak3e.onrender.com/userreg/register

   Request Body 
    {
    "name": "User Full Name",
    "email": "user@example.com",
   "password": "securepassword123"
  }

2. Login Route
```bash
POST https://hypergro-ai-ak3e.onrender.com/userlog/login
Request Body
{
  "email": "registered@example.com",
  "password": "123456"
}
```
You will get a token back as response.
3 CSV File uplaod route To uplaod the Property details

Authorization: Bearer <token> have a header with authorization and a value of Bearer TOKEN
Content-Type: multipart/form-data
```bash
POST https://hypergro-ai-ak3e.onrender.com/upload/csvfile
```


4. Add Property
    Headers
   authorization: Bearer <token>

```bash
POST https://hypergro-ai-ak3e.onrender.com/addproperty/details
```
Request Body:
```bash
{
  "id": "PROP0062",
  "title": "Modern 2BHK Apartment in Kadri Mangalore",
  "type": "Apartment",
  "price": 7500000,
  "state": "Karnataka",
  "city": "Bangalore",
  "areaSqFt": 1200,
  "bedrooms": 2,
  "bathrooms": 2,
  "amenities": ["Gym", "Swimming Pool", "Parking"],
  "furnished": "Semi-Furnished",
  "availableFrom": "2024-07-01T00:00:00.000Z",
  "listedBy": "Owner",
  "tags": ["Luxury", "City Center"],
  "colorTheme": "#FFD700",
  "rating": 4.5,
  "isVerified": true,
  "listingType": "Sale"
}
```

5. Update Property
  Headers
   authorization: Bearer <token>

```bash
PUT https://hypergro-ai-ak3e.onrender.com/update/property/:propertyId
```
Update Body request 

``` bash
{
  "title": "Updated 2BHK Apartment in Bangalore",
  "price": 8200000,
  "furnished": "Fully-Furnished house for me bro",
  "rating": 4.8,
  "tags": ["Luxury", "Prime Location", "Newly Renovated"]
}
```

6.  Delete Property
     Headers
   authorization: Bearer <token>
``` bash
DELETE https://hypergro-ai-ak3e.onrender.com/delate/property/:propertyId
```
7. Toggle Favorites
   Description: Add/remove property from favorites
        Headers
   authorization: Bearer <token>
```bash
POST https://hypergro-ai-ak3e.onrender.com/add/favorites/:propertyId
```
8. Property Recommendations to other user
    Headers
   authorization: Bearer <token>


```bash
   GET https://hypergro-ai-ak3e.onrender.com/recommend/property
```
Request body
```bash

 {
     "email":"bkashish077@gmail.com",
     "propertyid":"683b40b9a0bf34e0d490904f"
   

}
```
9. Property Search
    
    Exmaple https://hypergro-ai-ak3e.onrender.com/search/property?state=Karnataka&city=Bangalore
```bash

    GET https://hypergro-ai-ak3e.onrender.com/search/property?queries
    Response: Filtered property listings
   
   


