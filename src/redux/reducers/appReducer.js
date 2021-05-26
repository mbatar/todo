import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  LOADED,
  LOADING,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../actions/actionTypes";

const initialState = {
  user: null,
  isLoading: false,
  selectedTodos: [],
  todos: {
    "2021-04-26": [
      {
        id: 1,
        description: "Uyan",
        expireDate: "2021-04-26T06:00",
        isCompleted: true,
      },
      {
        id: 2,
        description: "Kahvaltı Yap",
        expireDate: "2021-04-26T08:00",
        isCompleted: false,
      },
      {
        id: 3,
        description: "Köpeği Gezdir",
        expireDate: "2021-04-26T10:00",
        isCompleted: false,
      },
      {
        id: 4,
        description: "Çalış",
        expireDate: "2021-04-26T13:00",
        isCompleted: false,
      },
      {
        id: 5,
        description: "Akşam yemeği",
        expireDate: "2021-04-26T20:00",
        isCompleted: false,
      },
      {
        id: 6,
        description: "Deneme",
        expireDate: "2021-04-26T22:23",
        isCompleted: false,
      },
    ],
    "2021-04-27": [
      {
        id: 7,
        description: "Uyan",
        expireDate: "2021-04-27T06:00",
        isCompleted: false,
      },
      {
        id: 8,
        description: "Kahvaltı Yap",
        expireDate: "2021-04-27T08:00",
        isCompleted: false,
      },
      {
        id: 9,
        description: "Köpeği Gezdir",
        expireDate: "2021-04-27T10:00",
        isCompleted: false,
      },
      {
        id: 10,
        description: "Çalış",
        expireDate: "2021-04-27T13:00",
        isCompleted: false,
      },
      {
        id: 11,
        description: "Akşam yemeği",
        expireDate: "2021-04-27T20:00",
        isCompleted: false,
      },
      {
        id: 12,
        description: "Deneme",
        expireDate: "2021-04-27T22:23",
        isCompleted: false,
      },
    ],
  },
};
export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    case ADD_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.date]: state.todos[action.payload.date]
            ? [...state.todos[action.payload.date], action.payload.todo]
            : [action.payload.todo],
        },
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      };

    case DELETE_TODOS:
      return {
        ...state,
        todos: [
          ...state.todos.filter((todo) => {
            for (let id of action.payload) {
              return todo.id === id ? false : true;
            }
          }),
        ],
      };

    case COMPLETE_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.date]: state.todos[action.payload.date].map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, isCompleted: true }
              : todo
          ),
        },
      };

    default:
      return state;
  }
};
