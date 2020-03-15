const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		name: 'index',
		component: () => import('../pages/index/index.vue')
	}
]

export default routes