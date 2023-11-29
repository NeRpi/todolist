import { useNavigation, useRoute } from "@react-navigation/native";
import { autorun } from "mobx";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";

import PickerSelect from "./PickerSelect";
import { Context } from "../../App";

const TodoPage = () => {
  const { store } = useContext(Context);
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId, categoryId, todo, mode } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(projectId);
  const [category, setCategory] = useState(categoryId);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState(4);

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (mode === "edit" && todo && projectId && categoryId) {
      setName(todo.name || "");
      setDescription(todo.description || "");
      setProject(projectId || "");
      setCategory(categoryId || "");
      setDueDate(todo.date || null);
      setPriority(todo.priority || 4);
    }
  }, [mode, projectId, categoryId, todo]);

  useEffect(() => {
    const disposer = autorun(() => {
      setProjects(store.projectList);
    });

    return () => {
      disposer();
    };
  }, [store]);

  useEffect(() => {
    let findProject;
    if (project) findProject = projects.find((val) => val._id === project);
    if (findProject) {
      setCategories(findProject.categories);
      if (!category) setCategory(findProject.categories[0]?._id);
    }
  }, [projects, project, category]);

  const onHandleClick = (event) => {
    if (mode === "create") {
      store.createTodo(category, {
        name,
        description,
        date: dueDate,
        priority,
        category,
      });
    } else if (mode === "edit") {
      if (categoryId !== category) {
        store.deleteTodo(todo._id);
        store.createTodo(category, {
          name,
          description,
          date: dueDate,
          priority,
          category,
        });
      } else {
        store.updateTodo({
          id: todo._id,
          name,
          description,
          date: dueDate,
          priority,
        });
      }
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={name}
        onChangeText={setName}
        placeholder="Todo"
      />
      <View style={styles.pairs}>
        <PickerSelect
          selectedValue={project}
          onChange={setProject}
          options={projects?.map((val) => {
            return { label: val.name, value: val._id };
          })}
        />
        <PickerSelect
          selectedValue={category}
          onChange={setCategory}
          options={categories?.map((val) => {
            return { label: val.name, value: val._id };
          })}
        />
      </View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        multiline
        numberOfLines={28}
        style={styles.textArea}
        textAlignVertical="top"
      />
      <View style={styles.pairs}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onHandleClick}>
          <Text style={styles.btnText}>Okey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100vh",
    backgroundColor: "rgb(0, 30, 60)",
    color: "white",
    padding: 10,
    marginTop: 40,
  },
  textArea: {
    color: "white",
    borderRadius: 10,
    backgroundColor: "rgb(0, 40, 80)",
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
  },
  title: {
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

export default TodoPage;
