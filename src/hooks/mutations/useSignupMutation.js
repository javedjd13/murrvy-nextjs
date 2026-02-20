import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { normalizeSignupPayload } from "@/lib/auth/signupPayload";

export const mapRegisterFormToSignupPayload = (values = {}) => {
  const primaryAddress = values?.primaryAddress || {};
  const username = values?.username || values?.email;

  return normalizeSignupPayload({
    first_name: values?.firstName,
    last_name: values?.lastName,
    username,
    mobile_number: values?.mobileNumber,
    password: values?.password,
    address1: primaryAddress?.addressLine1,
    address2: primaryAddress?.addressLine2,
    city: primaryAddress?.city,
    state: primaryAddress?.state,
    country: primaryAddress?.country,
    pincode: primaryAddress?.pincode,
  });
};

const normalizeSignInError = (response) => {
  const errorCode = response?.error;
  if (!errorCode) {
    return "Unable to complete signup. Please try again.";
  }

  // Custom errors thrown inside credentials authorize are returned in this field.
  if (typeof errorCode === "string" && errorCode.trim().length > 0) {
    try {
      return decodeURIComponent(errorCode);
    } catch (error) {
      return errorCode;
    }
  }

  return "Unable to complete signup. Please try again.";
};

const useSignupMutation = () =>
  useMutation({
    mutationFn: async (formValues) => {
      const payload = mapRegisterFormToSignupPayload(formValues);
      const response = await signIn("murrvy-signup", {
        redirect: false,
        callbackUrl: "/layout/shoes",
        ...payload,
      });

      if (!response?.ok) {
        throw new Error(normalizeSignInError(response));
      }

      return {
        callbackUrl: response?.url || "/layout/shoes",
      };
    },
  });

export default useSignupMutation;
