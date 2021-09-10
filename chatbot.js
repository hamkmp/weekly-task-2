let curState = 0;
var name;
let joke = false;

Bot.send("Hello there. What is your name?");

async function respond(inputText) {
	if (curState === 0) {
		name = CampK12.getProperNouns(inputText);
		if (name !== "") {
			Bot.send("Nice to meet you " + name + ", how are you doing today?");
			curState++;
		}
		else {
			Bot.send("Sorry I did not quite catch that, can you tell me your name again?");
		}
	}
	else if (curState == 1) {
		let sentimentScore = await CampK12.getSentimentScore(inputText);
		if (sentimentScore > 0) {
			Bot.send("I am glad to hear that");
		} else if (sentimentScore <= 0) {
			Bot.send("I am sorry to hear that");
		}
		Bot.send("What are you doing today " + name + "?");
		curState++;
	}
	else if (curState == 2) {
		let activity = CampK12.getVerbs(inputText);
		if (activity != "") {
			Bot.send("I also enjoy " + activity);
		}
		Bot.send("Do you want to hear a joke?");
		curState++;
	}
	else if (curState == 3) {
		if ((inputText === "yes") || (inputText === "Yes")){
			Bot.send("Knock knock . . .");
			curState = 1337;
		}
		else if (inputText == "no"){
			Bot.send("Okay then . . .");
			curState++;
		}
	}
	else if (curState == 4){
		Bot.send("I'm outta here, I'm taking my comedic mastermind somewhere else.");
		curState = 6;
	}
	else if (curState == 5){
		Bot.send("Aight " + name + " I gotta blast, see ya around");
		curState = 6;
	}
	else if (curState == 6){
		Bot.send("Stop talking to me and go do something productive instead.");
	}
	else if (curState == 1337){
		if (inputText == "whos there?" || 
		inputText == "who's there?" || 
		inputText == "who is there?"){
			Bot.send("Cow's go");
			curState++;
		}
		else{
			Bot.send("This is the part where you say \"who's there?\" . . .");
			Bot.send("Knock knock . . .");
			curState = 1337;
		}
	}
	else if (curState == 1338){
		if (inputText == "cows go who?" ||
		inputText == "cow's go who?" ||
		inputText == "Cows go who?" ||
		inputText == "Cow's go who?"){
			Bot.send("No, cows go moo!")
			curState++;
		}
		else{
			Bot.send("You're supposed to say \"cow's go who?\" . . .");
		}
	}
	else if (curState == 1339){
		Bot.send("I am sorry for that one . . .");
		curState = 5;
	}
}
