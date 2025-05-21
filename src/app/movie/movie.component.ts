import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  movie_id: string = '';

  @Input()
  set id(id: string) {
    this.movie_id = id;
  }
}
