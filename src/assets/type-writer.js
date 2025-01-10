let a = ['Designer.', 'Entwickler.', 'Projektleiter.', 'Tester.', 'Generalist!', 'Ich...'];
let ref = document.getElementById('text');
let ind = 0,
  cInd = 0;
let remove = false;

function typing() {
  if (ind < a.length) {
    let currentText = a[ind];
    if (!remove && cInd < currentText.length) {
      ref.textContent += currentText.charAt(cInd);
      cInd++;
      setTimeout(typing, 100);
    } else if (remove && cInd >= 0) {
      ref.textContent = currentText.substring(0, cInd);
      cInd--;
      setTimeout(typing, 100);
    } else {
      remove = !remove;
      if (!remove) {
        ind = (ind + 1) % a.length;
      }
      setTimeout(typing, 1000);
    }
  }
}

typing();
