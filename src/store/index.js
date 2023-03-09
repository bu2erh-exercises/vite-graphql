import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const defStore = defineStore('def', {
    //刷新不丢失
    persist: {
        storage: window.sessionStorage,
        paths: ['config']
    },
    // other options...
    state: () => ({
        config: {},
        count: 0
    }),
    getters: {},
    actions: {}
})
