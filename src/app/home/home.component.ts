import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PostersComponent } from '../posters/posters.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PostersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
