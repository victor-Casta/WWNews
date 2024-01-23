import { config as dotenvConfig } from 'dotenv';
import path from 'path';

dotenvConfig({ path: path.resolve(__dirname, '../.env') });

const API_KEY: string | undefined = process.env.API_KEY;

if (!API_KEY) {
  console.error('API_KEY not found in environment variables');
  process.exit(1);
}

const url = 'https://newsnow.p.rapidapi.com/';

interface RequestOptions {
  method: string;
  headers: {
    'content-type': string;
    'X-RapidAPI-Key': string;
    'X-RapidAPI-Host': string;
  };
  body: string;
}

const requestBody = {
  text: 'Europe',
  region: 'wt-wt',
  max_results: 25,
};

const options: RequestOptions = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'newsnow.p.rapidapi.com',
  },
  body: JSON.stringify(requestBody),
};

const getData = async (): Promise<void> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
};


getData();
