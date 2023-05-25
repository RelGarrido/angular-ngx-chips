import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewChild } from '@angular/core';
import { TagRipple } from '../tag/tag-ripple.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../icon/icon";
import * as i3 from "./tag-ripple.component";
// mocking navigator
const navigator = typeof window !== 'undefined' ? window.navigator : {
    userAgent: 'Chrome',
    vendor: 'Google Inc'
};
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
class TagComponent {
    element;
    renderer;
    cdRef;
    /**
     * @name model {TagModel}
     */
    model;
    /**
     * @name removable {boolean}
     */
    removable;
    /**
     * @name editable {boolean}
     */
    editable;
    /**
     * @name template {TemplateRef<any>}
     */
    template;
    /**
     * @name displayBy {string}
     */
    displayBy;
    /**
     * @name identifyBy {string}
     */
    identifyBy;
    /**
     * @name index {number}
     */
    index;
    /**
     * @name hasRipple
     */
    hasRipple;
    /**
     * @name disabled
     */
    disabled = false;
    /**
     * @name canAddTag
     */
    canAddTag;
    /**
     * @name onSelect
     */
    onSelect = new EventEmitter();
    /**
     * @name onRemove
     */
    onRemove = new EventEmitter();
    /**
     * @name onBlur
     */
    onBlur = new EventEmitter();
    /**
     * @name onKeyDown
     */
    onKeyDown = new EventEmitter();
    /**
     * @name onTagEdited
     */
    onTagEdited = new EventEmitter();
    /**
     * @name readonly {boolean}
     */
    get readonly() {
        return typeof this.model !== 'string' && this.model.readonly === true;
    }
    /**
     * @name editing
     */
    editing = false;
    /**
     * @name moving
     */
    moving;
    /**
     * @name rippleState
     */
    rippleState = 'none';
    /**
     * @name ripple {TagRipple}
     */
    ripple;
    constructor(element, renderer, cdRef) {
        this.element = element;
        this.renderer = renderer;
        this.cdRef = cdRef;
    }
    /**
     * @name select
     */
    select($event) {
        if (this.readonly || this.disabled) {
            return;
        }
        if ($event) {
            $event.stopPropagation();
        }
        this.focus();
        this.onSelect.emit(this.model);
    }
    /**
     * @name remove
     */
    remove($event) {
        $event.stopPropagation();
        this.onRemove.emit(this);
    }
    /**
     * @name focus
     */
    focus() {
        this.element.nativeElement.focus();
    }
    move() {
        this.moving = true;
    }
    /**
     * @name keydown
     * @param event
     */
    keydown(event) {
        if (this.editing) {
            if (event.keyCode === 13) {
                return this.disableEditMode(event);
            }
        }
        else {
            this.onKeyDown.emit({ event, model: this.model });
        }
    }
    /**
     * @name blink
     */
    blink() {
        const classList = this.element.nativeElement.classList;
        classList.add('blink');
        setTimeout(() => classList.remove('blink'), 50);
    }
    /**
     * @name toggleEditMode
     */
    toggleEditMode() {
        if (this.editable) {
            return this.editing ? undefined : this.activateEditMode();
        }
    }
    /**
     * @name onBlurred
     * @param event
     */
    onBlurred(event) {
        // Checks if it is editable first before handeling the onBlurred event in order to prevent
        // a bug in IE where tags are still editable with onlyFromAutocomplete set to true
        if (!this.editable) {
            return;
        }
        this.disableEditMode();
        const value = event.target.innerText;
        const result = typeof this.model === 'string'
            ? value
            : { ...this.model, [this.displayBy]: value };
        this.onBlur.emit(result);
    }
    /**
     * @name getDisplayValue
     * @param item
     */
    getDisplayValue(item) {
        return typeof item === 'string' ? item : item[this.displayBy];
    }
    /**
     * @desc returns whether the ripple is visible or not
     * only works in Chrome
     * @name isRippleVisible
     */
    get isRippleVisible() {
        return !this.readonly && !this.editing && isChrome && this.hasRipple;
    }
    /**
     * @name disableEditMode
     * @param $event
     */
    disableEditMode($event) {
        const classList = this.element.nativeElement.classList;
        const input = this.getContentEditableText();
        this.editing = false;
        classList.remove('tag--editing');
        if (!input) {
            this.setContentEditableText(this.model);
            return;
        }
        this.storeNewValue(input);
        this.cdRef.detectChanges();
        if ($event) {
            $event.preventDefault();
        }
    }
    /**
     * @name isDeleteIconVisible
     */
    isDeleteIconVisible() {
        return (!this.readonly && !this.disabled && this.removable && !this.editing);
    }
    /**
     * @name getContentEditableText
     */
    getContentEditableText() {
        const input = this.getContentEditable();
        return input ? input.innerText.trim() : '';
    }
    /**
     * @name setContentEditableText
     * @param model
     */
    setContentEditableText(model) {
        const input = this.getContentEditable();
        const value = this.getDisplayValue(model);
        input.innerText = value;
    }
    /**
     * @name
     */
    activateEditMode() {
        const classList = this.element.nativeElement.classList;
        classList.add('tag--editing');
        this.editing = true;
    }
    /**
     * @name storeNewValue
     * @param input
     */
    storeNewValue(input) {
        const exists = (tag) => {
            return typeof tag === 'string'
                ? tag === input
                : tag[this.displayBy] === input;
        };
        const hasId = () => {
            return this.model[this.identifyBy] !== this.model[this.displayBy];
        };
        // if the value changed, replace the value in the model
        if (exists(this.model)) {
            return;
        }
        const model = typeof this.model === 'string'
            ? input
            : {
                index: this.index,
                [this.identifyBy]: hasId()
                    ? this.model[this.identifyBy]
                    : input,
                [this.displayBy]: input
            };
        if (this.canAddTag(model)) {
            this.onTagEdited.emit({ tag: model, index: this.index });
        }
        else {
            this.setContentEditableText(this.model);
        }
    }
    /**
     * @name getContentEditable
     */
    getContentEditable() {
        return this.element.nativeElement.querySelector('[contenteditable]');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagComponent, selector: "tag", inputs: { model: "model", removable: "removable", editable: "editable", template: "template", displayBy: "displayBy", identifyBy: "identifyBy", index: "index", hasRipple: "hasRipple", disabled: "disabled", canAddTag: "canAddTag" }, outputs: { onSelect: "onSelect", onRemove: "onRemove", onBlur: "onBlur", onKeyDown: "onKeyDown", onTagEdited: "onTagEdited" }, host: { listeners: { "keydown": "keydown($event)" }, properties: { "class.moving": "this.moving" } }, viewQueries: [{ propertyName: "ripple", first: true, predicate: TagRipple, descendants: true }], ngImport: i0, template: "<div (click)=\"select($event)\"\r\n     (dblclick)=\"toggleEditMode()\"\r\n     (mousedown)=\"rippleState='clicked'\"\r\n     (mouseup)=\"rippleState='none'\"\r\n     [ngSwitch]=\"!!template\"\r\n     [class.disabled]=\"disabled\"\r\n     [attr.tabindex]=\"-1\"\r\n     [attr.aria-label]=\"getDisplayValue(model)\">\r\n\r\n    <div *ngSwitchCase=\"true\" [attr.contenteditable]=\"editing\">\r\n        <!-- CUSTOM TEMPLATE -->\r\n        <ng-template\r\n            [ngTemplateOutletContext]=\"{ item: model, index: index }\"\r\n            [ngTemplateOutlet]=\"template\">\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"false\" class=\"tag-wrapper\">\r\n        <!-- TAG NAME -->\r\n        <div [attr.contenteditable]=\"editing\"\r\n             [attr.title]=\"getDisplayValue(model)\"\r\n             class=\"tag__text inline\"\r\n             spellcheck=\"false\"\r\n             (keydown.enter)=\"disableEditMode($event)\"\r\n             (keydown.escape)=\"disableEditMode($event)\"\r\n             (click)=\"editing ? $event.stopPropagation() : undefined\"\r\n             (blur)=\"onBlurred($event)\">\r\n            {{ getDisplayValue(model) }}\r\n        </div>\r\n\r\n        <!-- 'X' BUTTON -->\r\n        <delete-icon\r\n            aria-label=\"Remove tag\"\r\n            role=\"button\"\r\n            (click)=\"remove($event)\"\r\n            *ngIf=\"isDeleteIconVisible()\">\r\n        </delete-icon>\r\n    </div>\r\n</div>\r\n\r\n<tag-ripple [state]=\"rippleState\"\r\n            [attr.tabindex]=\"-1\"\r\n            *ngIf=\"isRippleVisible\">\r\n</tag-ripple>\r\n", styles: [":host,:host>div,:host>div:focus{outline:0;overflow:hidden;transition:opacity 1s;z-index:1}:host{max-width:400px}:host.blink{animation:blink .3s normal forwards ease-in-out}@keyframes blink{0%{opacity:.3}}:host .disabled{cursor:not-allowed}:host [contenteditable=true]{outline:0}.tag-wrapper{flex-direction:row;display:flex}.tag__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i2.DeleteIconComponent, selector: "delete-icon" }, { kind: "component", type: i3.TagRipple, selector: "tag-ripple", inputs: ["state"] }] });
}
export { TagComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tag', template: "<div (click)=\"select($event)\"\r\n     (dblclick)=\"toggleEditMode()\"\r\n     (mousedown)=\"rippleState='clicked'\"\r\n     (mouseup)=\"rippleState='none'\"\r\n     [ngSwitch]=\"!!template\"\r\n     [class.disabled]=\"disabled\"\r\n     [attr.tabindex]=\"-1\"\r\n     [attr.aria-label]=\"getDisplayValue(model)\">\r\n\r\n    <div *ngSwitchCase=\"true\" [attr.contenteditable]=\"editing\">\r\n        <!-- CUSTOM TEMPLATE -->\r\n        <ng-template\r\n            [ngTemplateOutletContext]=\"{ item: model, index: index }\"\r\n            [ngTemplateOutlet]=\"template\">\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"false\" class=\"tag-wrapper\">\r\n        <!-- TAG NAME -->\r\n        <div [attr.contenteditable]=\"editing\"\r\n             [attr.title]=\"getDisplayValue(model)\"\r\n             class=\"tag__text inline\"\r\n             spellcheck=\"false\"\r\n             (keydown.enter)=\"disableEditMode($event)\"\r\n             (keydown.escape)=\"disableEditMode($event)\"\r\n             (click)=\"editing ? $event.stopPropagation() : undefined\"\r\n             (blur)=\"onBlurred($event)\">\r\n            {{ getDisplayValue(model) }}\r\n        </div>\r\n\r\n        <!-- 'X' BUTTON -->\r\n        <delete-icon\r\n            aria-label=\"Remove tag\"\r\n            role=\"button\"\r\n            (click)=\"remove($event)\"\r\n            *ngIf=\"isDeleteIconVisible()\">\r\n        </delete-icon>\r\n    </div>\r\n</div>\r\n\r\n<tag-ripple [state]=\"rippleState\"\r\n            [attr.tabindex]=\"-1\"\r\n            *ngIf=\"isRippleVisible\">\r\n</tag-ripple>\r\n", styles: [":host,:host>div,:host>div:focus{outline:0;overflow:hidden;transition:opacity 1s;z-index:1}:host{max-width:400px}:host.blink{animation:blink .3s normal forwards ease-in-out}@keyframes blink{0%{opacity:.3}}:host .disabled{cursor:not-allowed}:host [contenteditable=true]{outline:0}.tag-wrapper{flex-direction:row;display:flex}.tag__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { model: [{
                type: Input
            }], removable: [{
                type: Input
            }], editable: [{
                type: Input
            }], template: [{
                type: Input
            }], displayBy: [{
                type: Input
            }], identifyBy: [{
                type: Input
            }], index: [{
                type: Input
            }], hasRipple: [{
                type: Input
            }], disabled: [{
                type: Input
            }], canAddTag: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onKeyDown: [{
                type: Output
            }], onTagEdited: [{
                type: Output
            }], moving: [{
                type: HostBinding,
                args: ['class.moving']
            }], ripple: [{
                type: ViewChild,
                args: [TagRipple]
            }], keydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50cy90YWcvdGFnLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50cy90YWcvdGFnLnRlbXBsYXRlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFHWixZQUFZLEVBQ1osV0FBVyxFQUNYLFNBQVMsRUFHWixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7O0FBRXhELG9CQUFvQjtBQUNwQixNQUFNLFNBQVMsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLFNBQVMsRUFBRSxRQUFRO0lBQ25CLE1BQU0sRUFBRSxZQUFZO0NBQ3ZCLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzRixNQUthLFlBQVk7SUF5SFY7SUFDQTtJQUNDO0lBMUhaOztPQUVHO0lBRUksS0FBSyxDQUFXO0lBRXZCOztPQUVHO0lBRUksU0FBUyxDQUFVO0lBRTFCOztPQUVHO0lBRUksUUFBUSxDQUFVO0lBRXpCOztPQUVHO0lBRUksUUFBUSxDQUFtQjtJQUVsQzs7T0FFRztJQUVJLFNBQVMsQ0FBUztJQUV6Qjs7T0FFRztJQUVJLFVBQVUsQ0FBUztJQUUxQjs7T0FFRztJQUVJLEtBQUssQ0FBUztJQUVyQjs7T0FFRztJQUVJLFNBQVMsQ0FBVTtJQUUxQjs7T0FFRztJQUVJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFFeEI7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QztTQUM1RDthQUFNO1lBQ0gsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLGtCQUFrQjtRQUN0QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7dUdBclZRLFlBQVk7MkZBQVosWUFBWSxnaUJBcUhWLFNBQVMsZ0RDbkp4Qiw2a0RBNENBOztTRGRhLFlBQVk7MkZBQVosWUFBWTtrQkFMeEIsU0FBUzsrQkFDSSxLQUFLO3lKQVNSLEtBQUs7c0JBRFgsS0FBSztnQkFPQyxTQUFTO3NCQURmLEtBQUs7Z0JBT0MsUUFBUTtzQkFEZCxLQUFLO2dCQU9DLFFBQVE7c0JBRGQsS0FBSztnQkFPQyxTQUFTO3NCQURmLEtBQUs7Z0JBT0MsVUFBVTtzQkFEaEIsS0FBSztnQkFPQyxLQUFLO3NCQURYLEtBQUs7Z0JBT0MsU0FBUztzQkFEZixLQUFLO2dCQU9DLFFBQVE7c0JBRGQsS0FBSztnQkFPQyxTQUFTO3NCQURmLEtBQUs7Z0JBT0MsUUFBUTtzQkFEZCxNQUFNO2dCQU9BLFFBQVE7c0JBRGQsTUFBTTtnQkFPQSxNQUFNO3NCQURaLE1BQU07Z0JBT0EsU0FBUztzQkFEZixNQUFNO2dCQU9BLFdBQVc7c0JBRGpCLE1BQU07Z0JBbUJBLE1BQU07c0JBRFosV0FBVzt1QkFBQyxjQUFjO2dCQVlwQixNQUFNO3NCQURaLFNBQVM7dUJBQUMsU0FBUztnQkFrRGIsT0FBTztzQkFEYixZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIE91dHB1dCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIFRlbXBsYXRlUmVmLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIEhvc3RCaW5kaW5nLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRhZ01vZGVsIH0gZnJvbSAnLi4vLi4vY29yZS90YWctbW9kZWwnO1xyXG5pbXBvcnQgeyBUYWdSaXBwbGUgfSBmcm9tICcuLi90YWcvdGFnLXJpcHBsZS5jb21wb25lbnQnO1xyXG5cclxuLy8gbW9ja2luZyBuYXZpZ2F0b3JcclxuY29uc3QgbmF2aWdhdG9yID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubmF2aWdhdG9yIDoge1xyXG4gICAgdXNlckFnZW50OiAnQ2hyb21lJyxcclxuICAgIHZlbmRvcjogJ0dvb2dsZSBJbmMnXHJcbn07XHJcblxyXG5jb25zdCBpc0Nocm9tZSA9IC9DaHJvbWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgL0dvb2dsZSBJbmMvLnRlc3QobmF2aWdhdG9yLnZlbmRvcik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFnJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWcudGVtcGxhdGUuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90YWctY29tcG9uZW50LnN0eWxlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbW9kZWwge1RhZ01vZGVsfVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIG1vZGVsOiBUYWdNb2RlbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJlbW92YWJsZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyByZW1vdmFibGU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBlZGl0YWJsZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBlZGl0YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRlbXBsYXRlIHtUZW1wbGF0ZVJlZjxhbnk+fVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZGlzcGxheUJ5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZGlzcGxheUJ5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpZGVudGlmeUJ5IHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgaWRlbnRpZnlCeTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaW5kZXgge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaGFzUmlwcGxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgaGFzUmlwcGxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZGlzYWJsZWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgY2FuQWRkVGFnXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgY2FuQWRkVGFnOiAodGFnOiBUYWdNb2RlbCkgPT4gYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uU2VsZWN0XHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uUmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uQmx1clxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyBvbkJsdXI6IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25LZXlEb3duXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uS2V5RG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnRWRpdGVkXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIG9uVGFnRWRpdGVkOiBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHJlYWRvbmx5IHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5tb2RlbCAhPT0gJ3N0cmluZycgJiYgdGhpcy5tb2RlbC5yZWFkb25seSA9PT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGVkaXRpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVkaXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1vdmluZ1xyXG4gICAgICovXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1vdmluZycpXHJcbiAgICBwdWJsaWMgbW92aW5nOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmlwcGxlU3RhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJpcHBsZVN0YXRlID0gJ25vbmUnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmlwcGxlIHtUYWdSaXBwbGV9XHJcbiAgICAgKi9cclxuICAgIEBWaWV3Q2hpbGQoVGFnUmlwcGxlKVxyXG4gICAgcHVibGljIHJpcHBsZTogVGFnUmlwcGxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgICApIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZWxlY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdCgkZXZlbnQ/OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMubW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVtb3ZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmUoJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmUuZW1pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGZvY3VzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGtleWRvd25cclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICovXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICAgIHB1YmxpYyBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdGluZykge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVFZGl0TW9kZShldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uS2V5RG93bi5lbWl0KHsgZXZlbnQsIG1vZGVsOiB0aGlzLm1vZGVsIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGJsaW5rXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBibGluaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnYmxpbmsnKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjbGFzc0xpc3QucmVtb3ZlKCdibGluaycpLCA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0b2dnbGVFZGl0TW9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9nZ2xlRWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdGluZyA/IHVuZGVmaW5lZCA6IHRoaXMuYWN0aXZhdGVFZGl0TW9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uQmx1cnJlZFxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkJsdXJyZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vIENoZWNrcyBpZiBpdCBpcyBlZGl0YWJsZSBmaXJzdCBiZWZvcmUgaGFuZGVsaW5nIHRoZSBvbkJsdXJyZWQgZXZlbnQgaW4gb3JkZXIgdG8gcHJldmVudFxyXG4gICAgICAgIC8vIGEgYnVnIGluIElFIHdoZXJlIHRhZ3MgYXJlIHN0aWxsIGVkaXRhYmxlIHdpdGggb25seUZyb21BdXRvY29tcGxldGUgc2V0IHRvIHRydWVcclxuICAgICAgICBpZiAoIXRoaXMuZWRpdGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kaXNhYmxlRWRpdE1vZGUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IGV2ZW50LnRhcmdldC5pbm5lclRleHQ7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID1cclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubW9kZWwgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICA/IHZhbHVlXHJcbiAgICAgICAgICAgICAgICA6IHsgLi4udGhpcy5tb2RlbCwgW3RoaXMuZGlzcGxheUJ5XTogdmFsdWUgfTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0RGlzcGxheVZhbHVlXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGlzcGxheVZhbHVlKGl0ZW06IFRhZ01vZGVsKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnID8gaXRlbSA6IGl0ZW1bdGhpcy5kaXNwbGF5QnldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIHRoZSByaXBwbGUgaXMgdmlzaWJsZSBvciBub3RcclxuICAgICAqIG9ubHkgd29ya3MgaW4gQ2hyb21lXHJcbiAgICAgKiBAbmFtZSBpc1JpcHBsZVZpc2libGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc1JpcHBsZVZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmVkaXRpbmcgJiYgaXNDaHJvbWUgJiYgdGhpcy5oYXNSaXBwbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlRWRpdE1vZGVcclxuICAgICAqIEBwYXJhbSAkZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVFZGl0TW9kZSgkZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlVGV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCd0YWctLWVkaXRpbmcnKTtcclxuXHJcbiAgICAgICAgaWYgKCFpbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRFZGl0YWJsZVRleHQodGhpcy5tb2RlbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcmVOZXdWYWx1ZShpbnB1dCk7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgIGlmICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNEZWxldGVJY29uVmlzaWJsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNEZWxldGVJY29uVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAhdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJlbW92YWJsZSAmJiAhdGhpcy5lZGl0aW5nXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldENvbnRlbnRFZGl0YWJsZVRleHRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb250ZW50RWRpdGFibGVUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5wdXQgPyBpbnB1dC5pbm5lclRleHQudHJpbSgpIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRDb250ZW50RWRpdGFibGVUZXh0XHJcbiAgICAgKiBAcGFyYW0gbW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRDb250ZW50RWRpdGFibGVUZXh0KG1vZGVsOiBUYWdNb2RlbCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGUoKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKG1vZGVsKTtcclxuXHJcbiAgICAgICAgaW5wdXQuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlRWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2xhc3NMaXN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3RhZy0tZWRpdGluZycpO1xyXG5cclxuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc3RvcmVOZXdWYWx1ZVxyXG4gICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RvcmVOZXdWYWx1ZShpbnB1dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXhpc3RzID0gKHRhZzogVGFnTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICA/IHRhZyA9PT0gaW5wdXRcclxuICAgICAgICAgICAgICAgIDogdGFnW3RoaXMuZGlzcGxheUJ5XSA9PT0gaW5wdXQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgaGFzSWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsW3RoaXMuaWRlbnRpZnlCeV0gIT09IHRoaXMubW9kZWxbdGhpcy5kaXNwbGF5QnldO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBjaGFuZ2VkLCByZXBsYWNlIHRoZSB2YWx1ZSBpbiB0aGUgbW9kZWxcclxuICAgICAgICBpZiAoZXhpc3RzKHRoaXMubW9kZWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZGVsID1cclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubW9kZWwgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICA/IGlucHV0XHJcbiAgICAgICAgICAgICAgICA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IGhhc0lkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMubW9kZWxbdGhpcy5pZGVudGlmeUJ5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogaW5wdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5kaXNwbGF5QnldOiBpbnB1dFxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jYW5BZGRUYWcobW9kZWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UYWdFZGl0ZWQuZW1pdCh7IHRhZzogbW9kZWwsIGluZGV4OiB0aGlzLmluZGV4IH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudEVkaXRhYmxlVGV4dCh0aGlzLm1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRDb250ZW50RWRpdGFibGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDb250ZW50RWRpdGFibGUoKTogSFRNTElucHV0RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjb250ZW50ZWRpdGFibGVdJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiPGRpdiAoY2xpY2spPVwic2VsZWN0KCRldmVudClcIlxyXG4gICAgIChkYmxjbGljayk9XCJ0b2dnbGVFZGl0TW9kZSgpXCJcclxuICAgICAobW91c2Vkb3duKT1cInJpcHBsZVN0YXRlPSdjbGlja2VkJ1wiXHJcbiAgICAgKG1vdXNldXApPVwicmlwcGxlU3RhdGU9J25vbmUnXCJcclxuICAgICBbbmdTd2l0Y2hdPVwiISF0ZW1wbGF0ZVwiXHJcbiAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXHJcbiAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXREaXNwbGF5VmFsdWUobW9kZWwpXCI+XHJcblxyXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIFthdHRyLmNvbnRlbnRlZGl0YWJsZV09XCJlZGl0aW5nXCI+XHJcbiAgICAgICAgPCEtLSBDVVNUT00gVEVNUExBVEUgLS0+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGl0ZW06IG1vZGVsLCBpbmRleDogaW5kZXggfVwiXHJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJ0YWctd3JhcHBlclwiPlxyXG4gICAgICAgIDwhLS0gVEFHIE5BTUUgLS0+XHJcbiAgICAgICAgPGRpdiBbYXR0ci5jb250ZW50ZWRpdGFibGVdPVwiZWRpdGluZ1wiXHJcbiAgICAgICAgICAgICBbYXR0ci50aXRsZV09XCJnZXREaXNwbGF5VmFsdWUobW9kZWwpXCJcclxuICAgICAgICAgICAgIGNsYXNzPVwidGFnX190ZXh0IGlubGluZVwiXHJcbiAgICAgICAgICAgICBzcGVsbGNoZWNrPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiZGlzYWJsZUVkaXRNb2RlKCRldmVudClcIlxyXG4gICAgICAgICAgICAgKGtleWRvd24uZXNjYXBlKT1cImRpc2FibGVFZGl0TW9kZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgIChjbGljayk9XCJlZGl0aW5nID8gJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIDogdW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgIChibHVyKT1cIm9uQmx1cnJlZCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIHt7IGdldERpc3BsYXlWYWx1ZShtb2RlbCkgfX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPCEtLSAnWCcgQlVUVE9OIC0tPlxyXG4gICAgICAgIDxkZWxldGUtaWNvblxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiUmVtb3ZlIHRhZ1wiXHJcbiAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlKCRldmVudClcIlxyXG4gICAgICAgICAgICAqbmdJZj1cImlzRGVsZXRlSWNvblZpc2libGUoKVwiPlxyXG4gICAgICAgIDwvZGVsZXRlLWljb24+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48dGFnLXJpcHBsZSBbc3RhdGVdPVwicmlwcGxlU3RhdGVcIlxyXG4gICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXHJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNSaXBwbGVWaXNpYmxlXCI+XHJcbjwvdGFnLXJpcHBsZT5cclxuIl19