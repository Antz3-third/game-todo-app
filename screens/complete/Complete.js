import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import {
  getDatabase,
  onValue,
  set,
  ref,
  push,
  child,
  update,
  remove,
} from "firebase/database";
import CompletedTask from "./CompletedTask";
import styles from "./styles";

const Complete = (props) => {
  const [check, setCheck] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const db = getDatabase();
  const postRef = ref(db, "posts/" + props.userId);

  useEffect(() => {
    onValue(postRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const returnedItems = snapshot.val();
        let result = Object.keys(returnedItems).map(
          (key) => returnedItems[key]
        );

        result.map((item) => {
          if (item.completed) {
            completedTasks.push(item);
          }
        });
      } else {
        completedTasks([]);
      }
    });
  }, []);

  const CompletedTask = ({ item, db, userId }) => {
    const [toggleEdit, setToggleEdit] = useState(false);
    const [changeTodo, setChangeTodo] = useState("");
    const [check, setCheck] = useState(false);
  
    const updateCheck = (id) => {
      console.log("updateCheck function hit");
      const updateTaskRef = ref(db, "posts/" + userId + "/" + id);
  
      update(updateTaskRef, {
        completed: true,
      });
    };
  
  
    return (
      // <View style={styles.container}>
      //   <SafeAreaView style={styles.item}>
      //     <View style={styles.itemLeft}>
      //       <View style={styles.square}></View>
      //       <Text style={styles.itemText}>{item.post}</Text>
      //     </View>
  
      //     <CheckBox
      //       center
      //       checked={check}
      //       onPress={() => updateCheck(item.postId)}
      //     />
      //   </SafeAreaView>
      // </View>
      <View>
        <Text>{item.post}</Text>
      </View>
    );
  };

  console.log(completedTasks);

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <CompletedTask item={item} db={db} userId={props.userId} />
        )}
      />
    </View>
  );
};

export default Complete;