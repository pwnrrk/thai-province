import dotenv from 'dotenv';
import Web from './app/libs/web';
import { initializeApp } from 'firebase/app';

dotenv.config();

process.on('unhandledRejection', (error) => console.trace(error));
process.on('uncaughtException', (error) => console.trace(error));

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'thai-province.firebaseapp.com',
	projectId: 'thai-province',
	storageBucket: 'thai-province.appspot.com',
	messagingSenderId: '804710319647',
	appId: '1:804710319647:web:e48107ee9a023f2489372a',
	measurementId: 'G-8DZZQ0YDDK'
};

initializeApp(firebaseConfig);

const web = new Web();
web.start();
