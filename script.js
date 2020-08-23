
let numCharsSelected = undefined;

const setActiveButton = (id) => {
  document.querySelectorAll('[data-btn="numCharsBtn"]').forEach((element) => {
    element.classList.remove('active')
  })
  document.querySelector(`[data-btnid="${id}"`).classList.add('active')
}

const clear = () => {
  document.getElementById('tbody').innerHTML = ''
  document.getElementById('chars').value = ''
  document.getElementById('numChars').value = ''
}

const createTable = (foundWords) => {
  let html = ''
  for (let i=0; i < foundWords.length; i++) {
    html += `<tr><td>${foundWords[i]}</td></tr>`
  }
  document.getElementById('tbody').innerHTML = html
}

const getAllWordsWithNumChars = (numChars) => {
  return words.filter(word => word.length === numChars);
}

const getAllWordsThatMatchChars = (chars, filteredWords) => {
  return filteredWords.filter((word) => {
    let copiedChars = [...chars];
    return [...word].every((charInWord) => {
      const index = copiedChars.indexOf(charInWord);
      if (index >= 0) {
        copiedChars.splice(index, 1);
        return true;
      } else {
        return false;
      }
    });
  });
}

const haxx = (chars, numChars) => {
  const filteredWords = getAllWordsWithNumChars(numChars)
  const matchedWordsWithChars = getAllWordsThatMatchChars(chars, filteredWords)
  
  createTable(matchedWordsWithChars)
}

const onSubmit = () => {
  const chars = document.getElementById('chars')
  const numChars = document.getElementById('numChars')

  if (chars.length === 0 || numChars.length === 0) {
    return
  }

  haxx(chars.value, Number(numChars.value))
}