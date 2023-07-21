function createContextMenu() {
    chrome.contextMenus.create({
        id: "save-note",
        title: "Save Note",
        contexts: [
            'page',
            'selection',
            'link',
            'editable',
            'image',
            'video',
            'audio'
          ],
    });
};

function saveNote2(info: chrome.contextMenus.OnClickData) {
    const note = encodeURIComponent(info.selectionText?.toString() || '');
    const url = encodeURIComponent(info.pageUrl);
    
    chrome.tabs.create({url: `note.html?note=${note}&url=${url}`});
}


chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.contextMenus.onClicked.addListener(saveNote2);

export {};