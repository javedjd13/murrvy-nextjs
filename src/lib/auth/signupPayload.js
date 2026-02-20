export const toSafeString = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};

export const normalizeSignupPayload = (input = {}) => ({
  first_name: toSafeString(input.first_name),
  last_name: toSafeString(input.last_name),
  username: toSafeString(input.username),
  mobile_number: toSafeString(input.mobile_number),
  password: toSafeString(input.password),
  address1: toSafeString(input.address1),
  address2: toSafeString(input.address2),
  city: toSafeString(input.city),
  state: toSafeString(input.state),
  country: toSafeString(input.country),
  pincode: toSafeString(input.pincode),
});
