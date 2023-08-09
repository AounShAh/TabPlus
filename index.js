

//restoring the tabs from the storage
let savedTabsArray = [];
browser.storage.local.get('savedTabs').then(function(result) {
     const savedTabs = result.savedTabs;
      if(savedTabs)
      {
        for(let savedTab of savedTabs)
        {
          savedTabsArray.push(savedTab);
          setTabToDOM(savedTab.url,savedTab.title,savedTab.icon);
        }
      }
  });



//for debug puropese
browser.storage.local.get('savedTabs').then(function(result) {
        console.log('this is the result from the sotrage ', result);
        savedTabs = result.savedTabs;
        console.log('this is the savedtabs from the storage', savedTabs);
})





//setting the tabs in the storage

function saveTabsToStorage()
{
  browser.storage.local.set({ savedTabs: savedTabsArray }).then(function(result) {
        console.log('Tabs saved:', savedTabsArray);
      });
}



function setTabToDOM(tabLink,tabTitle,tabIcon)
{
  document.getElementById('savedLinks').innerHTML +=
  `<div class="link-outer">
    <div class="link-inner">
      <a class="link" href="${tabLink}">
        <div class="icon" style="background-image:url(${tabIcon})"></div>
        <p class="name-of-site">${tabTitle.slice(0,11)}</p>
      </a>
    </div>
  </div>
  `;
}





function saveTheTab(message)
{
  const tab = message.data.tab;
  const tabLink = tab.url;
  const tabTitle = tab.title;
  const tabIcon = `https://s2.googleusercontent.com/s2/favicons?domain=${tabLink}&sz=256`;
  console.log('button clicked', message.data.buttonId);
  console.log('tab icon',tabIcon);
  


  for(let savedTab of savedTabsArray)
      {
        if(savedTab.url == tabLink)
        {
          return false;
        }
      } 


  
  savedTabsArray.push({ url: tabLink, title: tabTitle, icon: tabIcon });
  
  saveTabsToStorage();

  setTabToDOM(tabLink,tabTitle,tabIcon);
  return true;
}




function countdownDisplay(checked)
{
  if(checked)
  {
    document.getElementById('countdownContainer').style.display = 'block';
  }
  else
  {
    document.getElementById('countdownContainer').style.display = 'none';
  }
}


// Listen for messages from popup.js
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Process the received data
    console.log('event recevied', message);

    if(message.data.buttonId == 'saveButton')
    {
      saveTheTab(message) ? sendResponse({ success: true }) : sendResponse({ success: false });
    }
    else if(message.data.buttonId == 'deleteButton')
    {
      
      browser.storage.local.remove('savedTabs').then(function() {
      console.log('All saved tabs deleted.');
    });

    }
    else if(message.data.buttonId == 'countdown'){
      countdownDisplay(message.data.checked);
    }
    else {
      console.log('what button is this');
    }


  });



  browser.storage.local.get('countdownTime').then(result => {
    if (result.countdownTime) {
      updateCountdown(result.countdownTime);
      setInterval(function() {
        updateCountdown(result.countdownTime);
    }, 1000);
    }
})

  document.getElementById('countdownStartBtn').addEventListener('click', function()
  {
    const calender = document.getElementById('calender');
    const selectedDate = new Date(`${calender.value}T00:00:00`).getTime();
    console.log('this is the selected date => ', selectedDate);

    browser.storage.local.set({ countdownTime : selectedDate }).then(function() {
      console.log('time saved:', selectedDate);
    });

    updateCountdown(selectedDate);
    setInterval(function() {
      updateCountdown(selectedDate);
  }, 1000);
  })



  function updateCountdown(selectedDate) {
    const countdownElement = document.getElementById('countdownContainer');
      const now = new Date().getTime();
      const timeDifference = selectedDate - now;
  
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



    // document.getElementById('weatherContainer').innerHTML =
