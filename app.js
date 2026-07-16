/**
 * FSMF2026 LP Interactive Controller
 * Features: Countdown Timer, Accordion Guide, X Share, and AIPH Welcome Widget
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Countdown Timer (Target: 2026-07-23T19:00:00 JST)
     ========================================================================== */
  const targetDate = new Date('2026-07-23T19:00:00+09:00').getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownArea = document.getElementById('countdown-area');

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

    if (distance < 0) {
      // If event has started / passed
      clearInterval(countdownInterval);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      
      // Update label dynamically
      const label = countdownArea.querySelector('.countdown-label');
      if (label) {
        label.textContent = '✨ 第3弾は終了、または開催中です！';
        label.style.color = 'var(--accent-teal)';
      }
      return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format numbers with leading zero
    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
  };

  // Run initial call and set interval
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);


  /* ==========================================================================
     2. Spatial Guide Accordion
     ========================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item, index) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    // Automatically open the first item on load for better UX
    if (index === 0) {
      item.classList.add('active');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other panels
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-panel').style.maxHeight = null;
      });

      // Toggle current panel
      if (!isActive) {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      }
    });
  });


  /* ==========================================================================
     3. One-click X (Twitter) Share Button
     ========================================================================== */
  const shareBtn = document.getElementById('btn-x-share');

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareText = 
        `FSMF2026（First Step Metaverse Festival）が2年ぶりにゆるく復活！\n\n` +
        `第1弾：6/10 イケハヤさん×坂本崇博さん\n` +
        `第2弾：6/27 イケハヤさん×田中彰さん\n\n` +
        `メタバース「Spatial」で無料開催。AI時代の学びと仕事の「つながり」をもう一度考える小さな対談シリーズです。\n` +
        `#FSMF2026 @ihayato`;

      const shareUrl = 'https://forms.gle/yJGj2DGxp7QK7Wyv9';
      const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

      window.open(xShareUrl, '_blank', 'width=550,height=420,noopener,noreferrer');
    });
  }


  /* ==========================================================================
     4. LP Assistant (EarthKey 🌍️) Welcome Widget
     ========================================================================== */
  const aiphBubble = document.getElementById('aiph-bubble');
  const aiphAvatar = document.getElementById('aiph-avatar-trigger');
  const aiphCloseBtn = document.getElementById('aiph-close-btn');

  if (aiphBubble && aiphAvatar && aiphCloseBtn) {
    
    // Auto popup speech bubble after 2.5 seconds delay
    setTimeout(() => {
      // Check if user has already closed it in this session (optional logic)
      if (!sessionStorage.getItem('aiph-welcome-closed')) {
        aiphBubble.classList.add('show');
      }
    }, 2500);

    // Toggle speech bubble on avatar click
    aiphAvatar.addEventListener('click', () => {
      aiphBubble.classList.toggle('show');
    });

    // Close speech bubble on 'x' click
    aiphCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent trigger toggle
      aiphBubble.classList.remove('show');
      // Remember closed state for the session
      sessionStorage.setItem('aiph-welcome-closed', 'true');
    });
  }


  /* ==========================================================================
     5. Floating Art Widget (Zoom in / out Gallery function)
     ========================================================================== */
  const floatingArtWidget = document.getElementById('floating-art-widget');
  const floatingArtTrigger = document.getElementById('floating-art-trigger');
  const floatingArtOverlay = document.getElementById('floating-art-overlay');
  const floatingArtCloseBtn = document.getElementById('floating-art-close-btn');
  const floatingArtFrame = document.getElementById('floating-art-frame');

  if (floatingArtWidget && floatingArtTrigger) {
    
    // Zoom in on trigger click
    floatingArtTrigger.addEventListener('click', () => {
      floatingArtWidget.classList.add('expanded');
      document.body.style.overflow = 'hidden'; // Prevents scrolling behind overlay
    });

    // Zoom out function
    const zoomOut = () => {
      floatingArtWidget.classList.remove('expanded');
      document.body.style.overflow = ''; // Restores scrolling
    };

    // Close on overlay, close button, or clicking the image itself
    if (floatingArtOverlay) floatingArtOverlay.addEventListener('click', zoomOut);
    if (floatingArtCloseBtn) floatingArtCloseBtn.addEventListener('click', zoomOut);
    if (floatingArtFrame) floatingArtFrame.addEventListener('click', zoomOut);
  }


  /* ==========================================================================
     6. Announcement Bar Carousel (Vertical slide every 5 seconds)
     ========================================================================== */
  const announcementSlides = document.getElementById('announcement-slides');

  if (announcementSlides) {
    const slides = announcementSlides.children;
    const slideCount = slides.length;
    let currentSlideIndex = 0;

    if (slideCount > 1) {
      setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slideCount;
        // Shift slides vertically by 24px per slide
        announcementSlides.style.transform = `translateY(${-24 * currentSlideIndex}px)`;
      }, 5000);
    }
  }


  /* ==========================================================================
     7. Mobile Responsive Hamburger Menu Toggle
     ========================================================================== */
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navLinksMenu = document.getElementById('nav-links-menu');
  const navLinks = navLinksMenu ? navLinksMenu.querySelectorAll('a') : [];

  if (navToggleBtn && navLinksMenu) {
    const toggleMenu = () => {
      const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      navToggleBtn.setAttribute('aria-expanded', !isExpanded);
      navToggleBtn.classList.toggle('active');
      navLinksMenu.classList.toggle('active');
      
      if (!isExpanded) {
        document.body.style.overflow = 'hidden'; // メニュー展開時に背景スクロールを防止
      } else {
        document.body.style.overflow = '';
      }
    };

    const closeMenu = () => {
      navToggleBtn.setAttribute('aria-expanded', 'false');
      navToggleBtn.classList.remove('active');
      navLinksMenu.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Toggle menu on button click
    navToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any link inside the menu
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside of the header navigation
    document.addEventListener('click', (e) => {
      const header = document.querySelector('.global-header');
      if (header && !header.contains(e.target) && navLinksMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

});
