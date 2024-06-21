import ActivityTypeSelect from "./ActivityTypeSelect"
import { ChooseActivity } from "./ChooseActivity"

export const Main = () => {
  return (
    <>
      <div className="max-w-3xl mx-5 p-6 ">
        <h2 className="text-2xl mb-6">Форма собственности</h2>
        <ActivityTypeSelect />
      </div>
      <div className="mx-9 p-6">
        <ChooseActivity />
      </div>
    </>
  )
}
