import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MonflixService } from '../state/monflix.service';
import { ApiService } from '../services/api.service';
import { Poster } from '../types';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  selectedGenre = signal('');

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private montflixService: MonflixService,
    private apiService: ApiService
  ) {}

  lists = computed(() => this.montflixService.lists());
  type = computed(() => this.montflixService.type());

  ngOnInit(): void {
    this.selectedGenre = this.montflixService.selectedGenre;

    this.activeRoute.queryParams.subscribe((params) => {
      const genre = params['genre'];
      if (genre) {
        this.montflixService.onSetSelectedGenre(genre);
      } else {
        this.montflixService.onSetSelectedGenre('trending');
      }
    });
  }

  navigateToGenre(genre: string) {
    this.router.navigateByUrl(`/?genre=${genre}`);
    const list = this.montflixService
      .lists()
      .find((list) => list.type === this.type());
    const genreObj = list?.genres.find((g) => g.key === genre);
    const url = genreObj?.url ?? '';

    if (url) {
      this.onFetchData(url);
    }
  }

  onFetchData(url: string): void {
    this.montflixService.onLoadingPosters(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Data fetched successfully!');
        this.montflixService.onSetPosters(data.results as Poster[]);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.montflixService.onLoadingPosters(false);
      },
      complete: () => {
        console.log('Data fetching complete');
        this.montflixService.onLoadingPosters(false);
      },
    });
  }

  onChangeType(type: 'movie' | 'tv shows') {
    this.montflixService.onChangeType(type);
    const list = this.montflixService
      .lists()
      .find((list) => list.type === this.type());
    const genreObj = list?.genres.find((g) => {
      if (g.key === this.selectedGenre()) {
        return g;
      }
      return g.key === 'trending';
    });

    if (genreObj) {
      this.montflixService.onSetSelectedGenre(genreObj.key);
    }
    const url = genreObj?.url ?? '';

    if (url) {
      this.onFetchData(url);
    }
  }
}
