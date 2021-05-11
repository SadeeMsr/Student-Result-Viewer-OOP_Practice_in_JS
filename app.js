
// Main Structure Class
class Result {
    constructor(studentName, studentID, marks) {
      this.studentName = studentName;
      this.studentID = studentID;
      this.marks = marks;
    }
  }



  // Results storing related class
  class LocalStore {
    static getResults() {
      let results;
      if(localStorage.getItem('results') === null) {
        results = [];
      } else {
        results = JSON.parse(localStorage.getItem('results'));
      }
  
      return results;
    }
  
    static addResult(result) {
      const results = LocalStore.getResults();
      results.push(result);
      localStorage.setItem('results', JSON.stringify(results));
    }
  
    static removeResult(marks) {
      const results = LocalStore.getResults();
  
      results.forEach((result, index) => {
        if(result.marks === marks) {
          results.splice(index, 1);
        }
      });
  
      localStorage.setItem('results', JSON.stringify(results));
    }
  }



  
  // Results displaying related class
  class OnScreen {
    static displayResults() {
      const results = LocalStore.getResults();
  
      results.forEach((result) => OnScreen.addResultToList(result));
    }
  
    static addResultToList(result) {
      const list = document.querySelector('#result-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${result.studentName}</td>
        <td>${result.studentID}</td>
        <td>${result.marks}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteResult(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#result-form');
      container.insertBefore(div, form);
  
      // function to remove alert section from the UI
      setTimeout(() => document.querySelector('.alert').remove(), 1000);
    }
  
    static clearFields() {
      document.querySelector('#studentName').value = '';
      document.querySelector('#studentID').value = '';
      document.querySelector('#marks').value = '';
    }
  }
  
  


  
  // Event Listener for displaying results
  document.addEventListener( 'DOMContentLoaded', OnScreen.displayResults );

  
  // Event Listener for adding a result
  document.querySelector('#result-form').addEventListener('submit', (e) => {

    e.preventDefault();

    const studentName = document.querySelector('#studentName').value;
    const studentID = document.querySelector('#studentID').value;
    const marks = document.querySelector('#marks').value;
  
    // Validating here
    if(studentName === '' || studentID === '' || marks === '') {
      OnScreen.showAlert('Please fill in all fields', 'danger');
    } else {
      // Main OBJECT and Initiating all the functions here
      const result = new Result(studentName, studentID, marks);
  
      OnScreen.addResultToList(result);
  
      LocalStore.addResult(result);
  
      OnScreen.showAlert('result Added', 'success');

      OnScreen.clearFields();
    }
  });
  
  // Event listener for removing results 
  document.querySelector('#result-list').addEventListener('click', (e) => {

    //Initiating functions for all removing process
    OnScreen.deleteResult(e.target);
    LocalStore.removeResult(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    OnScreen.showAlert('Result Removed', 'success');
  });