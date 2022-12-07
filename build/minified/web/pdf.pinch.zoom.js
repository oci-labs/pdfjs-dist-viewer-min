var gesturesSetUp = false;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;

document.addEventListener('textlayerrendered', function (e) {
	if (gesturesSetUp || e.detail.pageNumber !== PDFViewerApplication.page) {
		return;
	}

	var viewer = document.getElementById('viewer');

	// http://blog.fspm.jp/2014/06/androidpinch-inoutjsgesturestart.html

	var funcGestureStart = function (e) { };
	var funcGestureChange = function (e) { };
	var funcGestureEnd = function (e) {
		if (e.scale < 1.0) {
			// User moved fingers closer together
			document.getElementById('zoomOut').click()
		} else if (e.scale > 1.0) {
			// User moved fingers further apart
			document.getElementById('zoomIn').click()
		}
	};

	// iOS
	document.body.addEventListener('gesturestart', funcGestureStart, false);
	document.body.addEventListener('gesturechange', funcGestureChange, false);
	document.body.addEventListener('gestureend', funcGestureEnd, false);

	// Android
	if (isAndroid) {
		var pinchDistance = 0;
		var pinchScale = 1;
		document.body.addEventListener('touchstart', function (e) {
			if (e.touches.length > 1) {
				pinchDistance = Math.sqrt(Math.pow((e.touches[1].pageX - e.touches[0].pageX), 2) + Math.pow((e.touches[1].pageY - e.touches[0].pageY), 2));
				funcGestureStart(e);
			} else {
				pinchDistance = 0;
				pinchScale = 1;
			}
		}, false);

		document.body.addEventListener('touchmove', function (e) {
			if (pinchDistance <= 0 || e.touches.length < 2) {
				return;
			}

			var newDistance = Math.sqrt(Math.pow((e.touches[1].pageX - e.touches[0].pageX), 2) + Math.pow((e.touches[1].pageY - e.touches[0].pageY), 2));
			pinchScale = newDistance / pinchDistance;
			var event = { scale: pinchScale };

			funcGestureChange(event);
		});
		document.body.addEventListener('touchend', function (e) {
			if (pinchDistance <= 0 || e.touches.length > 0) {
				return;
			}
			var event = { scale: pinchScale };
			funcGestureEnd(event);
		});
	}

	gesturesSetUp = true;
}, true);

document.documentElement.addEventListener('touchstart', function (event) {
	if (event.touches.length > 1) {
		event.preventDefault();
	}
}, false);