document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const dateInput = document.getElementById("todo-date");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");

    addButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        const taskText = input.value.trim();
        const taskDate = dateInput.value.trim(); // Get date input value
        if (taskText === "") return;
        
        const taskId = `todo-${Date.now()}`;
        const li = document.createElement("li");
        li.classList.add("todo");
        li.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label class="custom-checkbox" for="${taskId}">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
            </label>
            <label for="${taskId}" class="todo-text">
                ${taskText}
            </label>
            ${taskDate ? `<span class="todo-date">📅 ${taskDate}</span>` : ""}
            <button class="delete-button">
                <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
        `;

        todoList.appendChild(li);
        input.value = "";
        dateInput.value = ""; // Clear date input after adding

        li.querySelector(".delete-button").addEventListener("click", () => {
            li.remove();
        });
    });
    document.querySelector(".calendar-icon").addEventListener("click", function () {
        let dateInput = document.getElementById("todo-date");
        dateInput.style.display = dateInput.style.display === "block" ? "none" : "block";

    document.querySelector(".calendar-icon").addEventListener("click", function () {
        dateInput.classList.toggle("hidden");  // Toggle visibility
        dateInput.focus();  // Focus the input so the user can pick a date
    });

    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            event.target.closest(".todo").remove();
        });
    });
});



















// document.addEventListener("DOMContentLoaded", function () {
//     const todoInput = document.getElementById("todo-input");
//     const todoDateInput = document.getElementById("todo-date");
//     const addButton = document.getElementById("add-button");
//     const todoList = document.getElementById("todo-list");
//     const calendarIcon = document.querySelector(".calendar-icon");
    
//     // Show/hide the date input when clicking the calendar icon
//     calendarIcon.addEventListener("click", function () {
//         todoDateInput.classList.toggle("hidden");
//         todoDateInput.focus();
//     });

//     // Function to add a new task
//     function addTodo() {
//         const taskText = todoInput.value.trim();
//         const taskDate = todoDateInput.value; 

//         if (taskText === "") {
//             alert("Task cannot be empty!");
//             return;
//         }

//         const listItem = document.createElement("li");
//         listItem.classList.add("todo");

//         // Create checkbox
//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.id = `todo-${todoList.children.length + 1}`;

//         // Create custom checkbox design
//         const customCheckbox = document.createElement("label");
//         customCheckbox.classList.add("custom-checkbox");
//         customCheckbox.setAttribute("for", checkbox.id);
//         customCheckbox.innerHTML = `
//             <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
//                 <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
//             </svg>
//         `;

//         // Create task text label
//         const taskLabel = document.createElement("label");
//         taskLabel.classList.add("todo-text");
//         taskLabel.setAttribute("for", checkbox.id);
//         taskLabel.textContent = taskText;

//         // Create date display if a date is selected
//         let dateLabel = "";
//         if (taskDate) {
//             dateLabel = document.createElement("span");
//             dateLabel.classList.add("task-date");
//             dateLabel.textContent = ` (Due: ${new Date(taskDate).toLocaleString()})`;
//         }

//         // Create delete button
//         const deleteButton = document.createElement("button");
//         deleteButton.classList.add("delete-button");
//         deleteButton.innerHTML = `
//             <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
//                 <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
//             </svg>
//         `;
        
//         deleteButton.addEventListener("click", function () {
//             listItem.remove();
//         });

//         // Append elements to list item
//         listItem.appendChild(checkbox);
//         listItem.appendChild(customCheckbox);
//         listItem.appendChild(taskLabel);
//         if (dateLabel) {
//             listItem.appendChild(dateLabel);
//         }
//         listItem.appendChild(deleteButton);
        
//         // Append to the list
//         todoList.appendChild(listItem);

//         // Clear input fields
//         todoInput.value = "";
//         todoDateInput.value = "";
//     }

//     // Add event listener for button click
//     addButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         addTodo();
//     });

//     // Allow pressing "Enter" key to add task
//     todoInput.addEventListener("keypress", function (event) {
//         if (event.key === "Enter") {
//             event.preventDefault();
//             addTodo();
//         }
//     });
// });
