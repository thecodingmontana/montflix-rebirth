import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Media } from '../types';

@Component({
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  imageUrl = 'https://image.tmdb.org/t/p/original/';

  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Input() media: Media | null = null;
}
