import React from "react"
import { Exclamation } from "./svg/Exclamation"
import "./FillTextInput.css"

type TextInputProps = {
  text: string
  placeHolder: string
  classNameCol?: string
  value: string
  name: string
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

export const FillTextInput = ({
  text,
  placeHolder,
  classNameCol,
  value,
  onChange,
  name,
  maxLength,
  error,
  onFill,
}: TextInputProps & { onFill?: () => void }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength)
    }
    onChange(e)
  }

  return (
    <div className={classNameCol}>
      <label className="block mb-2 text-gray-500">{text}</label>
      <div className="relative flex items-center">
        <input
          placeholder={placeHolder}
          type="text"
          name={name}
          value={value}
          className={`block w-full p-4 border rounded bg-gray-100 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          required
          onChange={handleChange}
        />
        {onFill && (
          <button
            type="button"
            className="absolute right-10 top-0 h-full pr-7 bg-gray-100 text-blue-500 rounded-r"
            onClick={onFill}
          >
            Заполнить
          </button>
        )}
        <div className="relative">
          <div className="absolute right-0 top-0 h-full flex items-center ml-2 tooltip">
            <Exclamation />
            <div className="absolute bottom-full mb-2 bg-black text-white text-xs rounded opacity-0 tooltip-text">
              Автоматическое заполнение корреспондентского счета по БИК
            </div>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
