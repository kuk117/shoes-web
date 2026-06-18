export default {
  name: 'MotionShell',
  data() {
    return {
      progress: 0
    };
  },

  mounted() {
    this.update();
    window.addEventListener('scroll', this.update, { passive: true });
    window.addEventListener('resize', this.update);

    // 初始化滚动动画观察器
    this.initScrollObserver();
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.update);
    window.removeEventListener('resize', this.update);
    if (this.observer) {
      this.observer.disconnect();
    }
  },

  methods: {
    update() {
      const scrollTop = window.scrollY;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      this.progress = (scrollTop / max) * 100;

      // 视差效果
      document.querySelectorAll('[data-parallax]').forEach((item) => {
        const speed = Number(item.dataset.parallax || 0.08);
        const rect = item.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - rect.top) * speed;
        item.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
      });
    },

    initScrollObserver() {
      const items = document.querySelectorAll('.reveal-on-scroll');
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this.observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
      );

      items.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
        this.observer.observe(item);
      });
    }
  },

  template: `
    <div>
      <div class="scroll-progress" :style="{ width: progress + '%' }"></div>
      <div class="page-transition">
        <slot></slot>
      </div>
    </div>
  `
};
