 // Glow Background

const canvas = document.getElementById("glow");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class GlowParticle {

  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;

    this.size = Math.random() * 4 + 1;

    this.life = 1;
    this.decay = Math.random() * 0.01 + 0.003;
  }

  update() {

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width)
      this.vx *= -1;

    if (this.y < 0 || this.y > canvas.height)
      this.vy *= -1;

    this.life -= this.decay;

    if (this.life <= 0)
      this.reset();
  }

  draw() {

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 4
    );

    gradient.addColorStop(0, `rgba(0,212,255,${this.life})`);
    gradient.addColorStop(1, "rgba(0,212,255,0)");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];

for(let i = 0; i < 100; i++){
  particles.push(new GlowParticle());
}

function animate() {

  ctx.fillStyle = "rgba(5,8,22,0.15)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

animate();


// Reveal Animation

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }

  });

});

document.querySelectorAll(".reveal").forEach(el=>{
  observer.observe(el);
});


// 3D Card Effect

const heroCard = document.getElementById("heroCard");

heroCard.addEventListener("mousemove", (e)=>{

  const rect = heroCard.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = (x / rect.width - 0.5) * 20;
  const rotateX = -(y / rect.height - 0.5) * 20;

  heroCard.style.transform =
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

heroCard.addEventListener("mouseleave", ()=>{

  heroCard.style.transform =
    "rotateX(0deg) rotateY(0deg)";
});

