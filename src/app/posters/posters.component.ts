import { Component, computed } from '@angular/core';
import { MonflixService } from '../state/monflix.service';
import { ApiService } from '../services/api.service';
import { Poster } from '../types';
import { environment } from '../../environments/environment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrl: './posters.component.css',
  imports: [RouterLink, LazyLoadImageModule],
})
export class PostersComponent {
  constructor(
    private montflixService: MonflixService,
    private apiService: ApiService
  ) {}

  imageBaseUrl = environment.tmdbImageUrl;
  scrollContainer: any;
  loadingImageUrl = 'assets/images/placeholder.png';
  isLoadingPosters = computed(() => this.montflixService.isLoadingPosters());
  posters = computed(() => this.montflixService.posters());
  selectedGenre = computed(() => this.montflixService.selectedGenre());
  type = computed(() => this.montflixService.type());

  ngOnInit(): void {
    const list = this.montflixService
      .lists()
      .find((list) => list.type === this.type());
    const genreObj = list?.genres.find((g) => g.key === this.selectedGenre());
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
}
