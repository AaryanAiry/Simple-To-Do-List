function attachDeleteListeners() {
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            event.target.closest(".todo").remove();
        });
    });
}

function editList(taskItem) {
    let taskLabel = taskItem.querySelector(".todo-text");
    let taskDate = taskItem.querySelector(".todo-date");

    taskLabel.setAttribute("contenteditable", "true");
    taskDate.setAttribute("contenteditable", "true");

    taskLabel.focus(); // Automatically focus on the text

    function saveEdit(event) {
        if (event.type === "blur" || event.key === "Enter") {
            taskLabel.setAttribute("contenteditable", "false");
            taskDate.setAttribute("contenteditable", "false");
        }
    }

    taskLabel.addEventListener("blur", saveEdit);
    taskDate.addEventListener("blur", saveEdit);

    taskLabel.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent line break in editable div
            saveEdit(event);
        }
    });

    taskDate.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveEdit(event);
        }
    });
}

let draggedItem = null;

function setupDragAndDrop(li) {
    li.setAttribute("draggable", "true");

    li.addEventListener("dragstart", () => {
        draggedItem = li;
        li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
        draggedItem = null;
        li.classList.remove("dragging");
    });

    li.addEventListener("dragover", (e) => {
        e.preventDefault(); // Necessary to allow drop
        const bounding = li.getBoundingClientRect();
        const offset = e.clientY - bounding.top;
        if (offset > bounding.height / 2) {
            li.style["border-bottom"] = "2px solid var(--accent-color)";
            li.style["border-top"] = "";
        } else {
            li.style["border-top"] = "2px solid var(--accent-color)";
            li.style["border-bottom"] = "";
        }
    });

    li.addEventListener("dragleave", () => {
        li.style["border-top"] = "";
        li.style["border-bottom"] = "";
    });

    li.addEventListener("drop", (e) => {
        e.preventDefault();
        li.style["border-top"] = "";
        li.style["border-bottom"] = "";

        const bounding = li.getBoundingClientRect();
        const offset = e.clientY - bounding.top;

        if (offset > bounding.height / 2) {
            li.parentNode.insertBefore(draggedItem, li.nextSibling);
        } else {
            li.parentNode.insertBefore(draggedItem, li);
        }
    });
}


// function editList(taskItem) {
//     let taskLabel = taskItem.querySelector(".todo-text");
//     let taskDate = taskItem.querySelector(".todo-date");
//     taskLabel.setAttribute("contenteditable", "true");
//     taskDate.setAttribute("contenteditable", "true");

//     taskLabel.focus(); // Automatically focus on the text

//     // Create input fields for both task text and date
//     let editInput = document.createElement("input");
//     editInput.type = "text";
//     editInput.value = taskLabel.innerText;
//     editInput.classList.add("edit-input");

//     let dateInput = document.createElement("input");
//     dateInput.type = "datetime-local";
//     dateInput.value = taskDate.innerText.replace(" ", "T"); // Convert back for input
//     dateInput.classList.add("edit-date");

//     // Replace text and date spans with input fields
//     taskItem.replaceChild(editInput, taskLabel);
//     taskItem.replaceChild(dateInput, taskDate);

//     editInput.focus();

//     function saveEdit() {
//         let newText = editInput.value.trim() || "Unnamed Task";
//         let newDate = dateInput.value.replace("T", " ") || "No Date";

//         taskLabel.innerText = newText;
//         taskDate.innerText = newDate;

//         taskItem.replaceChild(taskLabel, editInput);
//         taskItem.replaceChild(taskDate, dateInput);
//     }

//     editInput.addEventListener("blur", saveEdit);
//     dateInput.addEventListener("blur", saveEdit);

//     editInput.addEventListener("keypress", (event) => {
//         if (event.key === "Enter") {
//             saveEdit();
//         }
//     });
// }


document.addEventListener("DOMContentLoaded", () => {
    attachDeleteListeners();
    // Enable edit for already existing tasks
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", (e) => {
            const taskItem = e.target.closest(".todo");
            if (taskItem) editList(taskItem);
        });
    });
    document.querySelectorAll(".todo").forEach(li => {
        setupDragAndDrop(li);
    });

    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");


    addButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        const taskText = input.value.trim();
        const rawDate = document.getElementById("todo-date").value; 
        const taskDate = rawDate.replace("T", " ");

        // if (taskText === "" || taskDate === "") return; // 
    
        const taskId = `todo-${Date.now()}`;
        const li = document.createElement("li");
        li.classList.add("todo");
        setupDragAndDrop(li);

        li.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label class="custom-checkbox" for="${taskId}">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Z"/></svg>
            </label>

            <label for="${taskId}" class="todo-text">
                ${taskText} 
            </label>

            <span class="todo-date">${taskDate}</span> <!-- Add this to show date -->

            <button class = "edit-button" >
                    <svg fill = "var(--secondary-color)" xmlns="<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>

            <button class="delete-button">
                <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>
            </button>
        `;        
        

        const editButton = document.createElement("button");
        // editButton.classList.add("edit-button");
        // editButton.innerHTML = `<svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-160h80l320-320-80-80-320 320v80Zm480-400 80-80-80-80-80 80 80 80ZM120-80v-200l560-560q17-17 39-25t45-8q24 0 45 8t39 25l40 40q17 17 25 39t8 45q0 24-8 45t-25 39L360-80H120Zm80-80h120l520-520-120-120-520 520v120Z"/></svg>`;


        // li.appendChild(editButton);


        editButton.addEventListener("click", () => editList(li));
    
        li.querySelector(".edit-button").addEventListener("click", () => editList(li));
        li.querySelector(".delete-button").addEventListener("click", () => {
            li.remove();
        });

        todoList.appendChild(li);
        input.value = "";
        document.getElementById("todo-date").value = ""; 
        
        
        
    });
    
    

    document.querySelector(".calendar-icon").addEventListener("click", function () {
        let dateInput = document.getElementById("todo-date");
        dateInput.style.display = dateInput.style.display === "block" ? "none" : "block";
    });
    document.getElementById("calendar-icon").addEventListener("click", function() {
        let dateInput = document.getElementById("todo-date");
        dateInput.classList.toggle("hidden");  
        dateInput.focus();  
    });
   
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            event.target.closest(".todo").remove();
        });
    });
});
