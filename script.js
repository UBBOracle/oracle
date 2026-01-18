const OFFICIAL_SOURCES_URL = 'https://raw.githubusercontent.com/UBBOracle/official-sources/main/sources.json';

window.onload = () => {
    loadScreen('source-screen');
}

function loadScreen(target_screen) {
    for (let screen of document.getElementsByClassName('screen')) {
        screen.classList.add('hidden');
    }
    let ts = document.getElementsByClassName(target_screen)[0];
    if (ts != undefined && ts != null) ts.classList.remove('hidden');

    fetch(OFFICIAL_SOURCES_URL)
        .then(res => res.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('sources.json is not a list, something went really wrong..');
            }

            const container = document.getElementById('sources');

            data.forEach(obj => {
                // Validate fields
                if (
                    typeof obj.title !== 'string' ||
                    typeof obj.author !== 'string' ||
                    typeof obj.url !== 'string' ||
                    typeof obj.icon !== 'string'
                ) {
                    console.warn('Invalid source entry:', obj);
                    return;
                }

                const source = new Source(obj.title, obj.author, obj.url, obj.icon);
                container.appendChild(source.createHTMLElement());
            });
        })
        .catch(err => {
            console.error('Failed to load sources:', err);
        });
}

class Source {
    constructor(title, author, url, icon) {
        this.title = title;
        this.author = author;
        this.url = url;
        this.icon = icon;
    }

    createHTMLElement() { // create html element for a source
        const icon = new Image();
        icon.src = this.icon;
        icon.onerror = function () {
            this.src = 'assets/icon.png';
        }; // in case the url is bad :C (TODO: test if it actually works)
        const title = document.createElement('span');
        title.classList.add('title');
        title.textContent = this.title;
        const author = document.createElement('span');
        author.classList.add('author');
        author.textContent = this.author;
        const info = document.createElement('div');
        info.classList.add('info');
        info.appendChild(title);
        info.appendChild(author);
        const padding = document.createElement('div');
        padding.classList.add('padding');
        const button = document.createElement('button');
        button.textContent = "Open";
        // TODO: bind button
        const source = document.createElement('div');
        source.classList.add('source');
        source.appendChild(icon);
        source.appendChild(info);
        source.appendChild(padding);
        source.appendChild(button);
        return source;
    }
}