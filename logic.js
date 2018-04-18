/* global Vue */
new Vue({
  el: '#app',
  data: {
    heroes: [
      {
        name: 'Hulk',
        weight: 630,
        speed: 65,
        strength: 1000,
      }, {
        name: 'Wonder Woman',
        weight: 60,
        speed: 220,
        strength: 1200,
      }, {
        name: 'Ant-man',
        weight: 85,
        speed: 50,
        strength: 900,
      }, {
        name: 'Doctor Manhatten',
        weight: 80,
        speed: 600,
        strength: 800,
      },{
        name: 'Jean Grey',
        weight: 55,
        speed: 200,
        strength: 700,
      },
    ],
    filter: '',
    sortDirection: '',
    newHeroName: '',
    newHeroWeight: '',
    newHeroSpeed: '',
    newHeroStrength: '',
  },
  computed: {
    herosComputed() {
      return this.heroes.filter((hero) => {
        return hero.name.toUpperCase().startsWith(this.filter.toUpperCase())
      }).sort((a, b) => {
        switch (this.sortDirection) {
          case 'ASC':
            return a.name > b.name
          case 'DESC':
            return a.name < b.name
          case 'RANDOM':
            return Math.round(Math.random())
          default:
            return false
        }
      })
    },
    totals() {
      let totals = {weight:0, speed:0, strength:0}
      for (const hero of this.heroes) {
        totals.weight += hero.weight
        totals.speed += hero.speed
        totals.strength += hero.strength
      }
      return totals
    },
  },
  methods: {
    filterByName(event) {
      this.filter = event.target.value
    },
    sortAscending() {
      this.sortDirection = 'ASC'
    },
    sortDescending() {
      this.sortDirection = 'DESC'
    },
    shuffle() {
      // Make sure that Vue sees the property as having changed even if it was already random
      this.sortDirection = ''
      this.sortDirection = 'RANDOM'
    },
    addHero() {
      // Contrived example of a promise
      promiseToAddHero(this, {
        name: this.newHeroName,
        weight: parseInt(this.newHeroWeight),
        speed: parseInt(this.newHeroSpeed),
        strength: parseInt(this.newHeroStrength),
      })
        .then((result) => console.log(result))
        .catch((message) => console.log(message))

      // This is how it would be done without the promise
      // this.heroes.push({
      //   name: this.newHeroName,
      //   weight: parseInt(this.newHeroWeight),
      //   speed: parseInt(this.newHeroSpeed),
      //   strength: parseInt(this.newHeroStrength),
      // })
    },
  },
})

/**
 * This is a highly contrived example to show using a promise.
 *
 * @param {Vue} vue
 * @param {object} hero
 */
const promiseToAddHero = (vue, hero) => {
  return new Promise((resolve, reject) => {
    if (hero.weight <= 0 || hero.speed <= 0 || hero.strength <= 0) {
      reject('Values for weight, speed, and strength must be greater than 0')
      return
    }
    setTimeout(
      () => {
        vue.heroes.push(hero)
        resolve('Success')
      }, 1000)
  })
}