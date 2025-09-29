import jwt from "jsonwebtoken";

// * funcion para crear un token con una firma secreta y un tiempo de expiración
export const signToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      role: user.role,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name,
      employee_number: user.profile.employee_number,
      phone: user.profile.phone,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

// * funcion para verificar que un token este con la misma firma secreta
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
