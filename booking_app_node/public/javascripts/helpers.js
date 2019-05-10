function getHomePage() {
  var ul = document.createElement('UL');
  var li1 = document.createElement('LI');
  var li2 = document.createElement('LI');
  var link1 = document.createElement('A');
  var link2 = document.createElement('A');
  link1.setAttribute('id', '1');
  link2.setAttribute('id', '2');
  link1.setAttribute('href', '#');
  link2.setAttribute('href', '#');
  link1.text = '1: Retrieve Schedules';
  link2.text = '2: Add Staff';
  li1.appendChild(link1);
  li2.appendChild(link2);
  ul.appendChild(li1);
  ul.appendChild(li2);
  document.body.appendChild(ul);
}

function addScript(src) {
  var script = document.createElement('SCRIPT');
  script.setAttribute('src', src)
  document.head.appendChild(script);
}

function setAddingStaffForm() {
  var form = document.createElement('FORM');
  document.body.appendChild(form);

  var labelEmail = document.createElement('LABEL');
  labelEmail.setAttribute('for', 'email');
  labelEmail.textContent = 'Email';
  form.appendChild(labelEmail);

  var emailInput = document.createElement('INPUT');
  emailInput.setAttribute('id', 'email');
  form.appendChild(emailInput);

  var labelName = document.createElement('LABEL');
  labelName.setAttribute('for', 'name');
  labelName.textContent = 'Name';
  form.appendChild(labelName);

  var nameInput = document.createElement('INPUT');
  nameInput.setAttribute('id', 'name');
  form.appendChild(nameInput);

  var submit = document.createElement('INPUT');
  submit.setAttribute('type', 'submit');
  form.appendChild(submit);
}