import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-tv-credits',
  imports: [],
  templateUrl: './person-tv-credits.component.html',
  styleUrl: './person-tv-credits.component.css',
})
export class PersonTvCreditsComponent {
  @Input() isLoadingData: boolean = false;
  @Input() name: string = '';
  @Input() person_id: string = '';
}
