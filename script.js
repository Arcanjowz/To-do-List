function updateTaskCounter() {
	const list = document.getElementById("task-list");
	const empty = document.getElementById("empty-state");
	const counter = document.getElementById("task-counter");
	const quantity = list.children.length;

	counter.textContent = quantity === 1 ? "1 tarefa" : quantity + " tarefas";
	empty.style.display = quantity === 0 ? "block" : "none";
}

function addTask() {
	const form = document.getElementById("task-form");
	form.classList.toggle("open");
}

function submitTask() {
	const taskName = document.getElementById("task-name").value.trim();
	const taskDescription = document
		.getElementById("task-description")
		.value.trim();
	const taskDate = document.getElementById("task-deadline").value;
	const list = document.getElementById("task-list");
	const form = document.getElementById("task-form");

	if (taskName === "" || taskDate === "") {
		alert("Por favor, preencha os campos nome e data da tarefa.");
		return;
	}

	if (new Date(taskDate) < new Date().setHours(0, 0, 0, 0)) {
		alert("Por favor, escolha uma data futura.");
		return;
	}

	const newTask = document.createElement("li");
	newTask.classList.add("task-item");

	newTask.innerHTML = `
    <div class="task-main">
        <div class="left">
        <input type="checkbox" class="task-checkbox"> 
        <span class="task-text">
            <strong class="task-title">${taskName}</strong> 
            <p>Data para conclusão: <small class="task-date">${taskDate}</small></p>
        </span>
        </div>
        <input type="button" value="+" class="detail-button" onclick="showDetails(this)">
    </div>
    <div class="task-details">
        <div class="task-details-content">
        <p class="task-desc-text"><strong>Descrição:</strong> <span class="desc-content">${taskDescription || "Sem descrição."}</span></p>
        <div class="task-actions">
            <button type="button" class="btn-edit" onclick="editTask(this)">Editar</button>
            <button type="button" class="btn-delete" onclick="deleteTask(this)">Excluir</button>
        </div>
        </div>
    </div>
    `;

	list.appendChild(newTask);
	updateTaskCounter();

	document.getElementById("task-name").value = "";
	document.getElementById("task-description").value = "";
	document.getElementById("task-deadline").value = "";

	form.classList.remove("open");
}

function showDetails(button) {
	const taskItem = button.closest(".task-item");
	const details = taskItem.querySelector(".task-details");

	details.classList.toggle("open");
	button.value = details.classList.contains("open") ? "-" : "+";
}

function deleteTask(button) {
	const taskItem = button.closest(".task-item");

	taskItem.classList.add("removing");

	taskItem.addEventListener(
		"transitionend",
		() => {
			taskItem.remove();
			updateTaskCounter();
		},
		{ once: true },
	);
}

function editTask(button) {
	const taskItem = button.closest(".task-item");
	const titleElement = taskItem.querySelector(".task-title");
	const descElement = taskItem.querySelector(".desc-content");

	const newTitle = prompt("Edite o nome da tarefa:", titleElement.textContent);
	if (newTitle !== null && newTitle.trim() !== "") {
		titleElement.textContent = newTitle.trim();
	}

	const newDesc = prompt(
		"Edite a descrição da tarefa:",
		descElement.textContent === "Sem descrição." ? "" : descElement.textContent,
	);
	if (newDesc !== null) {
		descElement.textContent =
			newDesc.trim() !== "" ? newDesc.trim() : "Sem descrição.";
	}
}

function removeCompletedTask() {
	const list = document.getElementById("task-list");
	const completedTasks = list.querySelectorAll(".task-checkbox:checked");

	if (completedTasks.length === 0) {
		alert("Não há tarefas concluídas para remover.");
		return;
	}

	const confirmationMessage =
		completedTasks.length === 1
			? "Tem certeza de que deseja remover 1 tarefa concluída?"
			: `Tem certeza de que deseja remover ${completedTasks.length} tarefas concluídas?`;

	if (confirm(confirmationMessage)) {
		completedTasks.forEach((checkbox) => {
			const taskItem = checkbox.closest(".task-item");
			taskItem.classList.add("removing");
			taskItem.addEventListener(
				"transitionend",
				() => {
					taskItem.remove();
					updateTaskCounter();
				},
				{ once: true },
			);
		});
	}
}

function removeAllTasks() {
	const list = document.getElementById("task-list");
	const allTasks = list.querySelectorAll(".task-item");

	if (allTasks.length === 0) {
		alert("Não há tarefas para remover.");
		return;
	}

	confirm("Tem certeza de que deseja remover todas as tarefas?") &&
		allTasks.forEach((taskItem) => {
			taskItem.classList.add("removing");
			taskItem.addEventListener(
				"transitionend",
				() => {
					taskItem.remove();
					updateTaskCounter();
				},
				{ once: true },
			);
		});
}

function avaliateProject() {
	const confirmacao = confirm("Você deseja avaliar o projeto?");
	if (confirmacao) {
		window.open("https://github.com/Arcanjowz/To-do-List", "_blank");
	}
}
