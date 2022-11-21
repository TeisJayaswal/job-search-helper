/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useAuthContext } from "../hooks/useAuthContext"
import { useJobsContext } from "../hooks/useJobsContext"
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from "react"
const JobDetails =({ job }) => {
  const { dispatch } = useJobsContext()
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(job.title)
  const [company, setCompany] = useState(job.company)
  const [link, setLink] = useState(job.link)
  const [notes, setDraftNotes] = useState(job.notes)
  const [error, setError] = useState(null)

  if (!user) {
    return
  }
  // const handleUpdate = () => {
  //   setIsEditing(true)
  //   setTitle(job.title)
  //   setCompany(job.company)
  //   setLink(job.link)
  //   setNotes(job.notes)
  //   setApplied(job.applied)
  // }
  
  // const handleChange = () => {
  //   console.log(applied)
  //   if (applied) {
  //     setApplied(false)
  //   } else if (!applied) {
  //     setApplied(true)
  //   }
  //   console.log('logging applied after set')
  //   console.log(applied)
  //   sendUpdate()
  // };

  const sendUpdateForApplied = async () => {
    const jobToUpdate = { applied: !job.applied }
    console.log(jobToUpdate)

    const response = await fetch('/api/jobs/' + job._id, {
      method: 'PATCH',
      body: JSON.stringify(jobToUpdate),
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      console.log(json)
      dispatch({ type: 'UPDATE_JOB', payload: json })
    }
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
      <p className="company-name"><strong>@{job.company}</strong></p>
      <a href={job.link}><p><strong>Link to Listing</strong></p></a>
      {!isEditing && (
        <><p><strong>Notes: </strong></p>
        <p className="notes-output">{job.notes}</p>
        <button onClick={setIsEditing(true)}>Edit</button></>
      )}
      {isEditing && (
        <><p><strong>Notes: </strong></p>
        <textarea
          rows="6" 
          cols="43"
          type="text"
          className="notes"
          onChange={(e) => setDraftNotes(e.target.value)}
          value={job.notes}>
      </textarea>
        <p className="notes-output">{job.notes}</p>
        <button onClick={setIsEditing(false)}>Done</button></>
      )}
      
      <div className="applied">
        <p><strong>Applied: </strong></p>

        <input
          type="checkbox"
          value={job.applied}
          onChange={sendUpdateForApplied}
          id="applied"
          name="applied"
          checked={job.applied} />
      </div>
      {/* <button onClick={handleUpdate}>Update</button> */}
      <p>added {formatDistanceToNow(new Date(job.createdAt), {addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default JobDetails