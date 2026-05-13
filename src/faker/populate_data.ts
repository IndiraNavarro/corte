import { sequelize } from "../database/db";
import { Car } from "../models/Car";
import { Tuition } from "../models/Tuition";

type FakerInstance = typeof import("@faker-js/faker")["faker"];

const loadFaker = async (): Promise<FakerInstance> => {
  const fakerModule = (await new Function(
    "moduleName",
    "return import(moduleName)"
  )("@faker-js/faker")) as typeof import("@faker-js/faker");

  return fakerModule.faker;
};

async function createFakeData() {
  const faker = await loadFaker();

  await sequelize.authenticate();
  await sequelize.sync();

  const carBrands = [
    "Toyota",
    "Chevrolet",
    "Renault",
    "Mazda",
    "Nissan",
    "Hyundai",
    "Kia",
    "Ford",
    "Volkswagen",
    "Honda",
  ];

  const carClasses = [
    "Automovil",
    "Camioneta",
    "Motocicleta",
    "Buseta",
    "Campero",
    "Pickup",
  ];

  const carModels = [
    "Corolla",
    "Spark",
    "Logan",
    "CX-30",
    "Versa",
    "Tucson",
    "Picanto",
    "Ranger",
    "Gol",
    "Civic",
  ];

  const cities = [
    "Bogota",
    "Medellin",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Pereira",
    "Manizales",
    "Santa Marta",
    "Ibague",
  ];

  const cars = [];

  for (let i = 0; i < 50; i++) {
    const car = await Car.create({
      brand: faker.helpers.arrayElement(carBrands),
      carClass: faker.helpers.arrayElement(carClasses),
      model: `${faker.helpers.arrayElement(carModels)} ${faker.number.int({
        min: 2010,
        max: 2026,
      })}`,
      displacement: faker.number.int({ min: 1000, max: 5000 }),
      capacity: faker.number.int({ min: 2, max: 50 }),
      status: "ACTIVE",
    });

    cars.push(car);
  }

  for (let i = 0; i < 100; i++) {
    const car = faker.helpers.arrayElement(cars);

    await Tuition.create({
      registrationDate: faker.date.past({ years: 8 }),
      city: faker.helpers.arrayElement(cities),
      payment: faker.number
        .float({ min: 150000, max: 2500000, fractionDigits: 2 })
        .toFixed(2),
      carId: car.id,
      status: "ACTIVE",
    });
  }

  console.log("Datos falsos creados correctamente.");
  console.log(`Carros creados: ${cars.length}`);
  console.log("Matriculas creadas: 100");
}

createFakeData()
  .catch((error) => {
    console.error("Error creando datos falsos:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
