const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});
menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
document
  .querySelectorAll(".main-nav a")
  .forEach((a) =>
    a.addEventListener("click", () => mainNav.classList.remove("open")),
  );
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    productCards.forEach((card) => {
      card.classList.toggle(
        "hidden",
        filter !== "all" && card.dataset.category !== filter,
      );
    });
  });
});
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = (y / r.height - 0.5) * -8;
    const ry = (x / r.width - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  });
});
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.textContent = "¡Gracias! Tu mensaje fue registrado correctamente.";
  form.reset();
  setTimeout(() => (msg.textContent = ""), 3500);
});

const nutritionBtn = document.getElementById("nutritionBtn");
const nutritionModal = document.getElementById("nutritionModal");
const closeNutritionButtons = document.querySelectorAll("[data-close-nutrition]");

function openNutritionModal() {
  nutritionModal.classList.add("open");
  nutritionModal.setAttribute("aria-hidden", "false");
}

function closeNutritionModal() {
  nutritionModal.classList.remove("open");
  nutritionModal.setAttribute("aria-hidden", "true");
}

if (nutritionBtn && nutritionModal) {
  nutritionBtn.addEventListener("click", openNutritionModal);
  closeNutritionButtons.forEach((btn) =>
    btn.addEventListener("click", closeNutritionModal),
  );
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNutritionModal();
  });
}