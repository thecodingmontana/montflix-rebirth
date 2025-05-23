import { Component, Input, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import { LucideAngularModule, ChevronsLeftIcon } from 'lucide-angular';
import { CommonModule, Location } from '@angular/common';
import { PersonDetail } from '../types';

@Component({
  selector: 'app-person-banner',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './person-banner.component.html',
  styleUrl: './person-banner.component.css',
})
export class PersonBannerComponent {
  API_KEY = environment.tmdbApiKey;
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png';
  isLoadingData = signal<boolean>(false);
  details = signal<PersonDetail | null>(null);

  readonly ChevronsLeftIcon = ChevronsLeftIcon;

  @Input() person_id: string = '';

  constructor(private apiService: ApiService, private location: Location) {}

  ngOnInit(): void {
    let url = `/person/${this.person_id}?api_key=${environment.tmdbApiKey}&language=en-US`;
    this.onFetchData(url);
  }

  onGoBack() {
    this.location.back();
  }

  onFetchData(url: string): void {
    this.isLoadingData.set(true);
    this.apiService.getData(url).subscribe({
      next: (data) => {
        console.log('Data fetched successfully!', data);
        this.details.set(data as PersonDetail);
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

  getAge(birthday: string | Date): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
