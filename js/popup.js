$(  function() {
    window.openForm=function() {
        document.getElementById("myForm").style.display = "block";
      }
      
      window.closeForm=function() {
        document.getElementById("myForm").style.display = "none";
      } 
});

(  function($) {
    'use strict';

    const api_url = 
        "http://localhost:9040/";
    $( function() {
        window.openForm=function() {
            document.getElementById("myForm").style.display = "block";
          }
          
          window.closeForm=function() {
            document.getElementById("myForm").style.display = "none";
          } 

        var taskId;
        var todoListItem = $('.todo-list');

        window.editClicked=async function() {
            let userId =  await sessionStorage.getItem("userId");
            var templi=document.getElementById('li'+taskId).className;
            if (templi=="completed") {
                await fetch(api_url+"taskupdate",{
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "id":taskId,
                    "taskName": editTaskName.value,
                    "taskDescription": "-",
                    "taskCondition": "Done",
                    "userId": userId
                  })
                }).then((response) => {
                  // var data = await response.json();
              
                  if (response) {
                      if(response.status==200){
                          window.alert("Update Task Successful")
                          $(this).removeAttr('checked');
                      }
                      
                  }
                  
                  // throw new Error('Something went wrong');
                })
                .catch((error) => {
                  console.log(error);
                });
                // $(this).removeAttr('checked');
            } else {
                await fetch(api_url+"taskupdate",{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    "id":taskId,
                    "taskName": editTaskName.value,
                    "taskDescription": "-",
                    "taskCondition": "Not Done",
                    "userId": userId
                    })
                }).then((response) => {
                    // var data = await response.json();
                
                    if (response) {
                        if(response.status==200){
                            window.alert("Update Task Successful")
                        }
                        
                    }
                    
                    // throw new Error('Something went wrong');
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            closeForm();
            window.location.href = "tasklist.html";
        }

        todoListItem.on('click', '.edit', async function() {
            openForm();
            taskId=this.id;
            var text = $("#label"+$(this).attr('id')).contents().filter(function() {
                return this.nodeType == Node.TEXT_NODE;
              }).text();
            var editTaskName=document.getElementById("editTaskName");
            editTaskName.value = text; 

        });
  
    });
  })(jQuery);