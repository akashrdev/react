import {
  AddressType,
  useDapp,
  useDialectSdk,
  useNotificationChannel,
} from '@dialectlabs/react-sdk';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { Button, Input } from '../../../core/primitives';
import { ClassTokens, Icons } from '../../../theme';
import { TelegramHandleInput } from './TelegramHandleInput';
import { useVerificationCode } from './model/useVerificationCode';

export const TelegramChannel = () => {
  //TODO dapp context
  const dappAddress = '';

  const { globalAddress: telegramAddress } = useNotificationChannel({
    addressType: AddressType.Telegram,
  });
  const isTelegramSaved = Boolean(telegramAddress);
  const isVerified = Boolean(telegramAddress?.verified);

  const { dapps } = useDapp({ verified: false });
  const dapp = dapps[dappAddress];

  const verificationNeeded = isTelegramSaved && !isVerified;
  return (
    <div>
      {verificationNeeded ? (
        <VerificationCodeInput
          dappTelegramName={dapp?.telegramUsername ?? ''}
        />
      ) : (
        <TelegramHandleInput dappAddress={dappAddress} />
      )}
    </div>
  );
};

const VERIFICATION_CODE_REGEX = new RegExp('^[0-9]{6}$');
const VerificationCodeInput = ({
  dappTelegramName,
}: {
  dappTelegramName: string;
}) => {
  const {
    config: { environment },
  } = useDialectSdk();

  const {
    verificationCode,
    setVerificationCode,
    sendCode,
    isSendingCode,
    deleteAddress,
    currentError,
  } = useVerificationCode(AddressType.Telegram);

  const buildBotUrl = (botUsername: string) =>
    `https://t.me/${botUsername}?start=${botUsername}`;

  const defaultBotUrl =
    environment === 'production'
      ? buildBotUrl('DialectLabsBot')
      : buildBotUrl('DialectLabsDevBot');

  const botURL = useMemo(() => {
    if (!dappTelegramName) {
      return defaultBotUrl;
    }
    return buildBotUrl(dappTelegramName);
  }, [dappTelegramName, defaultBotUrl]);

  const [isCodeValid, setCodeValid] = useState(false);
  const setCode = (code: string) => {
    if (VERIFICATION_CODE_REGEX.test(code)) {
      setCodeValid(true);
    } else {
      setCodeValid(false);
    }
    setVerificationCode(code);
  };

  return (
    <div>
      <Input
        id="settings-verification-code-telegram"
        placeholder="Enter verification code"
        label="Telegram"
        type="text"
        value={verificationCode}
        onChange={(e) => setCode(e.target.value)}
        rightAdornment={
          isSendingCode ? (
            <div className={clsx(ClassTokens.Icon.Tertiary, 'dt-p-2')}>
              <Icons.Loader />
            </div>
          ) : (
            <Button onClick={sendCode} disabled={!isCodeValid}>
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
        <a
          className={clsx(ClassTokens.Text.Tertiary, 'dt-text-caption')}
          href={botURL}
          target="_blank"
          rel="noreferrer"
        >
          📟 Get verification code by starting
          <span className={ClassTokens.Text.Brand}> this bot</span>
          with command: /start
        </a>
        <div
          className={clsx(
            ClassTokens.Text.Brand,
            'dt-text-semibold dt-flex dt-cursor-pointer dt-flex-row dt-items-center dt-gap-1 dt-text-subtext',
          )}
          onClick={deleteAddress}
        >
          <Icons.Xmark height={12} width={12} />
          Cancel
        </div>
      </div>
    </div>
  );
};
