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

const particleCount = 60;
const flowCount = 3;
const maxDistance = 140;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: 1.4 + Math.random() * 1.4
    });
}

function randomParticle() {
    return particles[Math.floor(Math.random() * particles.length)];
}

function createFlow() {
    let start = randomParticle();
    let end = randomParticle();

    while (end === start) {
        end = randomParticle();
    }

    return {
        start,
        end,
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.0025,
        delay: Math.random() * 120
    };
}

for (let i = 0; i < flowCount; i++) {
    flows.push(createFlow());
}

function drawBackground() {
    ctx.fillStyle = "rgba(0, 5, 12, 0.28)";
    ctx.fillRect(0, 0, w, h);
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
    });
}

function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.28;

                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 180, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 210, 255, 0.55)";
        ctx.fill();
    });
}

function resetFlow(flow) {
    flow.start = randomParticle();
    flow.end = randomParticle();

    while (flow.end === flow.start) {
        flow.end = randomParticle();
    }

    flow.progress = 0;
    flow.speed = 0.0025 + Math.random() * 0.0025;
    flow.delay = 60 + Math.random() * 180;
}

function drawFlows() {
    flows.forEach(flow => {
        if (flow.delay > 0) {
            flow.delay--;
            return;
        }

        flow.progress += flow.speed;

        if (flow.progress >= 1) {
            resetFlow(flow);
            return;
        }

        const sx = flow.start.x;
        const sy = flow.start.y;
        const ex = flow.end.x;
        const ey = flow.end.y;

        const tailLength = 0.16;
        const startProgress = Math.max(0, flow.progress - tailLength);
        const endProgress = flow.progress;

        const x1 = sx + (ex - sx) * startProgress;
        const y1 = sy + (ey - sy) * startProgress;
        const x2 = sx + (ex - sx) * endProgress;
        const y2 = sy + (ey - sy) * endProgress;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, "rgba(0, 220, 255, 0)");
        gradient.addColorStop(0.65, "rgba(0, 220, 255, 0.45)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.95)");

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00dfff";
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(x2, y2, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#00dfff";
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function animate() {
    drawBackground();
    updateParticles();
    drawLinks();
    drawFlows();
    drawParticles();

    requestAnimationFrame(animate);
}

animate();
