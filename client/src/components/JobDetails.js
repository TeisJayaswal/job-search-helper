/* eslint-disable jsx-a11y/anchor-has-content */
import { useAuthContext } from "../hooks/useAuthContext"
import { useJobsContext } from "../hooks/useJobsContext"
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const JobDetails =({ job }) => {
  const { dispatch } = useJobsContext()
  const { user } = useAuthContext()
  
  if (!user) {
    return
  }
  const handleClick = async () => {
    const response = await fetch('/api/jobs/' + job._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_JOB', payload: json })
    }
  }
  return (
    <div className="job-details">
      <h4>{job.title}</h4>
      <p><strong>@ {job.company}</strong></p>
      <a href={job.link}><p><strong>Link to Listing</strong></p></a>
      <p><strong>Notes: </strong>{job.notes}</p>
      <div className="applied">
        <p>Applied: </p>
      
        <input
            type="checkbox"
            value={job.applied}
            // onChange={handleChange}
            id="applied"
            name="applied"
            checked={job.applied}
          />
        </div>
      <p>{formatDistanceToNow(new Date(job.createdAt), {addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default JobDetails