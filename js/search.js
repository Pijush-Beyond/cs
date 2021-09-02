document.forms[0].addEventListener('submit',function(e){
  let flag=true;

  if(!this.checkValidity()){
    [...this].forEach(input=>{
      if(input.validity.valueMissing) input.nextElementSibling.innerText = `Please enter your ${input.previousElementSibling.innerText}.`;
      else if (input.validity.patternMismatch) {input.nextElementSibling.innerText = 'We provide service only the places metioned in drop down.'; console.log(input.validity);}
      else if(input.validity.rangeUnderFlow) input.nextElementSibling.innerText = `You can book only for on or after current time`;
    })
    flag = false;
  }

  if (this[0].value === "Bus" && this.querySelector('#pickup').value === this.querySelector('#dropoff').value){
    this.querySelector('#pickup').classList.add('is-invalid','text-danger','border-danger');
    this.querySelector('#pickup').nextElementSibling.innerText = "Drop Location and pick up location must be different";
    this.querySelector('#dropoff').classList.add('is-invalid','text-danger','border-danger');
    this.querySelector('#dropoff').nextElementSibling.innerText = "Drop Location and pick up location must be different";
    flag=false
  }else if (this[0].value === "Bus" && this.querySelector('#pickup').value !== this.querySelector('#dropoff').value){
    this.querySelector('#pickup').classList.remove('is-invalid','text-danger','border-danger');
    this.querySelector('#dropoff').classList.remove('is-invalid','text-danger','border-danger');
    this.querySelector('#pickup').nextElementSibling.innerText = "Please provide your pick-up point";
    this.querySelector('#dropoff').nextElementSibling.innerText = "Please provide your drop point";
  } else if (this[0].value !== "Bus" && new Date(this.querySelector('#pickupDate').value) >= new Date(this.querySelector('#dropoffDate').value) ){
    this.querySelector('#pickupDate').classList.add('is-invalid','text-danger','border-danger');
    this.querySelector('#pickupDate').nextElementSibling.innerText = "Pick-up date must not be less then or equal to drop date";
    this.querySelector('#dropoffDate').classList.add('is-invalid','text-danger','border-danger');
    this.querySelector('#dropoffDate').nextElementSibling.innerText = "drop date must not be greater than to pick-up date";
    flag = false;
  } else if (this[0].value !== "Bus" && new Date(this.querySelector('#pickupDate').value) < new Date(this.querySelector('#dropoffDate').value)){
    this.querySelector('#pickupDate').classList.remove('is-invalid', 'text-danger', 'border-danger');
    this.querySelector('#dropoffDate').classList.remove('is-invalid', 'text-danger', 'border-danger');
    this.querySelector('#pickupDate').nextElementSibling.innerText = "Please provide your pick-up date";
    this.querySelector('#dropoffDate').nextElementSibling.innerText = "Please provide your drop date";
  }

  if(!flag){
    e.preventDefault();
    e.stopPropagation();
  }
  this.classList.add('was-validated');
},false)

document.forms[0][0].onchange = function(){
  if (this.value=="Bus"){
    document.forms[0].classList.add('search-form');
    document.forms[0].querySelector('.bus>input').required = true;
    [...document.forms[0].querySelectorAll('.bus-hidden input[type="date"]')].forEach(tag=>tag.required = false);
  }
  else{
    document.forms[0].classList.remove('search-form');
    document.forms[0].querySelector('.bus>input').required = false;
    [...document.forms[0].querySelectorAll('.bus-hidden input[type="date"]')].forEach(tag => tag.required = true);
  }
  const v = this.value;
  document.forms[0].reset();
  document.forms[0].classList.remove('was-validated');
  [...document.querySelectorAll('is-invalid.text-danger.border-danger')].forEach(tag => tag.classList.remove('is-invalid', 'text-danger', 'border-danger'));
  this.value = v;
};

[...document.querySelectorAll('input[type=date], input[type="datetime-local"]')].forEach(tag=>{
  const currDate = new Date();
  tag.min = `${currDate.getFullYear()}-${toDigit(currDate.getMonth()+1)}-${toDigit(currDate.getDate())}${tag.type === 'datetime-local' ? `T${toDigit(currDate.getHours())}:${toDigit(currDate.getMinutes())}`:''}`;
})

function toDigit(num){
  return num.toString().length === 1 ? `0${num.toString()}` : num.toString();
}