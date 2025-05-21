import { Component, computed } from '@angular/core';
import { MonflixService } from '../state/monflix.service';
import { ApiService } from '../services/api.service';
import { Poster } from '../types';
import { environment } from '../../environments/environment';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrl: './posters.component.css',
  imports: [LazyLoadImageModule],
})
export class PostersComponent {
  constructor(
    private montflixService: MonflixService,
    private apiService: ApiService
  ) {}

  imageBaseUrl = environment.tmdbImageUrl
  scrollContainer: any;
  loadingImageUrl = 'assets/images/placeholder.png';
  isLoadingPosters = computed(() =>  this.montflixService.isLoadingPosters());
  posters = computed(() => this.montflixService.posters());
  selectedGenre = computed(() => this.montflixService.selectedGenre());

  ngOnInit(): void {
    let url = this.montflixService.genres().find((g) => g.key === this.selectedGenre())?.url;
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
