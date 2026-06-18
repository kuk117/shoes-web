// ========== 全局变量 ==========
let lastScroll = 0;

// ========== 滚动视差效果 ==========
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-bg');

  if (parallax) {
    // 背景位置移动（视差效果）
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;

    // 背景渐变颜色动态变化
    const hue1 = 220 + scrolled * 0.1;
    const hue2 = 280 + scrolled * 0.1;
    parallax.style.background = `linear-gradient(135deg,
      hsl(${hue1}, 70%, 50%),
      hsl(${hue2}, 60%, 40%))`;
  }

  // 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  if (scrolled > 50) {
    navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
  }

  lastScroll = scrolled;
});

// ========== 防抖函数 ==========
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========== 滚动触发动画 ==========
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100
  );
}

function handleScrollAnimation() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('animate');
    }
  });
}

// 使用 Intersection Observer（更高效）
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ========== 数字滚动动画 ==========
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// 统计数字区域进入视口时触发
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(num => {
        if (num.textContent === '0') {
          animateCounter(num);
        }
      });
      entry.target.querySelectorAll('.stat-item').forEach(item => {
        item.classList.add('animate');
      });
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ========== 按钮涟漪效果 ==========
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ========== 平滑滚动 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== 表单提交 ==========
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>提交中...</span>';
    submitBtn.disabled = true;

    // 模拟提交（实际项目中替换为真实的 API 请求）
    setTimeout(() => {
      submitBtn.innerHTML = '<span>✓ 提交成功</span>';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

      setTimeout(() => {
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
}

// ========== 输入框聚焦动画 ==========
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });

  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// ========== 卡片磁吸效果 ==========
document.querySelectorAll('.service-card, .case-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    this.style.transform = `
      perspective(1000px)
      rotateX(${y / 20}deg)
      rotateY(${-x / 20}deg)
      translateY(-8px)
      scale(1.02)
    `;
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ========== 移动端菜单 ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// ========== 页面加载完成 ==========
window.addEventListener('load', () => {
  // 初始化滚动动画
  handleScrollAnimation();

  // 添加加载完成类
  document.body.classList.add('loaded');

  console.log('✅ ConsultingPro 网站已加载完成');
  console.log('📌 功能清单：');
  console.log('  - 滚动视差背景渐变');
  console.log('  - 视频背景循环播放');
  console.log('  - 数字滚动动画');
  console.log('  - 卡片3D悬停效果');
  console.log('  - 按钮涟漪效果');
  console.log('  - 滚动触发动画');
  console.log('  - 表单交互动画');
  console.log('  - 平滑滚动导航');
});

// ========== 性能优化：节流滚动事件 ==========
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScrollAnimation();
      ticking = false;
    });
    ticking = true;
  }
});
