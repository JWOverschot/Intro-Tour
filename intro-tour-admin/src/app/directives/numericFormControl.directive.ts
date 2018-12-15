import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[numericFormControl]'
})
export class NumericFormControlDirective {

	regexStr = '^[0-9]*$';
	@Input() isNumeric: boolean;

	constructor(private el: ElementRef) { }

	@HostListener('keypress', ['$event']) onKeyPress(event) {
		return new RegExp(this.regexStr).test(event.key);
	}

	@HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
		let clipboardData = event["clipboardData"] || window["clipboardData"];
		let replacedClipboardData = clipboardData.getData('Text').replace(/[^0-9]/g, '');

		clipboardData.setData('Text', replacedClipboardData);
		this.validateFields(event, replacedClipboardData);
	}

	validateFields(event, replaceData) {
		setTimeout(() => {
			event.stopPropagation();
			event.preventDefault();
			this.el.nativeElement.value = replaceData;

		}, 1);
	}

}
