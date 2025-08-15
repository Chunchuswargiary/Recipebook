let recipes = [];

function renderRecipes(list) {
  const container = document.getElementById('recipeList');
  container.innerHTML = '';
  
  list.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}">
      <h3>${r.name}</h3>
    `;
    
    // Click event for modal
    card.addEventListener('click', () => openModal(r));
    
    container.appendChild(card);
  });
}

function openModal(recipe) {
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('modalTitle').textContent = recipe.name;
  document.getElementById('modalImage').src = recipe.image;

  
  let ingredientsList = recipe.ingredients.split(',').map(item => `<li>${item.trim()}</li>`).join('');
  document.getElementById('modalIngredients').innerHTML = `<ul>${ingredientsList}</ul>`;


  let stepsList = recipe.steps.split('.').filter(step => step.trim() !== '').map(step => `<li>${step.trim()}.</li>`).join('');
  document.getElementById('modalSteps').innerHTML = `<ol>${stepsList}</ol>`;
}



document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});

document.getElementById('addRecipe').addEventListener('click', () => {
  const name = document.getElementById('recipeName').value;
  const ingredients = document.getElementById('recipeIngredients').value;
  const steps = document.getElementById('recipeSteps').value;
  const imageFile = document.getElementById('recipeImage').files[0];
  
  if (!name || !ingredients || !steps || !imageFile) {
    alert("Please fill all fields and upload an image!");
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    recipes.push({
      name,
      ingredients,
      steps,
      image: e.target.result
    });
    renderRecipes(recipes);
    
    // Clear inputs
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeIngredients').value = '';
    document.getElementById('recipeSteps').value = '';
    document.getElementById('recipeImage').value = '';
  };
  reader.readAsDataURL(imageFile);
});

renderRecipes(recipes);
