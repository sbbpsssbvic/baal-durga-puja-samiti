
        /* Sticky Header Shrink on Scroll */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.classList.add('shrink');
  } else {
    nav.classList.remove('shrink');
  }
});

//     /* ---------- HERO SLIDER SCRIPT ---------- */
// const heroSlides = [...document.querySelectorAll('.hero-slide')];
// const heroDotsWrap = document.querySelector('.dots');
// const progressBar = document.querySelector('.progress-bar');

// let heroIndex = 0;
// let heroTimer;
// const slideInterval = 5000; // 5 sec auto slide

// // Create Dots dynamically
// function renderHeroDots() {
//   heroDotsWrap.innerHTML = heroSlides
//     .map((_, i) => `<span class="dot ${i === heroIndex ? 'active' : ''}" data-i="${i}"></span>`)
//     .join('');
//   heroDotsWrap.querySelectorAll('.dot').forEach(d =>
//     d.addEventListener('click', () => goHero(+d.dataset.i))
//   );
// }

// // Show specific slide
// function showHero(i) {
//   heroSlides.forEach((slide, idx) => {
//     slide.classList.remove('active', 'prev');
//     if (idx === i) {
//       slide.classList.add('active');
//     } else if (idx === (i - 1 + heroSlides.length) % heroSlides.length) {
//       slide.classList.add('prev');
//     }
//   });

//   // Update dots
//   document.querySelectorAll('.dot').forEach((dot, idx) =>
//     dot.classList.toggle('active', idx === i)
//   );

//   // Reset progress bar
//   progressBar.style.transition = 'none';
//   progressBar.style.width = '0%';
//   setTimeout(() => {
//     progressBar.style.transition = `width ${slideInterval}ms linear`;
//     progressBar.style.width = '100%';
//   }, 50);
// }

// // Go to specific slide
// function goHero(i) {
//   heroIndex = (i + heroSlides.length) % heroSlides.length;
//   showHero(heroIndex);
//   resetHeroAuto();
// }

// function nextHero() {
//   goHero(heroIndex + 1);
// }

// function prevHero() {
//   goHero(heroIndex - 1);
// }

// // Event listeners
// document.querySelector('.next').addEventListener('click', nextHero);
// document.querySelector('.prev').addEventListener('click', prevHero);

// // Auto Slide
// function heroAuto() {
//   heroTimer = setInterval(nextHero, slideInterval);
// }

// function resetHeroAuto() {
//   clearInterval(heroTimer);
//   heroAuto();
// }

// // Pause on hover
// const heroWrapper = document.getElementById('heroSlider');
// heroWrapper.addEventListener('mouseenter', () => clearInterval(heroTimer));
// heroWrapper.addEventListener('mouseleave', heroAuto);

// // Init
// renderHeroDots();
// showHero(0);
// heroAuto();


// /* ---------- Program Carousel ---------- */
// const track = document.getElementById('progTrack');
// let progIndex = 0;
// const cardCount = track.children.length;
// const cardsVisible = 3;

// function updateCarousel() {
//   const cardWidth = track.children[0].offsetWidth + 14; 
//   track.style.transform = `translateX(-${progIndex * cardWidth}px)`;
// }

// document.querySelector('.c-next').onclick = () => {
//   if (progIndex < cardCount - cardsVisible) progIndex++;
//   else progIndex = 0;
//   updateCarousel();
// };

// document.querySelector('.c-prev').onclick = () => {
//   if (progIndex > 0) progIndex--;
//   else progIndex = cardCount - cardsVisible;
//   updateCarousel();
// };

// // Auto-slide every 4 seconds
// setInterval(() => {
//   if (progIndex < cardCount - cardsVisible) progIndex++;
//   else progIndex = 0;
//   updateCarousel();
// }, 4000);

// // Initial position
// updateCarousel();


/* =========================================================
   PREMIUM BANNER SLIDER
   BAL DURGA PUJA SAMITI
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const slider =
      document.getElementById(
        "bannerSlider"
      );

    const track =
      document.getElementById(
        "bannerTrack"
      );

    if (!slider || !track) {
      return;
    }


    const slides =
      Array.from(
        track.querySelectorAll(
          ".banner-slide"
        )
      );


    if (!slides.length) {
      return;
    }


    const prevButton =
      slider.querySelector(
        ".banner-prev"
      );


    const nextButton =
      slider.querySelector(
        ".banner-next"
      );


    const progress =
      document.getElementById(
        "bannerProgress"
      );


    const currentCounter =
      document.getElementById(
        "bannerCurrent"
      );


    const totalCounter =
      document.getElementById(
        "bannerTotal"
      );


    /* =====================================================
       SETTINGS
       ===================================================== */

    const AUTOPLAY_TIME =
      5500;


    const SWIPE_THRESHOLD =
      0.15;


    let currentIndex = 0;

    let autoplayFrame = null;

    let progressStart = null;

    let isPointerDown = false;

    let startX = 0;

    let currentX = 0;

    let dragDistance = 0;


    /* =====================================================
       TOTAL SLIDES
       ===================================================== */

    totalCounter.textContent =
      String(
        slides.length
      ).padStart(
        2,
        "0"
      );


    /* =====================================================
       ACTIVE SLIDE
       ===================================================== */

    function updateActiveSlide() {

      slides.forEach(
        function (slide, index) {

          slide.classList.toggle(
            "active",
            index === currentIndex
          );

        }
      );

    }


    /* =====================================================
       UPDATE COUNTER
       ===================================================== */

    function updateCounter() {

      currentCounter.textContent =
        String(
          currentIndex + 1
        ).padStart(
          2,
          "0"
        );

    }


    /* =====================================================
       GO TO SLIDE
       ===================================================== */

    function goToSlide(
      newIndex,
      restart = true
    ) {


      /* -----------------------------------------------
         Loop backwards
         ----------------------------------------------- */

      if (
        newIndex < 0
      ) {

        newIndex =
          slides.length - 1;

      }


      /* -----------------------------------------------
         Loop forwards
         ----------------------------------------------- */

      if (
        newIndex >=
        slides.length
      ) {

        newIndex = 0;

      }


      currentIndex =
        newIndex;


      /* -----------------------------------------------
         Move track
         ----------------------------------------------- */

      track.style.transform =
        `translate3d(
          -${currentIndex * 100}%,
          0,
          0
        )`;


      updateActiveSlide();

      updateCounter();


      if (restart) {

        restartAutoplay();

      }

    }


    /* =====================================================
       NEXT
       ===================================================== */

    function nextSlide() {

      goToSlide(
        currentIndex + 1
      );

    }


    /* =====================================================
       PREVIOUS
       ===================================================== */

    function previousSlide() {

      goToSlide(
        currentIndex - 1
      );

    }


    /* =====================================================
       BUTTON EVENTS
       ===================================================== */

    if (nextButton) {

      nextButton.addEventListener(
        "click",
        function () {

          nextSlide();

        }
      );

    }


    if (prevButton) {

      prevButton.addEventListener(
        "click",
        function () {

          previousSlide();

        }
      );

    }


    /* =====================================================
       AUTOPLAY PROGRESS
       ===================================================== */

    function animateProgress(
      timestamp
    ) {


      if (!progressStart) {

        progressStart =
          timestamp;

      }


      const elapsed =
        timestamp -
        progressStart;


      const percentage =
        Math.min(
          (
            elapsed /
            AUTOPLAY_TIME
          ) * 100,
          100
        );


      if (progress) {

        progress.style.width =
          `${percentage}%`;

      }


      /* -----------------------------------------------
         Move to next slide
         ----------------------------------------------- */

      if (
        elapsed >=
        AUTOPLAY_TIME
      ) {

        nextSlide();

        return;

      }


      autoplayFrame =
        requestAnimationFrame(
          animateProgress
        );

    }


    /* =====================================================
       START AUTOPLAY
       ===================================================== */

    function startAutoplay() {

      cancelAnimationFrame(
        autoplayFrame
      );


      progressStart =
        null;


      if (progress) {

        progress.style.width =
          "0%";

      }


      autoplayFrame =
        requestAnimationFrame(
          animateProgress
        );

    }


    /* =====================================================
       STOP AUTOPLAY
       ===================================================== */

    function stopAutoplay() {

      cancelAnimationFrame(
        autoplayFrame
      );

    }


    /* =====================================================
       RESTART AUTOPLAY
       ===================================================== */

    function restartAutoplay() {

      stopAutoplay();

      startAutoplay();

    }


    /* =====================================================
       DESKTOP HOVER
       Pause while mouse is over slider.
       ===================================================== */

    slider.addEventListener(
      "mouseenter",
      function () {

        stopAutoplay();

      }
    );


    slider.addEventListener(
      "mouseleave",
      function () {

        restartAutoplay();

      }
    );


    /* =====================================================
       POINTER DOWN
       Mouse + Touch
       ===================================================== */

    slider.addEventListener(
      "pointerdown",
      function (event) {

        /*
          Ignore right mouse button.
        */

        if (
          event.pointerType === "mouse" &&
          event.button !== 0
        ) {

          return;

        }


        isPointerDown =
          true;


        startX =
          event.clientX;


        currentX =
          startX;


        dragDistance =
          0;


        /*
          Stop autoplay while dragging.
        */

        stopAutoplay();


        /*
          Capture pointer.
        */

        try {

          slider.setPointerCapture(
            event.pointerId
          );

        } catch (error) {
          // Safe fallback
        }

      }
    );


    /* =====================================================
       POINTER MOVE
       ===================================================== */

    slider.addEventListener(
      "pointermove",
      function (event) {

        if (!isPointerDown) {
          return;
        }


        currentX =
          event.clientX;


        dragDistance =
          currentX -
          startX;


        /*
          Temporary drag movement.
        */

        const sliderWidth =
          slider.offsetWidth;


        if (!sliderWidth) {
          return;
        }


        const dragPercentage =
          (
            dragDistance /
            sliderWidth
          ) * 100;


        const basePosition =
          -(currentIndex * 100);


        /*
          Remove transition while dragging.
        */

        track.style.transition =
          "none";


        track.style.transform =
          `translate3d(
            ${basePosition + dragPercentage}%,
            0,
            0
          )`;

      }
    );


    /* =====================================================
       FINISH DRAG
       ===================================================== */

    function finishDrag(
      event
    ) {

      if (!isPointerDown) {
        return;
      }


      isPointerDown =
        false;


      /*
        Restore smooth transition.
      */

      track.style.transition =
        "";


      const sliderWidth =
        slider.offsetWidth;


      const threshold =
        sliderWidth *
        SWIPE_THRESHOLD;


      /* -----------------------------------------------
         Swipe LEFT
         ----------------------------------------------- */

      if (
        dragDistance <
        -threshold
      ) {

        nextSlide();

      }


      /* -----------------------------------------------
         Swipe RIGHT
         ----------------------------------------------- */

      else if (
        dragDistance >
        threshold
      ) {

        previousSlide();

      }


      /* -----------------------------------------------
         Small movement = snap back
         ----------------------------------------------- */

      else {

        goToSlide(
          currentIndex,
          false
        );

        restartAutoplay();

      }


      dragDistance =
        0;


      /*
        Release pointer capture.
      */

      try {

        if (
          event &&
          slider.hasPointerCapture(
            event.pointerId
          )
        ) {

          slider.releasePointerCapture(
            event.pointerId
          );

        }

      } catch (error) {
        // Safe fallback
      }

    }


    /* =====================================================
       POINTER UP
       ===================================================== */

    slider.addEventListener(
      "pointerup",
      finishDrag
    );


    /* =====================================================
       POINTER CANCEL
       ===================================================== */

    slider.addEventListener(
      "pointercancel",
      finishDrag
    );


    /* =====================================================
       KEYBOARD CONTROL
       ===================================================== */

    document.addEventListener(
      "keydown",
      function (event) {

        /*
          Don't control slider when typing.
        */

        const activeElement =
          document.activeElement;


        const tagName =
          activeElement
            ? activeElement.tagName
            : "";


        if (
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT"
        ) {

          return;

        }


        if (
          event.key ===
          "ArrowRight"
        ) {

          nextSlide();

        }


        if (
          event.key ===
          "ArrowLeft"
        ) {

          previousSlide();

        }

      }
    );


    /* =====================================================
       VISIBILITY API
       Stop autoplay when tab hidden.
       ===================================================== */

    document.addEventListener(
      "visibilitychange",
      function () {

        if (
          document.hidden
        ) {

          stopAutoplay();

        } else {

          restartAutoplay();

        }

      }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    goToSlide(
      0,
      false
    );


    updateActiveSlide();

    updateCounter();

    startAutoplay();

  }
);

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


