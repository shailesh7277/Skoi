/* =========================================================
   Shreekamal Oil Industries — Site scripts  (js/script.js)
   Requires: jQuery, Owl Carousel, Bootstrap bundle
   ========================================================= */
(function ($) {
  "use strict";

  /* ---- Preloader / splash: show for a few seconds, then fade out ---- */
  (function () {
    var pl = document.getElementById("preloader");
    if (!pl) return;
    var MIN_MS = 300; // splash duration = 0.30 second (change if you like)
    function hide() {
      pl.classList.add("hide");
      setTimeout(function () { pl.style.display = "none"; }, 400);
    }
    // hide after MIN_MS, or once the whole page has loaded (whichever is later)
    var start = Date.now();
    window.addEventListener("load", function () {
      var left = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(hide, left);
    });
    // safety fallback in case 'load' is delayed
    setTimeout(hide, MIN_MS + 4000);
  })();

  $(document).ready(function () {

    /* ---- Hero carousel ---- */
    $(".hero-carousel").owlCarousel({
      items: 1,
      loop: true,
      nav: false,          // manual arrows removed
      dots: false,         // manual dots removed
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: false,
      smartSpeed: 900,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false
    });

    /* ---- Customer reviews carousel ---- */
    $(".reviews-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4500,
      autoplayHoverPause: true,
      smartSpeed: 650,
      navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 3 } }
    });

    /* ---- Testimonials / logos carousel (if present) ---- */
    $(".logo-carousel").owlCarousel({
      loop: true,
      margin: 24,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 2500,
      responsive: { 0: { items: 2 }, 576: { items: 3 }, 768: { items: 4 }, 992: { items: 5 } }
    });

    /* ---- Navbar active state by filename ---- */
    var page = location.pathname.split("/").pop() || "index.html";
    $(".navbar .nav-item").each(function () {
      var href = $(this).find("a").attr("href");
      if (href === page) $(this).addClass("active");
    });

    /* ---- Back to top ---- */
    var $toTop = $("#toTop");
    $(window).on("scroll", function () {
      $toTop.toggleClass("show", $(this).scrollTop() > 400);
    });
    $toTop.on("click", function () {
      $("html,body").animate({ scrollTop: 0 }, 500);
    });

  });

  /* ---- Animated counters (vanilla, runs on scroll into view) ---- */
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = Math.round(target * eased).toLocaleString("en-IN") + '<span class="suf">' + suffix + '</span>';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var counters = document.querySelectorAll(".count[data-target]");
    if ("IntersectionObserver" in window && counters.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(runCounter);
    }

    /* ---- Reveal on scroll (adds animate.css classes) ---- */
    var reveals = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window && reveals.length) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var anim = e.target.getAttribute("data-reveal") || "fadeInUp";
            e.target.classList.add("animate__animated", "animate__" + anim);
            e.target.style.visibility = "visible";
            ro.unobserve(e.target);
          }
        });
      }, { threshold: 0.14 });
      reveals.forEach(function (r) { r.style.visibility = "hidden"; ro.observe(r); });
    }

    /* ---- Contact / enquiry form (front-end demo) ---- */
    var form = document.querySelector("#enquiryForm");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var msg = form.querySelector(".form-msg");
        var name = (form.querySelector('[name="name"]') || {}).value || "";
        var phone = (form.querySelector('[name="phone"]') || {}).value || "";
        if (!name.trim() || !phone.trim()) {
          msg.textContent = "Please enter your name and phone number.";
          msg.style.background = "#fbe8cf"; msg.style.color = "#8a5a00";
          msg.classList.add("show"); return;
        }
        msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, ' + name +
          '! Your enquiry has been received. (Connect this form to email/CRM to receive it live.)';
        msg.style.background = "#e6f3e6"; msg.style.color = "#14672f";
        msg.classList.add("show");
        form.reset();
      });
    }
  });

})(jQuery);