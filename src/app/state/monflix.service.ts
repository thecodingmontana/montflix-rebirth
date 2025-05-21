import { computed, Injectable, signal } from '@angular/core';
import { sign } from 'crypto';
import { Poster } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonflixService {
  API_KEY = environment.tmdbApiKey;
  selectedGenre = signal<string>('');
  isLoadingPosters = signal<boolean>(false);
  posters = signal<Poster[]>([]);
  type = signal<'movie' | 'tv shows'>('movie');

  lists = signal([
    {
      type: 'movie',
      genres: [
        {
          key: 'trending',
          title: 'Trending',
          url: `/trending/movie/week?api_key=${this.API_KEY}&language=en-US`,
        },
        {
          key: 'top_rated',
          title: 'Top Rated',
          url: `/movie/top_rated?api_key=${this.API_KEY}&language=en-US`,
        },
        {
          key: 'action',
          title: 'Action',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=28`,
        },
        {
          key: 'comedy',
          title: 'Comedy',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=35`,
        },
        {
          key: 'crime',
          title: 'Crime',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=80`,
        },
        {
          key: 'animation',
          title: 'Animation',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=16`,
        },
        {
          key: 'horror',
          title: 'Horror',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=27`,
        },
        {
          key: 'thriller',
          title: 'Thriller',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=53`,
        },
        {
          key: 'documentary',
          title: 'Documentary',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=99`,
        },
        {
          key: 'drama',
          title: 'Drama',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=18`,
        },
        {
          key: 'family',
          title: 'Family',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10751`,
        },
        {
          key: 'romance',
          title: 'Romance',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10749`,
        },
        {
          key: 'mystery',
          title: 'Mystery',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=9648`,
        },
        {
          key: 'sci_fi',
          title: 'Sci-Fi',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=878`,
        },
        {
          key: 'western',
          title: 'Western',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=37`,
        },
        {
          key: 'tv',
          title: 'TV Movie',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10770`,
        },
        {
          key: 'war',
          title: 'War',
          url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10752`,
        },
      ],
    },
    {
      type: 'tv shows',
      genres: [
        {
          key: 'trending',
          title: 'Trending',
          url: `/trending/tv/week?api_key=${this.API_KEY}&language=en-US`,
        },
        {
          key: 'top_rated',
          title: 'Top Rated',
          url: `/tv/top_rated?api_key=${this.API_KEY}&language=en-US`,
        },
        {
          key: 'action',
          title: 'Action',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=10759`,
        },
        {
          key: 'comedy',
          title: 'Comedy',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=35`,
        },
        {
          key: 'crime',
          title: 'Crime',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=80`,
        },
        {
          key: 'animation',
          title: 'Animation',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=16`,
        },
        {
          key: 'mystery',
          title: 'Mystery',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=9648`,
        },
        {
          key: 'sci_fi',
          title: 'Sci-Fi',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=10765`,
        },
        {
          key: 'western',
          title: 'Western',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=37`,
        },
        {
          key: 'documentary',
          title: 'Documentary',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=99`,
        },
        {
          key: 'drama',
          title: 'Drama',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=18`,
        },
        {
          key: 'family',
          title: 'Family',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=10751`,
        },
        {
          key: 'reality',
          title: 'Reality',
          url: `/discover/tv?api_key=${this.API_KEY}&with_genres=10764`,
        },
      ],
    },
  ]);

  genres = signal([
    {
      key: 'trending',
      title: 'Trending',
      url: `/trending/all/week?api_key=${this.API_KEY}&language=en-US`,
    },
    {
      key: 'top_rated',
      title: 'Top Rated',
      url: `/movie/top_rated?api_key=${this.API_KEY}&language=en-US`,
    },
    {
      key: 'action',
      title: 'Action',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=28`,
    },
    {
      key: 'comedy',
      title: 'Comedy',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=35`,
    },
    {
      key: 'crime',
      title: 'Crime',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=80`,
    },
    {
      key: 'animation',
      title: 'Animation',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=16`,
    },
    {
      key: 'horror',
      title: 'Horror',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=27`,
    },
    {
      key: 'thriller',
      title: 'Thriller',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=53`,
    },
    {
      key: 'documentary',
      title: 'Documentary',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=99`,
    },
    {
      key: 'drama',
      title: 'Drama',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=18`,
    },
    {
      key: 'family',
      title: 'Family',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10751`,
    },
    {
      key: 'romance',
      title: 'Romance',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10749`,
    },
    {
      key: 'mystery',
      title: 'Mystery',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=9648`,
    },
    {
      key: 'sci_fi',
      title: 'Sci-Fi',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=878`,
    },
    {
      key: 'western',
      title: 'Western',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=37`,
    },
    {
      key: 'tv',
      title: 'TV Movie',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10770`,
    },
    {
      key: 'war',
      title: 'War',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10752`,
    },
  ]);

  constructor() {
    this.selectedGenre.set('trending');
  }

  onSetSelectedGenre(genre: string) {
    this.selectedGenre.set(genre);
  }

  onLoadingPosters(isLoading: boolean) {
    this.isLoadingPosters.set(isLoading);
  }

  onSetPosters(posters: Poster[]) {
    this.posters.set(posters);
  }

  onChangeType(type: 'movie' | 'tv shows') {
    this.type.set(type);
  }
}
