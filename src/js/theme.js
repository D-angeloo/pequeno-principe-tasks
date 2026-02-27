// === ESTE MÓDULO GERE O CLIMA DINÂMICO E AS FRASES DO SUBTÍTULO ===
export function atualizarClima(subtitle, addTaskBtn) {
    const agora = new Date();
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const body = document.body;

    if (hora === 3 && minutos <= 30) {
        subtitle.innerText = "Cuidado para não tropeçar nos Baobás enquanto as estrelas dormem...";
        subtitle.classList.add('text-emerald-400', 'animate-pulse');
        addTaskBtn.innerHTML = "🌱 Plantar";
        addTaskBtn.style.backgroundColor = "#059669"; 
    } else {
        subtitle.classList.remove('text-emerald-400', 'animate-pulse');
        addTaskBtn.innerHTML = "Adicionar";
        addTaskBtn.style.backgroundColor = "";

        if (hora >= 18 || hora <= 5) {
            body.className = "relative bg-linear-to-b from-slate-950 via-black to-slate-950 text-white min-h-screen transition-all duration-1000";
            if (hora !== 3) subtitle.innerText = "As estrelas brilham para que cada um encontre a sua.";
        } else {
            body.className = "relative bg-linear-to-b from-indigo-900 via-slate-900 to-indigo-950 text-white min-h-screen transition-all duration-1000";
            subtitle.innerText = "É preciso que eu suporte duas ou três larvas se quiser conhecer as borboletas";
        }
    }
}