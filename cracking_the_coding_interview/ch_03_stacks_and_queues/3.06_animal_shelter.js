const { LinkedList } = require('../../utils')

const Animal = (() => {
  let order

  class Animal {
    constructor(name) {
      this.name = name
    }

    get order() {
      return order
    }

    setOrder(i) {
      order = i
    }

    isOlderThan(animal) {
      return order < animal.order
    }
  }
  return Animal
})()

class Dog extends Animal {
  constructor(name) {
    super(name)
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name)
  }
}

const AnimalShelter = (() => {
  let dogs = new LinkedList(),
    cats = new LinkedList(),
    order = 0

  class AnimalShelter {
    get size() {
      return dogs.size + cats.size
    }

    enqueue(animal) {
      animal.setOrder(order)
      order++
      if (animal instanceof Dog) {
        dogs.appendToTail(animal)
      } else if (animal instanceof Cat) {
        cats.appendToTail(animal)
      }
    }

    dequeueAny() {
      const dog = this.peekDogs(),
        cat = this.peekCats()

      if (!cat || dog.isOlderThan(cat)) return this.dequeueDogs()
      else {
        return this.dequeueCats()
      }
    }

    dequeueCats() {
      return cats.deleteFromHead()
    }

    dequeueDogs() {
      return dogs.deleteFromHead()
    }

    peekDogs() {
      return dogs.head ? dogs.head.val : null
    }

    peekCats() {
      return cats.head ? cats.head.val : null
    }
  }
  return AnimalShelter
})()

const cat = new Cat('neko')
const cat1 = new Cat('kuro')
const dog = new Dog('hachi')
const dog1 = new Dog('kenta')

const shelter = new AnimalShelter()
shelter.enqueue(cat)
shelter.enqueue(dog)
shelter.enqueue(cat1)
shelter.enqueue(dog1)

console.log('size', shelter.size)
console.log('peekCats: ', shelter.peekCats())

console.log('dequeueAny', shelter.dequeueAny())
console.log('dequeueCats', shelter.dequeueCats())
console.log('dequeueDogs', shelter.dequeueDogs())
console.log('dequeueAny', shelter.dequeueAny())
console.log('dequeueAny', shelter.dequeueAny())
console.log('dequeueDogs', shelter.dequeueDogs())
