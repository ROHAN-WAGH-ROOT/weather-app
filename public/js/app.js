console.log('client side javascript');

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
// 	res.json().then((data) => {
// 		console.log(data);
// 	});
// });

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message1');
const errormsg = document.querySelector('#message2');

message.textContent = 'from JavaScript';
weatherform.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;

	message.textContent = 'Loading...';
	message.textContent = '';
	fetch('/weather?address=' + location).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				message.textContent = data.error;
			} else {
				message.textContent = data.location;
				errormsg.textContent = data.forecast;
			}
		});
	});
});
