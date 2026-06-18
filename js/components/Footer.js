export default {
  name: 'Footer',
  data() {
    return {
      quickLinks: [
        { name: '关于正奇', path: '/about.html' },
        { name: '咨询服务', path: '/services.html' },
        { name: '案例成果', path: '/cases.html' },
        { name: '联系咨询', path: '/contact.html' }
      ]
    };
  },

  template: `
    <footer style="border-top: 1px solid #d9e6df; background: white;">
      <div class="container-page" style="padding-block: 3rem;">
        <div style="display: grid; gap: 2.5rem;">
          <div style="display: grid; gap: 2.5rem; grid-template-columns: 1fr;">
            <div>
              <a href="/index.html" class="group" style="display: inline-flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
                <span class="brand-mark">正</span>
                <span>
                  <span style="display: block; font-size: 1.25rem; font-weight: 900; color: #17231f;">莆田正奇鞋业咨询</span>
                  <span style="font-size: 0.875rem; font-weight: 600; color: #64746e;">鞋厂管理改善与经营升级顾问</span>
                </span>
              </a>
              <p style="max-width: 40rem; font-size: 0.875rem; line-height: 1.75; color: #5d6d67;">
                聚焦鞋业制造现场，围绕交付、效率、品质、成本和团队协作提供诊断、方案、陪跑与复盘服务。
              </p>
            </div>

            <div style="display: grid; gap: 2.5rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
              <div>
                <h2 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 900; color: #17231f;">快速导航</h2>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
                  <li v-for="link in quickLinks" :key="link.path">
                    <a
                      :href="link.path"
                      style="font-size: 0.875rem; font-weight: 600; color: #5d6d67; transition: color 0.2s;"
                      @mouseenter="$event.target.style.color = '#14b8a6'"
                      @mouseleave="$event.target.style.color = '#5d6d67'"
                    >
                      {{ link.name }}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 900; color: #17231f;">联系信息</h2>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem; line-height: 1.5; color: #5d6d67;">
                  <li>福建省莆田市荔城区</li>
                  <li>400-XXX-XXXX</li>
                  <li style="word-break: break-all;">contact@zhengqi-shoe.com</li>
                  <li>工作日 24 小时内回复</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 2.5rem; display: flex; flex-direction: column; gap: 0.75rem; border-top: 1px solid #d9e6df; padding-top: 1.5rem; font-size: 0.875rem; color: #708078;">
          <p>© 2026 莆田正奇鞋业咨询 版权所有</p>
          <p>所有咨询建议以现场诊断和双方确认的项目方案为准。</p>
        </div>
      </div>

      <style>
        @media (min-width: 768px) {
          footer > .container-page > div:first-child {
            grid-template-columns: 1.2fr 1.6fr;
          }
          footer .container-page > div > div:last-child {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      </style>
    </footer>
  `
};
