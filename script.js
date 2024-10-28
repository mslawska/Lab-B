class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Inicjalizacja zadań z Local Storage
        this.draw(); // Rysowanie listy na starcie
    }

<<<<<<< HEAD
    // Metoda odpowiedzialna za renderowanie listy zadań
    draw(filter = '') {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Wyczyść aktualną listę

        // Filtrowanie zadań na podstawie filtru
        const filteredTasks = this.tasks.filter(task => task.text.toLowerCase().includes(filter.toLowerCase()));

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');

            // Tworzenie edytowalnego elementu tekstowego
            const textItem = document.createElement('span');
            textItem.innerHTML = this.highlightText(task.text, filter); // Użyj metody highlightText
            textItem.contentEditable = true; // Umożliwia edytowanie
            textItem.classList.add('task-text'); // Możesz dodać styl, jeśli chcesz

            // Dodaj obsługę zdarzenia 'blur' na edytowalnym elemencie
            textItem.addEventListener('blur', () => {
                const newText = textItem.textContent.trim();
                if (newText.length >= 3 && newText.length <= 255) {
                    this.tasks[index].text = newText; // Zaktualizuj tekst w tablicy
                    this.saveTasks(); // Zapisz zmiany
                } else {
                    // Jeśli tekst nie jest odpowiedni, przywróć oryginalny tekst
                    textItem.innerHTML = this.highlightText(task.text, filter);
                }
            });

            // Tworzenie elementu daty
            const dateItem = document.createElement('span');
            dateItem.textContent = task.date;
            dateItem.classList.add('task-date');

            // Dodaj obsługę kliknięcia na datę
            dateItem.addEventListener('click', () => {
                const newDateInput = document.createElement('input');
                newDateInput.type = 'date';
                newDateInput.value = task.date; // Ustaw domyślną wartość na aktualną datę
                taskItem.replaceChild(newDateInput, dateItem); // Zastąp datę polem input

                newDateInput.addEventListener('blur', () => {
                    const newDate = newDateInput.value; // Zapisz nową datę
                    dateItem.textContent = newDate; // Zaktualizuj wyświetlaną datę
                    taskItem.replaceChild(dateItem, newDateInput); // Zastąp input z powrotem datą

                    // Zaktualizuj datę w tablicy zadań
                    this.tasks[index].date = newDate;
                    this.saveTasks(); // Zapisz zmiany
                });
            });

            // Przycisk usuwania zadania
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.addEventListener('click', () => this.deleteTask(index));

            // Dodaj elementy do zadania
            taskItem.appendChild(textItem);
            taskItem.appendChild(dateItem);
            taskItem.appendChild(deleteBtn); // Dodaj przycisk usuwania
            taskList.appendChild(taskItem);
=======
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
>>>>>>> 14be656de9ca6e8e63e5131864f21229c2402541
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
<<<<<<< HEAD
        return text.replace(regex, '<span style="background-color: yellow;">$1</span>');
=======
        return text.replace(regex, '<strong>$1</strong>');
>>>>>>> 14be656de9ca6e8e63e5131864f21229c2402541
    }

    // Metoda zapisująca zadania do Local Storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Metoda formatująca datę do postaci d M yyyy
    formatDate(dateString) {
        const date = new Date(dateString);
<<<<<<< HEAD
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; // Ustawienia formatowania
=======
        const options = { day: 'numeric', month: 'short', year: 'numeric' }; // Ustawienia formatowania
>>>>>>> 14be656de9ca6e8e63e5131864f21229c2402541
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
