import { Component, Input, signal } from '@angular/core';
import { format } from 'date-fns';
import { environment } from '../../environments/environment';
import { Poster } from '../types';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollContainerComponent } from '../scroll-container/scroll-container.component';

@Component({
  selector: 'app-similar',
  imports: [ScrollContainerComponent, RouterLink],
  templateUrl: './similar.component.html',
  styleUrl: './similar.component.css',
})
export class SimilarComponent {
  API_KEY = environment.tmdbApiKey;
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png';

  isLoadingData = signal(false);
  similars = signal<Poster[] | null>(null);

  @Input() mediaType: 'tv' | 'movie' = 'movie';
  @Input() mediaId: string = '';

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let url = `/${this.mediaType}/${this.mediaId}/similar?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
    this.onFetchData(url);

    this.activeRoute.params.subscribe((params) => {
      let _id = params['id'];
      let url = `/${this.mediaType}/${_id}/similar?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
      this.onFetchData(url);
    });
  }

  onFetchData(url: string): void {
    this.isLoadingData.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Recommendations fetched successfully!', data);
        this.similars.set(data.results as Poster[]);
      },
      error: (error) => {
        console.error('Error fetching similars:', error);
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
