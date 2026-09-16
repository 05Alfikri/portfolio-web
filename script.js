// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const profilePic = document.querySelector(".profile-pic");
const profileModal = document.getElementById("profile-modal");
const profileUpload = document.getElementById("profile-upload");
const navLinks = document.querySelectorAll(".nav-link");

// Active Menu Management
const setActiveMenu = () => {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
};

// Theme Management
const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  themeToggle.querySelector("span").textContent =
    theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap";
};

// Initialize theme
const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
};

// Toggle theme
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

const toggleProfileModal = () => {
  const isOpen = !profileModal.hidden;
  profileModal.hidden = isOpen;
  profilePic.setAttribute("aria-expanded", String(!isOpen));
};

const closeProfileModal = () => {
  profileModal.hidden = true;
  profilePic.setAttribute("aria-expanded", "false");
};

const updateProfilePicture = (event) => {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const imageUrl = URL.createObjectURL(file);
  profilePic.querySelector("img").src = imageUrl;
  closeProfileModal();
};

// Mobile Menu Management
const toggleMenu = () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
};

const closeMenu = () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
};

// Smooth scroll for navigation links
const smoothScroll = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const headerOffset = 70;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    closeMenu();
  }
};

// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
const homeSection = document.querySelector(".home");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setActiveMenu(); // Set initial active menu

  // Profile settings
  themeToggle.addEventListener("click", toggleTheme);
  profilePic.addEventListener("click", toggleProfileModal);
  profileUpload.addEventListener("change", updateProfilePicture);

  // Mobile menu
  hamburger.addEventListener("click", toggleMenu);

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }

    if (!profilePic.contains(e.target) && !profileModal.contains(e.target)) {
      closeProfileModal();
    }
  });

  // Close menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Update active menu on scroll
  window.addEventListener("scroll", setActiveMenu);
});
