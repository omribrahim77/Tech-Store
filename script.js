const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("site-nav");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const cartCount = document.getElementById("cart-count");
const addButtons = document.querySelectorAll(".add-btn");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".dot");
const newsletterForm = document.getElementById("newsletter-form");
const formMessage = document.getElementById("form-message");

let cartItems = 0;
let activeSlide = 0;

const applyTheme = () => {
  const savedTheme = localStorage.getItem("nova-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.innerHTML = '<span class="toggle-icon">🌙</span>';
  } else {
    body.classList.remove("dark");
    themeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
  }
};

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("nova-theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = `<span class="toggle-icon">${isDark ? "🌙" : "☀️"}</span>`;
});

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    productCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = cartItems;
    button.textContent = "Added";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Add to cart";
      button.disabled = false;
    }, 1200);
  });
});

const showSlide = (index) => {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
};

const nextSlide = () => {
  activeSlide = (activeSlide + 1) % testimonialSlides.length;
  showSlide(activeSlide);
};

setInterval(nextSlide, 5000);

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    activeSlide = index;
    showSlide(activeSlide);
  });
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector("input");
  if (!input.value.trim()) return;

  formMessage.textContent = `Thanks, ${input.value} — you're on the list!`;
  input.value = "";
});

applyTheme();
showSlide(0);
