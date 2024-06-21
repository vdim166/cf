import React from "react"
import axios from "axios"

type INNProps = {
  classNameCol?: string
  setValues: React.Dispatch<React.SetStateAction<any>>
  value: string
  onChange: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  maxLength: number
  error?: string
}

export const INN = ({
  classNameCol,
  setValues,
  value,
  onChange,
  maxLength,
  error,
}: INNProps) => {
  const INNHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength)
    }

    if (e.target.value.length <= maxLength) {
      onChange(e)
    }

    if (e.target.value.length === maxLength) {
      console.log("...fetching")

      try {
        const response = await axios.get(
          `http://localhost:5144/api/questionnaire/autofill/${e.target.value}`
        )

        console.log("response", response)

        setValues((prev: any) => ({ ...prev, ...response.data }))
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  }

  return (
    <div className={classNameCol}>
      <label className="block mb-2 text-gray-500">ИНН*</label>
      <input
        placeholder="XXXXXXXXX"
        type="text"
        name="INN"
        value={value}
        className={`block w-full p-4 border rounded bg-gray-100 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required
        onChange={INNHandle}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
