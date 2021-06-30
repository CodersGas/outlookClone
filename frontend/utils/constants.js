import MailIcon from '@material-ui/icons/Mail';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';

export const outlookNavigation = [
	{
		'title': 'Inbox',
		'icon': <MailIcon />,
		'link': '/home',
		'page': 'inbox'
	},
	{
		'title': 'Spam',
		'icon': <ErrorIcon />,
		'link': '/spam',
		'page': 'spam'
	},
	{
		'title': 'Deleted Messages',
		'icon': <DeleteIcon />,
		'link': '/deleted',
		'page': 'deleted'
	}
]