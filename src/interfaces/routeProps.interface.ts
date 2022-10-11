import { FC } from 'react';
export interface RouteProps {
  title: string;
  path: string;
  element: FC;
  layout?: null | FC;
  private: boolean;
}
