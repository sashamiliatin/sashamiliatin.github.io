function WriteUsers(user , score1 , errors1 , attempts1) {
    var obj = {user: user, score: score1, error: errors1, attempts: attempts1};

    $.ajax({
        type: "POST",
        url: "test.php",
        dataType: "json",
        data: {
            json: JSON.stringify(obj)
        }
    });
}