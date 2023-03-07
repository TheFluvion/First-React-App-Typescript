import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import Form from './components/Form'
import List from './components/List'
import { Sub, SubsResponseFroApi } from './types'

const INITIAL_ARRAY = [
  {
    nick: 'dapelu',
    subMonths: 3,
    avatar: 'https://i.pravatar.cc/150?u=dapelu',
    descripcion: 'moderador del sitio'
  },
  {
    nick: 'sergio_serrano',
    subMonths: 9,
    avatar: 'https://i.pravatar.cc/150?u=sergio_serrano'
  }
]

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}

export default function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSubs = () => {
      return axios.get<SubsResponseFroApi>('http://localhost:3000/subs')
        .then(res => res.data)
    }

    const mapFromApiToSubs = (apiResponse: SubsResponseFroApi):
      Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          months: subMonths,
          profileUrl: avatar,
          nick,
          description
        } = subFromApi

        return {
          subMonths,
          avatar,
          nick,
          description
        }
      })
    }

    fetchSubs()
      .then(apiSubs => {
        const subs = mapFromApiToSubs(apiSubs)
        setSubs(subs)
      })
    setSubs(INITIAL_ARRAY)
  }, [])

  function handleNewSub(newSub: Sub): void {
    setSubs(subs => [...subs, newSub])
    setNewSubsNumber(n => n + 1)
  }
  return (
    <div className="App" ref={divRef}>
      <h1>midu subs</h1>
      <List subs={subs} />
      New Subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  )
}
