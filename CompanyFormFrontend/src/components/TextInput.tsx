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

export const TextInput = ({
  text,
  placeHolder,
  classNameCol,
  value,
  onChange,
  name,
  maxLength,
  error,
}: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength)
    }
    onChange(e)
  }

  return (
    <div className={classNameCol}>
      <label className="block mb-2 text-gray-500">{text}</label>
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
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
