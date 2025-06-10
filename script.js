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

  document.getElementById("characterSelect").addEventListener("change", updateImages);
  document.getElementById("categorySelect").addEventListener("change", updateImages);
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
  const character = document.getElementById("topicSelect").value;
  const category = document.getElementById("authorSelect").value;

  const filtered = goods.filter(b =>
    (!character || b.character === character) &&
    (!category || b.category === category)
  );

  const container = document.getElementById("imageContainer");
  container.innerHTML = "";

  filtered.forEach(b => {
    const img = document.createElement("img");
    img.src = b.src;
    container.appendChild(img);
  });
}