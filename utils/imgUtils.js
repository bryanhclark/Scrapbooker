import EXIF from 'exif-js'

export const fetchExifData = (image) => {
	return new Promise((res) => {
		EXIF.getData(image, function () {
			res(Number(EXIF.getTag(this, "Orientation")))
		})
	})
}

export function imageEXIFPacker(image, url, eventId, userId, cb) {
	const imgObj = {}
	EXIF.getData(image, function () {
		imgObj.src = url
		imgObj.width = Number(EXIF.getTag(this, "PixelXDimension"))
		imgObj.height = Number(EXIF.getTag(this, "PixelYDimension"))
		imgObj.orientation = Number(EXIF.getTag(this, "Orientation"))
		imgObj.timeCreated = image.lastModified.toString()
		imgObj.eventId = eventId
		imgObj.userId = userId
		cb(null, imgObj)
	})
}

export const resizeImage = function (settings, orientation) {
	const file = settings.file
	const maxSize = settings.maxSize
	const reader = new FileReader()
	const image = new Image()
	const canvas = document.createElement('canvas')
	const dataURItoBlob = function (dataURI) {
		const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
			atob(dataURI.split(',')[1]) :
			unescape(dataURI.split(',')[1]);
		const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
		const max = bytes.length
		const ia = new Uint8Array(max)
		for (var i = 0; i < max; i++)
			ia[i] = bytes.charCodeAt(i)
		return new Blob([ia], { type: mime })
	};

	const resize = function () {
		let width = image.width;
		let height = image.height;
		if (width > height) {
			if (width > maxSize) {
				height *= maxSize / width;
				width = maxSize;
			}
		} else {
			if (height > maxSize) {
				width *= maxSize / height;
				height = maxSize;
			}
		}
		canvas.width = width;
		canvas.height = height;
		let ctx = canvas.getContext('2d')
		if (4 < orientation && orientation < 9) {
			canvas.width = height;
			canvas.height = width;
		} else {
			canvas.width = width;
			canvas.height = height;
		}
		switch (orientation) {
			case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
			case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
			case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
			case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
			case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
			case 7: ctx.transform(0, -1, -1, 0, height, width); break;
			case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
			default: break;
		}
		ctx.drawImage(image, 0, 0, width, height);
		var dataUrl = canvas.toDataURL('image/jpeg');
		return dataURItoBlob(dataUrl);
	};

	return new Promise(function (ok, no) {
		if (!file.type.match(/image.*/)) {
			no(new Error("Not an image"));
			return;
		}
		reader.onload = function (readerEvent) {
			image.onload = function () { return ok(resize()); };
			image.src = readerEvent.target.result;
		};
		reader.readAsDataURL(file);
	});
};
