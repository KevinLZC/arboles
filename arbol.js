class Nodo {
    constructor(simbolo) {
        this.simbolo = simbolo;
        this.sig = null;
        this.ant = null;
        this.hizq = null;
        this.hder = null;
    }
}

class Arbol {
    constructor() {
        this.raiz = null;
        this.preOrderLista = '';
        this.posOrderLista = '';
    }

    convertirExpresionEnLista(expresion) {
        this.raiz = new Nodo(expresion[0]);
        let aux = this.raiz;
        for(let i = 1; i < expresion.length; i++) {
            let simbolo = new Nodo(expresion[i])
            aux.sig = simbolo;
            simbolo.ant = aux;
            aux = aux.sig;
        }
    }

    conversionArbol() {
        let aux = this.raiz;
        while(aux !== null) {
            if(aux.simbolo === "*" || aux.simbolo === "/") {
                aux.hder = aux.sig;
                aux.hizq = aux.ant;

                if(aux.sig.sig === null && aux.ant.ant === null) {
                    aux.sig = null;
                    aux.ant = null;
                } else if(aux.ant.ant === null) {
                    aux.sig = aux.sig.sig;
                    aux.ant = null;
                    aux.sig.ant = aux;
                    this.raiz = aux;
                } else if(aux.sig.sig === null) {
                    aux.ant = aux.ant.ant;
                    aux.sig = null;
                    aux.ant.sig = aux;
                } else {
                    aux.sig = aux.sig.sig;
                    aux.ant = aux.ant.ant;
                    aux.ant.sig = aux;
                    aux.sig.ant = aux;
                }
            }
            aux = aux.sig;
        }

        aux = this.raiz;
        while(aux !== null) {
            if(aux.simbolo === "+" || aux.simbolo === "-") {
                aux.hder = aux.sig;
                aux.hizq = aux.ant;

                if(aux.sig.sig === null && aux.ant.ant === null) {
                    aux.sig = null;
                    aux.ant = null;
                } else if(aux.ant.ant === null) {
                    aux.sig = aux.sig.sig;
                    aux.ant = null;
                    aux.sig.ant = aux;
                    this.raiz = aux;
                } else if(aux.sig.sig === null) {
                    aux.ant = aux.ant.ant;
                    aux.sig = null;
                    aux.ant.sig = aux;
                } else {
                    aux.sig = aux.sig.sig;
                    aux.ant = aux.ant.ant;
                    aux.ant.sig = aux;
                    aux.sig.ant = aux;
                }
            }
            aux = aux.sig;
        }
        this.raiz = this.raiz.sig;
    }

    preOrder() {
        if(this.raiz === null) {
          console.log("Vacio");
        } else {
          this.preOrderRecursivo(this.raiz);
        }
        return this.preOrderLista
    }
    
      preOrderRecursivo(nodox) {
        if(nodox !== null) {
            this.preOrderLista += nodox.simbolo;
            this.preOrderRecursivo(nodox.hizq);
            this.preOrderRecursivo(nodox.hder);
        }
    }

    posOrder() {
        if(this.raiz === null) {
          console.log("Vacio");
        } else {
          this.posOrderRecursivo(this.raiz);
        }
        return this.posOrderLista
    }
    
    posOrderRecursivo(nodox) {
        if(nodox !== null) {
            this.posOrderRecursivo(nodox.hizq);
            this.posOrderRecursivo(nodox.hder);
            this.posOrderLista += nodox.simbolo;
        }
    }

    obtenerResultadoPreOrder(preorder) {
        let lifo = [];
        for(let i = preorder.length - 1; i >= 0; i--) {
            let res = 0;
            let a = 0;
            let b = 0;
            if(preorder[i] === '*') {
                a = lifo.pop();
                b = lifo.pop()
                res = a * b;
                lifo.push(res)
            } else if(preorder[i] === '/') {
                a = lifo.pop();
                b = lifo.pop()
                res = a / b;
                lifo.push(res)
            } else if(preorder[i] === '+') {
                a = lifo.pop();
                b = lifo.pop()
                res = a + b;
                lifo.push(res)
            } else if(preorder[i] === '-') {
                a = lifo.pop();
                b = lifo.pop()
                res = a - b;
                lifo.push(res)
            } else {
                lifo.push(parseInt(preorder[i]));
            }
        }
        return lifo[0];
    }
    obtenerResultadoPosOrder(posorder) {
        let lifo = [];
        for(let i = 0; i < posorder.length; i++) {
            let res = 0;
            let a = 0;
            let b = 0;
            if(posorder[i] === '*') {
                a = lifo.pop();
                b = lifo.pop();
                res = b * a;
                lifo.push(res)
            } else if(posorder[i] === '/') {
                a = lifo.pop();
                b = lifo.pop();
                res = b / a;
                lifo.push(res)
            } else if(posorder[i] === '+') {
                a = lifo.pop();
                b = lifo.pop();
                res = b + a;
                lifo.push(res)
            } else if(posorder[i] === '-') {
                a = lifo.pop();
                b = lifo.pop();
                res = b - a;
                lifo.push(res)
            } else {
                lifo.push(parseInt(posorder[i]));
            }
        }
        return lifo[0];
    }
}

let arbol = new Arbol();
arbol.convertirExpresionEnLista('2*3*4/8-4*3/6-9/3*3/2');
arbol.conversionArbol()
console.log(arbol.obtenerResultadoPreOrder(arbol.preOrder()))
let pre = arbol.preOrderLista
console.log({pre})
console.log(arbol.obtenerResultadoPosOrder(arbol.posOrder()))
let pos = arbol.posOrderLista
console.log({pos})