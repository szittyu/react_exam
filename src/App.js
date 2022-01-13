import React, { useEffect, useState } from "react";
import LoadingMask from './components/LoadingMask'
import Character from './components/Character'
import Subscription from './components/Subscription'


const useCharacters = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource")
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        setError(null)
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      })
  }, [url])
  return { loading, data, error }
}

const useSubTimer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10000)
  }, [])

  const hide = () => {
    setTimeout(()=>{
      setShow(false);
    }, 5000)
  }

  return {show, hide}
}

const App = () => {
  const { loading, data, error } = useCharacters("https://seriescharacters.com/api/howimetyourmother");
  const { show, hide } = useSubTimer();

  return (
    <div className="App">
      {error && <div>{error}</div>}
      {loading && <LoadingMask />}
      {data &&
        <>
          <h1>Series Api</h1>
          {data.map(char => <Character key={char.name} char={char} />)}
        </>}
      {show && <Subscription onSubscribed={hide}/>}

    </div>
  )
};

export default App;
