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
    deleteButton.addEventListener('dblclick', deleteAllTabs);
  });
  

  let savedTabsArray = [];

  browser.storage.local.get('savedTabs').then(function(result) {
     let savedTabs = result.savedTabs;
      console.log('this outside the function', savedTabs);
      if(savedTabs)
      {
        for(let savedTab of savedTabs)
        {
          savedTabsArray.push(savedTab);
        }
      }
  });


  console.log('this is outside the function savedtabs array', savedTabsArray);

  function saveTab() {
    browser.tabs.query({ currentWindow: true, active: true }).then(function(tabs) {
      var tab = tabs[0];
      console.log('this is happeneing in the tab', tab);
      var tabLink = tab.url;
      var tabTitle = tab.title;
      var tabIcon = tab.favIconUrl;

      for(let savedTab of savedTabsArray)
      {
        if(savedTab.url == tabLink)
        {
          document.write(tabIcon);
          return;
        }
      } 

      savedTabsArray.push({ url: tabLink, title: tabTitle, icon: tabIcon });
      saveTabsToStorage(savedTabsArray);



      // retrieveSavedTabs(function(savedTabs) {
      //   if(savedTabs.include())
      //   savedTabs.push({ url: tabLink, title: tabTitle });
      //   saveTabsToStorage(savedTabs);
      // });




    });
  }
  
  function saveTabsToStorage(savedTabsArray) {
    browser.storage.local.set({ savedTabs: savedTabsArray }).then(function() {
      console.log('Tabs saved:', savedTabsArray);
    });
  }
  
  // function retrieveSavedTabs(callback) {
  //   browser.storage.local.get('savedTabs').then(function(result) {
  //     var savedTabs = result.savedTabs;
  //     if (savedTabs) {
  //       callback(savedTabs);
  //     } else {
  //       callback([]);
  //     }
  //   });
  // }
  
  function restoreTabsFromStorage() {


    let savedTabs;

    browser.storage.local.get('savedTabs').then(function(result) {
      console.log(result);
      savedTabs = result.savedTabs;
      console.log(savedTabs);
      if (savedTabs.length > 0) {
            console.log('Restored tabs:');
            savedTabs.forEach(function(tab) {
              console.log('Title:', tab.title);
              console.log('URL:', tab.url);
              console.log('icon:', tab.icon);
              document.getElementById('savedLinks').innerHTML +=
              `<a class="link" href="${tab.url}">
                <div class="icon" style="background-image:url(${tab.icon})"></div>
                <p class="name-of-site">${tab.title.slice(0,11)}</p>
              </a>
              `
            });
          } else {
            console.log('No saved tabs found.');
          }
    });

    // console.log(savedTabs);


    // retrieveSavedTabs(function(savedTabs) {
    //   if (savedTabs.length > 0) {
    //     console.log(savedTabs);
    //     console.log('Restored tabs:');
    //     savedTabs.forEach(function(tab) {
    //       console.log('Title:', tab.title);
    //       console.log('URL:', tab.url);
    //       document.getElementById('savedLinks').innerHTML +=
    //       `<a class="link" href="${tab.url}">
    //         <div class="icon"></div>
    //         <p class="name-of-site">${tab.title.slice(0,11)}</p>
    //       </a>
    //       `
    //     });
    //   } else {
    //     console.log('No saved tabs found.');
    //   }
    // });
  }
  
  function deleteAllTabs() {
    browser.storage.local.remove('savedTabs').then(function() {
      console.log('All saved tabs deleted.');
    });
  }
  
  // Restore saved tabs on extension load
  document.addEventListener('DOMContentLoaded', restoreTabsFromStorage);
  
  
  
