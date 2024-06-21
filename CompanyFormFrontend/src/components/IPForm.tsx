import { observer } from "mobx-react"
import activityStore from "../state"
import { DateInput } from "./DateInput"
import { FileInput } from "./FileInput"
import { FileInputWithCheckbox } from "./FileInputWithCheckbox"
import { TextInput } from "./TextInput"
import { Formik } from "formik"
import * as Yup from "yup"

const IPForm = observer(() => {
  const { setIsBankPage, setGlobalData } = activityStore

  const FormikOnSubmit = (values: any) => {
    setGlobalData(values)
    setIsBankPage(true)
  }

  const validationSchema = Yup.object({
    INN: Yup.string()
      .length(10, "ИНН должен содержать 10 цифр")
      .required("ИНН обязателен"),
    OGRNIP: Yup.string()
      .length(15, "ОГРНИП должен содержать 15 цифр")
      .required("ОГРНИП обязателен"),
    registrationDate: Yup.date()
      .required("Дата регистрации обязательна")
      .typeError("Неверный формат даты"),
    SkanINN: Yup.mixed().required("Скан ИНН обязателен"),
    SkanOGRNIP: Yup.mixed().required("Скан ОГРНИП обязателен"),
    SkanEGRIP: Yup.mixed().required("Скан выписки из ЕГРИП обязателен"),
    SkanOffice: Yup.mixed().required("Скан договора аренды обязателен"),
  })

  return (
    <>
      <Formik
        initialValues={{
          INN: "",
          OGRNIP: "",
          registrationDate: "",
          SkanINN: null,
          SkanOGRNIP: null,
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
          <>
            <h3 className="text-2xl mb-4">
              Индивидуальный предприниматель (ИП)
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-4 mb-4">
                <TextInput
                  text="ИНН*"
                  placeHolder="XXXXXXXXXX"
                  value={values.INN}
                  onChange={handleChange}
                  name="INN"
                  maxLength={10}
                  error={touched.INN && errors.INN ? errors.INN : ""}
                />
                <FileInput
                  text={"Скан ИНН*"}
                  classNameCol="col-span-2"
                  setValues={setValues}
                  name="SkanINN"
                  error={
                    touched.SkanINN && errors.SkanINN ? errors.SkanINN : ""
                  }
                />
                <TextInput
                  text="ОГРНИП*"
                  placeHolder="XXXXXXXXXXXXXXXX"
                  value={values.OGRNIP}
                  onChange={handleChange}
                  name="OGRNIP"
                  maxLength={15}
                  error={touched.OGRNIP && errors.OGRNIP ? errors.OGRNIP : ""}
                />
                <FileInput
                  text="Скан ОГРНИП*"
                  classNameCol="col-span-2"
                  setValues={setValues}
                  name="SkanOGRNIP"
                  error={
                    touched.SkanOGRNIP && errors.SkanOGRNIP
                      ? errors.SkanOGRNIP
                      : ""
                  }
                />
              </div>
              <div className="grid grid-cols-6 gap-4 mb-4">
                <DateInput
                  name="registrationDate"
                  text="Дата регистрации*"
                  onChange={handleChange}
                  value={values.registrationDate}
                  error={
                    touched.registrationDate && errors.registrationDate
                      ? errors.registrationDate
                      : ""
                  }
                />
                <FileInput
                  text="Скан выписки из ЕГРИП (не старше 3 месяцев)*"
                  classNameCol="col-span-2"
                  setValues={setValues}
                  name="SkanEGRIP"
                  error={
                    touched.SkanEGRIP && errors.SkanEGRIP
                      ? errors.SkanEGRIP
                      : ""
                  }
                />
                <FileInputWithCheckbox
                  text="Скан договора аренды помещения (офиса)*"
                  classNameCol="col-span-2"
                  setValues={setValues}
                  name="SkanOffice"
                  classNameColCheckBox="mt-8"
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
                  disabled={isSubmitting}
                >
                  Далее
                </button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </>
  )
})

export default IPForm
