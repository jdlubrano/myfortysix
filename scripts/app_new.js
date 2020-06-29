// Global variables for sort options
let aToZ = false;
    highToLow = false;
    newToOld = false;

// *****
// STORAGE CONTROLLER
// *****





// *****
// HIGHPEAK CONTROLLER
// *****

const HighPeakCtrl = (function() {
  // HighPeak Class
  class HighPeak {
    constructor(name, elevation) {
      this.name = name;
      this.elevation = elevation;
      this.status = {
        isCompleted: false,
        dateCompleted: null
      }
    }
  
    markComplete(date) {
      this.status.isCompleted = true;
      this.status.dateCompleted = date;
    }
    
    markIncomplete() {
      this.status.isCompleted = false;
      this.status.dateCompleted = null;
    }
  }

  // Data Structure / State
  const data = {
    highPeaks: [
      new HighPeak('Mount Marcy', 5344),
      new HighPeak('Algonquin Peak', 5114),
      new HighPeak('Mount Haystack', 4960),
      new HighPeak('Mount Skylight', 4926),
      new HighPeak('Whiteface Mountain', 4867),
      new HighPeak('Dix Mountain', 4857),
      new HighPeak('Gray Peak', 4840),
      new HighPeak('Iroquois Peak', 4840),
      new HighPeak('Basin Mountain', 4827),
      new HighPeak('Gothics Mountain', 4736),
      new HighPeak('Mount Colden', 4714),
      new HighPeak('Giant Mountain', 4627),
      new HighPeak('Nippletop Mountain', 4620),
      new HighPeak('Santanoni Peak', 4607),
      new HighPeak('Mount Redfield', 4606),
      new HighPeak('Wright Peak', 4580),
      new HighPeak('Saddleback Mountain', 4515),
      new HighPeak('Panther Peak', 4442),
      new HighPeak('Tabletop Mountain', 4427),
      new HighPeak('Rocky Peak Ridge', 4420),
      new HighPeak('Macomb Mountan', 4405),
      new HighPeak('Armstrong Mountan', 4400),
      new HighPeak('Hough Peak Mountan', 4400),
      new HighPeak('Seward Mountan', 4361),
      new HighPeak('Mount Marshall', 4360),
      new HighPeak('Allen Mountain', 4340),
      new HighPeak('Esther Mountain', 4340),
      new HighPeak('Big Slide Mountain', 4240),
      new HighPeak('Upper Wolfjaw Mountain', 4185),
      new HighPeak('Lower Wolfjaw Mountain', 4175),
      new HighPeak('Street Mountain', 4166),
      new HighPeak('Phelps Mountain', 4161),
      new HighPeak('Mount Donaldson', 4140),
      new HighPeak('Seymour Mountain', 4120),
      new HighPeak('Sawteeth Mountain', 4100),
      new HighPeak('Cascade Mountain', 4098),
      new HighPeak('South Dix Mountain', 4060),
      new HighPeak('Porter Mountain', 4059),
      new HighPeak('Mount Colvin', 4057),
      new HighPeak('Mount Emmons', 4040),
      new HighPeak('Dial Mountain', 4020),
      new HighPeak('Grace Peak Mountain', 4012),
      new HighPeak('Blake Mountain', 3960),
      new HighPeak('Cliff Mountain', 3960),
      new HighPeak('Nye Mountain', 3895),
      new HighPeak('Couchsachraga Peak Mountain', 3820)
    ],
    currentHighPeak: null,
    totalCompleted: 0
  }

  // Public Methods
  return {
    getHighPeaks: function() {
      return data.highPeaks;
    },

    getCurrentHighPeak: function() {
      return data.currentHighPeak;
    },

    updateCurrentHighPeakState: function(highPeakName) {
      data.currentHighPeak = highPeakName;
    },

    clearCurrentHighPeakState: function() {
      data.currentHighPeak = null;
    },

    updateCurrentHighPeakStatus: function(date) {
      data.highPeaks.forEach(function(highPeak) {
        if (highPeak.name === data.currentHighPeak) {
          highPeak.markComplete(new Date(`${date}T00:00:00`));
        }
      })
    },

    resetCurrentHighPeakStatus: function() {
      data.highPeaks.forEach(function(highPeak) {
        if (highPeak.name === data.currentHighPeak) {
          highPeak.markIncomplete();
        }
      })
    },

    getTotalCompleted: function() {
      return data.totalCompleted;
    },

    updateTotalCompleted: function() {
      let completedCount = 0;

      data.highPeaks.forEach(function(highPeak) {
        if (highPeak.status.isCompleted) {
          completedCount++
        }
      })

      data.totalCompleted = completedCount;
    },

    sortHighPeaks: function(sortBy) {
      switch(sortBy) {
        case 'byName':
          data.highPeaks.sort(function(a, b) {
            if ( a.name < b.name ) {
              return (aToZ ? -1 : 1);
            } else if ( a.name > b.name ) {
              return (aToZ ? 1 : -1);
            } else {
              return 0;
            }
          })
          break;
  
        case 'byElevation':
          data.highPeaks.sort(function(a, b) {
            return (highToLow ? a.elevation - b.elevation : b.elevation - a.elevation);
          })
          break;
  
        case 'byCompleted':
          const highPeaksComplete = data.highPeaks.filter(highPeak => highPeak.status.dateCompleted !== 'incomplete');
          const highPeaksIncomplete = data.highPeaks.filter(highPeak => highPeak.status.dateCompleted === 'incomplete');
    
          // Do not change newToOld boolean if highPeaksComplete is empty
          if (highPeaksComplete.length === 0) {
            return newToOld = false;
          }
    
          highPeaksComplete.sort(function(a, b) {
            return (newToOld ? b.status.dateCompleted - a.status.dateCompleted : a.status.dateCompleted - b.status.dateCompleted);
          })
    
          data.highPeaks = highPeaksComplete.concat(highPeaksIncomplete);
          break;
  
        default:
          break;
      }
    },

    getData: function() {
      return data;
    }
  }
})();





// *****
// UI CONTROLLER
// *****

const UICtrl = (function() {
  const UISelectors = {
    mainContainer: '#main-container',
    statusFormContainer: '#container-status-form',
    statusFormHighPeakName: '#high-peak-name',
    statusFormDateInput: '.date',
    statusFormSubmitBtn: '.submit',
    statusFormResetBtn: '.reset',
    statusFormCancelBtn: '.cancel',
    completeCount: 'span.complete-count',
    incompleteCount: 'span.incomplete-count',
    sortByName: '#th-name',
    sortByElevation: '#th-elevation',
    sortByDateCompleted: '#th-date-completed',
    highPeaksTableBody: '#high-peaks-table-body'
  }

  // Public Methods
  return {
    populateHighPeakList: function(highPeaks) {
      let html = '';

      highPeaks.forEach(function(highPeak) {
        // Set icon class to complete or incomplete
        const completeIconClass = 'fas fa-check-circle complete',
              incompleteIconClass = 'far fa-circle incomplete';
        let iconClass = highPeak.status.isCompleted ? completeIconClass : incompleteIconClass;

        // Format date completed if complete
        let formattedDate = highPeak.status.dateCompleted !== null ?
        `${highPeak.status.dateCompleted.getMonth() + 1}.${highPeak.status.dateCompleted.getDate()}.${highPeak.status.dateCompleted.getFullYear()}`
        : 'incomplete'

        html += `
          <tr>
            <td><i class="${iconClass} status-icon"></i></td>
            <td>${highPeak.name}</td>
            <td>${highPeak.elevation}'</td>
            <td>${formattedDate}</td>
          </tr>
        `;
      });

      // Insert high peaks table rows into table
      document.querySelector(UISelectors.highPeaksTableBody).innerHTML = html;
    },

    showStatusForm: function(currentHighPeak) {
      document.querySelector(UISelectors.statusFormContainer).style.display = 'block';
      document.querySelector(UISelectors.statusFormHighPeakName).textContent = currentHighPeak.name;
      document.querySelector(UISelectors.statusFormDateInput).value = currentHighPeak.status.dateCompleted !== null ?
      currentHighPeak.status.dateCompleted.toISOString().slice(0,10)
      : null;
    },

    hideStatusForm: function() {
      document.querySelector(UISelectors.statusFormContainer).style.display = 'none';
      document.querySelector(UISelectors.statusFormHighPeakName).textContent = '';
      document.querySelector(UISelectors.statusFormDateInput).value = null;
    },

    getStatusFormDateInputValue: function() {
      return document.querySelector(UISelectors.statusFormDateInput).value;
    },

    updateCompleteTotals: function(totalCompleted) {
      document.querySelector(UISelectors.completeCount).textContent = totalCompleted;
      document.querySelector(UISelectors.incompleteCount).textContent = 46 - totalCompleted;
    },

    showAlert(message, className) {
      console.log(message, className);
      // Create alert div
      const div = document.createElement('div');
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(message));
  
      // Insert alert div into DOM
      const container = document.querySelector(UISelectors.mainContainer);
      const form = document.querySelector(UISelectors.statusFormContainer);
      container.insertBefore(div, form);
  
      // Timeout alert div
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    },

    getSelectors: function() {
      return UISelectors;
    }
  }
})();





// *****
// APP CONTROLLER
// *****

const App = (function(HighPeakCtrl, UICtrl) {
  // Get UI Selectors
  const UISelectors = UICtrl.getSelectors();

  const loadEventListeners = function() {
    // Click status icon
    document.querySelector(UISelectors.highPeaksTableBody).addEventListener('click', clickStatusIcon);

    // Click Submit status form
    document.querySelector(UISelectors.statusFormSubmitBtn).addEventListener('click', submitStatusForm);

    // Click Reset status form
    document.querySelector(UISelectors.statusFormResetBtn).addEventListener('click', resetStatusForm);

    // Click Close status form
    document.querySelector(UISelectors.statusFormCancelBtn).addEventListener('click', closeStatusForm);

    // Click Sort By Name
    document.querySelector(UISelectors.sortByName).addEventListener('click', sortByName);

    // Click Sort By Elevation
    document.querySelector(UISelectors.sortByElevation).addEventListener('click', sortByElevation);

    // Click Sort By Date Completed
    document.querySelector(UISelectors.sortByDateCompleted).addEventListener('click', sortByDateCompleted);
  }

  const clickStatusIcon = function(e) {
    if (e.target.classList.contains('status-icon') && document.querySelector(UISelectors.statusFormContainer).style.display === 'none') {
      // Get high peak name of clicked row
      let clickedHighPeak = e.target.parentElement.parentElement.children[1].textContent;

      let newCurrentHighPeak;

      HighPeakCtrl.getHighPeaks().forEach(function(highPeak) {
        if (highPeak.name === clickedHighPeak) {
          newCurrentHighPeak = highPeak;
        }
      })

      // Set current high peak state to clicked row
      HighPeakCtrl.updateCurrentHighPeakState(newCurrentHighPeak.name);

      // Show status form
      UICtrl.showStatusForm(newCurrentHighPeak);
    }
  }

  const submitStatusForm = function(e) {
    let currentHighPeakDateInput = UICtrl.getStatusFormDateInputValue()

    if (currentHighPeakDateInput !== '') {
      // Update current high peak status in data structure
      HighPeakCtrl.updateCurrentHighPeakStatus(currentHighPeakDateInput);

      // Update total completed in data structure
      HighPeakCtrl.updateTotalCompleted();

      // Update high peaks table
      UICtrl.populateHighPeakList(HighPeakCtrl.getHighPeaks());

      // Update UI complete totals
      UICtrl.updateCompleteTotals(HighPeakCtrl.getTotalCompleted());

      // Show success alert
      UICtrl.showAlert(`Congratulations! You summited ${HighPeakCtrl.getCurrentHighPeak()}!`, 'alert-success');

      // Clear Current High Peak State
      HighPeakCtrl.clearCurrentHighPeakState();

      // Close status form
      closeStatusForm();
    } else {
      // Show error alert
      UICtrl.showAlert('Please enter date', 'alert-error');
    }

    e.preventDefault();
  }

  const resetStatusForm = function(e) {
    let currentHighPeakDateInput = UICtrl.getStatusFormDateInputValue()

    if (currentHighPeakDateInput !== '') {
      // Remove date and complete status in data structure
      HighPeakCtrl.resetCurrentHighPeakStatus();

      // Update total completed in data structure
      HighPeakCtrl.updateTotalCompleted();

      // Update high peaks table
      UICtrl.populateHighPeakList(HighPeakCtrl.getHighPeaks());

      // Update UI complete totals
      UICtrl.updateCompleteTotals(HighPeakCtrl.getTotalCompleted());

      // Show success alert
      UICtrl.showAlert(`${HighPeakCtrl.getCurrentHighPeak()} has been succesfully reset`, 'alert-success');

      // Clear Current High Peak State
      HighPeakCtrl.clearCurrentHighPeakState();
      
      // Close status form
      closeStatusForm();
    } else {
      // Show error alert
      UICtrl.showAlert(`${HighPeakCtrl.getCurrentHighPeak()} is already incomplete`, 'alert-error');
    }
  }

  const closeStatusForm = function() {
    // Clear Current High Peak State
    HighPeakCtrl.clearCurrentHighPeakState();

    UICtrl.hideStatusForm();
  }

  const sortByName = function() {
    aToZ = !aToZ;
    HighPeakCtrl.sortHighPeaks('byName');

    // Update high peaks table
    UICtrl.populateHighPeakList(HighPeakCtrl.getHighPeaks());
  }

  const sortByElevation = function() {
    highToLow = !highToLow;
    HighPeakCtrl.sortHighPeaks('byElevation');

    // Update high peaks table
    UICtrl.populateHighPeakList(HighPeakCtrl.getHighPeaks());
  }

  const sortByDateCompleted = function() {
    newToOld = !newToOld;
    HighPeakCtrl.sortHighPeaks('byCompleted');

    // Update high peaks table
    UICtrl.populateHighPeakList(HighPeakCtrl.getHighPeaks());
  }

  // Public Methods
  return {
    init: function() {
      // Populate high peaks list
      UICtrl.populateHighPeakList(HighPeakCtrl.getHighPeaks());

      // Update UI complete totals
      UICtrl.updateCompleteTotals(HighPeakCtrl.getTotalCompleted());

      // Load event listeners
      loadEventListeners();
    }
  }
})(HighPeakCtrl, UICtrl);

// Init App
App.init();