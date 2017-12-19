import { Directive, OnInit, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumber {
  regexStr = '^[-]?[0-9]+$';


  private oldValue:number;

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'Control', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp' ];

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if(!this.el.nativeElement.min)
      this.el.nativeElement.min = Number.NEGATIVE_INFINITY;
    if(!this.el.nativeElement.max)
      this.el.nativeElement.max = Number.MAX_VALUE;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const carretPosition = this.el.nativeElement.selectionStart;
    const currentValue = this.el.nativeElement.value;

    let e = <KeyboardEvent> event;
    this.oldValue = this.el.nativeElement.value;
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(e.key) !== -1) {
        return;
    }

    let regEx =  new RegExp(this.regexStr);
    let newValue = currentValue.substr(0, carretPosition) + e.key + currentValue.substr(carretPosition);

    if(regEx.test(newValue)) {
      if(this.handleMaxLimit(newValue) || this.handleMinLimit(newValue))
        e.preventDefault();
      // let it happen, don't do anything
      return;
    }
    else
       e.preventDefault();
  }

  private handleMaxLimit(newValue:string):Boolean {
    return Number.parseInt(newValue) > this.el.nativeElement.max;
  }

  private handleMinLimit(newValue:string):Boolean {
    return Number.parseInt(newValue) < this.el.nativeElement.min;
  }
}
