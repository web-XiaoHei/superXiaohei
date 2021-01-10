var express = require('express')

var router = express.Router()
// 要引入 user的数据库架构完成的状态
const employees = require('../sql/employees')

/* GET home page. */
router.get('/', function(req, res, next) {
    employees.find({},(err,data)=>{
      if(err){
        console.log(err)
      }
      console.log(data)
  
      res.render('order', {
        index:3,
        data:data
      });
    })
    
});
  
//添加用户
router.get("/add", function (req, res, next) {
    res.render("employadd", {
      index: 3,
    });
  });
  
  router.post("/addAction", function (req, res, next) {
  
    console.log('进入/addAction里面了')
    let obj = req.body;
    console.log(obj);
    employees.insertMany(obj,(err,data)=>{
         if(err) {
           console.log(err)
         } 
         console.log(data)
         res.redirect("/order");//redirect 重定向
    })
     
  });

  //删除操作
router.get("/delete", function (req, res, next) {
  
    console.log('我现在进入/delete里面了')
    console.log(req.query)
  
    employees.deleteOne({ '_id': req.query._id }, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/order");
    })
    
  })

//修改操作
router.get("/update", function (req, res, next) {
    //get来的数据在req.query.id    拿到宇宙唯一id
    console.log(req.query)
  
    const _id = req.query._id;
    console.log("_id", _id);
  
    employees.findById({"_id":_id},(err,data)=>{
      if(err){
        console.log(err)
      }
      console.log('我现在到了/update修改数据路由')
      console.log(data)
      console.log(data._id)
      res.render('orderUpdate',{
        index:3,
        data:data
      })
    })
  
   
  });
  
  // 修改操作 - 更新数据
  router.post("/updateAction", function (req, res, next) {
    console.log('我在/updateAction里面')
    // 接收当前商品的数据
    const obj = req.body;
  
    console.log('obj_id',obj)
    employees.findByIdAndUpdate( obj._id,obj,(err,data)=>{
        if(err) {
          console.log(err)
        }
        console.log(data)
        res.redirect("/order");
  
    })
  
    
  }); 

  router.get("/search", (req, res, next) => {
    console.log("商品搜索路由 搜索数据")
    const obj = req.query;
    console.log(obj.search);
    let reg = new RegExp(obj.search);
    employees.find({name:reg},(err,data)=>{
      if(err){
        console.log(err)
      }
      console.log(data)
         res.render("order", {
         index: 3,
         data,
      });
    })
  
   
  });

module.exports = router;