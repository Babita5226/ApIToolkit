import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import {
  editTodo,
  removeTodo,
  completeTodo,
  fetchData,
} from "../feautures/todo/todoSlice";
const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();
  const handleEdit = (index) => {
    dispatch(editTodo({ index }));
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };
  const handleComplete = (index) => {
    dispatch(completeTodo({ index }));
  };

  useEffect(() => {
    const delayTime = setTimeout(() => {
      dispatch(fetchData());
    }, 3000);
    return () => clearTimeout(delayTime);
  }, [dispatch]);

  if (!loading && todos.length === 0)
    return (
      <div className="text-center mt-14">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="bg-gray-100 h-screen">
        <div>
          <h2 className="text-center text-2xl text-black-900  pt-4 font-extrabold pb-6">
            Todos List
          </h2>
          <table className="table-auto w-full text-base bg-gray-100 border-none text-center border-gray-300">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 px-4 py-2 ">
                  Sr.No.
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2 ">Title</th>
                <th className="border-b-2 border-gray-300 px-4 py-2  ">
                  Description
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-2  ">
                  Actions
                </th>
              </tr>
            </thead>
            {!todos || todos.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 font-bold text-3xl"
                  >
                    No Todo Found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {todos.map((todo, index) => (
                  <tr
                    key={todo.id}
                    className={`hover:bg-gray-100 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2 w-1/3">
                      {todo.title}
                    </td>

                    <td className="border-b-2 border-gray-300 px-4 py-2 w-1/3 break-all">
                      {todo.description}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4  w-1/3 py-2">
                      {!todo.completed && (
                        <>
                          <button
                            className="text-white w-28 bg-green-500 border-b-2 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md mr-5"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-white w-28 bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md mr-5"
                            onClick={() => handleDelete(todo.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      <button
                        className={`text-white w-28 py-1 px-4 focus:outline-none rounded text-md ${
                          todo.completed
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={() => handleComplete(index)}
                      >
                        {todo.completed ? "Undo" : "Complete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todo;
