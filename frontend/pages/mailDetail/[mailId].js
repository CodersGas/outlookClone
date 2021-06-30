import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import apiCaller from 'utils/apiCaller';
import Head from 'next/head';

const MailDetail = (props) => {

	return(
		<>
			<Head>
				<title>
					Mail Detail | {props.data.subject}
				</title>
			</Head>
			<Grid container justify='center' id="mailDetailPage" >
				<Grid item md={6} xs={12} sm={12} >
					<Box my={1} >
						<Typography className='fontLarge fontBold' >
							{props.data.subject}
						</Typography>
					</Box>

					<Box my={2} >
						<Typography className='fontMedium' >
							{props.data.content}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

export async function getServerSideProps(ctx) {
	const { mailId, type } = ctx.query;

	let endpoint = type === 'inbox' ? 'getInboxMailDetail' : 'getSpamMailDetail';

	const res = await apiCaller(endpoint, {'mailId': mailId});

	return{
		props: {
			data: res.finalData	
		}
	}
}

export default MailDetail;