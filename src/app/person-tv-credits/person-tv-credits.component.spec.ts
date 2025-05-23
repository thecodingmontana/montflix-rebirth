import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTvCreditsComponent } from './person-tv-credits.component';

describe('PersonTvCreditsComponent', () => {
  let component: PersonTvCreditsComponent;
  let fixture: ComponentFixture<PersonTvCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonTvCreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonTvCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
