import { Component, Input } from '@angular/core';
import { Media } from '../types';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronsLeftIcon } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png';
  readonly ChevronsLeftIcon = ChevronsLeftIcon;

  @Input() media: Media | null = null;
  @Input() isLoadingData: boolean = false;
  @Input() mediaType: 'movie' | 'tv' = 'movie';

  onGetReleaseDate(media: Media): string {
    if (this.mediaType === 'movie') {
      return new Date(media.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      return new Date(media.first_air_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }
}
