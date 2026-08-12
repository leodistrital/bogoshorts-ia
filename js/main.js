/* ==========================================================================
   UNIVERSO BOGOSHORTS - INTERACTIVE SCRIPTS & COMPONENT SIMULATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initModals();
  initToast();
  initComponentInteractions();
});

/* Language Selector (Español, English, Português, Français) */
function initLanguageToggle() {
  const langBtn = document.getElementById('langToggleBtn');
  if (!langBtn) return;

  const languages = [
    { code: 'ES', name: 'Español' },
    { code: 'EN', name: 'English' },
    { code: 'PT', name: 'Português' },
    { code: 'FR', name: 'Français' }
  ];

  let currentIndex = 0;

  langBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % languages.length;
    const selected = languages[currentIndex];
    langBtn.setAttribute('data-lang', selected.code);
    const langText = langBtn.querySelector('.lang-text');
    if (langText) {
      langText.textContent = selected.code;
    }
    showToast(`Idioma seleccionado: ${selected.name} (${selected.code})`);
  });
}

/* Modal Management System */
function initModals() {
  // Global modal triggers
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      openModal(modalId, trigger.getAttribute('data-modal-title'));
    });
  });

  // Close triggers
  document.querySelectorAll('.modal-close, .modal-backdrop').forEach(element => {
    element.addEventListener('click', (e) => {
      if (e.target === element) {
        closeModal();
      }
    });
  });

  // Form submits inside modals
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      closeModal();
      showToast(`¡Gracias por suscribirte con: ${email}!`);
      newsletterForm.reset();
    });
  }
}

function openModal(modalId, customTitle) {
  const modal = document.getElementById(modalId) || document.getElementById('genericModal');
  if (!modal) return;

  if (customTitle && modal.querySelector('.modal-title')) {
    modal.querySelector('.modal-title').textContent = customTitle;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

/* Toast Notifications */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `
    <span style="color: var(--active-accent); font-size: 1.2rem;">🌐</span>
    <div>
      <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-main);">UNIVERSO BOGOSHORTS</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">${message}</div>
    </div>
  `;
  
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* Component Interactions & Tab Switching */
function initComponentInteractions() {
  // Mosaic item simulation clicks
  document.querySelectorAll('.mosaic-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.mosaic-title')?.textContent || 'Sección';
      showToast(`Explorando sección del Festival: ${title}`);
    });
  });

  // World menu tab active state helper
  const currentPath = window.location.pathname;
  document.querySelectorAll('.world-tab').forEach(tab => {
    const targetPath = tab.getAttribute('href');
    if (currentPath.endsWith(targetPath) || (targetPath !== '/' && currentPath.includes(targetPath))) {
      tab.classList.add('active');
    }
  });
}
