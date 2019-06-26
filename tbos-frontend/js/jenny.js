// our dummy birds
var numTotal = 0;
var gameplayZ = 1;
var birds = [
  {
  "taskName": "Study for reading quiz",
  "xPosition": 2,
  "yPosition": 15,
  "priorityLevel": 1
  },
  {
  "taskName": "Track & field practice",
  "xPosition": 20,
  "yPosition": 5,
  "priorityLevel": 2
  },
  {
  "taskName": "Video proposal for Mr. Brower",
  "xPosition": 40,
  "yPosition": 10,
  "priorityLevel": 3
  },
  {
  "taskName": "Math HW",
  "xPosition": 60,
  "yPosition": 20,
  "priorityLevel": 4
  },
  {
  "taskName": "Study for math test",
  "xPosition": 75,
  "yPosition": 0,
  "priorityLevel": 5
  },
  {
  "taskName": "Reading goal (15 pages)",
  "xPosition": 2,
  "yPosition": 50,
  "priorityLevel": 6
  },
  {
  "taskName": "Art club poster",
  "xPosition": 20,
  "yPosition": 40,
  "priorityLevel": 7
  },
  {
  "taskName": "Clean room",
  "xPosition": 40,
  "yPosition": 45,
  "priorityLevel": 8
  },
  {
  "taskName": "Gift for Mother's Day",
  "xPosition": 60,
  "yPosition": 60,
  "priorityLevel": 9
  },
  {
  "taskName": "Buy new jacket",
  "xPosition": 75,
  "yPosition": 40,
  "priorityLevel": 10
  }
];

// defining positions "randomly"... I decided not to use this and just gave each task a fixed x and y position. This is where Sushant's placement logic should go. Must keep contents within the container, #game.
function initializingBird(birdStone) {
  // xPosition and yPosition are percentages.
  numTotal++; // this will be useful for checklist view.
}

function addSingleBird(birdStone) {
  var birdImg = Math.floor(Math.random() * Math.floor(6))+1;
  var bird = "<div class='bird-stone' style='top:"+birdStone.yPosition+"%;left:"+birdStone.xPosition+"%;'><div class='bird' style='background-image:url(img/single-bird-"+birdImg+".png)'></div><div class='stone'><div class='taskName'>"+birdStone.taskName+"</div></div></div>";
  $('#game').append(bird);
}

function addSingleTask(birdStone) {
  var task = "<label class='list-item'><input class='checkbox' type='checkbox'><span class='itemName'>"+birdStone.taskName+"</span></label>";
  $('#allTasks').append(task);
}

function listViewActions () {
  if ($('#allTasks :checkbox:checked').length > 0) {
    $('#listActions').show();
    $('#addTask').hide();
  } else {
    $('#listActions').hide();
    $('#addTask').show();
  }
}

function collided(message) {
  console.log(message);
}

function flip() {
  if ($('#game').css('display') == 'block') {
    console.log('should hide game');
    $('#game').css('display', 'none');
    $('#list').css('display', 'block');
    $('#flip').css('backgroundImage', 'url(img/flip-birds.png)');
  } else if ($('#list').css('display') == 'block') {
    console.log('should hide list');
    $('#list').css('display', 'none');
    $('#game').css('display', 'block');
    $('#flip').css('backgroundImage', 'url(img/flip-list.png)');
  }
}

// creating things
$(document).ready(function() {

  birds.forEach(function(birdStone) {
    initializingBird(birdStone);
    addSingleBird(birdStone);
    addSingleTask(birdStone);
  });

  // mobile flip between List and Game
  $('#flip').on('click', function() {
    console.log('flip');
    flip();
  });

  // List View
  $('#allTasks').sortable({ revert: 'true' });
  $('.list-item').draggable({
    connectToSortable: '#allTasks'
  });

  $('.list-item').on('change', function() {
    listViewActions();
  });

  // Gameplay
  $('.bird-stone').draggable({ containment: "parent" });

   var startTime, endTime;
  $('.bird-stone').mousedown(function() {
    startTime = new Date().getTime();

    $(this).addClass('current');
    $(this).css('z-index', ++gameplayZ);

    // to categorize with other birds
    $(this).siblings().droppable({
      accept: this,
      tolerance: 'intersect',
      hoverClass: "highlight",
      drop: function(event, ui) {
        // this is the collision detection, when you drop a task into another. here is where you prompt with categorizing options.
        // console.log(ui.position);
        $(ui.draggable).hide();
        alert('combined');
      }
    });

    // trash a task
    $('#trash').droppable({
      tolerance: 'touch',
      over: function(event, ui) {
        $(this).addClass('teased');
      },
      out: function(event, ui) {
        $(this).removeClass('teased');
      },
      drop: function(event, ui) {
        $(ui.draggable).hide();
        alert('trashed');
      }
    });

    // complete a task
    $('#checkmark').droppable({
      tolerance: 'touch',
      over: function(event, ui) {
        $(this).addClass('teased');
      },
      out: function(event, ui) {
        $(this).removeClass('teased');
      },
      drop: function(event, ui) {
        $(ui.draggable).hide();
        alert('completed');
      }
    });

    }).mouseup(function() {
      endTime = new Date().getTime();

      $(this).removeClass('current');

      if (endTime - startTime < 200) {
        // if you didn't drop on an object and the mousedown was quick (a click), open category or prompt maintenance options
        alert('options');
      } else {
        // if you didn't release on an object and the mousedown lasted a while, leave it alone
      }

      $(this).css('z-index', gameplayZ);
    });
});
