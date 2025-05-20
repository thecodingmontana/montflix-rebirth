import { Component, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MonflixService } from '../state/monflix.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  API_KEY = environment.tmdbApiKey;
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
      key: 'horror',
      title: 'Horror',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=27`,
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
      key: 'animation',
      title: 'Animation',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=16`,
    },
    {
      key: 'tv',
      title: 'TV Movie',
      url: `/discover/movie?api_key=${this.API_KEY}&with_genres=10770`,
    },
  ]);
  selectedGenre = signal('');

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private montflixService: MonflixService
  ) {}

  ngOnInit() {
    this.selectedGenre = this.montflixService.selectedGenre;

    this.activeRoute.queryParams.subscribe((params) => {
      const genre = params['genre'];
      if (genre) {
        this.montflixService.onSetSelectedGenre(genre);
        this.montflixService.onSetFetchUrl(
          this.genres().find((g) => g.key === genre)?.url || ''
        );
      }
    });
  }

  navigateToGenre(genre: string) {
    this.router.navigateByUrl(`/?genre=${genre}`);
  }
}
