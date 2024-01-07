import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  const query = request.nextUrl.searchParams.get('query');
  try {
    const response = await fetch(`http://54.169.199.32:5000/api/user/search-user?searchQuery=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const users = await response.json();

    return NextResponse.json({ status: 200, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }    

}
