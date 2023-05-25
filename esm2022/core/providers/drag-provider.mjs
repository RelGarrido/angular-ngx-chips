import { Injectable } from '@angular/core';
import { DRAG_AND_DROP_KEY } from '../../core/constants';
import * as i0 from "@angular/core";
class DragProvider {
    sender;
    receiver;
    state = {
        dragging: false,
        dropping: false,
        index: undefined
    };
    /**
     * @name setDraggedItem
     * @param event
     * @param tag
     */
    setDraggedItem(event, tag) {
        if (event && event.dataTransfer) {
            event.dataTransfer.setData(DRAG_AND_DROP_KEY, JSON.stringify(tag));
        }
    }
    /**
     * @name getDraggedItem
     * @param event
     */
    getDraggedItem(event) {
        if (event && event.dataTransfer) {
            const data = event.dataTransfer.getData(DRAG_AND_DROP_KEY);
            try {
                return JSON.parse(data);
            }
            catch {
                return;
            }
        }
    }
    /**
     * @name setSender
     * @param sender
     */
    setSender(sender) {
        this.sender = sender;
    }
    /**
     * @name setReceiver
     * @param receiver
     */
    setReceiver(receiver) {
        this.receiver = receiver;
    }
    /**
     * @name onTagDropped
     * @param tag
     * @param indexDragged
     * @param indexDropped
     */
    onTagDropped(tag, indexDragged, indexDropped) {
        this.onDragEnd();
        this.sender.onRemoveRequested(tag, indexDragged);
        this.receiver.onAddingRequested(false, tag, indexDropped);
    }
    /**
     * @name setState
     * @param state
     */
    setState(state) {
        this.state = { ...this.state, ...state };
    }
    /**
     * @name getState
     * @param key
     */
    getState(key) {
        return key ? this.state[key] : this.state;
    }
    /**
     * @name onDragEnd
     */
    onDragEnd() {
        this.setState({
            dragging: false,
            dropping: false,
            index: undefined
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DragProvider, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DragProvider });
}
export { DragProvider };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: DragProvider, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvY29yZS9wcm92aWRlcnMvZHJhZy1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUTNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQVV6RCxNQUNhLFlBQVk7SUFDZCxNQUFNLENBQW9CO0lBQzFCLFFBQVEsQ0FBb0I7SUFFNUIsS0FBSyxHQUFVO1FBQ2xCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsU0FBUztLQUNuQixDQUFDO0lBRUY7Ozs7T0FJRztJQUNJLGNBQWMsQ0FBQyxLQUFnQixFQUFFLEdBQWU7UUFDbkQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM3QixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksY0FBYyxDQUFDLEtBQWdCO1FBQ2xDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzRCxJQUFJO2dCQUNBLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQWUsQ0FBQzthQUN6QztZQUFDLE1BQU07Z0JBQ0osT0FBTzthQUNWO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksU0FBUyxDQUFDLE1BQXlCO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxXQUFXLENBQUMsUUFBMkI7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksWUFBWSxDQUFDLEdBQWEsRUFBRSxZQUFvQixFQUFFLFlBQXFCO1FBQzFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVEsQ0FBQyxLQUEwQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVEsQ0FBQyxHQUFtQjtRQUMvQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsU0FBUztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO3VHQTFGUSxZQUFZOzJHQUFaLFlBQVk7O1NBQVosWUFBWTsyRkFBWixZQUFZO2tCQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQnO1xyXG5pbXBvcnQgeyBUYWdNb2RlbCB9IGZyb20gJy4uL3RhZy1tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRHJhZ2dlZFRhZyB7XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgdGFnOiBUYWdNb2RlbDtcclxuICAgIHpvbmU6IHN0cmluZztcclxufVxyXG5cclxuaW1wb3J0IHsgRFJBR19BTkRfRFJPUF9LRVkgfSBmcm9tICcuLi8uLi9jb3JlL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW47XHJcbiAgICBkcm9wcGluZzogYm9vbGVhbjtcclxuICAgIGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgU3RhdGVQcm9wZXJ0eSA9IGtleW9mIFN0YXRlO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHJhZ1Byb3ZpZGVyIHtcclxuICAgIHB1YmxpYyBzZW5kZXI6IFRhZ0lucHV0Q29tcG9uZW50O1xyXG4gICAgcHVibGljIHJlY2VpdmVyOiBUYWdJbnB1dENvbXBvbmVudDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGU6IFN0YXRlID0ge1xyXG4gICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcclxuICAgICAgICBkcm9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgaW5kZXg6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldERyYWdnZWRJdGVtXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSB0YWdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERyYWdnZWRJdGVtKGV2ZW50OiBEcmFnRXZlbnQsIHRhZzogRHJhZ2dlZFRhZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC5kYXRhVHJhbnNmZXIpIHtcclxuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoRFJBR19BTkRfRFJPUF9LRVksIEpTT04uc3RyaW5naWZ5KHRhZykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldERyYWdnZWRJdGVtXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERyYWdnZWRJdGVtKGV2ZW50OiBEcmFnRXZlbnQpOiBEcmFnZ2VkVGFnIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuZGF0YVRyYW5zZmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShEUkFHX0FORF9EUk9QX0tFWSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKSBhcyBEcmFnZ2VkVGFnO1xyXG4gICAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFNlbmRlclxyXG4gICAgICogQHBhcmFtIHNlbmRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2VuZGVyKHNlbmRlcjogVGFnSW5wdXRDb21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIHNldFJlY2VpdmVyXHJcbiAgICAgKiBAcGFyYW0gcmVjZWl2ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFJlY2VpdmVyKHJlY2VpdmVyOiBUYWdJbnB1dENvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSByZWNlaXZlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIG9uVGFnRHJvcHBlZFxyXG4gICAgICogQHBhcmFtIHRhZ1xyXG4gICAgICogQHBhcmFtIGluZGV4RHJhZ2dlZFxyXG4gICAgICogQHBhcmFtIGluZGV4RHJvcHBlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25UYWdEcm9wcGVkKHRhZzogVGFnTW9kZWwsIGluZGV4RHJhZ2dlZDogbnVtYmVyLCBpbmRleERyb3BwZWQ/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uRHJhZ0VuZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRlci5vblJlbW92ZVJlcXVlc3RlZCh0YWcsIGluZGV4RHJhZ2dlZCk7XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlci5vbkFkZGluZ1JlcXVlc3RlZChmYWxzZSwgdGFnLCBpbmRleERyb3BwZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG5hbWUgc2V0U3RhdGVcclxuICAgICAqIEBwYXJhbSBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3RhdGUoc3RhdGU6IHsgW0sgaW4gU3RhdGVQcm9wZXJ0eV0/OiBTdGF0ZVtLXSB9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgLi4uc3RhdGUgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBuYW1lIGdldFN0YXRlXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdGF0ZShrZXk/OiBTdGF0ZVByb3BlcnR5KTogU3RhdGUgfCBTdGF0ZVtTdGF0ZVByb3BlcnR5XSB7XHJcbiAgICAgICAgcmV0dXJuIGtleSA/IHRoaXMuc3RhdGVba2V5XSA6IHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSBvbkRyYWdFbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRHJhZ0VuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBkcm9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIGluZGV4OiB1bmRlZmluZWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=