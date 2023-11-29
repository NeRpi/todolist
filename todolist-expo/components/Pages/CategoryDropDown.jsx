import { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import "react-native-vector-icons";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import CategoryInput from "./CategoryInput";
import { Context } from "../../App";
import TodoItem from "./TodoItem";

const CategoryDropDown = ({ category, projectId }) => {
  const [isDrop, setIsDrop] = useState(false);
  const { store } = useContext(Context);

  const navigation = useNavigation();

  const onHanleTodoClick = (todo) => {
    navigation.navigate("Todo", {
      categoryId: category._id,
      projectId,
      todo,
      mode: "edit",
    });
  };

  const onCategoryUpdate = (data) => {
    store.updateCategory(data);
  };

  const onCategoryDelete = (data) => {
    store.deleteCategory(data);
  };

  return (
    <View>
      <View style={styles.categoryClickable}>
        <TouchableOpacity onPress={() => setIsDrop(!isDrop)}>
          {isDrop ? (
            <Icon name="chevron-down" size={20} color="white" />
          ) : (
            <Icon name="chevron-right" size={20} color="white" />
          )}
        </TouchableOpacity>
        <CategoryInput
          category={category}
          key={category._id}
          onCategoryUpdate={onCategoryUpdate}
          onCategoryDelete={onCategoryDelete}
        />
      </View>
      {isDrop && (
        <FlatList
          style={styles.flastList}
          data={category.todos}
          renderItem={({ item }) => (
            <TodoItem todo={item} onHanleTodoClick={onHanleTodoClick} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryClickable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(0, 21, 41)",
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },
  flastList: {
    backgroundColor: "rgb(0, 25, 50)",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  todoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CategoryDropDown;
