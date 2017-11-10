'use strict';

angular.module('core')
.filter('filterContains', filterContains);

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