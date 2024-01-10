import Env from "@/config/env";
import { headers } from "next/headers";


const apiBaseUrl = Env.APP_URL_SERVER;


// SHOW USER WITH POSTS AND FOLLOWERS
export async function fetchUsers(id: number) {
  const res = await fetch(`${apiBaseUrl}/api/user/get-user/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response?.data;
}


export async function searchUser(query: string) {
    try {
      const res = await fetch(`${apiBaseUrl}/api/user/search-user?searchQuery=${query}`, {
        cache: "no-cache",
        headers: headers(),
        method: "GET",
      });
  
      if (!res.ok) {
        if (res.status === 404) {
            console.log("No users found.");
            return []; // or return whatever makes sense for your application
          }
        const errorResponse = await res.json();
        console.error("Error fetching user data. Server response:", errorResponse);
        throw new Error(`Failed to fetch user data. Status: ${res.status}`);
      }
  
      const response = await res.json();
      return response?.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Internal Server Error");
    }
  };



  export async function fetchPosts(page: number) {
    try {
      const res = await fetch(`${apiBaseUrl}/api/feed/posts?page=${page}`, {
        cache: "no-cache",
        headers: headers(),
      });

      if (!res.ok) {
        // Log the actual error response
        const errorResponse = await res.json();
        console.error("Server response:", errorResponse);

        // Handle specific error scenarios
        if (res.status === 404) {
            console.error("Posts not found for the requested page.");
            return []; // or handle this scenario as appropriate for your application
        }

        const errorMessage = `Failed to fetch post data. Status: ${res.status}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
  
      const response = await res.json();
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
      
    } catch (error) {
      console.error("Fetch Posts Error:", error);
      throw new Error("Internal Server Error");
    }
}

