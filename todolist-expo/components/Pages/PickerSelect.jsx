import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const PickerSelect = ({ options, onChange, selectedValue }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (value) => {
    onChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.picker}>
      <TouchableOpacity
        style={styles.pickerValue}
        onPress={() => setModalVisible(true)}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: "white" }}>
            {options?.find((val) => val.value === selectedValue)?.label ||
              "Выберите значение"}
          </Text>
        </View>
        <Icon name="chevron-down" color="white" size={20} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => handlePress(option.value)}
              >
                <Text style={{ color: "white" }}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgb(0, 20, 40)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 16,
  },
  option: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  picker: {
    backgroundColor: "rgb(0, 40, 80)",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "rgb(0, 10, 20)",
  },
  pickerValue: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PickerSelect;
