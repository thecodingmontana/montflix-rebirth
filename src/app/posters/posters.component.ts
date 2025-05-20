import { Component, computed } from '@angular/core';
import { MonflixService } from '../state/monflix.service';
import { ApiService } from '../services/api.service';
import { Poster } from '../types';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrl: './posters.component.css',
})
export class PostersComponent {
  constructor(
    private montflixService: MonflixService,
    private apiService: ApiService
  ) {}

  imageBaseUrl = environment.tmdbImageUrl
  isLoadingPosters = computed(() =>  this.montflixService.isLoadingPosters());
  posters = computed(() => this.montflixService.posters());

  ngOnInit() {
    this.onFetchData(this.montflixService.fetchUrl());
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
