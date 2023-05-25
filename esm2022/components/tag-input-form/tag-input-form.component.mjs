import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
class TagInputForm {
    /**
     * @name onSubmit
     */
    onSubmit = new EventEmitter();
    /**
     * @name onBlur
     */
    onBlur = new EventEmitter();
    /**
     * @name onFocus
     */
    onFocus = new EventEmitter();
    /**
     * @name onKeyup
     */
    onKeyup = new EventEmitter();
    /**
     * @name onKeydown
     */
    onKeydown = new EventEmitter();
    /**
     * @name inputTextChange
     */
    inputTextChange = new EventEmitter();
    // inputs
    /**
     * @name placeholder
     */
    placeholder;
    /**
     * @name validators
     */
    validators = [];
    /**
     * @name asyncValidators
     * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
     */
    asyncValidators = [];
    /**
     * @name inputId
     */
    inputId;
    /**
     * @name inputClass
     */
    inputClass;
    /**
     * @name tabindex
     * @desc pass through the specified tabindex to the input
     */
    tabindex = '';
    /**
     * @name disabled
     */
    disabled = false;
    /**
     * @name input
     */
    input;
    /**
     * @name form
     */
    form;
    /**
     * @name inputText
     */
    get inputText() {
        return this.item.value;
    }
    /**
     * @name inputText
     * @param text {string}
     */
    set inputText(text) {
        this.item.setValue(text);
        this.inputTextChange.emit(text);
    }
    item = new UntypedFormControl({ value: '', disabled: this.disabled });
    ngOnInit() {
        this.item.setValidators(this.validators);
        this.item.setAsyncValidators(this.asyncValidators);
        // creating form
        this.form = new UntypedFormGroup({
            item: this.item
        });
    }
    ngOnChanges(changes) {
        if (changes.disabled && !changes.disabled.firstChange) {
            if (changes.disabled.currentValue) {
                this.form.controls['item'].disable();
            }
            else {
                this.form.controls['item'].enable();
            }
        }
    }
    /**
     * @name value
     */
    get value() {
        return this.form.get('item');
    }
    /**
     * @name isInputFocused
     */
    isInputFocused() {
        const doc = typeof document !== 'undefined' ? document : undefined;
        return doc ? doc.activeElement === this.input.nativeElement : false;
    }
    /**
     * @name getErrorMessages
     * @param messages
     */
    getErrorMessages(messages) {
        return Object.keys(messages)
            .filter(err => this.value.hasError(err))
            .map(err => messages[err]);
    }
    /**
     * @name hasErrors
     */
    hasErrors() {
        const { dirty, value, valid } = this.form;
        return dirty && value.item && !valid;
    }
    /**
     * @name focus
     */
    focus() {
        this.input.nativeElement.focus();
    }
    /**
     * @name blur
     */
    blur() {
        this.input.nativeElement.blur();
    }
    /**
     * @name getElementPosition
     */
    getElementPosition() {
        return this.input.nativeElement.getBoundingClientRect();
    }
    /**
     * - removes input from the component
     * @name destroy
     */
    destroy() {
        const input = this.input.nativeElement;
        input.parentElement.removeChild(input);
    }
    /**
     * @name onKeyDown
     * @param $event
     */
    onKeyDown($event) {
        this.inputText = this.value.value;
        if ($event.key === 'Enter') {
            this.submit($event);
        }
        else {
            return this.onKeydown.emit($event);
        }
    }
    /**
     * @name onKeyUp
     * @param $event
     */
    onKeyUp($event) {
        this.inputText = this.value.value;
        return this.onKeyup.emit($event);
    }
    /**
     * @name submit
     */
    submit($event) {
        $event.preventDefault();
        this.onSubmit.emit($event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputForm, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagInputForm, selector: "tag-input-form", inputs: { placeholder: "placeholder", validators: "validators", asyncValidators: "asyncValidators", inputId: "inputId", inputClass: "inputClass", tabindex: "tabindex", disabled: "disabled", inputText: "inputText" }, outputs: { onSubmit: "onSubmit", onBlur: "onBlur", onFocus: "onFocus", onKeyup: "onKeyup", onKeydown: "onKeydown", inputTextChange: "inputTextChange" }, viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<!-- form -->\r\n<form (ngSubmit)=\"submit($event)\" [formGroup]=\"form\">\r\n    <input #input\r\n\r\n           type=\"text\"\r\n           class=\"ng2-tag-input__text-input\"\r\n           autocomplete=\"off\"\r\n           tabindex=\"{{ disabled ? -1 : tabindex ? tabindex : 0 }}\"\r\n           minlength=\"1\"\r\n           formControlName=\"item\"\r\n\r\n           [ngClass]=\"inputClass\"\r\n           [attr.id]=\"inputId\"\r\n           [attr.placeholder]=\"placeholder\"\r\n           [attr.aria-label]=\"placeholder\"\r\n           [attr.tabindex]=\"tabindex\"\r\n           [attr.disabled]=\"disabled ? disabled : null\"\r\n\r\n           (focus)=\"onFocus.emit($event)\"\r\n           (blur)=\"onBlur.emit($event)\"\r\n           (keydown)=\"onKeyDown($event)\"\r\n           (keyup)=\"onKeyUp($event)\"\r\n    />\r\n</form>\r\n", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.ng2-tag-input__text-input{display:inline;vertical-align:middle;border:none;padding:0 .5rem;height:38px;font-size:1em;font-family:Roboto,Helvetica Neue,sans-serif}.ng2-tag-input__text-input:focus{outline:0}.ng2-tag-input__text-input[disabled=true]{opacity:.5;background:#fff}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.MinLengthValidator, selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]", inputs: ["minlength"] }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
export { TagInputForm };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputForm, decorators: [{
            type: Component,
            args: [{ selector: 'tag-input-form', template: "<!-- form -->\r\n<form (ngSubmit)=\"submit($event)\" [formGroup]=\"form\">\r\n    <input #input\r\n\r\n           type=\"text\"\r\n           class=\"ng2-tag-input__text-input\"\r\n           autocomplete=\"off\"\r\n           tabindex=\"{{ disabled ? -1 : tabindex ? tabindex : 0 }}\"\r\n           minlength=\"1\"\r\n           formControlName=\"item\"\r\n\r\n           [ngClass]=\"inputClass\"\r\n           [attr.id]=\"inputId\"\r\n           [attr.placeholder]=\"placeholder\"\r\n           [attr.aria-label]=\"placeholder\"\r\n           [attr.tabindex]=\"tabindex\"\r\n           [attr.disabled]=\"disabled ? disabled : null\"\r\n\r\n           (focus)=\"onFocus.emit($event)\"\r\n           (blur)=\"onBlur.emit($event)\"\r\n           (keydown)=\"onKeyDown($event)\"\r\n           (keyup)=\"onKeyUp($event)\"\r\n    />\r\n</form>\r\n", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.ng2-tag-input__text-input{display:inline;vertical-align:middle;border:none;padding:0 .5rem;height:38px;font-size:1em;font-family:Roboto,Helvetica Neue,sans-serif}.ng2-tag-input__text-input:focus{outline:0}.ng2-tag-input__text-input[disabled=true]{opacity:.5;background:#fff}\n"] }]
        }], propDecorators: { onSubmit: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onKeyup: [{
                type: Output
            }], onKeydown: [{
                type: Output
            }], inputTextChange: [{
                type: Output
            }], placeholder: [{
                type: Input
            }], validators: [{
                type: Input
            }], asyncValidators: [{
                type: Input
            }], inputId: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], disabled: [{
                type: Input
            }], input: [{
                type: ViewChild,
                args: ['input']
            }], inputText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnRzL3RhZy1pbnB1dC1mb3JtL3RhZy1pbnB1dC1mb3JtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50cy90YWctaW5wdXQtZm9ybS90YWctaW5wdXQtZm9ybS50ZW1wbGF0ZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFvQixrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBZSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRXJHLE1BS2EsWUFBWTtJQUNyQjs7T0FFRztJQUNjLFFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVsRTs7T0FFRztJQUNjLE1BQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVoRTs7T0FFRztJQUNjLE9BQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVqRTs7T0FFRztJQUNjLE9BQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVqRTs7T0FFRztJQUNjLFNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVuRTs7T0FFRztJQUNjLGVBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUU1RSxTQUFTO0lBRVQ7O09BRUc7SUFDYSxXQUFXLENBQVM7SUFFcEM7O09BRUc7SUFDYSxVQUFVLEdBQWtCLEVBQUUsQ0FBQztJQUUvQzs7O09BR0c7SUFDYSxlQUFlLEdBQXVCLEVBQUUsQ0FBQztJQUV6RDs7T0FFRztJQUNhLE9BQU8sQ0FBUztJQUVoQzs7T0FFRztJQUNhLFVBQVUsQ0FBUztJQUVuQzs7O09BR0c7SUFDYSxRQUFRLEdBQUcsRUFB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QUFNO2dCQUtVLE1BQU07c0JBQXRCLE1BQU07Z0JBS1UsT0FBTztzQkFBdkIsTUFBTTtnQkFLVSxPQUFPO3NCQUF2QixNQUFNO2dCQUtVLFNBQVM7c0JBQXpCLE1BQU07Z0JBS1UsZUFBZTtzQkFBL0IsTUFBTTtnQkFPUyxXQUFXO3NCQUExQixLQUFLO2dCQUtVLFVBQVU7c0JBQXpCLEtBQUs7Z0JBTVUsZUFBZTtzQkFBOUIsS0FBSztnQkFLVSxPQUFPO3NCQUF0QixLQUFLO2dCQUtVLFVBQVU7c0JBQXpCLEtBQUs7Z0JBTVUsUUFBUTtzQkFBdkIsS0FBSztnQkFLVSxRQUFRO3NCQUF2QixLQUFLO2dCQUtxQixLQUFLO3NCQUEvQixTQUFTO3VCQUFDLE9BQU87Z0JBV1AsU0FBUztzQkFEbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFzeW5jVmFsaWRhdG9yRm4sIFVudHlwZWRGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnLWlucHV0LWZvcm0nLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLWlucHV0LWZvcm0uc3R5bGUuc2NzcyddLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhZy1pbnB1dC1mb3JtLnRlbXBsYXRlLmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dEZvcm0gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uU3VibWl0XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uRm9jdXNcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5dXBcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbktleXVwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5ZG93blxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRDaGFuZ2VcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBpbnB1dFRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIC8vIGlucHV0c1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcGxhY2Vob2xkZXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB2YWxpZGF0b3JzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhc3luY1ZhbGlkYXRvcnNcclxuICAgICAqIEBkZXNjIGFycmF5IG9mIEFzeW5jVmFsaWRhdG9yIHRoYXQgYXJlIHVzZWQgdG8gdmFsaWRhdGUgdGhlIHRhZyBiZWZvcmUgaXQgZ2V0cyBhcHBlbmRlZCB0byB0aGUgbGlzdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXN5bmNWYWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0SWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0Q2xhc3NcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0Q2xhc3M6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRhYmluZGV4XHJcbiAgICAgKiBAZGVzYyBwYXNzIHRocm91Z2ggdGhlIHNwZWNpZmllZCB0YWJpbmRleCB0byB0aGUgaW5wdXRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHRhYmluZGV4ID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlZFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0XHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgcHVibGljIGlucHV0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZm9ybVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9ybTogVW50eXBlZEZvcm1Hcm91cDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0VGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGdldCBpbnB1dFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaW5wdXRUZXh0XHJcbiAgICAgKiBAcGFyYW0gdGV4dCB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGlucHV0VGV4dCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLml0ZW0uc2V0VmFsdWUodGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0Q2hhbmdlLmVtaXQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpdGVtOiBVbnR5cGVkRm9ybUNvbnRyb2wgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKHsgdmFsdWU6ICcnLCBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCB9KTtcclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLml0ZW0uc2V0VmFsaWRhdG9ycyh0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgIHRoaXMuaXRlbS5zZXRBc3luY1ZhbGlkYXRvcnModGhpcy5hc3luY1ZhbGlkYXRvcnMpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGluZyBmb3JtXHJcbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQgJiYgIWNoYW5nZXMuZGlzYWJsZWQuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbJ2l0ZW0nXS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbJ2l0ZW0nXS5lbmFibGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogVW50eXBlZEZvcm1Db250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtLmdldCgnaXRlbScpIGFzIFVudHlwZWRGb3JtQ29udHJvbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlzSW5wdXRGb2N1c2VkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0lucHV0Rm9jdXNlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIGRvYyA/IGRvYy5hY3RpdmVFbGVtZW50ID09PSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldEVycm9yTWVzc2FnZXNcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RXJyb3JNZXNzYWdlcyhtZXNzYWdlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobWVzc2FnZXMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZXJyID0+IHRoaXMudmFsdWUuaGFzRXJyb3IoZXJyKSlcclxuICAgICAgICAgICAgLm1hcChlcnIgPT4gbWVzc2FnZXNbZXJyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBoYXNFcnJvcnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhc0Vycm9ycygpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB7IGRpcnR5LCB2YWx1ZSwgdmFsaWQgfSA9IHRoaXMuZm9ybTtcclxuICAgICAgICByZXR1cm4gZGlydHkgJiYgdmFsdWUuaXRlbSAmJiAhdmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb2N1c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBibHVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBibHVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRFbGVtZW50UG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEVsZW1lbnRQb3NpdGlvbigpOiBDbGllbnRSZWN0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSByZW1vdmVzIGlucHV0IGZyb20gdGhlIGNvbXBvbmVudFxyXG4gICAgICogQG5hbWUgZGVzdHJveVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBpbnB1dC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGlucHV0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5RG93blxyXG4gICAgICogQHBhcmFtICRldmVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25LZXlEb3duKCRldmVudCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0ID0gdGhpcy52YWx1ZS52YWx1ZTtcclxuICAgICAgICBpZiAoJGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCgkZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5vbktleWRvd24uZW1pdCgkZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uS2V5VXBcclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uS2V5VXAoJGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFRleHQgPSB0aGlzLnZhbHVlLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9uS2V5dXAuZW1pdCgkZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc3VibWl0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdWJtaXQoJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLm9uU3VibWl0LmVtaXQoJGV2ZW50KTtcclxuICAgIH1cclxufVxyXG4iLCI8IS0tIGZvcm0gLS0+XHJcbjxmb3JtIChuZ1N1Ym1pdCk9XCJzdWJtaXQoJGV2ZW50KVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxyXG4gICAgPGlucHV0ICNpbnB1dFxyXG5cclxuICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgY2xhc3M9XCJuZzItdGFnLWlucHV0X190ZXh0LWlucHV0XCJcclxuICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxyXG4gICAgICAgICAgIHRhYmluZGV4PVwie3sgZGlzYWJsZWQgPyAtMSA6IHRhYmluZGV4ID8gdGFiaW5kZXggOiAwIH19XCJcclxuICAgICAgICAgICBtaW5sZW5ndGg9XCIxXCJcclxuICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJpdGVtXCJcclxuXHJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiXHJcbiAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXHJcbiAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcclxuICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJkaXNhYmxlZCA/IGRpc2FibGVkIDogbnVsbFwiXHJcblxyXG4gICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgKGJsdXIpPVwib25CbHVyLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxyXG4gICAgICAgICAgIChrZXl1cCk9XCJvbktleVVwKCRldmVudClcIlxyXG4gICAgLz5cclxuPC9mb3JtPlxyXG4iXX0=