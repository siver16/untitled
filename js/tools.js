exports.pathMaker=function (string, template){
   string=""+string;
   var ret=string;
   for(var i=0;i<template-string.length;i++){
      ret="0"+ret;
   }
   return '/images/pics/'+ret+'.jpg';
}