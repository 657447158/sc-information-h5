const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		name: 'index',
		component: () => import('../pages/index/index.vue'),
		children: [
			{
				path: '',
				redirect: 'borrow'
			},
			{
				path: 'borrow',
				component: () => import('../pages/borrow/index.vue')
			},
			{
				path: 'lend',
				component: () => import('../pages/lend/index.vue')
			}
		]
	},
	{
		path: '/public-borrow',
		name: 'public-borrow',
		component: () => import('../pages/borrow/public.vue')
	},
	{
		path: '/borrow-order',
		name: 'borrow-order',
		component: () => import('../pages/borrow/order.vue')
	},
	{
		path: '/public-lend',
		name: 'public-lend',
		component: () => import('../pages/lend/public.vue')
	},
	{
		path: '/lend-order',
		name: 'lend-order',
		component: () => import('../pages/lend/order.vue')
	},
	{
		path: '/my-borrow',
		name: 'my-borrow',
		component: () => import('../pages/borrow/my-borrow.vue'),
		children: [
			{
				path: '',
				redirect: 'current'
			},
			{
				path: 'current',
				component: () => import('../pages/borrow/current-list.vue')
			},
			{
				path: 'history',
				component: () => import('../pages/borrow/history-list.vue')
			},
			{
				path: 'public',
				component: () => import('../pages/borrow/public-list.vue')
			}
		]
	},
	{
		path: '/my-lend',
		name: 'my-lend',
		component: () => import('../pages/lend/my-lend.vue'),
		children: [
			{
				path: '',
				redirect: 'current'
			},
			{
				path: 'current',
				component: () => import('../pages/lend/current-list.vue')
			},
			{
				path: 'history',
				component: () => import('../pages/lend/history-list.vue')
			},
			{
				path: 'public',
				component: () => import('../pages/lend/public-list.vue')
			}
		]
	},
	{
		path: '/borrow-current-detail',
		name: 'borrow-history-detail',
		component: () => import('../pages/borrow/current-detail.vue')
	},
	{
		path: '/borrow-history-detail',
		name: 'borrow-history-detail',
		component: () => import('../pages/borrow/history-detail.vue')
	},
	{
		path: '/repayment',
		name: 'repayment',
		component: () => import('../pages/repayment/index.vue')
	},
	// {
	// 	path: '/borrow-current-detail',
	// 	name: 'borrow-history-detail',
	// 	component: () => import('../pages/borrow/current-detail.vue')
	// },
	{
		path: '/lend-history-detail',
		name: 'lend-history-detail',
		component: () => import('../pages/lend/history-detail.vue')
	},
	// {
	// 	path: '/repayment',
	// 	name: 'repayment',
	// 	component: () => import('../pages/repayment/index.vue')
	// },
]

export default routes