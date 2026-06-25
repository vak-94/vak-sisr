const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

const particleCount = 60;

for (let i = 0; i < 5; i++) {const packets = [];

createPacket() {

    const start =
        particles[Math.floor(Math.random() * particles.length)];

    let end =
        particles[Math.floor(Math.random() * particles.length)];

    while (end === start) {
        end =
            particles[Math.floor(Math.random() * particles.length)];
    }

    packets.push({
        start,
        end,
        progress: 0,
        speed: 0.003 + Math.random() * 0.004
    });
}
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    });
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(0,200,255,0.8)";
        ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(0,200,255,${1 - distance / 120})`;

                ctx.stroke();
            }
        }
    }
packets.forEach(packet => {

    packet.progress += packet.speed;

    if (packet.progress >= 1) {

        packet.start =
            particles[Math.floor(Math.random() * particles.length)];

        packet.end =
            particles[Math.floor(Math.random() * particles.length)];

        packet.progress = 0;
    }

    const x =
        packet.start.x +
        (packet.end.x - packet.start.x) * packet.progress;

    const y =
        packet.start.y +
        (packet.end.y - packet.start.y) * packet.progress;

    const glow =
        3 + Math.sin(packet.progress * Math.PI) * 5;

    ctx.beginPath();
    ctx.arc(x, y, glow, 0, Math.PI * 2);

    ctx.fillStyle = "#00c8ff";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00c8ff";

    ctx.fill();

    ctx.shadowBlur = 0;
});
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
