/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useJobsContext } from "../hooks/useJobsContext"
//components 
import JobDetails from "../components/JobDetails"
import JobForm from "../components/JobForm"

const Home = () => {
  const {jobs, dispatch} = useJobsContext()
  const {user} = useAuthContext()
  const [isActive, setIsActive] = useState(false)
  const [sortByRecent, setSortByRecent] = useState(true)
  const [sortByOldest, setSortOldest] = useState(false)
  const [sortByApplied, setSortApplied] = useState(false)
  const [sortByNotApplied, setSortNotApplied] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('/api/jobs',   {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      
      if (response.ok) {
        dispatch({ type: 'SET_JOBS', payload: json})
      }
    }
    if (user) {
      fetchJobs()
    }

}, [dispatch, user])

const toggleIsActive = () => {
  setIsActive(!isActive)
}

const toggleMostRecent = () => {
  setSortByRecent(!sortByRecent)
  setSortOldest(false)
  setSortApplied(false)
  setSortNotApplied(false)
}

const toggleOldest= () => {
  setSortOldest(!sortByOldest)
  setSortByRecent(false)
  setSortApplied(false)
  setSortNotApplied(false)
}
const toggleApplied= () => {
  setSortApplied(!sortByApplied)
  setSortByRecent(false)
  setSortOldest(false)
  setSortNotApplied(false)
}

const toggleNotApplied= () => {
  setSortNotApplied(!sortByNotApplied)
  setSortByRecent(false)
  setSortOldest(false)
  setSortApplied(false)
}
  
function sortByDate() {
  return function(a, b) {
    // console.log(a.createdAt)
    return (new Date(b.createdAt) - new Date(a.createdAt))
  }
}

function sortByOldestDate() {
  return function(a, b) {
    // console.log(a.createdAt)
    return (new Date(a.createdAt) - new Date(b.createdAt))
  }
}

function sortByAppliedStatus() {
  return function(a, b) {
    // console.log(a.createdAt)
    return (b.applied - a.applied)
  }
}

function sortByNotAppliedStatus() {
  return function(a, b) {
    // console.log(a.createdAt)
    return (a.applied - b.applied)
  }
}

return (

  <div className="home">
    <div className="main-block">
      <div className="sort-block" onClick={toggleIsActive}>
        <strong>Sort By:</strong> {sortByRecent ? <span>Most Recent</span> : sortByOldest ? <span>Oldest</span> : sortByApplied ? <span>Applied</span> : sortByNotApplied ? <span>Not Applied</span> : ""}<strong>  ↓  </strong>
        <ul className="sort-bar" style={{
          display: !isActive ? 'none' : 'block'}}>
          <li onClick={toggleMostRecent}>Most Recent</li>
          <li onClick={toggleOldest}>Oldest</li>
          <li onClick={toggleApplied}>Applied</li>
          <li onClick={toggleNotApplied}>Not Applied</li>
        </ul>
      </div>
      <div className="jobs">
      {sortByRecent && (
        jobs && jobs.sort(sortByDate()).map((job) => (
          <><JobDetails key={job.title} job={job} /></>
        ))
      )}
      {sortByOldest && (
        jobs && jobs.sort(sortByOldestDate()).map((job) => (
          <><JobDetails key={job.title} job={job} /></>
        ))
      )}
      {sortByApplied && (
        jobs && jobs.sort(sortByAppliedStatus()).map((job) => (
          <><JobDetails key={job.title} job={job} /></>
        ))
      )}
      {sortByNotApplied && (
        jobs && jobs.sort(sortByNotAppliedStatus()).map((job) => (
          <><JobDetails key={job.title} job={job} /></>
        ))
      )}
       </div>
    </div>
      <JobForm />
  </div>
)
  
}

export default Home