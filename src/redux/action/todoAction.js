import firebase from "firebase/app";
import { ADD_TODO, FETCH_TODO, ERROR_FETCH_TODOS } from "../constants/types";
import { db } from "../../configs/firebase";

export const getTodos = (userId) => async (dispatch) => {
  try {
    db.collection("todo")
      .orderBy("timeStamp")
      .where("userId", "==", userId)
      .onSnapshot((querySnapshot) => {
        let fetchTodo = [];
        querySnapshot.forEach((doc) => {
          fetchTodo.push({ ...doc.data(), uid: doc.id });
        });

        dispatch({
          type: FETCH_TODO,
          payload: fetchTodo,
        });
      });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: ERROR_FETCH_TODOS,
      payload: error,
    });
  }
};


export const deletedataRedux = (id) => async () => {
  db.collection("todo").doc(id).delete();
};
export const dataFrom = (data, dueDate, userId) => async (dispatch) => {
  console.log("data in action=>", data, dueDate, userId);
  try {
    await db.collection("todo").add({
      todo: data,
      dueDate: dueDate,
      userId: userId,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    dispatch({
      type: ADD_TODO,
      payload: data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const cleardataRedux = (todos) => async (dispatch) => {
  for (let i = 0; i < todos.length; i++) {
    db.collection("todo").doc(todos[i].uid).delete();
  }
};
