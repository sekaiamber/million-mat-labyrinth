export interface IReactComponents {
  initialize(controller: any, callback?: () => void)
}

export interface IReactComponentsState {
  initialized?: boolean,
}