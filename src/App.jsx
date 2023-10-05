
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, getPersonData, getPersonError, getPersonStatus } from './features/person/personSlice';
import { useEffect, useState } from 'react';
import { getPersonThunk } from './features/person/personThunks';

function App() {

  const dispatch = useDispatch()
  const personData = useSelector(getPersonData)
  const personStatus = useSelector(getPersonStatus)
  const personError = useSelector(getPersonError)
  const [personList,setPersonList] = useState(personData)
  const [loading,setLoading] = useState(true)
  const process = (event) => {
    event.preventDefault()
    dispatch(getPersonThunk({
      firstname: event.target.name.value,
      len: event.target.len.value
    }))
  }
  useEffect(() => {
    if (personStatus === "idle"){
      dispatch(getPersonThunk({len: 1, firstname: ""}))
    }
    else if (personStatus === "pending"){
      setLoading(true)
    }
    else if (personStatus === "fulfilled"){
      setLoading(false)
      let data = [];
      personData.forEach(element => {
        data.push(<p>{element.firstname}</p>)
      });
      setPersonList(data)
    }
    else if(personStatus === "rejected"){
      setLoading(false);
      console.log(personError)
    }

  },[dispatch,personData,personStatus])

  console.log(personList)
  if (loading)
    return <p> Loading</p>
  return (
    <> 
      {personList}
 
      <form onSubmit={process}>
        <input type="number" name="len"/>
        <input type="text" name="name"/>
        <input type="submit"/>
      </form>
    </>
  )
}

export default App
