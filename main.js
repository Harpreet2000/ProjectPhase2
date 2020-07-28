document.getElementById('addTask').onclick=checkInput;
document.getElementById('showMyLocation').onclick=showLocation;

// onclick of add button this method is called
function checkInput()
{
	// getting taskname value
	var taskName=document.getElementById('nameField');
	
	// check if the value not null
	if(taskName.value === "")
	{
		alert("Add a Task Name");
	}
	else
	{
		// if the value is not null create a task
		createTask(taskName.value);
	}
}

function createTask(name)
{
	// defining elements needed
    var divTag = document.createElement('div');
	var pTag = document.createElement('p');
	var input = document.createElement('input');
	var btn = document.createElement('button');
	
	// setting element attributes
	divTag.setAttribute('class','taskClass');
	input.setAttribute('type', 'checkbox');
	pTag.textContent = name;
	pTag.style.display = 'inline';
	btn.textContent = 'x';
	
	// adding to the task div
	divTag.appendChild(pTag);
	divTag.appendChild(input);
	divTag.appendChild(btn);
	
	// adding events on button
	input.onclick = complete;
	btn.onclick = deleteT;
	// adding task to list
	document.getElementById('tasks').prepend(divTag);
}


function complete(event){
	// getting text
    var selectedText = event.target.previousElementSibling;
	// creating decoration of line-through
    selectedText.style.textDecoration = 'line-through';
	// Updating color of the text
    selectedText.style.color = 'black';
	// updating task border colors
	event.target.parentNode.style.border = '1px solid Red';
	// adding unclickable checkbox attribute
	event.target.setAttribute('disabled',true);
	// current task is added at last of the list
    document.getElementById('tasks').appendChild(event.target.parentNode);
}


function deleteT(event){
	// get selected task button
	var selectedButton = event.target;
	// check if the task has been completed yet or not
	if(selectedButton.previousElementSibling.checked == false)
	{
		// ask for user confirmation to delete uncompleted task
		var cnf = confirm("You have not completed this task yet, want to delete it ? ");
		if (cnf)
		{
			// removing current div from main div of tasks
			event.target.parentNode.parentNode.removeChild(event.target.parentNode);
		}
	}
		else{
				event.target.parentNode.parentNode.removeChild(event.target.parentNode);
		}
}

// using this funciton used 2 api's

// Google Map API
// Geolocation API
function showLocation() {
	// Geolocation API Check availabilty in browser
	if(!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
  } else {
	  // get position and initialize map and open map
    navigator.geolocation.getCurrentPosition((position) => {
		// mapProperties settinf
		var mapProperties = {
		center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		// map view div
		var mapdiv = document.getElementById('maps');
		// creating map
		var map = new google.maps.Map(mapdiv,mapProperties);
		// settingg values in open map link
		var openmap = document.getElementById('openmap');
		openmap.href = "https://www.openstreetmap.org/#map=18/"+position.coords.latitude+"/"+position.coords.longitude+"/";
		openmap.textContent="View ON OpenMap";
	});
  }

}