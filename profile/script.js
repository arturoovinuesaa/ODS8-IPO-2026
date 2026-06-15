document.addEventListener("DOMContentLoaded", () => {
    // ── Toast ──────────────────────────────────────────────────
    const toast = document.getElementById("toast");
    function showToast(message, duration = 2500) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        toast.setAttribute('aria-live', 'polite');
        setTimeout(() => toast.classList.remove("show"), duration);
    }

    // ── Notificaciones ────────────────────────────────────────
    const bellButton = document.getElementById("notif-bell");
    const notifPanel = document.getElementById("notif-panel");
    const notifClose = document.getElementById("notif-close");
    const notifBackdrop = document.getElementById("notif-backdrop");

    if (bellButton && notifPanel && notifClose && notifBackdrop) {
        bellButton.addEventListener("click", () => {
            if (notifPanel.hidden) {
                notifPanel.hidden = false;
                notifClose.focus();
            } else {
                notifPanel.hidden = true;
                bellButton.focus();
            }
        });
        notifClose.addEventListener("click", () => {
            notifPanel.hidden = true;
            bellButton.focus();
        });
        notifBackdrop.addEventListener("click", () => {
            notifPanel.hidden = true;
            bellButton.focus();
        });
        notifPanel.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                notifPanel.hidden = true;
                bellButton.focus();
            }
        });

        // Notificaciones descartables (igual que main-page)
        document.querySelectorAll('.notif-item').forEach(item => {
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
    }

    // Helper function for haptic feedback
    const triggerHaptic = (pattern = 50) => {
        const isHaptic = localStorage.getItem("haptic") === "true";
        if (isHaptic && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    const themeDesc = document.getElementById("theme-mode-desc");

    const updateThemeDescription = (isDark) => {
        if (!themeDesc) return;
        themeDesc.textContent = isDark ? "Tema oscuro activado" : "Tema claro activado";
    };

    // Apply saved settings on load
    const applySettings = () => {
        const hcEnabled = localStorage.getItem("high-contrast") === "true";
        document.body.classList.toggle("high-contrast", hcEnabled);
        const hcToggle = document.getElementById("high-contrast");
        if (hcToggle) hcToggle.checked = hcEnabled;
        updateThemeDescription(hcEnabled);

        const largeTextEnabled = localStorage.getItem("large-text") === "true";
        document.body.classList.toggle("large-text", largeTextEnabled);
        const ltToggle = document.getElementById("large-text");
        if (ltToggle) ltToggle.checked = largeTextEnabled;

        const subtitlesEnabled = localStorage.getItem("subtitles") === "true";
        document.body.classList.toggle("subtitles-on", subtitlesEnabled);
        const subToggle = document.getElementById("subtitles");
        if (subToggle) subToggle.checked = subtitlesEnabled;

        const hapticToggle = document.getElementById("haptic");
        if (hapticToggle && localStorage.getItem("haptic") === "true") {
            hapticToggle.checked = true;
        }
    };

    // Initialize logic
    applySettings();

    // 1. Dark/Light Mode
    const highContrastToggle = document.getElementById("high-contrast");
    if (highContrastToggle) {
        highContrastToggle.addEventListener("change", (e) => {
            triggerHaptic();
            const enabled = e.target.checked;
            document.body.classList.toggle("high-contrast", enabled);
            localStorage.setItem("high-contrast", enabled ? "true" : "false");
            updateThemeDescription(enabled);
        });
    }

    // 2. Increase Text Size
    const largeTextToggle = document.getElementById("large-text");
    if (largeTextToggle) {
        largeTextToggle.addEventListener("change", (e) => {
            triggerHaptic();
            if (e.target.checked) {
                document.body.classList.add("large-text");
                localStorage.setItem("large-text", "true");
            } else {
                document.body.classList.remove("large-text");
                localStorage.setItem("large-text", "false");
            }
        });
    }

    // 3. Subtitles
    const subtitlesToggle = document.getElementById("subtitles");
    if (subtitlesToggle) {
        subtitlesToggle.addEventListener("change", (e) => {
            triggerHaptic();
            if (e.target.checked) {
                document.body.classList.add("subtitles-on");
                localStorage.setItem("subtitles", "true");
            } else {
                document.body.classList.remove("subtitles-on");
                localStorage.setItem("subtitles", "false");
            }
        });
    }

    // 4. Haptic Feedback
    const hapticToggle = document.getElementById("haptic");
    if (hapticToggle) {
        hapticToggle.addEventListener("change", (e) => {
            localStorage.setItem("haptic", e.target.checked ? "true" : "false");
            if (e.target.checked && navigator.vibrate) {
                navigator.vibrate([50, 50, 50]); // Success vibration pattern
            }
        });
    }

    // Modal Logic
    const achievementsModal = document.getElementById("achievements-modal");
    const viewAllBtn = document.getElementById("view-all-btn");

    const accountModal = document.getElementById("account-modal");
    const accountDetailsBtn = document.getElementById("account-details-btn");

    const closeButtons = document.querySelectorAll("[data-close]");

    const openModal = (modal) => {
        if (modal) {
            triggerHaptic();
            modal.removeAttribute("hidden");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            triggerHaptic([30]);
            modal.setAttribute("hidden", "");
            document.body.style.overflow = "";
        }
    };

    // Open Achievements
    if (viewAllBtn) {
        viewAllBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(achievementsModal);
        });
    }

    // Open Account Details
    if (accountDetailsBtn) {
        accountDetailsBtn.addEventListener("click", () => {
            openModal(accountModal);
        });
    }

    // Close Modals
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-close");
            const targetModal = document.getElementById(`${targetId}-modal`);
            closeModal(targetModal);
        });
    });

    // Save Account Settings with validation
    const saveAccountBtn = document.getElementById("save-account-btn");
    const accountNameInput = document.getElementById("account-name");
    const accountEmailInput = document.getElementById("account-email");
    const accountNameError = document.getElementById("account-name-error");
    const accountEmailError = document.getElementById("account-email-error");

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    };

    const setFieldError = (input, errorElement, message) => {
        if (!input || !errorElement) return;

        input.classList.add("input-error");
        input.setAttribute("aria-invalid", "true");
        errorElement.textContent = message;
    };

    const clearFieldError = (input, errorElement) => {
        if (!input || !errorElement) return;

        input.classList.remove("input-error");
        input.setAttribute("aria-invalid", "false");
        errorElement.textContent = "";
    };

    const validateAccountForm = () => {
        let isValid = true;

        const nameValue = accountNameInput ? accountNameInput.value.trim() : "";
        const emailValue = accountEmailInput ? accountEmailInput.value.trim() : "";

        clearFieldError(accountNameInput, accountNameError);
        clearFieldError(accountEmailInput, accountEmailError);

        if (!nameValue) {
            setFieldError(
                accountNameInput,
                accountNameError,
                "El nombre completo no puede quedarse vacío."
            );
            isValid = false;
        }

        if (!isValidEmail(emailValue)) {
            setFieldError(
                accountEmailInput,
                accountEmailError,
                "El correo electrónico debe tener un formato válido, por ejemplo nombre@dominio.com."
            );
            isValid = false;
        }

        return isValid;
    };

    if (accountNameInput) {
        accountNameInput.addEventListener("input", () => {
            if (accountNameInput.value.trim()) {
                clearFieldError(accountNameInput, accountNameError);
            }
        });
    }

    if (saveAccountBtn) {
        saveAccountBtn.addEventListener("click", () => {
            const isValid = validateAccountForm();

            if (!isValid) {
                triggerHaptic([80, 40, 80]);
                showToast("Revisa los campos marcados antes de guardar.");

                if (accountNameInput && !accountNameInput.value.trim()) {
                    accountNameInput.focus();
                }

                return;
            }

            triggerHaptic([30, 50, 30]);

            saveAccountBtn.textContent = "Guardado";
            saveAccountBtn.disabled = true;

            showToast("Datos actualizados correctamente.");

            setTimeout(() => {
                saveAccountBtn.textContent = "Guardar cambios";
                saveAccountBtn.disabled = false;
                closeModal(accountModal);
            }, 1200);
        });
    }

    // Other Buttons
    const editBtn = document.querySelector(".edit-btn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            triggerHaptic();
            openModal(accountModal);
        });
    }

    const signOutBtn = document.getElementById("sign-out-btn");
    if (signOutBtn) {
        signOutBtn.addEventListener("click", () => {
            triggerHaptic([30, 50, 30]);
            const confirmed = window.confirm("¿Seguro que quieres cerrar sesión?");
            if (!confirmed) return;
            signOutBtn.disabled = true;
            signOutBtn.querySelector("span").textContent = "Cerrando sesión...";
            setTimeout(() => {
                signOutBtn.disabled = false;
                signOutBtn.querySelector("span").textContent = "Cerrar sesión";
            }, 1200);
        });
    }

    // Color Picker Modal
    const customizeColorBtn = document.getElementById("customize-color-btn");
    const colorPickerModal = document.getElementById("color-picker-modal");
    const profileAvatar = document.getElementById("profile-avatar");

    if (customizeColorBtn && colorPickerModal) {
        customizeColorBtn.addEventListener("click", () => {
            triggerHaptic();
            openModal(colorPickerModal);
        });
    }

    // Color Selection
    const colorOptions = document.querySelectorAll(".color-option");
    if (colorOptions.length > 0 && profileAvatar) {
        // Load saved color and mark it as active
        const savedColor = localStorage.getItem("avatar-border-color") || "#f26522";
        profileAvatar.style.borderColor = savedColor;
        
        colorOptions.forEach(option => {
            const color = option.getAttribute("data-color");
            if (color === savedColor) {
                option.classList.add("active");
            }

            option.addEventListener("click", () => {
                // Remove active class from all options
                colorOptions.forEach(opt => opt.classList.remove("active"));
                
                // Add active class to clicked option
                option.classList.add("active");
                
                // Update avatar border color
                profileAvatar.style.borderColor = color;
                
                // Save to localStorage
                localStorage.setItem("avatar-border-color", color);
                
                // Haptic feedback and toast
                triggerHaptic([50, 30, 50]);
                showToast("Color del avatar actualizado");
                
                // Close modal after a short delay
                setTimeout(() => {
                    closeModal(colorPickerModal);
                }, 800);
            });
        });
    }
});
