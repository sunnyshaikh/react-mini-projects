import React, { useEffect, useRef, useState } from "react"

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


type TOtpInputProps = {
  length: number,
  setValue: Function
}

const OtpInput: React.FC<TOtpInputProps> = ({ length, setValue }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill("") ?? [])
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true)
  const inputRefs = useRef<any>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    //return if not a number
    if (value && isNaN(parseInt(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    //move to next cell
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }

    const joinedOtp = newOtp.join("")
    setValue(joinedOtp)
    setIsDisabledBtn(joinedOtp.length === length ? false : true)

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    //move backward on backspace
    if (e.key.toLowerCase() !== "backspace") return

    if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  //set cursor to end
  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1)
  }

  //focus on first input initially
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  return (
    <>
      <div className="input-grid">
        {
          otp.map((value, index) => (
            <input
              ref={(input) => (inputRefs.current[index] = input)}
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleClick(index)}
              className="input"
            />
          ))
        }
      </div>
      <button className="btn" disabled={isDisabledBtn}>Submit</button>
    </>
  )
} 