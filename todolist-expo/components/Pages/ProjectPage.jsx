import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import AddModal from "./AddModal";
import CategoryDropDown from "./CategoryDropDown";
import { Context } from "../../App";

const ProjectPage = () => {
  const { store } = useContext(Context);
  const [isAddModal, setAddModal] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [project, setProject] = useState();
  const [title, setTitle] = useState(project?.name || "");

  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params;

  useEffect(() => {
    store.getProject(projectId).then((response) => {
      if (response && response.data) setProject(response.data);
      // else navigation.navigate("Menu");
    });
  }, [store, store.projectList, projectId]);

  useEffect(() => {
    setBtnVisible(title !== project?.name);
  }, [title, project]);

  useEffect(() => {
    setTitle(project?.name);
  }, [project]);

  const handeAddCategory = (text) => {
    store.createCategory(projectId, { name: text });
  };

  const handleAddTodo = () => {
    navigation.navigate("Todo", { projectId, mode: "create" });
  };

  const onClickUpdate = () => {
    setProject({ ...project, name: title });
    store.updateProject({
      ...project,
      id: project._id,
      name: title,
    });
  };

  const onHandleInput = (text) => {
    setTitle(text);
    setBtnVisible(text.trim() !== project?.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.projectTitle}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={onHandleInput}
          placeholder="Project"
        />
        <TouchableOpacity
          style={{ display: btnVisible ? "block" : "none" }}
          onPress={onClickUpdate}
        >
          <Icon name="check" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ display: btnVisible ? "block" : "none" }}
          onPress={() => setTitle(project?.name)}
        >
          <Icon name="x" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.pairs}>
        <TouchableOpacity style={styles.btn} onPress={handleAddTodo}>
          <Text style={styles.btnText}>Добавить задачу</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setAddModal(true)}>
          <Text style={styles.btnText}>Добавить раздел</Text>
        </TouchableOpacity>
      </View>
      {project?.categories?.map((category) => (
        <CategoryDropDown
          category={category}
          projectId={projectId}
          store={store}
          key={"drop" + category._id}
        />
      ))}
      <AddModal
        visible={isAddModal}
        onClose={() => setAddModal(false)}
        onOk={handeAddCategory}
      />
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
  pairs: {
    marginTop: 10,
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
  projectTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(0, 21, 41)",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    color: "white",
    fontSize: 25,
  },
});

export default observer(ProjectPage);
