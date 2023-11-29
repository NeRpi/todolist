import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { Context } from "../../App";

const TodoItem = ({ todo, onHanleTodoClick }) => {
  const [isChecked, setChecked] = useState(false);
  const { store } = useContext(Context);

  const handleChecked = (checkedValue) => {
    setChecked(!isChecked);
    if (checkedValue) {
      store.deleteTodo(todo._id);
    }
  };

  function cropString(str, maxLenght) {
    const firstRow = str.split("\n")[0];
    return firstRow <= maxLenght
      ? firstRow
      : firstRow.substring(0, maxLenght) + "...";
  }
  return (
    <View style={styles.todoItem}>
      <Icon
        name={isChecked ? "check-square" : "square"}
        type="material"
        color="white"
        size={20}
        style={{ marginRight: 10 }}
        onPress={handleChecked}
      />
      <TouchableOpacity
        style={{ marginBottom: 5, maxWidth: "100%" }}
        onPress={() => onHanleTodoClick(todo)}
      >
        <Text style={{ color: "white" }}>{todo.name}</Text>
        <Text style={{ color: "gray" }}>
          {cropString(todo.description, 40)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TodoItem;
