var balance = 0
var cps = 1
var lastVisit = Date.now()
var cheese = document.getElementById('cheese')
var prices = {
  "cow": 10,                // 10
  "farm": 100,              // 100
  "factory": 1000,          // 1 thousand
  "city": 10000,            // 10 thousand
  "planet": 150000,         // 150 thousand
  "galaxy": 2000000,        // 2 million
  "universe": 50000000,     // 50 million
  "multiverse": 1000000000, // 1 billion
}

document.addEventListener('DOMContentLoaded', function() {
  balance = 0; cps = 0; lastVisit = Date.now();
  loadStats();
  document.getElementById('cheeseWheel').addEventListener('click', click);
  document.getElementById('save').addEventListener('click', saveDetails);
  document.getElementById('shop').addEventListener('click', loadShop);
  document.getElementById('reset').addEventListener('click', reset);
  document.getElementById('cps').innerText = cps;
});

// Every second update the balance
setInterval(function(){
  balance += cps/10;
  cheese.innerText = "🧀 " + balance.toFixed();
  cps.innerText = cps;
  if(document.getElementById('shop').innerText == "Back"){
    checkBuyables();
  }
}, 100);


function reset(){
  cps = 0;
  balance = 0;
  prices = {
    "cow": 10,                // 10
    "farm": 100,              // 100
    "factory": 1000,          // 1 thousand
    "city": 10000,            // 10 thousand
    "planet": 150000,         // 150 thousand
    "galaxy": 2000000,        // 2 million
    "universe": 50000000,     // 50 million
    "multiverse": 1000000000, // 1 billion
  };
  saveDetails();
}

// Every 20 seconds save the details
setInterval(function(){
  saveDetails();
}, 2000);

function checkBuyables(){
  for(var item in prices){
    if (balance >= prices[item]){
      document.getElementById(item).style.backgroundColor = "green";
    } else {
      document.getElementById(item).style.backgroundColor = "gray";
    }
  }
}

function addShopListeners(){
  document.getElementById('cow').addEventListener('click', function() { buy('cow'); });
  document.getElementById('farm').addEventListener('click', function() { buy('farm'); });
  document.getElementById('factory').addEventListener('click', function() { buy('factory'); });
  document.getElementById('city').addEventListener('click', function() { buy('city'); });
  document.getElementById('planet').addEventListener('click', function() { buy('planet'); });
  document.getElementById('galaxy').addEventListener('click', function() { buy('galaxy'); });
  document.getElementById('universe').addEventListener('click', function() { buy('universe'); });
  document.getElementById('multiverse').addEventListener('click', function() { buy('multiverse'); });
}

function removeShopListeners(){
  document.getElementById('cow').removeEventListener('click', buy('cow'));
  document.getElementById('farm').removeEventListener('click', buy('farm'));
  document.getElementById('factory').removeEventListener('click', buy('factory'));
  document.getElementById('city').removeEventListener('click', buy('city'));
  document.getElementById('planet').removeEventListener('click', buy('planet'));
  document.getElementById('galaxy').removeEventListener('click', buy('galaxy'));
  document.getElementById('universe').removeEventListener('click', buy('universe'));
  document.getElementById('multiverse').removeEventListener('click', buy('multiverse'));
}

function buy(item){
  if (balance >= prices[item]){
    balance -= prices[item];
    cps += prices[item] / 100;
    prices[item] *= 1.1;
    document.getElementById('cheese').innerText = balance.toFixed();
    document.getElementById('cps').innerText = cps.toFixed(2);
    document.getElementById(item).innerText = "🧀 " + prices[item].toFixed();
  } 
}

function loadShop(){
  console.log("Loading shop...");
  shopButton = document.getElementById('shop');
  if(shopButton.innerText == "Shop"){ // If not in the shop
    shopButton.innerText = "Back";
    document.getElementById('buttonAndShop').innerHTML = `
    <div class="shopItem">
        <p class="shopItemTitle">Cow</p>
        <button class="shopItemButton" id="cow">🧀 10</button>
      </div>
      <div class="shopItem">
        <p class="shopItemTitle">Farm</p>
        <button class="shopItemButton" id="farm">🧀 100</button>
      </div>
      <div class="shopItem">
        <p class="shopItemTitle">Factory</p>
        <button class="shopItemButton"id="factory">🧀 1 K</button>
      </div>
      <div class="shopItem">
        <p class="shopItemTitle">City</p>
        <button class="shopItemButton"id="city">🧀 10 K</button>
      </div>
      <div class="shopItem">
        <p class="shopItemTitle">Planet</p>
        <button class="shopItemButton" id="planet">🧀 150 K</button>
      </div>
      <div class="shopItem">
        <p class="shopItemTitle">Galaxy</p>
        <button class="shopItemButton" id="galaxy">🧀 2 M</button>
      </div>
      <div class="shopItem">
        <p class="shopItemTitle">Universe</p>
        <button class="shopItemButton" id="universe">🧀 50 M</button>
      </div>
      <div class="shopItem">
        <p class="shopItemTitle">Multiverse</p>
        <button class="shopItemButton" id="multiverse">🧀 1 B</button>
      </div>
    `;
    checkBuyables();
    addShopListeners();
  } else {
    removeShopListeners();
    shopButton.innerText = "Shop";
    document.getElementById('buttonAndShop').innerHTML = `
    <button id="cheeseWheel" type="button">🌙</button>
    `;
  }
}

function saveDetails(){
  console.log("Saving details... [balance, cps, lastVisit]: ", balance, cps, lastVisit);
  chrome.storage.local.set({balance: balance, cps: cps, lastVisit: lastVisit, prices: prices});
}

function loadStats(){
  chrome.storage.local.get('balance', function(result) {
    balance = result.balance;
    if (balance == null){
      balance = 0
    }
    console.log("Balance fetched, balance: ", balance);
  });

  chrome.storage.local.get('cps', function(result) {
    cps = result.cps;
    if (cps == null){
      cps = 0
    }
    console.log("cps fetched, cps: ", cps);
  });

  chrome.storage.local.get('lastVisit', function(result) {
    lastVisit = result.lastVisit;
    if (lastVisit == null){
      lastVisit = Date.now()
    }
    console.log("lastVisit fetched, lastVisit: ", lastVisit);
  });

  chrome.storage.local.get('prices', function(result) {
    if (result.prices != null){
      prices = result.prices;
    }
    console.log("lastVisit fetched, lastVisit: ", lastVisit);
  });

  document.getElementById('cheese').innerText = balance
}

function click(){
  balance += 1
  cheese.innerText = "🧀 " + balance.toFixed()
  console.log("Clicked! Balance: ", balance);
}