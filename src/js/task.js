// === ESTE MÓDULO CONTROLA TODA A LÓGICA DE TAREFAS (CRUD) E ANIMAÇÕES ===
let tasks = JSON.parse(localStorage.getItem('planet_tasks')) || [];
let currentFilter = 'all';

export function getTasks() { return tasks; }
export function setFilter(f) { currentFilter = f; }

export function salvarETualizar(callback) {
    localStorage.setItem('planet_tasks', JSON.stringify(tasks));
    callback(); 
}

export function adicionarTarefa(text, callback) {
    let category = 'general';
    if (currentFilter === 'important') category = 'rosa';
    if (currentFilter === 'personal') category = 'raposa';

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false,
        category: category
    });
    salvarETualizar(callback);
}

// === EXPOSTAS AO WINDOW PARA O ONCLICK DO HTML FUNCIONAR ===
window.alternarTarefa = (id) => {
    const tarefa = tasks.find(t => t.id === id);
    if (!tarefa) return;

    tarefa.completed = !tarefa.completed;
    const li = event.currentTarget.closest('li');

    if (tarefa.completed) {
        li.querySelector('.text-xl').classList.add('animate-star');
        li.classList.add('task-completed-bg');
        setTimeout(() => window.dispatchEvent(new CustomEvent('renderTasks')), 600);
    } else {
        window.dispatchEvent(new CustomEvent('renderTasks'));
    }
    localStorage.setItem('planet_tasks', JSON.stringify(tasks));
};

window.deletarTarefa = (id) => {
    const li = event.currentTarget.closest('li');
    li.classList.add('task-exit-active');
    setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('planet_tasks', JSON.stringify(tasks));
        window.dispatchEvent(new CustomEvent('renderTasks'));
    }, 500);
};

export function renderizarTarefas(taskList, progressText) {
    taskList.innerHTML = '';
    const filtradas = tasks.filter(t => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'completed') return t.completed;
        if (currentFilter === 'important') return t.category === 'rosa';
        if (currentFilter === 'personal') return t.category === 'raposa';
        return true;
    });

    filtradas.forEach(tarefa => {
        const li = document.createElement('li');
        let emoji = tarefa.category === 'rosa' ? '🌹' : (tarefa.category === 'raposa' ? '🦊' : '✨');
        let borderColor = tarefa.category === 'rosa' ? 'border-rose-500' : (tarefa.category === 'raposa' ? 'border-orange-400' : 'border-white/10');

        li.className = `group flex items-start justify-between bg-white/5 backdrop-blur-md p-4 rounded-xl border-l-4 ${borderColor} transition-all mb-2 h-auto`;
        li.innerHTML = `
            <div class="flex items-start gap-3 flex-1 pr-4"> 
                <span class="text-xl mt-0.5">${tarefa.completed ? '⭐' : emoji}</span>
                <span class="task-text ${tarefa.completed ? 'line-through text-white/40' : 'text-white/90'} font-light">${tarefa.text}</span>
            </div>
            <div class="flex gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pt-1">
                <button onclick="alternarTarefa(${tarefa.id})" class="text-white/40 hover:text-emerald-400"><i class="fas fa-check"></i></button>
                <button onclick="deletarTarefa(${tarefa.id})" class="text-white/40 hover:text-rose-400"><i class="fas fa-trash-alt"></i></button>
            </div>`;
        taskList.appendChild(li);
    });

    const concluidas = tasks.filter(t => t.completed).length;
    progressText.innerText = `${concluidas} de ${tasks.length} tarefas cativadas`;
}