import { Injectable, signal } from '@angular/core';
import { sign } from 'crypto';
import { Poster } from '../types';

@Injectable({
  providedIn: 'root',
})

export class MonflixService {
  selectedGenre = signal<string>('');
  fetchUrl = signal<string>('');
  isLoadingPosters = signal<boolean>(false);
  posters = signal<Poster[]>([]);

  constructor() {
    this.selectedGenre.set('trending');
  }

  onSetSelectedGenre(genre: string) {
    this.selectedGenre.set(genre);
  }

  onSetFetchUrl(url: string) {
    this.fetchUrl.set(url);
  }

  onLoadingPosters(isLoading: boolean) {
    this.isLoadingPosters.set(isLoading);
  }

  onSetPosters(posters: Poster[]) {
    this.posters.set(posters);
  }
}
