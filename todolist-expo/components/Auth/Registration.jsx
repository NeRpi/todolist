import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Registration = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegistration = () => {
    onRegister(username, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          placeholder="Введите ваш username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          placeholder="Введите ваш пароль"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.btn} onPress={handleRegistration}>
          <Text style={styles.btnText}>Регистрация</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.btnText}>Вход</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgb(0, 40, 80)",
  },
  form: {
    backgroundColor: "rgb(0, 30, 60)",
    width: "80%",
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: "100%",
    color: "white",
  },
  btn: {
    borderWidth: 1,
    borderColor: "rgb(0, 20, 40)",
    backgroundColor: "rgb(0, 40, 80)",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Registration;
