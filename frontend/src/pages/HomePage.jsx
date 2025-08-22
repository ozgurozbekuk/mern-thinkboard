import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUi';
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NoteNotFound';

const HomePage = () => {

  const [isRateLimited,setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(false);


  async function fetchNotes() {
    try {
        setLoading(true)
        const res=await api.get("/notes")
        setNotes(res.data)
        console.log(res.data)
        setLoading(false)
        setIsRateLimited(false)
    } catch (error) {
      console.log(error)
      if(error.response?.status === 429){
        setIsRateLimited(true)
      }else {
        toast.error("Failed to load notes")
      }
      setLoading(false)
    }

  }

  useEffect(() =>{
    fetchNotes()
  },[])


  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitedUi />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
          {loading && <h1 className='text-center text-primary'>Loading...</h1>}

          {notes.length === 0 && !isRateLimited && <NotesNotFound/>}

          {notes.length > 0 && !isRateLimited && <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map(note =>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
            </div>}
      </div>
    </div>
  )
}

export default HomePage