export interface IEmailRequest {
  to: string;
  subject: string;
  text: string;
}

export interface IGoogle {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
