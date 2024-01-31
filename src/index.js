import "./index.css";

createLaunchpadWidget();
function createLaunchpadWidget() {
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
    supportButton.role = 'link';
    supportButton.className = 'support-widget-button';
    supportButton.innerHTML = '?';
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
    const modalContent = document.createElement('div');
    modalContent.className = 'support-modal-content';

    const headerLogo = document.createElement('img');
    headerLogo.src = 'https://cdn.libretexts.net/Icons/full_logo.png';
    headerLogo.alt = 'LibreTexts Logo';
    headerLogo.className = 'support-modal-header-logo';
    modalContent.appendChild(headerLogo);

    const modalHeader = document.createElement('h2');
    modalHeader.className = 'support-modal-header';
    modalHeader.innerHTML = 'Support Center';
    modalContent.appendChild(modalHeader);

    const modalSubHeader = document.createElement('h3');
    modalSubHeader.innerHTML = 'How can we help you today?';
    modalContent.appendChild(modalSubHeader);


    const getSupportButton = document.createElement('button');
    getSupportButton.className = 'support-modal-button';
    getSupportButton.innerHTML = 'Contact Support';
    getSupportButton.addEventListener('click', () => contactSupport());

    const readTheDocsButton = document.createElement('button');
    readTheDocsButton.className = 'support-modal-button';
    readTheDocsButton.innerHTML = 'Search the Insight Knowledge Base';
    readTheDocsButton.addEventListener('click', () => openInsightKB());

    const systemsStatusButton = document.createElement('button');
    systemsStatusButton.className = 'support-modal-button';
    systemsStatusButton.innerHTML = 'Check System Status';
    systemsStatusButton.addEventListener('click', () => checkSystemStatus());

    modalContent.appendChild(getSupportButton);
    modalContent.appendChild(readTheDocsButton);
    modalContent.appendChild(systemsStatusButton);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'support-modal-close-button';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => closeSupportModal());
    modalContent.appendChild(closeBtn);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function openSupportModal() {
    const modal = document.getElementById('supportModal');
    if(!modal) {
        console.error('LibreTexts Support Widget: Modal not found. Please add a div with id="supportModal" to your page.');
        return;
    }
    modal.style.display = 'block';
    modal.style.visibility = 'visible';
}

function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if(!modal) {
        console.error('LibreTexts Support Widget: Modal not found. Please add a div with id="supportModal" to your page.');
        return;
    }
    modal.style.display = 'none';
    modal.style.visibility = 'hidden';
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