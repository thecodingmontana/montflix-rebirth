import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-synopsis',
  imports: [CommonModule],
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.css'
})
export class SynopsisComponent {
  @Input() synopsis: string = '';
  @Input() isLoadingData: boolean = false;
}
