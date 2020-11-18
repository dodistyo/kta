import React from 'react';
import Icon from '../Icon/Icon';

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const ModalHeader: React.FC<ModalHeaderProps> = props => {
  const { children, onClose, ...rest } = props;

  return (
    <div {...rest} className="modal-header">
      <div>{children}</div>
      <button className="modal-header-btn" onClick={onClose}>
        <Icon name="times" />
      </button>
    </div>
  );
};

export default ModalHeader;
