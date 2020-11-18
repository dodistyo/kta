export type RegisterFormData = {
  nik: string;
  namaLengkap: string;
  namaPanggilan?: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  golonganDarah: string;
  provinsi: string;
  kotaKabupaten: string;
  kecamatan: string;
  kelurahanDesa: string;
  alamat: string;
  rt: string;
  rw: string;
  alamatSaatIni?: string;
  alamatSaatIniLatLng?: string;
  negaraSaatIni?: string;
  agama: string;
  statusPerkawinan: string;
  pekerjaan: string;
  pendidikanTerakhir: string;
  email: string;
  noTelp: string;
  fotoScanKTP: FileList;
  fotoDiri: FileList;
  bukanPengurus: boolean;
  setuju: boolean;
};

export type PatternKeys = 'email' | 'date';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectKeys = keyof Pick<
  RegisterFormData,
  | 'jenisKelamin'
  | 'golonganDarah'
  | 'provinsi'
  | 'kotaKabupaten'
  | 'kecamatan'
  | 'kelurahanDesa'
  | 'negaraSaatIni'
  | 'agama'
  | 'statusPerkawinan'
  | 'pekerjaan'
  | 'pendidikanTerakhir'
>;

export type ErrorMessageKeys = keyof Pick<
  RegisterFormData,
  | 'email'
  | 'nik'
  | 'namaLengkap'
  | 'tempatLahir'
  | 'tanggalLahir'
  | 'jenisKelamin'
  | 'golonganDarah'
  | 'provinsi'
  | 'kotaKabupaten'
  | 'kecamatan'
  | 'kelurahanDesa'
  | 'alamat'
  | 'rt'
  | 'rw'
  | 'agama'
  | 'statusPerkawinan'
  | 'pekerjaan'
  | 'pendidikanTerakhir'
  | 'noTelp'
  | 'fotoScanKTP'
  | 'fotoDiri'
  | 'bukanPengurus'
  | 'setuju'
>;

export type FormConstants = {
  pattern: {
    [key in PatternKeys]: RegExp;
  };
  errorMessages: {
    [key in ErrorMessageKeys]: {
      required: string;
      pattern?: string;
      fileType?: string;
      fileSize?: string;
    };
  };
  options: {
    [key in SelectKeys]: Array<SelectOption>;
  };
};

const formConstants: FormConstants = {
  pattern: {
    // https://regexlib.com/REDetails.aspx?regexp_id=26
    email: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    // https://stackoverflow.com/a/15504877
    date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
  },
  errorMessages: {
    email: {
      required: 'Email tidak boleh kosong',
      pattern: 'Format email yang anda masukan salah',
    },
    nik: {
      required: 'NIK / No. KTP tidak boleh kosong',
    },
    namaLengkap: {
      required: 'Nama lengkap tidak boleh kosong',
    },
    tempatLahir: {
      required: 'Tempat lahir tidak boleh kosong',
    },
    tanggalLahir: {
      required: 'Tanggal lahir tidak boleh kosong',
      pattern: 'Format tanggal lahir yang anda masukan salah',
    },
    jenisKelamin: {
      required: 'Jenis kelamin tidak boleh kosong',
    },
    golonganDarah: {
      required: 'Golongan darah tidak boleh kosong',
    },
    provinsi: {
      required: 'Provinsi tidak boleh kosong',
    },
    kotaKabupaten: {
      required: 'Kota / Kabupaten tidak boleh kosong',
    },
    kecamatan: {
      required: 'Kecamatan tidak boleh kosong',
    },
    kelurahanDesa: {
      required: 'Kelurahan / Desa tidak boleh kosong',
    },
    alamat: {
      required: 'Alamat tidak boleh kosong',
    },
    rt: {
      required: 'RT tidak boleh kosong',
    },
    rw: {
      required: 'RW tidak boleh kosong',
    },
    agama: {
      required: 'Agama tidak boleh kosong',
    },
    statusPerkawinan: {
      required: 'Status perkawinan tidak boleh kosong',
    },
    pekerjaan: {
      required: 'Pekerjaan tidak boleh kosong',
    },
    pendidikanTerakhir: {
      required: 'Pendidikan terakhir tidak boleh kosong',
    },
    noTelp: {
      required: 'No. telp tidak boleh kosong',
    },
    fotoScanKTP: {
      required: `Foto / scan KTP tidak boleh kosong`,
      fileType: `Foto / scan KTP harus berupa "jpg", "jpeg", atau "png"`,
      fileSize: `Foto / scan KTP tidak boleh lebih dari 2MB`,
    },
    fotoDiri: {
      required: `Foto / scan KTP tidak boleh kosong`,
      fileType: `Foto / scan KTP harus berupa "jpg", "jpeg", atau "png"`,
      fileSize: `Foto / scan KTP tidak boleh lebih dari 2MB`,
    },
    bukanPengurus: {
      required: 'Pernyataan bukan pengurus dari partai politik lain harus di centang',
    },
    setuju: {
      required: 'Pernyataan keabsahan data harus di centang',
    },
  },
  options: {
    jenisKelamin: ['Laki-laki', 'Perempuan'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    golonganDarah: ['A', 'B', 'AB', 'O'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    provinsi: ['Provinsi 1', 'Provinsi 2', 'Provinsi 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    kotaKabupaten: ['Kota 1', 'Kota 2', 'Kota 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    kecamatan: ['Kecamatan 1', 'Kecamatan 2', 'Kecamatan 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    kelurahanDesa: ['Kelurahan 1', 'Kelurahan 2', 'Kelurahan 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    negaraSaatIni: ['Negara 1', 'Negara 2', 'Negara 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    agama: ['Agama 1', 'Agama 2', 'Agama 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    statusPerkawinan: ['Status 1', 'Status 2', 'Status 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    pekerjaan: ['Pekerjaan 1', 'Pekerjaan 2', 'Pekerjaan 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
    pendidikanTerakhir: ['Pendidikan 1', 'Pendidikan 2', 'Pendidikan 3'].map((label, index) => {
      return { label, value: String(index + 1) };
    }),
  },
};

export default formConstants;
