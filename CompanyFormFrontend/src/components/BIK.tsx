import React, { useState } from "react"
import axios from "axios"

type BIKProps = {
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
  maxLength?: number
  error?: string
}

export const BIK = ({
  classNameCol,
  setValues,
  value,
  onChange,
  maxLength,
  error,
}: BIKProps) => {
  const [fetching, setFetching] = useState(false)

  const BIKHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength)
    }

    if (e.target.value.length <= 9) {
      onChange(e)
    }

    if (e.target.value.length === 9) {
      console.log("...fetching")

      try {
        setFetching(true)
        const response = await axios.get(
          `http://localhost:5144/api/questionnaire/bankdetails/${e.target.value}`
        )

        setValues((prev: any) => ({ ...prev, ...response.data }))
      } catch (error) {
        console.error("Error fetching bank details:", error)
      } finally {
        setFetching(false)
      }
    }
  }

  return (
    <div className={classNameCol}>
      <label className="block mb-2 text-gray-500">БИК</label>
      <input
        placeholder="XXXXXXXXX"
        type="text"
        name="bik"
        value={value}
        className={`block w-full p-4 border rounded bg-gray-100 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required
        onChange={BIKHandle}
        disabled={fetching}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
