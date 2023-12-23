import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import User from "../src/Classes/User"; // Adjust the import path accordingly
import { BASE_URL } from "../src/constants";

//
describe("User Class", () => {
  let userInstance: User;
  let mock: MockAdapter;

  // Create a new instance of the User class before each test
  // and create a new mock adapter for axios
  // This will allow us to mock API calls and test the User class methods
  beforeEach(() => {
    userInstance = new User({
      id: 1,
      username: "testuser",
      email: "test@example.com",
      verified: false,
    });
    mock = new MockAdapter(axios);
  });

  // Restore mock adapter after each test
  // This will ensure that the mock adapter is reset after each test
  afterEach(() => {
    mock.restore();
  });

  //############################### SIGNUP ########################################
  it("should register the user", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example",
      password: "password",
    };
    mock
      .onPost(`${BASE_URL}/api/users/register`)
      .reply(200, { message: "user registered successfully" });

    const result = await userInstance.userRegister(newUser);

    expect(result).toEqual("user registered successfully");
  });

  it("should handle an error when registering", async () => {
    mock.onPost(`${BASE_URL}/api/users/register`).reply(500, {}); // Simulate a server error

    const result = await userInstance.getCurrent();

    expect(result).toBeUndefined();
  });


  
  //############################### GET CURRENT USER ########################################
  it("should fetch the current user", async () => {
    const userData = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
      verified: true,
      token: "token",
    };
    mock
      .onGet(`${BASE_URL}/api/users/current`, {
        withCredentials: true,
      })
      .reply(200, { message: "Authenticated", user: userData, token: "token" });

    const result = await userInstance.getCurrent();

    expect(result).toEqual(new User(userData, "token"));
  });

  it("should handle an error when fetching the current user", async () => {
    mock.onGet(`${BASE_URL}/api/users/current`).reply(500, {}); // Simulate a server error

    const result = await userInstance.getCurrent();

    expect(result).toBeUndefined();
  });


  //############################### LOGIN ########################################
  it("should log in a user", async () => {
    const userData = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
      verified: true,
      token: "token",
    };
    const userToLogin = { username: "testuser", password: "password" };
    mock
      .onPost(`${BASE_URL}/api/users/login`)
      .reply(200, { user: userData, token: "token" });

    const result = await userInstance.userLogin(userToLogin);

    expect(result).toEqual(new User(userData, "token"));
  });


  it("should handle an error when login", async () => {
    const userToLogin = { username: "testuser", password: "password" };
    mock.onPost(`${BASE_URL}/api/users/login`).reply(500, {}); // Simulate a server error

    const result = await userInstance.userLogin(userToLogin);

    expect(result).toBeUndefined();
  });



  //############################### UPDATE USER ########################################
  it("should update the user details", async () => {
    const updatedUser = new User(userInstance);
    updatedUser.username = "newusername";
    mock
      .onPut(`${BASE_URL}/api/users/update/${userInstance.userId}`)
      .reply(200, { user: updatedUser, message: "user updated successfully" });

    const result =await userInstance.updateUser(updatedUser);

    expect(result).toEqual(updatedUser);
  });

  it("should handle an error when updating", async () => {
    const updatedUser = new User(userInstance);
    updatedUser.username = "newusername";
    mock
      .onPut(`${BASE_URL}/api/users/update/${userInstance.userId}`)
      .reply(500, {}); // Simulate a server error

    const result = await userInstance.updateUser(updatedUser);

    expect(result).toBeUndefined();
  });



  //############################### DELETE USER ########################################
  it("should delete the user", async () => {
    mock
      .onDelete(`${BASE_URL}/api/users/delete/${userInstance.userId}`)
      .reply(200, { message: "user deleted successfully" });
    const res = await userInstance.deleteUser();

    expect(res).toEqual("user deleted successfully");
  });

  it("should handle an error when deleting", async () => {
    mock
      .onPut(`${BASE_URL}/api/users/delete/${userInstance.userId}`)
      .reply(500, {}); // Simulate a server error

    const result = await userInstance.deleteUser();

    expect(result).toBeUndefined();
  });



  //############################### RESEND CODE ########################################
  it("should resend the verification code", async () => {
    mock
      .onPost(`${BASE_URL}/api/auth/resend`)
      .reply(200, { message: "verification code sent successfully" });
    const res = await userInstance.resendCode();

    expect(res).toEqual("verification code sent successfully");
  });



  //############################### VERIFY CODE ########################################
  it("should verify the verification code", async () => {
    const code = "123456";
    mock
      .onPost(`${BASE_URL}/api/auth/validate`, { code: code })
      .reply(200, { message: "user code validate successfully" });
    const res = await userInstance.validateCode(code);

    expect(res).toEqual("user code validate successfully");
  });
});
