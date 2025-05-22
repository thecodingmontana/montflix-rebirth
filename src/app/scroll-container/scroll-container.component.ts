import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-scroll-container',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './scroll-container.component.html',
  styleUrl: './scroll-container.component.css',
})
export class ScrollContainerComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ChevronRightIcon = ChevronRightIcon;

  showLeft = false;
  showRight = false;

  ngAfterViewInit() {
    this.updateChevronVisibility();
  }

  scroll(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(() => this.updateChevronVisibility(), 300);
  }

  onScroll() {
    this.updateChevronVisibility();
  }

  updateChevronVisibility() {
    const el = this.scrollContainer.nativeElement;
    this.showLeft = el.scrollLeft > 5;
    this.showRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  }
}
