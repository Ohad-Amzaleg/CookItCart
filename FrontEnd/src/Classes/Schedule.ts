import { BASE_URL } from '../constants'
import axios from 'axios'
import FoodItem from './FoodItem'
import { th } from 'date-fns/locale'

export default class Schedule {
  private email: string = ''
  private events: any[] = []
  private weeklyNutrition: any = {}

  constructor(email: string) {
    this.email = email
  }

  private async fetchData(endpoint: string): Promise<any> {
    try {
      const res = await axios.get(`${BASE_URL}/api/schedule/${endpoint}`, {
        withCredentials: true,
      })
      return res.data
    } catch (err) {
      // Handle error based on application requirements
      throw new Error(`Error fetching ${endpoint}: ${err}`)
    }
  }

  //Description: Fetches the schedule from the database
  //Params: none
  //Returns: Promise<any>
  async fetchEvents(): Promise<any[]> {
    const data = await this.fetchData('events')
    this.events = data.events ? data.events : []
    return this.events
  }

  //Description: Fetches the nutrition from the database
  //Params: none
  //Returns: Promise<any[]>
  async fetchNutrition(): Promise<any[]> {
    const data = await this.fetchData('nutrition')
    this.weeklyNutrition = data.nutrition ? data.nutrition : {}
    return this.weeklyNutrition
  }

  //Description: Updates the schedule in the database
  //Params: events: any[] , nutrients: any
  //Returns: void
  async updateSchedule(events: any[], nutrients: any): Promise<void> {
    try {
      await axios.post(
        `${BASE_URL}/api/schedule/update`,
        { newEvents: events, newNutrients: nutrients },
        { withCredentials: true }
      )
      this.events = events
      this.weeklyNutrition = nutrients
    } catch (err) {
      throw new Error(`Error updating schedule: ${err}`)
    }
  }

  addNutrients(item: FoodItem) {
    console.log('adding nutrients for item: ', item)
    const nutrition = item.nutrition as any
    for (const key in nutrition) {
      if (key in this.weeklyNutrition) {
        this.weeklyNutrition[key] += nutrition[key]
      } else if (key !== 'updated_at') {
        this.weeklyNutrition[key] = nutrition[key]
      }
    }
  }
  removeNutrients(item: FoodItem) {
    const nutrition = item.nutrition as any
    for (const key in nutrition) {
      if (key in this.weeklyNutrition) {
        if (this.weeklyNutrition[key] < nutrition[key]) {
          delete this.weeklyNutrition[key]
        } else {
          this.weeklyNutrition[key] -= nutrition[key]
        }
      }
    }
  }

  addEvent(event: any) {
    this.events.push(event)
  }

  removeEvent(event: any) {
    this.events = this.events.filter((e) => e.id !== event.id)
  }

  //############# Getters and Setters #############
  get getEvents(): any[] {
    return this.events
  }

  get getNutrition(): any {
    return this.weeklyNutrition
  }

  get getEmail(): string {
    return this.email
  }

  set setSchedule(schedule: any) {
    this.email = schedule.email
    this.events = schedule.events
    this.weeklyNutrition = schedule.weeklyNutrition
  }
  set setEvents(events: any[]) {
    this.events = events
  }

  set setNutrition(nutrition: any) {
    this.weeklyNutrition = nutrition
  }

  set setEmail(email: string) {
    this.email = email
  }
}
