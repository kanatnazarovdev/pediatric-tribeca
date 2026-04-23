import { NextResponse } from 'next/server';

export async function GET() {
  const PLACE_ID = 'ChIJG0WihFFbwokRMASy3Kmu6Ss'; 
  const API_KEY = "AIzaSyDZvkuB9PQa9z_GLSZD_FBuIbAUWWTjHRg";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Google API Response Status:", data.status);

    if (data.status !== "OK") {
      return NextResponse.json({ error: data.error_message || data.status }, { status: 400 });
    }

    return NextResponse.json(data.result.reviews || []);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}