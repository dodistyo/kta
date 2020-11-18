/** @jsx jsx */
/* eslint-disable no-console, @typescript-eslint/no-unused-vars */
// custom validation: https://github.com/react-hook-form/react-hook-form/issues/589
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Global, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ValueType } from 'react-select';
import isNull from 'lodash/isNull';

import formHelper, {
  RegisterFormData,
  SelectOption,
  SelectKeys,
  ErrorMessageKeys,
} from './Register.formHelper';
import { createStyles } from './Register.styles';

// Components
import {
  Button,
  Checkbox,
  Column,
  FormErrorMessage,
  FormGroup,
  Icon,
  Input,
  InputMask,
  Label,
  LeafletMapPicker,
  Panel,
  Row,
  Select,
  Textarea,
  UploadBox,
} from '../../../index';
import RegisterFailed from './RegisterFailed';
import RegisterSuccess from './RegisterSuccess';

// Utils
import { validateFileType, validateFileSize } from '../../utils';

// Images
import logoImg from '../../img/logo.svg';

type Props = {
  defaultValues?: { [K in keyof RegisterFormData]?: RegisterFormData[K] };
  state?: 'default' | 'success' | 'failed';
};

const Register: React.FC<Props> = props => {
  const { defaultValues, state = 'default' } = props;
  const { register, handleSubmit, errors, setValue, formState } = useForm<RegisterFormData>({
    defaultValues,
  });
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { errorMessages, pattern, options } = formHelper;

  const [provinsiValue, setProvinsiValue] = React.useState<string | null>(null);
  const [kotaKabupatenValue, setKotaKabupatenValue] = React.useState<string | null>(null);
  const [kecamatanValue, setKecamatanValue] = React.useState<string | null>(null);
  const [kelurahanDesaValue, setKelurahanDesaValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  const onSubmit = (data: RegisterFormData) => {
    console.log('data', data);
  };

  const getSelectDefaultValue = (key: SelectKeys) => {
    let selectedOption: Array<SelectOption> | undefined;
    const currValue = defaultValues && defaultValues[key];

    if (currValue) {
      selectedOption = options[key].filter(option => option.value === currValue);
    }

    return selectedOption;
  };

  const handleSelectOnChange = (
    key: keyof RegisterFormData,
    callback?: (selectedOption: ValueType<SelectOption>) => void,
  ) => (selectedOption: ValueType<SelectOption>) => {
    if (selectedOption && 'value' in selectedOption) {
      setValue(key, selectedOption.value, {
        shouldValidate: formState.isSubmitted,
      });
    }
    callback && callback(selectedOption);
  };

  const getUploadBoxErrorMessage = (key: ErrorMessageKeys) => {
    let message;
    if (errors[key]) {
      const type = errors[key]?.type;
      const fotoScanKTP = errorMessages[key];
      if (type === 'required') {
        message = fotoScanKTP.required;
      } else if (type === 'fileType' && fotoScanKTP.fileType) {
        message = fotoScanKTP.fileType;
      } else if (type === 'fileSize' && fotoScanKTP.fileSize) {
        message = fotoScanKTP.fileSize;
      }
    }
    return message;
  };

  const numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowLeadingZeroes: true,
  });

  const dateMask = (rawValue: string) => {
    const mask = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    if (rawValue.charAt(0) === '3') {
      mask[1] = /[0-1]/;
    }
    if (rawValue.charAt(3) === '0') {
      mask[4] = /[1-9]/;
    }
    if (rawValue.charAt(3) === '1') {
      mask[4] = /[0-2]/;
    }
    return mask;
  };

  const getTanggalLahirErrorMessage = () => {
    let message;
    if (errors.tanggalLahir) {
      const type = errors.tanggalLahir.type;
      if (type === 'required') {
        message = errorMessages.tanggalLahir.required;
      } else if (type === 'pattern') {
        message = errorMessages.tanggalLahir.pattern;
      }
    }
    return message;
  };

  const getChildren = () => {
    if (state === 'failed') {
      return <RegisterFailed />;
    }
    if (state === 'success') {
      return <RegisterSuccess />;
    }
    return (
      <form css={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Data Diri */}
        <h2 css={[styles.heading, styles.headingFirst]}>Data Diri</h2>

        {/* NIK / No. KTP */}
        <FormGroup>
          <Label required>NIK / No. KTP</Label>
          <InputMask
            innerRef={register({
              validate: {
                required: value => String(parseInt(value)) !== 'NaN',
              },
            })}
            mask={numberMask}
            name="nik"
            errorMessage={
              errors.nik && errors.nik.type === 'required' && errorMessages.nik.required
            }
            type="text"
            placeholder="Nomer Induk Kependudukan anda"
          />
        </FormGroup>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Nama Lengkap */}
            <FormGroup>
              <Label required>Nama Lengkap</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.namaLengkap.required,
                  },
                })}
                name="namaLengkap"
                errorMessage={errors.namaLengkap && errors.namaLengkap.message}
                type="text"
                placeholder="Sesuai tertera di KTP"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Nama Panggilan */}
            <FormGroup>
              <Label>Nama Panggilan</Label>
              <Input
                innerRef={register}
                name="namaPanggilan"
                type="text"
                placeholder="Akrab dipanggil dengan nama..."
              />
            </FormGroup>
          </Column>
        </Row>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Tempat Lahir */}
            <FormGroup>
              <Label required>Tempat Lahir</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.tempatLahir.required,
                  },
                })}
                name="tempatLahir"
                errorMessage={errors.tempatLahir && errors.tempatLahir.message}
                type="text"
                placeholder="Nama kota"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Tanggal Lahir */}
            <FormGroup>
              <Label required>Tanggal Lahir</Label>
              <InputMask
                innerRef={register({
                  validate: {
                    required: value => {
                      const v = value.replace(/_/g, '').replace(/\//g, '');
                      return !!v;
                    },
                    pattern: value => {
                      const v = value.slice(0, 10);
                      return pattern.date.test(v);
                    },
                  },
                })}
                mask={dateMask}
                name="tanggalLahir"
                errorMessage={getTanggalLahirErrorMessage()}
                type="text"
                placeholder="Dalam format dd/mm/yyyy"
              />
            </FormGroup>
          </Column>
        </Row>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Jenis Kelamin */}
            <FormGroup>
              <Label required>Jenis Kelamin</Label>
              <Select<SelectOption>
                options={options.jenisKelamin}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('jenisKelamin')}
                onChange={handleSelectOnChange('jenisKelamin')}
                innerRef={() =>
                  register(
                    { name: 'jenisKelamin' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.jenisKelamin.required,
                      },
                    },
                  )
                }
                errorMessage={errors.jenisKelamin && errors.jenisKelamin.message}
                placeholder="Laki-laki / Perempuan"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Golongan Darah */}
            <FormGroup>
              <Label required>Golongan Darah</Label>
              <Select<SelectOption>
                options={options.golonganDarah}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('golonganDarah')}
                onChange={handleSelectOnChange('golonganDarah')}
                innerRef={() =>
                  register(
                    { name: 'golonganDarah' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.golonganDarah.required,
                      },
                    },
                  )
                }
                errorMessage={errors.golonganDarah && errors.golonganDarah.message}
                placeholder="A / B / AB / O"
              />
            </FormGroup>
          </Column>
        </Row>

        {/* Alamat Sesuai KTP */}
        <h2 css={styles.heading}>Alamat Sesuai KTP</h2>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Provinsi */}
            <FormGroup>
              <Label required>Provinsi</Label>
              <Select<SelectOption>
                options={options.provinsi}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('provinsi')}
                onChange={handleSelectOnChange('provinsi', selectedOption => {
                  if (selectedOption && 'value' in selectedOption) {
                    setProvinsiValue(selectedOption.value);
                  }
                })}
                innerRef={() =>
                  register(
                    { name: 'provinsi' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.provinsi.required,
                      },
                    },
                  )
                }
                errorMessage={errors.provinsi && errors.provinsi.message}
                placeholder="Pilih Provinsi"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Kota / Kabupaten */}
            <FormGroup>
              <Label required>Kota / Kabupaten</Label>
              <Select<SelectOption>
                options={options.kotaKabupaten}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('kotaKabupaten')}
                onChange={handleSelectOnChange('kotaKabupaten', selectedOption => {
                  if (selectedOption && 'value' in selectedOption) {
                    setKotaKabupatenValue(selectedOption.value);
                  }
                })}
                innerRef={() =>
                  register(
                    { name: 'kotaKabupaten' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.kotaKabupaten.required,
                      },
                    },
                  )
                }
                errorMessage={errors.kotaKabupaten && errors.kotaKabupaten.message}
                placeholder="Pilih Kota / Kabupaten"
                disabled={isNull(provinsiValue)}
              />
            </FormGroup>
          </Column>
        </Row>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Kecamatan */}
            <FormGroup>
              <Label required>Kecamatan</Label>
              <Select<SelectOption>
                options={options.kecamatan}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('kecamatan')}
                onChange={handleSelectOnChange('kecamatan', selectedOption => {
                  if (selectedOption && 'value' in selectedOption) {
                    setKecamatanValue(selectedOption.value);
                  }
                })}
                innerRef={() =>
                  register(
                    { name: 'kecamatan' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.kecamatan.required,
                      },
                    },
                  )
                }
                errorMessage={errors.kecamatan && errors.kecamatan.message}
                placeholder="Pilih Kecamatan"
                disabled={isNull(provinsiValue) || isNull(kotaKabupatenValue)}
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Kelurahan / Desa */}
            <FormGroup>
              <Label required>Kelurahan / Desa</Label>
              <Select<SelectOption>
                options={options.kelurahanDesa}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('kelurahanDesa')}
                onChange={handleSelectOnChange('kelurahanDesa', selectedOption => {
                  if (selectedOption && 'value' in selectedOption) {
                    setKelurahanDesaValue(selectedOption.value);
                  }
                })}
                innerRef={() =>
                  register(
                    { name: 'kelurahanDesa' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.kelurahanDesa.required,
                      },
                    },
                  )
                }
                errorMessage={errors.kelurahanDesa && errors.kelurahanDesa.message}
                placeholder="Pilih Kelurahan / Desa"
                disabled={
                  isNull(provinsiValue) || isNull(kotaKabupatenValue) || isNull(kecamatanValue)
                }
              />
            </FormGroup>
          </Column>
        </Row>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Alamat */}
            <FormGroup>
              <Label required>Alamat</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.alamat.required,
                  },
                })}
                name="alamat"
                errorMessage={errors.alamat && errors.alamat.message}
                type="text"
                placeholder="Contoh: Jalan A Perum B No. 1111"
              />
            </FormGroup>
          </Column>
          <Column col={[6, 6, 3]}>
            {/* RT */}
            <FormGroup>
              <Label required>RT</Label>
              <InputMask
                innerRef={register({
                  validate: {
                    required: value => String(parseInt(value)) !== 'NaN',
                  },
                })}
                mask={numberMask}
                name="rt"
                errorMessage={
                  errors.rt && errors.rt.type === 'required' && errorMessages.rt.required
                }
                type="text"
                placeholder="RT"
              />
            </FormGroup>
          </Column>
          <Column col={[6, 6, 3]}>
            {/* RW */}
            <FormGroup>
              <Label required>RW</Label>
              <InputMask
                innerRef={register({
                  validate: value => String(parseInt(value)) !== 'NaN',
                })}
                mask={numberMask}
                name="rw"
                errorMessage={errors.rw && errorMessages.rw.required}
                type="text"
                placeholder="RW"
              />
            </FormGroup>
          </Column>
        </Row>

        {/* Alamat Saat Ini */}
        <h2 css={styles.heading}>Alamat Saat Ini</h2>

        {/* Alamat Saat Ini */}
        <FormGroup>
          <Label>Alamat Saat Ini</Label>
          <Textarea
            innerRef={register}
            name="alamatSaatIni"
            placeholder="Isi apabila saat ini anda tidak tinggal di alamat yang tertera pada KTP"
            css={styles.alamatTextarea}
          />
          <LeafletMapPicker
            onChange={values => {
              setValue('alamatSaatIniLatLng', `${values.lat},${values.lng}`);
            }}
          />
          <Input innerRef={register} type="hidden" name="alamatSaatIniLatLng" />
        </FormGroup>
        {/* Negara Saat Ini (bagi yang di luar negeri) */}
        <FormGroup>
          <Label>Negara Saat Ini (bagi yang di luar negeri)</Label>
          <Select<SelectOption>
            options={options.negaraSaatIni}
            noOptionsMessage={() => 'Pilihan tidak ditemukan'}
            defaultValue={getSelectDefaultValue('negaraSaatIni')}
            onChange={handleSelectOnChange('negaraSaatIni')}
            innerRef={() => register({ name: 'negaraSaatIni' })}
            errorMessage={errors.negaraSaatIni && errors.negaraSaatIni.message}
            placeholder="Pilih Negara"
          />
        </FormGroup>

        {/* Lainnya */}
        <h2 css={styles.heading}>Lainnya</h2>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Agama */}
            <FormGroup>
              <Label required>Agama</Label>
              <Select<SelectOption>
                options={options.agama}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('agama')}
                onChange={handleSelectOnChange('agama')}
                innerRef={() =>
                  register(
                    { name: 'agama' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.agama.required,
                      },
                    },
                  )
                }
                errorMessage={errors.agama && errors.agama.message}
                placeholder="Agama"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Status Perkawinan */}
            <FormGroup>
              <Label required>Status Perkawinan</Label>
              <Select<SelectOption>
                options={options.statusPerkawinan}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('statusPerkawinan')}
                onChange={handleSelectOnChange('statusPerkawinan')}
                innerRef={() =>
                  register(
                    { name: 'statusPerkawinan' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.statusPerkawinan.required,
                      },
                    },
                  )
                }
                errorMessage={errors.statusPerkawinan && errors.statusPerkawinan.message}
                placeholder="Kawin / Belum Kawin"
              />
            </FormGroup>
          </Column>
        </Row>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Pekerjaan */}
            <FormGroup>
              <Label required>Pekerjaan</Label>
              <Select<SelectOption>
                options={options.pekerjaan}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('pekerjaan')}
                onChange={handleSelectOnChange('pekerjaan')}
                innerRef={() =>
                  register(
                    { name: 'pekerjaan' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.pekerjaan.required,
                      },
                    },
                  )
                }
                errorMessage={errors.pekerjaan && errors.pekerjaan.message}
                placeholder="Pekerjaan"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Pendidikan Terakhir */}
            <FormGroup>
              <Label required>Pendidikan Terakhir</Label>
              <Select<SelectOption>
                options={options.pendidikanTerakhir}
                noOptionsMessage={() => 'Pilihan tidak ditemukan'}
                defaultValue={getSelectDefaultValue('pendidikanTerakhir')}
                onChange={handleSelectOnChange('pendidikanTerakhir')}
                innerRef={() =>
                  register(
                    { name: 'pendidikanTerakhir' },
                    {
                      required: {
                        value: true,
                        message: errorMessages.pendidikanTerakhir.required,
                      },
                    },
                  )
                }
                errorMessage={errors.pendidikanTerakhir && errors.pendidikanTerakhir.message}
                placeholder="Jenjang Pendidikan"
              />
            </FormGroup>
          </Column>
        </Row>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Email */}
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
                    message: errorMessages.email.pattern || '',
                  },
                })}
                name="email"
                errorMessage={errors.email && errors.email.message}
                type="text"
                placeholder="Contoh: email@website.com"
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* No. Telp / HP / WhatsApp */}
            <FormGroup>
              <Label required>No. Telp / HP / WhatsApp</Label>
              <InputMask
                innerRef={register({
                  validate: {
                    required: value => String(parseInt(value)) !== 'NaN',
                  },
                })}
                mask={numberMask}
                name="noTelp"
                errorMessage={
                  errors.noTelp &&
                  errors.noTelp.type === 'required' &&
                  errorMessages.noTelp.required
                }
                type="text"
                placeholder="Contoh: 080011112222"
              />
            </FormGroup>
          </Column>
        </Row>

        <Row>
          <Column col={[12, 12, 6]}>
            {/* Foto / Scan KTP */}
            <FormGroup>
              <Label required>Foto / Scan KTP</Label>
              <UploadBox
                innerRef={register({
                  validate: {
                    required: (value: FileList) => {
                      return value.length > 0;
                    },
                    fileType: (value: FileList) => {
                      return validateFileType(value, ['image/png', 'image/jpeg']);
                    },
                    fileSize: (value: FileList) => {
                      return validateFileSize(value, 2048);
                    },
                  },
                })}
                onChange={(e, changeType, files) => {
                  if (files && files.length > 0 && changeType === 'drop') {
                    setValue('fotoScanKTP', files, { shouldValidate: formState.isSubmitted });
                  }
                }}
                placeholder={
                  <span>
                    <Icon name="camera" />
                    &nbsp;&nbsp;Unggah Foto/Scan KTP
                  </span>
                }
                label="Pilih file"
                labelCaption="atau drag ke sini"
                name="fotoScanKTP"
                description={
                  getUploadBoxErrorMessage('fotoScanKTP')
                    ? undefined
                    : 'Besar maksimum file yang diizinkan adalah 2MB'
                }
                errorMessage={getUploadBoxErrorMessage('fotoScanKTP')}
              />
            </FormGroup>
          </Column>
          <Column col={[12, 12, 6]}>
            {/* Foto Diri */}
            <FormGroup>
              <Label required>Foto Diri</Label>
              <UploadBox
                innerRef={register({
                  validate: {
                    required: (value: FileList) => {
                      return value.length > 0;
                    },
                    fileType: (value: FileList) => {
                      return validateFileType(value, ['image/png', 'image/jpeg']);
                    },
                    fileSize: (value: FileList) => {
                      return validateFileSize(value, 2048);
                    },
                  },
                })}
                onChange={(e, changeType, files) => {
                  if (files && files.length > 0 && changeType === 'drop') {
                    setValue('fotoDiri', files, { shouldValidate: formState.isSubmitted });
                  }
                }}
                placeholder={
                  <span>
                    <Icon name="camera" />
                    &nbsp;&nbsp;Unggah Foto Anda
                  </span>
                }
                label="Pilih file"
                labelCaption="atau drag ke sini"
                name="fotoDiri"
                description={
                  getUploadBoxErrorMessage('fotoDiri')
                    ? undefined
                    : 'Besar maksimum file yang diizinkan adalah 2MB'
                }
                errorMessage={getUploadBoxErrorMessage('fotoDiri')}
              />
            </FormGroup>
          </Column>
        </Row>

        {/* Bukan Pengurus */}
        <FormGroup>
          <Checkbox
            label="Dengan ini saya menyatakan bahwa saya bukan merupakan pengurus dari partai politik lain."
            name="bukanPengurus"
            innerRef={register({
              required: {
                value: true,
                message: errorMessages.bukanPengurus.required,
              },
            })}
          />
          <FormErrorMessage>
            {errors.bukanPengurus && errors.bukanPengurus.message}
          </FormErrorMessage>
        </FormGroup>

        {/* Setuju */}
        <FormGroup>
          <Checkbox
            label="Saya menyatakan bahwa semua data yang tertulis di atas ini adalah benar dan saya bertanggung jawab penuh atas keabsahan data tersebut."
            name="setuju"
            innerRef={register({
              required: {
                value: true,
                message: errorMessages.setuju.required,
              },
            })}
          />
          <FormErrorMessage>{errors.setuju && errors.setuju.message}</FormErrorMessage>
        </FormGroup>

        {/* Kirim Data */}
        <div css={styles.buttonContainer}>
          <Button icon={{ name: 'paper-plane' }} type="submit">
            Kirim Data
          </Button>
        </div>
      </form>
    );
  };

  return (
    <Fragment>
      <Global styles={styles.global} />
      <div css={styles.wrapper}>
        <Panel css={styles.panel}>
          {/* Header */}
          <div css={styles.header}>
            <Row>
              <Column col={[12, 12, 6, 6]}>
                <div css={styles.headerLeft}>
                  <img src={logoImg} alt="Logo PKS" />
                  <div css={styles.headerLeftText}>
                    <p>Formulir Online</p>
                    <h2>Pendaftaran Anggota Partai Keadilan Sejahtera</h2>
                  </div>
                </div>
              </Column>

              <Column col={[12, 12, 6, 6]}>
                <div css={styles.headerRight}>
                  <a>
                    <Icon name="info-circle" />
                    &nbsp;&nbsp;Seputar Pendaftaran Anggota
                  </a>
                  <a href="https://pks.id" target="_blank" rel="noreferrer">
                    <Icon name="chevron-left" />
                    &nbsp;&nbsp;Jelajahi PKS.id
                  </a>
                </div>
              </Column>
            </Row>
          </div>

          {/* Form */}
          {getChildren()}
        </Panel>
      </div>
    </Fragment>
  );
};

export default Register;
