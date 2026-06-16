const state = {
    xpCurrent: 750,
    xpTotal: 1000,
    answer: null,
    locale: "es",
    bonusClaimed: false,
    quizIndex: 0,
    answeredByLocale: {},
    pendingAnswerIndex: null,
    maxXpShown: false,
    level: 12,
};

const i18n = {
    es: {
        "header.subtitle": "Retos",
        "header.title": "Nivel 12",
        "header.status": "Defensor Pro",
        "hero.badge": "Reto semanal",
        "hero.title": "Green CEO",
        "hero.description": "Equilibra beneficio y planeta en este simulador inmersivo.",
        "hero.cta": "Jugar ahora",
        "progress.label": "Tu progreso",
        "progress.bonus": "+250 XP para Oro",
        "progress.bonusClaimed": "XP añadida",
        "trivia.eyebrow": "Hora de trivia",
        "trivia.title": "Leyes laborales",
        "trivia.viewAll": "Ver todo",
        "trivia.question": "¿Cuál es el máximo legal de horas semanales sin horas extra?",
        "trivia.swipe": "Desliza para la siguiente pregunta",
        "trivia.counter": "Pregunta {current}/{total}",
        "trivia.confirm": "Confirmar respuesta",
        "trivia.selected": "Respuesta seleccionada. Confirma para enviarla.",
        "trivia.noSelection": "Selecciona una respuesta antes de confirmar.",
        "trivia.correct": "Correcto. +{xp} XP",
        "trivia.incorrect": "Respuesta incorrecta. Prueba otra.",
        "trivia.reveal": "La respuesta correcta es: {answer}.",
        "trivia.locked": "Ya respondiste esta pregunta.",
        "trivia.lockedCorrect": "Ya la acertaste. Puedes pasar a la siguiente.",
        "trivia.lockedIncorrect": "Ya respondida. Revisa la correcta y continúa.",
        "quickwins.title": "Logros rápidos",
        "quickwins.item1.title": "Corre la voz",
        "quickwins.item1.subtitle": "Comparte tu puntuación de impacto",
        "quickwins.item2.title": "Check-in diario",
        "quickwins.item2.subtitle": "Completado hoy",
        "quickwins.claimed": "Reclamado",
        "nav.home": "Inicio",
        "nav.action": "Acción",
        "nav.challenges": "Retos",
        "nav.profile": "Perfil",
        "toast.correct": "Correcto. +50 XP",
        "toast.incorrect": "Respuesta incorrecta. Prueba otra.",
        "toast.xp": "XP añadida",
        "weekly.completed": "Reto semanal completado. +100 XP",
    },
    en: {
        "header.subtitle": "Challenges",
        "header.title": "Level 12",
        "header.status": "Pro Advocate",
        "hero.badge": "Weekly Challenge",
        "hero.title": "Green CEO",
        "hero.description": "Balance profit & planet in this immersive decision simulator.",
        "hero.cta": "Play Now",
        "progress.label": "Your progress",
        "progress.bonus": "+250 XP to Gold",
        "progress.bonusClaimed": "XP added",
        "trivia.eyebrow": "Trivia Time",
        "trivia.title": "Labor Laws",
        "trivia.viewAll": "View All",
        "trivia.question": "What is the maximum legal working hours per week without overtime?",
        "trivia.swipe": "Swipe for next question",
        "trivia.counter": "Question {current}/{total}",
        "trivia.confirm": "Confirm answer",
        "trivia.selected": "Answer selected. Confirm to submit it.",
        "trivia.noSelection": "Select an answer before confirming.",
        "trivia.correct": "Correct. +{xp} XP",
        "trivia.incorrect": "Incorrect answer. Try another.",
        "trivia.reveal": "The correct answer is: {answer}.",
        "trivia.locked": "You already answered this question.",
        "trivia.lockedCorrect": "Already correct. Move to the next one.",
        "trivia.lockedIncorrect": "Already answered. Review and continue.",
        "quickwins.title": "Quick Wins",
        "quickwins.item1.title": "Spread the word",
        "quickwins.item1.subtitle": "Share your impact score",
        "quickwins.item2.title": "Daily sign-in",
        "quickwins.item2.subtitle": "Completed today",
        "quickwins.claimed": "Claimed",
        "nav.home": "Home",
        "nav.action": "Action",
        "nav.challenges": "Challenges",
        "nav.profile": "Profile",
        "toast.correct": "Correct. +50 XP",
        "toast.incorrect": "Incorrect answer. Try another.",
        "toast.xp": "XP added",
        "weekly.completed": "Weekly challenge completed. +100 XP",
    },
};

const quizData = {
    es: [
        {
            question: "¿Cuál es el máximo legal de horas semanales sin horas extra?",
            options: ["35", "40", "48"],
            suffix: "Horas",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "¿Qué norma regula los derechos laborales en España?",
            options: ["Estatuto de los Trabajadores", "Código Penal", "Constitución"],
            suffix: "",
            correctIndex: 0,
            xp: 50,
        },
        {
            question: "¿Qué significa un contrato indefinido?",
            options: ["Sin fecha de fin", "Solo 3 meses", "Trabajo temporal"],
            suffix: "",
            correctIndex: 0,
            xp: 50,
        },
        {
            question: "¿Cuántas horas de descanso mínimo hay entre jornadas?",
            options: ["8", "12", "16"],
            suffix: "Horas",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "¿Cuántos días de vacaciones pagadas tiene derecho mínimo un trabajador?",
            options: ["20", "30", "15"],
            suffix: "Días",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "¿Qué protege la negociación colectiva?",
            options: ["Precio del café", "Derechos y condiciones laborales", "Horas de reunión"],
            suffix: "",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "¿Cuál es la edad mínima legal para trabajar en España?",
            options: ["14", "16", "18"],
            suffix: "Años",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "¿Un empleador puede despedir sin causa justificada?",
            options: ["Sí, siempre", "No, necesita causa", "Solo los lunes"],
            suffix: "",
            correctIndex: 1,
            xp: 50,
        },
    ],
    en: [
        {
            question: "What is the maximum legal working hours per week without overtime?",
            options: ["35", "40", "48"],
            suffix: "Hours",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "Which statute sets core labor rights in Spain?",
            options: ["Workers Statute", "Criminal Code", "Constitution"],
            suffix: "",
            correctIndex: 0,
            xp: 50,
        },
        {
            question: "What does an open-ended contract mean?",
            options: ["No end date", "Only 3 months", "Temporary work"],
            suffix: "",
            correctIndex: 0,
            xp: 50,
        },
        {
            question: "Minimum rest time between workdays?",
            options: ["8", "12", "16"],
            suffix: "Hours",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "How many paid vacation days per year minimum?",
            options: ["20", "30", "15"],
            suffix: "Days",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "What does collective bargaining protect?",
            options: ["Coffee prices", "Labor rights and conditions", "Meeting hours"],
            suffix: "",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "Minimum legal working age in Spain?",
            options: ["14", "16", "18"],
            suffix: "Years",
            correctIndex: 1,
            xp: 50,
        },
        {
            question: "Can an employer fire without justified cause?",
            options: ["Yes, always", "No, cause required", "Only on Mondays"],
            suffix: "",
            correctIndex: 1,
            xp: 50,
        },
    ],
};

const xpCurrentEl = document.getElementById("xp-current");
const xpTotalEl = document.getElementById("xp-total");
const progressFill = document.getElementById("progress-fill");
const progressTrack = document.querySelector(".progress-track");
const answers = document.querySelectorAll(".answer");
const hint = document.getElementById("answer-hint");
const toast = document.getElementById("toast");
const playButton = document.getElementById("play-now");
const bonusButton = document.getElementById("bonus-xp");
const xpButtons = document.querySelectorAll(".quickwin-xp[data-xp]");
const questionTitle = document.getElementById("question-title");
const quizCounter = document.getElementById("quiz-counter");
const nextQuestionButton = document.getElementById("next-question");
const prevQuestionButton = document.getElementById("prev-question");
const confirmAnswerButton = document.getElementById("confirm-answer-btn");
const quizCard = document.querySelector(".quiz");
const weeklyModal = document.getElementById("weekly-modal");
const modalCloseButtons = document.querySelectorAll("[data-close='true']");
const meterPlanet = document.getElementById("meter-planet");
const meterPeople = document.getElementById("meter-people");
const meterProfit = document.getElementById("meter-profit");
const meterPlanetValue = document.getElementById("meter-planet-value");
const meterPeopleValue = document.getElementById("meter-people-value");
const meterProfitValue = document.getElementById("meter-profit-value");
const simStep = document.getElementById("sim-step");
const simCounter = document.getElementById("sim-counter");
const simQuestion = document.getElementById("sim-question");
const simActions = document.getElementById("sim-actions");
const simResult = document.getElementById("sim-result");
const simSummary = document.getElementById("sim-summary");
const simClaim = document.getElementById("sim-claim");
const simReset = document.getElementById("sim-reset");

// Nuevos elementos
const bellButton = document.getElementById("notif-bell");
const notifPanel = document.getElementById("notif-panel");
const notifClose = document.getElementById("notif-close");
const notifBackdrop = document.getElementById("notif-backdrop");
const lawsModal = document.getElementById("laws-modal");
const lawsClose = document.getElementById("laws-close");
const lawsBackdrop = document.getElementById("laws-backdrop");
const viewAllButton = document.querySelector('.link[data-i18n="trivia.viewAll"]');
const levelupOverlay = document.getElementById("levelup-overlay");

function setLocale(locale) {
    state.locale = i18n[locale] ? locale : "es";
    document.documentElement.lang = state.locale;
    const dictionary = i18n[state.locale];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dictionary[key]) {
            el.textContent = dictionary[key];
        }
    });

    renderQuestion();
}

function updateProgress() {
    xpCurrentEl.textContent = state.xpCurrent;
    xpTotalEl.textContent = state.xpTotal;
    const percentage = Math.min((state.xpCurrent / state.xpTotal) * 100, 100);
    progressFill.style.width = `${percentage}%`;
    progressTrack.setAttribute("aria-valuenow", `${state.xpCurrent}`);

    if (state.xpCurrent >= state.xpTotal && !state.maxXpShown) {
        state.maxXpShown = true;
        showLevelUp();
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function formatSigned(value) {
    const signed = value > 0 ? `+${value}` : `${value}`;
    return signed;
}

function getImpactMessage(impact) {
    if (state.locale === "en") {
        return `Impact: Planet ${formatSigned(impact.planet)}, People ${formatSigned(impact.people)}, Profit ${formatSigned(impact.profit)}`;
    }
    return `Impacto: Planeta ${formatSigned(impact.planet)}, Personas ${formatSigned(impact.people)}, Beneficio ${formatSigned(impact.profit)}`;
}

const weeklySteps = [
    {
        question: "Cambias a proveedores con menor huella ambiental.",
        options: [
            {
                label: "Mantener el cambio",
                impact: { planet: 20, people: 10, profit: -15 },
            },
            {
                label: "Volver al proveedor anterior",
                impact: { planet: -18, people: -12, profit: 16 },
            },
        ],
    },
    {
        question: "Subes salarios por encima del minimo legal.",
        options: [
            {
                label: "Aplicar subida gradual",
                impact: { planet: 0, people: 18, profit: -12 },
            },
            {
                label: "Mantener salarios actuales",
                impact: { planet: 0, people: -16, profit: 12 },
            },
        ],
    },
    {
        question: "Inviertes en tecnologia eficiente y formacion interna.",
        options: [
            {
                label: "Invertir ahora",
                impact: { planet: 16, people: 10, profit: -10 },
            },
            {
                label: "Aplazar la inversion",
                impact: { planet: -12, people: -8, profit: 12 },
            },
        ],
    },
    {
        question: "Implementas una jornada mas flexible para conciliacion.",
        options: [
            {
                label: "Aplicar horario flexible",
                impact: { planet: 6, people: 16, profit: -8 },
            },
            {
                label: "Mantener horario rigido",
                impact: { planet: -4, people: -14, profit: 10 },
            },
        ],
    },
    {
        question: "Refuerzas auditorias de proveedores externos.",
        options: [
            {
                label: "Auditar de forma trimestral",
                impact: { planet: 14, people: 14, profit: -10 },
            },
            {
                label: "Auditar solo en incidentes",
                impact: { planet: -12, people: -12, profit: 10 },
            },
        ],
    },
];

const weeklyState = {
    stepIndex: 0,
    planet: 50,
    people: 50,
    profit: 50,
    completed: false,
};

function clamp(value) {
    return Math.max(0, Math.min(100, value));
}

function updateMeters() {
    meterPlanet.style.width = `${weeklyState.planet}%`;
    meterPeople.style.width = `${weeklyState.people}%`;
    meterProfit.style.width = `${weeklyState.profit}%`;
    meterPlanetValue.textContent = `${weeklyState.planet}%`;
    meterPeopleValue.textContent = `${weeklyState.people}%`;
    meterProfitValue.textContent = `${weeklyState.profit}%`;
}

function setWeeklyCompletion() {
    weeklyState.completed = true;
    const now = new Date().toISOString();
    localStorage.setItem("weeklyChallengeCompletedAt", now);
}

function resetWeeklyCompletion() {
    weeklyState.completed = false;
    localStorage.removeItem("weeklyChallengeCompletedAt");
    updateWeeklyCtaState();
}

function isWeeklyLocked() {
    const stored = localStorage.getItem("weeklyChallengeCompletedAt");
    if (!stored) {
        return false;
    }
    const last = new Date(stored).getTime();
    const diffDays = (Date.now() - last) / (1000 * 60 * 60 * 24);
    return diffDays < 7;
}

function renderWeeklyStep() {
    updateMeters();
    if (weeklyState.completed || isWeeklyLocked()) {
        simStep.hidden = true;
        simResult.hidden = false;
        simSummary.textContent = "Has completado el reto semanal. Vuelve la proxima semana para un nuevo desafio.";
        simClaim.hidden = true;
        updateWeeklyCtaState();
        return;
    }

    const current = weeklySteps[weeklyState.stepIndex];
    if (!current) {
        simStep.hidden = true;
        simResult.hidden = false;
        simSummary.textContent = "Has completado el reto semanal. Vuelve la proxima semana para un nuevo desafio.";
        simClaim.hidden = true;
        updateWeeklyCtaState();
        return;
    }

    simCounter.textContent = `Decision ${weeklyState.stepIndex + 1} de ${weeklySteps.length}`;
    simQuestion.textContent = current.question;
    simActions.innerHTML = "";
    current.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "step-choice";
        button.textContent = option.label;
        button.addEventListener("click", () => {
            // Deshabilitar todos los botones inmediatamente para evitar doble click
            simActions.querySelectorAll(".step-choice").forEach(b => {
                b.disabled = true;
            });
            button.classList.add("selected");

            weeklyState.planet = clamp(weeklyState.planet + option.impact.planet);
            weeklyState.people = clamp(weeklyState.people + option.impact.people);
            weeklyState.profit = clamp(weeklyState.profit + option.impact.profit);
            showToast(getImpactMessage(option.impact));
            weeklyState.stepIndex += 1;

            if (weeklyState.stepIndex >= weeklySteps.length) {
                simStep.hidden = true;
                simResult.hidden = false;
                simClaim.hidden = false;
                simSummary.textContent = "Has equilibrado los tres pilares con decisiones responsables.";
            } else {
                renderWeeklyStep();
            }
        });
        simActions.appendChild(button);
    });
}

function updateWeeklyCtaState() {
    const locked = isWeeklyLocked();
    if (locked) {
        playButton.querySelector("span:last-child").textContent = "Reto completado";
    } else {
        playButton.querySelector("span:last-child").textContent = i18n[state.locale]["hero.cta"];
    }
}

function openWeeklyModal() {
    weeklyModal.hidden = false;
    weeklyState.stepIndex = 0;
    weeklyState.planet = 50;
    weeklyState.people = 50;
    weeklyState.profit = 50;
    simStep.hidden = false;
    simResult.hidden = true;
    simClaim.hidden = true;
    if (isWeeklyLocked()) {
        simStep.hidden = true;
        simResult.hidden = false;
        simSummary.textContent = "Has completado el reto semanal. Puedes reiniciarlo para seguir testeando.";
        simClaim.hidden = true;
        updateWeeklyCtaState();
        return;
    }
    renderWeeklyStep();
}

function closeWeeklyModal() {
    weeklyModal.hidden = true;
}

function getCurrentQuizSet() {
    return quizData[state.locale] || quizData.es;
}

function getAnsweredMap() {
    if (!state.answeredByLocale[state.locale]) {
        state.answeredByLocale[state.locale] = {};
    }
    return state.answeredByLocale[state.locale];
}

function renderQuestion() {
    const quizSet = getCurrentQuizSet();
    const question = quizSet[state.quizIndex];
    if (!question) {
        return;
    }

    const answeredMap = getAnsweredMap();
    const answerState = answeredMap[state.quizIndex];
    const isLocked = Boolean(answerState);

    questionTitle.textContent = question.question;
    const counterTemplate = i18n[state.locale]["trivia.counter"];
    quizCounter.textContent = counterTemplate.replace("{current}", state.quizIndex + 1).replace("{total}", quizSet.length);

    answers.forEach((answerEl, index) => {
        const optionText = question.options[index] || "";
        const suffixText = question.suffix || "";
        const spans = answerEl.querySelectorAll("span");
        if (spans[0]) {
            spans[0].textContent = optionText;
        }
        if (spans[1]) {
            spans[1].textContent = suffixText;
            spans[1].style.visibility = suffixText ? "visible" : "hidden";
        }
        answerEl.setAttribute("aria-checked", "false");
        answerEl.dataset.answer = `${index}`;
        answerEl.disabled = isLocked;
        answerEl.classList.remove("is-correct", "is-incorrect", "is-revealed");
    });

    state.pendingAnswerIndex = null;
    if (confirmAnswerButton) {
        confirmAnswerButton.textContent = i18n[state.locale]["trivia.confirm"];
        confirmAnswerButton.disabled = true;
        confirmAnswerButton.setAttribute("aria-disabled", "true");
    }

    if (!isLocked) {
        hint.classList.remove("hint-success", "hint-error");
        hint.textContent = "";
        return;
    }

    const selectedIndex = answerState.selectedIndex;
    const correctIndex = question.correctIndex;

    answers.forEach((answerEl, index) => {
        if (index === selectedIndex) {
            answerEl.setAttribute("aria-checked", "true");
            answerEl.classList.add(answerState.correct ? "is-correct" : "is-incorrect");
        }
        if (index === correctIndex && !answerState.correct) {
            answerEl.classList.add("is-revealed");
        }
    });

    hint.classList.remove("hint-success", "hint-error");
    if (answerState.correct) {
        hint.classList.add("hint-success");
        hint.textContent = i18n[state.locale]["trivia.lockedCorrect"];
    } else {
        hint.classList.add("hint-error");
        hint.textContent = i18n[state.locale]["trivia.lockedIncorrect"];
    }
}

function changeQuestion(direction) {
    const quizSet = getCurrentQuizSet();
    const total = quizSet.length;
    const nextIndex = (state.quizIndex + direction + total) % total;
    state.quizIndex = nextIndex;
    renderQuestion();
}

function handleAnswerClick(event) {
    const button = event.currentTarget;
    const value = Number.parseInt(button.dataset.answer, 10);
    const answeredMap = getAnsweredMap();

    if (answeredMap[state.quizIndex]) {
        hint.textContent = i18n[state.locale]["trivia.locked"];
        showToast(i18n[state.locale]["trivia.locked"]);
        return;
    }

    answers.forEach((item) => {
        item.setAttribute("aria-checked", "false");
    });

    button.setAttribute("aria-checked", "true");
    state.pendingAnswerIndex = value;
    state.answer = value;

    if (confirmAnswerButton) {
        confirmAnswerButton.disabled = false;
        confirmAnswerButton.setAttribute("aria-disabled", "false");
        confirmAnswerButton.focus();
    }

    hint.classList.remove("hint-success", "hint-error");
    hint.textContent = i18n[state.locale]["trivia.selected"];
    showToast(i18n[state.locale]["trivia.selected"]);
}

function confirmSelectedAnswer() {
    const value = state.pendingAnswerIndex;
    const quizSet = getCurrentQuizSet();
    const question = quizSet[state.quizIndex];
    const answeredMap = getAnsweredMap();

    if (answeredMap[state.quizIndex]) {
        hint.textContent = i18n[state.locale]["trivia.locked"];
        showToast(i18n[state.locale]["trivia.locked"]);
        return;
    }

    if (value === null || Number.isNaN(value)) {
        hint.classList.remove("hint-success");
        hint.classList.add("hint-error");
        hint.textContent = i18n[state.locale]["trivia.noSelection"];
        showToast(i18n[state.locale]["trivia.noSelection"]);
        return;
    }

    if (!question) {
        return;
    }

    if (confirmAnswerButton) {
        confirmAnswerButton.disabled = true;
        confirmAnswerButton.setAttribute("aria-disabled", "true");
    }

    if (value === question.correctIndex) {
        const xpGain = question.xp || 0;
        state.xpCurrent = Math.min(state.xpCurrent + xpGain, state.xpTotal);
        const correctMessage = i18n[state.locale]["trivia.correct"].replace("{xp}", `${xpGain}`);
        hint.classList.remove("hint-error");
        hint.classList.add("hint-success");
        hint.textContent = correctMessage;
        showToast(correctMessage);
        updateProgress();
        answeredMap[state.quizIndex] = { correct: true, selectedIndex: value };
        state.pendingAnswerIndex = null;
        renderQuestion();
        clearTimeout(confirmSelectedAnswer.advanceId);
        confirmSelectedAnswer.advanceId = setTimeout(() => {
            changeQuestion(1);
        }, 900);
    } else {
        const incorrectMessage = i18n[state.locale]["trivia.incorrect"];
        const revealMessage = i18n[state.locale]["trivia.reveal"].replace("{answer}", question.options[question.correctIndex]);
        hint.classList.remove("hint-success");
        hint.classList.add("hint-error");
        hint.textContent = `${incorrectMessage} ${revealMessage}`;
        showToast(revealMessage);
        answeredMap[state.quizIndex] = { correct: false, selectedIndex: value };
        state.pendingAnswerIndex = null;
        renderQuestion();
    }
}

answers.forEach((answer) => {
    answer.addEventListener("click", handleAnswerClick);
});

if (confirmAnswerButton) {
    confirmAnswerButton.addEventListener("click", confirmSelectedAnswer);
}

playButton.addEventListener("click", () => {
    openWeeklyModal();
});

modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        closeWeeklyModal();
    });
});

weeklyModal.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true") {
        closeWeeklyModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !weeklyModal.hidden) {
        closeWeeklyModal();
    }
});

simClaim.addEventListener("click", () => {
    if (weeklyState.completed || isWeeklyLocked()) {
        closeWeeklyModal();
        return;
    }
    weeklyState.completed = true;
    state.xpCurrent = Math.min(state.xpCurrent + 100, state.xpTotal);
    updateProgress();
    setWeeklyCompletion();
    simClaim.hidden = true;
    updateWeeklyCtaState();
    showToast(i18n[state.locale]["weekly.completed"]);
});

simReset.addEventListener("click", () => {
    resetWeeklyCompletion();
    openWeeklyModal();
});

nextQuestionButton.addEventListener("click", () => {
    changeQuestion(1);
});

prevQuestionButton.addEventListener("click", () => {
    changeQuestion(-1);
});

bonusButton.addEventListener("click", () => {
    if (state.bonusClaimed) {
        return;
    }

    state.bonusClaimed = true;
    state.xpCurrent = Math.min(state.xpCurrent + 250, state.xpTotal);
    bonusButton.setAttribute("aria-pressed", "true");
    bonusButton.querySelector("span").textContent = i18n[state.locale]["progress.bonusClaimed"];
    updateProgress();
    showToast(i18n[state.locale]["progress.bonusClaimed"]);
});

xpButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.getAttribute("aria-disabled") === "true") {
            return;
        }

        const xpValue = Number.parseInt(button.dataset.xp, 10) || 0;
        if (xpValue > 0) {
            state.xpCurrent = Math.min(state.xpCurrent + xpValue, state.xpTotal);
            updateProgress();
            showToast(i18n[state.locale]["toast.xp"]);
        }

        // Cambiar visualmente el item a "reclamado" igual que el check-in diario
        const item = button.closest(".quickwin-item");
        if (item) {
            item.classList.remove("featured");
            item.classList.add("subdued");
            const icon = item.querySelector(".quickwin-icon");
            if (icon) {
                icon.classList.add("muted");
                const iconSpan = icon.querySelector("span");
                if (iconSpan) iconSpan.textContent = "✓";
            }
        }
        const claimedSpan = document.createElement("span");
        claimedSpan.className = "quickwin-claimed";
        claimedSpan.textContent = i18n[state.locale]["quickwins.claimed"];
        button.replaceWith(claimedSpan);
    });
});

setLocale(state.locale);
updateProgress();
renderQuestion();
updateWeeklyCtaState();

window.setLocale = setLocale;

// ── XP máximo: subida de nivel y reseteo de barra ─
function showLevelUp() {
    state.level += 1;

    // Actualizar texto de nivel en el header
    const levelNumberEl = document.querySelector(".level-number");
    if (levelNumberEl) {
        levelNumberEl.textContent = `Nivel ${state.level}`;
    }

    // Actualizar overlay con el nuevo nivel
    const badgeTitle = levelupOverlay.querySelector("h3");
    const badgeDesc = levelupOverlay.querySelector("p");
    if (badgeTitle) badgeTitle.textContent = `¡Subiste al Nivel ${state.level}!`;
    if (badgeDesc) badgeDesc.textContent = `La barra se reinicia. ¡Sigue ganando XP!`;

    showToast(`🏆 ¡Nivel ${state.level} alcanzado!`);
    levelupOverlay.hidden = false;
    levelupOverlay.style.pointerEvents = "auto";

    setTimeout(() => {
        levelupOverlay.style.opacity = "0";
        levelupOverlay.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
            levelupOverlay.hidden = true;
            levelupOverlay.style.opacity = "";
            levelupOverlay.style.transition = "";
            levelupOverlay.style.pointerEvents = "none";

            // Resetear barra de XP
            state.xpCurrent = 0;
            state.maxXpShown = false;
            updateProgress();
        }, 500);
    }, 2800);
}

// ── Panel de notificaciones ────────────────────────
function openNotifPanel() {
    notifPanel.hidden = false;
    notifClose.focus();
}

function closeNotifPanel() {
    notifPanel.hidden = true;
    bellButton.focus();
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

// ── Notificaciones descartables (igual que main-page) ──────────
(function initDismissableNotifs() {
    const notifItems = document.querySelectorAll('.notif-item');
    notifItems.forEach(item => {
        const dismissBtn = document.createElement('button');
        dismissBtn.innerHTML = '<i class="ph ph-x" aria-hidden="true"></i>';
        dismissBtn.className = 'icon-button';
        dismissBtn.setAttribute('aria-label', 'Descartar notificación');
        dismissBtn.style.cssText = 'padding:4px;width:24px;height:24px;margin-left:auto;flex-shrink:0';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.appendChild(dismissBtn);
        dismissBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            item.style.transition = 'opacity 0.2s';
            item.style.opacity = '0';
            setTimeout(() => {
                item.remove();
                const remaining = document.querySelectorAll('.notif-item').length;
                if (remaining === 0) {
                    const list = document.querySelector('.notif-list');
                    if (list) list.innerHTML = '<li style="padding:16px;text-align:center;color:var(--muted)">No hay notificaciones</li>';
                }
            }, 200);
            showToast('Notificación descartada');
        });
    });
})();

// ── Modal de leyes laborales ───────────────────────
function openLawsModal() {
    lawsModal.hidden = false;
    lawsClose.focus();
}

function closeLawsModal() {
    lawsModal.hidden = true;
    if (viewAllButton) viewAllButton.focus();
}

if (viewAllButton) {
    viewAllButton.addEventListener("click", openLawsModal);
}

lawsClose.addEventListener("click", closeLawsModal);
lawsBackdrop.addEventListener("click", closeLawsModal);

lawsModal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLawsModal();
});
