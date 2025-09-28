import Joi from 'joi';

export const postQuerySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .optional()
    .messages({
      'string.min': 'El filtro por nombre debe tener al menos 2 caracteres',
      'string.max': 'El filtro por nombre no puede exceder 50 caracteres',
      'string.empty': 'El filtro por nombre no puede estar vacío'
    })
}).options({
  allowUnknown: false, // No permitir parámetros desconocidos
  stripUnknown: false, // No eliminar parámetros desconocidos, generar error
  abortEarly: false    // Validar todos los campos y retornar todos los errores
});

export type PostQueryParams = {
  name?: string;
};