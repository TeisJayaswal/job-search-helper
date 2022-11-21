/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useAuthContext } from "../hooks/useAuthContext"
import { useJobsContext } from "../hooks/useJobsContext"
//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from "react"
const JobDetails =({ job }) => {
  const { dispatch } = useJobsContext()
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)
  // const [title, setTitle] = useState(job.title)
  // const [company, setCompany] = useState(job.company)
  // const [link, setLink] = useState(job.link)
  const [draftNotes, setDraftNotes] = useState(job.notes)
  const [error, setError] = useState(null)

  if (!user) {
    return
  }

  const handleNotesClick = () => {
    setIsEditing(!isEditing)
    console.log(isEditing)
  }
  const sendUpdateforNotes = async () => {
    const jobToUpdate = { notes: draftNotes }
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
      setIsEditing(false)
    }

  }
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
      {!isEditing ? (
        <><p><strong>Notes: </strong></p>
        <p className="notes-output">{job.notes}<span style={{marginLeft: "5px"}} className="update-btn" onClick={handleNotesClick}>Edit</span></p>
        </> ) :
        <><p><strong>Notes: </strong></p>
        <textarea
          rows="6"
          cols="65"
          type="text"
          className="notes"
          onChange={(e) => setDraftNotes(e.target.value)}
          value={draftNotes}>
        </textarea>
        <div style={{display: "flex", gap: "10px"}}>
          <p className="update-btn" onClick={handleNotesClick}>Cancel</p>
          <p className="update-btn" onClick={sendUpdateforNotes}>Done</p>
        </div>
        </>
      }
      
      {/* <button onClick={setIsEditing(true)}>Edit</button></> */}
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
      <span className="material-symbols-outlined delete" onClick={handleClick}>delete</span>
    </div>
  )
}

export default JobDetails

