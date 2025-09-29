import { Schema, Types, model } from "mongoose";

// TODO: completar relaciones embebidas y referenciadas

const AssetSchema = new Schema(
  {
    inventoryNumber: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    brand: { type: String, required: true, minlength: 2, maxlength: 100 },
    model: { type: String, required: true, minlength: 2, maxlength: 100 },
    status: {
      type: String,
      enum: ["good", "regular", "bad", "out_of_service"],
      default: "good",
    },
    acquisitionDate: { type: Date, required: true },
    acquisitionValue: { type: Number, required: true, min: 0 },
    // ! FALTA COMPLETAR ACA

    // *Relacion 1:N con User
    responsible: {
      type: Types.ObjectId,
      ref: "User",
      requiered: true,
    },
    // * Relacion N:M con Category
    categories: {
      type: [Types.ObjectId],
      ref: "Category",
    },
  },
  { timestamps: true }
);

// AssetSchema.post("findOneAndDelete", async function (doc) {
//   //* doc seria el asset borrado
//   if(doc){
//     try {
//       await
//     } catch (error) {

//     }
//   }
// });

export const AssetModel = model("Asset", AssetSchema);
