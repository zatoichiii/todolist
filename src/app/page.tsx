"use client"
import ToDoList from "./toDoList";
import styles from "./style.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <h1>Мой ToDoList</h1>
      <ToDoList />
    </div>
  );
};

export default Page;