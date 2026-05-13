import { Router } from "express";
import { CarRoutes } from "./car";
import { TuitionRoutes } from "./tuition";

export class Routes {
// agrega tus rutas aquí de la siguiente manera
public tuitionRoutes: TuitionRoutes = new TuitionRoutes();
public carRoutes: CarRoutes = new CarRoutes();
}
