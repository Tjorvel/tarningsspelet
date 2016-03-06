function ajaxRequest(url, callback) {

var XHR = null;
if (window.XMLHttpRequest) 
{
        XHR = new XMLHttpRequest();
} else 
{
    XHR = new ActiveXObject("Microsoft.XMLHTTP"); 
}
XHR.onreadystatechange = function () 
{
    if (XHR.readyState == 4 || XHR.readyState == "complete") 
    {
        if (XHR.status == 200) 
       	{
                callback(XHR); 
       	}
       	else 
        {
        	alert("fel på servern");
        }
            
    }
}
XHR.open("GET", url, true);
XHR.send(null);
}


window.onload = function()
{
	var kasta = document.getElementById('btnKasta');
	regEvent(kasta, 'click', getDice);
	var logg = document.getElementById('btn_logg');
	regEvent(logg, 'click', login);
	var reg = document.getElementById('btn_Reg');
	regEvent(reg, 'click', register);
		
}



	var score = document.getElementById('score');
	var hightscore = 0;
	var points = 0;
	var numberOfThrow = 0; 
	var dice1 = 0;
	var dice2 = 0;
	var dice3 = 0;
	var dice4 = 0;
	var session = null;
	var name = null;
	var ename = null;
	var email = null;




	function getDice()
	{
	 	if(numberOfThrow== 0)
	 	{
	 		points = 0;
	 	}

		var guess = document.getElementById('guess').value;

		if(guess == "")
		{

			alert("Du måste fylla i ett heltal mellan 3-18 innan du kastar");
		
		}
		else if(guess < 3 || guess > 18)
		{

			alert("Orimlig gissning, Du måste fylla i ett heltal mellan 3-18")
		}
		else 
		{
			numberOfThrow++;

			dice1 = Math.floor(Math.random() * 6 + 1);
			document.getElementById("t1").innerHTML = "<img src=" + dice1 + ".png>";
			dice2 = Math.floor(Math.random() * 6 + 1);
			document.getElementById("t2").innerHTML = "<img src=" + dice2 + ".png>";
			dice3 = Math.floor(Math.random() * 6 + 1);
			document.getElementById("t3").innerHTML = "<img src=" + dice3 + ".png>";
			dice4 = Math.floor(Math.random() * 6 + 1);
			document.getElementById("t4").innerHTML = "<img src=" + dice4 + ".png>";

			var tot = dice1 + dice2 + dice3;
			document.getElementById("score").innerHTML = tot;


		}

		if(guess == tot)
		{

			points = points + (tot * dice4);

			alert("Grattis du gissade rätt, du har nu " + points + " poäng");

		}
		else if (numberOfThrow == 10)
		{
			alert("Du har kastat 10 gånger, nollställ för att spela igen! Du fick " + points + " poäng!");
		}


	}

	function reset()
	{
		dice1 = 0;
		dice2 = 0;
		dice3 = 0;
		dice4 = 0;
		numberOfThrow = 0;
		points = 0;
		
		document.getElementById("spelform").reset();
		document.getElementById("t1").innerHTML = "";
		document.getElementById("t2").innerHTML = "";
		document.getElementById("t3").innerHTML = "";
		document.getElementById("t4").innerHTML = "";
		document.getElementById("score").innerHTML = "";
		
		
		
		
	
	}

	function register() 
	{
		var Email = document.getElementById('reg_email');
		var password = document.getElementById('reg_pw');
		var	firstName = document.getElementById('reg_name');
		var lastName = document.getElementById('reg_ename');
		var servermessage = null;

		ajaxRequest('http://edunet.cust.bluerange.se/dice/user/create.aspx?email='+Email.value+'&pwd='+password.value+'&firstname='+firstName.value+'&lastname='+lastName.value, function(XHR)
		{
   			servermessage = JSON.parse(XHR.responseText); 
      
     
    		if(servermessage.status == 400)
    		{
     			name = servermessage.firstName;
     			ename = servermessage.lastName;
     			email = servermessage.email;
     			session = servermessage.session;
     			alert("You have registered your self.");
    		}
    		else if(servermessage.status ==200)
		    {
		     	alert("Something went wrong.");
		    }   
		});
	}

	function login() 
	{
		var Email=document.getElementById('in_email');
		var password=document.getElementById('in_pw');
		var servermessage=null;


		ajaxRequest('http://edunet.cust.bluerange.se/dice/user/login.aspx?email='+Email.value+'&pwd='+password.value, function(XHR)
		{
   			servermessage = JSON.parse(XHR.responseText); 
      
     
    		if(servermessage.status== 400)
    		{
     			name = servermessage.firstName;
     			ename = servermessage.lastName;
     			email = servermessage.email;
     			session = servermessage.session;
     			alert("You are logged in as " + servermessage.user.firstName + " " + servermessage.user.lastName);
    		}
    		else
		    {
		     	alert("Wrong email/password");
		    }   
		});
	}






	var regEvent=(function(){
	var elem=document.createElement('div');
	if(elem.addEventListener){
		return function(elem, eventName, fn){
			elem.addEventListener(eventName, fn, false);
		}
	}
	else if(elem.attachEvent){
		return function(elem, eventName, fn){
			elem.attachEvent('on'+eventName, fn);
		}
	}

	})();








