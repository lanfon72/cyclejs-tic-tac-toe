import intent from './intent'
import model from './model'
import view from "./view"

export default function TicTacToe(sources) {
  const actions = intent(sources.DOM)
  const reducer$ = model(actions)
  const vdom$ = view(sources.onion.state$)
  return {
    DOM: vdom$,
    onion: reducer$
  }
}