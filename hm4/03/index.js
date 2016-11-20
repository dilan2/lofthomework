//deleteTextNodes с рекурсией

function deleteTextNodes(el) {
    for(var i = 0; i < el.childNodes.length; i++) {
        if(el.childNodes[i].nodeType == 3) {
            el.childNodes[i].remove();
        }

    }
    for(var i = 0; i < el.children.length; i++) {
        deleteTextNodes(el.children[i]);
    }
}