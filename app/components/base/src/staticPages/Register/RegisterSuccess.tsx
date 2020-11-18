/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import { Icon } from '../../../index';
import { createStyles } from './Register.styles';

type Props = {
  onNewForm?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const RegisterSuccess: React.FC<Props> = props => {
  const { onNewForm = e => e.preventDefault() } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  return (
    <div css={styles.form}>
      <h2 css={[styles.headingSuccessFailed, styles.headingSuccess]}>
        <Icon name="check-circle" size="sm" />
        <span>Selamat, data anda berhasil dikirim!</span>
      </h2>
      <p>
        Terima kasih telah mendaftar sebagai anggota PKS. Selanjutnya, kami akan melakukan
        verifikasi data. Harap bersabar, kami akan menghubungi anda kembali via email atau
        no.telepon yang tertera.
      </p>
      <span>
        Ingin mengisi form baru? klik{' '}
        <a href="#" onClick={onNewForm}>
          disini
        </a>
        .
      </span>
    </div>
  );
};

export default RegisterSuccess;
