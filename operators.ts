
import { F } from 'ts-toolbelt'

export const pipe: F.Pipe = function(...fns) {
	return function(value) {
		return fns.reduce((currentVal, currentFn) => currentFn(currentVal) , value)
	}
}

export function curry(func) {
  return function curried(...args) {  
    if (args.length >= func.length) {    
      return func.apply(this, args);   
    } else {   
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }   
    }  
  };
}
