    (() => {
      'use strict';
      const $  = (s, c = document) => c.querySelector(s);
      const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

      const nav = $('#nav');
      const onScroll = () => {
        if (!nav) return;
        if (window.scrollY > 24) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      const burger = $('#burger');
      const mobileMenu = $('#mobileMenu');
      if (burger && mobileMenu) {
        const setOpen = (open) => {
          burger.classList.toggle('is-open', open);
          mobileMenu.classList.toggle('is-open', open);
          mobileMenu.setAttribute('aria-hidden', String(!open));
          document.body.style.overflow = open ? 'hidden' : '';
        };
        burger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
      }


      const reveals = $$('.reveal');
      const showReveal = (el) => {
        if (el.classList.contains('is-in')) return;
        const explicit = el.getAttribute('data-reveal-delay');
        if (explicit) el.style.setProperty('--reveal-delay', explicit + 'ms');
        el.classList.add('is-in');
      };
      if ('IntersectionObserver' in window && reveals.length) {
        try {
          const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              showReveal(entry.target);
              io.unobserve(entry.target);
            });
          }, { threshold: 0.06, rootMargin: '0px 0px -10px 0px' });
          reveals.forEach((el) => io.observe(el));
          setTimeout(() => {
            reveals.forEach((el) => { if (!el.classList.contains('is-in')) showReveal(el); });
          }, 2500);
        } catch (e) {
          reveals.forEach((el) => showReveal(el));
        }
      } else {
        reveals.forEach((el) => showReveal(el));
      }

      const toggleBtns = $$('.toggle__btn');
      const plansPerItem = $('#plansPerItem');
      const plansCombos = $('#plansCombos');
      if (toggleBtns.length && plansPerItem && plansCombos) {
        toggleBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            toggleBtns.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const bill = btn.getAttribute('data-bill');
            if (bill === 'combos') {
              plansPerItem.classList.add('is-hidden');
              plansCombos.classList.remove('is-hidden');
            } else {
              plansCombos.classList.add('is-hidden');
              plansPerItem.classList.remove('is-hidden');
            }
          });
        });
      }

      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (!href || href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      });
    })();