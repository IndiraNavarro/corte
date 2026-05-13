"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Tuition_1 = require("./Tuition");
class Car extends sequelize_1.Model {
}
exports.Car = Car;
Car.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: { msg: "Brand is required" },
            notEmpty: { msg: "Brand cannot be empty" },
            len: {
                args: [2, 100],
                msg: "Brand must be between 2 and 100 characters",
            },
        },
    },
    carClass: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        field: "class",
        validate: {
            notNull: { msg: "Class is required" },
            notEmpty: { msg: "Class cannot be empty" },
            len: {
                args: [2, 100],
                msg: "Class must be between 2 and 100 characters",
            },
        },
    },
    model: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: { msg: "Model is required" },
            notEmpty: { msg: "Model cannot be empty" },
            len: {
                args: [1, 100],
                msg: "Model must be between 1 and 100 characters",
            },
        },
    },
    displacement: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Displacement is required" },
            isInt: { msg: "Displacement must be an integer number" },
            min: {
                args: [1],
                msg: "Displacement must be greater than 0",
            },
        },
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Capacity is required" },
            isInt: { msg: "Capacity must be an integer number" },
            min: {
                args: [1],
                msg: "Capacity must be greater than 0",
            },
        },
    },
    status: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false,
        defaultValue: "ACTIVE",
        validate: {
            notNull: { msg: "Status is required" },
            notEmpty: { msg: "Status cannot be empty" },
            isIn: {
                args: [["ACTIVE", "INACTIVE"]],
                msg: "Status must be ACTIVE or INACTIVE",
            },
        },
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Car",
    tableName: "cars",
    timestamps: false,
});
Car.hasMany(Tuition_1.Tuition, {
    foreignKey: "car_id",
    sourceKey: "id",
});
Tuition_1.Tuition.belongsTo(Car, {
    foreignKey: "car_id",
    targetKey: "id",
});
