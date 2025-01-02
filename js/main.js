const segments = document.querySelectorAll('.segment');
const hoverText1 = document.getElementById('hover-text1');
const hoverText2 = document.getElementById('hover-text2');
const hoverText3 = document.getElementById('hover-text3');
const cheeseLink = document.querySelector('#cheese-link a');

const defaultSegment = document.getElementById('segment-2'); // Change this as needed
const defaultLink = '[[default_link]]';
const defaultText = '[[default_text]]';

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
        // Set to default link and text
        cheeseLink.href = defaultLink;
        cheeseLink.textContent = defaultText;
    } else {
        // Use segment-specific data
        cheeseLink.href = segment.getAttribute('data-link');
        cheeseLink.textContent = segment.getAttribute('data-button-text');
    }

    // Update hoverText1 color class
    hoverText1.className = ''; // Remove existing classes
    hoverText1.classList.add(colorClass); // Add the corresponding color class
}

// Set the default active segment
clearActiveStates();
activateSegment(defaultSegment);

// Add event listeners for hover effects
segments.forEach(segment => {
    segment.addEventListener('mouseenter', () => {
        clearActiveStates(); // Clear all active states on hover
        activateSegment(segment); // Activate the hovered segment
    });

    segment.addEventListener('mouseleave', () => {
        if (!segment.classList.contains('active')) {
            const segmentNumber = segment.id.split('-')[1];
            const colorClass = `color-${segmentNumber}`;

            // Remove color-n class from the segment and its child elements
            segment.classList.remove(colorClass);
            segment.querySelectorAll('.cls-10').forEach(child => {
                child.classList.remove(colorClass);
            });
        }
    });

    // Ensure default segment retains its state
    segment.addEventListener('mouseleave', () => {
        if (segment === defaultSegment) {
            activateSegment(defaultSegment);
        }
    });
});

