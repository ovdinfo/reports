(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function series(tasks, cb, i) {
  i = i || 0;
  tasks[i](function(err) {
    
    if (err) return cb(err)
    if (i === tasks.length-1) {
      cb(...arguments); 
    } else {
      series(tasks, cb, i + 1);
    }
  });
}

var async = Object.freeze({
	series: series
});

class ArrayIterator {

  constructor(arr) {
    this.arr = arr;
    this.pos = -1;
  }

  get _isArrayIterator() {
    return true
  }

  
  hasNext() {
    return this.pos < this.arr.length - 1
  }

  
  next() {
    this.pos += 1;
    var next = this.arr[this.pos];
    return next
  }

  
  back() {
    if (this.pos >= 0) {
      this.pos -= 1;
    }
    return this
  }

  peek() {
    return this.arr[this.pos+1]
  }

}

function deleteFromArray(array, value) {
  if (!array) return
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      array.splice(i, 1);
      i--;
    }
  }
}

function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

var freeGlobal = checkGlobal(typeof global == 'object' && global);


var freeSelf = checkGlobal(typeof self == 'object' && self);


var thisGlobal = checkGlobal(typeof undefined == 'object' && undefined);


var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

var Symbol = root.Symbol;

function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

var symbolTag = '[object Symbol]';


var objectProto = Object.prototype;


var objectToString = objectProto.toString;


function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

var INFINITY = 1 / 0;


var symbolProto = Symbol ? Symbol.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;


function baseToString(value) {
  
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

function toString(value) {
  return value == null ? '' : baseToString(value);
}

function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f\\ufe20-\\ufe23';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20f0';
var rsVarRange$1 = '\\ufe0e\\ufe0f';


var rsAstral = '[' + rsAstralRange$1 + ']';
var rsCombo = '[' + rsComboMarksRange$1 + rsComboSymbolsRange$1 + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange$1 + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$1 = '\\u200d';


var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange$1 + ']?';
var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';


function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

var rsAstralRange$2 = '\\ud800-\\udfff';
var rsComboMarksRange$3 = '\\u0300-\\u036f\\ufe20-\\ufe23';
var rsComboSymbolsRange$3 = '\\u20d0-\\u20f0';
var rsDingbatRange = '\\u2700-\\u27bf';
var rsVarRange$2 = '\\ufe0e\\ufe0f';
var rsCombo$2 = '[' + rsComboMarksRange$3 + rsComboSymbolsRange$3 + ']';
var rsDingbat = '[' + rsDingbatRange + ']';
var rsFitz$1 = '\\ud83c[\\udffb-\\udfff]';
var rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')';
var rsNonAstral$1 = '[^' + rsAstralRange$2 + ']';
var rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$2 = '\\u200d';


var reOptMod$1 = rsModifier$1 + '?';
var rsOptVar$1 = '[' + rsVarRange$2 + ']?';
var rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*';
var rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1;
var rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';


var objectProto$1 = Object.prototype;


var objectToString$1 = objectProto$1.toString;


function isFunction(value) {
  
  
  
  var tag = isObject(value) ? objectToString$1.call(value) : '';
  return tag == funcTag || tag == genTag;
}

var NAN = 0 / 0;


var reTrim = /^\s+|\s+$/g;


var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;


var reIsBinary = /^0b[01]+$/i;


var reIsOctal = /^0o[0-7]+$/i;


var freeParseInt = parseInt;


function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var isArray = Array.isArray;

function isHostObject(value) {
  
  
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

var coreJsData = root['__core-js_shared__'];

var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());


function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var funcToString$1 = Function.prototype.toString;


function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;


var reIsHostCtor = /^\[object .+?Constructor\]$/;


var objectProto$2 = Object.prototype;


var funcToString = Function.prototype.toString;


var hasOwnProperty = objectProto$2.hasOwnProperty;


var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

function getValue(object, key) {
  return object == null ? undefined : object[key];
}

function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var nativeCreate = getNative(Object, 'create');

function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

var HASH_UNDEFINED = '__lodash_hash_undefined__';


var objectProto$3 = Object.prototype;


var hasOwnProperty$1 = objectProto$3.hasOwnProperty;


function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
}

var objectProto$4 = Object.prototype;


var hasOwnProperty$2 = objectProto$4.hasOwnProperty;


function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty$2.call(data, key);
}

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';


function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function listCacheClear() {
  this.__data__ = [];
}

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var arrayProto = Array.prototype;


var splice = arrayProto.splice;


function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

var Map$1 = getNative(root, 'Map');

function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

var FUNC_ERROR_TEXT$1 = 'Expected a function';


function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}


memoize.Cache = MapCache;

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;


var reEscapeChar = /\\(\\)?/g;


var stringToPath = memoize(function(string) {
  var result = [];
  toString(string).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;


function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var INFINITY$1 = 1 / 0;


function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

function stackClear() {
  this.__data__ = new ListCache;
}

function stackDelete(key) {
  return this.__data__['delete'](key);
}

function stackGet(key) {
  return this.__data__.get(key);
}

function stackHas(key) {
  return this.__data__.has(key);
}

var LARGE_ARRAY_SIZE = 200;


function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
    cache = this.__data__ = new MapCache(cache.__data__);
  }
  cache.set(key, value);
  return this;
}

function Stack(entries) {
  this.__data__ = new ListCache(entries);
}


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';


function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

function setCacheHas(value) {
  return this.__data__.has(value);
}

function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var UNORDERED_COMPARE_FLAG$1 = 1;
var PARTIAL_COMPARE_FLAG$2 = 2;


function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG$2,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  
  var stacked = stack.get(array);
  if (stacked) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG$1) ? new SetCache : undefined;

  stack.set(array, other);

  
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  return result;
}

var Uint8Array = root.Uint8Array;

function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var UNORDERED_COMPARE_FLAG$2 = 1;
var PARTIAL_COMPARE_FLAG$3 = 2;


var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag$1 = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';


var symbolProto$1 = Symbol ? Symbol.prototype : undefined;
var symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;


function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
      
      
      
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      
      return (object != +object) ? other != +other : object == +other;

    case regexpTag:
    case stringTag:
      
      
      
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG$3;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG$2;
      stack.set(object, other);

      
      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

    case symbolTag$1:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var nativeGetPrototype = Object.getPrototypeOf;


function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

var objectProto$6 = Object.prototype;


var hasOwnProperty$4 = objectProto$6.hasOwnProperty;


function baseHas(object, key) {
  
  
  
  return object != null &&
    (hasOwnProperty$4.call(object, key) ||
      (typeof object == 'object' && key in object && getPrototype(object) === null));
}

var nativeKeys = Object.keys;


function baseKeys(object) {
  return nativeKeys(Object(object));
}

function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var getLength = baseProperty('length');

var MAX_SAFE_INTEGER = 9007199254740991;


function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

var argsTag$1 = '[object Arguments]';


var objectProto$7 = Object.prototype;


var hasOwnProperty$5 = objectProto$7.hasOwnProperty;


var objectToString$2 = objectProto$7.toString;


var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;


function isArguments(value) {
  
  return isArrayLikeObject(value) && hasOwnProperty$5.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag$1);
}

var stringTag$1 = '[object String]';


var objectProto$8 = Object.prototype;


var objectToString$3 = objectProto$8.toString;


function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString$3.call(value) == stringTag$1);
}

function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

var MAX_SAFE_INTEGER$1 = 9007199254740991;


var reIsUint = /^(?:0|[1-9]\d*)$/;


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

var objectProto$9 = Object.prototype;


function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

  return value === proto;
}

function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

var PARTIAL_COMPARE_FLAG$4 = 2;


function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG$4,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : baseHas(other, key))) {
      return false;
    }
  }
  
  var stacked = stack.get(object);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  return result;
}

var DataView = getNative(root, 'DataView');

var Promise$1 = getNative(root, 'Promise');

var Set$1 = getNative(root, 'Set');

var WeakMap$1 = getNative(root, 'WeakMap');

var mapTag$1 = '[object Map]';
var objectTag$1 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$1 = '[object Set]';
var weakMapTag = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';


var objectProto$10 = Object.prototype;


var objectToString$4 = objectProto$10.toString;


var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map$1);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set$1);
var weakMapCtorString = toSource(WeakMap$1);


function getTag(value) {
  return objectToString$4.call(value);
}



if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map$1 && getTag(new Map$1) != mapTag$1) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set$1 && getTag(new Set$1) != setTag$1) ||
    (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString$4.call(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$1;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$1;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

var getTag$1 = getTag;

var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag$2 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$2 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$2 = '[object Set]';
var stringTag$2 = '[object String]';
var weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$2 = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';


var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$2] = typedArrayTags[stringTag$2] =
typedArrayTags[weakMapTag$1] = false;


var objectProto$11 = Object.prototype;


var objectToString$5 = objectProto$11.toString;


function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString$5.call(value)];
}

var PARTIAL_COMPARE_FLAG$1 = 2;


var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var objectTag = '[object Object]';


var objectProto$5 = Object.prototype;


var hasOwnProperty$3 = objectProto$5.hasOwnProperty;


function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag$1(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag$1(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG$1)) {
    var objIsWrapped = objIsObj && hasOwnProperty$3.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$3.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

var UNORDERED_COMPARE_FLAG = 1;
var PARTIAL_COMPARE_FLAG = 2;


function isStrictComparable(value) {
  return value === value && !isObject(value);
}

var INFINITY$2 = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;


function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (typeof key == 'number' && value === undefined && !(key in object))) {
    object[key] = value;
  }
}

var objectProto$12 = Object.prototype;


var hasOwnProperty$6 = objectProto$12.hasOwnProperty;


function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : source[key];

    assignValue(object, key, newValue);
  }
  return object;
}

function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

function stubArray() {
  return [];
}

var getOwnPropertySymbols = Object.getOwnPropertySymbols;


function getSymbols(object) {
  
  
  return getOwnPropertySymbols(Object(object));
}


if (!getOwnPropertySymbols) {
  getSymbols = stubArray;
}

var getSymbols$1 = getSymbols;

function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}

function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}

var objectProto$13 = Object.prototype;


var hasOwnProperty$7 = objectProto$13.hasOwnProperty;


function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  
  if (length && typeof array[0] == 'string' && hasOwnProperty$7.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

function addMapEntry(map, pair) {
  
  map.set(pair[0], pair[1]);
  return map;
}

function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

var reFlags = /\w*$/;


function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

function addSetEntry(set, value) {
  set.add(value);
  return set;
}

function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

var symbolProto$2 = Symbol ? Symbol.prototype : undefined;
var symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;


function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}

function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var boolTag$3 = '[object Boolean]';
var dateTag$3 = '[object Date]';
var mapTag$4 = '[object Map]';
var numberTag$3 = '[object Number]';
var regexpTag$3 = '[object RegExp]';
var setTag$4 = '[object Set]';
var stringTag$4 = '[object String]';
var symbolTag$3 = '[object Symbol]';

var arrayBufferTag$3 = '[object ArrayBuffer]';
var dataViewTag$4 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';


function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$3:
      return cloneArrayBuffer(object);

    case boolTag$3:
    case dateTag$3:
      return new Ctor(+object);

    case dataViewTag$4:
      return cloneDataView(object, isDeep);

    case float32Tag$2: case float64Tag$2:
    case int8Tag$2: case int16Tag$2: case int32Tag$2:
    case uint8Tag$2: case uint8ClampedTag$2: case uint16Tag$2: case uint32Tag$2:
      return cloneTypedArray(object, isDeep);

    case mapTag$4:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag$3:
    case stringTag$4:
      return new Ctor(object);

    case regexpTag$3:
      return cloneRegExp(object);

    case setTag$4:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag$3:
      return cloneSymbol(object);
  }
}

var objectCreate = Object.create;


function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

function stubFalse() {
  return false;
}

var freeExports = typeof exports == 'object' && exports;


var freeModule = freeExports && typeof module == 'object' && module;


var moduleExports = freeModule && freeModule.exports === freeExports;


var Buffer = moduleExports ? root.Buffer : undefined;


var isBuffer = !Buffer ? stubFalse : function(value) {
  return value instanceof Buffer;
};

var argsTag$3 = '[object Arguments]';
var arrayTag$2 = '[object Array]';
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var errorTag$2 = '[object Error]';
var funcTag$2 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var mapTag$3 = '[object Map]';
var numberTag$2 = '[object Number]';
var objectTag$3 = '[object Object]';
var regexpTag$2 = '[object RegExp]';
var setTag$3 = '[object Set]';
var stringTag$3 = '[object String]';
var symbolTag$2 = '[object Symbol]';
var weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';


var cloneableTags = {};
cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] =
cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
cloneableTags[float32Tag$1] = cloneableTags[float64Tag$1] =
cloneableTags[int8Tag$1] = cloneableTags[int16Tag$1] =
cloneableTags[int32Tag$1] = cloneableTags[mapTag$3] =
cloneableTags[numberTag$2] = cloneableTags[objectTag$3] =
cloneableTags[regexpTag$2] = cloneableTags[setTag$3] =
cloneableTags[stringTag$3] = cloneableTags[symbolTag$2] =
cloneableTags[uint8Tag$1] = cloneableTags[uint8ClampedTag$1] =
cloneableTags[uint16Tag$1] = cloneableTags[uint32Tag$1] = true;
cloneableTags[errorTag$2] = cloneableTags[funcTag$2] =
cloneableTags[weakMapTag$2] = false;


function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$3 || tag == argsTag$3 || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

var objectTag$4 = '[object Object]';


var objectProto$14 = Object.prototype;


var funcToString$2 = Function.prototype.toString;


var hasOwnProperty$8 = objectProto$14.hasOwnProperty;


var objectCtorString = funcToString$2.call(Object);


var objectToString$6 = objectProto$14.toString;


function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString$6.call(value) != objectTag$4 || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$8.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString);
}

var Reflect = root.Reflect;

function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

var objectProto$16 = Object.prototype;


var enumerate = Reflect ? Reflect.enumerate : undefined;
var propertyIsEnumerable$1 = objectProto$16.propertyIsEnumerable;


function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}


if (enumerate && !propertyIsEnumerable$1.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
}

var baseKeysIn$1 = baseKeysIn;

var objectProto$15 = Object.prototype;


var hasOwnProperty$9 = objectProto$15.hasOwnProperty;


function keysIn(object) {
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn$1(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty$9.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
      else {
        newValue = objValue;
      }
    }
    else {
      isCommon = false;
    }
  }
  stack.set(srcValue, newValue);

  if (isCommon) {
    
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
  }
  stack['delete'](srcValue);
  assignMergeValue(object, key, newValue);
}

function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray(source) || isTypedArray(source))) {
    var props = keysIn(source);
  }
  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var FUNC_ERROR_TEXT$2 = 'Expected a function';


var nativeMax$2 = Math.max;


function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  start = nativeMax$2(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$2(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

function createAssigner(assigner) {
  return rest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

function baseSet(object, path, value, customizer) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]);
    if (isObject(nested)) {
      var newValue = value;
      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = objValue == null
            ? (isIndex(path[index + 1]) ? [] : {})
            : objValue;
        }
      }
      assignValue(nested, key, newValue);
    }
    nested = nested[key];
  }
  return object;
}

function setWith(object, path, value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return object == null ? object : baseSet(object, path, value, customizer);
}

function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

function cacheHas(cache, key) {
  return cache.has(key);
}

function noop() {
  
}

var INFINITY$3 = 1 / 0;


var createSet = !(Set$1 && (1 / setToArray(new Set$1([,-0]))[1]) == INFINITY$3) ? noop : function(values) {
  return new Set$1(values);
};

var LARGE_ARRAY_SIZE$1 = 200;


function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

function parent(object, path) {
  return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
}

function baseUnset(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  object = parent(object, path);

  var key = toKey(last(path));
  return !(object != null && baseHas(object, key)) || delete object[key];
}

function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var LARGE_ARRAY_SIZE$2 = 200;


function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE$2) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

var without = rest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

function isObject$1(val) {
  const type = typeof val;
  return Boolean(val) && (type === 'object' || type === 'function')
}

function isArray$1(a) {
  return Array.isArray(a)
}

function clone(val) {
  if (isArray$1(val)) {
    return val.slice(0)
  }
  if (isObject$1(val)) {
    return Object.assign({}, val)
  }
  
  
  return val
}

function forEach(iteratee, func) {
  if (!iteratee) return
  if (iteratee.constructor.prototype.forEach) {
    iteratee.forEach(func);
  } else {
    Object.keys(iteratee).forEach(function(key) {
      return func(iteratee[key], key)
    });
  }
}

const platform = {

  inBrowser: false,

  inNodeJS: false,

  inElectron: false,

  
  isIE: false,
  

  isFF: false,

  isWebkit: false,

  
  version: -1,

  

  isWindows: false,

  isMac: false,

  
  
  _reset: detect
};

function detect() {

  if (typeof window !== 'undefined') {
    platform.inBrowser = true;

    
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');
    const edge = ua.indexOf('Edge/');

    if (msie > 0) {
      
      platform.isIE = true;
      platform.version = 10;
      
      
    } else if (trident > 0) {
      
      platform.isIE = true;
      platform.version = 11;
      platform.isTrident = true;
      
      
      
    } else if (edge > 0) {
      
      platform.isIE = true;
      platform.isEdge = true;
      platform.version = 12;
      
      parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    
    platform.isFF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    
    platform.isWebkit = !platform.isFF && !platform.isIE;
  } else {
    platform.inBrowser = false;
  }

  if (platform.inBrowser) {
    platform.isWindows = (window.navigator !== undefined && window.navigator.appVersion && window.navigator.appVersion.indexOf("Win") !== -1);
    platform.isMac = (window.navigator !== undefined && window.navigator.platform.indexOf('Mac') >= 0);
  }

  
  if (typeof process !== 'undefined') {
    if (platform.inBrowser) {
      platform.inElectron = true;
    } else {
      platform.inNodeJS = true;
    }
  }

}

detect();

function cloneDeep(val) {
  if (isArray$1(val)) {
    return _cloneArrayDeep(val);
  }
  
  
  
  if (platform.inBrowser && val instanceof window.File) {
    return val
  }
  if (isObject$1(val)) {
    return _cloneObjectDeep(val)
  }
  
  
  return val
}

function _cloneObjectDeep(obj) {
  let res = {};
  forEach(obj, (val, key) => {
    res[key] = cloneDeep(val);
  });
  return res
}

function _cloneArrayDeep(arr) {
  return arr.map(cloneDeep)
}

function isString$1(s) {
  return typeof s === 'string'
}

const DEBUG = false;
let count = 0;
const COUNT_MSG = '%s listeners registered in the whole system.';


class EventEmitter {

  
  emit(event) {
    if (event in this.__events__) {
      
      
      var bindings = this.__events__[event].slice();
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, len = bindings.length; i < len; i++) {
        var binding = bindings[i];
        
        binding.method.apply(binding.context, args);
      }
      return true
    }
    return false
  }

  
  on(event, method, context) {
    
    _on.call(this, event, method, context);
  }

  
  off(event, method, context) { 
    if (arguments.length === 1 && isObject$1(arguments[0])) {
      _disconnect.call(this, arguments[0]);
    } else {
      _off.apply(this, arguments);
    }
  }

  _debugEvents() {
    
    console.log('### EventEmitter: ', this);
    forEach(this.__events__, (handlers, name) => {
      console.log("- %s listeners for %s: ", handlers.length, name, handlers);
    });
    
  }

  get __events__() {
    if (!this.___events___) {
      this.___events___ = {};
    }
    return this.___events___
  }

}


function _on(event, method, context) {
  
  var bindings;
  validateMethod( method, context );
  if (this.__events__.hasOwnProperty(event)) {
    bindings = this.__events__[event];
  } else {
    
    bindings = this.__events__[event] = [];
  }
  
  bindings.push({
    method: method,
    context: context || null
  });
  if (DEBUG) {
    count++;
    console.info('_on()', event, method.name, context, this);
    console.info(COUNT_MSG, count);
  }
  return this
  
}


function _off(event, method, context) {
  
  if (arguments.length === 0) {
    if (DEBUG) {
      forEach(this.__events__, (bindings) => {
        bindings.forEach((b) => {
          console.info('_off()', b.method.name, b.context, this);
        });
        count -= bindings.length;
      });
      console.info(COUNT_MSG, count);
    }
    this.___events___ = {};
    return this
  }
  if (arguments.length === 1) {
    
    if (DEBUG) {
      count -= (this.__events__[event] || []).length;
      console.info(COUNT_MSG, count);
    }
    delete this.__events__[event];
    return this
  }
  validateMethod(method, context);
  if (!(event in this.__events__) || !this.__events__[event].length) {
    if (DEBUG) console.info('NO MATCHING BINDINGS');
    
    return this
  }
  
  if (arguments.length < 3) {
    context = null;
  }
  
  let bindings = this.__events__[event];
  for (let i = bindings.length-1; i >= 0; i--) {
    const b = bindings[i];
    if (b.method === method && b.context === context) {
      bindings.splice(i, 1);
      if (DEBUG) count--;
    }
  }
  
  if (bindings.length === 0) {
    delete this.__events__[event];
  }
  if (DEBUG) console.info(COUNT_MSG, count);
  return this
  
}


function _disconnect(context) {
  
  
  forEach(this.__events__, (bindings, event) => {
    for (let i = bindings.length-1; i>=0; i--) {
      
      
      if (bindings[i] && bindings[i].context === context) {
        _off.call(this, event, bindings[i].method, context);
      }
    }
  });
  return this
  
}

function validateMethod(method, context) {
  
  if (typeof method === 'string') {
    
    if (context === undefined || context === null) {
      throw new Error( 'Method name "' + method + '" has no context.' )
    }
    if (!(method in context)) {
      
      
      throw new Error( 'Method not found: "' + method + '"' )
    }
    if (typeof context[method] !== 'function') {
      
      
      throw new Error( 'Property "' + method + '" is not a function' )
    }
  } else if (typeof method !== 'function') {
    throw new Error( 'Invalid callback. Function or method name expected.' )
  }
}

function extend(...args) {
  return Object.assign(...args)
}

function isFunction$1(f) {
  return typeof f === 'function'
}

function filter(iteratee, fn) {
  if (!iteratee) return []
  if (iteratee.constructor.prototype.filter && isFunction$1(iteratee.constructor.prototype.filter)) {
    return iteratee.filter(fn)
  }
  let result = [];
  forEach(iteratee, (val, key) => {
    if (fn(val, key)) {
      result.push(val);
    }
  });
  return result
}

function findIndex$1(arr, predicate) {
  if (!isFunction$1(predicate)) return arr.indexOf(predicate)
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return i
  }
  return -1
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr)
}

function flattenOften(arr, max) {
  if (!(max > 0)) throw new Error("'max' must be a positive number")
  let l = arr.length;
  arr = flatten(arr);
  let round = 1;
  while (round < max && l < arr.length) {
    l = arr.length;
    arr = flatten(arr);
    round++;
  }
  return arr
}

function map(iteratee, func) {
  if (!iteratee) return []
  if (!func) func = function(item) { return item };
  if (Array.isArray(iteratee)) {
    return iteratee.map(func)
  } else {
    return Object.keys(iteratee).map(function(key) {
      return func(iteratee[key], key)
    })
  }
}

var inBrowser = platform.inBrowser;

function isArrayEqual(arr1, arr2) {
  if (arr1 === arr2) return true
  if (!isArray$1(arr1) || !isArray$1(arr2)) return false
  if (arr1.length !== arr2.length) return false
  let L = arr1.length;
  for (var i = 0; i < L; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

function isBoolean(val) {
  return (val === true || val === false || (val && val.constructor === Boolean) )
}

function isPlainObject$1(o) {
  return Boolean(o) && o.constructor === {}.constructor
}

function isEqual(a, b) {
  if (a === b) return true
  if (isArray$1(a) && isArray$1(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false
    }
    return true
  }
  if (isPlainObject$1(a) && isPlainObject$1(b)) {
    let akeys = Object.keys(a).sort();
    let bkeys = Object.keys(b).sort();
    if (!isEqual(akeys, bkeys)) return false
    for (let i = 0; i < akeys.length; i++) {
      let key = akeys[i];
      if (!isEqual(a[key], b[key])) return false
    }
    return true
  }
  return false
}

function isNil(o) {
  return o === null || o === undefined
}

function isNumber(n) {
  return typeof n === 'number'
}

function last$1(arr) {
  return arr[arr.length-1]
}

class PathObject {

  
  constructor(root) {
    if (root) {
      this.__root__ = root;
    }
  }

  contains(id) {
    return Boolean(this.getRoot()[id])
  }

  getRoot() {
    if (this.__root__) {
      return this.__root__
    } else {
      return this
    }
  }

  
  get(path) {
    if (!path) {
      return undefined
    }
    if (isString$1(path)) {
      return this.getRoot()[path]
    }
    if (arguments.length > 1) {
      path = Array.prototype.slice(arguments, 0);
    }
    if (!isArray$1(path)) {
      throw new Error('Illegal argument for PathObject.get()')
    }
    return get(this.getRoot(), path)
  }

  set(path, value) {
    if (!path) {
      throw new Error('Illegal argument: PathObject.set(>path<, value) - path is mandatory.')
    }
    if (isString$1(path)) {
      this.getRoot()[path] = value;
    } else {
      setWith(this.getRoot(), path, value);
    }
  }

  delete(path) {
    if (isString$1(path)) {
      delete this.getRoot()[path];
    } else if (path.length === 1) {
      delete this.getRoot()[path[0]];
    } else {
      var success = unset(this.getRoot(), path);
      if (!success) {
        throw new Error('Could not delete property at path' + path)
      }
    }
  }

  clear() {
    var root = this.getRoot();
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        delete root[key];
      }
    }
  }

}

PathObject.prototype._isPathObject = true;

const _global = (typeof global !== 'undefined') ? global : window;
const substanceGlobals = _global.hasOwnProperty('Substance') ? _global.Substance : _global.Substance = {
  DEBUG_RENDERING: true
};

class TreeNode {}



class TreeIndex {
  
  get(path) {
    if (arguments.length > 1) {
      path = Array.prototype.slice(arguments, 0);
    }
    if (isString$1(path)) {
      path = [path];
    }
    return get(this, path);
  }

  getAll(path) {
    if (arguments.length > 1) {
      path = Array.prototype.slice(arguments, 0);
    }
    if (isString$1(path)) {
      path = [path];
    }
    if (!isArray$1(path)) {
      throw new Error('Illegal argument for TreeIndex.get()');
    }
    var node = get(this, path);
    return this._collectValues(node);
  }

  set(path, value) {
    if (isString$1(path)) {
      path = [path];
    }
    setWith(this, path, value, function(val) {
      if (!val) return new TreeNode();
    });
  }

  delete(path) {
    if (isString$1(path)) {
      delete this[path];
    } else if(path.length === 1) {
      delete this[path[0]];
    } else {
      var key = path[path.length-1];
      path = path.slice(0, -1);
      var parent = get(this, path);
      if (parent) {
        delete parent[key];
      }
    }
  }

  clear() {
    var root = this;
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        delete root[key];
      }
    }
  }

  traverse(fn) {
    this._traverse(this, [], fn);
  }

  forEach(...args) {
    this.traverse(...args);
  }

  _traverse(root, path, fn) {
    var id;
    for (id in root) {
      if (!root.hasOwnProperty(id)) continue;
      var child = root[id];
      var childPath = path.concat([id]);
      if (child instanceof TreeNode) {
        this._traverse(child, childPath, fn);
      } else {
        fn(child, childPath);
      }
    }
  }

  _collectValues(root) {
    
    
    var vals = {};
    this._traverse(root, [], function(val, path) {
      var key = path[path.length-1];
      vals[key] = val;
    });
    return vals;
  }
}

class TreeIndexArrays extends TreeIndex {

  contains(path) {
    let val = super.get(path);
    return Boolean(val)
  }

  get(path) {
    let val = super.get(path);
    if (val instanceof TreeNode) {
      val = val.__values__ || [];
    }
    return val;
  }

  set(path, arr) {
    let val = super.get(path);
    val.__values__ = arr;
  }

  add(path, value) {
    if (isString$1(path)) {
      path = [path];
    }
    if (!isArray$1(path)) {
      throw new Error('Illegal arguments.');
    }
    var arr;

    
    
    
    
    
    
    setWith(this, path.concat(['__values__','__dummy__']), undefined, function(val, key) {
      if (key === '__values__') {
        if (!val) val = [];
        arr = val;
      } else if (!val) {
        val = new TreeNode();
      }
      return val;
    });
    delete arr.__dummy__;
    arr.push(value);
  }

  remove(path, value) {
    var arr = get(this, path);
    if (arr instanceof TreeNode) {
      if (arguments.length === 1) {
        delete arr.__values__;
      } else {
        deleteFromArray(arr.__values__, value);
      }
    }
  }

  _collectValues(root) {
    var vals = [];
    this._traverse(root, [], function(val) {
      vals.push(val);
    });
    vals = Array.prototype.concat.apply([], vals);
    return vals
  }
}

TreeIndex.Arrays = TreeIndexArrays;

function uuid(prefix, len) {
  if (prefix && prefix[prefix.length-1] !== "-") {
    prefix = prefix.concat("-");
  }
  var chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  var radix = 16;
  var idx;
  len = len || 32;
  if (len) {
    
    for (idx = 0; idx < len; idx++) uuid[idx] = chars[0 | Math.random()*radix];
  } else {
    
    var r;
    
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    
    
    for (idx = 0; idx < 36; idx++) {
      if (!uuid[idx]) {
        r = 0 | Math.random()*16;
        uuid[idx] = chars[(idx === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return (prefix ? prefix : "") + uuid.join('');
}

class Selection {

  constructor() {
    
    var _internal = {};
    Object.defineProperty(this, "_internal", {
      enumerable: false,
      value: _internal
    });
      
    _internal.doc = null;
  }

  clone() {
    var newSel = this._clone();
    if (this._internal.doc) {
      newSel.attach(this._internal.doc);
    }
    return newSel
  }

  
  getDocument() {
    var doc = this._internal.doc;
    if (!doc) {
      throw new Error('Selection is not attached to a document.')
    }
    return doc
  }

  isAttached() {
    return Boolean(this._internal.doc)
  }

  
  attach(doc) {
    this._internal.doc = doc;
    return this
  }

  
  isNull() { return false; }

  
  isPropertySelection() { return false; }

  
  isContainerSelection() { return false; }

  
  isNodeSelection() { return false; }

  isCustomSelection() { return false; }

  
  isCollapsed() { return true; }

  
  isReverse() { return false; }

  getType() {
    throw new Error('Selection.getType() is abstract.')
  }

  get type() {
    return this.getType()
  }

  
  equals(other) {
    if (this === other) {
      return true
    } else if (!other) {
      return false
    } else if (this.isNull() !== other.isNull()) {
      return false
    } else if (this.getType() !== other.getType()) {
      return false
    } else {
      
      
      return true
    }
  }

  
  toString() {
    return "null"
  }

  
  toJSON() {
    throw new Error('This method is abstract.')
  }

  createWith(update) {
    let SelectionClass = this.constructor;
    let data = this.toJSON();
    Object.assign(data, update);
    return SelectionClass.fromJSON(data)
  }
}


Selection.prototype._isSelection = true;


class NullSelection extends Selection {

  isNull() {
    return true
  }

  getType() {
    return 'null'
  }

  toJSON() {
    return null
  }

  clone() {
    return this
  }
}



Selection.nullSelection = Object.freeze(new NullSelection());

class Coordinate {

  
  constructor(path, offset) {
    
    if (arguments[0] === 'SKIP') return
    if (arguments.length === 1) {
      let data = arguments[0];
      this.path = data.path;
      this.offset = data.offset;
    } else {
      this.path = path;
      this.offset = offset;
    }
    if (!isArray$1(this.path)) {
      throw new Error('Invalid arguments: path should be an array.')
    }
    if (!isNumber(this.offset) || this.offset < 0) {
      throw new Error('Invalid arguments: offset must be a positive number.')
    }
  }

  equals(other) {
    return (other === this ||
      (isArrayEqual(other.path, this.path) && other.offset === this.offset) )
  }

  withCharPos(offset) {
    return new Coordinate(this.path, offset)
  }

  getNodeId() {
    return this.path[0]
  }

  getPath() {
    return this.path
  }

  getOffset() {
    return this.offset
  }

  toJSON() {
    return {
      path: this.path.slice(),
      offset: this.offset
    }
  }

  toString() {
    return "(" + this.path.join('.') + ", " + this.offset + ")"
  }

  isPropertyCoordinate() {
    return this.path.length > 1
  }

  isNodeCoordinate() {
    return this.path.length === 1
  }

  hasSamePath(other) {
    return isArrayEqual(this.path, other.path)
  }
}

Coordinate.prototype._isCoordinate = true;

class PropertySelection extends Selection {

  
  constructor(path, startOffset, endOffset, reverse, containerId, surfaceId) {
    super();

    if (arguments.length === 1) {
      let data = arguments[0];
      path = data.path;
      startOffset = data.startOffset;
      endOffset = data.endOffset;
      reverse = data.reverse;
      containerId = data.containerId;
      surfaceId = data.surfaceId;
    }

    if (!path || !isNumber(startOffset)) {
      throw new Error('Invalid arguments: `path` and `startOffset` are mandatory');
    }

    this.start = new Coordinate(path, startOffset);
    this.end = new Coordinate(path, isNumber(endOffset) ? endOffset : startOffset);

    
    this.reverse = Boolean(reverse);

    this.containerId = containerId;

    
    this.surfaceId = surfaceId;
  }

  get path() {
    return this.start.path
  }

  get startOffset() {
    console.warn('DEPRECATED: Use sel.start.offset instead');
    return this.start.offset
  }

  get endOffset() {
    console.warn('DEPRECATED: Use sel.end.offset instead');
    return this.end.offset
  }

  
  toJSON() {
    return {
      type: 'property',
      path: this.start.path,
      startOffset: this.start.offset,
      endOffset: this.end.offset,
      reverse: this.reverse,
      containerId: this.containerId,
      surfaceId: this.surfaceId
    }
  }

  isPropertySelection() {
    return true
  }

  getType() {
    return 'property'
  }

  isNull() {
    return false
  }

  isCollapsed() {
    return this.start.offset === this.end.offset;
  }

  isReverse() {
    return this.reverse
  }

  equals(other) {
    return (
      Selection.prototype.equals.call(this, other) &&
      (this.start.equals(other.start) && this.end.equals(other.end))
    )
  }

  toString() {
    
    return [
      "PropertySelection(", JSON.stringify(this.path), ", ",
      this.start.offset, " -> ", this.end.offset,
      (this.reverse?", reverse":""),
      (this.surfaceId?(", "+this.surfaceId):""),
      ")"
    ].join('')
  }

  
  collapse(direction) {
    var offset;
    if (direction === 'left') {
      offset = this.start.offset;
    } else {
      offset = this.end.offset;
    }
    return this.createWithNewRange(offset, offset)
  }

  
  

  
  getPath() {
    return this.start.path;
  }

  getNodeId() {
    return this.start.path[0];
  }

  
  isInsideOf(other, strict) {
    if (other.isNull()) return false
    if (other.isContainerSelection()) {
      return other.contains(this, strict)
    }
    if (strict) {
      return (isArrayEqual(this.path, other.path) &&
        this.start.offset > other.start.offset &&
        this.end.offset < other.end.offset);
    } else {
      return (isArrayEqual(this.path, other.path) &&
        this.start.offset >= other.start.offset &&
        this.end.offset <= other.end.offset);
    }
  }

  
  contains(other, strict) {
    if (other.isNull()) return false
    return other.isInsideOf(this, strict)
  }

  
  overlaps(other, strict) {
    if (other.isNull()) return false
    if (other.isContainerSelection()) {
      
      return other.overlaps(this)
    }
    if (!isArrayEqual(this.path, other.path)) return false
    if (strict) {
      return (! (this.start.offset>=other.end.offset||this.end.offset<=other.start.offset) );
    } else {
      return (! (this.start.offset>other.end.offset||this.end.offset<other.start.offset) );
    }
  }

  
  isRightAlignedWith(other) {
    if (other.isNull()) return false
    if (other.isContainerSelection()) {
      
      return other.isRightAlignedWith(this)
    }
    return (isArrayEqual(this.path, other.path) &&
      this.end.offset === other.end.offset);
  }

  
  isLeftAlignedWith(other) {
    if (other.isNull()) return false
    if (other.isContainerSelection()) {
      
      return other.isLeftAlignedWith(this)
    }
    return (isArrayEqual(this.path, other.path) &&
      this.start.offset === other.start.offset);
  }

  
  expand(other) {
    if (other.isNull()) return this

    
    
    
    if (other.isContainerSelection()) {
      return other.expand(this)
    }
    if (!isArrayEqual(this.path, other.path)) {
      throw new Error('Can not expand PropertySelection to a different property.')
    }
    var newStartOffset = Math.min(this.start.offset, other.start.offset);
    var newEndOffset = Math.max(this.end.offset, other.end.offset);
    return this.createWithNewRange(newStartOffset, newEndOffset);
  }

  
  truncateWith(other) {
    if (other.isNull()) return this
    if (other.isInsideOf(this, 'strict')) {
      
      throw new Error('Can not truncate with a contained selections')
    }
    if (!this.overlaps(other)) {
      return this
    }
    var otherStartOffset, otherEndOffset;
    if (other.isPropertySelection()) {
      otherStartOffset = other.start.offset;
      otherEndOffset = other.end.offset;
    } else if (other.isContainerSelection()) {
      
      if (isArrayEqual(other.start.path, this.start.path)) {
        otherStartOffset = other.start.offset;
      } else {
        otherStartOffset = this.start.offset;
      }
      if (isArrayEqual(other.end.path, this.start.path)) {
        otherEndOffset = other.end.offset;
      } else {
        otherEndOffset = this.end.offset;
      }
    } else {
      return this
    }

    var newStartOffset;
    var newEndOffset;
    if (this.start.offset > otherStartOffset && this.end.offset > otherEndOffset) {
      newStartOffset = otherEndOffset;
      newEndOffset = this.end.offset;
    } else if (this.start.offset < otherStartOffset && this.end.offset < otherEndOffset) {
      newStartOffset = this.start.offset;
      newEndOffset = otherStartOffset;
    } else if (this.start.offset === otherStartOffset) {
      if (this.end.offset <= otherEndOffset) {
        return Selection.nullSelection;
      } else {
        newStartOffset = otherEndOffset;
        newEndOffset = this.end.offset;
      }
    } else if (this.end.offset === otherEndOffset) {
      if (this.start.offset >= otherStartOffset) {
        return Selection.nullSelection;
      } else {
        newStartOffset = this.start.offset;
        newEndOffset = otherStartOffset;
      }
    } else if (other.contains(this)) {
      return Selection.nullSelection
    } else {
      
      throw new Error('Illegal state.')
    }
    return this.createWithNewRange(newStartOffset, newEndOffset)
  }

  
  createWithNewRange(startOffset, endOffset) {
    var sel = new PropertySelection(this.path, startOffset, endOffset, false, this.containerId, this.surfaceId);
    var doc = this._internal.doc;
    if (doc) {
      sel.attach(doc);
    }
    return sel
  }

  _clone() {
    return new PropertySelection(this.start.path, this.start.offset, this.end.offset, this.reverse, this.containerId, this.surfaceId);
  }

}

PropertySelection.fromJSON = function(json) {
  return new PropertySelection(json)
};

class ContainerSelection extends Selection {

  constructor(containerId, startPath, startOffset, endPath, endOffset, reverse, surfaceId) {
    super();

    if (arguments.length === 1) {
      let data = arguments[0];
      containerId = data.containerId;
      startPath = data.startPath;
      startOffset = data.startOffset;
      endPath = data.endPath;
      endOffset = data.endOffset;
      reverse = data.reverse;
      surfaceId = data.surfaceId;
    }

    
    this.containerId = containerId;
    if (!this.containerId) throw new Error('Invalid arguments: `containerId` is mandatory')

    this.start = new Coordinate(startPath, startOffset);
    this.end = new Coordinate(isNil(endPath) ? startPath : endPath, isNil(endOffset) ? startOffset : endOffset);

    this.reverse = Boolean(reverse);

    this.surfaceId = surfaceId;
  }

  

  get startPath() {
    console.warn('DEPRECATED: use sel.start.path instead.');
    return this.start.path
  }

  get startOffset() {
    console.warn('DEPRECATED: use sel.start.offset instead.');
    return this.start.offset
  }

  get endPath() {
    console.warn('DEPRECATED: use sel.end.path instead.');
    return this.end.path
  }

  get endOffset() {
    console.warn('DEPRECATED: use sel.end.offset instead.');
    return this.end.offset
  }

  

  toJSON() {
    return {
      type: 'container',
      containerId: this.containerId,
      startPath: this.start.path,
      startOffset: this.start.offset,
      endPath: this.end.path,
      endOffset: this.end.offset,
      reverse: this.reverse,
      surfaceId: this.surfaceId
    }
  }

  isContainerSelection() {
    return true
  }

  getType() {
    return 'container'
  }

  isNull() {
    return false
  }

  isCollapsed() {
    return this.start.equals(this.end)
  }

  isReverse() {
    return this.reverse
  }

  equals(other) {
    return (
      Selection.prototype.equals.call(this, other) &&
      this.containerId === other.containerId &&
      (this.start.equals(other.start) && this.end.equals(other.end))
    )
  }

  toString() {
    
    return [
      "ContainerSelection(",
      this.containerId, ", ",
      JSON.stringify(this.start.path), ", ", this.start.offset,
      " -> ",
      JSON.stringify(this.end.path), ", ", this.end.offset,
      (this.reverse?", reverse":""),
      (this.surfaceId?(", "+this.surfaceId):""),
      ")"
    ].join('')
  }

  
  getContainer() {
    if (!this._internal.container) {
      this._internal.container = this.getDocument().get(this.containerId);
    }
    return this._internal.container
  }

  isInsideOf(other, strict) {
    
    
    if (other.isNull()) return false
    strict = Boolean(strict);
    let r1 = this._range(this);
    let r2 = this._range(other);
    return (r2.start.isBefore(r1.start, strict) &&
      r1.end.isBefore(r2.end, strict))
  }

  contains(other, strict) {
    
    
    if (other.isNull()) return false
    strict = Boolean(strict);
    let r1 = this._range(this);
    let r2 = this._range(other);
    return (r1.start.isBefore(r2.start, strict) &&
      r2.end.isBefore(r1.end, strict))
  }

  containsNode(nodeId, strict) {
    const container = this.getContainer();
    if (!container.contains(nodeId)) return false
    const coor = new Coordinate([nodeId], 0);
    const address = container.getAddress(coor);
    const r = this._range(this);
    
    let contained = r.start.isBefore(address, strict);
    if (contained) {
      address.offset = 1;
      contained = r.end.isAfter(address, strict);
    }
    return contained
  }

  overlaps(other) {
    let r1 = this._range(this);
    let r2 = this._range(other);
    
    return !(r1.end.isBefore(r2.start, false) ||
      r2.end.isBefore(r1.start, false))
  }

  isLeftAlignedWith(other) {
    let r1 = this._range(this);
    let r2 = this._range(other);
    return r1.start.isEqual(r2.start)
  }

  isRightAlignedWith(other) {
    let r1 = this._range(this);
    let r2 = this._range(other);
    return r1.end.isEqual(r2.end)
  }

  
  collapse(direction) {
    let coor;
    if (direction === 'left') {
      coor = this.start;
    } else {
      coor = this.end;
    }
    return _createNewSelection(this, coor, coor)
  }

  expand(other) {
    let r1 = this._range(this);
    let r2 = this._range(other);
    let start;
    let end;

    if (r1.start.isEqual(r2.start)) {
      start = new Coordinate(this.start.path, Math.min(this.start.offset, other.start.offset));
    } else if (r1.start.isAfter(r2.start)) {
      start = new Coordinate(other.start.path, other.start.offset);
    } else {
      start = this.start;
    }
    if (r1.end.isEqual(r2.end)) {
      end = new Coordinate(this.end.path, Math.max(this.end.offset, other.end.offset));
    } else if (r1.end.isBefore(r2.end, false)) {
      end = new Coordinate(other.end.path, other.end.offset);
    } else {
      end = this.end;
    }

    return _createNewSelection(this, start, end)
  }

  truncateWith(other) {
    if (other.isInsideOf(this, 'strict')) {
      
      throw new Error('Can not truncate with a contained selections')
    }
    if (!this.overlaps(other)) {
      return this
    }
    let r1 = this._range(this);
    let r2 = this._range(other);
    let start, end;
    if (r2.start.isBefore(r1.start, 'strict') && r2.end.isBefore(r1.end, 'strict')) {
      start = other.end;
      end = this.end;
    } else if (r1.start.isBefore(r2.start, 'strict') && r1.end.isBefore(r2.end, 'strict')) {
      start = this.start;
      end = other.start;
    } else if (r1.start.isEqual(r2.start)) {
      if (r2.end.isBefore(r1.end, 'strict')) {
        start = other.end;
        end = this.end;
      } else {
        
        return Selection.nullSelection
      }
    } else if (r1.end.isEqual(r2.end)) {
      if (r1.start.isBefore(r2.start, 'strict')) {
        start = this.start;
        end = other.start;
      } else {
        
        return Selection.nullSelection
      }
    } else if (this.isInsideOf(other)) {
      return Selection.nullSelection
    } else {
      throw new Error('Could not determine coordinates for truncate. Check input')
    }
    return _createNewSelection(this, start, end)
  }

  
  getNodeIds() {
    const container = this.getContainer();
    const startPos = container.getPosition(this.start.path[0]);
    const endPos = container.getPosition(this.end.path[0]);
    return container.getContent().slice(startPos, endPos+1)
  }

  
  splitIntoPropertySelections() {
    let sels = [];
    let fragments = this.getFragments();
    fragments.forEach(function(fragment) {
      if (fragment instanceof Selection.Fragment) {
        sels.push(
          new PropertySelection(fragment.path, fragment.startOffset,
            fragment.endOffset, false, this.containerId, this.surfaceId)
        );
      }
    }.bind(this));
    return sels
  }

  _clone() {
    return new ContainerSelection(this)
  }

  _range(sel) {
    
    
    
    if (sel._internal.addressRange) {
      return sel._internal.addressRange
    }

    let container = this.getContainer();
    let startAddress = container.getAddress(sel.start);
    let endAddress;
    if (sel.isCollapsed()) {
      endAddress = startAddress;
    } else {
      endAddress = container.getAddress(sel.end);
    }
    let addressRange = {
      start: startAddress,
      end: endAddress
    };
    if (sel._isContainerSelection) {
      sel._internal.addressRange = addressRange;
    }
    return addressRange
  }

  get path() {
    throw new Error('ContainerSelection has no path property. Use startPath and endPath instead')
  }

}

ContainerSelection.prototype._isContainerSelection = true;

ContainerSelection.fromJSON = function(properties) {
  let sel = new ContainerSelection(properties);
  return sel
};

function _createNewSelection(containerSel, start, end) {
  let newSel;

  if (start === end) {
    newSel = new PropertySelection({
      path: start.path,
      startOffset: start.offset,
      endOffset: start.offset,
      containerId: containerSel.containerId,
      surfaceId: containerSel.surfaceId
    });
  } else {
    newSel = new ContainerSelection(containerSel.containerId,
    start.path, start.offset, end.path, end.offset, false, containerSel.surfaceId);
  }
  
  const doc = containerSel._internal.doc;
  if (doc) {
    newSel.attach(doc);
  }
  return newSel
}

class NodeSelection extends Selection {

  constructor(containerId, nodeId, mode, reverse, surfaceId) {
    super();

    if (arguments.length === 1) {
      let data = arguments[0];
      containerId = data.containerId;
      nodeId = data.nodeId;
      mode = data.mode;
      reverse = data.reverse;
      surfaceId = data.surfaceId;
    }

    if (!isString$1(containerId)) {
      throw new Error("'containerId' is mandatory.");
    }
    if (!isString$1(nodeId)) {
      throw new Error("'nodeId' is mandatory.");
    }
    mode = mode || "full";

    this.containerId = containerId;
    this.nodeId = nodeId;
    this.mode = mode;
    this.reverse = Boolean(reverse);
    this.surfaceId = surfaceId;

    this.start = new Coordinate([nodeId], 0);
    this.end = new Coordinate([nodeId], 1);
  }

  equals(other) {
    return (
      super.equals(other) &&
      this.nodeId === other.nodeId &&
      this.mode === other.mode
    )
  }

  isNodeSelection() {
    return true;
  }

  getType() {
    return 'node';
  }

  getNodeId() {
    return this.nodeId;
  }

  isFull() {
    return this.mode === 'full';
  }

  isBefore() {
    return this.mode === 'before';
  }

  isAfter() {
    return this.mode === 'after';
  }

  isCollapsed() {
    return this.mode !== 'full';
  }

  toJSON() {
    return {
      type: 'node',
      nodeId: this.nodeId,
      mode: this.mode,
      reverse: this.reverse,
      containerId: this.containerId,
      surfaceId: this.surfaceId
    };
  }

  toString() {
    
    return [
      "NodeSelection(",
      this.containerId, ".", this.nodeId, ", ",
      this.mode, ", ",
      (this.reverse?", reverse":""),
      (this.surfaceId?(", "+this.surfaceId):""),
      ")"
    ].join('');
  }

  collapse(direction) {
    if (direction === 'left') {
      if (this.isBefore()) {
        return this;
      } else {
        return new NodeSelection(this.containerId, this.nodeId, 'before', this.reverse, this.surfaceId);
      }
    } else if (direction === 'right') {
      if (this.isAfter()) {
        return this;
      } else {
        return new NodeSelection(this.containerId, this.nodeId, 'after', this.reverse, this.surfaceId);
      }
    } else {
      throw new Error("'direction' must be either 'left' or 'right'");
    }
  }

  _getCoordinate() {
    if (this.mode === 'before') {
      return new Coordinate([this.nodeId], 0);
    } else if (this.mode === 'after') {
      return new Coordinate([this.nodeId], 1);
    }
  }

  _clone() {
    return new NodeSelection(this);
  }
}

NodeSelection.prototype._isNodeSelection = true;

NodeSelection.fromJSON = function(json) {
  return new NodeSelection(json);
};


NodeSelection._createFromCoordinate = function(coor) {
  var containerId = coor.containerId;
  var nodeId = coor.getNodeId();
  var mode = coor.offset === 0 ? 'before' : 'after';
  return new NodeSelection(containerId, nodeId, mode, false);
};

class CustomSelection extends Selection {

  constructor(customType, data, surfaceId) {
    super();

    if (arguments.length === 1) {
      let _data = arguments[0];
      customType = _data.customType;
      data = _data.data;
      surfaceId = _data.surfaceId;
    }

    this.customType = customType;
    this.data = data || {};
    this.surfaceId = surfaceId;
  }

  isCustomSelection() {
    return true;
  }

  getType() {
    return 'custom';
  }

  getCustomType() {
    return this.customType;
  }

  toJSON() {
    return {
      type: 'custom',
      customType: this.customType,
      data: cloneDeep(this.data),
      surfaceId: this.surfaceId
    };
  }

  toString() {
    
    return [
      'CustomSelection(',
      this.customType,', ',
      JSON.stringify(this.data),
      ")"
    ].join('');
  }

  equals(other) {
    return (
      Selection.prototype.equals.call(this, other) &&
      other.isCustomSelection() &&
      isEqual(this.data, other.data)
    );
  }

  _clone() {
    return new CustomSelection(this)
  }
}

CustomSelection.prototype._isCustomSelection = true;

CustomSelection.fromJSON = function(json) {
  return new CustomSelection(json);
};

function fromJSON(json) {
  if (!json) return Selection.nullSelection
  var type = json.type;
  switch(type) {
    case 'property':
      return PropertySelection.fromJSON(json)
    case 'container':
      return ContainerSelection.fromJSON(json)
    case 'node':
      return NodeSelection.fromJSON(json)
    case 'custom':
      return CustomSelection.fromJSON(json)
    default:
      
      return Selection.nullSelection
  }
}


function isFirst(doc, coor) {
  if (coor.isNodeCoordinate() && coor.offset === 0) return true
  let node = doc.get(coor.path[0]).getContainerRoot();
  if (node.isText() && coor.offset === 0) return true
  if (node.isList()) {
    let itemId = coor.path[0];
    if (node.items[0] === itemId && coor.offset === 0) return true
  }
}


function isLast(doc, coor) {
  if (coor.isNodeCoordinate() && coor.offset > 0) return true
  let node = doc.get(coor.path[0]).getContainerRoot();
  if (node.isText() && coor.offset >= node.getLength()) return true
  if (node.isList()) {
    let itemId = coor.path[0];
    let item = doc.get(itemId);
    if (last$1(node.items) === itemId && coor.offset === item.getLength()) return true
  }
}

function isEntirelySelected(doc, node, start, end) {
  let { isEntirelySelected } = getRangeInfo(doc, node, start, end);
  return isEntirelySelected
}

function getRangeInfo(doc, node, start, end) {
  let isFirst = true;
  let isLast = true;
  if (node.isText()) {
    if (start && start.offset !== 0) isFirst = false;
    if (end && end.offset < node.getLength()) isLast = false;
  } else if (node.isList()) {
    if (start) {
      let itemId = start.path[0];
      let itemPos = node.getItemPosition(itemId);
      if (itemPos > 0 || start.offset !== 0) isFirst = false;
    }
    if (end) {
      let itemId = end.path[0];
      let itemPos = node.getItemPosition(itemId);
      let item = doc.get(itemId);
      if (itemPos < node.items.length-1 || end.offset < item.getLength()) isLast = false;
    }
  }
  let isEntirelySelected = isFirst && isLast;
  return {isFirst, isLast, isEntirelySelected}
}

function setCursor(tx, node, containerId, mode) {
  if (node.isText()) {
    let offset = 0;
    if (mode === 'after') {
      let text = node.getText();
      offset = text.length;
    }
    tx.setSelection({
      type: 'property',
      path: node.getTextPath(),
      startOffset: offset,
      containerId: containerId
    });
  } else if (node.isList()) {
    let item, offset;
    if (mode === 'after') {
      item = node.getLastItem();
      offset = item.getLength();
    } else {
      item = node.getFirstItem();
      offset = 0;
    }
    tx.setSelection({
      type: 'property',
      path: item.getTextPath(),
      startOffset: offset,
      containerId: containerId
    });
  } else {
    tx.setSelection({
      type: 'node',
      containerId: containerId,
      nodeId: node.id,
      
      
      
    });
  }
}

function selectNode(tx, nodeId, containerId) {
  tx.setSelection(createNodeSelection({ doc: tx, nodeId, containerId }));
}

function createNodeSelection({ doc, nodeId, containerId, mode, reverse, surfaceId}) {
  let node = doc.get(nodeId);
  if (!node) return Selection.nullSelection
  node = node.getContainerRoot();
  if (node.isText()) {
    return new PropertySelection({
      path: node.getTextPath(),
      startOffset: mode === 'after' ? node.getLength() : 0,
      endOffset: mode === 'before' ? 0 : node.getLength(),
      reverse: reverse,
      containerId: containerId,
      surfaceId: surfaceId
    })
  } else if (node.isList() && node.getLength()>0) {
    let first = node.getFirstItem();
    let last$$1 = node.getLastItem();
    let start = {
      path: first.getTextPath(),
      offset: 0
    };
    let end = {
      path: last$$1.getTextPath(),
      offset: last$$1.getLength()
    };
    if (mode === 'after') start = end;
    else if (mode === 'before') end = start;
    return new ContainerSelection({
      startPath: start.path,
      startOffset: start.offset,
      endPath: end.path,
      endOffset: end.offset,
      reverse: reverse,
      containerId: containerId,
      surfaceId: surfaceId
    })
  } else {
    return new NodeSelection({ nodeId, mode, reverse, containerId, surfaceId })
  }
}

function stepIntoIsolatedNode(editorSession, comp) {
  
  
  if (comp.grabFocus()) return true

  
  let surface = comp.find('.sc-surface');
  if (surface) {
    
    if (surface._isTextPropertyEditor) {
      const doc = editorSession.getDocument();
      const path = surface.getPath();
      const text = doc.get(path, 'strict');
      editorSession.setSelection({
        type: 'property',
        path: path,
        startOffset: text.length,
        surfaceId: surface.id
      });
      return true
    } else if (surface._isContainerEditor) {
      let container = surface.getContainer();
      if (container.length > 0) {
        let first = container.getChildAt(0);
        setCursor(editorSession, first, container.id, 'after');
      }
      return true
    }
  }
  return false
}

function augmentSelection(selData, oldSel) {
  
  if (selData && oldSel && !selData.surfaceId && !oldSel.isNull()) {
    selData.containerId = selData.containerId || oldSel.containerId;
    selData.surfaceId = selData.surfaceId || oldSel.surfaceId;
  }
  return selData
}


var selectionHelpers = Object.freeze({
	fromJSON: fromJSON,
	isFirst: isFirst,
	isLast: isLast,
	isEntirelySelected: isEntirelySelected,
	getRangeInfo: getRangeInfo,
	setCursor: setCursor,
	selectNode: selectNode,
	createNodeSelection: createNodeSelection,
	stepIntoIsolatedNode: stepIntoIsolatedNode,
	augmentSelection: augmentSelection
});

class Conflict extends Error {
  constructor(a, b) {
    super("Conflict: " + JSON.stringify(a) +" vs " + JSON.stringify(b));
    this.a = a;
    this.b = b;
  }
}

const INSERT = "insert";
const DELETE$1 = "delete";

class TextOperation {

  constructor(data) {
    if (!data || data.type === undefined || data.pos === undefined || data.str === undefined) {
      throw new Error("Illegal argument: insufficient data.")
    }
    
    this.type = data.type;
    
    this.pos = data.pos;
    
    this.str = data.str;
    
    if(!this.isInsert() && !this.isDelete()) {
      throw new Error("Illegal type.")
    }
    if (!isString$1(this.str)) {
      throw new Error("Illegal argument: expecting string.")
    }
    if (!isNumber(this.pos) || this.pos < 0) {
      throw new Error("Illegal argument: expecting positive number as pos.")
    }
  }

  apply(str) {
    if (this.isEmpty()) return str
    if (this.type === INSERT) {
      if (str.length < this.pos) {
        throw new Error("Provided string is too short.")
      }
      if (str.splice) {
        return str.splice(this.pos, 0, this.str)
      } else {
        return str.slice(0, this.pos).concat(this.str).concat(str.slice(this.pos))
      }
    }
    else  {
      if (str.length < this.pos + this.str.length) {
        throw new Error("Provided string is too short.")
      }
      if (str.splice) {
        return str.splice(this.pos, this.str.length)
      } else {
        return str.slice(0, this.pos).concat(str.slice(this.pos + this.str.length))
      }
    }
  }

  clone() {
    return new TextOperation(this)
  }

  isNOP() {
    return this.type === "NOP" || this.str.length === 0
  }

  isInsert() {
    return this.type === INSERT
  }

  isDelete() {
    return this.type === DELETE$1
  }

  getLength() {
    return this.str.length
  }

  invert() {
    var data = {
      type: this.isInsert() ? DELETE$1 : INSERT,
      pos: this.pos,
      str: this.str
    };
    return new TextOperation(data)
  }

  hasConflict(other) {
    return _hasConflict(this, other)
  }

  isEmpty() {
    return this.str.length === 0
  }

  toJSON() {
    return {
      type: this.type,
      pos: this.pos,
      str: this.str
    }
  }

  toString() {
    return ["(", (this.isInsert() ? INSERT : DELETE$1), ",", this.pos, ",'", this.str, "')"].join('')
  }
}

TextOperation.prototype._isOperation = true;
TextOperation.prototype._isTextOperation = true;

function _hasConflict(a, b) {
  
  
  
  if (a.type === INSERT && b.type === INSERT) return (a.pos === b.pos)
  
  
  
  if (a.type === DELETE$1 && b.type === DELETE$1) {
    
    return !(a.pos >= b.pos + b.str.length || b.pos >= a.pos + a.str.length)
  }
  
  
  
  var del, ins;
  if (a.type === DELETE$1) {
    del = a; ins = b;
  } else {
    del = b; ins = a;
  }
  return (ins.pos >= del.pos && ins.pos < del.pos + del.str.length)
}




function transform_insert_insert(a, b) {
  if (a.pos === b.pos) {
    b.pos += a.str.length;
  }
  else if (a.pos < b.pos) {
    b.pos += a.str.length;
  }
  else {
    a.pos += b.str.length;
  }
}





function transform_delete_delete$1(a, b, first) {
  
  if (a.pos > b.pos) {
    return transform_delete_delete$1(b, a, !first)
  }
  if (a.pos === b.pos && a.str.length > b.str.length) {
    return transform_delete_delete$1(b, a, !first)
  }
  
  if (b.pos < a.pos + a.str.length) {
    var s = b.pos - a.pos;
    var s1 = a.str.length - s;
    var s2 = s + b.str.length;
    a.str = a.str.slice(0, s) + a.str.slice(s2);
    b.str = b.str.slice(s1);
    b.pos -= s;
  } else {
    b.pos -= a.str.length;
  }
}





function transform_insert_delete(a, b) {
  if (a.type === DELETE$1) {
    return transform_insert_delete(b, a)
  }
  
  
  if (a.pos <= b.pos) {
    b.pos += a.str.length;
  }
  
  else if (a.pos >= b.pos + b.str.length) {
    a.pos -= b.str.length;
  }
  
  
  
  else {
    var s = a.pos - b.pos;
    b.str = b.str.slice(0, s) + a.str + b.str.slice(s);
    a.str = "";
  }
}

function transform$1(a, b, options) {
  options = options || {};
  if (options["no-conflict"] && _hasConflict(a, b)) {
    throw new Conflict(a, b)
  }
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.type === INSERT && b.type === INSERT) {
    transform_insert_insert(a, b);
  }
  else if (a.type === DELETE$1 && b.type === DELETE$1) {
    transform_delete_delete$1(a, b, true);
  }
  else {
    transform_insert_delete(a,b);
  }
  return [a, b]
}

TextOperation.transform = function() {
  return transform$1.apply(null, arguments)
};



TextOperation.Insert = function(pos, str) {
  return new TextOperation({ type: INSERT, pos: pos, str: str })
};

TextOperation.Delete = function(pos, str) {
  return new TextOperation({ type: DELETE$1, pos: pos, str: str })
};

TextOperation.INSERT = INSERT;
TextOperation.DELETE = DELETE$1;

TextOperation.fromJSON = function(data) {
  return new TextOperation(data)
};

const NOP$1 = "NOP";
const DELETE$2 = "delete";
const INSERT$1 = "insert";

class ArrayOperation {

  constructor(data) {
    if (!data || !data.type) {
      throw new Error("Illegal argument: insufficient data.")
    }
    this.type = data.type;
    if (this.type === NOP$1) return

    if (this.type !== INSERT$1 && this.type !== DELETE$2) {
      throw new Error("Illegal type.")
    }
    
    this.pos = data.pos;
    
    this.val = data.val;
    if (!isNumber(this.pos) || this.pos < 0) {
      throw new Error("Illegal argument: expecting positive number as pos.")
    }
  }

  apply(array) {
    if (this.type === NOP$1) {
      return array
    }
    if (this.type === INSERT$1) {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.")
      }
      array.splice(this.pos, 0, this.val);
      return array
    }
    
    else  {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.")
      }
      if (!isEqual(array[this.pos], this.val)) {
        throw Error("Unexpected value at position " + this.pos + ". Expected " + this.val + ", found " + array[this.pos])
      }
      array.splice(this.pos, 1);
      return array
    }
  }

  clone() {
    var data = {
      type: this.type,
      pos: this.pos,
      val: cloneDeep(this.val)
    };
    return new ArrayOperation(data)
  }

  invert() {
    var data = this.toJSON();
    if (this.type === NOP$1) data.type = NOP$1;
    else if (this.type === INSERT$1) data.type = DELETE$2;
    else  data.type = INSERT$1;
    return new ArrayOperation(data)
  }

  hasConflict(other) {
    return ArrayOperation.hasConflict(this, other)
  }

  toJSON() {
    var result = {
      type: this.type,
    };
    if (this.type === NOP$1) return result
    result.pos = this.pos;
    result.val = cloneDeep(this.val);
    return result
  }

  isInsert() {
    return this.type === INSERT$1
  }

  isDelete() {
    return this.type === DELETE$2
  }

  getOffset() {
    return this.pos
  }

  getValue() {
    return this.val
  }

  isNOP() {
    return this.type === NOP$1
  }

  toString() {
    return ["(", (this.isInsert() ? INSERT$1 : DELETE$2), ",", this.getOffset(), ",'", this.getValue(), "')"].join('')
  }
}

ArrayOperation.prototype._isOperation = true;
ArrayOperation.prototype._isArrayOperation = true;

function hasConflict$1(a, b) {
  if (a.type === NOP$1 || b.type === NOP$1) return false
  if (a.type === INSERT$1 && b.type === INSERT$1) {
    return a.pos === b.pos
  } else {
    return false
  }
}

function transform_insert_insert$1(a, b) {
  if (a.pos === b.pos) {
    b.pos += 1;
  }
  
  else if (a.pos < b.pos) {
    b.pos += 1;
  }
  
  else {
    a.pos += 1;
  }
}

function transform_delete_delete$2(a, b) {
  
  if (a.pos === b.pos) {
    b.type = NOP$1;
    a.type = NOP$1;
    return
  }
  if (a.pos < b.pos) {
    b.pos -= 1;
  } else {
    a.pos -= 1;
  }
}

function transform_insert_delete$1(a, b) {
  
  if (a.type === DELETE$2) {
    var tmp = a;
    a = b;
    b = tmp;
  }
  if (a.pos <= b.pos) {
    b.pos += 1;
  } else {
    a.pos -= 1;
  }
}

var transform$2 = function(a, b, options) {
  options = options || {};
  
  
  if (options['no-conflict'] && hasConflict$1(a, b)) {
    throw new Conflict(a, b)
  }
  
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.type === NOP$1 || b.type === NOP$1) {
    
  }
  else if (a.type === INSERT$1 && b.type === INSERT$1) {
    transform_insert_insert$1(a, b);
  }
  else if (a.type === DELETE$2 && b.type === DELETE$2) {
    transform_delete_delete$2(a, b);
  }
  else {
    transform_insert_delete$1(a, b);
  }
  return [a, b]
};

ArrayOperation.transform = transform$2;
ArrayOperation.hasConflict = hasConflict$1;



ArrayOperation.Insert = function(pos, val) {
  return new ArrayOperation({type:INSERT$1, pos: pos, val: val})
};

ArrayOperation.Delete = function(pos, val) {
  return new ArrayOperation({ type:DELETE$2, pos: pos, val: val })
};

ArrayOperation.fromJSON = function(data) {
  return new ArrayOperation(data)
};

ArrayOperation.NOP = NOP$1;
ArrayOperation.DELETE = DELETE$2;
ArrayOperation.INSERT = INSERT$1;

const SHIFT = 'shift';

class CoordinateOperation {

  constructor(data) {
    if (!data || data.type === undefined) {
      throw new Error("Illegal argument: insufficient data.")
    }
    
    this.type = data.type;
    
    this.val = data.val;
    
    if(!this.isShift()) {
      throw new Error("Illegal type.")
    }
    if (!isNumber(this.val)) {
      throw new Error("Illegal argument: expecting number as shift value.")
    }
  }

  apply(coor) {
    coor.offset = coor.offset + this.val;
  }

  isShift() {
    return this.type === SHIFT
  }

  isNOP() {
    switch (this.type) {
      case SHIFT: {
        return this.val === 0
      }
      default:
        return false
    }
  }

  clone() {
    return new CoordinateOperation(this)
  }

  invert() {
    let data;
    switch (this.type) {
      case SHIFT:
        data = {
          type: SHIFT,
          val: -this.val
        };
        break
      default:
        throw new Error('Invalid type.')
    }
    return new CoordinateOperation(data)
  }

  hasConflict() {
    
    return false
  }

  toJSON() {
    return {
      type: this.type,
      val: this.val
    }
  }

  toString() {
    return ["(", (this.type), ",", this.val, "')"].join('')
  }

}

CoordinateOperation.prototype._isOperation = true;
CoordinateOperation.prototype._isCoordinateOperation = true;

function transform_shift_shift(a, b) {
  a.val += b.val;
  b.val += a.val;
}

function transform$3(a, b, options) {
  options = options || {};
  
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.type === SHIFT && b.type === SHIFT) {
    transform_shift_shift(a, b);
  }
  else {
    throw new Error('Illegal type')
  }
  return [a, b]
}

CoordinateOperation.transform = function(...args) {
  return transform$3(...args)
};

CoordinateOperation.fromJSON = function(json) {
  return new CoordinateOperation(json)
};

CoordinateOperation.Shift = function(val) {
  return new CoordinateOperation({
    type: SHIFT,
    val: val
  })
};

const NOP = "NOP";
const CREATE = "create";
const DELETE = 'delete';
const UPDATE = 'update';
const SET = 'set';

class ObjectOperation {

  constructor(data) {
    
    if (!data) {
      throw new Error('Data of ObjectOperation is missing.')
    }
    
    if (!data.type) {
      throw new Error('Invalid data: type is mandatory.')
    }
    this.type = data.type;
    if (data.type === NOP) {
      return
    }
    this.path = data.path;
    if (!data.path) {
      throw new Error('Invalid data: path is mandatory.')
    }
    if (this.type === CREATE || this.type === DELETE) {
      if (!data.val) {
        throw new Error('Invalid data: value is missing.')
      }
      this.val = data.val;
    }
    else if (this.type === UPDATE) {
      if (data.diff) {
        this.diff = data.diff;
        if (data.diff._isTextOperation) {
          this.propertyType = 'string';
        } else if (data.diff._isArrayOperation) {
          this.propertyType = 'array';
        } else if (data.diff._isCoordinateOperation) {
          this.propertyType = 'coordinate';
        } else {
          throw new Error('Invalid data: diff must be a TextOperation or an ArrayOperation.')
        }
      } else {
        throw new Error("Invalid data: diff is mandatory for update operation.")
      }
    }
    else if (this.type === SET) {
      this.val = data.val;
      this.original = data.original;
    } else {
      throw new Error('Invalid type: '+ data.type)
    }
  }

  apply(obj) {
    if (this.type === NOP) return obj
    var adapter;
    if (obj._isPathObject) {
      adapter = obj;
    } else {
      adapter = new PathObject(obj);
    }
    if (this.type === CREATE) {
      adapter.set(this.path, cloneDeep(this.val));
      return obj
    }
    if (this.type === DELETE) {
      adapter.delete(this.path, "strict");
    }
    else if (this.type === UPDATE) {
      var diff$$1 = this.diff;
      switch (this.propertyType) {
        case 'array': {
          let arr = adapter.get(this.path);
          diff$$1.apply(arr);
          break
        }
        case 'string': {
          let str = adapter.get(this.path);
          if (isNil(str)) str = '';
          str = diff$$1.apply(str);
          adapter.set(this.path, str);
          break
        }
        case 'coordinate': {
          let coor = adapter.get(this.path);
          if (!coor) throw new Error('No coordinate with path '+this.path)
          diff$$1.apply(coor);
          break
        }
        default:
          throw new Error('Invalid state.')
      }
    }
    else if (this.type === SET) {
      
      adapter.set(this.path, cloneDeep(this.val));
    }
    else {
      throw new Error('Invalid type.')
    }
    return obj
  }

  clone() {
    var data = {
      type: this.type,
      path: this.path,
    };
    if (this.val) {
      data.val = cloneDeep(this.val);
    }
    if (this.diff) {
      data.diff = this.diff.clone();
    }
    return new ObjectOperation(data)
  }

  isNOP() {
    if (this.type === NOP) return true
    else if (this.type === UPDATE) return this.diff.isNOP()
  }

  isCreate() {
    return this.type === CREATE
  }

  isDelete() {
    return this.type === DELETE
  }

  isUpdate(propertyType) {
    if (propertyType) {
      return (this.type === UPDATE && this.propertyType === propertyType)
    } else {
      return this.type === UPDATE
    }
  }

  isSet() {
    return this.type === SET
  }

  invert() {
    if (this.type === NOP) {
      return new ObjectOperation({ type: NOP })
    }
    var result = new ObjectOperation(this);
    if (this.type === CREATE) {
      result.type = DELETE;
    }
    else if (this.type === DELETE) {
      result.type = CREATE;
    }
    else if (this.type === UPDATE) {
      var invertedDiff;
      if (this.diff._isTextOperation) {
        invertedDiff = TextOperation.fromJSON(this.diff.toJSON()).invert();
      } else if (this.diff._isArrayOperation) {
        invertedDiff = ArrayOperation.fromJSON(this.diff.toJSON()).invert();
      } else if (this.diff._isCoordinateOperation) {
        invertedDiff = CoordinateOperation.fromJSON(this.diff.toJSON()).invert();
      } else {
        throw new Error('Illegal type')
      }
      result.diff = invertedDiff;
    }
    else  {
      result.val = this.original;
      result.original = this.val;
    }
    return result
  }

  hasConflict(other) {
    return ObjectOperation.hasConflict(this, other)
  }

  toJSON() {
    if (this.type === NOP) {
      return { type: NOP }
    }
    var data = {
      type: this.type,
      path: this.path,
    };
    if (this.type === CREATE || this.type === DELETE) {
      data.val = this.val;
    }
    else if (this.type === UPDATE) {
      if (this.diff._isTextOperation) {
        data.propertyType = "string";
      } else if (this.diff._isArrayOperation) {
        data.propertyType = "array";
      } else if (this.diff._isCoordinateOperation) {
        data.propertyType = "coordinate";
      } else {
        throw new Error('Invalid property type.')
      }
      data.diff = this.diff.toJSON();
    }
    else  {
      data.val = this.val;
      data.original = this.original;
    }
    return data
  }

  getType() {
    return this.type
  }

  getPath() {
    return this.path
  }

  getValue() {
    return this.val
  }

  getOldValue() {
    return this.original
  }

  getValueOp() {
    return this.diff
  }

  
  toString() {
    switch (this.type) {
      case CREATE:
        return ["(+,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('')
      case DELETE:
        return ["(-,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('')
      case UPDATE:
        return ["(>>,", JSON.stringify(this.path), this.propertyType, this.diff.toString(), ")"].join('')
      case SET:
        return ["(=,", JSON.stringify(this.path), this.val, this.original, ")"].join('')
      case NOP:
        return "NOP"
      default:
        throw new Error('Invalid type')
    }
  }
}

ObjectOperation.prototype._isOperation = true;
ObjectOperation.prototype._isObjectOperation = true;



function hasConflict(a, b) {
  if (a.type === NOP || b.type === NOP) return false
  return isEqual(a.path, b.path)
}

function transform_delete_delete(a, b) {
  
  
  a.type = NOP;
  b.type = NOP;
}

function transform_create_create() {
  throw new Error("Can not transform two concurring creates of the same property")
}

function transform_delete_create() {
  throw new Error('Illegal state: can not create and delete a value at the same time.')
}

function transform_delete_update(a, b, flipped) {
  if (a.type !== DELETE) {
    return transform_delete_update(b, a, true)
  }
  var op;
  switch (b.propertyType) {
    case 'string':
      op = TextOperation.fromJSON(b.diff);
      break
    case 'array':
      op = ArrayOperation.fromJSON(b.diff);
      break
    case 'coordinate':
      op = CoordinateOperation.fromJSON(b.diff);
      break
    default:
      throw new Error('Illegal type')
  }
  
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.val = op.apply(a.val);
  }
  
  else {
    a.val = op.apply(a.val);
    b.type = NOP;
  }
}

function transform_create_update() {
  
  throw new Error("Can not transform a concurring create and update of the same property")
}

function transform_update_update(a, b) {
  
  var op_a, op_b, t;
  switch(b.propertyType) {
    case 'string':
      op_a = TextOperation.fromJSON(a.diff);
      op_b = TextOperation.fromJSON(b.diff);
      t = TextOperation.transform(op_a, op_b, {inplace: true});
      break
    case 'array':
      op_a = ArrayOperation.fromJSON(a.diff);
      op_b = ArrayOperation.fromJSON(b.diff);
      t = ArrayOperation.transform(op_a, op_b, {inplace: true});
      break
    case 'coordinate':
      op_a = CoordinateOperation.fromJSON(a.diff);
      op_b = CoordinateOperation.fromJSON(b.diff);
      t = CoordinateOperation.transform(op_a, op_b, {inplace: true});
      break
    default:
      throw new Error('Illegal type')
  }
  a.diff = t[0];
  b.diff = t[1];
}

function transform_create_set() {
  throw new Error('Illegal state: can not create and set a value at the same time.')
}

function transform_delete_set(a, b, flipped) {
  if (a.type !== DELETE) return transform_delete_set(b, a, true)
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.original = undefined;
  } else {
    a.val = b.val;
    b.type = NOP;
  }
}

function transform_update_set() {
  throw new Error("Unresolvable conflict: update + set.")
}

function transform_set_set(a, b) {
  a.type = NOP;
  b.original = a.val;
}

const _NOP = 0;
const _CREATE = 1;
const _DELETE = 2;
const _UPDATE = 4;
const _SET = 8;

const CODE = (() => {
  const c = {};
  c[NOP] =_NOP;
  c[CREATE] = _CREATE;
  c[DELETE] = _DELETE;
  c[UPDATE] = _UPDATE;
  c[SET] = _SET;
  return c
})();

const __transform__ = (() => {
  
  const t = {};
  t[_DELETE | _DELETE] = transform_delete_delete;
  t[_DELETE | _CREATE] = transform_delete_create;
  t[_DELETE | _UPDATE] = transform_delete_update;
  t[_CREATE | _CREATE] = transform_create_create;
  t[_CREATE | _UPDATE] = transform_create_update;
  t[_UPDATE | _UPDATE] = transform_update_update;
  t[_CREATE | _SET   ] = transform_create_set;
  t[_DELETE | _SET   ] = transform_delete_set;
  t[_UPDATE | _SET   ] = transform_update_set;
  t[_SET    | _SET   ] = transform_set_set;
  
  return t
})();

function transform(a, b, options) {
  options = options || {};
  if (options['no-conflict'] && hasConflict(a, b)) {
    throw new Conflict(a, b)
  }
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.isNOP() || b.isNOP()) {
    return [a, b]
  }
  var sameProp = isEqual(a.path, b.path);
  
  if (sameProp) {
    __transform__[CODE[a.type] | CODE[b.type]](a,b);
  }
  return [a, b]
}

ObjectOperation.transform = transform;
ObjectOperation.hasConflict = hasConflict;



ObjectOperation.Create = function(idOrPath, val) {
  var path;
  if (isString$1(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: CREATE, path: path, val: val})
};

ObjectOperation.Delete = function(idOrPath, val) {
  var path;
  if (isString$1(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: DELETE, path: path, val: val})
};

ObjectOperation.Update = function(path, op) {
  return new ObjectOperation({
    type: UPDATE,
    path: path,
    diff: op
  })
};

ObjectOperation.Set = function(path, oldVal, newVal) {
  return new ObjectOperation({
    type: SET,
    path: path,
    val: cloneDeep(newVal),
    original: cloneDeep(oldVal)
  })
};

ObjectOperation.fromJSON = function(data) {
  data = cloneDeep(data);
  if (data.type === "update") {
    switch (data.propertyType) {
      case "string":
        data.diff = TextOperation.fromJSON(data.diff);
        break
      case "array":
        data.diff = ArrayOperation.fromJSON(data.diff);
        break
      case "coordinate":
        data.diff = CoordinateOperation.fromJSON(data.diff);
        break
      default:
        throw new Error("Unsupported update diff:" + JSON.stringify(data.diff))
    }
  }
  var op = new ObjectOperation(data);
  return op
};

ObjectOperation.NOP = NOP;
ObjectOperation.CREATE = CREATE;
ObjectOperation.DELETE = DELETE;
ObjectOperation.UPDATE = UPDATE;
ObjectOperation.SET = SET;

function transformDocumentChange(A, B) {
  _transformInplaceBatch(A, B);
}

function transformSelection(sel, a) {
  let newSel = sel.clone();
  let hasChanged = _transformSelectionInplace(newSel, a);
  if (hasChanged) {
    return newSel
  } else {
    return sel
  }
}

function _transformInplaceSingle(a, b) {
  for (let i = 0; i < a.ops.length; i++) {
    let a_op = a.ops[i];
    for (let j = 0; j < b.ops.length; j++) {
      let b_op = b.ops[j];
      
      
      ObjectOperation.transform(a_op, b_op, {inplace: true});
    }
  }
  if (a.before) {
    _transformSelectionInplace(a.before.selection, b);
  }
  if (a.after) {
    _transformSelectionInplace(a.after.selection, b);
  }
  if (b.before) {
    _transformSelectionInplace(b.before.selection, a);
  }
  if (b.after) {
    _transformSelectionInplace(b.after.selection, a);
  }
}

function _transformInplaceBatch(A, B) {
  if (!isArray$1(A)) {
    A = [A];
  }
  if (!isArray$1(B)) {
    B = [B];
  }
  for (let i = 0; i < A.length; i++) {
    let a = A[i];
    for (let j = 0; j < B.length; j++) {
      let b = B[j];
      _transformInplaceSingle(a,b);
    }
  }
}

function _transformSelectionInplace(sel, a) {
  if (!sel || (!sel.isPropertySelection() && !sel.isContainerSelection()) ) {
    return false
  }
  let ops = a.ops;
  let hasChanged = false;
  let isCollapsed = sel.isCollapsed();
  for(let i=0; i<ops.length; i++) {
    let op = ops[i];
    hasChanged |= _transformCoordinateInplace(sel.start, op);
    if (!isCollapsed) {
      hasChanged |= _transformCoordinateInplace(sel.end, op);
    } else {
      if (sel.isContainerSelection()) {
        sel.end.path = sel.start.path;
      }
      sel.end.offset = sel.start.offset;
    }
  }
  return hasChanged
}

function _transformCoordinateInplace(coor, op) {
  if (!isEqual(op.path, coor.path)) return false
  let hasChanged = false;
  if (op.type === 'update' && op.propertyType === 'string') {
    let diff$$1 = op.diff;
    let newOffset;
    if (diff$$1.isInsert() && diff$$1.pos <= coor.offset) {
      newOffset = coor.offset + diff$$1.str.length;
      
      coor.offset = newOffset;
      hasChanged = true;
    } else if (diff$$1.isDelete() && diff$$1.pos <= coor.offset) {
      newOffset = Math.max(diff$$1.pos, coor.offset - diff$$1.str.length);
      
      coor.offset = newOffset;
      hasChanged = true;
    }
  }
  return hasChanged
}


var operationHelpers = Object.freeze({
	transformDocumentChange: transformDocumentChange,
	transformSelection: transformSelection
});

var annotationHelpers = {
  insertedText,
  deletedText,
  transferAnnotations,
  expandAnnotation,
  fuseAnnotation,
  truncateAnnotation
};

function insertedText(doc, coordinate, length) {
  if (!length) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(coordinate.path);
  for (let i = 0; i < annotations.length; i++) {
    let anno = annotations[i];
    var pos = coordinate.offset;
    var start = anno.start.offset;
    var end = anno.end.offset;
    var newStart = start;
    var newEnd = end;
    if ( (pos < start) ||
         (pos === start) ) {
      newStart += length;
    }
    
    if ( (pos < end) ||
         (pos === end && !anno.isInline()) ) {
      newEnd += length;
    }
    
    if (newStart !== start) {
      doc.set([anno.id, 'start', 'offset'], newStart);
    }
    if (newEnd !== end) {
      doc.set([anno.id, 'end', 'offset'], newEnd);
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}

function deletedText(doc, path, startOffset, endOffset) {
  if (startOffset === endOffset) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(path);
  var length = endOffset - startOffset;
  for (let i = 0; i < annotations.length; i++) {
    let anno = annotations[i];
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anno.start.offset;
    var end = anno.end.offset;
    var newStart = start;
    var newEnd = end;
    if (pos2 <= start) {
      newStart -= length;
      newEnd -= length;
      doc.set([anno.id, 'start', 'offset'], newStart);
      doc.set([anno.id, 'end', 'offset'], newEnd);
    } else {
      if (pos1 <= start) {
        newStart = start - Math.min(pos2-pos1, start-pos1);
      }
      if (pos1 <= end) {
        newEnd = end - Math.min(pos2-pos1, end-pos1);
      }
      
      if (start !== end && newStart === newEnd) {
        doc.delete(anno.id);
      } else {
        
        if (start !== newStart) {
          doc.set([anno.id, 'start', 'offset'], newStart);
        }
        if (end !== newEnd) {
          doc.set([anno.id, 'end', 'offset'], newEnd);
        }
      }
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}


function transferAnnotations(doc, path, offset, newPath, newOffset) {
  var index = doc.getIndex('annotations');
  var annotations = index.get(path, offset);
  for (let i = 0; i < annotations.length; i++) {
    let a = annotations[i];
    var isInside = (offset > a.start.offset && offset < a.end.offset);
    var start = a.start.offset;
    var end = a.end.offset;
    
    if (isInside) {
      
      if (a.canSplit()) {
        let newAnno = a.toJSON();
        newAnno.id = uuid(a.type + "_");
        newAnno.start.path = newPath;
        newAnno.start.offset = newOffset;
        newAnno.end.path = newPath;
        newAnno.end.offset = newOffset + a.end.offset - offset;
        doc.create(newAnno);
      }
      
      let newStartOffset = a.start.offset;
      let newEndOffset = offset;
      
      if (newEndOffset === newStartOffset) {
        doc.delete(a.id);
      }
      
      else {
        
        if (newStartOffset !== start) {
          doc.set([a.id, 'start', 'offset'], newStartOffset);
        }
        if (newEndOffset !== end) {
          doc.set([a.id, 'end', 'offset'], newEndOffset);
        }
      }
    }
    
    else if (a.start.offset >= offset) {
      
      
      
      doc.set([a.id, 'start', 'path'], newPath);
      doc.set([a.id, 'start', 'offset'], newOffset + a.start.offset - offset);
      doc.set([a.id, 'end', 'path'], newPath);
      doc.set([a.id, 'end', 'offset'], newOffset + a.end.offset - offset);
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}


function truncateAnnotation(tx, anno, sel) {
  if (!sel || !sel._isSelection) throw new Error('Argument "selection" is required.')
  if (!anno || !anno.isAnnotation()) throw new Error('Argument "anno" is required and must be an annotation.')
  let annoSel = anno.getSelection();
  let newAnnoSel = annoSel.truncateWith(sel);
  anno._updateRange(tx, newAnnoSel);
  return anno
}


function expandAnnotation(tx, anno, sel) {
  if (!sel || !sel._isSelection) throw new Error('Argument "selection" is required.')
  if (!anno || !anno.isAnnotation()) throw new Error('Argument "anno" is required and must be an annotation.')
  let annoSel = anno.getSelection();
  let newAnnoSel = annoSel.expand(sel);
  anno._updateRange(tx, newAnnoSel);
  return anno
}


function fuseAnnotation(tx, annos) {
  if (!isArray$1(annos) || annos.length < 2) {
    throw new Error('fuseAnnotation(): at least two annotations are necessary.')
  }
  let sel, annoType;
  annos.forEach(function(anno, idx) {
    if (idx === 0) {
      sel = anno.getSelection();
      annoType = anno.type;
    } else {
      if (anno.type !== annoType) {
        throw new Error('fuseAnnotation(): all annotations must be of the same type.')
      }
      sel = sel.expand(anno.getSelection());
    }
  });
  
  for (var i = 1; i < annos.length; i++) {
    tx.delete(annos[i].id);
  }
  expandAnnotation(tx, annos[0], sel);
  tx.setSelection(sel);
}

class NodeIndex {

  
  select(node) { 
    throw new Error('This method is abstract.')
  }

  clear() {
    throw new Error('This method is abstract')
  }

  
  create(node) { 
    throw new Error('This method is abstract.')
  }

  
  delete(node) { 
    throw new Error('This method is abstract.')
  }

  set(node, path, newValue, oldValue) {
    this.update(node, path, newValue, oldValue);
  }

  
  update(node, path, newValue, oldValue) { 
    throw new Error('This method is abstract.')
  }

  
  reset(data) {
    this.clear();
    this._initialize(data);
  }

  
  clone() {
    var NodeIndexClass = this.constructor;
    var clone$$1 = new NodeIndexClass();
    return clone$$1
  }

  _initialize(data) {
    forEach(data.getNodes(), function(node) {
      if (this.select(node)) {
        this.create(node);
      }
    }.bind(this));
  }
}


NodeIndex.create = function(prototype) {
  var index = Object.assign(new NodeIndex(), prototype);
  index.clone = function() {
    return NodeIndex.create(prototype)
  };
  return index
};


NodeIndex.filterByType = function(type) {
  return function(node) {
    return node.isInstanceOf(type)
  }
};

class DocumentIndex extends NodeIndex {}

class AnnotationIndex extends DocumentIndex {

  constructor() {
    super();

    this.byPath = new TreeIndex();
    this.byType = new TreeIndex();
  }

  select(node) {
    return node.isPropertyAnnotation()
  }

  clear() {
    this.byPath.clear();
    this.byType.clear();
  }

  
  get(path, start, end, type) {
    var annotations;
    if (isString$1(path) || path.length === 1) {
      annotations = this.byPath.getAll(path) || {};
    } else {
      annotations = this.byPath.get(path);
    }
    annotations = map(annotations);
    if (isNumber(start)) {
      annotations = filter(annotations, AnnotationIndex.filterByRange(start, end));
    }
    if (type) {
      annotations = filter(annotations, DocumentIndex.filterByType(type));
    }
    return annotations
  }

  create(anno) {
    const path = anno.start.path;
    this.byType.set([anno.type, anno.id], anno);
    if (path && path.length > 0) {
      this.byPath.set(anno.start.path.concat([anno.id]), anno);
    }
  }

  delete(anno) {
    this._delete(anno.type, anno.id, anno.start.path);
  }

  _delete(type, id, path) {
    this.byType.delete([type, id]);
    if (path && path.length > 0) {
      this.byPath.delete(path.concat([id]));
    }
  }

  update(node, path, newValue, oldValue) {
    
    if (this.select(node) && path[1] === 'start' && path[2] === "path") {
      this._delete(node.type, node.id, oldValue);
      this.create(node);
    }
  }
}

AnnotationIndex.filterByRange = function(start, end) {
  return function(anno) {
    var aStart = anno.start.offset;
    var aEnd = anno.end.offset;
    var overlap = (aEnd >= start);
    
    if (isNumber(end)) {
      overlap = overlap && (aStart <= end);
    }
    return overlap
  }
};

class PropertyIndex extends NodeIndex {

  constructor(property) {
    super();

    this._property = property || 'id';
    this.index = new TreeIndex();
  }

  
  get(path) {
    return this.index.get(path) || {}
  }

  
  getAll(path) {
    return this.index.getAll(path)
  }

  clear() {
    this.index.clear();
  }

  
  select(node) { 
    return true
  }

  
  create(node) {
    var values = node[this._property];
    if (!isArray$1(values)) {
      values = [values];
    }
    forEach(values, function(value) {
      this.index.set([value, node.id], node);
    }.bind(this));
  }

  
  delete(node) {
    var values = node[this._property];
    if (!isArray$1(values)) {
      values = [values];
    }
    forEach(values, function(value) {
      this.index.delete([value, node.id]);
    }.bind(this));
  }

  
  update(node, path, newValue, oldValue) {
    if (!this.select(node) || path[1] !== this._property) return
    var values = oldValue;
    if (!isArray$1(values)) {
      values = [values];
    }
    forEach(values, function(value) {
      this.index.delete([value, node.id]);
    }.bind(this));
    values = newValue;
    if (!isArray$1(values)) {
      values = [values];
    }
    forEach(values, function(value) {
      this.index.set([value, node.id], node);
    }.bind(this));
  }

  set(node, path, newValue, oldValue) {
    this.update(node, path, newValue, oldValue);
  }

  _initialize(data) {
    forEach(data.getNodes(), function(node) {
      if (this.select(node)) {
        this.create(node);
      }
    }.bind(this));
  }
}

class ContainerAnnotationIndex extends DocumentIndex {

  constructor() {
    super();
    this.byId = new TreeIndex();
  }

  select(node) {
    return node.isContainerAnnotation()
  }

  clear() {
    this.byId.clear();
  }

  get(containerId, type) {
    var annotations = map(this.byId.get(containerId));
    if (isString$1(type)) {
      annotations = filter(annotations, DocumentIndex.filterByType);
    }
    return annotations
  }

  create(anno) {
    this.byId.set([anno.containerId, anno.id], anno);
  }

  delete(anno) {
    this.byId.delete([anno.containerId, anno.id]);
  }

  update(node, path, newValue, oldValue) { 
    
  }

}

class OperationSerializer{

  constructor() {
    this.SEPARATOR = '\t';
  }

  serialize(op) {
    var out = [];
    switch (op.type) {
      case 'create':
        out.push('c');
        out.push(op.val.id);
        out.push(op.val);
        break
      case 'delete':
        out.push('d');
        out.push(op.val.id);
        out.push(op.val);
        break
      case 'set':
        out.push('s');
        out.push(op.path.join('.'));
        out.push(op.val);
        out.push(op.original);
        break
      case 'update':
        out.push('u');
        out.push(op.path.join('.'));
        Array.prototype.push.apply(out, this.serializePrimitiveOp(op.diff));
        break
      default:
        throw new Error('Unsupported operation type.')
    }
    return out
  }

  serializePrimitiveOp(op) {
    var out = [];
    if (op._isTextOperation) {
      if (op.isInsert()) {
        out.push('t+');
      } else if (op.isDelete()) {
        out.push('t-');
      }
      out.push(op.pos);
      out.push(op.str);
    } else if (op._isArrayOperation) {
      if (op.isInsert()) {
        out.push('a+');
      } else if (op.isDelete()) {
        out.push('a-');
      }
      out.push(op.pos);
      out.push(op.val);
    } else if (op._isCoordinateOperation) {
      if (op.isShift()) {
        out.push('c>>');
      } else {
        throw new Error('Unsupported CoordinateOperation type.')
      }
      out.push(op.pos);
      out.push(op.val);
    } else {
      throw new Error('Unsupported operation type.')
    }
    return out
  }

  deserialize(str, tokenizer) {
    if (!tokenizer) {
      tokenizer = new Tokenizer(str, this.SEPARATOR);
    }
    var type = tokenizer.getString();
    var op, path, val, oldVal, diff$$1;
    switch (type) {
      case 'c':
        path = tokenizer.getPath();
        val = tokenizer.getObject();
        op = ObjectOperation.Create(path, val);
        break
      case 'd':
        path = tokenizer.getPath();
        val = tokenizer.getObject();
        op = ObjectOperation.Delete(path, val);
        break
      case 's':
        path = tokenizer.getPath();
        val = tokenizer.getAny();
        oldVal = tokenizer.getAny();
        op = ObjectOperation.Set(path, oldVal, val);
        break
      case 'u':
        path = tokenizer.getPath();
        diff$$1 = this.deserializePrimitiveOp(str, tokenizer);
        op = ObjectOperation.Update(path, diff$$1);
        break
      default:
        throw new Error('Illegal type for ObjectOperation: '+ type)
    }
    return op
  }

  deserializePrimitiveOp(str, tokenizer) {
    if (!tokenizer) {
      tokenizer = new Tokenizer(str, this.SEPARATOR);
    }
    var type = tokenizer.getString();
    var op, pos, val;
    switch (type) {
      case 't+':
        pos = tokenizer.getNumber();
        val = tokenizer.getString();
        op = TextOperation.Insert(pos, val);
        break
      case 't-':
        pos = tokenizer.getNumber();
        val = tokenizer.getString();
        op = TextOperation.Delete(pos, val);
        break
      case 'a+':
        pos = tokenizer.getNumber();
        val = tokenizer.getAny();
        op = ArrayOperation.Insert(pos, val);
        break
      case 'a-':
        pos = tokenizer.getNumber();
        val = tokenizer.getAny();
        op = ArrayOperation.Delete(pos, val);
        break
      case 'c>>':
        val = tokenizer.getNumber();
        op = CoordinateOperation.Shift(val);
        break
      default:
        throw new Error('Unsupported operation type: ' + type)
    }
    return op
  }
}

class Tokenizer {
  constructor(str, sep) {
    if (isArray$1(arguments[0])) {
      this.tokens = arguments[0];
    } else {
      this.tokens = str.split(sep);
    }
    this.pos = -1;
  }

  error(msg) {
    throw new Error('Parsing error: ' + msg + '\n' + this.tokens[this.pos])
  }

  getString() {
    this.pos++;
    var str = this.tokens[this.pos];
    if (str[0] === '"') {
      str = str.slice(1, -1);
    }
    return str
  }

  getNumber() {
    this.pos++;
    var number;
    var token = this.tokens[this.pos];
    try {
      if (isNumber(token)) {
        number = token;
      } else {
        number = parseInt(this.tokens[this.pos], 10);
      }
      return number
    } catch (err) {
      this.error('expected number');
    }
  }

  getObject() {
    this.pos++;
    var obj;
    var token = this.tokens[this.pos];
    try {
      if (isObject$1(token)) {
        obj = token;
      } else {
        obj = JSON.parse(this.tokens[this.pos]);
      }
      return obj
    } catch (err) {
      this.error('expected object');
    }
  }

  getAny() {
    this.pos++;
    var token = this.tokens[this.pos];
    return token
  }

  getPath() {
    var str = this.getString();
    return str.split('.')
  }
}

OperationSerializer.Tokenizer = Tokenizer;

class DocumentChange {

  constructor(ops, before, after) {
    if (arguments.length === 1 && isPlainObject$1(arguments[0])) {
      let data = arguments[0];
      
      this.sha = data.sha;
      
      this.timestamp = data.timestamp;
      
      this.before = data.before || {};
      
      this.ops = data.ops;
      this.info = data.info; 
      
      this.after = data.after || {};
    } else if (arguments.length === 3) {
      this.sha = uuid();
      this.info = {};
      this.timestamp = Date.now();
      this.ops = ops.slice(0);
      this.before = before || {};
      this.after = after || {};
    } else {
      throw new Error('Illegal arguments.')
    }
    
    this.updated = null;
    
    this.created = null;
    
    this.deleted = null;
  }

  
  _extractInformation(doc) {
    let ops = this.ops;
    let created = {};
    let deleted = {};
    let updated = {};
    let affectedContainerAnnos = [];

    
    function _checkAnnotation(op) {
      switch (op.type) {
        case "create":
        case "delete": {
          let node = op.val;
          if (node.hasOwnProperty('start')) {
            updated[node.start.path] = true;
          }
          if (node.hasOwnProperty('end')) {
            updated[node.end.path] = true;
          }
          break
        }
        case "update":
        case "set": {
          
          let node = doc.get(op.path[0]);
          if (node) {
            if (node.isPropertyAnnotation()) {
              updated[node.start.path] = true;
            } else if (node.isContainerAnnotation()) {
              affectedContainerAnnos.push(node);
            }
          }
          break
        }
        default:
          
          throw new Error('Illegal state')
      }
    }

    for (let i = 0; i < ops.length; i++) {
      let op = ops[i];
      if (op.type === "create") {
        created[op.val.id] = op.val;
        delete deleted[op.val.id];
      }
      if (op.type === "delete") {
        delete created[op.val.id];
        deleted[op.val.id] = op.val;
      }
      if (op.type === "set" || op.type === "update") {
        updated[op.path] = true;
        
        updated[op.path[0]] = true;
      }
      _checkAnnotation(op);
    }

    affectedContainerAnnos.forEach(function(anno) {
      let container = doc.get(anno.containerId, 'strict');
      let startPos = container.getPosition(anno.start.path[0]);
      let endPos = container.getPosition(anno.end.path[0]);
      for (let pos = startPos; pos <= endPos; pos++) {
        let node = container.getChildAt(pos);
        let path;
        if (node.isText()) {
          path = [node.id, 'content'];
        } else {
          path = [node.id];
        }
        if (!deleted[node.id]) {
          updated[path] = true;
        }
      }
    });

    
    if(Object.keys(deleted).length > 0) {
      forEach(updated, function(_, key) {
        let nodeId = key.split(',')[0];
        if (deleted[nodeId]) {
          delete updated[key];
        }
      });
    }

    this.created = created;
    this.deleted = deleted;
    this.updated = updated;
  }

  invert() {
    
    let copy = this.toJSON();
    copy.ops = [];
    
    let tmp = copy.before;
    copy.before = copy.after;
    copy.after = tmp;
    let inverted = DocumentChange.fromJSON(copy);
    let ops = [];
    for (let i = this.ops.length - 1; i >= 0; i--) {
      ops.push(this.ops[i].invert());
    }
    inverted.ops = ops;
    return inverted
  }

  
  isAffected(path) {
    console.error('DEPRECATED: use change.hasUpdated() instead');
    return this.hasUpdated(path)
  }

  isUpdated(path) {
    console.error('DEPRECATED: use change.hasUpdated() instead');
    return this.hasUpdated(path)
  }
  

  hasUpdated(path) {
    return this.updated[path]
  }

  hasDeleted(id) {
    return this.deleted[id]
  }

  serialize() {
    
    

    let opSerializer = new OperationSerializer();
    let data = this.toJSON();
    data.ops = this.ops.map(function(op) {
      return opSerializer.serialize(op)
    });
    return JSON.stringify(data)
  }

  clone() {
    return DocumentChange.fromJSON(this.toJSON())
  }

  toJSON() {
    let data = {
      
      sha: this.sha,
      
      before: clone(this.before),
      ops: map(this.ops, function(op) {
        return op.toJSON()
      }),
      info: this.info,
      
      after: clone(this.after),
    };

    
    
    data.after.selection = undefined;
    data.before.selection = undefined;

    let sel = this.before.selection;
    if (sel && sel._isSelection) {
      data.before.selection = sel.toJSON();
    }
    sel = this.after.selection;
    if (sel && sel._isSelection) {
      data.after.selection = sel.toJSON();
    }
    return data
  }
}

DocumentChange.deserialize = function(str) {
  let opSerializer = new OperationSerializer();
  let data = JSON.parse(str);
  data.ops = data.ops.map(function(opData) {
    return opSerializer.deserialize(opData)
  });
  if (data.before.selection) {
    data.before.selection = fromJSON(data.before.selection);
  }
  if (data.after.selection) {
    data.after.selection = fromJSON(data.after.selection);
  }
  return new DocumentChange(data)
};

DocumentChange.fromJSON = function(data) {
  
  let change = cloneDeep(data);
  change.ops = data.ops.map(function(opData) {
    return ObjectOperation.fromJSON(opData)
  });
  change.before.selection = fromJSON(data.before.selection);
  change.after.selection = fromJSON(data.after.selection);
  return new DocumentChange(change)
};

class Data extends EventEmitter {

  
  constructor(schema, nodeFactory) {
    super();

    
    if (!schema) {
      throw new Error('schema is mandatory')
    }
    if (!nodeFactory) {
      throw new Error('nodeFactory is mandatory')
    }
   

    this.schema = schema;
    this.nodeFactory = nodeFactory;
    this.nodes = {};
    this.indexes = {};

    
    
    this.__QUEUE_INDEXING__ = false;
    this.queue = [];
  }

  
  contains(id) {
    return Boolean(this.nodes[id])
  }

  
  get(path, strict) {
    let result = this._get(path);
    if (strict && result === undefined) {
      if (isString$1(path)) {
        throw new Error("Could not find node with id '"+path+"'.")
      } else if (!this.contains(path[0])) {
        throw new Error("Could not find node with id '"+path[0]+"'.")
      } else {
        throw new Error("Property for path '"+path+"' us undefined.")
      }
    }
    return result
  }

  _get(path) {
    if (!path) return undefined
    let result;
    if (isString$1(path)) {
      result = this.nodes[path];
    } else if (path.length === 1) {
      result = this.nodes[path[0]];
    } else if (path.length > 1) {
      let context = this.nodes[path[0]];
      for (let i = 1; i < path.length-1; i++) {
        if (!context) return undefined
        context = context[path[i]];
      }
      if (!context) return undefined
      result = context[path[path.length-1]];
    }
    return result
  }

  
  getNodes() {
    return this.nodes
  }

  
  create(nodeData) {
    var node = this.nodeFactory.create(nodeData.type, nodeData);
    if (!node) {
      throw new Error('Illegal argument: could not create node for data:', nodeData)
    }
    if (this.contains(node.id)) {
      throw new Error("Node already exists: " + node.id)
    }
    if (!node.id || !node.type) {
      throw new Error("Node id and type are mandatory.")
    }
    this.nodes[node.id] = node;

    var change = {
      type: 'create',
      node: node
    };

    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }

    return node
  }

  
  delete(nodeId) {
    var node = this.nodes[nodeId];
    if (!node) return
    node.dispose();
    delete this.nodes[nodeId];

    var change = {
      type: 'delete',
      node: node,
    };

    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }

    return node
  }

  
  set(path, newValue) {
    let node = this.get(path[0]);
    let oldValue = this._set(path, newValue);
    var change = {
      type: 'set',
      node: node,
      path: path,
      newValue: newValue,
      oldValue: oldValue
    };
    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }
    return oldValue
  }

  _set(path, newValue) {
    let oldValue = _setValue(this.nodes, path, newValue);
    return oldValue
  }

  
  update(path, diff$$1) {
    var realPath = this.getRealPath(path);
    if (!realPath) {
      console.error('Could not resolve path', path);
      return
    }
    let node = this.get(realPath[0]);
    let oldValue = this._get(realPath);
    let newValue;
    if (diff$$1.isOperation) {
      newValue = diff$$1.apply(oldValue);
    } else {
      diff$$1 = this._normalizeDiff(oldValue, diff$$1);
      if (isString$1(oldValue)) {
        switch (diff$$1.type) {
          case 'delete': {
            newValue = oldValue.split('').splice(diff$$1.start, diff$$1.end-diff$$1.start).join('');
            break
          }
          case 'insert': {
            newValue = [oldValue.substring(0, diff$$1.start), diff$$1.text, oldValue.substring(diff$$1.start)].join('');
            break
          }
          default:
            throw new Error('Unknown diff type')
        }
      } else if (isArray$1(oldValue)) {
        newValue = oldValue.slice(0);
        switch (diff$$1.type) {
          case 'delete': {
            newValue.splice(diff$$1.pos, 1);
            break
          }
          case 'insert': {
            newValue.splice(diff$$1.pos, 0, diff$$1.value);
            break
          }
          default:
            throw new Error('Unknown diff type')
        }
      } else if (oldValue._isCoordinate) {
        switch (diff$$1.type) {
          case 'shift': {
            
            oldValue = { path: oldValue.path, offset: oldValue.offset };
            newValue = oldValue;
            newValue.offset += diff$$1.value;
            break
          }
          default:
            throw new Error('Unknown diff type')
        }
      } else {
        throw new Error('Diff is not supported:', JSON.stringify(diff$$1))
      }
    }
    this._set(realPath, newValue);

    var change = {
      type: 'update',
      node: node,
      path: realPath,
      newValue: newValue,
      oldValue: oldValue
    };

    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }

    return oldValue
  }

  
  _normalizeDiff(value, diff$$1) {
    if (isString$1(value)) {
      
      if (diff$$1['delete']) {
        console.warn('DEPRECATED: use doc.update(path, {type:"delete", start:s, end: e}) instead');
        diff$$1 = {
          type: 'delete',
          start: diff$$1['delete'].start,
          end: diff$$1['delete'].end
        };
      } else if (diff$$1['insert']) {
        console.warn('DEPRECATED: use doc.update(path, {type:"insert", start:s, text: t}) instead');
        diff$$1 = {
          type: 'insert',
          start: diff$$1['insert'].offset,
          text: diff$$1['insert'].value
        };
      }
    } else if (isArray$1(value)) {
      
      if (diff$$1['delete']) {
        console.warn('DEPRECATED: use doc.update(path, {type:"delete", pos:1}) instead');
        diff$$1 = {
          type: 'delete',
          pos: diff$$1['delete'].offset
        };
      } else if (diff$$1['insert']) {
        console.warn('DEPRECATED: use doc.update(path, {type:"insert", pos:1, value: "foo"}) instead');
        diff$$1 = {
          type: 'insert',
          pos: diff$$1['insert'].offset,
          value: diff$$1['insert'].value
        };
      }
    } else if (value._isCoordinate) {
      if (diff$$1.hasOwnProperty('shift')) {
        console.warn('DEPRECATED: use doc.update(path, {type:"shift", value:2}) instead');
        diff$$1 = {
          type: 'shift',
          value: diff$$1['shift']
        };
      }
    }
    return diff$$1
  }

  
  toJSON() {
    let nodes = {};
    forEach(this.nodes, (node)=>{
      nodes[node.id] = node.toJSON();
    });
    return {
      schema: [this.schema.id, this.schema.version],
      nodes: nodes
    }
  }

  reset() {
    this.clear();
  }

  
  clear() {
    this.nodes = {};
    forEach(this.indexes, index => index.clear());
  }

  
  addIndex(name, index) {
    if (this.indexes[name]) {
      console.error('Index with name %s already exists.', name);
    }
    index.reset(this);
    this.indexes[name] = index;
    return index
  }

  
  getIndex(name) {
    return this.indexes[name]
  }

  
  _updateIndexes(change) {
    if (!change || this.__QUEUE_INDEXING__) return
    forEach(this.indexes, function(index) {
      if (index.select(change.node)) {
        if (!index[change.type]) {
          console.error('Contract: every NodeIndex must implement ' + change.type);
        }
        index[change.type](change.node, change.path, change.newValue, change.oldValue);
      }
    });
  }

  
  _stopIndexing() {
    this.__QUEUE_INDEXING__ = true;
  }

  
  _startIndexing() {
    this.__QUEUE_INDEXING__ = false;
    while(this.queue.length >0) {
      var change = this.queue.shift();
      this._updateIndexes(change);
    }
  }

}

function _setValue(root, path, newValue) {
  let ctx = root;
  let L = path.length;
  for (let i = 0; i < L-1; i++) {
    ctx = ctx[path[i]];
    if (!ctx) throw new Error('Can not set value.')
  }
  let oldValue = ctx[path[L-1]];
  ctx[path[L-1]] = newValue;
  return oldValue
}

class IncrementalData extends Data {

  
  create(nodeData) {
    if (nodeData._isNode) {
      nodeData = nodeData.toJSON();
    }
    let op = ObjectOperation.Create([nodeData.id], nodeData);
    this.apply(op);
    return op
  }

  
  delete(nodeId) {
    var op = null;
    var node = this.get(nodeId);
    if (node) {
      var nodeData = node.toJSON();
      op = ObjectOperation.Delete([nodeId], nodeData);
      this.apply(op);
    }
    return op
  }

  
  update(path, diff$$1) {
    var diffOp = this._getDiffOp(path, diff$$1);
    var op = ObjectOperation.Update(path, diffOp);
    this.apply(op);
    return op
  }

  
  set(path, newValue) {
    var oldValue = this.get(path);
    var op = ObjectOperation.Set(path, oldValue, newValue);
    this.apply(op);
    return op
  }

  
  apply(op) {
    if (op.type === ObjectOperation.NOP) return
    else if (op.type === ObjectOperation.CREATE) {
      
      super.create(cloneDeep(op.val));
    } else if (op.type === ObjectOperation.DELETE) {
      super.delete(op.val.id);
    } else if (op.type === ObjectOperation.UPDATE) {
      var oldVal = this.get(op.path);
      var diff$$1 = op.diff;
      if (op.propertyType === 'array') {
        if (! (diff$$1._isArrayOperation) ) {
          diff$$1 = ArrayOperation.fromJSON(diff$$1);
        }
        
        diff$$1.apply(oldVal);
      } else if (op.propertyType === 'string') {
        if (!(diff$$1._isTextOperation) ) {
          diff$$1 = TextOperation.fromJSON(diff$$1);
        }
        var newVal = diff$$1.apply(oldVal);
        super.set(op.path, newVal);
      } else if (op.propertyType === 'coordinate') {
        if (!(diff$$1._isCoordinateOperation) ) {
          diff$$1 = CoordinateOperation.fromJSON(diff$$1);
        }
        diff$$1.apply(oldVal);
      } else {
        throw new Error("Unsupported type for operational update.")
      }
    } else if (op.type === ObjectOperation.SET) {
      super.set(op.path, op.val);
    } else {
      throw new Error("Illegal state.")
    }
    this.emit('operation:applied', op, this);
  }

  
  _getDiffOp(path, diff$$1) {
    var diffOp = null;
    if (diff$$1.isOperation) {
      diffOp = diff$$1;
    } else {
      var value = this.get(path);
      diff$$1 = this._normalizeDiff(value, diff$$1);
      if (value === null || value === undefined) {
        throw new Error('Property has not been initialized: ' + JSON.stringify(path))
      } else if (isString$1(value)) {
        switch (diff$$1.type) {
          case 'delete': {
            diffOp = TextOperation.Delete(diff$$1.start, value.substring(diff$$1.start, diff$$1.end));
            break
          }
          case 'insert': {
            diffOp = TextOperation.Insert(diff$$1.start, diff$$1.text);
            break
          }
          default:
            throw new Error('Unknown diff type')
        }
      } else if (isArray$1(value)) {
        switch (diff$$1.type) {
          case 'delete': {
            diffOp = ArrayOperation.Delete(diff$$1.pos, value[diff$$1.pos]);
            break
          }
          case 'insert': {
            diffOp = ArrayOperation.Insert(diff$$1.pos, diff$$1.value);
            break
          }
          default:
            throw new Error('Unknown diff type')
        }
      } else if (value._isCoordinate) {
        switch (diff$$1.type) {
          case 'shift': {
            diffOp = CoordinateOperation.Shift(diff$$1.value);
            break
          }
          default:
            throw new Error('Unknown diff type')
        }
      }
    }
    if (!diffOp) {
      throw new Error('Unsupported diff: ' + JSON.stringify(diff$$1))
    }
    return diffOp
  }

}

class DocumentNodeFactory {

  constructor(doc) {
    this.doc = doc;
  }

  create(nodeType, nodeData) {
    var NodeClass = this.doc.schema.getNodeClass(nodeType);
    if (!NodeClass) {
      throw new Error('No node registered by that name: ' + nodeType)
    }
    return new NodeClass(this.doc, nodeData)
  }

}

class JSONConverter {

  importDocument(doc, json) {
    if (!json.nodes) {
      throw new Error('Invalid JSON format.')
    }
    var schema = doc.getSchema();
    if (json.schema && schema.name !== json.schema.name) {
      throw new Error('Incompatible schema.')
    }
    
    var nodes = json.nodes;
    
    
    
    doc.import(function(tx) {
      forEach(nodes, function(node) {
        
        if (tx.get(node.id)) {
          tx.delete(node.id);
        }
        tx.create(node);
      });
    });
    return doc
  }

  exportDocument(doc) {
    var schema = doc.getSchema();
    var json = {
      schema: {
        name: schema.name
      },
      nodes: {}
    };
    forEach(doc.getNodes(), function(node) {
      if (node._isDocumentNode) {
        json.nodes[node.id] = node.toJSON();
      }
    });
    return json
  }
}

class ParentNodeHook {

  constructor(doc) {
    this.doc = doc;
    this.table = {};
    doc.data.on('operation:applied', this._onOperationApplied, this);
  }

  _onOperationApplied(op) {
    const doc = this.doc;
    const table = this.table;
    let node = doc.get(op.path[0]);
    
    
    switch(op.type) {
      case 'create': {
        switch (node.type) {
          case 'list':
            _setParent(node, node.items);
            break
          case 'list-item': {
            _setRegisteredParent(node);
            break
          }
          case 'table':
            _setParent(node, node.cells);
            break
          case 'table-cell': {
            _setRegisteredParent(node);
            break
          }
          default:
            
        }
        break
      }
      case 'update': {
        
        
        let update = op.diff;
        switch(node.type) {
          case 'list':
            if (op.path[1] === 'items') {
              if (update.isInsert()) {
                _setParent(node, update.getValue());
              }
            }
            break
          case 'table':
            if (op.path[1] === 'cells') {
              if (update.isInsert()) {
                _setParent(node, update.getValue());
              }
            }
            break
          default:
            
        }
        break
      }
      case 'set': {
        switch(node.type) {
          case 'list':
            if (op.path[1] === 'items') {
              _setParent(node, op.getValue());
            }
            break
          case 'table':
            if (op.path[1] === 'cells') {
              _setParent(node, op.getValue());
            }
            break
          default:
            
        }
        break
      }
      default:
        
    }

    function _setParent(parent, ids) {
      if (ids) {
        if (isArray$1(ids)) {
          ids.forEach(_set);
        } else {
          _set(ids);
        }
      }
      function _set(id) {
        
        
        
        table[id] = parent;
        let child = doc.get(id);
        if (child) {
          child.parent = parent;
        }
      }
    }
    function _setRegisteredParent(child) {
      let parent = table[child.id];
      if (parent) {
        child.parent = parent;
      }
    }
  }
}

ParentNodeHook.register = function(doc) {
  return new ParentNodeHook(doc)
};

const converter = new JSONConverter();



class Document extends EventEmitter {

  
  constructor(schema, ...args) {
    super();

    this.schema = schema;
    
    if (!schema) {
      throw new Error('A document needs a schema for reflection.')
    }

    
    this._ops = [];

    this._initialize(...args);
  }

  _initialize() {
    this.__id__ = uuid();
    this.nodeFactory = new DocumentNodeFactory(this);
    this.data = new IncrementalData(this.schema, this.nodeFactory);
    
    this.addIndex('type', new PropertyIndex('type'));
    
    this.addIndex('annotations', new AnnotationIndex());
    
    
    
    this.addIndex('container-annotations', new ContainerAnnotationIndex());
    
    
    ParentNodeHook.register(this);
  }

  dispose() {
    this.off();
    this.data.off();
  }

  get id() {
    return this.__id__
  }

  
  getSchema() {
    return this.schema
  }

  
  contains(id) {
    return this.data.contains(id)
  }

  
  get(path, strict) {
    return this.data.get(path, strict)
  }

  
  getNodes() {
    return this.data.getNodes()
  }

  getAnnotations(path) {
    return this.getIndex('annotations').get(path)
  }

  
  import(importer) {
    try {
      this.data._stopIndexing();
      importer(this);
      this.data._startIndexing();
    } finally {
      this.data.queue = [];
      this.data._startIndexing();
    }
  }

  
  create(nodeData) {
    if (!nodeData.id) {
      nodeData.id = uuid(nodeData.type);
    }
    if (!nodeData.type) {
      throw new Error('No node type provided')
    }
    const op = this._create(nodeData);
    if (op) {
      this._ops.push(op);
      if (!this._isTransactionDocument) {
        this._emitChange(op);
      }
      return this.get(nodeData.id)
    }
  }

  createDefaultTextNode(text, dir) {
    return this.create({
      type: this.getSchema().getDefaultTextType(),
      content: text || '',
      direction: dir
    })
  }

  
  delete(nodeId) {
    const node = this.get(nodeId);
    const op = this._delete(nodeId);
    if (op) {
      this._ops.push(op);
      if (!this._isTransactionDocument) {
        this._emitChange(op);
      }
    }
    return node
  }

  
  set(path, value) {
    const oldValue = this.get(path);
    const op = this._set(path, value);
    if (op) {
      this._ops.push(op);
      if (!this._isTransactionDocument) {
        this._emitChange(op);
      }
    }
    return oldValue
  }

  
  update(path, diff$$1) {
    const op = this._update(path, diff$$1);
    if (op) {
      this._ops.push(op);
      if (!this._isTransactionDocument) {
        this._emitChange(op);
      }
    }
    return op
  }

  
  addIndex(name, index) {
    return this.data.addIndex(name, index)
  }

  
  getIndex(name) {
    return this.data.getIndex(name)
  }

  
  createSelection(data) {
    let sel;
    if (isNil(data)) return Selection.nullSelection
    if (arguments.length !== 1 || !isPlainObject$1(data)) {
      throw new Error('Illegal argument: call createSelection({ type: ... }')
    } else {
      switch (data.type) {
        case 'property': {
          if (isNil(data.endOffset)) {
            data.endOffset = data.startOffset;
          }
          if (!data.hasOwnProperty('reverse')) {
            if (data.startOffset>data.endOffset) {
              [data.startOffset, data.endOffset] = [data.endOffset, data.startOffset];
              data.reverse = !data.reverse;
            }
          }
          
          let text = this.get(data.path, 'strict');
          if (data.startOffset < 0 || data.startOffset > text.length) {
            throw new Error('Invalid startOffset: target property has length '+text.length+', given startOffset is ' + data.startOffset)
          }
          if (data.endOffset < 0 || data.endOffset > text.length) {
            throw new Error('Invalid startOffset: target property has length '+text.length+', given endOffset is ' + data.endOffset)
          }
          sel = new PropertySelection(data);
          break
        }
        case 'container': {
          let container = this.get(data.containerId, 'strict');
          if (!container) throw new Error('Can not create ContainerSelection: container "'+data.containerId+'" does not exist.')
          let start = this._normalizeCoor({ path: data.startPath, offset: data.startOffset});
          let end = this._normalizeCoor({ path: data.endPath, offset: data.endOffset});
          let startAddress = container.getAddress(start);
          let endAddress = container.getAddress(end);
          if (!startAddress) {
            throw new Error('Invalid arguments for ContainerSelection: ', start.toString())
          }
          if (!endAddress) {
            throw new Error('Invalid arguments for ContainerSelection: ', end.toString())
          }
          if (!data.hasOwnProperty('reverse')) {
            if (endAddress.isBefore(startAddress, 'strict')) {
              [start, end] = [end, start];
              data.reverse = true;
            }
          }
          sel = new ContainerSelection(container.id, start.path, start.offset, end.path, end.offset, data.reverse, data.surfaceId);
          break
        }
        case 'node': {
          sel = createNodeSelection({
            doc: this,
            nodeId: data.nodeId,
            mode: data.mode,
            containerId: data.containerId,
            reverse: data.reverse,
            surfaceId: data.surfaceId
          });
          break
        }
        case 'custom': {
          sel = CustomSelection.fromJSON(data);
          break
        }
        default:
          throw new Error('Illegal selection type', data)
      }
    }
    if (!sel.isNull()) {
      sel.attach(this);
    }
    return sel
  }

  newInstance() {
    var DocumentClass = this.constructor;
    return new DocumentClass(this.schema)
  }

  
  createSnippet() {
    var snippet = this.newInstance();
    var snippetContainer = snippet.create({
      type: 'container',
      id: Document.SNIPPET_ID
    });
    snippet.getContainer = function() {
      return snippetContainer
    };
    return snippet
  }

  createFromDocument(doc) {
    
    this.clear();

    let nodes = doc.getNodes();
    let annotations = [];
    let contentNodes = [];
    let containers = [];
    forEach(nodes, (node) => {
      if (node.isAnnotation()) {
        annotations.push(node);
      } else if (node.isContainer()) {
        containers.push(node);
      } else {
        contentNodes.push(node);
      }
    });
    contentNodes.concat(annotations).concat(containers).forEach(n=>{
      this.create(n);
    });

    return this
  }

  
  toJSON() {
    return converter.exportDocument(this)
  }

  clone() {
    let copy = this.newInstance();
    copy.createFromDocument(this);
    return copy
  }

  clear() {
    this.data.clear();
    this._ops.length = 0;
  }

  
  createEditingInterface() {
    return new EditingInterface(this)
  }

  _apply(documentChange) {
    forEach(documentChange.ops, (op) => {
      this._applyOp(op);
    });
    
    documentChange._extractInformation(this);
  }

  _applyOp(op) {
    this.data.apply(op);
    this.emit('operation:applied', op);
  }

  _create(nodeData) {
    return this.data.create(nodeData)
  }

  _delete(nodeId) {
    return this.data.delete(nodeId)
  }

  _set(path, value) {
    return this.data.set(path, value)
  }

  _update(path, diff$$1) {
    return this.data.update(path, diff$$1)
  }

  _emitChange(op) {
    const change = new DocumentChange([op], {}, {});
    change._extractInformation(this);
    this._notifyChangeListeners(change, { hidden: true });
  }

  _notifyChangeListeners(change, info) {
    info = info || {};
    this.emit('document:changed', change, info, this);
  }

  
  _createSelectionFromRange(range) {
    if (!range) return Selection.nullSelection
    let inOneNode = isEqual(range.start.path, range.end.path);
    if (inOneNode) {
      if (range.start.isNodeCoordinate()) {
        
        
        return new NodeSelection(range.containerId, range.start.getNodeId(), 'full', range.reverse, range.surfaceId)
      } else {
        return this.createSelection({
          type: 'property',
          path: range.start.path,
          startOffset: range.start.offset,
          endOffset: range.end.offset,
          reverse: range.reverse,
          containerId: range.containerId,
          surfaceId: range.surfaceId
        })
      }
    } else {
      return this.createSelection({
        type: 'container',
        startPath: range.start.path,
        startOffset: range.start.offset,
        endPath: range.end.path,
        endOffset: range.end.offset,
        reverse: range.reverse,
        containerId: range.containerId,
        surfaceId: range.surfaceId
      })
    }
  }

  _normalizeCoor({ path, offset }) {
    
    if (path.length === 1) {
      let node = this.get(path[0]).getContainerRoot();
      if (node.isText()) {
        
        return new Coordinate(node.getTextPath(), offset === 0 ? 0 : node.getLength())
      } else if (node.isList()) {
        
        if (offset === 0) {
          let item = node.getItemAt(0);
          return new Coordinate(item.getTextPath(), 0)
        } else {
          let item = this.get(last$1(node.items));
          return new Coordinate(item.getTextPath(), item.getLength())
        }
      }
    }
    return new Coordinate(path, offset)
  }

}

Document.prototype._isDocument = true;



Document.SNIPPET_ID = "snippet";

Document.TEXT_SNIPPET_ID = "text-snippet";

function copySelection(doc, selection) {
  if (!selection) throw new Error("'selection' is mandatory.")
  let copy = null;
  if (!selection.isNull() && !selection.isCollapsed()) {
    
    if (selection.isPropertySelection()) {
      copy = _copyPropertySelection(doc, selection);
    }
    else if (selection.isContainerSelection()) {
      copy = _copyContainerSelection(doc, selection);
    }
    else if (selection.isNodeSelection()) {
      copy = _copyNodeSelection(doc, selection);
    }
    else {
      console.error('Copy is not yet supported for selection type.');
    }
  }
  return copy
}

function _copyPropertySelection(doc, selection) {
  let path = selection.start.path;
  let offset = selection.start.offset;
  let endOffset = selection.end.offset;
  let text = doc.get(path);
  let snippet = doc.createSnippet();
  let containerNode = snippet.getContainer();
  snippet.create({
    type: doc.schema.getDefaultTextType(),
    id: Document.TEXT_SNIPPET_ID,
    content: text.substring(offset, endOffset)
  });
  containerNode.show(Document.TEXT_SNIPPET_ID);
  let annotations = doc.getIndex('annotations').get(path, offset, endOffset);
  forEach(annotations, function(anno) {
    let data = cloneDeep(anno.toJSON());
    let path = [Document.TEXT_SNIPPET_ID, 'content'];
    data.start = {
      path: path,
      offset: Math.max(offset, anno.start.offset)-offset
    };
    data.end = {
      path: path,
      offset: Math.min(endOffset, anno.end.offset)-offset
    };
    snippet.create(data);
  });
  return snippet
}

function _copyContainerSelection(tx, sel) {
  let snippet = tx.createSnippet();
  let container = snippet.getContainer();

  let nodeIds = sel.getNodeIds();
  let L = nodeIds.length;
  if (L === 0) return snippet

  let start = sel.start;
  let end = sel.end;

  let skippedFirst = false;
  let skippedLast = false;

  
  let created = {};
  for(let i = 0; i<L; i++) {
    let id = nodeIds[i];
    let node = tx.get(id);
    
    if (i===0 && isLast(tx, start)) {
      skippedFirst = true;
      continue
    }
    if (i===L-1 && isFirst(tx, end)) {
      skippedLast = true;
      continue
    }
    if (!created[id]) {
      documentHelpers.copyNode(node).forEach((nodeData) => {
        let copy = snippet.create(nodeData);
        created[copy.id] = true;
      });
      container.show(id);
    }
  }
  if (!skippedFirst) {
    
    let startNode = snippet.get(start.getNodeId()).getContainerRoot();
    if (startNode.isText()) {
      documentHelpers.deleteTextRange(snippet, null, start);
    } else if (startNode.isList()) {
      documentHelpers.deleteListRange(snippet, startNode, null, start);
    }
  }
  if (!skippedLast) {
    
    let endNode = snippet.get(end.getNodeId()).getContainerRoot();
    if (endNode.isText()) {
      documentHelpers.deleteTextRange(snippet, end, null);
    } else if (endNode.isList()) {
      documentHelpers.deleteListRange(snippet, endNode, end, null);
    }
  }
  return snippet
}

function _copyNodeSelection(doc, selection) {
  let snippet = doc.createSnippet();
  let containerNode = snippet.getContainer();
  let nodeId = selection.getNodeId();
  let node = doc.get(nodeId);
  documentHelpers.copyNode(node).forEach((nodeData) => {
    snippet.create(nodeData);
  });
  containerNode.show(node.id);
  return snippet
}

function paste(tx, args) {
  let sel = tx.selection;
  if (!sel || sel.isNull()) {
    throw new Error("Can not paste, without selection.")
  }
  args = args || {};
  args.text = args.text || '';
  let pasteDoc = args.doc;
  
  
  let inContainer = Boolean(sel.containerId);

  
  
  
  if (!pasteDoc && !inContainer) {
    tx.insertText(args.text);
    return
  }
  if (!pasteDoc) {
    pasteDoc = _convertPlainTextToDocument(tx, args);
  }
  if (!sel.isCollapsed()) {
    tx.deleteSelection();
  }
  let snippet = pasteDoc.get(Document.SNIPPET_ID);
  if (snippet.getLength() > 0) {
    let first = snippet.getChildAt(0);
    if (first.isText()) {
      _pasteAnnotatedText(tx, pasteDoc);
      
      
      
      snippet.hideAt(0);
    }
    
    if (snippet.getLength() > 0) {
      _pasteDocument(tx, pasteDoc);
    }
  }
  return args
}


function _convertPlainTextToDocument(tx, args) {
  let lines = args.text.split(/\s*\n\s*\n/);
  let pasteDoc = tx.getDocument().newInstance();
  let defaultTextType = pasteDoc.getSchema().getDefaultTextType();
  let container = pasteDoc.create({
    type: 'container',
    id: Document.SNIPPET_ID,
    nodes: []
  });
  let node;
  if (lines.length === 1) {
    node = pasteDoc.create({
      id: Document.TEXT_SNIPPET_ID,
      type: defaultTextType,
      content: lines[0]
    });
    container.show(node.id);
  } else {
    for (let i = 0; i < lines.length; i++) {
      node = pasteDoc.create({
        id: uuid(defaultTextType),
        type: defaultTextType,
        content: lines[i]
      });
      container.show(node.id);
    }
  }
  return pasteDoc
}

function _pasteAnnotatedText(tx, copy) {
  let sel = tx.selection;
  let nodes = copy.get(Document.SNIPPET_ID).nodes;
  let textPath = [nodes[0], 'content'];
  let text = copy.get(textPath);
  let annotations = copy.getIndex('annotations').get(textPath);
  
  let path = sel.start.path;
  let offset = sel.start.offset;
  tx.insertText(text);
  
  forEach(annotations, function(anno) {
    let data = anno.toJSON();
    data.start.path = path.slice(0);
    data.start.offset += offset;
    data.end.offset += offset;
    
    if (tx.get(data.id)) data.id = uuid(data.type);
    tx.create(data);
  });
}

function _pasteDocument(tx, pasteDoc) {
  let sel = tx.selection;
  let containerId = sel.containerId;
  let container = tx.get(containerId);
  let insertPos;
  if (sel.isPropertySelection()) {
    let startPath = sel.start.path;
    let nodeId = sel.start.getNodeId();
    let startPos = container.getPosition(nodeId, 'strict');
    let text = tx.get(startPath);
    
    
    if (text.length === 0) {
      insertPos = startPos;
      container.hide(nodeId);
      documentHelpers.deleteNode(tx, tx.get(nodeId));
    } else if ( text.length === sel.start.offset ) {
      insertPos = startPos + 1;
    } else {
      tx.break();
      insertPos = startPos + 1;
    }
  } else if (sel.isNodeSelection()) {
    let nodePos = container.getPosition(sel.getNodeId(), 'strict');
    if (sel.isBefore()) {
      insertPos = nodePos;
    } else if (sel.isAfter()) {
      insertPos = nodePos+1;
    } else {
      throw new Error('Illegal state: the selection should be collapsed.')
    }
  }
  
  let nodeIds = pasteDoc.get(Document.SNIPPET_ID).nodes;
  let insertedNodes = [];
  let visited = {};
  for (let i = 0; i < nodeIds.length; i++) {
    let node = pasteDoc.get(nodeIds[i]);
    
    
    
    
    
    let newId = _transferWithDisambiguatedIds(node.getDocument(), tx, node.id, visited);
    
    node = tx.get(newId);
    container.showAt(insertPos++, newId);
    insertedNodes.push(node);
  }

  if (insertedNodes.length > 0) {
    let lastNode = last$1(insertedNodes);
    setCursor(tx, lastNode, containerId, 'after');
  }
}






function _transferWithDisambiguatedIds(sourceDoc, targetDoc, id, visited) {
  if (visited[id]) throw new Error('FIXME: dont call me twice')
  const node = sourceDoc.get(id, 'strict');
  let oldId = node.id;
  let newId;
  if (targetDoc.contains(node.id)) {
    
    newId = uuid(node.type);
    node.id = newId;
  }
  visited[id] = node.id;
  const annotationIndex = sourceDoc.getIndex('annotations');
  const nodeSchema = node.getSchema();
  
  let annos = [];
  
  
  
  for (let key in nodeSchema) {
    if (key === 'id' || key === 'type' || !nodeSchema.hasOwnProperty(key)) continue
    const prop = nodeSchema[key];
    const name = prop.name;
    
    if ((prop.isReference() && prop.isOwned()) || (prop.type === 'file')) {
      
      
      let val = node[prop.name];
      if (prop.isArray()) {
        _transferArrayOfReferences(sourceDoc, targetDoc, val, visited);
      } else {
        let id = val;
        if (!visited[id]) {
          node[name] = _transferWithDisambiguatedIds(sourceDoc, targetDoc, id, visited);
        }
      }
    }
    
    else if (prop.isText()) {
      
      
      
      
      
      let _annos = annotationIndex.get([oldId, prop.name]);
      for (let i = 0; i < _annos.length; i++) {
        let anno = _annos[i];
        if (anno.start.path[0] === oldId) {
          anno.start.path[0] = newId;
        }
        if (anno.end.path[0] === oldId) {
          anno.end.path[0] = newId;
        }
        annos.push(anno);
      }
    }
  }
  targetDoc.create(node);
  for (let i = 0; i < annos.length; i++) {
    _transferWithDisambiguatedIds(sourceDoc, targetDoc, annos[i].id, visited);
  }
  return node.id
}

function _transferArrayOfReferences(sourceDoc, targetDoc, arr, visited) {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    
    if (isArray$1(val)) {
      _transferArrayOfReferences(sourceDoc, targetDoc, val, visited);
    } else {
      let id = val;
      if (id && !visited[id]) {
        arr[i] = _transferWithDisambiguatedIds(sourceDoc, targetDoc, id, visited);
      }
    }
  }
}

class Editing {

  
  annotate(tx, annotation) {
    let sel = tx.selection;
    let schema = tx.getSchema();
    let AnnotationClass = schema.getNodeClass(annotation.type);
    if (!AnnotationClass) throw new Error('Unknown annotation type', annotation)
    let start = sel.start;
    let end = sel.end;
    let containerId = sel.containerId;
    let nodeData = { start, end, containerId };
    
    
    if (sel.isPropertySelection()) {
      if (!AnnotationClass.prototype._isAnnotation) {
        throw new Error('Annotation can not be created for a selection.')
      }
    } else if (sel.isContainerSelection()) {
      if (AnnotationClass.prototype._isPropertyAnnotation) {
        console.warn('NOT SUPPORTED YET: creating property annotations for a non collapsed container selection.');
      }
    }
    Object.assign(nodeData, annotation);
    return tx.create(nodeData)
  }

  break(tx) {
    let sel = tx.selection;
    if (sel.isNodeSelection()) {
      let containerId = sel.containerId;
      let container = tx.get(containerId);
      let nodeId = sel.getNodeId();
      let nodePos = container.getPosition(nodeId, 'strict');
      let textNode = tx.createDefaultTextNode();
      if (sel.isBefore()) {
        container.showAt(nodePos, textNode.id);
        
      } else {
        container.showAt(nodePos+1, textNode.id);
        setCursor(tx, textNode, containerId, 'before');
      }
    }
    else if (sel.isCustomSelection()) {
      
    }
    else if (sel.isCollapsed() || sel.isPropertySelection()) {
      let containerId = sel.containerId;
      if (!sel.isCollapsed()) {
        
        this._deletePropertySelection(tx, sel);
        tx.setSelection(sel.collapse('left'));
      }
      
      if (containerId) {
        let container = tx.get(containerId);
        let nodeId = sel.start.path[0];
        let node = tx.get(nodeId);
        this._breakNode(tx, node, sel.start, container);
      }
    }
    else if (sel.isContainerSelection()) {
      let start = sel.start;
      let containerId = sel.containerId;
      let container = tx.get(containerId);
      let startNodeId = start.path[0];
      let nodePos = container.getPosition(startNodeId, 'strict');
      this._deleteContainerSelection(tx, sel, {noMerge: true });
      setCursor(tx, container.getNodeAt(nodePos+1), containerId, 'before');
    }
  }

  delete(tx, direction) {
    let sel = tx.selection;
    
    
    
    
    if (sel.isNodeSelection()) {
      this._deleteNodeSelection(tx, sel, direction);
    }
    
    else if (sel.isCustomSelection()) {}
    
    
    else if (sel.isCollapsed()) {
      
      
      
      let path = sel.start.path;
      let node = tx.get(path[0]);
      let text = tx.get(path);
      let offset = sel.start.offset;
      let needsMerge = (sel.containerId && (
        (offset === 0 && direction === 'left') ||
        (offset === text.length && direction === 'right')
      ));
      if (needsMerge) {
        
        
        
        let root = node.getContainerRoot();
        if (root.isList() && offset === 0 && direction === 'left') {
          return this.toggleList(tx)
        } else {
          let container = tx.get(sel.containerId);
          this._merge(tx, root, sel.start, direction, container);
        }
      } else {
        
        if ((offset === 0 && direction === 'left') ||
          (offset === text.length && direction === 'right')) {
          return
        }
        let startOffset = (direction === 'left') ? offset-1 : offset;
        let endOffset = startOffset+1;
        let start = { path: path, offset: startOffset };
        let end = { path: path, offset: endOffset };
        documentHelpers.deleteTextRange(tx, start, end);
        tx.setSelection({
          type: 'property',
          path: path,
          startOffset: startOffset,
          containerId: sel.containerId
        });
      }
    }
    
    else if (sel.isPropertySelection()) {
      documentHelpers.deleteTextRange(tx, sel.start, sel.end);
      tx.setSelection(sel.collapse('left'));
    }
    
    else if (sel.isContainerSelection()) {
      this._deleteContainerSelection(tx, sel);
    }
    else {
      console.warn('Unsupported case: tx.delete(%)', direction, sel);
    }
  }

  _deleteNodeSelection(tx, sel, direction) {
    let nodeId = sel.getNodeId();
    let container = tx.get(sel.containerId);
    let nodePos = container.getPosition(nodeId, 'strict');
    if (sel.isFull() ||
        sel.isBefore() && direction === 'right' ||
        sel.isAfter() && direction === 'left' ) {
      
      container.hideAt(nodePos);
      documentHelpers.deleteNode(tx, tx.get(nodeId));
      let newNode = tx.createDefaultTextNode();
      container.showAt(nodePos, newNode.id);
      tx.setSelection({
        type: 'property',
        path: newNode.getTextPath(),
        startOffset: 0,
        containerId: container.id,
      });
    } else {
      
      if (sel.isBefore() && direction === 'left') {
        if (nodePos > 0) {
          let previous = container.getNodeAt(nodePos-1);
          if (previous.isText()) {
            tx.setSelection({
              type: 'property',
              path: previous.getTextPath(),
              startOffset: previous.getLength()
            });
            this.delete(tx, direction);
          } else {
            tx.setSelection({
              type: 'node',
              nodeId: previous.id,
              containerId: container.id
            });
          }
        } else {
          
        }
      } else if (sel.isAfter() && direction === 'right') {
        if (nodePos < container.getLength()-1) {
          let next = container.getNodeAt(nodePos+1);
          if (next.isText()) {
            tx.setSelection({
              type: 'property',
              path: next.getTextPath(),
              startOffset: 0
            });
            this.delete(tx, direction);
          } else {
            tx.setSelection({
              type: 'node',
              nodeId: next.id,
              containerId: container.id
            });
          }
        } else {
          
        }
      } else {
        console.warn('Unsupported case: delete(%s)', direction, sel);
      }
    }
  }

  _deletePropertySelection(tx, sel) {
    let path = sel.start.path;
    let start = sel.start.offset;
    let end = sel.end.offset;
    tx.update(path, { type: 'delete', start: start, end: end });
    annotationHelpers.deletedText(tx, path, start, end);
  }

  
  _deleteContainerSelection(tx, sel, options = {}) {
    let containerId = sel.containerId;
    let container = tx.get(containerId);
    let start = sel.start;
    let end = sel.end;
    let startId = start.getNodeId();
    let endId = end.getNodeId();
    let startPos = container.getPosition(startId, 'strict');
    let endPos = container.getPosition(endId, 'strict');

    
    if (startPos === endPos) {
      
      let node = tx.get(startId).getContainerRoot();
      
      if (node.isText()) {
        documentHelpers.deleteTextRange(tx, start, end);
      } else if (node.isList()) {
        documentHelpers.deleteListRange(tx, node, start, end);
      } else {
        throw new Error('Not supported yet.')
      }
      tx.setSelection(sel.collapse('left'));
      return
    }

    

    let firstNode = tx.get(start.getNodeId());
    let lastNode = tx.get(end.getNodeId());
    let firstEntirelySelected = isEntirelySelected(tx, firstNode, start, null);
    let lastEntirelySelected = isEntirelySelected(tx, lastNode, null, end);

    
    if (lastEntirelySelected) {
      container.hideAt(endPos);
      documentHelpers.deleteNode(tx, lastNode);
    } else {
      
      let node = lastNode.getContainerRoot();
      
      if (node.isText()) {
        documentHelpers.deleteTextRange(tx, null, end);
      } else if (node.isList()) {
        documentHelpers.deleteListRange(tx, node, null, end);
      } else {
        
      }
    }

    
    for (let i = endPos-1; i > startPos; i--) {
      let nodeId = container.getNodeIdAt(i);
      container.hideAt(i);
      documentHelpers.deleteNode(tx, tx.get(nodeId));
    }

    
    if (firstEntirelySelected) {
      container.hideAt(startPos);
      documentHelpers.deleteNode(tx, firstNode);
    } else {
      
      let node = firstNode.getContainerRoot();
      
      if (node.isText()) {
        documentHelpers.deleteTextRange(tx, start, null);
      } else if (node.isList()) {
        documentHelpers.deleteListRange(tx, node, start, null);
      } else {
        
      }
    }

    
    if (firstEntirelySelected && lastEntirelySelected) {
      
      let textNode = tx.createDefaultTextNode();
      container.showAt(startPos, textNode.id);
      tx.setSelection({
        type: 'property',
        path: textNode.getTextPath(),
        startOffset: 0,
        containerId: containerId
      });
    } else if (!firstEntirelySelected && !lastEntirelySelected) {
      if (!options.noMerge) {
        this._merge(tx, firstNode, sel.start, 'right', container);
      }
      tx.setSelection(sel.collapse('left'));
    } else if (firstEntirelySelected) {
      setCursor(tx, lastNode, container.id, 'before');
    } else {
      setCursor(tx, firstNode, container.id, 'after');
    }
  }

  insertInlineNode(tx, nodeData) {
    let sel = tx.selection;
    let text = "\uFEFF";
    this.insertText(tx, text);
    sel = tx.selection;
    let endOffset = tx.selection.end.offset;
    let startOffset = endOffset - text.length;
    nodeData = Object.assign({}, nodeData, {
      start: {
        path: sel.path,
        offset: startOffset
      },
      end: {
        path: sel.path,
        offset: endOffset
      }
    });
    return tx.create(nodeData)
  }

  insertBlockNode(tx, nodeData) {
    let sel = tx.selection;
    
    let blockNode;
    if (!nodeData._isNode || !tx.get(nodeData.id)) {
      blockNode = tx.create(nodeData);
    } else {
      blockNode = tx.get(nodeData.id);
    }
    
    if (sel.isNodeSelection()) {
      let containerId = sel.containerId;
      let container = tx.get(containerId);
      let nodeId = sel.getNodeId();
      let nodePos = container.getPosition(nodeId, 'strict');
      
      if (sel.isBefore()) {
        container.showAt(nodePos, blockNode.id);
      }
      
      else if (sel.isAfter()) {
        container.showAt(nodePos+1, blockNode.id);
        tx.setSelection({
          type: 'node',
          containerId: containerId,
          nodeId: blockNode.id,
          mode: 'after'
        });
      } else {
        container.hideAt(nodePos);
        documentHelpers.deleteNode(tx, tx.get(nodeId));
        container.showAt(nodePos, blockNode.id);
        tx.setSelection({
          type: 'node',
          containerId: containerId,
          nodeId: blockNode.id,
          mode: 'after'
        });
      }
    } else if (sel.isPropertySelection()) {
      
      if (!sel.containerId) throw new Error('insertBlockNode can only be used within a container.')
      let container = tx.get(sel.containerId);
      if (!sel.isCollapsed()) {
        this._deletePropertySelection(tx, sel);
        tx.setSelection(sel.collapse('left'));
      }
      let node = tx.get(sel.path[0]);
      
      if (!node) throw new Error('Invalid selection.')
      let nodePos = container.getPosition(node.id, 'strict');
      
      if (node.isText()) {
        let text = node.getText();
        
        if (text.length === 0) {
          container.hideAt(nodePos);
          documentHelpers.deleteNode(tx, node);
          container.showAt(nodePos, blockNode.id);
          setCursor(tx, blockNode, container.id, 'after');
        }
        
        else if (sel.start.offset === 0) {
          container.showAt(nodePos, blockNode.id);
        }
        
        else if (sel.start.offset === text.length) {
          container.showAt(nodePos+1, blockNode.id);
          setCursor(tx, blockNode, container.id, 'before');
        }
        
        else {
          this.break(tx);
          container.showAt(nodePos+1, blockNode.id);
          setCursor(tx, blockNode, container.id, 'after');
        }
      } else {
        console.error('Not supported: insertBlockNode() on a custom node');
      }
    } else if (sel.isContainerSelection()) {
      if (sel.isCollapsed()) {
        let start = sel.start;
        
        if (start.isPropertyCoordinate()) {
          tx.setSelection({
            type: 'property',
            path: start.path,
            startOffset: start.offset,
            containerId: sel.containerId,
          });
        } else if (start.isNodeCoordinate()) {
          tx.setSelection({
            type: 'node',
            containerId: sel.containerId,
            nodeId: start.path[0],
            mode: start.offset === 0 ? 'before' : 'after',
          });
        } else {
          throw new Error('Unsupported selection for insertBlockNode')
        }
        return this.insertBlockNode(tx, blockNode)
      } else {
        this.break(tx);
        return this.insertBlockNode(tx, blockNode)
      }
    }
    return blockNode
  }

  insertText(tx, text) {
    let sel = tx.selection;
    
    
    
    if (sel.isNodeSelection()) {
      let containerId = sel.containerId;
      let container = tx.get(containerId);
      let nodeId = sel.getNodeId();
      let nodePos = container.getPosition(nodeId, 'strict');
      let textNode = tx.createDefaultTextNode(text);
      if (sel.isBefore()) {
        container.showAt(nodePos, textNode);
      } else if (sel.isAfter()) {
        container.showAt(nodePos+1, textNode);
      } else {
        container.hide(nodeId);
        documentHelpers.deleteNode(tx, tx.get(nodeId));
        container.showAt(nodePos, textNode);
      }
      setCursor(tx, textNode, sel.containerId, 'after');
    } else if (sel.isCustomSelection()) {
      
    } else if (sel.isCollapsed() || sel.isPropertySelection()) {
      
      this._insertText(tx, sel, text);
      
    } else if (sel.isContainerSelection()) {
      this._deleteContainerSelection(tx, sel);
      this.insertText(tx, text);
    }
  }

  paste(tx, content) {
    if (!content) return
    
    if (isString$1(content)) {
      paste(tx, {text: content});
    } else if (content._isDocument) {
      paste(tx, {doc: content});
    } else {
      throw new Error('Illegal content for paste.')
    }
  }

  
  switchTextType(tx, data) {
    let sel = tx.selection;
    
    if (!sel.isPropertySelection()) {
      throw new Error("Selection must be a PropertySelection.")
    }
    let containerId = sel.containerId;
    
    if (!containerId) {
      throw new Error("Selection must be within a container.")
    }
    let path = sel.path;
    let nodeId = path[0];
    let node = tx.get(nodeId);
    
    if (!(node.isInstanceOf('text'))) {
      throw new Error('Trying to use switchTextType on a non text node.')
    }
    
    let newNode = Object.assign({
      id: uuid(data.type),
      type: data.type,
      content: node.content,
      direction: node.direction
    }, data);
    let newPath = [newNode.id, 'content'];
    newNode = tx.create(newNode);
    annotationHelpers.transferAnnotations(tx, path, 0, newPath, 0);

    
    let container = tx.get(sel.containerId);
    let pos = container.getPosition(nodeId, 'strict');
    container.hide(nodeId);
    documentHelpers.deleteNode(tx, node);
    container.showAt(pos, newNode.id);

    tx.setSelection({
      type: 'property',
      path: newPath,
      startOffset: sel.start.offset,
      endOffset: sel.end.offset,
      containerId: containerId
    });

    return newNode
  }

  toggleList(tx, params) {
    let sel = tx.selection;
    let container = tx.get(sel.containerId);
    
    if (!container) {
      throw new Error("Selection must be within a container.")
    }
    if (sel.isPropertySelection()) {
      let nodeId = sel.start.path[0];
      
      let node = tx.get(nodeId).getContainerRoot();
      let nodePos = container.getPosition(node.id, 'strict');
      
      if (node.isText()) {
        container.hideAt(nodePos);
        
        let newItem = tx.create({
          type: 'list-item',
          content: node.getText(),
        });
        annotationHelpers.transferAnnotations(tx, node.getTextPath(), 0, newItem.getTextPath(), 0);
        let newList = tx.create(Object.assign({
          type: 'list',
          items: [newItem.id]
        }, params));
        documentHelpers.deleteNode(tx, node);
        container.showAt(nodePos, newList.id);
        tx.setSelection({
          type: 'property',
          path: newItem.getTextPath(),
          startOffset: sel.start.offset,
          containerId: sel.containerId
        });
      } else if (node.isList()) {
        let itemId = sel.start.path[0];
        let itemPos = node.getItemPosition(itemId);
        let item = node.getItemAt(itemPos);
        let newTextNode = tx.createDefaultTextNode(item.getText());
        annotationHelpers.transferAnnotations(tx, item.getTextPath(), 0, newTextNode.getTextPath(), 0);
        
        node.removeItemAt(itemPos);
        if (node.isEmpty()) {
          container.hideAt(nodePos);
          documentHelpers.deleteNode(tx, node);
          container.showAt(nodePos, newTextNode.id);
        } else if (itemPos === 0) {
          container.showAt(nodePos, newTextNode.id);
        } else if (node.getLength() <= itemPos){
          container.showAt(nodePos+1, newTextNode.id);
        } else {
          
          let tail = [];
          const items = node.items.slice();
          const L = items.length;
          for (let i = L-1; i >= itemPos; i--) {
            tail.unshift(items[i]);
            node.removeItemAt(i);
          }
          let newList = tx.create({
            type: 'list',
            items: tail,
            ordered: node.ordered
          });
          container.showAt(nodePos+1, newTextNode.id);
          container.showAt(nodePos+2, newList.id);
        }
        tx.setSelection({
          type: 'property',
          path: newTextNode.getTextPath(),
          startOffset: sel.start.offset,
          containerId: sel.containerId
        });
      } else {
        
      }
    } else if (sel.isContainerSelection()) {
      console.error('TODO: support toggleList with ContainerSelection');
    }
  }

  indent(tx) {
    let sel = tx.selection;
    if (sel.isPropertySelection()) {
      let nodeId = sel.start.getNodeId();
      
      let node = tx.get(nodeId).getContainerRoot();
      if (node.isList()) {
        let itemId = sel.start.path[0];
        let item = tx.get(itemId);
        
        if (item && item.level<3) {
          tx.set([itemId, 'level'], item.level+1);
        }
      }
    } else if (sel.isContainerSelection()) {
      console.error('TODO: support toggleList with ContainerSelection');
    }
  }

  dedent(tx) {
    let sel = tx.selection;
    if (sel.isPropertySelection()) {
      let nodeId = sel.start.getNodeId();
      
      let node = tx.get(nodeId).getContainerRoot();
      if (node.isList()) {
        let itemId = sel.start.path[0];
        let item = tx.get(itemId);
        if (item && item.level>1) {
          tx.set([itemId, 'level'], item.level-1);
        }
      }
    } else if (sel.isContainerSelection()) {
      console.error('TODO: support toggleList with ContainerSelection');
    }
  }

  
  _insertText(tx, sel, text) {
    let start = sel.start;
    let end = sel.end;
    
    if (!isArrayEqual(start.path, end.path)) {
      throw new Error('Unsupported state: range should be on one property')
    }
    let path = start.path;
    let startOffset = start.offset;
    let endOffset = end.offset;
    let typeover = !sel.isCollapsed();
    let L = text.length;
    
    if (typeover) {
      tx.update(path, { type: 'delete', start: startOffset, end: endOffset });
    }
    
    tx.update(path, { type: 'insert', start: startOffset, text: text });
    
    let annos = tx.getAnnotations(path);
    annos.forEach(function(anno) {
      let annoStart = anno.start.offset;
      let annoEnd = anno.end.offset;

      
      
      if (annoEnd<startOffset) {
        return
      }
      
      else if (annoStart>=endOffset) {
        tx.update([anno.id, 'start'], { type: 'shift', value: startOffset-endOffset+L });
        tx.update([anno.id, 'end'], { type: 'shift', value: startOffset-endOffset+L });
      }
      
      
      
      
      else if (
        (annoStart>=startOffset && annoEnd<endOffset) ||
        (anno._isInlineNode && annoStart>=startOffset && annoEnd<=endOffset)
      ) {
        tx.delete(anno.id);
      }
      
      else if (annoStart>=startOffset && annoEnd>=endOffset) {
        
        if (annoStart>startOffset || !typeover) {
          tx.update([anno.id, 'start'], { type: 'shift', value: startOffset-annoStart+L });
        }
        tx.update([anno.id, 'end'], { type: 'shift', value: startOffset-endOffset+L });
      }
      
      else if (annoStart<startOffset && annoEnd<endOffset) {
        
        tx.update([anno.id, 'end'], { type: 'shift', value: startOffset-annoEnd+L });
      }
      
      else if (annoEnd === startOffset && !anno.constructor.autoExpandRight) {
          
      }
      
      else if (annoStart<startOffset && annoEnd>=endOffset) {
        if (anno._isInlineNode) {
          
        } else {
          tx.update([anno.id, 'end'], { type: 'shift', value: startOffset-endOffset+L });
        }
      }
      else {
        console.warn('TODO: handle annotation update case.');
      }
    });
    let offset = startOffset + text.length;
    tx.setSelection({
      type: 'property',
      path: start.path,
      startOffset: offset,
      containerId: sel.containerId,
      surfaceId: sel.surfaceId
    });
  }

  _breakNode(tx, node, coor, container) {
    
    node = node.getContainerRoot();
    
    if (node.isText()) {
      this._breakTextNode(tx, node, coor, container);
    } else if (node.isList()) {
      this._breakListNode(tx, node, coor, container);
    } else {
      throw new Error('Not supported')
    }
  }

  _breakTextNode(tx, node, coor, container) {
    let path = coor.path;
    let offset = coor.offset;
    let nodePos = container.getPosition(node.id, 'strict');
    let text = node.getText();

    
    
    if (offset === 0) {
      let newNode = tx.create({
        type: node.type,
        content: ""
      });
      
      container.showAt(nodePos, newNode.id);
      tx.setSelection({
        type: 'property',
        path: path,
        startOffset: 0,
        containerId: container.id
      });
    }
    
    else {
      let newNode = node.toJSON();
      delete newNode.id;
      newNode.content = text.substring(offset);
      
      if (offset === text.length) {
        newNode.type = tx.getSchema().getDefaultTextType();
      }
      newNode = tx.create(newNode);
      
      if (offset < text.length) {
        
        annotationHelpers.transferAnnotations(tx, path, offset, newNode.getTextPath(), 0);
        
        tx.update(path, { type: 'delete', start: offset, end: text.length });
      }
      
      container.showAt(nodePos+1, newNode.id);
      
      tx.setSelection({
        type: 'property',
        path: newNode.getTextPath(),
        startOffset: 0,
        containerId: container.id
      });
    }
  }

  _breakListNode(tx, node, coor, container) {
    let path = coor.path;
    let offset = coor.offset;
    let listItem = tx.get(path[0]);

    let L = node.length;
    let itemPos = node.getItemPosition(listItem.id);
    let text = listItem.getText();
    let newItem = listItem.toJSON();
    delete newItem.id;
    if (offset === 0) {
      
      if (!text) {
        
        
        let nodePos = container.getPosition(node.id, 'strict');
        let newTextNode = tx.createDefaultTextNode();
        
        if (L < 2) {
          container.hide(node.id);
          documentHelpers.deleteNode(tx, node);
          container.showAt(nodePos, newTextNode.id);
        }
        
        else if (itemPos === 0) {
          node.remove(listItem.id);
          documentHelpers.deleteNode(tx, listItem);
          container.showAt(nodePos, newTextNode.id);
        }
        
        else if (itemPos >= L-1) {
          node.remove(listItem.id);
          documentHelpers.deleteNode(tx, listItem);
          container.showAt(nodePos+1, newTextNode.id);
        }
        
        else {
          let tail = [];
          const items = node.items.slice();
          for (let i = L-1; i > itemPos; i--) {
            tail.unshift(items[i]);
            node.remove(items[i]);
          }
          node.remove(items[itemPos]);
          let newList = tx.create({
            type: 'list',
            items: tail,
            ordered: node.ordered
          });
          container.showAt(nodePos+1, newTextNode.id);
          container.showAt(nodePos+2, newList.id);
        }
        tx.setSelection({
          type: 'property',
          path: newTextNode.getTextPath(),
          startOffset: 0
        });
      }
      
      else {
        newItem.content = "";
        newItem = tx.create(newItem);
        node.insertItemAt(itemPos, newItem.id);
        tx.setSelection({
          type: 'property',
          path: listItem.getTextPath(),
          startOffset: 0
        });
      }
    }
    
    else {
      newItem.content = text.substring(offset);
      newItem = tx.create(newItem);
      
      if (offset < text.length) {
        
        annotationHelpers.transferAnnotations(tx, path, offset, [newItem.id,'content'], 0);
        
        tx.update(path, { type: 'delete', start: offset, end: text.length });
      }
      node.insertItemAt(itemPos+1, newItem.id);
      tx.setSelection({
        type: 'property',
        path: newItem.getTextPath(),
        startOffset: 0
      });
    }
  }

  _merge(tx, node, coor, direction, container) {
    
    
    if (node.isList()) {
      let list = node;
      let itemId = coor.path[0];
      let itemPos = list.getItemPosition(itemId);
      let withinListNode = (
        (direction === 'left' && itemPos > 0) ||
        (direction === 'right' && itemPos<list.items.length-1)
      );
      if (withinListNode) {
        itemPos = (direction === 'left') ? itemPos-1 : itemPos;
        let target = list.getItemAt(itemPos);
        let targetLength = target.getLength();
        documentHelpers.mergeListItems(tx, list.id, itemPos);
        tx.setSelection({
          type: 'property',
          path: target.getTextPath(),
          startOffset: targetLength,
          containerId: container.id
        });
        return
      }
    }
    
    let nodePos = container.getPosition(node, 'strict');
    if (direction === 'left' && nodePos > 0) {
      this._mergeNodes(tx, container, nodePos-1, direction);
    } else if (direction === 'right' && nodePos<container.getLength()-1) {
      this._mergeNodes(tx, container, nodePos, direction);
    }
  }

  _mergeNodes(tx, container, pos, direction) {
    let first = container.getChildAt(pos);
    let second = container.getChildAt(pos+1);
    if (first.isText()) {
      
      if (first.isEmpty()) {
        container.hide(first.id);
        documentHelpers.deleteNode(tx, first);
        
        
        setCursor(tx, second, container.id, 'before');
        return
      }
      let target = first;
      let targetPath = target.getTextPath();
      let targetLength = target.getLength();
      if (second.isText()) {
        let source = second;
        let sourcePath = source.getTextPath();
        container.hide(source.id);
        
        tx.update(targetPath, { type: 'insert', start: targetLength, text: source.getText() });
        
        annotationHelpers.transferAnnotations(tx, sourcePath, 0, targetPath, targetLength);
        documentHelpers.deleteNode(tx, source);
        tx.setSelection({
          type: 'property',
          path: targetPath,
          startOffset: targetLength,
          containerId: container.id
        });
      } else if (second.isList()) {
        let list = second;
        if (!second.isEmpty()) {
          let source = list.getFirstItem();
          let sourcePath = source.getTextPath();
          
          list.removeItemAt(0);
          
          tx.update(targetPath, { type: 'insert', start: targetLength, text: source.getText() });
          
          annotationHelpers.transferAnnotations(tx, sourcePath, 0, targetPath, targetLength);
          
          documentHelpers.deleteNode(tx, source);
        }
        if (list.isEmpty()) {
          container.hide(list.id);
          documentHelpers.deleteNode(tx, list);
        }
        tx.setSelection({
          type: 'property',
          path: targetPath,
          startOffset: targetLength,
          containerId: container.id
        });
      } else {
        selectNode(tx, direction === 'left' ? first.id : second.id, container.id);
      }
    } else if (first.isList()) {
      if (second.isText()) {
        let source = second;
        let sourcePath = source.getTextPath();
        let target = first.getLastItem();
        let targetPath = target.getTextPath();
        let targetLength = target.getLength();
        
        container.hide(source.id);
        
        tx.update(targetPath, { type: 'insert', start: targetLength, text: source.getText() });
        
        annotationHelpers.transferAnnotations(tx, sourcePath, 0, targetPath, targetLength);
        documentHelpers.deleteNode(tx, source);
        tx.setSelection({
          type: 'property',
          path: target.getTextPath(),
          startOffset: targetLength,
          containerId: container.id
        });
      } else if (second.isList()) {
        
        if (direction !== 'right') {
          
          
          throw new Error('Illegal state')
        }
        container.hide(second.id);
        let firstItems = first.items.slice();
        let secondItems = second.items.slice();
        for (let i=0; i<secondItems.length;i++) {
          second.removeItemAt(0);
          first.appendItem(secondItems[i]);
        }
        documentHelpers.deleteNode(tx, second);
        let item = tx.get(last$1(firstItems));
        tx.setSelection({
          type: 'property',
          path: item.getTextPath(),
          startOffset: item.getLength(),
          containerId: container.id
        });
      } else {
        selectNode(tx, direction === 'left' ? first.id : second.id, container.id);
      }
    } else {
      if (second.isText() && second.isEmpty()) {
        container.hide(second.id);
        documentHelpers.deleteNode(tx, second);
        setCursor(tx, first, container.id, 'after');
      } else {
        selectNode(tx, direction === 'left' ? first.id : second.id, container.id);
      }
    }
  }
}

class EditingInterface {

  constructor(doc) {
    this._document = doc;
    this._selection = null;
    
    this._impl = new Editing();
    this._direction = null;
  }

  dispose() {}

  getDocument() {
    return this._document
  }

  

  get(...args) {
    return this._document.get(...args)
  }

  contains(id) {
    return this._document.contains(id)
  }

  create(nodeData) {
    return this._document.create(nodeData)
  }

  createDefaultTextNode(content) {
    return this._document.createDefaultTextNode(content, this._direction)
  }

  delete(nodeId) {
    return this._document.delete(nodeId)
  }

  set(path, value) {
    return this._document.set(path, value)
  }

  update(path, diffOp) {
    return this._document.update(path, diffOp)
  }

  

  createSelection(selData) {
    
    
    
    
    
    
    
    selData = augmentSelection(selData, this._selection);
    return this._document.createSelection(selData)
  }

  setSelection(sel) {
    if (!sel) {
      sel = Selection.nullSelection;
    } else if (isPlainObject$1(sel)) {
      sel = this.createSelection(sel);
    } else {
      sel = augmentSelection(sel, this._selection);
    }
    this._selection = sel;
    return sel
  }

  getSelection() {
    return this._selection
  }

  get selection() {
    return this._selection
  }

  set selection(sel) {
    this.setSelection(sel);
  }

  
  get textDirection() {
    return this._direction
  }

  set textDirection(dir) {
    this._direction = dir;
  }

  

  annotate(annotationData) {
    const sel = this._selection;
    if (sel && (sel.isPropertySelection() || sel.isContainerSelection())) {
      return this._impl.annotate(this, annotationData)
    }
  }

  break() {
    if (this._selection && !this._selection.isNull()) {
      this._impl.break(this);
    }
  }

  copySelection() {
    const sel = this._selection;
    if (sel && !sel.isNull() && !sel.isCollapsed()) {
      return copySelection(this.getDocument(), this._selection)
    }
  }

  deleteSelection(options) {
    const sel = this._selection;
    if (sel && !sel.isNull() && !sel.isCollapsed()) {
      this._impl.delete(this, 'right', options);
    }
  }

  deleteCharacter(direction) {
    const sel = this._selection;
    if (!sel || sel.isNull()) {
      
    } else if (!sel.isCollapsed()) {
      this.deleteSelection();
    } else {
      this._impl.delete(this, direction);
    }
  }

  insertText(text) {
    const sel = this._selection;
    if (sel && !sel.isNull()) {
      this._impl.insertText(this, text);
    }
  }

  
  insertInlineNode(inlineNode) {
    const sel = this._selection;
    if (sel && !sel.isNull() && sel.isPropertySelection()) {
      return this._impl.insertInlineNode(this, inlineNode)
    }
  }

  insertBlockNode(blockNode) {
    const sel = this._selection;
    if (sel && !sel.isNull()) {
      return this._impl.insertBlockNode(this, blockNode)
    }
  }

  paste(content) {
    const sel = this._selection;
    if (sel && !sel.isNull()) {
      return this._impl.paste(this, content)
    }
  }

  switchTextType(nodeData) {
    const sel = this._selection;
    if (sel && !sel.isNull()) {
      return this._impl.switchTextType(this, nodeData)
    }
  }

  toggleList(params) {
    const sel = this._selection;
    if (sel && !sel.isNull()) {
      return this._impl.toggleList(this, params)
    }
  }

  indent() {
    const sel = this._selection;
    if (sel && !sel.isNull()) {
      return this._impl.indent(this)
    }
  }

  dedent() {
    const sel = this._selection;
    if (sel && !sel.isNull()) {
      return this._impl.dedent(this)
    }
  }

  

  getIndex(...args) {
    return this._document.getIndex(...args)
  }

  getAnnotations(...args) {
    return this._document.getAnnotations(...args)
  }

  getSchema() {
    return this._document.getSchema()
  }

  createSnippet() {
    return this._document.createSnippet()
  }

}

class ChangeRecorder extends EditingInterface {

  constructor(doc) {
    super(doc.clone());
  }

  generateChange() {
    const doc = this.getDocument();
    const ops = doc._ops.slice();
    doc._ops.length = 0;
    let change = new DocumentChange(ops, {}, {});
    change._extractInformation(doc);
    return change
  }

}

var documentHelpers = {
  getPropertyAnnotationsForSelection,
  getContainerAnnotationsForSelection,
  getTextForSelection,
  getMarkersForSelection,
  getChangeFromDocument,
  copyNode,
  deleteNode,
  deleteTextRange,
  deleteListRange,
  mergeListItems,
  isContainerAnnotation,
  getNodes
};


function getPropertyAnnotationsForSelection(doc, sel, options) {
  options = options || {};
  if (!sel.isPropertySelection()) {
    return []
  }
  let path = sel.getPath();
  let annotations = doc.getIndex('annotations').get(path, sel.start.offset, sel.end.offset);
  if (options.type) {
    annotations = filter(annotations, DocumentIndex.filterByType(options.type));
  }
  return annotations
}


function getContainerAnnotationsForSelection(doc, sel, containerId, options) {
  
  
  
  
  
  if (!containerId) {
    throw new Error("'containerId' is required.")
  }
  options = options || {};
  let index = doc.getIndex('container-annotations');
  let annotations = [];
  if (index) {
    annotations = index.get(containerId, options.type);
    annotations = filter(annotations, function(anno) {
      return sel.overlaps(anno.getSelection())
    });
  }
  return annotations
}


function isContainerAnnotation(doc, type) {
  let schema = doc.getSchema();
  return schema.isInstanceOf(type, 'container-annotation')
}


function getTextForSelection(doc, sel) {
  if (!sel || sel.isNull()) {
    return ""
  } else if (sel.isPropertySelection()) {
    let text = doc.get(sel.start.path);
    return text.substring(sel.start.offset, sel.end.offset)
  } else if (sel.isContainerSelection()) {
    let result = [];
    let nodeIds = sel.getNodeIds();
    let L = nodeIds.length;
    for (let i = 0; i < L; i++) {
      let id = nodeIds[i];
      let node = doc.get(id);
      if (node.isText()) {
        let text = node.getText();
        if (i === L-1) {
          text = text.slice(0, sel.end.offset);
        }
        if (i === 0) {
          text = text.slice(sel.start.offset);
        }
        result.push(text);
      }
    }
    return result.join('\n')
  }
}

function getMarkersForSelection(doc, sel) {
  
  if (!sel || !sel.isPropertySelection()) return []
  const path = sel.getPath();
  
  let markers = doc.getIndex('markers').get(path);
  const filtered = filter(markers, function(m) {
    return m.containsSelection(sel)
  });
  return filtered
}

function getChangeFromDocument(doc) {
  let recorder = new ChangeRecorder(doc);
  return recorder.generateChange()
}


function deleteNode(doc, node) {
  
  if (!node) {
    console.warn('Invalid arguments');
    return
  }
  
  if (node.isText()) {
    
    let annos = doc.getIndex('annotations').get(node.id);
    for (let i = 0; i < annos.length; i++) {
      doc.delete(annos[i].id);
    }
  }
  
  
  
  let nodeSchema = node.getSchema();
  forEach(nodeSchema, (prop) => {
    if ((prop.isReference() && prop.isOwned()) || (prop.type === 'file')) {
      if (prop.isArray()) {
        let ids = node[prop.name];
        ids.forEach((id) => {
          deleteNode(doc, doc.get(id));
        });
      } else {
        deleteNode(doc, doc.get(node[prop.name]));
      }
    }
  });
  doc.delete(node.id);
}


function copyNode(node) {
  let nodes = [];
  
  let nodeSchema = node.getSchema();
  let doc = node.getDocument();
  forEach(nodeSchema, (prop) => {
    
    
    if ((prop.isReference() && prop.isOwned()) || (prop.type === 'file')) {
      let val = node[prop.name];
      nodes.push(_copyChildren(val));
    }
  });
  nodes.push(node.toJSON());
  let annotationIndex = node.getDocument().getIndex('annotations');
  let annotations = annotationIndex.get([node.id]);
  forEach(annotations, function(anno) {
    nodes.push(anno.toJSON());
  });
  let result = flatten(nodes).filter(Boolean);
  
  return result

  function _copyChildren(val) {
    if (!val) return null
    if (isArray$1(val)) {
      return flatten(val.map(_copyChildren))
    } else {
      let id = val;
      if (!id) return null
      let child = doc.get(id);
      if (!child) return
      return copyNode(child)
    }
  }
}


function deleteTextRange(doc, start, end) {
  if (!start) {
    start = {
      path: end.path,
      offset: 0
    };
  }
  let path = start.path;
  let text = doc.get(path);
  if (!end) {
    end = {
      path: start.path,
      offset: text.length
    };
  }
  
  if (!isArrayEqual(start.path, end.path)) {
    throw new Error('start and end must be on one property')
  }
  let startOffset = start.offset;
  if (startOffset < 0) throw new Error("start offset must be >= 0")
  let endOffset = end.offset;
  if (endOffset > text.length) throw new Error("end offset must be smaller than the text length")

  doc.update(path, { type: 'delete', start: startOffset, end: endOffset });
  
  let annos = doc.getAnnotations(path);
  annos.forEach(function(anno) {
    let annoStart = anno.start.offset;
    let annoEnd = anno.end.offset;
    
    if (annoEnd<=startOffset) {
      return
    }
    
    else if (annoStart>=endOffset) {
      doc.update([anno.id, 'start'], { type: 'shift', value: startOffset-endOffset });
      doc.update([anno.id, 'end'], { type: 'shift', value: startOffset-endOffset });
    }
    
    else if (annoStart>=startOffset && annoEnd<=endOffset) {
      doc.delete(anno.id);
    }
    
    else if (annoStart>=startOffset && annoEnd>=endOffset) {
      if (annoStart>startOffset) {
        doc.update([anno.id, 'start'], { type: 'shift', value: startOffset-annoStart });
      }
      doc.update([anno.id, 'end'], { type: 'shift', value: startOffset-endOffset });
    }
    
    else if (annoStart<=startOffset && annoEnd<=endOffset) {
      doc.update([anno.id, 'end'], { type: 'shift', value: startOffset-annoEnd });
    }
    
    else if (annoStart<startOffset && annoEnd >= endOffset) {
      doc.update([anno.id, 'end'], { type: 'shift', value: startOffset-endOffset });
    }
    else {
      console.warn('TODO: handle annotation update case.');
    }
  });
}

function deleteListRange(doc, list, start, end) {
  if (doc !== list.getDocument()) {
    list = doc.get(list.id);
  }
  if (!start) {
    start = {
      path: list.getItemAt(0).getTextPath(),
      offset: 0
    };
  }
  if (!end) {
    let item = list.getLastItem();
    end = {
      path: item.getTextPath(),
      offset: item.getLength()
    };
  }
  let startId = start.path[0];
  let startPos = list.getItemPosition(startId);
  let endId = end.path[0];
  let endPos = list.getItemPosition(endId);
  
  if (startPos === endPos) {
    deleteTextRange(doc, start, end);
    return
  }
  
  if (startPos > endPos) {
    [start, end] = [end, start];
    [startPos, endPos] = [endPos, startPos];
    [startId, endId] = [endId, startId];
  }
  let firstItem = doc.get(startId);
  let lastItem = doc.get(endId);
  let firstEntirelySelected = isEntirelySelected(doc, firstItem, start, null);
  let lastEntirelySelected = isEntirelySelected(doc, lastItem, null, end);

  
  if (lastEntirelySelected) {
    list.removeItemAt(endPos);
    deleteNode(doc, lastItem);
  } else {
    deleteTextRange(doc, null, end);
  }

  
  for (let i = endPos-1; i > startPos; i--) {
    let itemId = list.items[i];
    list.removeItemAt(i);
    deleteNode(doc, doc.get(itemId));
  }

  
  if (firstEntirelySelected) {
    list.removeItemAt(startPos);
    deleteNode(doc, firstItem);
  } else {
    deleteTextRange(doc, start, null);
  }

  if (!firstEntirelySelected && !lastEntirelySelected) {
    mergeListItems(doc, list.id, startPos);
  }
}

function mergeListItems(doc, listId, itemPos) {
  
  let list = doc.get(listId);
  let target = list.getItemAt(itemPos);
  let targetPath = target.getTextPath();
  let targetLength = target.getLength();
  let source = list.getItemAt(itemPos+1);
  let sourcePath = source.getTextPath();
  
  list.removeItemAt(itemPos+1);
  
  doc.update(targetPath, { type: 'insert', start: targetLength, text: source.getText() });
  
  annotationHelpers.transferAnnotations(doc, sourcePath, 0, targetPath, targetLength);
  doc.delete(source.id);
}

function getNodes(doc, ids) {
  return ids.map((id) => {
    return doc.get(id, 'strict')
  })
}

const ENTER = 1;
const EXIT = -1;
const ANCHOR = -2;






























class Fragmenter {

  constructor(options) {
    Object.assign(this, options);
  }

  start(rootContext, text, annotations) {
    if (!isString$1(text)) {
      throw new Error("Illegal argument: 'text' must be a String, but was " + text)
    }
    this._start(rootContext, text, annotations);
  }

  onText(context, text, entry) { 
  }

  
  onEnter(entry, parentContext) { 
    return null
  }

  onExit(entry, context, parentContext) { 
  }

  _enter(entry, parentContext) {
    entry.counter++;
    return this.onEnter(entry, parentContext)
  }

  _exit(entry, context, parentContext) {
    this.onExit(entry, context, parentContext);
  }

  _createText(context, text, entry) {
    this.onText(context, text, entry);
  }

  _start(rootContext, text, annotations) {
    var entries = _extractEntries.call(this, annotations);
    var stack = [{context: rootContext, entry: null}];

    var pos = 0;
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var textFragment = text.substring(pos, entry.pos);
      if (textFragment) {
        
        this._createText(stack[stack.length-1].context, textFragment, entry);
      }

      pos = entry.pos;
      var stackLevel, idx, _entry;
      if (entry.mode === ENTER || entry.mode === ANCHOR) {
        
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (entry.level < stack[stackLevel].entry.level) {
            break
          }
        }
        
        
        for (idx = stack.length-1; idx >= stackLevel; idx--) {
          _entry = stack[idx].entry;
          
          _entry.length = pos - _entry.pos;
          this._exit(_entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 0, {entry: entry});
        
        for (idx = stackLevel; idx < stack.length; idx++) {
          _entry = stack[idx].entry;
          
          _entry.pos = pos;
          stack[idx].context = this._enter(_entry, stack[idx-1].context);
        }
      }
      if (entry.mode === EXIT || entry.mode === ANCHOR) {
        
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (stack[stackLevel].entry.node === entry.node) {
            break
          }
        }
        for (idx = stack.length-1; idx >= stackLevel; idx--) {
          _entry = stack[idx].entry;
          
          _entry.length = pos - _entry.pos;
          this._exit(_entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 1);
        
        for (idx = stackLevel; idx < stack.length; idx++) {
          _entry = stack[idx].entry;
          
          _entry.pos = pos;
          stack[idx].context = this._enter(_entry, stack[idx-1].context);
        }
      }
    }

    
    var trailingText = text.substring(pos);
    if (trailingText) {
      this._createText(rootContext, trailingText);
    }
  }

}

Fragmenter.SHOULD_NOT_SPLIT = 0;
Fragmenter.NORMAL = 10;
Fragmenter.ANY = 100;
Fragmenter.ALWAYS_ON_TOP = Number.MAX_VALUE;







































function _extractEntries(annotations) {
  var openers = [];
  var closers = [];
  forEach(annotations, function(a) {
    var isAnchor = (a.isAnchor ? a.isAnchor() : false);
    
    if (isAnchor) {
      openers.push({
        mode: ANCHOR,
        pos: a.offset,
        id: a.id,
        level: Fragmenter.ALWAYS_ON_TOP,
        type: 'anchor',
        node: a,
        counter: -1,
        length: 0
      });
    } else {
      
      
      
      
      
      
      

      
      var l = Fragmenter.NORMAL;
      var isInline = (a.isInline ? a.isInline() : false);
      if (isInline) {
        l = Number.MAX_VALUE;
      } else if (a.constructor.hasOwnProperty('fragmentation')) {
        l = a.constructor.fragmentation;
      } else if (a.hasOwnProperty('fragmentationHint')) {
        l = a.fragmentationHint;
      }
      var startOffset = Math.min(a.start.offset, a.end.offset);
      var endOffset = Math.max(a.start.offset, a.end.offset);
      var opener = {
        pos: startOffset,
        mode: ENTER,
        level: l,
        id: a.id,
        type: a.type,
        node: a,
        length: 0,
        counter: -1,
      };
      openers.push(opener);
      closers.push({
        pos: endOffset,
        mode: EXIT,
        level: l,
        id: a.id,
        type: a.type,
        node: a,
        opener: opener
      });
    }
  });

  
  openers.sort(_compareOpeners);
  
  for (var i = openers.length - 1; i >= 0; i--) {
    openers[i].idx = i;
  }
  closers.sort(_compareClosers);
  
  var entries = new Array(openers.length+closers.length);
  var idx = 0;
  var idx1 = 0;
  var idx2 = 0;
  var opener = openers[idx1];
  var closer = closers[idx2];
  while(opener || closer) {
    if (opener && closer) {
      
      if (closer.pos <= opener.pos && closer.opener !== opener) {
        entries[idx] = closer;
        idx2++;
      } else {
        entries[idx] = opener;
        idx1++;
      }
    } else if (opener) {
      entries[idx] = opener;
      idx1++;
    } else if (closer) {
      entries[idx] = closer;
      idx2++;
    }
    opener = openers[idx1];
    closer = closers[idx2];
    idx++;
  }
  return entries
}

function _compareOpeners(a, b) {
  if (a.pos < b.pos) return -1
  if (a.pos > b.pos) return 1
  if (a.mode < b.mode) return -1
  if (a.mode > b.mode) return 1
  if (a.mode === b.mode) {
    if (a.level < b.level) return -1
    if (a.level > b.level) return 1
  }
  return 0
}


function _compareClosers(a, b) {
  if (a.pos < b.pos) return -1
  if (a.pos > b.pos) return 1
  
  
  
  
  
  if (a.pos === a.opener.pos && b.pos === b.opener.pos) {
    if (a.opener.idx < b.opener.idx) {
      return -1
    } else {
      return 1
    }
  }
  if (a.opener.idx > b.opener.idx) return -1
  if (a.opener.idx < b.opener.idx) return 1
  return 0
}

class DOMEventListener {

  constructor(eventName, handler, options) {
    
    if (!isString$1(eventName) || !isFunction$1(handler)) {
      throw new Error("Illegal arguments: 'eventName' must be a String, and 'handler' must be a Function.")
    }
    options = options || {};
    var origHandler = handler;
    var context = options.context;
    var capture = Boolean(options.capture);

    if (context) {
      handler = handler.bind(context);
    }
    if (options.once === true) {
      handler = _once(this, handler);
    }

    this.eventName = eventName;
    this.originalHandler = origHandler;
    this.handler = handler;
    this.capture = capture;
    this.context = context;
    this.options = options;
    
    this._el = null;
  }

}

DOMEventListener.prototype._isDOMEventListener = true;

DOMEventListener.findIndex = function(eventListeners, eventName, handler) {
  var idx = -1;
  if (arguments[1]._isDOMEventListener) {
    idx = eventListeners.indexOf(arguments[1]);
  } else {
    idx = findIndex$1(eventListeners,
      _matches.bind(null, {
        eventName: eventName,
        originalHandler: handler
      })
    );
  }
  return idx
};

function _matches(l1, l2) {
  return l1.eventName === l2.eventName && l1.originalHandler === l2.originalHandler
}

function _once(listener, handler) {
  return function(event) {
    handler(event);
    listener._el.removeEventListener(listener);
  }
}

const NOT_IMPLEMENTED = 'This method is not implemented.';


class DOMElement {

  

  

  

  

  

  

  

  

  

  
  getNativeElement() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  isTextNode() {
    
    return false
  }

  
  isElementNode() {
    
    return false
  }

  
  isCommentNode() {
    
    return false
  }

  
  isDocumentNode() {
    
    return false
  }

  
  getTagName() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  setTagName(tagName) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  getId() {
    return this.getAttribute('id')
  }

  
  setId(id) {
    this.setAttribute('id', id);
  }

  
  hasClass(className) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  addClass(classString) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  removeClass(classString) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  hasAttribute(name) {
    return Boolean(this.getAttribute(name))
  }

  
  attr() {
    if (arguments.length === 1) {
      if (isString$1(arguments[0])) {
        return this.getAttribute(arguments[0])
      } else if (isObject$1(arguments[0])) {
        forEach(arguments[0], function(value, name) {
          this.setAttribute(name, value);
        }.bind(this));
      }
    } else if (arguments.length === 2) {
      this.setAttribute(arguments[0], arguments[1]);
    }
    return this
  }

  
  removeAttr(name) {
    var names = name.split(/\s+/);
    if (names.length === 1) {
      this.removeAttribute(name);
    } else {
      names.forEach(function(name) {
        this.removeAttribute(name);
      }.bind(this));
    }
    return this
  }

  
  getAttribute(name) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  setAttribute(name, value) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  removeAttribute(name) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getAttributes() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  htmlProp() {
    if (arguments.length === 1) {
      if (isString$1(arguments[0])) {
        return this.getProperty(arguments[0])
      } else if (isObject$1(arguments[0])) {
        forEach(arguments[0], function(value, name) {
          this.setProperty(name, value);
        }.bind(this));
      }
    } else if (arguments.length === 2) {
      this.setProperty(arguments[0], arguments[1]);
    }
    return this
  }

  getProperty(name) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  setProperty(name, value) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  val(value) {
    if (arguments.length === 0) {
      return this.getValue()
    } else {
      this.setValue(value);
      return this
    }
  }

  getValue() {
    return this.getProperty('value')
  }

  setValue(value) {
    this.setProperty('value', value);
    return this
  }

  
  css() {
    
    if (arguments.length === 1) {
      
      if (isString$1(arguments[0])) {
        return this.getStyle(arguments[0])
      } else if (isObject$1(arguments[0])) {
        forEach(arguments[0], function(value, name) {
          this.setStyle(name, value);
        }.bind(this));
      } else {
        throw new Error('Illegal arguments.')
      }
    } else if (arguments.length === 2) {
      this.setStyle(arguments[0], arguments[1]);
    } else {
      throw new Error('Illegal arguments.')
    }
    return this
  }

  getStyle(name) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  setStyle(name, value) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  text(text) {
    if (arguments.length === 0) {
      return this.getTextContent()
    } else {
      this.setTextContent(text);
    }
    return this
  }

  
  getTextContent() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  setTextContent(text) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  html(html) {
    if (arguments.length === 0) {
      return this.getInnerHTML()
    } else {
      this.setInnerHTML(html);
    }
    return this
  }

  
  getInnerHTML() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  setInnerHTML(html) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  getOuterHTML() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  on(eventName, handler, context, options) {
    
    if (!isString$1(eventName)) {
      throw new Error('Illegal argument: "event" must be a String.')
    }
    options = options || {};
    if (context) {
      options.context = context;
    }
    
    if (!handler || !isFunction$1(handler)) {
      throw new Error('Illegal argument: invalid handler function for event ' + eventName)
    }
    this.addEventListener(eventName, handler, options);
    return this
  }

  
  off(eventName, handler) {
    
    if (arguments.length === 1 && !isString$1(eventName)) {
      let context = arguments[0];
      this.getEventListeners().filter(function(l) {
        return l.context === context
      }).forEach(function(l) {
        this.removeEventListener(l);
      }.bind(this));
    } else {
      this.removeEventListener(eventName, handler);
    }
    return this
  }

  addEventListener(eventName, handler, options = {}) {
    let listener;
    if (arguments.length === 1 && arguments[0]) {
      listener = arguments[0];
    } else {
      listener = this._createEventListener(eventName, handler, options);
    }
    if (!this.eventListeners) {
      this.eventListeners = [];
    }
    listener._el = this;
    this.eventListeners.push(listener);
    this._addEventListenerNative(listener);
    return this
  }

  _createEventListener(eventName, handler, options) {
    return new DOMEventListener(eventName, handler, options)
  }

  _addEventListenerNative(listener) {} 

  removeEventListener(eventName, handler) {
    if (!this.eventListeners) return
    
    let listener = null, idx = -1;
    idx = DOMEventListener.findIndex(this.eventListeners, eventName, handler);
    listener = this.eventListeners[idx];
    if (idx > -1) {
      this.eventListeners.splice(idx, 1);
      
      listener._el = null;
      this._removeEventListenerNative(listener);
    }
    return this
  }

  _removeEventListenerNative(listener) {} 

  removeAllEventListeners() {
    if (!this.eventListeners) return
    for (let i = 0; i < this.eventListeners.length; i++) {
      let listener = this.eventListeners[i];
      
      listener._el = null;
      this._removeEventListenerNative(listener);
    }
    delete this.eventListeners;
  }

  getEventListeners() {
    return this.eventListeners || []
  }

  
  getNodeType() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getContentType() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getChildCount() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  getChildNodes() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  getChildren() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getChildAt(pos) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getChildIndex(child) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getChildNodeIterator() {
    return new ArrayIterator(this.getChildNodes())
  }

  getLastChild() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getFirstChild() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getNextSibling() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  getPreviousSibling() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  clone() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  createElement(str) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  createTextNode(text) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  createComment(data) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  createProcessingInstruction(name, data) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  createCDATASection(data) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  is(cssSelector) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  getParent() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  getOwnerDocument() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  getDoctype() {
    
    throw new Error('NOT_IMPLEMENTED')
  }

  
  find(cssSelector) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  findAll(cssSelector) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  append(child) {
    var children;
    if (arguments.length === 1) {
      if (isArray$1(child)) {
        children = child;
      } else {
        this.appendChild(child);
        return this
      }
    } else {
      children = arguments;
    }
    if (children) {
      Array.prototype.forEach.call(children, this.appendChild.bind(this));
    }
    return this
  }

  appendChild(child) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  insertAt(pos, child) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  insertBefore(newChild, before) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  removeAt(pos) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  removeChild(child) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  replaceChild(oldChild, newChild) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  
  remove() {
    var parent = this.getParent();
    if (parent) {
      parent.removeChild(this);
    }
  }

  
  empty() {
    
    throw new Error(NOT_IMPLEMENTED)
  }

  serialize() {
    return this.getOuterHTML()
  }

  isInDocument() {
    let el = this;
    while(el) {
      if (el.isDocumentNode()) {
        return true
      }
      el = el.getParent();
    }
  }

  
  focus() {
    
    return this
  }

  
  select() {
    
    return this
  }

  
  blur() {
    
    return this
  }

  
  click() {
    
    return this
  }

  

  getWidth() {
    
    return 0
  }

  getHeight() {
    
    return 0
  }

  
  getOuterHeight(withMargin) { 
    
    return 0
  }

  
  getOffset() {
    
    return { top: 0, left: 0 }
  }

  
  getPosition() {
    
    return { top: 0, left: 0 }
  }

  
  getElementFactory() {
    return this.createElement.bind(this)
  }

  
  emit(name, data) { 
    
    throw new Error(NOT_IMPLEMENTED)
  }

  

  get id() {
    return this.getId()
  }

  set id(id) {
    this.setId(id);
  }

  get tagName() {
    return this.getTagName()
  }

  set tagName(tagName) {
    this.setTagName(tagName);
  }

  get nodeName() {
    return this.getTagName()
  }

  get nodeType() {
    return this.getNodeType()
  }

  get className() {
    return this.getAttribute('class')
  }

  set className(className) {
    this.setAttribute('class', className);
  }

  get textContent() {
    return this.getTextContent()
  }

  set textContent(text) {
    this.setTextContent(text);
  }

  get innerHTML() {
    return this.getInnerHTML()
  }

  set innerHTML(html) {
    this.setInnerHTML(html);
  }

  get outerHTML() {
    return this.getOuterHTML()
  }

  get firstChild() {
    return this.getFirstChild()
  }

  get lastChild() {
    return this.getLastChild()
  }

  get nextSibling() {
    return this.getNextSibling()
  }

  get previousSibling() {
    return this.getPreviousSibling()
  }

  get parentNode() {
    return this.getParent()
  }

  get height() {
    return this.getHeight()
  }

  get width() {
    return this.getWidth()
  }

  get value() {
    return this.getValue()
  }

  set value(value) {
    return this.setValue(value)
  }
}

DOMElement.prototype._isDOMElement = true;

DOMElement.pxStyles = {
  top: true,
  bottom: true,
  left: true,
  right: true,
  height: true,
  width: true
};

DOMElement.EMPTY_HTML = '<html><head></head><body></body></html>';

const SIGNATURE = uuid('_BrowserDOMElement');

function _attach(nativeEl, browserDOMElement) {
  nativeEl[SIGNATURE] = browserDOMElement;
}

function _detach(nativeEl) {
  delete nativeEl[SIGNATURE];
}

function _unwrap(nativeEl) {
  return nativeEl[SIGNATURE]
}

class BrowserDOMElement extends DOMElement {

  constructor(el) {
    super();
    console.assert(el instanceof window.Node, "Expecting native DOM node.");
    this.el = el;
    
    
    _attach(el, this);
  }

  getNativeElement() {
    return this.el
  }

  getNodeType() {
    switch(this.el.nodeType) {
      case window.Node.TEXT_NODE:
        return "text"
      case window.Node.ELEMENT_NODE:
        return 'element'
      case window.Node.DOCUMENT_NODE:
        return 'document'
      case window.Node.COMMENT_NODE:
        return 'comment'
      case window.Node.PROCESSING_INSTRUCTION_NODE:
        return 'directive'
      case window.Node.CDATA_SECTION_NODE:
        return 'cdata'
      default:
        
    }
  }

  getDoctype() {
    if (this.isDocumentNode()) {
      return this.el.doctype
    } else {
      return this.getOwnerDocument().getDoctype()
    }
  }

  isTextNode() {
    return (this.el.nodeType === window.Node.TEXT_NODE)
  }

  isElementNode() {
    return (this.el.nodeType === window.Node.ELEMENT_NODE)
  }

  isCommentNode() {
    return (this.el.nodeType === window.Node.COMMENT_NODE)
  }

  isDocumentNode() {
    return (this.el.nodeType === window.Node.DOCUMENT_NODE)
  }

  hasClass(className) {
    return this.el.classList.contains(className)
  }

  addClass(className) {
    this.el.classList.add(className);
    return this
  }

  removeClass(className) {
    this.el.classList.remove(className);
    return this
  }

  getAttribute(name) {
    return this.el.getAttribute(name)
  }

  setAttribute(name, value) {
    this.el.setAttribute(name, String(value));
    return this
  }

  removeAttribute(name) {
    this.el.removeAttribute(name);
    return this
  }

  getAttributes() {
    if (!this.el.attributes._mapAdapter) {
      this.el.attributes._mapAdapter = new AttributesMapAdapter(this.el.attributes);
    }
    return this.el.attributes._mapAdapter
  }

  getProperty(name) {
    return this.el[name]
  }

  setProperty(name, value) {
    
    
    if (this._isXML()) throw new Error('setProperty() is only supported for HTML elements.')
    if (!this._changedProperties) this._changedProperties = new Set();
    
    
    if (value === undefined) {
      this._changedProperties.delete(name);
    } else {
      this._changedProperties.add(name);
    }
    this.el[name] = value;
    return this
  }

  getTagName() {
    
    
    if (this._isXML()) {
      return this.el.tagName
    } else if (this.el.tagName) {
      return this.el.tagName.toLowerCase()
    }
  }

  setTagName(tagName) {
    let newEl = this.createElement(tagName);
    let attributes = this.el.attributes;
    let l = attributes.length;
    let i;
    for(i = 0; i < l; i++) {
      let attr = attributes.item(i);
      newEl.setAttribute(attr.name, attr.value);
    }
    
    
    
    
    
    
    if (this.eventListeners) {
      this.eventListeners.forEach(function(listener) {
        newEl.addEventListener(listener.eventName, listener.handler, listener.capture);
      });
    }
    newEl.append(this.getChildNodes());

    this._replaceNativeEl(newEl.getNativeElement());
    return this
  }

  getId() {
    return this.el.id
  }

  setId(id) {
    this.el.id = id;
    return this
  }

  getStyle(name) {
    
    let style = this.getComputedStyle();
    return style[name] || this.el.style[name]
  }

  getComputedStyle() {
    return window.getComputedStyle(this.el)
  }

  setStyle(name, value) {
    if (DOMElement.pxStyles[name] && isNumber(value)) value = value + 'px';
    this.el.style[name] = value;
    return this
  }

  getTextContent() {
    return this.el.textContent
  }

  setTextContent(text) {
    this.el.textContent = text;
    return this
  }

  getInnerHTML() {
    if (this._isXML()) {
      let xs = new window.XMLSerializer();
      let result = Array.prototype.map.call(this.el.childNodes, c => xs.serializeToString(c));
      return result.join('')
    } else {
      return this.el.innerHTML
    }
  }

  setInnerHTML(html) {
    
    
    this.el.innerHTML = html;
    return this
  }

  getOuterHTML() {
    
    
    if (this._isXML()) {
      let xs = new window.XMLSerializer();
      return xs.serializeToString(this.el)
    } else {
      return this.el.outerHTML
    }
  }

  _addEventListenerNative(listener) {
    this.el.addEventListener(listener.eventName, listener.handler, listener.capture);
  }

  _removeEventListenerNative(listener) {
    this.el.removeEventListener(listener.eventName, listener.handler);
  }

  getEventListeners() {
    return this.eventListeners || []
  }

  getChildCount() {
    return this.el.childNodes.length
  }

  getChildNodes() {
    let childNodes = [];
    for (let node = this.el.firstChild; node; node = node.nextSibling) {
      childNodes.push(BrowserDOMElement.wrap(node));
    }
    return childNodes
  }

  get childNodes() {
    return this.getChildNodes()
  }

  getChildren() {
    
    
    let children = [];
    for (let node = this.el.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        children.push(BrowserDOMElement.wrap(node));
      }
    }
    return children
  }

  get children() {
    return this.getChildren()
  }

  getChildAt(pos) {
    return BrowserDOMElement.wrap(this.el.childNodes[pos])
  }

  getChildIndex(child) {
    
    if (!child._isBrowserDOMElement) {
      throw new Error('Expecting a BrowserDOMElement instance.')
    }
    return Array.prototype.indexOf.call(this.el.childNodes, child.el)
  }

  getFirstChild() {
    let firstChild = this.el.firstChild;
    
    if (firstChild) {
      return BrowserDOMElement.wrap(firstChild)
    } else {
      return null
    }
  }

  getLastChild() {
    var lastChild = this.el.lastChild;
    
    if (lastChild) {
      return BrowserDOMElement.wrap(lastChild)
    } else {
      return null
    }
  }

  getNextSibling() {
    let next = this.el.nextSibling;
    
    if (next) {
      return BrowserDOMElement.wrap(next)
    } else {
      return null
    }
  }

  getPreviousSibling() {
    let previous = this.el.previousSibling;
    
    if (previous) {
      return BrowserDOMElement.wrap(previous)
    } else {
      return null
    }
  }

  clone() {
    let clone$$1 = this.el.cloneNode(true);
    return BrowserDOMElement.wrap(clone$$1)
  }

  createDocument(format) {
    return BrowserDOMElement.createDocument(format)
  }

  createElement(tagName) {
    let doc = this._getNativeOwnerDocument();
    let el = doc.createElement(tagName);
    return BrowserDOMElement.wrap(el)
  }

  createTextNode(text) {
    let doc = this._getNativeOwnerDocument();
    let el = doc.createTextNode(text);
    return BrowserDOMElement.wrap(el)
  }

  createComment(data) {
    let doc = this._getNativeOwnerDocument();
    let el = doc.createComment(data);
    return BrowserDOMElement.wrap(el)
  }

  createProcessingInstruction(name, data) {
    let doc = this._getNativeOwnerDocument();
    let el = doc.createProcessingInstruction(name, data);
    return BrowserDOMElement.wrap(el)
  }

  createCDATASection(data) {
    let doc = this._getNativeOwnerDocument();
    let el = doc.createCDATASection(data);
    return BrowserDOMElement.wrap(el)
  }

  is(cssSelector) {
    
    
    let el = this.el;
    
    if (this.isElementNode()) {
      return matches(el, cssSelector)
    } else {
      return false
    }
  }

  getParent() {
    let parent = this.el.parentNode;
    
    if (parent) {
      return BrowserDOMElement.wrap(parent)
    } else {
      return null
    }
  }

  getOwnerDocument() {
    return BrowserDOMElement.wrap(this._getNativeOwnerDocument())
  }

  get ownerDocument() {
    return this.getOwnerDocument()
  }

  _getNativeOwnerDocument() {
    return (this.isDocumentNode() ? this.el : this.el.ownerDocument)
  }

  find(cssSelector) {
    let result = null;
    if (this.el.querySelector) {
      result = this.el.querySelector(cssSelector);
    }
    if (result) {
      return BrowserDOMElement.wrap(result)
    } else {
      return null
    }
  }

  findAll(cssSelector) {
    let result = [];
    if (this.el.querySelectorAll) {
      result = this.el.querySelectorAll(cssSelector);
    }
    return Array.prototype.map.call(result, function(el) {
      return BrowserDOMElement.wrap(el)
    })
  }

  _normalizeChild(child) {
    if (isNil(child)) return child

    if (child instanceof window.Node) {
      child = BrowserDOMElement.wrap(child);
    }
    
    
    
    else if (child._isBrowserDOMElement && ! (child instanceof BrowserDOMElement)) {
      child = BrowserDOMElement.wrap(child);
    } else if (isString$1(child) || isNumber(child)) {
      child = this.createTextNode(child);
    }
    
    if (!child || !child._isBrowserDOMElement) {
      throw new Error('Illegal child type.')
    }
    console.assert(_unwrap(child.el) === child, "The backlink to the wrapper should be consistent");
    return child.getNativeElement()
  }

  appendChild(child) {
    let nativeChild = this._normalizeChild(child);
    if (nativeChild) {
      this.el.appendChild(nativeChild);
    }
    return this
  }

  insertAt(pos, child) {
    let nativeChild = this._normalizeChild(child);
    let childNodes = this.el.childNodes;
    if (pos >= childNodes.length) {
      this.el.appendChild(nativeChild);
    } else {
      this.el.insertBefore(nativeChild, childNodes[pos]);
    }
    return this
  }

  insertBefore(child, before) {
    
    if (isNil(before)) {
      return this.appendChild(child)
    }
    if (!before._isBrowserDOMElement) {
      throw new Error('insertBefore(): Illegal arguments. "before" must be a BrowserDOMElement instance.')
    }
    var nativeChild = this._normalizeChild(child);
    if (nativeChild) {
      this.el.insertBefore(nativeChild, before.el);
    }
    return this
  }

  removeAt(pos) {
    this.el.removeChild(this.el.childNodes[pos]);
    return this;
  }

  removeChild(child) {
    
    if (!child || !child._isBrowserDOMElement) {
      throw new Error('removeChild(): Illegal arguments. Expecting a BrowserDOMElement instance.')
    }
    this.el.removeChild(child.el);
    return this
  }

  replaceChild(oldChild, newChild) {
    
    if (!newChild || !oldChild ||
        !newChild._isBrowserDOMElement || !oldChild._isBrowserDOMElement) {
      throw new Error('replaceChild(): Illegal arguments. Expecting BrowserDOMElement instances.')
    }
    
    this.el.replaceChild(newChild.el, oldChild.el);
    return this
  }

  empty() {
    let el = this.el;
    while (el.lastChild) {
      el.removeChild(el.lastChild);
    }
    return this
  }

  remove() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this
  }

  serialize() {
    let outerHTML = this.el.outerHTML;
    if (isString$1(outerHTML)) {
      return outerHTML
    } else {
      let xs = new window.XMLSerializer();
      return xs.serializeToString(this.el)
    }
  }

  isInDocument() {
    let el = this.el;
    while(el) {
      if (el.nodeType === window.Node.DOCUMENT_NODE) {
        return true
      }
      el = el.parentNode;
    }
  }

  _replaceNativeEl(newEl) {
    console.assert(newEl instanceof window.Node, "Expecting a native element.");
    let oldEl = this.el;
    let parentNode = oldEl.parentNode;
    if (parentNode) {
      parentNode.replaceChild(newEl, oldEl);
    }
    this.el = newEl;
    _detach(oldEl);
    _attach(newEl, this);
  }

  _getChildNodeCount() {
    return this.el.childNodes.length
  }

  focus() {
    this.el.focus();
    return this
  }

  select() {
    this.el.select();
    return this
  }


  blur() {
    this.el.focus();
    return this
  }

  click() {
    this.el.click();
    return this
  }

  getWidth() {
    let rect = this.el.getClientRects()[0];
    if (rect) {
      return rect.width
    } else {
      return 0
    }
  }

  getHeight() {
    let rect = this.el.getClientRects()[0];
    if (rect) {
      return rect.height
    } else {
      return 0
    }
  }

  getOffset() {
    let rect = this.el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  }

  getPosition() {
    return {left: this.el.offsetLeft, top: this.el.offsetTop}
  }

  getOuterHeight(withMargin) {
    let outerHeight = this.el.offsetHeight;
    if (withMargin) {
      let style = this.getComputedStyle();
      outerHeight += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    }
    return outerHeight
  }

  getContentType() {
    return this._getNativeOwnerDocument().contentType
  }

  _isXML() {
    return this.getContentType() === 'application/xml'
  }

  emit(name, data) {
    let event;
    if (data) {
      event = new window.CustomEvent(name, { detail: data });
    } else {
      event = new window.Event(name);
    }
    this.el.dispatchEvent(event);
  }
}

BrowserDOMElement.prototype._isBrowserDOMElement = true;


BrowserDOMElement.createDocument = function(format) {
  let doc;
  if (format === 'xml') {
    
    doc = window.document.implementation.createDocument(null, 'dummy');
    
    doc.removeChild(doc.firstChild);
  } else {
    doc = (new window.DOMParser()).parseFromString(DOMElement.EMPTY_HTML, 'text/html');
  }
  return BrowserDOMElement.wrap(doc)
};

BrowserDOMElement.parseMarkup = function(str, format, options={}) {
  if (!str) {
    return BrowserDOMElement.createDocument(format)
  }
  if (options.snippet) {
    str = `<div id='__snippet__'>${str}</div>`;
  }
  let doc;
  let parser = new window.DOMParser();
  if (format === 'html') {
    doc = BrowserDOMElement.wrap(
      _check(
        parser.parseFromString(str, 'text/html')
      )
    );
  } else if (format === 'xml') {
    doc = BrowserDOMElement.wrap(
      _check(
        parser.parseFromString(str, 'application/xml')
      )
    );
  }
  if (options.snippet) {
    let childNodes = doc.find('#__snippet__').childNodes;
    if (childNodes.length === 1) {
      return childNodes[0]
    } else {
      return childNodes
    }
  } else {
    return doc
  }

  function _check(doc) {
    if (doc) {
      let parserError = doc.querySelector('parsererror');
      if (parserError) {
        throw new Error("ParserError: " + parserError)
      }
    }
    return doc
  }
};

BrowserDOMElement.wrap =
BrowserDOMElement.wrapNativeElement = function(el) {
  if (el) {
    let _el = _unwrap(el);
    if (_el) {
      return _el
    } else if (el instanceof window.Node) {
      return new BrowserDOMElement(el)
    } else if (el._isBrowserDOMElement) {
      return new BrowserDOMElement(el.getNativeElement())
    } else if (el === window) {
      return BrowserDOMElement.getBrowserWindow()
    }
  } else {
    return null
  }
};

BrowserDOMElement.unwrap = function(nativeEl) {
  return _unwrap(nativeEl)
};


class BrowserWindow {

  constructor() {
    
    this.el = window;
    window.__BrowserDOMElementWrapper__ = this;
  }

}

BrowserWindow.prototype.on = BrowserDOMElement.prototype.on;
BrowserWindow.prototype.off = BrowserDOMElement.prototype.off;
BrowserWindow.prototype.addEventListener = BrowserDOMElement.prototype.addEventListener;
BrowserWindow.prototype.removeEventListener = BrowserDOMElement.prototype.removeEventListener;
BrowserWindow.prototype._createEventListener = BrowserDOMElement.prototype._createEventListener;
BrowserWindow.prototype._addEventListenerNative = BrowserDOMElement.prototype._addEventListenerNative;
BrowserWindow.prototype._removeEventListenerNative = BrowserDOMElement.prototype._removeEventListenerNative;

BrowserWindow.prototype.getEventListeners = BrowserDOMElement.prototype.getEventListeners;

BrowserDOMElement.getBrowserWindow = function() {
  if (window[SIGNATURE]) return window[SIGNATURE]
  return new BrowserWindow(window)
};

BrowserDOMElement.isReverse = function(anchorNode, anchorOffset, focusNode, focusOffset) {
  
  
  if (focusNode && anchorNode) {
    if (!BrowserDOMElement.isReverse._r1) {
      BrowserDOMElement.isReverse._r1 = window.document.createRange();
      BrowserDOMElement.isReverse._r2 = window.document.createRange();
    }
    const _r1 = BrowserDOMElement.isReverse._r1;
    const _r2 = BrowserDOMElement.isReverse._r2;
    _r1.setStart(anchorNode.getNativeElement(), anchorOffset);
    _r2.setStart(focusNode.getNativeElement(), focusOffset);
    let cmp = _r1.compareBoundaryPoints(window.Range.START_TO_START, _r2);
    if (cmp === 1) {
      return true
    }
  }
  return false
};

BrowserDOMElement.getWindowSelection = function() {
  let nativeSel = window.getSelection();
  let result = {
    anchorNode: BrowserDOMElement.wrap(nativeSel.anchorNode),
    anchorOffset: nativeSel.anchorOffset,
    focusNode: BrowserDOMElement.wrap(nativeSel.focusNode),
    focusOffset: nativeSel.focusOffset
  };
  return result
};


function matches(el, selector) {
  let elProto = window.Element.prototype;
  let _matches = (
    elProto.matches || elProto.matchesSelector ||
    elProto.msMatchesSelector || elProto.webkitMatchesSelector
  );
  return _matches.call(el, selector)
}

class AttributesMapAdapter {

  constructor(attributes) {
    this.attributes = attributes;
  }

  get size() {
    return this.attributes.length
  }

  get(name) {
    let item = this.attributes.getNamedItem(name);
    if (item) {
      return item.value
    }
  }

  set(name, value) {
    this.attributes.setNamedItem(name, value);
  }

  forEach(fn) {
    const S = this.size;
    for (let i = 0; i < S; i++) {
      const item = this.attributes.item(i);
      fn(item.value, item.name);
    }
  }

  map(fn) {
    let result = [];
    this.forEach((val, key)=>{ result.push(fn(val, key)); });
    return result
  }

  keys() {
    return this.map((val, key)=>{ return key })
  }

  values() {
    return this.map((val)=>{ return val })
  }

  entries() {
    return this.map((val, key)=>{ return [key, val] })
  }

}

var index = {
	Text: "text", 
	Directive: "directive", 
	Comment: "comment", 
	Script: "script", 
	Style: "style", 
	Tag: "tag", 
	CDATA: "cdata", 
	Doctype: "doctype",

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};

var amp = "&";
var apos = "'";
var gt = ">";
var lt = "<";
var quot = "\"";
var xmlJSON = {
	amp: amp,
	apos: apos,
	gt: gt,
	lt: lt,
	quot: quot
};

var xml = Object.freeze({
	amp: amp,
	apos: apos,
	gt: gt,
	lt: lt,
	quot: quot,
	default: xmlJSON
});

var Aacute = "Á";
var aacute = "á";
var Abreve = "Ă";
var abreve = "ă";
var ac = "∾";
var acd = "∿";
var acE = "∾̳";
var Acirc = "Â";
var acirc = "â";
var acute = "´";
var Acy = "А";
var acy = "а";
var AElig = "Æ";
var aelig = "æ";
var af = "⁡";
var Afr = "𝔄";
var afr = "𝔞";
var Agrave = "À";
var agrave = "à";
var alefsym = "ℵ";
var aleph = "ℵ";
var Alpha = "Α";
var alpha = "α";
var Amacr = "Ā";
var amacr = "ā";
var amalg = "⨿";
var amp$1 = "&";
var AMP = "&";
var andand = "⩕";
var And = "⩓";
var and = "∧";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang = "∠";
var ange = "⦤";
var angle = "∠";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angmsd = "∡";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var Aogon = "Ą";
var aogon = "ą";
var Aopf = "𝔸";
var aopf = "𝕒";
var apacir = "⩯";
var ap = "≈";
var apE = "⩰";
var ape = "≊";
var apid = "≋";
var apos$1 = "'";
var ApplyFunction = "⁡";
var approx = "≈";
var approxeq = "≊";
var Aring = "Å";
var aring = "å";
var Ascr = "𝒜";
var ascr = "𝒶";
var Assign = "≔";
var ast = "*";
var asymp = "≈";
var asympeq = "≍";
var Atilde = "Ã";
var atilde = "ã";
var Auml = "Ä";
var auml = "ä";
var awconint = "∳";
var awint = "⨑";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var Backslash = "∖";
var Barv = "⫧";
var barvee = "⊽";
var barwed = "⌅";
var Barwed = "⌆";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var Bcy = "Б";
var bcy = "б";
var bdquo = "„";
var becaus = "∵";
var because = "∵";
var Because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var Bernoullis = "ℬ";
var Beta = "Β";
var beta = "β";
var beth = "ℶ";
var between = "≬";
var Bfr = "𝔅";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bNot = "⫭";
var bnot = "⌐";
var Bopf = "𝔹";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxbox = "⧉";
var boxdl = "┐";
var boxdL = "╕";
var boxDl = "╖";
var boxDL = "╗";
var boxdr = "┌";
var boxdR = "╒";
var boxDr = "╓";
var boxDR = "╔";
var boxh = "─";
var boxH = "═";
var boxhd = "┬";
var boxHd = "╤";
var boxhD = "╥";
var boxHD = "╦";
var boxhu = "┴";
var boxHu = "╧";
var boxhU = "╨";
var boxHU = "╩";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxul = "┘";
var boxuL = "╛";
var boxUl = "╜";
var boxUL = "╝";
var boxur = "└";
var boxuR = "╘";
var boxUr = "╙";
var boxUR = "╚";
var boxv = "│";
var boxV = "║";
var boxvh = "┼";
var boxvH = "╪";
var boxVh = "╫";
var boxVH = "╬";
var boxvl = "┤";
var boxvL = "╡";
var boxVl = "╢";
var boxVL = "╣";
var boxvr = "├";
var boxvR = "╞";
var boxVr = "╟";
var boxVR = "╠";
var bprime = "‵";
var breve = "˘";
var Breve = "˘";
var brvbar = "¦";
var bscr = "𝒷";
var Bscr = "ℬ";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsolb = "⧅";
var bsol = "\\";
var bsolhsub = "⟈";
var bull = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var Bumpeq = "≎";
var bumpeq = "≏";
var Cacute = "Ć";
var cacute = "ć";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var cap = "∩";
var Cap = "⋒";
var capcup = "⩇";
var capdot = "⩀";
var CapitalDifferentialD = "ⅅ";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var Cayleys = "ℭ";
var ccaps = "⩍";
var Ccaron = "Č";
var ccaron = "č";
var Ccedil = "Ç";
var ccedil = "ç";
var Ccirc = "Ĉ";
var ccirc = "ĉ";
var Cconint = "∰";
var ccups = "⩌";
var ccupssm = "⩐";
var Cdot = "Ċ";
var cdot = "ċ";
var cedil = "¸";
var Cedilla = "¸";
var cemptyv = "⦲";
var cent = "¢";
var centerdot = "·";
var CenterDot = "·";
var cfr = "𝔠";
var Cfr = "ℭ";
var CHcy = "Ч";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var Chi = "Χ";
var chi = "χ";
var circ = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var CircleDot = "⊙";
var circledR = "®";
var circledS = "Ⓢ";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var cir = "○";
var cirE = "⧃";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var clubs = "♣";
var clubsuit = "♣";
var colon = ":";
var Colon = "∷";
var Colone = "⩴";
var colone = "≔";
var coloneq = "≔";
var comma = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong = "≅";
var congdot = "⩭";
var Congruent = "≡";
var conint = "∮";
var Conint = "∯";
var ContourIntegral = "∮";
var copf = "𝕔";
var Copf = "ℂ";
var coprod = "∐";
var Coproduct = "∐";
var copy = "©";
var COPY = "©";
var copysr = "℗";
var CounterClockwiseContourIntegral = "∳";
var crarr = "↵";
var cross = "✗";
var Cross = "⨯";
var Cscr = "𝒞";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cupbrcap = "⩈";
var cupcap = "⩆";
var CupCap = "≍";
var cup = "∪";
var Cup = "⋓";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curren = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dagger = "†";
var Dagger = "‡";
var daleth = "ℸ";
var darr = "↓";
var Darr = "↡";
var dArr = "⇓";
var dash = "‐";
var Dashv = "⫤";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var Dcaron = "Ď";
var dcaron = "ď";
var Dcy = "Д";
var dcy = "д";
var ddagger = "‡";
var ddarr = "⇊";
var DD = "ⅅ";
var dd = "ⅆ";
var DDotrahd = "⤑";
var ddotseq = "⩷";
var deg = "°";
var Del = "∇";
var Delta = "Δ";
var delta = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var Dfr = "𝔇";
var dfr = "𝔡";
var dHar = "⥥";
var dharl = "⇃";
var dharr = "⇂";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var diam = "⋄";
var diamond = "⋄";
var Diamond = "⋄";
var diamondsuit = "♦";
var diams = "♦";
var die = "¨";
var DifferentialD = "ⅆ";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divide = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var DJcy = "Ђ";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar = "$";
var Dopf = "𝔻";
var dopf = "𝕕";
var Dot = "¨";
var dot = "˙";
var DotDot = "⃜";
var doteq = "≐";
var doteqdot = "≑";
var DotEqual = "≐";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrowBar = "⤓";
var downarrow = "↓";
var DownArrow = "↓";
var Downarrow = "⇓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVectorBar = "⥖";
var DownLeftVector = "↽";
var DownRightTeeVector = "⥟";
var DownRightVectorBar = "⥗";
var DownRightVector = "⇁";
var DownTeeArrow = "↧";
var DownTee = "⊤";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var Dscr = "𝒟";
var dscr = "𝒹";
var DScy = "Ѕ";
var dscy = "ѕ";
var dsol = "⧶";
var Dstrok = "Đ";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var DZcy = "Џ";
var dzcy = "џ";
var dzigrarr = "⟿";
var Eacute = "É";
var eacute = "é";
var easter = "⩮";
var Ecaron = "Ě";
var ecaron = "ě";
var Ecirc = "Ê";
var ecirc = "ê";
var ecir = "≖";
var ecolon = "≕";
var Ecy = "Э";
var ecy = "э";
var eDDot = "⩷";
var Edot = "Ė";
var edot = "ė";
var eDot = "≑";
var ee = "ⅇ";
var efDot = "≒";
var Efr = "𝔈";
var efr = "𝔢";
var eg = "⪚";
var Egrave = "È";
var egrave = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var Element = "∈";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var Emacr = "Ē";
var emacr = "ē";
var empty = "∅";
var emptyset = "∅";
var EmptySmallSquare = "◻";
var emptyv = "∅";
var EmptyVerySmallSquare = "▫";
var emsp13 = " ";
var emsp14 = " ";
var emsp = " ";
var ENG = "Ŋ";
var eng = "ŋ";
var ensp = " ";
var Eogon = "Ę";
var eogon = "ę";
var Eopf = "𝔼";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var Epsilon = "Ε";
var epsilon = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var Equal = "⩵";
var equals = "=";
var EqualTilde = "≂";
var equest = "≟";
var Equilibrium = "⇌";
var equiv = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erarr = "⥱";
var erDot = "≓";
var escr = "ℯ";
var Escr = "ℰ";
var esdot = "≐";
var Esim = "⩳";
var esim = "≂";
var Eta = "Η";
var eta = "η";
var ETH = "Ð";
var eth = "ð";
var Euml = "Ë";
var euml = "ë";
var euro = "€";
var excl = "!";
var exist = "∃";
var Exists = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var ExponentialE = "ⅇ";
var fallingdotseq = "≒";
var Fcy = "Ф";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var Ffr = "𝔉";
var ffr = "𝔣";
var filig = "ﬁ";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof = "ƒ";
var Fopf = "𝔽";
var fopf = "𝕗";
var forall = "∀";
var ForAll = "∀";
var fork = "⋔";
var forkv = "⫙";
var Fouriertrf = "ℱ";
var fpartint = "⨍";
var frac12 = "½";
var frac13 = "⅓";
var frac14 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac34 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var Fscr = "ℱ";
var gacute = "ǵ";
var Gamma = "Γ";
var gamma = "γ";
var Gammad = "Ϝ";
var gammad = "ϝ";
var gap = "⪆";
var Gbreve = "Ğ";
var gbreve = "ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var gcirc = "ĝ";
var Gcy = "Г";
var gcy = "г";
var Gdot = "Ġ";
var gdot = "ġ";
var ge = "≥";
var gE = "≧";
var gEl = "⪌";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var gescc = "⪩";
var ges = "⩾";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var Gfr = "𝔊";
var gfr = "𝔤";
var gg = "≫";
var Gg = "⋙";
var ggg = "⋙";
var gimel = "ℷ";
var GJcy = "Ѓ";
var gjcy = "ѓ";
var gla = "⪥";
var gl = "≷";
var glE = "⪒";
var glj = "⪤";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gnE = "≩";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var Gopf = "𝔾";
var gopf = "𝕘";
var grave = "`";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var gtcc = "⪧";
var gtcir = "⩺";
var gt$1 = ">";
var GT = ">";
var Gt = "≫";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var Hacek = "ˇ";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var HARDcy = "Ъ";
var hardcy = "ъ";
var harrcir = "⥈";
var harr = "↔";
var hArr = "⇔";
var harrw = "↭";
var Hat = "^";
var hbar = "ℏ";
var Hcirc = "Ĥ";
var hcirc = "ĥ";
var hearts = "♥";
var heartsuit = "♥";
var hellip = "…";
var hercon = "⊹";
var hfr = "𝔥";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var Hopf = "ℍ";
var horbar = "―";
var HorizontalLine = "─";
var hscr = "𝒽";
var Hscr = "ℋ";
var hslash = "ℏ";
var Hstrok = "Ħ";
var hstrok = "ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var hybull = "⁃";
var hyphen = "‐";
var Iacute = "Í";
var iacute = "í";
var ic = "⁣";
var Icirc = "Î";
var icirc = "î";
var Icy = "И";
var icy = "и";
var Idot = "İ";
var IEcy = "Е";
var iecy = "е";
var iexcl = "¡";
var iff = "⇔";
var ifr = "𝔦";
var Ifr = "ℑ";
var Igrave = "Ì";
var igrave = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var IJlig = "Ĳ";
var ijlig = "ĳ";
var Imacr = "Ī";
var imacr = "ī";
var image = "ℑ";
var ImaginaryI = "ⅈ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var Im = "ℑ";
var imof = "⊷";
var imped = "Ƶ";
var Implies = "⇒";
var incare = "℅";
var infin = "∞";
var infintie = "⧝";
var inodot = "ı";
var intcal = "⊺";
var int = "∫";
var Int = "∬";
var integers = "ℤ";
var Integral = "∫";
var intercal = "⊺";
var Intersection = "⋂";
var intlarhk = "⨗";
var intprod = "⨼";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var IOcy = "Ё";
var iocy = "ё";
var Iogon = "Į";
var iogon = "į";
var Iopf = "𝕀";
var iopf = "𝕚";
var Iota = "Ι";
var iota = "ι";
var iprod = "⨼";
var iquest = "¿";
var iscr = "𝒾";
var Iscr = "ℐ";
var isin = "∈";
var isindot = "⋵";
var isinE = "⋹";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it = "⁢";
var Itilde = "Ĩ";
var itilde = "ĩ";
var Iukcy = "І";
var iukcy = "і";
var Iuml = "Ï";
var iuml = "ï";
var Jcirc = "Ĵ";
var jcirc = "ĵ";
var Jcy = "Й";
var jcy = "й";
var Jfr = "𝔍";
var jfr = "𝔧";
var jmath = "ȷ";
var Jopf = "𝕁";
var jopf = "𝕛";
var Jscr = "𝒥";
var jscr = "𝒿";
var Jsercy = "Ј";
var jsercy = "ј";
var Jukcy = "Є";
var jukcy = "є";
var Kappa = "Κ";
var kappa = "κ";
var kappav = "ϰ";
var Kcedil = "Ķ";
var kcedil = "ķ";
var Kcy = "К";
var kcy = "к";
var Kfr = "𝔎";
var kfr = "𝔨";
var kgreen = "ĸ";
var KHcy = "Х";
var khcy = "х";
var KJcy = "Ќ";
var kjcy = "ќ";
var Kopf = "𝕂";
var kopf = "𝕜";
var Kscr = "𝒦";
var kscr = "𝓀";
var lAarr = "⇚";
var Lacute = "Ĺ";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var Lambda = "Λ";
var lambda = "λ";
var lang = "⟨";
var Lang = "⟪";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var Laplacetrf = "ℒ";
var laquo = "«";
var larrb = "⇤";
var larrbfs = "⤟";
var larr = "←";
var Larr = "↞";
var lArr = "⇐";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var latail = "⤙";
var lAtail = "⤛";
var lat = "⪫";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lBarr = "⤎";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var Lcaron = "Ľ";
var lcaron = "ľ";
var Lcedil = "Ļ";
var lcedil = "ļ";
var lceil = "⌈";
var lcub = "{";
var Lcy = "Л";
var lcy = "л";
var ldca = "⤶";
var ldquo = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le = "≤";
var lE = "≦";
var LeftAngleBracket = "⟨";
var LeftArrowBar = "⇤";
var leftarrow = "←";
var LeftArrow = "←";
var Leftarrow = "⇐";
var LeftArrowRightArrow = "⇆";
var leftarrowtail = "↢";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVectorBar = "⥙";
var LeftDownVector = "⇃";
var LeftFloor = "⌊";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var LeftRightArrow = "↔";
var Leftrightarrow = "⇔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var LeftRightVector = "⥎";
var LeftTeeArrow = "↤";
var LeftTee = "⊣";
var LeftTeeVector = "⥚";
var leftthreetimes = "⋋";
var LeftTriangleBar = "⧏";
var LeftTriangle = "⊲";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVectorBar = "⥘";
var LeftUpVector = "↿";
var LeftVectorBar = "⥒";
var LeftVector = "↼";
var lEg = "⪋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var lescc = "⪨";
var les = "⩽";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var lessgtr = "≶";
var LessLess = "⪡";
var lesssim = "≲";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var lfisht = "⥼";
var lfloor = "⌊";
var Lfr = "𝔏";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lHar = "⥢";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var LJcy = "Љ";
var ljcy = "љ";
var llarr = "⇇";
var ll = "≪";
var Ll = "⋘";
var llcorner = "⌞";
var Lleftarrow = "⇚";
var llhard = "⥫";
var lltri = "◺";
var Lmidot = "Ŀ";
var lmidot = "ŀ";
var lmoustache = "⎰";
var lmoust = "⎰";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lnE = "≨";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var LongLeftArrow = "⟵";
var Longleftarrow = "⟸";
var longleftrightarrow = "⟷";
var LongLeftRightArrow = "⟷";
var Longleftrightarrow = "⟺";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var LongRightArrow = "⟶";
var Longrightarrow = "⟹";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var Lopf = "𝕃";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast = "∗";
var lowbar = "_";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var loz = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm = "‎";
var lrtri = "⊿";
var lsaquo = "‹";
var lscr = "𝓁";
var Lscr = "ℒ";
var lsh = "↰";
var Lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo = "‘";
var lsquor = "‚";
var Lstrok = "Ł";
var lstrok = "ł";
var ltcc = "⪦";
var ltcir = "⩹";
var lt$1 = "<";
var LT = "<";
var Lt = "≪";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var ltrPar = "⦖";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var macr = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map$1 = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var Mcy = "М";
var mcy = "м";
var mdash = "—";
var mDDot = "∺";
var measuredangle = "∡";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var mfr = "𝔪";
var mho = "℧";
var micro = "µ";
var midast = "*";
var midcir = "⫰";
var mid = "∣";
var middot = "·";
var minusb = "⊟";
var minus = "−";
var minusd = "∸";
var minusdu = "⨪";
var MinusPlus = "∓";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var Mopf = "𝕄";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var Mscr = "ℳ";
var mstpos = "∾";
var Mu = "Μ";
var mu = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nabla = "∇";
var Nacute = "Ń";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natural = "♮";
var naturals = "ℕ";
var natur = "♮";
var nbsp = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var Ncaron = "Ň";
var ncaron = "ň";
var Ncedil = "Ņ";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var Ncy = "Н";
var ncy = "н";
var ndash = "–";
var nearhk = "⤤";
var nearr = "↗";
var neArr = "⇗";
var nearrow = "↗";
var ne = "≠";
var nedot = "≐̸";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var nexist = "∄";
var nexists = "∄";
var Nfr = "𝔑";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var nGg = "⋙̸";
var ngsim = "≵";
var nGt = "≫⃒";
var ngt = "≯";
var ngtr = "≯";
var nGtv = "≫̸";
var nharr = "↮";
var nhArr = "⇎";
var nhpar = "⫲";
var ni = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var NJcy = "Њ";
var njcy = "њ";
var nlarr = "↚";
var nlArr = "⇍";
var nldr = "‥";
var nlE = "≦̸";
var nle = "≰";
var nleftarrow = "↚";
var nLeftarrow = "⇍";
var nleftrightarrow = "↮";
var nLeftrightarrow = "⇎";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nLl = "⋘̸";
var nlsim = "≴";
var nLt = "≪⃒";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nLtv = "≪̸";
var nmid = "∤";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var nopf = "𝕟";
var Nopf = "ℕ";
var Not = "⫬";
var not = "¬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var notin = "∉";
var notindot = "⋵̸";
var notinE = "⋹̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangle = "⋫";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var nparallel = "∦";
var npar = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var nprec = "⊀";
var npreceq = "⪯̸";
var npre = "⪯̸";
var nrarrc = "⤳̸";
var nrarr = "↛";
var nrArr = "⇏";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nRightarrow = "⇏";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var Nscr = "𝒩";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var Ntilde = "Ñ";
var ntilde = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var Nu = "Ν";
var nu = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvDash = "⊭";
var nVdash = "⊮";
var nVDash = "⊯";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvHarr = "⤄";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwarhk = "⤣";
var nwarr = "↖";
var nwArr = "⇖";
var nwarrow = "↖";
var nwnear = "⤧";
var Oacute = "Ó";
var oacute = "ó";
var oast = "⊛";
var Ocirc = "Ô";
var ocirc = "ô";
var ocir = "⊚";
var Ocy = "О";
var ocy = "о";
var odash = "⊝";
var Odblac = "Ő";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var OElig = "Œ";
var oelig = "œ";
var ofcir = "⦿";
var Ofr = "𝔒";
var ofr = "𝔬";
var ogon = "˛";
var Ograve = "Ò";
var ograve = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline = "‾";
var olt = "⧀";
var Omacr = "Ō";
var omacr = "ō";
var Omega = "Ω";
var omega = "ω";
var Omicron = "Ο";
var omicron = "ο";
var omid = "⦶";
var ominus = "⊖";
var Oopf = "𝕆";
var oopf = "𝕠";
var opar = "⦷";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var operp = "⦹";
var oplus = "⊕";
var orarr = "↻";
var Or = "⩔";
var or = "∨";
var ord = "⩝";
var order = "ℴ";
var orderof = "ℴ";
var ordf = "ª";
var ordm = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oS = "Ⓢ";
var Oscr = "𝒪";
var oscr = "ℴ";
var Oslash = "Ø";
var oslash = "ø";
var osol = "⊘";
var Otilde = "Õ";
var otilde = "õ";
var otimesas = "⨶";
var Otimes = "⨷";
var otimes = "⊗";
var Ouml = "Ö";
var ouml = "ö";
var ovbar = "⌽";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var para = "¶";
var parallel = "∥";
var par = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part = "∂";
var PartialD = "∂";
var Pcy = "П";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil = "‰";
var perp = "⊥";
var pertenk = "‱";
var Pfr = "𝔓";
var pfr = "𝔭";
var Phi = "Φ";
var phi = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone = "☎";
var Pi = "Π";
var pi = "π";
var pitchfork = "⋔";
var piv = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plus = "+";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var PlusMinus = "±";
var plusmn = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var Poincareplane = "ℌ";
var pointint = "⨕";
var popf = "𝕡";
var Popf = "ℙ";
var pound = "£";
var prap = "⪷";
var Pr = "⪻";
var pr = "≺";
var prcue = "≼";
var precapprox = "⪷";
var prec = "≺";
var preccurlyeq = "≼";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var pre = "⪯";
var prE = "⪳";
var precsim = "≾";
var prime = "′";
var Prime = "″";
var primes = "ℙ";
var prnap = "⪹";
var prnE = "⪵";
var prnsim = "⋨";
var prod = "∏";
var Product = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop = "∝";
var Proportional = "∝";
var Proportion = "∷";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var Pscr = "𝒫";
var pscr = "𝓅";
var Psi = "Ψ";
var psi = "ψ";
var puncsp = " ";
var Qfr = "𝔔";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var Qopf = "ℚ";
var qprime = "⁗";
var Qscr = "𝒬";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quot$1 = "\"";
var QUOT = "\"";
var rAarr = "⇛";
var race = "∽̱";
var Racute = "Ŕ";
var racute = "ŕ";
var radic = "√";
var raemptyv = "⦳";
var rang = "⟩";
var Rang = "⟫";
var rangd = "⦒";
var range = "⦥";
var rangle = "⟩";
var raquo = "»";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarr = "→";
var Rarr = "↠";
var rArr = "⇒";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var Rarrtl = "⤖";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var rAtail = "⤜";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rBarr = "⤏";
var RBarr = "⤐";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var Rcaron = "Ř";
var rcaron = "ř";
var Rcedil = "Ŗ";
var rcedil = "ŗ";
var rceil = "⌉";
var rcub = "}";
var Rcy = "Р";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo = "”";
var rdquor = "”";
var rdsh = "↳";
var real = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var Re = "ℜ";
var rect = "▭";
var reg = "®";
var REG = "®";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var rfisht = "⥽";
var rfloor = "⌋";
var rfr = "𝔯";
var Rfr = "ℜ";
var rHar = "⥤";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var Rho = "Ρ";
var rho = "ρ";
var rhov = "ϱ";
var RightAngleBracket = "⟩";
var RightArrowBar = "⇥";
var rightarrow = "→";
var RightArrow = "→";
var Rightarrow = "⇒";
var RightArrowLeftArrow = "⇄";
var rightarrowtail = "↣";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVectorBar = "⥕";
var RightDownVector = "⇂";
var RightFloor = "⌋";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var RightTeeArrow = "↦";
var RightTee = "⊢";
var RightTeeVector = "⥛";
var rightthreetimes = "⋌";
var RightTriangleBar = "⧐";
var RightTriangle = "⊳";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVectorBar = "⥔";
var RightUpVector = "↾";
var RightVectorBar = "⥓";
var RightVector = "⇀";
var ring = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm = "‏";
var rmoustache = "⎱";
var rmoust = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var Ropf = "ℝ";
var roplus = "⨮";
var rotimes = "⨵";
var RoundImplies = "⥰";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var Rrightarrow = "⇛";
var rsaquo = "›";
var rscr = "𝓇";
var Rscr = "ℛ";
var rsh = "↱";
var Rsh = "↱";
var rsqb = "]";
var rsquo = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var RuleDelayed = "⧴";
var ruluhar = "⥨";
var rx = "℞";
var Sacute = "Ś";
var sacute = "ś";
var sbquo = "‚";
var scap = "⪸";
var Scaron = "Š";
var scaron = "š";
var Sc = "⪼";
var sc = "≻";
var sccue = "≽";
var sce = "⪰";
var scE = "⪴";
var Scedil = "Ş";
var scedil = "ş";
var Scirc = "Ŝ";
var scirc = "ŝ";
var scnap = "⪺";
var scnE = "⪶";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var Scy = "С";
var scy = "с";
var sdotb = "⊡";
var sdot = "⋅";
var sdote = "⩦";
var searhk = "⤥";
var searr = "↘";
var seArr = "⇘";
var searrow = "↘";
var sect = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var Sfr = "𝔖";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var SHCHcy = "Щ";
var shchcy = "щ";
var SHcy = "Ш";
var shcy = "ш";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var shortmid = "∣";
var shortparallel = "∥";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var shy = "­";
var Sigma = "Σ";
var sigma = "σ";
var sigmaf = "ς";
var sigmav = "ς";
var sim = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var SmallCircle = "∘";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var SOFTcy = "Ь";
var softcy = "ь";
var solbar = "⌿";
var solb = "⧄";
var sol = "/";
var Sopf = "𝕊";
var sopf = "𝕤";
var spades = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var Sqrt = "√";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var square = "□";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var squarf = "▪";
var squ = "□";
var squf = "▪";
var srarr = "→";
var Sscr = "𝒮";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var Star = "⋆";
var star = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub = "⊂";
var Sub = "⋐";
var subdot = "⪽";
var subE = "⫅";
var sube = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var Subset = "⋐";
var subseteq = "⊆";
var subseteqq = "⫅";
var SubsetEqual = "⊆";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succapprox = "⪸";
var succ = "≻";
var succcurlyeq = "≽";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var SuchThat = "∋";
var sum = "∑";
var Sum = "∑";
var sung = "♪";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var sup = "⊃";
var Sup = "⋑";
var supdot = "⪾";
var supdsub = "⫘";
var supE = "⫆";
var supe = "⊇";
var supedot = "⫄";
var Superset = "⊃";
var SupersetEqual = "⊇";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var Supset = "⋑";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swarhk = "⤦";
var swarr = "↙";
var swArr = "⇙";
var swarrow = "↙";
var swnwar = "⤪";
var szlig = "ß";
var Tab = "\t";
var target = "⌖";
var Tau = "Τ";
var tau = "τ";
var tbrk = "⎴";
var Tcaron = "Ť";
var tcaron = "ť";
var Tcedil = "Ţ";
var tcedil = "ţ";
var Tcy = "Т";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var Tfr = "𝔗";
var tfr = "𝔱";
var there4 = "∴";
var therefore = "∴";
var Therefore = "∴";
var Theta = "Θ";
var theta = "θ";
var thetasym = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var ThickSpace = "  ";
var ThinSpace = " ";
var thinsp = " ";
var thkap = "≈";
var thksim = "∼";
var THORN = "Þ";
var thorn = "þ";
var tilde = "˜";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var timesbar = "⨱";
var timesb = "⊠";
var times$1 = "×";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var topbot = "⌶";
var topcir = "⫱";
var top = "⊤";
var Topf = "𝕋";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade = "™";
var TRADE = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var TripleDot = "⃛";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var Tscr = "𝒯";
var tscr = "𝓉";
var TScy = "Ц";
var tscy = "ц";
var TSHcy = "Ћ";
var tshcy = "ћ";
var Tstrok = "Ŧ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var Uacute = "Ú";
var uacute = "ú";
var uarr = "↑";
var Uarr = "↟";
var uArr = "⇑";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var ubrcy = "ў";
var Ubreve = "Ŭ";
var ubreve = "ŭ";
var Ucirc = "Û";
var ucirc = "û";
var Ucy = "У";
var ucy = "у";
var udarr = "⇅";
var Udblac = "Ű";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var Ufr = "𝔘";
var ufr = "𝔲";
var Ugrave = "Ù";
var ugrave = "ù";
var uHar = "⥣";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var Umacr = "Ū";
var umacr = "ū";
var uml = "¨";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var uogon = "ų";
var Uopf = "𝕌";
var uopf = "𝕦";
var UpArrowBar = "⤒";
var uparrow = "↑";
var UpArrow = "↑";
var Uparrow = "⇑";
var UpArrowDownArrow = "⇅";
var updownarrow = "↕";
var UpDownArrow = "↕";
var Updownarrow = "⇕";
var UpEquilibrium = "⥮";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var upsi = "υ";
var Upsi = "ϒ";
var upsih = "ϒ";
var Upsilon = "Υ";
var upsilon = "υ";
var UpTeeArrow = "↥";
var UpTee = "⊥";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var Uring = "Ů";
var uring = "ů";
var urtri = "◹";
var Uscr = "𝒰";
var uscr = "𝓊";
var utdot = "⋰";
var Utilde = "Ũ";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var Uuml = "Ü";
var uuml = "ü";
var uwangle = "⦧";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var vArr = "⇕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vBar = "⫨";
var Vbar = "⫫";
var vBarv = "⫩";
var Vcy = "В";
var vcy = "в";
var vdash = "⊢";
var vDash = "⊨";
var Vdash = "⊩";
var VDash = "⊫";
var Vdashl = "⫦";
var veebar = "⊻";
var vee = "∨";
var Vee = "⋁";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var Verbar = "‖";
var vert = "|";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var Vopf = "𝕍";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var Vscr = "𝒱";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var Vvdash = "⊪";
var vzigzag = "⦚";
var Wcirc = "Ŵ";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var Wedge = "⋀";
var wedgeq = "≙";
var weierp = "℘";
var Wfr = "𝔚";
var wfr = "𝔴";
var Wopf = "𝕎";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var Wscr = "𝒲";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var Xfr = "𝔛";
var xfr = "𝔵";
var xharr = "⟷";
var xhArr = "⟺";
var Xi = "Ξ";
var xi = "ξ";
var xlarr = "⟵";
var xlArr = "⟸";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var Xopf = "𝕏";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrarr = "⟶";
var xrArr = "⟹";
var Xscr = "𝒳";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var Yacute = "Ý";
var yacute = "ý";
var YAcy = "Я";
var yacy = "я";
var Ycirc = "Ŷ";
var ycirc = "ŷ";
var Ycy = "Ы";
var ycy = "ы";
var yen = "¥";
var Yfr = "𝔜";
var yfr = "𝔶";
var YIcy = "Ї";
var yicy = "ї";
var Yopf = "𝕐";
var yopf = "𝕪";
var Yscr = "𝒴";
var yscr = "𝓎";
var YUcy = "Ю";
var yucy = "ю";
var yuml = "ÿ";
var Yuml = "Ÿ";
var Zacute = "Ź";
var zacute = "ź";
var Zcaron = "Ž";
var zcaron = "ž";
var Zcy = "З";
var zcy = "з";
var Zdot = "Ż";
var zdot = "ż";
var zeetrf = "ℨ";
var ZeroWidthSpace = "​";
var Zeta = "Ζ";
var zeta = "ζ";
var zfr = "𝔷";
var Zfr = "ℨ";
var ZHcy = "Ж";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var Zopf = "ℤ";
var Zscr = "𝒵";
var zscr = "𝓏";
var zwj = "‍";
var zwnj = "‌";
var entitiesJSON = {
	Aacute: Aacute,
	aacute: aacute,
	Abreve: Abreve,
	abreve: abreve,
	ac: ac,
	acd: acd,
	acE: acE,
	Acirc: Acirc,
	acirc: acirc,
	acute: acute,
	Acy: Acy,
	acy: acy,
	AElig: AElig,
	aelig: aelig,
	af: af,
	Afr: Afr,
	afr: afr,
	Agrave: Agrave,
	agrave: agrave,
	alefsym: alefsym,
	aleph: aleph,
	Alpha: Alpha,
	alpha: alpha,
	Amacr: Amacr,
	amacr: amacr,
	amalg: amalg,
	amp: amp$1,
	AMP: AMP,
	andand: andand,
	And: And,
	and: and,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angmsd: angmsd,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	Aogon: Aogon,
	aogon: aogon,
	Aopf: Aopf,
	aopf: aopf,
	apacir: apacir,
	ap: ap,
	apE: apE,
	ape: ape,
	apid: apid,
	apos: apos$1,
	ApplyFunction: ApplyFunction,
	approx: approx,
	approxeq: approxeq,
	Aring: Aring,
	aring: aring,
	Ascr: Ascr,
	ascr: ascr,
	Assign: Assign,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	Atilde: Atilde,
	atilde: atilde,
	Auml: Auml,
	auml: auml,
	awconint: awconint,
	awint: awint,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	Backslash: Backslash,
	Barv: Barv,
	barvee: barvee,
	barwed: barwed,
	Barwed: Barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	Bcy: Bcy,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	Because: Because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	Bernoullis: Bernoullis,
	Beta: Beta,
	beta: beta,
	beth: beth,
	between: between,
	Bfr: Bfr,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block,
	bne: bne,
	bnequiv: bnequiv,
	bNot: bNot,
	bnot: bnot,
	Bopf: Bopf,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxbox: boxbox,
	boxdl: boxdl,
	boxdL: boxdL,
	boxDl: boxDl,
	boxDL: boxDL,
	boxdr: boxdr,
	boxdR: boxdR,
	boxDr: boxDr,
	boxDR: boxDR,
	boxh: boxh,
	boxH: boxH,
	boxhd: boxhd,
	boxHd: boxHd,
	boxhD: boxhD,
	boxHD: boxHD,
	boxhu: boxhu,
	boxHu: boxHu,
	boxhU: boxhU,
	boxHU: boxHU,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxul: boxul,
	boxuL: boxuL,
	boxUl: boxUl,
	boxUL: boxUL,
	boxur: boxur,
	boxuR: boxuR,
	boxUr: boxUr,
	boxUR: boxUR,
	boxv: boxv,
	boxV: boxV,
	boxvh: boxvh,
	boxvH: boxvH,
	boxVh: boxVh,
	boxVH: boxVH,
	boxvl: boxvl,
	boxvL: boxvL,
	boxVl: boxVl,
	boxVL: boxVL,
	boxvr: boxvr,
	boxvR: boxvR,
	boxVr: boxVr,
	boxVR: boxVR,
	bprime: bprime,
	breve: breve,
	Breve: Breve,
	brvbar: brvbar,
	bscr: bscr,
	Bscr: Bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsolb: bsolb,
	bsol: bsol,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	Bumpeq: Bumpeq,
	bumpeq: bumpeq,
	Cacute: Cacute,
	cacute: cacute,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	cap: cap,
	Cap: Cap,
	capcup: capcup,
	capdot: capdot,
	CapitalDifferentialD: CapitalDifferentialD,
	caps: caps,
	caret: caret,
	caron: caron,
	Cayleys: Cayleys,
	ccaps: ccaps,
	Ccaron: Ccaron,
	ccaron: ccaron,
	Ccedil: Ccedil,
	ccedil: ccedil,
	Ccirc: Ccirc,
	ccirc: ccirc,
	Cconint: Cconint,
	ccups: ccups,
	ccupssm: ccupssm,
	Cdot: Cdot,
	cdot: cdot,
	cedil: cedil,
	Cedilla: Cedilla,
	cemptyv: cemptyv,
	cent: cent,
	centerdot: centerdot,
	CenterDot: CenterDot,
	cfr: cfr,
	Cfr: Cfr,
	CHcy: CHcy,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	Chi: Chi,
	chi: chi,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	CircleDot: CircleDot,
	circledR: circledR,
	circledS: circledS,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	cir: cir,
	cirE: cirE,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	clubs: clubs,
	clubsuit: clubsuit,
	colon: colon,
	Colon: Colon,
	Colone: Colone,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	Congruent: Congruent,
	conint: conint,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	copf: copf,
	Copf: Copf,
	coprod: coprod,
	Coproduct: Coproduct,
	copy: copy,
	COPY: COPY,
	copysr: copysr,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	crarr: crarr,
	cross: cross,
	Cross: Cross,
	Cscr: Cscr,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	CupCap: CupCap,
	cup: cup,
	Cup: Cup,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curren: curren,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dagger: dagger,
	Dagger: Dagger,
	daleth: daleth,
	darr: darr,
	Darr: Darr,
	dArr: dArr,
	dash: dash,
	Dashv: Dashv,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	Dcaron: Dcaron,
	dcaron: dcaron,
	Dcy: Dcy,
	dcy: dcy,
	ddagger: ddagger,
	ddarr: ddarr,
	DD: DD,
	dd: dd,
	DDotrahd: DDotrahd,
	ddotseq: ddotseq,
	deg: deg,
	Del: Del,
	Delta: Delta,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	Dfr: Dfr,
	dfr: dfr,
	dHar: dHar,
	dharl: dharl,
	dharr: dharr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	diam: diam,
	diamond: diamond,
	Diamond: Diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	DifferentialD: DifferentialD,
	digamma: digamma,
	disin: disin,
	div: div,
	divide: divide,
	divideontimes: divideontimes,
	divonx: divonx,
	DJcy: DJcy,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	Dopf: Dopf,
	dopf: dopf,
	Dot: Dot,
	dot: dot,
	DotDot: DotDot,
	doteq: doteq,
	doteqdot: doteqdot,
	DotEqual: DotEqual,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrowBar: DownArrowBar,
	downarrow: downarrow,
	DownArrow: DownArrow,
	Downarrow: Downarrow,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownLeftVector: DownLeftVector,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVectorBar: DownRightVectorBar,
	DownRightVector: DownRightVector,
	DownTeeArrow: DownTeeArrow,
	DownTee: DownTee,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	Dscr: Dscr,
	dscr: dscr,
	DScy: DScy,
	dscy: dscy,
	dsol: dsol,
	Dstrok: Dstrok,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	DZcy: DZcy,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	Eacute: Eacute,
	eacute: eacute,
	easter: easter,
	Ecaron: Ecaron,
	ecaron: ecaron,
	Ecirc: Ecirc,
	ecirc: ecirc,
	ecir: ecir,
	ecolon: ecolon,
	Ecy: Ecy,
	ecy: ecy,
	eDDot: eDDot,
	Edot: Edot,
	edot: edot,
	eDot: eDot,
	ee: ee,
	efDot: efDot,
	Efr: Efr,
	efr: efr,
	eg: eg,
	Egrave: Egrave,
	egrave: egrave,
	egs: egs,
	egsdot: egsdot,
	el: el,
	Element: Element,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	Emacr: Emacr,
	emacr: emacr,
	empty: empty,
	emptyset: emptyset,
	EmptySmallSquare: EmptySmallSquare,
	emptyv: emptyv,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	ENG: ENG,
	eng: eng,
	ensp: ensp,
	Eogon: Eogon,
	eogon: eogon,
	Eopf: Eopf,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	Epsilon: Epsilon,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	Equal: Equal,
	equals: equals,
	EqualTilde: EqualTilde,
	equest: equest,
	Equilibrium: Equilibrium,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erarr: erarr,
	erDot: erDot,
	escr: escr,
	Escr: Escr,
	esdot: esdot,
	Esim: Esim,
	esim: esim,
	Eta: Eta,
	eta: eta,
	ETH: ETH,
	eth: eth,
	Euml: Euml,
	euml: euml,
	euro: euro,
	excl: excl,
	exist: exist,
	Exists: Exists,
	expectation: expectation,
	exponentiale: exponentiale,
	ExponentialE: ExponentialE,
	fallingdotseq: fallingdotseq,
	Fcy: Fcy,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	Ffr: Ffr,
	ffr: ffr,
	filig: filig,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	Fopf: Fopf,
	fopf: fopf,
	forall: forall,
	ForAll: ForAll,
	fork: fork,
	forkv: forkv,
	Fouriertrf: Fouriertrf,
	fpartint: fpartint,
	frac12: frac12,
	frac13: frac13,
	frac14: frac14,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac34: frac34,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	Fscr: Fscr,
	gacute: gacute,
	Gamma: Gamma,
	gamma: gamma,
	Gammad: Gammad,
	gammad: gammad,
	gap: gap,
	Gbreve: Gbreve,
	gbreve: gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	gcirc: gcirc,
	Gcy: Gcy,
	gcy: gcy,
	Gdot: Gdot,
	gdot: gdot,
	ge: ge,
	gE: gE,
	gEl: gEl,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	gescc: gescc,
	ges: ges,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	Gfr: Gfr,
	gfr: gfr,
	gg: gg,
	Gg: Gg,
	ggg: ggg,
	gimel: gimel,
	GJcy: GJcy,
	gjcy: gjcy,
	gla: gla,
	gl: gl,
	glE: glE,
	glj: glj,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gnE: gnE,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	Gopf: Gopf,
	gopf: gopf,
	grave: grave,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	gtcc: gtcc,
	gtcir: gtcir,
	gt: gt$1,
	GT: GT,
	Gt: Gt,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	Hacek: Hacek,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	HARDcy: HARDcy,
	hardcy: hardcy,
	harrcir: harrcir,
	harr: harr,
	hArr: hArr,
	harrw: harrw,
	Hat: Hat,
	hbar: hbar,
	Hcirc: Hcirc,
	hcirc: hcirc,
	hearts: hearts,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	Hopf: Hopf,
	horbar: horbar,
	HorizontalLine: HorizontalLine,
	hscr: hscr,
	Hscr: Hscr,
	hslash: hslash,
	Hstrok: Hstrok,
	hstrok: hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	hybull: hybull,
	hyphen: hyphen,
	Iacute: Iacute,
	iacute: iacute,
	ic: ic,
	Icirc: Icirc,
	icirc: icirc,
	Icy: Icy,
	icy: icy,
	Idot: Idot,
	IEcy: IEcy,
	iecy: iecy,
	iexcl: iexcl,
	iff: iff,
	ifr: ifr,
	Ifr: Ifr,
	Igrave: Igrave,
	igrave: igrave,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	IJlig: IJlig,
	ijlig: ijlig,
	Imacr: Imacr,
	imacr: imacr,
	image: image,
	ImaginaryI: ImaginaryI,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	Im: Im,
	imof: imof,
	imped: imped,
	Implies: Implies,
	incare: incare,
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	intcal: intcal,
	int: int,
	Int: Int,
	integers: integers,
	Integral: Integral,
	intercal: intercal,
	Intersection: Intersection,
	intlarhk: intlarhk,
	intprod: intprod,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	IOcy: IOcy,
	iocy: iocy,
	Iogon: Iogon,
	iogon: iogon,
	Iopf: Iopf,
	iopf: iopf,
	Iota: Iota,
	iota: iota,
	iprod: iprod,
	iquest: iquest,
	iscr: iscr,
	Iscr: Iscr,
	isin: isin,
	isindot: isindot,
	isinE: isinE,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	Itilde: Itilde,
	itilde: itilde,
	Iukcy: Iukcy,
	iukcy: iukcy,
	Iuml: Iuml,
	iuml: iuml,
	Jcirc: Jcirc,
	jcirc: jcirc,
	Jcy: Jcy,
	jcy: jcy,
	Jfr: Jfr,
	jfr: jfr,
	jmath: jmath,
	Jopf: Jopf,
	jopf: jopf,
	Jscr: Jscr,
	jscr: jscr,
	Jsercy: Jsercy,
	jsercy: jsercy,
	Jukcy: Jukcy,
	jukcy: jukcy,
	Kappa: Kappa,
	kappa: kappa,
	kappav: kappav,
	Kcedil: Kcedil,
	kcedil: kcedil,
	Kcy: Kcy,
	kcy: kcy,
	Kfr: Kfr,
	kfr: kfr,
	kgreen: kgreen,
	KHcy: KHcy,
	khcy: khcy,
	KJcy: KJcy,
	kjcy: kjcy,
	Kopf: Kopf,
	kopf: kopf,
	Kscr: Kscr,
	kscr: kscr,
	lAarr: lAarr,
	Lacute: Lacute,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	Lambda: Lambda,
	lambda: lambda,
	lang: lang,
	Lang: Lang,
	langd: langd,
	langle: langle,
	lap: lap,
	Laplacetrf: Laplacetrf,
	laquo: laquo,
	larrb: larrb,
	larrbfs: larrbfs,
	larr: larr,
	Larr: Larr,
	lArr: lArr,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	latail: latail,
	lAtail: lAtail,
	lat: lat,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lBarr: lBarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	Lcaron: Lcaron,
	lcaron: lcaron,
	Lcedil: Lcedil,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	Lcy: Lcy,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	lE: lE,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrowBar: LeftArrowBar,
	leftarrow: leftarrow,
	LeftArrow: LeftArrow,
	Leftarrow: Leftarrow,
	LeftArrowRightArrow: LeftArrowRightArrow,
	leftarrowtail: leftarrowtail,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftDownVector: LeftDownVector,
	LeftFloor: LeftFloor,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	LeftRightArrow: LeftRightArrow,
	Leftrightarrow: Leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	LeftRightVector: LeftRightVector,
	LeftTeeArrow: LeftTeeArrow,
	LeftTee: LeftTee,
	LeftTeeVector: LeftTeeVector,
	leftthreetimes: leftthreetimes,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangle: LeftTriangle,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftUpVector: LeftUpVector,
	LeftVectorBar: LeftVectorBar,
	LeftVector: LeftVector,
	lEg: lEg,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	lescc: lescc,
	les: les,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	lessgtr: lessgtr,
	LessLess: LessLess,
	lesssim: lesssim,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	lfisht: lfisht,
	lfloor: lfloor,
	Lfr: Lfr,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lHar: lHar,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	LJcy: LJcy,
	ljcy: ljcy,
	llarr: llarr,
	ll: ll,
	Ll: Ll,
	llcorner: llcorner,
	Lleftarrow: Lleftarrow,
	llhard: llhard,
	lltri: lltri,
	Lmidot: Lmidot,
	lmidot: lmidot,
	lmoustache: lmoustache,
	lmoust: lmoust,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lnE: lnE,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	LongLeftArrow: LongLeftArrow,
	Longleftarrow: Longleftarrow,
	longleftrightarrow: longleftrightarrow,
	LongLeftRightArrow: LongLeftRightArrow,
	Longleftrightarrow: Longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	LongRightArrow: LongRightArrow,
	Longrightarrow: Longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	Lopf: Lopf,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	Lscr: Lscr,
	lsh: lsh,
	Lsh: Lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	Lstrok: Lstrok,
	lstrok: lstrok,
	ltcc: ltcc,
	ltcir: ltcir,
	lt: lt$1,
	LT: LT,
	Lt: Lt,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	ltrPar: ltrPar,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	macr: macr,
	male: male,
	malt: malt,
	maltese: maltese,
	map: map$1,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	Mcy: Mcy,
	mcy: mcy,
	mdash: mdash,
	mDDot: mDDot,
	measuredangle: measuredangle,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	mfr: mfr,
	mho: mho,
	micro: micro,
	midast: midast,
	midcir: midcir,
	mid: mid,
	middot: middot,
	minusb: minusb,
	minus: minus,
	minusd: minusd,
	minusdu: minusdu,
	MinusPlus: MinusPlus,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	Mopf: Mopf,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	Mscr: Mscr,
	mstpos: mstpos,
	Mu: Mu,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nabla: nabla,
	Nacute: Nacute,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natural: natural,
	naturals: naturals,
	natur: natur,
	nbsp: nbsp,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	Ncaron: Ncaron,
	ncaron: ncaron,
	Ncedil: Ncedil,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	Ncy: Ncy,
	ncy: ncy,
	ndash: ndash,
	nearhk: nearhk,
	nearr: nearr,
	neArr: neArr,
	nearrow: nearrow,
	ne: ne,
	nedot: nedot,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	nexist: nexist,
	nexists: nexists,
	Nfr: Nfr,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	nGg: nGg,
	ngsim: ngsim,
	nGt: nGt,
	ngt: ngt,
	ngtr: ngtr,
	nGtv: nGtv,
	nharr: nharr,
	nhArr: nhArr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	NJcy: NJcy,
	njcy: njcy,
	nlarr: nlarr,
	nlArr: nlArr,
	nldr: nldr,
	nlE: nlE,
	nle: nle,
	nleftarrow: nleftarrow,
	nLeftarrow: nLeftarrow,
	nleftrightarrow: nleftrightarrow,
	nLeftrightarrow: nLeftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nLl: nLl,
	nlsim: nlsim,
	nLt: nLt,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nLtv: nLtv,
	nmid: nmid,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	nopf: nopf,
	Nopf: Nopf,
	Not: Not,
	not: not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	notin: notin,
	notindot: notindot,
	notinE: notinE,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	nparallel: nparallel,
	npar: npar,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	nprec: nprec,
	npreceq: npreceq,
	npre: npre,
	nrarrc: nrarrc,
	nrarr: nrarr,
	nrArr: nrArr,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nRightarrow: nRightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	Nscr: Nscr,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	Ntilde: Ntilde,
	ntilde: ntilde,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	Nu: Nu,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvap: nvap,
	nvdash: nvdash,
	nvDash: nvDash,
	nVdash: nVdash,
	nVDash: nVDash,
	nvge: nvge,
	nvgt: nvgt,
	nvHarr: nvHarr,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwArr: nwArr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	Oacute: Oacute,
	oacute: oacute,
	oast: oast,
	Ocirc: Ocirc,
	ocirc: ocirc,
	ocir: ocir,
	Ocy: Ocy,
	ocy: ocy,
	odash: odash,
	Odblac: Odblac,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	OElig: OElig,
	oelig: oelig,
	ofcir: ofcir,
	Ofr: Ofr,
	ofr: ofr,
	ogon: ogon,
	Ograve: Ograve,
	ograve: ograve,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	Omacr: Omacr,
	omacr: omacr,
	Omega: Omega,
	omega: omega,
	Omicron: Omicron,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	Oopf: Oopf,
	oopf: oopf,
	opar: opar,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	operp: operp,
	oplus: oplus,
	orarr: orarr,
	Or: Or,
	or: or,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf,
	ordm: ordm,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oS: oS,
	Oscr: Oscr,
	oscr: oscr,
	Oslash: Oslash,
	oslash: oslash,
	osol: osol,
	Otilde: Otilde,
	otilde: otilde,
	otimesas: otimesas,
	Otimes: Otimes,
	otimes: otimes,
	Ouml: Ouml,
	ouml: ouml,
	ovbar: ovbar,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	para: para,
	parallel: parallel,
	par: par,
	parsim: parsim,
	parsl: parsl,
	part: part,
	PartialD: PartialD,
	Pcy: Pcy,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	Pfr: Pfr,
	pfr: pfr,
	Phi: Phi,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	Pi: Pi,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plus: plus,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	PlusMinus: PlusMinus,
	plusmn: plusmn,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	Poincareplane: Poincareplane,
	pointint: pointint,
	popf: popf,
	Popf: Popf,
	pound: pound,
	prap: prap,
	Pr: Pr,
	pr: pr,
	prcue: prcue,
	precapprox: precapprox,
	prec: prec,
	preccurlyeq: preccurlyeq,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	pre: pre,
	prE: prE,
	precsim: precsim,
	prime: prime,
	Prime: Prime,
	primes: primes,
	prnap: prnap,
	prnE: prnE,
	prnsim: prnsim,
	prod: prod,
	Product: Product,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	Proportional: Proportional,
	Proportion: Proportion,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	Pscr: Pscr,
	pscr: pscr,
	Psi: Psi,
	psi: psi,
	puncsp: puncsp,
	Qfr: Qfr,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	Qopf: Qopf,
	qprime: qprime,
	Qscr: Qscr,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quot: quot$1,
	QUOT: QUOT,
	rAarr: rAarr,
	race: race,
	Racute: Racute,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	Rang: Rang,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raquo: raquo,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarr: rarr,
	Rarr: Rarr,
	rArr: rArr,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	Rarrtl: Rarrtl,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	rAtail: rAtail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rBarr: rBarr,
	RBarr: RBarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	Rcaron: Rcaron,
	rcaron: rcaron,
	Rcedil: Rcedil,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	Rcy: Rcy,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	Re: Re,
	rect: rect,
	reg: reg,
	REG: REG,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	Rfr: Rfr,
	rHar: rHar,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	Rho: Rho,
	rho: rho,
	rhov: rhov,
	RightAngleBracket: RightAngleBracket,
	RightArrowBar: RightArrowBar,
	rightarrow: rightarrow,
	RightArrow: RightArrow,
	Rightarrow: Rightarrow,
	RightArrowLeftArrow: RightArrowLeftArrow,
	rightarrowtail: rightarrowtail,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVectorBar: RightDownVectorBar,
	RightDownVector: RightDownVector,
	RightFloor: RightFloor,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	RightTeeArrow: RightTeeArrow,
	RightTee: RightTee,
	RightTeeVector: RightTeeVector,
	rightthreetimes: rightthreetimes,
	RightTriangleBar: RightTriangleBar,
	RightTriangle: RightTriangle,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVectorBar: RightUpVectorBar,
	RightUpVector: RightUpVector,
	RightVectorBar: RightVectorBar,
	RightVector: RightVector,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoustache: rmoustache,
	rmoust: rmoust,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	Ropf: Ropf,
	roplus: roplus,
	rotimes: rotimes,
	RoundImplies: RoundImplies,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	Rrightarrow: Rrightarrow,
	rsaquo: rsaquo,
	rscr: rscr,
	Rscr: Rscr,
	rsh: rsh,
	Rsh: Rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	RuleDelayed: RuleDelayed,
	ruluhar: ruluhar,
	rx: rx,
	Sacute: Sacute,
	sacute: sacute,
	sbquo: sbquo,
	scap: scap,
	Scaron: Scaron,
	scaron: scaron,
	Sc: Sc,
	sc: sc,
	sccue: sccue,
	sce: sce,
	scE: scE,
	Scedil: Scedil,
	scedil: scedil,
	Scirc: Scirc,
	scirc: scirc,
	scnap: scnap,
	scnE: scnE,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	Scy: Scy,
	scy: scy,
	sdotb: sdotb,
	sdot: sdot,
	sdote: sdote,
	searhk: searhk,
	searr: searr,
	seArr: seArr,
	searrow: searrow,
	sect: sect,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	Sfr: Sfr,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	SHCHcy: SHCHcy,
	shchcy: shchcy,
	SHcy: SHcy,
	shcy: shcy,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	shortmid: shortmid,
	shortparallel: shortparallel,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	shy: shy,
	Sigma: Sigma,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	SmallCircle: SmallCircle,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	SOFTcy: SOFTcy,
	softcy: softcy,
	solbar: solbar,
	solb: solb,
	sol: sol,
	Sopf: Sopf,
	sopf: sopf,
	spades: spades,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	Sqrt: Sqrt,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	square: square,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	squarf: squarf,
	squ: squ,
	squf: squf,
	srarr: srarr,
	Sscr: Sscr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	Star: Star,
	star: star,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	Sub: Sub,
	subdot: subdot,
	subE: subE,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	Subset: Subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	SubsetEqual: SubsetEqual,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succapprox: succapprox,
	succ: succ,
	succcurlyeq: succcurlyeq,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	SuchThat: SuchThat,
	sum: sum,
	Sum: Sum,
	sung: sung,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	sup: sup,
	Sup: Sup,
	supdot: supdot,
	supdsub: supdsub,
	supE: supE,
	supe: supe,
	supedot: supedot,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	Supset: Supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swarhk: swarhk,
	swarr: swarr,
	swArr: swArr,
	swarrow: swarrow,
	swnwar: swnwar,
	szlig: szlig,
	Tab: Tab,
	target: target,
	Tau: Tau,
	tau: tau,
	tbrk: tbrk,
	Tcaron: Tcaron,
	tcaron: tcaron,
	Tcedil: Tcedil,
	tcedil: tcedil,
	Tcy: Tcy,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	Tfr: Tfr,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	Therefore: Therefore,
	Theta: Theta,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	THORN: THORN,
	thorn: thorn,
	tilde: tilde,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	timesbar: timesbar,
	timesb: timesb,
	times: times$1,
	timesd: timesd,
	tint: tint,
	toea: toea,
	topbot: topbot,
	topcir: topcir,
	top: top,
	Topf: Topf,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	TRADE: TRADE,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	TripleDot: TripleDot,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	Tscr: Tscr,
	tscr: tscr,
	TScy: TScy,
	tscy: tscy,
	TSHcy: TSHcy,
	tshcy: tshcy,
	Tstrok: Tstrok,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	Uacute: Uacute,
	uacute: uacute,
	uarr: uarr,
	Uarr: Uarr,
	uArr: uArr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	ubrcy: ubrcy,
	Ubreve: Ubreve,
	ubreve: ubreve,
	Ucirc: Ucirc,
	ucirc: ucirc,
	Ucy: Ucy,
	ucy: ucy,
	udarr: udarr,
	Udblac: Udblac,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	Ufr: Ufr,
	ufr: ufr,
	Ugrave: Ugrave,
	ugrave: ugrave,
	uHar: uHar,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	Umacr: Umacr,
	umacr: umacr,
	uml: uml,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	uogon: uogon,
	Uopf: Uopf,
	uopf: uopf,
	UpArrowBar: UpArrowBar,
	uparrow: uparrow,
	UpArrow: UpArrow,
	Uparrow: Uparrow,
	UpArrowDownArrow: UpArrowDownArrow,
	updownarrow: updownarrow,
	UpDownArrow: UpDownArrow,
	Updownarrow: Updownarrow,
	UpEquilibrium: UpEquilibrium,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	upsi: upsi,
	Upsi: Upsi,
	upsih: upsih,
	Upsilon: Upsilon,
	upsilon: upsilon,
	UpTeeArrow: UpTeeArrow,
	UpTee: UpTee,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	Uring: Uring,
	uring: uring,
	urtri: urtri,
	Uscr: Uscr,
	uscr: uscr,
	utdot: utdot,
	Utilde: Utilde,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	Uuml: Uuml,
	uuml: uuml,
	uwangle: uwangle,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	vArr: vArr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vBar: vBar,
	Vbar: Vbar,
	vBarv: vBarv,
	Vcy: Vcy,
	vcy: vcy,
	vdash: vdash,
	vDash: vDash,
	Vdash: Vdash,
	VDash: VDash,
	Vdashl: Vdashl,
	veebar: veebar,
	vee: vee,
	Vee: Vee,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	Verbar: Verbar,
	vert: vert,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	Vopf: Vopf,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	Vscr: Vscr,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	Vvdash: Vvdash,
	vzigzag: vzigzag,
	Wcirc: Wcirc,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	Wedge: Wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	Wfr: Wfr,
	wfr: wfr,
	Wopf: Wopf,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	Wscr: Wscr,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	Xfr: Xfr,
	xfr: xfr,
	xharr: xharr,
	xhArr: xhArr,
	Xi: Xi,
	xi: xi,
	xlarr: xlarr,
	xlArr: xlArr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	Xopf: Xopf,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrarr: xrarr,
	xrArr: xrArr,
	Xscr: Xscr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	Yacute: Yacute,
	yacute: yacute,
	YAcy: YAcy,
	yacy: yacy,
	Ycirc: Ycirc,
	ycirc: ycirc,
	Ycy: Ycy,
	ycy: ycy,
	yen: yen,
	Yfr: Yfr,
	yfr: yfr,
	YIcy: YIcy,
	yicy: yicy,
	Yopf: Yopf,
	yopf: yopf,
	Yscr: Yscr,
	yscr: yscr,
	YUcy: YUcy,
	yucy: yucy,
	yuml: yuml,
	Yuml: Yuml,
	Zacute: Zacute,
	zacute: zacute,
	Zcaron: Zcaron,
	zcaron: zcaron,
	Zcy: Zcy,
	zcy: zcy,
	Zdot: Zdot,
	zdot: zdot,
	zeetrf: zeetrf,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	zeta: zeta,
	zfr: zfr,
	Zfr: Zfr,
	ZHcy: ZHcy,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	Zopf: Zopf,
	Zscr: Zscr,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj,
	"in": "∈",
	"Map": "⤅"
};

var entities = Object.freeze({
	Aacute: Aacute,
	aacute: aacute,
	Abreve: Abreve,
	abreve: abreve,
	ac: ac,
	acd: acd,
	acE: acE,
	Acirc: Acirc,
	acirc: acirc,
	acute: acute,
	Acy: Acy,
	acy: acy,
	AElig: AElig,
	aelig: aelig,
	af: af,
	Afr: Afr,
	afr: afr,
	Agrave: Agrave,
	agrave: agrave,
	alefsym: alefsym,
	aleph: aleph,
	Alpha: Alpha,
	alpha: alpha,
	Amacr: Amacr,
	amacr: amacr,
	amalg: amalg,
	amp: amp$1,
	AMP: AMP,
	andand: andand,
	And: And,
	and: and,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angmsd: angmsd,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	Aogon: Aogon,
	aogon: aogon,
	Aopf: Aopf,
	aopf: aopf,
	apacir: apacir,
	ap: ap,
	apE: apE,
	ape: ape,
	apid: apid,
	apos: apos$1,
	ApplyFunction: ApplyFunction,
	approx: approx,
	approxeq: approxeq,
	Aring: Aring,
	aring: aring,
	Ascr: Ascr,
	ascr: ascr,
	Assign: Assign,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	Atilde: Atilde,
	atilde: atilde,
	Auml: Auml,
	auml: auml,
	awconint: awconint,
	awint: awint,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	Backslash: Backslash,
	Barv: Barv,
	barvee: barvee,
	barwed: barwed,
	Barwed: Barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	Bcy: Bcy,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	Because: Because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	Bernoullis: Bernoullis,
	Beta: Beta,
	beta: beta,
	beth: beth,
	between: between,
	Bfr: Bfr,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block,
	bne: bne,
	bnequiv: bnequiv,
	bNot: bNot,
	bnot: bnot,
	Bopf: Bopf,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxbox: boxbox,
	boxdl: boxdl,
	boxdL: boxdL,
	boxDl: boxDl,
	boxDL: boxDL,
	boxdr: boxdr,
	boxdR: boxdR,
	boxDr: boxDr,
	boxDR: boxDR,
	boxh: boxh,
	boxH: boxH,
	boxhd: boxhd,
	boxHd: boxHd,
	boxhD: boxhD,
	boxHD: boxHD,
	boxhu: boxhu,
	boxHu: boxHu,
	boxhU: boxhU,
	boxHU: boxHU,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxul: boxul,
	boxuL: boxuL,
	boxUl: boxUl,
	boxUL: boxUL,
	boxur: boxur,
	boxuR: boxuR,
	boxUr: boxUr,
	boxUR: boxUR,
	boxv: boxv,
	boxV: boxV,
	boxvh: boxvh,
	boxvH: boxvH,
	boxVh: boxVh,
	boxVH: boxVH,
	boxvl: boxvl,
	boxvL: boxvL,
	boxVl: boxVl,
	boxVL: boxVL,
	boxvr: boxvr,
	boxvR: boxvR,
	boxVr: boxVr,
	boxVR: boxVR,
	bprime: bprime,
	breve: breve,
	Breve: Breve,
	brvbar: brvbar,
	bscr: bscr,
	Bscr: Bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsolb: bsolb,
	bsol: bsol,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	Bumpeq: Bumpeq,
	bumpeq: bumpeq,
	Cacute: Cacute,
	cacute: cacute,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	cap: cap,
	Cap: Cap,
	capcup: capcup,
	capdot: capdot,
	CapitalDifferentialD: CapitalDifferentialD,
	caps: caps,
	caret: caret,
	caron: caron,
	Cayleys: Cayleys,
	ccaps: ccaps,
	Ccaron: Ccaron,
	ccaron: ccaron,
	Ccedil: Ccedil,
	ccedil: ccedil,
	Ccirc: Ccirc,
	ccirc: ccirc,
	Cconint: Cconint,
	ccups: ccups,
	ccupssm: ccupssm,
	Cdot: Cdot,
	cdot: cdot,
	cedil: cedil,
	Cedilla: Cedilla,
	cemptyv: cemptyv,
	cent: cent,
	centerdot: centerdot,
	CenterDot: CenterDot,
	cfr: cfr,
	Cfr: Cfr,
	CHcy: CHcy,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	Chi: Chi,
	chi: chi,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	CircleDot: CircleDot,
	circledR: circledR,
	circledS: circledS,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	cir: cir,
	cirE: cirE,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	clubs: clubs,
	clubsuit: clubsuit,
	colon: colon,
	Colon: Colon,
	Colone: Colone,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	Congruent: Congruent,
	conint: conint,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	copf: copf,
	Copf: Copf,
	coprod: coprod,
	Coproduct: Coproduct,
	copy: copy,
	COPY: COPY,
	copysr: copysr,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	crarr: crarr,
	cross: cross,
	Cross: Cross,
	Cscr: Cscr,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	CupCap: CupCap,
	cup: cup,
	Cup: Cup,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curren: curren,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dagger: dagger,
	Dagger: Dagger,
	daleth: daleth,
	darr: darr,
	Darr: Darr,
	dArr: dArr,
	dash: dash,
	Dashv: Dashv,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	Dcaron: Dcaron,
	dcaron: dcaron,
	Dcy: Dcy,
	dcy: dcy,
	ddagger: ddagger,
	ddarr: ddarr,
	DD: DD,
	dd: dd,
	DDotrahd: DDotrahd,
	ddotseq: ddotseq,
	deg: deg,
	Del: Del,
	Delta: Delta,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	Dfr: Dfr,
	dfr: dfr,
	dHar: dHar,
	dharl: dharl,
	dharr: dharr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	diam: diam,
	diamond: diamond,
	Diamond: Diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	DifferentialD: DifferentialD,
	digamma: digamma,
	disin: disin,
	div: div,
	divide: divide,
	divideontimes: divideontimes,
	divonx: divonx,
	DJcy: DJcy,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	Dopf: Dopf,
	dopf: dopf,
	Dot: Dot,
	dot: dot,
	DotDot: DotDot,
	doteq: doteq,
	doteqdot: doteqdot,
	DotEqual: DotEqual,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrowBar: DownArrowBar,
	downarrow: downarrow,
	DownArrow: DownArrow,
	Downarrow: Downarrow,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownLeftVector: DownLeftVector,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVectorBar: DownRightVectorBar,
	DownRightVector: DownRightVector,
	DownTeeArrow: DownTeeArrow,
	DownTee: DownTee,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	Dscr: Dscr,
	dscr: dscr,
	DScy: DScy,
	dscy: dscy,
	dsol: dsol,
	Dstrok: Dstrok,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	DZcy: DZcy,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	Eacute: Eacute,
	eacute: eacute,
	easter: easter,
	Ecaron: Ecaron,
	ecaron: ecaron,
	Ecirc: Ecirc,
	ecirc: ecirc,
	ecir: ecir,
	ecolon: ecolon,
	Ecy: Ecy,
	ecy: ecy,
	eDDot: eDDot,
	Edot: Edot,
	edot: edot,
	eDot: eDot,
	ee: ee,
	efDot: efDot,
	Efr: Efr,
	efr: efr,
	eg: eg,
	Egrave: Egrave,
	egrave: egrave,
	egs: egs,
	egsdot: egsdot,
	el: el,
	Element: Element,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	Emacr: Emacr,
	emacr: emacr,
	empty: empty,
	emptyset: emptyset,
	EmptySmallSquare: EmptySmallSquare,
	emptyv: emptyv,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	ENG: ENG,
	eng: eng,
	ensp: ensp,
	Eogon: Eogon,
	eogon: eogon,
	Eopf: Eopf,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	Epsilon: Epsilon,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	Equal: Equal,
	equals: equals,
	EqualTilde: EqualTilde,
	equest: equest,
	Equilibrium: Equilibrium,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erarr: erarr,
	erDot: erDot,
	escr: escr,
	Escr: Escr,
	esdot: esdot,
	Esim: Esim,
	esim: esim,
	Eta: Eta,
	eta: eta,
	ETH: ETH,
	eth: eth,
	Euml: Euml,
	euml: euml,
	euro: euro,
	excl: excl,
	exist: exist,
	Exists: Exists,
	expectation: expectation,
	exponentiale: exponentiale,
	ExponentialE: ExponentialE,
	fallingdotseq: fallingdotseq,
	Fcy: Fcy,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	Ffr: Ffr,
	ffr: ffr,
	filig: filig,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	Fopf: Fopf,
	fopf: fopf,
	forall: forall,
	ForAll: ForAll,
	fork: fork,
	forkv: forkv,
	Fouriertrf: Fouriertrf,
	fpartint: fpartint,
	frac12: frac12,
	frac13: frac13,
	frac14: frac14,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac34: frac34,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	Fscr: Fscr,
	gacute: gacute,
	Gamma: Gamma,
	gamma: gamma,
	Gammad: Gammad,
	gammad: gammad,
	gap: gap,
	Gbreve: Gbreve,
	gbreve: gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	gcirc: gcirc,
	Gcy: Gcy,
	gcy: gcy,
	Gdot: Gdot,
	gdot: gdot,
	ge: ge,
	gE: gE,
	gEl: gEl,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	gescc: gescc,
	ges: ges,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	Gfr: Gfr,
	gfr: gfr,
	gg: gg,
	Gg: Gg,
	ggg: ggg,
	gimel: gimel,
	GJcy: GJcy,
	gjcy: gjcy,
	gla: gla,
	gl: gl,
	glE: glE,
	glj: glj,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gnE: gnE,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	Gopf: Gopf,
	gopf: gopf,
	grave: grave,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	gtcc: gtcc,
	gtcir: gtcir,
	gt: gt$1,
	GT: GT,
	Gt: Gt,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	Hacek: Hacek,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	HARDcy: HARDcy,
	hardcy: hardcy,
	harrcir: harrcir,
	harr: harr,
	hArr: hArr,
	harrw: harrw,
	Hat: Hat,
	hbar: hbar,
	Hcirc: Hcirc,
	hcirc: hcirc,
	hearts: hearts,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	Hopf: Hopf,
	horbar: horbar,
	HorizontalLine: HorizontalLine,
	hscr: hscr,
	Hscr: Hscr,
	hslash: hslash,
	Hstrok: Hstrok,
	hstrok: hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	hybull: hybull,
	hyphen: hyphen,
	Iacute: Iacute,
	iacute: iacute,
	ic: ic,
	Icirc: Icirc,
	icirc: icirc,
	Icy: Icy,
	icy: icy,
	Idot: Idot,
	IEcy: IEcy,
	iecy: iecy,
	iexcl: iexcl,
	iff: iff,
	ifr: ifr,
	Ifr: Ifr,
	Igrave: Igrave,
	igrave: igrave,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	IJlig: IJlig,
	ijlig: ijlig,
	Imacr: Imacr,
	imacr: imacr,
	image: image,
	ImaginaryI: ImaginaryI,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	Im: Im,
	imof: imof,
	imped: imped,
	Implies: Implies,
	incare: incare,
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	intcal: intcal,
	int: int,
	Int: Int,
	integers: integers,
	Integral: Integral,
	intercal: intercal,
	Intersection: Intersection,
	intlarhk: intlarhk,
	intprod: intprod,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	IOcy: IOcy,
	iocy: iocy,
	Iogon: Iogon,
	iogon: iogon,
	Iopf: Iopf,
	iopf: iopf,
	Iota: Iota,
	iota: iota,
	iprod: iprod,
	iquest: iquest,
	iscr: iscr,
	Iscr: Iscr,
	isin: isin,
	isindot: isindot,
	isinE: isinE,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	Itilde: Itilde,
	itilde: itilde,
	Iukcy: Iukcy,
	iukcy: iukcy,
	Iuml: Iuml,
	iuml: iuml,
	Jcirc: Jcirc,
	jcirc: jcirc,
	Jcy: Jcy,
	jcy: jcy,
	Jfr: Jfr,
	jfr: jfr,
	jmath: jmath,
	Jopf: Jopf,
	jopf: jopf,
	Jscr: Jscr,
	jscr: jscr,
	Jsercy: Jsercy,
	jsercy: jsercy,
	Jukcy: Jukcy,
	jukcy: jukcy,
	Kappa: Kappa,
	kappa: kappa,
	kappav: kappav,
	Kcedil: Kcedil,
	kcedil: kcedil,
	Kcy: Kcy,
	kcy: kcy,
	Kfr: Kfr,
	kfr: kfr,
	kgreen: kgreen,
	KHcy: KHcy,
	khcy: khcy,
	KJcy: KJcy,
	kjcy: kjcy,
	Kopf: Kopf,
	kopf: kopf,
	Kscr: Kscr,
	kscr: kscr,
	lAarr: lAarr,
	Lacute: Lacute,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	Lambda: Lambda,
	lambda: lambda,
	lang: lang,
	Lang: Lang,
	langd: langd,
	langle: langle,
	lap: lap,
	Laplacetrf: Laplacetrf,
	laquo: laquo,
	larrb: larrb,
	larrbfs: larrbfs,
	larr: larr,
	Larr: Larr,
	lArr: lArr,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	latail: latail,
	lAtail: lAtail,
	lat: lat,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lBarr: lBarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	Lcaron: Lcaron,
	lcaron: lcaron,
	Lcedil: Lcedil,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	Lcy: Lcy,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	lE: lE,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrowBar: LeftArrowBar,
	leftarrow: leftarrow,
	LeftArrow: LeftArrow,
	Leftarrow: Leftarrow,
	LeftArrowRightArrow: LeftArrowRightArrow,
	leftarrowtail: leftarrowtail,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftDownVector: LeftDownVector,
	LeftFloor: LeftFloor,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	LeftRightArrow: LeftRightArrow,
	Leftrightarrow: Leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	LeftRightVector: LeftRightVector,
	LeftTeeArrow: LeftTeeArrow,
	LeftTee: LeftTee,
	LeftTeeVector: LeftTeeVector,
	leftthreetimes: leftthreetimes,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangle: LeftTriangle,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftUpVector: LeftUpVector,
	LeftVectorBar: LeftVectorBar,
	LeftVector: LeftVector,
	lEg: lEg,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	lescc: lescc,
	les: les,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	lessgtr: lessgtr,
	LessLess: LessLess,
	lesssim: lesssim,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	lfisht: lfisht,
	lfloor: lfloor,
	Lfr: Lfr,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lHar: lHar,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	LJcy: LJcy,
	ljcy: ljcy,
	llarr: llarr,
	ll: ll,
	Ll: Ll,
	llcorner: llcorner,
	Lleftarrow: Lleftarrow,
	llhard: llhard,
	lltri: lltri,
	Lmidot: Lmidot,
	lmidot: lmidot,
	lmoustache: lmoustache,
	lmoust: lmoust,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lnE: lnE,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	LongLeftArrow: LongLeftArrow,
	Longleftarrow: Longleftarrow,
	longleftrightarrow: longleftrightarrow,
	LongLeftRightArrow: LongLeftRightArrow,
	Longleftrightarrow: Longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	LongRightArrow: LongRightArrow,
	Longrightarrow: Longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	Lopf: Lopf,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	Lscr: Lscr,
	lsh: lsh,
	Lsh: Lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	Lstrok: Lstrok,
	lstrok: lstrok,
	ltcc: ltcc,
	ltcir: ltcir,
	lt: lt$1,
	LT: LT,
	Lt: Lt,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	ltrPar: ltrPar,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	macr: macr,
	male: male,
	malt: malt,
	maltese: maltese,
	map: map$1,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	Mcy: Mcy,
	mcy: mcy,
	mdash: mdash,
	mDDot: mDDot,
	measuredangle: measuredangle,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	mfr: mfr,
	mho: mho,
	micro: micro,
	midast: midast,
	midcir: midcir,
	mid: mid,
	middot: middot,
	minusb: minusb,
	minus: minus,
	minusd: minusd,
	minusdu: minusdu,
	MinusPlus: MinusPlus,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	Mopf: Mopf,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	Mscr: Mscr,
	mstpos: mstpos,
	Mu: Mu,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nabla: nabla,
	Nacute: Nacute,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natural: natural,
	naturals: naturals,
	natur: natur,
	nbsp: nbsp,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	Ncaron: Ncaron,
	ncaron: ncaron,
	Ncedil: Ncedil,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	Ncy: Ncy,
	ncy: ncy,
	ndash: ndash,
	nearhk: nearhk,
	nearr: nearr,
	neArr: neArr,
	nearrow: nearrow,
	ne: ne,
	nedot: nedot,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	nexist: nexist,
	nexists: nexists,
	Nfr: Nfr,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	nGg: nGg,
	ngsim: ngsim,
	nGt: nGt,
	ngt: ngt,
	ngtr: ngtr,
	nGtv: nGtv,
	nharr: nharr,
	nhArr: nhArr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	NJcy: NJcy,
	njcy: njcy,
	nlarr: nlarr,
	nlArr: nlArr,
	nldr: nldr,
	nlE: nlE,
	nle: nle,
	nleftarrow: nleftarrow,
	nLeftarrow: nLeftarrow,
	nleftrightarrow: nleftrightarrow,
	nLeftrightarrow: nLeftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nLl: nLl,
	nlsim: nlsim,
	nLt: nLt,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nLtv: nLtv,
	nmid: nmid,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	nopf: nopf,
	Nopf: Nopf,
	Not: Not,
	not: not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	notin: notin,
	notindot: notindot,
	notinE: notinE,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	nparallel: nparallel,
	npar: npar,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	nprec: nprec,
	npreceq: npreceq,
	npre: npre,
	nrarrc: nrarrc,
	nrarr: nrarr,
	nrArr: nrArr,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nRightarrow: nRightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	Nscr: Nscr,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	Ntilde: Ntilde,
	ntilde: ntilde,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	Nu: Nu,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvap: nvap,
	nvdash: nvdash,
	nvDash: nvDash,
	nVdash: nVdash,
	nVDash: nVDash,
	nvge: nvge,
	nvgt: nvgt,
	nvHarr: nvHarr,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwArr: nwArr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	Oacute: Oacute,
	oacute: oacute,
	oast: oast,
	Ocirc: Ocirc,
	ocirc: ocirc,
	ocir: ocir,
	Ocy: Ocy,
	ocy: ocy,
	odash: odash,
	Odblac: Odblac,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	OElig: OElig,
	oelig: oelig,
	ofcir: ofcir,
	Ofr: Ofr,
	ofr: ofr,
	ogon: ogon,
	Ograve: Ograve,
	ograve: ograve,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	Omacr: Omacr,
	omacr: omacr,
	Omega: Omega,
	omega: omega,
	Omicron: Omicron,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	Oopf: Oopf,
	oopf: oopf,
	opar: opar,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	operp: operp,
	oplus: oplus,
	orarr: orarr,
	Or: Or,
	or: or,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf,
	ordm: ordm,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oS: oS,
	Oscr: Oscr,
	oscr: oscr,
	Oslash: Oslash,
	oslash: oslash,
	osol: osol,
	Otilde: Otilde,
	otilde: otilde,
	otimesas: otimesas,
	Otimes: Otimes,
	otimes: otimes,
	Ouml: Ouml,
	ouml: ouml,
	ovbar: ovbar,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	para: para,
	parallel: parallel,
	par: par,
	parsim: parsim,
	parsl: parsl,
	part: part,
	PartialD: PartialD,
	Pcy: Pcy,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	Pfr: Pfr,
	pfr: pfr,
	Phi: Phi,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	Pi: Pi,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plus: plus,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	PlusMinus: PlusMinus,
	plusmn: plusmn,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	Poincareplane: Poincareplane,
	pointint: pointint,
	popf: popf,
	Popf: Popf,
	pound: pound,
	prap: prap,
	Pr: Pr,
	pr: pr,
	prcue: prcue,
	precapprox: precapprox,
	prec: prec,
	preccurlyeq: preccurlyeq,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	pre: pre,
	prE: prE,
	precsim: precsim,
	prime: prime,
	Prime: Prime,
	primes: primes,
	prnap: prnap,
	prnE: prnE,
	prnsim: prnsim,
	prod: prod,
	Product: Product,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	Proportional: Proportional,
	Proportion: Proportion,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	Pscr: Pscr,
	pscr: pscr,
	Psi: Psi,
	psi: psi,
	puncsp: puncsp,
	Qfr: Qfr,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	Qopf: Qopf,
	qprime: qprime,
	Qscr: Qscr,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quot: quot$1,
	QUOT: QUOT,
	rAarr: rAarr,
	race: race,
	Racute: Racute,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	Rang: Rang,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raquo: raquo,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarr: rarr,
	Rarr: Rarr,
	rArr: rArr,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	Rarrtl: Rarrtl,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	rAtail: rAtail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rBarr: rBarr,
	RBarr: RBarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	Rcaron: Rcaron,
	rcaron: rcaron,
	Rcedil: Rcedil,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	Rcy: Rcy,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	Re: Re,
	rect: rect,
	reg: reg,
	REG: REG,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	Rfr: Rfr,
	rHar: rHar,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	Rho: Rho,
	rho: rho,
	rhov: rhov,
	RightAngleBracket: RightAngleBracket,
	RightArrowBar: RightArrowBar,
	rightarrow: rightarrow,
	RightArrow: RightArrow,
	Rightarrow: Rightarrow,
	RightArrowLeftArrow: RightArrowLeftArrow,
	rightarrowtail: rightarrowtail,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVectorBar: RightDownVectorBar,
	RightDownVector: RightDownVector,
	RightFloor: RightFloor,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	RightTeeArrow: RightTeeArrow,
	RightTee: RightTee,
	RightTeeVector: RightTeeVector,
	rightthreetimes: rightthreetimes,
	RightTriangleBar: RightTriangleBar,
	RightTriangle: RightTriangle,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVectorBar: RightUpVectorBar,
	RightUpVector: RightUpVector,
	RightVectorBar: RightVectorBar,
	RightVector: RightVector,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoustache: rmoustache,
	rmoust: rmoust,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	Ropf: Ropf,
	roplus: roplus,
	rotimes: rotimes,
	RoundImplies: RoundImplies,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	Rrightarrow: Rrightarrow,
	rsaquo: rsaquo,
	rscr: rscr,
	Rscr: Rscr,
	rsh: rsh,
	Rsh: Rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	RuleDelayed: RuleDelayed,
	ruluhar: ruluhar,
	rx: rx,
	Sacute: Sacute,
	sacute: sacute,
	sbquo: sbquo,
	scap: scap,
	Scaron: Scaron,
	scaron: scaron,
	Sc: Sc,
	sc: sc,
	sccue: sccue,
	sce: sce,
	scE: scE,
	Scedil: Scedil,
	scedil: scedil,
	Scirc: Scirc,
	scirc: scirc,
	scnap: scnap,
	scnE: scnE,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	Scy: Scy,
	scy: scy,
	sdotb: sdotb,
	sdot: sdot,
	sdote: sdote,
	searhk: searhk,
	searr: searr,
	seArr: seArr,
	searrow: searrow,
	sect: sect,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	Sfr: Sfr,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	SHCHcy: SHCHcy,
	shchcy: shchcy,
	SHcy: SHcy,
	shcy: shcy,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	shortmid: shortmid,
	shortparallel: shortparallel,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	shy: shy,
	Sigma: Sigma,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	SmallCircle: SmallCircle,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	SOFTcy: SOFTcy,
	softcy: softcy,
	solbar: solbar,
	solb: solb,
	sol: sol,
	Sopf: Sopf,
	sopf: sopf,
	spades: spades,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	Sqrt: Sqrt,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	square: square,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	squarf: squarf,
	squ: squ,
	squf: squf,
	srarr: srarr,
	Sscr: Sscr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	Star: Star,
	star: star,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	Sub: Sub,
	subdot: subdot,
	subE: subE,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	Subset: Subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	SubsetEqual: SubsetEqual,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succapprox: succapprox,
	succ: succ,
	succcurlyeq: succcurlyeq,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	SuchThat: SuchThat,
	sum: sum,
	Sum: Sum,
	sung: sung,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	sup: sup,
	Sup: Sup,
	supdot: supdot,
	supdsub: supdsub,
	supE: supE,
	supe: supe,
	supedot: supedot,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	Supset: Supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swarhk: swarhk,
	swarr: swarr,
	swArr: swArr,
	swarrow: swarrow,
	swnwar: swnwar,
	szlig: szlig,
	Tab: Tab,
	target: target,
	Tau: Tau,
	tau: tau,
	tbrk: tbrk,
	Tcaron: Tcaron,
	tcaron: tcaron,
	Tcedil: Tcedil,
	tcedil: tcedil,
	Tcy: Tcy,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	Tfr: Tfr,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	Therefore: Therefore,
	Theta: Theta,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	THORN: THORN,
	thorn: thorn,
	tilde: tilde,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	timesbar: timesbar,
	timesb: timesb,
	times: times$1,
	timesd: timesd,
	tint: tint,
	toea: toea,
	topbot: topbot,
	topcir: topcir,
	top: top,
	Topf: Topf,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	TRADE: TRADE,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	TripleDot: TripleDot,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	Tscr: Tscr,
	tscr: tscr,
	TScy: TScy,
	tscy: tscy,
	TSHcy: TSHcy,
	tshcy: tshcy,
	Tstrok: Tstrok,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	Uacute: Uacute,
	uacute: uacute,
	uarr: uarr,
	Uarr: Uarr,
	uArr: uArr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	ubrcy: ubrcy,
	Ubreve: Ubreve,
	ubreve: ubreve,
	Ucirc: Ucirc,
	ucirc: ucirc,
	Ucy: Ucy,
	ucy: ucy,
	udarr: udarr,
	Udblac: Udblac,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	Ufr: Ufr,
	ufr: ufr,
	Ugrave: Ugrave,
	ugrave: ugrave,
	uHar: uHar,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	Umacr: Umacr,
	umacr: umacr,
	uml: uml,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	uogon: uogon,
	Uopf: Uopf,
	uopf: uopf,
	UpArrowBar: UpArrowBar,
	uparrow: uparrow,
	UpArrow: UpArrow,
	Uparrow: Uparrow,
	UpArrowDownArrow: UpArrowDownArrow,
	updownarrow: updownarrow,
	UpDownArrow: UpDownArrow,
	Updownarrow: Updownarrow,
	UpEquilibrium: UpEquilibrium,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	upsi: upsi,
	Upsi: Upsi,
	upsih: upsih,
	Upsilon: Upsilon,
	upsilon: upsilon,
	UpTeeArrow: UpTeeArrow,
	UpTee: UpTee,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	Uring: Uring,
	uring: uring,
	urtri: urtri,
	Uscr: Uscr,
	uscr: uscr,
	utdot: utdot,
	Utilde: Utilde,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	Uuml: Uuml,
	uuml: uuml,
	uwangle: uwangle,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	vArr: vArr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vBar: vBar,
	Vbar: Vbar,
	vBarv: vBarv,
	Vcy: Vcy,
	vcy: vcy,
	vdash: vdash,
	vDash: vDash,
	Vdash: Vdash,
	VDash: VDash,
	Vdashl: Vdashl,
	veebar: veebar,
	vee: vee,
	Vee: Vee,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	Verbar: Verbar,
	vert: vert,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	Vopf: Vopf,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	Vscr: Vscr,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	Vvdash: Vvdash,
	vzigzag: vzigzag,
	Wcirc: Wcirc,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	Wedge: Wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	Wfr: Wfr,
	wfr: wfr,
	Wopf: Wopf,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	Wscr: Wscr,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	Xfr: Xfr,
	xfr: xfr,
	xharr: xharr,
	xhArr: xhArr,
	Xi: Xi,
	xi: xi,
	xlarr: xlarr,
	xlArr: xlArr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	Xopf: Xopf,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrarr: xrarr,
	xrArr: xrArr,
	Xscr: Xscr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	Yacute: Yacute,
	yacute: yacute,
	YAcy: YAcy,
	yacy: yacy,
	Ycirc: Ycirc,
	ycirc: ycirc,
	Ycy: Ycy,
	ycy: ycy,
	yen: yen,
	Yfr: Yfr,
	yfr: yfr,
	YIcy: YIcy,
	yicy: yicy,
	Yopf: Yopf,
	yopf: yopf,
	Yscr: Yscr,
	yscr: yscr,
	YUcy: YUcy,
	yucy: yucy,
	yuml: yuml,
	Yuml: Yuml,
	Zacute: Zacute,
	zacute: zacute,
	Zcaron: Zcaron,
	zcaron: zcaron,
	Zcy: Zcy,
	zcy: zcy,
	Zdot: Zdot,
	zdot: zdot,
	zeetrf: zeetrf,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	zeta: zeta,
	zfr: zfr,
	Zfr: Zfr,
	ZHcy: ZHcy,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	Zopf: Zopf,
	Zscr: Zscr,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj,
	default: entitiesJSON
});

var require$$0 = ( xml && xmlJSON ) || xml;

var require$$1 = ( entities && entitiesJSON ) || entities;

var inverseXML = getInverseObj(require$$0);
var xmlReplacer = getInverseReplacer(inverseXML);

var XML = getInverse(inverseXML, xmlReplacer);

var inverseHTML = getInverseObj(require$$1);
var htmlReplacer = getInverseReplacer(inverseHTML);

var HTML = getInverse(inverseHTML, htmlReplacer);

function getInverseObj(obj){
	return Object.keys(obj).sort().reduce(function(inverse, name){
		inverse[obj[name]] = "&" + name + ";";
		return inverse;
	}, {});
}

function getInverseReplacer(inverse){
	var single = [],
	    multiple = [];

	Object.keys(inverse).forEach(function(k){
		if(k.length === 1){
			single.push("\\" + k);
		} else {
			multiple.push(k);
		}
	});

	
	multiple.unshift("[" + single.join("") + "]");

	return new RegExp(multiple.join("|"), "g");
}

var re_nonASCII = /[^\0-\x7F]/g;
var re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function singleCharReplacer(c){
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer(c){
	
	var high = c.charCodeAt(0);
	var low  = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re){
	function func(name){
		return inverse[name];
	}

	return function(data){
		return data
				.replace(re, func)
				.replace(re_astralSymbols, astralReplacer)
				.replace(re_nonASCII, singleCharReplacer);
	};
}

var re_xmlChars = getInverseReplacer(inverseXML);

function escapeXML(data){
	return data
			.replace(re_xmlChars, singleCharReplacer)
			.replace(re_astralSymbols, astralReplacer)
			.replace(re_nonASCII, singleCharReplacer);
}

var escape = escapeXML;

var encode = {
	XML: XML,
	HTML: HTML,
	escape: escape
};

var decode = {
	"0": 65533,
	"128": 8364,
	"130": 8218,
	"131": 402,
	"132": 8222,
	"133": 8230,
	"134": 8224,
	"135": 8225,
	"136": 710,
	"137": 8240,
	"138": 352,
	"139": 8249,
	"140": 338,
	"142": 381,
	"145": 8216,
	"146": 8217,
	"147": 8220,
	"148": 8221,
	"149": 8226,
	"150": 8211,
	"151": 8212,
	"152": 732,
	"153": 8482,
	"154": 353,
	"155": 8250,
	"156": 339,
	"158": 382,
	"159": 376
};

var decode$1 = Object.freeze({
	default: decode
});

var decodeMap = ( decode$1 && decode ) || decode$1;

var decode_codepoint = decodeCodePoint;


function decodeCodePoint(codePoint){

	if((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF){
		return "\uFFFD";
	}

	if(codePoint in decodeMap){
		codePoint = decodeMap[codePoint];
	}

	var output = "";

	if(codePoint > 0xFFFF){
		codePoint -= 0x10000;
		output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
		codePoint = 0xDC00 | codePoint & 0x3FF;
	}

	output += String.fromCharCode(codePoint);
	return output;
}

var Aacute$1 = "Á";
var aacute$1 = "á";
var Acirc$1 = "Â";
var acirc$1 = "â";
var acute$1 = "´";
var AElig$1 = "Æ";
var aelig$1 = "æ";
var Agrave$1 = "À";
var agrave$1 = "à";
var amp$2 = "&";
var AMP$1 = "&";
var Aring$1 = "Å";
var aring$1 = "å";
var Atilde$1 = "Ã";
var atilde$1 = "ã";
var Auml$1 = "Ä";
var auml$1 = "ä";
var brvbar$1 = "¦";
var Ccedil$1 = "Ç";
var ccedil$1 = "ç";
var cedil$1 = "¸";
var cent$1 = "¢";
var copy$1 = "©";
var COPY$1 = "©";
var curren$1 = "¤";
var deg$1 = "°";
var divide$1 = "÷";
var Eacute$1 = "É";
var eacute$1 = "é";
var Ecirc$1 = "Ê";
var ecirc$1 = "ê";
var Egrave$1 = "È";
var egrave$1 = "è";
var ETH$1 = "Ð";
var eth$1 = "ð";
var Euml$1 = "Ë";
var euml$1 = "ë";
var frac12$1 = "½";
var frac14$1 = "¼";
var frac34$1 = "¾";
var gt$2 = ">";
var GT$1 = ">";
var Iacute$1 = "Í";
var iacute$1 = "í";
var Icirc$1 = "Î";
var icirc$1 = "î";
var iexcl$1 = "¡";
var Igrave$1 = "Ì";
var igrave$1 = "ì";
var iquest$1 = "¿";
var Iuml$1 = "Ï";
var iuml$1 = "ï";
var laquo$1 = "«";
var lt$2 = "<";
var LT$1 = "<";
var macr$1 = "¯";
var micro$1 = "µ";
var middot$1 = "·";
var nbsp$1 = " ";
var not$1 = "¬";
var Ntilde$1 = "Ñ";
var ntilde$1 = "ñ";
var Oacute$1 = "Ó";
var oacute$1 = "ó";
var Ocirc$1 = "Ô";
var ocirc$1 = "ô";
var Ograve$1 = "Ò";
var ograve$1 = "ò";
var ordf$1 = "ª";
var ordm$1 = "º";
var Oslash$1 = "Ø";
var oslash$1 = "ø";
var Otilde$1 = "Õ";
var otilde$1 = "õ";
var Ouml$1 = "Ö";
var ouml$1 = "ö";
var para$1 = "¶";
var plusmn$1 = "±";
var pound$1 = "£";
var quot$2 = "\"";
var QUOT$1 = "\"";
var raquo$1 = "»";
var reg$1 = "®";
var REG$1 = "®";
var sect$1 = "§";
var shy$1 = "­";
var sup1$1 = "¹";
var sup2$1 = "²";
var sup3$1 = "³";
var szlig$1 = "ß";
var THORN$1 = "Þ";
var thorn$1 = "þ";
var times$1$1 = "×";
var Uacute$1 = "Ú";
var uacute$1 = "ú";
var Ucirc$1 = "Û";
var ucirc$1 = "û";
var Ugrave$1 = "Ù";
var ugrave$1 = "ù";
var uml$1 = "¨";
var Uuml$1 = "Ü";
var uuml$1 = "ü";
var Yacute$1 = "Ý";
var yacute$1 = "ý";
var yen$1 = "¥";
var yuml$1 = "ÿ";
var legacyJSON = {
	Aacute: Aacute$1,
	aacute: aacute$1,
	Acirc: Acirc$1,
	acirc: acirc$1,
	acute: acute$1,
	AElig: AElig$1,
	aelig: aelig$1,
	Agrave: Agrave$1,
	agrave: agrave$1,
	amp: amp$2,
	AMP: AMP$1,
	Aring: Aring$1,
	aring: aring$1,
	Atilde: Atilde$1,
	atilde: atilde$1,
	Auml: Auml$1,
	auml: auml$1,
	brvbar: brvbar$1,
	Ccedil: Ccedil$1,
	ccedil: ccedil$1,
	cedil: cedil$1,
	cent: cent$1,
	copy: copy$1,
	COPY: COPY$1,
	curren: curren$1,
	deg: deg$1,
	divide: divide$1,
	Eacute: Eacute$1,
	eacute: eacute$1,
	Ecirc: Ecirc$1,
	ecirc: ecirc$1,
	Egrave: Egrave$1,
	egrave: egrave$1,
	ETH: ETH$1,
	eth: eth$1,
	Euml: Euml$1,
	euml: euml$1,
	frac12: frac12$1,
	frac14: frac14$1,
	frac34: frac34$1,
	gt: gt$2,
	GT: GT$1,
	Iacute: Iacute$1,
	iacute: iacute$1,
	Icirc: Icirc$1,
	icirc: icirc$1,
	iexcl: iexcl$1,
	Igrave: Igrave$1,
	igrave: igrave$1,
	iquest: iquest$1,
	Iuml: Iuml$1,
	iuml: iuml$1,
	laquo: laquo$1,
	lt: lt$2,
	LT: LT$1,
	macr: macr$1,
	micro: micro$1,
	middot: middot$1,
	nbsp: nbsp$1,
	not: not$1,
	Ntilde: Ntilde$1,
	ntilde: ntilde$1,
	Oacute: Oacute$1,
	oacute: oacute$1,
	Ocirc: Ocirc$1,
	ocirc: ocirc$1,
	Ograve: Ograve$1,
	ograve: ograve$1,
	ordf: ordf$1,
	ordm: ordm$1,
	Oslash: Oslash$1,
	oslash: oslash$1,
	Otilde: Otilde$1,
	otilde: otilde$1,
	Ouml: Ouml$1,
	ouml: ouml$1,
	para: para$1,
	plusmn: plusmn$1,
	pound: pound$1,
	quot: quot$2,
	QUOT: QUOT$1,
	raquo: raquo$1,
	reg: reg$1,
	REG: REG$1,
	sect: sect$1,
	shy: shy$1,
	sup1: sup1$1,
	sup2: sup2$1,
	sup3: sup3$1,
	szlig: szlig$1,
	THORN: THORN$1,
	thorn: thorn$1,
	times: times$1$1,
	Uacute: Uacute$1,
	uacute: uacute$1,
	Ucirc: Ucirc$1,
	ucirc: ucirc$1,
	Ugrave: Ugrave$1,
	ugrave: ugrave$1,
	uml: uml$1,
	Uuml: Uuml$1,
	uuml: uuml$1,
	Yacute: Yacute$1,
	yacute: yacute$1,
	yen: yen$1,
	yuml: yuml$1
};

var _entities = {
  encodeXML: encode.XML,
  decodeCodepoint: decode_codepoint,
  entitiesJSON,
  legacyJSON,
  xmlJSON
};

const booleanAttributes = {
  __proto__: null,
  allowfullscreen: true,
  async: true,
  autofocus: true,
  autoplay: true,
  checked: true,
  controls: true,
  default: true,
  defer: true,
  disabled: true,
  hidden: true,
  ismap: true,
  loop: true,
  multiple: true,
  muted: true,
  open: true,
  readonly: true,
  required: true,
  reversed: true,
  scoped: true,
  seamless: true,
  selected: true,
  typemustmatch: true
};

const unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

const singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};


class DomUtils {

  isTag(elem) {
    return index.isTag(elem)
  }

  removeElement(elem){
    if(elem.prev) elem.prev.next = elem.next;
    if(elem.next) elem.next.prev = elem.prev;
    if(elem.parent){
      var childs = elem.parent.childNodes;
      let pos = childs.lastIndexOf(elem);
      if (pos < 0) throw new Error('Invalid state')
      childs.splice(pos, 1);
      elem.parent = null;
    }
  }

  replaceElement(elem, replacement){
    if (replacement.parent) this.removeElement(replacement);
    var prev = replacement.prev = elem.prev;
    if(prev){
      prev.next = replacement;
    }

    var next = replacement.next = elem.next;
    if(next){
      next.prev = replacement;
    }

    var parent = replacement.parent = elem.parent;
    if(parent){
      var childs = parent.childNodes;
      let pos = childs.lastIndexOf(elem);
      if (pos < 0) throw new Error('Invalid state')
      childs[pos] = replacement;
    }
  }

  appendChild(elem, child){
    if (child.parent) this.removeElement(child);
    child.parent = elem;

    if(elem.childNodes.push(child) !== 1){
      var sibling = elem.childNodes[elem.childNodes.length - 2];
      sibling.next = child;
      child.prev = sibling;
      child.next = null;
    }
  }

  append(elem, next){
    if (next.parent) this.removeElement(next);
    var parent = elem.parent,
      currNext = elem.next;

    next.next = currNext;
    next.prev = elem;
    elem.next = next;
    next.parent = parent;

    if(currNext){
      currNext.prev = next;
      if(parent){
        var childs = parent.childNodes;
        let pos = childs.lastIndexOf(currNext);
        if (pos < 0) throw new Error('Invalid state')
        childs.splice(pos, 0, next);
      }
    } else if(parent){
      parent.childNodes.push(next);
    }
  }

  prepend(elem, prev){
    if (prev.parent) this.removeElement(prev);
    var parent = elem.parent;
    if(parent){
      var childs = parent.childNodes;
      let pos = childs.lastIndexOf(elem);
      if (pos < 0) throw new Error('Invalid state')
      childs.splice(pos, 0, prev);
    }

    if(elem.prev){
      elem.prev.next = prev;
    }

    prev.parent = parent;
    prev.prev = elem.prev;
    prev.next = elem;
    elem.prev = prev;
  }


  filter(test, element, recurse, limit){
    if(!Array.isArray(element)) element = [element];

    if(typeof limit !== "number" || !isFinite(limit)){
      limit = Infinity;
    }
    return this.find(test, element, recurse !== false, limit);
  }

  find(test, elems, recurse, limit){
    var result = [], childs;

    for(var i = 0, j = elems.length; i < j; i++){
      if(test(elems[i])){
        result.push(elems[i]);
        if(--limit <= 0) break;
      }

      childs = this.getChildren(elems[i]);
      if(recurse && childs && childs.length > 0){
        childs = this.find(test, childs, recurse, limit);
        result = result.concat(childs);
        limit -= childs.length;
        if(limit <= 0) break;
      }
    }

    return result;
  }

  findOneChild(test, elems){
    for(var i = 0, l = elems.length; i < l; i++){
      if(test(elems[i])) return elems[i];
    }

    return null;
  }

  findOne(test, elems){
    var elem = null;

    for(var i = 0, l = elems.length; i < l && !elem; i++){
      const child = elems[i];
      if(!this.isTag(child)){
        continue;
      } else if(test(child)){
        elem = child;
      } else {
        const childNodes = this.getChildren(child);
        if (childNodes.length > 0) {
          elem = this.findOne(test, childNodes);
        }
      }
    }

    return elem;
  }

  existsOne(test, elems){
    for(var i = 0, l = elems.length; i < l; i++){
      const elem = elems[i];
      
      if (!this.isTag(elem)) continue
      
      if (test(elem)) return true
      
      const childNodes = this.getChildren(elem);
      if (childNodes.length > 0 && this.existsOne(test, childNodes)) return true
    }
    return false;
  }

  findAll(test, elems){
    var result = [];
    for(var i = 0, j = elems.length; i < j; i++){
      const elem = elems[i];
      if(!this.isTag(elem)) continue;
      if(test(elem)) result.push(elem);
      const childNodes = this.getChildren(elem);
      if(childNodes.length > 0){
        result = result.concat(this.findAll(test, childNodes));
      }
    }
    return result;
  }

  getAttributes(el) {
    let attribs = el.getAttributes();
    
    
    if (attribs instanceof Map) {
      return Array.from(attribs)
    } else if (attribs && attribs.forEach) {
      let res = [];
      attribs.forEach((val, key) => {
        res.push([key, val]);
      });
      return res
    } else {
      return []
    }
  }

  formatAttribs(el, opts = {}) {
    let output = [];
    const attributes = this.getAttributes(el);
    attributes.forEach(([key, value]) => {
      if (!value && booleanAttributes[key]) {
        output.push(key);
      } else {
        output.push(key + '="' + (opts.decodeEntities ? _entities.encodeXML(value) : value) + '"');
      }
    });
    return output.join(' ')
  }

  render(dom, opts) {
    if (!Array.isArray(dom)) dom = [dom];
    opts = opts || {};
    let output = [];
    for(var i = 0; i < dom.length; i++){
      let elem = dom[i];
      if (elem.type === 'root' || elem.type === 'document') {
        output.push(this.render(this.getChildren(elem), opts));
      } else if (index.isTag(elem)) {
        output.push(this.renderTag(elem, opts));
      } else if (elem.type === index.Directive) {
        output.push(this.renderDirective(elem));
      } else if (elem.type === index.Comment) {
        output.push(this.renderComment(elem));
      } else if (elem.type === index.CDATA) {
        output.push(this.renderCdata(elem));
      } else {
        output.push(this.renderText(elem, opts));
      }
    }
    return output.join('')
  }

  renderTag(elem, opts) {
    const name = this.getName(elem);
    if (name === "svg") opts = {decodeEntities: opts.decodeEntities, xmlMode: true};
    let tag = '<' + name;
    let attribs = this.formatAttribs(elem, opts);
    if (attribs) {
      tag += ' ' + attribs;
    }
    const childNodes = this.getChildren(elem);
    if (opts.xmlMode && childNodes.length === 0) {
      tag += '/>';
    } else {
      tag += '>';
      if (childNodes.length > 0) {
        tag += this.render(childNodes, opts);
      }
      if (!singleTag[name] || opts.xmlMode) {
        tag += '</' + name + '>';
      }
    }
    return tag
  }

  renderDirective(elem) {
    return '<' + this.getData(elem) + '>'
  }

  renderText(elem, opts) {
    let text = this.getText(elem);
    if (opts.decodeEntities) {
      const parent = this.getParent(elem);
      if (!(parent && this.getName(parent) in unencodedElements)) {
        text = _entities.encodeXML(text);
      }
    }
    return text
  }

  renderCdata(elem) {
    const childNodes = this.getChildren(elem);
    return '<![CDATA[' + this.getData(childNodes[0]) + ']]>'
  }

  renderComment(elem) {
    return '<!--' + this.getData(elem) + '-->'
  }

  getInnerHTML(elem, opts){
    const childNodes = this.getChildren(elem);
    return childNodes.map((child) => {
      return this.render(child, opts);
    }).join("")
  }

  getOuterHTML(elem, opts) {
    return this.render(elem, opts)
  }

  getData(elem) {
    return elem.data
  }

  getText(elem){
    if(Array.isArray(elem)) return elem.map(e => this.getText(e)).join("");
    switch(elem.type) {
      case index.Tag:
      case index.Script:
      case index.Style:
        return this.getText(this.getChildren(elem))
      case index.Text:
      case index.Comment:
      case index.CDATA:
        return elem.data
      default:
        return ""
    }
  }



  getChildren(elem) {
    return elem.childNodes;
  }

  getParent(elem){
    return elem.parent;
  }

  getSiblings(elem){
    var parent = this.getParent(elem);
    return parent ? this.getChildren(parent) : [elem];
  }

  getAttributeValue(elem, name){
    return elem.getAttribute(name);
  }

  hasAttrib(elem, name){
    return elem.hasAttribute(name);
  }

  getName(elem){
    return elem.name
  }

  getNameWithoutNS(elem){
    return elem.nameWithoutNS
  }

}

const domUtils = new DomUtils();
domUtils.DomUtils = DomUtils;

var index$2 = {
	trueFunc: function trueFunc(){
		return true;
	},
	falseFunc: function falseFunc(){
		return false;
	}
};

var index$3 = parse;

var re_name = /^(?:\\.|[\w\-\u00c0-\uFFFF])+/;
var re_escape = /\\([\da-f]{1,6}\s?|(\s)|.)/ig;
var re_attr = /^\s*((?:\\.|[\w\u00c0-\uFFFF\-])+)\s*(?:(\S?)=\s*(?:(['"])(.*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF\-])*)|)|)\s*(i)?\]/;

var actionTypes = {
	__proto__: null,
	"undefined": "exists",
	"":  "equals",
	"~": "element",
	"^": "start",
	"$": "end",
	"*": "any",
	"!": "not",
	"|": "hyphen"
};

var simpleSelectors = {
	__proto__: null,
	">": "child",
	"<": "parent",
	"~": "sibling",
	"+": "adjacent"
};

var attribSelectors = {
	__proto__: null,
	"#": ["id", "equals"],
	".": ["class", "element"]
};


var unpackPseudos = {
	__proto__: null,
	"has": true,
	"not": true,
	"matches": true
};

var stripQuotesFromPseudos = {
	__proto__: null,
	"contains": true,
	"icontains": true
};

var quotes = {
	__proto__: null,
	"\"": true,
	"'": true
};


function funescape( _, escaped, escapedWhitespace ) {
	var high = "0x" + escaped - 0x10000;
	
	
	
	return high !== high || escapedWhitespace ?
		escaped :
		
		high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
}

function unescapeCSS(str){
	return str.replace(re_escape, funescape);
}

function isWhitespace(c){
	return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function parse(selector, options){
	var subselects = [];

	selector = parseSelector(subselects, selector + "", options);

	if(selector !== ""){
		throw new SyntaxError("Unmatched selector: " + selector);
	}

	return subselects;
}

function parseSelector(subselects, selector, options){
	var tokens = [],
		sawWS = false,
		data, firstChar, name, quot;

	function getName(){
		var sub = selector.match(re_name)[0];
		selector = selector.substr(sub.length);
		return unescapeCSS(sub);
	}

	function stripWhitespace(start){
		while(isWhitespace(selector.charAt(start))) start++;
		selector = selector.substr(start);
	}

	stripWhitespace(0);

	while(selector !== ""){
		firstChar = selector.charAt(0);

		if(isWhitespace(firstChar)){
			sawWS = true;
			stripWhitespace(1);
		} else if(firstChar in simpleSelectors){
			tokens.push({type: simpleSelectors[firstChar]});
			sawWS = false;

			stripWhitespace(1);
		} else if(firstChar === ","){
			if(tokens.length === 0){
				throw new SyntaxError("empty sub-selector");
			}
			subselects.push(tokens);
			tokens = [];
			sawWS = false;
			stripWhitespace(1);
		} else {
			if(sawWS){
				if(tokens.length > 0){
					tokens.push({type: "descendant"});
				}
				sawWS = false;
			}

			if(firstChar === "*"){
				selector = selector.substr(1);
				tokens.push({type: "universal"});
			} else if(firstChar in attribSelectors){
				selector = selector.substr(1);
				tokens.push({
					type: "attribute",
					name: attribSelectors[firstChar][0],
					action: attribSelectors[firstChar][1],
					value: getName(),
					ignoreCase: false
				});
			} else if(firstChar === "["){
				selector = selector.substr(1);
				data = selector.match(re_attr);
				if(!data){
					throw new SyntaxError("Malformed attribute selector: " + selector);
				}
				selector = selector.substr(data[0].length);
				name = unescapeCSS(data[1]);

				if(
					!options || (
						"lowerCaseAttributeNames" in options ?
							options.lowerCaseAttributeNames :
							!options.xmlMode
					)
				){
					name = name.toLowerCase();
				}

				tokens.push({
					type: "attribute",
					name: name,
					action: actionTypes[data[2]],
					value: unescapeCSS(data[4] || data[5] || ""),
					ignoreCase: !!data[6]
				});

			} else if(firstChar === ":"){
				if(selector.charAt(1) === ":"){
					selector = selector.substr(2);
					tokens.push({type: "pseudo-element", name: getName().toLowerCase()});
					continue;
				}

				selector = selector.substr(1);

				name = getName().toLowerCase();
				data = null;

				if(selector.charAt(0) === "("){
					if(name in unpackPseudos){
						quot = selector.charAt(1);
						var quoted = quot in quotes;

						selector = selector.substr(quoted + 1);

						data = [];
						selector = parseSelector(data, selector, options);

						if(quoted){
							if(selector.charAt(0) !== quot){
								throw new SyntaxError("unmatched quotes in :" + name);
							} else {
								selector = selector.substr(1);
							}
						}

						if(selector.charAt(0) !== ")"){
							throw new SyntaxError("missing closing parenthesis in :" + name + " " + selector);
						}

						selector = selector.substr(1);
					} else {
						var pos = 1, counter = 1;

						for(; counter > 0 && pos < selector.length; pos++){
							if(selector.charAt(pos) === "(") counter++;
							else if(selector.charAt(pos) === ")") counter--;
						}

						if(counter){
							throw new SyntaxError("parenthesis not matched");
						}

						data = selector.substr(1, pos - 2);
						selector = selector.substr(pos);

						if(name in stripQuotesFromPseudos){
							quot = data.charAt(0);

							if(quot === data.slice(-1) && quot in quotes){
								data = data.slice(1, -1);
							}

							data = unescapeCSS(data);
						}
					}
				}

				tokens.push({type: "pseudo", name: name, data: data});
			} else if(re_name.test(selector)){
				name = getName();

				if(!options || ("lowerCaseTags" in options ? options.lowerCaseTags : !options.xmlMode)){
					name = name.toLowerCase();
				}

				tokens.push({type: "tag", name: name});
			} else {
				if(tokens.length && tokens[tokens.length - 1].type === "descendant"){
					tokens.pop();
				}
				addToken(subselects, tokens);
				return selector;
			}
		}
	}

	addToken(subselects, tokens);

	return selector;
}

function addToken(subselects, tokens){
	if(subselects.length > 0 && tokens.length === 0){
		throw new SyntaxError("empty sub-selector");
	}

	subselects.push(tokens);
}

var parse_1$1 = parse$1;




var re_nthElement = /^([+\-]?\d*n)?\s*(?:([+\-]?)\s*(\d+))?$/;


function parse$1(formula){
	formula = formula.trim().toLowerCase();

	if(formula === "even"){
		return [2, 0];
	} else if(formula === "odd"){
		return [2, 1];
	} else {
		var parsed = formula.match(re_nthElement);

		if(!parsed){
			throw new SyntaxError("n-th rule couldn't be parsed ('" + formula + "')");
		}

		var a;

		if(parsed[1]){
			a = parseInt(parsed[1], 10);
			if(isNaN(a)){
				if(parsed[1].charAt(0) === "-") a = -1;
				else a = 1;
			}
		} else a = 0;

		return [
			a,
			parsed[3] ? parseInt((parsed[2] || "") + parsed[3], 10) : 0
		];
	}
}

var compile_1$1 = compile$1;

var trueFunc$1$1  = index$2.trueFunc;
var falseFunc$1$1 = index$2.falseFunc;


function compile$1(parsed){
	var a = parsed[0],
	    b = parsed[1] - 1;

	
	
	if(b < 0 && a <= 0) return falseFunc$1$1;

	
	if(a ===-1) return function(pos){ return pos <= b; };
	if(a === 0) return function(pos){ return pos === b; };
	
	if(a === 1) return b < 0 ? trueFunc$1$1 : function(pos){ return pos >= b; };

	
	var bMod = b % a;
	if(bMod < 0) bMod += a;

	if(a > 1){
		return function(pos){
			return pos >= b && pos % a === bMod;
		};
	}

	a *= -1; 

	return function(pos){
		return pos <= b && pos % a === bMod;
	};
}

var index$4 = function nthCheck(formula){
	return compile_1$1(parse_1$1(formula));
};

var parse_1 = parse_1$1;
var compile_1 = compile_1$1;

index$4.parse = parse_1;
index$4.compile = compile_1;

var universal = 50;
var tag = 30;
var attribute = 1;
var pseudo = 0;
var descendant = -1;
var child = -1;
var parent$1 = -1;
var sibling = -1;
var adjacent = -1;
var procedure = {
	universal: universal,
	tag: tag,
	attribute: attribute,
	pseudo: pseudo,
	descendant: descendant,
	child: child,
	parent: parent$1,
	sibling: sibling,
	adjacent: adjacent
};

var procedure$1 = Object.freeze({
	universal: universal,
	tag: tag,
	attribute: attribute,
	pseudo: pseudo,
	descendant: descendant,
	child: child,
	parent: parent$1,
	sibling: sibling,
	adjacent: adjacent,
	default: procedure
});

var procedure$2 = ( procedure$1 && procedure ) || procedure$1;

var sort = sortByProcedure;





var attributes = {
	__proto__: null,
	exists: 10,
	equals: 8,
	not: 7,
	start: 6,
	end: 6,
	any: 5,
	hyphen: 4,
	element: 4
};

function sortByProcedure(arr){
	var procs = arr.map(getProcedure);
	for(var i = 1; i < arr.length; i++){
		var procNew = procs[i];

		if(procNew < 0) continue;

		for(var j = i - 1; j >= 0 && procNew < procs[j]; j--){
			var token = arr[j + 1];
			arr[j + 1] = arr[j];
			arr[j] = token;
			procs[j + 1] = procs[j];
			procs[j] = procNew;
		}
	}
}

function getProcedure(token){
	var proc = procedure$2[token.type];

	if(proc === procedure$2.attribute){
		proc = attributes[token.action];

		if(proc === attributes.equals && token.name === "id"){
			
			proc = 9;
		}

		if(token.ignoreCase){
			
			
			proc >>= 1;
		}
	} else if(proc === procedure$2.pseudo){
		if(!token.data){
			proc = 3;
		} else if(token.name === "has" || token.name === "contains"){
			proc = 0; 
		} else if(token.name === "matches" || token.name === "not"){
			proc = 0;
			for(var i = 0; i < token.data.length; i++){
				
				if(token.data[i].length !== 1) continue;
				var cur = getProcedure(token.data[i][0]);
				
				if(cur === 0){
					proc = 0;
					break;
				}
				if(cur > proc) proc = cur;
			}
			if(token.data.length > 1 && proc > 0) proc -= 1;
		} else {
			proc = 1;
		}
	}
	return proc;
}

var falseFunc$2 = index$2.falseFunc;


var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;

function factory(adapter){
	
	var attributeRules = {
		__proto__: null,
		equals: function(next, data){
			var name  = data.name,
				value = data.value;

			if(data.ignoreCase){
				value = value.toLowerCase();

				return function equalsIC(elem){
					var attr = adapter.getAttributeValue(elem, name);
					return attr != null && attr.toLowerCase() === value && next(elem);
				};
			}

			return function equals(elem){
				return adapter.getAttributeValue(elem, name) === value && next(elem);
			};
		},
		hyphen: function(next, data){
			var name  = data.name,
				value = data.value,
				len = value.length;

			if(data.ignoreCase){
				value = value.toLowerCase();

				return function hyphenIC(elem){
					var attr = adapter.getAttributeValue(elem, name);
					return attr != null &&
							(attr.length === len || attr.charAt(len) === "-") &&
							attr.substr(0, len).toLowerCase() === value &&
							next(elem);
				};
			}

			return function hyphen(elem){
				var attr = adapter.getAttributeValue(elem, name);
				return attr != null &&
						attr.substr(0, len) === value &&
						(attr.length === len || attr.charAt(len) === "-") &&
						next(elem);
			};
		},
		element: function(next, data){
			var name = data.name,
				value = data.value;
			if (data.name === 'class') {
				let value = data.value;
				if (/\s/.test(value)) return function() { return false }
				return function clazz(elem) {
					let classes = elem.classes;
					return classes && classes.has(value) && next(elem)
				}
			} else {
				if(/\s/.test(value)){
					return falseFunc$2;
				}

				value = value.replace(reChars, "\\$&");

				var pattern = "(?:^|\\s)" + value + "(?:$|\\s)",
					flags = data.ignoreCase ? "i" : "",
					regex = new RegExp(pattern, flags);

				return function element(elem){
					var attr = adapter.getAttributeValue(elem, name);
					return attr != null && regex.test(attr) && next(elem);
				};
			}
		},
		exists: function(next, data){
			var name = data.name;
			return function exists(elem){
				return adapter.hasAttrib(elem, name) && next(elem);
			};
		},
		start: function(next, data){
			var name  = data.name,
				value = data.value,
				len = value.length;

			if(len === 0){
				return falseFunc$2;
			}

			if(data.ignoreCase){
				value = value.toLowerCase();

				return function startIC(elem){
					var attr = adapter.getAttributeValue(elem, name);
					return attr != null && attr.substr(0, len).toLowerCase() === value && next(elem);
				};
			}

			return function start(elem){
				var attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr.substr(0, len) === value && next(elem);
			};
		},
		end: function(next, data){
			var name  = data.name,
				value = data.value,
				len   = -value.length;

			if(len === 0){
				return falseFunc$2;
			}

			if(data.ignoreCase){
				value = value.toLowerCase();

				return function endIC(elem){
					var attr = adapter.getAttributeValue(elem, name);
					return attr != null && attr.substr(len).toLowerCase() === value && next(elem);
				};
			}

			return function end(elem){
				var attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr.substr(len) === value && next(elem);
			};
		},
		any: function(next, data){
			var name  = data.name,
				value = data.value;

			if(value === ""){
				return falseFunc$2;
			}

			if(data.ignoreCase){
				var regex = new RegExp(value.replace(reChars, "\\$&"), "i");

				return function anyIC(elem){
					var attr = adapter.getAttributeValue(elem, name);
					return attr != null && regex.test(attr) && next(elem);
				};
			}

			return function any(elem){
				var attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr.indexOf(value) >= 0 && next(elem);
			};
		},
		not: function(next, data){
			var name  = data.name,
				value = data.value;

			if(value === ""){
				return function notEmpty(elem){
					return !!adapter.getAttributeValue(elem, name) && next(elem);
				};
			} else if(data.ignoreCase){
				value = value.toLowerCase();

				return function notIC(elem){
					var attr = adapter.getAttributeValue(elem, name);
					return attr != null && attr.toLowerCase() !== value && next(elem);
				};
			}

			return function not(elem){
				return adapter.getAttributeValue(elem, name) !== value && next(elem);
			};
		}
	};

	return {
		compile: function(next, data, options){
			if(options && options.strict && (
				data.ignoreCase || data.action === "not"
			)) throw new Error("Unsupported attribute selector");
			return attributeRules[data.action](next, data);
		},
		rules: attributeRules
	};
}

var attributes$1 = factory;

function generalFactory(adapter, Pseudos){
	
	return {
		__proto__: null,

		attribute: attributes$1(adapter).compile,
		pseudo: Pseudos.compile,

		
		tag: function(next, data){
			var name = data.name;
			return function tag(elem){
				return adapter.getNameWithoutNS(elem) === name && next(elem);
			}
		},

		
		descendant: function(next){
			return function descendant(elem){

				var found = false;

				while(!found && (elem = adapter.getParent(elem))){
					found = next(elem);
				}

				return found;
			};
		},
		_flexibleDescendant: function(next){
			
			return function descendant(elem){

				var found = next(elem);

				while(!found && (elem = adapter.getParent(elem))){
					found = next(elem);
				}

				return found;
			};
		},
		parent: function(next, data, options){
			if(options && options.strict) throw new Error("Parent selector isn't part of CSS3");

			return function parent(elem){
				return adapter.getChildren(elem).some(test);
			};

			function test(elem){
				return adapter.isTag(elem) && next(elem);
			}
		},
		child: function(next){
			return function child(elem){
				var parent = adapter.getParent(elem);
				return !!parent && next(parent);
			};
		},
		sibling: function(next){
			return function sibling(elem){
				var siblings = adapter.getSiblings(elem);

				for(var i = 0; i < siblings.length; i++){
					if(adapter.isTag(siblings[i])){
						if(siblings[i] === elem) break;
						if(next(siblings[i])) return true;
					}
				}

				return false;
			};
		},
		adjacent: function(next){
			return function adjacent(elem){
				var siblings = adapter.getSiblings(elem),
					lastElement;

				for(var i = 0; i < siblings.length; i++){
					if(adapter.isTag(siblings[i])){
						if(siblings[i] === elem) break;
						lastElement = siblings[i];
					}
				}

				return !!lastElement && next(lastElement);
			};
		},
		universal: function(next){
			return next;
		}
	};
}

var general = generalFactory;

var trueFunc$1          = index$2.trueFunc;
var falseFunc$3         = index$2.falseFunc;

function filtersFactory(adapter){
	var attributes  = attributes$1(adapter),
		checkAttrib = attributes.rules.equals;

	
	function equals(a, b){
		if(typeof adapter.equals === "function") return adapter.equals(a, b);

		return a === b;
	}

	function getAttribFunc(name, value){
		var data = {name: name, value: value};
		return function attribFunc(next){
			return checkAttrib(next, data);
		};
	}

	function getChildFunc(next){
		return function(elem){
			return !!adapter.getParent(elem) && next(elem);
		};
	}

	var filters = {
		contains: function(next, text){
			return function contains(elem){
				return next(elem) && adapter.getText(elem).indexOf(text) >= 0;
			};
		},
		icontains: function(next, text){
			var itext = text.toLowerCase();
			return function icontains(elem){
				return next(elem) &&
					adapter.getText(elem).toLowerCase().indexOf(itext) >= 0;
			};
		},

		
		"nth-child": function(next, rule){
			var func = index$4(rule);

			if(func === falseFunc$3) return func;
			if(func === trueFunc$1)  return getChildFunc(next);

			return function nthChild(elem){
				var siblings = adapter.getSiblings(elem);

				for(var i = 0, pos = 0; i < siblings.length; i++){
					if(adapter.isTag(siblings[i])){
						if(siblings[i] === elem) break;
						else pos++;
					}
				}

				return func(pos) && next(elem);
			};
		},
		"nth-last-child": function(next, rule){
			var func = index$4(rule);

			if(func === falseFunc$3) return func;
			if(func === trueFunc$1)  return getChildFunc(next);

			return function nthLastChild(elem){
				var siblings = adapter.getSiblings(elem);

				for(var pos = 0, i = siblings.length - 1; i >= 0; i--){
					if(adapter.isTag(siblings[i])){
						if(siblings[i] === elem) break;
						else pos++;
					}
				}

				return func(pos) && next(elem);
			};
		},
		"nth-of-type": function(next, rule){
			var func = index$4(rule);

			if(func === falseFunc$3) return func;
			if(func === trueFunc$1)  return getChildFunc(next);

			return function nthOfType(elem){
				var siblings = adapter.getSiblings(elem);

				for(var pos = 0, i = 0; i < siblings.length; i++){
					if(adapter.isTag(siblings[i])){
						if(siblings[i] === elem) break;
						if(adapter.getName(siblings[i]) === adapter.getName(elem)) pos++;
					}
				}

				return func(pos) && next(elem);
			};
		},
		"nth-last-of-type": function(next, rule){
			var func = index$4(rule);

			if(func === falseFunc$3) return func;
			if(func === trueFunc$1)  return getChildFunc(next);

			return function nthLastOfType(elem){
				var siblings = adapter.getSiblings(elem);

				for(var pos = 0, i = siblings.length - 1; i >= 0; i--){
					if(adapter.isTag(siblings[i])){
						if(siblings[i] === elem) break;
						if(adapter.getName(siblings[i]) === adapter.getName(elem)) pos++;
					}
				}

				return func(pos) && next(elem);
			};
		},

		
		root: function(next){
			return function(elem){
				return !adapter.getParent(elem) && next(elem);
			};
		},

		scope: function(next, rule, options, context){
			if(!context || context.length === 0){
				
				return filters.root(next);
			}

			if(context.length === 1){
				
				return function(elem){
					return equals(context[0], elem) && next(elem);
				};
			}

			return function(elem){
				return context.indexOf(elem) >= 0 && next(elem);
			};
		},

		
		checkbox: getAttribFunc("type", "checkbox"),
		file: getAttribFunc("type", "file"),
		password: getAttribFunc("type", "password"),
		radio: getAttribFunc("type", "radio"),
		reset: getAttribFunc("type", "reset"),
		image: getAttribFunc("type", "image"),
		submit: getAttribFunc("type", "submit")
	};
	return filters;
}

function pseudosFactory(adapter){
	
	function getFirstElement(elems){
		for(var i = 0; elems && i < elems.length; i++){
			if(adapter.isTag(elems[i])) return elems[i];
		}
	}

	
	var pseudos = {
		empty: function(elem){
			return !adapter.getChildren(elem).some(function(elem){
				return adapter.isTag(elem) || elem.type === "text";
			});
		},

		"first-child": function(elem){
			return getFirstElement(adapter.getSiblings(elem)) === elem;
		},
		"last-child": function(elem){
			var siblings = adapter.getSiblings(elem);

			for(var i = siblings.length - 1; i >= 0; i--){
				if(siblings[i] === elem) return true;
				if(adapter.isTag(siblings[i])) break;
			}

			return false;
		},
		"first-of-type": function(elem){
			var siblings = adapter.getSiblings(elem);

			for(var i = 0; i < siblings.length; i++){
				if(adapter.isTag(siblings[i])){
					if(siblings[i] === elem) return true;
					if(adapter.getName(siblings[i]) === adapter.getName(elem)) break;
				}
			}

			return false;
		},
		"last-of-type": function(elem){
			var siblings = adapter.getSiblings(elem);

			for(var i = siblings.length - 1; i >= 0; i--){
				if(adapter.isTag(siblings[i])){
					if(siblings[i] === elem) return true;
					if(adapter.getName(siblings[i]) === adapter.getName(elem)) break;
				}
			}

			return false;
		},
		"only-of-type": function(elem){
			var siblings = adapter.getSiblings(elem);

			for(var i = 0, j = siblings.length; i < j; i++){
				if(adapter.isTag(siblings[i])){
					if(siblings[i] === elem) continue;
					if(adapter.getName(siblings[i]) === adapter.getName(elem)) return false;
				}
			}

			return true;
		},
		"only-child": function(elem){
			var siblings = adapter.getSiblings(elem);

			for(var i = 0; i < siblings.length; i++){
				if(adapter.isTag(siblings[i]) && siblings[i] !== elem) return false;
			}

			return true;
		},

		
		link: function(elem){
			return adapter.hasAttrib(elem, "href");
		},
		visited: falseFunc$3, 
		

		
		

		
		selected: function(elem){
			if(adapter.hasAttrib(elem, "selected")) return true;
			else if(adapter.getName(elem) !== "option") return false;

			
			var parent = adapter.getParent(elem);

			if(
				!parent ||
				adapter.getName(parent) !== "select" ||
				adapter.hasAttrib(parent, "multiple")
			) return false;

			var siblings = adapter.getChildren(parent),
				sawElem  = false;

			for(var i = 0; i < siblings.length; i++){
				if(adapter.isTag(siblings[i])){
					if(siblings[i] === elem){
						sawElem = true;
					} else if(!sawElem){
						return false;
					} else if(adapter.hasAttrib(siblings[i], "selected")){
						return false;
					}
				}
			}

			return sawElem;
		},
		
		
		
		
		
		
		disabled: function(elem){
			return adapter.hasAttrib(elem, "disabled");
		},
		enabled: function(elem){
			return !adapter.hasAttrib(elem, "disabled");
		},
		
		checked: function(elem){
			return adapter.hasAttrib(elem, "checked") || pseudos.selected(elem);
		},
		
		required: function(elem){
			return adapter.hasAttrib(elem, "required");
		},
		
		optional: function(elem){
			return !adapter.hasAttrib(elem, "required");
		},

		

		
		parent: function(elem){
			return !pseudos.empty(elem);
		},
		
		header: function(elem){
			var name = adapter.getName(elem);
			return name === "h1" ||
					name === "h2" ||
					name === "h3" ||
					name === "h4" ||
					name === "h5" ||
					name === "h6";
		},

		
		button: function(elem){
			var name = adapter.getName(elem);
			return name === "button" ||
					name === "input" &&
					adapter.getAttributeValue(elem, "type") === "button";
		},
		
		input: function(elem){
			var name = adapter.getName(elem);
			return name === "input" ||
					name === "textarea" ||
					name === "select" ||
					name === "button";
		},
		
		text: function(elem){
			var attr;
			return adapter.getName(elem) === "input" && (
				!(attr = adapter.getAttributeValue(elem, "type")) ||
				attr.toLowerCase() === "text"
			);
		}
	};

	return pseudos;
}

function verifyArgs(func, name, subselect){
	if(subselect === null){
		if(func.length > 1 && name !== "scope"){
			throw new Error("pseudo-selector :" + name + " requires an argument");
		}
	} else {
		if(func.length === 1){
			throw new Error("pseudo-selector :" + name + " doesn't have any arguments");
		}
	}
}


var re_CSS3 = /^(?:(?:nth|last|first|only)-(?:child|of-type)|root|empty|(?:en|dis)abled|checked|not)$/;

function factory$1(adapter){
	var pseudos = pseudosFactory(adapter);
	var filters = filtersFactory(adapter);

	return {
		compile: function(next, data, options, context){
			var name = data.name,
				subselect = data.data;

			if(options && options.strict && !re_CSS3.test(name)){
				throw new Error(":" + name + " isn't part of CSS3");
			}

			if(typeof filters[name] === "function"){
				verifyArgs(filters[name], name,  subselect);
				return filters[name](next, subselect, options, context);
			} else if(typeof pseudos[name] === "function"){
				var func = pseudos[name];
				verifyArgs(func, name, subselect);

				if(next === trueFunc$1) return func;

				return function pseudoArgs(elem){
					return func(elem, subselect) && next(elem);
				};
			} else {
				throw new Error("unmatched pseudo-class :" + name);
			}
		},
		filters: filters,
		pseudos: pseudos
	};
}

var pseudos = factory$1;

var compile$$1 = compileFactory;

var trueFunc       = index$2.trueFunc;
var falseFunc$1      = index$2.falseFunc;

function compileFactory(adapter){
	var Pseudos     = pseudos(adapter),
		filters     = Pseudos.filters,
		Rules 			= general(adapter, Pseudos);

	function compile$$1(selector, options, context){
		var next = compileUnsafe(selector, options, context);
		return wrap(next);
	}

	function wrap(next){
		return function base(elem){
			return adapter.isTag(elem) && next(elem);
		};
	}

	function compileUnsafe(selector, options, context){
		var token = index$3(selector, options);
		return compileToken(token, options, context);
	}

	function includesScopePseudo(t){
		return t.type === "pseudo" && (
			t.name === "scope" || (
				Array.isArray(t.data) &&
				t.data.some(function(data){
					return data.some(includesScopePseudo);
				})
			)
		);
	}

	var DESCENDANT_TOKEN = {type: "descendant"},
		FLEXIBLE_DESCENDANT_TOKEN = {type: "_flexibleDescendant"},
		SCOPE_TOKEN = {type: "pseudo", name: "scope"},
		PLACEHOLDER_ELEMENT = {};

	
	
	function absolutize(token, context){
		
		var hasContext = !!context && !!context.length && context.every(function(e){
			return e === PLACEHOLDER_ELEMENT || !!adapter.getParent(e);
		});


		token.forEach(function(t){
			if(t.length > 0 && isTraversal(t[0]) && t[0].type !== "descendant"){
				
			} else if(hasContext && !includesScopePseudo(t)){
				t.unshift(DESCENDANT_TOKEN);
			} else {
				return;
			}

			t.unshift(SCOPE_TOKEN);
		});
	}

	function compileToken(token, options, context){
		token = token.filter(function(t){ return t.length > 0; });

		token.forEach(sort);

		var isArrayContext = Array.isArray(context);

		context = (options && options.context) || context;

		if(context && !isArrayContext) context = [context];

		absolutize(token, context);

		var shouldTestNextSiblings = false;

		var query = token
			.map(function(rules){
				if(rules[0] && rules[1] && rules[0].name === "scope"){
					var ruleType = rules[1].type;
					if(isArrayContext && ruleType === "descendant") rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
					else if(ruleType === "adjacent" || ruleType === "sibling") shouldTestNextSiblings = true;
				}
				return compileRules(rules, options, context);
			})
			.reduce(reduceRules, falseFunc$1);

		query.shouldTestNextSiblings = shouldTestNextSiblings;

		return query;
	}

	function isTraversal(t){
		return procedure$2[t.type] < 0;
	}

	function compileRules(rules, options, context){
		return rules.reduce(function(func, rule){
			if(func === falseFunc$1) return func;
			return Rules[rule.type](func, rule, options, context);
		}, options && options.rootFunc || trueFunc);
	}

	function reduceRules(a, b){
		if(b === falseFunc$1 || a === trueFunc){
			return a;
		}
		if(a === falseFunc$1 || b === trueFunc){
			return b;
		}

		return function combine(elem){
			return a(elem) || b(elem);
		};
	}

	function containsTraversal(t){
		return t.some(isTraversal);
	}

	
	
	
	filters.not = function(next, token, options, context){
		var opts = {
			xmlMode: !!(options && options.xmlMode),
			strict: !!(options && options.strict)
		};

		if(opts.strict){
			if(token.length > 1 || token.some(containsTraversal)){
				throw new Error("complex selectors in :not aren't allowed in strict mode");
			}
		}

		var func = compileToken(token, opts, context);

		if(func === falseFunc$1) return next;
		if(func === trueFunc)  return falseFunc$1;

		return function(elem){
			return !func(elem) && next(elem);
		};
	};

	filters.has = function(next, token, options){
		var opts = {
			xmlMode: !!(options && options.xmlMode),
			strict: !!(options && options.strict)
		};

		
		var context = token.some(containsTraversal) ? [PLACEHOLDER_ELEMENT] : null;

		var func = compileToken(token, opts, context);

		if(func === falseFunc$1) return falseFunc$1;
		if(func === trueFunc){
			return function(elem){
				return adapter.getChildren(elem).some(adapter.isTag) && next(elem);
			};
		}

		func = wrap(func);

		if(context){
			return function has(elem){
				return next(elem) && (
					(context[0] = elem), adapter.existsOne(func, adapter.getChildren(elem))
				);
			};
		}

		return function has(elem){
			return next(elem) && adapter.existsOne(func, adapter.getChildren(elem));
		};
	};

	filters.matches = function(next, token, options, context){
		var opts = {
			xmlMode: !!(options && options.xmlMode),
			strict: !!(options && options.strict),
			rootFunc: next
		};

		return compileToken(token, opts, context);
	};

	compile$$1.compileToken = compileToken;
	compile$$1.compileUnsafe = compileUnsafe;
	compile$$1.Pseudos = Pseudos;

	return compile$$1;
}

var index$1 = CSSselect$1;

var falseFunc      = index$2.falseFunc;
var defaultCompile = compile$$1(domUtils);

function adapterCompile(adapter){
	if(!adapter.__compile__){
		adapter.__compile__ = compile$$1(adapter);
	}
	return adapter.__compile__
}

function getSelectorFunc(searchFunc){
	return function select(query, elems, options){
		options = options || {};
		options.adapter = options.adapter || domUtils;
		var compile$$1 = adapterCompile(options.adapter);

		if(typeof query !== "function") query = compile$$1.compileUnsafe(query, options, elems);
		if(query.shouldTestNextSiblings) elems = appendNextSiblings((options && options.context) || elems, options.adapter);
		if(!Array.isArray(elems)) elems = options.adapter.getChildren(elems);
		else elems = options.adapter.removeSubsets(elems);
		return searchFunc(query, elems, options);
	};
}

function getNextSiblings(elem, adapter){
	var siblings = adapter.getSiblings(elem);
	if(!Array.isArray(siblings)) return [];
	siblings = siblings.slice(0);
	while(siblings.shift() !== elem);
	return siblings;
}

function appendNextSiblings(elems, adapter){
	
	if(!Array.isArray(elems)) elems = [elems];
	var newElems = elems.slice(0);

	for(var i = 0, len = elems.length; i < len; i++){
		var nextSiblings = getNextSiblings(newElems[i], adapter);
		newElems.push.apply(newElems, nextSiblings);
	}
	return newElems;
}

var selectAll = getSelectorFunc(function selectAll(query, elems, options){
	return (query === falseFunc || !elems || elems.length === 0) ? [] : options.adapter.findAll(query, elems);
});

var selectOne = getSelectorFunc(function selectOne(query, elems, options){
	return (query === falseFunc || !elems || elems.length === 0) ? null : options.adapter.findOne(query, elems);
});

function is(elem, query, options){
	options = options || {};
	options.adapter = options.adapter || domUtils;
	var compile$$1 = adapterCompile(options.adapter);
	return (typeof query === "function" ? query : compile$$1(query, options))(elem);
}


function CSSselect$1(query, elems, options){
	return selectAll(query, elems, options);
}

CSSselect$1.compile = defaultCompile;
CSSselect$1.filters = defaultCompile.Pseudos.filters;
CSSselect$1.pseudos = defaultCompile.Pseudos.pseudos;

CSSselect$1.selectAll = selectAll;
CSSselect$1.selectOne = selectOne;

CSSselect$1.is = is;


CSSselect$1.parse = defaultCompile;
CSSselect$1.iterate = selectAll;


CSSselect$1._compileUnsafe = defaultCompile.compileUnsafe;
CSSselect$1._compileToken = defaultCompile.compileToken;

var amp$1$1 = "&";
var apos$1$1 = "'";
var gt$1$1 = ">";
var lt$1$1 = "<";
var quot$1$1 = "\"";
var xmlJSON$1 = {
	amp: amp$1$1,
	apos: apos$1$1,
	gt: gt$1$1,
	lt: lt$1$1,
	quot: quot$1$1
};

var xml$1 = Object.freeze({
	amp: amp$1$1,
	apos: apos$1$1,
	gt: gt$1$1,
	lt: lt$1$1,
	quot: quot$1$1,
	default: xmlJSON$1
});

var Aacute$1$1 = "Á";
var aacute$1$1 = "á";
var Abreve$1 = "Ă";
var abreve$1 = "ă";
var ac$1 = "∾";
var acd$1 = "∿";
var acE$1 = "∾̳";
var Acirc$1$1 = "Â";
var acirc$1$1 = "â";
var acute$1$1 = "´";
var Acy$1 = "А";
var acy$1 = "а";
var AElig$1$1 = "Æ";
var aelig$1$1 = "æ";
var af$1 = "⁡";
var Afr$1 = "𝔄";
var afr$1 = "𝔞";
var Agrave$1$1 = "À";
var agrave$1$1 = "à";
var alefsym$1 = "ℵ";
var aleph$1 = "ℵ";
var Alpha$1 = "Α";
var alpha$1 = "α";
var Amacr$1 = "Ā";
var amacr$1 = "ā";
var amalg$1 = "⨿";
var amp$1$2 = "&";
var AMP$1$1 = "&";
var andand$1 = "⩕";
var And$1 = "⩓";
var and$1 = "∧";
var andd$1 = "⩜";
var andslope$1 = "⩘";
var andv$1 = "⩚";
var ang$1 = "∠";
var ange$1 = "⦤";
var angle$1 = "∠";
var angmsdaa$1 = "⦨";
var angmsdab$1 = "⦩";
var angmsdac$1 = "⦪";
var angmsdad$1 = "⦫";
var angmsdae$1 = "⦬";
var angmsdaf$1 = "⦭";
var angmsdag$1 = "⦮";
var angmsdah$1 = "⦯";
var angmsd$1 = "∡";
var angrt$1 = "∟";
var angrtvb$1 = "⊾";
var angrtvbd$1 = "⦝";
var angsph$1 = "∢";
var angst$1 = "Å";
var angzarr$1 = "⍼";
var Aogon$1 = "Ą";
var aogon$1 = "ą";
var Aopf$1 = "𝔸";
var aopf$1 = "𝕒";
var apacir$1 = "⩯";
var ap$1 = "≈";
var apE$1 = "⩰";
var ape$1 = "≊";
var apid$1 = "≋";
var apos$1$2 = "'";
var ApplyFunction$1 = "⁡";
var approx$1 = "≈";
var approxeq$1 = "≊";
var Aring$1$1 = "Å";
var aring$1$1 = "å";
var Ascr$1 = "𝒜";
var ascr$1 = "𝒶";
var Assign$1 = "≔";
var ast$1 = "*";
var asymp$1 = "≈";
var asympeq$1 = "≍";
var Atilde$1$1 = "Ã";
var atilde$1$1 = "ã";
var Auml$1$1 = "Ä";
var auml$1$1 = "ä";
var awconint$1 = "∳";
var awint$1 = "⨑";
var backcong$1 = "≌";
var backepsilon$1 = "϶";
var backprime$1 = "‵";
var backsim$1 = "∽";
var backsimeq$1 = "⋍";
var Backslash$1 = "∖";
var Barv$1 = "⫧";
var barvee$1 = "⊽";
var barwed$1 = "⌅";
var Barwed$1 = "⌆";
var barwedge$1 = "⌅";
var bbrk$1 = "⎵";
var bbrktbrk$1 = "⎶";
var bcong$1 = "≌";
var Bcy$1 = "Б";
var bcy$1 = "б";
var bdquo$1 = "„";
var becaus$1 = "∵";
var because$1 = "∵";
var Because$1 = "∵";
var bemptyv$1 = "⦰";
var bepsi$1 = "϶";
var bernou$1 = "ℬ";
var Bernoullis$1 = "ℬ";
var Beta$1 = "Β";
var beta$1 = "β";
var beth$1 = "ℶ";
var between$1 = "≬";
var Bfr$1 = "𝔅";
var bfr$1 = "𝔟";
var bigcap$1 = "⋂";
var bigcirc$1 = "◯";
var bigcup$1 = "⋃";
var bigodot$1 = "⨀";
var bigoplus$1 = "⨁";
var bigotimes$1 = "⨂";
var bigsqcup$1 = "⨆";
var bigstar$1 = "★";
var bigtriangledown$1 = "▽";
var bigtriangleup$1 = "△";
var biguplus$1 = "⨄";
var bigvee$1 = "⋁";
var bigwedge$1 = "⋀";
var bkarow$1 = "⤍";
var blacklozenge$1 = "⧫";
var blacksquare$1 = "▪";
var blacktriangle$1 = "▴";
var blacktriangledown$1 = "▾";
var blacktriangleleft$1 = "◂";
var blacktriangleright$1 = "▸";
var blank$1 = "␣";
var blk12$1 = "▒";
var blk14$1 = "░";
var blk34$1 = "▓";
var block$1 = "█";
var bne$1 = "=⃥";
var bnequiv$1 = "≡⃥";
var bNot$1 = "⫭";
var bnot$1 = "⌐";
var Bopf$1 = "𝔹";
var bopf$1 = "𝕓";
var bot$1 = "⊥";
var bottom$1 = "⊥";
var bowtie$1 = "⋈";
var boxbox$1 = "⧉";
var boxdl$1 = "┐";
var boxdL$1 = "╕";
var boxDl$1 = "╖";
var boxDL$1 = "╗";
var boxdr$1 = "┌";
var boxdR$1 = "╒";
var boxDr$1 = "╓";
var boxDR$1 = "╔";
var boxh$1 = "─";
var boxH$1 = "═";
var boxhd$1 = "┬";
var boxHd$1 = "╤";
var boxhD$1 = "╥";
var boxHD$1 = "╦";
var boxhu$1 = "┴";
var boxHu$1 = "╧";
var boxhU$1 = "╨";
var boxHU$1 = "╩";
var boxminus$1 = "⊟";
var boxplus$1 = "⊞";
var boxtimes$1 = "⊠";
var boxul$1 = "┘";
var boxuL$1 = "╛";
var boxUl$1 = "╜";
var boxUL$1 = "╝";
var boxur$1 = "└";
var boxuR$1 = "╘";
var boxUr$1 = "╙";
var boxUR$1 = "╚";
var boxv$1 = "│";
var boxV$1 = "║";
var boxvh$1 = "┼";
var boxvH$1 = "╪";
var boxVh$1 = "╫";
var boxVH$1 = "╬";
var boxvl$1 = "┤";
var boxvL$1 = "╡";
var boxVl$1 = "╢";
var boxVL$1 = "╣";
var boxvr$1 = "├";
var boxvR$1 = "╞";
var boxVr$1 = "╟";
var boxVR$1 = "╠";
var bprime$1 = "‵";
var breve$1 = "˘";
var Breve$1 = "˘";
var brvbar$1$1 = "¦";
var bscr$1 = "𝒷";
var Bscr$1 = "ℬ";
var bsemi$1 = "⁏";
var bsim$1 = "∽";
var bsime$1 = "⋍";
var bsolb$1 = "⧅";
var bsol$1 = "\\";
var bsolhsub$1 = "⟈";
var bull$1 = "•";
var bullet$1 = "•";
var bump$1 = "≎";
var bumpE$1 = "⪮";
var bumpe$1 = "≏";
var Bumpeq$1 = "≎";
var bumpeq$1 = "≏";
var Cacute$1 = "Ć";
var cacute$1 = "ć";
var capand$1 = "⩄";
var capbrcup$1 = "⩉";
var capcap$1 = "⩋";
var cap$1 = "∩";
var Cap$1 = "⋒";
var capcup$1 = "⩇";
var capdot$1 = "⩀";
var CapitalDifferentialD$1 = "ⅅ";
var caps$1 = "∩︀";
var caret$1 = "⁁";
var caron$1 = "ˇ";
var Cayleys$1 = "ℭ";
var ccaps$1 = "⩍";
var Ccaron$1 = "Č";
var ccaron$1 = "č";
var Ccedil$1$1 = "Ç";
var ccedil$1$1 = "ç";
var Ccirc$1 = "Ĉ";
var ccirc$1 = "ĉ";
var Cconint$1 = "∰";
var ccups$1 = "⩌";
var ccupssm$1 = "⩐";
var Cdot$1 = "Ċ";
var cdot$1 = "ċ";
var cedil$1$1 = "¸";
var Cedilla$1 = "¸";
var cemptyv$1 = "⦲";
var cent$1$1 = "¢";
var centerdot$1 = "·";
var CenterDot$1 = "·";
var cfr$1 = "𝔠";
var Cfr$1 = "ℭ";
var CHcy$1 = "Ч";
var chcy$1 = "ч";
var check$1 = "✓";
var checkmark$1 = "✓";
var Chi$1 = "Χ";
var chi$1 = "χ";
var circ$1 = "ˆ";
var circeq$1 = "≗";
var circlearrowleft$1 = "↺";
var circlearrowright$1 = "↻";
var circledast$1 = "⊛";
var circledcirc$1 = "⊚";
var circleddash$1 = "⊝";
var CircleDot$1 = "⊙";
var circledR$1 = "®";
var circledS$1 = "Ⓢ";
var CircleMinus$1 = "⊖";
var CirclePlus$1 = "⊕";
var CircleTimes$1 = "⊗";
var cir$1 = "○";
var cirE$1 = "⧃";
var cire$1 = "≗";
var cirfnint$1 = "⨐";
var cirmid$1 = "⫯";
var cirscir$1 = "⧂";
var ClockwiseContourIntegral$1 = "∲";
var CloseCurlyDoubleQuote$1 = "”";
var CloseCurlyQuote$1 = "’";
var clubs$1 = "♣";
var clubsuit$1 = "♣";
var colon$1 = ":";
var Colon$1 = "∷";
var Colone$1 = "⩴";
var colone$1 = "≔";
var coloneq$1 = "≔";
var comma$1 = ",";
var commat$1 = "@";
var comp$1 = "∁";
var compfn$1 = "∘";
var complement$1 = "∁";
var complexes$1 = "ℂ";
var cong$1 = "≅";
var congdot$1 = "⩭";
var Congruent$1 = "≡";
var conint$1 = "∮";
var Conint$1 = "∯";
var ContourIntegral$1 = "∮";
var copf$1 = "𝕔";
var Copf$1 = "ℂ";
var coprod$1 = "∐";
var Coproduct$1 = "∐";
var copy$1$1 = "©";
var COPY$1$1 = "©";
var copysr$1 = "℗";
var CounterClockwiseContourIntegral$1 = "∳";
var crarr$1 = "↵";
var cross$1 = "✗";
var Cross$1 = "⨯";
var Cscr$1 = "𝒞";
var cscr$1 = "𝒸";
var csub$1 = "⫏";
var csube$1 = "⫑";
var csup$1 = "⫐";
var csupe$1 = "⫒";
var ctdot$1 = "⋯";
var cudarrl$1 = "⤸";
var cudarrr$1 = "⤵";
var cuepr$1 = "⋞";
var cuesc$1 = "⋟";
var cularr$1 = "↶";
var cularrp$1 = "⤽";
var cupbrcap$1 = "⩈";
var cupcap$1 = "⩆";
var CupCap$1 = "≍";
var cup$1 = "∪";
var Cup$1 = "⋓";
var cupcup$1 = "⩊";
var cupdot$1 = "⊍";
var cupor$1 = "⩅";
var cups$1 = "∪︀";
var curarr$1 = "↷";
var curarrm$1 = "⤼";
var curlyeqprec$1 = "⋞";
var curlyeqsucc$1 = "⋟";
var curlyvee$1 = "⋎";
var curlywedge$1 = "⋏";
var curren$1$1 = "¤";
var curvearrowleft$1 = "↶";
var curvearrowright$1 = "↷";
var cuvee$1 = "⋎";
var cuwed$1 = "⋏";
var cwconint$1 = "∲";
var cwint$1 = "∱";
var cylcty$1 = "⌭";
var dagger$1 = "†";
var Dagger$1 = "‡";
var daleth$1 = "ℸ";
var darr$1 = "↓";
var Darr$1 = "↡";
var dArr$1 = "⇓";
var dash$1 = "‐";
var Dashv$1 = "⫤";
var dashv$1 = "⊣";
var dbkarow$1 = "⤏";
var dblac$1 = "˝";
var Dcaron$1 = "Ď";
var dcaron$1 = "ď";
var Dcy$1 = "Д";
var dcy$1 = "д";
var ddagger$1 = "‡";
var ddarr$1 = "⇊";
var DD$1 = "ⅅ";
var dd$1 = "ⅆ";
var DDotrahd$1 = "⤑";
var ddotseq$1 = "⩷";
var deg$1$1 = "°";
var Del$1 = "∇";
var Delta$1 = "Δ";
var delta$1 = "δ";
var demptyv$1 = "⦱";
var dfisht$1 = "⥿";
var Dfr$1 = "𝔇";
var dfr$1 = "𝔡";
var dHar$1 = "⥥";
var dharl$1 = "⇃";
var dharr$1 = "⇂";
var DiacriticalAcute$1 = "´";
var DiacriticalDot$1 = "˙";
var DiacriticalDoubleAcute$1 = "˝";
var DiacriticalGrave$1 = "`";
var DiacriticalTilde$1 = "˜";
var diam$1 = "⋄";
var diamond$1 = "⋄";
var Diamond$1 = "⋄";
var diamondsuit$1 = "♦";
var diams$1 = "♦";
var die$1 = "¨";
var DifferentialD$1 = "ⅆ";
var digamma$1 = "ϝ";
var disin$1 = "⋲";
var div$1 = "÷";
var divide$1$1 = "÷";
var divideontimes$1 = "⋇";
var divonx$1 = "⋇";
var DJcy$1 = "Ђ";
var djcy$1 = "ђ";
var dlcorn$1 = "⌞";
var dlcrop$1 = "⌍";
var dollar$1 = "$";
var Dopf$1 = "𝔻";
var dopf$1 = "𝕕";
var Dot$1 = "¨";
var dot$1 = "˙";
var DotDot$1 = "⃜";
var doteq$1 = "≐";
var doteqdot$1 = "≑";
var DotEqual$1 = "≐";
var dotminus$1 = "∸";
var dotplus$1 = "∔";
var dotsquare$1 = "⊡";
var doublebarwedge$1 = "⌆";
var DoubleContourIntegral$1 = "∯";
var DoubleDot$1 = "¨";
var DoubleDownArrow$1 = "⇓";
var DoubleLeftArrow$1 = "⇐";
var DoubleLeftRightArrow$1 = "⇔";
var DoubleLeftTee$1 = "⫤";
var DoubleLongLeftArrow$1 = "⟸";
var DoubleLongLeftRightArrow$1 = "⟺";
var DoubleLongRightArrow$1 = "⟹";
var DoubleRightArrow$1 = "⇒";
var DoubleRightTee$1 = "⊨";
var DoubleUpArrow$1 = "⇑";
var DoubleUpDownArrow$1 = "⇕";
var DoubleVerticalBar$1 = "∥";
var DownArrowBar$1 = "⤓";
var downarrow$1 = "↓";
var DownArrow$1 = "↓";
var Downarrow$1 = "⇓";
var DownArrowUpArrow$1 = "⇵";
var DownBreve$1 = "̑";
var downdownarrows$1 = "⇊";
var downharpoonleft$1 = "⇃";
var downharpoonright$1 = "⇂";
var DownLeftRightVector$1 = "⥐";
var DownLeftTeeVector$1 = "⥞";
var DownLeftVectorBar$1 = "⥖";
var DownLeftVector$1 = "↽";
var DownRightTeeVector$1 = "⥟";
var DownRightVectorBar$1 = "⥗";
var DownRightVector$1 = "⇁";
var DownTeeArrow$1 = "↧";
var DownTee$1 = "⊤";
var drbkarow$1 = "⤐";
var drcorn$1 = "⌟";
var drcrop$1 = "⌌";
var Dscr$1 = "𝒟";
var dscr$1 = "𝒹";
var DScy$1 = "Ѕ";
var dscy$1 = "ѕ";
var dsol$1 = "⧶";
var Dstrok$1 = "Đ";
var dstrok$1 = "đ";
var dtdot$1 = "⋱";
var dtri$1 = "▿";
var dtrif$1 = "▾";
var duarr$1 = "⇵";
var duhar$1 = "⥯";
var dwangle$1 = "⦦";
var DZcy$1 = "Џ";
var dzcy$1 = "џ";
var dzigrarr$1 = "⟿";
var Eacute$1$1 = "É";
var eacute$1$1 = "é";
var easter$1 = "⩮";
var Ecaron$1 = "Ě";
var ecaron$1 = "ě";
var Ecirc$1$1 = "Ê";
var ecirc$1$1 = "ê";
var ecir$1 = "≖";
var ecolon$1 = "≕";
var Ecy$1 = "Э";
var ecy$1 = "э";
var eDDot$1 = "⩷";
var Edot$1 = "Ė";
var edot$1 = "ė";
var eDot$1 = "≑";
var ee$1 = "ⅇ";
var efDot$1 = "≒";
var Efr$1 = "𝔈";
var efr$1 = "𝔢";
var eg$1 = "⪚";
var Egrave$1$1 = "È";
var egrave$1$1 = "è";
var egs$1 = "⪖";
var egsdot$1 = "⪘";
var el$1 = "⪙";
var Element$1 = "∈";
var elinters$1 = "⏧";
var ell$1 = "ℓ";
var els$1 = "⪕";
var elsdot$1 = "⪗";
var Emacr$1 = "Ē";
var emacr$1 = "ē";
var empty$1 = "∅";
var emptyset$1 = "∅";
var EmptySmallSquare$1 = "◻";
var emptyv$1 = "∅";
var EmptyVerySmallSquare$1 = "▫";
var emsp13$1 = " ";
var emsp14$1 = " ";
var emsp$1 = " ";
var ENG$1 = "Ŋ";
var eng$1 = "ŋ";
var ensp$1 = " ";
var Eogon$1 = "Ę";
var eogon$1 = "ę";
var Eopf$1 = "𝔼";
var eopf$1 = "𝕖";
var epar$1 = "⋕";
var eparsl$1 = "⧣";
var eplus$1 = "⩱";
var epsi$1 = "ε";
var Epsilon$1 = "Ε";
var epsilon$1 = "ε";
var epsiv$1 = "ϵ";
var eqcirc$1 = "≖";
var eqcolon$1 = "≕";
var eqsim$1 = "≂";
var eqslantgtr$1 = "⪖";
var eqslantless$1 = "⪕";
var Equal$1 = "⩵";
var equals$1 = "=";
var EqualTilde$1 = "≂";
var equest$1 = "≟";
var Equilibrium$1 = "⇌";
var equiv$1 = "≡";
var equivDD$1 = "⩸";
var eqvparsl$1 = "⧥";
var erarr$1 = "⥱";
var erDot$1 = "≓";
var escr$1 = "ℯ";
var Escr$1 = "ℰ";
var esdot$1 = "≐";
var Esim$1 = "⩳";
var esim$1 = "≂";
var Eta$1 = "Η";
var eta$1 = "η";
var ETH$1$1 = "Ð";
var eth$1$1 = "ð";
var Euml$1$1 = "Ë";
var euml$1$1 = "ë";
var euro$1 = "€";
var excl$1 = "!";
var exist$1 = "∃";
var Exists$1 = "∃";
var expectation$1 = "ℰ";
var exponentiale$1 = "ⅇ";
var ExponentialE$1 = "ⅇ";
var fallingdotseq$1 = "≒";
var Fcy$1 = "Ф";
var fcy$1 = "ф";
var female$1 = "♀";
var ffilig$1 = "ﬃ";
var fflig$1 = "ﬀ";
var ffllig$1 = "ﬄ";
var Ffr$1 = "𝔉";
var ffr$1 = "𝔣";
var filig$1 = "ﬁ";
var FilledSmallSquare$1 = "◼";
var FilledVerySmallSquare$1 = "▪";
var fjlig$1 = "fj";
var flat$1 = "♭";
var fllig$1 = "ﬂ";
var fltns$1 = "▱";
var fnof$1 = "ƒ";
var Fopf$1 = "𝔽";
var fopf$1 = "𝕗";
var forall$1 = "∀";
var ForAll$1 = "∀";
var fork$1 = "⋔";
var forkv$1 = "⫙";
var Fouriertrf$1 = "ℱ";
var fpartint$1 = "⨍";
var frac12$1$1 = "½";
var frac13$1 = "⅓";
var frac14$1$1 = "¼";
var frac15$1 = "⅕";
var frac16$1 = "⅙";
var frac18$1 = "⅛";
var frac23$1 = "⅔";
var frac25$1 = "⅖";
var frac34$1$1 = "¾";
var frac35$1 = "⅗";
var frac38$1 = "⅜";
var frac45$1 = "⅘";
var frac56$1 = "⅚";
var frac58$1 = "⅝";
var frac78$1 = "⅞";
var frasl$1 = "⁄";
var frown$1 = "⌢";
var fscr$1 = "𝒻";
var Fscr$1 = "ℱ";
var gacute$1 = "ǵ";
var Gamma$1 = "Γ";
var gamma$1 = "γ";
var Gammad$1 = "Ϝ";
var gammad$1 = "ϝ";
var gap$1 = "⪆";
var Gbreve$1 = "Ğ";
var gbreve$1 = "ğ";
var Gcedil$1 = "Ģ";
var Gcirc$1 = "Ĝ";
var gcirc$1 = "ĝ";
var Gcy$1 = "Г";
var gcy$1 = "г";
var Gdot$1 = "Ġ";
var gdot$1 = "ġ";
var ge$1 = "≥";
var gE$1 = "≧";
var gEl$1 = "⪌";
var gel$1 = "⋛";
var geq$1 = "≥";
var geqq$1 = "≧";
var geqslant$1 = "⩾";
var gescc$1 = "⪩";
var ges$1 = "⩾";
var gesdot$1 = "⪀";
var gesdoto$1 = "⪂";
var gesdotol$1 = "⪄";
var gesl$1 = "⋛︀";
var gesles$1 = "⪔";
var Gfr$1 = "𝔊";
var gfr$1 = "𝔤";
var gg$1 = "≫";
var Gg$1 = "⋙";
var ggg$1 = "⋙";
var gimel$1 = "ℷ";
var GJcy$1 = "Ѓ";
var gjcy$1 = "ѓ";
var gla$1 = "⪥";
var gl$1 = "≷";
var glE$1 = "⪒";
var glj$1 = "⪤";
var gnap$1 = "⪊";
var gnapprox$1 = "⪊";
var gne$1 = "⪈";
var gnE$1 = "≩";
var gneq$1 = "⪈";
var gneqq$1 = "≩";
var gnsim$1 = "⋧";
var Gopf$1 = "𝔾";
var gopf$1 = "𝕘";
var grave$1 = "`";
var GreaterEqual$1 = "≥";
var GreaterEqualLess$1 = "⋛";
var GreaterFullEqual$1 = "≧";
var GreaterGreater$1 = "⪢";
var GreaterLess$1 = "≷";
var GreaterSlantEqual$1 = "⩾";
var GreaterTilde$1 = "≳";
var Gscr$1 = "𝒢";
var gscr$1 = "ℊ";
var gsim$1 = "≳";
var gsime$1 = "⪎";
var gsiml$1 = "⪐";
var gtcc$1 = "⪧";
var gtcir$1 = "⩺";
var gt$1$2 = ">";
var GT$1$1 = ">";
var Gt$1 = "≫";
var gtdot$1 = "⋗";
var gtlPar$1 = "⦕";
var gtquest$1 = "⩼";
var gtrapprox$1 = "⪆";
var gtrarr$1 = "⥸";
var gtrdot$1 = "⋗";
var gtreqless$1 = "⋛";
var gtreqqless$1 = "⪌";
var gtrless$1 = "≷";
var gtrsim$1 = "≳";
var gvertneqq$1 = "≩︀";
var gvnE$1 = "≩︀";
var Hacek$1 = "ˇ";
var hairsp$1 = " ";
var half$1 = "½";
var hamilt$1 = "ℋ";
var HARDcy$1 = "Ъ";
var hardcy$1 = "ъ";
var harrcir$1 = "⥈";
var harr$1 = "↔";
var hArr$1 = "⇔";
var harrw$1 = "↭";
var Hat$1 = "^";
var hbar$1 = "ℏ";
var Hcirc$1 = "Ĥ";
var hcirc$1 = "ĥ";
var hearts$1 = "♥";
var heartsuit$1 = "♥";
var hellip$1 = "…";
var hercon$1 = "⊹";
var hfr$1 = "𝔥";
var Hfr$1 = "ℌ";
var HilbertSpace$1 = "ℋ";
var hksearow$1 = "⤥";
var hkswarow$1 = "⤦";
var hoarr$1 = "⇿";
var homtht$1 = "∻";
var hookleftarrow$1 = "↩";
var hookrightarrow$1 = "↪";
var hopf$1 = "𝕙";
var Hopf$1 = "ℍ";
var horbar$1 = "―";
var HorizontalLine$1 = "─";
var hscr$1 = "𝒽";
var Hscr$1 = "ℋ";
var hslash$1 = "ℏ";
var Hstrok$1 = "Ħ";
var hstrok$1 = "ħ";
var HumpDownHump$1 = "≎";
var HumpEqual$1 = "≏";
var hybull$1 = "⁃";
var hyphen$1 = "‐";
var Iacute$1$1 = "Í";
var iacute$1$1 = "í";
var ic$1 = "⁣";
var Icirc$1$1 = "Î";
var icirc$1$1 = "î";
var Icy$1 = "И";
var icy$1 = "и";
var Idot$1 = "İ";
var IEcy$1 = "Е";
var iecy$1 = "е";
var iexcl$1$1 = "¡";
var iff$1 = "⇔";
var ifr$1 = "𝔦";
var Ifr$1 = "ℑ";
var Igrave$1$1 = "Ì";
var igrave$1$1 = "ì";
var ii$1 = "ⅈ";
var iiiint$1 = "⨌";
var iiint$1 = "∭";
var iinfin$1 = "⧜";
var iiota$1 = "℩";
var IJlig$1 = "Ĳ";
var ijlig$1 = "ĳ";
var Imacr$1 = "Ī";
var imacr$1 = "ī";
var image$1 = "ℑ";
var ImaginaryI$1 = "ⅈ";
var imagline$1 = "ℐ";
var imagpart$1 = "ℑ";
var imath$1 = "ı";
var Im$1 = "ℑ";
var imof$1 = "⊷";
var imped$1 = "Ƶ";
var Implies$1 = "⇒";
var incare$1 = "℅";
var infin$1 = "∞";
var infintie$1 = "⧝";
var inodot$1 = "ı";
var intcal$1 = "⊺";
var int$1 = "∫";
var Int$1 = "∬";
var integers$1 = "ℤ";
var Integral$1 = "∫";
var intercal$1 = "⊺";
var Intersection$1 = "⋂";
var intlarhk$1 = "⨗";
var intprod$1 = "⨼";
var InvisibleComma$1 = "⁣";
var InvisibleTimes$1 = "⁢";
var IOcy$1 = "Ё";
var iocy$1 = "ё";
var Iogon$1 = "Į";
var iogon$1 = "į";
var Iopf$1 = "𝕀";
var iopf$1 = "𝕚";
var Iota$1 = "Ι";
var iota$1 = "ι";
var iprod$1 = "⨼";
var iquest$1$1 = "¿";
var iscr$1 = "𝒾";
var Iscr$1 = "ℐ";
var isin$1 = "∈";
var isindot$1 = "⋵";
var isinE$1 = "⋹";
var isins$1 = "⋴";
var isinsv$1 = "⋳";
var isinv$1 = "∈";
var it$1 = "⁢";
var Itilde$1 = "Ĩ";
var itilde$1 = "ĩ";
var Iukcy$1 = "І";
var iukcy$1 = "і";
var Iuml$1$1 = "Ï";
var iuml$1$1 = "ï";
var Jcirc$1 = "Ĵ";
var jcirc$1 = "ĵ";
var Jcy$1 = "Й";
var jcy$1 = "й";
var Jfr$1 = "𝔍";
var jfr$1 = "𝔧";
var jmath$1 = "ȷ";
var Jopf$1 = "𝕁";
var jopf$1 = "𝕛";
var Jscr$1 = "𝒥";
var jscr$1 = "𝒿";
var Jsercy$1 = "Ј";
var jsercy$1 = "ј";
var Jukcy$1 = "Є";
var jukcy$1 = "є";
var Kappa$1 = "Κ";
var kappa$1 = "κ";
var kappav$1 = "ϰ";
var Kcedil$1 = "Ķ";
var kcedil$1 = "ķ";
var Kcy$1 = "К";
var kcy$1 = "к";
var Kfr$1 = "𝔎";
var kfr$1 = "𝔨";
var kgreen$1 = "ĸ";
var KHcy$1 = "Х";
var khcy$1 = "х";
var KJcy$1 = "Ќ";
var kjcy$1 = "ќ";
var Kopf$1 = "𝕂";
var kopf$1 = "𝕜";
var Kscr$1 = "𝒦";
var kscr$1 = "𝓀";
var lAarr$1 = "⇚";
var Lacute$1 = "Ĺ";
var lacute$1 = "ĺ";
var laemptyv$1 = "⦴";
var lagran$1 = "ℒ";
var Lambda$1 = "Λ";
var lambda$1 = "λ";
var lang$1 = "⟨";
var Lang$1 = "⟪";
var langd$1 = "⦑";
var langle$1 = "⟨";
var lap$1 = "⪅";
var Laplacetrf$1 = "ℒ";
var laquo$1$1 = "«";
var larrb$1 = "⇤";
var larrbfs$1 = "⤟";
var larr$1 = "←";
var Larr$1 = "↞";
var lArr$1 = "⇐";
var larrfs$1 = "⤝";
var larrhk$1 = "↩";
var larrlp$1 = "↫";
var larrpl$1 = "⤹";
var larrsim$1 = "⥳";
var larrtl$1 = "↢";
var latail$1 = "⤙";
var lAtail$1 = "⤛";
var lat$1 = "⪫";
var late$1 = "⪭";
var lates$1 = "⪭︀";
var lbarr$1 = "⤌";
var lBarr$1 = "⤎";
var lbbrk$1 = "❲";
var lbrace$1 = "{";
var lbrack$1 = "[";
var lbrke$1 = "⦋";
var lbrksld$1 = "⦏";
var lbrkslu$1 = "⦍";
var Lcaron$1 = "Ľ";
var lcaron$1 = "ľ";
var Lcedil$1 = "Ļ";
var lcedil$1 = "ļ";
var lceil$1 = "⌈";
var lcub$1 = "{";
var Lcy$1 = "Л";
var lcy$1 = "л";
var ldca$1 = "⤶";
var ldquo$1 = "“";
var ldquor$1 = "„";
var ldrdhar$1 = "⥧";
var ldrushar$1 = "⥋";
var ldsh$1 = "↲";
var le$1 = "≤";
var lE$1 = "≦";
var LeftAngleBracket$1 = "⟨";
var LeftArrowBar$1 = "⇤";
var leftarrow$1 = "←";
var LeftArrow$1 = "←";
var Leftarrow$1 = "⇐";
var LeftArrowRightArrow$1 = "⇆";
var leftarrowtail$1 = "↢";
var LeftCeiling$1 = "⌈";
var LeftDoubleBracket$1 = "⟦";
var LeftDownTeeVector$1 = "⥡";
var LeftDownVectorBar$1 = "⥙";
var LeftDownVector$1 = "⇃";
var LeftFloor$1 = "⌊";
var leftharpoondown$1 = "↽";
var leftharpoonup$1 = "↼";
var leftleftarrows$1 = "⇇";
var leftrightarrow$1 = "↔";
var LeftRightArrow$1 = "↔";
var Leftrightarrow$1 = "⇔";
var leftrightarrows$1 = "⇆";
var leftrightharpoons$1 = "⇋";
var leftrightsquigarrow$1 = "↭";
var LeftRightVector$1 = "⥎";
var LeftTeeArrow$1 = "↤";
var LeftTee$1 = "⊣";
var LeftTeeVector$1 = "⥚";
var leftthreetimes$1 = "⋋";
var LeftTriangleBar$1 = "⧏";
var LeftTriangle$1 = "⊲";
var LeftTriangleEqual$1 = "⊴";
var LeftUpDownVector$1 = "⥑";
var LeftUpTeeVector$1 = "⥠";
var LeftUpVectorBar$1 = "⥘";
var LeftUpVector$1 = "↿";
var LeftVectorBar$1 = "⥒";
var LeftVector$1 = "↼";
var lEg$1 = "⪋";
var leg$1 = "⋚";
var leq$1 = "≤";
var leqq$1 = "≦";
var leqslant$1 = "⩽";
var lescc$1 = "⪨";
var les$1 = "⩽";
var lesdot$1 = "⩿";
var lesdoto$1 = "⪁";
var lesdotor$1 = "⪃";
var lesg$1 = "⋚︀";
var lesges$1 = "⪓";
var lessapprox$1 = "⪅";
var lessdot$1 = "⋖";
var lesseqgtr$1 = "⋚";
var lesseqqgtr$1 = "⪋";
var LessEqualGreater$1 = "⋚";
var LessFullEqual$1 = "≦";
var LessGreater$1 = "≶";
var lessgtr$1 = "≶";
var LessLess$1 = "⪡";
var lesssim$1 = "≲";
var LessSlantEqual$1 = "⩽";
var LessTilde$1 = "≲";
var lfisht$1 = "⥼";
var lfloor$1 = "⌊";
var Lfr$1 = "𝔏";
var lfr$1 = "𝔩";
var lg$1 = "≶";
var lgE$1 = "⪑";
var lHar$1 = "⥢";
var lhard$1 = "↽";
var lharu$1 = "↼";
var lharul$1 = "⥪";
var lhblk$1 = "▄";
var LJcy$1 = "Љ";
var ljcy$1 = "љ";
var llarr$1 = "⇇";
var ll$1 = "≪";
var Ll$1 = "⋘";
var llcorner$1 = "⌞";
var Lleftarrow$1 = "⇚";
var llhard$1 = "⥫";
var lltri$1 = "◺";
var Lmidot$1 = "Ŀ";
var lmidot$1 = "ŀ";
var lmoustache$1 = "⎰";
var lmoust$1 = "⎰";
var lnap$1 = "⪉";
var lnapprox$1 = "⪉";
var lne$1 = "⪇";
var lnE$1 = "≨";
var lneq$1 = "⪇";
var lneqq$1 = "≨";
var lnsim$1 = "⋦";
var loang$1 = "⟬";
var loarr$1 = "⇽";
var lobrk$1 = "⟦";
var longleftarrow$1 = "⟵";
var LongLeftArrow$1 = "⟵";
var Longleftarrow$1 = "⟸";
var longleftrightarrow$1 = "⟷";
var LongLeftRightArrow$1 = "⟷";
var Longleftrightarrow$1 = "⟺";
var longmapsto$1 = "⟼";
var longrightarrow$1 = "⟶";
var LongRightArrow$1 = "⟶";
var Longrightarrow$1 = "⟹";
var looparrowleft$1 = "↫";
var looparrowright$1 = "↬";
var lopar$1 = "⦅";
var Lopf$1 = "𝕃";
var lopf$1 = "𝕝";
var loplus$1 = "⨭";
var lotimes$1 = "⨴";
var lowast$1 = "∗";
var lowbar$1 = "_";
var LowerLeftArrow$1 = "↙";
var LowerRightArrow$1 = "↘";
var loz$1 = "◊";
var lozenge$1 = "◊";
var lozf$1 = "⧫";
var lpar$1 = "(";
var lparlt$1 = "⦓";
var lrarr$1 = "⇆";
var lrcorner$1 = "⌟";
var lrhar$1 = "⇋";
var lrhard$1 = "⥭";
var lrm$1 = "‎";
var lrtri$1 = "⊿";
var lsaquo$1 = "‹";
var lscr$1 = "𝓁";
var Lscr$1 = "ℒ";
var lsh$1 = "↰";
var Lsh$1 = "↰";
var lsim$1 = "≲";
var lsime$1 = "⪍";
var lsimg$1 = "⪏";
var lsqb$1 = "[";
var lsquo$1 = "‘";
var lsquor$1 = "‚";
var Lstrok$1 = "Ł";
var lstrok$1 = "ł";
var ltcc$1 = "⪦";
var ltcir$1 = "⩹";
var lt$1$2 = "<";
var LT$1$1 = "<";
var Lt$1 = "≪";
var ltdot$1 = "⋖";
var lthree$1 = "⋋";
var ltimes$1 = "⋉";
var ltlarr$1 = "⥶";
var ltquest$1 = "⩻";
var ltri$1 = "◃";
var ltrie$1 = "⊴";
var ltrif$1 = "◂";
var ltrPar$1 = "⦖";
var lurdshar$1 = "⥊";
var luruhar$1 = "⥦";
var lvertneqq$1 = "≨︀";
var lvnE$1 = "≨︀";
var macr$1$1 = "¯";
var male$1 = "♂";
var malt$1 = "✠";
var maltese$1 = "✠";
var map$2 = "↦";
var mapsto$1 = "↦";
var mapstodown$1 = "↧";
var mapstoleft$1 = "↤";
var mapstoup$1 = "↥";
var marker$1 = "▮";
var mcomma$1 = "⨩";
var Mcy$1 = "М";
var mcy$1 = "м";
var mdash$1 = "—";
var mDDot$1 = "∺";
var measuredangle$1 = "∡";
var MediumSpace$1 = " ";
var Mellintrf$1 = "ℳ";
var Mfr$1 = "𝔐";
var mfr$1 = "𝔪";
var mho$1 = "℧";
var micro$1$1 = "µ";
var midast$1 = "*";
var midcir$1 = "⫰";
var mid$1 = "∣";
var middot$1$1 = "·";
var minusb$1 = "⊟";
var minus$1 = "−";
var minusd$1 = "∸";
var minusdu$1 = "⨪";
var MinusPlus$1 = "∓";
var mlcp$1 = "⫛";
var mldr$1 = "…";
var mnplus$1 = "∓";
var models$1 = "⊧";
var Mopf$1 = "𝕄";
var mopf$1 = "𝕞";
var mp$1 = "∓";
var mscr$1 = "𝓂";
var Mscr$1 = "ℳ";
var mstpos$1 = "∾";
var Mu$1 = "Μ";
var mu$1 = "μ";
var multimap$1 = "⊸";
var mumap$1 = "⊸";
var nabla$1 = "∇";
var Nacute$1 = "Ń";
var nacute$1 = "ń";
var nang$1 = "∠⃒";
var nap$1 = "≉";
var napE$1 = "⩰̸";
var napid$1 = "≋̸";
var napos$1 = "ŉ";
var napprox$1 = "≉";
var natural$1 = "♮";
var naturals$1 = "ℕ";
var natur$1 = "♮";
var nbsp$1$1 = " ";
var nbump$1 = "≎̸";
var nbumpe$1 = "≏̸";
var ncap$1 = "⩃";
var Ncaron$1 = "Ň";
var ncaron$1 = "ň";
var Ncedil$1 = "Ņ";
var ncedil$1 = "ņ";
var ncong$1 = "≇";
var ncongdot$1 = "⩭̸";
var ncup$1 = "⩂";
var Ncy$1 = "Н";
var ncy$1 = "н";
var ndash$1 = "–";
var nearhk$1 = "⤤";
var nearr$1 = "↗";
var neArr$1 = "⇗";
var nearrow$1 = "↗";
var ne$1 = "≠";
var nedot$1 = "≐̸";
var NegativeMediumSpace$1 = "​";
var NegativeThickSpace$1 = "​";
var NegativeThinSpace$1 = "​";
var NegativeVeryThinSpace$1 = "​";
var nequiv$1 = "≢";
var nesear$1 = "⤨";
var nesim$1 = "≂̸";
var NestedGreaterGreater$1 = "≫";
var NestedLessLess$1 = "≪";
var NewLine$1 = "\n";
var nexist$1 = "∄";
var nexists$1 = "∄";
var Nfr$1 = "𝔑";
var nfr$1 = "𝔫";
var ngE$1 = "≧̸";
var nge$1 = "≱";
var ngeq$1 = "≱";
var ngeqq$1 = "≧̸";
var ngeqslant$1 = "⩾̸";
var nges$1 = "⩾̸";
var nGg$1 = "⋙̸";
var ngsim$1 = "≵";
var nGt$1 = "≫⃒";
var ngt$1 = "≯";
var ngtr$1 = "≯";
var nGtv$1 = "≫̸";
var nharr$1 = "↮";
var nhArr$1 = "⇎";
var nhpar$1 = "⫲";
var ni$1 = "∋";
var nis$1 = "⋼";
var nisd$1 = "⋺";
var niv$1 = "∋";
var NJcy$1 = "Њ";
var njcy$1 = "њ";
var nlarr$1 = "↚";
var nlArr$1 = "⇍";
var nldr$1 = "‥";
var nlE$1 = "≦̸";
var nle$1 = "≰";
var nleftarrow$1 = "↚";
var nLeftarrow$1 = "⇍";
var nleftrightarrow$1 = "↮";
var nLeftrightarrow$1 = "⇎";
var nleq$1 = "≰";
var nleqq$1 = "≦̸";
var nleqslant$1 = "⩽̸";
var nles$1 = "⩽̸";
var nless$1 = "≮";
var nLl$1 = "⋘̸";
var nlsim$1 = "≴";
var nLt$1 = "≪⃒";
var nlt$1 = "≮";
var nltri$1 = "⋪";
var nltrie$1 = "⋬";
var nLtv$1 = "≪̸";
var nmid$1 = "∤";
var NoBreak$1 = "⁠";
var NonBreakingSpace$1 = " ";
var nopf$1 = "𝕟";
var Nopf$1 = "ℕ";
var Not$1 = "⫬";
var not$1$1 = "¬";
var NotCongruent$1 = "≢";
var NotCupCap$1 = "≭";
var NotDoubleVerticalBar$1 = "∦";
var NotElement$1 = "∉";
var NotEqual$1 = "≠";
var NotEqualTilde$1 = "≂̸";
var NotExists$1 = "∄";
var NotGreater$1 = "≯";
var NotGreaterEqual$1 = "≱";
var NotGreaterFullEqual$1 = "≧̸";
var NotGreaterGreater$1 = "≫̸";
var NotGreaterLess$1 = "≹";
var NotGreaterSlantEqual$1 = "⩾̸";
var NotGreaterTilde$1 = "≵";
var NotHumpDownHump$1 = "≎̸";
var NotHumpEqual$1 = "≏̸";
var notin$1 = "∉";
var notindot$1 = "⋵̸";
var notinE$1 = "⋹̸";
var notinva$1 = "∉";
var notinvb$1 = "⋷";
var notinvc$1 = "⋶";
var NotLeftTriangleBar$1 = "⧏̸";
var NotLeftTriangle$1 = "⋪";
var NotLeftTriangleEqual$1 = "⋬";
var NotLess$1 = "≮";
var NotLessEqual$1 = "≰";
var NotLessGreater$1 = "≸";
var NotLessLess$1 = "≪̸";
var NotLessSlantEqual$1 = "⩽̸";
var NotLessTilde$1 = "≴";
var NotNestedGreaterGreater$1 = "⪢̸";
var NotNestedLessLess$1 = "⪡̸";
var notni$1 = "∌";
var notniva$1 = "∌";
var notnivb$1 = "⋾";
var notnivc$1 = "⋽";
var NotPrecedes$1 = "⊀";
var NotPrecedesEqual$1 = "⪯̸";
var NotPrecedesSlantEqual$1 = "⋠";
var NotReverseElement$1 = "∌";
var NotRightTriangleBar$1 = "⧐̸";
var NotRightTriangle$1 = "⋫";
var NotRightTriangleEqual$1 = "⋭";
var NotSquareSubset$1 = "⊏̸";
var NotSquareSubsetEqual$1 = "⋢";
var NotSquareSuperset$1 = "⊐̸";
var NotSquareSupersetEqual$1 = "⋣";
var NotSubset$1 = "⊂⃒";
var NotSubsetEqual$1 = "⊈";
var NotSucceeds$1 = "⊁";
var NotSucceedsEqual$1 = "⪰̸";
var NotSucceedsSlantEqual$1 = "⋡";
var NotSucceedsTilde$1 = "≿̸";
var NotSuperset$1 = "⊃⃒";
var NotSupersetEqual$1 = "⊉";
var NotTilde$1 = "≁";
var NotTildeEqual$1 = "≄";
var NotTildeFullEqual$1 = "≇";
var NotTildeTilde$1 = "≉";
var NotVerticalBar$1 = "∤";
var nparallel$1 = "∦";
var npar$1 = "∦";
var nparsl$1 = "⫽⃥";
var npart$1 = "∂̸";
var npolint$1 = "⨔";
var npr$1 = "⊀";
var nprcue$1 = "⋠";
var nprec$1 = "⊀";
var npreceq$1 = "⪯̸";
var npre$1 = "⪯̸";
var nrarrc$1 = "⤳̸";
var nrarr$1 = "↛";
var nrArr$1 = "⇏";
var nrarrw$1 = "↝̸";
var nrightarrow$1 = "↛";
var nRightarrow$1 = "⇏";
var nrtri$1 = "⋫";
var nrtrie$1 = "⋭";
var nsc$1 = "⊁";
var nsccue$1 = "⋡";
var nsce$1 = "⪰̸";
var Nscr$1 = "𝒩";
var nscr$1 = "𝓃";
var nshortmid$1 = "∤";
var nshortparallel$1 = "∦";
var nsim$1 = "≁";
var nsime$1 = "≄";
var nsimeq$1 = "≄";
var nsmid$1 = "∤";
var nspar$1 = "∦";
var nsqsube$1 = "⋢";
var nsqsupe$1 = "⋣";
var nsub$1 = "⊄";
var nsubE$1 = "⫅̸";
var nsube$1 = "⊈";
var nsubset$1 = "⊂⃒";
var nsubseteq$1 = "⊈";
var nsubseteqq$1 = "⫅̸";
var nsucc$1 = "⊁";
var nsucceq$1 = "⪰̸";
var nsup$1 = "⊅";
var nsupE$1 = "⫆̸";
var nsupe$1 = "⊉";
var nsupset$1 = "⊃⃒";
var nsupseteq$1 = "⊉";
var nsupseteqq$1 = "⫆̸";
var ntgl$1 = "≹";
var Ntilde$1$1 = "Ñ";
var ntilde$1$1 = "ñ";
var ntlg$1 = "≸";
var ntriangleleft$1 = "⋪";
var ntrianglelefteq$1 = "⋬";
var ntriangleright$1 = "⋫";
var ntrianglerighteq$1 = "⋭";
var Nu$1 = "Ν";
var nu$1 = "ν";
var num$1 = "#";
var numero$1 = "№";
var numsp$1 = " ";
var nvap$1 = "≍⃒";
var nvdash$1 = "⊬";
var nvDash$1 = "⊭";
var nVdash$1 = "⊮";
var nVDash$1 = "⊯";
var nvge$1 = "≥⃒";
var nvgt$1 = ">⃒";
var nvHarr$1 = "⤄";
var nvinfin$1 = "⧞";
var nvlArr$1 = "⤂";
var nvle$1 = "≤⃒";
var nvlt$1 = "<⃒";
var nvltrie$1 = "⊴⃒";
var nvrArr$1 = "⤃";
var nvrtrie$1 = "⊵⃒";
var nvsim$1 = "∼⃒";
var nwarhk$1 = "⤣";
var nwarr$1 = "↖";
var nwArr$1 = "⇖";
var nwarrow$1 = "↖";
var nwnear$1 = "⤧";
var Oacute$1$1 = "Ó";
var oacute$1$1 = "ó";
var oast$1 = "⊛";
var Ocirc$1$1 = "Ô";
var ocirc$1$1 = "ô";
var ocir$1 = "⊚";
var Ocy$1 = "О";
var ocy$1 = "о";
var odash$1 = "⊝";
var Odblac$1 = "Ő";
var odblac$1 = "ő";
var odiv$1 = "⨸";
var odot$1 = "⊙";
var odsold$1 = "⦼";
var OElig$1 = "Œ";
var oelig$1 = "œ";
var ofcir$1 = "⦿";
var Ofr$1 = "𝔒";
var ofr$1 = "𝔬";
var ogon$1 = "˛";
var Ograve$1$1 = "Ò";
var ograve$1$1 = "ò";
var ogt$1 = "⧁";
var ohbar$1 = "⦵";
var ohm$1 = "Ω";
var oint$1 = "∮";
var olarr$1 = "↺";
var olcir$1 = "⦾";
var olcross$1 = "⦻";
var oline$1 = "‾";
var olt$1 = "⧀";
var Omacr$1 = "Ō";
var omacr$1 = "ō";
var Omega$1 = "Ω";
var omega$1 = "ω";
var Omicron$1 = "Ο";
var omicron$1 = "ο";
var omid$1 = "⦶";
var ominus$1 = "⊖";
var Oopf$1 = "𝕆";
var oopf$1 = "𝕠";
var opar$1 = "⦷";
var OpenCurlyDoubleQuote$1 = "“";
var OpenCurlyQuote$1 = "‘";
var operp$1 = "⦹";
var oplus$1 = "⊕";
var orarr$1 = "↻";
var Or$1 = "⩔";
var or$1 = "∨";
var ord$1 = "⩝";
var order$1 = "ℴ";
var orderof$1 = "ℴ";
var ordf$1$1 = "ª";
var ordm$1$1 = "º";
var origof$1 = "⊶";
var oror$1 = "⩖";
var orslope$1 = "⩗";
var orv$1 = "⩛";
var oS$1 = "Ⓢ";
var Oscr$1 = "𝒪";
var oscr$1 = "ℴ";
var Oslash$1$1 = "Ø";
var oslash$1$1 = "ø";
var osol$1 = "⊘";
var Otilde$1$1 = "Õ";
var otilde$1$1 = "õ";
var otimesas$1 = "⨶";
var Otimes$1 = "⨷";
var otimes$1 = "⊗";
var Ouml$1$1 = "Ö";
var ouml$1$1 = "ö";
var ovbar$1 = "⌽";
var OverBar$1 = "‾";
var OverBrace$1 = "⏞";
var OverBracket$1 = "⎴";
var OverParenthesis$1 = "⏜";
var para$1$1 = "¶";
var parallel$1 = "∥";
var par$1 = "∥";
var parsim$1 = "⫳";
var parsl$1 = "⫽";
var part$1 = "∂";
var PartialD$1 = "∂";
var Pcy$1 = "П";
var pcy$1 = "п";
var percnt$1 = "%";
var period$1 = ".";
var permil$1 = "‰";
var perp$1 = "⊥";
var pertenk$1 = "‱";
var Pfr$1 = "𝔓";
var pfr$1 = "𝔭";
var Phi$1 = "Φ";
var phi$1 = "φ";
var phiv$1 = "ϕ";
var phmmat$1 = "ℳ";
var phone$1 = "☎";
var Pi$1 = "Π";
var pi$1 = "π";
var pitchfork$1 = "⋔";
var piv$1 = "ϖ";
var planck$1 = "ℏ";
var planckh$1 = "ℎ";
var plankv$1 = "ℏ";
var plusacir$1 = "⨣";
var plusb$1 = "⊞";
var pluscir$1 = "⨢";
var plus$1 = "+";
var plusdo$1 = "∔";
var plusdu$1 = "⨥";
var pluse$1 = "⩲";
var PlusMinus$1 = "±";
var plusmn$1$1 = "±";
var plussim$1 = "⨦";
var plustwo$1 = "⨧";
var pm$1 = "±";
var Poincareplane$1 = "ℌ";
var pointint$1 = "⨕";
var popf$1 = "𝕡";
var Popf$1 = "ℙ";
var pound$1$1 = "£";
var prap$1 = "⪷";
var Pr$1 = "⪻";
var pr$1 = "≺";
var prcue$1 = "≼";
var precapprox$1 = "⪷";
var prec$1 = "≺";
var preccurlyeq$1 = "≼";
var Precedes$1 = "≺";
var PrecedesEqual$1 = "⪯";
var PrecedesSlantEqual$1 = "≼";
var PrecedesTilde$1 = "≾";
var preceq$1 = "⪯";
var precnapprox$1 = "⪹";
var precneqq$1 = "⪵";
var precnsim$1 = "⋨";
var pre$1 = "⪯";
var prE$1 = "⪳";
var precsim$1 = "≾";
var prime$1 = "′";
var Prime$1 = "″";
var primes$1 = "ℙ";
var prnap$1 = "⪹";
var prnE$1 = "⪵";
var prnsim$1 = "⋨";
var prod$1 = "∏";
var Product$1 = "∏";
var profalar$1 = "⌮";
var profline$1 = "⌒";
var profsurf$1 = "⌓";
var prop$1 = "∝";
var Proportional$1 = "∝";
var Proportion$1 = "∷";
var propto$1 = "∝";
var prsim$1 = "≾";
var prurel$1 = "⊰";
var Pscr$1 = "𝒫";
var pscr$1 = "𝓅";
var Psi$1 = "Ψ";
var psi$1 = "ψ";
var puncsp$1 = " ";
var Qfr$1 = "𝔔";
var qfr$1 = "𝔮";
var qint$1 = "⨌";
var qopf$1 = "𝕢";
var Qopf$1 = "ℚ";
var qprime$1 = "⁗";
var Qscr$1 = "𝒬";
var qscr$1 = "𝓆";
var quaternions$1 = "ℍ";
var quatint$1 = "⨖";
var quest$1 = "?";
var questeq$1 = "≟";
var quot$1$2 = "\"";
var QUOT$1$1 = "\"";
var rAarr$1 = "⇛";
var race$1 = "∽̱";
var Racute$1 = "Ŕ";
var racute$1 = "ŕ";
var radic$1 = "√";
var raemptyv$1 = "⦳";
var rang$1 = "⟩";
var Rang$1 = "⟫";
var rangd$1 = "⦒";
var range$1 = "⦥";
var rangle$1 = "⟩";
var raquo$1$1 = "»";
var rarrap$1 = "⥵";
var rarrb$1 = "⇥";
var rarrbfs$1 = "⤠";
var rarrc$1 = "⤳";
var rarr$1 = "→";
var Rarr$1 = "↠";
var rArr$1 = "⇒";
var rarrfs$1 = "⤞";
var rarrhk$1 = "↪";
var rarrlp$1 = "↬";
var rarrpl$1 = "⥅";
var rarrsim$1 = "⥴";
var Rarrtl$1 = "⤖";
var rarrtl$1 = "↣";
var rarrw$1 = "↝";
var ratail$1 = "⤚";
var rAtail$1 = "⤜";
var ratio$1 = "∶";
var rationals$1 = "ℚ";
var rbarr$1 = "⤍";
var rBarr$1 = "⤏";
var RBarr$1 = "⤐";
var rbbrk$1 = "❳";
var rbrace$1 = "}";
var rbrack$1 = "]";
var rbrke$1 = "⦌";
var rbrksld$1 = "⦎";
var rbrkslu$1 = "⦐";
var Rcaron$1 = "Ř";
var rcaron$1 = "ř";
var Rcedil$1 = "Ŗ";
var rcedil$1 = "ŗ";
var rceil$1 = "⌉";
var rcub$1 = "}";
var Rcy$1 = "Р";
var rcy$1 = "р";
var rdca$1 = "⤷";
var rdldhar$1 = "⥩";
var rdquo$1 = "”";
var rdquor$1 = "”";
var rdsh$1 = "↳";
var real$1 = "ℜ";
var realine$1 = "ℛ";
var realpart$1 = "ℜ";
var reals$1 = "ℝ";
var Re$1 = "ℜ";
var rect$1 = "▭";
var reg$1$1 = "®";
var REG$1$1 = "®";
var ReverseElement$1 = "∋";
var ReverseEquilibrium$1 = "⇋";
var ReverseUpEquilibrium$1 = "⥯";
var rfisht$1 = "⥽";
var rfloor$1 = "⌋";
var rfr$1 = "𝔯";
var Rfr$1 = "ℜ";
var rHar$1 = "⥤";
var rhard$1 = "⇁";
var rharu$1 = "⇀";
var rharul$1 = "⥬";
var Rho$1 = "Ρ";
var rho$1 = "ρ";
var rhov$1 = "ϱ";
var RightAngleBracket$1 = "⟩";
var RightArrowBar$1 = "⇥";
var rightarrow$1 = "→";
var RightArrow$1 = "→";
var Rightarrow$1 = "⇒";
var RightArrowLeftArrow$1 = "⇄";
var rightarrowtail$1 = "↣";
var RightCeiling$1 = "⌉";
var RightDoubleBracket$1 = "⟧";
var RightDownTeeVector$1 = "⥝";
var RightDownVectorBar$1 = "⥕";
var RightDownVector$1 = "⇂";
var RightFloor$1 = "⌋";
var rightharpoondown$1 = "⇁";
var rightharpoonup$1 = "⇀";
var rightleftarrows$1 = "⇄";
var rightleftharpoons$1 = "⇌";
var rightrightarrows$1 = "⇉";
var rightsquigarrow$1 = "↝";
var RightTeeArrow$1 = "↦";
var RightTee$1 = "⊢";
var RightTeeVector$1 = "⥛";
var rightthreetimes$1 = "⋌";
var RightTriangleBar$1 = "⧐";
var RightTriangle$1 = "⊳";
var RightTriangleEqual$1 = "⊵";
var RightUpDownVector$1 = "⥏";
var RightUpTeeVector$1 = "⥜";
var RightUpVectorBar$1 = "⥔";
var RightUpVector$1 = "↾";
var RightVectorBar$1 = "⥓";
var RightVector$1 = "⇀";
var ring$1 = "˚";
var risingdotseq$1 = "≓";
var rlarr$1 = "⇄";
var rlhar$1 = "⇌";
var rlm$1 = "‏";
var rmoustache$1 = "⎱";
var rmoust$1 = "⎱";
var rnmid$1 = "⫮";
var roang$1 = "⟭";
var roarr$1 = "⇾";
var robrk$1 = "⟧";
var ropar$1 = "⦆";
var ropf$1 = "𝕣";
var Ropf$1 = "ℝ";
var roplus$1 = "⨮";
var rotimes$1 = "⨵";
var RoundImplies$1 = "⥰";
var rpar$1 = ")";
var rpargt$1 = "⦔";
var rppolint$1 = "⨒";
var rrarr$1 = "⇉";
var Rrightarrow$1 = "⇛";
var rsaquo$1 = "›";
var rscr$1 = "𝓇";
var Rscr$1 = "ℛ";
var rsh$1 = "↱";
var Rsh$1 = "↱";
var rsqb$1 = "]";
var rsquo$1 = "’";
var rsquor$1 = "’";
var rthree$1 = "⋌";
var rtimes$1 = "⋊";
var rtri$1 = "▹";
var rtrie$1 = "⊵";
var rtrif$1 = "▸";
var rtriltri$1 = "⧎";
var RuleDelayed$1 = "⧴";
var ruluhar$1 = "⥨";
var rx$1 = "℞";
var Sacute$1 = "Ś";
var sacute$1 = "ś";
var sbquo$1 = "‚";
var scap$1 = "⪸";
var Scaron$1 = "Š";
var scaron$1 = "š";
var Sc$1 = "⪼";
var sc$1 = "≻";
var sccue$1 = "≽";
var sce$1 = "⪰";
var scE$1 = "⪴";
var Scedil$1 = "Ş";
var scedil$1 = "ş";
var Scirc$1 = "Ŝ";
var scirc$1 = "ŝ";
var scnap$1 = "⪺";
var scnE$1 = "⪶";
var scnsim$1 = "⋩";
var scpolint$1 = "⨓";
var scsim$1 = "≿";
var Scy$1 = "С";
var scy$1 = "с";
var sdotb$1 = "⊡";
var sdot$1 = "⋅";
var sdote$1 = "⩦";
var searhk$1 = "⤥";
var searr$1 = "↘";
var seArr$1 = "⇘";
var searrow$1 = "↘";
var sect$1$1 = "§";
var semi$1 = ";";
var seswar$1 = "⤩";
var setminus$1 = "∖";
var setmn$1 = "∖";
var sext$1 = "✶";
var Sfr$1 = "𝔖";
var sfr$1 = "𝔰";
var sfrown$1 = "⌢";
var sharp$1 = "♯";
var SHCHcy$1 = "Щ";
var shchcy$1 = "щ";
var SHcy$1 = "Ш";
var shcy$1 = "ш";
var ShortDownArrow$1 = "↓";
var ShortLeftArrow$1 = "←";
var shortmid$1 = "∣";
var shortparallel$1 = "∥";
var ShortRightArrow$1 = "→";
var ShortUpArrow$1 = "↑";
var shy$1$1 = "­";
var Sigma$1 = "Σ";
var sigma$1 = "σ";
var sigmaf$1 = "ς";
var sigmav$1 = "ς";
var sim$1 = "∼";
var simdot$1 = "⩪";
var sime$1 = "≃";
var simeq$1 = "≃";
var simg$1 = "⪞";
var simgE$1 = "⪠";
var siml$1 = "⪝";
var simlE$1 = "⪟";
var simne$1 = "≆";
var simplus$1 = "⨤";
var simrarr$1 = "⥲";
var slarr$1 = "←";
var SmallCircle$1 = "∘";
var smallsetminus$1 = "∖";
var smashp$1 = "⨳";
var smeparsl$1 = "⧤";
var smid$1 = "∣";
var smile$1 = "⌣";
var smt$1 = "⪪";
var smte$1 = "⪬";
var smtes$1 = "⪬︀";
var SOFTcy$1 = "Ь";
var softcy$1 = "ь";
var solbar$1 = "⌿";
var solb$1 = "⧄";
var sol$1 = "/";
var Sopf$1 = "𝕊";
var sopf$1 = "𝕤";
var spades$1 = "♠";
var spadesuit$1 = "♠";
var spar$1 = "∥";
var sqcap$1 = "⊓";
var sqcaps$1 = "⊓︀";
var sqcup$1 = "⊔";
var sqcups$1 = "⊔︀";
var Sqrt$1 = "√";
var sqsub$1 = "⊏";
var sqsube$1 = "⊑";
var sqsubset$1 = "⊏";
var sqsubseteq$1 = "⊑";
var sqsup$1 = "⊐";
var sqsupe$1 = "⊒";
var sqsupset$1 = "⊐";
var sqsupseteq$1 = "⊒";
var square$1 = "□";
var Square$1 = "□";
var SquareIntersection$1 = "⊓";
var SquareSubset$1 = "⊏";
var SquareSubsetEqual$1 = "⊑";
var SquareSuperset$1 = "⊐";
var SquareSupersetEqual$1 = "⊒";
var SquareUnion$1 = "⊔";
var squarf$1 = "▪";
var squ$1 = "□";
var squf$1 = "▪";
var srarr$1 = "→";
var Sscr$1 = "𝒮";
var sscr$1 = "𝓈";
var ssetmn$1 = "∖";
var ssmile$1 = "⌣";
var sstarf$1 = "⋆";
var Star$1 = "⋆";
var star$1 = "☆";
var starf$1 = "★";
var straightepsilon$1 = "ϵ";
var straightphi$1 = "ϕ";
var strns$1 = "¯";
var sub$1 = "⊂";
var Sub$1 = "⋐";
var subdot$1 = "⪽";
var subE$1 = "⫅";
var sube$1 = "⊆";
var subedot$1 = "⫃";
var submult$1 = "⫁";
var subnE$1 = "⫋";
var subne$1 = "⊊";
var subplus$1 = "⪿";
var subrarr$1 = "⥹";
var subset$1 = "⊂";
var Subset$1 = "⋐";
var subseteq$1 = "⊆";
var subseteqq$1 = "⫅";
var SubsetEqual$1 = "⊆";
var subsetneq$1 = "⊊";
var subsetneqq$1 = "⫋";
var subsim$1 = "⫇";
var subsub$1 = "⫕";
var subsup$1 = "⫓";
var succapprox$1 = "⪸";
var succ$1 = "≻";
var succcurlyeq$1 = "≽";
var Succeeds$1 = "≻";
var SucceedsEqual$1 = "⪰";
var SucceedsSlantEqual$1 = "≽";
var SucceedsTilde$1 = "≿";
var succeq$1 = "⪰";
var succnapprox$1 = "⪺";
var succneqq$1 = "⪶";
var succnsim$1 = "⋩";
var succsim$1 = "≿";
var SuchThat$1 = "∋";
var sum$1 = "∑";
var Sum$1 = "∑";
var sung$1 = "♪";
var sup1$1$1 = "¹";
var sup2$1$1 = "²";
var sup3$1$1 = "³";
var sup$1 = "⊃";
var Sup$1 = "⋑";
var supdot$1 = "⪾";
var supdsub$1 = "⫘";
var supE$1 = "⫆";
var supe$1 = "⊇";
var supedot$1 = "⫄";
var Superset$1 = "⊃";
var SupersetEqual$1 = "⊇";
var suphsol$1 = "⟉";
var suphsub$1 = "⫗";
var suplarr$1 = "⥻";
var supmult$1 = "⫂";
var supnE$1 = "⫌";
var supne$1 = "⊋";
var supplus$1 = "⫀";
var supset$1 = "⊃";
var Supset$1 = "⋑";
var supseteq$1 = "⊇";
var supseteqq$1 = "⫆";
var supsetneq$1 = "⊋";
var supsetneqq$1 = "⫌";
var supsim$1 = "⫈";
var supsub$1 = "⫔";
var supsup$1 = "⫖";
var swarhk$1 = "⤦";
var swarr$1 = "↙";
var swArr$1 = "⇙";
var swarrow$1 = "↙";
var swnwar$1 = "⤪";
var szlig$1$1 = "ß";
var Tab$1 = "\t";
var target$1 = "⌖";
var Tau$1 = "Τ";
var tau$1 = "τ";
var tbrk$1 = "⎴";
var Tcaron$1 = "Ť";
var tcaron$1 = "ť";
var Tcedil$1 = "Ţ";
var tcedil$1 = "ţ";
var Tcy$1 = "Т";
var tcy$1 = "т";
var tdot$1 = "⃛";
var telrec$1 = "⌕";
var Tfr$1 = "𝔗";
var tfr$1 = "𝔱";
var there4$1 = "∴";
var therefore$1 = "∴";
var Therefore$1 = "∴";
var Theta$1 = "Θ";
var theta$1 = "θ";
var thetasym$1 = "ϑ";
var thetav$1 = "ϑ";
var thickapprox$1 = "≈";
var thicksim$1 = "∼";
var ThickSpace$1 = "  ";
var ThinSpace$1 = " ";
var thinsp$1 = " ";
var thkap$1 = "≈";
var thksim$1 = "∼";
var THORN$1$1 = "Þ";
var thorn$1$1 = "þ";
var tilde$1 = "˜";
var Tilde$1 = "∼";
var TildeEqual$1 = "≃";
var TildeFullEqual$1 = "≅";
var TildeTilde$1 = "≈";
var timesbar$1 = "⨱";
var timesb$1 = "⊠";
var times$2 = "×";
var timesd$1 = "⨰";
var tint$1 = "∭";
var toea$1 = "⤨";
var topbot$1 = "⌶";
var topcir$1 = "⫱";
var top$1 = "⊤";
var Topf$1 = "𝕋";
var topf$1 = "𝕥";
var topfork$1 = "⫚";
var tosa$1 = "⤩";
var tprime$1 = "‴";
var trade$1 = "™";
var TRADE$1 = "™";
var triangle$1 = "▵";
var triangledown$1 = "▿";
var triangleleft$1 = "◃";
var trianglelefteq$1 = "⊴";
var triangleq$1 = "≜";
var triangleright$1 = "▹";
var trianglerighteq$1 = "⊵";
var tridot$1 = "◬";
var trie$1 = "≜";
var triminus$1 = "⨺";
var TripleDot$1 = "⃛";
var triplus$1 = "⨹";
var trisb$1 = "⧍";
var tritime$1 = "⨻";
var trpezium$1 = "⏢";
var Tscr$1 = "𝒯";
var tscr$1 = "𝓉";
var TScy$1 = "Ц";
var tscy$1 = "ц";
var TSHcy$1 = "Ћ";
var tshcy$1 = "ћ";
var Tstrok$1 = "Ŧ";
var tstrok$1 = "ŧ";
var twixt$1 = "≬";
var twoheadleftarrow$1 = "↞";
var twoheadrightarrow$1 = "↠";
var Uacute$1$1 = "Ú";
var uacute$1$1 = "ú";
var uarr$1 = "↑";
var Uarr$1 = "↟";
var uArr$1 = "⇑";
var Uarrocir$1 = "⥉";
var Ubrcy$1 = "Ў";
var ubrcy$1 = "ў";
var Ubreve$1 = "Ŭ";
var ubreve$1 = "ŭ";
var Ucirc$1$1 = "Û";
var ucirc$1$1 = "û";
var Ucy$1 = "У";
var ucy$1 = "у";
var udarr$1 = "⇅";
var Udblac$1 = "Ű";
var udblac$1 = "ű";
var udhar$1 = "⥮";
var ufisht$1 = "⥾";
var Ufr$1 = "𝔘";
var ufr$1 = "𝔲";
var Ugrave$1$1 = "Ù";
var ugrave$1$1 = "ù";
var uHar$1 = "⥣";
var uharl$1 = "↿";
var uharr$1 = "↾";
var uhblk$1 = "▀";
var ulcorn$1 = "⌜";
var ulcorner$1 = "⌜";
var ulcrop$1 = "⌏";
var ultri$1 = "◸";
var Umacr$1 = "Ū";
var umacr$1 = "ū";
var uml$1$1 = "¨";
var UnderBar$1 = "_";
var UnderBrace$1 = "⏟";
var UnderBracket$1 = "⎵";
var UnderParenthesis$1 = "⏝";
var Union$1 = "⋃";
var UnionPlus$1 = "⊎";
var Uogon$1 = "Ų";
var uogon$1 = "ų";
var Uopf$1 = "𝕌";
var uopf$1 = "𝕦";
var UpArrowBar$1 = "⤒";
var uparrow$1 = "↑";
var UpArrow$1 = "↑";
var Uparrow$1 = "⇑";
var UpArrowDownArrow$1 = "⇅";
var updownarrow$1 = "↕";
var UpDownArrow$1 = "↕";
var Updownarrow$1 = "⇕";
var UpEquilibrium$1 = "⥮";
var upharpoonleft$1 = "↿";
var upharpoonright$1 = "↾";
var uplus$1 = "⊎";
var UpperLeftArrow$1 = "↖";
var UpperRightArrow$1 = "↗";
var upsi$1 = "υ";
var Upsi$1 = "ϒ";
var upsih$1 = "ϒ";
var Upsilon$1 = "Υ";
var upsilon$1 = "υ";
var UpTeeArrow$1 = "↥";
var UpTee$1 = "⊥";
var upuparrows$1 = "⇈";
var urcorn$1 = "⌝";
var urcorner$1 = "⌝";
var urcrop$1 = "⌎";
var Uring$1 = "Ů";
var uring$1 = "ů";
var urtri$1 = "◹";
var Uscr$1 = "𝒰";
var uscr$1 = "𝓊";
var utdot$1 = "⋰";
var Utilde$1 = "Ũ";
var utilde$1 = "ũ";
var utri$1 = "▵";
var utrif$1 = "▴";
var uuarr$1 = "⇈";
var Uuml$1$1 = "Ü";
var uuml$1$1 = "ü";
var uwangle$1 = "⦧";
var vangrt$1 = "⦜";
var varepsilon$1 = "ϵ";
var varkappa$1 = "ϰ";
var varnothing$1 = "∅";
var varphi$1 = "ϕ";
var varpi$1 = "ϖ";
var varpropto$1 = "∝";
var varr$1 = "↕";
var vArr$1 = "⇕";
var varrho$1 = "ϱ";
var varsigma$1 = "ς";
var varsubsetneq$1 = "⊊︀";
var varsubsetneqq$1 = "⫋︀";
var varsupsetneq$1 = "⊋︀";
var varsupsetneqq$1 = "⫌︀";
var vartheta$1 = "ϑ";
var vartriangleleft$1 = "⊲";
var vartriangleright$1 = "⊳";
var vBar$1 = "⫨";
var Vbar$1 = "⫫";
var vBarv$1 = "⫩";
var Vcy$1 = "В";
var vcy$1 = "в";
var vdash$1 = "⊢";
var vDash$1 = "⊨";
var Vdash$1 = "⊩";
var VDash$1 = "⊫";
var Vdashl$1 = "⫦";
var veebar$1 = "⊻";
var vee$1 = "∨";
var Vee$1 = "⋁";
var veeeq$1 = "≚";
var vellip$1 = "⋮";
var verbar$1 = "|";
var Verbar$1 = "‖";
var vert$1 = "|";
var Vert$1 = "‖";
var VerticalBar$1 = "∣";
var VerticalLine$1 = "|";
var VerticalSeparator$1 = "❘";
var VerticalTilde$1 = "≀";
var VeryThinSpace$1 = " ";
var Vfr$1 = "𝔙";
var vfr$1 = "𝔳";
var vltri$1 = "⊲";
var vnsub$1 = "⊂⃒";
var vnsup$1 = "⊃⃒";
var Vopf$1 = "𝕍";
var vopf$1 = "𝕧";
var vprop$1 = "∝";
var vrtri$1 = "⊳";
var Vscr$1 = "𝒱";
var vscr$1 = "𝓋";
var vsubnE$1 = "⫋︀";
var vsubne$1 = "⊊︀";
var vsupnE$1 = "⫌︀";
var vsupne$1 = "⊋︀";
var Vvdash$1 = "⊪";
var vzigzag$1 = "⦚";
var Wcirc$1 = "Ŵ";
var wcirc$1 = "ŵ";
var wedbar$1 = "⩟";
var wedge$1 = "∧";
var Wedge$1 = "⋀";
var wedgeq$1 = "≙";
var weierp$1 = "℘";
var Wfr$1 = "𝔚";
var wfr$1 = "𝔴";
var Wopf$1 = "𝕎";
var wopf$1 = "𝕨";
var wp$1 = "℘";
var wr$1 = "≀";
var wreath$1 = "≀";
var Wscr$1 = "𝒲";
var wscr$1 = "𝓌";
var xcap$1 = "⋂";
var xcirc$1 = "◯";
var xcup$1 = "⋃";
var xdtri$1 = "▽";
var Xfr$1 = "𝔛";
var xfr$1 = "𝔵";
var xharr$1 = "⟷";
var xhArr$1 = "⟺";
var Xi$1 = "Ξ";
var xi$1 = "ξ";
var xlarr$1 = "⟵";
var xlArr$1 = "⟸";
var xmap$1 = "⟼";
var xnis$1 = "⋻";
var xodot$1 = "⨀";
var Xopf$1 = "𝕏";
var xopf$1 = "𝕩";
var xoplus$1 = "⨁";
var xotime$1 = "⨂";
var xrarr$1 = "⟶";
var xrArr$1 = "⟹";
var Xscr$1 = "𝒳";
var xscr$1 = "𝓍";
var xsqcup$1 = "⨆";
var xuplus$1 = "⨄";
var xutri$1 = "△";
var xvee$1 = "⋁";
var xwedge$1 = "⋀";
var Yacute$1$1 = "Ý";
var yacute$1$1 = "ý";
var YAcy$1 = "Я";
var yacy$1 = "я";
var Ycirc$1 = "Ŷ";
var ycirc$1 = "ŷ";
var Ycy$1 = "Ы";
var ycy$1 = "ы";
var yen$1$1 = "¥";
var Yfr$1 = "𝔜";
var yfr$1 = "𝔶";
var YIcy$1 = "Ї";
var yicy$1 = "ї";
var Yopf$1 = "𝕐";
var yopf$1 = "𝕪";
var Yscr$1 = "𝒴";
var yscr$1 = "𝓎";
var YUcy$1 = "Ю";
var yucy$1 = "ю";
var yuml$1$1 = "ÿ";
var Yuml$1 = "Ÿ";
var Zacute$1 = "Ź";
var zacute$1 = "ź";
var Zcaron$1 = "Ž";
var zcaron$1 = "ž";
var Zcy$1 = "З";
var zcy$1 = "з";
var Zdot$1 = "Ż";
var zdot$1 = "ż";
var zeetrf$1 = "ℨ";
var ZeroWidthSpace$1 = "​";
var Zeta$1 = "Ζ";
var zeta$1 = "ζ";
var zfr$1 = "𝔷";
var Zfr$1 = "ℨ";
var ZHcy$1 = "Ж";
var zhcy$1 = "ж";
var zigrarr$1 = "⇝";
var zopf$1 = "𝕫";
var Zopf$1 = "ℤ";
var Zscr$1 = "𝒵";
var zscr$1 = "𝓏";
var zwj$1 = "‍";
var zwnj$1 = "‌";
var entitiesJSON$1 = {
	Aacute: Aacute$1$1,
	aacute: aacute$1$1,
	Abreve: Abreve$1,
	abreve: abreve$1,
	ac: ac$1,
	acd: acd$1,
	acE: acE$1,
	Acirc: Acirc$1$1,
	acirc: acirc$1$1,
	acute: acute$1$1,
	Acy: Acy$1,
	acy: acy$1,
	AElig: AElig$1$1,
	aelig: aelig$1$1,
	af: af$1,
	Afr: Afr$1,
	afr: afr$1,
	Agrave: Agrave$1$1,
	agrave: agrave$1$1,
	alefsym: alefsym$1,
	aleph: aleph$1,
	Alpha: Alpha$1,
	alpha: alpha$1,
	Amacr: Amacr$1,
	amacr: amacr$1,
	amalg: amalg$1,
	amp: amp$1$2,
	AMP: AMP$1$1,
	andand: andand$1,
	And: And$1,
	and: and$1,
	andd: andd$1,
	andslope: andslope$1,
	andv: andv$1,
	ang: ang$1,
	ange: ange$1,
	angle: angle$1,
	angmsdaa: angmsdaa$1,
	angmsdab: angmsdab$1,
	angmsdac: angmsdac$1,
	angmsdad: angmsdad$1,
	angmsdae: angmsdae$1,
	angmsdaf: angmsdaf$1,
	angmsdag: angmsdag$1,
	angmsdah: angmsdah$1,
	angmsd: angmsd$1,
	angrt: angrt$1,
	angrtvb: angrtvb$1,
	angrtvbd: angrtvbd$1,
	angsph: angsph$1,
	angst: angst$1,
	angzarr: angzarr$1,
	Aogon: Aogon$1,
	aogon: aogon$1,
	Aopf: Aopf$1,
	aopf: aopf$1,
	apacir: apacir$1,
	ap: ap$1,
	apE: apE$1,
	ape: ape$1,
	apid: apid$1,
	apos: apos$1$2,
	ApplyFunction: ApplyFunction$1,
	approx: approx$1,
	approxeq: approxeq$1,
	Aring: Aring$1$1,
	aring: aring$1$1,
	Ascr: Ascr$1,
	ascr: ascr$1,
	Assign: Assign$1,
	ast: ast$1,
	asymp: asymp$1,
	asympeq: asympeq$1,
	Atilde: Atilde$1$1,
	atilde: atilde$1$1,
	Auml: Auml$1$1,
	auml: auml$1$1,
	awconint: awconint$1,
	awint: awint$1,
	backcong: backcong$1,
	backepsilon: backepsilon$1,
	backprime: backprime$1,
	backsim: backsim$1,
	backsimeq: backsimeq$1,
	Backslash: Backslash$1,
	Barv: Barv$1,
	barvee: barvee$1,
	barwed: barwed$1,
	Barwed: Barwed$1,
	barwedge: barwedge$1,
	bbrk: bbrk$1,
	bbrktbrk: bbrktbrk$1,
	bcong: bcong$1,
	Bcy: Bcy$1,
	bcy: bcy$1,
	bdquo: bdquo$1,
	becaus: becaus$1,
	because: because$1,
	Because: Because$1,
	bemptyv: bemptyv$1,
	bepsi: bepsi$1,
	bernou: bernou$1,
	Bernoullis: Bernoullis$1,
	Beta: Beta$1,
	beta: beta$1,
	beth: beth$1,
	between: between$1,
	Bfr: Bfr$1,
	bfr: bfr$1,
	bigcap: bigcap$1,
	bigcirc: bigcirc$1,
	bigcup: bigcup$1,
	bigodot: bigodot$1,
	bigoplus: bigoplus$1,
	bigotimes: bigotimes$1,
	bigsqcup: bigsqcup$1,
	bigstar: bigstar$1,
	bigtriangledown: bigtriangledown$1,
	bigtriangleup: bigtriangleup$1,
	biguplus: biguplus$1,
	bigvee: bigvee$1,
	bigwedge: bigwedge$1,
	bkarow: bkarow$1,
	blacklozenge: blacklozenge$1,
	blacksquare: blacksquare$1,
	blacktriangle: blacktriangle$1,
	blacktriangledown: blacktriangledown$1,
	blacktriangleleft: blacktriangleleft$1,
	blacktriangleright: blacktriangleright$1,
	blank: blank$1,
	blk12: blk12$1,
	blk14: blk14$1,
	blk34: blk34$1,
	block: block$1,
	bne: bne$1,
	bnequiv: bnequiv$1,
	bNot: bNot$1,
	bnot: bnot$1,
	Bopf: Bopf$1,
	bopf: bopf$1,
	bot: bot$1,
	bottom: bottom$1,
	bowtie: bowtie$1,
	boxbox: boxbox$1,
	boxdl: boxdl$1,
	boxdL: boxdL$1,
	boxDl: boxDl$1,
	boxDL: boxDL$1,
	boxdr: boxdr$1,
	boxdR: boxdR$1,
	boxDr: boxDr$1,
	boxDR: boxDR$1,
	boxh: boxh$1,
	boxH: boxH$1,
	boxhd: boxhd$1,
	boxHd: boxHd$1,
	boxhD: boxhD$1,
	boxHD: boxHD$1,
	boxhu: boxhu$1,
	boxHu: boxHu$1,
	boxhU: boxhU$1,
	boxHU: boxHU$1,
	boxminus: boxminus$1,
	boxplus: boxplus$1,
	boxtimes: boxtimes$1,
	boxul: boxul$1,
	boxuL: boxuL$1,
	boxUl: boxUl$1,
	boxUL: boxUL$1,
	boxur: boxur$1,
	boxuR: boxuR$1,
	boxUr: boxUr$1,
	boxUR: boxUR$1,
	boxv: boxv$1,
	boxV: boxV$1,
	boxvh: boxvh$1,
	boxvH: boxvH$1,
	boxVh: boxVh$1,
	boxVH: boxVH$1,
	boxvl: boxvl$1,
	boxvL: boxvL$1,
	boxVl: boxVl$1,
	boxVL: boxVL$1,
	boxvr: boxvr$1,
	boxvR: boxvR$1,
	boxVr: boxVr$1,
	boxVR: boxVR$1,
	bprime: bprime$1,
	breve: breve$1,
	Breve: Breve$1,
	brvbar: brvbar$1$1,
	bscr: bscr$1,
	Bscr: Bscr$1,
	bsemi: bsemi$1,
	bsim: bsim$1,
	bsime: bsime$1,
	bsolb: bsolb$1,
	bsol: bsol$1,
	bsolhsub: bsolhsub$1,
	bull: bull$1,
	bullet: bullet$1,
	bump: bump$1,
	bumpE: bumpE$1,
	bumpe: bumpe$1,
	Bumpeq: Bumpeq$1,
	bumpeq: bumpeq$1,
	Cacute: Cacute$1,
	cacute: cacute$1,
	capand: capand$1,
	capbrcup: capbrcup$1,
	capcap: capcap$1,
	cap: cap$1,
	Cap: Cap$1,
	capcup: capcup$1,
	capdot: capdot$1,
	CapitalDifferentialD: CapitalDifferentialD$1,
	caps: caps$1,
	caret: caret$1,
	caron: caron$1,
	Cayleys: Cayleys$1,
	ccaps: ccaps$1,
	Ccaron: Ccaron$1,
	ccaron: ccaron$1,
	Ccedil: Ccedil$1$1,
	ccedil: ccedil$1$1,
	Ccirc: Ccirc$1,
	ccirc: ccirc$1,
	Cconint: Cconint$1,
	ccups: ccups$1,
	ccupssm: ccupssm$1,
	Cdot: Cdot$1,
	cdot: cdot$1,
	cedil: cedil$1$1,
	Cedilla: Cedilla$1,
	cemptyv: cemptyv$1,
	cent: cent$1$1,
	centerdot: centerdot$1,
	CenterDot: CenterDot$1,
	cfr: cfr$1,
	Cfr: Cfr$1,
	CHcy: CHcy$1,
	chcy: chcy$1,
	check: check$1,
	checkmark: checkmark$1,
	Chi: Chi$1,
	chi: chi$1,
	circ: circ$1,
	circeq: circeq$1,
	circlearrowleft: circlearrowleft$1,
	circlearrowright: circlearrowright$1,
	circledast: circledast$1,
	circledcirc: circledcirc$1,
	circleddash: circleddash$1,
	CircleDot: CircleDot$1,
	circledR: circledR$1,
	circledS: circledS$1,
	CircleMinus: CircleMinus$1,
	CirclePlus: CirclePlus$1,
	CircleTimes: CircleTimes$1,
	cir: cir$1,
	cirE: cirE$1,
	cire: cire$1,
	cirfnint: cirfnint$1,
	cirmid: cirmid$1,
	cirscir: cirscir$1,
	ClockwiseContourIntegral: ClockwiseContourIntegral$1,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote$1,
	CloseCurlyQuote: CloseCurlyQuote$1,
	clubs: clubs$1,
	clubsuit: clubsuit$1,
	colon: colon$1,
	Colon: Colon$1,
	Colone: Colone$1,
	colone: colone$1,
	coloneq: coloneq$1,
	comma: comma$1,
	commat: commat$1,
	comp: comp$1,
	compfn: compfn$1,
	complement: complement$1,
	complexes: complexes$1,
	cong: cong$1,
	congdot: congdot$1,
	Congruent: Congruent$1,
	conint: conint$1,
	Conint: Conint$1,
	ContourIntegral: ContourIntegral$1,
	copf: copf$1,
	Copf: Copf$1,
	coprod: coprod$1,
	Coproduct: Coproduct$1,
	copy: copy$1$1,
	COPY: COPY$1$1,
	copysr: copysr$1,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral$1,
	crarr: crarr$1,
	cross: cross$1,
	Cross: Cross$1,
	Cscr: Cscr$1,
	cscr: cscr$1,
	csub: csub$1,
	csube: csube$1,
	csup: csup$1,
	csupe: csupe$1,
	ctdot: ctdot$1,
	cudarrl: cudarrl$1,
	cudarrr: cudarrr$1,
	cuepr: cuepr$1,
	cuesc: cuesc$1,
	cularr: cularr$1,
	cularrp: cularrp$1,
	cupbrcap: cupbrcap$1,
	cupcap: cupcap$1,
	CupCap: CupCap$1,
	cup: cup$1,
	Cup: Cup$1,
	cupcup: cupcup$1,
	cupdot: cupdot$1,
	cupor: cupor$1,
	cups: cups$1,
	curarr: curarr$1,
	curarrm: curarrm$1,
	curlyeqprec: curlyeqprec$1,
	curlyeqsucc: curlyeqsucc$1,
	curlyvee: curlyvee$1,
	curlywedge: curlywedge$1,
	curren: curren$1$1,
	curvearrowleft: curvearrowleft$1,
	curvearrowright: curvearrowright$1,
	cuvee: cuvee$1,
	cuwed: cuwed$1,
	cwconint: cwconint$1,
	cwint: cwint$1,
	cylcty: cylcty$1,
	dagger: dagger$1,
	Dagger: Dagger$1,
	daleth: daleth$1,
	darr: darr$1,
	Darr: Darr$1,
	dArr: dArr$1,
	dash: dash$1,
	Dashv: Dashv$1,
	dashv: dashv$1,
	dbkarow: dbkarow$1,
	dblac: dblac$1,
	Dcaron: Dcaron$1,
	dcaron: dcaron$1,
	Dcy: Dcy$1,
	dcy: dcy$1,
	ddagger: ddagger$1,
	ddarr: ddarr$1,
	DD: DD$1,
	dd: dd$1,
	DDotrahd: DDotrahd$1,
	ddotseq: ddotseq$1,
	deg: deg$1$1,
	Del: Del$1,
	Delta: Delta$1,
	delta: delta$1,
	demptyv: demptyv$1,
	dfisht: dfisht$1,
	Dfr: Dfr$1,
	dfr: dfr$1,
	dHar: dHar$1,
	dharl: dharl$1,
	dharr: dharr$1,
	DiacriticalAcute: DiacriticalAcute$1,
	DiacriticalDot: DiacriticalDot$1,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute$1,
	DiacriticalGrave: DiacriticalGrave$1,
	DiacriticalTilde: DiacriticalTilde$1,
	diam: diam$1,
	diamond: diamond$1,
	Diamond: Diamond$1,
	diamondsuit: diamondsuit$1,
	diams: diams$1,
	die: die$1,
	DifferentialD: DifferentialD$1,
	digamma: digamma$1,
	disin: disin$1,
	div: div$1,
	divide: divide$1$1,
	divideontimes: divideontimes$1,
	divonx: divonx$1,
	DJcy: DJcy$1,
	djcy: djcy$1,
	dlcorn: dlcorn$1,
	dlcrop: dlcrop$1,
	dollar: dollar$1,
	Dopf: Dopf$1,
	dopf: dopf$1,
	Dot: Dot$1,
	dot: dot$1,
	DotDot: DotDot$1,
	doteq: doteq$1,
	doteqdot: doteqdot$1,
	DotEqual: DotEqual$1,
	dotminus: dotminus$1,
	dotplus: dotplus$1,
	dotsquare: dotsquare$1,
	doublebarwedge: doublebarwedge$1,
	DoubleContourIntegral: DoubleContourIntegral$1,
	DoubleDot: DoubleDot$1,
	DoubleDownArrow: DoubleDownArrow$1,
	DoubleLeftArrow: DoubleLeftArrow$1,
	DoubleLeftRightArrow: DoubleLeftRightArrow$1,
	DoubleLeftTee: DoubleLeftTee$1,
	DoubleLongLeftArrow: DoubleLongLeftArrow$1,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow$1,
	DoubleLongRightArrow: DoubleLongRightArrow$1,
	DoubleRightArrow: DoubleRightArrow$1,
	DoubleRightTee: DoubleRightTee$1,
	DoubleUpArrow: DoubleUpArrow$1,
	DoubleUpDownArrow: DoubleUpDownArrow$1,
	DoubleVerticalBar: DoubleVerticalBar$1,
	DownArrowBar: DownArrowBar$1,
	downarrow: downarrow$1,
	DownArrow: DownArrow$1,
	Downarrow: Downarrow$1,
	DownArrowUpArrow: DownArrowUpArrow$1,
	DownBreve: DownBreve$1,
	downdownarrows: downdownarrows$1,
	downharpoonleft: downharpoonleft$1,
	downharpoonright: downharpoonright$1,
	DownLeftRightVector: DownLeftRightVector$1,
	DownLeftTeeVector: DownLeftTeeVector$1,
	DownLeftVectorBar: DownLeftVectorBar$1,
	DownLeftVector: DownLeftVector$1,
	DownRightTeeVector: DownRightTeeVector$1,
	DownRightVectorBar: DownRightVectorBar$1,
	DownRightVector: DownRightVector$1,
	DownTeeArrow: DownTeeArrow$1,
	DownTee: DownTee$1,
	drbkarow: drbkarow$1,
	drcorn: drcorn$1,
	drcrop: drcrop$1,
	Dscr: Dscr$1,
	dscr: dscr$1,
	DScy: DScy$1,
	dscy: dscy$1,
	dsol: dsol$1,
	Dstrok: Dstrok$1,
	dstrok: dstrok$1,
	dtdot: dtdot$1,
	dtri: dtri$1,
	dtrif: dtrif$1,
	duarr: duarr$1,
	duhar: duhar$1,
	dwangle: dwangle$1,
	DZcy: DZcy$1,
	dzcy: dzcy$1,
	dzigrarr: dzigrarr$1,
	Eacute: Eacute$1$1,
	eacute: eacute$1$1,
	easter: easter$1,
	Ecaron: Ecaron$1,
	ecaron: ecaron$1,
	Ecirc: Ecirc$1$1,
	ecirc: ecirc$1$1,
	ecir: ecir$1,
	ecolon: ecolon$1,
	Ecy: Ecy$1,
	ecy: ecy$1,
	eDDot: eDDot$1,
	Edot: Edot$1,
	edot: edot$1,
	eDot: eDot$1,
	ee: ee$1,
	efDot: efDot$1,
	Efr: Efr$1,
	efr: efr$1,
	eg: eg$1,
	Egrave: Egrave$1$1,
	egrave: egrave$1$1,
	egs: egs$1,
	egsdot: egsdot$1,
	el: el$1,
	Element: Element$1,
	elinters: elinters$1,
	ell: ell$1,
	els: els$1,
	elsdot: elsdot$1,
	Emacr: Emacr$1,
	emacr: emacr$1,
	empty: empty$1,
	emptyset: emptyset$1,
	EmptySmallSquare: EmptySmallSquare$1,
	emptyv: emptyv$1,
	EmptyVerySmallSquare: EmptyVerySmallSquare$1,
	emsp13: emsp13$1,
	emsp14: emsp14$1,
	emsp: emsp$1,
	ENG: ENG$1,
	eng: eng$1,
	ensp: ensp$1,
	Eogon: Eogon$1,
	eogon: eogon$1,
	Eopf: Eopf$1,
	eopf: eopf$1,
	epar: epar$1,
	eparsl: eparsl$1,
	eplus: eplus$1,
	epsi: epsi$1,
	Epsilon: Epsilon$1,
	epsilon: epsilon$1,
	epsiv: epsiv$1,
	eqcirc: eqcirc$1,
	eqcolon: eqcolon$1,
	eqsim: eqsim$1,
	eqslantgtr: eqslantgtr$1,
	eqslantless: eqslantless$1,
	Equal: Equal$1,
	equals: equals$1,
	EqualTilde: EqualTilde$1,
	equest: equest$1,
	Equilibrium: Equilibrium$1,
	equiv: equiv$1,
	equivDD: equivDD$1,
	eqvparsl: eqvparsl$1,
	erarr: erarr$1,
	erDot: erDot$1,
	escr: escr$1,
	Escr: Escr$1,
	esdot: esdot$1,
	Esim: Esim$1,
	esim: esim$1,
	Eta: Eta$1,
	eta: eta$1,
	ETH: ETH$1$1,
	eth: eth$1$1,
	Euml: Euml$1$1,
	euml: euml$1$1,
	euro: euro$1,
	excl: excl$1,
	exist: exist$1,
	Exists: Exists$1,
	expectation: expectation$1,
	exponentiale: exponentiale$1,
	ExponentialE: ExponentialE$1,
	fallingdotseq: fallingdotseq$1,
	Fcy: Fcy$1,
	fcy: fcy$1,
	female: female$1,
	ffilig: ffilig$1,
	fflig: fflig$1,
	ffllig: ffllig$1,
	Ffr: Ffr$1,
	ffr: ffr$1,
	filig: filig$1,
	FilledSmallSquare: FilledSmallSquare$1,
	FilledVerySmallSquare: FilledVerySmallSquare$1,
	fjlig: fjlig$1,
	flat: flat$1,
	fllig: fllig$1,
	fltns: fltns$1,
	fnof: fnof$1,
	Fopf: Fopf$1,
	fopf: fopf$1,
	forall: forall$1,
	ForAll: ForAll$1,
	fork: fork$1,
	forkv: forkv$1,
	Fouriertrf: Fouriertrf$1,
	fpartint: fpartint$1,
	frac12: frac12$1$1,
	frac13: frac13$1,
	frac14: frac14$1$1,
	frac15: frac15$1,
	frac16: frac16$1,
	frac18: frac18$1,
	frac23: frac23$1,
	frac25: frac25$1,
	frac34: frac34$1$1,
	frac35: frac35$1,
	frac38: frac38$1,
	frac45: frac45$1,
	frac56: frac56$1,
	frac58: frac58$1,
	frac78: frac78$1,
	frasl: frasl$1,
	frown: frown$1,
	fscr: fscr$1,
	Fscr: Fscr$1,
	gacute: gacute$1,
	Gamma: Gamma$1,
	gamma: gamma$1,
	Gammad: Gammad$1,
	gammad: gammad$1,
	gap: gap$1,
	Gbreve: Gbreve$1,
	gbreve: gbreve$1,
	Gcedil: Gcedil$1,
	Gcirc: Gcirc$1,
	gcirc: gcirc$1,
	Gcy: Gcy$1,
	gcy: gcy$1,
	Gdot: Gdot$1,
	gdot: gdot$1,
	ge: ge$1,
	gE: gE$1,
	gEl: gEl$1,
	gel: gel$1,
	geq: geq$1,
	geqq: geqq$1,
	geqslant: geqslant$1,
	gescc: gescc$1,
	ges: ges$1,
	gesdot: gesdot$1,
	gesdoto: gesdoto$1,
	gesdotol: gesdotol$1,
	gesl: gesl$1,
	gesles: gesles$1,
	Gfr: Gfr$1,
	gfr: gfr$1,
	gg: gg$1,
	Gg: Gg$1,
	ggg: ggg$1,
	gimel: gimel$1,
	GJcy: GJcy$1,
	gjcy: gjcy$1,
	gla: gla$1,
	gl: gl$1,
	glE: glE$1,
	glj: glj$1,
	gnap: gnap$1,
	gnapprox: gnapprox$1,
	gne: gne$1,
	gnE: gnE$1,
	gneq: gneq$1,
	gneqq: gneqq$1,
	gnsim: gnsim$1,
	Gopf: Gopf$1,
	gopf: gopf$1,
	grave: grave$1,
	GreaterEqual: GreaterEqual$1,
	GreaterEqualLess: GreaterEqualLess$1,
	GreaterFullEqual: GreaterFullEqual$1,
	GreaterGreater: GreaterGreater$1,
	GreaterLess: GreaterLess$1,
	GreaterSlantEqual: GreaterSlantEqual$1,
	GreaterTilde: GreaterTilde$1,
	Gscr: Gscr$1,
	gscr: gscr$1,
	gsim: gsim$1,
	gsime: gsime$1,
	gsiml: gsiml$1,
	gtcc: gtcc$1,
	gtcir: gtcir$1,
	gt: gt$1$2,
	GT: GT$1$1,
	Gt: Gt$1,
	gtdot: gtdot$1,
	gtlPar: gtlPar$1,
	gtquest: gtquest$1,
	gtrapprox: gtrapprox$1,
	gtrarr: gtrarr$1,
	gtrdot: gtrdot$1,
	gtreqless: gtreqless$1,
	gtreqqless: gtreqqless$1,
	gtrless: gtrless$1,
	gtrsim: gtrsim$1,
	gvertneqq: gvertneqq$1,
	gvnE: gvnE$1,
	Hacek: Hacek$1,
	hairsp: hairsp$1,
	half: half$1,
	hamilt: hamilt$1,
	HARDcy: HARDcy$1,
	hardcy: hardcy$1,
	harrcir: harrcir$1,
	harr: harr$1,
	hArr: hArr$1,
	harrw: harrw$1,
	Hat: Hat$1,
	hbar: hbar$1,
	Hcirc: Hcirc$1,
	hcirc: hcirc$1,
	hearts: hearts$1,
	heartsuit: heartsuit$1,
	hellip: hellip$1,
	hercon: hercon$1,
	hfr: hfr$1,
	Hfr: Hfr$1,
	HilbertSpace: HilbertSpace$1,
	hksearow: hksearow$1,
	hkswarow: hkswarow$1,
	hoarr: hoarr$1,
	homtht: homtht$1,
	hookleftarrow: hookleftarrow$1,
	hookrightarrow: hookrightarrow$1,
	hopf: hopf$1,
	Hopf: Hopf$1,
	horbar: horbar$1,
	HorizontalLine: HorizontalLine$1,
	hscr: hscr$1,
	Hscr: Hscr$1,
	hslash: hslash$1,
	Hstrok: Hstrok$1,
	hstrok: hstrok$1,
	HumpDownHump: HumpDownHump$1,
	HumpEqual: HumpEqual$1,
	hybull: hybull$1,
	hyphen: hyphen$1,
	Iacute: Iacute$1$1,
	iacute: iacute$1$1,
	ic: ic$1,
	Icirc: Icirc$1$1,
	icirc: icirc$1$1,
	Icy: Icy$1,
	icy: icy$1,
	Idot: Idot$1,
	IEcy: IEcy$1,
	iecy: iecy$1,
	iexcl: iexcl$1$1,
	iff: iff$1,
	ifr: ifr$1,
	Ifr: Ifr$1,
	Igrave: Igrave$1$1,
	igrave: igrave$1$1,
	ii: ii$1,
	iiiint: iiiint$1,
	iiint: iiint$1,
	iinfin: iinfin$1,
	iiota: iiota$1,
	IJlig: IJlig$1,
	ijlig: ijlig$1,
	Imacr: Imacr$1,
	imacr: imacr$1,
	image: image$1,
	ImaginaryI: ImaginaryI$1,
	imagline: imagline$1,
	imagpart: imagpart$1,
	imath: imath$1,
	Im: Im$1,
	imof: imof$1,
	imped: imped$1,
	Implies: Implies$1,
	incare: incare$1,
	infin: infin$1,
	infintie: infintie$1,
	inodot: inodot$1,
	intcal: intcal$1,
	int: int$1,
	Int: Int$1,
	integers: integers$1,
	Integral: Integral$1,
	intercal: intercal$1,
	Intersection: Intersection$1,
	intlarhk: intlarhk$1,
	intprod: intprod$1,
	InvisibleComma: InvisibleComma$1,
	InvisibleTimes: InvisibleTimes$1,
	IOcy: IOcy$1,
	iocy: iocy$1,
	Iogon: Iogon$1,
	iogon: iogon$1,
	Iopf: Iopf$1,
	iopf: iopf$1,
	Iota: Iota$1,
	iota: iota$1,
	iprod: iprod$1,
	iquest: iquest$1$1,
	iscr: iscr$1,
	Iscr: Iscr$1,
	isin: isin$1,
	isindot: isindot$1,
	isinE: isinE$1,
	isins: isins$1,
	isinsv: isinsv$1,
	isinv: isinv$1,
	it: it$1,
	Itilde: Itilde$1,
	itilde: itilde$1,
	Iukcy: Iukcy$1,
	iukcy: iukcy$1,
	Iuml: Iuml$1$1,
	iuml: iuml$1$1,
	Jcirc: Jcirc$1,
	jcirc: jcirc$1,
	Jcy: Jcy$1,
	jcy: jcy$1,
	Jfr: Jfr$1,
	jfr: jfr$1,
	jmath: jmath$1,
	Jopf: Jopf$1,
	jopf: jopf$1,
	Jscr: Jscr$1,
	jscr: jscr$1,
	Jsercy: Jsercy$1,
	jsercy: jsercy$1,
	Jukcy: Jukcy$1,
	jukcy: jukcy$1,
	Kappa: Kappa$1,
	kappa: kappa$1,
	kappav: kappav$1,
	Kcedil: Kcedil$1,
	kcedil: kcedil$1,
	Kcy: Kcy$1,
	kcy: kcy$1,
	Kfr: Kfr$1,
	kfr: kfr$1,
	kgreen: kgreen$1,
	KHcy: KHcy$1,
	khcy: khcy$1,
	KJcy: KJcy$1,
	kjcy: kjcy$1,
	Kopf: Kopf$1,
	kopf: kopf$1,
	Kscr: Kscr$1,
	kscr: kscr$1,
	lAarr: lAarr$1,
	Lacute: Lacute$1,
	lacute: lacute$1,
	laemptyv: laemptyv$1,
	lagran: lagran$1,
	Lambda: Lambda$1,
	lambda: lambda$1,
	lang: lang$1,
	Lang: Lang$1,
	langd: langd$1,
	langle: langle$1,
	lap: lap$1,
	Laplacetrf: Laplacetrf$1,
	laquo: laquo$1$1,
	larrb: larrb$1,
	larrbfs: larrbfs$1,
	larr: larr$1,
	Larr: Larr$1,
	lArr: lArr$1,
	larrfs: larrfs$1,
	larrhk: larrhk$1,
	larrlp: larrlp$1,
	larrpl: larrpl$1,
	larrsim: larrsim$1,
	larrtl: larrtl$1,
	latail: latail$1,
	lAtail: lAtail$1,
	lat: lat$1,
	late: late$1,
	lates: lates$1,
	lbarr: lbarr$1,
	lBarr: lBarr$1,
	lbbrk: lbbrk$1,
	lbrace: lbrace$1,
	lbrack: lbrack$1,
	lbrke: lbrke$1,
	lbrksld: lbrksld$1,
	lbrkslu: lbrkslu$1,
	Lcaron: Lcaron$1,
	lcaron: lcaron$1,
	Lcedil: Lcedil$1,
	lcedil: lcedil$1,
	lceil: lceil$1,
	lcub: lcub$1,
	Lcy: Lcy$1,
	lcy: lcy$1,
	ldca: ldca$1,
	ldquo: ldquo$1,
	ldquor: ldquor$1,
	ldrdhar: ldrdhar$1,
	ldrushar: ldrushar$1,
	ldsh: ldsh$1,
	le: le$1,
	lE: lE$1,
	LeftAngleBracket: LeftAngleBracket$1,
	LeftArrowBar: LeftArrowBar$1,
	leftarrow: leftarrow$1,
	LeftArrow: LeftArrow$1,
	Leftarrow: Leftarrow$1,
	LeftArrowRightArrow: LeftArrowRightArrow$1,
	leftarrowtail: leftarrowtail$1,
	LeftCeiling: LeftCeiling$1,
	LeftDoubleBracket: LeftDoubleBracket$1,
	LeftDownTeeVector: LeftDownTeeVector$1,
	LeftDownVectorBar: LeftDownVectorBar$1,
	LeftDownVector: LeftDownVector$1,
	LeftFloor: LeftFloor$1,
	leftharpoondown: leftharpoondown$1,
	leftharpoonup: leftharpoonup$1,
	leftleftarrows: leftleftarrows$1,
	leftrightarrow: leftrightarrow$1,
	LeftRightArrow: LeftRightArrow$1,
	Leftrightarrow: Leftrightarrow$1,
	leftrightarrows: leftrightarrows$1,
	leftrightharpoons: leftrightharpoons$1,
	leftrightsquigarrow: leftrightsquigarrow$1,
	LeftRightVector: LeftRightVector$1,
	LeftTeeArrow: LeftTeeArrow$1,
	LeftTee: LeftTee$1,
	LeftTeeVector: LeftTeeVector$1,
	leftthreetimes: leftthreetimes$1,
	LeftTriangleBar: LeftTriangleBar$1,
	LeftTriangle: LeftTriangle$1,
	LeftTriangleEqual: LeftTriangleEqual$1,
	LeftUpDownVector: LeftUpDownVector$1,
	LeftUpTeeVector: LeftUpTeeVector$1,
	LeftUpVectorBar: LeftUpVectorBar$1,
	LeftUpVector: LeftUpVector$1,
	LeftVectorBar: LeftVectorBar$1,
	LeftVector: LeftVector$1,
	lEg: lEg$1,
	leg: leg$1,
	leq: leq$1,
	leqq: leqq$1,
	leqslant: leqslant$1,
	lescc: lescc$1,
	les: les$1,
	lesdot: lesdot$1,
	lesdoto: lesdoto$1,
	lesdotor: lesdotor$1,
	lesg: lesg$1,
	lesges: lesges$1,
	lessapprox: lessapprox$1,
	lessdot: lessdot$1,
	lesseqgtr: lesseqgtr$1,
	lesseqqgtr: lesseqqgtr$1,
	LessEqualGreater: LessEqualGreater$1,
	LessFullEqual: LessFullEqual$1,
	LessGreater: LessGreater$1,
	lessgtr: lessgtr$1,
	LessLess: LessLess$1,
	lesssim: lesssim$1,
	LessSlantEqual: LessSlantEqual$1,
	LessTilde: LessTilde$1,
	lfisht: lfisht$1,
	lfloor: lfloor$1,
	Lfr: Lfr$1,
	lfr: lfr$1,
	lg: lg$1,
	lgE: lgE$1,
	lHar: lHar$1,
	lhard: lhard$1,
	lharu: lharu$1,
	lharul: lharul$1,
	lhblk: lhblk$1,
	LJcy: LJcy$1,
	ljcy: ljcy$1,
	llarr: llarr$1,
	ll: ll$1,
	Ll: Ll$1,
	llcorner: llcorner$1,
	Lleftarrow: Lleftarrow$1,
	llhard: llhard$1,
	lltri: lltri$1,
	Lmidot: Lmidot$1,
	lmidot: lmidot$1,
	lmoustache: lmoustache$1,
	lmoust: lmoust$1,
	lnap: lnap$1,
	lnapprox: lnapprox$1,
	lne: lne$1,
	lnE: lnE$1,
	lneq: lneq$1,
	lneqq: lneqq$1,
	lnsim: lnsim$1,
	loang: loang$1,
	loarr: loarr$1,
	lobrk: lobrk$1,
	longleftarrow: longleftarrow$1,
	LongLeftArrow: LongLeftArrow$1,
	Longleftarrow: Longleftarrow$1,
	longleftrightarrow: longleftrightarrow$1,
	LongLeftRightArrow: LongLeftRightArrow$1,
	Longleftrightarrow: Longleftrightarrow$1,
	longmapsto: longmapsto$1,
	longrightarrow: longrightarrow$1,
	LongRightArrow: LongRightArrow$1,
	Longrightarrow: Longrightarrow$1,
	looparrowleft: looparrowleft$1,
	looparrowright: looparrowright$1,
	lopar: lopar$1,
	Lopf: Lopf$1,
	lopf: lopf$1,
	loplus: loplus$1,
	lotimes: lotimes$1,
	lowast: lowast$1,
	lowbar: lowbar$1,
	LowerLeftArrow: LowerLeftArrow$1,
	LowerRightArrow: LowerRightArrow$1,
	loz: loz$1,
	lozenge: lozenge$1,
	lozf: lozf$1,
	lpar: lpar$1,
	lparlt: lparlt$1,
	lrarr: lrarr$1,
	lrcorner: lrcorner$1,
	lrhar: lrhar$1,
	lrhard: lrhard$1,
	lrm: lrm$1,
	lrtri: lrtri$1,
	lsaquo: lsaquo$1,
	lscr: lscr$1,
	Lscr: Lscr$1,
	lsh: lsh$1,
	Lsh: Lsh$1,
	lsim: lsim$1,
	lsime: lsime$1,
	lsimg: lsimg$1,
	lsqb: lsqb$1,
	lsquo: lsquo$1,
	lsquor: lsquor$1,
	Lstrok: Lstrok$1,
	lstrok: lstrok$1,
	ltcc: ltcc$1,
	ltcir: ltcir$1,
	lt: lt$1$2,
	LT: LT$1$1,
	Lt: Lt$1,
	ltdot: ltdot$1,
	lthree: lthree$1,
	ltimes: ltimes$1,
	ltlarr: ltlarr$1,
	ltquest: ltquest$1,
	ltri: ltri$1,
	ltrie: ltrie$1,
	ltrif: ltrif$1,
	ltrPar: ltrPar$1,
	lurdshar: lurdshar$1,
	luruhar: luruhar$1,
	lvertneqq: lvertneqq$1,
	lvnE: lvnE$1,
	macr: macr$1$1,
	male: male$1,
	malt: malt$1,
	maltese: maltese$1,
	map: map$2,
	mapsto: mapsto$1,
	mapstodown: mapstodown$1,
	mapstoleft: mapstoleft$1,
	mapstoup: mapstoup$1,
	marker: marker$1,
	mcomma: mcomma$1,
	Mcy: Mcy$1,
	mcy: mcy$1,
	mdash: mdash$1,
	mDDot: mDDot$1,
	measuredangle: measuredangle$1,
	MediumSpace: MediumSpace$1,
	Mellintrf: Mellintrf$1,
	Mfr: Mfr$1,
	mfr: mfr$1,
	mho: mho$1,
	micro: micro$1$1,
	midast: midast$1,
	midcir: midcir$1,
	mid: mid$1,
	middot: middot$1$1,
	minusb: minusb$1,
	minus: minus$1,
	minusd: minusd$1,
	minusdu: minusdu$1,
	MinusPlus: MinusPlus$1,
	mlcp: mlcp$1,
	mldr: mldr$1,
	mnplus: mnplus$1,
	models: models$1,
	Mopf: Mopf$1,
	mopf: mopf$1,
	mp: mp$1,
	mscr: mscr$1,
	Mscr: Mscr$1,
	mstpos: mstpos$1,
	Mu: Mu$1,
	mu: mu$1,
	multimap: multimap$1,
	mumap: mumap$1,
	nabla: nabla$1,
	Nacute: Nacute$1,
	nacute: nacute$1,
	nang: nang$1,
	nap: nap$1,
	napE: napE$1,
	napid: napid$1,
	napos: napos$1,
	napprox: napprox$1,
	natural: natural$1,
	naturals: naturals$1,
	natur: natur$1,
	nbsp: nbsp$1$1,
	nbump: nbump$1,
	nbumpe: nbumpe$1,
	ncap: ncap$1,
	Ncaron: Ncaron$1,
	ncaron: ncaron$1,
	Ncedil: Ncedil$1,
	ncedil: ncedil$1,
	ncong: ncong$1,
	ncongdot: ncongdot$1,
	ncup: ncup$1,
	Ncy: Ncy$1,
	ncy: ncy$1,
	ndash: ndash$1,
	nearhk: nearhk$1,
	nearr: nearr$1,
	neArr: neArr$1,
	nearrow: nearrow$1,
	ne: ne$1,
	nedot: nedot$1,
	NegativeMediumSpace: NegativeMediumSpace$1,
	NegativeThickSpace: NegativeThickSpace$1,
	NegativeThinSpace: NegativeThinSpace$1,
	NegativeVeryThinSpace: NegativeVeryThinSpace$1,
	nequiv: nequiv$1,
	nesear: nesear$1,
	nesim: nesim$1,
	NestedGreaterGreater: NestedGreaterGreater$1,
	NestedLessLess: NestedLessLess$1,
	NewLine: NewLine$1,
	nexist: nexist$1,
	nexists: nexists$1,
	Nfr: Nfr$1,
	nfr: nfr$1,
	ngE: ngE$1,
	nge: nge$1,
	ngeq: ngeq$1,
	ngeqq: ngeqq$1,
	ngeqslant: ngeqslant$1,
	nges: nges$1,
	nGg: nGg$1,
	ngsim: ngsim$1,
	nGt: nGt$1,
	ngt: ngt$1,
	ngtr: ngtr$1,
	nGtv: nGtv$1,
	nharr: nharr$1,
	nhArr: nhArr$1,
	nhpar: nhpar$1,
	ni: ni$1,
	nis: nis$1,
	nisd: nisd$1,
	niv: niv$1,
	NJcy: NJcy$1,
	njcy: njcy$1,
	nlarr: nlarr$1,
	nlArr: nlArr$1,
	nldr: nldr$1,
	nlE: nlE$1,
	nle: nle$1,
	nleftarrow: nleftarrow$1,
	nLeftarrow: nLeftarrow$1,
	nleftrightarrow: nleftrightarrow$1,
	nLeftrightarrow: nLeftrightarrow$1,
	nleq: nleq$1,
	nleqq: nleqq$1,
	nleqslant: nleqslant$1,
	nles: nles$1,
	nless: nless$1,
	nLl: nLl$1,
	nlsim: nlsim$1,
	nLt: nLt$1,
	nlt: nlt$1,
	nltri: nltri$1,
	nltrie: nltrie$1,
	nLtv: nLtv$1,
	nmid: nmid$1,
	NoBreak: NoBreak$1,
	NonBreakingSpace: NonBreakingSpace$1,
	nopf: nopf$1,
	Nopf: Nopf$1,
	Not: Not$1,
	not: not$1$1,
	NotCongruent: NotCongruent$1,
	NotCupCap: NotCupCap$1,
	NotDoubleVerticalBar: NotDoubleVerticalBar$1,
	NotElement: NotElement$1,
	NotEqual: NotEqual$1,
	NotEqualTilde: NotEqualTilde$1,
	NotExists: NotExists$1,
	NotGreater: NotGreater$1,
	NotGreaterEqual: NotGreaterEqual$1,
	NotGreaterFullEqual: NotGreaterFullEqual$1,
	NotGreaterGreater: NotGreaterGreater$1,
	NotGreaterLess: NotGreaterLess$1,
	NotGreaterSlantEqual: NotGreaterSlantEqual$1,
	NotGreaterTilde: NotGreaterTilde$1,
	NotHumpDownHump: NotHumpDownHump$1,
	NotHumpEqual: NotHumpEqual$1,
	notin: notin$1,
	notindot: notindot$1,
	notinE: notinE$1,
	notinva: notinva$1,
	notinvb: notinvb$1,
	notinvc: notinvc$1,
	NotLeftTriangleBar: NotLeftTriangleBar$1,
	NotLeftTriangle: NotLeftTriangle$1,
	NotLeftTriangleEqual: NotLeftTriangleEqual$1,
	NotLess: NotLess$1,
	NotLessEqual: NotLessEqual$1,
	NotLessGreater: NotLessGreater$1,
	NotLessLess: NotLessLess$1,
	NotLessSlantEqual: NotLessSlantEqual$1,
	NotLessTilde: NotLessTilde$1,
	NotNestedGreaterGreater: NotNestedGreaterGreater$1,
	NotNestedLessLess: NotNestedLessLess$1,
	notni: notni$1,
	notniva: notniva$1,
	notnivb: notnivb$1,
	notnivc: notnivc$1,
	NotPrecedes: NotPrecedes$1,
	NotPrecedesEqual: NotPrecedesEqual$1,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual$1,
	NotReverseElement: NotReverseElement$1,
	NotRightTriangleBar: NotRightTriangleBar$1,
	NotRightTriangle: NotRightTriangle$1,
	NotRightTriangleEqual: NotRightTriangleEqual$1,
	NotSquareSubset: NotSquareSubset$1,
	NotSquareSubsetEqual: NotSquareSubsetEqual$1,
	NotSquareSuperset: NotSquareSuperset$1,
	NotSquareSupersetEqual: NotSquareSupersetEqual$1,
	NotSubset: NotSubset$1,
	NotSubsetEqual: NotSubsetEqual$1,
	NotSucceeds: NotSucceeds$1,
	NotSucceedsEqual: NotSucceedsEqual$1,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual$1,
	NotSucceedsTilde: NotSucceedsTilde$1,
	NotSuperset: NotSuperset$1,
	NotSupersetEqual: NotSupersetEqual$1,
	NotTilde: NotTilde$1,
	NotTildeEqual: NotTildeEqual$1,
	NotTildeFullEqual: NotTildeFullEqual$1,
	NotTildeTilde: NotTildeTilde$1,
	NotVerticalBar: NotVerticalBar$1,
	nparallel: nparallel$1,
	npar: npar$1,
	nparsl: nparsl$1,
	npart: npart$1,
	npolint: npolint$1,
	npr: npr$1,
	nprcue: nprcue$1,
	nprec: nprec$1,
	npreceq: npreceq$1,
	npre: npre$1,
	nrarrc: nrarrc$1,
	nrarr: nrarr$1,
	nrArr: nrArr$1,
	nrarrw: nrarrw$1,
	nrightarrow: nrightarrow$1,
	nRightarrow: nRightarrow$1,
	nrtri: nrtri$1,
	nrtrie: nrtrie$1,
	nsc: nsc$1,
	nsccue: nsccue$1,
	nsce: nsce$1,
	Nscr: Nscr$1,
	nscr: nscr$1,
	nshortmid: nshortmid$1,
	nshortparallel: nshortparallel$1,
	nsim: nsim$1,
	nsime: nsime$1,
	nsimeq: nsimeq$1,
	nsmid: nsmid$1,
	nspar: nspar$1,
	nsqsube: nsqsube$1,
	nsqsupe: nsqsupe$1,
	nsub: nsub$1,
	nsubE: nsubE$1,
	nsube: nsube$1,
	nsubset: nsubset$1,
	nsubseteq: nsubseteq$1,
	nsubseteqq: nsubseteqq$1,
	nsucc: nsucc$1,
	nsucceq: nsucceq$1,
	nsup: nsup$1,
	nsupE: nsupE$1,
	nsupe: nsupe$1,
	nsupset: nsupset$1,
	nsupseteq: nsupseteq$1,
	nsupseteqq: nsupseteqq$1,
	ntgl: ntgl$1,
	Ntilde: Ntilde$1$1,
	ntilde: ntilde$1$1,
	ntlg: ntlg$1,
	ntriangleleft: ntriangleleft$1,
	ntrianglelefteq: ntrianglelefteq$1,
	ntriangleright: ntriangleright$1,
	ntrianglerighteq: ntrianglerighteq$1,
	Nu: Nu$1,
	nu: nu$1,
	num: num$1,
	numero: numero$1,
	numsp: numsp$1,
	nvap: nvap$1,
	nvdash: nvdash$1,
	nvDash: nvDash$1,
	nVdash: nVdash$1,
	nVDash: nVDash$1,
	nvge: nvge$1,
	nvgt: nvgt$1,
	nvHarr: nvHarr$1,
	nvinfin: nvinfin$1,
	nvlArr: nvlArr$1,
	nvle: nvle$1,
	nvlt: nvlt$1,
	nvltrie: nvltrie$1,
	nvrArr: nvrArr$1,
	nvrtrie: nvrtrie$1,
	nvsim: nvsim$1,
	nwarhk: nwarhk$1,
	nwarr: nwarr$1,
	nwArr: nwArr$1,
	nwarrow: nwarrow$1,
	nwnear: nwnear$1,
	Oacute: Oacute$1$1,
	oacute: oacute$1$1,
	oast: oast$1,
	Ocirc: Ocirc$1$1,
	ocirc: ocirc$1$1,
	ocir: ocir$1,
	Ocy: Ocy$1,
	ocy: ocy$1,
	odash: odash$1,
	Odblac: Odblac$1,
	odblac: odblac$1,
	odiv: odiv$1,
	odot: odot$1,
	odsold: odsold$1,
	OElig: OElig$1,
	oelig: oelig$1,
	ofcir: ofcir$1,
	Ofr: Ofr$1,
	ofr: ofr$1,
	ogon: ogon$1,
	Ograve: Ograve$1$1,
	ograve: ograve$1$1,
	ogt: ogt$1,
	ohbar: ohbar$1,
	ohm: ohm$1,
	oint: oint$1,
	olarr: olarr$1,
	olcir: olcir$1,
	olcross: olcross$1,
	oline: oline$1,
	olt: olt$1,
	Omacr: Omacr$1,
	omacr: omacr$1,
	Omega: Omega$1,
	omega: omega$1,
	Omicron: Omicron$1,
	omicron: omicron$1,
	omid: omid$1,
	ominus: ominus$1,
	Oopf: Oopf$1,
	oopf: oopf$1,
	opar: opar$1,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote$1,
	OpenCurlyQuote: OpenCurlyQuote$1,
	operp: operp$1,
	oplus: oplus$1,
	orarr: orarr$1,
	Or: Or$1,
	or: or$1,
	ord: ord$1,
	order: order$1,
	orderof: orderof$1,
	ordf: ordf$1$1,
	ordm: ordm$1$1,
	origof: origof$1,
	oror: oror$1,
	orslope: orslope$1,
	orv: orv$1,
	oS: oS$1,
	Oscr: Oscr$1,
	oscr: oscr$1,
	Oslash: Oslash$1$1,
	oslash: oslash$1$1,
	osol: osol$1,
	Otilde: Otilde$1$1,
	otilde: otilde$1$1,
	otimesas: otimesas$1,
	Otimes: Otimes$1,
	otimes: otimes$1,
	Ouml: Ouml$1$1,
	ouml: ouml$1$1,
	ovbar: ovbar$1,
	OverBar: OverBar$1,
	OverBrace: OverBrace$1,
	OverBracket: OverBracket$1,
	OverParenthesis: OverParenthesis$1,
	para: para$1$1,
	parallel: parallel$1,
	par: par$1,
	parsim: parsim$1,
	parsl: parsl$1,
	part: part$1,
	PartialD: PartialD$1,
	Pcy: Pcy$1,
	pcy: pcy$1,
	percnt: percnt$1,
	period: period$1,
	permil: permil$1,
	perp: perp$1,
	pertenk: pertenk$1,
	Pfr: Pfr$1,
	pfr: pfr$1,
	Phi: Phi$1,
	phi: phi$1,
	phiv: phiv$1,
	phmmat: phmmat$1,
	phone: phone$1,
	Pi: Pi$1,
	pi: pi$1,
	pitchfork: pitchfork$1,
	piv: piv$1,
	planck: planck$1,
	planckh: planckh$1,
	plankv: plankv$1,
	plusacir: plusacir$1,
	plusb: plusb$1,
	pluscir: pluscir$1,
	plus: plus$1,
	plusdo: plusdo$1,
	plusdu: plusdu$1,
	pluse: pluse$1,
	PlusMinus: PlusMinus$1,
	plusmn: plusmn$1$1,
	plussim: plussim$1,
	plustwo: plustwo$1,
	pm: pm$1,
	Poincareplane: Poincareplane$1,
	pointint: pointint$1,
	popf: popf$1,
	Popf: Popf$1,
	pound: pound$1$1,
	prap: prap$1,
	Pr: Pr$1,
	pr: pr$1,
	prcue: prcue$1,
	precapprox: precapprox$1,
	prec: prec$1,
	preccurlyeq: preccurlyeq$1,
	Precedes: Precedes$1,
	PrecedesEqual: PrecedesEqual$1,
	PrecedesSlantEqual: PrecedesSlantEqual$1,
	PrecedesTilde: PrecedesTilde$1,
	preceq: preceq$1,
	precnapprox: precnapprox$1,
	precneqq: precneqq$1,
	precnsim: precnsim$1,
	pre: pre$1,
	prE: prE$1,
	precsim: precsim$1,
	prime: prime$1,
	Prime: Prime$1,
	primes: primes$1,
	prnap: prnap$1,
	prnE: prnE$1,
	prnsim: prnsim$1,
	prod: prod$1,
	Product: Product$1,
	profalar: profalar$1,
	profline: profline$1,
	profsurf: profsurf$1,
	prop: prop$1,
	Proportional: Proportional$1,
	Proportion: Proportion$1,
	propto: propto$1,
	prsim: prsim$1,
	prurel: prurel$1,
	Pscr: Pscr$1,
	pscr: pscr$1,
	Psi: Psi$1,
	psi: psi$1,
	puncsp: puncsp$1,
	Qfr: Qfr$1,
	qfr: qfr$1,
	qint: qint$1,
	qopf: qopf$1,
	Qopf: Qopf$1,
	qprime: qprime$1,
	Qscr: Qscr$1,
	qscr: qscr$1,
	quaternions: quaternions$1,
	quatint: quatint$1,
	quest: quest$1,
	questeq: questeq$1,
	quot: quot$1$2,
	QUOT: QUOT$1$1,
	rAarr: rAarr$1,
	race: race$1,
	Racute: Racute$1,
	racute: racute$1,
	radic: radic$1,
	raemptyv: raemptyv$1,
	rang: rang$1,
	Rang: Rang$1,
	rangd: rangd$1,
	range: range$1,
	rangle: rangle$1,
	raquo: raquo$1$1,
	rarrap: rarrap$1,
	rarrb: rarrb$1,
	rarrbfs: rarrbfs$1,
	rarrc: rarrc$1,
	rarr: rarr$1,
	Rarr: Rarr$1,
	rArr: rArr$1,
	rarrfs: rarrfs$1,
	rarrhk: rarrhk$1,
	rarrlp: rarrlp$1,
	rarrpl: rarrpl$1,
	rarrsim: rarrsim$1,
	Rarrtl: Rarrtl$1,
	rarrtl: rarrtl$1,
	rarrw: rarrw$1,
	ratail: ratail$1,
	rAtail: rAtail$1,
	ratio: ratio$1,
	rationals: rationals$1,
	rbarr: rbarr$1,
	rBarr: rBarr$1,
	RBarr: RBarr$1,
	rbbrk: rbbrk$1,
	rbrace: rbrace$1,
	rbrack: rbrack$1,
	rbrke: rbrke$1,
	rbrksld: rbrksld$1,
	rbrkslu: rbrkslu$1,
	Rcaron: Rcaron$1,
	rcaron: rcaron$1,
	Rcedil: Rcedil$1,
	rcedil: rcedil$1,
	rceil: rceil$1,
	rcub: rcub$1,
	Rcy: Rcy$1,
	rcy: rcy$1,
	rdca: rdca$1,
	rdldhar: rdldhar$1,
	rdquo: rdquo$1,
	rdquor: rdquor$1,
	rdsh: rdsh$1,
	real: real$1,
	realine: realine$1,
	realpart: realpart$1,
	reals: reals$1,
	Re: Re$1,
	rect: rect$1,
	reg: reg$1$1,
	REG: REG$1$1,
	ReverseElement: ReverseElement$1,
	ReverseEquilibrium: ReverseEquilibrium$1,
	ReverseUpEquilibrium: ReverseUpEquilibrium$1,
	rfisht: rfisht$1,
	rfloor: rfloor$1,
	rfr: rfr$1,
	Rfr: Rfr$1,
	rHar: rHar$1,
	rhard: rhard$1,
	rharu: rharu$1,
	rharul: rharul$1,
	Rho: Rho$1,
	rho: rho$1,
	rhov: rhov$1,
	RightAngleBracket: RightAngleBracket$1,
	RightArrowBar: RightArrowBar$1,
	rightarrow: rightarrow$1,
	RightArrow: RightArrow$1,
	Rightarrow: Rightarrow$1,
	RightArrowLeftArrow: RightArrowLeftArrow$1,
	rightarrowtail: rightarrowtail$1,
	RightCeiling: RightCeiling$1,
	RightDoubleBracket: RightDoubleBracket$1,
	RightDownTeeVector: RightDownTeeVector$1,
	RightDownVectorBar: RightDownVectorBar$1,
	RightDownVector: RightDownVector$1,
	RightFloor: RightFloor$1,
	rightharpoondown: rightharpoondown$1,
	rightharpoonup: rightharpoonup$1,
	rightleftarrows: rightleftarrows$1,
	rightleftharpoons: rightleftharpoons$1,
	rightrightarrows: rightrightarrows$1,
	rightsquigarrow: rightsquigarrow$1,
	RightTeeArrow: RightTeeArrow$1,
	RightTee: RightTee$1,
	RightTeeVector: RightTeeVector$1,
	rightthreetimes: rightthreetimes$1,
	RightTriangleBar: RightTriangleBar$1,
	RightTriangle: RightTriangle$1,
	RightTriangleEqual: RightTriangleEqual$1,
	RightUpDownVector: RightUpDownVector$1,
	RightUpTeeVector: RightUpTeeVector$1,
	RightUpVectorBar: RightUpVectorBar$1,
	RightUpVector: RightUpVector$1,
	RightVectorBar: RightVectorBar$1,
	RightVector: RightVector$1,
	ring: ring$1,
	risingdotseq: risingdotseq$1,
	rlarr: rlarr$1,
	rlhar: rlhar$1,
	rlm: rlm$1,
	rmoustache: rmoustache$1,
	rmoust: rmoust$1,
	rnmid: rnmid$1,
	roang: roang$1,
	roarr: roarr$1,
	robrk: robrk$1,
	ropar: ropar$1,
	ropf: ropf$1,
	Ropf: Ropf$1,
	roplus: roplus$1,
	rotimes: rotimes$1,
	RoundImplies: RoundImplies$1,
	rpar: rpar$1,
	rpargt: rpargt$1,
	rppolint: rppolint$1,
	rrarr: rrarr$1,
	Rrightarrow: Rrightarrow$1,
	rsaquo: rsaquo$1,
	rscr: rscr$1,
	Rscr: Rscr$1,
	rsh: rsh$1,
	Rsh: Rsh$1,
	rsqb: rsqb$1,
	rsquo: rsquo$1,
	rsquor: rsquor$1,
	rthree: rthree$1,
	rtimes: rtimes$1,
	rtri: rtri$1,
	rtrie: rtrie$1,
	rtrif: rtrif$1,
	rtriltri: rtriltri$1,
	RuleDelayed: RuleDelayed$1,
	ruluhar: ruluhar$1,
	rx: rx$1,
	Sacute: Sacute$1,
	sacute: sacute$1,
	sbquo: sbquo$1,
	scap: scap$1,
	Scaron: Scaron$1,
	scaron: scaron$1,
	Sc: Sc$1,
	sc: sc$1,
	sccue: sccue$1,
	sce: sce$1,
	scE: scE$1,
	Scedil: Scedil$1,
	scedil: scedil$1,
	Scirc: Scirc$1,
	scirc: scirc$1,
	scnap: scnap$1,
	scnE: scnE$1,
	scnsim: scnsim$1,
	scpolint: scpolint$1,
	scsim: scsim$1,
	Scy: Scy$1,
	scy: scy$1,
	sdotb: sdotb$1,
	sdot: sdot$1,
	sdote: sdote$1,
	searhk: searhk$1,
	searr: searr$1,
	seArr: seArr$1,
	searrow: searrow$1,
	sect: sect$1$1,
	semi: semi$1,
	seswar: seswar$1,
	setminus: setminus$1,
	setmn: setmn$1,
	sext: sext$1,
	Sfr: Sfr$1,
	sfr: sfr$1,
	sfrown: sfrown$1,
	sharp: sharp$1,
	SHCHcy: SHCHcy$1,
	shchcy: shchcy$1,
	SHcy: SHcy$1,
	shcy: shcy$1,
	ShortDownArrow: ShortDownArrow$1,
	ShortLeftArrow: ShortLeftArrow$1,
	shortmid: shortmid$1,
	shortparallel: shortparallel$1,
	ShortRightArrow: ShortRightArrow$1,
	ShortUpArrow: ShortUpArrow$1,
	shy: shy$1$1,
	Sigma: Sigma$1,
	sigma: sigma$1,
	sigmaf: sigmaf$1,
	sigmav: sigmav$1,
	sim: sim$1,
	simdot: simdot$1,
	sime: sime$1,
	simeq: simeq$1,
	simg: simg$1,
	simgE: simgE$1,
	siml: siml$1,
	simlE: simlE$1,
	simne: simne$1,
	simplus: simplus$1,
	simrarr: simrarr$1,
	slarr: slarr$1,
	SmallCircle: SmallCircle$1,
	smallsetminus: smallsetminus$1,
	smashp: smashp$1,
	smeparsl: smeparsl$1,
	smid: smid$1,
	smile: smile$1,
	smt: smt$1,
	smte: smte$1,
	smtes: smtes$1,
	SOFTcy: SOFTcy$1,
	softcy: softcy$1,
	solbar: solbar$1,
	solb: solb$1,
	sol: sol$1,
	Sopf: Sopf$1,
	sopf: sopf$1,
	spades: spades$1,
	spadesuit: spadesuit$1,
	spar: spar$1,
	sqcap: sqcap$1,
	sqcaps: sqcaps$1,
	sqcup: sqcup$1,
	sqcups: sqcups$1,
	Sqrt: Sqrt$1,
	sqsub: sqsub$1,
	sqsube: sqsube$1,
	sqsubset: sqsubset$1,
	sqsubseteq: sqsubseteq$1,
	sqsup: sqsup$1,
	sqsupe: sqsupe$1,
	sqsupset: sqsupset$1,
	sqsupseteq: sqsupseteq$1,
	square: square$1,
	Square: Square$1,
	SquareIntersection: SquareIntersection$1,
	SquareSubset: SquareSubset$1,
	SquareSubsetEqual: SquareSubsetEqual$1,
	SquareSuperset: SquareSuperset$1,
	SquareSupersetEqual: SquareSupersetEqual$1,
	SquareUnion: SquareUnion$1,
	squarf: squarf$1,
	squ: squ$1,
	squf: squf$1,
	srarr: srarr$1,
	Sscr: Sscr$1,
	sscr: sscr$1,
	ssetmn: ssetmn$1,
	ssmile: ssmile$1,
	sstarf: sstarf$1,
	Star: Star$1,
	star: star$1,
	starf: starf$1,
	straightepsilon: straightepsilon$1,
	straightphi: straightphi$1,
	strns: strns$1,
	sub: sub$1,
	Sub: Sub$1,
	subdot: subdot$1,
	subE: subE$1,
	sube: sube$1,
	subedot: subedot$1,
	submult: submult$1,
	subnE: subnE$1,
	subne: subne$1,
	subplus: subplus$1,
	subrarr: subrarr$1,
	subset: subset$1,
	Subset: Subset$1,
	subseteq: subseteq$1,
	subseteqq: subseteqq$1,
	SubsetEqual: SubsetEqual$1,
	subsetneq: subsetneq$1,
	subsetneqq: subsetneqq$1,
	subsim: subsim$1,
	subsub: subsub$1,
	subsup: subsup$1,
	succapprox: succapprox$1,
	succ: succ$1,
	succcurlyeq: succcurlyeq$1,
	Succeeds: Succeeds$1,
	SucceedsEqual: SucceedsEqual$1,
	SucceedsSlantEqual: SucceedsSlantEqual$1,
	SucceedsTilde: SucceedsTilde$1,
	succeq: succeq$1,
	succnapprox: succnapprox$1,
	succneqq: succneqq$1,
	succnsim: succnsim$1,
	succsim: succsim$1,
	SuchThat: SuchThat$1,
	sum: sum$1,
	Sum: Sum$1,
	sung: sung$1,
	sup1: sup1$1$1,
	sup2: sup2$1$1,
	sup3: sup3$1$1,
	sup: sup$1,
	Sup: Sup$1,
	supdot: supdot$1,
	supdsub: supdsub$1,
	supE: supE$1,
	supe: supe$1,
	supedot: supedot$1,
	Superset: Superset$1,
	SupersetEqual: SupersetEqual$1,
	suphsol: suphsol$1,
	suphsub: suphsub$1,
	suplarr: suplarr$1,
	supmult: supmult$1,
	supnE: supnE$1,
	supne: supne$1,
	supplus: supplus$1,
	supset: supset$1,
	Supset: Supset$1,
	supseteq: supseteq$1,
	supseteqq: supseteqq$1,
	supsetneq: supsetneq$1,
	supsetneqq: supsetneqq$1,
	supsim: supsim$1,
	supsub: supsub$1,
	supsup: supsup$1,
	swarhk: swarhk$1,
	swarr: swarr$1,
	swArr: swArr$1,
	swarrow: swarrow$1,
	swnwar: swnwar$1,
	szlig: szlig$1$1,
	Tab: Tab$1,
	target: target$1,
	Tau: Tau$1,
	tau: tau$1,
	tbrk: tbrk$1,
	Tcaron: Tcaron$1,
	tcaron: tcaron$1,
	Tcedil: Tcedil$1,
	tcedil: tcedil$1,
	Tcy: Tcy$1,
	tcy: tcy$1,
	tdot: tdot$1,
	telrec: telrec$1,
	Tfr: Tfr$1,
	tfr: tfr$1,
	there4: there4$1,
	therefore: therefore$1,
	Therefore: Therefore$1,
	Theta: Theta$1,
	theta: theta$1,
	thetasym: thetasym$1,
	thetav: thetav$1,
	thickapprox: thickapprox$1,
	thicksim: thicksim$1,
	ThickSpace: ThickSpace$1,
	ThinSpace: ThinSpace$1,
	thinsp: thinsp$1,
	thkap: thkap$1,
	thksim: thksim$1,
	THORN: THORN$1$1,
	thorn: thorn$1$1,
	tilde: tilde$1,
	Tilde: Tilde$1,
	TildeEqual: TildeEqual$1,
	TildeFullEqual: TildeFullEqual$1,
	TildeTilde: TildeTilde$1,
	timesbar: timesbar$1,
	timesb: timesb$1,
	times: times$2,
	timesd: timesd$1,
	tint: tint$1,
	toea: toea$1,
	topbot: topbot$1,
	topcir: topcir$1,
	top: top$1,
	Topf: Topf$1,
	topf: topf$1,
	topfork: topfork$1,
	tosa: tosa$1,
	tprime: tprime$1,
	trade: trade$1,
	TRADE: TRADE$1,
	triangle: triangle$1,
	triangledown: triangledown$1,
	triangleleft: triangleleft$1,
	trianglelefteq: trianglelefteq$1,
	triangleq: triangleq$1,
	triangleright: triangleright$1,
	trianglerighteq: trianglerighteq$1,
	tridot: tridot$1,
	trie: trie$1,
	triminus: triminus$1,
	TripleDot: TripleDot$1,
	triplus: triplus$1,
	trisb: trisb$1,
	tritime: tritime$1,
	trpezium: trpezium$1,
	Tscr: Tscr$1,
	tscr: tscr$1,
	TScy: TScy$1,
	tscy: tscy$1,
	TSHcy: TSHcy$1,
	tshcy: tshcy$1,
	Tstrok: Tstrok$1,
	tstrok: tstrok$1,
	twixt: twixt$1,
	twoheadleftarrow: twoheadleftarrow$1,
	twoheadrightarrow: twoheadrightarrow$1,
	Uacute: Uacute$1$1,
	uacute: uacute$1$1,
	uarr: uarr$1,
	Uarr: Uarr$1,
	uArr: uArr$1,
	Uarrocir: Uarrocir$1,
	Ubrcy: Ubrcy$1,
	ubrcy: ubrcy$1,
	Ubreve: Ubreve$1,
	ubreve: ubreve$1,
	Ucirc: Ucirc$1$1,
	ucirc: ucirc$1$1,
	Ucy: Ucy$1,
	ucy: ucy$1,
	udarr: udarr$1,
	Udblac: Udblac$1,
	udblac: udblac$1,
	udhar: udhar$1,
	ufisht: ufisht$1,
	Ufr: Ufr$1,
	ufr: ufr$1,
	Ugrave: Ugrave$1$1,
	ugrave: ugrave$1$1,
	uHar: uHar$1,
	uharl: uharl$1,
	uharr: uharr$1,
	uhblk: uhblk$1,
	ulcorn: ulcorn$1,
	ulcorner: ulcorner$1,
	ulcrop: ulcrop$1,
	ultri: ultri$1,
	Umacr: Umacr$1,
	umacr: umacr$1,
	uml: uml$1$1,
	UnderBar: UnderBar$1,
	UnderBrace: UnderBrace$1,
	UnderBracket: UnderBracket$1,
	UnderParenthesis: UnderParenthesis$1,
	Union: Union$1,
	UnionPlus: UnionPlus$1,
	Uogon: Uogon$1,
	uogon: uogon$1,
	Uopf: Uopf$1,
	uopf: uopf$1,
	UpArrowBar: UpArrowBar$1,
	uparrow: uparrow$1,
	UpArrow: UpArrow$1,
	Uparrow: Uparrow$1,
	UpArrowDownArrow: UpArrowDownArrow$1,
	updownarrow: updownarrow$1,
	UpDownArrow: UpDownArrow$1,
	Updownarrow: Updownarrow$1,
	UpEquilibrium: UpEquilibrium$1,
	upharpoonleft: upharpoonleft$1,
	upharpoonright: upharpoonright$1,
	uplus: uplus$1,
	UpperLeftArrow: UpperLeftArrow$1,
	UpperRightArrow: UpperRightArrow$1,
	upsi: upsi$1,
	Upsi: Upsi$1,
	upsih: upsih$1,
	Upsilon: Upsilon$1,
	upsilon: upsilon$1,
	UpTeeArrow: UpTeeArrow$1,
	UpTee: UpTee$1,
	upuparrows: upuparrows$1,
	urcorn: urcorn$1,
	urcorner: urcorner$1,
	urcrop: urcrop$1,
	Uring: Uring$1,
	uring: uring$1,
	urtri: urtri$1,
	Uscr: Uscr$1,
	uscr: uscr$1,
	utdot: utdot$1,
	Utilde: Utilde$1,
	utilde: utilde$1,
	utri: utri$1,
	utrif: utrif$1,
	uuarr: uuarr$1,
	Uuml: Uuml$1$1,
	uuml: uuml$1$1,
	uwangle: uwangle$1,
	vangrt: vangrt$1,
	varepsilon: varepsilon$1,
	varkappa: varkappa$1,
	varnothing: varnothing$1,
	varphi: varphi$1,
	varpi: varpi$1,
	varpropto: varpropto$1,
	varr: varr$1,
	vArr: vArr$1,
	varrho: varrho$1,
	varsigma: varsigma$1,
	varsubsetneq: varsubsetneq$1,
	varsubsetneqq: varsubsetneqq$1,
	varsupsetneq: varsupsetneq$1,
	varsupsetneqq: varsupsetneqq$1,
	vartheta: vartheta$1,
	vartriangleleft: vartriangleleft$1,
	vartriangleright: vartriangleright$1,
	vBar: vBar$1,
	Vbar: Vbar$1,
	vBarv: vBarv$1,
	Vcy: Vcy$1,
	vcy: vcy$1,
	vdash: vdash$1,
	vDash: vDash$1,
	Vdash: Vdash$1,
	VDash: VDash$1,
	Vdashl: Vdashl$1,
	veebar: veebar$1,
	vee: vee$1,
	Vee: Vee$1,
	veeeq: veeeq$1,
	vellip: vellip$1,
	verbar: verbar$1,
	Verbar: Verbar$1,
	vert: vert$1,
	Vert: Vert$1,
	VerticalBar: VerticalBar$1,
	VerticalLine: VerticalLine$1,
	VerticalSeparator: VerticalSeparator$1,
	VerticalTilde: VerticalTilde$1,
	VeryThinSpace: VeryThinSpace$1,
	Vfr: Vfr$1,
	vfr: vfr$1,
	vltri: vltri$1,
	vnsub: vnsub$1,
	vnsup: vnsup$1,
	Vopf: Vopf$1,
	vopf: vopf$1,
	vprop: vprop$1,
	vrtri: vrtri$1,
	Vscr: Vscr$1,
	vscr: vscr$1,
	vsubnE: vsubnE$1,
	vsubne: vsubne$1,
	vsupnE: vsupnE$1,
	vsupne: vsupne$1,
	Vvdash: Vvdash$1,
	vzigzag: vzigzag$1,
	Wcirc: Wcirc$1,
	wcirc: wcirc$1,
	wedbar: wedbar$1,
	wedge: wedge$1,
	Wedge: Wedge$1,
	wedgeq: wedgeq$1,
	weierp: weierp$1,
	Wfr: Wfr$1,
	wfr: wfr$1,
	Wopf: Wopf$1,
	wopf: wopf$1,
	wp: wp$1,
	wr: wr$1,
	wreath: wreath$1,
	Wscr: Wscr$1,
	wscr: wscr$1,
	xcap: xcap$1,
	xcirc: xcirc$1,
	xcup: xcup$1,
	xdtri: xdtri$1,
	Xfr: Xfr$1,
	xfr: xfr$1,
	xharr: xharr$1,
	xhArr: xhArr$1,
	Xi: Xi$1,
	xi: xi$1,
	xlarr: xlarr$1,
	xlArr: xlArr$1,
	xmap: xmap$1,
	xnis: xnis$1,
	xodot: xodot$1,
	Xopf: Xopf$1,
	xopf: xopf$1,
	xoplus: xoplus$1,
	xotime: xotime$1,
	xrarr: xrarr$1,
	xrArr: xrArr$1,
	Xscr: Xscr$1,
	xscr: xscr$1,
	xsqcup: xsqcup$1,
	xuplus: xuplus$1,
	xutri: xutri$1,
	xvee: xvee$1,
	xwedge: xwedge$1,
	Yacute: Yacute$1$1,
	yacute: yacute$1$1,
	YAcy: YAcy$1,
	yacy: yacy$1,
	Ycirc: Ycirc$1,
	ycirc: ycirc$1,
	Ycy: Ycy$1,
	ycy: ycy$1,
	yen: yen$1$1,
	Yfr: Yfr$1,
	yfr: yfr$1,
	YIcy: YIcy$1,
	yicy: yicy$1,
	Yopf: Yopf$1,
	yopf: yopf$1,
	Yscr: Yscr$1,
	yscr: yscr$1,
	YUcy: YUcy$1,
	yucy: yucy$1,
	yuml: yuml$1$1,
	Yuml: Yuml$1,
	Zacute: Zacute$1,
	zacute: zacute$1,
	Zcaron: Zcaron$1,
	zcaron: zcaron$1,
	Zcy: Zcy$1,
	zcy: zcy$1,
	Zdot: Zdot$1,
	zdot: zdot$1,
	zeetrf: zeetrf$1,
	ZeroWidthSpace: ZeroWidthSpace$1,
	Zeta: Zeta$1,
	zeta: zeta$1,
	zfr: zfr$1,
	Zfr: Zfr$1,
	ZHcy: ZHcy$1,
	zhcy: zhcy$1,
	zigrarr: zigrarr$1,
	zopf: zopf$1,
	Zopf: Zopf$1,
	Zscr: Zscr$1,
	zscr: zscr$1,
	zwj: zwj$1,
	zwnj: zwnj$1,
	"in": "∈",
	"Map": "⤅"
};

var entities$2 = Object.freeze({
	Aacute: Aacute$1$1,
	aacute: aacute$1$1,
	Abreve: Abreve$1,
	abreve: abreve$1,
	ac: ac$1,
	acd: acd$1,
	acE: acE$1,
	Acirc: Acirc$1$1,
	acirc: acirc$1$1,
	acute: acute$1$1,
	Acy: Acy$1,
	acy: acy$1,
	AElig: AElig$1$1,
	aelig: aelig$1$1,
	af: af$1,
	Afr: Afr$1,
	afr: afr$1,
	Agrave: Agrave$1$1,
	agrave: agrave$1$1,
	alefsym: alefsym$1,
	aleph: aleph$1,
	Alpha: Alpha$1,
	alpha: alpha$1,
	Amacr: Amacr$1,
	amacr: amacr$1,
	amalg: amalg$1,
	amp: amp$1$2,
	AMP: AMP$1$1,
	andand: andand$1,
	And: And$1,
	and: and$1,
	andd: andd$1,
	andslope: andslope$1,
	andv: andv$1,
	ang: ang$1,
	ange: ange$1,
	angle: angle$1,
	angmsdaa: angmsdaa$1,
	angmsdab: angmsdab$1,
	angmsdac: angmsdac$1,
	angmsdad: angmsdad$1,
	angmsdae: angmsdae$1,
	angmsdaf: angmsdaf$1,
	angmsdag: angmsdag$1,
	angmsdah: angmsdah$1,
	angmsd: angmsd$1,
	angrt: angrt$1,
	angrtvb: angrtvb$1,
	angrtvbd: angrtvbd$1,
	angsph: angsph$1,
	angst: angst$1,
	angzarr: angzarr$1,
	Aogon: Aogon$1,
	aogon: aogon$1,
	Aopf: Aopf$1,
	aopf: aopf$1,
	apacir: apacir$1,
	ap: ap$1,
	apE: apE$1,
	ape: ape$1,
	apid: apid$1,
	apos: apos$1$2,
	ApplyFunction: ApplyFunction$1,
	approx: approx$1,
	approxeq: approxeq$1,
	Aring: Aring$1$1,
	aring: aring$1$1,
	Ascr: Ascr$1,
	ascr: ascr$1,
	Assign: Assign$1,
	ast: ast$1,
	asymp: asymp$1,
	asympeq: asympeq$1,
	Atilde: Atilde$1$1,
	atilde: atilde$1$1,
	Auml: Auml$1$1,
	auml: auml$1$1,
	awconint: awconint$1,
	awint: awint$1,
	backcong: backcong$1,
	backepsilon: backepsilon$1,
	backprime: backprime$1,
	backsim: backsim$1,
	backsimeq: backsimeq$1,
	Backslash: Backslash$1,
	Barv: Barv$1,
	barvee: barvee$1,
	barwed: barwed$1,
	Barwed: Barwed$1,
	barwedge: barwedge$1,
	bbrk: bbrk$1,
	bbrktbrk: bbrktbrk$1,
	bcong: bcong$1,
	Bcy: Bcy$1,
	bcy: bcy$1,
	bdquo: bdquo$1,
	becaus: becaus$1,
	because: because$1,
	Because: Because$1,
	bemptyv: bemptyv$1,
	bepsi: bepsi$1,
	bernou: bernou$1,
	Bernoullis: Bernoullis$1,
	Beta: Beta$1,
	beta: beta$1,
	beth: beth$1,
	between: between$1,
	Bfr: Bfr$1,
	bfr: bfr$1,
	bigcap: bigcap$1,
	bigcirc: bigcirc$1,
	bigcup: bigcup$1,
	bigodot: bigodot$1,
	bigoplus: bigoplus$1,
	bigotimes: bigotimes$1,
	bigsqcup: bigsqcup$1,
	bigstar: bigstar$1,
	bigtriangledown: bigtriangledown$1,
	bigtriangleup: bigtriangleup$1,
	biguplus: biguplus$1,
	bigvee: bigvee$1,
	bigwedge: bigwedge$1,
	bkarow: bkarow$1,
	blacklozenge: blacklozenge$1,
	blacksquare: blacksquare$1,
	blacktriangle: blacktriangle$1,
	blacktriangledown: blacktriangledown$1,
	blacktriangleleft: blacktriangleleft$1,
	blacktriangleright: blacktriangleright$1,
	blank: blank$1,
	blk12: blk12$1,
	blk14: blk14$1,
	blk34: blk34$1,
	block: block$1,
	bne: bne$1,
	bnequiv: bnequiv$1,
	bNot: bNot$1,
	bnot: bnot$1,
	Bopf: Bopf$1,
	bopf: bopf$1,
	bot: bot$1,
	bottom: bottom$1,
	bowtie: bowtie$1,
	boxbox: boxbox$1,
	boxdl: boxdl$1,
	boxdL: boxdL$1,
	boxDl: boxDl$1,
	boxDL: boxDL$1,
	boxdr: boxdr$1,
	boxdR: boxdR$1,
	boxDr: boxDr$1,
	boxDR: boxDR$1,
	boxh: boxh$1,
	boxH: boxH$1,
	boxhd: boxhd$1,
	boxHd: boxHd$1,
	boxhD: boxhD$1,
	boxHD: boxHD$1,
	boxhu: boxhu$1,
	boxHu: boxHu$1,
	boxhU: boxhU$1,
	boxHU: boxHU$1,
	boxminus: boxminus$1,
	boxplus: boxplus$1,
	boxtimes: boxtimes$1,
	boxul: boxul$1,
	boxuL: boxuL$1,
	boxUl: boxUl$1,
	boxUL: boxUL$1,
	boxur: boxur$1,
	boxuR: boxuR$1,
	boxUr: boxUr$1,
	boxUR: boxUR$1,
	boxv: boxv$1,
	boxV: boxV$1,
	boxvh: boxvh$1,
	boxvH: boxvH$1,
	boxVh: boxVh$1,
	boxVH: boxVH$1,
	boxvl: boxvl$1,
	boxvL: boxvL$1,
	boxVl: boxVl$1,
	boxVL: boxVL$1,
	boxvr: boxvr$1,
	boxvR: boxvR$1,
	boxVr: boxVr$1,
	boxVR: boxVR$1,
	bprime: bprime$1,
	breve: breve$1,
	Breve: Breve$1,
	brvbar: brvbar$1$1,
	bscr: bscr$1,
	Bscr: Bscr$1,
	bsemi: bsemi$1,
	bsim: bsim$1,
	bsime: bsime$1,
	bsolb: bsolb$1,
	bsol: bsol$1,
	bsolhsub: bsolhsub$1,
	bull: bull$1,
	bullet: bullet$1,
	bump: bump$1,
	bumpE: bumpE$1,
	bumpe: bumpe$1,
	Bumpeq: Bumpeq$1,
	bumpeq: bumpeq$1,
	Cacute: Cacute$1,
	cacute: cacute$1,
	capand: capand$1,
	capbrcup: capbrcup$1,
	capcap: capcap$1,
	cap: cap$1,
	Cap: Cap$1,
	capcup: capcup$1,
	capdot: capdot$1,
	CapitalDifferentialD: CapitalDifferentialD$1,
	caps: caps$1,
	caret: caret$1,
	caron: caron$1,
	Cayleys: Cayleys$1,
	ccaps: ccaps$1,
	Ccaron: Ccaron$1,
	ccaron: ccaron$1,
	Ccedil: Ccedil$1$1,
	ccedil: ccedil$1$1,
	Ccirc: Ccirc$1,
	ccirc: ccirc$1,
	Cconint: Cconint$1,
	ccups: ccups$1,
	ccupssm: ccupssm$1,
	Cdot: Cdot$1,
	cdot: cdot$1,
	cedil: cedil$1$1,
	Cedilla: Cedilla$1,
	cemptyv: cemptyv$1,
	cent: cent$1$1,
	centerdot: centerdot$1,
	CenterDot: CenterDot$1,
	cfr: cfr$1,
	Cfr: Cfr$1,
	CHcy: CHcy$1,
	chcy: chcy$1,
	check: check$1,
	checkmark: checkmark$1,
	Chi: Chi$1,
	chi: chi$1,
	circ: circ$1,
	circeq: circeq$1,
	circlearrowleft: circlearrowleft$1,
	circlearrowright: circlearrowright$1,
	circledast: circledast$1,
	circledcirc: circledcirc$1,
	circleddash: circleddash$1,
	CircleDot: CircleDot$1,
	circledR: circledR$1,
	circledS: circledS$1,
	CircleMinus: CircleMinus$1,
	CirclePlus: CirclePlus$1,
	CircleTimes: CircleTimes$1,
	cir: cir$1,
	cirE: cirE$1,
	cire: cire$1,
	cirfnint: cirfnint$1,
	cirmid: cirmid$1,
	cirscir: cirscir$1,
	ClockwiseContourIntegral: ClockwiseContourIntegral$1,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote$1,
	CloseCurlyQuote: CloseCurlyQuote$1,
	clubs: clubs$1,
	clubsuit: clubsuit$1,
	colon: colon$1,
	Colon: Colon$1,
	Colone: Colone$1,
	colone: colone$1,
	coloneq: coloneq$1,
	comma: comma$1,
	commat: commat$1,
	comp: comp$1,
	compfn: compfn$1,
	complement: complement$1,
	complexes: complexes$1,
	cong: cong$1,
	congdot: congdot$1,
	Congruent: Congruent$1,
	conint: conint$1,
	Conint: Conint$1,
	ContourIntegral: ContourIntegral$1,
	copf: copf$1,
	Copf: Copf$1,
	coprod: coprod$1,
	Coproduct: Coproduct$1,
	copy: copy$1$1,
	COPY: COPY$1$1,
	copysr: copysr$1,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral$1,
	crarr: crarr$1,
	cross: cross$1,
	Cross: Cross$1,
	Cscr: Cscr$1,
	cscr: cscr$1,
	csub: csub$1,
	csube: csube$1,
	csup: csup$1,
	csupe: csupe$1,
	ctdot: ctdot$1,
	cudarrl: cudarrl$1,
	cudarrr: cudarrr$1,
	cuepr: cuepr$1,
	cuesc: cuesc$1,
	cularr: cularr$1,
	cularrp: cularrp$1,
	cupbrcap: cupbrcap$1,
	cupcap: cupcap$1,
	CupCap: CupCap$1,
	cup: cup$1,
	Cup: Cup$1,
	cupcup: cupcup$1,
	cupdot: cupdot$1,
	cupor: cupor$1,
	cups: cups$1,
	curarr: curarr$1,
	curarrm: curarrm$1,
	curlyeqprec: curlyeqprec$1,
	curlyeqsucc: curlyeqsucc$1,
	curlyvee: curlyvee$1,
	curlywedge: curlywedge$1,
	curren: curren$1$1,
	curvearrowleft: curvearrowleft$1,
	curvearrowright: curvearrowright$1,
	cuvee: cuvee$1,
	cuwed: cuwed$1,
	cwconint: cwconint$1,
	cwint: cwint$1,
	cylcty: cylcty$1,
	dagger: dagger$1,
	Dagger: Dagger$1,
	daleth: daleth$1,
	darr: darr$1,
	Darr: Darr$1,
	dArr: dArr$1,
	dash: dash$1,
	Dashv: Dashv$1,
	dashv: dashv$1,
	dbkarow: dbkarow$1,
	dblac: dblac$1,
	Dcaron: Dcaron$1,
	dcaron: dcaron$1,
	Dcy: Dcy$1,
	dcy: dcy$1,
	ddagger: ddagger$1,
	ddarr: ddarr$1,
	DD: DD$1,
	dd: dd$1,
	DDotrahd: DDotrahd$1,
	ddotseq: ddotseq$1,
	deg: deg$1$1,
	Del: Del$1,
	Delta: Delta$1,
	delta: delta$1,
	demptyv: demptyv$1,
	dfisht: dfisht$1,
	Dfr: Dfr$1,
	dfr: dfr$1,
	dHar: dHar$1,
	dharl: dharl$1,
	dharr: dharr$1,
	DiacriticalAcute: DiacriticalAcute$1,
	DiacriticalDot: DiacriticalDot$1,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute$1,
	DiacriticalGrave: DiacriticalGrave$1,
	DiacriticalTilde: DiacriticalTilde$1,
	diam: diam$1,
	diamond: diamond$1,
	Diamond: Diamond$1,
	diamondsuit: diamondsuit$1,
	diams: diams$1,
	die: die$1,
	DifferentialD: DifferentialD$1,
	digamma: digamma$1,
	disin: disin$1,
	div: div$1,
	divide: divide$1$1,
	divideontimes: divideontimes$1,
	divonx: divonx$1,
	DJcy: DJcy$1,
	djcy: djcy$1,
	dlcorn: dlcorn$1,
	dlcrop: dlcrop$1,
	dollar: dollar$1,
	Dopf: Dopf$1,
	dopf: dopf$1,
	Dot: Dot$1,
	dot: dot$1,
	DotDot: DotDot$1,
	doteq: doteq$1,
	doteqdot: doteqdot$1,
	DotEqual: DotEqual$1,
	dotminus: dotminus$1,
	dotplus: dotplus$1,
	dotsquare: dotsquare$1,
	doublebarwedge: doublebarwedge$1,
	DoubleContourIntegral: DoubleContourIntegral$1,
	DoubleDot: DoubleDot$1,
	DoubleDownArrow: DoubleDownArrow$1,
	DoubleLeftArrow: DoubleLeftArrow$1,
	DoubleLeftRightArrow: DoubleLeftRightArrow$1,
	DoubleLeftTee: DoubleLeftTee$1,
	DoubleLongLeftArrow: DoubleLongLeftArrow$1,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow$1,
	DoubleLongRightArrow: DoubleLongRightArrow$1,
	DoubleRightArrow: DoubleRightArrow$1,
	DoubleRightTee: DoubleRightTee$1,
	DoubleUpArrow: DoubleUpArrow$1,
	DoubleUpDownArrow: DoubleUpDownArrow$1,
	DoubleVerticalBar: DoubleVerticalBar$1,
	DownArrowBar: DownArrowBar$1,
	downarrow: downarrow$1,
	DownArrow: DownArrow$1,
	Downarrow: Downarrow$1,
	DownArrowUpArrow: DownArrowUpArrow$1,
	DownBreve: DownBreve$1,
	downdownarrows: downdownarrows$1,
	downharpoonleft: downharpoonleft$1,
	downharpoonright: downharpoonright$1,
	DownLeftRightVector: DownLeftRightVector$1,
	DownLeftTeeVector: DownLeftTeeVector$1,
	DownLeftVectorBar: DownLeftVectorBar$1,
	DownLeftVector: DownLeftVector$1,
	DownRightTeeVector: DownRightTeeVector$1,
	DownRightVectorBar: DownRightVectorBar$1,
	DownRightVector: DownRightVector$1,
	DownTeeArrow: DownTeeArrow$1,
	DownTee: DownTee$1,
	drbkarow: drbkarow$1,
	drcorn: drcorn$1,
	drcrop: drcrop$1,
	Dscr: Dscr$1,
	dscr: dscr$1,
	DScy: DScy$1,
	dscy: dscy$1,
	dsol: dsol$1,
	Dstrok: Dstrok$1,
	dstrok: dstrok$1,
	dtdot: dtdot$1,
	dtri: dtri$1,
	dtrif: dtrif$1,
	duarr: duarr$1,
	duhar: duhar$1,
	dwangle: dwangle$1,
	DZcy: DZcy$1,
	dzcy: dzcy$1,
	dzigrarr: dzigrarr$1,
	Eacute: Eacute$1$1,
	eacute: eacute$1$1,
	easter: easter$1,
	Ecaron: Ecaron$1,
	ecaron: ecaron$1,
	Ecirc: Ecirc$1$1,
	ecirc: ecirc$1$1,
	ecir: ecir$1,
	ecolon: ecolon$1,
	Ecy: Ecy$1,
	ecy: ecy$1,
	eDDot: eDDot$1,
	Edot: Edot$1,
	edot: edot$1,
	eDot: eDot$1,
	ee: ee$1,
	efDot: efDot$1,
	Efr: Efr$1,
	efr: efr$1,
	eg: eg$1,
	Egrave: Egrave$1$1,
	egrave: egrave$1$1,
	egs: egs$1,
	egsdot: egsdot$1,
	el: el$1,
	Element: Element$1,
	elinters: elinters$1,
	ell: ell$1,
	els: els$1,
	elsdot: elsdot$1,
	Emacr: Emacr$1,
	emacr: emacr$1,
	empty: empty$1,
	emptyset: emptyset$1,
	EmptySmallSquare: EmptySmallSquare$1,
	emptyv: emptyv$1,
	EmptyVerySmallSquare: EmptyVerySmallSquare$1,
	emsp13: emsp13$1,
	emsp14: emsp14$1,
	emsp: emsp$1,
	ENG: ENG$1,
	eng: eng$1,
	ensp: ensp$1,
	Eogon: Eogon$1,
	eogon: eogon$1,
	Eopf: Eopf$1,
	eopf: eopf$1,
	epar: epar$1,
	eparsl: eparsl$1,
	eplus: eplus$1,
	epsi: epsi$1,
	Epsilon: Epsilon$1,
	epsilon: epsilon$1,
	epsiv: epsiv$1,
	eqcirc: eqcirc$1,
	eqcolon: eqcolon$1,
	eqsim: eqsim$1,
	eqslantgtr: eqslantgtr$1,
	eqslantless: eqslantless$1,
	Equal: Equal$1,
	equals: equals$1,
	EqualTilde: EqualTilde$1,
	equest: equest$1,
	Equilibrium: Equilibrium$1,
	equiv: equiv$1,
	equivDD: equivDD$1,
	eqvparsl: eqvparsl$1,
	erarr: erarr$1,
	erDot: erDot$1,
	escr: escr$1,
	Escr: Escr$1,
	esdot: esdot$1,
	Esim: Esim$1,
	esim: esim$1,
	Eta: Eta$1,
	eta: eta$1,
	ETH: ETH$1$1,
	eth: eth$1$1,
	Euml: Euml$1$1,
	euml: euml$1$1,
	euro: euro$1,
	excl: excl$1,
	exist: exist$1,
	Exists: Exists$1,
	expectation: expectation$1,
	exponentiale: exponentiale$1,
	ExponentialE: ExponentialE$1,
	fallingdotseq: fallingdotseq$1,
	Fcy: Fcy$1,
	fcy: fcy$1,
	female: female$1,
	ffilig: ffilig$1,
	fflig: fflig$1,
	ffllig: ffllig$1,
	Ffr: Ffr$1,
	ffr: ffr$1,
	filig: filig$1,
	FilledSmallSquare: FilledSmallSquare$1,
	FilledVerySmallSquare: FilledVerySmallSquare$1,
	fjlig: fjlig$1,
	flat: flat$1,
	fllig: fllig$1,
	fltns: fltns$1,
	fnof: fnof$1,
	Fopf: Fopf$1,
	fopf: fopf$1,
	forall: forall$1,
	ForAll: ForAll$1,
	fork: fork$1,
	forkv: forkv$1,
	Fouriertrf: Fouriertrf$1,
	fpartint: fpartint$1,
	frac12: frac12$1$1,
	frac13: frac13$1,
	frac14: frac14$1$1,
	frac15: frac15$1,
	frac16: frac16$1,
	frac18: frac18$1,
	frac23: frac23$1,
	frac25: frac25$1,
	frac34: frac34$1$1,
	frac35: frac35$1,
	frac38: frac38$1,
	frac45: frac45$1,
	frac56: frac56$1,
	frac58: frac58$1,
	frac78: frac78$1,
	frasl: frasl$1,
	frown: frown$1,
	fscr: fscr$1,
	Fscr: Fscr$1,
	gacute: gacute$1,
	Gamma: Gamma$1,
	gamma: gamma$1,
	Gammad: Gammad$1,
	gammad: gammad$1,
	gap: gap$1,
	Gbreve: Gbreve$1,
	gbreve: gbreve$1,
	Gcedil: Gcedil$1,
	Gcirc: Gcirc$1,
	gcirc: gcirc$1,
	Gcy: Gcy$1,
	gcy: gcy$1,
	Gdot: Gdot$1,
	gdot: gdot$1,
	ge: ge$1,
	gE: gE$1,
	gEl: gEl$1,
	gel: gel$1,
	geq: geq$1,
	geqq: geqq$1,
	geqslant: geqslant$1,
	gescc: gescc$1,
	ges: ges$1,
	gesdot: gesdot$1,
	gesdoto: gesdoto$1,
	gesdotol: gesdotol$1,
	gesl: gesl$1,
	gesles: gesles$1,
	Gfr: Gfr$1,
	gfr: gfr$1,
	gg: gg$1,
	Gg: Gg$1,
	ggg: ggg$1,
	gimel: gimel$1,
	GJcy: GJcy$1,
	gjcy: gjcy$1,
	gla: gla$1,
	gl: gl$1,
	glE: glE$1,
	glj: glj$1,
	gnap: gnap$1,
	gnapprox: gnapprox$1,
	gne: gne$1,
	gnE: gnE$1,
	gneq: gneq$1,
	gneqq: gneqq$1,
	gnsim: gnsim$1,
	Gopf: Gopf$1,
	gopf: gopf$1,
	grave: grave$1,
	GreaterEqual: GreaterEqual$1,
	GreaterEqualLess: GreaterEqualLess$1,
	GreaterFullEqual: GreaterFullEqual$1,
	GreaterGreater: GreaterGreater$1,
	GreaterLess: GreaterLess$1,
	GreaterSlantEqual: GreaterSlantEqual$1,
	GreaterTilde: GreaterTilde$1,
	Gscr: Gscr$1,
	gscr: gscr$1,
	gsim: gsim$1,
	gsime: gsime$1,
	gsiml: gsiml$1,
	gtcc: gtcc$1,
	gtcir: gtcir$1,
	gt: gt$1$2,
	GT: GT$1$1,
	Gt: Gt$1,
	gtdot: gtdot$1,
	gtlPar: gtlPar$1,
	gtquest: gtquest$1,
	gtrapprox: gtrapprox$1,
	gtrarr: gtrarr$1,
	gtrdot: gtrdot$1,
	gtreqless: gtreqless$1,
	gtreqqless: gtreqqless$1,
	gtrless: gtrless$1,
	gtrsim: gtrsim$1,
	gvertneqq: gvertneqq$1,
	gvnE: gvnE$1,
	Hacek: Hacek$1,
	hairsp: hairsp$1,
	half: half$1,
	hamilt: hamilt$1,
	HARDcy: HARDcy$1,
	hardcy: hardcy$1,
	harrcir: harrcir$1,
	harr: harr$1,
	hArr: hArr$1,
	harrw: harrw$1,
	Hat: Hat$1,
	hbar: hbar$1,
	Hcirc: Hcirc$1,
	hcirc: hcirc$1,
	hearts: hearts$1,
	heartsuit: heartsuit$1,
	hellip: hellip$1,
	hercon: hercon$1,
	hfr: hfr$1,
	Hfr: Hfr$1,
	HilbertSpace: HilbertSpace$1,
	hksearow: hksearow$1,
	hkswarow: hkswarow$1,
	hoarr: hoarr$1,
	homtht: homtht$1,
	hookleftarrow: hookleftarrow$1,
	hookrightarrow: hookrightarrow$1,
	hopf: hopf$1,
	Hopf: Hopf$1,
	horbar: horbar$1,
	HorizontalLine: HorizontalLine$1,
	hscr: hscr$1,
	Hscr: Hscr$1,
	hslash: hslash$1,
	Hstrok: Hstrok$1,
	hstrok: hstrok$1,
	HumpDownHump: HumpDownHump$1,
	HumpEqual: HumpEqual$1,
	hybull: hybull$1,
	hyphen: hyphen$1,
	Iacute: Iacute$1$1,
	iacute: iacute$1$1,
	ic: ic$1,
	Icirc: Icirc$1$1,
	icirc: icirc$1$1,
	Icy: Icy$1,
	icy: icy$1,
	Idot: Idot$1,
	IEcy: IEcy$1,
	iecy: iecy$1,
	iexcl: iexcl$1$1,
	iff: iff$1,
	ifr: ifr$1,
	Ifr: Ifr$1,
	Igrave: Igrave$1$1,
	igrave: igrave$1$1,
	ii: ii$1,
	iiiint: iiiint$1,
	iiint: iiint$1,
	iinfin: iinfin$1,
	iiota: iiota$1,
	IJlig: IJlig$1,
	ijlig: ijlig$1,
	Imacr: Imacr$1,
	imacr: imacr$1,
	image: image$1,
	ImaginaryI: ImaginaryI$1,
	imagline: imagline$1,
	imagpart: imagpart$1,
	imath: imath$1,
	Im: Im$1,
	imof: imof$1,
	imped: imped$1,
	Implies: Implies$1,
	incare: incare$1,
	infin: infin$1,
	infintie: infintie$1,
	inodot: inodot$1,
	intcal: intcal$1,
	int: int$1,
	Int: Int$1,
	integers: integers$1,
	Integral: Integral$1,
	intercal: intercal$1,
	Intersection: Intersection$1,
	intlarhk: intlarhk$1,
	intprod: intprod$1,
	InvisibleComma: InvisibleComma$1,
	InvisibleTimes: InvisibleTimes$1,
	IOcy: IOcy$1,
	iocy: iocy$1,
	Iogon: Iogon$1,
	iogon: iogon$1,
	Iopf: Iopf$1,
	iopf: iopf$1,
	Iota: Iota$1,
	iota: iota$1,
	iprod: iprod$1,
	iquest: iquest$1$1,
	iscr: iscr$1,
	Iscr: Iscr$1,
	isin: isin$1,
	isindot: isindot$1,
	isinE: isinE$1,
	isins: isins$1,
	isinsv: isinsv$1,
	isinv: isinv$1,
	it: it$1,
	Itilde: Itilde$1,
	itilde: itilde$1,
	Iukcy: Iukcy$1,
	iukcy: iukcy$1,
	Iuml: Iuml$1$1,
	iuml: iuml$1$1,
	Jcirc: Jcirc$1,
	jcirc: jcirc$1,
	Jcy: Jcy$1,
	jcy: jcy$1,
	Jfr: Jfr$1,
	jfr: jfr$1,
	jmath: jmath$1,
	Jopf: Jopf$1,
	jopf: jopf$1,
	Jscr: Jscr$1,
	jscr: jscr$1,
	Jsercy: Jsercy$1,
	jsercy: jsercy$1,
	Jukcy: Jukcy$1,
	jukcy: jukcy$1,
	Kappa: Kappa$1,
	kappa: kappa$1,
	kappav: kappav$1,
	Kcedil: Kcedil$1,
	kcedil: kcedil$1,
	Kcy: Kcy$1,
	kcy: kcy$1,
	Kfr: Kfr$1,
	kfr: kfr$1,
	kgreen: kgreen$1,
	KHcy: KHcy$1,
	khcy: khcy$1,
	KJcy: KJcy$1,
	kjcy: kjcy$1,
	Kopf: Kopf$1,
	kopf: kopf$1,
	Kscr: Kscr$1,
	kscr: kscr$1,
	lAarr: lAarr$1,
	Lacute: Lacute$1,
	lacute: lacute$1,
	laemptyv: laemptyv$1,
	lagran: lagran$1,
	Lambda: Lambda$1,
	lambda: lambda$1,
	lang: lang$1,
	Lang: Lang$1,
	langd: langd$1,
	langle: langle$1,
	lap: lap$1,
	Laplacetrf: Laplacetrf$1,
	laquo: laquo$1$1,
	larrb: larrb$1,
	larrbfs: larrbfs$1,
	larr: larr$1,
	Larr: Larr$1,
	lArr: lArr$1,
	larrfs: larrfs$1,
	larrhk: larrhk$1,
	larrlp: larrlp$1,
	larrpl: larrpl$1,
	larrsim: larrsim$1,
	larrtl: larrtl$1,
	latail: latail$1,
	lAtail: lAtail$1,
	lat: lat$1,
	late: late$1,
	lates: lates$1,
	lbarr: lbarr$1,
	lBarr: lBarr$1,
	lbbrk: lbbrk$1,
	lbrace: lbrace$1,
	lbrack: lbrack$1,
	lbrke: lbrke$1,
	lbrksld: lbrksld$1,
	lbrkslu: lbrkslu$1,
	Lcaron: Lcaron$1,
	lcaron: lcaron$1,
	Lcedil: Lcedil$1,
	lcedil: lcedil$1,
	lceil: lceil$1,
	lcub: lcub$1,
	Lcy: Lcy$1,
	lcy: lcy$1,
	ldca: ldca$1,
	ldquo: ldquo$1,
	ldquor: ldquor$1,
	ldrdhar: ldrdhar$1,
	ldrushar: ldrushar$1,
	ldsh: ldsh$1,
	le: le$1,
	lE: lE$1,
	LeftAngleBracket: LeftAngleBracket$1,
	LeftArrowBar: LeftArrowBar$1,
	leftarrow: leftarrow$1,
	LeftArrow: LeftArrow$1,
	Leftarrow: Leftarrow$1,
	LeftArrowRightArrow: LeftArrowRightArrow$1,
	leftarrowtail: leftarrowtail$1,
	LeftCeiling: LeftCeiling$1,
	LeftDoubleBracket: LeftDoubleBracket$1,
	LeftDownTeeVector: LeftDownTeeVector$1,
	LeftDownVectorBar: LeftDownVectorBar$1,
	LeftDownVector: LeftDownVector$1,
	LeftFloor: LeftFloor$1,
	leftharpoondown: leftharpoondown$1,
	leftharpoonup: leftharpoonup$1,
	leftleftarrows: leftleftarrows$1,
	leftrightarrow: leftrightarrow$1,
	LeftRightArrow: LeftRightArrow$1,
	Leftrightarrow: Leftrightarrow$1,
	leftrightarrows: leftrightarrows$1,
	leftrightharpoons: leftrightharpoons$1,
	leftrightsquigarrow: leftrightsquigarrow$1,
	LeftRightVector: LeftRightVector$1,
	LeftTeeArrow: LeftTeeArrow$1,
	LeftTee: LeftTee$1,
	LeftTeeVector: LeftTeeVector$1,
	leftthreetimes: leftthreetimes$1,
	LeftTriangleBar: LeftTriangleBar$1,
	LeftTriangle: LeftTriangle$1,
	LeftTriangleEqual: LeftTriangleEqual$1,
	LeftUpDownVector: LeftUpDownVector$1,
	LeftUpTeeVector: LeftUpTeeVector$1,
	LeftUpVectorBar: LeftUpVectorBar$1,
	LeftUpVector: LeftUpVector$1,
	LeftVectorBar: LeftVectorBar$1,
	LeftVector: LeftVector$1,
	lEg: lEg$1,
	leg: leg$1,
	leq: leq$1,
	leqq: leqq$1,
	leqslant: leqslant$1,
	lescc: lescc$1,
	les: les$1,
	lesdot: lesdot$1,
	lesdoto: lesdoto$1,
	lesdotor: lesdotor$1,
	lesg: lesg$1,
	lesges: lesges$1,
	lessapprox: lessapprox$1,
	lessdot: lessdot$1,
	lesseqgtr: lesseqgtr$1,
	lesseqqgtr: lesseqqgtr$1,
	LessEqualGreater: LessEqualGreater$1,
	LessFullEqual: LessFullEqual$1,
	LessGreater: LessGreater$1,
	lessgtr: lessgtr$1,
	LessLess: LessLess$1,
	lesssim: lesssim$1,
	LessSlantEqual: LessSlantEqual$1,
	LessTilde: LessTilde$1,
	lfisht: lfisht$1,
	lfloor: lfloor$1,
	Lfr: Lfr$1,
	lfr: lfr$1,
	lg: lg$1,
	lgE: lgE$1,
	lHar: lHar$1,
	lhard: lhard$1,
	lharu: lharu$1,
	lharul: lharul$1,
	lhblk: lhblk$1,
	LJcy: LJcy$1,
	ljcy: ljcy$1,
	llarr: llarr$1,
	ll: ll$1,
	Ll: Ll$1,
	llcorner: llcorner$1,
	Lleftarrow: Lleftarrow$1,
	llhard: llhard$1,
	lltri: lltri$1,
	Lmidot: Lmidot$1,
	lmidot: lmidot$1,
	lmoustache: lmoustache$1,
	lmoust: lmoust$1,
	lnap: lnap$1,
	lnapprox: lnapprox$1,
	lne: lne$1,
	lnE: lnE$1,
	lneq: lneq$1,
	lneqq: lneqq$1,
	lnsim: lnsim$1,
	loang: loang$1,
	loarr: loarr$1,
	lobrk: lobrk$1,
	longleftarrow: longleftarrow$1,
	LongLeftArrow: LongLeftArrow$1,
	Longleftarrow: Longleftarrow$1,
	longleftrightarrow: longleftrightarrow$1,
	LongLeftRightArrow: LongLeftRightArrow$1,
	Longleftrightarrow: Longleftrightarrow$1,
	longmapsto: longmapsto$1,
	longrightarrow: longrightarrow$1,
	LongRightArrow: LongRightArrow$1,
	Longrightarrow: Longrightarrow$1,
	looparrowleft: looparrowleft$1,
	looparrowright: looparrowright$1,
	lopar: lopar$1,
	Lopf: Lopf$1,
	lopf: lopf$1,
	loplus: loplus$1,
	lotimes: lotimes$1,
	lowast: lowast$1,
	lowbar: lowbar$1,
	LowerLeftArrow: LowerLeftArrow$1,
	LowerRightArrow: LowerRightArrow$1,
	loz: loz$1,
	lozenge: lozenge$1,
	lozf: lozf$1,
	lpar: lpar$1,
	lparlt: lparlt$1,
	lrarr: lrarr$1,
	lrcorner: lrcorner$1,
	lrhar: lrhar$1,
	lrhard: lrhard$1,
	lrm: lrm$1,
	lrtri: lrtri$1,
	lsaquo: lsaquo$1,
	lscr: lscr$1,
	Lscr: Lscr$1,
	lsh: lsh$1,
	Lsh: Lsh$1,
	lsim: lsim$1,
	lsime: lsime$1,
	lsimg: lsimg$1,
	lsqb: lsqb$1,
	lsquo: lsquo$1,
	lsquor: lsquor$1,
	Lstrok: Lstrok$1,
	lstrok: lstrok$1,
	ltcc: ltcc$1,
	ltcir: ltcir$1,
	lt: lt$1$2,
	LT: LT$1$1,
	Lt: Lt$1,
	ltdot: ltdot$1,
	lthree: lthree$1,
	ltimes: ltimes$1,
	ltlarr: ltlarr$1,
	ltquest: ltquest$1,
	ltri: ltri$1,
	ltrie: ltrie$1,
	ltrif: ltrif$1,
	ltrPar: ltrPar$1,
	lurdshar: lurdshar$1,
	luruhar: luruhar$1,
	lvertneqq: lvertneqq$1,
	lvnE: lvnE$1,
	macr: macr$1$1,
	male: male$1,
	malt: malt$1,
	maltese: maltese$1,
	map: map$2,
	mapsto: mapsto$1,
	mapstodown: mapstodown$1,
	mapstoleft: mapstoleft$1,
	mapstoup: mapstoup$1,
	marker: marker$1,
	mcomma: mcomma$1,
	Mcy: Mcy$1,
	mcy: mcy$1,
	mdash: mdash$1,
	mDDot: mDDot$1,
	measuredangle: measuredangle$1,
	MediumSpace: MediumSpace$1,
	Mellintrf: Mellintrf$1,
	Mfr: Mfr$1,
	mfr: mfr$1,
	mho: mho$1,
	micro: micro$1$1,
	midast: midast$1,
	midcir: midcir$1,
	mid: mid$1,
	middot: middot$1$1,
	minusb: minusb$1,
	minus: minus$1,
	minusd: minusd$1,
	minusdu: minusdu$1,
	MinusPlus: MinusPlus$1,
	mlcp: mlcp$1,
	mldr: mldr$1,
	mnplus: mnplus$1,
	models: models$1,
	Mopf: Mopf$1,
	mopf: mopf$1,
	mp: mp$1,
	mscr: mscr$1,
	Mscr: Mscr$1,
	mstpos: mstpos$1,
	Mu: Mu$1,
	mu: mu$1,
	multimap: multimap$1,
	mumap: mumap$1,
	nabla: nabla$1,
	Nacute: Nacute$1,
	nacute: nacute$1,
	nang: nang$1,
	nap: nap$1,
	napE: napE$1,
	napid: napid$1,
	napos: napos$1,
	napprox: napprox$1,
	natural: natural$1,
	naturals: naturals$1,
	natur: natur$1,
	nbsp: nbsp$1$1,
	nbump: nbump$1,
	nbumpe: nbumpe$1,
	ncap: ncap$1,
	Ncaron: Ncaron$1,
	ncaron: ncaron$1,
	Ncedil: Ncedil$1,
	ncedil: ncedil$1,
	ncong: ncong$1,
	ncongdot: ncongdot$1,
	ncup: ncup$1,
	Ncy: Ncy$1,
	ncy: ncy$1,
	ndash: ndash$1,
	nearhk: nearhk$1,
	nearr: nearr$1,
	neArr: neArr$1,
	nearrow: nearrow$1,
	ne: ne$1,
	nedot: nedot$1,
	NegativeMediumSpace: NegativeMediumSpace$1,
	NegativeThickSpace: NegativeThickSpace$1,
	NegativeThinSpace: NegativeThinSpace$1,
	NegativeVeryThinSpace: NegativeVeryThinSpace$1,
	nequiv: nequiv$1,
	nesear: nesear$1,
	nesim: nesim$1,
	NestedGreaterGreater: NestedGreaterGreater$1,
	NestedLessLess: NestedLessLess$1,
	NewLine: NewLine$1,
	nexist: nexist$1,
	nexists: nexists$1,
	Nfr: Nfr$1,
	nfr: nfr$1,
	ngE: ngE$1,
	nge: nge$1,
	ngeq: ngeq$1,
	ngeqq: ngeqq$1,
	ngeqslant: ngeqslant$1,
	nges: nges$1,
	nGg: nGg$1,
	ngsim: ngsim$1,
	nGt: nGt$1,
	ngt: ngt$1,
	ngtr: ngtr$1,
	nGtv: nGtv$1,
	nharr: nharr$1,
	nhArr: nhArr$1,
	nhpar: nhpar$1,
	ni: ni$1,
	nis: nis$1,
	nisd: nisd$1,
	niv: niv$1,
	NJcy: NJcy$1,
	njcy: njcy$1,
	nlarr: nlarr$1,
	nlArr: nlArr$1,
	nldr: nldr$1,
	nlE: nlE$1,
	nle: nle$1,
	nleftarrow: nleftarrow$1,
	nLeftarrow: nLeftarrow$1,
	nleftrightarrow: nleftrightarrow$1,
	nLeftrightarrow: nLeftrightarrow$1,
	nleq: nleq$1,
	nleqq: nleqq$1,
	nleqslant: nleqslant$1,
	nles: nles$1,
	nless: nless$1,
	nLl: nLl$1,
	nlsim: nlsim$1,
	nLt: nLt$1,
	nlt: nlt$1,
	nltri: nltri$1,
	nltrie: nltrie$1,
	nLtv: nLtv$1,
	nmid: nmid$1,
	NoBreak: NoBreak$1,
	NonBreakingSpace: NonBreakingSpace$1,
	nopf: nopf$1,
	Nopf: Nopf$1,
	Not: Not$1,
	not: not$1$1,
	NotCongruent: NotCongruent$1,
	NotCupCap: NotCupCap$1,
	NotDoubleVerticalBar: NotDoubleVerticalBar$1,
	NotElement: NotElement$1,
	NotEqual: NotEqual$1,
	NotEqualTilde: NotEqualTilde$1,
	NotExists: NotExists$1,
	NotGreater: NotGreater$1,
	NotGreaterEqual: NotGreaterEqual$1,
	NotGreaterFullEqual: NotGreaterFullEqual$1,
	NotGreaterGreater: NotGreaterGreater$1,
	NotGreaterLess: NotGreaterLess$1,
	NotGreaterSlantEqual: NotGreaterSlantEqual$1,
	NotGreaterTilde: NotGreaterTilde$1,
	NotHumpDownHump: NotHumpDownHump$1,
	NotHumpEqual: NotHumpEqual$1,
	notin: notin$1,
	notindot: notindot$1,
	notinE: notinE$1,
	notinva: notinva$1,
	notinvb: notinvb$1,
	notinvc: notinvc$1,
	NotLeftTriangleBar: NotLeftTriangleBar$1,
	NotLeftTriangle: NotLeftTriangle$1,
	NotLeftTriangleEqual: NotLeftTriangleEqual$1,
	NotLess: NotLess$1,
	NotLessEqual: NotLessEqual$1,
	NotLessGreater: NotLessGreater$1,
	NotLessLess: NotLessLess$1,
	NotLessSlantEqual: NotLessSlantEqual$1,
	NotLessTilde: NotLessTilde$1,
	NotNestedGreaterGreater: NotNestedGreaterGreater$1,
	NotNestedLessLess: NotNestedLessLess$1,
	notni: notni$1,
	notniva: notniva$1,
	notnivb: notnivb$1,
	notnivc: notnivc$1,
	NotPrecedes: NotPrecedes$1,
	NotPrecedesEqual: NotPrecedesEqual$1,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual$1,
	NotReverseElement: NotReverseElement$1,
	NotRightTriangleBar: NotRightTriangleBar$1,
	NotRightTriangle: NotRightTriangle$1,
	NotRightTriangleEqual: NotRightTriangleEqual$1,
	NotSquareSubset: NotSquareSubset$1,
	NotSquareSubsetEqual: NotSquareSubsetEqual$1,
	NotSquareSuperset: NotSquareSuperset$1,
	NotSquareSupersetEqual: NotSquareSupersetEqual$1,
	NotSubset: NotSubset$1,
	NotSubsetEqual: NotSubsetEqual$1,
	NotSucceeds: NotSucceeds$1,
	NotSucceedsEqual: NotSucceedsEqual$1,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual$1,
	NotSucceedsTilde: NotSucceedsTilde$1,
	NotSuperset: NotSuperset$1,
	NotSupersetEqual: NotSupersetEqual$1,
	NotTilde: NotTilde$1,
	NotTildeEqual: NotTildeEqual$1,
	NotTildeFullEqual: NotTildeFullEqual$1,
	NotTildeTilde: NotTildeTilde$1,
	NotVerticalBar: NotVerticalBar$1,
	nparallel: nparallel$1,
	npar: npar$1,
	nparsl: nparsl$1,
	npart: npart$1,
	npolint: npolint$1,
	npr: npr$1,
	nprcue: nprcue$1,
	nprec: nprec$1,
	npreceq: npreceq$1,
	npre: npre$1,
	nrarrc: nrarrc$1,
	nrarr: nrarr$1,
	nrArr: nrArr$1,
	nrarrw: nrarrw$1,
	nrightarrow: nrightarrow$1,
	nRightarrow: nRightarrow$1,
	nrtri: nrtri$1,
	nrtrie: nrtrie$1,
	nsc: nsc$1,
	nsccue: nsccue$1,
	nsce: nsce$1,
	Nscr: Nscr$1,
	nscr: nscr$1,
	nshortmid: nshortmid$1,
	nshortparallel: nshortparallel$1,
	nsim: nsim$1,
	nsime: nsime$1,
	nsimeq: nsimeq$1,
	nsmid: nsmid$1,
	nspar: nspar$1,
	nsqsube: nsqsube$1,
	nsqsupe: nsqsupe$1,
	nsub: nsub$1,
	nsubE: nsubE$1,
	nsube: nsube$1,
	nsubset: nsubset$1,
	nsubseteq: nsubseteq$1,
	nsubseteqq: nsubseteqq$1,
	nsucc: nsucc$1,
	nsucceq: nsucceq$1,
	nsup: nsup$1,
	nsupE: nsupE$1,
	nsupe: nsupe$1,
	nsupset: nsupset$1,
	nsupseteq: nsupseteq$1,
	nsupseteqq: nsupseteqq$1,
	ntgl: ntgl$1,
	Ntilde: Ntilde$1$1,
	ntilde: ntilde$1$1,
	ntlg: ntlg$1,
	ntriangleleft: ntriangleleft$1,
	ntrianglelefteq: ntrianglelefteq$1,
	ntriangleright: ntriangleright$1,
	ntrianglerighteq: ntrianglerighteq$1,
	Nu: Nu$1,
	nu: nu$1,
	num: num$1,
	numero: numero$1,
	numsp: numsp$1,
	nvap: nvap$1,
	nvdash: nvdash$1,
	nvDash: nvDash$1,
	nVdash: nVdash$1,
	nVDash: nVDash$1,
	nvge: nvge$1,
	nvgt: nvgt$1,
	nvHarr: nvHarr$1,
	nvinfin: nvinfin$1,
	nvlArr: nvlArr$1,
	nvle: nvle$1,
	nvlt: nvlt$1,
	nvltrie: nvltrie$1,
	nvrArr: nvrArr$1,
	nvrtrie: nvrtrie$1,
	nvsim: nvsim$1,
	nwarhk: nwarhk$1,
	nwarr: nwarr$1,
	nwArr: nwArr$1,
	nwarrow: nwarrow$1,
	nwnear: nwnear$1,
	Oacute: Oacute$1$1,
	oacute: oacute$1$1,
	oast: oast$1,
	Ocirc: Ocirc$1$1,
	ocirc: ocirc$1$1,
	ocir: ocir$1,
	Ocy: Ocy$1,
	ocy: ocy$1,
	odash: odash$1,
	Odblac: Odblac$1,
	odblac: odblac$1,
	odiv: odiv$1,
	odot: odot$1,
	odsold: odsold$1,
	OElig: OElig$1,
	oelig: oelig$1,
	ofcir: ofcir$1,
	Ofr: Ofr$1,
	ofr: ofr$1,
	ogon: ogon$1,
	Ograve: Ograve$1$1,
	ograve: ograve$1$1,
	ogt: ogt$1,
	ohbar: ohbar$1,
	ohm: ohm$1,
	oint: oint$1,
	olarr: olarr$1,
	olcir: olcir$1,
	olcross: olcross$1,
	oline: oline$1,
	olt: olt$1,
	Omacr: Omacr$1,
	omacr: omacr$1,
	Omega: Omega$1,
	omega: omega$1,
	Omicron: Omicron$1,
	omicron: omicron$1,
	omid: omid$1,
	ominus: ominus$1,
	Oopf: Oopf$1,
	oopf: oopf$1,
	opar: opar$1,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote$1,
	OpenCurlyQuote: OpenCurlyQuote$1,
	operp: operp$1,
	oplus: oplus$1,
	orarr: orarr$1,
	Or: Or$1,
	or: or$1,
	ord: ord$1,
	order: order$1,
	orderof: orderof$1,
	ordf: ordf$1$1,
	ordm: ordm$1$1,
	origof: origof$1,
	oror: oror$1,
	orslope: orslope$1,
	orv: orv$1,
	oS: oS$1,
	Oscr: Oscr$1,
	oscr: oscr$1,
	Oslash: Oslash$1$1,
	oslash: oslash$1$1,
	osol: osol$1,
	Otilde: Otilde$1$1,
	otilde: otilde$1$1,
	otimesas: otimesas$1,
	Otimes: Otimes$1,
	otimes: otimes$1,
	Ouml: Ouml$1$1,
	ouml: ouml$1$1,
	ovbar: ovbar$1,
	OverBar: OverBar$1,
	OverBrace: OverBrace$1,
	OverBracket: OverBracket$1,
	OverParenthesis: OverParenthesis$1,
	para: para$1$1,
	parallel: parallel$1,
	par: par$1,
	parsim: parsim$1,
	parsl: parsl$1,
	part: part$1,
	PartialD: PartialD$1,
	Pcy: Pcy$1,
	pcy: pcy$1,
	percnt: percnt$1,
	period: period$1,
	permil: permil$1,
	perp: perp$1,
	pertenk: pertenk$1,
	Pfr: Pfr$1,
	pfr: pfr$1,
	Phi: Phi$1,
	phi: phi$1,
	phiv: phiv$1,
	phmmat: phmmat$1,
	phone: phone$1,
	Pi: Pi$1,
	pi: pi$1,
	pitchfork: pitchfork$1,
	piv: piv$1,
	planck: planck$1,
	planckh: planckh$1,
	plankv: plankv$1,
	plusacir: plusacir$1,
	plusb: plusb$1,
	pluscir: pluscir$1,
	plus: plus$1,
	plusdo: plusdo$1,
	plusdu: plusdu$1,
	pluse: pluse$1,
	PlusMinus: PlusMinus$1,
	plusmn: plusmn$1$1,
	plussim: plussim$1,
	plustwo: plustwo$1,
	pm: pm$1,
	Poincareplane: Poincareplane$1,
	pointint: pointint$1,
	popf: popf$1,
	Popf: Popf$1,
	pound: pound$1$1,
	prap: prap$1,
	Pr: Pr$1,
	pr: pr$1,
	prcue: prcue$1,
	precapprox: precapprox$1,
	prec: prec$1,
	preccurlyeq: preccurlyeq$1,
	Precedes: Precedes$1,
	PrecedesEqual: PrecedesEqual$1,
	PrecedesSlantEqual: PrecedesSlantEqual$1,
	PrecedesTilde: PrecedesTilde$1,
	preceq: preceq$1,
	precnapprox: precnapprox$1,
	precneqq: precneqq$1,
	precnsim: precnsim$1,
	pre: pre$1,
	prE: prE$1,
	precsim: precsim$1,
	prime: prime$1,
	Prime: Prime$1,
	primes: primes$1,
	prnap: prnap$1,
	prnE: prnE$1,
	prnsim: prnsim$1,
	prod: prod$1,
	Product: Product$1,
	profalar: profalar$1,
	profline: profline$1,
	profsurf: profsurf$1,
	prop: prop$1,
	Proportional: Proportional$1,
	Proportion: Proportion$1,
	propto: propto$1,
	prsim: prsim$1,
	prurel: prurel$1,
	Pscr: Pscr$1,
	pscr: pscr$1,
	Psi: Psi$1,
	psi: psi$1,
	puncsp: puncsp$1,
	Qfr: Qfr$1,
	qfr: qfr$1,
	qint: qint$1,
	qopf: qopf$1,
	Qopf: Qopf$1,
	qprime: qprime$1,
	Qscr: Qscr$1,
	qscr: qscr$1,
	quaternions: quaternions$1,
	quatint: quatint$1,
	quest: quest$1,
	questeq: questeq$1,
	quot: quot$1$2,
	QUOT: QUOT$1$1,
	rAarr: rAarr$1,
	race: race$1,
	Racute: Racute$1,
	racute: racute$1,
	radic: radic$1,
	raemptyv: raemptyv$1,
	rang: rang$1,
	Rang: Rang$1,
	rangd: rangd$1,
	range: range$1,
	rangle: rangle$1,
	raquo: raquo$1$1,
	rarrap: rarrap$1,
	rarrb: rarrb$1,
	rarrbfs: rarrbfs$1,
	rarrc: rarrc$1,
	rarr: rarr$1,
	Rarr: Rarr$1,
	rArr: rArr$1,
	rarrfs: rarrfs$1,
	rarrhk: rarrhk$1,
	rarrlp: rarrlp$1,
	rarrpl: rarrpl$1,
	rarrsim: rarrsim$1,
	Rarrtl: Rarrtl$1,
	rarrtl: rarrtl$1,
	rarrw: rarrw$1,
	ratail: ratail$1,
	rAtail: rAtail$1,
	ratio: ratio$1,
	rationals: rationals$1,
	rbarr: rbarr$1,
	rBarr: rBarr$1,
	RBarr: RBarr$1,
	rbbrk: rbbrk$1,
	rbrace: rbrace$1,
	rbrack: rbrack$1,
	rbrke: rbrke$1,
	rbrksld: rbrksld$1,
	rbrkslu: rbrkslu$1,
	Rcaron: Rcaron$1,
	rcaron: rcaron$1,
	Rcedil: Rcedil$1,
	rcedil: rcedil$1,
	rceil: rceil$1,
	rcub: rcub$1,
	Rcy: Rcy$1,
	rcy: rcy$1,
	rdca: rdca$1,
	rdldhar: rdldhar$1,
	rdquo: rdquo$1,
	rdquor: rdquor$1,
	rdsh: rdsh$1,
	real: real$1,
	realine: realine$1,
	realpart: realpart$1,
	reals: reals$1,
	Re: Re$1,
	rect: rect$1,
	reg: reg$1$1,
	REG: REG$1$1,
	ReverseElement: ReverseElement$1,
	ReverseEquilibrium: ReverseEquilibrium$1,
	ReverseUpEquilibrium: ReverseUpEquilibrium$1,
	rfisht: rfisht$1,
	rfloor: rfloor$1,
	rfr: rfr$1,
	Rfr: Rfr$1,
	rHar: rHar$1,
	rhard: rhard$1,
	rharu: rharu$1,
	rharul: rharul$1,
	Rho: Rho$1,
	rho: rho$1,
	rhov: rhov$1,
	RightAngleBracket: RightAngleBracket$1,
	RightArrowBar: RightArrowBar$1,
	rightarrow: rightarrow$1,
	RightArrow: RightArrow$1,
	Rightarrow: Rightarrow$1,
	RightArrowLeftArrow: RightArrowLeftArrow$1,
	rightarrowtail: rightarrowtail$1,
	RightCeiling: RightCeiling$1,
	RightDoubleBracket: RightDoubleBracket$1,
	RightDownTeeVector: RightDownTeeVector$1,
	RightDownVectorBar: RightDownVectorBar$1,
	RightDownVector: RightDownVector$1,
	RightFloor: RightFloor$1,
	rightharpoondown: rightharpoondown$1,
	rightharpoonup: rightharpoonup$1,
	rightleftarrows: rightleftarrows$1,
	rightleftharpoons: rightleftharpoons$1,
	rightrightarrows: rightrightarrows$1,
	rightsquigarrow: rightsquigarrow$1,
	RightTeeArrow: RightTeeArrow$1,
	RightTee: RightTee$1,
	RightTeeVector: RightTeeVector$1,
	rightthreetimes: rightthreetimes$1,
	RightTriangleBar: RightTriangleBar$1,
	RightTriangle: RightTriangle$1,
	RightTriangleEqual: RightTriangleEqual$1,
	RightUpDownVector: RightUpDownVector$1,
	RightUpTeeVector: RightUpTeeVector$1,
	RightUpVectorBar: RightUpVectorBar$1,
	RightUpVector: RightUpVector$1,
	RightVectorBar: RightVectorBar$1,
	RightVector: RightVector$1,
	ring: ring$1,
	risingdotseq: risingdotseq$1,
	rlarr: rlarr$1,
	rlhar: rlhar$1,
	rlm: rlm$1,
	rmoustache: rmoustache$1,
	rmoust: rmoust$1,
	rnmid: rnmid$1,
	roang: roang$1,
	roarr: roarr$1,
	robrk: robrk$1,
	ropar: ropar$1,
	ropf: ropf$1,
	Ropf: Ropf$1,
	roplus: roplus$1,
	rotimes: rotimes$1,
	RoundImplies: RoundImplies$1,
	rpar: rpar$1,
	rpargt: rpargt$1,
	rppolint: rppolint$1,
	rrarr: rrarr$1,
	Rrightarrow: Rrightarrow$1,
	rsaquo: rsaquo$1,
	rscr: rscr$1,
	Rscr: Rscr$1,
	rsh: rsh$1,
	Rsh: Rsh$1,
	rsqb: rsqb$1,
	rsquo: rsquo$1,
	rsquor: rsquor$1,
	rthree: rthree$1,
	rtimes: rtimes$1,
	rtri: rtri$1,
	rtrie: rtrie$1,
	rtrif: rtrif$1,
	rtriltri: rtriltri$1,
	RuleDelayed: RuleDelayed$1,
	ruluhar: ruluhar$1,
	rx: rx$1,
	Sacute: Sacute$1,
	sacute: sacute$1,
	sbquo: sbquo$1,
	scap: scap$1,
	Scaron: Scaron$1,
	scaron: scaron$1,
	Sc: Sc$1,
	sc: sc$1,
	sccue: sccue$1,
	sce: sce$1,
	scE: scE$1,
	Scedil: Scedil$1,
	scedil: scedil$1,
	Scirc: Scirc$1,
	scirc: scirc$1,
	scnap: scnap$1,
	scnE: scnE$1,
	scnsim: scnsim$1,
	scpolint: scpolint$1,
	scsim: scsim$1,
	Scy: Scy$1,
	scy: scy$1,
	sdotb: sdotb$1,
	sdot: sdot$1,
	sdote: sdote$1,
	searhk: searhk$1,
	searr: searr$1,
	seArr: seArr$1,
	searrow: searrow$1,
	sect: sect$1$1,
	semi: semi$1,
	seswar: seswar$1,
	setminus: setminus$1,
	setmn: setmn$1,
	sext: sext$1,
	Sfr: Sfr$1,
	sfr: sfr$1,
	sfrown: sfrown$1,
	sharp: sharp$1,
	SHCHcy: SHCHcy$1,
	shchcy: shchcy$1,
	SHcy: SHcy$1,
	shcy: shcy$1,
	ShortDownArrow: ShortDownArrow$1,
	ShortLeftArrow: ShortLeftArrow$1,
	shortmid: shortmid$1,
	shortparallel: shortparallel$1,
	ShortRightArrow: ShortRightArrow$1,
	ShortUpArrow: ShortUpArrow$1,
	shy: shy$1$1,
	Sigma: Sigma$1,
	sigma: sigma$1,
	sigmaf: sigmaf$1,
	sigmav: sigmav$1,
	sim: sim$1,
	simdot: simdot$1,
	sime: sime$1,
	simeq: simeq$1,
	simg: simg$1,
	simgE: simgE$1,
	siml: siml$1,
	simlE: simlE$1,
	simne: simne$1,
	simplus: simplus$1,
	simrarr: simrarr$1,
	slarr: slarr$1,
	SmallCircle: SmallCircle$1,
	smallsetminus: smallsetminus$1,
	smashp: smashp$1,
	smeparsl: smeparsl$1,
	smid: smid$1,
	smile: smile$1,
	smt: smt$1,
	smte: smte$1,
	smtes: smtes$1,
	SOFTcy: SOFTcy$1,
	softcy: softcy$1,
	solbar: solbar$1,
	solb: solb$1,
	sol: sol$1,
	Sopf: Sopf$1,
	sopf: sopf$1,
	spades: spades$1,
	spadesuit: spadesuit$1,
	spar: spar$1,
	sqcap: sqcap$1,
	sqcaps: sqcaps$1,
	sqcup: sqcup$1,
	sqcups: sqcups$1,
	Sqrt: Sqrt$1,
	sqsub: sqsub$1,
	sqsube: sqsube$1,
	sqsubset: sqsubset$1,
	sqsubseteq: sqsubseteq$1,
	sqsup: sqsup$1,
	sqsupe: sqsupe$1,
	sqsupset: sqsupset$1,
	sqsupseteq: sqsupseteq$1,
	square: square$1,
	Square: Square$1,
	SquareIntersection: SquareIntersection$1,
	SquareSubset: SquareSubset$1,
	SquareSubsetEqual: SquareSubsetEqual$1,
	SquareSuperset: SquareSuperset$1,
	SquareSupersetEqual: SquareSupersetEqual$1,
	SquareUnion: SquareUnion$1,
	squarf: squarf$1,
	squ: squ$1,
	squf: squf$1,
	srarr: srarr$1,
	Sscr: Sscr$1,
	sscr: sscr$1,
	ssetmn: ssetmn$1,
	ssmile: ssmile$1,
	sstarf: sstarf$1,
	Star: Star$1,
	star: star$1,
	starf: starf$1,
	straightepsilon: straightepsilon$1,
	straightphi: straightphi$1,
	strns: strns$1,
	sub: sub$1,
	Sub: Sub$1,
	subdot: subdot$1,
	subE: subE$1,
	sube: sube$1,
	subedot: subedot$1,
	submult: submult$1,
	subnE: subnE$1,
	subne: subne$1,
	subplus: subplus$1,
	subrarr: subrarr$1,
	subset: subset$1,
	Subset: Subset$1,
	subseteq: subseteq$1,
	subseteqq: subseteqq$1,
	SubsetEqual: SubsetEqual$1,
	subsetneq: subsetneq$1,
	subsetneqq: subsetneqq$1,
	subsim: subsim$1,
	subsub: subsub$1,
	subsup: subsup$1,
	succapprox: succapprox$1,
	succ: succ$1,
	succcurlyeq: succcurlyeq$1,
	Succeeds: Succeeds$1,
	SucceedsEqual: SucceedsEqual$1,
	SucceedsSlantEqual: SucceedsSlantEqual$1,
	SucceedsTilde: SucceedsTilde$1,
	succeq: succeq$1,
	succnapprox: succnapprox$1,
	succneqq: succneqq$1,
	succnsim: succnsim$1,
	succsim: succsim$1,
	SuchThat: SuchThat$1,
	sum: sum$1,
	Sum: Sum$1,
	sung: sung$1,
	sup1: sup1$1$1,
	sup2: sup2$1$1,
	sup3: sup3$1$1,
	sup: sup$1,
	Sup: Sup$1,
	supdot: supdot$1,
	supdsub: supdsub$1,
	supE: supE$1,
	supe: supe$1,
	supedot: supedot$1,
	Superset: Superset$1,
	SupersetEqual: SupersetEqual$1,
	suphsol: suphsol$1,
	suphsub: suphsub$1,
	suplarr: suplarr$1,
	supmult: supmult$1,
	supnE: supnE$1,
	supne: supne$1,
	supplus: supplus$1,
	supset: supset$1,
	Supset: Supset$1,
	supseteq: supseteq$1,
	supseteqq: supseteqq$1,
	supsetneq: supsetneq$1,
	supsetneqq: supsetneqq$1,
	supsim: supsim$1,
	supsub: supsub$1,
	supsup: supsup$1,
	swarhk: swarhk$1,
	swarr: swarr$1,
	swArr: swArr$1,
	swarrow: swarrow$1,
	swnwar: swnwar$1,
	szlig: szlig$1$1,
	Tab: Tab$1,
	target: target$1,
	Tau: Tau$1,
	tau: tau$1,
	tbrk: tbrk$1,
	Tcaron: Tcaron$1,
	tcaron: tcaron$1,
	Tcedil: Tcedil$1,
	tcedil: tcedil$1,
	Tcy: Tcy$1,
	tcy: tcy$1,
	tdot: tdot$1,
	telrec: telrec$1,
	Tfr: Tfr$1,
	tfr: tfr$1,
	there4: there4$1,
	therefore: therefore$1,
	Therefore: Therefore$1,
	Theta: Theta$1,
	theta: theta$1,
	thetasym: thetasym$1,
	thetav: thetav$1,
	thickapprox: thickapprox$1,
	thicksim: thicksim$1,
	ThickSpace: ThickSpace$1,
	ThinSpace: ThinSpace$1,
	thinsp: thinsp$1,
	thkap: thkap$1,
	thksim: thksim$1,
	THORN: THORN$1$1,
	thorn: thorn$1$1,
	tilde: tilde$1,
	Tilde: Tilde$1,
	TildeEqual: TildeEqual$1,
	TildeFullEqual: TildeFullEqual$1,
	TildeTilde: TildeTilde$1,
	timesbar: timesbar$1,
	timesb: timesb$1,
	times: times$2,
	timesd: timesd$1,
	tint: tint$1,
	toea: toea$1,
	topbot: topbot$1,
	topcir: topcir$1,
	top: top$1,
	Topf: Topf$1,
	topf: topf$1,
	topfork: topfork$1,
	tosa: tosa$1,
	tprime: tprime$1,
	trade: trade$1,
	TRADE: TRADE$1,
	triangle: triangle$1,
	triangledown: triangledown$1,
	triangleleft: triangleleft$1,
	trianglelefteq: trianglelefteq$1,
	triangleq: triangleq$1,
	triangleright: triangleright$1,
	trianglerighteq: trianglerighteq$1,
	tridot: tridot$1,
	trie: trie$1,
	triminus: triminus$1,
	TripleDot: TripleDot$1,
	triplus: triplus$1,
	trisb: trisb$1,
	tritime: tritime$1,
	trpezium: trpezium$1,
	Tscr: Tscr$1,
	tscr: tscr$1,
	TScy: TScy$1,
	tscy: tscy$1,
	TSHcy: TSHcy$1,
	tshcy: tshcy$1,
	Tstrok: Tstrok$1,
	tstrok: tstrok$1,
	twixt: twixt$1,
	twoheadleftarrow: twoheadleftarrow$1,
	twoheadrightarrow: twoheadrightarrow$1,
	Uacute: Uacute$1$1,
	uacute: uacute$1$1,
	uarr: uarr$1,
	Uarr: Uarr$1,
	uArr: uArr$1,
	Uarrocir: Uarrocir$1,
	Ubrcy: Ubrcy$1,
	ubrcy: ubrcy$1,
	Ubreve: Ubreve$1,
	ubreve: ubreve$1,
	Ucirc: Ucirc$1$1,
	ucirc: ucirc$1$1,
	Ucy: Ucy$1,
	ucy: ucy$1,
	udarr: udarr$1,
	Udblac: Udblac$1,
	udblac: udblac$1,
	udhar: udhar$1,
	ufisht: ufisht$1,
	Ufr: Ufr$1,
	ufr: ufr$1,
	Ugrave: Ugrave$1$1,
	ugrave: ugrave$1$1,
	uHar: uHar$1,
	uharl: uharl$1,
	uharr: uharr$1,
	uhblk: uhblk$1,
	ulcorn: ulcorn$1,
	ulcorner: ulcorner$1,
	ulcrop: ulcrop$1,
	ultri: ultri$1,
	Umacr: Umacr$1,
	umacr: umacr$1,
	uml: uml$1$1,
	UnderBar: UnderBar$1,
	UnderBrace: UnderBrace$1,
	UnderBracket: UnderBracket$1,
	UnderParenthesis: UnderParenthesis$1,
	Union: Union$1,
	UnionPlus: UnionPlus$1,
	Uogon: Uogon$1,
	uogon: uogon$1,
	Uopf: Uopf$1,
	uopf: uopf$1,
	UpArrowBar: UpArrowBar$1,
	uparrow: uparrow$1,
	UpArrow: UpArrow$1,
	Uparrow: Uparrow$1,
	UpArrowDownArrow: UpArrowDownArrow$1,
	updownarrow: updownarrow$1,
	UpDownArrow: UpDownArrow$1,
	Updownarrow: Updownarrow$1,
	UpEquilibrium: UpEquilibrium$1,
	upharpoonleft: upharpoonleft$1,
	upharpoonright: upharpoonright$1,
	uplus: uplus$1,
	UpperLeftArrow: UpperLeftArrow$1,
	UpperRightArrow: UpperRightArrow$1,
	upsi: upsi$1,
	Upsi: Upsi$1,
	upsih: upsih$1,
	Upsilon: Upsilon$1,
	upsilon: upsilon$1,
	UpTeeArrow: UpTeeArrow$1,
	UpTee: UpTee$1,
	upuparrows: upuparrows$1,
	urcorn: urcorn$1,
	urcorner: urcorner$1,
	urcrop: urcrop$1,
	Uring: Uring$1,
	uring: uring$1,
	urtri: urtri$1,
	Uscr: Uscr$1,
	uscr: uscr$1,
	utdot: utdot$1,
	Utilde: Utilde$1,
	utilde: utilde$1,
	utri: utri$1,
	utrif: utrif$1,
	uuarr: uuarr$1,
	Uuml: Uuml$1$1,
	uuml: uuml$1$1,
	uwangle: uwangle$1,
	vangrt: vangrt$1,
	varepsilon: varepsilon$1,
	varkappa: varkappa$1,
	varnothing: varnothing$1,
	varphi: varphi$1,
	varpi: varpi$1,
	varpropto: varpropto$1,
	varr: varr$1,
	vArr: vArr$1,
	varrho: varrho$1,
	varsigma: varsigma$1,
	varsubsetneq: varsubsetneq$1,
	varsubsetneqq: varsubsetneqq$1,
	varsupsetneq: varsupsetneq$1,
	varsupsetneqq: varsupsetneqq$1,
	vartheta: vartheta$1,
	vartriangleleft: vartriangleleft$1,
	vartriangleright: vartriangleright$1,
	vBar: vBar$1,
	Vbar: Vbar$1,
	vBarv: vBarv$1,
	Vcy: Vcy$1,
	vcy: vcy$1,
	vdash: vdash$1,
	vDash: vDash$1,
	Vdash: Vdash$1,
	VDash: VDash$1,
	Vdashl: Vdashl$1,
	veebar: veebar$1,
	vee: vee$1,
	Vee: Vee$1,
	veeeq: veeeq$1,
	vellip: vellip$1,
	verbar: verbar$1,
	Verbar: Verbar$1,
	vert: vert$1,
	Vert: Vert$1,
	VerticalBar: VerticalBar$1,
	VerticalLine: VerticalLine$1,
	VerticalSeparator: VerticalSeparator$1,
	VerticalTilde: VerticalTilde$1,
	VeryThinSpace: VeryThinSpace$1,
	Vfr: Vfr$1,
	vfr: vfr$1,
	vltri: vltri$1,
	vnsub: vnsub$1,
	vnsup: vnsup$1,
	Vopf: Vopf$1,
	vopf: vopf$1,
	vprop: vprop$1,
	vrtri: vrtri$1,
	Vscr: Vscr$1,
	vscr: vscr$1,
	vsubnE: vsubnE$1,
	vsubne: vsubne$1,
	vsupnE: vsupnE$1,
	vsupne: vsupne$1,
	Vvdash: Vvdash$1,
	vzigzag: vzigzag$1,
	Wcirc: Wcirc$1,
	wcirc: wcirc$1,
	wedbar: wedbar$1,
	wedge: wedge$1,
	Wedge: Wedge$1,
	wedgeq: wedgeq$1,
	weierp: weierp$1,
	Wfr: Wfr$1,
	wfr: wfr$1,
	Wopf: Wopf$1,
	wopf: wopf$1,
	wp: wp$1,
	wr: wr$1,
	wreath: wreath$1,
	Wscr: Wscr$1,
	wscr: wscr$1,
	xcap: xcap$1,
	xcirc: xcirc$1,
	xcup: xcup$1,
	xdtri: xdtri$1,
	Xfr: Xfr$1,
	xfr: xfr$1,
	xharr: xharr$1,
	xhArr: xhArr$1,
	Xi: Xi$1,
	xi: xi$1,
	xlarr: xlarr$1,
	xlArr: xlArr$1,
	xmap: xmap$1,
	xnis: xnis$1,
	xodot: xodot$1,
	Xopf: Xopf$1,
	xopf: xopf$1,
	xoplus: xoplus$1,
	xotime: xotime$1,
	xrarr: xrarr$1,
	xrArr: xrArr$1,
	Xscr: Xscr$1,
	xscr: xscr$1,
	xsqcup: xsqcup$1,
	xuplus: xuplus$1,
	xutri: xutri$1,
	xvee: xvee$1,
	xwedge: xwedge$1,
	Yacute: Yacute$1$1,
	yacute: yacute$1$1,
	YAcy: YAcy$1,
	yacy: yacy$1,
	Ycirc: Ycirc$1,
	ycirc: ycirc$1,
	Ycy: Ycy$1,
	ycy: ycy$1,
	yen: yen$1$1,
	Yfr: Yfr$1,
	yfr: yfr$1,
	YIcy: YIcy$1,
	yicy: yicy$1,
	Yopf: Yopf$1,
	yopf: yopf$1,
	Yscr: Yscr$1,
	yscr: yscr$1,
	YUcy: YUcy$1,
	yucy: yucy$1,
	yuml: yuml$1$1,
	Yuml: Yuml$1,
	Zacute: Zacute$1,
	zacute: zacute$1,
	Zcaron: Zcaron$1,
	zcaron: zcaron$1,
	Zcy: Zcy$1,
	zcy: zcy$1,
	Zdot: Zdot$1,
	zdot: zdot$1,
	zeetrf: zeetrf$1,
	ZeroWidthSpace: ZeroWidthSpace$1,
	Zeta: Zeta$1,
	zeta: zeta$1,
	zfr: zfr$1,
	Zfr: Zfr$1,
	ZHcy: ZHcy$1,
	zhcy: zhcy$1,
	zigrarr: zigrarr$1,
	zopf: zopf$1,
	Zopf: Zopf$1,
	Zscr: Zscr$1,
	zscr: zscr$1,
	zwj: zwj$1,
	zwnj: zwnj$1,
	default: entitiesJSON$1
});

var require$$0$1 = ( xml$1 && xmlJSON$1 ) || xml$1;

var require$$1$1 = ( entities$2 && entitiesJSON$1 ) || entities$2;

var inverseXML$1 = getInverseObj$1(require$$0$1);
var xmlReplacer$1 = getInverseReplacer$1(inverseXML$1);

var XML$1 = getInverse$1(inverseXML$1, xmlReplacer$1);

var inverseHTML$1 = getInverseObj$1(require$$1$1);
var htmlReplacer$1 = getInverseReplacer$1(inverseHTML$1);

var HTML$1 = getInverse$1(inverseHTML$1, htmlReplacer$1);

function getInverseObj$1(obj){
	return Object.keys(obj).sort().reduce(function(inverse, name){
		inverse[obj[name]] = "&" + name + ";";
		return inverse;
	}, {});
}

function getInverseReplacer$1(inverse){
	var single = [],
	    multiple = [];

	Object.keys(inverse).forEach(function(k){
		if(k.length === 1){
			single.push("\\" + k);
		} else {
			multiple.push(k);
		}
	});

	
	multiple.unshift("[" + single.join("") + "]");

	return new RegExp(multiple.join("|"), "g");
}

var re_nonASCII$1 = /[^\0-\x7F]/g;
var re_astralSymbols$1 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function singleCharReplacer$1(c){
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer$1(c){
	
	var high = c.charCodeAt(0);
	var low  = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse$1(inverse, re){
	function func(name){
		return inverse[name];
	}

	return function(data){
		return data
				.replace(re, func)
				.replace(re_astralSymbols$1, astralReplacer$1)
				.replace(re_nonASCII$1, singleCharReplacer$1);
	};
}

var re_xmlChars$1 = getInverseReplacer$1(inverseXML$1);

function escapeXML$1(data){
	return data
			.replace(re_xmlChars$1, singleCharReplacer$1)
			.replace(re_astralSymbols$1, astralReplacer$1)
			.replace(re_nonASCII$1, singleCharReplacer$1);
}

var escape$1 = escapeXML$1;

var encode$1 = {
	XML: XML$1,
	HTML: HTML$1,
	escape: escape$1
};

var decode$1$1 = {
	"0": 65533,
	"128": 8364,
	"130": 8218,
	"131": 402,
	"132": 8222,
	"133": 8230,
	"134": 8224,
	"135": 8225,
	"136": 710,
	"137": 8240,
	"138": 352,
	"139": 8249,
	"140": 338,
	"142": 381,
	"145": 8216,
	"146": 8217,
	"147": 8220,
	"148": 8221,
	"149": 8226,
	"150": 8211,
	"151": 8212,
	"152": 732,
	"153": 8482,
	"154": 353,
	"155": 8250,
	"156": 339,
	"158": 382,
	"159": 376
};

var decode$1$2 = Object.freeze({
	default: decode$1$1
});

var decodeMap$1 = ( decode$1$2 && decode$1$1 ) || decode$1$2;

var decode_codepoint$1 = decodeCodePoint$1;


function decodeCodePoint$1(codePoint){

	if((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF){
		return "\uFFFD";
	}

	if(codePoint in decodeMap$1){
		codePoint = decodeMap$1[codePoint];
	}

	var output = "";

	if(codePoint > 0xFFFF){
		codePoint -= 0x10000;
		output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
		codePoint = 0xDC00 | codePoint & 0x3FF;
	}

	output += String.fromCharCode(codePoint);
	return output;
}

var Aacute$1$2 = "Á";
var aacute$1$2 = "á";
var Acirc$1$2 = "Â";
var acirc$1$2 = "â";
var acute$1$2 = "´";
var AElig$1$2 = "Æ";
var aelig$1$2 = "æ";
var Agrave$1$2 = "À";
var agrave$1$2 = "à";
var amp$2$1 = "&";
var AMP$1$2 = "&";
var Aring$1$2 = "Å";
var aring$1$2 = "å";
var Atilde$1$2 = "Ã";
var atilde$1$2 = "ã";
var Auml$1$2 = "Ä";
var auml$1$2 = "ä";
var brvbar$1$2 = "¦";
var Ccedil$1$2 = "Ç";
var ccedil$1$2 = "ç";
var cedil$1$2 = "¸";
var cent$1$2 = "¢";
var copy$1$2 = "©";
var COPY$1$2 = "©";
var curren$1$2 = "¤";
var deg$1$2 = "°";
var divide$1$2 = "÷";
var Eacute$1$2 = "É";
var eacute$1$2 = "é";
var Ecirc$1$2 = "Ê";
var ecirc$1$2 = "ê";
var Egrave$1$2 = "È";
var egrave$1$2 = "è";
var ETH$1$2 = "Ð";
var eth$1$2 = "ð";
var Euml$1$2 = "Ë";
var euml$1$2 = "ë";
var frac12$1$2 = "½";
var frac14$1$2 = "¼";
var frac34$1$2 = "¾";
var gt$2$1 = ">";
var GT$1$2 = ">";
var Iacute$1$2 = "Í";
var iacute$1$2 = "í";
var Icirc$1$2 = "Î";
var icirc$1$2 = "î";
var iexcl$1$2 = "¡";
var Igrave$1$2 = "Ì";
var igrave$1$2 = "ì";
var iquest$1$2 = "¿";
var Iuml$1$2 = "Ï";
var iuml$1$2 = "ï";
var laquo$1$2 = "«";
var lt$2$1 = "<";
var LT$1$2 = "<";
var macr$1$2 = "¯";
var micro$1$2 = "µ";
var middot$1$2 = "·";
var nbsp$1$2 = " ";
var not$1$2 = "¬";
var Ntilde$1$2 = "Ñ";
var ntilde$1$2 = "ñ";
var Oacute$1$2 = "Ó";
var oacute$1$2 = "ó";
var Ocirc$1$2 = "Ô";
var ocirc$1$2 = "ô";
var Ograve$1$2 = "Ò";
var ograve$1$2 = "ò";
var ordf$1$2 = "ª";
var ordm$1$2 = "º";
var Oslash$1$2 = "Ø";
var oslash$1$2 = "ø";
var Otilde$1$2 = "Õ";
var otilde$1$2 = "õ";
var Ouml$1$2 = "Ö";
var ouml$1$2 = "ö";
var para$1$2 = "¶";
var plusmn$1$2 = "±";
var pound$1$2 = "£";
var quot$2$1 = "\"";
var QUOT$1$2 = "\"";
var raquo$1$2 = "»";
var reg$1$2 = "®";
var REG$1$2 = "®";
var sect$1$2 = "§";
var shy$1$2 = "­";
var sup1$1$2 = "¹";
var sup2$1$2 = "²";
var sup3$1$2 = "³";
var szlig$1$2 = "ß";
var THORN$1$2 = "Þ";
var thorn$1$2 = "þ";
var times$1$2 = "×";
var Uacute$1$2 = "Ú";
var uacute$1$2 = "ú";
var Ucirc$1$2 = "Û";
var ucirc$1$2 = "û";
var Ugrave$1$2 = "Ù";
var ugrave$1$2 = "ù";
var uml$1$2 = "¨";
var Uuml$1$2 = "Ü";
var uuml$1$2 = "ü";
var Yacute$1$2 = "Ý";
var yacute$1$2 = "ý";
var yen$1$2 = "¥";
var yuml$1$2 = "ÿ";
var legacyJSON$1 = {
	Aacute: Aacute$1$2,
	aacute: aacute$1$2,
	Acirc: Acirc$1$2,
	acirc: acirc$1$2,
	acute: acute$1$2,
	AElig: AElig$1$2,
	aelig: aelig$1$2,
	Agrave: Agrave$1$2,
	agrave: agrave$1$2,
	amp: amp$2$1,
	AMP: AMP$1$2,
	Aring: Aring$1$2,
	aring: aring$1$2,
	Atilde: Atilde$1$2,
	atilde: atilde$1$2,
	Auml: Auml$1$2,
	auml: auml$1$2,
	brvbar: brvbar$1$2,
	Ccedil: Ccedil$1$2,
	ccedil: ccedil$1$2,
	cedil: cedil$1$2,
	cent: cent$1$2,
	copy: copy$1$2,
	COPY: COPY$1$2,
	curren: curren$1$2,
	deg: deg$1$2,
	divide: divide$1$2,
	Eacute: Eacute$1$2,
	eacute: eacute$1$2,
	Ecirc: Ecirc$1$2,
	ecirc: ecirc$1$2,
	Egrave: Egrave$1$2,
	egrave: egrave$1$2,
	ETH: ETH$1$2,
	eth: eth$1$2,
	Euml: Euml$1$2,
	euml: euml$1$2,
	frac12: frac12$1$2,
	frac14: frac14$1$2,
	frac34: frac34$1$2,
	gt: gt$2$1,
	GT: GT$1$2,
	Iacute: Iacute$1$2,
	iacute: iacute$1$2,
	Icirc: Icirc$1$2,
	icirc: icirc$1$2,
	iexcl: iexcl$1$2,
	Igrave: Igrave$1$2,
	igrave: igrave$1$2,
	iquest: iquest$1$2,
	Iuml: Iuml$1$2,
	iuml: iuml$1$2,
	laquo: laquo$1$2,
	lt: lt$2$1,
	LT: LT$1$2,
	macr: macr$1$2,
	micro: micro$1$2,
	middot: middot$1$2,
	nbsp: nbsp$1$2,
	not: not$1$2,
	Ntilde: Ntilde$1$2,
	ntilde: ntilde$1$2,
	Oacute: Oacute$1$2,
	oacute: oacute$1$2,
	Ocirc: Ocirc$1$2,
	ocirc: ocirc$1$2,
	Ograve: Ograve$1$2,
	ograve: ograve$1$2,
	ordf: ordf$1$2,
	ordm: ordm$1$2,
	Oslash: Oslash$1$2,
	oslash: oslash$1$2,
	Otilde: Otilde$1$2,
	otilde: otilde$1$2,
	Ouml: Ouml$1$2,
	ouml: ouml$1$2,
	para: para$1$2,
	plusmn: plusmn$1$2,
	pound: pound$1$2,
	quot: quot$2$1,
	QUOT: QUOT$1$2,
	raquo: raquo$1$2,
	reg: reg$1$2,
	REG: REG$1$2,
	sect: sect$1$2,
	shy: shy$1$2,
	sup1: sup1$1$2,
	sup2: sup2$1$2,
	sup3: sup3$1$2,
	szlig: szlig$1$2,
	THORN: THORN$1$2,
	thorn: thorn$1$2,
	times: times$1$2,
	Uacute: Uacute$1$2,
	uacute: uacute$1$2,
	Ucirc: Ucirc$1$2,
	ucirc: ucirc$1$2,
	Ugrave: Ugrave$1$2,
	ugrave: ugrave$1$2,
	uml: uml$1$2,
	Uuml: Uuml$1$2,
	uuml: uuml$1$2,
	Yacute: Yacute$1$2,
	yacute: yacute$1$2,
	yen: yen$1$2,
	yuml: yuml$1$2
};

var _entities$1 = {
  encodeXML: encode$1.XML,
  decodeCodepoint: decode_codepoint$1,
  entitiesJSON: entitiesJSON$1,
  legacyJSON: legacyJSON$1,
  xmlJSON: xmlJSON$1
};

var _entities_decodeCodepoint = _entities$1.decodeCodepoint;

var _entities_decodeCodepoint$1 = Object.freeze({
	default: _entities_decodeCodepoint
});

var _entities_entitiesJSON = _entities$1.entitiesJSON;


var _entities_entitiesJSON$1 = Object.freeze({
	default: _entities_entitiesJSON
});

var _entities_legacyJSON = _entities$1.legacyJSON;

var _entities_legacyJSON$1 = Object.freeze({
	default: _entities_legacyJSON
});

var _entities_xmlJSON = _entities$1.xmlJSON;

var _entities_xmlJSON$1 = Object.freeze({
	default: _entities_xmlJSON
});

var decodeCodePoint$1$1 = ( _entities_decodeCodepoint$1 && _entities_decodeCodepoint ) || _entities_decodeCodepoint$1;

var entityMap = ( _entities_entitiesJSON$1 && _entities_entitiesJSON ) || _entities_entitiesJSON$1;

var legacyMap = ( _entities_legacyJSON$1 && _entities_legacyJSON ) || _entities_legacyJSON$1;

var xmlMap = ( _entities_xmlJSON$1 && _entities_xmlJSON ) || _entities_xmlJSON$1;

var Tokenizer_1 = Tokenizer$1;

var i = 0;
var TEXT                      = i++;
var BEFORE_TAG_NAME           = i++;
var IN_TAG_NAME               = i++;
var IN_SELF_CLOSING_TAG       = i++;
var BEFORE_CLOSING_TAG_NAME   = i++;
var IN_CLOSING_TAG_NAME       = i++;
var AFTER_CLOSING_TAG_NAME    = i++;
var BEFORE_ATTRIBUTE_NAME     = i++;
var IN_ATTRIBUTE_NAME         = i++;
var AFTER_ATTRIBUTE_NAME      = i++;
var BEFORE_ATTRIBUTE_VALUE    = i++;
var IN_ATTRIBUTE_VALUE_DQ     = i++;
var IN_ATTRIBUTE_VALUE_SQ     = i++;
var IN_ATTRIBUTE_VALUE_NQ     = i++;
var BEFORE_DECLARATION        = i++;
var IN_DECLARATION            = i++;
var IN_PROCESSING_INSTRUCTION = i++;
var BEFORE_COMMENT            = i++;
var IN_COMMENT                = i++;
var AFTER_COMMENT_1           = i++;
var AFTER_COMMENT_2           = i++;
var BEFORE_CDATA_1            = i++;
var BEFORE_CDATA_2            = i++;
var BEFORE_CDATA_3            = i++;
var BEFORE_CDATA_4            = i++;
var BEFORE_CDATA_5            = i++;
var BEFORE_CDATA_6            = i++;
var IN_CDATA                  = i++;
var AFTER_CDATA_1             = i++;
var AFTER_CDATA_2             = i++;
var BEFORE_SPECIAL            = i++;
var BEFORE_SPECIAL_END        = i++;
var BEFORE_SCRIPT_1           = i++;
var BEFORE_SCRIPT_2           = i++;
var BEFORE_SCRIPT_3           = i++;
var BEFORE_SCRIPT_4           = i++;
var BEFORE_SCRIPT_5           = i++;
var AFTER_SCRIPT_1            = i++;
var AFTER_SCRIPT_2            = i++;
var AFTER_SCRIPT_3            = i++;
var AFTER_SCRIPT_4            = i++;
var AFTER_SCRIPT_5            = i++;
var BEFORE_STYLE_1            = i++;
var BEFORE_STYLE_2            = i++;
var BEFORE_STYLE_3            = i++;
var BEFORE_STYLE_4            = i++;
var AFTER_STYLE_1             = i++;
var AFTER_STYLE_2             = i++;
var AFTER_STYLE_3             = i++;
var AFTER_STYLE_4             = i++;
var BEFORE_ENTITY             = i++;
var BEFORE_NUMERIC_ENTITY     = i++;
var IN_NAMED_ENTITY           = i++;
var IN_NUMERIC_ENTITY         = i++;
var IN_HEX_ENTITY             = i++;
var j = 0;
var SPECIAL_NONE              = j++;
var SPECIAL_SCRIPT            = j++;
var SPECIAL_STYLE             = j++;

function whitespace(c){
	return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function characterState(char, SUCCESS){
	return function(c){
		if(c === char) this._state = SUCCESS;
	};
}

function ifElseState(upper, SUCCESS, FAILURE){
	var lower = upper.toLowerCase();

	if(upper === lower){
		return function(c){
			if(c === lower){
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	} else {
		return function(c){
			if(c === lower || c === upper){
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	}
}

function consumeSpecialNameChar(upper, NEXT_STATE){
	var lower = upper.toLowerCase();

	return function(c){
		if(c === lower || c === upper){
			this._state = NEXT_STATE;
		} else {
			this._state = IN_TAG_NAME;
			this._index--; 
		}
	};
}

function Tokenizer$1(options, cbs){
	this._state = TEXT;
	this._buffer = "";
	this._sectionStart = 0;
	this._index = 0;
	this._bufferOffset = 0; 
	this._baseState = TEXT;
	this._special = SPECIAL_NONE;
	this._cbs = cbs;
	this._running = true;
	this._ended = false;
	this._xmlMode = !!(options && options.xmlMode);
	this._decodeEntities = !!(options && options.decodeEntities);
}

Tokenizer$1.prototype._stateText = function(c){
	if(c === "<"){
		if(this._index > this._sectionStart){
			this._cbs.ontext(this._getSection());
		}
		this._state = BEFORE_TAG_NAME;
		this._sectionStart = this._index;
	} else if(this._decodeEntities && this._special === SPECIAL_NONE && c === "&"){
		if(this._index > this._sectionStart){
			this._cbs.ontext(this._getSection());
		}
		this._baseState = TEXT;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateBeforeTagName = function(c){
	if(c === "/"){
		this._state = BEFORE_CLOSING_TAG_NAME;
	} else if(c === "<"){
		this._cbs.ontext(this._getSection());
		this._sectionStart = this._index;
	} else if(c === ">" || this._special !== SPECIAL_NONE || whitespace(c)) {
		this._state = TEXT;
	} else if(c === "!"){
		this._state = BEFORE_DECLARATION;
		this._sectionStart = this._index + 1;
	} else if(c === "?"){
		this._state = IN_PROCESSING_INSTRUCTION;
		this._sectionStart = this._index + 1;
	} else {
		this._state = (!this._xmlMode && (c === "s" || c === "S")) ?
						BEFORE_SPECIAL : IN_TAG_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateInTagName = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._emitToken("onopentagname");
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer$1.prototype._stateBeforeCloseingTagName = function(c){
	if(whitespace(c));
	else if(c === ">"){
		this._state = TEXT;
	} else if(this._special !== SPECIAL_NONE){
		if(c === "s" || c === "S"){
			this._state = BEFORE_SPECIAL_END;
		} else {
			this._state = TEXT;
			this._index--;
		}
	} else {
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateInCloseingTagName = function(c){
	if(c === ">" || whitespace(c)){
		this._emitToken("onclosetag");
		this._state = AFTER_CLOSING_TAG_NAME;
		this._index--;
	}
};

Tokenizer$1.prototype._stateAfterCloseingTagName = function(c){
	
	if(c === ">"){
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer$1.prototype._stateBeforeAttributeName = function(c){
	if(c === ">"){
		this._cbs.onopentagend();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c === "/"){
		this._state = IN_SELF_CLOSING_TAG;
	} else if(!whitespace(c)){
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateInSelfClosingTag = function(c){
	if(c === ">"){
		this._cbs.onselfclosingtag();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(!whitespace(c)){
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer$1.prototype._stateInAttributeName = function(c){
	if(c === "=" || c === "/" || c === ">" || whitespace(c)){
		this._cbs.onattribname(this._getSection());
		this._sectionStart = -1;
		this._state = AFTER_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer$1.prototype._stateAfterAttributeName = function(c){
	if(c === "="){
		this._state = BEFORE_ATTRIBUTE_VALUE;
	} else if(c === "/" || c === ">"){
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if(!whitespace(c)){
		this._cbs.onattribend();
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateBeforeAttributeValue = function(c){
	if(c === "\""){
		this._state = IN_ATTRIBUTE_VALUE_DQ;
		this._sectionStart = this._index + 1;
	} else if(c === "'"){
		this._state = IN_ATTRIBUTE_VALUE_SQ;
		this._sectionStart = this._index + 1;
	} else if(!whitespace(c)){
		this._state = IN_ATTRIBUTE_VALUE_NQ;
		this._sectionStart = this._index;
		this._index--; 
	}
};

Tokenizer$1.prototype._stateInAttributeValueDoubleQuotes = function(c){
	if(c === "\""){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateInAttributeValueSingleQuotes = function(c){
	if(c === "'"){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateInAttributeValueNoQuotes = function(c){
	if(whitespace(c) || c === ">"){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer$1.prototype._stateBeforeDeclaration = function(c){
	this._state = c === "[" ? BEFORE_CDATA_1 :
					c === "-" ? BEFORE_COMMENT :
						IN_DECLARATION;
};

Tokenizer$1.prototype._stateInDeclaration = function(c){
	if(c === ">"){
		this._cbs.ondeclaration(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer$1.prototype._stateInProcessingInstruction = function(c){
	if(c === ">"){
		this._cbs.onprocessinginstruction(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer$1.prototype._stateBeforeComment = function(c){
	if(c === "-"){
		this._state = IN_COMMENT;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
	}
};

Tokenizer$1.prototype._stateInComment = function(c){
	if(c === "-") this._state = AFTER_COMMENT_1;
};

Tokenizer$1.prototype._stateAfterComment1 = function(c){
	if(c === "-"){
		this._state = AFTER_COMMENT_2;
	} else {
		this._state = IN_COMMENT;
	}
};

Tokenizer$1.prototype._stateAfterComment2 = function(c){
	if(c === ">"){
		
		this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c !== "-"){
		this._state = IN_COMMENT;
	}
	
};

Tokenizer$1.prototype._stateBeforeCdata1 = ifElseState("C", BEFORE_CDATA_2, IN_DECLARATION);
Tokenizer$1.prototype._stateBeforeCdata2 = ifElseState("D", BEFORE_CDATA_3, IN_DECLARATION);
Tokenizer$1.prototype._stateBeforeCdata3 = ifElseState("A", BEFORE_CDATA_4, IN_DECLARATION);
Tokenizer$1.prototype._stateBeforeCdata4 = ifElseState("T", BEFORE_CDATA_5, IN_DECLARATION);
Tokenizer$1.prototype._stateBeforeCdata5 = ifElseState("A", BEFORE_CDATA_6, IN_DECLARATION);

Tokenizer$1.prototype._stateBeforeCdata6 = function(c){
	if(c === "["){
		this._state = IN_CDATA;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
		this._index--;
	}
};

Tokenizer$1.prototype._stateInCdata = function(c){
	if(c === "]") this._state = AFTER_CDATA_1;
};

Tokenizer$1.prototype._stateAfterCdata1 = characterState("]", AFTER_CDATA_2);

Tokenizer$1.prototype._stateAfterCdata2 = function(c){
	if(c === ">"){
		
		this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c !== "]") {
		this._state = IN_CDATA;
	}
	
};

Tokenizer$1.prototype._stateBeforeSpecial = function(c){
	if(c === "c" || c === "C"){
		this._state = BEFORE_SCRIPT_1;
	} else if(c === "t" || c === "T"){
		this._state = BEFORE_STYLE_1;
	} else {
		this._state = IN_TAG_NAME;
		this._index--; 
	}
};

Tokenizer$1.prototype._stateBeforeSpecialEnd = function(c){
	if(this._special === SPECIAL_SCRIPT && (c === "c" || c === "C")){
		this._state = AFTER_SCRIPT_1;
	} else if(this._special === SPECIAL_STYLE && (c === "t" || c === "T")){
		this._state = AFTER_STYLE_1;
	}
	else this._state = TEXT;
};

Tokenizer$1.prototype._stateBeforeScript1 = consumeSpecialNameChar("R", BEFORE_SCRIPT_2);
Tokenizer$1.prototype._stateBeforeScript2 = consumeSpecialNameChar("I", BEFORE_SCRIPT_3);
Tokenizer$1.prototype._stateBeforeScript3 = consumeSpecialNameChar("P", BEFORE_SCRIPT_4);
Tokenizer$1.prototype._stateBeforeScript4 = consumeSpecialNameChar("T", BEFORE_SCRIPT_5);

Tokenizer$1.prototype._stateBeforeScript5 = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._special = SPECIAL_SCRIPT;
	}
	this._state = IN_TAG_NAME;
	this._index--; 
};

Tokenizer$1.prototype._stateAfterScript1 = ifElseState("R", AFTER_SCRIPT_2, TEXT);
Tokenizer$1.prototype._stateAfterScript2 = ifElseState("I", AFTER_SCRIPT_3, TEXT);
Tokenizer$1.prototype._stateAfterScript3 = ifElseState("P", AFTER_SCRIPT_4, TEXT);
Tokenizer$1.prototype._stateAfterScript4 = ifElseState("T", AFTER_SCRIPT_5, TEXT);

Tokenizer$1.prototype._stateAfterScript5 = function(c){
	if(c === ">" || whitespace(c)){
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 6;
		this._index--; 
	}
	else this._state = TEXT;
};

Tokenizer$1.prototype._stateBeforeStyle1 = consumeSpecialNameChar("Y", BEFORE_STYLE_2);
Tokenizer$1.prototype._stateBeforeStyle2 = consumeSpecialNameChar("L", BEFORE_STYLE_3);
Tokenizer$1.prototype._stateBeforeStyle3 = consumeSpecialNameChar("E", BEFORE_STYLE_4);

Tokenizer$1.prototype._stateBeforeStyle4 = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._special = SPECIAL_STYLE;
	}
	this._state = IN_TAG_NAME;
	this._index--; 
};

Tokenizer$1.prototype._stateAfterStyle1 = ifElseState("Y", AFTER_STYLE_2, TEXT);
Tokenizer$1.prototype._stateAfterStyle2 = ifElseState("L", AFTER_STYLE_3, TEXT);
Tokenizer$1.prototype._stateAfterStyle3 = ifElseState("E", AFTER_STYLE_4, TEXT);

Tokenizer$1.prototype._stateAfterStyle4 = function(c){
	if(c === ">" || whitespace(c)){
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 5;
		this._index--; 
	}
	else this._state = TEXT;
};

Tokenizer$1.prototype._stateBeforeEntity = ifElseState("#", BEFORE_NUMERIC_ENTITY, IN_NAMED_ENTITY);
Tokenizer$1.prototype._stateBeforeNumericEntity = ifElseState("X", IN_HEX_ENTITY, IN_NUMERIC_ENTITY);


Tokenizer$1.prototype._parseNamedEntityStrict = function(){
	
	if(this._sectionStart + 1 < this._index){
		var entity = this._buffer.substring(this._sectionStart + 1, this._index),
		    map = this._xmlMode ? xmlMap : entityMap;

		if(map.hasOwnProperty(entity)){
			this._emitPartial(map[entity]);
			this._sectionStart = this._index + 1;
		}
	}
};



Tokenizer$1.prototype._parseLegacyEntity = function(){
	var start = this._sectionStart + 1,
	    limit = this._index - start;

	if(limit > 6) limit = 6; 

	while(limit >= 2){ 
		var entity = this._buffer.substr(start, limit);

		if(legacyMap.hasOwnProperty(entity)){
			this._emitPartial(legacyMap[entity]);
			this._sectionStart += limit + 1;
			return;
		} else {
			limit--;
		}
	}
};

Tokenizer$1.prototype._stateInNamedEntity = function(c){
	if(c === ";"){
		this._parseNamedEntityStrict();
		if(this._sectionStart + 1 < this._index && !this._xmlMode){
			this._parseLegacyEntity();
		}
		this._state = this._baseState;
	} else if((c < "a" || c > "z") && (c < "A" || c > "Z") && (c < "0" || c > "9")){
		if(this._xmlMode);
		else if(this._sectionStart + 1 === this._index);
		else if(this._baseState !== TEXT){
			if(c !== "="){
				this._parseNamedEntityStrict();
			}
		} else {
			this._parseLegacyEntity();
		}

		this._state = this._baseState;
		this._index--;
	}
};

Tokenizer$1.prototype._decodeNumericEntity = function(offset, base){
	var sectionStart = this._sectionStart + offset;

	if(sectionStart !== this._index){
		
		var entity = this._buffer.substring(sectionStart, this._index);
		var parsed = parseInt(entity, base);

		this._emitPartial(decodeCodePoint$1$1(parsed));
		this._sectionStart = this._index;
	} else {
		this._sectionStart--;
	}

	this._state = this._baseState;
};

Tokenizer$1.prototype._stateInNumericEntity = function(c){
	if(c === ";"){
		this._decodeNumericEntity(2, 10);
		this._sectionStart++;
	} else if(c < "0" || c > "9"){
		if(!this._xmlMode){
			this._decodeNumericEntity(2, 10);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer$1.prototype._stateInHexEntity = function(c){
	if(c === ";"){
		this._decodeNumericEntity(3, 16);
		this._sectionStart++;
	} else if((c < "a" || c > "f") && (c < "A" || c > "F") && (c < "0" || c > "9")){
		if(!this._xmlMode){
			this._decodeNumericEntity(3, 16);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer$1.prototype._cleanup = function (){
	if(this._sectionStart < 0){
		this._buffer = "";
		this._bufferOffset += this._index;
		this._index = 0;
	} else if(this._running){
		if(this._state === TEXT){
			if(this._sectionStart !== this._index){
				this._cbs.ontext(this._buffer.substr(this._sectionStart));
			}
			this._buffer = "";
			this._bufferOffset += this._index;
			this._index = 0;
		} else if(this._sectionStart === this._index){
			
			this._buffer = "";
			this._bufferOffset += this._index;
			this._index = 0;
		} else {
			
			this._buffer = this._buffer.substr(this._sectionStart);
			this._index -= this._sectionStart;
			this._bufferOffset += this._sectionStart;
		}

		this._sectionStart = 0;
	}
};


Tokenizer$1.prototype.write = function(chunk){
	if(this._ended) this._cbs.onerror(Error(".write() after done!"));

	this._buffer += chunk;
	this._parse();
};

Tokenizer$1.prototype._parse = function(){
	while(this._index < this._buffer.length && this._running){
		var c = this._buffer.charAt(this._index);
		if(this._state === TEXT) {
			this._stateText(c);
		} else if(this._state === BEFORE_TAG_NAME){
			this._stateBeforeTagName(c);
		} else if(this._state === IN_TAG_NAME) {
			this._stateInTagName(c);
		} else if(this._state === BEFORE_CLOSING_TAG_NAME){
			this._stateBeforeCloseingTagName(c);
		} else if(this._state === IN_CLOSING_TAG_NAME){
			this._stateInCloseingTagName(c);
		} else if(this._state === AFTER_CLOSING_TAG_NAME){
			this._stateAfterCloseingTagName(c);
		} else if(this._state === IN_SELF_CLOSING_TAG){
			this._stateInSelfClosingTag(c);
		}

		
		else if(this._state === BEFORE_ATTRIBUTE_NAME){
			this._stateBeforeAttributeName(c);
		} else if(this._state === IN_ATTRIBUTE_NAME){
			this._stateInAttributeName(c);
		} else if(this._state === AFTER_ATTRIBUTE_NAME){
			this._stateAfterAttributeName(c);
		} else if(this._state === BEFORE_ATTRIBUTE_VALUE){
			this._stateBeforeAttributeValue(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_DQ){
			this._stateInAttributeValueDoubleQuotes(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_SQ){
			this._stateInAttributeValueSingleQuotes(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_NQ){
			this._stateInAttributeValueNoQuotes(c);
		}

		
		else if(this._state === BEFORE_DECLARATION){
			this._stateBeforeDeclaration(c);
		} else if(this._state === IN_DECLARATION){
			this._stateInDeclaration(c);
		}

		
		else if(this._state === IN_PROCESSING_INSTRUCTION){
			this._stateInProcessingInstruction(c);
		}

		
		else if(this._state === BEFORE_COMMENT){
			this._stateBeforeComment(c);
		} else if(this._state === IN_COMMENT){
			this._stateInComment(c);
		} else if(this._state === AFTER_COMMENT_1){
			this._stateAfterComment1(c);
		} else if(this._state === AFTER_COMMENT_2){
			this._stateAfterComment2(c);
		}

		
		else if(this._state === BEFORE_CDATA_1){
			this._stateBeforeCdata1(c);
		} else if(this._state === BEFORE_CDATA_2){
			this._stateBeforeCdata2(c);
		} else if(this._state === BEFORE_CDATA_3){
			this._stateBeforeCdata3(c);
		} else if(this._state === BEFORE_CDATA_4){
			this._stateBeforeCdata4(c);
		} else if(this._state === BEFORE_CDATA_5){
			this._stateBeforeCdata5(c);
		} else if(this._state === BEFORE_CDATA_6){
			this._stateBeforeCdata6(c);
		} else if(this._state === IN_CDATA){
			this._stateInCdata(c);
		} else if(this._state === AFTER_CDATA_1){
			this._stateAfterCdata1(c);
		} else if(this._state === AFTER_CDATA_2){
			this._stateAfterCdata2(c);
		}

		
		else if(this._state === BEFORE_SPECIAL){
			this._stateBeforeSpecial(c);
		} else if(this._state === BEFORE_SPECIAL_END){
			this._stateBeforeSpecialEnd(c);
		}

		
		else if(this._state === BEFORE_SCRIPT_1){
			this._stateBeforeScript1(c);
		} else if(this._state === BEFORE_SCRIPT_2){
			this._stateBeforeScript2(c);
		} else if(this._state === BEFORE_SCRIPT_3){
			this._stateBeforeScript3(c);
		} else if(this._state === BEFORE_SCRIPT_4){
			this._stateBeforeScript4(c);
		} else if(this._state === BEFORE_SCRIPT_5){
			this._stateBeforeScript5(c);
		}

		else if(this._state === AFTER_SCRIPT_1){
			this._stateAfterScript1(c);
		} else if(this._state === AFTER_SCRIPT_2){
			this._stateAfterScript2(c);
		} else if(this._state === AFTER_SCRIPT_3){
			this._stateAfterScript3(c);
		} else if(this._state === AFTER_SCRIPT_4){
			this._stateAfterScript4(c);
		} else if(this._state === AFTER_SCRIPT_5){
			this._stateAfterScript5(c);
		}

		
		else if(this._state === BEFORE_STYLE_1){
			this._stateBeforeStyle1(c);
		} else if(this._state === BEFORE_STYLE_2){
			this._stateBeforeStyle2(c);
		} else if(this._state === BEFORE_STYLE_3){
			this._stateBeforeStyle3(c);
		} else if(this._state === BEFORE_STYLE_4){
			this._stateBeforeStyle4(c);
		}

		else if(this._state === AFTER_STYLE_1){
			this._stateAfterStyle1(c);
		} else if(this._state === AFTER_STYLE_2){
			this._stateAfterStyle2(c);
		} else if(this._state === AFTER_STYLE_3){
			this._stateAfterStyle3(c);
		} else if(this._state === AFTER_STYLE_4){
			this._stateAfterStyle4(c);
		}

		
		else if(this._state === BEFORE_ENTITY){
			this._stateBeforeEntity(c);
		} else if(this._state === BEFORE_NUMERIC_ENTITY){
			this._stateBeforeNumericEntity(c);
		} else if(this._state === IN_NAMED_ENTITY){
			this._stateInNamedEntity(c);
		} else if(this._state === IN_NUMERIC_ENTITY){
			this._stateInNumericEntity(c);
		} else if(this._state === IN_HEX_ENTITY){
			this._stateInHexEntity(c);
		}

		else {
			this._cbs.onerror(Error("unknown _state"), this._state);
		}

		this._index++;
	}

	this._cleanup();
};

Tokenizer$1.prototype.pause = function(){
	this._running = false;
};
Tokenizer$1.prototype.resume = function(){
	this._running = true;

	if(this._index < this._buffer.length){
		this._parse();
	}
	if(this._ended){
		this._finish();
	}
};

Tokenizer$1.prototype.end = function(chunk){
	if(this._ended) this._cbs.onerror(Error(".end() after done!"));
	if(chunk) this.write(chunk);

	this._ended = true;

	if(this._running) this._finish();
};

Tokenizer$1.prototype._finish = function(){
	
	if(this._sectionStart < this._index){
		this._handleTrailingData();
	}

	this._cbs.onend();
};

Tokenizer$1.prototype._handleTrailingData = function(){
	var data = this._buffer.substr(this._sectionStart);

	if(this._state === IN_CDATA || this._state === AFTER_CDATA_1 || this._state === AFTER_CDATA_2){
		this._cbs.oncdata(data);
	} else if(this._state === IN_COMMENT || this._state === AFTER_COMMENT_1 || this._state === AFTER_COMMENT_2){
		this._cbs.oncomment(data);
	} else if(this._state === IN_NAMED_ENTITY && !this._xmlMode){
		this._parseLegacyEntity();
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(this._state === IN_NUMERIC_ENTITY && !this._xmlMode){
		this._decodeNumericEntity(2, 10);
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(this._state === IN_HEX_ENTITY && !this._xmlMode){
		this._decodeNumericEntity(3, 16);
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(
		this._state !== IN_TAG_NAME &&
		this._state !== BEFORE_ATTRIBUTE_NAME &&
		this._state !== BEFORE_ATTRIBUTE_VALUE &&
		this._state !== AFTER_ATTRIBUTE_NAME &&
		this._state !== IN_ATTRIBUTE_NAME &&
		this._state !== IN_ATTRIBUTE_VALUE_SQ &&
		this._state !== IN_ATTRIBUTE_VALUE_DQ &&
		this._state !== IN_ATTRIBUTE_VALUE_NQ &&
		this._state !== IN_CLOSING_TAG_NAME
	){
		this._cbs.ontext(data);
	}
	
	
};

Tokenizer$1.prototype.reset = function(){
	Tokenizer$1.call(this, {xmlMode: this._xmlMode, decodeEntities: this._decodeEntities}, this._cbs);
};

Tokenizer$1.prototype.getAbsoluteIndex = function(){
	return this._bufferOffset + this._index;
};

Tokenizer$1.prototype._getSection = function(){
	return this._buffer.substring(this._sectionStart, this._index);
};

Tokenizer$1.prototype._emitToken = function(name){
	this._cbs[name](this._getSection());
	this._sectionStart = -1;
};

Tokenizer$1.prototype._emitPartial = function(value){
	if(this._baseState !== TEXT){
		this._cbs.onattribdata(value); 
	} else {
		this._cbs.ontext(value);
	}
};

var _inherits = function() {};

var _inherits$1 = Object.freeze({
	default: _inherits
});

var _resolve_empty = {};

var _resolve_empty$1 = Object.freeze({
	default: _resolve_empty
});

var require$$1$1$1 = ( _inherits$1 && _inherits ) || _inherits$1;

var require$$2 = ( _resolve_empty$1 && _resolve_empty ) || _resolve_empty$1;

var Tokenizer$1$1 = Tokenizer_1;





var formTags = {
	input: true,
	option: true,
	optgroup: true,
	select: true,
	button: true,
	datalist: true,
	textarea: true
};

var openImpliesClose = {
	tr      : { tr:true, th:true, td:true },
	th      : { th:true },
	td      : { thead:true, th:true, td:true },
	body    : { head:true, link:true, script:true },
	li      : { li:true },
	p       : { p:true },
	h1      : { p:true },
	h2      : { p:true },
	h3      : { p:true },
	h4      : { p:true },
	h5      : { p:true },
	h6      : { p:true },
	select  : formTags,
	input   : formTags,
	output  : formTags,
	button  : formTags,
	datalist: formTags,
	textarea: formTags,
	option  : { option:true },
	optgroup: { optgroup:true }
};

var voidElements = {
	__proto__: null,
	area: true,
	base: true,
	basefont: true,
	br: true,
	col: true,
	command: true,
	embed: true,
	frame: true,
	hr: true,
	img: true,
	input: true,
	isindex: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true,

	
	path: true,
	circle: true,
	ellipse: true,
	line: true,
	rect: true,
	use: true,
	stop: true,
	polyline: true,
	polygon: true
};

var re_nameEnd = /\s|\//;

function Parser$1(cbs, options){
	this._options = options || {};
	this._cbs = cbs || {};

	this._tagname = "";
	this._attribname = "";
	this._attribvalue = "";
	this._attribs = null;
	this._stack = [];

	this.startIndex = 0;
	this.endIndex = null;

	this._lowerCaseTagNames = "lowerCaseTags" in this._options ?
									!!this._options.lowerCaseTags :
									!this._options.xmlMode;
	this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ?
									!!this._options.lowerCaseAttributeNames :
									!this._options.xmlMode;

	if(this._options.Tokenizer) {
		Tokenizer$1$1 = this._options.Tokenizer;
	}
	this._tokenizer = new Tokenizer$1$1(this._options, this);

	if(this._cbs.onparserinit) this._cbs.onparserinit(this);
}

require$$1$1$1(Parser$1, require$$2.EventEmitter);

Parser$1.prototype._updatePosition = function(initialOffset){
	if(this.endIndex === null){
		if(this._tokenizer._sectionStart <= initialOffset){
			this.startIndex = 0;
		} else {
			this.startIndex = this._tokenizer._sectionStart - initialOffset;
		}
	}
	else this.startIndex = this.endIndex + 1;
	this.endIndex = this._tokenizer.getAbsoluteIndex();
};


Parser$1.prototype.ontext = function(data){
	this._updatePosition(1);
	this.endIndex--;

	if(this._cbs.ontext) this._cbs.ontext(data);
};

Parser$1.prototype.onopentagname = function(name){
	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	this._tagname = name;

	if(!this._options.xmlMode && name in openImpliesClose) {
		for(
			var el;
			(el = this._stack[this._stack.length - 1]) in openImpliesClose[name];
			this.onclosetag(el)
		);
	}

	if(this._options.xmlMode || !(name in voidElements)){
		this._stack.push(name);
	}

	if(this._cbs.onopentagname) this._cbs.onopentagname(name);
	if(this._cbs.onopentag) this._attribs = {};
};

Parser$1.prototype.onopentagend = function(){
	this._updatePosition(1);

	if(this._attribs){
		if(this._cbs.onopentag) this._cbs.onopentag(this._tagname, this._attribs);
		this._attribs = null;
	}

	if(!this._options.xmlMode && this._cbs.onclosetag && this._tagname in voidElements){
		this._cbs.onclosetag(this._tagname);
	}

	this._tagname = "";
};

Parser$1.prototype.onclosetag = function(name){
	this._updatePosition(1);
	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}
	
	
	
	if(this._options.xmlMode) {
		const stack = this._stack;
		let last = stack.pop();
		while(last !== name) {
			if(this._cbs.onerror) {
				this._cbs.onerror("Unclosed tag <"+last+">");
			}
			last = stack.pop();
		}
		this.onopentagend();
		if(this._cbs.onclosetag) {
			this._cbs.onclosetag(last);
		}
	} else {
		if(this._stack.length && (!(name in voidElements))) {
			let pos = this._stack.lastIndexOf(name);
			if(pos !== -1){
				if(this._cbs.onclosetag){
					pos = this._stack.length - pos;
					while(pos--) this._cbs.onclosetag(this._stack.pop());
				}
				else this._stack.length = pos;
			} else if(name === "p"){
				this.onopentagname(name);
				this._closeCurrentTag();
			}
		} else if(name === "br" || name === "p"){
			this.onopentagname(name);
			this._closeCurrentTag();
		}
	}
};

Parser$1.prototype.onselfclosingtag = function(){
	if(this._options.xmlMode || this._options.recognizeSelfClosing){
		this._closeCurrentTag();
	} else {
		this.onopentagend();
	}
};

Parser$1.prototype._closeCurrentTag = function(){
	var name = this._tagname;

	this.onopentagend();

	
	
	if(this._stack[this._stack.length - 1] === name){
		if(this._cbs.onclosetag){
			this._cbs.onclosetag(name);
		}
		this._stack.pop();
	}
};

Parser$1.prototype.onattribname = function(name){
	if(this._lowerCaseAttributeNames){
		name = name.toLowerCase();
	}
	this._attribname = name;
};

Parser$1.prototype.onattribdata = function(value){
	this._attribvalue += value;
};

Parser$1.prototype.onattribend = function(){
	if(this._cbs.onattribute) this._cbs.onattribute(this._attribname, this._attribvalue);
	if(
		this._attribs &&
		!Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)
	){
		this._attribs[this._attribname] = this._attribvalue;
	}
	this._attribname = "";
	this._attribvalue = "";
};

Parser$1.prototype._getInstructionName = function(value){
	var idx = value.search(re_nameEnd),
	    name = idx < 0 ? value : value.substr(0, idx);

	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	return name;
};

Parser$1.prototype.ondeclaration = function(value){
	if(this._cbs.onprocessinginstruction){
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("!" + name, "!" + value);
	}
};

Parser$1.prototype.onprocessinginstruction = function(value){
	if(this._cbs.onprocessinginstruction){
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("?" + name, "?" + value);
	}
};

Parser$1.prototype.oncomment = function(value){
	this._updatePosition(4);

	if(this._cbs.oncomment) this._cbs.oncomment(value);
	if(this._cbs.oncommentend) this._cbs.oncommentend();
};

Parser$1.prototype.oncdata = function(value){
	this._updatePosition(1);

	if(this._options.xmlMode || this._options.recognizeCDATA){
		if(this._cbs.oncdatastart) this._cbs.oncdatastart();
		if(this._cbs.ontext) this._cbs.ontext(value);
		if(this._cbs.oncdataend) this._cbs.oncdataend();
	} else {
		this.oncomment("[CDATA[" + value + "]]");
	}
};

Parser$1.prototype.onerror = function(err){
	if(this._cbs.onerror) this._cbs.onerror(err);
};

Parser$1.prototype.onend = function(){
	if(this._cbs.onclosetag){
		for(
			var i = this._stack.length;
			i > 0;
			this._cbs.onclosetag(this._stack[--i])
		);
	}
	if(this._cbs.onend) this._cbs.onend();
};



Parser$1.prototype.reset = function(){
	if(this._cbs.onreset) this._cbs.onreset();
	this._tokenizer.reset();

	this._tagname = "";
	this._attribname = "";
	this._attribs = null;
	this._stack = [];

	if(this._cbs.onparserinit) this._cbs.onparserinit(this);
};


Parser$1.prototype.parseComplete = function(data){
	this.reset();
	this.end(data);
};

Parser$1.prototype.write = function(chunk){
	this._tokenizer.write(chunk);
};

Parser$1.prototype.end = function(chunk){
	this._tokenizer.end(chunk);
};

Parser$1.prototype.pause = function(){
	this._tokenizer.pause();
};

Parser$1.prototype.resume = function(){
	this._tokenizer.resume();
};


Parser$1.prototype.parseChunk = Parser$1.prototype.write;
Parser$1.prototype.done = Parser$1.prototype.end;

var Parser_1 = Parser$1;

Parser_1.prototype.oncdata = function(value){
  this._updatePosition(1);

  if(this._options.xmlMode || this._options.recognizeCDATA){
    if(this._cbs.oncdatastart) this._cbs.oncdatastart(value);
    
    if(this._cbs.oncdataend) this._cbs.oncdataend();
  } else {
    this.oncomment("[CDATA[" + value + "]]");
  }
};

function parseMarkup(markup, options) {
  let format = options.ownerDocument ? options.ownerDocument.format : options.format;
  
  if (!format) {
    throw new Error("Either 'ownerDocument' or 'format' must be set.")
  }
  let parserOptions = {
    xmlMode : (format === 'xml')
  };
  let handler = new DomHandler({ format });
  let parser = new Parser_1(handler, parserOptions);
  parser.end(markup);
  return handler.document
}


const re_whitespace = /\s+/g;


class DomHandler {

  constructor(options = {}) {
    this.options = options;
    this.document = null;
    this._tagStack = [];
  }

  
  onparserinit(){
    this.document = new MemoryDOMElement('document', { format: this.options.format });
    this._tagStack = [this.document];
  }

  onend(){
    
    if (this._tagStack.length>1) {
      throw new Error(`Unexpected EOF. Tag was opened but not closed.`)
    }
  }

  onerror(error) {
    throw new Error(error)
  }

  onclosetag() {
    this._tagStack.pop();
  }

  _addDomElement(element) {
    let parent = this._tagStack[this._tagStack.length - 1];
    if (!parent.childNodes) parent.childNodes = [];
    let siblings = parent.childNodes;

    let previousSibling = siblings[siblings.length - 1];
    
    element.next = null;
    if(previousSibling){
      element.prev = previousSibling;
      previousSibling.next = element;
    } else {
      element.prev = null;
    }
    
    siblings.push(element);
    element.parent = parent || null;
  }

  onopentag(name, attributes) {
    let element = this.document.createElement(name);
    forEach(attributes, (val, key) => {
      element.setAttribute(key, val);
    });
    this._addDomElement(element);
    this._tagStack.push(element);
  }

  ontext(text) {
    if (this.options.normalizeWhitespace) {
      text = text.replace(re_whitespace, " ");
    }
    let lastTag;
    let _top = this._tagStack[this._tagStack.length - 1];
    if (_top && _top.childNodes) lastTag = _top.childNodes[_top.childNodes.length - 1];
    if (lastTag && lastTag.type === index.Text) {
      lastTag.data += text;
    } else {
      let element = this.document.createTextNode(text);
      this._addDomElement(element);
    }
  }

  oncomment(data) {
    var lastTag = this._tagStack[this._tagStack.length - 1];
    if(lastTag && lastTag.type === index.Comment){
      lastTag.data += data;
    } else {
      let element = this.document.createComment(data);
      this._addDomElement(element);
      this._tagStack.push(element);
    }
  }

  oncommentend() {
    this._tagStack.pop();
  }

  oncdatastart(data) {
    let element = this.document.createCDATASection(data);
    this._addDomElement(element);
    this._tagStack.push(element);
  }

  oncdataend() {
    this._tagStack.pop();
  }

  onprocessinginstruction(name, data) {
    let element = this.document.createProcessingInstruction(name, data);
    this._addDomElement(element);
  }

}

class MemoryDOMElement extends DOMElement {

  constructor(type, args = {}) {
    super();

    this.type = type;
    if (!type) throw new Error("'type' is mandatory")

    this.ownerDocument = args.ownerDocument;
    
    if (type !== 'document' && !this.ownerDocument) {
      throw new Error("'ownerDocument' is mandatory")
    }

    
    
    

    switch(type) {
      case index.Tag: {
        if (!args.name) throw new Error("'name' is mandatory.")
        this.name = this._normalizeName(args.name);
        this.nameWithoutNS = nameWithoutNS(this.name);
        this.properties = new Map();
        this.attributes = new Map();
        this.classes = new Set();
        this.styles = new Map();
        this.eventListeners = [];
        this.childNodes = args.children || args.childNodes || [];
        this._assign(args);
        break
      }
      case index.Text:
      case index.Comment: {
        this.data = args.data || '';
        break
      }
      case index.CDATA: {
        this.data = args.data || '';
        break
      }
      case index.Directive: {
        if (!args.name) throw new Error("'name' is mandatory.")
        this.name = this._normalizeName(args.name);
        this.nameWithoutNS = nameWithoutNS(this.name);
        this.data = args.data;
        break
      }
      case 'document': {
        let format = args.format;
        this.format = format;
        if (!format) throw new Error("'format' is mandatory.")
        this.childNodes = args.children || args.childNodes || [];
        switch(format) {
          case 'xml':
            this.contentType = 'application/xml';
            break
          case 'html':
            this.contentType = 'text/html';
            break
          default:
            throw new Error('Unsupported format ' + format)
        }
        break
      }
      default:
        this.name = null;
        this.properties = new Map();
        this.attributes = new Map();
        this.classes = new Set();
        this.styles = new Map();
        this.eventListeners = [];
        this.childNodes = args.children || args.childNodes || [];
    }
  }

  getNativeElement() {
    return this
  }

  getNodeType() {
    switch(this.type) {
      case index.Tag:
      case index.Script:
      case index.Style:
        return 'element'
      default:
        return this.type
    }
  }

  isTextNode() {
    return this.type === "text"
  }

  isElementNode() {
    return this.type === "tag" || this.type === "script"
  }

  isCommentNode() {
    return this.type === "comment"
  }

  isDocumentNode() {
    return this.type === "document"
  }

  isComponentNode() {
    return this.type === "component"
  }

  clone(deep) {
    let clone$$1 = new MemoryDOMElement(this.type, this);
    if (this.childNodes) {
      clone$$1.childNodes.length = 0;
      if (deep) {
        this.childNodes.forEach((child) => {
          clone$$1.appendChild(child.clone(deep));
        });
      }
    }
    return clone$$1
  }

  get tagName() {
    return this.getTagName()
  }

  set tagName(tagName) {
    this.setTagName(tagName);
  }

  getTagName() {
    return this.name
  }

  setTagName(tagName) {
    if (this._isXML()) {
      this.name = String(tagName);
    } else {
      this.name = String(tagName).toLowerCase();
    }
    return this
  }

  hasAttribute(name) {
    return this.attributes.has(name)
  }

  getAttribute(name) {
    return this.attributes.get(name)
  }

  setAttribute(name, value) {
    value = String(value);
    
    switch(name) {
      case 'class':
        parseClasses(this.classes, value);
        break
      case 'style':
        parseStyles(this.styles, value);
        break
      default:
        
    }
    this.attributes.set(name, value);
    if (this._isHTML()) {
      deriveHTMLPropertyFromAttribute(this, name, value);
    }
    return this
  }

  removeAttribute(name) {
    switch(name) {
      case 'class':
        this.classes = new Set();
        break
      case 'style':
        this.styles = new Map();
        break
      default:
        
    }
    this.attributes.delete(name);
    return this
  }

  getAttributes() {
    return this.attributes
  }

  getProperty(name) {
    if (this.properties) {
      return this.properties.get(name)
    }
  }

  setProperty(name, value) {
    if (this.properties) {
      if (this._isXML()) {
        throw new Error('setProperty() is only be used on HTML elements')
      }
      _setHTMLPropertyValue(this, name, value);
    }
    return this
  }

  hasClass(name) {
    if (this.classes) {
      return this.classes.has(name)
    }
  }

  addClass(name) {
    this.classes.add(name);
    this.attributes.set('class', stringifyClasses(this.classes));
    return this
  }

  removeClass(name) {
    if (this.classes && this.classes.has(name)) {
      this.classes.delete(name);
      this.attributes.set('class', stringifyClasses(this.classes));
    }
    return this
  }

  getContentType() {
    return this.getOwnerDocument().contentType
  }

  getInnerHTML() {
    return domUtils.getInnerHTML(this)
  }

  
  
  setInnerHTML(html) {
    if (this.childNodes) {
      let _doc = parseMarkup(html, {
        ownerDocument: this.getOwnerDocument()
      });
      this.empty();
      
      
      _doc.childNodes.slice(0).forEach((child) => {
        this.appendChild(child);
      });
    }
    return this
  }

  getOuterHTML() {
    return domUtils.getOuterHTML(this, { xmlMode: this._isXML() })
  }

  getTextContent() {
    return domUtils.getText(this)
  }

  setTextContent(text) {
    switch(this.type) {
      case index.Text:
      case index.Comment:
      case index.CDATA: {
        this.data = text;
        break
      }
      default: {
        if (this.childNodes) {
          let child = this.createTextNode(text);
          this.empty();
          this.appendChild(child);
        }
      }
    }
    return this
  }

  getStyle(name) {
    if (this.styles) {
      return this.styles.get(name)
    }
  }

  setStyle(name, value) {
    if (this.styles) {
      if (DOMElement.pxStyles[name] && isNumber(value)) {
        value = value + "px";
      }
      this.styles.set(name, value);
      this.attributes.set('style', stringifyStyles(this.styles));
    }
    return this
  }

  is(cssSelector) {
    return index$1.is(this, cssSelector, { xmlMode: this._isXML() })
  }

  find(cssSelector) {
    return index$1.selectOne(cssSelector, this, { xmlMode: this._isXML() })
  }

  findAll(cssSelector) {
    return index$1.selectAll(cssSelector, this, { xmlMode: this._isXML() })
  }

  getChildCount() {
    if (this.childNodes) {
      return this.childNodes.length
    } else {
      return 0
    }
  }

  getChildNodes() {
    return this.childNodes.slice(0)
  }

  getChildren() {
    return this.childNodes.filter(function(node) {
      return node.type === "tag"
    })
  }

  get children() {
    return this.getChildren()
  }

  getChildAt(pos) {
    if (this.childNodes) {
      return this.childNodes[pos]
    }
  }

  getChildIndex(child) {
    if (this.childNodes) {
      return this.childNodes.indexOf(child)
    }
  }

  getLastChild() {
    if (this.childNodes) {
      return last$1(this.childNodes)
    }
  }

  getFirstChild() {
    if (this.childNodes) {
      return this.childNodes[0]
    }
  }

  getNextSibling() {
    return this.next
  }

  getPreviousSibling() {
    return this.prev
  }

  getParent() {
    return this.parent
  }

  getOwnerDocument() {
    return (this.type === 'document') ? this : this.ownerDocument
  }

  getFormat() {
    return this.getOwnerDocument().format
  }

  createDocument(format) {
    return MemoryDOMElement.createDocument(format)
  }

  createElement(tagName) {
    return new MemoryDOMElement(index.Tag, { name: tagName, ownerDocument: this.getOwnerDocument() })
  }

  createTextNode(text) {
    return new MemoryDOMElement(index.Text, { data: text, ownerDocument: this.getOwnerDocument() })
  }

  createComment(data) {
    return new MemoryDOMElement(index.Comment, { data: data, ownerDocument: this.getOwnerDocument() })
  }

  createProcessingInstruction(name, data) {
    return new MemoryDOMElement(index.Directive, { name: name, data: data, ownerDocument: this.getOwnerDocument() })
  }

  createCDATASection(data) {
    return new MemoryDOMElement(index.CDATA, { data: data, ownerDocument: this.getOwnerDocument() })
  }

  appendChild(child) {
    if (this.childNodes && !isNil(child)) {
      child = this._normalizeChild(child);
      if (!child) return this
      domUtils.appendChild(this, child);
      child.ownerDocument = this.getOwnerDocument();
    }
    return this
  }

  removeChild(child) {
    if (child.parentNode === this) {
      child.remove();
    }
  }

  insertAt(pos, child) {
    child = this._normalizeChild(child);
    if (!child) return this
    let childNodes = this.childNodes;
    if (childNodes) {
      
      if (pos >= childNodes.length) {
        domUtils.appendChild(this, child);
      } else {
        domUtils.prepend(childNodes[pos], child);
      }
      child.ownerDocument = this.getOwnerDocument();
    }
    return this
  }

  insertBefore(newChild, before) {
    if (isNil(before)) {
      return this.appendChild(newChild)
    } else if (this.childNodes) {
      var pos = this.childNodes.indexOf(before);
      if (pos > -1) {
        domUtils.prepend(before, newChild);
        newChild.ownerDocument = this.getOwnerDocument();
      } else {
        throw new Error('insertBefore(): reference node is not a child of this element.')
      }
    }
    return this
  }

  removeAt(pos) {
    let childNodes = this.childNodes;
    if (childNodes) {
      let child = childNodes[pos];
      child.remove();
    }
    return this
  }

  empty() {
    let childNodes = this.childNodes;
    if (childNodes) {
      childNodes.forEach((child) => {
        child.next = child.prev = child.parent = null;
      });
      childNodes.length = 0;
    }
    return this
  }

  remove() {
    domUtils.removeElement(this);
    return this
  }

  replaceChild(oldChild, newChild) {
    if (oldChild.parent === this) {
      oldChild.replaceWith(newChild);
    }
    return this
  }

  replaceWith(newEl) {
    newEl = this._normalizeChild(newEl);
    domUtils.replaceElement(this, newEl);
    newEl.ownerDocument = this.getOwnerDocument();
    return this
  }

  getEventListeners() {
    return this.eventListeners || []
  }

  click() {
    this.emit('click', { target: this });
    return this
  }

  emit(name, data) {
    this._propagateEvent(new MemoryDOMElementEvent(name, this, data));
  }

  _propagateEvent(event) {
    let listeners = this.eventListeners;
    if (listeners) {
      let listener = listeners.find((l) => {
        return l.eventName === event.type
      });
      if (listener) listener.handler(event);
      if (event.stopped) return
      let p = this.parentNode;
      if (p) p._propagateEvent(event);
    }
  }

  removeAllEventListeners() {
    this.eventListeners = [];
    return this
  }

  _assign(other) {
    if (other.name) this.name = other.name;
    if (this.classes && other.classes) {
      other.classes.forEach((val) => {
        this.classes.add(val);
      });
    }
    if (this.styles && other.styles) {
      forEach(other.styles, (val, name) => {
        this.styles.set(name, val);
      });
    }
    
    
    let otherAttributes = other.attributes || other.attribs;
    if (this.attributes && otherAttributes) {
      forEach(otherAttributes, (val, name) => {
        switch (name) {
          case 'class': {
            parseClasses(this.classes, val);
            break
          }
          case 'style': {
            parseStyles(this.styles, val);
            break
          }
          default:
            this.attributes.set(name, val);
        }
      });
    }
    if (this.eventListeners && other.eventListeners) {
      this.eventListeners = this.eventListeners.concat(other.eventListeners);
    }
  }

  _normalizeChild(child) {
    if (isNil(child)) return

    if (isString$1(child)) {
      child = this.createTextNode(child);
    }
    
    if (!child || !child._isMemoryDOMElement) {
      throw new Error('Illegal argument: only String and MemoryDOMElement instances are valid.')
    }
    return child
  }

  _normalizeName(name) {
    if (this._isXML()) {
      return name
    } else {
      return name.toLowerCase()
    }
  }

  _isHTML() {
    return this.getFormat() === 'html'
  }

  _isXML() {
    return this.getFormat() === 'xml'
  }

}

MemoryDOMElement.prototype._isMemoryDOMElement = true;

MemoryDOMElement.createDocument = function(format) {
  if (format === 'xml') {
    return new MemoryDOMElement('document', { format: format })
  } else {
    return MemoryDOMElement.parseMarkup(DOMElement.EMPTY_HTML, 'html')
  }
};

MemoryDOMElement.parseMarkup = function(str, format, options={}) {
  if (!str) {
    return MemoryDOMElement.createDocument(format)
  }
  if (options.snippet) {
    str = `<__snippet__>${str}</__snippet__>`;
  }
  let doc;
  if (format === 'html') {
    doc = parseMarkup(str, { format: format });
    _sanitizeHTMLStructure(doc);
  } else if (format === 'xml') {
    doc = parseMarkup(str, { format: format });
  }
  if (options.snippet) {
    let childNodes = doc.find('__snippet__').childNodes;
    if (childNodes.length === 1) {
      return childNodes[0]
    } else {
      return childNodes
    }
  } else {
    return doc
  }
};

MemoryDOMElement.wrap =
MemoryDOMElement.wrapNativeElement = function(el) {
  if (inBrowser) {
    
    
    
    
    if (el === window || el === window.document) {
      return new DOMElementStub()
    }
    
    
    
    else if (el instanceof window.Node || el._isBrowserDOMElement) {
      
    }
  }
  
  if (!el._isMemoryDOMElement) {
    throw new Error('Illegal argument: expected MemoryDOMElement instance')
  }
  return el
};

MemoryDOMElement.unwrap = function(el) {
  
  if (!el._isMemoryDOMElement) {
    throw new Error('Illegal argument: expected MemoryDOMElement instance')
  }
  return el
};




MemoryDOMElement.isReverse = function() {
  return false
};


let _browserWindowStub;
MemoryDOMElement.getBrowserWindow = function() {
  
  if (!_browserWindowStub) {
    _browserWindowStub = MemoryDOMElement.createDocument('html');
  }
  return _browserWindowStub
};

function parseClasses(classes, classStr) {
  classStr.split(/\s+/).forEach((name) => {
    classes.add(name);
  });
}

function stringifyClasses(classes) {
  return Array.from(classes).join(' ')
}

function parseStyles(styles, styleStr) {
  styleStr = (styleStr || '').trim();
  if (!styleStr) return
  styleStr.split(';').forEach((style) => {
    let n = style.indexOf(':');
    
    if (n < 1 || n === style.length-1) return
    let name = style.slice(0,n).trim();
    let val = style.slice(n+1).trim();
    styles.set(name, val);
  });
}

function stringifyStyles(styles) {
  if (!styles) return ''
  let str = Object.keys(styles).map((name) => {
    return name + ':' + styles[name]
  }).join(';');
  if (str.length > 0) str += ';';
  return str
}

const BUILTIN_EVENTS = [
  'keydown', 'keyup', 'keypress',
  'mousedown', 'mouseup', 'mouseover', 'click', 'dblclick'
].reduce((m, k)=>{m[k]=true;return m}, {});

class MemoryDOMElementEvent {

  constructor(type, target, detail) {
    this.type = type;
    this.timeStamp = Date.now();
    this.target = target;

    if (BUILTIN_EVENTS[type]) {
      
      if (detail) {
        Object.assign(this, detail);
      }
    } else {
      this.detail = detail;
    }
  }

  stopPropagation() {
    this.stopped = true;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }
}

class DOMElementStub {
  on() {}
  off(){}
}

function nameWithoutNS(name) {
  const idx = name.indexOf(':');
  if (idx > 0) {
    return name.slice(idx+1)
  } else {
    return name
  }
}



const ATTR_TO_PROPS = {
  "input": {
    "value": true,
    "checked": (el, name, value) => {
      const checked = (value !== 'off');
      el.setProperty('checked', checked);
    }
  }
};

function deriveHTMLPropertyFromAttribute(el, name, value) {
  const mappings = ATTR_TO_PROPS[el.tagName];
  if (mappings) {
    let mapper = mappings[name];
    if (mapper === true) {
      el.setProperty(name, value);
    } else if (mapper) {
      mapper(el, name, value);
    }
  }
}

const PROPERTY_TRANSFORMATIONS = {
  "input": {
    "checked": (el, name, value) => {
      if (value === true) {
        el.properties.set(name, true);
        el.properties.set('value', 'on');
      } else {
        el.properties.set(name, false);
        el.properties.set('value', 'off');
      }
    },
    "value": (el, name, value) => {
      let type = el.getAttribute('type');
      switch(type) {
        case 'checkbox':
          if (value === 'on') {
            el.properties.set(name, true);
            el.properties.set('value', 'on');
          } else {
            el.properties.set(name, false);
            el.properties.set('value', 'off');
          }
          break
        default:
          _setProperty(el, name, value);
      }
    }
  }
};

function _setProperty(el, name, value) {
  if (value === undefined) {
    el.properties.delete(name);
  } else {
    el.properties.set(name, String(value));
  }
}

function _setHTMLPropertyValue(el, name, value) {
  const trafos = PROPERTY_TRANSFORMATIONS[el.tagName];
  if (trafos) {
    let mapper = trafos[name];
    if (mapper) {
      mapper(el, name, value);
      return
    }
  }
  _setProperty(el, name, value);
}

function _sanitizeHTMLStructure(doc) {
  
  
  
  
  let htmlEl = doc.find('html');
  if (!htmlEl) {
    
    
    let headEl = doc.find('head');
    let titleEl = doc.find('title');
    let metaEls = doc.findAll('meta');
    let bodyEl = doc.find('body');
    if (headEl) headEl.remove();
    if (titleEl) titleEl.remove();
    metaEls.forEach(e => e.remove());
    if (bodyEl) bodyEl.remove();

    
    
    let contentNodes = doc.childNodes.slice();
    contentNodes.forEach((c)=>{c.parent = null;});
    doc.childNodes.length = 0;

    htmlEl = doc.createElement('html');
    
    
    
    if (!headEl) {
      headEl = doc.createElement('head');
      headEl.appendChild(titleEl);
      headEl.append(metaEls);
      htmlEl.appendChild(headEl);
    }
    if (!bodyEl) {
      bodyEl = doc.createElement('body');
      bodyEl.append(contentNodes);
    }
    htmlEl.appendChild(bodyEl);

    doc.append(htmlEl);
  }
}

let DefaultDOMElement = {};

DefaultDOMElement.createDocument = function(format) {
  return _getDefaultImpl().createDocument(format)
};


DefaultDOMElement.createElement = function(tagName) {
  console.error("DEPRECATED: every element should have an ownerDocument. Use DefaultDOMElement.createDocument() to create a document first");
  let doc = DefaultDOMElement.createDocument('html');
  return doc.createElement(tagName)
};


DefaultDOMElement.createTextNode = function(text) {
  console.error("DEPRECATED: every element should have a ownerDocument. Use DefaultDOMElement.createDocument() to create a document first");
  let doc = DefaultDOMElement.createDocument('html');
  return doc.createTextNode(text)
};


DefaultDOMElement.getBrowserWindow = function() {
  return _getDefaultImpl().getBrowserWindow()
};


DefaultDOMElement.parseHTML = function(html, options) {
  return _getDefaultImpl().parseMarkup(html, 'html', options)
};


DefaultDOMElement.parseXML = function(xml, options) {
  return _getDefaultImpl().parseMarkup(xml, 'xml', options)
};

DefaultDOMElement.parseSnippet = function(str, format) {
  return _getDefaultImpl().parseMarkup(str, format, {snippet: true})
};

DefaultDOMElement.wrap =
DefaultDOMElement.wrapNativeElement = function(nativeEl) {
  if (!nativeEl) throw new Error('Illegal argument')
  return _getDefaultImpl().wrap(nativeEl)
};

DefaultDOMElement.unwrap = function(nativeEl) {
  if (!nativeEl) throw new Error('Illegal argument')
  return _getDefaultImpl().unwrap(nativeEl)
};



DefaultDOMElement.isReverse = function(anchorNode, anchorOffset, focusNode, focusOffset) {
  return _getDefaultImpl().isReverse(anchorNode, anchorOffset, focusNode, focusOffset)
};

function _getDefaultImpl() {
  
  if (platform.inBrowser || platform.inElectron) {
    return BrowserDOMElement
  } else {
    return MemoryDOMElement
  }
}

class VirtualElement extends DOMElement {

  constructor(owner) {
    super();

    
    this.parent = null;
    
    this._owner = owner;
    
    this._ref = null;
  }

  getParent() {
    return this.parent
  }

  get childNodes() {
    return this.getChildNodes()
  }

  
  getComponent() {
    return this._comp
  }

  
  ref(ref) {
    if (!ref) throw new Error('Illegal argument')
    
    if (this._ref) throw new Error('A VirtualElement can only be referenced once.')
    this._ref = ref;
    if (this._context) {
      const refs = this._context.refs;
      if(refs[ref]) {
        throw new Error('An item with reference "'+ref+'" already exists.')
      }
      refs[ref] = this;
    }
    return this
  }

  isInDocument() {
    return false
  }

}

VirtualElement.prototype._isVirtualElement = true;


class VirtualHTMLElement extends VirtualElement {

  constructor(tagName) {
    super();

    this._tagName = tagName;
    this.classNames = null;
    this.attributes = null;
    this.htmlProps = null;
    this.style = null;
    this.eventListeners = null;

    
    this.children = [];
  }

  getTagName() {
    return this._tagName
  }

  setTagName(tagName) {
    this._tagName = tagName;
    return this
  }

  hasClass(className) {
    if (this.classNames) {
      return this.classNames.indexOf(className) > -1
    }
    return false
  }

  addClass(className) {
    if (!this.classNames) {
      this.classNames = [];
    }
    this.classNames.push(className);
    return this
  }

  removeClass(className) {
    if (this.classNames) {
      this.classNames = without(this.classNames, className);
    }
    return this
  }

  removeAttribute(name) {
    if (this.attributes) {
      delete this.attributes[name];
    }
    return this
  }

  getAttribute(name) {
    if (this.attributes) {
      return this.attributes[name]
    }
  }

  setAttribute(name, value) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[name] = value;
    return this
  }

  getAttributes() {
    
    
    
    var attributes = {};
    if (this.attributes) {
      Object.assign(attributes, this.attributes);
    }
    if (this.classNames) {
      attributes.class = this.classNames.join(' ');
    }
    if (this.style) {
      attributes.style = map(this.style, function(val, key) {
        return key + ":" + val
      }).join(';');
    }
    return attributes
  }

  getId() {
    return this.getAttribute('id')
  }

  setId(id) {
    this.setAttribute('id', id);
    return this
  }

  setTextContent(text) {
    text = String(text || '');
    this.empty();
    this.appendChild(text);
    return this
  }

  setInnerHTML(html) {
    html = html || '';
    this.empty();
    this._innerHTMLString = html;
    return this
  }

  getInnerHTML() {
    if (!this.hasOwnProperty('_innerHTMLString')) {
      throw new Error('Not supported.')
    } else {
      return this._innerHTMLString
    }
  }

  getValue() {
    return this.htmlProp('value')
  }

  setValue(value) {
    this.htmlProp('value', value);
    return this
  }

  getChildNodes() {
    return this.children
  }

  getChildren() {
    return this.children.filter(function(child) {
      return child.getNodeType() !== "text"
    })
  }

  isTextNode() {
    return false
  }

  isElementNode() {
    return true
  }

  isCommentNode() {
    return false
  }

  isDocumentNode() {
    return false
  }

  append() {
    if (this._innerHTMLString) {
      throw Error('It is not possible to mix $$.html() with $$.append(). You can call $$.empty() to reset this virtual element.')
    }
    this._append(this.children, arguments);
    return this
  }

  appendChild(child) {
    if (this._innerHTMLString) {
      throw Error('It is not possible to mix $$.html() with $$.append(). You can call $$.empty() to reset this virtual element.')
    }
    this._appendChild(this.children, child);
    return this
  }

  insertAt(pos, child) {
    child = this._normalizeChild(child);
    if (!child) {
      throw new Error('Illegal child: ' + child)
    }
    if (!child._isVirtualElement) {
      throw new Error('Illegal argument for $$.insertAt():' + child)
    }
    if (pos < 0 || pos > this.children.length) {
      throw new Error('insertAt(): index out of bounds.')
    }
    this._insertAt(this.children, pos, child);
    return this
  }

  insertBefore(child, before) {
    var pos = this.children.indexOf(before);
    if (pos > -1) {
      this.insertAt(pos, child);
    } else {
      throw new Error('insertBefore(): reference node is not a child of this element.')
    }
    return this
  }

  removeAt(pos) {
    if (pos < 0 || pos >= this.children.length) {
      throw new Error('removeAt(): Index out of bounds.')
    }
    this._removeAt(pos);
    return this
  }

  removeChild(child) {
    if (!child || !child._isVirtualElement) {
      throw new Error('removeChild(): Illegal arguments. Expecting a CheerioDOMElement instance.')
    }
    var idx = this.children.indexOf(child);
    if (idx < 0) {
      throw new Error('removeChild(): element is not a child.')
    }
    this.removeAt(idx);
    return this
  }

  replaceChild(oldChild, newChild) {
    if (!newChild || !oldChild ||
        !newChild._isVirtualElement || !oldChild._isVirtualElement) {
      throw new Error('replaceChild(): Illegal arguments. Expecting BrowserDOMElement instances.')
    }
    var idx = this.children.indexOf(oldChild);
    if (idx < 0) {
      throw new Error('replaceChild(): element is not a child.')
    }
    this.removeAt(idx);
    this.insertAt(idx, newChild);
    return this
  }

  empty() {
    var children = this.children;
    while (children.length) {
      var child = children.pop();
      child.parent = null;
    }
    delete this._innerHTMLString;
    return this
  }

  getProperty(name) {
    if (this.htmlProps) {
      return this.htmlProps[name]
    }
  }

  setProperty(name, value) {
    if (!this.htmlProps) {
      this.htmlProps = {};
    }
    this.htmlProps[name] = value;
    return this
  }

  removeProperty(name) {
    if (this.htmlProps) {
      delete this.htmlProps[name];
    }
    return this
  }

  getStyle(name) {
    if (this.style) {
      return this.style[name]
    }
  }

  setStyle(name, value) {
    if (!this.style) {
      this.style = {};
    }
    if (DOMElement.pxStyles[name] && isNumber(value)) value = value + 'px';
    this.style[name] = value;
    return this
  }

  _createEventListener(eventName, handler, options) {
    options.context = options.context || this._owner._comp;
    return super._createEventListener(eventName, handler, options)
  }

  getNodeType() {
    return "element"
  }

  hasInnerHTML() {
    return Boolean(this._innerHTMLString)
  }

  _normalizeChild(child) {
    if (isNil(child)) {
      return
    } else if (child._isVirtualElement) {
      return child
    } else if (isString$1(child) || isBoolean(child) || isNumber(child)) {
      return new VirtualTextNode(String(child))
    } else {
      throw new Error('Unsupported child type')
    }
  }

  _append(outlet, args) {
    if (args.length === 1 && !isArray$1(args[0])) {
      this._appendChild(outlet, args[0]);
      return
    }
    var children;
    if (isArray$1(args[0])) {
      children = args[0];
    } else if (arguments.length > 1) {
      children = Array.prototype.slice.call(args,0);
    } else {
      return
    }
    children.forEach(this._appendChild.bind(this, outlet));
  }

  _appendChild(outlet, child) {
    child = this._normalizeChild(child);
    
    
    if (!child) return
    outlet.push(child);
    this._attach(child);
    return child
  }

  _insertAt(outlet, pos, child) {
    if (!child) return
    outlet.splice(pos, 0, child);
    this._attach(child);
  }

  _removeAt(outlet, pos) {
    var child = outlet[pos];
    outlet.splice(pos, 1);
    this._detach(child);
  }

  _attach(child) {
    child.parent = this;
    if (this._context && child._owner !== this._owner && child._ref) {
      this._context.foreignRefs[child._ref] = child;
    }
  }

  _detach(child) {
    child.parent = null;
    if (this._context && child._owner !== this._owner && child._ref) {
      delete this.context.foreignRefs[child._ref];
    }
  }

  _mergeHTMLConfig(other) {
    if (other.classNames) {
      if (!this.classNames) {
        this.classNames = [];
      }
      this.classNames = this.classNames.concat(other.classNames);
    }
    if (other.attributes) {
      if (!this.attributes) {
        this.attributes = {};
      }
      Object.assign(this.attributes, other.attributes);
    }
    if (other.htmlProps) {
      if (!this.htmlProps) {
        this.htmlProps = {};
      }
      Object.assign(this.htmlProps, other.htmlProps);
    }
    if (other.style) {
      if (!this.style) {
        this.style = {};
      }
      Object.assign(this.style, other.style);
    }
    if (other.eventListeners) {
      if (!this.eventListeners) {
        this.eventListeners = [];
      }
      this.eventListeners = this.eventListeners.concat(other.eventListeners);
    }
  }
}

VirtualHTMLElement.prototype._isVirtualHTMLElement = true;



class VirtualComponent extends VirtualHTMLElement {

  constructor(ComponentClass, props) {
    super();

    props = props || {};

    this.ComponentClass = ComponentClass;
    this.props = props;
    if (!props.children) {
      props.children = [];
    }
    this.children = props.children;
  }

  get _isVirtualComponent() { return true; }

  getComponent() {
    return this._comp
  }

  
  
  getChildren() {
    return this.props.children
  }

  getNodeType() {
    return 'component'
  }

  outlet(name) {
    return new Outlet(this, name)
  }

  _attach(child) {
    child._preliminaryParent = this;
  }

  _detach(child) {
    child._preliminaryParent = null;
  }

  _copyHTMLConfig() {
    return {
      classNames: clone(this.classNames),
      attributes: clone(this.attributes),
      htmlProps: clone(this.htmlProps),
      style: clone(this.style),
      eventListeners: clone(this.eventListeners)
    }
  }
}

class Outlet {
  constructor(virtualEl, name) {
    this.virtualEl = virtualEl;
    this.name = name;
    Object.freeze(this);
  }

  _getOutlet() {
    var outlet = this.virtualEl.props[this.name];
    if (!outlet) {
      outlet = [];
      this.virtualEl.props[this.name] = outlet;
    }
    return outlet
  }

  append() {
    var outlet = this._getOutlet();
    this.virtualEl._append(outlet, arguments);
    return this
  }

  empty() {
    var arr = this.virtualEl.props[this.name];
    arr.forEach(function(el) {
      this._detach(el);
    }.bind(this));
    arr.splice(0, arr.length);
    return this
  }
}


class VirtualTextNode extends VirtualElement {

  constructor(text) {
    super();
    this.text = text;
  }

  get _isVirtualTextNode() { return true; }
}

VirtualElement.Component = VirtualComponent;
VirtualElement.TextNode = VirtualTextNode;


VirtualElement.createElement = function() {
  var content;
  var _first = arguments[0];
  var _second = arguments[1];
  var type;
  if (isString$1(_first)) {
    type = "element";
  } else if (isFunction$1(_first) && _first.prototype._isComponent) {
    type = "component";
  } else if (isNil(_first)) {
    throw new Error('$$(null): provided argument was null or undefined.')
  } else {
    throw new Error('Illegal usage of $$()')
  }
  
  var props = {};
  var classNames, ref;
  var eventHandlers = [];
  for(var key in _second) {
    if (!_second.hasOwnProperty(key)) continue
    var val = _second[key];
    switch(key) {
      case 'class':
        classNames = val;
        break
      case 'ref':
        ref = val;
        break
      default:
        props[key] = val;
    }
  }
  if (type === 'element') {
    content = new VirtualHTMLElement(_first);
    
    
    content.attr(props);
  } else {
    content = new VirtualComponent(_first, props);
  }
  
  
  content._owner = this.owner;
  if (classNames) {
    content.addClass(classNames);
  }
  if (ref) {
    content.ref(ref);
  }
  eventHandlers.forEach(function(h) {
    if (isFunction$1(h.handler)) {
      content.on(h.name, h.handler);
    } else if (isPlainObject$1(h.handler)) {
      var params = h.handler;
      content.on(h.name, params.handler, params.context, params);
    } else {
      throw new Error('Illegal arguments for $$(_,{ on'+h.name+'})')
    }
  });
  
  
  if (arguments.length > 2) {
    content.append(flattenOften(Array.prototype.slice.call(arguments, 2), 3));
  }
  return content
};

class RenderingEngine {

  constructor(options = {}) {
    this.elementFactory = options.elementFactory || DefaultDOMElement.createDocument('html');
  }

  _render(comp, oldProps, oldState) {
    
    var vel = _createWrappingVirtualComponent(comp);
    var state = new RenderingEngine.State(this.elementFactory);
    if (oldProps) {
      state.setOldProps(vel, oldProps);
    }
    if (oldState) {
      state.setOldState(vel, oldState);
    }
    try {
      
      
      
      _capture(state, vel, 'forceCapture');
      

      
      
      _render(state, vel);
      

      _triggerUpdate(state, vel);

    } finally {
      state.dispose();
    }
    
  }

  
  _renderChild(comp, vel) {
    
    
    var state = new RenderingEngine.State(this.elementFactory);
    vel.parent = { _comp: comp };
    try {
      _capture(state, vel);
      _render(state, vel);
      return vel._comp
    } finally {
      state.dispose();
    }
  }
}


function _create(state, vel) {
  var comp = vel._comp;
  console.assert(!comp, "Component instance should not exist when this method is used.");
  var parent = vel.parent._comp;
  
  if (!parent) {
    parent = _create(state, vel.parent);
  }
  if (vel._isVirtualComponent) {
    console.assert(parent, "A Component should have a parent.");
    comp = new vel.ComponentClass(parent, vel.props);
    
    vel.props = comp.props;
    comp.__htmlConfig__ = vel._copyHTMLConfig();
  } else if (vel._isVirtualHTMLElement) {
    comp = new Component.Element(parent, vel);
  } else if (vel._isVirtualTextNode) {
    comp = new Component.TextNode(parent, vel);
  }
  if (vel._ref) {
    comp._ref = vel._ref;
  }
  if (vel._owner) {
    comp._owner = vel._owner._comp;
  }
  vel._comp = comp;
  return comp
}

function _capture(state, vel, forceCapture) {
  if (state.isCaptured(vel)) {
    return vel
  }
  
  var comp = vel._comp;
  if (!comp) {
    comp = _create(state, vel);
    state.setNew(vel);
  }
  if (vel._isVirtualComponent) {
    var needRerender;
    
    
    
    if (forceCapture) {
      needRerender = true;
    } else {
      
      needRerender = !comp.el || comp.shouldRerender(vel.props, comp.state);
      comp.__htmlConfig__ = vel._copyHTMLConfig();
      state.setOldProps(vel, comp.props);
      state.setOldState(vel, comp.state);
      
      comp._setProps(vel.props);
      if (!state.isNew(vel)) {
        state.setUpdated(vel);
      }
    }
    if (needRerender) {
      var context = new CaptureContext(vel);
      var content = comp.render(context.$$);
      if (!content || !content._isVirtualHTMLElement) {
        throw new Error("Component.render must return VirtualHTMLElement")
      }

      if (comp.__htmlConfig__) {
        content._mergeHTMLConfig(comp.__htmlConfig__);
      }
      content._comp = comp;
      vel._content = content;
      if (!state.isNew(vel) && comp.isMounted()) {
        state.setUpdated(vel);
      }
      
      _prepareVirtualComponent(state, comp, content);
      
      
      if (substanceGlobals.DEBUG_RENDERING) {
        
        
        
        
        var stack = content.children.slice(0);
        while (stack.length) {
          var child = stack.shift();
          if (state.isCaptured(child)) continue
          
          if (child._isVirtualComponent) continue
          if (!child._comp) {
            _create(state, child);
          }
          if (child._isVirtualHTMLElement && child.children.length > 0) {
            stack = stack.concat(child.children);
          }
          state.setCaptured(child);
        }
        state.setCaptured(content);
        
        
        var descendingContext = new DescendingContext(state, context);
        while (descendingContext.hasPendingCaptures()) {
          descendingContext.reset();
          comp.render(descendingContext.$$);
        }
      } else {
        
        
        _capture(state, vel._content);
      }
    } else {
      state.setSkipped(vel);
    }
  } else if (vel._isVirtualHTMLElement) {
    for (var i = 0; i < vel.children.length; i++) {
      _capture(state, vel.children[i]);
    }
  }
  state.setCaptured(vel);
  return vel
}

function _render(state, vel) {
  if (state.isSkipped(vel)) return
  

  
  
  
  
  
  

  let comp = vel._comp;
  console.assert(comp && comp._isComponent, "A captured VirtualElement must have a component instance attached.");

  
  if (vel._isVirtualComponent) {
    _render(state, vel._content);

    
    const context = vel._content._context;
    let refs = {};
    let foreignRefs = {};
    forEach(context.refs, (vel, ref) => {
      refs[ref] = vel._comp;
    });
    forEach(context.foreignRefs, (vel, ref) => {
      foreignRefs[ref] = vel._comp;
    });
    comp.refs = refs;
    comp.__foreignRefs__ = foreignRefs;
    return
  }

  
  if (!comp.el) {
    comp.el = _createElement(state, vel);
    comp.el._comp = comp;
  }
  _updateElement(comp, vel);

  
  if (vel._isVirtualHTMLElement && !vel.hasInnerHTML()) {
    var newChildren = vel.children;
    var oldComp, virtualComp, newComp;
    var pos1 = 0; var pos2 = 0;

    
    
    
    var oldChildren = [];
    comp.el.getChildNodes().forEach(function(node) {
      var childComp = node._comp;

      
      
      
      

      
      if (!childComp || state.isRelocated(childComp)) {
        comp.el.removeChild(node);
      } else {
        oldChildren.push(childComp);
      }
    });

    while(pos1 < oldChildren.length || pos2 < newChildren.length) {
      
      
      
      
      do {
        oldComp = oldChildren[pos1++];
      } while (oldComp && (state.isDetached(oldComp)))

      virtualComp = newChildren[pos2++];
      
      if (oldComp && !virtualComp) {
        while (oldComp) {
          _removeChild(state, comp, oldComp);
          oldComp = oldChildren[pos1++];
        }
        break
      }

      
      if (oldComp && oldComp.el.isTextNode() &&
          virtualComp && virtualComp._isVirtualTextNode &&
          oldComp.el.textContent === virtualComp.text ) {
        continue
      }

      
      if (!state.isRendered(virtualComp)) {
        _render(state, virtualComp);
      }

      newComp = virtualComp._comp;

      
      
      if (state.isRelocated(newComp)) {
        newComp._setParent(comp);
      }

      console.assert(newComp, 'Component instance should now be available.');

      
      if (virtualComp && !oldComp) {
        _appendChild(state, comp, newComp);
        continue
      }
      
      else if (state.isMapped(virtualComp)) {
        
        if (newComp === oldComp) {
          
        } else if (state.isMapped(oldComp)) {
          
          state.setDetached(oldComp);
          _removeChild(state, comp, oldComp);
          pos2--;
        }
        
        else {
          _removeChild(state, comp, oldComp);
          pos2--;
        }
      }
      else if (state.isMapped(oldComp)) {
        _insertChildBefore(state, comp, newComp, oldComp);
        pos1--;
      }
      else {
        
        
        
        
        _replaceChild(state, comp, oldComp, newComp);
      }
    }
  }

  state.setRendered(vel);
}

function _triggerUpdate(state, vel) {
  if (vel._isVirtualComponent) {
    if (!state.isSkipped(vel)) {
      vel._content.children.forEach(_triggerUpdate.bind(null, state));
    }
    if (state.isUpdated(vel)) {
      vel._comp.didUpdate(state.getOldProps(vel), state.getOldState(vel));
    }
  } else if (vel._isVirtualHTMLElement) {
    vel.children.forEach(_triggerUpdate.bind(null, state));
  }
}

function _appendChild(state, parent, child) {
  parent.el.appendChild(child.el);
  _triggerDidMount(state, parent, child);
}

function _replaceChild(state, parent, oldChild, newChild) {
  parent.el.replaceChild(oldChild.el, newChild.el);
  if (!state.isDetached(oldChild)) {
    oldChild.triggerDispose();
  }
  _triggerDidMount(state, parent, newChild);
}

function _insertChildBefore(state, parent, child, before) {
  parent.el.insertBefore(child.el, before.el);
  _triggerDidMount(state, parent, child);
}

function _removeChild(state, parent, child) {
  parent.el.removeChild(child.el);
  if (!state.isDetached(child)) {
    child.triggerDispose();
  }
}

function _triggerDidMount(state, parent, child) {
  if (!state.isDetached(child) &&
      parent.isMounted() && !child.isMounted()) {
    child.triggerDidMount(true);
  }
}


function _prepareVirtualComponent(state, comp, vc) {
  var newRefs = {};
  var foreignRefs = {};
  
  
  
  
  if (vc._context) {
    newRefs = vc._context.refs;
    foreignRefs = vc._context.foreignRefs;
  }
  var oldRefs = comp.refs;
  var oldForeignRefs = comp.__foreignRefs__;
  
  forEach(newRefs, function(vc, ref) {
    var comp = oldRefs[ref];
    if (comp) _mapComponents(state, comp, vc);
  });
  forEach(foreignRefs, function(vc, ref) {
    var comp = oldForeignRefs[ref];
    if (comp) _mapComponents(state, comp, vc);
  });
}



function _mapComponents(state, comp, vc) {
  if (!comp && !vc) return true
  if (!comp || !vc) return false
  
  
  
  
  
  if (state.isMapped(vc) || state.isMapped(comp)) {
    return vc._comp === comp
  }
  if (vc._comp) {
    if (vc._comp === comp) {
      state.setMapped(vc);
      state.setMapped(comp);
      return true
    } else {
      return false
    }
  }
  if (!_isOfSameType(comp, vc)) {
    return false
  }

  vc._comp = comp;
  state.setMapped(vc);
  state.setMapped(comp);

  var canMapParent;
  var parent = comp.getParent();
  if (vc.parent) {
    canMapParent = _mapComponents(state, parent, vc.parent);
  }
  
  
  
  
  else if (vc._preliminaryParent) {
    while (parent && parent._isElementComponent) {
      parent = parent.getParent();
    }
    canMapParent = _mapComponents(state, parent, vc._preliminaryParent);
  }
  if (!canMapParent) {
    state.setRelocated(vc);
    state.setRelocated(comp);
  }
  return canMapParent
}

function _isOfSameType(comp, vc) {
  return (
    (comp._isElementComponent && vc._isVirtualHTMLElement) ||
    (comp._isComponent && vc._isVirtualComponent && comp.constructor === vc.ComponentClass) ||
    (comp._isTextNodeComponent && vc._isVirtualTextNode)
  )
}

function _createElement(state, vel) {
  var el;
  if (vel._isVirtualTextNode) {
    el = state.elementFactory.createTextNode(vel.text);
  } else {
    el = state.elementFactory.createElement(vel.tagName);
  }
  return el
}

function _updateElement(comp, vel) {
  if (comp._isTextNodeComponent) {
    comp.setTextContent(vel.text);
    return
  }
  var el = comp.el;
  console.assert(el, "Component's element should exist at this point.");
  var tagName = el.getTagName();
  if (vel.tagName.toLowerCase() !== tagName) {
    el.setTagName(vel.tagName);
  }
  _updateHash({
    oldHash: el.getAttributes(),
    newHash: vel.getAttributes(),
    update: function(key, val) {
      el.setAttribute(key, val);
    },
    remove: function(key) {
      el.removeAttribute(key);
    }
  });
  _updateHash({
    oldHash: el.htmlProps,
    newHash: vel.htmlProps,
    update: function(key, val) {
      el.setProperty(key, val);
    },
    remove: function(key) {
      el.removeProperty(key);
    }
  });
  _updateListeners({
    el: el,
    oldListeners: el.getEventListeners(),
    newListeners: vel.getEventListeners()
  });

  
  if (vel.hasInnerHTML()) {
    if (!el._hasInnerHTML) {
      el.empty();
      el.setInnerHTML(vel.getInnerHTML());
    } else {
      var oldInnerHTML = el.getInnerHTML();
      var newInnerHTML = vel.getInnerHTML();
      if (oldInnerHTML !== newInnerHTML) {
        el.setInnerHTML(newInnerHTML);
      }
    }
    el._hasInnerHTML = true;
  }
}

function _updateHash(args) {
  const newHash = args.newHash;
  const oldHash = args.oldHash || {};
  const update = args.update;
  const remove = args.remove;
  let updatedKeys = {};
  for (let key in newHash) {
    if (newHash.hasOwnProperty(key)) {
      var oldVal = oldHash[key];
      var newVal = newHash[key];
      updatedKeys[key] = true;
      if (oldVal !== newVal) {
        update(key, newVal);
      }
    }
  }
  
  
  if (isFunction$1(oldHash.keys) && oldHash.size > 0) {
    let keys$$1 = Array.from(oldHash.keys());
    keys$$1.forEach((key) => {
      if (!updatedKeys[key]) {
        remove(key);
      }
    });
  } else {
    for (let key in oldHash) {
      if (oldHash.hasOwnProperty(key) && !updatedKeys[key]) {
        remove(key);
      }
    }
  }
}

function _updateListeners(args) {
  var el = args.el;
  
  
  
  var newListeners = args.newListeners || [];
  el.removeAllEventListeners();
  for (var i=0; i<newListeners.length;i++) {
    el.addEventListener(newListeners[i]);
  }
}




class DescendingContext {
  constructor(state, captureContext) {
    this.state = state;
    this.owner = captureContext.owner;
    this.refs = {};
    this.foreignRefs = {};
    this.elements = captureContext.elements;
    this.pos = 0;
    this.updates = captureContext.components.length;
    this.remaining = this.updates;

    this.$$ = this._createComponent.bind(this);
  }

  _createComponent() {
    var state = this.state;
    var vel = this.elements[this.pos++];
    
    
    
    if (!state.isCaptured(vel) && vel._isVirtualComponent &&
         vel.parent && state.isCaptured(vel.parent)) {
      _capture(state, vel);
      this.updates++;
      this.remaining--;
    }
    
    
    
    
    vel = VirtualElement.createElement.apply(this, arguments);
    
    vel._context = this;
    vel._owner = this.owner;
    
    
    vel._attach = function() {};
    vel._detach = function() {};
    return vel
  }

  hasPendingCaptures() {
    return this.updates > 0 && this.remaining > 0
  }

  reset() {
    this.pos = 0;
    this.updates = 0;
    this.refs = {};
  }

  _ancestorsReady(vel) {
    while (vel) {
      if (this.state.isCaptured(vel) ||
          
          vel === this.owner || vel === this.owner._content) {
        return true
      }
      vel = vel.parent;
    }
    return false
  }


}

RenderingEngine._internal = {
  _capture: _capture,
  _wrap: _createWrappingVirtualComponent,
};

class CaptureContext {
  constructor(owner) {
    this.owner = owner;
    this.refs = {};
    this.foreignRefs = {};
    this.elements = [];
    this.components = [];
    this.$$ = this._createComponent.bind(this);
    this.$$.capturing = true;
  }

  _createComponent() {
    var vel = VirtualElement.createElement.apply(this, arguments);
    vel._context = this;
    vel._owner = this.owner;
    if (vel._isVirtualComponent) {
      
      this.components.push(vel);
    }
    this.elements.push(vel);
    return vel
  }
}


function _createWrappingVirtualComponent(comp) {
  var vel = new VirtualElement.Component(comp.constructor);
  vel._comp = comp;
  if (comp.__htmlConfig__) {
    vel._mergeHTMLConfig(comp.__htmlConfig__);
  }
  return vel
}

RenderingEngine.createContext = function(comp) {
  var vel = _createWrappingVirtualComponent(comp);
  return new CaptureContext(vel)
};


class RenderingState {

  constructor(elementFactory) {
    this.elementFactory = elementFactory;
    this.poluted = [];
    this.id = "__"+uuid();
  }

  dispose() {
    var id = this.id;
    this.poluted.forEach(function(obj) {
      delete obj[id];
    });
  }

  set(obj, key, val) {
    var info = obj[this.id];
    if (!info) {
      info = {};
      obj[this.id] = info;
      this.poluted.push(obj);
    }
    info[key] = val;
  }

  get(obj, key) {
    var info = obj[this.id];
    if (info) {
      return info[key]
    }
  }

  setMapped(c) {
    this.set(c, 'mapped', true);
  }


  isMapped(c) {
    return Boolean(this.get(c, 'mapped'))
  }

  
  
  setRelocated(c) {
    this.set(c, 'relocated', true);
  }

  isRelocated(c) {
    return Boolean(this.get(c, 'relocated'))
  }

  setDetached(c) {
    this.set(c, 'detached', true);
  }

  isDetached(c) {
    return Boolean(this.get(c, 'detached'))
  }

  setCaptured(vc) {
    this.set(vc, 'captured', true);
  }

  isCaptured(vc) {
    return Boolean(this.get(vc, 'captured'))
  }

  setNew(vc) {
    this.set(vc, 'created', true);
  }

  isNew(vc) {
    return Boolean(this.get(vc, 'created'))
  }

  setUpdated(vc) {
    this.set(vc, 'updated', true);
  }

  isUpdated(vc) {
    return Boolean(this.get(vc, 'updated'))
  }

  setSkipped(vc) {
    this.set(vc, 'skipped', true);
  }

  isSkipped(vc) {
    return Boolean(this.get(vc, 'skipped'))
  }

  setRendered(vc) {
    this.set(vc, 'rendered', true);
  }

  isRendered(vc) {
    return Boolean(this.get(vc, 'rendered'))
  }

  setOldProps(vc, oldProps) {
    this.set(vc, 'oldProps', oldProps);
  }

  getOldProps(vc) {
    return this.get(vc, 'oldProps')
  }

  setOldState(vc, oldState) {
    this.set(vc, 'oldState', oldState);
  }

  getOldState(vc) {
    return this.get(vc, 'oldState')
  }
}

RenderingEngine.State = RenderingState;

class Component extends EventEmitter {
  
  constructor(parent, props = {}, options = {}) {
    super();

    
    
    
    
    

    this.parent = (parent && parent._isComponent) ? parent : null;

    
    this.el = options.el;

    
    
    let context = options.context ? options.context : this._getContext() || {};
    this.context = context;
    Object.freeze(this.context);

    
    
    
    this.renderingEngine = (parent && parent.renderingEngine) || context.renderingEngine || options.renderingEngine || new RenderingEngine();

    
    
    if (this._SKIP_COMPONENT_INIT) return

    this.__id__ = uuid();

    
    this.refs = {};
    
    
    
    this.__foreignRefs__ = {};

    
    this._actionHandlers = {};

    
    this.props = props;
    Object.freeze(this.props);

    
    this.state = this.getInitialState() || {};
    Object.freeze(this.state);
  }

  getId() {
    return this.__id__
  }

  setId() {
    throw new Error("'id' is readonly")
  }

  
  getChildContext() {
    return this.childContext || {}
  }

  
  getInitialState() {
    return {}
  }

  
  getParent() {
    return this.parent
  }

  
  getRoot() {
    var comp = this;
    var parent = comp;
    while (parent) {
      comp = parent;
      parent = comp.getParent();
    }
    return comp
  }

  getNativeElement() {
    return this.el.getNativeElement()
  }

  
  getLabel(name) {
    let labelProvider = this.context.labelProvider;
    if (!labelProvider) throw new Error('Missing labelProvider.')
    return labelProvider.getLabel(name)
  }

  
  getComponent(componentName, maybe) {
    let componentRegistry = this.getComponentRegistry();
    if (!componentRegistry) throw new Error('Missing componentRegistry.')
    const ComponentClass = componentRegistry.get(componentName);
    if (!maybe && !ComponentClass) {
      throw new Error('No Component registered with name ' + componentName)
    }
    return ComponentClass
  }

  getComponentRegistry() {
    return this.props.componentRegistry || this.context.componentRegistry
  }

  getFlow() {
    return this.context.flow
  }

  
  render($$) {
    
    return $$('div')
  }

  
  mount(el) {
    if (!el) {
      throw new Error('Element is required.')
    }
    el = DefaultDOMElement.wrap(el);
    
    this.el = null;
    this.renderingEngine = new RenderingEngine({ elementFactory: el.getOwnerDocument() });
    this._render();
    el.appendChild(this.el);
    if (el.isInDocument()) {
      this.triggerDidMount(true);
    }
    return this
  }

  
  shouldRerender(newProps, newState) { 
    return true
  }

  
  rerender() {
    this._rerender(this.props, this.state);
  }

  _rerender(oldProps, oldState) {
    this._render(oldProps, oldState);
    
    if (!this.isMounted()) {
      this.didUpdate(oldProps, oldState);
    }
  }

  _render(oldProps, oldState) {
    if (this.__isRendering__) {
      throw new Error('Component is rendering already.')
    }
    this.__isRendering__ = true;
    try {
      this.renderingEngine._render(this, oldProps, oldState);
    } finally {
      delete this.__isRendering__;
    }
  }

  
  triggerDidMount() {
    
    
    

    
    
    if (!this.__isMounted__) {
      this.__isMounted__ = true;
      this.didMount();
    }
    
    this.getChildren().forEach(function(child) {
      
      
      child.triggerDidMount(true);
    });
  }

  
  didMount() {}

  
  didUpdate() {}

  
  isMounted() {
    return this.__isMounted__
  }

  
  triggerDispose() {
    this.getChildren().forEach(function(child) {
      child.triggerDispose();
    });
    this.dispose();
    this.__isMounted__ = false;
  }

  
  dispose() {}

  
  _setParent(newParent) {
    this.parent = newParent;
    this.context = this._getContext() || {};
    Object.freeze(this.context);
  }

  
  send(action) {
    var comp = this;
    while(comp) {
      if (comp._actionHandlers && comp._actionHandlers[action]) {
        comp._actionHandlers[action].apply(comp, Array.prototype.slice.call(arguments, 1));
        return true
      }
      comp = comp.getParent();
    }
    console.warn('Action', action, 'was not handled.');
    return false
  }

  
  handleActions(actionHandlers) {
    forEach(actionHandlers, function(method, actionName) {
      this.handleAction(actionName, method);
    }.bind(this));
    return this
  }

  
  handleAction(name, handler) {
    if (!name || !handler || !isFunction$1(handler)) {
      throw new Error('Illegal arguments.')
    }
    handler = handler.bind(this);
    this._actionHandlers[name] = handler;
  }

  
  getState() {
    return this.state
  }

  
  setState(newState) {
    var oldProps = this.props;
    var oldState = this.state;
    
    
    var needRerender = !this.__isSettingProps__ &&
      this.shouldRerender(this.getProps(), newState);
    
    this.willUpdateState(newState);
    this.state = newState || {};
    Object.freeze(this.state);
    if (needRerender) {
      this._rerender(oldProps, oldState);
    } else if (!this.__isSettingProps__) {
      this.didUpdate(oldProps, oldState);
    }
  }

  
  extendState(newState) {
    newState = extend({}, this.state, newState);
    this.setState(newState);
  }

  
  willUpdateState(newState) { 
  }

  
  getProps() {
    return this.props
  }

  
  setProps(newProps) {
    var oldProps = this.props;
    var oldState = this.state;
    var needRerender = this.shouldRerender(newProps, this.state);
    this._setProps(newProps);
    if (needRerender) {
      this._rerender(oldProps, oldState);
    } else {
      this.didUpdate(oldProps, oldState);
    }
  }

  _setProps(newProps) {
    newProps = newProps || {};
    
    this.__isSettingProps__ = true;
    try {
      this.willReceiveProps(newProps);
      this.props = newProps || {};
      Object.freeze(newProps);
    } finally {
      delete this.__isSettingProps__;
    }
  }

  
  extendProps(updatedProps) {
    var newProps = extend({}, this.props, updatedProps);
    this.setProps(newProps);
  }

  
  willReceiveProps(newProps) { 
  }

  getTextContent() {
    if (this.el) {
      return this.el.textContent
    }
  }

  get textContent() {
    return this.getTextContent()
  }

  getInnerHTML() {
    if (this.el) {
      return this.el.getInnerHTML()
    }
  }

  get innerHTML() {
    return this.getInnerHTML()
  }

  getOuterHTML() {
    if (this.el) {
      return this.el.getOuterHTML()
    }
  }

  get outerHTML() {
    return this.getOuterHTML()
  }

  getAttribute(name) {
    if (this.el) {
      return this.el.getAttribute(name)
    }
  }

  setAttribute(name, val) {
    if (this.el) {
      this.el.setAttribute(name, val);
    }
    return this
  }

  getProperty(name) {
    if (this.el) {
      return this.el.getProperty(name)
    }
  }

  setProperty(name, val) {
    if (this.el) {
      this.el.setProperty(name, val);
    }
    return this
  }

  hasClass(name) {
    if (this.el) {
      return this.el.hasClass(name)
    }
  }

  addClass(name) {
    if (this.el) {
      this.el.addClass(name);
    }
    return this
  }

  removeClass(name) {
    if (this.el) {
      this.el.removeClass(name);
    }
    return this
  }

  getStyle(name) {
    if (this.el) {
      return this.el.getStyle(name)
    }
  }

  setStyle(name, val) {
    if (this.el) {
      return this.el.setStyle(name, val)
    }
    return this
  }

  getValue() {
    if (this.el) {
      return this.el.getValue()
    }
  }

  setValue(val) {
    if (this.el) {
      this.el.setValue(val);
    }
    return this
  }

  getChildCount() {
    if (!this.el) return 0
    return this.el.getChildCount()
  }

  get childNodes() {
    return this.getChildNodes()
  }

  getChildNodes() {
    if (!this.el) return []
    var childNodes = this.el.getChildNodes();
    childNodes = childNodes.map(_unwrapComp).filter(Boolean);
    return childNodes
  }

  getChildren() {
    if (!this.el) return []
    var children = this.el.getChildren();
    children = children.map(_unwrapComp).filter(Boolean);
    return children
  }

  getChildAt(pos) {
    var node = this.el.getChildAt(pos);
    return _unwrapCompStrict(node)
  }

  find(cssSelector) {
    var el = this.el.find(cssSelector);
    return _unwrapComp(el)
  }

  findAll(cssSelector) {
    var els = this.el.findAll(cssSelector);
    return els.map(_unwrapComp).filter(Boolean)
  }

  appendChild(child) {
    this.insertAt(this.getChildCount(), child);
  }

  insertAt(pos, childEl) {
    if (isString$1(childEl)) {
      childEl = new VirtualElement.TextNode(childEl);
    }
    if (!childEl._isVirtualElement) {
      throw new Error('Invalid argument: "child" must be a VirtualElement.')
    }
    var child = this.renderingEngine._renderChild(this, childEl);
    this.el.insertAt(pos, child.el);
    _mountChild(this, child);
  }

  removeAt(pos) {
    var childEl = this.el.getChildAt(pos);
    if (childEl) {
      var child = _unwrapCompStrict(childEl);
      _disposeChild(child);
      this.el.removeAt(pos);
    }
  }

  removeChild(child) {
    if (!child || !child._isComponent) {
      throw new Error('removeChild(): Illegal arguments. Expecting a Component instance.')
    }
    
    _disposeChild(child);
    this.el.removeChild(child.el);
  }

  replaceChild(oldChild, newChild) {
    if (!newChild || !oldChild ||
        !newChild._isComponent || !oldChild._isComponent) {
      throw new Error('replaceChild(): Illegal arguments. Expecting BrowserDOMElement instances.')
    }
    
    _disposeChild(oldChild);
    this.el.replaceChild(newChild.el, oldChild.el);
    if (this.isMounted()) {
      newChild.triggerDidMount(true);
    }
  }

  
  
  
  
  
  
  empty() {
    this._clear();
    return this
  }

  _clear() {
    let el = this.el;
    if (el) {
      this.getChildNodes().forEach(function(child) {
        _disposeChild(child);
      });
      el.empty();
    }
    this.refs = {};
    this.__foreignRefs__ = {};
  }

  remove() {
    _disposeChild(this);
    this.el.remove();
  }

  addEventListener() {
    throw new Error("Not supported.")
  }

  removeEventListener() {
    throw new Error("Not supported.")
  }

  insertBefore() {
    throw new Error("Not supported.")
  }

  click() {
    if (this.el) {
      this.el.click();
    }
  }

  getComponentPath() {
    let path = [];
    let comp = this;
    while (comp) {
      path.unshift(comp);
      comp = comp.getParent();
    }
    return path
  }

  _getContext() {
    var context = {};
    var parent = this.getParent();
    if (parent) {
      context = extend(context, parent.context);
      if (parent.getChildContext) {
        return extend(context, parent.getChildContext())
      }
    }
    return context
  }

}

Component.prototype._isComponent = true;

Component.prototype.attr = DOMElement.prototype.attr;

Component.prototype.htmlProp = DOMElement.prototype.htmlProp;

Component.prototype.val = DOMElement.prototype.val;

Component.prototype.css = DOMElement.prototype.css;

Component.prototype.text = DOMElement.prototype.text;

Component.prototype.append = DOMElement.prototype.append;

Component.unwrap = _unwrapComp;

Component.render = function(props) {
  props = props || {};
  var ComponentClass = this;
  var comp = new ComponentClass(null, props);
  comp._render();
  return comp
};

Component.mount = function(props, el) {
  if (arguments.length === 1) {
    el = props;
    props = {};
  }
  if (!el) throw new Error("'el' is required.")
  if (isString$1(el)) {
    var selector = el;
    if (platform.inBrowser) {
      el = window.document.querySelector(selector);
    } else {
      throw new Error("This selector is not supported on server side.")
    }
  }
  el = new DefaultDOMElement.wrap(el);
  const ComponentClass = this;
  let comp = new ComponentClass(null, props);
  comp.mount(el);
  return comp
};

Component.getComponentForDOMElement = function(el) {
  return _unwrapComp(el)
};

Component.unwrapDOMElement = function(el) {
  console.warn('DEPRECATED: Use Component.getComponentForDOMElement');
  return Component.getComponentForDOMElement(el)
};

Component.getComponentFromNativeElement = function(nativeEl) {
  
  
  
  return _unwrapComp(DefaultDOMElement.wrap(nativeEl))
};


function _disposeChild(child) {
  child.triggerDispose();
  if (child._owner && child._ref) {
    console.assert(child._owner.refs[child._ref] === child, "Owner's ref should point to this child instance.");
    delete child._owner.refs[child._ref];
  }
}


function _mountChild(parent, child) {
  if (parent.isMounted()) {
    child.triggerDidMount(true);
  }
  if (child._owner && child._ref) {
    child._owner.refs[child._ref] = child;
  }
}


function _unwrapComp(el) {
  if (el) {
    if (!el._isDOMElement) el = DefaultDOMElement.unwrap(el);
    if (el) return el._comp
  }
}

function _unwrapCompStrict(el) {
  let comp = _unwrapComp(el);
  if (!comp) throw new Error("Expecting a back-link to the component instance.")
  return comp
}


class ElementComponent extends Component {

  constructor(parent) {
    super(parent);
  }

}

ElementComponent.prototype._isElementComponent = true;
ElementComponent.prototype._SKIP_COMPONENT_INIT = true;

class TextNodeComponent extends Component {

  constructor(parent) {
    super(parent);
  }

  setTextContent(text) {
    if (!this.el) {
      throw new Error('Component must be rendered first.')
    }
    if (this.el.textContent !== text) {
      this.el.textContent = text;
    }
  }

  getChildNodes() {
    return []
  }

  getChildren() {
    return []
  }

}

TextNodeComponent.prototype._isTextNodeComponent = true;
TextNodeComponent.prototype._SKIP_COMPONENT_INIT = true;

Component.Element = ElementComponent;
Component.TextNode = TextNodeComponent;

const INLINENODES = ['a','b','big','i','small','tt','abbr','acronym','cite','code','dfn','em','kbd','strong','samp','time','var','bdo','br','img','map','object','q','script','span','sub','sup','button','input','label','select','textarea'].reduce((m,n)=>{m[n]=true;return m}, {});


class Router extends EventEmitter {
  constructor(...args) {
    super(...args);
    this.__isStarted__ = false;
  }

  
  start() {
    let window = DefaultDOMElement.getBrowserWindow();
    window.on('hashchange', this._onHashChange, this);
    this.__isStarted__ = true;
  }

  
  readRoute() {
    if (!this.__isStarted__) this.start();
    return this.parseRoute(this.getRouteString())
  }

  
  writeRoute(route, opts) {
    opts = opts || {};
    let routeString = this.stringifyRoute(route);
    if (!routeString) {
      this.clearRoute(opts);
    } else {
      this._writeRoute(routeString, opts);
    }
  }

  dispose() {
    let window = DefaultDOMElement.getBrowserWindow();
    window.off(this);
  }

  
  parseRoute(routeString) {
    return Router.routeStringToObject(routeString)
  }

  
  stringifyRoute(route) {
    return Router.objectToRouteString(route)
  }

  getRouteString() {
    return window.location.hash.slice(1)
  }

  _writeRoute(route, opts) {
    this.__isSaving__ = true;
    try {
      if (opts.replace) {
        window.history.replaceState({} , '', '#'+route);
      } else {
        window.history.pushState({} , '', '#'+route);
      }
    } finally {
      this.__isSaving__ = false;
    }
  }

  clearRoute(opts) {
    this._writeRoute('', opts);
  }

  _onHashChange() {
    
    if (this.__isSaving__) {
      return
    }
    if (this.__isLoading__) {
      console.error('FIXME: router is currently applying a route.');
      return
    }
    this.__isLoading__ = true;
    try {
      let routeString = this.getRouteString();
      let route = this.parseRoute(routeString);
      this.emit('route:changed', route);
    } finally {
      this.__isLoading__ = false;
    }
  }

}

Router.objectToRouteString = function(obj) {
  let route = [];
  forEach(obj, function(val, key) {
    route.push(key+'='+val);
  });
  return route.join(',')
};

Router.routeStringToObject = function(routeStr) {
  let obj = {};
  
  if (!routeStr) return obj
  let params = routeStr.split(',');
  params.forEach(function(param) {
    let tuple = param.split('=');
    if (tuple.length !== 2) {
      throw new Error('Illegal route.')
    }
    obj[tuple[0].trim()] = tuple[1].trim();
  });
  return obj
};

function nameWithoutNS$1(name) {
  const idx = name.indexOf(':');
  if (idx > 0) {
    return name.slice(idx+1)
  } else {
    return name
  }
}

class Adapter extends domUtils.DomUtils {

  
  isTag() {
    return true
  }

  getChildren(elem){
    return elem.getChildren() || []
  }

  getAttributeValue(elem, name){
    return elem.getAttribute(name)
  }

  getAttributes(elem) {
    return ['id', elem.id].concat(map(elem.attributes, (val, key) => { return [key,val] }))
  }

  hasAttrib(elem, name){
    return name === 'id' || elem.attributes.hasOwnProperty(name)
  }

  getName(elem){
    return elem.type
  }

  getNameWithoutNS(elem){
    return nameWithoutNS$1(this.getName(elem))
  }

  getText(elem) {
    if (elem._elementType === 'text') {
      return elem.getText()
    }
    
    return ''
  }
}

var cssSelectAdapter = new Adapter();

const DISABLED = Object.freeze({
  disabled: true
});


function getListTagName(node) {
  
  return node.ordered ? 'ol' : 'ul'
}

class ReportRouter extends Router {
  constructor(...args) {
    super(...args);
  }

  getRoute() {
    let routerString = this.getRouteString();
    return this.routeStringToObject(routerString)
  }

  parseRoute(routeString) {
    return this.routeStringToObject(routeString)
  }

  stringifyRoute(route) {
    return this.objectToRouteString(route)
  }

  _writeRoute(route, opts) {
    this.__isSaving__ = true;
    try {
      if (opts.replace) {
        window.history.replaceState({} , '', route);
      } else {
        window.history.pushState({} , '', route);
      }
    } finally {
      this.__isSaving__ = false;
    }
  }

  objectToRouteString(obj) {
    let route = [];
    
    if(obj.section) route.push(obj.section);
    if(obj.entity) route.push(obj.entity);

    return '#' + route.join('/')
  }

  routeStringToObject(routeStr) {
    let pathParams = routeStr.split('/');

    let obj = {};
    
    if(pathParams.length === 1) {
      obj.section = pathParams[0];
    } else if(pathParams.length === 2) {
      obj.section = pathParams[0];
      obj.entity = pathParams[1];
    }

    return obj
  }
}

class Cover extends Component {
  render($$) {
    let cover = this.props.cover;
    let el = $$('section').addClass('sc-cover');

    el.append(
      this.renderHeader($$),
      this.renderImages($$),
      this.renderStartNavigation($$),
      this.renderFooter($$)
    );

    return el
  }

  renderHeader($$) {
    let cover = this.props.cover;
    let el = $$('header').addClass('se-cover-header')
      .append(
        $$('h1').append(cover.title),
        $$('p').append(cover.subtitle)
      );

    return el
  }

  renderImages($$) {
    let freq = this.props.freq || 4000;
    let images = ['false-terror.jpg', 'dadin.jpg', 'karpuk.jpg', 'attacks.jpg', 'journalists.jpg', 'treason.jpg'];

    let el = $$('div').addClass('se-background');

    images.forEach((img, idx) => {
      el.append($$('div').css({
        'background-image':'url("assets/images/' + img + '")',
        'opacity': 0
      }).ref('image-' + idx));
    });

    let animate = function(i) {
      setTimeout(() => {
        this.refs['image-' + i].css('opacity', 0);
        let next = i + 1 === images.length ? 0 : i + 1;
        this.refs['image-' + next].css('opacity', 1);
        animate(next);
      }, freq);
    }.bind(this);

    animate(0);

    setTimeout(() => {
      this.refs['image-0'].css('opacity', 1);
    }, 100);

    return el
  }

  renderStartNavigation($$) {
    let el = $$('div').addClass('se-start').append(
      'Перейти к докладу'
    ).on('click', this._onStart);

    return el
  }

  renderFooter($$) {
    let cover = this.props.cover;
    let el = $$('footer').addClass('se-cover-footer');

    let icons = $$('ul').addClass('se-icons').append(
      $$('li').append($$('a').attr({'href': 'https://twitter.com/ovdinfo', target: '_blank'}).addClass('se-icon fa-twitter')),
      $$('li').append($$('a').attr({'href': 'https://facebook.com/ovdinfo', target: '_blank'}).addClass('se-icon fa-facebook')),
      $$('li').append($$('a').attr({'href': 'https://vk.com/ovdinfo', target: '_blank'}).addClass('se-icon fa-vk')),
      $$('li').append($$('a').attr({'href': 'https://t.me/ovdinfo', target: '_blank'}).addClass('se-icon fa-telegram')),
      $$('li').append($$('a').attr({'href': 'https://ovdinfo.org/rss.xml', target: '_blank'}).addClass('se-icon fa-rss'))
    );

    let copyright = $$('ul').addClass('se-copyright').append(
      $$('li').append(
        'ОВД-Инфо: политпрессинг (reports.ovdinfo.org/pp-14-16) лицензировано в',
        $$('br'),
        'соответствии с Creative Commons Attribution 3.0 Unported License.'
      )
    );

    el.append(
      icons,
      copyright
    );

    return el
  }

  _onStart() {
    this.send('scrollTo', document.body, 'preface', 1000);
    this.send('scrollTo', document.documentElement, 'preface', 1000);
  }
}

class Preface extends Component {
  render($$) {
    let preface = this.props.preface;
    let el = $$('section').addClass('sc-preface');

    el.append(
      $$('div').addClass('se-content')
        .setInnerHTML(preface.content)
    );

    return el
  }
}

class Menu$1 extends Component {
  render($$) {
    let active = this.props.menu;
    let cover = this.props.cover;

    let personsItem = $$('li').addClass('se-menu-item').append(
      $$('span').addClass('se-label').append('Люди'),
      $$('span').addClass('se-icon fa-id-card-o')
    ).on('click', this._onMenuClick.bind(this, 'persons'));

    if(active === 'persons') personsItem.addClass('se-active');

    let topicsItem = $$('li').addClass('se-menu-item').append(
      $$('span').addClass('se-label').append('Темы'),
      $$('span').addClass('se-icon fa-tags')
    ).on('click', this._onMenuClick.bind(this, 'topics'));

    if(active === 'topics') personsItem.addClass('se-active');

    let donateItem = $$('li').addClass('se-menu-item se-donate').append(
      $$('a').attr({
        href: 'https://donate.ovdinfo.org',
        target: '_blank'
      }).append(
        $$('span').addClass('se-label').append('Помочь проекту'),
        $$('span').addClass('se-icon fa-ruble')
      )
    );

    let el = $$('nav').addClass('sc-menu').append(
      $$('div').addClass('se-logo').append(
        $$('img').attr('src', 'assets/oi.png'),
        $$('h1').addClass('se-title').append(cover.title)
      ).on('click', this._onMenuClick.bind(this, 'home')),
      $$('ul').append(
        personsItem,
        topicsItem,
        donateItem
      )
    );

    return el
  }

  _onMenuClick(section) {
    this.send('menuNavigate', section);
  }
}

class ImageGrid extends Component {
  render($$) {
    let data = this.props.data;
    let guterless = this.state.guterless;
    let el = $$('section').addClass('sc-image-grid');
    if(guterless) el.addClass('se-guterless');

    let keys$$1 = Object.keys(data);
    keys$$1.forEach((id) => {
      el.append(this.renderItem($$, data[id], id));
    });

    return el
  }

  renderItem($$, item, id) {
    let referer = this.props.referer;
    let el = $$('div').addClass('se-grid-item').append(
      $$('img').attr('src', 'assets/images/' + item.photo),
      $$('div').addClass('se-title').append(item.name)
    ).ref('item-' + id).on('click', this._onGridClick.bind(this, id));

    el.append($$('div').addClass('se-topic').append(referer ? item.intro : item.abstract));

    return el
  }

  _onGridClick(id) {
    let mode = this.props.mode;
    this.send('navigate', mode, id);
  }
}

class Article extends Component {
  render($$) {
    let item = this.props.item;
    let referer = this.props.referer;
    let ref = referer[item.refer];
    let el = $$('article').addClass('sc-article');

    //let hiddenTopic = this.props.hiddenTopic

    let image = $$('header').addClass('se-big-image')
      .attr('style', 'background-image: url("assets/images/' + item.photo + '");')
      .ref('image');

    //if(!this.props.hidden) image.addClass('se-transparent')

    let subtitle = $$('div').addClass('se-subtitle');

    if(this.props.section === 'persons') {
      subtitle.append(
        $$('h2').addClass('se-who').append(item.role),
        $$('h2').addClass('se-abstract').append(item.abstract)
      );
    } else {
      subtitle.append(
        $$('h2').addClass('se-topic').append(item.abstract)
      );
    }

    let curtain = $$('div').addClass('se-curtain').append(
      $$('div').addClass('se-text').append(
        //$$('a').addClass('se-next').append('Следующая история'),
        $$('h1').addClass('se-title').append(item.name),
        subtitle
      )
    );

    if(this.props.hidden) curtain.on('click', this._showNext);
    image.append(
      curtain,
      $$('div').addClass('se-caption').append(item.cr)
    );

    el.append(image);

    let content = $$('div').addClass('se-content').append(
      // $$('h1').addClass('se-title').append(item.name),
      // $$('h2').addClass('se-topic').append(hiddenTopic ? '' : ref.name),
      $$('blockquote').addClass('se-quote').setInnerHTML(item.quote),
      $$('div').addClass('se-text').setInnerHTML(item.content)
    );

    if(ref) {
      let card = $$('div').addClass('se-ref-card').append(
        $$('div').addClass('se-card-photo').attr('style', 'background-image: url("assets/images/' + ref.photo + '");'),
        $$('div').addClass('se-card-content').append(
          $$('span').addClass('se-icon fa-hand-pointer-o'),
          $$('h3').addClass('se-card-heading').append('Подробнее'),
          $$('p').addClass('se-card-text').append(item.referTitle)
        )
      ).on('click', this._onCardClick.bind(this, item.refer));

      content.append(card);
    }

    if(!this.props.hidden) el.append(content);

    return el
  }

  _showNext() {
    let section = this.props.section;
    this.el.addClass('se-easing-upward');
    let topOffset = this.el.getNativeElement().getBoundingClientRect().top;
    this.el.css('transform', 'translate3d(0, -' + topOffset + 'px, 0)');
    this.refs.image.el.addClass('se-transparent');
    this.send('showNextArticle', section);
  }

  _onCardClick(id) {
    let refsection = this.props.refsection;
    this.send('navigate', refsection, id);
  }
}

var data = {
  cover: {
    title: 'Не только Крым и Майдан',
    subtitle: 'Политические преследования в России в 2015 и 2016 годах: основные тенденции и уголовные дела',
    image: 'cover.jpg',
    cr: ''
  },
  preface: {
    content: '<p>Этот доклад посвящен политическим преследованиям в России в 2015 и 2016 годах. ОВД-Инфо систематически отслеживает эту проблему с 2014 года &mdash; тогда были выпущены три доклада, посвященные <a href="http://reports.ovdinfo.org/2014/cr-report/">уголовному</a>, <a href="http://reports.ovdinfo.org/2014/adm-report/">административному</a> и <a href="http://reports.ovdinfo.org/2014/ej-report/">внесудебному</a> политпрессингу с 2011 по 2014 год. В 2015 и 2016 годах ранее описанное нами давление на оппозиционеров, гражданских активистов и инакомыслящих с помощью возбуждения уголовных дел, привлечения к административной ответственности и внесудебных методов воздействия не ослабевали.</p><p>В 2015 и 2016 годах Правозащитный центр &laquo;Мемориал&raquo; признал политзаключенными, преследуемыми по политическим мотивам и в связи с реализацией права на свободу вероисповедания более ста человек. Судя по <a href="http://politpressing.org/">базе политических преследований</a>, которую ведет ОВД-Инфо, основываясь на данных ряда правозащитных организаций, в 2015-2016 годах уголовные дела политической направленности были заведены в отношении как минимум 251 человека. Для сравнения: согласно информации из той же базы, людей, в отношении которых уголовные дела политической направленности были заведены в 2013-2014 годах, насчитывалось более 230 (в описываемые нами годы многие дела, заведенные ранее, продолжились или завершились приговорами). &laquo;Мемориал&raquo; в эти годы признал политзаключенными и преследуемыми по политическим мотивам 72 человек.</p><p>Политпрессингу в 2015-2016 годах способствовал &laquo;посткрымский синдром&raquo;: после украинских событий, имевших большой резонанс в России, а также после присоединения Крыма, большая часть оппозиционных групп утратила активность, в том числе благодаря действиям власти.</p><p>В означенный период принимались новые репрессивные законы, ужесточалось наказание по ряду административных и уголовных статей, обыденностью стали нападения на активистов и правозащитников. Но наибольший резонанс имели многочисленные политические уголовные дела - их обзор и составляет основную часть доклада.</p><p>Обыденностью стало лишение свободы за посты и репосты в соцсетях. Как оказалось, таким образом можно сажать, например, за чужие комментарии к репостам или фотографию баннера на митинге, согласованного с московской полицией. Поводом для заведения уголовного дела в описываемый период стали и неоднократные выходы на мирные уличные акции, в том числе одиночные пикеты.</p><p>В 2015 и 2016 годах суды неоднократно выносили суровые приговоры по политическим делам &mdash; от десяти до двадцати лет лишения свободы в колонии строгого режима. Подвергались такому наказанию по обвинению в причастности к террористической деятельности, участии в боевых действиях и государственной измене. В наибольшей степени это коснулось людей, предположительно имеющих отношение к исламистской партии &laquo;Хизб ут-Тахрир&raquo;, признанной террористической. Суровые приговоры были вынесены также в отношении нескольких граждан Украины, оказавшихся в зоне досягаемости российской правоохранительной системы. В &laquo;украинских делах&raquo; обвинение часто не имело отношения к реальности: фигуранты в принципе не могли совершить преступления, за которые были осуждены.</p><p>Когда обвинение в госизмене предъявили матери семерых детей из российской глубинки и над ней нависла угроза большого срока, ее дело вызвало большой резонанс в обществе, в результате чего женщину быстро отпустили, дело вскоре прекратили, а пресса стала гораздо пристальней следить за делами о госизмене. Некоторые осужденные по таким делам вышли на свободу раньше срока.</p><p>Волна общественного негодования, поднявшаяся в конце 2016 года в ответ на сообщения о пытках в колонии, оказалась достаточной для досрочного освобождения (уже в 2017 году) единственного в России активиста, лишенного свободы за &laquo;неоднократные нарушения&raquo; при одиночных пикетированиях. Но когда в Москве отправили в СИЗО, а затем (в 2017 году) приговорили к нескольким годам колонии журналиста крупного информационного агентства &mdash; по некоторым предположениям, за научную диссертацию, где он исследовал деятельность нескольких госкорпораций, &mdash; добиться его освобождения не удалось.</p><p>Скандальное дело Pussy Riot 2012 года о &laquo;панк-молебне&raquo; в храме и вызванный им общественный резонанс, как выясняется, не остановил российскую власть в стремлении наказывать за выпады против церкви и религии. Напротив, в описываемый в докладе период неоднократно использовалась уголовная статья об оскорблении чувств верующих, введенная в оборот после дела Pussy Riot. Резонанс от дела о &laquo;ловле покемонов в храме&raquo; в отношении популярного видеоблогера сглаживало, в основном, то, что оно расследовалось и слушалось в суде за тысячи километров от Москвы. </p><p>В докладе мы попытались описать самые важные тенденции в сфере политических преследований в 2015 и 2016 году.</p><p>Доклад состоит из двух пересекающихся разделов. Один из них посвящен собственно тенденциями, второй &mdash; людям, преследование которых является примером этих тенденций. Каждый раздел можно читать подряд. Каждая главка в разделе связана с соответствующей главкой в другом разделе, то есть от главки об определенной тенденции можно перейти к главке о человеке, чье преследование иллюстрирует эту тенденцию, и обратно.</p><p>В 2017 году главными &mdash; и новыми по сравнению с предшествующим периодом &mdash; мишенями политических преследований стали представители активизировавшихся политических движений, а также участники массовых протестных акций. Однако некоторые репрессивные направления, заданные в 2015-2016 годах, были развиты и в 2017-м. Поэтому мы полагаем важным изучение событий 2015 и 2016 годов для понимания характера политических преследований предвыборного периода.</p>'
  },
  persons: {
    dadin: {
      name: 'Ильдар Дадин',
      role: 'гражданский активист',
      refer: 'assembly',
      referTitle: 'Свобода собраний: С пикета в колонию. Как граждане России лишились права на массовые гражданские акции',
      photo: 'dadin.jpg',
      cr: 'Фото: Радио Свобода',
      intro: 'История гражданского активиста, оказавшегося в колонии за пикеты',
      abstract: 'по версии следствия и суда, многократно нарушал закон во время протестных акций, в частности на несогласованном митинге в поддержку братьев Навальных и на пикете в защиту осужденных по «Болотному делу»',
      quote: '«Я увидел где-то хорошие слова, что человек рождается свободным, и государство имеет право лишь описать мои свободы и защищать их, оно не имеет право их ограничивать, любые ограничения изначально свободного человека незаконны… Я родился свободным человеком, и никакие бандиты, вводящие антиконституционные законы, не могут применять их ко мне... Я готов сесть за свои убеждения. Я боролся и буду бороться за свои права».',
      content: '<p>Житель подмосковной Балашихи <a href="http://politpressing.org/data/54d5f5dbd2c8da0300140932"><strong>Ильдар Дадин</strong></a> был постоянным участником практически всех протестных акций с конца 2011 года до начала 2015-го, когда его поместили под домашний арест. До начала протестной деятельности Дадин работал охранником и политикой особо не интересовался, но официальные результаты парламентских выборов в декабре 2011 года его возмутили, и он включился в гражданскую активность. Узнав от друга о том, что планируется митинг несогласных с итогами выборов, он, по собственным словам, с радостью присоединился. </p><p>После этого он продолжил ходить на большие согласованные акции, но через некоторое время волна массовых протестов спала. Тогда Дадин объединился с активистами, которые продолжали выходить на малочисленные несогласованные пикеты или устраивали серии одиночных пикетов, не требующих согласования.</p><p>Дадина часто задерживали. Близкие, говоря об особенностях его характера, всегда отмечают, что он очень остро реагирует на ложь и беззаконие. В связи с этим в отделах полиции ему неоднократно доставалось сильнее прочих, поскольку он постоянно указывал полицейским на нарушение законов и Конституции, дотошно требуя от них соблюдения всех правил и норм. В июле 2013 года в ответ на такое поведение полицейские после задержания вызвали Дадину скорую психиатрическую помощь: ему насильно <a href="https://ovdinfo.org/articles/2013/07/31/budni-karatelnoy-psihiatrii">вкололи</a> нейролептик и транквилизатор. В августе 2014 года в московском ОВД &laquo;Хамовники&raquo; ему <a href="https://ovdinfo.org/stories/2014/08/16/my-zhe-ne-zveri-kakie">связали ноги скотчем</a>, а руки завели за спину и приковали наручниками к решетке. </p><p>В январе 2015 года Дадина арестовали и обвинили в &laquo;неоднократном нарушении порядка проведения публичных мероприятий&raquo; (статья 212.1 УК). Вина его состояла в том, что 6 и 23 августа, а также 13 сентября 2014 года он стоял либо в одиночных пикетах, либо неподалеку от одиночного пикета, а 5 декабря 2014 года вместе с еще четырьмя людьми перекрыл Мясницкую улицу, жег файеры, держал баннер и выкрикивал лозунги. По первым трем эпизодам на Дадина уже составляли административные протоколы за нарушение порядка проведения публичного мероприятия (часть 5 статьи 20.2 КоАП) и даже оштрафовали. Иными словами, Дадин преследовался дважды, в административном и в уголовном порядке, за одни и те же действия, что противоречит Конституции. Материалы по четвертому эпизоду стали поводом для заведения уголовного дела о многократных нарушениях. Во время следствия активист находился под домашним арестом. </p><p>Суд приговорил его к трем годам колонии, позже срок был сокращен до двух с половиной лет. Из колонии в Карелии Дадин сообщал о пытках, которым подвергался как он сам, так и другие заключенные. На дело активиста обратили внимание правозащитники и широкая общественность, в том числе и за пределами России. 22 февраля 2017 года Верховный суд отменил приговор и постановил прекратить дело, а самого Дадина &mdash; освободить. Он вышел на свободу и вновь начал участвовать в протестных акциях. Задержания Дадина тоже продолжились.</p>'
    },
    moroshkin: {
      name: 'Алексей Морошкин',
      role: 'бывший ополченец ДНР, основатель группы в сети «ВКонтакте», посвященной созданию Уральской народной республики',
      refer: 'internet',
      referTitle: 'Свобода слова: Чем могут закончиться публикации в соцсетях или репосты чужих записей',
      photo: 'moroshkin.jpg',
      cr: 'Кадр из видео Открытая Россия',
      intro: 'История бывшего ополченца ДНР, который призвал в интернете создать УНР — Уральскую народную республику',
      abstract: 'по версии следствия и суда, виновен в призывах к нарушению территориальной целостности России',
      quote: '«Я не считаю, что совершил преступление. Считаю, что преступник — это в данный момент государство, а не я. Я совершенно открыто выступаю за свои взгляды, не собираюсь их менять ни на суде, ни после суда».',
      content: '<p>Житель Челябинска <a href="http://politpressing.org/data/56a0c8779cd5260c00d66fd4"><strong>Алексей Морошкин</strong></a> был одним из первых, кто делом поддержал идею присоединения Крыма к России: уже 2 марта 2014 года он прибыл на полуостров и вступил в ряды пророссийского ополчения. Оттуда он отправился в Харьков, принял там участие в штурме местной администрации, а затем уехал в Донецк и стал участником батальона &laquo;Восток&raquo;. После этого он разочаровался в &laquo;Русской весне&raquo; и, вернувшись в Россию, начал публиковать в соцсети &laquo;ВКонтакте&raquo; под псевдонимом &laquo;Андрей Брейва&raquo; тексты о необходимости создания Уральской народной республики. За эти тексты на него завели уголовное дело о призывах к нарушению территориальной целостности РФ (статья 280.1 УК).</p><p>20 августа 2015 года к Морошкину домой пришли с обыском. Помимо постов об Уральской народной республике, ему вменяли проукраинскую позицию и критику российских властей в связи с событиями на востоке Украины. В середине сентября Морошкину, находившемуся под подпиской о невыезде, удалось перебраться на территорию Украины, причем сразу же после этого в Челябинск приехали сотрудники ФСБ из Москвы и провели новый обыск в его квартире. Однако уже в конце сентября Морошкин вернулся в Россию. Позднее он объяснил, что люди, на чью помощь он рассчитывал, обманули его, а ехать ему было больше некуда.</p><p>В ночь на 26 сентября он был задержан в Брянске. Отсюда его на автомобиле перевезли в Москву, в аэропорт &laquo;Шереметьево&raquo;. На глаза ему надели повязку, руки связали скотчем за спиной, по дороге били по рукам и по голове и требовали, чтобы он сознался в новом преступлении &mdash; раскрашивании бюста Ленина в Челябинске в цвета украинского флага (дело было заведено по статье &laquo;вандализм&raquo;, статья 214 УК; явных свидетельств причастности Морошкина к этой акции в деле нет). Три дня с момента задержания ему не давали есть и спать. Из Москвы Морошкина перевезли в Челябинск, где поместили в СИЗО.</p><p>19 ноября 2015 года суд освободил Морошкина от уголовной ответственности по делу о призывах и постановил направить его в психиатрический стационар. Ключевую роль здесь сыграли результаты психиатрической экспертизы &mdash; Морошкину поставили диагноз &laquo;параноидальная шизофрения&raquo; с формулировкой &laquo;бред реформаторского толка&raquo;. Поводом для этого, по-видимому, послужили сетевые публикации и интервью Морошкина, посвященные придуманной им виртуальной Церкви Челябинского Метеорита. В 2014 году он, объявив себя настоятелем этой церкви, потребовал от региональных властей передать его последователям Челябинский метеорит, упавший 15 февраля 2013 года в озеро Чебаркуль, и настаивал на установке в областном центре храма метеорита. При этом на учете у психиатра Морошкин до этого не состоял, хотя в начале 2000-х годов месяц лечился в стационаре от депрессии (он предполагает, что это тоже могло сыграть роль в принятии решения о принудительном лечении). Довольно давно ему поставили диагноз эпилепсия.</p><p>С 10 декабря 2015 года Морошкин находился в психиатрической больнице. В течение первого месяца его пребывания там ему давали неизвестные таблетки, из-за которых он почти не мог ходить и разговаривать. Морошкин убежден, что персонал перестал закармливать его таблетками после того, как его история получила огласку. 1 июня 2017 года суд постановил прекратить принудительное лечение после заявления руководства больницы. 14 июня Морошкин вышел на свободу. По его мнению, освобождению поспособствовал общественный резонанс. Следствие по делу о вандализме продолжалось до 4 декабря 2017 года &mdash; в этот день дело закрыли в связи с истечением срока давности.</p>'
    },
    sencov: {
      name: 'Олег Сенцов',
      role: 'крымский режиссер, участник движения «Автомайдан»',
      refer: 'false-terror',
      referTitle: 'Приписанный терроризм: Взрыв петарды, пост в ЖЖ и другие поводы для ареста по антитеррористической статье',
      photo: 'sencov.jpg',
      cr: 'Фото: Антон Наумлюк',
      intro: 'Российское гражданство насильно и 20 лет строгого режима. История крымского режиссера',
      abstract: 'по версии следствия и суда, стал организатором террористической группы, совершившей две попытки поджогов — симферопольских офисов «Русской общины Крыма» и «Единой России»',
      quote: '«Трусость — самый страшный грех на Земле. Большая измена начинается иногда с маленькой такой трусости… Когда тебе надевают мешок на голову, немного бьют, и через полчаса ты уже готов отречься от всех своих убеждений, оговорить себя в чем угодно, оклеветать других людей, только чтобы перестали бить. Я не знаю, чего могут стоить твои убеждения, если ты не готов за них пострадать».',
      content: '<p><a href="http://politpressing.org/data/55bf9f1da240860c00d12b4d"><strong>Олег Сенцов</strong></a> &mdash; симферопольский кинорежиссер, бывший владелец компьютерного игрового клуба. Свой первый и пока единственный фильм &laquo;Гамер&raquo; Сенцов снял на собственные средства (бюджет картины &mdash; 20 тысяч долларов), а актерами стали знакомые Сенцова из разных арт-сообществ Симферополя. &laquo;Гамер&raquo; имел успех, так что бюджет второго фильма, &laquo;Носорог&raquo;, составил уже миллион долларов &mdash; почти наполовину он был профинансирован из бюджета Украины. Съемки &laquo;Носорога&raquo; все еще не закончены. </p><p>Во время крымского кризиса Олег Сенцов, активно выступавший против присоединения Крыма к России, участвовал в движении &laquo;Автомайдан&raquo; и развозил продукты в заблокированные украинские воинские части.</p><p>Сенцова арестовали 11 мая 2014 года. Вместе с ним &mdash; крымчан <a href="http://politpressing.org/data/55d616b876e4350c00e37c11"><strong>Геннадия Афанасьева</strong></a>, <a href="http://politpressing.org/data/55bfa184a240860c00d12b52"><strong>Александра Кольченко</strong></a> и Алексея Чирния. Еще нескольких подозреваемых объявили в розыск. Всех обвинили в участии в &laquo;Правом секторе&raquo;, но эта запрещенная в России организация опровергла свою связь с &laquo;крымскими террористами&raquo;: к среде радикальных украинских националистов из арестованных, видимо, отношение имел только Чирний.</p><p>В основу обвинения легла по сути не доказанная подготовка взрывов в Крыму и две попытки поджогов &mdash; симферопольских офисов &laquo;Русской общины Крыма&raquo; и &laquo;Единой России&raquo;, &mdash; во время которых пострадали лишь двери, оконная рама и крыльцо. Тем не менее эти действия были квалифицированы как акты терроризма.</p><p>Сенцов свою вину не признает. Геннадий Афанасьев, как и Алексей Чирний, на следствии дал показания против Сенцова и Кольченко. Оба позже сообщили, что пошли на это под пытками. После дачи показаний на других подсудимых и признания своей вины Афанасьев и Чирний получили по 7 лет колонии.</p><p>О пытках сообщали все обвиняемые. Кроме того, на суде Сенцову и Кольченко пытались насильно навязать российское гражданство, чтобы лишить посольство Украины возможности их поддерживать. Уже получивший срок Афанасьев во время суда над Сенцовым отказался от показаний против него, так как они были даны под давлением следователей ФСБ. Несмотря на заявление ключевого свидетеля обвинения, суд приговорил Кольченко к 10 годам лишения свободы, а Сенцова, которого следствие посчитало организатором террористической группы, &mdash; к 20 годам. В июне 2016 года Афанасьева выдали Украине. Его и еще одного украинца, Юрия Солошенко, осужденного по делу о шпионаже, обменяли на одесских журналистов, граждан Украины Елену Глищинскую и Виталия Диденко, которых украинские власти судили за сепаратизм.</p><p>За время, проведенное за решеткой, Сенцов написал и опубликовал две художественные книги. Сейчас Олега Сенцова поддерживают кинематографисты со всего мира: во многом благодаря этому резонанс вокруг уголовного дела сохраняется до сих пор.</p><p>Украина добивается выдачи Сенцова и Кольченко.</p>'
    },
    'karpuk-klyh': {
      name: 'Николай Карпюк и Станислав Клых',
      role: 'граждане Украины, бывшие участники организации УНА-УНСО',
      refer: 'ukraine',
      referTitle: 'Украина как повод: Как украинский контекст влияет на появление и расследование уголовных дел',
      photo: 'karpuk.jpg',
      cr: 'Фото: Антон Наумлюк/Радио Свобода',
      intro: 'История двух украинцев, обвиненных в участии в боевых действиях в Чечне и убийстве российских военнослужащих в 1994—1995 годах',
      abstract: 'по версии следствия и суда, участвовали в боевых действиях в Чечне и убийстве российских военнослужащих в 1994—1995 годах',
      quote: '«Я знаю, что ФСБ России хорошо известно о том, что я не принимал участия в чеченской войне. С 2001 года прокуратура ЧР не раз направляла следственным органам Украины запросы на конкретных граждан Украины с просьбой провести дознание об их причастности к боевым действиям в Чеченской Республике. Каждый раз составлялся четкий список из одних и тех же людей. Меня, соответственно, в этих списках не было. Уголовное преследование меня — это месть за мои убеждения, за то, что я долгие годы своей жизни посвятил работе по созданию суверенного государства Украина». — Николай Карпюк <br /><br />«Я очень себя вел спокойно, когда меня пытали, я сам не ожидал». — Станислав Клых',
      content: '<p>Украинец <a href="http://politpressing.org/data/56c61ca153c9910a00b82949"><strong>Николай Карпюк</strong></a> &mdash; член организации &laquo;Украинская национальная ассамблея &mdash; Украинская народная самооборона&raquo; (УНА-УНСО). В 1992 году вместе с группой украинских националистов он участвовал в боевых действиях в Приднестровье, в 1993 году &mdash; в Абхазии, где был ранен, после чего вернулся домой &mdash; поправлял здоровье и ухаживал за больной матерью. В конце 2001 года стал руководителем УНА-УНСО. Тогда же вместе с соратниками был приговорен к тюремному заключению за участие в акции &laquo;Украина без Кучмы&raquo;, закончившейся столкновениями у здания администрации президента Украины, на свободу вышел в 2004 году. </p><p><a href="http://politpressing.org/data/56c61f9953c9910a00b82950"><strong>Станислав Клых</strong></a> вступил в УНА-УНСО в 1991 году, когда учился на историческом факультете Киевского национального университета. Он рассказывал, что заполнил анкету на членство, но довольно быстро отошел от дел организации и никогда в активной деятельности не участвовал, хотя на него какое-то время даже было зарегистрировано киевское отделение. Позднее Клых получил второе образование, занялся преподаванием, писал статьи в различных изданиях, организовывал фестивали, занимался общественной деятельностью.</p><p>Карпюк и Клых стали обвиняемыми по делу об участии членов УНА-УНСО в боевых действиях в Чечне и убийстве российских военнослужащих в 1994&mdash;1995 годах. О возбуждении дела Следственный комитет объявил в марте 2014 года. Карпюка задержали на украинско-российской границе, он ехал в Москву, как он полагал, на переговоры с представителями руководства России о предстоящем референдуме в Крыму. До суда родственники и адвокаты всерьез сомневались в том, что Карпюк еще жив: встретиться с ним не удавалось. В постановлении суда о помещении Карпюка под стражу говорится, будто он признал, что воевал в Чечне вместе с другими видными деятелями УНА-УНСО и будущего &laquo;Правого сектора&raquo;, а также с Арсением Яценюком, премьер-министром Украины с февраля 2014 по апрель 2016 года.</p><p>Клых был задержан в августе в Орловской области, когда ехал в гости к подруге. Адвокат смогла попасть к нему лишь через год. Она утверждает, что в первые полтора-два месяца после задержания Клых подвергался длительным и изощренным пыткам: &laquo;Его били, пытали электрическим током, подвешивали за наручники, оставляли без еды и воды&raquo;. Под пытками он дал признательные показания, от которых потом официально отказался. Пытками объясняются и признания, данные Карпюком. Позднее в открытом письме он подробно описывал, как его били током и загоняли иглы под ногти. </p><p>Карпюк и Клых утверждают, что в Чечне никогда не были &mdash; вплоть до того момента, как их привезли в Грозный на суд по этому делу. Все обвинения в деле строятся на показаниях одного-единственного свидетеля &mdash; гражданина Украины Александра Малофеева, приговоренного в России к длительному заключению по другому делу. Он &mdash; либо также под пытками, либо в результате других форм давления &mdash; дал показания о том, что участвовал в боевых действиях в Чечне, причем Карпюк и Клых в его показаниях появились не сразу.</p><p>На суде выступали свидетели, подтверждавшие алиби не только Карпюка и Клыха, но и Малофеева. Однако 26 мая 2016 года Верховный суд Чечни вынес один из самых жестоких приговоров в истории политических преследований в постсоветской России за последние годы. Николай Карпюк был приговорен к 22 с половиной, Клых &mdash; к 20 годам колонии строгого режима.</p><p>В ходе процесса в поведении Станислава Клыха стали наблюдаться странности: на заседаниях он был то апатичным, то буйным. Адвокат заподозрила, что это связано с действием каких-то препаратов, которые ему давали в заключении, однако никаких точных сведений об этом ей добиться не удалось. Во время одного из заседаний Клых сорвался и начал кричать на прокурора. За неуважение к суду ему добавили еще месяц колонии. Суд счел, что Клых симулирует заболевание, поскольку врачи, проводившие ранее амбулаторную экспертизу, пришли к выводу, что он здоров.</p>'
    },
    cherevatenko: {
      name: 'Валентина Череватенко',
      role: 'правозащитница, глава Союза «Женщины Дона»',
      refer: 'ngo',
      referTitle: 'Преследование НКО: Как государство пытается превратить правозащитников в «иностранных агентов»',
      photo: 'cherevatenko.jpg',
      cr: 'Фото: Новая Газета',
      intro: 'Как помощь людям, оказавшимся в сложных ситуациях, становится «политической деятельностью». История директора фонда «Женщины Дона»',
      abstract: 'по версии следствия, организация Череватенко осуществляла политическую деятельность на деньги иностранного фонда',
      quote: '«Мы занимаемся миротворчеством, все, что мы делаем — снижение последствий вооруженных конфликтов. Мы работаем с беженцами и детьми, помогаем разным сторонам конфликта построить диалог, примириться и достичь понимания. Поэтому, конечно, наша работа касается большого круга людей, даже тех, кто пока еще не понимает этого».',
      content: '<p>Жительница Новочеркасска <a href="http://politpressing.org/data/57c6f1e08c93ed0c006fa629"><strong>Валентина Череватенко</strong></a> после окончания политехнического института работала на заводе и стала одной из активисток местного райкома комсомола. Совмещая работу и учебу, родила сына. Но когда младенец заболел, врачи не смогли ему помочь, и мальчик погиб &mdash; Череватенко было всего 20 лет. Тогда она вместе с другими женщинами на заводе создала комитет поддержки матери и ребенка, многодетных семей и детей, находящихся под опекой. Со временем на базе комитета появился Союз &laquo;Женщины Дона&raquo; и одноименный фонд &mdash; правозащитные организации, помогающие жителям области, оказавшимся в сложных ситуациях. Череватенко возглавила организацию.</p><p>Вместе с &laquo;Женщинами Дона&raquo; она занялась правовым просвещением населения, защитой прав призывников и военнослужащих. Одной из последних инициатив Союза стал проект &laquo;Гражданский Минск&raquo;, призванный обеспечить гражданской контроль за реализацией Минских соглашений о прекращении войны на юго-востоке Украины.</p><p>Участие Союза в круглых столах, посвященных реформе милиции, Минюст определил как политическую деятельность, из-за чего обе организации Череватенко были признаны &laquo;иностранными агентами&raquo; в 2014 году. Однако затем Союз был исключен из реестра, потому что иностранных денег на свою деятельность он не получал. А вот Фонд &laquo;Женщины Дона&raquo; попал в список из-за сотрудничества с немецким Фондом имени Генриха Белля: организации делали совместные проекты по развитию гражданского общества и гендерного равноправия в республиках Северного Кавказа. Минюст решил, что и это &mdash; политическая деятельность. </p><p>В результате в июне 2016 года на Валентину Череватенко было заведено уголовное дело: следствие утверждало, что она зарегистрировала Фонд, чтобы избежать исполнения закона об &laquo;иностранных агентах&raquo;. Через год, в июле 2017-го, дело было прекращено в связи с отсутствием состава преступления.</p>'
    },
    chiygoz: {
      name: 'Ахтем Чийгоз',
      role: 'заместитель председателя Меджлиса крымскотатарского народа, активный противник присоединения Крыма к России',
      refer: 'tatars',
      referTitle: 'Преследование крымских татар: Как Россия, присоединив Крым, ведет себя с несогласными жителями полуострова',
      photo: 'chijgoz.jpg',
      cr: 'Фото: Радио Свобода',
      intro: 'История зампреда Меджлиса крымскотатарского народа, который не хотел признавать новую крымскую власть',
      abstract: 'по версии следствия и суда, организовал массовые беспорядки в Симферополе, когда Россия еще не присоединила к себе Крым',
      quote: '«На долю нашего народа выпало много испытаний, и мы с честью их проходим. Нас не сломать тюрьмами и лагерями! Не запугать обысками и арестами! Не обмануть с помощью марионеток! Крым больше никогда не будет без крымских татар!»',
      content: '<p>Крымчанин <a href="http://politpressing.org/data/559824ada240860c00d12a94"><strong>Ахтем Чийгоз</strong></a> &mdash; заместитель председателя Меджлиса крымскотатарского народа &mdash; исполнительного органа Курултая (национального съезда) крымских татар. По словам другого зампреда Меджлиса, Ильми Умерова (на которого также было заведено уголовное дело), из пяти зампредов Чийгоз по факту был лидером, у него была репутация бойца. В 2007 году он лег под бульдозер, пытаясь не допустить снос домов крымских татар. После присоединения Крыма к России Чийгоз был среди тех, кто занял радикальную позицию: сам не признал российскую власть и призывал к этому других крымских татар, предлагая даже объявить бойкот тем, кто с ней все-таки сотрудничает.</p><p>Чийгоза обвинили в организации массовых беспорядков (часть 1 статьи 212 УК) в Симферополе 26 февраля 2014 года &mdash; то есть до присоединения Крыма к России. В этот день действительно происходили столкновения между сторонниками Меджлиса и представителями движения &laquo;Русское единство&raquo;. Однако следствие завело дело только против крымских татар.</p><p>Дело 26 февраля&raquo; было заведено в январе 2015 года, через год дошло до суда, но было возвращено на доследование. На тот момент на скамье подсудимых, помимо Чийгоза, находились еще пятеро крымских татар, обвиненных в участии в массовых беспорядках: <a href="http://politpressing.org/data/559839e1a240860c00d12ab7"><strong>Али Асанов</strong></a>, <a href="http://politpressing.org/data/56c20cf59707fa0f00638d6b"><strong>Мустафа Дегерменджи</strong></a> (после почти двух лет под стражей переведены под домашний арест), <a href="http://politpressing.org/data/55983449a240860c00d12aa6"><strong>Эскендер Эмирвалиев</strong></a>, <a href="http://politpressing.org/data/55982aa2a240860c00d12a9f"><strong>Эскендер Кантемиров</strong></a> и <strong>Арсен Юнусов</strong> (находятся на свободе). В настоящее время дело &laquo;участников&raquo; рассматривается отдельно. В отношении еще двух человек, проходивших по делу, были вынесены приговоры в 2015 году: в октябре <a href="http://politpressing.org/data/55983c80a240860c00d12abf"><strong>Эскендер Небиев</strong></a>, признавший вину и заключивший соглашение со следствием, получил два с половиной года условно, в декабре <a href="http://politpressing.org/data/55983758a240860c00d12aaf"><strong>Талят Юнусов</strong></a> получил три с половиной года условно.</p><p>Чийгоз единственный из всех обвиняемых оставался в СИЗО все время процесса, причем на судебные заседания его не доставляли, несмотря на то, что суд находится недалеко. Заслуживающих доверия доказательств того, что Чийгоз организовывал массовые беспорядки и призывал крымских татар совершать насилие, в деле нет.</p><p>11 сентября 2017 Ахтем Чийгоз был приговорен к восьми годам колонии общего режима.</p><p>25 октября стало известно, что Чийгоз и <a href="http://politpressing.org/data/5734f6f76d8a0b0a00be6275"><strong>Ильми Умеров</strong></a>, приговоренный к двум годам колонии-поселения по обвинению в призывах к сепаратизму за слова о том, что Крым следует вернуть Украине, помилованы и переданы Турции.</p>'
    },
    nemcov: {
      name: 'Борис Немцов',
      role: 'оппозиционный политик, общественный деятель',
      refer: 'attacks',
      referTitle: 'Убийства и нападения: За что правозащитники, активисты и политики подвергаются нападениям и как расследуются эти дела',
      photo: 'nemcov.jpg',
      cr: 'Фото: Радио Свобода',
      intro: 'Самое громкое политическое убийство в России',
      abstract: '«Но больше Украины маму волнует Путин. Всякий раз, как я ей звоню, она причитает: „Когда ты прекратишь ругать Путина? Он тебя убьет!“»',
      quote: 'убит, по версии следствия и суда, ради денежного вознаграждения',
      content: '<p>В 1990-х годах <strong>Борис Немцов</strong> успел побывать депутатом Верховного совета СССР, затем российского парламента, а также губернатором Нижегородской области, министром топлива и энергетики, вице-премьером правительства России и членом Совета Федерации. Немцова называли одним из возможных преемников первого президента России Бориса Ельцина.</p><p>В 2000-х Немцов был депутатом Государственной Думы, затем &mdash; председателем совета директоров концерна &laquo;Нефтяной&raquo;. В 2007 году партия &laquo;Союз правых сил&raquo;, в первую тройку предвыборного списка которой входил Немцов, не прошла в Госдуму. Немцов выдвигался в президенты в 2008 году, но затем снял свою кандидатуру.</p><p>Тогда же он выпустил доклад &laquo;Путин.Итоги&raquo;, посвященный деятельности Владимира Путина, участвовал в создании движения &laquo;Солидарность&raquo; (а позднее &mdash; партии ПАРНАС) и стал одним из ведущих &laquo;несистемных оппозиционеров&raquo;. Его многократно задерживали на уличных акциях, он получал угрозы, проклемлевское СМИ Life.Ru опубликовало записи его телефонных разговоров.</p><p>Во время массовых протестов 2011-2012 годов Немцов был одним из организаторов митингов в Москве и вошел в Координационный совет оппозиции. В сентябре 2013 года Немцов стал депутатом Ярославской областной думы</p><p>В течение всей своей карьеры Немцов считался образцом западного политика в России: прекрасный оратор, всегда открыт для общения и полемики. Его мобильный был у всех политических журналистов Москвы, он готов был почти в любое время суток высказаться почти по любой теме. В протестной волне 2011-2012 годов Немцов был одним из самых опытных политиков.</p><p>27 февраля 2015 года Борис Немцов был застрелен в Москве на Большом Москворецком мосту напротив Кремля, накануне антикризисного марша. В двенадцатом часу ночи он шел домой вместе с украинской моделью Анной Дурицкой. Киллер поднялся за ними на Большой Москворецкий мост, сделал несколько выстрелов в сторону политика и скрылся на машине сообщников.</p><p>По обвинению в участии в убийстве Немцова были задержаны несколько уроженцев Чечни. Один из них погиб при задержании: по официальной версии, подорвал себя гранатой. Некоторые обвиняемые в убийстве Немцова связаны с батальоном &laquo;Север&raquo;, элитной структурой чеченского МВД, подконтрольной Рамзану Кадырову. </p><p>Заур Дадаев, которого подозревают непосредственно в убийстве политика, служил в батальоне заместителем командира. После задержания Кадыров вступился за Дадаева: &laquo;Я знал Заура, как настоящего патриота России. &lt;...&gt; Заур был одним из самых бесстрашных и мужественных военнослужащих полка. &lt;...&gt; Награжден орденом Мужества, медалями &bdquo;За отвагу&ldquo;, &bdquo;За заслуги перед ЧР&ldquo; и Благодарственным письмом Главы ЧР и др. Я твердо убежден, что он искренне предан России, был готов отдать за Родину жизнь&raquo;.</p><p>На стадии следствия Дадаев дал показания о том, что он убил Немцова за якобы &laquo;неуважительные&raquo; по отношению к исламу высказывания в поддержку карикатуристов из французского журнала Charlie Hebdo. По версии следствия, мотивом убийства Немцова было получение вознаграждения. Во время суда Дадаев отказался от своих показаний и утверждал, что невиновен в убийстве и оговорил себя под пытками.</p><p>В ходе следствия и суда не было выяснено, кто и по каким мотивам заказал убийство Немцова. По <a href="http://www.rbc.ru/politics/24/02/2016/56cdafe19a79474df32aabf9">мнению</a> адвоката семьи политика Вадима Прохорова, возможным заказчиком убийства может являться Руслан Геремеев, заместитель командира батальона &laquo;Север&raquo;, родственник депутата Госдумы от Чечни Адама Делимханова и члена Совета Федерации Султана Геремеева. </p><p>Руслан Геремеев был <a href="https://meduza.io/feature/2017/05/31/sud-zavershil-rassledovanie-ubiystva-borisa-nemtsova-kakovy-ego-neuteshitelnye-itogi">вызван</a> в суд, но не явился, не был допрошен и на стадии следствия. Из представителей чеченской элиты в суде выступил только брат Адама Делимханова, бывший командир &laquo;Севера&raquo; Алибек Делимханов, не ответивший на многие вопросы, ссылаясь на плохую память. В суде дал показания главный редактор &laquo;Эха Москвы&raquo; Алексей Венедиктов. Он заявил, что Немцов рассказывал ему, что получает угрозы от людей, которых определял как &laquo;кадыровцев&raquo;.</p><p>Присяжные признали виновными и не заслуживающими снисхождения всех подсудимых. В июле этого года суд вынес приговор: исполнитель убийства Заур Дадаев получил 20 лет, его сообщники &mdash; от 11 до 19 лет. Семья Немцова и их адвокаты убеждены, что дело нельзя считать раскрытым: адекватной попытки установить заказчиков и истинные мотивы убийства суд даже не предпринял. </p><p>Почти три года продолжается акция &laquo;Немцов мост&raquo;: круглосуточное дежурство у народного мемориала на месте убийства политика. Участников &laquo;Немцова моста&raquo; регулярно задерживают полицейские, а мемориал убирают коммунальные служащие. Убийство Немцова остается наиболее громким, ярким и жестким примером расправы с оппозиционным политиком в новейшей истории России.</p>'
    },
    buchenkov: {
      name: 'Дмитрий Бученков',
      role: 'анархист, антифашист, политический активист',
      refer: 'bolotnaya',
      referTitle: '«Болотное дело»: Уголовное дело, задавшее стандарт в российской следственной практике по преследованию демонстрантов за столкновения с полицией',
      photo: 'buchenkov.jpg',
      cr: 'Фото: Новая Газета',
      intro: 'История арестованного по «Болотному делу» анархиста, которого не было на Болотной площади',
      abstract: 'по версии следствия, участвовал в столкновениях с полицией на Болотной площади 6 мая 2012 года',
      quote: '«У меня были причины не участвовать в акции 6 мая 2012 года. Мне казалось, что движение за честные выборы на тот момент стало выдыхаться. Я был одним из заявителей шествия 1 мая 2012 года и посчитал, что наше движение на этой демонстрации достаточно ясно выразило свою позицию».',
      content: '<p><a href="http://politpressing.org/data/566ae3909cd5260c00d66e86"><strong>Дмитрий Бученков</strong></a> &mdash; анархист, преподаватель политологии. Всегда был сторонником публичной пропаганды, предполагающей открытость активистов к дискуссиям и, соответственно, легальность их проектов. В 2000-х был одним из создателей движения &ldquo;Автономное действие&rdquo;. Он защитил диссертацию по теме &laquo;Феномен анархизма в политической жизни России в конце XX века&raquo; и является автором изданной в 2009 году книги &laquo;Анархисты в России в конце XX века&raquo;. В Москве Бученков был одним из основных организаторов уличных акций анархистов и антифашистов, неоднократно заявлял мероприятия от своего имени. Один из последних проектов в столице, в котором участвовал Бученков, &mdash; социальный и культурный центр ProjectV, в котором проходили лекции, популяризирующие экологические, анархические и антифашистские идеи.</p><p>По &laquo;Болотному делу&raquo; Бученкова задержали почти через три года после событий 6 мая, и на данный момент он является 36-м и последним обвиняемым по делу. Бученков провел в СИЗО больше года, но был переведен под домашний арест. Суд по существу начался весной.</p><p>Особенность его истории, в отличие от других обвиняемых по &laquo;Болотному делу&raquo;, в том, что Бученкова не было на Болотной площади 6 мая &mdash; в это время он уехал в Нижний Новгород к родителям. После событий 6 мая он, как и раньше, выступал организатором акций, его как минимум дважды задерживали сотрудниками Центра &laquo;Э&raquo; и отпускали без протокола.</p><p>В событиях на Болотной следствие приписывает Бученкову действия другого человека (так называемого &laquo;человека в кепке с козырьком&raquo;), внешне немного похожего на него. Во время следствия в распоряжении СМИ оказалось множество качественных фотографий, на которых однозначно видно, что Бученков и &laquo;человек в кепке&raquo; &mdash; разные люди. Это установила и соответствующая экспертиза, заказанная защитой Бученкова. Следствие игнорирует это, как и данные с многочисленных дорожных камер, зафиксировавших машину Бученкова в районе 6 мая по дороге к родственникам в Нижний Новгород и обратно.</p><p>Среди анархистов арест Бученкова <a href="https://www.opendemocracy.net/od-russia/dmitry-okrest/buchenkov">был воспринят</a> как акт запугивания, &laquo;точечный&raquo; удар по одному из наиболее активных участников движения. Для оппозиционной среды в целом арест Бученкова показал, что для того, чтобы оказаться обвиняемым по делу вроде &laquo;Болотного&raquo;, необязательно даже присутствовать на месте событий.</p><p>9 ноября 2017 года Бученков уехал из России, не дожидаясь окончания судебного процесса. Суд заочно арестовал его и объявил в розыск.</p>'
    },
    davydova: {
      name: 'Светлана Давыдова',
      role: 'многодетная мать, домохозяйка',
      refer: 'treason',
      referTitle: 'Применение статьи о госизмене: SMS другу и резюме в Швецию. За что могут обвинить в государственной измене',
      photo: 'davydova.jpg',
      cr: 'Фото: Открытая Россия',
      intro: 'История многодетной матери, оказавшейся в СИЗО за звонок в посольство Украины',
      abstract: 'по версии следствия, совершила государственную измену, сообщив в посольство Украины о готовящейся, по ее мнению, передислокации российской воинской части в Донецк',
      quote: '«Я все время думала о семье, я прошла через такой ад… Арест для меня был шоком. По содержанию в СИЗО к сотрудникам у меня никаких вопросов нет — они делали свою работу».',
      content: '<p>Жительница Вязьмы (Смоленская область) <strong>Светлана Давыдова</strong> &mdash; многодетная мать, вместе с мужем воспитывает семь детей, в том числе двух инвалидов. Последние несколько лет Давыдова сидела дома с детьми, до этого работала сначала швеей, затем управленцем на фабрике. Была секретарем местного отделения КПРФ, активно занималась решением городских проблем. Например, когда в 2009 году в городе начали постоянно отключать воду из-за регулярных аварий на водозаборной станции, она добилась проведения ремонтных работ.</p><p>Весной 2014 года Давыдова заметила, что находящаяся рядом с ее домом воинская часть, в которой дислоцируется радиотехническая бригада ГРУ, опустела. Затем она услышала разговор в маршрутке о том, что военнослужащих оттуда переправляют в Москву небольшими группами, в штатском, а оттуда &mdash; в некую командировку. Давыдова решила, что их перебрасывают в Донецк, позвонила в посольство Украины в Москве и сообщила об этом.</p><p>Спустя почти год на женщину завели уголовное дело о государственной измене, в январе 2015 года ее арестовали и этапировали в &laquo;Лефортово&raquo;. Несмотря на наличие грудного ребенка Давыдову оставили в следственном изоляторе на время следствия. Ее дело вызвало огромный резонанс, и уже 3 февраля она была освобождена под подписку о невыезде, а еще через месяц дело против нее было закрыто за отсутствием состава преступления.</p>'
    },
    sokolovsky: {
      name: 'Руслан Соколовский',
      role: 'видеоблогер',
      refer: 'blasphemy',
      referTitle: 'Оскорбление чувств верующих: Защита парка от РПЦ, спор о христианстве в интернете и другие оскорбления религиозных чувств. Как и от кого государство защищает верующих',
      photo: 'sokolovskij.jpg',
      cr: 'Фото: адвокат Алексей Бушмаков',
      intro: 'История видеоблогера, который «ловил покемонов» в храме',
      abstract: 'по версии следствия и суда, оскорбил чувства верующих, играя в Pokemon GO в здании храма',
      quote: '«Оскорблять никого не хотел, смысла в привлечении к ответственности за оскорбление чувств верующих в настолько размытом по формулировкам законе не вижу. Тональность своих роликов хочу сменить на более просветительскую, нежели критическую. <br />Провокации мои не такие уж и провокационные, веду себя в сотню раз адекватнее тех же Pussy Riot».',
      content: '<p><a href="http://politpressing.org/data/57d59ecd8c93ed0c006fa649"><strong>Руслан Соколовский</strong></a> &mdash; популярный видеоблогер из Екатеринбурга. По его словам, он не получил высшее образование, потому что пришлось много работать и поддерживать одинокую мать, у которой нет своей квартиры. Начал он с раскрутки ресурсов в интернете, затем создал видеоблог, который быстро набрал три сотни тысяч подписчиков.</p><p>Самые популярные ролики Соколовского на YouTube были посвящены жесткой критике христианства и ислама. Уголовное дело против Руслана Соколовского появилось после публикации ролика о &laquo;ловле покемонов в храме&raquo;. Ранее зампред Синодального отдела по взаимоотношениям церкви с обществом и СМИ Вахтанг Кипшидзе призывал &laquo;не ловить&raquo; покемонов в храмах.</p><p>Соколовский заснял, как играет в популярную игру Pok&eacute;mon GO в церкви. Смонтировал ролик он у себя дома, а в церкви просто постоял со смартфоном. Соколовский был задержан 2 сентября 2016 года, помещен в СИЗО, потом под домашний арест, потом снова в СИЗО, потом снова под домашний арест.</p><p>Судили Соколовского за несколько видеороликов, по версии следствия, возбуждающих религиозную рознь (статья 282 УК) и оскорбляющих чувства верующих (статья 148 УК), а также за приобретение ручки со скрытой камерой (статья 138.1 УК). В мае 2017 года Руслана Соколовского приговорили к трем с половиной годам лишения свободы условно. Обвинение требовало дать ему три с половиной года реального срока. В июле Свердловский областной суд смягчил ему наказание до двух лет и трех месяцев условно, исключив обвинение в обороте &laquo;шпионских гаджетов&raquo;.</p><p>Из реплик на процессе судьи и прокурора можно сделать вывод, что Верх-Исетский районный суд Екатеринбурга, в котором проходил процесс, криминализует атеистические взгляды как таковые. В поддержку Руслана Соколовского выступили Евгений Ройзман, Александр Невзоров, Владимир Познер и другие общественные деятели. </p><p>Соколовский продолжает вести видеоблог под эгидой ресурса Znak.com.</p>'
    },
    sokolov: {
      name: 'Александр Соколов',
      role: 'журналист-расследователь',
      refer: 'journalists',
      referTitle: 'Преследование журналистов: Нападения и уголовные дела. Кто и как препятствует работе журналистов',
      photo: 'sokolov.jpg',
      cr: 'Фото: Олег Яковлев/РБК',
      intro: 'Как автор расследований о доходах чиновников и госкорпораций оказался в тюрьме по делу о запрещенной организации',
      abstract: 'по версии следствия и суда, занимался экстремистской деятельностью, администрируя сайт запрещенной организации «ЗОВ», требовавшей провести референдум за поправки в Конституцию, обязывающие всех чиновников подробно отчитываться о своей работе перед россиянами',
      quote: '«Я был далек от мысли, что мои работы будут представлять серьезную значимость и интерес. Я стремился при изучении тем честно и независимо разобраться в проблеме повышения эффективности госсектора экономики. Однако, видимо, опубликованные и оказавшиеся замеченными результаты не понравились тем представителям госкорпораций, которые были замешаны в недобросовестных сделках. Эти лица могли счесть, что организацией моего преследования они смогут очернить результаты работы и тем самым уйти от моральной и иной ответственности, мол, “это же экстремист, вот и понаписал всякой ерунды”».',
      content: '<p>Экономиста и журналиста-расследователя РБК <a href="http://politpressing.org/data/54c39ee5bf69b503003918fa"><strong>Александра Соколова</strong></a> обвинили в участии в деятельности запрещенной организации (часть 1 статьи 282.2 УК). Соколов &mdash; один из арестованных по делу Инициативной группы по проведению референдума &laquo;За ответственную власть&raquo;, которая, как считает следствие, продолжает деятельность запрещенной в 2010 году &laquo;Армия воли народа&raquo;.</p><p>Участники ИГПР &laquo;ЗОВ&raquo; (по делу, помимо Соколова, проходили экс-главред газеты &laquo;Дуэль&raquo; <a href="http://politpressing.org/data/55bc0aa9a240860c00d12b3b"><strong>Юрий Мухин</strong></a> и его соратники <a href="http://politpressing.org/data/55bc080ca240860c00d12b33"><strong>Валерий Парфенов</strong></a> и <a href="http://politpressing.org/data/5674076f9cd5260c00d66eaf"><strong>Кирилл Барабаш</strong></a>) были арестованы спустя пять лет после запрета &laquo;Армии воли народа&raquo;. Движение &laquo;АВН&raquo; было запрещено как экстремистское после того, как суд посчитал экстремистской листовку с требованием о проведении референдума для принятия поправки в Конституцию, которая обязывает всех чиновников, включая высшее руководство страны, подробно отчитываться перед народом о своей деятельности, и дает россиянам право судить чиновников, плохо справляющихся со своими обязанностями.</p><p>Активисты ИГПР &laquo;ЗОВ&raquo; не скрывали своих идей, но чтобы установить роль каждого из ныне осужденных в деятельности группы, к ним был внедрен оперативник &mdash; его настоящее имя в уголовном деле не называется.</p><p>По версии следствия, роль Соколова в ИГПР &laquo;ЗОВ&raquo; невелика: он какое-то время администрировал сайт группы. Тем не менее обвинение посчитало, что этого достаточно, чтобы отправить журналиста под арест.</p><p>Первый обыск дома у Соколова прошел в феврале 2014 года, вскоре после защиты диссертации о влиянии рентоориентированного поведения на инвестиции российских государственных корпораций. В ней он подробно исследовал механизмы работы госкорпораций &mdash; в том числе &laquo;Росатома&raquo;, &laquo;Ростеха&raquo; и &laquo;Роснано&raquo;, &mdash; а также расходы на проведение Олимпиады в Сочи.</p><p>Арестован Соколов был после того, как устроился на работу в РБК и стал автором нескольких резонансных расследований: о строительстве космодрома &laquo;Восточный&raquo;, доходах чиновников и вербовке россиян для участия в войне на Донбассе. Одним из аргументов следствия для заключения Соколова в СИЗО были его переговоры о поездке в Вашингтон для обучения в Центре исследования коррупции и организованной преступности.</p><p>Владимир Путин дважды <a href="http://www.rbc.ru/politics/23/12/2016/585d18ee9a79477fe1634c0c">обещал</a> разобраться в деле ИГПР &laquo;ЗОВ&raquo; и правомерности ареста Соколова. Но несмотря на большой общественный резонанс, журналисту даже не изменили меру пресечения, а 10 августа 2017 года он был приговорен к трем с половиной годам колонии общего режима. Парфенов и Барабаш, проходившие с ним по одному делу, получили четыре года колонии (в декабре Мосгорсуд сократил им сроки на два месяца), Мухин &mdash; четыре года условно.</p>'
    },
    demushkin: {
      name: 'Дмитрий Демушкин',
      role: 'лидер националистов',
      refer: 'politicians',
      referTitle: 'Преследование оппозиционных политиков: Как политические взгляды становятся поводом для заведения неоднозначных уголовных дел',
      photo: 'demushkin.jpg',
      cr: 'Фото: twitter @DmitryDemushkin',
      intro: 'История радикального националиста и организатора «Русских маршей», осужденного за посты в соцсетях',
      abstract: 'по версии следствия и суда, опубликовал в соцсетях посты, возбуждающие межнациональную рознь',
      quote: '«Лидеры националистов, фронтмены не могут себе позволить уехать на Украину и где-то сидеть. Почитайте воспоминания белогвардейцев: обивать пороги чужих разведок и всяких там информцентров — это не для меня. Я лучше здесь буду сидеть, чем бегать там и искать, кому я нужен».',
      content: '<p>38-летний <strong>Дмитрий Демушкин</strong> &mdash; ветеран ультраправого движения и один из немногих публичных политиков среди крайних националистов. В середине 1990-х участвовал в первых группировках наци-скинхедов, появившихся в Москве, затем стал одним из лидеров &laquo;Русского национального единства&raquo; &mdash; ультранационалистического движения, которое развалилось к 2000 году.</p><p>Далее Демушкин занимался самыми разными проектами: развивал собственную спортивную школу ножевого боя, участвовал в казачьих объединениях, в кампании за вынос тела Ленина из Мавзолея и защищал жителей находящегося на территории Москвы поселка Речник, которым грозило выселение. </p><p>Кроме того, Демушкин был лидером организации &laquo;Славянский союз&raquo; &mdash; в ней, в основном, состояли правые скинхеды, которые тяготели к неонацистской эстетике. &laquo;Славянский союз&raquo; обеспечивал юридическую поддержку Александру Копцеву, напавшему с ножом на посетителей синагоги, и Николаю Королеву с его подельниками, устроившими взрыв с многочисленными жертвами на Черкизовском рынке.</p><p>В 2010 году &laquo;Славянский Союз&raquo; был запрещен судом как экстремистская организация. Тогда Демушкин переименовал ее в &laquo;Славянскую силу&raquo;, что привело к появлению уголовного дела по части 1 статьи 282.2 УК (организация деятельности экстремистского объединения): Демушкину вменяли продолжение деятельности запрещенной организации. Дело закончилось штрафом в 2014 году, от уплаты которого националист был освобожден в связи с истечением срока давности. </p><p>Демушкин критиковал власть с националистических позиций и участвовал в протестах &laquo;белоленточников&raquo; в 2011-2012 годах в Москве, но одновременно сотрудничал с Рамзаном Кадыровым. Он не видел в этом противоречий и участвовал во всем, что могло помочь продвижению националистической повестки.</p><p>Проблемы с властями у Демушкина начались с конца 2014 года, когда, по его словам, он отказал властям в просьбе не проводить &laquo;Русский марш&raquo; &laquo;в связи со сложной обстановкой вокруг Украины&raquo;, а также не согласился на требование ФСБ привлекать ультраправых к участию в боевых действиях на Донбассе на стороне ДНР и ЛНР и внедрять агентов в украинские добровольческие батальоны.</p><p>В октябре 2016 года, во время подачи очередной заявки на &laquo;Русский марш&raquo;, Демушкина задержали и поместили под домашний арест по уголовному делу о возбуждении национальной ненависти, заведенному за публикации во &laquo;ВКонтакте&raquo;. В мае 2017 года он получил два с половиной года лишения свободы &mdash; за две публикации в соцсетях. Причем один &laquo;преступный эпизод&raquo; &mdash; это фотография баннера &laquo;России &mdash; русскую власть&raquo; с &laquo;Русского марша&raquo; 2014 года. На самом марше к лозунгу у полиции претензий не было.</p>'
    }
  },
  topics: {
    assembly: {
      name: 'Свобода собраний',
      refer: 'dadin',
      referTitle: 'Ильдар Дадин: История гражданского активиста, оказавшегося в колонии за пикеты',
      photo: 'assembly.jpg',
      cr: 'Задержания на Пушкинской площади в Москве 26.03.2017/Фото из YouTube канала Анны Краснопёровой',
      abstract: 'С пикета в колонию. Как граждане России лишились права на массовые гражданские акции',
      content: '<p>В 2014 году власть ужесточила законодательство о массовых мероприятиях, среагировав таким образом на события на Майдане, а также на массовые сходы москвичей в феврале в дни оглашения приговора по &laquo;Болотному делу&raquo; и в марте &mdash; против решения Совета Федерации о возможности ввода войска на территорию Украины. По мнению авторов законопроекта, он призван бороться с &laquo;рецидивами нарушений&raquo; на массовых мероприятиях.</p><p>В связи с этим в 2015 году в судебной практике существенно выросло число административных и появилось несколько уголовных дел, по сути ограничивающих свободы собраний. 16 января было впервые применено наказание за &laquo;повторное&raquo; нарушение порядка проведения публичных мероприятий (часть 8 статьи 20.2 КоАП &mdash; от 150 тысяч до 300 тысяч рублей штрафа или до 30 суток ареста) и заведено дело за &laquo;неоднократные&raquo; нарушения такого рода (статья 212.1 УК &mdash; до пяти лет лишения свободы). Первыми, к кому были применены обе эти статьи, стали московские активисты, постоянные участники уличных протестов <a href="http://politpressing.org/data/54d60658d2c8da030014093e"><strong>Марк Гальперин</strong></a> и <a href="http://politpressing.org/data/54d619e1d2c8da030014094d"><strong>Владимир Ионов</strong></a>. </p><p>Всего известно о четырех делах, заведенных по статье 212.1 УК. Все четверо обвиняемых &mdash; помимо Ионова и Гальперина, ими стали <a href="http://politpressing.org/data/54d5f5dbd2c8da0300140932"><strong>Ильдар Дадин</strong></a> и <a href="http://politpressing.org/data/5578ab5a432cab03003351b0"><strong>Ирина Калмыкова</strong></a> &mdash; постоянные участники протестных мероприятий в Москве &mdash; либо одиночных пикетов, либо несогласованных малочисленных акций. Дела на них были заведены на основе судебных решений, вынесенных ранее за административные правонарушения, то есть за участие в акциях. Дела Ионова, Дадина и Калмыковой дошли до суда, но только дело Дадина закончилось приговором (три года колонии, которые позже были сокращены до двух с половиной). Ионов и Калмыкова покинули Россию, не дожидаясь приговора. Дело Гальперина до сих пор находится у следственных органов; с июня 2017 года активист помещен под домашний арест уже по другому делу.</p><p>После того, как Дадин сообщил о пытках в колонии, его история вызвала широкий резонанс. В феврале 2017 года Конституционный суд, рассмотрев жалобу Дадина на статью 212.1 УК, объявил ее соответствующей Конституции, но рекомендовал применять только в тех случаях, когда &laquo;неоднократные нарушения&raquo; были общественно опасны. Дадин был освобожден.</p><p>После приговора Дадину новые дела по статье 212.1 УК, по всей видимости, не возбуждались. Калмыкова в феврале 2016 года была объявлена в розыск, однако уже 31 мая ее дело вернули в прокуратуру. В декабре 2017 суд вернул в прокуратуру дело Ионова. Завести дело по этой статье могут в том случае, если у человека, на которого составили административный протокол о нарушении на публичном мероприятии, уже есть три вступивших в силу обвинительных решения по той же административной статье в течение полугода.</p><p>В последнее время преследование постоянных участников протестных акций ограничивается применением части 8 статьи 20.2, которая позволяет сурово наказывать за &laquo;нарушение&raquo; на акции, если у человека уже есть хотя бы одно вступившее в силу судебное решение за аналогичное &laquo;нарушение&raquo; в течение года: &laquo;нарушителей&raquo; приговаривают к штрафам до 300 тысяч рублей или отправляют под арест до 30 суток. Большое количество решений по этой части статьи 20.2 вынесено в отношении московских активистов <strong>Виктора Капитонова</strong>, имеющего инвалидность, и <strong>Романа Рословцева</strong>, которого неоднократно задерживали в центре Москвы за прогулки в маске Путина с плакатом против статьи 212.1 УК.</p><p>В декабре 2016 года в Москве в районный суд обратился Центр по противодействию экстремизму с просьбой передать материалы административного дела активиста <strong>Игоря Клочкова</strong> следователям для возбуждения уголовного дела. Однако защитник Николай Зборошенко убедил суд, что для этого нет оснований: предыдущие судебные постановления Клочкова по статье 20.2 КоАП, необходимые для возбуждения дела о &laquo;неоднократных нарушениях&raquo;, на тот момент не вступили в силу.</p><p>Известны случаи, когда уже в 2017 году представители правоохранительных органов угрожали активистам делами по статье 212.1 УК.</p><p>Вместе с тем российская власть продолжила законодательно ограничивать свободы собраний. В начале 2016 года автопробеги и одиночные пикеты с использованием &laquo;сборно-разборных конструкций&raquo; &mdash; то есть палаток и агитационных кубов&nbsp;&mdash; были приравнены к митингам, что значит, что такие мероприятия нельзя проводить без согласования с местными властями. В июне 2017 года был принят законопроект, запрещающий депутатам встречаться с избирателями без согласования. Таким образом граждане России лишились последней легальной возможности для спонтанного массового выхода на улицу &mdash; народных сходов. Кроме того, власти почти всех регионов все чаще отказывают активистам в согласовании мероприятий, либо отправляют протестовать из центра города на окраины.</p>'
    },
    internet: {
      name: 'Свобода слова',
      refer: 'moroshkin',
      referTitle: 'Алексей Морошкин: История бывшего ополченца ДНР, который призвал в интернете создать УНР — Уральскую народную республику',
      photo: 'internet.jpg',
      cr: '',
      abstract: 'Тюрьма за посты и репосты в интернете',
      content: '<p>В 2015 году количество уголовных преследований за высказывания в интернете, в том числе сопровождающихся лишением свободы, сильно увеличилось. К ответственности привлекались как авторы текстов &mdash; например, челябинец <a href="http://politpressing.org/data/56a0c8779cd5260c00d66fd4"><strong>Алексей Морошкин</strong></a>, который писал в сети посты с призывом создать Уральскую народную республику, &mdash; так и люди, которые делали перепосты чужих записей, причем большую часть дел составляют именно перепосты.</p><p>Нередко лишение свободы как мера наказания по статьям о призывах к экстремистской деятельности, возбуждении ненависти или призывах к нарушению территориальной целостности России объяснялась обстоятельствами, с высказываниями в интернете напрямую не связанными. Так, в первом деле жителя Твери <a href="http://politpressing.org/data/56d89aff526ac70f00bbbe3b"><strong>Андрея Бубеева</strong></a>, помимо возбуждения ненависти (статья 282 УК), присутствовало обвинение в хранении оружия, кроме того, он скрылся от следствия. При этом после того, как приговор по первому делу (год колонии-поселения) в сентябре 2015 года вступил в силу, Бубеева не отправили в колонию-поселение, но завели на него новое дело &mdash; теперь уже только за посты в соцсетях, по статьям о призывах к экстремистской деятельности (статья 280 УК) и к нарушению территориальной целостности РФ (статья 280.1 УК). 5 мая 2016 года Бубеев был приговорен к двум годам и трем месяцам колонии-поселения с учетом предыдущего срока. В декабре было принято решение о его переводе в колонию общего режима в связи с якобы имевшими место многократными нарушениями. Бубеев вышел на свободу в августе 2017 года и почти сразу уехал из России.</p><p>Часто свободы лишают тех, кто ранее уже подвергался уголовному преследованию за высказывания в интернете, но отделался условным наказанием или штрафом. Как в случае с жителем Череповца <strong>Александром Сойминым</strong>, который 1 декабря 2015 года был приговорен к полутора годам колонии общего режима за фотографии драк участников Майдана с милицией и &laquo;Беркутом&raquo;, снабженные подписями &laquo;Мочи ментов!&raquo;, а также коллажи с &laquo;изображением человека, похожего на Путина&raquo;: в январе 2014 года его приговорили к штрафу в 20 тысяч рублей по обвинению в призывах к экстремистской деятельности за некие фотографии и тексты, призывающие к агрессии и дискриминации нерусских и не славян.</p><p>Суровый приговор получил директор Татарского общественного центра в Набережных Челнах <a href="http://politpressing.org/data/54c3a45dbf69b50300391928"><strong>Рафис Кашапов</strong></a> &mdash; три года колонии общего режима за четыре сообщения на странице в соцсети &laquo;ВКонтакте&raquo;, где он резко критиковал Путина и российское правительство за политику в отношении Украины и осудил гонения на крымских татар в оккупированном Крыму. Это отчасти может объясняться тем, что в 2009 году он был приговорен к полутора годам условно за ряд статей, посвященных насильственной русификации и христианизации на территории России. Кашапов вышел на свободу в конце декабря 2017 года.</p><p>Однако известны и случаи, когда не просматриваются никакие &laquo;дополнительные&raquo; основания для лишения свободы людей, преследуемых за републикацию в интернете. Так, лидер движения &laquo;Русские Астрахани&raquo; <a href="http://politpressing.org/data/573334756d8a0b0a00be6212"><strong>Игорь Стенин</strong></a> 16 мая 2016 года был приговорен к двум годам колонии-поселения за публикацию записи в соцсети на тему войны на территории Украины, а также комментария другого пользователя, который следствие ошибочно приняло за репост. Позднее Стенин был переведен в колонию общего режима за якобы имевшие место злостные нарушения порядка. До этого у Стенина был только штраф по административному делу о распространении материала, ошибочно признанного запрещенным. 30 мая 2017 года дело Стенина было прекращено в связи с отсутствием состава преступления, 2 июня он вышел на свободу. Прокуратура обжаловала прекращение дела, и в декабре 2017 приговор Стенину вновь был признан законным.</p><p>Иногда лишить свободы за высказывания в интернете могут заметного в регионе политического деятеля. 21 декабря 2015 года к двум годам колонии-поселения за картинки в соцсетях, воспринятые как призывы к экстремизму и сепаратизму, была приговорена кубанская активистка <a href="http://politpressing.org/data/54557e4759961b02004cb46d"><strong>Дарья Полюдова</strong></a>, одна из организаторов несогласованного Марша за федерализацию Кубани, сильно разозлившего местные власти (20 октября 2017 года она вышла на свободу). Впрочем, и Стенин полагает, что причиной преследования стало то, что он мешал местным властям.</p><p>Но мало чем можно объяснить год колонии-поселения для москвича <a href="http://up.d4s.io/persons/581e2d4a4e5bf80d349e9247"><strong>Евгения Корта</strong></a> за републикацию картинки с людьми, похожими на Александра Пушкина и националиста Максима &laquo;Тесака&raquo;&nbsp;Марцинкевича, или полгода колонии для жительницы Екатеринбурга <strong>Евгении Чудновец</strong> за републикацию видео со сценой издевательства над ребенком &mdash; по словам Чудновец, ее целью было привлечение внимания общественности к проблеме. Оба приговора были вынесены в ноябре 2016 года. Впрочем, в январе 2017 года суд второй инстанции заменил Корту лишение свободы штрафом, а в марте 2017-го был отменен приговор Чудновец &mdash; ее дело было прекращено, а сама она освобождена из колонии.</p><p>К лишению свободы может привести и административное дело, связанное с публикациями в интернете, &mdash; здесь могут быть применены статьи о распространении экстремистских материалов (статья 20.29 КоАП) или о публичном демонстрировании нацистской символики или символики экстремистских организаций (статья 20.3 КоАП). По этим статьям нередко помещают под арест активистов, например, в преддверии каких-то акций (так, волгоградский националист <strong>Анатолий Болтыхов</strong> был арестован на десять суток в день проведения &laquo;Русского марша&raquo; за публикацию плаката с символикой &laquo;Правого сектора&raquo;). Привлечение к ответственности за репосты также может быть частью большой истории преследования активиста &mdash; так, упоминавшуюся выше Дарью Полюдову в период, когда она находилась под следствием, но уже вышла из СИЗО, арестовали из-за того, что на ее странице в соцсетях была обнаружена публикация с использованием свастики.</p><p>О преследовании за высказывания в рамках антитеррористического законодательства можно узнать подробнее в разделе &laquo;Приписанный терроризм&raquo;.</p>'
    },
    'false-terror': {
      name: 'Приписанный терроризм',
      refer: 'sencov',
      referTitle: 'Олег Сенцов: Российское гражданство насильно и 20 лет строгого режима. История крымского режиссера',
      photo: 'false-terror.jpg',
      cr: '',
      abstract: 'Взрыв петарды, пост в ЖЖ и другие поводы для ареста по антитеррористической статье',
      content: '<p>Преследование по уголовным статьям за &laquo;терроризм&raquo; в 2015-2016 годах весьма популярно, и судя по всему оно будет набирать обороты. Заявления власти о необходимости бороться с международным терроризмом подкрепляются принятием законов, призванных ужесточить борьбу с ним. По &laquo;террористическим&raquo; статьям наказывают строже, чем, например, по &laquo;экстремистским&raquo;, существенная часть преследований заканчивается реальными и нередко довольно большими сроками.</p><p>Обвинение в совершении или подготовке террористических актов (статья 205 УК), как в &laquo;Деле крымских террористов&raquo;, редко становится инструментом политического преследования. По этой статье в апреле 2016 года были приговорены к срокам&nbsp;&mdash; преимущественно в колонии строгого режима &mdash; пятнадцать мусульман, проходивших по делу о подготовке теракта в московском кинотеатре &laquo;Киргизия&raquo;. Правозащитный центр &laquo;Мемориал&raquo; признал всех обвиняемых политическими заключенными: доказательства обвинения в суде были неубедительными, а преследование, вероятно, связано с религиозной принадлежностью подсудимых.</p><p>В подготовке теракта у нижегородского областного военкомата был обвинен анархист <strong>Илья Романов</strong>: поводом послужила петарда, взорвавшаяся у него в руках, в результате чего он потерял кисть левой руки. По версии следствия, Романов готовился совершить теракт, чтобы повлиять на политику региональных властей.</p><p>Среди статей &laquo;террористического пакета&raquo; в политических делах чаще 205-й используется статья 205.2 УК &mdash; публичные призывы к терроризму или публичное оправдание терроризма. Эта статья карает за высказывания, и иногда строже, чем статьи &laquo;экстремистского пакета&raquo;. Дело по ней завели и на Илью Романова &mdash; за интервью, данное в 2012 году в Донецке. В августе 2015 года по обвинению в якобы несостоявшемся теракте, изготовлении взрывчатки и за интервью Романов был приговорен к десяти годам колонии строгого режима, в декабре Верховный суд сократил срок на год. В марте 2017 года стало известно, что на Романова завели новое дело по статье 205.2 УК.</p><p>В апреле 2015 года к трем годам колонии строгого режима за призывы к терроризму был приговорен радикальный публицист <strong>Борис Стомахин</strong>, который к тому времени уже находился в колонии по приговору по этой же статье. </p><p>Но самой популярной из &laquo;террористических статей&raquo; в сфере преследования по политическим мотивам является статья 205.5 УК &mdash; создание террористической организации и участие в ее деятельности. В 2015 и 2016 годах она стала и одной из самых часто применяемых &laquo;политических&raquo; статей вообще.</p><p>Обвиняемые и осужденные по этой статье &mdash; члены исламистской партии &laquo;Хизб ут-Тахрир&raquo;. Члены партии выступают за создание всемирного халифата на территории всех современных государств. В течение многих лет предполагаемых членов &laquo;Хизб ут-Тахрир&raquo; обвиняли в создании либо участии в деятельности экстремистской организации &mdash; 1-я или 2-я часть статьи 282.2 УК. Но с февраля 2014 года, через несколько месяцев после того, как в Уголовном кодексе появилась &laquo;террористическая&raquo; статья, применять стали именно ее, поскольку &laquo;Хизб ут-Тахрир&raquo; запрещена как террористическая организация. При этом никаких доказательств причастности этой партии к терроризму или даже просто насильственной деятельности нет. Кроме того, людям, преследуемым за связи с &laquo;Хизб ут-Тахрир&raquo;, как правило, не вменяются никакие конкретные действия, имеющие отношения к терроризму: по делам &laquo;тахрировцев&raquo; для того, чтобы обвинить человека в участии в террористической организации, достаточно установить, что он присутствовал на встречах, изучал литературу и привлекал к этому других людей &mdash; то есть занимался обычной партийной деятельностью. Насколько доказывается сама причастность к &laquo;Хизб ут-Тахрир&raquo; и каким образом добываются доказательства, как правило, достоверно не известно.</p><p>Практически все приговоры &laquo;тахрировцам&raquo; связаны с лишением свободы, причем тех, кого суд признал организаторами, приговаривают к продолжительным срокам в колониях строгого режима. &laquo;Рядовых участников&raquo; чаще отправляют в колонии общего режима. Редкие условные приговоры заменяются в апелляционных инстанциях реальными. Так произошло с уфимцами <a href="http://politpressing.org/data/55f06b28100f690d002650c9"><strong>Ринатом Мамаевым</strong></a> и <a href="http://politpressing.org/data/55f069bb100f690d002650ba"><strong>Ришатом Гатауллиным</strong></a>: в отличие от большинства других обвиняемых по делу, они признали вину в причастности к террористической организации, были переведены из СИЗО под домашний арест (в то время как не признавшие вину остались в СИЗО), и в декабре 2016 года были приговорены к условным срокам. Но в марте 2017 года военная коллегия Верховного суда присудила обоим по четыре года колонии общего режима. Аналогичная история произошла с жителями Нижневартовска <a href="http://politpressing.org/data/5916284f77cf90857a79d21a"><strong>Русланом Шамсутдиновым</strong></a>, <a href="http://politpressing.org/data/5916260177cf90857a79d214"><strong>Ринатом Багавеевым</strong></a>, <a href="http://politpressing.org/data/5916222b77cf90857a79d211"><strong>Зайдом Хусаиновым</strong></a> и <a href="http://politpressing.org/data/5916278b77cf90857a79d217"><strong>Ильдаром Габдракиповым</strong></a> &mdash; 22 февраля 2017 года они получили условные сроки и штрафы (помимо причастности к террористической организации, трое из них обвинялись в возбуждении ненависти), но прокуратура обжаловала это решение, и 27 июля Верховный суд заменил условные приговоры различными сроками в колонии общего режима.</p><p>В некоторых случаях к обвинениям в организации или участии в деятельности террористической организации добавляется обвинение в подготовке к насильственному захвату власти (статья 278 УК через часть 1 статьи 30), при том что все равно никакие конкретные действия, непосредственно связанные с этой подготовкой, не вменяются. Так случилось с подельниками упомянутых выше Мамаева и Гатауллина, отказавшимися признать вину в причастности к террористической организации.</p><p>Благодатным местом для заведения &laquo;террористических&raquo; дел стал Крым, поскольку украинское государство &laquo;Хизб ут-Тахрир&raquo; не запрещало. Подавляющее большинство обвиняемых по крымским делам &laquo;Хизб ут-Тахрир&raquo; &mdash; крымские татары. С начала 2015 года на территории полуострова заведено уже пять дел. Первое из них было доведено до суда, четверо человек &mdash; севастопольцы <a href="http://politpressing.org/data/54e492122c869703008010b3"><strong>Руслан Зейтуллаев</strong></a>, <a href="http://politpressing.org/data/54e85fa9f07a780300283be6"><strong>Нури Примов</strong></a>, <a href="http://politpressing.org/data/54e86259f07a780300283bee"><strong>Рустем Ваитов</strong></a> и <a href="http://politpressing.org/data/5656f7fa9cd5260c00d66e29"><strong>Ферат Сайфуллаев</strong></a> &mdash; в сентябре 2016 года были приговорены к лишению свободы в колонии общего режима. Однако гособвинитель посчитал приговор Зейтуллаеву &mdash; семь лет общего режима &mdash; чересчур мягким, потому что следствие называло его главой ячейки, а суд переквалифицировал ему обвинение с организации на участие. В результате суд второй инстанции вернул дело Зейтуллаева на доследование, и 26 апреля 2017 года Зейтуллаев был приговорен уже к 12 годам колонии строгого режима. Но прокуратура оспорила и этот приговор, и 27 июля Зейтуллаеву добавили еще три года.</p><p>В 2017 году в суд было передано еще одно крымское дело &laquo;Хизб ут-Тахрир&raquo; в отношении шести человек. Среди них &mdash; видный крымский правозащитник <a href="http://politpressing.org/data/5662b70c9cd5260c00d66e69"><strong>Эмир-Усеин Куку</strong></a>. <a href="http://politpressing.org/data/56c232059707fa0f00638d84"><strong>Вадим Сирук</strong></a> и <a href="http://politpressing.org/data/56c22c329707fa0f00638d7f"><strong>Энвер Бекиров</strong></a>, проходящие по тому же делу, обвиняются, помимо участия в деятельности террористической организации, в приготовлении к насильственному захвату власти. Еще девять жителей Крыма, обвиненных в причастности к организации, находятся под следствием.</p><p>В июле 2016 года было принято два законопроекта &mdash; &laquo;пакет Яровой&raquo;, по имени одного из авторов, &mdash; существенно ужесточающих наказание по статьям об экстремизме и терроризме, в том числе по статьям 205.2 и 205.5 УК. В декабре к двум годам колонии-поселения по статье 205.2 УК был приговорен тюменский блогер <a href="http://politpressing.org/data/56e5f9bf5fe7610f00648e53"><strong>Алексей Кунгуров</strong></a> за публикацию в &laquo;Живом журнале&raquo;, посвященную ситуации в Сирии, которая была расценена как оправдание терроризма.</p>'
    },
    ukraine: {
      name: 'Украина как повод',
      refer: 'karpuk-klyh',
      referTitle: 'Николай Карпюк и Станислав Клых: История двух украинцев, обвиненных в участии в боевых действиях в Чечне и убийстве российских военнослужащих в 1994—1995 годах',
      photo: 'ukraine.jpg',
      cr: '',
      abstract: 'Как украинский контекст влияет на появление и расследование уголовных дел',
      content: '<p>Тема Украины, остро зазвучавшая в уголовных делах из-за событий 2014 года, не теряла актуальности в 2015 и 2016 году (правда, в 2016-м, в основном, продолжались дела, начатые ранее): связь обвиняемого или его дела с Украиной нередко становилась основанием для политического преследования.</p><p>В 2015 году появилось около десяти политически мотивированных дел, связанных с Украиной. Большая часть заведена за публикации в интернете. Среди других поводов: причастность к признанной экстремистской организации &laquo;Народный рух Украины&raquo; (дело симферопольского священника Украинской православной церкви Киевского патриархата <a href="http://politpressing.org/data/567b14ed9cd5260c00d66ed6"><strong>о. Сергия (Климакина</strong>)</a> &mdash; участие в экстремистской организации), нанесение на бетонную плиту символики Украинской повстанческой армии (дело саратовских активистов движения &laquo;Народная воля&raquo; <strong>Андрея Марцева</strong> и <strong>Кирилла Каблова</strong> &mdash; вандализм по мотивам ненависти, дело возвращено в прокуратуру), звонок в украинское посольство с сообщением о возможной отправке военнослужащих на территорию Украины (дело жительницы Смоленска <strong>Светланы Давыдовой</strong> &mdash; государственная измена, дело прекращено), работа в библиотеке (дело директора московской Библиотеки украинской литературы <a href="http://politpressing.org/data/56452c05dc622c0b003b77d3"><strong>Натальи Шариной</strong></a> &mdash; возбуждение национальной ненависти в виде распространения книги Дмитро Корчинского, предположительно, подброшенной при обыске, приговор &mdash; четыре года лишения свободы условно).</p><p>Упомянутых выше людей можно в той или иной степени называть критиками действующей российской власти &mdash; как минимум, в вопросах, связанных с Украиной. Однако известно по крайней мере об одном &laquo;украинском&raquo; деле, заведенном на человека, поддерживающего власть, где также усматриваются элементы политического преследования. Это дело екатеринбургского &laquo;магистра магии вуду&raquo; <a href="http://politpressing.org/data/56c9a1cc53c9910a00b82965"><strong>Антона Симакова</strong></a>, которого обвиняют в оскорблении чувств верующих за то, что, выполняя обряд с окроплением обезглавленного петуха кровью, он использовал предметы православного культа. Симаков заявлял, что его обряд направлен против украинских политиков и в поддержку сепаратистов Донбасса. 12 апреля 2016 года решением суда он был направлен в психиатрический стационар, в январе 2017 года вышел из клиники.</p><p>В 2015 и 2016 годах были завершены дела: о нанесении граффити с символикой батальона &laquo;Азов&raquo; на опоре моста (дело жителя Владимира <strong>Валентина Логинова</strong> &mdash; вандализм по мотивам ненависти, два года ограничения свободы), о вывешивании флага Германии по аналогии с вывешиванием российских флагов в украинских городах (дело калининградцев <a href="http://politpressing.org/data/54d8a00dba31490300a3504b"><strong>Олега Саввина</strong></a>, <a href="http://politpressing.org/data/54d8a6e5ba31490300a3505d"><strong>Михаила Фельдмана</strong></a> и <a href="http://politpressing.org/data/54d8b044ba31490300a3506d"><strong>Дмитрия Фонарева</strong></a> &mdash; приговорены к срокам, которые отсидели к моменту вынесения судебного решения), о вывешивании флага Украины на высотном здании и раскрашивании звезды в цвета флага (дело москвичей &mdash; руфера <a href="http://politpressing.org/data/5532919b857a630300bb3c28"><strong>Владимира Подрезова</strong></a> и парашютистов <a href="http://politpressing.org/data/553212cea9b894030088cc76"><strong>Александра Погребова</strong></a>, <a href="http://politpressing.org/data/5532900a857a630300bb3c25"><strong>Алексея Широкожухова</strong></a>, <a href="http://politpressing.org/data/5532125ba9b894030088cc73"><strong>Анны Лепешкиной</strong></a> и <a href="http://politpressing.org/data/553211d7a9b894030088cc70"><strong>Евгении Коротковой</strong></a> &mdash; хулиганство и вандализм по мотивам ненависти, парашютисты оправданы (Широкожухов погиб в июле 2017 года), Подрезов приговорен к двум годам и трем месяцам колонии, позднее колония была заменена ограничением свободы), об акции с поджогом покрышек по аналогии с Майданом (дело петербургского художника <a href="http://politpressing.org/data/547495eb12a3410200acc231"><strong>Петра Павленского</strong></a> &mdash; вандализм, освобожден от наказания).</p><p>В 2015 году было заведено два дела в связи с событиями на киевском Майдане. Житель Крыма <a href="http://politpressing.org/data/5559963e3ed4430300c68a0c"><strong>Александр Костенко</strong></a> был обвинен в причинении вреда бойцу &laquo;Беркута&raquo;, а также в незаконном хранении оружия, и приговорен к трем годам и одиннадцати месяцам колонии общего режима, в 2016 году срок был сокращен до трех с половиной лет. Переехавший в Кабардино-Балкарию украинец <a href="http://politpressing.org/data/577ea8e069195b0c00019a58"><strong>Андрей Коломиец</strong></a> был обвинен в покушении на убийство бойцов &laquo;Беркута&raquo;, а также в хранении наркотиков, и приговорен к десяти годам колонии строгого режима. Оба дела велись в Крыму, поскольку там живут потерпевшие, получившие российское гражданство.</p><p>Впрочем, самым громким в этом ряду стало дело в отношении гражданки Украины, обвиненной в причастности к убийствам в ходе боевых действий. Это дело украинской летчицы <a href="http://politpressing.org/data/5425f051cfd5c302002491e2"><strong>Надежды Савченко</strong></a>, обвинявшейся в убийстве российских журналистов и незаконном переходе границы. Оно также было заведено в 2014 году и в 2015-м дошло до суда. 22 марта 2016 года Савченко была приговорена к 22 годам колонии общего режима. 25 мая стало известно о ее помиловании, в этот же день Савченко улетела домой.</p><p>Совсем по-иному сложилась судьба у украинцев <a href="http://politpressing.org/data/56c61ca153c9910a00b82949"><strong>Николая Карпюка</strong></a> и <a href="http://politpressing.org/data/56c61f9953c9910a00b82950"><strong>Станислава Клыха</strong></a>: они были приговорены к 22 и 20 годам колонии строгого режима соответственно по обвинению в участии в боевых действиях в Чечне в середине 1990-х годов, где, по их словам, не были. Оба в настоящее время находятся в местах лишения свободы.</p><p>Еще одно дело &mdash; об убийствах и изнасиловании &mdash; было заведено в 2014 году в отношении украинца <a href="http://politpressing.org/data/57335c476d8a0b0a00be6223"><strong>Сергея Литвинова</strong></a>. Позднее это обвинение было снято (при этом Литвинов успел дать признательные показания &mdash; как он затем утверждал, под пытками), но в деле появился новый эпизод &mdash; о разбойном нападении на гражданина России на территории Украины. В деле есть показания украинских пограничников, которые утверждают, что потерпевшего в указанное время на территории Украины не было. Это дело также закончилось суровым приговором &mdash; в апреле 2016 года Литвинов был отправлен на восемь с половиной лет в колонию строгого режима.</p><p>В 2016 году новые дела, связанные с Украиной, практически не появлялись. Однако зафиксированы случаи других видов преследования или давления: <a href="https://ovdinfo.org/express-news/2016/07/09/otmenu-festivalya-raw-fest-obyasnili-borboy-s-ekstremizmom">отмена фестиваля</a>, участники которого выступали на территории Украины на мероприятиях, &laquo;направленных на сбор денежных средств на нужды АТО&raquo;; <a href="https://ovdinfo.org/express-news/2016/08/22/glavu-blagotvoritelnogo-fonda-deportiruyut-za-antirossiyskuyu-propagandu">депортация</a> украинца <strong>Павла Дученко</strong> &mdash; главы благотворительного фонда &laquo;Открытое сердце&raquo;; <a href="https://ovdinfo.org/express-news/2016/08/25/za-futbolku-slava-ukraine-byl-zaderzhan-pravozashchitnik-aleksey-manannikov">задержание</a> за футболку &laquo;Слава Украине&raquo; (не говоря о задержаниях на акциях в поддержку Украины); <a href="https://ovdinfo.org/express-news/2016/11/13/chlen-parnas-byl-vyzvan-v-centr-e-iz-za-pisma-v-genkonsulstvo-ukrainy">вызов в Центр по противодействию экстремизму</a> за письмо в генконсульство Украины с просьбой о разрешении посетить присоединенный к России Крым для проведения на его территории агитации перед выборами в российскую Госдуму.</p>'
    },
    ngo: {
      name: 'Преследование НКО',
      refer: 'cherevatenko',
      referTitle: 'Валентина Череватенко: Как помощь людям, оказавшимся в сложных ситуациях, становится «политической деятельностью». История директора фонда «Женщины Дона»',
      photo: 'ngo.jpg',
      cr: '',
      abstract: 'Как государство пытается превратить правозащитников в «иностранных агентов»',
      content: '<p>Статья 330.1 УК &mdash; злостное уклонение некоммерческих организаций, выполняющих функции &laquo;иностранного агента&raquo;, от исполнения обязанностей, обусловленных этим статусом &mdash; была включена в Уголовный кодекс еще в 2012 году, когда у Министерства юстиции не было полномочий вносить НКО в реестр &laquo;иностранных агентов&raquo; самостоятельно. Максимальное наказание по этой статье &mdash; два года лишения свободы. Поначалу власть, помимо собственно внесения НКО в реестр (теперь это уже может делать Минюст), ограничивалась крупными штрафами организациям за отказ ставить на своих публикациях, документах и сайтах маркировку &laquo;иностранного агента&raquo;. Единственный широко известный случай уголовного преследования за неисполнение закона об &laquo;иностранных агентах&raquo; &mdash; дело <a href="http://politpressing.org/data/57c6f1e08c93ed0c006fa629"><strong>Валентины Череватенко</strong></a>, которое удалось закрыть за отсутствием состава преступления.</p><p>Давление на правозащитные, экологические и другие общественные организации оказывают не только государственные органы, но и телевидение, на котором регулярно появляются передачи об &laquo;иностранных агентах&raquo;. Это создает нездоровую атмосферу ненависти, которая, по факту, поощряет насилие в отношении правозащитников. Формально мирные пикеты прокремлевских объединений против НКО зачастую оборачиваются нападениями. Так, например, весной 2016 года активисты &laquo;Национально-освободительного движения&raquo; (НОД) <a href="https://ovdinfo.org/express-news/2016/04/28/v-moskve-napali-na-uchastnikov-istoricheskogo-konkursa-organizacii-memorial">закидали</a> яйцами и облили зеленкой участников исторического конкурса &laquo;Человек в истории. Россия &mdash; XX век&raquo;, организованного Международным обществом &laquo;Мемориал&raquo;. Такое же <a href="https://ovdinfo.org/express-news/2016/03/17/na-igorya-kalyapina-napali-v-groznom">нападение</a> было совершено на главу &laquo;Комитета против пыток&raquo; Игоря Каляпина, когда он приехал в Грозный на встречу с журналистами, которых до этого атаковали неизвестные на границе Чечни и Ингушетии. Годом ранее офис руководимой Каляпиным Сводной мобильной группы в Грозном <a href="https://ovdinfo.org/express-news/2015/06/03/v-chechne-soversheno-napadenie-na-ofis-svodnoy-mobilnoy-gruppy">подвергся нападению</a>. Этому предшествовало заявление главы Чечни Рамзана Кадырова о том, что Каляпин финансирует террористов.</p><p>Вынужден был покинуть Россию <a href="http://politpressing.org/persons/551e8f8bb711c703002fcd85"><strong>Михаил Савва</strong></a> &mdash; бывший руководитель НКО в Краснодарском крае. Еще в 2013 году на него завели дело о якобы растрате государственного финансирования. Сначала его отправили в СИЗО, потом перевели под домашний арест, затем дали три года условно. В 2015 году на Савву завели аналогичное уголовное дело, а первый приговор, уже заочно, поменяли на три года колонии-поселения.</p>'
    },
    tatars: {
      name: 'Преследование крымских татар',
      refer: 'chiygoz',
      referTitle: 'Ахтем Чийгоз: История зампреда Меджлиса крымскотатарского народа, который не хотел признавать новую крымскую власть',
      photo: 'tatars.jpg',
      cr: 'Фото: Радио Свобода',
      abstract: 'Как Россия, присоединив Крым, ведет себя с несогласными жителями полуострова',
      content: '<p>Крымские татары постоянно подвергаются преследованию после присоединения Крыма к России, в частности, уголовному. Несколько человек обвинены в причастности к массовым беспорядкам 26 февраля 2014 года в Симферополе, когда возле парламента произошли столкновения между сторонниками и противниками Евромайдана &mdash; под судом оказались представители только одной стороны конфликта.</p><p>Но &laquo;Дело 26 февраля&raquo; &mdash; не единственное уголовное дело, заведенное на крымских татар после присоединения Крыма. В другом разделе упоминаются дела, связанные с деятельностью &laquo;Хизб ут-Тахрир&raquo;, несколько человек уже приговорены к различным срокам лишения свободы. Кроме того, в 2014 году было заведено дело в связи с тем, что 3 мая несколько тысяч крымских татар прорвали кордон на КПП в Армянске, когда их духовного лидера Мустафу Джемилева не пускали на территорию полуострова. Пять человек были привлечены к ответственности по статье о применении насилия к сотрудникам правоохранительных органов (статья 318 УК). Они содержались под арестом, но затем вышли на свободу под поручительство. Позднее трое были приговорены к лишению свободы условно, еще один &mdash; к штрафу в 40 тысяч рублей, данные о судебном решении в отношении пятого обвиняемого найти не удалось.</p><p>Меджлис крымскотатарского народа 26 апреля 2016 года был признан экстремистской организацией и ликвидирован. На председателя Меджлиса <a href="http://politpressing.org/data/556afe286660300b00069619"><strong>Рефата Чубарова</strong></a>, заместителя председателя <a href="http://politpressing.org/data/5734f6f76d8a0b0a00be6275"><strong>Ильми Умерова</strong></a> и бывшего владельца крымскотатарского телеканала ATR <a href="http://politpressing.org/data/56523bd99cd5260c00d66e1c"><strong>Ленура Ислямова</strong></a> заведены дела о призывах к нарушению территориальной целостности России за высказывания о Крыме. 27 сентября 2017 года Умеров был приговорен к двум годам колонии-поселения, несмотря на то, что обвинение просило дать ему условный срок (25 октября стало известно, что Умеров помилован и передан Турции). Представителей Меджлиса время от времени вызывают в Центр по противодействию экстремизму, а мероприятия, связанные с историей крымских татар, власти отказываются согласовывать, участников задерживают и штрафуют.</p>'
    },
    attacks: {
      name: 'Убийства и нападения',
      refer: 'nemcov',
      referTitle: 'Борис Немцов: Самое громкое политическое убийство в России',
      photo: 'attacks.jpg',
      cr: 'Фото: Гринпис России',
      abstract: 'За что правозащитники, активисты и политики подвергаются нападениям и как расследуются эти дела',
      content: '<p>Убийство <strong>Бориса Немцова</strong> 27 февраля 2015 года, безусловно &mdash; самый громкий пример расправы с оппозиционером. И хотя политические убийства в России 2015-2016 годов не были массовыми, мониторинг ОВД-Инфо зафиксировал случаи, в которых общественная деятельность погибших и пострадавших могла стать причиной нападения.</p><p>В Санкт-Петербурге был убит <a href="https://ovdinfo.org/express-news/2015/10/07/ubit-muzh-lidera-iniciativy-obmanutyh-dolshchikov"><strong>Константин Андреев</strong></a>, муж лидера инициативы обманутых дольщиков ГК &laquo;Город&raquo; <strong>Аллы Андреевой</strong>. На машине активистки после убийства появилась надпись &laquo;Ты будешь следующей!&raquo;. В городе Коломна Московской области был убит депутат горсовета <a href="https://ovdinfo.org/express-news/2015/08/27/v-kolomne-ubit-deputat-gorodskogo-soveta"><strong>Сергей Голубцов</strong></a>. Он боролся против повышения цен на услуги ЖКХ, а также махинаций в бизнесе местных похоронных агентств. Незадолго до убийства на Голубцова напали и ранили ножом. В другом подмосковном городе, Оболенске, застрелен местный общественник <a href="https://ovdinfo.org/express-news/2016/09/01/v-moskovskoy-oblasti-ubit-pravozashchitnik"><strong>Эдуард Мусин</strong></a>, который занимался местными проблемами, например, защитой владельцев сносимых торговых павильонов, а также боролся против отмены выборов глав поселений и муниципалитетов.</p><p>Дважды &mdash; в 2015 и 2017 годах &mdash; в больницу после отравлений <a href="https://ovdinfo.org/express-news/2017/02/02/vladimir-kara-murza-snova-v-bolnice-s-simptomami-pohozhimi-na-otravlenie">попадал</a> координатор &laquo;Открытой России&raquo; <strong>Владимир Кара-Мурза</strong>. По его мнению, оба раза отравления были покушениями на его жизнь.</p><p>В 2015-2016 годах было много случаев нападений с явной угрозой для жизни активистов. Например, активист &laquo;Солидарности&raquo; <strong>Станислав Поздняков</strong> после <a href="https://ovdinfo.org/stories/2015/04/28/stanislav-pozdnyakov-oni-otrabatyvayut-novye-tehnologii">нападения</a> в подмосковной Балашихе попал в больницу с разрывом селезенки. В Балашиху Поздняков вместе с другими активистами приехал в качестве наблюдателя за выборами в местный Совет депутатов. После того, как Поздняков и еще один наблюдатель зафиксировали попытку вброса бюллетеней, на них напали около восьми человек, приехавшие на черном BMW без номеров, и сильно избили.</p><p>Жестокому нападению <a href="https://ovdinfo.org/express-news/2016/09/09/nochyu-neizvestnye-napali-na-lager-protivopozharnoy-ekspedicii-grinpis-i">подвергся</a> экологический лагерь противопожарной экспедиции &laquo;Гринпис&raquo; в Краснодарском крае. Нападавшие были в масках, вооружены дубинками, ножами и пистолетами, применили свето-шумовую гранату, серьезно избили экологов.</p><p>Нападения с ножами на активистов &mdash; априори представляющие угрозу для жизни &mdash; не являются редкостью в России. В Москве таковому <a href="https://ovdinfo.org/express-news/2016/06/17/aktivist-kotoromu-ugrozhal-glava-upravy-rayona-sokolniki-podvergsya">подвергся</a> <strong>Владимир Лавров</strong>, общественник, занимающийся проблемами района Сокольники. Неизвестные <a href="https://ovdinfo.org/express-news/2016/09/13/na-agitacionnyy-kub-spravedlivoy-rossii-napali-s-nozhom">угрожали</a> ножом и агитаторам &laquo;Справедливой России&raquo; в Челябинской области.</p><p>К серьезным травмам могут привести и другие нападения: у журналистки <strong>Елены Костюченко</strong> был <a href="https://ovdinfo.org/express-news/2016/09/08/u-zhurnalistki-eleny-kostyuchenko-obnaruzhen-ushib-mozga-posle-napadeniya">диагностирован</a> ушиб головного мозга &mdash; злоумышленники избили ее за то, что она делала репортаж из Беслана во время акции протеста. После <a href="https://ovdinfo.org/express-news/2016/07/13/lider-ulyanovskogo-otdeleniya-parnasa-gospitalizirovan-posle-izbieniya">избиения</a> арматурой лидер ульяновского отделения ПАРНАСа <strong>Александр Брагин</strong> получил травму шеи и сотрясение мозга, грозящее потерей зрения.</p><p>В создавшейся атмосфере агрессии и нетерпимости участились атаки неизвестных на правозащитников (подробнее описаны в разделе, посвященном преследованию некоммерческих организаций). Во время предвыборной кампании партии ПАРНАС регулярным <a href="https://ovdinfo.org/express-news/2016/02/11/aktivisty-nod-zabrosali-mihaila-kasyanova-yaycami">нападениям</a> и <a href="https://ovdinfo.org/express-news/2016/02/01/rukovodstvo-parnas-obvinilo-kadyrova-v-podstrekatelstve-k-ubiystvu">угрозам</a> подвергся <strong>Михаил Касьянов</strong>. Следует учесть, что в подавляющем большинстве случаев никто не понес никакую ответственность за эти действия.</p>'
    },
    bolotnaya: {
      name: '«Болотное дело»',
      refer: 'buchenkov',
      referTitle: 'Дмитрий Бученков: История арестованного по «Болотному делу» анархиста, которого не было на Болотной площади',
      photo: 'bolotnaya.jpg',
      cr: 'Фото: Евгений Фельдман/Новая Газета',
      abstract: 'Уголовное дело, задавшее стандарт в российской следственной практике по преследованию демонстрантов за столкновения с полицией',
      content: '<p>Дело о столкновении демонстрантов и полиции 6 мая 2012 года в Москве на Болотной площади остается одним из самых резонансных политических процессов в России. На данный момент 36 человек подверглись в рамках него уголовному преследованию: кто-то не просидел ни дня, попав под амнистию, но большая часть провела по несколько лет за решеткой. Много людей были вынуждены покинуть Россию, опасаясь, что также могут быть задержаны.</p><p>Стандартное обвинение по &laquo;Болотному делу&raquo; &mdash; участие в массовых беспорядках (часть 2 статьи 212 УК) и применение неопасного для жизни и здоровья насилия в отношении полицейского (часть 1 статьи 318 УК). Статья об участии в беспорядках была включена в список статей, подпадающих под амнистию, но так как большинство фигурантов дела также было обвинено и в нападении на полицию, амнистия их не коснулась.</p><p>Срок давности по &laquo;Болотному делу&raquo; истекает в 2022 году, но это не значит, что новые обвиняемые не могут появиться позже: следствие может использовать разные процессуальные уловки для продления дела.</p><p>Судя по тому, как сейчас расследуется так называемое <a href="https://ovdinfo.org/story/delo-26-marta">&laquo;Дело 26 марта&raquo;</a>, &laquo;Болотное дело&raquo; задало стандарт в российской следственной практике по делам о столкновениях демонстрантов и полиции. Применение насилия полицейскими следствие игнорирует, зато любое прикосновение демонстранта к полицейскому может трактоваться как уголовно наказуемый акт насилия, расследование сопровождается многочисленными нарушениями. В &laquo;Деле 26 марта&raquo; участвуют те же следователи, что и в &laquo;Болотном деле&raquo;.</p><p>За 2015-2016 годы многие осужденные по &laquo;Болотному делу&raquo; вышли на свободу &mdash; в основном, досидев до конца срока, а не по условно-досрочному освобождению. Это <a href="http://politpressing.org/data/5538f02d1fd7660300d9534d"><strong>Алексей Гаскаров</strong></a>, <a href="http://politpressing.org/data/550defa2e3fd29c704a3d7c4"><strong>Алексей Полихович</strong></a>, <a href="http://politpressing.org/persons/550de51513ede66e042e7592"><strong>Илья Гущин</strong></a>, <a href="http://politpressing.org/persons/550de51413ede66e042e757b"><strong>Максим Лузянин</strong></a>, <a href="http://politpressing.org/persons/550de51513ede66e042e7590"><strong>Сергей Кривов</strong></a>, <a href="http://politpressing.org/persons/550de51413ede66e042e756a"><strong>Денис Луцкевич</strong></a>, <a href="http://politpressing.org/persons/550de51413ede66e042e7569"><strong>Степан Зимин</strong></a>, <a href="http://politpressing.org/persons/550de51413ede66e042e7570"><strong>Александр Марголин</strong></a>, <a href="http://politpressing.org/persons/550de51413ede66e042e756b"><strong>Андрей Барабанов</strong></a>. В то же время в деле появились новые фигуранты: в 2016 году был задержан, а затем признан невменяемым житель Астрахани <a href="http://politpressing.org/persons/570d34ef6d8a0b0a00be60f3"><strong>Максим Панфилов</strong></a>. Житель Подмосковья <a href="http://politpressing.org/persons/54fc555745114f0300aa5954"><strong>Иван Непомнящих</strong></a> после задержания был помещен под домашний арест и затем получил 2,5 года лишения свободы (освободился в августе 2017 года). Летом 2017 года на свободу вышел <a href="http://politpressing.org/data/550defa2e3fd29c704a3d7c1"><strong>Дмитрий Ишевский</strong></a>. Еще один задержанный по &laquo;Болотному делу&raquo; в 2016 году, <a href="https://ovdinfo.org/express-news/2016/06/16/sud-amnistiroval-figuranta-bolotnogo-dela-anatoliya-leonina"><strong>Анатолий Леонин</strong></a>, был амнистирован, так как ему вменялось только участие в беспорядках, без применения насилия к полицейским. В 2016 году на полгода раньше условный срок <a href="https://ovdinfo.org/express-news/2016/07/04/s-aleksandry-naumovoy-duhaninoy-snyali-sudimost-i-uslovnyy-srok">удалось</a> снять <a href="http://politpressing.org/persons/550de51413ede66e042e756c"><strong>Александре Духаниной</strong></a>, одной из первых задержанных и осужденных по этому делу. С 2015 года подозреваемой по &laquo;Болотному делу&raquo; является <a href="http://politpressing.org/persons/5593f8d4a240860c00d12a53"><strong>Наталья Пелевина</strong></a>, деятель партии ПАРНАС. В 2015 году <a href="https://ovdinfo.org/express-news/2015/09/29/u-rodstvennikov-filippa-galcova-proshel-obysk">прошли</a> обыски у оставшихся в России родственников <strong>Филиппа Гальцова</strong>, одного из политэмигрантов по &laquo;Болотному делу&raquo;, а в 2016-м его <a href="https://ovdinfo.org/stories/2016/08/27/pohishchenie-so-snotvornym">пытались</a> похитить в Европе.</p><p>Формально до сих пор длится преследование анархиста <a href="http://politpressing.org/data/566ae3909cd5260c00d66e86"><strong>Дмитрия Бученкова</strong></a>, которого 6 мая вообще не было на Болотной площади. Судебное следствие приостановлено, так как обвиняемый покинул Россию.</p>'
    },
    treason: {
      name: 'Применение статьи о госизмене',
      refer: 'davydova',
      referTitle: 'Светлана Давыдова: История многодетной матери, оказавшейся в СИЗО за звонок в посольство Украины',
      photo: 'treason.jpg',
      cr: '',
      abstract: 'SMS другу и резюме в Швецию. За что могут обвинить в государственной измене',
      content: '<p>Общественный интерес к делам о государственной измене (статья 275 УК, от 12 до 20 лет лишения свободы) сильно повысился после ареста многодетной матери <strong>Светланы Давыдовой</strong>. Женщина сообщила посольству Украины в Москве о своих подозрениях в том, что Россия готовит военную операцию на Донбассе. </p><p>Статью о госизмене <a href="https://ovdinfo.org/articles/2015/02/13/gosudarstvo-na-izmene-kak-primenyaetsya-275-statya-uk">ужесточили</a> в 2012 году: в результате внесенных поправок определение измены значительно расширилось, а предъявить обвинение теперь возможно людям, не имеющим допуск к государственной тайне. Что и случилось со Светланой Давыдовой &mdash; она сообщила информацию, о секретности которой ее никто не предупреждал, как обычно поступают с сотрудниками спецслужб или учеными, работающими в соответствующих областях. По этой статье теперь также можно привлечь за сотрудничество не только с иностранными разведками, но и с иностранными общественными организациями. О делах о госизмене часто известно немногое: их ведет ФСБ, а обвиняемые и их родственники далеко не всегда идут на контакт с правозащитниками и журналистами.</p><p>По статье 275 часто обвиняют людей, не занимавшихся общественной деятельностью, но имевших какой-либо допуск к гостайне и при этом контактировавших с иностранцами. Часто фигурантами таких дел становятся бывшие или действующие сотрудники спецслужб. Характерно <a href="https://openrussia.org/post/view/2581/">дело <strong>Евгения Петрина</strong></a>, бывшего сотрудника ФСБ, обвиненного в передаче США сведений об РПЦ. Несмотря на резонанс в СМИ, подробности его истории <a href="https://meduza.io/feature/2017/05/26/put-tyazhelyy-nagrada-bolshe">до сих пор</a> не до конца ясны.</p><p>В 2015-2016 году под следствием либо за решеткой находилось несколько человек, которых правозащитные организации признают политически преследуемыми. Это житель Сочи <a href="http://politpressing.org/data/570159786d8a0b0a00be60d7"><strong>Петр Парпулов</strong></a>, получивший 12 лет за пересказ информации с одного из сайтов гражданину Грузии, а также жительница Краснодарского края <a href="http://politpressing.org/data/58a2339b4e5bf80d349e9486"><strong>Оксана Севастиди</strong></a>, в 2016 году приговоренная к 7 годам лишения свободы за SMS-сообщение гражданину Грузии о дислокации российских войск. Севастиди была помилована в 2017 году. Бывший радиоинженер ГРУ <a href="http://politpressing.org/data/563bbc5ddc622c0b003b77a8"><strong>Геннадий Кравцов</strong></a> получил шесть лет за отправку резюме в Швецию. В 2015 году в колонии умер осужденный в 2009 году за передачу Китаю сведений о ракете &laquo;Булава&raquo; ученый <a href="http://politpressing.org/persons/550de51513ede66e042e758e"><strong>Евгений Афанасьев</strong></a>, за решеткой остается другой ученый, <a href="http://politpressing.org/persons/550de51513ede66e042e7585"><strong>Станислав Бобышев</strong></a>, осужденный по тому же делу в 2012 году на 12 лет.</p><p>Недавно &laquo;Мемориал&raquo; <a href="https://memohrc.org/news/memorial-priznal-politzaklyuchennymi-eshche-treh-zhitelnic-sochi-osuzhdennyh-za-sms">признал</a> политзаключенными еще трех жительниц Краснодарского края &mdash; <a href="http://politpressing.org/data/593483e877cf90857a79d30a"><strong>Марину Джанджгава</strong></a>, <a href="http://politpressing.org/data/593489b577cf90857a79d31a"><strong>Ингу Тутисани</strong></a> и <a href="https://www.facebook.com/groups/opr.com.ru/permalink/1426118167468054/"><strong>Анник Кесян</strong></a>. Их приговорили к двенадцати, шести и восьми годам колонии соответственно за то, что в 2008-2009 годах они отправили SMS-сообщения об увиденной на железной дороге (в случаях Джанджгавы и Кесян) или в море (в случае Тутисани) военной технике своим грузинским знакомым. 29 июля 2017 года Джанджгава и Кесян были помилованы президентом, Тутисани вышла на свободу 30 ноября после того, как Верховный суд сократил ей срок до отсиженного.</p>'
    },
    blasphemy: {
      name: 'Оскорбление чувств верующих',
      refer: 'sokolovsky',
      referTitle: 'Руслан Соколовский: История видеоблогера, который «ловил покемонов» в храме',
      photo: 'blasphemy.jpg',
      cr: 'Руслан Соколовский/кадр из YouTube',
      abstract: 'Защита парка от РПЦ, спор о христианстве в интернете и другие оскорбления религиозных чувств. Как и от кого государство защищает верующих',
      content: '<p>Статья 148 УК &mdash; оскорбление чувств верующих &mdash; появилась в 2013 году после акции Pussy Riot в Храме Христа Спасителя. Максимальный срок наказания по ней &mdash; три года лишения свободы. Самым ярким примером абсурдности применения этой статьи стало дело видеоблогера <a href="http://politpressing.org/data/57d59ecd8c93ed0c006fa649"><strong>Руслана Соколовского</strong></a>, &laquo;ловившего покемонов&raquo; в храме.</p><p>Споры вокруг статьи во многом вызваны тем, что понятие оскорбления сформулировано в ней крайне размыто: &laquo;Публичные действия, выражающие явное неуважение к обществу и совершенные в целях оскорбления религиозных чувств верующих&raquo;. У понятия &laquo;религиозные чувства верующих&raquo; тоже может быть множество толкований. Кроме того, правовые системы разных стран мира очень по-разному реагируют на действия, оскорбительные для адептов религий: в одних странах такие действия в принципе не являются криминальными, в других, наоборот, &laquo;святотатство&raquo; и &laquo;кощунство&raquo;&nbsp;&mdash; серьезное преступление.</p><p>Помимо уголовной статьи, существует и административная &mdash; часть 2 статьи 5.26 КоАП, более четко сформулированная: &laquo;Умышленное публичное осквернение религиозной или богослужебной литературы, предметов религиозного почитания, знаков или эмблем мировоззренческой символики и атрибутики либо их порча или уничтожение&raquo;. Она предполагает штраф до 200 тысяч рублей. По ней пытались привлечь директора Новосибирского театра оперы и балета <strong>Бориса Мездрича</strong> и режиссера <strong>Тимофея Кулябина</strong> за постановку оперы Вагнера &laquo;Тангейзер&raquo;, но суд <a href="https://ovdinfo.org/express-news/2015/03/10/sud-prekratil-dela-direktora-i-rezhissera-teatra-gde-byl-postavlen-tangeyzer">прекратил</a> дело против них в марте 2015 года.</p><p>Из-за неоднозначных формулировок статьи 148 УК ее применение регулярно оказывается в центре медийных скандалов. В 2015-2016 годах в Перми по этой статье состоялась <a href="https://ovdinfo.org/express-news/2015/04/27/prokuratura-ne-nashla-prestupleniya-v-graffiti-s-raspyatym-kosmonavtom">проверка</a> граффити с распятым космонавтом, в Москве <a href="https://ovdinfo.org/express-news/2016/11/14/zaderzhannyh-zashchitnikov-parka-torfyanka-podozrevayut-v-oskorblenii">возбудили</a> дело против защитников парка &laquo;Торфянка&raquo;, конфликтовавших с РПЦ, в Кызыле в розыск <a href="https://ovdinfo.org/express-news/2016/11/18/v-kyzyle-v-rozysk-obyavili-devushku-za-fotografiyu-s-nogoy-zakinutoy-na">объявили</a> девушку за фотографию, на которой она закинула ногу на ритуальный буддийский барабан.</p><p>Среди других преследований по статье 148 УК &mdash; дело борца <a href="http://politpressing.org/persons/57701f0a69195b0c000199f0"><strong>Саида Османова</strong></a>, ударившего ногой статую и помочившегося в буддистском храме в Элисте; дело <a href="http://politpressing.org/data/573327c26d8a0b0a00be6203"><strong>Сергея Лазарева</strong></a>, бывшего преподавателя медвуза, привлеченного за пост, посвященный иконографии; дело жителя Ставрополя <a href="http://politpressing.org/data/5625390f100f690d002651f1"><strong>Виктора Краснова</strong></a>, привлеченного за спор о христианстве в группе &laquo;ВКонтакте&raquo; (15 февраля 2017 года дело закрыто в связи с истечением срока давности); дело &laquo;магистра вуду&raquo; <a href="http://politpressing.org/persons/56c99fb753c9910a00b82963"><strong>Антона Симакова</strong></a>, привлеченного за проведение обряда в поддержку донбасских сепаратистов, включавшего обезглавливание петуха рядом с предметами православного культа (по решению суда помещен в психиатрическую больницу, вышел в январе 2017 года); а также дело кировчан <a href="http://politpressing.org/data/58ed69c3784d83d63b301712"><strong>Рустема Шайдуллина</strong></a> и <a href="http://politpressing.org/persons/58ed67a5784d83d63b30170c"><strong>Константина Казанцева</strong></a>, привлеченных за размещение чучела на поклонном кресте (приговорены к обязательным работам).</p><p>Кроме того, в рамках &laquo;пакета Яровой&raquo; (подробнее в разделе &laquo;Приписанный терроризм&raquo;) в статью 5.26 КоАП (о нарушении законодательства о свободе совести, свободе вероисповедания и о религиозных объединениях) была включена часть 4 &mdash; &laquo;осуществление миссионерской деятельности с нарушением требований законодательства&raquo;, фактически сделавшая незаконной любую проповедь или раздачу религиозной литературы за пределами религиозных учреждений. Один из скандальных примеров применения этой статьи произошел в октябре 2016 года, когда в Петербурге был задержан местный житель <strong>Дмитрий Угай</strong>, читавший лекцию о йоге. В январе 2017 года суд прекратил дело, не найдя в нем состава правонарушения. Однако случаи преследования миссионеров по части 4 статьи 5.26 КоАП многочисленны.</p>'
    },
    journalists: {
      name: 'Преследования журналистов',
      refer: 'sokolov',
      referTitle: 'Александр Соколов: Как автор расследований о доходах чиновников и госкорпораций оказался в тюрьме по делу о запрещенной организации',
      photo: 'journalists.jpg',
      cr: 'Фото: Егор Сковорода/Медиазона',
      abstract: 'Нападения и уголовные дела. Кто и как препятствует работе журналистов',
      content: '<p>Громкое дело <a href="http://politpressing.org/data/54c39ee5bf69b503003918fa"><strong>Александра Соколова</strong></a>, к которому дважды привлекали внимание Владимира Путина, &mdash; яркий пример того, насколько уязвимы российские журналисты-расследователи, а также того, как легко заводятся уголовные дела на оппозиционеров. По факту, любая общественная деятельность может быть признана экстремистской и, соответственно, уголовно наказуемой. Это далеко не единственный пример преследования журналистов в 2015-2016 годах. Правозащитные организации убеждены, что еще ряд уголовных дел против журналистов могут быть политически мотивированными. </p><p>Корреспондент &laquo;Кавказского узла&raquo;, уроженец Чечни <a href="http://politpressing.org/persons/58075e66b667250d004003db"><strong>Жалауди Гериев</strong></a> получил три года лишения свободы за наркотики. Дело против него может быть связано с его работой на портале, к которому крайне негативно относится руководство Чечни.</p><p>Дело главреда газеты &laquo;Звезда Поволжья&raquo; <a href="http://politpressing.org/persons/557311aa6660300b00069654"><strong>Рашита Ахметова</strong></a> в 2015 году было закрыто за истечением срока давности. Он обвинялся в возбуждении национальной ненависти, хотя, по оценке Информационно-аналитического центра &laquo;Сова&raquo;, его публикации не содержали агрессивных призывов.</p><p>В 2015 году за истечением сроков давности было прекращено дело против создателя ресурса Bloger51 <a href="http://politpressing.org/persons/547512046318fb0200f17777"><strong>Александра Серебряникова</strong></a>. Он утверждал, что его сайт был взломан и в одну из его статей был добавлен абзац, разжигающий национальную ненависть, после чего было заведено дело. Серебряникову также безуспешно пытались &laquo;довесить&raquo; обвинения в пропаганде употребления наркотиков, незаконном обороте боеприпасов, налоговых преступлениях и использовании нелицензионных компьютерных программ.</p><p>В 2015 году был приговорен к трем годам колонии ростовский журналист <a href="http://politpressing.org/persons/550de51513ede66e042e758d"><strong>Сергей Резник</strong></a> &mdash; по обвинению в ложном доносе и оскорблении представителя власти. К этому моменту он уже был лишен свободы по делу опять же о ложном доносе, оскорблении представителя власти, а также коммерческом подкупе. Суд второй инстанции сократил срок, в октябре 2016 года Резник вышел на свободу.</p><p>Журналистов регулярно <a href="https://ovdinfo.org/express-news/2016/12/20/zaderzhannyh-na-myasnickoy-aktivistov-dostavili-v-ovd-krasnoselskiy">задерживают</a> на акциях протеста, иногда &mdash; <a href="https://ovdinfo.org/express-news/2016/12/29/zhurnalist-dozhdya-zaderzhannyy-v-kuskovo-oshtrafovan-na-600-rubley">судят</a> как участников. Они нередко становятся жертвами насилия за свою деятельность: наиболее резонансная из подобных историй &mdash; <a href="https://ovdinfo.org/story/presledovanie-zhurnalistov-i-pravozashchitnikov">нападение</a> на автобус с журналистами и сотрудниками Комитета по предотвращению пыток в Ингушетии в марте 2016 года.</p><p>Наиболее подробную статистику по давлению на журналистов в России ведет Фонд защиты гласности. По его данным, в <a href="http://www.gdf.ru/graph/item/1/1344">2015 году</a> было 70 случаев нападений на журналистов и блогеров, два случая нападений на редакции газет, как минимум 44 случая угроз в адрес журналистов и СМИ, 81 задержание журналистов правоохранителями. В<a href="http://www.gdf.ru/graph/item/1/1441"> 2016 году</a> Фонд защиты гласности зафиксировал еще 44 случая угроз в адрес журналистов, 54 нападения на журналистов и блогеров, один &mdash; на редакцию газеты и 63 случая задержания журналистов полицией, ФСБ и другими правоохранителями. О предполагаемых инициаторах силового давления и их возможных мотивах в своей статистике Фонд защиты гласности ничего не сообщает.</p>'
    },
    politicians: {
      name: 'Преследование оппозиционных политиков',
      refer: 'demushkin',
      referTitle: 'Дмитрий Демушкин: История радикального националиста и организатора «Русских маршей», осужденного за посты в соцсетях',
      photo: 'politicians.jpg',
      cr: 'Андрей Пивоваров в суде/фото: Грани.ру',
      abstract: 'Как политические взгляды становятся поводом для заведения неоднозначных уголовных дел',
      content: '<p>Уголовные дела на оппозиционных политиков в России заводят по самым разным статьям. Большим разнообразием отличаются уголовные дела против соратников популярного блогера и политика <a href="https://ovdinfo.org/persons/aleksey-navalnyy"><strong>Алексея Навального</strong></a>. На его вологодского однопартийца <a href="http://politpressing.org/data/57ff5cd8b667250d0040039c"><strong>Евгения Доможирова</strong></a>, а также на мать активиста было заведено дело об оскорблении представителя власти (статья 319 УК) и возбуждении ненависти к соцгруппе &laquo;полицейские&raquo; (часть 1 статья 282 УК) . Летом 2015 года один из ближайших соратников Навального, <strong>Георгий Албуров</strong>, был амнистирован по абсурдному уголовному <a href="https://ovdinfo.org/story/delo-o-krazhe-kartiny">делу</a> &laquo;о краже картины с забора&raquo;. Для другого близкого товарища Навального, <strong>Леонида Волкова</strong>, штрафом <a href="https://ovdinfo.org/story/mikrofonnoe-delo">закончилось</a> уголовное дело о препятствовании журналистской работе сотрудников Lifenews. Еще один соратник Навального, <strong>Владимир Ашурков</strong>, был <a href="https://ovdinfo.org/express-news/2015/03/31/vladimir-ashurkov-poluchil-politicheskoe-ubezhishche-v-velikobritanii">вынужден</a> покинуть Россию в связи тем, что фигурировал в двух уголовных делах, связанных с мошенничеством. До сих пор не закрыто <a href="https://ovdinfo.org/story/delo-koshelkov">дело</a> о сборе средств на предвыборную кампанию Навального через &laquo;Яндекс.кошельки&raquo; &mdash; по нему проходят Ашурков, оппозиционный политик <strong>Николай Ляскин</strong> и муниципальный депутат <a href="http://politpressing.org/data/550defa3e3fd29c704a3d811"><strong>Константин Янкаускас</strong></a>. Янкаускас к тому же больше года провел под домашним арестом.</p><p>В 2015-2016 годах <a href="https://ovdinfo.org/story/delo-vladimira-bessonova">продолжалось</a> дело против депутата Госдумы от КПРФ <strong>Владимира Бессонова</strong>, которого обвиняют в применении насилия к полицейским на митинге в Ростове-на-Дону в 2011 году. Националист <strong>Дмитрий Демушкин</strong> получил два с половиной года лишения свободы за две публикации в соцсетях. Его соратник <a href="http://politpressing.org/persons/5593e2b2a240860c00d12a48"><strong>Александр Белов (Поткин)</strong></a> получил три с половиной года за отмывание денег, призывы к экстремистской деятельности и организацию экстремистского сообщества. </p><p>На деятеля партии ПАРНАС <a href="http://politpressing.org/persons/55c9db05a240860c00d12b89"><strong>Андрея Пивоварова</strong></a> было возбуждено дело о незаконном доступе к компьютерной информации, подстрекательстве к превышению должностных полномочий и даче взятки. Он провел два месяца в СИЗО, а затем получил крупный штраф &mdash; Пивоваров должен выплатить государству миллион рублей.</p>'
    }
  }
};

class Report extends Component {
  constructor(...args) {
    super(...args);

    this.handleActions({
      'navigate': this._navigate,
      'menuNavigate': this._menuNavigate,
      'showNextArticle': this._showNextArticle,
      'scrollTo': this._scrollTo
    });

    this.router = new ReportRouter();
  }

  didMount() {
    this.router.on('route:changed', this._onRouteChanged, this);
    let route = this.router.readRoute();
    if(route.section !== '') {
      this.navigate(route, {replace: true});
    }
  }

  _onRouteChanged(route) {
    this.navigate(route, {replace: true});
  }

  dispose() {
    this.router.off(this);
    this.router.dispose();
  }

  getInitialState() {
    return {
      section: 'home',
      grid: 'persons',
      entity: null,
      menu: null
    }
  }

  render($$) {
    let el = $$('div').addClass('sc-report');

    if(this.state.section === 'home') {
      el.append(
        this.renderCover($$),
        this.renderPreface($$),
        this.renderGridSwitcher($$)
      );

      if(this.state.grid === 'persons') {
        el.append(this.renderPersonGrid($$));
      } else if(this.state.grid === 'topics') {
        el.append(this.renderTopicGrid($$));
      }
    }

    if(this.state.section === 'persons' && this.state.menu === null) {
      el.append(
        this.renderMenu($$),
        this.renderPersons($$)
      );
    }

    if(this.state.section === 'topics' && this.state.menu === null) {
      el.append(
        this.renderMenu($$),
        this.renderTopics($$)
      );
    }

    if(this.state.menu === 'persons') {
      el.append(
        this.renderMenu($$),
        this.renderPersonGrid($$)
      );
    }

    if(this.state.menu === 'topics') {
      el.append(
        this.renderMenu($$),
        this.renderTopicGrid($$)
      );
    }

    return el
  }

  renderCover($$) {
    return $$(Cover, {cover: data.cover}).ref('cover')
  }

  renderPreface($$) {
    return $$(Preface, {preface: data.preface}).ref('preface')
  }

  renderMenu($$) {
    return $$(Menu$1, {menu: this.state.menu, cover: data.cover}).ref('menu')
  }

  renderPersons($$) {
    let el = $$('section').addClass('sc-persons');
    let persons = data.persons;
    let topics = data.topics;
    let personId = this.state.entity;
    // if(personId !== null) {
    //   el.append($$(Article, {item: persons[personId], referer: topics, refsection: 'topics', section: 'persons'}).ref('entity-' + personId))

    //   let personsKeys = Object.keys(persons)     
    //   let totalPersons = personsKeys.length
    //   let personPos = personsKeys.indexOf(personId)

    //   if(totalPersons > personPos + 1) {
    //     let nextPersonId = personsKeys[personPos + 1]
    //     el.append($$(Article, {item: persons[nextPersonId], referer: topics, refsection: 'topics', section: 'persons', hidden: true}).ref('entity-' + nextPersonId))
    //   }
    // }
    let personIds = Object.keys(persons);

    personIds.forEach(personId => {
      el.append($$(Article, {item: persons[personId], referer: topics, refsection: 'topics', section: 'persons'})
        .attr({id: personId})
        .ref('entity-' + personId));
    });

    if(personId) {
      setTimeout(() => {
        window.scrollTo(0, this.refs['entity-' + personId].el.getPosition().top);
      }, 10);
    }

    return el
  }

  renderTopics($$) {
    let el = $$('section').addClass('sc-topics');
    let persons = data.persons;
    let topics = data.topics;
    let topicId = this.state.entity;
    // if(topicId !== null) {
    //   el.append($$(Article, {item: topics[topicId], referer: persons, refsection: 'persons', section: 'topics', hiddenTopic: true}).ref('entity-' + topicId))

    //   let topicsKeys = Object.keys(topics)     
    //   let totalTopics = topicsKeys.length
    //   let topicPos = topicsKeys.indexOf(topicId)

    //   if(totalTopics > topicPos + 1) {
    //     let nextTopicId = topicsKeys[topicPos + 1]
    //     el.append($$(Article, {item: topics[nextTopicId], referer: persons, refsection: 'persons', section: 'topics', hidden: true, hiddenTopic: true}).ref('entity-' + nextTopicId))
    //   }
    // }

    let topicIds = Object.keys(topics);

    topicIds.forEach(topicId => {
      el.append($$(Article, {item: topics[topicId], referer: persons, refsection: 'persons', section: 'topics'}).ref('entity-' + topicId));
    });

    if(topicId) {
      setTimeout(() => {
        window.scrollTo(0, this.refs['entity-' + topicId].el.getPosition().top);
      }, 10);
    }

    return el
  }

  renderPersonGrid($$) {
    let persons = data.persons;
    let topics = data.topics;
    return $$(ImageGrid, {data: persons, mode: 'persons', referer: topics}).ref('person-grid')
  }

  renderTopicGrid($$) {
    let topics = data.topics;
    return $$(ImageGrid, {data: topics, mode: 'topics'}).ref('topic-grid')
  }

  renderGridSwitcher($$) {
    let current = this.state.grid;
    let swicther = $$('ul').addClass('se-grid-switcher')
      .ref('grid-switcher')
      .on('click', this._switchGrid);

    let personsTab = $$('li').addClass('se-tab').append(
      $$('span').addClass('se-label').append('Люди'),
      $$('span').addClass('se-icon fa-id-card-o')
    );
    if(current === 'persons') personsTab.addClass('se-active');

    let topicsTab = $$('li').addClass('se-tab').append(
      $$('span').addClass('se-label').append('Темы'),
      $$('span').addClass('se-icon fa-tags')
    );
    if(current === 'topics') topicsTab.addClass('se-active');

    swicther.append(
      personsTab,
      topicsTab
    );

    return swicther
  }

  _scrollTo(element, to, duration) {
    let toEl = this.refs[to];
    let scrollTo = toEl.el.getPosition().top;

    let start = element.scrollTop,
      change = scrollTo - start,
      currentTime = 0,
      increment = 20;

    let easeInOutQuad = function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b
      t--;
      return -c/2 * (t*(t-2) - 1) + b
    };
        
    let animateScroll = function() {        
      currentTime += increment;
      let val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  _switchGrid() {
    let current = this.state.grid;
    let next = current === 'persons' ? 'topics' : 'persons';
    this.extendState({grid: next});
  }

  _showNextArticle(section) {
    let currentEntity = this.state.entity;
    let currentEntityArticle = this.refs['entity-' + currentEntity];
    currentEntityArticle.el.addClass('se-fade-up');
    setTimeout(() => {
      window.scrollTo(0,0);

      let sectionKeys = Object.keys(data[section]);     
      let totalEntities = sectionKeys.length;
      let entityPos = sectionKeys.indexOf(currentEntity);

      if(totalEntities > entityPos + 1) {
        this.extendState({entity: sectionKeys[entityPos + 1]});
        this.router.writeRoute({entity: sectionKeys[entityPos + 1], section: section});
      } else {
        this.extendState({entity: null});
      }
    }, 500);
  }

  navigate(route, opts) {
    this.extendState(route);
    this.router.writeRoute(route, opts);
  }

  _navigate(section, id) {
    this.extendState({entity: id, section: section, menu: null});
    this.router.writeRoute({entity: id, section: section});
    window.scrollTo(0, this.refs['entity-' + id].el.getPosition().top);
  }

  _menuNavigate(section) {
    if(this.state.menu === section) {
      this.extendState({menu: null});
    } else {
      this.extendState({menu: section, section: section});
    }

    if(section === 'home') {
      this.navigate({section: 'home'});
      window.scrollTo(0,0);
    }
  }
}

window.onload = function() {
  Report.mount({}, document.getElementById('app'));
};

})));

//# sourceMappingURL=./app.js.map
