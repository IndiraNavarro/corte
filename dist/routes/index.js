"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const car_1 = require("./car");
const tuition_1 = require("./tuition");
class Routes {
    constructor() {
        // agrega tus rutas aquí de la siguiente manera
        this.tuitionRoutes = new tuition_1.TuitionRoutes();
        this.carRoutes = new car_1.CarRoutes();
    }
}
exports.Routes = Routes;
