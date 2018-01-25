function validateEmail(email) {
  return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email)
}

function emailAddressHandler() {
  var emailInput = document.getElementById('newsletter-email')
  var sendButton = document.getElementById('newsletter-submit')

  sendButton.disabled = !validateEmail(emailInput.value)
}

function ajaxHandler() {
  // There is no need to check the status code since it _should_ always work
  if (this.readyState == 4) {
    document.getElementById('subscribed').style.display = 'block'
  }
}

function subscrireToNewsletter() {
  emailAddressHandler()

  var emailInput = document.getElementById('newsletter-email')

  // If the email address is valid
  if (validateEmail(emailInput.value)) {
    var xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = ajaxHandler
    xhttp.open('POST', 'https://www.freelists.org/cgi-bin/subscription.cgi', true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhttp.send('action=subscribe&list=binogure-studio&email=' + encodeURI(emailInput.value))
  }
}
