// Utility for handling tutor pointer/cursor overlay and element actions

/**
 * Show or move the tutor cursor overlay to the center of the target element,
 * or at a custom position (e.g., under the box).
 * @param {HTMLElement} target
 * @param {object} [position] - Optional: { left, top } to override default placement
 */
export function showTutorCursor(target, position) {
  if (!target) return;
  let cursor = document.getElementById('tutor-cursor-overlay');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'tutor-cursor-overlay';
    cursor.style.position = 'fixed';
    cursor.style.width = '32px';
    cursor.style.height = '32px';
    cursor.style.background = 'rgba(0,0,0,0.7)';
    cursor.style.borderRadius = '50%';
    cursor.style.zIndex = 9999;
    cursor.style.pointerEvents = 'none';
    cursor.style.display = 'flex';
    cursor.style.alignItems = 'flex-start'; // Move emoji to top of circle
    cursor.style.paddingTop = '2px'; // Nudge emoji closer to top
    cursor.style.justifyContent = 'center';
    cursor.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    cursor.innerHTML = '<span style="color:white;font-size:22px;">👆</span>';
    document.body.appendChild(cursor);
  }
  // Always use the provided position if present, otherwise default to center (with scroll offset)
  if (position && typeof position.left === 'number' && typeof position.top === 'number') {
    cursor.style.left = `${position.left}px`;
    cursor.style.top = `${position.top}px`;
  } else {
    const rect = target.getBoundingClientRect();
    cursor.style.left = `${rect.left + rect.width / 2 - 16 + window.scrollX}px`;
    cursor.style.top = `${rect.top + rect.height / 2 - 16 + window.scrollY}px`;
  }
  cursor.style.display = 'flex';
}

/**
 * Handle tutor action (highlight, removeHighlight, setText, audio, POINT)
 * @param {object} action - The action object from backend
 * @param {HTMLElement} container - The main container ref
 */
export function handleTutorAction(action, container) {
  if (!action || !container) return;
  let svg = container.querySelector('#diagramCanvas svg');
  let target = null;
  if (action.type === 'POINT' && action.id && action.id.toLowerCase().includes('formula')) {
    target = container.querySelector('#formulaBox');
    if (target) {
      const rect = target.getBoundingClientRect();
      // Place cursor well below the formula box, horizontally centered, accounting for scroll
      showTutorCursor(target, {
        left: rect.left + rect.width / 2 - 16 + window.scrollX,
        top: rect.bottom + rect.height + 8 + window.scrollY // pointer is fully below the formula box
      });
      // Hide the pointer if the formula box is not visible
      if (rect.width === 0 || rect.height === 0) {
        let cursor = document.getElementById('tutor-cursor-overlay');
        if (cursor) cursor.style.display = 'none';
      }
      return;
    }
  } else if (action.type === 'POINT' && svg) {
    target = action.id ? svg.querySelector(`#${action.id}`) : null;
  } else if (action.id) {
    target = container.querySelector(`#${action.id}`);
  }
  if (target) {
    if (action.type === 'highlight') {
      target.style.transition = 'background 0.3s';
      target.style.background = action.color || 'yellow';
    } else if (action.type === 'removeHighlight') {
      target.style.background = '';
    } else if (action.type === 'setText' && action.text !== undefined) {
      target.textContent = action.text;
    } else if (action.type === 'audio' && action.text) {
      const utterance = new window.SpeechSynthesisUtterance(action.text);
      window.speechSynthesis.speak(utterance);
    } else if (action.type === 'POINT') {
      showTutorCursor(target);
    }
  }
}
