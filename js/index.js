document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const body = document.body;
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".site-navigation");
  const navigationLinks = document.querySelectorAll(".site-navigation a");

  window.dataLayer = window.dataLayer || [];

  function pushTrackingEvent(element) {
    const eventName = element.dataset.trackEvent;

    if (!eventName) {
      return;
    }

    const payload = {
      event: eventName,
      event_category: "engagement",
      event_label:
        element.dataset.gaLabel ||
        element.getAttribute("aria-label") ||
        element.textContent.trim() ||
        "",
      link_url: element.getAttribute("href") || "",
      page_location: window.location.href,
      page_title: document.title,
    };

    window.dataLayer.push(payload);
    console.info("dataLayer event:", payload);
  }

  function closeMenu() {
    if (!menuButton || !navigation) {
      return;
    }
    menuButtonText.textContent = "Menu";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    navigation.classList.remove("is-open");
    body.classList.remove("is-menu-open");
  }

  const menuButtonText = menuButton.querySelector(".menu-button__text");

  function toggleMenu() {
    if (!menuButton || !navigation) {
      return;
    }
    menuButtonText.textContent = isOpen ? "Menu" : "Close";

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));

    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");

    navigation.classList.toggle("is-open", !isOpen);
    body.classList.toggle("is-menu-open", !isOpen);
  }

  function initNavigation() {
    if (!menuButton || !navigation) {
      return;
    }

    menuButton.addEventListener("click", toggleMenu);

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 767) {
        closeMenu();
      }
    });
  }

  function initTracking() {
    const trackedElements = document.querySelectorAll("[data-track-event]");

    trackedElements.forEach(function (element) {
      element.addEventListener("click", function () {
        pushTrackingEvent(element);
      });
    });
  }

  function initTabs() {
    const tabRoot = document.querySelector("[data-tabs]");

    if (!tabRoot) {
      return;
    }

    const tabButtons = Array.from(tabRoot.querySelectorAll("[data-tab]"));
    const tabPanels = Array.from(tabRoot.querySelectorAll("[data-panel]"));

    function activateTab(tabName) {
      tabButtons.forEach(function (button) {
        const isActive = button.dataset.tab === tabName;

        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
      });

      tabPanels.forEach(function (panel) {
        const isActive = panel.dataset.panel === tabName;

        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    }

    tabButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        activateTab(button.dataset.tab);
      });

      button.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
          return;
        }

        event.preventDefault();

        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex =
          (index + direction + tabButtons.length) % tabButtons.length;
        const nextButton = tabButtons[nextIndex];

        nextButton.focus();
        activateTab(nextButton.dataset.tab);
      });
    });
  }

  function initSlider() {
    const slider = document.querySelector("[data-slider]");

    if (!slider) {
      return;
    }

    const track = slider.querySelector(".project-slider__track");
    const slides = Array.from(slider.querySelectorAll("[data-slide]"));
    const dots = Array.from(slider.querySelectorAll("[data-slide-to]"));
    const previousButton = slider.querySelector("[data-slider-previous]");
    const nextButton = slider.querySelector("[data-slider-next]");

    let activeIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;

      track.style.transform = "translateX(-" + activeIndex * 100 + "%)";

      slides.forEach(function (slide, slideIndex) {
        const isActive = slideIndex === activeIndex;

        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      dots.forEach(function (dot, dotIndex) {
        const isActive = dotIndex === activeIndex;

        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", String(isActive));
      });
    }

    previousButton.addEventListener("click", function () {
      showSlide(activeIndex - 1);
    });

    nextButton.addEventListener("click", function () {
      showSlide(activeIndex + 1);
    });

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        showSlide(Number(dot.dataset.slideTo));
      });
    });

    slider.addEventListener(
      "touchstart",
      function (event) {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true },
    );

    slider.addEventListener(
      "touchend",
      function (event) {
        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 45) {
          return;
        }

        if (swipeDistance < 0) {
          showSlide(activeIndex + 1);
        } else {
          showSlide(activeIndex - 1);
        }
      },
      { passive: true },
    );

    showSlide(0);
  }

  initNavigation();
  initTracking();
  initTabs();
  initSlider();
});
