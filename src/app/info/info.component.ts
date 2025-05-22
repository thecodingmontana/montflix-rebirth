import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Media } from '../types';
import { LucideAngularModule, GlobeIcon } from 'lucide-angular';

@Component({
  selector: 'app-info',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  readonly GlobeIcon = GlobeIcon;

  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Input() media: Media | null = null;

  getDurationString(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs > 0 && mins > 0) return `${hrs}h ${mins}min`;
    if (hrs > 0) return `${hrs}h`;
    return `${mins}min`;
  }
}
