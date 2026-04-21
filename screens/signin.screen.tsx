import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { LoginSchema } from "../utils/validation.schema";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate("Home", { formData: values });
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.wrapper}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

            {/* EMAIL */}
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="john.doe@gmail.com"
                    value={formik.values.email}
                    onChangeText={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    autoCapitalize="none"
                  />
                </View>
                {formik.touched.email && formik.errors.email && (
                  <Text style={styles.error}>{formik.errors.email}</Text>
                )}
              </View>

              {/* PASSWORD */}
              <View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry={!showPassword}
                    value={formik.values.password}
                    onChangeText={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
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
                {formik.touched.password && formik.errors.password && (
                  <Text style={styles.error}>{formik.errors.password}</Text>
                )}
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => formik.handleSubmit()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account?</Text>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.footerLink}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#EDE9FE",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 18,
  },
  form: {
    gap: 10,
    marginBottom: 18,
  },
  label: {
    fontSize: 11,
    color: "#888",
    marginBottom: 3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  error: {
    fontSize: 10,
    color: "red",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  footerText: {
    fontSize: 12,
    color: "#666",
  },

  footerLink: {
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
});
