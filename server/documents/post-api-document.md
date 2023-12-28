Absolutely, here's the API documentation for the Post-related endpoints:

---

## Create Post

Endpoint: `http:/localhost:[port]/api/user/post` (POST)

### Purpose:

Creates a new post with a title, content, and an optional image.

### Request

- Method: POST
- Headers: `Authorization: Bearer [token]`
- Body: Form-data with fields:
  - `title` (string, required): Title of the post.
  - `content` (string, required): Content of the post.
  - `image` (file, optional): Image to be attached to the post.

### Success Response

```json
{
  "message": "Post created successfully",
  "posts": {
    "_id": "post_id",
    "title": "Post Title",
    "content": "Post Content",
    "imageUrl": "image_url_here",
    "creator": {
      "_id": "user_id",
      "name": "Username"
    }
  },
  "creator": {
    "_id": "user_id",
    "name": "Username"
  }
}
```

### Error Responses

- Validation Failed

    ```json
    {
      "message": "Validation failed, entered data is not correct"
    }
    ```

- User Not Found

    ```json
    {
      "message": "User not found",
      "status": "error"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Get Posts

Endpoint: `http:/localhost:[port]/api/user/posts` (GET)

### Purpose:

Retrieves a paginated list of posts.

### Request

- Method: GET
- Headers: `Authorization: Bearer [token]`
- Query Parameters:
  - `page` (optional): Page number for pagination (default: 1)

### Success Response

```json
{
  "message": "Fetched posts successfully",
  "posts": [
    {
      "_id": "post_id",
      "title": "Post Title",
      "content": "Post Content",
      "imageUrl": "image_url_here",
      "creator": {
        "username": "Creator_Username"
      },
      "likesCount": 5
    },
    {
      "_id": "post_id",
      "title": "Post Title",
      "content": "Post Content",
      "imageUrl": "image_url_here",
      "creator": {
        "username": "Creator_Username"
      },
      "likesCount": 8
    },
    // Additional posts...
  ]
}
```

### Error Responses

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Get Post by ID

Endpoint: `http:/localhost:[port]/api/user/post/:postId` (GET)

### Purpose:

Fetches a specific post by its unique identifier.

### Request

- Method: GET
- Headers: `Authorization: Bearer [token]`
- URL Parameters:
  - `postId` (required): Unique ID of the post to retrieve

### Success Response

```json
{
  "message": "Post fetched successfully",
  "post": {
    "_id": "post_id",
    "title": "Post Title",
    "content": "Post Content",
    "imageUrl": "image_url_here",
    "creator": {
      "username": "Creator_Username"
    },
    "likesCount": 8
  }
}
```

### Error Responses

- Post Not Found
    ```json
    {
      "message": "Could not find post"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Get Users Who Liked a Post

Endpoint: `http:/localhost:[port]/api/user/like/:postId` (GET)

### Purpose:

Retrieves the list of users who liked a specific post identified by its unique ID.

### Request

- Method: GET
- Headers: `Authorization: Bearer [token]`
- URL Parameters:
  - `postId` (required): Unique ID of the post to retrieve likes for

### Success Response

```json
{
  "message": "Fetched liked users successfully",
  "post": {
    "likedUsers": [
      { "username": "user1" },
      { "username": "user2" },
      { "username": "user3" }
    ]
  }
}
```

### Error Responses

- Post Not Found
    ```json
    {
      "message": "Could not find post"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Update Post

Endpoint: `http:/localhost:[port]/api/user/post/:postId` (PUT)

### Purpose:

Updates the details of a specific post identified by its unique ID.

### Request

- Method: PUT
- Headers: `Authorization: Bearer [token]`
- URL Parameters:
  - `postId` (required): Unique ID of the post to update
- Body:
  - `title` (string, required): Title of the post.
  - `content` (string, required): Content of the post.
  - `image` (string): Image URL for the post (optional).

### Success Response

```json
{
  "message": "Post updated successfully",
  "post": {
    "_id": "post_id",
    "title": "Updated Title",
    "content": "Updated content",
    "imageUrl": "https://updated-image-url.com",
    // Other post details
  }
}
```

### Error Responses

- Post Not Found
    ```json
    {
      "message": "Could not find post"
    }
    ```

- Validation Error
    ```json
    {
      "message": "Validation failed, entered data is not correct"
    }
    ```

- Not Authorized
    ```json
    {
      "message": "Not authorized"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Share Post

Endpoint: `http:/localhost:[port]/api/user/share/:postId` (GET)

### Purpose:

Generates a shareable URL for a specific post identified by its unique ID.

### Request

- Method: GET
- Headers: `Authorization: Bearer [token]`
- URL Parameters:
  - `postId` (required): Unique ID of the post to share

### Success Response

```json
{
  "message": "Share post URL successfully",
  "shareableUrl": "https://your-domain.com/posts/post_id"
}
```

### Error Responses

- Post Not Found
    ```json
    {
      "message": "Could not find post"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Toggle Like on Post

Endpoint: `http:/localhost:[port]/api/user/like/:postId` (PUT)

### Purpose:

Enables a user to toggle their like status on a specific post identified by its unique ID.

### Request

- Method: PUT
- Headers: `Authorization: Bearer [token]`
- URL Parameters:
  - `postId` (required): Unique ID of the post to like/unlike

### Success Response

#### If Liked:
```json
{
  "message": "Successfully liked the post"
}
```

#### If Unliked:
```json
{
  "message": "Successfully unliked the post"
}
```

### Error Responses

- Post Not Found
    ```json
    {
      "message": "Could not find post"
    }
    ```

- User Not Found
    ```json
    {
      "message": "User not found",
      "status": "error"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Delete Post

Endpoint: `http:/localhost:[port]/api/user/post/:postId` (DELETE)

### Purpose:

Allows an authenticated user to delete their own post by its unique ID.

### Request

- Method: DELETE
- Headers: `Authorization: Bearer [token]`
- URL Parameters:
  - `postId` (required): Unique ID of the post to delete

### Success Response

```json
{
  "message": "Delete post successfully"
}
```

### Error Responses

- Post Not Found
    ```json
    {
      "message": "Could not find post"
    }
    ```

- Not Authorized
    ```json
    {
      "message": "Not authorized"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

## Report Post

Endpoint: `http:/localhost:[port]/api/user/report/:postId` (POST)

### Purpose:

Enables users to report a post based on its unique ID.

### Request

- Method: POST
- Headers: `Authorization: Bearer [token]`
- URL Parameters:
  - `postId` (required): Unique ID of the reported post

### Success Response

```json
{
  "message": "Post reported successfully"
}
```

### Error Responses

- Post Not Found
    ```json
    {
      "message": "Could not find post"
    }
    ```

- Internal Server Error
    ```json
    {
      "message": "Internal server error message here"
    }
    ```

---

Modify placeholders like `[port]` and customize error messages or additional details as required before adding this template to your API documentation.
This document outlines the endpoints available in the User API, their respective request and response formats based on the provided code snippets. Adjustments might be necessary to include specific details like headers or authentication tokens as required.
