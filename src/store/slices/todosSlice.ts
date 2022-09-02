import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(
      "https://630f75dd37925634189048b9.mockapi.io/todos"
    );

    if (!response.ok) {
      throw new Error("can't download todos. Server Error");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    ///исправить
    return rejectWithValue(error.message);
  }
});

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addNewTodo", async function (text, { rejectWithValue }) {
  try {
    const response = await fetch(
      "https://630f75dd37925634189048b9.mockapi.io/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          isFavourite: false,
          isCompleted: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Can't add todo. Server Error");
    }

    return (await response.json()) as Todo;
    //исправить error
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue }) {
  try {
    const response = await fetch(
      `https://630f75dd37925634189048b9.mockapi.io/todos/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Can't delete todo. Server Error");
    }

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const toggleCompleted = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todos: TodosState } }
>("todos/toggleCompleted", async function (id, { rejectWithValue, getState }) {
  try {
    const todo = getState().todos.todos.find((todo) => todo.id === id);

    if (todo) {
      const response = await fetch(
        `https://630f75dd37925634189048b9.mockapi.io/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isCompleted: !todo.isCompleted,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can't toggle isCompleted. Server Error");
      }

      return (await response.json()) as Todo;
    }
    throw new Error("No such todo in state");
  } catch (error: any) {
    //исправить error
    return rejectWithValue(error.message);
  }
});

export const toggleFavourite = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todos: TodosState } }
>("todos/toggleFavourite", async function (id, { rejectWithValue, getState }) {
  try {
    const todo = getState().todos.todos.find((todo) => todo.id === id);

    if (todo) {
      const response = await fetch(
        `https://630f75dd37925634189048b9.mockapi.io/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isFavourite: !todo.isFavourite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can't toggle isFavourite. Server Error");
      }

      return (await response.json()) as Todo;
    }
    throw new Error("No such todo in state");
  } catch (error: any) {
    //исправить error
    return rejectWithValue(error.message);
  }
});

export type Todo = {
  id: string;
  text: string;
  isFavourite: boolean;
  isCompleted: boolean;
};

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: null | string | undefined;
};
const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // toggleFavourite(state, action: PayloadAction<string>) {
    //   const todo = state.todos.find((todo) => todo.id === action.payload);
    //   if (todo) {
    //     todo.isFavourite = !todo.isFavourite;
    //   }
    // },
    // toggleCompleted(state, action: PayloadAction<string>) {
    //   const todo = state.todos.find((todo) => todo.id === action.payload);
    //   if (todo) {
    //     todo.isCompleted = !todo.isCompleted;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const toggledTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.isCompleted = !toggledTodo.isCompleted;
        }
      })
      .addCase(toggleCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        const toggledTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.isFavourite = !toggledTodo.isFavourite;
        }
      })
      .addCase(toggleFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { toggleFavourite, toggleCompleted } = todosSlice.actions;

export default todosSlice.reducer;
