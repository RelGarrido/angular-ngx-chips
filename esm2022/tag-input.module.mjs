import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { HighlightPipe } from './core/pipes/highlight.pipe';
import { DragProvider } from './core/providers/drag-provider';
import { OptionsProvider } from './core/providers/options-provider';
import { TagInputComponent } from './components/tag-input/tag-input';
import { DeleteIconComponent } from './components/icon/icon';
import { TagInputForm } from './components/tag-input-form/tag-input-form.component';
import { TagComponent } from './components/tag/tag.component';
import { TagInputDropdown } from './components/dropdown/tag-input-dropdown.component';
import { TagRipple } from './components/tag/tag-ripple.component';
import * as i0 from "@angular/core";
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
export { TagInputModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvdGFnLWlucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFXLE1BQU0sbUNBQW1DLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0FBRWxFLE1BQU0sZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7QUFFOUMsTUE4QmEsY0FBYztJQUN2Qjs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQWdCO1FBQ3ZDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQzt1R0FQUSxjQUFjO3dHQUFkLGNBQWMsaUJBdEJuQixpQkFBaUI7WUFDakIsbUJBQW1CO1lBQ25CLFlBQVk7WUFDWixZQUFZO1lBQ1osYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixTQUFTLGFBWlQsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixXQUFXO1lBQ1gsaUJBQWlCLGFBWWpCLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLFlBQVk7WUFDWixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLFNBQVM7d0dBT0osY0FBYyxhQUxaO1lBQ1AsWUFBWTtZQUNaLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7U0FDeEQsWUExQkcsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixXQUFXO1lBQ1gsaUJBQWlCOztTQXlCWixjQUFjOzJGQUFkLGNBQWM7a0JBOUIxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCxpQkFBaUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRTt3QkFDVixpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixTQUFTO3FCQUNaO29CQUNELE9BQU8sRUFBRTt3QkFDTCxpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixTQUFTO3FCQUNaO29CQUNELFNBQVMsRUFBRTt3QkFDUCxZQUFZO3dCQUNaLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7cUJBQ3hEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUsIENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZzJEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25nMi1tYXRlcmlhbC1kcm9wZG93bic7XHJcbmltcG9ydCB7IEhpZ2hsaWdodFBpcGUgfSBmcm9tICcuL2NvcmUvcGlwZXMvaGlnaGxpZ2h0LnBpcGUnO1xyXG5pbXBvcnQgeyBEcmFnUHJvdmlkZXIgfSBmcm9tICcuL2NvcmUvcHJvdmlkZXJzL2RyYWctcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBPcHRpb25zUHJvdmlkZXIsIE9wdGlvbnMgfSBmcm9tICcuL2NvcmUvcHJvdmlkZXJzL29wdGlvbnMtcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUYWdJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90YWctaW5wdXQvdGFnLWlucHV0JztcclxuaW1wb3J0IHsgRGVsZXRlSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9pY29uL2ljb24nO1xyXG5pbXBvcnQgeyBUYWdJbnB1dEZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvdGFnLWlucHV0LWZvcm0vdGFnLWlucHV0LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RhZy90YWcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnSW5wdXREcm9wZG93biB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wZG93bi90YWctaW5wdXQtZHJvcGRvd24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFnUmlwcGxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhZy90YWctcmlwcGxlLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCBvcHRpb25zUHJvdmlkZXIgPSBuZXcgT3B0aW9uc1Byb3ZpZGVyKCk7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5nMkRyb3Bkb3duTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgVGFnSW5wdXRDb21wb25lbnQsXHJcbiAgICAgICAgRGVsZXRlSWNvbkNvbXBvbmVudCxcclxuICAgICAgICBUYWdJbnB1dEZvcm0sXHJcbiAgICAgICAgVGFnQ29tcG9uZW50LFxyXG4gICAgICAgIEhpZ2hsaWdodFBpcGUsXHJcbiAgICAgICAgVGFnSW5wdXREcm9wZG93bixcclxuICAgICAgICBUYWdSaXBwbGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgVGFnSW5wdXRDb21wb25lbnQsXHJcbiAgICAgICAgRGVsZXRlSWNvbkNvbXBvbmVudCxcclxuICAgICAgICBUYWdJbnB1dEZvcm0sXHJcbiAgICAgICAgVGFnQ29tcG9uZW50LFxyXG4gICAgICAgIEhpZ2hsaWdodFBpcGUsXHJcbiAgICAgICAgVGFnSW5wdXREcm9wZG93bixcclxuICAgICAgICBUYWdSaXBwbGVcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBEcmFnUHJvdmlkZXIsXHJcbiAgICAgICAgeyBwcm92aWRlOiBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSwgdXNlVmFsdWU6IGZhbHNlIH0sXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dE1vZHVsZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHdpdGhEZWZhdWx0c1xyXG4gICAgICogQHBhcmFtIG9wdGlvbnMge09wdGlvbnN9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgd2l0aERlZmF1bHRzKG9wdGlvbnM6IE9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBvcHRpb25zUHJvdmlkZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG4iXX0=