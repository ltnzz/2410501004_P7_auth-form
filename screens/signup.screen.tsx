import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "../utils/validation.schema";
import { getPasswordStrength } from "../utils/password.strength.schema";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
  const navigation = useNavigation<any>();

  const emailRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);
  const confirmRef = React.useRef<TextInput>(null);

  const [step, setStep] = React.useState(1);
  const [passwordStrength, setPasswordStrength] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const getSchemaByStep = (step: number) => {
    switch (step) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      default:
        return step1Schema;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getSchemaByStep(step),
    onSubmit: (values) => {
      navigation.navigate("UploadPhoto", { formData: values });
    },
  });

  const handleSubmitFinal = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(formik.values));

      navigation.navigate("UploadPhoto", {
        formData: formik.values,
      });
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  const nextStep = async () => {
    const schema = getSchemaByStep(step);

    try {
      await schema.validate(formik.values, { abortEarly: false });

      setStep((prev) => prev + 1);
    } catch (err: any) {
      const errors: any = {};
      const touched: any = {};

      err.inner.forEach((e: any) => {
        errors[e.path] = e.message;
        touched[e.path] = true;
      });

      formik.setErrors(errors);
      formik.setTouched(touched);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <View style={styles.card}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>
              Step {step} of 3 — Create your account
            </Text>

            {/* STEP 1 */}
            {step === 1 && (
              <View style={styles.form}>
                <View>
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      value={formik.values.name}
                      onChangeText={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      returnKeyType="next"
                      onSubmitEditing={() => emailRef.current?.focus()}
                    />
                  </View>
                  {formik.touched.name && formik.errors.name && (
                    <Text style={styles.error}>{formik.errors.name}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      ref={emailRef}
                      placeholder="john@example.com"
                      autoCapitalize="none"
                      value={formik.values.email}
                      onChangeText={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      returnKeyType="next"
                      onSubmitEditing={() => phoneRef.current?.focus()}
                    />
                  </View>
                  {formik.touched.email && formik.errors.email && (
                    <Text style={styles.error}>{formik.errors.email}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.label}>Phone</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      ref={phoneRef}
                      placeholder="08123456789"
                      keyboardType="phone-pad"
                      value={formik.values.phone}
                      onChangeText={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                      returnKeyType="done"
                    />
                  </View>
                  {formik.touched.phone && formik.errors.phone && (
                    <Text style={styles.error}>{formik.errors.phone}</Text>
                  )}
                </View>
              </View>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <View style={styles.form}>
                {/* PASSWORD */}
                <View>
                  <Text style={styles.label}>Password</Text>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      ref={passwordRef}
                      placeholder="Enter your password"
                      secureTextEntry={!showPassword}
                      value={formik.values.password}
                      returnKeyType="next"
                      onSubmitEditing={() => confirmRef.current?.focus()}
                      onBlur={formik.handleBlur("password")}
                      onChangeText={(text) => {
                        formik.setFieldValue("password", text);
                        setPasswordStrength(getPasswordStrength(text));
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>

                  {formik.values.password.length > 0 && (
                    <View style={styles.strengthRow}>
                      <View style={styles.strengthLeft}>
                        <Ionicons
                          name={
                            passwordStrength === "weak"
                              ? "alert-circle"
                              : passwordStrength === "medium"
                                ? "shield-half"
                                : "shield-checkmark"
                          }
                          size={16}
                          color={
                            passwordStrength === "weak"
                              ? "#EF4444"
                              : passwordStrength === "medium"
                                ? "#F59E0B"
                                : "#10B981"
                          }
                        />

                        <Text style={styles.strengthLabel}>
                          {passwordStrength === "weak"
                            ? "Weak"
                            : passwordStrength === "medium"
                              ? "Medium"
                              : "Strong"}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.strengthDot,
                          passwordStrength === "weak"
                            ? styles.weak
                            : passwordStrength === "medium"
                              ? styles.medium
                              : styles.strong,
                        ]}
                      />
                    </View>
                  )}

                  {formik.touched.password && formik.errors.password && (
                    <Text style={styles.error}>{formik.errors.password}</Text>
                  )}
                </View>

                {/* CONFIRM PASSWORD */}
                <View>
                  <Text style={styles.label}>Confirm Password</Text>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      ref={confirmRef}
                      placeholder="Confirm your password"
                      secureTextEntry={!showConfirm}
                      value={formik.values.confirmPassword}
                      returnKeyType="done"
                      onChangeText={(text) => {
                        formik.setFieldValue("confirmPassword", text);

                        if (
                          text.length > 0 &&
                          formik.values.password !== text
                        ) {
                          formik.setFieldError(
                            "confirmPassword",
                            "Password doesn't match",
                          );
                        } else {
                          formik.setFieldError("confirmPassword", undefined);
                        }
                      }}
                      onBlur={formik.handleBlur("confirmPassword")}
                    />

                    <TouchableOpacity
                      onPress={() => setShowConfirm(!showConfirm)}
                    >
                      <Ionicons
                        name={showConfirm ? "eye-off" : "eye"}
                        size={18}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>

                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <Text style={styles.error}>
                        {formik.errors.confirmPassword}
                      </Text>
                    )}
                </View>
              </View>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <View style={styles.reviewWrapper}>
                <Text style={styles.reviewTitle}>Review Your Data</Text>
                <Text style={styles.reviewSubtitle}>
                  Make sure everything looks correct before continuing
                </Text>

                <View style={styles.reviewCard}>
                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Name</Text>
                    <Text style={styles.reviewValue}>{formik.values.name}</Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Email</Text>
                    <Text style={styles.reviewValue}>
                      {formik.values.email}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.reviewItem}>
                    <Text style={styles.reviewLabel}>Phone</Text>
                    <Text style={styles.reviewValue}>
                      {formik.values.phone}
                    </Text>
                  </View>
                </View>

                <View style={styles.reviewHintBox}>
                  <Text style={styles.reviewHintText}>
                    You can go back if something is wrong
                  </Text>
                </View>
              </View>
            )}

            {/* BUTTONS */}
            <View style={{ marginTop: 20 }}>
              {step < 3 ? (
                <TouchableOpacity style={styles.button} onPress={nextStep}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmitFinal}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              )}

              {step > 1 && (
                <TouchableOpacity onPress={prevStep}>
                  <Text style={{ textAlign: "center", marginTop: 10 }}>
                    Back
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#EDE9FE",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
  },

  form: {
    gap: 12,
  },

  label: {
    fontSize: 12,
    color: "#777",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  error: {
    fontSize: 11,
    color: "red",
    marginTop: 3,
  },

  /* =========================
     REVIEW UI (CLEAN VERSION)
  ========================= */

  reviewWrapper: {
    marginTop: 10,
  },

  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  reviewSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },

  reviewCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  reviewItem: {
    paddingVertical: 8,
  },

  reviewLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  reviewValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  reviewHintBox: {
    marginTop: 12,
    backgroundColor: "#EEF2FF",
    padding: 10,
    borderRadius: 10,
  },

  reviewHintText: {
    fontSize: 12,
    color: "#4F46E5",
  },

  /* =========================
     PASSWORD STRENGTH (FIXED)
  ========================= */

  strengthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  strengthLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  strengthLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  strengthDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  weak: {
    backgroundColor: "#EF4444",
  },

  medium: {
    backgroundColor: "#F59E0B",
  },

  strong: {
    backgroundColor: "#10B981",
  },
});
