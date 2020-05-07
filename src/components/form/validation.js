import isEmail from 'validator/lib/isEmail';

export function email(value) {
  return value && !isEmail(value.trim()) ? 'Por favor, instroduzca un correo valido' : null;
}

function isDirty(value) {
  return value || value === 0;
}

export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Este campo es requerido' }),
    }),
    {},
  );
}
