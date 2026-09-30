const portfolio = {
  name: "Prince Dewangan",
  tagline: "Building reliable systems, thoughtful products, and real-time experiences.",
  bio: "I’m a software engineer focused on building scalable backend systems, real-time products, and polished web experiences that solve real problems without overengineering the stack. I enjoy working across APIs, databases, and product thinking to turn ideas into dependable software.",
  email: "dewanganprince1010@gmail.com",
  github: "https://github.com/princedew",
  linkedin: "https://www.linkedin.com/in/prince-dewangan-5b4a28437/?isSelfProfile=true",
  resume: "#contact",
  projects: {
    drawly: {
      github: "https://github.com/princedew/drawly",
      live: "#projects"
    },
    auctionHouse: {
      github: "https://github.com/princedew/sold",
      live: "#projects"
    }
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setPortfolioData = () => {
  document.querySelectorAll("[data-field]").forEach((element) => {
    const field = element.dataset.field;
    if (field === "name") {
      element.textContent = portfolio.name;
    }
    if (field === "tagline") {
      element.textContent = portfolio.tagline;
    }
    if (field === "bio") {
      element.textContent = portfolio.bio;
    }
  });

  const socialLinks = document.querySelectorAll(".social-links a, .contact-links a");
  const githubLinks = [...socialLinks].filter((link) => link.textContent.includes("GitHub"));
  const linkedInLinks = [...socialLinks].filter((link) => link.textContent.includes("LinkedIn"));
  const emailLinks = [...socialLinks].filter((link) => link.textContent.includes("Email"));
  const resumeLinks = [...document.querySelectorAll(".social-links a")].filter((link) => link.textContent.includes("Resume"));

  githubLinks.forEach((link) => {
    link.href = portfolio.github;
  });

  linkedInLinks.forEach((link) => {
    link.href = portfolio.linkedin;
  });

  emailLinks.forEach((link) => {
    link.href = `mailto:${portfolio.email}`;
    link.innerHTML = `Email <span>↗</span>`;
  });

  resumeLinks.forEach((link) => {
    link.href = portfolio.resume;
  });

  const contactEmail = document.querySelector(".cta-link");
  if (contactEmail) {
    contactEmail.href = `mailto:${portfolio.email}`;
    contactEmail.innerHTML = `${portfolio.email} <span>↗</span>`;
  }

  const projectLinks = document.querySelectorAll(".project-links a");
  projectLinks.forEach((link) => {
    const text = link.textContent.trim();
    if (text.startsWith("GitHub")) {
      const projectName = link.closest(".project-item").querySelector(".project-label").textContent.trim();
      if (projectName === "Drawly") {
        link.href = portfolio.projects.drawly.github;
      }
      if (projectName === "Auction House") {
        link.href = portfolio.projects.auctionHouse.github;
      }
    }
    if (text.startsWith("Live Demo")) {
      const projectName = link.closest(".project-item").querySelector(".project-label").textContent.trim();
      if (projectName === "Drawly") {
        link.href = portfolio.projects.drawly.live;
      }
      if (projectName === "Auction House") {
        link.href = portfolio.projects.auctionHouse.live;
      }
    }
  });
};

const setupMobileNav = () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedOutside = !event.target.closest(".nav-toggle") && !event.target.closest(".nav-links");
    if (clickedOutside) {
      closeMenu();
    }
  });
};

const setupSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = window.innerHeight * 0.12;
      const targetY = target.getBoundingClientRect().top + window.scrollY - offset;

      if (prefersReducedMotion) {
        window.scrollTo({ top: targetY, behavior: "auto" });
        return;
      }

      gsap.to(window, {
        duration: 1.4,
        scrollTo: { y: targetY },
        ease: "power2.inOut"
      });
    });
  });
};

const setupNavHighlight = () => {
  const sections = ["#about", "#skills", "#projects", "#contact"];
  const navLinks = [...document.querySelectorAll(".nav-link")];

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const matched = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", matched);
    });
  };

  if (prefersReducedMotion) {
    const currentSection = sections.find((id) => {
      const section = document.querySelector(id);
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4;
    });

    if (currentSection) {
      setActiveLink(currentSection.replace("#", ""));
    }
    return;
  }

  sections.forEach((id) => {
    ScrollTrigger.create({
      trigger: id,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) {
          setActiveLink(id.replace("#", ""));
        }
      }
    });
  });
};

const initRevealAnimations = () => {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.style.opacity = "1";
      element.style.visibility = "visible";
    });
    return;
  }

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.fromTo(
      element,
      { y: 18, opacity: 0, visibility: "hidden" },
      {
        y: 0,
        opacity: 1,
        visibility: "visible",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%"
        }
      }
    );
  });

  gsap.fromTo(
    ".scroll-indicator",
    { opacity: 0.4, y: 8 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.2
    }
  );
};

const initProjectStagger = () => {
  const projectItems = gsap.utils.toArray(".project-item");
  if (!projectItems.length || prefersReducedMotion) return;

  projectItems.forEach((project, index) => {
    const projectDetails = project.querySelectorAll(".project-label, h3, p, .project-tech span, .project-links a");
    gsap.fromTo(
      project.querySelector(".project-number"),
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: index * 0.12,
        scrollTrigger: {
          trigger: project,
          start: "top 82%"
        }
      }
    );

    gsap.fromTo(
      projectDetails,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
        delay: index * 0.1 + 0.1,
        scrollTrigger: {
          trigger: project,
          start: "top 82%"
        }
      }
    );
  });
};

const initFocusList = () => {
  const items = document.querySelectorAll(".focus-list li");
  if (!items.length || prefersReducedMotion) return;

  gsap.fromTo(
    items,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".focus-list",
        start: "top 82%"
      }
    }
  );
};

const createParticles = () => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const particles = [];
  let lastScrollY = window.scrollY;

  const setupCanvas = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const count = window.innerWidth < 680 ? 32 : window.innerWidth < 1024 ? 52 : 84;

  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.18 + 0.06,
      drift: (Math.random() - 0.5) * 0.16,
      pulse: Math.random() * Math.PI * 2,
      twinkle: Math.random() * 2 + 0.4
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const scrollDelta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    const flow = scrollDelta * 0.02;

    particles.forEach((particle) => {
      particle.y -= particle.speed + 0.05;
      particle.x += particle.drift + flow * 0.02;
      particle.pulse += particle.twinkle * 0.01;

      if (particle.y < -10) {
        particle.y = window.innerHeight + 10;
        particle.x = Math.random() * window.innerWidth;
      }

      if (particle.x < -10) particle.x = window.innerWidth + 10;
      if (particle.x > window.innerWidth + 10) particle.x = -10;

      const brightness = particle.alpha + Math.sin(particle.pulse) * 0.18;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.9, brightness)})`;
      ctx.fill();

      if (Math.random() > 0.94) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.08})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  };

  setupCanvas();
  requestAnimationFrame(draw);

  window.addEventListener("resize", () => {
    setupCanvas();
  });
};

const initPage = () => {
  setPortfolioData();
  setupMobileNav();
  setupSmoothScroll();
  initRevealAnimations();
  initProjectStagger();
  initFocusList();
  createParticles();
  setupNavHighlight();
};

document.addEventListener("DOMContentLoaded", initPage);

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}
