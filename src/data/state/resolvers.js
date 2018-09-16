// NO flow

const resolvers = {
  Mutation: {
    updateCurrentDrawing: (_, data, { cache }) => {
      cache.writeData({ data });
      return null;
    },
    openDialog: (_, { name }, { cache }) => {
      console.log('Cache', cache);
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
  },
};

export default resolvers;
