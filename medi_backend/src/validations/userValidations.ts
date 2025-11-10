import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "rider").required(),
  ambulanceName: Joi.string().when("role", { is: "rider", then: Joi.required() }),
  ambulanceNumber: Joi.string().when("role", { is: "rider", then: Joi.required() }),
  hasMedicalTraining: Joi.boolean(),
  imageUrl: Joi.string().uri().optional(),
  address: Joi.string().required(),
});
