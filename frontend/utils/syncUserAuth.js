import nextCookie from 'next-cookies'

export const SyncUserAuth = Component => {

	const Wrapper = props => {

		return <Component {...props} />
	}

	Wrapper.getInitialProps = async ctx => {
		const { user } = nextCookie(ctx);

		if(!user) {
			ctx.res.writeHead(302, {Location: '/'});
			ctx.res.end();
			return;
		}

		const componentProps =
	      Component.getInitialProps &&
	      (await Component.getInitialProps(ctx))

	    return { ...componentProps, user }
	}

	return Wrapper;

}