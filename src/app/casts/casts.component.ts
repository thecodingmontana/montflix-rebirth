import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { CastMember, CrewMember } from '../types';
import { ScrollContainerComponent } from '../scroll-container/scroll-container.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-casts',
  imports: [CommonModule, ScrollContainerComponent, RouterLink],
  templateUrl: './casts.component.html',
  styleUrl: './casts.component.css',
  standalone: true,
})
export class CastsComponent {
  API_KEY = environment.tmdbApiKey;
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png';

  isLoadingData = signal(false);
  list = signal<{
    casts: CastMember[];
    crews: CrewMember[];
  }>({
    casts: [],
    crews: [],
  });

  @Input() mediaType: 'tv' | 'movie' = 'movie';
  @Input() mediaId: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    let url = `/${this.mediaType}/${this.mediaId}/credits?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
    this.onFetchData(url);
  }

  onFetchData(url: string): void {
    this.isLoadingData.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Data fetched successfully!', data);
        let casts: {
          casts: CastMember[];
          crews: CrewMember[];
        } = {
          casts: data.cast,
          crews: data.crew,
        };
        this.list.set(casts);
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
