AppConfig.$inject = ['$componentLoaderProvider'];
export function AppConfig($componentLoaderProvider) {
	$componentLoaderProvider
		.setCtrlNameMapping(function (name) {
			return name.split('_').map(function(segment) {
				return segment.charAt(0).toUpperCase() + segment.slice(1)
			}).join('') + 'Controller';
		})
		.setTemplateMapping(function (name) {
			name = name.replace('_', '/');
			if (name.indexOf('/') == -1) {
				name = [name, name.split('/').pop()].join('/');
			}

			return 'components/' + name + '.html';
		});
};