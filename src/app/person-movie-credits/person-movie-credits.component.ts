import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-movie-credits',
  imports: [],
  templateUrl: './person-movie-credits.component.html',
  styleUrl: './person-movie-credits.component.css'
})
export class PersonMovieCreditsComponent {
  @Input() isLoadingData: boolean = false
  @Input() name: string = '';
  @Input() person_id: string = '';
}
