const Form = document.querySelector('form')



Form.addEventListener('submit',(e) =>{
const Sid = document.getElementById('Sid')
const Father_Name = document.getElementById('Father_name')
const Mother_Name = document.getElementById('Mother_name')
 const Parent_email = document.getElementById('Parent_email')
 const Parent_phone = document.getElementById('Parent_phone')
const Student_Phone = document.getElementById('Student_phone')
 const Student_email = document.getElementById('Student_email')
const Name = document.getElementById('Name')
const DName = document.getElementById('DName')
 //const Password = document.getElementById('Password')

// Form.addEventListener('submit',(e) =>{
// fetch('/student?Sid='+Sid.value).then((response) =>{
//   response.json().then((data) => {
//   console.log(data.Sid.value)
//   })
// })
//console.log(Father_Name)


// Form.addEventListener('submit',(e) =>{
//   e.preventDefault()

  
//  console.log(Password.value)

fetch('/student_reg', {
  method: 'POST',
  body: JSON.stringify({
    Sid: "Sid.value",
    Father_Name:"Father_Name.value",
    Mother_Name:"Mother_Name.value",
    Parent_email:"Parent_email.value",
    Parent_phone:"Parent_phone.value",
    Student_Phone:"Student_Phone.value",
    Student_email:"Student_email.value",
    Name : "Name.value",
    DName : "DName.value"
    //Password:"Password.value"

  })
});

 })
