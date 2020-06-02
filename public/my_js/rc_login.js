const Form = document.querySelector('form')

//CREATE RC TABLE AND INSERT 5 RC


Form.addEventListener('submit',(e) =>{
    const Rid = document.getElementById('Rid')
    const Password = document.getElementById('Password')


    console.log(Rid.value)
    console.log(Password.value)
    fetch('/rc',{
        method: 'POST',
         body: JSON.stringify({
            Rid: "Rid.value",
            Password:"Password.value"
      })
    });

})