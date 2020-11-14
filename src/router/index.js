import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Inicio',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Inicio.vue')
    },
    {
        path: '/Loguin',
        name: 'Loguin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Loguin.vue')
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Dashboard.vue')
    },
    {
        path: '/Dashboard/Crear',
        name: 'Crear',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/CrearEncuesta.vue')
    },
    {
        path: '/Encuesta/:id',
        name: 'Encuuesta',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Encuesta.vue')
    },
    {
        path: '/Editar/:id',
        name: 'Editar',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/EditarEncuesta.vue')
    },
    {
        path: '/Dashboard/Grafica/:id',
        name: 'LineChartContainer',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Grafica.vue')
    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router