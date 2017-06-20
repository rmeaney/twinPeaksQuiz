

//Global variables for timer
			var mainNumber = 20;
    		var myInterval;
    		var outOfTime =false;

    		//load audio
    			var introMusic = new Audio();
				introMusic.src = "assets/audio/intro.mp3";

				var victoryMusic = new Audio();
				victoryMusic.src = "assets/audio/victory.mp3";

				var defeatMusic = new Audio();
				defeatMusic.src = "assets/audio/defeat.mp3";

				var hoverSound = new Audio();
				hoverSound.src = "assets/audio/hoverSound.mp3";

				var correctSound = new Audio();
				correctSound.src = "assets/audio/correctChoice.mp3";

				var wrongSound = new Audio();
				wrongSound.src = "assets/audio/wrongChoice.mp3";

		$(document).ready(function(){
			
			//title Screen animations
				setTimeout(titleGraphicOp, 1000 * 1.5);
				setTimeout(triviaGraphicOp, 1000 * 2.5);
				setTimeout(startTextOp, 1000 * 3.5);
				setTimeout(buttonNewGameOp, 1000 * 4.5);


				function titleGraphicOp() {
				 $("#titleGraphic").animate({opacity: 1});
				}
				function triviaGraphicOp() {
					$("#triviaGraphic").animate({opacity: 1});
				}
				function startTextOp(){
					$(".startGameText").animate({opacity: 1});
				}
				function buttonNewGameOp(){
					$("#btnNewGame").animate({opacity: 1});
				}

    		//variables for lists
			var questionList = [{
				question: "What cryptic message about 'good news' does The Arm tell Cooper, when he first enters the Black Lodge",
					a: "One day my log will have something to say about this.",
					b: "It is happening, again.",
					c: "That Gum you like is going to come back in style.",
					d: "Sometimes my arms bend back.",
					correct: "C",
				},
				{question: "Leland Palmer says that Bob was acting menacingly toward him when he was younger. What was Bob doing?",
					a: "Glaring while flicking a nickel.",
					b: "Flicking matches at him.",
					c: "Picking his own teeth with a knife, while grinning.",
					d: "Making threatening gestures, with a noose.",
					correct: "B",
				},{question: "What animals 'not what they seem'?",
					a: "Wolves",
					b: "Eagles",
					c: "Hawkes",
					d: "Owls",
					correct: "D",

				},{question: "Who killed Laura Palmer?",
					a: "Lucy",
					b: "Hawke",
					c: "The Log Lady",
					d: "None of these people. Why would you even ask this?",
					correct: "D",

				},{question: "What letter did Cooper find under Laura's fingernail?",
					a: "R",
					b: "O",
					c: "B",
					d: "T",
					correct: "A",

				},{question: "Where is the entrance to the Black Lodge?",
					a: "In the Hotel.",
					b: "Under Mike's Truck.",
					c: "Ghostwood Forest.",
					d: "Beyond the Boiler Room in the HighSchool.",
					correct: "C",

				},{question: "While conducting their own investigation, Donna and James find a second diary belonging to Laura. Where did they find it?",
					a: "In the desk of Ben Horne",
					b: "Buried by Bobby at Leo's house.",
					c: "With Harold, the shut in.",
					d: "In Andy's Car.",
					correct: "C",

				},{question:"While being persued, James tried to hide his half of the heart locket, but it was taken by a shadowy figure. Who took the locket?",
					a: "Dr. Jacoby",
					b: "Audrey Horne",
					c: "Bobby",
					d: "Nadine",
					correct: "A"

				},{question:"Who do the Horne brothers reminisce about, dancing with a flashlight?",
					a:"Catharine Martell",
					b:"Louise Dombrowski",
					c:"Josie Packard",
					d:"Norma Jennings",
					correct: "B",
				},{question:"Cooper and Sheriff Truman are about to drink a cup of coffee before Pete Martell stops them. What was his reason?",
					a: "It was weeks old.",
					b: "There was a fish in the percolator.",
					c:"He was using the pot as a planter",
					d: "It contained a hidden message from The Giant.",
					correct: "B",


				}];
				var masterNumber;
				introMusic.play();
				
			
			function chooseQuestion(){
			 masterNumber = [Math.floor(Math.random() * questionList.length)];
				console.log(questionList[masterNumber]);

			}
			

			var correctAnswers = "C";

			var questionAsked =0;
			var right = 0;
			var wrong = 0;
			var questionsRemaining = questionList.length;
		

			$('#btnNewGame').click(function(){
				$('#titleGraphic').remove();
				$('#triviaGraphic').remove();
				$('.startGameText').remove();
				$('#btnNewGame').remove();

				questionsRemaining =questionList.length;
				generateQuestion();
			});

			


			
			function generateQuestion(){
				chooseQuestion();
				questionAsked++;
				questionsRemaining--;
				console.log(questionsRemaining);
				$('#contentBox').append('<p class ="questionText">' + "Question " + questionAsked + ")"+ '</p>');
				$('#contentBox').append('<p class ="questionText" id ="questionTimer">' + "remaining" + '</p>')
				$('#contentBox').append('<p class ="questionText">' + questionList[masterNumber].question + '</p>');
				
				$('#contentBox').append('<p class ="questionChoice" id ="answerChoiceA" value = "A">' + "A) " + questionList[masterNumber].a + '</p>');
				$('#contentBox').append('<p class ="questionChoice" id ="answerChoiceB" value = "B">' + "B) " + questionList[masterNumber].b + '</p>');
				$('#contentBox').append('<p class ="questionChoice" id ="answerChoiceC" value = "C">' + "C) " + questionList[masterNumber].c + '</p>');
				$('#contentBox').append('<p class ="questionChoice" id ="answerChoiceD" value = "D">' + "D) " + questionList[masterNumber].d + '</p>');
				mainNumber=20;
				runTimer();
				$('body').css({'background':'url("assets/images/redRoom.jpg")no-repeat center left fixed','background-repeat':'no-repeat','background-size':'100% 100%'});
			};
			function resultCorrect(){
				correctSound.play();
				$('.questionChoice').remove();
				$('.questionText').remove();
				stopTimer();
				questionList.splice($.inArray(questionList[masterNumber], questionList),1);
				$('#contentBox').append('<p class = "resultText">CORRECT!</p>');
				if(questionList.length > 0){
				$('#contentBox').append('<p class = "resultText">' + 'You have gotten ' + right + " correct, "  + "and " + wrong + " incorrect." + '</p>');
				$('#contentBox').append('<button id = "nextQuestionBTN">Next Question</button>');
				}else{
					endGameConditions();

				}

				
			}
			function resultIncorrect(){
				wrongSound.play();
				$('.questionChoice').remove();
				$('.questionText').remove();
				stopTimer();
				questionList.splice($.inArray(questionList[masterNumber], questionList),1);
				$('#contentBox').append('<p class = "resultText">Sorry, that is not correct!</p>');
				if(questionList.length > 0){
				$('#contentBox').append('<p class = "resultText">' + 'You have gotten ' + right + " correct, "  + "and " + wrong + " incorrect." + '</p>');
				$('#contentBox').append('<button id = "nextQuestionBTN">Next Question</p>');
				}else{
					endGameConditions();
				}
				
			}

			function timeOut(){
				wrongSound.play();
				$('.questionChoice').remove();
				$('.questionText').remove();
				stopTimer();
				wrong++;
				questionList.splice($.inArray(questionList[masterNumber], questionList),1);
				$('#contentBox').append('<p class = "resultText">Sorry, You ran out of time!</p>');
				if(questionList.length > 0){
				$('#contentBox').append('<p class = "resultText">' + 'You have gotten ' + right + " correct, "  + "and " + wrong + " incorrect." + '</p>');
				$('#contentBox').append('<button id = "nextQuestionBTN">Next Question</p>');
				}else{
					endGameConditions();
				}
				
			}

			$('#contentBox').on("click",'#nextQuestionBTN',function(){
				$(this).remove();
				$('.resultText').remove();
				generateQuestion();
			});

			$('#contentBox').on("mouseover",'.questionChoice', function(){
			
				hoverSound.play();
				$(this).addClass('choiceHoverClass');

			});
			$('#contentBox').on("mouseout",'.questionChoice', function(){
			
				$('.questionChoice').removeClass('choiceHoverClass');
			});
			
			$('#contentBox').on("click",'.questionChoice', function(){
				var selectedAnswer = $(this).attr('value');
				console.log(selectedAnswer);
				if(selectedAnswer === questionList[masterNumber].correct){
					console.log('correct');
					right++;
					resultCorrect();
				}else if(outOfTime){
					timeOut();
				}
				else{
					console.log('wrong');
					wrong++;
					resultIncorrect();
				}
			});

$('#contentBox').on("click", "#btnStartOver",function(){
				console.log('hey you pressed me!')
				$('.resultText').remove();
				$('.resultHeader').remove();
				$('.victoryText').remove();
				$('.victoryHeader').remove();
				$(this).remove();
				questionList = [{
				question: "What cryptic message about 'good news' does The Arm tell Cooper, when he first enters the Black Lodge",
					a: "One day my log will have something to say about this.",
					b: "It is happening, again.",
					c: "That Gum you like is going to come back in style.",
					d: "Sometimes my arms bend back.",
					correct: "C",
				},
				{question: "Leland Palmer says that Bob was acting menacingly toward him when he was younger. What was Bob doing?",
					a: "Glaring while flicking a nickel.",
					b: "Flicking matches at him.",
					c: "Picking his own teeth with a knife, while grinning.",
					d: "Making threatening gestures, with a noose.",
					correct: "B",
				},{question: "What animals 'not what they seem'?",
					a: "Wolves",
					b: "Eagles",
					c: "Hawkes",
					d: "Owls",
					correct: "D",

				},{question: "Who killed Laura Palmer?",
					a: "Lucy",
					b: "Hawke",
					c: "The Log Lady",
					d: "None of these people. Why would you even ask this?",
					correct: "D",

				},{question: "What letter did Cooper find under Laura's fingernail?",
					a: "R",
					b: "O",
					c: "B",
					d: "T",
					correct: "A",

				},{question: "Where is the entrance to the Black Lodge?",
					a: "In the Hotel.",
					b: "Under Mike's Truck.",
					c: "Ghostwood Forest.",
					d: "Beyond the Boiler Room in the HighSchool.",
					correct: "C",

				},{question: "While conducting their own investigation, Donna and James find a second diary belonging to Laura. Where did they find it?",
					a: "In the desk of Ben Horne",
					b: "Buried by Bobby at Leo's house.",
					c: "With Harold, the shut in.",
					d: "In Andy's Car.",
					correct: "C",

				},{question:"While being persued, James tried to hide his half of the heart locket, but it was taken by a shadowy figure. Who took the locket?",
					a: "Dr. Jacoby",
					b: "Audrey Horne",
					c: "Bobby",
					d: "Nadine",
					correct: "A"

				},{question:"Who do the Horne brothers reminisce about, dancing with a flashlight?",
					a:"Catharine Martell",
					b:"Louise Dombrowski",
					c:"Josie Packard",
					d:"Norma Jennings",
					correct: "B",
				},{question:"Cooper and Sheriff Truman are about to drink a cup of coffee before Pete Martell stops them. What was his reason?",
					a: "It was weeks old.",
					b: "There was a fish in the percolator.",
					c:"He was using the pot as a planter",
					d: "It contained a hidden message from The Giant.",
					correct: "B",


				}];
				questionAsked=0;
				right=0;
				wrong=0;
				questionsRemaining =questionList.length;

				generateQuestion();
				victoryMusic.stop();
				defeatMusic.stop();
			});
			
		function endGameConditions(){
			if(right > wrong){
				$('#contentBox').append('<p class = "victoryHeader"> Congratulations, you have won! </p>');
					$('#contentBox').append('<p class ="victoryText">' + "You got " + right + " correct, and " + wrong + " wrong"+'<p>');
					$('#contentBox').append('<p class ="victoryText">Great Job! Click Below to try again</p>');

					$('#contentBox').append('<button id = "btnStartOver">New Game</button>')
					$('body').css({'background':'url("assets/images/victoryScreen.jpg")no-repeat center left fixed','background-repeat':'no-repeat','background-size':'100% 100%'});
					victoryMusic.play();

				}else{
					$('#contentBox').append('<p class = "resultHeader"> You have failed. </p>');
					$('#contentBox').append('<p class ="resultText">' + "You got " + right + " correct, and " + wrong + " wrong"+'<p>');
					$('#contentBox').append('<p class ="resultText">Click Below to try again</p>');


					$('#contentBox').append('<button id = "btnStartOver">New Game</button>')
					$('body').css({'background':'url("assets/images/creditsBackDropBlurred.jpg")no-repeat center left fixed','background-repeat':'no-repeat','background-size':'100% 100%'});
					defeatMusic.play();
				}
		}

//main code for timer
		function runTimer(){
        myInterval = setInterval (myDecrement, 1000);
      }
      function myDecrement(){
        mainNumber--;
        $('#questionTimer').html(mainNumber)
        if(mainNumber === 0){
        stopTimer();
        outOfTime=true;
        timeOut();
        console.log(outOfTime);

        }
      }

      
      
       $("#stopNew").on("click", stopTimer);
      function stopTimer(){
        clearInterval(myInterval);
        //alert('bam! no more timer!');
      }
		});


