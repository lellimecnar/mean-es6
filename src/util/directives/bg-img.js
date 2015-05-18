BgImgDirectiveFactory.$selector = 'bgImg';
BgImgDirectiveFactory.$inject = [];
export function BgImgDirectiveFactory() {
	return {
		restrict: 'A',
		controller: BgImgDirective,
		controllerAs: BgImgDirectiveFactory.$selector,
		link: BgImgDirective.$link
	};
};

class BgImgDirective {
	static $link(scope, elem, attrs) {
		attrs.$observe('bgImg', (val) => {
			elem.css({
				'background-image': `url(${val})`,
				'background-size': attrs.bgCover || 'cover',
				'background-position': attrs.bgPosition || 'center',
				'background-repeat': attrs.bgRepeat || 'no-repeat'
			});
		});
	}
}