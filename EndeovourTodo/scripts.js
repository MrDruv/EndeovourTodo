 const taskInput = document.getElementById('taskInput');
        const taskDateInput = document.getElementById('taskDate');
        const taskNotesInput = document.getElementById('taskNotes');  // Corrected ID.
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const showInputBtn = document.getElementById('showInputBtn');
        const inputContainer = document.getElementById('inputContainer');
        const newListBtn = document.getElementById('newListBtn');
        const sidebarLinks = document.querySelectorAll('.sidebar li');
        const newListModal = document.getElementById('newListModal');
        const modalCloseBtn = document.querySelector('.close-button');
        const modalCancelBtn = document.querySelector('.cancel-btn');
        const modalCreateBtn = document.querySelector('.create-btn');
        const listNameInput = document.getElementById('listNameInput');
        const sidebarList = document.getElementById('sidebarList'); // Get the sidebar ul

        let tasks = [];
        let currentList = 'inbox';

        // Load tasks from localStorage
        if (localStorage.getItem('tasks')) {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function displayTasks() {
            taskList.innerHTML = '';
            const today = new Date().toISOString().split('T')[0];
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const filteredTasks = tasks.filter(task => {
                if (currentList === 'inbox') return !task.completed;
                if (currentList === 'today') return task.date === today && !task.completed;
                if (currentList === 'next7days') return task.date >= today && task.date <= nextWeek && !task.completed;
                if (currentList === 'all') return true;
                if (currentList === 'archived') return task.completed;
                return task.list === currentList; //show task for the selected list
            });

            filteredTasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.className = task.completed ? 'task-list-item completed' : 'task-list-item';
                const taskContent = document.createElement('div');
                taskContent.className = 'task-content flex items-center';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.className = 'mr-2';
                checkbox.addEventListener('change', () => {
                    task.completed = !task.completed;
                    saveTasks();
                    displayTasks();
                });

                const taskSpan = document.createElement('span');
                taskSpan.className = 'flex-grow';
                taskSpan.textContent = task.text;

                taskContent.appendChild(checkbox);
                taskContent.appendChild(taskSpan);


                taskContent.innerHTML += `${task.date ? `<span class="date text-gray-500 text-sm ml-2">Date: ${task.date}</span>` : ''}
                                        ${task.notes ? `<span class="notes text-gray-600 text-sm ml-2">Notes: ${task.notes}</span>` : ''}`;

                const buttonContainer = document.createElement('div');
                buttonContainer.className = "space-x-2";

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = "del-btn";
                deleteBtn.addEventListener('click', () => {
                    tasks = tasks.filter(t => t !== task);
                    saveTasks();
                    displayTasks();
                });

                buttonContainer.appendChild(deleteBtn);

                listItem.appendChild(taskContent);
                listItem.appendChild(buttonContainer);
                taskList.appendChild(listItem);
            });
        }

        showInputBtn.addEventListener('click', () => {
            inputContainer.style.display = "block";
            showInputBtn.style.display = "none";
            taskInput.focus();
        });

        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            const taskDate = taskDateInput.value;
            const taskNotes = taskNotesInput.value;

            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            const newTask = {
                text: taskText,
                date: taskDate,
                notes: taskNotes,
                completed: false,
                list: currentList  // Add the current list to the task
            };
            tasks.push(newTask);
            saveTasks();
            displayTasks();

            taskInput.value = '';
            taskDateInput.value = '';
            taskNotesInput.value = '';
            inputContainer.style.display = "none";
            showInputBtn.style.display = "block";
        });

        newListBtn.addEventListener('click', () => {
            newListModal.style.display = "block";
            listNameInput.focus();
        });

        modalCloseBtn.addEventListener('click', () => {
            newListModal.style.display = "none";
        });

        modalCancelBtn.addEventListener('click', () => {
            newListModal.style.display = "none";
        });

        modalCreateBtn.addEventListener('click', () => {
            const listName = listNameInput.value.trim();
            if (listName !== "") {
                const newListElement = document.createElement('li');
                newListElement.textContent = listName;
                newListElement.className = "list-item";
                newListElement.setAttribute('data-list', listName.toLowerCase().replace(/\s/g, ''));
                const icon = document.createElement('i');
                icon.className = "ph-list-bulleted mr-2";
                newListElement.prepend(icon);
                sidebarList.appendChild(newListElement); // Append to the sidebar

                sidebarLinks.forEach(link => link.classList.remove('active'));
                newListElement.classList.add('active');
                currentList = listName.toLowerCase().replace(/\s/g, '');

                // Show input container after creating new list.
                inputContainer.style.display = "block";
                showInputBtn.style.display = "none";
                taskInput.focus();

                displayTasks();
                newListModal.style.display = "none";
                listNameInput.value = '';
            } else {
                alert('Please enter a list name!');
                listNameInput.focus();
            }
        });

        window.addEventListener('click', (event) => {
            if (event.target === newListModal) {
                newListModal.style.display = "none";
            }
        });

        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebarLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                currentList = this.getAttribute('data-list');
                displayTasks();
            });
        });

        displayTasks();

