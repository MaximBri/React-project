import { AboutSettings, GeneralSettings } from '../ui';

export interface sectionsInUserCabinetInterface {
  name: string;
  content: React.ReactNode;
}

export const sectionsInUserCabinet: sectionsInUserCabinetInterface[] = [
  {
    name: 'Основное',
    content: <GeneralSettings />,
  },
  {
    name: 'О себе',
    content: <AboutSettings />,
  },
];
