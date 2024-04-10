import {
  AddressType,
  useDialectContext,
  useNotificationChannel,
} from '@dialectlabs/react-sdk';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Button, Input, TextButton } from '../../../core';
import { ClassTokens, Icons } from '../../../theme';
import { EmailInput } from './EmailInput';
import { useVerificationCode } from './model/useVerificationCode';

export const EmailChannel = () => {
  const { dappAddress } = useDialectContext();
  const { globalAddress: emailAddress } = useNotificationChannel({
    addressType: AddressType.Email,
  });
  const isEmailSaved = Boolean(emailAddress);
  const isVerified = Boolean(emailAddress?.verified);

  const verificationNeeded = isEmailSaved && !isVerified;

  return (
    <div>
      {verificationNeeded ? (
        <VerificationCodeInput email={emailAddress?.value ?? ''} />
      ) : (
        <EmailInput dappAddress={dappAddress} />
      )}
    </div>
  );
};

const VERIFICATION_CODE_REGEX = new RegExp('^[0-9]{6}$');
const VerificationCodeInput = ({ email }: { email: string }) => {
  const {
    verificationCode,
    setVerificationCode,
    sendCode,
    resendCode,
    isSendingCode,
    isResendingCode,
    deleteAddress,
    currentError,
  } = useVerificationCode(AddressType.Email);

  const isCodeValid = useMemo(
    () => VERIFICATION_CODE_REGEX.test(verificationCode),
    [verificationCode],
  );
  const isLoading = isSendingCode || isResendingCode;

  return (
    <div>
      <Input
        id="settings-verification-code-email"
        placeholder="Enter verification code"
        label="Email"
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        rightAdornment={
          isLoading ? (
            <div className={clsx(ClassTokens.Icon.Tertiary, 'dt-p-2')}>
              <Icons.Loader />
            </div>
          ) : (
            <Button
              onClick={isCodeValid ? sendCode : undefined}
              disabled={!isCodeValid}
            >
              Submit
            </Button>
          )
        }
      />

      {currentError && (
        <p className={clsx(ClassTokens.Text.Error, 'dt-mt-2 dt-text-caption')}>
          {currentError.message}
        </p>
      )}

      <div className="dt-mt-2 dt-flex dt-flex-col dt-gap-2">
        <p className={clsx(ClassTokens.Text.Tertiary, 'dt-text-caption')}>
          Check your <span className={ClassTokens.Text.Primary}>{email} </span>
          Email for a verification code.
        </p>
        <div className="dt-flex dt-flex-row dt-items-center dt-gap-8">
          <TextButton onClick={deleteAddress} disabled={isLoading}>
            <Icons.Xmark height={12} width={12} />
            Cancel
          </TextButton>
          <TextButton onClick={resendCode} disabled={isLoading}>
            <Icons.Resend height={12} width={12} />
            Resend Code
          </TextButton>
        </div>
      </div>
    </div>
  );
};
