var express = require('express');
var router = express.Router();
const user = require('../sql/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  user.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

    res.render('user', {
      index:2,
      data:data
    });
  })
  
});

//添加用户
router.get("/add", function (req, res, next) {
  res.render("useradd", {
    index: 2,
  });
});

router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;
  console.log(obj);
  user.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/user");//redirect 重定向
  })
   
});

//删除操作
router.get("/delete", function (req, res, next) {
  
  console.log('我现在进入/delete里面了')
  console.log(req.query)

  user.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })
  
})

//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);

  user.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate',{
      index:2,
      data:data
    })
  })

 
});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  obj.price = Number(obj.price);
  obj.stock = parseFloat(obj.stock);
  obj.discount = obj.discount - 0;
  obj.sales = obj.sales - 0;
  obj.score = obj.score * 1;
  console.log('obj_id',obj)
  user.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/user");

  })

  
});

router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
  console.log(obj.search);
  let reg = new RegExp(obj.search);
  user.find({username:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 2,
       data,
    });
  })

 
});

module.exports = router;
