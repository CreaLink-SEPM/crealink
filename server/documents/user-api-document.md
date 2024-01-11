## Register User

Endpoint: `http:/localhost:[port]/api/user/register`

### Purpose:

The registerUser function serves the purpose of allowing new user registrations within an API system. It accepts user details like email, username, password, and name, performs validations, checks for existing entries in the database, and creates a new user if all conditions are met.

### Request

- Method: POST
- Headers: Content-Type: application/json
- Body: JSON object containing the following fields:
  - `email` (string, required): User's email address.
  - `username` (string, required): Desired username for the user.
  - `password` (string, required): User's chosen password (at least 6 characters).
  - `name` (string, required): User's full name.
  - `confirmedPassword` (string, required): Confirmation of the password.

### Example Input

```json
{
  "email": "user@example.com",
  "username": "example_user",
  "password": "password123",
  "name": "John Doe",
  "confirmedPassword": "password123"
}
```

### Success Response

```json
{
  "status": "success",
  "message": "User successfully created",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "username": "example_user",
    "email": "user@example.com",
    "isAdmin": false
    // Other user details
  }
}
```

### Error Responses

- Invalid Email Format

  ```json
  {
    "status": "error",
    "message": {
      "error": {
        "email": "Invalid email format"
      }
    }
  }
  ```

- Existing Email or Username

  ```json
  {
    "status": "error",
    "message": {
      "error": {
        "email": "The email is already in use"
        // OR
        "username": "The username is already in use"
      }
    }
  }
  ```

- Password Validation Error

  ```json
  {
    "status": "error",
    "message": {
      "error": {
        "password": "Password should be at least 6 characters long"
        // OR
        "confirmedPassword": "Passwords do not match"
      }
    }
  }
  ```

- Missing Required Fields
  ```json
  {
    "status": "error",
    "message": {
      "error": {
        "email": "The email is required",
        "username": "The username is required",
        "password": "The password is required",
        "name": "The name is required",
        "confirmedPassword": "The confirmed password is required"
      }
    }
  }
  ```

### Notes

- `400 Bad Request`: Invalid or missing input data.
- `500 Internal Server Error`: Unexpected server-side issues during user creation.

---

## Login User

Endpoint: `http:/localhost:[port]/api/user/login`

### Purpose:

The `loginUser` function serves the purpose of authenticating users for access within an API system. It validates the provided email and password against existing records, generates access and refresh tokens upon successful authentication, and handles various error scenarios.

### Request

- Method: POST
- Headers: Content-Type: application/json
- Body: JSON object containing the following fields:
  - `email` (string, required): User's registered email address.
  - `password` (string, required): User's password associated with the email.

### Example Input

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "status": "success",
  "message": "Login successful",
  "accessToken": "generated_access_token",
  "refreshToken": "generated_refresh_token"
}
```

### Error Responses

- Missing Email or Password

  ```json
  {
    "status": "error",
    "message": "Both email and password are required fields"
  }
  ```

- Invalid Email or Password
  ```json
  {
    "status": "error",
    "message": "Invalid email or password"
  }
  ```

### Notes

- `400 Bad Request`: Missing required input data.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: Unexpected server-side issues during login.

---

## Logout User

Endpoint: `http:/localhost:[port]/api/user/logout`

### Purpose:

The `logoutUser` function serves the purpose of terminating a user's active session within an API system. It clears the user's refresh tokens, ensuring immediate invalidation of authentication, and responds with a success message upon successful logout.

### Request

- Method: POST

### Success Response

```json
{
  "status": "OK",
  "message": "User logged out successfully"
}
```

### Notes

- `200 OK`: Successful logout.
- `500 Internal Server Error`: Unexpected server-side issues during logout.

---

## Get User by Username

Endpoint: `http:/localhost:[port]/api/user/get-user/:username`

### Purpose:

The `getUser` function retrieves user information based on the provided username within an API system.

### Request

- Method: GET
- Path Parameters:
  - `username` (string, required): Username of the user to retrieve.

### Example URL

```
http:/localhost:[port]/api/user/get-user/example_username
```

### Success Response

```json
{
  "status": "success",
  "data": {
    "_id": "user_id",
    "name": "User's Name",
    "email": "user@example.com",
    "username": "example_username"
    // Other user details
  }
}
```

### Error Responses

- Missing Username

  ```json
  {
    "status": "error",
    "message": "Username is required"
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

- `200 OK`: Successful retrieval of user details.
- `400 Bad Request`: Missing required input data.
- `404 Not Found`: User with the provided username does not exist.
- `500 Internal Server Error`: Unexpected server-side issues during retrieval.

---

## Get All Users

Endpoint: `http:/localhost:[port]/api/user/get-all-users`

### Purpose:

The `getAllUsers` function retrieves all user information within an API system, excluding sensitive data like passwords.

### Request

- Method: GET

### Success Response

```json
{
  "status": "success",
  "data": [
    {
      "_id": "user_id_1",
      "name": "User 1's Name",
      "email": "user1@example.com",
      "username": "user1"
      // Other user details (password excluded)
    },
    {
      "_id": "user_id_2",
      "name": "User 2's Name",
      "email": "user2@example.com",
      "username": "user2"
      // Other user details (password excluded)
    }
    // Other users...
  ]
}
```

### Error Responses

- Server Error
  ```json
  {
    "status": "error",
    "message": "Internal Server Error: Please try again later"
  }
  ```

### Notes

- `200 OK`: Successful retrieval of all user details.
- `500 Internal Server Error`: Unexpected server-side issues during retrieval.

---

## Search Users

Endpoint: `http:/localhost:[port]/api/user/search-user`

### Purpose:

The `searchUser` function allows users to search for other users based on username or name within an API system.

### Request

- Method: GET
- Query Parameters:
  - `searchQuery` (string, required): Search query for username or name.

### Example URL

```
http:/localhost:[port]/api/user/search-user?searchQuery=query_here
```

### Success Response

```json
{
  "status": "success",
  "data": [
    {
      "_id": "user_id_1",
      "username": "user1",
      "name": "User 1's Name",
      "email": "user1@example.com",
      "image": "user1_image_url",
      "followers": 10,
      "follower_images": ["follower1_image_url", "follower2_image_url"],
      "is_verified": true
      // Other user details
    },
    {
      "_id": "user_id_2",
      "username": "user2",
      "name": "User 2's Name",
      "email": "user2@example.com",
      "image": "user2_image_url",
      "followers": 5,
      "follower_images": ["follower3_image_url"],
      "is_verified": false
      // Other user details
    }
    // Other users...
  ]
}
```

### Error Responses

- Missing Search Query

  ```json
  {
    "status": "error",
    "message": "Search query is required"
  }
  ```

- No Users Found
  ```json
  {
    "status": "error",
    "message": "No users found"
  }
  ```

### Notes

- `200 OK`: Successful retrieval of users matching the search query.
- `400 Bad Request`: Missing required search query parameter.
- `404 Not Found`: No users found based on the search query.
- `500 Internal Server Error`: Unexpected server-side issues during search.

---

## Get Followers by User ID

Endpoint: `http:/localhost:[port]/api/user/get-followers/:user_id`

### Purpose:

The `getFollowers` function retrieves followers of a specific user based on their user ID within an API system.

### Request

- Method: GET
- Path Parameters:
  - `user_id` (string, required): User ID to fetch followers.

### Example URL

```
http:/localhost:[port]/api/user/get-followers/user_id_here
```

### Success Response

```json
{
  "status": "success",
  "data": [
    {
      "username": "follower1_username",
      "name": "Follower 1's Name"
    },
    {
      "username": "follower2_username",
      "name": "Follower 2's Name"
    }
    // Other followers...
  ]
}
```

### Error Responses

- Missing User ID

  ```json
  {
    "status": "error",
    "message": "User ID is required"
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

- `200 OK`: Successful retrieval of followers for the specified user.
- `400 Bad Request`: Missing required user ID parameter.
- `404 Not Found`: User with the provided ID not found.
- `500 Internal Server Error`: Unexpected server-side issues during retrieval.

---

## Get Following by User ID

Endpoint: `http:/localhost:[port]/api/user/get-following/:user_id`

### Purpose:

The `getFollowing` function retrieves the users that a specific user is following based on their user ID within an API system.

### Request

- Method: GET
- Path Parameters:
  - `user_id` (string, required): User ID to fetch followed users.

### Example URL

```
http:/localhost:[port]/api/user/get-following/user_id_here
```

### Success Response

```json
{
  "status": "success",
  "data": [
    {
      "username": "following_user1_username",
      "name": "Following User 1's Name"
    },
    {
      "username": "following_user2_username",
      "name": "Following User 2's Name"
    }
    // Other followed users...
  ]
}
```

### Error Responses

- Missing User ID

  ```json
  {
    "status": "error",
    "message": "User ID is required"
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

- `200 OK`: Successful retrieval of followed users for the specified user.
- `400 Bad Request`: Missing required user ID parameter.
- `404 Not Found`: User with the provided ID not found.
- `500 Internal Server Error`: Unexpected server-side issues during retrieval.

---

## Follow User

Endpoint: `http:/localhost:[port]/api/user/follow-user/:user_id`

### Purpose:

The `followUser` function allows a user to follow another user based on their user ID within an API system.

### Request

- Method: POST
- Path Parameters:
  - `user_id` (string, required): User ID to follow.
- Body Parameters:
  - `userId` (string, required): User ID of the user initiating the follow action.

### Example URL

```
http:/localhost:[port]/api/user/follow-user/user_id_here
```

### Example Body

```json
{
  "userId": "initiating_user_id_here"
}
```

### Success Response

```json
{
  "status": "success",
  "message": "Successfully followed user",
  "data": {
    "userToFollow": {
      // User details of the user being followed
      "_id": "user_id",
      "username": "username",
      "name": "User's Name"
      // Other user details
    }
  }
}
```

### Error Responses

- Missing User ID to Follow

  ```json
  {
    "status": "error",
    "message": "User ID to follow is required"
  }
  ```

- User Not Found

  ```json
  {
    "status": "error",
    "message": "User not found"
  }
  ```

- Already Following
  ```json
  {
    "status": "error",
    "message": "You are already following this user"
  }
  ```

### Notes

- `200 OK`: Successful follow action performed.
- `400 Bad Request`: Missing required user ID parameter.
- `404 Not Found`: User with the provided ID not found.
- `500 Internal Server Error`: Unexpected server-side issues during the follow action.

---

## Unfollow User

Endpoint: `http:/localhost:[port]/api/user/unfollow-user/:user_id`

### Purpose:

The `unfollowUser` function allows a user to unfollow another user based on their user ID within an API system.

### Request

- Method: POST
- Path Parameters:
  - `user_id` (string, required): User ID to unfollow.
- Body Parameters:
  - `userId` (string, required): User ID of the user initiating the unfollow action.

### Example URL

```
http:/localhost:[port]/api/user/unfollow-user/user_id_here
```

### Example Body

```json
{
  "userId": "initiating_user_id_here"
}
```

### Success Response

```json
{
  "status": "success",
  "message": "Successfully unfollowed user",
  "data": {
    "userToUnfollow": {
      // User details of the user who was unfollowed
      "_id": "user_id",
      "username": "username",
      "name": "User's Name"
      // Other user details
    }
  }
}
```

### Error Responses

- Missing User ID to Unfollow

  ```json
  {
    "status": "error",
    "message": "User ID to unfollow is required"
  }
  ```

- User Not Found

  ```json
  {
    "status": "error",
    "message": "User not found"
  }
  ```

- Not Following
  ```json
  {
    "status": "error",
    "message": "You are not following this user"
  }
  ```

### Notes

- `200 OK`: Successful unfollow action performed.
- `400 Bad Request`: Missing required user ID parameter.
- `404 Not Found`: User with the provided ID not found.
- `500 Internal Server Error`: Unexpected server-side issues during the unfollow action.

---

## Get User Profile

Endpoint: `http:/localhost:[port]/api/user/profile`

### Purpose:

The `profileUser` function retrieves the profile of a user based on their username within an API system.

### Request

- Method: GET
- Query Parameters:
  - `username` (string, required): Username of the user to fetch profile details.

### Example URL

```
http:/localhost:[port]/api/user/profile?username=username_here
```

### Success Response

```json
{
  "status": "success",
  "data": {
    "_id": "user_id",
    "username": "username",
    "name": "User's Name",
    "email": "user@example.com",
    "image": "user_image_url",
    "followers": 100,
    "following": 50,
    "is_verified": true,
    "isAdmin": false,
    "posts": [
      {
        // Post details
      },
      {
        // Another post details
      }
      // Other posts...
    ]
  }
}
```

### Error Responses

- Missing Username

  ```json
  {
    "status": "error",
    "message": "Username is required"
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

- `200 OK`: Successful retrieval of the user's profile details.
- `400 Bad Request`: Missing required username parameter.
- `404 Not Found`: User with the provided username not found.
- `500 Internal Server Error`: Unexpected server-side issues during profile retrieval.

---

## Upload Avatar

Endpoint: `http:/localhost:[port]/api/user/upload-avatar/:userID` (POST)

### Purpose:

Uploads a new avatar image for the user.

### Request

- Method: POST
- Headers: `Authorization: Bearer [token]`
- Body: Form-data with a file field named `avatar`

### Success Response

```json
{
  "message": "Avatar uploaded successfully",
  "notification": "Profile update successful.",
  "user": {
    // Updated user details including the new avatar URL
  }
}
```

### Error Responses

- No File Uploaded

  ```json
  {
    "message": "No file uploaded"
  }
  ```

- Internal Server Error
  ```json
  {
    "message": "Internal server error message here"
  }
  ```

---

## Update Avatar

Endpoint: `http:/localhost:[port]/api/user/avatar` (PUT)

### Purpose:

Updates the user's avatar image.

### Request

- Method: PUT
- Headers: `Authorization: Bearer [token]`
- Body: Form-data with a file field named `image` 

### Success Response

```json
{
  "message": "Avatar updated successfully",
  "user_image": "updated_avatar_url_here"
}
```

### Error Responses

- User Not Found

  ```json
  {
    "message": "User not found"
  }
  ```

- Internal Server Error
  ```json
  {
    "message": "Internal server error message here"
  }
  ```

---

## Delete Avatar

Endpoint: `http:/localhost:[port]/api/user/avatar` (DELETE)

### Purpose:

Deletes the user's avatar image.

### Request

- Method: DELETE
- Headers: `Authorization: Bearer [token]`

### Success Response

```json
{
  "message": "Avatar deleted successfully"
}
```

### Error Responses

- User Not Found

  ```json
  {
    "message": "User not found"
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
