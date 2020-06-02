const Form = document.querySelector('form')



Form.addEventListener('submit',(e) =>{
    const Sid = document.getElementById('Sid')
    const Password = document.getElementById('Password')
    const Name = document.getElementById('Name')

    console.log(Sid.value)
    console.log(Password.value)
    fetch('/student_signup',{
        method: 'POST',
         body: JSON.stringify({
            Sid: "Sid.value",
            Password:"Password.value",
            Name:"Name.value"
      })
    });

})