import { BASE_URL } from "../constants";
import axios from "axios";

export default class User {
  initialized: boolean = false;
  userId: number = -1;
  username: string = "";
  email: string = "";
  verified: boolean = false;
  token: string = "";

  constructor(user?: any, token?: string) {
    if (!user) return;
    this.initialized = true;
    this.userId = user.id;
    this.username = user.username;
    this.email = user.email;
    this.verified = user.verified;
    this.token = token ? token : "";
  }

  //@desc fetch user from database
  //@return type Promise<User> || null
  //@access private
  async getCurrent(): Promise<User | undefined> {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/current`, {
        withCredentials: true,
      });
      if (res) {
        return new User(res.data.user, res.data.token);
      }
    } catch (err: any) {
      console.log(err);
      console.log("Error fetching current user");
    }
  }

  //@desc fetch user from database
  //@return type Promise<User> || null
  //@access private
  async userLogin(user: any) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/login`,
        { user: user },
        { withCredentials: true }
      );
      return new User(res.data.user, res.data.token);
    } catch (err: any) {
      throw err;
    }
  }
  //@desc register user
  //@return type string
  //@access private
  async userRegister(formData:any) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/register`,formData,
        { withCredentials: true })
      return res.data.message;
    } catch (err: any) {
      console.log(err);
      return err.response.data.message;
    }
  }

  //@desc delete user
  //@return type string
  //@access private
  async deleteUser() {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/users/delete/${this.userId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.message;
    } catch (err: any) {
      console.log(err);
      return err.response.data.message;
    }
  }

  //@desc update user
  //@return type user || null
  //@access private
  async updateUser(user: any) {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/users/update/${this.userId}`,
        { user: user },
        { withCredentials: true }
      );
      return new User(res.data.user);
    } catch (err: any) {
      console.log(err);
      return err.response.data.message;
    }
  }

  //@desc validate code
  //@return type string
  //@access private
  async validateCode(code: string) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/validate`,
        { code: code },
        { withCredentials: true }
      );
      this.verified = true;
      return res.data.message;
    } catch (err: any) {
      console.log(err);
      return err.response.data.message;
    }
  }

  //@desc resend code
  //@return type string
  //@access private
  async resendCode() {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/resend`,
        {},
        { withCredentials: true }
      );
      return res.data.message;
    } catch (err: any) {
      console.log(err);
      return err.response.data.message;
    }
  }
}
