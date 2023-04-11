const trashList = document.querySelectorAll('.trash');
const likeList = document.querySelectorAll('.likes');

//event listener and function for POST
for (const list of trashList) {
  list.addEventListener('click', deleteQuote);
}

async function deleteQuote() {
  const authorName = this.parentNode.childNodes[1].textContent;
  const quotePassage = this.parentNode.childNodes[3].textContent;
  try {
    const response = await fetch('deleteQuote', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorName: authorName,
        quotePassage: quotePassage,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

//event listener and function for DELETE
for (const like of likeList) {
  like.addEventListener('click', addLike);
}

async function addLike() {
  const authorName = this.parentNode.childNodes[1].textContent;
  const quotePassage = this.parentNode.childNodes[3].textContent;
  const likes = Number(this.parentNode.childNodes[7].textContent);
  try {
    const res = await fetch('addLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorName: authorName,
        quotePassage: quotePassage,
        likes: likes,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}
