import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollContainerComponent } from './scroll-container.component';

describe('ScrollContainerComponent', () => {
  let component: ScrollContainerComponent;
  let fixture: ComponentFixture<ScrollContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
