import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useJobsContext } from "../hooks/useJobsContext"
//components 
import JobDetails from "../components/JobDetails"
import JobForm from "../components/JobForm"

const Home = () => {
  const {jobs, dispatch} = useJobsContext()
  const {user} = useAuthContext()
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

console.log(jobs)

return (
  <div className="home">
    <div className="jobs">
      {jobs && jobs.map((job) => (
        <><JobDetails key={job.title} job={job} /></>
      ))} </div>
      <JobForm />
  </div>
)
  
}

export default Home