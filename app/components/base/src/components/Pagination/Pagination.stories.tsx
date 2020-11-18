import React from 'react';
import { ComponentWithStaticMethod } from 'kta-ui-components';
import Pagination from './Pagination';

type BasicArgs = unknown;

export default { component: Pagination, title: 'Components / Pagination' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (nextPageNum: number) => {
    setCurrentPage(nextPageNum);
  };

  return <Pagination currentPage={currentPage} onPageChange={handlePageChange} />;
};

Basic.storyName = 'basic';
Basic.argTypes = {};
