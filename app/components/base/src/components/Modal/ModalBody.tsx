import React from 'react';

export type ModalBodyProps = React.HTMLAttributes<HTMLDivElement>;

const ModalBody: React.FC<ModalBodyProps> = props => {
  return <div {...props} className="modal-body" />;
};

export default ModalBody;
