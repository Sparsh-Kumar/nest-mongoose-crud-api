import { Injectable } from '@nestjs/common';
import * as sendGridMail from '@sendgrid/mail';
import { SenderEmailBody } from './types';

@Injectable()
export default class EmailService {
  constructor() {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public static async sendEmail(emailBody: SenderEmailBody) {
    await sendGridMail.send(emailBody);
  }
}
