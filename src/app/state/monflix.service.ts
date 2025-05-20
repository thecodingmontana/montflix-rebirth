import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonflixService {
  selectedGenre = signal<string>('');
  fetchUrl = signal<string>('');

  constructor() {
    this.selectedGenre.set('trending');
  }

  onSetSelectedGenre(genre: string) {
    this.selectedGenre.set(genre);
  }

  onSetFetchUrl(url: string) {
    this.fetchUrl.set(url);
  }
}
