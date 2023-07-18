// Script.js

import { PlantBuilder } from './Modules/plantBuilder.js';

document.addEventListener('DOMContentLoaded', function() {
  const plantForm = document.getElementById('plantForm');
  const recommendationContainer = document.getElementById('recommendation');

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
    const potImage = document.createElement('img');
    potImage.src = `assets/images/${recommendation.potImage}.png`;

    const plantImage = document.createElement('img');
    plantImage.src = `assets/images/${recommendation.plantImage}.png`;

    const soilImage = document.createElement('img');
    soilImage.src = `assets/images/${recommendation.soilImage}.png`;

    recommendation.extras.forEach(extra => {
      const extraImage = document.createElement('img');
      extraImage.src = `assets/images/${extra}.png`;
      recommendationContainer.appendChild(extraImage);
    });

    recommendationContainer.innerHTML = '';
    recommendationContainer.appendChild(potImage);
    recommendationContainer.appendChild(plantImage);
    recommendationContainer.appendChild(soilImage);

    const recommendationInfo = document.createElement('div');
    recommendationInfo.innerHTML = `
      <h2>${recommendation.name}</h2>
      <p>Suelo: ${recommendation.soil}</p>
      <p>Maceta: ${recommendation.pot}</p>
      <p>Color: ${recommendation.color}</p>
      <p>Extras: ${recommendation.extras.join(', ')}</p>
    `;
    recommendationContainer.appendChild(recommendationInfo);

    recommendationContainer.style.display = 'block';
  }
});
