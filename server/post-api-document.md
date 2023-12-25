# Post API

## Create post

Endpoint: `http://localhost:[port]/api/feed/post`

### Request

```json
{
    "title": "Example Post",
    "content": "Lorem ipsum ...",
    "image": "image_file"
}
```

### Respone
```json
{
  "message": "Post created successfully",
  "posts": {
    "title": "Example Title",
     "imageUrl": "https://example.com/image.jpg",
    "content": "Lorem ipsum...",
    "creator": "user_id",
    "likes": [],
    "_id": "post._id",
    "createdAt": "2023-12-14T03:27:36.695Z",
    "updatedAt": "2023-12-14T03:27:36.695Z",
    "__v": 0
  },
  "creator": {
    "_id": "user_id",
    "name": "username"
  }
}
```

### Get Posts
Endpoint: `http://localhost:[port]/api/feed/posts`

### Response
```json 
{
  "message": "Fetched post successfully",
  "posts": [
    {
        "id": "post._id",
      "title": "Example Title",
      "imageUrl": "https://example.com/image.jpg",
      "content": "Lorem ipsum...",
      "creator": {
        "_id": "user_id",
        "name": "username"
      },
      "createdAt": "2023-12-14T03:27:36.695Z",
      "updatedAt": "2023-12-14T03:27:36.695Z",
      "__v": 0,
      "likesCount": 5
    },
    // ... other posts
  ]
}
```

## Get a single post

Endpoint: `http:/localhost:[port]/api/feed/post/{postId}`

### Respone
```json
{
  "message": "Post fetched successfully",
  "post": {
    "_id": "postId",
    "title": "Example Title",
     "imageUrl": "https://example.com/image.jpg",
    "content": "Lorem ipsum...",
    "creator": {
      "_id": "user_id",
      "name": "username"
    },
    "createdAt": "2023-12-14T03:27:36.695Z",
    "updatedAt": "2023-12-14T03:27:36.695Z",
    "__v": 0,
    "likesCount": 5
  }
}

```

## Update a post
Endpoint: `http:/localhost:[port]/api/feed/post/{postId}`

### Request 

```json
{
  "title": "Updated Title",
  "content": "New content...",
  "image": "new_image_file"
}
```

### Respone

```json
{
    {
  "message": "Post updated successfully",
  "post": {
    "_id": "postId",
    "title": "Updated Title",
     "imageUrl": "https://example.com/new_image.jpg",
    "content": "New content...",
    "creator": "user._id",
    "likes": [
        "user1 Id",
        "user2 Id"
    ],
    "createdAt": "2023-12-18T14:12:15.018Z",
    "updatedAt": "2023-12-18T14:43:08.846Z",
    "__v": 1
  }
}
}
```

## Delete a post
Endpoint: `http:/localhost:[port]/api/feed/post/{postId}`

### Respone

```json
{
    "message": "Delete post successfully"
}
```

## Get Liked Users for a Post

Endpoint: `http:/localhost:[port]/api/feed/like/{postId}`

### Response

```json 
{
    {
  "message": "Fetched liked users successfully",
  "post": {
    "likedUsers": [
      {
        "id": "user1 Id",
        "username": "user1"
      },
      {
        "id": "user2 Id",
        "username": "user2"
      }
      // ... other liked users
    ]
  }
}

}
```

## Toggle like for a post
Endpoint: `http:/localhost:[port]/api/feed/like/{postId}`

### Respone
```json
{
    "message": "Successfully liked the post"
}
```

### Respone
```json
{
    "message": "Successfully unliked the post"
}
```

## Share point
Endpoint: `http:/localhost:[port]/api/feed/share/{postId}`

### Respone
```json
{
  "message": "Share post URL successfully",
  "shareableUrl": "https://example.com/posts/{postId}"
}
```

## Report violated post
Endpoint: `http://localhost:[port]/api/feed/report/{postId}`

### Request
```json
{
  "reason": "Reported reason"
}
```

### Response
```json
{
    "message": "Post has been reported",
    "reportedPost": {
        "postId": "postId",
        "reporter": "userId",
        "adminDecision": "pending",
        "reportReason": "Reported reason",
        "reportedAt": "2023-12-21T12:34:06.875Z",
        "_id": "reportedPost._id",
        "__v": 0
    }
}

