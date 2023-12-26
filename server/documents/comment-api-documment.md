# Comment API

## Create comment

Endpoint: `http://localhost:[port]/api/comment/{postId}`
### Request

```json
{
    "commentText": "Comment content"
}
```

### Response

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
