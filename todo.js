const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];


function deleteToDo(event) {
    const btn = event.target
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    });
    toDos = cleanToDos
    saveToDos();
};

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const paresedToDos = JSON.parse(loadedToDos);
        paresedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    };
};

function handleSubmit(event) {
    event.preventDefault();
    const currentValue  = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

const IMG_NUMBER = 11;
function genRendom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    const randomNumber = genRendom();
    let URL_R = `image${randomNumber}`
    delBtn.innerText = "x"
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    li.classList.add(URL_R);
    toDoList.appendChild(li);
    const toDosObj = {
        text: text,
        id: newId
    };
    toDos.push(toDosObj);
    saveToDos();
}
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();