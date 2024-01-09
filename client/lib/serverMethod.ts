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
  }