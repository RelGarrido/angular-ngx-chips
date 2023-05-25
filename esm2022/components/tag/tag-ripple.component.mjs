import { Component, Input } from '@angular/core';
import { animate, trigger, style, transition, keyframes, state } from '@angular/animations';
import * as i0 from "@angular/core";
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
export { TagRipple };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLXJpcHBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudHMvdGFnL3RhZy1yaXBwbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFDSCxPQUFPLEVBQ1AsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDUixNQUFNLHFCQUFxQixDQUFDOztBQUU3QixNQW9DYSxTQUFTO0lBQ0YsS0FBSyxHQUFHLE1BQU0sQ0FBQzt1R0FEdEIsU0FBUzsyRkFBVCxTQUFTLDhFQWhCUjs7S0FFVCx3T0FDVztZQUNSLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ1gsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUM1QyxVQUFVLENBQUMsaUJBQWlCLEVBQUU7b0JBQzFCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO3dCQUNuQixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDLENBQUM7d0JBQ2xFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7d0JBQzlDLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQztxQkFDeEUsQ0FBQyxDQUFDO2lCQUNOLENBQUM7YUFDTCxDQUFDO1NBQ0w7O1NBRVEsU0FBUzsyRkFBVCxTQUFTO2tCQXBDckIsU0FBUzsrQkFDSSxZQUFZLFlBbUJaOztLQUVULGNBQ1c7d0JBQ1IsT0FBTyxDQUFDLEtBQUssRUFBRTs0QkFDWCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7NEJBQzVDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtnQ0FDMUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7b0NBQ25CLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQztvQ0FDbEUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztvQ0FDOUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDO2lDQUN4RSxDQUFDLENBQUM7NkJBQ04sQ0FBQzt5QkFDTCxDQUFDO3FCQUNMOzhCQUdlLEtBQUs7c0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5pbXBvcnQge1xyXG4gICAgYW5pbWF0ZSxcclxuICAgIHRyaWdnZXIsXHJcbiAgICBzdHlsZSxcclxuICAgIHRyYW5zaXRpb24sXHJcbiAgICBrZXlmcmFtZXMsXHJcbiAgICBzdGF0ZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhZy1yaXBwbGUnLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgICAgIDpob3N0IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnRhZy1yaXBwbGUge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgICAgICAgICAgIHRvcDogNTAlO1xyXG4gICAgICAgICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB9XHJcbiAgICBgXSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhZy1yaXBwbGVcIiBbQGlua109XCJzdGF0ZVwiPjwvZGl2PlxyXG4gICAgYCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdpbmsnLCBbXHJcbiAgICAgICAgICAgIHN0YXRlKCdub25lJywgc3R5bGUoe3dpZHRoOiAwLCBvcGFjaXR5OiAwfSkpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdub25lID0+IGNsaWNrZWQnLCBbXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKDMwMCwga2V5ZnJhbWVzKFtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgb2Zmc2V0OiAwLCB3aWR0aDogJzMwJScsIGJvcmRlclJhZGl1czogJzEwMCUnfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIG9mZnNldDogMC41LCB3aWR0aDogJzUwJSd9KSxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMC41LCBvZmZzZXQ6IDEsIHdpZHRoOiAnMTAwJScsIGJvcmRlclJhZGl1czogJzE2cHgnfSlcclxuICAgICAgICAgICAgICAgIF0pKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdSaXBwbGUge1xyXG4gICAgQElucHV0KCkgcHVibGljIHN0YXRlID0gJ25vbmUnO1xyXG59XHJcbiJdfQ==