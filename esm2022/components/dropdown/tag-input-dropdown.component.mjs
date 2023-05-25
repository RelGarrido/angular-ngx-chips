import { Component, ContentChildren, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { filter, first, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Ng2Dropdown } from 'ng2-material-dropdown';
import { defaults } from '../../defaults';
import { TagInputComponent } from '../tag-input/tag-input';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng2-material-dropdown";
import * as i3 from "../../core/pipes/highlight.pipe";
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: TagInputDropdown, selector: "tag-input-dropdown", inputs: { offset: "offset", focusFirstElement: "focusFirstElement", showDropdownIfEmpty: "showDropdownIfEmpty", autocompleteObservable: "autocompleteObservable", minimumTextLength: "minimumTextLength", limitItemsTo: "limitItemsTo", displayBy: "displayBy", identifyBy: "identifyBy", matchingFn: "matchingFn", appendToBody: "appendToBody", keepOpen: "keepOpen", dynamicUpdate: "dynamicUpdate", zIndex: "zIndex", autocompleteItems: "autocompleteItems" }, host: { listeners: { "window:scroll": "scrollListener()", "window:blur": "onWindowBlur()" } }, queries: [{ propertyName: "templates", predicate: TemplateRef }], viewQueries: [{ propertyName: "dropdown", first: true, predicate: Ng2Dropdown, descendants: true }], ngImport: i0, template: "<ng2-dropdown [dynamicUpdate]=\"dynamicUpdate\">\r\n    <ng2-dropdown-menu [focusFirstElement]=\"focusFirstElement\"\r\n                       [zIndex]=\"zIndex\"\r\n                       [appendToBody]=\"appendToBody\"\r\n                       [offset]=\"offset\">\r\n        <ng2-menu-item *ngFor=\"let item of items; let index = index; let last = last\"\r\n                       [value]=\"item\"\r\n                       [ngSwitch]=\"!!templates.length\">\r\n\r\n            <span *ngSwitchCase=\"false\"\r\n                  [innerHTML]=\"item[displayBy] | highlight : tagInput.inputForm.value.value\">\r\n            </span>\r\n\r\n            <ng-template *ngSwitchDefault\r\n                      [ngTemplateOutlet]=\"templates.first\"\r\n                      [ngTemplateOutletContext]=\"{ item: item, index: index, last: last }\">\r\n            </ng-template>\r\n        </ng2-menu-item>\r\n    </ng2-dropdown-menu>\r\n</ng2-dropdown>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i2.Ng2MenuItem, selector: "ng2-menu-item", inputs: ["preventClose", "value"] }, { kind: "component", type: i2.Ng2DropdownMenu, selector: "ng2-dropdown-menu", inputs: ["width", "focusFirstElement", "offset", "appendToBody", "zIndex"] }, { kind: "component", type: i2.Ng2Dropdown, selector: "ng2-dropdown", inputs: ["dynamicUpdate"], outputs: ["onItemClicked", "onItemSelected", "onShow", "onHide"] }, { kind: "pipe", type: i3.HighlightPipe, name: "highlight" }] });
}
export { TagInputDropdown };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50cy9kcm9wZG93bi90YWctaW5wdXQtZHJvcGRvd24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnRzL2Ryb3Bkb3duL3RhZy1pbnB1dC1kcm9wZG93bi50ZW1wbGF0ZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFFWixLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRixPQUFPLEVBQUUsV0FBVyxFQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztBQUczRCxNQUlhLGdCQUFnQjtJQWlJRTtJQWhJN0I7O09BRUc7SUFDNEIsUUFBUSxDQUFjO0lBRXJEOzs7T0FHRztJQUNrQyxTQUFTLENBQThCO0lBRTVFOztPQUVHO0lBQ2EsTUFBTSxHQUFXLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBRTFEOztPQUVHO0lBQ2EsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUV4RTs7O09BR0c7SUFDYSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0lBRTVFOzs7T0FHRztJQUNhLHNCQUFzQixDQUFvQztJQUUxRTs7O09BR0c7SUFDYSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGlC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VSxZQUFZO3NCQUEzQixLQUFLO2dCQU1VLFFBQVE7c0JBQXZCLEtBQUs7Z0JBS1UsYUFBYTtzQkFBNUIsS0FBSztnQkFLVSxNQUFNO3NCQUFyQixLQUFLO2dCQThCYyxpQkFBaUI7c0JBQXBDLEtBQUs7Z0JBa0pDLGNBQWM7c0JBRHBCLFlBQVk7dUJBQUMsZUFBZTtnQkFhdEIsWUFBWTtzQkFEbEIsWUFBWTt1QkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0b3IsXHJcbiAgSW5wdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBBZnRlclZpZXdJbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vLyByeFxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBOZzJEcm9wZG93biwgTmcyTWVudUl0ZW0gfSBmcm9tICduZzItbWF0ZXJpYWwtZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uLy4uL2RlZmF1bHRzJztcclxuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi90YWctaW5wdXQvdGFnLWlucHV0JztcclxuaW1wb3J0IHtUYWdNb2RlbH0gZnJvbSAnLi4vLi4vY29yZS90YWctbW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0YWctaW5wdXQtZHJvcGRvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90YWctaW5wdXQtZHJvcGRvd24udGVtcGxhdGUuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ0lucHV0RHJvcGRvd24gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICAvKipcclxuICAgKiBAbmFtZSBkcm9wZG93blxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoTmcyRHJvcGRvd24pIHB1YmxpYyBkcm9wZG93bjogTmcyRHJvcGRvd247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG1lbnVUZW1wbGF0ZVxyXG4gICAqIEBkZXNjIHJlZmVyZW5jZSB0byB0aGUgdGVtcGxhdGUgaWYgcHJvdmlkZWQgYnkgdGhlIHVzZXJcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKFRlbXBsYXRlUmVmKSBwdWJsaWMgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG9mZnNldFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBvZmZzZXQ6IHN0cmluZyA9IGRlZmF1bHRzLmRyb3Bkb3duLm9mZnNldDtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZm9jdXNGaXJzdEVsZW1lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZm9jdXNGaXJzdEVsZW1lbnQgPSBkZWZhdWx0cy5kcm9wZG93bi5mb2N1c0ZpcnN0RWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBzaG93IGF1dG9jb21wbGV0ZSBkcm9wZG93biBpZiB0aGUgdmFsdWUgb2YgaW5wdXQgaXMgZW1wdHlcclxuICAgKiBAbmFtZSBzaG93RHJvcGRvd25JZkVtcHR5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIHNob3dEcm9wZG93bklmRW1wdHkgPSBkZWZhdWx0cy5kcm9wZG93bi5zaG93RHJvcGRvd25JZkVtcHR5O1xyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gb2JzZXJ2YWJsZSBwYXNzZWQgYXMgaW5wdXQgd2hpY2ggcG9wdWxhdGVzIHRoZSBhdXRvY29tcGxldGUgaXRlbXNcclxuICAgKiBAbmFtZSBhdXRvY29tcGxldGVPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGF1dG9jb21wbGV0ZU9ic2VydmFibGU6ICh0ZXh0OiBzdHJpbmcpID0+IE9ic2VydmFibGU8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBkZXNjIG1pbmltdW0gdGV4dCBsZW5ndGggaW4gb3JkZXIgdG8gZGlzcGxheSB0aGUgYXV0b2NvbXBsZXRlIGRyb3Bkb3duXHJcbiAgICogQG5hbWUgbWluaW11bVRleHRMZW5ndGhcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgbWluaW11bVRleHRMZW5ndGggPSBkZWZhdWx0cy5kcm9wZG93bi5taW5pbXVtVGV4dExlbmd0aDtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBudW1iZXIgb2YgaXRlbXMgdG8gZGlzcGxheSBpbiB0aGUgYXV0b2NvbXBsZXRlIGRyb3Bkb3duXHJcbiAgICogQG5hbWUgbGltaXRJdGVtc1RvXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGxpbWl0SXRlbXNUbzogbnVtYmVyID0gZGVmYXVsdHMuZHJvcGRvd24ubGltaXRJdGVtc1RvO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBkaXNwbGF5QnlcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZGlzcGxheUJ5ID0gZGVmYXVsdHMuZHJvcGRvd24uZGlzcGxheUJ5O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBpZGVudGlmeUJ5XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGlkZW50aWZ5QnkgPSBkZWZhdWx0cy5kcm9wZG93bi5pZGVudGlmeUJ5O1xyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gYSBmdW5jdGlvbiBhIGRldmVsb3BlciBjYW4gdXNlIHRvIGltcGxlbWVudCBjdXN0b20gbWF0Y2hpbmcgZm9yIHRoZSBhdXRvY29tcGxldGVcclxuICAgKiBAbmFtZSBtYXRjaGluZ0ZuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIG1hdGNoaW5nRm46ICh2YWx1ZTogc3RyaW5nLCB0YXJnZXQ6IFRhZ01vZGVsKSA9PiBib29sZWFuID1cclxuICAgIGRlZmF1bHRzLmRyb3Bkb3duLm1hdGNoaW5nRm47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGFwcGVuZFRvQm9keVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhcHBlbmRUb0JvZHkgPSBkZWZhdWx0cy5kcm9wZG93bi5hcHBlbmRUb0JvZHk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGtlZXBPcGVuXHJcbiAgICogQGRlc2NyaXB0aW9uIG9wdGlvbiB0byBsZWF2ZSBkcm9wZG93biBvcGVuIHdoZW4gYWRkaW5nIGEgbmV3IGl0ZW1cclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMga2VlcE9wZW4gPSBkZWZhdWx0cy5kcm9wZG93bi5rZWVwT3BlbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZHluYW1pY1VwZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkeW5hbWljVXBkYXRlID0gZGVmYXVsdHMuZHJvcGRvd24uZHluYW1pY1VwZGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgekluZGV4XHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIHpJbmRleCA9IGRlZmF1bHRzLmRyb3Bkb3duLnpJbmRleDtcclxuXHJcbiAgLyoqXHJcbiAgICogbGlzdCBvZiBpdGVtcyB0aGF0IG1hdGNoIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBpbnB1dCAoZm9yIGF1dG9jb21wbGV0ZSlcclxuICAgKiBAbmFtZSBpdGVtc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpdGVtczogVGFnTW9kZWxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSB0YWdJbnB1dFxyXG4gICAqL1xyXG4gIHB1YmxpYyB0YWdJbnB1dDogVGFnSW5wdXRDb21wb25lbnQgPSB0aGlzLmluamVjdG9yLmdldChUYWdJbnB1dENvbXBvbmVudCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIF9hdXRvY29tcGxldGVJdGVtc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2F1dG9jb21wbGV0ZUl0ZW1zOiBUYWdNb2RlbFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGF1dG9jb21wbGV0ZUl0ZW1zXHJcbiAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICovXHJcbiAgcHVibGljIHNldCBhdXRvY29tcGxldGVJdGVtcyhpdGVtczogVGFnTW9kZWxbXSkge1xyXG4gICAgdGhpcy5fYXV0b2NvbXBsZXRlSXRlbXMgPSBpdGVtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGF1dG9jb21wbGV0ZUl0ZW1zXHJcbiAgICogQGRlc2MgYXJyYXkgb2YgaXRlbXMgdGhhdCB3aWxsIHBvcHVsYXRlIHRoZSBhdXRvY29tcGxldGVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZ2V0IGF1dG9jb21wbGV0ZUl0ZW1zKCk6IFRhZ01vZGVsW10ge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLl9hdXRvY29tcGxldGVJdGVtcztcclxuXHJcbiAgICBpZiAoIWl0ZW1zKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtOiBUYWdNb2RlbCkgPT4ge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIFt0aGlzLmRpc3BsYXlCeV06IGl0ZW0sXHJcbiAgICAgICAgICAgIFt0aGlzLmlkZW50aWZ5QnldOiBpdGVtXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBpdGVtO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3Rvcikge31cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgbmdBZnRlcnZpZXdJbml0XHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkl0ZW1DbGlja2VkKCkuc3Vic2NyaWJlKChpdGVtOiBOZzJNZW51SXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLnJlcXVlc3RBZGRpbmcoaXRlbSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyByZXNldCBpdGVtc01hdGNoaW5nIGFycmF5IHdoZW4gdGhlIGRyb3Bkb3duIGlzIGhpZGRlblxyXG4gICAgdGhpcy5vbkhpZGUoKS5zdWJzY3JpYmUodGhpcy5yZXNldEl0ZW1zKTtcclxuXHJcbiAgICBjb25zdCBERUJPVU5DRV9USU1FID0gMjAwO1xyXG4gICAgY29uc3QgS0VFUF9PUEVOID0gdGhpcy5rZWVwT3BlbjtcclxuXHJcbiAgICB0aGlzLnRhZ0lucHV0Lm9uVGV4dENoYW5nZVxyXG4gICAgICAuYXNPYnNlcnZhYmxlKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgICAgICBkZWJvdW5jZVRpbWUoREVCT1VOQ0VfVElNRSksXHJcbiAgICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAoS0VFUF9PUEVOID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5zaG93KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHVwZGF0ZVBvc2l0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnRhZ0lucHV0LmlucHV0Rm9ybS5nZXRFbGVtZW50UG9zaXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmRyb3Bkb3duLm1lbnUudXBkYXRlUG9zaXRpb24ocG9zaXRpb24sIHRoaXMuZHluYW1pY1VwZGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBpc1Zpc2libGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm1lbnUuZHJvcGRvd25TdGF0ZS5tZW51U3RhdGUuaXNWaXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb25IaWRlXHJcbiAgICovXHJcbiAgcHVibGljIG9uSGlkZSgpOiBFdmVudEVtaXR0ZXI8TmcyRHJvcGRvd24+IHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm9uSGlkZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIG9uSXRlbUNsaWNrZWRcclxuICAgKi9cclxuICBwdWJsaWMgb25JdGVtQ2xpY2tlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm9uSXRlbUNsaWNrZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzZWxlY3RlZEl0ZW1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkSXRlbSgpOiBOZzJNZW51SXRlbSB7XHJcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi5tZW51LmRyb3Bkb3duU3RhdGUuZHJvcGRvd25TdGF0ZS5zZWxlY3RlZEl0ZW07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzdGF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgc3RhdGUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLm1lbnUuZHJvcGRvd25TdGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQG5hbWUgc2hvd1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzaG93ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbWF4SXRlbXNSZWFjaGVkID1cclxuICAgICAgdGhpcy50YWdJbnB1dC5pdGVtcy5sZW5ndGggPT09IHRoaXMudGFnSW5wdXQubWF4SXRlbXM7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0Rm9ybVZhbHVlKCk7XHJcbiAgICBjb25zdCBoYXNNaW5pbXVtVGV4dCA9IHZhbHVlLnRyaW0oKS5sZW5ndGggPj0gdGhpcy5taW5pbXVtVGV4dExlbmd0aDtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldE1hdGNoaW5nSXRlbXModmFsdWUpO1xyXG4gICAgY29uc3QgaGFzSXRlbXMgPSBpdGVtcy5sZW5ndGggPiAwO1xyXG4gICAgY29uc3QgaXNIaWRkZW4gPSB0aGlzLmlzVmlzaWJsZSA9PT0gZmFsc2U7XHJcbiAgICBjb25zdCBzaG93RHJvcGRvd25JZkVtcHR5ID0gdGhpcy5zaG93RHJvcGRvd25JZkVtcHR5ICYmIGhhc0l0ZW1zICYmICF2YWx1ZTtcclxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSB0aGlzLnRhZ0lucHV0LmRpc2FibGU7XHJcblxyXG4gICAgY29uc3Qgc2hvdWxkU2hvdyA9XHJcbiAgICAgIGlzSGlkZGVuICYmICgoaGFzSXRlbXMgJiYgaGFzTWluaW11bVRleHQpIHx8IHNob3dEcm9wZG93bklmRW1wdHkpO1xyXG4gICAgY29uc3Qgc2hvdWxkSGlkZSA9IHRoaXMuaXNWaXNpYmxlICYmICFoYXNJdGVtcztcclxuXHJcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVPYnNlcnZhYmxlICYmIGhhc01pbmltdW1UZXh0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1zRnJvbU9ic2VydmFibGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgKCF0aGlzLnNob3dEcm9wZG93bklmRW1wdHkgJiYgIXZhbHVlKSB8fFxyXG4gICAgICBtYXhJdGVtc1JlYWNoZWQgfHxcclxuICAgICAgaXNEaXNhYmxlZFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEl0ZW1zKGl0ZW1zKTtcclxuXHJcbiAgICBpZiAoc2hvdWxkU2hvdykge1xyXG4gICAgICB0aGlzLmRyb3Bkb3duLnNob3cocG9zaXRpb24pO1xyXG4gICAgfSBlbHNlIGlmIChzaG91bGRIaWRlKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGhpZGVcclxuICAgKi9cclxuICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRJdGVtcygpO1xyXG4gICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBzY3JvbGxMaXN0ZW5lclxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnKVxyXG4gIHB1YmxpYyBzY3JvbGxMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuZHluYW1pY1VwZGF0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgb25XaW5kb3dCbHVyXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmJsdXInKVxyXG4gIHB1YmxpYyBvbldpbmRvd0JsdXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGdldEZvcm1WYWx1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Rm9ybVZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLnRhZ0lucHV0LmZvcm1WYWx1ZTtcclxuICAgIHJldHVybiBmb3JtVmFsdWUgPyBmb3JtVmFsdWUudG9TdHJpbmcoKS50cmltKCkgOiAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIGNhbGN1bGF0ZVBvc2l0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYWxjdWxhdGVQb3NpdGlvbigpOiBDbGllbnRSZWN0IHtcclxuICAgIHJldHVybiB0aGlzLnRhZ0lucHV0LmlucHV0Rm9ybS5nZXRFbGVtZW50UG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHJlcXVlc3RBZGRpbmdcclxuICAgKiBAcGFyYW0gaXRlbSB7TmcyTWVudUl0ZW19XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXF1ZXN0QWRkaW5nID0gYXN5bmMgKGl0ZW06IE5nMk1lbnVJdGVtKSA9PiB7XHJcbiAgICBjb25zdCB0YWcgPSB0aGlzLmNyZWF0ZVRhZ01vZGVsKGl0ZW0pO1xyXG4gICAgYXdhaXQgdGhpcy50YWdJbnB1dC5vbkFkZGluZ1JlcXVlc3RlZCh0cnVlLCB0YWcpLmNhdGNoKCgpID0+IHt9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSBjcmVhdGVUYWdNb2RlbFxyXG4gICAqIEBwYXJhbSBpdGVtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVUYWdNb2RlbChpdGVtOiBOZzJNZW51SXRlbSk6IFRhZ01vZGVsIHtcclxuICAgIGNvbnN0IGRpc3BsYXkgPVxyXG4gICAgICB0eXBlb2YgaXRlbS52YWx1ZSA9PT0gJ3N0cmluZycgPyBpdGVtLnZhbHVlIDogaXRlbS52YWx1ZVt0aGlzLmRpc3BsYXlCeV07XHJcbiAgICBjb25zdCB2YWx1ZSA9XHJcbiAgICAgIHR5cGVvZiBpdGVtLnZhbHVlID09PSAnc3RyaW5nJyA/IGl0ZW0udmFsdWUgOiBpdGVtLnZhbHVlW3RoaXMuaWRlbnRpZnlCeV07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uaXRlbS52YWx1ZSxcclxuICAgICAgW3RoaXMudGFnSW5wdXQuZGlzcGxheUJ5XTogZGlzcGxheSxcclxuICAgICAgW3RoaXMudGFnSW5wdXQuaWRlbnRpZnlCeV06IHZhbHVlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cclxuICAgKi9cclxuICBwcml2YXRlIGdldE1hdGNoaW5nSXRlbXModmFsdWU6IHN0cmluZyk6IFRhZ01vZGVsW10ge1xyXG4gICAgaWYgKCF2YWx1ZSAmJiAhdGhpcy5zaG93RHJvcGRvd25JZkVtcHR5KSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkdXBlc0FsbG93ZWQgPSB0aGlzLnRhZ0lucHV0LmFsbG93RHVwZXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlSXRlbXMuZmlsdGVyKChpdGVtOiBUYWdNb2RlbCkgPT4ge1xyXG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IGR1cGVzQWxsb3dlZFxyXG4gICAgICAgID8gZmFsc2VcclxuICAgICAgICA6IHRoaXMudGFnSW5wdXQudGFncy5zb21lKHRhZyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkZW50aWZ5QnkgPSB0aGlzLnRhZ0lucHV0LmlkZW50aWZ5Qnk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID1cclxuICAgICAgICAgICAgICB0eXBlb2YgdGFnLm1vZGVsID09PSAnc3RyaW5nJyA/IHRhZy5tb2RlbCA6IHRhZy5tb2RlbFtpZGVudGlmeUJ5XTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbCA9PT0gaXRlbVt0aGlzLmlkZW50aWZ5QnldO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5tYXRjaGluZ0ZuKHZhbHVlLCBpdGVtKSAmJiBoYXNWYWx1ZSA9PT0gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHNldEl0ZW1zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRJdGVtcyhpdGVtczogVGFnTW9kZWxbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5pdGVtcyA9IGl0ZW1zLnNsaWNlKDAsIHRoaXMubGltaXRJdGVtc1RvIHx8IGl0ZW1zLmxlbmd0aCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbmFtZSByZXNldEl0ZW1zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNldEl0ZW1zID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHBvcHVsYXRlSXRlbXNcclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcG9wdWxhdGVJdGVtcyhkYXRhOiBhbnkpOiBUYWdJbnB1dERyb3Bkb3duIHtcclxuICAgIHRoaXMuYXV0b2NvbXBsZXRlSXRlbXMgPSBkYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJ1xyXG4gICAgICAgID8ge1xyXG4gICAgICAgICAgICBbdGhpcy5kaXNwbGF5QnldOiBpdGVtLFxyXG4gICAgICAgICAgICBbdGhpcy5pZGVudGlmeUJ5XTogaXRlbVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogaXRlbTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG5hbWUgZ2V0SXRlbXNGcm9tT2JzZXJ2YWJsZVxyXG4gICAqIEBwYXJhbSB0ZXh0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRJdGVtc0Zyb21PYnNlcnZhYmxlID0gKHRleHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5zZXRMb2FkaW5nU3RhdGUodHJ1ZSk7XHJcblxyXG4gICAgY29uc3Qgc3Vic2NyaWJlRm4gPSAoZGF0YTogYW55W10pID0+IHtcclxuICAgICAgLy8gaGlkZSBsb2FkaW5nIGFuaW1hdGlvblxyXG4gICAgICB0aGlzLnNldExvYWRpbmdTdGF0ZShmYWxzZSlcclxuICAgICAgICAvLyBhZGQgaXRlbXNcclxuICAgICAgICAucG9wdWxhdGVJdGVtcyhkYXRhKTtcclxuXHJcbiAgICAgIHRoaXMuc2V0SXRlbXModGhpcy5nZXRNYXRjaGluZ0l0ZW1zKHRleHQpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uc2hvdyh0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYXV0b2NvbXBsZXRlT2JzZXJ2YWJsZSh0ZXh0KVxyXG4gICAgICAucGlwZShmaXJzdCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKHN1YnNjcmliZUZuLCAoKSA9PiB0aGlzLnNldExvYWRpbmdTdGF0ZShmYWxzZSkpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHNldExvYWRpbmdTdGF0ZVxyXG4gICAqIEBwYXJhbSBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TG9hZGluZ1N0YXRlKHN0YXRlOiBib29sZWFuKTogVGFnSW5wdXREcm9wZG93biB7XHJcbiAgICB0aGlzLnRhZ0lucHV0LmlzTG9hZGluZyA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG4iLCI8bmcyLWRyb3Bkb3duIFtkeW5hbWljVXBkYXRlXT1cImR5bmFtaWNVcGRhdGVcIj5cclxuICAgIDxuZzItZHJvcGRvd24tbWVudSBbZm9jdXNGaXJzdEVsZW1lbnRdPVwiZm9jdXNGaXJzdEVsZW1lbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIFt6SW5kZXhdPVwiekluZGV4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICBbYXBwZW5kVG9Cb2R5XT1cImFwcGVuZFRvQm9keVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgW29mZnNldF09XCJvZmZzZXRcIj5cclxuICAgICAgICA8bmcyLW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGluZGV4ID0gaW5kZXg7IGxldCBsYXN0ID0gbGFzdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cIml0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1N3aXRjaF09XCIhIXRlbXBsYXRlcy5sZW5ndGhcIj5cclxuXHJcbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiaXRlbVtkaXNwbGF5QnldIHwgaGlnaGxpZ2h0IDogdGFnSW5wdXQuaW5wdXRGb3JtLnZhbHVlLnZhbHVlXCI+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuXHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdTd2l0Y2hEZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXMuZmlyc3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgaXRlbTogaXRlbSwgaW5kZXg6IGluZGV4LCBsYXN0OiBsYXN0IH1cIj5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L25nMi1tZW51LWl0ZW0+XHJcbiAgICA8L25nMi1kcm9wZG93bi1tZW51PlxyXG48L25nMi1kcm9wZG93bj5cclxuIl19