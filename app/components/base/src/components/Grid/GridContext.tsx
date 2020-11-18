import React from 'react';

export type GridContextValue = {
  /**
   * @default true
   * */
  gutter?: boolean;
};

const GridContext = React.createContext<GridContextValue>({
  gutter: true,
});

export default GridContext;
