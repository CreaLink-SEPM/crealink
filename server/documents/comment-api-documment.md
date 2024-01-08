# Comment API

## Create comment

Endpoint: `http://localhost:[port]/api/comment/{postId}`
### Purpose 
The create comment function allows users to post a comment that belongs to a specific `postId`. 

### Request
- Method: POST,
- Headers: Content-Type: application/json (or as appropriate for your API).
- Authorization: Bearer [token]
### Example Input
```json
{
    "commentText": "Comment content"
}
```

### Success Response

```json
{
    "message": "Comments created successfully",
    "comment": {
        "postId": "postId",
        "userId": "user._id",
        "commentText": "Comment content",
        "likes": [],
        "_id": "comment._id",
        "createdAt": "2023-12-21T12:46:48.735Z",
        "updatedAt": "2023-12-21T12:46:48.735Z",
        "__v": 0
    }
}
```


### Error Respone
- Data input is not meet the criteria
```json
{
    "status": "error",
    "message": "Validation failed, entered data is empty"
}
```
- Post ID is not valid
```json
{
    "status": "error",
    "message": "Could not find post"
}
```
### Notes
- `404 Not Found`: Post ID is not found
- `422 Unprocessable Entity`: Input data does not meet the criteria
- `500 Internal Server Error`: Unexpected server-side issues when creating comment
## Get all comments of the post
Endpoint: `http://localhost:[port]/api/comment/{postId}`

### Purpose
The create comment function allows users to fetch all comments that belongs to a specific `postId`. 
### Request
- Method: GET,
- Headers: Content-Type: application/json (or as appropriate for your API).
- Authorization: Bearer [token]

### Success Respone:
```json
{
    "message": "Comments retrieved successfully",
    "comments": [
        {
            "_id": "commentId",
            "userId": {
                "_id": "userId",
                "username": "testaccount",
                "user_image": "user_image.jpg",
            },
            "commentText": "Text comment here",
            "likesCount": 0
        }
        // Other comments
    ]
}
```
### Error Responses:
- Error fetching comments
```json
{
    "status": "error",
    "message": "Comments retrieved failure"
}
```

### Notes
- `200 OK`: All comments retrieved successfully
- `404 Not Found`: Comment retrieved failed
- `500 Internal Server Error`: Unexpected server-side issues during fetching comments.


## Edit comments
Endpoint: `http://localhost:[port]/api/comment/{commentId}`
### Purpose
This endpoint allows users to edit their belonging comments that belong to the post which has `postId` attribute

### Request
- Method: GET,
- Headers: Content-Type: application/json (or as appropriate for your API).
- Authorization: Bearer [token]

### Example Input

```json
{
    "commentText": "Text comment Here"
}
```

### Respone
```json
{
    "message": "Comment updated successfully",
    "comment": {
        "_id": "commentId",
        "postId": "postId",
        "userId": "userId",
        "commentText": "wdwdwdw",
        "likes": [],
        "createdAt": "Time created",
        "updatedAt": "Time updated",
        "__v": 0
    }
}
```

## Toggle like for comment
### Purpose
This endpoint allows users to toggle like or dislike for comment which has id of `commentId`
Endpoint: `http://localhost:[port]/api/comment/like/{commentId}`

### Request
- Method: PUT,
- Authorization: Bearer [token]
### Success Respone 
```json
{
    "message": "Successfully liked the comment"
}
```

```json
{
    "message": "Successfully unliked the comment"
}
```
### Error Response
- Comment retrieved failed
```json
{
    "status": "error",
    "message": "Comment retrieved failed"
}
```

- User not authorized to like or dislike the comment
```json
{
    "message": "User not found, not authorized",
    "status": "error"
}
```
### Notes
- `200 OK`: Successfully liked or unliked the comment
- `401 Unauthorized`: Unauthorized to like or dislike the comment
- `404 Not Found`: Comment not found
- `500 Internal Server Error`: 
## Delete the comment
Endpoint: `http://localhost:[port]/api/comment/{commentId}` 
### Purpose
This endpoint allows users to delete a comment which has id of `commentId` that belongs to their users account

### Request
- Method: DELETE,
- Authorization: Bearer [token]
## Successs Respone
```json
{
     "message": "Comment deleted successfully"
}
```
### Error Response
- Comment not found
```json
{
    "status": "error",
    "message": "Comment retrieved failure"
}
```

- User not authorized
```json
{
    "status": "error",
    "message": "Not authorized to delete this comment"
}
```

### Notes
- `404 Not Found`: Comment ID is not found
- `403 Forbidden`: User is not authorized to delete this comment
- `200 OK`: Comment deleted successfully
- `500 Internal Server Error`: Unexpected server-side issues while deleting comment


