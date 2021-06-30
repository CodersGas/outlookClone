import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Layout from 'components/layout';
import { SyncUserAuth } from 'utils/syncUserAuth';
import OutlookNav from 'components/outlookLeftNav';
import MailsList from 'components/mailsList';
import apiCaller from 'utils/apiCaller';
import Cookie from 'js-cookie';
import dynamic from 'next/dynamic';
import EmptyState from 'components/emptyState';

const MailDetail = dynamic(import('components/mailDetail'));

const Home = (props) => {

	const [spamData, setSpamData] = useState(null);
	const [selectedMailIndex, setSelectedMailIndex] = useState(null);
	const [updateSpamCount, setUpdateSpamCount] = useState(false);

	const updateSelectedMailIndex = (index) => setSelectedMailIndex(index);

	const resetUpdateSpamCountState = () => setUpdateSpamCount(false);

	const updateSpamDataAndUnreadCount = (index) => {
		let temp = [...spamData];
		temp[index].unread = false;

		setSpamData([...temp]);
		setUpdateSpamCount(true);
	}

	const fetchInboxData = async() => {
		try{
			const res = await apiCaller('getSpamData');
			setSpamData(res.finalData);
		}catch(err) {
			console.log('err' , err);
		}
	}

	useEffect(async() => {
		fetchInboxData();
	}, []);

	return(
		<Layout {...props} >
			<Grid container style={{height: '100%'}} >
				<Grid item md={2} className="outlookNavContainer" >
					<OutlookNav 
						page="spam" 
						resetUpdateSpamCountState={resetUpdateSpamCountState}
						updateSpamCount={updateSpamCount}
						unreadCountsFetched={true}
					/>
				</Grid>

				<Grid item md={10} xs={12} sm={12} >
					<Grid container >
						<MailsList 
							type="spam"
							inboxData={spamData}
							updateSelectedMailIndex={updateSelectedMailIndex}
							updateSpamDataAndUnreadCount={updateSpamDataAndUnreadCount}
						/>

						{
							(selectedMailIndex || selectedMailIndex == 0) ?
							<MailDetail 
								data={spamData[selectedMailIndex]}
							/>
							:
							<EmptyState />
						}
					</Grid>
				</Grid>
			</Grid>
		</Layout>
	)
}

export default SyncUserAuth(Home);