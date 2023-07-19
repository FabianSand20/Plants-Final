// Script.js

import { PlantBuilder } from './Modules/plantBuilder.js';

document.addEventListener('DOMContentLoaded', function() {
  const plantForm = document.getElementById('plantForm');
  const recommendationContainer = document.getElementById('recommendation');
  const potImageContainer = document.getElementById('potImageContainer');
  const plantImageContainer = document.getElementById('plantImageContainer');
  const soilImageContainer = document.getElementById('soilImageContainer');
  const extrasContainer = document.getElementById('extrasContainer');
  const recommendationInfo = document.getElementById('recommendationInfo');

  plantForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const place = document.querySelector('input[name="place"]:checked');
    const sunlight = document.querySelector('input[name="sunlight"]:checked');
    const pets = document.querySelector('input[name="pets"]:checked');
    const water = document.querySelector('input[name="water"]:checked');
    const style = document.querySelector('input[name="style"]:checked');
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked'));

    if (place && sunlight && pets && water && style) {
      const builder = new PlantBuilder();

      if (place.value === 'inside_indirect') {
        builder.withName('Sansevieria');
      } else if (place.value === 'inside_lot') {
        builder.withName('Aglaonema');
      } else if (place.value === 'outside') {
        builder.withName('Aloe Vera');
      }

      if (sunlight.value === 'yes') {
        builder.withSoil('Composted Soil');
      } else if (sunlight.value === 'no') {
        builder.withSoil('Fertilized Soil');
      }

      if (pets.value === 'yes') {
        builder.withPot('Ceramic pot');
        builder.withPotStyle('Substitute the soil for the easy drainage soil');
      } else if (pets.value === 'no') {
        builder.withPot('Ceramic pot');
      }

      if (water.value === 'overwater') {
        builder.withPotMaterial('Clay pot');
      } else if (water.value === 'underwater' || water.value === 'neither') {
        builder.withPotMaterial('Ceramic pot');
      }

      if (style.value === 'minimalism') {
        builder.withPotStyle('Simple pot');
      } else if (style.value === 'decoration') {
        builder.withPotStyle('Simple pot decorated');
      } else if (style.value === 'bright_colors') {
        builder.withPotStyle('Painted pot decorated');
      }

      const extrasList = extras.map(extra => extra.value);
      builder.withExtras(extrasList);

      const recommendation = builder.build();

      showRecommendation(recommendation);
    } else {
      alert('Por favor, responde todas las preguntas.');
    }
  });

  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', function() {
    plantForm.reset();
    recommendationContainer.style.display = 'none';
  });

  function showRecommendation(recommendation) {
    // Clear previous recommendation
    potImageContainer.innerHTML = '';
    plantImageContainer.innerHTML = '';
    soilImageContainer.innerHTML = '';
    extrasContainer.innerHTML = '';
    recommendationInfo.innerHTML = '';

    // Create and append pot image
    const potImage = document.createElement('img');
    potImage.src = `assets/images/${recommendation.potImage}.png`;
    potImageContainer.appendChild(potImage);

    // Create and append plant image
    const plantImage = document.createElement('img');
    plantImage.src = `assets/images/${recommendation.plantImage}.png`;
    plantImageContainer.appendChild(plantImage);

    // Create and append soil image
    const soilImage = document.createElement('img');
    soilImage.src = `assets/images/${recommendation.soilImage}.png`;
    soilImageContainer.appendChild(soilImage);

    // Create and append extras images
    recommendation.extras.forEach(extra => {
      const extraImage = document.createElement('img');
      extraImage.src = `assets/images/${extra}.png`;
      extrasContainer.appendChild(extraImage);
    });

    // Create recommendation info
    const recommendationText = document.createElement('h2');
    recommendationText.textContent = recommendation.name;
    recommendationInfo.appendChild(recommendationText);

    const recommendationDetails = document.createElement('p');
    recommendationDetails.innerHTML = `
      Suelo: ${recommendation.soil}<br>
      Maceta: ${recommendation.pot}<br>
      Color: ${recommendation.color}<br>
      Extras: ${recommendation.extras.join(', ')}
    `;
    recommendationInfo.appendChild(recommendationDetails);

    // Display recommendation container
    recommendationContainer.style.display = 'block';
  }
});
