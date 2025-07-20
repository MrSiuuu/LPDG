import './assets/main.css'
import ECharts from 'vue-echarts'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent, VisualMapComponent } from 'echarts/components'
import 'quill/dist/quill.snow.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Appliquer le mode sombre par défaut au chargement de l'app
const savedTheme = localStorage.getItem('theme')
if (savedTheme !== 'light') {
  document.documentElement.classList.add('dark')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('v-chart', ECharts)

echarts.use([CanvasRenderer, MapChart, TooltipComponent, LegendComponent, TitleComponent, VisualMapComponent])

app.mount('#app')
