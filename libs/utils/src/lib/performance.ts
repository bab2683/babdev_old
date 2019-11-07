/**
 * @param  {Function} fn - function to debounce
 * @param  {Number} delay - delay between function invokations
 * @description Delays the call of function invokations to improve performance
 * @returns A new delayed function to be executed
 */

export function debounce(func: Function, wait: number, immediate: boolean = false) {
  let timeout;

  // This is the function that is actually executed when
  // the DOM event is triggered.
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    const context = this;
    const args = arguments;

    // The function to be called after
    // the debounce time has elapsed
    const later = function() {
      // null timeout to indicate the debounce ended
      timeout = null;

      // Call function now if you did not on the leading end
      if (!immediate) func.apply(context, args);
    };

    // Determine if you should call the function
    // on the leading or trail end
    const callNow = immediate && !timeout;

    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    timeout && clearTimeout(timeout);

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs node)
    timeout = setTimeout(later, wait);

    // Call immediately if you're dong a leading
    // end execution
    if (callNow) func.apply(context, args);
  };
}

/**
 * @param  {Function} fn - function to debounce
 * @param  {Number} limit - limits the time between function invokations
 * @description Limits the number of function invokations to improve performance
 * @returns A function that limits the function invokations
 */
export function throttle(fn, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      fn.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          fn.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
