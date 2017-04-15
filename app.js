
var inquirer = require('inquirer');
fs = require('fs');

function BasicCard(front, back){
	this.front = front;
	this.back = back;
}



function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	
}

ClozeCard.prototype.partial = function () {

	if(this.text.includes(this.cloze)){
		return this.text.replace(this.cloze, '...');
}
else{
	return "Sorry, value does not exist";
	}
};


inquirer.prompt({
	type: 'list',
	name: 'cards',
	message: 'Choose your card',
	choices: ['BasicCard', 'ClozeCard']
	}).then.function (data) 
		if(data.cards === 'BasicCard'){
			return inquirer.prompt([
		{
			type: 'input',
			name: 'front',
			message: 'Enter message for the front'
		},  {
			type: 'input',
			name: 'back',
			message: 'Enter message for the back'
			}
		]);
}
else{
	return inquirer.prompt([
	{
	type: 'input',
	name: 'text',
	message: 'Enter text message for the front'
}, {
	type: 'input',
	name: 'cloze',
	message: 'Enter deletion message'
			}
		]);
	
}

}.then(function (data){

	if(data.front){
		var basic = new BasicCard(data.front, data.back);
		addCards({data: basic});

	}
	

	else{
		var firstPresident = new ClozeCard(data.text, data.cloze);
		addCards({data: firstPresident, partial: firstPresident.partial()});
			}

	})
	.catch(function (err) {
	console.log(err);
	})



	 var addCards = function (add) {
		fs.readFile('./data.json', 'utf8', function (error, data)) {
			if(error) throw error;

			var arr = JSON.parse(data);

			arr.cards.push(add);

			fs.writeFile('./data.json', JSON.stringify(arr), 'utf8', function (err) {
				if(err) throw err;
				console.log("Process Complete");
		});
	});
};




		

