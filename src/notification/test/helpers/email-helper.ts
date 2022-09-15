import { SenderEmailBody } from "src/notification/types";

export default class EmailHelper {
  public static generateRandomString(): string {
    return '';
  }
  public static generateEmail(): string {
    return `${this.generateRandomString()}@sample.com`;
  }
  public static createEmailSenderBody(): SenderEmailBody {
    return {
      to: EmailHelper.generateEmail(),
      from: EmailHelper.generateEmail(),
      subject: EmailHelper.generateRandomString(),
      text: EmailHelper.generateRandomString(),
      html: EmailHelper.generateRandomString(),
    };
  }
}
