import { Input, Directive } from '@angular/core';
import { OptionsProvider } from './providers/options-provider';
import * as i0 from "@angular/core";
export function isObject(obj) {
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
export { TagInputAccessor };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: TagInputAccessor, decorators: [{
            type: Directive
        }], propDecorators: { displayBy: [{
                type: Input
            }], identifyBy: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9tb2R1bGVzL2NvcmUvYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUkvRCxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQVE7SUFDN0IsT0FBTyxHQUFHLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxNQUNhLGdCQUFnQjtJQUNqQixNQUFNLEdBQWUsRUFBRSxDQUFDO0lBQ3hCLGtCQUFrQixDQUFhO0lBQy9CLGlCQUFpQixDQUE4QjtJQUVoRCxRQUFRLENBQW1CO0lBRWxDOztPQUVHO0lBQ2EsU0FBUyxHQUFXLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztJQUVoRjs7T0FFRztJQUNhLFVBQVUsR0FBVyxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFFbEYsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxTQUFTO1FBQ1osSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxLQUFZO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsRUFBTztRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxFQUFPO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxZQUFZLENBQUMsSUFBYyxFQUFFLFlBQVksR0FBRyxLQUFLO1FBQ3BELE1BQU0sUUFBUSxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1RixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxjQUFjLENBQUMsSUFBYyxFQUFFLFlBQVksR0FBRyxLQUFLO1FBQ3RELE1BQU0sUUFBUSxHQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxRixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGVBQWUsQ0FBQyxLQUFhO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQzt1R0FwRVEsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7O1NBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixTQUFTOzhCQVdVLFNBQVM7c0JBQXhCLEtBQUs7Z0JBS1UsVUFBVTtzQkFBekIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9wdGlvbnNQcm92aWRlciB9IGZyb20gJy4vcHJvdmlkZXJzL29wdGlvbnMtcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUYWdJbnB1dERyb3Bkb3duIH0gZnJvbSAnLi4vY29tcG9uZW50cy9kcm9wZG93bi90YWctaW5wdXQtZHJvcGRvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnTW9kZWwgfSBmcm9tICcuL3RhZy1tb2RlbCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xyXG59XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGNsYXNzIFRhZ0lucHV0QWNjZXNzb3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICBwcml2YXRlIF9pdGVtczogVGFnTW9kZWxbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoaXRlbXM6IFRhZ01vZGVsW10pID0+IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGRyb3Bkb3duOiBUYWdJbnB1dERyb3Bkb3duO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZGlzcGxheUJ5XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNwbGF5Qnk6IHN0cmluZyA9IE9wdGlvbnNQcm92aWRlci5kZWZhdWx0cy50YWdJbnB1dC5kaXNwbGF5Qnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBpZGVudGlmeUJ5XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHB1YmxpYyBpZGVudGlmeUJ5OiBzdHJpbmcgPSBPcHRpb25zUHJvdmlkZXIuZGVmYXVsdHMudGFnSW5wdXQuaWRlbnRpZnlCeTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGl0ZW1zKCk6IFRhZ01vZGVsW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGl0ZW1zKGl0ZW1zOiBUYWdNb2RlbFtdKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX2l0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Ub3VjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyaXRlVmFsdWUoaXRlbXM6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcyB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldEl0ZW1WYWx1ZVxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqIEBwYXJhbSBmcm9tRHJvcGRvd25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEl0ZW1WYWx1ZShpdGVtOiBUYWdNb2RlbCwgZnJvbURyb3Bkb3duID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gZnJvbURyb3Bkb3duICYmIHRoaXMuZHJvcGRvd24gPyB0aGlzLmRyb3Bkb3duLmlkZW50aWZ5QnkgOiB0aGlzLmlkZW50aWZ5Qnk7XHJcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KGl0ZW0pID8gaXRlbVtwcm9wZXJ0eV0gOiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgZ2V0SXRlbURpc3BsYXlcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKiBAcGFyYW0gZnJvbURyb3Bkb3duXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtRGlzcGxheShpdGVtOiBUYWdNb2RlbCwgZnJvbURyb3Bkb3duID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gZnJvbURyb3Bkb3duICYmIHRoaXMuZHJvcGRvd24gPyB0aGlzLmRyb3Bkb3duLmRpc3BsYXlCeSA6IHRoaXMuZGlzcGxheUJ5O1xyXG4gICAgICAgIHJldHVybiBpc09iamVjdChpdGVtKSA/IGl0ZW1bcHJvcGVydHldIDogaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldEl0ZW1zV2l0aG91dFxyXG4gICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRJdGVtc1dpdGhvdXQoaW5kZXg6IG51bWJlcik6IFRhZ01vZGVsW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSwgcG9zaXRpb24pID0+IHBvc2l0aW9uICE9PSBpbmRleCk7XHJcbiAgICB9XHJcbn1cclxuIl19