import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const response = await fetch('https://crealink.khangtgr.com/api/feed/savedPosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user?.accessToken}`, // Assuming your access token is stored in the session
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch saved posts. Status: ${response.status}`);
    }

    const savedPosts = await response.json();

    return NextResponse.json({ status: 200, data: savedPosts });
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
}