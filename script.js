const form = document.getElementById("Form");
const input = document.getElementById("message");
const list = document.getElementById("list");
const counter = document.getElementById("counter");
const clear = document.getElementById(`button--clear`);

let tab = [];
let iter = 1;
const temptab = JSON.parse(window.localStorage.getItem('tab'));
if (temptab!== null)
{
  tab=JSON.parse(window.localStorage.getItem('tab'));
  iter=tab.map(obj => obj.itereration).reduce((acc,curr) => curr>=acc ? curr : acc, 0)+1;
}
let count = 0;
rerender();

function gray(obj){
  if (obj.gray===1)
  {
    const listid = document.getElementById(`list__item${obj.itereration}`);
    listid.classList.add("grayed");
  }
}

function rerender() {
  list.innerHTML = tab.map((obj) => `
  <li id="list__item${obj.itereration}" class="list__item">
  <p class="list__item__text">
    ${obj.val}
  </p><button type="button" class="button--done" id="button--done${obj.itereration}">Done</button>
  <button type="button" class="button--remove" id="button--remove${obj.itereration}">Remove</button>
</li>`).join('');
count = tab.filter((obj) => obj.gray === 0).length
tab.map((e) => gray(e));
counter.innerText=count;
window.localStorage.setItem('tab',JSON.stringify(tab));
}


form.addEventListener("submit", function (e) {
  e.preventDefault();
  tab.push({val: input.value, itereration: iter, gray: 0});
  iter+=1;
  input.value = "";
  rerender()
})

clear.addEventListener("click", function(e)
{
  tab= new Array();
  rerender()
})

list.addEventListener("click", function(e) {
  const temp = e.target.id;
  let tempid2 = temp.replace(/[0-9]/g, '');
  let tempid = temp.replace( /^\D+/g, '');
  let item = tab.find(function(x){ return x.itereration === Number(tempid);});
  const listid = document.getElementById(`list__item${tempid}`);
  if(tempid2=="button--done")
  {
    if (listid.classList.contains("grayed"))
    {
      listid.classList.remove("grayed");
      count+=1;
      item.gray = 0;
    }
    else
    {
      listid.classList.add("grayed");
      count-=1;
      item.gray=1;
    }
  }
  else if(tempid2=="button--remove")
  {
    tab = tab.filter(function(el) {return el.itereration != tempid; });
    input.value = "";
  }
  rerender();
})
