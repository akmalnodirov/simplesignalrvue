import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from "./layout/MainLayout";
import TokenService from "./services/tokenService";
import VueJwtDecode from "vue-jwt-decode";

/*let roleCode = 'admin';
let hasToken = !!TokenService.getToken();
if (hasToken) {
    let decodedAuth = VueJwtDecode.decode(TokenService.getToken());
    if (decodedAuth) {
        roleCode = decodedAuth.RoleCode;
    }
}*/

/*const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};*/

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '/',
                    component: () =>  import('./pages/Home'),
                    name: 'home'
                }
            ]
        },
    ]
});

/*router.beforeEach((to, from, next) => {

    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    let hasToken = !!TokenService.getToken();

    if (!isPublic && !hasToken) {
        return next({
            name: 'login'
        })
    }

    if (hasToken && onlyWhenLoggedOut) {
        return next({
            name: 'home'
        })
    }


    next();
});*/

export default router;

