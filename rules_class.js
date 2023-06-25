/**
 * @class This class has to be called initially with new
 */

export class Rules {
    /**
     * @param {1 | 2 | -1} factor The factor must be between (1 and 2) and it can be an {float} value, 
     * If the value has been not provided it will use the default value (1) and If the factor is higher than 2 it will be defined to 2 by default
     * @param {HTMLElement} canvas_id It recieves the class HTMLElement, can recieve the values from the methods document.getElementById(element) || document.getElementsByClassName(element) 
     * and necessarily the element must be a (canvas tag) or otherwise it won't work
     * @param {Array<number>} quantity It recieves a integer value not < 0 that determines the amount of iterations of the document 
     * (e.g quantity[220, 290, 250, 100], color["green", "red", "yellow", "blue"], it will create 220 iterations to the green color,
     * will create 290 iterations to the red color and so on, the quantity[] index is relative to the color[] index)
     * @param {Array<string>} color It recieves a string containing the color names on it, keep eye on the names, 
     * it needs to be the same as the _rules propety and needs to be the accepted colors by CanvasRenderingContext2D.fillStyle (keyword (e.g blue, red, ...), rgb() or rgba(), hsl() or hsv())
     * @constructs RULES Javascript Object Like
     * @returns {JSON} Javascript Object as {String}
     */
    constructor(factor = 1, canvas_id, quantity, color) {
        if (factor != null) {
            if (factor > 2 || factor == 0) { factor == 2 } 
            // Rules equals reactivity within
            var RULES = {
                green: {
                    green: 0.878214014158254 * factor,
                    red: 0.383942932294564 * factor,
                    yellow: 0.3632328353781209 * factor,
                    blue: 0.4357079645785089 * factor,
                    },
                red: {
                    green: -0.8131279812066854 * factor,
                    red: 0.8761564046567396 * factor,
                    yellow: -0.686246916739194 * factor,
                    blue: -0.42403398294928163 * factor,
                },
                yellow: {
                    green: 0.8283611643992606 * factor,
                    red: -0.8050409003234531 * factor,
                    yellow: 0.8422661062679588 * factor,
                    blue: -0.6206303204367405 * factor,
                },
                blue: {
                    green: -0.6276679142294777 * factor,
                    red: -0.48726835984229977 * factor,
                    yellow: -0.8155039608681607 * factor,
                    blue: 0.49503848830455155 * factor,
                }
            }
            this._RULES = RULES


        update_canvas_dimensions()

        /**
         * @returns {void}
         */
        function update_canvas_dimensions() {
            canvas_id.width = window.innerWidth * 0.9
            canvas_id.height = window.innerHeight * 0.9
        }

        const m = canvas_id.getContext("2d")
        const draw = (x, y, c, s) => {
            m.fillStyle = c;
            m.fillRect(x, y, s, s)
        }

        const atoms = []
        const atom = (x, y, c) => {
            return { x: x, y: y, vx: 0, vy: 0, color: c }
        }

        const randomX = () => {
            return Math.random() * (canvas_id.width - 100) + 50
        }
        const randomY = () => {
            return Math.random() * (canvas_id.height - 100) + 50
        }

        const create = (number, color) => {
            for (let i = 0; i < number; i++) {
                atoms.push(atom(randomX(), randomY(), color))
            }
        }

        const apply_rules = () => {
            for (let i = 0; i < atoms.length; i++) {
              let fx = 0;
              let fy = 0;
              const a = atoms[i];
              for (let j = 0; j < atoms.length; j++) {
                if (j !== i) {
                  const b = atoms[j];
                  const g = RULES[a.color][b.color]; // * factor;
                  if (g !== undefined) {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    if (dx !== 0 || dy !== 0) {
                      const d = dx * dx + dy * dy;
                      if (d < 6400) {
                        const F = g / Math.sqrt(d);
                        fx += F * dx;
                        fy += F * dy;
                      }
                    }
                  }
                }
              }
              a.vx = (a.vx + fx) * 0.5;
              a.vy = (a.vy + fy) * 0.5;
              a.x += a.vx;
              a.y += a.vy;
              
              // When Atoms touch or bypass canvas borders
              // X - axis
              if (a.x <= 0) {
                a.vx *= -1;
                a.x = 0;
              }
              if (a.x >= canvas_id.width) {
                a.vx *= -1;
                a.x = canvas_id.width;
              }
              // Y - axis
              if (a.y <= 0) {
                a.vy *= -1;
                a.y = 0;
              }
              if (a.y >= canvas_id.height) {
                a.vy *= -1;
                a.y = canvas_id.height;
              }
            }
          }

        create(quantity[0], color[0])
        create(quantity[1], color[1])
        create(quantity[2], color[2])
        create(quantity[3], color[3])

        update()

        function update() {

            update_canvas_dimensions()

            apply_rules()


            m.clearRect(0, 0, canvas_id.width, canvas_id.height);
            draw(0, 0, "black", Math.max(canvas_id.height, canvas_id.width))
            for (let i = 0; i < atoms.length; i += 1) {
                draw(atoms[i].x, atoms[i].y, atoms[i].color, 3)
            }

            requestAnimationFrame(update)
          }
      }
    }

    // Terminar Rng caso queira Valores aleatorios

      random_value(random_factor = 2) {
        let random = new Uint32Array(1)
        random = crypto.getRandomValues(random)
        const min = random_factor
        const max = (Math.random() * (random_factor * (Math.random() + 1)) - random_factor) + random_factor
        

      }
}