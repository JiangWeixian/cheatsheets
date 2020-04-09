import { ExtractRematchDispatchersFromModels, ExtractRematchStateFromModels } from '@rematch2/core'
import { RootModel } from './store'

declare global {
  interface Window {
    __NEXT_REDUX_STORE__: any
  }
  interface RootState extends ExtractRematchStateFromModels<RootModel> {}
  interface Dispatch extends ExtractRematchDispatchersFromModels<RootModel> {}
}
