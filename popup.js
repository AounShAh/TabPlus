

  document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveTab);
  
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('dblclick', deleteAllTabs);

    const countdownCheck = document.getElementById('countdown');
    countdownCheck.addEventListener('change', countdownDisplay);

    const rstCountdown = document.getElementById('rstBtn');
    rstCountdown.addEventListener('dblclick', resetCountdown);
  
  });
  


  function saveTab(event) {
    browser.tabs.query({ currentWindow: true, active: true }).then(function(tabs) {

      const data = {
        tab : tabs[0],
        buttonId : event.target.id
      }

  // Send the data to index.js
  browser.runtime.sendMessage({ data }, response => {
    if(!response.success)
    {
      document.write('this tab is already saved');
    }
    console.log('Data sent to index.js');
  });
})
}



  function deleteAllTabs(event) {

    const data = {
      buttonId : event.target.id
    }
    browser.runtime.sendMessage({ data }, response => {
      console.log('Data sent to index.js');
    });
  
}
 

function countdownDisplay(event)
{
  if(this.checked)
  {
    const data = {
      buttonId : event.target.id,
      checked  : true
    }

    browser.runtime.sendMessage({data});

  }
  else 
  {
    const data = 
    {
      buttonId : event.target.id,
      checked  : false
    }

    browser.runtime.sendMessage({data});

  }
}
  


 function resetCountdown()
 {
  browser.storage.local.remove('countdownTime').then(function() {
    console.log('Saved Countdown is removed');
  });
 }
  
  
