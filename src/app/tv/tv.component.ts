import { Component, inject, Input, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import { BannerComponent } from '../banner/banner.component';
import { Media } from '../types';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { InfoComponent } from '../info/info.component';
import { CastsComponent } from '../casts/casts.component';
import { CommonModule } from '@angular/common';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { SimilarComponent } from '../similar/similar.component';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tv',
  imports: [
    BannerComponent,
    SynopsisComponent,
    InfoComponent,
    CastsComponent,
    CommonModule,
    RecommendationsComponent,
    SimilarComponent,
  ],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css',
})
export class TvComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  API_KEY = environment.tmdbApiKey;
  info = signal<Media | null>(null);
  isLoadingData = signal(false);
  imageUrl = 'https://image.tmdb.org/t/p/original/';

  tv_id: string = '';

  @Input()
  set id(id: string) {
    this.tv_id = id;
  }

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Tv Show');
    let url = `/tv/${this.tv_id}?api_key=${environment.tmdbApiKey}`;
    this.onFetchData(url);

    this.activeRoute.params.subscribe((params) => {
      let _id = params['id'];

      let url = `/tv/${_id}?api_key=${environment.tmdbApiKey}`;
      this.onFetchData(url);
    });
  }

  onFetchData(url: string): void {
    this.isLoadingData.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Data fetched successfully!', data);
        this.info.set(data as Media);

        this.title.setTitle(`Tv Show | ${this.info()?.name}`);

        this.meta.updateTag({
          name: 'description',
          content: this.info() ? this.info()?.overview.slice(0, 150)! : 'Tv Show description',
        });

        this.meta.updateTag({
          property: 'og:title',
          content: this.info()
            ? `${this.info()?.overview.slice(0, 150)!}...`
            : 'Tv Show description',
        });
        this.meta.updateTag({
          property: 'og:description',
          content: this.info()
            ? `${this.info()?.overview.slice(0, 150)!}...`
            : 'Tv Show description',
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
