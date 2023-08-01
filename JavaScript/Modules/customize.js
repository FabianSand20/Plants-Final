// customize.js

import { PlantBuilder } from './Modules/plantBuilder.js';
import { capitalize } from './Modules/utils.js';

document.addEventListener('DOMContentLoaded', function() {
  const customizeForm = document.getElementById('customizeForm');
  const customizePreview = document.getElementById('customizePreview');
  const customizePotImageContainer = document.getElementById('customizePotImageContainer');
  const customizePlantImageContainer = document.getElementById('customizePlantImageContainer');
  const customizeSoilImageContainer = document.getElementById('customizeSoilImageContainer');
  const customizeExtrasContainer = document.getElementById('customizeExtrasContainer');
  const customizeInfo = document.getElementById('customizeInfo');

  customizeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const choosePot = document.querySelector('input[name="choosePot"]:checked');
    const potDecorationsToggle = document.getElementById('potDecorationsToggle');
    const potColorToggle = document.getElementById('potColorToggle');
    const potColorOptions = document.getElementById('potColorOptions');
    const choosePlant = document.getElementById('choosePlant').value;
    const chooseSoil = document.querySelector('input[name="chooseSoil"]:checked');
    const chooseExtras = Array.from(document.querySelectorAll('input[name="chooseExtras"]:checked'));

    if (choosePot && choosePlant && chooseSoil) {
      const builder = new PlantBuilder();

      builder.withName(capitalize(choosePlant));

      if (chooseSoil.value === 'Basic composted soil') {
        builder.withSoil('Drainage Soil');
      } else if (chooseSoil.value === 'Premium fertilized soil') {
        builder.withSoil('Fertilized Soil');
      } else if (chooseSoil.value === 'Easy drainage soil') {
        builder.withSoil('Composted Soil');
      }

      if (choosePot.value === 'clay') {
        builder.withPotMaterial('Clay pot');
      } else if (choosePot.value === 'ceramic') {
        builder.withPotMaterial('Ceramic pot');
      }

      if (potDecorationsToggle.checked) {
        builder.withPotStyle('Decorated pot');
      } else {
        builder.withPotStyle('Simple pot');
      }

      if (potColorToggle.checked) {
        const potColor = document.querySelector('input[name="potColor"]:checked').value;
        builder.withColor(capitalize(potColor));
      }

      const chooseExtrasList = chooseExtras.map(extra => extra.value);
      builder.withExtras(chooseExtrasList);

      const customization = builder.build();

      showCustomization(customization);
    } else {
      alert('Por favor, responde todas las preguntas.');
    }
  });

  function showCustomization(customization) {
    // Clear previous customization
    customizePotImageContainer.innerHTML = '';
    customizePlantImageContainer.innerHTML = '';
    customizeSoilImageContainer.innerHTML = '';
    customizeExtrasContainer.innerHTML = '';
    customizeInfo.innerHTML = '';

    // Create and append pot image
    const customizePotImage = document.createElement('img');
    customizePotImage.src = `assets/images/${customization.potImage}.png`;
    customizePotImageContainer.appendChild(customizePotImage);

    // Create and append plant image
    const customizePlantImage = document.createElement('img');
    customizePlantImage.src = `assets/images/${customization.plantImage}.png`;
    customizePlantImageContainer.appendChild(customizePlantImage);

    // Create and append soil image
    const customizeSoilImage = document.createElement('img');
    customizeSoilImage.src = `assets/images/${customization.soilImage}.png`;
    customizeSoilImageContainer.appendChild(customizeSoilImage);

    // Create and append extras images
    customization.extras.forEach(extra => {
      const customizeExtraImage = document.createElement('img');
      customizeExtraImage.src = `assets/images/${extra}.png`;
      customizeExtrasContainer.appendChild(customizeExtraImage);
    });

    // Create customization info
    const customizeText = document.createElement('h2');
    customizeText.textContent = customization.name;
    customizeInfo.appendChild(customizeText);

    const customizeDetails = document.createElement('p');
    customizeDetails.innerHTML = `
      Soil: ${customization.soil}<br>
      Pot: ${customization.pot}<br>
      ${customization.potStyle ? 'Pot Style: ' + customization.potStyle + '<br>' : ''}
      ${customization.color ? 'Color: ' + customization.color + '<br>' : ''}
      Extras: ${customization.extras.join(', ')}
    `;
    customizeInfo.appendChild(customizeDetails);

    // Display customization preview
    customizePreview.style.display = 'block';
  }
});
