import { Meta } from '@storybook/react';
import { useThemeUI, Grid } from 'theme-ui';
import styled from '@emotion/styled';
import { Typography } from '@/common/components/system/Typography';

export default {
  title: 'Design/Palette',
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
        <Typography>{title}</Typography>

        <Typography color="secondary" variant="body2">{color}</Typography>
      </PaletteColorContainer>
    </PaletteColorRoot>
  );
};

export const Palette = () => {
  const { theme } = useThemeUI();

  return (
    <Grid columns={1}>
      <Grid columns={4}>
        <PaletteColor title="text.primary" color={theme.rawColors.textColors.primary} />
        <PaletteColor title="text.secondary" color={theme.rawColors.textColors.secondary} />
        <PaletteColor title="text.disabled" color={theme.rawColors.textColors.disabled} />
      </Grid>

      <Grid columns={4}>
        <PaletteColor title="background.primary" color={theme.rawColors.backgroundColors.primary} />
        <PaletteColor title="background.secondary" color={theme.rawColors.backgroundColors.secondary} />
      </Grid>

      <Grid columns={4}>
        <PaletteColor title="brand.primary" color={theme.rawColors.brand.primary} />
        <PaletteColor title="brand.primary" color={theme.rawColors.brand.secondary} />
      </Grid>

      <Grid columns={4}>
        <PaletteColor title="status.primary" color={theme.rawColors.status.success} />
        <PaletteColor title="status.info" color={theme.rawColors.status.info} />
        <PaletteColor title="status.warning" color={theme.rawColors.status.warning} />
        <PaletteColor title="status.error" color={theme.rawColors.status.error} />
      </Grid>
    </Grid>
  );
};
