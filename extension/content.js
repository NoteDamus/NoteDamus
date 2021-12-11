let apiUrl = "https://note-damus0.herokuapp.com/api";
let color = "yellow"
let folderList = {}
let folderId = -1;
let userId = -1;

const textSelector = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, textare, div, b');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let authorizedUserId = request.userId;
    let note = request.note;
    let source = request.source;
    let selectedFolderId = request.folderId;
    let selectedColor = request.color;

    if (authorizedUserId) {
        userId = authorizedUserId;

        let listOfFolders = getFolderList(userId)
        folderId = listOfFolders[0].id;
        listOfFolders.forEach(folder => {
            folderList[folder.id] = folder.title
        });
    }

    if (userId >= 0) {

        if (selectedFolderId)
            folderId = selectedFolderId;

        if (selectedColor)
            color = selectedColor;

        if (note && source) {
            console.log(note);
            for (let i = 0; i < textSelector.length; i++) {
                let element = textSelector[i];
                if (element.innerHTML.includes(note)) {
                    let noteSpan = '<span style="background-color:' + color + '">' + note + '</span>';
                    element.innerHTML = element.innerHTML.replace(note, noteSpan);
                }
            }
            sendNote(note, folderId, color, source);
        }
    }
});

function getFolderList(userId) {
    let result = {}
    fetch(apiUrl + '/folders/?user=' + userId, {
            method: 'GET',
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data)
                result = data;
            else
                console.log("loading of folder list was unsuccessful");
        })
    return result;
}

function sendNote(note, folderId, colorName, sourceAddress) {
    let data = {
        content: note,
        color: colorName,
        source: sourceAddress,
        folder: folderId,
    }

    fetch(apiUrl + '/notes/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:")
        console.log(res);
    });
}