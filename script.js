// Scroll-triggered fade-ins
const fadeEls = document.querySelectorAll('.fade-in');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => io.observe(el));

// Skill bar fill animation
const skillFills = document.querySelectorAll('.skill-fill');
const skillIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillIO.observe(el));

// Projects carousel
(function(){
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.querySelector('.carousel-track');
  if (!viewport || !track) return;

  const cards = Array.from(track.children);
  const dots = Array.from(document.querySelectorAll('.carousel-dots .dot'));
  const prevBtn = document.querySelector('.car-prev');
  const nextBtn = document.querySelector('.car-next');
  let current = 0;

  function setHeight(){
    viewport.style.height = cards[current].offsetHeight + 'px';
  }

  function goTo(i){
    current = (i + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    cards.forEach((c, idx) => c.classList.toggle('active', idx === current));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
    setHeight();
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(Number(d.dataset.i))));

  // touch swipe
  let startX = 0, isDown = false;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDown = true; }, {passive:true});
  track.addEventListener('touchend', e => {
    if (!isDown) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) goTo(current + (diff < 0 ? 1 : -1));
    isDown = false;
  });

  window.addEventListener('resize', setHeight);
  window.addEventListener('load', setHeight);
  goTo(0);
})();
