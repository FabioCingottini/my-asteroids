import {Validators} from "@/utils/validators";

export async function fetchAsteroids(start_date: string, end_date: string) {
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${process.env.NASA_API_KEY}`
  );

  if (!response.ok) {
    console.error(response, await response.text());
    throw new Error('Failed to fetch data from NASA API');
  }

  const json = await response.json();
  const validation = Validators.nasaResponseAsteroidsApi.safeParse(json);
  if (!validation.success) {
    throw new Error('Failed to parse NASA API response');
  }

  return validation.data;
}
