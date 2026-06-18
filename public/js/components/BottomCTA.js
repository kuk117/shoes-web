export default {
  name: 'BottomCTA',
  props: {
    title: {
      type: String,
      default: '先把最影响经营结果的问题讲清楚'
    },
    description: {
      type: String,
      default: '留下企业规模、订单类型和当前卡点。正奇顾问会先判断优先改善方向，再建议是否进入完整诊断。'
    },
    primaryHref: {
      type: String,
      default: '/contact.html'
    },
    primaryLabel: {
      type: String,
      default: '预约初步诊断'
    },
    secondaryHref: {
      type: String,
      default: '/services.html'
    },
    secondaryLabel: {
      type: String,
      default: '查看服务体系'
    }
  },

  template: `
    <section style="background: #e8f5ef; padding: 4rem 0;">
      <div class="container-page">
        <div class="soft-card reveal-on-scroll" style="display: grid; gap: 2rem; padding: 1.75rem;">
          <div style="display: grid; gap: 2rem; align-items: center;">
            <div>
              <h2 style="max-width: 48rem; text-wrap: balance; font-size: clamp(1.5rem, 3vw, 2rem); line-height: 1.2; font-weight: 900; color: #17231f;">
                {{ title }}
              </h2>
              <p style="margin-top: 1.25rem; max-width: 32rem; font-size: clamp(0.9rem, 1.5vw, 1.125rem); line-height: 2; color: #5d6d67;">
                {{ description }}
              </p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <a :href="primaryHref" class="btn-primary">
                <span>{{ primaryLabel }}</span>
                <span aria-hidden="true">→</span>
              </a>
              <a :href="secondaryHref" class="btn-secondary">
                <span>{{ secondaryLabel }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>
        @media (min-width: 640px) {
          .soft-card > div > div:last-child {
            flex-direction: row;
          }
        }
        @media (min-width: 768px) {
          .soft-card {
            padding: 2.5rem;
          }
        }
        @media (min-width: 1024px) {
          .soft-card > div {
            grid-template-columns: 1fr auto;
          }
          .soft-card > div > div:last-child {
            flex-direction: column;
          }
        }
      </style>
    </section>
  `
};
