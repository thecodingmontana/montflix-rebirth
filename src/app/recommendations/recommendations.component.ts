import { Component, Input, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import { Poster } from '../types';
import { format } from 'date-fns';
import { ScrollContainerComponent } from '../scroll-container/scroll-container.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  imports: [ScrollContainerComponent, CommonModule, RouterLink],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css',
})
export class RecommendationsComponent {
  API_KEY = environment.tmdbApiKey;
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png';

  isLoadingData = signal(false);
  recommendations = signal<Poster[] | null>(null);

  @Input() mediaType: 'tv' | 'movie' = 'movie';
  @Input() mediaId: string = '';

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let url = `/${this.mediaType}/${this.mediaId}/recommendations?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
    this.onFetchData(url);

    this.activeRoute.params.subscribe((params) => {
      let _id = params['id'];
      let url = `/${this.mediaType}/${_id}/recommendations?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
      this.onFetchData(url);
    });
  }

  onFetchData(url: string): void {
    this.isLoadingData.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Recommendations fetched successfully!', data);
        this.recommendations.set(data.results as Poster[]);
      },
      error: (error) => {
        console.error('Error fetching recommendations:', error);
        this.isLoadingData.set(false);
      },
      complete: () => {
        console.log('Recommendations fetching complete');
        this.isLoadingData.set(false);
      },
    });
  }

  onFormatReleaseDate(date: string) {
    return format(new Date(date), 'PPP');
  }
}
