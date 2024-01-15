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
  id: number;
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
  follower: Array<FollowerType> | [];
  posts: Array<PostType> | [];
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
