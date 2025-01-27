import { questionnaireKeyType } from '@/shared/types';

export interface questionnaireFieldInterface {
  title: string;
  key: questionnaireKeyType;
}

export const questionnaireMainFields: questionnaireFieldInterface[] = [
  {
    title: 'Хобби',
    key: 'hobby',
  },
  {
    title: 'Любимый цветок',
    key: 'flower',
  },
  {
    title: 'Любимое блюдо',
    key: 'dish',
  },
  {
    title: 'Время отдыха',
    key: 'chillTime',
  },
  {
    title: 'Любимый фильм',
    key: 'film',
  },
  {
    title: 'Любимый певец',
    key: 'singer',
  },
  {
    title: 'Любимый цвет',
    key: 'color',
  },
  {
    title: 'Позитивные черты',
    key: 'positiveTraits',
  },
];
