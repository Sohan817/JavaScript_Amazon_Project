class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(cardetails) {
    this.#brand = cardetails.brand;
    this.#model = cardetails.model;
  }

  go() {
    if (this.speed >= 0 && this.speed <= 200) {
      this.speed = this.speed + 5;
    }
  }
  break() {
    if (this.speed >= 0 && this.speed <= 200) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    this.isTrunkOpen = false;
    if (this.isTrunkOpen === false && this.speed === 0) {
      this.isTrunkOpen = true;
    }
    console.log(`${this.isTrunkOpen}`);
  }

  closeTrunk() {
    this.isTrunkOpen = false;
    if (this.isTrunkOpen === false && this.speed > 0) {
      this.isTrunkOpen = true;
    }
    console.log(`${this.isTrunkOpen}`);
  }

  #disPlayInfo() {
    console.log(`${this.brand} ${this.model} ${this.speed} km/h`);
  }
}

class RaceCar extends Car {
  acceleration = 0;
  constructor(accelerationValue) {
    super(accelerationValue);
    this.acceleration = accelerationValue.acceleration;
  }

  openTrunk() {
    this.isTrunkOpen = false;
    console.log(`${this.isTrunkOpen}`);
  }

  closeTrunk() {
    this.isTrunkOpen = false;
    console.log(`${this.isTrunkOpen}`);
  }

  go() {
    if (this.speed >= 0 && this.speed <= 300) {
      this.speed = this.speed + this.acceleration;
    }
  }
}

const raceCar1 = new RaceCar({
  brand: "MacLaren",
  model: "F1",
  acceleration: 20,
});

raceCar1.go();
raceCar1.break();
raceCar1.openTrunk();
raceCar1.closeTrunk();
raceCar1.disPlayInfo();
console.log(raceCar1);

// const car1 = new Car({
//   brand: "Toyota",
//   model: "Corola",
// });

// const car2 = new Car({
//   brand: "Tesla",
//   model: "model 3",
// });
// car1.go();
// car1.break();
// car1.openTrunk();
// car1.closeTrunk();
// car1.disPlayInfo();

// car2.go();
// car2.go();
// car2.go();
// car2.go();
// car2.break();
// car2.openTrunk();
// car2.closeTrunk();
// car2.disPlayInfo();

// console.log(car1);
// console.log(car2);
