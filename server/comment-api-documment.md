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

## Get all comments of the post
Endpoint: `http://localhost:[port]/api/comment/{postId}`

### Respone:
```json
{
    "message": "Comments retrieved successfully",
    "comments": [
        {
            "_id": "commentId",
            "userId": {
                "_id": "userId",
                "username": "testaccount"
            },
            "commentText": "Text comment here",
            "likesCount": 0
        }
        // Other comments
    ]
}
```

## Edit comments
Endpoint: `http://localhost:[port]/api/comment/{commentId}`
### Request
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

## Like the comment
Endpoint: `http://localhost:[port]/api/comment/like/{commentId}`
## Respone 
```json
{
    "message": "Successfully liked the comment"
}
```

## Unlike the comment
Endpoint: `http://localhost:[port]/api/comment/like/{commentId}`

## Respone 
```json
{
    "message": "Successfully unliked the comment"
}
```

## Delete the comment
Endpoint: `htthttp://localhost:[port]/api/comment/{commentId}` 

## Respone
```json
{
     "message": "Comment deleted successfully"
}
```


