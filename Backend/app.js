var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var User = require("./models/user");
var cors = require('cors');
const schedule = require('node-schedule');

const multer = require('multer');
const path = require('path');

var accountSid = 'AC86129d7f26adf184f62f21db6c4eb8b1';
var authToken = '7a5c21bec905daca19041b3af77f9bb0';
var client = require('twilio')(accountSid,authToken);


//database connection 
mongoose.connect("mongodb+srv://amankumar:mongopass@cluster0.hhmjr.mongodb.net/database?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.json("working");
})

//Sign-up
app.post("/user/signup",cors(), async(req, res) => {
  const user = new User(req.body)
  try{
    await user.save()
    const token = await user.generateauthtoken()
    res.status(201).json({user, token})
  } catch(e){
    res.status(400).send("Username already exists");
  }
});

// Login
app.post("/user/login",cors(), async(req, res)=> {
  try{
    const user = await User.findbycredentials(req.body.username, req.body.password);
    const token = await user.generateauthtoken()
    res.status(200).send({user, token}); 

  } catch(e){
    res.status(400).send("Wrong Credentials");
}
});


//main link read
app.get('/mainlink/:username',(req,res)=>{
	User.find({"username":req.params.username},function(err,result){
		        if(err){
            res.send(err)
        }
        else{
            res.json(result);
        }
	})
})

app.get('/administrator',(req,res)=>{
	User.find({},{
    'username': 1,
    'trackingdata': 1,
    'creditScore':1
    },
    function(err,result){
      if(err){
        res.send(err)
      }
      else{
        res.json(result);
      }
	})
})

//TWILIO daily reminder
app.post('/calldaily',(req,res)=>{
  const name = req.body.username;
  const meds = req.body.meds;
  const phno = "+91"+req.body.phno;
  const t1 = req.body.time1;
  const t2 = req.body.time2;
  const t3 = req.body.time3;
  console.log(req.body);
  User.findOneAndUpdate({"username":name},{"$push": {"reminders" : [ {"medname" : meds , "time1":t1,"time2":t2,"time3":t3,}]}},{"new": true, "upsert": true},(err, result) => {
    if (err) {
      res.json({
        status:400,
        success:false,
        message:err
      })
    }
    else{	
      if(t1){
        console.log("Call successfull scheduled at ",t1)
        const time1 = '00 '+ t1.substring(3,5) + ' ' + t1.substring(0,2) + ' * * 1-5';
        schedule.scheduleJob(time1,()=>{
          client.calls.create({
            twiml: '<Response><Say>Hi '+ name + ' . This is a scheduled call from Medcall to remind you to take '+meds+' . Make sure you take it and upload the medicine image. Thank you.</Say></Response>',
            to:phno,
            from: '+18507530637'
          },(err,call)=>{
            if(err){
              console.log(err);
            }
            else{
              console.log("Call scheduled successfully !");
              client.messages.create({
                from:'whatsapp:+14155238886',
                to:'whatsapp:'+phno,
                body:'Reminder from Medcall for ' + name +' . Please take '+ meds +' .\n\nMake sure you post the medicine leaf/card image after you have taken your meds in our main website to keep track of your meds. \n\nThank you & Take Care \n MEDCALL'
              },(e,c)=>{
                if(e){
                  console.log(e);
                }
                else{
                  console.log("Message sent successfully !");
                }
              })
            }
          })
        })
      }
      if(t2){
        console.log("Call successfull scheduled at ",t2)
        const time2 = '00 '+ t2.substring(3,5) + ' ' + t2.substring(0,2) + ' * * 1-5';
        schedule.scheduleJob(time2,()=>{
          client.calls.create({
            twiml: '<Response><Say>Hi '+ name + ' . This is a scheduled call from Medcall to remind you to take '+meds+' . Make sure you take it and upload the medicine image. Thank you.</Say></Response>',
            to:phno,
            from: '+18507530637'
          },(err,call)=>{
            if(err){
              console.log(err);
            }
            else{
              console.log("Call scheduled successfully !");
              client.messages.create({
                from:'whatsapp:+14155238886',
                to:'whatsapp:'+phno,
                body:'Reminder from Medcall for ' + name +' . Please take '+ meds +' .\n\nMake sure you post the medicine leaf/card image after you have taken your meds in our main website to keep track of your meds. \n\nThank you & Take Care \n MEDCALL'
              },(e,c)=>{
                if(e){
                  console.log(e);
                }
                else{
                  console.log("Message sent successfully !");
                }
              })
            }
          })
        })
      }
      if(t3){
        console.log("Call successfull scheduled at ",t3)
        const time3 = '00 '+ t3.substring(3,5) + ' ' + t3.substring(0,2) + ' * * 1-5';
        schedule.scheduleJob(time3,()=>{
          client.calls.create({
            twiml: '<Response><Say>Hi '+ name + ' . This is a scheduled call from Medcall to remind you to take '+meds+' . Make sure you take it and upload the medicine image. Thank you.</Say></Response>',
            to:phno,
            from: '+18507530637'
          },(err,call)=>{
            if(err){
              console.log(err);
            }
            else{
              console.log("Call scheduled successfully !");
              client.messages.create({
                from:'whatsapp:+14155238886',
                to:'whatsapp:'+phno,
                body:'Reminder from Medcall for ' + name +' . Please take '+ meds +' .\n\nMake sure you post the medicine leaf/card image after you have taken your meds in our main website to keep track of your meds. \n\nThank you & Take Care \n MEDCALL'
              },(e,c)=>{
                if(e){
                  console.log(e);
                }
                else{
                  console.log("Message sent successfully !");
                }
              })
            }
          })
        })
      }
      res.json("Reminder scheduled successfully !");
    }
  })
})

//TWILIO meds renewal
app.post('/callrenewal',(req,res)=>{
  // const someDate = new Date(2022, 1, 10, 18, 11, 0);
  const name = req.body.username;
  const meds = req.body.meds;
  const phno = "+91"+req.body.phno;
  const t = req.body.time;
  const d = req.body.date;
  console.log(req.body);
  const year = Number(d.substring(0,4));
  const month = Number(d.substring(5,7))-1;
  const date = Number(d.substring(8,10));
  const min = Number(t.substring(3,5))
  const hr = Number(t.substring(0,2));

  const remindingDate = new Date(year, month, date, hr, min, 0);

  User.findOneAndUpdate({"username":name},{"$push": {"renewals" : [ {"medname" : meds , "time":t,"date":d}]}},{"new": true, "upsert": true},(err, result) => {
    if (err) {
      res.json({
        status:400,
        success:false,
        message:err
      })
    }
    else{	
      schedule.scheduleJob(remindingDate,()=>{
        client.calls.create({
          twiml: '<Response><Say>Hi '+name+'. This is a scheduled call from Medcall to remind you to buy '+meds+'. Make sure you get it, thank you.</Say></Response>',
          to:phno,
          from: '+18507530637'
        },(err,call)=>{
          if(err){
            console.log(err);
          }
          else{
            console.log("Call scheduled successfully !");
            client.messages.create({
              from:'whatsapp:+14155238886',
              to:'whatsapp:'+phno,
              body:'Reminder from Medcall for buying '+ meds + '. Make sure you get it. Thank you for being a part of Medcall. \n\n Take Care \n MEDCALL'
            },(e,c)=>{
              if(e){
                console.log(e);
              }
              else{
                console.log("Message sent successfully !");
              }
            })
          }
        })
      })
      res.json("Renewal scheduled successfully !");
    }
  }) 
})

//credit score increase 
app.get('/mainlink/countinc/:username',(req,res)=>{
	User.findOneAndUpdate({"username":req.params.username},{$inc:{creditScore:10}},{"multi": true},(err, result) => {
    if (err) {
      res.json({
        status:400,
        success:false,
        message:err
      })
    }
    else{	
    res.json(result);
    }
  }) 
}) 

//credit score decrease
app.get('/mainlink/countdec/:username',(req,res)=>{
	User.findOneAndUpdate({"username":req.params.username},{$inc:{creditScore:-10}},{"multi": true},(err, result) => {
    if (err) {
      res.json({
        status:400,
        success:false,
        message:err
      })
    }
    else{	
    res.json(result);
    }
  }) 
}) 

  app.post('/upload/:username', async(req, res) => {
    // console.log(req.body.meds);
      var name = req.params.username;
      var meds = req.body.meds;
      var img = req.body.image;
      var date_ob = new Date();
      var day = ("0" + date_ob.getDate()).slice(-2);
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      var year = date_ob.getFullYear();
        
      var date = day + "-" + month + "-" + year;
          
      var hours = date_ob.getHours();
      var minutes = date_ob.getMinutes();
      var seconds = date_ob.getSeconds();
        
      var time = hours + ":" + minutes + ":" + seconds;

      User.find({"username":name},{trackingdata : {$elemMatch : {medname: meds}}},function(err,result){
          if(err){
            res.send(err)
          }
          else{
            if(result[0].trackingdata[0] !== undefined)
            {
              tp = result[0].trackingdata[0].current_time;
              dp = result[0].trackingdata[0].current_date;
              pi = result[0].trackingdata[0].current_img;
              User.findOneAndUpdate({"username":name,"trackingdata.medname":meds}, {"$set": 
              {
                "trackingdata.$.current_img" : img,
                "trackingdata.$.medname":meds,
                "trackingdata.$.previous_date":dp,
                "trackingdata.$.previous_time":tp,
                "trackingdata.$.previous_img":pi,
                "trackingdata.$.current_date":date,
                "trackingdata.$.current_time":time
              }
              },{"new": true, "upsert": true},(err1, result1) => {
                if (err1) {
                  res.json({
                    status:400,
                    success:false, 
                    message:err
                  })
                }
                else{	
                    res.json(result1);
                }
              })
            }
            else{
              tp = time;
              dp = date;
              pi = img;

              User.findOneAndUpdate({"username":name},{"$push" : {"trackingdata" : [{
                "current_img" : img,
                "medname":meds,
                "previous_date":dp,
                "previous_time":tp,
                "previous_img":pi,
                "current_date":date,
                "current_time":time
              }]}},{"new": true, "upsert": true},(err2,result2)=>{
                if (err2) {
                  res.json({
                    status:400,
                    success:false, 
                    message:err
                  })
                }
                else{	
                    res.json(result2);
                }
              })
            }
          }
      })
  })

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server started");
});