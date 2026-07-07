const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const particles = [];
const flows = [];

const particleCount = 75;
const flowCount = 5;
const maxDistance = 145;
const pathLength = 6;

// PARTICLES
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        size: 1.5 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2
        hit: 0
    });
}

function randomParticle() {
    return particles[Math.floor(Math.random() * particles.length)];
}

function getNeighbors(particle) {
    return particles.filter(p => {
        if (p === particle) return false;

        const dx = particle.x - p.x;
        const dy = particle.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < maxDistance;
    });
}

function buildPath() {
    const path = [];
    let current = randomParticle();

    path.push(current);

    for (let i = 0; i < pathLength; i++) {
        const neighbors = getNeighbors(current).filter(p => !path.includes(p));

        if (neighbors.length === 0) break;

        current = neighbors[Math.floor(Math.random() * neighbors.length)];
        path.push(current);
    }

    return path.length > 1 ? path : buildPath();
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

function drawBackground() {
    const gradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h)
    );

    gradient.addColorStop(0, "rgba(0, 60, 90, 0.20)");
    gradient.addColorStop(0.45, "rgba(0, 20, 35, 0.65)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        p.pulse += 0.025;
    });
}

function drawLinks(time) {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;
                const pulse = 0.22 + Math.sin(time * 0.002 + distance * 0.04) * 0.12;

                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);

                ctx.strokeStyle = `rgba(0, 200, 255, ${opacity * pulse})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function drawParticles() {
    particles.forEach(p => {
        if (p.hit > 0) p.hit -= 0.04;

        const reaction = Math.max(0, p.hit);
        const glowSize = p.size + Math.sin(p.pulse) * 0.5 + reaction * 6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 220, 255, ${0.85 + reaction * 0.15})`;
        ctx.shadowBlur = 12 + reaction * 35;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}
}

function resetFlow(flow) {
    flow.path = buildPath();
    flow.segment = 0;
    flow.progress = 0;
    flow.speed = 0.012 + Math.random() * 0.006;
    flow.delay = 60 + Math.random() * 160;
    flow.tail = 0.24 + Math.random() * 0.08;
}

function drawFlowSegment(a, b, startProgress, endProgress, intensity = 1) {
    const x1 = a.x + (b.x - a.x) * startProgress;
    const y1 = a.y + (b.y - a.y) * startProgress;
    const x2 = a.x + (b.x - a.x) * endProgress;
    const y2 = a.y + (b.y - a.y) * endProgress;

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, `rgba(0, 240, 255, 0)`);
    gradient.addColorStop(0.45, `rgba(0, 240, 255, ${0.45 * intensity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${0.95 * intensity})`);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 22;
    ctx.shadowColor = "#00f0ff";
    ctx.stroke();
    ctx.shadowBlur = 0;

    return { x: x2, y: y2 };
}

function drawFlows() {
    flows.forEach(flow => {
        if (flow.delay > 0) {
            flow.delay--;
            return;
        }

        flow.progress += flow.speed;

        if (flow.progress >= 1) {
            flow.segment++;
            flow.progress = 0;

            if (flow.segment >= flow.path.length - 1) {
                resetFlow(flow);
                return;
            }
        }

        const a = flow.path[flow.segment];
        const b = flow.path[flow.segment + 1];
        if (flow.progress > 0.95) {
    b.hit = 1;
}

        const startProgress = Math.max(0, flow.progress - flow.tail);
        const head = drawFlowSegment(a, b, startProgress, flow.progress);

        // petit glow sur le nœud actif
        ctx.beginPath();
        ctx.arc(a.x, a.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.25)";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0;

        // tête de l'onde
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 28;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function animate(time) {
    drawBackground();
    updateParticles();
    drawLinks(time);
    drawFlows();
    drawParticles();

    requestAnimationFrame(animate);
}

animate();
