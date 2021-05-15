import React, { ReactNode } from 'react';

import * as S from './styled';

export interface BreadcrumbsProps {
  /**
   * The content of the component.
   *
   * Doesn't accept a Fragment as a child.
   */
  children?: ReactNode;
  /**
   * Custom separator node.
   *
   * @default '/'
   */
  separator?: ReactNode;
}

const insertSeparators = (items: ReactNode[], separator: ReactNode) => {
  return items.reduce((acc: ReactNode[], current, index) => {
    if (index < items.length - 1) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(
        current,
        <S.BreadcrumbsSeparator
          aria-hidden
          // eslint-disable-next-line react/no-array-index-key
          key={`separator-${index}`}
        >
          {separator}
        </S.BreadcrumbsSeparator>,
      );
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
};

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const { children, separator = '/' } = props;

  const allItems = React.Children.toArray(children).map((child, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <S.BreadcrumbsItem key={`child-${index}`}>
      {child}
    </S.BreadcrumbsItem>
  ));

  return (
    <S.BreadcrumbsRoot>
      <S.BreadcrumbsList>
        <S.BreadcrumbsSeparator aria-hidden>
          {separator}
        </S.BreadcrumbsSeparator>
        {insertSeparators(allItems, separator)}
      </S.BreadcrumbsList>
    </S.BreadcrumbsRoot>
  );
};

export default Breadcrumbs;