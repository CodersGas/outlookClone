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

	const [inboxData, setInboxData] = useState(null);
	const [selectedMailIndex, setSelectedMailIndex] = useState(null);
	const [updateInboxCount, setUpdateInboxCount] = useState(false);
	const [unreadCountsFetched, setUnreadCountsFetched] = useState(false);

	const updateSelectedMailIndex = (index) => setSelectedMailIndex(index);

	const resetUpdateInboxCountState = () => setUpdateInboxCount(false);

	const updateInboxDataAndUnreadCount = (index, unreadType) => {
		let temp = [...inboxData];
		temp[index].unread = false;

		setInboxData([...temp]);
		setUpdateInboxCount(true);
	}

	const fetchInboxData = async() => {
		try{
			const res = await apiCaller('getInboxData');
			setInboxData(res.finalData);
		}catch(err) {
			console.log('err' , err);
		}
	}

	const fetchUnreadCounts = async() => {
		try{
			const res = await apiCaller('getUnreadCounts');
			Cookie.set('unreadCounts', res.unreadCounts);

			if(res.status == 1) {
				setUnreadCountsFetched(true);
			} 

		}catch(err) {
			console.log('error while fetching unreadCounts ', err);
		}
	}

	useEffect(async() => {
		fetchInboxData();
		fetchUnreadCounts();
	}, []);

	return(
		<Layout {...props} >
			<Grid container style={{height: '100%'}} >
				<Grid item md={2} className="outlookNavContainer" >
					<OutlookNav 
						page="inbox" 
						resetUpdateInboxCountState={resetUpdateInboxCountState}
						updateInboxCount={updateInboxCount}
						unreadCountsFetched={unreadCountsFetched}
					/>
				</Grid>

				<Grid item md={10} xs={12} sm={12} >
					<Grid container >
						<MailsList 
							type="inbox"
							inboxData={inboxData}
							updateSelectedMailIndex={updateSelectedMailIndex}
							updateInboxDataAndUnreadCount={updateInboxDataAndUnreadCount}
						/>

						{
							(selectedMailIndex || selectedMailIndex == 0) ?
							<MailDetail 
								data={inboxData[selectedMailIndex]}
							/>
							:
							<EmptyState inboxData={inboxData} />
						}
					</Grid>
				</Grid>
			</Grid>
		</Layout>
	)
}

export default SyncUserAuth(Home);