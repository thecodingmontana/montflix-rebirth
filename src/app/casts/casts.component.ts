import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { CastMember, CrewMember } from '../types';

@Component({
  selector: 'app-casts',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './casts.component.html',
  styleUrl: './casts.component.css',
})
export class CastsComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

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

  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ChevronRightIcon = ChevronRightIcon;

  showLeft = false;
  showRight = false;

  episodes = [
    {
      title: '1. Reunion',
      description: 'After a chance meeting at a party, Justin and Kesha...',
      duration: '52m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    {
      title: '2. Ghosted',
      description: 'Justin loses phone privileges, complicating...',
      duration: '49m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    {
      title: '2. Ghosted',
      description: 'Justin loses phone privileges, complicating...',
      duration: '49m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    {
      title: '2. Ghosted',
      description: 'Justin loses phone privileges, complicating...',
      duration: '49m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    {
      title: '2. Ghosted',
      description: 'Justin loses phone privileges, complicating...',
      duration: '49m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    {
      title: '2. Ghosted',
      description: 'Justin loses phone privileges, complicating...',
      duration: '49m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    {
      title: '2. Ghosted',
      description: 'Justin loses phone privileges, complicating...',
      duration: '49m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    {
      title: '2. Ghosted',
      description: 'Justin loses phone privileges, complicating...',
      duration: '49m',
      image: 'https://image.tmdb.org/t/p/w500/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
    },
    // ...more episodes
  ];

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

  ngAfterViewInit() {
    this.updateChevronVisibility();
  }

  scroll(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(() => this.updateChevronVisibility(), 300);
  }

  onScroll() {
    this.updateChevronVisibility();
  }

  updateChevronVisibility() {
    const el = this.scrollContainer.nativeElement;
    this.showLeft = el.scrollLeft > 5;
    this.showRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  }
}
