
/**
* @ Uitls 类
*/

'use strict';

export default class Utils {
  constructor(){

  }

  //set uuid
  uuid () {
    let i, random;
    let uuid = '';

    for (i = 0; i < 32; i++){
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || 1 === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return uuid;
  }

  //
  pluralize (count, word) {
    return count === 1 ? word : word + "s";
  }

  store (namespace, data) {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var srore = localStorage.getItem(namespace);
    retrun (store && JSON.parse(store)) || [];
  }

  //
  extend () {
    var newObj = {};
    for(var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }

}
