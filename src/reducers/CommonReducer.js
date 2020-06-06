
const INITIAL_STATE = {
  appName: 'Shikshana Setu'
}

export default (state = INITIAL_STATE, action) => {
  let currentState = state;
  switch (action.type) {
    case 'ACTION_NAME': console.log('coming to reducer correctly , pay;oad:', action.payload);
      break;
    default: break;
  }
  return currentState;
}