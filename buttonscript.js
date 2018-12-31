document.getElementById("but").addEventListener("click", buttonFunc);
document.getElementById("stopbu").addEventListener("click", buttonFuncstop);
document.getElementById("work").addEventListener("change", workFunc);
document.getElementById("break").addEventListener("change", breakFunc);
document.getElementById("textb").addEventListener("change", textFunc);

document.addEventListener('DOMContentLoaded', restore_options);
//var labelid = document.getElementById('worklabel');

function buttonFunc(){
chrome.runtime.sendMessage({action:"buttontime", numwork:document.getElementById("work").value, numplay:document.getElementById("break").value});
}
function buttonFuncstop(){
chrome.runtime.sendMessage({action:"stoptime", numwork:document.getElementById("work").value, numplay:document.getElementById("break").value});
}
function workFunc(){
document.getElementById('worklabel').innerHTML="Minutes of Work: "+document.getElementById("work").value;
chrome.runtime.sendMessage({action:"slidertime", numwork:document.getElementById("work").value, numplay:document.getElementById("break").value});
localStorage["minw"]=document.getElementById("work").value;
}
function breakFunc(){
document.getElementById('breaklabel').innerHTML="Minutes of Break: "+document.getElementById("break").value;
chrome.runtime.sendMessage({action:"slidertime", numwork:document.getElementById("work").value, numplay:document.getElementById("break").value});
localStorage["minr"]=document.getElementById("break").value;
}
function textFunc(){
localStorage["textstor"]=document.getElementById("textb").value;
var toret = document.getElementById("textb").value.split(/\r?\n/);
var arrayLength = toret.length;
for (var i = 0; i < arrayLength; i++) {
    toret[i]="*://www."+toret[i].trim()+"/*";
}
chrome.runtime.sendMessage({action:"texttime", arrval:toret});
}
function restore_options() {
  var restoreminw = localStorage["minw"];
  if (!restoreminw) {
    return;
  }
  else{
  	document.getElementById("work").value=restoreminw;
  	document.getElementById('worklabel').innerHTML="Minutes of Work: "+document.getElementById("work").value;
  }
  var restoreminr = localStorage["minr"];
  if (!restoreminr) {
    return;
  }
  else{
  	document.getElementById("break").value=restoreminr;
  	document.getElementById('breaklabel').innerHTML="Minutes of Break: "+document.getElementById("break").value;
  }
   var restoretxt = localStorage["textstor"];
  if (!restoretxt) {
    return;
  }
  else{
  	document.getElementById("textb").innerHTML=restoretxt;
  	textFunc();
  }
}

