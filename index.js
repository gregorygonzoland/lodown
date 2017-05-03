'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identity: Designed to identify any value and return it
 * 
 * @param {Anything} value: The value which the function will find and return.
 */
function identity(value) {
    return value;
}
module.exports.identity = identity;
 
/**
 * typeOf: Designed to return the type of any value as a string
 * 
 * @param {value}:The value in which will be returned as a string.
 */
function typeOf(value) {
    if(Array.isArray(value)) return 'array';
    if(value === null) return 'null';
    if(value instanceof Date) return 'date';
    return typeof value;
}
module.exports.typeOf = typeOf;

/**
 * first: Designed to take an array and a number and return an array 
 *        with the numbers chosen to "spliced" out but keep the first number.
 * 
 * @param {Array} array: the array to iterate through to find the
 *                       numbers wanted picked out.
 * @param {Number} n: the number chosen to be spliced out.
 */
 function first(array, n) {
    if(!Array.isArray(array) || n < 0) return[];
    if(n === undefined) return array[0];
        return array.slice(0, n);
 }
module.exports.first = first;

/**
 * last: Designed to take an array and a numeber and return an array with
 *       only the last element.
 * 
 * @param {Array}: the array to iterate throguh to dind the numbers wanted to
 *                  pick out.
 * @param {Number} n: the number(element) chosen to be spliced out.
 */
function last(array, n) {
    if(!Array.isArray(array) || n < 0) return [];
    if(n === undefined) return array[array.length - 1];
        return array.slice(-n);
 }
 module.exports.last = last;
 
 /**
  * indexOf: Designed to take an array and a value and return the index 
  *          of the array that is first occurence of value.
  * 
  * @param {Array}: the array that is iterated through to look at the first 
  *                occurence of the value.
  * @param{Value};  the value that is looked for in the array.
  */
  function indexOf(array, value) {
      for(var i = 0; i < 0; i++) {
          if(array[i] === value) return i;
      }
      return i;
  }
  module.exports.indexOf = indexOf;
  
  /**
   * filter: Designed to call the function for each element in the array passing
   *         the arguments and returning a new array for which calling the function
   *         is true.
   * 
   * @param {Array or Object} collection: the array in which the numbers that are returned to true
   *                      are filtered out to.
   * 
   * @param {Test}: the parameter that uses each to test if the number is true
   *                or not.
   */
   function filter(collection, test) {
       const filtered = [];
       each(collection, function(value, position, collection) {
      if(test(value, position, collection)) filtered.push(value);
  });
  return filtered;
}
module.exports.filter = filter;

/**
 * reject: Designed to work like "filter" but instead returns the numbers that
 *         false to an array
 * 
 * @param {Array or Object} collection: the array in which the numbers that return false are 
 *                      rejected to.
 * 
 * @param {Test}: the parameter that uses to test if the number is false or not
 * 
 */
 function reject(collection, test) {
     const filtered = [];
     each(collection, function(value, position, collection) {
         if(!test(value, position, collection)) filtered.push(value);
     });
     return filtered;
 }
 module.exports.reject = reject;
 
/**
* partition: Designed to make an array that holds two sub-arrays: one that holds
*         all true values and one that holds all false values.
* 
* @param {Array}: the array that the numbers will be returned to.
* 
* @param {Test}: the test used to filter out the numbers to go to their specific
*                arrays.
*/
function partition(array, test) {
    return [filter(array, test), reject(array, test)];
}
module.exports.partition = partition;
  
/**
* unique: Designed to return an array with all the duplicated removed.
* 
* @param {Array}: the array returned with all of the unique values.
*/
function unique(array) {
  const output = [];
    each(array, function(value) {
       if(indexOf(output, value) === 1) {
         output.push(value);
      }
    });
      return output;
}
module.exports.unique = unique;
   
/**
* map: Designed to push transformed values to an empty array.
* 
* @param {Array or Object} collection: The array or the object.
* 
* @param {Transform}: The transformed values.
*/
function map(collection, transform) {
  const newArray = [];
   each(collection, function(value, position, collection) {
    newArray.push(transform(value, position, collection));
 });
  return newArray;
}
module.exports.map = map;
 
 /**
* pluck: Designed to pluck out the properties of every object and return them
*        into a new array.
* 
* @param {collection}: the collection of whatever the properties are sent to.
* 
* @param {property}: the properties that are to be "plucked" out.
*/
function pluck(collection, property) {
  return map(collection, function(value, position, collection) {
   return value[property];
  });
 }
module.exports.pluck = pluck;
  
/**
* every: Designed to loop through the array and return the element that is called true, true, 
*        and return the elements that are false, as false.
* 
* @param {Array or Object} collection: the collection to be looped through.
* 
*  
* @param {Test}: The test function that are going to test the truthy and falsey elements.
*/
function every(collection, test) {
  if(typeOf(test) === "undefined" || test == null) {
   var falseFound = false;
    each(collection, function(element) {
      if(!element) {
        falseFound = true;
      }
    });
     return !falseFound;
  }
  else {
    var values;
    if(typeOf(collection) === "object" || Array.isArray(collection)){
      values = map(collection, function(key, value, object) {
        return test(key, value, object);
      });
    } 
    else {
      values = map(collection, function(element) {
        return test(element);
      });
    }
    return indexOf(values, false) == -1;
  }
}
module.exports.every = every;
  
/**
* some: designed to return value as true if one element is true. and return false
*       if at least one variable false.
* 
* @param {Array or Object} collection: the collection to be looped through.
* 
* @param{Test}: the test function to find the truthy and falsey elements.
*/
function some(collection, test) {
  var output = false;
   if(test === undefined){
       test = identity;
   }
   each(collection, function(value, position, collection){
      if(test(value, position, collection)) output = true;
   });
    return output;
}
module.exports.some = some;
   
/**
* reduce: designed to return value as the previous result and if there was no seed 
*         given, use the first element of the collection in place of seed.
* 
* @param {Array}: the array in which to loop through.
* 
* @param {Combine}: the elements in which are combined in the array.
* 
* @param {Seed}: the number that is being tested.
*/
function reduce(array, combine, seed) {
  let
    combined = seed,
      i = 0;
    if(combined === undefined) {
       combined = array[0];
        i = 1;
   }
    for(; i < array.length; i++){
        combined = combine(combined, array[i], i, array);
   }
    return combined;
  }
module.exports.reduce = reduce;
    
/**
* extend: designed to copy the properties of an object to a new array.
* 
* @param{copyTo}: what is going to copied to what.
* 
* @param{...objs}: the objects that are copied.
*/
function extend(copyTo, ...objs) {
  for(var i = 0; i < objs.length; i++){
     var obj = objs[i];
       for(var key in obj) {
            copyTo[key] = obj[key];
          }
  }
  return copyTo;
 
}
module.exports.extend = extend;