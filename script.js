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
const packetCount = 14;
const maxDistance = 150;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: 1.4 + Math.random() * 2,
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
        size: 2 + Math.random() * 3,
        waveLength: 0.12 + Math.random() * 0.12
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

    gradient.addColorStop(0, "rgba(0, 60, 90, 0.20)");
    gradient.addColorStop(0.45, "rgba(0, 20, 35, 0.65)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
}

function drawParticles() {
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
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#00dfff";
        ctx.fill();
        ctx.shadowBlur = 0;
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
}

function drawPackets() {
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
            packet.waveLength = 0.12 + Math.random() * 0.12;
        }

        const sx = packet.start.x;
        const sy = packet.start.y;
        const ex = packet.end.x;
        const ey = packet.end.y;

        const waveStart = Math.max(0, packet.progress - packet.waveLength);
        const waveEnd = Math.min(1, packet.progress);

        const x1 = sx + (ex - sx) * waveStart;
        const y1 = sy + (ey - sy) * waveStart;
        const x2 = sx + (ex - sx) * waveEnd;
        const y2 = sy + (ey - sy) * waveEnd;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, "rgba(0, 240, 255, 0)");
        gradient.addColorStop(0.45, "rgba(0, 240, 255, 0.45)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 1)");

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#00f0ff";
        ctx.stroke();

        ctx.shadowBlur = 0;

        const headX = sx + (ex - sx) * packet.progress;
        const headY = sy + (ey - sy) * packet.progress;

        ctx.beginPath();
        ctx.arc(headX, headY, packet.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();

        ctx.shadowBlur = 0;
    });
}

function animate(time) {
    drawBackground();
    drawLinks(time);
    drawPackets();
    drawParticles();

    requestAnimationFrame(animate);
}

animate();
