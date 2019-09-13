import { LitElement, html, css } from 'lit-element';
import { editorIcon, printIcon, downloadIcon, uploadIcon, cutIcon, pasteIcon, copyIcon, redoIcon, undoIcon, 
        boldIcon, italicIcon, underlineIcon, removeFormatIcon, formatBlockIcon, fontIcon, fontSizeIcon,
        removeIdentationIcon, addIndentationIcon, leftAlignIcon, rightAlignIcon, centerAlignIcon,
        numberlistIcon, dottedListIcon } from "./editor-icons.js";

class HtmlEditor extends LitElement {

    constructor() {
        super();
    }

    static get properties() {
        return { 
            title: { type: String }
        };
    }

    static get styles() {
        return css`
            :host {
                display: block;
                height: 100%;
                width: 100%;
                font-family: 'Roboto', sans-serif;
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
                padding-bottom: 0.3em;
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
                display: grid;
                width: 100%;
                min-height: 4em;
                grid-template-columns: repeat(auto-fit, minmax(5em, 2fr));
            }
            @media only screen and (min-width: 600px) {
                .toolbar-ribbon {
                    display: flex;
                    width: 100%;
                    min-height: 4em;
                }
            }
            .toolbar-ribbon-group {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                width: auto;
                min-width: 2em;
                height: fit-content;
                border-radius: 0.3em;
                border-style: solid;
                border-width: 0.05em;
                border-color: #455A64;
                margin:0.3em;
            }
            .icon-class-button {
                border-radius: 0.5em;
                height: 2em;
                width: 2em;
                margin: 0.2em;
                text-align: center;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                background-color: #827717;
            }
            .icon-class-button svg {
                margin-top: 0.2em;
                fill: #9CCC65;
            }
            .button-dropdown {
                position: relative;
                display: flex;
            }
            .dropdown-content {
                display: none;
                flex-direction: column;
                position: absolute;
                background-color: #f1f1f1;
                overflow: auto;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
                top: 2em;
                max-height: 10em;
            }
            .show {display: flex;}
            option {
                color: #455A64;
                padding: 0.8em 1em;
                display: block;
            }
            .dropdown-content option:hover {
                background-color: #9CCC65;
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
                        <div class="toolbar-ribbon-group">
                            <i class="icon-class-button ripple" title="Cut">${cutIcon}</i>
                            <i class="icon-class-button ripple" title="Copy">${copyIcon}</i>
                            <i class="icon-class-button ripple" title="Paste">${pasteIcon}</i>
                            <i class="icon-class-button ripple" title="Undo">${undoIcon}</i>
                            <i class="icon-class-button ripple" title="Redo">${redoIcon}</i>
                        </div>
                        <div class="toolbar-ribbon-group">
                            <i class="icon-class-button ripple" title="Bold">${boldIcon}</i>
                            <i class="icon-class-button ripple" title="Italic">${italicIcon}</i>
                            <i class="icon-class-button ripple" title="Underline">${underlineIcon}</i>
                            <i class="icon-class-button ripple" title="Remove formatting">${removeFormatIcon}</i>
                        </div>
                        <div class="toolbar-ribbon-group">
                            <i class="icon-class-button ripple" title="Format Block" @click="${ e => this.formatOptionsButtonDropdown.classList.toggle("show") }" >${formatBlockIcon}</i>
                            <div class="button-dropdown">
                                <div id="format-list" class="dropdown-content">
                                    <option value="">- formatting -</option>
                                    <option value="h1">Title 1 &lt;h1&gt;</option>
                                    <option value="h2">Title 2 &lt;h2&gt;</option>
                                    <option value="h3">Title 3 &lt;h3&gt;</option>
                                    <option value="h4">Title 4 &lt;h4&gt;</option>
                                    <option value="h5">Title 5 &lt;h5&gt;</option>
                                    <option value="h6">Title 6 &lt;h6&gt;</option>
                                    <option value="p">Paragraph &lt;p&gt;</option>
                                    <option value="pre">Preformatted &lt;pre&gt;</option>
                                </div>
                            </div>
                            <i class="icon-class-button ripple" title="Fonts" @click="${ e => this.fontsOptionsButtonDropdown.classList.toggle("show") }" >${fontIcon}</i>
                            <div class="button-dropdown">
                                <div id="font-list" class="dropdown-content">
                                    <option value="">- font -</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Arial Black">Arial Black</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                </div>
                            </div>
                            <i class="icon-class-button ripple" title="Fonts" @click="${ e => this.fontSizeOptionsButtonDropdown.classList.toggle("show") }" >${fontSizeIcon}</i>
                            <div class="button-dropdown">
                                <div id="font-size-list" class="dropdown-content">
                                    <option value="">- font size -</option>
                                    <option value="1">Very small</option>
                                    <option value="2">A bit small</option>
                                    <option value="3">Normal</option>
                                    <option value="4">Medium-large</option>
                                    <option value="5">Big</option>
                                    <option value="6">Very big</option>
                                    <option value="7">Maximum</option>
                                </div>
                            </div>
                        </div>
                        <div class="toolbar-ribbon-group">
                            <i class="icon-class-button ripple" title="Left align">${leftAlignIcon}</i>
                            <i class="icon-class-button ripple" title="Center align">${centerAlignIcon}</i>
                            <i class="icon-class-button ripple" title="Right align">${rightAlignIcon}</i>
                            <i class="icon-class-button ripple" title="Delete indentation">${removeIdentationIcon}</i>
                            <i class="icon-class-button ripple" title="Add indentation">${addIndentationIcon}</i>
                        </div>
                        <div class="toolbar-ribbon-group">
                            <i class="icon-class-button ripple" title="Numbered list">${numberlistIcon}</i>
                            <i class="icon-class-button ripple" title="Dotted list">${dottedListIcon}</i>
                        </div>
                    </div>
                </div>
                <textarea class="edit-container" placeholder="Start typing" contenteditable></textarea>
                <div class="footer">
                    
                </div>
            </div>
        `;
    }

    firstUpdated() {
        this.formatOptionsButtonDropdown = this.shadowRoot.querySelector("#format-list");
        this.fontsOptionsButtonDropdown = this.shadowRoot.querySelector("#font-list");
        this.fontSizeOptionsButtonDropdown = this.shadowRoot.querySelector("#font-size-list");
    }

}
// Register the new element with the browser.
customElements.define('html-editor', HtmlEditor);