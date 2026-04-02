/* ═══════════════════════════════════════════
   PRIYA SARMALKAR — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════ */

// ── CUSTOM CURSOR ─────────────────────────────────────────────
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.14;
  followerY += (mouseY - followerY) * 0.14;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .detail-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform   = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background  = '#E8C97A';
    follower.style.transform = 'translate(-50%,-50%) scale(1.4)';
    follower.style.borderColor = 'rgba(232,201,122,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
    cursor.style.background  = '#C9A84C';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.borderColor = 'rgba(201,168,76,0.45)';
  });
});

// ── NAVBAR SCROLL ─────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── SKILL BAR ANIMATION ───────────────────────────────────────
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => barObserver.observe(bar));

// ── STAGGERED HERO REVEAL ─────────────────────────────────────
const heroEls = document.querySelectorAll('.hero .reveal');
heroEls.forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 200 + i * 150);
});
const heroAside = document.querySelector('.hero-aside');
if (heroAside) {
  setTimeout(() => heroAside.classList.add('visible'), 800);
}

// ── SMOOTH ANCHOR SCROLL ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── CONTACT FORM ──────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('.btn-submit');
  const span = btn.querySelector('span');
  span.textContent = 'Message Sent! ✓';
  btn.style.background = '#10b981';
  btn.disabled = true;
  setTimeout(() => {
    span.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// ── PARALLAX HERO ORBS ────────────────────────────────────────
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const orbs = document.querySelectorAll('.hero-orb');
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ── ACTIVE NAV LINK HIGHLIGHT ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--gold)';
    }
  });
});

// ── TYPING EFFECT FOR HERO ROLE ───────────────────────────────
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const phrases = [
    'MCA Graduate & Full-Stack Developer',
    'Python & Java Programmer',
    'Android App Developer',
    'Google Certified in Cyber Security',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeRole() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      roleEl.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
    } else {
      roleEl.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeRole, deleting ? 45 : 70);
  }
  setTimeout(typeRole, 1200);
}

// ── NOISE TEXTURE OVERLAY (subtle grain) ─────────────────────
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 256;
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(256, 256);
for (let i = 0; i < imgData.data.length; i += 4) {
  const v = Math.random() * 12;
  imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v;
  imgData.data[i+3] = 18;
}
ctx.putImageData(imgData, 0, 0);
const noiseStyle = document.createElement('style');
noiseStyle.textContent = `
  body::after {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9990;
    background-image: url('${canvas.toDataURL()}');
    background-size: 256px 256px; opacity: 0.35;
  }
`;
document.head.appendChild(noiseStyle);
