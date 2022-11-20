/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useJobsContext } from "../hooks/useJobsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const JobForm = () => {
  const { dispatch } = useJobsContext()
  const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [applied, setApplied] = useState(true)
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
       type="text"
       onChange={(e) => setNotes(e.target.value)}
       value={notes}>Might include any other relevant details such location, remote-friendly, salary, etc.
      </textarea>
      <label>Applied? </label>
      <input
      type="checkbox"
      defaultChecked={true}
      value={applied}
      onChange={handleChange}
      id="applied"
      name="applied"
      />
      <button>Add Job</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default JobForm