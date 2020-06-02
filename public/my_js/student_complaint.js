const Form = document.querySelector('form')



Form.addEventListener('submit',(e) =>{
    const complaint = document.getElementById('complaint')

    console.log(Sid.value)
    console.log(Password.value)
    fetch('/student_complaint',{
        method: 'POST',
         body: JSON.stringify({
            complaint:"complaint.value"
      })
    });

})