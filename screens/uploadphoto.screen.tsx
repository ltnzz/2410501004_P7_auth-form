import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function UploadPhotoScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute();
  const { formData } = route.params as any;

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      image,
    };

    console.log(finalData);
    navigation.replace("Home", {
      formData: finalData,
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Upload Photo</Text>
        <Text style={styles.subtitle}>Step 2 of 2</Text>

        {/* 🔥 WRAPPER BIAR BISA FLOAT */}
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={pickImage} style={styles.avatar}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Ionicons name="camera" size={28} color="#999" />
            )}
          </TouchableOpacity>

          {/* 🔥 FLOATING DELETE BUTTON */}
          {image && (
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => setImage(null)}
            >
              <Ionicons name="close" size={14} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.hint}>Tap to upload photo</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{image ? "Finish" : "Skip"}</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    padding: 24,
    alignItems: "center",
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
    marginBottom: 20,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 10,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },

  removeBtn: {
    position: "absolute",
    top: 6, 
    right: 6,

    width: 24,
    height: 24,
    borderRadius: 12,

    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  hint: {
    fontSize: 12,
    color: "#888",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
