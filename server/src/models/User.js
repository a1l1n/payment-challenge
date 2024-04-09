import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { Payment } from "./Payment.js";

export const User = sequelize.define('user', {
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
     fullName: {
         type: DataTypes.STRING,
         allowNull: false
     },
     password: {
         type: DataTypes.STRING,
         allowNull: false,
     },
     email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: "emailIndex",
         validate: {
             isEmail: true
         }
     }
 });

 // Relación de tablas ------------------------------------------------
 User.hasMany(Payment, {
    foreignKey: 'userId',
    sourceKey: 'id'
 });

 Payment.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id'
 })