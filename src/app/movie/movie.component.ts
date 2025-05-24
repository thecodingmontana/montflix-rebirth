import { Component, inject, Input, signal } from '@angular/core';
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
import { SimilarComponent } from '../similar/similar.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  imports: [
    BannerComponent,
    InfoComponent,
    SynopsisComponent,
    CastsComponent,
    CommonModule,
    RecommendationsComponent,
    SimilarComponent,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  API_KEY = environment.tmdbApiKey;
  imageUrl = 'https://image.tmdb.org/t/p/original/';
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
    this.title.setTitle('Movie');

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
        this.title.setTitle(`Movie | ${this.info()?.title}`);

        this.meta.updateTag({
          name: 'description',
          content: this.info()
            ? `${this.info()?.overview.slice(0, 150)!}...`
            : 'Movie description',
        });
        this.meta.updateTag({
          property: 'og:title',
          content: this.info()
            ? `${this.info()?.overview.slice(0, 150)!}...`
            : 'Movie description',
        });
        this.meta.updateTag({
          property: 'og:description',
          content: this.info()
            ? `${this.info()?.overview.slice(0, 150)!}...`
            : 'Movie description',
        });
        this.meta.updateTag({
          property: 'og:image',
          content: (this.info()?.backdrop_path || this.info()?.poster_path)
            ? `${this.imageUrl}${(this.info()?.backdrop_path || this.info()?.poster_path)}`
            : 'assets/images/mesh.png',
        });
        this.meta.updateTag({
          property: 'og:url',
           content: (this.info()?.backdrop_path || this.info()?.poster_path)
            ? `${this.imageUrl}${(this.info()?.backdrop_path || this.info()?.poster_path)}`
            : 'assets/images/mesh.png',
        });
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
