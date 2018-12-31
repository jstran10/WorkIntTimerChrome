chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {redirectUrl: "http://sakai.duke.edu/"}; },
        {urls: ["*://www.netflix.com/*"]},
        ["blocking"]);