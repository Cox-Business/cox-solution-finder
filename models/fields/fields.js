var keystone = require('keystone'),
	Types = keystone.Field.Types,
	Variables = require('./variables');


exports.svg_icon = function () {

	return {
		type: Types.Select,
		label: "Icon",
		options: Variables.svg_icons()
	}

};

exports.resource = function () {

	return {
		title: { type: String, label: "Resource Title" },
		svg_icon: {
			type: Types.Select,
			label: "Icon",
			options: Variables.svg_icons()
		},
		resource_type: { type: Types.Boolean, default: false, label: "Is this resource an external link?", note: "Check this box if this is an external link. Do not check the box if the link below is a PDF for download."},
		resource_link: { type: String, initial:false, label: "Resource Linked File", note: "Enter the full url for the item to download. (Example: 'http:/www.example.com/my_file.pdf')" },
		description: { type: Types.Textarea, height: 100, label: "Resource Description" }
	}

};

exports.media_buffet = function () {

	function modalTitle(type) {
		return {
			type: String,
			label: "Media "+type+": Title",
			note: "Separate two blocks of text with ' | ' to create bolded text. <br>For example: normaltext | boldtext"
		} 
	};

	return {
		video: {
			title: modalTitle('Video'),
			video_choice: {
				type: Types.Boolean,
				label: "Enable Video?",
				note: "If not checked, no video will show and the image associated will show without the play icon.",
				default: "false"
			},
			video: {
				type: Types.S3File,
				label: 'Media Video: File MP4',
				note: 'MP4 Only. If no video is uploaded, video will default to the Homepage Hero Video.',
				allowedTypes: ['video/mp4'],
				s3path: 'uploads/videos'
			},
			video_webm: {
				type: Types.S3File,
				label: 'Media Video: File WebM',
				note: 'WebM Only. If no WebM, video may function in all browsers. Also, if no MP4 video will not be shown.',
				allowedTypes: ['video/webm'],
				s3path: 'uploads/videos'
			},
			background: {
				type: Types.S3File,
				label: 'Media Video: Preview Image',
				note: "Upload a 2X Image to be preview image for the video.",
				s3path: 'uploads/images'
			}
		},
		values: {
			title: modalTitle('Values'),
			content: { type: Types.Html,
				wysiwyg: true,
				height:200,
				label: "Media Values: Content",
				note: "Limit to around 150 characters for optimal size."
			}
		},
		story: {
			title: modalTitle('Story'),
			content: { type: Types.Markdown,
				wysiwyg: true,
				height:1000,
				label: "Media Story: Content",
				note: "No set limit for characters. Overflowed content will not be shown. All headers will be dark blue."
			},
			featured_image: {
				type: Types.S3File,
				label: 'Media Story: Featured Image',
				note: "Upload a 2X Image to be the vertically cropped preview image for the article. This image will also display in full in the article modal.",
				s3path: 'uploads/images'
			}

		},
		facts: {
			title: modalTitle('Facts'),
			featured_image: {
				type: Types.S3File,
				label: 'Media Facts: Factoid Image',
				note: "Upload a 2X Image.",
				s3path: 'uploads/images'
			}
		}
	}

};
