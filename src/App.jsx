
import { isValidElement, useEffect, useState } from 'react'
import './App.css'
import { bringCharactersP } from './services/apiCalls'

function App() {

  const [characters, setCharacters] = useState([])
  const [pages, setPages] = useState({
    previous: "",
    next: ""
  })

  useEffect(()=>{
    console.log(characters, pages, "soy el del cambio")
  })

  useEffect(()=>{

    if(characters.length === 0){

      bringCharactersP(null)
        .then(
          res => {
            setPages({previous: res.data.info.prev, next: res.data.info.next})
            setCharacters(res.data.results)
          }
        )
        .catch(error => console.log(error))
    }

  },[characters])

  const changePage = (destination) => {

    bringCharactersP(destination ? pages.next : pages.previous)
        .then(
          res => {
            setPages({previous: res.data.info.prev, next: res.data.info.next})
            setCharacters(res.data.results)
          }
        )
        .catch(error => console.log(error))

  }

  return (
    <>
      {
        characters.length > 0 &&

        characters.map(
          person => {
            return (
              <div className="porEjemplo" key={person.id}>{person.name}</div>
            )
          }
        )
      }
      <div onClick={()=>changePage(false)}>Prev</div>
      <div onClick={()=>changePage(true)}>Next</div>
    </>
  )
}

export default App
