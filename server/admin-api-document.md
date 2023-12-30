# Admin API

## Login Admin

Endpoint: `http://localhost:[port]/api/admin/login`

### Request

```json
{
    "email": "adminemail@example.com",
    "password": "adminpassword"
}
```

### Respone
```json
{
    "status": "success",
    "message": "Admin login successful",
    "accessToken": "access_token",
    "refreshToken": "refresh_token"
}
```

## Get reported posts
Endpoint: `http://localhost:[port]/api/admin/reported-posts`

### Respone
```json
{
    "message": "Fetched reported posts successfully",
    "reportedPosts": [
        {
            "_id": "reportedPost._id",
            "postId": "post._id",
            "reporter": "reporter._id",
            "adminDecision": "pending",
            "reportReason": "Reported reason",
            "reportedAt": "Time reported",
            "__v": 0
        }
    ]
}
```

## Give decision about reported post
Endpoint: `http://localhost:[port]/api/admin/reported-post/{id}`
## Ignore the reported posts

### Request
```json
{
    "decision": "keep"
}
```

### Response
```json
{
    "message": "Report post kept"
}
```

## Delete the reported post

### Request
```json
{
    "decision": "delete"
}
```

### Response
```json
{
    "message": "Reported post deleted"
}
```



