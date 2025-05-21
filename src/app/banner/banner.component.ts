import { Component, Input } from '@angular/core';
import { Media } from '../types';
import { CommonModule } from '@angular/common';
import { env } from 'process';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  imageUrl = 'https://image.tmdb.org/t/p/original/'

  @Input() media: Media | null = null;
  @Input() mediaType: 'movie' | 'tv' = 'movie';
}
