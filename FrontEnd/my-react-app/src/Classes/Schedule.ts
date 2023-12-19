import { BASE_URL } from "../constants";
import axios from "axios";

export default class Schedule {
  email: string = "";
  events: any[] = [];
  weeklyNutrition: any = {};

  constructor(email: string) {
    this.email = email;
  }

  private async fetchData(endpoint: string): Promise<any> {
    try {
      const res = await axios.get(`${BASE_URL}/api/schedule/${endpoint}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      // Handle error based on application requirements
      throw new Error(`Error fetching ${endpoint}: ${err}`);
    }
  }

  private async postData(endpoint: string, data: any): Promise<any> {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/schedule/${endpoint}`,
        { data },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      throw new Error(`Error posting ${endpoint}: ${err}`);
    }
  }

  async fetchEvents(): Promise<any[]> {
    const data = await this.fetchData("events");
    this.events = data.events ? data.events : [];
    return this.events;
  }

  async fetchNutrition(): Promise<any[]> {
    const data = await this.fetchData("nutrition");
    this.weeklyNutrition = data.nutrition ? data.nutrition : {};
    return this.weeklyNutrition;
  }

  async updateEvents(events: any[]): Promise<any> {
    try {
      this.events = await this.postData("update/events", events);
      return this.events;
    } catch (err) {
      throw new Error(`Error updating schedule: ${err}`);
    }
  }

  async updateNutrition(nutrition: any[]): Promise<any> {
    try {
      this.weeklyNutrition = await this.postData("update/nutrition", nutrition);
      return this.weeklyNutrition;
    } catch (err) {
      throw new Error(`Error updating nutrition: ${err}`);
    }
  }
}
