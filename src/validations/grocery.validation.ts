import Joi from "joi";

export const grocerySchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        groceryId: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .required(),
});

export const addGrocerySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().min(1).required(),
});
