const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('.reveal');
const backToTopButton = document.querySelector('.back-to-top');
const sharedSections = document.querySelectorAll('main section[id], footer[id]');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalCloseButton = document.querySelector('.modal-close');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalInfo = document.getElementById('modal-info');
const modalLive = document.getElementById('modal-live');
const modalGitHub = document.getElementById('modal-github');
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.querySelector('.form-success');
const yearElement = document.getElementById('year');

const projectData = {
  broxstudies: {
    category: 'AI / Education Technology',
    title: 'BroxStudies',
    description:
      'An education-focused technology concept designed to make learning more accessible and personalized for SHS and TVET students through artificial intelligence.',
    info:
      'This concept focuses on improving access to learning through AI-driven personalization and practical educational support for students.',
    tech: ['Artificial Intelligence', 'Education Technology', 'Web Development'],
    live: '#',
    github: '#',
  },
  solvxit: {
    category: 'Software Engineering / Technology',
    title: 'Solvxit-GH',
    description:
      'An initiative focused on developing practical software solutions and exploring technology-driven ideas.',
    info:
      'Solvxit-GH represents a software engineering team mindset grounded in building useful, practical technology solutions and learning through experimentation.',
    tech: ['Software Development', 'JavaScript', 'Python', 'Databases'],
    live: '#',
    github: '#',
  },
  hostel: {
    category: 'Web Development',
    title: 'Hostel Website',
    description:
      'A web development project focused on creating a practical hostel website using Python, HTML, and CSS.',
    info:
      'A practical web project centered on building a clean, usable hostel website interface with basic backend and frontend integration.',
    tech: ['Python', 'HTML', 'CSS'],
    live: '#',
    github: '#',
  },
  future: {
    category: 'Future Project',
    title: 'More Projects Coming Soon',
    description:
      'Currently building and exploring new software projects. This space will be updated as new projects are completed.',
    info:
      'This project slot is intentionally reserved for upcoming work, showing an ongoing developer journey and commitment to building new solutions.',
    tech: ['In Progress', 'Innovation', 'Exploration'],
    live: '#',
    github: '#',
  },
};

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function setHeaderState() {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (window.scrollY > 360) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

window.addEventListener('scroll', setHeaderState);
setHeaderState();

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentId = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  {
    rootMargin: '-35% 0px -45% 0px',
    threshold: 0.2,
  }
);

sharedSections.forEach((section) => {
  sectionObserver.observe(section);
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

function openModal(projectKey) {
  const project = projectData[projectKey];

  if (!project) {
    return;
  }

  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalInfo.textContent = project.info;

  modalTech.innerHTML = '';
  project.tech.forEach((tech) => {
    const badge = document.createElement('span');
    badge.textContent = tech;
    modalTech.appendChild(badge);
  });

  modalLive.setAttribute('href', project.live);
  modalLive.setAttribute('aria-label', `Live demo placeholder for ${project.title}`);
  modalGitHub.setAttribute('href', project.github);
  modalGitHub.setAttribute('aria-label', `GitHub placeholder for ${project.title}`);

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-view-btn').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});

if (modalCloseButton) {
  modalCloseButton.addEventListener('click', closeModal);
}

if (projectModal) {
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && projectModal.classList.contains('open')) {
    closeModal();
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function showFieldError(fieldName, message) {
  const errorNode = document.querySelector(`[data-error-for="${fieldName}"]`);

  if (errorNode) {
    errorNode.textContent = message;
  }
}

function clearFormErrors() {
  document.querySelectorAll('.error-message').forEach((node) => {
    node.textContent = '';
  });
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFormErrors();
  formSuccess.textContent = '';

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const subject = String(formData.get('subject') || '').trim();
  const message = String(formData.get('message') || '').trim();
  let hasError = false;

  if (name.length < 2) {
    showFieldError('name', 'Please enter your name.');
    hasError = true;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('email', 'Please enter a valid email address.');
    hasError = true;
  }

  if (subject.length < 3) {
    showFieldError('subject', 'Please enter a subject.');
    hasError = true;
  }

  if (message.length < 15) {
    showFieldError('message', 'Please write a message with at least 15 characters.');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  formSuccess.textContent = 'Thanks! Your message has been prepared. Email integration can be connected here.';
  contactForm.reset();
});

function typeSequence(lines) {
  const typingSpeed = 80;

  lines.forEach(({ element, text }, index) => {
    let charIndex = 0;
    const timer = setInterval(() => {
      if (charIndex <= text.length) {
        element.textContent = text.slice(0, charIndex);
        charIndex += 1;
      } else {
        clearInterval(timer);
        if (index < lines.length - 1) {
          const nextLine = lines[index + 1].element;
          nextLine.classList.add('is-visible');
        }
      }
    }, typingSpeed);
  });
}

const typedTitle = document.querySelector('.typed-title');
const typedSubtitle = document.querySelector('.typed-subtitle');

if (typedTitle && typedSubtitle) {
  typeSequence([
    { element: typedTitle, text: 'ASPIRING SOFTWARE ENGINEER' },
    { element: typedSubtitle, text: '& TECHNOLOGY PROBLEM SOLVER' },
  ]);
}
