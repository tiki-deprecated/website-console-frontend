<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <Bar
    :data="data"
    :options="options"
    class="rounded-lg border border-black bg-white"
  />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    required: false,
    default: () => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: '#FFE68F',
        layout: {
          padding: {
            top: 33,
            bottom: 11,
            left: 11,
            right: 0,
          },
        },
        scales: {
          y: {
            stacked: true,
            ticks: {
              color: '#505C59',
            },
            grid: {
              display: false,
            },
          },
          x: {
            stacked: true,
            ticks: {
              color: '#505C59',
            },
            grid: {
              display: false,
            },
          },
        },
      }
    },
  },
})
</script>
