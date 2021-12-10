let folderId = 1;
let color = "yellow"
let userId = -1;
let apiUrl = "https://note-damus0.herokuapp.com/api";

let folderList = {
    0: "General"
}
const textSelector = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, textare, div, b');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    let authorizedUserId = request.userId;
    let note = request.note;
    let source = request.source;
    let selectedFolderId = request.folderId;
    let selectedColor = request.color;

    if(authorizedUserId){
        userId = authorizedUserId;
        

        let listOfFolders = getFolderList(userId)
        folderId = listOfFolders[0].id;
        listOfFolders.forEach(folder => {
            folderList[folder.id] = folder.title
        });
    }

    if(userId >= 0){

        if(selectedFolderId){
            console.log(selectedFolderId);
            folderId = selectedFolderId;
        }

        if(selectedColor){
            console.log(selectedColor);
            color = selectedColor;
        }

        if(note && source){
            console.log(note);
            for (let i = 0; i < textSelector.length; i++) {
                let element = textSelector[i];
                if(element.innerHTML.includes(note)){
                console.log("fine")
                    let noteSpan = '<span style="background-color:'+color+'">'+note+'</span>';
                    element.innerHTML = element.innerHTML.replace(note, noteSpan);
                } 
            }

            sendNote(note, folderId, color, source);
        }
    }
});

function getFolderList(userId){

    let folderList = {}

    fetch(apiUrl + '/folders/?user='+userId,{
            method:'GET',
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            if(data){
                folderList = data;
            }else{
                console.log("loading of folder list was unsuccessful");
            }
        })

    return folderList;
}

function sendNote(note, folderId, colorName, sourceAddress){
    console.log("-----------Sending-----------");
    console.log("content: "+ note);
    console.log("color: "+ colorName);
    console.log("source: "+ sourceAddress);
    console.log("folder: "+ folderId);

    let data = {
        content: note,
        color: colorName,
        source: sourceAddress,
        folder: folderId,
    }

    fetch(apiUrl + '/notes/', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:")
      console.log(res);
    });
    console.log("----------------------");
}
