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
const packets = [];

const particleCount = 75;
const packetCount = 12;
const maxDistance = 150;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: 1.5 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2
    });
}

function randomParticle() {
    return particles[Math.floor(Math.random() * particles.length)];
}

function createPacket() {
    let start = randomParticle();
    let end = randomParticle();

    while (end === start) {
        end = randomParticle();
    }

    packets.push({
        start,
        end,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
        size: 2 + Math.random() * 3
    });
}

for (let i = 0; i < packetCount; i++) {
    createPacket();
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

    gradient.addColorStop(0, "rgba(0, 60, 90, 0.18)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
}

function animate(time) {
    drawBackground();

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        p.pulse += 0.03;

        const glowSize = p.size + Math.sin(p.pulse) * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 220, 255, 0.9)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00dfff";
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;
                const pulse = 0.25 + Math.sin(time * 0.002 + distance * 0.04) * 0.15;

                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 200, 255, ${opacity * pulse})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    packets.forEach(packet => {
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
            packet.start = randomParticle();
            packet.end = randomParticle();

            while (packet.end === packet.start) {
                packet.end = randomParticle();
            }

            packet.progress = 0;
            packet.speed = 0.004 + Math.random() * 0.008;
        }

        const x = packet.start.x + (packet.end.x - packet.start.x) * packet.progress;
        const y = packet.start.y + (packet.end.y - packet.start.y) * packet.progress;

        const glow = packet.size + Math.sin(packet.progress * Math.PI) * 6;

        ctx.beginPath();
        ctx.arc(x, y, glow, 0, Math.PI * 2);
        ctx.fillStyle = "#00f0ff";
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate);
}

animate();
