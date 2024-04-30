document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add_btn');
    const sleepTableBody = document.getElementById('sleep-table-body');
    let startTime;

    addBtn.addEventListener('click', function() {
        const dateInput = document.getElementById('date_input').value;

        if (dateInput === '') {
            alert('Please select a date.');
            return;
        }

        const btnText = addBtn.textContent.trim();

        if (btnText === 'Start') {
            
            addBtn.textContent = 'End';
            addBtn.classList.remove('start-btn');
            addBtn.classList.add('end-btn');
            
            startTime = new Date().getTime();
        } else if (btnText === 'End') {
            
            const endTime = new Date().getTime();
            const duration = endTime - startTime;

            addBtn.textContent = 'Start';
            addBtn.classList.remove('end-btn');
            addBtn.classList.add('start-btn');

            const hours = Math.floor(duration / (1000 * 60 * 60));
            const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((duration % (1000 * 60)) / 1000);

            const newRow = sleepTableBody.insertRow();
            const dateCell = newRow.insertCell();
            const durationCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();

            dateCell.textContent = dateInput;
            durationCell.textContent = hours + 'h ' + minutes + 'm ' + seconds + 's';

            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                sleepTableBody.removeChild(newRow);
            });
            deleteCell.appendChild(deleteBtn);
        }
    });
});