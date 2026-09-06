/* site.js — Absolute Zero FTC #12096
 *
 * No dependencies. Everything degrades to working HTML without it.
 * Scroll and pointer listeners are passive and rAF-throttled with a
 * boolean-flip guard, so the class operation runs once per state change
 * rather than once per event.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var coarse = window.matchMedia("(pointer: coarse)");

  /* ---------------------------------------------------------------- *
   * 1. The snowflake island                                          *
   * ---------------------------------------------------------------- */

  function initNav() {
    var nav = document.querySelector("[data-nav]");
    if (!nav) return;

    var inner = nav.querySelector(".nav__inner");
    var bar = nav.querySelector(".nav__bar");
    var flake = nav.querySelector(".nav__flake");
    var menu = nav.querySelector(".nav__menu");
    var toggle = nav.querySelector(".nav__toggle");
    var firstLink = nav.querySelector(".nav__link");
    if (!inner || !bar || !flake) return;

    var THRESHOLD = 88;
    var GRACE = 400;

    var isFlake = false;
    var isOpen = false;
    var graceTimer = null;

    /* Measure the collapsed capsule once the font has settled, so the
       pill contracts to exactly the width of its own content. */
    function measureFlake() {
      var prevVis = flake.style.visibility;
      var prevOpacity = flake.style.opacity;
      var prevPos = flake.style.position;
      flake.style.visibility = "hidden";
      flake.style.opacity = "1";
      flake.style.position = "static";
      var w = flake.getBoundingClientRect().width;
      flake.style.visibility = prevVis;
      flake.style.opacity = prevOpacity;
      flake.style.position = prevPos;
      if (w > 0) {
        nav.style.setProperty("--nav-flake-w", Math.ceil(w + 20) + "px");
      }
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureFlake);
    }
    measureFlake();

    /* inert keeps the hidden half out of the tab order without hiding it
       from the transition. */
    function syncInert() {
      var barHidden = isFlake && !isOpen;
      if ("inert" in HTMLElement.prototype) {
        bar.inert = barHidden;
        flake.inert = !barHidden;
      }
      flake.setAttribute("aria-expanded", barHidden ? "false" : "true");
      flake.setAttribute("tabindex", barHidden ? "0" : "-1");
    }

    function setFlake(next) {
      if (next === isFlake) return;
      isFlake = next;
      nav.classList.toggle("is-flake", isFlake);
      if (!isFlake) setOpen(false, false);
      syncInert();
    }

    function setOpen(next, moveFocus) {
      if (next === isOpen) return;
      isOpen = next;
      nav.classList.toggle("is-open", isOpen);
      syncInert();
      if (isOpen && moveFocus && firstLink) firstLink.focus();
    }

    function clearGrace() {
      if (graceTimer) { clearTimeout(graceTimer); graceTimer = null; }
    }

    /* --- scroll ---------------------------------------------------- */
    var scrollTicking = false;
    function onScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(function () {
        setFlake(window.scrollY > THRESHOLD);
        scrollTicking = false;
      });
    }

    /* --- proximity (fine pointers only) ---------------------------- */
    var pointerTicking = false;
    var lastX = 0, lastY = 0;

    function evaluateProximity() {
      if (!isFlake) return;
      var r = inner.getBoundingClientRect();
      var radius = parseInt(
        getComputedStyle(nav).getPropertyValue("--nav-proximity"), 10
      ) || 150;
      var dx = Math.max(r.left - lastX, 0, lastX - r.right);
      var dy = Math.max(r.top - lastY, 0, lastY - r.bottom);
      var near = Math.sqrt(dx * dx + dy * dy) < radius;

      if (near) {
        clearGrace();
        setOpen(true, false);
      } else if (isOpen && !nav.contains(document.activeElement)) {
        clearGrace();
        graceTimer = setTimeout(function () { setOpen(false, false); }, GRACE);
      }
    }

    function onPointerMove(e) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (pointerTicking) return;
      pointerTicking = true;
      requestAnimationFrame(function () {
        evaluateProximity();
        pointerTicking = false;
      });
    }

    /* --- activation ------------------------------------------------ */
    flake.addEventListener("click", function () {
      clearGrace();
      setOpen(!isOpen, true);
    });

    nav.addEventListener("focusin", function () {
      clearGrace();
      if (isFlake && document.activeElement !== flake) setOpen(true, false);
    });

    nav.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (!nav.contains(document.activeElement) && isFlake && !nav.matches(":hover")) {
          setOpen(false, false);
        }
      }, 0);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (nav.classList.contains("is-menu-open")) {
        closeMenu();
        if (toggle) toggle.focus();
      } else if (isOpen && isFlake) {
        setOpen(false, false);
        flake.focus();
      }
    });

    /* --- narrow-viewport disclosure -------------------------------- */
    function openMenu() {
      nav.classList.add("is-menu-open");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
      if (menu) menu.removeAttribute("aria-hidden");
    }
    function closeMenu() {
      nav.classList.remove("is-menu-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (nav.classList.contains("is-menu-open")) closeMenu();
        else { setOpen(true, false); openMenu(); }
      });
    }
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-menu-open") && !nav.contains(e.target)) closeMenu();
    });

    /* --- wire up ---------------------------------------------------- */
    if (!reduceMotion.matches) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      if (!coarse.matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }
    }

    window.addEventListener("resize", function () {
      measureFlake();
      if (window.innerWidth >= 1024) closeMenu();
    }, { passive: true });

    reduceMotion.addEventListener("change", function () {
      if (reduceMotion.matches) { setFlake(false); setOpen(false, false); }
    });

    syncInert();
  }

  /* ---------------------------------------------------------------- *
   * 2. Scroll reveal — once, and only when motion is welcome          *
   * ---------------------------------------------------------------- */

  function initReveal() {
    var items = document.querySelectorAll(".reveal-on-scroll");
    if (!items.length) return;
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------- *
   * 3. Disclosure groups                                              *
   * ---------------------------------------------------------------- */

  function initDisclosures() {
    document.querySelectorAll("[data-qa-toggle]").forEach(function (btn) {
      var group = btn.closest(".qa");
      if (group && btn.getAttribute("aria-expanded") === "true") group.classList.add("is-open");
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        if (group) group.classList.toggle("is-open", !open);
      });
    });
  }

  /* ---------------------------------------------------------------- *
   * 4. Segmented filters (season, role)                               *
   *                                                                    *
   * Buttons, not radios, so nothing scroll-jumps on click. Arrow keys  *
   * move selection; the URL hash keeps a chosen season shareable.      *
   * ---------------------------------------------------------------- */

  function initFilters() {
    document.querySelectorAll("[data-filter-group]").forEach(function (group) {
      var key = group.getAttribute("data-filter-group");
      var btns = Array.prototype.slice.call(group.querySelectorAll(".segmented__btn"));
      var panelSel = group.getAttribute("data-filter-target");
      var panel = panelSel ? document.querySelector(panelSel) : null;
      if (!btns.length || !panel) return;

      var items = Array.prototype.slice.call(panel.querySelectorAll("[data-" + key + "]"));
      var empty = panel.querySelector("[data-filter-empty]");
      var live = group.querySelector("[data-filter-live]");

      function apply(value, announce) {
        var shown = 0;
        btns.forEach(function (b) {
          var on = b.getAttribute("data-value") === value;
          b.setAttribute("aria-selected", String(on));
          b.setAttribute("tabindex", on ? "0" : "-1");
        });
        items.forEach(function (item) {
          var v = item.getAttribute("data-" + key) || "";
          var on = value === "all" || v.split(" ").indexOf(value) !== -1;
          item.hidden = !on;
          if (on) shown++;
        });
        if (empty) empty.hidden = shown !== 0;
        if (live && announce) {
          live.textContent = shown + (shown === 1 ? " item shown." : " items shown.");
        }
      }

      btns.forEach(function (b, i) {
        b.addEventListener("click", function () {
          apply(b.getAttribute("data-value"), true);
          b.focus({ preventScroll: true });
          if (history.replaceState) {
            history.replaceState(null, "", "#" + key + "=" + b.getAttribute("data-value"));
          }
        });
        b.addEventListener("keydown", function (e) {
          var dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!dir) return;
          e.preventDefault();
          var next = btns[(i + dir + btns.length) % btns.length];
          next.click();
        });
      });

      var initial = null;
      var m = location.hash.match(new RegExp("#" + key + "=([^&]+)"));
      if (m) {
        var candidate = decodeURIComponent(m[1]);
        if (btns.some(function (b) { return b.getAttribute("data-value") === candidate; })) {
          initial = candidate;
        }
      }
      if (!initial) {
        var preset = btns.filter(function (b) { return b.getAttribute("aria-selected") === "true"; })[0];
        initial = preset ? preset.getAttribute("data-value") : btns[0].getAttribute("data-value");
      }
      apply(initial, false);
    });
  }

  /* ---------------------------------------------------------------- *
   * 5. Boot                                                           *
   * ---------------------------------------------------------------- */

  function boot() {
    initNav();
    initReveal();
    initDisclosures();
    initFilters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
