document.addEventListener("DOMContentLoaded", () => {
    const SUBTITLES_BANNER_ID = "global-subtitles-banner";

    function isEnabled(key) {
        return localStorage.getItem(key) === "true";
    }

    function applyBodyClass(settingKey, className) {
        document.body.classList.toggle(className, isEnabled(settingKey));
    }

    function ensureSubtitlesBanner() {
        let banner = document.getElementById(SUBTITLES_BANNER_ID);
        if (banner) return banner;

        const existingBanner = document.querySelector(".subtitles-banner");
        if (existingBanner) {
            existingBanner.id = SUBTITLES_BANNER_ID;
            return existingBanner;
        }

        banner = document.createElement("div");
        banner.id = SUBTITLES_BANNER_ID;
        banner.setAttribute("aria-live", "polite");
        banner.textContent = "[Subtitulos activados]";
        banner.style.position = "fixed";
        banner.style.left = "50%";
        banner.style.bottom = "78px";
        banner.style.transform = "translateX(-50%)";
        banner.style.padding = "8px 12px";
        banner.style.borderRadius = "999px";
        banner.style.background = "rgba(15, 17, 24, 0.9)";
        banner.style.color = "#ffffff";
        banner.style.fontSize = "12px";
        banner.style.fontWeight = "600";
        banner.style.zIndex = "9999";
        banner.style.pointerEvents = "none";
        banner.style.display = "none";
        document.body.appendChild(banner);
        return banner;
    }

    function syncSubtitlesBanner() {
        const banner = ensureSubtitlesBanner();
        banner.style.display = isEnabled("subtitles") ? "block" : "none";
    }

    function applyGlobalSettings() {
        applyBodyClass("high-contrast", "high-contrast");
        applyBodyClass("large-text", "large-text");
        applyBodyClass("subtitles", "subtitles-on");
        syncSubtitlesBanner();
    }

    // Small helper available to every screen.
    window.a11yTriggerHaptic = (pattern = 40) => {
        if (!isEnabled("haptic")) return;
        if (!navigator.vibrate) return;
        navigator.vibrate(pattern);
    };

    function shouldSkipAutoHaptic(target) {
        if (!target) return true;
        if (window.location.pathname.includes("/profile/")) return true;
        return false;
    }

    document.addEventListener("click", (event) => {
        const interactive = event.target.closest("button, a, input, [role='button'], [role='radio']");
        if (shouldSkipAutoHaptic(interactive)) return;
        window.a11yTriggerHaptic(25);
    });

    window.addEventListener("storage", (event) => {
        if (!event.key) return;
        if (["high-contrast", "large-text", "subtitles", "haptic"].includes(event.key)) {
            applyGlobalSettings();
        }
    });

    // Re-sync accessibility settings when returning from browser cache
    // or when the tab becomes visible again.
    window.addEventListener("pageshow", applyGlobalSettings);
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            applyGlobalSettings();
        }
    });

    applyGlobalSettings();
});
