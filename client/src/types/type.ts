type AuthStateType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  confirmedPassword?: string;
};

type AuthErrorType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email?: string;
  image?: string;
};


type PostType = {
  id: number;
  user_id: number;
  content: string;
  image?: string;
  comment_count: number;
  like_count: number;
  created_at: string;
  user: User;
  // Likes: Array<PostLikeType> | [];
};


type FollowerType = {
  _id: number;
  username: string;
  name: string;
  user_image: string;
};



type ShowUserType = {
  name: string;
  id: string;
  email: string;
  username: string;
  user_image: string;
  image: string;
  bio: string;
  followers: number;
  isFollowed: string;
  follower: Array<FollowerType> | [];
  posts:  [];
};


type savedPostType = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  creator?: [];
  comment_count: number;
  likesCount: number;
}

interface Follower {
  name: string;
  username: string;
  user_image: string;
  _id: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  creator: string;
  likes: string[]; // Assuming it's an array of user IDs
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserData {
  id: string;
  username: string;
  name: string;
  email: string;
  isAdmin: boolean;
  user_image: string;
  is_verified: boolean;
  followers: number;
  follower: Follower[];
  followings: number;
  following: any[]; // You can define a proper interface if needed
  posts: Post[];
  bio: string;
  isFollowed: boolean;
}

interface ApiResponse {
  status: string;
  data: UserData;
}