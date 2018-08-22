<!--2018.8.22pm
1、如何在文档中查找元素；
2、如何通过表单input元素来获取用户的输入数据；
3、如何通过文档元素来设置HTML内容；
4、如何将数据存储在浏览器当中；
5、如何使用脚本发起http请求；
6、如何利用<canvas>元素绘图。
-->

/**
 *2018.8.22Pm
 * author：zhengguohai
 */


/**在输入input的时候调用该方法到HTML当中去*/
function calculate() {

    //查找文档中用于输入和输出的元素
    var amount = document.getElementById("amount"); //贷款金额（$)输出的id
    var apr = document.getElementById("apr"); //年利率（％）的ID
    var years = document.getElementById("years");//还款期（年）的ID
    var zipcde = document.getElementById("zipcode");//Zipcode（寻找贷方)的ID
    var payment = document.getElementById("payment");//每月支付的ID
    var total = document.getElementById("total");//付款总额的ID
    var totalinterest = document.getElementById("totalinterest");//总利息的ID


    //假设所有的输入都是合法的话，那么将从input元素当获取输入的数据
    //将百分比格式转换为小数格式，并从年利润转化为月利率
    //将年度赔付转换为月度赔付
    var principal = parseFloat(amount.value);//principal：主要 parseFloat() 函数可解析一个字符串，并返回一个浮点数。parseInt() 函数可解析一个字符串，并返回一个整数。
    var interest = parseFloat(apr.value) / 100 / 12; //interest：感兴趣
    var payments = parseFloat(years.value) * 12; //payments:支付


    //现在开始计算月度赔付的数据
    

}