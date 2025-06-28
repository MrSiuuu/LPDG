<template>
  <div class="map-container">
    <v-chart :option="option" style="width: 100%; height: 500px;" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import guineaJson from '../assets/guinea.json'
import * as echarts from 'echarts/core'

echarts.registerMap('guinea', guineaJson)

// Coordonnées approximatives des 4 régions naturelles de Guinée
const regions = [
  { name: 'Basse-Guinée', value: [-13.6, 9.6, 150] },    // Conakry
  { name: 'Moyenne-Guinée', value: [-11.3, 11.3, 120] }, // Labé
  { name: 'Haute-Guinée', value: [-9.3, 10.4, 100] },    // Kankan
  { name: 'Guinée Forestière', value: [-8.7, 8.5, 80] }  // Nzérékoré
]

const option = ref({
  backgroundColor: '#434A5A',
  title: {
    text: "Qualité de l'air dans les régions naturelles de Guinée",
    subtext: "Données fictives",
    left: 'center',
    top: 20,
    textStyle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    subtextStyle: { color: '#b0b0b0' }
  },
  visualMap: {
    min: 0,
    max: 200,
    left: 20,
    bottom: 20,
    text: ['Haut', 'Bas'],
    calculable: true,
    inRange: { color: ['#e0ffff', '#ffd700'] },
    textStyle: { color: '#fff' }
  },
  geo: {
    map: 'guinea',
    roam: true,
    itemStyle: { areaColor: '#6e7b8b', borderColor: '#fff' },
    emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: '#2a333d' } }
  },
  series: [
    {
      name: 'Guinée',
      type: 'map',
      map: 'guinea',
      geoIndex: 0,
      label: { show: true, color: '#fff' },
      itemStyle: { areaColor: '#6e7b8b', borderColor: '#fff' },
      emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: '#2a333d' } }
    },
    {
      name: 'PM2.5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: regions,
      symbolSize: function (val) { return val[2] / 5 },
      showEffectOn: 'render',
      rippleEffect: { brushType: 'stroke' },
      hoverAnimation: true,
      itemStyle: { color: '#ffd700', shadowBlur: 10, shadowColor: '#333' },
      zlevel: 1
    }
  ]
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  margin-top: 80px;
}
</style> 