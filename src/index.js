import "./index.css";

let isModalOpen = false;
createSupportWidget();

function createSupportWidget() {
    const element = document.getElementById('support-widget-container');

    if(!element) {
        console.error('LibreTexts Support Widget: Parent element not found. Please add a div with id="support-widget-container" to your page.');
        return;
    }


    const supportButton = document.createElement('button');
    const supportButtonImg = document.createElement('img');

    // Create icon image
    supportButtonImg.src = 'https://cdn.libretexts.net/Icons/libretexts.png'
    supportButtonImg.alt = 'LibreTexts Support';
    supportButtonImg.className = 'support-widget-button-img';

    // Create widget
    supportButton.id = 'supportButton';
    supportButton.className = 'support-widget-button';
    supportButton.innerHTML = '?';
    supportButton.setAttribute('aria-label', 'Open support menu');
    supportButton.setAttribute('aria-expanded', 'false');
    supportButton.setAttribute('aria-controls', 'supportModal');
    // supportButton.appendChild(supportButtonImg)
    supportButton.addEventListener('click', () => openSupportModal());

    // Add widget to page
    element.appendChild(supportButton);

    createSupportModal();
}

function createSupportModal(){
    const modal = document.createElement('div');
    modal.id = 'supportModal';
    modal.className = 'support-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'supportModalTitle');
    modal.setAttribute('tabindex', '-1');
    const modalContent = document.createElement('div');
    modalContent.className = 'support-modal-content';

    const headerLogo = document.createElement('img');
    headerLogo.src = 'https://cdn.libretexts.net/Icons/full_logo.png';
    headerLogo.alt = 'LibreTexts Logo';
    headerLogo.className = 'support-modal-header-logo';
    modalContent.appendChild(headerLogo);

    const modalHeader = document.createElement('h2');
    modalHeader.id = 'supportModalTitle';
    modalHeader.className = 'support-modal-header';
    modalHeader.innerHTML = 'Support Center';
    modalContent.appendChild(modalHeader);

    const modalSubHeader = document.createElement('h3');
    modalSubHeader.innerHTML = 'How can we help you today?';
    modalContent.appendChild(modalSubHeader);


    const getSupportButton = document.createElement('button');
    getSupportButton.className = 'support-modal-button';
    getSupportButton.innerHTML = 'Contact Support<span class="support-widget-sr-only"> (opens in new tab)</span>';
    getSupportButton.addEventListener('click', () => contactSupport());

    const readTheDocsButton = document.createElement('button');
    readTheDocsButton.className = 'support-modal-button';
    readTheDocsButton.innerHTML = 'Search the Insight Knowledge Base<span class="support-widget-sr-only"> (opens in new tab)</span>';
    readTheDocsButton.addEventListener('click', () => openInsightKB());

    const systemsStatusButton = document.createElement('button');
    systemsStatusButton.className = 'support-modal-button';
    systemsStatusButton.innerHTML = 'Check System Status<span class="support-widget-sr-only"> (opens in new tab)</span>';
    systemsStatusButton.addEventListener('click', () => checkSystemStatus());

    const closeBtn = document.createElement('button');
    closeBtn.className = 'support-modal-close-button';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close dialog');
    closeBtn.addEventListener('click', () => closeSupportModal());
    modalContent.insertBefore(closeBtn, headerLogo);

    modalContent.appendChild(getSupportButton);
    modalContent.appendChild(readTheDocsButton);
    modalContent.appendChild(systemsStatusButton);

    // Append all content to modal and then append modal to body
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal on escape key press; trap focus within modal on Tab
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeSupportModal();
            return;
        }
        if (e.key === 'Tab' && isModalOpen) {
            const focusable = Array.from(
                modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
            );
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    })
}

function openSupportModal() {
    const modal = document.getElementById('supportModal');
    if(!modal) {
        console.error('LibreTexts Support Widget: Modal not found. Please add a div with id="supportModal" to your page.');
        return;
    }
    document.querySelectorAll('body > *:not(#supportModal)').forEach(el => {
        el.setAttribute('aria-hidden', 'true');
    });
    modal.style.display = 'block';
    modal.style.visibility = 'visible';
    const firstFocusable = modal.querySelector('button');
    if (firstFocusable) firstFocusable.focus();
    else modal.focus();
    isModalOpen = true;
    document.getElementById('supportButton').setAttribute('aria-expanded', 'true');
}

function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if(!modal) {
        console.error('LibreTexts Support Widget: Modal not found. Please add a div with id="supportModal" to your page.');
        return;
    }
    document.querySelectorAll('body > *:not(#supportModal)').forEach(el => {
        el.removeAttribute('aria-hidden');
    });
    modal.style.display = 'none';
    modal.style.visibility = 'hidden';
    isModalOpen = false;
    document.getElementById('supportButton').setAttribute('aria-expanded', 'false');
    document.getElementById('supportButton').focus();
}

function contactSupport() {
    const currentURL = window.location.href;
    window.open('https://commons.libretexts.org/support/contact?from=widget' + '&fromURL=' + currentURL, '_blank')
}

function openInsightKB() {
    window.open('https://commons.libretexts.org/insight', '_blank')
}

function checkSystemStatus() {
    window.open('https://status.libretexts.org', '_blank')
}