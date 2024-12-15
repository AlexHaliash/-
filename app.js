document.querySelector('.upload-btn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = ''; // Очистим таблицу перед загрузкой новых файлов

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            return; // Пропускаем не изображение
        }

        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = function() {
            // Определение глубины цвета (предполагаем 24-бита для большинства форматов)
            let colorDepth = file.type === 'image/gif' ? '8-bit (GIF)' : '24-bit';

            // Добавляем данные в таблицу
            const row = `<tr>
                <td>${file.name}</td>
                <td>${img.width} x ${img.height}</td>
                <td>72 (default)</td> <!-- Разрешение по умолчанию -->
                <td>${colorDepth}</td>
                <td>N/A (compression)</td> <!-- Нужно доработать для определения сжатия -->
            </tr>`;
            tableBody.innerHTML += row;

            URL.revokeObjectURL(url); // Очищаем URL объекта после его использования
        };

        img.src = url;
    });
});
