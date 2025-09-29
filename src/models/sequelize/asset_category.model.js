import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA

AssetModel.belongsToMany(CategoryModel, {
  through: AssetCategoryModel,
  foreignKey: "category_id",
  as: "assets",
});

CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategoryModel,
  foreignKey: "asset_id",
  as: "categories",
});

AssetCategoryModel.belongTo(AssetModel, {
  foreignKey: "asset_id",
  as: "assets",
});

AssetCategoryModel.belongsTo(CategoryModel, {
  foreignKey: "category_id",
  as: "categories",
});
