import { EventEmitter, TemplateRef, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { TagModel } from '../../core/tag-model';
import { TagRipple } from '../tag/tag-ripple.component';
import * as i0 from "@angular/core";
export declare class TagComponent {
    element: ElementRef;
    renderer: Renderer2;
    private cdRef;
    /**
     * @name model {TagModel}
     */
    model: TagModel;
    /**
     * @name removable {boolean}
     */
    removable: boolean;
    /**
     * @name editable {boolean}
     */
    editable: boolean;
    /**
     * @name template {TemplateRef<any>}
     */
    template: TemplateRef<any>;
    /**
     * @name displayBy {string}
     */
    displayBy: string;
    /**
     * @name identifyBy {string}
     */
    identifyBy: string;
    /**
     * @name index {number}
     */
    index: number;
    /**
     * @name hasRipple
     */
    hasRipple: boolean;
    /**
     * @name disabled
     */
    disabled: boolean;
    /**
     * @name canAddTag
     */
    canAddTag: (tag: TagModel) => boolean;
    /**
     * @name onSelect
     */
    onSelect: EventEmitter<TagModel>;
    /**
     * @name onRemove
     */
    onRemove: EventEmitter<TagModel>;
    /**
     * @name onBlur
     */
    onBlur: EventEmitter<TagModel>;
    /**
     * @name onKeyDown
     */
    onKeyDown: EventEmitter<any>;
    /**
     * @name onTagEdited
     */
    onTagEdited: EventEmitter<TagModel>;
    /**
     * @name readonly {boolean}
     */
    get readonly(): boolean;
    /**
     * @name editing
     */
    editing: boolean;
    /**
     * @name moving
     */
    moving: boolean;
    /**
     * @name rippleState
     */
    rippleState: string;
    /**
     * @name ripple {TagRipple}
     */
    ripple: TagRipple;
    constructor(element: ElementRef, renderer: Renderer2, cdRef: ChangeDetectorRef);
    /**
     * @name select
     */
    select($event?: MouseEvent): void;
    /**
     * @name remove
     */
    remove($event: MouseEvent): void;
    /**
     * @name focus
     */
    focus(): void;
    move(): void;
    /**
     * @name keydown
     * @param event
     */
    keydown(event: KeyboardEvent): void;
    /**
     * @name blink
     */
    blink(): void;
    /**
     * @name toggleEditMode
     */
    toggleEditMode(): void;
    /**
     * @name onBlurred
     * @param event
     */
    onBlurred(event: any): void;
    /**
     * @name getDisplayValue
     * @param item
     */
    getDisplayValue(item: TagModel): string;
    /**
     * @desc returns whether the ripple is visible or not
     * only works in Chrome
     * @name isRippleVisible
     */
    get isRippleVisible(): boolean;
    /**
     * @name disableEditMode
     * @param $event
     */
    disableEditMode($event?: Event): void;
    /**
     * @name isDeleteIconVisible
     */
    isDeleteIconVisible(): boolean;
    /**
     * @name getContentEditableText
     */
    private getContentEditableText;
    /**
     * @name setContentEditableText
     * @param model
     */
    private setContentEditableText;
    /**
     * @name
     */
    private activateEditMode;
    /**
     * @name storeNewValue
     * @param input
     */
    private storeNewValue;
    /**
     * @name getContentEditable
     */
    private getContentEditable;
    static ɵfac: i0.ɵɵFactoryDeclaration<TagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TagComponent, "tag", never, { "model": { "alias": "model"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; "editable": { "alias": "editable"; "required": false; }; "template": { "alias": "template"; "required": false; }; "displayBy": { "alias": "displayBy"; "required": false; }; "identifyBy": { "alias": "identifyBy"; "required": false; }; "index": { "alias": "index"; "required": false; }; "hasRipple": { "alias": "hasRipple"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "canAddTag": { "alias": "canAddTag"; "required": false; }; }, { "onSelect": "onSelect"; "onRemove": "onRemove"; "onBlur": "onBlur"; "onKeyDown": "onKeyDown"; "onTagEdited": "onTagEdited"; }, never, never, false, never>;
}
