module.exports.addTwoNumbers=function(req,res){
    var urlNumber=parseInt(req.params.num1);
    var queryStringNumber=parseInt(req.query.n2);
    var sum=urlNumber + queryStringNumber;
    
    var total="sum of "+ urlNumber + " + "+queryStringNumber+" = "+sum;
    console.log("Sum of two numbers is ",total);
    res.status(200).json(total);
}
