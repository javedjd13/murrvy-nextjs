import axios from "axios";
import { toSafeString } from "./signupPayload";

const getBaseUrl = () => process.env.MURRVY_API_BASE_URL || "https://api.murrvy.com";
const getLoginEndpoint = () => process.env.MURRVY_LOGIN_ENDPOINT || "/api/v1/login/";

export const normalizeLoginPayload = (input = {}) => ({
  username: toSafeString(input.username),
  password: toSafeString(input.password),
});

export const validateLoginPayload = (payload = {}) => {
  if (!toSafeString(payload.username)) {
    return {
      isValid: false,
      message: "Username is required.",
    };
  }

  if (!toSafeString(payload.password)) {
    return {
      isValid: false,
      message: "Password is required.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

const normalizeUpstreamErrorMessage = (error) => {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string" && detail.trim().length > 0) {
    return detail;
  }

  const message = error?.response?.data?.message;
  if (typeof message === "string" && message.trim().length > 0) {
    return message;
  }

  if (typeof error?.message === "string" && error.message.trim().length > 0) {
    return error.message;
  }

  return "Unable to login. Please try again.";
};

export const loginWithMurrvy = async (payload = {}) => {
  const normalizedPayload = normalizeLoginPayload(payload);
  const validation = validateLoginPayload(normalizedPayload);

  if (!validation.isValid) {
    const validationError = new Error(validation.message);
    validationError.status = 400;
    throw validationError;
  }

  const url = new URL(getLoginEndpoint(), getBaseUrl()).toString();

  try {
    const { data } = await axios.post(url, normalizedPayload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    const user = data?.data;
    const isSuccess = data?.status === true && user;

    if (!isSuccess) {
      throw new Error(data?.message || "Unable to login.");
    }

    return {
      message: data?.message || "User login successful.",
      user: {
        id: String(user?.user_id ?? user?.id ?? user?.username ?? normalizedPayload.username),
        user_id: user?.user_id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        name:
          user?.name ||
          `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
          normalizedPayload.username,
        username: user?.username ?? normalizedPayload.username,
        mobile_number: user?.mobile_number,
        address1: user?.address1,
        address2: user?.address2,
        city: user?.city,
        state: user?.state,
        country: user?.country,
        pincode: user?.pincode,
        role: user?.role ?? "user",
        date_created: user?.date_created,
        date_modified: user?.date_modified,
      },
    };
  } catch (error) {
    const loginError = new Error(normalizeUpstreamErrorMessage(error));
    loginError.status = error?.response?.status || error?.status || 500;
    throw loginError;
  }
};
