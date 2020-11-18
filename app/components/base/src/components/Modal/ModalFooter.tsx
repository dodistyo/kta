import React from 'react';

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

const ModalFooter: React.FC<ModalFooterProps> = props => {
  return <div {...props} className="modal-footer" />;
};

export default ModalFooter;
