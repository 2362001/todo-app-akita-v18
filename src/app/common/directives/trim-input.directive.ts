import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[trimInput]',
})
export class TrimInputDirective {

    constructor(private _el: ElementRef, private ngControl: NgControl) { }

    @HostListener('blur') _() {
        const value = this._el.nativeElement.value;
        this.ngControl.control?.setValue(value?.trim());
    }
    
}