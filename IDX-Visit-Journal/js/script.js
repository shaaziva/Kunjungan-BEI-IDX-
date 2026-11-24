// Animasi masuk saat section terlihat di layar
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

// Progress bar di bagian paling atas halaman
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = progress + '%';
});

// Menu navigasi untuk layar HP
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Galeri: foto tampil jika file lokal ditemukan
document.querySelectorAll('.photo img').forEach(img => {
  const showImage = () => img.closest('.photo').classList.add('has-image');
  img.addEventListener('load', showImage);
  img.addEventListener('error', () => img.closest('.photo').classList.remove('has-image'));
  if (img.complete && img.naturalWidth > 0) showImage();
});

// Klik foto untuk membuka lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.photo').forEach(photo => {
  photo.addEventListener('click', () => {
    const img = photo.querySelector('img');
    if (!img || !img.naturalWidth) return;
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
}
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

// Efek cahaya lembut mengikuti pointer di desktop
const aura = document.getElementById('cursorAura');
window.addEventListener('pointermove', event => {
  if (window.innerWidth > 1100) {
    aura.style.left = event.clientX + 'px';
    aura.style.top = event.clientY + 'px';
  }
});

// Efek tilt halus pada kartu utama
const card = document.getElementById('marketCard');
if (card && window.matchMedia('(pointer:fine)').matches) {
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) rotate(2deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = 'rotate(5deg)');
}
