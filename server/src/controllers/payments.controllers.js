import { Payment } from "../models/Payment.js";

export const createPayment = async (req, res) => {
    try {
        const { amount, date, type, addresse, description, userId } = req.body;

        // Controlar que no falten los campos obligatorios
        if (!amount || !date || !type || !addresse || !userId ) return res.status(400).json({ message: "Incomplete fields" });
        
        // Contorlar que la fecha venga con el formato correcto 
        const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/
        if (!dateFormatRegex.test(date)) return res.status(400).json({ message: "********** Invalid date format. Date must be in DD/MM/YYYY format" });

        // Controlar que ingrese un amount con formato correcto
        if (amount < 0) return res.status(400).json({ message: "********** Amount must be a non-negative number" });

        const newPayment = await Payment.create({
            amount, 
            date,
            type,
            addresse, 
            description,
            userId
        });
        console.log("Este es newPayment: ", newPayment);
        return res.status(200).json(newPayment)
    } catch (error) {
        console.log("**********New payment went wrong...", error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const getPayment = async (req, res) => {
    try {
        const { id } = req.params;
         
        // Busco el pago por id
        const pay = await Payment.findOne({
            where: {
                id
            }
        });

        if (!pay) return res.status(400).send({ message: "There is no payment available" })
        return res.status(200).json(pay);
    } catch (error) {
        console.log("********** Get Payment went wrong!", error);
        return res.status(500).json({ message: "Internal error " })
    }
}

export const editPaymentEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, date, type, addresse, description } = req.body;
        
        if (!amount || !date || !type || !addresse ) return res.status(400).json({ message: "Incomplete fields" });

        await Payment.update({
            amount, 
            date, 
            type, 
            addresse, 
            description
        }, {
            where: {
                id
            }
        });

        res.status(200).json({ message: "Edition successfully completed" })
        
    } catch (error) {
        console.log("********** Edit payment went wrong", error);
        res.status(500).json({ message: "There was a problem editing the Payment"})
    }
}

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        await Payment.destroy({
            where: {
                id
            }
        });
        res.status(200).json({ message: "Payment deleted!" })
    } catch (error) {
        res.status(500).json({ message: "There was a problem deleting the Payment" })
    }
};