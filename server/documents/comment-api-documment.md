## Create Comment

Endpoint: `http:/localhost:[port]/api/comment/:postId`

### Purpose:

The `createComment` function allows users to create comments for a specific post within the API system. It requires the user to provide a valid post ID and the comment text. The system validates the input data, checks for the existence of the post, and creates a comment associated with the provided post ID.

### Request

- Method: POST
- Endpoint: `/api/comment/:postId`
- Headers: Content-Type: application/json, Authorization: Bearer [JWT Token]
- Body: JSON object containing the following field:
  - `commentText` (string, required): The text content of the comment.

### Example Input

```json
{
  "commentText": "This is a great post!"
}
```

### Success Response

```json
{
  "message": "Comment created successfully",
  "comment": {
    "_id": "comment_id",
    "postId": "post_id",
    "userId": "user_id",
    "commentText": "This is a great post!",
    "likes": [],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Error Responses

- Validation Failed, Entered Data is Empty

  ```json
  {
    "status": "error",
    "message": "Validation failed, entered data is empty"
  }
  ```

- Post Not Found

  ```json
  {
    "status": "error",
    "message": "Could not find post"
  }
  ```

- Missing Required Fields

  ```json
  {
    "status": "error",
    "message": {
      "commentText": "The comment text is required"
    }
  }
  ```

### Notes

- `400 Bad Request`: Invalid or missing input data.
- `404 Not Found`: The requested post does not exist.
- `500 Internal Server Error`: Unexpected server-side issues during comment creation.

---

## Get Comments for a Post

Endpoint: `http:/localhost:[port]/api/comment/:postId`

### Purpose:

The `getComments` function retrieves comments associated with a specific post ID within the API system. It requires a valid post ID to fetch comments related to that post. The retrieved comments include user IDs, comment text, and the count of likes for each comment.

### Request

- Method: GET
- Endpoint: `/api/comment/:postId`
- Headers: Content-Type: application/json, Authorization: Bearer [JWT Token]

### Example Request

```
GET /api/comment/:postId
```

### Success Response

```json
{
  "message": "Comments retrieved successfully",
  "comments": [
    {
      "_id": "comment_id",
      "userId": {
        "username": "user_username"
      },
      "commentText": "Comment text...",
      "likesCount": 3
    },
    {
      "_id": "comment_id",
      "userId": {
        "username": "user_username"
      },
      "commentText": "Another comment...",
      "likesCount": 5
    },
    // More comments...
  ]
}
```

### Error Responses

- Comments Retrieval Failure

  ```json
  {
    "status": "error",
    "message": "Comments retrieval failure"
  }
  ```

### Notes

- `404 Not Found`: No comments found for the provided post ID.
- `500 Internal Server Error`: Unexpected server-side issues during comment retrieval.

---

## Edit Comment

Endpoint: `http:/localhost:[port]/api/comment/:commentId`

### Purpose:

The `editComment` function allows users to edit their comments within the API system. It requires a valid comment ID and the updated comment text. The system validates the input data, checks for authorization to edit the comment, and updates the comment text accordingly.

### Request

- Method: PUT
- Endpoint: `/api/comment/:commentId`
- Headers: Content-Type: application/json, Authorization: Bearer [JWT Token]
- Body: JSON object containing the following field:
  - `commentText` (string, required): The updated text content of the comment.

### Example Request

```json
PUT /api/comment/:commentId
{
  "commentText": "Updated comment text..."
}
```

### Success Response

```json
{
  "message": "Comment updated successfully",
  "comment": {
    "_id": "comment_id",
    "userId": "user_id",
    "commentText": "Updated comment text...",
    // Other comment details
  }
}
```

### Error Responses

- Validation Failed, Entered Data is Empty

  ```json
  {
    "status": "error",
    "message": "Validation failed, entered data is empty"
  }
  ```

- Not Authorized to Edit This Comment

  ```json
  {
    "status": "error",
    "message": "Not authorized to edit this comment"
  }
  ```

### Notes

- `403 Forbidden`: User not authorized to edit the comment.
- `404 Not Found`: The requested comment ID does not exist.
- `500 Internal Server Error`: Unexpected server-side issues during comment editing.

---

## Toggle Like on Comment

Endpoint: `http:/localhost:[port]/api/comment/like/:commentId`

### Purpose:

The `toggleLike` function allows users to toggle (like/unlike) a specific comment within the API system. It requires a valid comment ID to perform the like/unlike action. The system checks whether the user has already liked the comment and performs the appropriate action.

### Request

- Method: PUT
- Endpoint: `/api/comment/like/:commentId`
- Headers: Content-Type: application/json, Authorization: Bearer [JWT Token]

### Example Request

```json
PUT /api/comment/like/:commentId
```

### Success Responses

#### When Liked:

```json
{
  "message": "Successfully liked the comment"
}
```

#### When Unliked:

```json
{
  "message": "Successfully unliked the comment"
}
```

### Error Responses

- Comment Retrieval Failure

  ```json
  {
    "status": "error",
    "message": "Comment retrieval failure"
  }
  ```

- User Not Found

  ```json
  {
    "status": "error",
    "message": "User not found"
  }
  ```

### Notes

- `401 Unauthorized`: User not found (Invalid or expired token).
- `404 Not Found`: The requested comment ID does not exist.
- `500 Internal Server Error`: Unexpected server-side issues during toggling the like on the comment.

---

## Delete Comment

Endpoint: `http:/localhost:[port]/api/comment/:commentId`

### Purpose:

The `deleteComment` function allows users to delete their own comments within the API system. It requires a valid comment ID to delete the associated comment. The system checks for authorization and deletes the comment if the user has the necessary permissions.

### Request

- Method: DELETE
- Endpoint: `/api/comment/:commentId`
- Headers: Content-Type: application/json, Authorization: Bearer [JWT Token]

### Example Request

```json
DELETE /api/comment/:commentId
```

### Success Response

```json
{
  "message": "Comment deleted successfully"
}
```

### Error Responses

- Comment Retrieval Failure

  ```json
  {
    "status": "error",
    "message": "Comment retrieval failure"
  }
  ```

- Not Authorized to Delete This Comment

  ```json
  {
    "status": "error",
    "message": "Not authorized to delete this comment"
  }
  ```

### Notes

- `403 Forbidden`: User not authorized to delete the comment.
- `404 Not Found`: The requested comment ID does not exist.
- `500 Internal Server Error`: Unexpected server-side issues during comment deletion.

---

Modify placeholders like `[port]` and customize error messages or additional details as required before adding this template to your API documentation.
This document outlines the endpoints available in the User API, their respective request and response formats based on the provided code snippets. Adjustments might be necessary to include specific details like headers or authentication tokens as required.
