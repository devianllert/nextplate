import styled from '@emotion/styled';

export const BreadcrumbsRoot = styled.nav`
  display: flex;
  align-items: center;

  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.25px;
`;

export const BreadcrumbsList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding: 0;
  margin: 0;

  list-style: none;
`;

export const BreadcrumbsSeparator = styled.li`
  display: flex;
  user-select: none;
  margin-left: 4px;
  margin-right: 4px;
`;

export const BreadcrumbsItem = styled.li({
  display: 'inline-flex',
  alignItems: 'center',
});

export const BreadcrumbsLink = styled.a({
  textDecoration: 'none',
});
