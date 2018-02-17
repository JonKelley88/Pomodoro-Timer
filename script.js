$(document).ready(function() {
	// globals
	let isRunning = false;
	let startedOnce = false;
	let timePassed = 0;
	let stage = 1;
	let startTime;
	console.log("poop");
	// use the .fa buttons to +/- the corresponding number
	$(".fa").click(function() {
		if (startedOnce === false) {
			if ($(this).hasClass("fa-plus-circle") && $(this).prev().html() < 60) {
				let temp = $(this).prev().html();
				temp++;
				$(this).prev().html(temp);
				$("#timeDisplay").html($("#work").html() + ":00");
			} else if ($(this).hasClass("fa-minus-circle") && $(this).next().html() > 1) {
				let temp = $(this).next().html();
				temp--;
				$(this).next().html(temp);
				$("#timeDisplay").html($("#work").html() + ":00");
			}
		}
	}); // end of .fa.click
	// function to use in the switch case for the break stages
	function breakStage() {
		timePassed = 0;
		$("#timeDisplay").html($("#break").html() + ":00");
		startTime = $("#break").html() * 60;
		$("#timerType").html("Break Time");
		clearInterval(countdown);
	}
	// function to use in the switch case for the work stages
	function workStage() {
		timePassed = 0;
		$("#timeDisplay").html($("#work").html() + ":00");
		startTime = $("#work").html() * 60;
		$("#timerType").html("Work Time");
		clearInterval(countdown);
	}
	$("#start").click(function() {
		// set startTime only once as it changes per switch case after that
		if (startedOnce === false) {
			startTime = $("#work").html() * 60;
		}
		// toggle isRunning when clicked and lock in the user's values once the timer has started
		isRunning = !isRunning;
		startedOnce = true;
		// toggle Start/Pause button text
		if (isRunning === true) {
			$("#start").html("Pause");
		} else if (isRunning === false) {
			$("#start").html("Start");
		}
		// run the countdown while isRunning is true
		const countdown = setInterval(startCountdown, 1000);
		// a separate function to use inside of setInterval
		function startCountdown() {
			// grab the time amount from the time dispay and split into min and sec
			let time = $("#timeDisplay").html(),
				min = Number(time.split(":")[0]),
				sec = Number(time.split(":")[1]);
			// switch case stored in a function to run through the different work/break stages
			function switchStage() {
				switch (stage) {
					case 2:
						$(".pomo:nth-child(1)").css("background-color", "green");
						breakStage();
						countdown = setInterval(startCountdown, 1000);
						break;
					case 3:
						$(".pomo:nth-child(2)").css("background-color", "green");
						workStage();
						countdown = setInterval(startCountdown, 1000);
						break;
					case 4:
						$(".pomo:nth-child(3)").css("background-color", "green");
						breakStage();
						countdown = setInterval(startCountdown, 1000);
						break;
					case 5:
						$(".pomo:nth-child(4)").css("background-color", "green");
						workStage();
						countdown = setInterval(startCountdown, 1000);
						break;
					case 6:
						$(".pomo:nth-child(5)").css("background-color", "green");
						breakStage();
						countdown = setInterval(startCountdown, 1000);
						break;
					case 7:
						$(".pomo:nth-child(6)").css("background-color", "green");
						workStage();
						countdown = setInterval(startCountdown, 1000);
						break;
					case 8:
						$(".pomo:nth-child(7)").css("background-color", "green");
						timePassed = 0;
						$("#timeDisplay").html($("#longBreak").html() + ":00");
						startTime = $("#longBreak").html() * 60;
						$("#timerType").html("Break Time");
						clearInterval(countdown);
						countdown = setInterval(startCountdown, 1000)
						break;
					case 9:
						clearInterval(countdown);
						$(".pomo:nth-child(8)").css("background-color", "green");
				} // end of switch case
			} // end of switchStage function
			if (isRunning === true) {
				if (sec == 00 && min > 0) {
					min--;
					sec = 59;
					timePassed++;
				} else if (sec == 00 && min == 00) {
					stage++;
					switchStage();
				} else {
					sec--;
					timePassed++;
				}
			} else if (isRunning === false) {
				clearInterval(countdown);
			}
			// calculate the progress % and use it to fill the progress bar
			if (isRunning === true) {
				let progressRatio = Number((timePassed * 100 / startTime).toFixed(2)) + "%";
				$("#progressAmount").css("width", progressRatio);
			}
			// prepend a 0 when the sec digit is 9 or lower
			$("#timeDisplay").html(function() {
				if (sec.toString().length === 2) {
					return min + ":" + sec;
				} else {
					return min + ":0" + sec;
				}
			});
		} // end of startCountdown function
	}); // end of #start.click
	$("#reset").click(function() {
		isRunning = false;
		startedOnce = false;
		timePassed = 0;
		$("#start").html("Start");
		$("#work").html(25);
		$("#break").html(5);
		$("#longBreak").html(20);
		$("#timeDisplay").html("25:00");
		$("#progressAmount").css("width", 0);
	}); // end of #reset.click
}); // end of doc.ready
