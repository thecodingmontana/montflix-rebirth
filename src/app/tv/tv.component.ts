import { Component, Input, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import { BannerComponent } from '../banner/banner.component';
import { Media } from '../types';
import { SynopsisComponent } from "../synopsis/synopsis.component";
import { InfoComponent } from "../info/info.component";

@Component({
  selector: 'app-tv',
  imports: [BannerComponent, SynopsisComponent, InfoComponent],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css',
})
export class TvComponent {
  API_KEY = environment.tmdbApiKey;
  info = signal<Media | null>(null);
  isLoadingData = signal(false);

  tv_id: string = '';

  @Input()
  set id(id: string) {
    this.tv_id = id;
  }

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    let url = `/tv/${this.tv_id}?api_key=${environment.tmdbApiKey}`;
    this.onFetchData(url);
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
}
