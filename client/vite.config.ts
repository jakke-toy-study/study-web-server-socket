import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env.VITE_WS_URL': JSON.stringify(process.env.VITE_WS_URL),
		'process.env.VITE_WS_PORT': JSON.stringify(process.env.VITE_WS_PORT),
	}
});
