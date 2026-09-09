/**
 * Liberté（リベルテ）FC募集LP - インタラクション制御スクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. スムーススクロール
  const headerOffset = 76;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // モバイルメニューを閉じる
        const spMenuDrawer = document.getElementById('sp-menu-drawer');
        if (spMenuDrawer && !spMenuDrawer.classList.contains('hidden')) {
          spMenuDrawer.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      }
    });
  });

  // 2. モバイルハンバーガーメニュー
  const spMenuBtn = document.getElementById('sp-menu-btn');
  const spMenuClose = document.getElementById('sp-menu-close');
  const spMenuDrawer = document.getElementById('sp-menu-drawer');

  if (spMenuBtn && spMenuDrawer) {
    spMenuBtn.addEventListener('click', () => {
      spMenuDrawer.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });
  }

  if (spMenuClose && spMenuDrawer) {
    spMenuClose.addEventListener('click', () => {
      spMenuDrawer.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // 3. FAQアコーディオン開閉
  const faqButtons = document.querySelectorAll('.faq-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.classList.toggle('active');
      }
      if (icon) {
        icon.classList.toggle('rotated');
      }
    });
  });

  // 4. スマホ固定フッターCTAの表示制御
  const floatingCta = document.getElementById('floating-cta');
  const contactSection = document.getElementById('contact-form-section');

  if (floatingCta) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > 240) {
        if (contactSection) {
          const contactRect = contactSection.getBoundingClientRect();
          if (contactRect.top < windowHeight && contactRect.bottom > 0) {
            floatingCta.style.opacity = '0';
            floatingCta.style.pointerEvents = 'none';
            return;
          }
        }
        floatingCta.style.opacity = '1';
        floatingCta.style.pointerEvents = 'auto';
      } else {
        floatingCta.style.opacity = '0';
        floatingCta.style.pointerEvents = 'none';
      }
    }, { passive: true });
  }
});
