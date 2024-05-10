import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//Get
export const fetchData = createAsyncThunk("todo/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:2001/users");

    return response.data;
  } catch (error) {
    throw Error("Failed to fetch data");
  }
});

// Add
export const postData = createAsyncThunk("todo/post", async (newTodo) => {
  try {
    const response = await axios.post("http://localhost:2001/users", newTodo);

    return response.data;
  } catch (error) {
    throw Error("Failed to post data");
  }
});

//Update
export const updateTodo = createAsyncThunk("todo/edit", async (currentTodo) => {
  try {
    const response = await axios.put(
      `http://localhost:2001/users/${currentTodo.id}`,
      currentTodo
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to edit data");
  }
});

//Delete
export const removeTodo = createAsyncThunk("todo/remove", async (id) => {
  try {
    await axios.delete(`http://localhost:2001/users/${id}`);

    return id;
  } catch (error) {
    throw Error("Failed to edit data");
  }
});

const initialState = {
  currentTodo: [{ id: "", title: "", description: "", completed: false }],

  currentIndex: null,
  todos: [],
  isModalOpen: false,
  loading: false,
  error: null,
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state.currentTodo = {
        ...state.currentTodo,
        [name]: value,
      };
    },

    toggleButton: (state, action) => {
      state.isModalOpen = action.payload;
      if (!action.payload) {
        state.currentIndex = null;
        state.currentTodo = { title: "", description: "", id: "" };
      }
    },

    editTodo: (state, action) => {
      const { index } = action.payload;
      state.currentIndex = index;
      state.currentTodo = state.todos[index];
      state.isModalOpen = true;
    },

    completeTodo: (state, action) => {
      const { index } = action.payload;
      const todo = state.todos[index];
      console.log("todo", todo);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //Get
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Post
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [...state.todos, action.payload];
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Update
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;

        const { id, title, description } = action.payload;
        state.todos = state.todos.map((todo) => {
          if (todo.id === id) {
            todo.title = title;
            todo.description = description;
            state.isModalOpen = false;
          }
          return todo;
        });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Remove
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== id);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { editTodo, toggleButton, handleChange, completeTodo } =
  TodoSlice.actions;
export default TodoSlice.reducer;
