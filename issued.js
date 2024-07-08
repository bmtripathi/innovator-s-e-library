document.addEventListener('DOMContentLoaded', () => {
    const issueMessage = document.getElementById('issue-message');
    const dueDateMessage = document.getElementById('due-date-message');
    const returnButton = document.getElementById('return-button');

    // Assuming the issue date is the current date
    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(issueDate.getDate() + 15);

    dueDateMessage.textContent = `Your book is due on ${dueDate.toDateString()}`;

    
});
