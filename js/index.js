function main() {
    document.addEventListener('DOMContentLoaded', function(){
        addNewMonsterBtnListener()
        fetchMonsters()
    })
}

function fetchMonsters(limit='20', page='1') {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(resp => resp.json())
        .then(monsterObjs => renderMonsters(monsterObjs))
}

function renderMonsters(monsterObjs){
    monsterObjs.forEach(monster => renderMonster(monster))
}

function renderMonster(monsterObj){
    const monContainerDiv = document.querySelector('div#monster-container')
    const monDiv = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.innerText = monsterObj.name

    const h4 = document.createElement('h4')
    h4.innerText = 'Age: ' + monsterObj.age

    const p = document.createElement('p')
    p.innerText = 'Bio: ' + monsterObj.description


    monDiv.append(h2, h4, p)
    monContainerDiv.appendChild(monDiv)
}

function addNewMonsterBtnListener() {
    const newMonsterDiv = document.querySelector('div#create-monster')
    const newMonsterBtn = newMonsterDiv.children[6]
    newMonsterBtn.addEventListener('click', (e) => {
        // it is correctly targeting the buttton.
        // when clicked, get values from input fields, 
        // create object to pass as body in postNewMonster function 
        e.preventDefault()
        
        const newMonsterData = {
            name: e.target.parentNode.children[0].value,
            age: e.target.parentNode.children[2].value,
            description: e.target.parentNode.children[4].value
        }
        
        postNewMonster(newMonsterData)
    })
    
}

function postNewMonster(newMonsterData){
    reqObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newMonsterData)
    }

    fetch('http://localhost:3000/monsters', reqObj)
        .then(resp => resp.json())
        .then(monObj => renderMonster(monObj))
}

main()