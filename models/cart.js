const path = require('path')
const fs = require('fs')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
)

class Cart {
  static async add(course) {
    const cart = await Cart.fetch()

    const idx = cart.courses.findIndex(c => c.id === course.id)
    const candidate = cart.courses[idx]

    if (candidate) {
      candidate.count++
      cart.courses[idx] = candidate
    } else {

      course.count = 1
      cart.courses.push(course)
    }

    cart.price += +course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      })
    })
  }
}

module.exports = Cart