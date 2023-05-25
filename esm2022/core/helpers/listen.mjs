/**
 * @name listen
 * @param listenerType
 * @param action
 * @param condition
 */
export function listen(listenerType, action, condition = true) {
    // if the event provided does not exist, throw an error
    if (!this.listeners.hasOwnProperty(listenerType)) {
        throw new Error('The event entered may be wrong');
    }
    // if a condition is present and is false, exit early
    if (!condition) {
        return;
    }
    // fire listener
    this.listeners[listenerType].push(action);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy9jb3JlL2hlbHBlcnMvbGlzdGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FBQyxZQUFvQixFQUFFLE1BQWlCLEVBQUUsU0FBUyxHQUFHLElBQUk7SUFDNUUsdURBQXVEO0lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7S0FDckQ7SUFFRCxxREFBcUQ7SUFDckQsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNaLE9BQU87S0FDVjtJQUVELGdCQUFnQjtJQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlxyXG4gKiBAbmFtZSBsaXN0ZW5cclxuICogQHBhcmFtIGxpc3RlbmVyVHlwZVxyXG4gKiBAcGFyYW0gYWN0aW9uXHJcbiAqIEBwYXJhbSBjb25kaXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXJUeXBlOiBzdHJpbmcsIGFjdGlvbjogKCkgPT4gYW55LCBjb25kaXRpb24gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAvLyBpZiB0aGUgZXZlbnQgcHJvdmlkZWQgZG9lcyBub3QgZXhpc3QsIHRocm93IGFuIGVycm9yXHJcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzLmhhc093blByb3BlcnR5KGxpc3RlbmVyVHlwZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBldmVudCBlbnRlcmVkIG1heSBiZSB3cm9uZycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGEgY29uZGl0aW9uIGlzIHByZXNlbnQgYW5kIGlzIGZhbHNlLCBleGl0IGVhcmx5XHJcbiAgICBpZiAoIWNvbmRpdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXJlIGxpc3RlbmVyXHJcbiAgICB0aGlzLmxpc3RlbmVyc1tsaXN0ZW5lclR5cGVdLnB1c2goYWN0aW9uKTtcclxufVxyXG4iXX0=