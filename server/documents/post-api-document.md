## Create post

Endpoint: `http://localhost:[port]/api/feed/post`

### Purpose:
The createPost function servers the purpose of allowing users to create post within an API system. It accepts post details like title, content or image. The API system will validate the available of hash tags and valid image file extensions before creating the post. If all conditions are met, the post will be created successfully.

### Request

- Method: POST
- Headers: Content-Type: application/json (or as appropriate for your API)
- Authorization: Bearer [token] (if authentication is required)
-Body: JSON object containing the follwing fields:
  - `title` (string, required): Title of the post,
  - `content` (string, required): Content of the post, must have hash tags (at least one character)
  - `image` (string): Post's image, can be uploaded via form data
### Example input
```json
{
    "title": "Example Post",
    "content": "Lorem ipsum ...",
    "image": "image_file"
}
```


### Success Respone
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
### Error Response
- Missing hash tag or not enough characters
```json 
{
{
  "status": "error",
  "message": "Validation failed, enterted data is not correct"
}
}
```

### Notes:
- `201 Created`: Successfully created post
- `422 Unprocessable Entity`: Missing required field or entered data is invalid
- `500 Internal Server Error`: Unexpected server-side issues during creation.


### Get Posts
Endpoint: `http://localhost:[port]/api/feed/posts?page=number`
### Purpose:
The getPosts function retrieves a paginated list of posts from the feed within the API system. It enables users or developers to fetch posts based on the specified page number.

### Request
- Method: GET
- Headers: Content-Type: application/json (or as appropriate for your API)
- Authorization: Bearer [token] (if authentication is required)
- Query Parameters: page (integer, optional): Specifies the page number of posts to retrieve. Defaults to the first page if not provided.

### Example Input

### Success Response
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
### Error Respone
- Invalid page number
```json
{
  "status": "error",
  "message": "Invalid page number"
}
```

### Notes
- `200 OK`: Successful retrieval of posts for the specified page.
- `400 Bad Request`: Invalid page number provided or other request issues.
- `500 Internal Server Error`: Unexpected server-side issues during retrieval.




## Get a single post

Endpoint: `http:/localhost:[port]/api/feed/post/{postId}`
### Purpose
This endpoint allows users to retrieve a single post based on its unique identifier (postId).

### Request
- Method: GET,
- Headers: Content-Type: application/json (or as appropriate for your API)
- Parameters: `postId` The unique identifier of the post to be fetched.
### Success Respone
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
### Error Response
- Couldn't find post due to invalid post ID
```json
{
  "status": "error",
  "message": "Could not find post"
}
```

### Notes
- `200 OK`: The post was successfully retrieved.
- `404 Not Found`:  The specified post was not found.
- `500 Internal Server Error`: Unexpected server-side issues during retrieval.

## Update a post
Endpoint: `http:/localhost:[port]/api/feed/post/{postId}`
### Purpose
This endpoint allows users to update the details of a specific post identified by its unique identifier `postId`.

### Request
- Method: PUT
- Headers: Content-Type: application/json (or as appropriate for your API)
- Parameters:
 - postId: The unique identifier of the post to be updated.
- Body: A JSON object containing the updated fields:
 - title (string, optional): The new title for the post.
 - content (string, optional): The updated content for the post.
 - image (string, optional): The new image file for the post.

### Example Input

### Request 

```json
{
  "title": "Updated Title",
  "content": "New content...",
  "image": "new_image_file"
}
```

### Success Respone

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

### Error Response
- Post ID is not valid
```json
{
  "status": "error",
  "message": "Could not find post"
}
```
- Invalid input conditions
```json
{
  "status": "error",
  "message": "Validation failed, enterted data is not correct"
}
```
- Not authorized to update the post
```json
{
  "status": "error",
  "message": "Not authorized"
}
```

### Notes
- `200 OK`: The post was successfully updated.
- `404 Not Found`: The post was not found.
- `500 Internal Server Error`: Unexpected server-side issues during update.

### Delete a post
Endpoint: `http:/localhost:[port]/api/feed/post/{postId}`

### Purpose
This endpoint enables users to delete a specific post using its unique identifier `postId`.

### Request
Request
- Method: DELETE
- Parameters:
  - postId: The unique identifier of the post to be deleted.
### Example Response
### Success Respone

```json
{
    "message": "Delete post successfully"
}
```
### Error Response
- Post ID is not valid
```json
{
  "status": "error",
  "message": "Could not find post"
}
```
- Not authorized to delete post
```json 
{
  "status": "error",
  "message": "Not authorized"
}
```
## Note
- `200 OK`: The post was successfully deleted.
- `404 Not Found`: The post was not found
- `403 Forbidden`: User is not authorized to delete the post
- `500 Internal Server Error`: Unexpected server-side issues during delete.
## Get Liked Users for a Post

Endpoint: `http:/localhost:[port]/api/feed/like/{postId}`

### Purpose
his endpoint retrieves the list of users who have liked a specific post identified by `postId`.
### Request
- Parameters:
  - postId: The unique identifier of the post to get liked users.
### Response

### Success Respone

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

