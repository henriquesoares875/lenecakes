
// Animações do Hero
document.addEventListener('DOMContentLoaded', () => {
  // Animar elementos do hero com delays
  const heroLabel = document.querySelector('.hero-label');
  const heroTitle = document.querySelector('.hero-title');
  const heroDescription = document.querySelector('.hero-description');
  const heroButton = document.querySelector('.hero-button');

  setTimeout(() => heroLabel.classList.add('fade-down'), 200);
  setTimeout(() => heroTitle.classList.add('fade-up'), 400);
  setTimeout(() => heroDescription.classList.add('fade-up'), 600);
  setTimeout(() => heroButton.classList.add('fade-up'), 800);

  // Parallax no hero
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / 700);
  });

  
  document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});

  // Configuração do observer para todas as seções
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };

  // Animação das seções
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section !== document.querySelector('.hero')) {
      section.classList.add('section-hidden');
      sectionObserver.observe(section);
    }
  });

  // Animação dos cards de features
  const cards = document.querySelectorAll('.feature-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.style.animation = 'fadeUp 0.5s ease-out forwards';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    observer.observe(card);
    
    // Efeito 3D no hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Animação dos itens de encomenda
  const orderItems = document.querySelectorAll('.order-item');
  
  const orderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.5s ease-out forwards';
        orderObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  orderItems.forEach(item => {
    item.style.opacity = '0';
    orderObserver.observe(item);
  });
});
