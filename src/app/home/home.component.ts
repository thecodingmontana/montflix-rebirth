import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PostersComponent } from '../posters/posters.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PostersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('Monflix Rebirth | More than just movies and tv shows');

    this.meta.updateTag({
      name: 'description',
      content: 'More than just movies and tv shows',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'montflix, tv, movies',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Monflix Rebirth | More than just movies and tv shows' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'More than just movies and tv shows',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'assets/images/mesh.png',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: 'assets/images/mesh.png',
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
  }
}
