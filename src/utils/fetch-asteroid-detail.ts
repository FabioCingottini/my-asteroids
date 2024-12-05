import {Validators} from "@/utils/validators";

export async function fetchAsteroidDetail(id: string) {
  const url = `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${process.env.NASA_API_KEY}`
  const response = await fetch(url);

  if (!response.ok) {
    console.error(url, response, await response.text());
    throw new Error('Failed to fetch data from NASA API');
  }

  const json = await response.json();
  const validation = Validators.nasaResponseAsteroidDetailApi.safeParse(json);
  if (!validation.success) {
    console.error(url, validation.error);
    throw new Error('Failed to parse NASA API response');
  }

  return validation.data;
}
