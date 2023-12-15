# User API

## Register User

Endpoint: `http:/localhost:[port]/api/user/register`

### Request

```json
{
  "email": "user@example.com",
  "username": "example_user",
  "password": "password123",
  "name": "John Doe",
  "confirmedPassword": "password123"
}
```

### Response

```json
{
  "email": "user@example.com",
  "username": "example_user",
  "password": "password123",
  "name": "John Doe",
  "confirmedPassword": "password123"
}
```

## Login User

Endpoint: `http:/localhost:[port]/api/user/login`

### Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "status": "success",
  "message": "Login successful",
  "accessToken": "access_token",
  "refreshToken": "refresh_token"
}
```

## Logout User

Endpoint: `http:/localhost:[port]/api/user/logout`

### Request

No request body required.

### Response

```json
{
  "status": "OK",
  "message": "User logged out successfully"
}
```

## Refresh Token

Endpoint: `http:/localhost:[port]/api/user/refresh-token`

### Request

```json
{
  "refreshToken": "refresh_token"
}
```

### Response

```json
{
  "status": "success",
  "accessToken": "new_access_token"
}
```

## Get User by Username

Endpoint: `http:/localhost:[port]/api/user/get-user/:username`

### Response

```json
{
  "status": "success",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "username": "example_user"
  }
}
```

## Get All Users

Endpoint: `http:/localhost:[port]/api/user/get-all-users`

### Request

No request body required.

### Response

```json
{
  "status": "success",
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "user@example.com",
      "username": "example_user"
    }
    // More users...
  ]
}
```

## Search User

Endpoint: `http:/localhost:[port]/api/user/search-user/:searchQuery`

### Response

```json
{
  "status": "success",
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "user@example.com",
      "username": "example_user"
    }
    // More matching users...
  ]
}
```

## Get Followers

Endpoint: `http:/localhost:[port]/api/user/get-followers/:user_id`

### Response

```json
{
  "status": "success",
  "data": [
    {
      "_id": "follower_user_id",
      "name": "Follower Name",
      "username": "follower_username"
    }
    // More followers...
  ]
}
```

## Get Following

Endpoint: `http:/localhost:[port]/api/user/get-following/:user_id`

### Response

```json
{
  "status": "success",
  "data": [
    {
      "_id": "following_user_id",
      "name": "Following Name",
      "username": "following_username"
    }
    // More followed users...
  ]
}
```

## Follow User

Endpoint: `http:/localhost:[port]/api/user/follow-user/:user_id`

### Request

```json
{
  "userId": "current_user_id"
}
```

### Response

```json
{
  "status": "success",
  "message": "Successfully followed user",
  "data": {
    "userToFollow": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "user@example.com",
      "username": "example_user"
    }
  }
}
```

## Unfollow User

Endpoint: `http:/localhost:[port]/api/user/unfollow-user/:user_id`

### Request

```json
{
  "userId": "current_user_id"
}
```

### Response

```json
{
  "status": "success",
  "message": "Successfully unfollowed user",
  "data": {
    "userToUnfollow": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "user@example.com",
      "username": "example_user"
    }
  }
}
```

#

This document outlines the endpoints available in the User API, their respective request and response formats based on the provided code snippets. Adjustments might be necessary to include specific details like headers or authentication tokens as required.
