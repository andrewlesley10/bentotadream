document.addEventListener('DOMContentLoaded', () => {
  
  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if(hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Active Link Highlighting based on current page
  const currentLocation = location.pathname.split('/').pop() || 'index';
  const menuItems = document.querySelectorAll('.nav-link');
  
  menuItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentLocation || (currentLocation === 'index' && href === 'index')) {
      item.classList.add('active');
    }
  });

  // Contact Form AJAX Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const formMessage = document.getElementById('formMessage');
      const originalBtnText = submitBtn.innerText;
      
      // Basic validation handled by HTML5 required attribute
      
      // Loading state
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;
      formMessage.innerHTML = '';
      formMessage.className = 'form-message';
      
      try {
        const formData = new FormData(contactForm);
        
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          // Success
          formMessage.innerHTML = `<div class="success-msg">${result.message}</div>`;
          contactForm.reset();
        } else {
          // Server error but valid response
          formMessage.innerHTML = `<div class="error-msg">${result.message || 'Something went wrong. Please try again.'}</div>`;
        }
      } catch (error) {
        // Network or JSON parsing error
        formMessage.innerHTML = `<div class="error-msg">Failed to send message. Please try again later.</div>`;
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});
