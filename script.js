let goods = [];

fetch('goods.json')
  .then(res => res.json())
  .then(data => {
    goods = data;
    populateSelects();
    updateImages();
  });

function populateSelects() {
  const character = [...new Set(goods.map(b => b.character))];
  const category = [...new Set(goods.map(b => b.category))];

  fillSelect('characterSelect', character);
  fillSelect('categorySelect', category);;

  document.getElementById("searchButton").addEventListener("click", updateImages);
}

function fillSelect(id, items) {
  const select = document.getElementById(id);
  items.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
}

function updateImages() {
  const character = document.getElementById("characterSelect").value;
  const category = document.getElementById("categorySelect").value;

  const filtered = goods.filter(b =>
    (!character || b.character === character) &&
    (!category || b.category === category)
  );

  const container = document.getElementById("imageContainer");
  container.innerHTML = "";

  filtered.forEach(b => {
    const img = document.createElement("img");
    img.src = b.thumbnail;
    img.alt = b.character;
    img.title = b.character;
    img.addEventListener("click", () => {
      window.open(b.src, "_blank");
    });
    
    container.appendChild(img);
  });
}
