import { DefaultApolloClient } from '@vue/apollo-composable'
import {
    // createHttpLink,
    ApolloClient,
    HttpLink,
    split,
    InMemoryCache,
    from
} from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'

import { WebSocketLink } from '@apollo/client/link/ws'

import { onError } from '@apollo/client/link/error'

const toLoaction = (url) => {
    let a = document.createElement('a')
    a.href = url
    return a.href
}

let protocol = location.protocol
let wsprotocol = protocol === 'http:' ? 'ws:' : 'wss:'

console.log(toLoaction('./graphql'))
console.log(toLoaction('./subscription').replace(protocol, wsprotocol))
// 与 API 的 HTTP 连接
const httpLink = new HttpLink({
    // 你需要在这里使用绝对路径
    uri: toLoaction('./graphql')
})

const wsLink = new WebSocketLink({
    uri: toLoaction('./subscription').replace(protocol, wsprotocol),
    options: {
        reconnect: true
    }
})

const link = split(
    // 根据操作类型拆分
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink
)

const errprLink = onError(({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )

    if (networkError) console.log(`[Network error]: ${networkError}`)
    if (operation) console.log(`[Operation error]: ${operation}`)
    if (response) console.log(`[Response error]: ${response}`)
})

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
    link: from([errprLink, link]),
    cache
})

export default (app) => {
    app.provide(DefaultApolloClient, apolloClient)
}
