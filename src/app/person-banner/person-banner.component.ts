import { Component, Input } from '@angular/core';
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
  imageUrl = 'https://image.tmdb.org/t/p/original/';
  defaultImageUrl = 'assets/images/mesh.png'

  readonly ChevronsLeftIcon = ChevronsLeftIcon;

  @Input() person_id: string = '';
  @Input() isLoadingData: boolean = false;
  @Input() person: PersonDetail | null = null;

  constructor(private location: Location) {}

  onGoBack() {
    this.location.back();
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
