// Vue 3 应用主入口
const { createApp } = Vue;

// 导入所有组件
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import BottomCTA from './components/BottomCTA.js';
import CounterAnimation from './components/CounterAnimation.js';
import AIAssistant from './components/AIAssistant.js';
import MotionShell from './components/MotionShell.js';

const app = createApp({
  components: {
    Navbar,
    Footer,
    BottomCTA,
    CounterAnimation,
    AIAssistant,
    MotionShell
  },

  data() {
    return {
      currentPage: 'home'
    };
  },

  mounted() {
    // 页面路由处理
    this.handleRouting();
    window.addEventListener('popstate', () => this.handleRouting());
  },

  methods: {
    handleRouting() {
      const path = window.location.pathname;
      if (path.includes('about')) this.currentPage = 'about';
      else if (path.includes('services')) this.currentPage = 'services';
      else if (path.includes('cases')) this.currentPage = 'cases';
      else if (path.includes('contact')) this.currentPage = 'contact';
      else this.currentPage = 'home';
    }
  }
});

app.mount('#app');
