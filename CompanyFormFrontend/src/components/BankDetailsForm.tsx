import { TextInput } from "./TextInput"
import { Formik } from "formik"
import * as Yup from "yup"
import { BIK } from "./BIK"
import { FillTextInput } from "./FillTextInput"
import { observer } from "mobx-react"
import axios from "axios"
import activityStore from "../state"

const BankDetailsForm = observer(() => {
  const { globalData, activity } = activityStore

  const FormikOnSubmit = async (values: any) => {
    const data = { ...globalData, ...values }

    console.log("data", data)

    if (activity === "ip") {
      await axios.post(`http://localhost:5144/api/questionnaire/ip`, data)
    } else if (activity === "ooo") {
      await axios.post(`http://localhost:5144/api/questionnaire/ooo`, data)
    }
  }

  const validationSchema = Yup.object({
    bik: Yup.string()
      .length(9, "БИК должен содержать 9 цифр")
      .required("БИК обязателен"),
    branchName: Yup.string().required("Название филиала обязательно"),
    corrAccount: Yup.string()
      .length(20, "Корреспондентский счет должен содержать 20 цифр")
      .required("Корреспондентский счет обязателен"),
    checkingAccount: Yup.string()
      .length(20, "Рассчетный счет должен содержать 20 цифр")
      .required("Расчетный счет обязателен"),
  })

  return (
    <>
      <Formik
        initialValues={{
          bik: "",
          branchName: "",
          corrAccount: "",
          checkingAccount: "",
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
          touched,
          errors,
        }) => (
          <>
            <h3 className="text-2xl mb-4">Банковкские реквизиты</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-4 mb-4">
                <BIK
                  setValues={setValues}
                  value={values.bik}
                  onChange={handleChange}
                  maxLength={9}
                  error={touched.bik && errors.bik ? errors.bik : ""}
                />

                <FillTextInput
                  text="Название филиала банка*"
                  placeHolder="ООО 'Московская промышленная компания'"
                  value={values.branchName}
                  onChange={handleChange}
                  name="branchName"
                  classNameCol="col-span-4"
                />
              </div>
              <div className="grid grid-cols-7 gap-4 mb-4">
                <TextInput
                  text="Рассчетный счет*"
                  placeHolder="XXXXXXXXXXXXXXXXXXXX"
                  value={values.checkingAccount}
                  onChange={handleChange}
                  name="checkingAccount"
                  classNameCol="col-span-2"
                  maxLength={20}
                  error={
                    touched.checkingAccount && errors.checkingAccount
                      ? errors.checkingAccount
                      : ""
                  }
                />
                <FillTextInput
                  text="Корреспондентский счет*"
                  placeHolder="XXXXXXXXXXXXXXXXXXXX"
                  value={values.corrAccount}
                  onChange={handleChange}
                  name="corrAccount"
                  classNameCol="col-span-3"
                  maxLength={20}
                  error={
                    touched.corrAccount && errors.corrAccount
                      ? errors.corrAccount
                      : ""
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Отправить
                </button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </>
  )
})

export default BankDetailsForm
