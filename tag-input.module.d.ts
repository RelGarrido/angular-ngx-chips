import { Options } from './core/providers/options-provider';
import * as i0 from "@angular/core";
import * as i1 from "./components/tag-input/tag-input";
import * as i2 from "./components/icon/icon";
import * as i3 from "./components/tag-input-form/tag-input-form.component";
import * as i4 from "./components/tag/tag.component";
import * as i5 from "./core/pipes/highlight.pipe";
import * as i6 from "./components/dropdown/tag-input-dropdown.component";
import * as i7 from "./components/tag/tag-ripple.component";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
import * as i10 from "ng2-material-dropdown";
export declare class TagInputModule {
    /**
     * @name withDefaults
     * @param options {Options}
     */
    static withDefaults(options: Options): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TagInputModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TagInputModule, [typeof i1.TagInputComponent, typeof i2.DeleteIconComponent, typeof i3.TagInputForm, typeof i4.TagComponent, typeof i5.HighlightPipe, typeof i6.TagInputDropdown, typeof i7.TagRipple], [typeof i8.CommonModule, typeof i9.ReactiveFormsModule, typeof i9.FormsModule, typeof i10.Ng2DropdownModule], [typeof i1.TagInputComponent, typeof i2.DeleteIconComponent, typeof i3.TagInputForm, typeof i4.TagComponent, typeof i5.HighlightPipe, typeof i6.TagInputDropdown, typeof i7.TagRipple]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TagInputModule>;
}
