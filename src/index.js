import "./styles.css";
import TonWeb from "tonweb";

var tonweb;
var intervalo;

var hashCache = "Lcrlmb7Wt7pjNCkHoJWKEgJ8icIg0wXnEWEf6xTNVYw=";

function initTonweb() {
  const tonProvider = new TonWeb.HttpProvider(
    "https://toncenter.com/api/v2/jsonRPC"
  );
  tonweb = new TonWeb(tonProvider);
}

async function getTransaction() {
  var wallet1cache = [];
  const wallet1 = await tonweb.getTransactions(
    "EQACfx5ANBVRnSaqru8Y_BINdCoEpbbPYsCmOUDyHalSvOmI"
  );

  if (!hashCache) {
    hashCache = wallet1[0].transaction_id.hash;
  } else {
    for (let wallet of wallet1) {
      // wallet1.forEach((wallet) => {
      if (wallet.transaction_id.hash === hashCache) break;

      wallet1cache.push(wallet);
    }
    if (wallet1cache.legth) {
      hashCache = wallet1[0].transaction_id.hash;
    }
  }

  return wallet1cache;
}

async function tonWallet() {
  // intervalo = setInterval(getTransaction, 5000);
  const walletStatus = await getTransaction();
  console.log("walletStatus", walletStatus);
}

initTonweb();
tonWallet();

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
`;
