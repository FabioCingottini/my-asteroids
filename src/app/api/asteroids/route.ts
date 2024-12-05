import {NextResponse} from 'next/server';
import {fetchAsteroids} from "@/utils/fetch-asteroids";

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');

  if (!start_date || !end_date) {
    return NextResponse.json({error: 'start_date and end_date are required'}, {status: 400});
  }

  try {
    const data = await fetchAsteroids(start_date, end_date);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Failed to fetch asteroids'}, {status: 500});
  }
}
