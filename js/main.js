const segments = document.querySelectorAll('.segment');
const hoverText1 = document.getElementById('hover-text1');
const hoverText2 = document.getElementById('hover-text2');
const hoverText3 = document.getElementById('hover-text3');
const cheeseLink = document.querySelector('#cheese-link a');

const defaultSegment = document.getElementById('segment-2'); // Change based on the default segment
const defaultLink = 'https://certinia.com/free-demo/';
const defaultText = 'Request a Demo';

let hoverTimeout; // To store the timeout ID
let activeSegment = defaultSegment; // Track the currently active segment
let isHovering = false; // Flag to track if hover is active

// Helper function to clear all active states
function clearActiveStates() {
  segments.forEach(segment => {
    const segmentNumber = segment.id.split('-')[1];
    const colorClass = `color-${segmentNumber}`;
    segment.classList.remove('active', colorClass);
    segment.querySelectorAll('.cls-10').forEach(child => {
      child.classList.remove(colorClass);
    });
  });
}

// Function to activate a segment
function activateSegment(segment) {
  const segmentNumber = segment.id.split('-')[1];
  const colorClass = `color-${segmentNumber}`;

  // Add active class and color-n class to the segment
  segment.classList.add('active', colorClass);

  // Add color-n class to child elements with cls-10
  segment.querySelectorAll('.cls-10').forEach(child => {
    child.classList.add(colorClass);
  });

  // Update hover text content and styles
  hoverText1.textContent = segment.getAttribute('data-label');
  hoverText2.textContent = segment.getAttribute('data-label2');
  hoverText3.textContent = segment.getAttribute('data-label3');

  // Update cheeseLink based on segment
  if (segment === defaultSegment) {
    cheeseLink.href = defaultLink;
    cheeseLink.textContent = defaultText;
  } else {
    cheeseLink.href = segment.getAttribute('data-link');
    cheeseLink.textContent = segment.getAttribute('data-button-text');
  }

  // Update the active segment
  activeSegment = segment;
}

// Set the default active segment
clearActiveStates();
activateSegment(defaultSegment);

// Add event listeners for hover effects
segments.forEach(segment => {
  segment.addEventListener('mouseenter', () => {
    if (isHovering) return; // Prevent interrupting the current hover state

    // Clear any existing timeout
    clearTimeout(hoverTimeout);

    // Set a delay before activating the segment
    hoverTimeout = setTimeout(() => {
      if (activeSegment !== segment) {
        clearActiveStates();
        activateSegment(segment);
      }
      isHovering = false; // Reset hover flag after activation
    }, 300); // 

    isHovering = true; // Mark hover state as active
  });

  segment.addEventListener('mouseleave', () => {
    // Clear the timeout if the mouse leaves before the delay is complete
    clearTimeout(hoverTimeout);
    isHovering = false; // Reset hover flag

    // Keep the previous active segment if hover was interrupted
    activateSegment(activeSegment);
  });
});