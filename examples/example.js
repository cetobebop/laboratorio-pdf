const btn = document.getElementById("btn");
const p = document.getElementById("disparado");
const pGlobalStatus = document.getElementById("status");
let globalStatus = false;
const divList = registerDivs();

// addfunc(divList, onChange, "onChange");

function hasAnError(status) {
  if (status === "bad") {
    updateGlobalStatus(status);
    globalStatus = true;
  }
}

function onChange(callback) {
  callback;
}

function registerDivs() {
  return document.querySelectorAll("div");
}

function updateGlobalStatus(status) {
  pGlobalStatus.textContent = status;
}

function addfunc(nodeList, func, name) {
  nodeList.forEach((e) => {
    e[name] = func;
  });
}
async function getStatus(nodeList) {
  let nodeStatus;
  const arrayNodes = Array.from(nodeList);
  return new Promise((res) => {
    let status;

    const interval = setInterval(() => {
      nodeStatus = arrayNodes.map((e) => e.textContent);
      if (nodeStatus.includes("bad")) {
        status = "bad";
        clearInterval(interval);
        res(status);
      } else {
        status = nodeStatus.includes("pending");
        if (!status) {
          status = "fine";
          clearInterval(interval);
          res(status);
        }
      }
    }, 1000);
  });
}

function changeDivsStatus(nodeList) {
  const status = ["fine", "bad"];
  nodeList.forEach((e) => {
    const random = Math.ceil(Math.random() * 2) - 1;

    setTimeout(() => {
      e.textContent = status[random];
      // e.onChange(hasAnError(status[random]));
    }, (random + 1) * 1000);
  });
}

btn.addEventListener("click", async () => {
  changeDivsStatus(divList);
  const status = await getStatus(divList);
  console.log(status);
  if (status !== "bad") p.textContent = "disparado";
});
