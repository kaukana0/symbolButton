/*
a button displaying on of a set of given symbols.
it can be activated (pressed) or deactivated.
it can have optional hover effect.
enter and click are captured, prevented and instead one event "action" is dispatched.
*/

import MarkUpCode from  "./markUpCode.mjs"		// keep this file html/css free


class Element extends HTMLElement {

	getAttr(name, _default) {
		const r = this.hasAttribute(name) ? this.getAttribute(name) : _default
		return r
	}

	constructor() {	
		super()	
		this.attachShadow({mode: 'open'})
		const size = this.getAttr("size",40)
		const tmp = MarkUpCode.getHtmlTemplate(MarkUpCode.get( 
			this.getAttr("symbol"),
			this.getAttr("symbolDeactivated"),
			this.getAttr("hoverable","true")=="true",
			size, 
			size
		)).cloneNode(true)
		this.shadowRoot.appendChild(tmp)
		this.#init()
		this.setActivated = this.hasAttribute("isactivated")
	}

	#init() {
		this.addEventListener("click", (ev) => {
			const event = new Event("action")
			this.dispatchEvent(event)
			ev.stopPropagation()
		})
		this.addEventListener("keydown", (ev) => {
			if(ev.key=="Enter") {
				const event = new Event("action")
				this.dispatchEvent(event)
				ev.stopPropagation()
				ev.preventDefault()
			}
		})

	}

	set setActivated(val) {
		const sd = this.shadowRoot.getElementById("sd")
		if(sd) {
			const sa = this.shadowRoot.getElementById("sa")
			sa.style.display = val ? "" : "none"
			sd.style.display = !val ? "" : "none"	
			this.setAttribute("aria-pressed", val)
		}
	}

}

window.customElements.define('symbol-button', Element)
