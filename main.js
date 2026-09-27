
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
















/* =========================================================
   BAAL DURGA PUJA SAMITI
   PREMIUM GOOGLE DRIVE GALLERY
   - Year filter
   - Category filter
   - 10 photos per page
   - Pagination
   - Premium lightbox
   - Parent folder name
   - Keyboard navigation
   - Mobile swipe
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       1. GOOGLE APPS SCRIPT API
    ===================================================== */

    const GALLERY_API_URL =
        "https://script.google.com/macros/s/AKfycbw7hYQud0Uepb8ZxzFW1dD-BdvVx8hNRpyrnYxKYIWBAFwC_BqKsu-weCrfu6zDWfskMQ/exec";


    /* =====================================================
       2. SETTINGS
    ===================================================== */

    const PHOTOS_PER_PAGE = 10;


    /* =====================================================
       3. STATE
    ===================================================== */

    let galleryData = {};

    let allImages = [];

    let filteredImages = [];

    let currentYear = "all";

    let currentCategory = "all";

    let currentPage = 1;

    let currentLightboxIndex = 0;

    let touchStartX = 0;

    let touchStartY = 0;


    /* =====================================================
       4. DOM ELEMENTS
    ===================================================== */

    const galleryGrid =
        document.getElementById("galleryGrid");

    const galleryStatus =
        document.getElementById("galleryStatus");

    const galleryYearFilters =
        document.getElementById("galleryYearFilters");

    const galleryCategoryFilters =
        document.getElementById("galleryCategoryFilters");

    const galleryPagination =
        document.getElementById("galleryPagination");

    const galleryCount =
        document.getElementById("galleryCount");


    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCurrent =
        document.getElementById("lightboxCurrent");

    const lightboxTotal =
        document.getElementById("lightboxTotal");

    const lightboxFolder =
        document.getElementById("lightboxFolder");

    const lightboxYear =
        document.getElementById("lightboxYear");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    /* =====================================================
       5. CATEGORY ORDER
    ===================================================== */

    const CATEGORY_ORDER = [
        "Pandal",
        "Programs",
        "Puja/Aarti",
        "Samiti",
        "Visarjan",
        "Other"
    ];


    /* =====================================================
       6. START GALLERY
    ===================================================== */

    function initGallery() {

        if (!galleryGrid) {
            return;
        }

        showGalleryLoading();

        fetchGallery();

    }


    /* =====================================================
       7. FETCH API
    ===================================================== */

    async function fetchGallery() {

        try {

            if (
                !GALLERY_API_URL ||
                GALLERY_API_URL ===
                "YOUR_APPS_SCRIPT_EXEC_URL"
            ) {

                throw new Error(
                    "Gallery API URL is not configured."
                );

            }


            const response =
                await fetch(
                    GALLERY_API_URL,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Gallery API request failed."
                );

            }


            const data =
                await response.json();


            if (
                !data ||
                data.success !== true
            ) {

                throw new Error(
                    data?.error ||
                    "Gallery API returned an invalid response."
                );

            }


            galleryData =
                data.gallery || {};


            prepareGalleryData();

        } catch (error) {

            console.error(
                "Gallery Error:",
                error
            );

            showGalleryError();

        }

    }


    /* =====================================================
       8. PREPARE ALL IMAGES
    ===================================================== */

    function prepareGalleryData() {

        allImages = [];


        Object.keys(galleryData).forEach(
            function (year) {

                const categories =
                    galleryData[year] || {};


                Object.keys(categories).forEach(
                    function (category) {

                        const images =
                            categories[category] || [];


                        images.forEach(
                            function (image) {

                                if (!image) {
                                    return;
                                }


                                const normalizedImage = {

                                    ...image,

                                    year:
                                        image.year ||
                                        year,

                                    category:
                                        image.category ||
                                        category,

                                    parentFolder:
                                        image.parentFolder ||
                                        image.category ||
                                        category

                                };


                                if (
                                    normalizedImage.url ||
                                    normalizedImage.thumbnail
                                ) {

                                    allImages.push(
                                        normalizedImage
                                    );

                                }

                            }
                        );

                    }
                );

            }
        );


        /*
         * Newest year first
         */

        allImages.sort(
            function (a, b) {

                const yearA =
                    Number(a.year) || 0;

                const yearB =
                    Number(b.year) || 0;

                return yearB - yearA;

            }
        );


        renderYearFilters();

        renderCategoryFilters();

        applyGalleryFilters();

    }


    /* =====================================================
       9. YEAR FILTERS
    ===================================================== */

    function renderYearFilters() {

        if (!galleryYearFilters) {
            return;
        }


        galleryYearFilters.innerHTML = "";


        const allButton =
            createFilterButton(
                "सभी",
                "all",
                true
            );


        galleryYearFilters.appendChild(
            allButton
        );


        const years =
            Object.keys(galleryData)
                .sort(
                    function (a, b) {
                        return Number(b) - Number(a);
                    }
                );


        years.forEach(
            function (year) {

                const button =
                    createFilterButton(
                        year,
                        year,
                        false
                    );


                galleryYearFilters.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       10. CATEGORY FILTERS
    ===================================================== */

    function renderCategoryFilters() {

        if (!galleryCategoryFilters) {
            return;
        }


        galleryCategoryFilters.innerHTML = "";


        const allButton =
            createFilterButton(
                "सभी",
                "all",
                true
            );


        galleryCategoryFilters.appendChild(
            allButton
        );


        CATEGORY_ORDER.forEach(
            function (category) {

                const exists =
                    allImages.some(
                        function (image) {
                            return (
                                image.category ===
                                category
                            );
                        }
                    );


                if (!exists) {
                    return;
                }


                const button =
                    createFilterButton(
                        category,
                        category,
                        false
                    );


                galleryCategoryFilters.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       11. CREATE FILTER BUTTON
    ===================================================== */

    function createFilterButton(
        label,
        value,
        active
    ) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "gallery-filter-btn";


        if (active) {

            button.classList.add(
                "active"
            );

        }


        button.textContent = label;


        button.dataset.value =
            value;


        button.addEventListener(
            "click",
            function () {

                const parent =
                    button.parentElement;


                parent
                    .querySelectorAll(
                        ".gallery-filter-btn"
                    )
                    .forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                button.classList.add(
                    "active"
                );


                if (
                    parent ===
                    galleryYearFilters
                ) {

                    currentYear =
                        value;

                } else {

                    currentCategory =
                        value;

                }


                currentPage = 1;


                applyGalleryFilters();

            }
        );


        return button;

    }


    /* =====================================================
       12. APPLY FILTERS
    ===================================================== */

    function applyGalleryFilters() {

        filteredImages =
            allImages.filter(
                function (image) {

                    const yearMatch =
                        currentYear === "all" ||
                        String(image.year) ===
                        String(currentYear);


                    const categoryMatch =
                        currentCategory === "all" ||
                        image.category ===
                        currentCategory;


                    return (
                        yearMatch &&
                        categoryMatch
                    );

                }
            );


        currentPage = 1;


        updateGalleryCount();

        renderGallery();

        renderPagination();

    }


    /* =====================================================
       13. TOTAL COUNTER
    ===================================================== */

    function updateGalleryCount() {

        if (!galleryCount) {
            return;
        }


        const total =
            filteredImages.length;


        galleryCount.textContent =
            String(total).padStart(2, "0");

    }


    /* =====================================================
       14. RENDER GALLERY
    ===================================================== */

    function renderGallery() {

        if (!galleryGrid) {
            return;
        }


        galleryGrid.innerHTML = "";


        if (!filteredImages.length) {

            galleryGrid.innerHTML = `

                <div class="gallery-empty">

                    <div class="gallery-empty-icon">
                        ✦
                    </div>

                    <strong>
                        इस चयन में कोई तस्वीर उपलब्ध नहीं है
                    </strong>

                    <span>
                        कृपया कोई दूसरा वर्ष या श्रेणी चुनें।
                    </span>

                </div>

            `;


            updateStatus(
                "कोई तस्वीर नहीं मिली"
            );


            return;

        }


        const startIndex =
            (currentPage - 1) *
            PHOTOS_PER_PAGE;


        const endIndex =
            startIndex +
            PHOTOS_PER_PAGE;


        const pageImages =
            filteredImages.slice(
                startIndex,
                endIndex
            );


        pageImages.forEach(
            function (image, index) {

                const globalIndex =
                    startIndex + index;


                const card =
                    createGalleryCard(
                        image,
                        globalIndex
                    );


                galleryGrid.appendChild(
                    card
                );

            }
        );


        const total =
            filteredImages.length;


        const first =
            startIndex + 1;


        const last =
            Math.min(
                endIndex,
                total
            );


        updateStatus(
            `${first}–${last} / ${total} तस्वीरें`
        );

    }


    /* =====================================================
       15. CREATE CARD
    ===================================================== */

    function createGalleryCard(
        image,
        index
    ) {

        const card =
            document.createElement("article");


        card.className =
            "gallery-card";


        card.setAttribute(
            "role",
            "button"
        );


        card.setAttribute(
            "tabindex",
            "0"
        );


        const imageSource =
            image.thumbnail ||
            image.url;


        const img =
            document.createElement("img");


        img.loading = "lazy";

        img.decoding = "async";

        img.src =
            imageSource;


        img.alt =
            image.name ||
            `${image.category || "Gallery"} ${image.year || ""}`;


        img.onerror =
            function () {

                if (
                    image.url &&
                    img.src !== image.url
                ) {

                    img.src =
                        image.url;

                }

            };


        card.appendChild(
            img
        );


        const info =
            document.createElement("div");


        info.className =
            "gallery-card-info";


        const category =
            document.createElement("span");


        category.className =
            "gallery-card-category";


        category.textContent =
            image.category ||
            image.parentFolder ||
            "Gallery";


        info.appendChild(
            category
        );


        card.appendChild(
            info
        );


        card.addEventListener(
            "click",
            function () {

                openLightbox(
                    index
                );

            }
        );


        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openLightbox(
                        index
                    );

                }

            }
        );


        return card;

    }


    /* =====================================================
       16. PAGINATION
    ===================================================== */

    function renderPagination() {

        if (!galleryPagination) {
            return;
        }


        galleryPagination.innerHTML = "";


        const totalPages =
            Math.ceil(
                filteredImages.length /
                PHOTOS_PER_PAGE
            );


        if (totalPages <= 1) {
            return;
        }


        /*
         * Previous
         */

        const previous =
            createPageButton(
                "‹",
                currentPage - 1,
                true
            );


        previous.classList.add(
            "gallery-page-arrow"
        );


        previous.disabled =
            currentPage === 1;


        galleryPagination.appendChild(
            previous
        );


        /*
         * Page numbers
         */

        const pages =
            getPaginationPages(
                currentPage,
                totalPages
            );


        pages.forEach(
            function (page) {

                if (page === "...") {

                    const dots =
                        document.createElement(
                            "span"
                        );


                    dots.className =
                        "gallery-page-dots";


                    dots.textContent =
                        "…";


                    galleryPagination.appendChild(
                        dots
                    );


                    return;

                }


                const button =
                    createPageButton(
                        page,
                        page,
                        false
                    );


                if (
                    page === currentPage
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                galleryPagination.appendChild(
                    button
                );

            }
        );


        /*
         * Next
         */

        const next =
            createPageButton(
                "›",
                currentPage + 1,
                true
            );


        next.classList.add(
            "gallery-page-arrow"
        );


        next.disabled =
            currentPage === totalPages;


        galleryPagination.appendChild(
            next
        );

    }


    /* =====================================================
       17. PAGINATION RANGE
    ===================================================== */

    function getPaginationPages(
        current,
        total
    ) {

        if (total <= 7) {

            return Array.from(
                {
                    length: total
                },
                function (_, index) {
                    return index + 1;
                }
            );

        }


        const pages = [];


        pages.push(1);


        if (current > 4) {

            pages.push("...");

        }


        const start =
            Math.max(
                2,
                current - 1
            );


        const end =
            Math.min(
                total - 1,
                current + 1
            );


        for (
            let page = start;
            page <= end;
            page++
        ) {

            pages.push(page);

        }


        if (current < total - 3) {

            pages.push("...");

        }


        pages.push(total);


        return pages;

    }


    /* =====================================================
       18. PAGE BUTTON
    ===================================================== */

    function createPageButton(
        text,
        page,
        isArrow
    ) {

        const button =
            document.createElement("button");


        button.type = "button";


        button.className =
            "gallery-page-btn";


        button.textContent =
            text;


        if (!isArrow) {

            button.setAttribute(
                "aria-label",
                `Page ${page}`
            );

        }


        button.addEventListener(
            "click",
            function () {

                if (
                    page < 1 ||
                    page >
                    Math.ceil(
                        filteredImages.length /
                        PHOTOS_PER_PAGE
                    )
                ) {

                    return;

                }


                currentPage =
                    page;


                renderGallery();

                renderPagination();


                /*
                 * Smoothly move to gallery
                 */

                const section =
                    document.getElementById(
                        "gallery"
                    );


                if (section) {

                    const top =
                        section.getBoundingClientRect().top +
                        window.scrollY -
                        85;


                    window.scrollTo({
                        top: top,
                        behavior: "smooth"
                    });

                }

            }
        );


        return button;

    }


    /* =====================================================
       19. LIGHTBOX OPEN
    ===================================================== */

    function openLightbox(
        index
    ) {

        if (
            !filteredImages.length ||
            !lightbox
        ) {

            return;

        }


        currentLightboxIndex =
            index;


        updateLightbox();


        lightbox.classList.add(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        /*
         * Focus close button
         */

        if (lightboxClose) {

            setTimeout(
                function () {

                    lightboxClose.focus();

                },
                100
            );

        }

    }


    /* =====================================================
       20. LIGHTBOX UPDATE
    ===================================================== */

    function updateLightbox() {

        const image =
            filteredImages[
                currentLightboxIndex
            ];


        if (!image) {
            return;
        }


        /*
         * Counter
         */

        if (lightboxCurrent) {

            lightboxCurrent.textContent =
                String(
                    currentLightboxIndex + 1
                ).padStart(2, "0");

        }


        if (lightboxTotal) {

            lightboxTotal.textContent =
                String(
                    filteredImages.length
                ).padStart(2, "0");

        }


        /*
         * Parent Drive Folder
         *
         * Example:
         * 2026 / Pandal / image.jpg
         *
         * Parent folder = Pandal
         */

        if (lightboxFolder) {

            lightboxFolder.textContent =
                image.parentFolder ||
                image.category ||
                "Gallery";

        }


        /*
         * Year
         */

        if (lightboxYear) {

            lightboxYear.textContent =
                image.year ||
                "";

        }


        /*
         * File name
         */

        if (lightboxTitle) {

            lightboxTitle.textContent =
                cleanFileName(
                    image.name ||
                    "Gallery Image"
                );

        }


        /*
         * Load image safely
         */

        loadLightboxImage(
            image
        );

    }


    /* =====================================================
       21. SAFE LIGHTBOX IMAGE LOADING
    ===================================================== */

    function loadLightboxImage(
        image
    ) {

        if (!lightboxImage) {
            return;
        }


        const sources = [];


        /*
         * Prefer high-quality Drive thumbnail.
         * Then original URL as fallback.
         */

        if (image.thumbnail) {

            sources.push(
                image.thumbnail
            );

        }


        if (
            image.url &&
            image.url !== image.thumbnail
        ) {

            sources.push(
                image.url
            );

        }


        let sourceIndex = 0;


        lightboxImage.onerror =
            function () {

                sourceIndex++;


                if (
                    sourceIndex <
                    sources.length
                ) {

                    lightboxImage.src =
                        sources[
                            sourceIndex
                        ];

                }

            };


        if (sources.length) {

            lightboxImage.src =
                sources[0];

        }


        lightboxImage.alt =
            image.name ||
            "Gallery Image";

    }


    /* =====================================================
       22. CLEAN FILE NAME
    ===================================================== */

    function cleanFileName(
        name
    ) {

        return String(name)
            .replace(
                /\.(jpg|jpeg|png|webp|gif|avif)$/i,
                ""
            )
            .replace(
                /[_-]+/g,
                " "
            )
            .trim();

    }


    /* =====================================================
       23. NEXT LIGHTBOX
    ===================================================== */

    function nextLightbox() {

        if (
            !filteredImages.length
        ) {

            return;

        }


        currentLightboxIndex =
            (
                currentLightboxIndex + 1
            ) %
            filteredImages.length;


        updateLightbox();

    }


    /* =====================================================
       24. PREVIOUS LIGHTBOX
    ===================================================== */

    function previousLightbox() {

        if (
            !filteredImages.length
        ) {

            return;

        }


        currentLightboxIndex =
            (
                currentLightboxIndex - 1 +
                filteredImages.length
            ) %
            filteredImages.length;


        updateLightbox();

    }


    /* =====================================================
       25. CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
         * Restore page scrolling
         */

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       26. LIGHTBOX BUTTONS
    ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            previousLightbox
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            nextLightbox
        );

    }


    /*
     * Click backdrop to close
     */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox ||
                    event.target.classList.contains(
                        "gallery-lightbox-backdrop"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       27. KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "open"
                )
            ) {

                return;

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                nextLightbox();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                previousLightbox();

            }


            if (
                event.key ===
                "Escape"
            ) {

                event.preventDefault();

                closeLightbox();

            }

        }
    );


    /* =====================================================
       28. MOBILE SWIPE
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            function (event) {

                const touch =
                    event.changedTouches[0];


                touchStartX =
                    touch.clientX;


                touchStartY =
                    touch.clientY;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            function (event) {

                const touch =
                    event.changedTouches[0];


                const deltaX =
                    touch.clientX -
                    touchStartX;


                const deltaY =
                    touch.clientY -
                    touchStartY;


                const minimumSwipe =
                    45;


                /*
                 * Only horizontal swipe
                 */

                if (
                    Math.abs(deltaX) >
                    minimumSwipe &&
                    Math.abs(deltaX) >
                    Math.abs(deltaY)
                ) {

                    if (deltaX < 0) {

                        nextLightbox();

                    } else {

                        previousLightbox();

                    }

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       29. STATUS
    ===================================================== */

    function updateStatus(
        text
    ) {

        if (!galleryStatus) {
            return;
        }


        galleryStatus.textContent =
            text;

    }


    /* =====================================================
       30. LOADING STATE
    ===================================================== */

    function showGalleryLoading() {

        if (!galleryGrid) {
            return;
        }


        galleryGrid.innerHTML = "";


        for (
            let i = 0;
            i < PHOTOS_PER_PAGE;
            i++
        ) {

            const skeleton =
                document.createElement("div");


            skeleton.className =
                "gallery-skeleton";


            galleryGrid.appendChild(
                skeleton
            );

        }


        updateStatus(
            "गैलरी लोड हो रही है..."
        );

    }


    /* =====================================================
       31. ERROR STATE
    ===================================================== */

    function showGalleryError() {

        if (!galleryGrid) {
            return;
        }


        galleryGrid.innerHTML = `

            <div class="gallery-empty">

                <div class="gallery-empty-icon">
                    !
                </div>

                <strong>
                    गैलरी लोड नहीं हो सकी
                </strong>

                <span>
                    कृपया कुछ समय बाद दोबारा प्रयास करें।
                </span>

            </div>

        `;


        updateStatus(
            "Gallery unavailable"
        );

    }


    /* =====================================================
       32. INIT
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initGallery
        );

    } else {

        initGallery();

    }


})();
