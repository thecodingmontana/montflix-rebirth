import { Component, Input, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import { BannerComponent } from '../banner/banner.component';
import { Media } from '../types';
import { InfoComponent } from '../info/info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { CastsComponent } from '../casts/casts.component';
import { CommonModule } from '@angular/common';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { ActivatedRoute } from '@angular/router';
import { SimilarComponent } from "../similar/similar.component";

@Component({
  selector: 'app-movie',
  imports: [
    BannerComponent,
    InfoComponent,
    SynopsisComponent,
    CastsComponent,
    CommonModule,
    RecommendationsComponent,
    SimilarComponent
],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  API_KEY = environment.tmdbApiKey;
  movie_id: string = '';
  info = signal<Media | null>(null);
  isLoadingData = signal(false);

  @Input()
  set id(id: string) {
    this.movie_id = id;
  }

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let url = `/movie/${this.movie_id}?api_key=${environment.tmdbApiKey}`;
    this.onFetchData(url);

    this.activeRoute.params.subscribe((params) => {
      let _id = params['id'];
      let url = `/movie/${_id}?api_key=${environment.tmdbApiKey}`;
      this.onFetchData(url);
    });
  }

  onFetchData(url: string): void {
    this.isLoadingData.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Data fetched successfully!', data);
        this.info.set(data as Media);
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

  onChangeToString(value: number): string {
    return value.toString();
  }
}
