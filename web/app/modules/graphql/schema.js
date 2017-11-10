import {makeExecutableSchema} from 'graphql-tools';

import resolvers from './resolvers.js';
import typeDefs from './typeDefs';

const executableSchema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers(),
});

export default executableSchema;