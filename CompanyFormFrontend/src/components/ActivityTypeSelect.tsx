import { observer } from "mobx-react"
import activityStore, { ActivityType } from "../state"

const ActivityTypeSelect = observer(() => {
  const { activity, setActivity, setIsBankPage, setGlobalData } = activityStore

  return (
    <>
      <label htmlFor="activity-type" className="block mb-2">
        Вид деятельности*
      </label>
      <select
        id="activity-type"
        className="block w-full p-4 mb-6 border rounded"
        onChange={(e) => {
          setActivity(e.target.value as ActivityType)
          setIsBankPage(false)
          setGlobalData({})
        }}
        value={activity}
      >
        <option value="ip">Индивидуальный предприниматель (ИП)</option>
        <option value="ooo">
          Общество с ограниченной ответственностью (ООО)
        </option>
      </select>
    </>
  )
})

export default ActivityTypeSelect
