const Form = document.querySelector('form')



    let arr  = []
    var i=0
    e.preventDefault()

    while(document.getElementById(i)){
        var name = document.getElementById(i)
        i++;
        arr.push(name.checked)
    }
    console.log(arr)
            var done = document.getElementById(0)
 fetch('/r',{
        method: 'POST',
         body:JSON.stringify({
             arr
         })
})