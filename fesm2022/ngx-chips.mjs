import * as i0 from '@angular/core';
import { Pipe, Injectable, Directive, Input, EventEmitter, Component, Output, ViewChild, HostBinding, HostListener, TemplateRef, ContentChildren, forwardRef, ContentChild, ViewChildren, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from 'ng2-material-dropdown';
import { Ng2Dropdown, Ng2DropdownModule } from 'ng2-material-dropdown';
import { distinctUntilChanged, debounceTime, filter, first, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

const escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
class HighlightPipe {
    /**
     * @name transform
     * @param value {string}
     * @param arg {string}
     */
    transform(value, arg) {
        if (!arg.trim()) {
            return value;
        }
        try {
            const regex = new RegExp(`(${escape(arg)})`, 'i');
            return value.replace(regex, '<b>$1</b>');
        }
        catch (e) {
            return value;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: HighlightPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.0.2", ngImport: i0, type: HighlightPipe, name: "highlight" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: HighlightPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'highlight'
                }]
        }] });

/*
** constants and default values for <tag-input>
 */
const PLACEHOLDER = '+ Tag';
const SECONDARY_PLACEHOLDER = 'Enter a new tag';
const KEYDOWN = 'keydown';
const KEYUP = 'keyup';
const FOCUS = 'focus';
const MAX_ITEMS_WARNING = 'The number of items specified was greater than the property max-items.';
const ACTIONS_KEYS = {
    DELETE: 'DELETE',
    SWITCH_PREV: 'SWITCH_PREV',
    SWITCH_NEXT: 'SWITCH_NEXT',
    TAB: 'TAB'
};
const KEY_PRESS_ACTIONS = {
    8: ACTIONS_KEYS.DELETE,
    46: ACTIONS_KEYS.DELETE,
    37: ACTIONS_KEYS.SWITCH_PREV,
    39: ACTIONS_KEYS.SWITCH_NEXT,
    9: ACTIONS_KEYS.TAB
};
const DRAG_AND_DROP_KEY = 'Text';
const NEXT = 'NEXT';
const PREV = 'PREV';

class DragProvider {
    sender;
    receiver;
    state = {
        dragging: false,
        dropping: false,
        index: undefined
    };
    /**
     * @name setDraggedItem
     * @param event
     * @param tag
     */
    setDraggedItem(event, tag) {
        if (event && event.dataTransfer) {
            event.dataTransfer.setData(DRAG_AND_DROP_KEY, JSON.stringify(tag));
        }
    }
    /**
     * @name getDraggedItem
     * @param event
     */
    getDraggedItem(event) {
        if (event && event.dataTransfer) {
            const data = event.dataTransfer.getData(DRAG_AND_DROP_KEY);
            try {
                return JSON.parse(data);
            }
            catch {
                return;
            }
        }
    }
    /**
     * @name setSender
     * @param sender
     */
    setSender(sender) {
        this.sender = sender;
    }
    /**
     * @name setReceiver
     * @param receiver
     */
    setReceiver(receiver) {
        this.receiver = receiver;
    }
    /**
     * @name onTagDropped
     * @param tag
     * @param indexDragged
     * @param indexDropped
     */
    onTagDropped(tag, indexDragged, indexDropped) {
        this.onDragEnd();
        this.sender.onRemoveRequested(tag, indexDragged);
        this.receiver.onAddingRequested(false, tag, indexDropped);
    }
    /**
     * @name setState
     * @param state
     */
    setState(state) {
        this.state = { ...this.state, ...state };
    }
    /**
     * @name getState
     * @param key
     */
    getState(key) {
        return key ? this.state[key] : this.state;
    }
    /**
     * @name onDragEnd
     */
    onDragEnd() {
        this.setState({
            dragging: false,
            dropping: false,
            index: undefined
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DragProvider, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DragProvider });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DragProvider, decorators: [{
            type: Injectable
        }] });

const defaults = {
    tagInput: {
        separatorKeys: [],
        separatorKeyCodes: [],
        maxItems: Infinity,
        placeholder: PLACEHOLDER,
        secondaryPlaceholder: SECONDARY_PLACEHOLDER,
        validators: [],
        asyncValidators: [],
        onlyFromAutocomplete: false,
        errorMessages: {},
        theme: '',
        onTextChangeDebounce: 250,
        inputId: null,
        inputClass: '',
        clearOnBlur: false,
        hideForm: false,
        addOnBlur: false,
        addOnPaste: false,
        pasteSplitPattern: ',',
        blinkIfDupe: true,
        removable: true,
        editable: false,
        allowDupes: false,
        modelAsStrings: false,
        trimTags: true,
        ripple: true,
        tabIndex: '',
        disable: false,
        dragZone: '',
        onRemoving: undefined,
        onAdding: undefined,
        displayBy: 'display',
        identifyBy: 'value',
        animationDuration: {
            enter: '250ms',
            leave: '150ms'
        }
    },
    dropdown: {
        displayBy: 'display',
        identifyBy: 'value',
        appendToBody: true,
        offset: '50 0',
        focusFirstElement: false,
        showDropdownIfEmpty: false,
        minimumTextLength: 1,
        limitItemsTo: Infinity,
        keepOpen: true,
        dynamicUpdate: true,
        zIndex: 1000,
        matchingFn
    }
};
/**
 * @name matchingFn
 * @param this
 * @param value
 * @param target
 */
function matchingFn(value, target) {
    const targetValue = target[this.displayBy].toString();
    return targetValue && targetValue
        .toLowerCase()
        .indexOf(value.toLowerCase()) >= 0;
}

class OptionsProvider {
    static defaults = defaults;
    setOptions(options) {
        OptionsProvider.defaults.tagInput = { ...defaults.tagInput, ...options.tagInput };
        OptionsProvider.defaults.dropdown = { ...defaults.dropdown, ...options.dropdown };
    }
}

function isObject(obj) {
    return obj === Object(obj);
}
class TagInputAccessor {
    _items = [];
    _onTouchedCallback;
    _onChangeCallback;
    dropdown;
    /**
     * @name displayBy
     */
    displayBy = OptionsProvider.defaults.tagInput.displayBy;
    /**
     * @name identifyBy
     */
    identifyBy = OptionsProvider.defaults.tagInput.identifyBy;
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
        this._onChangeCallback(this._items);
    }
    onTouched() {
        this._onTouchedCallback();
    }
    writeValue(items) {
        this._items = items || [];
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * @name getItemValue
     * @param item
     * @param fromDropdown
     */
    getItemValue(item, fromDropdown = false) {
        const property = fromDropdown && this.dropdown ? this.dropdown.identifyBy : this.identifyBy;
        return isObject(item) ? item[property] : item;
    }
    /**
     * @name getItemDisplay
     * @param item
     * @param fromDropdown
     */
    getItemDisplay(item, fromDropdown = false) {
        const property = fromDropdown && this.dropdown ? this.dropdown.displayBy : this.displayBy;
        return isObject(item) ? item[property] : item;
    }
    /**
     * @name getItemsWithout
     * @param index
     */
    getItemsWithout(index) {
        return this.items.filter((item, position) => position !== index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputAccessor, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.2", type: TagInputAccessor, inputs: { displayBy: "displayBy", identifyBy: "identifyBy" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputAccessor, decorators: [{
            type: Directive
        }], propDecorators: { displayBy: [{
                type: Input
            }], identifyBy: [{
                type: Input
            }] } });

/**
 * @name listen
 * @param listenerType
 * @param action
 * @param condition
 */
function listen(listenerType, action, condition = true) {
    // if the event provided does not exist, throw an error
    if (!this.listeners.hasOwnProperty(listenerType)) {
        throw new Error('The event entered may be wrong');
    }
    // if a condition is present and is false, exit early
    if (!condition) {
        return;
    }
    // fire listener
    this.listeners[listenerType].push(action);
}

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

class TagRipple {
    state = 'none';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagRipple, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagRipple, selector: "tag-ripple", inputs: { state: "state" }, ngImport: i0, template: `
        <div class="tag-ripple" [@ink]="state"></div>
    `, isInline: true, styles: [":host{width:100%;height:100%;left:0;overflow:hidden;position:absolute}.tag-ripple{background:rgba(0,0,0,.1);top:50%;left:50%;height:100%;transform:translate(-50%,-50%);position:absolute}\n"], animations: [
            trigger('ink', [
                state('none', style({ width: 0, opacity: 0 })),
                transition('none => clicked', [
                    animate(300, keyframes([
                        style({ opacity: 1, offset: 0, width: '30%', borderRadius: '100%' }),
                        style({ opacity: 1, offset: 0.5, width: '50%' }),
                        style({ opacity: 0.5, offset: 1, width: '100%', borderRadius: '16px' })
                    ]))
                ])
            ])
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagRipple, decorators: [{
            type: Component,
            args: [{ selector: 'tag-ripple', template: `
        <div class="tag-ripple" [@ink]="state"></div>
    `, animations: [
                        trigger('ink', [
                            state('none', style({ width: 0, opacity: 0 })),
                            transition('none => clicked', [
                                animate(300, keyframes([
                                    style({ opacity: 1, offset: 0, width: '30%', borderRadius: '100%' }),
                                    style({ opacity: 1, offset: 0.5, width: '50%' }),
                                    style({ opacity: 0.5, offset: 1, width: '100%', borderRadius: '16px' })
                                ]))
                            ])
                        ])
                    ], styles: [":host{width:100%;height:100%;left:0;overflow:hidden;position:absolute}.tag-ripple{background:rgba(0,0,0,.1);top:50%;left:50%;height:100%;transform:translate(-50%,-50%);position:absolute}\n"] }]
        }], propDecorators: { state: [{
                type: Input
            }] } });

class DeleteIconComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DeleteIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: DeleteIconComponent, selector: "delete-icon", ngImport: i0, template: "<span>\r\n    <svg\r\n        height=\"16px\"\r\n        viewBox=\"0 0 32 32\"\r\n        width=\"16px\"\r\n    >\r\n        <path\r\n            d=\"M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z\"\r\n            fill=\"#121313\"\r\n        />\r\n    </svg>\r\n</span>", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}:host(delete-icon){width:20px;height:16px;transition:all .15s;display:inline-block;text-align:right}:host(delete-icon) path{fill:#444}:host(delete-icon) svg{vertical-align:bottom;height:34px}:host(delete-icon):hover{transform:scale(1.5) translateY(-3px)}:host-context(.dark){text-align:right}:host-context(.dark) path{fill:#fff}:host-context(.dark) svg{vertical-align:bottom;height:34px}:host-context(.minimal){text-align:right}:host-context(.minimal) path{fill:#444}:host-context(.minimal) svg{vertical-align:bottom;height:34px}:host-context(.bootstrap){text-align:right}:host-context(.bootstrap) path{fill:#fff}:host-context(.bootstrap) svg{vertical-align:bottom;height:34px}:host-context(tag:focus) path,:host-context(tag:active) path{fill:#fff}:host-context(.dark tag:focus) path,:host-context(.dark tag:active) path{fill:#000}:host-context(.minimal tag:focus) path,:host-context(.minimal tag:active) path{fill:#000}:host-context(.bootstrap tag:focus) path,:host-context(.bootstrap tag:active) path{fill:#fff}:host-context(.bootstrap3-info){height:inherit}:host-context(.bootstrap3-info) path{fill:#fff}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DeleteIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'delete-icon', template: "<span>\r\n    <svg\r\n        height=\"16px\"\r\n        viewBox=\"0 0 32 32\"\r\n        width=\"16px\"\r\n    >\r\n        <path\r\n            d=\"M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z\"\r\n            fill=\"#121313\"\r\n        />\r\n    </svg>\r\n</span>", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}:host(delete-icon){width:20px;height:16px;transition:all .15s;display:inline-block;text-align:right}:host(delete-icon) path{fill:#444}:host(delete-icon) svg{vertical-align:bottom;height:34px}:host(delete-icon):hover{transform:scale(1.5) translateY(-3px)}:host-context(.dark){text-align:right}:host-context(.dark) path{fill:#fff}:host-context(.dark) svg{vertical-align:bottom;height:34px}:host-context(.minimal){text-align:right}:host-context(.minimal) path{fill:#444}:host-context(.minimal) svg{vertical-align:bottom;height:34px}:host-context(.bootstrap){text-align:right}:host-context(.bootstrap) path{fill:#fff}:host-context(.bootstrap) svg{vertical-align:bottom;height:34px}:host-context(tag:focus) path,:host-context(tag:active) path{fill:#fff}:host-context(.dark tag:focus) path,:host-context(.dark tag:active) path{fill:#000}:host-context(.minimal tag:focus) path,:host-context(.minimal tag:active) path{fill:#000}:host-context(.bootstrap tag:focus) path,:host-context(.bootstrap tag:active) path{fill:#fff}:host-context(.bootstrap3-info){height:inherit}:host-context(.bootstrap3-info) path{fill:#fff}\n"] }]
        }] });

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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagComponent, selector: "tag", inputs: { model: "model", removable: "removable", editable: "editable", template: "template", displayBy: "displayBy", identifyBy: "identifyBy", index: "index", hasRipple: "hasRipple", disabled: "disabled", canAddTag: "canAddTag" }, outputs: { onSelect: "onSelect", onRemove: "onRemove", onBlur: "onBlur", onKeyDown: "onKeyDown", onTagEdited: "onTagEdited" }, host: { listeners: { "keydown": "keydown($event)" }, properties: { "class.moving": "this.moving" } }, viewQueries: [{ propertyName: "ripple", first: true, predicate: TagRipple, descendants: true }], ngImport: i0, template: "<div (click)=\"select($event)\"\r\n     (dblclick)=\"toggleEditMode()\"\r\n     (mousedown)=\"rippleState='clicked'\"\r\n     (mouseup)=\"rippleState='none'\"\r\n     [ngSwitch]=\"!!template\"\r\n     [class.disabled]=\"disabled\"\r\n     [attr.tabindex]=\"-1\"\r\n     [attr.aria-label]=\"getDisplayValue(model)\">\r\n\r\n    <div *ngSwitchCase=\"true\" [attr.contenteditable]=\"editing\">\r\n        <!-- CUSTOM TEMPLATE -->\r\n        <ng-template\r\n            [ngTemplateOutletContext]=\"{ item: model, index: index }\"\r\n            [ngTemplateOutlet]=\"template\">\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div *ngSwitchCase=\"false\" class=\"tag-wrapper\">\r\n        <!-- TAG NAME -->\r\n        <div [attr.contenteditable]=\"editing\"\r\n             [attr.title]=\"getDisplayValue(model)\"\r\n             class=\"tag__text inline\"\r\n             spellcheck=\"false\"\r\n             (keydown.enter)=\"disableEditMode($event)\"\r\n             (keydown.escape)=\"disableEditMode($event)\"\r\n             (click)=\"editing ? $event.stopPropagation() : undefined\"\r\n             (blur)=\"onBlurred($event)\">\r\n            {{ getDisplayValue(model) }}\r\n        </div>\r\n\r\n        <!-- 'X' BUTTON -->\r\n        <delete-icon\r\n            aria-label=\"Remove tag\"\r\n            role=\"button\"\r\n            (click)=\"remove($event)\"\r\n            *ngIf=\"isDeleteIconVisible()\">\r\n        </delete-icon>\r\n    </div>\r\n</div>\r\n\r\n<tag-ripple [state]=\"rippleState\"\r\n            [attr.tabindex]=\"-1\"\r\n            *ngIf=\"isRippleVisible\">\r\n</tag-ripple>\r\n", styles: [":host,:host>div,:host>div:focus{outline:0;overflow:hidden;transition:opacity 1s;z-index:1}:host{max-width:400px}:host.blink{animation:blink .3s normal forwards ease-in-out}@keyframes blink{0%{opacity:.3}}:host .disabled{cursor:not-allowed}:host [contenteditable=true]{outline:0}.tag-wrapper{flex-direction:row;display:flex}.tag__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: DeleteIconComponent, selector: "delete-icon" }, { kind: "component", type: TagRipple, selector: "tag-ripple", inputs: ["state"] }] });
}
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

/**
 * @name animations
 */
const animations = [
    trigger('animation', [
        state('in', style({
            opacity: 1
        })),
        state('out', style({
            opacity: 0
        })),
        transition(':enter', [
            animate('{{ enter }}', keyframes([
                style({ opacity: 0, offset: 0, transform: 'translate(0px, 20px)' }),
                style({ opacity: 0.3, offset: 0.3, transform: 'translate(0px, -10px)' }),
                style({ opacity: 0.5, offset: 0.5, transform: 'translate(0px, 0px)' }),
                style({ opacity: 0.75, offset: 0.75, transform: 'translate(0px, 5px)' }),
                style({ opacity: 1, offset: 1, transform: 'translate(0px, 0px)' })
            ]))
        ]),
        transition(':leave', [
            animate('{{ leave }}', keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
            ]))
        ])
    ])
];

class TagInputDropdown {
    injector;
    /**
     * @name dropdown
     */
    dropdown;
    /**
     * @name menuTemplate
     * @desc reference to the template if provided by the user
     */
    templates;
    /**
     * @name offset
     */
    offset = defaults.dropdown.offset;
    /**
     * @name focusFirstElement
     */
    focusFirstElement = defaults.dropdown.focusFirstElement;
    /**
     * - show autocomplete dropdown if the value of input is empty
     * @name showDropdownIfEmpty
     */
    showDropdownIfEmpty = defaults.dropdown.showDropdownIfEmpty;
    /**
     * @description observable passed as input which populates the autocomplete items
     * @name autocompleteObservable
     */
    autocompleteObservable;
    /**
     * - desc minimum text length in order to display the autocomplete dropdown
     * @name minimumTextLength
     */
    minimumTextLength = defaults.dropdown.minimumTextLength;
    /**
     * - number of items to display in the autocomplete dropdown
     * @name limitItemsTo
     */
    limitItemsTo = defaults.dropdown.limitItemsTo;
    /**
     * @name displayBy
     */
    displayBy = defaults.dropdown.displayBy;
    /**
     * @name identifyBy
     */
    identifyBy = defaults.dropdown.identifyBy;
    /**
     * @description a function a developer can use to implement custom matching for the autocomplete
     * @name matchingFn
     */
    matchingFn = defaults.dropdown.matchingFn;
    /**
     * @name appendToBody
     */
    appendToBody = defaults.dropdown.appendToBody;
    /**
     * @name keepOpen
     * @description option to leave dropdown open when adding a new item
     */
    keepOpen = defaults.dropdown.keepOpen;
    /**
     * @name dynamicUpdate
     */
    dynamicUpdate = defaults.dropdown.dynamicUpdate;
    /**
     * @name zIndex
     */
    zIndex = defaults.dropdown.zIndex;
    /**
     * list of items that match the current value of the input (for autocomplete)
     * @name items
     */
    items = [];
    /**
     * @name tagInput
     */
    tagInput = this.injector.get(TagInputComponent);
    /**
     * @name _autocompleteItems
     */
    _autocompleteItems = [];
    /**
     * @name autocompleteItems
     * @param items
     */
    set autocompleteItems(items) {
        this._autocompleteItems = items;
    }
    /**
     * @name autocompleteItems
     * @desc array of items that will populate the autocomplete
     */
    get autocompleteItems() {
        const items = this._autocompleteItems;
        if (!items) {
            return [];
        }
        return items.map((item) => {
            return typeof item === 'string'
                ? {
                    [this.displayBy]: item,
                    [this.identifyBy]: item
                }
                : item;
        });
    }
    constructor(injector) {
        this.injector = injector;
    }
    /**
     * @name ngAfterviewInit
     */
    ngAfterViewInit() {
        this.onItemClicked().subscribe((item) => {
            this.requestAdding(item);
        });
        // reset itemsMatching array when the dropdown is hidden
        this.onHide().subscribe(this.resetItems);
        const DEBOUNCE_TIME = 200;
        const KEEP_OPEN = this.keepOpen;
        this.tagInput.onTextChange
            .asObservable()
            .pipe(distinctUntilChanged(), debounceTime(DEBOUNCE_TIME), filter((value) => {
            if (KEEP_OPEN === false) {
                return value.length > 0;
            }
            return true;
        }))
            .subscribe(this.show);
    }
    /**
     * @name updatePosition
     */
    updatePosition() {
        const position = this.tagInput.inputForm.getElementPosition();
        this.dropdown.menu.updatePosition(position, this.dynamicUpdate);
    }
    /**
     * @name isVisible
     */
    get isVisible() {
        return this.dropdown.menu.dropdownState.menuState.isVisible;
    }
    /**
     * @name onHide
     */
    onHide() {
        return this.dropdown.onHide;
    }
    /**
     * @name onItemClicked
     */
    onItemClicked() {
        return this.dropdown.onItemClicked;
    }
    /**
     * @name selectedItem
     */
    get selectedItem() {
        return this.dropdown.menu.dropdownState.dropdownState.selectedItem;
    }
    /**
     * @name state
     */
    get state() {
        return this.dropdown.menu.dropdownState;
    }
    /**
     *
     * @name show
     */
    show = () => {
        const maxItemsReached = this.tagInput.items.length === this.tagInput.maxItems;
        const value = this.getFormValue();
        const hasMinimumText = value.trim().length >= this.minimumTextLength;
        const position = this.calculatePosition();
        const items = this.getMatchingItems(value);
        const hasItems = items.length > 0;
        const isHidden = this.isVisible === false;
        const showDropdownIfEmpty = this.showDropdownIfEmpty && hasItems && !value;
        const isDisabled = this.tagInput.disable;
        const shouldShow = isHidden && ((hasItems && hasMinimumText) || showDropdownIfEmpty);
        const shouldHide = this.isVisible && !hasItems;
        if (this.autocompleteObservable && hasMinimumText) {
            return this.getItemsFromObservable(value);
        }
        if ((!this.showDropdownIfEmpty && !value) ||
            maxItemsReached ||
            isDisabled) {
            return this.dropdown.hide();
        }
        this.setItems(items);
        if (shouldShow) {
            this.dropdown.show(position);
        }
        else if (shouldHide) {
            this.hide();
        }
    };
    /**
     * @name hide
     */
    hide() {
        this.resetItems();
        this.dropdown.hide();
    }
    /**
     * @name scrollListener
     */
    scrollListener() {
        if (!this.isVisible || !this.dynamicUpdate) {
            return;
        }
        this.updatePosition();
    }
    /**
     * @name onWindowBlur
     */
    onWindowBlur() {
        this.dropdown.hide();
    }
    /**
     * @name getFormValue
     */
    getFormValue() {
        const formValue = this.tagInput.formValue;
        return formValue ? formValue.toString().trim() : '';
    }
    /**
     * @name calculatePosition
     */
    calculatePosition() {
        return this.tagInput.inputForm.getElementPosition();
    }
    /**
     * @name requestAdding
     * @param item {Ng2MenuItem}
     */
    requestAdding = async (item) => {
        const tag = this.createTagModel(item);
        await this.tagInput.onAddingRequested(true, tag).catch(() => { });
    };
    /**
     * @name createTagModel
     * @param item
     */
    createTagModel(item) {
        const display = typeof item.value === 'string' ? item.value : item.value[this.displayBy];
        const value = typeof item.value === 'string' ? item.value : item.value[this.identifyBy];
        return {
            ...item.value,
            [this.tagInput.displayBy]: display,
            [this.tagInput.identifyBy]: value
        };
    }
    /**
     *
     * @param value {string}
     */
    getMatchingItems(value) {
        if (!value && !this.showDropdownIfEmpty) {
            return [];
        }
        const dupesAllowed = this.tagInput.allowDupes;
        return this.autocompleteItems.filter((item) => {
            const hasValue = dupesAllowed
                ? false
                : this.tagInput.tags.some(tag => {
                    const identifyBy = this.tagInput.identifyBy;
                    const model = typeof tag.model === 'string' ? tag.model : tag.model[identifyBy];
                    return model === item[this.identifyBy];
                });
            return this.matchingFn(value, item) && hasValue === false;
        });
    }
    /**
     * @name setItems
     */
    setItems(items) {
        this.items = items.slice(0, this.limitItemsTo || items.length);
    }
    /**
     * @name resetItems
     */
    resetItems = () => {
        this.items = [];
    };
    /**
     * @name populateItems
     * @param data
     */
    populateItems(data) {
        this.autocompleteItems = data.map(item => {
            return typeof item === 'string'
                ? {
                    [this.displayBy]: item,
                    [this.identifyBy]: item
                }
                : item;
        });
        return this;
    }
    /**
     * @name getItemsFromObservable
     * @param text
     */
    getItemsFromObservable = (text) => {
        this.setLoadingState(true);
        const subscribeFn = (data) => {
            // hide loading animation
            this.setLoadingState(false)
                // add items
                .populateItems(data);
            this.setItems(this.getMatchingItems(text));
            if (this.items.length) {
                this.dropdown.show(this.calculatePosition());
            }
            else {
                this.dropdown.hide();
            }
        };
        this.autocompleteObservable(text)
            .pipe(first())
            .subscribe(subscribeFn, () => this.setLoadingState(false));
    };
    /**
     * @name setLoadingState
     * @param state
     */
    setLoadingState(state) {
        this.tagInput.isLoading = state;
        return this;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputDropdown, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagInputDropdown, selector: "tag-input-dropdown", inputs: { offset: "offset", focusFirstElement: "focusFirstElement", showDropdownIfEmpty: "showDropdownIfEmpty", autocompleteObservable: "autocompleteObservable", minimumTextLength: "minimumTextLength", limitItemsTo: "limitItemsTo", displayBy: "displayBy", identifyBy: "identifyBy", matchingFn: "matchingFn", appendToBody: "appendToBody", keepOpen: "keepOpen", dynamicUpdate: "dynamicUpdate", zIndex: "zIndex", autocompleteItems: "autocompleteItems" }, host: { listeners: { "window:scroll": "scrollListener()", "window:blur": "onWindowBlur()" } }, queries: [{ propertyName: "templates", predicate: TemplateRef }], viewQueries: [{ propertyName: "dropdown", first: true, predicate: Ng2Dropdown, descendants: true }], ngImport: i0, template: "<ng2-dropdown [dynamicUpdate]=\"dynamicUpdate\">\r\n    <ng2-dropdown-menu [focusFirstElement]=\"focusFirstElement\"\r\n                       [zIndex]=\"zIndex\"\r\n                       [appendToBody]=\"appendToBody\"\r\n                       [offset]=\"offset\">\r\n        <ng2-menu-item *ngFor=\"let item of items; let index = index; let last = last\"\r\n                       [value]=\"item\"\r\n                       [ngSwitch]=\"!!templates.length\">\r\n\r\n            <span *ngSwitchCase=\"false\"\r\n                  [innerHTML]=\"item[displayBy] | highlight : tagInput.inputForm.value.value\">\r\n            </span>\r\n\r\n            <ng-template *ngSwitchDefault\r\n                      [ngTemplateOutlet]=\"templates.first\"\r\n                      [ngTemplateOutletContext]=\"{ item: item, index: index, last: last }\">\r\n            </ng-template>\r\n        </ng2-menu-item>\r\n    </ng2-dropdown-menu>\r\n</ng2-dropdown>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i2$1.Ng2MenuItem, selector: "ng2-menu-item", inputs: ["preventClose", "value"] }, { kind: "component", type: i2$1.Ng2DropdownMenu, selector: "ng2-dropdown-menu", inputs: ["width", "focusFirstElement", "offset", "appendToBody", "zIndex"] }, { kind: "component", type: i2$1.Ng2Dropdown, selector: "ng2-dropdown", inputs: ["dynamicUpdate"], outputs: ["onItemClicked", "onItemSelected", "onShow", "onHide"] }, { kind: "pipe", type: HighlightPipe, name: "highlight" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputDropdown, decorators: [{
            type: Component,
            args: [{ selector: 'tag-input-dropdown', template: "<ng2-dropdown [dynamicUpdate]=\"dynamicUpdate\">\r\n    <ng2-dropdown-menu [focusFirstElement]=\"focusFirstElement\"\r\n                       [zIndex]=\"zIndex\"\r\n                       [appendToBody]=\"appendToBody\"\r\n                       [offset]=\"offset\">\r\n        <ng2-menu-item *ngFor=\"let item of items; let index = index; let last = last\"\r\n                       [value]=\"item\"\r\n                       [ngSwitch]=\"!!templates.length\">\r\n\r\n            <span *ngSwitchCase=\"false\"\r\n                  [innerHTML]=\"item[displayBy] | highlight : tagInput.inputForm.value.value\">\r\n            </span>\r\n\r\n            <ng-template *ngSwitchDefault\r\n                      [ngTemplateOutlet]=\"templates.first\"\r\n                      [ngTemplateOutletContext]=\"{ item: item, index: index, last: last }\">\r\n            </ng-template>\r\n        </ng2-menu-item>\r\n    </ng2-dropdown-menu>\r\n</ng2-dropdown>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; }, propDecorators: { dropdown: [{
                type: ViewChild,
                args: [Ng2Dropdown]
            }], templates: [{
                type: ContentChildren,
                args: [TemplateRef]
            }], offset: [{
                type: Input
            }], focusFirstElement: [{
                type: Input
            }], showDropdownIfEmpty: [{
                type: Input
            }], autocompleteObservable: [{
                type: Input
            }], minimumTextLength: [{
                type: Input
            }], limitItemsTo: [{
                type: Input
            }], displayBy: [{
                type: Input
            }], identifyBy: [{
                type: Input
            }], matchingFn: [{
                type: Input
            }], appendToBody: [{
                type: Input
            }], keepOpen: [{
                type: Input
            }], dynamicUpdate: [{
                type: Input
            }], zIndex: [{
                type: Input
            }], autocompleteItems: [{
                type: Input
            }], scrollListener: [{
                type: HostListener,
                args: ['window:scroll']
            }], onWindowBlur: [{
                type: HostListener,
                args: ['window:blur']
            }] } });

// angular
const CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
class TagInputComponent extends TagInputAccessor {
    renderer;
    dragProvider;
    /**
     * @name separatorKeys
     * @desc keyboard keys with which a user can separate items
     */
    separatorKeys = defaults.tagInput.separatorKeys;
    /**
     * @name separatorKeyCodes
     * @desc keyboard key codes with which a user can separate items
     */
    separatorKeyCodes = defaults.tagInput.separatorKeyCodes;
    /**
     * @name placeholder
     * @desc the placeholder of the input text
     */
    placeholder = defaults.tagInput.placeholder;
    /**
     * @name secondaryPlaceholder
     * @desc placeholder to appear when the input is empty
     */
    secondaryPlaceholder = defaults.tagInput.secondaryPlaceholder;
    /**
     * @name maxItems
     * @desc maximum number of items that can be added
     */
    maxItems = defaults.tagInput.maxItems;
    /**
     * @name validators
     * @desc array of Validators that are used to validate the tag before it gets appended to the list
     */
    validators = defaults.tagInput.validators;
    /**
     * @name asyncValidators
     * @desc array of AsyncValidator that are used to validate the tag before it gets appended to the list
     */
    asyncValidators = defaults.tagInput.asyncValidators;
    /**
    * - if set to true, it will only possible to add items from the autocomplete
    * @name onlyFromAutocomplete
    */
    onlyFromAutocomplete = defaults.tagInput.onlyFromAutocomplete;
    /**
     * @name errorMessages
     */
    errorMessages = defaults.tagInput.errorMessages;
    /**
     * @name theme
     */
    theme = defaults.tagInput.theme;
    /**
     * @name onTextChangeDebounce
     */
    onTextChangeDebounce = defaults.tagInput.onTextChangeDebounce;
    /**
     * - custom id assigned to the input
     * @name id
     */
    inputId = defaults.tagInput.inputId;
    /**
     * - custom class assigned to the input
     */
    inputClass = defaults.tagInput.inputClass;
    /**
     * - option to clear text input when the form is blurred
     * @name clearOnBlur
     */
    clearOnBlur = defaults.tagInput.clearOnBlur;
    /**
     * - hideForm
     * @name clearOnBlur
     */
    hideForm = defaults.tagInput.hideForm;
    /**
     * @name addOnBlur
     */
    addOnBlur = defaults.tagInput.addOnBlur;
    /**
     * @name addOnPaste
     */
    addOnPaste = defaults.tagInput.addOnPaste;
    /**
     * - pattern used with the native method split() to separate patterns in the string pasted
     * @name pasteSplitPattern
     */
    pasteSplitPattern = defaults.tagInput.pasteSplitPattern;
    /**
     * @name blinkIfDupe
     */
    blinkIfDupe = defaults.tagInput.blinkIfDupe;
    /**
     * @name removable
     */
    removable = defaults.tagInput.removable;
    /**
     * @name editable
     */
    editable = defaults.tagInput.editable;
    /**
     * @name allowDupes
     */
    allowDupes = defaults.tagInput.allowDupes;
    /**
     * @description if set to true, the newly added tags will be added as strings, and not objects
     * @name modelAsStrings
     */
    modelAsStrings = defaults.tagInput.modelAsStrings;
    /**
     * @name trimTags
     */
    trimTags = defaults.tagInput.trimTags;
    /**
     * @name inputText
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * @name ripple
     */
    ripple = defaults.tagInput.ripple;
    /**
     * @name tabindex
     * @desc pass through the specified tabindex to the input
     */
    tabindex = defaults.tagInput.tabIndex;
    /**
     * @name disable
     */
    disable = defaults.tagInput.disable;
    /**
     * @name dragZone
     */
    dragZone = defaults.tagInput.dragZone;
    /**
     * @name onRemoving
     */
    onRemoving = defaults.tagInput.onRemoving;
    /**
     * @name onAdding
     */
    onAdding = defaults.tagInput.onAdding;
    /**
     * @name animationDuration
     */
    animationDuration = defaults.tagInput.animationDuration;
    /**
     * @name onAdd
     * @desc event emitted when adding a new item
     */
    onAdd = new EventEmitter();
    /**
     * @name onRemove
     * @desc event emitted when removing an existing item
     */
    onRemove = new EventEmitter();
    /**
     * @name onSelect
     * @desc event emitted when selecting an item
     */
    onSelect = new EventEmitter();
    /**
     * @name onFocus
     * @desc event emitted when the input is focused
     */
    onFocus = new EventEmitter();
    /**
     * @name onFocus
     * @desc event emitted when the input is blurred
     */
    onBlur = new EventEmitter();
    /**
     * @name onTextChange
     * @desc event emitted when the input value changes
     */
    onTextChange = new EventEmitter();
    /**
     * - output triggered when text is pasted in the form
     * @name onPaste
     */
    onPaste = new EventEmitter();
    /**
     * - output triggered when tag entered is not valid
     * @name onValidationError
     */
    onValidationError = new EventEmitter();
    /**
     * - output triggered when tag is edited
     * @name onTagEdited
     */
    onTagEdited = new EventEmitter();
    /**
     * @name dropdown
     */
    // @ContentChild(forwardRef(() => TagInputDropdown), {static: true}) dropdown: TagInputDropdown;
    dropdown;
    /**
     * @name template
     * @desc reference to the template if provided by the user
     */
    templates;
    /**
     * @name inputForm
     */
    inputForm;
    /**
     * @name selectedTag
     * @desc reference to the current selected tag
     */
    selectedTag;
    /**
     * @name isLoading
     */
    isLoading = false;
    /**
     * @name inputText
     * @param text
     */
    set inputText(text) {
        this.inputTextValue = text;
        this.inputTextChange.emit(text);
    }
    /**
     * @name tags
     * @desc list of Element items
     */
    tags;
    /**
     * @name listeners
     * @desc array of events that get fired using @fireEvents
     */
    listeners = {
        [KEYDOWN]: [],
        [KEYUP]: []
    };
    /**
     * @description emitter for the 2-way data binding inputText value
     * @name inputTextChange
     */
    inputTextChange = new EventEmitter();
    /**
     * @description private variable to bind get/set
     * @name inputTextValue
     */
    inputTextValue = '';
    /**
     * @desc removes the tab index if it is set - it will be passed through to the input
     * @name tabindexAttr
     */
    get tabindexAttr() {
        return this.tabindex !== '' ? '-1' : '';
    }
    /**
     * @name animationMetadata
     */
    animationMetadata;
    errors = [];
    isProgressBarVisible$;
    constructor(renderer, dragProvider) {
        super();
        this.renderer = renderer;
        this.dragProvider = dragProvider;
    }
    /**
     * @name ngAfterViewInit
     */
    ngAfterViewInit() {
        // set up listeners
        this.setUpKeypressListeners();
        this.setupSeparatorKeysListener();
        this.setUpInputKeydownListeners();
        if (this.onTextChange.observers.length) {
            this.setUpTextChangeSubscriber();
        }
        // if clear on blur is set to true, subscribe to the event and clear the text's form
        if (this.clearOnBlur || this.addOnBlur) {
            this.setUpOnBlurSubscriber();
        }
        // if addOnPaste is set to true, register the handler and add items
        if (this.addOnPaste) {
            this.setUpOnPasteListener();
        }
        const statusChanges$ = this.inputForm.form.statusChanges;
        statusChanges$.pipe(filter((status) => status !== 'PENDING')).subscribe(() => {
            this.errors = this.inputForm.getErrorMessages(this.errorMessages);
        });
        this.isProgressBarVisible$ = statusChanges$.pipe(map((status) => {
            return status === 'PENDING' || this.isLoading;
        }));
        // if hideForm is set to true, remove the input
        if (this.hideForm) {
            this.inputForm.destroy();
        }
    }
    /**
     * @name ngOnInit
     */
    ngOnInit() {
        // if the number of items specified in the model is > of the value of maxItems
        // degrade gracefully and let the max number of items to be the number of items in the model
        // though, warn the user.
        const hasReachedMaxItems = this.maxItems !== undefined &&
            this.items &&
            this.items.length > this.maxItems;
        if (hasReachedMaxItems) {
            this.maxItems = this.items.length;
            console.warn(MAX_ITEMS_WARNING);
        }
        // Setting editable to false to fix problem with tags in IE still being editable when
        // onlyFromAutocomplete is true
        this.editable = this.onlyFromAutocomplete ? false : this.editable;
        this.setAnimationMetadata();
    }
    /**
     * @name onRemoveRequested
     * @param tag
     * @param index
     */
    onRemoveRequested(tag, index) {
        return new Promise(resolve => {
            const subscribeFn = (model) => {
                this.removeItem(model, index);
                resolve(tag);
            };
            this.onRemoving ?
                this.onRemoving(tag)
                    .pipe(first())
                    .subscribe(subscribeFn) : subscribeFn(tag);
        });
    }
    /**
     * @name onAddingRequested
     * @param fromAutocomplete {boolean}
     * @param tag {TagModel}
     * @param index? {number}
     * @param giveupFocus? {boolean}
     */
    onAddingRequested(fromAutocomplete, tag, index, giveupFocus) {
        return new Promise((resolve, reject) => {
            const subscribeFn = (model) => {
                return this
                    .addItem(fromAutocomplete, model, index, giveupFocus)
                    .then(resolve)
                    .catch(reject);
            };
            return this.onAdding ?
                this.onAdding(tag)
                    .pipe(first())
                    .subscribe(subscribeFn, reject) : subscribeFn(tag);
        });
    }
    /**
     * @name appendTag
     * @param tag {TagModel}
     */
    appendTag = (tag, index = this.items.length) => {
        const items = this.items;
        const model = this.modelAsStrings ? tag[this.identifyBy] : tag;
        this.items = [
            ...items.slice(0, index),
            model,
            ...items.slice(index, items.length)
        ];
    };
    /**
     * @name createTag
     * @param model
     */
    createTag = (model) => {
        const trim = (val, key) => {
            return typeof val === 'string' ? val.trim() : val[key];
        };
        return {
            ...typeof model !== 'string' ? model : {},
            [this.displayBy]: this.trimTags ? trim(model, this.displayBy) : model,
            [this.identifyBy]: this.trimTags ? trim(model, this.identifyBy) : model
        };
    };
    /**
     * @name selectItem
     * @desc selects item passed as parameter as the selected tag
     * @param item
     * @param emit
     */
    selectItem(item, emit = true) {
        const isReadonly = item && typeof item !== 'string' && item.readonly;
        if (isReadonly || this.selectedTag === item) {
            return;
        }
        this.selectedTag = item;
        if (emit) {
            this.onSelect.emit(item);
        }
    }
    /**
     * @name fireEvents
     * @desc goes through the list of the events for a given eventName, and fires each of them
     * @param eventName
     * @param $event
     */
    fireEvents(eventName, $event) {
        this.listeners[eventName].forEach(listener => listener.call(this, $event));
    }
    /**
     * @name handleKeydown
     * @desc handles action when the user hits a keyboard key
     * @param data
     */
    handleKeydown(data) {
        const event = data.event;
        const key = event.keyCode || event.which;
        const shiftKey = event.shiftKey || false;
        switch (KEY_PRESS_ACTIONS[key]) {
            case ACTIONS_KEYS.DELETE:
                if (this.selectedTag && this.removable) {
                    const index = this.items.indexOf(this.selectedTag);
                    this.onRemoveRequested(this.selectedTag, index);
                }
                break;
            case ACTIONS_KEYS.SWITCH_PREV:
                this.moveToTag(data.model, PREV);
                break;
            case ACTIONS_KEYS.SWITCH_NEXT:
                this.moveToTag(data.model, NEXT);
                break;
            case ACTIONS_KEYS.TAB:
                if (shiftKey) {
                    if (this.isFirstTag(data.model)) {
                        return;
                    }
                    this.moveToTag(data.model, PREV);
                }
                else {
                    if (this.isLastTag(data.model) && (this.disable || this.maxItemsReached)) {
                        return;
                    }
                    this.moveToTag(data.model, NEXT);
                }
                break;
            default:
                return;
        }
        // prevent default behaviour
        event.preventDefault();
    }
    async onFormSubmit() {
        try {
            await this.onAddingRequested(false, this.formValue);
        }
        catch {
            return;
        }
    }
    /**
     * @name setInputValue
     * @param value
     */
    setInputValue(value, emitEvent = true) {
        const control = this.getControl();
        // update form value with the transformed item
        control.setValue(value, { emitEvent });
    }
    /**
     * @name getControl
     */
    getControl() {
        return this.inputForm.value;
    }
    /**
     * @name focus
     * @param applyFocus
     * @param displayAutocomplete
     */
    focus(applyFocus = false, displayAutocomplete = false) {
        if (this.dragProvider.getState('dragging')) {
            return;
        }
        this.selectItem(undefined, false);
        if (applyFocus) {
            this.inputForm.focus();
            this.onFocus.emit(this.formValue);
        }
    }
    /**
     * @name blur
     */
    blur() {
        this.onTouched();
        this.onBlur.emit(this.formValue);
    }
    /**
     * @name hasErrors
     */
    hasErrors() {
        return !!this.inputForm && this.inputForm.hasErrors();
    }
    /**
     * @name isInputFocused
     */
    isInputFocused() {
        return !!this.inputForm && this.inputForm.isInputFocused();
    }
    /**
     * - this is the one way I found to tell if the template has been passed and it is not
     * the template for the menu item
     * @name hasCustomTemplate
     */
    hasCustomTemplate() {
        const template = this.templates ? this.templates.first : undefined;
        const menuTemplate = this.dropdown && this.dropdown.templates ?
            this.dropdown.templates.first : undefined;
        return Boolean(template && template !== menuTemplate);
    }
    /**
     * @name maxItemsReached
     */
    get maxItemsReached() {
        return this.maxItems !== undefined &&
            this.items.length >= this.maxItems;
    }
    /**
     * @name formValue
     */
    get formValue() {
        const form = this.inputForm.value;
        return form ? form.value : '';
    }
    /**3
     * @name onDragStarted
     * @param event
     * @param index
     */
    onDragStarted(event, tag, index) {
        event.stopPropagation();
        const item = { zone: this.dragZone, tag, index };
        this.dragProvider.setSender(this);
        this.dragProvider.setDraggedItem(event, item);
        this.dragProvider.setState({ dragging: true, index });
    }
    /**
     * @name onDragOver
     * @param event
     */
    onDragOver(event, index) {
        this.dragProvider.setState({ dropping: true });
        this.dragProvider.setReceiver(this);
        event.preventDefault();
    }
    /**
     * @name onTagDropped
     * @param event
     * @param index
     */
    onTagDropped(event, index) {
        const item = this.dragProvider.getDraggedItem(event);
        if (!item || item.zone !== this.dragZone) {
            return;
        }
        this.dragProvider.onTagDropped(item.tag, item.index, index);
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @name isDropping
     */
    isDropping() {
        const isReceiver = this.dragProvider.receiver === this;
        const isDropping = this.dragProvider.getState('dropping');
        return Boolean(isReceiver && isDropping);
    }
    /**
     * @name onTagBlurred
     * @param changedElement {TagModel}
     * @param index {number}
     */
    onTagBlurred(changedElement, index) {
        this.items[index] = changedElement;
        this.blur();
    }
    /**
     * @name trackBy
     * @param items
     */
    trackBy(index, item) {
        return item[this.identifyBy];
    }
    /**
     * @name updateEditedTag
     * @param tag
     */
    updateEditedTag(tag) {
        this.onTagEdited.emit(tag);
    }
    /**
     *
     * @param tag
     * @param isFromAutocomplete
     */
    isTagValid = (tag, fromAutocomplete = false) => {
        const selectedItem = this.dropdown ? this.dropdown.selectedItem : undefined;
        const value = this.getItemDisplay(tag).trim();
        if (selectedItem && !fromAutocomplete || !value) {
            return false;
        }
        const dupe = this.findDupe(tag, fromAutocomplete);
        // if so, give a visual cue and return false
        if (!this.allowDupes && dupe && this.blinkIfDupe) {
            const model = this.tags.find(item => {
                return this.getItemValue(item.model) === this.getItemValue(dupe);
            });
            if (model) {
                model.blink();
            }
        }
        const isFromAutocomplete = fromAutocomplete && this.onlyFromAutocomplete;
        const assertions = [
            // 1. there must be no dupe OR dupes are allowed
            !dupe || this.allowDupes,
            // 2. check max items has not been reached
            !this.maxItemsReached,
            // 3. check item comes from autocomplete or onlyFromAutocomplete is false
            ((isFromAutocomplete) || !this.onlyFromAutocomplete)
        ];
        return assertions.filter(Boolean).length === assertions.length;
    };
    /**
     * @name moveToTag
     * @param item
     * @param direction
     */
    moveToTag(item, direction) {
        const isLast = this.isLastTag(item);
        const isFirst = this.isFirstTag(item);
        const stopSwitch = (direction === NEXT && isLast) ||
            (direction === PREV && isFirst);
        if (stopSwitch) {
            this.focus(true);
            return;
        }
        const offset = direction === NEXT ? 1 : -1;
        const index = this.getTagIndex(item) + offset;
        const tag = this.getTagAtIndex(index);
        return tag.select.call(tag);
    }
    /**
     * @name isFirstTag
     * @param item {TagModel}
     */
    isFirstTag(item) {
        return this.tags.first.model === item;
    }
    /**
     * @name isLastTag
     * @param item {TagModel}
     */
    isLastTag(item) {
        return this.tags.last.model === item;
    }
    /**
     * @name getTagIndex
     * @param item
     */
    getTagIndex(item) {
        const tags = this.tags.toArray();
        return tags.findIndex(tag => tag.model === item);
    }
    /**
     * @name getTagAtIndex
     * @param index
     */
    getTagAtIndex(index) {
        const tags = this.tags.toArray();
        return tags[index];
    }
    /**
     * @name removeItem
     * @desc removes an item from the array of the model
     * @param tag {TagModel}
     * @param index {number}
     */
    removeItem(tag, index) {
        this.items = this.getItemsWithout(index);
        // if the removed tag was selected, set it as undefined
        if (this.selectedTag === tag) {
            this.selectItem(undefined, false);
        }
        // focus input
        this.focus(true, false);
        // emit remove event
        this.onRemove.emit(tag);
    }
    /**
     * @name addItem
     * @desc adds the current text model to the items array
     * @param fromAutocomplete {boolean}
     * @param item {TagModel}
     * @param index? {number}
     * @param giveupFocus? {boolean}
     */
    addItem(fromAutocomplete = false, item, index, giveupFocus) {
        const display = this.getItemDisplay(item);
        const tag = this.createTag(item);
        if (fromAutocomplete) {
            this.setInputValue(this.getItemValue(item, true));
        }
        return new Promise((resolve, reject) => {
            /**
             * @name reset
             */
            const reset = () => {
                // reset control and focus input
                this.setInputValue('');
                if (giveupFocus) {
                    this.focus(false, false);
                }
                else {
                    // focus input
                    this.focus(true, false);
                }
                resolve(display);
            };
            const appendItem = () => {
                this.appendTag(tag, index);
                // emit event
                this.onAdd.emit(tag);
                if (!this.dropdown) {
                    return;
                }
                this.dropdown.hide();
                if (this.dropdown.showDropdownIfEmpty) {
                    this.dropdown.show();
                }
            };
            const status = this.inputForm.form.status;
            const isTagValid = this.isTagValid(tag, fromAutocomplete);
            const onValidationError = () => {
                this.onValidationError.emit(tag);
                return reject();
            };
            if (status === 'VALID' && isTagValid) {
                appendItem();
                return reset();
            }
            if (status === 'INVALID' || !isTagValid) {
                reset();
                return onValidationError();
            }
            if (status === 'PENDING') {
                const statusUpdate$ = this.inputForm.form.statusChanges;
                return statusUpdate$
                    .pipe(filter(statusUpdate => statusUpdate !== 'PENDING'), first())
                    .subscribe((statusUpdate) => {
                    if (statusUpdate === 'VALID' && isTagValid) {
                        appendItem();
                        return reset();
                    }
                    else {
                        reset();
                        return onValidationError();
                    }
                });
            }
        });
    }
    /**
     * @name setupSeparatorKeysListener
     */
    setupSeparatorKeysListener() {
        const useSeparatorKeys = this.separatorKeyCodes.length > 0 || this.separatorKeys.length > 0;
        const listener = ($event) => {
            const hasKeyCode = this.separatorKeyCodes.indexOf($event.keyCode) >= 0;
            const hasKey = this.separatorKeys.indexOf($event.key) >= 0;
            // the keyCode of keydown event is 229 when IME is processing the key event.
            const isIMEProcessing = $event.keyCode === 229;
            if (hasKeyCode || (hasKey && !isIMEProcessing)) {
                $event.preventDefault();
                this.onAddingRequested(false, this.formValue)
                    .catch(() => { });
            }
        };
        listen.call(this, KEYDOWN, listener, useSeparatorKeys);
    }
    /**
     * @name setUpKeypressListeners
     */
    setUpKeypressListeners() {
        const listener = ($event) => {
            const isCorrectKey = $event.keyCode === 37 || $event.keyCode === 8;
            if (isCorrectKey &&
                !this.formValue &&
                this.items.length) {
                this.tags.last.select.call(this.tags.last);
            }
        };
        // setting up the keypress listeners
        listen.call(this, KEYDOWN, listener);
    }
    /**
     * @name setUpKeydownListeners
     */
    setUpInputKeydownListeners() {
        this.inputForm.onKeydown.subscribe(event => {
            if (event.key === 'Backspace' && this.formValue.trim() === '') {
                event.preventDefault();
            }
        });
    }
    /**
     * @name setUpOnPasteListener
     */
    setUpOnPasteListener() {
        const input = this.inputForm.input.nativeElement;
        // attach listener to input
        this.renderer.listen(input, 'paste', (event) => {
            this.onPasteCallback(event);
            event.preventDefault();
            return true;
        });
    }
    /**
     * @name setUpTextChangeSubscriber
     */
    setUpTextChangeSubscriber() {
        this.inputForm.form
            .valueChanges
            .pipe(debounceTime(this.onTextChangeDebounce))
            .subscribe((value) => {
            this.onTextChange.emit(value.item);
        });
    }
    /**
     * @name setUpOnBlurSubscriber
     */
    setUpOnBlurSubscriber() {
        const filterFn = () => {
            const isVisible = this.dropdown && this.dropdown.isVisible;
            return !isVisible && !!this.formValue;
        };
        this.inputForm
            .onBlur
            .pipe(debounceTime(100), filter(filterFn))
            .subscribe(() => {
            const reset = () => this.setInputValue('');
            if (this.addOnBlur) {
                return this
                    .onAddingRequested(false, this.formValue, undefined, true)
                    .then(reset)
                    .catch(reset);
            }
            reset();
        });
    }
    /**
     * @name findDupe
     * @param tag
     * @param isFromAutocomplete
     */
    findDupe(tag, isFromAutocomplete) {
        const identifyBy = isFromAutocomplete ? this.dropdown.identifyBy : this.identifyBy;
        const id = tag[identifyBy];
        return this.items.find(item => this.getItemValue(item) === id);
    }
    /**
     * @name onPasteCallback
     * @param data
     */
    onPasteCallback = async (data) => {
        const getText = () => {
            const isIE = Boolean(window.clipboardData);
            const clipboardData = isIE ? (window.clipboardData) : data.clipboardData;
            const type = isIE ? 'Text' : 'text/plain';
            return clipboardData === null ? '' : clipboardData.getData(type) || '';
        };
        const text = getText();
        const requests = text
            .split(this.pasteSplitPattern)
            .map(item => {
            const tag = this.createTag(item);
            this.setInputValue(tag[this.displayBy]);
            return this.onAddingRequested(false, tag);
        });
        const resetInput = () => setTimeout(() => this.setInputValue(''), 50);
        Promise.all(requests).then(() => {
            this.onPaste.emit(text);
            resetInput();
        })
            .catch(resetInput);
    };
    /**
     * @name setAnimationMetadata
     */
    setAnimationMetadata() {
        this.animationMetadata = {
            value: 'in',
            params: { ...this.animationDuration }
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputComponent, deps: [{ token: i0.Renderer2 }, { token: DragProvider }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagInputComponent, selector: "tag-input", inputs: { separatorKeys: "separatorKeys", separatorKeyCodes: "separatorKeyCodes", placeholder: "placeholder", secondaryPlaceholder: "secondaryPlaceholder", maxItems: "maxItems", validators: "validators", asyncValidators: "asyncValidators", onlyFromAutocomplete: "onlyFromAutocomplete", errorMessages: "errorMessages", theme: "theme", onTextChangeDebounce: "onTextChangeDebounce", inputId: "inputId", inputClass: "inputClass", clearOnBlur: "clearOnBlur", hideForm: "hideForm", addOnBlur: "addOnBlur", addOnPaste: "addOnPaste", pasteSplitPattern: "pasteSplitPattern", blinkIfDupe: "blinkIfDupe", removable: "removable", editable: "editable", allowDupes: "allowDupes", modelAsStrings: "modelAsStrings", trimTags: "trimTags", inputText: "inputText", ripple: "ripple", tabindex: "tabindex", disable: "disable", dragZone: "dragZone", onRemoving: "onRemoving", onAdding: "onAdding", animationDuration: "animationDuration" }, outputs: { onAdd: "onAdd", onRemove: "onRemove", onSelect: "onSelect", onFocus: "onFocus", onBlur: "onBlur", onTextChange: "onTextChange", onPaste: "onPaste", onValidationError: "onValidationError", onTagEdited: "onTagEdited", inputTextChange: "inputTextChange" }, host: { properties: { "attr.tabindex": "this.tabindexAttr" } }, providers: [CUSTOM_ACCESSOR], queries: [{ propertyName: "dropdown", first: true, predicate: TagInputDropdown, descendants: true }, { propertyName: "templates", predicate: TemplateRef }], viewQueries: [{ propertyName: "inputForm", first: true, predicate: TagInputForm, descendants: true }, { propertyName: "tags", predicate: TagComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div\r\n    [ngClass]=\"theme\"\r\n    class=\"ng2-tag-input\"\r\n    (click)=\"focus(true, false)\"\r\n    [attr.tabindex]=\"-1\"\r\n    (drop)=\"dragZone ? onTagDropped($event, undefined) : undefined\"\r\n    (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragover)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragend)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n    [class.ng2-tag-input--dropping]=\"isDropping()\"\r\n    [class.ng2-tag-input--disabled]=\"disable\"\r\n    [class.ng2-tag-input--loading]=\"isLoading\"\r\n    [class.ng2-tag-input--invalid]=\"hasErrors()\"\r\n    [class.ng2-tag-input--focused]=\"isInputFocused()\"\r\n>\r\n\r\n    <!-- TAGS -->\r\n    <div class=\"ng2-tags-container\">\r\n        <tag\r\n            *ngFor=\"let item of items; let i = index; trackBy: trackBy\"\r\n            (onSelect)=\"selectItem(item)\"\r\n            (onRemove)=\"onRemoveRequested(item, i)\"\r\n            (onKeyDown)=\"handleKeydown($event)\"\r\n            (onTagEdited)=\"updateEditedTag($event)\"\r\n            (onBlur)=\"onTagBlurred($event, i)\"\r\n            draggable=\"{{ editable }}\"\r\n            (dragstart)=\"dragZone ? onDragStarted($event, item, i) : undefined\"\r\n            (drop)=\"dragZone ? onTagDropped($event, i) : undefined\"\r\n            (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n            (dragover)=\"dragZone ? onDragOver($event, i) : undefined\"\r\n            (dragleave)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n            [canAddTag]=\"isTagValid\"\r\n            [attr.tabindex]=\"0\"\r\n            [disabled]=\"disable\"\r\n            [@animation]=\"animationMetadata\"\r\n            [hasRipple]=\"ripple\"\r\n            [index]=\"i\"\r\n            [removable]=\"removable\"\r\n            [editable]=\"editable\"\r\n            [displayBy]=\"displayBy\"\r\n            [identifyBy]=\"identifyBy\"\r\n            [template]=\"!!hasCustomTemplate() ? templates.first : undefined\"\r\n            [draggable]=\"dragZone\"\r\n            [model]=\"item\"\r\n        >\r\n        </tag>\r\n\r\n        <tag-input-form\r\n            (onSubmit)=\"onFormSubmit()\"\r\n            (onBlur)=\"blur()\"\r\n            (click)=\"dropdown ? dropdown.show() : undefined\"\r\n            (onKeydown)=\"fireEvents('keydown', $event)\"\r\n            (onKeyup)=\"fireEvents('keyup', $event)\"\r\n            [inputText]=\"inputText\"\r\n            [disabled]=\"disable\"\r\n            [validators]=\"validators\"\r\n            [asyncValidators]=\"asyncValidators\"\r\n            [hidden]=\"maxItemsReached\"\r\n            [placeholder]=\"items.length ? placeholder : secondaryPlaceholder\"\r\n            [inputClass]=\"inputClass\"\r\n            [inputId]=\"inputId\"\r\n            [tabindex]=\"tabindex\"\r\n        >\r\n        </tag-input-form>\r\n    </div>\r\n\r\n    <div\r\n        class=\"progress-bar\"\r\n        *ngIf=\"isProgressBarVisible$ | async\"\r\n    ></div>\r\n</div>\r\n\r\n<!-- ERRORS -->\r\n<div\r\n    *ngIf=\"hasErrors()\"\r\n    [ngClass]=\"theme\"\r\n    class=\"error-messages\"\r\n>\r\n    <p\r\n        *ngFor=\"let error of errors\"\r\n        class=\"error-message\"\r\n    >\r\n        <span>{{ error }}</span>\r\n    </p>\r\n</div>\r\n<ng-content></ng-content>\r\n", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:\"\";animation:running-progress 2s cubic-bezier(.4,0,.2,1) infinite}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}to{margin-left:100%;margin-right:0}}tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,Helvetica Neue,sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;transition:all .3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196F3;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:flex;flex-direction:row;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(.readonly):not(.tag--editing):active{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(.readonly):not(.tag--editing):active{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: TagInputForm, selector: "tag-input-form", inputs: ["placeholder", "validators", "asyncValidators", "inputId", "inputClass", "tabindex", "disabled", "inputText"], outputs: ["onSubmit", "onBlur", "onFocus", "onKeyup", "onKeydown", "inputTextChange"] }, { kind: "component", type: TagComponent, selector: "tag", inputs: ["model", "removable", "editable", "template", "displayBy", "identifyBy", "index", "hasRipple", "disabled", "canAddTag"], outputs: ["onSelect", "onRemove", "onBlur", "onKeyDown", "onTagEdited"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], animations: animations });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tag-input', providers: [CUSTOM_ACCESSOR], animations: animations, template: "<div\r\n    [ngClass]=\"theme\"\r\n    class=\"ng2-tag-input\"\r\n    (click)=\"focus(true, false)\"\r\n    [attr.tabindex]=\"-1\"\r\n    (drop)=\"dragZone ? onTagDropped($event, undefined) : undefined\"\r\n    (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragover)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragend)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n    [class.ng2-tag-input--dropping]=\"isDropping()\"\r\n    [class.ng2-tag-input--disabled]=\"disable\"\r\n    [class.ng2-tag-input--loading]=\"isLoading\"\r\n    [class.ng2-tag-input--invalid]=\"hasErrors()\"\r\n    [class.ng2-tag-input--focused]=\"isInputFocused()\"\r\n>\r\n\r\n    <!-- TAGS -->\r\n    <div class=\"ng2-tags-container\">\r\n        <tag\r\n            *ngFor=\"let item of items; let i = index; trackBy: trackBy\"\r\n            (onSelect)=\"selectItem(item)\"\r\n            (onRemove)=\"onRemoveRequested(item, i)\"\r\n            (onKeyDown)=\"handleKeydown($event)\"\r\n            (onTagEdited)=\"updateEditedTag($event)\"\r\n            (onBlur)=\"onTagBlurred($event, i)\"\r\n            draggable=\"{{ editable }}\"\r\n            (dragstart)=\"dragZone ? onDragStarted($event, item, i) : undefined\"\r\n            (drop)=\"dragZone ? onTagDropped($event, i) : undefined\"\r\n            (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n            (dragover)=\"dragZone ? onDragOver($event, i) : undefined\"\r\n            (dragleave)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n            [canAddTag]=\"isTagValid\"\r\n            [attr.tabindex]=\"0\"\r\n            [disabled]=\"disable\"\r\n            [@animation]=\"animationMetadata\"\r\n            [hasRipple]=\"ripple\"\r\n            [index]=\"i\"\r\n            [removable]=\"removable\"\r\n            [editable]=\"editable\"\r\n            [displayBy]=\"displayBy\"\r\n            [identifyBy]=\"identifyBy\"\r\n            [template]=\"!!hasCustomTemplate() ? templates.first : undefined\"\r\n            [draggable]=\"dragZone\"\r\n            [model]=\"item\"\r\n        >\r\n        </tag>\r\n\r\n        <tag-input-form\r\n            (onSubmit)=\"onFormSubmit()\"\r\n            (onBlur)=\"blur()\"\r\n            (click)=\"dropdown ? dropdown.show() : undefined\"\r\n            (onKeydown)=\"fireEvents('keydown', $event)\"\r\n            (onKeyup)=\"fireEvents('keyup', $event)\"\r\n            [inputText]=\"inputText\"\r\n            [disabled]=\"disable\"\r\n            [validators]=\"validators\"\r\n            [asyncValidators]=\"asyncValidators\"\r\n            [hidden]=\"maxItemsReached\"\r\n            [placeholder]=\"items.length ? placeholder : secondaryPlaceholder\"\r\n            [inputClass]=\"inputClass\"\r\n            [inputId]=\"inputId\"\r\n            [tabindex]=\"tabindex\"\r\n        >\r\n        </tag-input-form>\r\n    </div>\r\n\r\n    <div\r\n        class=\"progress-bar\"\r\n        *ngIf=\"isProgressBarVisible$ | async\"\r\n    ></div>\r\n</div>\r\n\r\n<!-- ERRORS -->\r\n<div\r\n    *ngIf=\"hasErrors()\"\r\n    [ngClass]=\"theme\"\r\n    class=\"error-messages\"\r\n>\r\n    <p\r\n        *ngFor=\"let error of errors\"\r\n        class=\"error-message\"\r\n    >\r\n        <span>{{ error }}</span>\r\n    </p>\r\n</div>\r\n<ng-content></ng-content>\r\n", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:\"\";animation:running-progress 2s cubic-bezier(.4,0,.2,1) infinite}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}to{margin-left:100%;margin-right:0}}tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,Helvetica Neue,sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;transition:all .3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196F3;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:flex;flex-direction:row;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(.readonly):not(.tag--editing):active{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(.readonly):not(.tag--editing):active{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: DragProvider }]; }, propDecorators: { separatorKeys: [{
                type: Input
            }], separatorKeyCodes: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], secondaryPlaceholder: [{
                type: Input
            }], maxItems: [{
                type: Input
            }], validators: [{
                type: Input
            }], asyncValidators: [{
                type: Input
            }], onlyFromAutocomplete: [{
                type: Input
            }], errorMessages: [{
                type: Input
            }], theme: [{
                type: Input
            }], onTextChangeDebounce: [{
                type: Input
            }], inputId: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], clearOnBlur: [{
                type: Input
            }], hideForm: [{
                type: Input
            }], addOnBlur: [{
                type: Input
            }], addOnPaste: [{
                type: Input
            }], pasteSplitPattern: [{
                type: Input
            }], blinkIfDupe: [{
                type: Input
            }], removable: [{
                type: Input
            }], editable: [{
                type: Input
            }], allowDupes: [{
                type: Input
            }], modelAsStrings: [{
                type: Input
            }], trimTags: [{
                type: Input
            }], inputText: [{
                type: Input
            }], ripple: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], disable: [{
                type: Input
            }], dragZone: [{
                type: Input
            }], onRemoving: [{
                type: Input
            }], onAdding: [{
                type: Input
            }], animationDuration: [{
                type: Input
            }], onAdd: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onTextChange: [{
                type: Output
            }], onPaste: [{
                type: Output
            }], onValidationError: [{
                type: Output
            }], onTagEdited: [{
                type: Output
            }], dropdown: [{
                type: ContentChild,
                args: [TagInputDropdown]
            }], templates: [{
                type: ContentChildren,
                args: [TemplateRef, { descendants: false }]
            }], inputForm: [{
                type: ViewChild,
                args: [TagInputForm]
            }], tags: [{
                type: ViewChildren,
                args: [TagComponent]
            }], inputTextChange: [{
                type: Output
            }], tabindexAttr: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }] } });

const optionsProvider = new OptionsProvider();
class TagInputModule {
    /**
     * @name withDefaults
     * @param options {Options}
     */
    static withDefaults(options) {
        optionsProvider.setOptions(options);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.2", ngImport: i0, type: TagInputModule, declarations: [TagInputComponent,
            DeleteIconComponent,
            TagInputForm,
            TagComponent,
            HighlightPipe,
            TagInputDropdown,
            TagRipple], imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            Ng2DropdownModule], exports: [TagInputComponent,
            DeleteIconComponent,
            TagInputForm,
            TagComponent,
            HighlightPipe,
            TagInputDropdown,
            TagRipple] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputModule, providers: [
            DragProvider,
            { provide: COMPOSITION_BUFFER_MODE, useValue: false },
        ], imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            Ng2DropdownModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormsModule,
                        Ng2DropdownModule
                    ],
                    declarations: [
                        TagInputComponent,
                        DeleteIconComponent,
                        TagInputForm,
                        TagComponent,
                        HighlightPipe,
                        TagInputDropdown,
                        TagRipple
                    ],
                    exports: [
                        TagInputComponent,
                        DeleteIconComponent,
                        TagInputForm,
                        TagComponent,
                        HighlightPipe,
                        TagInputDropdown,
                        TagRipple
                    ],
                    providers: [
                        DragProvider,
                        { provide: COMPOSITION_BUFFER_MODE, useValue: false },
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DeleteIconComponent, HighlightPipe, TagComponent, TagInputComponent, TagInputDropdown, TagInputForm, TagInputModule, TagRipple };
//# sourceMappingURL=ngx-chips.mjs.map
