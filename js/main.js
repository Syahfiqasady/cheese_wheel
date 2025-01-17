document.addEventListener('DOMContentLoaded', () => {
  const segments = document.querySelectorAll('.segment');
  const hoverText1 = document.getElementById('hover-text1');
  const hoverText2 = document.getElementById('hover-text2');
  const hoverText3 = document.getElementById('hover-text3');
  const cheeseLink = document.querySelector('#cheese-link a');

  // Map WordPress page IDs to segments and CTA settings
  const pageSegmentMap = {
    79803: 'PSA_Wheel-Services-Estimator',
    76272: 'PSA_Wheel-Services-Automation',
    77368: 'PSA_Wheel-Resource-Management',
    76483: 'PSA_Wheel-Services-Billing',
    76360: 'PSA_Wheel-Services-Revenue-Management',
    75910: 'PSA_Wheel-Services-Analytics',
    76346: 'PSA_Wheel-Services-Communities',
  };

  // Default segment details
  const defaultLink = 'https://certinia.com/free-demo/';
  const defaultText = 'Request a demo';
  let activeSegment;

  // Detect the current page ID from the body class
  const bodyClasses = document.body.className;
  const currentPageId = Object.keys(pageSegmentMap).find(pageId => bodyClasses.includes(`page-id-${pageId}`));
  const defaultSegmentId = currentPageId ? pageSegmentMap[currentPageId] : 'PSA_Wheel-Services-Estimator'; // Fallback to a default
  const defaultSegment = document.getElementById(defaultSegmentId);

  // Helper function to clear all active states
  function clearActiveStates() {
    segments.forEach(segment => {
      const segmentId = segment.id; // Using new ID format
      const colorClass = `color-${segmentId}`;
      segment.classList.remove('active', colorClass);
      segment.querySelectorAll('.cls-10').forEach(child => {
        child.classList.remove(colorClass);
      });
    });
  }

  // Function to activate a segment
  function activateSegment(segment) {
    const segmentId = segment.id; // Using new ID format
    const colorClass = `color-${segmentId}`;

    // Add active class and color class to the segment
    segment.classList.add('active', colorClass);

    // Add color class to child elements with cls-10
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
  // Track button clicks with Google Analytics
  cheeseLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default action for debugging purposes

    // Get the active segment or fall back to default segment
    const activeSegment = document.querySelector('.segment.active') || defaultSegment;
    const sectionName = activeSegment ? activeSegment.getAttribute('data-label') || 'Unknown Section' : 'Unknown Section';
    const ctaText = cheeseLink.textContent.trim() || 'Unknown CTA';

    // Alert the data being passed to GA (testing purpose only)
    alert(`Google Analytics Event:\n\nEvent: psa_wheel_cta_click\nSection Name: ${sectionName}\nCTA Text: ${ctaText}`);

    // Push the event to Google Analytics
    gtag('event', 'psa_wheel_cta_click', {
      section_name: sectionName,
      cta_text: ctaText,
    });

  });

});