// Path: djsttdj-merciful.js
// A script created to aid the kind and wise Sabrina Spellman, aka DJ Sabrina the Teenage DJ (https://djsabrinatheteenagedj.com/), with unblocking repentant former followers who have renounced the ways of the muskman.
// This script is intended to be run in the browser console on the "Blocked Accounts" page (https://twitter.com/settings/blocked). Navigate to the page, open Chrome inspector (F12), and paste the script into the console. See readme for more details!


//~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// M A G I C K ~ S C R I P T //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Function to count the elements on the fully scrolled page and log the total count
async function countElementsOnScrolledPage(timeoutMs, maxScrolls) {
  var prevScrollY;
  var scrollY = window.scrollY;
  var numScrolls = 0;
  var cellArray = [];

  do {
    console.log('Scrolling...');
    window.scrollTo(0, document.body.scrollHeight);
    numScrolls++;
    prevScrollY = scrollY;
    await sleep(timeoutMs);
    scrollY = window.scrollY;

    // Store each cell in the array
    const cells = document.querySelectorAll('[data-testid="cellInnerDiv"]');
    cells.forEach(cell => {
      cellArray.push(cell);
    });

    console.log('Number of cells on current scroll:', cells.length);
    console.log('Total count of cells so far:', cellArray.length);
  } while ((scrollY - prevScrollY) !== 0 && (typeof maxScrolls === 'undefined' || numScrolls < maxScrolls));

  console.log('Scrolling finished!');
  console.log('Total Count of Blocked Users:', cellArray.length);

  // Insert the filtering code here to remove elements with aria-label "Verified account" from cellArray
  cellArray = cellArray.filter(cell => cell.querySelector('[aria-label="Verified account"]') === null);
  console.log('Filtering finished!');
  console.log('Total Count of repentant muskman enablers:', cellArray.length);

  // unblock the filtered users 
  cellArray.forEach(cell => {
    unblockUser(cell);
  });

  console.log('Unblocking finished!');
}

// Function to unblock a user associated with a cell
function unblockUser(cell) {
  cell.querySelector('[aria-label="Blocked"]').click();
}

// Function to simulate the sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Call the function to count the elements on the fully scrolled page
countElementsOnScrolledPage(500); // Adjust the timeout value as needed
