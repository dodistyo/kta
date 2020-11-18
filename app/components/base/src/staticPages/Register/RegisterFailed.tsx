/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import { Icon, Button } from '../../../index';
import { createStyles } from './Register.styles';

type Props = {
  onResend?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const RegisterFailed: React.FC<Props> = props => {
  const { onResend } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <div css={styles.form}>
      <h2 css={[styles.headingSuccessFailed, styles.headingFailed]}>
        <Icon name="times-circle" size="sm" />
        <span>Mohon maaf, data gagal dikirimkan!</span>
      </h2>
      <p>Nampaknya terjadi kesalahan dalam pengiriman data. Mohon kirimkan kembali data anda.</p>

      <div css={styles.buttonContainer}>
        <Button icon={{ name: 'redo-alt' }} onClick={onResend}>
          Kirim Ulang Data
        </Button>
      </div>
    </div>
  );
};

export default RegisterFailed;
