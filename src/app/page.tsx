import ToDoList from "../components/ToDoList/toDoList";
import styles from "./page.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <h1>Мой ToDoList</h1>
      <ToDoList />
    </div>
  );
};

export default Page;