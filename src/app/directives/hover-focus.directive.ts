import {
  Directive,
  HostListener,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appHoverFocus]'
})
export class HoverFocusDirective {
  constructor(private el: ElementRef) {}

  @Input()
  appHoverFocus = 'blue';

  @HostBinding('style.background-color') backgroundColor;

  @HostListener('mouseover')
  onMouseHover() {
    this.backgroundColor = this.appHoverFocus;
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.backgroundColor = 'inherit';
  }
}
