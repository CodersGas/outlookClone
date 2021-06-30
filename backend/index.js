import app from './config/express.js';

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

export default app;