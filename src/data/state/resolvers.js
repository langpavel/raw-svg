// NO flow

const resolvers = {
  Mutation: {
    updateCurrentDrawing: (_, data, { cache }) => {
      cache.writeData({ data });
      return null;
    },
    openDialog: (_, { name }, { cache }) => {
      cache.writeData({
        data: {
          __typename: 'Dialogs',
          dialogs: {
            __typename: 'Dialog',
            [name]: true,
          },
        },
      });
      return null;
    },
    closeDialog: (_, { name }, { cache }) => {
      cache.writeData({
        data: {
          __typename: 'Dialogs',
          dialogs: {
            __typename: 'Dialog',
            [name]: false,
          },
        },
      });
      return null;
    },
  },
};

export default resolvers;
