export function validatePhone(rule, value, callback) {
    const reg = /^[1][3-9][0-9]{9}$/;
    if (value == '' || value == undefined || value == null) {
      callback();
    } else {
      if ((!reg.test(value))&& value!='') {
        callback(new Error('抱歉手机号不合法'));
      }else{
        callback();
      }
    }
  }

  export function validateEmail(rule, value,callback) {
    const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else{
      if (!reg.test(value)){
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    }
  }

  export function validatePassword(rule,value,callback){
    const reg =/^[_a-zA-Z0-9]{6,20}$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else{
      if (!reg.test(value)){
        callback(new Error('密码格式错误'));
      } else {
        callback();
      }
    }
  }

  export function validateUsername(rule,value,callback){
    const reg =/^[_a-zA-Z0-9]{5,10}$/;
    if(value==''||value==undefined||value==null){
      callback();
    }else{
      if (!reg.test(value)){
        callback(new Error('用户名格式错误'));
      } else {
        callback();
      }
    }
  }