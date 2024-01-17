import Env from '@/config/env'
import { headers } from 'next/headers';

const apiBaseUrl = Env.APP_URL_SERVER;


// GET ALL LIKED POSTSexport async function fetchLikedPost() {
export async function fetchLikedPost() {

    const res = await fetch(`${apiBaseUrl}/api/feed/savedPosts`, {
      headers: {
        ...headers(),
      },
      method: 'GET',
      cache: 'no-cache',
    });

    console.log('Response Status:', res.status);

    if (!res.ok) {
      const errorMessage = `Failed to fetch liked posts. Status: ${res.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const response = await res.json();
    console.log('API Response:', response);

    return response!.data;
}

// SHOW USER WITH POSTS AND FOLLOWERS
export async function fetchUsers(id: number, authToken: string) {
  const res = await fetch(`${apiBaseUrl}/api/user/get-user/${id}`, {
    cache: 'no-cache',
    headers: {
      ...headers(),
      Authorization: `Bearer ${authToken}`, // Include the bearer token in the headers
    },
    method:'GET'
  });
  if (!res.ok) {
    throw new Error('Failed to fecth posts');
  }
  const response = await res.json();
  return response?.data;
}

export async function searchUser(query: string, authToken: string) {
  try {
    const res = await fetch(`${apiBaseUrl}/api/user/search-user?searchQuery=${query}`, {
      cache: 'no-cache',
      headers: {
        ...headers(),
        Authorization: `Bearer ${authToken}`, // Include the bearer token in the headers
      },
      method: 'GET',
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.log('No users found.');
        return []; // or return whatever makes sense for your application
      }
      const errorResponse = await res.json();
      console.error('Error fetching user data. Server response:', errorResponse);
      throw new Error(`Failed to fetch user data. Status: ${res.status}`);
    }

    const response = await res.json();
    return response?.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Internal Server Error');
  }
}


// GET NOTIFICATIONS
export async function fetchNotification (authToken: string) {
  const res = await fetch(`${apiBaseUrl}/api/user/get-user-notification/`, {
    cache: 'no-cache',
    headers: {
      ...headers(),
      Authorization: `Bearer ${authToken}`,
    },
    method:'GET'
  });
  if (!res.ok) {
    throw new Error('Failed to fecth posts');
  }
  const response = await res.json();
  return response?.data;
}