import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

export const routes: RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/editor',
  },
  {
    path: '/rgb',
    component: () => import('./RGBFlow/RGBFlow.vue'),
  },
  {
    path: '/basic',
    component: () => import('./Basic/Basic.vue'),
  },
  {
    path: '/editor',
    component: () => import('./Editor/EditorTest.vue'),
  },
  {
    path: '/custom-connectionline',
    component: () => import('./CustomConnectionLine/CustomConnectionLine.vue'),
  },
  {
    path: '/custom-node',
    component: () => import('./CustomNode/CustomNode.vue'),
  },
  {
    path: '/drag-n-drop',
    component: () => import('./DragNDrop/DnD.vue'),
  },
  {
    path: '/edges',
    component: () => import('./Edges/EdgesExample.vue'),
  },
  {
    path: '/edge-types',
    component: () => import('./EdgeTypes/EdgeTypesExample.vue'),
  },
  {
    path: '/empty',
    component: () => import('./Empty/EmptyExample.vue'),
  },
  {
    path: '/hidden',
    component: () => import('./Hidden/HiddenExample.vue'),
  },
  {
    path: '/interaction',
    component: () => import('./Interaction/InteractionExample.vue'),
  },
  {
    path: '/layouting',
    component: () => import('./Layouting/LayoutingExample.vue'),
  },
  {
    path: '/multi-flows',
    component: () => import('./MultiFlows/MultiFlowsExample.vue'),
  },
  {
    path: '/node-type-change',
    component: () => import('./NodeTypeChange/NodeTypeChangeExample.vue'),
  },
  {
    path: '/overview',
    component: () => import('./Overview/Overview.vue'),
  },
  {
    path: '/provider',
    component: () => import('./Provider/ProviderExample.vue'),
  },
  {
    path: '/save-restore',
    component: () => import('./SaveRestore/SaveRestoreExample.vue'),
  },
  {
    path: '/stress',
    component: () => import('./Stress/StressExample.vue'),
  },
  {
    path: '/switch',
    component: () => import('./Switch/SwitchExample.vue'),
  },
  {
    path: '/unidirectional',
    component: () => import('./Unidirectional/UnidirectionalExample.vue'),
  },
  {
    path: '/updateable-edge',
    component: () => import('./UpdatableEdge/UpdatableEdgeExample.vue'),
  },
  {
    path: '/update-node',
    component: () => import('./UpdateNode/UpdateNodeExample.vue'),
  },
  {
    path: '/validation',
    component: () => import('./Validation/ValidationExample.vue'),
  },
  {
    path: '/nesting',
    component: () => import('./Nesting/Nesting.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
