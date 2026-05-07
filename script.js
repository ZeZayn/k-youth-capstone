/* ============================================================
   LogiMas Sdn Bhd — Main JavaScript
   Includes:
     - Navbar scroll behaviour
     - Particle canvas animation
     - Count-up animation
     - AOS scroll animations init
     - HELPA chatbot widget
     - Contact form submission handler
   ============================================================ */

/* ── Navbar Scroll ────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  const ham = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (ham && mobileMenu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const page  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Particle Canvas ──────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = 55;
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.12 + 0.04
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,166,35,${p.o})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Count-Up Animation ───────────────────────────────────── */
(function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const isFloat = String(target).includes('.');
      const duration = 1800;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = target * ease;
        el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + (isFloat ? target.toFixed(1) : target) + suffix;
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
})();

/* ── AOS Init ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }

  // Why-LogiMas staggered fade-right via IntersectionObserver
  const whyItems = document.querySelectorAll('.why-item');
  if (whyItems.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    whyItems.forEach(el => obs.observe(el));
  }
});

/* ── Contact Form ─────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      const success = document.getElementById('form-success');
      if (success) { success.style.display = 'block'; }
      form.reset();
      btn.textContent = 'Send Enquiry →';
      btn.disabled = false;
      setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
    }, 900);
  });
})();

/* ── HELPA Chatbot ────────────────────────────────────────── */
(function initHelpa() {
  const btn     = document.getElementById('helpa-btn');
  const win     = document.getElementById('helpa-window');
  const closeBtn= document.getElementById('helpa-close');
  const input   = document.getElementById('helpa-input');
  const sendBtn = document.getElementById('helpa-send');
  const msgs    = document.getElementById('helpa-messages');
  const chips   = document.getElementById('helpa-chips');
  const badge   = document.getElementById('helpa-badge');
  if (!btn || !win) return;

  let isOpen = false;
  let welcomed = false;

  // Unread badge after 5s
  setTimeout(() => {
    if (!isOpen) { badge.style.display = 'block'; }
  }, 5000);

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    badge.style.display = 'none';
    if (isOpen && !welcomed) {
      welcomed = true;
      setTimeout(() => {
        addBotMsg("👋 Hi! I'm HELPA, LogiMas AI Assistant.\nHow can I help you today?\nYou can ask me in English or Bahasa Malaysia!");
        if (chips) chips.style.display = 'flex';
      }, 400);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      isOpen = false;
      win.classList.remove('open');
    });
  }

  // Quick chips
  if (chips) {
    chips.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        addUserMsg(text);
        chips.style.display = 'none';
        showTyping();
        setTimeout(() => {
          hideTyping();
          addBotMsg(getResponse(text));
        }, 900);
      });
    });
  }

  // Send button
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  function sendMessage() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    addUserMsg(text);
    input.value = '';
    if (chips) chips.style.display = 'none';
    showTyping();
    setTimeout(() => {
      hideTyping();
      addBotMsg(getResponse(text));
    }, 900 + Math.random() * 400);
  }

  function addBotMsg(text) {
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.innerHTML = `<div class="msg-bubble">${escHtml(text)}</div><div class="msg-time">${getTime()}</div>`;
    msgs.appendChild(div);
    scrollBottom();
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'msg user';
    div.innerHTML = `<div class="msg-bubble">${escHtml(text)}</div><div class="msg-time">${getTime()}</div>`;
    msgs.appendChild(div);
    scrollBottom();
  }

  function showTyping() {
    const t = document.getElementById('helpa-typing');
    if (t) t.classList.add('show');
    scrollBottom();
  }
  function hideTyping() {
    const t = document.getElementById('helpa-typing');
    if (t) t.classList.remove('show');
  }

  function scrollBottom() {
    setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
  }

  function getTime() {
    return new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' });
  }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }

  /* ── Rule-Based Response Engine ─────────────────────────── */
  function getResponse(text) {
    const t = text.toLowerCase();

    if (/damaged|rosak|barang rosak/.test(t)) {
      return `🔴 Damaged Parcel — SOP WH-001\nHere are the steps:\n1. Stop movement immediately\n2. Photo damage from 4 angles\n3. Attach RED tag\n4. Move to Damaged Goods Bay\n5. Fill Borang KR-01\n6. Notify supervisor within 15 mins\n7. Log in WMS under Damage Report\n\n❌ Do NOT dispatch damaged items.`;
    }
    if (/missing|hilang|parcel hilang/.test(t)) {
      return `🔍 Missing Parcel — SOP WH-004\nSteps to follow:\n1. Get tracking number from customer\n2. Check WMS scan history\n3. Physically check bin location\n4. Review CCTV with supervisor\n5. If not found after 2 hrs — escalate to CS Manager\n6. CS must update customer within 24 hours\n\n📌 SLA: Resolve within 3 working days`;
    }
    if (/stock|discrepancy|stok|perbezaan/.test(t)) {
      return `📦 Stock Discrepancy — SOP WH-002\nSteps:\n1. Recount item manually (min 2x)\n2. Check WMS scan log\n3. Check adjacent bin locations\n4. Fill Borang SD-03\n5. Notify supervisor IMMEDIATELY\n6. Supervisor escalates to Manager in 1 hour\n\n⚠️ Do NOT adjust WMS without manager approval.`;
    }
    if (/overtime|ot request|\bot\b|lebih masa/.test(t)) {
      return `⏰ Overtime Request — HR-SOP-001\nSteps:\n1. Submit via HR Google Form (on noticeboard)\n2. Apply at least 1 working day before\n3. Supervisor approves in system\n4. HR confirms via WhatsApp group\n\n📌 Max OT: 104 hrs/month\n💰 Rates: 1.5x normal | 2x rest day | 3x public holiday\n❌ OT without approval will NOT be paid.`;
    }
    if (/emergency|contact|nombor|kecemasan/.test(t)) {
      return `📋 Emergency Contacts:\n🏭 Klang: En. Razif — 012-384 7291\n🏭 Shah Alam: Puan Suraya — 011-2071 5583\n🏭 Subang: En. David — 016-947 3320\n🚚 Dispatch: En. Johari — 013-229 6614\n👩‍💼 HR: Cik Norhaslinda — 03-7832 4410\n🚨 Police/Ambulance: 999\n🔥 BOMBA: 994`;
    }
    if (/late|delay|lambat|shipment/.test(t)) {
      return `🚚 Late Shipment — SOP WH-003\nSteps:\n1. Check fleet tracking app\n2. If no update 30 mins past ETA — call driver\n3. If unreachable — notify Dispatch Supervisor\n4. Log delay in Daily Dispatch Report\n\n⏱️ > 60 mins late: escalate to Dispatch Manager\n📞 Dispatch Supervisor: En. Johari — 013-229 6614`;
    }
    if (/leave|cuti|\bmc\b|annual/.test(t)) {
      return `🗓️ Leave Application — HR-SOP-002\nAnnual Leave: Apply via hr.logimas.com.my/leave\n- Submit 3 working days in advance\n- Peak season: 2 weeks in advance\n\nMedical Leave: Get MC from doctor, submit to HR in 2 days\nEmergency Leave: Call supervisor immediately\n\n📞 HR: Cik Norhaslinda — 03-7832 4410`;
    }
    if (/salary|gaji|termination|fire|disciplinary|bonus|\bpay\b/.test(t)) {
      return `⚠️ This topic must be handled by HR directly.\nPlease do not take any action without speaking to HR first.\n\n📧 hr@logimas.com.my\n📞 Cik Norhaslinda — 03-7832 4410\n\nI cannot provide advice on salary, termination, or disciplinary matters.`;
    }

    // Default
    return `I'm not sure about that specific question.\nHere's what I can help with:\n- Damaged parcels\n- Missing parcels\n- Stock discrepancy\n- OT requests\n- Emergency contacts\n- Late shipments\n- Leave applications\n\nOr contact us directly:\n📞 03-7832 4400\n📧 info@logimas.com.my`;
  }
})();
