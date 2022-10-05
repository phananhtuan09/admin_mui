import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import ReactApexChart from 'react-apexcharts'
// @mui
import { Box, Card, CardHeader } from '@mui/material'
// utils
import { fNumber } from '@/utils/formatNumber'
// components
import { BaseOptionChart } from '@/Components/Global/chart'

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
}
interface AppConversionRatesProps {
  title?: string
  subheader?: string
  chartData?: any
}
export default function AppConversionRates({
  title,
  subheader,
  chartData,
  ...other
}: AppConversionRatesProps) {
  const chartLabels = chartData.map((i: any) => i.label)

  const chartSeries = chartData.map((i: any) => i.value)

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: any) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  })

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  )
}
