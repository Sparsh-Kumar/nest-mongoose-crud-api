import * as sinon from 'sinon';
import EmailService from '../email.service';
import { SenderEmailBody } from '../types';
import * as sendGridMail from '@sendgrid/mail';
import EmailHelper from './helpers/email-helper';

describe('Email Service [Unit Test]', function() {
  let sinonSandbox: sinon.SinonSandbox;
  beforeEach(async function() {
    sinonSandbox = sinon.createSandbox();
  });
  afterEach(async function() {
    sinonSandbox.restore();
  });
  test('sendEmail', async function() {
    const emailSentBody: SenderEmailBody = EmailHelper.createEmailSenderBody();
    const apiStub = sinonSandbox.stub(sendGridMail, <any>'send').returns(Promise.resolve('1'));
    await EmailService.sendEmail(emailSentBody);
    expect(apiStub.calledOnce).toBeTruthy();
  });
});
