const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		name: 'index',
		component: () => import('../pages/index/index.vue')
	},
	{
		path: '/list',
		name: 'list',
		component: () => import('../pages/list/index.vue')
	},
	{
		path: '/serviceInfo',
		name: 'serviceInfo',
		component: () => import('../pages/serviceInfo/index.vue')
	},
	{
		path: '/recommend',
		name: 'recommend',
		component: () => import('../pages/recommend/index.vue')
	},
	{
		path: '/destination',
		name: 'destination',
		component: () => import('../pages/destination/index.vue')
	},
	{
		path: '/chanel-detail',
		name: 'channelDetail',
		component: () => import('../pages/channel-detail/index.vue')
	},{
		path:'/article-detail',
		name:'article-detail',
		component: () => import('../pages/article-detail/index.vue')
	}
]

export default routes