import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { fromEvent, map, Subscription } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter();

  subscribtion!: Subscription;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.subscribtion = fromEvent(this.document, 'click')
      .pipe(
        map((e) => {
          return !this.isOutside(e.target as HTMLElement);
        })
      )
      .subscribe({
        next: (isOutside) => {
          if (isOutside) {
            this.clickOutside.emit();
          }
        },
      });
  }

  isOutside(elementForCheck: HTMLElement): boolean {
    return elementForCheck === this.element.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }
}
