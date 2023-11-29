import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import AddModal from "./AddModal";
import { Context } from "../../App";

const MenuPage = () => {
  const { store } = useContext(Context);
  const [isAddModal, setAddModal] = useState(false);
  const navigation = useNavigation();

  const handleOpenProject = (projectId) => {
    navigation.navigate("Project", { projectId });
  };

  const handleDeleteProject = (projectId) => {
    store.deleteProject(projectId);
  };

  const handleAddProject = (text) => {
    store.createProject({ name: text });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => store.logout()}>
        <Text style={styles.btnText}>Выход</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => setAddModal(true)}>
        <Text style={styles.btnText}>+ Добавить проект</Text>
      </TouchableOpacity>
      <FlatList
        data={store.projectList}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => handleOpenProject(item._id)}
            style={styles.projectClickeble}
          >
            <Text style={{ color: "white", fontSize: 20 }}>{item.name}</Text>
            <TouchableOpacity
              key={item._id + "dlt"}
              onPress={() => handleDeleteProject(item._id)}
            >
              <Icon name="trash" color="white" size={20} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <AddModal
        visible={isAddModal}
        onClose={() => setAddModal(false)}
        onOk={handleAddProject}
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
  projectClickeble: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(0, 21, 41)",
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
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

export default observer(MenuPage);
