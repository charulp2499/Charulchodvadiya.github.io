/**
 * Enhanced MyResume JS
 * Optimized for Dark Theme + Modern UI
 * Author: Upgraded by GPT-5
 */

(function () {
  "use strict";

  /** ---------------------------
   * Helper Functions
   ---------------------------- */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      all
        ? selectEl.forEach((e) => e.addEventListener(type, listener))
        : selectEl.addEventListener(type, listener);
    }
  };

  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

  /** ---------------------------
   * Throttle Utility for Scroll
   ---------------------------- */
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  /** ---------------------------
   * Navbar Links Active State
   ---------------------------- */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, throttle(navbarlinksActive, 100));

  /** ---------------------------
   * Smooth Scroll
   ---------------------------- */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /** ---------------------------
   * Back to Top Button
   ---------------------------- */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, throttle(toggleBacktotop, 100));
  }

  /** ---------------------------
   * Mobile Nav Toggle
   ---------------------------- */
  on("click", ".mobile-nav-toggle", function () {
    let body = select("body");
    body.classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");

    // Smooth fade effect for menu
    const navMenu = select("#navbar");
    navMenu.classList.toggle("fade-in");
  });

  /** ---------------------------
   * Scrollto on Click
   ---------------------------- */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /** ---------------------------
   * Scrollto on Page Load
   ---------------------------- */
  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /** ---------------------------
   * Preloader (Fade Out)
   ---------------------------- */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("fade-out");
      setTimeout(() => preloader.remove(), 500);
    });
  }

  /** ---------------------------
   * Hero Typing Effect
   ---------------------------- */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /** ---------------------------
   * Skills Animation
   ---------------------------- */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function () {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
          el.classList.add("animate-skill");
        });
      },
    });
  }

  /** ---------------------------
   * Portfolio Filtering
   ---------------------------- */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);
      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach((el) => el.classList.remove("filter-active"));
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", () => {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /** ---------------------------
   * Lightbox Init
   ---------------------------- */
  GLightbox({ selector: ".portfolio-lightbox" });
  GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /** ---------------------------
   * Sliders
   ---------------------------- */
  new Swiper(".portfolio-details-slider", {
    speed: 500,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
  });

  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: "auto",
    pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
  });

  /** ---------------------------
   * Scroll Animations
   ---------------------------- */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /** ---------------------------
   * Counters
   ---------------------------- */
  new PureCounter();
})();
