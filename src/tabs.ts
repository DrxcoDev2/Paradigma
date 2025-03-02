// tabs.ts
const tabsContainer = document.getElementById("tabsContainer") as HTMLDivElement;
const webview = document.getElementById("webview") as HTMLIFrameElement;

interface Tab {
    id: number;
    title: string;
    url: string;
}

export class TabsManager {
    private tabs: Tab[] = [];
    private activeTabId: number = 0;
    private tabsContainer: HTMLDivElement;
    private webview: HTMLIFrameElement;

    constructor() {
        this.tabsContainer = document.getElementById("tabsContainer") as HTMLDivElement;
        this.webview = document.getElementById("webview") as HTMLIFrameElement;

        // Crear una pesta�a inicial
        this.createTab("https://www.google.com/");
    }

    createTab(url: string) {
        const newTab: Tab = {
            id: this.tabs.length,
            title: `Nueva pesta�a ${this.tabs.length + 1}`,
            url
        };
        this.tabs.push(newTab);
        this.activeTabId = newTab.id;
        this.renderTabs();
        this.loadTab(this.activeTabId);
    }

    private renderTabs() {
        this.tabsContainer.innerHTML = ""; // Limpia las pesta�as antes de renderizar

        this.tabs.forEach((tab) => {
            const tabElement = document.createElement("div");
            tabElement.className = "tab";
            if (tab.id === this.activeTabId) {
                tabElement.classList.add("active");
            }
            tabElement.textContent = tab.title;

            tabElement.addEventListener("click", () => {
                this.activeTabId = tab.id;
                this.loadTab(this.activeTabId);
                this.renderTabs();
            });

            this.tabsContainer.appendChild(tabElement);
        });
    }

    private loadTab(id: number) {
        const tab = this.tabs.find((t) => t.id === id);
        if (tab) {
            this.webview.src = tab.url;
        }
    }

    goToUrl(url: string) {
        this.tabs[this.activeTabId].url = url;
        this.loadTab(this.activeTabId);
        this.renderTabs();
    }
}

// Exportamos la clase completa
export default TabsManager;
