import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
// import { RegisterFormData } from './formHelper';
import Register from './Register';

export default { component: Register, title: 'Static Pages / Register' };

export const Basic: ComponentWithStaticMethod<unknown> = () => {
  // const defaultValues: Partial<RegisterFormData> = {
  //   nik: '3271046504930002',
  //   namaLengkap: 'Bakti Aditya Putra',
  //   namaPanggilan: 'Bago',
  //   tempatLahir: 'Bandung',
  //   tanggalLahir: '24/12/1987',
  //   jenisKelamin: '1',
  //   golonganDarah: '1',
  //   provinsi: '1',
  //   kotaKabupaten: '1',
  //   kecamatan: '1',
  //   kelurahanDesa: '1',
  //   alamat: 'Jl. Teraso No. 1',
  //   rt: '05',
  //   rw: '05',
  //   agama: '1',
  //   statusPerkawinan: '1',
  //   pekerjaan: '1',
  //   pendidikanTerakhir: '1',
  //   alamatSaatIni: 'Jl. Teraso No. 1',
  //   email: 'baktiaditya@me.com',
  //   noTelp: '085293009300',
  //   bukanPengurus: true,
  //   setuju: true,
  // };
  // return <Register defaultValues={defaultValues} />;

  return <Register />;
};

Basic.storyName = 'basic';
Basic.argTypes = {};

export const Success: ComponentWithStaticMethod<unknown> = () => {
  return <Register state="success" />;
};

Success.storyName = 'success';

export const Failed: ComponentWithStaticMethod<unknown> = () => {
  return <Register state="failed" />;
};

Failed.storyName = 'failed';
