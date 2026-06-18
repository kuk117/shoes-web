export default {
  name: 'Navbar',
  data() {
    return {
      scrolled: false,
      navItems: [
        { name: '首页', path: '/index.html' },
        { name: '关于正奇', path: '/about.html' },
        { name: '咨询服务', path: '/services.html' },
        { name: '案例成果', path: '/cases.html' },
        { name: '联系咨询', path: '/contact.html' }
      ]
    };
  },

  computed: {
    currentPath() {
      return window.location.pathname;
    }
  },

  mounted() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 16;
    },

    isActive(path) {
      if (path === '/index.html') {
        return this.currentPath === '/' || this.currentPath === '/index.html' || this.currentPath.endsWith('/');
      }
      return this.currentPath.includes(path.replace('.html', ''));
    }
  },

  template: `
    <header :class="['site-nav', { 'site-nav-solid': scrolled }]">
      <div class="container-page" style="display: flex; align-items: center; justify-content: space-between; height: 64px;">
        <a href="/index.html" class="group" style="display: flex; align-items: center; gap: 0.75rem;" aria-label="莆田正奇首页">
          <span class="brand-mark">正</span>
          <span style="line-height: 1.2;">
            <span style="display: block; font-size: 1rem; font-weight: 900; color: #17231f;">莆田正奇</span>
            <span style="display: block; font-size: 0.69rem; font-weight: 600; color: #64746e;">鞋业咨询</span>
          </span>
        </a>

        <nav style="display: none; align-items: center; gap: 0.25rem;" class="desktop-nav" aria-label="主导航">
          <a
            v-for="item in navItems"
            :key="item.path"
            :href="item.path"
            :class="['nav-link', { 'nav-link-active': isActive(item.path) }]"
          >
            {{ item.name }}
          </a>
        </nav>

        <a href="/contact.html" class="btn-primary btn-compact desktop-btn" style="display: none;">
          预约诊断
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <style>
        @media (min-width: 768px) {
          .site-nav .container-page {
            height: 72px;
          }
          .desktop-nav,
          .desktop-btn {
            display: flex !important;
          }
        }
      </style>
    </header>
  `
};
