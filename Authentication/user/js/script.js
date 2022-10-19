function submitForm() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('mobile').value;
    let password = document.getElementById('password').value;

    let error = '';

    if (firstName.length < 3) {
        error = 'Firstname length should be of minimum 3 characters';
        document.getElementById('firstName').focus();
        document.getElementById('errors').innerHTML = "<span style='color:red'> " + error + "</span>"
        return false;
    }
    else if (lastName.length < 3) {
        error = 'Lastname length should be of minimum 3 characters';
        document.getElementById('lastName').focus();
        document.getElementById('errors').innerHTML = "<span style='color:red'> " + error + "</span>"
        return false;
    }
    else if (validateEmail(email) === false) {
        error = 'Email address is incorrect ( enter gmail only)';
        document.getElementById('email').focus();
        document.getElementById('errors').innerHTML = "<span style='color:red'>" + error + "</span>"
        return false;
    }
    else if (validateMobile(mobile) === false) {
        error = 'Invalid mobile nummber (Include country code)';
        document.getElementById('mobile').focus();
        document.getElementById('errors').innerHTML = "<span style='color:red'>" + error + "</span>"
        return false;
    }
    else if (validatePassword(password) === false) {
        error = 'Enter a valid password <br/> Password needs to have 1 Block letter, 1 Special character and 1 number'
        document.getElementById('password').focus();
        document.getElementById('errors').innerHTML = "<span style='color:red'>" + error + "</span>"
        return false;
    }
    else {
        error = ''
        document.getElementById('errors').innerHTML = "<span>" + error + "</span>"
        return true;
    }

}

function validatePassword(password) {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(String(password).toLowerCase());
}

function validateMobile(mobile) {
    var re = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return re.test(String(mobile))
}

function validateEmail(email) {
    var re = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
    return re.test(String(email).toLowerCase());
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function handleProfile(uploader) {
    if(uploader.files[0].size > 2000000) {
        alert('Profile Image size should be less than 2mb');
        return;
    }
    let url = '';
    await getBase64(uploader.files[0]).then(res => {
        url = res
    })
    document.getElementById('profile_img').setAttribute('src', url)
}
