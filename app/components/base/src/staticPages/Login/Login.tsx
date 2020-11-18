/** @jsx jsx */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Global, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import createStyles from './Login.styles';

// Components & error messages
import { Button, Input, Label, Panel, FormGroup, Checkbox, Row, Column } from '../../../index';

// Images
import logoImg from '../../img/logo.svg';

type LoginFormData = {
  email: string;
  password: string;
  remember_me: boolean;
};

const Login = () => {
  const { register, handleSubmit, errors } = useForm<LoginFormData>();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const pattern = {
    // https://regexlib.com/REDetails.aspx?regexp_id=26
    email: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  };
  const errorMessages = {
    email: {
      required: 'Email tidak boleh kosong',
      pattern: 'Format email yang anda masukan salah',
    },
    password: {
      required: 'Password tidak boleh kosong',
    },
  };

  React.useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  const onSubmit = (data: LoginFormData) => {
    console.log('data', data);
  };

  return (
    <Fragment>
      <Global styles={styles.global} />

      <div css={styles.wrapper}>
        <Panel css={styles.panel}>
          <div css={styles.header}>
            <img src={logoImg} alt="Logo PKS" />
            <div css={styles.headerText}>
              <h3>
                Admin Dasbor KTA
                <br /> Partai Keadilan Sejahtera
              </h3>
            </div>
          </div>

          <form css={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup>
              <Label required>Email</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.email.required,
                  },
                  pattern: {
                    value: pattern.email,
                    message: errorMessages.email.pattern,
                  },
                })}
                type="email"
                name="email"
                autoComplete="on"
                errorMessage={errors.email && errors.email.message}
              />
            </FormGroup>

            <FormGroup>
              <Label required>Password</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.password.required,
                  },
                })}
                type="password"
                name="password"
                errorMessage={errors.password && errors.password.message}
              />
            </FormGroup>

            <Row verticalAlign="middle">
              <Column>
                <Checkbox innerRef={register} label="Ingat saya" name="remember_me" />
              </Column>
              <Column css={styles.forgetPasswordColumn}>
                <a href="#" onClick={e => e.preventDefault()}>
                  Lupa password?
                </a>
              </Column>
            </Row>

            <div css={styles.buttonContainer}>
              <Button icon={{ name: 'sign-in-alt' }} type="submit">
                Login
              </Button>
            </div>
          </form>
        </Panel>
      </div>
    </Fragment>
  );
};

export default Login;
