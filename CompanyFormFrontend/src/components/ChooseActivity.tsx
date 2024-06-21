import IPForm from "./IPForm"
import OOOForm from "./OOOForm"
import BankDetailsForm from "./BankDetailsForm"
import { observer } from "mobx-react"
import activityStore from "../state"

export const ChooseActivity = observer(() => {
  const { activity, isBankPage } = activityStore

  if (activity === "ip") {
    if (!isBankPage) return <IPForm />
    else return <BankDetailsForm />
  }

  if (activity === "ooo") {
    if (!isBankPage) return <OOOForm />
    else return <BankDetailsForm />
  }

  return null
})
