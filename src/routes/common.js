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
		path: '/channel-detail',
		name: 'channelDetail',
		component: () => import('../pages/channel-detail/index.vue')
	},{
		path:'/article-detail',
		name:'article-detail',
		component: () => import('../pages/article-detail/index.vue')
	},{
		path:'/travel-agency',
		name:'ravel-agency',
		component: () => import('../pages/travel-agency/index.vue')
	},
	{
		path: '/hotel-list',
		name: '/hotel-list',
		component: () => import('../pages/hotel-list/index.vue')
	},
	{
		path: '/video-list',
		name: '/video-list',
		component: () => import('../pages/video-list/index.vue')
	},
	{
		path: '/pic-list',
		name: '/pic-list',
		component: () => import('../pages/pic-list/index.vue')
	},
	{
		path: '/list-sub',
		name: '/list-sub',
		component: () => import('../pages/list-sub/index.vue')
	},
]

export default routes