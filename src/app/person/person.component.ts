import { Component, Input, signal } from '@angular/core';
import { PersonBannerComponent } from '../person-banner/person-banner.component';
import { PersonMovieCreditsComponent } from '../person-movie-credits/person-movie-credits.component';
import { PersonTvCreditsComponent } from '../person-tv-credits/person-tv-credits.component';
import { PersonDetail } from '../types';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-person',
  imports: [
    PersonBannerComponent,
    PersonMovieCreditsComponent,
    PersonTvCreditsComponent,
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent {
  API_KEY = environment.tmdbApiKey;
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png';
  isLoadingData = signal<boolean>(false);
  details = signal<PersonDetail | null>(null);
  person_id: string = '';

  @Input()
  set id(id: string) {
    this.person_id = id;
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    let url = `/person/${this.person_id}?api_key=${environment.tmdbApiKey}&language=en-US`;
    this.onFetchData(url);
  }

  onFetchData(url: string): void {
    this.isLoadingData.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Data fetched successfully!');
        this.details.set(data as PersonDetail);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.isLoadingData.set(false);
      },
      complete: () => {
        console.log('Data fetching complete');
        this.isLoadingData.set(false);
      },
    });
  }
}
