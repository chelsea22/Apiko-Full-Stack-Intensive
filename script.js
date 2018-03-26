function createElement(type='div', props=null, children=null) {
    const content = document.createElement(type);

    if (props) {
        Object.keys(props).map(key => {
            if (key === 'style') {
                let cssString = '';
                Object.keys(props.style).map(styleKey => {
                    const property = styleKey.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() });
                    cssString = `${cssString}${property}: ${props.style[styleKey]}; `  
                });
                content.style.cssText = cssString;
            } else {
                content[key] = props[key];
            }
        });
    }
    
    if (!children) return content;
    if (typeof children === 'string') {
        content.textContent = children;
        return content;
    }
    if ([ ...children ].length >= 0) {
        const docFrag = document.createDocumentFragment();
        children.map(child => {
            if (typeof child === 'string') {
                const text = document.createTextNode(child);
                docFrag.appendChild(text);
            } else if (typeof child === 'object') {
                docFrag.appendChild(child);
            }
        });
        content.appendChild(docFrag);
    }
    return content;
}

function render(content, root) {
    if(content) root.appendChild(content);
}

const React = {
    createElement,
    render,
}
  
const app = 
    React.createElement('div', { style: { backgroundColor: 'red', fontSize: '2rem' } }, [
        React.createElement('span', undefined, 'Hello world'),
        React.createElement('br'),
        'This is just a text node',
        React.createElement('div', { textContent: 'Text content', style: { fontWeight: '100' } }),
    ]);
  
React.render(
    app,
    document.getElementById('root'),
);
