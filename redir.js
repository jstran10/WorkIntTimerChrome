chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {redirectUrl: "https://https://dukehub.duke.edu/"}; },
        {urls: ["*://www.sakai.duke.edu.com/*"]},
        ["blocking"]);