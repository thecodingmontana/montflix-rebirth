import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tv',
  imports: [],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css'
})
export class TvComponent {
  tvId: string = '';

  @Input()
  set id(id: string) {
    this.tvId = id;
  }
}
