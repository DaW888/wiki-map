import { createStore, createHook } from 'react-sweet-state';

const actions = {
  one: () => ({ setState, getState }) => {
    console.log(setState, getState);
  },
};

const Store = createStore({
  initialState: {
    one: 1,
  },
  actions,
  name: 'store',
});

export const useStore = createHook(Store);
