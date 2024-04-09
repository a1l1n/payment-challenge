import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Payment } from "../models/Payment.js";

const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
    
        //Controlar que no falten datos
        if (!fullName || !email || !password) return res.status(400).json({ message: "Incomplete fields"});

        if (password.length < 8) return res.status(400).json({message: "The password must have between 8 and 20 characters"})
        
        //Buscar duplicado de usuario por mail
        const duplicated = await User.findOne({
            where: {
                email: email
            }
        });
    
        if (duplicated) return res.status(400).json({ message: "User already exists" });
        
        // hasheo de contraseña
        const hash = bcrypt.hashSync(password, saltRounds);

        // Registrar usuario
        const newUser = await User.create({
            fullName,
            email,
            password: hash,
        })

        // Genero un token JWT
        const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: '1h' });

        // Envio la data al cliente x cookie
        return res.status(200).cookie("jwt", token, { maxAge: 3600000 }).json(newUser);
        
    } catch (error) {
        console.error("User registration error", error);
        return res.status(400).json({ message: "User registration error" })
    }
};

export const postLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Incomplete fields" });
        
        // Busco al usuario por el mail
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Comparo las contraseñas
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
            // Genero un token JWT
                const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
                res.cookie("jwt")
            
                // Envio la data al cliente x cookie
                return res.status(200).cookie("jwt", token, { maxAge: 3600000 }).json(user);
            }

            res.status(404).json({ message: "Invalid Email or Password" })
        }
    } catch (error) {
        console.log("User login error", error.message);
        return res.status(400).json({ message: "User login error" })
    }
};


export const logOut = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.status(200).json({message: "Successfull Logout"})
};

export const getAllPayments = async (req, res) => {
    try {
        const { id } = req.params; 
        // Devuelve el arreglo de pagos realizados por un usuario
        const allPayments = await Payment.findAll({
            where: {
               userId: id 
            }
        });
        return res.json(allPayments);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        if (allUsers) return res.json(allUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};
