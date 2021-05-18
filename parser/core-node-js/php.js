const fs = require("fs");
//https://locutus.io/php/
//
function _phpCastString (value) {
  // original by: Rafał Kukawski
  //   example 1: _phpCastString(true)
  //   returns 1: '1'
  //   example 2: _phpCastString(false)
  //   returns 2: ''
  //   example 3: _phpCastString('foo')
  //   returns 3: 'foo'
  //   example 4: _phpCastString(0/0)
  //   returns 4: 'NAN'
  //   example 5: _phpCastString(1/0)
  //   returns 5: 'INF'
  //   example 6: _phpCastString(-1/0)
  //   returns 6: '-INF'
  //   example 7: _phpCastString(null)
  //   returns 7: ''
  //   example 8: _phpCastString(undefined)
  //   returns 8: ''
  //   example 9: _phpCastString([])
  //   returns 9: 'Array'
  //   example 10: _phpCastString({})
  //   returns 10: 'Object'
  //   example 11: _phpCastString(0)
  //   returns 11: '0'
  //   example 12: _phpCastString(1)
  //   returns 12: '1'
  //   example 13: _phpCastString(3.14)
  //   returns 13: '3.14'

  const type = typeof value

  switch (type) {
    case 'boolean':
      return value ? '1' : ''
    case 'string':
      return value
    case 'number':
      if (isNaN(value)) {
        return 'NAN'
      }

      if (!isFinite(value)) {
        return (value < 0 ? '-' : '') + 'INF'
      }

      return value + ''
    case 'undefined':
      return ''
    case 'object':
      if (Array.isArray(value)) {
        return 'Array'
      }

      if (value !== null) {
        return 'Object'
      }

      return ''
    case 'function':
      // fall through
    default:
      throw new Error('Unsupported value type')
  }
}
module.exports.number_format = (number, decimals, decPoint, thousandsSep) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/number_format/
  // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: davook
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Michael White (https://getsprink.com)
  // bugfixed by: Benjamin Lupton
  // bugfixed by: Allan Jensen (https://www.winternet.no)
  // bugfixed by: Howard Yeend
  // bugfixed by: Diogo Resende
  // bugfixed by: Rival
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //  revised by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //  revised by: Luke Smith (https://lucassmith.name)
  //    input by: Kheang Hok Chin (https://www.distantia.ca/)
  //    input by: Jay Klehr
  //    input by: Amir Habibi (https://www.residence-mixte.com/)
  //    input by: Amirouche
  //   example 1: number_format(1234.56)
  //   returns 1: '1,235'
  //   example 2: number_format(1234.56, 2, ',', ' ')
  //   returns 2: '1 234,56'
  //   example 3: number_format(1234.5678, 2, '.', '')
  //   returns 3: '1234.57'
  //   example 4: number_format(67, 2, ',', '.')
  //   returns 4: '67,00'
  //   example 5: number_format(1000)
  //   returns 5: '1,000'
  //   example 6: number_format(67.311, 2)
  //   returns 6: '67.31'
  //   example 7: number_format(1000.55, 1)
  //   returns 7: '1,000.6'
  //   example 8: number_format(67000, 5, ',', '.')
  //   returns 8: '67.000,00000'
  //   example 9: number_format(0.9, 0)
  //   returns 9: '1'
  //  example 10: number_format('1.20', 2)
  //  returns 10: '1.20'
  //  example 11: number_format('1.20', 4)
  //  returns 11: '1.2000'
  //  example 12: number_format('1.2000', 3)
  //  returns 12: '1.200'
  //  example 13: number_format('1 000,50', 2, '.', ' ')
  //  returns 13: '100 050.00'
  //  example 14: number_format(1e-8, 8, '.', '')
  //  returns 14: '0.00000001'
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  let s = ''
  const toFixedFix = function (n, prec) {
    if (('' + n).indexOf('e') === -1) {
      return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
    } else {
      const arr = ('' + n).split('e')
      let sig = ''
      if (+arr[1] + prec > 0) {
        sig = '+'
      }
      return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
    }
  }
  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}
module.exports.is_array = ( mixed_var ) => {	// Finds whether a variable is an array
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Legaev Andrey
	// +   bugfixed by: Cord
	return ( mixed_var instanceof Array );
}
module.exports.is_string = ( mixed_var ) => {  // Find whether the type of a variable is string
  // 
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  return (typeof( mixed_var ) == 'string');
}
function isObject(obj) {
  return obj === Object(obj);
}
module.exports.empty = ( mixed_var ) => {	// Determine whether a variable is empty
	// 
	// +   original by: Philippe Baumann
	return ( mixed_var === "" || mixed_var === 0   || mixed_var === "0" || mixed_var === null  || mixed_var === false  ||  ( module.exports.is_array(mixed_var) && mixed_var.length === 0 ) || (isObject(mixed_var) && Object.keys(mixed_var).length === 0) );
}
module.exports.ucFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
module.exports.in_array = (needle, haystack, strict) => {  // Checks if a value exists in an array
  // 
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  var found = false, key, strict = !!strict;

  for (key in haystack) {
    if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
      found = true;
      break;
    }
  }

  return found;
}
module.exports.str_replace = ( search, replace, subject ) => {	// Replace all occurrences of the search string with the replacement string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Gabriel Paderni

	if(!(replace instanceof Array)){
		replace=new Array(replace);
		if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
			while(search.length>replace.length){
				replace[replace.length]=replace[0];
			}
		}
	}

	if(!(search instanceof Array))search=new Array(search);
	while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
		replace[replace.length]='';
	}

	if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
		for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
		}
		return subject;
	}

	for(var k=0; k<search.length; k++){
		var i = subject.indexOf(search[k]);
		while(i>-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
		}
	}

	return subject;

}
module.exports.isset = (accessor) => {
  try {
    // Note we're seeing if the returned value of our function is not
    // undefined or null
    return accessor !== undefined && accessor !== null
  } catch (e) {
    // And we're able to catch the Error it would normally throw for
    // referencing a property of undefined
    return false
  }
}
module.exports.time = () => {
  //  discuss at: https://locutus.io/php/time/
  // original by: GeekFG (https://geekfg.blogspot.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: metjay
  // improved by: HKM
  //   example 1: var $timeStamp = time()
  //   example 1: var $result = $timeStamp > 1000000000 && $timeStamp < 2000000000
  //   returns 1: true
  return Math.floor(new Date().getTime() / 1000)
}
module.exports.filectime = (file) => {
	var stats = fs.statSync(file);
	return stats.ctime.getTime();
}
module.exports.filemtime = (file) => {
	var stats = fs.statSync(file);
	return stats.mtime.getTime();
}
module.exports.fileatime = (file) => {
	var stats = fs.statSync(file);
	return stats.atime.getTime();
}
module.exports.file_get_contents = (file) => {
	return fs.readFileSync(file).toString();
}
module.exports.urldecode = (url) => {
	return decodeURIComponent(url.replace(/\+/g, ' '));
}
module.exports.end = (arr) => {
	return arr[arr.length-1]
}
module.exports.json_encode = (data) => {
	return JSON.stringify(data, null, 4)
}
module.exports.file_put_contents = (file, data, append = false) => {
	if(append && fs.existsSync(file)) {
		fs.appendFileSync(file, data)
	} else {
		fs.writeFileSync(file, data);
	}
}
module.exports.is_numeric = (mixedVar) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_numeric/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: David
  // improved by: taith
  // bugfixed by: Tim de Koning
  // bugfixed by: WebDevHobo (https://webdevhobo.blogspot.com/)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Denis Chenu (https://shnoulle.net)
  //   example 1: is_numeric(186.31)
  //   returns 1: true
  //   example 2: is_numeric('Kevin van Zonneveld')
  //   returns 2: false
  //   example 3: is_numeric(' +186.31e2')
  //   returns 3: true
  //   example 4: is_numeric('')
  //   returns 4: false
  //   example 5: is_numeric([])
  //   returns 5: false
  //   example 6: is_numeric('1 ')
  //   returns 6: false
  const whitespace = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\x0b',
    '\xa0',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200a',
    '\u200b',
    '\u2028',
    '\u2029',
    '\u3000'
  ].join('')
  // @todo: Break this up using many single conditions with early returns
  return (typeof mixedVar === 'number' ||
    (typeof mixedVar === 'string' &&
    whitespace.indexOf(mixedVar.slice(-1)) === -1)) &&
    mixedVar !== '' &&
    !isNaN(mixedVar)
}
module.exports.array_combine = (keys, values) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_combine/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld'])
  //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
  const newArray = {}
  let i = 0
  // input sanitation
  // Only accept arrays or array-like objects
  // Require arrays to have a count
  if (typeof keys !== 'object') {
    return false
  }
  if (typeof values !== 'object') {
    return false
  }
  if (typeof keys.length !== 'number') {
    return false
  }
  if (typeof values.length !== 'number') {
    return false
  }
  if (!keys.length) {
    return false
  }
  // number of elements does not match
  if (keys.length !== values.length) {
    return false
  }
  for (i = 0; i < keys.length; i++) {
    newArray[keys[i]] = values[i]
  }
  return newArray
}
module.exports.array_keys = ( input, search_value, strict ) => {	// Return all the keys of an array
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var tmp_arr = new Array(), strict = !!strict, include = true, cnt = 0;

	for ( let key in input ){
		include = true;
		if ( search_value != undefined ) {
			if( strict && input[key] !== search_value ){
				include = false;
			} else if( input[key] != search_value ){
				include = false;
			}
		}

		if( include ) {
			tmp_arr[cnt] = key;
			cnt++;
		}
	}

	return tmp_arr;
}
module.exports.array_values = ( input ) => {	// Return all the values of an array
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var tmp_arr = new Array(), cnt = 0;

	for ( let key in input ){
		tmp_arr[cnt] = input[key];
		cnt++;
	}

	return tmp_arr;
}

module.exports.http_build_query = (formdata, numeric_prefix, arg_separator) => {
  //  discuss at: http://phpjs.org/functions/http_build_query/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Legaev Andrey
  // improved by: Michael White (http://getsprink.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  revised by: stag019
  //    input by: Dreamer
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
  //        note: If the value is null, key and value are skipped in the http_build_query of PHP while in phpjs they are not.
  //  depends on: urlencode
  //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
  //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
  //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'

  var value, key, tmp = [],
    that = this;

  var _http_build_query_helper = function(key, val, arg_separator) {
    var k, tmp = [];
    if (val === true) {
      val = '1';
    } else if (val === false) {
      val = '0';
    }
    if (val != null) {
      if (typeof val === 'object') {
        for (k in val) {
          if (val[k] != null) {
            tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator));
          }
        }
        return tmp.join(arg_separator);
      } else if (typeof val !== 'function') {
        return that.urlencode(key) + '=' + that.urlencode(val);
      } else {
        throw new Error('There was an error processing for http_build_query().');
      }
    } else {
      return '';
    }
  };

  if (!arg_separator) {
    arg_separator = '&';
  }
  for (key in formdata) {
    value = formdata[key];
    if (numeric_prefix && !isNaN(key)) {
      key = String(numeric_prefix) + key;
    }
    var query = _http_build_query_helper(key, value, arg_separator);
    if (query !== '') {
      tmp.push(query);
    }
  }

  return tmp.join(arg_separator);
}
module.exports.get_headers = (url, format) => {
  //  discuss at: http://phpjs.org/functions/get_headers/
  // original by: Paulo Freitas
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  depends on: array_filter
  //        note: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  //        note: Synchronous so may lock up browser, mainly here for study purposes.
  //        test: skip
  //   example 1: get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')[0];
  //   returns 1: 'Date: Wed, 13 May 2009 23:53:11 GMT'

  var req = new XMLHttpRequest();

  if (!req) {
    throw new Error('XMLHttpRequest not supported');
  }
  var tmp, headers, pair, i, j = 0;
  ß;
  req.open('HEAD', url, false);
  req.send(null);

  if (req.readyState < 3) {
    return false;
  }

  tmp = req.getAllResponseHeaders();
  tmp = tmp.split('\n');
  tmp = this.array_filter(tmp, function(value) {
    return value.substring(1) !== '';
  });
  headers = format ? {} : [];

  for (var i in tmp) {
    if (format) {
      pair = tmp[i].split(':');
      headers[pair.splice(0, 1)] = pair.join(':')
        .substring(1);
    } else {
      headers[j++] = tmp[i];
    }
  }

  return headers;
}
function initCache () {
  const store = []
  // cache only first element, second is length to jump ahead for the parser
  const cache = function cache (value) {
    store.push(value[0])
    return value
  }
  cache.get = (index) => {
    if (index >= store.length) {
      throw RangeError(`Can't resolve reference ${index + 1}`)
    }
    return store[index]
  }
  return cache
}
function expectType (str, cache) {
  const types = /^(?:N(?=;)|[bidsSaOCrR](?=:)|[^:]+(?=:))/g
  const type = (types.exec(str) || [])[0]
  if (!type) {
    throw SyntaxError('Invalid input: ' + str)
  }
  switch (type) {
    case 'N':
      return cache([null, 2])
    case 'b':
      return cache(expectBool(str))
    case 'i':
      return cache(expectInt(str))
    case 'd':
      return cache(expectFloat(str))
    case 's':
      return cache(expectString(str))
    case 'S':
      return cache(expectEscapedString(str))
    case 'a':
      return expectArray(str, cache)
    case 'O':
      return expectObject(str, cache)
    case 'C':
      return expectClass(str, cache)
    case 'r':
    case 'R':
      return expectReference(str, cache)
    default:
      throw SyntaxError(`Invalid or unsupported data type: ${type}`)
  }
}
function expectBool (str) {
  const reBool = /^b:([01]);/
  const [match, boolMatch] = reBool.exec(str) || []
  if (!boolMatch) {
    throw SyntaxError('Invalid bool value, expected 0 or 1')
  }
  return [boolMatch === '1', match.length]
}
function expectInt (str) {
  const reInt = /^i:([+-]?\d+);/
  const [match, intMatch] = reInt.exec(str) || []
  if (!intMatch) {
    throw SyntaxError('Expected an integer value')
  }
  return [parseInt(intMatch, 10), match.length]
}
function expectFloat (str) {
  const reFloat = /^d:(NAN|-?INF|(?:\d+\.\d*|\d*\.\d+|\d+)(?:[eE][+-]\d+)?);/
  const [match, floatMatch] = reFloat.exec(str) || []
  if (!floatMatch) {
    throw SyntaxError('Expected a float value')
  }
  let floatValue
  switch (floatMatch) {
    case 'NAN':
      floatValue = Number.NaN
      break
    case '-INF':
      floatValue = Number.NEGATIVE_INFINITY
      break
    case 'INF':
      floatValue = Number.POSITIVE_INFINITY
      break
    default:
      floatValue = parseFloat(floatMatch)
      break
  }
  return [floatValue, match.length]
}
function readBytes (str, len, escapedString = false) {
  let bytes = 0
  let out = ''
  let c = 0
  const strLen = str.length
  let wasHighSurrogate = false
  let escapedChars = 0
  while (bytes < len && c < strLen) {
    let chr = str.charAt(c)
    const code = chr.charCodeAt(0)
    const isHighSurrogate = code >= 0xd800 && code <= 0xdbff
    const isLowSurrogate = code >= 0xdc00 && code <= 0xdfff
    if (escapedString && chr === '\\') {
      chr = String.fromCharCode(parseInt(str.substr(c + 1, 2), 16))
      escapedChars++
      // each escaped sequence is 3 characters. Go 2 chars ahead.
      // third character will be jumped over a few lines later
      c += 2
    }
    c++
    bytes += isHighSurrogate || (isLowSurrogate && wasHighSurrogate)
      // if high surrogate, count 2 bytes, as expectation is to be followed by low surrogate
      // if low surrogate preceded by high surrogate, add 2 bytes
      ? 2
      : code > 0x7ff
        // otherwise low surrogate falls into this part
        ? 3
        : code > 0x7f
          ? 2
          : 1
    // if high surrogate is not followed by low surrogate, add 1 more byte
    bytes += wasHighSurrogate && !isLowSurrogate ? 1 : 0
    out += chr
    wasHighSurrogate = isHighSurrogate
  }
  return [out, bytes, escapedChars]
}
function expectString (str) {
  // PHP strings consist of one-byte characters.
  // JS uses 2 bytes with possible surrogate pairs.
  // Serialized length of 2 is still 1 JS string character
  const reStrLength = /^s:(\d+):"/g // also match the opening " char
  const [match, byteLenMatch] = reStrLength.exec(str) || []
  if (!match) {
    throw SyntaxError('Expected a string value')
  }
  const len = parseInt(byteLenMatch, 10)
  str = str.substr(match.length)
  const [strMatch, bytes] = readBytes(str, len)
  if (bytes !== len) {
    throw SyntaxError(`Expected string of ${len} bytes, but got ${bytes}`)
  }
  str = str.substr(strMatch.length)
  // strict parsing, match closing "; chars
  if (!str.startsWith('";')) {
    throw SyntaxError('Expected ";')
  }
  return [strMatch, match.length + strMatch.length + 2] // skip last ";
}
function expectEscapedString (str) {
  const reStrLength = /^S:(\d+):"/g // also match the opening " char
  const [match, strLenMatch] = reStrLength.exec(str) || []
  if (!match) {
    throw SyntaxError('Expected an escaped string value')
  }
  const len = parseInt(strLenMatch, 10)
  str = str.substr(match.length)
  const [strMatch, bytes, escapedChars] = readBytes(str, len, true)
  if (bytes !== len) {
    throw SyntaxError(`Expected escaped string of ${len} bytes, but got ${bytes}`)
  }
  str = str.substr(strMatch.length + escapedChars * 2)
  // strict parsing, match closing "; chars
  if (!str.startsWith('";')) {
    throw SyntaxError('Expected ";')
  }
  return [strMatch, match.length + strMatch.length + 2] // skip last ";
}
function expectKeyOrIndex (str) {
  try {
    return expectString(str)
  } catch (err) {}
  try {
    return expectEscapedString(str)
  } catch (err) {}
  try {
    return expectInt(str)
  } catch (err) {
    throw SyntaxError('Expected key or index')
  }
}
function expectObject (str, cache) {
  // O:<class name length>:"class name":<prop count>:{<props and values>}
  // O:8:"stdClass":2:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"baz";}
  const reObjectLiteral = /^O:(\d+):"([^"]+)":(\d+):\{/
  const [objectLiteralBeginMatch, /* classNameLengthMatch */, className, propCountMatch] = reObjectLiteral.exec(str) || []
  if (!objectLiteralBeginMatch) {
    throw SyntaxError('Invalid input')
  }
  if (className !== 'stdClass') {
    throw SyntaxError(`Unsupported object type: ${className}`)
  }
  let totalOffset = objectLiteralBeginMatch.length
  const propCount = parseInt(propCountMatch, 10)
  const obj = {}
  cache([obj])
  str = str.substr(totalOffset)
  for (let i = 0; i < propCount; i++) {
    const prop = expectKeyOrIndex(str)
    str = str.substr(prop[1])
    totalOffset += prop[1]
    const value = expectType(str, cache)
    str = str.substr(value[1])
    totalOffset += value[1]
    obj[prop[0]] = value[0]
  }
  // strict parsing, expect } after object literal
  if (str.charAt(0) !== '}') {
    throw SyntaxError('Expected }')
  }
  return [obj, totalOffset + 1] // skip final }
}
function expectClass (str, cache) {
  // can't be well supported, because requires calling eval (or similar)
  // in order to call serialized constructor name
  // which is unsafe
  // or assume that constructor is defined in global scope
  // but this is too much limiting
  throw Error('Not yet implemented')
}
function expectReference (str, cache) {
  const reRef = /^[rR]:([1-9]\d*);/
  const [match, refIndex] = reRef.exec(str) || []
  if (!match) {
    throw SyntaxError('Expected reference value')
  }
  return [cache.get(parseInt(refIndex, 10) - 1), match.length]
}
function expectArray (str, cache) {
  const reArrayLength = /^a:(\d+):{/
  const [arrayLiteralBeginMatch, arrayLengthMatch] = reArrayLength.exec(str) || []
  if (!arrayLengthMatch) {
    throw SyntaxError('Expected array length annotation')
  }
  str = str.substr(arrayLiteralBeginMatch.length)
  const array = expectArrayItems(str, parseInt(arrayLengthMatch, 10), cache)
  // strict parsing, expect closing } brace after array literal
  if (str.charAt(array[1]) !== '}') {
    throw SyntaxError('Expected }')
  }
  return [array[0], arrayLiteralBeginMatch.length + array[1] + 1] // jump over }
}
function expectArrayItems (str, expectedItems = 0, cache) {
  let key
  let hasStringKeys = false
  let item
  let totalOffset = 0
  let items = []
  cache([items])
  for (let i = 0; i < expectedItems; i++) {
    key = expectKeyOrIndex(str)
    // this is for backward compatibility with previous implementation
    if (!hasStringKeys) {
      hasStringKeys = (typeof key[0] === 'string')
    }
    str = str.substr(key[1])
    totalOffset += key[1]
    // references are resolved immediately, so if duplicate key overwrites previous array index
    // the old value is anyway resolved
    // fixme: but next time the same reference should point to the new value
    item = expectType(str, cache)
    str = str.substr(item[1])
    totalOffset += item[1]
    items[key[0]] = item[0]
  }
  // this is for backward compatibility with previous implementation
  if (hasStringKeys) {
    items = Object.assign({}, items)
  }
  return [items, totalOffset]
}
module.exports.unserialize = (str) => {
  //       discuss at: https://locutus.io/php/unserialize/
  //      original by: Arpad Ray (mailto:arpad@php.net)
  //      improved by: Pedro Tainha (https://www.pedrotainha.com)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Chris
  //      improved by: James
  //      improved by: Le Torbi
  //      improved by: Eli Skeggs
  //      bugfixed by: dptr1988
  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: philippsimon (https://github.com/philippsimon/)
  //       revised by: d3x
  //         input by: Brett Zamir (https://brett-zamir.me)
  //         input by: Martin (https://www.erlenwiese.de/)
  //         input by: kilops
  //         input by: Jaroslaw Czarniak
  //         input by: lovasoa (https://github.com/lovasoa/)
  //      improved by: Rafał Kukawski
  // reimplemented by: Rafał Kukawski
  //           note 1: We feel the main purpose of this function should be
  //           note 1: to ease the transport of data between php & js
  //           note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
  //        example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
  //        returns 1: ['Kevin', 'van', 'Zonneveld']
  //        example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
  //        returns 2: {firstName: 'Kevin', midName: 'van'}
  //        example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
  //        returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}
  //        example 4: unserialize(undefined)
  //        returns 4: false
  //        example 5: unserialize('O:8:"stdClass":1:{s:3:"foo";b:1;}')
  //        returns 5: { foo: true }
  //        example 6: unserialize('a:2:{i:0;N;i:1;s:0:"";}')
  //        returns 6: [null, ""]
  //        example 7: unserialize('S:7:"\\65\\73\\63\\61\\70\\65\\64";')
  //        returns 7: 'escaped'
  try {
    if (typeof str !== 'string') {
      return false
    }
    return expectType(str, initCache())[0]
  } catch (err) {
    console.error(err)
    return false
  }
}
module.exports.serialize = (mixedValue) => {
  //  discuss at: https://locutus.io/php/serialize/
  // original by: Arpad Ray (mailto:arpad@php.net)
  // improved by: Dino
  // improved by: Le Torbi (https://www.letorbi.de/)
  // improved by: Kevin van Zonneveld (https://kvz.io/)
  // bugfixed by: Andrej Pavlovic
  // bugfixed by: Garagoth
  // bugfixed by: Russell Walker (https://www.nbill.co.uk/)
  // bugfixed by: Jamie Beck (https://www.terabit.ca/)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io/)
  // bugfixed by: Ben (https://benblume.co.uk/)
  // bugfixed by: Codestar (https://codestarlive.com/)
  // bugfixed by: idjem (https://github.com/idjem)
  //    input by: DtTvB (https://dt.in.th/2008-09-16.string-length-in-bytes.html)
  //    input by: Martin (https://www.erlenwiese.de/)
  //      note 1: We feel the main purpose of this function should be to ease
  //      note 1: the transport of data between php & js
  //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
  //   example 1: serialize(['Kevin', 'van', 'Zonneveld'])
  //   returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
  //   example 2: serialize({firstName: 'Kevin', midName: 'van'})
  //   returns 2: 'a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}'
  //   example 3: serialize( {'ü': 'ü', '四': '四', '𠜎': '𠜎'})
  //   returns 3: 'a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}'
  let val, key, okey
  let ktype = ''
  let vals = ''
  let count = 0
  const _utf8Size = function (str) {
    return ~-encodeURI(str).split(/%..|./).length
  }
  const _getType = function (inp) {
    let match
    let key
    let cons
    let types
    let type = typeof inp
    if (type === 'object' && !inp) {
      return 'null'
    }
    if (type === 'object') {
      if (!inp.constructor) {
        return 'object'
      }
      cons = inp.constructor.toString()
      match = cons.match(/(\w+)\(/)
      if (match) {
        cons = match[1].toLowerCase()
      }
      types = ['boolean', 'number', 'string', 'array']
      for (key in types) {
        if (cons === types[key]) {
          type = types[key]
          break
        }
      }
    }
    return type
  }
  const type = _getType(mixedValue)
  switch (type) {
    case 'function':
      val = ''
      break
    case 'boolean':
      val = 'b:' + (mixedValue ? '1' : '0')
      break
    case 'number':
      val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue
      break
    case 'string':
      val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"'
      break
    case 'array':
    case 'object':
      val = 'a'
      /*
      if (type === 'object') {
        var objname = mixedValue.constructor.toString().match(/(\w+)\(\)/);
        if (objname === undefined) {
          return;
        }
        objname[1] = serialize(objname[1]);
        val = 'O' + objname[1].substring(1, objname[1].length - 1);
      }
      */
      for (key in mixedValue) {
        if (mixedValue.hasOwnProperty(key)) {
          ktype = _getType(mixedValue[key])
          if (ktype === 'function') {
            continue
          }
          okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key)
          vals += module.exports.serialize(okey) + module.exports.serialize(mixedValue[key])
          count++
        }
      }
      val += ':' + count + ':{' + vals + '}'
      break
    case 'undefined':
    default:
      // Fall-through
      // if the JS object has a property which contains a null value,
      // the string cannot be unserialized by PHP
      val = 'N'
      break
  }
  if (type !== 'object' && type !== 'array') {
    val += ';'
  }
  return val
}
module.exports.floatval = (mixedVar) => {
  //  discuss at: https://locutus.io/php/floatval/
  // original by: Michael White (https://getsprink.com)
  //      note 1: The native parseFloat() method of JavaScript returns NaN
  //      note 1: when it encounters a string before an int or float value.
  //   example 1: floatval('150.03_page-section')
  //   returns 1: 150.03
  //   example 2: floatval('page: 3')
  //   example 2: floatval('-50 + 8')
  //   returns 2: 0
  //   returns 2: -50
  return (parseFloat(mixedVar) || 0)
}
module.exports.doubleval = (val) => {
	return module.exports.floatval(val)
}
module.exports.boolval = (mixedVar) => {
  // original by: Will Rowe
  //   example 1: boolval(true)
  //   returns 1: true
  //   example 2: boolval(false)
  //   returns 2: false
  //   example 3: boolval(0)
  //   returns 3: false
  //   example 4: boolval(0.0)
  //   returns 4: false
  //   example 5: boolval('')
  //   returns 5: false
  //   example 6: boolval('0')
  //   returns 6: false
  //   example 7: boolval([])
  //   returns 7: false
  //   example 8: boolval('')
  //   returns 8: false
  //   example 9: boolval(null)
  //   returns 9: false
  //   example 10: boolval(undefined)
  //   returns 10: false
  //   example 11: boolval('true')
  //   returns 11: true
  if (mixedVar === false) {
    return false
  }
  if (mixedVar === 0 || mixedVar === 0.0) {
    return false
  }
  if (mixedVar === '' || mixedVar === '0') {
    return false
  }
  if (Array.isArray(mixedVar) && mixedVar.length === 0) {
    return false
  }
  if (mixedVar === null || mixedVar === undefined) {
    return false
  }
  return true
}
module.exports.substr = (input, start, len) => {
  //  discuss at: https://locutus.io/php/substr/
  // original by: Martijn Wieringa
  // bugfixed by: T.Wild
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //  revised by: Theriault (https://github.com/Theriault)
  //  revised by: Rafał Kukawski
  //      note 1: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
  //   example 1: substr('abcdef', 0, -1)
  //   returns 1: 'abcde'
  //   example 2: substr(2, 0, -6)
  //   returns 2: false
  //   example 3: ini_set('unicode.semantics', 'on')
  //   example 3: substr('a\uD801\uDC00', 0, -1)
  //   returns 3: 'a'
  //   example 4: ini_set('unicode.semantics', 'on')
  //   example 4: substr('a\uD801\uDC00', 0, 2)
  //   returns 4: 'a\uD801\uDC00'
  //   example 5: ini_set('unicode.semantics', 'on')
  //   example 5: substr('a\uD801\uDC00', -1, 1)
  //   returns 5: '\uD801\uDC00'
  //   example 6: ini_set('unicode.semantics', 'on')
  //   example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2)
  //   returns 6: '\uD801\uDC00z'
  //   example 7: ini_set('unicode.semantics', 'on')
  //   example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
  //   returns 7: '\uD801\uDC00z'
  //        test: skip-3 skip-4 skip-5 skip-6 skip-7

  input = _phpCastString(input)

  input = input.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || []

  const inputLength = input.length
  let end = inputLength

  if (start < 0) {
    start += end
  }

  if (typeof len !== 'undefined') {
    if (len < 0) {
      end = len + end
    } else {
      end = len + start
    }
  }

  if (start > inputLength || start < 0 || start > end) {
    return false
  }

  if (multibyte) {
    return input.slice(start, end).join('')
  }

  return input.slice(start, end)
}
module.exports.strtolower = (str) => {
  //  discuss at: https://locutus.io/php/strtolower/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: strtolower('Kevin van Zonneveld')
  //   returns 1: 'kevin van zonneveld'
  return (str + '').toLowerCase()
}
module.exports.strtoupper = (str) => {
  //  discuss at: https://locutus.io/php/strtoupper/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: strtoupper('Kevin van Zonneveld')
  //   returns 1: 'KEVIN VAN ZONNEVELD'
  return (str + '').toUpperCase()
}
module.exports.trim = (str, charlist) => {
  //  discuss at: https://locutus.io/php/trim/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: mdsjack (https://www.mdsjack.bo.it)
  // improved by: Alexander Ermolaev (https://snippets.dzone.com/user/AlexanderErmolaev)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Steven Levithan (https://blog.stevenlevithan.com)
  // improved by: Jack
  //    input by: Erkekjetter
  //    input by: DxGx
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: trim('    Kevin van Zonneveld    ')
  //   returns 1: 'Kevin van Zonneveld'
  //   example 2: trim('Hello World', 'Hdle')
  //   returns 2: 'o Wor'
  //   example 3: trim(16, 1)
  //   returns 3: '6'
  let whitespace = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\x0b',
    '\xa0',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200a',
    '\u200b',
    '\u2028',
    '\u2029',
    '\u3000'
  ].join('')
  let l = 0
  let i = 0
  str += ''
  if (charlist) {
    whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
  }
  l = str.length
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i)
      break
    }
  }
  l = str.length
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1)
      break
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}
module.exports.ucfirst = (str) => {
  //  discuss at: https://locutus.io/php/ucfirst/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: ucfirst('kevin van zonneveld')
  //   returns 1: 'Kevin van zonneveld'
  str += ''
  const f = str.charAt(0).toUpperCase()
  return f + str.substr(1)
}
module.exports.lcfirst = (str) => {
  //  discuss at: https://locutus.io/php/lcfirst/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: lcfirst('Kevin Van Zonneveld')
  //   returns 1: 'kevin Van Zonneveld'
  str += ''
  const f = str.charAt(0).toLowerCase()
  return f + str.substr(1)
}
module.exports.strripos = (haystack, needle, offset) => {
  //  discuss at: https://locutus.io/php/strripos/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //    input by: saulius
  //   example 1: strripos('Kevin van Zonneveld', 'E')
  //   returns 1: 16
  haystack = (haystack + '').toLowerCase()
  needle = (needle + '').toLowerCase()
  let i = -1
  if (offset) {
    i = (haystack + '').slice(offset).lastIndexOf(needle) // strrpos' offset indicates starting point of range till end,
    // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
    if (i !== -1) {
      i += offset
    }
  } else {
    i = (haystack + '').lastIndexOf(needle)
  }
  return i >= 0 ? i : false
}
module.exports.strpos = (haystack, needle, offset) => {
  //  discuss at: https://locutus.io/php/strpos/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Daniel Esteban
  //   example 1: strpos('Kevin van Zonneveld', 'e', 5)
  //   returns 1: 14
  const i = (haystack + '').indexOf(needle, (offset || 0))
  return i === -1 ? false : i
}
module.exports.strlen = (string) => {
  //  discuss at: https://locutus.io/php/strlen/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Sakimori
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Kirk Strobeck
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //      note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
  //      note 1: characters and to this function in PHP which does not count the number of bytes
  //      note 1: but counts the number of characters, something like this is really necessary.
  //   example 1: strlen('Kevin van Zonneveld')
  //   returns 1: 19
  //   example 2: ini_set('unicode.semantics', 'on')
  //   example 2: strlen('A\ud87e\udc04Z')
  //   returns 2: 3
  const str = string + ''
  let i = 0
  let lgth = 0
  const getWholeChar = function (str, i) {
    const code = str.charCodeAt(i)
    let next = ''
    let prev = ''
    if (code >= 0xD800 && code <= 0xDBFF) {
      // High surrogate (could change last hex to 0xDB7F to
      // treat high private surrogates as single characters)
      if (str.length <= (i + 1)) {
        throw new Error('High surrogate without following low surrogate')
      }
      next = str.charCodeAt(i + 1)
      if (next < 0xDC00 || next > 0xDFFF) {
        throw new Error('High surrogate without following low surrogate')
      }
      return str.charAt(i) + str.charAt(i + 1)
    } else if (code >= 0xDC00 && code <= 0xDFFF) {
      // Low surrogate
      if (i === 0) {
        throw new Error('Low surrogate without preceding high surrogate')
      }
      prev = str.charCodeAt(i - 1)
      if (prev < 0xD800 || prev > 0xDBFF) {
        // (could change last hex to 0xDB7F to treat high private surrogates
        // as single characters)
        throw new Error('Low surrogate without preceding high surrogate')
      }
      // We can pass over low surrogates now as the second
      // component in a pair which we have already processed
      return false
    }
    return str.charAt(i)
  }
  for (i = 0, lgth = 0; i < str.length; i++) {
    if ((getWholeChar(str, i)) === false) {
      continue
    }
    // Adapt this line at the top of any loop, passing in the whole string and
    // the current iteration and returning a variable to represent the individual character;
    // purpose is to treat the first part of a surrogate pair as the whole character and then
    // ignore the second part
    lgth++
  }
  return lgth
}
module.exports.stripos = (fHaystack, fNeedle, fOffset) => {
  //  discuss at: https://locutus.io/php/stripos/
  // original by: Martijn Wieringa
  //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: stripos('ABC', 'a')
  //   returns 1: 0
  const haystack = (fHaystack + '').toLowerCase()
  const needle = (fNeedle + '').toLowerCase()
  let index = 0
  if ((index = haystack.indexOf(needle, fOffset)) !== -1) {
    return index
  }
  return false
}
module.exports.nl2br = ( str ) => { // Inserts HTML line breaks before all newlines in a string
  // 
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  return str.replace(/([^>])\n/g, '$1<br/>');
}
module.exports.strip_tags = (str, allowed_tags) => { 
  var key = '', allowed = false; 
  var matches = []; 
  var allowed_array = []; 
  var allowed_tag = ''; 
  var i = 0; 
  var k = ''; 
  var html = ''; 

  var replacer = function(search, replace, str) { 
      return str.split(search).join(replace); 
  }; 

  // Build allowes tags associative array 
  if (allowed_tags) { 
      allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi); 
  } 

  str += ''; 

  // Match tags 
  matches = str.match(/(<\/?[\S][^>]*>)/gi); 

  // Go through all HTML tags 
  for (key in matches) { 
      if (isNaN(key)) { 
          // IE7 Hack 
          continue; 
      } 

      // Save HTML tag 
      html = matches[key].toString(); 

      // Is tag not in allowed list? Remove from str! 
      allowed = false; 

      // Go through all allowed tags 
      for (k in allowed_array) { 
          // Init 
          allowed_tag = allowed_array[k]; 
          i = -1; 

          if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');} 
          if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');} 
          if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;} 

          // Determine 
          if (i == 0) { 
              allowed = true; 
              break; 
          } 
      } 

      if (!allowed) { 
          str = replacer(html, "", str); // Custom replace. No regexing 
      } 
  } 

  return str; 
}
module.exports.str_pad = (input, padLength, padString, padType) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/str_pad/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Michael White (https://getsprink.com)
  //    input by: Marco van Oort
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT')
  //   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
  //   example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')
  //   returns 2: '------Kevin van Zonneveld-----'
  let half = ''
  let padToGo
  const _strPadRepeater = function (s, len) {
    let collect = ''
    while (collect.length < len) {
      collect += s
    }
    collect = collect.substr(0, len)
    return collect
  }
  input += ''
  padString = padString !== undefined ? padString : ' '
  if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
    padType = 'STR_PAD_RIGHT'
  }
  if ((padToGo = padLength - input.length) > 0) {
    if (padType === 'STR_PAD_LEFT') {
      input = _strPadRepeater(padString, padToGo) + input
    } else if (padType === 'STR_PAD_RIGHT') {
      input = input + _strPadRepeater(padString, padToGo)
    } else if (padType === 'STR_PAD_BOTH') {
      half = _strPadRepeater(padString, Math.ceil(padToGo / 2))
      input = half + input + half
      input = input.substr(0, padLength)
    }
  }
  return input
}
module.exports.str_ireplace = (search, replace, subject, countObj) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/str_ireplace/
  // original by: Glen Arason (https://CanadianDomainRegistry.ca)
  //      note 1: Case-insensitive version of str_replace()
  //      note 1: Compliant with PHP 5.0 str_ireplace() Full details at:
  //      note 1: https://ca3.php.net/manual/en/function.str-ireplace.php
  //      note 2: The countObj parameter (optional) if used must be passed in as a
  //      note 2: object. The count will then be written by reference into it's `value` property
  //   example 1: str_ireplace('M', 'e', 'name')
  //   returns 1: 'naee'
  //   example 2: var $countObj = {}
  //   example 2: str_ireplace('M', 'e', 'name', $countObj)
  //   example 2: var $result = $countObj.value
  //   returns 2: 1
  let i = 0
  let j = 0
  let temp = ''
  let repl = ''
  let sl = 0
  let fl = 0
  let f = ''
  let r = ''
  let s = ''
  let ra = ''
  let otemp = ''
  let oi = ''
  let ofjl = ''
  let os = subject
  const osa = Object.prototype.toString.call(os) === '[object Array]'
  // var sa = ''
  if (typeof (search) === 'object') {
    temp = search
    search = []
    for (i = 0; i < temp.length; i += 1) {
      search[i] = temp[i].toLowerCase()
    }
  } else {
    search = search.toLowerCase()
  }
  if (typeof (subject) === 'object') {
    temp = subject
    subject = []
    for (i = 0; i < temp.length; i += 1) {
      subject[i] = temp[i].toLowerCase()
    }
  } else {
    subject = subject.toLowerCase()
  }
  if (typeof (search) === 'object' && typeof (replace) === 'string') {
    temp = replace
    replace = []
    for (i = 0; i < search.length; i += 1) {
      replace[i] = temp
    }
  }
  temp = ''
  f = [].concat(search)
  r = [].concat(replace)
  ra = Object.prototype.toString.call(r) === '[object Array]'
  s = subject
  // sa = Object.prototype.toString.call(s) === '[object Array]'
  s = [].concat(s)
  os = [].concat(os)
  if (countObj) {
    countObj.value = 0
  }
  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + ''
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
      s[i] = (temp).split(f[j]).join(repl)
      otemp = os[i] + ''
      oi = temp.indexOf(f[j])
      ofjl = f[j].length
      if (oi >= 0) {
        os[i] = (otemp).split(otemp.substr(oi, ofjl)).join(repl)
      }
      if (countObj) {
        countObj.value += ((temp.split(f[j])).length - 1)
      }
    }
  }
  return osa ? os : os[0]
}
module.exports.ltrim = (str, charlist) => {
  //  discuss at: https://locutus.io/php/ltrim/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Erkekjetter
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: ltrim('    Kevin van Zonneveld    ')
  //   returns 1: 'Kevin van Zonneveld    '
  charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
    .replace(/([[\]().?/*{}+$^:])/g, '$1')
  const re = new RegExp('^[' + charlist + ']+', 'g')
  return (str + '')
    .replace(re, '')
}
module.exports.rtrim = (str, charlist) => {
  //  discuss at: https://locutus.io/php/rtrim/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Erkekjetter
  //    input by: rem
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: rtrim('    Kevin van Zonneveld    ')
  //   returns 1: '    Kevin van Zonneveld'
  charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1')
  const re = new RegExp('[' + charlist + ']+$', 'g')
  return (str + '').replace(re, '')
}
module.exports.utf8_encode = (argString) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/utf8_encode/
  // original by: Webtoolkit.info (https://www.webtoolkit.info/)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: sowberry
  // improved by: Jack
  // improved by: Yves Sucaet
  // improved by: kirilloid
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Ulrich
  // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
  // bugfixed by: kirilloid
  //   example 1: utf8_encode('Kevin van Zonneveld')
  //   returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === 'undefined') {
    return ''
  }

  // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const string = (argString + '')
  let utftext = ''
  let start
  let end
  let stringl = 0

  start = end = 0
  stringl = string.length
  for (let n = 0; n < stringl; n++) {
    let c1 = string.charCodeAt(n)
    let enc = null

    if (c1 < 128) {
      end++
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(
        (c1 >> 6) | 192, (c1 & 63) | 128
      )
    } else if ((c1 & 0xF800) !== 0xD800) {
      enc = String.fromCharCode(
        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      )
    } else {
      // surrogate pairs
      if ((c1 & 0xFC00) !== 0xD800) {
        throw new RangeError('Unmatched trail surrogate at ' + n)
      }
      const c2 = string.charCodeAt(++n)
      if ((c2 & 0xFC00) !== 0xDC00) {
        throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
      }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
      enc = String.fromCharCode(
        (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      )
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end)
      }
      utftext += enc
      start = end = n + 1
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl)
  }

  return utftext
}
module.exports.md5 = (str) => {
  //  discuss at: https://locutus.io/php/md5/
  // original by: Webtoolkit.info (https://www.webtoolkit.info/)
  // improved by: Michael White (https://getsprink.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Keep in mind that in accordance with PHP, the whole string is buffered and then
  //      note 1: hashed. If available, we'd recommend using Node's native crypto modules directly
  //      note 1: in a steaming fashion for faster and more efficient hashing
  //   example 1: md5('Kevin van Zonneveld')
  //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
  let hash
  try {
    const crypto = require('crypto')
    const md5sum = crypto.createHash('md5')
    md5sum.update(str)
    hash = md5sum.digest('hex')
  } catch (e) {
    hash = undefined
  }
  if (hash !== undefined) {
    return hash
  }
  let xl
  const _rotateLeft = function (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
  }
  const _addUnsigned = function (lX, lY) {
    let lX4, lY4, lX8, lY8, lResult
    lX8 = (lX & 0x80000000)
    lY8 = (lY & 0x80000000)
    lX4 = (lX & 0x40000000)
    lY4 = (lY & 0x40000000)
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
      }
    } else {
      return (lResult ^ lX8 ^ lY8)
    }
  }
  const _F = function (x, y, z) {
    return (x & y) | ((~x) & z)
  }
  const _G = function (x, y, z) {
    return (x & z) | (y & (~z))
  }
  const _H = function (x, y, z) {
    return (x ^ y ^ z)
  }
  const _I = function (x, y, z) {
    return (y ^ (x | (~z)))
  }
  const _FF = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_F(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }
  const _GG = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_G(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }
  const _HH = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_H(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }
  const _II = function (a, b, c, d, x, s, ac) {
    a = _addUnsigned(a, _addUnsigned(_addUnsigned(_I(b, c, d), x), ac))
    return _addUnsigned(_rotateLeft(a, s), b)
  }
  const _convertToWordArray = function (str) {
    let lWordCount
    const lMessageLength = str.length
    const lNumberOfWordsTemp1 = lMessageLength + 8
    const lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
    const lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
    const lWordArray = new Array(lNumberOfWords - 1)
    let lBytePosition = 0
    let lByteCount = 0
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = (lWordArray[lWordCount] |
        (str.charCodeAt(lByteCount) << lBytePosition))
      lByteCount++
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
    return lWordArray
  }
  const _wordToHex = function (lValue) {
    let wordToHexValue = ''
    let wordToHexValueTemp = ''
    let lByte
    let lCount
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255
      wordToHexValueTemp = '0' + lByte.toString(16)
      wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2)
    }
    return wordToHexValue
  }
  let x = []
  let k
  let AA
  let BB
  let CC
  let DD
  let a
  let b
  let c
  let d
  const S11 = 7
  const S12 = 12
  const S13 = 17
  const S14 = 22
  const S21 = 5
  const S22 = 9
  const S23 = 14
  const S24 = 20
  const S31 = 4
  const S32 = 11
  const S33 = 16
  const S34 = 23
  const S41 = 6
  const S42 = 10
  const S43 = 15
  const S44 = 21
  str = module.exports.utf8_encode(str)
  x = _convertToWordArray(str)
  a = 0x67452301
  b = 0xEFCDAB89
  c = 0x98BADCFE
  d = 0x10325476
  xl = x.length
  for (k = 0; k < xl; k += 16) {
    AA = a
    BB = b
    CC = c
    DD = d
    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244)
    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314)
    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
    a = _addUnsigned(a, AA)
    b = _addUnsigned(b, BB)
    c = _addUnsigned(c, CC)
    d = _addUnsigned(d, DD)
  }
  const temp = _wordToHex(a) + _wordToHex(b) + _wordToHex(c) + _wordToHex(d)
  return temp.toLowerCase()
}
module.exports.htmlspecialchars = (string, quoteStyle, charset, doubleEncode) => {
  //       discuss at: https://locutus.io/php/htmlspecialchars/
  //      original by: Mirek Slugen
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      bugfixed by: Nathan
  //      bugfixed by: Arno
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //       revised by: Kevin van Zonneveld (https://kvz.io)
  //         input by: Ratheous
  //         input by: Mailfaker (https://www.weedem.fr/)
  //         input by: felix
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //           note 1: charset argument not supported
  //        example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES')
  //        returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
  //        example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES'])
  //        returns 2: 'ab"c&#039;d'
  //        example 3: htmlspecialchars('my "&entity;" is still here', null, null, false)
  //        returns 3: 'my &quot;&entity;&quot; is still here'
  let optTemp = 0
  let i = 0
  let noquotes = false
  if (typeof quoteStyle === 'undefined' || quoteStyle === null) {
    quoteStyle = 2
  }
  string = string || ''
  string = string.toString()
  if (doubleEncode !== false) {
    // Put this first to avoid double-encoding
    string = string.replace(/&/g, '&amp;')
  }
  string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const OPTS = {
    ENT_NOQUOTES: 0,
    ENT_HTML_QUOTE_SINGLE: 1,
    ENT_HTML_QUOTE_DOUBLE: 2,
    ENT_COMPAT: 2,
    ENT_QUOTES: 3,
    ENT_IGNORE: 4
  }
  if (quoteStyle === 0) {
    noquotes = true
  }
  if (typeof quoteStyle !== 'number') {
    // Allow for a single string or an array of string flags
    quoteStyle = [].concat(quoteStyle)
    for (i = 0; i < quoteStyle.length; i++) {
      // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
      if (OPTS[quoteStyle[i]] === 0) {
        noquotes = true
      } else if (OPTS[quoteStyle[i]]) {
        optTemp = optTemp | OPTS[quoteStyle[i]]
      }
    }
    quoteStyle = optTemp
  }
  if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/'/g, '&#039;')
  }
  if (!noquotes) {
    string = string.replace(/"/g, '&quot;')
  }
  return string
}
module.exports.get_html_translation_table = (table, quoteStyle) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/get_html_translation_table/
  // original by: Philip Peterson
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: noname
  // bugfixed by: Alex
  // bugfixed by: Marco
  // bugfixed by: madipta
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: T.Wild
  // improved by: KELAN
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: Frank Forte
  //    input by: Ratheous
  //      note 1: It has been decided that we're not going to add global
  //      note 1: dependencies to Locutus, meaning the constants are not
  //      note 1: real constants, but strings instead. Integers are also supported if someone
  //      note 1: chooses to create the constants themselves.
  //   example 1: get_html_translation_table('HTML_SPECIALCHARS')
  //   returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
  const entities = {}
  const hashMap = {}
  let decimal
  const constMappingTable = {}
  const constMappingQuoteStyle = {}
  let useTable = {}
  let useQuoteStyle = {}
  // Translate arguments
  constMappingTable[0] = 'HTML_SPECIALCHARS'
  constMappingTable[1] = 'HTML_ENTITIES'
  constMappingQuoteStyle[0] = 'ENT_NOQUOTES'
  constMappingQuoteStyle[2] = 'ENT_COMPAT'
  constMappingQuoteStyle[3] = 'ENT_QUOTES'
  useTable = !isNaN(table)
    ? constMappingTable[table]
    : table
      ? table.toUpperCase()
      : 'HTML_SPECIALCHARS'
  useQuoteStyle = !isNaN(quoteStyle)
    ? constMappingQuoteStyle[quoteStyle]
    : quoteStyle
      ? quoteStyle.toUpperCase()
      : 'ENT_COMPAT'
  if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
    throw new Error('Table: ' + useTable + ' not supported')
  }
  entities['38'] = '&amp;'
  if (useTable === 'HTML_ENTITIES') {
    entities['160'] = '&nbsp;'
    entities['161'] = '&iexcl;'
    entities['162'] = '&cent;'
    entities['163'] = '&pound;'
    entities['164'] = '&curren;'
    entities['165'] = '&yen;'
    entities['166'] = '&brvbar;'
    entities['167'] = '&sect;'
    entities['168'] = '&uml;'
    entities['169'] = '&copy;'
    entities['170'] = '&ordf;'
    entities['171'] = '&laquo;'
    entities['172'] = '&not;'
    entities['173'] = '&shy;'
    entities['174'] = '&reg;'
    entities['175'] = '&macr;'
    entities['176'] = '&deg;'
    entities['177'] = '&plusmn;'
    entities['178'] = '&sup2;'
    entities['179'] = '&sup3;'
    entities['180'] = '&acute;'
    entities['181'] = '&micro;'
    entities['182'] = '&para;'
    entities['183'] = '&middot;'
    entities['184'] = '&cedil;'
    entities['185'] = '&sup1;'
    entities['186'] = '&ordm;'
    entities['187'] = '&raquo;'
    entities['188'] = '&frac14;'
    entities['189'] = '&frac12;'
    entities['190'] = '&frac34;'
    entities['191'] = '&iquest;'
    entities['192'] = '&Agrave;'
    entities['193'] = '&Aacute;'
    entities['194'] = '&Acirc;'
    entities['195'] = '&Atilde;'
    entities['196'] = '&Auml;'
    entities['197'] = '&Aring;'
    entities['198'] = '&AElig;'
    entities['199'] = '&Ccedil;'
    entities['200'] = '&Egrave;'
    entities['201'] = '&Eacute;'
    entities['202'] = '&Ecirc;'
    entities['203'] = '&Euml;'
    entities['204'] = '&Igrave;'
    entities['205'] = '&Iacute;'
    entities['206'] = '&Icirc;'
    entities['207'] = '&Iuml;'
    entities['208'] = '&ETH;'
    entities['209'] = '&Ntilde;'
    entities['210'] = '&Ograve;'
    entities['211'] = '&Oacute;'
    entities['212'] = '&Ocirc;'
    entities['213'] = '&Otilde;'
    entities['214'] = '&Ouml;'
    entities['215'] = '&times;'
    entities['216'] = '&Oslash;'
    entities['217'] = '&Ugrave;'
    entities['218'] = '&Uacute;'
    entities['219'] = '&Ucirc;'
    entities['220'] = '&Uuml;'
    entities['221'] = '&Yacute;'
    entities['222'] = '&THORN;'
    entities['223'] = '&szlig;'
    entities['224'] = '&agrave;'
    entities['225'] = '&aacute;'
    entities['226'] = '&acirc;'
    entities['227'] = '&atilde;'
    entities['228'] = '&auml;'
    entities['229'] = '&aring;'
    entities['230'] = '&aelig;'
    entities['231'] = '&ccedil;'
    entities['232'] = '&egrave;'
    entities['233'] = '&eacute;'
    entities['234'] = '&ecirc;'
    entities['235'] = '&euml;'
    entities['236'] = '&igrave;'
    entities['237'] = '&iacute;'
    entities['238'] = '&icirc;'
    entities['239'] = '&iuml;'
    entities['240'] = '&eth;'
    entities['241'] = '&ntilde;'
    entities['242'] = '&ograve;'
    entities['243'] = '&oacute;'
    entities['244'] = '&ocirc;'
    entities['245'] = '&otilde;'
    entities['246'] = '&ouml;'
    entities['247'] = '&divide;'
    entities['248'] = '&oslash;'
    entities['249'] = '&ugrave;'
    entities['250'] = '&uacute;'
    entities['251'] = '&ucirc;'
    entities['252'] = '&uuml;'
    entities['253'] = '&yacute;'
    entities['254'] = '&thorn;'
    entities['255'] = '&yuml;'
  }
  if (useQuoteStyle !== 'ENT_NOQUOTES') {
    entities['34'] = '&quot;'
  }
  if (useQuoteStyle === 'ENT_QUOTES') {
    entities['39'] = '&#39;'
  }
  entities['60'] = '&lt;'
  entities['62'] = '&gt;'
  // ascii decimals to real symbols
  for (decimal in entities) {
    if (entities.hasOwnProperty(decimal)) {
      hashMap[String.fromCharCode(decimal)] = entities[decimal]
    }
  }
  return hashMap
}
module.exports.htmlentities = (string, quoteStyle, charset, doubleEncode) => {
  //  discuss at: https://locutus.io/php/htmlentities/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  // improved by: nobbler
  // improved by: Jack
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  // improved by: Dj (https://locutus.io/php/htmlentities:425#comment_134018)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //    input by: Ratheous
  //      note 1: function is compatible with PHP 5.2 and older
  //   example 1: htmlentities('Kevin & van Zonneveld')
  //   returns 1: 'Kevin &amp; van Zonneveld'
  //   example 2: htmlentities("foo'bar","ENT_QUOTES")
  //   returns 2: 'foo&#039;bar'
  const hashMap = module.exports.get_html_translation_table('HTML_ENTITIES', quoteStyle)
  string = string === null ? '' : string + ''
  if (!hashMap) {
    return false
  }
  if (quoteStyle && quoteStyle === 'ENT_QUOTES') {
    hashMap["'"] = '&#039;'
  }
  doubleEncode = doubleEncode === null || !!doubleEncode
  const regex = new RegExp('&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|[' +
    Object.keys(hashMap).join('')
    // replace regexp special chars
      .replace(/([()[\]{}\-.*+?^$|/\\])/g, '\\$1') + ']',
  'g')
  return string.replace(regex, function (ent) {
    if (ent.length > 1) {
      return doubleEncode ? hashMap['&'] + ent.substr(1) : ent
    }
    return hashMap[ent]
  })
}
module.exports.html_entity_decode = (string, quoteStyle) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/html_entity_decode/
  // original by: john (https://www.jd-tech.net)
  //    input by: ger
  //    input by: Ratheous
  //    input by: Nick Kolosov (https://sammy.ru)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: marc andreu
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Fox
  //   example 1: html_entity_decode('Kevin &amp; van Zonneveld')
  //   returns 1: 'Kevin & van Zonneveld'
  //   example 2: html_entity_decode('&amp;lt;')
  //   returns 2: '&lt;'
  let tmpStr = ''
  let entity = ''
  let symbol = ''
  tmpStr = string.toString()
  const hashMap = module.exports.get_html_translation_table('HTML_ENTITIES', quoteStyle)
  if (hashMap === false) {
    return false
  }
  // @todo: &amp; problem
  // https://locutus.io/php/get_html_translation_table:416#comment_97660
  delete (hashMap['&'])
  hashMap['&'] = '&amp;'
  for (symbol in hashMap) {
    entity = hashMap[symbol]
    tmpStr = tmpStr.split(entity).join(symbol)
  }
  tmpStr = tmpStr.split('&#039;').join("'")
  return tmpStr
}
module.exports.preg_replace = (pattern, replacement, string) => { // eslint-disable-line camelcase
  //   original by: rony2k6 (https://github.com/rony2k6)
  //   example 1: preg_replace('/xmas/i', 'Christmas', 'It was the night before Xmas.')
  //   returns 1: "It was the night before Christmas."
  //   example 2: preg_replace('/xmas/ig', 'Christmas', 'xMas: It was the night before Xmas.')
  //   returns 2: "Christmas: It was the night before Christmas."
  //   example 3: preg_replace('\/(\\w+) (\\d+), (\\d+)\/i', '$11,$3', 'April 15, 2003')
  //   returns 3: "April1,2003"
  //   example 4: preg_replace('/[^a-zA-Z0-9]+/', '', 'The Development of code . http://www.')
  //   returns 4: "TheDevelopmentofcodehttpwww"
  //   example 5: preg_replace('/[^A-Za-z0-9_\\s]/', '', 'D"usseldorfer H"auptstrasse')
  //   returns 5: "Dusseldorfer Hauptstrasse"
  let _flag = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1)
  _flag = (_flag !== '') ? _flag : 'g'
  const _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1)
  const regex = new RegExp(_pattern, _flag)
  const result = string.replace(regex, replacement)
  return result
}
module.exports.preg_quote = (str, delimiter) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/preg_quote/
  // original by: booeyOH
  // improved by: Ates Goral (https://magnetiq.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: preg_quote("$40")
  //   returns 1: '\\$40'
  //   example 2: preg_quote("*RRRING* Hello?")
  //   returns 2: '\\*RRRING\\* Hello\\?'
  //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:")
  //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'
  return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&')
}
module.exports.preg_match = (regex, str) => { // eslint-disable-line camelcase
  //   original by: Muhammad Humayun (https://github.com/ronypt)
  //   example 1: preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "rony@pharaohtools.com")
  //   returns 1: true
  //   example 2: preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "ronypharaohtools.com")
  //   returns 2: false
  return (new RegExp(regex).test(str))
}
let uniqidSeed = 0
module.exports.uniqid = (prefix, moreEntropy) => {
  //  discuss at: https://locutus.io/php/uniqid/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Kankrelune (https://www.webfaktory.info/)
  //      note 1: Uses an internal counter (in locutus global) to avoid collision
  //   example 1: var $id = uniqid()
  //   example 1: var $result = $id.length === 13
  //   returns 1: true
  //   example 2: var $id = uniqid('foo')
  //   example 2: var $result = $id.length === (13 + 'foo'.length)
  //   returns 2: true
  //   example 3: var $id = uniqid('bar', true)
  //   example 3: var $result = $id.length === (23 + 'bar'.length)
  //   returns 3: true
  if (typeof prefix === 'undefined') {
    prefix = ''
  }
  let retId
  const _formatSeed = function (seed, reqWidth) {
    seed = parseInt(seed, 10).toString(16) // to hex str
    if (reqWidth < seed.length) {
      // so long we split
      return seed.slice(seed.length - reqWidth)
    }
    if (reqWidth > seed.length) {
      // so short we pad
      return Array(1 + (reqWidth - seed.length)).join('0') + seed
    }
    return seed
  }
  if (!uniqidSeed) {
    // init seed with big random int
    uniqidSeed = Math.floor(Math.random() * 0x75bcd15)
  }
  uniqidSeed++
  // start with prefix, add current milliseconds hex string
  retId = prefix
  retId += _formatSeed(parseInt(new Date().getTime() / 1000, 10), 8)
  // add seed hex string
  retId += _formatSeed(uniqidSeed, 5)
  if (moreEntropy) {
    // for more entropy we add a float lower to 10
    retId += (Math.random() * 10).toFixed(8).toString()
  }
  return retId
}
module.exports.rand = ( min, max ) => { // Generate a random integer
  // 
  // +   original by: Leslie Hoare

  if( max ) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * (min + 1));
  }
}
let last_error_json = 0
module.exports.json_decode = (strJson) => { // eslint-disable-line camelcase
  //       discuss at: https://phpjs.org/functions/json_decode/
  //      original by: Public Domain (https://www.json.org/json2.js)
  // reimplemented by: Kevin van Zonneveld (https://kevin.vanzonneveld.net)
  //      improved by: T.J. Leahy
  //      improved by: Michael White
  //           note 1: If node or the browser does not offer JSON.parse,
  //           note 1: this function falls backslash
  //           note 1: to its own implementation using eval, and hence should be considered unsafe
  //        example 1: json_decode('[ 1 ]')
  //        returns 1: [1]
  /*
    https://www.JSON.org/json2.js
    2008-11-19
    Public Domain.
    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    See https://www.JSON.org/js.html
  */
  try {
    return JSON.parse(strJson)
  } catch (err) {
    if (!(err instanceof SyntaxError)) {
      throw new Error('Unexpected error type in json_decode()')
    }
    // usable by json_last_error()
    last_error_json = 4
    return null
  }
}
module.exports.date = (format, timestamp) => {
  //  discuss at: https://locutus.io/php/date/
  // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
  // original by: gettimeofday
  //    parts by: Peter-Paul Koch (https://www.quirksmode.org/js/beat.html)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: MeEtc (https://yass.meetcweb.com)
  // improved by: Brad Touesnard
  // improved by: Tim Wiel
  // improved by: Bryan Elliott
  // improved by: David Randall
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Thomas Beaucourt (https://www.webapp.fr)
  // improved by: JT
  // improved by: Theriault (https://github.com/Theriault)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  // improved by: Theriault (https://github.com/Theriault)
  //    input by: Brett Zamir (https://brett-zamir.me)
  //    input by: majak
  //    input by: Alex
  //    input by: Martin
  //    input by: Alex Wilson
  //    input by: Haravikk
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: majak
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: omid (https://locutus.io/php/380:380#comment_137122)
  // bugfixed by: Chris (https://www.devotis.nl/)
  //      note 1: Uses global: locutus to store the default timezone
  //      note 1: Although the function potentially allows timezone info
  //      note 1: (see notes), it currently does not set
  //      note 1: per a timezone specified by date_default_timezone_set(). Implementers might use
  //      note 1: $locutus.currentTimezoneOffset and
  //      note 1: $locutus.currentTimezoneDST set by that function
  //      note 1: in order to adjust the dates in this function
  //      note 1: (or our other date functions!) accordingly
  //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)
  //   returns 1: '07:09:40 m is month'
  //   example 2: date('F j, Y, g:i a', 1062462400)
  //   returns 2: 'September 2, 2003, 12:26 am'
  //   example 3: date('Y W o', 1062462400)
  //   returns 3: '2003 36 2003'
  //   example 4: var $x = date('Y m d', (new Date()).getTime() / 1000)
  //   example 4: $x = $x + ''
  //   example 4: var $result = $x.length // 2009 01 09
  //   returns 4: 10
  //   example 5: date('W', 1104534000)
  //   returns 5: '52'
  //   example 6: date('B t', 1104534000)
  //   returns 6: '999 31'
  //   example 7: date('W U', 1293750000.82); // 2010-12-31
  //   returns 7: '52 1293750000'
  //   example 8: date('W', 1293836400); // 2011-01-01
  //   returns 8: '52'
  //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  //   returns 9: '52 2011-01-02'
  //        test: skip-1 skip-2 skip-5
  let jsdate, f
  // Keep this here (works, but for code commented-out below for file size reasons)
  // var tal= [];
  const txtWords = [
    'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  // trailing backslash -> (dropped)
  // a backslash followed by any character (including backslash) -> the character
  // empty string -> empty string
  const formatChr = /\\?(.?)/gi
  const formatChrCb = function (t, s) {
    return f[t] ? f[t]() : s
  }
  const _pad = function (n, c) {
    n = String(n)
    while (n.length < c) {
      n = '0' + n
    }
    return n
  }
  f = {
    // Day
    d: function () {
      // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2)
    },
    D: function () {
      // Shorthand day name; Mon...Sun
      return f.l()
        .slice(0, 3)
    },
    j: function () {
      // Day of month; 1..31
      return jsdate.getDate()
    },
    l: function () {
      // Full day name; Monday...Sunday
      return txtWords[f.w()] + 'day'
    },
    N: function () {
      // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7
    },
    S: function () {
      // Ordinal suffix for day of month; st, nd, rd, th
      const j = f.j()
      let i = j % 10
      if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
        i = 0
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th'
    },
    w: function () {
      // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay()
    },
    z: function () {
      // Day of year; 0..365
      const a = new Date(f.Y(), f.n() - 1, f.j())
      const b = new Date(f.Y(), 0, 1)
      return Math.round((a - b) / 864e5)
    },
    // Week
    W: function () {
      // ISO-8601 week number
      const a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3)
      const b = new Date(a.getFullYear(), 0, 4)
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2)
    },
    // Month
    F: function () {
      // Full month name; January...December
      return txtWords[6 + f.n()]
    },
    m: function () {
      // Month w/leading 0; 01...12
      return _pad(f.n(), 2)
    },
    M: function () {
      // Shorthand month name; Jan...Dec
      return f.F()
        .slice(0, 3)
    },
    n: function () {
      // Month; 1...12
      return jsdate.getMonth() + 1
    },
    t: function () {
      // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0))
        .getDate()
    },
    // Year
    L: function () {
      // Is leap year?; 0 or 1
      const j = f.Y()
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0
    },
    o: function () {
      // ISO-8601 year
      const n = f.n()
      const W = f.W()
      const Y = f.Y()
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
    },
    Y: function () {
      // Full year; e.g. 1980...2010
      return jsdate.getFullYear()
    },
    y: function () {
      // Last two digits of year; 00...99
      return f.Y()
        .toString()
        .slice(-2)
    },
    // Time
    a: function () {
      // am or pm
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function () {
      // AM or PM
      return f.a()
        .toUpperCase()
    },
    B: function () {
      // Swatch Internet time; 000..999
      const H = jsdate.getUTCHours() * 36e2
      // Hours
      const i = jsdate.getUTCMinutes() * 60
      // Minutes
      // Seconds
      const s = jsdate.getUTCSeconds()
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3)
    },
    g: function () {
      // 12-Hours; 1..12
      return f.G() % 12 || 12
    },
    G: function () {
      // 24-Hours; 0..23
      return jsdate.getHours()
    },
    h: function () {
      // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2)
    },
    H: function () {
      // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2)
    },
    i: function () {
      // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2)
    },
    s: function () {
      // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2)
    },
    u: function () {
      // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6)
    },
    // Timezone
    e: function () {
      // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      /*              return that.date_default_timezone_get();
       */
      const msg = 'Not supported (see source code of date() for timezone on how to add support)'
      throw new Error(msg)
    },
    I: function () {
      // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      const a = new Date(f.Y(), 0)
      // Jan 1
      const c = Date.UTC(f.Y(), 0)
      // Jan 1 UTC
      const b = new Date(f.Y(), 6)
      // Jul 1
      // Jul 1 UTC
      const d = Date.UTC(f.Y(), 6)
      return ((a - c) !== (b - d)) ? 1 : 0
    },
    O: function () {
      // Difference to GMT in hour format; e.g. +0200
      const tzo = jsdate.getTimezoneOffset()
      const a = Math.abs(tzo)
      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
    },
    P: function () {
      // Difference to GMT w/colon; e.g. +02:00
      const O = f.O()
      return (O.substr(0, 3) + ':' + O.substr(3, 2))
    },
    T: function () {
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
      /*              var abbr, i, os, _default;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if ($locutus && $locutus.default_timezone) {
        _default = $locutus.default_timezone;
        for (abbr in tal) {
          for (i = 0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === _default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
      */
      return 'UTC'
    },
    Z: function () {
      // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60
    },
    // Full Date/Time
    c: function () {
      // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb)
    },
    r: function () {
      // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb)
    },
    U: function () {
      // Seconds since UNIX epoch
      return jsdate / 1000 | 0
    }
  }
  const _date = function (format, timestamp) {
    jsdate = (timestamp === undefined ? new Date() // Not provided
      : (timestamp instanceof Date) ? new Date(timestamp) // JS Date()
          : new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    )
    return format.replace(formatChr, formatChrCb)
  }
  return _date(format, timestamp)
}
module.exports.usort = (inputArr, sorter) => {
  //  discuss at: https://locutus.io/php/usort/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $stuff = {d: '3', a: '1', b: '11', c: '4'}
  //   example 1: usort($stuff, function (a, b) { return (a - b) })
  //   example 1: var $result = $stuff
  //   returns 1: {0: '1', 1: '3', 2: '4', 3: '11'}
  const valArr = []
  let k = ''
  let i = 0
  let populateArr = {}
  if (typeof sorter === 'string') {
    sorter = this[sorter]
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]]
  }
  populateArr = inputArr
  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k])
      delete inputArr[k]
    }
  }
  try {
    valArr.sort(sorter)
  } catch (e) {
    return false
  }
  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i]
  }
  return populateArr
}
module.exports.uksort = (inputArr, sorter) => {
  //  discuss at: https://locutus.io/php/uksort/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: The examples are correct, this is a new way
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uksort($data, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
  const tmpArr = {}
  const keys = []
  let i = 0
  let k = ''
  let populateArr = {}
  if (typeof sorter === 'string') {
    sorter = this.window[sorter]
  }
  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k)
    }
  }
  // Sort key names
  try {
    if (sorter) {
      keys.sort(sorter)
    } else {
      keys.sort()
    }
  } catch (e) {
    return false
  }
  populateArr = inputArr
  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i]
    tmpArr[k] = inputArr[k]
    delete inputArr[k]
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i]
    }
  }
  return populateArr
}
module.exports.uasort = (inputArr, sorter) => {
  //  discuss at: https://locutus.io/php/uasort/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $sorter = function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;}
  //   example 1: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uasort($fruits, $sorter)
  //   example 1: var $result = $fruits
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
  const valArr = []
  let k = ''
  let i = 0
  let populateArr = {}
  if (typeof sorter === 'string') {
    sorter = this[sorter]
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]]
  }
  populateArr = inputArr
  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]])
      delete inputArr[k]
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1])
  })
  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[valArr[i][0]] = valArr[i][1]
  }
  return populateArr
}
module.exports.count = (mixedVar, mode) => {
  //  discuss at: https://locutus.io/php/count/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Waldo Malqui Silva (https://waldo.malqui.info)
  //    input by: merabi
  // bugfixed by: Soren Hansen
  // bugfixed by: Olivier Louvignes (https://mg-crea.com/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6
  let key
  let cnt = 0
  if (mixedVar === null || typeof mixedVar === 'undefined') {
    return 0
  } else if (mixedVar.constructor !== Array && mixedVar.constructor !== Object) {
    return 1
  }
  if (mode === 'COUNT_RECURSIVE') {
    mode = 1
  }
  if (mode !== 1) {
    mode = 0
  }
  for (key in mixedVar) {
    if (mixedVar.hasOwnProperty(key)) {
      cnt++
      if (mode === 1 && mixedVar[key] &&
        (mixedVar[key].constructor === Array ||
          mixedVar[key].constructor === Object)) {
        cnt += count(mixedVar[key], 1)
      }
    }
  }
  return cnt
}
module.exports.sizeof = (mixedVar, mode) => {
  //  discuss at: https://locutus.io/php/sizeof/
  // original by: Philip Peterson
  //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6
  return module.exports.count(mixedVar, mode)
}
module.exports.shuffle = (inputArr) => {
  //  discuss at: https://locutus.io/php/shuffle/
  // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5}
  //   example 1: ini_set('locutus.sortByReference', true)
  //   example 1: shuffle($data)
  //   example 1: var $result = $data.q
  //   returns 1: 5
  const valArr = []
  let k = ''
  let i = 0
  let populateArr = []
  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k])
      delete inputArr[k]
    }
  }
  valArr.sort(function () {
    return 0.5 - Math.random()
  })
  populateArr = inputArr
  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i]
  }
  return populateArr
}
module.exports.current = (arr) => {
  //  discuss at: https://locutus.io/php/current/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: current($transport)
  //   returns 1: 'foot'
  const pointers = []
  const indexOf = function (value) {
    for (let i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i
      }
    }
    return -1
  }
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0)
  }
  const arrpos = pointers.indexOf(arr)
  const cursor = pointers[arrpos + 1]
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return arr[cursor] || false
  }
  let ct = 0
  for (const k in arr) {
    if (ct === cursor) {
      return arr[k]
    }
    ct++
  }
  // Empty
  return false
}
module.exports.array_reverse = (array, preserveKeys) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_reverse/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Karol Kowalski
  //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
  //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}
  const isArray = Object.prototype.toString.call(array) === '[object Array]'
  const tmpArr = preserveKeys ? {} : []
  let key
  if (isArray && !preserveKeys) {
    return array.slice(0).reverse()
  }
  if (preserveKeys) {
    const keys = []
    for (key in array) {
      keys.push(key)
    }
    let i = keys.length
    while (i--) {
      key = keys[i]
      // @todo: don't rely on browsers keeping keys in insertion order
      // it's implementation specific
      // eg. the result will differ from expected in Google Chrome
      tmpArr[key] = array[key]
    }
  } else {
    for (key in array) {
      tmpArr.unshift(array[key])
    }
  }
  return tmpArr
}
module.exports.array_merge = () => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_merge/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Nate
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //    input by: josh
  //   example 1: var $arr1 = {"color": "red", 0: 2, 1: 4}
  //   example 1: var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
  //   example 1: array_merge($arr1, $arr2)
  //   returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
  //   example 2: var $arr1 = []
  //   example 2: var $arr2 = {1: "data"}
  //   example 2: array_merge($arr1, $arr2)
  //   returns 2: {0: "data"}
  const args = Array.prototype.slice.call(arguments)
  const argl = args.length
  let arg
  const retObj = {}
  let k = ''
  let argil = 0
  let j = 0
  let i = 0
  let ct = 0
  const toStr = Object.prototype.toString
  let retArr = true
  for (i = 0; i < argl; i++) {
    if (toStr.call(args[i]) !== '[object Array]') {
      retArr = false
      break
    }
  }
  if (retArr) {
    retArr = []
    for (i = 0; i < argl; i++) {
      retArr = retArr.concat(args[i])
    }
    return retArr
  }
  for (i = 0, ct = 0; i < argl; i++) {
    arg = args[i]
    if (toStr.call(arg) === '[object Array]') {
      for (j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j]
      }
    } else {
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k]
          } else {
            retObj[k] = arg[k]
          }
        }
      }
    }
  }
  return retObj
}
const reSpace = '[ \\t]+'
const reSpaceOpt = '[ \\t]*'
const reMeridian = '(?:([ap])\\.?m\\.?([\\t ]|$))'
const reHour24 = '(2[0-4]|[01]?[0-9])'
const reHour24lz = '([01][0-9]|2[0-4])'
const reHour12 = '(0?[1-9]|1[0-2])'
const reMinute = '([0-5]?[0-9])'
const reMinutelz = '([0-5][0-9])'
const reSecond = '(60|[0-5]?[0-9])'
const reSecondlz = '(60|[0-5][0-9])'
const reFrac = '(?:\\.([0-9]+))'

const reDayfull = 'sunday|monday|tuesday|wednesday|thursday|friday|saturday'
const reDayabbr = 'sun|mon|tue|wed|thu|fri|sat'
const reDaytext = reDayfull + '|' + reDayabbr + '|weekdays?'

const reReltextnumber = 'first|second|third|fourth|fifth|sixth|seventh|eighth?|ninth|tenth|eleventh|twelfth'
const reReltexttext = 'next|last|previous|this'
const reReltextunit = '(?:second|sec|minute|min|hour|day|fortnight|forthnight|month|year)s?|weeks|' + reDaytext

const reYear = '([0-9]{1,4})'
const reYear2 = '([0-9]{2})'
const reYear4 = '([0-9]{4})'
const reYear4withSign = '([+-]?[0-9]{4})'
const reMonth = '(1[0-2]|0?[0-9])'
const reMonthlz = '(0[0-9]|1[0-2])'
const reDay = '(?:(3[01]|[0-2]?[0-9])(?:st|nd|rd|th)?)'
const reDaylz = '(0[0-9]|[1-2][0-9]|3[01])'

const reMonthFull = 'january|february|march|april|may|june|july|august|september|october|november|december'
const reMonthAbbr = 'jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec'
const reMonthroman = 'i[vx]|vi{0,3}|xi{0,2}|i{1,3}'
const reMonthText = '(' + reMonthFull + '|' + reMonthAbbr + '|' + reMonthroman + ')'

const reTzCorrection = '((?:GMT)?([+-])' + reHour24 + ':?' + reMinute + '?)'
const reTzAbbr = '\\(?([a-zA-Z]{1,6})\\)?'
const reDayOfYear = '(00[1-9]|0[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6])'
const reWeekOfYear = '(0[1-9]|[1-4][0-9]|5[0-3])'

const reDateNoYear = reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]*'

function processMeridian (hour, meridian) {
  meridian = meridian && meridian.toLowerCase()

  switch (meridian) {
    case 'a':
      hour += hour === 12 ? -12 : 0
      break
    case 'p':
      hour += hour !== 12 ? 12 : 0
      break
  }

  return hour
}

function processYear (yearStr) {
  let year = +yearStr

  if (yearStr.length < 4 && year < 100) {
    year += year < 70 ? 2000 : 1900
  }

  return year
}

function lookupMonth (monthStr) {
  return {
    jan: 0,
    january: 0,
    i: 0,
    feb: 1,
    february: 1,
    ii: 1,
    mar: 2,
    march: 2,
    iii: 2,
    apr: 3,
    april: 3,
    iv: 3,
    may: 4,
    v: 4,
    jun: 5,
    june: 5,
    vi: 5,
    jul: 6,
    july: 6,
    vii: 6,
    aug: 7,
    august: 7,
    viii: 7,
    sep: 8,
    sept: 8,
    september: 8,
    ix: 8,
    oct: 9,
    october: 9,
    x: 9,
    nov: 10,
    november: 10,
    xi: 10,
    dec: 11,
    december: 11,
    xii: 11
  }[monthStr.toLowerCase()]
}

function lookupWeekday (dayStr, desiredSundayNumber = 0) {
  const dayNumbers = {
    mon: 1,
    monday: 1,
    tue: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
    sun: 0,
    sunday: 0
  }

  return dayNumbers[dayStr.toLowerCase()] || desiredSundayNumber
}

function lookupRelative (relText) {
  const relativeNumbers = {
    last: -1,
    previous: -1,
    this: 0,
    first: 1,
    next: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
    eight: 8,
    eighth: 8,
    ninth: 9,
    tenth: 10,
    eleventh: 11,
    twelfth: 12
  }

  const relativeBehavior = {
    this: 1
  }

  const relTextLower = relText.toLowerCase()

  return {
    amount: relativeNumbers[relTextLower],
    behavior: relativeBehavior[relTextLower] || 0
  }
}

function processTzCorrection (tzOffset, oldValue) {
  const reTzCorrectionLoose = /(?:GMT)?([+-])(\d+)(:?)(\d{0,2})/i
  tzOffset = tzOffset && tzOffset.match(reTzCorrectionLoose)

  if (!tzOffset) {
    return oldValue
  }

  const sign = tzOffset[1] === '-' ? -1 : 1
  let hours = +tzOffset[2]
  let minutes = +tzOffset[4]

  if (!tzOffset[4] && !tzOffset[3]) {
    minutes = Math.floor(hours % 100)
    hours = Math.floor(hours / 100)
  }

  // timezone offset in seconds
  return sign * (hours * 60 + minutes) * 60
}

// tz abbrevation : tz offset in seconds
const tzAbbrOffsets = {
  acdt: 37800,
  acst: 34200,
  addt: -7200,
  adt: -10800,
  aedt: 39600,
  aest: 36000,
  ahdt: -32400,
  ahst: -36000,
  akdt: -28800,
  akst: -32400,
  amt: -13840,
  apt: -10800,
  ast: -14400,
  awdt: 32400,
  awst: 28800,
  awt: -10800,
  bdst: 7200,
  bdt: -36000,
  bmt: -14309,
  bst: 3600,
  cast: 34200,
  cat: 7200,
  cddt: -14400,
  cdt: -18000,
  cemt: 10800,
  cest: 7200,
  cet: 3600,
  cmt: -15408,
  cpt: -18000,
  cst: -21600,
  cwt: -18000,
  chst: 36000,
  dmt: -1521,
  eat: 10800,
  eddt: -10800,
  edt: -14400,
  eest: 10800,
  eet: 7200,
  emt: -26248,
  ept: -14400,
  est: -18000,
  ewt: -14400,
  ffmt: -14660,
  fmt: -4056,
  gdt: 39600,
  gmt: 0,
  gst: 36000,
  hdt: -34200,
  hkst: 32400,
  hkt: 28800,
  hmt: -19776,
  hpt: -34200,
  hst: -36000,
  hwt: -34200,
  iddt: 14400,
  idt: 10800,
  imt: 25025,
  ist: 7200,
  jdt: 36000,
  jmt: 8440,
  jst: 32400,
  kdt: 36000,
  kmt: 5736,
  kst: 30600,
  lst: 9394,
  mddt: -18000,
  mdst: 16279,
  mdt: -21600,
  mest: 7200,
  met: 3600,
  mmt: 9017,
  mpt: -21600,
  msd: 14400,
  msk: 10800,
  mst: -25200,
  mwt: -21600,
  nddt: -5400,
  ndt: -9052,
  npt: -9000,
  nst: -12600,
  nwt: -9000,
  nzdt: 46800,
  nzmt: 41400,
  nzst: 43200,
  pddt: -21600,
  pdt: -25200,
  pkst: 21600,
  pkt: 18000,
  plmt: 25590,
  pmt: -13236,
  ppmt: -17340,
  ppt: -25200,
  pst: -28800,
  pwt: -25200,
  qmt: -18840,
  rmt: 5794,
  sast: 7200,
  sdmt: -16800,
  sjmt: -20173,
  smt: -13884,
  sst: -39600,
  tbmt: 10751,
  tmt: 12344,
  uct: 0,
  utc: 0,
  wast: 7200,
  wat: 3600,
  wemt: 7200,
  west: 3600,
  wet: 0,
  wib: 25200,
  wita: 28800,
  wit: 32400,
  wmt: 5040,
  yddt: -25200,
  ydt: -28800,
  ypt: -28800,
  yst: -32400,
  ywt: -28800,
  a: 3600,
  b: 7200,
  c: 10800,
  d: 14400,
  e: 18000,
  f: 21600,
  g: 25200,
  h: 28800,
  i: 32400,
  k: 36000,
  l: 39600,
  m: 43200,
  n: -3600,
  o: -7200,
  p: -10800,
  q: -14400,
  r: -18000,
  s: -21600,
  t: -25200,
  u: -28800,
  v: -32400,
  w: -36000,
  x: -39600,
  y: -43200,
  z: 0
}

const formats = {
  yesterday: {
    regex: /^yesterday/i,
    name: 'yesterday',
    callback () {
      this.rd -= 1
      return this.resetTime()
    }
  },

  now: {
    regex: /^now/i,
    name: 'now'
    // do nothing
  },

  noon: {
    regex: /^noon/i,
    name: 'noon',
    callback () {
      return this.resetTime() && this.time(12, 0, 0, 0)
    }
  },

  midnightOrToday: {
    regex: /^(midnight|today)/i,
    name: 'midnight | today',
    callback () {
      return this.resetTime()
    }
  },

  tomorrow: {
    regex: /^tomorrow/i,
    name: 'tomorrow',
    callback () {
      this.rd += 1
      return this.resetTime()
    }
  },

  timestamp: {
    regex: /^@(-?\d+)/i,
    name: 'timestamp',
    callback (match, timestamp) {
      this.rs += +timestamp
      this.y = 1970
      this.m = 0
      this.d = 1
      this.dates = 0

      return this.resetTime() && this.zone(0)
    }
  },

  firstOrLastDay: {
    regex: /^(first|last) day of/i,
    name: 'firstdayof | lastdayof',
    callback (match, day) {
      if (day.toLowerCase() === 'first') {
        this.firstOrLastDayOfMonth = 1
      } else {
        this.firstOrLastDayOfMonth = -1
      }
    }
  },

  backOrFrontOf: {
    regex: RegExp('^(back|front) of ' + reHour24 + reSpaceOpt + reMeridian + '?', 'i'),
    name: 'backof | frontof',
    callback (match, side, hours, meridian) {
      const back = side.toLowerCase() === 'back'
      let hour = +hours
      let minute = 15

      if (!back) {
        hour -= 1
        minute = 45
      }

      hour = processMeridian(hour, meridian)

      return this.resetTime() && this.time(hour, minute, 0, 0)
    }
  },

  weekdayOf: {
    regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reDayfull + '|' + reDayabbr + ')' + reSpace + 'of', 'i'),
    name: 'weekdayof'
    // todo
  },

  mssqltime: {
    regex: RegExp('^' + reHour12 + ':' + reMinutelz + ':' + reSecondlz + '[:.]([0-9]+)' + reMeridian, 'i'),
    name: 'mssqltime',
    callback (match, hour, minute, second, frac, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, +second, +frac.substr(0, 3))
    }
  },

  timeLong12: {
    regex: RegExp('^' + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
    name: 'timelong12',
    callback (match, hour, minute, second, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, +second, 0)
    }
  },

  timeShort12: {
    regex: RegExp('^' + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
    name: 'timeshort12',
    callback (match, hour, minute, meridian) {
      return this.time(processMeridian(+hour, meridian), +minute, 0, 0)
    }
  },

  timeTiny12: {
    regex: RegExp('^' + reHour12 + reSpaceOpt + reMeridian, 'i'),
    name: 'timetiny12',
    callback (match, hour, meridian) {
      return this.time(processMeridian(+hour, meridian), 0, 0, 0)
    }
  },

  soap: {
    regex: RegExp('^' + reYear4 + '-' + reMonthlz + '-' + reDaylz + 'T' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reFrac + reTzCorrection + '?', 'i'),
    name: 'soap',
    callback (match, year, month, day, hour, minute, second, frac, tzCorrection) {
      return this.ymd(+year, month - 1, +day) &&
              this.time(+hour, +minute, +second, +frac.substr(0, 3)) &&
              this.zone(processTzCorrection(tzCorrection))
    }
  },

  wddx: {
    regex: RegExp('^' + reYear4 + '-' + reMonth + '-' + reDay + 'T' + reHour24 + ':' + reMinute + ':' + reSecond),
    name: 'wddx',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  exif: {
    regex: RegExp('^' + reYear4 + ':' + reMonthlz + ':' + reDaylz + ' ' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz, 'i'),
    name: 'exif',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  xmlRpc: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + 'T' + reHour24 + ':' + reMinutelz + ':' + reSecondlz),
    name: 'xmlrpc',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  xmlRpcNoColon: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz + '[Tt]' + reHour24 + reMinutelz + reSecondlz),
    name: 'xmlrpcnocolon',
    callback (match, year, month, day, hour, minute, second) {
      return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  clf: {
    regex: RegExp('^' + reDay + '/(' + reMonthAbbr + ')/' + reYear4 + ':' + reHour24lz + ':' + reMinutelz + ':' + reSecondlz + reSpace + reTzCorrection, 'i'),
    name: 'clf',
    callback (match, day, month, year, hour, minute, second, tzCorrection) {
      return this.ymd(+year, lookupMonth(month), +day) &&
              this.time(+hour, +minute, +second, 0) &&
              this.zone(processTzCorrection(tzCorrection))
    }
  },

  iso8601long: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond + reFrac, 'i'),
    name: 'iso8601long',
    callback (match, hour, minute, second, frac) {
      return this.time(+hour, +minute, +second, +frac.substr(0, 3))
    }
  },

  dateTextual: {
    regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reDay + '[,.stndrh\\t ]+' + reYear, 'i'),
    name: 'datetextual',
    callback (match, month, day, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  pointedDate4: {
    regex: RegExp('^' + reDay + '[.\\t-]' + reMonth + '[.-]' + reYear4),
    name: 'pointeddate4',
    callback (match, day, month, year) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  pointedDate2: {
    regex: RegExp('^' + reDay + '[.\\t]' + reMonth + '\\.' + reYear2),
    name: 'pointeddate2',
    callback (match, day, month, year) {
      return this.ymd(processYear(year), month - 1, +day)
    }
  },

  timeLong24: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond),
    name: 'timelong24',
    callback (match, hour, minute, second) {
      return this.time(+hour, +minute, +second, 0)
    }
  },

  dateNoColon: {
    regex: RegExp('^' + reYear4 + reMonthlz + reDaylz),
    name: 'datenocolon',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  pgydotd: {
    regex: RegExp('^' + reYear4 + '\\.?' + reDayOfYear),
    name: 'pgydotd',
    callback (match, year, day) {
      return this.ymd(+year, 0, +day)
    }
  },

  timeShort24: {
    regex: RegExp('^t?' + reHour24 + '[:.]' + reMinute, 'i'),
    name: 'timeshort24',
    callback (match, hour, minute) {
      return this.time(+hour, +minute, 0, 0)
    }
  },

  iso8601noColon: {
    regex: RegExp('^t?' + reHour24lz + reMinutelz + reSecondlz, 'i'),
    name: 'iso8601nocolon',
    callback (match, hour, minute, second) {
      return this.time(+hour, +minute, +second, 0)
    }
  },

  iso8601dateSlash: {
    // eventhough the trailing slash is optional in PHP
    // here it's mandatory and inputs without the slash
    // are handled by dateslash
    regex: RegExp('^' + reYear4 + '/' + reMonthlz + '/' + reDaylz + '/'),
    name: 'iso8601dateslash',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  dateSlash: {
    regex: RegExp('^' + reYear4 + '/' + reMonth + '/' + reDay),
    name: 'dateslash',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  american: {
    regex: RegExp('^' + reMonth + '/' + reDay + '/' + reYear),
    name: 'american',
    callback (match, month, day, year) {
      return this.ymd(processYear(year), month - 1, +day)
    }
  },

  americanShort: {
    regex: RegExp('^' + reMonth + '/' + reDay),
    name: 'americanshort',
    callback (match, month, day) {
      return this.ymd(this.y, month - 1, +day)
    }
  },

  gnuDateShortOrIso8601date2: {
    // iso8601date2 is complete subset of gnudateshort
    regex: RegExp('^' + reYear + '-' + reMonth + '-' + reDay),
    name: 'gnudateshort | iso8601date2',
    callback (match, year, month, day) {
      return this.ymd(processYear(year), month - 1, +day)
    }
  },

  iso8601date4: {
    regex: RegExp('^' + reYear4withSign + '-' + reMonthlz + '-' + reDaylz),
    name: 'iso8601date4',
    callback (match, year, month, day) {
      return this.ymd(+year, month - 1, +day)
    }
  },

  gnuNoColon: {
    regex: RegExp('^t?' + reHour24lz + reMinutelz, 'i'),
    name: 'gnunocolon',
    callback (match, hour, minute) {
      // this rule is a special case
      // if time was already set once by any preceding rule, it sets the captured value as year
      switch (this.times) {
        case 0:
          return this.time(+hour, +minute, 0, this.f)
        case 1:
          this.y = hour * 100 + +minute
          this.times++

          return true
        default:
          return false
      }
    }
  },

  gnuDateShorter: {
    regex: RegExp('^' + reYear4 + '-' + reMonth),
    name: 'gnudateshorter',
    callback (match, year, month) {
      return this.ymd(+year, month - 1, 1)
    }
  },

  pgTextReverse: {
    // note: allowed years are from 32-9999
    // years below 32 should be treated as days in datefull
    regex: RegExp('^' + '(\\d{3,4}|[4-9]\\d|3[2-9])-(' + reMonthAbbr + ')-' + reDaylz, 'i'),
    name: 'pgtextreverse',
    callback (match, year, month, day) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  dateFull: {
    regex: RegExp('^' + reDay + '[ \\t.-]*' + reMonthText + '[ \\t.-]*' + reYear, 'i'),
    name: 'datefull',
    callback (match, day, month, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  dateNoDay: {
    regex: RegExp('^' + reMonthText + '[ .\\t-]*' + reYear4, 'i'),
    name: 'datenoday',
    callback (match, month, year) {
      return this.ymd(+year, lookupMonth(month), 1)
    }
  },

  dateNoDayRev: {
    regex: RegExp('^' + reYear4 + '[ .\\t-]*' + reMonthText, 'i'),
    name: 'datenodayrev',
    callback (match, year, month) {
      return this.ymd(+year, lookupMonth(month), 1)
    }
  },

  pgTextShort: {
    regex: RegExp('^(' + reMonthAbbr + ')-' + reDaylz + '-' + reYear, 'i'),
    name: 'pgtextshort',
    callback (match, month, day, year) {
      return this.ymd(processYear(year), lookupMonth(month), +day)
    }
  },

  dateNoYear: {
    regex: RegExp('^' + reDateNoYear, 'i'),
    name: 'datenoyear',
    callback (match, month, day) {
      return this.ymd(this.y, lookupMonth(month), +day)
    }
  },

  dateNoYearRev: {
    regex: RegExp('^' + reDay + '[ .\\t-]*' + reMonthText, 'i'),
    name: 'datenoyearrev',
    callback (match, day, month) {
      return this.ymd(this.y, lookupMonth(month), +day)
    }
  },

  isoWeekDay: {
    regex: RegExp('^' + reYear4 + '-?W' + reWeekOfYear + '(?:-?([0-7]))?'),
    name: 'isoweekday | isoweek',
    callback (match, year, week, day) {
      day = day ? +day : 1

      if (!this.ymd(+year, 0, 1)) {
        return false
      }

      // get day of week for Jan 1st
      let dayOfWeek = new Date(this.y, this.m, this.d).getDay()

      // and use the day to figure out the offset for day 1 of week 1
      dayOfWeek = 0 - (dayOfWeek > 4 ? dayOfWeek - 7 : dayOfWeek)

      this.rd += dayOfWeek + ((week - 1) * 7) + day
    }
  },

  relativeText: {
    regex: RegExp('^(' + reReltextnumber + '|' + reReltexttext + ')' + reSpace + '(' + reReltextunit + ')', 'i'),
    name: 'relativetext',
    callback (match, relValue, relUnit) {
      // todo: implement handling of 'this time-unit'
      // eslint-disable-next-line no-unused-vars
      const { amount, behavior } = lookupRelative(relValue)

      switch (relUnit.toLowerCase()) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
          this.rs += amount
          break
        case 'min':
        case 'mins':
        case 'minute':
        case 'minutes':
          this.ri += amount
          break
        case 'hour':
        case 'hours':
          this.rh += amount
          break
        case 'day':
        case 'days':
          this.rd += amount
          break
        case 'fortnight':
        case 'fortnights':
        case 'forthnight':
        case 'forthnights':
          this.rd += amount * 14
          break
        case 'week':
        case 'weeks':
          this.rd += amount * 7
          break
        case 'month':
        case 'months':
          this.rm += amount
          break
        case 'year':
        case 'years':
          this.ry += amount
          break
        case 'mon': case 'monday':
        case 'tue': case 'tuesday':
        case 'wed': case 'wednesday':
        case 'thu': case 'thursday':
        case 'fri': case 'friday':
        case 'sat': case 'saturday':
        case 'sun': case 'sunday':
          this.resetTime()
          this.weekday = lookupWeekday(relUnit, 7)
          this.weekdayBehavior = 1
          this.rd += (amount > 0 ? amount - 1 : amount) * 7
          break
        case 'weekday':
        case 'weekdays':
          // todo
          break
      }
    }
  },

  relative: {
    regex: RegExp('^([+-]*)[ \\t]*(\\d+)' + reSpaceOpt + '(' + reReltextunit + '|week)', 'i'),
    name: 'relative',
    callback (match, signs, relValue, relUnit) {
      const minuses = signs.replace(/[^-]/g, '').length

      const amount = +relValue * Math.pow(-1, minuses)

      switch (relUnit.toLowerCase()) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
          this.rs += amount
          break
        case 'min':
        case 'mins':
        case 'minute':
        case 'minutes':
          this.ri += amount
          break
        case 'hour':
        case 'hours':
          this.rh += amount
          break
        case 'day':
        case 'days':
          this.rd += amount
          break
        case 'fortnight':
        case 'fortnights':
        case 'forthnight':
        case 'forthnights':
          this.rd += amount * 14
          break
        case 'week':
        case 'weeks':
          this.rd += amount * 7
          break
        case 'month':
        case 'months':
          this.rm += amount
          break
        case 'year':
        case 'years':
          this.ry += amount
          break
        case 'mon': case 'monday':
        case 'tue': case 'tuesday':
        case 'wed': case 'wednesday':
        case 'thu': case 'thursday':
        case 'fri': case 'friday':
        case 'sat': case 'saturday':
        case 'sun': case 'sunday':
          this.resetTime()
          this.weekday = lookupWeekday(relUnit, 7)
          this.weekdayBehavior = 1
          this.rd += (amount > 0 ? amount - 1 : amount) * 7
          break
        case 'weekday':
        case 'weekdays':
          // todo
          break
      }
    }
  },

  dayText: {
    regex: RegExp('^(' + reDaytext + ')', 'i'),
    name: 'daytext',
    callback (match, dayText) {
      this.resetTime()
      this.weekday = lookupWeekday(dayText, 0)

      if (this.weekdayBehavior !== 2) {
        this.weekdayBehavior = 1
      }
    }
  },

  relativeTextWeek: {
    regex: RegExp('^(' + reReltexttext + ')' + reSpace + 'week', 'i'),
    name: 'relativetextweek',
    callback (match, relText) {
      this.weekdayBehavior = 2

      switch (relText.toLowerCase()) {
        case 'this':
          this.rd += 0
          break
        case 'next':
          this.rd += 7
          break
        case 'last':
        case 'previous':
          this.rd -= 7
          break
      }

      if (isNaN(this.weekday)) {
        this.weekday = 1
      }
    }
  },

  monthFullOrMonthAbbr: {
    regex: RegExp('^(' + reMonthFull + '|' + reMonthAbbr + ')', 'i'),
    name: 'monthfull | monthabbr',
    callback (match, month) {
      return this.ymd(this.y, lookupMonth(month), this.d)
    }
  },

  tzCorrection: {
    regex: RegExp('^' + reTzCorrection, 'i'),
    name: 'tzcorrection',
    callback (tzCorrection) {
      return this.zone(processTzCorrection(tzCorrection))
    }
  },

  tzAbbr: {
    regex: RegExp('^' + reTzAbbr),
    name: 'tzabbr',
    callback (match, abbr) {
      const offset = tzAbbrOffsets[abbr.toLowerCase()]

      if (isNaN(offset)) {
        return false
      }

      return this.zone(offset)
    }
  },

  ago: {
    regex: /^ago/i,
    name: 'ago',
    callback () {
      this.ry = -this.ry
      this.rm = -this.rm
      this.rd = -this.rd
      this.rh = -this.rh
      this.ri = -this.ri
      this.rs = -this.rs
      this.rf = -this.rf
    }
  },

  year4: {
    regex: RegExp('^' + reYear4),
    name: 'year4',
    callback (match, year) {
      this.y = +year
      return true
    }
  },

  whitespace: {
    regex: /^[ .,\t]+/,
    name: 'whitespace'
    // do nothing
  },

  dateShortWithTimeLong: {
    regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute + '[:.]' + reSecond, 'i'),
    name: 'dateshortwithtimelong',
    callback (match, month, day, hour, minute, second) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0)
    }
  },

  dateShortWithTimeLong12: {
    regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinute + '[:.]' + reSecondlz + reSpaceOpt + reMeridian, 'i'),
    name: 'dateshortwithtimelong12',
    callback (match, month, day, hour, minute, second, meridian) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, +second, 0)
    }
  },

  dateShortWithTimeShort: {
    regex: RegExp('^' + reDateNoYear + 't?' + reHour24 + '[:.]' + reMinute, 'i'),
    name: 'dateshortwithtimeshort',
    callback (match, month, day, hour, minute) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, 0, 0)
    }
  },

  dateShortWithTimeShort12: {
    regex: RegExp('^' + reDateNoYear + reHour12 + '[:.]' + reMinutelz + reSpaceOpt + reMeridian, 'i'),
    name: 'dateshortwithtimeshort12',
    callback (match, month, day, hour, minute, meridian) {
      return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, 0, 0)
    }
  }
}

const resultProto = {
  // date
  y: NaN,
  m: NaN,
  d: NaN,
  // time
  h: NaN,
  i: NaN,
  s: NaN,
  f: NaN,

  // relative shifts
  ry: 0,
  rm: 0,
  rd: 0,
  rh: 0,
  ri: 0,
  rs: 0,
  rf: 0,

  // weekday related shifts
  weekday: NaN,
  weekdayBehavior: 0,

  // first or last day of month
  // 0 none, 1 first, -1 last
  firstOrLastDayOfMonth: 0,

  // timezone correction in minutes
  z: NaN,

  // counters
  dates: 0,
  times: 0,
  zones: 0,

  // helper functions
  ymd (y, m, d) {
    if (this.dates > 0) {
      return false
    }

    this.dates++
    this.y = y
    this.m = m
    this.d = d
    return true
  },

  time (h, i, s, f) {
    if (this.times > 0) {
      return false
    }

    this.times++
    this.h = h
    this.i = i
    this.s = s
    this.f = f

    return true
  },

  resetTime () {
    this.h = 0
    this.i = 0
    this.s = 0
    this.f = 0
    this.times = 0

    return true
  },

  zone (minutes) {
    if (this.zones <= 1) {
      this.zones++
      this.z = minutes
      return true
    }

    return false
  },

  toDate (relativeTo) {
    if (this.dates && !this.times) {
      this.h = this.i = this.s = this.f = 0
    }

    // fill holes
    if (isNaN(this.y)) {
      this.y = relativeTo.getFullYear()
    }

    if (isNaN(this.m)) {
      this.m = relativeTo.getMonth()
    }

    if (isNaN(this.d)) {
      this.d = relativeTo.getDate()
    }

    if (isNaN(this.h)) {
      this.h = relativeTo.getHours()
    }

    if (isNaN(this.i)) {
      this.i = relativeTo.getMinutes()
    }

    if (isNaN(this.s)) {
      this.s = relativeTo.getSeconds()
    }

    if (isNaN(this.f)) {
      this.f = relativeTo.getMilliseconds()
    }

    // adjust special early
    switch (this.firstOrLastDayOfMonth) {
      case 1:
        this.d = 1
        break
      case -1:
        this.d = 0
        this.m += 1
        break
    }

    if (!isNaN(this.weekday)) {
      const date = new Date(relativeTo.getTime())
      date.setFullYear(this.y, this.m, this.d)
      date.setHours(this.h, this.i, this.s, this.f)

      const dow = date.getDay()

      if (this.weekdayBehavior === 2) {
        // To make "this week" work, where the current day of week is a "sunday"
        if (dow === 0 && this.weekday !== 0) {
          this.weekday = -6
        }

        // To make "sunday this week" work, where the current day of week is not a "sunday"
        if (this.weekday === 0 && dow !== 0) {
          this.weekday = 7
        }

        this.d -= dow
        this.d += this.weekday
      } else {
        let diff = this.weekday - dow

        // some PHP magic
        if ((this.rd < 0 && diff < 0) || (this.rd >= 0 && diff <= -this.weekdayBehavior)) {
          diff += 7
        }

        if (this.weekday >= 0) {
          this.d += diff
        } else {
          this.d -= (7 - (Math.abs(this.weekday) - dow))
        }

        this.weekday = NaN
      }
    }

    // adjust relative
    this.y += this.ry
    this.m += this.rm
    this.d += this.rd

    this.h += this.rh
    this.i += this.ri
    this.s += this.rs
    this.f += this.rf

    this.ry = this.rm = this.rd = 0
    this.rh = this.ri = this.rs = this.rf = 0

    const result = new Date(relativeTo.getTime())
    // since Date constructor treats years <= 99 as 1900+
    // it can't be used, thus this weird way
    result.setFullYear(this.y, this.m, this.d)
    result.setHours(this.h, this.i, this.s, this.f)

    // note: this is done twice in PHP
    // early when processing special relatives
    // and late
    // todo: check if the logic can be reduced
    // to just one time action
    switch (this.firstOrLastDayOfMonth) {
      case 1:
        result.setDate(1)
        break
      case -1:
        result.setMonth(result.getMonth() + 1, 0)
        break
    }

    // adjust timezone
    if (!isNaN(this.z) && result.getTimezoneOffset() !== this.z) {
      result.setUTCFullYear(
        result.getFullYear(),
        result.getMonth(),
        result.getDate())

      result.setUTCHours(
        result.getHours(),
        result.getMinutes(),
        result.getSeconds() - this.z,
        result.getMilliseconds())
    }

    return result
  }
}

module.exports.strtotime = (str, now) => {
  //       discuss at: https://locutus.io/php/strtotime/
  //      original by: Caio Ariede (https://caioariede.com)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Caio Ariede (https://caioariede.com)
  //      improved by: A. Matías Quezada (https://amatiasq.com)
  //      improved by: preuter
  //      improved by: Brett Zamir (https://brett-zamir.me)
  //      improved by: Mirko Faber
  //         input by: David
  //      bugfixed by: Wagner B. Soares
  //      bugfixed by: Artur Tchernychev
  //      bugfixed by: Stephan Bösch-Plepelits (https://github.com/plepe)
  // reimplemented by: Rafał Kukawski
  //           note 1: Examples all have a fixed timestamp to prevent
  //           note 1: tests to fail because of variable time(zones)
  //        example 1: strtotime('+1 day', 1129633200)
  //        returns 1: 1129719600
  //        example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200)
  //        returns 2: 1130425202
  //        example 3: strtotime('last month', 1129633200)
  //        returns 3: 1127041200
  //        example 4: strtotime('2009-05-04 08:30:00+00')
  //        returns 4: 1241425800
  //        example 5: strtotime('2009-05-04 08:30:00+02:00')
  //        returns 5: 1241418600
  //        example 6: strtotime('2009-05-04 08:30:00 YWT')
  //        returns 6: 1241454600

  if (now == null) {
    now = Math.floor(Date.now() / 1000)
  }

  // the rule order is important
  // if multiple rules match, the longest match wins
  // if multiple rules match the same string, the first match wins
  const rules = [
    formats.yesterday,
    formats.now,
    formats.noon,
    formats.midnightOrToday,
    formats.tomorrow,
    formats.timestamp,
    formats.firstOrLastDay,
    formats.backOrFrontOf,
    // formats.weekdayOf, // not yet implemented
    formats.timeTiny12,
    formats.timeShort12,
    formats.timeLong12,
    formats.mssqltime,
    formats.timeShort24,
    formats.timeLong24,
    formats.iso8601long,
    formats.gnuNoColon,
    formats.iso8601noColon,
    formats.americanShort,
    formats.american,
    formats.iso8601date4,
    formats.iso8601dateSlash,
    formats.dateSlash,
    formats.gnuDateShortOrIso8601date2,
    formats.gnuDateShorter,
    formats.dateFull,
    formats.pointedDate4,
    formats.pointedDate2,
    formats.dateNoDay,
    formats.dateNoDayRev,
    formats.dateTextual,
    formats.dateNoYear,
    formats.dateNoYearRev,
    formats.dateNoColon,
    formats.xmlRpc,
    formats.xmlRpcNoColon,
    formats.soap,
    formats.wddx,
    formats.exif,
    formats.pgydotd,
    formats.isoWeekDay,
    formats.pgTextShort,
    formats.pgTextReverse,
    formats.clf,
    formats.year4,
    formats.ago,
    formats.dayText,
    formats.relativeTextWeek,
    formats.relativeText,
    formats.monthFullOrMonthAbbr,
    formats.tzCorrection,
    formats.tzAbbr,
    formats.dateShortWithTimeShort12,
    formats.dateShortWithTimeLong12,
    formats.dateShortWithTimeShort,
    formats.dateShortWithTimeLong,
    formats.relative,
    formats.whitespace
  ]

  const result = Object.create(resultProto)

  while (str.length) {
    let longestMatch = null
    let finalRule = null

    for (let i = 0, l = rules.length; i < l; i++) {
      const format = rules[i]

      const match = str.match(format.regex)

      if (match) {
        if (!longestMatch || match[0].length > longestMatch[0].length) {
          longestMatch = match
          finalRule = format
        }
      }
    }

    if (!finalRule || (finalRule.callback && finalRule.callback.apply(result, longestMatch) === false)) {
      return false
    }

    str = str.substr(longestMatch[0].length)
    finalRule = null
    longestMatch = null
  }

  return Math.floor(result.toDate(new Date(now * 1000)) / 1000)
}
module.exports.nl2br = (str, isXhtml) => {
  //  discuss at: https://locutus.io/php/nl2br/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Philip Peterson
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Atli Þór
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Maximusya
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Reynier de la Rosa (https://scriptinside.blogspot.com.es/)
  //    input by: Brett Zamir (https://brett-zamir.me)
  //   example 1: nl2br('Kevin\nvan\nZonneveld')
  //   returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  //   example 2: nl2br("\nOne\nTwo\n\nThree\n", false)
  //   returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  //   example 3: nl2br("\nOne\nTwo\n\nThree\n", true)
  //   returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
  //   example 4: nl2br(null)
  //   returns 4: ''
  // Some latest browsers when str is null return and unexpected null value
  if (typeof str === 'undefined' || str === null) {
    return ''
  }
  // Adjust comment to avoid issue on locutus.io display
  const breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br ' + '/>' : '<br>'
  return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1')
}
module.exports.base64_encode = (stringToEncode) => { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/base64_encode/
  // original by: Tyler Akins (https://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  // improved by: Indigo744
  //   example 1: base64_encode('Kevin van Zonneveld')
  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //   example 2: base64_encode('a')
  //   returns 2: 'YQ=='
  //   example 3: base64_encode('✓ à la mode')
  //   returns 3: '4pyTIMOgIGxhIG1vZGU='
  // encodeUTF8string()
  // Internal function to encode properly UTF8 string
  // Adapted from Solution #1 at https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
  const encodeUTF8string = function (str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into the base64 encoding algorithm.
    return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes (match, p1) {
        return String.fromCharCode('0x' + p1)
      })
  }
  if (typeof window !== 'undefined') {
    if (typeof window.btoa !== 'undefined') {
      return window.btoa(encodeUTF8string(stringToEncode))
    }
  } else {
    return new Buffer(stringToEncode).toString('base64')
  }
  const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let o1
  let o2
  let o3
  let h1
  let h2
  let h3
  let h4
  let bits
  let i = 0
  let ac = 0
  let enc = ''
  const tmpArr = []
  if (!stringToEncode) {
    return stringToEncode
  }
  stringToEncode = encodeUTF8string(stringToEncode)
  do {
    // pack three octets into four hexets
    o1 = stringToEncode.charCodeAt(i++)
    o2 = stringToEncode.charCodeAt(i++)
    o3 = stringToEncode.charCodeAt(i++)
    bits = o1 << 16 | o2 << 8 | o3
    h1 = bits >> 18 & 0x3f
    h2 = bits >> 12 & 0x3f
    h3 = bits >> 6 & 0x3f
    h4 = bits & 0x3f
    // use hexets to index into b64, and append result to encoded string
    tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
  } while (i < stringToEncode.length)
  enc = tmpArr.join('')
  const r = stringToEncode.length % 3
  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
}
module.exports.dirname = (path) => {
  //  discuss at: https://locutus.io/php/dirname/
  // original by: Ozh
  // improved by: XoraX (https://www.xorax.info)
  //   example 1: dirname('/etc/passwd')
  //   returns 1: '/etc'
  //   example 2: dirname('c:/Temp/x')
  //   returns 2: 'c:/Temp'
  //   example 3: dirname('/dir/test/')
  //   returns 3: '/dir'
  return path.replace(/\\/g, '/').replace(/\/[^/]*\/?$/, '')
}
module.exports.strnatcmp = (a, b) => {
  //       discuss at: https://locutus.io/php/strnatcmp/
  //      original by: Martijn Wieringa
  //      improved by: Michael White (https://getsprink.com)
  //      improved by: Jack
  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcmp('abc', 'abc')
  //        returns 1: 0
  //        example 2: strnatcmp('a', 'b')
  //        returns 2: -1
  //        example 3: strnatcmp('10', '1')
  //        returns 3: 1
  //        example 4: strnatcmp('0000abc', '0abc')
  //        returns 4: 0
  //        example 5: strnatcmp('1239', '12345')
  //        returns 5: -1
  //        example 6: strnatcmp('t01239', 't012345')
  //        returns 6: 1
  //        example 7: strnatcmp('0A', '5N')
  //        returns 7: -1
  const leadingZeros = /^0+(?=\d)/
  const whitespace = /^\s/
  const digit = /^\d/
  if (arguments.length !== 2) {
    return null
  }
  a = _phpCastString(a)
  b = _phpCastString(b)
  if (!a.length || !b.length) {
    return a.length - b.length
  }
  let i = 0
  let j = 0
  a = a.replace(leadingZeros, '')
  b = b.replace(leadingZeros, '')
  while (i < a.length && j < b.length) {
    // skip consecutive whitespace
    while (whitespace.test(a.charAt(i))) i++
    while (whitespace.test(b.charAt(j))) j++
    let ac = a.charAt(i)
    let bc = b.charAt(j)
    let aIsDigit = digit.test(ac)
    let bIsDigit = digit.test(bc)
    if (aIsDigit && bIsDigit) {
      let bias = 0
      const fractional = ac === '0' || bc === '0'
      do {
        if (!aIsDigit) {
          return -1
        } else if (!bIsDigit) {
          return 1
        } else if (ac < bc) {
          if (!bias) {
            bias = -1
          }
          if (fractional) {
            return -1
          }
        } else if (ac > bc) {
          if (!bias) {
            bias = 1
          }
          if (fractional) {
            return 1
          }
        }
        ac = a.charAt(++i)
        bc = b.charAt(++j)
        aIsDigit = digit.test(ac)
        bIsDigit = digit.test(bc)
      } while (aIsDigit || bIsDigit)
      if (!fractional && bias) {
        return bias
      }
      continue
    }
    if (!ac || !bc) {
      continue
    } else if (ac < bc) {
      return -1
    } else if (ac > bc) {
      return 1
    }
    i++
    j++
  }
  const iBeforeStrEnd = i < a.length
  const jBeforeStrEnd = j < b.length
  // Check which string ended first
  // return -1 if a, 1 if b, 0 otherwise
  return (iBeforeStrEnd > jBeforeStrEnd) - (iBeforeStrEnd < jBeforeStrEnd)
}
module.exports.intval = (mixedVar, base) => {
  //  discuss at: https://locutus.io/php/intval/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: stensi
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
  //    input by: Matteo
  //   example 1: intval('Kevin van Zonneveld')
  //   returns 1: 0
  //   example 2: intval(4.2)
  //   returns 2: 4
  //   example 3: intval(42, 8)
  //   returns 3: 42
  //   example 4: intval('09')
  //   returns 4: 9
  //   example 5: intval('1e', 16)
  //   returns 5: 30
  //   example 6: intval(0x200000001)
  //   returns 6: 8589934593
  //   example 7: intval('0xff', 0)
  //   returns 7: 255
  //   example 8: intval('010', 0)
  //   returns 8: 8
  let tmp, match
  const type = typeof mixedVar
  if (type === 'boolean') {
    return +mixedVar
  } else if (type === 'string') {
    if (base === 0) {
      match = mixedVar.match(/^\s*0(x?)/i)
      base = match ? (match[1] ? 16 : 8) : 10
    }
    tmp = parseInt(mixedVar, base || 10)
    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp
  } else if (type === 'number' && isFinite(mixedVar)) {
    return mixedVar < 0 ? Math.ceil(mixedVar) : Math.floor(mixedVar)
  } else {
    return 0
  }
}
const EOL = require('os').EOL
module.exports.PHP_EOL = EOL
module.exports.EOL = EOL