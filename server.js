const express = require("express");

const app = express();
app.use(express.json());
const joi = require("@hapi/joi");


const users = [
  {
  id: 1,
  isActive: true,
  balance: "$1,111.15",
  picture: "http://placehold.it/32x32",
  age: 37,
  name: "Elsa Castaneda",
  gender: "female",
  company: "OTHERWAY",
  email: "elsacastaneda@otherway.com",
  phone: "+1 (988) 404-2932",
  },
  {
  id: 2,
  isActive: true,
  balance: "$1,823.59",
  picture: "http://placehold.it/32x32",
  age: 35,
  name: "Ollie Osborn",
  gender: "female",
  company: "VIASIA",
  email: "ollieosborn@viasia.com",
  phone: "+1 (947) 442-2611",
  },
  {
  id: 3,
  isActive: true,
  balance: "$1,734.78",
  picture: "http://placehold.it/32x32",
  age: 29,
  name: "Dean Huff",
  gender: "male",
  company: "NORALEX",
  email: "deanhuff@noralex.com",
  phone: "+1 (816) 575-2363",
  },
];

const children = [
  {
  id: 11,
  name: "Christina Bray",
  parent_id: 1,
  age: 6,
  },
  {
  id: 12,
  name: "Farrell Boone",
  parent_id: 1,
  age: 4,
  },
  {
  id: 13,
  name: "Gary Maddox",
  parent_id: 2,
  age: 4,
  },
  {
  id: 14,
  name: "Helena Burt",
  parent_id: 2,
  age: 6,
  },
  {
  id: 15,
  name: "Beryl Duke",
  parent_id: 2,
  age: 7,
  },
];

//Read User

app.get("/users/:id", function(req,res){
    const id = req.params.id;
    const result = users.find(item => item.id ==id);
    if(result){
    res.json(result);
    }else{
        res.status(404).json({
            msg: "not found"
        });
    };
});


//Read User’s child

app.get("/users/:id/children/:childId", function(req,res){
    const userid = req.params.id;
    const childId = req.params.childId;
    let result;
    for(let i = 0; i < users.length; i++){
        if(users[i].id == userid ){
            for(let j = 0; j < children.length; j++){
              if(children[j].id == childId && children[j].parent_id == userid){
                result = children[j];
              }
            }
        };
    };
    if(result){
    res.json(result);
    }else{
        res.status(404).json({
            msg: "not found"
        });
    };
});


//Read Users

app.get("/users", (req, res)=> {
    res.json(users);
});


//Read User’s Children
app.get("/users/:id/children", (req, res)=> {
    const userid = req.params.id;
    let result = new Array();
    for(let i = 0; i < users.length; i++){
      if(users[i].id == userid ){
        for(let j = 0; j < children.length; j++){
            if(users[i].id == children[j].parent_id ){
                result.push(children[j]);
            };
        };
      };
    };
    
    if(result){
      res.json(result);
    }else{
        res.status(404).json({
            msg: "not found"
        });
    };
});


//Read Children
app.get("/children", (req, res)=> {
    res.json(children);
});


//Delete User
app.post("/users", (req,res)=>{
  const body = req.body;
  if(users.find(user=>user.id == body.id)){
    res.status(409).json({
      msg : "Id already exists"
    });
  }

  if(!req.body.balance ){
     res.status(404).json({
      msg : "balance must be"
    })
  }else if(!req.body.picture){
     res.status(404).json({
      msg : "picture must be"
    })
  }else if(!req.body.age){
     res.status(404).json({
      msg : "age must be"
    })
  }else if(!req.body.name){
     res.status(404).json({
      msg : "name must be"
    })
  }else if(!req.body.gender){
     res.status(404).json({
      msg : "gender must be"
    })
  }else if(!req.body.company){
     res.status(404).json({
      msg : "company must be"
    })
  }else if(!req.body.email){
     res.status(404).json({
      msg : "email must be"
    })
  }else if(!req.body.phone){
     res.status(404).json({
      msg : "phone must be"
    })
  }
  else{
    users.push(body);
    res.status(200).json(body);
  }
});


//Delete User’s Child
app.post("/children", (req,res)=>{
  const body = req.body;
  if(children.find(child=>child.id == body.id)){
    res.status(409).json({
      msg : "Id already exists"
    });
  }else if(!req.body.name){
    res.status(404).json({
      msg : "name must be"
    });
  }else if(!req.body.age){
    res.status(404).json({
      msg : "age must be"
    });
  }else if(!req.body.age){
    res.status(404).json({
      msg : "age must be"
    });
  }else if(!req.body.age){
    res.status(404).json({
      msg : "age must be"
    });
  }else if(!req.body.parent_id){
     res.status(404).json({
      msg : "parent_id must be"
    })
  }else if(users.find(user=>user.id == body.parent_id)){
    children.push(body);
    res.status(200).json(body);
  }else{
     res.status(404).json({
      msg : "Id users is not exist"
    })
  }
});

//Delete User
app.delete("/users/:userid", (req,res)=>{
    const userId = req.params.userid;
    const result = users.find(item => item.id == userId);
    if(!result){
      res.status(404).json({
        msg:"Not found"
      });
    }else{
      const index = users.indexOf(result);
      users.splice(index,1);
      res.sendStatus(204);
    }
});


//Delete User’s Child
app.delete("/children/:childid", (req,res)=>{
    const childId = req.params.childid;
    const result = children.find(item => item.id == childId);
    if(!result){
      res.status(404).json({
        msg:"Not found"
      });
    }else{
      const index = children.indexOf(result);
      children.splice(index,1);
      res.sendStatus(204);
    }
});

app.listen(3000, () => console.log("server started localhost:3000"));