document.addEventListener('DOMContentLoaded', () => {
  const segments = document.querySelectorAll('.segment');
  const hoverText1 = document.getElementById('hover-text1');
  const hoverText2 = document.getElementById('hover-text2');
  const hoverText3 = document.getElementById('hover-text3');
  const cheeseLink = document.querySelector('#cheese-link a');

  // Map WordPress page IDs to segments and CTA settings
  const pageSegmentMap = {
    79803: 'segment-1', 
    76272: 'segment-2', 
    77368: 'segment-3', 
    76483: 'segment-4', 
    76360: 'segment-5', 
    75910: 'segment-6', 
    76346: 'segment-6', 
  };

  // Default segment details
  const defaultLink = 'https://certinia.com/free-demo/';
  const defaultText = 'Request a demo';
  let activeSegment;

  // Detect the current page ID from the body class
  const bodyClasses = document.body.className;
  const currentPageId = Object.keys(pageSegmentMap).find(pageId => bodyClasses.includes(`page-id-${pageId}`));
  const defaultSegmentId = currentPageId ? pageSegmentMap[currentPageId] : 'segment-2'; // Fallback to segment-2
  const defaultSegment = document.getElementById(defaultSegmentId);

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

    segment.classList.add('active', colorClass);
    segment.querySelectorAll('.cls-10').forEach(child => {
      child.classList.add(colorClass);
    });

    hoverText1.textContent = segment.getAttribute('data-label');
    hoverText2.textContent = segment.getAttribute('data-label2');
    hoverText3.textContent = segment.getAttribute('data-label3');

    if (segment === defaultSegment) {
      cheeseLink.href = defaultLink;
      cheeseLink.textContent = defaultText;
    } else {
      cheeseLink.href = segment.getAttribute('data-link');
      cheeseLink.textContent = segment.getAttribute('data-button-text');
    }

    activeSegment = segment;
  }

  // Set the default active segment on page load
  if (defaultSegment) {
    clearActiveStates();
    activateSegment(defaultSegment);
  } else {
    console.error('Default segment not found! Check your pageSegmentMap or page structure.');
  }

  // Add event listeners for hover effects
  segments.forEach(segment => {
    let hoverTimeout;
    let isHovering = false;

    segment.addEventListener('mouseenter', () => {
      if (isHovering) return;

      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        if (activeSegment !== segment) {
          clearActiveStates();
          activateSegment(segment);
        }
        isHovering = false;
      }, 200);

      isHovering = true;
    });

    segment.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      isHovering = false;

      // Revert to the default active segment
      activateSegment(activeSegment);
    });
  });
});
