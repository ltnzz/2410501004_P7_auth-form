import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/stack.list";

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const formData = route.params?.formData;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          {/* AVATAR */}
          {formData?.image ? (
            <Image source={{ uri: formData.image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={{ color: "#999" }}>No Photo</Text>
            </View>
          )}

          {/* GREETING */}
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.email}>{formData?.email}</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Dashboard</Text>

          <View style={styles.box}>
            <Text style={styles.boxText}>You're all set</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxText}>Explore your app here</Text>
          </View>

          <View style={styles.devRow}>
            <TouchableOpacity
              style={[styles.devButton, { backgroundColor: "#ef4444" }]}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.devText}>Logout for Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.devButton, { backgroundColor: "#6366f1" }]}
              onPress={() => navigation.replace("Register")}
            >
              <Text style={styles.devText}>Logout for Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#EDE9FE",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  email: {
    fontSize: 12,
    color: "#666",
  },

  content: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },

  box: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },

  boxText: {
    fontSize: 14,
    color: "#333",
  },

  devRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },

  devButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  devText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
