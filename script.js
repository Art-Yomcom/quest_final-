const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

// Устанавливаем размеры канваса на всю страницу
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Цвета для салюта
const colors = ["#ffcc00", "#ff6666", "#66ff66", "#6666ff", "#ff66ff"];

// Функция для создания частицы
function createParticle(x, y) {
    return {
        x: x,
        y: y,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
            x: (Math.random() - 0.5) * 4,
            y: (Math.random() - 0.5) * 4
        },
        alpha: 1,
        decay: 0.015
    };
}

// Массив для хранения частиц
let particles = [];

// Функция для отрисовки салюта
function drawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.alpha -= particle.decay;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(drawFireworks);
}

// Создаём салют каждые 500 мс
setInterval(() => {
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle(canvas.width / 2, canvas.height / 2));
    }
}, 500);

// Запускаем анимацию
drawFireworks();

// Подстраиваем канвас при изменении размера окна
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});