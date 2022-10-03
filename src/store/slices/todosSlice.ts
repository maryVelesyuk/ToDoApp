import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
          date: Date.now(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Can't add todo. Server Error");
    }

    return (await response.json()) as Todo;
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
    return rejectWithValue(error.message);
  }
});

export const editTodo = createAsyncThunk<
  Todo,
  { id: string; text: string },
  { rejectValue: string; state: { todos: TodosState } }
>(
  "todos/editTodo",
  async function ({ id, text }, { rejectWithValue, getState }) {
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
              text: text,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Can't edit todo. Server Error");
        }

        return (await response.json()) as Todo;
      }
      throw new Error("No such todo in state");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export type Todo = {
  id: string;
  text: string;
  isFavourite: boolean;
  isCompleted: boolean;
  date: number;
};

type TodosState = {
  todos: Todo[];
  loadingFetchTodos: boolean;
  errorFetchTodos: null | string | undefined;
  loadingAddNewTodo: boolean;
  loadingDeleteTodo: boolean;
  loadingToggleCompleted: boolean;
  loadingToggleFavourite: boolean;
  loadinEditTodo: boolean;
  errorAddNewTodo: null | string | undefined;
  errorDeleteTodo: null | string | undefined;
  errorToggleCompleted: null | string | undefined;
  errorToggleFavourite: null | string | undefined;
  errorEditTodo: null | string | undefined;
};

const initialState: TodosState = {
  todos: [],
  loadingFetchTodos: false,
  errorFetchTodos: null,
  loadingAddNewTodo: false,
  errorAddNewTodo: null,
  loadingDeleteTodo: false,
  errorDeleteTodo: null,
  loadingToggleCompleted: false,
  errorToggleCompleted: null,
  loadingToggleFavourite: false,
  errorToggleFavourite: null,
  loadinEditTodo: false,
  errorEditTodo: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loadingFetchTodos = true;
        state.errorFetchTodos = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loadingFetchTodos = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loadingFetchTodos = false;
        state.errorFetchTodos = action.payload;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.loadingAddNewTodo = true;
        state.errorAddNewTodo = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loadingAddNewTodo = false;
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.loadingAddNewTodo = false;
        state.errorAddNewTodo = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loadingDeleteTodo = true;
        state.errorDeleteTodo = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        state.loadingDeleteTodo = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loadingDeleteTodo = false;
        state.errorDeleteTodo = action.payload;
      })
      .addCase(toggleCompleted.pending, (state) => {
        state.loadingToggleCompleted = true;
        state.errorToggleCompleted = null;
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const toggledTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.isCompleted = !toggledTodo.isCompleted;
        }
        state.loadingToggleCompleted = false;
      })
      .addCase(toggleCompleted.rejected, (state, action) => {
        state.loadingToggleCompleted = false;
        state.errorToggleCompleted = action.payload;
      })
      .addCase(toggleFavourite.pending, (state) => {
        state.loadingToggleFavourite = true;
        state.errorToggleFavourite = null;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        const toggledTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.isFavourite = !toggledTodo.isFavourite;
        }
        state.loadingToggleFavourite = false;
      })
      .addCase(toggleFavourite.rejected, (state, action) => {
        state.loadingToggleFavourite = false;
        state.errorToggleFavourite = action.payload;
      })
      .addCase(editTodo.pending, (state) => {
        state.loadinEditTodo = true;
        state.errorEditTodo = null;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const editTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (editTodo) {
          editTodo.text = action.payload.text;
        }
        state.loadinEditTodo = false;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loadinEditTodo = false;
        state.errorEditTodo = action.payload;
      });
  },
});

export default todosSlice.reducer;
