export default function intent(domSource) {
  return {
    startGame$: domSource.select(".new-game").events("click")
      .constant(null),
    markCell$: domSource.select(".cell").events("click")
      .map(ev => [...ev.ownerTarget.classList.values()].filter(v => v !=="cell"))
  }
}