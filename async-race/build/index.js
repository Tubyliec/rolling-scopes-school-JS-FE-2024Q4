(() => {
  'use strict';
  var t = {
      275: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.App = void 0);
        const a = n(5283),
          r = n(7287),
          i = n(9816),
          o = n(6442);
        n(2082), n(6414);
        const s = n(4723);
        e.App = class {
          constructor() {
            (this.container = document.body),
              (this.garage = void 0),
              (this.winners = void 0),
              (this.currentPage = void 0),
              this.init(),
              (this.router = new a.router(this)),
              this.renderApp('garage');
          }
          render() {
            this.garage && this.container.append(this.garage.getElement());
          }
          renderApp(t) {
            var e, n;
            r.ViewUtilities.clearElement(this.container),
              'garage' === t
                ? (this.currentPage =
                    null === (e = this.garage) || void 0 === e
                      ? void 0
                      : e.getElement())
                : 'winners' === t &&
                  (this.currentPage =
                    null === (n = this.winners) || void 0 === n
                      ? void 0
                      : n.getElement()),
              this.currentPage &&
                (this.container.append(this.currentPage),
                this.router.setHash(t));
          }
          init() {
            (this.garage = new i.GarageView({
              tag: 'div',
              css: ['page', 'garage'],
            })),
              (s.domElements.garageView = this.garage),
              (this.winners = new o.WinnersView({
                tag: 'div',
                css: ['page', 'winners'],
              }));
          }
        };
      },
      540: (t) => {
        t.exports = function (t) {
          var e = document.createElement('style');
          return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
        };
      },
      646: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.CarWay = void 0);
        const a = n(9877),
          r = n(5739),
          i = n(3081),
          o = n(5280),
          s = n(8582);
        n(9219);
        class l extends s.ViewCreator {
          constructor(t, e) {
            super(t),
              (this.image = ''),
              this.init(e.color, e.name),
              (this.id = e.id),
              (this.color = e.color),
              (this.name = e.name);
          }
          init(t, e) {
            var n, r;
            this.createControlContainer(e),
              this.controlContainer &&
                this.addInnerElement(this.controlContainer),
              this.createCarImage(t),
              this.createCarContainer(),
              this.carContainer && this.addInnerElement(this.carContainer),
              (this.car = new s.ViewCreator({
                tag: 'div',
                css: ['car'],
              }).getElement()),
              this.car.insertAdjacentHTML('afterbegin', this.image),
              null === (n = this.tripContainer) ||
                void 0 === n ||
                n.append(this.car),
              null === (r = this.flag) ||
                void 0 === r ||
                r.insertAdjacentHTML('beforeend', a.FlagImage),
              this.tripContainer &&
                this.flag &&
                this.tripContainer.append(this.flag);
          }
          createControlContainer(t) {
            (this.controlContainer = new s.ViewCreator({
              tag: 'div',
              css: ['control-container'],
            }).getElement()),
              (this.selectButton = new o.ButtonsCreator({
                tag: 'button',
                css: ['button', 'control-button'],
                text: 'Select',
                callback: () => {
                  this.element && r.ControlActions.selectCar(this);
                },
              }).getElement()),
              (this.removeButton = new o.ButtonsCreator({
                tag: 'button',
                css: ['button', 'control-button'],
                text: 'Remove',
                callback: () => {
                  this.element && r.ControlActions.removeCar(this.element);
                },
              }).getElement()),
              (this.carName = new s.ViewCreator({
                tag: 'span',
                css: ['car-name'],
                text: t,
              }).getElement()),
              this.controlContainer.append(
                this.selectButton,
                this.removeButton,
                this.carName,
              );
          }
          createCarContainer() {
            (this.carContainer = new s.ViewCreator({
              tag: 'div',
              css: ['car-container'],
            }).getElement()),
              (this.startButton = new o.ButtonsCreator({
                tag: 'button',
                css: ['car-button', 'button'],
                text: 'Start',
                callback: () => {
                  i.Driving.startDriving(this.id, this);
                },
              }).getElement()),
              (this.stopButton = new o.ButtonsCreator({
                tag: 'button',
                css: ['car-button', 'button'],
                text: 'Stop',
                callback: () => {
                  i.Driving.stopDriving(this.id, this);
                },
              }).getElement()),
              this.stopButton instanceof HTMLButtonElement &&
                (this.stopButton.disabled = !0),
              (this.tripContainer = new s.ViewCreator({
                tag: 'div',
                css: ['trip-container'],
              }).getElement()),
              this.carContainer.append(
                this.startButton,
                this.stopButton,
                this.tripContainer,
              ),
              (this.flag = new s.ViewCreator({
                tag: 'div',
                css: ['flag'],
              }).getElement());
          }
          createCarImage(t) {
            this.image = `<svg class="car-image" width="594" height="239" viewBox="0 0 594 239" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M79.1043 60.302C91.5233 52.56 104.447 45.668 117.796 39.666L148.32 70.19H454.85C493.73 70.19 531.927 80.335 565.685 99.627C576.641 105.876 583.394 117.524 583.394 130.132V188.847H59.3283L27.2913 175.993C16.7803 171.791 9.88831 161.606 9.88831 150.284V70.19L79.1043 60.302Z" fill="${t}"></path><path d="M117.796 39.666C159.82 20.701 205.384 10.882 251.492 10.862H263.14C317.564 10.862 371.117 24.517 418.896 50.582L454.849 70.19H148.32L117.796 39.666Z" fill="#4394CC"></path><path d="M326.305 70.19H148.32L117.796 39.666C140.37 29.521 164.023 21.976 188.308 17.181L326.305 70.19Z" fill="#3E89BD"></path><path d="M9.88831 89.966H49.4403V109.742H9.88831V89.966Z" fill="#F5AE45"></path><path d="M494.402 119.631C527.171 119.631 553.73 146.19 553.73 178.959C553.73 211.728 527.171 238.287 494.402 238.287C461.633 238.287 435.074 211.728 435.074 178.959C435.074 146.19 461.633 119.631 494.402 119.631Z" fill="#697B8C"></path><path d="M494.402 198.735C483.48 198.735 474.626 189.881 474.626 178.959C474.626 168.037 483.48 159.183 494.402 159.183C505.324 159.183 514.178 168.037 514.178 178.959C514.178 189.881 505.324 198.735 494.402 198.735Z" fill="#C3C9D1"></path><path d="M118.656 119.631C151.425 119.631 177.984 146.19 177.984 178.959C177.984 211.728 151.425 238.287 118.656 238.287C85.8873 238.287 59.3283 211.728 59.3283 178.959C59.3283 146.19 85.8873 119.631 118.656 119.631Z" fill="#697B8C"></path><path d="M118.656 198.735C107.734 198.735 98.8803 189.881 98.8803 178.959C98.8803 168.037 107.734 159.183 118.656 159.183C129.578 159.183 138.432 168.037 138.432 178.959C138.432 189.881 129.578 198.735 118.656 198.735Z" fill="#C3C9D1"></path><path d="M306.529 89.966H346.081V109.742H306.529V89.966Z" fill="black"></path><path d="M8.48431 60.401L75.6533 50.81C87.8943 43.285 100.61 36.551 113.712 30.638C156.992 11.04 203.96 0.924 251.472 0.974H263.14C319.215 1.014 374.39 15.084 423.633 41.901L457.529 60.392C497.21 60.837 536.119 71.387 570.599 91.045C584.61 99.073 593.252 113.984 593.282 130.132V188.847C593.282 194.305 588.852 198.735 583.394 198.735H550.19C539.392 229.546 505.664 245.762 474.853 234.965C457.895 229.022 444.566 215.693 438.623 198.735H174.444C163.646 229.546 129.918 245.762 99.1073 234.965C82.1493 229.022 68.8203 215.693 62.8773 198.735H59.3273C58.0713 198.735 56.8153 198.498 55.6493 198.033L23.6223 185.179C9.31431 179.513 -0.0596948 165.67 0.000305176 150.284V70.19C0.000305176 65.266 3.61931 61.103 8.48431 60.401ZM455.65 186.869C460.021 208.267 480.914 222.07 502.322 217.7C523.73 213.33 537.523 192.436 533.153 171.028C528.782 149.63 507.889 135.827 486.481 140.197C468.069 143.964 454.839 160.161 454.849 178.958C454.85 181.619 455.117 184.269 455.65 186.869ZM276.865 178.959H435.073C435.073 146.19 461.632 119.631 494.401 119.631C527.17 119.631 553.729 146.19 553.729 178.959H573.506V130.132C573.496 121.075 568.641 112.709 560.78 108.21C528.515 89.789 492.009 80.088 454.85 80.079H276.865V178.959V178.959ZM276.865 60.302H416.069L414.161 59.264C371.89 36.284 324.931 23.262 276.866 21.185V60.302H276.865ZM257.089 20.75H251.492C211.643 20.701 172.16 28.265 135.149 43.038L152.413 60.303H257.089V20.75ZM79.9053 186.869C84.2763 208.267 105.179 222.07 126.577 217.7C147.975 213.329 161.778 192.426 157.408 171.028C153.037 149.63 132.134 135.827 110.736 140.197C92.3253 143.964 79.0943 160.161 79.1043 178.958C79.1043 181.619 79.3713 184.269 79.9053 186.869ZM19.7763 89.966H49.4403V109.742H19.7763V150.283C19.7463 157.57 24.1963 164.126 30.9693 166.806L59.3283 178.197C59.3283 177.287 59.4473 176.388 59.5063 175.478C59.5653 174.568 59.5853 173.5 59.6843 172.512C59.7833 171.523 59.9813 170.534 60.1393 169.546C60.2973 168.557 60.4163 167.568 60.6143 166.669C60.8123 165.77 61.0993 164.771 61.3563 163.831C61.6133 162.892 61.8113 161.942 62.1073 161.023C62.4043 160.103 62.7603 159.223 63.0963 158.324C63.4323 157.424 63.7393 156.495 64.0853 155.605C64.4313 154.715 64.8963 153.904 65.3113 153.064C65.7263 152.224 66.1323 151.304 66.5963 150.454C67.0613 149.604 67.5853 148.882 68.0303 148.091C68.4753 147.3 69.0193 146.4 69.5823 145.589C70.1463 144.778 70.6703 144.135 71.2143 143.404C71.7583 142.672 72.3713 141.812 73.0043 141.051C73.6373 140.29 74.2303 139.696 74.8433 139.073C75.4563 138.45 76.1383 137.61 76.8213 136.917C77.5043 136.224 78.1763 135.681 78.8583 135.068C79.5403 134.455 80.2723 133.733 81.0243 133.09C81.7753 132.447 82.5373 131.953 83.2883 131.389C84.0393 130.825 84.7913 130.222 85.5823 129.698C86.3733 129.174 87.2633 128.709 88.1133 128.155C88.9633 127.601 89.6563 127.166 90.4563 126.741C91.2573 126.316 92.2563 125.871 93.1653 125.436C94.0753 125.001 94.7873 124.615 95.6273 124.259C96.4673 123.903 97.6053 123.527 98.5933 123.171C99.5813 122.815 100.225 122.538 101.065 122.271C102.192 121.925 103.349 121.678 104.496 121.391C105.247 121.213 105.969 120.976 106.731 120.817C107.947 120.57 109.193 120.431 110.429 120.253C111.161 120.154 111.863 119.996 112.594 119.927C114.572 119.729 116.549 119.62 118.626 119.62C151.375 119.65 177.925 146.199 177.954 178.948H257.088V80.078H148.32C145.7 80.078 143.178 79.04 141.329 77.181L115.689 51.541C104.921 56.663 94.4593 62.388 84.3443 68.687C83.1773 69.419 81.8723 69.893 80.5073 70.091L19.7753 78.763V89.966H19.7763Z" fill="black"></path></svg>`;
          }
        }
        e.CarWay = l;
      },
      649: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.RandomCarGenerator = void 0);
        const a = n(1647),
          r = n(830);
        class i {
          static getRandomName() {
            return `${a.brands[Math.floor(Math.random() * a.brands.length)]} ${a.models[Math.floor(Math.random() * a.models.length)]}`;
          }
          static generateRandomCars(t = 100) {
            return Array.from({ length: t })
              .fill(1)
              .map(() => ({
                name: i.getRandomName(),
                color: r.AdditionalUtilities.getRandomColor(),
              }));
          }
        }
        e.RandomCarGenerator = i;
      },
      830: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.AdditionalUtilities = void 0),
          (e.AdditionalUtilities = class {
            static getRandomColor() {
              let t = '#';
              for (let e = 0; e < 6; e += 1)
                t += '0123456789ABCDEF'[Math.floor(16 * Math.random())];
              return t;
            }
          });
      },
      1113: (t) => {
        t.exports = function (t, e) {
          if (e.styleSheet) e.styleSheet.cssText = t;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(t));
          }
        };
      },
      1505: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.PagginationActions = void 0);
        const a = n(4723);
        e.PagginationActions = class {
          static NextButton() {
            var t, e;
            const n = a.domElements.garageContainer,
              r =
                null === (t = a.domElements.prevButton) || void 0 === t
                  ? void 0
                  : t.getElement(),
              i =
                null === (e = a.domElements.nextButton) || void 0 === e
                  ? void 0
                  : e.getElement();
            n &&
              ((n.carsPageNumber += 1),
              n.addCar(),
              7 * n.carsPageNumber >= Number(n.count) &&
                (null == i || i.setAttribute('disabled', 'true')),
              (null == r ? void 0 : r.hasAttribute('disabled')) &&
                (null == r || r.removeAttribute('disabled')));
          }
          static prevButton() {
            var t, e;
            const n = a.domElements.garageContainer,
              r =
                null === (t = a.domElements.prevButton) || void 0 === t
                  ? void 0
                  : t.getElement(),
              i =
                null === (e = a.domElements.nextButton) || void 0 === e
                  ? void 0
                  : e.getElement();
            n &&
              ((n.carsPageNumber -= 1),
              n.addCar(),
              n.carsPageNumber <= 1 &&
                (null == r || r.setAttribute('disabled', 'true')),
              (null == i ? void 0 : i.hasAttribute('disabled')) &&
                (null == i || i.removeAttribute('disabled')));
          }
        };
      },
      1530: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.WinnersContainer = void 0);
        const a = n(1651);
        class r extends a.HTMLElementCreator {
          constructor(t) {
            super(t);
          }
        }
        e.WinnersContainer = r;
      },
      1601: (t) => {
        t.exports = function (t) {
          return t[1];
        };
      },
      1647: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.models = e.brands = void 0),
          (e.brands = [
            'Mercedes-Benz',
            'BMW',
            'Audi',
            'Ford',
            'Nissan',
            'Citroen',
            'Volkswagen',
            'Honda',
            'Toyota',
            'Peugeout',
          ]),
          (e.models = [
            'Juke',
            'A100',
            'A4',
            'Mondeo',
            '207',
            'Jetta',
            'Civic',
            '307',
            '308',
            '3008',
          ]);
      },
      1651: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.HTMLElementCreator = void 0);
        class n {
          constructor(t) {
            (this.element = void 0), this.createElement(t);
          }
          createElement(t) {
            (this.element = document.createElement(t.tag)),
              this.setCssClasses(t.css),
              t.id && this.setId(t.id);
          }
          getElement() {
            if (!this.element) throw new Error('Element not created');
            return this.element;
          }
          setCssClasses(t) {
            for (const e of t) this.element && this.element.classList.add(e);
          }
          setTextContent(t = '') {
            this.element && (this.element.textContent = t);
          }
          setId(t) {
            this.element && (this.element.id = t.toString());
          }
          addInnerElement(t) {
            this.element && t instanceof n
              ? this.element.append(t.getElement())
              : this.element &&
                t instanceof HTMLElement &&
                this.element.append(t);
          }
        }
        e.HTMLElementCreator = n;
      },
      1711: (t, e, n) => {
        n.r(e), n.d(e, { default: () => v });
        var a = n(5072),
          r = n.n(a),
          i = n(7825),
          o = n.n(i),
          s = n(7659),
          l = n.n(s),
          c = n(5056),
          d = n.n(c),
          u = n(540),
          h = n.n(u),
          p = n(1113),
          m = n.n(p),
          g = n(6886),
          C = {};
        (C.styleTagTransform = m()),
          (C.setAttributes = d()),
          (C.insert = l().bind(null, 'head')),
          (C.domAPI = o()),
          (C.insertStyleElement = h()),
          r()(g.A, C);
        const v = g.A && g.A.locals ? g.A.locals : void 0;
      },
      2082: (t, e, n) => {
        n.r(e), n.d(e, { default: () => v });
        var a = n(5072),
          r = n.n(a),
          i = n(7825),
          o = n.n(i),
          s = n(7659),
          l = n.n(s),
          c = n(5056),
          d = n.n(c),
          u = n(540),
          h = n.n(u),
          p = n(1113),
          m = n.n(p),
          g = n(2087),
          C = {};
        (C.styleTagTransform = m()),
          (C.setAttributes = d()),
          (C.insert = l().bind(null, 'head')),
          (C.domAPI = o()),
          (C.insertStyleElement = h()),
          r()(g.A, C);
        const v = g.A && g.A.locals ? g.A.locals : void 0;
      },
      2087: (t, e, n) => {
        n.d(e, { A: () => s });
        var a = n(1601),
          r = n.n(a),
          i = n(6314),
          o = n.n(i)()(r());
        o.push([
          t.id,
          '*{padding:0px;margin:0px;border:none}*::before,*::after{box-sizing:border-box}a,a:link,a:visited,a:hover{text-decoration:none}h1,h2,h3,h4,h5,h6,p{font-size:inherit;font-weight:inherit}ul,ul li{list-style:none}nav,footer,header,aside{display:block}img,svg{max-width:100%;height:auto}input::-ms-clear{display:none}button::-moz-focus-inner{padding:0;border:0}html{font-size:10px}.button{background:#fff;border:solid .1rem #000;padding:.2rem 1rem;border-radius:.5rem}.button:hover{cursor:pointer;scale:1.05}.button:disabled{cursor:default;scale:1}',
          '',
        ]);
        const s = o;
      },
      2092: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.updatedCar = e.updatedId = e.createdCar = void 0),
          (e.createdCar = { name: '', color: '#000000' }),
          (e.updatedId = { id: void 0 }),
          (e.updatedCar = { name: '', color: '#000000' });
      },
      2191: (t, e, n) => {
        n.r(e), n.d(e, { default: () => v });
        var a = n(5072),
          r = n.n(a),
          i = n(7825),
          o = n.n(i),
          s = n(7659),
          l = n.n(s),
          c = n(5056),
          d = n.n(c),
          u = n(540),
          h = n.n(u),
          p = n(1113),
          m = n.n(p),
          g = n(3954),
          C = {};
        (C.styleTagTransform = m()),
          (C.setAttributes = d()),
          (C.insert = l().bind(null, 'head')),
          (C.domAPI = o()),
          (C.insertStyleElement = h()),
          r()(g.A, C);
        const v = g.A && g.A.locals ? g.A.locals : void 0;
      },
      2528: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.PageCreator = void 0);
        const a = n(1651),
          r = n(8582);
        class i extends a.HTMLElementCreator {
          constructor(t) {
            super(t), (this.header = void 0);
          }
          addHeader(t, e) {
            (this.header = new r.ViewCreator({
              tag: e.tag,
              css: e.css,
              text: e.text,
            }).getElement()),
              t && t.append(this.header);
          }
        }
        e.PageCreator = i;
      },
      2783: (t, e, n) => {
        n.d(e, { A: () => s });
        var a = n(1601),
          r = n.n(a),
          i = n(6314),
          o = n.n(i)()(r());
        o.push([
          t.id,
          '.page{width:70%;margin:2rem auto;display:flex;flex-direction:column;gap:1rem}.page-header{font-size:3rem}',
          '',
        ]);
        const s = o;
      },
      3081: function (t, e, n) {
        var a =
          (this && this.__awaiter) ||
          function (t, e, n, a) {
            return new (n || (n = Promise))(function (r, i) {
              function o(t) {
                try {
                  l(a.next(t));
                } catch (t) {
                  i(t);
                }
              }
              function s(t) {
                try {
                  l(a.throw(t));
                } catch (t) {
                  i(t);
                }
              }
              function l(t) {
                var e;
                t.done
                  ? r(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(o, s);
              }
              l((a = a.apply(t, e || [])).next());
            });
          };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.Driving = void 0);
        const r = n(6811),
          i = n(5420),
          o = n(3661),
          s = n(7317);
        e.Driving = class {
          static startDriving(t, e) {
            return a(this, void 0, void 0, function* () {
              const n = e.car,
                a = e.flag,
                l = { id: 0, time: 0, wins: 0 };
              if (
                (e.startButton instanceof HTMLButtonElement &&
                  (e.startButton.disabled = !0),
                e.stopButton instanceof HTMLButtonElement &&
                  (e.stopButton.disabled = !1),
                n && a)
              ) {
                const e = yield o.Api.getStartEngine(t),
                  { velocity: c, distance: d } = e,
                  u = Math.round(d / c),
                  h = s.Animation.getDistance(n, a) + 80;
                r.animationState[t] = s.Animation.animation(n, h, u);
                const p = yield o.Api.getDriveStatus(t),
                  { success: m } = p;
                m || globalThis.cancelAnimationFrame(r.animationState[t].id),
                  m &&
                    ((l.id = t),
                    (l.time = Number((u / 1e3).toFixed(2))),
                    i.succesArray.push(l));
              }
            });
          }
          static stopDriving(t, e) {
            return a(this, void 0, void 0, function* () {
              e.startButton instanceof HTMLButtonElement &&
                (e.startButton.disabled = !1),
                yield o.Api.getStopEngine(t);
              const n = e.car;
              n && (n.style.transform = 'translateX(0)'),
                r.animationState[t] &&
                  globalThis.cancelAnimationFrame(r.animationState[t].id),
                e.stopButton instanceof HTMLButtonElement &&
                  (e.stopButton.disabled = !0);
            });
          }
        };
      },
      3426: function (t, e, n) {
        var a =
          (this && this.__awaiter) ||
          function (t, e, n, a) {
            return new (n || (n = Promise))(function (r, i) {
              function o(t) {
                try {
                  l(a.next(t));
                } catch (t) {
                  i(t);
                }
              }
              function s(t) {
                try {
                  l(a.throw(t));
                } catch (t) {
                  i(t);
                }
              }
              function l(t) {
                var e;
                t.done
                  ? r(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(o, s);
              }
              l((a = a.apply(t, e || [])).next());
            });
          };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.GarageContainer = void 0);
        const r = n(4723),
          i = n(5420),
          o = n(3661),
          s = n(7287),
          l = n(1505),
          c = n(5280),
          d = n(1651),
          u = n(8582),
          h = n(646);
        n(1711);
        class p extends d.HTMLElementCreator {
          constructor(t) {
            super(t),
              (this.carsPageNumber = 1),
              (this.items = []),
              (this.count = ''),
              (this.nextButton = void 0),
              this.addPageNumber(),
              this.addCarsContainer(),
              this.addPaginationButtons(),
              this.addCar();
          }
          addPageNumber() {
            (this.pageNumber = new u.ViewCreator({
              tag: 'h2',
              css: ['page-number'],
              text: `Page #${this.carsPageNumber}`,
            }).element),
              this.pageNumber && this.addInnerElement(this.pageNumber);
          }
          addCarsContainer() {
            (this.carsContainer = new u.ViewCreator({
              tag: 'div',
              css: ['cars-container'],
            }).element),
              this.carsContainer && this.addInnerElement(this.carsContainer);
          }
          addPaginationButtons() {
            var t, e;
            (this.paginationButtons = new u.ViewCreator({
              tag: 'div',
              css: ['pagination-buttons'],
            }).element),
              (this.prevButton = new c.ButtonsCreator({
                tag: 'button',
                css: ['button', 'pag-button'],
                text: 'Previous',
                callback: () => {
                  l.PagginationActions.prevButton();
                },
              })),
              (r.domElements.prevButton = this.prevButton),
              (this.nextButton = new c.ButtonsCreator({
                tag: 'button',
                css: ['button', 'pag-button'],
                text: 'Next',
                callback: () => {
                  l.PagginationActions.NextButton();
                },
              })),
              (r.domElements.nextButton = this.nextButton),
              this.paginationButtons &&
                this.addInnerElement(this.paginationButtons),
              this.prevButton &&
                (null === (t = this.paginationButtons) ||
                  void 0 === t ||
                  t.append(this.prevButton.getElement())),
              this.nextButton &&
                (null === (e = this.paginationButtons) ||
                  void 0 === e ||
                  e.append(this.nextButton.getElement()));
          }
          updateGarage() {
            return a(this, void 0, void 0, function* () {
              const { items: t, count: e } = yield o.Api.getCars(
                this.carsPageNumber,
              );
              (this.items = t), (this.count = e);
            });
          }
          addCar() {
            var t, e;
            s.ViewUtilities.clearElement(this.carsContainer),
              this.carsPageNumber <= 1 &&
                (null ===
                  (e =
                    null === (t = r.domElements.prevButton) || void 0 === t
                      ? void 0
                      : t.getElement()) ||
                  void 0 === e ||
                  e.setAttribute('disabled', 'true')),
              this.pageNumber &&
                (this.pageNumber.textContent = `Page #${this.carsPageNumber}`),
              this.updateGarage().then(() => {
                var t, e, n;
                i.raceCars.length = 0;
                for (const a of this.items) {
                  const o = new h.CarWay(
                    { tag: 'div', css: ['car-way'], id: a.id },
                    a,
                  );
                  null === (t = this.carsContainer) ||
                    void 0 === t ||
                    t.append(o.getElement()),
                    i.raceCars.push(o),
                    Number(this.count) <= 7 &&
                      (null ===
                        (n =
                          null === (e = r.domElements.nextButton) ||
                          void 0 === e
                            ? void 0
                            : e.getElement()) ||
                        void 0 === n ||
                        n.setAttribute('disabled', 'true'));
                }
              });
          }
        }
        e.GarageContainer = p;
      },
      3661: function (t, e) {
        var n =
          (this && this.__awaiter) ||
          function (t, e, n, a) {
            return new (n || (n = Promise))(function (r, i) {
              function o(t) {
                try {
                  l(a.next(t));
                } catch (t) {
                  i(t);
                }
              }
              function s(t) {
                try {
                  l(a.throw(t));
                } catch (t) {
                  i(t);
                }
              }
              function l(t) {
                var e;
                t.done
                  ? r(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(o, s);
              }
              l((a = a.apply(t, e || [])).next());
            });
          };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.Api = void 0);
        class a {
          static getCars(t) {
            return n(this, arguments, void 0, function* (t, e = 7) {
              const n = yield fetch(
                `http://localhost:3000/garage?_page=${t}&_limit=${e}`,
              );
              return {
                items: yield n.json(),
                count: n.headers.get('X-Total-Count'),
              };
            });
          }
          static getCar(t) {
            return n(this, void 0, void 0, function* () {
              const e = yield fetch(`http://localhost:3000/garage/${t}`);
              return yield e.json();
            });
          }
          static getCarsCount() {
            return n(this, void 0, void 0, function* () {
              return (
                (yield fetch(
                  'http://localhost:3000/garage?_limit=5',
                )).headers.get('X-Total-Count') || '0'
              );
            });
          }
          static getCreateCar(t) {
            return n(this, void 0, void 0, function* () {
              return yield fetch('http://localhost:3000/garage', {
                method: 'POST',
                body: JSON.stringify(t),
                headers: { 'Content-Type': 'application/json' },
              });
            });
          }
          static updateCar(t, e) {
            return n(this, void 0, void 0, function* () {
              yield fetch(`http://localhost:3000/garage/${t}`, {
                method: 'PUT',
                body: JSON.stringify(e),
                headers: { 'Content-Type': 'application/json' },
              });
            });
          }
          static getDeleteCarById(t) {
            return n(this, void 0, void 0, function* () {
              return (yield fetch(`http://localhost:3000/garage/${t}`, {
                method: 'DELETE',
              })).json();
            });
          }
          static getStartEngine(t) {
            return n(this, void 0, void 0, function* () {
              return (yield fetch(
                `http://localhost:3000/engine?id=${t}&status=started`,
                { method: 'PATCH' },
              )).json();
            });
          }
          static getStopEngine(t) {
            return n(this, void 0, void 0, function* () {
              return (yield fetch(
                `http://localhost:3000/engine?id=${t}&status=started`,
                { method: 'PATCH' },
              )).json();
            });
          }
          static getDriveStatus(t) {
            return n(this, void 0, void 0, function* () {
              const e = yield fetch(
                `http://localhost:3000/engine?id=${t}&status=drive`,
                { method: 'PATCH' },
              ).catch();
              return 200 === e.status
                ? { success: (yield e.json()).success }
                : { success: !1 };
            });
          }
          static getWinner(t) {
            return n(this, void 0, void 0, function* () {
              return (yield fetch(`http://localhost:3000/winners/${t}`)).json();
            });
          }
          static getWinnerStatus(t) {
            return n(this, void 0, void 0, function* () {
              return (yield fetch(`http://localhost:3000/winners/${t}`)).status;
            });
          }
          static createWinner(t) {
            return n(this, void 0, void 0, function* () {
              (t.wins = 1),
                yield fetch('http://localhost:3000/winners', {
                  method: 'POST',
                  body: JSON.stringify(t),
                  headers: { 'Content-Type': 'application/json' },
                });
            });
          }
          static updateWinner(t, e) {
            return n(this, void 0, void 0, function* () {
              yield fetch(`http://localhost:3000/winners/${t}`, {
                method: 'PUT',
                body: JSON.stringify(e),
                headers: { 'Content-Type': 'application/json' },
              });
            });
          }
          static sendWinner(t) {
            return n(this, void 0, void 0, function* () {
              if (404 === (yield a.getWinnerStatus(t.id)))
                yield a.createWinner(t);
              else {
                const e = yield a.getWinner(t.id);
                yield a.updateWinner(t.id, {
                  id: t.id,
                  wins: e.wins + 1,
                  time: Math.min(t.time, e.time),
                });
              }
            });
          }
        }
        e.Api = a;
      },
      3954: (t, e, n) => {
        n.d(e, { A: () => s });
        var a = n(1601),
          r = n.n(a),
          i = n(6314),
          o = n.n(i)()(r());
        o.push([
          t.id,
          '.car-control-panel{display:flex;flex-direction:column;gap:1rem}.create-container{display:flex;gap:1rem}.control-input{border:solid .1rem #000;border-radius:.5rem}.name-input{padding:.5rem 1rem}.race-container{display:flex;gap:1rem;font-size:2rem;text-align:center}.race-button{font-size:2rem}.create-button{min-width:12rem}',
          '',
        ]);
        const s = o;
      },
      4396: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.TypeCheckers = void 0),
          (e.TypeCheckers = class {
            static isPageName(t) {
              return 'garage' === t || 'winners' === t;
            }
          });
      },
      4723: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.domElements = void 0),
          (e.domElements = {
            garageView: void 0,
            garageContainer: void 0,
            prevButton: void 0,
            nextButton: void 0,
            carControlPanel: void 0,
            updateCarName: void 0,
            updateCarColor: void 0,
            raceContainer: void 0,
            winnerText: void 0,
          });
      },
      5056: (t, e, n) => {
        t.exports = function (t) {
          var e = n.nc;
          e && t.setAttribute('nonce', e);
        };
      },
      5072: (t) => {
        var e = [];
        function n(t) {
          for (var n = -1, a = 0; a < e.length; a++)
            if (e[a].identifier === t) {
              n = a;
              break;
            }
          return n;
        }
        function a(t, a) {
          for (var i = {}, o = [], s = 0; s < t.length; s++) {
            var l = t[s],
              c = a.base ? l[0] + a.base : l[0],
              d = i[c] || 0,
              u = ''.concat(c, ' ').concat(d);
            i[c] = d + 1;
            var h = n(u),
              p = {
                css: l[1],
                media: l[2],
                sourceMap: l[3],
                supports: l[4],
                layer: l[5],
              };
            if (-1 !== h) e[h].references++, e[h].updater(p);
            else {
              var m = r(p, a);
              (a.byIndex = s),
                e.splice(s, 0, { identifier: u, updater: m, references: 1 });
            }
            o.push(u);
          }
          return o;
        }
        function r(t, e) {
          var n = e.domAPI(e);
          return (
            n.update(t),
            function (e) {
              if (e) {
                if (
                  e.css === t.css &&
                  e.media === t.media &&
                  e.sourceMap === t.sourceMap &&
                  e.supports === t.supports &&
                  e.layer === t.layer
                )
                  return;
                n.update((t = e));
              } else n.remove();
            }
          );
        }
        t.exports = function (t, r) {
          var i = a((t = t || []), (r = r || {}));
          return function (t) {
            t = t || [];
            for (var o = 0; o < i.length; o++) {
              var s = n(i[o]);
              e[s].references--;
            }
            for (var l = a(t, r), c = 0; c < i.length; c++) {
              var d = n(i[c]);
              0 === e[d].references && (e[d].updater(), e.splice(d, 1));
            }
            i = l;
          };
        };
      },
      5244: (t, e, n) => {
        n.r(e), n.d(e, { default: () => v });
        var a = n(5072),
          r = n.n(a),
          i = n(7825),
          o = n.n(i),
          s = n(7659),
          l = n.n(s),
          c = n(5056),
          d = n.n(c),
          u = n(540),
          h = n.n(u),
          p = n(1113),
          m = n.n(p),
          g = n(5417),
          C = {};
        (C.styleTagTransform = m()),
          (C.setAttributes = d()),
          (C.insert = l().bind(null, 'head')),
          (C.domAPI = o()),
          (C.insertStyleElement = h()),
          r()(g.A, C);
        const v = g.A && g.A.locals ? g.A.locals : void 0;
      },
      5280: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ButtonsCreator = void 0);
        const a = n(1651);
        class r extends a.HTMLElementCreator {
          constructor(t) {
            super(t),
              this.setTextContent(t.text),
              t.callback && this.setCallback(t.callback);
          }
          setCallback(t) {
            this.element &&
              'function' == typeof t &&
              this.element.addEventListener('click', (e) => t(e));
          }
        }
        e.ButtonsCreator = r;
      },
      5283: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.router = void 0);
        const a = n(4396);
        e.router = class {
          constructor(t) {
            (this.hash = void 0), this.enableRouter(t);
          }
          setHash(t) {
            (this.hash = t), (globalThis.location.href = `#${t}`);
          }
          enableRouter(t) {
            globalThis.addEventListener('hashchange', () => {
              (this.hash = globalThis.location.hash.slice(1)),
                a.TypeCheckers.isPageName(this.hash)
                  ? t.renderApp(this.hash)
                  : console.log('Page not found');
            });
          }
        };
      },
      5417: (t, e, n) => {
        n.d(e, { A: () => s });
        var a = n(1601),
          r = n.n(a),
          i = n(6314),
          o = n.n(i)()(r());
        o.push([
          t.id,
          '.nav-bar{display:flex;flex-direction:row;justify-content:center;align-content:center;gap:1rem}.nav-bar__button{font-size:2.5rem;padding:.5rem 1rem}',
          '',
        ]);
        const s = o;
      },
      5420: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.succesArray = e.raceCars = void 0),
          (e.raceCars = []),
          (e.succesArray = []);
      },
      5739: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ControlActions = void 0);
        const a = n(2092),
          r = n(4723),
          i = n(3661);
        e.ControlActions = class {
          static removeCar(t) {
            t.remove(),
              i.Api.getDeleteCarById(Number(t.id)).then(() => {
                var t;
                return null === (t = r.domElements.garageView) || void 0 === t
                  ? void 0
                  : t.renderView();
              });
          }
          static selectCar(t) {
            var e, n;
            const i =
                null === (e = r.domElements.updateCarName) || void 0 === e
                  ? void 0
                  : e.element,
              o =
                null === (n = r.domElements.updateCarColor) || void 0 === n
                  ? void 0
                  : n.element;
            (a.updatedId.id = t.id),
              i instanceof HTMLInputElement &&
                'text' === i.type &&
                ((i.value = t.name), (a.updatedCar.name = t.name)),
              o instanceof HTMLInputElement &&
                'color' === o.type &&
                ((o.value = t.color), (a.updatedCar.color = t.color));
          }
        };
      },
      6018: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.CarControlPanel = void 0);
        const a = n(2092),
          r = n(4723),
          i = n(9380),
          o = n(9114),
          s = n(7913),
          l = n(5280),
          c = n(1651),
          d = n(7033),
          u = n(8582);
        n(2191);
        class h extends c.HTMLElementCreator {
          constructor(t) {
            super(t), this.init();
          }
          init() {
            this.initCreateContainer(),
              this.initUpdateContainer(),
              this.initRaceContainer();
          }
          initCreateContainer() {
            (this.createContainer = new u.ViewCreator({
              tag: 'div',
              css: ['create-container'],
            })),
              this.addInnerElement(this.createContainer),
              (this.createCarName = new d.InputCreator({
                tag: 'input',
                css: ['control-input', 'name-input'],
                placeholder: 'Enter car name',
                type: 'text',
                callback: () => {
                  this.createCarName &&
                    o.InputActions.sendInput(this.createCarName, a.createdCar);
                },
              })),
              this.createContainer.addInnerElement(this.createCarName),
              (this.createCarColor = new d.InputCreator({
                tag: 'input',
                css: ['control-input', 'color-input'],
                type: 'color',
                callback: () => {
                  this.createCarColor &&
                    o.InputActions.sendInput(this.createCarColor, a.createdCar);
                },
              })),
              this.createContainer.addInnerElement(this.createCarColor),
              (this.createCarButton = new l.ButtonsCreator({
                tag: 'button',
                css: ['button', 'create-button'],
                text: 'Create new car',
                callback: () => {
                  i.createCarActions.createCar(a.createdCar);
                },
              })),
              this.createContainer.addInnerElement(this.createCarButton);
          }
          initUpdateContainer() {
            (this.updateContainer = new u.ViewCreator({
              tag: 'div',
              css: ['create-container'],
            })),
              this.addInnerElement(this.updateContainer),
              (this.updateCarName = new d.InputCreator({
                tag: 'input',
                css: ['control-input', 'name-input'],
                placeholder: 'Enter car new name',
                type: 'text',
                callback: () => {
                  this.updateCarName &&
                    o.InputActions.sendInput(this.updateCarName, a.updatedCar);
                },
              })),
              (r.domElements.updateCarName = this.updateCarName),
              this.updateContainer.addInnerElement(this.updateCarName),
              (this.updateCarColor = new d.InputCreator({
                tag: 'input',
                css: ['control-input', 'color-input'],
                type: 'color',
                callback: () => {
                  this.updateCarColor &&
                    o.InputActions.sendInput(this.updateCarColor, a.updatedCar);
                },
              })),
              this.updateContainer.addInnerElement(this.updateCarColor),
              (r.domElements.updateCarColor = this.updateCarColor),
              (this.updateCarButton = new l.ButtonsCreator({
                tag: 'button',
                css: ['button', 'create-button'],
                text: 'Update car',
                callback: () => {
                  a.updatedId.id &&
                    i.createCarActions.updateCar(a.updatedId.id, a.updatedCar);
                },
              })),
              this.updateContainer.addInnerElement(this.updateCarButton);
          }
          initRaceContainer() {
            (this.raceContainer = new u.ViewCreator({
              tag: 'div',
              css: ['race-container'],
            })),
              (r.domElements.raceContainer = this.raceContainer),
              this.addInnerElement(this.raceContainer),
              (this.raceButton = new l.ButtonsCreator({
                tag: 'button',
                css: ['button', 'race-button'],
                text: 'Race',
                callback: () => {
                  s.RaceControlActions.race(this);
                },
              }).getElement()),
              this.raceContainer.addInnerElement(this.raceButton),
              (this.resetButton = new l.ButtonsCreator({
                tag: 'button',
                css: ['button', 'race-button'],
                text: 'Reset',
                callback: () => {
                  s.RaceControlActions.reset(this);
                },
              }).getElement()),
              this.resetButton instanceof HTMLButtonElement &&
                (this.resetButton.disabled = !0),
              this.raceContainer.addInnerElement(this.resetButton),
              (this.generateCarsButton = new l.ButtonsCreator({
                tag: 'button',
                css: ['button', 'race-button'],
                text: 'Generate cars',
                callback: () => {
                  s.RaceControlActions.generateCars(this);
                },
              }).getElement()),
              this.raceContainer.addInnerElement(this.generateCarsButton);
          }
        }
        e.CarControlPanel = h;
      },
      6022: (t, e, n) => {
        n.d(e, { A: () => s });
        var a = n(1601),
          r = n.n(a),
          i = n(6314),
          o = n.n(i)()(r());
        o.push([
          t.id,
          '.car-way{border-bottom:.5rem dotted #000}.control-container{display:flex;flex-direction:row;align-items:center;gap:1rem}.car-name{font-size:2rem}.car-container{display:flex;gap:1rem;align-items:center}.car-button{height:3rem}.trip-container{display:flex;flex-direction:row;align-items:end}.car{width:100px}.flag{height:5rem;width:5rem;position:absolute;right:25%}@media(max-width: 700px){.flag{right:30%}}',
          '',
        ]);
        const s = o;
      },
      6314: (t) => {
        t.exports = function (t) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var n = '',
                  a = void 0 !== e[5];
                return (
                  e[4] && (n += '@supports ('.concat(e[4], ') {')),
                  e[2] && (n += '@media '.concat(e[2], ' {')),
                  a &&
                    (n += '@layer'.concat(
                      e[5].length > 0 ? ' '.concat(e[5]) : '',
                      ' {',
                    )),
                  (n += t(e)),
                  a && (n += '}'),
                  e[2] && (n += '}'),
                  e[4] && (n += '}'),
                  n
                );
              }).join('');
            }),
            (e.i = function (t, n, a, r, i) {
              'string' == typeof t && (t = [[null, t, void 0]]);
              var o = {};
              if (a)
                for (var s = 0; s < this.length; s++) {
                  var l = this[s][0];
                  null != l && (o[l] = !0);
                }
              for (var c = 0; c < t.length; c++) {
                var d = [].concat(t[c]);
                (a && o[d[0]]) ||
                  (void 0 !== i &&
                    (void 0 === d[5] ||
                      (d[1] = '@layer'
                        .concat(d[5].length > 0 ? ' '.concat(d[5]) : '', ' {')
                        .concat(d[1], '}')),
                    (d[5] = i)),
                  n &&
                    (d[2]
                      ? ((d[1] = '@media '
                          .concat(d[2], ' {')
                          .concat(d[1], '}')),
                        (d[2] = n))
                      : (d[2] = n)),
                  r &&
                    (d[4]
                      ? ((d[1] = '@supports ('
                          .concat(d[4], ') {')
                          .concat(d[1], '}')),
                        (d[4] = r))
                      : (d[4] = ''.concat(r))),
                  e.push(d));
              }
            }),
            e
          );
        };
      },
      6414: (t, e, n) => {
        n.r(e), n.d(e, { default: () => v });
        var a = n(5072),
          r = n.n(a),
          i = n(7825),
          o = n.n(i),
          s = n(7659),
          l = n.n(s),
          c = n(5056),
          d = n.n(c),
          u = n(540),
          h = n.n(u),
          p = n(1113),
          m = n.n(p),
          g = n(2783),
          C = {};
        (C.styleTagTransform = m()),
          (C.setAttributes = d()),
          (C.insert = l().bind(null, 'head')),
          (C.domAPI = o()),
          (C.insertStyleElement = h()),
          r()(g.A, C);
        const v = g.A && g.A.locals ? g.A.locals : void 0;
      },
      6442: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.WinnersView = void 0);
        const a = n(9194),
          r = n(1530),
          i = n(2528);
        class o extends i.PageCreator {
          constructor(t) {
            super(t),
              (this.navBar = void 0),
              this.addNav(),
              this.addHeader(this.element, {
                tag: 'h1',
                css: ['page-header'],
                text: 'Winners()',
              }),
              this.renderWinners();
          }
          addNav() {
            (this.navBar = new a.NavBar({
              tag: 'nav',
              css: ['nav-bar'],
            }).getElement()),
              this.addInnerElement(this.navBar);
          }
          renderWinners() {
            (this.winnersTable = new r.WinnersContainer({
              tag: 'div',
              css: ['winners-container'],
            })),
              this.addInnerElement(this.winnersTable.getElement());
          }
        }
        e.WinnersView = o;
      },
      6811: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.animationState = void 0),
          (e.animationState = {});
      },
      6886: (t, e, n) => {
        n.d(e, { A: () => s });
        var a = n(1601),
          r = n.n(a),
          i = n(6314),
          o = n.n(i)()(r());
        o.push([
          t.id,
          '.garage-container{display:flex;flex-direction:column;gap:2rem}.page-number{font-size:2rem}.cars-container{display:flex;flex-direction:column;gap:1rem}.pagination-buttons{display:flex;gap:1rem}.pag-button{font-size:2rem}',
          '',
        ]);
        const s = o;
      },
      7033: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.InputCreator = void 0);
        const a = n(1651);
        class r extends a.HTMLElementCreator {
          constructor(t) {
            super(t),
              t.callback && this.setCallback(t.callback),
              this.setPlaceholder(t),
              this.setType(t);
          }
          setCallback(t) {
            this.element &&
              'function' == typeof t &&
              this.element.addEventListener('change', (e) => t(e));
          }
          setPlaceholder(t) {
            this.element &&
              this.element instanceof HTMLInputElement &&
              (this.element.placeholder = t.placeholder || '');
          }
          setType(t) {
            this.element &&
              this.element instanceof HTMLInputElement &&
              (this.element.type = t.type || '');
          }
        }
        e.InputCreator = r;
      },
      7287: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ViewUtilities = void 0),
          (e.ViewUtilities = class {
            static clearElement(t) {
              var e;
              if (t)
                for (; t.firstChild; )
                  null === (e = t.firstChild) || void 0 === e || e.remove();
            }
          });
      },
      7317: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.Animation = void 0);
        class n {
          static getPosition(t) {
            const {
              top: e,
              left: n,
              width: a,
              height: r,
            } = t.getBoundingClientRect();
            return { x: n + a / 2, y: e + r / 2 };
          }
          static getDistance(t, e) {
            const a = n.getPosition(t),
              r = n.getPosition(e);
            return Math.hypot(a.x - r.x, a.y - r.y);
          }
          static animation(t, e, n) {
            const a = t;
            let r;
            const i = { id: 1 },
              o = (t) => {
                r || (r = t);
                const s = t - r,
                  l = Math.round(s * (e / n));
                (a.style.transform = `translateX(${Math.min(l, e)}px)`),
                  l < e && (i.id = globalThis.requestAnimationFrame(o));
              };
            return (i.id = globalThis.requestAnimationFrame(o)), i;
          }
        }
        e.Animation = n;
      },
      7659: (t) => {
        var e = {};
        t.exports = function (t, n) {
          var a = (function (t) {
            if (void 0 === e[t]) {
              var n = document.querySelector(t);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (t) {
                  n = null;
                }
              e[t] = n;
            }
            return e[t];
          })(t);
          if (!a)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            );
          a.appendChild(n);
        };
      },
      7825: (t) => {
        t.exports = function (t) {
          if ('undefined' == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = t.insertStyleElement(t);
          return {
            update: function (n) {
              !(function (t, e, n) {
                var a = '';
                n.supports && (a += '@supports ('.concat(n.supports, ') {')),
                  n.media && (a += '@media '.concat(n.media, ' {'));
                var r = void 0 !== n.layer;
                r &&
                  (a += '@layer'.concat(
                    n.layer.length > 0 ? ' '.concat(n.layer) : '',
                    ' {',
                  )),
                  (a += n.css),
                  r && (a += '}'),
                  n.media && (a += '}'),
                  n.supports && (a += '}');
                var i = n.sourceMap;
                i &&
                  'undefined' != typeof btoa &&
                  (a +=
                    '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                      ' */',
                    )),
                  e.styleTagTransform(a, t, e.options);
              })(e, t, n);
            },
            remove: function () {
              !(function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(e);
            },
          };
        };
      },
      7913: function (t, e, n) {
        var a =
          (this && this.__awaiter) ||
          function (t, e, n, a) {
            return new (n || (n = Promise))(function (r, i) {
              function o(t) {
                try {
                  l(a.next(t));
                } catch (t) {
                  i(t);
                }
              }
              function s(t) {
                try {
                  l(a.throw(t));
                } catch (t) {
                  i(t);
                }
              }
              function l(t) {
                var e;
                t.done
                  ? r(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(o, s);
              }
              l((a = a.apply(t, e || [])).next());
            });
          };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.RaceControlActions = void 0);
        const r = n(4723),
          i = n(5420),
          o = n(3661),
          s = n(3081),
          l = n(649);
        e.RaceControlActions = class {
          static race(t) {
            return a(this, void 0, void 0, function* () {
              t.raceButton instanceof HTMLButtonElement &&
                (t.raceButton.disabled = !0),
                t.resetButton instanceof HTMLButtonElement &&
                  (t.resetButton.disabled = !1),
                yield Promise.all(
                  i.raceCars.map((t) =>
                    a(this, void 0, void 0, function* () {
                      return s.Driving.startDriving(t.id, t);
                    }),
                  ),
                )
                  .then(() => {
                    i.succesArray.sort((t, e) => t.time - e.time),
                      console.log(i.succesArray);
                    const t = i.succesArray[0];
                    return console.log(t), o.Api.sendWinner(t), t;
                  })
                  .then((t) =>
                    a(this, void 0, void 0, function* () {
                      var e, n;
                      const a = yield o.Api.getCar(String(t.id));
                      console.log(a.name),
                        null ===
                          (n =
                            null === (e = r.domElements.raceContainer) ||
                            void 0 === e
                              ? void 0
                              : e.element) ||
                          void 0 === n ||
                          n.insertAdjacentText(
                            'beforeend',
                            `Winner: ${a.name} - time: ${t.time}`,
                          ),
                        (i.succesArray.length = 0);
                    }),
                  );
            });
          }
          static reset(t) {
            var e, n, a;
            const o =
              null ===
                (n =
                  null === (e = r.domElements.raceContainer) || void 0 === e
                    ? void 0
                    : e.element) || void 0 === n
                ? void 0
                : n.lastChild;
            o instanceof Text && o.remove(),
              t.raceButton instanceof HTMLButtonElement &&
                (t.raceButton.disabled = !1),
              t.resetButton instanceof HTMLButtonElement &&
                (t.resetButton.disabled = !0);
            for (const t of i.raceCars)
              null === (a = t.stopButton) || void 0 === a || a.click();
          }
          static generateCars(t) {
            return a(this, void 0, void 0, function* () {
              var e;
              t.generateCarsButton instanceof HTMLButtonElement &&
                (t.generateCarsButton.disabled = !0);
              const n = l.RandomCarGenerator.generateRandomCars();
              yield Promise.all(
                n.map((t) =>
                  a(this, void 0, void 0, function* () {
                    return o.Api.getCreateCar(t);
                  }),
                ),
              ),
                null === (e = r.domElements.garageView) ||
                  void 0 === e ||
                  e.renderView(),
                t.generateCarsButton instanceof HTMLButtonElement &&
                  (t.generateCarsButton.disabled = !1);
            });
          }
        };
      },
      8156: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.app = void 0);
        const a = n(275);
        e.app = new a.App();
      },
      8582: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ViewCreator = void 0);
        const a = n(1651);
        class r extends a.HTMLElementCreator {
          constructor(t) {
            super(t), this.setTextContent(t.text);
          }
        }
        e.ViewCreator = r;
      },
      9114: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.InputActions = void 0),
          (e.InputActions = class {
            static sendInput(t, e) {
              t.element instanceof HTMLInputElement &&
                'text' === t.element.type &&
                (e.name = t.element.value),
                t.element instanceof HTMLInputElement &&
                  'color' === t.element.type &&
                  (e.color = t.element.value);
            }
          });
      },
      9194: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.NavBar = void 0);
        const a = n(1651),
          r = n(5280),
          i = n(9803);
        n(5244);
        class o extends a.HTMLElementCreator {
          constructor(t) {
            super(t),
              (this.garageButton = void 0),
              (this.winnersButton = void 0),
              this.createView();
          }
          createView() {
            (this.garageButton = new r.ButtonsCreator({
              tag: 'button',
              css: ['button', 'nav-bar__button'],
              text: 'Garage',
              callback: () => i.NavActions.navigateToPage('garage'),
            }).getElement()),
              this.addInnerElement(this.garageButton),
              (this.winnersButton = new r.ButtonsCreator({
                tag: 'button',
                css: ['button', 'nav-bar__button'],
                text: 'Winners',
                callback: () => i.NavActions.navigateToPage('winners'),
              }).getElement()),
              this.addInnerElement(this.winnersButton);
          }
        }
        e.NavBar = o;
      },
      9219: (t, e, n) => {
        n.r(e), n.d(e, { default: () => v });
        var a = n(5072),
          r = n.n(a),
          i = n(7825),
          o = n.n(i),
          s = n(7659),
          l = n.n(s),
          c = n(5056),
          d = n.n(c),
          u = n(540),
          h = n.n(u),
          p = n(1113),
          m = n.n(p),
          g = n(6022),
          C = {};
        (C.styleTagTransform = m()),
          (C.setAttributes = d()),
          (C.insert = l().bind(null, 'head')),
          (C.domAPI = o()),
          (C.insertStyleElement = h()),
          r()(g.A, C);
        const v = g.A && g.A.locals ? g.A.locals : void 0;
      },
      9380: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.createCarActions = void 0);
        const a = n(4723),
          r = n(3661);
        e.createCarActions = class {
          static createCar(t) {
            '' !== t.name &&
              '' !== t.color &&
              r.Api.getCreateCar(t).then(() => {
                var e;
                null === (e = a.domElements.garageView) ||
                  void 0 === e ||
                  e.renderView(),
                  (t.name = ''),
                  (t.color = '#000000');
              });
          }
          static updateCar(t, e) {
            var n;
            r.Api.updateCar(t, e),
              null === (n = a.domElements.garageView) ||
                void 0 === n ||
                n.renderView();
          }
        };
      },
      9803: (t, e, n) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.NavActions = void 0);
        const a = n(8156);
        e.NavActions = class {
          static navigateToPage(t) {
            a.app.renderApp(t);
          }
        };
      },
      9816: function (t, e, n) {
        var a =
          (this && this.__awaiter) ||
          function (t, e, n, a) {
            return new (n || (n = Promise))(function (r, i) {
              function o(t) {
                try {
                  l(a.next(t));
                } catch (t) {
                  i(t);
                }
              }
              function s(t) {
                try {
                  l(a.throw(t));
                } catch (t) {
                  i(t);
                }
              }
              function l(t) {
                var e;
                t.done
                  ? r(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(o, s);
              }
              l((a = a.apply(t, e || [])).next());
            });
          };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.GarageView = void 0);
        const r = n(6018),
          i = n(3426),
          o = n(9194),
          s = n(4723),
          l = n(3661),
          c = n(7287),
          d = n(2528);
        class u extends d.PageCreator {
          constructor(t) {
            super(t), (this.CarCount = ''), this.renderView();
          }
          renderView() {
            this.updateCarsCount().then(() => {
              c.ViewUtilities.clearElement(this.element),
                this.init({ tag: 'section', css: ['garage-container'] });
            });
          }
          init(t) {
            (this.navBar = new o.NavBar({
              tag: 'nav',
              css: ['nav-bar'],
            }).getElement()),
              this.addInnerElement(this.navBar),
              (this.CarControlPanel = new r.CarControlPanel({
                tag: 'div',
                css: ['car-control-panel'],
              }).getElement()),
              this.addInnerElement(this.CarControlPanel),
              this.addHeader(this.element, {
                tag: 'h1',
                css: ['page-header'],
                text: `Garage(${this.CarCount})`,
              }),
              (this.garageContainer = new i.GarageContainer(t)),
              (s.domElements.garageContainer = this.garageContainer),
              this.addInnerElement(this.garageContainer);
          }
          updateCarsCount() {
            return a(this, void 0, void 0, function* () {
              const t = yield l.Api.getCarsCount();
              this.CarCount = t;
            });
          }
        }
        e.GarageView = u;
      },
      9877: (t, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.FlagImage = void 0),
          (e.FlagImage =
            '<svg version="1.1" id="Layer_1" class="flag-image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polyline style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" points="6,28 6,5 26,5 26,19 6,19 "></polyline> <rect x="22" y="5" width="4" height="4"></rect> <rect x="19" y="15" width="3" height="4"></rect> <rect x="19" y="9" width="3" height="3"></rect> <rect x="13" y="15" width="3" height="4"></rect> <rect x="13" y="9" width="3" height="3"></rect> <rect x="6" y="15" width="4" height="4"></rect> <rect x="6" y="9" width="4" height="3"></rect> <rect x="22" y="12" width="4" height="3"></rect> <rect x="16" y="12" width="3" height="3"></rect> <rect x="10" y="12" width="3" height="3"></rect> <rect x="16" y="5" width="3" height="4"></rect> <rect x="10" y="5" width="3" height="4"></rect> </g></svg>');
      },
    },
    e = {};
  function n(a) {
    var r = e[a];
    if (void 0 !== r) return r.exports;
    var i = (e[a] = { id: a, exports: {} });
    return t[a].call(i.exports, i, i.exports, n), i.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var a in e)
        n.o(e, a) &&
          !n.o(t, a) &&
          Object.defineProperty(t, a, { enumerable: !0, get: e[a] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (n.r = (t) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (n.nc = void 0),
    n(8156);
})();
