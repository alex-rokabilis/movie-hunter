import { OpaqueToken } from '@angular/core';

export interface AppConfig {
  traktApiEndpoint: string;
  tmdbApiEndpoint: string;
  tmdbApiBackdropEndpoint:string;
  tmdbApiPosterEndpoint:string;
  title: string;
}

export const config: AppConfig = {
  traktApiEndpoint: 'https://api.trakt.tv',
  tmdbApiEndpoint: 'https://api.themoviedb.org/3',
  tmdbApiBackdropEndpoint: 'http://image.tmdb.org/t/p/w780',
  tmdbApiPosterEndpoint: 'http://image.tmdb.org/t/p/w500',
  title: 'Movie Hunter'
};


export let APP_CONFIG = new OpaqueToken('app.config');