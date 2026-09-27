
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


/* =========================================================
   MOBILE HERO TOUCH / SWIPE SUPPORT
   ========================================================= */

let heroTouchStartX = 0;
let heroTouchStartY = 0;
let heroTouchEndX = 0;
let heroTouchEndY = 0;

const heroSwipeArea = document.getElementById('heroSlider');

if (heroSwipeArea) {

    heroSwipeArea.addEventListener(
        'touchstart',
        function (e) {

            const touch = e.changedTouches[0];

            heroTouchStartX = touch.clientX;
            heroTouchStartY = touch.clientY;

            heroTouchEndX = touch.clientX;
            heroTouchEndY = touch.clientY;

        },
        { passive: true }
    );


    heroSwipeArea.addEventListener(
        'touchmove',
        function (e) {

            const touch = e.changedTouches[0];

            heroTouchEndX = touch.clientX;
            heroTouchEndY = touch.clientY;

        },
        { passive: true }
    );


    heroSwipeArea.addEventListener(
        'touchend',
        function () {

            const deltaX = heroTouchEndX - heroTouchStartX;
            const deltaY = heroTouchEndY - heroTouchStartY;

            const minSwipeDistance = 45;

            /*
             * Sirf horizontal swipe ko slider action maana jayega.
             * Vertical scrolling par slider change nahi hoga.
             */

            if (
                Math.abs(deltaX) > minSwipeDistance &&
                Math.abs(deltaX) > Math.abs(deltaY)
            ) {

                if (deltaX < 0) {

                    // Swipe Left → Next
                    nextHero();

                } else {

                    // Swipe Right → Previous
                    prevHero();

                }

            }

        },
        { passive: true }
    );
}





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


//------------- MODAL JS AREA



/* =========================================================
   BAL DURGA PUJA SAMITI
   FINAL MODAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   COMMON BODY SCROLL LOCK
   ========================================================= */

function lockBodyScroll() {
  document.body.classList.add("contact-modal-open");
  document.body.style.overflow = "hidden";
}

function unlockBodyScroll() {
  document.body.classList.remove("contact-modal-open");
  document.body.style.overflow = "";
}


/* =========================================================
   DONATION MODAL
   ========================================================= */

function openDonation() {
  const modal = document.getElementById("donationModal");

  if (!modal) {
    console.warn("Donation modal not found.");
    return;
  }

  modal.style.display = "flex";

  lockBodyScroll();
}


function closeDonation() {
  const modal = document.getElementById("donationModal");

  if (!modal) return;

  modal.style.display = "none";

  unlockBodyScroll();
}


/* =========================================================
   CONTACT MODAL
   ========================================================= */

function openContact() {
  const modal = document.getElementById("contactModal");

  if (!modal) {
    console.warn("Contact modal not found.");
    return;
  }

  /* Show modal first */
  modal.style.display = "flex";

  /* Allow browser to render before animation */
  requestAnimationFrame(() => {
    modal.classList.add("show");
  });

  lockBodyScroll();
}


function closeContact() {
  const modal = document.getElementById("contactModal");

  if (!modal) return;

  /* Start closing animation */
  modal.classList.remove("show");

  /* Hide after animation */
  setTimeout(() => {
    modal.style.display = "none";
  }, 350);

  unlockBodyScroll();
}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================================= */

window.addEventListener("click", function (event) {

  /* Donation Modal */
  const donationModal = document.getElementById("donationModal");

  if (
    donationModal &&
    event.target === donationModal
  ) {
    closeDonation();
    return;
  }


  /* Contact Modal */
  const contactModal = document.getElementById("contactModal");

  if (
    contactModal &&
    event.target === contactModal
  ) {
    closeContact();
    return;
  }

});


/* =========================================================
   ESCAPE KEY SUPPORT
   ========================================================= */

document.addEventListener("keydown", function (event) {

  if (event.key !== "Escape") return;


  /* Close Contact Modal */
  const contactModal = document.getElementById("contactModal");

  if (
    contactModal &&
    contactModal.style.display === "flex"
  ) {
    closeContact();
    return;
  }


  /* Close Donation Modal */
  const donationModal = document.getElementById("donationModal");

  if (
    donationModal &&
    donationModal.style.display === "flex"
  ) {
    closeDonation();
    return;
  }

});


/* =========================================================
   PREVENT BACKGROUND SCROLL / SAFETY
   ========================================================= */

window.addEventListener("beforeunload", function () {
  document.body.classList.remove("contact-modal-open");
  document.body.style.overflow = "";
});


/* =========================================================
   MOBILE MENU
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /*
   * This section safely handles common mobile-menu setups.
   * If your existing mobile menu already has its own JS,
   * it will not interfere unless matching IDs exist.
   */

  const menuToggle =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".hamburger") ||
    document.querySelector("#menuToggle");

  const mobileMenu =
    document.querySelector(".mobile-menu") ||
    document.querySelector("#mobileMenu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", function () {

      mobileMenu.classList.toggle("active");

    });

  }

});


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
   ========================================================= */

document.addEventListener("click", function (event) {

  const clickedLink = event.target.closest(
    ".mobile-menu a, #mobileMenu a"
  );

  if (!clickedLink) return;

  const mobileMenu =
    document.querySelector(".mobile-menu") ||
    document.querySelector("#mobileMenu");

  if (mobileMenu) {
    mobileMenu.classList.remove("active");
  }

});


/* =========================================================
   CONTACT / DONATION MODAL INITIAL SAFETY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const contactModal =
    document.getElementById("contactModal");

  const donationModal =
    document.getElementById("donationModal");


  /* Ensure both modals start hidden */

  if (contactModal) {
    contactModal.style.display = "none";
    contactModal.classList.remove("show");
  }

  if (donationModal) {
    donationModal.style.display = "none";
  }


  /* Make sure page scrolling is enabled initially */

  document.body.classList.remove("contact-modal-open");
  document.body.style.overflow = "";

});


/* =========================================================
   PREVENT MODAL STATE FROM BREAKING ON RESIZE
   ========================================================= */

window.addEventListener("resize", function () {

  const contactModal =
    document.getElementById("contactModal");

  const donationModal =
    document.getElementById("donationModal");

  const contactOpen =
    contactModal &&
    contactModal.style.display === "flex";

  const donationOpen =
    donationModal &&
    donationModal.style.display === "flex";


  if (contactOpen || donationOpen) {
    document.body.style.overflow = "hidden";
  }

});


/* =========================================================
   GLOBAL ERROR-SAFE MODAL FUNCTIONS
   ========================================================= */

window.openDonation = openDonation;
window.closeDonation = closeDonation;

window.openContact = openContact;
window.closeContact = closeContact;



// HERO SLIDER JS AREA 


