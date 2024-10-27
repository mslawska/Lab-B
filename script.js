class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Inicjalizacja zadań z Local Storage
        this.draw(); // Rysowanie listy na starcie
    }

    // Metoda odpowiedzialna za renderowanie listy zadań (nazywana draw)
    draw(filter = '') {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Czyszczenie listy

        this.tasks.forEach((task, index) => {
            if (task.text.toLowerCase().includes(filter.toLowerCase())) {
                const li = document.createElement('li');
                const taskText = document.createElement('span');
                taskText.classList.add('task-text');
                taskText.innerHTML = this.highlightText(task.text, filter);

                // Wyświetlanie daty, jeśli istnieje
                if (task.date) {
                    const taskDate = document.createElement('span');
                    taskDate.classList.add('task-date');
                    taskDate.innerText = ` (do: ${this.formatDate(task.date)})`; // Użycie nowej metody formatDate
                    taskText.appendChild(taskDate);
                }

                taskText.addEventListener('click', () => this.editTask(index));

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '🗑️';
                deleteBtn.addEventListener('click', () => this.deleteTask(index));

                li.appendChild(taskText);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            }
        });
    }

    // Metoda dodająca nowe zadanie
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
        this.draw(); // Po dodaniu zadania, odśwież listę
    }

    // Metoda usuwająca zadanie
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.draw(); // Po usunięciu zadania, odśwież listę
    }

    // Metoda edytująca zadanie
    editTask(index) {
        const newTask = prompt('Edytuj zadanie:', this.tasks[index].text);
        if (newTask && newTask.trim().length >= 3 && newTask.trim().length <= 255) {
            this.tasks[index].text = newTask.trim();
            this.saveTasks();
            this.draw(); // Po edytowaniu zadania, odśwież listę
        }
    }

    // Metoda wyszukująca zadania
    searchTasks(filter) {
        if (filter.length >= 2) {
            this.draw(filter); // Filtruj zadania podczas wyszukiwania
        } else {
            this.draw(); // Gdy filtr jest krótszy niż 2 znaki, pokaż całą listę
        }
    }

    // Metoda wyróżniająca tekst wyszukiwania
    highlightText(text, search) {
        if (!search) return text;
        const regex = new RegExp(`(${search})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    // Metoda zapisująca zadania do Local Storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Metoda formatująca datę do postaci d M yyyy
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' }; // Ustawienia formatowania
        return date.toLocaleDateString('pl-PL', options); // Użycie polskiego formatu
    }
}

// Inicjalizacja klasy Todo
const todo = new Todo();

// Obsługa przycisku dodawania zadania
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput').value;
    const dateInput = document.getElementById('dateInput').value;
    todo.addTask(taskInput, dateInput); // Przekazywanie tekstu i daty do metody addTask
    document.getElementById('taskInput').value = ''; // Czyszczenie pola tekstowego
    document.getElementById('dateInput').value = ''; // Czyszczenie pola daty
});

// Obsługa wyszukiwania zadań
document.getElementById('searchInput').addEventListener('input', (e) => {
    todo.searchTasks(e.target.value); // Wywołanie wyszukiwania po każdym wprowadzeniu znaku
});
