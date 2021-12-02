import * as React from 'react';

import * as S from './styled';

export type BreadcrumbItemProps = React.HTMLAttributes<HTMLElement>;

/**
 * The `BreadcrumbItem` component is used to group a breadcrumb link.
 * It renders a `li` element to denote it belongs to an order list of links.
 */
export const BreadcrumbsItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <S.BreadcrumbsItem ref={ref} {...other}>
      {children}
    </S.BreadcrumbsItem>
  );
});

export type BreadcrumbLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const BreadcrumbsLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <S.BreadcrumbsLink ref={ref} {...other}>
      {children}
    </S.BreadcrumbsLink>
  );
});

export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLLIElement>;

/**
 * The `BreadcrumbSeparator` component used to separate each breadcrumb item.
 */
export const BreadcrumbsSeparator = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <S.BreadcrumbsSeparator aria-hidden ref={ref} {...other}>
      {children}
    </S.BreadcrumbsSeparator>
  );
});

export type BreadcrumbsProps = React.HTMLAttributes<HTMLElement>;

/**
 * Breadcrumbs, or a breadcrumb navigation, can help enhance how users navigate to previous page levels of a website,
 * especially if that website has many pages or products.
 */
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <S.BreadcrumbsRoot aria-label="breadcrumb" ref={ref} {...other}>
      <S.BreadcrumbsList>
        {children}
      </S.BreadcrumbsList>
    </S.BreadcrumbsRoot>
  );
});

export {
  Breadcrumbs as Root,
  BreadcrumbsItem as Item,
  BreadcrumbsLink as Link,
  BreadcrumbsSeparator as Separator,
};
