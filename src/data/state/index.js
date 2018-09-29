import defaults from './defaults';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

console.log('typeDefs', typeDefs);

const clientState = {
  defaults,
  resolvers,
  typeDefs,
};

export default clientState;
