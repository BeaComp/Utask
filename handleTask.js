// task model={
//     status:todo, doing,finished
//     title
//     desc
// }

let inputTitulo = document.querySelector('#titulo');
let inputDescricao = document.querySelector('#inputdesc');
let btnnewTask = document.querySelector('#newTask');
let listaTarefas = document.querySelector('.listaTarefas');
let tasks = document.querySelectorAll('.tasks');

var taskIdCount = 0;
var todoList = [];
var doingList = [];
var finishedList = [];

const taskStatus = {
    todo: "todo",
    doing: "doing",
    finished: "finished"
};

function createTask(id, title, desc, status) {
    return { id, title, desc, status };
};


function addTask(title, desc) {
    taskIdCount++;
    todoList.push(createTask(taskIdCount, title, desc, taskStatus.todo));
    handleTodoList();

}

function deleteTask(id) {

}

const moveToDoing = id => {
    var task = todoList.find(elem => elem.id == id);
    task.status = taskStatus.doing;
    doingList.push({ ...task })

    todoList = todoList.filter(object => {
        return object.id !== id;
    });

    handleTodoList();
    handleDoingList()
}

function someChild(childCollection, id) {
    for (const elm of childCollection) {
        if (elm.getAttribute("id") == id) {
            return true;
        }
    }
    return false;
}

const moveToFinished = id => {
    var task = doingList.find(elem => elem.id == id);
    task.status = taskStatus.finished;
    finishedList.push({ ...task })

    doingList = doingList.filter(object => {
        return object.id !== id;
    });

    handleDoingList();
    handleFinishList();
}

const deleteFinishedTask = id => {
    finishedList = finishedList.filter(object => {
        return object.id !== id;
    });

    handleFinishList();
}

function handleTodoList() {
    const list = document.getElementById("todoList");
    const toDoChildList = list.children;

    for (const elm of todoList) {
        const notInList = document.getElementById(elm.id);
        if (!notInList) {
            let li = criarTagLI(elm, moveToDoing);
            list.appendChild(li);
            inputTitulo.value = '';
            inputDescricao.value = '';
        }
    }
    for (const elm of toDoChildList) {
        const inList = todoList.some(task => task.id == elm.getAttribute("id"))
        if (!inList)
            list.removeChild(elm)
    }
}

function handleDoingList() {
    const list = document.getElementById("doingList");
    const toDoChildList = list.children;

    const childList = Array.from(toDoChildList);

    for (const doing of doingList) {
        const notInList = childList.some(elm => elm.getAttribute("id") == doing.id)
        if (!notInList) {
            let li = criarTagLI(doing, moveToFinished);
            list.appendChild(li);
        }
    }
    for (const elm of toDoChildList) {
        const inList = doingList.some(task => task.id == elm.getAttribute("id"))
        if (!inList)
            list.removeChild(elm)
    }
}

function handleFinishList() {
    const list = document.getElementById("finishedList");
    const toDoChildList = list.children;

    const childList = Array.from(toDoChildList);

    for (const doing of finishedList) {
        const notInList = childList.some(elm => elm.getAttribute("id") == doing.id)
        if (!notInList) {
            let li = criarTagLI(doing,deleteFinishedTask);
            list.appendChild(li);
        }
    }
    for (const elm of toDoChildList) {
        const inList = finishedList.some(task => task.id == elm.getAttribute("id"))
        if (!inList)
            list.removeChild(elm)
    }
}



//Função que cria a estrutura do HTML para cada tarefa
function criarTagLI(tarefa, nextFunction) {

    let li = document.createElement('li');
    li.setAttribute("id", tarefa.id)

    let divParte1 = document.createElement('div');
    divParte1.classList.add('parte1');

    let p = document.createElement('p');
    p.classList.add('TitleTask');
    p.innerHTML = tarefa.title;

    let btn_tres_pontinhos = document.createElement('button');
    btn_tres_pontinhos.classList.add('moveTask');
    btn_tres_pontinhos.innerHTML = '<span class="material-icons-outlined">more_vert</span>';



    let divParte2 = document.createElement('div');
    divParte2.classList.add('parte2');

    //Botao Expand Task
    let spanLerDesc = document.createElement('span');
    spanLerDesc.classList.add('itemDesc');
    spanLerDesc.innerHTML = 'Ler descrição <button class="expand-Ler"><span class="material-icons-outlined">expand_more</span></button>';

    let p_Descricao = document.createElement('p');
    p_Descricao.classList.add('paragradoDes');
    p_Descricao.innerHTML = tarefa.descricao;

    //Botao Excluir
    let btn_Excluir_Task = document.createElement('button');
    btn_Excluir_Task.classList.add('excluiTask');
    btn_Excluir_Task.innerHTML = '<span class="material-icons-outlined">&#xe92e</span> Excluir';
    // btn_Excluir_Task.setAttribute('click', excluir(' + tarefa.id + '));

    //Botao Esconde a Task
    let spanEsconderDesc = document.createElement('span');
    spanEsconderDesc.classList.add('Desc');
    spanEsconderDesc.innerHTML = 'Esconder descrição <button class="expand-Desc"><span class="material-icons-outlined">expand_less</span></button>';

    //Botao move a Task
    let btnMoveTask = document.createElement('button');
    btnMoveTask.addEventListener("click", () => nextFunction(tarefa.id))
    btnMoveTask.classList.add('move');
    btnMoveTask.classList.add('mostrar');
    btnMoveTask.innerHTML = '<span class="material-icons-outlined">navigate_next</span>';


    li.appendChild(divParte1);
    divParte1.appendChild(p);
    divParte1.appendChild(btn_tres_pontinhos);

    li.appendChild(divParte2);
    divParte2.appendChild(spanLerDesc);
    divParte2.appendChild(btn_Excluir_Task);
    divParte2.appendChild(spanEsconderDesc);
    divParte2.appendChild(btnMoveTask);

    li.appendChild(p_Descricao);


    return li;
}


//Adicionar Tasks
btnnewTask.addEventListener('click', (e) => {
    if (inputTitulo.value === '' || inputDescricao.value === '')
        alert("Preencha todos os campos!");
    else
        addTask(inputTitulo.value, inputDescricao.value)

    e.preventDefault();
});
