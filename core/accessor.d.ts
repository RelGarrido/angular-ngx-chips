import { ControlValueAccessor } from '@angular/forms';
import { TagInputDropdown } from '../components/dropdown/tag-input-dropdown.component';
import { TagModel } from './tag-model';
import * as i0 from "@angular/core";
export declare function isObject(obj: any): boolean;
export declare class TagInputAccessor implements ControlValueAccessor {
    private _items;
    private _onTouchedCallback;
    private _onChangeCallback;
    dropdown: TagInputDropdown;
    /**
     * @name displayBy
     */
    displayBy: string;
    /**
     * @name identifyBy
     */
    identifyBy: string;
    get items(): TagModel[];
    set items(items: TagModel[]);
    onTouched(): void;
    writeValue(items: any[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    /**
     * @name getItemValue
     * @param item
     * @param fromDropdown
     */
    getItemValue(item: TagModel, fromDropdown?: boolean): string;
    /**
     * @name getItemDisplay
     * @param item
     * @param fromDropdown
     */
    getItemDisplay(item: TagModel, fromDropdown?: boolean): string;
    /**
     * @name getItemsWithout
     * @param index
     */
    protected getItemsWithout(index: number): TagModel[];
    static ɵfac: i0.ɵɵFactoryDeclaration<TagInputAccessor, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TagInputAccessor, never, never, { "displayBy": { "alias": "displayBy"; "required": false; }; "identifyBy": { "alias": "identifyBy"; "required": false; }; }, {}, never, never, false, never>;
}
