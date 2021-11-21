const people = document.getElementById("people");
const radios = document.getElementsByName("tip");
const bill = document.getElementById("bill");
let tipPercentage = "";
let totalTip = 0;
let tipPerPerson = 0;
let totalPerPerson = 0;
let billAmount = 0;
let peopleCount = 0;
let tips;
const x = document.getElementById("tip-amount");
const y = document.getElementById("total");
const custom = document.getElementById("custom-tip");
const reset = document.getElementById("reset");
let btnClicked = false;

for (let radio of radios) {
  radio.classList.add("inactive");

  radio.addEventListener("click", function () {
    billAmount = bill.value;
    tips = this;
    btnClicked = true;

    if (billAmount === "") {
      bill.classList.add("error");
      document.getElementById("msg").innerHTML = "Please fill bill amount";
    } else if (billAmount === "0") {
      bill.classList.add("error");
      document.getElementById("msg").innerHTML = "Amount can't be zero";
    } else {
      bill.classList.remove("error");
      document.getElementById("msg").innerHTML = "";
      this.classList.replace("inactive", "active");
      tipPercentage = this.value.slice(0, -1);
    }
  });
}

custom.addEventListener("keyup", function () {
  tipPercentage = custom.value;
  for (let radio of radios) {
    if (radio.classList.contains("active")) {
      radio.classList.remove("active");
    }
  }
});

people.addEventListener("keyup", function () {
  billAmount = bill.value;
  peopleCount = this.value;

  if (peopleCount === "0") {
    people.classList.add("error");
    document.getElementById("people-msg").innerHTML = "Can't be zero";
  } else if (peopleCount === "") {
    people.classList.add("error");
    document.getElementById("people-msg").innerHTML = "Can't be empty either";
  } else {
    people.classList.remove("error");
    document.getElementById("people-msg").innerHTML = "";
    totalTip = Math.round(billAmount * tipPercentage * 0.01 * 100) / 100;
    tipPerPerson = Math.round((totalTip / peopleCount) * 100) / 100;
    totalPerPerson =
      Math.round((billAmount / peopleCount + tipPerPerson) * 100) / 100;

    x.innerHTML = tipPerPerson;
    y.innerHTML = totalPerPerson;
    reset.classList.add("active");
  }
});

reset.addEventListener("click", function () {
  bill.value = "";
  people.value = "";
  if (btnClicked === true) {
    if (tips.classList.contains("active")) {
      tips.classList.remove("active");
    }
  }
  custom.value = "";
  x.innerHTML = "0.00";
  y.innerHTML = "0.00";
});
