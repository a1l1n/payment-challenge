import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isNumeric: true,
            isNonNegative(value) {
              if (value < 0) {
                throw new Error("Amount must be a non-negative number");
              }
            }
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    type: {
        type: DataTypes.ENUM,
        values: ["CASH", "DEBIT", "CREDIT", "BANK TRANSFER"]
    },
    addresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255]
        }
    }
});