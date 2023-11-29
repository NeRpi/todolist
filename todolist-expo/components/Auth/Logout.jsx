import React from "react";
import { View, Button, StyleSheet } from "react-native";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Обработка выхода
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Button title="Выйти" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Logout;
