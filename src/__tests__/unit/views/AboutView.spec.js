import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

describe('AboutView.vue', () => {
  it('Renderiza en el HTML', () => {
    const wrapper = mount(AboutView)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Se muestra vista About al llegar desde la ruta', async () => {
    const routerPrueba = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/about',
          name: 'about',
          component: AboutView
        }
      ]
    })

    const wrapper = mount(App, {
      global: {
        plugins: [routerPrueba]
      }
    })

    routerPrueba.push({ name: 'about' })

    await routerPrueba.isReady()

    expect(wrapper.findComponent(AboutView).exists()).toBeTruthy()
  })
})