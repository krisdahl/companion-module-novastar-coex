const _ = require('lodash');
const superagent = require('superagent');


api =  {
	route : function(action, options) {
		//shorthand actions
		// if(action == 'blackout') { action = 'displaymode'; options.value = 1; console.log('yo');}
		// if(action == 'normal')	 { action = 'displaymode'; options.value = 0;  console.log('go');}

	},
	cmd : function(cmd, params) {
		if (cmd) {
			console.log('hit the api !!!!----');
			console.log(cmd);
			console.log(params);
			console.log(config);

			
			// superagent.put(this.baseurl + cmd).set('Content-Type', 'application/json').send(params).then(res => {
			// 	// res.body, res.headers, res.status
			// 	console.log(res.body);

			// }).catch(console.error);

		}
	},
	displaymode : function(options) {

		var cmd;
		var params = {};


		console.log('displaymode');
		console.log(options);
		if(options && options.value !== undefined) {
			cmd = 'device/screen/displaymode';
			params = { 
				value : options.value
			}

			api.cmd(cmd, params);
		}
	},
	brightness : function(options) {

		var cmd;
		var params = {};

		console.log('displaymode');

		if(options && options.brightness !== undefined) {
			cmd = 'device/cabinet/displaymode';
			params = { 
				ratio : options.brightness
			}

			api.cmd(cmd, params);
		}
	},
	input : function(options) {
		var cmd;
		var params = {};

		if(options && options.input !== undefined) {
			cmd = 'device/cabinet/displaymode';
			params = { 
				data : { 
					groupId : options.input
				}
			}

			api.cmd(cmd, params);
		}
	}

}


module.exports = function (self) {
	self.setActionDefinitions({
		sample_action: {
			name: 'Input',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.num)
				console.log(event.options);
			},
		},
		blackout: {
			name: 'Blackout',
			options: [],
			callback: async (event) => {
				console.log('Blackout');
				console.log(event);
				api.displaymode({ value : 1 });
			},
		},
		normal: {
			name: 'Normal',
			options: [],
			callback: async (event) => {
				console.log('Normal');
				console.log(event);
				api.displaymode({ value : 0 });
			},
		},
	})
}
