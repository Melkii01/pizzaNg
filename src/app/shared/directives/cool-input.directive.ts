import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[coolInput]'
})
export class CoolInputDirective implements OnInit {
  @Input() coolInputDefaultBgColor: string = 'white';
  @Input() coolInputFocusBgColor: string = 'orange';

  constructor(private el: ElementRef,
              private rend: Renderer2) {

  }

  private _backgroundColor: string = '';
  @HostBinding('style.backgroundColor')
  get getBgColor() {
    return this._backgroundColor;
  }

  private _isOnFocus: boolean = false;
  @HostBinding('class.isOnFocus')
  get getIsOnFocus() {
    return this._isOnFocus;
  }

  @HostListener('focus')
  onFocus() {
    this.changeElementBgColor(this.coolInputFocusBgColor);
    this._isOnFocus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this._isOnFocus = false;
  }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    // console.log(target)
  }


  ngOnInit() {
    // console.log(this.el)
    // this.el.nativeElement.style.backgroundColor = 'yellow';

    // console.log(this.rend)
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this.rend.setAttribute(this.el.nativeElement, 'placeholder',
      this.el.nativeElement.getAttribute('placeholder') + '*');

    // const text = this.rend.createElement('span');
    // this.rend.setProperty(text, 'innerText', '*Обязательно для заполнения');
    // this.rend.setStyle(text, 'color', 'red');
    // this.rend.insertBefore(this.el.nativeElement.parentElement, text, this.rend.nextSibling(this.el.nativeElement));
  }

  changeElementBgColor(color: string) {
    this._backgroundColor = color;
  }
}
