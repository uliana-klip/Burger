import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

import type React from 'react';

type TEmailInput = Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'type' | 'ref'> & {
  value: string;
  size?: 'default' | 'small';
  placeholder?: string;
  isIcon?: boolean;
  extraClass?: string;
  errorText?: string;
  checkValid?: (isValid: boolean) => void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const InputName: React.FC<TEmailInput> = ({
  //каюсь, стянула компонент и переделала, убрала валидацию, чтобы вид был единый в форме
  value,
  errorText = 'Ой, произошла ошибка!',

  onChange,
  size = 'default',
  placeholder = 'E-mail',
  isIcon = false,
  extraClass = '',
  ...rest
}) => {
  const [fieldDisabled, setDisabled] = useState(isIcon);

  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = (): void => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onFocus = (): void => {
    setError(false);
  };

  const onBlur = (): void => {
    isIcon && setDisabled(true);
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      icon={isIcon ? 'EditIcon' : undefined}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      errorText={errorText}
      size={size}
      extraClass={extraClass}
      {...rest}
    />
  );
};
