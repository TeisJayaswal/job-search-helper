import { createContext, useReducer } from "react";

export const JobsContext = createContext()

export const jobsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_JOBS': 
      return {
        jobs: action.payload
      }
    case 'CREATE_JOB': 
      return {
        jobs: [action.payload, ...state.jobs]
      }
    case 'UPDATE_JOB':
      // const jobs = [{id: 1, job: doctor}, {id: 2, job: fruitman}, {id: 3, job: policeman}]

      // index is 2 
      // want to update policeman to mall cop
      // then action.payload = {id: 3, job: mall cop}
      // jobs: find all items in jobs up until index and pass into array, pass in action.payload, and then pass all items in after index 
      const index = state.jobs.findIndex((job) => job._id === action.payload._id)
      return {
        jobs: [...state.jobs.slice(0, index), action.payload, ...state.jobs.slice(index + 1) ]
      }
    case 'DELETE_JOB': 
      return {
        jobs: state.jobs.filter((w) => w._id !== action.payload._id)
      }
    default: 
      return state
  }
}
export const JobsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(jobsReducer, {
    jobs: null
  })

  return (
    <JobsContext.Provider value={{...state, dispatch}}>
      { children }
    </JobsContext.Provider>
  )
}
