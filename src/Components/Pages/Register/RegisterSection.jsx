import { useFieldArray, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Col, Form, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import useSignupMutation from "@/hooks/mutations/useSignupMutation";
import { Btn } from "../../AbstractElements";

const basicDetailsFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
    type: "text",
    rules: { required: "First name is required" },
    md: 6,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
    type: "text",
    rules: { required: "Last name is required" },
    md: 6,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    type: "email",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
    md: 6,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    },
    md: 6,
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    placeholder: "Enter mobile number",
    type: "tel",
    rules: {
      required: "Mobile number is required",
      pattern: {
        value: /^[0-9]{10,15}$/,
        message: "Enter a valid mobile number",
      },
    },
    md: 12,
  },
];

const addressFieldConfig = [
  {
    key: "addressLine1",
    label: "Address Line 1",
    placeholder: "Address Line 1",
    md: 6,
    requiredMessage: "Address line 1 is required",
  },
  {
    key: "addressLine2",
    label: "Address Line 2",
    placeholder: "Address Line 2",
    md: 6,
    requiredMessage: "Address line 2 is required",
  },
  {
    key: "city",
    label: "City",
    placeholder: "City",
    md: 6,
    requiredMessage: "City is required",
  },
  {
    key: "state",
    label: "State",
    placeholder: "State",
    md: 6,
    requiredMessage: "State is required",
  },
  {
    key: "country",
    label: "Country",
    placeholder: "Country",
    md: 6,
    requiredMessage: "Country is required",
  },
  {
    key: "pincode",
    label: "Pincode",
    placeholder: "Pincode",
    md: 6,
    requiredMessage: "Pincode is required",
    pattern: {
      value: /^[0-9]{4,10}$/,
      message: "Enter a valid pincode",
    },
  },
];

const defaultAddress = () => ({
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
});

const RegisterSection = () => {
  const router = useRouter();
  const signupMutation = useSignupMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
      primaryAddress: defaultAddress(),
      shippingAddresses: [defaultAddress()],
      rememberMe: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shippingAddresses",
  });

  const onSubmit = async (values) => {
    try {
      const result = await signupMutation.mutateAsync(values);
      toast.success("User created successfully");
      reset();
      router.push(result?.callbackUrl || "/layout/shoes");
    } catch (error) {
      toast.error(error?.message || "Unable to complete signup.");
    }
  };

  const renderTextField = (fieldName, label, placeholder, fieldErrors, rules = {}, type = "text", md = 6) => (
    <Col md={md} className="register-field">
      <Label className="register-form-label" htmlFor={fieldName}>
        {label}
        <span className="required-mark">*</span>
      </Label>
      <input
        id={fieldName}
        type={type}
        placeholder={placeholder}
        className={`register-input ${fieldErrors ? "is-invalid" : ""}`}
        autoComplete="off"
        aria-invalid={Boolean(fieldErrors)}
        {...register(fieldName, rules)}
      />
      {fieldErrors && <p className="register-error">{fieldErrors.message}</p>}
    </Col>
  );

  const renderAddressFields = (basePath, errorScope) =>
    addressFieldConfig.map((field) => {
      const fieldName = `${basePath}.${field.key}`;
      const fieldError = errorScope?.[field.key];

      return renderTextField(
        fieldName,
        field.label,
        field.placeholder,
        fieldError,
        {
          required: field.requiredMessage,
          ...(field.pattern ? { pattern: field.pattern } : {}),
        },
        "text",
        field.md
      );
    });

  return (
    <section className="register-advanced-section">
      <div className="register-card">
        <h2>Create New Account</h2>
        <p className="register-subtitle">Get exclusive products on Murrvy with a premium shopping experience</p>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="g-3">
            {basicDetailsFields.map((field) =>
              renderTextField(
                field.name,
                field.label,
                field.placeholder,
                errors?.[field.name],
                field.rules,
                field.type,
                field.md
              )
            )}
          </Row>

          <div className="register-divider" />
          <h5 className="register-section-title">Primary Address</h5>
          <Row className="g-3">{renderAddressFields("primaryAddress", errors?.primaryAddress)}</Row>

          <div className="register-divider with-action">
            <h5 className="register-section-title mb-0">Shipping Addresses</h5>
            <button
              type="button"
              className="register-link-btn"
              onClick={() => append(defaultAddress())}
            >
              + Add Another Address
            </button>
          </div>

          <div className="shipping-address-list">
            {fields.map((item, index) => (
              <div className="shipping-address-card" key={item.id}>
                <Row className="g-3">
                  {renderAddressFields(`shippingAddresses.${index}`, errors?.shippingAddresses?.[index])}
                </Row>
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="register-remove-btn"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="register-remember">
            <input id="rememberMe" type="checkbox" {...register("rememberMe")} />
            <Label htmlFor="rememberMe">Remember Me</Label>
          </div>

          <div className="register-submit-wrap">
            <Btn attrBtn={{ className: "btn btn-solid-default", disabled: signupMutation.isPending }}>
              {signupMutation.isPending ? "Submitting..." : "Register"}
            </Btn>
            <p className="register-login-link">
              Already have an account?{" "}
              <Link href="/page/login" className="theme-color">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default RegisterSection;
