import {run} from '@cycle/most-run'
import {makeDOMDriver} from '@cycle/dom'
import onionify from "cycle-onionify"
import TicTacToe from "./components/tic-tac-toe"

const main = onionify(TicTacToe)

const drivers = {
  DOM: makeDOMDriver('#root'),
}

run(main, drivers)
