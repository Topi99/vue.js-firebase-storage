import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';
import $ from 'jquery';
import toastr from 'toastr';
import Masonry from 'masonry-layout'
import VueMasonryPlugin from 'vue-masonry';
import './index.css';

Vue.use(VueFire);
Vue.use(VueMasonryPlugin);

var config = {
	apiKey: "AIzaSyCDlAJCntMmYep_KkStoGuN-vjqQ4oy5dE",
	authDomain: "introduccion-51f08.firebaseapp.com",
	databaseURL: "https://introduccion-51f08.firebaseio.com",
	projectId: "introduccion-51f08",
	storageBucket: "introduccion-51f08.appspot.com",
	messagingSenderId: "616434109804"
};

var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();
var storageRef = firebaseApp.storage().ref();

var vm = new Vue({
	el: '#prin',
	data: {
		image: '',
	},
	firebase: {
		photos: db.ref('photos'),
	},
	methods: {
		getImage(e) {
			this.image = e.target.files[0];
		},

		uploadNewUrl(url) {
			this.$firebaseRefs.photos.push({
				url: url
			});
			toastr.success('Done!');
		},

		uploadImage() {
			var metadata = {
				contentType: 'image/jpeg'
			};

			var uploadTask = storageRef.child(this.image.name).put(this.image, metadata);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					toastr.info('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
					}
				}, (error) => {
				switch (error.code) {
					case 'storage/unauthorized':
						alert("User doesn't have permission to access the object")
						break;

					case 'storage/canceled':
						alert("User canceled the upload")
						break;

					case 'storage/unknown':
						alert("Unknown error occurred, inspect error.serverResponse")
						break;
				}
			}, () => {
				// Upload completed successfully, now we can get the download URL
				var downloadURL = uploadTask.snapshot.downloadURL;
				vm.uploadNewUrl(downloadURL);
			});
		}

	}, // endMethods
});