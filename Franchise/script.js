/**
 * Liberté（リベルテ）FC募集LP - インタラクション制御スクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. スムーススクロール（ヘッダーの高さを考慮） ---
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

        // モバイルメニューが開いていたら閉じる
        const spMenuDrawer = document.getElementById('sp-menu-drawer');
        if (spMenuDrawer && !spMenuDrawer.classList.contains('hidden')) {
          spMenuDrawer.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      }
    });
  });

  // --- 2. モバイル用ハンバーガーメニュー開閉 ---
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

  // --- 3. アコーディオン開閉（FAQ・詳細情報） ---
  const accordionButtons = document.querySelectorAll('.accordion-btn');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');
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

  // --- 4. モバイル固定フッターCTAの表示制御 ---
  const floatingCta = document.getElementById('floating-cta');
  const contactSection = document.getElementById('contact-form-section');

  if (floatingCta) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > 220) {
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

  // --- 5. フォーム読み込みのステータス監視＆フォールバック ---
  setTimeout(() => {
    const xhmForm = document.getElementById('xhm-form');
    const formFallback = document.getElementById('form-fallback-msg');
    if (xhmForm && formFallback) {
      if (xhmForm.children.length === 0) {
        formFallback.classList.remove('hidden');
      }
    }
  }, 4000);
});
