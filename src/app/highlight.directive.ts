import { OnInit } from '@angular/core';
import { ElementRef, Input } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() color: string = '';

  constructor(private el: ElementRef) {
    console.log("Color:",this.color);
    this.color = "yellow";
 }
  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = this.color;
  }

}
