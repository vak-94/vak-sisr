/* ========================================
   RÉINITIALISATION
======================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 110px;
}

body {
    min-height: 100vh;
    background: #050a14;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    overflow-x: hidden;
}

a {
    color: inherit;
}

button,
a {
    -webkit-tap-highlight-color: transparent;
}

/* ========================================
   VARIABLES
======================================== */

:root {
    --background: #050a14;
    --panel: rgba(10, 20, 35, 0.72);
    --panel-light: rgba(255, 255, 255, 0.035);

    --cyan: #00c8ff;
    --cyan-light: #00f0ff;

    --text: #ffffff;
    --text-soft: #d8edf5;
    --text-muted: #9bb7c4;

    --border: rgba(0, 200, 255, 0.22);
    --border-hover: rgba(0, 200, 255, 0.45);

    --radius-large: 22px;
    --radius-medium: 16px;
}

/* ========================================
   CANVAS
======================================== */

#network {
    position: fixed;
    inset: 0;

    width: 100%;
    height: 100%;

    z-index: -1;
    pointer-events: none;
}

/* ========================================
   NAVIGATION
======================================== */

.navbar {
    position: fixed;
    top: 24px;
    left: 50%;

    width: min(1180px, 92%);
    min-height: 64px;
    padding: 0 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    transform: translateX(-50%);

    background: rgba(8, 17, 31, 0.78);
    border: 1px solid var(--border);
    border-radius: 999px;

    box-shadow: 0 12px 45px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);

    z-index: 1000;
}

.logo {
    flex-shrink: 0;

    color: var(--cyan);
    font-weight: 700;
    letter-spacing: 3px;
    text-decoration: none;
}

.nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
}

.nav-links a {
    position: relative;

    padding: 22px 0;

    color: var(--text-soft);
    font-size: 0.88rem;
    text-decoration: none;

    transition:
        color 0.25s ease,
        text-shadow 0.25s ease;
}

.nav-links a::after {
    content: "";

    position: absolute;
    right: 0;
    bottom: 14px;
    left: 0;

    height: 1px;

    background: var(--cyan-light);
    box-shadow: 0 0 12px var(--cyan-light);

    transform: scaleX(0);
    transform-origin: center;

    transition: transform 0.25s ease;
}

.nav-links a:hover,
.nav-links a.active {
    color: var(--cyan-light);
    text-shadow: 0 0 12px rgba(0, 229, 255, 0.55);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    transform: scaleX(1);
}

.session {
    flex-shrink: 0;

    color: var(--cyan);
    font-size: 0.72rem;
    letter-spacing: 2px;
}

/* ========================================
   ACCUEIL
======================================== */

.hero {
    position: relative;
    z-index: 1;

    min-height: 100vh;
    padding: 140px 20px 70px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
}

.hero-label {
    margin-bottom: 20px;

    color: var(--cyan);
    font-size: 0.72rem;
    letter-spacing: 4px;
}

.hero h1 {
    margin-bottom: 12px;

    font-size: clamp(3rem, 8vw, 5.4rem);
    line-height: 1;
    letter-spacing: -3px;

    text-shadow: 0 0 35px rgba(0, 200, 255, 0.15);
}

.hero h2 {
    margin-bottom: 16px;

    color: var(--cyan-light);
    font-size: clamp(1.25rem, 3vw, 1.8rem);
    font-weight: 400;
}

.hero p {
    max-width: 620px;

    color: var(--text-muted);
    font-size: 1.05rem;
    line-height: 1.7;
}

.main-button {
    margin-top: 34px;
    padding: 13px 24px;

    color: var(--cyan-light);
    font-size: 0.85rem;
    letter-spacing: 1px;
    text-decoration: none;

    background: rgba(0, 200, 255, 0.06);
    border: 1px solid rgba(0, 200, 255, 0.4);
    border-radius: 999px;

    box-shadow: 0 0 25px rgba(0, 200, 255, 0.08);

    transition:
        color 0.25s ease,
        background 0.25s ease,
        transform 0.25s ease,
        box-shadow 0.25s ease;
}

.main-button:hover {
    color: #021017;
    background: var(--cyan-light);

    box-shadow: 0 0 30px rgba(0, 240, 255, 0.35);

    transform: translateY(-3px);
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    color: var(--text-muted);
    font-size: 0.62rem;
    letter-spacing: 3px;
}

.scroll-line {
    width: 1px;
    height: 45px;

    background: linear-gradient(
        to bottom,
        var(--cyan),
        transparent
    );

    animation: scrollPulse 1.8s infinite ease-in-out;
}

@keyframes scrollPulse {
    0%,
    100% {
        opacity: 0.3;
        transform: scaleY(0.65);
        transform-origin: top;
    }

    50% {
        opacity: 1;
        transform: scaleY(1);
        transform-origin: top;
    }
}

/* ========================================
   SECTIONS
======================================== */

.page-section {
    position: relative;
    z-index: 1;

    min-height: 100vh;
    padding: 135px max(6%, 24px) 90px;
}

.section-header {
    width: min(1180px, 100%);
    margin: 0 auto 40px;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 25px;
}

.module-label {
    color: var(--cyan);
    font-size: 0.72rem;
    letter-spacing: 3px;
    text-transform: uppercase;
}

.section-header h2 {
    margin-top: 8px;

    font-size: clamp(2.3rem, 5vw, 3.5rem);
    line-height: 1;
}

.session-indicator {
    flex-shrink: 0;

    padding: 10px 18px;

    color: var(--cyan);
    font-size: 0.7rem;
    letter-spacing: 2px;

    background: rgba(0, 200, 255, 0.07);
    border: 1px solid rgba(0, 200, 255, 0.32);
    border-radius: 999px;
}

/* ========================================
   CARTES
======================================== */

.profile-card,
.mission-card,
.timeline-card,
.placeholder-card {
    width: min(1180px, 100%);
    margin-right: auto;
    margin-left: auto;

    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius-large);

    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.2),
        0 0 35px rgba(0, 200, 255, 0.06);

    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);

    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

.profile-card:hover,
.mission-card:hover,
.timeline-card:hover,
.placeholder-card:hover {
    border-color: var(--border-hover);

    box-shadow:
        0 20px 55px rgba(0, 0, 0, 0.25),
        0 0 40px rgba(0, 200, 255, 0.1);
}

/* ========================================
   PROFIL
======================================== */

.profile-card {
    margin-bottom: 25px;
    padding: 36px;

    display: grid;
    grid-template-columns: 270px minmax(0, 1fr);
    gap: 42px;
}

.profile-image {
    padding-right: 36px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;

    border-right: 1px solid rgba(0, 200, 255, 0.18);
}

.avatar-placeholder {
    width: 160px;
    height: 160px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--cyan-light);
    font-size: 3rem;
    font-weight: 700;

    background:
        linear-gradient(
            145deg,
            rgba(0, 200, 255, 0.12),
            rgba(0, 200, 255, 0.025)
        );

    border: 1px solid rgba(0, 200, 255, 0.55);
    border-radius: 28px;

    box-shadow:
        inset 0 0 35px rgba(0, 200, 255, 0.05),
        0 0 35px rgba(0, 200, 255, 0.2);
}

.profile-image > span {
    color: #9cc8d8;
    font-size: 0.68rem;
    letter-spacing: 2px;
}

.status {
    display: flex;
    align-items: center;
    gap: 9px;

    color: var(--cyan);
    font-size: 0.72rem;
    letter-spacing: 2px;
}

.status-dot {
    width: 7px;
    height: 7px;

    background: var(--cyan-light);
    border-radius: 50%;

    box-shadow: 0 0 12px var(--cyan-light);

    animation: statusPulse 1.8s infinite ease-in-out;
}

@keyframes statusPulse {
    50% {
        opacity: 0.45;
    }
}

.profile-content h3 {
    margin: 12px 0;

    font-size: clamp(1.9rem, 4vw, 2.5rem);
}

.profile-description {
    max-width: 780px;

    color: #b9d3de;
    line-height: 1.8;
}

.info-grid {
    margin-top: 28px;

    display: grid;
    grid-template-columns: repeat(2, minmax(180px, 1fr));
    gap: 18px;
}

.info-box {
    padding: 19px;

    background: var(--panel-light);
    border: 1px solid rgba(0, 200, 255, 0.14);
    border-radius: var(--radius-medium);

    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        transform 0.25s ease;
}

.info-box:hover {
    background: rgba(0, 200, 255, 0.055);
    border-color: rgba(0, 200, 255, 0.32);

    transform: translateY(-3px);
}

.info-box span {
    display: block;
    margin-bottom: 8px;

    color: var(--cyan);
    font-size: 0.66rem;
    letter-spacing: 2px;
}

.info-box strong {
    color: var(--text);
    font-size: 0.96rem;
    font-weight: 500;
    line-height: 1.5;
}

/* ========================================
   MISSION
======================================== */

.mission-card {
    margin-bottom: 25px;
    padding: 30px 36px;
}

.mission-card p {
    max-width: 950px;
    margin-top: 13px;

    color: var(--text-soft);
    font-size: 1.05rem;
    line-height: 1.8;
}

/* ========================================
   TIMELINE
======================================== */

.timeline-card {
    margin-bottom: 25px;
    padding: 30px 36px 40px;
}

.timeline-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
}

.timeline-heading h3 {
    margin-top: 8px;
    font-size: 1.5rem;
}

.timeline-progress {
    color: #8fb6c5;
    font-size: 0.68rem;
    letter-spacing: 2px;
}

.timeline {
    position: relative;

    margin-top: 46px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.timeline::before {
    content: "";

    position: absolute;
    top: 39px;
    right: 8%;
    left: 8%;

    height: 1px;

    background: linear-gradient(
        90deg,
        rgba(0, 200, 255, 0.12),
        rgba(0, 240, 255, 0.85),
        rgba(0, 200, 255, 0.12)
    );

    box-shadow: 0 0 14px rgba(0, 200, 255, 0.4);
}

.timeline-item {
    position: relative;
    z-index: 1;

    padding: 0 24px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
}

.timeline-year {
    margin-bottom: 15px;

    color: var(--cyan);
    font-size: 0.78rem;
    letter-spacing: 2px;
}

.timeline-node {
    width: 17px;
    height: 17px;
    margin-bottom: 22px;

    background: var(--cyan-light);
    border: 3px solid var(--background);
    border-radius: 50%;

    box-shadow:
        0 0 0 1px rgba(0, 229, 255, 0.8),
        0 0 22px rgba(0, 229, 255, 0.9);
}

.timeline-item p {
    max-width: 280px;

    color: #cce4ed;
    line-height: 1.65;
}

/* ========================================
   SECTIONS TEMPORAIRES
======================================== */

.placeholder-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.placeholder-card {
    min-height: 380px;
    padding: 50px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.placeholder-number {
    margin-bottom: 15px;

    color: rgba(0, 200, 255, 0.28);
    font-size: 5rem;
    font-weight: 700;
    line-height: 1;
}

.placeholder-card h3 {
    margin-bottom: 15px;
    font-size: 1.8rem;
}

.placeholder-card p {
    max-width: 720px;

    color: var(--text-muted);
    line-height: 1.8;
}

/* ========================================
   APPARITION AU SCROLL
======================================== */

.reveal {
    opacity: 0;
    transform: translateY(25px);

    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ========================================
   TABLETTE ET MOBILE
======================================== */

@media (max-width: 1000px) {
    .navbar {
        top: 12px;
        width: 96%;
        padding: 14px 18px;

        flex-wrap: wrap;

        border-radius: 22px;
    }

    .logo {
        order: 1;
    }

    .session {
        order: 2;
    }

    .nav-links {
        order: 3;
        width: 100%;

        flex-wrap: wrap;
        gap: 8px 18px;
    }

    .nav-links a {
        padding: 6px 0;
    }

    .nav-links a::after {
        bottom: 0;
    }

    .hero {
        padding-top: 190px;
    }

    .page-section {
        padding-top: 170px;
    }
}

@media (max-width: 850px) {
    .section-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .profile-card {
        grid-template-columns: 1fr;
    }

    .profile-image {
        padding: 0 0 30px;

        border-right: none;
        border-bottom: 1px solid rgba(0, 200, 255, 0.18);
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .timeline-heading {
        align-items: flex-start;
        flex-direction: column;
    }

    .timeline {
        display: block;
        margin-top: 35px;
        padding-left: 28px;
    }

    .timeline::before {
        top: 8px;
        bottom: 8px;
        left: 7px;

        width: 1px;
        height: auto;
    }

    .timeline-item {
        min-height: 110px;
        padding: 0 0 30px 28px;

        align-items: flex-start;

        text-align: left;
    }

    .timeline-year {
        margin-bottom: 8px;
    }

    .timeline-node {
        position: absolute;
        top: 24px;
        left: -28px;

        margin: 0;
    }

    .timeline-item p {
        max-width: none;
    }
}

@media (max-width: 600px) {
    .navbar {
        align-items: flex-start;
    }

    .nav-links {
        justify-content: flex-start;
    }

    .nav-links a {
        font-size: 0.78rem;
    }

    .session {
        font-size: 0.62rem;
    }

    .hero h1 {
        letter-spacing: -1px;
    }

    .section-header h2 {
        font-size: 2.2rem;
    }

    .profile-card,
    .mission-card,
    .timeline-card,
    .placeholder-card {
        padding: 25px 20px;
        border-radius: 18px;
    }

    .avatar-placeholder {
        width: 135px;
        height: 135px;
    }

    .placeholder-number {
        font-size: 4rem;
    }
}

/* Réduction des animations si demandée par l’utilisateur */

@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
