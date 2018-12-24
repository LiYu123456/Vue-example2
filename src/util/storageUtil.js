
const gender = 'gender'
export default {
  save (gender) {
    window.localStorage.setItem(gender, JSON.stringify(gender))
  },

  read () {
    return JSON.parse(window.localStorage.getItem(gender) || '[]')
  }
}
