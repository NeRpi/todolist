import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const AddModal = ({ visible, onClose, onOk }) => {
  const [textInputValue, setTextInputValue] = useState("");

  const handleOkPress = () => {
    onOk(textInputValue);
    setTextInputValue("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            value={textInputValue}
            onChangeText={(text) => setTextInputValue(text)}
          />
          <View style={styles.pairs}>
            <TouchableOpacity style={styles.btn} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleOkPress}>
              <Text style={styles.btnText}>Okey</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgb(0, 30, 60)",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  input: {
    color: "white",
    backgroundColor: "rgb(0, 40, 80)",
    fontSize: 23,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  pairs: {
    display: "flex",
    flexDirection: "row",
  },
  btn: {
    flex: 1,
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

export default AddModal;
