export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isPositiveNumber = (value) => Number(value) > 0;