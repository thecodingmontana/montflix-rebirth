import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMovieCreditsComponent } from './person-movie-credits.component';

describe('PersonMovieCreditsComponent', () => {
  let component: PersonMovieCreditsComponent;
  let fixture: ComponentFixture<PersonMovieCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonMovieCreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonMovieCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
