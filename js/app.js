const addBtn = document.getElementById("addBtn");
const content = document.getElementById("addTxt");
const emptyBtn = document.getElementById("emptyBtn");
showNotes();

content.addEventListener("input", ()=>{
    if (content.textLength > 0) {
        addBtn.removeAttribute("disabled")
    } else {
        addBtn.setAttribute("disabled", "true")
    }
})

addBtn.addEventListener("click", ()=>{
    const notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(content.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    content.value = "";
    addBtn.setAttribute("disabled", "true");
    showNotes();
});

function showNotes() {
    const notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = ``;
    notesObj.forEach(function(content, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${content}</p>
                <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `
    });
    const notesContainer = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesContainer.innerHTML = html;
        emptyBtn.removeAttribute("disabled");
    } else {
        notesContainer.innerHTML = `You don't have any notes. Use the 'Add a Note' button to add one!`;
        emptyBtn.setAttribute("disabled", "true")
    }
}

function deleteNote(index) {
    const notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

function emptyNotes() {
    const notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(0, notesObj.length);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// const searchBtn = document.getElementById("searchBtn");
const searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener("input", ()=>{
    const inputVal = searchTxt.value.toLowerCase();
    const noteCards = document.getElementsByClassName('noteCard');

    if (inputVal.textLength <= 0) {
        showNotes();
    }

    Array.from(noteCards).forEach(function(element){
        const cardTxt = element.getElementsByClassName("card-text").innerText;
        if(!cardTxt.includes(inputVal)){
            element.style.display = "none";
        }
    })
});