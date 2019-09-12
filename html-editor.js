import { LitElement, html, css } from 'lit-element';
import { editorIcon, printIcon, downloadIcon, uploadIcon } from "./editor-icons.js";

class HtmlEditor extends LitElement {

    constructor() {
        super();
        this.parseRichTextTools();
    }

    static get properties() {
        return { 
            title: { type: String },
            menus: { type: Array },
            buttons: { type: Array }
        };
    }

    static get styles() {
        return css`
            :host {
                display: block;
                height: 100%;
                width: 100%;
            }
            .container {
                display: flex;
                flex-direction: column;
                margin: 0.5em;
                height: 100%;
                width: calc(100% - 1em);
                border-radius: 0.5em;
                background-color: #DCDCDC;
            }
            .toolbar {
                display: flex;
                flex-direction: column;
                width: calc(100% - 1em);
                min-height: 3em;
                height: auto;
                border-radius: 0.5em 0.5em 0 0;
                background-color: #607D8B;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                padding: 0.5em;
            }
            .toolbar:hover {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }
            .edit-container {
                display: flex;
                flex-grow: 2;
                background-color: white;
                margin: 0.5em auto;
                width: calc(100% - 2em);
                border: none;
                overflow: auto;
                outline: none;
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
                resize: none;
            }
            .footer {
                display: flex;
                min-height: 2em;
                bottom: 0;
                background-color: #DCDCDC;
                border-radius: 0 0 0.5em 0.5em;
            }
            .toolbar-header {
                display: flex;
                width: 100%;
                align-items: center;
            }
            .icon-class svg {
                fill: white;
                margin-right: 1em;
            }
            .icon-class-actions {
                border-radius: 50%;
                height: 2em;
                width: 2em;
                text-align: center;
                margin-right: 0.5em;
                margin-left: 0.5em;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                background-color: #827717;
            }
            .icon-class-actions svg {
                margin-top: 0.2em;
                fill: #9CCC65;
            }
            .toolbar-title {
                display: flex;
                flex-frow: 1;
                color: white;
                font-family: 'Roboto', sans-serif;
                letter-spacing: 0.03em;
            }
            .toolbar-action-icons {
                display: flex;
                flex-grow: 2;
                align-items: center;
                justify-content: flex-end;
            }
            .ripple {
                position: relative;
                overflow: hidden;
                transform: translate3d(0, 0, 0);
            }
            .ripple:after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
                background-repeat: no-repeat;
                background-position: 50%;
                transform: scale(10, 10);
                opacity: 0;
                transition: transform .5s, opacity 1s;
            }
            .ripple:active:after {
                transform: scale(0, 0);
                opacity: .3;
                transition: 0s;
            }
            .toolbar-ribbon {
                display: flex;
                width: 100%;
                min-height: 4em;
            }
        `;
    } 

    render(){
        return html`
            <div class="container">
                <div class="toolbar">
                    <div class="toolbar-header">
                        <i class="icon-class">${editorIcon}</i>
                        <span class="toolbar-title">${this.title ? this.title : "Text Editor"}</span>
                        <div class="toolbar-action-icons">
                            <i class="icon-class-actions ripple">${uploadIcon}</i>
                            <i class="icon-class-actions ripple">${downloadIcon}</i>
                            <i class="icon-class-actions ripple">${printIcon}</i>
                        </div>
                    </div>
                    <div class="toolbar-ribbon">
                        
                    </div>
                </div>
                <textarea class="edit-container" placeholder="Start typing" contenteditable></textarea>
                <div class="footer">
                    
                </div>
            </div>
        `;
    }

    parseRichTextTools() {
        let self = this;
        fetch("rich-text-tools.json")
        .then(response => response.json())
        .then(data => {
            self.menus = data.menus;
            self.buttons = data.buttons;
        });
    }
}
// Register the new element with the browser.
customElements.define('html-editor', HtmlEditor);