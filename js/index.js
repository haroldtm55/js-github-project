const form = document.getElementById('github-form')
const textBox = document.getElementById('search')
const userList = document.getElementById('user-list')
const reposList = document.getElementById('repos-list')
form.addEventListener('submit',(event) => {
  event.preventDefault()
  userList.innerHTML = ''
  reposList.innerHTML = ''
  userList.style.listStyle = 'square'

  fetch(`https://api.github.com/search/users?q=${textBox.value}`)
  .then(response => response.json())
  .then(users => {
    console.log(users.items[0].login)
    form.reset()
    renderUsers(users)
    const userNames = document.getElementsByClassName('username')
    for (let i = 0; i<= userNames.length-1; i++) {
      userNames[i].addEventListener('click', (e) => {
        reposList.innerHTML = ''
        fetch(`https://api.github.com/users/${userNames[i].textContent}/repos`)
        .then(response => response.json())
        .then(repos => {
          console.log(repos)
          renderRepos(repos)

        })
      })
    }
  })
})
function renderUsers(json) {
  for (element of json.items) {
    userList.appendChild(document.createElement('li')).classList.add('userList')
  }
  for (let element of document.getElementsByClassName('userList')) {
    element.appendChild(document.createElement('p')).classList.add('username')
    element.appendChild(document.createElement('img')).classList.add('avatar')
    element.appendChild(document.createElement('a')).classList.add('profile-url')
  }
  for (let i=0; i<=json.items.length -1; i++) {
    document.getElementsByClassName('username')[i].textContent = json.items[i].login
    document.getElementsByClassName('avatar')[i].src = json.items[i].avatar_url
    document.getElementsByClassName('profile-url')[i].setAttribute('href',`${json.items[i].html_url}`)
    document.getElementsByClassName('profile-url')[i].setAttribute('target','_blank')
    document.getElementsByClassName('profile-url')[i].textContent = json.items[i].html_url
  }
}
function renderRepos(json) {
  for (let element of json) {
    reposList.appendChild(document.createElement('li')).classList.add('repoList')
  }
  let i=0
  for (let element of document.getElementsByClassName('repoList')) {
    element.appendChild(document.createElement('a')).classList.add('repo-url')
    document.getElementsByClassName('repo-url')[i].setAttribute('href',`${json[i].html_url}`)
    document.getElementsByClassName('repo-url')[i].setAttribute('target','_blank')
    document.getElementsByClassName('repo-url')[i].textContent = json[i].html_url
    i+=1
  }
}