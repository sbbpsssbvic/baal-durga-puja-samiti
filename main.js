
        /* Sticky Header Shrink on Scroll */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.classList.add('shrink');
  } else {
    nav.classList.remove('shrink');
  }
});

    /* ---------- HERO SLIDER SCRIPT ---------- */
const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroDotsWrap = document.querySelector('.dots');
const progressBar = document.querySelector('.progress-bar');

let heroIndex = 0;
let heroTimer;
const slideInterval = 5000; // 5 sec auto slide

// Create Dots dynamically
function renderHeroDots() {
  heroDotsWrap.innerHTML = heroSlides
    .map((_, i) => `<span class="dot ${i === heroIndex ? 'active' : ''}" data-i="${i}"></span>`)
    .join('');
  heroDotsWrap.querySelectorAll('.dot').forEach(d =>
    d.addEventListener('click', () => goHero(+d.dataset.i))
  );
}

// Show specific slide
function showHero(i) {
  heroSlides.forEach((slide, idx) => {
    slide.classList.remove('active', 'prev');
    if (idx === i) {
      slide.classList.add('active');
    } else if (idx === (i - 1 + heroSlides.length) % heroSlides.length) {
      slide.classList.add('prev');
    }
  });

  // Update dots
  document.querySelectorAll('.dot').forEach((dot, idx) =>
    dot.classList.toggle('active', idx === i)
  );

  // Reset progress bar
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  setTimeout(() => {
    progressBar.style.transition = `width ${slideInterval}ms linear`;
    progressBar.style.width = '100%';
  }, 50);
}

// Go to specific slide
function goHero(i) {
  heroIndex = (i + heroSlides.length) % heroSlides.length;
  showHero(heroIndex);
  resetHeroAuto();
}

function nextHero() {
  goHero(heroIndex + 1);
}

function prevHero() {
  goHero(heroIndex - 1);
}

// Event listeners
document.querySelector('.next').addEventListener('click', nextHero);
document.querySelector('.prev').addEventListener('click', prevHero);

// Auto Slide
function heroAuto() {
  heroTimer = setInterval(nextHero, slideInterval);
}

function resetHeroAuto() {
  clearInterval(heroTimer);
  heroAuto();
}

// Pause on hover
const heroWrapper = document.getElementById('heroSlider');
heroWrapper.addEventListener('mouseenter', () => clearInterval(heroTimer));
heroWrapper.addEventListener('mouseleave', heroAuto);

// Init
renderHeroDots();
showHero(0);
heroAuto();


/* ---------- Program Carousel ---------- */
const track = document.getElementById('progTrack');
let progIndex = 0;
const cardCount = track.children.length;
const cardsVisible = 3;

function updateCarousel() {
  const cardWidth = track.children[0].offsetWidth + 14; 
  track.style.transform = `translateX(-${progIndex * cardWidth}px)`;
}

document.querySelector('.c-next').onclick = () => {
  if (progIndex < cardCount - cardsVisible) progIndex++;
  else progIndex = 0;
  updateCarousel();
};

document.querySelector('.c-prev').onclick = () => {
  if (progIndex > 0) progIndex--;
  else progIndex = cardCount - cardsVisible;
  updateCarousel();
};

// Auto-slide every 4 seconds
setInterval(() => {
  if (progIndex < cardCount - cardsVisible) progIndex++;
  else progIndex = 0;
  updateCarousel();
}, 4000);

// Initial position
updateCarousel();




// Open modal
function openDonation() {
  document.getElementById("donationModal").style.display = "flex";
}

// Close modal
function closeDonation() {
  document.getElementById("donationModal").style.display = "none";
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById("donationModal");
  if (event.target === modal) {
    closeDonation();
  }
});


const modal = document.querySelector('.donation-modal');
const openBtn = document.querySelector('.daan-btn');
const closeBtn = document.querySelector('.donation-modal .close');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open'); // Background scroll lock
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Scroll wapas enable
});



// Copy UPI ID
function copyUPI() {
  const upiText = document.getElementById('upiText').innerText;
  navigator.clipboard.writeText(upiText).then(() => {
    alert("UPI ID कॉपी हो गया!");
  });
}


