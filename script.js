const canvas = document.getElementById("network");

if (!canvas) {
    throw new Error(
        'Le canvas avec l’identifiant "network" est introuvable.'
    );
}

const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error(
        "Le contexte 2D du canvas n’est pas disponible."
    );
}

let w = 0;
let h = 0;

const particles = [];
const flows = [];

const particleCount = window.innerWidth < 700 ? 45 : 75;
const flowCount = window.innerWidth < 700 ? 3 : 5;

const maxDistance = 145;
const pathLength = 6;

/* ========================================
   REDIMENSIONNEMENT
======================================== */

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* ========================================
   PARTICULES
======================================== */

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,

        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,

        size: 1.5 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,

        hit: 0
    });
}

function randomParticle() {
    return particles[
        Math.floor(Math.random() * particles.length)
    ];
}

function getDistance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);
}

function getNeighbors(particle) {
    return particles.filter(otherParticle => {
        if (otherParticle === particle) {
            return false;
        }

        return getDistance(particle, otherParticle) < maxDistance;
    });
}

/* ========================================
   CHEMINS DES FLUX
======================================== */

function buildPath() {
    const maximumAttempts = 40;

    for (let attempt = 0; attempt < maximumAttempts; attempt++) {
        const path = [];
        let current = randomParticle();

        path.push(current);

        for (let i = 0; i < pathLength; i++) {
            const availableNeighbors = getNeighbors(current).filter(
                neighbor => !path.includes(neighbor)
            );

            if (availableNeighbors.length === 0) {
                break;
            }

            current =
                availableNeighbors[
                    Math.floor(
                        Math.random() * availableNeighbors.length
                    )
                ];

            path.push(current);
        }

        if (path.length > 1) {
            return path;
        }
    }

    /*
     * Sécurité : si aucun chemin connecté n’est trouvé,
     * on utilise deux particules différentes.
     */

    const start = randomParticle();
    let end = randomParticle();

    while (end === start) {
        end = randomParticle();
    }

    return [start, end];
}

function createFlow() {
    return {
        path: buildPath(),
        segment: 0,
        progress: Math.random(),

        speed: 0.012 + Math.random() * 0.006,
        delay: Math.random() * 100,
        tail: 0.24 + Math.random() * 0.08
    };
}

for (let i = 0; i < flowCount; i++) {
    flows.push(createFlow());
}

/* ========================================
   FOND
======================================== */

function drawBackground() {
    const gradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h)
    );

    gradient.addColorStop(
        0,
        "rgba(0, 60, 90, 0.20)"
    );

    gradient.addColorStop(
        0.45,
        "rgba(0, 20, 35, 0.65)"
    );

    gradient.addColorStop(
        1,
        "rgba(0, 0, 0, 0.95)"
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
}

/* ========================================
   MOUVEMENT DES PARTICULES
======================================== */

function updateParticles() {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0) {
            particle.x = 0;
            particle.vx = Math.abs(particle.vx);
        }

        if (particle.x >= w) {
            particle.x = w;
            particle.vx = -Math.abs(particle.vx);
        }

        if (particle.y <= 0) {
            particle.y = 0;
            particle.vy = Math.abs(particle.vy);
        }

        if (particle.y >= h) {
            particle.y = h;
            particle.vy = -Math.abs(particle.vy);
        }

        particle.pulse += 0.025;
    });
}

/* ========================================
   LIENS
======================================== */

function drawLinks(time) {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const firstParticle = particles[i];
            const secondParticle = particles[j];

            const distance = getDistance(
                firstParticle,
                secondParticle
            );

            if (distance >= maxDistance) {
                continue;
            }

            const opacity =
                1 - distance / maxDistance;

            const pulse =
                0.22 +
                Math.sin(
                    time * 0.002 +
                    distance * 0.04
                ) * 0.12;

            ctx.beginPath();

            ctx.moveTo(
                firstParticle.x,
                firstParticle.y
            );

            ctx.lineTo(
                secondParticle.x,
                secondParticle.y
            );

            ctx.strokeStyle =
                `rgba(0, 200, 255, ${opacity * pulse})`;

            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}

/* ========================================
   DESSIN DES PARTICULES
======================================== */

function drawParticles() {
    particles.forEach(particle => {
        if (particle.hit > 0) {
            particle.hit = Math.max(
                0,
                particle.hit - 0.04
            );
        }

        const reaction = particle.hit;

        const glowSize =
            particle.size +
            Math.sin(particle.pulse) * 0.5 +
            reaction * 6;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            Math.max(0.5, glowSize),
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(0, 220, 255, ${Math.min(
                1,
                0.85 + reaction * 0.15
            )})`;

        ctx.shadowBlur =
            12 + reaction * 35;

        ctx.shadowColor = "#00f0ff";

        ctx.fill();

        ctx.shadowBlur = 0;
    });
}

/* ========================================
   FLUX LUMINEUX
======================================== */

function resetFlow(flow) {
    flow.path = buildPath();
    flow.segment = 0;
    flow.progress = 0;

    flow.speed =
        0.012 + Math.random() * 0.006;

    flow.delay =
        60 + Math.random() * 160;

    flow.tail =
        0.24 + Math.random() * 0.08;
}

function drawFlowSegment(
    startParticle,
    endParticle,
    startProgress,
    endProgress
) {
    const x1 =
        startParticle.x +
        (endParticle.x - startParticle.x) *
            startProgress;

    const y1 =
        startParticle.y +
        (endParticle.y - startParticle.y) *
            startProgress;

    const x2 =
        startParticle.x +
        (endParticle.x - startParticle.x) *
            endProgress;

    const y2 =
        startParticle.y +
        (endParticle.y - startParticle.y) *
            endProgress;

    const gradient =
        ctx.createLinearGradient(
            x1,
            y1,
            x2,
            y2
        );

    gradient.addColorStop(
        0,
        "rgba(0, 240, 255, 0)"
    );

    gradient.addColorStop(
        0.45,
        "rgba(0, 240, 255, 0.45)"
    );

    gradient.addColorStop(
        1,
        "rgba(255, 255, 255, 0.95)"
    );

    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;

    ctx.shadowBlur = 22;
    ctx.shadowColor = "#00f0ff";

    ctx.stroke();

    ctx.shadowBlur = 0;

    return {
        x: x2,
        y: y2
    };
}

function drawFlows() {
    flows.forEach(flow => {
        if (flow.delay > 0) {
            flow.delay--;
            return;
        }

        flow.progress += flow.speed;

        if (flow.progress >= 1) {
            const targetNode =
                flow.path[flow.segment + 1];

            if (targetNode) {
                targetNode.hit = 1;
            }

            flow.segment++;
            flow.progress = 0;

            if (
                flow.segment >=
                flow.path.length - 1
            ) {
                resetFlow(flow);
                return;
            }
        }

        const startParticle =
            flow.path[flow.segment];

        const endParticle =
            flow.path[flow.segment + 1];

        if (!startParticle || !endParticle) {
            resetFlow(flow);
            return;
        }

        const startProgress = Math.max(
            0,
            flow.progress - flow.tail
        );

        const head = drawFlowSegment(
            startParticle,
            endParticle,
            startProgress,
            flow.progress
        );

        ctx.beginPath();

        ctx.arc(
            head.x,
            head.y,
            3.8,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffffff";

        ctx.shadowBlur = 28;
        ctx.shadowColor = "#00f0ff";

        ctx.fill();

        ctx.shadowBlur = 0;
    });
}

/* ========================================
   BOUCLE D’ANIMATION
======================================== */

function animate(time = 0) {
    drawBackground();
    updateParticles();
    drawLinks(time);
    drawFlows();
    drawParticles();

    requestAnimationFrame(animate);
}

animate();

/* ========================================
   APPARITION DES CARTES
======================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                }
            });
        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(element => {
    revealObserver.observe(element);
});

/* ========================================
   NAVIGATION ET SESSION
======================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");

const sessionDisplay =
    document.querySelector(".session");

const sessionMap = {
    home: "SESSION 01 / 05",
    about: "SESSION 02 / 05",
    projects: "SESSION 03 / 05",
    company: "SESSION 04 / 05",
    watch: "SESSION 05 / 05"
};

function updateActiveSection(sectionId) {
    navLinks.forEach(link => {
        const isCurrentLink =
            link.getAttribute("href") ===
            `#${sectionId}`;

        link.classList.toggle(
            "active",
            isCurrentLink
        );
    });

    if (
        sessionDisplay &&
        sessionMap[sectionId]
    ) {
        sessionDisplay.textContent =
            sessionMap[sectionId];
    }
}

const sectionObserver =
    new IntersectionObserver(
        entries => {
            const visibleEntries = entries
                .filter(entry => entry.isIntersecting)
                .sort(
                    (first, second) =>
                        second.intersectionRatio -
                        first.intersectionRatio
                );

            if (visibleEntries.length === 0) {
                return;
            }

            updateActiveSection(
                visibleEntries[0].target.id
            );
        },
        {
            rootMargin: "-20% 0px -55% 0px",
            threshold: [0.1, 0.25, 0.5]
        }
    );

sections.forEach(section => {
    sectionObserver.observe(section);
});
/* ========================================
   ÉCRAN DE DÉMARRAGE
======================================== */

const bootScreen = document.getElementById("boot-screen");
const bootProgressBar = document.getElementById("boot-progress-bar");
const bootPercent = document.getElementById("boot-percent");
const bootMessage = document.getElementById("boot-message");

const bootMessages = [
    {
        progress: 0,
        message: "Connexion au réseau..."
    },
    {
        progress: 30,
        message: "Chargement du profil..."
    },
    {
        progress: 60,
        message: "Initialisation des modules..."
    },
    {
        progress: 85,
        message: "Vérification du système..."
    },
    {
        progress: 100,
        message: "Système prêt."
    }
];

function startBootScreen() {
    if (
        !bootScreen ||
        !bootProgressBar ||
        !bootPercent ||
        !bootMessage
    ) {
        return;
    }

    let progress = 0;
    let currentMessageIndex = 0;

    const interval = window.setInterval(() => {
        progress += 2 + Math.random() * 5;
        progress = Math.min(progress, 100);

        bootProgressBar.style.width = `${progress}%`;
        bootPercent.textContent = `${Math.floor(progress)}%`;

        const nextMessage = bootMessages[currentMessageIndex + 1];

        if (
            nextMessage &&
            progress >= nextMessage.progress
        ) {
            currentMessageIndex++;
            bootMessage.textContent =
                bootMessages[currentMessageIndex].message;
        }

        if (progress >= 100) {
            window.clearInterval(interval);

            window.setTimeout(() => {
                bootScreen.classList.add("hidden");
            }, 250);
        }
    }, 35);
}

window.addEventListener("load", startBootScreen);