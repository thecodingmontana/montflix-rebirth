import { Component, Input, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';
import { ApiService } from '../services/api.service';
import { PersonCast } from '../types';
import { ScrollContainerComponent } from "../scroll-container/scroll-container.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-person-tv-credits',
  imports: [ScrollContainerComponent, RouterLink],
  templateUrl: './person-tv-credits.component.html',
  styleUrl: './person-tv-credits.component.css',
})
export class PersonTvCreditsComponent {
  API_KEY = environment.tmdbApiKey;
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png';
  isLoadingTvCredits = signal<boolean>(false);
  casts = signal<PersonCast[] | null>(null);

  @Input() isLoadingData: boolean = false;
  @Input() name: string = '';
  @Input() person_id: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    let url = `/person/${this.person_id}/tv_credits?api_key=${environment.tmdbApiKey}&language=en-US`;
    this.onFetchData(url);
  }

  onFetchData(url: string): void {
    this.isLoadingTvCredits.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log(
          'Fetched person movie credits successfully!',
          data.cast
        );
        const limitedCasts = (data.cast as PersonCast[]).slice(0, 10); // Limit to 10
        this.casts.set(limitedCasts);
      },
      error: (error) => {
        console.error('Error fetching person movie credits:', error);
        this.isLoadingTvCredits.set(false);
      },
      complete: () => {
        console.log('Data fetching person movie credits complete');
        this.isLoadingTvCredits.set(false);
      },
    });
  }

  onFormatReleaseDate(date: string) {
    return format(new Date(date), 'PPP');
  }
}
