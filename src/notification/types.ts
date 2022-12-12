export type SenderEmailBody = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export interface LooseObject {
  [key: string]: any;
}
