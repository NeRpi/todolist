import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

const CategoryInput = (props) => {
  const [title, setTitle] = useState(props.category.name);
  const [oldTitle, setOldTitle] = useState(props.category.name);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    setBtnVisible(title !== oldTitle);
  }, [title, oldTitle]);

  const onClickUpdate = () => {
    setOldTitle(title);
    props.onCategoryUpdate({
      ...props.category,
      id: props.category._id,
      name: title,
    });
  };

  const onClickDelete = () => {
    props.onCategoryDelete(props.category._id);
  };

  const onHandleInput = (text) => {
    setTitle(text);
    setBtnVisible(text.trim() !== oldTitle);
  };

  return (
    <View style={styles.categoryTitle}>
      <TextInput
        style={styles.input}
        value={title}
        placeholder="Category"
        onChangeText={onHandleInput}
      />
      <TouchableOpacity
        style={{ display: btnVisible ? "block" : "none" }}
        onPress={onClickUpdate}
      >
        <Icon name="check" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ display: btnVisible ? "block" : "none" }}
        onPress={() => setTitle(oldTitle)}
      >
        <Icon name="x" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: 20 }} onPress={onClickDelete}>
        <Icon name="trash-2" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(0, 21, 41)",
    marginHorizontal: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    color: "white",
    fontSize: 18,
  },
});

export default CategoryInput;
