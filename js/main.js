// all inputs
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')



// to say welcome in home page
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') != null) {
    signUpArray = JSON.parse(localStorage.getItem('users'))
} 

// for check email is exist
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}
function signUp() {
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        
    }
    else if (regx() == false ) {
        document.getElementById('exist').innerHTML = "This mail is not valid"
    } else if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = "This mail is exist"
    }  
    else {
        signUpArray.push(signUp)
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        clear()
    }
    localStorage.setItem('users', JSON.stringify(signUpArray))


}
function clear(){
    
    signupName.value=''
    signupEmail.value=''
    signupPassword.value=''

}
function regx(){
    var Regex =/^[a-zA-z0-9]{1,}(@)(yahoo|gmail|outlook)(.)(c)(o)(m)$/;
    var emailValue= signupEmail.value;
    if(Regex.test(emailValue) == true){
    return true;
    }else{ 
    return false
    }
}




// ============= for login================
function login() {
    if (signinPassword.value == "" || signinEmail.value == "") {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
      
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            window.location.assign("home.html")
           
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}

 function logout() {
    localStorage.removeItem('sessionUsername')
} 



