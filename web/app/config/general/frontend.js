'use strict';

/*Chứa config chung của dev frontend thường xuyên thay đổi mỗi dự án*/

module.exports = {
	assets: {
		required: [
			'script-loader?!jquery',
			'jquery-mousewheel',
			'tether',
			'bootstrap',
			'slick-carousel',
			'malihu-custom-scrollbar-plugin',
			'cropper',
			/////////////////
			'bootstrap/dist/css/bootstrap.css',
			'slick-carousel/slick/slick-theme.scss',
			'slick-carousel/slick/slick.scss',
			'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
			'cropper/dist/cropper.css'
		],
		include: {
			css: [
				'public/assets/dist/styles/vendor.css',
				'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css',
				'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css',
				'public/assets/dist/styles/main.css'
			],
			js: [
				'public/assets/dist/scripts/vendor.js',
				'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js',
				'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
				'public/assets/dist/scripts/main.js',
				'public/assets/dist/scripts/common.js'
			]
		}
	}
};