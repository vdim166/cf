import { makeAutoObservable } from "mobx"

export type ActivityType = "ip" | "ooo"

class ActivityStore {
  activity: ActivityType = "ip"
  isBankPage = false
  globalData: { [key: string]: string } = {}

  constructor() {
    makeAutoObservable(this)
  }

  setActivity = (newActivity: ActivityType) => {
    this.activity = newActivity
  }

  setIsBankPage = (newIsBankPage: boolean) => {
    this.isBankPage = newIsBankPage
  }
  setGlobalData = (newGlobalData: any) => {
    this.globalData = newGlobalData
  }
}

const activityStore = new ActivityStore()

export default activityStore
