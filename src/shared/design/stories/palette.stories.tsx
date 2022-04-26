import { Meta } from '@storybook/react';
import { Grid } from 'theme-ui';
import styled from '@emotion/styled';
import * as Text from '@/shared/components/system/text';
import { useTheme } from '../hooks/use-theme';

export default {
  title: 'Design System/Palette',
} as Meta;

const PaletteColorRoot = styled.div({
  display: 'flex',
});

const PaletteColorBox = styled.div<{ color: string }>((props) => ({
  width: 48,
  height: 48,
  borderRadius: 4,
  backgroundColor: props.color,
}));

const PaletteColorContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 8,
});

const PaletteColor = (props) => {
  const { title, color } = props;

  return (
    <PaletteColorRoot>
      <PaletteColorBox color={color} />

      <PaletteColorContainer>
        <Text.Paragraph>{title}</Text.Paragraph>

        <Text.Paragraph color="secondary" variant="body2">{color}</Text.Paragraph>
      </PaletteColorContainer>
    </PaletteColorRoot>
  );
};

export const Palette = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Grid columns={1}>
      <Grid columns={4}>
        <PaletteColor title="text.primary" color={theme.rawColors.text.primary} />
        <PaletteColor title="text.secondary" color={theme.rawColors.text.secondary} />
        <PaletteColor title="text.disabled" color={theme.rawColors.text.disabled} />
      </Grid>

      <Grid columns={4}>
        <PaletteColor title="background.primary" color={theme.rawColors.background.primary} />
        <PaletteColor title="background.secondary" color={theme.rawColors.background.secondary} />
      </Grid>

      <Grid columns={4}>
        <PaletteColor title="brand.primary" color={theme.rawColors.radix.primary11} />
        <PaletteColor title="brand.primary" color={theme.rawColors.radix.secondary11} />
      </Grid>

      <Grid columns={4}>
        <PaletteColor title="status.primary" color={theme.rawColors.radix.green11} />
        <PaletteColor title="status.info" color={theme.rawColors.radix.blue11} />
        <PaletteColor title="status.warning" color={theme.rawColors.radix.yellow11} />
        <PaletteColor title="status.error" color={theme.rawColors.radix.red11} />
      </Grid>
    </Grid>
  );
};
