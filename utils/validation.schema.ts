import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const step1Schema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Min 3 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string().required("Phone is required").matches(/^(\+62|08)[0-9]{8,11}$/, "example: 08123456789"),
});

export const step2Schema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password doesn't match")
    .required("Confirm password is required"),
});

export const step3Schema = Yup.object().shape({});
