import { BASE_URL } from "../constants";
import axios from "axios";

export default class Schedule {
  email: string = "";
  events: Array<any> = [];

  constructor(email: string) {
    this.email = email;
  }

  async fetchSchedule(): Promise<any[]> {
    try {
      const res = await axios.get(`${BASE_URL}/api/schedule/`, {
        withCredentials: true,
      });
      const events = res.data.schedule.events ;
      return events;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async updateSchedule(events: any[]) {
    try {
      console.log("update time");
      const res = await axios.post(
        `${BASE_URL}/api/schedule/update/`,
        { events: events },
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
