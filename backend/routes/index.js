import express from 'express';
import controllers from '../controllers/index.js';

const router = express.Router();


router.post('/getInboxMails', controllers.getInboxMails);
router.post('/getUnreadCounts', controllers.getUnreadCounts);
router.post('/getSpamMails', controllers.getSpamMails);
router.post('/getDeletedMails', controllers.getDeletedMails);
router.post('/getSpamDetail', controllers.getSpamDetail);
router.post('/getInboxMailDetail', controllers.getInboxMailDetail);

export default router;