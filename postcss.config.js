module.exports = {
	plugins: [
		require('cssnano')({
			preset: 'default',
		}),
		require('postcss-svgo')({
			plugins: [
				{
					removeDoctype: true
				},
				{
					removeComments: true
				}
			]
		}),
	],
};
