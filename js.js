// scripts.js
document.getElementById('openPopup').addEventListener('click', function () {
  openPopup();
});

document.getElementById('closePopup').addEventListener('click', function () {
  closePopup();
});

document.getElementById('closeInfoPopup').addEventListener('click', function () {
  document.getElementById('infoPopup').style.display = 'none';
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const index = document.getElementById('contactIndex').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  if (index === "") {
    addContact({ name, phone });
  } else {
    updateContact(index, { name, phone });
  }
  closePopup();
});

let contacts = [];

function openPopup(index = "") {
  document.getElementById('contactIndex').value = index;
  document.getElementById('popupTitle').textContent = index === "" ? "Create Contact" : "Edit Contact";
  document.getElementById('name').value = index === "" ? "" : contacts[index].name;
  document.getElementById('phone').value = index === "" ? "" : contacts[index].phone;
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function addContact(contact) {
  contacts.push(contact);
  renderContacts();
}

function updateContact(index, contact) {
  contacts[index] = contact;
  renderContacts();
}

function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts();
}

function deleteContacts() {
  contacts = [];
  renderContacts();
}

function renderContacts() {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const contactItem = document.createElement('li');
    contactItem.className = 'contact-item';

    const contactDetails = document.createElement('div');
    contactDetails.className = 'contact-details';
    contactDetails.innerHTML = `<span>${contact.name}</span><br><span>${contact.phone}</span>`;

    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    buttons.innerHTML = `
      <button onclick="showInfo(${index})">More info</button>
      <button onclick="openPopup(${index})">Edit contact</button>
      <button onclick="deleteContact(${index})">Delete contact</button>
    `;

    contactItem.appendChild(contactDetails);
    contactItem.appendChild(buttons);
    contactList.appendChild(contactItem);
  });
}

function showInfo(index) {
  const contact = contacts[index];
  const infoContent = `
    <strong>Name:</strong> ${contact.name}<br>
    <strong>Phone:</strong> ${contact.phone}
  `;
  document.getElementById('infoContent').innerHTML = infoContent;
  document.getElementById('infoPopup').style.display = 'flex';
}

document.getElementById('deleteAllContacts').addEventListener('click', function () {
  deleteContacts();
});

const initialContacts = [
  { name: 'Stephanos khoury', phone: '+972 53-229-4552' },
  { name: 'Rula elias', phone: '+972 53-239-6136' },
  { name: 'Elias dabbagh', phone: '+972 52-733-7552' }
];

initialContacts.forEach(contact => addContact(contact));
