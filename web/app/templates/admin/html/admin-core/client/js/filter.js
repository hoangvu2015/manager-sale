'use strict';

angular.module('core')
.filter('filterContains', filterContains)
.filter('filterProvince', filterProvince);

function filterProvince(Option) {
  return function (data) {
    var province = Option.mapVN()[0];
    for (var k in province) {
      if (province.hasOwnProperty(k)) {
        if(k == data)
          return province[k].name;
      }
    }
  };
}

function filterContains () {
  return function(list, items, key, value) {
    var filtered = []; 
    if(Array.isArray(items)){
      for (let k in list) {
        for (let index in items) {
          if(items[index] == list[k][key]){
            filtered.push(list[k]);
          }
        }
      }
    }else{
      for (let k in list) {
        if(items == list[k][key]){
          filtered.push(list[k]);
        }
      }
    }
    return filtered;
  }
}