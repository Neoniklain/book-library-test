import Vue from "vue"
import VueRouter, {RouteConfig} from "vue-router"
import Home from "@/views/Home.vue"
import History from "@/views/History.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/history',
        name: 'History',
        component: History
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "active"
})

export default router