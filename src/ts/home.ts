import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

dotenvConfig({ path: '/.env' });

interface RequestOptions extends AxiosRequestConfig {
  params: {
    languages: string;
    search: string;
  };
}

const API_KEY: string | undefined = process.env.API_KEY;
const API_HOST: string | undefined = process.env.API_HOST;

if (!API_KEY || !API_HOST) {
  console.error('API_KEY or API_HOST not found in environment variables');
  process.exit(1);
}

const options: RequestOptions = {
  method: 'GET',
  url: 'https://news67.p.rapidapi.com/v2/topic-search',
  params: {
    languages: 'en',
    search: 'sports',
  },
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
};

const getData = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getData();
