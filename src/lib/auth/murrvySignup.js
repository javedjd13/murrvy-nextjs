import axios from "axios";
import { normalizeSignupPayload, toSafeString } from "./signupPayload";

const requiredFieldRules = [
  { key: "first_name", label: "First name" },
  { key: "last_name", label: "Last name" },
  { key: "username", label: "Username" },
  { key: "mobile_number", label: "Mobile number" },
  { key: "password", label: "Password" },
  { key: "address1", label: "Address line 1" },
  { key: "address2", label: "Address line 2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
  { key: "pincode", label: "Pincode" },
];

const getBaseUrl = () => process.env.MURRVY_API_BASE_URL || "https://api.murrvy.com";
const getSignupEndpoint = () => process.env.MURRVY_USER_SIGNUP_ENDPOINT || "/api/v1/user/";

export const validateSignupPayload = (payload = {}) => {
  const missingField = requiredFieldRules.find(({ key }) => !toSafeString(payload[key]));
  if (missingField) {
    return {
      isValid: false,
      message: `${missingField.label} is required.`,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toSafeString(payload.username))) {
    return {
      isValid: false,
      message: "Username must be a valid email address.",
    };
  }

  if (!/^[0-9]{10,15}$/.test(toSafeString(payload.mobile_number))) {
    return {
      isValid: false,
      message: "Mobile number must be 10 to 15 digits.",
    };
  }

  if (toSafeString(payload.password).length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters.",
    };
  }

  if (!/^[0-9]{4,10}$/.test(toSafeString(payload.pincode))) {
    return {
      isValid: false,
      message: "Pincode must be 4 to 10 digits.",
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

  return "Unable to complete signup. Please try again.";
};

export const signupWithMurrvy = async (payload = {}) => {
  const normalizedPayload = normalizeSignupPayload(payload);
  const validation = validateSignupPayload(normalizedPayload);

  if (!validation.isValid) {
    const validationError = new Error(validation.message);
    validationError.status = 400;
    throw validationError;
  }

  const url = new URL(getSignupEndpoint(), getBaseUrl()).toString();

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
      throw new Error(data?.message || "Unable to create user.");
    }

    return {
      message: data?.message || "User created successfully.",
      user: {
        id: String(user?.user_id ?? user?.id ?? user?.username ?? normalizedPayload.username),
        user_id: user?.user_id,
        first_name: user?.first_name ?? normalizedPayload.first_name,
        last_name: user?.last_name ?? normalizedPayload.last_name,
        name:
          user?.name ||
          `${user?.first_name ?? normalizedPayload.first_name} ${user?.last_name ?? normalizedPayload.last_name}`.trim(),
        username: user?.username ?? normalizedPayload.username,
        mobile_number: user?.mobile_number ?? normalizedPayload.mobile_number,
        address1: user?.address1 ?? normalizedPayload.address1,
        address2: user?.address2 ?? normalizedPayload.address2,
        city: user?.city ?? normalizedPayload.city,
        state: user?.state ?? normalizedPayload.state,
        country: user?.country ?? normalizedPayload.country,
        pincode: user?.pincode ?? normalizedPayload.pincode,
        role: user?.role ?? "user",
        date_created: user?.date_created,
        date_modified: user?.date_modified,
      },
    };
  } catch (error) {
    const signupError = new Error(normalizeUpstreamErrorMessage(error));
    signupError.status = error?.response?.status || error?.status || 500;
    throw signupError;
  }
};
