import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
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
export { HighlightPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: HighlightPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'highlight'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL2NvcmUvcGlwZXMvaGlnaGxpZ2h0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBRWxELE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUVoRSxNQUdhLGFBQWE7SUFDdEI7Ozs7T0FJRztJQUNJLFNBQVMsQ0FBQyxLQUFhLEVBQUUsR0FBVztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJO1lBQ0EsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7dUdBakJRLGFBQWE7cUdBQWIsYUFBYTs7U0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBSHpCLElBQUk7bUJBQUM7b0JBQ0YsSUFBSSxFQUFFLFdBQVc7aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmNvbnN0IGVzY2FwZSA9IHMgPT4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdoaWdobGlnaHQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHRyYW5zZm9ybVxyXG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XHJcbiAgICAgKiBAcGFyYW0gYXJnIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghYXJnLnRyaW0oKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYCgke2VzY2FwZShhcmcpfSlgLCAnaScpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShyZWdleCwgJzxiPiQxPC9iPicpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=