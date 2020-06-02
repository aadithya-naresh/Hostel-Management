const Form = document.querySelector('form')



Form.addEventListener('submit',(e) =>{
    const Sid = document.getElementById('Sid')
    const Password = document.getElementById('Password')


    console.log(Sid.value)
    console.log(Password.value)
    fetch('/student_login',{
        method: 'POST',
         body: JSON.stringify({
            Sid: "Sid.value",
            Password:"Password.value"
      })
    });

})