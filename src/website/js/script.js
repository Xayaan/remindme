var uptime = 0;
var statsPage = true;
var index = 3;

function loadCommands (commands) { // eslint-disable-line no-unused-vars
  document.getElementById('commands').appendChild(document.createElement('br'));
  commands.forEach(command => {
    const card = document.createElement('div');
    card.className = 'card card-1';
    card.style.padding = '16px';
    Object.keys(command).forEach(commandKey => {
      if (Array.isArray(command[commandKey])) {
        card.appendChild(document.createTextNode(`${commandKey}: ${command[commandKey][0]}`));
        card.appendChild(document.createElement('br'));
        card.appendChild(document.createTextNode(command[commandKey][1]));
      } else if (['Usage', 'Example'].includes(commandKey)) {
        const tag = document.createElement('kbd');
        const text = document.createTextNode(command[commandKey]);
        tag.appendChild(text);
        card.appendChild(document.createTextNode(`${commandKey}: `));
        card.appendChild(tag);
      } else {
        card.appendChild(document.createTextNode(`${commandKey}: ${command[commandKey]}`));
      }
      card.appendChild(document.createElement('br'));
    });
    document.getElementById('commands').appendChild(card);
  });

  const soontm = document.createElement('p');
  soontm.appendChild(document.createTextNode('More coming soon.'));
  soontm.style.fontSize = '50px';
  document.getElementById('commands').appendChild(soontm);

  console.log('hey kid you wanna smonk some weeds'); // eslint-disable-line no-console
}

function initStats (uptime, statsPage, index) {
  if (uptime === 0) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        uptime = +xhttp.responseText;
      }
    };
    xhttp.open('GET', '/api/uptime', true);
    xhttp.send();
  }

  setInterval(() => {
    if (statsPage !== true) {
      return;
    }
    if (index === 3) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var stats = JSON.parse(xhttp.responseText);
          var array = Object.keys(stats);
          for (var value in array) {
            document.getElementById(array[value]).innerHTML = stats[array[value]];
          }
        }
      };
      index = 0;
      xhttp.open('GET', '/api/stats', true);
      xhttp.send();
    }
    document.getElementById('uptime').innerHTML = humanizeDuration(uptime.toFixed() * 1000, { conjunction: ' and ', serialComma: false }); // eslint-disable-line no-undef
    uptime++;
    index++;
  }, 1000);
}

function switchNavSelected (state) {
  document.querySelector('li.nav-link.active').className = document.querySelector('li.nav-link.active').className.replace(' active', '');
  document.querySelector(`li.nav-link#${state}`).className += ' active';
  statsPage = state === 'homepagebtn' ? true : false;
}

function enterHomePage () { // eslint-disable-line no-unused-vars
  switchNavSelected('homepagebtn');

  const commandsStyle = document.getElementById('commands').style;
  commandsStyle.opacity = '0';

  setTimeout(() => {
    const headerStyle = document.getElementById('mainheader').style;
    headerStyle.maxHeight = '1000px';
    headerStyle.transform = 'translate(0px, 0px)';

    setTimeout(() => {
      const cardStyle = document.querySelector('div.card.card-1').style;
      cardStyle.display = 'inline-block';
      cardStyle.opacity = '1';
    }, 200);

    commandsStyle.display = 'none';
  }, 800);
}

function enterCommandPage () { // eslint-disable-line no-unused-vars
  switchNavSelected('cmdpagebtn');
  document.getElementById('mainheader').style.transform = 'translate(0px, -715px)';
  document.querySelector('div.card.card-1').style.opacity = '0';
  setTimeout(() => document.getElementById('mainheader').style.maxHeight = '1px', 120);
  setTimeout(() => {
    document.querySelector('div.card.card-1').style.display = 'none';
  }, 800);
  setTimeout(() => {
    document.getElementById('commands').style.display = 'inline';
    document.getElementById('commands').style.opacity = '1';
  }, 1200);
}

initStats(uptime, statsPage, index);

function doBarrelRoll(){document.body.style.msTransform="rotate(360deg)",document.body.style.msTransitionDuration="4s",document.body.style.msTransitionProperty="all",document.body.style.MozTransform="rotate(360deg)",document.body.style.MozTransitionDuration="4s",document.body.style.MozTransitionProperty="all",document.body.style.WebkitTransform="rotate(360deg)",document.body.style.WebkitTransitionDuration="4s",document.body.style.WebkitTransitionProperty="all",document.body.style.OTransform="rotate(360deg)",document.body.style.OTransitionDuration="4s",document.body.style.OTransitionProperty="all",setTimeout("document.body.removeAttribute('style'); roll_on = 0;",4e3)}function startRoll(){roll_on||(roll_on=1,doBarrelRoll())}var Konami=function(t){var e={addEvent:function(t,e,n,o){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&(t["e"+e+n]=n,t[e+n]=function(){t["e"+e+n](window.event,o)},t.attachEvent("on"+e,t[e+n]))},input:"",pattern:"38384040373937396665",load:function(t){this.addEvent(document,"keydown",function(n,o){if(o&&(e=o),e.input+=n?n.keyCode:event.keyCode,e.input.length>e.pattern.length&&(e.input=e.input.substr(e.input.length-e.pattern.length)),e.input==e.pattern)return e.code(t),e.input="",n.preventDefault(),!1},this),this.iphone.load(t)},code:function(t){window.location=t},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:!1,capture:!1,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP"],input:[],code:function(t){e.code(t)},load:function(t){this.orig_keys=this.keys,e.addEvent(document,"touchmove",function(t){if(1==t.touches.length&&1==e.iphone.capture){var n=t.touches[0];e.iphone.stop_x=n.pageX,e.iphone.stop_y=n.pageY,e.iphone.tap=!1,e.iphone.capture=!1}}),e.addEvent(document,"touchend",function(n){if(e.iphone.input.push(e.iphone.check_direction()),e.iphone.input.length>e.iphone.keys.length&&e.iphone.input.shift(),e.iphone.input.length===e.iphone.keys.length){for(var o=!0,i=0;i<e.iphone.keys.length;i++)e.iphone.input[i]!==e.iphone.keys[i]&&(o=!1);o&&e.iphone.code(t)}},!1),e.addEvent(document,"touchstart",function(t){e.iphone.start_x=t.changedTouches[0].pageX,e.iphone.start_y=t.changedTouches[0].pageY,e.iphone.tap=!0,e.iphone.capture=!0})},check_direction:function(){return x_magnitude=Math.abs(this.start_x-this.stop_x),y_magnitude=Math.abs(this.start_y-this.stop_y),x=this.start_x-this.stop_x<0?"RIGHT":"LEFT",y=this.start_y-this.stop_y<0?"DOWN":"UP",result=x_magnitude>y_magnitude?x:y,result=1==this.tap?"TAP":result,result}}};return"string"==typeof t&&e.load(t),"function"==typeof t&&(e.code=t,e.load()),e},roll_on=0,x=Konami(startRoll); // eslint-disable-line