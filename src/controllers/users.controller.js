import { UserModel } from "../models/mongoose/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    // TODO: devolver usuarios con profile y sus assets con sus categories (populate) (solo admin)
    const users = await UserModel.find().populate({
      path: "assets",
      select: "inventoryNumber description status",
      populate: {
        path: "categories",
        select: "name",
      },
    });
    console.log(req.user);
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    // TODO: eliminación lógica (deletedAt) (solo admin)
    const deletedUser = await UserModel.findOneAndUpdate(
      _id,
      { deletedAt: new Date() },
      { new: true }
    );
    return res
      .status(204)
      .json({ msg: "Usuario eliminado correctamente.", data: deletedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
