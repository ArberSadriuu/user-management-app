import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { User, NewUser } from "../../types"

interface UsersState {
  localUsers: User[]
  nextId: number
}

const loadState = (): UsersState => {
  try {
    const serializedState = localStorage.getItem("usersState")
    if (serializedState === null) {
      return {
        localUsers: [],
        nextId: 1,
      }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {
      localUsers: [],
      nextId: 1,
    }
  }
}

const initialState: UsersState = loadState()

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<NewUser>) => {
      const newUser: User = {
        id: state.nextId,
        name: action.payload.name,
        username: action.payload.username || action.payload.name.toLowerCase().replace(/\s+/g, ""),
        email: action.payload.email,
        phone: action.payload.phone || "",
        website: action.payload.website || "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: { lat: "", lng: "" },
        },
        company: {
          name: action.payload.company?.name || "",
          catchPhrase: "",
          bs: "",
        },
      }
      state.localUsers.unshift(newUser)
      state.nextId += 1
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.localUsers.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.localUsers[index] = action.payload
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.localUsers = state.localUsers.filter((user) => user.id !== action.payload)
    },
  },
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
})

store.subscribe(() => {
  try {
    const state = store.getState()
    const serializedState = JSON.stringify(state.users)
    localStorage.setItem("usersState", serializedState)
  } catch (err) {
    console.error("Failed to save state to localStorage:", err)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
