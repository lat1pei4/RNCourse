import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Pressable,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoal) {
    if (enteredGoal.trim().length === 0) {
      return;
    }
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoal, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={goals}
            renderItem={(ItemData) => {
              return (
                <GoalItem
                  text={ItemData.item.text}
                  id={ItemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
        <Pressable style={styles.addButton} onPress={startAddGoalHandler}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
    justifyContent: "flex-end",
  },

  goalsContainer: {
    flex: 5,
  },

  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#a065ec",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  addButtonText: {
    color: "white",
    fontSize: 30,
    lineHeight: 30,
  },
});
