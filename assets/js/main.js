function hydrateMedicalPages() {
  const path = window.location.pathname.toLowerCase();
  const lead = document.querySelector(".section.alt p");
  const cards = Array.from(document.querySelectorAll(".grid .card"));
  if (!lead || !cards.length) return;
  const byPage = {
    "/services/": {
      lead: "General, cosmetic, emergency, and pediatric care with modern treatment planning.",
      cards: [
        ["General Dentistry", "Cleanings, exams, digital X-rays, and preventive plans for long-term oral health."],
        ["Cosmetic + Invisalign", "Whitening, veneers, bonding, and clear aligners tailored to your goals."]
      ]
    },
    "/new-patients/": {
      lead: "Your first visit is designed to be calm, clear, and judgment-free.",
      cards: [
        ["What to Bring", "Photo ID, insurance card, medication list, and any recent dental records."],
        ["Insurance + Financing", "In-network with Delta Dental, Cigna, MetLife, and Aetna plus financing options."]
      ]
    },
    "/about/": {
      lead: "Meet the team serving Alpharetta families with gentle care and modern dentistry.",
      cards: [
        ["Dr. Amanda Liu, DDS", "15 years experience, Emory School of Dentistry, ADA and GDA member."],
        ["Clinical Team", "Dr. Kevin Park, Rachel Torres, and Brittany James, RDH."]
      ]
    },
    "/testimonials/": {
      lead: "Trusted by local families for compassionate care and consistent results.",
      cards: [
        ["Michelle K.", "\"Dr. Liu made my daughter actually enjoy going to the dentist.\""],
        ["Jason R.", "\"My Invisalign results were incredible and the team was supportive throughout.\""]
      ]
    },
    "/contact/": {
      lead: "Call or message us to request your appointment. Same-day emergency slots available.",
      cards: [
        ["Office Address", "4200 Lakeside Drive, Suite 100, Alpharetta, GA 30009"],
        ["Hours", "Mon-Thu 8-5, Fri 8-2, Sat by appointment"]
      ]
    }
  };
  const match = Object.keys(byPage).find((k) => path.includes(k));
  if (!match) return;
  lead.textContent = byPage[match].lead;
  cards.slice(0, 2).forEach((card, i) => {
    const h3 = card.querySelector("h3");
    const p = card.querySelector("p");
    if (h3) h3.textContent = byPage[match].cards[i][0];
    if (p) p.textContent = byPage[match].cards[i][1];
  });
}

function setActiveNav() {
  const path = window.location.pathname.toLowerCase();
  document.querySelectorAll("nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (path.includes(href.replace("../", "")) || (href.endsWith("index.html") && path.endsWith("index.html"))) {
      a.classList.add("is-active");
    }
  });
}

function initSliders() {
  document.querySelectorAll("[data-slider]").forEach((root) => {
    const track = root.querySelector(".slider-track");
    const slides = Array.from(root.querySelectorAll(".slide"));
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    if (!track || slides.length < 2) return;
    let idx = 0;
    const draw = () => { track.style.transform = "translateX(-" + idx * 100 + "%)"; };
    if (prev) prev.addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; draw(); });
    if (next) next.addEventListener("click", () => { idx = (idx + 1) % slides.length; draw(); });
    draw();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  hydrateMedicalPages();
  setActiveNav();
  initSliders();
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const msg = form.querySelector(".thanks");
      if (msg) {
        msg.style.display = "block";
        msg.textContent = "Thank you. Your request has been received.";
      }
      form.reset();
    });
  });
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
});
