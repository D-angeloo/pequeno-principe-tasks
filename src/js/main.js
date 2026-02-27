import { inicializarParticulas } from './particles.js';
import { atualizarClima } from './theme.js';
import { adicionarTarefa, renderizarTarefas, setFilter } from './task.js'; 

// === FUNÇÃO PARA MOSTRAR AVISOS ESTELARES (TOAST) ===
function mostrarAviso(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `✨ ${mensagem}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('toast-show'), 100);

    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const subtitle = document.getElementById('app-subtitle');
    const progressText = document.getElementById('progress-text');
    const filterBtns = document.querySelectorAll('#filters button');

    // ===INICIALIZAÇAO===
    inicializarParticulas();
    const render = () => renderizarTarefas(taskList, progressText);
    atualizarClima(subtitle, addTaskBtn);
    render();

    // === LÓGICA DE ADICIONAR TAREFA (UNIFICADA) ===
    const tratarAdicao = () => {
        const texto = taskInput.value.trim();
        if (texto) {
            const btnAtivo = document.querySelector('[data-filter].bg-indigo-500\\/20');
            const filtroAtivo = btnAtivo ? btnAtivo.getAttribute('data-filter') : 'all';

            adicionarTarefa(texto, render);
            taskInput.value = '';

            if (filtroAtivo === 'completed') {
                mostrarAviso("Essas são as tarefas cativadas!!");
            } else if (filtroAtivo === 'important' || filtroAtivo === 'personal') {
                mostrarAviso(`Nova tarefa adicionada ao seu planeta.`);
            }
        }
    };

    // ===EVENTO DE CLIQUE E TECLAOD===
    addTaskBtn.addEventListener('click', tratarAdicao);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') tratarAdicao();
    });

    // ===EVENTO DE FILTRO===
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.getAttribute('data-filter'));
            filterBtns.forEach(b => b.className = "px-3 py-1 border border-white/20 rounded-full hover:bg-white/10 transition text-xs text-white/70");
            btn.className = "px-3 py-1 border border-indigo-400 bg-indigo-500/20 rounded-full text-xs text-white shadow-md";
            render();
        });
    });

    // ===ESCUTA EVENTOS DA ANIMAÇAO===
    window.addEventListener('renderTasks', render);
    setInterval(() => atualizarClima(subtitle, addTaskBtn), 60000);
});