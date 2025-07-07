// API HG Weather (HG Brasil)
document.getElementById('obter-clima').addEventListener('click', () => {
  fetch('https://api.hgbrasil.com/weather?woeid=455835&format=json-cors')
    .then(response => response.json())
    .then(data => {
      const rsl = data.results;
      document.getElementById('saida-clima').innerHTML = `
            <strong>${rsl.city_name}</strong>: ${rsl.temp}°C, ${rsl.description}.<br>
            Umidade: ${rsl.humidity}%, Vento: ${rsl.wind_speedy}.`;
    })
    .catch(error => console.error('Erro:', error));
});

// API Trivia
document.getElementById('obter-trivia').addEventListener('click', () => {
  fetch('https://the-trivia-api.com/v2/questions')
    .then(r => r.json())
    .then(arr => {
      const q = arr[0];
      document.getElementById('trivia-pergunta').textContent = q.question.text;

      const form = document.getElementById('form-trivia');
      form.innerHTML = '';  // limpa opções anteriores

      const respostas = [q.correctAnswer, ...q.incorrectAnswers];
      respostas.sort(() => Math.random() - 0.5); // embaralha

      respostas.forEach((resp, i) => {
        const id = `resposta_${i}`;
        form.insertAdjacentHTML('beforeend', `
          <div>
            <input type="radio" name="trivia" id="${id}" value="${resp}">
            <label for="${id}">${resp}</label>
          </div>
        `);
      });

      document.getElementById('feedback-trivia').textContent = '';
      document.getElementById('submit-trivia').style.display = 'inline-block';
      document.getElementById('saida-trivia').style.display = 'block';

      // Remove listener antigo, se existir
      const btn = document.getElementById('submit-trivia');
      btn.onclick = () => {
        const selected = document.querySelector('input[name="trivia"]:checked');
        if (!selected) return alert('Escolha uma opção!');
        if (selected.value === q.correctAnswer) {
          document.getElementById('feedback-trivia').textContent = '✔️ Você acertou!';
          document.getElementById('feedback-trivia').style.color = 'green';
        } else {
          document.getElementById('feedback-trivia').textContent =
            `❌ Incorreto! A resposta certa é: ${q.correctAnswer}`;
          document.getElementById('feedback-trivia').style.color = 'red';
        }
        btn.style.display = 'none';
      };
    })
    .catch(e => console.error('Erro Trivia:', e));
});

// API Dog CEO
document.getElementById('obter-cachorro').addEventListener('click', () => {
  const racaElement = document.getElementById('raca-cachorro');
  const fotoElement = document.getElementById('foto-cachorro');
  
  fotoElement.style.display = 'none';
  
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        const imageUrl = data.message;
        
        const urlParts = imageUrl.split('/');
        const breedPart = urlParts[4]; // raça
        let raca = breedPart;
        
        // Capitaliza primeira letra
        raca = raca.charAt(0).toUpperCase() + raca.slice(1);
        
        racaElement.innerHTML = `<strong>Raça:</strong> ${raca}`;
        fotoElement.src = imageUrl;
        fotoElement.style.display = 'block';
        
      } else {
        racaElement.innerHTML = '<p>Erro ao carregar cachorro</p>';
      }
    })
    .catch(error => {
      console.error('Erro Dog CEO:', error);
      racaElement.innerHTML = '<p>Erro ao carregar cachorro</p>';
    });
});