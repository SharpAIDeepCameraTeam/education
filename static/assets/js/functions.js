// openUrl function
function openUrl(url) {
  location.href = 'https://' + url;
}

function send(url) {
  location.href = window.location.origin + url;
}

var leaveConf = localStorage.getItem("leaveConfirmation");

if (leaveConf === 'enabled') {
  window.onbeforeunload = function() {
      return '';
  }

  function conf2() {
      return '';
  }

  conf2();
}

var submenuOpen = false;
var submenu2Open = false;

function toggleSubmenu(event) {
  var submenu = document.querySelector('.context-submenu');
  var submenuParent = document.querySelector('.with-submenu');

  if (submenuOpen) {
      submenu.style.display = 'none';
      submenuParent.classList.remove('open');
  } else {
      submenu.style.display = 'block';
      submenu.style.top = submenuParent.offsetTop + "px";
      submenu.style.left = (submenuParent.offsetLeft + submenuParent.offsetWidth) + "px";
      submenuParent.classList.add('open');
      event.stopPropagation(); // Prevent the click event from closing the right-click menu
  }

  submenuOpen = !submenuOpen;
}

function handleSubmenuClick() {
  // Perform action when submenu option is clicked
  alert("hi");
  hideSubmenu();
}

function toggleSubmenu2(event) {
  var submenu2 = document.querySelectorAll('.context-submenu')[1];
  var submenuParent2 = document.querySelectorAll('.with-submenu')[1];

  if (submenu2Open) {
      submenu2.style.display = 'none';
      submenuParent2.classList.remove('open');
  } else {
      submenu2.style.display = 'block';
      submenu2.style.top = submenuParent2.offsetTop + "px";
      submenu2.style.left = (submenuParent2.offsetLeft + submenuParent2.offsetWidth) + "px";
      submenuParent2.classList.add('open');
      event.stopPropagation(); // Prevent the click event from closing the right-click menu
  }

  submenu2Open = !submenu2Open;
}

function tabCloak() {
  var newTitle = localStorage.getItem('tabTitle') || 'Educational Resources';
  var iconClass = localStorage.getItem('tabIcon') || 'bi-book';

  // Update title
  document.title = newTitle;

  // Update favicon with an icon element
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
  }

  // Create a temporary canvas to draw the icon
  var canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  var ctx = canvas.getContext('2d');

  // Draw icon background
  ctx.fillStyle = '#0066cc';
  ctx.fillRect(0, 0, 32, 32);

  // Draw icon text
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px bootstrap-icons';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String.fromCharCode(parseInt('F116', 16)), 16, 16);

  // Convert canvas to favicon
  link.href = canvas.toDataURL('image/png');
}

function disableTabCloak() {
  document.title = 'Educational Resources';
  localStorage.setItem('tabTitle', 'Educational Resources');
  localStorage.setItem('tabIcon', 'bi-book');
  tabCloak();
}

function visitLastSite() {
  location.href = '/~';
}

function handleSubmenuClick2() {
  // useless for testing
  alert("hi2");
  hideSubmenu2();
}

function doSomething() {
  // Perform action for context menu option
  console.log("deez nuts");
}

function showContextMenu(event) {
  event.preventDefault();
  var contextMenu = document.getElementById("contextMenu");
  contextMenu.style.left = event.clientX + "px";
  contextMenu.style.top = event.clientY + "px";
  contextMenu.style.display = "block";
}

function hideContextMenu() {
  var contextMenu = document.getElementById("contextMenu");
  contextMenu.style.display = "none";
  hideSubmenu();
  hideSubmenu2();
}

function hideSubmenu() {
  var submenu = document.querySelector('.context-submenu');
  submenu.style.display = 'none';
  submenuOpen = false;
}

function hideSubmenu2() {
  var submenu2 = document.querySelectorAll('.context-submenu')[1];
  submenu2.style.display = 'none';
  submenu2Open = false;
}

function openSettings() {
  send('/settings');
}

function send(url) {
  window.location.href = url;
}

function youtube() {
  let URL = 'https://www.youtube.com/';
  let urlToInject = window.location.origin + __uv$config.prefix + __uv$config.encodeUrl(URL);
  const newWindow = window.open();
  const iframe = newWindow.document.createElement('iframe');
  newWindow.document.body.style.margin = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.zIndex = '99999';
  iframe.style.border = 'none';
  newWindow.document.body.style.overflow = 'hidden';
  newWindow.document.body.appendChild(iframe);
  iframe.src = urlToInject;
}

function vSite() {
  var checkHistory = localStorage.getItem('encodedUrl');
  if (checkHistory !== null) {
      location.href = '/student';
  } else {
      alert('Could not find a previously proxified site, visit a site first!');
  }
}

function vAG() {
  var checkHistory = localStorage.getItem('agUrl');
  if (checkHistory !== null) {
      location.href = '/lessons';
  } else {
      alert('Could not find a previously visited app/game, visit one first!')
  }
}

if (window.location.protocol === "http:") {
  window.location.href = window.location.href.replace("http:", "https:");
}

console.log("%cJoin our Discord! discord.gg/unblocking", "color: cyan; font-size: 20px");

// Add event listeners to show/hide the context menu
document.addEventListener("contextmenu", showContextMenu);
document.addEventListener("click", hideContextMenu);

// Add event listener to hide the context menu and submenu when clicking outside of them
document.addEventListener("click", function(event) {
  var contextMenu = document.getElementById("contextMenu");
  var submenu = document.querySelector('.context-submenu');

  if (!contextMenu.contains(event.target)) {
      hideContextMenu();
  } else if (!submenu.contains(event.target)) {
      hideSubmenu();
  }
});