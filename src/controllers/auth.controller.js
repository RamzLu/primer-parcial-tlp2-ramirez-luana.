import { comparePassword } from "../helpers/bcrypt.helper.js";
import { hashPassword } from "../helpers/bcrypt.helper.js ";
import { signToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    // TODO: crear usuario con password hasheada y profile embebido
    const hashedPassword = await hashPassword(password);
    await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
      profile: profile,
    });
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }

    const token = signToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  const user = req.user;
  try {
    // TODO: devolver profile del user logueado actualmente
    const profile = {
      first_name: user.first_name,
      last_name: user.last_name,
      employee_number: user.employee_number,
      phone: user.phone,
    };
    console.log(user);
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
