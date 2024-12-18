import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .max(20, { message: "La contraseña no puede tener más de 20 caracteres" })
  .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
  .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
  .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
  .regex(/[\W_]/, { message: "La contraseña debe contener al menos un carácter especial" }); // carácter especial como @, #, etc.

const userSchema = z.object({
    username: z.string({
        invalid_type_error: 'Tipo de dato invalido en el nombre de usuario',
        required_error: 'El nombre de usuario es requerido'
    }),
    password: passwordSchema
});


export function validateUser (object)  {
    return userSchema.safeParse(object)
}

export function validatePartialMovie (object) {
    return  movieSchema.partial().safeParse(object)
}