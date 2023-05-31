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

const deleteFinishedTask = id => {
    finishedList = finishedList.filter(object => {
        return object.id !== id;
    });

    handleFinishList();
}

function fromFinishedToTodo(id) {
    var task = finishedList.find(elem => elem.id == id);
    task.status = taskStatus.todo;
    todoList.push({ ...task })

    finishedList = finishedList.filter(object => {
        return object.id !== id;
    });

    handleFinishList();
    handleTodoList();

}

function someChild(childCollection, id) {
    for (const elm of childCollection) {
        if (elm.getAttribute("id") == id) {
            return true;
        }
    }
    return false;
}



const moveToDoing = id => {

    var task = todoList.find(elem => elem.id == id);
    task.status = taskStatus.doing;
    doingList.push({ ...task })

    todoList = todoList.filter(object => {
        return object.id !== id;
    });


    handleTodoList();
    handleDoingList();

    btnRetornaElement(id);
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

    btnRetornaElement(id);

}

//voltando as tasks
const backToTodo = (id) => {
    const task = doingList.find((elem) => elem.id == id);
    task.status = taskStatus.todo;
    todoList.push({ ...task });
    console.log(todoList)

    doingList = doingList.filter((object) => object.id !== id);

    handleDoingList();
    handleTodoList();


};
//voltando as tasks
const backToDoing = (id) => {
    const task = finishedList.find((elem) => elem.id == id);
    task.status = taskStatus.doing;
    doingList.push({ ...task });

    finishedList = finishedList.filter((object) => object.id !== id);

    handleFinishList();
    handleDoingList();

    btnRetornaElement(id);
};

function nothing(id) {
    console.log(id)
}


function handleTodoList() {
    const list = document.getElementById("todoList");
    const toDoChildList = list.children;

    for (const elm of todoList) {
        const notInList = document.getElementById(elm.id);
        if (!notInList) {
            let li = criarTagLI(elm, moveToDoing, nothing);
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
            let li = criarTagLI(doing, moveToFinished, backToTodo);
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
            let li = criarTagLI(doing, fromFinishedToTodo, backToDoing);
            list.appendChild(li);

        }
    }
    for (const elm of toDoChildList) {
        const inList = finishedList.some(task => task.id == elm.getAttribute("id"))
        if (!inList)
            list.removeChild(elm)
    }
}



function mostrarBtnExcluir(event) {
    const item = event.target;

    if (item.classList.contains('material-icons-outlined')) {
        item.parentElement.parentElement.parentElement.classList.toggle('showDeleted');
    }
}

const deleteTask = id => {
    todoList = todoList.filter(task => task.id !== id);
    doingList = doingList.filter(task => task.id !== id);
    finishedList = finishedList.filter(task => task.id !== id);

    handleTodoList();
    handleDoingList();
    handleFinishList();
};




function showDescricao(event) {
    const item = event.target;
    const taskElement = item.parentElement.parentElement.parentElement.parentElement;
    const descricaoElement = taskElement.lastChild;
    const btnEscondeDesc = taskElement.querySelector('.Desc');

    if (item.classList.contains('material-icons-outlined-ler')) {
        item.parentElement.parentElement.classList.add('some');
        descricaoElement.classList.add('show');
        btnEscondeDesc.classList.toggle('showDesc');

    }

    if (item.classList.contains('material-icons-outlined-esconde')) {
        btnEscondeDesc.classList.toggle('showDesc');
        descricaoElement.classList.remove('show');
        item.parentElement.parentElement.parentElement.childNodes[0].classList.remove('some');
    }
}

function btnRetornaElement(id) {
    const taskElement = document.getElementById(id);
    const retornaElements = taskElement.getElementsByClassName('retorna');
    Array.from(retornaElements).forEach(element => {
        element.style.width = '20px';
        element.style.height = '20px';
        element.style.background = '#FFFFFF';
        element.style.border = '1px solid #226ED8';
        element.style.borderRadius = '20px';
        element.style.padding = '1px';
        element.style.marginLeft = '103px';
        element.style.display = 'flex';

        const spanElement = element.querySelector('span');
        spanElement.style.width = '16px';
        spanElement.style.height = '16px';
        spanElement.style.fontFamily = 'Material Icons';
        spanElement.style.fontStyle = 'normal';
        spanElement.style.fontWeight = '400';
        spanElement.style.fontSize = '16px';
        spanElement.style.color = '#226ED8';
        spanElement.style.display = 'flex';
        spanElement.style.cursor = 'pointer';

    });
}


//Função que cria a estrutura do HTML para cada tarefa
function criarTagLI(tarefa, nextFunction, backFunction) {

    let li = document.createElement('li');
    li.setAttribute("id", tarefa.id)

    let divParte1 = document.createElement('div');
    divParte1.classList.add('parte1');

    let p = document.createElement('p');
    p.classList.add('TitleTask');
    p.innerHTML = tarefa.title;

    let btn_tres_pontinhos = document.createElement('button');
    btn_tres_pontinhos.addEventListener("click", mostrarBtnExcluir);
    btn_tres_pontinhos.classList.add('moveTask');
    btn_tres_pontinhos.innerHTML = '<span class="material-icons-outlined">more_vert</span>';



    let divParte2 = document.createElement('div');
    divParte2.classList.add('parte2');

    //Botao Expand Task
    let spanLerDesc = document.createElement('span');
    spanLerDesc.classList.add('itemDesc');
    spanLerDesc.addEventListener('click', showDescricao);
    spanLerDesc.innerHTML = 'Ler descrição <button class="expand-Ler"><span class="material-icons-outlined-ler">expand_more</span></button>';

    let p_Descricao = document.createElement('p');
    p_Descricao.classList.add('paragradoDes');
    p_Descricao.innerHTML = tarefa.desc;

    //Botao Excluir
    let btn_Excluir_Task = document.createElement('button');
    btn_Excluir_Task.addEventListener("click", () => deleteTask(tarefa.id));
    btn_Excluir_Task.classList.add('excluiTask');
    btn_Excluir_Task.innerHTML = '<span class="material-icons-outlined">&#xe92e</span> Excluir';

    //Botao Esconde a Task
    let spanEsconderDesc = document.createElement('span');
    spanEsconderDesc.classList.add('Desc');
    spanEsconderDesc.addEventListener('click', showDescricao);
    spanEsconderDesc.innerHTML = 'Esconder descrição <button class="expand-Desc"><span class="material-icons-outlined-esconde">expand_less</span></button>';

    //Botao volta a Task
    let btnRetornaTask = document.createElement('button');
    btnRetornaTask.addEventListener("click", () => backFunction(tarefa.id))
    btnRetornaTask.classList.add('retorna');
    btnRetornaTask.innerHTML = '<span class="material-icons-outlined">navigate_before</span>';


    //Botao move a Task
    let btnMoveTask = document.createElement('button');
    btnMoveTask.addEventListener("click", () => nextFunction(tarefa.id))
    btnMoveTask.classList.add('move');
    if (tarefa.status === taskStatus.finished)
        btnMoveTask.innerHTML = '<span class="material-icons-outlined">replay</span>';
    else
        btnMoveTask.innerHTML = '<span class="material-icons-outlined">navigate_next</span>';


    li.appendChild(divParte1);
    divParte1.appendChild(p);
    divParte1.appendChild(btn_tres_pontinhos);

    li.appendChild(divParte2);
    divParte2.appendChild(spanLerDesc);
    divParte2.appendChild(btn_Excluir_Task);
    divParte2.appendChild(spanEsconderDesc);
    divParte2.appendChild(btnRetornaTask);
    divParte2.appendChild(btnMoveTask);

    li.appendChild(p_Descricao);


    return li;
}


//Adicionar Tasks
btnnewTask.addEventListener('click', (e) => {
    if (inputTitulo.value === '' || inputDescricao.value === '')
        alert("Preencha todos os campos!");
    else
        addTask(inputTitulo.value, inputDescricao.value);
        const modal = document.querySelector(".novatask");
        modal.classList.remove("mostrar");

    e.preventDefault();
});

