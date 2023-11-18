// variable declarations for selectors
var hamburger = document.querySelector(".hamburger"),
    headerNav = document.querySelector(".navbar"),
    activeNavBar = document.querySelectorAll(".nav-list li"),
    menuFilter = document.querySelectorAll(".menu-list-filter li"),
    menuData = document.querySelectorAll(".menu-list-items li"),
    prevNextBtn = document.querySelectorAll(".prev-next-btn button"),
    yourName = document.querySelector(".name-input"),
    email = document.querySelector(".email-input"),
    phoneNumber = document.querySelector(".ph-number-input"),
    textMessage = document.querySelector(".textarea-input textarea"),
    sendMessageBtn = document.querySelector(".send-msge-btn"),
    subscribeInput = document.querySelector(".subscribe-input"),
    subscribeBtn = document.querySelector(".subscribe-btn"),
    videoModal = document.querySelectorAll(".watch-video"),
    modalPopup = document.querySelectorAll(".feed-list li img"),
    modal = document.querySelector(".modal-content"),
    modalSection = document.querySelector(".modal"),
    closeModal = document.querySelector(".close");

// global variables declaration
var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    slideIndex = 0;

// global func calls
//  hamberger remove active class 
hamburger.classList.remove("active-nav");
headerNav.classList.remove("active-nav");

showSlides(slideIndex);

// global event
window.onclick = function (event) {
    if (event.target == modalSection) {
        modalSection.classList.remove("active");
    }
}

// event declaration starts
yourName.addEventListener("focusout", function () { checkName() });
email.addEventListener("focusout", function () { checkEmail(email) });
phoneNumber.addEventListener("focusout", function () { checkPhone() });
message.addEventListener("focusout", function () { checkMessage() });
subscribeInput.addEventListener("focusout", function () { checkEmail(subscribeInput) });

// hamberger event 
hamburger.addEventListener("click", function () {
    var html = document.querySelector("html");
    hamburger.classList.toggle("active-nav");
    headerNav.classList.toggle("active-nav");

    if (hamburger.classList.contains("active-nav")) {
        // Disable scroll
        html.classList.add("hidden");
    } else {
        // Enable scroll
        html.classList.remove("hidden");
    }
});

menuFilter.forEach(function (element) {
    element.addEventListener("click", function () {
        menuItmeFilter(element)
    })
})

prevNextBtn.forEach(function (element) {
    element.addEventListener("click", function () {
        var getUserData = element.getAttribute("data-slider");
        plusSlides(getUserData)
    })
})

subscribeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e)

    if (validSubscription()) {
        emptyFormFields();
        alert("Your message is submitted successfully!");
    }
})

sendMessageBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (validateFields()) {
        emptyFormFields();
        alert("Your message is submitted successfully!");
    }
});

// modal open event 
modalPopup.forEach(function (el) {
    el.addEventListener("click", function () {
        var imgSource = el.getAttribute("src"),
            imgTag = `<img src="" alt="">`;
        modal.innerHTML = imgTag;

        var getImageTagsrc = document.querySelector(".modal-content img");
        getImageTagsrc.setAttribute('src', imgSource);
        modalSection.classList.add("active")
    })
})


videoModal.forEach(function (el) {
    el.addEventListener("click", function (e) {
        var videoSource = el.querySelector("source"),
            videosrc = videoSource.getAttribute("src"),
            videoTag = `<video class="watch-video" controls>
            <source src="assets/images/mixkit-fresh-sliced-fruit.mp4" type="video/mp4">
            Your browser does not support the video.
          </video>`
        modal.innerHTML = videoTag;

        var getVideoTagsrc = document.querySelector(".modal-content video source");
        getVideoTagsrc.setAttribute('src', videosrc);
        modalSection.classList.add("active")
    })
})

// modal close event
closeModal.addEventListener("click", function () {
    modalSection.classList.remove("active");
})

// function declarations starts

function menuItmeFilter(element) {
    var removeActiveClass = document.querySelector(".active-item"),
        filterAtr = element.innerText.toLowerCase();

    removeActiveClass.classList.remove("active-item");
    element.classList.add("active-item");

    menuData.forEach(function (data) {
        var getFilteredData = data.getAttribute("data-food").toLowerCase();

        if (getFilteredData.includes(filterAtr)) {
            data.classList.remove("hidden")
        } else {
            data.classList.add("hidden")
        }
    })
}

function plusSlides(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".review-list li");
    if (n == 1) { slideIndex = -1; }
    if(n == -1) { slideIndex = 0; }
    for (i = 0; i < slides.length; i++) {
        // slides[i].style.display = "none";
        slides[i].style.transform = `translateX(${slideIndex * 100}%)`
    }
}

// form validation
function validateFields() {
    var isValidName = checkName(),
        isValidEmail = checkEmail(email),
        isValidPhone = checkPhone(),
        isValidMessage = checkMessage();

    // check all form fields are valid or not
    if (!isValidName || !isValidEmail || !isValidPhone || !isValidMessage) {
        return false;
    } else {
        return true;
    }
}

function validSubscription() {
    var isValidSubscription = checkEmail(subscribeInput);
    console.log("object")
    if (!isValidSubscription) {
        return false;
    } else {
        return true;
    }
}

function checkName() {
    var nameValue = yourName.value.trim();

    if (nameValue === "") {
        var errorText = "*Name is required!",
            errorParent = yourName.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (nameValue.length < 3) {
        var errorText = "*Name should be greater than 3 characters!",
            errorParent = yourName.parentElement;

        showError(errorText, errorParent);
        return false;

    } else if (!isNaN(nameValue)) {
        var errorText = "*Please enter valid name!",
            errorParent = yourName.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(yourName);
        return true;
    }
}

function checkEmail(emailInput) {
    var emailValue = emailInput.value.trim();

    if (emailValue === "") {
        var errorText = "*Email is required!",
            errorParent = emailInput.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (emailValue.match(emailPattern) == null) {
        var errorText = "*Please enter valid email!",
            errorParent = emailInput.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(emailInput);
        return true;
    }
}

function checkPhone() {
    var contactValue = phoneNumber.value.trim();

    if (contactValue === "") {
        var errorText = "*Phone number is required!",
            errorParent = phoneNumber.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (contactValue.length > 10 || contactValue.length < 10) {
        var errorText = "*Phone number must be 10 digit long!",
            errorParent = phoneNumber.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else if (contactValue.length === 10) {
        showSuccess(phoneNumber);
        return true;
    }
}

function checkMessage() {
    var messageValue = message.value.trim();

    if (messageValue === "") {
        var errorText = "*Please enter some message!",
            errorParent = message.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (messageValue.length < 8) {
        var errorText = "*Message should be greater than 8 characters!",
            errorParent = message.parentElement;

        showError(errorText, errorParent);
        return false;
    }
    else {
        showSuccess(message);
        return true;
    }
}

function showError(errorText, errorParent) {
    var showError = errorParent.querySelector(".error-text");
    if (showError && !null) {
        showError.remove();
    }
    var p = document.createElement("p");
    p.innerText = errorText;
    errorParent.appendChild(p);
    p.classList.add("error-text")

    errorParent.classList.add("error");
    errorParent.classList.remove("success");
}

function showSuccess(element) {
    var successParent = element.parentElement,
        showError = successParent.querySelector(".error-text");

    if (showError) {
        showError.remove();
    }

    successParent.classList.add("success");
    successParent.classList.remove("error");
}

// empty contact input fields
function emptyFormFields() {
    firstName.value = "";
    lastName.value = "";
    subject.value = "";
    email.value = "";
    message.value = "";
}

// finction declarations ends

// function declarations ends