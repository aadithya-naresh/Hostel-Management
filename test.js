var mysql= require('mysql')
const path = require('path')
const express = require('express')
const Handlebars = require('hbs')
const html = require('html')
//var alert =require('alert-node')
var JSAlert = require("js-alert");

var username = ""
var password = ""
var Sid = ""
var Rid = ""
var global_Sid = []
var global_Sid1 = []
let complaint_Sid = []
let complaint_complaints = []
let global_fee_Sid = []
const app = express()
var con = mysql.createConnection({
  host: "localhost",
  user: "One",
  password: ""
});



con.connect(function(err) {
  if (err) throw err

  console.log("Connected!")

  // con.query("CREATE DATABASE HOSTEL",function(err,value){
  //   if(err) throw err
  //   console.log("Done")
  // })
  // con.query("USE HOSTEL;",function(err,value){
  //   if(err) throw err
  //   console.log("Done")
  // })
  // con.query("CREATE TABLE STUD_CONTACT(Sid INT(10) PRIMARY KEY,Father_Name varchar(25),Mother_Name varchar(25),Parent_email varchar(50),Parent_Phone INT(10),Student_Phone INT(10),Student_email varchar(50));",function(err,value){
  //     if(err) throw err
  //     console.log("Done")
  // })
})
var i =0
var j =0
var k =0
var l =0

app.use(express.static(path.join(__dirname, 'public')))

 app.use(express.urlencoded());
 app.use(express.json())
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.engine('html', require('ejs').renderFile);
app.set('view engine' ,'html')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
};

app.get('',(req,res) =>{
  res.render('index.html')
})


app.get('/rc_error',(req,res) =>{
  res.render('rc_error.hbs',{
    error:'Check email or password'
  })
})


app.get('/rc_success',(req,res) =>{
  res.render('rc_success.hbs')
  
  
})
app.get('/success',(req,res) =>{
  res.render('success.hbs')
})
app.get('/studentRegistration.html',(req,res) =>{
  res.render('studentRegistration.html')
})

app.get('/rc_login.html',(req,res) =>{
  res.render('rc_login.hbs')
})

app.get('/student_login.html',(req,res) =>{
  res.render('student_login.hbs')
})

app.get('/student_signup.html',(req,res) =>{
  res.render('student_signup.html')
})

app.get('/student_remove.html',(req,res) =>{
  res.render('student_remove.hbs')
})

app.get('/student_complaint.html',(req,res) =>{
  res.render('student_complaint.html')
})

app.get('/rc_fees.html',(req,res) =>{
  console.log("ASD")

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })

  con.query("SELECT * FROM FEES WHERE RID="+Rid+" and status in ('NO');",(err,value) =>{
    if(err) throw err

    var fees_name = []
    for(var q=0;q<value.length;q++)
    {
  //     console.log(value[q].Name)
      fees_name.push(value[q].NAME+" "+value[q].Sid)
      global_fee_Sid.push(value[q].Sid)
    }
// removeDuplicates(fees_name)
    res.render('rc_fees.hbs',{
      name:fees_name
    })

  })
})
app.get('/rc_complaints.html',(req,res) =>{
 let complaint = []
 
  con.query("SELECT * from "+Password+";",(err,value) =>{
      if(err) throw err

    //  con.query("SELECT ROOM")
      console.log(value)
    
      for(var w=0;w<value.length;w++)
      {
      complaint_Sid.push(value[w].SID)
      complaint_complaints.push(value[w].COMPLAINT)
      complaint.push("Room No:"+value[w].ROOM_NO+"\n"+value[w].COMPLAINT)
      }
     // console.log(complaint)
    res.render('rc_complaints.hbs',{
      complaint:complaint
    })
})
})

app.get('/attendance.html',(req,res) =>{

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })

  con.query("SELECT attendance_date FROM attendance where Sid="+Sid+";",(err,value) =>{
    if(err) 
    return res.render('student_success.hbs',{
      message: 'Sorry,an error occured'
   })

    if(value.length>0)
    var message = 'You were absent on '
    if(value.length == 0)
    var message = 'You are present on all days'

    
    console.log(value)
    for(var g=0;g<value.length;g++)
    if(g!= value.length-2)
    message+=value[g].attendance_date
    else
    message+=value[g].attendance_date+' and '

    console.log(message)
    res.render('student_success.hbs',{
      message:message
    })
  })
})

//     app.get('/update_attendance')

app.get('/rc_attendance.html',(req,res) =>{
  
  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })

  con.query("SELECT * FROM STUDENT WHERE DNAME IN ( SELECT DNAME FROM BLOCKS WHERE Block_No = (SELECT BLOCK_NO FROM RC WHERE RID="+Rid+"))",(err,value) =>{
    if(err)
    res.render('rc_error.hbs',{
      error:'Sorry,try again!'
    })
    var name = []
    for(var q=0;q<value.length;q++)
    {
  //     console.log(value[q].Name)
      name.push(value[q].Name+" "+value[q].Sid)
      global_Sid.push(value[q].Sid)
    }
    global_names = name
    res.render('RC_attendance.hbs',{
      name:name
    })
  })
})

app.get('/rc_update.html',(req,res) =>{

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })
   global_Sid1 = []
  con.query("SELECT * FROM STUDENT WHERE DNAME IN ( SELECT DNAME FROM BLOCKS WHERE Block_No = (SELECT BLOCK_NO FROM RC WHERE RID="+Rid+"))",(err,value) =>{
    if(err)
    res.render('rc_error.hbs',{
      error:'Sorry,try again!'
    })
    var name = []
    for(var q=0;q<value.length;q++)
    {
  //     console.log(value[q].Name)
      name.push(value[q].Name+" "+value[q].Sid)
      global_Sid1.push(value[q].Sid)
    }
    
    res.render('RC_update.hbs',{
      name:name
    })
  })
})


app.get('/RC_main',(req,res) =>{
  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })

res.render('RC_main.hbs')

 })

app.post('/student_signup',(req,res) =>{
  //console.log(req.body)
   if(!req.query){
        return res.send({
      error:'Error'
    })
    }
    con.query("USE HOSTEL;",function(err,value){
      //  if(err)// throw err
        console.log("Done-use")
    })

    Sid = req.body.Sid
    if(req.body.Sid)
    k = k+1

    if(k!=0)
    {
      con.query("INSERT INTO Student(Sid,Password,Name) VALUES("+req.body.Sid+",'"+req.body.Password+"','"+req.body.Name+"');",(err,value) =>{
        if(err) 
        res.render('rc_error.hbs',{
          error:'User already exists. Try logging in'
        })

        else
       res.render('student_main.hbs',{
           Name : req.body.Name
        })
        console.log("insert done")
      })
    }
})

app.post('/student_login',(req,res) =>{
  if(!req.query){
    return res.send({
  error:'Error'
})
}
con.query("USE HOSTEL;",function(err,value){
  //  if(err)// throw err
    console.log("Done-use")
})

Sid = req.body.Sid


if(req.body.Sid)
l = l+1


if(l!=0)
{
  //console.log(req.body)

con.query("SELECT * FROM STUDENT WHERE SID='"+req.body.Sid+"' and password='"+req.body.Password+"';",function(err,value){
  if(err)
  res.render('student_login.hbs',{
    message :'Sorry , an error occured'
  })

  else if(!value[0])
  res.render('student_login.hbs',{
    message :'Check email or password'
  })



  else  
  {   
  //console.log(value[0])
  //res.redirect('/rc_success') 
  res.render('student_main.hbs',{
    Name:value[0].Name
  })
  }

})

}
})


app.post('/rc',(req,res) =>{
      if(!req.query){
        return res.send({
      error:'Error'
    })
    }
    con.query("USE HOSTEL;",function(err,value){
      //  if(err)// throw err
        console.log("Done-use")
    })

    Rid = req.body.Rid
    Password = req.body.Password
    if(req.body.Rid)
    j = j+1

    if(j!=0)
    {
    con.query("SELECT * FROM RC WHERE RID='"+req.body.Rid+"' and password='"+req.body.Password+"';",function(err,value){
      if(err)
      {res.render('rc_login.hbs',{
          message: 'Sorry an error occured'
      })}

      else if(!value[0])
      {res.render('rc_login.hbs',{
        message: 'Check Rc Number or password'
    })}
    
    

      else  
      {   
     // console.log(value[0].Name)
      //res.redirect('/rc_success') 
      res.render('rc_success.hbs',{
        name:value[0].Name
      })
      }
  
    })

    }
  })


app.post('/student_reg',(req,res) =>{
    if(!req.query){
         return res.send({
        error:'Error'
      })
     }

     con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })
 
    
    if(req.body.Sid)
    i = i+1

    
    if(i!=0)
    {
      // Sid = req.body.Sid
      console.log(req.body.DName)
          
          con.query("SELECT VACANCY FROM vacancy where Block_No = (SELECT Block_No FROM blocks where DName='"+req.body.DName+"');",(err,value) =>{
               if(err) 
               return res.render('student_success.hbs',{
                 message: 'Sorry,an error occured'
              })
            if(value[0])
             if(value[0].VACANCY > 0)
               {
                var room_no = value[0].VACANCY
                con.query("INSERT INTO STUD_CONTACT(Sid,Father_Name,Mother_Name,Parent_email,Parent_Phone,Student_Phone,Student_email,DName) VALUES('"+req.body.Sid+"',"+"'"+req.body.Father_name+"',"+"'"+req.body.Mother_name+"',"+"'"+req.body.Parent_email+"',"+""+req.body.Parent_phone+","+""+req.body.Student_phone+","+"'"+req.body.Student_email+"','"+req.body.DName+"');",function(err,value){
                  if(err) {
                 //  throw err
                    return res.render('student_success.hbs',{
                         message: 'User already registered'
                  })
                  }
                
                 
                 var block_no = ""
                 con.query("UPDATE STUDENT SET DName ='"+req.body.DName+"',Room_No ="+room_no+" where Sid ="+req.body.Sid+";",function(err,value){
                 if(err) 
                 return res.render('student_success.hbs',{
                 message: 'Sorry,an error occured'
                 })

                 con.query("(SELECT Block_No FROM blocks where DName='"+req.body.DName+"');",(err,value) =>{
                   if(err) 
                  return res.render('rc_error.hbs',{
                  message: 'Sorry,an error occured'
                  })
                  
                   block_no = value[0].Block_No
                   res.render('student_success.hbs',{
                    message:"Congrats! You've been alloted to Room No."+room_no+" in block "+block_no
                  })
                  
                 })
                //  con.query("UPDATE VACANCY SET VACANCY = VACANCY-1 WHERE BLOCK_NO =(SELECT Block_No FROM blocks where DName='"+req.body.DName+"');",(err,value) =>{
                //     if(err) 
                //     return res.render('student_success.hbs',{
                //       message:'Sorry, there is an error'
                //     })
                //      res.render('student_success.hbs',{
                //        message:"Congrats! You've been alloted to Room No."+room_no+" in block "+block_no
                //      })
                //  })
                })
              })
               } 

              else{
                con.query("SELECT * FROM WITHDRAWAL where Block_No = (SELECT Block_No FROM blocks where DName='"+req.body.DName+"');",(err,value) =>{
                  if(err) 
                  return res.render('rc_error.hbs',{
                    message: 'Sorry,an error occured'
                    })


                  console.log(value[0])
                  if(value[0])
                  {var vacant_room = value[0].vacant_room
                  con.query("UPDATE STUDENT SET DName ='"+req.body.DName+"',Room_No ="+value[0].vacant_room+" where Sid ="+req.body.Sid+";",function(err,value){
                    if(err) 
                    return res.render('student_success.hbs',{
                    message: 'Sorry,an error occured'
                    })
                    
                    con.query("call DEL_WITHDRAW((SELECT Block_No FROM blocks where DName='"+req.body.DName+"'),"+vacant_room+");",(err,value) =>{
                      if(err) throw err

                      con.query("(SELECT Block_No FROM blocks where DName='"+req.body.DName+"');",(err,value) =>{
                        if(err) 
                       return res.render('rc_error.hbs',{
                       message: 'Sorry,an error occured'
                       })
                       var block = value[0].Block_No
                       con.query("INSERT INTO STUD_CONTACT(Sid,Father_Name,Mother_Name,Parent_email,Parent_Phone,Student_Phone,Student_email,DName) VALUES('"+req.body.Sid+"',"+"'"+req.body.Father_name+"',"+"'"+req.body.Mother_name+"',"+"'"+req.body.Parent_email+"',"+""+req.body.Parent_phone+","+""+req.body.Student_phone+","+"'"+req.body.Student_email+"','"+req.body.DName+"');",function(err,value){
                        if(err) {
                         throw err
                          return res.render('student_success.hbs',{
                               message: 'User already registered'
                        })
                        }

                      res.render('student_success.hbs',{
                        message:"Congrats! You've been alloted to Room No."+vacant_room+" in block "+block
                      })
                  
                    })
                  })
                })
              })
            }
              else{
                res.render('student_success.hbs',{
                  message: 'Sorry, all rooms are full at the moment :( . Try again later'
                })
              }
              })
            
                // res.render('student_success.hbs',{
                //   message: 'Sorry, all rooms are full at the moment :( . Try again later'
                // })
              }
                 
                 
               })
              
              
       //   })
    }    
      })


app.post('/student_complaint',(req,res) =>{
  console.log(req)
  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })
  //console.log(Sid)
  
  
  con.query("INSERT INTO COMPLAINTS(Sid,complaint) VALUES("+Sid+",'"+req.body.complaint+"');",(err,value) =>{
    if(err) 
   return res.render('student_success.hbs',{   
           message: " Sorry,you're not registered to any hostel"
   })

   res.render('student_success.hbs',{
     message: "We're sorry for the inconvenience caused. The complaint will be looked into ASAP."
   })
    
  })
})

app.post('/student_remove',(req,res) =>{

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })
                       
  con.query('DELETE FROM STUDENT WHERE Sid='+Sid+';',(err,value) =>{
    if(err)
    return res.render('student_success.hbs',{
      message: 'Sorry,an error occured'
   })

   return res.render('student_success.hbs',{
    message: "Sayonara, we'll miss you"
 })

  })
})

app.post('/rc_attendance',(req,res) =>{                  

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })
  console.log(req.body)
  console.log(global_Sid)
  
  for(var z=0;z<global_Sid.length;z++)
  if(!req.body[z])
  {
    console.log(req.body[z])
  con.query("INSERT INTO ATTENDANCE(Sid,Rid,attendance_date) VALUES("+global_Sid[z]+","+Rid+","+"curdate())",(err,value) =>{
    if(err)  
  {  return res.render('rc_main.hbs',{
      message:'Attendance already taken'
    })

    // global_Sid=[]
    // res.render('rc_main.hbs',{
    //   message:'Attendance successfully taken'
    // })
  
  }
  
})
  }
 
    global_Sid=[]
  res.render('rc_main.hbs',{
    message:'Attendance successfully taken'
  })



  
 
})

app.post('/rc_update',(req,res) =>{

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })
  console.log(req.body['date'])
  console.log(global_Sid1)
  

  //console.log("DELETE FROM ATTENDANCE WHERE attendance_date='"+req.body['date']+"';")
  
  con.query("DELETE FROM ATTENDANCE WHERE attendance_date='"+req.body['date']+"';",(err,value) =>{
    if(err) throw err
    console.log(global_Sid1.length)
  for(var z=0;z<global_Sid1.length;z++)
  if(!req.body[z])
  con.query("INSERT INTO ATTENDANCE(Sid,Rid,attendance_date) VALUES("+global_Sid1[z]+","+Rid+","+"curdate())",(err,value) =>{    
    if(err) 
    {return res.render('RC_attendance.hbs',(req,res) =>{
      message:'Sorry,an error occured'
    }) 

    // global_Sid1=[]
    // res.render('rc_main.hbs',{
    //   message:'Attendance successfully updated'
    // })
  }
})
global_Sid1=[]
  res.render('rc_main.hbs',{
    message:'Attendance successfully updated'
  })

  
     
})

})

app.post('/rc_complaint',(req,res) =>{
  console.log(req.body)
  console.log(complaint_Sid)
  console.log(complaint_complaints)

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })

  for(var r=0;r<complaint_Sid.length;r++)
  {
    if(req.body[r])
    con.query("DELETE FROM COMPLAINTS WHERE SID ="+complaint_Sid[r]+" and COMPLAINT IN ('"+complaint_complaints[r]+"');",(err,value) =>{
      if(err) throw err

      res.render('RC_main.hbs',{
        message : "Complaints done"
      })
    })
  }
})

app.post('/rc_fees',(req,res) =>{
  console.log(global_fee_Sid)
  console.log(req.body)

  con.query("USE HOSTEL;",function(err,value){
    //  if(err)// throw err
      console.log("Done-use")
  })
  for(var q=0;q<global_fee_Sid.length;q++)
  {
    if(req.body[q])
    con.query("UPDATE FEES SET STATUS = 'YES' WHERE SID ="+global_fee_Sid[q]+";",(err,value) =>{
      if(err) 
      return res.render('rc_main.hbs',{
        message:'Sorry,an error occured'
      })
      
    })
  }
  
  return res.render('rc_main.hbs',{
    message:'Fee status updated'
  })
})

app.listen(3000,() =>{
  console.log('Server is turned on 3000')
})