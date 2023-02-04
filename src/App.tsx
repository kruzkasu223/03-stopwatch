import { useEffect, useState } from "react"
import "./App.css"

const getFormatted = (number: number) => `${number < 10 ? 0 : ""}${number}`

function App() {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)
  const [laps, setLaps] = useState<string[]>([])

  const hours = getFormatted(Math.floor((time / (1000 * 60 * 60)) % 24))
  const minutes = getFormatted(Math.floor((time / (1000 * 60)) % 60))
  const seconds = getFormatted(Math.floor((time / 1000) % 60))
  const milliseconds = getFormatted(Math.floor((time % 1000) / 10))

  const handleAddLaps = () =>
    setLaps((laps) => [
      `${hours}:${minutes}:${seconds}.${milliseconds}`,
      ...laps,
    ])

  const handleResetLaps = () => setLaps([])

  const handleStart = () => setIsActive((isOn) => !isOn)

  const handleReset = () => setTime(0)

  useEffect(() => {
    let handleInterval: ReturnType<typeof setInterval> | null = null

    if (isActive) {
      handleInterval = setInterval(() => {
        setTime((t) => t + 51)
      }, 51)
      // ^^ added 51ms ddelay because browser won't be able to handle 1ms delay
      // or even if it does, event loop will not be able to keep up
      // with such short delay and will record inconsistencies
    } else {
      handleInterval && clearInterval(handleInterval)
    }

    return () => {
      handleInterval && clearInterval(handleInterval)
    }
  }, [isActive])

  return (
    <div className="App">
      <h1>03/27 - Stopwatch</h1>
      <div className="main">
        <div>
          <div className="time_container">
            <span className="time">
              <span className="hours">{hours}</span>
              <span className="minutes">:{minutes}</span>
              <span className="seconds">:{seconds}</span>
              <span className="milliseconds">.{milliseconds}</span>
            </span>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleStart}>{isActive ? "Stop" : "Start"}</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleAddLaps}>Add Lap</button>
          <button onClick={handleResetLaps}>Reset Laps</button>
        </div>
        <div className="laps">
          {laps?.map((lap, i) => (
            <span key={lap + i} className="lap">
              {lap}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
