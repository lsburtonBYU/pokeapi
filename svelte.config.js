import netlify from '@sveltejs/adapter-netlify';

export default {
	kit: {
		adapter: netlify()
	},
	files: {
		assets: 'static',
		hooks: 'src/hooks',
		lib: 'src/lib',
		params: 'src/params',
		routes: 'src/routes',
		template: 'src/app.html'
	}
};
