import { Component, CSSProperties, DefineComponent } from 'vue'
import { BackgroundVariant, Dimensions, Position, XYPosition } from './flow'
import { Connection, ConnectionLineType } from './connection'
import { GraphNode, Node, NodeProps } from './node'
import { EdgeProps } from './edge'
import { FitViewParams } from './zoom'

type GlobalComponentName = string
export type NodeComponent<N = any> =
  | Component<NodeProps<N>>
  | DefineComponent<NodeProps<N>, any, any, any, any>
  | GlobalComponentName
export type EdgeComponent<E = any> =
  | Component<EdgeProps<E>>
  | DefineComponent<EdgeProps<E>, any, any, any, any, any>
  | GlobalComponentName

export type DefaultEdgeTypes = { [key in 'default' | 'straight' | 'smoothstep' | 'step']: EdgeComponent }
export type DefaultNodeTypes = { [key in 'input' | 'output' | 'default']: NodeComponent }

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: string
  position: Position
}

export type ValidConnectionFunc = (connection: Connection) => boolean

export interface HandleProps {
  id?: string
  type?: string
  position?: Position
  isValidConnection?: ValidConnectionFunc
  connectable?: boolean
}

export interface BackgroundProps {
  variant?: BackgroundVariant
  gap?: number
  color?: string
  size?: number
}

export interface ControlProps {
  showZoom?: boolean
  showFitView?: boolean
  showInteractive?: boolean
  fitViewParams?: FitViewParams
}

export interface ControlEvents {
  (event: 'zoom-in'): void
  (event: 'zoom-out'): void
  (event: 'fit-view'): void
  (event: 'interaction-change', active: boolean): void
}

export type StringFunc<N = any> = (node: Node<N> | GraphNode<N>) => string
export type ShapeRendering = 'inherit' | 'auto' | 'geometricPrecision' | 'optimizeSpeed' | 'crispEdges' | undefined

export interface MiniMapProps<N = any> {
  nodeColor?: string | (<NC = N>(node: Node<NC> | GraphNode<NC>) => string)
  nodeStrokeColor?: string | (<NSC = N>(node: Node<NSC> | GraphNode<NSC>) => string)
  nodeClassName?: string | (<NCM = N>(node: Node<NCM> | GraphNode<NCM>) => string)
  nodeBorderRadius?: number
  nodeStrokeWidth?: number
  maskColor?: string
}

export interface MiniMapNodeProps {
  position: XYPosition
  dimensions: Dimensions
  borderRadius?: number
  color?: string
  shapeRendering?: CSSProperties['shapeRendering']
  strokeColor?: string
  strokeWidth?: number
}

export interface EdgeTextProps {
  x: number
  y: number
  label?:
    | string
    | {
        component: any
        props?: any
      }
  labelStyle?: CSSProperties
  labelShowBg?: boolean
  labelBgStyle?: CSSProperties
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}

export interface ConnectionLineProps<N = any> {
  sourceX: number
  sourceY: number
  sourcePosition: Position
  targetX: number
  targetY: number
  targetPosition: Position
  connectionLineType: ConnectionLineType
  connectionLineStyle: CSSProperties
  nodes: GraphNode<N>[]
  sourceNode: GraphNode<N>
  sourceHandle: HandleElement
}
