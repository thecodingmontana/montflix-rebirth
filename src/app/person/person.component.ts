import { Component, Input } from '@angular/core';
import { PersonBannerComponent } from "../person-banner/person-banner.component";

@Component({
  selector: 'app-person',
  imports: [PersonBannerComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
  person_id: string = ''

  @Input()
  set id(id: string) {
    this.person_id = id
  }
}
