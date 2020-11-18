import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import Widget from './Widget';

type BasicArgs = unknown;

export default { component: Widget, title: 'Components / Widget' };

const dataDummy = {
  message: 'Success',
  data: {
    age: {
      '< 20': 1,
      '20 - 29': 8,
      '30 - 39': 6,
      '40 - 49': 6,
      '50 - 59': 1,
      '> 70': 1,
    },
    gender: {
      'Laki - Laki': 18,
      Perempuan: 5,
    },
    location: {
      'DKI JAKARTA': 7,
      'JAWA BARAT': 6,
      'SUMATERA UTARA': 4,
      'KALIMANTAN SELATAN': 1,
      RIAU: 2,
      'JAWA TIMUR': 1,
      ACEH: 1,
      'KALIMANTAN TIMUR': 1,
    },
    total: 23,
    total_loc: 'se-Indonesia',
  },
};

export const TotalData: ComponentWithStaticMethod<BasicArgs> = () => {
  return <Widget.TotalData total={dataDummy.data.total} />;
};

TotalData.storyName = 'total data';
TotalData.argTypes = {};

export const AgeDistribution: ComponentWithStaticMethod<BasicArgs> = () => {
  return <Widget.AgeDistribution data={dataDummy.data.age} />;
};

AgeDistribution.storyName = 'age distribution';
AgeDistribution.argTypes = {};

export const DomicileDistribution: ComponentWithStaticMethod<BasicArgs> = () => {
  return <Widget.DomicileDistribution data={dataDummy.data.location} />;
};

DomicileDistribution.storyName = 'domicile distribution';
DomicileDistribution.argTypes = {};

export const GenderRatio: ComponentWithStaticMethod<BasicArgs> = () => {
  return <Widget.GenderRatio data={dataDummy.data.gender} />;
};

GenderRatio.storyName = 'gender ratio';
GenderRatio.argTypes = {};
