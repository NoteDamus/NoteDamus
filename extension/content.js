let folderId = 0;
let color = "yellow"

let folder_list = {
    0: "General",
    1: "Math1",
    2: "Math2",
    3: "Math3"
}
const text_selector = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, textare, div, b');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    let note = request.note;
    console.log(note);
    for (let i = 0; i < text_selector.length; i++) {
        let element = text_selector[i];
        if(element.innerHTML.includes(note)){
          console.log("fine")
            let note_span = '<span style="background-color:yellow">'+note+'</span>';
            element.innerHTML = element.innerHTML.replace(note, note_span);
        } 
      }
});
