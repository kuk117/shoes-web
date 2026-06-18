export default {
  name: 'CounterAnimation',
  props: {
    end: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 2000
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      count: 0,
      isVisible: false
    };
  },

  mounted() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.isVisible) {
          this.isVisible = true;
          this.startAnimation();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (this.$el) {
      observer.observe(this.$el);
    }
  },

  methods: {
    startAnimation() {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / this.duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        this.count = Math.floor(easeOutQuart * this.end);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.count = this.end;
        }
      };

      requestAnimationFrame(animate);
    }
  },

  template: `
    <span>{{ prefix }}{{ count }}{{ suffix }}</span>
  `
};
