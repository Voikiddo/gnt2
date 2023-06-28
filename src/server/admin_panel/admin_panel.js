const root = "http://localhost:8080"
let Data
//AddButtons()

const FetchData = async () => {
    console.log(root+'/data');
    await fetch(root+'/data')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(typeof data);
            Data = data
            HandleResponse(data)
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    
    return
}

const HandleResponse = (Data) => {
    let mainDiv = document.getElementById("main")

    if (Data.length === 0) {
        mainDiv.innerHTML = "The game just started, no player data yet!"
        return
    }

    const newList = document.createElement('ul')
    for (let player of Data) {
        mainDiv.innerHTML = ""
        const node = document.createElement('li');
        const textnode = document.createTextNode(player.nickname)
        node.appendChild(textnode);
        newList.appendChild(node);
    }
}

const AddButtons = (mainDiv) => {
    let AddPlayerBtn = document.createElement("button");
    AddPlayerBtn.innerHTML = "Add Player"
    btn.onclick = () => {
        alert("Button is clicked");
        //AddPlayer("voik", "Aqua")
        FetchData()
    };
    mainDiv.appendChild(btn);
}
