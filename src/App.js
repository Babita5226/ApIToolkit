import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import "./App.css";

function App() {
  return (
    <div>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
