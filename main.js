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
    var zipcode = document.getElementById("zipcode");//Zipcode（寻找贷方)的ID
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
    /** 复杂的算术运算，这些复杂运算通过作为Math对象的属性定义的函数和常量来实现*/
    var x = Math.pow(1 + interest, payments);//Math.pow()进行幂次运算
    var monthly = (principal * x * interest) / (x - 1);//(X-1)


    //如果结果没有超过js能表示的数字范围之内，并且用户输入的也正确的话，所展示的结果就是合法的和正确的
    /**isFinite() 函数用于检查其参数是否是无穷大*/
    if (isFinite(monthly)) {
        //将数据填充至输出字段的位置,四舍五入到小数点后两位数字
        /**innerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML,改变文本, URL, 及链接目标,   toFixed() 方法可把 Number 四舍五入为指定小数位数的数字*/
        payment.innerHTML = monthly.toFixed(2);//每月支付四舍五入到两位
        total.innerHTML = (monthly * payments).toFixed(2);//付款总额四舍五入到两位
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);//总利息四舍五入到两位

        //将用户的输入数据存下来，这样在下次访问的时候也可以读取数据
        save(amount.value, apr.value, years.value, zipcode.value);


        //找到并展示本地房贷人,但忽略网络的错误
        try { //捕获这段代码抛出的所有的异常
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        }
        catch (e) {
            /*忽略这些异常部分*/
        }
        //最后，用图标展示贷款余额、利息和资产收益
        chart(principal, interest, monthly, payments);

    }
    else {
        //计算结果不是数字或者是无穷大，意味着输入数据是非或不完整的
        //清空之前的输出数据
        payment.innerHTML = "";//清空元素的文本内容
        total.innerHTML = "";//一样
        totalinterest.innerHTML = "";//同理
        chart();//不传参数的话，就是清楚图表
    }
}


//将用户的输入保存至localStorage对象的属性当中
//这些属性再一次访问还会继续保持在原有的位置中
//如果你是在浏览器当中按照file://URL的方式直接打开本地文件
//则无法在某些浏览器中使用存储功能（比如Firefox浏览器等）
//而通过HTML打开文件是可以的


/**2018.8.23*/
/**保存的方法名开始写方法就是给调用的方法单独一个一个去写这些方法执行的代码部分*/
function save(amount, apr, years, zipcode) {

    if (window.localStorage) { //只有你打开浏览器的时候才会执行这里的代码
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
}

/**2018.8.23*/
/*在文档首次加载的时候，将会尝试还原输入字段*/
window.onload = function () {
    //如果浏览器支持本地存储并且上次的保存是存在的
    if (window.localStorage && localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
}