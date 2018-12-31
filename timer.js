var base = new Date();
var seconds=0;
var checkurlevent = new Event('check');
window.location = 'http://www.jqwidgets.com/';
var minwork=25;
var minrest=5;
var tottime=minwork+minrest;
localStorage["minw"]=minwork;
localStorage["minr"]=minwork;
chrome.browserAction.setBadgeBackgroundColor({color:"red"});
var active=false;
var urlist=["*://www.netflix.com/*","*://www.facebook.com/*"];
document.addEventListener('check',
        function(details) { 
        chrome.tabs.query({url: urlist}, function(results) {
        if(results.length==0){
        	//alert(results);
        	return;
        }
        else{
        results.forEach(checktabs);
        }

    });	
 },
 );

function checktabs(item){
	chrome.tabs.update(item.id,{url:"http://www.google.com"})
	//alert(item.index);
}
function Update() {
if(active){
  var current = new Date();
  var delta = current - base;
  var min = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((delta % (1000 * 60)) / 1000);
  var secstring=""+seconds;
  if(seconds<10){
  	secstring="0"+secstring;
  }
  chrome.browserAction.setBadgeText({'text': min+":"+secstring});
  //alert("hello");
  //if(seconds>10 && seconds<15){
  	//}
  	if(min%tottime<minwork){
  		chrome.browserAction.setBadgeBackgroundColor({color:"red"});
  		document.dispatchEvent(checkurlevent);

  	}
  	else{
  		chrome.browserAction.setBadgeBackgroundColor({color:"green"});
  }

}


}

function resetTime(){
active=true;
base = new Date();
//alert("hello");
}
function stoppedTime(){
active=false;
chrome.browserAction.setBadgeText({'text': ""});
}
function block(){
	chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {redirectUrl: "http://sakai.duke.edu/"}; },
        {urls: ["*://www.netflix.com/*"]},
        ["blocking"]);
}
function removeblock(){
	chrome.webRequest.onBeforeRequest.removeListener(
        function(details) { return {redirectUrl: "http://sakai.duke.edu/"}; },
        {urls: ["*://www.netflix.com/*"]},
        ["blocking"]);
}
//chrome.tabs.onCreated.addListener(resetTime);

setInterval(Update, 1000);



chrome.runtime.onMessage.addListener(function(request){
	if(request.action=="buttontime"){
		resetTime();
		minwork=parseInt(request.numwork);
		minrest=parseInt(request.numplay);
		tottime=parseInt(minwork+minrest);
	}
	else if(request.action=="stoptime"){
		stoppedTime();
		minwork=parseInt(request.numwork);
		minrest=parseInt(request.numplay);
		tottime=parseInt(minwork+minrest);
	}
	if(request.action=="texttime"){
		//document.removeEventListener('check');
		urlist=request.arrval;
		//alert(urlist);
		document.addEventListener('check',
        function(details) { 
        chrome.tabs.query({url: urlist}, function(results) {
        if(results.length==0){
        	//alert(results);
        	return;
        }
        else{
        results.forEach(checktabs);
        }

    });	
 },
        );
	}
})