export const getPasswordStrength = (password: string) => {
  if (!password) return "";

  if (password.length < 6) return "weak";

  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*]/.test(password);

  if (hasNumber && hasUpper && hasSymbol) return "strong";

  if (hasNumber || hasUpper) return "medium";

  return "weak";
};
