class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
        this.draw(); 
    }

    
    draw(filter = '') {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; //Czyszczenie aktualnej listy

        //Filtrowanie
        const filteredTasks = this.tasks.filter(task => task.text.toLowerCase().includes(filter.toLowerCase()));

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');

            //Edycja
            const textItem = document.createElement('span');
            textItem.innerHTML = this.highlightText(task.text, filter);
            textItem.contentEditable = true;
            textItem.classList.add('task-text'); 

           
            textItem.addEventListener('blur', () => {
                const newText = textItem.textContent.trim();
                if (newText.length >= 3 && newText.length <= 255) {
                    this.tasks[index].text = newText; 
                    this.saveTasks(); 
                } else {
        
                    textItem.innerHTML = this.highlightText(task.text, filter);
                }
            });

       
            const dateItem = document.createElement('span');
            dateItem.textContent = task.date;
            dateItem.classList.add('task-date');

     
            dateItem.addEventListener('click', () => {
                const newDateInput = document.createElement('input');
                newDateInput.type = 'date';
                newDateInput.value = task.date; 
                taskItem.replaceChild(newDateInput, dateItem); 

                newDateInput.addEventListener('blur', () => {
                    const newDate = newDateInput.value; 
                    dateItem.textContent = newDate; 
                    taskItem.replaceChild(dateItem, newDateInput);

                    
                    this.tasks[index].date = newDate;
                    this.saveTasks();
                });
            });

            
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.addEventListener('click', () => this.deleteTask(index));

          
            taskItem.appendChild(textItem);
            taskItem.appendChild(dateItem);
            taskItem.appendChild(deleteBtn); 
            taskList.appendChild(taskItem);
        });
    }

    //Metody
    addTask(taskText, taskDate) {
        if (taskText.length < 3 || taskText.length > 255) {
            alert('Zadanie musi mieć od 3 do 255 znaków.');
            return;
        }

        if (taskDate && new Date(taskDate) < new Date()) {
            alert('Data musi być w przyszłości.');
            return;
        }

        this.tasks.push({ text: taskText, date: taskDate });
        this.saveTasks();
        this.draw(); 
    }

  
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.draw(); 
    }


    editTask(index) {
        const newTask = prompt('Edytuj zadanie:', this.tasks[index].text);
        if (newTask && newTask.trim().length >= 3 && newTask.trim().length <= 255) {
            this.tasks[index].text = newTask.trim();
            this.saveTasks();
            this.draw(); 
        }
    }

  
    searchTasks(filter) {
        if (filter.length >= 2) {
            this.draw(filter); 
        } else {
            this.draw();
        }
    }

  
    highlightText(text, search) {
        if (!search) return text;
        const regex = new RegExp(`(${search})`, 'gi');
        return text.replace(regex, '<span style="background-color: yellow;">$1</span>');
    }


    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }


    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; 
        return date.toLocaleDateString('pl-PL', options);
    }
}


const todo = new Todo();

//Przycisk dodaj
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput').value;
    const dateInput = document.getElementById('dateInput').value;
    todo.addTask(taskInput, dateInput); 
    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = ''; 
});

//Wyszukiwanie
document.getElementById('searchInput').addEventListener('input', (e) => {
    todo.searchTasks(e.target.value); 
});
