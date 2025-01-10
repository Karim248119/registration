export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  mobile: string;
  mobile_country_code: string;
  client_type: string;
  issuing_authority?: string;
  company_name?: string;
  commercial_license_number?: string;
};

export type SigninFormData = {
  email: string;
  password: string;
};
