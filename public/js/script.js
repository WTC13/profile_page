tailwind.config = {
    theme: {
        extend: {
            colors: {
                beige: {
                    50:  '#FAF7F2',
                    100: '#F0EAE0',
                    200: '#E5D9C8',
                    300: '#C9B99A',
                    400: '#B09A7A',
                },
                ink: {
                    900: '#1A1A1A',
                    700: '#3A3A3A',
                    500: '#6A6A6A',
                    300: '#9A9A9A',
                }
            },
            fontFamily: {
                display: ['Playfair Display', 'Georgia', 'serif'],
                body:    ['Inter', 'system-ui', 'sans-serif'],
            }
        }
    }
}
emailjs.init("SEU_PUBLIC_KEY"); // substitua pelo seu Public Key do EmailJS

const EMAILJS_SERVICE_ID  = "SEU_SERVICE_ID";   // ex: service_abc123
const EMAILJS_TEMPLATE_ID = "SEU_TEMPLATE_ID";  // ex: template_xyz456
const OWNER_EMAIL         = "seu@email.com";     // seu e-mail de destino

function sendEmail() {
const name        = document.getElementById("name").value.trim();
const email       = document.getElementById("email").value.trim();
const phone       = document.getElementById("phone").value.trim();
const projectType = document.getElementById("projectType").value;
const budget      = document.getElementById("budget").value;
const message     = document.getElementById("message").value.trim();

// Validation
if (!name || !email || !projectType || !message) {
    Swal.fire({
    icon: 'warning',
    title: 'Campos obrigatórios',
    text: 'Por favor, preencha nome, e-mail, tipo de projeto e mensagem.',
    confirmButtonColor: '#1A1A1A',
    });
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    Swal.fire({ icon: 'error', title: 'E-mail inválido', text: 'Verifique o e-mail informado.', confirmButtonColor: '#1A1A1A' });
    return;
}

// Loading
Swal.fire({
    title: 'Enviando sua mensagem...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
});

const templateParams = {
    from_name:    name,
    from_email:   email,
    phone:        phone || "Não informado",
    project_type: projectType,
    budget:       budget || "Não informado",
    message:      message,
    to_email:     OWNER_EMAIL,
    reply_to:     email,
};

emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
    Swal.fire({
        icon: 'success',
        title: 'Mensagem enviada! 🎉',
        html: `Obrigado, <strong>${name}</strong>! Responderei em até 24h.<br/><br/>Ou fale agora pelo WhatsApp:`,
        confirmButtonColor: '#1A1A1A',
        confirmButtonText: 'Fechar',
        showDenyButton: true,
        denyButtonText: '<i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp',
        denyButtonColor: '#25D366',
    }).then(result => {
        if (result.isDenied) {
        const waMsg = encodeURIComponent(`Olá Wendell! Me chamo ${name} e enviei um formulário pelo seu site. Projeto: ${projectType}.`);
        window.open(`https://wa.me/5511986695168?text=${waMsg}`, '_blank');
        }
    });

    // Reset form
    ["name","email","phone","message"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("projectType").selectedIndex = 0;
    document.getElementById("budget").selectedIndex = 0;
    })
    .catch(err => {
    console.error(err);
    Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar',
        html: 'Ocorreu um problema. Tente pelo WhatsApp:<br/><br/><a href="https://wa.me/5511986695168" target="_blank" style="color:#25D366;font-weight:600;">📱 (11) 98669-5168</a>',
        confirmButtonColor: '#1A1A1A',
    });
    });
}

// ── Hero chart (donuts) ──
const heroCtx = document.getElementById('heroChart').getContext('2d');
new Chart(heroCtx, {
type: 'doughnut',
data: {
    labels: ['SaaS', 'E-commerce', 'Portfólios', 'Sistemas', 'Landing Pages'],
    datasets: [{
    data: [20, 30, 25, 15, 10],
    backgroundColor: ['#1A1A1A','#C9B99A','#3A3A3A','#E5D9C8','#6A6A6A'],
    borderWidth: 0,
    }]
},
options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
    legend: {
        position: 'bottom',
        labels: {
        font: { family: 'Inter', size: 11 },
        color: '#6A6A6A',
        padding: 12,
        usePointStyle: true,
        pointStyleWidth: 8,
        }
    },
    tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
    }
}
});

// ── Skills radar chart ──
const skillsCtx = document.getElementById('skillsChart').getContext('2d');
new Chart(skillsCtx, {
type: 'radar',
data: {
    labels: ['Node.js', 'React', 'SQL', 'HTML/CSS', 'APIs', 'DevOps'],
    datasets: [{
    label: 'Proficiência',
    data: [92, 85, 88, 95, 90, 75],
    backgroundColor: 'rgba(201,185,154,.2)',
    borderColor: '#C9B99A',
    borderWidth: 2,
    pointBackgroundColor: '#1A1A1A',
    pointRadius: 4,
    }]
},
options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
    r: {
        min: 0, max: 100,
        ticks: { stepSize: 25, display: false },
        grid: { color: '#E5D9C8' },
        pointLabels: { font: { family: 'Inter', size: 12 }, color: '#3A3A3A' },
        angleLines: { color: '#E5D9C8' }
    }
    },
    plugins: { legend: { display: false } }
}
});

// ── Owl Carousel ──
$(document).ready(function(){
$('#testimonialsCarousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
    0:   { items: 1 },
    768: { items: 2 },
    1024:{ items: 2 }
    }
});
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── Hero name underline ──
window.addEventListener('load', () => {
setTimeout(() => document.getElementById('heroName').classList.add('active'), 300);
});

// ── Count-up ──
function countUp(el, target, duration = 1800) {
let start = 0;
const step = Math.ceil(target / (duration / 30));
const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = start;
}, 30);
}

const statObserver = new IntersectionObserver(entries => {
entries.forEach(e => {
    if (e.isIntersecting) {
    document.querySelectorAll('[data-target]').forEach(el => {
        countUp(el, parseInt(el.dataset.target));
    });
    statObserver.disconnect();
    }
});
}, { threshold: 0.4 });
const statsSection = document.querySelector('[data-target]');
if (statsSection) statObserver.observe(statsSection.closest('section') || statsSection);