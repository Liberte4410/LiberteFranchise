/**
 * Liberté (リベルテ) LP Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 75;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Floating CTA Bar Visibility (show after passing Hero)
  const floatingCta = document.getElementById('floating-cta');
  const heroSection = document.getElementById('hero');

  if (floatingCta && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        floatingCta.classList.remove('translate-y-full', 'opacity-0');
        floatingCta.classList.add('translate-y-0', 'opacity-100');
      } else {
        floatingCta.classList.add('translate-y-full', 'opacity-0');
        floatingCta.classList.remove('translate-y-0', 'opacity-100');
      }
    });
  }

  // 4. Contact Form Handling
  const form = document.getElementById('contact-form');
  const formSuccessModal = document.getElementById('form-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        送信中...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        if (formSuccessModal) {
          formSuccessModal.classList.remove('hidden');
          formSuccessModal.classList.add('flex');
        } else {
          alert('無料相談・資料請求のお申込みありがとうございます。\n担当者より折り返しご連絡いたします。');
        }
      }, 1000);
    });
  }

  if (closeModalBtn && formSuccessModal) {
    closeModalBtn.addEventListener('click', () => {
      formSuccessModal.classList.add('hidden');
      formSuccessModal.classList.remove('flex');
    });
  }
});
