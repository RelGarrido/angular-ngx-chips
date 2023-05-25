// angular
import { Component, forwardRef, HostBinding, Input, Output, EventEmitter, ViewChild, ViewChildren, ContentChildren, ContentChild, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, filter, map, first } from 'rxjs/operators';
// ng2-tag-input
import { TagInputAccessor } from '../../core/accessor';
import { listen } from '../../core/helpers/listen';
import * as constants from '../../core/constants';
import { TagInputForm } from '../tag-input-form/tag-input-form.component';
import { TagComponent } from '../tag/tag.component';
import { animations } from './animations';
import { defaults } from '../../defaults';
import { TagInputDropdown } from '../dropdown/tag-input-dropdown.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/providers/drag-provider";
import * as i2 from "@angular/common";
import * as i3 from "../tag-input-form/tag-input-form.component";
import * as i4 from "../tag/tag.component";
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
        [constants.KEYDOWN]: [],
        [constants.KEYUP]: []
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
            console.warn(constants.MAX_ITEMS_WARNING);
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
        switch (constants.KEY_PRESS_ACTIONS[key]) {
            case constants.ACTIONS_KEYS.DELETE:
                if (this.selectedTag && this.removable) {
                    const index = this.items.indexOf(this.selectedTag);
                    this.onRemoveRequested(this.selectedTag, index);
                }
                break;
            case constants.ACTIONS_KEYS.SWITCH_PREV:
                this.moveToTag(data.model, constants.PREV);
                break;
            case constants.ACTIONS_KEYS.SWITCH_NEXT:
                this.moveToTag(data.model, constants.NEXT);
                break;
            case constants.ACTIONS_KEYS.TAB:
                if (shiftKey) {
                    if (this.isFirstTag(data.model)) {
                        return;
                    }
                    this.moveToTag(data.model, constants.PREV);
                }
                else {
                    if (this.isLastTag(data.model) && (this.disable || this.maxItemsReached)) {
                        return;
                    }
                    this.moveToTag(data.model, constants.NEXT);
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
        const stopSwitch = (direction === constants.NEXT && isLast) ||
            (direction === constants.PREV && isFirst);
        if (stopSwitch) {
            this.focus(true);
            return;
        }
        const offset = direction === constants.NEXT ? 1 : -1;
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
        listen.call(this, constants.KEYDOWN, listener, useSeparatorKeys);
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
        listen.call(this, constants.KEYDOWN, listener);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputComponent, deps: [{ token: i0.Renderer2 }, { token: i1.DragProvider }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagInputComponent, selector: "tag-input", inputs: { separatorKeys: "separatorKeys", separatorKeyCodes: "separatorKeyCodes", placeholder: "placeholder", secondaryPlaceholder: "secondaryPlaceholder", maxItems: "maxItems", validators: "validators", asyncValidators: "asyncValidators", onlyFromAutocomplete: "onlyFromAutocomplete", errorMessages: "errorMessages", theme: "theme", onTextChangeDebounce: "onTextChangeDebounce", inputId: "inputId", inputClass: "inputClass", clearOnBlur: "clearOnBlur", hideForm: "hideForm", addOnBlur: "addOnBlur", addOnPaste: "addOnPaste", pasteSplitPattern: "pasteSplitPattern", blinkIfDupe: "blinkIfDupe", removable: "removable", editable: "editable", allowDupes: "allowDupes", modelAsStrings: "modelAsStrings", trimTags: "trimTags", inputText: "inputText", ripple: "ripple", tabindex: "tabindex", disable: "disable", dragZone: "dragZone", onRemoving: "onRemoving", onAdding: "onAdding", animationDuration: "animationDuration" }, outputs: { onAdd: "onAdd", onRemove: "onRemove", onSelect: "onSelect", onFocus: "onFocus", onBlur: "onBlur", onTextChange: "onTextChange", onPaste: "onPaste", onValidationError: "onValidationError", onTagEdited: "onTagEdited", inputTextChange: "inputTextChange" }, host: { properties: { "attr.tabindex": "this.tabindexAttr" } }, providers: [CUSTOM_ACCESSOR], queries: [{ propertyName: "dropdown", first: true, predicate: TagInputDropdown, descendants: true }, { propertyName: "templates", predicate: TemplateRef }], viewQueries: [{ propertyName: "inputForm", first: true, predicate: TagInputForm, descendants: true }, { propertyName: "tags", predicate: TagComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: "<div\r\n    [ngClass]=\"theme\"\r\n    class=\"ng2-tag-input\"\r\n    (click)=\"focus(true, false)\"\r\n    [attr.tabindex]=\"-1\"\r\n    (drop)=\"dragZone ? onTagDropped($event, undefined) : undefined\"\r\n    (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragover)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragend)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n    [class.ng2-tag-input--dropping]=\"isDropping()\"\r\n    [class.ng2-tag-input--disabled]=\"disable\"\r\n    [class.ng2-tag-input--loading]=\"isLoading\"\r\n    [class.ng2-tag-input--invalid]=\"hasErrors()\"\r\n    [class.ng2-tag-input--focused]=\"isInputFocused()\"\r\n>\r\n\r\n    <!-- TAGS -->\r\n    <div class=\"ng2-tags-container\">\r\n        <tag\r\n            *ngFor=\"let item of items; let i = index; trackBy: trackBy\"\r\n            (onSelect)=\"selectItem(item)\"\r\n            (onRemove)=\"onRemoveRequested(item, i)\"\r\n            (onKeyDown)=\"handleKeydown($event)\"\r\n            (onTagEdited)=\"updateEditedTag($event)\"\r\n            (onBlur)=\"onTagBlurred($event, i)\"\r\n            draggable=\"{{ editable }}\"\r\n            (dragstart)=\"dragZone ? onDragStarted($event, item, i) : undefined\"\r\n            (drop)=\"dragZone ? onTagDropped($event, i) : undefined\"\r\n            (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n            (dragover)=\"dragZone ? onDragOver($event, i) : undefined\"\r\n            (dragleave)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n            [canAddTag]=\"isTagValid\"\r\n            [attr.tabindex]=\"0\"\r\n            [disabled]=\"disable\"\r\n            [@animation]=\"animationMetadata\"\r\n            [hasRipple]=\"ripple\"\r\n            [index]=\"i\"\r\n            [removable]=\"removable\"\r\n            [editable]=\"editable\"\r\n            [displayBy]=\"displayBy\"\r\n            [identifyBy]=\"identifyBy\"\r\n            [template]=\"!!hasCustomTemplate() ? templates.first : undefined\"\r\n            [draggable]=\"dragZone\"\r\n            [model]=\"item\"\r\n        >\r\n        </tag>\r\n\r\n        <tag-input-form\r\n            (onSubmit)=\"onFormSubmit()\"\r\n            (onBlur)=\"blur()\"\r\n            (click)=\"dropdown ? dropdown.show() : undefined\"\r\n            (onKeydown)=\"fireEvents('keydown', $event)\"\r\n            (onKeyup)=\"fireEvents('keyup', $event)\"\r\n            [inputText]=\"inputText\"\r\n            [disabled]=\"disable\"\r\n            [validators]=\"validators\"\r\n            [asyncValidators]=\"asyncValidators\"\r\n            [hidden]=\"maxItemsReached\"\r\n            [placeholder]=\"items.length ? placeholder : secondaryPlaceholder\"\r\n            [inputClass]=\"inputClass\"\r\n            [inputId]=\"inputId\"\r\n            [tabindex]=\"tabindex\"\r\n        >\r\n        </tag-input-form>\r\n    </div>\r\n\r\n    <div\r\n        class=\"progress-bar\"\r\n        *ngIf=\"isProgressBarVisible$ | async\"\r\n    ></div>\r\n</div>\r\n\r\n<!-- ERRORS -->\r\n<div\r\n    *ngIf=\"hasErrors()\"\r\n    [ngClass]=\"theme\"\r\n    class=\"error-messages\"\r\n>\r\n    <p\r\n        *ngFor=\"let error of errors\"\r\n        class=\"error-message\"\r\n    >\r\n        <span>{{ error }}</span>\r\n    </p>\r\n</div>\r\n<ng-content></ng-content>\r\n", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:\"\";animation:running-progress 2s cubic-bezier(.4,0,.2,1) infinite}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}to{margin-left:100%;margin-right:0}}tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,Helvetica Neue,sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;transition:all .3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196F3;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:flex;flex-direction:row;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(.readonly):not(.tag--editing):active{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(.readonly):not(.tag--editing):active{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.TagInputForm, selector: "tag-input-form", inputs: ["placeholder", "validators", "asyncValidators", "inputId", "inputClass", "tabindex", "disabled", "inputText"], outputs: ["onSubmit", "onBlur", "onFocus", "onKeyup", "onKeydown", "inputTextChange"] }, { kind: "component", type: i4.TagComponent, selector: "tag", inputs: ["model", "removable", "editable", "template", "displayBy", "identifyBy", "index", "hasRipple", "disabled", "canAddTag"], outputs: ["onSelect", "onRemove", "onBlur", "onKeyDown", "onTagEdited"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], animations: animations });
}
export { TagInputComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tag-input', providers: [CUSTOM_ACCESSOR], animations: animations, template: "<div\r\n    [ngClass]=\"theme\"\r\n    class=\"ng2-tag-input\"\r\n    (click)=\"focus(true, false)\"\r\n    [attr.tabindex]=\"-1\"\r\n    (drop)=\"dragZone ? onTagDropped($event, undefined) : undefined\"\r\n    (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragover)=\"dragZone ? onDragOver($event) : undefined\"\r\n    (dragend)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n    [class.ng2-tag-input--dropping]=\"isDropping()\"\r\n    [class.ng2-tag-input--disabled]=\"disable\"\r\n    [class.ng2-tag-input--loading]=\"isLoading\"\r\n    [class.ng2-tag-input--invalid]=\"hasErrors()\"\r\n    [class.ng2-tag-input--focused]=\"isInputFocused()\"\r\n>\r\n\r\n    <!-- TAGS -->\r\n    <div class=\"ng2-tags-container\">\r\n        <tag\r\n            *ngFor=\"let item of items; let i = index; trackBy: trackBy\"\r\n            (onSelect)=\"selectItem(item)\"\r\n            (onRemove)=\"onRemoveRequested(item, i)\"\r\n            (onKeyDown)=\"handleKeydown($event)\"\r\n            (onTagEdited)=\"updateEditedTag($event)\"\r\n            (onBlur)=\"onTagBlurred($event, i)\"\r\n            draggable=\"{{ editable }}\"\r\n            (dragstart)=\"dragZone ? onDragStarted($event, item, i) : undefined\"\r\n            (drop)=\"dragZone ? onTagDropped($event, i) : undefined\"\r\n            (dragenter)=\"dragZone ? onDragOver($event) : undefined\"\r\n            (dragover)=\"dragZone ? onDragOver($event, i) : undefined\"\r\n            (dragleave)=\"dragZone ? dragProvider.onDragEnd() : undefined\"\r\n            [canAddTag]=\"isTagValid\"\r\n            [attr.tabindex]=\"0\"\r\n            [disabled]=\"disable\"\r\n            [@animation]=\"animationMetadata\"\r\n            [hasRipple]=\"ripple\"\r\n            [index]=\"i\"\r\n            [removable]=\"removable\"\r\n            [editable]=\"editable\"\r\n            [displayBy]=\"displayBy\"\r\n            [identifyBy]=\"identifyBy\"\r\n            [template]=\"!!hasCustomTemplate() ? templates.first : undefined\"\r\n            [draggable]=\"dragZone\"\r\n            [model]=\"item\"\r\n        >\r\n        </tag>\r\n\r\n        <tag-input-form\r\n            (onSubmit)=\"onFormSubmit()\"\r\n            (onBlur)=\"blur()\"\r\n            (click)=\"dropdown ? dropdown.show() : undefined\"\r\n            (onKeydown)=\"fireEvents('keydown', $event)\"\r\n            (onKeyup)=\"fireEvents('keyup', $event)\"\r\n            [inputText]=\"inputText\"\r\n            [disabled]=\"disable\"\r\n            [validators]=\"validators\"\r\n            [asyncValidators]=\"asyncValidators\"\r\n            [hidden]=\"maxItemsReached\"\r\n            [placeholder]=\"items.length ? placeholder : secondaryPlaceholder\"\r\n            [inputClass]=\"inputClass\"\r\n            [inputId]=\"inputId\"\r\n            [tabindex]=\"tabindex\"\r\n        >\r\n        </tag-input-form>\r\n    </div>\r\n\r\n    <div\r\n        class=\"progress-bar\"\r\n        *ngIf=\"isProgressBarVisible$ | async\"\r\n    ></div>\r\n</div>\r\n\r\n<!-- ERRORS -->\r\n<div\r\n    *ngIf=\"hasErrors()\"\r\n    [ngClass]=\"theme\"\r\n    class=\"error-messages\"\r\n>\r\n    <p\r\n        *ngFor=\"let error of errors\"\r\n        class=\"error-message\"\r\n    >\r\n        <span>{{ error }}</span>\r\n    </p>\r\n</div>\r\n<ng-content></ng-content>\r\n", styles: [".dark tag:focus{box-shadow:0 0 0 1px #323232}.ng2-tag-input.bootstrap3-info{background-color:#fff;display:inline-block;color:#555;vertical-align:middle;max-width:100%;height:42px;line-height:44px}.ng2-tag-input.bootstrap3-info input{border:none;box-shadow:none;outline:none;background-color:transparent;padding:0 6px;margin:0;width:auto;max-width:inherit}.ng2-tag-input.bootstrap3-info .form-control input::-moz-placeholder{color:#777;opacity:1}.ng2-tag-input.bootstrap3-info .form-control input:-ms-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info .form-control input::-webkit-input-placeholder{color:#777}.ng2-tag-input.bootstrap3-info input:focus{border:none;box-shadow:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--focused{box-shadow:inset 0 1px 1px #0006;border:1px solid #ccc}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{box-shadow:inset 0 1px 1px #d9534f}.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;transition:all .25s;padding:.25rem 0;min-height:32px;cursor:text;border-bottom:2px solid #efefef}.ng2-tag-input:focus{outline:0}.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #2196F3}.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #f44336}.ng2-tag-input.ng2-tag-input--loading{border:none}.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.ng2-tag-input form{margin:.1em 0}.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.minimal.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:1px solid transparent}.minimal.ng2-tag-input:focus{outline:0}.minimal.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.minimal.ng2-tag-input.ng2-tag-input--loading{border:none}.minimal.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.minimal.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.dark.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #444}.dark.ng2-tag-input:focus{outline:0}.dark.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.dark.ng2-tag-input.ng2-tag-input--loading{border:none}.dark.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.dark.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;cursor:text;border-bottom:2px solid #efefef}.bootstrap.ng2-tag-input:focus{outline:0}.bootstrap.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap.ng2-tag-input.ng2-tag-input--focused{border-bottom:2px solid #0275d8}.bootstrap.ng2-tag-input.ng2-tag-input--invalid{border-bottom:2px solid #d9534f}.bootstrap.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.bootstrap3-info.ng2-tag-input{display:block;flex-direction:row;flex-wrap:wrap;position:relative;padding:4px;cursor:text;box-shadow:inset 0 1px 1px #00000013;border-radius:4px}.bootstrap3-info.ng2-tag-input:focus{outline:0}.bootstrap3-info.ng2-tag-input.ng2-tag-input--dropping{opacity:.7}.bootstrap3-info.ng2-tag-input.ng2-tag-input--invalid{border-bottom:1px solid #d9534f}.bootstrap3-info.ng2-tag-input.ng2-tag-input--loading{border:none}.bootstrap3-info.ng2-tag-input.ng2-tag-input--disabled{opacity:.5;cursor:not-allowed}.bootstrap3-info.ng2-tag-input form{margin:.1em 0}.bootstrap3-info.ng2-tag-input .ng2-tags-container{flex-wrap:wrap;display:flex}.error-message{font-size:.8em;color:#f44336;margin:.5em 0 0}.bootstrap .error-message{color:#d9534f}.progress-bar,.progress-bar:before{height:2px;width:100%;margin:0}.progress-bar{background-color:#2196f3;display:flex;position:absolute;bottom:0}.progress-bar:before{background-color:#82c4f8;content:\"\";animation:running-progress 2s cubic-bezier(.4,0,.2,1) infinite}@keyframes running-progress{0%{margin-left:0;margin-right:100%}50%{margin-left:25%;margin-right:0}to{margin-left:100%;margin-right:0}}tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:Roboto,Helvetica Neue,sans-serif;font-weight:400;font-size:1em;letter-spacing:.05rem;color:#444;border-radius:16px;transition:all .3s;margin:.1rem .3rem .1rem 0;padding:.08rem .45rem;height:32px;line-height:34px;background:#efefef;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}tag:not(.readonly):not(.tag--editing):focus{background:#2196F3;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(.readonly):not(.tag--editing):active{background:#0d8aee;color:#fff;box-shadow:0 2px 3px 1px #d4d1d1}tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#e2e2e2;color:initial;box-shadow:0 2px 3px 1px #d4d1d1}tag.readonly{cursor:default}tag.readonly:focus,tag:focus{outline:0}tag.tag--editing{background-color:#fff;border:1px solid #ccc;cursor:text}.minimal tag{display:flex;flex-direction:row;flex-wrap:wrap;border-radius:0;background:#f9f9f9;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.minimal tag:not(.readonly):not(.tag--editing):focus{background:#d0d0d0;color:initial}.minimal tag:not(.readonly):not(.tag--editing):active{background:#d0d0d0;color:initial}.minimal tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#ececec}.minimal tag.readonly{cursor:default}.minimal tag.readonly:focus,.minimal tag:focus{outline:0}.minimal tag.tag--editing{cursor:text}.dark tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:3px;background:#444;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.dark tag:not(.readonly):not(.tag--editing):focus{background:#efefef;color:#444}.dark tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#2b2b2b;color:#f9f9f9}.dark tag.readonly{cursor:default}.dark tag.readonly:focus,.dark tag:focus{outline:0}.dark tag.tag--editing{cursor:text}.bootstrap tag{display:flex;flex-direction:row;flex-wrap:wrap;color:#f9f9f9;border-radius:.25rem;background:#0275d8;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative}.bootstrap tag:not(.readonly):not(.tag--editing):focus{background:#025aa5}.bootstrap tag:not(.readonly):not(.tag--editing):active{background:#025aa5}.bootstrap tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#0267bf;color:#f9f9f9}.bootstrap tag.readonly{cursor:default}.bootstrap tag.readonly:focus,.bootstrap tag:focus{outline:0}.bootstrap tag.tag--editing{cursor:text}.bootstrap3-info tag{display:flex;flex-direction:row;flex-wrap:wrap;font-family:inherit;font-weight:400;font-size:95%;color:#fff;border-radius:.25em;background:#5bc0de;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;outline:0;cursor:pointer;position:relative;padding:.25em .6em;text-align:center;white-space:nowrap}.bootstrap3-info tag:not(.readonly):not(.tag--editing):focus{background:#28a1c5}.bootstrap3-info tag:not(.readonly):not(.tag--editing):active{background:#28a1c5}.bootstrap3-info tag:not(:focus):not(.tag--editing):not(:active):not(.readonly):hover{background:#46b8da;color:#fff}.bootstrap3-info tag.readonly{cursor:default}.bootstrap3-info tag.readonly:focus,.bootstrap3-info tag:focus{outline:0}.bootstrap3-info tag.tag--editing{cursor:text}:host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.DragProvider }]; }, propDecorators: { separatorKeys: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQudHMiLCIuLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudHMvdGFnLWlucHV0L3RhZy1pbnB1dC50ZW1wbGF0ZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFDVixPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxFQUVaLFdBQVcsRUFHZCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBR0gsaUJBQWlCLEVBRXBCLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLGdCQUFnQjtBQUNoQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUlsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7QUFFNUUsTUFBTSxlQUFlLEdBQUc7SUFDcEIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFB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QXhCLEtBQUs7Z0JBS1UsUUFBUTtzQkFBdkIsS0FBSztnQkFLVSxVQUFVO3NCQUF6QixLQUFLO2dCQU1VLGNBQWM7c0JBQTdCLEtBQUs7Z0JBS1UsUUFBUTtzQkFBdkIsS0FBSztnQkFLYyxTQUFTO3NCQUE1QixLQUFLO2dCQU9VLE1BQU07c0JBQXJCLEtBQUs7Z0JBTVUsUUFBUTtzQkFBdkIsS0FBSztnQkFLVSxPQUFPO3NCQUF0QixLQUFLO2dCQUtVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBS1UsVUFBVTtzQkFBekIsS0FBSztnQkFLVSxRQUFRO3NCQUF2QixLQUFLO2dCQUtVLGlCQUFpQjtzQkFBaEMsS0FBSztnQkFNVyxLQUFLO3NCQUFyQixNQUFNO2dCQU1VLFFBQVE7c0JBQXhCLE1BQU07Z0JBTVUsUUFBUTtzQkFBeEIsTUFBTTtnQkFNVSxPQUFPO3NCQUF2QixNQUFNO2dCQU1VLE1BQU07c0JBQXRCLE1BQU07Z0JBTVUsWUFBWTtzQkFBNUIsTUFBTTtnQkFNVSxPQUFPO3NCQUF2QixNQUFNO2dCQU1VLGlCQUFpQjtzQkFBakMsTUFBTTtnQkFNVSxXQUFXO3NCQUEzQixNQUFNO2dCQU13QyxRQUFRO3NCQUF0RCxZQUFZO3VCQUFDLGdCQUFnQjtnQkFLK0IsU0FBUztzQkFBckUsZUFBZTt1QkFBQyxXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO2dCQUtwQixTQUFTO3NCQUF4QyxTQUFTO3VCQUFDLFlBQVk7Z0JBMEJZLElBQUk7c0JBQXRDLFlBQVk7dUJBQUMsWUFBWTtnQkFlVCxlQUFlO3NCQUEvQixNQUFNO2dCQWFJLFlBQVk7c0JBRHRCLFdBQVc7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFuZ3VsYXJcclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIGZvcndhcmRSZWYsXHJcbiAgICBIb3N0QmluZGluZyxcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0NoaWxkcmVuLFxyXG4gICAgQ29udGVudENoaWxkcmVuLFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgT25Jbml0LFxyXG4gICAgVGVtcGxhdGVSZWYsXHJcbiAgICBRdWVyeUxpc3QsXHJcbiAgICBBZnRlclZpZXdJbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgQXN5bmNWYWxpZGF0b3JGbixcclxuICAgIFVudHlwZWRGb3JtQ29udHJvbCxcclxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgVmFsaWRhdG9yRm5cclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyByeFxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXAsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLy8gbmcyLXRhZy1pbnB1dFxyXG5pbXBvcnQgeyBUYWdJbnB1dEFjY2Vzc29yIH0gZnJvbSAnLi4vLi4vY29yZS9hY2Nlc3Nvcic7XHJcbmltcG9ydCB7IFRhZ01vZGVsIH0gZnJvbSAnLi4vLi4vY29yZS90YWctbW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgbGlzdGVuIH0gZnJvbSAnLi4vLi4vY29yZS9oZWxwZXJzL2xpc3Rlbic7XHJcbmltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tICcuLi8uLi9jb3JlL2NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgeyBEcmFnUHJvdmlkZXIsIERyYWdnZWRUYWcgfSBmcm9tICcuLi8uLi9jb3JlL3Byb3ZpZGVycy9kcmFnLXByb3ZpZGVyJztcclxuXHJcbmltcG9ydCB7IFRhZ0lucHV0Rm9ybSB9IGZyb20gJy4uL3RhZy1pbnB1dC1mb3JtL3RhZy1pbnB1dC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhZ0NvbXBvbmVudCB9IGZyb20gJy4uL3RhZy90YWcuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IGFuaW1hdGlvbnMgfSBmcm9tICcuL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uLy4uL2RlZmF1bHRzJztcclxuaW1wb3J0IHsgVGFnSW5wdXREcm9wZG93biB9IGZyb20gJy4uL2Ryb3Bkb3duL3RhZy1pbnB1dC1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgQ1VTVE9NX0FDQ0VTU09SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZy1pbnB1dCcsXHJcbiAgICBwcm92aWRlcnM6IFtDVVNUT01fQUNDRVNTT1JdLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFnLWlucHV0LnN0eWxlLnNjc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWctaW5wdXQudGVtcGxhdGUuaHRtbCcsXHJcbiAgICBhbmltYXRpb25zXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dENvbXBvbmVudCBleHRlbmRzIFRhZ0lucHV0QWNjZXNzb3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXBhcmF0b3JLZXlzXHJcbiAgICAgKiBAZGVzYyBrZXlib2FyZCBrZXlzIHdpdGggd2hpY2ggYSB1c2VyIGNhbiBzZXBhcmF0ZSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VwYXJhdG9yS2V5czogc3RyaW5nW10gPSBkZWZhdWx0cy50YWdJbnB1dC5zZXBhcmF0b3JLZXlzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VwYXJhdG9yS2V5Q29kZXNcclxuICAgICAqIEBkZXNjIGtleWJvYXJkIGtleSBjb2RlcyB3aXRoIHdoaWNoIGEgdXNlciBjYW4gc2VwYXJhdGUgaXRlbXNcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIHNlcGFyYXRvcktleUNvZGVzOiBudW1iZXJbXSA9IGRlZmF1bHRzLnRhZ0lucHV0LnNlcGFyYXRvcktleUNvZGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcGxhY2Vob2xkZXJcclxuICAgICAqIEBkZXNjIHRoZSBwbGFjZWhvbGRlciBvZiB0aGUgaW5wdXQgdGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnBsYWNlaG9sZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2Vjb25kYXJ5UGxhY2Vob2xkZXJcclxuICAgICAqIEBkZXNjIHBsYWNlaG9sZGVyIHRvIGFwcGVhciB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2Vjb25kYXJ5UGxhY2Vob2xkZXI6IHN0cmluZyA9IGRlZmF1bHRzLnRhZ0lucHV0LnNlY29uZGFyeVBsYWNlaG9sZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgbWF4SXRlbXNcclxuICAgICAqIEBkZXNjIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRoYXQgY2FuIGJlIGFkZGVkXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXhJdGVtczogbnVtYmVyID0gZGVmYXVsdHMudGFnSW5wdXQubWF4SXRlbXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB2YWxpZGF0b3JzXHJcbiAgICAgKiBAZGVzYyBhcnJheSBvZiBWYWxpZGF0b3JzIHRoYXQgYXJlIHVzZWQgdG8gdmFsaWRhdGUgdGhlIHRhZyBiZWZvcmUgaXQgZ2V0cyBhcHBlbmRlZCB0byB0aGUgbGlzdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSA9IGRlZmF1bHRzLnRhZ0lucHV0LnZhbGlkYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhc3luY1ZhbGlkYXRvcnNcclxuICAgICAqIEBkZXNjIGFycmF5IG9mIEFzeW5jVmFsaWRhdG9yIHRoYXQgYXJlIHVzZWQgdG8gdmFsaWRhdGUgdGhlIHRhZyBiZWZvcmUgaXQgZ2V0cyBhcHBlbmRlZCB0byB0aGUgbGlzdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXN5bmNWYWxpZGF0b3JzOiBBc3luY1ZhbGlkYXRvckZuW10gPSBkZWZhdWx0cy50YWdJbnB1dC5hc3luY1ZhbGlkYXRvcnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIC0gaWYgc2V0IHRvIHRydWUsIGl0IHdpbGwgb25seSBwb3NzaWJsZSB0byBhZGQgaXRlbXMgZnJvbSB0aGUgYXV0b2NvbXBsZXRlXHJcbiAgICAqIEBuYW1lIG9ubHlGcm9tQXV0b2NvbXBsZXRlXHJcbiAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG9ubHlGcm9tQXV0b2NvbXBsZXRlID0gZGVmYXVsdHMudGFnSW5wdXQub25seUZyb21BdXRvY29tcGxldGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBlcnJvck1lc3NhZ2VzXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBlcnJvck1lc3NhZ2VzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0gZGVmYXVsdHMudGFnSW5wdXQuZXJyb3JNZXNzYWdlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRoZW1lXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB0aGVtZTogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQudGhlbWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblRleHRDaGFuZ2VEZWJvdW5jZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb25UZXh0Q2hhbmdlRGVib3VuY2UgPSBkZWZhdWx0cy50YWdJbnB1dC5vblRleHRDaGFuZ2VEZWJvdW5jZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gY3VzdG9tIGlkIGFzc2lnbmVkIHRvIHRoZSBpbnB1dFxyXG4gICAgICogQG5hbWUgaWRcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGlucHV0SWQgPSBkZWZhdWx0cy50YWdJbnB1dC5pbnB1dElkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBjdXN0b20gY2xhc3MgYXNzaWduZWQgdG8gdGhlIGlucHV0XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dENsYXNzOiBzdHJpbmcgPSBkZWZhdWx0cy50YWdJbnB1dC5pbnB1dENsYXNzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBvcHRpb24gdG8gY2xlYXIgdGV4dCBpbnB1dCB3aGVuIHRoZSBmb3JtIGlzIGJsdXJyZWRcclxuICAgICAqIEBuYW1lIGNsZWFyT25CbHVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBjbGVhck9uQmx1cjogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmNsZWFyT25CbHVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBoaWRlRm9ybVxyXG4gICAgICogQG5hbWUgY2xlYXJPbkJsdXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGhpZGVGb3JtOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuaGlkZUZvcm07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhZGRPbkJsdXJcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFkZE9uQmx1cjogYm9vbGVhbiA9IGRlZmF1bHRzLnRhZ0lucHV0LmFkZE9uQmx1cjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFkZE9uUGFzdGVcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFkZE9uUGFzdGU6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5hZGRPblBhc3RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBwYXR0ZXJuIHVzZWQgd2l0aCB0aGUgbmF0aXZlIG1ldGhvZCBzcGxpdCgpIHRvIHNlcGFyYXRlIHBhdHRlcm5zIGluIHRoZSBzdHJpbmcgcGFzdGVkXHJcbiAgICAgKiBAbmFtZSBwYXN0ZVNwbGl0UGF0dGVyblxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFzdGVTcGxpdFBhdHRlcm4gPSBkZWZhdWx0cy50YWdJbnB1dC5wYXN0ZVNwbGl0UGF0dGVybjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGJsaW5rSWZEdXBlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBibGlua0lmRHVwZSA9IGRlZmF1bHRzLnRhZ0lucHV0LmJsaW5rSWZEdXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVtb3ZhYmxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyByZW1vdmFibGUgPSBkZWZhdWx0cy50YWdJbnB1dC5yZW1vdmFibGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBlZGl0YWJsZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZWRpdGFibGU6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5lZGl0YWJsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGFsbG93RHVwZXNcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFsbG93RHVwZXMgPSBkZWZhdWx0cy50YWdJbnB1dC5hbGxvd0R1cGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIGlmIHNldCB0byB0cnVlLCB0aGUgbmV3bHkgYWRkZWQgdGFncyB3aWxsIGJlIGFkZGVkIGFzIHN0cmluZ3MsIGFuZCBub3Qgb2JqZWN0c1xyXG4gICAgICogQG5hbWUgbW9kZWxBc1N0cmluZ3NcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIG1vZGVsQXNTdHJpbmdzID0gZGVmYXVsdHMudGFnSW5wdXQubW9kZWxBc1N0cmluZ3M7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0cmltVGFnc1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdHJpbVRhZ3MgPSBkZWZhdWx0cy50YWdJbnB1dC50cmltVGFncztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0VGV4dFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZ2V0IGlucHV0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VGV4dFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmlwcGxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyByaXBwbGU6IGJvb2xlYW4gPSBkZWZhdWx0cy50YWdJbnB1dC5yaXBwbGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0YWJpbmRleFxyXG4gICAgICogQGRlc2MgcGFzcyB0aHJvdWdoIHRoZSBzcGVjaWZpZWQgdGFiaW5kZXggdG8gdGhlIGlucHV0XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyB0YWJpbmRleDogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQudGFiSW5kZXg7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkaXNhYmxlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlOiBib29sZWFuID0gZGVmYXVsdHMudGFnSW5wdXQuZGlzYWJsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGRyYWdab25lXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkcmFnWm9uZTogc3RyaW5nID0gZGVmYXVsdHMudGFnSW5wdXQuZHJhZ1pvbmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblJlbW92aW5nXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvblJlbW92aW5nID0gZGVmYXVsdHMudGFnSW5wdXQub25SZW1vdmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uQWRkaW5nXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvbkFkZGluZyA9IGRlZmF1bHRzLnRhZ0lucHV0Lm9uQWRkaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYW5pbWF0aW9uRHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgcHVibGljIGFuaW1hdGlvbkR1cmF0aW9uID0gZGVmYXVsdHMudGFnSW5wdXQuYW5pbWF0aW9uRHVyYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkFkZFxyXG4gICAgICogQGRlc2MgZXZlbnQgZW1pdHRlZCB3aGVuIGFkZGluZyBhIG5ldyBpdGVtXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25BZGQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25SZW1vdmVcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiByZW1vdmluZyBhbiBleGlzdGluZyBpdGVtXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25TZWxlY3RcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiBzZWxlY3RpbmcgYW4gaXRlbVxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdNb2RlbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uRm9jdXNcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgZm9jdXNlZFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uRm9jdXNcclxuICAgICAqIEBkZXNjIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgYmx1cnJlZFxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UZXh0Q2hhbmdlXHJcbiAgICAgKiBAZGVzYyBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGlucHV0IHZhbHVlIGNoYW5nZXNcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblRleHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBvdXRwdXQgdHJpZ2dlcmVkIHdoZW4gdGV4dCBpcyBwYXN0ZWQgaW4gdGhlIGZvcm1cclxuICAgICAqIEBuYW1lIG9uUGFzdGVcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblBhc3RlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAtIG91dHB1dCB0cmlnZ2VyZWQgd2hlbiB0YWcgZW50ZXJlZCBpcyBub3QgdmFsaWRcclxuICAgICAqIEBuYW1lIG9uVmFsaWRhdGlvbkVycm9yXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25WYWxpZGF0aW9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vZGVsPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogLSBvdXRwdXQgdHJpZ2dlcmVkIHdoZW4gdGFnIGlzIGVkaXRlZFxyXG4gICAgICogQG5hbWUgb25UYWdFZGl0ZWRcclxuICAgICAqL1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblRhZ0VkaXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW9kZWw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBkcm9wZG93blxyXG4gICAgICovXHJcbiAgICAvLyBAQ29udGVudENoaWxkKGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXREcm9wZG93biksIHtzdGF0aWM6IHRydWV9KSBkcm9wZG93bjogVGFnSW5wdXREcm9wZG93bjtcclxuICAgIEBDb250ZW50Q2hpbGQoVGFnSW5wdXREcm9wZG93bikgZGVjbGFyZSBwdWJsaWMgZHJvcGRvd246IFRhZ0lucHV0RHJvcGRvd247XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRlbXBsYXRlXHJcbiAgICAgKiBAZGVzYyByZWZlcmVuY2UgdG8gdGhlIHRlbXBsYXRlIGlmIHByb3ZpZGVkIGJ5IHRoZSB1c2VyXHJcbiAgICAgKi9cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oVGVtcGxhdGVSZWYsIHsgZGVzY2VuZGFudHM6IGZhbHNlIH0pIHB1YmxpYyB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlucHV0Rm9ybVxyXG4gICAgICovXHJcbiAgICBAVmlld0NoaWxkKFRhZ0lucHV0Rm9ybSkgcHVibGljIGlucHV0Rm9ybTogVGFnSW5wdXRGb3JtO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VsZWN0ZWRUYWdcclxuICAgICAqIEBkZXNjIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBzZWxlY3RlZCB0YWdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdGVkVGFnOiBUYWdNb2RlbCB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlzTG9hZGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpbnB1dFRleHRcclxuICAgICAqIEBwYXJhbSB0ZXh0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgaW5wdXRUZXh0KHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuaW5wdXRUZXh0Q2hhbmdlLmVtaXQodGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0YWdzXHJcbiAgICAgKiBAZGVzYyBsaXN0IG9mIEVsZW1lbnQgaXRlbXNcclxuICAgICAqL1xyXG4gICAgQFZpZXdDaGlsZHJlbihUYWdDb21wb25lbnQpIHB1YmxpYyB0YWdzOiBRdWVyeUxpc3Q8VGFnQ29tcG9uZW50PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGxpc3RlbmVyc1xyXG4gICAgICogQGRlc2MgYXJyYXkgb2YgZXZlbnRzIHRoYXQgZ2V0IGZpcmVkIHVzaW5nIEBmaXJlRXZlbnRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuZXJzID0ge1xyXG4gICAgICAgIFtjb25zdGFudHMuS0VZRE9XTl06IDx7IChmdW4pOiBhbnkgfVtdPltdLFxyXG4gICAgICAgIFtjb25zdGFudHMuS0VZVVBdOiA8eyAoZnVuKTogYW55IH1bXT5bXVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBlbWl0dGVyIGZvciB0aGUgMi13YXkgZGF0YSBiaW5kaW5nIGlucHV0VGV4dCB2YWx1ZVxyXG4gICAgICogQG5hbWUgaW5wdXRUZXh0Q2hhbmdlXHJcbiAgICAgKi9cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgaW5wdXRUZXh0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBwcml2YXRlIHZhcmlhYmxlIHRvIGJpbmQgZ2V0L3NldFxyXG4gICAgICogQG5hbWUgaW5wdXRUZXh0VmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlucHV0VGV4dFZhbHVlID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyByZW1vdmVzIHRoZSB0YWIgaW5kZXggaWYgaXQgaXMgc2V0IC0gaXQgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgaW5wdXRcclxuICAgICAqIEBuYW1lIHRhYmluZGV4QXR0clxyXG4gICAgICovXHJcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKVxyXG4gICAgcHVibGljIGdldCB0YWJpbmRleEF0dHIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWJpbmRleCAhPT0gJycgPyAnLTEnIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhbmltYXRpb25NZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYW5pbWF0aW9uTWV0YWRhdGE6IHsgdmFsdWU6IHN0cmluZywgcGFyYW1zOiBvYmplY3QgfTtcclxuXHJcbiAgICBwdWJsaWMgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBpc1Byb2dyZXNzQmFyVmlzaWJsZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBkcmFnUHJvdmlkZXI6IERyYWdQcm92aWRlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBuZ0FmdGVyVmlld0luaXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBzZXQgdXAgbGlzdGVuZXJzXHJcblxyXG4gICAgICAgIHRoaXMuc2V0VXBLZXlwcmVzc0xpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBTZXBhcmF0b3JLZXlzTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnNldFVwSW5wdXRLZXlkb3duTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uVGV4dENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VXBUZXh0Q2hhbmdlU3Vic2NyaWJlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgY2xlYXIgb24gYmx1ciBpcyBzZXQgdG8gdHJ1ZSwgc3Vic2NyaWJlIHRvIHRoZSBldmVudCBhbmQgY2xlYXIgdGhlIHRleHQncyBmb3JtXHJcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJPbkJsdXIgfHwgdGhpcy5hZGRPbkJsdXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRVcE9uQmx1clN1YnNjcmliZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGFkZE9uUGFzdGUgaXMgc2V0IHRvIHRydWUsIHJlZ2lzdGVyIHRoZSBoYW5kbGVyIGFuZCBhZGQgaXRlbXNcclxuICAgICAgICBpZiAodGhpcy5hZGRPblBhc3RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VXBPblBhc3RlTGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXR1c0NoYW5nZXMkID0gdGhpcy5pbnB1dEZvcm0uZm9ybS5zdGF0dXNDaGFuZ2VzO1xyXG5cclxuICAgICAgICBzdGF0dXNDaGFuZ2VzJC5waXBlKFxyXG4gICAgICAgICAgICBmaWx0ZXIoKHN0YXR1czogc3RyaW5nKSA9PiBzdGF0dXMgIT09ICdQRU5ESU5HJylcclxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gdGhpcy5pbnB1dEZvcm0uZ2V0RXJyb3JNZXNzYWdlcyh0aGlzLmVycm9yTWVzc2FnZXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmlzUHJvZ3Jlc3NCYXJWaXNpYmxlJCA9IHN0YXR1c0NoYW5nZXMkLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcCgoc3RhdHVzOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXMgPT09ICdQRU5ESU5HJyB8fCB0aGlzLmlzTG9hZGluZztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBpZiBoaWRlRm9ybSBpcyBzZXQgdG8gdHJ1ZSwgcmVtb3ZlIHRoZSBpbnB1dFxyXG4gICAgICAgIGlmICh0aGlzLmhpZGVGb3JtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGb3JtLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBuZ09uSW5pdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgdGhlIG51bWJlciBvZiBpdGVtcyBzcGVjaWZpZWQgaW4gdGhlIG1vZGVsIGlzID4gb2YgdGhlIHZhbHVlIG9mIG1heEl0ZW1zXHJcbiAgICAgICAgLy8gZGVncmFkZSBncmFjZWZ1bGx5IGFuZCBsZXQgdGhlIG1heCBudW1iZXIgb2YgaXRlbXMgdG8gYmUgdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgbW9kZWxcclxuICAgICAgICAvLyB0aG91Z2gsIHdhcm4gdGhlIHVzZXIuXHJcbiAgICAgICAgY29uc3QgaGFzUmVhY2hlZE1heEl0ZW1zID0gdGhpcy5tYXhJdGVtcyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgJiZcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5sZW5ndGggPiB0aGlzLm1heEl0ZW1zO1xyXG5cclxuICAgICAgICBpZiAoaGFzUmVhY2hlZE1heEl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4SXRlbXMgPSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGNvbnN0YW50cy5NQVhfSVRFTVNfV0FSTklORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXR0aW5nIGVkaXRhYmxlIHRvIGZhbHNlIHRvIGZpeCBwcm9ibGVtIHdpdGggdGFncyBpbiBJRSBzdGlsbCBiZWluZyBlZGl0YWJsZSB3aGVuXHJcbiAgICAgICAgLy8gb25seUZyb21BdXRvY29tcGxldGUgaXMgdHJ1ZVxyXG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSB0aGlzLm9ubHlGcm9tQXV0b2NvbXBsZXRlID8gZmFsc2UgOiB0aGlzLmVkaXRhYmxlO1xyXG5cclxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbk1ldGFkYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvblJlbW92ZVJlcXVlc3RlZFxyXG4gICAgICogQHBhcmFtIHRhZ1xyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblJlbW92ZVJlcXVlc3RlZCh0YWc6IFRhZ01vZGVsLCBpbmRleDogbnVtYmVyKTogUHJvbWlzZTxUYWdNb2RlbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaWJlRm4gPSAobW9kZWw6IFRhZ01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obW9kZWwsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodGFnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmluZyA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVtb3ZpbmcodGFnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKGZpcnN0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShzdWJzY3JpYmVGbikgOiBzdWJzY3JpYmVGbih0YWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25BZGRpbmdSZXF1ZXN0ZWRcclxuICAgICAqIEBwYXJhbSBmcm9tQXV0b2NvbXBsZXRlIHtib29sZWFufVxyXG4gICAgICogQHBhcmFtIHRhZyB7VGFnTW9kZWx9XHJcbiAgICAgKiBAcGFyYW0gaW5kZXg/IHtudW1iZXJ9XHJcbiAgICAgKiBAcGFyYW0gZ2l2ZXVwRm9jdXM/IHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25BZGRpbmdSZXF1ZXN0ZWQoZnJvbUF1dG9jb21wbGV0ZTogYm9vbGVhbiwgdGFnOiBUYWdNb2RlbCxcclxuICAgICAgICBpbmRleD86IG51bWJlciwgZ2l2ZXVwRm9jdXM/OiBib29sZWFuKTogUHJvbWlzZTxUYWdNb2RlbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjcmliZUZuID0gKG1vZGVsOiBUYWdNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAuYWRkSXRlbShmcm9tQXV0b2NvbXBsZXRlLCBtb2RlbCwgaW5kZXgsIGdpdmV1cEZvY3VzKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbkFkZGluZyA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkaW5nKHRhZylcclxuICAgICAgICAgICAgICAgICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoc3Vic2NyaWJlRm4sIHJlamVjdCkgOiBzdWJzY3JpYmVGbih0YWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgYXBwZW5kVGFnXHJcbiAgICAgKiBAcGFyYW0gdGFnIHtUYWdNb2RlbH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwcGVuZFRhZyA9ICh0YWc6IFRhZ01vZGVsLCBpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zO1xyXG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbEFzU3RyaW5ncyA/IHRhZ1t0aGlzLmlkZW50aWZ5QnldIDogdGFnO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zID0gW1xyXG4gICAgICAgICAgICAuLi5pdGVtcy5zbGljZSgwLCBpbmRleCksXHJcbiAgICAgICAgICAgIG1vZGVsLFxyXG4gICAgICAgICAgICAuLi5pdGVtcy5zbGljZShpbmRleCwgaXRlbXMubGVuZ3RoKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBjcmVhdGVUYWdcclxuICAgICAqIEBwYXJhbSBtb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVGFnID0gKG1vZGVsOiBUYWdNb2RlbCk6IFRhZ01vZGVsID0+IHtcclxuICAgICAgICBjb25zdCB0cmltID0gKHZhbDogVGFnTW9kZWwsIGtleTogc3RyaW5nKTogVGFnTW9kZWwgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyB2YWwudHJpbSgpIDogdmFsW2tleV07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4udHlwZW9mIG1vZGVsICE9PSAnc3RyaW5nJyA/IG1vZGVsIDoge30sXHJcbiAgICAgICAgICAgIFt0aGlzLmRpc3BsYXlCeV06IHRoaXMudHJpbVRhZ3MgPyB0cmltKG1vZGVsLCB0aGlzLmRpc3BsYXlCeSkgOiBtb2RlbCxcclxuICAgICAgICAgICAgW3RoaXMuaWRlbnRpZnlCeV06IHRoaXMudHJpbVRhZ3MgPyB0cmltKG1vZGVsLCB0aGlzLmlkZW50aWZ5QnkpIDogbW9kZWxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2VsZWN0SXRlbVxyXG4gICAgICogQGRlc2Mgc2VsZWN0cyBpdGVtIHBhc3NlZCBhcyBwYXJhbWV0ZXIgYXMgdGhlIHNlbGVjdGVkIHRhZ1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqIEBwYXJhbSBlbWl0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RJdGVtKGl0ZW06IFRhZ01vZGVsIHwgdW5kZWZpbmVkLCBlbWl0ID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzUmVhZG9ubHkgPSBpdGVtICYmIHR5cGVvZiBpdGVtICE9PSAnc3RyaW5nJyAmJiBpdGVtLnJlYWRvbmx5O1xyXG5cclxuICAgICAgICBpZiAoaXNSZWFkb25seSB8fCB0aGlzLnNlbGVjdGVkVGFnID09PSBpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWcgPSBpdGVtO1xyXG5cclxuICAgICAgICBpZiAoZW1pdCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZmlyZUV2ZW50c1xyXG4gICAgICogQGRlc2MgZ29lcyB0aHJvdWdoIHRoZSBsaXN0IG9mIHRoZSBldmVudHMgZm9yIGEgZ2l2ZW4gZXZlbnROYW1lLCBhbmQgZmlyZXMgZWFjaCBvZiB0aGVtXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXHJcbiAgICAgKiBAcGFyYW0gJGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaXJlRXZlbnRzKGV2ZW50TmFtZTogc3RyaW5nLCAkZXZlbnQ/KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyLmNhbGwodGhpcywgJGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBoYW5kbGVLZXlkb3duXHJcbiAgICAgKiBAZGVzYyBoYW5kbGVzIGFjdGlvbiB3aGVuIHRoZSB1c2VyIGhpdHMgYSBrZXlib2FyZCBrZXlcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVLZXlkb3duKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZGF0YS5ldmVudDtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xyXG4gICAgICAgIGNvbnN0IHNoaWZ0S2V5ID0gZXZlbnQuc2hpZnRLZXkgfHwgZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoY29uc3RhbnRzLktFWV9QUkVTU19BQ1RJT05TW2tleV0pIHtcclxuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuQUNUSU9OU19LRVlTLkRFTEVURTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFnICYmIHRoaXMucmVtb3ZhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZFRhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlbW92ZVJlcXVlc3RlZCh0aGlzLnNlbGVjdGVkVGFnLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkFDVElPTlNfS0VZUy5TV0lUQ0hfUFJFVjpcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFnKGRhdGEubW9kZWwsIGNvbnN0YW50cy5QUkVWKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuQUNUSU9OU19LRVlTLlNXSVRDSF9ORVhUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9UYWcoZGF0YS5tb2RlbCwgY29uc3RhbnRzLk5FWFQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BQ1RJT05TX0tFWVMuVEFCOlxyXG4gICAgICAgICAgICAgICAgaWYgKHNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFRhZyhkYXRhLm1vZGVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RhZyhkYXRhLm1vZGVsLCBjb25zdGFudHMuUFJFVik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTGFzdFRhZyhkYXRhLm1vZGVsKSAmJiAodGhpcy5kaXNhYmxlIHx8IHRoaXMubWF4SXRlbXNSZWFjaGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1RhZyhkYXRhLm1vZGVsLCBjb25zdGFudHMuTkVYVCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3VyXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb25Gb3JtU3VibWl0KCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub25BZGRpbmdSZXF1ZXN0ZWQoZmFsc2UsIHRoaXMuZm9ybVZhbHVlKTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldElucHV0VmFsdWVcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nLCBlbWl0RXZlbnQgPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbCgpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgZm9ybSB2YWx1ZSB3aXRoIHRoZSB0cmFuc2Zvcm1lZCBpdGVtXHJcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRDb250cm9sXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29udHJvbCgpOiBVbnR5cGVkRm9ybUNvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0Rm9ybS52YWx1ZSBhcyBVbnR5cGVkRm9ybUNvbnRyb2w7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb2N1c1xyXG4gICAgICogQHBhcmFtIGFwcGx5Rm9jdXNcclxuICAgICAqIEBwYXJhbSBkaXNwbGF5QXV0b2NvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb2N1cyhhcHBseUZvY3VzID0gZmFsc2UsIGRpc3BsYXlBdXRvY29tcGxldGUgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdQcm92aWRlci5nZXRTdGF0ZSgnZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odW5kZWZpbmVkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChhcHBseUZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGb3JtLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KHRoaXMuZm9ybVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBibHVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBibHVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQodGhpcy5mb3JtVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaGFzRXJyb3JzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5pbnB1dEZvcm0gJiYgdGhpcy5pbnB1dEZvcm0uaGFzRXJyb3JzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpc0lucHV0Rm9jdXNlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNJbnB1dEZvY3VzZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5pbnB1dEZvcm0gJiYgdGhpcy5pbnB1dEZvcm0uaXNJbnB1dEZvY3VzZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIC0gdGhpcyBpcyB0aGUgb25lIHdheSBJIGZvdW5kIHRvIHRlbGwgaWYgdGhlIHRlbXBsYXRlIGhhcyBiZWVuIHBhc3NlZCBhbmQgaXQgaXMgbm90XHJcbiAgICAgKiB0aGUgdGVtcGxhdGUgZm9yIHRoZSBtZW51IGl0ZW1cclxuICAgICAqIEBuYW1lIGhhc0N1c3RvbVRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNDdXN0b21UZW1wbGF0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzID8gdGhpcy50ZW1wbGF0ZXMuZmlyc3QgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgbWVudVRlbXBsYXRlID0gdGhpcy5kcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLnRlbXBsYXRlcyA/XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24udGVtcGxhdGVzLmZpcnN0IDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICByZXR1cm4gQm9vbGVhbih0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZSAhPT0gbWVudVRlbXBsYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1heEl0ZW1zUmVhY2hlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG1heEl0ZW1zUmVhY2hlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhJdGVtcyAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMubGVuZ3RoID49IHRoaXMubWF4SXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmb3JtVmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBmb3JtVmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBmb3JtID0gdGhpcy5pbnB1dEZvcm0udmFsdWU7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtID8gZm9ybS52YWx1ZSA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKjNcclxuICAgICAqIEBuYW1lIG9uRHJhZ1N0YXJ0ZWRcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRyYWdTdGFydGVkKGV2ZW50OiBEcmFnRXZlbnQsIHRhZzogVGFnTW9kZWwsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHsgem9uZTogdGhpcy5kcmFnWm9uZSwgdGFnLCBpbmRleCB9IGFzIERyYWdnZWRUYWc7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ1Byb3ZpZGVyLnNldFNlbmRlcih0aGlzKTtcclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXREcmFnZ2VkSXRlbShldmVudCwgaXRlbSk7XHJcbiAgICAgICAgdGhpcy5kcmFnUHJvdmlkZXIuc2V0U3RhdGUoeyBkcmFnZ2luZzogdHJ1ZSwgaW5kZXggfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkRyYWdPdmVyXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5zZXRTdGF0ZSh7IGRyb3BwaW5nOiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuZHJhZ1Byb3ZpZGVyLnNldFJlY2VpdmVyKHRoaXMpO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgb25UYWdEcm9wcGVkXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdEcm9wcGVkKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZHJhZ1Byb3ZpZGVyLmdldERyYWdnZWRJdGVtKGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCFpdGVtIHx8IGl0ZW0uem9uZSAhPT0gdGhpcy5kcmFnWm9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYWdQcm92aWRlci5vblRhZ0Ryb3BwZWQoaXRlbS50YWcsIGl0ZW0uaW5kZXgsIGluZGV4KTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGlzRHJvcHBpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRHJvcHBpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgaXNSZWNlaXZlciA9IHRoaXMuZHJhZ1Byb3ZpZGVyLnJlY2VpdmVyID09PSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlzRHJvcHBpbmcgPSB0aGlzLmRyYWdQcm92aWRlci5nZXRTdGF0ZSgnZHJvcHBpbmcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oaXNSZWNlaXZlciAmJiBpc0Ryb3BwaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnQmx1cnJlZFxyXG4gICAgICogQHBhcmFtIGNoYW5nZWRFbGVtZW50IHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdCbHVycmVkKGNoYW5nZWRFbGVtZW50OiBUYWdNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdID0gY2hhbmdlZEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB0cmFja0J5XHJcbiAgICAgKiBAcGFyYW0gaXRlbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYWNrQnkoaW5kZXg6IG51bWJlciwgaXRlbTogVGFnTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBpdGVtW3RoaXMuaWRlbnRpZnlCeV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB1cGRhdGVFZGl0ZWRUYWdcclxuICAgICAqIEBwYXJhbSB0YWdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZUVkaXRlZFRhZyh0YWc6IFRhZ01vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRhZ0VkaXRlZC5lbWl0KHRhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRhZ1xyXG4gICAgICogQHBhcmFtIGlzRnJvbUF1dG9jb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNUYWdWYWxpZCA9ICh0YWc6IFRhZ01vZGVsLCBmcm9tQXV0b2NvbXBsZXRlID0gZmFsc2UpOiBib29sZWFuID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSB0aGlzLmRyb3Bkb3duID8gdGhpcy5kcm9wZG93bi5zZWxlY3RlZEl0ZW0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEl0ZW1EaXNwbGF5KHRhZykudHJpbSgpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtICYmICFmcm9tQXV0b2NvbXBsZXRlIHx8ICF2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkdXBlID0gdGhpcy5maW5kRHVwZSh0YWcsIGZyb21BdXRvY29tcGxldGUpO1xyXG5cclxuICAgICAgICAvLyBpZiBzbywgZ2l2ZSBhIHZpc3VhbCBjdWUgYW5kIHJldHVybiBmYWxzZVxyXG4gICAgICAgIGlmICghdGhpcy5hbGxvd0R1cGVzICYmIGR1cGUgJiYgdGhpcy5ibGlua0lmRHVwZSkge1xyXG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMudGFncy5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVZhbHVlKGl0ZW0ubW9kZWwpID09PSB0aGlzLmdldEl0ZW1WYWx1ZShkdXBlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLmJsaW5rKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzRnJvbUF1dG9jb21wbGV0ZSA9IGZyb21BdXRvY29tcGxldGUgJiYgdGhpcy5vbmx5RnJvbUF1dG9jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzZXJ0aW9ucyA9IFtcclxuICAgICAgICAgICAgLy8gMS4gdGhlcmUgbXVzdCBiZSBubyBkdXBlIE9SIGR1cGVzIGFyZSBhbGxvd2VkXHJcbiAgICAgICAgICAgICFkdXBlIHx8IHRoaXMuYWxsb3dEdXBlcyxcclxuXHJcbiAgICAgICAgICAgIC8vIDIuIGNoZWNrIG1heCBpdGVtcyBoYXMgbm90IGJlZW4gcmVhY2hlZFxyXG4gICAgICAgICAgICAhdGhpcy5tYXhJdGVtc1JlYWNoZWQsXHJcblxyXG4gICAgICAgICAgICAvLyAzLiBjaGVjayBpdGVtIGNvbWVzIGZyb20gYXV0b2NvbXBsZXRlIG9yIG9ubHlGcm9tQXV0b2NvbXBsZXRlIGlzIGZhbHNlXHJcbiAgICAgICAgICAgICgoaXNGcm9tQXV0b2NvbXBsZXRlKSB8fCAhdGhpcy5vbmx5RnJvbUF1dG9jb21wbGV0ZSlcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICByZXR1cm4gYXNzZXJ0aW9ucy5maWx0ZXIoQm9vbGVhbikubGVuZ3RoID09PSBhc3NlcnRpb25zLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG1vdmVUb1RhZ1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlVG9UYWcoaXRlbTogVGFnTW9kZWwsIGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gdGhpcy5pc0xhc3RUYWcoaXRlbSk7XHJcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9IHRoaXMuaXNGaXJzdFRhZyhpdGVtKTtcclxuICAgICAgICBjb25zdCBzdG9wU3dpdGNoID0gKGRpcmVjdGlvbiA9PT0gY29uc3RhbnRzLk5FWFQgJiYgaXNMYXN0KSB8fFxyXG4gICAgICAgICAgICAoZGlyZWN0aW9uID09PSBjb25zdGFudHMuUFJFViAmJiBpc0ZpcnN0KTtcclxuXHJcbiAgICAgICAgaWYgKHN0b3BTd2l0Y2gpIHtcclxuICAgICAgICAgICAgdGhpcy5mb2N1cyh0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZGlyZWN0aW9uID09PSBjb25zdGFudHMuTkVYVCA/IDEgOiAtMTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0VGFnSW5kZXgoaXRlbSkgKyBvZmZzZXQ7XHJcbiAgICAgICAgY29uc3QgdGFnID0gdGhpcy5nZXRUYWdBdEluZGV4KGluZGV4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRhZy5zZWxlY3QuY2FsbCh0YWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNGaXJzdFRhZ1xyXG4gICAgICogQHBhcmFtIGl0ZW0ge1RhZ01vZGVsfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRmlyc3RUYWcoaXRlbTogVGFnTW9kZWwpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmZpcnN0Lm1vZGVsID09PSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgaXNMYXN0VGFnXHJcbiAgICAgKiBAcGFyYW0gaXRlbSB7VGFnTW9kZWx9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNMYXN0VGFnKGl0ZW06IFRhZ01vZGVsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5sYXN0Lm1vZGVsID09PSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0VGFnSW5kZXhcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VGFnSW5kZXgoaXRlbTogVGFnTW9kZWwpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0aGlzLnRhZ3MudG9BcnJheSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGFncy5maW5kSW5kZXgodGFnID0+IHRhZy5tb2RlbCA9PT0gaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBnZXRUYWdBdEluZGV4XHJcbiAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUYWdBdEluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0YWdzID0gdGhpcy50YWdzLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRhZ3NbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgcmVtb3ZlSXRlbVxyXG4gICAgICogQGRlc2MgcmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGFycmF5IG9mIHRoZSBtb2RlbFxyXG4gICAgICogQHBhcmFtIHRhZyB7VGFnTW9kZWx9XHJcbiAgICAgKiBAcGFyYW0gaW5kZXgge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUl0ZW0odGFnOiBUYWdNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmdldEl0ZW1zV2l0aG91dChpbmRleCk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSByZW1vdmVkIHRhZyB3YXMgc2VsZWN0ZWQsIHNldCBpdCBhcyB1bmRlZmluZWRcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRhZyA9PT0gdGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbSh1bmRlZmluZWQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZvY3VzIGlucHV0XHJcbiAgICAgICAgdGhpcy5mb2N1cyh0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIGVtaXQgcmVtb3ZlIGV2ZW50XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHRhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBhZGRJdGVtXHJcbiAgICAgKiBAZGVzYyBhZGRzIHRoZSBjdXJyZW50IHRleHQgbW9kZWwgdG8gdGhlIGl0ZW1zIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gZnJvbUF1dG9jb21wbGV0ZSB7Ym9vbGVhbn1cclxuICAgICAqIEBwYXJhbSBpdGVtIHtUYWdNb2RlbH1cclxuICAgICAqIEBwYXJhbSBpbmRleD8ge251bWJlcn1cclxuICAgICAqIEBwYXJhbSBnaXZldXBGb2N1cz8ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkSXRlbShmcm9tQXV0b2NvbXBsZXRlID0gZmFsc2UsIGl0ZW06IFRhZ01vZGVsLCBpbmRleD86IG51bWJlciwgZ2l2ZXVwRm9jdXM/OiBib29sZWFuKTpcclxuICAgICAgICBQcm9taXNlPFRhZ01vZGVsPiB7XHJcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IHRoaXMuZ2V0SXRlbURpc3BsYXkoaXRlbSk7XHJcbiAgICAgICAgY29uc3QgdGFnID0gdGhpcy5jcmVhdGVUYWcoaXRlbSk7XHJcblxyXG4gICAgICAgIGlmIChmcm9tQXV0b2NvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLmdldEl0ZW1WYWx1ZShpdGVtLCB0cnVlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQG5hbWUgcmVzZXRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc2V0ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgY29udHJvbCBhbmQgZm9jdXMgaW5wdXRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSgnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdpdmV1cEZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cyhmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb2N1cyBpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXModHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZGlzcGxheSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhcHBlbmRJdGVtID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRUYWcodGFnLCBpbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZW1pdCBldmVudFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFkZC5lbWl0KHRhZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3Bkb3duLnNob3dEcm9wZG93bklmRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuaW5wdXRGb3JtLmZvcm0uc3RhdHVzO1xyXG4gICAgICAgICAgICBjb25zdCBpc1RhZ1ZhbGlkID0gdGhpcy5pc1RhZ1ZhbGlkKHRhZywgZnJvbUF1dG9jb21wbGV0ZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvblZhbGlkYXRpb25FcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25WYWxpZGF0aW9uRXJyb3IuZW1pdCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ1ZBTElEJyAmJiBpc1RhZ1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBlbmRJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ0lOVkFMSUQnIHx8ICFpc1RhZ1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9uVmFsaWRhdGlvbkVycm9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdQRU5ESU5HJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzVXBkYXRlJCA9IHRoaXMuaW5wdXRGb3JtLmZvcm0uc3RhdHVzQ2hhbmdlcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdHVzVXBkYXRlJFxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoc3RhdHVzVXBkYXRlID0+IHN0YXR1c1VwZGF0ZSAhPT0gJ1BFTkRJTkcnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0dXNVcGRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c1VwZGF0ZSA9PT0gJ1ZBTElEJyAmJiBpc1RhZ1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb25WYWxpZGF0aW9uRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXR1cFNlcGFyYXRvcktleXNMaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldHVwU2VwYXJhdG9yS2V5c0xpc3RlbmVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVzZVNlcGFyYXRvcktleXMgPSB0aGlzLnNlcGFyYXRvcktleUNvZGVzLmxlbmd0aCA+IDAgfHwgdGhpcy5zZXBhcmF0b3JLZXlzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoJGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0tleUNvZGUgPSB0aGlzLnNlcGFyYXRvcktleUNvZGVzLmluZGV4T2YoJGV2ZW50LmtleUNvZGUpID49IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc0tleSA9IHRoaXMuc2VwYXJhdG9yS2V5cy5pbmRleE9mKCRldmVudC5rZXkpID49IDA7XHJcbiAgICAgICAgICAgIC8vIHRoZSBrZXlDb2RlIG9mIGtleWRvd24gZXZlbnQgaXMgMjI5IHdoZW4gSU1FIGlzIHByb2Nlc3NpbmcgdGhlIGtleSBldmVudC5cclxuICAgICAgICAgICAgY29uc3QgaXNJTUVQcm9jZXNzaW5nID0gJGV2ZW50LmtleUNvZGUgPT09IDIyOTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNLZXlDb2RlIHx8IChoYXNLZXkgJiYgIWlzSU1FUHJvY2Vzc2luZykpIHtcclxuICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFkZGluZ1JlcXVlc3RlZChmYWxzZSwgdGhpcy5mb3JtVmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaXN0ZW4uY2FsbCh0aGlzLCBjb25zdGFudHMuS0VZRE9XTiwgbGlzdGVuZXIsIHVzZVNlcGFyYXRvcktleXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0VXBLZXlwcmVzc0xpc3RlbmVyc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFVwS2V5cHJlc3NMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoJGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ29ycmVjdEtleSA9ICRldmVudC5rZXlDb2RlID09PSAzNyB8fCAkZXZlbnQua2V5Q29kZSA9PT0gODtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0NvcnJlY3RLZXkgJiZcclxuICAgICAgICAgICAgICAgICF0aGlzLmZvcm1WYWx1ZSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFncy5sYXN0LnNlbGVjdC5jYWxsKHRoaXMudGFncy5sYXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHNldHRpbmcgdXAgdGhlIGtleXByZXNzIGxpc3RlbmVyc1xyXG4gICAgICAgIGxpc3Rlbi5jYWxsKHRoaXMsIGNvbnN0YW50cy5LRVlET1dOLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRVcEtleWRvd25MaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcElucHV0S2V5ZG93bkxpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlucHV0Rm9ybS5vbktleWRvd24uc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScgJiYgdGhpcy5mb3JtVmFsdWUudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0VXBPblBhc3RlTGlzdGVuZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcE9uUGFzdGVMaXN0ZW5lcigpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuaW5wdXRGb3JtLmlucHV0Lm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIGF0dGFjaCBsaXN0ZW5lciB0byBpbnB1dFxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGlucHV0LCAncGFzdGUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblBhc3RlQ2FsbGJhY2soZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRVcFRleHRDaGFuZ2VTdWJzY3JpYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0VXBUZXh0Q2hhbmdlU3Vic2NyaWJlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlucHV0Rm9ybS5mb3JtXHJcbiAgICAgICAgICAgIC52YWx1ZUNoYW5nZXNcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5vblRleHRDaGFuZ2VEZWJvdW5jZSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogeyBpdGVtOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblRleHRDaGFuZ2UuZW1pdCh2YWx1ZS5pdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRVcE9uQmx1clN1YnNjcmliZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRVcE9uQmx1clN1YnNjcmliZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyRm4gPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVmlzaWJsZSA9IHRoaXMuZHJvcGRvd24gJiYgdGhpcy5kcm9wZG93bi5pc1Zpc2libGU7XHJcbiAgICAgICAgICAgIHJldHVybiAhaXNWaXNpYmxlICYmICEhdGhpcy5mb3JtVmFsdWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dEZvcm1cclxuICAgICAgICAgICAgLm9uQmx1clxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSgxMDApLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyKGZpbHRlckZuKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzZXQgPSAoKSA9PiB0aGlzLnNldElucHV0VmFsdWUoJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkZE9uQmx1cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbkFkZGluZ1JlcXVlc3RlZChmYWxzZSwgdGhpcy5mb3JtVmFsdWUsIHVuZGVmaW5lZCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZXNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBmaW5kRHVwZVxyXG4gICAgICogQHBhcmFtIHRhZ1xyXG4gICAgICogQHBhcmFtIGlzRnJvbUF1dG9jb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmREdXBlKHRhZzogVGFnTW9kZWwsIGlzRnJvbUF1dG9jb21wbGV0ZTogYm9vbGVhbik6IFRhZ01vZGVsIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBjb25zdCBpZGVudGlmeUJ5ID0gaXNGcm9tQXV0b2NvbXBsZXRlID8gdGhpcy5kcm9wZG93bi5pZGVudGlmeUJ5IDogdGhpcy5pZGVudGlmeUJ5O1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGFnW2lkZW50aWZ5QnldO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maW5kKGl0ZW0gPT4gdGhpcy5nZXRJdGVtVmFsdWUoaXRlbSkgPT09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uUGFzdGVDYWxsYmFja1xyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblBhc3RlQ2FsbGJhY2sgPSBhc3luYyAoZGF0YTogQ2xpcGJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpbnRlcmZhY2UgSUVXaW5kb3cgZXh0ZW5kcyBXaW5kb3cge1xyXG4gICAgICAgICAgICBjbGlwYm9hcmREYXRhOiBEYXRhVHJhbnNmZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBnZXRUZXh0ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzSUUgPSBCb29sZWFuKCh3aW5kb3cgYXMgSUVXaW5kb3cgJiB0eXBlb2YgZ2xvYmFsVGhpcykuY2xpcGJvYXJkRGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBpc0lFID8gKFxyXG4gICAgICAgICAgICAgICAgKHdpbmRvdyBhcyBJRVdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzKS5jbGlwYm9hcmREYXRhXHJcbiAgICAgICAgICAgICkgOiBkYXRhLmNsaXBib2FyZERhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBpc0lFID8gJ1RleHQnIDogJ3RleHQvcGxhaW4nO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xpcGJvYXJkRGF0YSA9PT0gbnVsbCA/ICcnIDogY2xpcGJvYXJkRGF0YS5nZXREYXRhKHR5cGUpIHx8ICcnO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBnZXRUZXh0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RzID0gdGV4dFxyXG4gICAgICAgICAgICAuc3BsaXQodGhpcy5wYXN0ZVNwbGl0UGF0dGVybilcclxuICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMuY3JlYXRlVGFnKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRhZ1t0aGlzLmRpc3BsYXlCeV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25BZGRpbmdSZXF1ZXN0ZWQoZmFsc2UsIHRhZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXNldElucHV0ID0gKCkgPT4gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldElucHV0VmFsdWUoJycpLCA1MCk7XHJcblxyXG4gICAgICAgIFByb21pc2UuYWxsKHJlcXVlc3RzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblBhc3RlLmVtaXQodGV4dCk7XHJcbiAgICAgICAgICAgIHJlc2V0SW5wdXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2gocmVzZXRJbnB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBzZXRBbmltYXRpb25NZXRhZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEFuaW1hdGlvbk1ldGFkYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uTWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnaW4nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHsgLi4udGhpcy5hbmltYXRpb25EdXJhdGlvbiB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iLCI8ZGl2XHJcbiAgICBbbmdDbGFzc109XCJ0aGVtZVwiXHJcbiAgICBjbGFzcz1cIm5nMi10YWctaW5wdXRcIlxyXG4gICAgKGNsaWNrKT1cImZvY3VzKHRydWUsIGZhbHNlKVwiXHJcbiAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXHJcbiAgICAoZHJvcCk9XCJkcmFnWm9uZSA/IG9uVGFnRHJvcHBlZCgkZXZlbnQsIHVuZGVmaW5lZCkgOiB1bmRlZmluZWRcIlxyXG4gICAgKGRyYWdlbnRlcik9XCJkcmFnWm9uZSA/IG9uRHJhZ092ZXIoJGV2ZW50KSA6IHVuZGVmaW5lZFwiXHJcbiAgICAoZHJhZ292ZXIpPVwiZHJhZ1pvbmUgPyBvbkRyYWdPdmVyKCRldmVudCkgOiB1bmRlZmluZWRcIlxyXG4gICAgKGRyYWdlbmQpPVwiZHJhZ1pvbmUgPyBkcmFnUHJvdmlkZXIub25EcmFnRW5kKCkgOiB1bmRlZmluZWRcIlxyXG4gICAgW2NsYXNzLm5nMi10YWctaW5wdXQtLWRyb3BwaW5nXT1cImlzRHJvcHBpbmcoKVwiXHJcbiAgICBbY2xhc3MubmcyLXRhZy1pbnB1dC0tZGlzYWJsZWRdPVwiZGlzYWJsZVwiXHJcbiAgICBbY2xhc3MubmcyLXRhZy1pbnB1dC0tbG9hZGluZ109XCJpc0xvYWRpbmdcIlxyXG4gICAgW2NsYXNzLm5nMi10YWctaW5wdXQtLWludmFsaWRdPVwiaGFzRXJyb3JzKClcIlxyXG4gICAgW2NsYXNzLm5nMi10YWctaW5wdXQtLWZvY3VzZWRdPVwiaXNJbnB1dEZvY3VzZWQoKVwiXHJcbj5cclxuXHJcbiAgICA8IS0tIFRBR1MgLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmcyLXRhZ3MtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPHRhZ1xyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeVwiXHJcbiAgICAgICAgICAgIChvblNlbGVjdCk9XCJzZWxlY3RJdGVtKGl0ZW0pXCJcclxuICAgICAgICAgICAgKG9uUmVtb3ZlKT1cIm9uUmVtb3ZlUmVxdWVzdGVkKGl0ZW0sIGkpXCJcclxuICAgICAgICAgICAgKG9uS2V5RG93bik9XCJoYW5kbGVLZXlkb3duKCRldmVudClcIlxyXG4gICAgICAgICAgICAob25UYWdFZGl0ZWQpPVwidXBkYXRlRWRpdGVkVGFnKCRldmVudClcIlxyXG4gICAgICAgICAgICAob25CbHVyKT1cIm9uVGFnQmx1cnJlZCgkZXZlbnQsIGkpXCJcclxuICAgICAgICAgICAgZHJhZ2dhYmxlPVwie3sgZWRpdGFibGUgfX1cIlxyXG4gICAgICAgICAgICAoZHJhZ3N0YXJ0KT1cImRyYWdab25lID8gb25EcmFnU3RhcnRlZCgkZXZlbnQsIGl0ZW0sIGkpIDogdW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgKGRyb3ApPVwiZHJhZ1pvbmUgPyBvblRhZ0Ryb3BwZWQoJGV2ZW50LCBpKSA6IHVuZGVmaW5lZFwiXHJcbiAgICAgICAgICAgIChkcmFnZW50ZXIpPVwiZHJhZ1pvbmUgPyBvbkRyYWdPdmVyKCRldmVudCkgOiB1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICAoZHJhZ292ZXIpPVwiZHJhZ1pvbmUgPyBvbkRyYWdPdmVyKCRldmVudCwgaSkgOiB1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICAoZHJhZ2xlYXZlKT1cImRyYWdab25lID8gZHJhZ1Byb3ZpZGVyLm9uRHJhZ0VuZCgpIDogdW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgW2NhbkFkZFRhZ109XCJpc1RhZ1ZhbGlkXCJcclxuICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiMFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlXCJcclxuICAgICAgICAgICAgW0BhbmltYXRpb25dPVwiYW5pbWF0aW9uTWV0YWRhdGFcIlxyXG4gICAgICAgICAgICBbaGFzUmlwcGxlXT1cInJpcHBsZVwiXHJcbiAgICAgICAgICAgIFtpbmRleF09XCJpXCJcclxuICAgICAgICAgICAgW3JlbW92YWJsZV09XCJyZW1vdmFibGVcIlxyXG4gICAgICAgICAgICBbZWRpdGFibGVdPVwiZWRpdGFibGVcIlxyXG4gICAgICAgICAgICBbZGlzcGxheUJ5XT1cImRpc3BsYXlCeVwiXHJcbiAgICAgICAgICAgIFtpZGVudGlmeUJ5XT1cImlkZW50aWZ5QnlcIlxyXG4gICAgICAgICAgICBbdGVtcGxhdGVdPVwiISFoYXNDdXN0b21UZW1wbGF0ZSgpID8gdGVtcGxhdGVzLmZpcnN0IDogdW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJkcmFnWm9uZVwiXHJcbiAgICAgICAgICAgIFttb2RlbF09XCJpdGVtXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC90YWc+XHJcblxyXG4gICAgICAgIDx0YWctaW5wdXQtZm9ybVxyXG4gICAgICAgICAgICAob25TdWJtaXQpPVwib25Gb3JtU3VibWl0KClcIlxyXG4gICAgICAgICAgICAob25CbHVyKT1cImJsdXIoKVwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJkcm9wZG93biA/IGRyb3Bkb3duLnNob3coKSA6IHVuZGVmaW5lZFwiXHJcbiAgICAgICAgICAgIChvbktleWRvd24pPVwiZmlyZUV2ZW50cygna2V5ZG93bicsICRldmVudClcIlxyXG4gICAgICAgICAgICAob25LZXl1cCk9XCJmaXJlRXZlbnRzKCdrZXl1cCcsICRldmVudClcIlxyXG4gICAgICAgICAgICBbaW5wdXRUZXh0XT1cImlucHV0VGV4dFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlXCJcclxuICAgICAgICAgICAgW3ZhbGlkYXRvcnNdPVwidmFsaWRhdG9yc1wiXHJcbiAgICAgICAgICAgIFthc3luY1ZhbGlkYXRvcnNdPVwiYXN5bmNWYWxpZGF0b3JzXCJcclxuICAgICAgICAgICAgW2hpZGRlbl09XCJtYXhJdGVtc1JlYWNoZWRcIlxyXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiaXRlbXMubGVuZ3RoID8gcGxhY2Vob2xkZXIgOiBzZWNvbmRhcnlQbGFjZWhvbGRlclwiXHJcbiAgICAgICAgICAgIFtpbnB1dENsYXNzXT1cImlucHV0Q2xhc3NcIlxyXG4gICAgICAgICAgICBbaW5wdXRJZF09XCJpbnB1dElkXCJcclxuICAgICAgICAgICAgW3RhYmluZGV4XT1cInRhYmluZGV4XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC90YWctaW5wdXQtZm9ybT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cInByb2dyZXNzLWJhclwiXHJcbiAgICAgICAgKm5nSWY9XCJpc1Byb2dyZXNzQmFyVmlzaWJsZSQgfCBhc3luY1wiXHJcbiAgICA+PC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPCEtLSBFUlJPUlMgLS0+XHJcbjxkaXZcclxuICAgICpuZ0lmPVwiaGFzRXJyb3JzKClcIlxyXG4gICAgW25nQ2xhc3NdPVwidGhlbWVcIlxyXG4gICAgY2xhc3M9XCJlcnJvci1tZXNzYWdlc1wiXHJcbj5cclxuICAgIDxwXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1wiXHJcbiAgICAgICAgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCJcclxuICAgID5cclxuICAgICAgICA8c3Bhbj57eyBlcnJvciB9fTwvc3Bhbj5cclxuICAgIDwvcD5cclxuPC9kaXY+XHJcbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuIl19