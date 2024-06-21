import { LegacyRef, MouseEvent, useRef, useState } from "react"
import { LoadFile } from "./svg/LoadFile"
import { XMark } from "./svg/XMark"
import { makeId } from "../utils"

type FileInputProps = {
  text: string
  classNameCol?: string
  name: string
  setValues: any
  classNameColCheckBox?: string
  error?: string
}

export const FileInputWithCheckbox = ({
  text,
  classNameCol,
  name,
  setValues,
  classNameColCheckBox,
  error,
}: FileInputProps) => {
  const [hasFile, setHasFile] = useState(false)
  const textRef: LegacyRef<HTMLInputElement> | undefined = useRef(null)

  const onChangeHandle = (file: File) => {
    if (textRef.current) {
      const id = makeId(5)

      const fileName = id + file.name
      setValues((prev: any) => ({ ...prev, [name]: file.name }))
      textRef.current.value = "✔️" + file.name
      setHasFile(true)

      const formData = new FormData()
      formData.append(fileName, file)

      fetch(`http://localhost:5144/api/questionnaire/upload/${fileName}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("File uploaded successfully")
        })
        .catch((error) => {
          console.error("Error uploading file:", error)
        })
    }
  }

  const deleteFileHandle = (
    e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>
  ) => {
    if (hasFile) {
      if (textRef.current) {
        textRef.current.value = ""
      }
      setValues((prev: any) => ({ ...prev, [name]: null }))
      setHasFile(false)
      e.preventDefault()
    }
  }

  const [disabled, setDisabled] = useState(false)

  return (
    <>
      <div className={classNameCol}>
        <label className="block mb-2 text-gray-500">{text}</label>
        <div className="flex border">
          <input
            ref={textRef}
            type="text"
            className={`block w-full p-4 rounded-l bg-gray-100 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Выберите или перетащите файл"
            readOnly
          />

          <label
            onClick={(e) => deleteFileHandle(e)}
            htmlFor={!hasFile ? name : ""}
            className={
              hasFile
                ? "bg-gray-100 text-white p-4 rounded-r cursor-pointer"
                : `${
                    disabled ? "bg-gray-500" : "bg-blue-500 cursor-pointer"
                  } text-white p-4 rounded-r `
            }
          >
            {!hasFile ? <LoadFile /> : <XMark />}
          </label>
          {!hasFile && !disabled && (
            <input
              type="file"
              id={name}
              name={name}
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  onChangeHandle(e.target.files[0])
                }
              }}
            />
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      <div
        className={"flex items-center text-gray-500 " + classNameColCheckBox}
      >
        <input
          type="checkbox"
          id="no-agreement"
          name="no-agreement"
          className="mr-2"
          onChange={(e) => {
            setValues((prev: any) => ({ ...prev, [name]: "Нет договора" }))
            setDisabled(e.target.checked)
          }}
        />
        <label htmlFor="no-agreement">Нет договора</label>
      </div>
    </>
  )
}
