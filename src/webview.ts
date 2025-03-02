const tabsContainer = document.getElementById('tabsContainer') as HTMLElement;
const webview = document.getElementById('webview') as HTMLElement;
const urlInput = document.getElementById('url') as HTMLInputElement;
let activeTabIndex = 0;

// Funci�n para cambiar de pesta�a
function switchTab(index: number): void {
    activeTabIndex = index;
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, idx) => {
        if (idx === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    const url = (tabs[index] as HTMLElement).getAttribute('data-url');
    if (url) {
        urlInput.value = url;
        (webview as any).src = url;
    }
}

// Funci�n para crear una nueva pesta�a
function createTab(url: string): void {
    const tabIndex = tabsContainer ? tabsContainer.children.length : 0;

    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.textContent = `Pesta�a ${tabIndex + 1}`;
    tab.setAttribute('data-url', url);

    tab.addEventListener('click', () => switchTab(tabIndex));

    if (tabsContainer) {
        tabsContainer.appendChild(tab);

        if (tabIndex === 0) {
            tab.classList.add('active');
        }

        if (tabsContainer.children.length === 1) {
            switchTab(0);
        }
    }
}

// Inicializar con una pesta�a predeterminada
createTab('https://www.google.com/');

// Manejo de eventos
document.getElementById('go')?.addEventListener('click', () => {
    const url = urlInput.value;
    (webview as any).src = url;

    // Crear una nueva pesta�a si no existe
    if (!tabsContainer.querySelector(`[data-url="${url}"]`)) {
        createTab(url);
    }
});

document.getElementById('back')?.addEventListener('click', () => {
    (webview as any).goBack();
});

document.getElementById('forward')?.addEventListener('click', () => {
    (webview as any).goForward();
});

(webview as any).addEventListener('did-navigate', () => {
    urlInput.value = (webview as any).src;
});
