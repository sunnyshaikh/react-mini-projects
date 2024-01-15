import React, { useState } from "react"
import OtpInput from "./components/OtpInput"

const App = () => {
  const [value, setValue] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    alert("Otp: " + value)
  }


  return (
    <main className="app">
      <h1>React Otp Input</h1>
      <form onSubmit={handleSubmit}>
        <OtpInput length={4} setValue={setValue} />
      </form>
    </main>
  )
}

export default App