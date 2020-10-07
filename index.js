$(document).ready(function(){

    CheckPage();

    $("#signin").click(function(){
        Login();
    })
    $("#logout").click(function(){
        LogOut();
    })
})


function Login() {
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();

    var data  = {
        "email" : email,
        "password" : password
    };
    
    $.ajax({
        url:'https://firebaseapi.herokuapp.com/GetTokenByEmail',
        method:'POST',
        dataType:'json',
        contentType : 'application/json; charset=utf-8',
        data:JSON.stringify(data),
        complete:function(res){

            console.log(res );
            if ( res.status == 200 ) {
                msg(true, "登入成功");
                localStorage.setItem('token', res.responseJSON.msg);
                CheckPage();
            } else {
                msg(false, "登入失敗");
            }

        }
    });
}

function GetData() {
    var token = localStorage.getItem('token');
    $.ajax({
        url:'https://firebaseapi.herokuapp.com/GetData',
        method:'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token );
        },
        complete:function(res){
            console.log(res );
            if ( res.status == 200 ) {
                $("#result").children("p").empty().text(res.responseJSON.msg);
            } else {
                msg(false, "取得資料失敗");
            }
        }
    });
}


function msg(issuccess, msg ){

    if ( issuccess ) {
        $("#msg").removeClass('alert-danger').addClass('alert-success').empty().text(msg).show();
        setTimeout(function(){
            $("#msg").hide();
        },2000);
    } else {
        $("#msg").removeClass('alert-success').addClass('alert-danger').empty().text(msg).show();
    }
   
}


function LogOut() {
    localStorage.clear();
    CheckPage();
}

function CheckPage() {
    
    var token = localStorage.getItem('token');
    console.log(token);
    $("#token").empty().text(token);
    if ( token != null ) {
        GetData();
        $('.form-signin').hide();
        $('#result').show();
    } else  {
        $('.form-signin').show();
        $('#result').hide();
    }

}