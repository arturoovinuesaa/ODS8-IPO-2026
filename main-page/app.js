const bellButton = document.querySelector('.icon-button[aria-label="Notificaciones"]');
const notifPanel = document.getElementById("notif-panel");
const notifClose = document.getElementById("notif-close");
const notifBackdrop = document.getElementById("notif-backdrop");
const toast = document.getElementById("toast");
const expandChartBtn = document.querySelector(".expand-chart-btn");
const trendCard = document.querySelector(".trend-card");
const interactivePoints = document.querySelectorAll(".chart-point.interactive");
const chartTooltip = document.getElementById("chart-tooltip");
const chartWrap = document.querySelector(".chart-wrap");
const factsMoreButton = document.querySelector(".facts .link");
const factsRow = document.querySelector(".facts-row");
const shareButtons = document.querySelectorAll(".share-btn");
const playButtons = document.querySelectorAll(".play-button");
const sideActions = document.querySelectorAll(".side-action");
const quizButton = document.querySelector(".quiz-btn");
const mediaAltButtons = document.querySelectorAll(".story-alt-btn");
const mediaAltPanel = document.getElementById("media-alt-panel");
const mediaAltClose = document.getElementById("media-alt-close");
const mediaAltBackdrop = document.getElementById("media-alt-backdrop");
const commentsPanel = document.getElementById("comments-panel");
const commentsClose = document.getElementById("comments-close");
const commentsBackdrop = document.getElementById("comments-backdrop");
const commentsTriggers = document.querySelectorAll(".comments-trigger");
const commentSubmitBtn = document.getElementById("comment-submit-btn");
const newCommentInput = document.getElementById("new-comment-input");

function showToast(message, duration = 3000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    
    // Announce via aria-live
    toast.setAttribute('aria-live', 'polite');
    
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
        toast.setAttribute('aria-live', 'off'); // Prevent old messages from remaining active longer than needed
    }, duration);
}

function updateAriaPressed(button) {
    const isPressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', !isPressed);
    
    // Cambiar la apariencia del icono basándose en el estado
    const icon = button.querySelector('i');
    if (icon) {
        if (!isPressed) {
            icon.classList.remove('ph');
            icon.classList.add('ph-fill');
            icon.style.color = "var(--accent)";
        } else {
            icon.classList.remove('ph-fill');
            icon.classList.add('ph');
            icon.style.color = "inherit";
        }
    }
    
    return !isPressed;
}

function openNotifPanel() {
    notifPanel.hidden = false;
    notifClose.focus();
}

function closeNotifPanel() {
    notifPanel.hidden = true;
    bellButton.focus();
}

function openMediaAltPanel() {
    if (!mediaAltPanel || !mediaAltClose) return;
    mediaAltPanel.hidden = false;
    mediaAltClose.focus();
}

function closeMediaAltPanel() {
    if (!mediaAltPanel) return;
    mediaAltPanel.hidden = true;
}

function openCommentsPanel() {
    if (!commentsPanel) return;
    commentsPanel.hidden = false;
    newCommentInput.focus();
}

function closeCommentsPanel() {
    if (!commentsPanel) return;
    commentsPanel.hidden = true;
}

if (expandChartBtn && trendCard) {
    expandChartBtn.addEventListener("click", () => {
        const isExpanded = trendCard.classList.toggle("expanded");
        expandChartBtn.setAttribute("aria-expanded", isExpanded);
        
        const icon = expandChartBtn.querySelector('i');
        if (icon) {
            icon.className = isExpanded ? "ph ph-arrows-in" : "ph ph-arrows-out";
        }
        
        expandChartBtn.setAttribute("aria-label", isExpanded ? "Minimizar gráfico" : "Ampliar gráfico");
        showToast(isExpanded ? "Gráfico ampliado. Ahora puedes explorar los puntos de datos." : "Gráfico minimizado");
    });
}

if (interactivePoints.length > 0 && chartTooltip && chartWrap) {
    interactivePoints.forEach(point => {
        const showTooltip = () => {
            // Solo posicionamos el tooltip si el contenedor existe
            const rect = chartWrap.getBoundingClientRect();
            const pointRect = point.getBoundingClientRect();
            
            // Calculamos posición X/Y respecto a chartWrap
            const x = pointRect.left - rect.left + (pointRect.width / 2);
            // El Y se levanta un poco para no tapar el punto
            const y = pointRect.top - rect.top - 15;

            chartTooltip.textContent = `${point.dataset.date}: ${point.dataset.value}`;
            chartTooltip.style.left = `${x}px`;
            chartTooltip.style.top = `${y}px`;
            chartTooltip.classList.add("visible");
            chartTooltip.setAttribute("aria-hidden", "false");
            
            // Avisar siempre al VoiceOver/TalkBack por un canal vivo
            showToast(`${point.dataset.date}, valor de desempleo: ${point.dataset.value}`, 2000);
        };

        const hideTooltip = () => {
            chartTooltip.classList.remove("visible");
            chartTooltip.setAttribute("aria-hidden", "true");
        };

        point.addEventListener("mouseenter", showTooltip);
        point.addEventListener("focus", showTooltip);
        point.addEventListener("mouseleave", hideTooltip);
        point.addEventListener("blur", hideTooltip);
    });
}

bellButton.addEventListener("click", () => {
    if (notifPanel.hidden) {
        openNotifPanel();
    } else {
        closeNotifPanel();
    }
});

notifClose.addEventListener("click", closeNotifPanel);
notifBackdrop.addEventListener("click", closeNotifPanel);

notifPanel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNotifPanel();
});

if (commentsClose && commentsBackdrop && commentsPanel) {
    commentsClose.addEventListener("click", closeCommentsPanel);
    commentsBackdrop.addEventListener("click", closeCommentsPanel);
    
    commentsPanel.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCommentsPanel();
    });
}

if (commentsTriggers.length > 0) {
    commentsTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            openCommentsPanel();
            showToast("Panel de comentarios abierto");
        });
    });
}

if (commentSubmitBtn && newCommentInput) {
    commentSubmitBtn.addEventListener("click", () => {
        const text = newCommentInput.value.trim();
        if (text) {
            const commentsList = document.getElementById("comments-list");
            const newComment = document.createElement("li");
            newComment.className = "comment-item";
            newComment.setAttribute("role", "listitem");
            newComment.innerHTML = `
                <div class="comment-avatar" aria-hidden="true">👤</div>
                <div class="comment-body">
                    <p class="comment-author">Tú</p>
                    <p class="comment-text">${text}</p>
                    <p class="comment-time">Ahora</p>
                </div>
            `;
            commentsList.appendChild(newComment);
            newCommentInput.value = "";
            showToast("Comentario publicado");
            newCommentInput.focus();
        }
    });
    
    newCommentInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            commentSubmitBtn.click();
        }
    });
}

// Nueva función de interactividad: Permitir borrar notificaciones individuales
const unreadNotifs = document.querySelectorAll('.notif-item');
unreadNotifs.forEach(item => {
    // Añadimos un pequeño botón de cierre a cada notificación dinámicamente
    const dismissBtn = document.createElement('button');
    dismissBtn.innerHTML = '<i class="ph ph-x"></i>';
    dismissBtn.className = 'icon-button';
    dismissBtn.setAttribute('aria-label', 'Descartar notificación');
    dismissBtn.style.padding = '4px';
    dismissBtn.style.width = '24px';
    dismissBtn.style.height = '24px';
    dismissBtn.style.marginLeft = 'auto';
    
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.appendChild(dismissBtn);

    dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        item.style.transition = 'opacity 0.2s';
        item.style.opacity = '0';
        setTimeout(() => item.remove(), 200);
        showToast("Notificación descartada");
        
        // Si no quedan notificaciones, poder mostrar un estado vacío
        setTimeout(() => {
            if (document.querySelectorAll('.notif-item').length === 0) {
                const list = document.querySelector('.notif-list');
                list.innerHTML = '<li style="padding:16px;text-align:center;color:var(--text-muted)">No hay notificaciones</li>';
            }
        }, 210);
    });
});

if (factsMoreButton && factsRow) {
    factsMoreButton.addEventListener("click", () => {
        factsRow.scrollBy({ left: 180, behavior: "smooth" });
        showToast("Mostrando más datos rápidos");
    });
}

shareButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showToast("Historia compartida en el portapapeles");
    });
});

playButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const estado = updateAriaPressed(btn);
        if (estado) {
            showToast("Reproduciendo historia...");
        } else {
            showToast("Historia en pausa");
        }
    });
});

if (mediaAltButtons.length > 0 && mediaAltPanel && mediaAltClose && mediaAltBackdrop) {
    mediaAltButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            openMediaAltPanel();
        });
    });
    
    mediaAltClose.addEventListener("click", closeMediaAltPanel);
    mediaAltBackdrop.addEventListener("click", closeMediaAltPanel);

    mediaAltPanel.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMediaAltPanel();
    });
}

sideActions.forEach((button) => {
    button.addEventListener("click", () => {
        const label = button.getAttribute("aria-label") || "Acción";
        
        // Si es botón de comentarios (tiene data-story), abrir panel
        if(button.hasAttribute("data-story")){
            openCommentsPanel();
            showToast("Panel de comentarios abierto");
        }
        // Si es toggle (tiene aria-pressed), cambiar estado
        else if(button.hasAttribute("aria-pressed")){
             const isActive = updateAriaPressed(button);
             if (label.includes("Me gusta")) {
                showToast(isActive ? "Añadido a me gusta" : "Eliminado de me gusta");
             } else if (label.includes("Guardar")) {
                showToast(isActive ? "Historia guardada en tu perfil" : "Historia eliminada de guardados");
             }
        } else {
             showToast(`${label} registrado`);
        }
    });
});

// Validar que el panel y los componentes existen dentro de los listeners, quitando ifs conflictivos
if (quizButton) {
    quizButton.addEventListener("click", () => {
        window.location.href = "../challenges/index.html";
    });
}

