export function uuid() {
  return Math.random().toString(36).substring(2);
}

export function saveStatePlugin(store) {
  store.subscribe((mutation, state) => {
    localStorage.setItem("board", JSON.stringify(state.board));
  });
  // store.subscribe((mutation, state) => {
  //   localStorage.removeItem("board", JSON.stringify(state.board));
  // });
}
