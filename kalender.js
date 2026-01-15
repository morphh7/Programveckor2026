let exams = JSON.parse(localStorage.getItem("exams")) || {};

document.addEventListener('DOMContentLoaded', function() {
    const monthYear = document.getElementById('month-year');
    const daysContainer= document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton= document.getElementById('next');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September','October', 'November', 'December'
    
    ];
    let currentDate = new Date();
    let today = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear(); 
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month +1,0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;

        daysContainer.innerHTML = '';
        

        // previuse months dates
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay -i +1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);

        }

        // Curant month's dates
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
        
            const dateKey = `${year}-${month + 1}-${i}`;
        
            // Markera idag
            if (
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayDiv.classList.add('today');
            }
        
            // Om det finns prov → gör röd
            if (exams[dateKey]) {
                dayDiv.classList.add('exam');
                dayDiv.title = exams[dateKey]; // ← texten visas vid hover
            }
            
        
            // Klick på dag
            dayDiv.addEventListener("click", () => {
    const existingExam = exams[dateKey];

    const examName = prompt(
        existingExam
            ? `Prov denna dag:\n"${existingExam}"\n\nÄndra eller ta bort (lämna tomt):`
            : "Skriv provets namn:"
    );

    if (examName) {
        exams[dateKey] = examName;
        localStorage.setItem("exams", JSON.stringify(exams));
        dayDiv.classList.add("exam");
        dayDiv.title = examName;
    } else if (existingExam) {
        // Om användaren lämnar tomt → ta bort provet
        delete exams[dateKey];
        localStorage.setItem("exams", JSON.stringify(exams));
        dayDiv.classList.remove("exam");
        dayDiv.removeAttribute("title");
    }
});

            
        
            daysContainer.appendChild(dayDiv);
        }
        
        // next month's dates
        const nextMonthStartDay = 7- new Date(year, month +1, 0).getDay() -1;
        for (let i = 1; i <= nextMonthStartDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent =i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }
    prevButton.addEventListener('click', function(){
        currentDate.setMonth(currentDate.getMonth()-1);
        renderCalendar(currentDate);
    });
    nextButton.addEventListener('click', function(){
        currentDate.setMonth(currentDate.getMonth()+1);
        renderCalendar(currentDate);
    });
    renderCalendar(currentDate);
});
