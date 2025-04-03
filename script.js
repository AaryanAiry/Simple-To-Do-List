document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");

    addButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        const taskText = input.value.trim();
        if (taskText === "") return;
        
        const taskId = `todo-${Date.now()}`;
        const li = document.createElement("li");
        li.classList.add("todo");
        li.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label class="custom-checkbox" for="${taskId}">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </label>
            <label for="${taskId}" class="todo-text">
                ${taskText}
            </label>
            <button class="delete-button">
                <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
        `;
        
        todoList.appendChild(li);
        input.value = "";

        li.querySelector(".delete-button").addEventListener("click", () => {
            li.remove();
        });
    });
    document.querySelector(".calendar-icon").addEventListener("click", function () {
        let dateInput = document.getElementById("todo-date");
        dateInput.style.display = dateInput.style.display === "block" ? "none" : "block";
    });
    document.getElementById("calendar-icon").addEventListener("click", function() {
        let dateInput = document.getElementById("todo-date");
        dateInput.classList.toggle("hidden");  // Toggle visibility
        dateInput.focus();  // Focus the input so the user can pick a date
    });
   
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            event.target.closest(".todo").remove();
        });
    });
});
