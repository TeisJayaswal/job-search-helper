/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useJobsContext } from "../hooks/useJobsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const JobForm = () => {
  const { dispatch } = useJobsContext()
  const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [applied, setApplied] = useState(false)
  const [link, setLink] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(null)

  const handleChange = () => {
    setApplied(current => !current);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return 
    }
    const job = {title, company, applied, link, notes}

    const response = await fetch('/api/jobs', {
      method: "POST",
      body: JSON.stringify(job),
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
      setTitle('')
      setCompany('')
      setApplied(true)
      setLink('')
      setNotes('')
      setError(null)
      console.log('new job added')
      dispatch({ type: 'CREATE_JOB', payload: json })
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Job</h3>
      <label>Job Title: </label>
      <input
      type="text"
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      />
      <label>Company: </label>
      <input
      type="text"
      onChange={(e) => setCompany(e.target.value)}
      value={company}
      />
      <label>Link: </label>
      <input
      type="text"
      onChange={(e) => setLink(e.target.value)}
      value={link}
      />
      <label>Notes: </label>
      <textarea
       rows="6" 
       cols="43"
       type="text"
       className="notes"
       onChange={(e) => setNotes(e.target.value)}
       placeholder="Might include any relevant details such company mission, location, remote-friendly, salary, etc."
       value={notes}>
      </textarea>
      <div className="applied-form">
      <label>Applied? </label>
        <input
        type="checkbox"
        checked={applied}
        value={applied}
        onChange={handleChange}
        id="applied"
        name="applied"
        />
      </div>
      <button>Add Job</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default JobForm