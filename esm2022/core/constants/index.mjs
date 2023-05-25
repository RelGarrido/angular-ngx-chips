/*
** constants and default values for <tag-input>
 */
export const PLACEHOLDER = '+ Tag';
export const SECONDARY_PLACEHOLDER = 'Enter a new tag';
export const KEYDOWN = 'keydown';
export const KEYUP = 'keyup';
export const FOCUS = 'focus';
export const MAX_ITEMS_WARNING = 'The number of items specified was greater than the property max-items.';
export const ACTIONS_KEYS = {
    DELETE: 'DELETE',
    SWITCH_PREV: 'SWITCH_PREV',
    SWITCH_NEXT: 'SWITCH_NEXT',
    TAB: 'TAB'
};
export const KEY_PRESS_ACTIONS = {
    8: ACTIONS_KEYS.DELETE,
    46: ACTIONS_KEYS.DELETE,
    37: ACTIONS_KEYS.SWITCH_PREV,
    39: ACTIONS_KEYS.SWITCH_NEXT,
    9: ACTIONS_KEYS.TAB
};
export const DRAG_AND_DROP_KEY = 'Text';
export const NEXT = 'NEXT';
export const PREV = 'PREV';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL2NvcmUvY29uc3RhbnRzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUNuQyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztBQUN2RCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDN0IsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUM3QixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyx3RUFBd0UsQ0FBQztBQUUxRyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUc7SUFDeEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsR0FBRyxFQUFFLEtBQUs7Q0FDYixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUc7SUFDN0IsQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNO0lBQ3RCLEVBQUUsRUFBRSxZQUFZLENBQUMsTUFBTTtJQUN2QixFQUFFLEVBQUUsWUFBWSxDQUFDLFdBQVc7SUFDNUIsRUFBRSxFQUFFLFlBQVksQ0FBQyxXQUFXO0lBQzVCLENBQUMsRUFBRSxZQUFZLENBQUMsR0FBRztDQUN0QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUM7QUFDM0IsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbioqIGNvbnN0YW50cyBhbmQgZGVmYXVsdCB2YWx1ZXMgZm9yIDx0YWctaW5wdXQ+XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFBMQUNFSE9MREVSID0gJysgVGFnJztcclxuZXhwb3J0IGNvbnN0IFNFQ09OREFSWV9QTEFDRUhPTERFUiA9ICdFbnRlciBhIG5ldyB0YWcnO1xyXG5leHBvcnQgY29uc3QgS0VZRE9XTiA9ICdrZXlkb3duJztcclxuZXhwb3J0IGNvbnN0IEtFWVVQID0gJ2tleXVwJztcclxuZXhwb3J0IGNvbnN0IEZPQ1VTID0gJ2ZvY3VzJztcclxuZXhwb3J0IGNvbnN0IE1BWF9JVEVNU19XQVJOSU5HID0gJ1RoZSBudW1iZXIgb2YgaXRlbXMgc3BlY2lmaWVkIHdhcyBncmVhdGVyIHRoYW4gdGhlIHByb3BlcnR5IG1heC1pdGVtcy4nO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFDVElPTlNfS0VZUyA9IHtcclxuICAgIERFTEVURTogJ0RFTEVURScsXHJcbiAgICBTV0lUQ0hfUFJFVjogJ1NXSVRDSF9QUkVWJyxcclxuICAgIFNXSVRDSF9ORVhUOiAnU1dJVENIX05FWFQnLFxyXG4gICAgVEFCOiAnVEFCJ1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEtFWV9QUkVTU19BQ1RJT05TID0ge1xyXG4gICAgODogQUNUSU9OU19LRVlTLkRFTEVURSxcclxuICAgIDQ2OiBBQ1RJT05TX0tFWVMuREVMRVRFLFxyXG4gICAgMzc6IEFDVElPTlNfS0VZUy5TV0lUQ0hfUFJFVixcclxuICAgIDM5OiBBQ1RJT05TX0tFWVMuU1dJVENIX05FWFQsXHJcbiAgICA5OiBBQ1RJT05TX0tFWVMuVEFCXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRFJBR19BTkRfRFJPUF9LRVkgPSAnVGV4dCc7XHJcbmV4cG9ydCBjb25zdCBORVhUID0gJ05FWFQnO1xyXG5leHBvcnQgY29uc3QgUFJFViA9ICdQUkVWJztcclxuXHJcbiJdfQ==