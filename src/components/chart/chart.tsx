import type { ChartProps } from './types';

import { lazy, Suspense } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { chartClasses } from './classes';
import { ChartLoading } from './components';

// ----------------------------------------------------------------------

const LazyChart = lazy(() => import('react-apexcharts'));

export function Chart({
  sx,
  type,
  series,
  slotProps,
  className,
  options = {},
  ...other
}: ChartProps) {
  const renderFallback = () => <ChartLoading type={type} sx={slotProps?.loading} />;

  return (
    <ChartRoot
      dir="ltr"
      className={mergeClasses([chartClasses.root, className])}
      sx={sx}
      {...other}
    >
      <Suspense fallback={renderFallback()}>
        <LazyChart type={type} series={series} options={options} width="100%" height="100%" />
      </Suspense>
    </ChartRoot>
  );
}

// ----------------------------------------------------------------------

const ChartRoot = styled('div')(({ theme }) => ({
  width: '100%',
  flexShrink: 0,
  position: 'relative',
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));
