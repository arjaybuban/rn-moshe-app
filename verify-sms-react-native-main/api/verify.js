// import { BASE_URL } from "react-native-dotenv";
const BASE_URL = 'https://verify-1428-jzkcaj.twil.io'

const sendSmsVerification = async (phoneNumber) => {

  console.log('phone number: ', phoneNumber)
  
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    });

    console.log('data: ', data)

    const response = await fetch(`${BASE_URL}/start-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    console.log('response: ', response)

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkVerification = async (phoneNumber, code) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      code,
    });

    const response = await fetch(`${BASE_URL}/check-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};
