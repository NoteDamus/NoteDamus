let folderId = 1;

let folderList = {}

chrome.runtime.onInstalled.addListener(() => {
    console.log("beginning of background");

    for (let key of Object.keys(folderList)) {
        chrome.contextMenus.create({
            id: key,
            title: folderList[key],
            type: 'normal',
            contexts: ['selection']
        });
    }

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        folderId = info.menuItemId;
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        saveHighlightedText(tabs[0].id, info.selectionText, "url", tabs[0].url)
    });
});

chrome.commands.onCommand.addListener(function (command) {
    console.log("before save");
    if (command === "save") {
        console.log("saving started");

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: getSelection,
            }, function(selection) {
                saveHighlightedText(tabs[0].id, selection[0].result, "url", tabs[0].url)
            });
        });

        console.log("saving finished");
    }
});

function saveHighlightedText(tabId, highlightedText, source_type, source){
    chrome.tabs.sendMessage(tabId, {
        "note": highlightedText,
        "source_type": source_type,
        "source": source
    });
}

function getSelection(){
    return window.getSelection().toString();
}