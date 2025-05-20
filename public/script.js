document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const updateBtn = document.getElementById('updateBtn');
  const tableBody = document.querySelector('#cryptoTable tbody');

  async function fetchData() {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwfamJDHV1RRE4Q3Lv2ZyKiXhCNQj-qwusmJJJo5Fwzy4L2gAyhRWcnrr2_7il3uNA/exec');
      const data = await response.json();
      tableBody.innerHTML = '';
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.Rank}</td>
          <td>${item.Nome}</td>
          <td>${item.Símbolo}</td>
          <td>${parseFloat(item["Preço (USD)"]).toFixed(4)}</td>
          <td>${item["Pontuação Balanceada (1–700)"]}</td>
          <td style="background-color: ${item["Faixa de Cor"]}"></td>
          <td>${item["Alerta Anticolapso"] || ""}</td>
          <td>${item.Observações || ""}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  searchInput.addEventListener('input', () => {
    const filtro = searchInput.value.toLowerCase();
    const linhas = tableBody.querySelectorAll('tr');
    linhas.forEach(row => {
      const nome = row.cells[1].textContent.toLowerCase();
      const simbolo = row.cells[2].textContent.toLowerCase();
      row.style.display = nome.includes(filtro) || simbolo.includes(filtro) ? "" : "none";
    });
  });

  updateBtn.addEventListener('click', fetchData);
  fetchData();
});
