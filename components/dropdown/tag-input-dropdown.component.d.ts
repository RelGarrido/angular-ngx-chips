import { EventEmitter, Injector, QueryList, TemplateRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ng2Dropdown, Ng2MenuItem } from 'ng2-material-dropdown';
import { TagInputComponent } from '../tag-input/tag-input';
import { TagModel } from '../../core/tag-model';
import * as i0 from "@angular/core";
export declare class TagInputDropdown implements AfterViewInit {
    private readonly injector;
    /**
     * @name dropdown
     */
    dropdown: Ng2Dropdown;
    /**
     * @name menuTemplate
     * @desc reference to the template if provided by the user
     */
    templates: QueryList<TemplateRef<any>>;
    /**
     * @name offset
     */
    offset: string;
    /**
     * @name focusFirstElement
     */
    focusFirstElement: boolean;
    /**
     * - show autocomplete dropdown if the value of input is empty
     * @name showDropdownIfEmpty
     */
    showDropdownIfEmpty: boolean;
    /**
     * @description observable passed as input which populates the autocomplete items
     * @name autocompleteObservable
     */
    autocompleteObservable: (text: string) => Observable<any>;
    /**
     * - desc minimum text length in order to display the autocomplete dropdown
     * @name minimumTextLength
     */
    minimumTextLength: number;
    /**
     * - number of items to display in the autocomplete dropdown
     * @name limitItemsTo
     */
    limitItemsTo: number;
    /**
     * @name displayBy
     */
    displayBy: string;
    /**
     * @name identifyBy
     */
    identifyBy: string;
    /**
     * @description a function a developer can use to implement custom matching for the autocomplete
     * @name matchingFn
     */
    matchingFn: (value: string, target: TagModel) => boolean;
    /**
     * @name appendToBody
     */
    appendToBody: boolean;
    /**
     * @name keepOpen
     * @description option to leave dropdown open when adding a new item
     */
    keepOpen: boolean;
    /**
     * @name dynamicUpdate
     */
    dynamicUpdate: boolean;
    /**
     * @name zIndex
     */
    zIndex: number;
    /**
     * list of items that match the current value of the input (for autocomplete)
     * @name items
     */
    items: TagModel[];
    /**
     * @name tagInput
     */
    tagInput: TagInputComponent;
    /**
     * @name _autocompleteItems
     */
    private _autocompleteItems;
    /**
     * @name autocompleteItems
     * @param items
     */
    set autocompleteItems(items: TagModel[]);
    /**
     * @name autocompleteItems
     * @desc array of items that will populate the autocomplete
     */
    get autocompleteItems(): TagModel[];
    constructor(injector: Injector);
    /**
     * @name ngAfterviewInit
     */
    ngAfterViewInit(): void;
    /**
     * @name updatePosition
     */
    updatePosition(): void;
    /**
     * @name isVisible
     */
    get isVisible(): boolean;
    /**
     * @name onHide
     */
    onHide(): EventEmitter<Ng2Dropdown>;
    /**
     * @name onItemClicked
     */
    onItemClicked(): EventEmitter<Ng2MenuItem>;
    /**
     * @name selectedItem
     */
    get selectedItem(): Ng2MenuItem;
    /**
     * @name state
     */
    get state(): any;
    /**
     *
     * @name show
     */
    show: () => void;
    /**
     * @name hide
     */
    hide(): void;
    /**
     * @name scrollListener
     */
    scrollListener(): void;
    /**
     * @name onWindowBlur
     */
    onWindowBlur(): void;
    /**
     * @name getFormValue
     */
    private getFormValue;
    /**
     * @name calculatePosition
     */
    private calculatePosition;
    /**
     * @name requestAdding
     * @param item {Ng2MenuItem}
     */
    private requestAdding;
    /**
     * @name createTagModel
     * @param item
     */
    private createTagModel;
    /**
     *
     * @param value {string}
     */
    private getMatchingItems;
    /**
     * @name setItems
     */
    private setItems;
    /**
     * @name resetItems
     */
    private resetItems;
    /**
     * @name populateItems
     * @param data
     */
    private populateItems;
    /**
     * @name getItemsFromObservable
     * @param text
     */
    private getItemsFromObservable;
    /**
     * @name setLoadingState
     * @param state
     */
    private setLoadingState;
    static ɵfac: i0.ɵɵFactoryDeclaration<TagInputDropdown, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TagInputDropdown, "tag-input-dropdown", never, { "offset": { "alias": "offset"; "required": false; }; "focusFirstElement": { "alias": "focusFirstElement"; "required": false; }; "showDropdownIfEmpty": { "alias": "showDropdownIfEmpty"; "required": false; }; "autocompleteObservable": { "alias": "autocompleteObservable"; "required": false; }; "minimumTextLength": { "alias": "minimumTextLength"; "required": false; }; "limitItemsTo": { "alias": "limitItemsTo"; "required": false; }; "displayBy": { "alias": "displayBy"; "required": false; }; "identifyBy": { "alias": "identifyBy"; "required": false; }; "matchingFn": { "alias": "matchingFn"; "required": false; }; "appendToBody": { "alias": "appendToBody"; "required": false; }; "keepOpen": { "alias": "keepOpen"; "required": false; }; "dynamicUpdate": { "alias": "dynamicUpdate"; "required": false; }; "zIndex": { "alias": "zIndex"; "required": false; }; "autocompleteItems": { "alias": "autocompleteItems"; "required": false; }; }, {}, ["templates"], never, false, never>;
}
