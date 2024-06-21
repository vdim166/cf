type DateInputProps = {
  text: string
  name: string
  classNameCol?: string
  value: string
  onChange: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  error?: string
}

export const DateInput = ({
  text,
  classNameCol,
  name,
  onChange,
  value,
  error,
}: DateInputProps) => {
  return (
    <div className={classNameCol}>
      <label htmlFor={name} className="block mb-2 text-gray-500">
        {text}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        className={`block w-full p-4 border rounded bg-gray-100 text-gray-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required
        onChange={onChange}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
