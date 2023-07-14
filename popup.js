document.addEventListener("DOMContentLoaded", function() {
  const countdownElement = document.getElementById("countdown");

    const targetDate = new Date("2023-09-24T00:00:00");
  
    setInterval(updateCountdown, 1000);
  
    function updateCountdown() {
      const now = new Date();
      const timeDifference = targetDate - now;
  
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
        countdownElement.textContent = `${days} Days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      } else {
        countdownElement.textContent = "Countdown completed!";
      }
    }
  });
  

  // console.log('this is the html');

  // console.log(browser)

  // to save the tab 

  document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveTab);
  
    var deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', deleteAllTabs);
  });
  
  function saveTab() {
    browser.tabs.query({ currentWindow: true, active: true }).then(function(tabs) {
      var tab = tabs[0];
      var tabLink = tab.url;
      var tabTitle = tab.title;
      retrieveSavedTabs(function(savedTabs) {
        savedTabs.push({ url: tabLink, title: tabTitle });
        saveTabsToStorage(savedTabs);
      });
    });
  }
  
  function saveTabsToStorage(savedTabs) {
    browser.storage.local.set({ savedTabs: savedTabs }).then(function() {
      console.log('Tabs saved:', savedTabs);
    });
  }
  
  function retrieveSavedTabs(callback) {
    browser.storage.local.get('savedTabs').then(function(result) {
      var savedTabs = result.savedTabs;
      if (savedTabs) {
        callback(savedTabs);
      } else {
        callback([]);
      }
    });
  }
  
  function restoreTabsFromStorage() {
    retrieveSavedTabs(function(savedTabs) {
      if (savedTabs.length > 0) {
        console.log('Restored tabs:');
        savedTabs.forEach(function(tab) {
          console.log('Title:', tab.title);
          console.log('URL:', tab.url);
          document.getElementById('savedLinks').innerHTML +=
          `<a class="link" href="${tab.url}">
            <div class="icon"></div>
            <p class="name-of-site">${tab.title.slice(0,11)}</p>
          </a>
          `
        });
      } else {
        console.log('No saved tabs found.');
      }
    });
  }
  
  function deleteAllTabs() {
    browser.storage.local.remove('savedTabs').then(function() {
      console.log('All saved tabs deleted.');
    });
  }
  
  // Restore saved tabs on extension load
  document.addEventListener('DOMContentLoaded', restoreTabsFromStorage);
  
  
  
