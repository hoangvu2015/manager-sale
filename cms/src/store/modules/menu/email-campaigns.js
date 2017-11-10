import lazyLoading from './lazyLoading.js';

export default {
	name: 'Email Campaigns',
	meta: {
		expanded: false,
		title: 'Email Campaigns',
		iconClass: 'glyphicon glyphicon-book'
	},
	children: [
		{
			name: 'test_email_campaign',
			path: '/email-campaign/send',
			component: lazyLoading('email-campaigns/Send'),
			meta: {
				title: 'Send test email'
			}
		},
		{
			name: 'new_email_campaign',
			path: '/email-campaign/create',
			component: lazyLoading('email-campaigns/Detail'),
			meta: {
				title: 'New email campaign'
			}
		},
		{
			name: 'email_campaign_detail',
			path: '/email-campaign/:id',
			hidden: true,
			meta: {
				title: 'Edit email campaign'
			},
			component: lazyLoading('email-campaigns/Detail')
		},
		{
			name: 'email_campaigns',
			path: '/email-campaigns',
			component: lazyLoading('email-campaigns/List'),
			meta: {
				title: 'List email campaigns'
			}
		}
	]
};
