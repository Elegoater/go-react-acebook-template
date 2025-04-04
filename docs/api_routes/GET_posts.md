# GET /posts

This endpoint retrieves all posts in the system.

## Request

### URL
```
GET /posts
```

### Required Headers
```
Authorization: "bearer {JWT token}"
Content-Type: "application/json"
```

## Response

### Success Response (200 OK)
Returns a JSON object containing an array of all posts and a new JWT token.

```json
{
  "posts": [
    {
      "_id": 1,
      "question": "This is a test question",
      "answer": "test answer from bobio",
      "user_id": 1
    },
    {
      "_id": 2,
      "question": "Another question",
      "answer": "Another answer",
      "user_id": 2
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

- **401 Unauthorized**: If the JWT token is missing or invalid
  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **500 Internal Server Error**: If there's a server-side error
  ```json
  {
    "err": "Something went wrong"
  }
  ```

## Notes
- The endpoint requires authentication via JWT token
- Each post includes:
  - `_id`: The unique identifier of the post
  - `question`: The question text
  - `answer`: The answer text
  - `user_id`: The ID of the user who created the post
- A new JWT token is returned with each successful response for token refresh purposes
- The response includes all posts in the system, regardless of which user created them 