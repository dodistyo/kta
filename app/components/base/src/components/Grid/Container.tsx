import styled from '../../styled';

export type ContainerProps = {
  /**
   * @default false
   */
  fluid?: boolean;
};

const Container = styled.div<ContainerProps>`
  width: 100%;
  padding-right: ${p => p.theme.grid.gutter / 2}px;
  padding-left: ${p => p.theme.grid.gutter / 2}px;
  margin-right: auto;
  margin-left: auto;
  ${p =>
    !p.fluid &&
    p.theme.mq({
      maxWidth: [
        '100%',
        p.theme.grid.container.sm,
        p.theme.grid.container.md,
        p.theme.grid.container.lg,
        p.theme.grid.container.xl,
      ],
    })};
`;

export default Container;
