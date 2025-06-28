import express from 'express'
import http from 'http'
import cors from 'cors'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from './src/schema'

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  )

  await new Promise(resolve => httpServer.listen({ port: 4002 }, resolve))

  console.log(`Server is running on http://localhost:4002/graphql`)
}

startApolloServer(typeDefs, resolvers)