"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tuition = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
class Tuition extends sequelize_1.Model {
}
exports.Tuition = Tuition;
Tuition.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    registrationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "date_matricula",
        validate: {
            notNull: { msg: "Registration date is required" },
            isDate: {
                args: true,
                msg: "Registration date must be a valid date",
            },
        },
    },
    city: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: { msg: "City is required" },
            notEmpty: { msg: "City cannot be empty" },
            len: {
                args: [2, 100],
                msg: "City must be between 2 and 100 characters",
            },
        },
    },
    payment: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: { msg: "Payment is required" },
            isDecimal: { msg: "Payment must be a decimal number" },
            min: {
                args: [0],
                msg: "Payment cannot be negative",
            },
        },
    },
    carId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "car_id",
        references: {
            model: "cars",
            key: "id",
        },
        validate: {
            notNull: { msg: "Car id is required" },
            isInt: { msg: "Car id must be an integer number" },
            min: {
                args: [1],
                msg: "Car id must be greater than 0",
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
    modelName: "Tuition",
    tableName: "tuitions",
    timestamps: false,
});
