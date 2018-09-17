// @flow

const defaults = {
  currentDrawing: {
    __typename: 'CurrentDrawing',
    name: null,
    root: null,
  },
  dialogs: {
    __typename: 'Dialogs',
    openFile: false,
  },
  currentDocument: null,
};

export default defaults;
