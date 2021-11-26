import { ConnectionMode, FlowState, PanOnScrollMode, DefaultNodeTypes, DefaultEdgeTypes } from '~/types'
import { DefaultNode, InputNode, OutputNode, BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '~/components'
import { createHooks } from '~/composables'

export const defaultNodeTypes: DefaultNodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
}

export const defaultEdgeTypes: DefaultEdgeTypes = {
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
}

export const initialState = (): FlowState => ({
  dimensions: {
    width: 0,
    height: 0,
  },
  transform: [0, 0, 1],
  elements: [],
  nodeTypes: [],
  edgeTypes: [],
  selectedElements: undefined,
  selectedNodesBbox: { x: 0, y: 0, width: 0, height: 0 },

  d3Zoom: undefined,
  d3Selection: undefined,
  d3ZoomHandler: undefined,
  minZoom: 0.5,
  maxZoom: 2,
  translateExtent: [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],

  nodeExtent: [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  preventScrolling: true,
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,

  nodesSelectionActive: false,
  selectionActive: false,

  userSelectionRect: {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    draw: false,
  },

  arrowHeadColor: '#b1b1b7',
  connectionNodeId: undefined,
  connectionHandleId: undefined,
  connectionHandleType: 'source',
  connectionPosition: { x: NaN, y: NaN },
  connectionMode: ConnectionMode.Loose,

  snapGrid: [15, 15],
  snapToGrid: false,

  nodesDraggable: true,
  nodesConnectable: true,
  elementsSelectable: true,

  multiSelectionActive: false,

  isReady: false,
  hooks: createHooks(),
  loading: false,

  vueFlowVersion: typeof __VUE_FLOW_VERSION__ !== 'undefined' ? __VUE_FLOW_VERSION__ : '-',
})
