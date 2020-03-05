const electron = require('electron');
const {ipcRenderer} = require('electron');
ipcRenderer.on("sendPlayersInitGame", function(e, args){
  console.log("Received request from main process to start")
  console.log(args)
  let playersList = document.getElementById("playerNamesVisual")
  for (let i=0; i< args.length; i++){
    let listEl = document.createElement("LI")
    listEl.innerText = args[i].Name
    playersList.append(listEl)
  }
  //Create players from json object 'args' here
})
class Board {
  tiles = [];
  players = []
  currentPlayer = null
  numOfPlayers;
  constructor(numberPlayers) {
    this.numOfPlayers = numberPlayers
  }
}

class Player {
  token; //string
  position; //int
  money; //int
  properties; //array of tile objects
  isTurn; //boolean
  doubleCount; //int
  passedGo; //boolean

  constructor(token, position, properties,isTurn){
    this.token = token;
    this.position = position;
    this.money = 1500;
    this.properties = properties;
    this.isTurn = isTurn;
    this.doubleCount = 0;
    this.passedGo = false;
  }

  spendMoney(amount){
    this.money = this.money - amount
  }

  receiveMoney(amount){
    this.money = this.money + amount
  }

  get getMoney(){
    return this.money
  }

  rollDice(){
    let min = 1;
    let max = 6;
    let roll_1 = Math.floor(Math.random() * (max - 1)) + 1;
    let roll_2 = Math.floor(Math.random() * (max - 1)) + 1;
    if (roll_1 == roll_2){
      this.doubleCount++;
      if(this.doubleCount >= 3){
        this.isTurn = false;
        // go to jail
      }
    }
    return roll_1 + roll_2
  }

  updatePosition(){
    this.position = this.position + rollDice()
  }

  ownedProperties(){
    return
  }
}

class Property {
  constructor(){

  }
}

class Tile{
  position; //int
  type; //string
  name; //string
  owner; //string
  canBuy;//bool
  isOwned; //bool
  hasAction; //bool
  cost; //int
  rent; //int
  houses; //int
  constructor(position, type, name, owner, canBuy, isOwned, hasAction, cost, rent, houses){
    this.position = position;
    this.type = type;
    this.name = name;
    this.owner = owner;
    this.canBuy = canBuy;
    this.isOwned = isOwned;
    this.hasAction = hasAction;
    this.cost = cost;
    this.rent = rent;
    this.houses = houses;
  }

  get getType(){
    return this.type
  }

  get getName(){
    return this.name
  }

  buy(){
    if(this.canBuy && !this.isOwned){
      //buy property
    }else{
      console.log("Property cannot be bought")
    }
  }
}
