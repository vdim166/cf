import { Formik } from "formik"
import { DateInput } from "./DateInput"
import { FileInput } from "./FileInput"
import { TextInput } from "./TextInput"
import * as Yup from "yup"
import { FileInputWithCheckbox } from "./FileInputWithCheckbox"
import { INN } from "./INN"
import { observer } from "mobx-react"
import activityStore from "../state"

const OOOForm = observer(() => {
  const { setIsBankPage, setGlobalData } = activityStore

  const FormikOnSubmit = (values: any) => {
    setGlobalData(values)
    setIsBankPage(true)
  }

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Полное наименование обязательно"),
    shortName: Yup.string().required("Сокращенное наименование обязательно"),
    INN: Yup.string()
      .length(10, "ИНН должен содержать 10 цифр")
      .required("ИНН обязателен"),
    ogrn: Yup.string()
      .length(13, "ИНН должен содержать 10 цифр")
      .required("ОГРН обязателен"),
    registrationDate: Yup.date()
      .required("Дата регистрации обязательна")
      .typeError("Неверный формат даты"),
    SkanOGRN: Yup.mixed().required("Скан ОГРН обязателен"),
    SkanEGRIP: Yup.mixed().required("Скан выписки из ЕГРИП обязателен"),
    SkanOffice: Yup.mixed().required("Скан договора аренды обязателен"),
  })

  return (
    <>
      <h3 className="text-2xl mb-4">
        Общество с ограниченной ответственностью (ООО)
      </h3>
      <Formik
        initialValues={{
          fullName: "",
          shortName: "",
          INN: "",
          ogrn: "",
          registrationDate: "",
          SkanINN: null,
          SkanOGRN: null,
          SkanEGRIP: null,
          SkanOffice: null,
        }}
        onSubmit={FormikOnSubmit}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          handleSubmit,
          values,
          handleChange,
          setValues,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-3">
              <TextInput
                text="Наименование полное*"
                placeHolder="ООО 'Московская промышленная компания'"
                classNameCol="col-span-3 mt-4"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                error={
                  touched.fullName && errors.SkanEGRIP ? errors.fullName : ""
                }
              />
              <TextInput
                text="Наименование сокращенное*"
                placeHolder="ООО 'МПК'"
                classNameCol="col-span-2 mt-4"
                name="shortName"
                onChange={handleChange}
                value={values.shortName}
                error={
                  touched.shortName && errors.shortName ? errors.shortName : ""
                }
              />
              <DateInput
                name="registrationDate"
                classNameCol="mt-4"
                onChange={handleChange}
                text="Дата регистрации*"
                value={values.registrationDate}
                error={
                  touched.registrationDate && errors.registrationDate
                    ? errors.registrationDate
                    : ""
                }
              />
            </div>

            <div className="grid grid-cols-6 gap-3">
              <INN
                onChange={handleChange}
                setValues={setValues}
                value={values.INN}
                classNameCol="mt-4"
                error={touched.INN && errors.INN ? errors.INN : ""}
                maxLength={10}
              />
              <FileInput
                classNameCol="col-span-2 mt-4"
                text="Скан ИНН*"
                name="SkanINN"
                setValues={setValues}
                error={
                  touched.SkanOGRN && errors.SkanOGRN ? errors.SkanOGRN : ""
                }
              />
              <TextInput
                text="ОГРН*"
                placeHolder="XXXXXXXXXXXXX"
                classNameCol="mt-4"
                name="ogrn"
                maxLength={13}
                onChange={handleChange}
                value={values.ogrn}
                error={touched.ogrn && errors.ogrn ? errors.ogrn : ""}
              />
              <FileInput
                classNameCol="col-span-2 mt-4"
                text="Скан ОГРН*"
                name="SkanOGRN"
                setValues={setValues}
                error={
                  touched.SkanOGRN && errors.SkanOGRN ? errors.SkanOGRN : ""
                }
              />
            </div>

            <div className="grid grid-cols-6 gap-3">
              <FileInput
                classNameCol="col-span-2 mt-4"
                text="Скан выписки из ЕГРИП (не старше 3 месяцев)*"
                name="SkanEGRIP"
                setValues={setValues}
                error={
                  touched.SkanEGRIP && errors.SkanEGRIP ? errors.SkanEGRIP : ""
                }
              />

              <FileInputWithCheckbox
                text="Скан договора аренды помещения (офиса)*"
                classNameCol="col-span-2 mt-4"
                setValues={setValues}
                name="SkanOffice"
                classNameColCheckBox="mt-12"
                error={
                  touched.SkanOffice && errors.SkanOffice
                    ? errors.SkanOffice
                    : ""
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Далее
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
})

export default OOOForm
